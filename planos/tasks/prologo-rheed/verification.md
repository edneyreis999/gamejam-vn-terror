---
status: approved
implemented: true
static_verified: true
runtime_verified: true
human_accepted: true
release_ready: true
---

# Verification — Rheed's prologue

## Sensor matrix

| ID | Requirement | Sensor | Setup/inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001/002/005/006 | Static + existing harness | Native events, rules, plugin settings, baseline diff | Exact script/order, matching completion boundaries, no unrelated scene/party changes | Task 01 execution below | Map002, rules, CE, plugins, script | PASS |
| V-002 | RQ-001/002/003 | Directed playtest + visual | New Game in clean file; supported viewports | Correct speakers, black for N01–N03/tavern for N04–N06, readable text, paired busts with emphasis at N04–N06, no extra ending line | Task 03 report, corrected pixel inspection and directed captures | Events, art, settings, engine/plugins | PASS A1–A4 |
| V-003 | RQ-002/003/005 | Harness + directed playtest | Native controls and available saved checkpoints | No duplicate reading/transfer, correct resume, existing roster and return | Final B input log, current-save archives and read-only observations | Events, plan, presentation, save behavior | PASS current saves; old saves excluded |
| V-004 | RQ-003/006 | Asset inspection + human visual | Actual older-Rheed/Ivaí files | Correct supplied portraits and paired presentation; final bust fitting deferred by user | Supplied assets, selected captures and user scope review | Art and native transforms | Accepted current baseline; fitting deferred |
| V-005 | RQ-004 | Audio listening + read-only audio state | Nonzero volumes; start/finish prologue (title has no BGM) | Silent entire opening; original preparation sound returns; preferences unchanged | Final A3/B WAVs and user audio confirmation | Audio commands, plugins, settings | PASS, user listening confirmed |
| V-006 | RQ-001 | Human editorial | Full opening at ordinary reading pace | Brief, colloquial, accepted ambiguity; no unexplained added lore | User decision/date | Script and delivered composition | Accepted within reviewed scope |

## Runtime scenarios

| Scenario | Starting state | Steps | Expected result | Evidence | Execution mode | Authority | Variants | Reuse | Invalidation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S01 Opening | Clean native new campaign | Start; read N01–N06; enter preparation | RQ-001–006; eight heroes; no selectable Rheed | Final task-03 report | directed-browser | Script and UI contract | Mouse and keyboard; supported viewports; normal/reduced motion | Existing startup scenario structure only | All prologue dependencies |
| S02 Reading controls | Revised prologue | HIDE/show; Settings/return; attempt FAST on unseen text | No skipped unseen text, lost portrait or duplicate action | Final task-03 report | directed-browser | RQ-003/005 | Narrator, Ivaí, paired young-Rheed question | None claimed | Events/presentation/plugins |
| S03 Persistence | Naturally produced new-game and preparation saves | Exit; Continue; finish reading/prepare | Valid native cursor, no duplicated BEGIN or roster changes | Final task-03 report | directed-browser + harness | RQ-005 | Revised saves; old saves excluded by user | No old result proves new copy | Event structure, save transport, reading IDs |
| S04 Return | Preparation after new opening | Select heroes; depart; use legal return/recuar | Original preparation restored; no opening replay or lingering attachment | Final task-03 report | directed-browser | RQ-005/006 | Normal gameplay path | Existing route-return scenario structure | Events, plugin activation |
| S05 Audio | Title with nonzero audio settings | Start, read and enter preparation; repeat after Continue where available | Prologue silent, following audio intact | Final task-03 report | audio listening + read-only observation | RQ-004 | New Game and supported resumed checkpoint | None | Native audio/events/settings |

Current QA viewport definitions and zoom exclusion follow [ADR-G003](../../../docs/adrs/adr-g003-excluir-testes-de-zoom-nativo.md). Expected results come from this spec, not from old captures. Preserve input history, runtime revision/asset hashes and environment with evidence. QA observations do not mutate campaign state.

## Commands and execution status

| Scope | Command | Result |
| --- | --- | --- |
| Local runtime | `npm start` after reading `docs/_memory/local-game-run.md` | not executed in spec authoring |
| Existing test entry | `node --test rpg-maker/tests/campaign.test.mjs` | Selected cases executed; commands, results and limits in Task 01 execution below. Full suite not executed. |
| Documentation | Local-target check for seven spec files/new GDD section; UTF-8/header check; byte equality of canonical/v5.0; v4.0 diff check; `git diff --check` | passed during consolidation on 2026-09-16; not runtime verification |

No new test suite is created by this document. Tests for revised behavior must expose incorrect speaker transitions, early passage completion and leaking sound, not merely mirror literal configuration.

## Human acceptance

| Criterion | Owner | Decision | Evidence/date |
| --- | --- | --- | --- |
| Consolidated spec set | User | approved | Explicit approval of consolidated spec and task creation, 2026-09-16 |
| Delivered pacing/subtext | User / Narrativa | accepted within reviewed scope | User reviewed Chrome/MZ, reported conformity, requested visual refinements then authorized closure |
| Bust identity/framing | User / Technical Art | current baseline accepted; fine fitting excluded | Supplied old/young assets; user deferred fine fitting and narrator background |
| Silence and preparation transition | User / UI/UX | confirmed | User answered “Sim, confirmei os dois” to silence and returning ambience |

## Release verdict

**PASS — current prologue update, with known refinements excluded by the user.** V-001–006 are satisfied within the revised scope. This is not a full-game/full-suite or Git publication verdict. Historical records below retain their original failures/pending states; this section and the final closure supersede them.

## Task 01 execution — 2026-09-17

The imported `Reed final.png` is bound without modifying its bytes. Map002 now has six semantic passages and nine message boxes, native bust/attachment commands, black backdrop, local audio stop and the original single preparation transfer. The shared ambience event, hero catalog and vendor files were preserved. AttachedPictures defaults no longer automatically attach slots used by unrelated scenes.

- **V-001 — PASS.** `node planos/tasks/prologo-rheed/verify-static.mjs` checked approved copy/order, preservation of other map fields, scoped plugin settings and asset SHA-256. `node --check` and `git diff --check` passed for the checked code/diff.
- **Canonical technical coverage:** 64 selected cases have PASS records: 58 UT cases plus IT-001, IT-004, IT-014, IT-025, IT-029 and IT-047. Command: `node --test --test-name-pattern '^(IT-001|IT-004|IT-014|IT-025|IT-029|IT-047|UT-)' rpg-maker/tests/campaign.test.mjs`, with `DRYLAND_CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe` and `DRYLAND_QA_PORT=18729`. Broad run: 62 passed, 2 failed. Targeted `^(IT-025|UT-073)` rerun: 2 passed after correcting the obsolete one-box test expectation and using Windows directory junctions for the isolated fixture. Game files did not change between these runs; retained results remain applicable. Node 22.21.0, Chrome 152.0.7977.83, Windows, 1280×720.
- **V-002/V-004 supporting evidence:** IT-001/004 traversed the public entry and complete new opening. Agent inspected older-Rheed, young text-only and closing-Ivaí captures; black background, text and bust transitions were visible. This is not final human art acceptance or the full directed variant matrix.
- **V-003 supporting evidence:** IT-004 proves N01 remains unread through its first two boxes and completes exactly once, six completions precede formation, and visiting/returning from a hero does not replay the prologue. IT-014 exercised the nine native save/load boundaries, including `new_campaign`; IT-025 checked HIDE/restore without extra reading. IT-014 is integration evidence with harness instrumentation, not an independent public-input replay of all campaign checkpoints.
- **V-005 supporting evidence:** IT-029 proved no active BGM/BGS/ME during each opening box and normal People1 ambience after preparation, then exercised existing ambience/theme behavior. This is runtime audio-state evidence; listening/recording acceptance is still pending.
- **V-006:** pending user review of the delivered pacing/subtext.

First failures and repairs: old three-step fixtures left rules in intro; their explicit prefixes now contain the six approved passages and later sequence values shift by three, preserving the original downstream recipes. The Windows `python3` alias was unavailable, so the harness uses `python` there; Chrome uses its existing executable override. Elevated execution still rejected default symlink creation; explicit Windows junctions now implement the intended directory fixture links. An early IT-004 result became stale because a different test input changed during the run; it was rerun against frozen inputs rather than claimed as a pass.

The older baseline formation save was not captured. A post-prologue formation checkpoint is not introduced by this change; the natural new-campaign checkpoint remains before reading. Do not create a QA-only save to satisfy the task paraphrase. Old-save comparison and genuinely available checkpoint fixtures remain explicit QA-plan work; no old mid-event save compatibility claim is made.

Local evidence (ignored raw archive): `docs/qa/evidence/prologo-rheed/task-01/` contains `baseline.json`, `static.json`, first-failure logs, `verification-results.txt`, `recheck-results.txt`, `retained-results.json`, preserved per-case execution records and selected captures. These are local execution artifacts, not a fresh-clone prerequisite. All launched test sessions finished; their owned browsers, profiles and servers use the harness cleanup. No user process was stopped.

Candidate review/deslop: keep native map/rules/plugin configuration and original art as runtime inputs; keep canonical test/fixture updates as consumers of the new contract, including the two Windows fixture prerequisites. Keep the spec, task tracking and one-time checked authoring script as provenance; native events remain the editable text source. Raw logs/captures stay in the ignored evidence archive. Vendor sources and unrelated game data are unchanged. No commit, staging or publication was performed. Full QA and final human acceptance remain deferred to tasks 02–03.


## Task 02 — directed QA plan, 2026-09-17

Planning complete: [guide](../../../docs/qa/guides/prologo-rheed.md), [charter](../../../docs/qa/charters/CH-prologo-rheed.md), [cycle report](../../../docs/qa/reports/2026-09-17-prologo-rheed.md). S01 maps to FOR-mz-formation-roster and ART-mz-visual-audio-runtime (A); S02 to ACC-mz-hide-keyboard-qa (B1); S03 to LOC-mz-session-recovery-export (B2/B4); S04 to FOR-mz-formation-roster (B3); S05 to ART-mz-visual-audio-runtime (C). ART-mz-human-approval owns the human checks in C. V-002–006 remain pending. No game tests or directed sessions were run in task 02. The missing baseline formation save is an explicit fixture gap; no new checkpoint is authorized. Task 03 can execute independent lots now.


## Task 03 — first directed execution, 2026-09-17 (superseded visual diagnosis)

Historical record: the visual failure below was refuted by direct PNG pixel comparison; see the correction below. Other evidence limits still apply.

**FAIL visual / NOT_READY.** [Report](../../../docs/qa/reports/2026-09-17-prologo-rheed.md) and [open defect](../../../docs/qa/bugs/BUG-20260917-prologo-busto-e-nome-intermitentes.md) own the findings. All four presentation variants were collected. V-002 fails because some actual screenshots lack the expected bust/name even with correct internal state; renderer diagnostics did not establish a repair. V-003 passes current-save continuity, logical controls and return after retreat, but old-formation-save compatibility remains blocked by missing genuine fixture and visual restoration shares the defect. V-004 remains unaccepted and visually affected. V-005 has zero-output prologue WAVs and nonzero preparation WAVs with unchanged volumes, but no listening acceptance; the current title has no music cue. V-006 has no human runtime decision. No new game-data/vendor change was made.

Task-01 V-001 evidence remains scoped technical support; it never certified these visual states. Task-03 source/collection/inspection hashes are in the local `task-03/execution-ledger.json`. All recorded runner cleanup resources closed. First infrastructure, case and diagnostic failures remain preserved.

Candidate audit: keep `rpg-maker/qa/prologo-rheed.mjs` as the repeatable directed case, the two-line Windows path-containment repair in the common executor, the existing QA report/scenario/task updates and the unique bug record. Raw requests, fixture copies, saves, screenshots, WAVs and manifests stay local/ignored. Prior task-01 production/test/asset changes retain their separate scope; they were not staged or modified in this round. No acceptance archive/deletion, commit or publication. Syntax and diff checks passed; no full-suite rerun claimed. Resume diagnosis of the visual defect before final presentation acceptance.


## Task 03 — diagnostic correction, 2026-09-17

The reported missing bust/name was a preview-inspection false positive: 78 exact region comparisons of original PNGs matched their visible reference. The bug is closed with its original report preserved. V-002 technical presentation is supported by original pixels plus the directed sequence/transfer observations; no human framing or editorial acceptance is inferred. No production change was needed.

The maintained QA case now releases Escape after observing the Options scene exit, with guaranteed cleanup, instead of depending on a 70 ms pulse under software rendering. The software diagnostic and normal A1 passed after this repair. Windows/POSIX path containment passed eight focused checks. B-recheck remains valid for current saves; the genuine old-formation-save gap remains. V-004–006 retain human/listening requirements. Full delivery: **BLOCKED**, not release ready.

Candidate audit/deslop for this correction: keep the focused QA input repair and cross-platform containment correction, and maintain the corrected verdict in this verification file, cycle report and original bug. Keep original production/test/spec changes under tasks 01–02; they are not newly accepted here. Diagnostic images, hashes and temporary experiment records are local ignored evidence, not fresh-clone runtime dependencies. The one-off render diagnosis script preserves the investigated boundary and is not imported by game code. No runtime workaround, vendor edit, staging, commit or publication.


Final correction check: normal A1 and reduced-motion A4 passed the affected controls with the final QA case; software A1 also passed. Direct pixel audit: 114/114 matching regions. Fixture/current runtime files match; no game-runtime repair was introduced. Syntax, focused path containment and diff checks passed. Raw report/candidate/equivalence hashes remain in the local task-03 evidence directory. Correction verdict **PASS**; full task/delivery **BLOCKED** by the already documented old-save and human-sensor gaps.


## Human feedback and background refinement

The user tested the prior prologue in both Chrome and RPG Maker MZ and reported apparent conformity, requesting only the tavern behind Ivaí/young Rheed. Record this as positive overall feedback on the prior build, not a specific audio-listening result or old-save verification. The approved adjustment inserts one native Show Picture command in Map002 before N04 and reuses the existing preparation backdrop. N01–N03 stay black, N05 stays without a bust. Task 03 remains active; presentation evidence is refreshed for the modified background and prior visual acceptance does not automatically extend to it.


### Tavern background refinement — validation

User review of the previous version in Chrome and RPG Maker MZ reported apparent conformity, with this sole requested background adjustment. Map002 now contains one additional native Show Picture command, copied from the existing preparation composition: picture 1, Dryland_Taverna, centered at (640, 360), 100% scale. The materialized authoring script proves all other map data unchanged and verifies black for the first six boxes, tavern for the last three. No plugin/engine/asset modification.

Fresh directed runs: A1 normal 1280×720 (`runs/a0d9b47c-1f15-4cf8-9bb8-75ef89ae6c2c`) and A4 reduced motion 1920×1080 (`tavern-A4`) under the local task-03 evidence root. Both passed their sequence/background/portrait/control assertions and reached preparation; all owned resources closed. Inspected older narration on black, Ivaí on the tavern and young Rheed’s text-only question on the tavern, including the large viewport. Collection statuses remain executed-awaiting-review; this record supplies technical inspection, not a new human judgment.

**PASS for the requested adjustment in A1/A4.** Other variant and resumed-save evidence predates the new Map002 and is not claimed fresh. A2/A3, affected recovery coverage, explicit audio listening and the full task’s remaining acceptance/old-save requirements retain their limits. Syntax and diff checks pass; no full-suite run claimed. Candidate review/deslop: retain the single native command, one-time guarded transformation, updated QA background assertion and active GDD/spec/presentation/QA records as their respective consumers; preserve previous changes separately and keep raw captures local/ignored. No commit or publication.


## Paired bust refinement — 2026-09-17

User supplied `Reed-novo.png` and explicitly requested both interlocutors on opposite sides, slightly enlarging the current speaker. Current contract: older Rheed alone/black in N01–N03; young Rheed left (picture 60) and Ivaí right (61), both attached above the dialogue on the tavern backdrop in N04–N06. Active height 480 and listening height 480/1.1, with instant scale/position updates and stable bases. Both slots and attachments are removed before preparation; no new checkpoint, prose, audio or vendor changes. This supersedes the former text-only young question and single-visible-portrait restriction.

The one-time `paired-busts.mjs` verifies that only portrait commands change, leaving all other map fields and command sequence intact. Existing IT-004 was updated because the owner-approved presentation changed; it still verifies the complete reading lifecycle and absence of both portraits on exit. First launch failed with EPIPE because the helper default points to macOS Chrome; setting DRYLAND_CHROME to the installed Windows executable resolved launch, and IT-004 passed (one selected test, not a full suite).

Fresh A1 normal 1280×720 and A4 reduced 1920×1080 directed cases passed background/identity/relative-scale/order, HIDE, Settings restoration, FAST rejection and exit checks. Reports: local task-03 `runs/f2c1a8e5-e4b8-4633-9ea1-9b27031900bf` and `pair-A4`; all owned resources closed. Inspected the alternating portraits on N04/N05, with no overlap of dialogue or each other. Collection remains executed-awaiting-review; this paragraph records technical inspection, not human framing approval.

**PASS for the paired-presentation adjustment in A1/A4 and IT-004.** New-pair approval in MZ/Chrome by the user remains pending; A2/A3 and recovery are not freshly replayed for this change. Historical audio/old-save limitations remain. Final verification/deslop: retain native Map002, supplied asset, guarded authoring script, existing canonical test and QA assertion updates, and active GDD/contracts/tracking. Preserve numbered GDD v5.0 and other working changes; keep raw captures local/ignored. No commit, publication or full-release claim.


## User-deferred visual refinements

The user identified bust fitting against the dialogue box and the background image during older Rheed’s lines as future work, explicitly outside this update. These two refinements do not block the current scope and are not claims of completed polish. Current visual baseline is retained. This clarification does not itself approve separate audio, narrative or save-compatibility sensors. Documentation only; no runtime/assets changed or tests rerun.


## Final closure — 2026-09-17

Current scope: new campaigns and saves produced by this version. The user explicitly excluded earlier saves after the genuine baseline-formation fixture gap was explained; this is an exclusion, not a compatibility pass. Bust fitting and the older narrator’s background remain future refinements. User feedback after Chrome/MZ review and subsequent “ótimo”/proceed instructions accept the current baseline with those refinements; the separate audio question received explicit confirmation of both silence and returning ambience. No extra approval was inferred for the deferred art.

Final directed A2: `runs/f17bed8b-f780-47d0-8ef4-bb0dfab10123`; A3: `pair-final-A3`; current-save recovery: `pair-final-B` under the local task-03 evidence root. A1 `runs/f2c1a8e5-e4b8-4633-9ea1-9b27031900bf` and A4 `pair-A4` are retained: all data/js/img/audio bytes match the new fixture. IT-004 passed for the final paired-bust implementation; task-01 selected evidence is retained only for unchanged invariants. No full suite rerun.

The four opening variants cover mouse/keyboard, both viewports and normal/reduced motion. B exercised interrupted introduction/Continue, actual last checkpoint while in preparation, hero conversation, selecting three heroes, departure, Continue in the encounter and retreat to preparation without replay. Both portraits are absent at preparation entry; screenshots show no residual prologue portraits on return. Recorded new-game prologue audio: 3.491 s, peak/RMS zero; resumed prologue: 2.581 s, zero. Preparation: 3.029 s, peak about 0.1074. Human listening complements these rapid technical samples. All final runners closed their owned resources.

Candidate review: retain native prologue/rules/plugin settings and supplied assets; canonical test/fixture consumers; active spec/GDD/QA records; guarded one-time authoring scripts as historical provenance. No vendor source change. Raw diagnostic evidence stays local/ignored. The unrelated package.json change is outside this prologue acceptance and was not edited or staged. No claim that the whole working tree is ready to commit.

Organization: selected real images and audio were copied byte-for-byte to [delivery material](../../../docs/qa/deliveries/prologo-rheed/README.md), with SHA-256 provenance. Original raw files remain intact. No deletion, staging, commit, PR, Trello message or publication. The contracted task is complete; no runtime change was made during closure.


## Pre-commit review — 2026-09-17

Candidate readiness: **PASS**, restricted to this prologue delivery on branch `feat/prologo-rheed`, based on `3b5730495302e8676785e994421b3adfb4b82078`. Runtime, imported portraits, affected regression tests, Windows QA support, approved contracts and selected delivery evidence are retained for their existing consumers. Canonical status and portrait instructions were reconciled; GDD v5.0 remains historical. The unrelated game `package.json` working-tree entry is excluded and preserved. No push or remote publication is included.

IT-074 initially confused the new prologue tavern picture with preparation. Its observation now records the native map ID and asserts preload ordering at Map003, preserving the original preparation requirement. The focused rerun passed IT-074 and UT-059 (2/2). The unit run passed 57/58; UT-059 could not launch Chrome inside the sandbox and passed in that authorized rerun. Thus all 58 unit cases passed cumulatively, not in a single clean run. Logs: local-only `docs/qa/evidence/prologo-rheed/task-03/precommit-unit.txt` and `precommit-recheck.txt`. The full suite was not run. This test/documentation repair does not change production inputs or invalidate retained directed QA.

Organization: temporary `diagnose-render.mjs` was copied byte-for-byte to the ignored local archive as `docs/qa/evidence/prologo-rheed/task-03/diagnose-render-source.mjs` before removing the temporary source. No maintained consumer depends on it. Raw evidence remains local, not a backup available from a fresh clone; selected captures and provenance remain versioned under `docs/qa/deliveries/prologo-rheed/`. Candidate hashes and staging checks accompany the local pre-commit record.
