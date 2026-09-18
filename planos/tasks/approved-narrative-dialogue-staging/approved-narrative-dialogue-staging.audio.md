---
status: approved
approved_on: 2026-09-18
owner: Áudio / Programação
---

# Audio direction — narrative present and expedition past

Owns RQ-009 and the audio part of RQ-010 in [spec.md](spec.md). D-014 delegates selection to the agent; D-015 supplies the present-day event. The user approved this cue baseline using existing assets as part of the complete spec set; implementation, listening and final mix remain pending.

## Direction and initial selection

The present suggests a public storytelling event: older Rheed, Daratrine's best storyteller, addresses hundreds of creatures, including the player, at Noite da História in a city. Music and restrained audience ambience support reading. The past follows the tavern and the expedition's tension. Do not invent intelligible dialogue, voice acting, a named venue, audience sprites or interactive crowd reactions.

All paths below are relative to `rpg-maker/The Dryland Drowned/audio/`. These exact local Ogg/Vorbis files exist; their headers and durations were inspected. Selection is a prototype baseline based on the local inventory. No listening or in-game mix validation was performed during authoring; descriptive moods below are intended uses, not claims about an audition.

| Context | Initial music | Ambience / effects | Intended role |
| --- | --- | --- | --- |
| Present — older Rheed | `bgm/Town1.ogg` | `bgs/People2.ogg`; `se/Applause1.ogg` at the initial storytelling entrance only | Public gathering and welcome, with audience sound kept behind the reading. |
| Past — tavern, including young Rheed/Ivaí | `bgm/Town3.ogg` | Existing `bgs/People1.ogg` | A distinct gathering within the remembered expedition. |
| Past — expedition and Council | `bgm/Dungeon2.ogg` | Existing location beds: `bgs/Drips.ogg`, `bgs/Wind1.ogg`, `bgs/Darkness.ogg`; preserve relevant local event effects | Separate the expedition's tension from the present audience. |
| Past — endings | Preserve the outcome-specific cues instead of continuing the generic expedition score | Existing `me/Musical1.ogg`, `me/Organ.ogg` and contextual effects where their owning scenes call them | Preserve the chosen outcome's distinct resolution. |

The current shared context event already owns past-location ambience and ending/event cues. Do not replace contextual water/wood/collapse sounds with crowd sounds. Normal interface feedback need not acquire a different sound for each time frame.

## Player-facing transition contract

- Apply temporal audio to the prologue too; the source PR's complete-silence rule is superseded. Older Rheed uses the present context and the direct young-Rheed/Ivaí exchange uses the past tavern context.
- Change the music/ambience with the temporal scene. The present's audience does not remain audible behind past events, and past horror sounds do not continue behind older Rheed by accident.
- Audience applause is a one-time welcome at the opening, not a response to deaths or sacrifices and not an effect repeated on every narrator message or return to the present. It does not add a forced reading pause.
- Preserve player music/ambience/theme/effects levels and mute settings. HIDE, Settings and Continue must not restart one-shot effects merely to restore the screen.
- Preserve native reading speed and seen-text-only FAST. Audio never supplies essential narrative information unavailable in text.

## Native implementation design

Use native BGM/BGS/ME/SE commands in the actual scene/event and existing CE067 context owner. Its queries already expose phase, route, ending and passage; event branches can select the approved temporal context without a new persistent time flag or project audio manager. Consecutive messages in the same context retain the current track; a temporal cut explicitly replaces the incompatible music and ambience. Native replacement is the initial transition behavior, with no forced reading wait or new crossfade system.

Initial event volumes, before the player's Options multiplier: present Town1 45, People2 25, initial Applause1 35; past Town3/Dungeon2 35; existing location BGS 60, ending ME 65 and contextual SE 45 retained. Pitch stays 100 and pan 0. These are delegated prototype mixing values to audition and tune during integration, not final loudness claims. Keep the provider's four volume categories and persisted preferences; do not force user sliders back to defaults.

The welcome applause belongs to the original prologue entrance command, once along that native path. It is not in a recurring CE067 context branch, portrait helper or restore helper. Do not add a campaign flag solely to mark it. Native Continue restores the earned interpreter/checkpoint; an earlier unsaved opening can replay from that earlier point, as described in the programming contract. Settings and HIDE do not restart it or other one-shot effects.

Endings take precedence over generic past music. Stop the generic BGM and inappropriate ambience before the existing outcome-specific ME so the score does not accidentally resume after the theme. Preserve current memorial/epilogue/credit audio unless its incoming cleanup is required to prevent that leak. Temporal music does not accompany menus/title merely because they follow a narrator scene.

## Scope and verification

No new audio library, download, service, generated music or narration recording is required. Keep the local asset licensing/attribution baseline. No new campaign flag or checkpoint is required. The final chosen local files and event mix remain within the user's delegated scope; do not turn cue selection into another permission question.

Integration must verify both temporal transitions, prologue playback, return to preparation, repeated narrator passages, Settings/mute, available Continue checkpoints and ending cue precedence. Technical state/recording checks and actual listening must be reported separately. Existing source evidence for prologue silence cannot validate the new direction. Record final chosen files and mix during implementation, within the delegated local selection scope.

## Aceite do usuário — 2026-09-18

D-020 da [spec](spec.md) aceita o áudio como pronto nesta entrega e dispensa a audição pendente. O usuário fará ajustes posteriores se necessário. As verificações técnicas de buffers, volumes, mute e restauração permanecem válidas; não se registra ouvinte nem julgamento auditivo inexistente. Esta decisão substitui a exigência de escuta como bloqueio de conclusão deste incremento, sem alterar cues, arquivos ou mixagem.
