---
id: "24"
status: completed
depends_on: ["23"]
verification_ids: [MAV-006]
---

# Task 24 — Author Reunir, Destruir and Perda total in their existing maps

## Outcome

Maps025–027 contain their actual ending presentation while preserving the committed outcome and subsequent closing sequence.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-005/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-006; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Maps025–027, relevant CE040 branches, CE336/055–057/329–334, current closing and Continue consumers.

**Delete targets:** CE055–057, CE329–334 and CE336 once all ending consumers are migrated.

Tests remain in `rpg-maker/tests/suites/`: endings.mjs, native-checkpoints.mjs, memorial.mjs, content.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Move each ending's existing passages/background/presentation into its own map using task22's native handoff contract.
- [x] Keep CHOOSE_ENDING and its save at their existing decision owner until the Council migration; the ending map displays the committed result and does not choose it again.
- [x] Preserve total-loss precedence, memorial omission when no deaths, eligible epilogue ordering and credits reachability.
- [x] Replace CE040's migrated content execution, remove CE336 consumers and null the displaced bodies; update tests and current paths.
- [x] Verify all three outcomes, true saved-boundary Continue, no repeated completion/action/write and no dependence on a retired CE.

## Validation and handoff

MAS-03/05/06. Native fixtures cover all closing combinations; task16 obtains or reuses compatible genuine pre-choice/loss-path parents for directed outcomes.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-24/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed. Maps025–027/event001 contain their two original native passages and backgrounds, guarded by phase/committed ending. CE040 routes before audio and no longer executes those bodies; CE055–057/329–334/336 are null. CHOOSE_ENDING/checkpoint remains in CE053 until task25. Local loops refresh facts between the two passages and hand off to the existing memorial/epilogue/credits flow. Native checkpoint/package/closing validation passed.

## Result — 2026-09-14

MAV-006 technical PASS. `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(014|047|048)' rpg-maker/tests/campaign.test.mjs`: 3 passed, 0 failed (172.5s). Native closing fixtures cover all three outcomes, eligible epilogues and omissions; IT-014 loads all nine semantic checkpoints through real Continue. Package references pass. Exactly-once outcome commitment remains at the existing decision boundary. No engine, plugin, asset or save-policy change. Current source saves are supported; historical interpreter positions are not certified. Evidence: ignored task-24 directory below; all owned processes closed. Directed and human sensors remain task16.
