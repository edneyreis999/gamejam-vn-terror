# VisuMZ_4_MapCameraZoom

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_4_MapCameraZoom`
- Contract: [RPG Maker MZ] [Tier 4] [MapCameraZoom]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| MapCameraZoom | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| DefaultZoom:num | Default Zoom | — | — | 1.0 | — | What is the default zoom value? 1.0 = 100%; 1.5 = 150%; 2.0 = 200%; Cannot go under 1.0! |
| AdaptBattleEncZoom:eval | Adapt Battle Encounter Ani | Animation | boolean | true | — | Adapt the battle encounter zoom effect? Occurs when entering battle from the map. |
| ForcePixelatedMap:eval | Force Pixelated Map | Animation | boolean | false | — | Force the map's tilesets to be rendered in pixelated form regardless of what other plugins may do. |
| Compatibility | Compatability Parameters | — | — | — | — | — |
| VisualParallaxAdjust:eval | Map Lock Adjust | Compatibility | boolean | false | — | Adjusts the Map Lock effect to the map's display position when exiting menus. For VisuMZ_4_VisualParallaxes. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Camera: Focus Player

- Command ID: `CameraFocusPlayer`
- Description: Puts the camera focus on the player character.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Duration:num | Duration | number | 60 | — | How many frames should it take to finish focus? 60 frames = 1 second. |
| EasingType:str | Easing Type | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine! @ -------------------------------------------------------------------------- |

### Camera: Focus Target Event

- Command ID: `CameraFocusTargetEvent`
- Description: Puts the camera focus on target event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EventID:eval | Event ID | — | 0 | — | Insert the ID of the event to focus on. Use 0 for this event. You may use JavaScript code. |
| Duration:num | Duration | number | 60 | — | How many frames should it take to finish focus? 60 frames = 1 second. |
| EasingType:str | Easing Type | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine! @ -------------------------------------------------------------------------- |

### Camera: Focus Target Tile

- Command ID: `CameraFocusTargetTile`
- Description: Puts the camera focus on target map tile.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapX:eval | Map Tile X | — | 0 | — | What is the X coordinate of the target map tile? You may use JavaScript code. |
| MapY:eval | Map Tile Y | — | 0 | — | What is the Y coordinate of the target map tile? You may use JavaScript code. |
| Duration:num | Duration | number | 60 | — | How many frames should it take to finish focus? 60 frames = 1 second. |
| EasingType:str | Easing Type | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine! @ -------------------------------------------------------------------------- |

### Camera: Wait for Focus

- Command ID: `CameraFocusWait`
- Description: Waits for camera focus to finish changing before continuing. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_Zoom`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Zoom: Change Zoom

- Command ID: `ZoomChange`
- Description: Change the current zoom amount.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| TargetScale:num | Target Zoom Scale | — | 1.0 | — | What is the target zoom scale? 1.0 = 100%; 1.5 = 150%; 2.0 = 200%; Cannot go under 1.0! |
| Duration:num | Duration | number | 60 | — | How many frames should it take to finish zooming? 60 frames = 1 second. |
| EasingType:str | Easing Type | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine! @ -------------------------------------------------------------------------- |

### Zoom: Wait for Zoom

- Command ID: `ZoomWait`
- Description: Waits for zoom to finish changing before continuing. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin enables the ability to zoom the in-game camera inward and make
the visible game area larger and more focused. The camera can also focus on
events or specific tiles other than just the player, making it helpful for
cutscenes. Easing accessibility also makes the zoom and camera shifts more
soft and less rough feeling.

Features include all (but not limited to) the following:

* Zoom ability allows the camera to zoom inward and enlarge the focal point.
* Auto-zoom notetag allows for the camera to automatically shift when
entering specific maps.
* Camera focus function allows the game camera to instantly move over to the
target event or target tile.
* Easing accessibility allow for smoothing zooming and camera focus changes
alongside dedicated wait time control.
* Wait for Zoom and Wait for Camera Focus plugin commands are available for
more on the go flexibility in eventing.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 4 ------

This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Caution

When using this plugin, there are things to be cautious about.

---

Screen Tearing

When using non-whole odd numbers like 1.3, 1.5, and 1.7, the likelihood of
there being a "screen tearing" effect for the tilemap or for sprites is
greatly increased. This can be avoided by having sprites with a pixel-worth
of buffering space or by just simply avoiding to use non-whole odd numbers
altogether.

---

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Cannot Go Under 100%

You can zoom in (aka go above 100% zoom), but you cannot zoom out (aka go
under 100% zoom). The reasoning behind this is because of the limitation
between PixiJS and WebGL. Going under 100% zoom will break the tilemap and
cause large chunks of it to go missing.

This is true even without this plugin installed as you can try to use the
innate RPG Maker MZ zoom functions and try to set the zoom scale under 100%.
The tileset will immediately start to fall apart.

---

Sprites No Longer Smoothed

When using this plugin, certain resources like on-map character sprites and
some tile sprites will have bitmap smoothing removed. The reason for this is
due to PixiJS's texture bleeding problem when the sprites are zoomed in. If
left alone, this causes an ugly filmy border around the edges of the
sprite's dimensions that are otherwise an eye-sore to look at.

---

VisuStella MZ Compatibility

While this plugin is compatible with the majority of the VisuStella MZ
plugin library, it is not compatible with specific plugins or specific
features. This section will highlight the main plugins/features that will
not be compatible with this plugin or put focus on how the make certain
features compatible.

---

VisuMZ_0_CoreEngine

Having the VisuMZ Core Engine installed will enable you to use easing when
it comes to zooming and camera panning.

---

Picture Zooming

If you are NOT using the VisuMZ Core Engine, pictures will be bound to the
zoom scale. This is NOT a bug. If you are using pictures in a completely
vanilla RPG Maker MZ project without any plugins installed and enter a
battle, the battle zoom will also make the pictures zoom in as well.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Map-Related Notetags ===

---

<Zoom: x%>
<AutoZoom: x%>
<Auto Zoom: x%>

- Used for: Map Notetags
- Causes the game camera to automatically zoom to x% when entering a map
with this notetag.
- This does NOT reverse itself when exiting the map. The zoom settings
will carry over to other maps unless those maps have their own auto-zoom
notetag present.
- The notetag variants do the same thing. Which you choose to use is
entirely up to personal preference.
- Replace 'x' with a percentage value above 100% to represent the zoom scale
you wish to change to when entering this map.
- 'x' cannot be under 100%! Read the "Cannot Go Under 100%" section for
more information as to why.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Camera Plugin Commands ===

---

Camera: Focus Player
- Puts the camera focus on the player character.

Duration:
- How many frames should it take to finish focus?
- 60 frames = 1 second.

Easing Type:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine!

---

Camera: Focus Target Event
- Puts the camera focus on target event.

Event ID:
- Insert the ID of the event to focus on.
- Use 0 for this event.
- You may use JavaScript code.

Duration:
- How many frames should it take to finish focus?
- 60 frames = 1 second.

Easing Type:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine!

---

Camera: Focus Target Tile
- Puts the camera focus on target map tile.

Map Tile X:
- What is the X coordinate of the target map tile?
- You may use JavaScript code.

Map Tile Y:
- What is the Y coordinate of the target map tile?
- You may use JavaScript code.

Duration:
- How many frames should it take to finish focus?
- 60 frames = 1 second.

Easing Type:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine!

---

Camera: Wait for Focus
- Waits for camera focus to finish changing before continuing.

---

=== Zoom Plugin Commands ===

---

Zoom: Change Zoom
- Change the current zoom amount.

Target Zoom Scale:
- What is the target zoom scale?
- 1.0 = 100%; 1.5 = 150%; 2.0 = 200%;
- Cannot go under 1.0!

Duration:
- How many frames should it take to finish zooming?
- 60 frames = 1 second.

Easing Type:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine!

---

Zoom: Wait for Zoom
- Waits for zoom to finish changing before continuing.

---

Plugin Parameters: General Settings

These are the general settings used for the Map Camera Zoom plugin.

---

Settings

Default Zoom:
- What is the default zoom value?
- 1.0 = 100%; 1.5 = 150%; 2.0 = 200%;
- Cannot go under 1.0!

Adapt Battle Encounter Ani:
- Adapt the battle encounter zoom effect?
- Occurs when entering battle from the map.

Force Pixelated Map:
- Force the map's tilesets to be rendered in pixelated form regardless of
what other plugins may do.
- This is primarily for pixel art games that would look better with more
pixelated tiles when zoomed in.

---

Compatibility

Map Lock Adjust:
- Adjusts the Map Lock effect to the map's display position when exiting
menus.
- For VisuMZ_4_VisualParallaxes.
- Best left false unless you know what you're doing.

---
```
