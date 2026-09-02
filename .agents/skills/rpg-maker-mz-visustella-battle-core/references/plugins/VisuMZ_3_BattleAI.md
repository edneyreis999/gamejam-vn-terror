# VisuMZ_3_BattleAI

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_BattleAI`
- Contract: [RPG Maker MZ] [Tier 3] [BattleAI]
- Required plugins: VisuMZ_1_BattleCore
- Declared load order: after VisuMZ_1_BattleCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| BattleAI | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| General:struct | A.I. General Settings | — | struct&lt;General&gt; | {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"} | — | General settings pertaining to A.I. |
| Default:struct | A.I. Default Conditions | — | struct&lt;Default&gt; | {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP &gt; 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP &lt; Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP &lt; Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP &lt; User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP &gt; 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns &lt;= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns &lt;= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns &lt;= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""} | — | Give certain types of skills default conditions. |
| Weight:struct | A.I. =&gt; TGR Weight | — | struct&lt;Weight&gt; | {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"} | — | How do certain properties translate to TGR weight? |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AIStyle | A.I. Style | — | — | — | — | — |
| ActorStyleAI:str | Actor Style | AIStyle | select | classic | Classic (Rating-Based with Rating Variance)=classic; Gambit (Order-Based, Ignores Rating System)=gambit; Casual (Random but follows A.I. Conditions)=casual; Random (Pure Random, ignores A.I. Conditions)=random | Which A.I. style do you want for referenced actors to use? This does not apply to non-referenced actors. |
| EnemyStyleAI:str | Enemy Style | AIStyle | select | classic | Classic (Rating-Based with Rating Variance)=classic; Gambit (Order-Based, Ignores Rating System)=gambit; Casual (Random but follows A.I. Conditions)=casual; Random (Pure Random, ignores A.I. Conditions)=random | Which A.I. style do you want for enemies to use? |
| AILevel | A.I. Level | — | — | — | — | — |
| ActorAILevel:num | Actor A.I. Level | AILevel | number | 100 | — | Default A.I. level used for actor A.I. Levels: 0-100. Higher is stricter. |
| EnemyAILevel:num | Enemy A.I. Level | AILevel | number | 100 | — | Default A.I. level used for enemy A.I. Levels: 0-100. Higher is stricter. |
| AIRating | A.I. Ratings | — | — | — | — | — |
| ActorRatingVariance:num | Actor Rating Variance | AIRating | number | 1 | — | How much to allow variance from the A.I. rating by? 0 for no variance. Higher numbers for more variance. |
| EnemyRatingVariance:num | Enemy Rating Variance | AIRating | number | 3 | — | How much to allow variance from the A.I. rating by? 0 for no variance. Higher numbers for more variance. |
| Reference | — | — | — | — | — | — |
| ActorAIReference:num | Actor =&gt; AI Reference | Reference | enemy | 0 | — | Which enemy A.I. should the actor reference by default? Use 0 for no references. |
| Knowledge | — | — | — | — | — | — |
| LearnKnowledge:eval | Learn Knowledge | Knowledge | boolean | true | — | Requires enemies/actors to test the knowledge of the opponents before using specific conditions. |
| UnknownElementRate:num | Unknown Element Rate | LearnKnowledge:eval | — | 1.00 | — | What should A.I. treat unknown element rates as? |
| Experimental | — | — | — | — | — | — |
| OnSpotAI:eval | On-The-Spot A.I. | Experimental | boolean | false | — | A.I. enemies/actors determine actions on the spot when it's their turn. |
| SpotRemoveMotions:eval | No Idle Chant | OnSpotAI:eval | boolean | true | — | Requires On-The-Spot A.I. enabled. For A.I. Battlers, disables idle chant motions due to inconsistency. |

### Struct: Default

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable? | — | — | — | — | — | — |
| EnableAllCon:eval | All Conditions | Enable? | boolean | true | — | Create default 'ALL' conditions for all skills without any AI notetags? |
| EnableAnyCon:eval | Any Conditions | Enable? | boolean | true | — | Create default 'ANY' conditions for all skills without any AI notetags? |
| HpDamage | HP Damage | — | — | — | — | — |
| HpDamageAll:json | All Conditions | HpDamage | note | "" | — | Default 'ALL' conditions used for HP damage skills. |
| HpDamageAny:json | Any Conditions | HpDamage | note | "Always" | — | Default 'ANY' conditions used for HP damage skills. |
| MpDamage | MP Damage | — | — | — | — | — |
| MpDamageAll:json | All Conditions | MpDamage | note | "Target MP &gt; 0" | — | Default 'ALL' conditions used for MP damage skills. |
| MpDamageAny:json | Any Conditions | MpDamage | note | "" | — | Default 'ANY' conditions used for MP damage skills. |
| HpRecover | HP Recover | — | — | — | — | — |
| HpRecoverAll:json | All Conditions | HpRecover | note | "" | — | Default 'ALL' conditions used for HP recovery skills. |
| HpRecoverAny:json | Any Conditions | HpRecover | note | "Target HP &lt; Target MaxHP" | — | Default 'ANY' conditions used for HP recovery skills. |
| MpRecover | MP Recover | — | — | — | — | — |
| MpRecoverAll:json | All Conditions | MpRecover | note | "" | — | Default 'ALL' conditions used for MP recovery skills. |
| MpRecoverAny:json | Any Conditions | MpRecover | note | "Target MP &lt; Target MaxMP" | — | Default 'ANY' conditions used for MP recovery skills. |
| HpDrain | HP Drain | — | — | — | — | — |
| HpDrainAll:json | All Conditions | HpDrain | note | "" | — | Default 'ALL' conditions used for HP drain skills. |
| HpDrainAny:json | Any Conditions | HpDrain | note | "User HP &lt; User MaxHP" | — | Default 'ANY' conditions used for HP drain skills. |
| MpDrain | MP Drain | — | — | — | — | — |
| MpDrainAll:json | All Conditions | MpDrain | note | "Target MP &gt; 0" | — | Default 'ALL' conditions used for MP drain skills. |
| MpDrainAny:json | Any Conditions | MpDrain | note | "" | — | Default 'ANY' conditions used for MP drain skills. |
| AddState | Add State | — | — | — | — | — |
| AddStateAll:json | All Conditions | AddState | note | "" | — | Default 'ALL' conditions used for adding states. %1 - Dynamic values (ie state ID's). |
| AddStateAny:json | Any Conditions | AddState | note | "Target Not State %1\nTarget State %1 Turns &lt;= 1" | — | Default 'ANY' conditions used for adding states. %1 - Dynamic values (ie state ID's). |
| RemoveState | Remove State | — | — | — | — | — |
| RemoveStateAll:json | All Conditions | RemoveState | note | "" | — | Default 'ALL' conditions used for removing states. %1 - Dynamic values (ie state ID's). |
| RemoveStateAny:json | Any Conditions | RemoveState | note | "Target Has State %1" | — | Default 'ANY' conditions used for removing states. %1 - Dynamic values (ie state ID's). |
| AddBuff | Add Buff | — | — | — | — | — |
| AddBuffAll:json | All Conditions | AddBuff | note | "" | — | Default 'ALL' conditions used for adding buffs. %1 - Dynamic values (ie param names). |
| AddBuffAny:json | Any Conditions | AddBuff | note | "Target Not %1 Max Buff\nTarget %1 Buff Turns &lt;= 1" | — | Default 'ANY' conditions used for adding buffs. %1 - Dynamic values (ie param's). |
| RemoveBuff | Remove Buff | — | — | — | — | — |
| RemoveBuffAll:json | All Conditions | RemoveBuff | note | "" | — | Default 'ALL' conditions used for removing buffs. %1 - Dynamic values (ie state ID's). |
| RemoveBuffAny:json | Any Conditions | RemoveBuff | note | "Target Has %1 Buff" | — | Default 'ANY' conditions used for removing buffs. %1 - Dynamic values (ie state ID's). |
| AddDebuff | Add Debuff | — | — | — | — | — |
| AddDebuffAll:json | All Conditions | AddDebuff | note | "" | — | Default 'ALL' conditions used for adding debuffs. %1 - Dynamic values (ie state ID's). |
| AddDebuffAny:json | Any Conditions | AddDebuff | note | "Target Not %1 Max Debuff\nTarget %1 Debuff Turns &lt;= 1" | — | Default 'ANY' conditions used for adding debuffs. %1 - Dynamic values (ie state ID's). |
| RemoveDebuff | Remove Debuff | — | — | — | — | — |
| RemoveDebuffAll:json | All Conditions | RemoveDebuff | note | "" | — | Default 'ALL' conditions used for removing debuffs. %1 - Dynamic values (ie state ID's). |
| RemoveDebuffAny:json | Any Conditions | RemoveDebuff | note | "Target Has %1 Debuff" | — | Default 'ANY' conditions used for removing debuffs. %1 - Dynamic values (ie state ID's). |

### Struct: Weight

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ElementTgr:eval | Element Rate =&gt; TGR | — | boolean | true | — | Makes all A.I. consider elemental rates when considering TGR weight by default? |
| ElementTgrRate:num | Influence Rate | ElementTgr:eval | — | 1.25 | — | This determines the default level of influence elemental rates have on TGR weight. |
| EvaTgr:eval | EVA Rate =&gt; TGR | — | boolean | true | — | Makes all A.I. consider EVA rates when considering TGR weight by default? |
| EvaTgrRate:num | Influence Rate | EvaTgr:eval | — | 1.50 | — | This determines the default level of influence EVA rates have on TGR weight. |
| MevTgr:eval | MEV Rate =&gt; TGR | — | boolean | true | — | Makes all A.I. consider MEV rates when considering TGR weight by default? |
| MevTgrRate:num | Influence Rate | MevTgr:eval | — | 2.00 | — | This determines the default level of influence MEV rates have on TGR weight. |
| PdrTgr:eval | PDR Rate =&gt; TGR | — | boolean | true | — | Makes all A.I. consider PDR rates when considering TGR weight by default? |
| PdrTgrRate:num | Influence Rate | PdrTgr:eval | — | 1.25 | — | This determines the default level of influence PDR rates have on TGR weight. |
| MdrTgr:eval | MDR Rate =&gt; TGR | — | boolean | true | — | Makes all A.I. consider MDR rates when considering TGR weight by default? |
| MdrTgrRate:num | Influence Rate | MdrTgr:eval | — | 1.50 | — | This determines the default level of influence MDR rates have on TGR weight. |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

This Battle A.I. plugin changes up how enemies and any Auto Battle actors
behave by implementing many new key components to their decision making
process in battle. These new compotents are: A.I. Styles, A.I. Levels,
Rating Variance, A.I. Conditions, and Influencing TGR Weight.

With these new key components put together, you can transform RPG Maker MZ's
highly primitive A.I. into something more intelligent. Auto Battle actors
can also base their A.I. patterns off an enemy's A.I. in order to behave in
more desirable ways during battle as well.

Features include all (but not limited to) the following:

* Different A.I. Styles to allow for various ways to setup enemy A.I.
* Set A.I. Levels for enemies and Auto Battle actors.
* A.I. Levels can be set on a global scale or individual scale.
* Set rating variance levels to prioritize actions or randomize them.
* These include notetags to change them on a per individual basis.
* Create action conditions to make certain skills usable by the A.I. under
specific circumstances.
* Action conditions are split between 'ALL' and 'ANY' types which require
either all conditions to be met or at least one condition to be met.
* A large selection of condition notetags to use to help customize the best
case situations on when to use a skill and which target to pick.
* Default condition settings can be made in the Plugin Parameters to make an
entire database of skills become conditional for A.I. usage.
* Influence TGR weight to make certain targets more desirable for specific
types of actions.

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

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Auto Battle A.I. for Actors

- With this plugin, there is an option to let certain classes reference
specific enemy A.I. patterns to decide which skills to use during battle.
If the reference option is not used, the actor will use default Auto Battle
evaluations to determine which skills to use instead.

---

A.I. Styles

- There are currently four different A.I. Styles. Actors and enemies can
default to a different one globally, or changed individually using notetags.
Read more about them in the A.I. Styles section.

---

A.I. Levels

- Enemies and actors can be given different A.I. Levels. The higher one's
A.I. Level, the more they are to follow conditions. With Level 100 A.I.
Level, an A.I. will never disobey a condition. On the other hand, lower
A.I. Levels may possibly ignore certain conditions and act as if they are
fulfilled.

---

A.I. Rating Variance

- In the RPG Maker database editor, when deciding an enemy's Action Patterns
you can decide on the action's "rating". The rating is a value from 1 to 9
where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
default, will sometimes dip the rating a few levels lower to allow lower
ratings and bypass the priority system.

- This plugin allows you to set the variance level through Plugin Parameters
on a global scale or notetags on an individual basis to allow for larger,
smaller, or no variance on ratings at all.

---

A.I. Conditions for Skill Usage

- Enemies and any actors that use Auto Battle A.I. with a reference can only
use certain skills as long as specific conditions have been met. These
conditions are split between 'ALL' condition sets and 'ANY' condition sets.

- 'ALL' condition sets require all of the set's conditions to be met in
order for the skill to be used by the A.I.

- 'ANY' condition sets require at least one of the set's conditions to be
met in order for the skill to be used by the A.I.

- A variety of conditions can be inserted into each condition set to make
for some very specific usage conditions. These will also help filter out
which targets to pick from, too.

---

TGR Weight on A.I. Target Selection

- TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
The higher one's TGR, the more likely they are to become the target of an
attack. This plugin allows various things to influence the TGR weight to
make certain targets more likely to be targets for attack.

- Elemental influence rates on the TGR weight mean that if a target receives
more damage from an elemental attack, the TGR weight becomes higher for that
skill when determining a target. The higher the elemental damage received,
the more the TGR weight shifts upward.

- Evasion and Magic Evasion rates do the opposite. The higher a potential
target's evasion and magic evasion rate is (for physical and magical skills)
the lower the TGR weight becomes for that potential target.

- By default Plugin Parameter settings, TGR weight shifting requires the
enemy troop to have "knowledge" on the party's element rates, evasion, and
magic evasion properties. Enemy troops would have to hit actors with element
based attacks to learn the actor's resistance levels, physical attacks to
learn the actor's evasion, and magical attacks to learn the actor's magic
evasion levels.

---

A.I. Styles

There are currently four different A.I. Styles. These determine how the
A.I. acts and behaves. You can change the A.I. Style used globally through
the Plugin Parameters or individually for classes and enemies through the
usage of notetags.

Read below to understand each style and its rules:

---

Classic Style

"Classic" style is the traditional and default RPG Maker MZ A.I. style.
It puts emphasis on the Rating system, where skills with higher ratings are
given more priority than skills with lower ratings within variance.

- Action Pattern conditions must be met.
- Skill must be usable (able to pay its cost and it isn't disabled).
- Skill A.I. conditions must be met.
- Priority is given towards actions with higher Ratings.
- Rating variance will be determined by Plugin Parameters and/or notetags.
- A.I. Level can affect whether or not A.I. Conditions would be ignored.
- After applying Ratings, Rating Variances, and A.I. Conditions, if there
are still multiple actions to choose from, pick from the remaining actions
randomly.
- If no actions are valid, then do nothing.

---

Gambit Style

- "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
It goes down the list of skills with top-down priority as long as they meet
the Action Pattern conditions and A.I. conditions. Ratings will be ignored.

- Priority starts from top of skill list and goes to bottom of skill list.
- Action Pattern conditions must be met.
- Skill must be usable (able to pay its cost and it isn't disabled).
- Skill A.I. conditions must be met.
- Priority is given towards actions located higher on the list.
- Actions towards the bottom of the list will have lower priority.
- Ratings and Rating Variance has no bearing on whether or not an action
will be picked.
- A.I. Level can affect whether or not A.I. Conditions would be ignored.
- If no actions are valid, then do nothing.

---

Casual Style

- "Casual" style takes a lighter approach to A.I. It ignores the Ratings
system and doesn't care about the order of actions either. Instead, the
only thing this A.I. Style cares about are the A.I. Conditions. All valid
actions after that are randomly picked from.

- Action Pattern conditions must be met.
- Skill must be usable (able to pay its cost and it isn't disabled).
- Skill A.I. conditions must be met.
- There is no priority system for Ratings or Order.
- A.I. Level does not matter here.
- A random action will be selected from a group of remaining valid actions.
- If no actions are valid, then do nothing.

---

Random Style

- "Random" style simply does not care about ratings or order. It only cares
if the skill's can be used (can pay for the cost) and Action Pattern
conditions. It does not care about A.I. Conditions, Ratings, or Order.

- Action Pattern conditions must be met.
- Skill must be usable (able to pay its cost and it isn't disabled).
- Skill A.I. conditions are ignored.
- There is no priority system for Ratings or Order.
- A.I. Level does not matter here.
- A random action will be selected from a group of remaining valid actions.
- If no actions are valid, then do nothing.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

=== General A.I. Settings Notetags ===

These notetags set the general A.I. related settings for enemies and any
actors that use A.I. (requires Auto Battle and has a reference A.I.).

---

<AI Style: x>

- Used for: Class, Enemy Notetags
- Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
quotes. Example: <AI Style: Gambit>
- Determines the A.I. style used. Refer to the A.I. Styles section on the
various types of styles.
- For actors, place this inside the associated class's notebox instead.
- For actors, this does not apply if there is no referenced enemy A.I. list.
- Setup the reference enemy through either the Plugin Parameters or by using
the <Reference AI: Enemy id> notetag found below.

---

<AI Level: x>

- Used for: Actor, Enemy Notetags
- Designates the unit's A.I. level if A.I. is to be used.
- Replace 'x' with a number from 0 to 100.
- Units with higher A.I. Levels will be more strict about conditions.
- Units with lower A.I. Levels will be more lax about conditions.

---

<AI Rating Variance: x>

- Used for: Actor, Enemy Notetags
- Sets the variance amount when determining A.I. actions by rating.
- Replace 'x' with a number between 0 and 9.
- 0 for no variance.
- Lower numbers for less variance.
- Higher numbers for more variance.

---

<Reference AI: Enemy id>
<Reference AI: name>

- Used for: Class Notetags
- Causes any actor using this class that has the Auto Battle trait to use
a specific enemy's attack pattern (ratings, conditions, etc.) to determine
which skill to use in battle.
- Replace 'id' with a number representing the enemy's ID to reference.
- Replace 'name' with the name the enemy to reference.
- Actors are only able to use skills they would normally have access to.
- Actors need to have LEARNED the skill.
- Actors need to be able to access the skill's SKILL TYPE.
- Actors need to have the RESOURCES to pay for the skill.
- If you cannot figure out why an auto battle actor cannot use a specific
skill, turn OFF auto battle and see if you can use the skill normally.

---

<No Reference AI>

- Used for: Class Notetags
- Prevents the class from using any enemies as their reference A.I. pattern
(including the one set in the Plugin Parameters).

---

=== Skill A.I. Condition Notetags ===

Insert these notetags into the noteboxes of skills that you'd like to give
custom A.I. conditions for. The 'All' version of the notetags require every
condition to be met while the 'Any' version of the notetags require only one
of the conditions to be met.

If both are used together, then the 'All' conditions must be completely
fulfilled while the 'Any' conditions need only one to be fulfilled.

---

<All AI Conditions>
condition
condition
condition
</All AI Conditions>

- Used for: Skill
- Add/remove as many conditions as needed for the skill.
- All conditions must be met in order for this to become a valid skill for
the AI to use.
- This can be used together with <Any AI Conditions>. If either of these
notetags exist, do not use the Plugin Parameter defaul conditions.
- This will not inherit default 'All' conditions in the Plugin Parameters.
- Replace 'condition' with any of the following Condition List below.

---

<Any AI Conditions>
condition
condition
condition
</Any AI Conditions>

- Used for: Skill
- Add/remove as many conditions as needed for the skill.
- As long as one condition is met, this becomes a valid skill for the AI
to use. If none of them are met, this skill becomes invalid for AI use.
- This can be used together with <All AI Conditions>. If either of these
notetags exist, do not use the Plugin Parameter defaul conditions.
- This will not inherit default 'Any' conditions in the Plugin Parameters.
- Replace 'condition' with any of the following Condition List below.

---

<No AI Conditions>

- Used for: Skill
- Removes any default 'All' and 'Any' conditions for this skill.

---

-=-=- Condition List -=-=-

Replace 'condition' in the notetags in the above section with any of the
following to make conditions. These conditions are also used in the Plugin
Parameters for the default conditions, too.

---

x >= y
x > y
x === y
x !== y
x < y
x <= y

- Replace 'x' and 'y' with any of the following:

- A numeric value representing a hard number.
- '50%' or any other percentile number to represent a rate.
- '0.5' or any other float number to represent a rate.

- 'Variable x' (replace 'x' with a number) for variable x's current value.

- 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
- 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
- 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
this to affect enemies.
- 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
parameter value.

- 'param Buff Stacks' for the potential target's current Buff stacks.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
- 'param Debuff Stacks' for the potential target's current Debuff stacks.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'

- 'param Buff Turns' for potential target's current buff turn duration.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
- Returns 0 if the potential target is not affected by that buff.
- 'param Debuff Turns' for potential target's current debuff turn duration.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
- Returns 0 if the potential target is not affected by that debuff.

- 'State id Turns' or 'State name Turns' for potential target's current turn
duration on that particular state.
- Replace 'id' with a number representing the ID of the state.
- Replace 'name' with the state's name.
- Returns 0 if the potential target is not affected by that state.
- Returns the max safe number value if the potential target is has that
state as a passive state.

- 'Element id Rate', 'Element name Rate', 'name Element Rate'
- Returns a (float) value of the potential target's element's rate.
- Replace 'id' with the ID of the element whose rate is to be checked.
- Replace 'name' with the name of the element whose rate is to be checked.
- Ignore any text codes in the element name.

- 'Team Alive Members'
- Returns a number value indicating how many alive members there are on
the potential target's team.

- 'Team Dead Members'
- Returns a number value indicating how many dead members there are on
the potential target's team.

- When no keyword matches are found, the comparison value will be
interpreted as JavaScript code. If the JavaScript code fails, it will
default to a 0 value.

*NOTE* JavaScript cannot be used without comparison operators to reduce
error. This means if you want to check if a switch is on or not, don't
simply use "$gameSwitches.value(42)" as it does not have any comparison
operators. Instead, use "$gameSwitches.value(42) === true" to check.

*NOTE* To make any of these conditions base off of the user instead, add
the word 'user' before the condition as such:

user hp% >= 0.50
user atk buff stacks === 2
user team alive members < 3

---

Always

- Going to be valid no matter what.

---

x% Chance

- Replace 'x' with a number value representing the percent chance this skill
would pass as valid.

---

Switch x On
Switch x Off

- Replace 'x' with the ID of the switch to check as ON/OFF.

---

User is Actor
User is Enemy
Target is Actor
Target is Enemy

- Requires the user or potential target to be an actor/enemy.

---

User Has State id
User Has State name
Target Has State id
Target Has State name

- Replace 'id' with the ID of the state the user or potential target needs
to have.
- Replace 'name' with the name of the state the target needs to have.

---

User Not State id
User Not State name
Target Not State id
Target Not State name

- Replace 'id' with the ID of the state the user or potential target
cannot have.
- Replace 'name' with the name of the state the target cannot have.

---

User Has param Buff
User Has param Debuff
Target Has param Buff
Target Has param Debuff

- Requires user or potential target to have the associated parameter
buff/debuff at any stack level.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'

---

User Has param Max Buff
User Has param Max Debuff
Target Has param Max Buff
Target Has param Max Debuff

- Requires potential user or target to have the associated parameter
buff/debuff at maxed out stacks.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'

---

User Not param Buff
User Not param Debuff
Target Not param Buff
Target Not param Debuff

- Requires user or potential target to not have the associated parameter
buff/debuff at any stack level.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'

---

User Not param Max Buff
User Not param Max Debuff
Target Not param Max Buff
Target Not param Max Debuff

- Requires user or potential target to not have the associated parameter
buff/debuff at maxed out stacks.
- Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'

---

=== A.I. => TGR Weight Notetags ===

You can set how much influence on TGR weights actors and enemies will place
when determining valid targets for their actions.

---

<AI Element Rate Influence: x.x>

- Used for: Actor, Enemy Notetags
- Sets how much TGR weight influence is given based on the element rate.
- Replace 'x.x' with a numberic value representing the influence rate.

---

<Bypass AI Element Rate Influence>

- Used for: Actor, Enemy Notetags
- Makes the actor/enemy not factor in element rates when calculating TGR
weights to determine action targets.

---

<AI EVA Influence: x.x>

- Used for: Actor, Enemy Notetags
- Sets how much TGR weight influence is given based on the EVA rate.
- Replace 'x.x' with a numberic value representing the influence rate.

---

<Bypass AI EVA Influence>

- Used for: Actor, Enemy Notetags
- Makes the actor/enemy not factor in EVA rates when calculating TGR
weights to determine action targets.

---

<AI MEV Influence: x.x>

- Used for: Actor, Enemy Notetags
- Sets how much TGR weight influence is given based on the MEV rate.
- Replace 'x.x' with a numberic value representing the influence rate.

---

<Bypass AI MEV Influence>

- Used for: Actor, Enemy Notetags
- Makes the actor/enemy not factor in MEV rates when calculating TGR
weights to determine action targets.

---

<AI PDR Influence: x.x>

- Used for: Actor, Enemy Notetags
- Sets how much TGR weight influence is given based on the PDR rate.
- Replace 'x.x' with a numberic value representing the influence rate.

---

<Bypass AI PDR Influence>

- Used for: Actor, Enemy Notetags
- Makes the actor/enemy not factor in PDR rates when calculating TGR
weights to determine action targets.

---

<AI MDR Influence: x.x>

- Used for: Actor, Enemy Notetags
- Sets how much TGR weight influence is given based on the MDR rate.
- Replace 'x.x' with a numberic value representing the influence rate.

---

<Bypass AI MDR Influence>

- Used for: Actor, Enemy Notetags
- Makes the actor/enemy not factor in MDR rates when calculating TGR
weights to determine action targets.

---

=== Specific A.I. Targeting Notetags ===

Specific A.I. targeting means the user will ignore any TGR influences when
it comes to pick out of a group of valid candidates to come down to one
target. This only affects skills where the user must select a specific
target, meaning it will ignore the effects of random and AoE scopes.

---

<AI Target: type>

- Used for: Skill Notetags
- Bypasses TGR influence in favor of picking a specific target out of a
group of valid targets (does not pick from outside the valid target group)
for a skill target.
- Replace 'type' with any of the following:

----------------------------   -------------------------------------------
Type                           Description
----------------------------   -------------------------------------------
User                           Always picks the user if available
First                          Always picks the first valid candidate
Last                           Always picks the last valid candidate
----------------------------   -------------------------------------------
Highest Level                  Picks candidate with highest level
----------------------------   -------------------------------------------
Highest MaxHP                  Picks candidate with highest MaxHP
Highest HP                     Picks candidate with highest current HP
Highest HP%                    Picks candidate with highest HP ratio
----------------------------   -------------------------------------------
Highest MaxMP                  Picks candidate with highest MaxMP
Highest MP                     Picks candidate with highest current MP
Highest MP%                    Picks candidate with highest MP ratio
----------------------------   -------------------------------------------
Highest MaxTP                  Picks candidate with highest MaxTP
Highest TP                     Picks candidate with highest current TP
Highest TP%                    Picks candidate with highest TP ratio
----------------------------   -------------------------------------------
Highest ATK                    Picks candidate with highest ATK parameter
Highest DEF                    Picks candidate with highest DEF parameter
Highest MAT                    Picks candidate with highest MAT parameter
Highest MDF                    Picks candidate with highest MDF parameter
Highest AGI                    Picks candidate with highest AGI parameter
Highest LUK                    Picks candidate with highest LUK parameter
----------------------------   -------------------------------------------
Highest HIT                    Picks candidate with highest HIT parameter
Highest EVA                    Picks candidate with highest EVA parameter
Highest CRI                    Picks candidate with highest CRI parameter
Highest CEV                    Picks candidate with highest CEV parameter
Highest MEV                    Picks candidate with highest MEV parameter
Highest MRF                    Picks candidate with highest MRF parameter
Highest CNT                    Picks candidate with highest CNT parameter
Highest HRG                    Picks candidate with highest HRG parameter
Highest MRG                    Picks candidate with highest MRG parameter
Highest TRG                    Picks candidate with highest TRG parameter
----------------------------   -------------------------------------------
Highest TGR                    Picks candidate with highest TGR parameter
Highest GRD                    Picks candidate with highest GRD parameter
Highest REC                    Picks candidate with highest REC parameter
Highest PHA                    Picks candidate with highest PHA parameter
Highest MCR                    Picks candidate with highest MCR parameter
Highest TCR                    Picks candidate with highest TCR parameter
Highest PDR                    Picks candidate with highest PDR parameter
Highest MDR                    Picks candidate with highest MDR parameter
Highest FDR                    Picks candidate with highest FDR parameter
Highest EXR                    Picks candidate with highest EXR parameter
----------------------------   -------------------------------------------
Highest State Count            Picks candidate with most states (any)
Highest Positive State Count   Picks candidate with most positive states
Highest Negative State Count   Picks candidate with most negative states
*Note: These require VisuMZ_1_SkillsStatesCore
----------------------------   -------------------------------------------
Lowest Level                   Picks candidate with lowest level
----------------------------   -------------------------------------------
Lowest MaxHP                   Picks candidate with lowest MaxHP
Lowest HP                      Picks candidate with lowest current HP
Lowest HP%                     Picks candidate with lowest HP ratio
----------------------------   -------------------------------------------
Lowest MaxMP                   Picks candidate with lowest MaxMP
Lowest MP                      Picks candidate with lowest current MP
Lowest MP%                     Picks candidate with lowest MP ratio
----------------------------   -------------------------------------------
Lowest MaxTP                   Picks candidate with lowest MaxTP
Lowest TP                      Picks candidate with lowest current TP
Lowest TP%                     Picks candidate with lowest TP ratio
----------------------------   -------------------------------------------
Lowest ATK                     Picks candidate with lowest ATK parameter
Lowest DEF                     Picks candidate with lowest DEF parameter
Lowest MAT                     Picks candidate with lowest MAT parameter
Lowest MDF                     Picks candidate with lowest MDF parameter
Lowest AGI                     Picks candidate with lowest AGI parameter
Lowest LUK                     Picks candidate with lowest LUK parameter
----------------------------   -------------------------------------------
Lowest HIT                     Picks candidate with lowest HIT parameter
Lowest EVA                     Picks candidate with lowest EVA parameter
Lowest CRI                     Picks candidate with lowest CRI parameter
Lowest CEV                     Picks candidate with lowest CEV parameter
Lowest MEV                     Picks candidate with lowest MEV parameter
Lowest MRF                     Picks candidate with lowest MRF parameter
Lowest CNT                     Picks candidate with lowest CNT parameter
Lowest HRG                     Picks candidate with lowest HRG parameter
Lowest MRG                     Picks candidate with lowest MRG parameter
Lowest TRG                     Picks candidate with lowest TRG parameter
----------------------------   -------------------------------------------
Lowest TGR                     Picks candidate with lowest TGR parameter
Lowest GRD                     Picks candidate with lowest GRD parameter
Lowest REC                     Picks candidate with lowest REC parameter
Lowest PHA                     Picks candidate with lowest PHA parameter
Lowest MCR                     Picks candidate with lowest MCR parameter
Lowest TCR                     Picks candidate with lowest TCR parameter
Lowest PDR                     Picks candidate with lowest PDR parameter
Lowest MDR                     Picks candidate with lowest MDR parameter
Lowest FDR                     Picks candidate with lowest FDR parameter
Lowest EXR                     Picks candidate with lowest EXR parameter
----------------------------   -------------------------------------------
Lowest State Count             Picks candidate with least states (any)
Lowest Positive State Count    Picks candidate with least positive states
Lowest Negative State Count    Picks candidate with least negative states
*Note: These require VisuMZ_1_SkillsStatesCore
----------------------------   -------------------------------------------

---

Regarding $gameTroop.turnCount() for A.I. Conditions

---

Short Answer:

Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
or user.turnCount() or target.turnCount() for A.I. Conditions.

Instead, use RPG Maker MZ's built-in action editor's turn requirement to
make do with the same effect.

---

Long Answer:

The turnCount() functions are not valid for A.I. Conditions and disabled due
to all the problems they cause. The reason being is because actions are
determined before the turn count increases. This is how RPG Maker MZ handles
it by default.

The reason why this does not work is due to the following code found in
RPG Maker MZ's core scripts:

Game_Battler.prototype.turnCount = function() {
if (BattleManager.isTpb()) {
return this._tpbTurnCount;
} else {
return $gameTroop.turnCount() + 1;
}
};

What that means the turn count will always be off by 1. So upon determining
the action initially, the match would come off as correct. However, as the
turn actually starts and reaches the enemy or actor's turn, the turn count
check would read differently and return incorrect information, causing the
battler to forfeit their actions.

This facet of RPG Maker MZ can be updated and changed, but it is better that
it doesn't in order to maintain compatibility with the rest of the plugins
available that utilize the turn counter.

The work around to this problem is, instead, to use the enemy database tab's
action editor and apply a Turn Condition to match the required turn instead.
You know, the thing with Skill and Rating, where you select which skill for
the enemy to use instead.

HOWEVER!

If you are willing to use an "Experimental" feature, aka one that is not
heavily tested and may potentially result in unintended side effects, go to:

Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.

And set that to "true" without the quotes. This will forcefully remove the
+1 towards the count and forcefully make enemies re-evaluate actions upon
the start of the string of their actions. This comes with some side effects
that will potentially give A.I. advantages or disadvantages depending on the
battle system type. Action Speed becomes something that can be abused as it
is normally something that is determined based on the queued actions. A.I.
can pick a high speed weak action and then switch it for a slow speed strong
action. There is no proper fix to this due to how on-the-spot A.I. works as
it is ill-fitted for speed-relative battle systems. You have been warned.

In the event that this Plugin Parameter IS enabled, then using the turnCount
JavaScript code should work again due to the normalization of how the turn
property is calculated.

---

Plugin Parameters: A.I. General Settings

These settings determine the global settings for general Battle A.I. usage.

---

A.I. Style

Actor Style:
- Which A.I. style do you want for referenced actors to use?
- This does not apply to non-referenced actors.

Enemy Style:
- Which A.I. style do you want for enemies to use?

Refer to the A.I. Styles list for a list of valid styles.

---

A.I. Level

Actor A.I. Level:
- Default A.I. level used for actor A.I.
- Levels: 0-100. Higher is stricter.

Enemy A.I. Level:
- Default A.I. level used for enemy A.I.
- Levels: 0-100. Higher is stricter.

---

A.I. Ratings

Actor Rating Variance:
- How much to allow variance from the A.I. rating by?
- 0 for no variance. Higher numbers for more variance.

Enemy Rating Variance:
- How much to allow variance from the A.I. rating by?
- 0 for no variance. Higher numbers for more variance.

---

Reference

Actor => AI Reference:
- Which enemy A.I. should the actor reference by default?
- Use 0 for no references.

---

Knowledge

Learn Knowledge:
- Requires enemies/actors to test the knowledge of the opponents before
using specific conditions.

Unknown Element Rate:
- What should A.I. treat unknown element rates as?

---

Experimental

On-The-Spot A.I.:
- A.I. enemies/actors determine actions on the spot when it's their turn.

No Idle Chant:
- Requires On-The-Spot A.I. enabled.
- For A.I. Battlers, disables idle chant motions due to inconsistency.

---

Plugin Parameters: A.I. Default Conditions

You can set certain conditions to be used as defaults for all skills that
lack the <All AI Conditions> and <Any AI Conditions>. If either of those
notetags exist, none of these defaults will be used for those skills. These
settings will allow you to set both 'All' and 'Any' conditions for defaults.

---

Enable?

All Conditions:
- Create default 'ALL' conditions for all skills without any AI notetags?

Any Conditions:
- Create default 'ANY' conditions for all skills without any AI notetags?

---

HP Damage
MP Damage
HP Recover
MP Recover
HP Drain
MP Drain

All Conditions:
- Default 'ALL' conditions used for related skills.

Any Conditions:
- Default 'ANY' conditions used for related skills.

---

Add State
Remove State

All Conditions:
- Default 'ALL' conditions used for related skills.
- %1 - Dynamic values (ie state ID's).

Any Conditions:
- Default 'ANY' conditions used for related skills.
- %1 - Dynamic values (ie state ID's).

---

Add Buff
Remove Buff
Add Debuff
Remove Debuff

All Conditions:
- Default 'ANY' conditions used for related skills.
- %1 - Dynamic values (ie param's).

Any Conditions:
- Default 'ALL' conditions used for related skills.
- %1 - Dynamic values (ie state ID's).

---

Plugin Parameters: A.I. => TGR Weight Settings

These Plugin Parameters allow you to set whether or not you'd like for
weight influence when deciding targets for actions and how much to influence
the TGR weight by.

---

Weight

Element Rate => TGR:
- Makes all A.I. consider elemental rates when considering TGR weight
by default?

Influence Rate:
- This determines the default level of influence elemental rates have on
TGR weight.

EVA Rate => TGR:
- Makes all A.I. consider EVA rates when considering TGR weight
by default?

Influence Rate:
- This determines the default level of influence EVA rates have on
TGR weight.

MEV Rate => TGR:
- Makes all A.I. consider MEV rates when considering TGR weight
by default?

Influence Rate:
- This determines the default level of influence MEV rates have on
TGR weight.

PDR Rate => TGR:
- Makes all A.I. consider PDR rates when considering TGR weight
by default?

Influence Rate:
- This determines the default level of influence PDR rates have on
TGR weight.

MDR Rate => TGR:
- Makes all A.I. consider MDR rates when considering TGR weight
by default?

Influence Rate:
- This determines the default level of influence MDR rates have on
TGR weight.

---
```
