# VisuMZ_2_EnhancedTpSystem

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_2_EnhancedTpSystem`
- Contract: [RPG Maker MZ] [Tier 2] [EnhancedTP]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | — | — | — | — | — | — |
| EnhancedTP | — | — | — | — | — | — |
| ATTENTION | — | — | — | — | — | — |
| BreakSettings | — | — | — | — | — | — |
| General:struct | — | — | — | — | — | — |
| TpMode:arraystruct | — | — | — | — | — | — |
| BreakEnd1 | — | — | — | — | — | — |
| End Of | — | — | — | — | — | — |
| BreakEnd2 | — | — | — | — | — | — |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Defaults | — | — | — | — | — | — |
| DefaultTpMode:str | Default TP Mode | Defaults | — | Stoic | — | Which TP mode should actors and enemies have by default? |
| GlobalTPModes:arraystr | Global TP Modes | Defaults | string\[\] | \["Stoic","Comrade","Warrior","Healer"\] | — | TP Modes available to the all actors to pick from. |
| SceneSkill | Scene_Skill | — | — | — | — | — |
| ShowTpMode:eval | Show TP Mode? | SceneSkill | boolean | true | — | Show TP Mode in Scene_Skill by default? |
| TpModeCmdName:str | TP Mode Command | SceneSkill | — | %1 Mode | — | The command name format shown in Scene_Skill. %1 - TP Text |
| TpModeIcon:num | TP Mode Icon | SceneSkill | — | 164 | — | Icon used for TP Mode shown in Scene_Skill. |
| TpWindowBgType:num | Background Type | SceneSkill | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |

### Struct: TpMode

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | TP Mode Name | — | — | Untitled | — | The name for this TP Mode. Used for notetag reference. |
| Icon:num | Icon | Name:str | — | 160 | — | Icon used for this TP Mode. |
| Help:json | Help | Name:str | note | "Help Line 1\nHelp Line 2" | — | Help description used for this TP Mode. %1 - In-game TP vocabulary. |
| MaxFormula:str | MaxTP Formula | Name:str | — | 100 | — | What's the MaxTP for this TP Mode? |
| MultiplierTCR:num | TCR Multiplier | Name:str | — | 1.0 | — | Multiplier on how much TP is earned. Stacks multiplicatively with TCR. |
| Preserve:eval | Preserve TP? | Name:str | boolean | true | — | If preserved, carry TP to the next battle. If not, TP resets each battle. |
| Gauge | — | — | — | — | — | — |
| FlashGauge:eval | Flash Gauge? | Gauge | boolean | true | — | Let this gauge flash once it reaches a certain percentage value. Requires VisuMZ_1_SkillsStatesCore! |
| FlashRequirement:num | Required Rate | Gauge | — | 1.0 | — | What rate does this gauge need to be over in order for it to flash? |
| FlashSpeed:num | Flash Speed | Gauge | number | 16 | — | How fast should the gauge flash different colors? Lower numbers are slower. Higher numbers are faster. |
| FlashLightness:num | Color Lightness | Gauge | number | 160 | — | How light should the flash color be? Lower numbers are darker. Higher numbers are lighter. |
| CustomLabel:str | Custom Label | Gauge | — | — | — | Instead of displaying "TP", what label do you want to display here? Leave empty to keep using "TP". |
| CustomColor1:str | Custom Color 1 | Gauge | — | — | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. Empty for default. |
| CustomColor2:str | Custom Color 2 | Gauge | — | — | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. Empty for default. |
| Formulas | TP Formulas | — | — | — | — | — |
| Generic | — | Formulas | — | — | — | — |
| Initial:str | Initial TP | Generic | — | 0 | — | How much TP is gained at the start of battle? |
| CriticalHit:str | Critical Hit | Generic | — | 0 | — | How much TP is gained when landing a critical hit? |
| Evasion:str | Evasion | Generic | — | 0 | — | How much TP is gained when evading an action? |
| UseItem:str | Use Item | Generic | — | 0 | — | How much TP is gained when using an item in battle? |
| UseSkill:str | Use Skill | Generic | — | 0 | — | How much TP is gained when using a skill in battle that isn't Attack or Guard? |
| Regen | During Regen | Formulas | — | — | — | — |
| TpRegen:str | TP Regen | Regen | — | 0 | — | How much TP is gained each turn during regeneration? |
| CriticalHp:str | Critical HP | Regen | — | 0 | — | How much TP is gained when user is in critical HP (25%) during regeneration. |
| FullHp:str | Full HP | Regen | — | 0 | — | How much TP is gained when user has full HP during regeneration. |
| CriticalMp:str | Critical MP | Regen | — | 0 | — | How much TP is gained when user is in critical MP (25%) during regeneration. |
| FullMp:str | Full MP | Regen | — | 0 | — | How much TP is gained when user has full MP during regeneration. |
| OnlyMember:str | Only Member | Regen | — | 0 | — | How much TP is gained when user is the only alive party member during regeneration. |
| HPDmg | HP Damage | Formulas | — | — | — | — |
| TakeHpDmg:str | Take HP Damage | HPDmg | — | 0 | — | How much TP is gained when receiving HP damage? Damage value is stored in 'value' variable. |
| DealHpDmg:str | Deal HP Damage | HPDmg | — | 0 | — | How much TP is gained when dealing HP damage? Damage value is stored in 'value' variable. |
| AllyHpDmg:str | Ally HP Damage | HPDmg | — | 0 | — | How much TP is gained when an ally receives HP damage? Damage value is stored in 'value' variable. |
| HPHeal | HP Heal | Formulas | — | — | — | — |
| TakeHpHeal:str | Take HP Heal | HPHeal | — | 0 | — | How much TP is gained when receiving HP heals? Heal value is stored in 'value' variable. |
| DealHpHeal:str | Deal HP Heal | HPHeal | — | 0 | — | How much TP is gained when dealing HP heals? Heal value is stored in 'value' variable. |
| AllyHpHeal:str | Ally HP Heal | HPHeal | — | 0 | — | How much TP is gained when an ally receives HP heals? Damage value is stored in 'value' variable. |
| MPDmg | MP Damage | Formulas | — | — | — | — |
| TakeMpDmg:str | Take MP Damage | MPDmg | — | 0 | — | How much TP is gained when receiving MP damage? Damage value is stored in 'value' variable. |
| DealMpDmg:str | Deal MP Damage | MPDmg | — | 0 | — | How much TP is gained when dealing MP damage? Damage value is stored in 'value' variable. |
| AllyMpDmg:str | Ally MP Damage | MPDmg | — | 0 | — | How much TP is gained when an ally receives MP damage? Damage value is stored in 'value' variable. |
| MPHeal | MP Heal | Formulas | — | — | — | — |
| TakeMpHeal:str | Take MP Heal | MPHeal | — | 0 | — | How much TP is gained when receiving MP heals? Heal value is stored in 'value' variable. |
| DealMpHeal:str | Deal MP Heal | MPHeal | — | 0 | — | How much TP is gained when dealing MP heals? Heal value is stored in 'value' variable. |
| AllyMpHeal:str | Ally MP Heal | MPHeal | — | 0 | — | How much TP is gained when an ally receives MP heals? Damage value is stored in 'value' variable. |
| Buffs | — | Formulas | — | — | — | — |
| DealAllyBuff:str | Deal Ally Buff | Buffs | — | 0 | — | How much TP is gained when user inflicts a buff on an ally through an Item/Skill Effect (code does not count). |
| DealEnemyBuff:str | Deal Enemy Buff | Buffs | — | 0 | — | How much TP is gained when user inflicts a buff on an enemy through an Item/Skill Effect (code does not count). |
| GainAllyBuff:str | Gain Ally Buff | Buffs | — | 0 | — | How much TP is gained when user gains a buff from an ally through an Item/Skill Effect (code does not count). |
| GainEnemyBuff:str | Gain Enemy Buff | Buffs | — | 0 | — | How much TP is gained when user gains a buff from an enemy through an Item/Skill Effect (code does not count). |
| Debuffs | — | Formulas | — | — | — | — |
| DealAllyDebuff:str | Deal Ally Debuff | Debuffs | — | 0 | — | How much TP is gained when user inflicts a debuff on an ally through an Item/Skill Effect (code does not count). |
| DealEnemyDebuff:str | Deal Enemy Debuff | Debuffs | — | 0 | — | How much TP is gained when user inflicts a debuff on an enemy through an Item/Skill Effect (code does not count). |
| GainAllyDebuff:str | Gain Ally Debuff | Debuffs | — | 0 | — | How much TP is gained when user gains a debuff from an ally through an Item/Skill Effect (code does not count). |
| GainEnemyDebuff:str | Gain Enemy Debuff | Debuffs | — | 0 | — | How much TP is gained when user gains a debuff from an enemy through an Item/Skill Effect (code does not count). |
| States | — | Formulas | — | — | — | — |
| DealAllyState:str | Deal Ally State | States | — | 0 | — | How much TP is gained when user inflicts a state on an ally through an Item/Skill Effect (code does not count). |
| DealEnemyState:str | Deal Enemy State | States | — | 0 | — | How much TP is gained when user inflicts a state on an enemy through an Item/Skill Effect (code does not count). |
| GainAllyState:str | Gain Ally State | States | — | 0 | — | How much TP is gained when user gains a state from an ally through an Item/Skill Effect (code does not count). |
| GainEnemyState:str | Gain Enemy State | States | — | 0 | — | How much TP is gained when user gains a state from an enemy through an Item/Skill Effect (code does not count). |
| Death | — | Formulas | — | — | — | — |
| KillAlly:str | Ally Death | Death | — | 0 | — | How much TP is gained when an allied member dies. Does not matter who the killer is. |
| KillEnemy:str | Enemy Death | Death | — | 0 | — | How much TP is gained when an enemy member dies. Does not matter who the killer is. |
| Battle | — | Formulas | — | — | — | — |
| WinBattle:str | Win Battle | Battle | — | 0 | — | How much TP is gained when the player wins a battle. |
| FleeBattle:str | Flee Battle | Battle | — | 0 | — | How much TP is gained when the player escapes a battle. |
| LoseBattle:str | Lose Battle | Battle | — | 0 | — | How much TP is gained when the player loses a battle. |

## Plugin commands

### Actor: Change TP Mode

- Command ID: `ActorChangeTPMode`
- Description: Changes target actor(s) TP Mode.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actors:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which actor(s) to affect. |
| TPModeName:str | TP Mode Name | — | Stoic | — | Change to this TP Mode for selected actor(s). @ -------------------------------------------------------------------------- |

### Actor: Unlock TP Mode

- Command ID: `ActorUnlockTPMode`
- Description: Unlocks TP Modes for target actor(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actors:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which actor(s) to affect. |
| TPModes:arraystr | TP Modes | string\[\] | \["Stoic","Comrade","Warrior","Healer"\] | — | Change to this TP Mode for selected actor(s). @ -------------------------------------------------------------------------- |

### Actor: Unlock All TP Modes

- Command ID: `ActorUnlockAllTPModes`
- Description: Unlocks all TP Modes for target actor(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actors:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which actor(s) to affect. @ -------------------------------------------------------------------------- |

### Enemy: Change TP Mode

- Command ID: `EnemyChangeTPMode`
- Description: Changes target enemy(ies) TP Mode.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enemies:arraynum | Enemy Index(es) | number\[\] | \["0"\] | — | Select which enemy(ies) to affect. |
| TPModeName:str | TP Mode Name | — | Stoic | — | Change to this TP Mode for selected enemy(ies). @ -------------------------------------------------------------------------- |

### System: Show/Hide TP Mode

- Command ID: `SceneSkillTpMode`
- Description: Shows/Hides TP Mode from Scene_Skill.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Show:eval | -------------------------- | struct&lt;TpMode&gt;\[\] | ---------------------------------- | — | TP Modes available in the game. |

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The TP system in RPG Maker MZ is rather limiting. A lot of the TP system is
hardcoded in giving RPG Maker MZ users very little control over how much TP
gain a battler can receive from particular actions and situations. This
plugin gives you the ability to adjust how much TP battlers will acquire
various actions, different TP modes, and letting players selecting and pick
what TP mode they want for each actor.

Features include all (but not limited to) the following:

* TP Modes that allow actors and enemies to have different ways of
generating TP through battle.
* 30 pre-made TP Modes for you to use and/or learn from.
* Functionality for skills and items to change a target's TP Mode.
* The ability to teach actors new TP modes upon learning new skills.
* Unlock new TP Modes from becoming the target of skills and/or items.
* Trait Objects (like states) that will enforce a specific TP Mode when
applied.
* TP Gauge can flash a variety of colors once a certain percentile range
has been met.
* Integrated TP Mode changer for players within Scene_Skill.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

MaxTP Overwrite

- There was nothing altering MaxTP before and this plugin offers TP Modes
that change up the MaxTP total. The function has been overwritten for more
plugin functionality.

---

Preserve TP

- Preserve TP function has been overwritten so it is no longer determined by
the presence of the Preserve TP trait, but instead, determined by whether or
not the current TP Mode has TP Preservation as its property. This is to keep
the consistency in the TP Modes and to give the game dev more control over
this aspect.

---

Initial TP Gain in Battle Reworked

- If 'Preserve TP' was off, battlers would normally have a random amount of
TP given to them at the start of battle by default. However, there was no
place to control this value in the RPG Maker MZ editor itself so this has
been overwritten to give you, the game dev, full control over this aspect,
and whether or not it requires the 'Preserve TP' flag or not.

---

On Damage TP Gain

- The on Damage function has been overwritten to remove the default TP gain
aspect in favor of custom TP gain aspect granted by the current equipped TP
Mode to keep functionality under control.

---

Sprite_Gauge Changes

- The sprite gauge has been changed slightly to allow for flashing gauges.
They're separated into different layers now when it comes strictly to a TP
gauge. There shouldn't be any noticeable compatibility problems with them
unless there are plugins that alter the TP gauge completely.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== General TP Mode Notetags ===

These are TP Mode-related notatags that affect both actors and enemies.

---

<TP Mode: name>

- Used for: Actor Enemy, State Notetags
- Sets the starting TP Mode for this actor/enemy to be 'name'.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.

---

<Starting TP Modes>
name
name
name
name
</Starting TP Modes>

- Used for: Actor Notetags
- Adds TP Modes to the actor's available list of TP Modes from the start.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.
- Insert more 'name' entries for more TP Modes.

---

<Change Target TP Mode: name>

<Change User TP Mode: name>

- Used for: Skill, Item Notetags
- Changes the target/user's TP Mode to the target TP Mode upon using this
item/skill.
- For <Change Target TP Mode: name>, the action must successfully hit the
target in order for the TP Mode to change.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.

---

=== Actor-Only TP Mode Notetags ===

These are TP Mode-related notetags that only affect actors.

---

<Learn TP Mode: name>

- Used for: Skill Notetags
- Causes the target selected actor to learn the specific TP Mode when the
skill is learned.
- Insert multiple copies of this notetag to have the skill learn more
TP Modes for the target actor.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.
- Keep in mind that learning the skill is required for the TP Mode to be
learned. Adding the skill through a trait will not teach the TP Mode.

---

<Learn TP Modes>
name
name
name
</Learn TP Modes>

- Used for: Skill Notetags
- Causes the target selected actor to learn the specific TP Mode when the
skill is learned.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.
- Insert more 'name' entries for more TP Modes.

---

<Unlock TP Mode: name>

- Used for: Skill, Item Notetags
- Causes the target selected actor to unlock the specific TP Mode.
- Insert multiple copies of this notetag to have the item/skill unlock more
TP Modes for the target actor.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.

---

<Unlock TP Modes>
name
name
name
</Unlock TP Modes>

- Used for: Skill, Item Notetags
- Causes the target selected actor to unlock the specific TP Mode.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.
- Insert more 'name' entries for more TP Modes.

---

<Force TP Mode: name>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Forces the affected battler to use the specific named TP Mode in battle.
- Priority is given based the ordering of trait objects if multiple forced
TP Mode effects are present.
- Replace 'name' with the name of a TP Mode from the Plugin Parameters =>
TP Modes listing.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Actor Plugin Commands ===

---

Actor: Change TP Mode
- Changes target actor(s) TP Mode.

Actor ID(s):
- Select which actor(s) to affect.

TP Mode Name:
- Change to this TP Mode for selected actor(s).

---

Actor: Unlock TP Mode
- Unlocks TP Modes for target actor(s).

Actor ID(s):
- Select which actor(s) to affect.

TP Modes:
- Change to this TP Mode for selected actor(s).

---

Actor: Unlock All TP Modes
- Unlocks all TP Modes for target actor(s).

Actor ID(s):
- Select which actor(s) to affect.

---

=== Enemy Plugin Commands ===

---

Enemy: Change TP Mode
- Changes target enemy(ies) TP Mode.

Enemy Index(es):
- Select which enemy(ies) to affect.

TP Mode Name:
- Change to this TP Mode for selected enemy(ies).

---

=== System Plugin Commands ===

---

System: Show/Hide TP Mode
- Shows/Hides TP Mode from Scene_Skill.

Show TP Mode?:
- Shows/Hides TP Mode in Scene_Skill.

---

Plugin Parameters: General Settings

These are the general settings for the Enhanced TP System plugin. These
control the default settings for TP Modes and TP Mode option appearing in
Scene_Skill for the player.

---

Defaults

Default TP Mode:
- Which TP mode should actors and enemies have by default?

Global TP Modes:
- TP Modes available to the all actors to pick from.

---

Scene_Skill

Show TP Mode?:
- Show TP Mode in Scene_Skill by default?

TP Mode Command:
- The command name format shown in Scene_Skill.
- %1 - TP Text

TP Mode Icon:
- Icon used for TP Mode shown in Scene_Skill.

Background Type:
- Select background type for this window.
- 0 - Window
- 1 - Dim
- 2 - Transparent

---

Plugin Parameters: TP Modes

TP Modes are the TP settings that an actor or enemy has. TP Modes regulate
how TP is earned as well as the maximum TP value the actor/enemy can have.
Players can switch between TP Modes if granted the option, too.

TP Modes can be added, removed, and editted by you the game dev. Each TP
Mode will have the following Plugin Parameters for you to adjust:

---

General

TP Mode Name:
- The name for this TP Mode.
- Used for notetag reference.

Icon:
- Icon used for this TP Mode.

Help:
- Help description used for this TP Mode.
- %1 - In-game TP vocabulary.

MaxTP Formula:
- What's the MaxTP for this TP Mode?

TCR Multiplier:
- Multiplier on how much TP is earned.
- Stacks multiplicatively with TCR.

Preserve TP?:
- If preserved, carry TP to the next battle.
- If not, TP resets each battle.

---

Gauge

Flash Gauge?:
- Let this gauge flash once it reaches a certain percentage value.
- Requires VisuMZ_1_SkillsStatesCore!

Required Rate:
- What rate does this gauge need to be over in order for it to flash?

Flash Speed:
- How fast should the gauge flash different colors?
- Lower numbers are slower. Higher numbers are faster.

Color Lightness:
- How light should the flash color be?
- Lower numbers are darker. Higher numbers are lighter.

Custom Label:
- Instead of displaying "TP", what label do you want to display here?
- Leave empty to keep using "TP".
- This applies to gauges only. This does NOT change the way TP costs are
displayed in the skill windows.

Custom Color 1:
Custom Color 2:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.
- Empty for default colors.
- This applies to gauges only. This does NOT change the way TP costs are
displayed in the skill windows.

---

TP Formulas > Generic

Initial TP:
- How much TP is gained at the start of battle?

Critical Hit:
- How much TP is gained when landing a critical hit?

Evasion:
- How much TP is gained when evading an action?

Use Item:
- How much TP is gained when using an item in battle?

Use Skill:
- How much TP is gained when using a skill in battle that isn't
Attack or Guard?

---

TP Formulas > During Regen

TP Regen:
- How much TP is gained each turn during regeneration?

Critical HP:
- How much TP is gained when user is in critical HP (25%)
during regeneration.

Full HP:
- How much TP is gained when user has full HP
during regeneration.

Critical MP:
- How much TP is gained when user is in critical MP (25%)
during regeneration.

Full MP:
- How much TP is gained when user has full MP
during regeneration.

Only Member:
- How much TP is gained when user is the only alive party member
during regeneration.

---

TP Formulas > HP Damage

Take HP Damage:
- How much TP is gained when receiving HP damage?
- Damage value is stored in 'value' variable.

Deal HP Damage:
- How much TP is gained when dealing HP damage?
- Damage value is stored in 'value' variable.

Ally HP Damage:
- How much TP is gained when an ally receives HP damage?
- Damage value is stored in 'value' variable.

---

TP Formulas > HP Heal

Take HP Heal:
- How much TP is gained when receiving HP heals?
- Heal value is stored in 'value' variable.

Deal HP Heal:
- How much TP is gained when dealing HP heals?
- Heal value is stored in 'value' variable.

Ally HP Heal:
- How much TP is gained when an ally receives HP heals?
- Damage value is stored in 'value' variable.

---

TP Formulas > MP Damage

Take MP Damage:
- How much TP is gained when receiving MP damage?
- Damage value is stored in 'value' variable.

Deal MP Damage:
- How much TP is gained when dealing MP damage?
- Damage value is stored in 'value' variable.

Ally MP Damage:
- How much TP is gained when an ally receives MP damage?
- Damage value is stored in 'value' variable.

---

TP Formulas > MP Heal

Take MP Heal:
- How much TP is gained when receiving MP heals?
- Heal value is stored in 'value' variable.

Deal MP Heal:
- How much TP is gained when dealing MP heals?
- Heal value is stored in 'value' variable.

Ally MP Heal:
- How much TP is gained when an ally receives MP heals?
- Damage value is stored in 'value' variable.

---

TP Formulas > Buffs

Deal Ally Buff:
- How much TP is gained when user inflicts a buff on an ally through an
Item/Skill Effect (code does not count).

Deal Enemy Buff:
- How much TP is gained when user inflicts a buff on an enemy through an
Item/Skill Effect (code does not count).

Gain Ally Buff:
- How much TP is gained when user gains a buff from an ally through an
Item/Skill Effect (code does not count).

Gain Enemy Buff:
- How much TP is gained when user gains a buff from an enemy through an
Item/Skill Effect (code does not count).

---

TP Formulas > Debuffs

Deal Ally Debuff:
- How much TP is gained when user inflicts a debuff on an ally through an
Item/Skill Effect (code does not count).

Deal Enemy Debuff:
- How much TP is gained when user inflicts a debuff on an enemy through
an Item/Skill Effect (code does not count).

Gain Ally Debuff:
- How much TP is gained when user gains a debuff from an ally through an
Item/Skill Effect (code does not count).

Gain Enemy Debuff:
- How much TP is gained when user gains a debuff from an enemy through an
Item/Skill Effect (code does not count).

---

TP Formulas > States

Deal Ally State:
- How much TP is gained when user inflicts a state on an ally through an
Item/Skill Effect (code does not count).

Deal Enemy State:
- How much TP is gained when user inflicts a state on an enemy through an
Item/Skill Effect (code does not count).

Gain Ally State:
- How much TP is gained when user gains a state from an ally through an
Item/Skill Effect (code does not count).

Gain Enemy State:
- How much TP is gained when user gains a state from an enemy through an
Item/Skill Effect (code does not count).

---

TP Formulas > Death

Ally Death:
- How much TP is gained when an allied member dies.
- Does not matter who the killer is.

Enemy Death:
- How much TP is gained when an enemy member dies.
- Does not matter who the killer is.

---

TP Formulas > Battle

Win Battle:
- How much TP is gained when the player wins a battle.

Flee Battle:
- How much TP is gained when the player escapes a battle.

Lose Battle:
- How much TP is gained when the player loses a battle.

---
```
