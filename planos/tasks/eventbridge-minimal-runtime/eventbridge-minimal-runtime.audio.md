---
status: approved
owner: Áudio / Programação
---

# Audio integration contract

Current expansion: see the [2026-09-14 map-authorship amendment](#map-authorship-expansion--2026-09-14) for the authorized task19–29 scope and retirement contract.

This contract owns RQ-015 and the audio consumer of RQ-005 in the [spec](spec.md). Preserve the current local tracks, volumes, fades and context rules. No new cue, asset or creative audio direction is approved.

CE67 currently reads _dryland.campaign.phase directly before the tavern stage. Replace those direct script conditions with native conditions fed by Bridge queries, after campaign initialization. Public event fields remain the way to change the cue or volume. The transition must not silence startup or replay the ending theme after an unrelated scene return.

The existing Bridge complement stores the current ME descriptor so changing Temas updates an already-playing native buffer. Move that limited integration to the project presentation layer, preserving native AudioManager delegation. It owns no campaign state and chooses no file. Releasing/stopping/replacing a cue clears the descriptor; changing volume must not restart it.

Verify Música, Ambiência, Temas and Efeitos remain independent, with special coverage for ME volume while playing, zero-volume mute and subsequent cues. AUTO/FAST and Options/Continue must not produce duplicate one-shot cues or reset the player's settings. Native event execution owns audio timing; removed visual replay must not be replaced by replaying audio commands.

Use state/buffer inspection for technical assertions and actual audible playback for timing/volume experience. A filename, hash or decoded asset is not evidence that a person heard the result. No recording or new runtime audio test has been made during spec authoring; see [verification](verification.md).

## Adopted branch amendment — ADR-G001 / ADR-G002

**Architecture and organization accepted on 2026-09-14 under [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md).** The [original experiment](adrs/adr-005.md) is historical. Other human and creative judgments retain their separate status in verification.md. The experiment adds native map transfers without a new audio cue or map autoplay. Preserve tavern People1 ambience; check continuity and no unintended replay on return. Existing audio-content/human acceptance stays pending. See [ADR-005](adrs/adr-005.md), spec EX-001–006 and verification EXV-001–004.


## Map-authorship expansion — 2026-09-14

**Execution authorized; current implementation and sensor status are in [the task graph](tasks.md) and [verification](verification.md).** [ADR-006](adrs/adr-006.md), [spec MA-001–011](spec.md#map-authorship-expansion--2026-09-14) and [verification MAV-001–014](verification.md#map-authorship-expansion--2026-09-14) supersede conflicting earlier location/entry assumptions for this scope. Previous delivery and creative approvals retain their own scope.

MA-010 preserves the current native cue selection and volume behavior while map ownership changes. H2–H8 entry/return must keep the tavern ambience without accidental replay; local campaign presentation must keep intentional encounter, sacrifice, reward and ending cue ordering. No new BGM/BGS/ME/SE, autoplay setting, audio asset or audio direction is introduced.

Keep CE067 and other cue helpers while referenced. Check current playback across new transfers and Options/Continue with native integration plus the directed MAS-06 observations; source filenames or hashes alone do not prove continuity. Existing cue/content acceptance remains separate from a listener's judgment, recorded through task16/MAV-014. Unchanged adapter/assets may reuse equivalent tests; changed event ordering invalidates its dependent observations.
