import {readFileSync,writeFileSync,cpSync,mkdirSync} from 'node:fs';
const root='planos/tasks/prototype-feedback-refinement/';
const evidence='docs/qa/evidence/prototype-feedback-refinement/task-06/';
mkdirSync(evidence+'final',{recursive:true});
cpSync('docs/qa/evidence/native-tests/2026-09-25T14-53-12-502Z',evidence+'final/matrix',{recursive:true});
for(const id of ['IT-015','IT-016','IT-026'])cpSync('docs/qa/evidence/native-tests/2026-09-25T14-42-36-477Z/'+id,evidence+'final/'+id,{recursive:true});
let task=readFileSync(root+'task-06.md','utf8');
task=task.replace('status: in_progress','status: completed').replaceAll('- [ ]','- [x]');
task=task.slice(0,task.indexOf('## Execution notes'))+`## Execution notes

Technical scope completed 2026-09-25 via [apply-task-06.mjs](apply-task-06.mjs). CE43 now uses one 356×424 selectable base per eligible hero, with attached proportional portrait and native name/action text; CE42 retains immediate SELECT_VICTIM and its checkpoint. CE304 detaches candidate children during cleanup; CE351 preloads the final container. Bridge victimName resolves only pendingOutcome.victimId. CE266–281 carry the sixteen exact approved consequences; Map015/021 use the two neutral danger lines and the matching post-selection leads are guarded by outcomeApproachId. Variable 159 names that authored query result. Farewell/death ordering and the atomic domain action remain unchanged.

UT-079 first failed against the generic baseline, then passed with UT-021–028/044 (10 selected, 10 PASS). Final node --test --test-name-pattern 'IT-012|UT-079' rpg-maker/tests/campaign.test.mjs: **2 selected, 2 PASS**, exit 0, 272.8 seconds. [Final matrix receipts/captures](../../../docs/qa/evidence/prototype-feedback-refinement/task-06/final/matrix/) cover all eight victims at both supported viewport sizes/motion preferences, three/two/one candidates, portrait/name/edge activation, bounds/gaps, complete named text, one death and a non-first victim restored from the actual saved boundary. IT-015/016/026 also passed (three retained [receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-06/final/)); their runtime inputs are unchanged by subsequent IT-012-only sensor corrections.

Preserved failed runs under native-tests: 14-42-36 and 14-47-07 measured the hidden main-container sprite instead of the visible attached descendant; 14-48-08 exposed the provider's WrapBreak markup in the text sensor; 14-48-59 reached the old 240-second timeout while progressing. The final sensor measures the attached descendant, normalizes only native whitespace markup, and allows 420 seconds for the expanded sixteen-case full-reading matrix (observed 272 seconds). No runtime layout workaround was needed. The viewed three-candidate frame fits all portraits, full names and the warning.

Keep the consumed native data, final asset, query metadata, mutation script and canonical suite changes. Scoped self-review/deslop and whitespace checks passed; owned test browser/server/profile teardown completed. No commit, staging or remote operation occurred. Technical fixtures do not close V-008/LIVE, V-012/LIVE or human visual/narrative acceptance, assigned to task 13.

Public QA/devlog recipe: depart with a valid party, reach a naturally failed approach, read the irreversible warning, and deliberately choose a non-first candidate. Confirm that the farewell comes before the consequence naming that hero. Continue from that campaign's sacrifice checkpoint to verify the same victim; let the real expedition return feed the absence/board capture.
`;
writeFileSync(root+'task-06.md',task);
let graph=readFileSync(root+'tasks.md','utf8');
graph=graph.replace('Tasks 01–05 have completed their technical scopes; task 06 is in progress.','Tasks 01–06 have completed their technical scopes; task 07 is in progress.');
graph=graph.replace('T-004/SACRIFICE, T-005 | in_progress','T-004/SACRIFICE, T-005 | completed').replace('T-006/RETURN | pending','T-006/RETURN | in_progress');
graph=graph.replace('[task-06.md](task-06.md) is active','[task-07.md](task-07.md) is active').replace('Tasks 01–05 technical receipts','Tasks 01–06 technical receipts');
writeFileSync(root+'tasks.md',graph);
let verification=readFileSync(root+'verification.md','utf8').replace('Task 06 is active; tasks 07–13 remain pending.','Task 06 completed V-008/TECH/V-012/TECH/T-004/SACRIFICE/T-005: final IT-012/UT-079 passed (2/2), with IT-015/016/026 persistence/input receipts retained as described in task-06.md. Task 07 is active; tasks 08–13 remain pending.');
writeFileSync(root+'verification.md',verification);
let next=readFileSync(root+'task-07.md','utf8').replace('status: pending','status: in_progress').replace('Pending. No runtime change, test, fixture, screenshot or acceptance has been produced by task authoring.','Active 2026-09-25. The native baseline uses once-only switches 38–45, 60-frame fades and CE350 parallel release while choices are already enabled. The prepared mutation retains native drawing/moves and adds one transient wait; route completion is armed only after the last discovery reading. Baseline and final technical validation are pending.');
writeFileSync(root+'task-07.md',next);
