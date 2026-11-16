import contextlib
import importlib.util
import io
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch

SCRIPTS = Path(__file__).resolve().parents[1] / 'scripts'
sys.path.insert(0, str(SCRIPTS))
from records import Store, COMPONENTS, CATEGORIES, digest, effective, clock
from telemetry import read_session, participant, freeze, reconcile, delta, children
from analysis import summarize


def stamp(n):
    return '2026-01-01T00:%02d:%02d+00:00' % (n // 60, n % 60)


def observed(n, mono=None, domain='boot-a'):
    return {'utc': stamp(n), 'monotonic': n if mono is None else mono, 'domain': domain}


def usage(n):
    return dict(input_tokens=n, cached_input_tokens=0, cache_write_input_tokens=0,
                output_tokens=0, reasoning_output_tokens=0, total_tokens=n)


class MetricsTests(unittest.TestCase):
    def test_macos_boot_session_survives_calendar_and_hostname_changes(self):
        boots = iter(['11111111-1111-4111-8111-111111111111',
                      '11111111-1111-4111-8111-111111111111',
                      '22222222-2222-4222-8222-222222222222'])
        calendar = iter(['{ sec = 100, usec = 1 } old local date',
                         '{ sec = 99, usec = 2 } adjusted local date',
                         '{ sec = 101, usec = 3 } another local date'])
        def sysctl(args, **kwargs):
            return next(boots) if args[-1] == 'kern.bootsessionuuid' else next(calendar)
        with patch('records.Path.read_text', side_effect=OSError), \
                patch('records.subprocess.check_output', side_effect=sysctl), \
                patch('platform.node', side_effect=['old-host', 'new-host', 'new-host']):
            first, second, rebooted = clock(), clock(), clock()
        self.assertEqual(first['domain'], second['domain'])
        self.assertNotEqual(second['domain'], rebooted['domain'])

    def test_linux_boot_identity_does_not_depend_on_hostname(self):
        with patch('records.Path.read_text', return_value='11111111-1111-4111-8111-111111111111\n'), \
                patch('platform.node', side_effect=['old-host', 'new-host']):
            self.assertEqual(clock()['domain'], clock()['domain'])

    def test_missing_or_invalid_boot_identity_is_not_comparable(self):
        for value in ['', 'not-a-boot-uuid']:
            with patch('records.Path.read_text', return_value=value), \
                    patch('records.subprocess.check_output', return_value=value):
                self.assertNotEqual(clock()['domain'], clock()['domain'])

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.spec = self.root / 'different-project' / 'contracts' / 'orchard'
        self.spec.mkdir(parents=True)
        (self.spec / '_execution-metrics.md').write_text('Enabled for authorized work.\n')
        self.home = self.root / 'codex'
        self.home.mkdir()
        self.env = patch.dict(os.environ, {'CODEX_HOME': str(self.home), 'CODEX_THREAD_ID': 'parent'})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.store = Store(self.spec, 'execution-a', 'writer-a')

    def log(self, session='parent', parent=None):
        path = self.home / 'sessions' / ('rollout-' + session + '.jsonl')
        path.parent.mkdir(exist_ok=True)
        meta = {'id': session, 'cwd': str(self.root), 'cli_version': 'fixture',
                'source': {'subagent': {'thread_spawn': {'parent_thread_id': parent}}} if parent else 'cli'}
        path.write_text(json.dumps({'type': 'session_meta', 'payload': meta}) + '\n')
        return path

    def append(self, path, kind, n, **fields):
        with path.open('a') as stream:
            stream.write(json.dumps({'type': 'event_msg', 'timestamp': stamp(n), 'payload': dict(type=kind, **fields)}) + '\n')

    def token(self, path, n, total):
        self.append(path, 'token_count', n, info={'total_token_usage': usage(total), 'quota': 'NEVER_PERSIST'}, transcript='NEVER_PERSIST', secret='NEVER_PERSIST')

    def entry(self):
        return self.store.publish('execution', {'spec': '.', 'candidate': 'revision+dirty-input-sha256', 'environment': 'fixture', 'session': 'parent'}, key='entry', observed=observed(0))

    def activity(self, key, start, end, session='parent', category='implementation', task='work_7.md', parent=None, state='active'):
        r = self.store.publish('activity_start', {'session': session, 'category': category, 'task': task, 'parent': parent, 'state': state}, key=key, observed=observed(start))
        if end is not None:
            self.store.publish('activity_end', {'activity': r['id']}, key=key+'-end', observed=observed(end))
        return r

    def cli(self, *args, **kw):
        return subprocess.run([sys.executable, str(SCRIPTS / 'metrics.py'), '--spec', str(self.spec), '--run', 'execution-a', '--producer', 'writer-a', *args], text=True, capture_output=True, **kw)

    def test_optional_activation_and_no_implicit_work(self):
        (self.spec / '_execution-metrics.md').unlink()
        r = self.cli('start')
        self.assertEqual(r.returncode, 0)
        self.assertFalse(json.loads(r.stdout)['enabled'])
        r = self.cli('observe', '--', sys.executable, '-c', 'print("normal")')
        self.assertEqual(r.stdout, 'normal\n')
        self.assertFalse((self.spec / 'execution-metrics').exists())
        (self.spec / '_execution-metrics.md').write_text('enabled')
        self.log()
        r = self.cli('start')
        self.assertTrue(json.loads(r.stdout)['enabled'])
        self.assertEqual([x['data']['code'] for x in self.store.read()[0] if x['kind'] == 'quality'], ['pre_initialization_prefix_unmeasured'])

    def test_nested_start_reuses_execution_and_categories(self):
        self.log()
        first = json.loads(self.cli('start').stdout)
        second = json.loads(self.cli('start').stdout)
        self.assertEqual(first['entry'], second['entry'])
        for n, category in enumerate(CATEGORIES):
            self.activity(category, n, n+1, category=category, task=None if n == 0 else 'work_7.md')
        summary = summarize(self.store)
        self.assertEqual(set(summary['by_activity']), set(CATEGORIES))
        self.assertIn('(spec)', summary['by_task'])
        self.assertEqual(len([r for r in self.store.read()[0] if r['kind']=='execution']), 1)

    def test_overlap_parent_wait_and_missing_end(self):
        self.entry()
        parent = self.activity('parent-span', 0, 15, category='coordination')
        self.activity('a', 0, 10, parent=parent['id'])
        self.activity('b', 5, 15, session='child')
        self.activity('wait', 15, 18, state='wait')
        self.activity('interrupted', 18, None)
        self.store.publish('freeze', {'session': 'parent', 'participant': 'p', 'turn': 't', 'position': 1, 'mode': 'turn'}, observed=observed(15))
        result = summarize(self.store)
        self.assertEqual(result['time']['elapsed_seconds'], 15)
        self.assertEqual(result['time']['accumulated_agent_seconds'], 20)
        self.assertEqual(result['time']['concurrent_overlap_seconds'], 5)
        self.assertEqual(result['time']['wait_pause_agent_seconds'], 3)
        self.assertIn('missing_or_incompatible_activity_end', [g['code'] for g in result['gaps']])

    def test_different_clock_domains_not_subtracted(self):
        a = self.activity('a', 0, None)
        self.store.publish('activity_end', {'activity': a['id']}, observed=observed(20, 2, 'boot-b'))
        self.assertIsNone(summarize(self.store)['activities'][0]['duration_seconds'])

    def test_command_semantics_and_redaction(self):
        self.entry()
        code = 'import os,sys; print(os.environ["METRICS_TEST_SENTINEL"]); print(sys.stdin.read()); sys.exit(7)'
        with patch.dict(os.environ, {'METRICS_TEST_SENTINEL': 'inherited'}):
            r = self.cli('observe', '--key', 'cmd', '--verification-type', 'e2e', '--environment', 'browser', '--tool', 'Playwright Test', '--', sys.executable, '-c', code, 'secret=NEVER_PERSIST', input='original stdin')
        self.assertEqual(r.returncode, 7)
        self.assertEqual(r.stdout, 'inherited\noriginal stdin\n')
        result = summarize(self.store)
        self.assertEqual(result['commands'][0]['result']['returncode'], 7)
        self.assertGreater(result['commands'][0]['result']['duration_seconds'], 0)
        self.assertIn('e2e / browser / Playwright Test', result['verification_dimensions'])
        self.assertNotIn('NEVER_PERSIST', ''.join(p.read_text() for p in self.store.root.glob('*/*.json')))
        self.assertNotIn(code, ''.join(p.read_text() for p in self.store.root.glob('*/*.json')))

    def test_publication_failure_does_not_change_command(self):
        (self.spec / 'execution-metrics').write_text('not a directory')
        r = self.cli('observe', '--', sys.executable, '-c', 'import sys; print("ran once"); sys.exit(9)')
        self.assertEqual(r.returncode, 9)
        self.assertEqual(r.stdout, 'ran once\n')
        self.assertIn('collection gap', r.stderr)

    def test_telemetry_unavailable_does_not_stop_entry(self):
        r = self.cli('start')
        self.assertEqual(r.returncode, 0)
        self.assertIsNone(json.loads(r.stdout)['participant'])
        self.assertIn('collection gap', r.stderr)

    def test_command_monotonic_ignores_utc_jump_and_preserves_runner(self):
        a = self.store.publish('command_start', {'session':'parent', 'argv':['test'], 'task':'work_7.md'}, observed=observed(0, 100))
        self.store.publish('command_end', {'command':a['id'], 'duration_seconds':2, 'runner_seconds':1.8, 'returncode':0, 'evidence':[]}, observed=observed(62, 102))
        result = summarize(self.store)['commands'][0]['result']
        self.assertEqual(result['duration_seconds'], 2)
        self.assertEqual(result['runner_seconds'], 1.8)

    def test_arithmetic_subsets_missing_reset_and_semantics(self):
        before = dict(input_tokens=558464, cached_input_tokens=474112, cache_write_input_tokens=0, output_tokens=3414, reasoning_output_tokens=733, total_tokens=561878)
        after = dict(input_tokens=1305430, cached_input_tokens=1177728, cache_write_input_tokens=0, output_tokens=6731, reasoning_output_tokens=872, total_tokens=1312161)
        values, issues = delta(before, after)
        self.assertFalse(issues)
        self.assertEqual(values['total_tokens'], 750283)
        self.assertEqual(values['input_tokens'] - values['cached_input_tokens'], 43350)
        self.assertEqual(values['reasoning_output_tokens'], 139)
        self.assertEqual(delta(usage(100), usage(150))[0]['total_tokens'], 50)
        self.assertIsNone(delta(usage(150), usage(20))[0]['total_tokens'])
        self.assertIsNone(delta(None, usage(20))[0]['total_tokens'])
        bad = usage(20); bad['output_tokens'] = 1
        self.assertIsNone(delta(usage(10), bad)[0]['total_tokens'])

    def measured(self, session, start, finish, parent=None, inclusion='own'):
        path = self.log(session, parent)
        self.append(path, 'task_started', 0, turn_id='turn-'+session)
        self.token(path, 1, start)
        p = participant(self.store, session, 'p-'+session, inclusion=inclusion, parent=parent)
        self.token(path, 10, finish)
        b = freeze(self.store, p, 'f-'+session)
        self.append(path, 'task_complete', 11, turn_id='turn-'+session)
        reconcile(self.store, p, b)
        return path, p, b

    def test_duplicate_snapshot_and_reconciliation_are_idempotent(self):
        path, p, b = self.measured('parent', 100, 150)
        before = len(self.store.read()[0])
        reconcile(self.store, p, b)
        self.assertEqual(len(self.store.read()[0]), before)
        self.assertEqual(summarize(self.store)['own_session_components']['total_tokens']['observed'], 50)

    def test_hierarchy_own_inclusive_unknown_and_unrelated(self):
        self.measured('parent', 0, 100)
        self.measured('a', 0, 40, parent='parent')
        self.measured('b', 0, 60, parent='parent')
        self.measured('aggregate', 0, 200, inclusion='inclusive')
        self.measured('unrelated-newest', 0, 900, inclusion='unknown')
        result = summarize(self.store)
        self.assertEqual(result['own_session_components']['total_tokens']['observed'], 200)
        self.assertFalse(result['hierarchy_total_exact'])
        self.assertEqual(children('parent'), ['a', 'b'])
        self.assertEqual(read_session('parent')['session'], 'parent')
        with self.assertRaises(ValueError):
            participant(self.store, 'a', 'bad-parent', parent='someone-else')

    def test_mixed_and_unattributed_never_prorated(self):
        self.activity('implementation', 0, 5)
        self.activity('tests', 5, 12, category='test_creation')
        path = self.log()
        self.append(path, 'task_started', 0, turn_id='turn')
        self.token(path, 1, 100)
        p = participant(self.store, 'parent', 'p', inclusion='own')
        self.token(path, 10, 130)
        self.token(path, 13, 130)
        self.token(path, 20, 150)
        b = freeze(self.store, p, 'f')
        self.append(path, 'task_complete', 21, turn_id='turn')
        reconcile(self.store, p, b)
        result = summarize(self.store)
        self.assertEqual(result['token_attribution']['mixed']['total_tokens']['observed'], 30)
        self.assertEqual(result['token_attribution']['unattributed']['total_tokens']['observed'], 20)
        self.assertEqual(result['own_session_components']['total_tokens']['observed'], 50)

    def test_final_response_late_excludes_confirming_turn(self):
        path = self.log()
        self.append(path, 'task_started', 0, turn_id='measured')
        self.token(path, 1, 100)
        p = participant(self.store, 'parent', 'p', inclusion='own')
        self.token(path, 10, 140)
        b = freeze(self.store, p, 'f')
        provisional = reconcile(self.store, p, b)
        self.assertEqual(provisional['data']['state'], 'pending')
        self.token(path, 12, 160)
        self.append(path, 'task_complete', 13, turn_id='measured')
        self.append(path, 'task_started', 14, turn_id='confirming')
        self.token(path, 20, 190)
        final = reconcile(self.store, p, b)
        self.assertEqual(final['data']['state'], 'closed')
        self.assertEqual(summarize(self.store)['own_session_components']['total_tokens']['observed'], 60)
        count = len(self.store.read()[0])
        reconcile(self.store, p, b)
        self.assertEqual(len(self.store.read()[0]), count)
        self.assertTrue(any(r['id'] == provisional['id'] for r in self.store.read()[0]))

    def test_missing_completion_never_includes_next_turn(self):
        path = self.log()
        self.append(path, 'task_started', 0, turn_id='measured')
        self.token(path, 1, 100)
        p = participant(self.store, 'parent', 'p', inclusion='own')
        self.token(path, 10, 140)
        b = freeze(self.store, p, 'f')
        self.append(path, 'task_started', 14, turn_id='confirming')
        self.token(path, 20, 190)
        self.assertEqual(reconcile(self.store, p, b)['data']['state'], 'pending')
        self.assertEqual(summarize(self.store)['own_session_components']['total_tokens']['observed'], 40)

    def test_source_mutation_is_detected(self):
        path, p, b = self.measured('parent', 100, 150)
        path.write_text(path.read_text().replace('150', '170'))
        with self.assertRaisesRegex(ValueError, 'changed incompatibly'):
            reconcile(self.store, p, b)

    def test_private_payload_and_partial_line_not_persisted(self):
        path, p, b = self.measured('parent', 100, 150)
        with path.open('a') as out:
            out.write('{"private":')
        reconcile(self.store, p, b)
        published = ''.join(p.read_text() for p in self.store.root.glob('*/*.json'))
        self.assertNotIn('NEVER_PERSIST', published)
        self.assertNotIn('quota', published)
        self.assertNotIn('transcript', published)
        self.assertNotIn('incomplete_or_invalid_source_line', published)  # Outside the frozen completed turn.

    def test_concurrent_producers_replay_and_interrupted_publication(self):
        stores = [self.store, Store(self.spec, 'execution-a', 'writer-b')]
        errors = []
        def write(store):
            try:
                for _ in range(3):
                    store.publish('quality', {'code':'test', 'detail':'observed', 'affected':'scope', 'evidence':[]}, key='same-key')
            except Exception as exc:
                errors.append(exc)
        threads = [threading.Thread(target=write, args=(s,)) for s in stores]
        for thread in threads: thread.start()
        for thread in threads: thread.join()
        self.assertFalse(errors)
        self.assertEqual(len(self.store.read()[0]), 2)
        (self.store.root / 'writer-a' / '.pending-interrupted').write_text('{')
        self.assertEqual(len(self.store.read()[0]), 2)
        with patch('records.os.link', side_effect=OSError('disk failure')):
            with self.assertRaises(OSError):
                self.store.publish('quality', {'code':'retry'}, key='retry')
        self.store.publish('quality', {'code':'retry'}, key='retry')
        self.assertEqual(len(self.store.read()[0]), 3)

    def test_correction_history_conflict_and_unknown_format(self):
        first = self.store.publish('quality', {'code':'original'}, key='a')
        second = self.store.publish('quality', {'code':'corrected'}, key='b', supersedes=first['id'])
        current, gaps = effective(self.store.read()[0])
        self.assertEqual([r['id'] for r in current], [second['id']])
        self.assertFalse(gaps)
        self.store.publish('quality', {'code':'conflict'}, key='c', supersedes=first['id'])
        current, gaps = effective(self.store.read()[0])
        self.assertFalse(current)
        self.assertIn('conflicting_corrections', [g['code'] for g in gaps])
        path = next(self.store.root.glob('*/*.json'))
        data = json.loads(path.read_text()); data['version'] = 99; path.write_text(json.dumps(data))
        self.assertIn('unreadable_record', [g['code'] for g in self.store.read()[1]])

    def finding(self, key, channel, classification='product', acceptance=None, discovered=10, origin='introduced'):
        return self.store.publish('finding', {'finding':key, 'task':'work_7.md', 'candidate':'candidate-a', 'channel':channel,
            'classification':classification, 'origin':origin, 'discovered_at':stamp(discovered), 'acceptance':acceptance,
            'evidence':['evidence/result.json'], 'rationale':'Observed the independent expected outcome fail.'}, key=key, observed=observed(discovered))

    def test_acceptance_classification_origin_and_identity(self):
        marker = self.store.publish('acceptance', {'task':'work_7.md', 'candidate':'candidate-a'}, observed=observed(5))
        self.finding('construction', 'e2e', acceptance=marker['id'], discovered=3)
        self.finding('unit', 'unit')
        self.finding('review', 'review')
        accepted = self.finding('delivery', 'e2e', acceptance=marker['id'])
        self.finding('old', 'e2e', acceptance=marker['id'], origin='pre_existing')
        self.finding('unknown-origin', 'e2e', acceptance=marker['id'], origin='unknown')
        for classification in ('infrastructure','obsolete_expectation','test','unclassified'):
            self.finding(classification, 'e2e', classification, marker['id'])
        persona = self.finding('persona', 'persona')
        for relation in ('confirmation', 'confirmation', 'regression_test', 'fix', 'retest_failed', 'retest_passed'):
            self.store.publish('finding_link', {'finding':'persona', 'relation':relation, 'activity':None, 'evidence':['result.json']})
        result = summarize(self.store)
        self.assertEqual(result['defect_counts']['delivery'], {'introduced':1, 'pre_existing':1, 'unknown':1})
        self.assertEqual(result['defect_counts']['persona']['introduced'], 1)
        changed = dict(persona['data'], channel='e2e', acceptance=marker['id'])
        self.store.publish('finding', changed, supersedes=persona['id'])
        self.assertIn('changed_discovery_provenance', [g['code'] for g in summarize(self.store)['gaps']])

    def test_reclassification_preserves_discovery(self):
        f = self.finding('undiagnosed', 'e2e', 'unclassified')
        self.store.publish('finding', dict(f['data'], classification='test'), supersedes=f['id'])
        result = summarize(self.store)
        self.assertEqual(result['findings'][0]['classification'], 'test')
        self.assertEqual(sum(result['defect_counts']['delivery'].values()), 0)

    def test_finding_publication_rejects_unsupported_labels(self):
        valid = self.finding('supported', 'persona')
        for field, value in [('channel', 'persona_qa'), ('classification', 'test_defect'),
                             ('origin', 'pre-existing')]:
            with self.subTest(field=field), self.assertRaisesRegex(ValueError, field):
                self.store.publish('finding', dict(valid['data'], **{field:value}), key=field)
        self.assertEqual(len(list(self.store.root.glob('*/*.json'))), 1)

    def test_legacy_finding_labels_need_explicit_evidenced_correction(self):
        original = self.finding('legacy', 'persona', origin='pre_existing')
        path = self.store.root / 'writer-a' / (original['id'] + '.json')
        legacy = dict(original, collector='1.0.5', data=dict(original['data'], channel='persona_qa', origin='pre-existing'))
        path.write_text(json.dumps(legacy))  # A record emitted by the old permissive writer.
        before = path.read_bytes()
        view = summarize(self.store)
        self.assertEqual(view['defect_counts']['persona']['pre_existing'], 0)
        self.assertIn('unsupported_finding_label', [g['code'] for g in view['gaps']])
        self.assertEqual(view['findings'][0]['channel'], 'persona_qa')
        fixed = self.store.publish('finding', dict(original['data'], rationale='Original session evidence establishes persona discovery; correct unsupported labels only.'), key='labels-fixed', supersedes=original['id'])
        view = summarize(self.store)
        self.assertEqual(view['defect_counts']['persona']['pre_existing'], 1)
        self.assertEqual(view['findings'][0]['id'], fixed['id'])
        self.assertEqual(path.read_bytes(), before)
        self.assertEqual(view['published_file_count'], 2)
        moved = self.root / 'relocated-labels'
        shutil.copytree(self.spec, moved)
        self.assertEqual(view, summarize(Store(moved, 'execution-a', 'reader')))
        # Once an explicit correction establishes a valid channel, it is immutable.
        self.store.publish('finding', dict(original['data'], channel='e2e'), key='channel-change', supersedes=fixed['id'])
        self.assertIn('changed_discovery_provenance', [g['code'] for g in summarize(self.store)['gaps']])

    def test_legacy_origin_and_classification_do_not_silently_count(self):
        for field, value in [('origin', 'pre-existing'), ('classification', 'test_defect')]:
            original = self.finding(field, 'persona')
            path = self.store.root / 'writer-a' / (original['id'] + '.json')
            legacy = dict(original, data=dict(original['data'], **{field:value}))
            path.write_text(json.dumps(legacy))
        view = summarize(self.store)
        self.assertEqual(sum(view['defect_counts']['persona'].values()), 0)
        self.assertEqual(sum(g['code']=='unsupported_finding_label' for g in view['gaps']), 2)

    def test_relocation_independent_of_source_logs(self):
        self.entry()
        self.activity('a', 0, 10, task='milestones/alpha.md')
        self.activity('b', 10, 20, task='contract-final.md')
        self.measured('parent', 100, 150)
        before = summarize(self.store)
        moved = self.root / 'elsewhere'
        shutil.copytree(self.spec, moved)
        shutil.rmtree(self.spec)
        shutil.rmtree(self.home)
        after = summarize(Store(moved, 'execution-a', 'reader'))
        self.assertEqual(before, after)
        self.assertEqual(set(after['by_task']), {'milestones/alpha.md', 'contract-final.md'})

    def test_unknown_correction_quarantines_affected_family(self):
        first = self.store.publish('quality', {'code':'original'}, key='original')
        self.store.publish('quality', {'code':'supported'}, key='supported', supersedes=first['id'])
        unknown = self.store.publish('quality', {'code':'unsupported'}, key='unsupported', supersedes=first['id'])
        path = self.store.root / 'writer-a' / (unknown['id'] + '.json')
        data = json.loads(path.read_text()); data['version'] = 99; path.write_text(json.dumps(data))
        view = summarize(self.store)
        self.assertEqual(view['effective_record_count'], 0)
        self.assertEqual(view['published_file_count'], 3)
        self.assertIn('unreadable_correction_family', [g['code'] for g in view['gaps']])

    def test_real_observer_uses_monotonic_under_utc_jump(self):
        import metrics
        args = metrics.parser().parse_args(['--spec', str(self.spec), '--run','execution-a','observe','--runner-seconds','1.8','--','test-command'])
        class Process:
            def wait(self): return 0
        with patch('metrics.subprocess.Popen', return_value=Process()), patch('metrics.time.monotonic', side_effect=[100, 102]), patch('records.clock', side_effect=[observed(0,100), observed(62,102)]):
            self.assertEqual(metrics.observe(args, self.store), 0)
        result = summarize(self.store)['commands'][0]['result']
        self.assertEqual(result['duration_seconds'], 2)
        self.assertEqual(result['runner_seconds'], 1.8)

    def test_process_signal_status_preserved(self):
        r = self.cli('observe', '--', sys.executable, '-c', 'import os,signal; os.kill(os.getpid(), signal.SIGTERM)')
        self.assertEqual(r.returncode, -15)
        self.assertEqual(summarize(self.store)['commands'][0]['result']['returncode'], -15)

    def test_malformed_record_is_reported_without_crashing_query(self):
        r = self.store.publish('quality', {'code':'test'}, key='malformed')
        path = self.store.root / 'writer-a' / (r['id'] + '.json')
        data = json.loads(path.read_text()); data['clock'] = {}; path.write_text(json.dumps(data))
        self.assertIn('unreadable_record', [g['code'] for g in summarize(self.store)['gaps']])

    def test_unknown_components_and_partial_lines_inside_window_are_gaps(self):
        path = self.log()
        self.append(path, 'task_started', 0, turn_id='turn')
        self.token(path, 1, 100)
        p = participant(self.store, 'parent', 'p', inclusion='own')
        with path.open('a') as out: out.write('incomplete\n')
        self.append(path, 'token_count', 10, info={'total_token_usage':dict(usage(150), unknown_counter=8)})
        b = freeze(self.store, p, 'f')
        self.append(path, 'task_complete', 12, turn_id='turn')
        result = reconcile(self.store, p, b)
        self.assertEqual(result['data']['state'], 'incomplete')
        self.assertTrue(any(x.startswith('unsupported_counter_components') for x in result['data']['issues']))
        self.assertTrue(any(x.startswith('incomplete_or_invalid_source_line') for x in result['data']['issues']))

    def test_supported_correction_chain_is_portable_and_counted_once(self):
        original = self.finding('diagnosis', 'unit', 'unclassified')
        diagnosed = self.store.publish('finding', dict(original['data'], classification='product'), key='diagnosed', supersedes=original['id'])
        final = self.store.publish('finding', dict(original['data'], classification='product', origin='pre_existing'), key='origin', supersedes=diagnosed['id'])
        view = summarize(self.store)
        self.assertEqual(view['published_file_count'], 3)
        self.assertEqual(len(view['findings']), 1)
        self.assertEqual(view['findings'][0]['id'], final['id'])
        self.assertEqual(view['findings'][0]['channel'], 'unit')
        self.assertEqual(sum(view['defect_counts']['delivery'].values()), 0)

    def test_missing_reference_is_not_silently_treated_as_complete(self):
        self.store.publish('freeze', {'session':'parent', 'participant':'missing', 'turn':'turn', 'position':1, 'mode':'turn'})
        self.assertIn('missing_record_reference', [g['code'] for g in summarize(self.store)['gaps']])

    def test_published_token_delta_is_checked_against_source_counters(self):
        self.measured('parent', 100, 150)
        r = next(r for r in self.store.read()[0] if r['kind'] == 'token')
        data = dict(r['data'], delta=dict(r['data']['delta'], total_tokens=999))
        self.store.publish('token', data, supersedes=r['id'])
        view = summarize(self.store)
        self.assertIn('inconsistent_token_delta', [g['code'] for g in view['gaps']])
        self.assertIsNone(view['own_session_components']['total_tokens']['observed'])

    def test_activity_correction_preserves_endpoint_reference(self):
        original = self.activity('a', 0, 10, category='implementation')
        fixed = self.store.publish('activity_start', dict(original['data'], category='test_creation'), supersedes=original['id'], observed=observed(30))
        view = summarize(self.store)
        self.assertEqual(view['activities'][0]['id'], fixed['id'])
        self.assertEqual(view['activities'][0]['duration_seconds'], 10)
        self.assertEqual(view['activities'][0]['category'], 'test_creation')
        self.assertFalse(view['gaps'])

    def test_late_command_metadata_correction_keeps_original_measurement_clocks(self):
        activity = self.activity('check', 0, 10, category='verification')
        command = self.store.publish('command_start', {'session':'parent', 'task':'task_a.md', 'activity':'wrong',
            'argv':['check'], 'candidate':'r1', 'checks':['check'], 'attempt':'one', 'verification_type':'unit',
            'environment':'node', 'tool':'runner', 'acceptance':None}, observed=observed(1))
        self.store.publish('command_end', {'command':command['id'], 'duration_seconds':2, 'runner_seconds':None,
            'returncode':0, 'evidence':[]}, observed=observed(3))
        fixed = self.store.publish('command_start', dict(command['data'], activity=activity['id']),
            supersedes=command['id'], observed=observed(40))
        view = summarize(self.store)
        self.assertEqual(view['commands'][0]['id'], fixed['id'])
        self.assertEqual(view['commands'][0]['activity'], activity['id'])
        self.assertEqual(view['commands'][0]['result']['duration_seconds'], 2)
        self.assertFalse(view['gaps'])
        self.assertEqual(self.store.read()[0][0]['version'], 1)
        self.assertEqual(fixed['clock'], observed(40))

    def test_position_boundary_excludes_later_work_in_same_turn(self):
        path = self.log()
        self.append(path, 'task_started', 0, turn_id='same-turn')
        self.token(path, 1, 100)
        p = participant(self.store, 'parent', 'p', inclusion='own')
        self.token(path, 10, 140)
        b = freeze(self.store, p, 'f', mode='position')
        result = reconcile(self.store, p, b)
        self.assertIn('inflight_turn_tail_excluded', result['data']['issues'])
        self.token(path, 20, 190)
        self.append(path, 'task_complete', 21, turn_id='same-turn')
        final = reconcile(self.store, p, b)
        self.assertIn('inflight_turn_tail_excluded', final['data']['issues'])
        self.assertEqual(summarize(self.store)['own_session_components']['total_tokens']['observed'], 40)

    def test_collector_upgrade_replays_without_changing_old_provenance(self):
        with patch('records.COLLECTOR', '1.0.0'):
            original = self.store.publish('quality', {'code':'observed'}, key='stable')
        with patch('records.COLLECTOR', '1.0.3'):
            replay = self.store.publish('quality', {'code':'observed'}, key='stable')
        self.assertEqual(replay, original)
        self.assertEqual(replay['collector'], '1.0.0')
        self.assertEqual(len(self.store.read()[0]), 1)

    def test_denied_telemetry_records_gap_and_preserves_operation(self):
        import metrics
        args = metrics.parser().parse_args(['--spec',str(self.spec),'--run','execution-a','--producer','writer-a','start'])
        with patch('telemetry.read_session', side_effect=PermissionError('denied')), contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()) as diagnostic:
            self.assertEqual(metrics.execute(args), 0)
        self.assertIn('PermissionError', diagnostic.getvalue())
        self.assertIn('participant_unavailable', [r['data']['code'] for r in self.store.read()[0] if r['kind'] == 'quality'])
        r = self.cli('observe', '--', sys.executable, '-c', 'import sys; print("operation"); sys.exit(6)')
        self.assertEqual((r.returncode, r.stdout), (6, 'operation\n'))

    def test_record_allowlist_and_relative_references(self):
        with self.assertRaises(ValueError):
            self.store.publish('quality', {'code':'bad', 'transcript':'private'})
        with self.assertRaises(ValueError):
            self.store.publish('quality', {'code':'bad', 'evidence':['/private/source.json']})
        with self.assertRaises(ValueError):
            Store(self.spec, '../escape', 'writer')


if __name__ == '__main__':
    unittest.main()
