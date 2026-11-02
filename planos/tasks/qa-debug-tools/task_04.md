---
status: completed
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

- 2026-10-31: Added `planScenario` (legal autoplay on a throwaway state: formation, party by competency coverage, approach by the wins/loses policy, camp topics, sacrifices, final choice) and a Scenarios list (`debug.scn.*`, PT/EN). Landing: replay live through the same command path, then reserve CE44 with the checkpoint reason the target phase accepts (formation `camp_exit`, council `council`, endings `ending`) so the game's own `Checkpoint` validates and saves it. Setting that reason variable is needed because the replay can end on a passage with no reason of its own (the final-route replay did, and nothing was saved until this was added).
- Evidence in Chrome (disposable copy with the plugin enabled), each through the Debug screen: Final route unlocked lands on map 3, `formation`, both initial routes done; Total loss on map 27, `ending`/`bad`, 8 dead, valid; both saved (`file1` matches) and Continue resumes the same phase and seed. Plans for all five take under 20 ms and are repeatable (seed 1 for all five).
- Beyond the required evidence (D-8 left these unchecked): Council (map 23, `council`), Reunite (map 25) and Destroy (map 26) were also landed once in the same session and saved, `validateState` ok. That single run is not a maintained check; no Continue was run on them.
- Bug found and fixed on the way: `sendLive` did not pass `approachId`, so the game rejected `CHOOSE_APPROACH` (`invalid_action`).
