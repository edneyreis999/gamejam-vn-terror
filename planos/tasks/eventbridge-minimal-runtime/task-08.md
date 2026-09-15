---
id: "08"
status: completed
depends_on: ["07"]
verification_ids: []
supporting_verification_ids: [V-008, V-013]
---

# Task 08 — Preload every tavern image through CoreEngine and retain default loading

## Outcome

One editable CoreEngine file list requests every tavern image before its native presentation paths, including return and Continue, with normal asynchronous provider loading elsewhere.

## Authority

- [Spec](spec.md): RQ-009.
- [Verification](verification.md): V-008, V-013.
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F27.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/CommonEvents.json` new `Taverna — Carregar imagens` and tavern entry/return/interaction calls; `data/Map003.json`; removal of Bridge loader interception in `Dryland_EventBridge.js`.
- Tests: `native-inventory.mjs`, `native-controls.mjs`, `native-checkpoints.mjs`; isolated native loading fixtures through the existing Chrome harness.
- Fixture and readiness owner: task 08. Own the final reference/file inventory and controlled cold/delayed/missing request inputs in a disposable copy/profile. Observe actual SystemLoadImages request coverage/order, separately from visible readiness and error timing.
- Data/assets: Reconcile the approved 29-picture baseline with tasks 02–06: Taverna; Tavern_H1–H8; H1–H8 and ivai; Button/Tag/Panel/DestinationCard/DestinationLabel; Destination_physical/supernatural/final; MapDwarven/MapElven/MapComplete, all with Dryland_ stems. Include additions/replacements actually used by the final tavern.
- QA/docs: Record the native helper ID, full selected file list and entry/return/Continue call sites in Execution Notes for editor/packaging QA.
- Delete targets: Remove Bridge global image-ready pause, bust loading interception and related loading hooks. Neither Presentation nor event Script receives a replacement wait/polling/Retry mechanism.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Read ADR-002 and ADR-003 together. Author VisuMZ_0_CoreEngine → SystemLoadImages with pictures:arraystr file selectors in one map-reachable native CE.
- [x] Select the complete final tavern set regardless of hero/party/route availability; list actual files, never a wildcard. Repeated entry points call the same CE.
- [x] Place native calls before entry/return stage presentation and before the next applicable Continue interaction/presentation. Do not rely only on NewGame initialization, reset the campaign or replay committed decisions.
- [x] Delete project loading interception and observe cold, delayed and missing images at startup and after a scene starts. Preserve provider cache/error handling and use Retry only where supplied.
- [x] Check required files in the local package and all live crop replacements from task 06. Do not add a manifest, script readiness barrier, guessed frame delays, permanent-cache promise or game-wide preload.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S06: native integration with controlled loader inputs. S06T: native-editor + native integration; task 16 owns directed presentation/editor completion.

Required variants: All heroes and route previews independent of eligibility; repeat entry; return; Continue at tavern interaction; cold/delayed cache; bust entry/graphic change/memorial; startup versus active-scene failure.

Invalidates/reuses: Final tavern references, helper payload/call sites, continuation commands, packaged pictures and native/provider versions/settings invalidate this coverage. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-008, V-013 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Every final tavern image is requested from the single native list before its use path; default asynchronous loading/error behavior remains without a project wait. | `docs/qa/evidence/eventbridge-minimal-runtime/task-08/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. CE351, Taverna — Carregar imagens, contains the single installed CoreEngine SystemLoadImages command with native pictures:arraystr selectors. All other directory lists are empty. Map003 exposes the same helper; maps 002/003 call it before their entry paths, including the prologue’s first use of the tavern background. CEs 3/38/39/117, interactions 5–12 and native observational units 82–113 call the same helper. Calls before subsequent text/choice boundaries cover native Continue without replaying a decision. The second consecutive choice block remains adjacent to the first; all 11 tavern choices still work.

Selected file stems (all in img/pictures): Dryland_Taverna, Dryland_Tavern_H1, Dryland_Tavern_H2, Dryland_Tavern_H3, Dryland_Tavern_H4, Dryland_Tavern_H5, Dryland_Tavern_H6, Dryland_Tavern_H7, Dryland_Tavern_H8, Dryland_H1, Dryland_H2, Dryland_H3, Dryland_H4, Dryland_H5, Dryland_H6, Dryland_H7, Dryland_H8, Dryland_ivai, Dryland_Button, Dryland_Tag, Dryland_Panel, Dryland_DestinationCard, Dryland_DestinationLabel, Dryland_Destination_physical, Dryland_Destination_supernatural, Dryland_Destination_final, Dryland_MapDwarven, Dryland_MapElven, Dryland_MapComplete. The actual package inventory and hashes are in preload-list.json/source-hashes.json under this task’s evidence folder. No game-wide preload, runtime manifest, guessed wait, polling, retry implementation or permanent-cache guarantee was added.

Removed Bridge’s global ImageManager readiness pause; the old bust interception had already been removed in task 07. PASS: IT-001/006/055/060/066/074/075/076. Native observations distinguish provider request coverage/order from visible bitmap readiness. An unused delayed H8 bust does not freeze native choices or text. Entry, graphic change and prepared memorial pictures stay asynchronous; the installed GraphicChange retains the old picture until the new bitmap arrives. Late local 404 has no project error poll; at the next native scene-start readiness check MZ displays LoadError/Retry, and the actual Retry button recovers without campaign mutation.

First failures retained: the order sensor initially included the prologue’s background but instrumented loadPicture instead of the provider’s actual loadBitmap path; the prologue now also requests the shared list first. An asynchronous fixture initially retained an active choice window, then assumed GraphicChange replaces the name before loading. The fixture now starts from a native conversation and observes the actual provider lifecycle. These corrections add no game workaround. The final request-order and asynchronous cases passed fresh. The memorial composition passed after global loading interception was removed.

Evidence, exact commands, captures, per-case fingerprints and source/asset hashes: docs/qa/evidence/eventbridge-minimal-runtime/task-08/20260912/. All faults/saves are isolated integration fixtures; editor/package/direct-player completion remains with tasks 14/16. No mixed-sensor V-ID is closed and no commit was made.
