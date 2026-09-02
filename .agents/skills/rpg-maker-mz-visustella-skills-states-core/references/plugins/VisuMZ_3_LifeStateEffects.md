# VisuMZ_3_LifeStateEffects

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_LifeStateEffects`
- Contract: [RPG Maker MZ] [Tier 3] [LifeStateEffects]
- Required plugins: VisuMZ_1_BattleCore, VisuMZ_1_SkillsStatesCore
- Declared load order: after VisuMZ_1_BattleCore; after VisuMZ_1_SkillsStatesCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| LifeStateEffects | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| AutoLife:struct | Auto Life Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"50","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"AUTOLIFE","TextColor:str":"0","FlashColor:eval":"\[0, 255, 128, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Auto Life effect. |
| Curse:struct | Curse Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"54","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"CURSE","TextColor:str":"0","FlashColor:eval":"\[0, 0, 128, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Curse effect. |
| Doom:struct | Doom Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"65","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"DOOM","TextColor:str":"0","FlashColor:eval":"\[128, 0, 0, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Doom effect. |
| Fragile:struct | Fragile Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"60","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"FRAGILE","TextColor:str":"0","FlashColor:eval":"\[255, 0, 0, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Fragile effect. |
| Guts:struct | Guts Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"51","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"GUTS","TextColor:str":"0","FlashColor:eval":"\[255, 255, 255, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Guts effect. |
| Undead:struct | Undead Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"58","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"UNDEAD","TextColor:str":"0","FlashColor:eval":"\[128, 128, 128, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Undead effect. |
| Transform:struct | Transform Settings | — | struct&lt;Effect&gt; | {"Animation":"","AnimationID:num":"49","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"TRANSFORM","TextColor:str":"0","FlashColor:eval":"\[255, 255, 0, 160\]","FlashDuration:num":"60"} | — | Notification settings pertaining to the Transform effect. This also affects event commands for transformation. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Effect

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Animation | — | — | — | — | — | — |
| AnimationID:num | Animation ID | Animation | animation | 0 | — | Play this animation when the effect activates. Requires VisuMZ_0_CoreEngine. |
| Mirror:eval | Mirror Animation | Animation | boolean | false | — | Mirror the effect animation? Requires VisuMZ_0_CoreEngine. |
| Mute:eval | Mute Animation | Animation | boolean | false | — | Mute the effect animation? Requires VisuMZ_0_CoreEngine. |
| Popups | — | — | — | — | — | — |
| PopupText:str | Text | Popups | — | TEXT | — | Text displayed upon the effect activating. |
| TextColor:str | Text Color | Popups | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| FlashColor:eval | Flash Color | Popups | — | \[255, 255, 255, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| FlashDuration:num | Flash Duration | Popups | number | 60 | — | What is the frame duration of the flash effect? |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Life State Effects plugin allow for trait objects and/or states to
create specific, though, commonly used effects found in many traditional
JRPG's, such as Auto Life, Doom, and Guts. These mechanical effects add a
whole new layer of strategy when it comes to status effects.

Features include all (but not limited to) the following:

* Auto Life effect, which is a state effect that recovers a percentage of
the user's HP and disappears upon triggering.
* Curse effect, which prevents HP, MP, and/or TP recovery.
* Doom effect, which is a state effect that will kill the affected battler
once the state's timer wears off and expires.
* Fragile effect, which causes any time a user receives HP damage from a
direct action, that user will instantly lose all HP.
* Guts, which prevents HP from dropping below 1, unless the battler's HP is
at 1, itself.
* Undead, which causes normal HP healing to inflict damage instead, instant
death effects to fully restore HP, and Drain effects to be inverted.
* Death Transformations, for specificly notetag-marked enemies, will cause
them to undergo a transformation once they die in battle and be reborn
anew with full HP/MP as something else.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

- VisuMZ_1_BattleCore
- VisuMZ_1_SkillsStatesCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== State-Only Effects ===

---

<Auto Life: x%>

- Used for: State Notetags
- When the affected battler dies with this state present, this state will
automatically remove itself (and any other states with <Auto Life: x%>) to
restore that much HP% for the battler.
- Replace 'x' with a number representing that percentage of HP to heal the
battler upon dying.

---

<Doom>

- Used for: State Notetags
- When this state expires naturally (without direct removal), kill the
affected battler.

---

<Extinct>

- Used for: State Notetags
- When applied to a target, the target is no longer able to revive or be
revived until this state is removed.
- Enemy still needs to be defeated after applying Extinct state.
- This will suppress the Auto Life effect.
- This does NOT suppress enemy Death Transformations.

---

=== Trait-Object Effects ===

---

<Curse HP>
<Curse MP>
<Curse TP>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Prevents the affected battler from being able to recover HP, MP, and/or TP
depending on which notetag is being used.

---

<Fragile>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- If a battler affected by <Fragile> receives a direct attack and takes any
HP damage (as opposed to event command damage or regeneration damage),
then instantly kill the affected battler.

---

<Guts>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- This will prevent the battler from taking any fatal damage and leaves them
with only 1 HP. However, if the battler has 1 HP and receives damage, then
the battler will actually die.

---

<Undead>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- If the battler receives HP Healing, it receives damage instead.
- If the battler is a target of an instant death skill or item, then the
battler will recover full HP.
- If the battler is the target of an HP Drain action, then the battler will
drain HP from the attacker instead.
- If the battler is the target of an elemental attack and the battler would
absorb that element, the target will bypass the undead effect and recovers
HP instead. Now your zombies can absorb "Darkness" elements.

---

<Allow Undead Regen>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- If an undead battler gets affected by a trait object (such as a state)
with this notetag, then HP Regeneration will no longer damage the undead
enemy but instead, heal it.

---

=== Enemy-Only Effects ===

---

<Death Transform>
name: weight
name: weight
name: weight
</Death Transform>

- Used for: Enemy Notetags
- Upon death, the enemy will transform into another enemy with full HP/MP.
- Replace 'name' with the name of the enemy to transform into.
- Replace 'weight' with a number value representing how often the 'name'
would come up. The higher the weight, the more often. You may omit this
and the colon(: ) and just type in the 'name' instead.

Examples:

<Death Transform>
Slime
</Death Transform>

<Death Transform>
Slime: 75
Goblin: 25
</Death Transform>

<Death Transform>
Slime: 10
Goblin
</Death Transform>

<Death Transform>
Slime
Goblin
</Death Transform>

---

<Transform Animation: x>

- Used for: Enemy Notetags
- Requires VisuMZ_0_CoreEngine!
- Plays an animation on the transforming enemy upon a successful transform.
- This goes on the TARGET enemy that will be transformed into.
- This does NOT go on the enemy that is being transformed from.
- Replace 'x' with a number representing the ID of the animation you wish to
play on the transforming enemy.

---

Plugin Parameters: Effect Settings

Auto-Life Settings
Curse Settings
Doom Settings
Fragile Settings
Guts Settings
Undead Settings
Transform Settings

When certain effects trigger, you can have an animation play (if the
VisuStella MZ Core Engine is also installed) and/or a popup appear, too.
Each of the six effects provided by this plugin have animation and popup
effects that can be adjusted.

---

Animation

Animation ID:
- Play this animation when the effect activates.
- Requires VisuMZ_0_CoreEngine.

Mirror Animation:
- Mirror the effect animation?
- Requires VisuMZ_0_CoreEngine.

Mute Animation:
- Mute the effect animation?
- Requires VisuMZ_0_CoreEngine.

---

Popups

Text:
- Text displayed upon the effect activating.

Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Flash Color:
- Adjust the popup's flash color.
- Format: [red, green, blue, alpha]

Flash Duration:
- What is the frame duration of the flash effect?

---
```
