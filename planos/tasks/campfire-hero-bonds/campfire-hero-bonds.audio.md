---
status: draft
owner: Audio / user
---

# Camp audio contract

Owns RQ-010. The user selected fire alone for camp, with no new music or assets. Implement through native audio commands and the existing context event; no new audio engine.

- Older-Rheed arrival retains its current narration audio context.
- At transition to the pictured camp, fade BGM and prior BGS out over one second, then loop the existing `audio/bgs/Fire1.ogg` at authored volume 25, pitch 100, pan 0 as the initial mix proposal. Native BGS configuration scales that volume.
- Camp free interaction, hero conversations and grief share that fire bed; entering a hero's map with camp context must not trigger tavern music.
- On Continue, stop fire and restore the selected destination's current music/ambience through the existing context owner. On retreat, restore the tavern context. Avoid overlapping loops or accumulating effects.
- Preserve volume options, mute, focus/background behavior and native save/load audio restoration. No custom WebAudio management.

Fire1 and the initial mix must be heard during implementation; this spec's file selection is not listening evidence. If the existing file's sound is unsuitable, return the concrete candidate to the user for audio review, not a remote download or a generated replacement. Narration, dialogue readability and grief should remain comfortable with sound off; no information is audio-only.

Inspect arrival, uninterrupted conversation, Options mute, candidate reload and both exits in one representative directed session. Verify actual audible transitions as well as requested audio state. Human listening remains pending.
