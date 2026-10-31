# Loop Procedure

## Pick the next task

1. A task is ready when it is `pending` or `in_progress` and every task it depends on (the graph `edges`) is `completed`. Resume an `in_progress` task before starting another.
2. Among ready tasks, take the one that unblocks the most work; otherwise the lowest number.
3. When no task is ready but some are not closed, the rest depend on a `blocked` task. Go to the end of the loop with what is closed (see below).

## Run it

1. Call `game-execute-task` on the task.
2. After it returns `completed`, run the fast static and unit suites in full and compare them with the baseline, as [the regression baseline](regression-baseline.md) says. A new failure belongs to this task: repair it before picking the next.
3. Update the `_tasks.md` table row and the task's Current State block (below).
4. Pick the next ready task. Do not stop to summarize between tasks.

## Tail tasks

Run the QA plan, QA execution, and playtest tasks in graph order like any other task, following their own bodies.

- A QA plan that finds nothing to run records why; its execution then closes without inventing a session.
- A defect in the increment's scope found by QA execution is repaired in the task; only the journeys the fix invalidated are repeated.
- The playtest task belongs to the user. Set it `in_progress`, state exactly what the user must do, and report it as the one remaining item. When the user skips it, set the task `completed` with "not executed by user decision" and leave `_playtest.md` unexecuted. A failed `PT` is a defect; a negative `PH` is the user's decision (amend the spec, record a known issue, or accept).

## Current State block

Keep one short block at the top of each task's Execution Notes, rewritten in place and never appended to: method in use, pending items, evidence links, blockers, next action. Keep dated history below it brief. Another agent must be able to resume from the files alone.

## When tasks remain blocked

Continue every independent task first. Record each blocked task's evidence and missing input in its Execution Notes and in the completion report. Dependents of a blocked task stay `pending`.
