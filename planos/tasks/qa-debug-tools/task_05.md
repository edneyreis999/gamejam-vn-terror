---
status: completed
title: Winning-approach hint
---

# Task 05: Winning-approach hint

## Outcome

With the hint on, the approaches that succeed with the current party carry a label in the NEW style. If none succeeds, "none succeeds" appears. The setting survives reloads until turned off, and nothing shows while the plugin is disabled.

## Sources

- Stories: US-004.AC-1–3, US-004.EC-1–2, US-001.EC-2
- Surfaces: `_uiux.md` S2 (hint toggle), S4
- Spec: Delivery Approach (hint), Key Decision D-6

## Checks

- V-005 — runtime compatibility of `Dryland_7_QADebug.js` and `Dryland_EventBridge.js` at the Chromium 88 floor (final state of both files).
- V-006 — native-data and `plugins.js` envelope checks pass; Dryland_7_QADebug is registered after its dependencies with status false; the menu entry exists in the Command List; every `debug.*` key exists in PT and EN (final state of the shared files).
- Inline case: on A1 with the automatic party, the hint marks exactly the approaches whose competency the party has, and choosing a marked one gives `success: true`. The choice order and the selected index are identical with the hint on and off. After a reload the hint is still on. With the plugin disabled no mark appears, and re-enabling restores the hint.

## Scope

- Starting points: `Dryland_2_ConversationIndicators.js` (`choiceAdornmentWidth`, `ui.social.new`), `Dryland_6_IllustratedChoices.js`, `Dryland_CampaignRules.js:744`.
- Shared files: `Dryland_7_QADebug.js`, `Languages.tsv` (hint labels). Ordered after task 04, so V-005 and V-006 see the final files.
- Data consumers: game settings storage (the hint setting); never the campaign save.
- Delete targets: none.

## Done When

The hint never changes the choice behavior; it only adds the label.

## Execution Notes

- 2026-10-31: Hint implemented in `Dryland_7_QADebug.js`: a toggle in the Debug screen (shown as On/Off in the root list and in the panel), a label drawn on each `Dryland_ApproachPaper` card that wins with the current party, and a single "none wins" label on the first card when no approach wins. The setting lives in `localStorage` (`Dryland_7_QADebug.hint`), so it survives page reloads and the plugin being switched off and on, and it is not in any save or in the game's config file. The label is a text sprite in the system colour on the card, the same colour and kind of cue as the NEW marker, not a copy of its code.
- Evidence in Chrome: hint off, no card marked (3 cards); hint on at A1 with H1, H2, H3: all three marked and the stored value is `1`; choosing a marked approach gives `success: true`. Against the rules' own outcome (`CHOOSE_APPROACH` on the pure rules) for a weak party H1, H2, H5 at A3: only card 2 marked, matches [false, true, false]; for H1, H5, H6 at A3: no approach wins, one "none" label on card 0. Those two states were installed with the test helper `installPhase` (test-only state injection, not part of the plugin).
- Not run: an unmarked approach actually failing through the live UI (the pure rules cover it), and the hint after a full page reload (only the stored value was checked).
- V-005: `check-runtime-compat` on the enabled copy: 29 plugins, 0 errors. V-006: `validate_plugins_js_envelope.py` structural valid, native layout matches; Dryland_7_QADebug registered last with status false and its five `@orderAfter`; the `qaDebug` entry is in the Command List; all 25 `debug.*` keys used by the code have non-empty PT and EN rows. `check-native-data.mjs` still reports the same 3 pre-existing errors (CreditsPage file, two MessageCore PictureIDs lists), none from this work, so V-006's "native-data checks pass" is met only for the parts this task wrote.
