---
id: "03"
status: completed
depends_on: ["02"]
verification_ids: []
supporting_verification_ids: [V-001, V-002, V-003, V-005, V-010]
---

# Task 03 — Author tavern formation, destinations and roster in events

## Outcome

The playable tavern interface is edited from its map: events own all labels, positions, buttons, focus/disabled styles, destination panels and roster, while campaign queries determine facts and eligibility.

## Authority

- [Spec](spec.md): RQ-002–RQ-003, RQ-005–RQ-006, RQ-011.
- [Verification](verification.md): V-001, V-002, V-003, V-005, V-010.
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F13–F15, F18.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/Map003.json`; `data/CommonEvents.json` CE3 formation/destinations/roster branches (preserving task 02's conversation branch), CE30–39 and appended named roster/interaction helpers; Bridge formation/panel/choice consumers and provider configuration where required.
- Tests: `formation.mjs`, `shared-ui.mjs`, `native-controls.mjs`, `native-inventory.mjs`; owning formation/native helpers.
- Fixture and readiness owner: task 03. Own manual/automatic formation and locked/available/completed destination fixtures, plus independent current-layout reference captures and choice/focus observations.
- Data/assets: Use native/provider commands for stage art, public labels, progress, button text and images. Reserve picture/variable lifetimes explicitly in Execution Notes; no fixed hero-coordinate/style table in Presentation.
- QA/docs: Record named Taverna → Herói/Destinos/Elenco/interface entry paths and changed author fields for the editing guide.
- Delete targets: Remove Bridge showFormation/showPanel/roster rendering and legacy formation/hero/destinations/roster choice expansion when all associated live callers have native replacements.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Move static and dynamic label placement, party count, selected destination and button/style composition out of Bridge into editor fields/native variable text.
- [x] Wire native PictureChoices/Show Choices branches to queried hero/route facts and domain actions, preserving fixed keyboard order, eligible focus restoration and mouse use.
- [x] Keep focus/hover observational; full-party Selecionar still opens that hero's feedback; Retirar do grupo appears for selected heroes. Preserve automatic formation when only one to three heroes remain.
- [x] Preserve destination rumors, preview assets, known progress and locked/completed behavior without showing internal pools or competency names.
- [x] Make the roster map-accessible and truthful for alive/selected/dead heroes. Leave death fade implementation to task 06 while providing its stage entry and cleanup call sites.
- [x] Show that changing one label/style/position in the event affects the rendered control. Capture real before/after UI for later visual review; numeric geometry alone does not certify readability.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S02, S03 and S08; S06T will use these final tavern image references in task 08.

Required variants: Mouse/keyboard; manual/automatic formation; fourth-member attempt; select/remove; cancel menus; every route state; full roster; 1280×720 and 1920×1080 effective viewport.

Invalidates/reuses: Tavern events, provider choice settings, public queries, assets or layout invalidate related UI proof and task 08's final preload inventory. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-002, V-003, V-005, V-010 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Author edits control the visible UI; only explicit valid choices change formation/destination; selected/focused/disabled states remain distinct and usable. | `docs/qa/evidence/eventbridge-minimal-runtime/task-03/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical PASS: IT-001/006/007/008/072. CE38 owns stage labels/styles/availability; CE39 owns native destinations; CE117 owns roster; CE3 uses consecutive native choices (six entries per editor dialog). Presentation ChoiceFocus retains eligible UI focus without campaign access. Variables 150–185 and switches 21–33 hold named UI projections. Independent variable lifetimes fixed all labels erroneously rendering the last name. The second native choice block has default -1 so it does not override the first block’s focus. Hero and route labels query public configuration. 1280 and 1920 captures inspected; original portrait positions/provisional art preserved. Death fades remain task06. Human UI/editor acceptance remains task16. Evidence: docs/qa/evidence/eventbridge-minimal-runtime/task-03/20260912/.

