# VisuMZ_4_Debugger

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_4_Debugger`
- Contract: [RPG Maker MZ] [Tier 4] [Debugger]
- Required plugins: None declared
- Declared load order: No explicit relation declared
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| Debugger | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Quick:arraystruct | Quick Commands | — | struct&lt;Quick&gt;\[\] | \["{\"Name:str\":\"Open Main Menu\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"Forces open the Main Menu.\\\\nWARNING: This may disrupt any events going on currently.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn !SceneManager.isSceneBattle() &amp;&amp; !SceneManager.isSceneMainMenu();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nSceneManager.push(Scene_Menu);\\\"\"}","{\"Name:str\":\"Enable Main Menu\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Enables Main Menu access.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn !SceneManager.isSceneBattle() &amp;&amp; !SceneManager.isSceneMainMenu();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\n$gameSystem.enableMenu();\\\"\"}","{\"Name:str\":\"Disable Main Menu\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Disable Main Menu access.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn !SceneManager.isSceneBattle() &amp;&amp; !SceneManager.isSceneMainMenu();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\n$gameSystem.disableMenu();\\\"\"}","{\"Name:str\":\"Open Save Menu\",\"Icon:num\":\"75\",\"Help:json\":\"\\\"Forces open the Save Menu.\\\\nWARNING: This may disrupt any events going on currently.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn !SceneManager.isSceneBattle() &amp;&amp; !SceneManager.isSceneSaveMenu();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nSceneManager.push(Scene_Save);\\\"\"}","{\"Name:str\":\"Enable Save Menu\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Enables Save Menu access.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn !SceneManager.isSceneBattle() &amp;&amp; !SceneManager.isSceneSaveMenu();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\n$gameSystem.enableSave();\\\\nif (SceneManager.isSceneMainMenu()) {\\\\n    SceneManager._scene._commandWindow.refresh();\\\\n}\\\"\"}","{\"Name:str\":\"Disable Save Menu\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Disable Save Menu access.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn !SceneManager.isSceneBattle() &amp;&amp; !SceneManager.isSceneSaveMenu();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\n$gameSystem.disableSave();\\\\nif (SceneManager.isSceneMainMenu()) {\\\\n    SceneManager._scene._commandWindow.refresh();\\\\n}\\\"\"}","{\"Name:str\":\"Defeat Enemies\",\"Icon:num\":\"78\",\"Help:json\":\"\\\"Defeat all enemies by bringing their HP to 0!\\\\nEnemies with \\\\\\\"Immortal\\\\\\\" won't die, however.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn SceneManager.isSceneBattle();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameTroop.aliveMembers()) {\\\\n    member.setHp(0);\\\\n    if (member.isDead()) member.performCollapse();\\\\n}\\\\nBattleManager.checkBattleEnd();\\\"\"}","{\"Name:str\":\"Enemies to 1 HP\",\"Icon:num\":\"85\",\"Help:json\":\"\\\"Bring all alive enemies to 1 HP.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn SceneManager.isSceneBattle();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameTroop.aliveMembers()) {\\\\n    member.setHp(1);\\\\n}\\\"\"}","{\"Name:str\":\"Enemies to Full HP\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Restores all enemies to their full HP.\\\\nThis will revive dead enemies, too.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn SceneManager.isSceneBattle();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameTroop.members()) {\\\\n    member.setHp(member.mhp);\\\\n}\\\"\"}","{\"Name:str\":\"Defeat Allies\",\"Icon:num\":\"1\",\"Help:json\":\"\\\"Defeat all allies by bringing their HP to 0!\\\\nAllies with \\\\\\\"Immortal\\\\\\\" won't die, however.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn SceneManager.isSceneBattle();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.aliveMembers()) {\\\\n    member.setHp(0);\\\\n    if (member.isDead()) member.performCollapse();\\\\n    member.requestMotionRefresh();\\\\n}\\\\nBattleManager.checkBattleEnd();\\\"\"}","{\"Name:str\":\"Allies to 1 HP\",\"Icon:num\":\"48\",\"Help:json\":\"\\\"Bring all alive allies to 1 HP.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn SceneManager.isSceneBattle();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.aliveMembers()) {\\\\n    member.setHp(1);\\\\n    member.requestMotionRefresh();\\\\n}\\\"\"}","{\"Name:str\":\"Allies Status Recovery\",\"Icon:num\":\"72\",\"Help:json\":\"\\\"Clean all allies of their status effects.\\\\nThis will revive allies, too.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn SceneManager.isSceneBattle();\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.members()) {\\\\n    member.clearStates();\\\\n    member.requestMotionRefresh();\\\\n}\\\"\"}","{\"Name:str\":\"Allies to Full HP\",\"Icon:num\":\"84\",\"Help:json\":\"\\\"Restores all allies to their full HP.\\\\nThis will revive dead allies, too.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.members()) {\\\\n    member.setHp(member.mhp);\\\\n    member.requestMotionRefresh();\\\\n}\\\"\"}","{\"Name:str\":\"Allies to Full MP\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Restores all allies to their full MP.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.members()) {\\\\n    member.setMp(member.mmp);\\\\n}\\\"\"}","{\"Name:str\":\"Allies to Full TP\",\"Icon:num\":\"77\",\"Help:json\":\"\\\"Restores all allies to their full TP.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.members()) {\\\\n    member.setTp(member.maxTp());\\\\n}\\\"\"}","{\"Name:str\":\"+1 All Items\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Add x1 of every item except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataItems) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, 1);\\\\n}\\\\nSoundManager.playUseItem();\\\"\"}","{\"Name:str\":\"+1 All Weapons\",\"Icon:num\":\"97\",\"Help:json\":\"\\\"Add x1 of every weapons except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataWeapons) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, 1);\\\\n}\\\\nSoundManager.playEquip();\\\"\"}","{\"Name:str\":\"+1 All Armors\",\"Icon:num\":\"137\",\"Help:json\":\"\\\"Add x1 of every armor except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataArmors) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, 1);\\\\n}\\\\nSoundManager.playMiss();\\\"\"}","{\"Name:str\":\"+10 All Items\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Add x10 of every item except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataItems) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, 10);\\\\n}\\\\nSoundManager.playUseItem();\\\"\"}","{\"Name:str\":\"+10 All Weapons\",\"Icon:num\":\"97\",\"Help:json\":\"\\\"Add x10 of every weapons except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataWeapons) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, 10);\\\\n}\\\\nSoundManager.playEquip();\\\"\"}","{\"Name:str\":\"+10 All Armors\",\"Icon:num\":\"137\",\"Help:json\":\"\\\"Add x10 of every armor except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataArmors) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, 10);\\\\n}\\\\nSoundManager.playMiss();\\\"\"}","{\"Name:str\":\"+Max All Items\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Add max of every item except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataItems) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, $gameParty.maxItems(obj));\\\\n}\\\\nSoundManager.playUseItem();\\\"\"}","{\"Name:str\":\"+Max All Weapons\",\"Icon:num\":\"97\",\"Help:json\":\"\\\"Add max of every weapons except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataWeapons) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, $gameParty.maxItems(obj));\\\\n}\\\\nSoundManager.playEquip();\\\"\"}","{\"Name:str\":\"+Max All Armors\",\"Icon:num\":\"137\",\"Help:json\":\"\\\"Add max of every armor except for those without names\\\\nor those named ----- serving as database placeholders.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataArmors) {\\\\n    if (!obj) continue;\\\\n    if (obj.name.trim() === '') continue;\\\\n    if (obj.name.match(/-----/i)) continue;\\\\n    $gameParty.gainItem(obj, $gameParty.maxItems(obj));\\\\n}\\\\nSoundManager.playMiss();\\\"\"}","{\"Name:str\":\"Remove All Items\",\"Icon:num\":\"176\",\"Help:json\":\"\\\"Remove all items from the party's inventory.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataItems) {\\\\n    if (!obj) continue;\\\\n    $gameParty.loseItem(obj, $gameParty.maxItems(obj));\\\\n}\\\\nSoundManager.playUseItem();\\\"\"}","{\"Name:str\":\"Remove All Weapons\",\"Icon:num\":\"97\",\"Help:json\":\"\\\"Remove all weapons from the party's inventory.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataWeapons) {\\\\n    if (!obj) continue;\\\\n    $gameParty.loseItem(obj, $gameParty.maxItems(obj));\\\\n}\\\\nSoundManager.playEquip();\\\"\"}","{\"Name:str\":\"Remove All Armors\",\"Icon:num\":\"137\",\"Help:json\":\"\\\"Remove all armors from the party's inventory.\\\"\",\"CloseOut:eval\":\"false\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const obj of $dataArmors) {\\\\n    if (!obj) continue;\\\\n    $gameParty.loseItem(obj, $gameParty.maxItems(obj));\\\\n}\\\\nSoundManager.playMiss();\\\"\"}","{\"Name:str\":\"Party Level +1\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Raises all current party members' levels by 1.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.allMembers()) {\\\\n    if (!member) continue;\\\\n    member.changeLevel(member.level + 1, false);\\\\n}\\\"\"}","{\"Name:str\":\"Party Level +10\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Raises all current party members' levels by 10.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.allMembers()) {\\\\n    if (!member) continue;\\\\n    member.changeLevel(member.level + 10, false);\\\\n}\\\"\"}","{\"Name:str\":\"Party Level Max\",\"Icon:num\":\"73\",\"Help:json\":\"\\\"Raises all current party members' levels to maximum.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.allMembers()) {\\\\n    if (!member) continue;\\\\n    member.changeLevel(member.maxLevel(), false);\\\\n}\\\"\"}","{\"Name:str\":\"Party Level -1\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Lowers all current party members' levels by 1.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.allMembers()) {\\\\n    if (!member) continue;\\\\n    member.changeLevel(member.level - 1, false);\\\\n}\\\"\"}","{\"Name:str\":\"Party Level -10\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Lowers all current party members' levels by 10.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.allMembers()) {\\\\n    if (!member) continue;\\\\n    member.changeLevel(member.level - 10, false);\\\\n}\\\"\"}","{\"Name:str\":\"Party Level To 1\",\"Icon:num\":\"74\",\"Help:json\":\"\\\"Lowers all current party members' levels to 1.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.allMembers()) {\\\\n    if (!member) continue;\\\\n    member.changeLevel(1, false);\\\\n}\\\"\"}","{\"Name:str\":\"Add All Skills\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Adds all skills for all party members.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.aliveMembers()) {\\\\n    if (!member) continue;\\\\n    for (const skill of $dataSkills) {\\\\n        if (!skill) continue;\\\\n        if (skill.name.trim() === '') continue;\\\\n        if (skill.name.match(/-----/i)) continue;\\\\n        member.learnSkill(skill.id);\\\\n    }\\\\n}\\\"\"}","{\"Name:str\":\"Add Typed Skills\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Adds all skills with matching skill types for each party member.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.aliveMembers()) {\\\\n    if (!member) continue;\\\\n    for (const skill of $dataSkills) {\\\\n        if (!skill) continue;\\\\n        if (skill.name.trim() === '') continue;\\\\n        if (skill.name.match(/-----/i)) continue;\\\\n        if (!member.skillTypes().includes(skill.stypeId)) continue;\\\\n        member.learnSkill(skill.id);\\\\n    }\\\\n}\\\"\"}","{\"Name:str\":\"Remove All Skills\",\"Icon:num\":\"79\",\"Help:json\":\"\\\"Adds all skills for all party members.\\\"\",\"CloseOut:eval\":\"true\",\"Visibility:func\":\"\\\"//Return Boolean\\\\nreturn true;\\\"\",\"Action:func\":\"\\\"//Perform Action\\\\nfor (const member of $gameParty.aliveMembers()) {\\\\n    if (!member) continue;\\\\n    for (const skill of $dataSkills) {\\\\n        if (!skill) continue;\\\\n        member.forgetSkill(skill.id);\\\\n    }\\\\n}\\\"\"}"\] | — | A list of commands and their JS code to add to the debug menu's Quick option. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Quick

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | Command name for the Quick command. |
| Icon:num | Icon | — | — | 0 | — | Icon index used for the Quick command. |
| Help:json | Help | — | note | "Text1\nText2" | — | Help description displayed for this Quick command. |
| CloseOut:eval | Close Debugger on Select | — | boolean | true | — | Close the debugger upon running the action? |
| Visibility:func | JS: Visibility | — | note | "//Return Boolean\nreturn true;" | — | JavaScript code to determine the visibility of this command. |
| Action:func | JS: Action | — | note | "//Perform Action\n" | — | JavaScript code that runs upon selecting this command. |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

The RPG Maker MZ default debug menu (accessible through the F9 key during a
play test session) only has switch and variable manipulation options, which
might not be enough for some game developers. This plugin adds in a new
debug menu with access to launching Common Events on the go, teleporting to
any desired map, quick options, initiating battles, modifying quantities for
items, weapons, armors, altering self switches, and applying buffs, debuffs,
and states. Furthermore, this plugin also makes the debug menu accessible
from anywhere.

Features include all (but not limited to) the following:

- Access the Debug Menu (F9 key) from anywhere instead of just from the
map scene.
- Switches and Variables are color-coded to make it easier to spot which
ones are on, off, unnamed, and on while unnamed.
- Debug Menu's Common Event option allows you to launch any desired Common
Event while on the map or in battle.
- The "Teleport" option lets you traverse through the game's various maps
with ease.
- The "Quick" command lets you access a variety of options that may come in
handy during play testing.
- "Battle" option allows you to initiate a battle with preemptive modifiers,
surprise attack, or neither.
- The item, weapon, and armor menus allow you to adjust their quantities
held by the party easily.
- Adjust Self Switches A, B, C, D through the "Map Events" command.
- "Buffs & States" command allows you to apply or remove buffs, debuffs, and
states while also altering their turns, stacks, and more.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 4 ------

This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

F9 Button

- The F9 button will now call the new debug menu. It's now accessible from
any scene. The old debug menu still exists but is now unaccessible normally
through the F9 button as it's been reassigned.

---

Debugger Menu: Switches

This is the standard Switch adjustment menu you're used to in default RPG
Maker MZ. Use this menu to turn specific switches ON or OFF mid-game.

- The main differences here are that the menu is color-coded to show
[ON] and [OFF] states better.
- Unnamed switches that are turned [ON] will have their names displayed as
"! ATTENTION !" to draw attention. This is in case you may have been using
a specific switch that you've forgotten to name, and you wouldn't want to
override its properties in a future event.

Debugger Menu: Variables

This is the standard Variables adjustment menu you're used to in default RPG
Maker MZ. Use this menu to change the value stored inside variables.

- Unlike the default RPG Maker MZ Debug Menu's variable controller, here
you can alter the variable values in larger increments than 1 or 10.
- You can even select the variable and type in the number you want it to be
to allow for quicker adjustments.
- Unnamed variables that have non-0 values will have their names displayed
as "! ATTENTION !" to draw attention. This is in case you may have been
using a specific variable that you've forgotten to name, and you wouldn't
want to override its properties in a future event.

Debugger Menu: Common Events

This is a new menu added by this plugin that was not originally available in
the default RPG Maker MZ Debug Menu.

- This option accessible from the map scene only.
- This menu allows you to launch specific common events.
- TIP: You can use this to create your own debug commands that involve
eventing.

Debugger Menu: Teleport

This is a new menu added by this plugin that was not originally available in
the default RPG Maker MZ Debug Menu.

- This option accessible from the map scene only.
- Select a map to teleport to, then select the place to put down the player
character on that map.
- The left column lists the maps in the order shown in the MZ editor.
- The right column lists the maps in numeric order by Map ID.

Debugger Menu: Quick

This is a new menu added by this plugin that was not originally available in
the default RPG Maker MZ Debug Menu.

- Options found in this menu will vary depending on which scene you're
currently located in.
- Select from a variety of JavaScript coded commands that enable faster
testing for your game.
- Commands can be added/removed/altered from the Plugin Parameters.

Debugger Menu: Battle

This is a new menu added by this plugin that was not originally available in
the default RPG Maker MZ Debug Menu.

- This option accessible from the map scene only.
- Enter a battle with the selected Troop.
- You can choose to start the battle with a Preemptive bonus, a Surprise
Attack penalty, or neither.

Debugger Menu: Items, Weapons, Armors

These new menus added by this plugin that were not originally available in
the default RPG Maker MZ Debug Menu.

- Adjust the quantity of items, weapons, and/or armors found in the game
project.
- Unnamed items and items with ----- in their names are automatically
filtered from the list to reduce bloat.
- You can alter the amount of gold the party is holding, too.
- When hovering over the central gold, item, weapon, or armor option, you
can type in the exact number of that object you wish.
- For weapons and armors, the numbers available represent the amount of
the object currently being carried by the party. Any equipped weapons or
armors do not count towards the quantity.

Debugger Menu: Map Events

This is a new menu added by this plugin that was not originally available in
the default RPG Maker MZ Debug Menu.

- This option accessible from the map scene only.
- This menu allows you to adjust the A, B, C, D Self Switches an event has.
- You can also erase events from this menu.
- This does not give you control over the Self Switches and Self Variables
added through other plugins due to how limitless they are.

Debugger Menu: Buffs & States

This is a new menu added by this plugin that was not originally available in
the default RPG Maker MZ Debug Menu.

- Lets you select a specific party member (or enemy if in battle) to alter
their current buffs, debuffs, and/or states.
- For buffs, debuffs, and states, you can alter how many turns are remaining
if the battler is currently affected by it.
- You can change the amount of buff or debuff stacks a battler has.
- If using the VisuStella MZ Skills & States Core, you can alter the custom
value assigned to the state if it's a numeric value.

Plugin Parameters: Quick Commands

A list of commands and their JS code to add to the debug menu's
Quick option. You can add in any command you need here.

---

Quick Command

Name:
- Command name for the Quick command.

Icon:
- Icon index used for the Quick command.

Help:
- Help description displayed for this Quick command.

Close Debugger on Select:
- Close the debugger upon running the action?

JS: Visibility:
- JavaScript code to determine the visibility of this command.

JS: Action:
- JavaScript code that runs upon selecting this command.

---
```
