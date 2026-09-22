"""Collect independent outcome/Continue lots serially on the owned QA port."""
import copy
import json
import os
from pathlib import Path
import subprocess

spec = Path(__file__).parent
root = Path('docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918')
physical = root / 'task-10/runs/df0e5eb0-40ca-4e21-be4f-82b713285308'
reverse = root / 'task-10/runs/4c27fc9c-6c42-48b0-9296-4ab3cf574a36'
template = json.loads((spec / 'task-10-request-physical-first-02.json').read_text())
lots = [
    ('branch-destroy', 'directed', physical / 'final-choice.archive.json'),
    ('bad', 'directed', None),
    *[(boundary, 'continue', physical / (boundary + '.archive.json')) for boundary in
      ['opening', 'result', 'closure-first-01', 'closure-second-01', 'medallion', 'ending']],
    ('two-files', 'continue', reverse / 'ending.archive.json'),
]
results = []
for variant, case, archive in lots:
    request = copy.deepcopy(template)
    request['requestId'] = 'staging-' + case + '-' + variant + '-20260918'
    request['case'] = str(spec / ('task-10-' + case + '.mjs'))
    scenario_id = ('approved-staging-' if case == 'directed' else 'staging-continue-') + variant
    request['scenario'] = dict(id=scenario_id, profile='1280x720-normal', variant=variant,
                               configuration='port18727-native-player-input-' + ('archive' if archive else 'fresh'))
    claim = 'staging-journey' if case == 'directed' else 'earned-continue'
    request['claims'][0].update(id=claim, variant=variant, group=case,
                                source=dict(id=claim, variant=variant))
    request['freshness']['reason'] = 'Independent required outcome or earned Continue boundary, unchanged candidate.'
    path = spec / ('task-10-request-' + case + '-' + variant + '.json')
    path.write_text(json.dumps(request, ensure_ascii=False, indent=2) + '\n')
    env = {key: value for key, value in os.environ.items() if not key.startswith('DRYLAND_QA_')}
    env.update(DRYLAND_QA_PORT='18727', DRYLAND_QA_CREDITS='keyboard')
    env['DRYLAND_QA_STAGING' if case == 'directed' else 'DRYLAND_QA_BOUNDARY'] = variant
    if archive:
        env['DRYLAND_QA_SAVE_ARCHIVE'] = str(archive)
    log = root / ('task-04/directed-' + case + '-' + variant + '.log')
    with log.open('w') as output:
        result = subprocess.run(['node', '.agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs',
                                 '--project', '.', '--request', str(path)], env=env, stdout=output, stderr=subprocess.STDOUT)
    rows = [json.loads(line) for line in log.read_text().splitlines() if line.startswith('{')]
    row = dict(variant=variant, case=case, exitCode=result.returncode, log=str(log), result=rows[-1] if rows else None)
    results.append(row)
    (root / 'task-10/remaining-lots.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(dict(variant=variant, exitCode=result.returncode, status=row['result'].get('status') if row['result'] else None)), flush=True)
