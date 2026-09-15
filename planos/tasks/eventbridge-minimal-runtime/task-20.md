---
id: "20"
status: completed
depends_on: ["19"]
verification_ids: [MAV-002]
---

# Task 20 — Migrate Bimbren, Liora, Vaelith and Draska to their own interaction maps

## Outcome

H5–H8 complete the eight-hero map model with consistent navigation and individual content/framing.

## Authority

- [Spec expansion](spec.md#map-authorship-expansion--2026-09-14): MA-001/008/009/010/011.
- [Verification expansion](verification.md#map-authorship-expansion--2026-09-14): MAV-002; the MAS scenarios below are contributed to task16.
- [ADR-006](adrs/adr-006.md), the five discipline expansion amendments and [task graph](tasks.md).
- Planning and execution authorized by the user on2026-09-14. Current implementation and evidence are recorded below; no commit is authorized by this task.

## Owned surfaces and deletion boundary

Game root: `rpg-maker/The Dryland Drowned/`. Four appended Taverna child maps, MapInfos.json, CE003, CE009–012 and CE098–113; shared native formation/QA helpers and guide.

**Delete targets:** CE009–012 and CE098–113 after consumer migration; preserve observation identities98–113. Shared focus helpers are final-audit candidates only if unused.

Tests remain in `rpg-maker/tests/suites/`: formation.mjs, native-controls.mjs, content.mjs; native-boot/native-inventory support. Use the existing `campaign.test.mjs` and canonical manifest; keep meaningful invariants in their owners. No new source assets, dependencies, engine/vendor modifications, campaign rules or save policy.

## Checklist

- [x] Reconcile IDs and apply the proven hero-map lifecycle to H5–H8, preserving their four reading units and original text.
- [x] Author each actual menu, conversation, presentation, responses and return in its map; preserve per-art framing, validated formation and source interpreter exits.
- [x] Update the remaining CE003 branches and the directed driver to all-eight real map visits, including explicit return before choosing another hero.
- [x] Null the four interaction CEs and sixteen migrated units after replacing every functional consumer; keep their numeric reading identities reserved.
- [x] Verify H5–H8 and regress H1–H4 for full/automatic/dead states, file-local read history, gestures and absence/focus continuity; record any newly unused shared helper for task29.

## Validation and handoff

MAS-01/05/06/07. Prepare all-eight native fixtures without claiming they are play-earned saves. Verify each map executes its own content; task16 owns genuine public-input visits and framing judgments.

Run focused registered native cases through `node --test --test-name-pattern='IT-(...)' rpg-maker/tests/campaign.test.mjs`, choosing and recording the actual IDs from the named suites; task29 additionally runs `node --test rpg-maker/tests/*.test.mjs`. Preserve failures and results with actual source/fixture hashes. No Jest installation or guessed runner is required.

This task owns its pre-change evidence, isolated fixture preparation, observable native signal and removal/retention ledger. Contribute the deletion signal to MAV-011 and shared continuity to MAV-012 without claiming those final criteria twice. Code/data/fixture/expected-result changes invalidate only dependent evidence; old saved interpreter indices need explicit compatibility assessment.

Evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/task-20/` (future local ignored output). Record completion in this file and verification.md only after its assigned criterion passes. Update current authoring paths and the existing QA guide as needed; task15 plans the consolidated directed lots. Serialize shared JSON writes and preserve unrelated edits. Follow the existing data/plugin/task-execution skills when implementing.

## Execution notes

Implementation completed. Maps041–044/event001 now own H5–H8; CE009–012/098–113 are null. The one-time transformation `implement-hero-maps-h5-h8.mjs` asserts original consumers and exact narrative preservation. IT-081/080 now exercise all eight heroes; the focused native batch passed. Shared CE080/081 remain for the task29 consumer audit.

The source portrait dimensions differ, so each map uses its own native picture60 coordinates/scale. Existing assets and provisional creative status are preserved. Old saved interpreter indices referencing retired CE bodies are not certified; current-candidate A/B and Continue are covered by the canonical native fixtures. Raw pre-change inventory and run log: `.artifacts/task20/`; final evidence destination remains the one above.


## Result — 2026-09-14

MAV-002 technical PASS. Eleven canonical cases passed in one fresh run: IT-001/007/024/047/062/067/069/071/074/080/081 (497.3s, no failures). Command: `DRYLAND_QA_PORT=18730 node --test --test-name-pattern='IT-(001|007|024|047|062|067|069|071|074|080|081)' rpg-maker/tests/campaign.test.mjs`. Source hashes remained unchanged throughout. Native map owners, all32 reading identities, file isolation, guards, selection, controls, frame compositions and ambience were observed. Source text comparison, surviving calls and whitespace checks passed. No engine/plugin/assets/save policy changed.

Final evidence is in the local ignored task20 directory declared above, including11 canonical records,32 captures, pre-change inventory, original20 consumers and20 removed IDs. The four new heroes' normal conversations and reduced menus were visually inspected. Framing acceptance and directed all-eight visits remain task16. Owned test server/profile closed; no Git staging/commit. Maintained files are the four live maps, routing/MapInfos, focused tests/helpers/driver, one-time transformation and current documentation; raw evidence remains ignored. Task21 is next.
