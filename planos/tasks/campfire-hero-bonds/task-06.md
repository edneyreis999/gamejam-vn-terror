---
id: "06"
status: completed
depends_on: ["05"]
verification_ids: []
---

# Task 06 — Show available unread conversations without disturbing native controls

## Outcome

Camp and tavern portraits expose currently available unread content, and topic menus draw a separate localized NEW label while retaining focus, HIDE, language changes and reading controls.

## Authority

RQ-008/009; UI novelty/presentation-state contract; programming indicator extension and derived queries; narrative interface keys; art lifecycle; F-001 accepted risk.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: none; contributes to the named owners below.

Proposed owner/support: Edney (Programming); Pati/user for UI acceptance. Estimated effort: 1–2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: New game-owned js/plugins/Dryland_2_ConversationIndicators.js and its entry in js/plugins.js after Coreto_1_MessageCore and Dryland_Presentation/dependencies; native camp/tavern/hero choice configuration and Languages.tsv. Existing providers remain read-only; ItemsEquipsCore remains inactive.
- Tests: Reuse formation.mjs/content.mjs for derived eligibility/read behavior and native-controls.mjs for genuine control risks. No tests for badge color, position, label wording or pixel layout; no test added for the accepted legacy Talk reload case.
- Fixture and readiness owner: Own reachable read/unread/unavailable combinations, one new suffix and one new bridge, using the previous tasks' public-input recipes. Produce representative captures in both languages and keyboard focus observations.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: None.

## Checklist

- [x] Inspect Coreto CLI help/catalog and existing choice-window extension points before coding; preserve original methods, this/arguments/return/lifecycle and plugin settings.
- [x] Use native IconSet index 04, static 32×32 and centered 4 px above tavern/camp nameplates; restore centered 18 px names (latest 2026-10-16 follow-up, superseding the inside-plate outline). Keep the lower help removed. Keep selection and focus distinguishable; no pulse, counter or new character art.
- [x] Draw NEW!/NOVO! in reserved option space as a separate noninteractive label; keep the base choice string its raw localization key. Recompute from the actual choice-to-topic context after any native choice filtering.
- [x] Refresh on completed-topic return, available suffix/bridge changes, language changes and scene refresh; focus/opening alone changes no read facts.
- [x] Hide/dispose scene-owned badges with HIDE, windows and transfers; restore without click-through. Preserve keyboard/mouse, Options, FAST segment resets and end-input isolation.
- [ ] Inspect long About names and representative normal/reduced-motion layouts at PT/EN 1280×720 plus one 1920×1080 case. Include three-living/five-dead and one-living/seven-dead compositions through actual gameplay when reachable; final required evidence is task 09.
- [x] Record implementation observations for V-007/V-009 and leave Pati/user acceptance pending. Apply the accepted Talk persistence exception without adding compensation logic.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-003/004 (contribution if changed) | Focused existing behavior owners only | Read/eligibility queries remain pure and language-independent; labels introduce no persisted duplicate truth. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-007/009 (contribution) | S-04/S-06 keyboard/mouse, HIDE/Options and captures | Only available unread content is marked, without stealing focus or reusing final dialogue input; visual fit remains a human decision. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Indicator code, plugin order, choice filtering, menu context, assets and locale refresh invalidate affected observations. Do not rerun unrelated heavy journey combinations without a distinct risk.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Added the game-owned tier2 indicator after its providers, native portrait/menu bindings, separate NEW labels and focused conversation hint. Opening/focus does not mark read. First visual inspection found oversized Help and dark controls; compact native help and white control text were confirmed in 22bbee0c. HIDE and contextual labels observed in d24d71bc. Human readability/composition stays task09.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.

The unchecked presentation matrix is explicitly handed to task09; completion here denotes the implemented indicator and its focused inspection, not final matrix/human acceptance.

Follow-up: 731125e8 passes PT/Options/HIDE/mouse and all routes; 5fba5a64 supplies inspected large/reduced-motion one/two-total-alive captures. The remaining visual matrix and human judgment stay with task09, without expanding these technical passes.

## Presentation follow-up — 2026-10-16

User-approved refinement implemented on the same branch: nameplates/icons in both stages, three-second native absences with matching cleanup, Talk-specific bust framing and continuous interlocutors across reading units. [Verification](verification.md#presentation-refinement) owns fresh evidence and pending human acceptance. Prior captures remain historical.

Refinement checks complete: 61 fast + IT-009/010/011 pass; directed FIRST85fcd9fe, LOSSES9ec06f29, PT/reducedf3ecd89d pass with agent inspection. See verification for failure history, exact scope and human-acceptance limits.
