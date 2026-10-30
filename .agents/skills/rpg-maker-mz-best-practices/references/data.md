# MZ Native Data Shapes

Read when a task or spec writes, migrates, or transforms `data/*.json`, plugin parameters, or `js/plugins.js`, or promises content the editor must still open.

Valid JSON is not the same as data the editor shows. The editor and the engine read the same files with different tolerance, so a file can load in the game and still look empty or broken in the editor. Verify a structural change in both.

## Shapes

- **Databases addressed by position** (`Actors`, `Animations`, `Armors`, `Classes`, `CommonEvents`, `Enemies`, `Items`, `Skills`, `States`, `Tilesets`, `Troops`, `Weapons`): index 0 is `null`, and every other slot is an object whose `id` equals its index. Never reorder them or reuse indexes from an earlier snapshot: allocate new IDs from the current file when the change runs.
- **`CommonEvents.json` has no `null` at index above 0.** A retired slot is a native empty record, `{ "id": i, "name": "", "trigger": 0, "switchId": 1, "list": [{ "code": 0, "indent": 0, "parameters": [] }] }`. A `null` there makes the editor's Common Events list appear empty even though the game runs (observed on macOS; the editor's internals were not inspected). Do not generalize the replacement to other files: map event slots are different, and `MapInfos.json` legitimately holds `null` for deleted maps. A call to a retired Common Event is a defect.
- **`System.json`.** `startMapId` names a map in `MapInfos.json` with its file, and `startX`/`startY` are inside it. It is never the title map: New Game would re-enter the title. `switches` and `variables` hold strings only; a `null` gap crashed a save system. Without a title-map plugin the title is a scene, not a map, and the title-map check does not apply.
- **Number-list parameters** (`@type number[]`, or a key ending `:arraynum`) are stored the way the editor writes them: a JSON array of string items, `["5"]`. A script that writes `[5]` produced a game that crashed; decoders should tolerate both, but written data uses the string form. A project can hold both forms: never copy a number list from a neighboring command, rewrite it as strings. The rule follows the declared type, never the shape of the string: an `:eval` value such as `"[0,0,0,0]"` is legitimately unquoted.
- **Nested parameters.** Struct and array-of-struct parameters are JSON strings inside the parameter string, possibly several layers deep. An empty string is a valid default.
- **`js/plugins.js`** is structured data: one `var $plugins =` line, then `[` on the next line, then the entries. A file with the same structure in a different layout was rejected by the editor. It is parsed, never executed.
- **The editor rewrites `js/plugins.js` and `CommonEvents.json` when it opens or saves a project**, and an open editor overwrites external writes with its own copy. Reopen the editor after an external write, and restore a rewrite you did not intend before handing the diff over. Do not bundle editor saves into an unrelated change.

## Sensors

All read-only. Run from the skill directory; each exits 0 clean, 1 on findings, 2 when the project cannot be read.

| Command | Checks |
| --- | --- |
| `node scripts/check-native-data.mjs <project-root> [--title-map <id>]` | Database shapes, `System.json` start position and name tables, map files, plugin files, number-list and nested parameters in `plugins.js` and in plugin commands. An unverified deviation is a warning, a deviation known to break the editor or the game is an error. |
| `node scripts/check-event-lists.mjs <project-root>` | Event command grammar in Common Events, map events, and troops (see the mutation reference). |
| `python3 scripts/validate_plugins_js_envelope.py <project-root>/js/plugins.js` | The structure of `plugins.js` and, separately, its native layout. A structural pass alone does not prove the editor opens the file. |

These checks run in milliseconds. Run them after every change to data, `plugins.js`, or a plugin's parameters, including a change made by hand in the editor. They cover shape, not whether the editor screen opens: after a structural data change, open the affected screen (Database, Plugin Manager, the map), on a disposable copy first.
