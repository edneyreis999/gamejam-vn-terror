---
id: "05"
status: completed
depends_on: ["03"]
verification_ids: ["T-004/BOARD"]
---

# Task 05 — Replace the tavern roster with the deceased names board

## Outcome

Deliver RQ-005 within the approved design. Only complete deceased names or the approved empty message appear, and closing the board restores preparation without campaign mutation.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): CommonEvents.json CE117 plus CE003/038 board access and CE351 if final access art is added; derived public-name/dead queries through the existing Bridge. Existing tavern background, final board access and plain native reader.
- Canonical tests: `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`, `rpg-maker/tests/suites/formation.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own isolated name-list/control fixtures for empty, mixed living/dead, repeated access and seven dead. Real QA reaches deceased rosters naturally; fixtures are not directed-gameplay evidence.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Replace CE117's active all-roster output; preserve unrelated source assets.

## Checklist

- [x] Replace the Elenco access with a final in-world wall-board control without covering the established hero places or other targets.
- [x] Derive complete deceased names in stable hero order; populated content contains names only, without portraits, headings, cause/location text or inscriptions. Empty content is exactly the approved message.
- [x] Use the approved plain reader, keyboard/mouse return and visible focus. Seven names is the largest tavern case; eight dead must not create a return.
- [x] Keep entry/reading/exit observational: no party/progression mutation, final memorial action, absence replay or stale hidden target.
- [x] Own the board control cleanup fixture and a measured name-fit preparation for S-001/S-002; retain V-005's live and human closure in task 13.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-004/BOARD; T-007 measurement preparation; S-001/S-002. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| T-004/BOARD | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Only complete deceased names or the approved empty message appear, and closing the board restores preparation without campaign mutation. | `docs/qa/evidence/prototype-feedback-refinement/task-05/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Board content/query/order, name source, access geometry, exit cleanup, font or target layout invalidate evidence. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25 via [apply-task-05.mjs](apply-task-05.mjs). CE3/38 replace Elenco with the final 160×64 wall board at (64,112), outside all hero targets. CE117 queries only deceased/public names in H1–H8 order, uses seven centered 48px rows at maximum occupation, and contains no heading, portrait, status, cause or inscription. The exact empty message replaces the names. Picture/choice cleanup and HIDE bindings belong to the reader; return restores formation focus without campaign actions. CE351 preloads the three final assets; System variables 157/158 were renamed for their new native row-coordinate role after checking the retired CE117 consumers.

The evolved canonical IT-072 first failed on the old toolbar asset: [baseline](../../../docs/qa/evidence/prototype-feedback-refinement/task-05/baseline/execution.json). Final `node --test --test-name-pattern 'IT-072|IT-027|IT-038' rpg-maker/tests/campaign.test.mjs`: **3 selected, 3 PASS**, exit 0. [Hash-bound receipts and captures](../../../docs/qa/evidence/prototype-feedback-refinement/task-05/final/native/) cover empty, mixed and seven-dead fixtures in both 1280×720 and 1920×1080, stable order independent of death order, mouse/keyboard entry and return, nonoverlap, repeated visits, exact row spacing, complete cleanup, HIDE and held confirmation. Viewed the empty and seven-name frames: the text fits the plain reader and Voltar is separate.

Keep the consumed native events/assets, named variable metadata, focused mutation script and the evolved existing canonical test; no parallel suite or runtime plugin was added. Scoped self-review/deslop and whitespace checks passed. Owned browser/profile/server cleanup completed. No commit, staging or remote action occurred; unrelated user edits remain preserved. These are technical fixture results; V-005/LIVE and final visual/human acceptance remain with task 13.

Public QA/devlog recipe: open Quadro in the left wall before any loss for the empty state; after naturally reaching a loss and returning to the tavern, open it again to inspect only the absent names. Close via Voltar or Escape and confirm the same draft and board focus. Seven names is the maximum tavern case; total loss continues to the ending instead.
