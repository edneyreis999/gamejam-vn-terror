# RPG Maker MZ plugin contracts

## Plugin file

Keep these surfaces coherent:

- filename and exact runtime plugin ID;
- English RPG Maker MZ metadata header;
- `@param`, struct, default, option, and parent declarations;
- `@command` and `@arg` declarations;
- `PluginManager.registerCommand` namespace and command IDs;
- any declared `@base`, `@orderAfter`, or `@orderBefore` relations.

Metadata expresses a public editor contract. It does not prove that a plugin is
active, that an optional integration exists, or that the project uses a header
default.

## `js/plugins.js`

Treat the file as a JavaScript data envelope containing ordered plugin records.
For the target record, preserve:

- exact `name`;
- `status`;
- `description`;
- the complete `parameters` object;
- the relative order of unrelated records.

Parameter values can contain recursively serialized JSON strings. Decode only
the layers needed for the target value and re-encode every layer with the shape
expected by the plugin.

## Change checks

Before writing, confirm the target record is unique and the expected old value
still exists. After writing, parse the envelope again, confirm that unrelated
records are unchanged, and verify plugin syntax separately when code changed.

Materialized mutation scripts should receive explicit source and destination
paths, fail closed on stale preconditions, and report the exact record or file
they changed.
