# Completion Report

Write the report in the conversation when the loop ends, completed or stopped. It states what happened; it does not declare the delivery accepted.

## Contents

1. **Tasks.** Each task with its final status. List `blocked` tasks with their evidence and exact missing input, and tasks left `pending` behind them.
2. **Checks.** For each `V-NNN`, `PT-NNN`, and `PH-NNN`: executed and passed, executed and failed, not run, waived or skipped by the user's decision, or awaiting the user. Never fold a non-run check into a pass. Give the command and exit status or the artifact for executed checks.
3. **Baseline.** Starting result, ending result, ledger entries, and omitted heavy checks with the proof that covers them.
4. **Graph changes.** Reorders and re-owned checks, each with old and new owner.
5. **Follow-ups.** Known issues offered or created, out-of-scope findings recorded by tasks, and gaps in the evidence.
6. **Open Questions.** Product decisions taken by default, each with the choice and the question for the user.
7. **Human checkpoints.** Each item awaiting the user, with exactly what to do.
8. **Diff.** The files changed, left uncommitted for the user to review and commit.

## Rules

- State a result in the terms the evidence supports, for example "passed on the desktop build; not run on the editor runtime". A verdict holds for the inputs checked, not beyond them.
- The loop is complete only when every task is `completed` and every non-passed check is explained above. Otherwise say it stopped and why.
- Recording acceptance of the delivery is the user's decision. The report never records it.
