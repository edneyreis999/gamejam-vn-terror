---
id: "04"
status: completed
depends_on: ["03"]
verification_ids: ["V-002/TECH", "T-002", "T-004/DESTINATION"]
---

# Task 04 — Make expedition preparation lead to the illustrated destination map

## Outcome

Deliver RQ-002 within the approved design. Party first, one introduction per restored preparation, selection updates the map/panel only, and Partir commits only when both formation and destination are valid.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [uiux contract](prototype-feedback-refinement.uiux.md).
- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): CommonEvents.json CE003/038/039 and new helper allocated from a checked free ID; Map003.json callers; Dryland_CampaignRules.js and Dryland_EventBridge.js field/action/query/load normalization; Dryland_Presentation.js observation integration. Dryland_MapComplete.png as the approved navigation overview and native marker/text containers; CE351.
- Canonical tests: `rpg-maker/tests/suites/formation.mjs`, `rpg-maker/tests/suites/persistence.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own pure transition and isolated save/event fixtures for T-002. Produce later directed snapshots from the candidate via new campaign, natural departure/retreat and existing save UI; manual-save scenarios become available after task 08.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Retire the unhelpful destination-not-chosen label and direct tavern departure path; remove old three-card presentation commands.

## Checklist

- [x] Retain party validity: exactly three when at least four live; automatic formation for one to three survivors; zero survivors ends the campaign.
- [x] Move route selection and Partir to the single-map surface with side information, leaving Seguir in the tavern enabled only for valid formation. Preserve valid back navigation.
- [x] Show location/name targets, complete public route information and derived states; final village stays visible/locked until both pieces are earned and overlaid, completed routes unavailable. Do not trigger narrative map discovery early.
- [x] Implement preparationIntroductionCompleted, the guarded completion action/query and missing-field normalization exactly as approved. Reset only on genuine preparation transitions/formation exit, not ordinary consultation or load; reject invalid present types and stale actions.
- [x] Author the exact Ivaí line before first destination selection using a distinct stable observation identity, player-controlled completion and global seen-text FAST distinct from per-preparation completion.
- [x] Keep selection separate from DEPART/checkpoint and add no save for the introduction. Prove saved-before/saved-after/unsaved reading behavior in canonical integration and prepare S-003 real-save variants.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001 metadata; T-002; T-004/DESTINATION; S-001/S-003 handoff. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-002/TECH, T-002, T-004/DESTINATION | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Party first, one introduction per restored preparation, selection updates the map/panel only, and Partir commits only when both formation and destination are valid. | `docs/qa/evidence/prototype-feedback-refinement/task-04/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Formation transitions, field/action/query, native observation identity, saved cursor, map geometry, derived route rules or controls invalidate this evidence. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25. [apply-task-04.mjs](apply-task-04.mjs) changes CE3/38/39/351 and allocates CE355 from the inspected free tail. Seguir requires valid formation; one uniformly fitted overview replaces the cards. Three location/name targets retain derived availability/status, the selected side panel retains all public text/progress, and separate Voltar/Partir preserve selection versus departure. The old tavern destination label/direct departure are retired. The three final native plates are consumed and preloaded.

CampaignRules owns the sole new persistent boolean, guarded completion action/history entry, genuine formation/exit reset and absent-field normalization. EventBridge exposes completion/canPrepare queries and normalizes before validating/freezing a loaded campaign. CE355 uses observation 355 and the exact player-paced line; global seen-text and per-preparation completion remain distinct. No new checkpoint reason or save was added. The existing Presentation observation commands suffice; no extra runtime presentation state was necessary.

UT-078 first failed because the fact was absent: [baseline](../../../docs/qa/evidence/prototype-feedback-refinement/task-04/baseline/execution.json). After implementation, UT-078 plus UT-008–015/044/045: **11 selected, 11 PASS**, exit 0. Initial IT-087: **1 selected, 1 PASS**, proving before/after/unsaved file restoration and no introduction save. [Initial receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-04/initial/) preserve these results.

Expanded native verification: IT-047/074/008/041 passed inventory/preload, route information, back preservation and traversed progress. The first expanded IT-087 pointer fixture sent down/up without a native frame between them; its [failure](../../../docs/qa/evidence/prototype-feedback-refinement/task-04/pointer-fixture-failure/execution.json) is retained. Using the established public-click helper corrected the input fixture. Final `node --test --test-name-pattern 'IT-087|IT-027|IT-038' rpg-maker/tests/campaign.test.mjs`: **3 selected, 3 PASS**, exit 0, including location/name/container clicks, locked activation, HIDE, held confirmation, actual legacy absent-field native load and the two saved-reading boundaries. [Final receipts/captures](../../../docs/qa/evidence/prototype-feedback-refinement/task-04/final/) are hash-bound. The independent old formation/route assertions were updated to the approved party-first flow; none was skipped. Generic canonical output now uses a dated native-tests directory (or explicit DRYLAND_EVIDENCE_ROOT), preventing later runs from overwriting historical evidence.

Viewed both map captures: complete name/rumor/progress fit the side panel; three targets and footer stay within 1280×720. These are technical fixture captures, not T-007/live/human acceptance. V-002/LIVE remains pending with task 13, and task 08 still owns deliberate player-initiated saves. Public recipe: select three heroes, Seguir, advance Ivaí, select a location, Voltar/reopen, then Partir. A later actual retreat/route completion starts the next preparation; task 13 owns its directed campaign proof.

Scoped self-review/deslop and whitespace checks passed; retain native consumers/assets, the guarded domain/bridge changes, canonical cases and authored mutation scripts. Preserve unrelated dirty files. No staging/commit/remote action occurred. Native Chrome/profile/server cleanup completed. The technical verdict does not certify the full spec or human acceptance.

Reopened by task 13's public-input run 7261: Partir transferred to Map004 then CE3 reopened formation because the child CE39 exit did not terminate its parent. IT-087 previously stopped at committed map/state/save and missed that next surface. The strengthened assertion reproduced the defect at 2026-09-25T19-14-46-826Z. CE3 now exits after CE39 returns on a different map; Voltar still redraws the tavern locally. Focused validation pending.

Departure repair technical closure: `2026-09-25T19-16-26-435Z`, IT-008/041/087 selected 3, PASS 3, exit 0, 158.5s. The next native surface is the expedition introduction, while local cancellation and route progress remain correct. Only CE3 changed; CE39 already ended its child. CommonEvents SHA256 `408979e6d1c444ff8334bdcacab9fa97e567e5ec3e5ae0e5705b9f6e90ca6541`. Task 04 technical scope is complete again; no LIVE inheritance. Fresh request physical-first-03 is collecting in run `a1afddb0-7ca9-410a-b6c5-98052ddb9825`.
