---
name: rpg-maker-mz-project-inventory
description: Inspect an RPG Maker MZ project without modifying it. Use when locating the project root, engine files, data directories, plugins.js, active plugin order, exact plugin IDs, assets, save surfaces, database objects, maps, Common Events, or the smallest evidence needed before RPG Maker MZ analysis or implementation.
---

# RPG Maker MZ project inventory

Inspect only the surfaces needed by the task.

- Confirm the project root from `game.rmmzproject` and the adjacent runtime
  layout; do not infer it from a documentation or staging directory.
- Treat `js/plugins.js` as structured JavaScript data. Record exact plugin IDs,
  active flags, order, and relevant configured parameters. Display names and
  filenames can differ.
- Locate the precise database objects, maps, Common Events, assets, plugin
  files, and save-related surfaces touched by the request. IDs and paths are
  project evidence, never portable defaults.
- Distinguish installed, active, ordered-after, required, and optionally
  integrated plugins. None of those relations implies the others.
- Prefer focused evidence over a full-project catalog. Expand inspection only
  when the current fact cannot resolve ownership, callers, dependencies, or
  write targets.

Use `scripts/validate_plugins_js_envelope.py` as an optional parser check when
the plugin list is ambiguous; it is not a mandatory workflow.

Load [the inventory surfaces reference](references/inventory-surfaces.md) only
when the project layout or evidence source is unclear.
