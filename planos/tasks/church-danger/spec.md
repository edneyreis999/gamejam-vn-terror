# Danger — Caminho da Igreja

## Confirmed request

The user selected `(Tense) Danger.wav` for the church-route traps through the end of the route, looping, and requested a softer opening with the same tension. The GDD identifies this route as `physical`.

## Implementation decisions

Apply a two-second smoothstep gain fade from silence to full original level at the beginning of a local OGG conversion. Preserve duration, pitch, tempo, stereo image and the remainder of the composition; do not modify the supplied WAV. Native BGM loops the full converted track, so the softened entrance repeats at each loop. Retain the existing event volume 35 and user volume preferences.

Common Event 67 selects Danger in its expedition-music branch only when dungeonId is physical. This covers route entry, encounters, choices, outcomes, retreat confirmation and route completion. The same native BGM continues without restarting between traps. Returning to preparation restores tavern music; later present-day closure narration retains its existing track. Park, final route, opening, prologue and ending themes remain unchanged. BGS and SE stay disabled under music-only.

This replaces only the church-route Dungeon2 prototype selection in GDD §19.4 and the historical approved-narrative-dialogue-staging audio contract. No engine/plugin code, new runtime dependency, campaign state or save schema change.

## Verification

Implemented; focused static verification PASS on 2026-09-30. Thirty route/context evaluations covered nine expedition phases across all three routes, return to formation, closure narration and ending. Structural comparison against baseline aee9621 confirms only the intended CE67 BGM branch changed. Syntax and diff checks passed; review found no unrelated code changes.

The OGG retains 118.154 seconds, stereo and 44100 Hz. Decoded output/source RMS ratios over quarter-second windows: 0 seconds = 0.017; 1 second = 0.5927; 3 seconds = 0.9734; 30 seconds = 0.9919. These checks support a reduced attack and preserved later level; Vorbis is lossy. Initial conversion stopped on a buffer-type error; using the buffer bytes resolved it and the complete replacement was verified.

The user accepted the result after checking it and requested its commit. This records artistic acceptance, without claiming a measured full-loop observation or an automated route playthrough. The existing Windows directed-runner path failure is recorded in opening-the-well; no claim that journey passed. No browser/server was launched and no permanent presentation-only test was introduced. Original WAV untouched.

## Delivery and devlog

Keep the runtime OGG, focused Common Event change, this incremental decision, conversion recipe and authoring script. Source WAV remains local in docs/sons. Demonstrate the softened first two seconds, transition between two traps without restarting, and return to tavern; capture a clip with sound. The user subsequently authorized a local commit; remote publication was not requested.

## Accepted candidate identity

- rpg-maker/The Dryland Drowned/data/CommonEvents.json: SHA-256 `e704501d5586e0dc82b9bb959933f8f0101fe8cddff4f328a5047f56e7ebc1ec`.
- rpg-maker/The Dryland Drowned/audio/bgm/Dryland_Church_Danger.ogg: SHA-256 `4bcce972ecceec48b0d95c0f99ea8cc1022ee2cf75192c4a8ebd4f9532abf83f`.
