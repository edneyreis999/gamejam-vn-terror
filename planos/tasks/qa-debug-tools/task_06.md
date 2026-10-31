---
status: pending
title: Build gate in prune-build and verify-build
---

# Task 06: Build gate in prune-build and verify-build

## Outcome

`npm run prune-build -- --apply` on an exported build with Debug enabled asks before keeping it. "N" and non-interactive runs disable it in the build only, unless `--allow-debug` is given. `npm run verify-build` reports the Debug status and accepts only that difference from the source.

## Sources

- Stories: US-006.AC-1–4, US-006.EC-1
- Surfaces: `_dx.md` Tools, Errors

## Checks

- V-001 — question only when Debug is enabled; none when it is disabled or absent.
- V-002 — "N" disables it in the build only, prunes its file, leaves other entries and the source unchanged.
- V-003 — "s" keeps it; verify-build accepts and reports both statuses, and still fails on any other difference.
- V-004 — non-interactive default and `--allow-debug`.
- Reused: `node --test rpg-maker/tests/*.test.mjs` stays green; the prune and verify behavior for builds without Debug is unchanged.

## Scope

- Starting points: `rpg-maker/tools/prune-build.mjs` (`keep()`, `--apply`), `rpg-maker/tools/verify-build.mjs:50-53`, `rpg-maker/tests/README.md`, `rpg-maker/tests/test-manifest.json`.
- Test infrastructure: V-001–V-004 need disposable exported-build fixtures with a Debug entry, and a scripted answer to the question. Create or extend them through `game-test-infrastructure` in this task. Fixtures never overwrite the source game or `dist/`. Register the new checks in the manifest.
- Shared files: none with tasks 02–05. It only needs the plugin name `Dryland_7_QADebug`, so it does not wait for the plugin code.
- Delete targets: none.

## Done When

Running the gate against a real `dist/` is not required; the fixtures prove it.

## Execution Notes
