---
status: pending
title: Named scenarios
---

# Task 04: Named scenarios

## Outcome

Debug → Scenarios offers Final route unlocked, Council, Ending: Reunite, Ending: Destroy and Ending: Total loss. Each one, after confirmation, plays the legal path to its point, lands there and saves it.

## Sources

- Stories: US-003.AC-1–4, US-003.EC-1–2
- Surfaces: `_uiux.md` S2 (Scenarios), S3
- Spec: Known Risks (ending scenarios need a legal path)

## Checks

- Inline case: each scenario reaches its documented phase with `validateState` ok at every step. Final route unlocked lands in `formation` with both initial routes completed and the final route available. Council lands in `council`. Reunite and Destroy land in `ending` with `endingId` `reunite` or `destroy`. Total loss lands in `ending` with `endingId` `bad` and 8 dead heroes, each with a valid death context. The same scenario run twice gives the same seed and the same action history.
- Inline case (landing): Final route unlocked and Total loss land in Chrome and resume after Continue. Council, Reunite and Destroy are dispatch-checked only; their landing is not verified by the user's lighter-verification decision (D-8).
- Inline case (runtime compatibility, native data, Chrome boot): as in task 02.

## Scope

- Starting points: `rpg-maker/tests/fixtures/boundary-recipes.json` (for example `final-sixth-total-loss`, proving legal paths exist), `rpg-maker/tests/helpers/campaign.mjs`; `data/Map023.json` (Council), `Map025`–`Map027` (endings); task 02's landing notes.
- Shared files: `Dryland_7_QADebug.js`, `Languages.tsv` (scenario labels). Ordered after task 03.
- Delete targets: none.

## Done When

No scenario uses state edits, and the automatic party and approach policy reach all five without a manual step.

## Execution Notes
