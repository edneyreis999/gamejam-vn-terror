---
id: "28"
status: completed
depends_on: ["27"]
verification_ids: [MAV-010]
---

# Task 28 — Author B1–B8 in their existing encounter maps

## Outcome

Maps015–022 complete map-owned encounter authorship while preserving both route orders and final-route use of remaining encounters.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-007/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-010; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Maps015–022, CE021–028 and units CE190–261, relevant CE040/262 branches, shared consequence and QA/test consumers.

**Delete targets:** CE021–028 and private description/result/approach units after migration; retain memorial inscription CE197/206/215/224/233/242/251/260. Retire CE262 if its last functional selector/caller is removed.

Tests remain in `rpg-maker/tests/suites/`: encounters.mjs, content.mjs, native-death-context.mjs, native-checkpoints.mjs, discovery.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Apply the proven encounter lifecycle to all eight B identities while preserving each text, choice, asset and domain result.
- [x] Replace corresponding content selectors in CE040/262, preserving cross-scene routing, shared sacrifices/deaths/rewards and fixed encounter assignments.
- [x] Null displaced private bodies and retire CE262 only after replacing its final consumer; keep all memorial inscription units still selected by CE347.
- [x] Verify every B identity and all three approaches with success/failure, both initial route orders and remaining-encounter use in the final route; regress the physical family.
- [x] Update native/QA consumers and pass a complete removed/retained candidate ledger to task29.

## Validation and handoff

MAS-03/04/05/06. Exhaustive identities/outcomes are canonical native integration; task16 plays representative families and both route orders with genuine checkpoint provenance.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-28/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed, applying the verified local lifecycle to B1–B8 and retiring the final CE262 consumer.

## Result — 2026-09-14

MAV-010 technical PASS. `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='UT-(007|016|032)|IT-(084|083|047|053|057|014)' rpg-maker/tests/campaign.test.mjs`: 9 passed, 0 failed (416.5s). IT-084 exercised all48 B-family approach/outcome combinations under their native map roots, exact text, one approach checkpoint and result continuation; IT-083 regressed42 A-family combinations. Both legal route orders/assembly, final-route leftovers, every GDD provider set, nine saved boundaries and native death/total-loss at final B3 passed. CE021–028 and64 private units plus CE262 are null; all eight B memorial inscriptions remain selected by CE347. CE040 no longer executes encounter bodies or local encounter phases. No engine/plugin/assets/save-policy changes. Evidence: ignored task28 log/ledger/nine source-hashed records. All owned resources closed; no staging/commit. Directed/editor/human coverage remains task16.
