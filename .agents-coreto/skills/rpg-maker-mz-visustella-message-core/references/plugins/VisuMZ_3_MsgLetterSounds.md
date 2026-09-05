# VisuMZ_3_MsgLetterSounds

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_MsgLetterSounds`
- Contract: [RPG Maker MZ] [Tier 3] [MsgLetterSounds]
- Required plugins: VisuMZ_1_MessageCore
- Declared load order: after VisuMZ_1_MessageCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | — | — | — | — | — | — |
| MessageSounds | — | — | — | — | — | — |
| ATTENTION | — | — | — | — | — | — |
| BreakSettings | — | — | — | — | — | — |
| Enable | — | — | — | — | — | — |
| EnableSound:eval | — | — | — | — | — | — |
| BlackList:arraystr | — | — | — | — | — | — |
| Default | — | — | — | — | — | — |
| name:str | — | — | — | — | — | — |
| Interval:num | — | — | — | — | — | — |
| volume:num | — | — | — | — | — | — |
| VolVariance:num | — | — | — | — | — | — |
| pitch:num | — | — | — | — | — | — |
| PitchVariance:num | — | — | — | — | — | — |
| pan:num | — | — | — | — | — | — |
| PanVariance:num | — | — | — | — | — | — |
| BreakEnd1 | — | — | — | — | — | — |
| End Of | — | — | — | — | — | — |
| BreakEnd2 | — | — | — | — | — | — |

## Plugin commands

### Message Sound: Change

- Command ID: `MsgSoundChangeMessageSound`
- Description: Change the settings to the Message Sound settings below.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| name:str | Filename | file | Cursor3 | — | Filename of the sound effect played. |
| Interval:num | Interval | number | 2 | — | Interval the sound effect from being played between how many characters? |
| volume:num | Volume | number | 90 | — | Volume of the sound effect played. |
| VolVariance:num | Variance | number | 10 | — | When playing the sound effect, vary the volume by how much? |
| pitch:num | Pitch | number | 100 | — | Pitch of the sound effect played. |
| PitchVariance:num | Variance | number | 20 | — | When playing the sound effect, vary the pitch by how much? |
| pan:num | Pan | — | 0 | — | Pan of the sound effect played. |
| PanVariance:num | Variance | number | 5 | — | When playing the sound effect, vary the pan by how much? @ -------------------------------------------------------------------------- |

### Message Sound: Reset

- Command ID: `MsgSoundResetMessageSound`
- Description: Resets the settings to the Plugin Parameters settings. @ --------------------------------------------------------------------------

No arguments are declared.

### System: Enable/Disable Letter Sounds

- Command ID: `SystemEnableMessageSounds`
- Description: Enables/disables Message Letter Sounds for the game.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | -------------------------- | number | ---------------------------------- | — | When playing the sound effect, vary the pan by how much? |

## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin enables your messages to play sound effects per letter (or at
certain intervals of letters) whenever they appear in a message window.
Letter sounds can be used to add emotion, character, and feeling to scenes
and provide audio feedback to the activity going on in the screen.

Features include all (but not limited to) the following:

* Declare which message letter sounds, their volume, pitch, and pan.
* Add variance to the volume, pitch, and pan to produce more speech-like
behaviors.
* Blacklist certain letters from having any sounds played at all.
* Change the sounds through Plugin Commands and/or text codes to alter the
feeling of a message.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_1_MessageCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Extra Features

There are some extra features found if other VisuStella MZ plugins are found
present in the Plugin Manager list.

---

VisuMZ_1_OptionsCore

An added option to the Audio category of the default Options Core settings
allow players to turn on/off the Message Letter Sounds in case they may find
them to be unpleasing.

---

Available Text Codes

The following are text codes that have been added through this plugin. These
text codes will not work with your game if the plugin is OFF or not present.

---

--------------------------   -----------------------------------------------
Text Code                    Effect (Message Window Only)
--------------------------   -----------------------------------------------
<Letter Sound On>            Turns on the Message Letter Sounds.
<Letter Sound Off>           Turns off the Message letter Sounds.

\LetterSoundName<filename>   Changes SFX played to 'filename'. Do not use or
insert the file extension. Case sensitive.
\LetterSoundVolume[x]        Changes SFX volume to x value.
\LetterSoundPitch[x]         Changes SFX pitch to x value.
\LetterSoundPan[x]           Changes SFX pan to x value.
\LetterSoundVolumeVar[x]     Changes SFX volume variance to x value.
\LetterSoundPitchVar[x]      Changes SFX pitch variance to x value.
\LetterSoundPanVar[x]        Changes SFX pan variance to x value.

---

For those who want to use shorter text codes:

---

-------------   ------------------------------------------------------------
Text Code       Effect (Message Window Only)
-------------   ------------------------------------------------------------

\LSON           Turns on the Message Letter Sounds.
\LSOFF          Turns off the Message letter Sounds.

\LSN<filename>  Changes SFX played to 'filename'. Do not use or insert the
file extension. Case sensitive.
\LSV[x]         Changes SFX volume to x value.
\LSPI[x]        Changes SFX pitch to x value.
\LSPA[x]        Changes SFX pan to x value.
\LSVV[x]        Changes SFX volume variance to x value.
\LSPIV[x]       Changes SFX pitch variance to x value.
\LSPAV[x]       Changes SFX pan variance to x value.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Message Sound Plugin Commands ===

---

Message Sound: Change
- Change the settings to the Message Sound settings below.

Filename:
- Filename of the sound effect played.

Interval:
- Interval the sound effect from being played between how many characters?

Volume:
- Volume of the sound effect played.

Variance:
- When playing the sound effect, vary the volume by how much?

Pitch:
- Pitch of the sound effect played.

Variance:
- When playing the sound effect, vary the pitch by how much?

Pan:
- Pan of the sound effect played.

Variance:
- When playing the sound effect, vary the pan by how much?

---

Message Sound: Reset
- Resets the settings to the Plugin Parameters settings.

---

=== System Plugin Commands ===

---

System: Enable/Disable Letter Sounds
- Enables/disables Message Letter Sounds for the game.

Enable/Disable?:
- Enables/disables Message Letter Sounds for the game.

---

Plugin Parameters: General Settings

These are the settings that determine the default settings for the letter
sound as well as default enabling of the sounds. There is also a blacklist
here to let you decide which letter characters will not play sounds.

---

Enable

Default Enable?:
- Enable Letter Sounds by default?

Blacklisted Letters:
- This is a list of individual characters that are blacklisted from having
sounds play.

---

Default Sound Settings

Filename:
- Filename of the sound effect played.

Interval:
- Interval the sound effect from being played between how many characters?

Volume:
- Volume of the sound effect played.

Variance:
- When playing the sound effect, vary the volume by how much?

Pitch:
- Pitch of the sound effect played.

Variance:
- When playing the sound effect, vary the pitch by how much?

Pan:
- Pan of the sound effect played.

Variance:
- When playing the sound effect, vary the pan by how much?

---
```
