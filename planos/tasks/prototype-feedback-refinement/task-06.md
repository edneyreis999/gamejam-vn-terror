---
id: "06"
status: completed
depends_on: ["03"]
verification_ids: ["V-008/TECH", "V-012/TECH", "T-004/SACRIFICE", "T-005"]
---

# Task 06 — Make sacrifice targets commit the chosen victim and name the consequence

## Outcome

Deliver RQ-008, RQ-012 within the approved design. The deliberately selected eligible hero dies once, their farewell precedes the correctly named consequence, and no preceding input can choose accidentally.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Shared native sacrifice owners in CommonEvents.json; Map015.json and Map021.json failure passages; CE266–281 death contexts and CE282–289 farewell sequencing. Existing CampaignRules SELECT_VICTIM/pendingOutcome and Bridge victim-name query. Picture/name base containers and Presentation input guard.
- Canonical tests: `rpg-maker/tests/suites/sacrifice.mjs`, `rpg-maker/tests/suites/native-death-context.mjs`, `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/suites/persistence.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/shared-ui.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own deterministic mechanical/native fixtures for each consequence lookup, non-first victims, stale/repeated actions and post-sacrifice restoration. Own the public-step setup recipe for later directed loss; no seed/state injection in that run.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Remove only scoped generic victim substitutions and duplicated old consequence text, preserving unrelated atmospheric prose.

## Checklist

- [x] Capture the current failure/farewell/consequence order and actual candidate bindings; preserve permanent death/save at selection.
- [x] Implement coherent eligible candidate targets and the existing irreversible warning. Exclude dead/reserve members, prevent opening/advance gestures from selecting and allow only one committed action.
- [x] Transcribe the two neutral danger splits and sixteen named consequence passages exactly from the approved consequence file.
- [x] Resolve the public name from pendingOutcome.victimId after selection, including a non-first party member; retain that identity through farewell and consequence without unset/previous-victim leakage.
- [x] Preserve danger → selection/checkpoint → farewell → named consequence, with no duplicate harm paragraph, repeated death or extra confirmation.
- [x] Prove actual victim, single save/consequence and saved-boundary resumption in canonical tests; prepare a naturally reachable failed encounter and sacrifice/return handoff for S-002.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001 scoped prose; T-004/SACRIFICE; T-005; S-002. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-008/TECH, V-012/TECH, T-004/SACRIFICE, T-005 | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | The deliberately selected eligible hero dies once, their farewell precedes the correctly named consequence, and no preceding input can choose accidentally. | `docs/qa/evidence/prototype-feedback-refinement/task-06/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Victim selection/query, pending outcome lifetime, native message order, target geometry, input guards or checkpoint/resumption change invalidate proof. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25 via [apply-task-06.mjs](apply-task-06.mjs). CE43 now uses one 356×424 selectable base per eligible hero, with attached proportional portrait and native name/action text; CE42 retains immediate SELECT_VICTIM and its checkpoint. CE304 detaches candidate children during cleanup; CE351 preloads the final container. Bridge victimName resolves only pendingOutcome.victimId. CE266–281 carry the sixteen exact approved consequences; Map015/021 use the two neutral danger lines and the matching post-selection leads are guarded by outcomeApproachId. Variable 159 names that authored query result. Farewell/death ordering and the atomic domain action remain unchanged.

UT-079 first failed against the generic baseline, then passed with UT-021–028/044 (10 selected, 10 PASS). Final node --test --test-name-pattern 'IT-012|UT-079' rpg-maker/tests/campaign.test.mjs: **2 selected, 2 PASS**, exit 0, 272.8 seconds. [Final matrix receipts/captures](../../../docs/qa/evidence/prototype-feedback-refinement/task-06/final/matrix/) cover all eight victims at both supported viewport sizes/motion preferences, three/two/one candidates, portrait/name/edge activation, bounds/gaps, complete named text, one death and a non-first victim restored from the actual saved boundary. IT-015/016/026 also passed (three retained [receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-06/final/)); their runtime inputs are unchanged by subsequent IT-012-only sensor corrections.

Preserved failed runs under native-tests: 14-42-36 and 14-47-07 measured the hidden main-container sprite instead of the visible attached descendant; 14-48-08 exposed the provider's WrapBreak markup in the text sensor; 14-48-59 reached the old 240-second timeout while progressing. The final sensor measures the attached descendant, normalizes only native whitespace markup, and allows 420 seconds for the expanded sixteen-case full-reading matrix (observed 272 seconds). No runtime layout workaround was needed. The viewed three-candidate frame fits all portraits, full names and the warning.

Keep the consumed native data, final asset, query metadata, mutation script and canonical suite changes. Scoped self-review/deslop and whitespace checks passed; owned test browser/server/profile teardown completed. No commit, staging or remote operation occurred. Technical fixtures do not close V-008/LIVE, V-012/LIVE or human visual/narrative acceptance, assigned to task 13.

Public QA/devlog recipe: depart with a valid party, reach a naturally failed approach, read the irreversible warning, and deliberately choose a non-first candidate. Confirm that the farewell comes before the consequence naming that hero. Continue from that campaign's sacrifice checkpoint to verify the same victim; let the real expedition return feed the absence/board capture.
