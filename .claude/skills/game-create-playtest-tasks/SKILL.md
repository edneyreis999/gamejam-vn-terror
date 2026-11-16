---
name: game-create-playtest-tasks
description: Add or repair the tail of a game task graph — agent QA planning and execution of integrated journeys, and the user's optional playtest of _playtest.md. Called by game-create-game-tasks before it presents the graph; does not run QA or playtests, or record acceptance.
---

# Game Create Playtest Tasks

Close a task graph under `planos/tasks/<slug>/` with the tasks that verify the integrated increment after its implementation tasks. Use the graph the caller or the user names; a recent modification time does not identify it. Writing these tasks runs nothing.

| Task | Run by | Owns |
| --- | --- | --- |
| QA plan | Agent | Planning with `game-plan-qa`: complete persona missions, affected tests, `_playtest.md`, and starting states |
| QA execution | Agent | Dogfooding the planned journeys with `game-execute-qa`, running the separate technical checks, repairing in-scope defects |
| Playtest | User, optional | The `PT-NNN` and `PH-NNN` items of `_playtest.md` |

1. **Read the graph.** Read `_tasks.md`, every task file, `_tests.md`, and `_playtest.md`, and the spec's Affected Game Surfaces and the runtimes the delivery targets. Load the best-practices skill for each technology the project uses when one is available; it supplies the runtime and starting-state facts the tail depends on.
2. **Reuse or repair.** Reuse a valid tail. Repair only a missing task or a concrete wiring or coverage gap, preserving customized task bodies and unrelated graph entries.
3. **Decide what applies.**
   - The QA pair applies when the increment changes runtime behavior. An increment of documents, tooling, or data verified statically gets no pair.
   - The playtest task applies when `_playtest.md` exists.
   - When neither applies, add nothing and say why.
4. **Write the tasks** with the [general task template](../game-create-game-tasks/references/task-template.md) and the bodies in [the tail template](references/tail-template.md). Give them the next sequential `task_NN` IDs and change the graph frontmatter, the table, and the task files together:
   - The QA plan depends on every implementation task that no other task depends on; the QA execution depends on the plan; the playtest depends on the QA execution, or on those implementation tasks when there is no pair. Add no edge already implied through another.
   - Move the reserved `PT` and `PH` IDs into the playtest task's Checks owned and remove the Reserved for the Graph Tail section.
5. **Self-check once.** The graph is acyclic and its nodes match the task files; every `PT-NNN` and `PH-NNN` belongs to the playtest task; the table agrees with the frontmatter; no task prescribes the full heavy suite unless the user or the spec asked for it. The QA plan task uses [game-plan-qa](../game-plan-qa/SKILL.md) to supply complete missions for [game-execute-qa](../game-execute-qa/SKILL.md), and the execution task keeps session records in its own Execution Notes; authoring this graph does not run either procedure or settle those sessions.
6. **Hand back.** When called by `game-create-game-tasks`, return to its presentation step. When run alone, present the added or repaired tasks; on an approved graph, record the user's approval of the change in `_tasks.md`.

## Rules

- Never run QA or a playtest while writing these tasks, and never write a report for a session that did not run.
- Acceptance of the delivery is not recorded here; the tail records QA evidence and the playtest result, or that the playtest was not run.
- A request after the increment is accepted becomes a new spec, never a task appended after the tail.
