# VisuMZ_3_ActSeqImpact

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_ActSeqImpact`
- Contract: [RPG Maker MZ] [Tier 3] [ActSeqImpact]
- Required plugins: VisuMZ_0_CoreEngine, VisuMZ_1_BattleCore
- Declared load order: after VisuMZ_1_BattleCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| ActSeqImpact | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| CriticalColorBreak:struct | Critical Color Break | — | struct&lt;CriticalColorBreak&gt; | {"Enable:eval":"true","Intensity:num":"30","Duration:num":"30","EasingType:str":"OutBack"} | — | When critical hits occur, you can cause a Color Break effect to occur. |
| DodgeMotionBlur:struct | Dodge Motion Blur | — | struct&lt;DodgeMotionBlur&gt; | {"Enable:eval":"true","Rate:eval":"0.5","Duration:num":"30","EasingType:str":"InOutSine"} | — | When a battler dodges an attack, you can create a motion blur effect. |
| GuardShockWave:struct | Guard Shockwave | — | struct&lt;GuardShockWave&gt; | {"Enable:eval":"true","Amp:num":"30","Wave:num":"160","Duration:num":"30"} | — | When a guarding battler receives damage, you can create a shockwave effect. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: CriticalColorBreak

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable/Disable? | — | boolean | true | — | Enables/disables the Color Break effect whenever a critical hit occurs? |
| Intensity:num | Intensity | — | number | 30 | — | How intense do you want the Color Break effect to be? |
| Duration:num | Duration | — | number | 30 | — | What is the duration of the Color Break effect? |
| EasingType:str | Easing Type | — | combo | OutBack | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |

### Struct: DodgeMotionBlur

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable/Disable? | — | boolean | true | — | Enables/disables the Motion Blur effect whenever a battler evades an attack? |
| Rate:eval | Intensity Rate | — | — | 0.5 | — | This determines intensity rate of the motion blur. Use a number between 0 and 1. |
| Duration:num | Duration | — | number | 30 | — | How many frames should the motion blur last? What do you want to be its duration? |
| EasingType:str | Easing Type | — | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |

### Struct: GuardShockWave

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable/Disable? | — | boolean | true | — | Enables/disables the Shockwave effect whenever a battler is attacked while guarding? |
| Amp:num | Amplitude | — | number | 30 | — | What is the aplitude of the shockwave effect? |
| Wave:num | Wavelength | — | number | 160 | — | What is the wavelength of the shockwave effect? |
| Duration:num | Duration | — | number | 30 | — | What is the duration of the shockwave? |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

With the aid of Pixi JS Filters, this plugin adds more impact to battle by
producing special on screen filter effects to make certain actions like
critical hits, guarding, and dodging more visibly different adding to the
flavor of the battle.

This plugin also adds new Action Sequences for the Battle Core, allowing
impacting effects like color breaks, motion blurs, shockwaves, motion
trails, and zoom blurs.

Features include all (but not limited to) the following:

* Creating a color break effect when landing critical hits akin to a
chromatic aberration effect.
* A battler who dodges an attack will display a motion blur effect.
* Guarding damage will cause a shockwave effect.
* Adds new Action Sequences available from the Battle Core Plugin Commands.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* Pixi JS Filters*
* VisuMZ_0_CoreEngine
* VisuMZ_1_BattleCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

*Note* You can download the Pixi JS Filters plugin library from the below
URL or from the Action Sequence Impact product page. Install it as a
Tier 0 plugin.

*Note2* Pixi JS Filters perform differently on different machines/devices.
Please understand that this is outside of VisuStella's control.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

New Effects

The following are new visual effects added through this plugin. These visual
effects are added and modified with the sense of adding more impact to
visuals in battle.

---

Bizarro Inversion

Swaps the blue/red colors on the battlefield. What was originally blue will
become red and what was originally red will become blue.

Anything that is attached to the battlefield will be affected. UI objects,
pictures, etc. that aren't attached to the battlefield will not be affected
by the effect. Depending on your settings, this may or may not include
battle animations, too.

---

Color Break

When a critical hit occurs, the colors on the screen will break apart into
red, green, and blue into random directions and then come back together
similar to a chromatic aberration. This creates a sense of weight when
delivering a powerful strike.

This is optional and can be disabled.

This effect is also available as an Action Sequence in the Battle Core.

---

Desaturation

Desaturates all colors on the battlefield. This will result in a black and
white greyscale effect.

Anything that is attached to the battlefield will be affected. UI objects,
pictures, etc. that aren't attached to the battlefield will not be affected
by the effect. Depending on your settings, this may or may not include
battle animations, too.

Created by Manu Gaming!

---

Motion Blur

When a battler dodges an attack (either a miss or evasion proc), then the
battler will generate a motion blur effect. Their image splits apart in a
blurred manner and then fuses back together to become whole again. This
generates the illusion that they're hard to hit.

This is optional and can be disabled.

This effect is also available as an Action Sequence in the Battle Core.
There are two versions, one that affects only the battler while another that
affects the whole screen.

---

Motion Trail

If motion trails are enabled on a battler, whenever they move, they leave
behind a residual sprite of their motion during that particular frame. The
motion blurs aid in visualizing the path the battler moved in case the
battler's movement trajectory is normally too fast to portray. Motion trails
can have different hue and/or tones.

This is an Action Sequence-only effect.

---

Negative Inversion

Inverts all colors on the battlefield. They pretty much swap 180 degrees of
hue with whatever color is on the opposite side.

Anything that is attached to the battlefield will be affected. UI objects,
pictures, etc. that aren't attached to the battlefield will not be affected
by the effect. Depending on your settings, this may or may not include
battle animations, too.

Created by Manu Gaming!

---

Oversaturation

Oversaturates all colors on the battlefield. Colors will become extra vivid
and look extremely concentrated. Brighter colors become brighter while
darker colors become darker.

Anything that is attached to the battlefield will be affected. UI objects,
pictures, etc. that aren't attached to the battlefield will not be affected
by the effect. Depending on your settings, this may or may not include
battle animations, too.

---

Shockwave

When a guarding battler would receive HP damage (or manages to defend to 0
damage), a shockwave effect occurs to display the impact. The shockwave will
ripple out from the battler to the edges of the screen before disappearing.

This is optional and can be disabled.

This effect is also available as an Action Sequence in the Battle Core.

---

Time Scale

This causes time to go slower or faster depending on the settings. All
things related to the game client will go slower or faster.

This only affects battle. The effects go away during the input phase or when
a message is present.

Created by Manu Gaming!

---

Time Stop

The game client will pause time for set amount of time, only the music and
any sound effects continuing.

Created by Manu Gaming!

---

Zoom Blur

A zoom blur will direct its focus at a specific point on the screen and
create a visual radial distortion towards that point. The intensity of the
zoom effect will diminish over the duration of the zoom blur. This helps
draw focus towards specific parts of the screen.

This is an Action Sequence-only effect.

---

Action Sequence - Plugin Commands

The following are Action Sequence Plugin Commands that have been added with
this plugin. These are accessible from the Battle Core plugin (not this one)
in order to keep all the Action Sequences in place.

Once again, these plugin commands are only accessible through the Battle
Core plugin and not this one! Make sure you have the most update to date
version of the Battle Core for them.

---

=== Action Sequences - Impact ===

These Action Sequences are related to creating impact.
Requires VisuMZ_3_ActSeqImpact!

---

IMPACT: Bizarro Inversion
- Swaps blue/red colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Bizarro?:
- Enable Bizarro Inversion effect?

---

IMPACT: Color Break
- Breaks the colors on the screen before reassembling.
- Requires VisuMZ_3_ActSeqImpact!

Intensity:
- What is the intensity of the color break effect?

Duration:
- What is the duration of the color break effect?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Desaturation
- Desaturates all colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Desaturate?:
- Enable Desaturation effect?

---

IMPACT: Motion Blur Screen
- Creates a motion blur on the whole screen.
- Requires VisuMZ_3_ActSeqImpact!

Angle:
- Determine what angle to make the motion blur at.

Intensity Rate:
- This determines intensity rate of the motion blur.
- Use a number between 0 and 1.

Duration:
- How many frames should the motion blur last?
- What do you want to be its duration?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Motion Blur Target(s)
- Creates a motion blur on selected target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to create motion blur effects for.

Angle:
- Determine what angle to make the motion blur at.

Intensity Rate:
- This determines intensity rate of the motion blur.
- Use a number between 0 and 1.

Duration:
- How many frames should the motion blur last?
- What do you want to be its duration?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Motion Trail Create
- Creates a motion trail effect for the target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to create motion trail effects for.

Delay:
- How many frames to delay by when creating a motion trail?
- The higher the delay, the less motion trails there are.

Duration:
- How many frames should the motion trail last?
- What do you want to be its duration?

Hue:
- What do you want to be the hue for the motion trail?

Starting Opacity:
- What starting opacity value do you want for the motion trail?
- Opacity values decrease over time.

Tone:
- What tone do you want for the motion trail?
- Format: [Red, Green, Blue, Gray]

---

IMPACT: Motion Trail Remove
- Removes the motion trail effect from the target(s).
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Targets:
- Select unit(s) to clear motion trail effects for.

---

IMPACT: Negative Inversion
- Inverts all the colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Negative?:
- Enable Negative Inversion effect?

---

IMPACT: Oversaturation
- Oversaturates colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!

Oversaturate?:
- Enable Oversaturation effect?

---

IMPACT: Shockwave at Point
- Creates a shockwave at the designated coordinates.
- Requires VisuMZ_3_ActSeqImpact!

Point: X:
Point: Y:
- What x/y coordinate do you want to create a shockwave at?
- You can use JavaScript code.

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---

IMPACT: Shockwave from Each Target(s)
- Creates a shockwave at each of the target(s) location(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to start a shockwave from.

Target Location:
- Select which part target group to start a shockwave from.

Offset X:
Offset Y:
- How much to offset the shockwave X/Y point by.

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---

IMPACT: Shockwave from Target(s) Center
- Creates a shockwave from the center of the target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to start a shockwave from.

Target Location:
- Select which part target group to start a shockwave from.

Offset X:
Offset Y:
- How much to offset the shockwave X/Y point by.

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---

IMPACT: Time Scale
- Adjust time to go faster or slower!
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Scale:
- Adjusts how fast/slow time goes.
- 1.00 is normal. Lower is slower. Higher is faster.

---

IMPACT: Time Stop
- Stops time for a set amount of milliseconds.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Milliseconds:
- How many milliseconds should time stop for?
- 1000 milliseconds = 1 second.

---

IMPACT: Zoom Blur at Point
- Creates a zoom blur at the designated coordinates.
- Requires VisuMZ_3_ActSeqImpact!

Point: X:
Point: Y:
- What x/y coordinate do you want to focus the zoom at?
- You can use JavaScript code.

Zoom Strength:
- What is the strength of the zoom effect?
- Use a number between 0 and 1.

Visible Radius:
- How much of a radius should be visible from the center?

Duration:
- What is the duration of the zoom blur?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Zoom Blur at Target(s) Center
- Creates a zoom blur at the center of targets.
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to start a zoom blur from.

Target Location:
- Select which part target group to start a zoom blur from.

Offset X:
Offset Y:
- How much to offset the zoom blur X/Y point by.

Zoom Strength:
- What is the strength of the zoom effect?
- Use a number between 0 and 1.

Visible Radius:
- How much of a radius should be visible from the center?

Duration:
- What is the duration of the zoom blur?

Easing Type:
- Select which easing type you wish to apply.

---

=== Action Sequences - Inject ===

These Action Sequences are related to injecting sprite animations.
Requires VisuMZ_3_ActSeqImpact!

---

INJECT: Animation Begin
- Injects and plays a whole spritesheet animation.
- The spritesheet animation will play over the battler until it is finished.
- The battler's original sprite will be invisible until finished.
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to inject the animation on.

Filename:
- Select the animation spritesheet file.
- Located in the /img/sv_actors/ folder.

Horizontal Cells:
- How many horizontal cells (or columns) are there?

Vertical Cells:
- How many vertical cells (or rows) are there?

Frame Delay:
- How many frames are played inbetween cells?

Smooth Bitmap?:
- Smooth the spritesheet graphic?

Offset:

Offset X:
- Offsets the X position of the injected animation.
- Negative: left. Positive: right.

Offset Y:
- Offsets the Y position of the injected animation.
- Negative: up. Positive: down.

---

INJECT: Animation End
- Stops and ends any injected animations on target(s).
- Any inject animation will be prematurely terminated.
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to stop injected animation(s).

---

INJECT: Animation Pause/Resume
- Pauses/resumes any injected animations on target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to pause/resume injected animation(s).

Pause?:
- Pause the injected animation?

---

INJECT: Wait For Injected Animation
- Waits for injected animations to complete before performing next command.
- Requires VisuMZ_3_ActSeqImpact!

---

Plugin Parameters: Critical Color Break Settings

When critical hits occur, you can cause a Color Break effect to occur.

---

Settings

Enable/Disable?:
- Enables/disables the Color Break effect whenever a critical hit occurs?

Intensity:
- How intense do you want the Color Break effect to be?

Duration:
- What is the duration of the Color Break effect?

Easing Type:
- Select which easing type you wish to apply.

---

Plugin Parameters: Dodge Motion Blur Settings

When a battler dodges an attack, you can create a motion blur effect.

---

Settings

Enable/Disable?:
- Enables/disables the Motion Blur effect whenever a battler evades an
attack?

Intensity Rate:
- This determines intensity rate of the motion blur.
- Use a number between 0 and 1.

Duration:
- How many frames should the motion blur last?
- What do you want to be its duration?

Easing Type:
- Select which easing type you wish to apply.

---

Plugin Parameters: Guard Shockwave Settings

When a guarding battler receives damage, you can create a shockwave effect.

---

Category

Enable/Disable?:
- Enables/disables the Shockwave effect whenever a battler is attacked
while guarding?

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---
```
