# VisuMZ_2_ExtMessageFunc

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_2_ExtMessageFunc`
- Contract: [RPG Maker MZ] [Tier 2] [ExtMessageFunc]
- Required plugins: VisuMZ_1_MessageCore
- Declared load order: after VisuMZ_1_MessageCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | — | — | — | — | — | — |
| ExtMessageFunc | — | — | — | — | — | — |
| ATTENTION | — | — | — | — | — | — |
| BreakSettings | — | — | — | — | — | — |
| Auto:struct | — | — | — | — | — | — |
| FastFwd:struct | — | — | — | — | — | — |
| MsgButtonConsole:struct | — | — | — | — | — | — |
| Buttons:struct | — | — | — | — | — | — |
| MsgCursor:struct | — | — | — | — | — | — |
| MsgTail:struct | — | — | — | — | — | — |
| ScrollWheel:struct | — | — | — | — | — | — |
| BreakEnd1 | — | — | — | — | — | — |
| End Of | — | — | — | — | — | — |
| BreakEnd2 | — | — | — | — | — | — |

### Struct: Auto

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| WaitPerChar:num | Wait per Character | General | number | 6 | — | How many frames should the game wait per character? Average: 60 frames per second. |
| MinimumWait:num | Minimum Wait | General | number | 300 | — | What is the minimum amount of frames to wait? Average: 60 frames per second. |
| VoiceAct | Compatibility | — | — | VisuMZ_2_VoiceActControl | — | — |
| VoiceActAutoPadding:num | Voice Act Padding | VoiceAct | number | 60 | — | How many frames to wait after a voice line finishes? Average: 60 frames per second. |

### Struct: FastFwd

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable? | General | boolean | true | — | Enable or disable the Extended Fast Forward feature? |
| Speed:num | Speed | General | number | 8 | — | What is the speed at which Extended Fast Forward works at? Higher numbers are faster. |
| SceneChangeReset:eval | Reset on Scene Change? | General | boolean | true | — | Reset Fast Forward setting on scene changes (ie battle, menu, or map transfers)? |

### Struct: MsgButtonConsole

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| ShowDefault:eval | Show by Default? | General | boolean | true | — | Show or hide the Message Button Console by default? |
| Position:str | Position | General | select | bottom | Top of Message Window=top; Bottom of Message Window=bottom | Where do you wish to display the Message Button Console? |
| AutoSizeHide:eval | Auto-Size Hide? | General | boolean | false | — | Hide the button console when using auto-size text codes? |
| Appearance | — | — | — | — | — | — |
| WindowSkin:str | Window Skin | Appearance | file | Window | — | What is the window skin used for the buttons? Ignore if using Background Images. |
| FontFace:str | Font Name | Appearance | — | Arial | — | What font do you wish to use for the Message Button Console? |
| FontSize:num | Font Size | FontFace:str | number | 18 | — | What font size do you wish to use for the Message Button Console? |
| TextColors | Text Colors | Appearance | — | — | — | — |
| NormalColor:str | Normal Color | TextColors | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ToggledColor:str | Toggled Color | TextColors | — | 24 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| DisabledColor:str | Disabled Color | TextColors | — | 7 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| Visuals | Button Visuals | Appearance | — | — | — | — |
| ButtonOffsetX:num | Offset X | Visuals | — | +0 | — | Offsets the buttons x position. Negative: left. Positive: right. |
| ButtonOffsetY:num | Offset Y | Visuals | — | +0 | — | Offsets the buttons y position. Negative: up. Positive: down. |
| ButtonWidth:num | Width | Visuals | number | 86 | — | What is the width of each button? |
| ButtonHeight:num | Height | Visuals | number | 36 | — | What is the height of each button? |
| ButtonBuffer:num | Buffer | Visuals | number | 6 | — | What is the buffer between each button? |
| Images | Background Images | Appearance | — | — | — | — |
| ImgDisabled:str | Disabled Image | Images | file | — | — | Filename of the background image when the button is disabled. |
| ImgDisabledOffsetX:num | Offset X | ImgDisabled:str | — | +0 | — | Offsets the X position of this image. Negative: left; Positive: right |
| ImgDisabledOffsetY:num | Offset Y | ImgDisabled:str | — | +0 | — | Offsets the Y position of this image. Negative: up; Positive: down |
| ImgEnabled:str | Enabled Image | Images | file | — | — | Filename of the background image when the button is enabled. |
| ImgEnabledOffsetX:num | Offset X | ImgEnabled:str | — | +0 | — | Offsets the X position of this image. Negative: left; Positive: right |
| ImgEnabledOffsetY:num | Offset Y | ImgEnabled:str | — | +0 | — | Offsets the Y position of this image. Negative: up; Positive: down |
| ImgToggled:str | Toggled Image | Images | file | — | — | Filename of the background image when the button is toggled. |
| ImgToggledOffsetX:num | Offset X | ImgToggled:str | — | +0 | — | Offsets the X position of this image. Negative: left; Positive: right |
| ImgToggledOffsetY:num | Offset Y | ImgToggled:str | — | +0 | — | Offsets the Y position of this image. Negative: up; Positive: down |

### Struct: Buttons

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| List:arraystr | List | General | combo\[\] | \["auto","fastFwd","log","hide","save","load","options","gameEnd"\] | auto; log; fastFwd; gameEnd; hide; load; options; save | Which buttons appear and in what order? Some commands require certain plugins installed. |
| Shortcuts | Shortcut Keys | — | — | — | — | — |
| AutoKey:str | Auto-Forward Key | General | combo | none | none; tab; shift; control; pageup; pagedown | This is the key used for auto-forwarding messages. |
| SaveKey:str | Save Key | Shortcuts | combo | none | none; tab; shift; control; pageup; pagedown | This is the key used for quick saving. Requires VisuMZ_1_SaveCore! |
| LoadKey:str | Load Key | Shortcuts | combo | none | none; tab; shift; control; pageup; pagedown | This is the key used for quick load. Requires VisuMZ_1_SaveCore! |
| OptionsKey:str | Options Key | Shortcuts | combo | none | none; tab; shift; control; pageup; pagedown | This is the key used for opening options. Requires VisuMZ_1_OptionsCore! |
| GameEndKey:str | Game End Key | Shortcuts | combo | none | none; tab; shift; control; pageup; pagedown | This is the key used for ending the game. |
| Vocab | Vocabulary | — | — | — | — | — |
| Auto:str | Auto-Forward | Vocab | — | AUTO | — | How is this option's text displayed in-game? |
| FastFwd:str | Fast Forward | Vocab | — | FAST | — | How is this option's text displayed in-game? |
| Save:str | Save Game | Vocab | — | SAVE | — | How is this option's text displayed in-game? Requires VisuMZ_1_SaveCore! |
| Load:str | Load Game | Vocab | — | LOAD | — | How is this option's text displayed in-game? Requires VisuMZ_1_SaveCore! |
| Options:str | Options | Vocab | — | CONFIG | — | How is this option's text displayed in-game? Requires VisuMZ_1_OptionsCore! |
| GameEnd:str | Game End | Vocab | — | TITLE | — | How is this option's text displayed in-game? |

### Struct: MsgCursor

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| Enable:eval | Enable? | General | boolean | true | — | Enable or disable the message cursor? |
| GraphicType:str | Graphic Type | General | select | icon | Icon - From img/system/IconSet.png=icon; Image - An animated image from img/system/=image; Window Skin - Use the default Window Skin cursor=windowskin | What is the cursor's graphic type? |
| Icon | — | — | — | — | — | — |
| IconIndex:str | Icon Index | Icon | — | 188 | — | This is icon used for the Message Cursor. |
| FlipMultiplier:str | Flip Speed Multiplier | Icon | — | 1 | — | What is the flip speed multiplier for the Message Cursor? Use 0 for no flipping. |
| Image | — | — | — | — | — | — |
| Filename:str | Filename | Image | file | — | — | Filename of the image found inside the img/system/ folder. |
| Rows:num | Image Rows | Image | number | 1 | — | How many rows are there for the image? |
| Cols:num | Image Columns | Image | number | 1 | — | How many columns are there for the image? |
| FrameDelay:num | Frame Delay | Image | number | 4 | — | How many frames delayed are there per animated cell? |
| Appearance | — | — | — | — | — | — |
| AnchorX:num | Anchor X | Appearance | — | 0.5 | — | Determine the Message Cursor's X position. Use a number between 0 and 1 for best results. |
| AnchorY:num | Anchor Y | Appearance | — | 1 | — | Determine the Message Cursor's Y position. Use a number between 0 and 1 for best results. |
| OffsetX:num | Offset X | Appearance | — | +0 | — | Offset the Message Cursor's X position by how many pixels? |
| OffsetY:num | Offset Y | Appearance | — | -8 | — | Offset the Message Cursor's Y position by how many pixels? |

### Struct: MsgTail

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AutoPosition | Auto-Position | — | — | — | — | — |
| autoPositionTail:eval | Enable? | AutoPosition | boolean | true | — | Show Message Tails with Auto-Position text codes? |
| autoPositionLeft:eval | Face Left? | AutoPosition | boolean | true | — | Which direction does the Message Tail point to? |
| autoCorrectX:eval | Auto-Correct X | AutoPosition | boolean | true | — | Auto-corrects Message Tail position X when used with Auto-Position but are too close to edge of screen. |
| autoPositionOffsetX:num | Offset X | AutoPosition | — | +0 | — | Message Window's X offset with auto-position. Negative: left. Positive: right. |
| autoPositionOffsetY:num | Offset Y | AutoPosition | — | +0 | — | Message Window's Y offset with auto-position. Negative: up. Positive: down. |
| TailDir | Tail Directions | — | — | — | — | — |
| BottomLeft | Bottom Left | TailDir | — | — | — | — |
| bottomLeftFilename:str | Filename | BottomLeft | file | — | — | Filename of the Message Tail graphic going towards the bottom left. |
| bottomLeftAnchorX:num | Anchor X | BottomLeft | — | 0.5 | — | Anchor value X. Use a number between 0 and 1. 0.0 - Left; 0.5 - Center; 1.0 - Right |
| bottomLeftAnchorY:num | Anchor Y | BottomLeft | — | 0.0 | — | Anchor value Y. Use a number between 0 and 1. 0.0 - Top; 0.5 - Middle; 1.0 - Bottom |
| bottomLeftOffsetX:num | Offset X | BottomLeft | — | +0 | — | Offset the Message Tail's X position. Negative: left. Positive: right. |
| bottomLeftOffsetY:num | Offset Y | BottomLeft | — | +0 | — | Offset the Message Tail's Y position. Negative: left. Positive: right. |
| BottomRight | Bottom Right | TailDir | — | — | — | — |
| bottomRightFilename:str | Filename | BottomRight | file | — | — | Filename of the Message Tail graphic going towards the bottom right. |
| bottomRightAnchorX:num | Anchor X | BottomRight | — | 0.5 | — | Anchor value X. Use a number between 0 and 1. 0.0 - Left; 0.5 - Center; 1.0 - Right |
| bottomRightAnchorY:num | Anchor Y | BottomRight | — | 0.0 | — | Anchor value Y. Use a number between 0 and 1. 0.0 - Top; 0.5 - Middle; 1.0 - Bottom |
| bottomRightOffsetX:num | Offset X | BottomRight | — | +0 | — | Offset the Message Tail's X position. Negative: left. Positive: right. |
| bottomRightOffsetY:num | Offset Y | BottomRight | — | +0 | — | Offset the Message Tail's Y position. Negative: left. Positive: right. |
| UpperLeft | Upper Left | TailDir | — | — | — | — |
| upperLeftFilename:str | Filename | UpperLeft | file | — | — | Filename of the Message Tail graphic going towards the upper left. |
| upperLeftAnchorX:num | Anchor X | UpperLeft | — | 0.5 | — | Anchor value X. Use a number between 0 and 1. 0.0 - Left; 0.5 - Center; 1.0 - Right |
| upperLeftAnchorY:num | Anchor Y | UpperLeft | — | 1.0 | — | Anchor value Y. Use a number between 0 and 1. 0.0 - Top; 0.5 - Middle; 1.0 - Bottom |
| upperLeftOffsetX:num | Offset X | UpperLeft | — | +0 | — | Offset the Message Tail's X position. Negative: left. Positive: right. |
| upperLeftOffsetY:num | Offset Y | UpperLeft | — | +0 | — | Offset the Message Tail's Y position. Negative: left. Positive: right. |
| UpperRight | Upper Right | TailDir | — | — | — | — |
| upperRightFilename:str | Filename | UpperRight | file | — | — | Filename of the Message Tail graphic going towards the upper right. |
| upperRightAnchorX:num | Anchor X | UpperRight | — | 0.5 | — | Anchor value X. Use a number between 0 and 1. 0.0 - Left; 0.5 - Center; 1.0 - Right |
| upperRightAnchorY:num | Anchor Y | UpperRight | — | 1.0 | — | Anchor value Y. Use a number between 0 and 1. 0.0 - Top; 0.5 - Middle; 1.0 - Bottom |
| upperRightOffsetX:num | Offset X | UpperRight | — | +0 | — | Offset the Message Tail's X position. Negative: left. Positive: right. |
| upperRightOffsetY:num | Offset Y | UpperRight | — | +0 | — | Offset the Message Tail's Y position. Negative: left. Positive: right. |

### Struct: ScrollWheel

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable? | General | boolean | true | — | Enable disable scroll wheel controls? Temporarily disabled during support windows (Show Choice, Input Number, etc.) |
| ScrollDownNext:eval | Scroll Down: Next? | General | boolean | true | — | Set "Scroll Down" to "Next"? |
| ScrollUpMsgLog:eval | Scroll Up: Log? | General | boolean | true | — | Set "Scroll Up" to "Message Log"? Requires VisuMZ_3_MessageLog! |

## Plugin commands

### Fast Forward: Allow/Disallow

- Command ID: `ExtFastFwdDisallow`
- Description: Change whether or not Fast Forward is allowed/disallowed. Must be enabled by the Plugin Parameters.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Allow:eval | Allow? | boolean | true | — | Allow or disallow the Extended Fast Forward feature? Must be enabled by the Plugin Parameters. @ -------------------------------------------------------------------------- |

### Message Button Console: Show/Hide

- Command ID: `MsgButtonConsole`
- Description: Determine if the Message Button Console is visible or hidden. Only appears on the map. Does not appear in battle.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Visible:eval | Visible? | boolean | true | — | Show or hide the Message Button Console feature? Only appears on the map. Does not appear in battle. @ -------------------------------------------------------------------------- |

### Message Cursor: Change Settings

- Command ID: `MessageCursorSettings`
- Description: Change the Message Cursor settings used.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MsgCursor:struct | Change Settings | struct&lt;MsgCursor&gt; | {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"} | — | Change the Message Cursor settings. @ -------------------------------------------------------------------------- |

### Message Tail: Change Settings

- Command ID: `MessageTailSettings`
- Description: Change the Message Tail settings.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Settings:struct | -------------------------- | struct&lt;ScrollWheel&gt; | ---------------------------------- | — | Emulates Eastern Visual Novel controls regarding mouse scroll wheel functionality. |

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Extended Message Function plugin adds onto RPG Maker MZ's Message Window
and adds in various features you would normally see found in modern RPG's.
Things like automatically moving the text forward after a set amount of time
or fast forward are available. Saving and loading during a message is also
possible as well as going to the Options menu or returning back to the title
screen. These options are only available to the Message Window on the map
scene and do not work in battle.

Features include all (but not limited to) the following:

* The Button Console appears on the Message Window let the player activate
various commands via touch/click.
* Extended Fast Forward Mode is an expanded feature upon the Message Core's
Fast Forward function to fast forward all events and not just messages.
This can be optionally disabled.
* A Message Cursor will appear where the text has ended for those who want
that kind of aesthetic in their game.
* Auto-Forward will automatically move messages onward after a certain
amount of time has passed. Time required will be determined based on the
length of the message in question.
* Saving and Loading can be done from the Message Window akin to how many
visual novels work. Requires the Save Core, but you're already using that,
right? Right?
* Also be able to jump straight into the Options scene from the Message
Window to change any settings on the fly. Requires the Options Core, but
you're using that, too, correct?
* And for those who want to jump back to the title screen, they can do so
by selecting a Game End option, too.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_1_MessageCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Extra Features

There are some extra features found if other VisuStella MZ plugins are found
present in the Plugin Manager list.

---

VisuMZ_1_OptionsCore

The Options Core is a required plugin in order to make use of the "Options"
(aka "Config") button found in the Button Console.

---

VisuMZ_1_SaveCore

The Options Core is a required plugin in order to make use of the "Save" and
"Load" buttons found in the Button Console.

---

VisuMZ_3_MessageLog

The Message Log plugin enables the "Log" button found in the Button Console
to let the player go and review the text that has been displayed in the map
scene. This does not include the text found in battle to avoid conflicting
logged messages across different situations.

---

VisuMZ_4_MessageVisibility

The Message Visibility plugin enables the "Hide" button found in the
Button Console to make the Message Window visible or invisible.

---

Available Text Codes

The following are text codes that you may use with this plugin.

=== Button Console-Related Text Codes ===

---

--------------------   -----------------------------------------------------
Text Code              Effect (Message Window Only)
--------------------   -----------------------------------------------------

<Hide Buttons>         Hides the Button Console from this current Message
Window's text assuming that nothing else is hiding
the Button Console from view.

---

=== Message Tail-Related Text Codes ===

--------------------   -----------------------------------------------------
Text Code              Effect (Message Window Only)
--------------------   -----------------------------------------------------

<Tail Bottom Left: x>  Creates a message tail at x coordinate pointing to
the bottom left.
<Tail Bottom Right: x> Creates a message tail at x coordinate pointing to
the bottom right.
<Tail Upper Left: x>   Creates a message tail at x coordinate pointing to
the upper left.
<Tail Upper Right: x>  Creates a message tail at x coordinate pointing to
the upper right.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Fast Forward Plugin Commands ===

---

Fast Forward: Allow/Disallow
- Change whether or not Fast Forward is allowed/disallowed.
- Must be enabled by the Plugin Parameters.

Allow?:
- Allow or disallow the Extended Fast Forward feature?
- Must be enabled by the Plugin Parameters.

---

=== Message Button Console Plugin Commands ===

---

Message Button Console: Show/Hide
- Determine if the Message Button Console is visible or hidden.
- Only appears on the map.
- Does not appear in battle.

Visible?:
- Show or hide the Message Button Console feature?
- Only appears on the map.
- Does not appear in battle.

---

=== Message Cursor Plugin Commands ===

---

Message Cursor: Change Settings
- Change the Message Cursor settings used.

Change Settings:
- Change the Message Cursor settings.
- Settings are the same as the ones found in the Plugin Parameters.

---

=== Message Tail Plugin Commands ===

---

Message Tail: Change Settings
- Change the Message Tail settings.

Message Tail Settings:
- Message Tail settings used for Message Windows.
- Requires images and text codes to appear.
- See Plugin Parameters. They have the same parameters.

---

Plugin Parameters: Auto-Forward Settings

Auto-Forward settings used for this game. Auto-Forward is a feature that
once enabled, the game will automatically move the "Show Text" event
commands forward after a certain amount of time. The amount of time will be
determined by how many characters are displayed on the screen. There is a
lower boundary, where if the wait time does not meet the amount, the timer
will be set to the minimum wait value instead.

---

Settings

Wait per Character:
- How many frames should the game wait per character?
- Average: 60 frames per second.

Minimum Wait:
- What is the minimum amount of frames to wait?
- Average: 60 frames per second.

---

Compatibility

Voice Act Padding:
- How many frames to wait after a voice line finishes?
- Average: 60 frames per second.

---

Plugin Parameters: Fast Forward (Extended) Settings

Extended Fast Forward settings used for this game. If enabled, this will
replace the Message Core's Fast Forward functionality. The Extended Fast
Forward feature will not only fast forward through messages but any running
events that are not found in a parallel event.

It can also be activated the Message Core's Fast Forward shortcut key.

---

Settings

Enable?:
- Enable or disable the Extended Fast Forward feature?

Speed:
- What is the speed at which Extended Fast Forward works at?
- Higher numbers are faster.

Reset on Scene Change?:
- Reset Fast Forward setting on scene changes (ie battle, menu, or
map transfers)?

---

Plugin Parameters: Message Button Console Settings

Message Button Console settings used for this game.

It will only appear in the Message Window on the map scene. It will NOT
appear in battle. The reason it won't appear in battle is because many of
the functions there will clash with how the battle scene behaves.

The Button Console will add extra padding to the Message Window and appear
at either the top of bottom of the Message Window (your choice). A row of
buttons will appear each with a different functionality.

These Plugin Parameters also allow you to customize the appearance of how
the buttons look in-game. Adjust them accordingly.

---

General

Show by Default?:
- Show or hide the Message Button Console by default?

Position:
- Where do you wish to display the Message Button Console?
- Top of Message Window
- Bottom of Message Window

Auto-Size Hide?:
- Hide the button console when using auto-size text codes?

---

Appearance

Window Skin:
- What is the window skin used for the buttons?
- Ignore if using Background Images.

Font Name:
- What font do you wish to use for the Message Button Console?

Font Size:
- What font size do you wish to use for the Message Button Console?

Text Colors:

Normal Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Toggled Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Disabled Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Visuals:

Offset X:
- Offsets the buttons x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the buttons y position.
- Negative: up. Positive: down.

Width:
- What is the width of each button?

Height:
- What is the height of each button?

Buffer:
- What is the buffer between each button?

Background Images:

Disabled Image:
Enabled Image:
Toggled Image:
- Filename of the background image when the button is disabled,
enabled, or toggled.
- This will hide the window skin for this button.

Offset X:
- Offsets the X position of this image.
- Negative: left; Positive: right

Offset Y:
- Offsets the Y position of this image.
- Negative: up; Positive: down

---

Plugin Parameters: Button Settings

Settings for which buttons appear and how they appear. These settings will
determine which buttons appear (provided that their required plugins are
available), what shortcut keys are applied to them, and what kind of text
will be displayed to represent them.

In case you are wondering where the Fast Forward shortcut key is, that
setting is found in the Message Core.

---

General

List:
- Which buttons appear and in what order?
- Some commands require certain plugins installed.

---

Shortcut Keys

Auto-Forward Key:
- This is the key used for auto-forwarding messages.

Save Key:
- This is the key used for quick saving.
- Requires VisuMZ_1_SaveCore!

Load Key:
- This is the key used for quick load.
- Requires VisuMZ_1_SaveCore!

Options Key:
- This is the key used for opening options.
- Requires VisuMZ_1_OptionsCore!

Game End Key:
- This is the key used for ending the game.

---

Vocabulary

Auto-Forward:
- How is this option's text displayed in-game?

Fast Forward:
- How is this option's text displayed in-game?

Save Game:
- How is this option's text displayed in-game?
- Requires VisuMZ_1_SaveCore!

Load Game:
- How is this option's text displayed in-game?
- Requires VisuMZ_1_SaveCore!

Options:
- How is this option's text displayed in-game?
- Requires VisuMZ_1_OptionsCore!

Game End:
- How is this option's text displayed in-game?

---

Plugin Parameters: Message Cursor Settings

Message Cursor settings used for this game. The cursor, if enabled, will
appear where the text is currently displayed at and adds a new type of
aesthetic to the game.

---

General

Enable?:
- Enable or disable the message cursor?

Graphic Type:
- What is the cursor's graphic type?
- Icon - From img/system/IconSet.png
- Image - An animated image from img/system/
- Window Skin - Use the default Window Skin cursor

---

Icon

Icon Index:
- This is icon used for the Message Cursor.

Flip Speed Multiplier:
- What is the flip speed multiplier for the Message Cursor?
- Use 0 for no flipping.

---

Image

Filename:
- Filename of the image found inside the img/system/ folder.

Image Rows:
- How many rows are there for the image?

Image Columns:
- How many columns are there for the image?

Frame Delay:
- How many frames delayed are there per animated cell?

---

Appearance

Anchor X:
Anchor Y:
- Determine the Message Cursor's X/Y position.
- Use a number between 0 and 1 for best results.

Offset X:
Offset Y:
- Offset the Message Cursor's X/Y position by how many pixels?

---

Plugin Parameters: Message Tail Settings

Message Tails can be made to appear from the Message Window and point
towards the speaker, similar to how speech bubbles in comics point towards
their speakers. The Message Tails do not appear on their own, and only come
out when using auto-position text codes (if enabled) such as <Auto Player>
or when text codes are used to make them appear such as <Tail Upper Left: x>
and <Tail Lower Right: x>.

These settings require custom graphics that this plugin does not come with.
You will need to add them on your own or else they will not appear.

---

Auto-Position

Enable?:
- Show Message Tails with Auto-Position text codes?
- Message Tails will appear when using the following text codes:
- <Auto Actor: x>
- <Auto Party: x>
- <Auto Player>
- <Auto Event: x>
- <Auto Enemy: x>

Face Left?:
- Which direction does the Message Tail point to?
- Left or right?

Auto-Correct X:
- Auto-corrects Message Tail position X when used with Auto-Position but
are too close to edge of screen.

Offset X:
Offset Y:
- Message Window's X offset with auto-position.
- X: Negative: left. Positive: right.
- Y: Negative: up. Positive: down.

---

Tail Directions
Tail Directions > Bottom Left
Tail Directions > Bottom Right
Tail Directions > Upper Left
Tail Directions > Upper Right

Filename:
- Filename of the Message Tail graphic going towards the
specified direction.

Anchor X:
- Anchor value X. Use a number between 0 and 1.
- 0.0 - Left; 0.5 - Center; 1.0 - Right

Anchor Y:
- Anchor value Y. Use a number between 0 and 1.
- 0.0 - Top; 0.5 - Middle; 1.0 - Bottom

Offset X:
- Offset the Message Tail's X position.
- Negative: left. Positive: right.

Offset Y:
- Offset the Message Tail's Y position.
- Negative: left. Positive: right.

---

Plugin Parameters: Scroll Wheel Settings

Emulates Eastern Visual Novel controls regarding mouse scroll wheel
functionality. If enabled, the scroll wheel can be used to "continue" the
current "Show Text" message by scrolling down on the mouse wheel or if the
VisuStella MZ Message Log is installed, scrolling up will reveal the message
log to show what was previously said.

This feature will be temporarily disabled whenever any supporting windows
are visible and active, such as the "Show Choice", "Input Number", "Select
Item" windows. This is because those windows typically have scroll wheel
controls of their own and theirs will take priority. Even if they do not
have scroll wheel controls temporarily, the function will remain disabled
for control consistency.

---

Settings

Enable?:
- Enable disable scroll wheel controls?
- Temporarily disabled during support windows
- ie. Show Choice, Input Number, etc.

Scroll Down: Next?:
- Set "Scroll Down" to "Next"?

Scroll Up: Log?:
- Set "Scroll Up" to "Message Log"?
- Requires VisuMZ_3_MessageLog!

---
```
