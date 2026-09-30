# Prologue and tavern — Man Made Wings

## Confirmed scope

On 2026-09-30 the user explicitly selected the same supplied track, `(Chillout) Man Made Wings.wav`, for the prologue and tavern. Play it using native looping BGM, volume 35, pitch 100, pan 0. Keep The Well on the opening screen, existing ambience/effects, music settings, expedition music and ending cues.

This incremental decision supersedes the distinct present/past BGM selection only within the prologue. Keep the existing ambience distinction. The completed `approved-narrative-dialogue-staging` audio baseline remains historical; later narrator passages retain Town1.

## Implementation

Common Event 67 retains ownership of soundtrack selection. Its narrator branch selects the new track only for the three prologue narrator passage IDs; later narration retains Town1. Its existing tavern branch replaces Town3 with the same track. Consecutive playback of the same native BGM does not restart it, including the prologue-to-tavern transition. No new state, plugin or engine changes.

Ship the converted OGG in the game's audio/bgm directory. The source WAV collection stays local under docs/sons and is not required to run the game. Temporary conversion tooling is not a game dependency.

## Verification

Implemented and statically verified on 2026-09-30. Ten representative branch evaluations passed: three prologue narrator passages, introductory dialogue, formation/tavern, Irati's tavern passage, later narration, Council, expedition and ending. Structural comparison against commit c080e31 confirms every other Common Event is unchanged and the original ambience/effects/branches are preserved. The opening still selects The Well. Syntax and `git diff --check` passed; the change was reviewed for unnecessary code. OGG conversion preserved stereo, 44100 Hz and 52.800 seconds.

Static evidence is local at `.artifacts/man-made-wings-static.json`. SHA-256: CommonEvents.json `3fcbfa7f4f642d726eb0fcfec1db53f982b9395234879e60155d915d52df6709`; shipped OGG `f2916c42df245ab68629cd508f073786638c57ecd4012652277c66a4b730b81f`.

No new permanent test suite: this change selects presentation audio without changing campaign rules or persistence. Runtime/listening verification remains pending. The previous opening task identified a Windows path-containment failure in the available directed runner; this task did not rerun that blocked runner or claim an E2E pass. No browser or server was opened. Human acceptance and measured full-cycle playback remain pending.

## Devlog and scope audit

Suggested moment: start the prologue, hear Man Made Wings under older Rheed, continue into the young characters' conversation and the interactive tavern. Capture a clip with sound; preserve the distinct opening music and expedition transition. Keep the OGG, focused Common Event change, GDD decision, incremental contract and authoring script. Other supplied music stays outside this delivery. The user subsequently requested a local commit of both audio increments; remote publication was not requested.
