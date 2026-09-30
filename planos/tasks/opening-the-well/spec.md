# Opening music — The Well

Confirmed by the user's request on 2026-09-30: play the supplied `(Chillout) The Well.wav` during the title/age-rating opening, repeating the whole track until the player leaves the opening. Preserve the existing story soundtrack and music volume control. No campaign rules, engine or plugin code change.

Incremental change over the current opening: Common Event 2 replaces its silent BGM command with `Dryland_Opening_TheWell`, at the existing volume 60, pitch 100 and centered pan. Native MZ BGM playback loops automatically. Map 2 already stops the opening BGM before starting the prologue audio; loading a saved game restores its own BGM.

The shipped OGG is converted from the supplied WAV in `docs/sons/Yet Another Atmospheric Horror Music Pack (WAV)/`. The source collection remains outside this delivery. The conversion uses temporary authoring tooling only, with no new game dependency.

## Expected result

The opening loads and decodes the supplied track, plays it with native looping, retains it through the age notice, and stops using it when the prologue begins. Browser playback may require the first player gesture. Artistic volume/comfort judgment remains human.

## Verification

Implemented; focused static verification passed on 2026-09-30. Structural comparison against HEAD confirms the only game-data change is Common Event 2's first BGM name. Native `AudioManager.playBgm` calls `play(true, ...)`; Map 2 stops BGM before its prologue. OGG metadata confirms Vorbis, stereo, 44100 Hz, 30.857 seconds (261515 bytes). `git diff --check` passed.

Runtime verification is BLOCKED, not passed: the directed runner rejects sibling output/fixture directories on Windows because its path containment check recognizes `../` but not Windows separators. It failed before browser/server launch, so no test resources remain running. The broad Core validator also reports `INVALID_EVENT_LIST` at Common Event 2, list/13; structural comparison confirms this command and the surrounding branching are unchanged from HEAD. Neither issue was modified as part of selecting the music.

The supplied `qa.mjs` describes the pending directed journey; it has not executed. No new permanent suite test: this is an audio presentation asset selection, with no new rule or persistence behavior. The user accepted the delivered opening music on 2026-09-30 and requested its commit. This records human acceptance of the result, without claiming a measured full-cycle observation or an automated runtime pass; native looping is supported by source inspection.

Verified SHA-256: `CommonEvents.json` = `40dca9f87c0e4c3d1d5362568662a2d28a67a7ba0da27ab7385835250e6c728f`; OGG = `301043462afa349cdc7fb479bc6398613592f2a8deabb900775e2d3999c57a2c`. Scope audit: retain the music and its existing consumer, the requested GDD decision, this incremental contract, focused authoring script and pending journey. All other supplied tracks remain outside the delivery. No engine/plugin edits, staging or commits.

## Devlog

Demonstrate the title and age notice with the new music, then start the story to show the soundtrack transition. Suggested capture: a short recording with sound; a still image cannot demonstrate this change.

## Candidate scope

Keep the OGG (runtime asset), the single Common Event change (runtime consumer), this incremental contract, its focused authoring script and the pending directed journey. Preserve all other supplied music files as unrelated user input. The user authorized a local commit after accepting the result; publication was not requested.
