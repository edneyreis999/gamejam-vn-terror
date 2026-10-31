---
status: pending
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
