# Selected campaign music

Approved for implementation by the user on 2026-09-29: apply all music selections made in this conversation and open the updated game.

## Confirmed scope

| Context | Source in `docs/sons/Yet Another Atmospheric Horror Music Pack (WAV)/` | Runtime BGM |
| --- | --- | --- |
| Content warnings and entry | `(Chillout) The Well.wav` | `Dryland_TheWell` |
| Opening narration and tavern | `(Chillout) Man Made Wings.wav` | `Dryland_ManMadeWings` |
| Church | `(Tense) Danger.wav` | `Dryland_Danger` |
| Park | `(Ambience) The Valley of Ghosts Origin.wav` | `Dryland_ValleyOfGhosts` |
| Final village | Approved simultaneous mix at `docs/sons/previas/vilarejo-danger-e-valley-mistura.wav` | `Dryland_VilarejoMix` |

The tavern selection replaces the earlier conversational decision to leave the Rheed/Ivaí exchange without music. Keep the same BGM buffer between the opening narration and tavern; native repeated Play BGM with the same name does not restart it. No rejected glass/furniture samples are integrated. Preserve contextual effects and ending themes. Subsequent user confirmation on 2026-09-29 replaces later present-day narration cues: retain the current route music and ambience during expedition narration, route closure and Council. Opening audience ambience stays confined to the prologue. Existing tavern-scene passages (Irati/map reveal) and formation use tavern audio. Choice screens retain their route music.

Prototype baseline: BGM event volume 35, pitch 100, pan 0; native looping, including the approved mix's existing fade at its boundary. Final loudness and loop seam acceptance remain pending. No engine/plugin edits, dependency manifests or remote runtime services. A portable converter is a local authoring tool only.

This incremental spec partially supersedes the opening/tavern and route cue selections in `approved-narrative-dialogue-staging`; its completed evidence remains historical. See [ADR-001](adrs/adr-001-selected-music.md).

## Verification and demonstration

Verify structured event changes, playable Ogg/Vorbis assets, real opening playback and the prologue/tavern transition. Record remaining route traversal and listening limits honestly in [verification.md](verification.md). Gamepad and native zoom are excluded under G003/G005; group shared audio checks under G004/G006. Do not inject campaign state or overwrite user saves.

Devlog moment: start at the warnings, enter the prologue and advance to young Rheed/Ivaí while the same music continues. Suggested capture: short recording with game audio spanning that transition, followed by route-specific clips when reached normally.

Follow-up demonstration: record a trap/route closure through Rheed narration and the return to the tavern; route audio must remain through narration and change only with the tavern scene. No automatic browser reload during the user's active campaign.

## Council refinement — approved 2026-09-29

The user requested implementing revelation/final-choice audio that supports reading and tension. Preserve every text box, choice label, input rule, outcome and save action. Keep VilarejoMix playing continuously through Council at event volume 24 (ambience 30), lower to 15/18 for `council.02` and `council.confession`, and 18/20 while the final choice is open. Native Play BGM/BGS updates gain without restarting the same named buffer. Volume changes are native level changes, not a custom gradual crossfade. Normal village exploration remains 35/60.

Play the existing local Darkness1 SE once on entering the confession text (volume 22, pitch 80; approximately 2 seconds at this pitch). This is a provisional artistic selection, not a claim of listening. Do not trigger it from recurring CE067. After either validated ending action and its checkpoint, stop BGM/BGS and wait 30 frames before the existing ending transition/theme. No timer, heartbeat, forced reading delay, or extra effect while hovering/selecting. The pause occurs only after commitment. All player volume preferences remain in force.

The extra reusable SE extends the previous ten-effect baseline by one for this approved refinement; no new asset/library is installed. Final perceived balance remains pending. Suggested devlog capture: confession text, unhurried final-choice reading, confirmation and theme entrance.

## Reading mix — latest user request

Reduce all authored campaign BGM/BGS/ME/SE event volumes to 60% of their previous values (rounded integers), including opening applause and confession effect. Reduce used System interface sounds (cursor, decision, cancel, buzzer, save, load) likewise. Keep this mix between messages and choices, without gain pumping or automatic ducking. Do not change ConfigManager or existing user preferences. This supersedes previous numeric baselines above; reading-mix.json owns the exact before/after values. Examples: regular music 35→21; crowd/route ambience 60→36; Council music 24→14; revelation 15→9; final choice 18→11; final themes 65→39. Subjective balance remains pending.

## Stronger final-choice tension — latest override

User requested more tension specifically during the final choice. Raise only its VilarejoMix BGM event volume from 11 to 18, keeping pitch 100, ambience at 12, SE levels, untimed input and post-confirmation silence unchanged. This supersedes the final-choice BGM row in reading-mix.json; all other reduced values remain current. It gives music greater presence without restarting the same buffer. Perceived tension remains for user audition.
