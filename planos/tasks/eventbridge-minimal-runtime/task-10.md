---
id: "10"
status: completed
depends_on: ["09"]
verification_ids: []
supporting_verification_ids: [V-005, V-007, V-009, V-010]
---

# Task 10 — Keep HIDE, keyboard control, reduced motion and VN map behavior outside Bridge

## Outcome

The migrated interface preserves HIDE, visible keyboard focus and one gesture per interaction, while native startup/events enforce VN movement/menu behavior and reduced-motion presentation.

## Authority

- [Spec](spec.md): RQ-011, RQ-017.
- [Verification](verification.md): V-005, V-007, V-009, V-010.
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F28–F31, F41–F43.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `Dryland_Presentation.js`, `Dryland_EventBridge.js`, `js/plugins.js`; `data/CommonEvents.json` CE64/65, configuration/startup CE and authored UI/motion branches; `data/System.json` and affected map entry commands.
- Tests: `native-controls.mjs`, `shared-ui.mjs`, `native-boot.mjs`, `formation.mjs`; existing HIDE and input fixtures in native helpers.
- Fixture and readiness owner: task 10. Own message/choice HIDE restoration, focus and held/released gesture traces, reduced-motion preference observation and startup menu/movement tests at both supported desktop sizes.
- Data/assets: CoreEngine QoL:struct NewGameCommonEventAll:num selects the initialization CE; use native menu-access Disable. Hide/restore uses explicit authored element bindings and previous opacity/visibility, not hardcoded ranges.
- QA/docs: Record keyboard order, HIDE gesture behavior, native menu/reading policy fields and scene-local animation alternatives.
- Delete targets: Remove Bridge input/visibility/motion/audio-independent Scene_Map overrides, blanket duration interception and always-false menu policy after equivalent event/provider behavior is wired.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Start from MessageVisibility and PictureChoices behavior; add only missing integration to Presentation, with no layout strings, hero arrays, campaign state or a duplicate input engine.
- [x] Hide named authored UI elements while preserving their prior appearance. Restoring with Tab/left-click consumes the gesture without advancing text or activating an invisible choice.
- [x] Keep eligible focus and one physical gesture per confirmation across dialogue/approach/sacrifice; preserve later deliberate input and provider automatic reading.
- [x] Expose the system reduced-motion preference as an event value and branch animations to final positions/short paths. The preference never changes domain outcomes.
- [x] Disable free avatar movement and ordinary held-input event acceleration while preserving keyboard choice navigation, authorized provider FAST and native credit acceleration.
- [x] Configure menu access in the all-sessions native startup CE, preserving Options and SaveCore selection. Do not use the similarly named playtest-only parameter.
- [x] Test 100/110% zoom only while the effective game area remains at least 1280×720; record real zoom separately from emulated viewport size.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S08; S07 held-input/mode interaction; S05 reduced motion; S01 native startup.

Required variants: Message/choice HIDE; Tab and mouse restore; keyboard confirm/cancel; held then released input; 1280×720 and 1920×1080; normal/reduced motion; 100/110% zoom above minimum.

Invalidates/reuses: Provider settings, UI element bindings, input hooks, motion event branches or map/startup policy invalidate these observations. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-005, V-007, V-009, V-010 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Focus is visible and usable; HIDE cannot select invisibly; one gesture cannot confirm successive interactions; no walking/RPG menu or unread acceleration leaks. | `docs/qa/evidence/eventbridge-minimal-runtime/task-10/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. CE64/65 call Presentation InterfaceVisibility; MessageVisibility remains the actual toggle/window provider. Native Show Picture commands identify UI instances through BindInterfacePicture(picture, name). The binding resides on that native Game_Picture, is saved naturally and disappears with image replacement/erasure. Presentation contains no picture range, layout, hero list or campaign lookup. Native picture opacity and provider-computed visibility are preserved; narrative and temporary memorial portraits have no UI binding.

Removed Bridge's HIDE/input/Scene_Map/movement/ordinary-fast-forward overrides and obsolete choice-focus wrappers. Its unused invalid-campaign UI/freeze/notice window were removed with that block; task 14 still owns final residue/consumer audit. The retained one-gesture release gate, hidden-choice guard and provider integration exist once in Presentation. Credits retain their old semantic caller until task 13, with explicit native ConsumeInput calls on their current exit boundaries. ME lifecycle remains in Bridge only until task 12. Reduced motion continues through MotionPreference and authored final-position branches; no duration interception was introduced.

CoreEngine QoL NewGameCommonEventAll:num=4 executes configuration for ordinary sessions; playtest-only NewGameCommonEvent:num remains 0. CE4 uses native Change Menu Access Disable (135, parameter 0). Removed the old Map002 command that enabled the menu. Presentation parameters LockMovement/DisableEventAcceleration retain keyboard choices, provider FAST and native scrolling-text acceleration; no blanket menu override remains.

PASS: IT-001/025/026/027/038/055/065/077/078. Final native tests cover message and picture-choice HIDE, Tab/mouse restoration, held/released confirmation, Options, seen/unseen provider modes and memorial after UI separation. IT-078 proves a named UI picture at ID97 hides/restores with opacity83, while an unbound ID30 stays visible with opacity117. It observes visibility, world visibility, alpha, renderability, bitmap readiness and bounds; the same text remains open after restoration.

Desktop variants: 1280×720 normal at100%; 1920×1080 reduced at100%; 1920×1080 normal/reduced at110% real browser zoom. The latter has actual inner area1745×982, DPR1.1000000238 and visualViewport.scale1. Zoom is a temporary-profile ChromeZoomLevelPrefs default, separate from device-metrics viewport emulation. The preference format was confirmed against [Chromium source](https://raw.githubusercontent.com/chromium/chromium/main/chrome/browser/ui/zoom/chrome_zoom_level_prefs.cc). Captures at1280 and110% were visually inspected; both controls and restored text/pictures are visible. Creative acceptance and complete player journeys remain task16.

First failures retained: CE135's parameter1 enables menu; both the initial config edit and the old Map002 command used it. Read-only startup trace proved CoreEngine did reserve/execute CE4. Corrected parameter0 and removed the conflicting map command. The isolated HIDE fixture initially reused a paused closing message window, making its first capture misleading; it now cancels that fixture window through the native lifecycle and waits for the new message to be open. Final geometry/appearance captures and all four variants passed.

Evidence, raw failures, startup trace, fingerprints, current hashes, Chrome153.0.8010.36/Node22.23.2 metadata, images and actual viewport/zoom measurements: docs/qa/evidence/eventbridge-minimal-runtime/task-10/20260912/. These are isolated native integrations, not directed QA or human approval. No mixed-sensor V-ID or commit is closed by this result.

