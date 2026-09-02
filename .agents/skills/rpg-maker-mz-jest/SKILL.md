---
name: rpg-maker-mz-jest
description: Tests RPG Maker MZ JavaScript with Jest while preserving engine lifecycles and observable behavior. Use when adding or reviewing unit, integration, plugin-command, event, save/load, or harness tests. Don't use as proof of visual, audio, timing, or player-experience quality.
---

# RPG Maker MZ Jest

Use Jest as a logic sensor, not as a substitute for the game runtime.

## 1. Discover the project contract

Read `AGENTS.md` and the nearest scoped instruction file. Inspect `package.json`, the Jest configuration, test setup, and existing suites before choosing commands or placement. Prefer project-declared scripts and transforms. Read [Jest operations](references/jest-operations.md) in full when configuring, filtering, mocking, isolating modules, controlling time, or diagnosing the runner.

Done when: the command, environment, owning suite, and loaded MZ shims are known.

## 2. Choose the strongest test boundary

- Keep pure rules pure: quest predicates, rewards, state transitions, serialization, and plugin-parameter parsing.
- Test plugin commands through `PluginManager.registerCommand` and preserve the caller interpreter as `this`.
- Test event behavior with page selection, refresh, transfer, battle, party, scene, and interpreter lifecycle represented.
- Test save compatibility through `DataManager`-shaped extraction and restoration, including absent or older fields when the project contract requires them.
- Mock only the engine boundary the test cannot own. Prefer small behavioral fakes over a second implementation of RPG Maker.

Read [the MZ harness contract](references/mz-harness.md) in full when a test touches engine globals, event pages, interpreters, saves, scenes, input, rendering, or audio.

Done when: the invariant, owning layer, and required runtime follow-up are explicit.

## 3. Write the test

Arrange the minimum engine state, trigger behavior through the public plugin or game boundary, and assert player- or author-visible outcomes. Control clocks and randomness explicitly. Restore patched globals and prototypes after every test.

Done when: the test fails for the intended defect and passes for the intended behavior without depending on order.

## 4. Run and interpret

Run the narrow project command first, then the broader affected suite. Treat open handles, leaked globals, order dependence, and silent console errors as failures. Record which claims still require runtime or human evidence in `planos/tasks/<slug>/verification.md`.

Done when: fresh output supports only the claims assigned to Jest and every remaining claim has another sensor.
