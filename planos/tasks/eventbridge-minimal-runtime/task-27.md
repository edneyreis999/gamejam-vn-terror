---
id: "27"
status: completed
depends_on: ["26"]
verification_ids: [MAV-009]
---

# Task 27 — Author A2–A8 in their existing encounter maps

## Outcome

Maps008–014 own the seven remaining physical encounter bodies using the proven A1 lifecycle.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-007/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-009; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Maps008–014, CE014–020 and their units CE127–189, relevant CE040/262 branches and affected canonical/current QA consumers.

**Delete targets:** CE014–020 and scene-specific description/result/approach units after consumers move; retain memorial inscription CE134/143/152/161/170/179/188.

Tests remain in `rpg-maker/tests/suites/`: encounters.mjs, content.mjs, native-death-context.mjs, native-checkpoints.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Reconcile each encounter's identity, native text/choices/assets and shared inscription consumers; retain the approved task26 lifecycle.
- [x] Move the actual description/approach/result content into each map and reduce only its displaced routing/selectors.
- [x] Preserve all three approach outcomes, observation versus completion, shared sacrifice/retreat/death behavior and native Continue at committed boundaries.
- [x] Null private bodies and update tests/drivers/current authoring paths; record every retained shared unit with its consumer.
- [x] Verify all seven identities and three approaches in valid success/failure states, including route assignment and shared consequence regression.

## Validation and handoff

MAS-04/05/06. Reuse task26's fixture mechanics with each encounter's actual domain requirements; do not let a successful A1-only case certify the other maps.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-27/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed, applying the verified A1 handoff to A2–A8 and retaining their memorial inscriptions.

## Result — 2026-09-14

MAV-009 technical PASS. `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(083|082|047|057)' rpg-maker/tests/campaign.test.mjs`: 4 passed, 0 failed (198s). IT-083 exercised all42 A2–A8 approach/outcome combinations with independently chosen GDD provider parties, native map-root text/choices, one approach checkpoint and exactly one result completion leading to the next reveal or sacrifice. A1 and eight native death-context regressions passed. CE014–020 and56 private units are null; CE134/143/152/161/170/179/188 remain for CE347. Seven original description/choice/result bodies now live in Maps008–014. No engine/plugin/assets/save-policy changes. Evidence: ignored task27 native log, retirement ledger and four canonical source-hashed records. All owned resources closed; no staging/commit; directed/human proof remains task16.
