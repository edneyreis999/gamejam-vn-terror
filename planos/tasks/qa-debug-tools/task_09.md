---
status: pending
title: Run QA on the integrated Debug tools
---

# Task 09: Run QA on the integrated Debug tools

## Outcome

Every journey planned in task 08 and every listed technical test has run on the integrated game and passed, or carries a precise blocked state.

## Sources

- Task 08's missions and test list

## Checks

- Procedure: use [game-execute-qa](../../../.claude/skills/game-execute-qa/SKILL.md) for persona sessions. The task executor still owns the listed technical tests and task completion; running a recipe or the suite is not dogfooding.
- Each listed technical test passes on the integrated game.

## Journeys

Filled by task 08.

## Scope

- **Failures**:
  - A defect in this increment's scope is repaired here, proven in the check that owns the behavior, and only the invalidated journeys and tests are repeated.
  - A harness or environment failure is repaired at its root cause without asking. A rerun with nothing changed is not a repair. Ask the user only when the sensor needs something unavailable or no repair exists.
- **Evidence**: initialize planned sessions in Execution Notes before starting. Update outcomes and append a debrief after each session and retest. Create no separate report.
- **Resources**: never use the user's server on port 18726. Enable the plugin only in a prepared runtime copy, never in the authored `js/plugins.js`. Close every app, tab and process this task opens (ADR-G006).

## Execution Notes
