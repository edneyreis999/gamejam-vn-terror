# RPG Maker MZ Testing

Map each invariant to the lowest sensor that can observe its failure.

## Test boundaries

- Pure unit: predicates, state transitions, reward calculations, parsing, deterministic serialization.
- Plugin integration: `PluginManager` metadata, parameters, load order assumptions, command registration, caller `this`, aliases, and cleanup.
- Event harness: page eligibility and priority, variable `>=`, interpreter ownership, waits, refresh, transfer, battle, party, and scene boundaries.
- Save suite: extraction, restoration, defaults, compatibility required by the project, new game, and transient-state exclusion.
- Scene/PixiJS harness: deterministic geometry, construction, update, destruction, listener cleanup, and manager calls.
- Live playtest: final rendering, animation timing, camera, control feel, audio, narrative pacing, and player comfort.

## Mocks

Mock the narrow engine boundary, not the behavior under test. A useful MZ fake records calls and models only the contract needed by the invariant. It does not recreate `Game_Interpreter`, `DataManager`, `SceneManager`, or PixiJS broadly enough to become a second engine.

Reset global objects, prototype aliases, module registries, fake time, random seeds, and listeners after every test. Test-order dependence is a defect.

## Evidence

Require a pre-change failing signal for regressions. A passing Jest suite cannot satisfy a criterion assigned to playtest or human judgment. Record that distinction in `planos/tasks/<slug>/verification.md`.
