---
id: "06"
status: completed
depends_on: ["05"]
verification_ids: [V-005]
---

# Task 06 — Preserve reading controls and dispose interrupted conversations

## Outcome

HIDE, restoration, rapid valid advance, seen-only skip and scene exits preserve the intended composition and consume input correctly. Cancellation at any owner stage cannot leave or recreate a bust, and unrelated pictures survive.

## Authority

- [Spec](spec.md): RQ-003–RQ-006; [verification](verification.md): V-005, D-06 and D-10.
- [UI/UX](vn-picture-busts-dialogues.uiux.md), [Programação](vn-picture-busts-dialogues.programacao.md), [ADR-003](adrs/adr-003.md).
- `docs/qa/scenarios/ACC-mz-hide-keyboard-qa.md`, `rpg-maker/README.md` and [shared execution contract](tasks.md).

## Scope

- Implementation: EventBridge HIDE/input aliases, skipPresentation, root/helper termination, Observe cleanup, title/New Game/scene-transfer invalidation and owner cancellation. Preserve unrelated reading/choice behavior.
- Data: adjust only affected explicit conversation boundaries/helpers if tests expose a gap, with fresh manifest revision. No text, picture-owner reassignment or audio changes.
- Tests: `rpg-maker/tests/suites/shared-ui.mjs`, `native-controls.mjs`, `content.mjs`, and native lifecycle helpers; keep save-specific assertions in persistence rather than copying them.
- Fixture/readiness owner: interruption during preparing, active focus, collective exit and post-load reconstruction; queued callbacks/child interpreters and separate picture owners; rapid mouse/keyboard, cold/warm and normal/reduced-motion variants.
- Directed input cases: extend the existing native journey/surface drivers to traverse D-06 through legal player input. D-10 direct interruption injection remains integration-fixture evidence.
- Delete targets: obsolete lifecycle branches only when superseded by the owner model; no public controls or files removed.

## Checklist

- [x] Capture current HIDE/restore, skip-seen and input-consumption signals before extending the composition cases.
- [x] Update IT-027's picture-18 checks to the native dialogue composition. Verify HIDE leaves artwork intact and restoration consumes Tab/left-click without advancing text, selecting a choice or causing a focus restart. Keep dialogue slots 60–65 out of the interface-only picture-hide ranges; do not confuse hiding UI with disposing a conversation.
- [x] Verify intended passage boundaries retain the owner; actual conversation/scene boundaries settle or dispose it before the next scene/choice owns input.
- [x] Make partial/full seen-only skip, abort, invalid campaign, scene/map transfer, formation, title and New Game cancel owned effects regardless of whether final native exit commands ran.
- [x] Invalidate delayed bitmap callbacks, native child work and transitions across all owner states, including reconstruction. Never use a timeout as the correctness condition.
- [x] Prove backgrounds, map pieces, formation/candidate portraits, memorial and other independent pictures are preserved by dialogue disposal.
- [x] Run real directed mouse/keyboard D-06 coverage for 1x1 and 3x1, normal/reduced motion and cold/warm loads. Run every D-10 state as a labeled integration fixture with an observable queued-work signal.
- [x] Retest only affected save/readiness cases when lifecycle changes invalidate 02/05 evidence; update original verification owners and continue without approval.

## Validation

Execution modes: native integration, directed-browser input and labeled interruption fixtures. Initial filter: `node --test --test-name-pattern='IT-(025|026|027|038|050)' rpg-maker/tests/campaign.test.mjs`; add newly owned lifecycle cases. Run content CLI after any native edits.

| Verification ID | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-005 | Directed input, state comparisons and temporal captures | No carried input; correct persistence/end boundary; unrelated pictures unharmed | task-06/<run-id>/reading-controls/ |
| D-10 | Controlled native lifecycle interruption matrix | Disposed owners and children never recreate effects, including after reconstruction | task-06/<run-id>/interruption-matrix.json and captures |

Invalidated by input aliases, owner/loader/save lifecycle, scene observers, helper boundaries, interpolation or picture allocations. Hidden state/assertions and temporal visual evidence are separate sensors; a single final screenshot cannot prove absence of late callbacks.

## Execution Notes

In progress2026-09-11. Read-only review confirmed skip leaves its live descendants and root clear does not inspect descendant ownership. Added IT064 in the canonical controls suite to expose this with a retained real native stack and independent pictures. Baseline controls+IT064 run is in progress. Ordinary profile/speech/Council termination must keep ownership; Options return must reconstruct the same reading, so those are not blanket-cancellation defects.

Baseline08-38-30-431Z passed existing IT025/026/027/038/050 and failed new IT064 because a root clear left its descendant-owned bust visible. The runtime clear now recursively cancels descendants without passage completion; close invalidates private recovery/targets before erasing only owned slots. Scene transfer/title and memorial/credits/final closing dispose effects, while the intended Council loop and Options return retain their reading semantics.

First repair08-41-05 exposed two test/lifecycle details. The root map interpreter is legitimately reused by an autorun after clear, so the interruption fixture now suspends only fresh map scheduling while explicitly invoking retained old references; it does not confuse new formation work with resurrection. The skip test initially used a text-only readiness helper at the final choice; after correcting that sensor,08-42-44 still showed an inactive final choice. This is a real skip defect: native updateInput normally clears Window_Message.pause before termination, but the S path omitted it. The skip path now clears that pause itself. Expanded IT064 passed all six active/focus/exit × normal/reduced variants before this pause-only change.

Partial skip uses the same native restore helper for the next validated passage, replacing only its effect prefix; no skipped text or domain commands run. IT065 checks confession composition after skipping challenge and the final choice after full seen skip. IT066 adds the separately labeled cold reconstruction cancellation to the existing persistence suite. D10 bitmap-preparing remains IT060. Current focused run includes readiness/reconstruction/controls; directed mouse/keyboard cold/warm cases are being prepared.

Repaired run08-45-14-816Z passed6/6 IT050/060/062/063/064/065 and CLI, including active/focus/exit cancellation in both motion modes and actionable final choice after full skip. The only subsequent runtime change resets the transient skipped-to request at native New Game/load boundaries; fresh directed entry and the new IT066 exercise those boundaries.

Directed tavern08-48-56 and large/reduced08-49-34 passed HIDE/restoration over cold and warm same-page image caches. The expanded legal-revisit run08-50-47 first exposed a recipe error: retreat clears the selected destination. Corrected navigation explicitly reselects the Church before departure; normal08-52-25 and large/reduced08-53-11 passed genuine seen-only S with held input. No campaign/history mutation supplies that directed coverage. Current Council normal08-54-30 passed with explicit nonempty60/61/62/63 assertions, HIDE/restore at confession and restored first opinion; controls-review.json records inspected stills. Large/reduced Council and IT066 are pending.

Council large/reduced08-57-32 failed with slot65 persisting in opinions. IT054's new reduced ensemble variant reproduced the cause09-00-28: vendor Exit duration0 leaves opacity255/targetOpacity0 with no fade clock. The owned adapter now finishes zero-duration exits with native erasePicture after invoking the unchanged vendor command.09-01-35 passed IT015/016/038/054, including normal/reduced Council; IT066 initially held Scene_Map's initial saved-sprite image load before the private recovery existed. The corrected fixture removes transient pictures before native serialization, making the real restoration helper own the held bitmap.09-05-58 passed IT066 and CLI, proving cancellation before image release prevents later resurrection without save/domain changes. The original failure evidence remains retained and is not claimed as private-helper coverage.

Completed2026-09-11: final large/reduced Council09-06-42 passed the full legal journey; controls-review.json records actual inspection of hidden confession and restored opinion. D06 normal/large-reduced tavern+council and D10 preparing/active/focus/exit/recovery are covered by the linked directed and labeled integration evidence. Final source freshness is consolidated in09. No human acceptance claimed.
