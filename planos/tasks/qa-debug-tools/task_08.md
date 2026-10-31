---
status: pending
title: Plan QA for the integrated Debug tools
---

# Task 08: Plan QA for the integrated Debug tools

## Outcome

Complete persona missions and the affected technical tests are ready for task 09. `_playtest.md` matches the delivered behavior, and its starting states are ready for the user.

## Sources

- Spec: Affected Game Surfaces, Known Risks (landing fidelity, menu reachability), Key Decision D-8 (lighter scenario verification)
- `_playtest.md` PT-001–PT-008, PH-001; `_tests.md` Not Verified Here

## Checks

- Procedure: use [game-plan-qa](../../../.claude/skills/game-plan-qa/SKILL.md) when performing this task. It owns risk selection, evidence reuse, complete persona missions, the affected-test policy and the human handoff. Writing this graph neither invokes it nor runs QA.
- The missions cover at least:
  - a QA-tester persona reaching A1 and one B trap from New Game, with reload and Continue;
  - Final route unlocked and Total loss;
  - the hint on and off;
  - the plugin disabled after a jump;
  - an agent session that records the jump and its seed (US-007), with the plugin enabled only in the prepared runtime copy.
- Affected technical tests listed separately by path: V-001–V-004 (build gate) and the maintained suite restored by task 07, chosen by risk under ADR-G006.

## Scope

- Output: write the missions into task 09's Journeys section and the affected tests below them. Keep preparation evidence and unresolved dependencies in this task's Execution Notes.
- Runtime: current stable desktop Chrome through the local server (SD-006). NW.js is excluded by the local runtime exception. Starting states come from New Game in the same run (SD-015 as amended by ADR-G007).
- Delete targets: none.

## Execution Notes
