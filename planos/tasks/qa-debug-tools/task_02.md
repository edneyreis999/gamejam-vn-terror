---
status: pending
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
- Reused: `node --test rpg-maker/tests/*.test.mjs` stays green; the EventBridge change must not alter BEGIN, checkpoints or saves without the Debug plugin.

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
