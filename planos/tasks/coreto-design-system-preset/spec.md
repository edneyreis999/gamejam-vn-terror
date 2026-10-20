# Portable Coreto design system

Approved in the implementation conversation on 2026-10-19. This incremental delivery preserves the installed 1.2.0 appearance while moving supported rendering responsibilities to provider parameters.

## Contract

- Only Coreto_5_DesignSystem.js may change among installed Coreto plugin sources. The engine, other plugins and coreto/ stay unchanged.
- Ship game-coreto-eng-design-system with its parameter CLI, preset applicator, recipes, images, fonts and licenses. The applicator writes parameters only through CLIs; the DesignSystem CLI owns its one registry entry.
- Preflight all dependencies before changes. Require installed, enabled compatible plugins. Preserve game content, language lists, handlers, unrelated parameters and plugin order.
- Support preview, parameter/asset backups, recovery and idempotent reapplication. Missing dependencies fail before mutation.
- Move option/save drawing into focused provider callbacks; retain capabilities without equivalent public parameters in DesignSystem. Remove configuration extraction from JavaScript source strings.
- Preserve current visuals and keyboard/mouse behavior. Do not approve screenshots without inspecting them.

## Verification

Capture before/after in Chrome at 1280x720, DPR 1, English, using public player input. Observe title, options, saves, dialogue, choices and picture surfaces; synchronize animations and input states. Preserve the original failure if a run fails. No campaign state injection or external saves. Gamepad and zoom tests are excluded by ADR-G005/G003; group expensive journeys per G006.

CLI tests protect project configuration from corruption, unrelated overwrites, stale writes and partial preflight failure. A second project fixture checks portability and reapplication. Screenshots are delivery evidence, not a permanent appearance unit-test suite.

## Devlog

Demonstrate applying the portable preset, then show the same Options screen before and after removing the old rendering functions. Pair the images at identical size; show the CLI's unchanged second application.

Progress and evidence belong to verification.md. Existing .coreto-project.json edits are outside this delivery.
