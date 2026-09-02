# RPG Maker MZ Harness Contract

Load only the engine surface the invariant crosses.

## Globals and registration

- Capture plugin-command registrations and invoke handlers with a realistic `Game_Interpreter` caller.
- Install `$data*`, `$game*`, managers, scenes, windows, sprites, `Graphics`, and `PluginManager` before importing code that reads them at module load.
- Reset modules only when module initialization is part of the contract; otherwise isolate state through explicit setup.
- Restore prototype aliases exactly. A test that leaves an alias installed contaminates later suites.

## Event lifecycle

- Eligible pages are evaluated from highest page index to lowest; the last eligible page wins.
- Variable page conditions compare with `>=`.
- Parallel events own interpreters whose start, wait, refresh, termination, and restart behavior matters.
- Exercise boundaries named by the spec: map refresh, transfer, battle start/end, party changes, save/load, and scene changes.

## Rendering, input, and audio

Jest may assert commands, state, calls, cleanup, and deterministic geometry. It does not prove perceived timing, final canvas composition, control feel, camera comfort, or audible quality. Assign those claims to runtime capture or human playtest.

## Saves

Assert round-trip state, defaults, version handling required by the project, and independence from transient scene objects. Use fixtures owned by the canonical save suite rather than copying whole save blobs into feature tests.
