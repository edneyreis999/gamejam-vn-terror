---
name: rpg-maker-mz-data-json
description: Safely inspect and modify RPG Maker MZ data JSON. Use for database objects, note fields, maps, map events, troops, Common Events, event command lists, IDs, references, structured JSON transformations, focused diffs, or materialized mutation scripts for RPG Maker MZ data.
---

# RPG Maker MZ data JSON

Treat `data/*.json` as structured engine data, not editable text.

- Parse and serialize JSON. Preserve null slots, object IDs, array positions,
  cross-references, note strings, and untouched ordering or formatting where
  the project relies on them.
- Resolve the target object and its callers before changing an ID, reference,
  Common Event, map event, troop page, or command payload.
- Preserve event-command grammar: command codes, indentation, branch shape,
  continuation records, plugin-command annotations, and terminal records must
  remain coherent.
- Keep the diff scoped to the requested objects. Do not normalize unrelated
  data or rewrite the whole database for a local change.
- Materialize the transformation script near the active task, spec, or plan.
  The script declares its inputs and target, checks preconditions, changes only
  the intended structure, and verifies its result. Make it idempotent when that
  improves safe replay; do not force generic migration machinery.

Load [JSON write and diff rules](references/json-write-style-and-diff.md) for
mutations and [Common Event command contracts](references/common-event-command-contracts.md)
when editing command lists. [Quest state modeling](references/quest-state-machine.md)
is illustrative, never the default architecture.
