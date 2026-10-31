"""Derive portable summaries without accessing the original machine or source logs."""
from collections import defaultdict
import copy
import datetime as dt
from records import COMPONENTS, effective, finding_label_issues
from telemetry import delta


def seconds(value):
    return dt.datetime.fromisoformat(value.replace('Z', '+00:00')).timestamp()


def union(intervals):
    end, total = None, 0.0
    for a, b in sorted(intervals):
        total += max(0, b - max(a, end if end is not None else a))
        end = max(b, end if end is not None else b)
    return total


def component_summary(observations):
    return {k: {'observed': sum(d[k] for d in observations if d.get(k) is not None) if any(d.get(k) is not None for d in observations) else None,
                'interval_count': len(observations),
                'unknown_intervals': sum(d.get(k) is None for d in observations)} for k in COMPONENTS}


def summarize(store):
    raw, gaps = store.read()
    quarantined = {rid for gap in gaps for rid in gap.get('related_ids', [])}
    while True:
        connected = {rid for r in raw if r['id'] in quarantined or r.get('supersedes') in quarantined for rid in (r['id'], r.get('supersedes')) if rid}
        if connected <= quarantined:
            break
        quarantined.update(connected)
    if any(r['id'] in quarantined for r in raw):
        gaps.append({'code': 'unreadable_correction_family', 'records': sorted(quarantined)})
    records, correction_gaps = effective([r for r in raw if r['id'] not in quarantined])
    gaps.extend(correction_gaps)
    aliases, measurement_roots = {}, {}
    raw_by_id = {r['id']: r for r in raw}
    for leaf in records:
        node = leaf
        visited = set()
        while node['id'] not in visited:
            visited.add(node['id'])
            aliases[node['id']] = leaf['id']
            measurement_roots[leaf['id']] = node
            node = raw_by_id.get(node.get('supersedes'))
            if node is None:
                break
    records = copy.deepcopy(records)
    # A correction's envelope dates its publication, not a repeated operation.
    # Metadata amendments retain the original event clock; raw envelopes remain intact.
    timed_kinds = {'execution', 'activity_start', 'activity_end', 'command_start', 'command_end', 'acceptance', 'freeze'}
    for r in records:
        if r['kind'] in timed_kinds:
            r['clock'] = copy.deepcopy(measurement_roots[r['id']]['clock'])
    known_ids = {r['id'] for r in raw}
    reference_fields = {'activity_start': ('parent',), 'activity_end': ('activity',),
        'command_start': ('activity', 'acceptance'), 'command_end': ('command',),
        'finding': ('acceptance',), 'finding_link': ('activity',),
        'freeze': ('participant',), 'token': ('participant',),
        'reconciliation': ('participant', 'freeze')}
    for r in records:
        r['refs'] = [aliases.get(ref, ref) for ref in r.get('refs', [])]
        for field in reference_fields.get(r['kind'], ()):
            ref = r['data'].get(field)
            if ref in aliases:
                r['data'][field] = aliases[ref]
        references = list(r.get('refs', [])) + [r['data'].get(k) for k in reference_fields.get(r['kind'], ())]
        for ref in set(x for x in references if x):
            if ref not in known_ids:
                gaps.append({'code': 'missing_record_reference', 'record': r['id'], 'target': ref})
    by_id = {r['id']: r for r in records}
    starts = {r['id']: r for r in records if r['kind'] == 'activity_start'}
    ends = defaultdict(list)
    for r in records:
        if r['kind'] == 'activity_end':
            ends[r['data']['activity']].append(r)
    containers = {r['data'].get('parent') for r in starts.values()}
    activities, agent_intervals = [], defaultdict(list)
    waiting = defaultdict(list)
    for rid, r in starts.items():
        d = r['data']
        terminations = ends[rid]
        end = terminations[0] if len(terminations) == 1 else None
        duration = None
        if end and r['clock']['domain'] == end['clock']['domain']:
            duration = end['clock']['monotonic'] - r['clock']['monotonic']
            if duration < 0:
                duration = None
            elif abs(seconds(end['clock']['utc']) - seconds(r['clock']['utc']) - duration) > 1:
                gaps.append({'code': 'utc_clock_discontinuity', 'record': rid})
        if duration is None:
            gaps.append({'code': 'missing_or_incompatible_activity_end', 'record': rid})
        row = dict(d, id=rid, measurement_record=measurement_roots[rid]['id'], start=r['clock']['utc'], end=end['clock']['utc'] if end else None,
                   duration_seconds=duration, container=rid in containers)
        activities.append(row)
        if duration is not None and rid not in containers:
            lane = (d.get('session'), r['clock']['domain'])
            intervals = waiting if d.get('state', 'active') != 'active' else agent_intervals
            intervals[lane].append((r['clock']['monotonic'], end['clock']['monotonic']))
    all_spans = defaultdict(list)
    for (_, domain), spans in agent_intervals.items():
        all_spans[domain].extend(spans)
    effort = sum(union(spans) for spans in agent_intervals.values())
    occupied = sum(union(spans) for spans in all_spans.values())
    time_summary = {'accumulated_agent_seconds': effort, 'occupied_seconds_by_clock_domain': occupied,
                    'concurrent_overlap_seconds': effort - occupied,
                    'wait_pause_agent_seconds': sum(union(x) for x in waiting.values()),
                    'activity_basis': 'declared intervals; not proof of continuous active work', 'elapsed_seconds': None}
    execution = next((r for r in records if r['kind'] == 'execution'), None)
    freezes = [r for r in records if r['kind'] == 'freeze']
    if execution and freezes:
        last = max(freezes, key=lambda r: r['clock']['utc'])
        time_summary['elapsed_seconds'] = max(0, seconds(last['clock']['utc']) - seconds(execution['clock']['utc']))
        time_summary['elapsed_basis'] = 'UTC entry through latest freeze; excludes late final-response generation'
    tokens, seen, collisions = [], {}, set()
    for r in records:
        if r['kind'] != 'token':
            continue
        d = r['data']
        src = d['source']
        boundaries = [b for b in records if b['kind'] == 'freeze' and b['data']['participant'] == d['participant']]
        if len(boundaries) > 1:
            gaps.append({'code': 'ambiguous_participant_boundary', 'record': r['id']})
            continue
        if boundaries and boundaries[0]['data']['mode'] == 'position' and src['position'] > boundaries[0]['data']['position']:
            gaps.append({'code': 'observation_outside_corrected_boundary', 'record': r['id']})
            continue
        expected, _ = delta(d['previous']['usage'] if d['previous'] else None, src['usage'])
        if d['delta'] != expected:
            gaps.append({'code': 'inconsistent_token_delta', 'record': r['id']})
            continue
        identity = (d['session'], src['position'])
        signature = (src['fingerprint'], str(d['delta']), str(d['previous']))
        if identity in seen:
            if seen[identity] != signature:
                collisions.add(identity)
            continue
        seen[identity] = signature
        previous = d['previous']
        begin = previous.get('timestamp') if previous else None
        finish = src.get('timestamp')
        linked = []
        if begin and finish:
            for a in activities:
                if a.get('session') != d['session'] or a['container']:
                    continue
                if seconds(a['start']) < seconds(finish) and (a['end'] is None or seconds(a['end']) > seconds(begin)):
                    linked.append(a['id'])
        precision = 'unattributed'
        if len(linked) > 1:
            precision = 'mixed'
        elif len(linked) == 1:
            a = next(a for a in activities if a['id'] == linked[0])
            if seconds(a['start']) <= seconds(begin) and a['end'] and seconds(a['end']) >= seconds(finish):
                precision = 'interval'
        tokens.append(dict(d, id=r['id'], attribution=precision, activities=linked,
                           attribution_basis='cumulative snapshot interval, not a proven model-call boundary'))
        for issue in d.get('issues', []):
            gaps.append({'code': issue, 'record': r['id']})
    if collisions:
        tokens = [t for t in tokens if (t['session'], t['source']['position']) not in collisions]
        gaps.extend({'code': 'conflicting_source_observations', 'session': s, 'position': p} for s, p in sorted(collisions))
    own = [t for t in tokens if t['inclusion'] == 'own']
    ambiguous = [t for t in tokens if t['inclusion'] == 'unknown']
    if ambiguous:
        gaps.append({'code': 'unknown_hierarchy_inclusion', 'sessions': sorted({t['session'] for t in ambiguous})})
    by_session = {s: component_summary([t['delta'] for t in tokens if t['session'] == s]) for s in sorted({t['session'] for t in tokens})}
    partitions = {p: component_summary([t['delta'] for t in own if t['attribution'] == p]) for p in ('interval', 'mixed', 'unattributed')}
    by_task, by_category, by_verification = {}, {}, {}
    for label, mapping in (('task', by_task), ('category', by_category)):
        for value in sorted({a.get(label) or '(spec)' for a in activities}):
            aa = [a for a in activities if (a.get(label) or '(spec)') == value]
            ids = {a['id'] for a in aa}
            mapping[value] = {'activities': list(sorted(ids)),
                              'interval_tokens': component_summary([t['delta'] for t in own if t['attribution'] == 'interval' and set(t['activities']) <= ids]),
                              'mixed_token_records': [t['id'] for t in own if t['attribution'] == 'mixed' and ids.intersection(t['activities'])],
                              'declared_seconds': sum(a['duration_seconds'] for a in aa if a['duration_seconds'] is not None and not a['container']),
                              'unknown_duration_count': sum(a['duration_seconds'] is None for a in aa),
                              'duration_basis': 'non-container span sum; groups may overlap, do not sum across groups'}
    commands = []
    for r in records:
        if r['kind'] != 'command_start':
            continue
        matching = [e for e in records if e['kind'] == 'command_end' and e['data']['command'] == r['id']]
        end = matching[0]['data'] if len(matching) == 1 else None
        if not end:
            gaps.append({'code': 'missing_command_result', 'record': r['id']})
        elif abs(seconds(matching[0]['clock']['utc']) - seconds(r['clock']['utc']) - end['duration_seconds']) > 1:
            gaps.append({'code': 'utc_or_collection_delay', 'record': r['id']})
        commands.append(dict(r['data'], id=r['id'], measurement_record=measurement_roots[r['id']]['id'], result=end))
        dimensions = tuple(r['data'].get(k) or 'unknown' for k in ('verification_type', 'environment', 'tool'))
        by_verification.setdefault(' / '.join(dimensions), {'commands': [], 'activities': [], 'categories': {}})['commands'].append(r['id'])
    for a in activities:
        if not any(a.get(k) for k in ('verification_type', 'environment', 'tool')):
            continue
        dimensions = ' / '.join(a.get(k) or 'unknown' for k in ('verification_type', 'environment', 'tool'))
        group = by_verification.setdefault(dimensions, {'commands': [], 'activities': [], 'categories': {}})
        group['activities'].append(a['id'])
        group['categories'].setdefault(a['category'], []).append(a['id'])
    for group in by_verification.values():
        ids = set(group['activities'])
        group['interval_tokens'] = component_summary([t['delta'] for t in own if t['attribution'] == 'interval' and set(t['activities']) <= ids])
        group['mixed_token_records'] = [t['id'] for t in own if t['attribution'] == 'mixed' and ids.intersection(t['activities'])]
    findings, duplicate_findings = {}, set()
    for r in records:
        if r['kind'] != 'finding':
            continue
        d = r['data']
        fid = d['finding']
        if fid in findings:
            duplicate_findings.add(fid)
        findings[fid] = dict(d, id=r['id'], delivery_defect=False, persona_defect=False)
    counts = {channel: dict.fromkeys(('introduced', 'pre_existing', 'unknown'), 0) for channel in ('delivery', 'persona')}
    for fid, f in findings.items():
        if fid in duplicate_findings:
            gaps.append({'code': 'conflicting_finding_identity', 'finding': fid})
            continue
        label_issues = finding_label_issues(f)
        if label_issues:
            gaps.append({'code': 'unsupported_finding_label', 'record': f['id'], 'fields': label_issues})
            continue
        if f.get('classification') != 'product' or not f.get('evidence') or not f.get('rationale'):
            continue
        marker = by_id.get(f.get('acceptance'))
        accepted = bool(marker and marker['kind'] == 'acceptance' and marker['data'].get('task') == f.get('task')
                        and marker['data'].get('candidate') == f.get('candidate')
                        and seconds(marker['clock']['utc']) <= seconds(f['discovered_at']))
        origin = f['origin']
        if f['channel'] == 'e2e' and accepted:
            f['delivery_defect'] = True
            counts['delivery'][origin] += 1
        if f['channel'] == 'persona':
            f['persona_defect'] = True
            counts['persona'][origin] += 1
    reconciliation = {}
    for r in sorted(records, key=lambda r: (r['clock']['utc'], r['id'])):
        if r['kind'] == 'reconciliation':
            reconciliation[r['data']['participant']] = r['data']
    for r in records:
        if r['kind'] == 'participant' and r['id'] not in reconciliation:
            gaps.append({'code': 'participant_not_reconciled', 'record': r['id']})
        if r['kind'] == 'quality':
            gaps.append(dict(r['data'], record=r['id']))
    return {'execution': store.execution, 'published_file_count': len(list(store.root.glob('*/*.json'))), 'record_count': len(raw), 'effective_record_count': len(records),
            'time': time_summary, 'activities': activities, 'tokens': tokens,
            'own_session_components': component_summary([t['delta'] for t in own]),
            'hierarchy_total_exact': not gaps and bool(reconciliation) and all(r['state'] == 'closed' for r in reconciliation.values()) and all(t['delta'].get('total_tokens') is not None for t in own) and bool(own),
            'by_session': by_session, 'token_attribution': partitions, 'by_task': by_task, 'by_activity': by_category,
            'commands': commands, 'verification_dimensions': by_verification,
            'findings': list(findings.values()), 'defect_counts': counts,
            'finding_links': [r['data'] for r in records if r['kind'] == 'finding_link'],
            'collection': list(reconciliation.values()), 'gaps': gaps}
