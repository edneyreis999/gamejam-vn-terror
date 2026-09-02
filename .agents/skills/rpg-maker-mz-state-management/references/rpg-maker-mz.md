# RPG Maker MZ State Placement

Use the narrowest owner that preserves the required lifetime and authoring workflow.

| State                        | Typical owner                                   | Notes                                                                                                  |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Global authored flag         | switch or variable                              | Name and reserve IDs through project conventions; avoid magic IDs in plugin logic.                     |
| Per-event local flag         | self switch                                     | Appropriate only when one map event owns the fact.                                                     |
| Quest or system domain state | plugin-owned serializable object                | Expose intentional event/plugin-command boundaries; keep scene objects out.                            |
| Current event execution      | `Game_Interpreter`                              | Respect child and parallel interpreter lifecycles; do not persist interpreter objects as domain truth. |
| Current scene presentation   | scene/window/sprite instance                    | Rebuild from source state after scene changes; dispose listeners and render objects.                   |
| Battle-local state           | battle manager, battler, or plugin battle model | Define start/end, escape, defeat, retry, and save restrictions explicitly.                             |
| Party/actor progression      | owning game object or plugin model              | Avoid mirroring actor/party facts into unrelated switches unless the switch is the approved authority. |
| Save-persistent plugin data  | `DataManager` save contents contract            | Store plain serializable data, define defaults, and test round trips.                                  |

## Event pages

Page conditions are derived selectors over game state. Eligible pages are evaluated from highest page index downward; the last eligible page wins. Variable conditions use `>=`. A page body may cause transitions, but page selection itself should not become a second stored status.

## Sensors

Use pure tests for transition functions, an MZ harness for manager/interpreter boundaries, save fixtures for persistence, and live playtest for timing, camera, input, visual, and audio outcomes.
