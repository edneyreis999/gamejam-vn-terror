# VisuMZ_3_VisualStateEffect

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_VisualStateEffect`
- Contract: [RPG Maker MZ] [Tier 3] [VisualStateEffects]
- Required plugins: VisuMZ_0_CoreEngine, VisuMZ_1_BattleCore, VisuMZ_1_SkillsStatesCore
- Declared load order: after VisuMZ_1_BattleCore; after VisuMZ_1_SkillsStatesCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| VisualStateEffects | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| General:struct | General Settings | — | struct&lt;General&gt; | {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"} | — | General settings for Visual State Effects. |
| BuffDebuff:struct | Buff/Debuff Settings | — | struct&lt;BuffDebuff&gt; | {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"\[0, 255, 0, 160\]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"\[255, 0, 0, 160\]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"} | — | Buff/Debuff settings for Visual State Effects. |
| State:struct | State Defaults | — | struct&lt;State&gt; | {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"\[0, 0, 0, 0\]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"} | — | Default State settings for Visual State Effects. |
| CounterPopup:struct | Response Popup Settings | State:struct | struct&lt;CounterPopup&gt; | {"Counter":"","CounterPopupText:str":"COUNTER!","CounterIcon:num":"0","CounterTextColor:str":"0","CounterTextColorID:num":"0","CounterFlashColor:eval":"\[255, 255, 255, 160\]","CounterFlashDuration:num":"60","Reflect":"","ReflectPopupText:str":"REFLECT!","ReflectIcon:num":"0","ReflectTextColor:str":"0","ReflectTextColorID:num":"0","ReflectFlashColor:eval":"\[255, 255, 255, 160\]","ReflectFlashDuration:num":"60","Sub":"","SubPopupText:str":"COVER!","SubIcon:num":"0","SubTextColor:str":"0","SubTextColorID:num":"0","SubFlashColor:eval":"\[255, 255, 255, 160\]","SubFlashDuration:num":"60"} | — | Popup settings for response-type state effects. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Actors | — | — | — | — | — | — |
| ActorOverlay:eval | Show State Overlay? | Actors | boolean | true | — | Show state overlays over an actor's head? |
| ActorStateIcon:eval | Show State Icons? | Actors | boolean | true | — | Show state icons over an actor's head? |
| Enemies | — | — | — | — | — | — |
| EnemyOverlay:eval | Show State Overlay? | Enemies | boolean | true | — | Show state overlays over an enemy's head? |
| EnemyStateIcon:eval | Show State Icons? | Enemies | boolean | true | — | Show state icons over an enemy's head? |

### Struct: BuffDebuff

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ShowPopups:eval | Show Popups? | — | boolean | true | — | Show Buff/Debuff Popups when applied? |
| BuffPopupFmt:str | Buff Format | ShowPopups:eval | — | %1▲ | — | How do you want the buff text to appear? %1 - Parameter Name |
| BuffTextColor:str | Text Color | BuffPopupFmt:str | — | 24 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| BuffFlashColor:eval | Flash Color | BuffPopupFmt:str | — | \[0, 255, 0, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| BuffFlashDuration:num | Flash Duration | BuffPopupFmt:str | number | 60 | — | What is the frame duration of the flash effect? |
| DebuffPopupFmt:str | Debuff Format | ShowPopups:eval | — | %1▼ | — | How do you want the debuff text to appear? %1 - Parameter Name |
| DebuffTextColor:str | Text Color | DebuffPopupFmt:str | — | 27 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| DebuffFlashColor:eval | Flash Color | DebuffPopupFmt:str | — | \[255, 0, 0, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| DebuffFlashDuration:num | Flash Duration | DebuffPopupFmt:str | number | 60 | — | What is the frame duration of the flash effect? |
| ShowAnimations:eval | Show Animations? | — | boolean | true | — | Show Buff/Debuff Animations when applied? |
| AnimationMirror:eval | Mirror Animations? | ShowAnimations:eval | boolean | false | — | Mirror animations for buffs/debuffs? |
| AnimationMute:eval | Mute Animations? | ShowAnimations:eval | boolean | false | — | Mute animations for buffs/debuffs? |
| BuffAnimations | Buff Animations | ShowAnimations:eval | — | — | — | — |
| Buff0Animation:num | MaxHP Buff | BuffAnimations | animation | 52 | — | Animation played when applying MaxHP Buffs. |
| Buff1Animation:num | MaxMP Buff | BuffAnimations | animation | 53 | — | Animation played when applying MaxMP Buffs. |
| Buff2Animation:num | ATK Buff | BuffAnimations | animation | 52 | — | Animation played when applying ATK Buffs. |
| Buff3Animation:num | DEF Buff | BuffAnimations | animation | 52 | — | Animation played when applying DEF Buffs. |
| Buff4Animation:num | MAT Buff | BuffAnimations | animation | 53 | — | Animation played when applying MAT Buffs. |
| Buff5Animation:num | MDF Buff | BuffAnimations | animation | 53 | — | Animation played when applying MDF Buffs. |
| Buff6Animation:num | AGI Buff | BuffAnimations | animation | 51 | — | Animation played when applying AGI Buffs. |
| Buff7Animation:num | LUK Buff | BuffAnimations | animation | 51 | — | Animation played when applying LUK Buffs. |
| DebuffAnimations | Debuff Animations | ShowAnimations:eval | — | — | — | — |
| Debuff0Animation:num | MaxHP Debuff | DebuffAnimations | animation | 55 | — | Animation played when applying MaxHP Debuffs. |
| Debuff1Animation:num | MaxMP Debuff | DebuffAnimations | animation | 56 | — | Animation played when applying MaxMP Debuffs. |
| Debuff2Animation:num | ATK Debuff | DebuffAnimations | animation | 55 | — | Animation played when applying ATK Debuffs. |
| Debuff3Animation:num | DEF Debuff | DebuffAnimations | animation | 55 | — | Animation played when applying DEF Debuffs. |
| Debuff4Animation:num | MAT Debuff | DebuffAnimations | animation | 56 | — | Animation played when applying MAT Debuffs. |
| Debuff5Animation:num | MDF Debuff | DebuffAnimations | animation | 56 | — | Animation played when applying MDF Debuffs. |
| Debuff6Animation:num | AGI Debuff | DebuffAnimations | animation | 54 | — | Animation played when applying AGI Debuffs. |
| Debuff7Animation:num | LUK Debuff | DebuffAnimations | animation | 54 | — | Animation played when applying LUK Debuffs. |

### Struct: State

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ShowPopups:eval | Show Popups? | — | boolean | true | — | Show States Popups when applied and removed? |
| AllowDupes:eval | Allow Duplicates? | ShowPopups:eval | boolean | false | — | Allow duplicate state popups to appear with the same graphical frame? |
| BattleEndPopup:eval | Battle End Popups? | ShowPopups:eval | boolean | true | — | Show State Popup removal on battle end for battle state removal? |
| AddPopupFmt:str | Add State Format | ShowPopups:eval | — | +%1 | — | How do you want added states to appear? %1 - State Name |
| ErasePopupFmt:str | Erase State Format | ShowPopups:eval | — | -%1 | — | How do you want erased states to appear? %1 - State Name |
| TextColor:str | Default Text Color | ShowPopups:eval | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| MatchTurnCountColor:eval | Match Turn Count? | TextColor:str | boolean | true | — | Match turn count color by default? |
| FlashColor:eval | Flash Color | ShowPopups:eval | — | \[0, 0, 0, 0\] | — | Adjust the popup's default flash color. Format: \[red, green, blue, alpha\] |
| FlashDuration:num | Flash Duration | FlashColor:eval | number | 60 | — | What is the frame duration of the default flash effect? |
| StateAnimations | State Animations | — | — | — | — | — |
| AddEraseAnimations | Add/Erase Animations | StateAnimations | — | — | — | — |
| AnimationMirror:eval | Mirror Animations? | AddEraseAnimations | boolean | false | — | Mirror animations for states? |
| AnimationMute:eval | Mute Animations? | AddEraseAnimations | boolean | false | — | Mute animations for states? |
| RepeatingAnimations | Repeating Animations | StateAnimations | — | — | — | — |
| CycleTime:num | Cycle Time | RepeatingAnimations | number | 300 | — | The amount of frames to wait before each animation cycle. WARNING: Lower numbers can jeopardize game performance. |
| RepeatMirror:eval | Mirror Animations? | RepeatingAnimations | boolean | false | — | Mirror repeating animations for states by default? |
| RepeatMute:eval | Mute Animations? | RepeatingAnimations | boolean | true | — | Mute repeating animations for states by default? |

### Struct: CounterPopup

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Counter | Counter Popup | — | — | — | — | — |
| CounterPopupText:str | Text | Counter | — | COUNTER! | — | Text displayed upon the effect activating. |
| CounterIcon:num | Icon Index | Counter | — | 0 | — | What icon is used for this popup? |
| CounterTextColor:str | Text Color | Counter | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| CounterFlashColor:eval | Flash Color | Counter | — | \[255, 255, 255, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| CounterFlashDuration:num | Flash Duration | Counter | number | 60 | — | What is the frame duration of the flash effect? |
| Reflect | Reflect Popup | — | — | — | — | — |
| ReflectPopupText:str | Text | Reflect | — | REFLECT! | — | Text displayed upon the effect activating. |
| ReflectIcon:num | Icon Index | Reflect | — | 0 | — | What icon is used for this popup? |
| ReflectTextColor:str | Text Color | Reflect | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ReflectFlashColor:eval | Flash Color | Reflect | — | \[255, 255, 255, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| ReflectFlashDuration:num | Flash Duration | Reflect | number | 60 | — | What is the frame duration of the flash effect? |
| Sub | Substitute Popup | — | — | — | — | — |
| SubPopupText:str | Text | Sub | — | COVER! | — | Text displayed upon the effect activating. |
| SubIcon:num | Icon Index | Sub | — | 0 | — | What icon is used for this popup? |
| SubTextColor:str | Text Color | Sub | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| SubFlashColor:eval | Flash Color | Sub | — | \[255, 255, 255, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| SubFlashDuration:num | Flash Duration | Sub | number | 60 | — | What is the frame duration of the flash effect? |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

States, buffs, and debuffs are amongst one of the most important aspects of
the battle system. Therefore, relaying proper information to the player is
extremely important. RPG Maker MZ does relay information to the player about
the various states and effects, but it is far from perfect. This plugin
allows you to add more detail and visual effects regarding states to relay
proper data.

Features include all (but not limited to) the following:

* Choose to display State Overlays and State Icons over actors and enemies.
* Create text popups for Buffs, Debuffs, and States along with full control
over their color, flash, and flash duration.
* Play animations upon receiving or removing Buffs, Debuffs, and States.
* States can have repeating animations.
* States can change the tone of a sprite.
* States can freeze a sprite in place.
* States can adjust the opacity of a battler to make them semi-transparent.
* Hovering effects that can be visibly applied to trait objects.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

- VisuMZ_0_CoreEngine
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

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

State Motion Index and State Overlay Index

- The original RPG Maker MZ functions have been overwritten because they
only display the motions and overlays of the highest priority state even if
it does not have any motions while lower priority states with motions and
overlays will be hidden.

- The changed code will now take the highest priority state motion index (or
a custom one defined by a notetag) and the highest priority state overlay
index to show those instead.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

=== State-Related Notetags ===

The following notetags are made for states.

---

<Hide State Popup>

- Used for: State Notetags
- Don't display any of the popups for this state.

---

<State Popup>
text color: c
flash color: r, g, b, a
flash duration: d
</State Popup>

- Used for: State Notetags
- Changes the settings of the state popup from the defaults declared by the
Plugin Parameters. Each of the settings are optional. If the lines do not
appear in the notetag, then the default values from the Plugin Parameters
will be used instead.
- Replace 'c' #rrggbb for custom colors or insert a regular number for text
colors from the Window Skin.
- Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
'red', 'green', 'blue', and 'alpha' to determine the flash color.
- Replace 'd' with a number representing the amount of frames you want the
flash duration to last for.

Examples:

<State Popup>
text color: 3
</State Popup>

<State Popup>
text color: #abcdef
flash color: 255, 255, 0, 160
</State Popup>

<State Popup>
flash color: 0, 255, 255, 160
flash duration: 90
</State Popup>

<State Popup>
flash duration: 777
</State Popup>

---

<Add Animation: x>

- Used for: State Notetags
- Determines the battle animation to play when the state is applied.
- Replace 'x' with a number representing the ID of the animation you wish
to play when the state is added.
- This does not work for states without icons nor the death state.

---

<Erase Animation: x>

- Used for: State Notetags
- Determines the battle animation to play when the state is removed.
- Replace 'x' with a number representing the ID of the animation you wish
to play when the state is removed.
- This does not work for states without icons nor the death state.

---

<Repeat Animation: x>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Determines the battle animation to play in intervals when the battler is
affected by it.
- Replace 'x' with a number representing the ID of the animation you wish
to play on repeat while the battler is affected by the state.
- The battler will cycle through the various repeating state animations
available through states.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.
- WARNING: Abusing Repeat Animations can jeopardize game performance.

---

<Repeat Animation Cycle: x>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Determines the cycle/duration of this specific state's repeating animation
if you do not wish to use the plugin parameter's default setting.
- Replace 'x' with the number of frames you wish to play this animation for
before moving onto the next animation.
- WARNING: Lower numbers can jeopardize game performance.

---

<Custom Overlay: filename>

- Used for: State Notetags
- For those who don't want to use the img/system/ folder's "States" image
file and want something custom, this notetag will do exactly that.
- Custom state overlays will follow similar dimensions to the original
States image:
- Pixel Width: 768
- Pixel Height: 96
- Total Frames: 8
- If you want to use different sizes, we recommend you look into Effekseer
custom animations with the <Repeat Animation: x> notetag instead.
- Replace 'filename' with the filename of the image you want to use as
a state overlay found in the game project's img/system/ folder.
- Do not include the file extension.

---

<State Motion: Walk>
<State Motion: Wait>
<State Motion: Chant>
<State Motion: Guard>
<State Motion: Damage>
<State Motion: Evade>
<State Motion: Thrust>
<State Motion: Swing>
<State Motion: Missile>
<State Motion: Skill>
<State Motion: Spell>
<State Motion: Item>
<State Motion: Escape>
<State Motion: Victory>
<State Motion: Dying>
<State Motion: Abnormal>
<State Motion: Sleep>
<State Motion: Dead>

- Used for: State Notetags
- Lets you determine what kind of state motion to play when the battler is
affected by the state.
- The battler will only play the highest priority state motion.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

---

<State Motion Lock>

- Used for: State Notetags
- If an actor or animated sideview enemy is affected by a state that has
this notetag, their animation will be locked in place while this state
is in effect.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

---

<State Tone: red, green, blue, gray>

- Used for: State Notetags
- Tints the battler with a tone determined by the state.
- Replace 'red', 'green', 'blue' with a value between -255 and 255.
- Replace 'gray' with a value between 0 and 255.
- If a battler has multiple states with tones, then the state with the
highest priority value is applied to the battler.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

---

<Visual Opacity: x>
<Visual Opacity: x%>

- Used for: State Notetags
- When a battler is affected by this state, change the opacity of their main
battler sprite to 'x' or 'x%'.
- Replace 'x' with a number from 0 to 255 representing the opacity level.
- Replace 'x%' with a percentage from 0% to 100% representing the opacity.
- This does NOT affect UI elements like the HP Gauges, State Icons, or their
positioning markers such as the battler's shadow as this is only to used
to represent a change in their opacity through a state.
- To change the whole battler's opacity including everything from the UI
elements, State Icons, etc., use the Action Sequence Plugin Command to
visually alter the whole opacity level instead.
- The Visual Opacity level will compound with the opacity level adjusted by
the Action Sequence Plugin Command. Keep this in mind when using both of
them together.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

---

<Visual Rainbow: +x>
<Visual Rainbow: -x>

- Used for: State Notetags
- When a battler is affected by this state, the battler has a colorful
rainbow shifting effect.
- Replace 'x' with a number representing how fast the colors shift for the
battler. Higher numbers are faster. Lower numbers are slower.
- This does NOT affect UI elements like the HP Gauges, State Icons, or their
positioning markers such as the battler's shadow as this is only to used
to represent a change in their opacity through a state.
- The Visual Rainbow shift will be stacked on top of any battlers/enemies
that already have a hue change.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

---

=== Hover-Related Notetags ===

---

<Visual Hover Effect>
Base: x
Speed: y
Rate: z
Death: case
</Visual Hover Effect>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Creates a hover effect when tied to a trait object.
- The 'base' value determines the minimum height above the ground for the
hover effect. Replace 'x' with a number representing the pixel height.
- The 'speed' value determines the flat adjustment towards the wobbling
change. Replace 'y' with a number representing the speed. Lower values
move faster while higher values move slower.
- The 'rate' determines the fluctuation rate when the hover effect bobbles
up and down. Replace 'z' with a number representing the fluctuation rate.
- The 'death' scenario lets you decide if you want the hovering battler to
remain hovering if they're dead or fall down to the floor. Replace 'case'
with 'Hover' or 'Floor'.
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

Example:

<Visual Hover Effect>
Base: 100
Speed: 20
Rate: 5.0
Death: floor
</Visual Hover Effect>

---

=== Breathing-Related Notetags ===

The following notetags are purely EXPERIMENTAL. There is a high likelihood
of unintended graphical glitches when using them. Use them at your own risk.

---

<Visual Breathing Effect>
Speed: x
Speed X: x
Speed Y: x

Rate: x.y
Rate X: x.y
Rate Y: x.y

HP Link: On
HP Link: Off
</Visual Breathing Effect>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Creates a hover effect when tied to a trait object.
- The 'speed' value determines how long each cycle is.
- When using 'Speed', this will apply to both 'Speed X' and 'Speed Y'
- 'Speed X' refers to the horizontal breathing cycle
- 'Speed Y' refers to the vertical breathing cycle
- If not declared, both will default to a value of '10'
- The 'rate' value determines how exaggerated the breathing distortion looks
for the affected target.
- When using 'Rate', this will apply to both 'Rate X' and 'Rate Y
- 'Rate X' refers to horizontal breathing distortion effect
- 'Rate Y' refers to vertical breathing distortion effect
- If not declared, 'Rate X' will default to 0.000 and 'Rate Y' to 0.020.
- HP Link refers to the breathing speed relative to the target's HP rate
where the lower the rate, the slower the speed becomes.
- 'On' means it's enabled.
- 'Off' means it's disabled.
- If not declared, this will default to 'OFF'
- NOTE: Using this with Passive State Conditions will make this effect
update at the next battler refresh cycle. This is due to the effect
being cached in order to prevent lag and overloading the engine.

Examples:

<Visual Breathing Effect>
Speed: 10
Rate Y: 0.050
HP Link: On
</Visual Breathing Effect>

<Visual Breathing Effect>
Speed X: 15
Speed Y: 10
Rate X: 0.01
Rate Y: 0.050
</Visual Breathing Effect>

---

<No Breathing>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Removes any breathing effects for the affected target.

---

Plugin Parameters: General Settings

General settings for Visual State Effects.

---

Actors

Show State Overlay?:
- Show state overlays over an actor's head?

Show State Icons?:
- Show state icons over an actor's head?

---

Enemies

Show State Overlay?:
- Show state overlays over an enemy's head?

Show State Icons?:
- Show state icons over an enemy's head?

---

Plugin Parameters: Buff/Debuff Settings Settings

Buff/Debuff settings for Visual State Effects.

---

Popups

Show Popups?:
- Show Buff/Debuff Popups when applied?

Buff Format:
- How do you want the buff text to appear?
- %1 - Parameter Name

Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors
from the Window Skin.

Flash Color:
- Adjust the popup's flash color.
- Format: [red, green, blue, alpha]

Flash Duration:
- What is the frame duration of the flash effect?

Debuff Format:
- How do you want the debuff text to appear?
- %1 - Parameter Name

Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors
from the Window Skin.

Flash Color:
- Adjust the popup's flash color.
- Format: [red, green, blue, alpha]

Flash Duration:
- What is the frame duration of the flash effect?

---

Animations

Show Animations?:
- Show Buff/Debuff Animations when applied?

Mirror Animations?:
- Mirror animations for buffs/debuffs?

Mute Animations?:
- Mute animations for buffs/debuffs?

---

Buff Animations

MaxHP Buff:
MaxMP Buff:
ATK Buff:
DEF Buff:
MAT Buff:
MDF Buff:
AGI Buff:
LUK Buff:
- Animation played when applying specific Buffs.

Debuff Animations

MaxHP Debuff:
MaxMP Debuff:
ATK Debuff:
DEF Debuff:
MAT Debuff:
MDF Debuff:
AGI Debuff:
LUK Debuff:
- Animation played when applying specific Debuff.

---

Plugin Parameters: State Settings

Default State settings for Visual State Effects.

---

Popups

Show Popups?:
- Show States Popups when applied and removed?

Allow Duplicates?:
- Allow duplicate state popups to appear with the same graphical frame?

Battle End Popups?:
- Show State Popup removal on battle end for battle state removal?

Add State Format:
- How do you want added states to appear?
- %1 - State Name

Erase State Format:
- How do you want erased states to appear?
- %1 - State Name

Default Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Match Turn Count?:
- Match turn count color by default?

Flash Color:
- Adjust the popup's default flash color.
- Format: [red, green, blue, alpha]

Flash Duration:
- What is the frame duration of the default flash effect?

---

State Animations

Add/Erase Animations

Mirror Animations?:
- Mirror animations for states?

Mute Animations?:
- Mute animations for states?

Repeating Animations

Cycle Time:
- The amount of frames to wait before each animation cycle.
- WARNING: Lower numbers can jeopardize game performance.

Mirror Animations?:
- Mirror repeating animations for states by default?

Mute Animations?:
- Mute repeating animations for states by default?

---

Plugin Parameters: Response Popup Settings

Popup settings for response-type state effects. These include counterattack,
magic reflection, and substitute.

---

Counter Popup

Reflect Popup

Substitute Popup

Text:
- Text displayed upon the effect activating.

Icon Index:
- What icon is used for this popup?

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
