---
status: approved
owner: Áudio / Programação
---

# Audio integration contract

This contract owns RQ-015 and the audio consumer of RQ-005 in the [spec](spec.md). Preserve the current local tracks, volumes, fades and context rules. No new cue, asset or creative audio direction is approved.

CE67 currently reads _dryland.campaign.phase directly before the tavern stage. Replace those direct script conditions with native conditions fed by Bridge queries, after campaign initialization. Public event fields remain the way to change the cue or volume. The transition must not silence startup or replay the ending theme after an unrelated scene return.

The existing Bridge complement stores the current ME descriptor so changing Temas updates an already-playing native buffer. Move that limited integration to the project presentation layer, preserving native AudioManager delegation. It owns no campaign state and chooses no file. Releasing/stopping/replacing a cue clears the descriptor; changing volume must not restart it.

Verify Música, Ambiência, Temas and Efeitos remain independent, with special coverage for ME volume while playing, zero-volume mute and subsequent cues. AUTO/FAST and Options/Continue must not produce duplicate one-shot cues or reset the player's settings. Native event execution owns audio timing; removed visual replay must not be replaced by replaying audio commands.

Use state/buffer inspection for technical assertions and actual audible playback for timing/volume experience. A filename, hash or decoded asset is not evidence that a person heard the result. No recording or new runtime audio test has been made during spec authoring; see [verification](verification.md).
