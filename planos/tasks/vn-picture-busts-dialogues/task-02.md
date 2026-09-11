---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: [V-003]
---

# Task 02 — Keep every tavern conversation continuous

## Outcome

All eight tavern heroes are authored through native commands. The hero persists from profile into the complete Ivaí dialogue, focus follows speech, and the conversation exits together. Selection and full-party feedback show only the relevant hero. Required images are ready before readable text, with native Retry and no delayed reappearance after cancellation.

## Authority

- [Spec](spec.md): RQ-001–RQ-005; [verification](verification.md): V-003 and D-01.
- [Programação](vn-picture-busts-dialogues.programacao.md), [UI/UX](vn-picture-busts-dialogues.uiux.md), [Technical Art](vn-picture-busts-dialogues.technical-art.md).
- [ADR-003](adrs/adr-003.md), [inventory](inventory.md), `rpg-maker/README.md` and [shared execution contract](tasks.md).

## Scope

- Implementation: EventBridge native conversation boundaries, bitmap readiness, root/helper ownership and formation cleanup; CommonEvents CE 3 and CE 5–12. Review CE 44 completion interactions.
- Data: all profile/speech/selection/party_full sections for H1–H8, 32 sections / 72 boxes; new literal helpers and native manifest. Use a guarded migration script created beside this spec; record allocations and phase preconditions.
- Assets: existing H1–H8 and Ivaí PNGs only. Calibrate native left/right active and listening states against their opaque content, preserving original orientation and bottom text.
- Tests: `rpg-maker/tests/suites/formation.mjs`, `content.mjs` and the existing Retry case in `native-controls.mjs`; relevant shared helpers and test manifest. Extend `rpg-maker/qa/native-surfaces.test.mjs` for legal tavern and isolated image-recovery coverage when needed.
- Fixture/readiness owner: cold/warm image cases, controlled missing-image service in a disposable fixture, owner cancellation during preparation/focus/exit, and all eight native recipes. Real directed setup follows the installed qa-execution skill before browser input.
- Delete targets: no files; bypass old automatic bust creation only for migrated presentations to avoid double rendering. Final removal belongs to 04.

## Checklist

- [x] Reproduce the current profile-to-dialogue bust replacement and capture the text/selection invariants before editing.
- [x] Add finite idempotent begin/reconcile/end boundaries with transient closed/preparing/active/exiting ownership; native child helpers never complete the root passage. Reject stale asynchronous work after disposal.
- [x] Author all eight heroes in all four tavern families. Keep profile and speech continuous, introduce Ivaí on his first line, retain same-speaker focus without restarting, and exit before status/formation takes ownership.
- [x] Author calibrated absolute position/scale/tone targets and short focus movement in events, using the delegated normal/reduced-motion baseline. No independent JavaScript layout catalog or global ScaleReset.
- [x] Await actual bitmap readiness before initial transforms and readable text; preserve native loading Retry. Keep intended focus interpolation independent of arbitrary frame sleeps and input locks.
- [x] Preserve successful selection before its feedback and full-party rejection without replacement; system status boxes keep their existing role. Record a complete H1–H8 × four-family ledger, not a sample-only result.
- [x] Update IT-030's picture-18 readiness expectation to the configured native dialogue slot and actual load lifecycle. Verify single-person, alternating speakers, repeated same speaker, cold/warm loads, controlled missing image/Retry and cancellation with no late picture. Run the directed tavern readiness observations required by V-003 as well as native integration.
- [x] Revise the manifest after native edits, run focused checks and record V-003 evidence. Continue to Council without a sample approval checkpoint.

## Validation

Execution modes: Chrome integration and focused directed-browser observations under D-01; missing image/cancellation remain clearly labeled controlled fixture evidence. Start with `node --test --test-name-pattern='IT-(004|006|007|030)' rpg-maker/tests/campaign.test.mjs`, adding new readiness cases; run the content CLI after revision.

| Verification ID | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-003 | Cold/warm images, native Retry, cancellation and temporal observation | Configured art ready before readable text; no default-scale flash or stale entrance; Retry resumes the intended owner | task-02/<run-id>/readiness/ |
| D-01 contribution | All-eight native recipe ledger and legal interaction | 32 sections / 72 boxes preserved and migrated; profile→speech continuity; one-person feedback | task-02/<run-id>/tavern-coverage.json and captures |

Invalidated by owner/loader/vendor behavior, native recipes, assets, UI timing or input changes. Later work reuses this owner; final QA checks freshness rather than treating the first tavern run as proof for changed source. Full campaign variant consolidation belongs to V-004 in 09.

## Execution Notes

In progress on 2026-09-11. Guarded migration `migrate-native.mjs tavern` allocated helpers 68–94, covering all 32 sections / 72 boxes, and revised native data to `mz-20260911-busts-tavern-01`. [Receipt](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-02/migration-tavern/receipt.json) records exact authored layouts and pre/post hashes. CE3 begins/ends the profile+speech owner and calls collective native exit; one-person feedback exits inside its section. Required bitmaps use native readiness and Retry without asynchronous presentation callbacks.

Baseline integration first failed at service startup: an existing Python PID 62392 occupied 18726 and returned an empty reply. It was preserved. `native-chrome.mjs` now accepts validated `DRYLAND_QA_PORT`, defaulting to 18726. All local test runs use isolated 18727; their saves are separate. [Pre-migration runtime](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-02/2026-09-11T07-11-07-826Z/result.json) passed IT006/007/030 with old art and no migrated events.

First migrated integration caught stale picture18 expectations and an assertion before the permitted 20-frame focus transition settled. Tests now observe the new owned slots and actual final-tone readiness. A subsequent failure exposed vendor mutation of native argument objects: the plugin adds decoded keys in place. The bridge now passes a fresh argument copy; IT006 verifies source helpers remain byte-equivalent in memory after repeat calls. [Confirmed diagnosis](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-02/2026-09-11T07-16-39-223Z/tests.log), [repaired IT006/007/030 run](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-02/2026-09-11T07-17-47-507Z/tests.log): 3/3 pass. IT004 had passed in the earlier migrated run and its completion path is unchanged.

IT060 owns explicit load-interruption fixture coverage. Its first fixture failed to mark the held I/O as loading, so native Bitmap correctly treated its default empty state as ready; that fixture was corrected. The next run confirmed the shipped title is Scene_EventedTitleMap, which recreates a ready campaign and displays warnings; the test now uses visible native Continue and preserves saved bytes as its interruption oracle. These are fixture corrections, not product fixes. Current next action: finish IT060, run the new directed `bust-tavern` variant through the installed executor, inspect all eight portraits/focus, and close remaining readiness/temporal criteria before Council.

Gorvak profile and the first Ivaí response have been visually inspected at 1280×720: correct left/right composition, visible faces, text/name legibility, and reduced listening size/tone. This is a scoped observation only. Full V003 and all-eight directed/visual evidence remain pending. No human approval dependency.

Completed on 2026-09-11. Final focused run `task-02/2026-09-11T07-32-08-078Z` passed IT004/006/007/030/060 (5/5) and content CLI. IT060 proves cancellation during held native I/O preserves the save and never resurrects busts.

The first directed run exposed a visible initial-scale flash: the vendor applies zero-duration transforms on the next update, allowing following focus commands to overwrite their targets. The owner now waits for actual initial position/scale/tone settlement before the next stage or readable text. The failed captures remain in `directed-bust-tavern-2026-09-11T07-22-57-276Z`. The repaired normal run `directed-bust-tavern-2026-09-11T07-26-27-306Z` completed all eight heroes, all seven conversation boxes each, HIDE, selection/removal and every full-party rejection; all eight first-Ivaí captures were inspected. The large/reduced run `directed-bust-tavern-2026-09-11T07-29-17-366Z` completed the same ledger at 1920×1080; H1 box2, H5 box3 and H2 box0 were visually inspected. Raw executor reports remain executed-awaiting-review; scoped separate visual review records distinguish inspection from automation. V003 passes this implementation stage; task09 owns fresh full V007 consolidation.

Task09 deep-review follow-up: RD0001 tests whether a rejected Conversation can invoke a marked helper without an owner. Reopened for a focused native regression and any confirmed owner-boundary repair; original layout evidence is preserved. RD0002 was suppressed after source tracing showed its harmful checkpoint sequence is outside approved authoring and the actual text-only reward checkpoint re-establishes ownership before helpers.

RD0001 closure: full current-source suite `task-09/2026-09-11T10-36-54-403Z` passed138/138, no failures/skips, CLI exit0. Independent round2 accepted the owner-entry repair; EventBridge7b161464 and native data unchanged. Task09 retains ownership of final campaign/visual consolidation.
