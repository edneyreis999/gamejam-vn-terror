---
id: "10"
status: completed
depends_on: []
verification_ids: ["V-015/TECH"]
---

# Task 10 — Keep the complete final cemetery text readable

## Outcome

Deliver RQ-015 within the approved design. Every intended name, route, encounter and inscription remains complete; source comparison catches omissions, while final fit/readability is judged in task 13.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Map028.json; CommonEvents.json CE058–060/338–345 and actual name/route/encounter/context labels including CE347; existing memorial/grave/hero assets. Preserve native memorial progression and reduced-motion composition.
- Canonical tests: `rpg-maker/tests/suites/memorial.mjs`, `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own source/label reconstruction and native memorial fixtures for longest fields and maximum occupancy. Later directed maximum cemetery evidence must arise from an own campaign, never an eight-dead tavern fixture.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem or inscription deletion; no silent abbreviation and no portrait asset replacement outside approved scope.

## Checklist

- [x] Inventory all complete inscriptions and generated label fields; capture the reported clipping condition before claiming a fix.
- [x] Measure the longest names, route/encounter combinations and eight-deceased cemetery against the native font and supported logical size.
- [x] Reflow labels within nonoverlapping cells and full inscriptions across native boxes as needed, keeping semantic completion only after the last box and preserving all source words.
- [x] Preserve the existing grave order, art proportions, memorial eligibility and reduced-motion layout; the tavern names-only rule does not apply here.
- [x] Compare complete source text, prepare measurement/entry evidence for T-007/S-004, and retain the bug as unverified until actual runtime reproduction/retest.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001 source; T-007; S-004. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-015/TECH | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Every intended name, route, encounter and inscription remains complete; source comparison catches omissions, while final fit/readability is judged in task 13. | `docs/qa/evidence/prototype-feedback-refinement/task-10/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Strings, public catalog labels, font, cells, picture geometry, reading boundaries or motion layout changes invalidate evidence. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25. [apply-task-10.mjs](apply-task-10.mjs) replaces CE59 label plates with unscaled 296×192 plates, font 24, column pitch 312 and row pitch 306. Complete names/routes/encounters remain simultaneous. Each original CE338–345 line is followed by a second native box containing its complete existing inscription; CE58 still completes the single passage only after the event returns. The original sixteen cause records remain byte-equivalent. Grave/portrait scales, hero order and animation commands are preserved. The coordinates in Show Picture are variable IDs, not literal overlapping positions.

Baseline `2026-09-25T17-26-02-608Z` captured eight-deceased clipping: letters at y=198 plus line height 28 exceed bitmap height 212, with effective 14.94px context font. Earlier `17-24-05-461Z` also exposed invisible graves after retaining tavern child bindings. CE39 detaches 20–27 at the ordinary preparation exit; CE337 releases them before the final stage reuses these IDs. No engine/provider changes. Technical snapshots are not directed campaign evidence.

IT-055/056 passed (2/2) in `2026-09-25T17-28-30-532Z`, covering complete individual readings, one/three/eight deceased, unchanged state until the final box, normal movement and reduced motion. The final catalog-measurement lot `17-32-17-152Z` passed IT-055/074/087, including every name × route × encounter at the native font and preparation/save/load integration. IT-057 stopped on a historical one-box encounter-intro assumption; its player-input loop now traverses the actual multi-box passage and is being repeated. Final completion/receipt consolidation waits for this result.

Viewed baseline and corrected eight-deceased captures: the corrected frame shows all grave portraits, names, routes and encounter labels within their cells, with the bottom row above the reading window. Full inscriptions are compared against the unchanged source in IT-055. Public task-13 recipe remains an own campaign with natural losses, final cemetery and each inscription; the bug remains reported pending directed retest and human visual judgment.

Final IT-057 passed (1/1, exit 0, 129.6 seconds) after correcting its stale one-box navigation and fixed title arrow. Combined current technical scopes: IT-055/056/057/074/087, all PASS. [Consolidated final receipts and measurements](../../../docs/qa/evidence/prototype-feedback-refinement/task-10/final/); prior failures remain separate. IT-056 is retained from the motion lot because subsequent changes were measurement/test navigation only, with unchanged runtime. No source words, artwork files, grave/portrait proportions, campaign eligibility or save policy changed. Source review/deslop, syntax and scoped whitespace checks passed. Owned test processes were torn down; commits remain manual. V-015/LIVE, bug closure and human readability acceptance remain task 13.
