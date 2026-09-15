---
id: "11"
status: completed
depends_on: ["10"]
verification_ids: []
supporting_verification_ids: [V-001, V-006, V-009, V-011]
---

# Task 11 — Save and continue separate campaigns through SaveCore checkpoints

## Outcome

New Game selects its campaign file, each semantic autosave updates that file, and Continue resumes the selected native checkpoint without reapplying a decision.

## Authority

- [Spec](spec.md): RQ-012–RQ-013.
- [Verification](verification.md): V-001, V-006, V-009, V-011.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F32–F34.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `Dryland_EventBridge.js`, `js/plugins.js`, `data/Map001.json`, CE2/CE44 and every semantic Checkpoint call in `data/CommonEvents.json`; native UI-state reset/refresh boundaries in Presentation if needed.
- Tests: `persistence.mjs`, `native-checkpoints.mjs`, `native-boot.mjs`, `endings.mjs`; `helpers/native-shared.mjs` saveBytes and existing save fixtures, including controlled I/O cases.
- Fixture and readiness owner: task 11. Own isolated A/B campaign file, cancelled/occupied selection, write rejection/unreadable payload and same-structure revision-difference fixtures. Record file IDs and pre/post bytes read-only; terminal/native browser saves are earned through player actions.
- Data/assets: Set Save:struct SaveStyle:str=locked and MaxSaveFiles:num=20; Autosave:struct AutosaveType:str=current. Preserve editable capacity and disabled incidental menu/transfer/battle autosaves. Engine/vendor bytes remain unchanged.
- QA/docs: Record all semantic checkpoint reasons and native command indices, file-selection cancellation behavior and supported/unsupported structural-save observations for task 14's guide.
- Delete targets: Remove slot-zero selection/save/load overrides and single-campaign policy, plus any remaining Bridge envelope/state/revision gate not already removed by task 01. Remove QA/test hardcoded file0 assumptions when consumer behavior uses the selected file.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Use SaveCore/EventTitleScene's actual locked/current file selection on New Game and Continue. Observe the provider's occupied-file/cancel behavior without inventing an extra confirmation dialog.
- [x] Coordinate one in-flight checkpoint write and await its real completion. SaveCore's forceAutosave command does not return its save Promise; any observer must preserve original file IDs, arguments and results.
- [x] Keep decision commit → save → next native reading/choice ordering at every boundary migrated in tasks 02–06. Resuming a saved checkpoint cannot repeat that decision or immediately write it again solely from resumption.
- [x] On success/failure release the wait correctly; use native failure handling and keep the last successful save. No global freeze, silent reset or invented ready campaign may replace a failed load.
- [x] Preserve native map/screen/interpreter/UI-history state and reset derived reading permissions when selecting another file. Text/art-only revision differences must not cause rejection.
- [x] Exercise selected files A/B and terminal saves on the same origin/profile. Report structural legacy incompatibilities honestly; do not delete or promise migration of old user files.
- [x] Identify the existing persisted boundaries before approach, sacrifice and final choice that can seed the [reusable checkpoint bank](verification.md#reusable-native-checkpoints-for-decision-testing). Prove native load/file/index observability, including that each saved decision is still uncommitted where required. Supply the actual file-ID capture contract to task 14; the bank's player-earned production runs belong to task 16. Do not add manual-save buttons, new semantic checkpoints or altered campaign payloads for QA convenience.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S01 file selection; S09 directed-browser + read-only storage; S09E controlled native I/O; S04/S07 continuation.

Required variants: A/B isolation; second campaign; occupied-file/cancel; approach/sacrifice/reward/ending checkpoints; close/reopen; terminal saves; failed write/load; revision-only change; structural old payload and missing campaign reported separately. Also identify usable pre-decision archives for S09's two branches from the same parent; task 16 verifies those branches through actual Continue after task 14 adapts the archive tooling.

Invalidates/reuses: SaveCore parameters, Bridge write coordination, native event indices, UI history and load/reset hooks invalidate corresponding file/continuation evidence. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-006, V-009, V-011 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Autosave targets only the current selected file; cancellation preserves campaigns; a load neither repeats committed actions nor rejects revision alone; failures retain stored bytes. | `docs/qa/evidence/eventbridge-minimal-runtime/task-11/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. SaveCore uses SaveStyle locked, MaxSaveFiles20 and AutosaveType current. Incidental battle/transfer/menu autosaves remain disabled. EventTitleScene's actual NewGame opens Scene_Save for file selection and LoadScreen opens Scene_Load. The slot-selection instruction is authored in SaveCore in Portuguese. CE2 uses only the native save index to offer Continue and no longer probes file0 or displays a custom failed-load branch.

Removed Bridge's file-zero selection/validation/rewrite. The bounded save observer delegates all arguments with apply, preserves the native Promise result, coalesces an in-flight checkpoint and releases it in finally on success/failure. AutosaveForce itself still returns no Promise; the interpreter waits for the actual DataManager save operation. No checkpoint was added. The selected file is preserved by native save/load, including map/screen/interpreter/UI history. Query and UI permission loads remain separate from campaign mutation; no envelope/revision gate was restored.

PASS: IT-001/014/015/016/017/018/019/020/021/023/024/039/044/045/048/059. IT014 round-trips all nine reasons: new_campaign, departure, reveal, approach, sacrifice, consequence, reward, council, ending. The artifact records real file IDs, map IDs, every native interpreter/CE index and wait/current command, reading cursor and last committed action. Replay preserves saved bytes and does not repeat a sacrifice, assignment draw or write solely because of Continue. Native terminal outcome fixtures finish and repeat their own closing with unchanged ending save; their domain prefixes are labeled fixtures, with full player-earned terminal campaigns still owned by task16.

IT024 uses only native player choices for both prologues, hero observations, party formation and departure. A=file1 and B=file2 share the same origin/profile across browser restarts. Their groups, routes and observational CE histories remain separate after alternating Continue. Selecting New Game never inherits history or active reading modes. Cancelled selection preserves A. IT045 observes the provider replacing an explicitly chosen occupied file without adding a confirmation dialog; an isolated absent-index fault is displayed according to the native index, and cancellation preserves its orphaned payload bytes.

IT017–019 use controlled native I/O: one pending write holds progression; rejection releases the wait and retains the last successful payload/diagnostic; first-write failure creates no resumable campaign. IT021 separates unreadable compressed data (failure before extraction) from missing campaign structure (native objects extracted, then native load failure without a fabricated ready campaign). IT059 accepts a same-structure text edit plus irrelevant historical version labels; the resumed parent calls the newly edited CE normally. A deliberately unsupported missing-map reference produces native Map999 LoadError, with its bytes untouched. This is not a migration promise for structural legacy saves.

Checkpoint-bank handoff: reveal saves an encounter before CHOOSE_APPROACH; consequence in sacrifice_choice saves before SELECT_VICTIM; council saves the Council reading before CHOOSE_ENDING. The bank must capture the actual selected file key plus native global index on the same origin, retain immutable bytes and ancestry, and replay the uncommitted decision through Continue. See IT014/runtime/boundaries.json and authored-checkpoints.json. No manual-save button, new checkpoint or QA-specific campaign field was added. Task14 adapts the archive utility; task16 earns the final bank against the integrated tree.

First failures retained: the A/B restart sensor referenced $gameMessage before browser boot; it now guards the real readiness boundary. The unsupported-map sensor initially matched the still-active Scene_Load; it now waits for the actual Scene_Map startup and observes native LoadError. Final cases passed. Current suite helpers use selected-file IDs and explicit native file-picker inputs. Remaining historical reconstruction/QA-manifest consumers are reserved for task14's integrated retirement, not restored as runtime policy.

Evidence, source hashes, file-picker capture, I/O failures, player-file records and native command indices: docs/qa/evidence/eventbridge-minimal-runtime/task-11/20260912/. Engine/provider bytes and capacity configurability are preserved. No mixed-sensor V-ID or commit is closed by these technical results.
