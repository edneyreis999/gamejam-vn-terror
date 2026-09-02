# VisuMZ_4_SkillShop

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_4_SkillShop`
- Contract: [RPG Maker MZ] [Tier 4] [SkillShop]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| SkillShop | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| DefaultSkillCost:num | Default Skill Cost | Default | — | 1000 | — | What is the default skill cost for skills that lack the &lt;Skill Shop Cost: x&gt; notetag? |
| BgSettings:struct | Background Settings | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | Background settings for Scene_SkillShop. |
| Vocab:struct | Vocabulary Settings | — | struct&lt;Vocab&gt; | {"Window_SkillShopCommand":"","LearnText:str":"Learn","LearnIcon:str":"79","LearnHelpDesc:json":"\"Select a skill for a party member to learn.\"","CancelText:str":"Exit","CancelIcon:str":"82","CancelHelpDesc:json":"\"Leave the skill shop.\"","Window_SkillShopActorList":"","ActorHelpDescFmt:json":"\"%1 is a level %2 %3.\\nCan learn %4 skills.\"","stypeJoin:str":",","spaceJoin:eval":"true","Window_SkillShopSkillList":"","alreadyLearned:str":"Learned","noStypeAccess:str":"No %1 Access","wrongClass:str":"Not For %1","forClass:str":"For %1","levelRequirement:str":"Needs Lv %1","skillLearnRequirement:str":"Needs %2%1"} | — | These settings let you adjust the text displayed for this plugin. |
| Window:struct | Window Settings | — | struct&lt;Window&gt; | {"Window_Help":"","HelpWindow_BgType:num":"0","Window_Gold":"","GoldWindow_BgType:num":"0","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_SkillShopCommand":"","CommandWindow_BgType:num":"0","CommandWindow_Style:str":"auto","CommandWindow_RectJS:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_SkillShopActorList":"","ActorListWindow_BgType:num":"0","drawActorFace:eval":"true","drawActorName:eval":"true","drawActorClass:eval":"true","ActorListWindow_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_SkillShopSkillList":"","SkillListWindow_BgType:num":"0","SkillListWindow_RectJS:func":"\"const ww = Math.ceil(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\\nconst wx = Math.floor(Graphics.boxWidth / 2);\\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\""} | — | These settings let you adjust the windows displayed for this plugin. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: BgSettings

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| SnapshotOpacity:num | Snapshop Opacity | — | number | 192 | — | Snapshot opacity for the scene. |
| BgFilename1:str | Background 1 | — | file | — | — | Filename used for the bottom background image. Leave empty if you don't wish to use one. |
| BgFilename2:str | Background 2 | — | file | — | — | Filename used for the upper background image. Leave empty if you don't wish to use one. |

### Struct: Vocab

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Window_SkillShopCommand | Command Window | — | — | — | — | — |
| LearnText:str | Learn Text | Window_SkillShopCommand | — | Learn | — | Text used for this command. |
| LearnIcon:str | Icon | LearnText:str | — | 79 | — | Icon used for this command. |
| LearnHelpDesc:json | Help Description | LearnText:str | note | "Select a skill for a party member to learn." | — | Help window description used for this command. Text codes allowed. |
| CancelText:str | Cancel Text | Window_SkillShopCommand | — | Exit | — | Text used for this command. |
| CancelIcon:str | Icon | CancelText:str | — | 82 | — | Icon used for this command. |
| CancelHelpDesc:json | Help Description | CancelText:str | note | "Leave the skill shop." | — | Help window description used for this command. Text codes allowed. |
| Window_SkillShopActorList | Actor List Window | — | — | — | — | — |
| ActorHelpDescFmt:json | Help Description | Window_SkillShopActorList | note | "%1 is a level %2 %3.\nCan learn %4 skills." | — | Help window description used for actors. %1 - Name, %2 - Level, %3 - Class Name, %4 - Skill Types |
| stypeJoin:str | Skill Type Joiner | ActorHelpDescFmt:json | — | , | — | Text used to join together skill types for the help description. |
| spaceJoin:eval | Joiner Space | ActorHelpDescFmt:json | boolean | true | — | Adds a space after the join type, too. |
| Window_SkillShopSkillList | Skill List Window | — | — | — | — | — |
| alreadyLearned:str | Already Learned | Window_SkillShopSkillList | — | Learned | — | Text used for a skill that's already learned. |
| noStypeAccess:str | No SType Access | Window_SkillShopSkillList | — | No %1 Access | — | Text used for a skill that's missing SType access. %1 - Skill Type Name |
| wrongClass:str | Wrong Class | Window_SkillShopSkillList | — | Not For %1 | — | Text used for a skill that needs certain classes. %1 - Actor's Current Class Name |
| forClass:str | For Class | Window_SkillShopSkillList | — | For %1 | — | Text used for a skill that needs a certain class. %1 - Specific Class Name |
| levelRequirement:str | Level Requirement | Window_SkillShopSkillList | — | Needs Lv %1 | — | Text used for a skill that requires a minimum level. %1 - Needed Level |
| skillLearnRequirement:str | Learned Skill | Window_SkillShopSkillList | — | Needs %2%1 | — | Text used for a skill that requires a learned skill. %1 - Needed Skill Name, %2 - Icon |

### Struct: Window

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Window_Help | Help Window | — | — | — | — | — |
| HelpWindow_BgType:num | Background Type | Window_Help | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| Window_Gold | Gold Window | — | — | — | — | — |
| GoldWindow_BgType:num | Background Type | Window_Gold | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| GoldWindow_RectJS:func | JS: X, Y, W, H | Window_Gold | note | "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |
| Window_SkillShopCommand | Command Window | — | — | — | — | — |
| CommandWindow_BgType:num | Background Type | Window_SkillShopCommand | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CommandWindow_Style:str | Style | Window_SkillShopCommand | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw commands for this window? |
| CommandWindow_RectJS:func | JS: X, Y, W, H | Window_SkillShopCommand | note | "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |
| Window_SkillShopActorList | Actor List Window | — | — | — | — | — |
| ActorListWindow_BgType:num | Background Type | Window_SkillShopActorList | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| drawActorFace:eval | Draw Actor Face? | Window_SkillShopActorList | boolean | true | — | Draws the face of the actor. |
| drawActorName:eval | Draw Actor Name? | Window_SkillShopActorList | boolean | true | — | Draws the name of the actor. |
| drawActorClass:eval | Draw Actor Class? | Window_SkillShopActorList | boolean | true | — | Draws the class of the actor. |
| ActorListWindow_RectJS:func | JS: X, Y, W, H | Window_SkillShopActorList | note | "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |
| Window_SkillShopSkillList | Skill List Window | — | — | — | — | — |
| SkillListWindow_BgType:num | Background Type | Window_SkillShopSkillList | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| SkillListWindow_RectJS:func | JS: X, Y, W, H | Window_SkillShopSkillList | note | "const ww = Math.ceil(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight() - this.calcWindowHeight(1, true);\nconst wx = Math.floor(Graphics.boxWidth / 2);\nconst wy = this.mainAreaTop() + this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Scene: Open Skill Shop

- Command ID: `SceneOpenSkillShop`
- Description: Opens a skill shop with the below skills for sale. Cannot be used in battle.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkillIDs:arraynum | Skill ID(s) | skill\[\] | \[\] | — | Select which Skill ID(s) to include in the shop. |
| DiscountRate:eval | Discount Rate | — | 0.00 | — | Determine the discount rate used for this shop. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin allows you to call forth a Skill Shop that contains varying
skills that the player can purchase with gold to teach to various party
members as long as the shop's skill requirements are met.

Features include all (but not limited to) the following:

* Call forth a new scene in the form of a skill shop for the player to
select and purchase skills to teach to various party members.
* Skills can have custom cost amounts.
* Skills can require certain party members to be at certain levels, classes,
or even have learned other skills before being taught.
* Skills can also be locked away behind switch requirements.
* Different shops opened by different events can contain different skills.
* Apply a discount rate to the shop to reduce the cost of all skills within
that shop.

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

VisuMZ_2_MoreCurrencies

Skills can also be learned with items, weapons, armors, and/or variables as
long as this plugin is present and the respective notetags are used.

---

VisuMZ_3_VisualGoldDisplay

The cost of skills will be shown in Visual Gold Display format.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Skill Shop-Related Notetags ===

---

<Skill Shop Cost: x>

- Used for: Skill Notetags
- Changes the cost of this skill to 'x' in order for it to be learned from
a skill shop.
- Replace 'x' with a number representing the cost of the skill to be learned
from a skill shop.
- If this notetag is not used, use the default cost value found in the
Plugin Parameters.

---

<Item id Learn Cost: x>
<Item name Learn Cost: x>

<Weapon id Learn Cost: x>
<Weapon name Learn Cost: x>

<Armor id Learn Cost: x>
<Armor name Learn Cost: x>

<Variable id Learn Cost: x>

- Used for: Skill Notetags
- Requires Imported.VisuMZ_2_MoreCurrencies!
- Allows purchase of skill using items, weapons, armors, or variables as
extended currency.
- Replace 'id' with a number representing the ID of the item, weapon, armor,
or variable to be taken (when bought).
- Replace 'name' with the name of the item, weapon, armor, or variable to be
taken (when bought).
- Replace 'x' with the quantity of the item, weapon, armor, or variable that
will be taken (when bought).
- Insert multiple copies of these notetags to add more item, weapon, armor,
or variable costs.

---

<Skill Shop Require Class: id>
<Skill Shop Require Classes: id, id, id>

<Skill Shop Require Class: name>
<Skill Shop Require Classes: name, name, name>

- Used for: Skill Notetags
- This skill can only be learned by actors with the specified class(es)
when taught through the skill shop.
- For 'id' variant, replace 'id' with a number representing the class ID.
- For 'name' variant, replace 'name' with the class's name.

---

<Skill Shop Require Level: x>

- Used for: Skill Notetags
- This skill can only be learned by actors who are at least level 'x'.
- Replace 'x' with a number representing the required level.

---

<Skill Shop Require Learned Skill: id>
<Skill Shop Require Learned Skills: id, id, id>

<Skill Shop Require Learned Skill: name>
<Skill Shop Require Learned Skills: name, name, name>

- Used for: Skill Notetags
- This skill can only be learned by actors who have learned the listed
skill(s). All of the skills must be learned.
- For 'id' variant, replace 'id' with a number representing the skill ID.
- For 'name' variant, replace 'name' with the skill's name.

---

<Skill Shop Require Switch: x>
<Skill Shop Require Switches: x, x, x>

- Used for: Skill Notetags
- This skill can only be learned by actors when the switch(es) 'x' is turned
ON. If multiple switches are required, they must ALL be turned ON.
- Replace 'x' with a number representing the switch ID.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Scene Plugin Commands ===

---

Scene: Open Skill Shop
- Opens a skill shop with the below skills for sale.
- Cannot be used in battle.

Skill ID(s):
- Select which Skill ID(s) to include in the shop.

Discount Rate:
- Determine the discount rate used for this shop.
- You may use JavaScript code.

---

Plugin Parameters: General Settings

These are the general settings for this plugin.

---

General Settings

Default Skill Cost:
- What is the default skill cost for skills that lack the
<Skill Shop Cost: x> notetag?

---

Plugin Parameters: Background Settings

Background settings for Scene_SkillShop.

---

Background Settings

Snapshop Opacity:
- Snapshot opacity for the scene.

Background 1:
- Filename used for the bottom background image.
- Leave empty if you don't wish to use one.

Background 2:
- Filename used for the upper background image.
- Leave empty if you don't wish to use one.

---

Plugin Parameters: Vocabulary Settings

These settings let you adjust the text displayed for this plugin.

---

Command Window

Learn Text:
- Text used for this command.

Icon:
- Icon used for this command.

Help Description:
- Help window description used for this command.
- Text codes allowed.

Exit Text:
- Text used for this command.

Icon:
- Icon used for this command.

Help Description:
- Help window description used for this command.
- Text codes allowed.

---

Actor List Window

Help Description:
- Help window description used for actors.
- %1 - Name, %2 - Level, %3 - Class Name, %4 - Skill Types

Skill Type Joiner:
- Text used to join together skill types for the help description.

Joiner Space:
- Adds a space after the join type, too.

---

Skill List Window

Already Learned:
- Text used for a skill that's already learned.

No SType Access:
- Text used for a skill that's missing SType access.
- %1 - Skill Type Name

Wrong Class:
- Text used for a skill that needs certain classes.
- %1 - Actor's Current Class Name

For Class:
- Text used for a skill that needs a certain class.
- %1 - Specific Class Name

Level Requirement:
- Text used for a skill that requires a minimum level.
- %1 - Needed Level

Learned Skill:
- Text used for a skill that requires a learned skill.
- %1 - Needed Skill Name, %2 - Icon

---

Plugin Parameters: Window Settings

These settings let you adjust the windows displayed for this plugin.

---

Help Window

Background Type:
- Select background type for this window.

---

Gold Window

Background Type:
- Select background type for this window.

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---

Command Window

Background Type:
- Select background type for this window.

Style:
- How do you wish to draw commands for this window?

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---

Actor List Window

Background Type:
- Select background type for this window.

Draw Actor Face?:
- Draws the face of the actor.

Draw Actor Name?:
- Draws the name of the actor.

Draw Actor Class?:
- Draws the class of the actor.
- If screen resolution UI is too small, class name won't be drawn.

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---

Skill List Window

Background Type:
- Select background type for this window.

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---
```
