---
id: "15"
status: completed
depends_on: ["14"]
verification_ids: []
---

# Task 15 — Plan the current native QA cycle

## Outcome

The existing docs/qa tree contains an executable, current plan for this migration, with each required scenario, variant, evidence producer, human judgment and teardown assigned before play begins.

## Authority

- [Spec](spec.md): RQ-001–RQ-018 and the devlog moment.
- [Verification](verification.md): V-001–V-014; S01–S12 including S06T/S09E; the four pending implementation human judgments.
- All five approved discipline contracts and [ADRs](adrs/adr-001.md), [ADR-002](adrs/adr-002.md), [ADR-003](adrs/adr-003.md).
- [Graph/coverage](tasks.md), completed tasks 01–14, [QA README](../../../docs/qa/README.md), [team workflow](../../../docs/_memory/trello-workflow.md) and [local runtime](../../../docs/_memory/local-game-run.md).
- Activate [rpg-maker-mz-qa-report](../../../.agents/skills/rpg-maker-mz-qa-report/SKILL.md). This task plans; it does not execute gameplay or claim acceptance.

## Scope

- Implementation: no game/plugin/data/asset changes.
- Tests: inventory the canonical evidence and registrations produced by tasks 01–14; do not create a new QA console or duplicate suite.
- Fixture and readiness owner: each implementation task remains responsible for its assigned fixtures and observable technical signal. This task checks their availability and organizes missing evidence; it does not manufacture play-earned saves.
- Data/assets: record the implemented map/CE/query/parameter/image references, including the final tavern helper and memorial derivatives.
- QA/docs: update the existing journeys/scenarios below; add one current scoped guide/charter only if the old frozen missions cannot describe the approved behavior. Use existing templates/personas and a dated run report with all unexecuted rows pending.
- Delete targets: none. Supersede obsolete procedures and preserve prior reports/charter missions as history. Do not bulk-delete QA records.

## Checklist

- [x] Confirm task 14 joins all implementation leaves 08/11/12/13, and inventory actual evidence from every completed implementation task. Read the current candidate; do not rely on planned commands as executed results.
- [x] Activate QA report and reconcile current journeys/scenarios with the approved migration using the mapping below. V-004/V-013 retain task 14 as primary owner; task 16 owns the remaining V-IDs.
- [x] Replace current seed/API/file0/revision/instant-skip recipes with native read-only inspection and player-earned campaign paths. Historical recipes may describe domain integration fixtures but cannot seed a directed game.
- [x] Preserve immutable historical charters. Reuse still-valid missions or create a focused current charter under docs/qa/charters/ and link its guide/report; do not rewrite an old debrief or transfer its PASS.
- [x] Materialize task 16's lots with entry state, actual native maps/CEs/variables, independent expected results, required variants, execution modes, evidence dependencies, reuse decisions and completion checkpoints.
- [x] Make the [checkpoint bank and branch matrix](verification.md#reusable-native-checkpoints-for-decision-testing) the default setup for repeated decisions: map each variant to the nearest compatible pre-decision archive, its producer, omitted prefix and fresh actions/expected result. Cover formation/routes, approaches, sacrifice victims, first-return death presentation, Reunir/Destruir and terminal presentation. Missing entries get the shortest legal producer path; bad ending needs a genuine loss-path parent, not an edited final-choice save. Plan one fresh complete campaign and the separate A/B campaign-file tests; do not require a fresh full campaign for every branch.
- [x] Use the existing QA guide/report to inventory checkpoint IDs, origin/file/index/payload/source hashes, actual saved boundary, party/deaths/routes/read/fade facts, reachable choices and child runs. Store immutable masters in the existing ignored evidence tree, prepare one unchanged working copy per branch before boot, and keep native autosave active. Record whether a changed candidate permits reuse or requires regeneration from an earlier valid checkpoint.
- [x] Verify editor/Chrome/audio-output availability and the applicable human reviewers; record actual availability. Native-editor interaction, audio perception and human judgments must remain pending when unavailable.
- [x] Deduplicate existing portrait-framing, prison-art, cancelled-bust, HIDE, save and final-choice symptoms against docs/qa/bugs/. Keep unrelated provisional creative changes outside this migration; route in-scope regressions to their implementation owners. Read trello-workflow before any later tracker action; create no separate remote QA cards or remote messages from this task.
- [x] Preserve Gorvak's editor-to-game demonstration plus memorial and credits capture points. Plan actual UI observations at 1280×720 and 1920×1080, with 100/110% zoom only above the effective minimum.
- [x] Record same-origin isolated profiles, genuine save provenance, controlled-I/O/loader isolation, raw evidence paths and resource teardown. A failed native-editor tool is a sensor gap, not permission to relabel JSON editing as editor evidence.
- [x] Update verification.md with the current QA reference/mapping, leaving all unexecuted flags/results truthful; update task/graph tracking.

## Living QA mapping

| Existing owner | Current migration coverage |
| --- | --- |
| docs/qa/journeys/J-mz-complete-campaign.md | Startup/file choice, formation, routes, outcomes, Continue and credits |
| docs/qa/journeys/J-mz-recovery-export.md | Native editor trail, native loading, files/checkpoints and local package inspection |
| docs/qa/journeys/J-mz-qa-accessibility.md | HIDE, keyboard/focus, reading modes and read-only observation without shipped QA |
| docs/qa/journeys/J-mz-creative-review.md | Changed UI, memorial framing and actual audible response/human judgments |
| docs/qa/scenarios/FOR-mz-formation-roster.md | S01/S02/S03/S06T; eight heroes, destinations, roster |
| docs/qa/scenarios/ENC-mz-encounter-sacrifice-retreat.md | S02/S04/S05/S09; descriptions, decisions, sacrifice and absence |
| docs/qa/scenarios/CAM-mz-discovery-closing.md | S04/S09/S10/S12; both route orders, Council, endings and credits |
| docs/qa/scenarios/LOC-mz-session-recovery-export.md | S01/S03/S04/S06/S06T/S09/S09E; file identity, failures, authoring and package |
| docs/qa/scenarios/ACC-mz-hide-keyboard-qa.md | S07/S08; provider modes, HIDE, gesture control and VN behavior |
| docs/qa/scenarios/ART-mz-visual-audio-runtime.md | S04/S05/S06T/S08/S10/S11/S12; rendered/temporal/audible evidence |
| docs/qa/scenarios/ART-mz-human-approval.md | Only the four implementation judgments selected by verification.md |

## Validation

Execution mode/reference: planning-only application of rpg-maker-mz-qa-report, transporting the exact modes from verification.md. No extra independence, mobile, VoiceOver, global preload, new art-direction or publication gate is inferred from old QA documents.

Invalidates/reuses: task 14's V-004/V-013 and supporting implementation evidence may be retained by current input hashes; previous increments explain baseline behavior only. Task 16 refreshes only stale inputs or uncovered sensors.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| None: planning does not own product acceptance | Read the graph, current QA documents and technical evidence; validate local links, scenario/lot coverage and dependencies; git diff --check | Every V-ID has one primary owner; every selected scenario/variant/human check has an executable lot or explicit sensor gap | Maintained docs/qa guide/scenarios/charter/report and verification.md references |

Start/reuse instructions must specify npm start at the repository root and http://127.0.0.1:18726/, same origin/profile for Continue, and no termination of unknown servers. Fault injection belongs only to isolated S06/S09E integration. Teardown closes only owned profiles/tabs/processes and restores fault-injection setup; preserve the report and raw evidence.

## Execution Notes

Completed planning on2026-09-12 after task14 integrated all implementation leaves. Applied rpg-maker-mz-qa-report to the existing tree: updated four journey flows and seven existing scenarios (untested), preserving their prior report/verdict provenance. New focused first-campaign charter uses Lia; the compatible missions of existing campaign/recovery/keyboard/audio charters retain Caio/Joana/Rui. Their superseded procedural guidance is explicitly displaced by the approved current contract, without extra historical gates.

Current guide: docs/qa/guides/eventbridge-minimal-runtime.md. Dated report: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md; all nine session rows(A throughH, separating editor) were Pending before directed play. The guide materializes native selectors, scenarios/V-IDs, variants, expected results, compatible integration inputs, bank producers/branches, same-origin pre-boot copies and teardown. It distinguishes the saved prologue from the live first taverna; a persisted formation is earned through recuo, and bad needs a loss-path parent. Reunir/Destruir share their Council parent; repeated endings use terminal copies.

Actual availability: Chrome153.0.8010.36/Node22.23.2; CUA MZ normal window reachable after first timeout; default system audio output is MacBook Pro speakers. No human reviewer has supplied acceptance or been contacted remotely. GUI editing, directed play, listening and the four decisions remain pending. Known portrait/prison/total-loss-prose issues were deduplicated against existing records; no new bug or Trello card/message was created. Gorvak/editor, memorial and credits capture points are preserved.

Validation: current guide/charter/report relative links resolve; all seven selected scenarios have valid flat frontmatter and untested status; four flows contain completion and abandonment; all fourteen V-IDs retain one primary owner. git diff --check passes. Task16 can execute the planned lots; this planning task adds no product PASS.
