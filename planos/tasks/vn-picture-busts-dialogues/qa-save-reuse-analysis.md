# QA save reuse — feasibility and implementation handoff

Date: 2026-09-11. Method: read-only source and existing QA-artifact inspection. No game/editor was opened, no campaign was played and no native save was copied during this investigation. The user authorized keeping a QA save copy in [ADR-005](adrs/adr-005.md).

## Conclusion

Reuse is feasible without adding manual saves or changing player-facing persistence. Reach a useful native checkpoint through legal player actions once, preserve its actual save plus index, and resume isolated copies through the normal title Continue command for subsequent checks. Preserve an initial complete legal run for each required prefix/roster; a resumed segment does not prove the omitted navigation again.

There are two levels. Same-run tab reopen/Continue already works in the directed executor and can repeat the current checkpoint until a later autosave replaces it. Reusing an older checkpoint after choosing an ending, or across fresh QA runs, needs an archived storage fixture and a supported pre-boot restore step. The current executor does not expose that restore capability.

## Verified native boundaries

| Native point | Useful repeated coverage | Limitation |
| --- | --- | --- |
| Sacrifice checkpoint, before farewell | Farewell bust, death continuation and same-death reload checks | Death is already committed; cannot change the victim by editing this save |
| Route-completion consequence, before lover reading | Lover framing and discovery sequence | Each route/order has its own real prefix |
| Council entry | Complete Council sequence for the captured eligible roster | Roster/previous deaths stay fixed |
| Reward after completing council.01 | Remaining Council narration, challenge/solo, confession, Andirá and opinions | This is not an arbitrary save at the final-choice menu |
| Ending checkpoint | Same chosen ending, memorial, epilogues and credits | The final choice is already committed |

EventBridge permits only save slot 0 and explicit safe checkpoint reasons. Active text/presentation is not a valid new checkpoint. `nextCheckpoint` requests Council on phase entry, reward when the medallion becomes complete, and ending on the final decision. CampaignRules marks the medallion complete when council.01 finishes. Common Event 44 routes those reasons; Common Event 53 saves immediately after either final choice.

Consequently, archive a pre-ending Council save before choosing either ending. To cover the other choice, restore a separate isolated copy of that pre-ending save and select Continue; replay the remaining Council text normally. Do not create a new final-choice checkpoint or change the saved cursor. Preserve separate ending saves when repeated terminal/visual checks benefit from them.

## Storage and compatibility

The browser save is the native compressed payload, not an `expeditionQA.snapshot()` JSON report. Native storage uses localforage with keys derived from the game's advanced gameId and save name. Preserve both `file0` and matching `global` save-index data; include required scoped storage/preferences metadata without copying the user's personal profile.

Capture must wait for the real autosave and consistent persisted index, not just a fixed delay. The stock save flow invokes index persistence separately, so the QA readiness predicate must verify both persisted values and stable sequence/metadata before archiving. Capture each payload unchanged with hashes, producer run/transcript, origin/gameId, native revision, runtime/data/asset fingerprints, actual phase/cursor, roster/deaths, route order and checkpoint provenance.

The game refuses a different nativeLayoutVersion before installing game objects. This spec changes CommonEvents/System and will assign a new revision: old baseline saves cannot be relabeled to make them load. Native event changes invalidate old cached saves. Relevant plugin/rule/asset changes also require a freshness decision even when the layout string is unchanged. Produce the reusable Council bank after the implementation/layout stabilizes; keep invalidated copies as evidence, not active test inputs.

## Executor gap and proposed ownership

The installed directed runner creates a fresh browser context for every run. Its reopen operation retains storage inside that context, but its startup does not import a saved storage fixture. The project adapter currently copies the game and declares fresh isolated storage; copying a browser save into the game directory alone would not populate browser storage.

Task 05 should prepare and verify narrowly scoped save capture plus pre-boot restore support. Keep game-specific key selection, provenance and compatibility in the QA adapter/helper. If generic browser storage import/export is missing, extend the installed executor's explicit fixture lifecycle with focused lifecycle coverage; do not fork the runner, add a game cheat/bootstrap plugin or hide a storage write in a read-only observation. Record preparation separately from legal player input.

Restore only into a new, owned QA context before gameplay, then use native Continue. Never replace storage in a running campaign or call domain actions to synthesize the checkpoint. Verify readback, index presence, unchanged payload hashes, native load and expected roster/stage. Each branch receives its own copy; later autosaves must not overwrite the archived master.

Task 08 chooses a minimal bank per distinct required roster/history and identifies which source run proves each prefix. Task 09 produces the actual Council copies during its first legal campaigns on the frozen implementation, then reuses them for compatible suffix checks. At least the selected complete campaign baselines, loading validation and first checkpoint production remain genuine runs. Failure injection, 2x2 and synthetic stack fixtures retain their separate integration labels.

## Benefit and limits

This mainly removes repeated travel through the two initial routes and final route when retesting Council/ending presentation for an already captured roster. It does not eliminate the first legal run, distinct roster/death/order coverage, changed-revision recapture, native load validation or visual inspection.

Measure first-run production time, archive/restore time and suffix replay time separately during execution. The saving for repeated checks is approximately the avoided prefix time minus archive/restore overhead. No runtime benchmark was executed, so this study does not justify a new fixed total-duration promise.

No native `file0`/`global` pair, `.rmmzsave` archive or explicit save-payload archive was found in the inspected repository QA evidence/deliveries and game paths. Existing snapshots, transcripts and boundary reports are not substitutes. The current action records capture ownership; the actual copy is pending the future native checkpoint.

## Revised wall-clock estimate for the slowest QA lots

The user requested this comparison after authorizing save reuse. This is an estimate for agent execution and evidence inspection, not a new benchmark, task completion or scope change. Assume implemented recipes, functioning directed cases and verified archive tooling; implementation/debugging time is separate.

Historical native runner reports record 81.4 seconds for Reunir, 81.5 for Destruir, 92.5 for solo Council, 113.6 for total loss and 109.6 for a mixed memorial/credits run. These durationMs values include recorded runner infrastructure and execution, but not the subsequent inspection of all captures, source preparation or defect repair. The reports are historical evidence of execution cost, not proof of the new bust behavior. The earlier narrative report also contains slower preliminary runs; use the named raw reports below for this comparison. Different hardware, additional temporal checkpoints and the new composition can change the costs.

| Rank | QA lot | Estimated wall time | Work driving the estimate |
| --- | --- | --- | --- |
| 1 | Visual and temporal inspection, V-007 across the campaign and fixture captures | 35–60 min | Twelve assets, two effective game areas, normal/reduced motion, focus changes, maximal ensembles, reflected Andirá, prisons and text legibility. Reuse captured journeys; this row budgets inspection, not another complete campaign per image. |
| 2 | Council, farewell and ending variant execution, D-02–D-05 | 25–45 min | Produce genuine distinct histories, capture the save bank, execute alternate endings from compatible copies and check participant/story invariants. Includes runner setup, captures and coverage accounting; detailed visual inspection is budgeted above. |
| 3 | Continue, revision compatibility and archive integrity, D-07/V-006 | 15–30 min | Isolated reopen/restore, expected stage and roster, no duplicated effects, rejected incompatible save and unchanged master bytes. These checks belong primarily to task 05; task 09 reuses fresh evidence. |
| 4 | All-eight tavern coverage, D-01 | 15–25 min | Thirty-two sections / seventy-two original boxes across profile, conversation, selection and party-full feedback, plus continuity/focus assertions and input coverage. Detailed framing inspection is budgeted in V-007. |

The brief RPG Maker editor check is approximately 3–5 minutes if the application/project is available; it is not a major QA lot. Controls, interruption and 2x2 have existing task owners and should share the required captures and setups rather than force extra complete campaigns. Do not sum these rows into a new task-09 estimate: some evidence is produced in earlier tasks and retained when fresh. Final suite execution, deep review, documentation closure and bug repairs are outside this comparison of the slowest QA lots.

Roster diversity limits reuse. A Council contains at most three eligible heroes. The required 0/1/2/3 sizes and all eight hero opinions imply at least five distinct Council histories: one run of each size covers only six hero appearances, even if all are different. This is a coverage lower bound, not a claim that five executable legal recipes are already available or sufficient for every death/order variant. A saved trio cannot provide a different trio by reloading alone.

The main bottleneck is therefore visual review, followed by variant coverage. Save reuse helps repeated compatible suffixes, especially after corrections, but the historical navigation times do not support attributing tens of minutes to a single clean campaign. Re-estimate from actual prefix/archive/restore/suffix and inspection timings during task 09.

Historical timing sources:

- [Reunir run](../../../docs/qa/evidence/init-rpg-maker-mz/task-13/directed-reunite-20260909-02/report.json).
- [Destruir run](../../../docs/qa/evidence/init-rpg-maker-mz/task-13/directed-destroy-20260909-01/report.json).
- [Solo Council run](../../../docs/qa/evidence/init-rpg-maker-mz/task-13/directed-solo-20260909-01/report.json).
- [Total-loss run](../../../docs/qa/evidence/init-rpg-maker-mz/task-13/directed-loss-20260909-01/report.json).
- [Mixed memorial run](../../../docs/qa/evidence/init-rpg-maker-mz/task-13/directed-mixed-20260909-03/report.json).

## Source locators

- [EventBridge](<../../../rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js>): validateEnvelope, validateCheckpoint, DataManager save/load aliases, nextCheckpoint and Checkpoint command.
- [CampaignRules](<../../../rpg-maker/The Dryland Drowned/js/plugins/Dryland_CampaignRules.js>): completeCurrentPassage and final-choice handling.
- [CommonEvents](<../../../rpg-maker/The Dryland Drowned/data/CommonEvents.json>): CE 44 checkpoint dispatch and CE 53 final-choice autosave.
- [MZ storage](<../../../rpg-maker/The Dryland Drowned/js/rmmz_managers.js>): saveGame, saveGlobalInfo, loadZip, saveToForage/loadFromForage and forageKey.
- [Native README](../../../rpg-maker/README.md): single autosave, origin/profile and revision behavior.
- [Directed adapter](../../../rpg-maker/qa/directed-adapter.mjs) and [player](../../../rpg-maker/qa/native-player.mjs): current fixture/storage lifetime and native Continue inputs.
- [Installed runner](../../../.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs) and [integration contract](../../../.agents/skills/rpg-maker-mz-qa-execution/references/project-integration.md): fresh context, reopen and missing startup storage import.
