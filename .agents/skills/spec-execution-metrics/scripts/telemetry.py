"""Read only allowlisted Codex rollout measurement fields; never choose by mtime."""
import datetime as dt
import json
import os
from pathlib import Path

from records import COMPONENTS, counters, digest, identifier


def codex_home():
    return Path(os.environ.get('CODEX_HOME', str(Path.home() / '.codex'))).expanduser()


def read_session(session, home=None, expected_cwd=None):
    identifier(session)
    home = Path(home) if home else codex_home()
    candidates = list((home / 'sessions').rglob('*' + session + '*.jsonl'))
    candidates += list((home / 'archived_sessions').glob('*' + session + '*.jsonl'))
    verified = []
    for path in candidates:
        with path.open() as stream:
            first = json.loads(stream.readline())
        meta = first.get('payload', {})
        if first.get('type') == 'session_meta' and meta.get('id') == session:
            verified.append((path, meta))
    if len(verified) != 1:
        raise ValueError('session source missing or ambiguous: ' + session)
    path, meta = verified[0]
    if expected_cwd and Path(meta.get('cwd', '')).resolve() != Path(expected_cwd).resolve():
        raise ValueError('session cwd does not match expected context')
    source = meta.get('source', {})
    parent = None
    if isinstance(source, dict):
        parent = source.get('subagent', {}).get('thread_spawn', {}).get('parent_thread_id')
    parent = meta.get('parent_thread_id', parent)
    events, turns, issues = [], {}, []
    current = None
    with path.open() as stream:
        for position, line in enumerate(stream):
            try:
                record = json.loads(line)
            except ValueError:
                issues.append({'position': position, 'code': 'incomplete_or_invalid_source_line'})
                continue
            payload = record.get('payload', {})
            if record.get('type') == 'turn_context' and payload.get('turn_id'):
                current = payload['turn_id']
                turns.setdefault(current, {'start_position': position, 'start': record.get('timestamp')})
            if record.get('type') != 'event_msg':
                continue
            kind = payload.get('type')
            if kind == 'task_started':
                current = payload.get('turn_id')
                if current:
                    turns.setdefault(current, {'start_position': position, 'start': record.get('timestamp')})
            elif kind == 'task_complete':
                turn = payload.get('turn_id') or current
                if turn:
                    turns.setdefault(turn, {}).update(end_position=position, end=record.get('timestamp'))
            elif kind == 'token_count' and payload.get('info') is not None:
                info = payload.get('info', {})
                supplied = info.get('total_token_usage') or {}
                usage = counters(supplied)
                if set(supplied) - set(COMPONENTS):
                    issues.append({'position': position, 'code': 'unsupported_counter_components'})
                fields = {'session': session, 'position': position, 'timestamp': record.get('timestamp'),
                          'turn': current, 'usage': usage}
                fields['fingerprint'] = digest(fields)
                events.append(fields)
    return {'session': session, 'parent': parent, 'version': meta.get('cli_version'),
            'events': events, 'turns': turns, 'current_turn': current, 'issues': issues}


def children(parent, home=None):
    """Return only metadata-confirmed direct children; unrelated newer logs are ignored."""
    home = Path(home) if home else codex_home()
    found = []
    for directory in (home / 'sessions', home / 'archived_sessions'):
        for path in directory.rglob('*.jsonl'):
            try:
                with path.open() as stream:
                    r = json.loads(stream.readline())
                m = r.get('payload', {})
                source = m.get('source', {})
                p = m.get('parent_thread_id')
                if isinstance(source, dict):
                    p = p or source.get('subagent', {}).get('thread_spawn', {}).get('parent_thread_id')
                if r.get('type') == 'session_meta' and p == parent:
                    found.append(m['id'])
            except (OSError, ValueError, TypeError, KeyError):
                continue
    return sorted(set(found))


def delta(previous, current):
    issues, values = [], {}
    for name in COMPONENTS:
        a = previous.get(name) if previous is not None else None
        b = current.get(name)
        if a is None or b is None:
            values[name] = None
            issues.append('missing_component_or_baseline:' + name)
        elif b < a:
            values[name] = None
            issues.append('counter_reset:' + name)
        else:
            values[name] = b - a
    for mapping in (previous or {}, current):
        if all(k in mapping for k in ('input_tokens', 'output_tokens', 'total_tokens')):
            if mapping['input_tokens'] + mapping['output_tokens'] != mapping['total_tokens']:
                issues.append('unknown_component_semantics')
                values = dict.fromkeys(COMPONENTS)
        if mapping.get('cached_input_tokens', 0) > mapping.get('input_tokens', float('inf')) or mapping.get('reasoning_output_tokens', 0) > mapping.get('output_tokens', float('inf')):
            issues.append('unknown_subset_semantics')
            values = dict.fromkeys(COMPONENTS)
    return values, sorted(set(issues))


def participant(store, session, key, inclusion='unknown', expected_cwd=None, parent=None):
    # Stable attachment key is reused without recapturing its baseline.
    records, _ = store.read()
    rid = digest([store.execution, store.producer, key])
    existing = next((r for r in records if r['id'] == rid), None)
    if existing:
        if existing['kind'] != 'participant' or existing['data']['session'] != session:
            raise ValueError('participant key conflict')
        return existing
    frozen = {r['data']['participant'] for r in records if r['kind'] == 'freeze'}
    active = [r for r in records if r['kind'] == 'participant' and r['data']['session'] == session and r['id'] not in frozen]
    if active:
        raise ValueError('session already attached; reuse its participant or freeze before resume')
    log = read_session(session, expected_cwd=expected_cwd)
    if parent and log['parent'] != parent:
        raise ValueError('parent_thread_id not confirmed in local log')
    if inclusion not in ('own', 'inclusive', 'unknown'):
        raise ValueError('unknown inclusion declaration')
    return store.publish('participant', {'session': session, 'parent': log['parent'], 'inclusion': inclusion,
                         'baseline': log['events'][-1] if log['events'] else None,
                         'entry_turn': log['current_turn'], 'source_version': log['version']}, key=key)


def freeze(store, participant_record, key, mode='turn'):
    records, _ = store.read()
    prior = [r for r in records if r['kind'] == 'freeze' and r['data']['participant'] == participant_record['id']]
    if prior:
        return prior[0]
    log = read_session(participant_record['data']['session'])
    turn = log['current_turn']
    if not turn:
        raise ValueError('no verified turn boundary')
    position = log['events'][-1]['position'] if log['events'] else -1
    return store.publish('freeze', {'participant': participant_record['id'], 'session': log['session'],
                         'turn': turn, 'position': position, 'mode': mode, 'inflight': 'end_position' not in log['turns'].get(turn, {})}, key=key, refs=[participant_record['id']])


def reconcile(store, p, boundary):
    log = read_session(p['data']['session'])
    records, _ = store.read()
    end = boundary['data']
    turn = log['turns'].get(end['turn'], {})
    complete = 'end_position' in turn
    if end['mode'] == 'position':
        limit = end['position']
        complete = True
    elif complete:
        limit = turn['end_position']
    else:
        # Never follow a later invocation if completion metadata is missing.
        later = [t['start_position'] for t in log['turns'].values() if t.get('start_position', -1) > turn.get('start_position', float('inf'))]
        limit = min(later) - 1 if later else float('inf')
    previous = p['data']['baseline']
    lower = previous['position'] if previous else -1
    issues = [i['code'] + ':' + str(i['position']) for i in log['issues'] if lower < i['position'] <= limit]
    if previous:
        match = next((e for e in log['events'] if e['position'] == previous['position']), None)
        if match is None or match['fingerprint'] != previous['fingerprint']:
            raise ValueError('baseline source changed incompatibly')
    selected = [e for e in log['events'] if e['position'] > (previous['position'] if previous else -1) and e['position'] <= limit]
    existing_sources = {}
    for r in records:
        if r['kind'] == 'token' and r['data']['session'] == log['session']:
            e = r['data']['source']
            existing_sources.setdefault(e['position'], set()).add(e['fingerprint'])
    for e in selected:
        if e['position'] in existing_sources and existing_sources[e['position']] != {e['fingerprint']}:
            raise ValueError('source event changed incompatibly at position ' + str(e['position']))
        values, gaps = delta(previous['usage'] if previous else None, e['usage'])
        data = {'participant': p['id'], 'session': log['session'], 'source': e, 'previous': previous,
                'delta': values, 'issues': gaps, 'inclusion': p['data']['inclusion']}
        store.publish('token', data, key='token-' + p['id'] + '-' + str(e['position']), refs=[p['id'], boundary['id']])
        previous = e
        issues.extend(gaps)
    if not complete:
        issues.append('final_response_pending')
    if end['mode'] == 'position' and end.get('inflight', True):
        issues.append('inflight_turn_tail_excluded')
    if not selected and not previous:
        issues.append('missing_endpoint')
    state = 'pending' if not complete else ('incomplete' if issues else 'closed')
    data = {'session': log['session'], 'participant': p['id'], 'freeze': boundary['id'],
            'last_source': previous['fingerprint'] if previous else None, 'state': state, 'issues': sorted(set(issues)),
            'end_position': end['position'] if end['mode'] == 'position' else turn.get('end_position'),
            'end_utc': previous.get('timestamp') if end['mode'] == 'position' and previous else turn.get('end')}
    # Append each distinct reconciliation state. Earlier provisional history remains.
    return store.publish('reconciliation', data, key='reconcile-' + digest(data), refs=[boundary['id']])
