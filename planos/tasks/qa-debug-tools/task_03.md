---
status: completed
title: Go to trap for all A and B traps
---

# Task 03: Go to trap for all A and B traps

## Outcome

Go to trap lists all 16 traps with their localized names and IDs. Any of them lands as position 1 of its own initial route (A → church, B → park), including the park route's maps.

## Sources

- Stories: US-002.AC-1–5 (all traps), US-002.EC-3
- Surfaces: `_uiux.md` S2 (full Go to trap list)

## Checks

- Inline case: for B5 and A8 (one of each pool, beyond the pilot), the jump lands on that encounter at position 1 of its route with `validateState` ok and a saved landing point. A seed search over all 16 traps returns, for each, a seed whose first draw on that route is the trap, and it returns the same seed on a second run.
- Inline case (runtime compatibility, native data, Chrome boot): as in task 02.

## Scope

- Starting points: task 02's Execution Notes (landing mechanism); `data/Map015.json`–`Map022.json` (B traps).
- Shared files: `Dryland_7_QADebug.js`, `Languages.tsv` (trap list labels, if new keys are needed). Ordered after task 02.
- Delete targets: none.

## Done When

The 16 entries are present and named from the existing `enc.*.name` keys, with no new trap-name text.

## Execution Notes

- 2026-10-31: The list already held the 16 traps from task 02 (generic code); this task verified them. Pure planner, run twice in the page: every trap returns the same seed both times (A1 7, A2 8, A3 0, A4 14, A5 6, A6 1, A7 20, A8 4; B1 to B8 repeat the same seeds because both pools draw from the same generator). End to end in Chrome through the Debug screen: A8 lands on map 14 and B3 on map 17 at position 1 of their own route, `validateState` ok, `file1` holds the same phase and seed (saved). A1 and B5 were exercised in task 02; no other trap was landed individually, which the task's inline case does not require.
- Names come from the existing `enc.*.name` keys, no new trap text.
