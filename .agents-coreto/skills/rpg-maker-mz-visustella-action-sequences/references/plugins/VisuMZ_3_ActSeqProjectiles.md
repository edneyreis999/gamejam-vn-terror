# VisuMZ_3_ActSeqProjectiles

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_ActSeqProjectiles`
- Contract: [RPG Maker MZ] [Tier 3] [ActSeqProjectiles]
- Required plugins: VisuMZ_0_CoreEngine, VisuMZ_1_BattleCore
- Declared load order: after VisuMZ_1_BattleCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| ActSeqProjectiles | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| AngleAdjustments | Angle Adjustments | — | — | — | — | — |
| AnimationAngleAdjust:num | Animation Angle | AngleAdjustments | — | 225 | — | Adjust projectile angle for animations by this many degrees. |
| IconAngleAdjust:num | Icon Angle | AngleAdjustments | — | 135 | — | Adjust projectile angle for icons by this many degrees. |
| PictureAngleAdjust:num | Picture Angle | AngleAdjustments | — | 135 | — | Adjust projectile angle for pictures by this many degrees. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin adds projectile control the Battle Core's Action Sequences,
allowing you, the game dev, to create entities that fire from one screen
location to another screen location. These locations can be either battler
targets or exact points on the screen. Projectiles can come in the form of
pictures, icons, and animations. Make them spin, make them arc, make them
travel at differing speeds across the battlefield!

Features include all (but not limited to) the following:

* Create projectiles that can be fired across the battlefield.
* Projectiles can be pictures, icons, and/or animations.
* Action Sequences give you control over where they come from and where
they go: targets and/or points.
* Extra settings that give you extra control over projectiles such as
automatic angles, angle offsets, blend modes, trajectory easy, hues,
scaling, and spin speed.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_0_CoreEngine
* VisuMZ_1_BattleCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Projectile Types

Projectiles come in three types: pictures, icons, and animations. Each have
their own properties, but ultimately, work very similar.

---

Picture Projectiles

These projectiles use images found in the img/pictures/ folder of your game
project. Used as static images, they allow you to create projectiles of any
size and dimension to your liking. These offer the most flexibility when it
comes to options and extra settings.

---

Icon Projectiles

For those who want to save up on resources and utilize the already loaded
icon sheet, you can simply select an icon index to pick an icon as the
projectile's image. Like pictures, these offer the most flexibility when it
comes to options and extra settings.

---

Animation Projectiles

Those who want a bit more spice in their projectiles and want something that
animates can picture animation projectiles. The animation will play through
its frames until it hits its end, after which, the animation restarts.
However, because animations are much more complicated than just a static
image, some options and extra settings are not available for animations.

---

Action Sequence Plugin Commands

The following are Action Sequence Plugin Commands that have been added with
this plugin. These are accessible from the Battle Core plugin (not this one)
in order to keep all the Action Sequences in place.

Once again, these plugin commands are only accessible through the Battle
Core plugin and not this one! Make sure you have the most update to date
version of the Battle Core for them.

---

=== Action Sequences - Projectiles ===

Create projectiles on the screen and fire them off at a target.
Requires VisuMZ_3_ActSeqProjectiles!

---

PROJECTILE: Animation
- Create an animation projectile and fire it at a target.
- Requires VisuMZ_3_ActSeqProjectiles!

Coordinates:

Start Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should start from.
- Target - Start from battler target(s)
- Point - Start from a point on the screen

Target(s):
- Select which unit(s) to start the projectile from.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile from.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to start the projectile at.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Goal Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should go to.
- Target - Goal is battler target(s)
- Point - Goal is a point on the screen

Target(s):
- Select which unit(s) for projectile to go to.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to send the projectile to.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Settings:

Animation ID:
- Determine which animation to use as a projectile.

Duration:
- Duration for the projectile(s) to travel.

Wait For Projectile?:
- Wait for projectile(s) to reach their destination before going onto
the next command?

Wait For Animation?:
- Wait for animation to finish before going to the next command?

Extra Settings:
- Add extra settings to the projectile?

Auto Angle?:
- Automatically angle the projectile to tilt the direction
it's moving?

Angle Offset:
- Alter the projectile's tilt by this many degrees.

Arc Peak:
- This is the height of the project's trajectory arc in pixels.

Easing:
- Select which easing type to apply to the projectile's trajectory.

Spin Speed:
- Determine how much angle the projectile spins per frame.
- Does not work well with "Auto Angle".

Effect Emulation:

Action Effect?:
- Emulate current Action Effect when projectile reaches target?
- Only works with start and goal targets.

Item Effect ID?:
- Emulate an Item Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Skill Effect ID?:
- Emulate a Skill Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Common Event ID:
- Plays a Once Parallel Common Event upon reaching target.
- Use 0 to not use.
- Works regardless of start/goal targets.

End Animation ID:
- Plays an animation when projectile reaches target.
- Use 0 to not use.

Mirror Animation:
- Mirror the effect animation?

Mute Animation:
- Mute the effect animation?

---

PROJECTILE: Icon
- Create an icon projectile and fire it at a target.
- Requires VisuMZ_3_ActSeqProjectiles!

Coordinates:

Start Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should start from.
- Target - Start from battler target(s)
- Point - Start from a point on the screen

Target(s):
- Select which unit(s) to start the projectile from.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile from.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to start the projectile at.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Goal Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should go to.
- Target - Goal is battler target(s)
- Point - Goal is a point on the screen

Target(s):
- Select which unit(s) for projectile to go to.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to send the projectile to.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Settings:

Icon:
- Determine which icon to use as a projectile.

Duration:
- Duration for the projectile(s) to travel.

Wait For Projectile?:
- Wait for projectile(s) to reach their destination before going onto
the next command?

Extra Settings:
- Add extra settings to the projectile?

Auto Angle?:
- Automatically angle the projectile to tilt the direction
it's moving?

Angle Offset:
- Alter the projectile's tilt by this many degrees.

Arc Peak:
- This is the height of the project's trajectory arc in pixels.

Blend Mode:
- What kind of blend mode do you wish to apply to the projectile?
- Normal
- Additive
- Multiply
- Screen

Easing:
- Select which easing type to apply to the projectile's trajectory.

Hue:
- Adjust the hue of the projectile.
- Insert a number between 0 and 360.

Scale:
- Adjust the size scaling of the projectile.
- Use decimals for exact control.

Spin Speed:
- Determine how much angle the projectile spins per frame.
- Does not work well with "Auto Angle".

Effect Emulation:

Action Effect?:
- Emulate current Action Effect when projectile reaches target?
- Only works with start and goal targets.

Item Effect ID?:
- Emulate an Item Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Skill Effect ID?:
- Emulate a Skill Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Common Event ID:
- Plays a Once Parallel Common Event upon reaching target.
- Use 0 to not use.
- Works regardless of start/goal targets.

End Animation ID:
- Plays an animation when projectile reaches target.
- Use 0 to not use.

Mirror Animation:
- Mirror the effect animation?

Mute Animation:
- Mute the effect animation?

---

PROJECTILE: Picture
- Create a picture projectile and fire it at a target.
- Requires VisuMZ_3_ActSeqProjectiles!

Coordinates:

Start Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should start from.
- Target - Start from battler target(s)
- Point - Start from a point on the screen

Target(s):
- Select which unit(s) to start the projectile from.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile from.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to start the projectile at.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Goal Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should go to.
- Target - Goal is battler target(s)
- Point - Goal is a point on the screen

Target(s):
- Select which unit(s) for projectile to go to.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to send the projectile to.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Settings:

Picture Filename:
- Determine which picture to use as a projectile.

Duration:
- Duration for the projectile(s) to travel.

Wait For Projectile?:
- Wait for projectile(s) to reach their destination before going onto
the next command?

Extra Settings:
- Add extra settings to the projectile?

Auto Angle?:
- Automatically angle the projectile to tilt the direction
it's moving?

Angle Offset:
- Alter the projectile's tilt by this many degrees.

Arc Peak:
- This is the height of the project's trajectory arc in pixels.

Blend Mode:
- What kind of blend mode do you wish to apply to the projectile?
- Normal
- Additive
- Multiply
- Screen

Easing:
- Select which easing type to apply to the projectile's trajectory.

Hue:
- Adjust the hue of the projectile.
- Insert a number between 0 and 360.

Scale:
- Adjust the size scaling of the projectile.
- Use decimals for exact control.

Spin Speed:
- Determine how much angle the projectile spins per frame.
- Does not work well with "Auto Angle".

Effect Emulation:

Action Effect?:
- Emulate current Action Effect when projectile reaches target?
- Only works with start and goal targets.

Item Effect ID?:
- Emulate an Item Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Skill Effect ID?:
- Emulate a Skill Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Common Event ID:
- Plays a Once Parallel Common Event upon reaching target.
- Use 0 to not use.
- Works regardless of start/goal targets.

End Animation ID:
- Plays an animation when projectile reaches target.
- Use 0 to not use.

Mirror Animation:
- Mirror the effect animation?

Mute Animation:
- Mute the effect animation?

---

Plugin Parameters: Angle Adjustment Settings

These settings are primarily used to automatically adjust the angle of any
pictures, icon, and/or animation so that they work with the automatic
angling of the projectiles as to always appear aimed at the goal point.

---

Angle Adjustments

Animation Angle:
- Adjust projectile angle for animations by this many degrees.

Icon Angle:
- Adjust projectile angle for icons by this many degrees.

Picture Angle:
- Adjust projectile angle for pictures by this many degrees.

---
```
