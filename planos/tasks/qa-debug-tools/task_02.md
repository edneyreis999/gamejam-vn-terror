---
status: completed
title: Debug screen and "Go to trap → A1" (pilot)
---

# Task 02: Debug screen and "Go to trap → A1" (pilot)

## Outcome

With Dryland_7_QADebug enabled, the QA tester opens ☰ → Debug in the tavern and sees the state panel. They choose Go to trap → A1, confirm, and land on the Bottled Saci trap as the first church encounter with an automatic party. The landing point is saved, Continue resumes there, and the same request gives the same seed. With the plugin disabled, the game is the default game.

## Sources

- Stories: US-001.AC-1–3, US-001.EC-1, US-002.AC-1–5 (A1 only), US-002.EC-1, US-002.EC-2, US-002.EC-4, US-005.AC-1–2
- Surfaces: `_uiux.md` S1, S2 (panel and a Go to trap list holding A1), S3; `_dx.md` Golden Path, Editor Settings and Commands
- Spec: Delivery Approach (menu entry, custom code, EventBridge seam, landing, seed search), Programming Responsibilities, Known Risks (landing fidelity, menu reachability)

## Checks

- Inline case (runtime compatibility): the runtime-compat check (`node .claude/skills/rpg-maker-mz-best-practices/scripts/check-runtime-compat/run.mjs "rpg-maker/The Dryland Drowned"`) reports no findings for `Dryland_7_QADebug.js` and `Dryland_EventBridge.js`.
- Inline case (native data): `check-native-data.mjs` and `validate_plugins_js_envelope.py` pass on the project after the `js/plugins.js` writes.
- Inline case (boot): with the plugin enabled and then disabled, the game boots in Chrome through `npm start` to the title screen with an empty console. NW.js is excluded under the local runtime exception; do not report it as verified.
- Inline case (pilot): plugin enabled → New Game → tavern → ☰ → Debug → Go to trap → A1 → Confirm. Then: phase `encounter_intro`, encounter A1 at church position 1, a party of 3 living heroes, `validateState` ok, autosave written. After a reload and Continue, the A1 opening shows again. Repeating the jump gives the same seed. Cancel leaves the campaign and its save unchanged.
- Reused: the maintained suite (`node rpg-maker/tools/run-tests.mjs`) shows no failure beyond the baseline recorded in task 07's Execution Notes; the EventBridge change must not alter BEGIN, checkpoints or saves without the Debug plugin.

## Scope

- Starting points: `Dryland_EventBridge.js:481-495`, `:546-548`, `:394-400`; `Dryland_CampaignRules.js:661-746`; `data/CommonEvents.json` CE3, CE40, CE44; `data/Map007.json` event 1; `rpg-maker/tests/helpers/campaign.mjs` (legal-replay pattern); `coreto/docs/extensoes.md`.
- Creates `rpg-maker/The Dryland Drowned/js/plugins/Dryland_7_QADebug.js`. Changes `Dryland_EventBridge.js` (two public entries: apply a validated action, BEGIN with a supplied seed).
- Shared files: `js/plugins.js` (new entry with status false, after its dependencies; Debug command in `Coreto_1_MainMenuCore` → Command List) and `Languages.tsv` (`debug.*` keys for the screen, panel and confirmation). Tasks 03–05 write them after this one.
- Data consumers: the engine; the editor's Plugin Manager (close the editor before writing `js/plugins.js`, reopen it afterward); `prune-build`/`verify-build`; the canonical suite.
- Menu reachability: confirm whether the Settings route in conversations reaches the menu. Record the finding in Execution Notes and report it to the user; add no other entry without their decision.
- Delete targets: none.

## Done When

The landing works for A1 without depending on the editor or a manual save step, and Execution Notes record the landing mechanism actually used, so tasks 03 and 04 reuse it.

## Execution Notes

- 2026-10-31 (design correction found in task 07): IT-031 pins `Object.keys(DrylandEventBridge)` to a fixed list in the shipped game, so the spec's "two public entries on the EventBridge" would fail it with the plugin disabled and would expose an action/seed API in the normal game. Use instead the existing command path (`PluginManager.callCommand(interpreter,'Dryland_EventBridge','Action',…)`, which is what events use) and a non-API seed hook read only at BEGIN. Record the final choice here and amend the spec's Delivery Approach.

- 2026-10-31 implementation:
  - New `Dryland_7_QADebug.js` (disabled in `js/plugins.js`, `@orderAfter` the five dependencies). Menu entry `qaDebug` added to `Coreto_1_MainMenuCore` Command List before `gameEnd` (parameter change only; visible only when `DrylandQADebug` exists). `debug.*` keys in PT/EN added to `Languages.tsv`.
  - Seam (final form, replaces the spec's two public entries): no change to the EventBridge public API. `BEGIN` now reads an optional seed left in `$gameTemp._drylandBeginSeed` (`Dryland_EventBridge.js`, 4 lines); without it the clock decides as before. Actions go through the existing `CaptureContext` / `ReadingComplete` / `Action` commands, as events do.
  - Landing mechanism (for tasks 03, 04): `DataManager.setupNewGame()` in the current save file (`savefileId` preserved), replay the planned actions up to phase `dungeon_intro` with no pending reading, reserve a transfer to the trap's map (found by map name in `$dataMapInfos`), `SceneManager.clearStack()` + `goto(Scene_Map)`. The trap map's own autorun event calls CE40, which does `ENTER_DUNGEON` and the `reveal` checkpoint (autosave). The save point is therefore the game's own, not a debug write.
  - Seed search: seeds tried in ascending order from 0 with the pure rules; the first whose first draw on the route is the trap wins. A1 → seed 7, B5 → seed 6 (party chosen as the first three heroes whose competencies win at least one approach).
  - All 16 traps are listed already (generic code); only A1 and B5 were exercised in this task, the rest belongs to task 03's checks.
- Evidence (disposable copy `…/scratchpad/devgame` = source tree with the plugin enabled; scratch tests deleted with the scratchpad, not kept):
  - Chrome, New Game → tavern → Debug → Go to trap: Cancel leaves the campaign byte-equal; A1 → map 7, `phase=encounter_intro`, position 1, `assignments.physical[0]=A1`, party H1,H2,H3, `validateState` ok, persistence `saved`, `file1` holds the same seed and phase; Continue resumes on map 7; repeating the jump from mid-campaign gives the same seed (7); B5 → map 19, seed 6, `validateState` ok. The menu lists `qaDebug:Debug` between Load and Quit.
  - Plugin disabled (source tree as delivered): `typeof DrylandQADebug` is `undefined`, the menu has no Debug command, the engine error printer is empty.
  - `check-runtime-compat/run.mjs` on the enabled copy: 29 plugins, 0 errors (it only scans enabled plugins, so the source tree alone does not scan this one). The tool needed `npm ci` in its own directory (node_modules is gitignored).
  - `check-native-data.mjs`: 3 errors, all pre-existing and unrelated (VisuMZ_4_CreditsPage file missing; two `VisuMZ_1_MessageCore.PictureIDs` number lists in CommonEvents.json). `validate_plugins_js_envelope.py`: structural valid, native layout matches.
- Found while testing: opening the Debug screen while a tavern choice is still pending, then closing it, crashes in `Dryland_Presentation.js:232` (`this._list` undefined with a remembered choice focus). It reproduces with the native Scene_Menu too (push then pop) and is not reached by the real ☰ path, where the message is cleared first. Not changed here; recorded as a follow-up.
- Not verified here: NW.js (excluded by the local runtime exception); the real ☰ click path and the Settings route in conversations (planned for the QA sessions, PT-001/PT-004).
- Regression (`run-tests.mjs --scope all`, 5 workers/5 browsers; 108 pass): no deterministic failure beyond the baseline of task 07; IT-031 now passes (fixed in task 07). Under load IT-038, IT-064, IT-065, IT-080 and the already-flaky IT-061, IT-083, IT-084 failed once; rerun in isolation with 4 workers they all pass (7/7), so they are load instability, not regressions. Running the full suite with other Chrome sessions open took 13.5 minutes instead of about 6.
