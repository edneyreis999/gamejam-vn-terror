# VisuMZ_3_AutoSkillTriggers

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_AutoSkillTriggers`
- Contract: [RPG Maker MZ] [Tier 3] [AutoSkillTriggers]
- Required plugins: VisuMZ_1_BattleCore
- Declared load order: after VisuMZ_1_BattleCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| AutoSkillTriggers | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| LimitPerTurn:num | Limit Per Turn (Turn-Base) | — | number | 10 | — | Turn-Based Only. How many triggers per battler per turn? Higher risk of runaway auto triggers at higher counts. |
| LimitPerTurnTPB:num | Limit Per Turn (TPB-Base) | — | number | 5 | — | TPB-Only. How many triggers per battler per turn? Higher risk of runaway auto triggers at higher counts. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

Sometimes you want some skills that only occur after a specific condition
triggers (ie. death, receiving specific elemental damage, or allies
performing skills of a specific type). These skill triggers are now made
possible through this plugin.

Features include all (but not limited to) the following:

* Skill triggers that launch at the start of battle or winning a battle.
* Skills that let actors/enemies do one last hurrah before dying.
* Skills that function as a reaction to the user performing specific actions
ranging from basic attacks, guarding, items, physical attacks, magical
attacks, certain hit attacks, skills from specific skill types, or actions
that inflict any specific kind of elemental damage.
* A total of 60 different auto triggers for a variety of situations.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

- VisuMZ_1_BattleCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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

Battle System - FTB
Battle System - ETB
Battle System - PTB

These battle systems are incompatible with Auto Skill Triggers. This is due
to their turn structures, making them highly incompatible with the way that
Auto Skill Triggers work.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Skill Trigger-Related Notetags ===

<No Auto Skill Trigger>

- Used for: Skill, Item State Notetags
- This prevents Auto Skill Triggers from occurring upon using this
skill or item.

---

<Auto Trigger: condition>

<Auto Trigger x%: condition>

- Used for: Skill Notetags
- Turns this skill into an Auto Trigger Skill, where it will automatically
be used if the 'condition' has been met.
- If using the x% variant, the Auto Trigger has a x% chance to occur.
- Replace 'x' with a number value representing the chance to succeed.
- Skill must be usable normally outside of the occasion in order to trigger.
- This marked skill cannot trigger any other Auto Skill Triggers in order to
prevent an infinite loop.
- Skills can have multiple Auto Triggers and will trigger upon meeting the
conditions of any of them.
- Replace 'condition' with any of the below keywords:

*Note1*: Being the target of an action means the potential target must be
a part of the original scope, regardless of how the targets are changed
up later by Action Sequences.

Keywords:

---

Battle Start
- Triggers skill when the battle starts.

Battle Win
- Triggers skill when the battle is won.

Death
- Triggers skill moments before the user's death.
- If the user recovers enough HP from the skill trigger, then the
user won't die. However, any other Death triggered effects will
still continue to prompt.

---

Attack User
- Triggers skill when the user uses a basic attack.

Guard User
- Triggers skill when the user guards.

Item User
- Triggers skill when the user uses any item.

Physical User
- Triggers skill when the user performs any physical action.

Magical User
- Triggers skill when the user performs any magical action.

Certain Hit User
- Triggers skill when the user performs a certain hit action.

Skill Type name User
- Triggers skill when the user performs a skill of the named
Skill Type.

Element name User
- Triggers skill when the user performs an action with the named
element type.

---

Attack Target
- Triggers skill when user is the target of a basic attack.
- See Note1 Above.

Guard Target
- Triggers skill when user is the target of a guard action.
- See Note1 Above.

Item Target
- Triggers skill when user is the target of an item action.
- See Note1 Above.

Physical Target
- Triggers skill when user is the target of a physical action.
- See Note1 Above.

Magical Target
- Triggers skill when user is the target of a magical action.
- See Note1 Above.

Certain Hit Target
- Triggers skill when user is the target of a certain hit action.
- See Note1 Above.

Skill Type name Target
- Triggers skill when user is the target of a skill by named
Skill Type.
- See Note1 Above.

Element name Target
- Triggers skill when user is the target of of an action with the named
element type.
- See Note1 Above.

---

Attack Ally
- Triggers skill when user is the target of a basic attack
and is an ally of the currently active battler.
- See Note1 Above.

Guard Ally
- Triggers skill when user is the target of a guard action
and is an ally of the currently active battler.
- See Note1 Above.

Item Ally
- Triggers skill when user is the target of an item action
and is an ally of the currently active battler.
- See Note1 Above.

Physical Ally
- Triggers skill when user is the target of a physical action
and is an ally of the currently active battler.
- See Note1 Above.

Magical Ally
- Triggers skill when user is the target of a magical action
and is an ally of the currently active battler.
- See Note1 Above.

Certain Hit Ally
- Triggers skill when user is the target of a certain hit action
and is an ally of the currently active battler.
- See Note1 Above.

Skill Type name Ally
- Triggers skill when user is the target of a skill by named
Skill Type and is an ally of the currently active battler.
- See Note1 Above.

Element name Ally
- Triggers skill when user is the target of of an action with the named
element type and is an ally of the currently active battler.
- See Note1 Above.

---

Attack Enemy
- Triggers skill when user is the target of a basic attack
and is an enemy of the currently active battler.
- See Note1 Above.

Guard Enemy
- Triggers skill when user is the target of a guard action
and is an enemy of the currently active battler.
- See Note1 Above.

Item Enemy
- Triggers skill when user is the target of an item action
and is an enemy of the currently active battler.
- See Note1 Above.

Physical Enemy
- Triggers skill when user is the target of a physical action
and is an enemy of the currently active battler.
- See Note1 Above.

Magical Enemy
- Triggers skill when user is the target of a magical action
and is an enemy of the currently active battler.
- See Note1 Above.

Certain Hit Enemy
- Triggers skill when user is the target of a certain hit action
and is an enemy of the currently active battler.
- See Note1 Above.

Skill Type name Enemy
- Triggers skill when user is the target of a skill by named
Skill Type and is an enemy of the currently active battler.
- See Note1 Above.

Element name Enemy
- Triggers skill when user is the target of of an action with the named
element type and is an enemy of the currently active battler.
- See Note1 Above.

---

Attack Friends
- Triggers skill when a basic attack occurs and the active battler
is in the user's allied team.

Guard Friends
- Triggers skill when a guard action occurs and the active battler
is in the user's allied team.

Item Friends
- Triggers skill when an item action occurs and the active battler
is in the user's allied team.

Physical Friends
- Triggers skill when a physical action occurs and the active battler
is in the user's allied team.

Magical Friends
- Triggers skill when a physical action occurs and the active battler
is in the user's allied team.

Certain Hit Friends
- Triggers skill when a certain hit action occurs and the active battler
is in the user's allied team.

Skill Type name Friends
- Triggers skill when a skill by the named Skill Type action occurs and
the active battler is in the user's allied team.

Element name Friends
- Triggers skill when an action with the named element type occurs and
the active battler is in the user's allied team.

---

Attack Friends Only
- Triggers skill when a basic attack occurs and the active battler
is in the user's allied team, but the active battler cannot be the user.

Guard Friends Only
- Triggers skill when a guard action occurs and the active battler
is in the user's allied team, but the active battler cannot be the user.

Item Friends Only
- Triggers skill when an item action occurs and the active battler
is in the user's allied team, but the active battler cannot be the user.

Physical Friends Only
- Triggers skill when a physical action occurs and the active battler
is in the user's allied team, but the active battler cannot be the user.

Magical Friends Only
- Triggers skill when a physical action occurs and the active battler
is in the user's allied team, but the active battler cannot be the user.

Certain Hit Friends Only
- Triggers skill when a certain hit action occurs and the active battler
is in the user's allied team, but the active battler cannot be the user.

Skill Type name Friends Only
- Triggers skill when a skill by the named Skill Type action occurs and
the active battler is in the user's allied team, but the active battler
cannot be the user.

Element name Friends Only
- Triggers skill when an action with the named element type occurs and
the active battler is in the user's allied team, but the active battler
cannot be the user.

---

Attack Opponents
- Triggers skill when a basic attack occurs and the active battler
is in the user's opposing team.

Guard Opponents
- Triggers skill when a guard action occurs and the active battler
is in the user's opposing team.

Item Opponents
- Triggers skill when an item action occurs and the active battler
is in the user's opposing team.

Physical Opponents
- Triggers skill when a physical action occurs and the active battler
is in the user's opposing team.

Magical Opponents
- Triggers skill when a physical action occurs and the active battler
is in the user's opposing team.

Certain Hit Opponents
- Triggers skill when a certain hit action occurs and the active battler
is in the user's opposing team.

Skill Type name Opponents
- Triggers skill when a skill by the named Skill Type action occurs and
the active battler is in the user's opposing team.

Element name Opponents
- Triggers skill when an action with the named element type occurs and
the active battler is in the user's opposing team.

---

Examples:

<Auto Trigger: Battle Start>
<Auto Trigger: Death>
<Auto Trigger: Attack User>
<Auto Trigger: Guard User>
<Auto Trigger: Physical Target>
<Auto Trigger: Magical Target>
<Auto Trigger: Certain Hit Ally>
<Auto Trigger: Item Enemy>
<Auto Trigger: Skill Type Magic Ally>
<Auto Trigger: Skill Type Special Enemy>
<Auto Trigger: Element Fire Friends>
<Auto Trigger: Element Ice Opponents>

---

Plugin Parameters: General Settings

These are general settings used for this plugin. These are primarily used to
impose a limit on the number of auto skill triggers that can happen per
battler per turn (meaning each member in battle has that limit individually
and not as a whole). Generally speaking, we recommend imposing limits limits
like MP costs, TP costs, cooldowns, and the like.

This is because auto skill triggers, when left unchecked and reacting to
everything, can cause a runaway effect where the player no longer inputs
anything. Instead, it is best to put a limit (even if high) on the number of
auto triggers to prevent such a thing from happening.

If you still want seemingly unlimited auto skill triggers, change the
numbers to 100 or something, but keep in mind that we're not responsible for
runaway effects when the risk of it happening is already mentioned.

---

Settings

Limit Per Turn (Turn-Based):
- Turn-Based Only.
- How many triggers per battler per turn?
- Higher risk of runaway auto triggers at higher counts.

Limit Per Turn (TPB-Based):
- TPB-Only.
- How many triggers per battler per turn?
- Higher risk of runaway auto triggers at higher counts.

---
```
