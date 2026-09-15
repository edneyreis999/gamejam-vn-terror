---
id: "13"
status: completed
depends_on: ["05", "10"]
verification_ids: []
supporting_verification_ids: [V-014, V-011]
---

# Task 13 — Finish or skip native rolling credits exactly once

## Outcome

Credits use native speed-2 rolling text, end after the final line and support keyboard/mouse skip with one clean title return, preserving the saved ending.

## Authority

- [Spec](spec.md): RQ-016.
- [Verification](verification.md): V-014, V-011.
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F23–F24; native credits portion of F43.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/CommonEvents.json` CE61–63, the CE40 terminal-to-credits branch and closing call sites; relevant closing map routing; narrow native scroll cancellation in `Dryland_Presentation.js` only if required.
- Tests: `endings.mjs`, `native-controls.mjs`, `native-checkpoints.mjs`; native scrolling window/skip fixtures using existing closing helpers.
- Fixture and readiness owner: task 13. Own ordinary and long rolling-text fixtures, natural/accelerated completion and early/late skip; observe final-line exit, cleanup and title transition count plus unchanged saved ending.
- Data/assets: Use native command105 speed=2, no-fast=false with current credit attribution text; native return-to-title after shared completion/skip cleanup. No new artwork or prose beyond the existing attribution.
- QA/docs: Record the editor text/speed/skip entry and the ending→credits devlog capture location.
- Delete targets: Remove CE62's old 600-frame timer behavior, Bridge credit drawing/countdown hooks and their consumers. Retire an unreferenced CE slot without renumbering other CEs; no orphan parallel event may survive.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Replace fixed-duration presentation with native Show Scrolling Text. Let normal completion follow the full roll, including an intentionally long credit fixture.
- [x] Preserve native held-confirmation/Shift/touch acceleration without treating touch as new mobile support. Do not substitute the Extended Message console for scroll-window behavior.
- [x] Provide authored Pular créditos while scrolling is busy, with keyboard/mouse access. Do not place Show Choices behind the busy scroll and assume it is usable.
- [x] Use only narrow native cancellation support if the providers/events need it; natural end and skip share cleanup and one return-to-title path.
- [x] Verify early/late skip and Continue replays the same saved ending without a new outcome choice or altered save.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S12; S09 terminal-file preservation.

Required variants: Natural completion; accelerated completion; early/late keyboard and mouse skip; long text; ending without memorial/epilogues; Continue replay.

Invalidates/reuses: Command105 text/speed, input/cancellation hooks, parallel-event cleanup and closing routing invalidate credits proof. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-014, V-011 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Final line finishes before natural return; skip works during the roll; exactly one title return occurs and saved ending bytes/facts remain unchanged. | `docs/qa/evidence/eventbridge-minimal-runtime/task-13/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Completed technical scope on 2026-09-12. CE63 now owns command105 `[2,false]` and the unchanged attribution in native405 lines. CE61 owns the background, authored bottom-right Pular créditos · Esc picture/label, direct CE63 call, erasure and one command354. CE62 is an unreferenced nonparallel reserved slot; the 600-frame timer, Bridge credit renderer/Observe command and dynamic choice expansion were deleted. Presentation binds a native picture to narrow scroll cancellation; Enter/Shift/touch retain native Window_ScrollText acceleration. No new outcome or checkpoint was added.

Evidence: [task-13/20260912](../../../docs/qa/evidence/eventbridge-minimal-runtime/task-13/20260912/). IT-022 passed all three ending kinds and repeated Continue, retaining each selected file. IT-058 passed all eight eligible epilogues, ordinary natural/Shift-accelerated completion, early/late keyboard/mouse skip, and the isolated 80-line fixture exceeding 2048 pixels with a second native block. Every variant returned once; natural exits recorded `_scrollY >= _allTextHeight`; captured ending-file bytes remained unchanged. This is native integration, not play-earned directed QA. Node syntax passed; existing engine/provider sources remain unchanged.

First failures preserved: IT-058 still searched retired section markers (fixture corrected to the native CE name); its next run read SaveCore's new title default slot instead of the ending's captured file ID (corrected). Neither failure required runtime changes. Final IT-058 took 204 seconds. Extra direct Enter/touch speed assertions and a mid-roll screenshot were added afterward and will execute in task14's canonical regression; Shift acceleration and all required native paths are already evidenced. The initial roll screenshot was visually inspected: the authored button is visible and unobstructed; moving attribution/long-block captures receive the remaining visual review in task16.

Editor/devlog entry: Common Events 61 (stage and skip) and 63 (attribution, speed2, fast allowed), with CE40 terminal routing. Capture ending → full native roll → one title return in task16. V-014/V-011 remain with their primary owner; no human acceptance is claimed.

