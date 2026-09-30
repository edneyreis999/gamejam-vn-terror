# The Well — epilogues and credits

## Approved behavior

The user approved The Well for Rheed's epilogues and explicitly chose to keep it through the credits. Reuse the existing opening OGG in native looping BGM at volume 35, respecting player volume. Stop any still-playing ending ME before starting the epilogue BGM. Do not restart between hero epilogues or on entering credits. Earlier endings and memorial retain their existing behavior. A campaign without survivor epilogues does not gain a new credits cue.

This extends the narrator-music decision from rheed-the-well to phase epilogue. Existing revelation and final-choice exceptions remain in force. No engine/plugin modifications, new asset, campaign flag, state migration or save-schema changes.

## Implementation

In Common Event 67, after the existing queries, handle phase epilogue with native Stop ME (empty Play ME), Play BGM The Well, Stop BGS and Exit Event Processing. The eight hero maps (29–36) already invoke CE67 before presenting their text. Native repeated playback of the same BGM retains its buffer/playback position. Credits CE61/63 and their presentation helper CE337 issue no music replacement; let The Well continue naturally. Return to Title retains the existing opening cue.

## Verification

Focused verification PASS: 22 isolated native AudioManager checks cover all eight hero contexts after each of the two ending themes (16 combinations), continuity, return to opening and mute. The actual installed AudioManager source was executed with buffer doubles: ending ME is destroyed before The Well starts, BGM loops at event volume 35, repeated epilogues retain one buffer/play call, and volume 40 produces gain 0.14. Credits CE61/63 and helper CE337 contain no music replacement. Six unrelated phase outputs remain identical. Structural comparison against baseline 786e34f confirms only six CE67 commands were added; syntax and whitespace checks passed. CommonEvents SHA-256: `4028b33fdc07181e715f5d2866dd34055c62e627f72623d15a4349195506ca97`. Distinguish isolated engine/audio method verification from an actual browser playthrough or listening. Do not reuse the older audio suite as evidence without addressing its historical assumptions about silence, ambient effects and direct state setup. No new permanent presentation-only test is added.

## Delivery

Keep the focused Common Event change, GDD decision, this incremental contract and its authoring script. Preserve the supplied music collection and all prior assets. Suggested devlog clip: ending theme giving way to The Well at the first epilogue, then two heroes and credits without restarting. The user subsequently requested the local commit. No remote publication.

Actual browser playback and listening remain pending. Isolated buffer doubles do not certify decoding, physical output or full campaign navigation. No browser/server was launched.
