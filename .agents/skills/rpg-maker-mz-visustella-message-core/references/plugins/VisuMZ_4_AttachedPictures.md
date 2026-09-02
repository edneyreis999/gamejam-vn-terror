# VisuMZ_4_AttachedPictures

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_4_AttachedPictures`
- Contract: [RPG Maker MZ] [Tier 4] [AttachedPictures]
- Required plugins: None declared
- Declared load order: after VisuMZ_1_MessageCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| AttachedPictures | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| MsgWindow | Message Window | — | — | — | — | — |
| PictureIDs:arraynum | Default Attached ID(s) | MsgWindow | number\[\] | \["61","62","63","64","65","66","67","68","69","70"\] | — | Select which Picture ID's to default to being attached to Message Window. Can be updated with Plugin Commands. |
| ContainerPosition:num | Container Position | MsgWindow | select | 1 | 0 - Behind Window Skin=0; 1 - In Front of Window Skin=1; 2 - In Front of Window Text=2 | Select the position of the picture container. Pictures will still appear behind supplemental windows. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Message: Attach Picture(s)

- Command ID: `MessageAddPicture`
- Description: Select which Picture ID's to attach to the Message Window.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arraynum | Picture ID(s) | number\[\] | \["1"\] | — | Select which Picture ID's to attach to the Message Window. @ -------------------------------------------------------------------------- |

### Message: Remove Picture(s)

- Command ID: `MessageRemovePicture`
- Description: Select which Picture ID's to remove from the Message Window.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arraynum | Picture ID(s) | number\[\] | \["1"\] | — | Select which Picture ID's to remove from the Message Window. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_P`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Picture: Attach Picture(s)

- Command ID: `PictureAddPicture`
- Description: Select which Picture ID's to attach to another picture.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arraynum | Attach Picture ID(s) | number\[\] | \["1"\] | — | Select which Picture ID's to attach to another picture. |
| TargetID:num | Target Picture ID | number | 2 | — | Select which Picture ID to attach the above picture(s) to. @ -------------------------------------------------------------------------- |

### Picture: Remove Picture(s)

- Command ID: `PictureRemovePicture`
- Description: Select which Picture ID's to remove from any other pictures.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arraynum | Picture ID(s) | number\[\] | \["1"\] | — | Select which Picture ID's to remove from any other pictures. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin allows you to attach Pictures to the Message Window or other
Pictures. This means that their positions, effects, and the like become
relative to the attached target's, including their position and properties.
Use this to display busts on Message Windows or piece together actor busts
with a basic body image, a set of eyes, and a mouth. Add some flavor by
letting pictures interact with the Message Window in different ways as well
as make your actor busts more vivid.

This plugin allows you to attach pictures to the Message Window. This means
that their positions, effects, and the like become relative to the Message
Window's position. Use this to display busts, special effects on an actor's
face, or add some flavor by letting pictures interact with the Message
Window in different ways.

Features include all (but not limited to) the following:

* Pictures attached to other pictures will appear relative to the target
picture's position, origin, and share its other properties like scaling,
opacity, tint, and rotation.
* Pictures attached to the Message Window will appear relative to the
Message Window's position.
* Control these pictures with event commands, such as movement, rotation,
tint, and any kind of picture-related Plugin Command.
* Use pictures as Message Window busts, special effects, or anything you can
think of.
* Create a bust system for your actors displaying various emotions without
needing a whole picture for each emotional combination.
* Change the attached pictures throughout the game. Add to the Message
Window or remove from it with Plugin Commands!

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 4 ------

This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

VisuStella MZ Compatibility

While this plugin is compatible with the majority of the VisuStella MZ
plugin library, it is not compatible with specific plugins or specific
features. This section will highlight the main plugins/features that will
not be compatible with this plugin or put focus on how the make certain
features compatible.

---

VisuMZ_4_PictureCmnEvts

Attached Pictures (for both pictures attached to other pictures or pictures
that are attached to the Message Window) will no longer trigger click
effects in order to reduce lag. Instead, the click area is now bound only to
the base picture it is attached to, if it is a picture. This does not apply
to the Message Window as it would not work with the Message Window anyway.

---

Instructions - Message Pictures

Here are the instructions on how to use this plugin.

---

Step 1:

Option A:

- Open up the Plugin Parameters for this plugin.
- Modify the Message Window > Default Attached ID Plugin Parameter.
- This marks the Picture ID's attached to the Message Window by default.
- Default Picture ID values: 61, 62, 63, 64, 65, 66, 67, 68, 69, 70
- Remember these ID's.

OR

Option B:

- Use the Plugin Command: "Message: Attach Picture(s)"
- Add specific Picture ID's to be attached to the Message Window.
- Remember these ID's.

---

Step 2:

- Create an event or edit an existing one.
- Create a "Show Picture" event using one of the ID's attached to the
Message Window from Step 1.
- Modify the specific ID's with "Move Picture", "Rotate Picture",
"Tint Picture", or "Erase Picture" event commands.
- The effects will be applied to picture(s) attached to the Message Window.

---

Things to Note:

- The picture coordinates are relative to the Message Window's upper left
corner. This means if your picture has an X coordinate of 100, and a Y
coordinate of 50, it will be 100 pixels across and 50 pixels down from the
upper left corner of the Message Window while paying heed to the picture's
anchor/origin position.

- Pictures will be layered in the order of smallest ID towards the bottom to
largest ID towards the top, just like it would on the main map.

- Pictures will only be positioned relative to the Message Window. Any
supplemental windows like the Name Window, Choice Window, and Number Input
Window will appear above the pictures. Keep this in mind as you use them.
There is no changing this.

- Removing a picture from being attached to the Message Window while it is
visible will place it back to the main screen.

- The opposite is also true. If you attach a picture to the Message Window
while it is already on the main screen, it will be attached to the Message
Window suddenly.

- If the Message Window is closing or is invisible, all attached pictures
to the Message Window will disappear until it is fully opened again.

- If the Message Window changes positions (ie from the bottom to the middle)
then all attached pictures will be transported relative to the new location.

- Pictures cannot be simultaneously attached to Message Windows and other
Pictures at the same time. The attachment will go towards whichever command
last attaches them. Attached Pictures also cannot be attached to other
Attached Pictures regardless of their sources.

---

Instructions - Pictures Attached to Other Pictures

Here are the instructions on how to use this plugin.

---

Step 1:

- Use the Plugin Command: "Picture: Attach Picture(s)"
- Add "Attach Picture ID(s)" to be attached to the "Target Picture ID".
- Remember these ID's.

---

Step 2:

- Create an event or edit an existing one.
- Create a "Show Picture" event using one of the ID's attached to the
target Picture from Step 1.
- Create a "Show Picture" event using the target picture ID from Step 1.
- Modify the specific ID's with "Move Picture", "Rotate Picture",
"Tint Picture", or "Erase Picture" event commands.
- The effects will be applied to picture(s) attached to the target Picture.

---

Things to Note:

- The picture coordinates of the attached pictures are relative to the
origin point determined by the target picture. This means if the target
picture uses the "Upper Left" origin point, any attached pictures will use
that as their 0, 0. If they use a "Center" origin point, then the attached
pictures will use the target picture's center.

- Attached pictures will be layered in the order of smallest ID towards the
bottom to largest ID towards the top, just like it would on the main map.

- Attached pictures will always be on top of the picture it is attached to
regardless of their ID's. This means if picture 5 is attached to picture 20,
the attached picture 5 will appear on top of picture 20.

- Attached pictures of base pictures with higher ID's will appear above
other attached pictures and base pictures of lower ID's. This means if
picture 5 is attached to picture 20, it will appear on top of picture 90
that is attached to picture 15.

- Removing a picture from being attached to the target picture while it is
visible will place it back to the main screen.

- The opposite is also true. If you attach a picture to a target picture
while it is already on the main screen, it will be attached to the target
picture suddenly.

- If the target picture is stretched via scale, has its opacity changed,
rotating, or is tinted, attached pictures will adopt those properties. In
regards to opacity changes, each layer can be visibly seen apart from one
another. There is nothing we can do about this as it's a Pixi-related issue.

- The attached pictures won't be shown if the target picture is erased.

- Pictures cannot be simultaneously attached to Message Windows and other
Pictures at the same time. The attachment will go towards whichever command
last attaches them. Attached Pictures also cannot be attached to other
Attached Pictures regardless of their sources.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Message Plugin Commands ===

---

Message: Attach Picture(s)
- Select which Picture ID's to attach to the Message Window.

Picture ID(s):
- Select which Picture ID's to attach to the Message Window.

---

Message: Remove Picture(s)
- Select which Picture ID's to remove from the Message Window.

Picture ID(s):
- Select which Picture ID's to remove from the Message Window.

---

=== Picture Plugin Commands ===

---

Picture: Attach Picture(s)
- Select which Picture ID's to attach to another picture.

Picture ID(s):
- Select which Picture ID's to attach to another picture.

Target Picture ID:
- Select which Picture ID to attach the above picture(s) to.

---

Picture: Remove Picture(s)
- Select which Picture ID's to remove from any other pictures.

Picture ID(s):
- Select which Picture ID's to remove from any other pictures.

---

Plugin Parameters: General Settings

These are the general settings available to this plugin.

---

Message Window

Default Attached ID(s):
- Select which Picture ID's to default to being attached to
Message Window.
- Can be updated with Plugin Commands.

Container Position:
- Select the position of the picture container.
- Pictures will still appear behind supplemental windows.
- 0 - Behind Window Skin
- 1 - In Front of Window Skin
- 2 - In Front of Window Text

---
```
