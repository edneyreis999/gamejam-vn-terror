# Common Event command contracts

An RPG Maker MZ command is an object with `code`, `indent`, and `parameters`.
Meaning depends on the code and its position in the surrounding list.

## Structural invariants

- The list ends with command code `0` at the enclosing indentation.
- Branch bodies use deeper indentation than their branch command.
- Else, end, repeat, and choice markers align with the command they close.
- Comment continuations and script continuations follow their opening command.
- Plugin commands use code `357`; their editor annotation rows use code `657`
  and remain adjacent to the owning command.
- Labels and jumps must resolve within the intended list and preserve loop exit
  paths.
- A transfer or scene-changing command can terminate the practical lifecycle
  even when commands remain structurally present after it.

## Safe editing

Select the complete logical span before inserting, replacing, or removing a
branch, loop, script block, comment block, or plugin command. Recompute only the
indentation affected by that span. Preserve unknown command payloads exactly.

After the edit, verify terminal code, branch balance, indent transitions,
label targets, plugin-command annotations, and the caller paths that can reach
the changed Common Event.
