"""Immutable, producer-owned measurement records. Python standard library only."""
import datetime as dt
import hashlib
import json
import math
import os
from pathlib import Path
import re
import subprocess
import tempfile
import time
import uuid

VERSION = 1
COLLECTOR = '1.0.6'
COMPONENTS = ('input_tokens', 'cached_input_tokens', 'cache_write_input_tokens',
              'output_tokens', 'reasoning_output_tokens', 'total_tokens')
CATEGORIES = ('preparation', 'coordination', 'implementation', 'test_creation',
              'test_infrastructure', 'verification', 'investigation', 'product_correction',
              'test_maintenance', 'retest', 'persona_qa', 'review', 'closure', 'instrumentation')
FINDING_LABELS = {
    'channel': ('e2e', 'unit', 'review', 'construction', 'persona'),
    'classification': ('product', 'infrastructure', 'obsolete_expectation', 'test', 'unclassified'),
    'origin': ('introduced', 'pre_existing', 'unknown'),
}
# These are measurement fields, never arbitrary telemetry payloads.
FIELDS = {
    'execution': {'candidate', 'environment', 'spec', 'session'},
    'segment': {'session', 'reason'},
    'participant': {'session', 'parent', 'inclusion', 'baseline', 'entry_turn', 'source_version'},
    'activity_start': {'session', 'task', 'category', 'state', 'parent', 'verification_type', 'environment', 'tool'},
    'activity_end': {'activity'},
    'command_start': {'session', 'task', 'activity', 'argv', 'candidate', 'checks', 'attempt', 'verification_type', 'environment', 'tool', 'acceptance'},
    'command_end': {'command', 'returncode', 'duration_seconds', 'runner_seconds', 'evidence'},
    'acceptance': {'task', 'candidate'},
    'finding': {'finding', 'task', 'candidate', 'channel', 'classification', 'origin', 'discovered_at', 'acceptance', 'evidence', 'rationale'},
    'finding_link': {'finding', 'relation', 'activity', 'evidence'},
    'freeze': {'session', 'participant', 'turn', 'position', 'mode', 'inflight'},
    'token': {'session', 'participant', 'source', 'previous', 'delta', 'issues', 'inclusion'},
    'quality': {'code', 'detail', 'affected', 'evidence'},
    'reconciliation': {'session', 'participant', 'freeze', 'last_source', 'state', 'issues', 'end_position', 'end_utc'},
}


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=True, allow_nan=False)


def digest(value):
    return hashlib.sha256(canonical(value).encode()).hexdigest()


def identifier(value):
    if not isinstance(value, str) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_.-]{0,159}', value):
        raise ValueError('invalid identity')
    return value


def safe_text(value):
    value = re.sub(r'(?i)(bearer\s+)\S+', r'\1[redacted]', value)
    value = re.sub(r'(?i)((?:password|passwd|secret|api[_-]?key|access[_-]?token|authorization)\s*[=:]\s*)\S+', r'\1[redacted]', value)
    value = re.sub(r'(https?://)[^/@\s]+:[^/@\s]+@', r'\1[redacted]@', value)
    return value


def reference(value):
    if not isinstance(value, str) or Path(value).is_absolute() or '\\' in value or '://' in value:
        raise ValueError('evidence/task references must be relative to the spec')
    return safe_text(value)


def counters(value):
    if not isinstance(value, dict):
        raise ValueError('counters must be an object')
    return {k: v for k, v in value.items() if k in COMPONENTS and type(v) is int and v >= 0}


def event(value):
    if value is None:
        return None
    allowed = {'session', 'position', 'fingerprint', 'timestamp', 'turn', 'usage'}
    if not isinstance(value, dict) or set(value) - allowed:
        raise ValueError('unsupported event fields')
    if set(value) != allowed or type(value['position']) is not int or value['position'] < 0:
        raise ValueError('invalid event identity')
    identifier(value['session'])
    identifier(value['fingerprint'])
    dt.datetime.fromisoformat(value['timestamp'].replace('Z', '+00:00'))
    if value['turn'] is not None:
        identifier(value['turn'])
    result = dict(value)
    result['usage'] = counters(value.get('usage', {}))
    if digest({k: v for k, v in result.items() if k != 'fingerprint'}) != result['fingerprint']:
        raise ValueError('measurement fingerprint mismatch')
    return result


def clean(kind, data):
    if kind not in FIELDS or not isinstance(data, dict) or set(data) - FIELDS[kind]:
        raise ValueError('unsupported record fields or kind')
    result = {}
    for key, val in data.items():
        if key in ('baseline', 'source', 'previous'):
            result[key] = event(val)
        elif key == 'delta':
            if not isinstance(val, dict) or set(val) - set(COMPONENTS):
                raise ValueError('unsupported delta components')
            result[key] = {k: v if type(v) is int and v >= 0 else None for k, v in val.items()}
        elif isinstance(val, str):
            result[key] = reference(val) if key in ('task', 'spec') else safe_text(val)
        elif isinstance(val, list) and all(isinstance(x, str) for x in val):
            result[key] = [reference(x) if key == 'evidence' else safe_text(x) for x in val]
        elif val is None or type(val) in (int, float, bool):
            result[key] = val
        else:
            raise ValueError('unsupported measurement value: ' + key)
    required = {
        'execution': {'spec', 'candidate', 'environment', 'session'},
        'segment': {'session', 'reason'},
        'participant': {'session', 'parent', 'inclusion', 'baseline', 'entry_turn', 'source_version'},
        'activity_start': {'session', 'category', 'task'}, 'activity_end': {'activity'},
        'command_start': {'session', 'argv', 'task'},
        'command_end': {'command', 'duration_seconds', 'returncode', 'runner_seconds', 'evidence'},
        'acceptance': {'task', 'candidate'},
        'finding': {'finding', 'task', 'candidate', 'channel', 'classification', 'origin', 'discovered_at', 'acceptance', 'evidence', 'rationale'},
        'finding_link': {'finding', 'relation', 'activity', 'evidence'},
        'freeze': {'session', 'participant', 'turn', 'position', 'mode'},
        'token': {'session', 'participant', 'source', 'previous', 'delta', 'issues', 'inclusion'},
        'quality': {'code'},
        'reconciliation': {'session', 'participant', 'freeze', 'last_source', 'state', 'issues'},
    }
    if required[kind] - set(result):
        raise ValueError('missing required measurement fields')
    for key in ('duration_seconds', 'runner_seconds'):
        if key in result and result[key] is not None and (type(result[key]) not in (int, float) or not math.isfinite(result[key]) or result[key] < 0):
            raise ValueError('invalid duration')
    if kind == 'finding':
        dt.datetime.fromisoformat(result['discovered_at'].replace('Z', '+00:00'))
    if kind == 'activity_start' and result.get('category') not in CATEGORIES:
        raise ValueError('unsupported activity category')
    if kind == 'activity_start' and result.get('state', 'active') not in ('active', 'wait', 'pause'):
        raise ValueError('unsupported activity state')
    return result


def finding_label_issues(data):
    return [field for field, values in FINDING_LABELS.items() if data.get(field) not in values]


def clock():
    # Boot UUIDs survive calendar/hostname changes but differ across boots.
    # macOS kern.boottime is a calendar value and can change without a reboot.
    try:
        boot = str(uuid.UUID(Path('/proc/sys/kernel/random/boot_id').read_text().strip()))
    except (OSError, ValueError):
        try:
            boot = str(uuid.UUID(subprocess.check_output(
                ['/usr/sbin/sysctl', '-n', 'kern.bootsessionuuid'],
                stderr=subprocess.DEVNULL, text=True).strip()))
        except (OSError, ValueError, subprocess.SubprocessError):
            boot = str(uuid.uuid4())  # Deliberately incomparable when unsupported.
    return {'utc': dt.datetime.now(dt.timezone.utc).isoformat(), 'monotonic': time.monotonic(),
            'domain': digest(['boot-session-uuid', boot])[:24]}


class Store:
    def __init__(self, spec, execution, producer):
        self.spec = Path(spec).resolve()
        self.execution = identifier(execution)
        self.producer = identifier(producer)
        self.root = self.spec / 'execution-metrics' / self.execution

    def publish(self, kind, data, key=None, refs=(), supersedes=None, observed=None):
        data = clean(kind, data)
        if kind == 'finding':
            for field in finding_label_issues(data):
                raise ValueError('unsupported finding ' + field + '; expected one of: ' + ', '.join(FINDING_LABELS[field]))
        key = key or str(uuid.uuid4())
        rid = digest([self.execution, self.producer, key])
        for ref in (*refs, *((supersedes,) if supersedes else ())):
            identifier(ref)
        content = {'version': VERSION, 'collector': COLLECTOR, 'id': rid, 'execution': self.execution,
                   'producer': self.producer, 'kind': kind, 'data': data, 'refs': list(refs), 'supersedes': supersedes}
        directory = self.root / self.producer
        directory.mkdir(parents=True, exist_ok=True)
        target = directory / (rid + '.json')
        if target.exists():
            previous = json.loads(target.read_text())
            if {k: v for k, v in previous.items() if k not in ('clock', 'collector')} != {k: v for k, v in content.items() if k != 'collector'}:
                raise ValueError('conflicting replay: ' + rid)
            return previous
        content['clock'] = observed or clock()
        raw = canonical(content) + '\n'
        temp = None
        try:
            with tempfile.NamedTemporaryFile(mode='w', dir=directory, prefix='.pending-', delete=False) as f:
                temp = Path(f.name)
                f.write(raw)
                f.flush()
                os.fsync(f.fileno())
            try:
                os.link(temp, target)  # Atomic publication, never overwrite another writer.
            except FileExistsError:
                return self.publish(kind, data, key, refs, supersedes, observed)
            fd = os.open(directory, os.O_RDONLY)
            try:
                os.fsync(fd)
            finally:
                os.close(fd)
        finally:
            if temp is not None:
                temp.unlink(missing_ok=True)
        return content

    def read(self):
        records, gaps = {}, []
        for path in sorted(self.root.glob('*/*.json')):
            r = None
            try:
                r = json.loads(path.read_text())
                if r['version'] != VERSION or r['execution'] != self.execution:
                    raise ValueError('unsupported version/execution')
                if r['producer'] != path.parent.name or r['id'] != path.stem:
                    raise ValueError('record ownership mismatch')
                if clean(r['kind'], r['data']) != r['data']:
                    raise ValueError('record contains unsupported values')
                if type(r['clock']['monotonic']) not in (int, float) or not math.isfinite(r['clock']['monotonic']):
                    raise ValueError('invalid monotonic observation')
                identifier(r['clock']['domain'])
                dt.datetime.fromisoformat(r['clock']['utc'].replace('Z', '+00:00'))
                if r['id'] in records and records[r['id']] != r:
                    raise ValueError('record identity collision')
                records[r['id']] = r
            except (OSError, ValueError, KeyError, TypeError, AttributeError) as exc:
                related = [r.get(k) for k in ('id', 'supersedes')] if isinstance(r, dict) else []
                related = [x for x in related if isinstance(x, str) and re.fullmatch(r'[a-f0-9]{64}', x)]
                gaps.append({'code': 'unreadable_record', 'record': str(path.relative_to(self.root)), 'detail': type(exc).__name__, 'related_ids': related})
        return list(records.values()), gaps


def effective(records):
    """Resolve linear corrections; exclude ambiguous families rather than choosing a leaf."""
    by_id = {r['id']: r for r in records}
    children, gaps, invalid = {}, [], set()
    for r in records:
        target = r.get('supersedes')
        if target:
            children.setdefault(target, []).append(r['id'])
            if target not in by_id or by_id[target]['kind'] != r['kind']:
                invalid.add(r['id'])
                gaps.append({'code': 'invalid_correction', 'record': r['id']})
    result = []
    visited = set()
    for root in records:
        if root.get('supersedes'):
            continue
        chain, node = [], root['id']
        while node not in chain:
            chain.append(node)
            visited.add(node)
            links = children.get(node, [])
            if len(links) > 1:
                gaps.append({'code': 'conflicting_corrections', 'record': node})
                break
            if not links:
                leaf = by_id[node]
                if leaf['id'] not in invalid:
                    provenance_changed = False
                    if root['kind'] == 'finding':
                        provenance_changed = any(leaf['data'].get(k) != root['data'].get(k) for k in ('finding', 'discovered_at', 'task', 'candidate', 'acceptance'))
                        channels = {by_id[rid]['data'].get('channel') for rid in chain
                                    if by_id[rid]['data'].get('channel') in FINDING_LABELS['channel']}
                        provenance_changed |= len(channels) > 1
                        if leaf['data'].get('channel') != root['data'].get('channel'):
                            provenance_changed |= not leaf['data'].get('evidence') or not leaf['data'].get('rationale')
                    if provenance_changed:
                        gaps.append({'code': 'changed_discovery_provenance', 'record': node})
                    else:
                        result.append(leaf)
                break
            node = links[0]
    for r in records:
        if r.get('supersedes') and r['id'] not in visited:
            gaps.append({'code': 'unresolved_correction', 'record': r['id']})
    return result, gaps
