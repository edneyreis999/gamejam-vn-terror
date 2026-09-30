# Vilarejo Partido — combined church and park music

## Confirmed request

The user explicitly requested the church and park music playing simultaneously as one composition on the final route. Bake Danger and The Valley of Ghosts Origin into one local stereo BGM. Do not alternate tracks or add ambient effects. This replaces the remaining Dungeon2 selection for the final-route expedition context.

## Mix and integration

Use the original supplied WAVs, untouched, at their shared 44100 Hz stereo format. Mix both layers throughout a 160-second output, balancing source RMS by attenuating the louder layer. Repeat the shorter Danger layer with a two-second overlap crossfade to avoid an abrupt internal restart. Preserve pitch and tempo; no time stretching. Apply two-second smooth opening/closing fades for a gentle native-loop boundary, then attenuate only as needed to keep pre-encoding peak at or below 0.85. Verify the decoded OGG stays below clipping. These are production defaults for audition, not a claim of artistic acceptance.

Common Event 67 selects the single baked OGG for the final-route BGM branch, at existing volume 35. Native BGM loops it without restarting between traps. Keep the church and park's individual tracks, The Well on present-day Rheed narration, past dialogue/tavern music, and musical endings. Council and final-choice scenes retain their existing context selection: present narration takes precedence over route music. No engine/plugin code, runtime dependency, campaign state or save-schema changes.

This supersedes only the final-route prototype music in GDD §19.4 and the historical approved-narrative-dialogue-staging audio contract. Original source WAVs remain local in docs/sons; the shipped OGG is self-contained.

## Verification

Implemented and statically verified on 2026-09-30 against baseline 2186224. Structural comparison confirms only the final-route BGM name changed. Forty-four context checks cover route isolation, expedition phases, Council/final choice, all nine narrator passages, tavern return and ending cleanup. Syntax and whitespace checks passed; focused review found no unrelated runtime edits.

The output is 160 seconds, 44100 Hz stereo. Danger's RMS-balancing gain is 0.731917 and the park layer's is 1.0; the combined headroom gain is 0.673109. Full-file decoded peak is 0.848339, below clipping. A one-second decoded segment at 30 seconds independently recovers both source gains (0.487172 and 0.670264), within 0.02 of the intended contributions, confirming simultaneous mixing. Technical report and source hashes are local in `.artifacts/village-mix.json`. OGG SHA-256: `44fb468f06ab49445ca197f51dcda49db6fb7605c71fa68997cccba1262e2216`; CommonEvents SHA-256: `e262e556bd3d2565edb9530eb424ea833d0f9c9da3cfecf4253d0d715078c95c`.

Actual listening, artistic balance acceptance and gameplay remain pending. The previously recorded Windows directed-runner issue remains a limitation; no automated route-playthrough claim. No permanent presentation-only test was added, no browser/server launched and no commit created. Source WAVs were read without changes.

## Delivery and devlog

Keep the runtime mix, focused data change, GDD decision, this contract and the two authoring recipes. Preserve other assets and supplied source collection. Suggested clip: village entry and consecutive traps with both layers together, then a Rheed narration transition. No commit or remote publication requested.

## Subsequent delivery update

The user authorized a combined local commit with final-choice-pressure. Earlier verification hashes and context results above describe their historical candidate, not the final combined data. The current final-choice cue and combined verification are recorded in final-choice-pressure/spec.md. Real listening remains pending; no remote publication requested.
