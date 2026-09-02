# Jest Operations for an MZ Project

Use the repository's package-manager script. Append Jest options through that script rather than assuming a global binary.

## Narrow runs

- Run one owned file with `--runTestsByPath <path>` when the project script does not already select it.
- Filter a case with `--testNamePattern <pattern>`.
- Use `--runInBand` for shared MZ globals, deterministic lifecycle suites, or diagnosis; do not make serialization a permanent cure for leaked state.
- Use `--detectOpenHandles` to diagnose leaked timers, listeners, processes, or handles. Fix their owner afterward.
- Use `--coverage` only when coverage is part of the claim. Read the repository's provider, collection paths, ignores, and thresholds first.

## Configuration

Keep transform, aliases, roots, environments, setup files, and test matching aligned with the actual source pipeline. When a project compiles TypeScript with SWC, use its existing `@swc/jest` transform and alias map; when it does not, preserve its declared transformer. Do not introduce a second compiler path for tests.

Place stable engine setup in the existing `setupFiles` or `setupFilesAfterEnv` contract only when every owning suite needs it. Prefer suite-local setup for narrow MZ globals.

## Modules and mocks

- `jest.mock()` is hoisted. Use its factory deliberately and avoid reading variables that are not safe at hoist time.
- Use `jest.spyOn()` when the real object and method contract matter; restore the spy after the test.
- Use `jest.resetModules()` or `jest.isolateModules()` only when module initialization or registration is the invariant.
- Use `jest.clearAllMocks()` to clear call history, `jest.resetAllMocks()` to reset implementations, and `jest.restoreAllMocks()` to restore spies or replaced properties. Choose the narrowest operation.
- Prefer dependency injection for clocks, randomness, and IO in pure domain code. At engine boundaries, patch the smallest global and restore it exactly.

## Time and randomness

Use `jest.useFakeTimers()`, explicit clock advancement, and `jest.useRealTimers()` cleanup for deterministic timer behavior. Fake timers prove scheduled logic, not perceived animation or cutscene pacing. Seed or inject randomness when exact outcomes are asserted.

## Test shape

Use `describe` for one owning behavior, `test`/`it` for one observable outcome, hooks for deterministic setup and cleanup, `test.each` for the same invariant across meaningful cases, and explicit assertions over broad snapshots. Keep `.only` out of completed work and justify `.skip` as an owned gap.
