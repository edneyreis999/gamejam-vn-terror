#!/usr/bin/env python3
"""Optional local execution metrics. Run --help; commands inherit the caller's process context."""
import argparse
import json
import os
from pathlib import Path
import signal
import subprocess
import sys
import time
import uuid

from records import COLLECTOR, Store, clock, digest, safe_text
from telemetry import children, delta, freeze, participant, reconcile
from analysis import summarize


def diagnostic(exc):
    # Exception messages may contain paths, input values or credentials.
    print('metrics: collection gap (' + type(exc).__name__ + '); operation continues; disclose in task evidence', file=sys.stderr)


def attempt(operation):
    try:
        return operation()
    except (OSError, ValueError, KeyError, TypeError) as exc:
        diagnostic(exc)
        return None


def public_argv(argv, public):
    result = [Path(argv[0]).name]
    for i, arg in enumerate(argv[1:], 1):
        if i in public:
            result.append(safe_text(arg))
        elif arg.startswith('--'):
            result.append(arg.split('=', 1)[0] + ('=[redacted]' if '=' in arg else ''))
        else:
            result.append('[redacted]')
    return result


def observe(args, store):
    argv = args.argv[1:] if args.argv and args.argv[0] == '--' else args.argv
    if not argv:
        raise ValueError('observe requires a command after --')
    enabled = store is not None and (Path(args.spec) / '_execution-metrics.md').is_file()
    start = None
    if enabled:
        start = attempt(lambda: store.publish('command_start', {
            'session': args.session, 'task': args.task, 'activity': args.activity,
            'argv': public_argv(argv, args.public_arg), 'candidate': args.candidate,
            'checks': args.check, 'attempt': args.attempt, 'verification_type': args.verification_type,
            'environment': args.environment, 'tool': args.tool, 'acceptance': args.acceptance}, key=args.key))
    begin = time.monotonic()
    process, code = None, None
    handlers = {}
    def forward(signum, frame):
        if process is not None:
            try:
                process.send_signal(signum)
            except ProcessLookupError:
                pass
    try:
        # No shell, cwd/env rewriting, output capture, stdin consumption or retries.
        process = subprocess.Popen(argv)
        for signum in (signal.SIGINT, signal.SIGTERM, signal.SIGHUP):
            handlers[signum] = signal.signal(signum, forward)
        code = process.wait()
    except FileNotFoundError:
        code = 127
    except PermissionError:
        code = 126
    except OSError:
        code = 126
    finally:
        duration = time.monotonic() - begin
        for signum, handler in handlers.items():
            signal.signal(signum, handler)
        if enabled and start:
            attempt(lambda: store.publish('command_end', {'command': start['id'], 'returncode': code,
                'duration_seconds': duration, 'runner_seconds': args.runner_seconds,
                'evidence': args.evidence}, key=start['id'] + '-end', refs=[start['id']]))
    if code is not None and code < 0:
        signum = -code
        signal.signal(signum, signal.SIG_DFL)
        os.kill(os.getpid(), signum)
    return code if code is not None else 1


def parser():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--version', action='version', version=COLLECTOR)
    p.add_argument('--spec', required=True, help='actual consuming spec directory')
    p.add_argument('--run', help='explicit execution identity; required except start')
    p.add_argument('--producer', default=os.environ.get('CODEX_THREAD_ID', 'operator'))
    p.add_argument('--strict', action='store_true', help='fail collector-only operations on collection errors')
    sub = p.add_subparsers(dest='command', required=True)
    for name in ('start', 'resume', 'participant'):
        s = sub.add_parser(name)
        s.add_argument('--session', default=os.environ.get('CODEX_THREAD_ID'))
        s.add_argument('--key')
        s.add_argument('--candidate', default='unknown')
        s.add_argument('--environment', default='unknown')
        s.add_argument('--inclusion', choices=('own', 'inclusive', 'unknown'), default='unknown')
        s.add_argument('--parent')
        s.add_argument('--expected-cwd')
        s.add_argument('--reason', default='authorized execution entry')
    s = sub.add_parser('record', help='publish an allowlisted record; see format.md')
    s.add_argument('kind')
    s.add_argument('--data', required=True, help='JSON object; no transcripts or secrets')
    s.add_argument('--key', help='stable operation key; reuse for publication retries')
    s.add_argument('--ref', action='append', default=[])
    s.add_argument('--supersedes')
    s = sub.add_parser('freeze')
    s.add_argument('--session')
    s.add_argument('--mode', choices=('turn', 'position'), default='turn')
    sub.add_parser('reconcile')
    sub.add_parser('query')
    s = sub.add_parser('children')
    s.add_argument('--session', default=os.environ.get('CODEX_THREAD_ID'))
    s = sub.add_parser('historical')
    s.add_argument('path')
    s = sub.add_parser('observe')
    s.add_argument('--session', default=os.environ.get('CODEX_THREAD_ID'))
    s.add_argument('--key')
    s.add_argument('--task')
    s.add_argument('--activity')
    s.add_argument('--candidate', default='unknown')
    s.add_argument('--check', action='append', default=[])
    s.add_argument('--attempt', type=int, default=1)
    s.add_argument('--verification-type')
    s.add_argument('--environment')
    s.add_argument('--tool')
    s.add_argument('--acceptance')
    s.add_argument('--runner-seconds', type=float)
    s.add_argument('--evidence', action='append', default=[])
    s.add_argument('--public-arg', type=int, action='append', default=[], help='1-based safe argument index to publish verbatim after redaction')
    s.add_argument('argv', nargs=argparse.REMAINDER)
    return p


def execute(args):
    run = args.run or ('run-' + str(uuid.uuid4()))
    if args.command == 'observe':
        store = attempt(lambda: Store(args.spec, run, args.producer)) if args.run else None
        if store is None:
            print('metrics: no valid execution context; command runs without collection', file=sys.stderr)
        return observe(args, store)
    store = Store(args.spec, run, args.producer)
    if args.command not in ('start', 'historical', 'children') and not args.run:
        raise ValueError('explicit --run required; never infer the latest execution')
    if args.command == 'query':
        result = summarize(store)
    elif args.command == 'historical':
        source = json.loads(Path(args.path).read_text())
        values, gaps = delta(source['baseline']['usage'], source['final']['usage'])
        t = source['timing']
        result = {'delta': values, 'issues': gaps,
                  'uncached_input_tokens': values['input_tokens'] - values['cached_input_tokens'],
                  'timing_component_ms': t['preparation_ms'] + t['test_wall_ms'] + t['analysis_ms'],
                  'operational_total_ms': t['operational_total_ms'], 'timing_boundary': source['timing_boundary']}
    elif args.command == 'children':
        result = {'parent': args.session, 'children': children(args.session)}
    elif not (store.spec / '_execution-metrics.md').is_file():
        result = {'enabled': False, 'reason': 'no activation companion; no records written'}
    elif args.command in ('start', 'resume', 'participant'):
        records, _ = store.read()
        if args.command == 'start':
            existing = [r for r in records if r['kind'] == 'execution']
            if existing:
                result = {'enabled': True, 'execution': run, 'producer': args.producer, 'entry': existing[0]['id'], 'reused': True}
                print(json.dumps(result))
                return 0
            entry = store.publish('execution', {'candidate': args.candidate, 'environment': args.environment,
                'spec': '.', 'session': args.session}, key='execution')
            store.publish('quality', {'code': 'pre_initialization_prefix_unmeasured',
                'detail': 'Context before collector initialization is outside exact measurement.', 'affected': entry['id'], 'evidence': []}, key='entry-gap')
        else:
            if not any(r['kind'] == 'execution' for r in records):
                raise ValueError('execution does not exist')
            entry = store.publish('segment', {'session': args.session, 'reason': args.reason}, key=args.key or str(uuid.uuid4()))
        attached = None
        if args.session:
            key = args.key or ('participant-' + args.session)
            if args.command == 'resume' and not args.key:
                raise ValueError('resume requires a new stable --key for its segment')
            attached = attempt(lambda: participant(store, args.session, key + '-participant', args.inclusion, args.expected_cwd, args.parent))
        if attached is None:
            attempt(lambda: store.publish('quality', {'code': 'participant_unavailable' if args.session else 'missing_session_identity',
                'detail': 'Telemetry attachment unavailable; command and activity collection may continue, but token coverage is missing.',
                'affected': entry['id'], 'evidence': []}, key=entry['id'] + '-participant-gap'))
        if args.strict and args.session and attached is None:
            raise ValueError('participant collection failed')
        result = {'enabled': True, 'execution': run, 'producer': args.producer, 'entry': entry['id'],
                  'participant': attached['id'] if attached else None}
    elif args.command == 'record':
        result = store.publish(args.kind, json.loads(args.data), key=args.key, refs=args.ref, supersedes=args.supersedes)
    elif args.command == 'freeze':
        records, _ = store.read()
        participants = [r for r in records if r['kind'] == 'participant' and (not args.session or r['data']['session'] == args.session)]
        result = []
        for r in participants:
            item = attempt(lambda r=r: freeze(store, r, 'freeze-' + r['id'], args.mode))
            if item is None:
                attempt(lambda r=r: store.publish('quality', {'code': 'freeze_unavailable',
                    'detail': 'Participant boundary unavailable; retain incomplete coverage and disclose in task evidence.',
                    'affected': r['id'], 'evidence': []}, key='freeze-failed-' + r['id']))
            result.append(item)
        if not participants or (args.strict and any(r is None for r in result)):
            raise ValueError('participant boundary unavailable')
    elif args.command == 'reconcile':
        records, _ = store.read()
        participants = {r['id']: r for r in records if r['kind'] == 'participant'}
        boundaries = [r for r in records if r['kind'] == 'freeze']
        result = []
        for b in boundaries:
            item = attempt(lambda: reconcile(store, participants[b['data']['participant']], b))
            if item is None:
                attempt(lambda: store.publish('quality', {'code': 'reconciliation_failed', 'detail': 'Source unavailable or incompatible; retain prior measurements as provisional.', 'affected': b['id'], 'evidence': []}, key='reconciliation-failed-' + b['id']))
            result.append(item)
        if not boundaries or (args.strict and any(r is None for r in result)):
            raise ValueError('frozen boundary reconciliation unavailable')
    else:
        raise ValueError('unsupported operation')
    print(json.dumps(result, ensure_ascii=True, sort_keys=True))
    return 0


def main():
    args = parser().parse_args()
    try:
        return execute(args)
    except (OSError, ValueError, KeyError, TypeError) as exc:
        diagnostic(exc)
        return 2 if args.strict or args.command == 'query' else 0


if __name__ == '__main__':
    sys.exit(main())
