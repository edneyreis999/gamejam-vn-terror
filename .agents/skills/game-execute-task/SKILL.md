---
name: game-execute-task
description: Execute one task of an approved game task graph end to end — implement its outcome, run the checks it owns, and record the result in the task file. Used by game-loop-tasks and when the user names a task_NN.md; does not plan tasks, run the whole graph, or commit.
---

# Game Execute Task

At execution entry, before contract preparation or baseline, check the spec directory for `_execution-metrics.md`. When present, use [spec-execution-metrics](../spec-execution-metrics/SKILL.md): reuse the loop’s execution or initialize a direct execution, declare task activity transitions, observe existing commands, and mark the task/candidate before E2E acceptance. Nested infrastructure and QA reuse that execution. Link observations, findings and collection gaps in Execution Notes; freeze boundaries on direct-execution closure, leaving loop-owned closure to the caller. Metrics never change task status or block delivery.

Deliver one `task_NN.md` under `planos/tasks/<slug>/`: the outcome works through its real entry path, the checks it owns pass, and the task file says so. Work without interruption; stop only for a proven external blocker or a product decision with no safe default, as defined in [the loop's blocker rules](../game-loop-tasks/references/repair-and-blockers.md) when a loop calls you.

For a QA-plan task, use [game-plan-qa](../game-plan-qa/SKILL.md) for steps 2, 4, and 5 below: inspect the current plan's gaps, prepare the contracted missions and starting states, and verify the handoff is ready. Its proof concerns the plan and required preparation; do not run the downstream QA sessions or their technical checks to prove that planning task. This executor still owns the task's lifecycle and status.

1. **Read the contract.** Read the task file, the spec sections and stories it cites, the `V-NNN` entries it owns in `_tests.md`, and project instructions and decision records that apply. Load the best-practices skill for each technology the project uses when one is available. Settle conflicts by this precedence and record the resolution in Execution Notes: machine-checkable constraints, the user's explicit decisions, owned checks, the spec, decision records, the task's own wording, existing code.
2. **Take the pre-change signal.** Run the cheapest existing check that shows the current behavior, or write the owned check first and watch it fail for the expected reason. If its infrastructure is missing or defective, use [game-test-infrastructure](../game-test-infrastructure/SKILL.md) to establish or repair that capability within this task, then take the signal. Use the same skill if an infrastructure gap appears during implementation or verification; working infrastructure needs no extra invocation. A signal that cannot fail for the intended reason is not a signal.
3. **Mark it started.** Set the task's `status: in_progress` and mirror it in `_tasks.md`.
4. **Implement the smallest coherent behavior** that delivers the Outcome. Code, data, events, and content for the slice belong to this task. Work outside the task's scope is recorded under Execution Notes as a follow-up, never added silently.
5. **Prove the owned checks.**
   - When the task calls for persona-based QA, use [game-execute-qa](../game-execute-qa/SKILL.md) with the QA plan's complete missions. Keep its incremental session results in this task's Execution Notes. This executor retains the separate technical checks and task status; session closure is not task completion or human acceptance.
   - Run every check the task owns. Expected values come from the spec or a reference, never from the candidate's own output; a check that reproduces the implementation proves nothing.
   - Run the real entry path at least once; a fixture that bypasses it does not prove the claim.
   - When a check fails, read the failure and the code it names before changing anything.
   - Update the existing tests the change made obsolete and run them. Run a test you edited.
   - Record each command and its exit status. A check you did not run is recorded as not run, never as passed.
6. **Clean up.** Delete single-use scripts and the task's delete targets. Check that the change leaves the game runnable.
7. **Self-review once.** Read your diff for scope creep, leftover debug code, unhandled failure paths, and unrelated edits; remove them. Confirm every Outcome, Done When item, and required document update is reached.
8. **Close.** Append to Execution Notes: decisions, re-owned checks (old and new owner), evidence (command, exit status, result), and follow-ups. Set `status: completed` only after steps 5 to 7 hold, and mirror it in `_tasks.md`. When blocked, set `blocked` with the evidence and the exact missing input.

## Rules

- Never mark a task completed on a check that failed, was skipped, or depended on a failing sensor.
- Never weaken a check, inflate a timeout, or add a retry to make a failure pass.
- Never commit, push, or open a pull request; leave the diff for the user.
- Moving a check to another task while keeping every obligation is routine: apply it and record old and new owner. Changing scope or a contracted outcome, or dropping a check, needs the user.
