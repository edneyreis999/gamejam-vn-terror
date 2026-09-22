"""Recollect affected presentation and checkpoints from the repaired candidate."""
import copy
import json
import os
from pathlib import Path
import subprocess

spec = Path(__file__).parent
root = Path('docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918')
template = json.loads((spec / 'task-10-request-physical-first-02.json').read_text())
results = []


def collect(variant, case='directed', *, reduced=False, archive=None, file=1, credits='keyboard'):
    request = copy.deepcopy(template)
    key = case + '-' + variant + ('-reduced' if reduced else '-normal')
    request['requestId'] = 'staging-final-' + key + '-20260918'
    request['case'] = str(spec / ('task-10-' + case + '.mjs'))
    request['scenario'] = dict(
        id=('approved-staging-' if case == 'directed' else 'staging-continue-') + variant,
        profile='1920x1080-reduced' if reduced else '1280x720-normal', variant=variant,
        configuration=f'final-candidate-file{file}-port18727-{credits}')
    claim = 'staging-journey' if case == 'directed' else 'earned-continue'
    request['claims'][0].update(id=claim, variant=variant, group=case, source=dict(id=claim, variant=variant))
    request['freshness']['reason'] = 'Fresh candidate after Draska and threshold exit repairs; new earned parents and stable captures.'
    request_path = spec / ('task-10-request-final-' + key + '.json')
    request_path.write_text(json.dumps(request, ensure_ascii=False, indent=2) + '\n')
    env = {k: v for k, v in os.environ.items() if not k.startswith('DRYLAND_QA_')}
    env.update(DRYLAND_QA_PORT='18727', DRYLAND_QA_CREDITS=credits, DRYLAND_QA_FILE=str(file))
    env['DRYLAND_QA_STAGING' if case == 'directed' else 'DRYLAND_QA_BOUNDARY'] = variant
    if reduced:
        env['DRYLAND_QA_MOTION'] = 'reduce'
    if archive:
        env['DRYLAND_QA_SAVE_ARCHIVE'] = str(archive)
    log = root / ('task-04/final-' + key + '.log')
    with log.open('w') as output:
        run = subprocess.run(['node', '.agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs',
                              '--project', '.', '--request', str(request_path)], env=env, stdout=output, stderr=subprocess.STDOUT)
    rows = [json.loads(line) for line in log.read_text().splitlines() if line.startswith('{')]
    result = rows[-1] if rows else {}
    results.append(dict(variant=variant, case=case, reduced=reduced, exitCode=run.returncode, log=str(log), result=result))
    (root / 'task-10/final-lots.json').write_text(json.dumps(results, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(dict(variant=variant, case=case, reduced=reduced, exitCode=run.returncode,
                         status=result.get('status'), runId=result.get('runId'))), flush=True)
    if run.returncode or result.get('status') not in ['pass', 'executed-awaiting-review']:
        raise SystemExit('Collection failed; inspect its preserved report before resuming dependent lots.')
    return Path(result['output'])


physical = collect('physical-first', credits='natural')
reverse = collect('supernatural-first', reduced=True, file=2, archive=physical / 'ending.archive.json', credits='mouse')
collect('bad', reduced=True)
collect('branch-destroy', archive=physical / 'final-choice.archive.json')
for boundary in ['opening', 'result', 'closure-first-01', 'closure-second-01', 'medallion', 'ending']:
    collect(boundary, 'continue', archive=physical / (boundary + '.archive.json'))
collect('two-files', 'continue', archive=reverse / 'ending.archive.json')
