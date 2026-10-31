# Graph Template

Structure for `_tasks.md`, the index of a spec's task graph. The frontmatter owns the dependencies; each task file owns its own status, and the table mirrors it. Keep narrative, progress notes, and evidence in the task files.

```markdown
---
slug: <slug>
spec: _spec.md
status: draft            # draft | approved
approved_on:             # set only on explicit user approval
approval: ""             # the user's approving words and where they were given
graph:
  nodes:
    - id: task_01
      file: task_01.md
    - id: task_02
      file: task_02.md
  edges:
    - from: task_01
      to: task_02
---

# Tasks: <Increment Title>

| #  | Task                    | Depends on | Checks owned | Status  |
| -- | ----------------------- | ---------- | ------------ | ------- |
| 01 | [<title>](task_01.md)   | —          | V-001, V-002 | pending |
| 02 | [<title>](task_02.md)   | 01         | V-003        | pending |

## Reserved for the Graph Tail

- PT-001, PT-002, PH-001 (`_playtest.md`)
```

## Graph Rules

- Node IDs are `task_NN`, zero-padded and sequential; each node's `file` is `<id>.md`, and every task file is a node exactly once.
- An edge means `from` must finish before `to` can start. Use `edges: []` when there are none. The graph is acyclic.
- List only direct prerequisites; omit an edge already implied through another dependency.
- The reserved section exists only until the graph tail assigns its items to the playtest task; omit it when the spec has no `_playtest.md`.
