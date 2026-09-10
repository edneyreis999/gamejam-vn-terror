# RPG Maker MZ inventory surfaces

Use the smallest surface that can answer the current question.

| Question | Primary evidence |
| --- | --- |
| Is this an RPG Maker MZ project? | `game.rmmzproject`, `data/System.json`, adjacent `js/` and `data/` |
| Which plugins are active and in what order? | Structurally parsed `js/plugins.js` |
| What contract does a plugin expose? | The installed plugin header and public help |
| Which database object owns an ID or note? | The corresponding `data/*.json` object |
| Who calls a Common Event? | Database effects, map/troop command lists, plugin configuration, and keys used by the project |
| Which page owns event behavior? | Map event note, active page conditions/comments, and the page command list |
| Does an asset exist with the required case? | The project asset directory used by the active configuration |
| Is state save-local or cross-save? | Save plugin configuration, save payload ownership, and global storage surfaces |

## Relationship vocabulary

- **Installed**: the plugin file exists.
- **Active**: its `js/plugins.js` entry has an enabled status.
- **Required**: the plugin declares or documents another plugin as necessary.
- **Ordered**: the list or metadata places one plugin before or after another.
- **Optional integration**: an additional feature appears only when another
  plugin is present.
- **Domain steward**: one skill owns the documentation for a surface. This is
  never evidence of a runtime dependency.

Do not use `@orderAfter` alone as proof of a required plugin. Do not treat a
catalog or documentation directory as proof that a plugin is installed.
