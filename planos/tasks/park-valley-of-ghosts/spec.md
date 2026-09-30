# The Valley of Ghosts Origin — Parque das Águas Assombradas

## Confirmed request and implementation

The user requested the supplied `(Ambience) The Valley of Ghosts Origin.wav` for the park route, using the same treatment as Danger on the church route: native looping through the traps and route completion, with a two-second smooth opening fade. The GDD identifies the park as `supernatural`.

Convert a local copy to OGG with the same smoothstep gain envelope as church-danger. Preserve duration, stereo, sample rate, pitch and tempo; retain the remainder of the composition. Keep native event volume 35 and player volume preferences. The complete converted track loops, including the softened entrance each time. Despite the pack's Ambience label, this is the selected musical bed on the BGM channel; do not restore the removed ambient effects.

Common Event 67 selects this track only for the supernatural route within its expedition BGM branch. It continues across entry, trap choices, results, retreat confirmation and completion without restarting between calls. Church keeps Danger; final route keeps Dungeon2; return to tavern and later closure narration retain their existing music. No change to engine/plugins, rules, saves, BGS or SE.

This incremental user decision replaces only the park's Dungeon2 prototype selection in GDD §19.4 and the historical approved-narrative-dialogue-staging audio contract. Original WAV remains untouched and local; the runtime consumes the shipped OGG without authoring-tool dependencies.

## Verification

Implemented; focused static checks PASS on 2026-09-30. Thirty context evaluations covered nine expedition phases across church, park and final routes, plus return to tavern, closure narration and ending. Structural comparison against baseline 815ebcf confirms only the intended park BGM branch changed; every other Common Event is unchanged. Syntax, whitespace and focused diff review passed.

The OGG preserves 160 seconds, stereo and 44100 Hz. Decoded output/source RMS ratios in quarter-second windows at 0, 1, 3 and 30 seconds were 0.018, 0.5963, 0.9953 and 1.0015, respectively: reduced attack and preserved later level within lossy Vorbis conversion. Historical pre-narrator-change SHA-256: CommonEvents.json `5acf1d07646863b8240425e08a2642a43329518fb5bd9e2f3fe0e00de7c227b5`; OGG `3292f708e3f4e8373448c222986eb764aa61658cbabce7db1af8fa4f57bbe305`.

Technical waveform validation is separate from real playback and artistic acceptance, which remain pending. The previously identified directed-runner Windows path issue remains documented under opening-the-well; no automated route playthrough is claimed. No browser/server was launched, no permanent presentation test was added and no commit was created.

## Delivery and devlog

Keep the OGG, focused Common Event change, GDD decision, this incremental contract and the two authoring recipes. Other supplied audio stays outside this delivery. Suggested clip: softened park entrance, continuity across two traps, then return to tavern. The user subsequently authorized committing this delivery together with rheed-the-well. Remote publication was not requested. The later narrator change preserves the park selection; final combined context checks and data hash are recorded in rheed-the-well/spec.md.
