# VisuMZ_3_StateTooltips

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_StateTooltips`
- Contract: [RPG Maker MZ] [Tier 3] [StateTooltips]
- Required plugins: VisuMZ_1_BattleCore, VisuMZ_1_MessageCore, VisuMZ_1_SkillsStatesCore
- Declared load order: after VisuMZ_1_BattleCore; after VisuMZ_1_MessageCore; after VisuMZ_1_SkillsStatesCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| StateTooltips | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Tooltip:struct | Tooltip Settings | — | struct&lt;Tooltip&gt; | {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0","KeySelectShow":"","SelectShowEnabled:eval":"true","SelectShowCenter:eval":"true","SelectShowDelay:num":"1500","SelectShowOffsetX:num":"+0","SelectShowActorFrontviewOffsetX:num":"+0","SelectShowWeaknessDisplayOffsetX:num":"+0","SelectShowOffsetY:num":"+0","SelectShowActorFrontviewOffsetY:num":"-4","SelectShowWeaknessDisplayOffsetY:num":"+20"} | — | General settings for the State Tooltips Window. |
| Vocab:struct | Vocabulary Settings | — | struct&lt;Vocab&gt; | {"General":"","HelpDescription:json":"\"-\"","Entries":"","StateFmt:str":"\\C\[%5\]%1%2:\\C\[0\] %3 %4","BuffFmt:str":"\\C\[%5\]%1%2▲:\\C\[0\] Increases unit's %2 to \\C\[%5\]%3%\\C\[0\] %4","DebuffFmt:str":"\\C\[%5\]%1%2▼:\\C\[0\] Decreases unit's %2 to \\C\[%5\]%3%\\C\[0\] %4","ReplaceWhite:eval":"true","WhiteReplaceColor:str":"5","Turns":"","ActionsFmt:str":"\\C\[6\](Actions \\C\[%2\]%1\\C\[6\])\\C\[0\]","TurnsFmt:str":"\\C\[5\](Turns \\C\[%2\]%1\\C\[5\])\\C\[0\]","PassiveText:str":"\\C\[4\](Passive)\\C\[0\]"} | — | Vocabulary settings for the State Tooltips Window. |
| Window:struct | Window Settings | — | struct&lt;Window&gt; | {"Window_BattleStatus:eval":"true","Window_ClassStatus:eval":"true","Window_EquipStatus:eval":"true","Window_MenuActor:eval":"true","Window_MenuStatus:eval":"true","Window_PartyStatus:eval":"true","Window_SkillStatus:eval":"true","Window_Status:eval":"true"} | — | Choose which windows to enable tooltip support for. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Tooltip

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Appearance | — | — | — | — | — | — |
| Scale:num | Scale | Appearance | — | 0.6 | — | What scale size do you want for the tooltip? Use 1.0 for normal size. |
| BaseShowCenter:eval | Centered? | Appearance | boolean | false | — | Center the state tooltip when shown through hovering? |
| WindowSkin:str | Skin Filename | Appearance | file | Window | — | What window skin do you want to use for the tooltip? |
| WindowOpacity:num | Skin Opacity | Appearance | number | 240 | — | What opacity setting is used for the tooltip? Use a number between 0 and 255. |
| Offset | — | — | — | — | — | — |
| OffsetX:num | Offset X | Offset | — | +0 | — | Offset the tooltip X position from the mouse? Negative: left. Positive: right. |
| OffsetY:num | Offset Y | Offset | — | +0 | — | Offset the tooltip Y position from the mouse? Negative: up. Positive: down. |
| KeySelectShow | Keyboard-Select Show | — | — | — | — | — |
| SelectShowEnabled:eval | Enabled? | KeySelectShow | boolean | true | — | Show state tooltips when selecting targets using keyboard? |
| SelectShowCenter:eval | Centered? | KeySelectShow | boolean | true | — | Center the state tooltip when shown through keyboard? |
| SelectShowDelay:num | Hover Delay (MS) | KeySelectShow | number | 1500 | — | How many milliseconds (ms) to delay the tooltip from showing as to not clutter up target selection screen. |
| SelectShowOffsetX:num | Offset X | KeySelectShow | — | +0 | — | Offset the tooltip X position from target's base? Negative: left. Positive: right. |
| SelectShowActorFrontviewOffsetX:num | Actor Frontview X | SelectShowOffsetX:num | — | +0 | — | Additional Offset X when selecting actors in frontview. Negative: left. Positive: right. |
| SelectShowWeaknessDisplayOffsetX:num | Weakness Display X | SelectShowOffsetX:num | — | +0 | — | Additional Offset X when using VisuMZ_3_WeaknessDisplay. Negative: left. Positive: right. |
| SelectShowOffsetY:num | Offset Y | KeySelectShow | — | +0 | — | Offset the tooltip Y position from target's base? Negative: up. Positive: down. |
| SelectShowActorFrontviewOffsetY:num | Actor Frontview Y | SelectShowOffsetY:num | — | -4 | — | Additional Offset Y when selecting actors in frontview. Negative: up. Positive: down. |
| SelectShowWeaknessDisplayOffsetY:num | Weakness Display Y | SelectShowOffsetY:num | — | +20 | — | Additional Offset Y when using VisuMZ_3_WeaknessDisplay. Negative: up. Positive: down. |

### Struct: Vocab

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| HelpDescription:json | Default Description | General | note | "-" | — | This is the default description that appears for a state without a declared description. %1 - State's Name |
| Entries | — | — | — | — | — | — |
| EnemyAspectFmt:str | Enemy Aspect Format | Entries | — | \C\[%4\]%1%2:\C\[0\] %3 | — | Can use text codes. %1 - Icon, %2 - Name, %3 - Description, %4 - Aspect Color |
| StateFmt:str | State Format | Entries | — | \C\[%5\]%1%2:\C\[0\] %3 %4 | — | Can use text codes. %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color |
| BuffFmt:str | Buff Format | Entries | — | \C\[%5\]%1%2▲:\C\[0\] Increases unit's %2 to \C\[%5\]%3%\C\[0\] %4 | — | Can use text codes. %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color |
| DebuffFmt:str | Debuff Format | Entries | — | \C\[%5\]%1%2▼:\C\[0\] Decreases unit's %2 to \C\[%5\]%3%\C\[0\] %4 | — | Can use text codes. %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color |
| ReplaceWhite:eval | Replace Whites? | Entries | boolean | true | — | If state, buff, debuff names are white, replace them? |
| WhiteReplaceColor:str | Replacement Color | ReplaceWhite:eval | — | 5 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| Turns | Turns Remaining | — | — | — | — | — |
| ActionsFmt:str | Action End Format | Turns | — | \C\[6\](Actions \C\[%2\]%1\C\[6\])\C\[0\] | — | Can use text codes. %1 - Remaining, %2 - State/Buff/Debuff Color |
| TurnsFmt:str | Turn End Format | Turns | — | \C\[5\](Turns \C\[%2\]%1\C\[5\])\C\[0\] | — | Can use text codes. %1 - Remaining, %2 - State/Buff/Debuff Color |
| PassiveText:str | Passive Text | Turns | — | \C\[4\](Passive)\C\[0\] | — | Can use text codes. |

### Struct: Window

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Window_BattleStatus:eval | Window_BattleStatus | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_ClassStatus:eval | Window_ClassStatus | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_EquipStatus:eval | Window_EquipStatus | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_MenuActor:eval | Window_MenuActor | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_MenuStatus:eval | Window_MenuStatus | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_PartyStatus:eval | Window_PartyStatus | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_SkillStatus:eval | Window_SkillStatus | — | boolean | true | — | Enable State Tooltips for this window? |
| Window_Status:eval | Window_Status | — | boolean | true | — | Enable State Tooltips for this window? |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin adds a tooltip window in battle (and other scenes) whenever the
player's mouse cursor is hovered over specific areas of the screen. The
tooltip window will display a list of the states, buffs, and debuffs the
hovered battler has along with a description of the entities and their
remaining duration.

Features include all (but not limited to) the following:

* Tooltip window displays when hovering over battlers and specific windows
to display their states, buffs, and debuffs.
* Adjust the text format in which information is displayed inside the
tooltip window.
* Modify the descriptions for states, buffs, and debuffs to your liking.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_1_BattleCore
* VisuMZ_1_MessageCore
* VisuMZ_1_SkillsStatesCore

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

VisuMZ_2_PartySystem

VisuMZ_2_ClassChangeSystem

These plugins have scenes that also support tooltips if this plugin is also
installed while those are active in your game's project.

---

VisuStella MZ Compatibility

While this plugin is compatible with the majority of the VisuStella MZ
plugin library, it is not compatible with specific plugins or specific
features. This section will highlight the main plugins/features that will
not be compatible with this plugin or put focus on how the make certain
features compatible.

---

VisuMZ_1_ElementStatusCore

The updated Status Menu currently does not contain tooltip support for the
"General" pages that may display the actor's states. This is due to the
customization aspect for the various Status Menu pages. There will be a
future update where we will adapt this feature.

---

VisuMZ_2_DragonbonesUnion

If you are using a Dragonbones Battler and want to apply a state tooltip to
it, the access area of the battler will be based on the hitbox size you
declare for the Dragonbones Battler with notetags. This is because all
Dragonbones battlers do not have innate automatically calculated hitbox
sizes as a result of their dynamically animated nature.

Please refer to the notetag section of the Dragonbones Union plugin for
Dragonbones Battler hitboxes to learn how to apply hitbox sizes.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Description-Related Notetags ===

---

<Help Description>
text
text
</Help Description>

- Used for: State Notetags
- Assigns a help description for the state.
- Replace 'text' with text you want displayed for the tooltip window.
- This best works with one line.
- If this notetag is not used, the help description will default to the
setting found in the plugin's Plugin Parameters.
- Insert %1 into the help description to show any data that would otherwise
be shown as the state display, such as Absorption Barrier count.
- This is used as a common notetag between Battle Core's state descriptions
and State Tooltips' state descriptions.

---

<State Tooltip Description>
text
text
</State Tooltip Description>

- Used for: State Notetags
- Assigns a help description for the state.
- Replace 'text' with text you want displayed for the tooltip window.
- This best works with one line.
- If this notetag is not used, the help description will default to the
setting found in the plugin's Plugin Parameters.
- Insert %1 into the help description to show any data that would otherwise
be shown as the state display, such as Absorption Barrier count.
- If both <Help Description> and <State Tooltip Description> notetags
exist in the same state, priority will be given to this one for the
state tooltips window.

---

<Exclude From Tooltips>

- Used for: State Notetags
- Excludes the state from being displayed in the state tooltips.

---

Plugin Parameters: Tooltip Settings

General settings for the State Tooltips Window.

---

Appearance

Scale:
- What scale size do you want for the tooltip?
- Use 1.0 for normal size.

Centered?:
- Center the state tooltip when shown through hovering?

Skin Filename:
- What window skin do you want to use for the tooltip?

Skin Opacity:
- What opacity setting is used for the tooltip?
- Use a number between 0 and 255.

---

Offset

Offset X:
- Offset the tooltip X position from the mouse?
- Negative: left. Positive: right.

Offset Y:
- Offset the tooltip Y position from the mouse?
- Negative: up. Positive: down.

---

Keyboard-Select Show:

This allows showing enemy tooltips when selecting targets during battle
while using the keyboard. Tooltip will appear after a brief pause while
selecting the enemy.

Enabled?:
- Show state tooltips when selecting targets using keyboard?

Centered?:
- Center the state tooltip when shown through keyboard?

Hover Delay (MS):
- How many milliseconds (ms) to delay the tooltip from showing as to not
clutter up target selection screen.

Offset X:
- Offset the tooltip X position from target's base?
- Negative: left. Positive: right.

Actor Frontview X:
- Additional Offset X when selecting actors in frontview.
- Negative: left. Positive: right.

Weakness Display X:
- Additional Offset X when using VisuMZ_3_WeaknessDisplay.
- Negative: left. Positive: right.

Offset Y:
- Offset the tooltip Y position from target's base?
- Negative: up. Positive: down.

Actor Frontview Y:
- Additional Offset Y when selecting actors in frontview.
- Negative: up. Positive: down.

Weakness Display Y:
- Additional Offset Y when using VisuMZ_3_WeaknessDisplay.
- Negative: up. Positive: down.

---

Plugin Parameters: Vocabulary Settings

Vocabulary settings for the State Tooltips Window.

---

General

Default Description:
- This is the default description that appears for a state without a
declared description. %1 - State's Name
- Can use text codes.

---

Entries

Enemy Aspect Format:
-  Can use text codes.
- %1 - Icon, %2 - Name, %3 - Description, %4 - Aspect Color

State Format:
- Can use text codes.
- %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color

Buff Format:
- Can use text codes.
- %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color

Debuff Format:
- Can use text codes.
- %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color

Replace Whites?:
- If state, buff, debuff names are white, replace them?

Replacement Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

---

Turns Remaining

Action End Format:
- Can use text codes.
- %1 - Remaining, %2 - State/Buff/Debuff Color

Turn End Format:
- Can use text codes.
- %1 - Remaining, %2 - State/Buff/Debuff Color

Passive Text:
- Can use text codes.

---

Plugin Parameters: Window Settings

Choose which windows to enable tooltip support for.

---

Settings

Window_BattleStatus:
Window_ClassStatus:
Window_EquipStatus:
Window_MenuActor:
Window_MenuStatus:
Window_PartyStatus:
Window_SkillStatus:
Window_Status:
- Enable State Tooltips for this window?

---
```
