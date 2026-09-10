---
name: rpg-maker-mz-plugin-workflow
description: Create, edit, configure, activate, or reorder RPG Maker MZ plugins. Use for plugin JavaScript, RPG Maker plugin metadata, PluginManager commands, js/plugins.js, serialized parameter structs, activation flags, exact plugin IDs, required plugins, load order, or materialized plugin mutation scripts.
---

# RPG Maker MZ plugin workflow

Work from the installed plugin and the active `js/plugins.js` entry.

- Keep the filename, exact plugin ID, metadata, command registration namespace,
  and configured entry coherent. A display name is not necessarily the runtime
  identifier.
- Parse `js/plugins.js` structurally. Nested structs and arrays are commonly
  serialized as JSON strings inside parameter values; preserve every required
  serialization layer.
- Separate required plugins, optional feature requirements, compatibility,
  `orderAfter`, and actual list order. Change only the relation the task needs.
- When authoring code, preserve the public RPG Maker MZ plugin contract and
  avoid depending on a consumer-specific path, database ID, or asset unless the
  task explicitly owns it.
- Materialize the transformation script near the active task, spec, or plan.
  It validates the target entry and preconditions, performs the focused change,
  and checks the resulting plugin file or configuration.

Load [plugin contracts](references/plugin-contracts.md) when editing metadata,
commands, activation, ordering, or serialized parameters.
