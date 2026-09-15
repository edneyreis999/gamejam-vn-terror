---
id: "25"
status: completed
depends_on: ["24"]
verification_ids: [MAV-007]
---

# Task 25 — Author the Council and medallion choice in Map023

## Outcome

The Council map owns its conversation, eligible opinions, intervention and final choice while retaining campaign and staging contracts.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-003/006/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-007; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Map023, CE040/041/053/054/335, CE321–328 (including irati.03), odd opinion units CE305–319; existing Council query/focus/save helpers.

**Delete targets:** CE053/054/335, CE321–328 and eight odd opinion bodies after all consumers move; also retire CE041 after replacing its final epilogue/opinion/irati.03 callers.

Tests remain in `rpg-maker/tests/suites/`: endings.mjs, persistence.mjs, native-controls.mjs, native-checkpoints.mjs, content.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Apply task22's phase/map handoff to council/final_choice and author the actual native conversation, eligible opinions and choices in Map023.
- [x] Preserve climax participants/order, solo behavior, Andirá's reflection/intervention and current ensemble restoration; native presentation remains editable.
- [x] Preserve the semantic passage that commits medallion completion, both CHOOSE_ENDING actions and exactly one ending checkpoint before transfer.
- [x] Include irati.03 from CE321 in its canonical Council position. Migrate CE040/041 callers, null displaced scene-specific CEs and retire CE041 only after the complete epilogue/opinion/irati.03 consumer audit passes.
- [x] Verify valid participant counts/orders, both final choices, Options/FAST/HIDE and Continue before/after commitment without absent speakers or duplicated rewards/writes.
- [x] Update the Council branch of persistence case IT-062 to assert the serialized Map023 root/event identity, saved command position and ordinary continuation instead of requiring a child Common Event interpreter. Preserve picture, campaign, audio and saved-byte assertions and the still-unmigrated farewell branch expectation.

## Validation and handoff

MAS-03/05/06/07. Native fixtures prove Council eligibility and semantic completion independently of the copied text; directed QA branches from a genuine pre-choice parent.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-25/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed under the authorized graph. Map023 owns Council/final choice and irati.03, preserving semantic checkpoint ownership and native ensemble helpers.

## Result — 2026-09-14

MAV-007 technical PASS. `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(047|054|061|062|065)' rpg-maker/tests/campaign.test.mjs`: 5 passed, 0 failed. Map023 owns all Council/opinion/irati.03 passages and both final choices. Twenty displaced CEs were nulled (ledger in ignored task25 evidence), including CE041 after its last consumer moved. Native integration covers eligible slots, solo/normal/reduced ensemble, every hero recipe, FAST boundaries and both outcomes. IT-062 now verifies the exact serialized Map023/event001 command position, unchanged pictures/campaign/audio/bytes before continuation, then one medallion completion and one matching saved checkpoint. Farewell retains its child-interpreter assertion. No engine/plugin/assets/save-policy changes. Current saves tested; historical command indices not certified. Directed/editor/human sensors remain task16; all owned processes closed, no staging/commit.
