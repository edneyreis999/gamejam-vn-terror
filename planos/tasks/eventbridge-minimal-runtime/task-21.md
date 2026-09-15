---
id: "21"
status: completed
depends_on: ["20"]
verification_ids: [MAV-003]
---

# Task 21 — Author the prologue directly in Map002

## Outcome

The existing prologue map contains the three played passages and preserves initialization, initial save and transfer semantics.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-002/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-003; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Map002.json, CE001/114–116, affected boot/content/checkpoint tests and current New Game authoring instructions.

**Delete targets:** CE001 and CE114–116 after migrating their consumers and explicit reading boundaries.

Tests remain in `rpg-maker/tests/suites/`: native-boot.mjs, content.mjs, native-checkpoints.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Capture the current BEGIN/initial-checkpoint/audio/three-passage/transfer sequence and semantic reading identities.
- [x] Move the actual text and native reading/presentation commands into Map002. Preserve initial save before the prologue, exactly-once initialization and the explicit exit to Map003.
- [x] Null the four displaced CEs after resolving every caller; update tests/current guides without requiring historical ignored fixtures.
- [x] Verify New Game, file selection/cancel, Continue at the real saved boundary, passage order and later tavern return without prologue replay.

## Validation and handoff

MAS-02/05/07. Native fixtures observe both committed campaign state and saved interpreter boundary; directed genuine A/B file creation remains with task16.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-21/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed. Pre-change Map002 called CE001, which called CE114–116. The one-time `implement-prologue-map.mjs` inlines the three complete native units in that same root, preserving BEGIN → initial checkpoint → audio → three explicit completions → CE044 → transfer/exit. CE001/114–116 are null after map/troop/CE caller checks. IT-004 now observes the native root and the full three-passage sequence, and IT-035 edits the live Map002 source in a disposable copy; the old child-termination and CE114-edit assumptions no longer describe the approved owner. Focused validation passed.


## Result — 2026-09-14

MAV-003 technical PASS: IT-001/004/014/035/047 passed in one fresh113s run using `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(001|004|014|035|047)' rpg-maker/tests/campaign.test.mjs`. The native root presents all three original passages, BEGIN occurs once, each passage completes once, later hero return does not replay the prologue, native edited wording is played after reload, and all nine semantic save boundaries still round-trip through real Continue. All case input hashes remained unchanged. Exact text/speaker preservation and caller checks passed.

Only Map002 and the four retired CE slots change runtime ownership. The current QA guide and canonical content/inventory expectations now use Map002; no engine/plugin/assets or personal saves changed. Old saves with displaced CE child indices are not promised compatibility. Directed file creation/editor usability remain task16. Evidence is local ignored output at the path above. Owned server/profile closed; no staging or commit. The materialized transform and live tests/data/docs are retained; detailed logs remain local. Next: task22 H1 epilogue handoff.
