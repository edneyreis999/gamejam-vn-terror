---
id: "12"
status: completed
depends_on: ["01", "08", "11"]
verification_ids: ["QA-PLAN"]
---

# Task 12 — Plan the durable QA cycle

## Outcome

Turn the implemented candidate and valid technical receipts into one executable, resumable plan for S-001–004 and the remaining T-001/T-007/live/human obligations. This task plans QA; it does not execute a playtest or close gameplay criteria.

## Authority

Read [tasks.md](tasks.md#shared-execution-contract), [spec.md](spec.md), [verification.md](verification.md), all five approved discipline contracts, every implementation task's execution notes and [the durable QA index](../../../docs/qa/README.md). Activate `rpg-maker-mz-qa-report`. Follow [G004–G006](../../../docs/adrs/README.md) and the [Trello workflow](../../../docs/_memory/trello-workflow.md); local QA tasks are not separate Trello QA cards.

## Scope

- Implementation/data/assets: read-only inventory of the integrated candidate; no new game behavior.
- Tests/fixtures: gather canonical case receipts and the behavior tasks' owned setup recipes. Identify invalidated evidence and missing observable entry paths instead of inheriting historical PASS.
- Durable QA: update the applicable existing journeys/scenarios/charters and create the incremental guide/charter when needed, using `docs/qa/guides/prototype-feedback-refinement.md` and `docs/qa/charters/CH-prototype-feedback-refinement.md`. These are planned destinations, not existing evidence.
- Existing scenario owners include FOR-mz-formation-roster, ENC-mz-encounter-sacrifice-retreat, CAM-mz-discovery-closing, LOC-mz-session-recovery-export, ACC-mz-hide-keyboard-qa, ART-mz-visual-audio-runtime and ART-mz-human-approval. Preserve their prior verdict history; add this increment's scope/status.
- Reuse the three reported bug records for choice hit areas, Rheed/Ivaí framing and memorial clipping. Plan reproduction/retest links without calling them fixed or reproduced prematurely.
- Delete targets: none. No tracker publication, remote assignment or game launch.

## Checklist

- [x] Confirm all implementation leaves are ready and references/evidence are current; inspect the actual native command IDs and final assets.
- [x] Build the requirement/portion-to-scenario map from verification.md, with one primary task owner per criterion and retained implementation evidence.
- [x] Prepare S-001 title→first expedition; S-002 loss→tavern; S-003 both initial-route closing/recovery sequences; S-004 final choices/cemetery/eligible epilogues/credits.
- [x] Record required variants, exact public entry steps, candidate/hash/origin/profile prerequisites, expected read-only observations and natural own-save preparation. Never prescribe seed/state injection or a borrowed save.
- [x] Plan T-001 native authoring checks for changed command metadata through Editor edit/save/reopen on an isolated candidate copy; keep this distinct from campaign mutation and from static metadata tests.
- [x] Plan T-007 and human review: minimum 1280×720 and reference 1920×1080, distinct narrator/Ivaí families, longest text, seven-name tavern, maximum eight-dead cemetery, normal/reduced timing and audio listening.
- [x] Group equivalent expensive variants under ADR-G006 with retained proof, shared path, residual risk and invalidation condition; retain distinct first/second route closure, both voluntary endings and applicable no-epilogue/total-loss behavior.
- [x] Define resumable lots A–E from task 13, bug repair/retest handling, evidence destinations, ownership-aware teardown and final devlog captures.
- [x] Update durable QA links and this task's notes. Make remaining gaps explicit without changing approved outcomes.

## Validation

Execution mode: documentation/source inventory only. S-001–004 remain `directed-browser`; technical fixtures, native Editor checks, visual measurement and human judgments retain their separate modes.

| Primary verification ID | Sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| QA-PLAN | Cross-reference and risk/entry audit of the guide, scenario updates and charter | Every remaining V/LIVE, T-001 and T-007 criterion has a reachable entry, expected result, selected variants, evidence destination and task-13 lot; all implementation receipts have a freshness disposition | Guide/charter above and execution notes here |

Freshness: any later change to event lists, plugin metadata, fonts/art, save boundaries, eligibility, timing, audio or the integrated revision reopens the affected planned setup/evidence. A plan does not become a PASS merely because all rows are populated.

## Execution notes

QA planning completed 2026-09-25 with rpg-maker-mz-qa-report. The incremental guide/charter maps all V portions and T sensors to S-001–004/lots A–E, records candidate/own-save/origin prerequisites, public entry, native Editor round-trip, 1280/1920 variants, current technical receipts and their invalidation rules. Seven existing scenarios and four journeys gained this increment without changing historical verdicts. The three existing bugs remain assigned to directed retest. G006 keeps distinct route closings, both voluntary endings, total loss and a multi-death return in both modes; repetitive hero matrices use their explicit technical representatives without claiming a new played campaign. User judgments remain against concrete future material. No game launch, remote assignment or publication was performed by this planning task.
