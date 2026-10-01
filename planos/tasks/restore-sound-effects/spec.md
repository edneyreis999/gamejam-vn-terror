# Restore sound effects

## Confirmed scope

On 2026-09-30 the user asked to bring back every sound effect removed by PR #41 (`music-only`): authored BGS and SE, native menu/battle sounds and the Options sound lists. Keep every new BGM from PR #41, The Well in the endings and epilogues, and the ambience stops in the epilogue, council, final choice and ending contexts. Ending ME themes (Musical1, Organ) stay replaced.

## Implementation

`apply.mjs` fills the audio name of the 11 native BGS/SE commands in Common Events 47, 48 and 67, the SE of the prologue map applause, and the 24 `System.json` sounds, using the pre-PR values (commit `f00f7ed`). It fails if a target is not currently silent. The tavern ambience People1 plays at volume 25 (was 60), matching People2, by the user's request on 2026-09-30. Options lists and master-volume shortcut names are restored through the delivered CLI. Commands, positions and volumes were never changed, so this is a name-only change.

## Verification

Static PASS: every BGS/SE named before PR #41 is named again with the same volume; `System.sounds` equals the pre-PR array; BGM/ME commands equal `origin/main`. Runtime listening is still pending. Existing saves may keep the ambience they restored until the next context refresh.

## Decision and supersession

Supersedes the BGS/SE and menu-sound removal in `music-only`; its music scope is untouched. Historical baselines keep their original text.
