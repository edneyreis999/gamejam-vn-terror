# Final choice — pressure music

## Confirmed request and selection

The user requested a tense, pressing musical cue while making the final choice, then a commit. Select the supplied `(Tense) Undead Killing Spree.wav` for audition. Selection uses the pack's Tense category; perceived urgency and comfort require listening rather than an asserted artistic verdict. This resolves the pending choice cue in revelation-last-key and GDD §19.4.

The user subsequently requested making this cue softer. Use event volume 18, a three-second smooth entrance, and source attenuation only as needed to cap pre-encoding peaks at 0.50. Preserve pitch, tempo, stereo, duration and player volume controls; verify decoded headroom. Use native looping while the player considers the choice. No timer, auto-selection or gameplay pressure is added.

## Integration

Replace the empty BGM in Common Event 67's final_choice priority branch. Revelation retains The Last Key; village traps retain the simultaneous mix; other routes and narration remain unchanged. Native ending context stops this BGM and retains the existing outcome-specific ME. Original WAVs stay untouched; the shipped OGG is the only new runtime asset. No engine/plugin edits, new dependency or save change.

## Verification and acceptance

Scoped static verification PASS: 31 context/ending cases cover revelation, final choice, routes, earlier narration, tavern and both outcome themes. Structural comparison confirms this increment changes only the final-choice BGM name and volume. Syntax, diff and focused code review passed. The final OGG is 61.714 seconds, stereo 44100 Hz, decoded peak 0.529952 and RMS 0.109927 before event volume. CommonEvents SHA-256: `90b9b566cb4f01fb5c7e572b0273757a6f82e7ede84fb1879fb3f09620db6a53`; OGG: `7c6599bfa3b6965258b85f4251ee3e5dc69b02064d3df30b4bd7b3bb0e247f85`. Actual listening and a full gameplay journey remain pending; the previously recorded directed-runner Windows limitation is not an E2E pass. No permanent presentation-only test added.

## Authorized delivery

Commit this cue together with the preceding village-blended-music and revelation-last-key changes, their necessary OGG assets, focused data/GDD edits and authoring records. Keep docs/sons outside the commit and preserve source tracks. No remote publication requested. Suggested devlog clip: last trap, revelation, tense final-choice screen, then transition to an ending; capture sound. No browser/server launched for static verification.
