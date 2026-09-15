---
id: "23"
status: completed
depends_on: ["22"]
verification_ids: [MAV-005]
---

# Task 23 — Author the remaining seven epilogues in their existing maps

## Outcome

Maps030–036 contain their own epilogues and advance in the existing eligible climax-party order.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-004/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-005; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Maps030–036, CE040/041 epilogue branches, CE308/310/312/314/316/318/320 and affected closing/QA consumers.

**Delete targets:** The seven even-numbered epilogue bodies above and their replaced selectors; retain CE041 for any remaining opinions or irati.03 consumer.

Tests remain in `rpg-maker/tests/suites/`: endings.mjs, persistence.mjs, native-checkpoints.mjs, content.mjs, native-controls.mjs. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Apply the proven task22 handoff to each existing epilogue map, with its own native text, bust commands and semantic passage.
- [x] Preserve eligible order/omissions, exactly-once completion and transition to the next epilogue or credits. Do not add hero-visit menus to epilogues.
- [x] Remove displaced CE040/041 narrative branches and null each private epilogue body once all consumers move.
- [x] Verify every hero in native integration, mixed eligible orders, no epilogues for total loss, saved ending/Continue and control/picture continuity; update actual authoring/driver paths.
- [x] Apply task22's serialized map/event continuity assertions to the remaining epilogues in the canonical persistence owner; do not introduce an H1-only continuation assumption.

## Validation and handoff

MAS-03/05/07. Integration owns exhaustive eligibility/order fixtures; directed QA uses genuinely earned ending parents, not synthesized terminal saves.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-23/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Completed under the task22 native handoff. Maps030–036/event001 contain their original epilogues and only their own local cycle. CE308/310/312/314/316/318/320 are null; CE040 no longer runs epilogue bodies, and CE041 retains only opinions/irati.03.


## Result — 2026-09-14

MAV-005 technical PASS. The focused run IT-047/048/062/073 passed (177s); then IT-062 was expanded from H1 to all eight epilogues and passed again (88s). Commands: `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(048|062|073|047)' rpg-maker/tests/campaign.test.mjs` and the same entry with `--test-name-pattern='IT-062'`. The second change affects only IT-062's own case: the retained047/048/073 bodies, fixtures and game inputs did not change, so their preceding results retain equivalence. This is scoped reuse, not a second full four-case run.

Every hero's text now executes under its own map root. The new IT-062 iteration saves inside each epilogue and verifies exact map/event/index, pictures, campaign/audio, unchanged file bytes and exactly one ordinary completion after Continue. Ending order/omissions, no extra writes, next-map/credits handoff and all eight reading bodies pass. No engine/plugin/assets/save policy changes. Native text comparison and package references pass; no old CE-body dependency remains in the epilogue test. Current-candidate saves work; old interpreter indices are not certified. Evidence stays in the ignored task23 path above. All owned resources closed; no staging/commit. The live maps/routing, canonical coverage and one-time transform remain maintained. Task24 follows; directed/editor/human acceptance remains task16.
