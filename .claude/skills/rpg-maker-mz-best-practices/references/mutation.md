# MZ Data and Plugin Mutation

Read when a task changes `data/*.json`, event command lists, plugin parameters, or `js/plugins.js` by script.

## Authored-data mutation contract

Read the [native data shapes](data.md) first: they say what you must write (number lists, retired slots, the start position). A script that edits authored game data is one-shot: run it, verify the result, and delete it in the same task, wherever you kept it, unless the user asked to keep it. It follows the procedure below.

Maintained builders that write only disposable test fixtures follow [runtime test execution](runtime-test-execution.md) for their lifecycle; they remain reusable and never apply their fixture writes to the authored project. Native data shapes and the event/plugin rules below still apply to their outputs.

1. Name the source file and the destination explicitly.
2. Parse first. Prove that the expected record and its old value exist before writing; fail closed, writing nothing, when they do not.
3. Change only the target. Write in the file's existing style and keep every other byte; unexplained formatting churn counts as a failed edit.
4. Re-parse the written file from disk and verify the postconditions. Report the exact records changed.
5. Make it idempotent: a second run changes nothing.
6. Run it on a disposable copy first, then on the project, then run `node scripts/check-native-data.mjs <project-root>` and `node scripts/check-event-lists.mjs <project-root>`. Findings that already existed before your change are not yours: report them, do not fix them.
7. Delete the script.

Allocate new IDs from the current checkout, never from a plan or an earlier snapshot.

## Event command lists

A command is `{ code, indent, parameters }`. The list is one flat array.

- The list ends with `{ code: 0, indent: 0 }`.
- Indent never drops below 0 or rises by more than 1 between neighbors. A branch body is one level deeper than the command that opens it.
- Blocks pair at the same indent: `111` with `411` (else) and `412`; `102` with `402`, `403`, and `404`; `112` with `413`; `301` with `601`, `602`, `603`, and `604` when a result branch exists. A `404` without its `102`, or a block never closed, is a defect.
- Continuation rows follow their opener: `401` after `101`, `405` after `105`, `408` after `108`, `655` after `355`, `657` after `357`. A `357` plugin command may have no `657` row; when present it is adjacent.
- `119` jumps to a label some `118` in the same list defines.
- `121` Control Switches takes `[start, end, operation]`; a single switch is `[id, id, op]`, and `start > end` is inverted.
- `117` calls an existing, non-retired Common Event.
- `241`, `245`, `249`, and `250` need their file under `audio/bgm`, `bgs`, `me`, or `se`. JSON parsing proves none of this.
- `201` Transfer Player does not stop the running event; the commands after it run on the destination map.

`node scripts/check-event-lists.mjs <project-root>` enforces these over Common Events, map events, and troops.

## Plugin parameters and `plugins.js`

- Decode only the layers a change needs, and re-encode every layer. A struct parameter is a JSON string; its fields may hold further JSON strings.
- Preserve every string layer and key suffix (`:struct`, `:arraynum`, `:eval`) exactly.
- A plugin command is code `357` with `[pluginName, commandName, displayText, args]`; its `args` follow the same type rules as plugin parameters.
- Keep the plugin filename, its exact `name` in `plugins.js`, its header, its command namespace, and its load order consistent. A display name is not the runtime identifier.
- Parse `plugins.js`; never execute it or read it as text.
