---
id: "04"
status: completed
depends_on: ["03"]
verification_ids: []
---

# Task 04 — Complete camp conversations for Bimbren, Liora, Vaelith and Draska

## Outcome

All eight heroes now have their full camp conversation set: 48 base conversations and eight exact pair interjections, independent of optional prior reading.

## Authority

RQ-003/008/009/011/012; narrative camp.h5–h8.* and remaining suffixes; programming selection/replay and native ownership; UI/art contracts; task 03's established context protocol.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: none; contributes to the named owners below.

Proposed owner/support: Edney (Programming/editorial); João and Maria may support text review. Estimated effort: 1–2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Map041–044 event001; Map045 route selection to those heroes; Languages.tsv; existing common return/audio helpers. Extend shared Rules/Bridge only for an actual missing approved contract; do not fork the social implementation.
- Tests: formation.mjs/content.mjs canonical topic/participant owners and native-controls.mjs segment permissions. Whole-corpus static receipts feed V-005; no golden prose or appearance tests.
- Fixture and readiness owner: Own candidate-earned A/B and repeat-topic setup for the second batch. Record native map/topic observables and use one representative extra-participant exchange; pure enumeration covers equivalent identities.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: None.

## Checklist

- [x] Preserve each hero's tavern Talk/formation controls and actual observational IDs while applying the camp return context, background, fire and focus contract.
- [x] Integrate all 24 H5–H8 base scenes for the three routes and both pauses, with standalone B and no absent-recruit requirements.
- [x] Integrate exactly interject.h5.h4, interject.h6.h3 and interject.h7.h2 at their mapped host scenes. H8 has no additional host suffix; do not invent one for symmetry.
- [x] Use the same per-segment read/FAST and complete-topic checkpoint ordering as task 03. Preserve final-input consumption and explicit bust cleanup.
- [x] Validate both locale columns and native key references. Enumerate the combined 48 bases and eight suffixes, all unique with the exact canonical pairs and scene placements.
- [ ] Provide readable representative PT/EN candidate captures for editorial review, retaining the full eight-hero inventory for task 09. Do not turn new anecdotes into canonical facts.
- [x] Record focused behavior receipts and invalidate earlier candidate saves whose native lists changed.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-003/004/005 (contribution) | C-FOCUSED, C-LANGUAGE and combined content inventory | 48 bases and 8 suffixes are reachable under their intended contexts; no duplicates, missing locales or extra pair arcs. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-007/009 (contribution) | S-04/S-06 focused observation | Second-batch hero-map return and reading work through native inputs; proposal remains subject to editorial acceptance. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Changes in task 03's shared routing/reading protocol reopen both batches. Preserve unrelated existing hero wording and settings; the narrative draft becomes historical material after integration.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Integrated all six base topics for H5–H8 (24 bases), completing the 48-base/eight-suffix corpus. Native participant queries gate each suffix. UT-076 protects newly available interjection, locks and invalid completion. Complete bilingual editorial acceptance remains in task09.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.

The complete locale capture handoff is tracked by task09; the writing implementation itself is integrated and statically inventoried.

Follow-up: 731125e8 passes PT/Options/HIDE/mouse and all routes; 5fba5a64 supplies inspected large/reduced-motion one/two-total-alive captures. The remaining visual matrix and human judgment stay with task09, without expanding these technical passes.

## Presentation follow-up — 2026-10-16

User-approved refinement implemented on the same branch: nameplates/icons in both stages, three-second native absences with matching cleanup, Talk-specific bust framing and continuous interlocutors across reading units. [Verification](verification.md#presentation-refinement) owns fresh evidence and pending human acceptance. Prior captures remain historical.

Refinement checks complete: 61 fast + IT-009/010/011 pass; directed FIRST85fcd9fe, LOSSES9ec06f29, PT/reducedf3ecd89d pass with agent inspection. See verification for failure history, exact scope and human-acceptance limits.
