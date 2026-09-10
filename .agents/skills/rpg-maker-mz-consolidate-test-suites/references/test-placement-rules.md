# RPG Maker MZ Test Placement Rules

Choose the lowest layer that can observe the invariant without reimplementing its owner.

| Invariant                                                                           | Canonical layer                           |
| ----------------------------------------------------------------------------------- | ----------------------------------------- |
| Pure predicate, parser, state transition, reward calculation                        | unit suite beside the owning module       |
| Plugin metadata, parameter parsing, command registration or caller context          | plugin integration suite                  |
| Event-page selection, interpreter wait/refresh/restart, transfer or battle boundary | event-lifecycle harness suite             |
| Database IDs, references, schema or authored JSON consistency                       | data validator suite                      |
| Save extraction, restoration, defaults or compatibility                             | canonical save suite with shared fixtures |
| Scene/window/sprite cleanup or deterministic geometry                               | scene/PixiJS harness suite                |
| Final composition, animation timing, camera, input feel or audio                    | QA scenario and playtest evidence         |

Prefer an existing suite even when a new file would be easier. A new suite is justified only when no current owner can express the invariant without crossing a layer boundary.
