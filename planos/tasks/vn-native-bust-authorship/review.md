# Independent implementation review

Verdict: **SHIP (code review)**. Two actionable defects found in the first snapshot were corrected and inspected in the second snapshot. This verdict does not replace the remaining runtime checks in `verification.md` or constitute visual/art approval.

Reviewed against `spec.md` and `adrs/adr-001.md`, with base commit `3513a0f925ff101a759723537e764a8dc407ae67`. The reviewer changed only this report. Production and test corrections were made by the implementing agent during the review; the hashes below distinguish the snapshots.

## Findings and resolution

1. **P1 — Preserve the invalid-campaign interpreter barrier. Resolved.** Removing the focus initialization alias also removed its unrelated `_drylandInvalid` guard. A command that detects invalid campaign state could therefore return into the native interpreter loop and execute subsequent event commands in the same frame, before `Scene_Map.update` displays the error surface. The final `Game_Interpreter.prototype.executeCommand` alias now retains that guard and its `_drylandErrorPresentation` exception, without restoring any focus behavior. The implementing agent is running the relevant diagnostics regression.

2. **P2 — Include trailing visuals from inherited completed sections. Resolved.** `section(source)` previously stopped before the source's final text command. A valid `Basic_GraphicChange` placed after the final `profile.H1` text and before `@dryland-end` was accepted and played natively, but omitted from `speech.H1` restoration. A read-only, in-memory reproduction returned `violations: []` and `tailInRecovery: false`. The final implementation extracts the full inherited source while keeping the selected current section bounded by its text box. Repeating that reproduction now confirms both `inheritedSourceIncludesTail: true` and `currentBoxExcludesFutureTail: true`. The implementing agent added the same trailing-graphic case to IT-067 for real Continue coverage.

No other actionable defects were established in this bounded review. An initial concern about zero-duration absolute transforms followed by relative scaling was rejected after the implementing agent reported the full IT-069 native-browser result: mirrored scale 73% followed by +7 produced -80% X / 80% Y in native playback, Options restoration and compatible Continue.

## Coverage

- EventBridge metadata and registration: obsolete visual style parameters and Focus command removed; native command argument values and picture IDs no longer pass through a visual whitelist. Campaign and event-graph structural checks remain separate.
- Restoration extraction: native helper expansion, branch indentation, inherited source recursion, cycle rejection, current-text boundaries and omission of text, choices, waits and campaign commands inspected. Source-tail behavior independently reproduced before and after correction without changing project files.
- Runtime lifecycle: vendor command delegation, cloned argument payloads, bitmap readiness, reduced durations, one-shot animation suppression, zero-duration auto-erase, actual `showPicture` ownership, cancellation, scene return, Continue and partial-skip routing inspected. Installed vendor help and native interpreter contracts were consulted; no vendor code was modified.
- Data migration: native shared focus helpers, tavern/council allocation, single-character focus removal, native command IDs and parameters, unchanged narrative-command assertion, plugin configuration cleanup and manifest revision inspected. No art or vendor changes are present in this scope.
- Tests/tooling: changed canonical content and native-controls cases, fixture migration, fixture isolation and CLI configuration validation inspected. IT-069 exercises actual vendor effects and compares resulting composition, with assertions for arbitrary-ID cleanup and unchanged campaign state; it is not only an extraction snapshot test.

## Limits

The reviewer did not launch a second browser suite or inspect final screenshots. Runtime outcomes explicitly attributed to the implementing agent are not independent playtest evidence. Continuous animation phase, mid-animation snapshots and historical expression evaluation are excluded by the accepted ADR; pure vendor expressions are reevaluated. Remaining runtime results and visual acceptance belong in `verification.md`.

## Fingerprints

SHA-256 paths are relative to the repository root. These identify the reviewed files even if later verification edits change the working tree.

| File | First snapshot | Final inspected snapshot |
| --- | --- | --- |
| `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js` | `3990ecc582843099ff890e16b2bb5778f7724a03df8cec7e7e487cf539207d87` | `b7db900e711864b365fb7b7cb5a47c7335c1c97ae2a847c589fbca21adb0cfbb` |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | `f49bcfb35b37804e620ee6201629582bdcedbd50130629db6d5cbdc1d30b7fc2` | unchanged |
| `rpg-maker/tools/validate-content.mjs` | `869ee4905eabd9d533e5629bdfdf90a7642aaeb5e4a388e4a05d92bf1ee774b4` | unchanged |
| `rpg-maker/tests/suites/content.mjs` | `e12ad8f87876a8c804cc9a4e2ecdce9f68b80b4ac8b2c1e8154616e30a1400c6` | `dedabd89bc781abe0a466a13b4327ff9d754cda0a90b84ca080d8f31c00e97fd` |
| `rpg-maker/tests/suites/native-controls.mjs` | `b5f10d40946b589288672c0d2f6fe8ba3b5d3813067f38e0ab8e862cd11ae1ed` | unchanged |
