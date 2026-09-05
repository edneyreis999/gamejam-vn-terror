# VisuMZ_3_ActSeqCamera

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_ActSeqCamera`
- Contract: [RPG Maker MZ] [Tier 3] [ActSeqCamera]
- Required plugins: VisuMZ_0_CoreEngine, VisuMZ_1_BattleCore
- Declared load order: after VisuMZ_1_BattleCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| ActSeqCamera | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Options:struct | Options Menu | — | struct&lt;Options&gt; | {"AddOption:eval":"true","AdjustRect:eval":"true","OptionsName:str":"Battle Camera"} | — | Settings for the Options Menu |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Options

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AddOption:eval | Add Option? | Options | boolean | true | — | Add the Battle Camera options to the Options menu? |
| AdjustRect:eval | Adjust Window Height | Options | boolean | true | — | Automatically adjust the options window height? |
| OptionsName:str | Options Name | Options | — | Battle Camera | — | Command name of the option. |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin adds new Action Sequences functions to the VisuStella MZ
Battle Core plugin to give you, the game dev, control over the battle camera
and zoom functions.

Features include all (but not limited to) the following:

* Attach the camera to a specific point on the screen.
* Attach the camera to a specific target(s) on the screen.
* Pan the camera to be off center using the offset functions.
* Remove camera clamping to let the camera go out of bounds.
* Set the camera zoom level as you want.
* Tilt the camera by adjust the angle.
* New Options added to let the player turn on/off the battle camera.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

- VisuMZ_0_CoreEngine
- VisuMZ_1_BattleCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Spriteset Position Rewrite

- The Spriteset_Battle function for updatePosition needed to be rewritten in
order to allow all the new features and functions added by the battle camera
and zoom.

- Camera tricks like zooming, panning, and tilting will be reset during the
input phase to ensure the player is able to see the whole battlefield.

- The player has the option to turn off the battle camera effects. If they
choose to turn it off, then all of this plugin's effects will be disabled
until they turn it back on. This is to give players control over how the
game visually appears in case they have motion sickness.

---

Action Sequence - Plugin Commands

The following are Action Sequence Plugin Commands that have been added with
this plugin. These are accessible from the Battle Core plugin (not this one)
in order to keep all the Action Sequences in place.

Once again, these plugin commands are only accessible through the Battle
Core plugin and not this one! Make sure you have the most update to date
version of the Battle Core for them.

---

=== Action Sequences - Angle (Camera) ===

These action sequences allow you to have control over the camera angle.

---

ANGLE: Change Angle
- Changes the camera angle.
- Requires VisuMZ_3_ActSeqCamera!

Angle:
- Change the camera angle to this many degrees.

Duration:
- Duration in frames to change camera angle.

Angle Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Angle?:
- Wait for angle changes to complete before performing next command?

---

ANGLE: Reset Angle
- Reset any angle settings.
- Requires VisuMZ_3_ActSeqCamera!

Duration:
- Duration in frames to reset camera angle.

Angle Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Angle?:
- Wait for angle changes to complete before performing next command?

---

ANGLE: Wait For Angle
- Waits for angle changes to complete before performing next command.
- Requires VisuMZ_3_ActSeqCamera!

---

=== Action Sequences - Camera Control ===

These Action Sequences are battle camera-related.

---

CAMERA: Clamp ON/OFF
- Turns battle camera clamping on/off.
- Requires VisuMZ_3_ActSeqCamera!

Setting:
- Turns camera clamping on/off.

---

CAMERA: Focus Point
- Focus the battle camera on a certain point in the screen.
- Requires VisuMZ_3_ActSeqCamera!

X Coordinate:
- Insert the point to focus the camera on.
- You may use JavaScript code.

Y Coordinate:
- Insert the point to focus the camera on.
- You may use JavaScript code.

Duration:
- Duration in frames for camera focus change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Focus Target(s)
- Focus the battle camera on certain battler target(s).
- Requires VisuMZ_3_ActSeqCamera!

Targets:
- Select unit(s) to focus the battle camera on.

Duration:
- Duration in frames for camera focus change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Offset
- Offset the battle camera from the focus target.
- Requires VisuMZ_3_ActSeqCamera!

Offset X:
- How much to offset the camera X by.
- Negative: left. Positive: right.

Offset Y:
- How much to offset the camera Y by.
- Negative: up. Positive: down.

Duration:
- Duration in frames for offset change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Reset
- Reset the battle camera settings.
- Requires VisuMZ_3_ActSeqCamera!

Reset Focus?:
- Reset the focus point?

Reset Offset?:
- Reset the camera offset?

Duration:
- Duration in frames for reset change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Wait For Camera
- Waits for camera changes to complete before performing next command.
- Requires VisuMZ_3_ActSeqCamera!

---

=== Action Sequences - Skew (Camera) ===

These action sequences allow you to have control over the camera skew.

---

SKEW: Change Skew
- Changes the camera skew.
- Requires VisuMZ_3_ActSeqCamera!

Skew X:
- Change the camera skew X to this value.

Skew Y:
- Change the camera skew Y to this value.

Duration:
- Duration in frames to change camera skew.

Skew Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Skew?:
- Wait for skew changes to complete before performing next command?

---

SKEW: Reset Skew
- Reset any skew settings.
- Requires VisuMZ_3_ActSeqCamera!

Duration:
- Duration in frames to reset camera skew.

Skew Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Skew?:
- Wait for skew changes to complete before performing next command?

---

SKEW: Wait For Skew
- Waits for skew changes to complete before performing next command.
- Requires VisuMZ_3_ActSeqCamera!

---

=== Action Sequences - Zoom (Camera) ===

These Action Sequences are zoom-related.

---

ZOOM: Change Scale
- Changes the zoom scale.
- Requires VisuMZ_3_ActSeqCamera!

Scale:
- The zoom scale to change to.

Duration:
- Duration in frames to reset battle zoom.

Zoom Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Zoom?
- Wait for zoom changes to complete before performing next command?

---

ZOOM: Reset Zoom
- Reset any zoom settings.
- Requires VisuMZ_3_ActSeqCamera!

Duration:
- Duration in frames to reset battle zoom.

Zoom Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Zoom?
- Wait for zoom changes to complete before performing next command?

---

ZOOM: Wait For Zoom
- Waits for zoom changes to complete before performing next command.
Requires VisuMZ_3_ActSeqCamera!

---

Plugin Parameters: Options Menu Settings

These plugin parameters add a new options command in order to let the player
decide if they want the battle camera ON or OFF.

The player has the option to turn off the battle camera effects. If they
choose to turn it off, then all of this plugin's effects will be disabled
until they turn it back on. This is to give players control over how the
game visually appears in case they have motion sickness.

---

Options

Add Option?:
- Add the Battle Camera options to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Options Name:
- Command name of the option.

---
```
