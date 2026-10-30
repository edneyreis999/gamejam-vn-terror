# Regression Baseline

The loop keeps the suites honest so a failure appears when it is introduced, not at the end. Running a baseline and fixing a tooling blocker need no permission.

## Before the first task

1. Find the project's documented commands for the fast static and unit checks and the heavier runtime checks. Load the best-practices skill for each technology the project uses when one is available; it names the runtime the checks must target.
2. Run the fast static and unit suites in full on the untouched tree. Record each command, exit status, and result in the first task's Execution Notes, running each command by itself so one exit status cannot hide another.
3. Classify each failure on the base:
   - Fixable tooling or environment fault: repair it now.
   - A genuine failure that predates the increment: add it to a short baseline ledger in the first task's Execution Notes and offer a known-issue record through `game-create-known-issues`, unless it belongs to the increment's scope.

## At each task close

- Run the fast static and unit suites in full; never select a subset of them.
- Compare the result with the baseline. A failure absent from the baseline belongs to the task and is repaired now. Never accept "same failures as before" without the ledger naming them.
- Run heavy runtime or end-to-end checks only where the task's owned checks or a concrete risk require them; choose representatives by risk, not one per variant. Record what was omitted, the proof that covers it, and what would reopen it. An omitted check is never recorded as passed.
- A test file you edited or added must have been executed before the task closes.

## At the end of the loop

- Run the fast suites in full once more. The loop does not end with an unexplained red suite: every failure is fixed, in the ledger as a pre-existing failure, or reported as a blocker.
- A target runtime older than the one the checks use is a gap: say which check ran on which runtime.
