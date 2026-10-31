# Playtest Template

Structure for `_playtest.md`, a script a person executes as written: functional checks only a person can observe well, and experience hypotheses only play can answer. Write it so a tester without this conversation can run it and record results in the file.

## ID Rules

- Functional checks are `PT-NNN`; experience hypotheses are `PH-NNN`. IDs are permanent: never renumber or reuse; mark a dropped item `(withdrawn)`.

## Document Skeleton

```markdown
# Playtest: <Increment Title>

Build: ______  Tester: ______  Date: ______

## Setup

How to reach the starting state: the save to load or the exact steps from a new game, and any settings to apply.

## Functional Checks

### PT-001 — <Title> (US-001.AC-2)

Steps:
1. <Player or author action>

Expected: <what the tester should see or hear, in order>

Result: [ ] Pass [ ] Fail
Notes:

## Experience Hypotheses

### PH-001 — <Title>

Steps: <how to play to observe it>
Observe: <the question the session answers, e.g. "Does the strike feel heavier than a normal attack?">

Answer: [ ] Yes [ ] Partly [ ] No
Notes:

## Verdict

[ ] Accept  [ ] Adjust (list below)  [ ] Reject
Adjustments:
```

## Rules

- `PT` items have an expected observation; a failure is a defect.
- `PH` items have a question; a negative answer is a design decision for the user, not a defect. Never treat a passing functional check as evidence that an experience hypothesis is true.
- Keep the script to what changed; reuse one session for several items when they share a starting state.
- Record only what the tester actually did; an unvisited branch is not executed.
