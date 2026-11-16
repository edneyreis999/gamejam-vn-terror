---
name: game-loop-tasks
description: Run a requested delivery loop over an approved game task graph — execute every task and tail task in dependency order, verify each, and report evidence. Use only when the user asks for the loop; does not plan, review code, commit, or open pull requests.
---

# Game Loop Tasks

Before reading execution context or running the baseline, check the spec directory for `_execution-metrics.md`. When present, use [spec-execution-metrics](../spec-execution-metrics/SKILL.md) to initialize or resume the authorized execution and declare preparation. Pass its execution identity to task and nested procedures; at loop closure, freeze participant boundaries and link observations or gaps in the existing evidence. Collection failure does not stop delivery. Without the companion, retain the normal workflow.

Run the graph in `planos/tasks/<slug>/` to completion in one continuous session. Keep working through every task until all are closed or a proven external blocker stops the remaining work. A task boundary is a checkpoint, not a request for review or a place to end the turn.

The loop starts only on the user's request for it. A single named task runs through `game-execute-task` directly. Planning is not execution: a graph whose `status` is not `approved`, or a spec not `approved`, is reported to the user.

1. **Resume from the artifacts.** Read `_spec.md`, `_tasks.md`, every task file, `_tests.md`, `_playtest.md`, and project instructions, decision records, and the known issues that apply. Progress is what the files already say: each task file owns its `status`, and the `_tasks.md` table mirrors it. Create no state file, memory directory, or progress ledger. When the table and a task file disagree, the task file wins; fix the table.
2. **Establish the baseline** before the first task, as [the regression baseline](references/regression-baseline.md) describes.
3. **Pick the next ready task and run it** as [the loop procedure](references/loop-procedure.md) describes, calling `game-execute-task`. Repeat until no task is `pending` or `in_progress`.
4. **Handle failures in place** with [the repair and blocker rules](references/repair-and-blockers.md). A failure is repairable by default; stop only for a proven external blocker or a product decision with no safe default.
5. **Report** with [the completion report](references/completion-report.md).

## Rules

- You own graph order and check ownership. Reordering tasks or moving a check to another owner, while keeping every obligation, expected result, and acceptance criterion, needs no approval: apply it, update `_tasks.md`, and record old and new owner in Execution Notes. Changing scope or a contracted outcome, or dropping a check, needs the user.
- Never commit, push, or open a pull request. Leave the verified diff for the user.
- Never count a skipped, waived, omitted, blocked, or unexecuted check as passed, and never record the user's acceptance for them. Human acceptance is the user's.
- A pause the user gave for a specific moment applies only there; it does not carry to later runs or into the skills.
- The loop adds no review, pull request, or release stage. Ask for them separately.
