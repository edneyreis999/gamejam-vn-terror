# Repair and Blockers

## Repair by default

A failing check, tool, or environment is repairable until proven otherwise. Repair it within the current task; do not write the task's final status or report an intermediate failure.

1. Capture the failing command, exit status, decisive output, and files. Preserve the first failure.
2. Diagnose the root cause. Build a fast, deterministic command that shows the exact symptom before forming hypotheses; rank two or three falsifiable hypotheses and test one variable at a time.
3. Fix the cause. Run safe, deterministic repair commands that the tool's own output or project instructions name, including installing declared dependencies and regenerating generated files. Inspect every generated diff and keep unrelated user changes untouched.
4. Rerun the smallest command that reproduces, then the checks the fix invalidated. A blind rerun is not a repair: flaky, timeout, race, and intermittent failures need a diagnosis or a changed precondition first.
5. After two attempts without new information, record the gap and the next refutable hypothesis in the task's Execution Notes, then continue independent work.

Never weaken a test, inflate a timeout, add a retry to hide a failure, or skip a hook to get a pass. A known tooling blocker gets a fix on its first occurrence, not a note.

Failures from the test setup rather than the game (harness, tool, environment) are repaired like any other. Record a failed sensor as such; a dependent sensor failure is never PASS.

## External blocker

Stop remaining work only when all hold:

1. The task cannot meet its criterion without a specific missing credential, authorization, approval for a destructive action, external service, or infrastructure.
2. Every safe in-scope alternative was tried and recorded with evidence.
3. The missing input cannot be derived from the project, or created, repaired, restarted, regenerated, or replaced within the authority already given.

A dirty worktree, failing suite, repeated repair, generated drift, complexity, or elapsed time does not meet this test. On a proven blocker, set the task `blocked`, write the evidence and the exact missing input, and continue every independent task.

## Product decisions

When a decision is the user's and a safe default exists, use the default, note the choice and the question for the completion report's Open Questions, and continue. Stop only when no safe default exists and every remaining task depends on the answer; ask then, once, with the options and a recommendation.

## Checks only a human can run

Audio quality, editor operation, and physical devices are named acceptance checkpoints for the user, not technical blockers. Mark the owning task item as awaiting the user, continue independent tasks, and list each checkpoint in the report. Never invent the result.
