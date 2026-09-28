---
id: "09"
status: completed
depends_on: ["03"]
verification_ids: ["T-004/FINAL"]
---

# Task 09 — Present the final decision as two deliberate equal panels

## Outcome

Deliver RQ-014 within the approved design. Both complete choices are equally prominent and a deliberate single activation commits exactly the intended ending without accidental advance or follow-up confirmation.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Map023.json/event001 final choice; existing ending action/checkpoint; final native panel/text/ornament assets and PictureChoices state. Use shared input behavior established by task 03; preserve Council opinion source from that task.
- Canonical tests: `rpg-maker/tests/suites/endings.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own technical final-choice/input fixtures for both actions and a public Council entry recipe. No injected Council state may be reported as a played ending.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Replace the old final-choice presentation/bindings without changing ending content.

## Checklist

- [x] Keep the existing Reunir/Destruir outcomes and complete consequence information, with no extra confirmation.
- [x] Create the approved equal 504×304 side-by-side panels, final ornament and native text, clearing preceding conflicting busts/dialogue.
- [x] Give both panels equal focus/selected/disabled treatment and full visible targets with left/right keyboard navigation.
- [x] Require release of the previous speech gesture; one deliberate activation invokes the correct ending action and existing checkpoint exactly once.
- [x] Prove both outcome bindings and input isolation technically; prepare S-004 branches from an own naturally reached Council checkpoint with provenance.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-004/FINAL; S-004; T-007 fit preparation. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| T-004/FINAL | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Both complete choices are equally prominent and a deliberate single activation commits exactly the intended ending without accidental advance or follow-up confirmation. | `docs/qa/evidence/prototype-feedback-refinement/task-09/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Council cleanup, panel assets/geometry, consequence text, input guard or ending/save action changes invalidate evidence. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25. [apply-task-09.mjs](apply-task-09.mjs) authors two equal 504×304 final ornamented plates at (112,208)/(664,208), with native 36px titles and 26px complete consequences. Both use the same PictureChoices focus treatment; the existing horizontal choice, input-release guard, ending action and checkpoint remain the owners. Preceding ensemble pictures and attachments are cleared, both targets are bound to HIDE, and each selected branch clears the panels before committing its outcome. CE351 preloads the final asset.

The extended IT-054 first failed on the absent panel geometry. Final command selecting IT-054/065 and UT-034: **3 selected, 3 PASS**, exit 0, 268.1 seconds; [baseline and final receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-09/). Four Council variants cover collective/mixed/solo and normal/reduced motion; pointer activation on title/body, both outcomes, left/right focus, HIDE restoration, unchanged state before activation, panel cleanup and exactly one ending save. IT-065 preserves FAST revocation at the final choice; UT-034 rejects repeated/invalid commitments. The native screenshot was inspected: complete title/consequence lines fit within equal panels and focus is visible. Source review/deslop and syntax checks passed. Test resources were torn down; no commit or remote action.

Public entry/devlog: from an own campaign, complete both initial routes, reach the final Council, finish every eligible opinion and stop at the two panels. Capture full consequences before deliberately choosing Reunir; reuse the own compatible Council checkpoint through Continue for Destruir. These technical fixtures do not create directed campaign provenance: S-004/live and final human visual acceptance remain task 13.
