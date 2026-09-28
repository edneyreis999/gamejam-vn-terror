---
id: "08"
status: completed
depends_on: ["04", "05", "07"]
verification_ids: ["V-016/TECH", "T-003", "T-004/SAVE"]
---

# Task 08 — Expose tavern settings and a safe current-campaign save

## Outcome

Deliver RQ-016 within the approved design. A deliberate request performs one actual write to the associated file; only its success produces the notice, failure leaves Continue at the last successful file and restoration never reissues the request.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [programacao contract](prototype-feedback-refinement.programacao.md).
- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): CommonEvents.json CE003/038 stable preparation branches; Dryland_EventBridge.js SaveCurrentCampaign metadata, transient request and existing save/wait wrapper; Dryland_Presentation.js notice lifecycle if needed; installed OptionsCore/SaveCore commands unchanged.
- Canonical tests: `rpg-maker/tests/suites/persistence.mjs`, `rpg-maker/tests/suites/native-checkpoints.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own isolated storage-failure and native interpreter fixtures in canonical persistence suites, including an associated file and no-sequence-change write. Later directed evidence uses a new own campaign, never destructive quota/storage edits on a personal profile.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion or slot/SaveCore removal. Preserve automatic checkpoints.

## Checklist

- [x] Integrate visible Settings and Salvar campanha atual controls with task 05's board access at the approved tavern positions; Options return preserves valid preparation and focus.
- [x] Enforce the stable preparation preconditions including no busy choice/message, transfer, absence or write; an incomplete draft may save without becoming departure-valid.
- [x] Schedule the deliberate same-associated-file write only after the requesting interpreter naturally advances, using the existing wait owner and SaveCore AutosaveForce path. Do not mutate interpreter indices or skip because the sequence already matches.
- [x] Bind pending/success/failure to this actual request. Disable duplicate mutation while pending, show Salvando…, emit Campanha salva only on actual success for 120 frames without a new acknowledgement or focus theft.
- [x] Preserve native failure handling and last successful save; clear stale success and permit a deliberate retry. Load, title or another campaign cannot replay the request/toast or receive a late notice.
- [x] Cover same-sequence observation changes, overlapping activation, synchronous/asynchronous failure, subsequent success and saved-cursor resumption; hand off real current-file Continue cases to S-003.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-003; T-004/SAVE; T-001 command authoring; S-001/S-003. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-016/TECH, T-003, T-004/SAVE | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | A deliberate request performs one actual write to the associated file; only its success produces the notice, failure leaves Continue at the last successful file and restoration never reissues the request. | `docs/qa/evidence/prototype-feedback-refinement/task-08/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Save provider/wrapper, request identity, wait/cursor, checkpoint policy, associated file, read facts or notice cleanup invalidate persistence proof. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25 through [apply-task-08.mjs](apply-task-08.mjs). CE3/38 now expose Configurações and Salvar campanha atual in the upper reserved strip; Settings uses the installed Options command and returns to its native focus. Three final assets are preloaded by CE351. CE3 authors the noninteractive native success picture/text; Presentation owns its 120-frame transient lifetime and clears it on a new attempt, consultation, transfer, scene exit or load. The current-file request accepts a stable valid formation even with an incomplete draft, rejects busy/transfer/absence/pending conditions, and uses the existing save wait to start AutosaveForce only after the native request cursor advances. No interpreter index is rewritten and sequence equality never skips this deliberate write.

Bridge tracks one transient scheduled/writing request and associates its actual promise with the requesting scene/system. Pending writes reject campaign mutations and repeated saves. Only that write's success shows Campanha salva. Valid manual failures retain native SaveCore failure feedback; manual success consumes the provider callback to avoid a duplicate automatic-save notice. A WeakMap associates only manual callbacks with their origin and discards them after the scene/system is replaced. Ordinary automatic-save callbacks remain delegated. Late results cannot alter another campaign's persistence diagnosis or show feedback in a destroyed scene. Load has no live request and clears a restored save wait without writing.

The new IT-088 baseline failed on the absent save control. Initial technical execution found two concrete presentation defects: SaveCore callbacks touching a destroyed scene, and a zero-duration raw Game_Picture move leaving the notice invisible. The native success screenshot then exposed duplicate provider feedback, which is now consumed for manual success only. The added immediate-second-save sensor found an old visible notice serialized as opacity 255 while a one-frame hide was pending. Presentation now reinitializes that static native picture at its current authored geometry with the required opacity immediately, using Game_Picture.show; the saved notice is opacity 0. All failing runs remain preserved, including [the serialized-notice failure](../../../docs/qa/evidence/prototype-feedback-refinement/task-08/visible-save-failure/).

Final command selecting IT-088/089: **2 selected, 2 PASS**, exit 0, 96.1 seconds; [final manual receipts/captures](../../../docs/qa/evidence/prototype-feedback-refinement/task-08/final/manual/). Coverage includes mouse/keyboard entry, incomplete draft, actual file1 writes, naturally read hero observation with unchanged campaign sequence, advanced saved cursor, Continue without a repeat write/notice, Options/focus, pending overlap/mutation, synchronous/asynchronous failures, last valid bytes, retry, immediate consecutive save and obsolete completion after Title. IT-027/038/047/074 passed in the [integration lot](../../../docs/qa/evidence/prototype-feedback-refinement/task-08/final/integration/) (4 retained scopes); the final notice-opacity correction does not alter their interface controls, inventory or preload paths. IT-017/018 also passed for unchanged automatic checkpoint serialization/failure behavior. Both save tests were repeated after the final correction.

Viewed the successful native frame: full toolbar labels and Campanha salva fit without covering heroes/Seguir; no second provider success notice remains. Source review/deslop, syntax and whitespace checks passed. Keep the native UI assets/data, bridge/presentation request lifecycle and canonical tests; source facts remain in CampaignRules, request/notice objects remain transient. Owned test resources were torn down. No commit, staging, remote operation or personal save replacement occurred. V-016/LIVE and human UI judgment remain with task 13.

Public QA/devlog recipe: save an incomplete or complete preparation with the upper-right control, observe Salvando… only during the actual write and Campanha salva afterward, then enter Continue through the fresh age gate. Read Ivaí/map introduction and save again to compare before/after completion; leaving without saving must restore the last successful file's fact. Settings and Quadro return preserve draft and focus.
