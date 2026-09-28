---
id: "07"
status: completed
depends_on: ["04", "06"]
verification_ids: ["T-006/RETURN"]
---

# Task 07 — Stage completed-route returns and all deceased absences

## Outcome

Deliver RQ-011, RQ-013 within the approved design. Route narration/rewards finish first, then the separate transition and simultaneous three-second absence; preparation is blocked only for the applicable effect and no death is reapplied.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [uiux contract](prototype-feedback-refinement.uiux.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): CommonEvents.json CE040/045/046/348–350 plus actual retreat/discovery callers and CE352/353/302 closing sequence; Map003 preparation entry; Dryland_Presentation.js transient return and WaitForReturnPresentation metadata/wait lifecycle.
- Canonical tests: `rpg-maker/tests/suites/discovery.mjs`, `rpg-maker/tests/suites/retreat.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/native-checkpoints.mjs`, `rpg-maker/tests/suites/persistence.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own technical fixtures for new/old/multiple/no deaths, each genuine return caller, in-progress wait restoration and consultation returns. Public QA uses own campaigns/compatible saves and records real timing separately.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No filesystem deletion. Remove active obsolete 60-frame/once-only absence consumers after confirming their scope; do not remove shared unrelated switches/events.

## Checklist

- [x] Trace first/second route completion and voluntary/automatic retreat to the actual formation boundary; record current once-only switches, parallel release and their consumers.
- [x] After the entire initial-route closing sequence, apply 30 frames to black, 24-frame black hold, 30-frame tavern fade; reduced motion changes immediately with no hold. Do not add dialogue, reward repetition or a return after Council/total loss.
- [x] Arm a transient absence only for an actual expedition return. Draw all deceased heroes in their fixed places, including older deaths, without ever restoring eligibility.
- [x] Start all 180-frame fades together, then use the single approved presentation barrier until all finish; no per-hero waits or prematurely active preparation. No dead/reduced motion bypasses the delay.
- [x] On normal consultation and Continue into an already reached tavern, show empty places without replay. A restored wait with no active transient return resolves and cleans up before enabling input.
- [x] Retire CE350's active 60-frame release and obsolete once-only eligibility after a consumer audit. Verify metadata, native wait/cleanup and equivalent return paths, and prepare the normal/reduced-motion video cases.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-006/RETURN; T-001 authoring; S-002/S-003. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| T-006/RETURN | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Route narration/rewards finish first, then the separate transition and simultaneous three-second absence; preparation is blocked only for the applicable effect and no death is reapplied. | `docs/qa/evidence/prototype-feedback-refinement/task-07/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Return callers, native lists, effect lifetime, wait cleanup, picture motions, saved interpreter or reduced-motion handling invalidate retained results. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25 through [apply-task-07.mjs](apply-task-07.mjs). CE348 now arms a transient return only when an actual consequence/retreat caller reaches formation. Voluntary callers remain in Maps007–022; automatic retreat goes through CE44. The reward-stage arm was removed. CE51/52 arm route completion only after their final ReadingComplete reaches formation, after CE352/353, Irati and map revelation have finished. CE40/38 use native picture 90 for 30-frame fade to black, 24-frame hold and 30-frame tavern reveal; reduced motion skips the overlay and waits. CE45 redraws all dead heroes in the current fixed container/portrait positions and starts their native 180-frame moves together. WaitForReturnPresentation observes only those live moves before CE349 cleanup and choice creation. Its IDs live in Game_Temp; load clears them and a restored wait resolves without replay. No death, reward or eligibility fact is modified.

Consumer audit: switches 38–45 were confined to CE348's old once-only logic; switch 47 belonged to CE45/349/350 release, distinct from the still-live motion preference variable 47. CE350 is now inactive with no executable timer. Variable 48 names the consumed transient effect. Independent review confirmed callers and last-reading boundaries. Its suspected CE38 conditional nesting did not reproduce: the native 412 closes the disabled-Seguir branch before the root-level fade and CE45 call; IT-009 proves the effect with a valid returned party.

The historical 60-frame IT-009 plus UT-029/030/031 passed (4/4) before changing the sensor. Updated IT-009 then failed on the absence of 180-frame moves: [baseline](../../../docs/qa/evidence/prototype-feedback-refinement/task-07/baseline/). Final native commands selected IT-009/010/011/013 (**4/4 PASS**, exit 0, 144 seconds) and IT-052/053 (**2/2 PASS**, exit 0, 363.5 seconds). [Return receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-07/returns/) prove simultaneous positions/opacity, blocked input through frame 179, cleanup, all old losses on a later genuine return, no replay on redraw, saved-wait restoration, reduced motion and voluntary retreat. [Closure receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-07/closures/) prove both route orders, complete text/reward sequence, normal 30/24/30 movement values, no overlay for reduced motion, no-death continuation and saved reward safety.

Scoped self-review/deslop, JavaScript syntax and whitespace checks passed. Preserve native events, transient presentation wait/metadata, named variable and evolved canonical tests. Owned test browser/server/profile teardown completed. No commit, staging or remote action occurred. These are technical fixtures; normal/reduced-motion capture timing and human pacing/visual judgment remain in task 13.

Public QA/devlog recipe: return after a natural loss by confirmed retreat, automatic retreat or finishing an initial route. On a route completion, finish all discovery/Rheed/Irati/map text first. Observe the separate black pause/reveal, then all absences together before preparation controls. A later return includes older losses; hero/board/map visits and Continue into the reached tavern show their empty places directly. Use reduced motion for the immediate counterpart.
