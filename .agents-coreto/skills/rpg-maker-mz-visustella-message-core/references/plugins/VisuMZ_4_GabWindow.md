# VisuMZ_4_GabWindow

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_4_GabWindow`
- Contract: [RPG Maker MZ] [Tier 4] [GabWindow]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| GabWindow | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| General:struct | General Settings | — | struct&lt;General&gt; | {"General":"","AntiRepeat:eval":"true","CenterGraphics:eval":"true","Fade":"","FadeRate:num":"16","FadeDirection:str":"None","Font":"","GabFontName:str":"","GabFontSize:num":"28","Sprites":"","Character":"","CharacterXPos:num":"36","CharacterYPos:num":"60","SVActor":"","SvActorXPos:num":"44","SvActorYPos:num":"68","Waiting":"","BaseWaitTime:num":"90","TimePerCharacter:num":"4","JavaScript":"","OnDisplayJS:func":"\"// Declare Constants\\nconst gabWindow = this;\\nconst lastGab = arguments\[0\];\\n\\n// Perform Actions\\n\"","OnFinishJS:func":"\"// Declare Constants\\nconst gabWindow = this;\\nconst lastGab = arguments\[0\];\\n\\n// Perform Actions\\n\""} | — | General settings regarding the Gab Window. |
| Map:struct | Map Settings | — | struct&lt;Map&gt; | {"MapYLocation:num":"72","MapDimColor1:str":"rgba(0, 0, 0, 0.6)","MapDimColor2:str":"rgba(0, 0, 0, 0)"} | — | Settings related to the gab window while in the map scene. |
| Battle:struct | Battle Settings | — | struct&lt;Battle&gt; | {"BattleYLocation:num":"108","BattleDimColor1:str":"rgba(0, 0, 0, 0.6)","BattleDimColor2:str":"rgba(0, 0, 0, 0)"} | — | Settings related to the gab window while in the battle scene. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| AntiRepeat:eval | Anti-Repeat | General | boolean | true | — | Stops gabs of the same settings from being queued. |
| CenterGraphics:eval | Center Graphics | General | boolean | true | — | Centers graphics vertically if there are multiple lines. |
| Fade | — | — | — | — | — | — |
| FadeRate:num | Fade Rate | Fade | number | 16 | — | How fast the gab window fades away. Default: 16 |
| FadeDirection:str | Fade Direction | Fade | select | None | None; Up; Down; Left; Right | The direction to move the window in when fading out. |
| Font | — | — | — | — | — | — |
| GabFontName:str | Gab Font Name | Font | — | — | — | The font name used for the text of the Gab Window Leave empty to use the default game's font. |
| GabFontSize:num | Gab Font Size | Font | number | 28 | — | The font size used for the text of the Gab Window. Default: 28 |
| Sprites | — | — | — | — | — | — |
| Character | Character Sprites | Sprites | — | — | — | — |
| CharacterXPos:num | X Position | Character | number | 36 | — | X position of the character. Default: 36 |
| CharacterYPos:num | Y Position | Character | number | 60 | — | Y position of the character. Default: 60 |
| SVActor | Sideview Sprites | Sprites | — | — | — | — |
| SvActorXPos:num | X Position | SVActor | number | 44 | — | X position of the Sideview Actor. Default: 44 |
| SvActorYPos:num | Y Position | SVActor | number | 68 | — | Y position of the Sideview Actor. Default: 68 |
| Waiting | — | — | — | — | — | — |
| BaseWaitTime:num | Base Wait Time | Waiting | number | 90 | — | Minimum frames the Gab Window stays visible. Default: 90 |
| TimePerCharacter:num | Time Per Character | Waiting | number | 4 | — | Frames added per Text Character. Default: 4 |
| JavaScript | — | — | — | — | — | — |
| OnDisplayJS:func | JS: On Display | OnDisplay | note | "// Declare Constants\nconst gabWindow = this;\nconst lastGab = arguments\[0\];\n\n// Perform Actions\n" | — | Runs this code once this Gab Window shows up. This applies to every single gab. |
| OnFinishJS:func | JS: On Finish | OnFinish | note | "// Declare Constants\nconst gabWindow = this;\nconst lastGab = arguments\[0\];\n\n// Perform Actions\n" | — | Runs this code once this Gab Window finishes. This applies to every single gab. |

### Struct: Map

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| MapYLocation:num | Y Location | — | number | 72 | — | This is the Y location of the Gab Window. Default: 72 |
| MapDimColor1:str | Dim Color 1 | — | — | rgba(0, 0, 0, 0.6) | — | This is the dim color 1 used for maps. Default: rgba(0, 0, 0, 0.6) |
| MapDimColor2:str | Dim Color 2 | — | — | rgba(0, 0, 0, 0) | — | This is the dim color 2 used for maps. Default: rgba(0, 0, 0, 0) |

### Struct: Battle

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BattleYLocation:num | Y Location | — | number | 108 | — | This is the Y location of the Gab Window. Default: 108 |
| BattleDimColor1:str | Dim Color 1 | — | — | rgba(0, 0, 0, 0.6) | — | This is the dim color 1 used for battles. Default: rgba(0, 0, 0, 0.6) |
| BattleDimColor2:str | Dim Color 2 | — | — | rgba(0, 0, 0, 0) | — | This is the dim color 2 used for battles. Default: rgba(0, 0, 0, 0) |

### Struct: Override

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DimColor | Dim Color | — | — | — | — | — |
| DimColor1:str | Dim Color 1 | DimColor | — | — | — | The dim color 1 to use for this Gab Window. Format: rgba(red, green, blue, alpha) |
| DimColor2:str | Dim Color 2 | DimColor | — | — | — | The dim color 2 to use for this Gab Window. Format: rgba(red, green, blue, alpha) |
| Fade | — | — | — | — | — | — |
| FadeRate:num | Fade Rate | Fade | number | — | — | How fast this Gab Window fades away. |
| FadeDirection:str | Fade Direction | Fade | select | — | None; Up; Down; Left; Right | The direction this Gab Window fades out in. |
| Font | — | — | — | — | — | — |
| FontName:str | Font Name | Font | — | — | — | The font name to use for this Gab Window. |
| FontSize:num | Font Size | Font | number | — | — | The font size to use for this Gab Window. |
| Position | — | — | — | — | — | — |
| YLocation:num | Y Location | Position | number | — | — | The Y coordinate this Gab Window will appear in. Ignore if you are using a locked sprite position. |
| ActorID:num | Actor ID | Position | actor | 0 | — | The ID of the actor to display this Gab Window above. For Map/Battle. |
| PartyIndex:num | Party Index | ActorID:num | — | -1 | — | Index of the party member to display Gab Window above. For Map/Battle. Index values start at 0. Ignore under 0. |
| EnemyIndex:num | Enemy Index | Position | — | -1 | — | Index of an enemy battler to display Gab Window above. Battle only. Index values start at 0. Ignore under 0. |
| EventID:num | Event ID | Position | number | 0 | — | The ID of the event to display this Gab Window above. Map only. |
| OnDisplay | On Display | — | — | — | — | — |
| BypassAntiRepeat:eval | Bypass Anti-Repeat | OnDisplay | boolean | false | — | Allows this gab to bypass the Anti-Repeat settings. |
| SoundFilename:str | Sound Filename | OnDisplay | file | — | — | The filename of the SE to play when the Gab Window shows. |
| SoundVolume:num | Volume | SoundFilename:str | number | 90 | — | Volume of the sound effect played. |
| SoundPitch:num | Pitch | SoundFilename:str | number | 100 | — | Pitch of the sound effect played. |
| SoundPan:num | Pan | SoundFilename:str | — | 0 | — | Pan of the sound effect played. |
| OnDisplayJS:func | JS: On Display | OnDisplay | note | — | — | Runs this code once this Gab Window shows up. |
| OnFinish | On Finish | — | — | — | — | — |
| GabSwitch:num | Gab Switch | OnFinish | switch | — | — | The specified switch will be turned ON when the Gab Window finishes. |
| OnFinishJS:func | JS: On Finish | OnFinish | note | — | — | Runs this code once this Gab Window finishes. |
| Waiting | — | — | — | — | — | — |
| WaitTime:num | Wait Time | Waiting | number | — | — | The number of frames this Gab Window stays visible. |
| TimePerCharacter:num | Time Per Character | Waiting | number | — | — | Frames added per Text Character in this Gab Window. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Gab: Text Only

- Command ID: `GabTextOnly`
- Description: Show a Gab Window with the specified settings. Only text is displayed.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Face (Any)

- Command ID: `GabTextFaceAny`
- Description: Show a Gab Window with the specified settings. Any face graphic can be displayed next to text.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| Filename:str | Filename | file | Actor1 | — | The filename of the face graphic to use. |
| ID:num | Index | number | 0 | — | This is the index of the face graphic. Index values start at 0. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Face (Actor)

- Command ID: `GabTextFaceActor`
- Description: Show a Gab Window with the specified settings. Pick an actor's face graphic to show with it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ID:num | Actor ID | actor | 1 | — | This is the ID of the actor you want the face graphic of. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Face (Party)

- Command ID: `GabTextFaceParty`
- Description: Show a Gab Window with the specified settings. Pick a party member's face graphic to show with it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ID:num | Party Member Index | number | 0 | — | This is the index of the party member you want the face graphic of. Index values start at 0. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Map Sprite (Any)

- Command ID: `GabTextSpriteAny`
- Description: Show a Gab Window with the specified settings. Any map sprite can be displayed next to text.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| Filename:str | Filename | file | Actor1 | — | The filename of the sprite graphic to use. |
| ID:num | Index | number | 0 | — | This is the index of the sprite graphic. Index values start at 0. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Map Sprite (Actor)

- Command ID: `GabTextSpriteActor`
- Description: Show a Gab Window with the specified settings. Pick an actor's sprite graphic to show with it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ID:num | Actor ID | actor | 1 | — | This is the ID of the actor you want the map sprite of. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Map Sprite (Party)

- Command ID: `GabTextSpriteParty`
- Description: Show a Gab Window with the specified settings. Pick a party member's sprite graphic to show with it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ID:num | Party Member Index | number | 0 | — | This is the index of the party member you want the map sprite of. Index values start at 0. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Sideview Actor (Any)

- Command ID: `GabTextSvActorAny`
- Description: Show a Gab Window with the specified settings. Any Sideview Actor can be displayed next to text.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| Filename:str | Filename | file | Actor1_1 | — | The filename of the Sideview Actor graphic to use. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Sideview Actor (Actor)

- Command ID: `GabTextSvActorActor`
- Description: Show a Gab Window with the specified settings. Pick an actor's sideview graphic to show with it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ID:num | Actor ID | actor | 1 | — | This is the ID of the actor you want the sideview graphic of. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Sideview Actor (Party)

- Command ID: `GabTextSvActorParty`
- Description: Show a Gab Window with the specified settings. Pick a party member's sideview graphic to show with it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| ID:num | Party Member Index | number | 0 | — | This is the index of the party member you want the sideview graphic of. Index values start at 0. |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### Gab: Text + Picture

- Command ID: `GabTextPicture`
- Description: Show a Gab Window with the specified settings. Any picture graphic can be displayed next to text.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:json | Text | note | "Hello!" | — | The text to be shown in the Gab Window. |
| Filename:str | Filename | file | Untitled | — | The filename of the face graphic to use. |
| Stretched:eval | Stretch Picture | boolean | true | — | Stretch the picture to fit the window? |
| ForceGab:eval | Force Gab? | boolean | false | — | Forced gabs will clear other gabs and display immediately. |
| Override:struct | Optional Settings | struct&lt;Override&gt; | — | — | Change the settings you want to override with this gab. Blank settings will use default Plugin Parameter settings. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_System`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### System: Clear Gabs

- Command ID: `ClearGab`
- Description: Clears out the current Gab and any which are queued. @ --------------------------------------------------------------------------

No arguments are declared.

### System: Wait For Gab Completion

- Command ID: `WaitForGab`
- Description: Causes the game to wait until all gabs are finished playing. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

Sometimes there's random jibber jabber that does not warrant a message box.
The Gab Window fulfills that jibber jabber by placing such text outside of
the message window box and at the corner of the screen. The gab text will
appear briefly and then disappear, not showing up again until the gab text
is updated with something else.

Features include all (but not limited to) the following:

* Create gab text that does not interrupt gameplay.
* Gabs can be queued together to create a streamlined conversation.
* Gabs can play sound effects when played, allowing you to attach voices to
them if desired.
* Multiple lines can be used per gab to display more text.
* Attach faces, map sprites, sideview sprites, and even pictures to gabs.
* Gabs can be automatically positioned above specific events, actors, and
even enemies.
* Turn on switches after a gab is completed.
* Run custom JavaScript code upon displaying or finish a gab.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 4 ------

This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Clearing Up Misunderstandings

There are some misunderstandings regarding gabs.

---

Gabs are NOT part of the Event List

For events with Show Text messages, the game goes through the event list one
by one until it reaches the end. This does not apply to Gabs. The Plugin
Commands that add Gabs add them into a queue outside of the event list and
therefore, any events that may be intended for gabs to be finished will
launch immediately unless there are event commands or plugin commands that
will cause the event list to wait for them.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

=== Gab Plugin Commands ===

---

Gab: Text Only
- Show a Gab Window with the specified settings.

Text:
- The text to be shown in the Gab Window.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Gab: Text + Face (Any)
- Show a Gab Window with the specified settings.
- Any face graphic can be displayed next to text.

Text:
- The text to be shown in the Gab Window.

Filename:
- The filename of the face graphic to use.

Index:
- This is the index of the face graphic.
- Index values start at 0.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Face (Actor)
- Show a Gab Window with the specified settings.
- Pick an actor's face graphic to show with it.

Text:
- The text to be shown in the Gab Window.

Actor ID:
- This is the ID of the actor you want the face graphic of.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Face (Party)
- Show a Gab Window with the specified settings.
- Pick a party member's face graphic to show with it.

Text:
- The text to be shown in the Gab Window.

Party Member Index:
- This is the index of the party member you want the face graphic of.
- Index values start at 0.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Map Sprite (Any)
- Show a Gab Window with the specified settings.
- Any map sprite can be displayed next to text.

Text:
- The text to be shown in the Gab Window.

Filename:
- The filename of the sprite graphic to use.

Index:
- This is the index of the sprite graphic.
- Index values start at 0.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Map Sprite (Actor)
- Show a Gab Window with the specified settings.
- Pick an actor's sprite graphic to show with it.

Text:
- The text to be shown in the Gab Window.

Actor ID:
- This is the ID of the actor you want the map sprite of.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Map Sprite (Party)
- Show a Gab Window with the specified settings.
- Pick a party member's sprite graphic to show with it.

Text:
- The text to be shown in the Gab Window.

Party Member Index:
- This is the index of the party member you want the map sprite of.
- Index values start at 0.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Sideview Actor (Any)
- Show a Gab Window with the specified settings.
- Any Sideview Actor can be displayed next to text.

Text:
- The text to be shown in the Gab Window.

Filename:
- The filename of the Sideview Actor graphic to use.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Sideview Actor (Actor)
- Show a Gab Window with the specified settings.
- Pick an actor's sideview graphic to show with it.

Text:
- The text to be shown in the Gab Window.

Actor ID:
- This is the ID of the actor you want the sideview graphic of.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Sideview Actor (Party)
- Show a Gab Window with the specified settings.
- Pick a party member's sideview graphic to show with it.

Text:
- The text to be shown in the Gab Window.

Party Member Index:
- This is the index of the party member you want the sideview graphic of.
- Index values start at 0.

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

Gab: Text + Picture
- Show a Gab Window with the specified settings.
- Any picture graphic can be displayed next to text.

Text:
- The text to be shown in the Gab Window.

Filename:
- The filename of the face graphic to use.

Stretch Picture:
- Stretch the picture to fit the window?

Force Gab?:
- Forced gabs will clear other gabs and display immediately.

Optional Settings:
- Change the settings you want to override with this gab.
Blank settings will use default Plugin Parameter settings.

---

=== Optional Settings ===

These settings appear in the above Gab Plugin Commands. Opening up the
Optional Settings will yield the following:

---

DimColor

Dim Color 1:
Dim Color 2:
- The dim colors to use for this Gab Window.
- Format: rgba(red, green, blue, alpha)

---

Fade

Fade Rate:
- How fast this Gab Window fades away.

Fade Direction:
- The direction this Gab Window fades out in.

---

Font

Font Name:
- The font name to use for this Gab Window.

Font Size:
- The font size to use for this Gab Window.

---

Position

Y Location:
- The Y coordinate this Gab Window will appear in.
- Ignore if you are using a locked sprite position.

Actor ID:
- The ID of the actor to display this Gab Window above.
- For Map/Battle.

Party Index:
- Index of the party member to display Gab Window above.
- For Map/Battle. Index values start at 0. Ignore under 0.

Enemy Index:
- Index of an enemy battler to display Gab Window above.
- Battle only. Index values start at 0. Ignore under 0.

Event ID:
- The ID of the event to display this Gab Window above.
- Map only.

---

On Display

Bypass Anti-Repeat:
- Allows this gab to bypass the Anti-Repeat settings.

Sound Filename:
- The filename of the SE to play when the Gab Window shows.

Volume:
- Volume of the sound effect played.

Pitch:
- Pitch of the sound effect played.

Pan:
- Pan of the sound effect played.

JS: On Display:
- Runs this code once this Gab Window shows up.

---

On Finish

Gab Switch:
- The specified switch will be turned ON when the Gab Window finishes.

JS: On Finish:
- Runs this code once this Gab Window finishes.

---

Waiting

Wait Time:
- The number of frames this Gab Window stays visible.

Time Per Character:
- Frames added per Text Character in this Gab Window.

---

=== System Plugin Commands ===

---

System: Clear Gabs
- Clears out the current Gab and any which are queued.

---

System: Wait For Gab Completion
- Causes the game to wait until all gabs are finished playing.

---

Plugin Parameters: General Settings

General settings regarding the Gab Window.

---

General

Anti-Repeat:
- Stops gabs of the same settings from being queued.

Center Graphics:
- Centers graphics vertically if there are multiple lines.

---

Fade

Fade Rate:
- How fast the gab window fades away.

Fade Direction:
- The direction to move the window in when fading out.

---

Font

Gab Font Name:
- The font name used for the text of the Gab Window
- Leave empty to use the default game's font.

Gab Font Size:
- The font size used for the text of the Gab Window.
- Default: 28

---

Sprites > Character Sprites

X Position:
- X position of the character.

Y Position:
- Y position of the character.

---

Sprites > Sideview Sprites

X Position:
- X position of the Sideview Actor.

Y Position:
- Y position of the Sideview Actor.

---

Waiting

Base Wait Time:
- Minimum frames the Gab Window stays visible.
- Default: 90

Time Per Character:
- Frames added per Text Character.
- Default: 4

---

JavaScript

JS: On Display:
- Runs this code once this Gab Window shows up.
- This applies to every single gab.

JS: On Finish:
- Runs this code once this Gab Window finishes.
- This applies to every single gab.

---

Plugin Parameters: Map Settings

Settings related to the gab window while in the map scene.

---

Map

Y Location:
- This is the Y location of the Gab Window.

Dim Color 1:
Dim Color 2:
- These are the dim colors used for maps.
- Format: rgba(red, green, blue, alpha)

---

Plugin Parameters: Battle Settings

Settings related to the gab window while in the battle scene.

---

Battle

Y Location:
- This is the Y location of the Gab Window.

Dim Color 1:
Dim Color 2:
- These are the dim colors used for battles.
- Format: rgba(red, green, blue, alpha)

---
```
