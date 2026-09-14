---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: []
supporting_verification_ids: [V-001, V-002, V-003, V-005, V-006, V-009]
---

# Task 02 — Run the prologue and eight hero interactions through native calls

## Outcome

An author can follow Taverna → Gorvak → Conversar to the actual callable conversation; native playback preserves all eight heroes' content without executing unrelated roles.

## Authority

- [Spec](spec.md): RQ-002, RQ-005–RQ-007, RQ-010.
- [Verification](verification.md): V-001, V-002, V-003, V-005, V-006, V-009.
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F08–F09, F25 (prologue/tavern consumers).

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/CommonEvents.json` (CE1, CE3 conversation branches, CE5–12, CE44 prologue/new-campaign boundary and CE80/81; CE76 is shared with CE41 and requires a recorded handoff), `data/Map002.json`, `data/Map003.json`; only the Bridge/Presentation support necessary for explicit native-unit reading identity.
- Tests: `content.mjs`, `native-inventory.mjs`, `formation.mjs`, `native-controls.mjs`; adapt `helpers/native-content.mjs` and `helpers/native-bust-fixture.mjs` for actual native calls, not section slicing.
- Fixture and readiness owner: task 02. Own the disposable replacement-conversation fixture and traces of each original role's text/order. Demonstrate that a newly selected standalone CE executes while the old conversation, farewell, opinion and epilogue do not.
- Data/assets: Append standalone role CEs after inspecting the current maximum (81 at decomposition); preserve unrelated IDs. Split the CE5–12 profile/speech/selection/party_full bodies and retain a source-to-target map in Execution Notes. Farewells/opinions/epilogues are actually in CE41 and memorial text in CE58; tasks 04–06 own those independent splits. Keep player copy PT-BR and existing art transforms.
- QA/docs: Record the map-to-conversation editor trail and all role relocations; supply the concrete trail to task 14's guide and task 16's S03 walkthrough.
- Delete targets: Remove Present/Conversation and marker-based dispatch at migrated prologue/tavern call sites only. Do not remove shared command implementations before tasks 04–06 replace their remaining consumers.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Compare and preserve profile followed by conversation, selection-success response and full-party response for H1–H8. Keep the separate CE41 farewell/opinion/epilogue and CE58 memorial source content intact for tasks 04–06; do not assume those roles are present in CE5–12.
- [x] Expose named map entries and actual native command117 selectors. A single changed selector must change what gameplay runs, with no Configure* content association or mandatory section grammar.
- [x] Make the prologue call native units and explicitly complete only its captured campaign passages. Replace Map002's direct campaign-object condition with Query-fed native conditions and adapt the prologue/new-campaign portion of CE44. Observational conversations return to choices without selecting a hero or completing another campaign passage.
- [x] Record completed observational-unit reading separately in native UI state, per actual callable unit and campaign file. Partial/cancelled units stay unread; campaign passages continue using domain read facts.
- [x] Author bust entry/focus/exit through existing provider/native commands and preserve the currently authored transforms, including Gorvak. Supply normal and reduced-motion event alternatives for the migrated effects.
- [x] Replace old tests for section ownership/metadata with content routing, role isolation and non-mutation assertions in canonical suites. Do not turn known provisional portrait framing into new creative approval.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S01 prologue; S02 hero observation/selection; S03 replacement native Common Event; S04 tavern continuity; S07 native-unit identity. Editor/browser and visual acceptance remain with task 16.

Required variants: Eight hero entries; profile+speech; successful selection; party full; cancel/partial completion; replacement CE initially unread; manual/reduced motion.

Invalidates/reuses: Map selectors, role split, explicit completion, picture commands and reading-history identity invalidate related routing/continuity evidence. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-002, V-003, V-005, V-006, V-009 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Only the selected native unit plays; observations preserve party/progression; a complete unit becomes eligible for rereading and an unfinished or replacement unit does not. | `docs/qa/evidence/eventbridge-minimal-runtime/task-02/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

In progress. CE5–12 now expose hero interaction branches; standalone profile/speech/selection/full-party CEs occupy 82–113 (four per hero). CE114–116 own prologue units; CE1 calls them directly. Map003 events 3–10 expose heroes. Presentation stores completed observational CE identities in Game_System. CE76/80/81 are now ordinary native helpers with reduced-motion alternatives; their shared Council callers remain for tasks 05/07. Technical and visual checks pending.


Technical PASS: IT-001/006/007/071; 72 hero text boxes preserved from pre-migration data. Replacement CE remains unread until its last message completes; original unit remains unread. Runtime/editor/human visual judgments stay with task16. Evidence under task-02/20260912.

Review correction (2026-09-12): ReadingComplete now uses the context and passage captured on its own Game_Interpreter, so unrelated variable writes cannot replace them. Missing encounter names are rejected during configuration; missing query identities produce descriptive errors. UT-075, IT-070 and IT-001 pass after this change. Explicit native Erase Picture commands complete zero-duration bust exits (shared correction from task04); affected discovery tests are rerun there.
