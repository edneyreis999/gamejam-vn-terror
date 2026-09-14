---
id: "16"
status: blocked
depends_on: ["15"]
verification_ids: [V-001, V-002, V-003, V-005, V-006, V-007, V-008, V-009, V-010, V-011, V-012, V-014]
---

# Task 16 — Execute resumable QA and verify delivery

## Outcome

The implemented candidate has fresh, distinctly labeled integration, native-editor, directed gameplay, visual, audible and human evidence for every selected criterion, and verification.md records its actual delivery verdict and remaining limits.

## Authority

- [Spec](spec.md): RQ-001–RQ-018.
- [Verification](verification.md): this task's primary V-IDs, all scenario rows/variants and pending implementation human judgments.
- [Graph/coverage](tasks.md), [QA plan task](task-15.md), the resulting maintained QA plan, all five discipline contracts and ADR-001–003.
- Activate [rpg-maker-mz-qa-execution](../../../.agents/skills/rpg-maker-mz-qa-execution/SKILL.md), then [rpg-maker-mz-final-verify](../../../.agents/skills/rpg-maker-mz-final-verify/SKILL.md). Before browser input, read QA execution's directed-browser reference and applicable project-integration reference.
- Read [local runtime guidance](../../../docs/_memory/local-game-run.md), [QA tree](../../../docs/qa/README.md) and [team workflow](../../../docs/_memory/trello-workflow.md).

## Scope

- Implementation: execute the approved plan, repair in-scope failures through the owning implementation task and rerun affected evidence. No unapproved feature/vendor/creative redesign.
- Tests: canonical rpg-maker/tests/campaign.test.mjs and its owning suites; reuse task 14's full run if still applicable, narrowing repair runs to changed behavior before any justified final regression.
- Fixture and readiness owner: tasks 01–14 supply their assigned setup/proof. This task consolidates remaining editor/browser/visual/audio/human gaps, verifies genuine save provenance and records unavailable sensors explicitly.
- Data/assets: native game/editor copy, final pictures and audio, current provider parameters and actual checkpoint files. No campaign-state writes in directed QA.
- QA/docs: current task-15 plan, docs/qa/scenarios/, docs/qa/bugs/, dated docs/qa/reports/, this task/graph and verification.md. Raw outputs live under docs/qa/evidence/eventbridge-minimal-runtime/task-16/<run>/.
- Delete targets: none by default. The final candidate audit may propose organization of its own evidence; preserve unrelated work, user saves, source assets and useful history.

## Checklist

- [x] Confirm task 15's lots resolve all selected sensors and variants; freeze the candidate revision/dirty inventory, source/configuration/asset hashes, engine/provider versions, Chrome/Node, origin/profile and actual viewport/motion settings.
- [x] Retain applicable task 14 V-004/V-013 evidence and supporting technical outputs with dependency equivalence recorded. Reopen their owning task if changed; do not claim a second primary verification.
- [x] Execute the lots below in resumable sessions through the current plan and real player actions. Record separate native integration, directed gameplay, editor, visual and audible labels.
- [x] Produce the planned [native checkpoint bank](verification.md#reusable-native-checkpoints-for-decision-testing) while playing the required producer paths once. Confirm persisted autosave/index completion and pre-decision facts before capture. For each alternative, prepare an unchanged archive copy in a fresh context before the first page, select its actual file via Continue, play the decision and observe its consequence. Preserve the master and record parent/hash, omitted prefix, chosen branch and resulting save.
- [x] Prefer a compatible bank entry over replaying the campaign prefix for variants in lots B–H and repeated parts of A. Reunir/Destruir share a pre-final-choice parent; sacrifice alternatives share a pre-victim parent; credits use a committed terminal parent. Keep one fresh complete campaign, both route orders, distinct A/B campaigns and actual same-profile close/reopen coverage. A restored terminal save cannot certify another ending or a fresh New Game journey.
- [x] Use read-only native state/storage/network observation only; never inject seeds, dispatch actions directly, mutate campaign switches/variables or present an imported synthetic save as an earned browser checkpoint.
- [x] Run S06/S09E controlled failures and S10 exhaustive fixtures only in labeled isolated integration setups. Preserve native loading/error timing, file bytes and normal Retry where supplied.
- [ ] Inspect captured images and temporal sequences, then perform or obtain actual audible observation. Capture existence, exit 0 and buffer decoding cannot pass visual/audio/human criteria.
- [ ] Record four applicable human decisions with reviewer/date/evidence: editor usability for a non-JavaScript author; UI/reading/control feel; new memorial framing/composition; perceptible audio response. Reuse compatible explicit acceptance only within its actual scope.
- [x] For in-scope failures, preserve failing evidence, identify the cause, repair via the owning task and rerun the affected lot/adjacent dependencies. Deduplicate bugs. Keep unrelated provisional artwork/text and existing excluded defects distinctly reported.
- [x] Close owned tabs/processes/profiles and restore fault-injection setup at every interruption/end without stopping unknown servers or altering personal saves. Record a resumable checkpoint for each incomplete lot.
- [x] Run final-verify with the actual candidate inventory and its candidate-organization reference, including all new/deleted files and useful consumer/asset/doc checks. Publish no remote content and perform no automatic commit.
- [x] Update verification.md lifecycle flags and exact verdict only as supported. Complete this task only when its required evidence and applicable human judgments are satisfied; otherwise record the precise remaining gap while retaining completed lots.
- [ ] After compatible delivery acceptance, preserve selected real Gorvak-edit/memorial/credits captures in the normal docs/qa/deliveries/eventbridge-minimal-runtime/ tree, with provenance independent of ignored raw outputs. Record organization separately from game verification.

## Resumable lots

Task 15 materializes current selectors, file identities and session details from the implemented checkout. These lots carry the approved scenario expectations; they do not introduce new requirements.

| Lot | Entry and execution mode | Scenarios / primary IDs | Required variants and completion checkpoint |
| --- | --- | --- | --- |
| A — Start and author | Same-origin clean isolated player profile; disposable project for native MZ editor interaction, then directed-browser | S01/S02/S03; V-001/V-002/V-003/V-005 | First run, cancelled file selection, second campaign; eight hero entries; manual/automatic formation; available/locked/completed routes; change actual Gorvak conversation CE, public label and visual value; one runtime example from prologue/tavern/encounter/Council/ending/memorial/epilogue families. Record editor trail, old-unit nonexecution, new-unit unread status, rendered change and genuine tavern checkpoint. |
| B — Native continuity and reading | Real dialogue/checkpoints earned through play; directed-browser, with separate native integration where assigned | S04/S07; V-002/V-006/V-009 | Tavern/Council/farewell/epilogue; arbitrary authored picture ID; Options/Continue; normal/reduced motion; AUTO and FAST separately; seen→unseen/choice, partial/cancelled reading, different campaign files, held input. Record unchanged committed facts, intended pictures, provider reset and reading completion; retain save provenance. |
| C — HIDE and control | Active message/choice on supported desktop; directed-browser and human UI judgment | S08; V-005/V-010 | Mouse/keyboard; hide and restore with Tab/left-click; confirm/cancel and held/released gestures; 1280×720 and 1920×1080; 100/110% zoom above effective minimum; motion preference. Record focus visibility, no invisible/double choice, no walking/RPG menu/unread acceleration, and reviewer decision. |
| D — Deaths and complete outcomes | Player-earned campaign choices and compatible pre-decision archive copies; directed-browser; distinct pure-rule and labeled visual integration fixtures for exhaustive outcomes | S05/S10; V-001/V-007 | Both initial route orders; Reunir/Destruir/bad; one/several deaths; first/later return and leave during simultaneous one-second fade; normal/reduced motion; 0/1/3/8-death memorial; correct Council/epilogue eligibility and death captions. Reuse shared prefixes, retain one fresh complete campaign and record each branch parent, reached terminal/return checkpoint and actual framed-asset review. |
| E — Native loading and tavern preload | Disposable local runtime/integration profile; native editor + controlled native integration; genuine player states for presentation | S06/S06T; V-008 | Final 29-file baseline reconciliation including replacements; all heroes/routes independent of eligibility; cold/delayed cache; startup versus active-scene missing file; bust entry/graphic change/memorial; tavern entry, return, Continue, conversations/destinations/roster/map overlay. Record one file selector list, actual requests/order, visible presentation and normal Retry/error timing, without imposing a readiness barrier. |
| F — Campaign files and failures | Two play-earned files A/B on the same origin/profile; directed-browser + read-only storage; unchanged native archive copies prepared before boot; isolated controlled I/O for S09E | S09/S09E; V-011 | Occupied-file/cancel; approach/sacrifice/reward/ending; actual close/reopen; terminal Continue; failed write, unreadable save, revision-only difference, old structural payload reported separately and missing campaign; two distinct eligible choices from independent copies of the same pre-decision parent. Record file IDs/index, preserved last successful save/master/other branch, actual alternative results and no repeated decision/resave/reset. |
| G — Audio | Audible native cue; directed-browser + audio observation and human judgment; retain actual buffer integration from task 12 | S11; V-012 | BGM/BGS/ME/SE; ME active/stopped/replaced; zero mute; HIDE/Options/Continue; FAST/context transitions. Record heard volume response, retained preferences and absence of cue restart/duplication, with listener/date. |
| H — Credits | Player-earned terminal sequence and Continue; directed-browser + visual observation; isolated long-text fixture labeled separately | S12; V-014 | Natural speed-2 roll, native accelerated roll, early/late keyboard/mouse skip, long credit text and no-memorial ending. Record final-line exit, exactly one title return, no orphan event and unchanged saved ending. |

Resume a lot from its recorded earned save/profile or a byte-preserved master copy under the checkpoint protocol. When unavailable/incompatible, play only the missing path from the nearest valid earlier checkpoint; restart at New Game when none exists. Missing states are not permission to install a synthetic campaign. Load by the native UI before the decision under test, retaining autosave in the working context; never restore storage during gameplay or overwrite the archived master. Keep sufficient action transcripts and read-only observations to distinguish setup success from the criterion's expected effect. Different sensors may cite the same run only where each observable was actually inspected.

## Validation

Execution modes/references are exactly those in verification.md: directed-browser for player journeys, native-editor interaction for S03/S06T, controlled native integration for S06/S09E and clearly separated rule/native fixtures for exhaustive S10 variants.

Invalidates/reuses: source/configuration/asset/provider changes reopen only dependent evidence. Task 01 setup/configuration, tasks 02–07 native event indices/pictures, task 08 loader/list, tasks 09–10 input/history, task 11 saves, task 12 audio and task 13 credits define the principal boundaries. Historical runs provide context, not a PASS for this migration.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001/V-002/V-003/V-005/V-006/V-007/V-008/V-009/V-010/V-011/V-012/V-014 | Lots A–H and retained canonical integration from owning tasks; actual editor/browser/visual/audio/human sensors selected above | All matching verification.md expected observables and required variants are evidenced; sensor gaps stay explicit | docs/qa/evidence/eventbridge-minimal-runtime/task-16/<run>/ plus maintained dated report and verification.md |
| Retain only: V-004/V-013 | Audit task 14 inputs/results; rerun there if stale | No stale enforcement/consumer/package result is imported | Task 14 evidence with recorded dependency equivalence |

Commands from repository root: npm start after server guidance; node --test rpg-maker/tests/*.test.mjs for a justified full canonical rerun; node --check for changed project plugins; git diff --check. Neither validate-content nor revise-layout is an authoring or release prerequisite.

Final-verify reports implemented, static_verified, runtime_verified, human_accepted and release_ready separately. Runtime verification may finish while a human-only judgment remains pending; the overall task/release cannot claim complete readiness in that case. No new broad creative approval, game-wide preload, mobile support or remote publication requirement is added.

## Execution Notes

Tasks01–15 are complete. All technical lots A–H are complete, with applicable task14 evidence retained and full-command failures distinguished from focused corrections. The 17 final directed retests passed; final native110% controls passed302 inputs/125 PNG captures; native-editor runtime04 passed109 inputs/43 PNG captures. MZ Map003 navigation, CE4/5/352 authoring, native29-file preload list, arbitrary picture92 appearance/Options/Continue and genuine save provenance are documented. Runtime/game files remain unchanged since task14. Independent reviews and final inventory are linked through verification.md.

**Blocked only on the four assigned human judgments:** non-JavaScript authoring usability, UI/reading/control feel, memorial framing/composition and perceptible audio response. Image inspection and rendered audio observations are complete; no actual human listening/acceptance is claimed. The concrete review packet is in [verification.md](verification.md#concrete-human-review-packet). `runtime_verified=true`; `human_accepted=false`; `release_ready=false`. These remaining judgments prevent task completion under its explicit checklist. No further technical replay is required unless the candidate or a relevant criterion changes.

Owned directed browsers, profiles and servers are closed; closed disposable run copies are removed, while the native-editor demonstration copy and all raw reports/immutable archives remain. No personal saves, index, commit or remote content were changed. Delivery-media selection/organization follows compatible acceptance and remains a distinct pending checklist item. Resume by recording the four reviewer/date/decision entries, addressing any rejected criterion, and then organizing the accepted evidence.

## Reading-control amendment — 2026-09-14

The user removed AUTO from the pending UI acceptance scope and retained FAST ([ADR-004](adrs/adr-004.md)). This is a design amendment, not acceptance of the UI or the other three human criteria. The delta's implementation, focused validation and historical-evidence limits are recorded in verification.md.
