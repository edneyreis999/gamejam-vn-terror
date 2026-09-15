---
id: "07"
status: completed
depends_on: ["06"]
verification_ids: []
supporting_verification_ids: [V-006, V-009, V-010, V-011]
---

# Task 07 — Preserve native picture and event continuity without Bridge reconstruction

## Outcome

Options and supported Continue preserve native pictures and checkpoint state; authored exits/composition replace automatic erasure and visual-prefix reconstruction.

## Authority

- [Spec](spec.md): RQ-007, RQ-011, RQ-013.
- [Verification](verification.md): V-006, V-009, V-010, V-011.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F25–F26 (final shared lifecycle removal).

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `Dryland_EventBridge.js`; `data/CommonEvents.json` native reading/composition wrappers migrated in tasks 02–06; native continuation entry events on maps 2–4 and 23–36.
- Tests: `native-controls.mjs`, `native-checkpoints.mjs`, `native-inventory.mjs`; adapt `helpers/native-bust-fixture.mjs`, `helpers/native-shared.mjs` and existing IT-060/064/066/067/068/069 cases by invariant.
- Fixture and readiness owner: task 07. Own native-save/interpreter and Options picture snapshots, including an arbitrary picture ID. Observe intended visible participants, native event position and committed state, not just restoration-helper output.
- Data/assets: All remaining conversation cleanup and any checkpoint composition are explicitly authored. No new images; preserve current native screen/map variables and switches.
- QA/docs: Record deleted restoration contracts and any explicit composition entry used by a supported checkpoint; guide consolidation is task 14.
- Delete targets: Remove restorationCommands, visualSources/@visualFrom execution, automatic conversation erasure, ownership guards, prefix extraction/replay and universal helper-termination completion hooks after confirming zero live dependencies.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Audit every migrated reading unit for explicit entry/focus/exit and semantic completion. Replace any surviving reliance on automatic cleanup with the corresponding authored command.
- [x] Preserve native Game_Screen/Game_Map/interpreter state through Options and loads; refresh only derived queries and reading permission state. No image replay, dialogue duplication or campaign mutation.
- [x] If a supported checkpoint requires composition, author a native composition-only call before interaction, with no decision, reading completion or cue replay.
- [x] Exercise cancel and Options/Continue during tavern, Council, farewell and epilogue paths using actual saved checkpoints or explicitly labeled integration fixtures.
- [x] Rewrite historical reconstruction tests around observable native continuity. Exact interrupted animation-frame restoration is not a new requirement.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S04; S07 Options/Continue reset contributions; S09 supported checkpoints.

Required variants: Tavern/Council/farewell/epilogue; arbitrary picture ID; cancel/finish; normal/reduced motion; actual checkpoint resume; no duplicate action/audio.

Invalidates/reuses: Native event indices, picture commands, save payload, provider versions/settings or lifecycle hooks invalidate continuity evidence. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-006, V-009, V-010, V-011 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Intended pictures survive Options/Continue; authored exits clean up; no prefix interpreter or automatic helper completion advances the story. | `docs/qa/evidence/eventbridge-minimal-runtime/task-07/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. Removed Present/Conversation commands and help, restorationCommands, visualSources, dialogue ownership, recovery interpreters, visual-prefix replay, helper guards, automatic picture erasure on scene/interpreter termination, and automatic reading completion from interpreter termination. Native clear() only clears the captured semantic context fields. Native CEs already own explicit completion and composition; CE5–12 now also author reduced-motion exits with immediate erasure. Map028 names its actual native memorial flow. No substitute renderer or replay helper was introduced.

PASS: IT-054/073 (Council and all epilogues), IT-062 (native screen/interpreter continuity through Options and isolated native saves in tavern/Council/farewell/epilogue), IT-064 (native interruption), IT-066 (cold Continue with native saved pictures and cancellation), IT-067 (author-edited positions/text and Continue), IT-068 (standalone native 2×2 composition, normal/reduced motion, HIDE and repeat), IT-069 (arbitrary picture ID and vendor parameters survive Options/Continue and explicit exit). The fixture’s native calls no longer require Bridge ownership or marker comments. Continue inspections preserve native picture/interpreter state, without removing images to demand reconstruction. Test saves are labeled integration fixtures, not new supported player checkpoints.

First failures retained: the new continuity sensor queried Scene_Map.isBusy before its message window existed, and its epilogue fixture initially completed the entire closing sequence. Both fixture errors were corrected and the affected case passed fresh. Independent read-only source review confirmed native MZ serialization and absence of live metadata/helper callers. IT-060’s active asynchronous-loading sensor is assigned to task 08’s loading behavior change; the obsolete reconstruction-only unit/diagnostic assertions are retired or consolidated by task 14, not revived in the game.

Evidence, exact test commands, per-case fingerprints, captures and source hashes: docs/qa/evidence/eventbridge-minimal-runtime/task-07/20260912/. Current-file SaveCore selection remains task 11, and full directed/editor/human verification remains task 16. No V-ID is closed from these fixture results. Syntax and diff checks passed; no commit.
