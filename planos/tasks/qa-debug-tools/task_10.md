---
status: pending
title: User playtest of the Debug tools (optional)
---

# Task 10: User playtest of the Debug tools (optional)

## Outcome

The user, or their QA tester, has executed `_playtest.md`, or decided not to.

## Sources

- `_playtest.md`

## Checks

- PT-001, PT-002, PT-003, PT-004, PT-005, PT-006, PT-007, PT-008, PH-001

## Scope

- Hand-off: give the user the script and the starting states prepared by task 08. The user executes it, and the results are recorded in `_playtest.md` itself.
- A failed PT is a defect: repair it, prove the fix in the owning check, and ask for a replay of that item only.
- A negative PH is a design decision for the user (amend the spec, record a known issue, or accept it). A passing PT is never evidence for a PH.
- Not executed: running the playtest is optional. If the user decides not to play, set this task `completed` with "not executed by user decision" and the reason. Never mark an item as passed.

## Execution Notes
