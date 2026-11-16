# Task Template

Structure for `task_NN.md`. Sections are a writing aid, not extra acceptance gates: omit a section that does not apply, and keep each obligation in one place. Link the spec instead of copying it.

```markdown
---
status: pending          # pending | in_progress | completed | blocked
title: <Task title>      # matches the H1
---

# Task NN: <Task title>

## Outcome

What the player or author can newly do or see when this task is done, reached through its real entry path.

## Sources

- Stories: US-NNN.AC-N, US-NNN.EC-N
- Content: C-NNN
- Surfaces: `_dx.md` or `_uiux.md` sections
- Known issues: the Known Issues to Record entries this task creates and the Known Issues Addressed records it resolves or narrows
- Required document updates: the record and the change

## Checks

- V-NNN — <behavior it proves>
- Reused: `<path>` — <behavior it already covers>
- Updated: `<path>` — existing test this change makes obsolete
- Inline case (no `_tests.md`): given <starting state>, when <action>, then <result with exact values>

## Scope

- Starting points: `<path>` — <why it matters>
- Shared files: `<path>` — written by another task; ordered by the graph
- Data consumers: <engine, editor, tests, documents that read the changed data>
- Single-use scripts: <what each writes; deleted in this task>
- Delete targets: `<path>` or none

## Done When

Observable acceptance not already stated in Outcome or Checks.

## Execution Notes

Appended during execution: decisions, re-owned checks (old and new owner), evidence, follow-ups.
```
