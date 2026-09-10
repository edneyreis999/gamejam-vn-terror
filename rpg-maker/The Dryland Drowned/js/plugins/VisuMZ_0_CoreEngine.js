//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.90;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.90] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * ---
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.90: February 16, 2026
 * * Feature Update!
 * ** Battle System settings for "TPB Active" and "TPB Wait" will no longer
 *    conflict with VisuMZ_2_BattleSystemATB and VisuMZ_1_OptionsCore "Active"
 *    or "Wait" mode options set by the player.
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x55d321=_0xcf9c;(function(_0x4159f0,_0x306b46){const _0x4e1eb3=_0xcf9c,_0x2b33a1=_0x4159f0();while(!![]){try{const _0x1339e2=-parseInt(_0x4e1eb3(0x5b5))/0x1+-parseInt(_0x4e1eb3(0x6ba))/0x2+-parseInt(_0x4e1eb3(0x5a9))/0x3*(-parseInt(_0x4e1eb3(0x381))/0x4)+parseInt(_0x4e1eb3(0x426))/0x5*(parseInt(_0x4e1eb3(0x50a))/0x6)+-parseInt(_0x4e1eb3(0x5be))/0x7*(parseInt(_0x4e1eb3(0x53f))/0x8)+parseInt(_0x4e1eb3(0x6e9))/0x9+parseInt(_0x4e1eb3(0x50f))/0xa;if(_0x1339e2===_0x306b46)break;else _0x2b33a1['push'](_0x2b33a1['shift']());}catch(_0x5b0858){_0x2b33a1['push'](_0x2b33a1['shift']());}}}(_0x5000,0x35221));var label=_0x55d321(0x886),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x25c7a1){const _0x366c66=_0x55d321;return _0x25c7a1['status']&&_0x25c7a1[_0x366c66(0x640)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x55d321(0x530)]=VisuMZ[label][_0x55d321(0x530)]||{},VisuMZ[_0x55d321(0x6b0)]=function(_0x2d4e29,_0x32bac6){const _0x2ad5c0=_0x55d321;for(const _0xffb9fc in _0x32bac6){if(_0xffb9fc[_0x2ad5c0(0x362)](/(.*):(.*)/i)){const _0x5f0f8c=String(RegExp['$1']),_0x4eb584=String(RegExp['$2'])[_0x2ad5c0(0x539)]()[_0x2ad5c0(0x214)]();let _0x4d4b53,_0x552cb4,_0x1d02d3;switch(_0x4eb584){case _0x2ad5c0(0x59b):_0x4d4b53=_0x32bac6[_0xffb9fc]!==''?Number(_0x32bac6[_0xffb9fc]):0x0;break;case _0x2ad5c0(0x874):_0x552cb4=_0x32bac6[_0xffb9fc]!==''?JSON[_0x2ad5c0(0x371)](_0x32bac6[_0xffb9fc]):[],_0x4d4b53=_0x552cb4['map'](_0x27eb23=>Number(_0x27eb23));break;case _0x2ad5c0(0x349):_0x4d4b53=_0x32bac6[_0xffb9fc]!==''?eval(_0x32bac6[_0xffb9fc]):null;break;case _0x2ad5c0(0x70a):_0x552cb4=_0x32bac6[_0xffb9fc]!==''?JSON['parse'](_0x32bac6[_0xffb9fc]):[],_0x4d4b53=_0x552cb4[_0x2ad5c0(0x8f0)](_0x316f84=>eval(_0x316f84));break;case _0x2ad5c0(0x51d):_0x4d4b53=_0x32bac6[_0xffb9fc]!==''?JSON[_0x2ad5c0(0x371)](_0x32bac6[_0xffb9fc]):'';break;case _0x2ad5c0(0x894):_0x552cb4=_0x32bac6[_0xffb9fc]!==''?JSON['parse'](_0x32bac6[_0xffb9fc]):[],_0x4d4b53=_0x552cb4[_0x2ad5c0(0x8f0)](_0x16f9b6=>JSON[_0x2ad5c0(0x371)](_0x16f9b6));break;case _0x2ad5c0(0x268):_0x4d4b53=_0x32bac6[_0xffb9fc]!==''?new Function(JSON[_0x2ad5c0(0x371)](_0x32bac6[_0xffb9fc])):new Function(_0x2ad5c0(0x707));break;case'ARRAYFUNC':_0x552cb4=_0x32bac6[_0xffb9fc]!==''?JSON['parse'](_0x32bac6[_0xffb9fc]):[],_0x4d4b53=_0x552cb4[_0x2ad5c0(0x8f0)](_0x536bd1=>new Function(JSON[_0x2ad5c0(0x371)](_0x536bd1)));break;case'STR':_0x4d4b53=_0x32bac6[_0xffb9fc]!==''?String(_0x32bac6[_0xffb9fc]):'';break;case _0x2ad5c0(0x611):_0x552cb4=_0x32bac6[_0xffb9fc]!==''?JSON[_0x2ad5c0(0x371)](_0x32bac6[_0xffb9fc]):[],_0x4d4b53=_0x552cb4[_0x2ad5c0(0x8f0)](_0x1a5157=>String(_0x1a5157));break;case _0x2ad5c0(0x3cc):_0x1d02d3=_0x32bac6[_0xffb9fc]!==''?JSON[_0x2ad5c0(0x371)](_0x32bac6[_0xffb9fc]):{},_0x2d4e29[_0x5f0f8c]={},VisuMZ[_0x2ad5c0(0x6b0)](_0x2d4e29[_0x5f0f8c],_0x1d02d3);continue;case'ARRAYSTRUCT':_0x552cb4=_0x32bac6[_0xffb9fc]!==''?JSON[_0x2ad5c0(0x371)](_0x32bac6[_0xffb9fc]):[],_0x4d4b53=_0x552cb4['map'](_0x56afc0=>VisuMZ[_0x2ad5c0(0x6b0)]({},JSON[_0x2ad5c0(0x371)](_0x56afc0)));break;default:continue;}_0x2d4e29[_0x5f0f8c]=_0x4d4b53;}}return _0x2d4e29;},VisuMZ['CoreEngine'][_0x55d321(0x6cb)]=SceneManager[_0x55d321(0x486)],SceneManager['exit']=function(){const _0x3c23a7=_0x55d321;VisuMZ['CoreEngine'][_0x3c23a7(0x6cb)][_0x3c23a7(0x2b5)](this);if(Utils['RPGMAKER_VERSION']>='1.4.4'){if(typeof nw==='object')nw[_0x3c23a7(0x4f2)]['quit']();}if(Utils[_0x3c23a7(0x3d5)]>=_0x3c23a7(0x5d0)){if(typeof nw===_0x3c23a7(0x1c7))nw['App'][_0x3c23a7(0x868)]();}},(_0x1de050=>{const _0x1efb46=_0x55d321,_0x1f31c3=_0x1de050['name'];for(const _0x425c04 of dependencies){if(!Imported[_0x425c04]){alert(_0x1efb46(0x69d)['format'](_0x1f31c3,_0x425c04)),SceneManager[_0x1efb46(0x486)]();break;}}const _0x1c8003=_0x1de050['description'];if(_0x1c8003[_0x1efb46(0x362)](/\[Version[ ](.*?)\]/i)){const _0x120460=Number(RegExp['$1']);_0x120460!==VisuMZ[label][_0x1efb46(0x216)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1efb46(0x4a5)](_0x1f31c3,_0x120460)),SceneManager[_0x1efb46(0x486)]());}if(_0x1c8003[_0x1efb46(0x362)](/\[Tier[ ](\d+)\]/i)){const _0x39e783=Number(RegExp['$1']);_0x39e783<tier?(alert(_0x1efb46(0x7c2)[_0x1efb46(0x4a5)](_0x1f31c3,_0x39e783,tier)),SceneManager[_0x1efb46(0x486)]()):tier=Math[_0x1efb46(0x548)](_0x39e783,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x1efb46(0x530)],_0x1de050[_0x1efb46(0x5af)]);})(pluginData),((()=>{const _0x1855c0=_0x55d321;if(VisuMZ['CoreEngine']['Settings']['QoL']['SubfolderParse']??!![])for(const _0x2ab5b8 in $plugins){const _0x4dff3c=$plugins[_0x2ab5b8];_0x4dff3c['name'][_0x1855c0(0x362)](/(.*)\/(.*)/i)&&(_0x4dff3c[_0x1855c0(0x7c4)]=String(RegExp['$2'][_0x1855c0(0x214)]()));}})()),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x4f6),_0x18ff3d=>{const _0x4ee099=_0x55d321;if(!SceneManager[_0x4ee099(0x43e)])return;if(!SceneManager['_scene']['_spriteset'])return;VisuMZ[_0x4ee099(0x6b0)](_0x18ff3d,_0x18ff3d);const _0x274463=Math[_0x4ee099(0x69f)](_0x18ff3d[_0x4ee099(0x4a3)]),_0x28999e=Math[_0x4ee099(0x69f)](_0x18ff3d[_0x4ee099(0x942)]);$gameTemp[_0x4ee099(0x932)](_0x274463,_0x28999e,_0x18ff3d[_0x4ee099(0x1f7)],_0x18ff3d[_0x4ee099(0x267)],_0x18ff3d[_0x4ee099(0x763)]);}),PluginManager[_0x55d321(0x6b9)](pluginData['name'],_0x55d321(0x436),_0x472920=>{const _0x3363fa=_0x55d321;VisuMZ[_0x3363fa(0x6b0)](_0x472920,_0x472920);const _0x121831=Math['round'](_0x472920[_0x3363fa(0x21d)])['clamp'](0x0,0x64),_0x25cd02=AudioManager[_0x3363fa(0x6dc)];_0x25cd02&&(_0x25cd02[_0x3363fa(0x21d)]=_0x121831,_0x25cd02[_0x3363fa(0x802)]=AudioManager[_0x3363fa(0x842)][_0x3363fa(0x4ba)](),AudioManager[_0x3363fa(0x29e)](_0x25cd02),AudioManager['playBgm'](_0x25cd02,_0x25cd02['pos']),AudioManager[_0x3363fa(0x842)][_0x3363fa(0x46e)](_0x25cd02[_0x3363fa(0x802)]));}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'AudioChangeBgmPitch',_0x503a09=>{const _0x4e0ccf=_0x55d321;VisuMZ['ConvertParams'](_0x503a09,_0x503a09);const _0x236e65=Math[_0x4e0ccf(0x69f)](_0x503a09[_0x4e0ccf(0x709)])['clamp'](0x32,0x96),_0x588380=AudioManager[_0x4e0ccf(0x6dc)];_0x588380&&(_0x588380['pitch']=_0x236e65,_0x588380[_0x4e0ccf(0x802)]=AudioManager['_bgmBuffer'][_0x4e0ccf(0x4ba)](),AudioManager['updateBgmParameters'](_0x588380),AudioManager[_0x4e0ccf(0x457)](_0x588380,_0x588380[_0x4e0ccf(0x802)]),AudioManager['_bgmBuffer'][_0x4e0ccf(0x46e)](_0x588380[_0x4e0ccf(0x802)]));}),PluginManager[_0x55d321(0x6b9)](pluginData['name'],_0x55d321(0x658),_0x26ab4f=>{const _0x311931=_0x55d321;VisuMZ[_0x311931(0x6b0)](_0x26ab4f,_0x26ab4f);const _0x5663eb=Math['round'](_0x26ab4f[_0x311931(0x82d)])[_0x311931(0x19a)](-0x64,0x64),_0x2741a8=AudioManager[_0x311931(0x6dc)];_0x2741a8&&(_0x2741a8['pan']=_0x5663eb,_0x2741a8[_0x311931(0x802)]=AudioManager[_0x311931(0x842)][_0x311931(0x4ba)](),AudioManager[_0x311931(0x29e)](_0x2741a8),AudioManager['playBgm'](_0x2741a8,_0x2741a8['pos']),AudioManager[_0x311931(0x842)][_0x311931(0x46e)](_0x2741a8['pos']));}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x809),_0x42f64d=>{const _0x3a895c=_0x55d321;VisuMZ[_0x3a895c(0x6b0)](_0x42f64d,_0x42f64d);const _0x416efd=Math['round'](_0x42f64d['volume'])[_0x3a895c(0x19a)](0x0,0x64),_0x4114ea=AudioManager[_0x3a895c(0x443)];_0x4114ea&&(_0x4114ea[_0x3a895c(0x21d)]=_0x416efd,_0x4114ea[_0x3a895c(0x802)]=AudioManager[_0x3a895c(0x20c)][_0x3a895c(0x4ba)](),AudioManager['updateBgsParameters'](_0x4114ea),AudioManager[_0x3a895c(0x2d6)](_0x4114ea,_0x4114ea[_0x3a895c(0x802)]),AudioManager[_0x3a895c(0x20c)]['_startPlaying'](_0x4114ea[_0x3a895c(0x802)]));}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],_0x55d321(0x45a),_0x189c11=>{const _0x5b2a2a=_0x55d321;VisuMZ[_0x5b2a2a(0x6b0)](_0x189c11,_0x189c11);const _0x427e0d=Math[_0x5b2a2a(0x69f)](_0x189c11['pitch'])[_0x5b2a2a(0x19a)](0x32,0x96),_0x4c718d=AudioManager[_0x5b2a2a(0x443)];_0x4c718d&&(_0x4c718d['pitch']=_0x427e0d,_0x4c718d[_0x5b2a2a(0x802)]=AudioManager['_bgsBuffer']['seek'](),AudioManager['updateBgsParameters'](_0x4c718d),AudioManager[_0x5b2a2a(0x2d6)](_0x4c718d,_0x4c718d[_0x5b2a2a(0x802)]),AudioManager[_0x5b2a2a(0x20c)][_0x5b2a2a(0x46e)](_0x4c718d[_0x5b2a2a(0x802)]));}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x244),_0x3ebba5=>{const _0x3ffd5d=_0x55d321;VisuMZ[_0x3ffd5d(0x6b0)](_0x3ebba5,_0x3ebba5);const _0x870e61=Math[_0x3ffd5d(0x69f)](_0x3ebba5[_0x3ffd5d(0x82d)])[_0x3ffd5d(0x19a)](-0x64,0x64),_0xdf5f46=AudioManager[_0x3ffd5d(0x443)];_0xdf5f46&&(_0xdf5f46[_0x3ffd5d(0x82d)]=_0x870e61,_0xdf5f46[_0x3ffd5d(0x802)]=AudioManager[_0x3ffd5d(0x20c)][_0x3ffd5d(0x4ba)](),AudioManager[_0x3ffd5d(0x150)](_0xdf5f46),AudioManager['playBgs'](_0xdf5f46,_0xdf5f46[_0x3ffd5d(0x802)]),AudioManager[_0x3ffd5d(0x20c)][_0x3ffd5d(0x46e)](_0xdf5f46['pos']));}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],'DebugConsoleLastControllerID',_0x5f1e9a=>{const _0xe79fe5=_0x55d321;if(!$gameTemp['isPlaytest']())return;const _0x36caf2=Input[_0xe79fe5(0x8ae)]();console['log'](_0x36caf2);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x8dc),_0x298a68=>{const _0x42542c=_0x55d321;if(!$gameTemp[_0x42542c(0x25f)]())return;if(!Utils[_0x42542c(0x2dc)]())return;SceneManager['_scene'][_0x42542c(0x8bf)]=![],VisuMZ['CoreEngine'][_0x42542c(0x78b)]();}),PluginManager[_0x55d321(0x6b9)](pluginData['name'],_0x55d321(0x5d3),_0x412cd9=>{const _0x66ab85=_0x55d321;if(!$gameTemp[_0x66ab85(0x25f)]())return;if(!Utils['isNwjs']())return;SceneManager[_0x66ab85(0x43e)][_0x66ab85(0x8bf)]=![],VisuMZ['CoreEngine']['ExportStrFromAllTroops']();}),PluginManager['registerCommand'](pluginData['name'],_0x55d321(0x704),_0x4b9fec=>{const _0x131dac=_0x55d321;if(!$gameTemp[_0x131dac(0x25f)]())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x131dac(0x58e)]()<=0x0)return;VisuMZ['ConvertParams'](_0x4b9fec,_0x4b9fec);const _0x219da7='Map%1'[_0x131dac(0x4a5)]($gameMap[_0x131dac(0x58e)]()[_0x131dac(0x88d)](0x3)),_0x4f7a90=VisuMZ['CoreEngine'][_0x131dac(0x5a0)]($gameMap[_0x131dac(0x58e)]());VisuMZ[_0x131dac(0x886)][_0x131dac(0x297)](_0x4f7a90,_0x219da7,!![]);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'ExportCurTroopText',_0x5e3499=>{const _0x502a7e=_0x55d321;if(!$gameTemp[_0x502a7e(0x25f)]())return;if(!Utils[_0x502a7e(0x2dc)]())return;if(!$gameParty[_0x502a7e(0x754)]())return;VisuMZ[_0x502a7e(0x6b0)](_0x5e3499,_0x5e3499);const _0x32f73d=_0x502a7e(0x24e)[_0x502a7e(0x4a5)]($gameTroop[_0x502a7e(0x8fc)][_0x502a7e(0x88d)](0x4)),_0x53c02d=VisuMZ[_0x502a7e(0x886)]['ExtractStrFromTroop']($gameTroop[_0x502a7e(0x8fc)]);VisuMZ[_0x502a7e(0x886)][_0x502a7e(0x297)](_0x53c02d,_0x32f73d,!![]);}),VisuMZ['CoreEngine'][_0x55d321(0x297)]=function(_0xe47c2f,_0x7b547,_0x414f51){const _0x40ee0a=_0x55d321,_0x4e7d6c=require('fs');let _0x152192=_0x40ee0a(0x692)[_0x40ee0a(0x4a5)](_0x7b547||'0');_0x4e7d6c[_0x40ee0a(0x915)](_0x152192,_0xe47c2f,_0x3c5e05=>{const _0x3aeb55=_0x40ee0a;if(_0x3c5e05)throw err;else _0x414f51&&alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x3aeb55(0x4a5)](_0x152192));});},VisuMZ[_0x55d321(0x886)][_0x55d321(0x78b)]=function(){const _0x103b2c=_0x55d321,_0x90ad5c=[];for(const _0x38c31f of $dataMapInfos){if(!_0x38c31f)continue;_0x90ad5c['push'](_0x38c31f['id']);}const _0x34a032=_0x90ad5c[_0x103b2c(0x7e5)]*0x64+Math[_0x103b2c(0x388)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x103b2c(0x4a5)](_0x34a032)),this[_0x103b2c(0x8a6)]=[],this[_0x103b2c(0x727)]=$dataMap;for(const _0x42f2c3 of _0x90ad5c){VisuMZ[_0x103b2c(0x886)]['loadMapData'](_0x42f2c3);}setTimeout(VisuMZ[_0x103b2c(0x886)][_0x103b2c(0x896)][_0x103b2c(0x88a)](this),_0x34a032);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x804)]=function(_0x492bdb){const _0x5acdf1=_0x55d321,_0x4a4ebb=_0x5acdf1(0x37c)[_0x5acdf1(0x4a5)](_0x492bdb['padZero'](0x3)),_0x2e8ffe=new XMLHttpRequest(),_0x5b1184=_0x5acdf1(0x369)+_0x4a4ebb;_0x2e8ffe[_0x5acdf1(0x8b9)](_0x5acdf1(0x419),_0x5b1184),_0x2e8ffe['overrideMimeType']('application/json'),_0x2e8ffe[_0x5acdf1(0x6ca)]=()=>this[_0x5acdf1(0x6d1)](_0x2e8ffe,_0x492bdb,_0x4a4ebb,_0x5b1184),_0x2e8ffe['onerror']=()=>DataManager[_0x5acdf1(0x5b0)](_0x5acdf1(0x218),_0x4a4ebb,_0x5b1184),_0x2e8ffe[_0x5acdf1(0x2f1)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x6d1)]=function(_0xd7b34,_0xce08ef,_0x59a4cb,_0x4ff231){const _0x980709=_0x55d321;$dataMap=JSON[_0x980709(0x371)](_0xd7b34[_0x980709(0x680)]),DataManager['onLoad']($dataMap),this[_0x980709(0x8a6)][_0xce08ef]=VisuMZ[_0x980709(0x886)]['ExtractStrFromMap'](_0xce08ef),$dataMap=this['_currentMap'];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x896)]=function(){const _0x3bbf32=_0x55d321,_0x4ec7cc=_0x3bbf32(0x3a1);this[_0x3bbf32(0x8a6)][_0x3bbf32(0x8e5)](undefined)[_0x3bbf32(0x8e5)]('')['remove'](null);const _0x177391=this[_0x3bbf32(0x8a6)][_0x3bbf32(0x54e)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ[_0x3bbf32(0x886)][_0x3bbf32(0x297)](_0x177391,_0x4ec7cc,!![]),SceneManager[_0x3bbf32(0x43e)][_0x3bbf32(0x8bf)]=!![];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5a0)]=function(_0x14bef1){const _0x2a5d81=_0x55d321;if(!$dataMap)return'';let _0xcb8eec='█'[_0x2a5d81(0x28e)](0x46)+'\x0a\x0a',_0x949ec1='═'['repeat'](0x46)+'\x0a\x0a',_0x2ba0da='';this['_commonEventLayers']=0x0;for(const _0x278710 of $dataMap['events']){if(!_0x278710)continue;let _0x64b061=_0x278710['id'],_0x173587=_0x278710[_0x2a5d81(0x7c4)],_0x3123f8=_0x278710[_0x2a5d81(0x303)];for(const _0xe57cce of _0x3123f8){const _0x20b796=_0x3123f8[_0x2a5d81(0x203)](_0xe57cce)+0x1;let _0x171415=_0x949ec1+_0x2a5d81(0x595),_0x40d143=VisuMZ[_0x2a5d81(0x886)][_0x2a5d81(0x91a)](_0xe57cce['list']);if(_0x40d143[_0x2a5d81(0x7e5)]>0x0){if(_0x2ba0da[_0x2a5d81(0x7e5)]>0x0)_0x2ba0da+=_0x949ec1+_0x2a5d81(0x496);else{const _0x4a9e9d=$dataMapInfos[_0x14bef1][_0x2a5d81(0x7c4)];_0x2ba0da+=_0xcb8eec+_0x2a5d81(0x6db)[_0x2a5d81(0x4a5)](_0x14bef1,_0x4a9e9d||_0x2a5d81(0x878))+_0xcb8eec;}_0x2ba0da+=_0x171415[_0x2a5d81(0x4a5)](_0x64b061,_0x173587,_0x20b796,_0x40d143);}}}return _0x2ba0da[_0x2a5d81(0x7e5)]>0x0&&(_0x2ba0da+=_0x949ec1),_0x2ba0da;},VisuMZ[_0x55d321(0x886)]['ExportStrFromAllTroops']=function(){const _0x545303=_0x55d321,_0x1ade6f=$dataTroops[_0x545303(0x7e5)]*0xa+Math[_0x545303(0x388)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x545303(0x4a5)](_0x1ade6f));const _0x4d0c2f=[];for(const _0x33d493 of $dataTroops){if(!_0x33d493)continue;const _0x57223d=_0x33d493['id'];_0x4d0c2f[_0x57223d]=VisuMZ[_0x545303(0x886)]['ExtractStrFromTroop'](_0x57223d);}setTimeout(VisuMZ[_0x545303(0x886)][_0x545303(0x5e9)][_0x545303(0x88a)](this,_0x4d0c2f),_0x1ade6f);},VisuMZ['CoreEngine'][_0x55d321(0x899)]=function(_0x266677){const _0x188b8f=_0x55d321;if(!$dataTroops[_0x266677])return'';let _0x2e11e3='█'['repeat'](0x46)+'\x0a\x0a',_0x100619='═'[_0x188b8f(0x28e)](0x46)+'\x0a\x0a',_0x150764='';this[_0x188b8f(0x834)]=0x0;const _0x34f5ef=$dataTroops[_0x266677];let _0x2940a3=_0x34f5ef['pages'];for(const _0x63a53e of _0x2940a3){const _0x3444bc=_0x2940a3[_0x188b8f(0x203)](_0x63a53e)+0x1;let _0x2080e0=_0x100619+_0x188b8f(0x545),_0x3a27b5=VisuMZ[_0x188b8f(0x886)][_0x188b8f(0x91a)](_0x63a53e[_0x188b8f(0x8a4)]);_0x3a27b5[_0x188b8f(0x7e5)]>0x0&&(_0x150764[_0x188b8f(0x7e5)]>0x0?_0x150764+=_0x100619+'\x0a\x0a\x0a\x0a\x0a':_0x150764+=_0x2e11e3+_0x188b8f(0x52d)[_0x188b8f(0x4a5)](_0x266677,_0x34f5ef[_0x188b8f(0x7c4)]||_0x188b8f(0x878))+_0x2e11e3,_0x150764+=_0x2080e0[_0x188b8f(0x4a5)](_0x3444bc,_0x3a27b5));}return _0x150764[_0x188b8f(0x7e5)]>0x0&&(_0x150764+=_0x100619),_0x150764;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5e9)]=function(_0x513269){const _0x5a6d0d=_0x55d321,_0x1cff91=_0x5a6d0d(0x276);_0x513269[_0x5a6d0d(0x8e5)](undefined)[_0x5a6d0d(0x8e5)]('')[_0x5a6d0d(0x8e5)](null);const _0x17dcc8=_0x513269[_0x5a6d0d(0x54e)]('\x0a\x0a\x0a\x0a\x0a')['trim']();VisuMZ['CoreEngine'][_0x5a6d0d(0x297)](_0x17dcc8,_0x1cff91,!![]),SceneManager[_0x5a6d0d(0x43e)][_0x5a6d0d(0x8bf)]=!![];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x91a)]=function(_0xfbc2d3){const _0x54459c=_0x55d321;let _0x1066f5='\x0a'+'─'[_0x54459c(0x28e)](0x46)+'\x0a',_0x6bea50='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x402daf='';for(const _0x34389e of _0xfbc2d3){if(!_0x34389e)continue;if(_0x34389e[_0x54459c(0x699)]===0x65)_0x402daf+=_0x1066f5+'\x0a',_0x402daf+=_0x54459c(0x786),_0x34389e[_0x54459c(0x5af)][0x4]!==''&&_0x34389e[_0x54459c(0x5af)][0x4]!==undefined&&(_0x402daf+=_0x54459c(0x337)[_0x54459c(0x4a5)](_0x34389e[_0x54459c(0x5af)][0x4]));else{if(_0x34389e[_0x54459c(0x699)]===0x191)_0x402daf+=_0x54459c(0x43f)[_0x54459c(0x4a5)](_0x34389e['parameters'][0x0]);else{if(_0x34389e[_0x54459c(0x699)]===0x192)_0x402daf+=_0x1066f5,_0x402daf+='%1〘Choice\x20%2〙\x20%3%1'['format'](_0x6bea50,_0x34389e[_0x54459c(0x5af)][0x0]+0x1,_0x34389e['parameters'][0x1]);else{if(_0x34389e[_0x54459c(0x699)]===0x193)_0x402daf+=_0x1066f5,_0x402daf+='%1〘Choice\x20Cancel〙%1'[_0x54459c(0x4a5)](_0x6bea50);else{if(_0x34389e['code']===0x194)_0x402daf+=_0x1066f5,_0x402daf+='%1〘End\x20Choice\x20Selection〙%1'[_0x54459c(0x4a5)](_0x6bea50);else{if(_0x34389e[_0x54459c(0x699)]===0x69)_0x402daf+=_0x1066f5+'\x0a',_0x402daf+=_0x54459c(0x746);else{if(_0x34389e['code']===0x6c)_0x402daf+=_0x1066f5+'\x0a',_0x402daf+=_0x54459c(0x91b)[_0x54459c(0x4a5)](_0x34389e[_0x54459c(0x5af)][0x0]);else{if(_0x34389e[_0x54459c(0x699)]===0x198)_0x402daf+=_0x54459c(0x43f)[_0x54459c(0x4a5)](_0x34389e['parameters'][0x0]);else{if(_0x34389e[_0x54459c(0x699)]===0x75){const _0x22af0d=$dataCommonEvents[_0x34389e['parameters'][0x0]];if(_0x22af0d&&this[_0x54459c(0x834)]<=0xa){this[_0x54459c(0x834)]++;let _0x4c3c89=VisuMZ[_0x54459c(0x886)][_0x54459c(0x91a)](_0x22af0d[_0x54459c(0x8a4)]);_0x4c3c89[_0x54459c(0x7e5)]>0x0&&(_0x402daf+=_0x1066f5,_0x402daf+=_0x6bea50,_0x402daf+=_0x54459c(0x6aa)[_0x54459c(0x4a5)](_0x22af0d['id'],_0x22af0d['name']),_0x402daf+=_0x6bea50,_0x402daf+=_0x4c3c89,_0x402daf+=_0x6bea50,_0x402daf+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x54459c(0x4a5)](_0x22af0d['id'],_0x22af0d[_0x54459c(0x7c4)]),_0x402daf+=_0x6bea50),this[_0x54459c(0x834)]--;}}}}}}}}}}}return _0x402daf[_0x54459c(0x7e5)]>0x0&&(_0x402daf+=_0x1066f5),_0x402daf;},PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'OpenURL',_0x1ab314=>{const _0x262e42=_0x55d321;VisuMZ[_0x262e42(0x6b0)](_0x1ab314,_0x1ab314);const _0x17fa67=_0x1ab314['URL'];VisuMZ[_0x262e42(0x1ba)](_0x17fa67);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x187),_0x27fa7f=>{const _0x1b70bf=_0x55d321;VisuMZ[_0x1b70bf(0x6b0)](_0x27fa7f,_0x27fa7f);const _0x44ad13=_0x27fa7f['value']||0x0;$gameParty[_0x1b70bf(0x2c9)](_0x44ad13);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'MapOnceParallel',_0x3cbcf8=>{const _0x351859=_0x55d321;if(!SceneManager[_0x351859(0x4f8)]())return;VisuMZ['ConvertParams'](_0x3cbcf8,_0x3cbcf8);const _0x44e7d7=_0x3cbcf8['CommonEventID'];SceneManager[_0x351859(0x43e)][_0x351859(0x8c4)](_0x44e7d7);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x4ee),_0x39cb85=>{const _0x635eaf=_0x55d321;if(!$gameTemp[_0x635eaf(0x25f)]())return;if(!Utils[_0x635eaf(0x2dc)]())return;VisuMZ[_0x635eaf(0x6b0)](_0x39cb85,_0x39cb85);const _0x533738=_0x39cb85['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0x533738;}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x8c3),_0x4d5b4c=>{const _0xcd5856=_0x55d321;VisuMZ[_0xcd5856(0x6b0)](_0x4d5b4c,_0x4d5b4c);const _0x3bb514=_0x4d5b4c['pictureId']||0x1,_0x5a6e7d=_0x4d5b4c[_0xcd5856(0x6f3)]||'Linear',_0x174c8a=$gameScreen['picture'](_0x3bb514);_0x174c8a&&_0x174c8a[_0xcd5856(0x44e)](_0x5a6e7d);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x147),_0x4bbc2b=>{const _0x394dfc=_0x55d321;for(let _0x42dbbc=0x1;_0x42dbbc<=$gameScreen[_0x394dfc(0x890)]();_0x42dbbc++){$gameScreen[_0x394dfc(0x778)](_0x42dbbc);}}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'PictureEraseRange',_0x1836c5=>{const _0x576db7=_0x55d321;VisuMZ[_0x576db7(0x6b0)](_0x1836c5,_0x1836c5);const _0x247357=Math[_0x576db7(0x89b)](_0x1836c5[_0x576db7(0x475)],_0x1836c5[_0x576db7(0x906)]),_0x4f17ea=Math['max'](_0x1836c5['StartID'],_0x1836c5[_0x576db7(0x906)]);for(let _0x758c99=_0x247357;_0x758c99<=_0x4f17ea;_0x758c99++){$gameScreen[_0x576db7(0x778)](_0x758c99);}}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x153),_0x18a9b0=>{const _0x18d9ca=_0x55d321;VisuMZ[_0x18d9ca(0x6b0)](_0x18a9b0,_0x18a9b0);const _0x4b0ecc=Math[_0x18d9ca(0x69f)](_0x18a9b0[_0x18d9ca(0x93d)])['clamp'](0x1,0x64),_0x3d4c5f=-Number(_0x18a9b0[_0x18d9ca(0x8c2)]||0x0),_0x4ba321=Math[_0x18d9ca(0x548)](_0x18a9b0[_0x18d9ca(0x459)]||0x0,0x0),_0x29c738=_0x18a9b0[_0x18d9ca(0x6f3)]||_0x18d9ca(0x1aa),_0x4e9dc4=_0x18a9b0[_0x18d9ca(0x231)],_0x322f44=$gameScreen['picture'](_0x4b0ecc);if(!_0x322f44)return;_0x322f44['changeAnglePlusData'](_0x3d4c5f,_0x4ba321,_0x29c738);if(_0x4e9dc4){const _0x41c953=$gameTemp['getLastPluginCommandInterpreter']();if(_0x41c953)_0x41c953[_0x18d9ca(0x614)](_0x4ba321);}}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x37e),_0x1d5912=>{const _0x5cdbed=_0x55d321;VisuMZ['ConvertParams'](_0x1d5912,_0x1d5912);const _0x2d5c0d=Math[_0x5cdbed(0x69f)](_0x1d5912[_0x5cdbed(0x93d)])['clamp'](0x1,0x64),_0x1adc3a=-Number(_0x1d5912[_0x5cdbed(0x428)]||0x0),_0x1ff7ee=Math[_0x5cdbed(0x548)](_0x1d5912['Duration']||0x0,0x0),_0x231a29=_0x1d5912[_0x5cdbed(0x6f3)]||_0x5cdbed(0x1aa),_0x3cdc41=_0x1d5912[_0x5cdbed(0x231)],_0x296559=$gameScreen[_0x5cdbed(0x171)](_0x2d5c0d);if(!_0x296559)return;_0x296559[_0x5cdbed(0x926)](_0x1adc3a,_0x1ff7ee,_0x231a29);if(_0x3cdc41){const _0x2142cd=$gameTemp[_0x5cdbed(0x42e)]();if(_0x2142cd)_0x2142cd['wait'](_0x1ff7ee);}}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],_0x55d321(0x3e0),_0x29e720=>{const _0x42e691=_0x55d321;VisuMZ[_0x42e691(0x6b0)](_0x29e720,_0x29e720);const _0x540fd7=Math[_0x42e691(0x69f)](_0x29e720[_0x42e691(0x93d)])[_0x42e691(0x19a)](0x1,0x64),_0x328249=_0x29e720['Settings'],_0x2f5f9d=_0x328249[_0x42e691(0x711)][_0x42e691(0x19a)](0x0,0x1),_0x1c5f68=Math['round'](_0x328249[_0x42e691(0x51e)]||0x0),_0x338beb=Math[_0x42e691(0x69f)](_0x328249[_0x42e691(0x1f9)]||0x0),_0x11197b=Math[_0x42e691(0x69f)](_0x328249[_0x42e691(0x330)]||0x0),_0x2384b9=Math[_0x42e691(0x69f)](_0x328249[_0x42e691(0x488)]||0x0),_0x3f9849=Math[_0x42e691(0x69f)](_0x328249[_0x42e691(0x6e7)])[_0x42e691(0x19a)](0x0,0xff),_0x869431=_0x328249[_0x42e691(0x497)],_0x1acffd=_0x42e691(0x19c),_0x32f0df=_0x29e720[_0x42e691(0x794)]?_0x42e691(0x794):_0x42e691(0x540),_0x39fec6=_0x1acffd[_0x42e691(0x4a5)](_0x29e720[_0x42e691(0x1f3)],_0x32f0df);$gameScreen['showPicture'](_0x540fd7,_0x39fec6,_0x2f5f9d,_0x1c5f68,_0x338beb,_0x11197b,_0x2384b9,_0x3f9849,_0x869431);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x733),_0x21b7aa=>{const _0x126573=_0x55d321;VisuMZ[_0x126573(0x6b0)](_0x21b7aa,_0x21b7aa);const _0x45d9f1=_0x21b7aa[_0x126573(0x347)]||_0x126573(0x2db),_0x2a3a43=_0x21b7aa[_0x126573(0x465)][_0x126573(0x19a)](0x1,0x9),_0x19ea7d=_0x21b7aa[_0x126573(0x6ea)]['clamp'](0x1,0x9),_0x3527f1=_0x21b7aa[_0x126573(0x459)]||0x1,_0x2b85cb=_0x21b7aa[_0x126573(0x231)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x45d9f1),$gameScreen['startShake'](_0x2a3a43,_0x19ea7d,_0x3527f1);if(_0x2b85cb){const _0x4ca49e=$gameTemp[_0x126573(0x42e)]();if(_0x4ca49e)_0x4ca49e[_0x126573(0x614)](_0x3527f1);}}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'SwitchRandomizeOne',_0x174ffe=>{const _0x5b9653=_0x55d321;if($gameParty[_0x5b9653(0x754)]())return;VisuMZ[_0x5b9653(0x6b0)](_0x174ffe,_0x174ffe);const _0x5a8d27=_0x174ffe[_0x5b9653(0x7e6)],_0x3b2259=(_0x174ffe[_0x5b9653(0x66e)]||0x0)/0x64;for(const _0x39dd19 of _0x5a8d27){const _0x139620=Math[_0x5b9653(0x2db)]()<=_0x3b2259;$gameSwitches['setValue'](_0x39dd19,_0x139620);}}),PluginManager[_0x55d321(0x6b9)](pluginData['name'],'SwitchRandomizeRange',_0x5c5ba2=>{const _0x22b437=_0x55d321;if($gameParty[_0x22b437(0x754)]())return;VisuMZ[_0x22b437(0x6b0)](_0x5c5ba2,_0x5c5ba2);const _0x1bfe86=Math[_0x22b437(0x89b)](_0x5c5ba2[_0x22b437(0x475)],_0x5c5ba2[_0x22b437(0x906)]),_0x19c71a=Math[_0x22b437(0x548)](_0x5c5ba2[_0x22b437(0x475)],_0x5c5ba2[_0x22b437(0x906)]),_0x1df12c=(_0x5c5ba2[_0x22b437(0x66e)]||0x0)/0x64;for(let _0x14048e=_0x1bfe86;_0x14048e<=_0x19c71a;_0x14048e++){const _0x19dbb9=Math[_0x22b437(0x2db)]()<=_0x1df12c;$gameSwitches[_0x22b437(0x70d)](_0x14048e,_0x19dbb9);}}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x83c),_0x22f3ab=>{const _0x3a0cc7=_0x55d321;if($gameParty['inBattle']())return;VisuMZ[_0x3a0cc7(0x6b0)](_0x22f3ab,_0x22f3ab);const _0x17e10e=_0x22f3ab[_0x3a0cc7(0x7e6)];for(const _0x3440b6 of _0x17e10e){const _0xf95255=$gameSwitches[_0x3a0cc7(0x1c5)](_0x3440b6);$gameSwitches[_0x3a0cc7(0x70d)](_0x3440b6,!_0xf95255);}}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],_0x55d321(0x8c0),_0x252346=>{const _0x2b0893=_0x55d321;if($gameParty['inBattle']())return;VisuMZ[_0x2b0893(0x6b0)](_0x252346,_0x252346);const _0x37573d=Math[_0x2b0893(0x89b)](_0x252346[_0x2b0893(0x475)],_0x252346[_0x2b0893(0x906)]),_0x1d3dbe=Math['max'](_0x252346[_0x2b0893(0x475)],_0x252346[_0x2b0893(0x906)]);for(let _0x5cf9bb=_0x37573d;_0x5cf9bb<=_0x1d3dbe;_0x5cf9bb++){const _0x543166=$gameSwitches[_0x2b0893(0x1c5)](_0x5cf9bb);$gameSwitches[_0x2b0893(0x70d)](_0x5cf9bb,!_0x543166);}}),PluginManager[_0x55d321(0x6b9)](pluginData['name'],'SystemSetFontSize',_0x1497a2=>{const _0x6f80d8=_0x55d321;VisuMZ['ConvertParams'](_0x1497a2,_0x1497a2);const _0x221724=_0x1497a2[_0x6f80d8(0x429)]||0x1;$gameSystem['setMainFontSize'](_0x221724);}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],_0x55d321(0x610),_0x460599=>{const _0x55831a=_0x55d321;if($gameParty[_0x55831a(0x754)]())return;VisuMZ[_0x55831a(0x6b0)](_0x460599,_0x460599);const _0x533078=_0x460599[_0x55831a(0x429)];if(_0x533078[_0x55831a(0x362)](/Front/i))$gameSystem[_0x55831a(0x62f)](![]);else _0x533078[_0x55831a(0x362)](/Side/i)?$gameSystem[_0x55831a(0x62f)](!![]):$gameSystem[_0x55831a(0x62f)](!$gameSystem[_0x55831a(0x3fb)]());}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],_0x55d321(0x53d),_0x407727=>{const _0x56c4ab=_0x55d321;if($gameParty[_0x56c4ab(0x754)]())return;VisuMZ['ConvertParams'](_0x407727,_0x407727);const _0x14bc68=[_0x56c4ab(0x1fd),_0x56c4ab(0x6b7),'me','se'];for(const _0x8141b8 of _0x14bc68){const _0x42ddb1=_0x407727[_0x8141b8],_0x4255b6=_0x56c4ab(0x221)['format'](_0x8141b8);for(const _0x4069ec of _0x42ddb1){AudioManager['createBuffer'](_0x4255b6,_0x4069ec);}}}),PluginManager['registerCommand'](pluginData['name'],'SystemLoadImages',_0x5a3d0a=>{const _0x5e93f6=_0x55d321;if($gameParty[_0x5e93f6(0x754)]())return;VisuMZ['ConvertParams'](_0x5a3d0a,_0x5a3d0a);const _0x1c477f=[_0x5e93f6(0x47e),_0x5e93f6(0x414),'battlebacks2',_0x5e93f6(0x6d5),_0x5e93f6(0x6d3),_0x5e93f6(0x2ef),_0x5e93f6(0x35b),_0x5e93f6(0x690),_0x5e93f6(0x7c8),_0x5e93f6(0x5d6),_0x5e93f6(0x946),_0x5e93f6(0x861),_0x5e93f6(0x311),_0x5e93f6(0x789)];for(const _0x2cdc6a of _0x1c477f){const _0x5ae8c8=_0x5a3d0a[_0x2cdc6a],_0x3e799d=_0x5e93f6(0x164)['format'](_0x2cdc6a);for(const _0x3e1c36 of _0x5ae8c8){ImageManager[_0x5e93f6(0x1a7)](_0x3e799d,_0x3e1c36);}}}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],_0x55d321(0x847),_0xffd808=>{const _0x17e6a3=_0x55d321;if($gameParty[_0x17e6a3(0x754)]())return;VisuMZ[_0x17e6a3(0x6b0)](_0xffd808,_0xffd808);const _0x2a7656=_0xffd808[_0x17e6a3(0x429)][_0x17e6a3(0x539)]()[_0x17e6a3(0x214)](),_0x8bed1f=VisuMZ[_0x17e6a3(0x886)][_0x17e6a3(0x36c)](_0x2a7656);$gameSystem['setBattleSystem'](_0x8bed1f);}),VisuMZ[_0x55d321(0x886)][_0x55d321(0x36c)]=function(_0x123403){const _0x25f1b0=_0x55d321;_0x123403=_0x123403||_0x25f1b0(0x5da),_0x123403=String(_0x123403)['toUpperCase']()[_0x25f1b0(0x214)]();switch(_0x123403){case _0x25f1b0(0x838):return 0x0;case'TPB\x20ACTIVE':return 0x1;case _0x25f1b0(0x319):return 0x2;case _0x25f1b0(0x2a6):if(Imported['VisuMZ_2_BattleSystemCTB'])return'CTB';break;case _0x25f1b0(0x7fe):if(Imported[_0x25f1b0(0x554)])return'STB';break;case _0x25f1b0(0x191):if(Imported[_0x25f1b0(0x78e)])return _0x25f1b0(0x191);break;case _0x25f1b0(0x87d):if(Imported[_0x25f1b0(0x7a4)])return _0x25f1b0(0x87d);break;case'OTB':if(Imported[_0x25f1b0(0x395)])return _0x25f1b0(0x78a);break;case _0x25f1b0(0x87f):if(Imported[_0x25f1b0(0x821)])return _0x25f1b0(0x87f);break;case _0x25f1b0(0x944):if(Imported[_0x25f1b0(0x58a)])return _0x25f1b0(0x944);break;}return $dataSystem['battleSystem'];},PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],'SystemSetWindowPadding',_0x5aa4ad=>{const _0x32ea71=_0x55d321;VisuMZ[_0x32ea71(0x6b0)](_0x5aa4ad,_0x5aa4ad);const _0x38d798=_0x5aa4ad[_0x32ea71(0x429)]||0x1;$gameSystem[_0x32ea71(0x556)](_0x38d798);}),PluginManager[_0x55d321(0x6b9)](pluginData[_0x55d321(0x7c4)],_0x55d321(0x46a),_0x374c9c=>{VisuMZ['ConvertParams'](_0x374c9c,_0x374c9c);const _0x49f49a=_0x374c9c['text']||'';$textPopup(_0x49f49a);}),PluginManager['registerCommand'](pluginData[_0x55d321(0x7c4)],'VariableEvalReference',_0x1d9383=>{const _0x4d54ca=_0x55d321;VisuMZ[_0x4d54ca(0x6b0)](_0x1d9383,_0x1d9383);const _0x340a4b=_0x1d9383['id']||0x1,_0x2dcdac=_0x1d9383[_0x4d54ca(0x4d9)],_0x20b5ed=_0x1d9383['operand']||0x0;let _0x169ba3=$gameVariables[_0x4d54ca(0x1c5)](_0x340a4b)||0x0;switch(_0x2dcdac){case'=':_0x169ba3=_0x20b5ed;break;case'+':_0x169ba3+=_0x20b5ed;break;case'-':_0x169ba3-=_0x20b5ed;break;case'*':_0x169ba3*=_0x20b5ed;break;case'/':_0x169ba3/=_0x20b5ed;break;case'%':_0x169ba3%=_0x20b5ed;break;}_0x169ba3=_0x169ba3||0x0,$gameVariables['setValue'](_0x340a4b,_0x169ba3);}),PluginManager[_0x55d321(0x6b9)](pluginData['name'],_0x55d321(0x54f),_0xf14676=>{const _0x3473e3=_0x55d321;VisuMZ[_0x3473e3(0x6b0)](_0xf14676,_0xf14676);const _0xbc6638=_0xf14676['id']()||0x1,_0x199ae9=_0xf14676[_0x3473e3(0x4d9)],_0x170af7=_0xf14676[_0x3473e3(0x283)]()||0x0;let _0x1b99ed=$gameVariables[_0x3473e3(0x1c5)](_0xbc6638)||0x0;switch(_0x199ae9){case'=':_0x1b99ed=_0x170af7;break;case'+':_0x1b99ed+=_0x170af7;break;case'-':_0x1b99ed-=_0x170af7;break;case'*':_0x1b99ed*=_0x170af7;break;case'/':_0x1b99ed/=_0x170af7;break;case'%':_0x1b99ed%=_0x170af7;break;}_0x1b99ed=_0x1b99ed||0x0,$gameVariables['setValue'](_0xbc6638,_0x1b99ed);}),VisuMZ[_0x55d321(0x886)][_0x55d321(0x51f)]=Scene_Boot[_0x55d321(0x2a8)]['onDatabaseLoaded'],Scene_Boot[_0x55d321(0x2a8)]['onDatabaseLoaded']=function(){const _0x3f21f6=_0x55d321;VisuMZ[_0x3f21f6(0x886)][_0x3f21f6(0x51f)][_0x3f21f6(0x2b5)](this),this[_0x3f21f6(0x452)](),this[_0x3f21f6(0x7fa)](),this[_0x3f21f6(0x8e2)](),this[_0x3f21f6(0x18a)](),this[_0x3f21f6(0x884)](),this[_0x3f21f6(0x4cf)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x157)]={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x1f0eb5=_0x55d321,_0x56bc74=[_0x1f0eb5(0x8aa),_0x1f0eb5(0x674),_0x1f0eb5(0x3ad),'DEF',_0x1f0eb5(0x840),'MDF',_0x1f0eb5(0x343),_0x1f0eb5(0x3cb)],_0x4d55c5=['HIT',_0x1f0eb5(0x260),_0x1f0eb5(0x4c3),_0x1f0eb5(0x52a),_0x1f0eb5(0x141),'MRF',_0x1f0eb5(0x682),_0x1f0eb5(0x26a),_0x1f0eb5(0x194),'TRG'],_0x4cc79a=['TGR','GRD',_0x1f0eb5(0x52b),_0x1f0eb5(0x5b8),'MCR','TCR',_0x1f0eb5(0x941),_0x1f0eb5(0x27d),_0x1f0eb5(0x6c9),_0x1f0eb5(0x328)],_0x1909b8=[_0x56bc74,_0x4d55c5,_0x4cc79a],_0x25bfd3=['Plus',_0x1f0eb5(0x392),_0x1f0eb5(0x1a0),_0x1f0eb5(0x538),_0x1f0eb5(0x24b),_0x1f0eb5(0x792),'Rate2',_0x1f0eb5(0x262),'Flat1',_0x1f0eb5(0x7cc)];for(const _0x2bb2d9 of _0x1909b8){let _0x220ad9='';if(_0x2bb2d9===_0x56bc74)_0x220ad9='param';if(_0x2bb2d9===_0x4d55c5)_0x220ad9=_0x1f0eb5(0x3f6);if(_0x2bb2d9===_0x4cc79a)_0x220ad9=_0x1f0eb5(0x432);for(const _0x32ea6e of _0x25bfd3){let _0x9e5000=_0x1f0eb5(0x462)[_0x1f0eb5(0x4a5)](_0x220ad9,_0x32ea6e);VisuMZ['CoreEngine'][_0x1f0eb5(0x157)][_0x9e5000]=[],VisuMZ[_0x1f0eb5(0x886)][_0x1f0eb5(0x157)][_0x9e5000+'JS']=[];let _0x19e97e='<%1\x20%2:[\x20]';if([_0x1f0eb5(0x149),'Flat']['includes'](_0x32ea6e))_0x19e97e+=_0x1f0eb5(0x246);else{if([_0x1f0eb5(0x392),'Flat1'][_0x1f0eb5(0x1bb)](_0x32ea6e))_0x19e97e+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x1f0eb5(0x1a0),_0x1f0eb5(0x7cc)]['includes'](_0x32ea6e))_0x19e97e+=_0x1f0eb5(0x4cd);else{if(_0x32ea6e==='Max')_0x19e97e+='(\x5cd+)>';else{if(_0x32ea6e==='Rate1')_0x19e97e+=_0x1f0eb5(0x44c);else _0x32ea6e==='Rate2'&&(_0x19e97e+=_0x1f0eb5(0x651));}}}}for(const _0x4a1732 of _0x2bb2d9){let _0xef0e2d=_0x32ea6e[_0x1f0eb5(0x678)](/[\d+]/g,'')[_0x1f0eb5(0x539)]();const _0x37c9e=_0x19e97e['format'](_0x4a1732,_0xef0e2d);VisuMZ['CoreEngine'][_0x1f0eb5(0x157)][_0x9e5000][_0x1f0eb5(0x582)](new RegExp(_0x37c9e,'i'));const _0x1f440a=_0x1f0eb5(0x3e6)[_0x1f0eb5(0x4a5)](_0x4a1732,_0xef0e2d);VisuMZ[_0x1f0eb5(0x886)]['RegExp'][_0x9e5000+'JS'][_0x1f0eb5(0x582)](new RegExp(_0x1f440a,'i'));}}}},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x7fa)]=function(){const _0x313c70=_0x55d321;if(VisuMZ[_0x313c70(0x3e3)])return;},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x8e2)]=function(){const _0x39be41=_0x55d321,_0x3f83ce=VisuMZ[_0x39be41(0x886)][_0x39be41(0x530)];_0x3f83ce[_0x39be41(0x6f5)][_0x39be41(0x4e3)]&&VisuMZ[_0x39be41(0x5c8)](!![]);_0x3f83ce[_0x39be41(0x6f5)][_0x39be41(0x83e)]&&(Input[_0x39be41(0x6f0)][0x23]='end',Input['keyMapper'][0x24]='home');if(_0x3f83ce[_0x39be41(0x56f)]){const _0x1dcd4b=_0x3f83ce[_0x39be41(0x56f)];_0x1dcd4b[_0x39be41(0x7f8)]=_0x1dcd4b[_0x39be41(0x7f8)]||_0x39be41(0x7bf),_0x1dcd4b[_0x39be41(0x215)]=_0x1dcd4b[_0x39be41(0x215)]||_0x39be41(0x748);}_0x3f83ce['KeyboardInput']['WASD']&&(Input[_0x39be41(0x6f0)][0x57]='up',Input[_0x39be41(0x6f0)][0x41]=_0x39be41(0x2a2),Input[_0x39be41(0x6f0)][0x53]=_0x39be41(0x7c7),Input[_0x39be41(0x6f0)][0x44]=_0x39be41(0x649),Input[_0x39be41(0x6f0)][0x45]=_0x39be41(0x7fb)),_0x3f83ce[_0x39be41(0x158)][_0x39be41(0x642)]&&(Input['keyMapper'][0x52]=_0x39be41(0x930)),_0x3f83ce[_0x39be41(0x3f0)][_0x39be41(0x1dd)]=_0x3f83ce[_0x39be41(0x3f0)][_0x39be41(0x1dd)][_0x39be41(0x8f0)](_0x1d630d=>_0x1d630d[_0x39be41(0x539)]()[_0x39be41(0x214)]()),_0x3f83ce[_0x39be41(0x3f0)]['ExtDisplayedParams']=_0x3f83ce[_0x39be41(0x3f0)][_0x39be41(0x567)][_0x39be41(0x8f0)](_0x2ece1=>_0x2ece1[_0x39be41(0x539)]()['trim']()),_0x3f83ce[_0x39be41(0x6f5)][_0x39be41(0x520)]=_0x3f83ce[_0x39be41(0x6f5)]['ShiftR_Toggle']??!![],_0x3f83ce[_0x39be41(0x6f5)][_0x39be41(0x386)]=_0x3f83ce['QoL'][_0x39be41(0x386)]??!![],_0x3f83ce['ButtonAssist'][_0x39be41(0x310)]&&VisuMZ[_0x39be41(0x886)]['CheckSplitEscape']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5bb)]=function(){const _0x5f3649=_0x55d321;let _0x3849cb=![],_0x49038e=![];for(let _0x4eeab7 in Input['keyMapper']){const _0x397c89=Input['keyMapper'][_0x4eeab7];if(_0x397c89===_0x5f3649(0x46c))_0x3849cb=!![];if(_0x397c89==='cancel')_0x49038e=!![];if(_0x3849cb&&_0x49038e)return;}let _0x125c44=_0x5f3649(0x56d);_0x125c44+='You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20',_0x125c44+='buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20',_0x125c44+='keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a',_0x125c44+=_0x5f3649(0x2b4),alert(_0x125c44),SceneManager['exit']();},Scene_Boot[_0x55d321(0x2a8)]['process_VisuMZ_CoreEngine_Functions']=function(){const _0x5b64f4=_0x55d321;this[_0x5b64f4(0x74e)]();},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x74e)]=function(){const _0x384dbb=_0x55d321,_0x14a157=VisuMZ['CoreEngine'][_0x384dbb(0x530)][_0x384dbb(0x292)];for(const _0x27ac0b of _0x14a157){const _0x63413f=_0x27ac0b['FunctionName'][_0x384dbb(0x678)](/[ ]/g,''),_0x46d9e8=_0x27ac0b[_0x384dbb(0x8f5)];VisuMZ[_0x384dbb(0x886)]['createJsQuickFunction'](_0x63413f,_0x46d9e8);}},VisuMZ['CoreEngine'][_0x55d321(0x3c4)]=function(_0x3042e3,_0x58b78a){const _0x3f869e=_0x55d321;if(!!window[_0x3042e3]){if($gameTemp[_0x3f869e(0x25f)]())console[_0x3f869e(0x35d)](_0x3f869e(0x1e7)[_0x3f869e(0x4a5)](_0x3042e3));}const _0x441deb=_0x3f869e(0x6f4)[_0x3f869e(0x4a5)](_0x3042e3,_0x58b78a);window[_0x3042e3]=new Function(_0x441deb);},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x884)]=function(){const _0x334bf9=_0x55d321,_0xafe18f=VisuMZ[_0x334bf9(0x886)]['Settings'][_0x334bf9(0x24c)];if(!_0xafe18f)return;for(const _0x3adb2f of _0xafe18f){if(!_0x3adb2f)continue;VisuMZ[_0x334bf9(0x886)][_0x334bf9(0x8a0)](_0x3adb2f);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ['CoreEngine'][_0x55d321(0x940)]={},VisuMZ[_0x55d321(0x886)][_0x55d321(0x871)]={},VisuMZ[_0x55d321(0x886)][_0x55d321(0x6e6)]={},VisuMZ[_0x55d321(0x886)][_0x55d321(0x8a0)]=function(_0x213c8c){const _0x435c0b=_0x55d321,_0xbb580e=_0x213c8c[_0x435c0b(0x546)],_0x141130=_0x213c8c[_0x435c0b(0x875)],_0x3af4f4=_0x213c8c[_0x435c0b(0x1f2)],_0x92cb2c=_0x213c8c['Type'],_0x1bd52d=new Function(_0x213c8c[_0x435c0b(0x679)]);VisuMZ['CoreEngine'][_0x435c0b(0x2ec)][_0xbb580e[_0x435c0b(0x539)]()[_0x435c0b(0x214)]()]=_0x141130,VisuMZ[_0x435c0b(0x886)][_0x435c0b(0x940)][_0xbb580e['toUpperCase']()[_0x435c0b(0x214)]()]=_0x3af4f4,VisuMZ['CoreEngine']['CustomParamType'][_0xbb580e[_0x435c0b(0x539)]()['trim']()]=_0x92cb2c,VisuMZ['CoreEngine'][_0x435c0b(0x6e6)][_0xbb580e['toUpperCase']()['trim']()]=_0xbb580e,Object[_0x435c0b(0x779)](Game_BattlerBase['prototype'],_0xbb580e,{'get'(){const _0x28d9f7=_0x435c0b,_0x32cc6b=_0x1bd52d['call'](this);return _0x92cb2c==='integer'?Math[_0x28d9f7(0x69f)](_0x32cc6b):_0x32cc6b;}});},VisuMZ[_0x55d321(0x886)]['ControllerButtons']={},VisuMZ[_0x55d321(0x886)][_0x55d321(0x782)]={},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x4cf)]=function(){const _0x38ad31=_0x55d321,_0x127658=VisuMZ['CoreEngine']['Settings']['ControllerButtons'];for(const _0x13d948 of _0x127658){const _0x2df6e7=(_0x13d948['Name']||'')[_0x38ad31(0x7ec)]()[_0x38ad31(0x214)](),_0x3a395b=(_0x13d948[_0x38ad31(0x89a)]||'')[_0x38ad31(0x7ec)]()['trim']();VisuMZ[_0x38ad31(0x886)][_0x38ad31(0x798)][_0x2df6e7]=_0x13d948,VisuMZ[_0x38ad31(0x886)]['ControllerMatches'][_0x3a395b]=_0x2df6e7;}},VisuMZ[_0x55d321(0x3e3)]=function(){const _0x37ae8e=_0x55d321;for(const _0x51a4d3 of $dataActors){if(_0x51a4d3)VisuMZ[_0x37ae8e(0x6cf)](_0x51a4d3);}for(const _0x57984b of $dataClasses){if(_0x57984b)VisuMZ[_0x37ae8e(0x220)](_0x57984b);}for(const _0x2ae9ca of $dataSkills){if(_0x2ae9ca)VisuMZ['ParseSkillNotetags'](_0x2ae9ca);}for(const _0x5c894f of $dataItems){if(_0x5c894f)VisuMZ[_0x37ae8e(0x7f0)](_0x5c894f);}for(const _0x49a8ad of $dataWeapons){if(_0x49a8ad)VisuMZ['ParseWeaponNotetags'](_0x49a8ad);}for(const _0x1a4658 of $dataArmors){if(_0x1a4658)VisuMZ[_0x37ae8e(0x3dd)](_0x1a4658);}for(const _0x4559ba of $dataEnemies){if(_0x4559ba)VisuMZ[_0x37ae8e(0x4e5)](_0x4559ba);}for(const _0x368f79 of $dataStates){if(_0x368f79)VisuMZ['ParseStateNotetags'](_0x368f79);}for(const _0x270a5a of $dataTilesets){if(_0x270a5a)VisuMZ[_0x37ae8e(0x50d)](_0x270a5a);}},VisuMZ['ParseActorNotetags']=function(_0x1afad5){},VisuMZ[_0x55d321(0x220)]=function(_0xca68c3){},VisuMZ['ParseSkillNotetags']=function(_0x1f8703){},VisuMZ[_0x55d321(0x7f0)]=function(_0x4a20c7){},VisuMZ[_0x55d321(0x304)]=function(_0x273c80){},VisuMZ[_0x55d321(0x3dd)]=function(_0x33b349){},VisuMZ[_0x55d321(0x4e5)]=function(_0x434993){},VisuMZ[_0x55d321(0x911)]=function(_0x3439f7){},VisuMZ[_0x55d321(0x50d)]=function(_0x3f005e){},VisuMZ[_0x55d321(0x886)]['ParseActorNotetags']=VisuMZ[_0x55d321(0x6cf)],VisuMZ[_0x55d321(0x6cf)]=function(_0x409e35){const _0x44c178=_0x55d321;VisuMZ[_0x44c178(0x886)][_0x44c178(0x6cf)][_0x44c178(0x2b5)](this,_0x409e35);const _0x4d0d02=_0x409e35[_0x44c178(0x291)];if(_0x4d0d02[_0x44c178(0x362)](/<MAX LEVEL:[ ](\d+)>/i)){_0x409e35[_0x44c178(0x387)]=Number(RegExp['$1']);if(_0x409e35[_0x44c178(0x387)]===0x0)_0x409e35[_0x44c178(0x387)]=Number[_0x44c178(0x38a)];}_0x4d0d02[_0x44c178(0x362)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x409e35['initialLevel']=Math[_0x44c178(0x89b)](Number(RegExp['$1']),_0x409e35[_0x44c178(0x387)]));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x220)]=VisuMZ[_0x55d321(0x220)],VisuMZ['ParseClassNotetags']=function(_0xcba68e){const _0x24d0cf=_0x55d321;VisuMZ[_0x24d0cf(0x886)]['ParseClassNotetags'][_0x24d0cf(0x2b5)](this,_0xcba68e);if(_0xcba68e[_0x24d0cf(0x566)])for(const _0x4dd479 of _0xcba68e[_0x24d0cf(0x566)]){_0x4dd479[_0x24d0cf(0x291)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x4dd479[_0x24d0cf(0x42d)]=Math[_0x24d0cf(0x548)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x55d321(0x886)][_0x55d321(0x4e5)]=VisuMZ[_0x55d321(0x4e5)],VisuMZ[_0x55d321(0x4e5)]=function(_0x538117){const _0x5adf3f=_0x55d321;VisuMZ[_0x5adf3f(0x886)]['ParseEnemyNotetags'][_0x5adf3f(0x2b5)](this,_0x538117),_0x538117[_0x5adf3f(0x42d)]=0x1;const _0x9a3c47=_0x538117['note'];if(_0x9a3c47[_0x5adf3f(0x362)](/<LEVEL:[ ](\d+)>/i))_0x538117[_0x5adf3f(0x42d)]=Number(RegExp['$1']);if(_0x9a3c47['match'](/<MAXHP:[ ](\d+)>/i))_0x538117[_0x5adf3f(0x2bf)][0x0]=Number(RegExp['$1']);if(_0x9a3c47[_0x5adf3f(0x362)](/<MAXMP:[ ](\d+)>/i))_0x538117['params'][0x1]=Number(RegExp['$1']);if(_0x9a3c47[_0x5adf3f(0x362)](/<ATK:[ ](\d+)>/i))_0x538117[_0x5adf3f(0x2bf)][0x2]=Number(RegExp['$1']);if(_0x9a3c47[_0x5adf3f(0x362)](/<DEF:[ ](\d+)>/i))_0x538117[_0x5adf3f(0x2bf)][0x3]=Number(RegExp['$1']);if(_0x9a3c47[_0x5adf3f(0x362)](/<MAT:[ ](\d+)>/i))_0x538117['params'][0x4]=Number(RegExp['$1']);if(_0x9a3c47[_0x5adf3f(0x362)](/<MDF:[ ](\d+)>/i))_0x538117['params'][0x5]=Number(RegExp['$1']);if(_0x9a3c47['match'](/<AGI:[ ](\d+)>/i))_0x538117[_0x5adf3f(0x2bf)][0x6]=Number(RegExp['$1']);if(_0x9a3c47['match'](/<LUK:[ ](\d+)>/i))_0x538117[_0x5adf3f(0x2bf)][0x7]=Number(RegExp['$1']);if(_0x9a3c47['match'](/<EXP:[ ](\d+)>/i))_0x538117['exp']=Number(RegExp['$1']);if(_0x9a3c47[_0x5adf3f(0x362)](/<GOLD:[ ](\d+)>/i))_0x538117['gold']=Number(RegExp['$1']);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x407)]=Graphics[_0x55d321(0x7b8)],Graphics['_defaultStretchMode']=function(){const _0x4b3f5a=_0x55d321;switch(VisuMZ[_0x4b3f5a(0x886)][_0x4b3f5a(0x530)][_0x4b3f5a(0x6f5)][_0x4b3f5a(0x7aa)]){case _0x4b3f5a(0x8bd):return!![];case _0x4b3f5a(0x480):return![];default:return VisuMZ[_0x4b3f5a(0x886)]['Graphics_defaultStretchMode']['call'](this);}},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5ea)]=Graphics[_0x55d321(0x4f7)],Graphics['printError']=function(_0x1bf6ec,_0x13d813,_0x82068c=null){const _0x282a4e=_0x55d321;VisuMZ[_0x282a4e(0x886)][_0x282a4e(0x5ea)]['call'](this,_0x1bf6ec,_0x13d813,_0x82068c),VisuMZ['ShowDevTools'](![]);},VisuMZ['CoreEngine'][_0x55d321(0x82f)]=Graphics[_0x55d321(0x572)],Graphics[_0x55d321(0x572)]=function(_0x2e9088){const _0x2aa4fb=_0x55d321;VisuMZ[_0x2aa4fb(0x886)][_0x2aa4fb(0x82f)][_0x2aa4fb(0x2b5)](this,_0x2e9088),this[_0x2aa4fb(0x46b)](_0x2e9088);},Graphics[_0x55d321(0x46b)]=function(_0x23686b){const _0xa39180=_0x55d321;VisuMZ[_0xa39180(0x886)][_0xa39180(0x530)]['QoL']['FontSmoothing']&&(_0x23686b[_0xa39180(0x316)][_0xa39180(0x29b)]=_0xa39180(0x55e));VisuMZ[_0xa39180(0x886)]['Settings'][_0xa39180(0x6f5)]['PixelateImageRendering']&&(_0x23686b[_0xa39180(0x316)][_0xa39180(0x81c)]='pixelated');const _0x552a9e=Math[_0xa39180(0x548)](0x0,Math[_0xa39180(0x33d)](_0x23686b[_0xa39180(0x85f)]*this[_0xa39180(0x93c)])),_0x1b38bb=Math[_0xa39180(0x548)](0x0,Math[_0xa39180(0x33d)](_0x23686b[_0xa39180(0x48d)]*this[_0xa39180(0x93c)]));_0x23686b[_0xa39180(0x316)][_0xa39180(0x85f)]=_0x552a9e+'px',_0x23686b[_0xa39180(0x316)][_0xa39180(0x48d)]=_0x1b38bb+'px';},VisuMZ[_0x55d321(0x886)]['Bitmap_initialize']=Bitmap['prototype'][_0x55d321(0x4a1)],Bitmap[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(_0x5af89b,_0x590078){const _0x3058cc=_0x55d321;VisuMZ[_0x3058cc(0x886)][_0x3058cc(0x200)][_0x3058cc(0x2b5)](this,_0x5af89b,_0x590078),this[_0x3058cc(0x418)]=!(VisuMZ[_0x3058cc(0x886)][_0x3058cc(0x530)]['QoL']['PixelateImageRendering']??!![]);},Bitmap[_0x55d321(0x2a8)][_0x55d321(0x5f9)]=function(){const _0x2db989=_0x55d321;this[_0x2db989(0x719)]=!![];},VisuMZ[_0x55d321(0x886)]['Sprite_destroy']=Sprite[_0x55d321(0x2a8)][_0x55d321(0x883)],Sprite[_0x55d321(0x2a8)]['destroy']=function(){const _0x3c278e=_0x55d321;if(this[_0x3c278e(0x2ad)])VisuMZ['CoreEngine']['Sprite_destroy'][_0x3c278e(0x2b5)](this);this[_0x3c278e(0x435)]();},Sprite[_0x55d321(0x2a8)][_0x55d321(0x435)]=function(){const _0x20b0e5=_0x55d321;if(!this[_0x20b0e5(0x5de)])return;if(!this[_0x20b0e5(0x5de)][_0x20b0e5(0x719)])return;this['bitmap']['_baseTexture']&&!this['_bitmap'][_0x20b0e5(0x1ce)][_0x20b0e5(0x835)]&&this[_0x20b0e5(0x5de)][_0x20b0e5(0x883)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x1b2)]=Bitmap[_0x55d321(0x2a8)]['resize'],Bitmap['prototype'][_0x55d321(0x4f1)]=function(_0x542cc0,_0x29916d){const _0x339375=_0x55d321;VisuMZ['CoreEngine'][_0x339375(0x1b2)]['call'](this,_0x542cc0,_0x29916d),this[_0x339375(0x5f9)]();},VisuMZ[_0x55d321(0x886)]['Bitmap_blt']=Bitmap[_0x55d321(0x2a8)]['blt'],Bitmap[_0x55d321(0x2a8)]['blt']=function(_0x39747b,_0x1445b9,_0x1808ca,_0x263acc,_0x3c341a,_0x77037e,_0xa265db,_0x585f63,_0x2def85){const _0x8e526e=_0x55d321;_0x1445b9=Math['round'](_0x1445b9),_0x1808ca=Math['round'](_0x1808ca),_0x263acc=Math[_0x8e526e(0x69f)](_0x263acc),_0x3c341a=Math['round'](_0x3c341a),_0x77037e=Math['round'](_0x77037e),_0xa265db=Math[_0x8e526e(0x69f)](_0xa265db),VisuMZ['CoreEngine'][_0x8e526e(0x48c)]['call'](this,_0x39747b,_0x1445b9,_0x1808ca,_0x263acc,_0x3c341a,_0x77037e,_0xa265db,_0x585f63,_0x2def85),this[_0x8e526e(0x5f9)]();},VisuMZ[_0x55d321(0x886)]['Bitmap_clearRect']=Bitmap['prototype'][_0x55d321(0x1e5)],Bitmap[_0x55d321(0x2a8)][_0x55d321(0x1e5)]=function(_0x1c9380,_0x2f8089,_0x57f650,_0x555198){const _0x43d92c=_0x55d321;VisuMZ[_0x43d92c(0x886)][_0x43d92c(0x4b1)]['call'](this,_0x1c9380,_0x2f8089,_0x57f650,_0x555198),this['markCoreEngineModified']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x25c)]=Bitmap[_0x55d321(0x2a8)]['fillRect'],Bitmap[_0x55d321(0x2a8)][_0x55d321(0x3d1)]=function(_0x702f8c,_0x4cc558,_0x54fbe9,_0x3e7ac4,_0x39cfca){const _0x24d363=_0x55d321;VisuMZ['CoreEngine']['Bitmap_fillRect'][_0x24d363(0x2b5)](this,_0x702f8c,_0x4cc558,_0x54fbe9,_0x3e7ac4,_0x39cfca),this['markCoreEngineModified']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x564)]=Bitmap[_0x55d321(0x2a8)][_0x55d321(0x6fe)],Bitmap['prototype'][_0x55d321(0x6fe)]=function(_0x44ef8d,_0x409bdf,_0x26b974,_0x3aef2c,_0x2e2848){const _0x563a7a=_0x55d321;VisuMZ[_0x563a7a(0x886)][_0x563a7a(0x564)][_0x563a7a(0x2b5)](this,_0x44ef8d,_0x409bdf,_0x26b974,_0x3aef2c,_0x2e2848),this[_0x563a7a(0x5f9)]();},VisuMZ['CoreEngine'][_0x55d321(0x77c)]=Bitmap['prototype'][_0x55d321(0x3ff)],Bitmap['prototype'][_0x55d321(0x3ff)]=function(_0xcb44b7,_0x5a24d2,_0x33bbf0,_0x3b6992,_0x8e8299,_0x3e4e97,_0x1b6d16){const _0x152657=_0x55d321;VisuMZ['CoreEngine']['Bitmap_gradientFillRect'][_0x152657(0x2b5)](this,_0xcb44b7,_0x5a24d2,_0x33bbf0,_0x3b6992,_0x8e8299,_0x3e4e97,_0x1b6d16),this['markCoreEngineModified']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x76d)]=Bitmap['prototype'][_0x55d321(0x28a)],Bitmap['prototype'][_0x55d321(0x28a)]=function(_0x1db907,_0x21cfeb,_0x40f305,_0x86a1ca){const _0x3b1568=_0x55d321;_0x1db907=Math[_0x3b1568(0x69f)](_0x1db907),_0x21cfeb=Math['round'](_0x21cfeb),_0x40f305=Math['round'](_0x40f305),VisuMZ[_0x3b1568(0x886)][_0x3b1568(0x76d)][_0x3b1568(0x2b5)](this,_0x1db907,_0x21cfeb,_0x40f305,_0x86a1ca),this[_0x3b1568(0x5f9)]();},VisuMZ['CoreEngine'][_0x55d321(0x1d6)]=Bitmap[_0x55d321(0x2a8)][_0x55d321(0x331)],Bitmap[_0x55d321(0x2a8)][_0x55d321(0x331)]=function(_0x24499a){const _0x4928d6=_0x55d321;return Math[_0x4928d6(0x74b)](VisuMZ[_0x4928d6(0x886)][_0x4928d6(0x1d6)][_0x4928d6(0x2b5)](this,_0x24499a));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x91c)]=Bitmap[_0x55d321(0x2a8)][_0x55d321(0x4bd)],Bitmap[_0x55d321(0x2a8)][_0x55d321(0x4bd)]=function(_0x56c488,_0x209180,_0x1f91bc,_0x4570a1,_0x51b745,_0x5f29cf){const _0x44ddcb=_0x55d321;_0x209180=Math[_0x44ddcb(0x69f)](_0x209180),_0x1f91bc=Math[_0x44ddcb(0x69f)](_0x1f91bc),_0x4570a1=Math[_0x44ddcb(0x74b)](_0x4570a1),_0x51b745=Math[_0x44ddcb(0x74b)](_0x51b745),VisuMZ[_0x44ddcb(0x886)][_0x44ddcb(0x91c)][_0x44ddcb(0x2b5)](this,_0x56c488,_0x209180,_0x1f91bc,_0x4570a1,_0x51b745,_0x5f29cf),this[_0x44ddcb(0x5f9)]();},VisuMZ['CoreEngine'][_0x55d321(0x3ca)]=Bitmap['prototype']['_drawTextOutline'],Bitmap[_0x55d321(0x2a8)]['_drawTextOutline']=function(_0x5c46d7,_0x10fe78,_0x1e7f47,_0x3f5a96){const _0x295bc2=_0x55d321;VisuMZ[_0x295bc2(0x886)]['Settings'][_0x295bc2(0x6f5)][_0x295bc2(0x15e)]?this[_0x295bc2(0x438)](_0x5c46d7,_0x10fe78,_0x1e7f47,_0x3f5a96):VisuMZ[_0x295bc2(0x886)][_0x295bc2(0x3ca)][_0x295bc2(0x2b5)](this,_0x5c46d7,_0x10fe78,_0x1e7f47,_0x3f5a96);},Bitmap[_0x55d321(0x2a8)]['_drawTextShadow']=function(_0x1f01a0,_0x47e096,_0x4957cf,_0x4bd8fe){const _0x4c0127=_0x55d321,_0x3b6241=this[_0x4c0127(0x831)];_0x3b6241[_0x4c0127(0x357)]=this['outlineColor'],_0x3b6241[_0x4c0127(0x166)](_0x1f01a0,_0x47e096+0x2,_0x4957cf+0x2,_0x4bd8fe);},VisuMZ['CoreEngine'][_0x55d321(0x6e0)]=Input[_0x55d321(0x75d)],Input['clear']=function(){const _0x3f0c21=_0x55d321;VisuMZ[_0x3f0c21(0x886)][_0x3f0c21(0x6e0)][_0x3f0c21(0x2b5)](this),this['_inputString']=undefined,this[_0x3f0c21(0x774)]=undefined,this[_0x3f0c21(0x6b4)]=Input[_0x3f0c21(0x401)];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x25a)]=Input[_0x55d321(0x264)],Input[_0x55d321(0x264)]=function(){const _0x3188b2=_0x55d321;VisuMZ[_0x3188b2(0x886)][_0x3188b2(0x25a)][_0x3188b2(0x2b5)](this);if(this[_0x3188b2(0x6b4)])this[_0x3188b2(0x6b4)]--;},VisuMZ[_0x55d321(0x886)]['Input_pollGamepads']=Input[_0x55d321(0x19b)],Input['_pollGamepads']=function(){const _0x1da549=_0x55d321;if(this[_0x1da549(0x6b4)])return;VisuMZ[_0x1da549(0x886)][_0x1da549(0x771)][_0x1da549(0x2b5)](this);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x63d)]=Input[_0x55d321(0x461)],Input['_setupEventHandlers']=function(){const _0x26783f=_0x55d321;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x26783f(0x2b5)](this),document['addEventListener']('keypress',this[_0x26783f(0x519)][_0x26783f(0x88a)](this));},VisuMZ[_0x55d321(0x886)]['Input_onKeyDown']=Input['_onKeyDown'],Input[_0x55d321(0x6c0)]=function(_0x6d2030){const _0x2c3027=_0x55d321;this['_inputSpecialKeyCode']=_0x6d2030[_0x2c3027(0x767)],VisuMZ[_0x2c3027(0x886)]['Input_onKeyDown'][_0x2c3027(0x2b5)](this,_0x6d2030),this[_0x2c3027(0x5c1)](null);},Input[_0x55d321(0x519)]=function(_0x1570c9){const _0x159855=_0x55d321;this[_0x159855(0x75c)](_0x1570c9);},Input['_registerKeyInput']=function(_0x3f4751){const _0x358d2e=_0x55d321;this['_inputSpecialKeyCode']=_0x3f4751[_0x358d2e(0x767)];let _0x44728c=String[_0x358d2e(0x491)](_0x3f4751[_0x358d2e(0x8d0)]);this[_0x358d2e(0x929)]===undefined?this[_0x358d2e(0x929)]=_0x44728c:this[_0x358d2e(0x929)]+=_0x44728c;},VisuMZ[_0x55d321(0x886)]['Input_shouldPreventDefault']=Input[_0x55d321(0x4e1)],Input['_shouldPreventDefault']=function(_0x5c8eb2){const _0x5a1df0=_0x55d321;if(_0x5c8eb2===0x8)return![];return VisuMZ[_0x5a1df0(0x886)][_0x5a1df0(0x39f)]['call'](this,_0x5c8eb2);},Input[_0x55d321(0x907)]=function(_0x270461){const _0x4d5a93=_0x55d321;if(_0x270461['match'](/backspace/i))return this[_0x4d5a93(0x774)]===0x8;if(_0x270461[_0x4d5a93(0x362)](/enter/i))return this[_0x4d5a93(0x774)]===0xd;if(_0x270461[_0x4d5a93(0x362)](/escape/i))return this[_0x4d5a93(0x774)]===0x1b;},Input[_0x55d321(0x7d7)]=function(){const _0xd12dd1=_0x55d321;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0xd12dd1(0x774)]);},Input['isArrowPressed']=function(){const _0x30c665=_0x55d321;return[0x25,0x26,0x27,0x28][_0x30c665(0x686)](this['_inputSpecialKeyCode']);},Input['isGamepadConnected']=function(){const _0x166b10=_0x55d321;if(navigator[_0x166b10(0x945)]){const _0x28ebe3=navigator[_0x166b10(0x945)]();if(_0x28ebe3)for(const _0x346e19 of _0x28ebe3){if(_0x346e19&&_0x346e19['connected'])return!![];}}return![];},Input[_0x55d321(0x302)]=function(){const _0x4e3abf=_0x55d321;if(navigator['getGamepads']){const _0x3f3885=navigator[_0x4e3abf(0x945)]();if(_0x3f3885)for(const _0x1eb580 of _0x3f3885){if(_0x1eb580&&_0x1eb580[_0x4e3abf(0x3fc)]){if(this['isGamepadButtonPressed'](_0x1eb580))return!![];if(this['isGamepadAxisMoved'](_0x1eb580))return!![];}}}return![];},Input[_0x55d321(0x24d)]=function(_0x397d99){const _0xbd796b=_0x55d321,_0x14f9af=_0x397d99[_0xbd796b(0x413)];for(let _0x385dcd=0x0;_0x385dcd<_0x14f9af[_0xbd796b(0x7e5)];_0x385dcd++){if(_0x14f9af[_0x385dcd][_0xbd796b(0x927)])return!![];}return![];},Input[_0x55d321(0x795)]=function(_0xa9bf28){const _0x3a5c10=_0x55d321,_0xaf5f5b=_0xa9bf28[_0x3a5c10(0x6b2)],_0x4bb806=0.5;if(_0xaf5f5b[0x0]<-_0x4bb806)return!![];if(_0xaf5f5b[0x0]>_0x4bb806)return!![];if(_0xaf5f5b[0x1]<-_0x4bb806)return!![];if(_0xaf5f5b[0x1]>_0x4bb806)return!![];return![];},Input[_0x55d321(0x8f3)]=function(){const _0x392c7b=_0x55d321;return this[_0x392c7b(0x5df)]||null;},Input[_0x55d321(0x5c1)]=function(_0x48facf){const _0x5db67a=_0x55d321;this[_0x5db67a(0x5df)]=_0x48facf;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x77a)]=Input[_0x55d321(0x416)],Input['_updateGamepadState']=function(_0xcb7261){const _0x24dbe2=_0x55d321;VisuMZ['CoreEngine'][_0x24dbe2(0x77a)][_0x24dbe2(0x2b5)](this,_0xcb7261),(this['isGamepadButtonPressed'](_0xcb7261)||this['isGamepadAxisMoved'](_0xcb7261))&&this['setLastGamepadUsed'](_0xcb7261);},Input['getLastUsedGamepadType']=function(){const _0x4f5ca9=_0x55d321;return this['_lastGamepad']?this['_lastGamepad']['id']:_0x4f5ca9(0x737);},VisuMZ['CoreEngine']['Tilemap_addShadow']=Tilemap[_0x55d321(0x2a8)][_0x55d321(0x716)],Tilemap[_0x55d321(0x2a8)]['_addShadow']=function(_0x5aaeea,_0x133efe,_0x2c3e4c,_0x2adbf1){const _0x30bc10=_0x55d321;if($gameMap&&$gameMap[_0x30bc10(0x781)]())return;VisuMZ['CoreEngine']['Tilemap_addShadow'][_0x30bc10(0x2b5)](this,_0x5aaeea,_0x133efe,_0x2c3e4c,_0x2adbf1);},Tilemap['Renderer'][_0x55d321(0x2a8)][_0x55d321(0x2ce)]=function(){const _0xb1f9fa=_0x55d321;this[_0xb1f9fa(0x74a)]();for(let _0x32d5ac=0x0;_0x32d5ac<Tilemap[_0xb1f9fa(0x27a)][_0xb1f9fa(0x176)];_0x32d5ac++){const _0x1841e2=new PIXI[(_0xb1f9fa(0x7f9))]();_0x1841e2[_0xb1f9fa(0x1ab)](0x800,0x800),VisuMZ['CoreEngine']['Settings'][_0xb1f9fa(0x6f5)][_0xb1f9fa(0x2f8)]&&(_0x1841e2['scaleMode']=PIXI[_0xb1f9fa(0x689)][_0xb1f9fa(0x21b)]),this[_0xb1f9fa(0x8be)][_0xb1f9fa(0x582)](_0x1841e2);}},WindowLayer[_0x55d321(0x2a8)][_0x55d321(0x550)]=function(){const _0x443b20=_0x55d321;return SceneManager&&SceneManager[_0x443b20(0x43e)]?SceneManager[_0x443b20(0x43e)][_0x443b20(0x466)]():!![];},VisuMZ[_0x55d321(0x886)]['WindowLayer_render']=WindowLayer[_0x55d321(0x2a8)]['render'],WindowLayer[_0x55d321(0x2a8)][_0x55d321(0x8e4)]=function render(_0x1dc63c){const _0x4498f8=_0x55d321;this[_0x4498f8(0x550)]()?VisuMZ[_0x4498f8(0x886)][_0x4498f8(0x933)]['call'](this,_0x1dc63c):this['renderNoMask'](_0x1dc63c);},WindowLayer[_0x55d321(0x2a8)][_0x55d321(0x44f)]=function render(_0x4077d3){const _0x4ef409=_0x55d321;if(!this[_0x4ef409(0x382)])return;const _0x380b99=new PIXI['Graphics'](),_0x244d5a=_0x4077d3['gl'],_0x3c657d=this[_0x4ef409(0x843)][_0x4ef409(0x60c)]();_0x4077d3[_0x4ef409(0x1b6)][_0x4ef409(0x288)](),_0x380b99[_0x4ef409(0x3c1)]=this[_0x4ef409(0x3c1)],_0x4077d3[_0x4ef409(0x240)][_0x4ef409(0x17d)](),_0x244d5a[_0x4ef409(0x1ae)](_0x244d5a[_0x4ef409(0x48b)]);while(_0x3c657d[_0x4ef409(0x7e5)]>0x0){const _0x503bda=_0x3c657d[_0x4ef409(0x298)]();_0x503bda[_0x4ef409(0x560)]&&_0x503bda[_0x4ef409(0x382)]&&_0x503bda[_0x4ef409(0x6bd)]>0x0&&(_0x244d5a[_0x4ef409(0x608)](_0x244d5a[_0x4ef409(0x300)],0x0,~0x0),_0x244d5a[_0x4ef409(0x467)](_0x244d5a['KEEP'],_0x244d5a['KEEP'],_0x244d5a[_0x4ef409(0x92f)]),_0x503bda[_0x4ef409(0x8e4)](_0x4077d3),_0x4077d3['batch']['flush'](),_0x380b99['clear'](),_0x244d5a['stencilFunc'](_0x244d5a[_0x4ef409(0x830)],0x1,~0x0),_0x244d5a[_0x4ef409(0x467)](_0x244d5a[_0x4ef409(0x3f9)],_0x244d5a[_0x4ef409(0x3f9)],_0x244d5a[_0x4ef409(0x3f9)]),_0x244d5a['blendFunc'](_0x244d5a[_0x4ef409(0x3b4)],_0x244d5a[_0x4ef409(0x672)]),_0x380b99[_0x4ef409(0x8e4)](_0x4077d3),_0x4077d3[_0x4ef409(0x240)][_0x4ef409(0x17d)](),_0x244d5a[_0x4ef409(0x37f)](_0x244d5a[_0x4ef409(0x672)],_0x244d5a[_0x4ef409(0x6ef)]));}_0x244d5a[_0x4ef409(0x744)](_0x244d5a['STENCIL_TEST']),_0x244d5a['clear'](_0x244d5a[_0x4ef409(0x193)]),_0x244d5a[_0x4ef409(0x922)](0x0),_0x4077d3[_0x4ef409(0x240)][_0x4ef409(0x17d)]();for(const _0x110e52 of this[_0x4ef409(0x843)]){!_0x110e52[_0x4ef409(0x560)]&&_0x110e52['visible']&&_0x110e52['render'](_0x4077d3);}_0x4077d3[_0x4ef409(0x240)][_0x4ef409(0x17d)]();},DataManager[_0x55d321(0x2d4)]=function(_0x4f5a61){const _0x133af0=_0x55d321;return this[_0x133af0(0x29f)](_0x4f5a61)&&_0x4f5a61[_0x133af0(0x8f8)]===0x2;},VisuMZ[_0x55d321(0x886)]['DataManager_setupNewGame']=DataManager[_0x55d321(0x3be)],DataManager[_0x55d321(0x3be)]=function(){const _0x5cc771=_0x55d321;VisuMZ[_0x5cc771(0x886)][_0x5cc771(0x4aa)]['call'](this),this[_0x5cc771(0x2e4)](),this[_0x5cc771(0x1a8)]();},DataManager[_0x55d321(0x2e4)]=function(){const _0x584efe=_0x55d321;if($gameTemp[_0x584efe(0x25f)]()){const _0x5577cd=VisuMZ['CoreEngine'][_0x584efe(0x530)]['QoL'][_0x584efe(0x543)];if(_0x5577cd>0x0)$gameTemp[_0x584efe(0x724)](_0x5577cd);}},DataManager[_0x55d321(0x1a8)]=function(){const _0x56310c=_0x55d321,_0x5e3e08=VisuMZ[_0x56310c(0x886)]['Settings'][_0x56310c(0x6f5)]['NewGameCommonEventAll']||0x0;if(_0x5e3e08>0x0)$gameTemp[_0x56310c(0x724)](_0x5e3e08);},DataManager[_0x55d321(0x5fe)]=function(_0x4e1646){const _0x5853d5=_0x55d321,_0x11e466=$dataTroops[_0x4e1646];if(!_0x11e466)return'';let _0x4d5764='';_0x4d5764+=_0x11e466[_0x5853d5(0x7c4)];for(const _0x26ba00 of _0x11e466[_0x5853d5(0x303)]){for(const _0x16ea75 of _0x26ba00[_0x5853d5(0x8a4)]){[0x6c,0x198][_0x5853d5(0x1bb)](_0x16ea75[_0x5853d5(0x699)])&&(_0x4d5764+='\x0a',_0x4d5764+=_0x16ea75[_0x5853d5(0x5af)][0x0]);}}return _0x4d5764;};function _0xcf9c(_0x4db9d9,_0x203433){const _0x50009b=_0x5000();return _0xcf9c=function(_0xcf9cd6,_0x132ba7){_0xcf9cd6=_0xcf9cd6-0x141;let _0x368f2c=_0x50009b[_0xcf9cd6];return _0x368f2c;},_0xcf9c(_0x4db9d9,_0x203433);}(VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x6f5)][_0x55d321(0x4ae)]??!![])&&($scene=null,VisuMZ[_0x55d321(0x886)]['Scene_Base_create']=Scene_Base['prototype']['create'],Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0x365a05=_0x55d321;VisuMZ[_0x365a05(0x886)][_0x365a05(0x385)][_0x365a05(0x2b5)](this),$scene=this;},$spriteset=null,VisuMZ['CoreEngine'][_0x55d321(0x22a)]=Scene_Map['prototype']['createSpriteset'],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x404)]=function(){const _0x24b6d5=_0x55d321;VisuMZ[_0x24b6d5(0x886)]['Scene_Map_createSpriteset']['call'](this),$spriteset=this[_0x24b6d5(0x64d)];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x638)]=Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x404)],Scene_Battle['prototype'][_0x55d321(0x404)]=function(){const _0x3ce8fe=_0x55d321;VisuMZ[_0x3ce8fe(0x886)][_0x3ce8fe(0x638)][_0x3ce8fe(0x2b5)](this),$spriteset=this[_0x3ce8fe(0x64d)];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x230)]=Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x7b9)],Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x7b9)]=function(){const _0x42a350=_0x55d321;VisuMZ[_0x42a350(0x886)][_0x42a350(0x230)][_0x42a350(0x2b5)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x55d321(0x886)][_0x55d321(0x174)]=BattleManager[_0x55d321(0x264)],BattleManager[_0x55d321(0x264)]=function(_0x427736){const _0x355744=_0x55d321;VisuMZ[_0x355744(0x886)]['BattleManager_update']['call'](this,_0x427736),this[_0x355744(0x6b1)]();},BattleManager[_0x55d321(0x6b1)]=function(){const _0x203a3a=_0x55d321;$subject=this[_0x203a3a(0x7ae)],$targets=this[_0x203a3a(0x84e)],$target=this[_0x203a3a(0x668)]||this[_0x203a3a(0x84e)][0x0];},$event=null,VisuMZ[_0x55d321(0x886)]['Game_Event_start']=Game_Event['prototype'][_0x55d321(0x7b6)],Game_Event[_0x55d321(0x2a8)][_0x55d321(0x7b6)]=function(){const _0x1ce91c=_0x55d321;VisuMZ[_0x1ce91c(0x886)]['Game_Event_start'][_0x1ce91c(0x2b5)](this),$event=this;},VisuMZ[_0x55d321(0x886)]['Scene_Map_update']=Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x264)],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x264)]=function(){const _0x5e855b=_0x55d321;VisuMZ[_0x5e855b(0x886)]['Scene_Map_update'][_0x5e855b(0x2b5)](this),$gameMap[_0x5e855b(0x4d6)]();},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x4d6)]=function(){const _0x10ec41=_0x55d321;!this[_0x10ec41(0x617)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x121645){const _0x1f53f6=_0x55d321;if($gameTemp)$gameTemp[_0x1f53f6(0x724)](_0x121645);});;$onceParallel=function(_0x5a6738,_0x373ef4){const _0x48776d=_0x55d321;if(SceneManager[_0x48776d(0x4f8)]())SceneManager[_0x48776d(0x43e)][_0x48776d(0x8c4)](_0x5a6738,_0x373ef4);else{if(SceneManager[_0x48776d(0x5d9)]()){if(Imported[_0x48776d(0x8f4)])SceneManager[_0x48776d(0x43e)][_0x48776d(0x8c4)](_0x5a6738);else $gameTemp&&$gameTemp[_0x48776d(0x25f)]()&&alert(_0x48776d(0x317));}else $gameTemp&&$gameTemp[_0x48776d(0x25f)]()&&alert(_0x48776d(0x358));}},StorageManager[_0x55d321(0x361)]=function(_0x40cdb4){return new Promise((_0x1d9fcc,_0x244bde)=>{const _0x51d6ad=_0xcf9c;try{const _0x64f247=pako['deflate'](_0x40cdb4,{'to':'string','level':0x1});if(_0x64f247[_0x51d6ad(0x7e5)]>=0xc350){}_0x1d9fcc(_0x64f247);}catch(_0x1d1fd2){_0x244bde(_0x1d1fd2);}});},TextManager[_0x55d321(0x48a)]=['','','','CANCEL','','',_0x55d321(0x379),'','BACKSPACE',_0x55d321(0x880),'','',_0x55d321(0x89d),'ENTER','ENTER_SPECIAL','',_0x55d321(0x755),'CTRL',_0x55d321(0x360),_0x55d321(0x2b1),_0x55d321(0x811),_0x55d321(0x7a0),_0x55d321(0x6f9),_0x55d321(0x412),_0x55d321(0x2ba),_0x55d321(0x8e6),'','ESC','CONVERT',_0x55d321(0x500),_0x55d321(0x62e),_0x55d321(0x793),'SPACE',_0x55d321(0x4b0),_0x55d321(0x1f1),_0x55d321(0x88c),_0x55d321(0x219),'LEFT','UP',_0x55d321(0x30b),_0x55d321(0x939),_0x55d321(0x3d3),'PRINT',_0x55d321(0x731),_0x55d321(0x7db),_0x55d321(0x879),_0x55d321(0x21f),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x55d321(0x76e),_0x55d321(0x730),_0x55d321(0x151),_0x55d321(0x4d8),_0x55d321(0x211),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x55d321(0x89f),'','CONTEXT_MENU','',_0x55d321(0x279),_0x55d321(0x729),_0x55d321(0x6fc),_0x55d321(0x15c),_0x55d321(0x904),_0x55d321(0x867),_0x55d321(0x19e),_0x55d321(0x3f7),_0x55d321(0x30c),_0x55d321(0x5d5),_0x55d321(0x4b5),_0x55d321(0x71b),_0x55d321(0x78c),_0x55d321(0x552),_0x55d321(0x499),_0x55d321(0x4ad),_0x55d321(0x5ec),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x55d321(0x1d2),_0x55d321(0x785),_0x55d321(0x715),_0x55d321(0x284),_0x55d321(0x2af),_0x55d321(0x3af),_0x55d321(0x3aa),_0x55d321(0x447),_0x55d321(0x846),_0x55d321(0x88b),_0x55d321(0x55f),'F21','F22','F23','F24','','','','','','','','',_0x55d321(0x553),_0x55d321(0x8ba),_0x55d321(0x446),_0x55d321(0x612),_0x55d321(0x3de),_0x55d321(0x223),_0x55d321(0x1db),'','','','','','','','','',_0x55d321(0x36b),_0x55d321(0x4d5),_0x55d321(0x4e2),_0x55d321(0x83f),_0x55d321(0x1c4),_0x55d321(0x471),_0x55d321(0x717),_0x55d321(0x391),_0x55d321(0x38d),_0x55d321(0x3d2),_0x55d321(0x902),_0x55d321(0x6df),'PIPE','HYPHEN_MINUS',_0x55d321(0x683),_0x55d321(0x2be),_0x55d321(0x5ab),'','','','',_0x55d321(0x72d),_0x55d321(0x5f7),'VOLUME_UP','','',_0x55d321(0x76e),_0x55d321(0x151),_0x55d321(0x355),_0x55d321(0x161),_0x55d321(0x417),_0x55d321(0x23e),_0x55d321(0x775),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x55d321(0x50b),_0x55d321(0x2bb),'CLOSE_BRACKET',_0x55d321(0x493),'',_0x55d321(0x20b),_0x55d321(0x753),'',_0x55d321(0x799),'WIN_ICO_00','',_0x55d321(0x8f7),'','',_0x55d321(0x913),'WIN_OEM_JUMP','WIN_OEM_PA1',_0x55d321(0x697),'WIN_OEM_PA3',_0x55d321(0x75f),'WIN_OEM_CUSEL','WIN_OEM_ATTN',_0x55d321(0x55a),'WIN_OEM_COPY',_0x55d321(0x7d5),_0x55d321(0x6d6),_0x55d321(0x2f3),_0x55d321(0x5b7),'CRSEL',_0x55d321(0x542),_0x55d321(0x80c),_0x55d321(0x713),_0x55d321(0x206),'',_0x55d321(0x23a),_0x55d321(0x32d),''],TextManager[_0x55d321(0x937)]=VisuMZ['CoreEngine']['Settings'][_0x55d321(0x56f)][_0x55d321(0x266)],TextManager[_0x55d321(0x600)]=VisuMZ['CoreEngine']['Settings'][_0x55d321(0x56f)][_0x55d321(0x5d8)],TextManager['buttonAssistSwitch']=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x56f)][_0x55d321(0x700)],VisuMZ[_0x55d321(0x886)]['TextManager_param']=TextManager[_0x55d321(0x652)],TextManager[_0x55d321(0x652)]=function(_0x1d2254){const _0x543753=_0x55d321;return typeof _0x1d2254===_0x543753(0x15b)?VisuMZ[_0x543753(0x886)][_0x543753(0x168)][_0x543753(0x2b5)](this,_0x1d2254):this[_0x543753(0x5f2)](_0x1d2254);},TextManager['paramName']=function(_0x2c12ea){const _0x4be1a2=_0x55d321;_0x2c12ea=String(_0x2c12ea||'')['toUpperCase']();const _0x257956=VisuMZ[_0x4be1a2(0x886)]['Settings']['Param'];if(_0x2c12ea===_0x4be1a2(0x8aa))return $dataSystem['terms'][_0x4be1a2(0x2bf)][0x0];if(_0x2c12ea===_0x4be1a2(0x674))return $dataSystem[_0x4be1a2(0x68f)][_0x4be1a2(0x2bf)][0x1];if(_0x2c12ea===_0x4be1a2(0x3ad))return $dataSystem[_0x4be1a2(0x68f)][_0x4be1a2(0x2bf)][0x2];if(_0x2c12ea==='DEF')return $dataSystem[_0x4be1a2(0x68f)]['params'][0x3];if(_0x2c12ea===_0x4be1a2(0x840))return $dataSystem[_0x4be1a2(0x68f)][_0x4be1a2(0x2bf)][0x4];if(_0x2c12ea===_0x4be1a2(0x236))return $dataSystem[_0x4be1a2(0x68f)][_0x4be1a2(0x2bf)][0x5];if(_0x2c12ea===_0x4be1a2(0x343))return $dataSystem[_0x4be1a2(0x68f)]['params'][0x6];if(_0x2c12ea===_0x4be1a2(0x3cb))return $dataSystem['terms']['params'][0x7];if(_0x2c12ea===_0x4be1a2(0x592))return _0x257956[_0x4be1a2(0x78f)];if(_0x2c12ea===_0x4be1a2(0x260))return _0x257956[_0x4be1a2(0x8c1)];if(_0x2c12ea==='CRI')return _0x257956[_0x4be1a2(0x5ac)];if(_0x2c12ea==='CEV')return _0x257956[_0x4be1a2(0x681)];if(_0x2c12ea===_0x4be1a2(0x141))return _0x257956[_0x4be1a2(0x66a)];if(_0x2c12ea===_0x4be1a2(0x1a2))return _0x257956[_0x4be1a2(0x186)];if(_0x2c12ea===_0x4be1a2(0x682))return _0x257956[_0x4be1a2(0x848)];if(_0x2c12ea===_0x4be1a2(0x26a))return _0x257956[_0x4be1a2(0x3d4)];if(_0x2c12ea===_0x4be1a2(0x194))return _0x257956[_0x4be1a2(0x7bc)];if(_0x2c12ea==='TRG')return _0x257956[_0x4be1a2(0x845)];if(_0x2c12ea===_0x4be1a2(0x34d))return _0x257956[_0x4be1a2(0x889)];if(_0x2c12ea==='GRD')return _0x257956['SParamVocab1'];if(_0x2c12ea===_0x4be1a2(0x52b))return _0x257956[_0x4be1a2(0x5bd)];if(_0x2c12ea===_0x4be1a2(0x5b8))return _0x257956[_0x4be1a2(0x4d1)];if(_0x2c12ea==='MCR')return _0x257956['SParamVocab4'];if(_0x2c12ea===_0x4be1a2(0x333))return _0x257956[_0x4be1a2(0x2eb)];if(_0x2c12ea===_0x4be1a2(0x941))return _0x257956[_0x4be1a2(0x91f)];if(_0x2c12ea===_0x4be1a2(0x27d))return _0x257956[_0x4be1a2(0x2ab)];if(_0x2c12ea===_0x4be1a2(0x6c9))return _0x257956[_0x4be1a2(0x8b5)];if(_0x2c12ea===_0x4be1a2(0x328))return _0x257956[_0x4be1a2(0x53a)];if(VisuMZ[_0x4be1a2(0x886)][_0x4be1a2(0x2ec)][_0x2c12ea])return VisuMZ[_0x4be1a2(0x886)][_0x4be1a2(0x2ec)][_0x2c12ea];return'';},TextManager[_0x55d321(0x468)]=function(_0x2df47e){const _0x57e11e=_0x55d321,_0x1652fd=Input[_0x57e11e(0x8ae)]();return _0x1652fd==='Keyboard'?this[_0x57e11e(0x857)](_0x2df47e):this[_0x57e11e(0x15a)](_0x1652fd,_0x2df47e);},TextManager['getKeyboardInputButtonString']=function(_0x5523d2){const _0x10cf34=_0x55d321;let _0x480fca=VisuMZ[_0x10cf34(0x886)][_0x10cf34(0x530)]['ButtonAssist']['SplitEscape'];if(!_0x480fca){if(_0x5523d2===_0x10cf34(0x1ff))_0x5523d2=_0x10cf34(0x39a);if(_0x5523d2===_0x10cf34(0x46c))_0x5523d2='escape';}let _0x4d7662=[];for(let _0x3fcaee in Input[_0x10cf34(0x6f0)]){_0x3fcaee=Number(_0x3fcaee);if(_0x3fcaee>=0x60&&_0x3fcaee<=0x69)continue;if([0x12,0x20]['includes'](_0x3fcaee))continue;_0x5523d2===Input[_0x10cf34(0x6f0)][_0x3fcaee]&&_0x4d7662[_0x10cf34(0x582)](_0x3fcaee);}for(let _0x3e91eb=0x0;_0x3e91eb<_0x4d7662['length'];_0x3e91eb++){_0x4d7662[_0x3e91eb]=TextManager[_0x10cf34(0x48a)][_0x4d7662[_0x3e91eb]];}return this['makeInputButtonString'](_0x4d7662);},TextManager[_0x55d321(0x74d)]=function(_0x380762){const _0x3fe16e=_0x55d321,_0x487b88=VisuMZ[_0x3fe16e(0x886)][_0x3fe16e(0x530)][_0x3fe16e(0x56f)],_0x51ceaa=_0x487b88['KeyUnlisted'];let _0x5177f1='';if(_0x380762[_0x3fe16e(0x1bb)]('UP'))_0x5177f1='UP';else{if(_0x380762[_0x3fe16e(0x1bb)](_0x3fe16e(0x939)))_0x5177f1=_0x3fe16e(0x939);else{if(_0x380762[_0x3fe16e(0x1bb)]('LEFT'))_0x5177f1=_0x3fe16e(0x6ad);else _0x380762[_0x3fe16e(0x1bb)](_0x3fe16e(0x30b))?_0x5177f1=_0x3fe16e(0x30b):_0x5177f1=_0x380762[_0x3fe16e(0x487)]();}}const _0x11467a=_0x3fe16e(0x1de)[_0x3fe16e(0x4a5)](_0x5177f1);return _0x487b88[_0x11467a]?_0x487b88[_0x11467a]:_0x51ceaa[_0x3fe16e(0x4a5)](_0x5177f1);},TextManager[_0x55d321(0x6af)]=function(_0x1b1157,_0x383176){const _0x50c08d=_0x55d321,_0x51e3c4=VisuMZ[_0x50c08d(0x886)][_0x50c08d(0x530)][_0x50c08d(0x56f)],_0x31f38c=_0x51e3c4[_0x50c08d(0x1f5)],_0x164c73=this[_0x50c08d(0x468)](_0x1b1157),_0x15653b=this[_0x50c08d(0x468)](_0x383176);return _0x31f38c[_0x50c08d(0x4a5)](_0x164c73,_0x15653b);},TextManager[_0x55d321(0x15a)]=function(_0x43014c,_0x1a73ed){const _0x5ac463=_0x55d321,_0x4af55a=_0x43014c[_0x5ac463(0x7ec)]()[_0x5ac463(0x214)](),_0x58ebdb=VisuMZ['CoreEngine'][_0x5ac463(0x798)][_0x4af55a];if(!_0x58ebdb)return this[_0x5ac463(0x3e2)](_0x43014c,_0x1a73ed);return _0x58ebdb[_0x1a73ed]||this[_0x5ac463(0x857)](_0x43014c,_0x1a73ed);},TextManager['getControllerInputButtonMatch']=function(_0x562916,_0x9f6020){const _0x5ed63a=_0x55d321,_0x38765e=_0x562916[_0x5ed63a(0x7ec)]()['trim']();for(const _0x341f7d in VisuMZ['CoreEngine']['ControllerMatches']){if(_0x38765e[_0x5ed63a(0x1bb)](_0x341f7d)){const _0x3de948=VisuMZ['CoreEngine'][_0x5ed63a(0x782)][_0x341f7d],_0x2fa3d0=VisuMZ[_0x5ed63a(0x886)]['ControllerButtons'][_0x3de948];return _0x2fa3d0[_0x9f6020]||this['getKeyboardInputButtonString'](_0x9f6020);}}return this['getKeyboardInputButtonString'](_0x9f6020);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x8fd)]=ColorManager[_0x55d321(0x643)],ColorManager[_0x55d321(0x643)]=function(){const _0x488c76=_0x55d321;VisuMZ['CoreEngine'][_0x488c76(0x8fd)]['call'](this),this['_colorCache']=this[_0x488c76(0x14f)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x2d008b,_0xb227c6){const _0x58f1cf=_0x55d321;return _0xb227c6=String(_0xb227c6),this['_colorCache']=this[_0x58f1cf(0x14f)]||{},_0xb227c6[_0x58f1cf(0x362)](/#(.*)/i)?this['_colorCache'][_0x2d008b]=_0x58f1cf(0x163)[_0x58f1cf(0x4a5)](String(RegExp['$1'])):this['_colorCache'][_0x2d008b]=this[_0x58f1cf(0x397)](Number(_0xb227c6)),this[_0x58f1cf(0x14f)][_0x2d008b];},ColorManager[_0x55d321(0x90c)]=function(_0x432d59){const _0x5c8021=_0x55d321;return _0x432d59=String(_0x432d59),_0x432d59['match'](/#(.*)/i)?_0x5c8021(0x163)[_0x5c8021(0x4a5)](String(RegExp['$1'])):this[_0x5c8021(0x397)](Number(_0x432d59));},ColorManager[_0x55d321(0x5eb)]=function(){const _0x5406d4=_0x55d321;this[_0x5406d4(0x14f)]={};},ColorManager[_0x55d321(0x5c6)]=function(){const _0x2423f3=_0x55d321,_0x442261=_0x2423f3(0x442);this[_0x2423f3(0x14f)]=this[_0x2423f3(0x14f)]||{};if(this[_0x2423f3(0x14f)][_0x442261])return this['_colorCache'][_0x442261];const _0x5cd177=VisuMZ[_0x2423f3(0x886)]['Settings'][_0x2423f3(0x512)][_0x2423f3(0x593)];return this[_0x2423f3(0x6e4)](_0x442261,_0x5cd177);},ColorManager[_0x55d321(0x173)]=function(){const _0x133f7d=_0x55d321,_0x2aeff4='_stored_systemColor';this[_0x133f7d(0x14f)]=this[_0x133f7d(0x14f)]||{};if(this[_0x133f7d(0x14f)][_0x2aeff4])return this[_0x133f7d(0x14f)][_0x2aeff4];const _0x1c84e9=VisuMZ[_0x133f7d(0x886)][_0x133f7d(0x530)][_0x133f7d(0x512)][_0x133f7d(0x825)];return this[_0x133f7d(0x6e4)](_0x2aeff4,_0x1c84e9);},ColorManager[_0x55d321(0x60b)]=function(){const _0x5a23a7=_0x55d321,_0x55c8c6=_0x5a23a7(0x82e);this[_0x5a23a7(0x14f)]=this[_0x5a23a7(0x14f)]||{};if(this[_0x5a23a7(0x14f)][_0x55c8c6])return this[_0x5a23a7(0x14f)][_0x55c8c6];const _0x34d9c6=VisuMZ[_0x5a23a7(0x886)][_0x5a23a7(0x530)][_0x5a23a7(0x512)][_0x5a23a7(0x425)];return this['getColorDataFromPluginParameters'](_0x55c8c6,_0x34d9c6);},ColorManager['deathColor']=function(){const _0x563bb9=_0x55d321,_0x30c696=_0x563bb9(0x40d);this[_0x563bb9(0x14f)]=this['_colorCache']||{};if(this[_0x563bb9(0x14f)][_0x30c696])return this[_0x563bb9(0x14f)][_0x30c696];const _0x15ad6f=VisuMZ[_0x563bb9(0x886)][_0x563bb9(0x530)][_0x563bb9(0x512)][_0x563bb9(0x815)];return this['getColorDataFromPluginParameters'](_0x30c696,_0x15ad6f);},ColorManager['gaugeBackColor']=function(){const _0x33d93c=_0x55d321,_0x24bbe5=_0x33d93c(0x26b);this[_0x33d93c(0x14f)]=this[_0x33d93c(0x14f)]||{};if(this[_0x33d93c(0x14f)][_0x24bbe5])return this[_0x33d93c(0x14f)][_0x24bbe5];const _0xda7899=VisuMZ[_0x33d93c(0x886)][_0x33d93c(0x530)][_0x33d93c(0x512)][_0x33d93c(0x3b3)];return this[_0x33d93c(0x6e4)](_0x24bbe5,_0xda7899);},ColorManager[_0x55d321(0x2cd)]=function(){const _0x3b0343=_0x55d321,_0x895c39=_0x3b0343(0x1fe);this[_0x3b0343(0x14f)]=this[_0x3b0343(0x14f)]||{};if(this[_0x3b0343(0x14f)][_0x895c39])return this[_0x3b0343(0x14f)][_0x895c39];const _0x106c7c=VisuMZ[_0x3b0343(0x886)][_0x3b0343(0x530)][_0x3b0343(0x512)][_0x3b0343(0x919)];return this[_0x3b0343(0x6e4)](_0x895c39,_0x106c7c);},ColorManager[_0x55d321(0x23b)]=function(){const _0x4bc3e4=_0x55d321,_0x32cb33=_0x4bc3e4(0x19f);this[_0x4bc3e4(0x14f)]=this[_0x4bc3e4(0x14f)]||{};if(this[_0x4bc3e4(0x14f)][_0x32cb33])return this[_0x4bc3e4(0x14f)][_0x32cb33];const _0x5f8f92=VisuMZ[_0x4bc3e4(0x886)][_0x4bc3e4(0x530)]['Color'][_0x4bc3e4(0x8ff)];return this[_0x4bc3e4(0x6e4)](_0x32cb33,_0x5f8f92);},ColorManager[_0x55d321(0x36a)]=function(){const _0x2479d9=_0x55d321,_0x4b8900=_0x2479d9(0x62a);this[_0x2479d9(0x14f)]=this[_0x2479d9(0x14f)]||{};if(this['_colorCache'][_0x4b8900])return this[_0x2479d9(0x14f)][_0x4b8900];const _0x595389=VisuMZ[_0x2479d9(0x886)][_0x2479d9(0x530)][_0x2479d9(0x512)][_0x2479d9(0x2cb)];return this[_0x2479d9(0x6e4)](_0x4b8900,_0x595389);},ColorManager[_0x55d321(0x16c)]=function(){const _0xef3846=_0x55d321,_0x481943=_0xef3846(0x8a1);this['_colorCache']=this['_colorCache']||{};if(this[_0xef3846(0x14f)][_0x481943])return this[_0xef3846(0x14f)][_0x481943];const _0x2d5d00=VisuMZ[_0xef3846(0x886)]['Settings'][_0xef3846(0x512)][_0xef3846(0x49e)];return this[_0xef3846(0x6e4)](_0x481943,_0x2d5d00);},ColorManager[_0x55d321(0x348)]=function(){const _0x144ecf=_0x55d321,_0x30aabb='_stored_mpCostColor';this[_0x144ecf(0x14f)]=this[_0x144ecf(0x14f)]||{};if(this[_0x144ecf(0x14f)][_0x30aabb])return this[_0x144ecf(0x14f)][_0x30aabb];const _0x47741b=VisuMZ['CoreEngine'][_0x144ecf(0x530)]['Color'][_0x144ecf(0x41f)];return this[_0x144ecf(0x6e4)](_0x30aabb,_0x47741b);},ColorManager[_0x55d321(0x2c8)]=function(){const _0x1008f0=_0x55d321,_0x3ab332=_0x1008f0(0x189);this[_0x1008f0(0x14f)]=this['_colorCache']||{};if(this[_0x1008f0(0x14f)][_0x3ab332])return this[_0x1008f0(0x14f)][_0x3ab332];const _0xcb6f0a=VisuMZ['CoreEngine']['Settings']['Color'][_0x1008f0(0x68c)];return this[_0x1008f0(0x6e4)](_0x3ab332,_0xcb6f0a);},ColorManager[_0x55d321(0x855)]=function(){const _0x2cdda3=_0x55d321,_0x40ec8c=_0x2cdda3(0x6d8);this[_0x2cdda3(0x14f)]=this[_0x2cdda3(0x14f)]||{};if(this[_0x2cdda3(0x14f)][_0x40ec8c])return this['_colorCache'][_0x40ec8c];const _0x436eaa=VisuMZ['CoreEngine']['Settings']['Color']['ColorPowerDown'];return this['getColorDataFromPluginParameters'](_0x40ec8c,_0x436eaa);},ColorManager[_0x55d321(0x80a)]=function(){const _0x343bca=_0x55d321,_0x363631=_0x343bca(0x53c);this['_colorCache']=this['_colorCache']||{};if(this[_0x343bca(0x14f)][_0x363631])return this[_0x343bca(0x14f)][_0x363631];const _0x15b457=VisuMZ[_0x343bca(0x886)][_0x343bca(0x530)][_0x343bca(0x512)][_0x343bca(0x5fd)];return this[_0x343bca(0x6e4)](_0x363631,_0x15b457);},ColorManager[_0x55d321(0x3cf)]=function(){const _0xe6dd3d=_0x55d321,_0x103378=_0xe6dd3d(0x515);this[_0xe6dd3d(0x14f)]=this[_0xe6dd3d(0x14f)]||{};if(this[_0xe6dd3d(0x14f)][_0x103378])return this['_colorCache'][_0x103378];const _0x2787a0=VisuMZ[_0xe6dd3d(0x886)][_0xe6dd3d(0x530)][_0xe6dd3d(0x512)][_0xe6dd3d(0x3a8)];return this[_0xe6dd3d(0x6e4)](_0x103378,_0x2787a0);},ColorManager[_0x55d321(0x5e7)]=function(){const _0x5e1e25=_0x55d321,_0x589e4c=_0x5e1e25(0x458);this[_0x5e1e25(0x14f)]=this[_0x5e1e25(0x14f)]||{};if(this[_0x5e1e25(0x14f)][_0x589e4c])return this['_colorCache'][_0x589e4c];const _0x409305=VisuMZ[_0x5e1e25(0x886)][_0x5e1e25(0x530)][_0x5e1e25(0x512)][_0x5e1e25(0x313)];return this[_0x5e1e25(0x6e4)](_0x589e4c,_0x409305);},ColorManager[_0x55d321(0x3ea)]=function(){const _0x428adc=_0x55d321,_0x4d63c6=_0x428adc(0x6a0);this['_colorCache']=this['_colorCache']||{};if(this[_0x428adc(0x14f)][_0x4d63c6])return this[_0x428adc(0x14f)][_0x4d63c6];const _0x41ed1a=VisuMZ[_0x428adc(0x886)]['Settings'][_0x428adc(0x512)][_0x428adc(0x673)];return this[_0x428adc(0x6e4)](_0x4d63c6,_0x41ed1a);},ColorManager[_0x55d321(0x5a4)]=function(){const _0x113aa9=_0x55d321,_0x491090='_stored_tpCostColor';this[_0x113aa9(0x14f)]=this[_0x113aa9(0x14f)]||{};if(this[_0x113aa9(0x14f)][_0x491090])return this['_colorCache'][_0x491090];const _0x4c1409=VisuMZ['CoreEngine'][_0x113aa9(0x530)][_0x113aa9(0x512)][_0x113aa9(0x6de)];return this['getColorDataFromPluginParameters'](_0x491090,_0x4c1409);},ColorManager[_0x55d321(0x3d9)]=function(){const _0x105e45=_0x55d321,_0x3d2450='_stored_pendingColor';this[_0x105e45(0x14f)]=this[_0x105e45(0x14f)]||{};if(this[_0x105e45(0x14f)][_0x3d2450])return this['_colorCache'][_0x3d2450];const _0x33ac82=VisuMZ['CoreEngine'][_0x105e45(0x530)][_0x105e45(0x512)][_0x105e45(0x6de)];return this['getColorDataFromPluginParameters'](_0x3d2450,_0x33ac82);},ColorManager['expGaugeColor1']=function(){const _0x28abff=_0x55d321,_0x5ee3a8='_stored_expGaugeColor1';this[_0x28abff(0x14f)]=this[_0x28abff(0x14f)]||{};if(this[_0x28abff(0x14f)][_0x5ee3a8])return this[_0x28abff(0x14f)][_0x5ee3a8];const _0x4bde3d=VisuMZ[_0x28abff(0x886)][_0x28abff(0x530)][_0x28abff(0x512)]['ColorExpGauge1'];return this[_0x28abff(0x6e4)](_0x5ee3a8,_0x4bde3d);},ColorManager[_0x55d321(0x5c0)]=function(){const _0x394c25=_0x55d321,_0x27f210='_stored_expGaugeColor2';this['_colorCache']=this[_0x394c25(0x14f)]||{};if(this[_0x394c25(0x14f)][_0x27f210])return this[_0x394c25(0x14f)][_0x27f210];const _0x16e5c6=VisuMZ[_0x394c25(0x886)][_0x394c25(0x530)][_0x394c25(0x512)][_0x394c25(0x67a)];return this[_0x394c25(0x6e4)](_0x27f210,_0x16e5c6);},ColorManager[_0x55d321(0x79e)]=function(){const _0x270443=_0x55d321,_0x5342bf=_0x270443(0x646);this[_0x270443(0x14f)]=this[_0x270443(0x14f)]||{};if(this['_colorCache'][_0x5342bf])return this[_0x270443(0x14f)][_0x5342bf];const _0x226c7b=VisuMZ[_0x270443(0x886)][_0x270443(0x530)][_0x270443(0x512)][_0x270443(0x7e2)];return this['getColorDataFromPluginParameters'](_0x5342bf,_0x226c7b);},ColorManager['maxLvGaugeColor2']=function(){const _0x2a24d1=_0x55d321,_0x489700=_0x2a24d1(0x8c6);this['_colorCache']=this[_0x2a24d1(0x14f)]||{};if(this[_0x2a24d1(0x14f)][_0x489700])return this[_0x2a24d1(0x14f)][_0x489700];const _0x360707=VisuMZ[_0x2a24d1(0x886)][_0x2a24d1(0x530)]['Color'][_0x2a24d1(0x740)];return this[_0x2a24d1(0x6e4)](_0x489700,_0x360707);},ColorManager[_0x55d321(0x69c)]=function(_0x345add){const _0x257249=_0x55d321;return VisuMZ[_0x257249(0x886)]['Settings']['Color'][_0x257249(0x60a)][_0x257249(0x2b5)](this,_0x345add);},ColorManager[_0x55d321(0x2f4)]=function(_0x7a126b){const _0xbbe5ab=_0x55d321;return VisuMZ[_0xbbe5ab(0x886)][_0xbbe5ab(0x530)][_0xbbe5ab(0x512)][_0xbbe5ab(0x4ca)][_0xbbe5ab(0x2b5)](this,_0x7a126b);},ColorManager[_0x55d321(0x4de)]=function(_0x390874){const _0x4b496f=_0x55d321;return VisuMZ[_0x4b496f(0x886)][_0x4b496f(0x530)]['Color'][_0x4b496f(0x856)]['call'](this,_0x390874);},ColorManager[_0x55d321(0x938)]=function(_0x2712c1){const _0x42c0bd=_0x55d321;return VisuMZ[_0x42c0bd(0x886)][_0x42c0bd(0x530)][_0x42c0bd(0x512)][_0x42c0bd(0x7c0)][_0x42c0bd(0x2b5)](this,_0x2712c1);},ColorManager[_0x55d321(0x7c1)]=function(_0x3f4c55){const _0x349a52=_0x55d321;return VisuMZ[_0x349a52(0x886)]['Settings'][_0x349a52(0x512)][_0x349a52(0x2dd)][_0x349a52(0x2b5)](this,_0x3f4c55);},ColorManager[_0x55d321(0x710)]=function(){const _0x5a134f=_0x55d321;return VisuMZ[_0x5a134f(0x886)][_0x5a134f(0x530)][_0x5a134f(0x512)]['OutlineColor'];},ColorManager['outlineColorDmg']=function(){const _0x4bafd6=_0x55d321;return VisuMZ[_0x4bafd6(0x886)][_0x4bafd6(0x530)][_0x4bafd6(0x512)][_0x4bafd6(0x576)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager['outlineColorGauge']=function(){const _0x20d159=_0x55d321;return VisuMZ[_0x20d159(0x886)]['Settings']['Color']['OutlineColorGauge']||_0x20d159(0x2f5);},ColorManager[_0x55d321(0x58d)]=function(){const _0x6c975d=_0x55d321;return VisuMZ[_0x6c975d(0x886)][_0x6c975d(0x530)]['Color'][_0x6c975d(0x444)];},ColorManager[_0x55d321(0x885)]=function(){const _0x46f70b=_0x55d321;return VisuMZ[_0x46f70b(0x886)][_0x46f70b(0x530)][_0x46f70b(0x512)][_0x46f70b(0x797)];},ColorManager[_0x55d321(0x66f)]=function(){const _0x12cc87=_0x55d321;return VisuMZ[_0x12cc87(0x886)]['Settings'][_0x12cc87(0x512)]['ItemBackColor1'];},ColorManager[_0x55d321(0x636)]=function(){const _0x1991e7=_0x55d321;return VisuMZ['CoreEngine'][_0x1991e7(0x530)][_0x1991e7(0x512)][_0x1991e7(0x3ef)];},SceneManager[_0x55d321(0x6be)]=[],SceneManager['isSceneBattle']=function(){const _0x37180d=_0x55d321;return this[_0x37180d(0x43e)]&&this['_scene']['constructor']===Scene_Battle;},SceneManager[_0x55d321(0x4f8)]=function(){const _0x32902c=_0x55d321;return this[_0x32902c(0x43e)]&&this[_0x32902c(0x43e)][_0x32902c(0x73b)]===Scene_Map;},SceneManager[_0x55d321(0x32a)]=function(){const _0x4f00b1=_0x55d321;return this[_0x4f00b1(0x43e)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x308)]=SceneManager['initialize'],SceneManager['initialize']=function(){const _0x11a308=_0x55d321;VisuMZ[_0x11a308(0x886)][_0x11a308(0x308)][_0x11a308(0x2b5)](this),this[_0x11a308(0x62d)]();},VisuMZ['CoreEngine']['SceneManager_onKeyDown']=SceneManager[_0x55d321(0x80d)],SceneManager['onKeyDown']=function(_0x2fef7f){const _0x556a52=_0x55d321;if($gameTemp)this[_0x556a52(0x3fe)](_0x2fef7f);VisuMZ[_0x556a52(0x886)][_0x556a52(0x853)]['call'](this,_0x2fef7f);},SceneManager[_0x55d321(0x3fe)]=function(_0x32acca){const _0x1113ee=_0x55d321;if(!_0x32acca[_0x1113ee(0x81a)]&&!_0x32acca['altKey'])switch(_0x32acca['keyCode']){case 0x52:this['playTestShiftR']();break;case 0x54:this[_0x1113ee(0x177)]();break;case 0x75:this['playTestF6']();break;case 0x76:if(Input['isPressed']('shift')||Input[_0x1113ee(0x20f)]('ctrl'))return;this[_0x1113ee(0x8ee)]();break;}else{if(_0x32acca['ctrlKey']){let _0x341fcd=_0x32acca[_0x1113ee(0x767)];if(_0x341fcd>=0x31&&_0x341fcd<=0x39){const _0xc8ed4f=_0x341fcd-0x30;return SceneManager[_0x1113ee(0x451)](_0xc8ed4f);}else{if(_0x341fcd>=0x61&&_0x341fcd<=0x69){const _0x2a4054=_0x341fcd-0x60;return SceneManager['playtestQuickLoad'](_0x2a4054);}}}}},SceneManager[_0x55d321(0x378)]=function(){const _0x23eb7a=_0x55d321;if($gameTemp[_0x23eb7a(0x25f)]()&&VisuMZ[_0x23eb7a(0x886)][_0x23eb7a(0x530)][_0x23eb7a(0x6f5)]['F6key']){ConfigManager['seVolume']!==0x0?(ConfigManager[_0x23eb7a(0x644)]=0x0,ConfigManager[_0x23eb7a(0x4d2)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x23eb7a(0x578)]=0x0):(ConfigManager[_0x23eb7a(0x644)]=0x64,ConfigManager[_0x23eb7a(0x4d2)]=0x64,ConfigManager[_0x23eb7a(0x226)]=0x64,ConfigManager[_0x23eb7a(0x578)]=0x64);ConfigManager[_0x23eb7a(0x490)]();if(this[_0x23eb7a(0x43e)][_0x23eb7a(0x73b)]===Scene_Options){if(this[_0x23eb7a(0x43e)][_0x23eb7a(0x790)])this['_scene']['_optionsWindow']['refresh']();if(this[_0x23eb7a(0x43e)][_0x23eb7a(0x8d8)])this[_0x23eb7a(0x43e)]['_listWindow'][_0x23eb7a(0x1cc)]();}}},SceneManager[_0x55d321(0x8ee)]=function(){const _0x111884=_0x55d321;$gameTemp[_0x111884(0x25f)]()&&VisuMZ[_0x111884(0x886)][_0x111884(0x530)][_0x111884(0x6f5)]['F7key']&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x111884(0x1c8)]);},SceneManager[_0x55d321(0x384)]=function(){const _0x5d872b=_0x55d321;if(!VisuMZ[_0x5d872b(0x886)][_0x5d872b(0x530)]['QoL']['ShiftR_Toggle'])return;if(!$gameTemp[_0x5d872b(0x25f)]())return;if(!SceneManager[_0x5d872b(0x5d9)]())return;if(!Input['isPressed']('shift'))return;for(const _0x24feed of $gameParty[_0x5d872b(0x6f6)]()){if(!_0x24feed)continue;_0x24feed[_0x5d872b(0x563)]();}},SceneManager[_0x55d321(0x177)]=function(){const _0x28cdce=_0x55d321;if(!VisuMZ[_0x28cdce(0x886)][_0x28cdce(0x530)][_0x28cdce(0x6f5)][_0x28cdce(0x386)])return;if(!$gameTemp[_0x28cdce(0x25f)]())return;if(!SceneManager[_0x28cdce(0x5d9)]())return;if(!Input[_0x28cdce(0x20f)](_0x28cdce(0x298)))return;for(const _0x345de7 of $gameParty[_0x28cdce(0x6f6)]()){if(!_0x345de7)continue;_0x345de7[_0x28cdce(0x31c)](_0x345de7[_0x28cdce(0x93e)]());}},SceneManager[_0x55d321(0x451)]=function(_0x20d458){const _0x2b8d1b=_0x55d321;if(!$gameTemp['isPlaytest']())return;if(!DataManager['savefileInfo'](_0x20d458))return;if(!(VisuMZ[_0x2b8d1b(0x886)][_0x2b8d1b(0x530)][_0x2b8d1b(0x6f5)]['CtrlQuickLoad']??!![]))return;this[_0x2b8d1b(0x582)](Scene_QuickLoad),this[_0x2b8d1b(0x7c3)](_0x20d458);},SceneManager['initVisuMZCoreEngine']=function(){const _0x5cdf10=_0x55d321;this[_0x5cdf10(0x45f)]=![],this[_0x5cdf10(0x32f)]=!VisuMZ['CoreEngine'][_0x5cdf10(0x530)]['UI'][_0x5cdf10(0x383)];},SceneManager[_0x55d321(0x8a9)]=function(_0x467982){const _0xad620b=_0x55d321;VisuMZ[_0xad620b(0x886)][_0xad620b(0x530)]['UI'][_0xad620b(0x352)]&&(this[_0xad620b(0x45f)]=_0x467982);},SceneManager[_0x55d321(0x144)]=function(){const _0x43f66d=_0x55d321;return this[_0x43f66d(0x45f)];},SceneManager['areButtonsHidden']=function(){const _0x588b33=_0x55d321;return this[_0x588b33(0x32f)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x5e8c82=_0x55d321;return this[_0x5e8c82(0x83d)]()||this[_0x5e8c82(0x144)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x3e5)]=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0xba568b=_0x55d321;return VisuMZ[_0xba568b(0x886)][_0xba568b(0x530)][_0xba568b(0x6f5)]['RequireFocus']?VisuMZ[_0xba568b(0x886)]['SceneManager_isGameActive']['call'](this):!![];},SceneManager[_0x55d321(0x505)]=function(_0x2ff49a){const _0x2a5001=_0x55d321;if(_0x2ff49a instanceof Error)this['catchNormalError'](_0x2ff49a);else _0x2ff49a instanceof Array&&_0x2ff49a[0x0]==='LoadError'?this[_0x2a5001(0x64b)](_0x2ff49a):this[_0x2a5001(0x628)](_0x2ff49a);this[_0x2a5001(0x533)]();},VisuMZ[_0x55d321(0x886)]['BattleManager_processEscape']=BattleManager['processEscape'],BattleManager[_0x55d321(0x529)]=function(){const _0x32d5a5=_0x55d321;return VisuMZ[_0x32d5a5(0x886)][_0x32d5a5(0x530)][_0x32d5a5(0x6f5)]['EscapeAlways']?this[_0x32d5a5(0x816)]():VisuMZ[_0x32d5a5(0x886)][_0x32d5a5(0x8e9)][_0x32d5a5(0x2b5)](this);},BattleManager[_0x55d321(0x816)]=function(){const _0x45dbfc=_0x55d321;return $gameParty[_0x45dbfc(0x409)](),SoundManager[_0x45dbfc(0x6d4)](),this[_0x45dbfc(0x4e4)](),!![];},BattleManager[_0x55d321(0x71a)]=function(){const _0x22f435=_0x55d321;return $gameSystem[_0x22f435(0x341)]()>=0x1;},BattleManager[_0x55d321(0x7b1)]=function(){const _0x253563=_0x55d321;return $gameSystem[_0x253563(0x341)]()===0x1;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x2bd)]=Game_Temp['prototype']['initialize'],Game_Temp[_0x55d321(0x2a8)]['initialize']=function(){const _0x277ca7=_0x55d321;VisuMZ['CoreEngine'][_0x277ca7(0x2bd)]['call'](this),this[_0x277ca7(0x295)](),this['createFauxAnimationQueue'](),this[_0x277ca7(0x2cf)]();},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x295)]=function(){const _0x1e1457=_0x55d321;VisuMZ[_0x1e1457(0x886)][_0x1e1457(0x530)][_0x1e1457(0x6f5)][_0x1e1457(0x891)]&&(this['_isPlaytest']=![]);},Game_Temp['prototype'][_0x55d321(0x903)]=function(_0x18b86c){const _0x1f94b5=_0x55d321;this[_0x1f94b5(0x4ff)]=_0x18b86c;},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x42e)]=function(){const _0x4e1711=_0x55d321;return this[_0x4e1711(0x4ff)];},Game_Temp['prototype'][_0x55d321(0x183)]=function(){const _0x7736f4=_0x55d321;this[_0x7736f4(0x67e)]=undefined,this[_0x7736f4(0x653)]=undefined,this[_0x7736f4(0x62b)]=undefined;},Game_Temp[_0x55d321(0x2a8)]['applyForcedGameTroopSettingsCoreEngine']=function(_0xcfa8a7){const _0x348061=_0x55d321;$gameMap&&$dataMap&&$dataMap[_0x348061(0x291)]&&this[_0x348061(0x3f4)]($dataMap[_0x348061(0x291)]);const _0x2684c5=$dataTroops[_0xcfa8a7];if(_0x2684c5){let _0x368022=DataManager['createTroopNote'](_0x2684c5['id']);this[_0x348061(0x3f4)](_0x368022);}},Game_Temp['prototype'][_0x55d321(0x3f4)]=function(_0x432c60){const _0x3aa339=_0x55d321;if(!_0x432c60)return;if(_0x432c60['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x432c60[_0x3aa339(0x362)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x3aa339(0x67e)]='SV';else{if(_0x432c60[_0x3aa339(0x362)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x3cf76e=String(RegExp['$1']);if(_0x3cf76e[_0x3aa339(0x362)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x3aa339(0x67e)]='FV';else _0x3cf76e[_0x3aa339(0x362)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x3aa339(0x67e)]='SV');}}}if(_0x432c60['match'](/<(?:DTB)>/i))this[_0x3aa339(0x653)]=0x0;else{if(_0x432c60[_0x3aa339(0x362)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x3aa339(0x653)]=0x1;else{if(_0x432c60[_0x3aa339(0x362)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x432c60[_0x3aa339(0x362)](/<(?:TPB|ATB)>/i))this['_forcedBattleSys']=0x2;else{if(_0x432c60[_0x3aa339(0x362)](/<(?:CTB)>/i))Imported[_0x3aa339(0x45e)]&&(this[_0x3aa339(0x653)]=_0x3aa339(0x2a6));else{if(_0x432c60['match'](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x3aa339(0x653)]='STB');else{if(_0x432c60[_0x3aa339(0x362)](/<(?:BTB)>/i))Imported[_0x3aa339(0x78e)]&&(this[_0x3aa339(0x653)]=_0x3aa339(0x191));else{if(_0x432c60[_0x3aa339(0x362)](/<(?:FTB)>/i))Imported[_0x3aa339(0x7a4)]&&(this['_forcedBattleSys']='FTB');else{if(_0x432c60[_0x3aa339(0x362)](/<(?:OTB)>/i))Imported[_0x3aa339(0x395)]&&(this[_0x3aa339(0x653)]=_0x3aa339(0x78a));else{if(_0x432c60[_0x3aa339(0x362)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']='ETB');else{if(_0x432c60[_0x3aa339(0x362)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this[_0x3aa339(0x653)]=_0x3aa339(0x944));else{if(_0x432c60[_0x3aa339(0x362)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x13a322=String(RegExp['$1']);if(_0x13a322[_0x3aa339(0x362)](/DTB/i))this[_0x3aa339(0x653)]=0x0;else{if(_0x13a322[_0x3aa339(0x362)](/(?:TPB|ATB)[ ]ACTIVE/i))this['_forcedBattleSys']=0x1;else{if(_0x13a322[_0x3aa339(0x362)](/(?:TPB|ATB)[ ]WAIT/i))this['_forcedBattleSys']=0x2;else{if(_0x13a322[_0x3aa339(0x362)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this['_forcedBattleSys']=_0x3aa339(0x2a6));else{if(_0x13a322['match'](/STB/i))Imported[_0x3aa339(0x554)]&&(this[_0x3aa339(0x653)]=_0x3aa339(0x7fe));else{if(_0x13a322['match'](/BTB/i))Imported[_0x3aa339(0x78e)]&&(this[_0x3aa339(0x653)]='BTB');else{if(_0x13a322[_0x3aa339(0x362)](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x3aa339(0x653)]=_0x3aa339(0x87d));else{if(_0x13a322[_0x3aa339(0x362)](/OTB/i))Imported[_0x3aa339(0x395)]&&(this[_0x3aa339(0x653)]=_0x3aa339(0x78a));else{if(_0x13a322['match'](/ETB/i))Imported[_0x3aa339(0x821)]&&(this[_0x3aa339(0x653)]=_0x3aa339(0x87f));else _0x13a322[_0x3aa339(0x362)](/PTB/i)&&(Imported['VisuMZ_2_BattleSystemPTB']&&(this['_forcedBattleSys']=_0x3aa339(0x944)));}}}}}}}}}}}}}}}}}}}}if(_0x432c60[_0x3aa339(0x362)](/<(?:|BATTLE )GRID>/i))this[_0x3aa339(0x62b)]=!![];else _0x432c60[_0x3aa339(0x362)](/<NO (?:|BATTLE )GRID>/i)&&(this['_forcedBattleGridSystem']=![]);},Game_Temp[_0x55d321(0x2a8)]['createFauxAnimationQueue']=function(){const _0x56dda=_0x55d321;this[_0x56dda(0x40b)]=[];},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x85c)]=function(_0x54c0e0,_0xe5160d,_0x1034c6,_0x16c6dd){const _0x4fa459=_0x55d321;if(!this[_0x4fa459(0x38f)]())return;_0x1034c6=_0x1034c6||![],_0x16c6dd=_0x16c6dd||![];if($dataAnimations[_0xe5160d]){const _0x30d006={'targets':_0x54c0e0,'animationId':_0xe5160d,'mirror':_0x1034c6,'mute':_0x16c6dd};this['_fauxAnimationQueue']['push'](_0x30d006);for(const _0x228e88 of _0x54c0e0){_0x228e88['startAnimation']&&_0x228e88[_0x4fa459(0x8ce)]();}}},Game_Temp[_0x55d321(0x2a8)]['showFauxAnimations']=function(){return!![];},Game_Temp['prototype'][_0x55d321(0x7e4)]=function(){const _0x2859f5=_0x55d321;return this[_0x2859f5(0x40b)][_0x2859f5(0x298)]();},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x2cf)]=function(){this['_pointAnimationQueue']=[];},Game_Temp[_0x55d321(0x2a8)]['requestPointAnimation']=function(_0x493b97,_0x2f2397,_0x5e9aa8,_0x15554b,_0x1c30bf){const _0x5ac731=_0x55d321;if(!this['showPointAnimations']())return;_0x15554b=_0x15554b||![],_0x1c30bf=_0x1c30bf||![];if($dataAnimations[_0x5e9aa8]){const _0xf861ac={'x':_0x493b97,'y':_0x2f2397,'animationId':_0x5e9aa8,'mirror':_0x15554b,'mute':_0x1c30bf};this[_0x5ac731(0x307)][_0x5ac731(0x582)](_0xf861ac);}},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x22c)]=function(){return!![];},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x254)]=function(){const _0x34f7b7=_0x55d321;return this[_0x34f7b7(0x307)][_0x34f7b7(0x298)]();},VisuMZ[_0x55d321(0x886)]['Game_System_initialize']=Game_System[_0x55d321(0x2a8)][_0x55d321(0x4a1)],Game_System[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(){const _0x3043db=_0x55d321;VisuMZ[_0x3043db(0x886)][_0x3043db(0x90e)][_0x3043db(0x2b5)](this),this['initCoreEngine']();},Game_System[_0x55d321(0x2a8)][_0x55d321(0x1d0)]=function(){const _0x1ec04d=_0x55d321;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x1ec04d(0x299)],'BattleSystem':this[_0x1ec04d(0x859)](),'FontSize':$dataSystem[_0x1ec04d(0x87a)][_0x1ec04d(0x2d7)],'Padding':0xc};},Game_System[_0x55d321(0x2a8)][_0x55d321(0x3fb)]=function(){const _0x255e82=_0x55d321;if($gameTemp[_0x255e82(0x67e)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x255e82(0x339)]===undefined)this[_0x255e82(0x1d0)]();if(this[_0x255e82(0x339)][_0x255e82(0x27f)]===undefined)this[_0x255e82(0x1d0)]();return this[_0x255e82(0x339)]['SideView'];},Game_System[_0x55d321(0x2a8)]['setSideView']=function(_0x379989){const _0xfe205a=_0x55d321;if(this['_CoreEngineSettings']===undefined)this[_0xfe205a(0x1d0)]();if(this[_0xfe205a(0x339)][_0xfe205a(0x27f)]===undefined)this[_0xfe205a(0x1d0)]();this[_0xfe205a(0x339)][_0xfe205a(0x27f)]=_0x379989;},Game_System[_0x55d321(0x2a8)][_0x55d321(0x506)]=function(){const _0x43c5ee=_0x55d321;if(this['_CoreEngineSettings']===undefined)this[_0x43c5ee(0x1d0)]();this[_0x43c5ee(0x339)][_0x43c5ee(0x49c)]=this['initialBattleSystem']();},Game_System[_0x55d321(0x2a8)][_0x55d321(0x859)]=function(){const _0x3a1921=_0x55d321,_0x13c8fc=(VisuMZ[_0x3a1921(0x886)][_0x3a1921(0x530)]['BattleSystem']||_0x3a1921(0x5da))['toUpperCase']()[_0x3a1921(0x214)]();return VisuMZ[_0x3a1921(0x886)]['CreateBattleSystemID'](_0x13c8fc);},Game_System[_0x55d321(0x2a8)]['getBattleSystem']=function(){const _0x409b9a=_0x55d321;if($gameTemp[_0x409b9a(0x653)]!==undefined)return $gameTemp[_0x409b9a(0x653)];if(this[_0x409b9a(0x339)]===undefined)this[_0x409b9a(0x1d0)]();if(this[_0x409b9a(0x339)][_0x409b9a(0x49c)]===undefined)this[_0x409b9a(0x506)]();return this[_0x409b9a(0x339)]['BattleSystem'];},Game_System[_0x55d321(0x2a8)][_0x55d321(0x1e0)]=function(_0x4720fb){const _0x359701=_0x55d321;if(this[_0x359701(0x339)]===undefined)this['initCoreEngine']();if(this[_0x359701(0x339)][_0x359701(0x49c)]===undefined)this[_0x359701(0x506)]();this[_0x359701(0x339)][_0x359701(0x49c)]=_0x4720fb;},Game_System[_0x55d321(0x2a8)][_0x55d321(0x613)]=function(){const _0x4b7f62=_0x55d321;if(this['_CoreEngineSettings']===undefined)this[_0x4b7f62(0x1d0)]();if(this[_0x4b7f62(0x339)][_0x4b7f62(0x3b7)]===undefined)this[_0x4b7f62(0x1d0)]();return this[_0x4b7f62(0x339)][_0x4b7f62(0x3b7)];},Game_System['prototype']['setMainFontSize']=function(_0x10aa4a){const _0x5c61be=_0x55d321;if(this[_0x5c61be(0x339)]===undefined)this[_0x5c61be(0x1d0)]();if(this[_0x5c61be(0x339)][_0x5c61be(0x2e7)]===undefined)this[_0x5c61be(0x1d0)]();this[_0x5c61be(0x339)]['FontSize']=_0x10aa4a;},Game_System['prototype'][_0x55d321(0x521)]=function(){const _0x2c591a=_0x55d321;if(this[_0x2c591a(0x339)]===undefined)this['initCoreEngine']();if(this[_0x2c591a(0x339)]['Padding']===undefined)this['initCoreEngine']();return this[_0x2c591a(0x339)][_0x2c591a(0x7ba)];},Game_System[_0x55d321(0x2a8)][_0x55d321(0x556)]=function(_0x7b27cc){const _0x436e78=_0x55d321;if(this[_0x436e78(0x339)]===undefined)this[_0x436e78(0x1d0)]();if(this[_0x436e78(0x339)]['TimeProgress']===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x436e78(0x7ba)]=_0x7b27cc;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x7e7)]=Game_Screen[_0x55d321(0x2a8)][_0x55d321(0x4a1)],Game_Screen[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(){const _0x493020=_0x55d321;VisuMZ[_0x493020(0x886)][_0x493020(0x7e7)][_0x493020(0x2b5)](this),this[_0x493020(0x32c)]();},Game_Screen[_0x55d321(0x2a8)][_0x55d321(0x32c)]=function(){const _0x1abc05=_0x55d321,_0x5becda=VisuMZ['CoreEngine'][_0x1abc05(0x530)][_0x1abc05(0x733)];this['_coreEngineShakeStyle']=_0x5becda?.[_0x1abc05(0x623)]||_0x1abc05(0x2db);},Game_Screen[_0x55d321(0x2a8)][_0x55d321(0x504)]=function(){const _0x2cdc35=_0x55d321;if(this[_0x2cdc35(0x6e2)]===undefined)this[_0x2cdc35(0x32c)]();return this['_coreEngineShakeStyle'];},Game_Screen['prototype'][_0x55d321(0x197)]=function(_0xc02db2){const _0x3826e4=_0x55d321;if(this[_0x3826e4(0x6e2)]===undefined)this[_0x3826e4(0x32c)]();this[_0x3826e4(0x6e2)]=_0xc02db2[_0x3826e4(0x7ec)]()[_0x3826e4(0x214)]();},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x5ae)]=function(){const _0x399f3e=_0x55d321;if($gameParty[_0x399f3e(0x754)]())return![];return this['onlyfilename']()&&this[_0x399f3e(0x3c6)]()[_0x399f3e(0x4a2)](0x0)==='!';},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x3c6)]=function(){const _0x9e6079=_0x55d321;return this[_0x9e6079(0x5f3)][_0x9e6079(0x60d)]('/')['pop']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x708)]=Game_Picture['prototype']['x'],Game_Picture[_0x55d321(0x2a8)]['x']=function(){const _0x191700=_0x55d321;return this[_0x191700(0x5ae)]()?this[_0x191700(0x881)]():VisuMZ[_0x191700(0x886)][_0x191700(0x708)][_0x191700(0x2b5)](this);},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x881)]=function(){const _0x361677=_0x55d321,_0x42f6fc=$gameMap[_0x361677(0x1bd)]()*$gameMap['tileWidth']();return(this['_x']-_0x42f6fc)*$gameScreen[_0x361677(0x410)]();},VisuMZ['CoreEngine'][_0x55d321(0x4e9)]=Game_Picture[_0x55d321(0x2a8)]['y'],Game_Picture[_0x55d321(0x2a8)]['y']=function(){const _0x3edac6=_0x55d321;return this[_0x3edac6(0x5ae)]()?this[_0x3edac6(0x7d8)]():VisuMZ[_0x3edac6(0x886)][_0x3edac6(0x4e9)][_0x3edac6(0x2b5)](this);},Game_Picture['prototype'][_0x55d321(0x7d8)]=function(){const _0x52c57f=_0x55d321,_0x39e07e=$gameMap['displayY']()*$gameMap[_0x52c57f(0x2b6)]();return(this['_y']-_0x39e07e)*$gameScreen['zoomScale']();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x591)]=Game_Picture[_0x55d321(0x2a8)]['scaleX'],Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x20e)]=function(){const _0x18cad7=_0x55d321;let _0x4fb3cf=VisuMZ[_0x18cad7(0x886)]['Game_Picture_scaleX'][_0x18cad7(0x2b5)](this);return this[_0x18cad7(0x5ae)]()&&(_0x4fb3cf*=$gameScreen[_0x18cad7(0x410)]()),_0x4fb3cf;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x76a)]=Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x7f4)],Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x7f4)]=function(){const _0x39c347=_0x55d321;let _0x3b74bf=VisuMZ[_0x39c347(0x886)][_0x39c347(0x76a)][_0x39c347(0x2b5)](this);return this[_0x39c347(0x5ae)]()&&(_0x3b74bf*=$gameScreen['zoomScale']()),_0x3b74bf;},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x44e)]=function(_0x58983c){const _0x46f703=_0x55d321;this[_0x46f703(0x7bd)]=_0x58983c;},VisuMZ['CoreEngine'][_0x55d321(0x40c)]=Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x155)],Game_Picture[_0x55d321(0x2a8)]['calcEasing']=function(_0x470256){const _0x505282=_0x55d321;return this[_0x505282(0x7bd)]=this[_0x505282(0x7bd)]||0x0,[0x0,0x1,0x2,0x3]['includes'](this['_coreEasingType'])?VisuMZ[_0x505282(0x886)][_0x505282(0x40c)]['call'](this,_0x470256):VisuMZ['ApplyEasing'](_0x470256,this[_0x505282(0x7bd)]);},VisuMZ['CoreEngine']['Game_Picture_initRotation']=Game_Picture[_0x55d321(0x2a8)]['initRotation'],Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x4c8)]=function(){const _0x3c7534=_0x55d321;VisuMZ[_0x3c7534(0x886)][_0x3c7534(0x36e)][_0x3c7534(0x2b5)](this),this[_0x3c7534(0x7f5)]();},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x7f5)]=function(){const _0x12eef0=_0x55d321;this[_0x12eef0(0x575)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x12eef0(0x1aa)};},VisuMZ[_0x55d321(0x886)][_0x55d321(0x833)]=Game_Picture['prototype'][_0x55d321(0x526)],Game_Picture['prototype'][_0x55d321(0x526)]=function(){const _0x4c952b=_0x55d321;let _0x4981f6=VisuMZ['CoreEngine']['Game_Picture_angle'][_0x4c952b(0x2b5)](this);return _0x4981f6+=this[_0x4c952b(0x3a0)](),_0x4981f6;},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x3a0)]=function(){const _0x97e946=_0x55d321;if(this[_0x97e946(0x575)]===undefined)this[_0x97e946(0x7f5)]();return this[_0x97e946(0x575)][_0x97e946(0x801)]||0x0;},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x926)]=function(_0x232016,_0x211d83,_0x3076a2){const _0x35b167=_0x55d321;if(this[_0x35b167(0x575)]===undefined)this[_0x35b167(0x7f5)]();this['_anglePlus'][_0x35b167(0x751)]=_0x232016||0x0,this['_anglePlus']['duration']=_0x211d83||0x0,this[_0x35b167(0x575)][_0x35b167(0x738)]=_0x211d83||0x0,this[_0x35b167(0x575)]['easingType']=_0x3076a2||_0x35b167(0x1aa),_0x211d83<=0x0&&(this['_anglePlus'][_0x35b167(0x801)]=this[_0x35b167(0x575)]['target']);},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x897)]=function(_0x1ade78,_0x47f988,_0x4ea98a){const _0x2e326b=_0x55d321;if(this[_0x2e326b(0x575)]===undefined)this[_0x2e326b(0x7f5)]();this[_0x2e326b(0x575)]['target']+=_0x1ade78||0x0,this[_0x2e326b(0x575)][_0x2e326b(0x16b)]=_0x47f988||0x0,this['_anglePlus']['wholeDuration']=_0x47f988||0x0,this[_0x2e326b(0x575)][_0x2e326b(0x6f3)]=_0x4ea98a||_0x2e326b(0x1aa),_0x47f988<=0x0&&(this[_0x2e326b(0x575)][_0x2e326b(0x801)]=this[_0x2e326b(0x575)][_0x2e326b(0x751)]);},VisuMZ[_0x55d321(0x886)]['Game_Picture_updateRotation']=Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x3d0)],Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x3d0)]=function(){const _0x3a9111=_0x55d321;VisuMZ[_0x3a9111(0x886)]['Game_Picture_updateRotation'][_0x3a9111(0x2b5)](this),this[_0x3a9111(0x146)]();},Game_Picture[_0x55d321(0x2a8)]['updateAnglePlus']=function(){const _0x133f87=_0x55d321;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();const _0x1ce904=this[_0x133f87(0x575)];if(_0x1ce904[_0x133f87(0x16b)]<=0x0)return;_0x1ce904[_0x133f87(0x801)]=this['applyEasingAnglePlus'](_0x1ce904['current'],_0x1ce904['target']),_0x1ce904[_0x133f87(0x16b)]--,_0x1ce904[_0x133f87(0x16b)]<=0x0&&(_0x1ce904[_0x133f87(0x801)]=_0x1ce904[_0x133f87(0x751)]);},Game_Picture[_0x55d321(0x2a8)]['applyEasingAnglePlus']=function(_0xca5e52,_0xecfe4c){const _0x3dff8f=_0x55d321,_0x2e8157=this[_0x3dff8f(0x575)],_0x109e91=_0x2e8157[_0x3dff8f(0x6f3)],_0x21196a=_0x2e8157[_0x3dff8f(0x16b)],_0x296659=_0x2e8157[_0x3dff8f(0x738)],_0x36ed0e=VisuMZ['ApplyEasing']((_0x296659-_0x21196a)/_0x296659,_0x109e91),_0x86dbd5=VisuMZ[_0x3dff8f(0x8b2)]((_0x296659-_0x21196a+0x1)/_0x296659,_0x109e91),_0x13087f=(_0xca5e52-_0xecfe4c*_0x36ed0e)/(0x1-_0x36ed0e);return _0x13087f+(_0xecfe4c-_0x13087f)*_0x86dbd5;},VisuMZ[_0x55d321(0x886)]['Game_Action_itemHit']=Game_Action[_0x55d321(0x2a8)]['itemHit'],Game_Action[_0x55d321(0x2a8)][_0x55d321(0x6ae)]=function(_0x2b155b){const _0x57df36=_0x55d321;return VisuMZ['CoreEngine']['Settings']['QoL'][_0x57df36(0x47c)]?this[_0x57df36(0x7cb)](_0x2b155b):VisuMZ[_0x57df36(0x886)][_0x57df36(0x862)][_0x57df36(0x2b5)](this,_0x2b155b);},Game_Action[_0x55d321(0x2a8)][_0x55d321(0x7cb)]=function(_0x52cc2c){const _0x50580b=_0x55d321,_0x1eef2f=this[_0x50580b(0x84d)](_0x52cc2c),_0x35951d=this['subjectHitRate'](_0x52cc2c),_0x16d60a=this[_0x50580b(0x143)](_0x52cc2c);return _0x1eef2f*(_0x35951d-_0x16d60a);},VisuMZ[_0x55d321(0x886)]['Game_Action_itemEva']=Game_Action[_0x55d321(0x2a8)]['itemEva'],Game_Action[_0x55d321(0x2a8)][_0x55d321(0x3b0)]=function(_0x6887ed){const _0x115672=_0x55d321;return VisuMZ[_0x115672(0x886)]['Settings']['QoL'][_0x115672(0x47c)]?0x0:VisuMZ[_0x115672(0x886)][_0x115672(0x68a)][_0x115672(0x2b5)](this,_0x6887ed);},Game_Action[_0x55d321(0x2a8)][_0x55d321(0x84d)]=function(_0x36823f){const _0x336f8b=_0x55d321;return this['item']()[_0x336f8b(0x148)]*0.01;},Game_Action[_0x55d321(0x2a8)]['subjectHitRate']=function(_0x10755b){const _0x3ed7cb=_0x55d321;if(VisuMZ[_0x3ed7cb(0x886)][_0x3ed7cb(0x530)][_0x3ed7cb(0x6f5)][_0x3ed7cb(0x368)]&&this[_0x3ed7cb(0x29f)]())return 0x1;return this[_0x3ed7cb(0x1a1)]()?VisuMZ['CoreEngine']['Settings'][_0x3ed7cb(0x6f5)][_0x3ed7cb(0x368)]&&this[_0x3ed7cb(0x222)]()['isActor']()?this['subject']()['hit']+0.05:this[_0x3ed7cb(0x222)]()[_0x3ed7cb(0x5a2)]:0x1;},Game_Action['prototype'][_0x55d321(0x143)]=function(_0x28b8ac){const _0x96df27=_0x55d321;if(this[_0x96df27(0x222)]()[_0x96df27(0x46f)]()===_0x28b8ac[_0x96df27(0x46f)]())return 0x0;if(this[_0x96df27(0x1a1)]())return VisuMZ[_0x96df27(0x886)]['Settings']['QoL'][_0x96df27(0x368)]&&_0x28b8ac[_0x96df27(0x44b)]()?_0x28b8ac[_0x96df27(0x225)]-0.05:_0x28b8ac[_0x96df27(0x225)];else return this['isMagical']()?_0x28b8ac['mev']:0x0;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x528)]=Game_Action['prototype'][_0x55d321(0x4fa)],Game_Action['prototype'][_0x55d321(0x4fa)]=function(_0x31506d){const _0xe0ab=_0x55d321;VisuMZ[_0xe0ab(0x886)][_0xe0ab(0x528)][_0xe0ab(0x2b5)](this,_0x31506d);if(VisuMZ[_0xe0ab(0x886)][_0xe0ab(0x530)][_0xe0ab(0x6f5)][_0xe0ab(0x47c)])return;const _0x5d5a26=_0x31506d[_0xe0ab(0x524)]();_0x5d5a26[_0xe0ab(0x777)]&&(0x1-this[_0xe0ab(0x3b0)](_0x31506d)>this[_0xe0ab(0x6ae)](_0x31506d)&&(_0x5d5a26['missed']=![],_0x5d5a26[_0xe0ab(0x6a2)]=!![]));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x49b)]=Game_BattlerBase['prototype'][_0x55d321(0x5dc)],Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x5dc)]=function(){const _0x791e78=_0x55d321;this['_cache']={},VisuMZ['CoreEngine'][_0x791e78(0x49b)][_0x791e78(0x2b5)](this);},VisuMZ[_0x55d321(0x886)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0x55d321(0x1cc)],Game_BattlerBase['prototype'][_0x55d321(0x1cc)]=function(){const _0x3757f7=_0x55d321;this['_cache']={},VisuMZ[_0x3757f7(0x886)]['Game_BattlerBase_refresh'][_0x3757f7(0x2b5)](this);},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x25d)]=function(_0x576c2c){const _0x1a78d5=_0x55d321;return this[_0x1a78d5(0x196)]=this[_0x1a78d5(0x196)]||{},this[_0x1a78d5(0x196)][_0x576c2c]!==undefined;},VisuMZ['CoreEngine'][_0x55d321(0x1ee)]=function(_0x143d1f){const _0x5d7bae=_0x55d321;return _0x143d1f=_0x143d1f||'',_0x143d1f='\x20'+_0x143d1f,(VisuMZ[_0x5d7bae(0x886)][_0x5d7bae(0x530)]['Param'][_0x5d7bae(0x2b2)]??!![])&&(_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\s(?:USER|THIS)\.mhp\b/gi,_0x5d7bae(0x6cd)),_0x143d1f=_0x143d1f['replace'](/\s(?:USER|THIS)\.mmp\b/gi,_0x5d7bae(0x320)),_0x143d1f=_0x143d1f['replace'](/\s(?:USER|THIS)\.atk\b/gi,_0x5d7bae(0x1ec)),_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\s(?:USER|THIS)\.def\b/gi,_0x5d7bae(0x882)),_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\s(?:USER|THIS)\.mat\b/gi,_0x5d7bae(0x274)),_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\s(?:USER|THIS)\.mdf\b/gi,_0x5d7bae(0x470)),_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\s(?:USER|THIS)\.agi\b/gi,_0x5d7bae(0x586)),_0x143d1f=_0x143d1f['replace'](/\s(?:USER|THIS)\.luk\b/gi,'this.paramBase(7)'),_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\s(?:USER|THIS)\.param\(/gi,_0x5d7bae(0x7a8))),_0x143d1f=_0x143d1f[_0x5d7bae(0x678)](/\suser\./gi,'\x20this.'),_0x143d1f;},Game_BattlerBase['prototype'][_0x55d321(0x30a)]=function(_0x275206){const _0x39e47a=_0x55d321,_0x22e4a7=(_0x12ddba,_0x175f79)=>{const _0x4a96d0=_0xcf9c;if(!_0x175f79)return _0x12ddba;if(_0x175f79[_0x4a96d0(0x291)][_0x4a96d0(0x362)](VisuMZ[_0x4a96d0(0x886)][_0x4a96d0(0x157)][_0x4a96d0(0x30a)][_0x275206])){var _0x30eef3=Number(RegExp['$1']);_0x12ddba+=_0x30eef3;}if(_0x175f79[_0x4a96d0(0x291)]['match'](VisuMZ[_0x4a96d0(0x886)][_0x4a96d0(0x157)][_0x4a96d0(0x5a7)][_0x275206])){var _0x349a21=String(RegExp['$1']);_0x349a21=VisuMZ[_0x4a96d0(0x886)][_0x4a96d0(0x1ee)](_0x349a21);try{_0x12ddba+=eval(_0x349a21);}catch(_0x35a96f){if($gameTemp[_0x4a96d0(0x25f)]())console[_0x4a96d0(0x35d)](_0x35a96f);}}return _0x12ddba;};return this['traitObjects']()[_0x39e47a(0x21a)](_0x22e4a7,this['_paramPlus'][_0x275206]);},Game_BattlerBase['prototype'][_0x55d321(0x8f2)]=function(_0x425ea7){const _0x571217=_0x55d321;var _0x3e2e7f=_0x571217(0x1cb)+(this[_0x571217(0x46f)]()?_0x571217(0x916):'Enemy')+_0x571217(0x454)+_0x425ea7;if(this[_0x571217(0x25d)](_0x3e2e7f))return this['_cache'][_0x3e2e7f];this[_0x571217(0x196)][_0x3e2e7f]=eval(VisuMZ[_0x571217(0x886)][_0x571217(0x530)][_0x571217(0x3f0)][_0x3e2e7f]);const _0x4a231f=(_0x59e9d2,_0x1590fe)=>{const _0x17227d=_0x571217;if(!_0x1590fe)return _0x59e9d2;if(_0x1590fe[_0x17227d(0x291)]['match'](VisuMZ[_0x17227d(0x886)]['RegExp'][_0x17227d(0x8f2)][_0x425ea7])){var _0x168ca5=Number(RegExp['$1']);if(_0x168ca5===0x0)_0x168ca5=Number['MAX_SAFE_INTEGER'];_0x59e9d2=Math['max'](_0x59e9d2,_0x168ca5);}if(_0x1590fe[_0x17227d(0x291)]['match'](VisuMZ[_0x17227d(0x886)][_0x17227d(0x157)]['paramMaxJS'][_0x425ea7])){var _0x56db13=String(RegExp['$1']);_0x56db13=VisuMZ['CoreEngine'][_0x17227d(0x1ee)](_0x56db13);try{_0x59e9d2=Math[_0x17227d(0x548)](_0x59e9d2,Number(eval(_0x56db13)));}catch(_0x37d8d0){if($gameTemp['isPlaytest']())console[_0x17227d(0x35d)](_0x37d8d0);}}return _0x59e9d2;};if(this['_cache'][_0x3e2e7f]===0x0)this[_0x571217(0x196)][_0x3e2e7f]=Number[_0x571217(0x38a)];return this[_0x571217(0x196)][_0x3e2e7f]=this[_0x571217(0x263)]()['reduce'](_0x4a231f,this[_0x571217(0x196)][_0x3e2e7f]),this[_0x571217(0x196)][_0x3e2e7f];},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x47b)]=function(_0x1d8379){const _0x2aa127=_0x55d321,_0x33aa78=this['traitsPi'](Game_BattlerBase['TRAIT_PARAM'],_0x1d8379),_0x5df021=(_0x361d90,_0x55df82)=>{const _0x63bff=_0xcf9c;if(!_0x55df82)return _0x361d90;if(_0x55df82[_0x63bff(0x291)][_0x63bff(0x362)](VisuMZ[_0x63bff(0x886)]['RegExp'][_0x63bff(0x31a)][_0x1d8379])){var _0x509842=Number(RegExp['$1'])/0x64;_0x361d90*=_0x509842;}if(_0x55df82['note'][_0x63bff(0x362)](VisuMZ['CoreEngine']['RegExp'][_0x63bff(0x4a4)][_0x1d8379])){var _0x509842=Number(RegExp['$1']);_0x361d90*=_0x509842;}if(_0x55df82[_0x63bff(0x291)]['match'](VisuMZ[_0x63bff(0x886)][_0x63bff(0x157)][_0x63bff(0x624)][_0x1d8379])){var _0x38f0a7=String(RegExp['$1']);_0x38f0a7=VisuMZ[_0x63bff(0x886)][_0x63bff(0x1ee)](_0x38f0a7);try{_0x361d90*=eval(_0x38f0a7);}catch(_0x3f83d3){if($gameTemp['isPlaytest']())console[_0x63bff(0x35d)](_0x3f83d3);}}return _0x361d90;};return this[_0x2aa127(0x263)]()[_0x2aa127(0x21a)](_0x5df021,_0x33aa78);},Game_BattlerBase['prototype'][_0x55d321(0x8b6)]=function(_0x36c12f){const _0x5bf8b0=_0x55d321,_0x3d1d70=(_0x34b401,_0x2f71ee)=>{const _0x14d553=_0xcf9c;if(!_0x2f71ee)return _0x34b401;if(_0x2f71ee[_0x14d553(0x291)][_0x14d553(0x362)](VisuMZ[_0x14d553(0x886)][_0x14d553(0x157)][_0x14d553(0x4b9)][_0x36c12f])){var _0x3e832e=Number(RegExp['$1']);_0x34b401+=_0x3e832e;}if(_0x2f71ee[_0x14d553(0x291)][_0x14d553(0x362)](VisuMZ[_0x14d553(0x886)][_0x14d553(0x157)]['paramFlatJS'][_0x36c12f])){var _0x5459e1=String(RegExp['$1']);_0x5459e1=VisuMZ[_0x14d553(0x886)]['JsReplaceUserVar'](_0x5459e1);try{_0x34b401+=eval(_0x5459e1);}catch(_0x291197){if($gameTemp['isPlaytest']())console[_0x14d553(0x35d)](_0x291197);}}return _0x34b401;};return this[_0x5bf8b0(0x263)]()[_0x5bf8b0(0x21a)](_0x3d1d70,0x0);},Game_BattlerBase['prototype'][_0x55d321(0x652)]=function(_0x53fb8b){const _0x3b044c=_0x55d321;let _0x47b198=_0x3b044c(0x652)+_0x53fb8b+_0x3b044c(0x37d);if(this[_0x3b044c(0x25d)](_0x47b198))return this['_cache'][_0x47b198];return this[_0x3b044c(0x196)][_0x47b198]=Math[_0x3b044c(0x69f)](VisuMZ['CoreEngine'][_0x3b044c(0x530)][_0x3b044c(0x3f0)][_0x3b044c(0x6ce)]['call'](this,_0x53fb8b)),this[_0x3b044c(0x196)][_0x47b198];},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x75b)]=function(_0x5f223a){const _0x4ffff0=_0x55d321,_0x3129d6=(_0x7606e,_0x2bb487)=>{const _0x39511b=_0xcf9c;if(!_0x2bb487)return _0x7606e;if(_0x2bb487['note'][_0x39511b(0x362)](VisuMZ[_0x39511b(0x886)][_0x39511b(0x157)]['xparamPlus1'][_0x5f223a])){var _0x367ccf=Number(RegExp['$1'])/0x64;_0x7606e+=_0x367ccf;}if(_0x2bb487['note'][_0x39511b(0x362)](VisuMZ[_0x39511b(0x886)][_0x39511b(0x157)][_0x39511b(0x822)][_0x5f223a])){var _0x367ccf=Number(RegExp['$1']);_0x7606e+=_0x367ccf;}if(_0x2bb487[_0x39511b(0x291)][_0x39511b(0x362)](VisuMZ[_0x39511b(0x886)][_0x39511b(0x157)]['xparamPlusJS'][_0x5f223a])){var _0x5a815c=String(RegExp['$1']);_0x5a815c=VisuMZ[_0x39511b(0x886)][_0x39511b(0x1ee)](_0x5a815c);try{_0x7606e+=eval(_0x5a815c);}catch(_0xc0dc0a){if($gameTemp[_0x39511b(0x25f)]())console[_0x39511b(0x35d)](_0xc0dc0a);}}return _0x7606e;};return this[_0x4ffff0(0x263)]()['reduce'](_0x3129d6,0x0);},Game_BattlerBase['prototype']['xparamRate']=function(_0xa2d896){const _0x970fff=_0x55d321,_0x17b517=(_0x8ca4c2,_0x88aaae)=>{const _0x36fbc1=_0xcf9c;if(!_0x88aaae)return _0x8ca4c2;if(_0x88aaae['note'][_0x36fbc1(0x362)](VisuMZ[_0x36fbc1(0x886)][_0x36fbc1(0x157)]['xparamRate1'][_0xa2d896])){var _0x5c79cb=Number(RegExp['$1'])/0x64;_0x8ca4c2*=_0x5c79cb;}if(_0x88aaae[_0x36fbc1(0x291)][_0x36fbc1(0x362)](VisuMZ[_0x36fbc1(0x886)][_0x36fbc1(0x157)][_0x36fbc1(0x4ea)][_0xa2d896])){var _0x5c79cb=Number(RegExp['$1']);_0x8ca4c2*=_0x5c79cb;}if(_0x88aaae[_0x36fbc1(0x291)][_0x36fbc1(0x362)](VisuMZ['CoreEngine'][_0x36fbc1(0x157)]['xparamRateJS'][_0xa2d896])){var _0x2dee64=String(RegExp['$1']);_0x2dee64=VisuMZ[_0x36fbc1(0x886)][_0x36fbc1(0x1ee)](_0x2dee64);try{_0x8ca4c2*=eval(_0x2dee64);}catch(_0xec9ce){if($gameTemp[_0x36fbc1(0x25f)]())console[_0x36fbc1(0x35d)](_0xec9ce);}}return _0x8ca4c2;};return this[_0x970fff(0x263)]()[_0x970fff(0x21a)](_0x17b517,0x1);},Game_BattlerBase['prototype'][_0x55d321(0x31f)]=function(_0x19695f){const _0xe9d6ec=_0x55d321,_0x457b00=(_0xf8044,_0x264869)=>{const _0x36793a=_0xcf9c;if(!_0x264869)return _0xf8044;if(_0x264869[_0x36793a(0x291)][_0x36793a(0x362)](VisuMZ[_0x36793a(0x886)][_0x36793a(0x157)][_0x36793a(0x26c)][_0x19695f])){var _0x42d2bf=Number(RegExp['$1'])/0x64;_0xf8044+=_0x42d2bf;}if(_0x264869[_0x36793a(0x291)][_0x36793a(0x362)](VisuMZ[_0x36793a(0x886)][_0x36793a(0x157)][_0x36793a(0x597)][_0x19695f])){var _0x42d2bf=Number(RegExp['$1']);_0xf8044+=_0x42d2bf;}if(_0x264869[_0x36793a(0x291)]['match'](VisuMZ[_0x36793a(0x886)][_0x36793a(0x157)][_0x36793a(0x45c)][_0x19695f])){var _0x4fad1b=String(RegExp['$1']);_0x4fad1b=VisuMZ['CoreEngine'][_0x36793a(0x1ee)](_0x4fad1b);try{_0xf8044+=eval(_0x4fad1b);}catch(_0x5741b7){if($gameTemp[_0x36793a(0x25f)]())console[_0x36793a(0x35d)](_0x5741b7);}}return _0xf8044;};return this[_0xe9d6ec(0x263)]()['reduce'](_0x457b00,0x0);},Game_BattlerBase['prototype'][_0x55d321(0x3f6)]=function(_0x28e73c){const _0x1d89e7=_0x55d321;let _0x3e9397=_0x1d89e7(0x3f6)+_0x28e73c+'Total';if(this[_0x1d89e7(0x25d)](_0x3e9397))return this[_0x1d89e7(0x196)][_0x3e9397];return this[_0x1d89e7(0x196)][_0x3e9397]=VisuMZ[_0x1d89e7(0x886)][_0x1d89e7(0x530)]['Param'][_0x1d89e7(0x3f8)][_0x1d89e7(0x2b5)](this,_0x28e73c),this['_cache'][_0x3e9397];},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x3d8)]=function(_0x40f2dd){const _0x4abd34=_0x55d321,_0x44a748=(_0x16da3f,_0xaf0ff3)=>{const _0x41c7b4=_0xcf9c;if(!_0xaf0ff3)return _0x16da3f;if(_0xaf0ff3[_0x41c7b4(0x291)][_0x41c7b4(0x362)](VisuMZ[_0x41c7b4(0x886)]['RegExp']['sparamPlus1'][_0x40f2dd])){var _0x9db5ba=Number(RegExp['$1'])/0x64;_0x16da3f+=_0x9db5ba;}if(_0xaf0ff3[_0x41c7b4(0x291)][_0x41c7b4(0x362)](VisuMZ[_0x41c7b4(0x886)][_0x41c7b4(0x157)]['sparamPlus2'][_0x40f2dd])){var _0x9db5ba=Number(RegExp['$1']);_0x16da3f+=_0x9db5ba;}if(_0xaf0ff3[_0x41c7b4(0x291)]['match'](VisuMZ[_0x41c7b4(0x886)][_0x41c7b4(0x157)][_0x41c7b4(0x188)][_0x40f2dd])){var _0x2b1490=String(RegExp['$1']);_0x2b1490=VisuMZ[_0x41c7b4(0x886)][_0x41c7b4(0x1ee)](_0x2b1490);try{_0x16da3f+=eval(_0x2b1490);}catch(_0x327793){if($gameTemp[_0x41c7b4(0x25f)]())console[_0x41c7b4(0x35d)](_0x327793);}}return _0x16da3f;};return this[_0x4abd34(0x263)]()['reduce'](_0x44a748,0x0);},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x6a4)]=function(_0x45ed05){const _0x5c0490=_0x55d321,_0x34dc76=(_0x58de87,_0x48cad7)=>{const _0x1aa558=_0xcf9c;if(!_0x48cad7)return _0x58de87;if(_0x48cad7[_0x1aa558(0x291)][_0x1aa558(0x362)](VisuMZ['CoreEngine']['RegExp'][_0x1aa558(0x287)][_0x45ed05])){var _0x2fc3fe=Number(RegExp['$1'])/0x64;_0x58de87*=_0x2fc3fe;}if(_0x48cad7[_0x1aa558(0x291)][_0x1aa558(0x362)](VisuMZ[_0x1aa558(0x886)][_0x1aa558(0x157)][_0x1aa558(0x3b6)][_0x45ed05])){var _0x2fc3fe=Number(RegExp['$1']);_0x58de87*=_0x2fc3fe;}if(_0x48cad7[_0x1aa558(0x291)][_0x1aa558(0x362)](VisuMZ['CoreEngine'][_0x1aa558(0x157)][_0x1aa558(0x79f)][_0x45ed05])){var _0x1c9ce3=String(RegExp['$1']);_0x1c9ce3=VisuMZ[_0x1aa558(0x886)][_0x1aa558(0x1ee)](_0x1c9ce3);try{_0x58de87*=eval(_0x1c9ce3);}catch(_0x5d134d){if($gameTemp[_0x1aa558(0x25f)]())console['log'](_0x5d134d);}}return _0x58de87;};return this[_0x5c0490(0x263)]()[_0x5c0490(0x21a)](_0x34dc76,0x1);},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x31b)]=function(_0x14f7e1){const _0xfbd866=(_0x283047,_0x22c0bc)=>{const _0x1b5cb0=_0xcf9c;if(!_0x22c0bc)return _0x283047;if(_0x22c0bc['note'][_0x1b5cb0(0x362)](VisuMZ[_0x1b5cb0(0x886)][_0x1b5cb0(0x157)][_0x1b5cb0(0x625)][_0x14f7e1])){var _0x3f5f3d=Number(RegExp['$1'])/0x64;_0x283047+=_0x3f5f3d;}if(_0x22c0bc['note'][_0x1b5cb0(0x362)](VisuMZ[_0x1b5cb0(0x886)][_0x1b5cb0(0x157)][_0x1b5cb0(0x16e)][_0x14f7e1])){var _0x3f5f3d=Number(RegExp['$1']);_0x283047+=_0x3f5f3d;}if(_0x22c0bc[_0x1b5cb0(0x291)][_0x1b5cb0(0x362)](VisuMZ['CoreEngine']['RegExp'][_0x1b5cb0(0x1ea)][_0x14f7e1])){var _0x500443=String(RegExp['$1']);_0x500443=VisuMZ[_0x1b5cb0(0x886)][_0x1b5cb0(0x1ee)](_0x500443);try{_0x283047+=eval(_0x500443);}catch(_0x2ef1eb){if($gameTemp[_0x1b5cb0(0x25f)]())console[_0x1b5cb0(0x35d)](_0x2ef1eb);}}return _0x283047;};return this['traitObjects']()['reduce'](_0xfbd866,0x0);},Game_BattlerBase[_0x55d321(0x2a8)][_0x55d321(0x432)]=function(_0x1c70a6){const _0x2e5c26=_0x55d321;let _0x34047c=_0x2e5c26(0x432)+_0x1c70a6+'Total';if(this[_0x2e5c26(0x25d)](_0x34047c))return this[_0x2e5c26(0x196)][_0x34047c];return this['_cache'][_0x34047c]=VisuMZ[_0x2e5c26(0x886)][_0x2e5c26(0x530)]['Param']['SParameterFormula'][_0x2e5c26(0x2b5)](this,_0x1c70a6),this[_0x2e5c26(0x196)][_0x34047c];},Game_BattlerBase[_0x55d321(0x2a8)]['paramValueByName']=function(_0xe11145,_0x1c3536){const _0x1350a1=_0x55d321;if(typeof paramId===_0x1350a1(0x15b))return this[_0x1350a1(0x652)](_0xe11145);_0xe11145=String(_0xe11145||'')[_0x1350a1(0x539)]();if(_0xe11145===_0x1350a1(0x8aa))return this['param'](0x0);if(_0xe11145===_0x1350a1(0x674))return this['param'](0x1);if(_0xe11145===_0x1350a1(0x3ad))return this[_0x1350a1(0x652)](0x2);if(_0xe11145==='DEF')return this[_0x1350a1(0x652)](0x3);if(_0xe11145===_0x1350a1(0x840))return this[_0x1350a1(0x652)](0x4);if(_0xe11145===_0x1350a1(0x236))return this[_0x1350a1(0x652)](0x5);if(_0xe11145===_0x1350a1(0x343))return this[_0x1350a1(0x652)](0x6);if(_0xe11145==='LUK')return this[_0x1350a1(0x652)](0x7);if(_0xe11145===_0x1350a1(0x592))return _0x1c3536?String(Math['round'](this[_0x1350a1(0x3f6)](0x0)*0x64))+'%':this[_0x1350a1(0x3f6)](0x0);if(_0xe11145===_0x1350a1(0x260))return _0x1c3536?String(Math['round'](this[_0x1350a1(0x3f6)](0x1)*0x64))+'%':this[_0x1350a1(0x3f6)](0x1);if(_0xe11145===_0x1350a1(0x4c3))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x3f6)](0x2)*0x64))+'%':this[_0x1350a1(0x3f6)](0x2);if(_0xe11145==='CEV')return _0x1c3536?String(Math[_0x1350a1(0x69f)](this['xparam'](0x3)*0x64))+'%':this[_0x1350a1(0x3f6)](0x3);if(_0xe11145===_0x1350a1(0x141))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x3f6)](0x4)*0x64))+'%':this['xparam'](0x4);if(_0xe11145===_0x1350a1(0x1a2))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x3f6)](0x5)*0x64))+'%':this[_0x1350a1(0x3f6)](0x5);if(_0xe11145===_0x1350a1(0x682))return _0x1c3536?String(Math['round'](this[_0x1350a1(0x3f6)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0xe11145==='HRG')return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x3f6)](0x7)*0x64))+'%':this[_0x1350a1(0x3f6)](0x7);if(_0xe11145==='MRG')return _0x1c3536?String(Math[_0x1350a1(0x69f)](this['xparam'](0x8)*0x64))+'%':this[_0x1350a1(0x3f6)](0x8);if(_0xe11145===_0x1350a1(0x712))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x3f6)](0x9)*0x64))+'%':this[_0x1350a1(0x3f6)](0x9);if(_0xe11145==='TGR')return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x432)](0x0)*0x64))+'%':this[_0x1350a1(0x432)](0x0);if(_0xe11145===_0x1350a1(0x3ac))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x432)](0x1)*0x64))+'%':this[_0x1350a1(0x432)](0x1);if(_0xe11145===_0x1350a1(0x52b))return _0x1c3536?String(Math['round'](this['sparam'](0x2)*0x64))+'%':this[_0x1350a1(0x432)](0x2);if(_0xe11145===_0x1350a1(0x5b8))return _0x1c3536?String(Math['round'](this[_0x1350a1(0x432)](0x3)*0x64))+'%':this['sparam'](0x3);if(_0xe11145==='MCR')return _0x1c3536?String(Math['round'](this[_0x1350a1(0x432)](0x4)*0x64))+'%':this[_0x1350a1(0x432)](0x4);if(_0xe11145===_0x1350a1(0x333))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x432)](0x5)*0x64))+'%':this[_0x1350a1(0x432)](0x5);if(_0xe11145===_0x1350a1(0x941))return _0x1c3536?String(Math['round'](this['sparam'](0x6)*0x64))+'%':this[_0x1350a1(0x432)](0x6);if(_0xe11145===_0x1350a1(0x27d))return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x432)](0x7)*0x64))+'%':this[_0x1350a1(0x432)](0x7);if(_0xe11145===_0x1350a1(0x6c9))return _0x1c3536?String(Math['round'](this[_0x1350a1(0x432)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0xe11145==='EXR')return _0x1c3536?String(Math[_0x1350a1(0x69f)](this[_0x1350a1(0x432)](0x9)*0x64))+'%':this[_0x1350a1(0x432)](0x9);if(VisuMZ[_0x1350a1(0x886)][_0x1350a1(0x6e6)][_0xe11145]){const _0x30beed=VisuMZ[_0x1350a1(0x886)][_0x1350a1(0x6e6)][_0xe11145],_0x42146d=this[_0x30beed];return VisuMZ[_0x1350a1(0x886)][_0x1350a1(0x871)][_0xe11145]===_0x1350a1(0x807)?_0x42146d:_0x1c3536?String(Math[_0x1350a1(0x69f)](_0x42146d*0x64))+'%':_0x42146d;}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x2eec1f=_0x55d321;return this[_0x2eec1f(0x265)]()&&this['_hp']<this[_0x2eec1f(0x4c6)]*VisuMZ[_0x2eec1f(0x886)][_0x2eec1f(0x530)]['Param'][_0x2eec1f(0x580)];},Game_Battler['prototype'][_0x55d321(0x6d0)]=function(){const _0x5aec51=_0x55d321;SoundManager[_0x5aec51(0x306)](),this[_0x5aec51(0x396)](_0x5aec51(0x5c4));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x290)]=Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x271)],Game_Actor['prototype']['paramBase']=function(_0x409c4f){const _0x3ccf5e=_0x55d321;if(this[_0x3ccf5e(0x42d)]>0x63)return this[_0x3ccf5e(0x79a)](_0x409c4f);return VisuMZ[_0x3ccf5e(0x886)][_0x3ccf5e(0x290)][_0x3ccf5e(0x2b5)](this,_0x409c4f);},Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x79a)]=function(_0x30b350){const _0x4ac8f8=_0x55d321,_0x5b13cb=this[_0x4ac8f8(0x64c)]()[_0x4ac8f8(0x2bf)][_0x30b350][0x63],_0x490aa5=this['currentClass']()[_0x4ac8f8(0x2bf)][_0x30b350][0x62];return _0x5b13cb+(_0x5b13cb-_0x490aa5)*(this['level']-0x63);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x1b5)]=Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x1be)],Game_Actor['prototype']['changeClass']=function(_0x334423,_0x1532a4){const _0x31e010=_0x55d321;$gameTemp[_0x31e010(0x806)]=!![],VisuMZ['CoreEngine'][_0x31e010(0x1b5)][_0x31e010(0x2b5)](this,_0x334423,_0x1532a4),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x344)]=Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x7ea)],Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x7ea)]=function(){const _0x683c4a=_0x55d321;VisuMZ['CoreEngine'][_0x683c4a(0x344)][_0x683c4a(0x2b5)](this);if(!$gameTemp[_0x683c4a(0x806)])this['levelUpRecovery']();},Game_Actor['prototype']['levelUpRecovery']=function(){const _0xffbf9=_0x55d321;this['_cache']={};if(VisuMZ[_0xffbf9(0x886)][_0xffbf9(0x530)][_0xffbf9(0x6f5)]['LevelUpFullHp'])this[_0xffbf9(0x79d)]=this['mhp'];if(VisuMZ[_0xffbf9(0x886)][_0xffbf9(0x530)]['QoL'][_0xffbf9(0x569)])this[_0xffbf9(0x2f2)]=this['mmp'];},Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x3e4)]=function(){const _0x39089a=_0x55d321;if(this[_0x39089a(0x4d4)]())return 0x1;const _0x25bcb8=this[_0x39089a(0x48f)]()-this['currentLevelExp'](),_0x547d7d=this[_0x39089a(0x67b)]()-this[_0x39089a(0x910)]();return(_0x547d7d/_0x25bcb8)[_0x39089a(0x19a)](0x0,0x1);},Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x263)]=function(){const _0x41c2fc=_0x55d321,_0x371dd1=Game_Battler[_0x41c2fc(0x2a8)][_0x41c2fc(0x263)]['call'](this);for(const _0x2dbe52 of this[_0x41c2fc(0x213)]()){_0x2dbe52&&_0x371dd1[_0x41c2fc(0x582)](_0x2dbe52);}return _0x371dd1[_0x41c2fc(0x582)](this[_0x41c2fc(0x64c)](),this[_0x41c2fc(0x68e)]()),_0x371dd1;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x469)]=Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x202)],Game_Actor['prototype'][_0x55d321(0x202)]=function(){const _0x21518d=_0x55d321;if(!$gameParty[_0x21518d(0x754)]())return!![];return VisuMZ[_0x21518d(0x886)]['Game_Actor_isPreserveTp'][_0x21518d(0x2b5)](this);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x7a6)]=Game_Unit[_0x55d321(0x2a8)][_0x55d321(0x4c4)],Game_Unit[_0x55d321(0x2a8)][_0x55d321(0x4c4)]=function(_0xbab71b){const _0x4aec09=_0x55d321;this['_inBattle']=!![],VisuMZ[_0x4aec09(0x886)]['Game_Unit_onBattleStart'][_0x4aec09(0x2b5)](this,_0xbab71b);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x1b9)]=Game_Unit[_0x55d321(0x2a8)][_0x55d321(0x398)],Game_Unit[_0x55d321(0x2a8)][_0x55d321(0x398)]=function(){const _0x5a87a5=_0x55d321;for(const _0x4abaa4 of this[_0x5a87a5(0x6f6)]()){_0x4abaa4&&!_0x4abaa4['isPreserveTp']()&&_0x4abaa4[_0x5a87a5(0x872)]();}VisuMZ[_0x5a87a5(0x886)][_0x5a87a5(0x1b9)][_0x5a87a5(0x2b5)](this);},Object[_0x55d321(0x779)](Game_Enemy[_0x55d321(0x2a8)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x55d321(0x2a8)][_0x55d321(0x88f)]=function(){const _0x216c1b=_0x55d321;return this[_0x216c1b(0x824)]()[_0x216c1b(0x42d)];},Game_Enemy[_0x55d321(0x2a8)][_0x55d321(0x854)]=function(){const _0x295f0d=_0x55d321;!this[_0x295f0d(0x736)]&&(this['_screenY']+=Math[_0x295f0d(0x69f)]((Graphics[_0x295f0d(0x48d)]-0x270)/0x2),this['_screenY']-=Math[_0x295f0d(0x33d)]((Graphics[_0x295f0d(0x48d)]-Graphics['boxHeight'])/0x2),$gameSystem[_0x295f0d(0x3fb)]()?this[_0x295f0d(0x8ab)]-=Math[_0x295f0d(0x33d)]((Graphics[_0x295f0d(0x85f)]-Graphics[_0x295f0d(0x8d1)])/0x2):this['_screenX']+=Math[_0x295f0d(0x69f)]((Graphics['boxWidth']-0x330)/0x2)),this[_0x295f0d(0x736)]=!![];},Game_Party[_0x55d321(0x2a8)][_0x55d321(0x508)]=function(){const _0x845ab9=_0x55d321;return VisuMZ[_0x845ab9(0x886)]['Settings']['Gold'][_0x845ab9(0x423)];},VisuMZ['CoreEngine']['Game_Party_consumeItem']=Game_Party[_0x55d321(0x2a8)][_0x55d321(0x758)],Game_Party[_0x55d321(0x2a8)]['consumeItem']=function(_0x383a71){const _0xa7a73f=_0x55d321;if(VisuMZ[_0xa7a73f(0x886)][_0xa7a73f(0x530)][_0xa7a73f(0x6f5)]['KeyItemProtect']&&DataManager[_0xa7a73f(0x2d4)](_0x383a71))return;VisuMZ[_0xa7a73f(0x886)][_0xa7a73f(0x5dd)][_0xa7a73f(0x2b5)](this,_0x383a71);},Game_Party['prototype'][_0x55d321(0x8b3)]=function(){const _0x537db5=_0x55d321,_0x3ef0da=VisuMZ['CoreEngine']['Settings'][_0x537db5(0x6f5)],_0x372cef=_0x3ef0da[_0x537db5(0x1c9)]??0x63;let _0x1dbc64=[];(_0x3ef0da['BTestItems']??!![])&&(_0x1dbc64=_0x1dbc64[_0x537db5(0x3b1)]($dataItems));(_0x3ef0da[_0x537db5(0x4c0)]??!![])&&(_0x1dbc64=_0x1dbc64[_0x537db5(0x3b1)]($dataWeapons));(_0x3ef0da[_0x537db5(0x8ec)]??!![])&&(_0x1dbc64=_0x1dbc64[_0x537db5(0x3b1)]($dataArmors));for(const _0x4a0650 of _0x1dbc64){if(!_0x4a0650)continue;if(_0x4a0650[_0x537db5(0x7c4)][_0x537db5(0x214)]()<=0x0)continue;if(_0x4a0650[_0x537db5(0x7c4)][_0x537db5(0x362)](/-----/i))continue;this[_0x537db5(0x618)](_0x4a0650,_0x372cef);}},VisuMZ['CoreEngine'][_0x55d321(0x229)]=Game_Troop[_0x55d321(0x2a8)]['setup'],Game_Troop[_0x55d321(0x2a8)][_0x55d321(0x852)]=function(_0x597553){const _0x9b0738=_0x55d321;$gameTemp[_0x9b0738(0x183)](),$gameTemp[_0x9b0738(0x3b9)](_0x597553),VisuMZ[_0x9b0738(0x886)][_0x9b0738(0x229)][_0x9b0738(0x2b5)](this,_0x597553);},VisuMZ['CoreEngine'][_0x55d321(0x735)]=Game_Map['prototype'][_0x55d321(0x852)],Game_Map[_0x55d321(0x2a8)][_0x55d321(0x852)]=function(_0x37230d){const _0x25d257=_0x55d321;VisuMZ['CoreEngine'][_0x25d257(0x735)]['call'](this,_0x37230d),this[_0x25d257(0x760)](),this['setupCoreEngine'](_0x37230d),this[_0x25d257(0x936)]();},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x525)]=function(){const _0x5dc522=_0x55d321;this[_0x5dc522(0x289)]=VisuMZ[_0x5dc522(0x886)][_0x5dc522(0x530)][_0x5dc522(0x6f5)][_0x5dc522(0x22d)]||![];const _0x100d4d=VisuMZ['CoreEngine'][_0x5dc522(0x530)]['ScreenResolution'],_0x456ebb=$dataMap?$dataMap[_0x5dc522(0x291)]||'':'';if(_0x456ebb[_0x5dc522(0x362)](/<SHOW TILE SHADOWS>/i))this[_0x5dc522(0x289)]=![];else _0x456ebb[_0x5dc522(0x362)](/<HIDE TILE SHADOWS>/i)&&(this['_hideTileShadows']=!![]);if(_0x456ebb[_0x5dc522(0x362)](/<SCROLL LOCK X>/i))this[_0x5dc522(0x8fa)]()[_0x5dc522(0x411)]=!![],this[_0x5dc522(0x8fa)]()[_0x5dc522(0x1bd)]=_0x100d4d[_0x5dc522(0x156)];else _0x456ebb[_0x5dc522(0x362)](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x5dc522(0x8fa)]()[_0x5dc522(0x411)]=!![],this[_0x5dc522(0x8fa)]()[_0x5dc522(0x1bd)]=Number(RegExp['$1']));if(_0x456ebb[_0x5dc522(0x362)](/<SCROLL LOCK Y>/i))this[_0x5dc522(0x8fa)]()[_0x5dc522(0x248)]=!![],this[_0x5dc522(0x8fa)]()[_0x5dc522(0x8cf)]=_0x100d4d['DisplayLockY'];else _0x456ebb['match'](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x5dc522(0x8fa)]()[_0x5dc522(0x248)]=!![],this['centerCameraCheckData']()[_0x5dc522(0x8cf)]=Number(RegExp['$1']));},Game_Map['prototype']['areTileShadowsHidden']=function(){const _0x439d6e=_0x55d321;if(this[_0x439d6e(0x289)]===undefined)this['setupCoreEngine']();return this[_0x439d6e(0x289)];},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x760)]=function(){const _0x21519a=_0x55d321,_0xb98f0b=VisuMZ[_0x21519a(0x886)][_0x21519a(0x530)]['ScreenResolution'];this[_0x21519a(0x269)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0xb98f0b['AutoScrollLockX']){const _0x4a4dfc=Graphics[_0x21519a(0x85f)]/this[_0x21519a(0x694)]();_0x4a4dfc%0x1!==0x0&&Math[_0x21519a(0x74b)](_0x4a4dfc)===this[_0x21519a(0x85f)]()&&!this[_0x21519a(0x4bb)]()&&(this['_centerCameraCheck'][_0x21519a(0x411)]=!![],this['_centerCameraCheck'][_0x21519a(0x1bd)]=_0xb98f0b['DisplayLockX']||0x0);}if(_0xb98f0b[_0x21519a(0x866)]){const _0x1493d3=Graphics[_0x21519a(0x48d)]/this['tileHeight']();_0x1493d3%0x1!==0x0&&Math['ceil'](_0x1493d3)===this[_0x21519a(0x48d)]()&&!this[_0x21519a(0x7b4)]()&&(this[_0x21519a(0x269)][_0x21519a(0x248)]=!![],this[_0x21519a(0x269)][_0x21519a(0x8cf)]=_0xb98f0b[_0x21519a(0x813)]||0x0);}$gameScreen[_0x21519a(0x410)]()===0x1&&(this[_0x21519a(0x8fa)]()[_0x21519a(0x411)]&&(this[_0x21519a(0x21c)]=this['centerCameraCheckData']()[_0x21519a(0x1bd)]),this['centerCameraCheckData']()[_0x21519a(0x248)]&&(this[_0x21519a(0x3ee)]=this['centerCameraCheckData']()['displayY']));},VisuMZ['CoreEngine'][_0x55d321(0x5aa)]=Game_Map[_0x55d321(0x2a8)][_0x55d321(0x15d)],Game_Map[_0x55d321(0x2a8)]['setDisplayPos']=function(_0x58af95,_0x2a89d8){const _0x2643b4=_0x55d321;VisuMZ[_0x2643b4(0x886)]['Game_Map_setDisplayPos'][_0x2643b4(0x2b5)](this,_0x58af95,_0x2a89d8),$gameScreen['zoomScale']()===0x1&&(!this[_0x2643b4(0x4bb)]()&&this['centerCameraCheckData']()[_0x2643b4(0x411)]&&(this['_displayX']=this[_0x2643b4(0x8fa)]()[_0x2643b4(0x1bd)]),!this[_0x2643b4(0x7b4)]()&&this[_0x2643b4(0x8fa)]()[_0x2643b4(0x248)]&&(this[_0x2643b4(0x3ee)]=this[_0x2643b4(0x8fa)]()[_0x2643b4(0x8cf)]));},Game_Map['prototype']['centerCameraCheckData']=function(){const _0x48d913=_0x55d321;if(this[_0x48d913(0x269)]===undefined)this[_0x48d913(0x760)]();return this[_0x48d913(0x269)];},VisuMZ[_0x55d321(0x886)]['Game_Map_scrollDown']=Game_Map[_0x55d321(0x2a8)][_0x55d321(0x898)],Game_Map[_0x55d321(0x2a8)][_0x55d321(0x898)]=function(_0x45b4ab){const _0x38863a=_0x55d321;if(this[_0x38863a(0x8fa)]()['centerY']&&$gameScreen[_0x38863a(0x410)]()===0x1){this[_0x38863a(0x3ee)]=this[_0x38863a(0x8fa)]()[_0x38863a(0x8cf)];return;}VisuMZ[_0x38863a(0x886)]['Game_Map_scrollDown'][_0x38863a(0x2b5)](this,_0x45b4ab);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x4a6)]=Game_Map[_0x55d321(0x2a8)]['scrollLeft'],Game_Map[_0x55d321(0x2a8)][_0x55d321(0x86a)]=function(_0x3745a5){const _0x483d5f=_0x55d321;if(this[_0x483d5f(0x8fa)]()[_0x483d5f(0x411)]&&$gameScreen[_0x483d5f(0x410)]()===0x1){this['_displayX']=this[_0x483d5f(0x8fa)]()[_0x483d5f(0x1bd)];return;}VisuMZ[_0x483d5f(0x886)][_0x483d5f(0x4a6)][_0x483d5f(0x2b5)](this,_0x3745a5);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x2da)]=Game_Map[_0x55d321(0x2a8)]['scrollRight'],Game_Map['prototype'][_0x55d321(0x5f5)]=function(_0x342ea5){const _0x518a02=_0x55d321;if(this[_0x518a02(0x8fa)]()[_0x518a02(0x411)]&&$gameScreen[_0x518a02(0x410)]()===0x1){this[_0x518a02(0x21c)]=this[_0x518a02(0x8fa)]()['displayX'];return;}VisuMZ[_0x518a02(0x886)][_0x518a02(0x2da)][_0x518a02(0x2b5)](this,_0x342ea5);},VisuMZ[_0x55d321(0x886)]['Game_Map_scrollUp']=Game_Map[_0x55d321(0x2a8)]['scrollUp'],Game_Map['prototype'][_0x55d321(0x180)]=function(_0x4a9956){const _0x6a7071=_0x55d321;if(this[_0x6a7071(0x8fa)]()[_0x6a7071(0x248)]&&$gameScreen['zoomScale']()===0x1){this[_0x6a7071(0x3ee)]=this[_0x6a7071(0x8fa)]()[_0x6a7071(0x8cf)];return;}VisuMZ[_0x6a7071(0x886)][_0x6a7071(0x65b)][_0x6a7071(0x2b5)](this,_0x4a9956);},Game_Map['prototype'][_0x55d321(0x936)]=function(){const _0x4f9df5=_0x55d321;this['_tileExtendTerrainTags']={};const _0x590493=this[_0x4f9df5(0x8da)]();if(!_0x590493)return{};const _0x28c4a3=_0x590493[_0x4f9df5(0x291)]||'',_0x225be7=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x1cd38a={};const _0x264e63=_0x28c4a3['match'](_0x225be7);if(_0x264e63)for(const _0x2c39e6 of _0x264e63){_0x2c39e6[_0x4f9df5(0x362)](_0x225be7);const _0x58bf49=Number(RegExp['$1'])[_0x4f9df5(0x19a)](0x1,0x10),_0x4d5954=String(RegExp['$2'])[_0x4f9df5(0x60d)](',')[_0x4f9df5(0x8f0)](_0x4b9b8b=>Number(_0x4b9b8b)[_0x4f9df5(0x19a)](0x1,0x7));for(const _0x493e74 of _0x4d5954){_0x1cd38a[_0x493e74]=_0x58bf49;}}this[_0x4f9df5(0x376)]=_0x1cd38a;},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x445)]=function(){const _0x587310=_0x55d321;if(this[_0x587310(0x376)]===undefined)this[_0x587310(0x936)]();return this[_0x587310(0x376)];},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x77e)]=function(_0x1dc532){const _0x59f411=_0x55d321;if(_0x1dc532>=0x400)return![];const _0x46376e=$gameMap[_0x59f411(0x445)]();if(Object[_0x59f411(0x900)](_0x46376e)['length']<=0x0)return![];const _0x19b245=this[_0x59f411(0x294)](),_0x3ac44c=_0x19b245[_0x1dc532]>>0xc,_0x1d5f2e=_0x46376e[_0x3ac44c]||0x0;return _0x1d5f2e>0x0;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x901)]=Game_Map[_0x55d321(0x2a8)]['changeTileset'],Game_Map[_0x55d321(0x2a8)][_0x55d321(0x217)]=function(_0x1cbae6){const _0x4f4dd2=_0x55d321;VisuMZ[_0x4f4dd2(0x886)][_0x4f4dd2(0x901)][_0x4f4dd2(0x2b5)](this,_0x1cbae6),this[_0x4f4dd2(0x27c)](),SceneManager[_0x4f4dd2(0x43e)]['_spriteset'][_0x4f4dd2(0x264)]();},Game_Map['prototype']['refreshSpritesetForExtendedTiles']=function(){const _0x4a3ea8=_0x55d321,_0x34e8bf=this['getTileExtendTerrainTags']();if(Object[_0x4a3ea8(0x900)](_0x34e8bf)[_0x4a3ea8(0x7e5)]<=0x0)return;const _0x573b43=SceneManager[_0x4a3ea8(0x43e)][_0x4a3ea8(0x64d)];_0x573b43&&(_0x573b43[_0x4a3ea8(0x464)]&&_0x573b43[_0x4a3ea8(0x464)](),_0x573b43[_0x4a3ea8(0x6fa)]&&_0x573b43[_0x4a3ea8(0x6fa)]());},VisuMZ[_0x55d321(0x886)][_0x55d321(0x86b)]=Game_Character['prototype'][_0x55d321(0x3a2)],Game_Character[_0x55d321(0x2a8)][_0x55d321(0x3a2)]=function(_0x3d2e4e){const _0x23f3c8=_0x55d321;try{VisuMZ[_0x23f3c8(0x886)][_0x23f3c8(0x86b)][_0x23f3c8(0x2b5)](this,_0x3d2e4e);}catch(_0x3059b2){if($gameTemp[_0x23f3c8(0x25f)]())console[_0x23f3c8(0x35d)](_0x3059b2);}},Game_Player[_0x55d321(0x2a8)]['makeEncounterCount']=function(){const _0x290cc8=_0x55d321,_0x1a03fb=$gameMap[_0x290cc8(0x7de)]();this[_0x290cc8(0x749)]=Math['randomInt'](_0x1a03fb)+Math[_0x290cc8(0x388)](_0x1a03fb)+this[_0x290cc8(0x7ab)]();},Game_Player[_0x55d321(0x2a8)][_0x55d321(0x7ab)]=function(){const _0x3e8fa6=_0x55d321;return $dataMap&&$dataMap[_0x3e8fa6(0x291)]&&$dataMap['note'][_0x3e8fa6(0x362)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x3e8fa6(0x530)][_0x3e8fa6(0x6f5)][_0x3e8fa6(0x4f0)];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x345)]=Game_Event['prototype'][_0x55d321(0x2b0)],Game_Event[_0x55d321(0x2a8)]['isCollidedWithEvents']=function(_0x17802a,_0x1ca099){const _0x195858=_0x55d321;return this[_0x195858(0x4da)]()?this[_0x195858(0x5a1)](_0x17802a,_0x1ca099):VisuMZ[_0x195858(0x886)][_0x195858(0x345)][_0x195858(0x2b5)](this,_0x17802a,_0x1ca099);},Game_Event[_0x55d321(0x2a8)][_0x55d321(0x4da)]=function(){const _0x3684aa=_0x55d321;return VisuMZ[_0x3684aa(0x886)][_0x3684aa(0x530)][_0x3684aa(0x6f5)]['SmartEventCollisionPriority'];},Game_Event[_0x55d321(0x2a8)][_0x55d321(0x5a1)]=function(_0x44b908,_0x3157bd){const _0x4679b2=_0x55d321;if(!this[_0x4679b2(0x2fc)]())return![];else{const _0x5a61df=$gameMap[_0x4679b2(0x573)](_0x44b908,_0x3157bd)[_0x4679b2(0x4c9)](_0x247f4b=>_0x247f4b[_0x4679b2(0x2fc)]());return _0x5a61df[_0x4679b2(0x7e5)]>0x0;}},VisuMZ['CoreEngine'][_0x55d321(0x631)]=Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x776)],Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x776)]=function(_0x446ba3){const _0x50fad6=_0x55d321,_0x8c9c36=this['getCombinedScrollingText']();return _0x8c9c36[_0x50fad6(0x362)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x50fad6(0x363)](_0x8c9c36):VisuMZ[_0x50fad6(0x886)][_0x50fad6(0x631)]['call'](this,_0x446ba3);},Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x5a6)]=function(){const _0x540424=_0x55d321;let _0x44ccc0='',_0xf4fe2d=this[_0x540424(0x373)]+0x1;while(this['_list'][_0xf4fe2d]&&this[_0x540424(0x8e7)][_0xf4fe2d][_0x540424(0x699)]===0x195){_0x44ccc0+=this['_list'][_0xf4fe2d][_0x540424(0x5af)][0x0]+'\x0a',_0xf4fe2d++;}return _0x44ccc0;},Game_Interpreter['prototype'][_0x55d321(0x363)]=function(_0x519404){const _0x18d5db=_0x55d321;try{eval(_0x519404);}catch(_0x297444){$gameTemp[_0x18d5db(0x25f)]()&&(console['log']('Show\x20Scrolling\x20Text\x20Script\x20Error'),console[_0x18d5db(0x35d)](_0x297444));}return!![];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x2d5)]=Game_Interpreter[_0x55d321(0x2a8)]['command111'],Game_Interpreter[_0x55d321(0x2a8)]['command111']=function(_0x11560f){const _0x3c5784=_0x55d321;try{VisuMZ['CoreEngine']['Game_Interpreter_command111'][_0x3c5784(0x2b5)](this,_0x11560f);}catch(_0x5cefa8){$gameTemp[_0x3c5784(0x25f)]()&&(console[_0x3c5784(0x35d)](_0x3c5784(0x2fd)),console[_0x3c5784(0x35d)]('Script:\x20'+_0x11560f[0x1]),console[_0x3c5784(0x35d)](_0x5cefa8)),this[_0x3c5784(0x547)]();}return!![];},VisuMZ['CoreEngine'][_0x55d321(0x6b8)]=Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x581)],Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x581)]=function(_0x5afc9a){const _0x34218a=_0x55d321;try{VisuMZ[_0x34218a(0x886)][_0x34218a(0x6b8)][_0x34218a(0x2b5)](this,_0x5afc9a);}catch(_0x52caed){$gameTemp[_0x34218a(0x25f)]()&&(console[_0x34218a(0x35d)](_0x34218a(0x73f)),console['log'](_0x52caed));}return!![];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x6ff)]=Game_Interpreter['prototype']['command355'],Game_Interpreter['prototype'][_0x55d321(0x4a8)]=function(){const _0x5c056b=_0x55d321;let _0x2c84c1=this[_0x5c056b(0x334)]()[_0x5c056b(0x5af)][0x0]+'\x0a';while(this[_0x5c056b(0x742)]()===0x28f){this[_0x5c056b(0x373)]++,_0x2c84c1+=this[_0x5c056b(0x334)]()[_0x5c056b(0x5af)][0x0]+'\x0a';}try{eval(_0x2c84c1);}catch(_0x2ac0db){$gameTemp[_0x5c056b(0x25f)]()&&(console['log'](_0x5c056b(0x92e)[_0x5c056b(0x4a5)](this['eventId']())),console['log'](_0x5c056b(0x757)[_0x5c056b(0x4a5)](_0x2c84c1)),console['log'](_0x2ac0db));}return!![];},VisuMZ[_0x55d321(0x886)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x536)],Game_Interpreter['prototype'][_0x55d321(0x536)]=function(_0x5099f6){const _0x24be7a=_0x55d321;return $gameTemp[_0x24be7a(0x903)](this),VisuMZ['CoreEngine'][_0x24be7a(0x503)][_0x24be7a(0x2b5)](this,_0x5099f6);},Scene_Base['prototype'][_0x55d321(0x450)]=function(){const _0x37262d=_0x55d321;return VisuMZ[_0x37262d(0x886)][_0x37262d(0x530)]['UI'][_0x37262d(0x511)];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x688)]=function(){const _0x4d3ffa=_0x55d321;return VisuMZ['CoreEngine'][_0x4d3ffa(0x530)]['UI'][_0x4d3ffa(0x630)];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x77d)]=function(){const _0xa6bf6e=_0x55d321;return VisuMZ[_0xa6bf6e(0x886)][_0xa6bf6e(0x530)]['UI'][_0xa6bf6e(0x7c9)];},Scene_Base[_0x55d321(0x2a8)]['isRightInputMode']=function(){const _0xea3b1=_0x55d321;return VisuMZ[_0xea3b1(0x886)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x7dd)]=function(){const _0x5f23c0=_0x55d321;return VisuMZ[_0x5f23c0(0x886)][_0x5f23c0(0x530)]['UI'][_0x5f23c0(0x258)];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x5ff)]=function(){const _0x54142e=_0x55d321;return VisuMZ[_0x54142e(0x886)]['Settings']['UI'][_0x54142e(0x86d)];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x466)]=function(){const _0x54d7b6=_0x55d321;return VisuMZ[_0x54d7b6(0x886)]['Settings'][_0x54d7b6(0x76b)][_0x54d7b6(0x1b7)];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x38e)]=Scene_Base['prototype'][_0x55d321(0x175)],Scene_Base[_0x55d321(0x2a8)]['createWindowLayer']=function(){const _0x50e36a=_0x55d321;VisuMZ[_0x50e36a(0x886)][_0x50e36a(0x38e)]['call'](this),this['createButtonAssistWindow'](),this['createTextPopupWindow'](),this[_0x50e36a(0x2a3)]['x']=Math['round'](this['_windowLayer']['x']),this[_0x50e36a(0x2a3)]['y']=Math[_0x50e36a(0x69f)](this['_windowLayer']['y']);},Scene_Base['prototype'][_0x55d321(0x39d)]=function(){},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x4bf)]=function(){const _0x3cfad5=_0x55d321;this[_0x3cfad5(0x6d7)]=new Window_TextPopup(),this[_0x3cfad5(0x7af)](this[_0x3cfad5(0x6d7)]);},$textPopup=function(_0x52cbfc){const _0x30d028=_0x55d321,_0x1e8080=SceneManager[_0x30d028(0x43e)][_0x30d028(0x6d7)];_0x1e8080&&_0x1e8080['addQueue'](_0x52cbfc);},Scene_Base['prototype']['buttonAssistKey1']=function(){const _0x944078=_0x55d321;return TextManager[_0x944078(0x6af)]('pageup',_0x944078(0x7fb));},Scene_Base['prototype'][_0x55d321(0x228)]=function(){const _0x4c91e1=_0x55d321;return TextManager['getInputButtonString'](_0x4c91e1(0x6bf));},Scene_Base['prototype']['buttonAssistKey3']=function(){const _0x321c4d=_0x55d321;return TextManager[_0x321c4d(0x468)](_0x321c4d(0x298));},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x5c5)]=function(){const _0x42311c=_0x55d321;return TextManager[_0x42311c(0x468)]('ok');},Scene_Base[_0x55d321(0x2a8)]['buttonAssistKey5']=function(){const _0x2f9295=_0x55d321;return TextManager[_0x2f9295(0x468)](_0x2f9295(0x1ff));},Scene_Base[_0x55d321(0x2a8)]['buttonAssistText1']=function(){const _0x5a8dfc=_0x55d321;return this[_0x5a8dfc(0x58b)]&&this[_0x5a8dfc(0x58b)]['visible']?TextManager['buttonAssistSwitch']:'';},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x39b)]=function(){return'';},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x46d)]=function(){return'';},Scene_Base[_0x55d321(0x2a8)]['buttonAssistText4']=function(){const _0x1c195c=_0x55d321;return TextManager[_0x1c195c(0x937)];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x29d)]=function(){const _0x295935=_0x55d321;return TextManager[_0x295935(0x600)];},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x92a)]=function(){return 0x0;},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x4c5)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset3']=function(){return 0x0;},Scene_Base['prototype'][_0x55d321(0x1b4)]=function(){return 0x0;},Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x684)]=function(){return 0x0;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x394)]=Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x70c)],Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x70c)]=function(){const _0x1dd48e=_0x55d321;VisuMZ[_0x1dd48e(0x886)][_0x1dd48e(0x394)][_0x1dd48e(0x2b5)](this),this[_0x1dd48e(0x20d)]();},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x20d)]=function(){const _0x4360c7=_0x55d321,_0x221c69=[_0x4360c7(0x47e),_0x4360c7(0x414),_0x4360c7(0x6b6),_0x4360c7(0x6d5),'enemies',_0x4360c7(0x2ef),_0x4360c7(0x35b),_0x4360c7(0x690),'sv_actors','sv_enemies',_0x4360c7(0x946),'tilesets',_0x4360c7(0x311),'titles2'];for(const _0x12ce43 of _0x221c69){const _0x384501=VisuMZ[_0x4360c7(0x886)]['Settings'][_0x4360c7(0x579)][_0x12ce43],_0x4030f4='img/%1/'['format'](_0x12ce43);for(const _0x297cc0 of _0x384501){ImageManager[_0x4360c7(0x1a7)](_0x4030f4,_0x297cc0);}}},VisuMZ[_0x55d321(0x886)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x89e)],Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x89e)]=function(){const _0x28a3f6=_0x55d321;Utils['isOptionValid'](_0x28a3f6(0x420))&&VisuMZ['CoreEngine']['Settings'][_0x28a3f6(0x6f5)][_0x28a3f6(0x657)]?this[_0x28a3f6(0x484)]():VisuMZ[_0x28a3f6(0x886)][_0x28a3f6(0x449)]['call'](this);},Scene_Boot[_0x55d321(0x2a8)]['startAutoNewGame']=function(){const _0xde9532=_0x55d321;this[_0xde9532(0x65a)](),DataManager[_0xde9532(0x3be)](),SceneManager['goto'](Scene_Map);},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x14d)]=function(){const _0x22037b=_0x55d321,_0x316aba=$dataSystem[_0x22037b(0x87a)][_0x22037b(0x2d1)],_0x1c98c1=$dataSystem[_0x22037b(0x87a)][_0x22037b(0x42c)],_0x1d2a37=VisuMZ[_0x22037b(0x886)]['Settings']['UI'][_0x22037b(0x3bc)];Graphics[_0x22037b(0x8d1)]=_0x316aba-_0x1d2a37*0x2,Graphics[_0x22037b(0x57a)]=_0x1c98c1-_0x1d2a37*0x2,this[_0x22037b(0x39e)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x71e)]=Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x1d4)],Scene_Boot[_0x55d321(0x2a8)]['updateDocumentTitle']=function(){const _0x4f9907=_0x55d321;this['isFullDocumentTitle']()?this[_0x4f9907(0x7b2)]():VisuMZ[_0x4f9907(0x886)]['Scene_Boot_updateDocumentTitle'][_0x4f9907(0x2b5)](this);},Scene_Boot[_0x55d321(0x2a8)]['isFullDocumentTitle']=function(){const _0xcc7290=_0x55d321;if(Scene_Title['subtitle']==='')return![];if(Scene_Title[_0xcc7290(0x281)]===_0xcc7290(0x326))return![];if(Scene_Title[_0xcc7290(0x216)]==='')return![];if(Scene_Title['version']===_0xcc7290(0x5a5))return![];return!![];},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x7b2)]=function(){const _0x4368cf=_0x55d321,_0x43e31e=$dataSystem[_0x4368cf(0x851)],_0x19218a=Scene_Title[_0x4368cf(0x281)]||'',_0x10a0ec=Scene_Title[_0x4368cf(0x216)]||'',_0x64ad40=VisuMZ[_0x4368cf(0x886)][_0x4368cf(0x530)]['MenuLayout'][_0x4368cf(0x4b8)][_0x4368cf(0x661)],_0x5d092b=_0x64ad40['format'](_0x43e31e,_0x19218a,_0x10a0ec);document['title']=_0x5d092b;},Scene_Boot[_0x55d321(0x2a8)][_0x55d321(0x39e)]=function(){const _0x1340b2=_0x55d321;if(VisuMZ['CoreEngine'][_0x1340b2(0x530)]['UI'][_0x1340b2(0x352)]){const _0x3f58b6=Graphics[_0x1340b2(0x85f)]-Graphics[_0x1340b2(0x8d1)]-VisuMZ[_0x1340b2(0x886)][_0x1340b2(0x530)]['UI'][_0x1340b2(0x3bc)]*0x2,_0x42a7c9=Sprite_Button[_0x1340b2(0x2a8)][_0x1340b2(0x7a1)][_0x1340b2(0x2b5)](this)*0x4;if(_0x3f58b6>=_0x42a7c9)SceneManager[_0x1340b2(0x8a9)](!![]);}},Scene_Title[_0x55d321(0x281)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x4b8)][_0x55d321(0x326)],Scene_Title[_0x55d321(0x216)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)]['MenuLayout'][_0x55d321(0x4b8)]['Version'],Scene_Title[_0x55d321(0x481)]=VisuMZ[_0x55d321(0x886)]['Settings'][_0x55d321(0x3b8)],VisuMZ[_0x55d321(0x886)][_0x55d321(0x1af)]=Scene_Title[_0x55d321(0x2a8)][_0x55d321(0x41a)],Scene_Title[_0x55d321(0x2a8)][_0x55d321(0x41a)]=function(){const _0x4ebe03=_0x55d321;VisuMZ[_0x4ebe03(0x886)][_0x4ebe03(0x530)][_0x4ebe03(0x5e8)][_0x4ebe03(0x4b8)][_0x4ebe03(0x41a)]['call'](this);if(Scene_Title[_0x4ebe03(0x281)]!==''&&Scene_Title['subtitle']!==_0x4ebe03(0x326))this[_0x4ebe03(0x380)]();if(Scene_Title[_0x4ebe03(0x216)]!==''&&Scene_Title[_0x4ebe03(0x216)]!==_0x4ebe03(0x5a5))this[_0x4ebe03(0x84c)]();},Scene_Title[_0x55d321(0x2a8)][_0x55d321(0x380)]=function(){const _0x234c46=_0x55d321;VisuMZ[_0x234c46(0x886)][_0x234c46(0x530)][_0x234c46(0x5e8)][_0x234c46(0x4b8)][_0x234c46(0x380)][_0x234c46(0x2b5)](this);},Scene_Title[_0x55d321(0x2a8)][_0x55d321(0x84c)]=function(){const _0x13dac4=_0x55d321;VisuMZ['CoreEngine']['Settings'][_0x13dac4(0x5e8)][_0x13dac4(0x4b8)]['drawGameVersion'][_0x13dac4(0x2b5)](this);},Scene_Title[_0x55d321(0x2a8)]['createCommandWindow']=function(){const _0x3696ba=_0x55d321;this[_0x3696ba(0x8af)]();const _0x13b287=$dataSystem['titleCommandWindow'][_0x3696ba(0x928)],_0x186d99=this[_0x3696ba(0x76c)]();this[_0x3696ba(0x7e8)]=new Window_TitleCommand(_0x186d99),this['_commandWindow'][_0x3696ba(0x2e2)](_0x13b287);const _0x9988a3=this[_0x3696ba(0x76c)]();this['_commandWindow'][_0x3696ba(0x245)](_0x9988a3['x'],_0x9988a3['y'],_0x9988a3[_0x3696ba(0x85f)],_0x9988a3[_0x3696ba(0x48d)]),this['_commandWindow'][_0x3696ba(0x2de)](),this[_0x3696ba(0x7e8)][_0x3696ba(0x1cc)](),this[_0x3696ba(0x7e8)][_0x3696ba(0x23d)](),this['addWindow'](this['_commandWindow']);},Scene_Title['prototype'][_0x55d321(0x17a)]=function(){const _0xc5b170=_0x55d321;return this['_commandWindow']?this[_0xc5b170(0x7e8)][_0xc5b170(0x315)]():VisuMZ['CoreEngine'][_0xc5b170(0x530)][_0xc5b170(0x5d1)]['length'];},Scene_Title[_0x55d321(0x2a8)][_0x55d321(0x76c)]=function(){const _0x425382=_0x55d321;return VisuMZ[_0x425382(0x886)][_0x425382(0x530)][_0x425382(0x5e8)][_0x425382(0x4b8)][_0x425382(0x1c1)][_0x425382(0x2b5)](this);},Scene_Title[_0x55d321(0x2a8)][_0x55d321(0x8af)]=function(){const _0x1ae9aa=_0x55d321;for(const _0x390634 of Scene_Title[_0x1ae9aa(0x481)]){const _0x1f010f=new Sprite_TitlePictureButton(_0x390634);this['addChild'](_0x1f010f);}},VisuMZ[_0x55d321(0x886)]['Scene_Map_initialize']=Scene_Map['prototype'][_0x55d321(0x4a1)],Scene_Map[_0x55d321(0x2a8)]['initialize']=function(){const _0x2bbd66=_0x55d321;VisuMZ[_0x2bbd66(0x886)][_0x2bbd66(0x61e)]['call'](this),$gameTemp[_0x2bbd66(0x183)](),this[_0x2bbd66(0x752)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x7c5)]=Scene_Map['prototype']['updateMainMultiply'],Scene_Map[_0x55d321(0x2a8)]['updateMainMultiply']=function(){const _0x53f324=_0x55d321;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x53f324(0x2b5)](this),$gameTemp[_0x53f324(0x1c8)]&&!$gameMessage[_0x53f324(0x237)]()&&(this[_0x53f324(0x747)](),SceneManager[_0x53f324(0x142)]());},Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x7b9)]=function(){const _0x52057d=_0x55d321;Scene_Message[_0x52057d(0x2a8)][_0x52057d(0x7b9)]['call'](this),!SceneManager[_0x52057d(0x1ed)](Scene_Battle)&&(this[_0x52057d(0x64d)]['update'](),this[_0x52057d(0x523)]['hide'](),this[_0x52057d(0x2a3)][_0x52057d(0x382)]=![],SceneManager[_0x52057d(0x909)]()),$gameScreen['clearZoom'](),this[_0x52057d(0x752)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x247)]=Scene_Map['prototype'][_0x55d321(0x8de)],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x8de)]=function(){const _0x55c3a1=_0x55d321;VisuMZ['CoreEngine']['Scene_Map_createMenuButton'][_0x55c3a1(0x2b5)](this),SceneManager[_0x55c3a1(0x144)]()&&this['moveMenuButtonSideButtonLayout']();},Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x698)]=function(){const _0x3f3df7=_0x55d321;this['_menuButton']['x']=Graphics[_0x3f3df7(0x8d1)]+0x4;},VisuMZ[_0x55d321(0x886)]['Scene_Map_updateScene']=Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x3c7)],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x3c7)]=function(){const _0x445658=_0x55d321;VisuMZ[_0x445658(0x886)][_0x445658(0x145)][_0x445658(0x2b5)](this),this[_0x445658(0x6cc)]();},Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x6cc)]=function(){const _0xa734fd=_0x55d321;Input[_0xa734fd(0x1ac)](_0xa734fd(0x930))&&(ConfigManager[_0xa734fd(0x314)]=!ConfigManager[_0xa734fd(0x314)],ConfigManager[_0xa734fd(0x490)]());},VisuMZ[_0x55d321(0x886)][_0x55d321(0x935)]=Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x747)],Scene_Map[_0x55d321(0x2a8)]['updateMain']=function(){const _0x468930=_0x55d321;VisuMZ[_0x468930(0x886)][_0x468930(0x935)][_0x468930(0x2b5)](this),this[_0x468930(0x820)]();},Scene_Map['prototype']['clearOnceParallelInterpreters']=function(){const _0x493b92=_0x55d321;this[_0x493b92(0x185)]=[];},Scene_Map['prototype'][_0x55d321(0x820)]=function(){const _0x52a2ec=_0x55d321;if(!this[_0x52a2ec(0x185)])return;for(const _0x5dc2f5 of this[_0x52a2ec(0x185)]){_0x5dc2f5&&_0x5dc2f5[_0x52a2ec(0x264)]();}},Scene_Map['prototype']['playOnceParallelInterpreter']=function(_0x2b515c,_0x46a1e7){const _0x48f4f2=_0x55d321,_0x5d579b=$dataCommonEvents[_0x2b515c];if(!_0x5d579b)return;const _0x5f03de=new Game_OnceParallelInterpreter();this[_0x48f4f2(0x5cb)](_0x5f03de),_0x5f03de[_0x48f4f2(0x4d7)](_0x2b515c),_0x5f03de[_0x48f4f2(0x4f4)](_0x46a1e7);},Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x5cb)]=function(_0x5afb91){const _0xc513fe=_0x55d321;this[_0xc513fe(0x185)]=this['_onceParallelInterpreters']||[],this[_0xc513fe(0x185)][_0xc513fe(0x582)](_0x5afb91);},Scene_Map[_0x55d321(0x2a8)]['removeOnceParallelInterpreter']=function(_0x16059e){const _0x55d417=_0x55d321;this[_0x55d417(0x185)]=this[_0x55d417(0x185)]||[],this[_0x55d417(0x185)][_0x55d417(0x8e5)](_0x16059e);};function Game_OnceParallelInterpreter(){const _0xbdb055=_0x55d321;this[_0xbdb055(0x4a1)](...arguments);}Game_OnceParallelInterpreter[_0x55d321(0x2a8)]=Object['create'](Game_Interpreter[_0x55d321(0x2a8)]),Game_OnceParallelInterpreter['prototype'][_0x55d321(0x73b)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter['prototype'][_0x55d321(0x4d7)]=function(_0x5dd88d){const _0x124a65=_0x55d321,_0x21c9cf=$dataCommonEvents[_0x5dd88d];_0x21c9cf?this['setup'](_0x21c9cf[_0x124a65(0x8a4)],0x0):this[_0x124a65(0x7b9)]();},Game_OnceParallelInterpreter[_0x55d321(0x2a8)][_0x55d321(0x4f4)]=function(_0x479c35){const _0x163b4c=_0x55d321;this[_0x163b4c(0x165)]=_0x479c35||0x0;},Game_OnceParallelInterpreter[_0x55d321(0x2a8)][_0x55d321(0x7b9)]=function(){const _0x2f67bb=_0x55d321;if(!SceneManager[_0x2f67bb(0x4f8)]())return;SceneManager[_0x2f67bb(0x43e)][_0x2f67bb(0x6ed)](this),Game_Interpreter['prototype'][_0x2f67bb(0x7b9)][_0x2f67bb(0x2b5)](this);},VisuMZ['CoreEngine'][_0x55d321(0x321)]=Scene_MenuBase['prototype'][_0x55d321(0x35e)],Scene_MenuBase[_0x55d321(0x2a8)]['helpAreaTop']=function(){const _0x48a762=_0x55d321;let _0x516edb=0x0;return SceneManager[_0x48a762(0x57b)]()?_0x516edb=this[_0x48a762(0x850)]():_0x516edb=VisuMZ[_0x48a762(0x886)][_0x48a762(0x321)][_0x48a762(0x2b5)](this),_0x516edb;},Scene_MenuBase['prototype'][_0x55d321(0x850)]=function(){const _0x1833d1=_0x55d321;return this[_0x1833d1(0x688)]()?this['mainAreaBottom']():0x0;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x52e)]=Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x32e)],Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x32e)]=function(){const _0x21bc96=_0x55d321;return SceneManager[_0x21bc96(0x57b)]()?this['mainAreaTopSideButtonLayout']():VisuMZ[_0x21bc96(0x886)][_0x21bc96(0x52e)][_0x21bc96(0x2b5)](this);},Scene_MenuBase['prototype'][_0x55d321(0x6ee)]=function(){const _0x350f03=_0x55d321;if(!this[_0x350f03(0x688)]())return this[_0x350f03(0x456)]();else return this['isMenuButtonAssistEnabled']()&&this[_0x350f03(0x66c)]()===_0x350f03(0x527)?Window_ButtonAssist[_0x350f03(0x2a8)][_0x350f03(0x4e0)]():0x0;},VisuMZ['CoreEngine'][_0x55d321(0x61c)]=Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x5cf)],Scene_MenuBase[_0x55d321(0x2a8)]['mainAreaHeight']=function(){const _0x865d1a=_0x55d321;let _0xea25d7=0x0;return SceneManager[_0x865d1a(0x57b)]()?_0xea25d7=this[_0x865d1a(0x261)]():_0xea25d7=VisuMZ[_0x865d1a(0x886)][_0x865d1a(0x61c)]['call'](this),this[_0x865d1a(0x59f)]()&&this[_0x865d1a(0x66c)]()!==_0x865d1a(0x7e9)&&(_0xea25d7-=Window_ButtonAssist[_0x865d1a(0x2a8)][_0x865d1a(0x4e0)]()),_0xea25d7;},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x261)]=function(){const _0x1e64e1=_0x55d321;return Graphics[_0x1e64e1(0x57a)]-this['helpAreaHeight']();},VisuMZ[_0x55d321(0x886)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x1da)],Scene_MenuBase['prototype']['createBackground']=function(){const _0x5b56cb=_0x55d321,_0x1aa43d=VisuMZ['CoreEngine'][_0x5b56cb(0x530)][_0x5b56cb(0x3f2)][_0x5b56cb(0x914)]??0x8;this[_0x5b56cb(0x6a9)]=new PIXI['filters'][(_0x5b56cb(0x5ee))](_0x1aa43d),this[_0x5b56cb(0x67f)]=new Sprite(),this[_0x5b56cb(0x67f)][_0x5b56cb(0x5de)]=SceneManager[_0x5b56cb(0x3f3)](),this[_0x5b56cb(0x67f)][_0x5b56cb(0x769)]=[this['_backgroundFilter']],this[_0x5b56cb(0x7af)](this[_0x5b56cb(0x67f)]),this[_0x5b56cb(0x8a8)](0xc0),this[_0x5b56cb(0x8a8)](this[_0x5b56cb(0x8fe)]()),this[_0x5b56cb(0x534)]();},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x8fe)]=function(){const _0x25b320=_0x55d321,_0x3ae82b=String(this[_0x25b320(0x73b)]['name']),_0x29f141=this[_0x25b320(0x26d)](_0x3ae82b);return _0x29f141?_0x29f141['SnapshotOpacity']:0xc0;},Scene_MenuBase['prototype'][_0x55d321(0x534)]=function(){const _0x3afb47=_0x55d321,_0x1a4992=String(this[_0x3afb47(0x73b)][_0x3afb47(0x7c4)]),_0x5902e9=this['getCustomBackgroundSettings'](_0x1a4992);_0x5902e9&&(_0x5902e9[_0x3afb47(0x5ad)]!==''||_0x5902e9['BgFilename2']!=='')&&(this[_0x3afb47(0x162)]=new Sprite(ImageManager[_0x3afb47(0x5b4)](_0x5902e9[_0x3afb47(0x5ad)])),this[_0x3afb47(0x259)]=new Sprite(ImageManager[_0x3afb47(0x207)](_0x5902e9[_0x3afb47(0x6bc)])),this[_0x3afb47(0x7af)](this[_0x3afb47(0x162)]),this[_0x3afb47(0x7af)](this[_0x3afb47(0x259)]),this['_backSprite1']['bitmap'][_0x3afb47(0x5b1)](this['adjustSprite']['bind'](this,this[_0x3afb47(0x162)])),this[_0x3afb47(0x259)][_0x3afb47(0x5de)][_0x3afb47(0x5b1)](this[_0x3afb47(0x2e8)][_0x3afb47(0x88a)](this,this[_0x3afb47(0x259)])));},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x26d)]=function(_0x1137e9){const _0x5f32dd=_0x55d321;return VisuMZ[_0x5f32dd(0x886)][_0x5f32dd(0x530)][_0x5f32dd(0x3f2)][_0x1137e9]||VisuMZ[_0x5f32dd(0x886)]['Settings'][_0x5f32dd(0x3f2)][_0x5f32dd(0x558)];},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x2e8)]=function(_0x3a3273){const _0x2a8591=_0x55d321;this[_0x2a8591(0x31e)](_0x3a3273),this[_0x2a8591(0x7d4)](_0x3a3273);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x25e)]=Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x61f)],Scene_MenuBase['prototype'][_0x55d321(0x61f)]=function(){const _0x4dc3cd=_0x55d321;VisuMZ[_0x4dc3cd(0x886)][_0x4dc3cd(0x25e)][_0x4dc3cd(0x2b5)](this),SceneManager[_0x4dc3cd(0x144)]()&&this[_0x4dc3cd(0x81d)]();},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x81d)]=function(){const _0x307d95=_0x55d321;this[_0x307d95(0x693)]['x']=Graphics[_0x307d95(0x8d1)]+0x4;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x912)]=Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x633)],Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x633)]=function(){const _0x48d421=_0x55d321;VisuMZ[_0x48d421(0x886)][_0x48d421(0x912)][_0x48d421(0x2b5)](this),SceneManager[_0x48d421(0x144)]()&&this[_0x48d421(0x844)]();},Scene_MenuBase[_0x55d321(0x2a8)]['movePageButtonSideButtonLayout']=function(){const _0x117a93=_0x55d321;this[_0x117a93(0x58b)]['x']=-0x1*(this[_0x117a93(0x58b)]['width']+this[_0x117a93(0x77b)][_0x117a93(0x85f)]+0x8),this[_0x117a93(0x77b)]['x']=-0x1*(this[_0x117a93(0x77b)][_0x117a93(0x85f)]+0x4);},Scene_MenuBase['prototype'][_0x55d321(0x59f)]=function(){const _0x1cae54=_0x55d321;return VisuMZ[_0x1cae54(0x886)][_0x1cae54(0x530)][_0x1cae54(0x56f)][_0x1cae54(0x1e3)];},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x66c)]=function(){const _0x508580=_0x55d321;return SceneManager[_0x508580(0x144)]()||SceneManager[_0x508580(0x83d)]()?VisuMZ[_0x508580(0x886)][_0x508580(0x530)][_0x508580(0x56f)][_0x508580(0x826)]:_0x508580(0x7e9);},Scene_MenuBase[_0x55d321(0x2a8)]['createButtonAssistWindow']=function(){const _0x4c0119=_0x55d321;if(!this['isMenuButtonAssistEnabled']())return;const _0x16d0f3=this[_0x4c0119(0x77f)]();this[_0x4c0119(0x7ce)]=new Window_ButtonAssist(_0x16d0f3),this[_0x4c0119(0x296)](this[_0x4c0119(0x7ce)]);},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x77f)]=function(){const _0x15c3e1=_0x55d321;return this[_0x15c3e1(0x66c)]()==='button'?this[_0x15c3e1(0x8ef)]():this[_0x15c3e1(0x609)]();},Scene_MenuBase[_0x55d321(0x2a8)][_0x55d321(0x8ef)]=function(){const _0xfd176a=_0x55d321,_0x5e237c=ConfigManager[_0xfd176a(0x60f)]?(Sprite_Button[_0xfd176a(0x2a8)][_0xfd176a(0x7a1)]()+0x6)*0x2:0x0,_0xa3864b=this[_0xfd176a(0x5ba)](),_0x3e2173=Graphics[_0xfd176a(0x8d1)]-_0x5e237c*0x2,_0xb5ceae=this['buttonAreaHeight']();return new Rectangle(_0x5e237c,_0xa3864b,_0x3e2173,_0xb5ceae);},Scene_MenuBase[_0x55d321(0x2a8)]['buttonAssistWindowSideRect']=function(){const _0x3f4f2d=_0x55d321,_0x4070a0=Graphics['boxWidth'],_0x5b17e3=Window_ButtonAssist[_0x3f4f2d(0x2a8)][_0x3f4f2d(0x4e0)](),_0x314d4c=0x0;let _0x479783=0x0;return this[_0x3f4f2d(0x66c)]()==='top'?_0x479783=0x0:_0x479783=Graphics['boxHeight']-_0x5b17e3,new Rectangle(_0x314d4c,_0x479783,_0x4070a0,_0x5b17e3);},Scene_Menu[_0x55d321(0x242)]=VisuMZ[_0x55d321(0x886)]['Settings'][_0x55d321(0x5e8)][_0x55d321(0x7a9)],VisuMZ[_0x55d321(0x886)][_0x55d321(0x6c1)]=Scene_Menu[_0x55d321(0x2a8)][_0x55d321(0x568)],Scene_Menu[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0x1c4b92=_0x55d321;VisuMZ[_0x1c4b92(0x886)][_0x1c4b92(0x6c1)]['call'](this),this[_0x1c4b92(0x537)]();},Scene_Menu[_0x55d321(0x2a8)][_0x55d321(0x537)]=function(){const _0x37671d=_0x55d321;this['_commandWindow']&&this[_0x37671d(0x7e8)][_0x37671d(0x2e2)](Scene_Menu[_0x37671d(0x242)][_0x37671d(0x570)]),this[_0x37671d(0x5e0)]&&this[_0x37671d(0x5e0)][_0x37671d(0x2e2)](Scene_Menu[_0x37671d(0x242)][_0x37671d(0x814)]),this[_0x37671d(0x69e)]&&this['_statusWindow'][_0x37671d(0x2e2)](Scene_Menu['layoutSettings'][_0x37671d(0x33c)]);},Scene_Menu['prototype']['commandWindowRect']=function(){const _0x3243da=_0x55d321;return Scene_Menu['layoutSettings'][_0x3243da(0x1c1)][_0x3243da(0x2b5)](this);},Scene_Menu['prototype'][_0x55d321(0x5f4)]=function(){const _0x371fb4=_0x55d321;return Scene_Menu[_0x371fb4(0x242)]['GoldRect'][_0x371fb4(0x2b5)](this);},Scene_Menu[_0x55d321(0x2a8)][_0x55d321(0x517)]=function(){const _0x40fdcf=_0x55d321;return Scene_Menu[_0x40fdcf(0x242)][_0x40fdcf(0x1e2)][_0x40fdcf(0x2b5)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x7d1)],VisuMZ[_0x55d321(0x886)][_0x55d321(0x8c8)]=Scene_Item['prototype']['create'],Scene_Item['prototype'][_0x55d321(0x568)]=function(){const _0x299d5a=_0x55d321;VisuMZ['CoreEngine'][_0x299d5a(0x8c8)][_0x299d5a(0x2b5)](this),this[_0x299d5a(0x537)]();},Scene_Item[_0x55d321(0x2a8)][_0x55d321(0x537)]=function(){const _0x1e15f9=_0x55d321;this[_0x1e15f9(0x42b)]&&this[_0x1e15f9(0x42b)]['setBackgroundType'](Scene_Item[_0x1e15f9(0x242)][_0x1e15f9(0x2d8)]),this[_0x1e15f9(0x48e)]&&this[_0x1e15f9(0x48e)][_0x1e15f9(0x2e2)](Scene_Item[_0x1e15f9(0x242)][_0x1e15f9(0x3ab)]),this[_0x1e15f9(0x342)]&&this[_0x1e15f9(0x342)][_0x1e15f9(0x2e2)](Scene_Item[_0x1e15f9(0x242)][_0x1e15f9(0x870)]),this[_0x1e15f9(0x817)]&&this[_0x1e15f9(0x817)][_0x1e15f9(0x2e2)](Scene_Item[_0x1e15f9(0x242)][_0x1e15f9(0x354)]);},Scene_Item[_0x55d321(0x2a8)][_0x55d321(0x3c0)]=function(){const _0x55440d=_0x55d321;return Scene_Item[_0x55440d(0x242)][_0x55440d(0x8d7)][_0x55440d(0x2b5)](this);},Scene_Item[_0x55d321(0x2a8)][_0x55d321(0x620)]=function(){const _0x47c6f9=_0x55d321;return Scene_Item[_0x47c6f9(0x242)]['CategoryRect'][_0x47c6f9(0x2b5)](this);},Scene_Item['prototype'][_0x55d321(0x605)]=function(){const _0xf0792b=_0x55d321;return Scene_Item[_0xf0792b(0x242)][_0xf0792b(0x5e5)][_0xf0792b(0x2b5)](this);},Scene_Item[_0x55d321(0x2a8)][_0x55d321(0x28c)]=function(){const _0x1982be=_0x55d321;return Scene_Item['layoutSettings'][_0x1982be(0x828)]['call'](this);},Scene_Skill[_0x55d321(0x242)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x535)],VisuMZ[_0x55d321(0x886)][_0x55d321(0x732)]=Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x568)],Scene_Skill['prototype'][_0x55d321(0x568)]=function(){const _0x49424e=_0x55d321;VisuMZ['CoreEngine']['Scene_Skill_create']['call'](this),this[_0x49424e(0x537)]();},Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x537)]=function(){const _0x447322=_0x55d321;this[_0x447322(0x42b)]&&this[_0x447322(0x42b)][_0x447322(0x2e2)](Scene_Skill[_0x447322(0x242)][_0x447322(0x2d8)]),this[_0x447322(0x40e)]&&this['_skillTypeWindow'][_0x447322(0x2e2)](Scene_Skill['layoutSettings'][_0x447322(0x741)]),this[_0x447322(0x69e)]&&this[_0x447322(0x69e)][_0x447322(0x2e2)](Scene_Skill[_0x447322(0x242)]['StatusBgType']),this[_0x447322(0x342)]&&this['_itemWindow'][_0x447322(0x2e2)](Scene_Skill['layoutSettings'][_0x447322(0x870)]),this['_actorWindow']&&this[_0x447322(0x817)]['setBackgroundType'](Scene_Skill[_0x447322(0x242)][_0x447322(0x354)]);},Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x3c0)]=function(){const _0x53eb2a=_0x55d321;return Scene_Skill[_0x53eb2a(0x242)][_0x53eb2a(0x8d7)]['call'](this);},Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x93b)]=function(){const _0xfe9999=_0x55d321;return Scene_Skill[_0xfe9999(0x242)]['SkillTypeRect'][_0xfe9999(0x2b5)](this);},Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x517)]=function(){const _0x41aec5=_0x55d321;return Scene_Skill[_0x41aec5(0x242)]['StatusRect'][_0x41aec5(0x2b5)](this);},Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x605)]=function(){return Scene_Skill['layoutSettings']['ItemRect']['call'](this);},Scene_Skill[_0x55d321(0x2a8)]['actorWindowRect']=function(){const _0x59ea5d=_0x55d321;return Scene_Skill[_0x59ea5d(0x242)][_0x59ea5d(0x828)]['call'](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)]['EquipMenu'],VisuMZ['CoreEngine'][_0x55d321(0x43d)]=Scene_Equip[_0x55d321(0x2a8)][_0x55d321(0x568)],Scene_Equip[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0x1222f0=_0x55d321;VisuMZ[_0x1222f0(0x886)][_0x1222f0(0x43d)][_0x1222f0(0x2b5)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x55d321(0x537)]=function(){const _0x5f4c6c=_0x55d321;this['_helpWindow']&&this[_0x5f4c6c(0x42b)]['setBackgroundType'](Scene_Equip[_0x5f4c6c(0x242)][_0x5f4c6c(0x2d8)]),this['_statusWindow']&&this[_0x5f4c6c(0x69e)][_0x5f4c6c(0x2e2)](Scene_Equip['layoutSettings'][_0x5f4c6c(0x33c)]),this[_0x5f4c6c(0x7e8)]&&this[_0x5f4c6c(0x7e8)][_0x5f4c6c(0x2e2)](Scene_Equip[_0x5f4c6c(0x242)][_0x5f4c6c(0x570)]),this[_0x5f4c6c(0x2a7)]&&this['_slotWindow']['setBackgroundType'](Scene_Equip[_0x5f4c6c(0x242)]['SlotBgType']),this[_0x5f4c6c(0x342)]&&this[_0x5f4c6c(0x342)]['setBackgroundType'](Scene_Equip[_0x5f4c6c(0x242)][_0x5f4c6c(0x870)]);},Scene_Equip[_0x55d321(0x2a8)][_0x55d321(0x3c0)]=function(){const _0x1dcadc=_0x55d321;return Scene_Equip[_0x1dcadc(0x242)][_0x1dcadc(0x8d7)][_0x1dcadc(0x2b5)](this);},Scene_Equip['prototype'][_0x55d321(0x517)]=function(){const _0x20a84b=_0x55d321;return Scene_Equip['layoutSettings'][_0x20a84b(0x1e2)][_0x20a84b(0x2b5)](this);},Scene_Equip[_0x55d321(0x2a8)][_0x55d321(0x76c)]=function(){const _0xa20e2c=_0x55d321;return Scene_Equip[_0xa20e2c(0x242)][_0xa20e2c(0x1c1)]['call'](this);},Scene_Equip[_0x55d321(0x2a8)][_0x55d321(0x5c2)]=function(){return Scene_Equip['layoutSettings']['SlotRect']['call'](this);},Scene_Equip[_0x55d321(0x2a8)]['itemWindowRect']=function(){const _0x493060=_0x55d321;return Scene_Equip[_0x493060(0x242)][_0x493060(0x5e5)][_0x493060(0x2b5)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)]['StatusMenu'],VisuMZ['CoreEngine'][_0x55d321(0x453)]=Scene_Status[_0x55d321(0x2a8)][_0x55d321(0x568)],Scene_Status[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0xcaffe=_0x55d321;VisuMZ[_0xcaffe(0x886)][_0xcaffe(0x453)][_0xcaffe(0x2b5)](this),this[_0xcaffe(0x537)]();},Scene_Status['prototype'][_0x55d321(0x537)]=function(){const _0x8a73fa=_0x55d321;this['_profileWindow']&&this[_0x8a73fa(0x6eb)][_0x8a73fa(0x2e2)](Scene_Status['layoutSettings'][_0x8a73fa(0x205)]),this['_statusWindow']&&this[_0x8a73fa(0x69e)][_0x8a73fa(0x2e2)](Scene_Status['layoutSettings'][_0x8a73fa(0x33c)]),this['_statusParamsWindow']&&this[_0x8a73fa(0x4c2)][_0x8a73fa(0x2e2)](Scene_Status[_0x8a73fa(0x242)][_0x8a73fa(0x2ea)]),this['_statusEquipWindow']&&this[_0x8a73fa(0x8ad)][_0x8a73fa(0x2e2)](Scene_Status[_0x8a73fa(0x242)][_0x8a73fa(0x30d)]);},Scene_Status[_0x55d321(0x2a8)]['profileWindowRect']=function(){const _0x52215a=_0x55d321;return Scene_Status['layoutSettings'][_0x52215a(0x696)]['call'](this);},Scene_Status['prototype'][_0x55d321(0x517)]=function(){const _0x5abd07=_0x55d321;return Scene_Status[_0x5abd07(0x242)][_0x5abd07(0x1e2)][_0x5abd07(0x2b5)](this);},Scene_Status['prototype'][_0x55d321(0x494)]=function(){const _0x52a232=_0x55d321;return Scene_Status[_0x52a232(0x242)][_0x52a232(0x7be)]['call'](this);},Scene_Status[_0x55d321(0x2a8)][_0x55d321(0x2a5)]=function(){const _0x2f3cf3=_0x55d321;return Scene_Status[_0x2f3cf3(0x242)][_0x2f3cf3(0x2fa)][_0x2f3cf3(0x2b5)](this);},Scene_Options[_0x55d321(0x242)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x8b8)],VisuMZ[_0x55d321(0x886)][_0x55d321(0x3ba)]=Scene_Options[_0x55d321(0x2a8)][_0x55d321(0x568)],Scene_Options[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0x3d771b=_0x55d321;VisuMZ[_0x3d771b(0x886)][_0x3d771b(0x3ba)][_0x3d771b(0x2b5)](this),this[_0x3d771b(0x537)]();},Scene_Options[_0x55d321(0x2a8)]['setCoreEngineUpdateWindowBg']=function(){const _0x5b5849=_0x55d321;this[_0x5b5849(0x790)]&&this[_0x5b5849(0x790)]['setBackgroundType'](Scene_Options[_0x5b5849(0x242)][_0x5b5849(0x8db)]);},Scene_Options[_0x55d321(0x2a8)][_0x55d321(0x7b7)]=function(){const _0x3ed6ca=_0x55d321;return Scene_Options[_0x3ed6ca(0x242)][_0x3ed6ca(0x829)][_0x3ed6ca(0x2b5)](this);},Scene_Save[_0x55d321(0x242)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x249)],Scene_Save[_0x55d321(0x2a8)]['create']=function(){const _0x12ced6=_0x55d321;Scene_File[_0x12ced6(0x2a8)][_0x12ced6(0x568)][_0x12ced6(0x2b5)](this),this[_0x12ced6(0x537)]();},Scene_Save['prototype'][_0x55d321(0x537)]=function(){const _0x56611c=_0x55d321;this[_0x56611c(0x42b)]&&this[_0x56611c(0x42b)]['setBackgroundType'](Scene_Save['layoutSettings'][_0x56611c(0x2d8)]),this['_listWindow']&&this[_0x56611c(0x8d8)][_0x56611c(0x2e2)](Scene_Save[_0x56611c(0x242)][_0x56611c(0x639)]);},Scene_Save[_0x55d321(0x2a8)]['helpWindowRect']=function(){const _0x592d11=_0x55d321;return Scene_Save[_0x592d11(0x242)][_0x592d11(0x8d7)][_0x592d11(0x2b5)](this);},Scene_Save['prototype'][_0x55d321(0x338)]=function(){const _0x4fe12d=_0x55d321;return Scene_Save[_0x4fe12d(0x242)][_0x4fe12d(0x810)][_0x4fe12d(0x2b5)](this);},Scene_Load[_0x55d321(0x242)]=VisuMZ['CoreEngine'][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x5b3)],Scene_Load[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0x5a8f4d=_0x55d321;Scene_File['prototype'][_0x5a8f4d(0x568)][_0x5a8f4d(0x2b5)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x55d321(0x2a8)][_0x55d321(0x537)]=function(){const _0x5dadbc=_0x55d321;this[_0x5dadbc(0x42b)]&&this[_0x5dadbc(0x42b)][_0x5dadbc(0x2e2)](Scene_Load['layoutSettings'][_0x5dadbc(0x2d8)]),this[_0x5dadbc(0x8d8)]&&this[_0x5dadbc(0x8d8)]['setBackgroundType'](Scene_Load[_0x5dadbc(0x242)][_0x5dadbc(0x639)]);},Scene_Load[_0x55d321(0x2a8)]['helpWindowRect']=function(){const _0x2497ef=_0x55d321;return Scene_Load['layoutSettings'][_0x2497ef(0x8d7)][_0x2497ef(0x2b5)](this);},Scene_Load['prototype'][_0x55d321(0x338)]=function(){const _0x14d322=_0x55d321;return Scene_Load[_0x14d322(0x242)][_0x14d322(0x810)][_0x14d322(0x2b5)](this);};function Scene_QuickLoad(){this['initialize'](...arguments);}Scene_QuickLoad[_0x55d321(0x2a8)]=Object[_0x55d321(0x568)](Scene_Load[_0x55d321(0x2a8)]),Scene_QuickLoad['prototype'][_0x55d321(0x73b)]=Scene_QuickLoad,Scene_QuickLoad[_0x55d321(0x2a8)]['initialize']=function(){const _0x8e0741=_0x55d321;Scene_Load[_0x8e0741(0x2a8)][_0x8e0741(0x4a1)]['call'](this);},Scene_QuickLoad[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0x2b5da6=_0x55d321;this[_0x2b5da6(0x706)](this[_0x2b5da6(0x3df)]);},Scene_QuickLoad[_0x55d321(0x2a8)]['prepare']=function(_0x585cea){const _0x2f5e09=_0x55d321;this[_0x2f5e09(0x3df)]=_0x585cea;},Scene_QuickLoad['prototype'][_0x55d321(0x7b6)]=function(){const _0x106218=_0x55d321;Scene_MenuBase[_0x106218(0x2a8)][_0x106218(0x7b6)][_0x106218(0x2b5)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5e8)][_0x55d321(0x68b)],VisuMZ[_0x55d321(0x886)][_0x55d321(0x4ef)]=Scene_GameEnd[_0x55d321(0x2a8)][_0x55d321(0x1da)],Scene_GameEnd[_0x55d321(0x2a8)][_0x55d321(0x1da)]=function(){const _0x25acd6=_0x55d321;Scene_MenuBase[_0x25acd6(0x2a8)][_0x25acd6(0x1da)][_0x25acd6(0x2b5)](this);},Scene_GameEnd[_0x55d321(0x2a8)]['createCommandWindow']=function(){const _0x8fda60=_0x55d321,_0x2be1ac=this[_0x8fda60(0x76c)]();this[_0x8fda60(0x7e8)]=new Window_GameEnd(_0x2be1ac),this[_0x8fda60(0x7e8)]['setHandler'](_0x8fda60(0x1ff),this[_0x8fda60(0x2ca)]['bind'](this)),this[_0x8fda60(0x296)](this[_0x8fda60(0x7e8)]),this[_0x8fda60(0x7e8)]['setBackgroundType'](Scene_GameEnd[_0x8fda60(0x242)]['CommandBgType']);},Scene_GameEnd[_0x55d321(0x2a8)][_0x55d321(0x76c)]=function(){const _0x394c2f=_0x55d321;return Scene_GameEnd[_0x394c2f(0x242)]['CommandRect']['call'](this);},Scene_Shop[_0x55d321(0x242)]=VisuMZ[_0x55d321(0x886)]['Settings'][_0x55d321(0x5e8)][_0x55d321(0x1ad)],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x568)],Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x568)]=function(){const _0xbfd2ac=_0x55d321;VisuMZ[_0xbfd2ac(0x886)][_0xbfd2ac(0x918)][_0xbfd2ac(0x2b5)](this),this[_0xbfd2ac(0x537)]();},Scene_Shop['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x2be7f6=_0x55d321;this['_helpWindow']&&this[_0x2be7f6(0x42b)][_0x2be7f6(0x2e2)](Scene_Shop[_0x2be7f6(0x242)]['HelpBgType']),this['_goldWindow']&&this[_0x2be7f6(0x5e0)][_0x2be7f6(0x2e2)](Scene_Shop[_0x2be7f6(0x242)][_0x2be7f6(0x814)]),this[_0x2be7f6(0x7e8)]&&this[_0x2be7f6(0x7e8)][_0x2be7f6(0x2e2)](Scene_Shop[_0x2be7f6(0x242)][_0x2be7f6(0x570)]),this[_0x2be7f6(0x6ec)]&&this['_dummyWindow'][_0x2be7f6(0x2e2)](Scene_Shop[_0x2be7f6(0x242)][_0x2be7f6(0x4d0)]),this[_0x2be7f6(0x6e3)]&&this[_0x2be7f6(0x6e3)]['setBackgroundType'](Scene_Shop[_0x2be7f6(0x242)][_0x2be7f6(0x5bf)]),this['_statusWindow']&&this[_0x2be7f6(0x69e)]['setBackgroundType'](Scene_Shop[_0x2be7f6(0x242)][_0x2be7f6(0x33c)]),this[_0x2be7f6(0x594)]&&this[_0x2be7f6(0x594)][_0x2be7f6(0x2e2)](Scene_Shop[_0x2be7f6(0x242)][_0x2be7f6(0x351)]),this[_0x2be7f6(0x48e)]&&this['_categoryWindow'][_0x2be7f6(0x2e2)](Scene_Shop[_0x2be7f6(0x242)]['CategoryBgType']),this[_0x2be7f6(0x474)]&&this[_0x2be7f6(0x474)][_0x2be7f6(0x2e2)](Scene_Shop['layoutSettings'][_0x2be7f6(0x8f6)]);},Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x3c0)]=function(){const _0x371454=_0x55d321;return Scene_Shop[_0x371454(0x242)]['HelpRect'][_0x371454(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x5f4)]=function(){const _0xa89a61=_0x55d321;return Scene_Shop[_0xa89a61(0x242)][_0xa89a61(0x51c)][_0xa89a61(0x2b5)](this);},Scene_Shop['prototype']['commandWindowRect']=function(){const _0x5e7681=_0x55d321;return Scene_Shop[_0x5e7681(0x242)][_0x5e7681(0x1c1)][_0x5e7681(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x318)]=function(){const _0x91ae=_0x55d321;return Scene_Shop[_0x91ae(0x242)][_0x91ae(0x1bf)][_0x91ae(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x3a7)]=function(){const _0x16acdc=_0x55d321;return Scene_Shop['layoutSettings']['NumberRect'][_0x16acdc(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x517)]=function(){const _0xf79b95=_0x55d321;return Scene_Shop['layoutSettings']['StatusRect'][_0xf79b95(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)]['buyWindowRect']=function(){const _0x11eff2=_0x55d321;return Scene_Shop[_0x11eff2(0x242)][_0x11eff2(0x8cc)][_0x11eff2(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)][_0x55d321(0x620)]=function(){const _0x34e2c9=_0x55d321;return Scene_Shop['layoutSettings'][_0x34e2c9(0x876)][_0x34e2c9(0x2b5)](this);},Scene_Shop[_0x55d321(0x2a8)]['sellWindowRect']=function(){const _0xcd5382=_0x55d321;return Scene_Shop['layoutSettings'][_0xcd5382(0x728)][_0xcd5382(0x2b5)](this);},Scene_Name[_0x55d321(0x242)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)]['MenuLayout'][_0x55d321(0x2e0)],VisuMZ['CoreEngine'][_0x55d321(0x7a7)]=Scene_Name[_0x55d321(0x2a8)]['create'],Scene_Name['prototype'][_0x55d321(0x568)]=function(){const _0x5f2252=_0x55d321;VisuMZ['CoreEngine'][_0x5f2252(0x7a7)]['call'](this),this[_0x5f2252(0x537)]();},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x537)]=function(){const _0x16558f=_0x55d321;this[_0x16558f(0x282)]&&this[_0x16558f(0x282)][_0x16558f(0x2e2)](Scene_Name['layoutSettings']['EditBgType']),this[_0x16558f(0x3a5)]&&this[_0x16558f(0x3a5)][_0x16558f(0x2e2)](Scene_Name[_0x16558f(0x242)][_0x16558f(0x22e)]);},Scene_Name[_0x55d321(0x2a8)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x925)]=function(){const _0x24dac5=_0x55d321;return Scene_Name[_0x24dac5(0x242)][_0x24dac5(0x6d9)]['call'](this);},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x8d6)]=function(){const _0x3bf685=_0x55d321;return Scene_Name[_0x3bf685(0x242)][_0x3bf685(0x472)][_0x3bf685(0x2b5)](this);},Scene_Name['prototype'][_0x55d321(0x17c)]=function(){const _0xebc015=_0x55d321;if(!this['_inputWindow'])return![];return VisuMZ[_0xebc015(0x886)][_0xebc015(0x530)]['KeyboardInput'][_0xebc015(0x17c)];},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x301)]=function(){const _0x3cc106=_0x55d321;if(this[_0x3cc106(0x17c)]()&&this[_0x3cc106(0x3a5)][_0x3cc106(0x5c9)]!=='keyboard')return TextManager['getInputMultiButtonStrings'](_0x3cc106(0x16a),_0x3cc106(0x7fb));return Scene_MenuBase[_0x3cc106(0x2a8)]['buttonAssistKey1'][_0x3cc106(0x2b5)](this);},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x63f)]=function(){const _0x4a759d=_0x55d321;return this[_0x4a759d(0x17c)]()?TextManager[_0x4a759d(0x468)](_0x4a759d(0x6bf)):Scene_MenuBase[_0x4a759d(0x2a8)][_0x4a759d(0x63f)]['call'](this);},Scene_Name['prototype']['buttonAssistKey4']=function(){const _0x27f5e6=_0x55d321;if(this[_0x27f5e6(0x17c)]()&&this['_inputWindow'][_0x27f5e6(0x5c9)]==='keyboard')return TextManager[_0x27f5e6(0x74d)]([_0x27f5e6(0x63a)]);return Scene_MenuBase[_0x27f5e6(0x2a8)][_0x27f5e6(0x5c5)][_0x27f5e6(0x2b5)](this);},Scene_Name['prototype']['buttonAssistKey5']=function(){const _0x2c68d2=_0x55d321;if(this[_0x2c68d2(0x17c)]()&&this[_0x2c68d2(0x3a5)]['_mode']===_0x2c68d2(0x256))return TextManager[_0x2c68d2(0x74d)]([_0x2c68d2(0x671)]);return Scene_MenuBase[_0x2c68d2(0x2a8)][_0x2c68d2(0x1b0)][_0x2c68d2(0x2b5)](this);},Scene_Name[_0x55d321(0x2a8)]['buttonAssistText1']=function(){const _0x359a65=_0x55d321;if(this[_0x359a65(0x17c)]()&&this[_0x359a65(0x3a5)][_0x359a65(0x5c9)]!==_0x359a65(0x256)){const _0x40ad09=VisuMZ[_0x359a65(0x886)][_0x359a65(0x530)][_0x359a65(0x158)];return _0x40ad09[_0x359a65(0x5bc)]||_0x359a65(0x208);}return Scene_MenuBase['prototype'][_0x359a65(0x87b)][_0x359a65(0x2b5)](this);},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x46d)]=function(){const _0x1c7b34=_0x55d321;if(this['EnableNameInput']()){const _0xa8bff9=VisuMZ[_0x1c7b34(0x886)][_0x1c7b34(0x530)]['KeyboardInput'];return this['_inputWindow'][_0x1c7b34(0x5c9)]===_0x1c7b34(0x256)?_0xa8bff9[_0x1c7b34(0x737)]||'Keyboard':_0xa8bff9[_0x1c7b34(0x43a)]||_0x1c7b34(0x43a);}else return Scene_MenuBase[_0x1c7b34(0x2a8)][_0x1c7b34(0x46d)][_0x1c7b34(0x2b5)](this);},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x7a2)]=function(){const _0x1f9a22=_0x55d321;if(this[_0x1f9a22(0x17c)]()){const _0x1b17f1=VisuMZ[_0x1f9a22(0x886)][_0x1f9a22(0x530)]['KeyboardInput'];if(this[_0x1f9a22(0x3a5)][_0x1f9a22(0x5c9)]===_0x1f9a22(0x256))return _0x1b17f1[_0x1f9a22(0x6c7)]||_0x1f9a22(0x6c7);}return Scene_MenuBase['prototype'][_0x1f9a22(0x7a2)][_0x1f9a22(0x2b5)](this);},VisuMZ[_0x55d321(0x886)]['Scene_Name_onInputOk']=Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x766)],Scene_Name[_0x55d321(0x2a8)]['onInputOk']=function(){const _0x332dfe=_0x55d321;this[_0x332dfe(0x6c3)]()?this['onInputBannedWords']():VisuMZ[_0x332dfe(0x886)][_0x332dfe(0x1b8)][_0x332dfe(0x2b5)](this);},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x6c3)]=function(){const _0x1bf94d=_0x55d321,_0x4acdab=VisuMZ['CoreEngine'][_0x1bf94d(0x530)]['KeyboardInput'];if(!_0x4acdab)return![];const _0x384d45=_0x4acdab[_0x1bf94d(0x356)];if(!_0x384d45)return![];const _0x48edc1=this[_0x1bf94d(0x282)]['name']()['toLowerCase']();for(const _0x3590f7 of _0x384d45){if(_0x48edc1['includes'](_0x3590f7[_0x1bf94d(0x7ec)]()))return!![];}return![];},Scene_Name[_0x55d321(0x2a8)][_0x55d321(0x7ad)]=function(){const _0x17106c=_0x55d321;SoundManager[_0x17106c(0x324)]();},VisuMZ['CoreEngine']['Scene_Battle_update']=Scene_Battle[_0x55d321(0x2a8)]['update'],Scene_Battle[_0x55d321(0x2a8)]['update']=function(){const _0x4387d2=_0x55d321;VisuMZ[_0x4387d2(0x886)][_0x4387d2(0x7d0)][_0x4387d2(0x2b5)](this);if($gameTemp['_playTestFastMode'])this[_0x4387d2(0x4a9)]();},Scene_Battle[_0x55d321(0x2a8)]['updatePlayTestF7']=function(){const _0x14c186=_0x55d321;!BattleManager[_0x14c186(0x714)]()&&!this[_0x14c186(0x887)]&&!$gameMessage[_0x14c186(0x237)]()&&(this['_playtestF7Looping']=!![],this['update'](),SceneManager[_0x14c186(0x142)](),this['_playtestF7Looping']=![]);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x6a5)]=Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x61f)],Scene_Battle['prototype'][_0x55d321(0x61f)]=function(){const _0x40fbd9=_0x55d321;VisuMZ['CoreEngine'][_0x40fbd9(0x6a5)]['call'](this),SceneManager[_0x40fbd9(0x144)]()&&this['repositionCancelButtonSideButtonLayout']();},Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x1fb)]=function(){const _0x184b96=_0x55d321;this[_0x184b96(0x693)]['x']=Graphics[_0x184b96(0x8d1)]+0x4,this[_0x184b96(0x77d)]()?this[_0x184b96(0x693)]['y']=Graphics['boxHeight']-this['buttonAreaHeight']():this[_0x184b96(0x693)]['y']=0x0;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x78d)]=Sprite_Button[_0x55d321(0x2a8)][_0x55d321(0x4a1)],Sprite_Button[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(_0x5338d5){const _0x168917=_0x55d321;VisuMZ[_0x168917(0x886)][_0x168917(0x78d)][_0x168917(0x2b5)](this,_0x5338d5),this[_0x168917(0x659)]();},Sprite_Button[_0x55d321(0x2a8)]['initButtonHidden']=function(){const _0x397c9e=_0x55d321,_0x4dfdd6=VisuMZ['CoreEngine'][_0x397c9e(0x530)]['UI'];this['_isButtonHidden']=![];switch(this[_0x397c9e(0x73e)]){case'cancel':this[_0x397c9e(0x71f)]=!_0x4dfdd6[_0x397c9e(0x402)];break;case _0x397c9e(0x16a):case _0x397c9e(0x7fb):this[_0x397c9e(0x71f)]=!_0x4dfdd6[_0x397c9e(0x7a5)];break;case _0x397c9e(0x7c7):case'up':case _0x397c9e(0x1eb):case _0x397c9e(0x181):case'ok':this[_0x397c9e(0x71f)]=!_0x4dfdd6['numberShowButton'];break;case _0x397c9e(0x46c):this[_0x397c9e(0x71f)]=!_0x4dfdd6['menuShowButton'];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button['prototype'][_0x55d321(0x691)],Sprite_Button[_0x55d321(0x2a8)][_0x55d321(0x691)]=function(){const _0x2684a2=_0x55d321;SceneManager[_0x2684a2(0x83d)]()||this[_0x2684a2(0x71f)]?this[_0x2684a2(0x85b)]():VisuMZ[_0x2684a2(0x886)][_0x2684a2(0x408)][_0x2684a2(0x2b5)](this);},Sprite_Button['prototype'][_0x55d321(0x85b)]=function(){const _0x535409=_0x55d321;this[_0x535409(0x382)]=![],this[_0x535409(0x5c7)]=0x0,this['x']=Graphics[_0x535409(0x85f)]*0xa,this['y']=Graphics[_0x535409(0x48d)]*0xa;},VisuMZ[_0x55d321(0x886)]['Sprite_Battler_startMove']=Sprite_Battler[_0x55d321(0x2a8)]['startMove'],Sprite_Battler[_0x55d321(0x2a8)][_0x55d321(0x364)]=function(_0x4e50bf,_0xf18b01,_0x172fb3){const _0x54b6f4=_0x55d321;(this[_0x54b6f4(0x670)]!==_0x4e50bf||this[_0x54b6f4(0x34f)]!==_0xf18b01)&&(this['setMoveEasingType'](_0x54b6f4(0x1aa)),this[_0x54b6f4(0x513)]=_0x172fb3),VisuMZ[_0x54b6f4(0x886)][_0x54b6f4(0x24a)][_0x54b6f4(0x2b5)](this,_0x4e50bf,_0xf18b01,_0x172fb3);},Sprite_Battler[_0x55d321(0x2a8)][_0x55d321(0x26f)]=function(_0x14d784){const _0x55f4f7=_0x55d321;this[_0x55f4f7(0x7c6)]=_0x14d784;},Sprite_Battler[_0x55d321(0x2a8)][_0x55d321(0x666)]=function(){const _0x3825a0=_0x55d321;if(this[_0x3825a0(0x3ec)]<=0x0)return;const _0x509e08=this[_0x3825a0(0x3ec)],_0x2175bb=this[_0x3825a0(0x513)],_0x4eec92=this['_moveEasingType'];this[_0x3825a0(0x81f)]=this[_0x3825a0(0x924)](this[_0x3825a0(0x81f)],this['_targetOffsetX'],_0x509e08,_0x2175bb,_0x4eec92),this[_0x3825a0(0x4b3)]=this['applyEasing'](this[_0x3825a0(0x4b3)],this['_targetOffsetY'],_0x509e08,_0x2175bb,_0x4eec92),this['_movementDuration']--;if(this[_0x3825a0(0x3ec)]<=0x0)this[_0x3825a0(0x2e1)]();},Sprite_Battler[_0x55d321(0x2a8)][_0x55d321(0x924)]=function(_0xae7044,_0x3d9c55,_0x4debb9,_0x700787,_0x46875a){const _0x2bdda0=_0x55d321,_0x106231=VisuMZ[_0x2bdda0(0x8b2)]((_0x700787-_0x4debb9)/_0x700787,_0x46875a||'Linear'),_0x5277d7=VisuMZ['ApplyEasing']((_0x700787-_0x4debb9+0x1)/_0x700787,_0x46875a||_0x2bdda0(0x1aa)),_0x4e4875=(_0xae7044-_0x3d9c55*_0x106231)/(0x1-_0x106231);return _0x4e4875+(_0x3d9c55-_0x4e4875)*_0x5277d7;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x33b)]=Sprite_Actor[_0x55d321(0x2a8)][_0x55d321(0x47a)],Sprite_Actor['prototype'][_0x55d321(0x47a)]=function(_0x1c7f30){const _0x151947=_0x55d321;VisuMZ[_0x151947(0x886)][_0x151947(0x530)]['UI']['RepositionActors']?this[_0x151947(0x3a9)](_0x1c7f30):VisuMZ[_0x151947(0x886)][_0x151947(0x33b)]['call'](this,_0x1c7f30);},Sprite_Actor[_0x55d321(0x2a8)][_0x55d321(0x3a9)]=function(_0x5ed878){const _0x1c782e=_0x55d321;let _0x1e5d90=Math[_0x1c782e(0x69f)](Graphics[_0x1c782e(0x85f)]/0x2+0xc0);_0x1e5d90-=Math[_0x1c782e(0x33d)]((Graphics[_0x1c782e(0x85f)]-Graphics[_0x1c782e(0x8d1)])/0x2),_0x1e5d90+=_0x5ed878*0x20;let _0x390538=Graphics['height']-0xc8-$gameParty[_0x1c782e(0x82a)]()*0x30;_0x390538-=Math[_0x1c782e(0x33d)]((Graphics[_0x1c782e(0x48d)]-Graphics['boxHeight'])/0x2),_0x390538+=_0x5ed878*0x30,this[_0x1c782e(0x531)](_0x1e5d90,_0x390538);},Sprite_Actor[_0x55d321(0x2a8)][_0x55d321(0x14a)]=function(){this['startMove'](0x4b0,0x0,0x78);},Sprite_Animation[_0x55d321(0x2a8)]['setMute']=function(_0x42920c){const _0x59f897=_0x55d321;this[_0x59f897(0x85d)]=_0x42920c;},VisuMZ[_0x55d321(0x886)]['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x55d321(0x2a8)]['processSoundTimings'],Sprite_Animation[_0x55d321(0x2a8)][_0x55d321(0x73c)]=function(){const _0x35574a=_0x55d321;if(this[_0x35574a(0x85d)])return;VisuMZ['CoreEngine']['Sprite_Animation_processSoundTimings'][_0x35574a(0x2b5)](this);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x664)]=Sprite_Animation[_0x55d321(0x2a8)][_0x55d321(0x93f)],Sprite_Animation['prototype'][_0x55d321(0x93f)]=function(_0x189a72){const _0x582c83=_0x55d321;this['isAnimationOffsetXMirrored']()?this[_0x582c83(0x8a5)](_0x189a72):VisuMZ[_0x582c83(0x886)][_0x582c83(0x664)][_0x582c83(0x2b5)](this,_0x189a72);},Sprite_Animation[_0x55d321(0x2a8)][_0x55d321(0x8df)]=function(){const _0x2f01d0=_0x55d321;if(!this['_animation'])return![];const _0x28ba62=this['_animation'][_0x2f01d0(0x7c4)]||'';if(_0x28ba62[_0x2f01d0(0x362)](/<MIRROR OFFSET X>/i))return!![];if(_0x28ba62[_0x2f01d0(0x362)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x2f01d0(0x886)][_0x2f01d0(0x530)][_0x2f01d0(0x6f5)]['AnimationMirrorOffset'];},Sprite_Animation[_0x55d321(0x2a8)]['setViewportCoreEngineFix']=function(_0x12aa7a){const _0x3981e9=_0x55d321,_0x1783d3=this[_0x3981e9(0x51a)],_0xb55eec=this[_0x3981e9(0x51a)],_0x3ce5f4=this[_0x3981e9(0x172)][_0x3981e9(0x6a7)]*(this[_0x3981e9(0x53e)]?-0x1:0x1)-_0x1783d3/0x2,_0x43c309=this['_animation'][_0x3981e9(0x5fa)]-_0xb55eec/0x2,_0x12125a=this[_0x3981e9(0x90f)](_0x12aa7a);_0x12aa7a['gl'][_0x3981e9(0x87c)](_0x3ce5f4+_0x12125a['x'],_0x43c309+_0x12125a['y'],_0x1783d3,_0xb55eec);},Sprite_Animation[_0x55d321(0x2a8)][_0x55d321(0x40f)]=function(_0x2ac498){const _0x5c5cdb=_0x55d321;if(_0x2ac498['_mainSprite']){}const _0x2116c2=this[_0x5c5cdb(0x172)][_0x5c5cdb(0x7c4)];let _0x91e785=_0x2ac498[_0x5c5cdb(0x48d)]*_0x2ac498[_0x5c5cdb(0x601)]['y'],_0x3cd0db=0x0,_0xb4ad37=-_0x91e785/0x2;if(_0x2116c2[_0x5c5cdb(0x362)](/<(?:HEAD|HEADER|TOP)>/i))_0xb4ad37=-_0x91e785;if(_0x2116c2[_0x5c5cdb(0x362)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0xb4ad37=0x0;if(this[_0x5c5cdb(0x172)][_0x5c5cdb(0x3bd)])_0xb4ad37=0x0;if(_0x2116c2[_0x5c5cdb(0x362)](/<(?:LEFT)>/i))_0x3cd0db=-_0x2ac498[_0x5c5cdb(0x85f)]/0x2;if(_0x2116c2[_0x5c5cdb(0x362)](/<(?:RIGHT)>/i))_0x3cd0db=_0x2ac498['width']/0x2;_0x2116c2[_0x5c5cdb(0x362)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x3cd0db=Number(RegExp['$1'])*_0x2ac498[_0x5c5cdb(0x85f)]);_0x2116c2[_0x5c5cdb(0x362)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0xb4ad37=(0x1-Number(RegExp['$1']))*-_0x91e785);_0x2116c2['match'](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3cd0db=Number(RegExp['$1'])*_0x2ac498[_0x5c5cdb(0x85f)],_0xb4ad37=(0x1-Number(RegExp['$2']))*-_0x91e785);if(_0x2116c2[_0x5c5cdb(0x362)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3cd0db+=Number(RegExp['$1']);if(_0x2116c2[_0x5c5cdb(0x362)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0xb4ad37+=Number(RegExp['$1']);_0x2116c2[_0x5c5cdb(0x362)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3cd0db+=Number(RegExp['$1']),_0xb4ad37+=Number(RegExp['$2']));const _0x4d9946=new Point(_0x3cd0db,_0xb4ad37);return _0x2ac498[_0x5c5cdb(0x198)](),_0x2ac498['worldTransform'][_0x5c5cdb(0x8d9)](_0x4d9946);},Sprite_AnimationMV[_0x55d321(0x2a8)]['setupRate']=function(){const _0x2f53a8=_0x55d321;this[_0x2f53a8(0x571)]=VisuMZ[_0x2f53a8(0x886)][_0x2f53a8(0x530)][_0x2f53a8(0x6f5)][_0x2f53a8(0x675)]??0x4,this[_0x2f53a8(0x374)](),this['_rate']=this[_0x2f53a8(0x571)][_0x2f53a8(0x19a)](0x1,0xa);},Sprite_AnimationMV[_0x55d321(0x2a8)][_0x55d321(0x374)]=function(){const _0x10bead=_0x55d321;if(!this[_0x10bead(0x172)]);const _0x1bd03d=this[_0x10bead(0x172)][_0x10bead(0x7c4)]||'';_0x1bd03d[_0x10bead(0x362)](/<RATE:[ ](\d+)>/i)&&(this[_0x10bead(0x571)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x55d321(0x2a8)][_0x55d321(0x66b)]=function(_0x4c8c6d){const _0x3c44ec=_0x55d321;this[_0x3c44ec(0x85d)]=_0x4c8c6d;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x599)]=Sprite_AnimationMV[_0x55d321(0x2a8)][_0x55d321(0x4a7)],Sprite_AnimationMV[_0x55d321(0x2a8)][_0x55d321(0x4a7)]=function(_0x44ce43){const _0x177be4=_0x55d321;this[_0x177be4(0x85d)]&&(_0x44ce43=JsonEx[_0x177be4(0x3eb)](_0x44ce43),_0x44ce43['se']&&(_0x44ce43['se'][_0x177be4(0x21d)]=0x0)),VisuMZ['CoreEngine'][_0x177be4(0x599)][_0x177be4(0x2b5)](this,_0x44ce43);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5cc)]=Sprite_AnimationMV[_0x55d321(0x2a8)][_0x55d321(0x3db)],Sprite_AnimationMV[_0x55d321(0x2a8)][_0x55d321(0x3db)]=function(){const _0x22e751=_0x55d321;VisuMZ[_0x22e751(0x886)][_0x22e751(0x5cc)]['call'](this);if(this[_0x22e751(0x172)]['position']===0x3){if(this['x']===0x0)this['x']=Math['round'](Graphics[_0x22e751(0x85f)]/0x2);if(this['y']===0x0)this['y']=Math[_0x22e751(0x69f)](Graphics[_0x22e751(0x48d)]/0x2);}},Sprite_Damage['prototype'][_0x55d321(0x764)]=function(_0x1f258f){const _0x4b3248=_0x55d321;let _0x599a0f=Math['abs'](_0x1f258f)['toString']();this[_0x4b3248(0x57d)]()&&(_0x599a0f=VisuMZ['GroupDigits'](_0x599a0f));const _0x3be32a=this[_0x4b3248(0x2d7)](),_0x2fd9c6=Math[_0x4b3248(0x33d)](_0x3be32a*0.75);for(let _0x4b2027=0x0;_0x4b2027<_0x599a0f['length'];_0x4b2027++){const _0x1f5047=this[_0x4b3248(0x788)](_0x2fd9c6,_0x3be32a);_0x1f5047[_0x4b3248(0x5de)][_0x4b3248(0x4bd)](_0x599a0f[_0x4b2027],0x0,0x0,_0x2fd9c6,_0x3be32a,'center'),_0x1f5047['x']=(_0x4b2027-(_0x599a0f['length']-0x1)/0x2)*_0x2fd9c6,_0x1f5047['dy']=-_0x4b2027;}},Sprite_Damage['prototype'][_0x55d321(0x57d)]=function(){const _0x1848bb=_0x55d321;return VisuMZ[_0x1848bb(0x886)][_0x1848bb(0x530)][_0x1848bb(0x6f5)][_0x1848bb(0x662)];},Sprite_Damage[_0x55d321(0x2a8)][_0x55d321(0x4e8)]=function(){const _0x47d8ad=_0x55d321;return ColorManager[_0x47d8ad(0x33e)]();},VisuMZ[_0x55d321(0x886)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x55d321(0x2a8)][_0x55d321(0x406)],Sprite_Gauge['prototype'][_0x55d321(0x406)]=function(){const _0x4ebb0e=_0x55d321;return VisuMZ[_0x4ebb0e(0x886)][_0x4ebb0e(0x6fb)][_0x4ebb0e(0x2b5)](this)['clamp'](0x0,0x1);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x655)]=Sprite_Gauge['prototype'][_0x55d321(0x3e1)],Sprite_Gauge['prototype']['currentValue']=function(){const _0x4039c0=_0x55d321;let _0x53a326=VisuMZ['CoreEngine'][_0x4039c0(0x655)][_0x4039c0(0x2b5)](this);return _0x53a326;},Sprite_Gauge[_0x55d321(0x2a8)]['drawValue']=function(){const _0x3ac6c7=_0x55d321;let _0xfea551=this[_0x3ac6c7(0x3e1)]();this[_0x3ac6c7(0x57d)]()&&(_0xfea551=VisuMZ['GroupDigits'](_0xfea551));const _0x40a17f=this[_0x3ac6c7(0x5d4)]()-0x1,_0x5ce905=this['textHeight']?this[_0x3ac6c7(0x2bc)]():this[_0x3ac6c7(0x687)]();this[_0x3ac6c7(0x702)](),this[_0x3ac6c7(0x5de)]['drawText'](_0xfea551,0x0,0x0,_0x40a17f,_0x5ce905,_0x3ac6c7(0x649));},Sprite_Gauge[_0x55d321(0x2a8)][_0x55d321(0x65f)]=function(){return 0x3;},Sprite_Gauge[_0x55d321(0x2a8)][_0x55d321(0x57d)]=function(){const _0x39fa0f=_0x55d321;return VisuMZ[_0x39fa0f(0x886)][_0x39fa0f(0x530)]['QoL'][_0x39fa0f(0x7ed)];},Sprite_Gauge[_0x55d321(0x2a8)]['valueOutlineColor']=function(){const _0x2464fb=_0x55d321;return ColorManager[_0x2464fb(0x179)]();},Sprite_StateIcon[_0x55d321(0x90b)]=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)]['UI']['StateIconsNonFrame']??!![],VisuMZ[_0x55d321(0x886)][_0x55d321(0x87e)]=Sprite_StateIcon[_0x55d321(0x2a8)][_0x55d321(0x1a7)],Sprite_StateIcon[_0x55d321(0x2a8)][_0x55d321(0x1a7)]=function(){const _0x5875af=_0x55d321;Sprite_StateIcon[_0x5875af(0x90b)]?this['loadBitmapCoreEngine']():VisuMZ[_0x5875af(0x886)][_0x5875af(0x87e)][_0x5875af(0x2b5)](this);},Sprite_StateIcon[_0x55d321(0x2a8)]['loadBitmapCoreEngine']=function(){const _0x4d1436=_0x55d321;this[_0x4d1436(0x5de)]=new Bitmap(ImageManager['iconWidth'],ImageManager['iconHeight']),this['_srcBitmap']=ImageManager[_0x4d1436(0x577)](_0x4d1436(0x583));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x56c)]=Sprite_StateIcon[_0x55d321(0x2a8)]['updateFrame'],Sprite_StateIcon['prototype'][_0x55d321(0x85e)]=function(){const _0x20c657=_0x55d321;Sprite_StateIcon[_0x20c657(0x90b)]?this[_0x20c657(0x6c6)]():VisuMZ[_0x20c657(0x886)][_0x20c657(0x56c)][_0x20c657(0x2b5)](this);},Sprite_StateIcon['prototype'][_0x55d321(0x6c6)]=function(){const _0x4977fa=_0x55d321;if(this[_0x4977fa(0x3da)]===this['_iconIndex'])return;this[_0x4977fa(0x3da)]=this[_0x4977fa(0x622)];const _0x4395f7=ImageManager['iconWidth'],_0x4852a8=ImageManager[_0x4977fa(0x8b0)],_0x4f951b=this[_0x4977fa(0x622)]%0x10*_0x4395f7,_0x522880=Math[_0x4977fa(0x33d)](this['_iconIndex']/0x10)*_0x4852a8,_0x5c5fe7=this['_srcBitmap'],_0xe164c7=this['bitmap'];_0xe164c7[_0x4977fa(0x75d)](),_0xe164c7[_0x4977fa(0x3f1)](_0x5c5fe7,_0x4f951b,_0x522880,_0x4395f7,_0x4852a8,0x0,0x0,_0xe164c7[_0x4977fa(0x85f)],_0xe164c7[_0x4977fa(0x48d)]);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x765)]=Sprite_Picture[_0x55d321(0x2a8)][_0x55d321(0x1a7)],Sprite_Picture[_0x55d321(0x2a8)][_0x55d321(0x1a7)]=function(){const _0x28a335=_0x55d321;this[_0x28a335(0x621)]&&this[_0x28a335(0x621)][_0x28a335(0x362)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x28a335(0x6ac)](Number(RegExp['$1'])):VisuMZ[_0x28a335(0x886)]['Sprite_Picture_loadBitmap']['call'](this);},Sprite_Picture[_0x55d321(0x2a8)][_0x55d321(0x6ac)]=function(_0x3e0c8c){const _0x5da3d1=_0x55d321,_0x37ca3c=ImageManager[_0x5da3d1(0x375)],_0x232c8c=ImageManager[_0x5da3d1(0x8b0)],_0x3b2fc7=this[_0x5da3d1(0x621)][_0x5da3d1(0x362)](/SMOOTH/i);this['bitmap']=new Bitmap(_0x37ca3c,_0x232c8c);const _0x454699=ImageManager['loadSystem'](_0x5da3d1(0x583)),_0x2338b8=_0x3e0c8c%0x10*_0x37ca3c,_0x4068e6=Math[_0x5da3d1(0x33d)](_0x3e0c8c/0x10)*_0x232c8c;this[_0x5da3d1(0x5de)][_0x5da3d1(0x4f5)]=_0x3b2fc7,this[_0x5da3d1(0x5de)][_0x5da3d1(0x3f1)](_0x454699,_0x2338b8,_0x4068e6,_0x37ca3c,_0x232c8c,0x0,0x0,_0x37ca3c,_0x232c8c);};function Sprite_TitlePictureButton(){const _0xa424a1=_0x55d321;this[_0xa424a1(0x4a1)](...arguments);}Sprite_TitlePictureButton[_0x55d321(0x2a8)]=Object['create'](Sprite_Clickable[_0x55d321(0x2a8)]),Sprite_TitlePictureButton[_0x55d321(0x2a8)][_0x55d321(0x73b)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x55d321(0x2a8)]['initialize']=function(_0x7ad24c){const _0x4e9753=_0x55d321;Sprite_Clickable['prototype'][_0x4e9753(0x4a1)][_0x4e9753(0x2b5)](this),this['_data']=_0x7ad24c,this[_0x4e9753(0x7cd)]=null,this['setup']();},Sprite_TitlePictureButton['prototype'][_0x55d321(0x852)]=function(){const _0x109590=_0x55d321;this['x']=Graphics[_0x109590(0x85f)],this['y']=Graphics['height'],this['visible']=![],this[_0x109590(0x1d8)]();},Sprite_TitlePictureButton[_0x55d321(0x2a8)][_0x55d321(0x1d8)]=function(){const _0x37c921=_0x55d321;this[_0x37c921(0x5de)]=ImageManager['loadPicture'](this[_0x37c921(0x663)]['PictureFilename']),this[_0x37c921(0x5de)][_0x37c921(0x5b1)](this[_0x37c921(0x63e)][_0x37c921(0x88a)](this));},Sprite_TitlePictureButton[_0x55d321(0x2a8)][_0x55d321(0x63e)]=function(){const _0x4703ac=_0x55d321;this[_0x4703ac(0x663)]['OnLoadJS'][_0x4703ac(0x2b5)](this),this[_0x4703ac(0x663)][_0x4703ac(0x667)][_0x4703ac(0x2b5)](this),this[_0x4703ac(0x3e9)](this[_0x4703ac(0x663)][_0x4703ac(0x91d)][_0x4703ac(0x88a)](this));},Sprite_TitlePictureButton['prototype'][_0x55d321(0x264)]=function(){const _0x5adc3d=_0x55d321;Sprite_Clickable['prototype'][_0x5adc3d(0x264)][_0x5adc3d(0x2b5)](this),this[_0x5adc3d(0x691)](),this[_0x5adc3d(0x35f)]();},Sprite_TitlePictureButton[_0x55d321(0x2a8)][_0x55d321(0x450)]=function(){const _0x206497=_0x55d321;return VisuMZ[_0x206497(0x886)][_0x206497(0x530)][_0x206497(0x5e8)][_0x206497(0x4b8)][_0x206497(0x86f)];},Sprite_TitlePictureButton[_0x55d321(0x2a8)]['updateOpacity']=function(){const _0x37ae70=_0x55d321;this[_0x37ae70(0x8dd)]||this[_0x37ae70(0x58c)]?this[_0x37ae70(0x5c7)]=0xff:(this[_0x37ae70(0x5c7)]+=this[_0x37ae70(0x382)]?this[_0x37ae70(0x450)]():-0x1*this[_0x37ae70(0x450)](),this['opacity']=Math[_0x37ae70(0x89b)](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x55d321(0x2a8)][_0x55d321(0x3e9)]=function(_0x3c5c28){const _0x860262=_0x55d321;this[_0x860262(0x7cd)]=_0x3c5c28;},Sprite_TitlePictureButton[_0x55d321(0x2a8)][_0x55d321(0x7b0)]=function(){const _0x584f27=_0x55d321;this['_clickHandler']&&this[_0x584f27(0x7cd)]();};function Sprite_ExtendedTile(){this['initialize'](...arguments);}Sprite_ExtendedTile[_0x55d321(0x2a8)]=Object[_0x55d321(0x568)](Sprite[_0x55d321(0x2a8)]),Sprite_ExtendedTile[_0x55d321(0x2a8)][_0x55d321(0x73b)]=Sprite_ExtendedTile,Sprite_ExtendedTile[_0x55d321(0x2a8)]['initialize']=function(_0x3f9fb1,_0x13baf6,_0x54058c,_0x5968d2){const _0x267146=_0x55d321;this['_shiftY']=Game_CharacterBase['DEFAULT_SHIFT_Y']||-0x6,this['_mapX']=_0x3f9fb1,this[_0x267146(0x18c)]=_0x13baf6,this['_tile']=_0x54058c,this['_patternHeight']=_0x5968d2,Sprite[_0x267146(0x2a8)][_0x267146(0x4a1)][_0x267146(0x2b5)](this),this[_0x267146(0x637)](),this['loadTileBitmap'](),this[_0x267146(0x756)](),this['update']();},Sprite_ExtendedTile[_0x55d321(0x2a8)][_0x55d321(0x637)]=function(){const _0x3e498=_0x55d321;this[_0x3e498(0x23f)]=new Sprite(),this[_0x3e498(0x23f)][_0x3e498(0x21e)]['x']=0.5,this['_tileSprite'][_0x3e498(0x21e)]['y']=0x1,this[_0x3e498(0x23f)]['y']=-this[_0x3e498(0x5cd)]+0x1,this[_0x3e498(0x7af)](this[_0x3e498(0x23f)]);},Sprite_ExtendedTile[_0x55d321(0x2a8)][_0x55d321(0x4bc)]=function(){const _0x31173b=_0x55d321,_0x398b4c=$gameMap[_0x31173b(0x8da)](),_0x3a7b7e=0x5+Math[_0x31173b(0x33d)](this[_0x31173b(0x38b)]/0x100);this[_0x31173b(0x23f)][_0x31173b(0x5de)]=ImageManager[_0x31173b(0x2cc)](_0x398b4c['tilesetNames'][_0x3a7b7e]);},Sprite_ExtendedTile[_0x55d321(0x2a8)][_0x55d321(0x756)]=function(){const _0x29f0e7=_0x55d321,_0x5a0cb9=this['_tile'],_0x4c6f32=$gameMap[_0x29f0e7(0x694)](),_0xf3bb99=$gameMap['tileHeight'](),_0x31b8b1=(Math[_0x29f0e7(0x33d)](_0x5a0cb9/0x80)%0x2*0x8+_0x5a0cb9%0x8)*_0x4c6f32,_0x18962b=Math[_0x29f0e7(0x33d)](_0x5a0cb9%0x100/0x8)%0x10*_0xf3bb99,_0x2539c6=this[_0x29f0e7(0x934)]*_0xf3bb99;this[_0x29f0e7(0x23f)]['setFrame'](_0x31b8b1,_0x18962b-_0x2539c6,_0x4c6f32,_0xf3bb99+_0x2539c6);},Sprite_ExtendedTile['prototype'][_0x55d321(0x264)]=function(){const _0x2a0b08=_0x55d321;Sprite[_0x2a0b08(0x2a8)][_0x2a0b08(0x264)][_0x2a0b08(0x2b5)](this),this[_0x2a0b08(0x3db)]();},Sprite_ExtendedTile['prototype'][_0x55d321(0x3db)]=function(){const _0x522f60=_0x55d321,_0x10a603=$gameMap[_0x522f60(0x694)](),_0x5d32f1=$gameMap[_0x522f60(0x2b6)](),_0xf037cd=this['_mapX'],_0x41ca0c=this[_0x522f60(0x18c)];this['x']=Math[_0x522f60(0x33d)](($gameMap[_0x522f60(0x635)](_0xf037cd)+0.5)*_0x10a603),this['y']=Math['floor'](($gameMap[_0x522f60(0x14c)](_0x41ca0c)+0x1)*_0x5d32f1)+this['_shiftY']-0x1;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x7df)]=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x55d321(0x2a8)]['initialize']=function(){const _0x294d78=_0x55d321;VisuMZ[_0x294d78(0x886)]['Spriteset_Base_initialize']['call'](this),this[_0x294d78(0x1d5)]();},Spriteset_Base['prototype']['initMembersCoreEngine']=function(){const _0x4a8547=_0x55d321;this[_0x4a8547(0x277)]=[],this['_pointAnimationSprites']=[],this['_cacheScaleX']=this[_0x4a8547(0x601)]['x'],this[_0x4a8547(0x7da)]=this[_0x4a8547(0x601)]['y'];},VisuMZ['CoreEngine'][_0x55d321(0x16f)]=Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x883)],Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x883)]=function(_0x330c19){const _0x1e520f=_0x55d321;this['removeAllFauxAnimations'](),this[_0x1e520f(0x80f)](),VisuMZ[_0x1e520f(0x886)][_0x1e520f(0x16f)]['call'](this,_0x330c19);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x49f)]=Spriteset_Base['prototype'][_0x55d321(0x264)],Spriteset_Base['prototype'][_0x55d321(0x264)]=function(){const _0x20dc9e=_0x55d321;VisuMZ[_0x20dc9e(0x886)]['Spriteset_Base_update'][_0x20dc9e(0x2b5)](this),this['updatePictureSettings'](),this[_0x20dc9e(0x3c9)](),this[_0x20dc9e(0x772)](),this[_0x20dc9e(0x1f0)]();},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x557)]=function(){},Spriteset_Base['prototype']['updatePictureAntiZoom']=function(){const _0x36e695=_0x55d321;if(!VisuMZ[_0x36e695(0x886)][_0x36e695(0x530)]['QoL']['AntiZoomPictures'])return;if(this['_cacheScaleX']===this[_0x36e695(0x601)]['x']&&this['_cacheScaleY']===this[_0x36e695(0x601)]['y'])return;this['adjustPictureAntiZoom'](),this[_0x36e695(0x8d3)]=this[_0x36e695(0x601)]['x'],this[_0x36e695(0x7da)]=this[_0x36e695(0x601)]['y'];},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x5f8)]=function(){const _0x2c67b6=_0x55d321;if(SceneManager[_0x2c67b6(0x4f8)]()&&Spriteset_Map[_0x2c67b6(0x645)])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x2c67b6(0x645)])return;}this[_0x2c67b6(0x601)]['x']!==0x0&&(this[_0x2c67b6(0x2f7)]['scale']['x']=0x1/this['scale']['x'],this[_0x2c67b6(0x2f7)]['x']=-(this['x']/this[_0x2c67b6(0x601)]['x'])),this[_0x2c67b6(0x601)]['y']!==0x0&&(this[_0x2c67b6(0x2f7)][_0x2c67b6(0x601)]['y']=0x1/this[_0x2c67b6(0x601)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x2c67b6(0x601)]['y']));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x3c5)]=Spriteset_Base['prototype'][_0x55d321(0x3db)],Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x3db)]=function(){const _0xae48e0=_0x55d321;VisuMZ['CoreEngine'][_0xae48e0(0x3c5)][_0xae48e0(0x2b5)](this),this[_0xae48e0(0x17e)]();},Spriteset_Base['prototype'][_0x55d321(0x17e)]=function(){const _0x50f543=_0x55d321;if(!$gameScreen)return;if($gameScreen[_0x50f543(0x204)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x50f543(0x665)]());const _0x4d7877=$gameScreen[_0x50f543(0x504)]();switch($gameScreen[_0x50f543(0x504)]()){case _0x50f543(0x616):this[_0x50f543(0x74f)]();break;case _0x50f543(0x25b):this[_0x50f543(0x40a)]();break;case _0x50f543(0x654):this[_0x50f543(0x647)]();break;default:this[_0x50f543(0x477)]();break;}},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x74f)]=function(){const _0x56bf44=_0x55d321,_0x391f2e=VisuMZ[_0x56bf44(0x886)][_0x56bf44(0x530)][_0x56bf44(0x733)];if(_0x391f2e&&_0x391f2e[_0x56bf44(0x4df)])return _0x391f2e[_0x56bf44(0x4df)][_0x56bf44(0x2b5)](this);this['x']+=Math[_0x56bf44(0x69f)]($gameScreen[_0x56bf44(0x665)]());},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x477)]=function(){const _0x9031f0=_0x55d321,_0x24e0e9=VisuMZ['CoreEngine'][_0x9031f0(0x530)][_0x9031f0(0x733)];if(_0x24e0e9&&_0x24e0e9[_0x9031f0(0x7f2)])return _0x24e0e9['randomJS'][_0x9031f0(0x2b5)](this);const _0x3a452=$gameScreen[_0x9031f0(0x606)]*0.75,_0x14c2df=$gameScreen['_shakeSpeed']*0.6,_0x4cec89=$gameScreen[_0x9031f0(0x204)];this['x']+=Math['round'](Math[_0x9031f0(0x388)](_0x3a452)-Math[_0x9031f0(0x388)](_0x14c2df))*(Math[_0x9031f0(0x89b)](_0x4cec89,0x1e)*0.5),this['y']+=Math[_0x9031f0(0x69f)](Math['randomInt'](_0x3a452)-Math[_0x9031f0(0x388)](_0x14c2df))*(Math['min'](_0x4cec89,0x1e)*0.5);},Spriteset_Base['prototype'][_0x55d321(0x40a)]=function(){const _0x3e363f=_0x55d321,_0x36cba5=VisuMZ['CoreEngine'][_0x3e363f(0x530)]['ScreenShake'];if(_0x36cba5&&_0x36cba5['horzJS'])return _0x36cba5[_0x3e363f(0x45b)]['call'](this);const _0x368545=$gameScreen['_shakePower']*0.75,_0x22fb82=$gameScreen[_0x3e363f(0x5fb)]*0.6,_0x4d5797=$gameScreen[_0x3e363f(0x204)];this['x']+=Math['round'](Math[_0x3e363f(0x388)](_0x368545)-Math[_0x3e363f(0x388)](_0x22fb82))*(Math[_0x3e363f(0x89b)](_0x4d5797,0x1e)*0.5);},Spriteset_Base[_0x55d321(0x2a8)]['updatePositionCoreEngineShakeVert']=function(){const _0x195710=_0x55d321,_0x3f875e=VisuMZ[_0x195710(0x886)][_0x195710(0x530)][_0x195710(0x733)];if(_0x3f875e&&_0x3f875e[_0x195710(0x64a)])return _0x3f875e[_0x195710(0x64a)][_0x195710(0x2b5)](this);const _0x507ec6=$gameScreen[_0x195710(0x606)]*0.75,_0x346c61=$gameScreen[_0x195710(0x5fb)]*0.6,_0xe686f4=$gameScreen[_0x195710(0x204)];this['y']+=Math['round'](Math[_0x195710(0x388)](_0x507ec6)-Math['randomInt'](_0x346c61))*(Math[_0x195710(0x89b)](_0xe686f4,0x1e)*0.5);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x772)]=function(){const _0x32977d=_0x55d321;for(const _0x3bed29 of this[_0x32977d(0x277)]){!_0x3bed29['isPlaying']()&&this[_0x32977d(0x84b)](_0x3bed29);}this[_0x32977d(0x5ed)]();},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x5ed)]=function(){const _0x1f8e0e=_0x55d321;for(;;){const _0xff0847=$gameTemp[_0x1f8e0e(0x7e4)]();if(_0xff0847)this['createFauxAnimation'](_0xff0847);else break;}},Spriteset_Base[_0x55d321(0x2a8)]['createFauxAnimation']=function(_0x2a6698){const _0x2e6c5f=_0x55d321,_0x144f0b=$dataAnimations[_0x2a6698[_0x2e6c5f(0x430)]],_0x1914f6=_0x2a6698[_0x2e6c5f(0x28d)],_0x38f80b=_0x2a6698[_0x2e6c5f(0x2f9)],_0x7c917d=_0x2a6698[_0x2e6c5f(0x80b)];let _0x4bcbbe=this['animationBaseDelay']();const _0xa6c1d1=this[_0x2e6c5f(0x53b)]();if(this['isAnimationForEach'](_0x144f0b))for(const _0x47bddd of _0x1914f6){this[_0x2e6c5f(0x4e6)]([_0x47bddd],_0x144f0b,_0x38f80b,_0x4bcbbe,_0x7c917d),_0x4bcbbe+=_0xa6c1d1;}else this[_0x2e6c5f(0x4e6)](_0x1914f6,_0x144f0b,_0x38f80b,_0x4bcbbe,_0x7c917d);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x7fc)]=function(_0x7b320,_0x1487cc,_0x72a6be,_0x479c61){const _0x1a1eb3=_0x55d321,_0x1feacd=this[_0x1a1eb3(0x28b)](_0x1487cc),_0x5a106a=new(_0x1feacd?Sprite_AnimationMV:Sprite_Animation)(),_0x19047e=this['makeTargetSprites'](_0x7b320),_0xeb16a2=this[_0x1a1eb3(0x1b1)](),_0x348280=_0x479c61>_0xeb16a2?this['lastAnimationSprite']():null;this['animationShouldMirror'](_0x7b320[0x0])&&(_0x72a6be=!_0x72a6be),_0x5a106a['targetObjects']=_0x7b320,_0x5a106a[_0x1a1eb3(0x852)](_0x19047e,_0x1487cc,_0x72a6be,_0x479c61,_0x348280),this[_0x1a1eb3(0x199)](_0x5a106a),this[_0x1a1eb3(0x91e)][_0x1a1eb3(0x582)](_0x5a106a);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x4e6)]=function(_0x462dd8,_0x4b42c7,_0x1976a5,_0x4fd54d,_0x19c688){const _0x39c7df=_0x55d321,_0x8b969f=this[_0x39c7df(0x28b)](_0x4b42c7),_0x5a0ec9=new(_0x8b969f?Sprite_AnimationMV:Sprite_Animation)(),_0x3fac83=this[_0x39c7df(0x4cb)](_0x462dd8);this['animationShouldMirror'](_0x462dd8[0x0])&&(_0x1976a5=!_0x1976a5);_0x5a0ec9[_0x39c7df(0x233)]=_0x462dd8,_0x5a0ec9['setup'](_0x3fac83,_0x4b42c7,_0x1976a5,_0x4fd54d),_0x5a0ec9['setMute'](_0x19c688),this[_0x39c7df(0x199)](_0x5a0ec9);if(this[_0x39c7df(0x91e)])this[_0x39c7df(0x91e)][_0x39c7df(0x8e5)](_0x5a0ec9);this['_fauxAnimationSprites'][_0x39c7df(0x582)](_0x5a0ec9);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x199)]=function(_0x18113d){const _0x1ae597=_0x55d321;this['_effectsContainer'][_0x1ae597(0x7af)](_0x18113d);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x695)]=function(_0x37e1d6){const _0x1acb9d=_0x55d321;this[_0x1acb9d(0x91e)][_0x1acb9d(0x8e5)](_0x37e1d6),this[_0x1acb9d(0x55c)](_0x37e1d6);for(const _0x34752a of _0x37e1d6[_0x1acb9d(0x233)]){_0x34752a[_0x1acb9d(0x36f)]&&_0x34752a[_0x1acb9d(0x36f)]();}_0x37e1d6[_0x1acb9d(0x883)]();},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x84b)]=function(_0x3b0900){const _0x526b38=_0x55d321;this[_0x526b38(0x277)][_0x526b38(0x8e5)](_0x3b0900),this[_0x526b38(0x55c)](_0x3b0900);for(const _0x505fbd of _0x3b0900[_0x526b38(0x233)]){_0x505fbd['endAnimation']&&_0x505fbd[_0x526b38(0x36f)]();}_0x3b0900[_0x526b38(0x883)]();},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x55c)]=function(_0x166d94){const _0xdc2fc8=_0x55d321;this['_effectsContainer'][_0xdc2fc8(0x4fc)](_0x166d94);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x346)]=function(){const _0x3b064d=_0x55d321;for(const _0x45e46d of this[_0x3b064d(0x277)]){this['removeFauxAnimation'](_0x45e46d);}},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x90d)]=function(){const _0xc2b314=_0x55d321;return this['_fauxAnimationSprites'][_0xc2b314(0x7e5)]>0x0;},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x1f0)]=function(){const _0x1a9ece=_0x55d321;for(const _0x380aaf of this[_0x1a9ece(0x28f)]){!_0x380aaf['isPlaying']()&&this['removePointAnimation'](_0x380aaf);}this[_0x1a9ece(0x8d5)]();},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x8d5)]=function(){const _0x543fff=_0x55d321;for(;;){const _0x224df4=$gameTemp[_0x543fff(0x254)]();if(_0x224df4)this[_0x543fff(0x7ca)](_0x224df4);else break;}},Spriteset_Base[_0x55d321(0x2a8)]['createPointAnimation']=function(_0x57dd5b){const _0x3f1a06=_0x55d321,_0x36ad4b=$dataAnimations[_0x57dd5b['animationId']],_0x41800a=this['createPointAnimationTargets'](_0x57dd5b),_0x5707d6=_0x57dd5b['mirror'],_0x6518d=_0x57dd5b[_0x3f1a06(0x80b)];let _0x50707a=this[_0x3f1a06(0x1b1)]();const _0x517183=this[_0x3f1a06(0x53b)]();if(this[_0x3f1a06(0x393)](_0x36ad4b))for(const _0x54b179 of _0x41800a){this['createPointAnimationSprite']([_0x54b179],_0x36ad4b,_0x5707d6,_0x50707a,_0x6518d),_0x50707a+=_0x517183;}else this[_0x3f1a06(0x399)](_0x41800a,_0x36ad4b,_0x5707d6,_0x50707a,_0x6518d);},Spriteset_Base['prototype'][_0x55d321(0x483)]=function(_0x1d1043){const _0x2720da=_0x55d321,_0x3908b3=new Sprite_Clickable(),_0x5ca837=this[_0x2720da(0x6f1)]();_0x3908b3['x']=_0x1d1043['x']-_0x5ca837['x'],_0x3908b3['y']=_0x1d1043['y']-_0x5ca837['y'],_0x3908b3['z']=0x64;const _0x537a7e=this[_0x2720da(0x6f1)]();return _0x537a7e[_0x2720da(0x7af)](_0x3908b3),[_0x3908b3];},Spriteset_Base['prototype'][_0x55d321(0x6f1)]=function(){return this;},Spriteset_Map['prototype']['getPointAnimationLayer']=function(){const _0x29b4c6=_0x55d321;return this[_0x29b4c6(0x56e)]||this;},Spriteset_Battle[_0x55d321(0x2a8)][_0x55d321(0x6f1)]=function(){const _0x121438=_0x55d321;return this[_0x121438(0x3fd)]||this;},Spriteset_Base['prototype'][_0x55d321(0x399)]=function(_0x1fe6b8,_0x14d52c,_0x15877b,_0x5c602e,_0xea7fbc){const _0x30e360=_0x55d321,_0x5e1e32=this[_0x30e360(0x28b)](_0x14d52c),_0x30009a=new(_0x5e1e32?Sprite_AnimationMV:Sprite_Animation)();_0x30009a[_0x30e360(0x233)]=_0x1fe6b8,_0x30009a[_0x30e360(0x852)](_0x1fe6b8,_0x14d52c,_0x15877b,_0x5c602e),_0x30009a['setMute'](_0xea7fbc),this[_0x30e360(0x199)](_0x30009a),this[_0x30e360(0x28f)][_0x30e360(0x582)](_0x30009a);},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x184)]=function(_0x53719c){const _0x414457=_0x55d321;this[_0x414457(0x28f)][_0x414457(0x8e5)](_0x53719c),this['_effectsContainer'][_0x414457(0x4fc)](_0x53719c);for(const _0x3d1b7c of _0x53719c[_0x414457(0x233)]){_0x3d1b7c[_0x414457(0x36f)]&&_0x3d1b7c[_0x414457(0x36f)]();const _0x1205eb=this[_0x414457(0x6f1)]();if(_0x1205eb)_0x1205eb[_0x414457(0x4fc)](_0x3d1b7c);}_0x53719c[_0x414457(0x883)]();},Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x80f)]=function(){const _0x2bae17=_0x55d321;for(const _0x4fa7ae of this['_pointAnimationSprites']){this[_0x2bae17(0x184)](_0x4fa7ae);}},Spriteset_Base[_0x55d321(0x2a8)]['isPointAnimationPlaying']=function(){const _0x25403a=_0x55d321;return this[_0x25403a(0x28f)][_0x25403a(0x7e5)]>0x0;},VisuMZ[_0x55d321(0x886)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x55d321(0x2a8)][_0x55d321(0x6b3)],Spriteset_Base['prototype'][_0x55d321(0x6b3)]=function(){const _0x23aca1=_0x55d321;return VisuMZ['CoreEngine'][_0x23aca1(0x596)]['call'](this)||this[_0x23aca1(0x27e)]();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ['CoreEngine']['Settings'][_0x55d321(0x6f5)][_0x55d321(0x1ef)]||![],VisuMZ[_0x55d321(0x886)][_0x55d321(0x482)]=Scene_Map[_0x55d321(0x2a8)]['createSpriteset'],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x404)]=function(){const _0x2ab9a5=_0x55d321;VisuMZ['CoreEngine'][_0x2ab9a5(0x482)]['call'](this);if(!Spriteset_Map[_0x2ab9a5(0x645)])return;const _0x3cfeac=this[_0x2ab9a5(0x64d)];if(!_0x3cfeac)return;this['_pictureContainer']=_0x3cfeac['_pictureContainer'];if(!this[_0x2ab9a5(0x2f7)])return;this[_0x2ab9a5(0x7af)](this[_0x2ab9a5(0x2f7)]);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x619)]=Spriteset_Map['prototype'][_0x55d321(0x70e)],Spriteset_Map[_0x55d321(0x2a8)][_0x55d321(0x70e)]=function(){const _0x230ab4=_0x55d321;VisuMZ[_0x230ab4(0x886)][_0x230ab4(0x619)][_0x230ab4(0x2b5)](this),this[_0x230ab4(0x6fa)]();},Spriteset_Map[_0x55d321(0x2a8)]['createTileExtendSprites']=function(){const _0x5c2b67=_0x55d321,_0x1d4e11=$gameMap['tileset']();if(!_0x1d4e11)return;const _0x4ea51f=$gameMap[_0x5c2b67(0x445)]();if(Object[_0x5c2b67(0x900)](_0x4ea51f)['length']<=0x0)return;const _0x49b0a2=$gameMap[_0x5c2b67(0x294)]();this['_tileExtendSprites']=this[_0x5c2b67(0x88e)]||[];for(let _0x3a227f=0x0;_0x3a227f<$gameMap[_0x5c2b67(0x48d)]();_0x3a227f++){for(let _0x301a3=0x0;_0x301a3<$gameMap['width']();_0x301a3++){for(const _0x1f5085 of $gameMap[_0x5c2b67(0x5b2)](_0x301a3,_0x3a227f)){const _0x4d8f4c=_0x49b0a2[_0x1f5085]>>0xc,_0xc158f1=_0x4ea51f[_0x4d8f4c]||0x0;if(_0xc158f1<=0x0)continue;this[_0x5c2b67(0x30e)](_0x301a3,_0x3a227f,_0x1f5085,_0xc158f1);}}}},Spriteset_Map['prototype'][_0x55d321(0x464)]=function(){const _0x342239=_0x55d321;this[_0x342239(0x88e)]=this[_0x342239(0x88e)]||[];for(const _0x4bbcd0 of this['_tileExtendSprites']){this[_0x342239(0x56e)][_0x342239(0x4fc)](_0x4bbcd0);}this[_0x342239(0x88e)]=[];},Spriteset_Map[_0x55d321(0x2a8)][_0x55d321(0x30e)]=function(_0x540fec,_0x55f876,_0x3d44e6,_0x341640){const _0xce0dc6=_0x55d321,_0xbd1ac1=new Sprite_ExtendedTile(_0x540fec,_0x55f876,_0x3d44e6,_0x341640),_0x4b8e89=$gameMap[_0xce0dc6(0x294)]();_0x4b8e89[_0x3d44e6]&0x10?_0xbd1ac1['z']=0x4:_0xbd1ac1['z']=0x3,this[_0xce0dc6(0x56e)][_0xce0dc6(0x7af)](_0xbd1ac1),this[_0xce0dc6(0x88e)][_0xce0dc6(0x582)](_0xbd1ac1);},VisuMZ['CoreEngine']['Tilemap_addSpotTile']=Tilemap[_0x55d321(0x2a8)][_0x55d321(0x3a4)],Tilemap[_0x55d321(0x2a8)]['_addSpotTile']=function(_0x1f0fa2,_0x4cc876,_0x265508){const _0x26121a=_0x55d321;if($gameMap[_0x26121a(0x77e)](_0x1f0fa2))return;VisuMZ[_0x26121a(0x886)]['Tilemap_addSpotTile'][_0x26121a(0x2b5)](this,_0x1f0fa2,_0x4cc876,_0x265508);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x55d321(0x886)]['Settings'][_0x55d321(0x6f5)]['DetachBattlePictureContainer']||![],VisuMZ[_0x55d321(0x886)][_0x55d321(0x400)]=Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x404)],Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x404)]=function(){const _0x16bf49=_0x55d321;VisuMZ[_0x16bf49(0x886)][_0x16bf49(0x400)]['call'](this);if(!Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;const _0x2f3c49=this[_0x16bf49(0x64d)];if(!_0x2f3c49)return;this['_pictureContainer']=_0x2f3c49[_0x16bf49(0x2f7)];if(!this[_0x16bf49(0x2f7)])return;this['addChild'](this[_0x16bf49(0x2f7)]);},Spriteset_Battle[_0x55d321(0x2a8)][_0x55d321(0x1da)]=function(){const _0x5963f2=_0x55d321;this['_backgroundFilter']=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x5963f2(0x67f)]=new Sprite(),this['_backgroundSprite'][_0x5963f2(0x5de)]=SceneManager['backgroundBitmap'](),this[_0x5963f2(0x67f)][_0x5963f2(0x769)]=[this[_0x5963f2(0x6a9)]],this[_0x5963f2(0x8e3)][_0x5963f2(0x7af)](this[_0x5963f2(0x67f)]);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x255)]=Spriteset_Battle[_0x55d321(0x2a8)][_0x55d321(0x8a3)],Spriteset_Battle[_0x55d321(0x2a8)][_0x55d321(0x8a3)]=function(){const _0x1b3fe9=_0x55d321;this[_0x1b3fe9(0x3d7)]()&&this[_0x1b3fe9(0x81b)](),VisuMZ['CoreEngine'][_0x1b3fe9(0x255)][_0x1b3fe9(0x2b5)](this);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x3a3)]=Spriteset_Battle[_0x55d321(0x2a8)][_0x55d321(0x55d)],Spriteset_Battle[_0x55d321(0x2a8)]['createLowerLayer']=function(){const _0x47ff9b=_0x55d321;VisuMZ[_0x47ff9b(0x886)][_0x47ff9b(0x3a3)][_0x47ff9b(0x2b5)](this),this[_0x47ff9b(0x3fd)]&&this[_0x47ff9b(0x3fd)][_0x47ff9b(0x264)]();},Spriteset_Battle[_0x55d321(0x2a8)][_0x55d321(0x3d7)]=function(){const _0x30e39b=_0x55d321,_0x5ecf42=VisuMZ['CoreEngine']['Settings'][_0x30e39b(0x2f6)];if(!_0x5ecf42)return![];if(Utils[_0x30e39b(0x3d5)]>=_0x30e39b(0x2b9)&&!_0x5ecf42[_0x30e39b(0x768)])return![];if(Utils[_0x30e39b(0x3d5)]>=_0x30e39b(0x5d0)&&!_0x5ecf42[_0x30e39b(0x768)])return![];return _0x5ecf42['RepositionEnemies'];},Spriteset_Battle[_0x55d321(0x2a8)]['repositionEnemiesByResolution']=function(){const _0x2809d8=_0x55d321;for(member of $gameTroop[_0x2809d8(0x6f6)]()){member[_0x2809d8(0x854)]();}},VisuMZ[_0x55d321(0x886)][_0x55d321(0x1d1)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x4a1)],Window_Base['prototype'][_0x55d321(0x4a1)]=function(_0x3be493){const _0x53dc5e=_0x55d321;_0x3be493['x']=Math[_0x53dc5e(0x69f)](_0x3be493['x']),_0x3be493['y']=Math[_0x53dc5e(0x69f)](_0x3be493['y']),_0x3be493[_0x53dc5e(0x85f)]=Math['round'](_0x3be493[_0x53dc5e(0x85f)]),_0x3be493[_0x53dc5e(0x48d)]=Math[_0x53dc5e(0x69f)](_0x3be493[_0x53dc5e(0x48d)]),this[_0x53dc5e(0x5c3)](),VisuMZ['CoreEngine'][_0x53dc5e(0x1d1)]['call'](this,_0x3be493),this[_0x53dc5e(0x3b5)]();},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x5c3)]=function(){const _0x61f413=_0x55d321;this[_0x61f413(0x7d9)]=VisuMZ[_0x61f413(0x886)][_0x61f413(0x530)]['QoL']['DigitGroupingStandardText'],this[_0x61f413(0x84a)]=VisuMZ['CoreEngine']['Settings'][_0x61f413(0x6f5)][_0x61f413(0x3bb)];},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x4e0)]=function(){const _0x1f4934=_0x55d321;return VisuMZ[_0x1f4934(0x886)][_0x1f4934(0x530)][_0x1f4934(0x76b)][_0x1f4934(0x55b)];},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x818)]=function(){const _0x1ea92c=_0x55d321;return VisuMZ[_0x1ea92c(0x886)][_0x1ea92c(0x530)]['Window']['ItemPadding'];},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x280)]=function(){const _0x2ba3f4=_0x55d321;$gameSystem[_0x2ba3f4(0x917)]&&$dataSystem['advanced'][_0x2ba3f4(0x917)]!==undefined?this[_0x2ba3f4(0x366)]=$gameSystem[_0x2ba3f4(0x917)]():this[_0x2ba3f4(0x366)]=VisuMZ[_0x2ba3f4(0x886)][_0x2ba3f4(0x530)][_0x2ba3f4(0x76b)][_0x2ba3f4(0x81e)];},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x761)]=function(){const _0x30a90e=_0x55d321;return VisuMZ[_0x30a90e(0x886)]['Settings'][_0x30a90e(0x76b)][_0x30a90e(0x431)];},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x227)]=function(){const _0x4f940a=_0x55d321;return VisuMZ[_0x4f940a(0x886)][_0x4f940a(0x530)][_0x4f940a(0x76b)][_0x4f940a(0x323)];},VisuMZ[_0x55d321(0x886)][_0x55d321(0x463)]=Window_Base['prototype']['update'],Window_Base[_0x55d321(0x2a8)]['update']=function(){const _0x14dff3=_0x55d321;VisuMZ['CoreEngine']['Window_Base_update'][_0x14dff3(0x2b5)](this),this[_0x14dff3(0x7a3)]();},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x305)]=function(){const _0x503e77=_0x55d321;this[_0x503e77(0x6c2)]&&(this[_0x503e77(0x6bd)]+=this[_0x503e77(0x227)](),this[_0x503e77(0x6dd)]()&&(this[_0x503e77(0x6c2)]=![]));},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x3bf)]=function(){const _0x172d1a=_0x55d321;this[_0x172d1a(0x424)]&&(this[_0x172d1a(0x6bd)]-=this[_0x172d1a(0x227)](),this[_0x172d1a(0x541)]()&&(this['_closing']=![]));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x59d)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x4bd)],Window_Base[_0x55d321(0x2a8)][_0x55d321(0x4bd)]=function(_0x419f9e,_0x2e3fef,_0x358881,_0x1f4ca4,_0xdddd57){const _0x445d04=_0x55d321;if(this[_0x445d04(0x57d)]())_0x419f9e=VisuMZ['GroupDigits'](_0x419f9e);VisuMZ[_0x445d04(0x886)][_0x445d04(0x59d)][_0x445d04(0x2b5)](this,_0x419f9e,_0x2e3fef,_0x358881,_0x1f4ca4,_0xdddd57);},Window_Base[_0x55d321(0x2a8)]['useDigitGrouping']=function(){const _0x31ea8f=_0x55d321;return this[_0x31ea8f(0x7d9)];},VisuMZ['CoreEngine']['Window_Base_createTextState']=Window_Base[_0x55d321(0x2a8)]['createTextState'],Window_Base[_0x55d321(0x2a8)]['createTextState']=function(_0xf63247,_0x1c97a6,_0x9d0add,_0x5e1909){const _0x30a48a=_0x55d321;var _0x4b28cf=VisuMZ['CoreEngine'][_0x30a48a(0x634)][_0x30a48a(0x2b5)](this,_0xf63247,_0x1c97a6,_0x9d0add,_0x5e1909);if(this[_0x30a48a(0x832)]())_0x4b28cf['text']=String(VisuMZ[_0x30a48a(0x2df)](_0x4b28cf[_0x30a48a(0x61d)]))||'';return _0x4b28cf;},Window_Base[_0x55d321(0x2a8)]['useDigitGroupingEx']=function(){return this['_digitGroupingEx'];},Window_Base[_0x55d321(0x2a8)]['enableDigitGrouping']=function(_0x3201ef){const _0x29ce9e=_0x55d321;this[_0x29ce9e(0x7d9)]=_0x3201ef;},Window_Base['prototype'][_0x55d321(0x24f)]=function(_0x3ff543){const _0x433196=_0x55d321;this[_0x433196(0x84a)]=_0x3ff543;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x1f4)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x837)],Window_Base[_0x55d321(0x2a8)][_0x55d321(0x837)]=function(_0x8016ca,_0x360efd,_0x35d25d){const _0x3b3704=_0x55d321;_0x360efd=Math[_0x3b3704(0x69f)](_0x360efd),_0x35d25d=Math[_0x3b3704(0x69f)](_0x35d25d),VisuMZ[_0x3b3704(0x886)]['Window_Base_drawIcon'][_0x3b3704(0x2b5)](this,_0x8016ca,_0x360efd,_0x35d25d);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x685)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x403)],Window_Base[_0x55d321(0x2a8)][_0x55d321(0x403)]=function(_0x303097,_0x2b5748,_0x5e815f,_0x52fa30,_0x2b71ea,_0x3e40f6){const _0x345931=_0x55d321;_0x2b71ea=_0x2b71ea||ImageManager[_0x345931(0x6a6)],_0x3e40f6=_0x3e40f6||ImageManager[_0x345931(0x485)],_0x5e815f=Math[_0x345931(0x69f)](_0x5e815f),_0x52fa30=Math[_0x345931(0x69f)](_0x52fa30),_0x2b71ea=Math['round'](_0x2b71ea),_0x3e40f6=Math[_0x345931(0x69f)](_0x3e40f6),VisuMZ['CoreEngine'][_0x345931(0x685)]['call'](this,_0x303097,_0x2b5748,_0x5e815f,_0x52fa30,_0x2b71ea,_0x3e40f6);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5d7)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x4cc)],Window_Base['prototype']['drawCharacter']=function(_0x21558d,_0x55340a,_0x551ce7,_0x4c12fc){const _0x4c89da=_0x55d321;_0x551ce7=Math[_0x4c89da(0x69f)](_0x551ce7),_0x4c12fc=Math[_0x4c89da(0x69f)](_0x4c12fc),VisuMZ[_0x4c89da(0x886)][_0x4c89da(0x5d7)]['call'](this,_0x21558d,_0x55340a,_0x551ce7,_0x4c12fc);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x836)]=Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x8cb)],Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x8cb)]=function(_0x562a00){const _0x327c75=_0x55d321;let _0x46b9bb=VisuMZ[_0x327c75(0x886)][_0x327c75(0x836)][_0x327c75(0x2b5)](this,_0x562a00);return _0x46b9bb['x']=Math[_0x327c75(0x69f)](_0x46b9bb['x']),_0x46b9bb['y']=Math[_0x327c75(0x69f)](_0x46b9bb['y']),_0x46b9bb['width']=Math[_0x327c75(0x69f)](_0x46b9bb[_0x327c75(0x85f)]),_0x46b9bb[_0x327c75(0x48d)]=Math[_0x327c75(0x69f)](_0x46b9bb['height']),_0x46b9bb;},VisuMZ['CoreEngine'][_0x55d321(0x8ac)]=Window_StatusBase[_0x55d321(0x2a8)][_0x55d321(0x791)],Window_StatusBase[_0x55d321(0x2a8)]['drawActorSimpleStatus']=function(_0x3f8490,_0x277e7b,_0x341209){const _0x2e66e0=_0x55d321;_0x277e7b=Math['round'](_0x277e7b),_0x341209=Math['round'](_0x341209),VisuMZ[_0x2e66e0(0x886)]['Window_StatusBase_drawActorSimpleStatus'][_0x2e66e0(0x2b5)](this,_0x3f8490,_0x277e7b,_0x341209);},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x3b5)]=function(){const _0x4b6607=_0x55d321;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x4b6607(0x2a0),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x4b6607(0x601)]['x'],'targetScaleY':this[_0x4b6607(0x601)]['y'],'targetOpacity':this[_0x4b6607(0x5c7)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x4b6607(0x1f8)]};},Window_Base['prototype'][_0x55d321(0x7a3)]=function(){const _0x520ce7=_0x55d321;if(!this['_coreEasing'])return;if(this[_0x520ce7(0x544)][_0x520ce7(0x16b)]<=0x0)return;this['x']=this[_0x520ce7(0x70f)](this['x'],this[_0x520ce7(0x544)][_0x520ce7(0x5f1)]),this['y']=this['applyCoreEasing'](this['y'],this[_0x520ce7(0x544)][_0x520ce7(0x587)]),this[_0x520ce7(0x601)]['x']=this[_0x520ce7(0x70f)](this['scale']['x'],this[_0x520ce7(0x544)][_0x520ce7(0x507)]),this['scale']['y']=this[_0x520ce7(0x70f)](this[_0x520ce7(0x601)]['y'],this[_0x520ce7(0x544)]['targetScaleY']),this['opacity']=this[_0x520ce7(0x70f)](this[_0x520ce7(0x5c7)],this[_0x520ce7(0x544)]['targetOpacity']),this['backOpacity']=this[_0x520ce7(0x70f)](this[_0x520ce7(0x366)],this['_coreEasing'][_0x520ce7(0x8b1)]),this[_0x520ce7(0x1f8)]=this[_0x520ce7(0x70f)](this[_0x520ce7(0x1f8)],this[_0x520ce7(0x544)]['targetContentsOpacity']),this[_0x520ce7(0x544)][_0x520ce7(0x16b)]--;},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x70f)]=function(_0x488988,_0x225813){const _0x218a3d=_0x55d321;if(!this[_0x218a3d(0x544)])return _0x225813;const _0x278e15=this[_0x218a3d(0x544)][_0x218a3d(0x16b)],_0x5675ce=this[_0x218a3d(0x544)][_0x218a3d(0x738)],_0x1d26ce=this[_0x218a3d(0x159)]((_0x5675ce-_0x278e15)/_0x5675ce),_0x2d3b42=this['calcCoreEasing']((_0x5675ce-_0x278e15+0x1)/_0x5675ce),_0x15d86a=(_0x488988-_0x225813*_0x1d26ce)/(0x1-_0x1d26ce);return _0x15d86a+(_0x225813-_0x15d86a)*_0x2d3b42;},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x159)]=function(_0xb4f90b){const _0x26901a=_0x55d321;if(!this[_0x26901a(0x544)])return _0xb4f90b;return VisuMZ[_0x26901a(0x8b2)](_0xb4f90b,this[_0x26901a(0x544)][_0x26901a(0x47d)]||_0x26901a(0x2a0));},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x1a4)]=function(_0x2e0e4e,_0x2e3d03){const _0x172491=_0x55d321;if(!this[_0x172491(0x544)])return;this['x']=this['_coreEasing'][_0x172491(0x5f1)],this['y']=this[_0x172491(0x544)][_0x172491(0x587)],this[_0x172491(0x601)]['x']=this[_0x172491(0x544)][_0x172491(0x507)],this[_0x172491(0x601)]['y']=this['_coreEasing'][_0x172491(0x8f9)],this[_0x172491(0x5c7)]=this[_0x172491(0x544)][_0x172491(0x42a)],this[_0x172491(0x366)]=this[_0x172491(0x544)]['targetBackOpacity'],this[_0x172491(0x1f8)]=this['_coreEasing'][_0x172491(0x4be)],this['setupCoreEasing'](_0x2e0e4e,_0x2e3d03,this['x'],this['y'],this['scale']['x'],this[_0x172491(0x601)]['y'],this[_0x172491(0x5c7)],this['backOpacity'],this['contentsOpacity']);},Window_Base['prototype'][_0x55d321(0x723)]=function(_0x42ddd9,_0x516698,_0x57788f,_0x7720fb,_0x34f2ad,_0xfeb7d6,_0x4b114c,_0x3d3c7e,_0x35cbfb){const _0x3c0fcb=_0x55d321;this[_0x3c0fcb(0x544)]={'duration':_0x42ddd9,'wholeDuration':_0x42ddd9,'type':_0x516698,'targetX':_0x57788f,'targetY':_0x7720fb,'targetScaleX':_0x34f2ad,'targetScaleY':_0xfeb7d6,'targetOpacity':_0x4b114c,'targetBackOpacity':_0x3d3c7e,'targetContentsOpacity':_0x35cbfb};},Window_Base['prototype']['drawCurrencyValue']=function(_0x4325bd,_0x49769a,_0x1faef2,_0x5dd106,_0x553285){const _0x3cf4e6=_0x55d321;this[_0x3cf4e6(0x2d0)](),this['contents'][_0x3cf4e6(0x2d7)]=VisuMZ[_0x3cf4e6(0x886)][_0x3cf4e6(0x530)][_0x3cf4e6(0x3ed)][_0x3cf4e6(0x7f3)];const _0x2b93a9=VisuMZ[_0x3cf4e6(0x886)][_0x3cf4e6(0x530)][_0x3cf4e6(0x3ed)][_0x3cf4e6(0x84f)];if(_0x2b93a9>0x0&&_0x49769a===TextManager['currencyUnit']){const _0x290953=_0x5dd106+(this[_0x3cf4e6(0x4e0)]()-ImageManager[_0x3cf4e6(0x8b0)])/0x2;this['drawIcon'](_0x2b93a9,_0x1faef2+(_0x553285-ImageManager[_0x3cf4e6(0x375)]),_0x290953),_0x553285-=ImageManager['iconWidth']+0x4;}else this['changeTextColor'](ColorManager[_0x3cf4e6(0x173)]()),this[_0x3cf4e6(0x4bd)](_0x49769a,_0x1faef2,_0x5dd106,_0x553285,'right'),_0x553285-=this[_0x3cf4e6(0x734)](_0x49769a)+0x6;this[_0x3cf4e6(0x604)]();const _0x79ebbd=this['textWidth'](this[_0x3cf4e6(0x7d9)]?VisuMZ['GroupDigits'](_0x4325bd):_0x4325bd);_0x79ebbd>_0x553285?this[_0x3cf4e6(0x4bd)](VisuMZ[_0x3cf4e6(0x886)]['Settings'][_0x3cf4e6(0x3ed)][_0x3cf4e6(0x34b)],_0x1faef2,_0x5dd106,_0x553285,'right'):this[_0x3cf4e6(0x4bd)](_0x4325bd,_0x1faef2,_0x5dd106,_0x553285,_0x3cf4e6(0x649)),this[_0x3cf4e6(0x2d0)]();},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x4f3)]=function(_0x378508,_0x430989,_0x1d3f20,_0x357be0,_0x329e87){const _0x4d2748=_0x55d321,_0x3df7f6=ImageManager[_0x4d2748(0x577)](_0x4d2748(0x583)),_0x1ca98f=ImageManager[_0x4d2748(0x375)],_0x45735a=ImageManager['iconHeight'],_0x693d93=_0x378508%0x10*_0x1ca98f,_0x385dff=Math[_0x4d2748(0x33d)](_0x378508/0x10)*_0x45735a,_0x4e490c=_0x357be0,_0x1d9a2c=_0x357be0;this[_0x4d2748(0x6f7)][_0x4d2748(0x1c2)][_0x4d2748(0x2c0)]=_0x329e87,this[_0x4d2748(0x6f7)][_0x4d2748(0x3f1)](_0x3df7f6,_0x693d93,_0x385dff,_0x1ca98f,_0x45735a,_0x430989,_0x1d3f20,_0x4e490c,_0x1d9a2c),this[_0x4d2748(0x6f7)][_0x4d2748(0x1c2)][_0x4d2748(0x2c0)]=!![];},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x44a)]=function(_0x503acd,_0x3fcff0,_0x3579e5,_0x48e7d1,_0x3d3c40,_0x421797){const _0x463dc1=_0x55d321,_0x198d87=Math[_0x463dc1(0x33d)]((_0x3579e5-0x2)*_0x48e7d1),_0x13a63b=Sprite_Gauge[_0x463dc1(0x2a8)][_0x463dc1(0x1e4)][_0x463dc1(0x2b5)](this),_0xe73437=_0x3fcff0+this['lineHeight']()-_0x13a63b-0x2;this['contents'][_0x463dc1(0x3d1)](_0x503acd,_0xe73437,_0x3579e5,_0x13a63b,ColorManager[_0x463dc1(0x2c1)]()),this['contents'][_0x463dc1(0x3ff)](_0x503acd+0x1,_0xe73437+0x1,_0x198d87,_0x13a63b-0x2,_0x3d3c40,_0x421797);},Window_Scrollable[_0x55d321(0x75e)]={'enabled':VisuMZ['CoreEngine'][_0x55d321(0x530)][_0x55d321(0x76b)][_0x55d321(0x329)]??!![],'thickness':VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x76b)][_0x55d321(0x8f1)]??0x2,'offset':VisuMZ['CoreEngine'][_0x55d321(0x530)][_0x55d321(0x76b)]['BarOffset']??0x2,'bodyColor':VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x76b)][_0x55d321(0x201)]??0x0,'offColor':VisuMZ['CoreEngine'][_0x55d321(0x530)]['Window'][_0x55d321(0x522)]??0x7,'offOpacity':VisuMZ['CoreEngine'][_0x55d321(0x530)][_0x55d321(0x76b)][_0x55d321(0x4d3)]??0x80},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x585)]=function(){const _0x52461f=_0x55d321;return Window_Scrollable[_0x52461f(0x75e)][_0x52461f(0x41b)]&&Window_Scrollable[_0x52461f(0x75e)]['thickness']>0x0;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x1e8)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x2de)],Window_Base[_0x55d321(0x2a8)][_0x55d321(0x2de)]=function(){const _0x13dea8=_0x55d321;VisuMZ['CoreEngine'][_0x13dea8(0x1e8)][_0x13dea8(0x2b5)](this),this[_0x13dea8(0x5b6)](),this[_0x13dea8(0x389)](!![]),this['setupScrollBarBitmap'](![]);},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x5b6)]=function(){const _0x2188c6=_0x55d321;if(!this[_0x2188c6(0x585)]())return;if(this[_0x2188c6(0x743)]||this[_0x2188c6(0x478)])return;this[_0x2188c6(0x722)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x2188c6(0x478)]=new Sprite(),this[_0x2188c6(0x7af)](this[_0x2188c6(0x743)]),this[_0x2188c6(0x7af)](this[_0x2188c6(0x478)]);},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x389)]=function(_0xd995d2){const _0x4f9955=_0x55d321,_0x3db479=_0xd995d2?this[_0x4f9955(0x743)]:this[_0x4f9955(0x478)];if(!_0x3db479)return;const _0x405f62=Window_Scrollable[_0x4f9955(0x75e)],_0x3c669b=_0x405f62[_0x4f9955(0x473)],_0x174626=_0xd995d2?this['innerWidth']-_0x3c669b*0x2:_0x3c669b,_0x5262ee=_0xd995d2?_0x3c669b:this['innerHeight']-_0x3c669b*0x2;_0x3db479['bitmap']=new Bitmap(_0x174626,_0x5262ee),_0x3db479[_0x4f9955(0x1bc)](0x0,0x0,_0x174626,_0x5262ee),this[_0x4f9955(0x1cf)](_0xd995d2);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x19d)]=Window_Base[_0x55d321(0x2a8)][_0x55d321(0x327)],Window_Base['prototype']['destroyContents']=function(){const _0x4e9f16=_0x55d321;VisuMZ['CoreEngine'][_0x4e9f16(0x19d)][_0x4e9f16(0x2b5)](this),this[_0x4e9f16(0x8e8)]();},Window_Base['prototype'][_0x55d321(0x8e8)]=function(){const _0xa5341f=_0x55d321,_0x1a738c=[this[_0xa5341f(0x743)],this[_0xa5341f(0x478)]];for(const _0x5c1dd5 of _0x1a738c){if(_0x5c1dd5&&_0x5c1dd5[_0xa5341f(0x5de)])_0x5c1dd5[_0xa5341f(0x5de)]['destroy']();}},VisuMZ[_0x55d321(0x886)][_0x55d321(0x588)]=Window_Scrollable[_0x55d321(0x2a8)][_0x55d321(0x264)],Window_Scrollable[_0x55d321(0x2a8)][_0x55d321(0x264)]=function(){const _0x27953f=_0x55d321;VisuMZ[_0x27953f(0x886)][_0x27953f(0x588)][_0x27953f(0x2b5)](this),this[_0x27953f(0x7fd)]();},Window_Scrollable[_0x55d321(0x2a8)][_0x55d321(0x7fd)]=function(){const _0x207865=_0x55d321;this[_0x207865(0x61b)](),this[_0x207865(0x80e)](!![]),this[_0x207865(0x80e)](![]),this[_0x207865(0x1cf)](!![]),this[_0x207865(0x1cf)](![]);},Window_Scrollable[_0x55d321(0x2a8)][_0x55d321(0x61b)]=function(){const _0x264d0c=_0x55d321,_0x1ca50b=[this[_0x264d0c(0x743)],this[_0x264d0c(0x478)]];for(const _0x5e8ef0 of _0x1ca50b){_0x5e8ef0&&(_0x5e8ef0[_0x264d0c(0x382)]=this[_0x264d0c(0x585)]()&&this['isOpen']());}},Window_Scrollable['prototype'][_0x55d321(0x80e)]=function(_0x1e00f3){const _0x343fa3=_0x55d321;if(!this[_0x343fa3(0x722)])return;const _0x3eeb72=this[_0x343fa3(0x6f2)](_0x1e00f3),_0x5db5b5=this[_0x343fa3(0x6a8)](_0x1e00f3),_0x5166ec=_0x1e00f3?_0x343fa3(0x41e):_0x343fa3(0x516),_0x122ef1=_0x1e00f3?_0x343fa3(0x7e0):_0x343fa3(0x1fa);(this[_0x343fa3(0x722)][_0x5166ec]!==_0x3eeb72||this[_0x343fa3(0x722)][_0x122ef1]!==_0x5db5b5)&&(this[_0x343fa3(0x722)][_0x5166ec]=_0x3eeb72,this[_0x343fa3(0x722)][_0x122ef1]=_0x5db5b5,this[_0x343fa3(0x4c7)](_0x1e00f3,_0x3eeb72,_0x5db5b5));},Window_Scrollable[_0x55d321(0x2a8)][_0x55d321(0x6f2)]=function(_0x19258f){const _0x4b617e=_0x55d321;if(this[_0x4b617e(0x574)]!==undefined)return _0x19258f?this[_0x4b617e(0x920)]():this[_0x4b617e(0x5f6)]['y'];return _0x19258f?this[_0x4b617e(0x920)]():this[_0x4b617e(0x90a)]();},Window_Scrollable[_0x55d321(0x2a8)]['maxScrollbar']=function(_0x39de38){const _0x492a8d=_0x55d321;if(this[_0x492a8d(0x574)]!==undefined)return _0x39de38?this[_0x492a8d(0x476)]():Math[_0x492a8d(0x548)](0x0,this[_0x492a8d(0x574)]-this['innerHeight']);return _0x39de38?this[_0x492a8d(0x476)]():this[_0x492a8d(0x51b)]();},Window_Scrollable[_0x55d321(0x2a8)][_0x55d321(0x332)]=function(){const _0x5a8782=_0x55d321;if(this[_0x5a8782(0x574)]!==undefined)return Math['max'](0x0,this[_0x5a8782(0x574)]);return this[_0x5a8782(0x705)]();},Window_Scrollable[_0x55d321(0x2a8)]['refreshScrollBarBitmap']=function(_0x2ab6d9,_0x59e01e,_0x2e056a){const _0x4f1a88=_0x55d321,_0x47b87f=_0x2ab6d9?this[_0x4f1a88(0x743)]:this[_0x4f1a88(0x478)];if(!_0x47b87f)return;if(!_0x47b87f[_0x4f1a88(0x5de)])return;const _0x4f385d=_0x47b87f[_0x4f1a88(0x5de)];_0x4f385d['clear']();if(_0x2e056a<=0x0)return;const _0x2f833a=_0x2ab6d9?this[_0x4f1a88(0x502)]/this[_0x4f1a88(0x6e5)]():this[_0x4f1a88(0x152)]/this['scrollbarHeight'](),_0x10242b=_0x2ab6d9?Math['round'](_0x59e01e*_0x2f833a):0x0,_0x1edecc=_0x2ab6d9?0x0:Math['round'](_0x59e01e*_0x2f833a),_0x3ebf63=_0x2ab6d9?Math['round'](_0x4f385d[_0x4f1a88(0x85f)]*_0x2f833a):_0x4f385d[_0x4f1a88(0x85f)],_0x2a5941=_0x2ab6d9?_0x4f385d[_0x4f1a88(0x48d)]:Math[_0x4f1a88(0x69f)](_0x4f385d[_0x4f1a88(0x48d)]*_0x2f833a),_0x27d9cf=Window_Scrollable[_0x4f1a88(0x75e)],_0x2808b4=ColorManager[_0x4f1a88(0x90c)](_0x27d9cf[_0x4f1a88(0x82b)]),_0x3f6c17=ColorManager[_0x4f1a88(0x90c)](_0x27d9cf[_0x4f1a88(0x864)]),_0x191e95=_0x27d9cf[_0x4f1a88(0x15f)];_0x4f385d[_0x4f1a88(0x47f)]=_0x191e95,_0x4f385d[_0x4f1a88(0x170)](_0x2808b4),_0x4f385d['paintOpacity']=0xff,_0x4f385d[_0x4f1a88(0x3d1)](_0x10242b,_0x1edecc,_0x3ebf63,_0x2a5941,_0x3f6c17);},Window_Base['prototype'][_0x55d321(0x1cf)]=function(_0x4b660e){const _0x32e59d=_0x55d321,_0x3d8b41=_0x4b660e?this['_scrollBarHorz']:this['_scrollBarVert'];if(!_0x3d8b41)return;const _0x219bca=Window_Scrollable[_0x32e59d(0x75e)],_0x2d67ca=_0x219bca[_0x32e59d(0x473)],_0x53de1a=_0x219bca[_0x32e59d(0x726)];if(!_0x3d8b41[_0x32e59d(0x3c1)])return;_0x3d8b41['x']=this['padding']+(_0x4b660e?_0x2d67ca:this[_0x32e59d(0x502)]+_0x53de1a),_0x3d8b41['y']=this[_0x32e59d(0x335)]+(_0x4b660e?this['innerHeight']+_0x53de1a:_0x2d67ca);},Window_Selectable['prototype'][_0x55d321(0x2c3)]=function(_0x3f9e38){const _0x54baf4=_0x55d321;let _0x56e753=this[_0x54baf4(0x52c)]();const _0x3065e5=this[_0x54baf4(0x315)](),_0x2107da=this[_0x54baf4(0x190)]();if(this[_0x54baf4(0x656)]()&&(_0x56e753<_0x3065e5||_0x3f9e38&&_0x2107da===0x1)){_0x56e753+=_0x2107da;if(_0x56e753>=_0x3065e5)_0x56e753=_0x3065e5-0x1;this[_0x54baf4(0x1a5)](_0x56e753);}else!this['isUseModernControls']()&&((_0x56e753<_0x3065e5-_0x2107da||_0x3f9e38&&_0x2107da===0x1)&&this[_0x54baf4(0x1a5)]((_0x56e753+_0x2107da)%_0x3065e5));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x2c2)]=Window_Selectable['prototype'][_0x55d321(0x2c3)],Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x2c3)]=function(_0x4b5bc5){const _0x28a55c=_0x55d321;this[_0x28a55c(0x656)]()&&_0x4b5bc5&&this['maxCols']()===0x1&&this['index']()===this[_0x28a55c(0x315)]()-0x1?this[_0x28a55c(0x1a5)](0x0):VisuMZ[_0x28a55c(0x886)][_0x28a55c(0x2c2)]['call'](this,_0x4b5bc5);},Window_Selectable['prototype'][_0x55d321(0x22f)]=function(_0x2a1755){const _0x23d508=_0x55d321;let _0x36bb5e=Math[_0x23d508(0x548)](0x0,this['index']());const _0x11c1d7=this['maxItems'](),_0x25009a=this[_0x23d508(0x190)]();if(this[_0x23d508(0x656)]()&&_0x36bb5e>0x0||_0x2a1755&&_0x25009a===0x1){_0x36bb5e-=_0x25009a;if(_0x36bb5e<=0x0)_0x36bb5e=0x0;this[_0x23d508(0x1a5)](_0x36bb5e);}else!this[_0x23d508(0x656)]()&&((_0x36bb5e>=_0x25009a||_0x2a1755&&_0x25009a===0x1)&&this[_0x23d508(0x1a5)]((_0x36bb5e-_0x25009a+_0x11c1d7)%_0x11c1d7));},VisuMZ[_0x55d321(0x886)]['Window_Selectable_cursorUp']=Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x22f)],Window_Selectable[_0x55d321(0x2a8)]['cursorUp']=function(_0x2782f3){const _0x5db218=_0x55d321;this[_0x5db218(0x656)]()&&_0x2782f3&&this['maxCols']()===0x1&&this[_0x5db218(0x52c)]()===0x0?this[_0x5db218(0x1a5)](this[_0x5db218(0x315)]()-0x1):VisuMZ[_0x5db218(0x886)]['Window_Selectable_cursorUp']['call'](this,_0x2782f3);},Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x656)]=function(){const _0x3296a7=_0x55d321;return VisuMZ['CoreEngine']['Settings'][_0x3296a7(0x6f5)]['ModernControls'];},VisuMZ['CoreEngine'][_0x55d321(0x59c)]=Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x415)],Window_Selectable[_0x55d321(0x2a8)]['processCursorMove']=function(){const _0x1db88f=_0x55d321;this['isUseModernControls']()?(this[_0x1db88f(0x532)](),this[_0x1db88f(0x67c)]()):VisuMZ[_0x1db88f(0x886)][_0x1db88f(0x59c)][_0x1db88f(0x2b5)](this);},Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x893)]=function(){return!![];},Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x532)]=function(){const _0x146215=_0x55d321;if(this[_0x146215(0x739)]()){const _0x797d5d=this[_0x146215(0x52c)]();Input[_0x146215(0x565)](_0x146215(0x7c7))&&(Input['isPressed'](_0x146215(0x298))&&this[_0x146215(0x893)]()?this['cursorPagedown']():this[_0x146215(0x2c3)](Input[_0x146215(0x1ac)]('down'))),Input[_0x146215(0x565)]('up')&&(Input[_0x146215(0x20f)]('shift')&&this[_0x146215(0x893)]()?this[_0x146215(0x8eb)]():this['cursorUp'](Input[_0x146215(0x1ac)]('up'))),Input[_0x146215(0x565)]('right')&&this[_0x146215(0x251)](Input[_0x146215(0x1ac)](_0x146215(0x649))),Input[_0x146215(0x565)](_0x146215(0x2a2))&&this['cursorLeft'](Input['isTriggered']('left')),!this[_0x146215(0x823)](_0x146215(0x7fb))&&Input[_0x146215(0x565)]('pagedown')&&this[_0x146215(0x82c)](),!this[_0x146215(0x823)]('pageup')&&Input['isRepeated'](_0x146215(0x16a))&&this[_0x146215(0x8eb)](),this[_0x146215(0x52c)]()!==_0x797d5d&&this['playCursorSound']();}},Window_Selectable['prototype']['processCursorHomeEndTrigger']=function(){const _0x5850ce=_0x55d321;if(this[_0x5850ce(0x739)]()){const _0x4f6669=this[_0x5850ce(0x52c)]();Input[_0x5850ce(0x1ac)](_0x5850ce(0x57c))&&this[_0x5850ce(0x1a5)](Math['min'](this['index'](),0x0)),Input[_0x5850ce(0x1ac)](_0x5850ce(0x41c))&&this['smoothSelect'](Math[_0x5850ce(0x548)](this[_0x5850ce(0x52c)](),this[_0x5850ce(0x315)]()-0x1)),this['index']()!==_0x4f6669&&this[_0x5850ce(0x14b)]();}},VisuMZ['CoreEngine'][_0x55d321(0x72e)]=Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x35f)],Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x35f)]=function(){const _0x45e77c=_0x55d321;this['isUseModernControls']()?this[_0x45e77c(0x3c3)]():VisuMZ[_0x45e77c(0x886)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x3c3)]=function(){const _0x2402fc=_0x55d321;VisuMZ[_0x2402fc(0x886)]['Window_Selectable_processTouch'][_0x2402fc(0x2b5)](this);},Window_Selectable['prototype']['colSpacing']=function(){const _0x3c627a=_0x55d321;return VisuMZ[_0x3c627a(0x886)][_0x3c627a(0x530)][_0x3c627a(0x76b)]['ColSpacing'];},Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x703)]=function(){const _0x303e8b=_0x55d321;return VisuMZ['CoreEngine'][_0x303e8b(0x530)][_0x303e8b(0x76b)][_0x303e8b(0x2a1)];},Window_Selectable['prototype'][_0x55d321(0x514)]=function(){const _0x4a6ed2=_0x55d321;return Window_Scrollable[_0x4a6ed2(0x2a8)][_0x4a6ed2(0x514)][_0x4a6ed2(0x2b5)](this)+VisuMZ[_0x4a6ed2(0x886)]['Settings'][_0x4a6ed2(0x76b)][_0x4a6ed2(0x589)];;},VisuMZ[_0x55d321(0x886)][_0x55d321(0x34e)]=Window_Selectable[_0x55d321(0x2a8)][_0x55d321(0x20a)],Window_Selectable['prototype'][_0x55d321(0x20a)]=function(_0x3af6f8){const _0x3f7aac=_0x55d321,_0x34776b=VisuMZ[_0x3f7aac(0x886)]['Settings']['Window'];if(_0x34776b[_0x3f7aac(0x232)]===![])return;_0x34776b[_0x3f7aac(0x1fc)]?_0x34776b[_0x3f7aac(0x1fc)][_0x3f7aac(0x2b5)](this,_0x3af6f8):VisuMZ[_0x3f7aac(0x886)][_0x3f7aac(0x34e)]['call'](this,_0x3af6f8);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x238)]=Window_Gold[_0x55d321(0x2a8)][_0x55d321(0x1cc)],Window_Gold[_0x55d321(0x2a8)]['refresh']=function(){const _0x6694ff=_0x55d321;this[_0x6694ff(0x8bc)]()?this[_0x6694ff(0x2e6)]():VisuMZ[_0x6694ff(0x886)][_0x6694ff(0x238)][_0x6694ff(0x2b5)](this);},Window_Gold['prototype'][_0x55d321(0x8bc)]=function(){const _0x28e321=_0x55d321;if(TextManager[_0x28e321(0x4b2)]!==this['currencyUnit']())return![];return VisuMZ['CoreEngine'][_0x28e321(0x530)][_0x28e321(0x3ed)][_0x28e321(0x433)];},Window_Gold['prototype'][_0x55d321(0x2e6)]=function(){const _0x380d8c=_0x55d321;this[_0x380d8c(0x2d0)](),this['contents'][_0x380d8c(0x75d)](),this[_0x380d8c(0x6f7)][_0x380d8c(0x2d7)]=VisuMZ[_0x380d8c(0x886)][_0x380d8c(0x530)][_0x380d8c(0x3ed)]['GoldFontSize'];const _0x32f9a7=VisuMZ[_0x380d8c(0x886)][_0x380d8c(0x530)]['Gold'][_0x380d8c(0x84f)],_0x2183ca=this[_0x380d8c(0x92d)](0x0);if(_0x32f9a7>0x0){const _0x43a732=ImageManager['standardIconWidth']||0x20,_0x19bdd6=_0x43a732-ImageManager['iconWidth'],_0x2e766a=_0x2183ca['y']+(this[_0x380d8c(0x4e0)]()-ImageManager[_0x380d8c(0x8b0)])/0x2;this[_0x380d8c(0x837)](_0x32f9a7,_0x2183ca['x']+Math[_0x380d8c(0x74b)](_0x19bdd6/0x2),_0x2e766a);const _0x343200=_0x43a732+0x4;_0x2183ca['x']+=_0x343200,_0x2183ca[_0x380d8c(0x85f)]-=_0x343200;}this['changeTextColor'](ColorManager[_0x380d8c(0x173)]()),this[_0x380d8c(0x4bd)](this['currencyUnit'](),_0x2183ca['x'],_0x2183ca['y'],_0x2183ca['width'],_0x380d8c(0x2a2));const _0x178a82=this[_0x380d8c(0x734)](this['currencyUnit']())+0x6;;_0x2183ca['x']+=_0x178a82,_0x2183ca[_0x380d8c(0x85f)]-=_0x178a82,this['resetTextColor']();const _0x37c9f9=this[_0x380d8c(0x1c5)](),_0x88714b=this['textWidth'](this[_0x380d8c(0x7d9)]?VisuMZ[_0x380d8c(0x2df)](this['value']()):this['value']());_0x88714b>_0x2183ca[_0x380d8c(0x85f)]?this[_0x380d8c(0x4bd)](VisuMZ[_0x380d8c(0x886)][_0x380d8c(0x530)][_0x380d8c(0x3ed)][_0x380d8c(0x34b)],_0x2183ca['x'],_0x2183ca['y'],_0x2183ca[_0x380d8c(0x85f)],_0x380d8c(0x649)):this['drawText'](this[_0x380d8c(0x1c5)](),_0x2183ca['x'],_0x2183ca['y'],_0x2183ca[_0x380d8c(0x85f)],_0x380d8c(0x649)),this[_0x380d8c(0x2d0)]();},Window_StatusBase['prototype'][_0x55d321(0x641)]=function(_0x1032fc,_0x319df9,_0x264b1d,_0x5bdf27,_0x51880a){const _0x21a07b=_0x55d321;_0x5bdf27=String(_0x5bdf27||'')[_0x21a07b(0x539)]();if(VisuMZ['CoreEngine']['Settings'][_0x21a07b(0x3f0)][_0x21a07b(0x1d9)]){const _0x5f1547=VisuMZ[_0x21a07b(0x5ef)](_0x5bdf27);if(_0x51880a)this[_0x21a07b(0x4f3)](_0x5f1547,_0x1032fc,_0x319df9,this['gaugeLineHeight']()),_0x264b1d-=this['gaugeLineHeight']()+0x2,_0x1032fc+=this[_0x21a07b(0x615)]()+0x2;else{const _0x59931b=ImageManager['standardIconWidth']||0x20,_0x11f204=ImageManager[_0x21a07b(0x509)]||0x20,_0x5efcea=_0x59931b-ImageManager[_0x21a07b(0x375)],_0x51b90a=_0x11f204-ImageManager[_0x21a07b(0x8b0)];let _0x26d9c1=0x2,_0x50a059=0x2;this[_0x21a07b(0x4e0)]()!==0x24&&(_0x50a059=Math[_0x21a07b(0x33d)]((this[_0x21a07b(0x4e0)]()-_0x11f204)/0x2));const _0x3d967e=_0x1032fc+Math[_0x21a07b(0x33d)](_0x5efcea/0x2)+_0x26d9c1,_0x9c516c=_0x319df9+Math[_0x21a07b(0x33d)](_0x51b90a/0x2)+_0x50a059;this['drawIcon'](_0x5f1547,_0x3d967e,_0x9c516c),_0x264b1d-=_0x59931b+0x4,_0x1032fc+=_0x59931b+0x4;}}const _0x13942e=TextManager['param'](_0x5bdf27);this[_0x21a07b(0x2d0)](),this[_0x21a07b(0x54c)](ColorManager[_0x21a07b(0x173)]()),_0x51880a?(this['contents'][_0x21a07b(0x2d7)]=this[_0x21a07b(0x718)](),this[_0x21a07b(0x6f7)][_0x21a07b(0x4bd)](_0x13942e,_0x1032fc,_0x319df9,_0x264b1d,this[_0x21a07b(0x615)](),_0x21a07b(0x2a2))):this['drawText'](_0x13942e,_0x1032fc,_0x319df9,_0x264b1d),this[_0x21a07b(0x2d0)]();},Window_StatusBase[_0x55d321(0x2a8)][_0x55d321(0x718)]=function(){const _0x4c67f9=_0x55d321;return $gameSystem[_0x4c67f9(0x613)]()-0x8;},Window_StatusBase[_0x55d321(0x2a8)][_0x55d321(0x2e5)]=function(_0x8a479,_0x462927,_0x508db7,_0x45852e){const _0x36dd8e=_0x55d321;_0x45852e=_0x45852e||0xa8,this[_0x36dd8e(0x604)]();if(VisuMZ[_0x36dd8e(0x886)][_0x36dd8e(0x530)]['UI'][_0x36dd8e(0x65e)])this['drawTextEx'](_0x8a479[_0x36dd8e(0x64c)]()[_0x36dd8e(0x7c4)],_0x462927,_0x508db7,_0x45852e);else{const _0x5af408=_0x8a479[_0x36dd8e(0x64c)]()['name'][_0x36dd8e(0x678)](/\\I\[(\d+)\]/gi,'');this[_0x36dd8e(0x4bd)](_0x5af408,_0x462927,_0x508db7,_0x45852e);}},Window_StatusBase[_0x55d321(0x2a8)][_0x55d321(0x405)]=function(_0x2bf707,_0x5f0708,_0x11b68c,_0x4684c2){const _0x3aca81=_0x55d321;_0x4684c2=_0x4684c2||0x10e,this[_0x3aca81(0x604)]();if(VisuMZ[_0x3aca81(0x886)][_0x3aca81(0x530)]['UI']['TextCodeNicknames'])this['drawTextEx'](_0x2bf707[_0x3aca81(0x762)](),_0x5f0708,_0x11b68c,_0x4684c2);else{const _0x100d5a=_0x2bf707['nickname']()['replace'](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x2bf707['nickname'](),_0x5f0708,_0x11b68c,_0x4684c2);}},VisuMZ[_0x55d321(0x886)][_0x55d321(0x39c)]=Window_StatusBase['prototype'][_0x55d321(0x72f)],Window_StatusBase[_0x55d321(0x2a8)][_0x55d321(0x72f)]=function(_0x264cc5,_0x17467a,_0x3b4ba5){const _0x1618d7=_0x55d321;if(VisuMZ[_0x1618d7(0x886)]['Settings'][_0x1618d7(0x3f0)][_0x1618d7(0x17f)]===![])return;if(this['isExpGaugeDrawn']())this[_0x1618d7(0x931)](_0x264cc5,_0x17467a,_0x3b4ba5);VisuMZ[_0x1618d7(0x886)][_0x1618d7(0x39c)][_0x1618d7(0x2b5)](this,_0x264cc5,_0x17467a,_0x3b4ba5);},Window_StatusBase['prototype']['isExpGaugeDrawn']=function(){const _0x3f806b=_0x55d321;return VisuMZ[_0x3f806b(0x886)][_0x3f806b(0x530)]['UI'][_0x3f806b(0x34c)];},Window_StatusBase['prototype']['drawActorExpGauge']=function(_0x24b59c,_0x30ec07,_0x12b227){const _0x19f246=_0x55d321;if(!_0x24b59c)return;if(!_0x24b59c[_0x19f246(0x46f)]())return;const _0x31f802=0x80,_0x4858c7=_0x24b59c[_0x19f246(0x3e4)]();let _0x4c5099=ColorManager[_0x19f246(0x8fb)](),_0x56d119=ColorManager['expGaugeColor2']();_0x4858c7>=0x1&&(_0x4c5099=ColorManager[_0x19f246(0x79e)](),_0x56d119=ColorManager[_0x19f246(0x632)]()),this[_0x19f246(0x44a)](_0x30ec07,_0x12b227,_0x31f802,_0x4858c7,_0x4c5099,_0x56d119);},Window_EquipStatus[_0x55d321(0x2a8)][_0x55d321(0x863)]=function(){const _0x28bb10=_0x55d321;let _0x39509a=0x0;for(const _0x5cd60c of VisuMZ[_0x28bb10(0x886)][_0x28bb10(0x530)][_0x28bb10(0x3f0)][_0x28bb10(0x1dd)]){const _0x1182ba=this['itemPadding'](),_0x13f3ea=this['paramY'](_0x39509a);this[_0x28bb10(0x59e)](_0x1182ba,_0x13f3ea,_0x5cd60c),_0x39509a++;}},Window_EquipStatus['prototype'][_0x55d321(0x4b4)]=function(_0xbf0c9f,_0x3a6dbc,_0x522186){const _0x5e0349=_0x55d321,_0x27a8dc=this[_0x5e0349(0x1c0)]()-this[_0x5e0349(0x818)]()*0x2;this['drawParamText'](_0xbf0c9f,_0x3a6dbc,_0x27a8dc,_0x522186,![]);},Window_EquipStatus[_0x55d321(0x2a8)][_0x55d321(0x14e)]=function(_0x59267e,_0x23b0ca,_0x15a4f3){const _0x251888=_0x55d321,_0x2e9586=this['paramWidth']();this[_0x251888(0x604)](),this['drawText'](this[_0x251888(0x37b)][_0x251888(0x44d)](_0x15a4f3,!![]),_0x59267e,_0x23b0ca,_0x2e9586,_0x251888(0x649));},Window_EquipStatus[_0x55d321(0x2a8)][_0x55d321(0x83a)]=function(_0x1c95b0,_0x3c0d5e){const _0xda4696=_0x55d321,_0x549f94=this[_0xda4696(0x6ab)]();this[_0xda4696(0x54c)](ColorManager[_0xda4696(0x173)]());const _0x4a4eed=VisuMZ[_0xda4696(0x886)][_0xda4696(0x530)]['UI']['ParamArrow'];this[_0xda4696(0x4bd)](_0x4a4eed,_0x1c95b0,_0x3c0d5e,_0x549f94,_0xda4696(0x72b));},Window_EquipStatus['prototype'][_0x55d321(0x895)]=function(_0x26cc5a,_0x3f12ea,_0x19dd5d){const _0x1c3c9d=_0x55d321,_0x314602=this[_0x1c3c9d(0x390)](),_0x5134a6=this['_tempActor']['paramValueByName'](_0x19dd5d),_0x4d6934=_0x5134a6-this[_0x1c3c9d(0x37b)][_0x1c3c9d(0x44d)](_0x19dd5d);this[_0x1c3c9d(0x54c)](ColorManager[_0x1c3c9d(0x938)](_0x4d6934)),this[_0x1c3c9d(0x4bd)](this['_tempActor'][_0x1c3c9d(0x44d)](_0x19dd5d,!![]),_0x26cc5a,_0x3f12ea,_0x314602,_0x1c3c9d(0x649));},VisuMZ['CoreEngine'][_0x55d321(0x4fe)]=Window_EquipItem[_0x55d321(0x2a8)][_0x55d321(0x293)],Window_EquipItem[_0x55d321(0x2a8)][_0x55d321(0x293)]=function(_0x4ae628){const _0x14b72d=_0x55d321;return _0x4ae628&&this['_actor']?this['_actor'][_0x14b72d(0x3ae)](_0x4ae628):VisuMZ[_0x14b72d(0x886)][_0x14b72d(0x4fe)][_0x14b72d(0x2b5)](this,_0x4ae628);},Window_StatusParams[_0x55d321(0x2a8)][_0x55d321(0x315)]=function(){const _0x189196=_0x55d321;return VisuMZ[_0x189196(0x886)][_0x189196(0x530)][_0x189196(0x3f0)][_0x189196(0x1dd)][_0x189196(0x7e5)];},Window_StatusParams[_0x55d321(0x2a8)][_0x55d321(0x59e)]=function(_0x14218f){const _0x58c2bb=_0x55d321,_0x2177e7=this[_0x58c2bb(0x92d)](_0x14218f),_0x196c75=VisuMZ[_0x58c2bb(0x886)][_0x58c2bb(0x530)][_0x58c2bb(0x3f0)][_0x58c2bb(0x1dd)][_0x14218f],_0x2e9187=TextManager[_0x58c2bb(0x652)](_0x196c75),_0x1348fb=this[_0x58c2bb(0x37b)]['paramValueByName'](_0x196c75,!![]);this['drawParamText'](_0x2177e7['x'],_0x2177e7['y'],0xa0,_0x196c75,![]),this['resetTextColor'](),this[_0x58c2bb(0x4bd)](_0x1348fb,_0x2177e7['x']+0xa0,_0x2177e7['y'],0x3c,'right');};if(VisuMZ['CoreEngine'][_0x55d321(0x530)][_0x55d321(0x158)][_0x55d321(0x17c)]){VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)]['KeyboardInput'][_0x55d321(0x8e0)]&&(Window_NameInput[_0x55d321(0x669)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x55d321(0x208),'OK']);;VisuMZ[_0x55d321(0x886)][_0x55d321(0x50c)]=Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x4a1)],Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(_0x3d1b74){const _0x39daad=_0x55d321;this[_0x39daad(0x5c9)]=this[_0x39daad(0x8d2)](),VisuMZ[_0x39daad(0x886)][_0x39daad(0x50c)][_0x39daad(0x2b5)](this,_0x3d1b74),this[_0x39daad(0x5c9)]==='default'?this[_0x39daad(0x250)](0x0):(Input[_0x39daad(0x75d)](),this['deselect']());},Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x8d2)]=function(){const _0x4c040c=_0x55d321;if(Input[_0x4c040c(0x7e3)]())return'default';return VisuMZ['CoreEngine'][_0x4c040c(0x530)]['KeyboardInput']['DefaultMode']||_0x4c040c(0x256);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x26e)]=Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x23c)],Window_NameInput['prototype'][_0x55d321(0x23c)]=function(){const _0x18d3f9=_0x55d321;if(!this[_0x18d3f9(0x6dd)]())return;if(!this[_0x18d3f9(0x448)])return;if(this[_0x18d3f9(0x5c9)]===_0x18d3f9(0x256)&&Input['isGamepadTriggered']())this[_0x18d3f9(0x2d3)](_0x18d3f9(0x62c));else{if(Input[_0x18d3f9(0x907)](_0x18d3f9(0x7e1)))Input[_0x18d3f9(0x75d)](),this[_0x18d3f9(0x3e8)]();else{if(Input[_0x18d3f9(0x1ac)](_0x18d3f9(0x6bf)))Input[_0x18d3f9(0x75d)](),this[_0x18d3f9(0x5c9)]===_0x18d3f9(0x256)?this[_0x18d3f9(0x2d3)](_0x18d3f9(0x62c)):this[_0x18d3f9(0x2d3)](_0x18d3f9(0x256));else{if(this['_mode']===_0x18d3f9(0x256))this[_0x18d3f9(0x22b)]();else Input['isSpecialCode'](_0x18d3f9(0x39a))?(Input[_0x18d3f9(0x75d)](),this['switchModes']('keyboard')):VisuMZ[_0x18d3f9(0x886)][_0x18d3f9(0x26e)][_0x18d3f9(0x2b5)](this);}}}},VisuMZ[_0x55d321(0x886)][_0x55d321(0x892)]=Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x35f)],Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x35f)]=function(){const _0x3f8387=_0x55d321;if(!this[_0x3f8387(0x808)]())return;if(this[_0x3f8387(0x5c9)]==='keyboard'){if(TouchInput[_0x3f8387(0x1ac)]()&&this[_0x3f8387(0x759)]())this[_0x3f8387(0x2d3)](_0x3f8387(0x62c));else TouchInput[_0x3f8387(0x273)]()&&this[_0x3f8387(0x2d3)]('default');}else VisuMZ[_0x3f8387(0x886)][_0x3f8387(0x892)][_0x3f8387(0x2b5)](this);},Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x22b)]=function(){const _0x432443=_0x55d321;if(Input[_0x432443(0x907)]('enter'))Input[_0x432443(0x75d)](),this[_0x432443(0x562)]();else{if(Input[_0x432443(0x929)]!==undefined){let _0x40534b=Input['_inputString'],_0x3d6401=_0x40534b['length'];for(let _0x246573=0x0;_0x246573<_0x3d6401;++_0x246573){this['_editWindow']['add'](_0x40534b[_0x246573])?SoundManager[_0x432443(0x421)]():SoundManager[_0x432443(0x324)]();}Input[_0x432443(0x75d)]();}}},Window_NameInput[_0x55d321(0x2a8)]['switchModes']=function(_0x31d79e){const _0x2c1a75=_0x55d321;let _0x4d7329=this[_0x2c1a75(0x5c9)];this[_0x2c1a75(0x5c9)]=_0x31d79e,_0x4d7329!==this[_0x2c1a75(0x5c9)]&&(this[_0x2c1a75(0x1cc)](),SoundManager[_0x2c1a75(0x421)](),this[_0x2c1a75(0x5c9)]==='default'?this['select'](0x0):this[_0x2c1a75(0x250)](-0x1));},VisuMZ['CoreEngine'][_0x55d321(0x770)]=Window_NameInput['prototype']['cursorDown'],Window_NameInput['prototype']['cursorDown']=function(_0x27051a){const _0x416583=_0x55d321;if(this['_mode']===_0x416583(0x256)&&!Input[_0x416583(0x1c6)]())return;if(Input[_0x416583(0x7d7)]())return;VisuMZ[_0x416583(0x886)][_0x416583(0x770)]['call'](this,_0x27051a),this[_0x416583(0x2d3)](_0x416583(0x62c));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x377)]=Window_NameInput['prototype'][_0x55d321(0x22f)],Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x22f)]=function(_0x314336){const _0x229dbf=_0x55d321;if(this[_0x229dbf(0x5c9)]===_0x229dbf(0x256)&&!Input[_0x229dbf(0x1c6)]())return;if(Input[_0x229dbf(0x7d7)]())return;VisuMZ[_0x229dbf(0x886)][_0x229dbf(0x377)]['call'](this,_0x314336),this[_0x229dbf(0x2d3)](_0x229dbf(0x62c));},VisuMZ[_0x55d321(0x886)]['Window_NameInput_cursorRight']=Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x251)],Window_NameInput[_0x55d321(0x2a8)]['cursorRight']=function(_0x16cbcb){const _0x33a2cb=_0x55d321;if(this['_mode']===_0x33a2cb(0x256)&&!Input[_0x33a2cb(0x1c6)]())return;if(Input[_0x33a2cb(0x7d7)]())return;VisuMZ[_0x33a2cb(0x886)][_0x33a2cb(0x701)][_0x33a2cb(0x2b5)](this,_0x16cbcb),this[_0x33a2cb(0x2d3)](_0x33a2cb(0x62c));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x860)]=Window_NameInput['prototype'][_0x55d321(0x63b)],Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x63b)]=function(_0x29eb46){const _0x16cc37=_0x55d321;if(this[_0x16cc37(0x5c9)]===_0x16cc37(0x256)&&!Input['isArrowPressed']())return;if(Input[_0x16cc37(0x7d7)]())return;VisuMZ[_0x16cc37(0x886)][_0x16cc37(0x860)][_0x16cc37(0x2b5)](this,_0x29eb46),this[_0x16cc37(0x2d3)](_0x16cc37(0x62c));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x89c)]=Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x82c)],Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x82c)]=function(){const _0x584735=_0x55d321;if(this[_0x584735(0x5c9)]===_0x584735(0x256))return;if(Input[_0x584735(0x7d7)]())return;VisuMZ[_0x584735(0x886)][_0x584735(0x89c)][_0x584735(0x2b5)](this),this['switchModes'](_0x584735(0x62c));},VisuMZ[_0x55d321(0x886)]['Window_NameInput_cursorPageup']=Window_NameInput['prototype'][_0x55d321(0x8eb)],Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x8eb)]=function(){const _0x1114b9=_0x55d321;if(this[_0x1114b9(0x5c9)]===_0x1114b9(0x256))return;if(Input[_0x1114b9(0x7d7)]())return;VisuMZ['CoreEngine'][_0x1114b9(0x2b7)][_0x1114b9(0x2b5)](this),this[_0x1114b9(0x2d3)](_0x1114b9(0x62c));},VisuMZ[_0x55d321(0x886)][_0x55d321(0x359)]=Window_NameInput[_0x55d321(0x2a8)][_0x55d321(0x1cc)],Window_NameInput['prototype']['refresh']=function(){const _0x110bb2=_0x55d321;if(this['_mode']===_0x110bb2(0x256)){this[_0x110bb2(0x6f7)][_0x110bb2(0x75d)](),this[_0x110bb2(0x865)][_0x110bb2(0x75d)](),this[_0x110bb2(0x604)]();let _0xf265a=VisuMZ[_0x110bb2(0x886)]['Settings'][_0x110bb2(0x158)][_0x110bb2(0x2b8)]['split']('\x0a'),_0x479612=_0xf265a['length'],_0x2e4022=(this[_0x110bb2(0x152)]-_0x479612*this[_0x110bb2(0x4e0)]())/0x2;for(let _0x1cd1ea=0x0;_0x1cd1ea<_0x479612;++_0x1cd1ea){let _0x5f5082=_0xf265a[_0x1cd1ea],_0x2459e9=this['textSizeEx'](_0x5f5082)[_0x110bb2(0x85f)],_0x2d6d87=Math[_0x110bb2(0x33d)]((this[_0x110bb2(0x6f7)][_0x110bb2(0x85f)]-_0x2459e9)/0x2);this[_0x110bb2(0x2a4)](_0x5f5082,_0x2d6d87,_0x2e4022),_0x2e4022+=this[_0x110bb2(0x4e0)]();}}else VisuMZ[_0x110bb2(0x886)]['Window_NameInput_refresh']['call'](this);};};VisuMZ[_0x55d321(0x886)][_0x55d321(0x8c9)]=Window_ShopSell[_0x55d321(0x2a8)][_0x55d321(0x293)],Window_ShopSell[_0x55d321(0x2a8)][_0x55d321(0x293)]=function(_0x4cd7f3){const _0x4ee705=_0x55d321;return VisuMZ[_0x4ee705(0x886)][_0x4ee705(0x530)][_0x4ee705(0x6f5)][_0x4ee705(0x2c4)]&&DataManager[_0x4ee705(0x2d4)](_0x4cd7f3)?![]:VisuMZ[_0x4ee705(0x886)]['Window_ShopSell_isEnabled']['call'](this,_0x4cd7f3);},Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x656)]=function(){return![];};VisuMZ[_0x55d321(0x886)]['Settings'][_0x55d321(0x158)][_0x55d321(0x49d)]&&(VisuMZ[_0x55d321(0x886)][_0x55d321(0x239)]=Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x7b6)],Window_NumberInput['prototype']['start']=function(){const _0x144dc7=_0x55d321;VisuMZ['CoreEngine']['Window_NumberInput_start'][_0x144dc7(0x2b5)](this),this['select'](this[_0x144dc7(0x780)]-0x1),Input[_0x144dc7(0x75d)]();},VisuMZ[_0x55d321(0x886)][_0x55d321(0x2d9)]=Window_NumberInput['prototype'][_0x55d321(0x54b)],Window_NumberInput['prototype'][_0x55d321(0x54b)]=function(){const _0x346f34=_0x55d321;if(!this[_0x346f34(0x808)]())return;if(Input[_0x346f34(0x7d7)]())this['processKeyboardDigitChange']();else{if(Input['isSpecialCode'](_0x346f34(0x7e1)))this[_0x346f34(0x93a)]();else{if(Input[_0x346f34(0x774)]===0x2e)this[_0x346f34(0x167)]();else{if(Input['_inputSpecialKeyCode']===0x24)this[_0x346f34(0x4f9)]();else Input[_0x346f34(0x774)]===0x23?this[_0x346f34(0x34a)]():VisuMZ[_0x346f34(0x886)]['Window_NumberInput_processDigitChange']['call'](this);}}}},Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x415)]=function(){const _0x3f6630=_0x55d321;if(!this[_0x3f6630(0x739)]())return;Input[_0x3f6630(0x7d7)]()?this['processKeyboardDigitChange']():Window_Selectable[_0x3f6630(0x2a8)]['processCursorMove'][_0x3f6630(0x2b5)](this);},Window_NumberInput['prototype'][_0x55d321(0x67c)]=function(){},Window_NumberInput['prototype'][_0x55d321(0x784)]=function(){const _0x3cd9bc=_0x55d321;if(String(this['_number'])[_0x3cd9bc(0x7e5)]>=this[_0x3cd9bc(0x780)])return;const _0x2b8ebf=Number(String(this['_number'])+Input[_0x3cd9bc(0x929)]);if(isNaN(_0x2b8ebf))return;this[_0x3cd9bc(0x65c)]=_0x2b8ebf;const _0x24791c='9'[_0x3cd9bc(0x28e)](this[_0x3cd9bc(0x780)]);this[_0x3cd9bc(0x65c)]=this[_0x3cd9bc(0x65c)][_0x3cd9bc(0x19a)](0x0,_0x24791c),Input[_0x3cd9bc(0x75d)](),this[_0x3cd9bc(0x1cc)](),SoundManager['playCursor'](),this[_0x3cd9bc(0x250)](this[_0x3cd9bc(0x780)]-0x1);},Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x93a)]=function(){const _0x551b0c=_0x55d321;this[_0x551b0c(0x65c)]=Number(String(this[_0x551b0c(0x65c)])[_0x551b0c(0x365)](0x0,-0x1)),this[_0x551b0c(0x65c)]=Math[_0x551b0c(0x548)](0x0,this[_0x551b0c(0x65c)]),Input[_0x551b0c(0x75d)](),this[_0x551b0c(0x1cc)](),SoundManager[_0x551b0c(0x17b)](),this[_0x551b0c(0x250)](this[_0x551b0c(0x780)]-0x1);},Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x167)]=function(){const _0x4c9fb3=_0x55d321;this[_0x4c9fb3(0x65c)]=Number(String(this[_0x4c9fb3(0x65c)])['substring'](0x1)),this[_0x4c9fb3(0x65c)]=Math[_0x4c9fb3(0x548)](0x0,this[_0x4c9fb3(0x65c)]),Input[_0x4c9fb3(0x75d)](),this['refresh'](),SoundManager[_0x4c9fb3(0x17b)](),this['select'](this[_0x4c9fb3(0x780)]-0x1);},Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x4f9)]=function(){const _0x38ea5b=_0x55d321;if(this[_0x38ea5b(0x52c)]()===0x0)return;Input['clear'](),this['refresh'](),SoundManager[_0x38ea5b(0x17b)](),this['select'](0x0);},Window_NumberInput[_0x55d321(0x2a8)][_0x55d321(0x34a)]=function(){const _0x56f6cf=_0x55d321;if(this['index']()===this[_0x56f6cf(0x780)]-0x1)return;Input[_0x56f6cf(0x75d)](),this[_0x56f6cf(0x1cc)](),SoundManager[_0x56f6cf(0x17b)](),this[_0x56f6cf(0x250)](this[_0x56f6cf(0x780)]-0x1);});;VisuMZ[_0x55d321(0x886)]['Window_MapName_refresh']=Window_MapName[_0x55d321(0x2a8)]['refresh'],Window_MapName[_0x55d321(0x2a8)][_0x55d321(0x1cc)]=function(){const _0x12ee82=_0x55d321;VisuMZ[_0x12ee82(0x886)][_0x12ee82(0x530)]['QoL'][_0x12ee82(0x2ae)]?this[_0x12ee82(0x272)]():VisuMZ[_0x12ee82(0x886)][_0x12ee82(0x252)][_0x12ee82(0x2b5)](this);},Window_MapName[_0x55d321(0x2a8)]['refreshWithTextCodeSupport']=function(){const _0x228d6a=_0x55d321;this[_0x228d6a(0x6f7)][_0x228d6a(0x75d)]();if($gameMap[_0x228d6a(0x4a0)]()){const _0x31b9d6=this[_0x228d6a(0x502)];this['drawBackground'](0x0,0x0,_0x31b9d6,this[_0x228d6a(0x4e0)]());const _0x22da66=this[_0x228d6a(0x243)]($gameMap[_0x228d6a(0x4a0)]())[_0x228d6a(0x85f)];this['drawTextEx']($gameMap['displayName'](),Math[_0x228d6a(0x33d)]((_0x31b9d6-_0x22da66)/0x2),0x0);}},Window_TitleCommand['_commandList']=VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x5d1)],Window_TitleCommand[_0x55d321(0x2a8)][_0x55d321(0x31d)]=function(){const _0x32c738=_0x55d321;this[_0x32c738(0x4c1)]();},Window_TitleCommand[_0x55d321(0x2a8)][_0x55d321(0x4c1)]=function(){const _0x245204=_0x55d321;for(const _0x1a3855 of Window_TitleCommand['_commandList']){if(_0x1a3855[_0x245204(0x2ee)][_0x245204(0x2b5)](this)){const _0x2abcd0=_0x1a3855[_0x245204(0x559)];let _0x799f22=_0x1a3855[_0x245204(0x56a)];if(['','Untitled']['includes'](_0x799f22))_0x799f22=_0x1a3855[_0x245204(0x858)]['call'](this);const _0x4d71ee=_0x1a3855['EnableJS']['call'](this),_0x2fcbd3=_0x1a3855['ExtJS'][_0x245204(0x2b5)](this);this['addCommand'](_0x799f22,_0x2abcd0,_0x4d71ee,_0x2fcbd3),this[_0x245204(0x33f)](_0x2abcd0,_0x1a3855['CallHandlerJS']['bind'](this,_0x2fcbd3));}}},VisuMZ['CoreEngine']['Window_TitleCommand_selectLast']=Window_TitleCommand[_0x55d321(0x2a8)][_0x55d321(0x23d)],Window_TitleCommand[_0x55d321(0x2a8)]['selectLast']=function(){const _0x3f412a=_0x55d321;VisuMZ[_0x3f412a(0x886)]['Window_TitleCommand_selectLast'][_0x3f412a(0x2b5)](this);if(!Window_TitleCommand[_0x3f412a(0x2c6)])return;const _0x4f9a90=this[_0x3f412a(0x49a)](Window_TitleCommand[_0x3f412a(0x2c6)]),_0x327988=Math[_0x3f412a(0x33d)](this['maxVisibleItems']()/0x2)-0x1;this[_0x3f412a(0x1a5)](_0x4f9a90),this[_0x3f412a(0x92b)]>0x1&&(this[_0x3f412a(0x92b)]=0x1,this[_0x3f412a(0x4ed)]()),this[_0x3f412a(0x2b3)](_0x4f9a90-_0x327988);},Window_GameEnd[_0x55d321(0x336)]=VisuMZ['CoreEngine'][_0x55d321(0x530)][_0x55d321(0x5e8)]['GameEnd'][_0x55d321(0x8a7)],Window_GameEnd[_0x55d321(0x2a8)]['makeCommandList']=function(){const _0x2a7fbf=_0x55d321;this[_0x2a7fbf(0x4c1)]();},Window_GameEnd[_0x55d321(0x2a8)][_0x55d321(0x4c1)]=function(){const _0x1072af=_0x55d321;for(const _0xbdf584 of Window_GameEnd['_commandList']){if(_0xbdf584[_0x1072af(0x2ee)][_0x1072af(0x2b5)](this)){const _0x3571b6=_0xbdf584[_0x1072af(0x559)];let _0x584df1=_0xbdf584[_0x1072af(0x56a)];if(['','Untitled']['includes'](_0x584df1))_0x584df1=_0xbdf584[_0x1072af(0x858)][_0x1072af(0x2b5)](this);const _0x3f1a7a=_0xbdf584[_0x1072af(0x427)][_0x1072af(0x2b5)](this),_0x54e2ce=_0xbdf584[_0x1072af(0x54d)]['call'](this);this[_0x1072af(0x434)](_0x584df1,_0x3571b6,_0x3f1a7a,_0x54e2ce),this[_0x1072af(0x33f)](_0x3571b6,_0xbdf584['CallHandlerJS'][_0x1072af(0x88a)](this,_0x54e2ce));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist['prototype']=Object[_0x55d321(0x568)](Window_Base['prototype']),Window_ButtonAssist[_0x55d321(0x2a8)]['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(_0x45c788){const _0x586513=_0x55d321;this[_0x586513(0x663)]={},Window_Base['prototype'][_0x586513(0x4a1)][_0x586513(0x2b5)](this,_0x45c788),this[_0x586513(0x2e2)](VisuMZ['CoreEngine'][_0x586513(0x530)][_0x586513(0x56f)][_0x586513(0x350)]||0x0),this[_0x586513(0x1cc)]();},Window_ButtonAssist[_0x55d321(0x2a8)][_0x55d321(0x4e0)]=function(){const _0x4889e1=_0x55d321;return this[_0x4889e1(0x152)]||Window_Base[_0x4889e1(0x2a8)][_0x4889e1(0x4e0)]['call'](this);},Window_ButtonAssist[_0x55d321(0x2a8)]['makeFontBigger']=function(){const _0xab8bd9=_0x55d321;this[_0xab8bd9(0x6f7)][_0xab8bd9(0x2d7)]<=0x60&&(this[_0xab8bd9(0x6f7)][_0xab8bd9(0x2d7)]+=0x6);},Window_ButtonAssist[_0x55d321(0x2a8)][_0x55d321(0x498)]=function(){const _0x1cb1c5=_0x55d321;this[_0x1cb1c5(0x6f7)][_0x1cb1c5(0x2d7)]>=0x18&&(this[_0x1cb1c5(0x6f7)]['fontSize']-=0x6);},Window_ButtonAssist['prototype'][_0x55d321(0x264)]=function(){const _0x1eb365=_0x55d321;Window_Base['prototype']['update'][_0x1eb365(0x2b5)](this),this[_0x1eb365(0x79b)]();},Window_ButtonAssist[_0x55d321(0x2a8)][_0x55d321(0x1e6)]=function(){const _0x5126fb=_0x55d321;this[_0x5126fb(0x335)]=SceneManager[_0x5126fb(0x43e)][_0x5126fb(0x66c)]()!==_0x5126fb(0x7e9)?0x0:0x8;},Window_ButtonAssist['prototype'][_0x55d321(0x79b)]=function(){const _0x4e91b3=_0x55d321,_0x4d9068=SceneManager[_0x4e91b3(0x43e)];for(let _0x5a504a=0x1;_0x5a504a<=0x5;_0x5a504a++){if(this['_data'][_0x4e91b3(0x6a3)['format'](_0x5a504a)]!==_0x4d9068['buttonAssistKey%1'[_0x4e91b3(0x4a5)](_0x5a504a)]())return this[_0x4e91b3(0x1cc)]();if(this[_0x4e91b3(0x663)]['text%1'[_0x4e91b3(0x4a5)](_0x5a504a)]!==_0x4d9068[_0x4e91b3(0x437)[_0x4e91b3(0x4a5)](_0x5a504a)]())return this[_0x4e91b3(0x1cc)]();}},Window_ButtonAssist[_0x55d321(0x2a8)][_0x55d321(0x1cc)]=function(){const _0x26bb79=_0x55d321;this['contents'][_0x26bb79(0x75d)]();for(let _0x8ccbc5=0x1;_0x8ccbc5<=0x5;_0x8ccbc5++){this[_0x26bb79(0x270)](_0x8ccbc5);}},Window_ButtonAssist[_0x55d321(0x2a8)][_0x55d321(0x270)]=function(_0x553d3e){const _0x2d1ca1=_0x55d321,_0x49e714=this[_0x2d1ca1(0x502)]/0x5,_0x2389ff=SceneManager[_0x2d1ca1(0x43e)],_0x2181ac=_0x2389ff['buttonAssistKey%1'[_0x2d1ca1(0x4a5)](_0x553d3e)](),_0x1aa763=_0x2389ff[_0x2d1ca1(0x437)['format'](_0x553d3e)]();this[_0x2d1ca1(0x663)][_0x2d1ca1(0x6a3)['format'](_0x553d3e)]=_0x2181ac,this['_data'][_0x2d1ca1(0x169)[_0x2d1ca1(0x4a5)](_0x553d3e)]=_0x1aa763;if(_0x2181ac==='')return;if(_0x1aa763==='')return;const _0x3cea03=_0x2389ff['buttonAssistOffset%1'[_0x2d1ca1(0x4a5)](_0x553d3e)](),_0x151ffd=this[_0x2d1ca1(0x818)](),_0x4fede4=_0x49e714*(_0x553d3e-0x1)+_0x151ffd+_0x3cea03,_0x25ad00=VisuMZ['CoreEngine'][_0x2d1ca1(0x530)]['ButtonAssist'][_0x2d1ca1(0x721)];this['drawTextEx'](_0x25ad00['format'](_0x2181ac,_0x1aa763),_0x4fede4,0x0,_0x49e714-_0x151ffd*0x2);},VisuMZ['CoreEngine'][_0x55d321(0x1dc)]=Game_Interpreter[_0x55d321(0x2a8)][_0x55d321(0x5e4)],Game_Interpreter[_0x55d321(0x2a8)]['updateWaitMode']=function(){const _0x5cc06b=_0x55d321;if($gameTemp[_0x5cc06b(0x2fb)]!==undefined)return VisuMZ[_0x5cc06b(0x886)][_0x5cc06b(0x873)]();return VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode'][_0x5cc06b(0x2b5)](this);},VisuMZ[_0x55d321(0x886)]['UpdatePictureCoordinates']=function(){const _0x13d874=_0x55d321,_0x4e3097=$gameTemp[_0x13d874(0x2fb)]||0x0;(_0x4e3097<0x0||_0x4e3097>0x64||TouchInput[_0x13d874(0x273)]()||Input['isTriggered'](_0x13d874(0x1ff)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input['clear'](),TouchInput[_0x13d874(0x75d)]());const _0x4fa8eb=$gameScreen[_0x13d874(0x171)](_0x4e3097);return _0x4fa8eb&&(_0x4fa8eb['_x']=TouchInput['_x'],_0x4fa8eb['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x13d874(0x32b)](),$gameTemp[_0x13d874(0x2fb)]!==undefined;},VisuMZ[_0x55d321(0x886)]['updatePictureCoordinates']=function(){const _0xd7303b=_0x55d321,_0x46edb4=SceneManager[_0xd7303b(0x43e)];if(!_0x46edb4)return;!_0x46edb4[_0xd7303b(0x725)]&&(SoundManager[_0xd7303b(0x8ed)](),_0x46edb4[_0xd7303b(0x725)]=new Window_PictureCoordinates(),_0x46edb4['addChild'](_0x46edb4[_0xd7303b(0x725)])),$gameTemp[_0xd7303b(0x2fb)]===undefined&&(SoundManager[_0xd7303b(0x5db)](),_0x46edb4[_0xd7303b(0x4fc)](_0x46edb4[_0xd7303b(0x725)]),_0x46edb4['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x52c24f=_0x55d321;this[_0x52c24f(0x4a1)](...arguments);}Window_PictureCoordinates[_0x55d321(0x2a8)]=Object[_0x55d321(0x568)](Window_Base[_0x55d321(0x2a8)]),Window_PictureCoordinates[_0x55d321(0x2a8)]['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x55d321(0x2a8)][_0x55d321(0x4a1)]=function(){const _0x52d44c=_0x55d321;this[_0x52d44c(0x52f)]=_0x52d44c(0x86e),this[_0x52d44c(0x68d)]=_0x52d44c(0x86e),this[_0x52d44c(0x1cd)]=_0x52d44c(0x86e);const _0xc9dd77=this[_0x52d44c(0x67d)]();Window_Base[_0x52d44c(0x2a8)][_0x52d44c(0x4a1)][_0x52d44c(0x2b5)](this,_0xc9dd77),this['setBackgroundType'](0x2);},Window_PictureCoordinates[_0x55d321(0x2a8)]['windowRect']=function(){const _0x57ba1d=_0x55d321;let _0x346bcd=0x0,_0x585bd4=Graphics[_0x57ba1d(0x48d)]-this[_0x57ba1d(0x4e0)](),_0x53b139=Graphics[_0x57ba1d(0x85f)],_0x405796=this['lineHeight']();return new Rectangle(_0x346bcd,_0x585bd4,_0x53b139,_0x405796);},Window_PictureCoordinates[_0x55d321(0x2a8)]['updatePadding']=function(){const _0x9897af=_0x55d321;this[_0x9897af(0x335)]=0x0;},Window_PictureCoordinates[_0x55d321(0x2a8)]['update']=function(){const _0x4536dd=_0x55d321;Window_Base['prototype']['update'][_0x4536dd(0x2b5)](this),this[_0x4536dd(0x372)]();},Window_PictureCoordinates[_0x55d321(0x2a8)]['updateData']=function(){const _0x2a0a95=_0x55d321;if(!this[_0x2a0a95(0x1ca)]())return;this[_0x2a0a95(0x1cc)]();},Window_PictureCoordinates[_0x55d321(0x2a8)][_0x55d321(0x1ca)]=function(){const _0x4674f9=_0x55d321,_0x3b43cd=$gameTemp['_pictureCoordinatesMode'],_0x3bede0=$gameScreen[_0x4674f9(0x171)](_0x3b43cd);return _0x3bede0?this[_0x4674f9(0x52f)]!==_0x3bede0[_0x4674f9(0x839)]||this[_0x4674f9(0x68d)]!==_0x3bede0['_x']||this[_0x4674f9(0x1cd)]!==_0x3bede0['_y']:![];},Window_PictureCoordinates[_0x55d321(0x2a8)][_0x55d321(0x1cc)]=function(){const _0x5831=_0x55d321;this['contents'][_0x5831(0x75d)]();const _0x1d56cf=$gameTemp[_0x5831(0x2fb)],_0xad70a=$gameScreen[_0x5831(0x171)](_0x1d56cf);if(!_0xad70a)return;this[_0x5831(0x52f)]=_0xad70a[_0x5831(0x839)],this[_0x5831(0x68d)]=_0xad70a['_x'],this['_lastY']=_0xad70a['_y'];const _0x29ee8a=ColorManager[_0x5831(0x66f)]();this[_0x5831(0x6f7)]['fillRect'](0x0,0x0,this[_0x5831(0x502)],this['innerHeight'],_0x29ee8a);const _0x3da426=_0x5831(0x2ed)['format'](_0xad70a['_origin']===0x0?_0x5831(0x353):_0x5831(0x1df)),_0x2f5f6c='X:\x20%1'[_0x5831(0x4a5)](_0xad70a['_x']),_0x5e38ad='Y:\x20%1'['format'](_0xad70a['_y']),_0x23d1b8=_0x5831(0x422)['format'](TextManager[_0x5831(0x468)](_0x5831(0x1ff)));let _0x277bd5=Math['floor'](this[_0x5831(0x502)]/0x4);this[_0x5831(0x4bd)](_0x3da426,_0x277bd5*0x0,0x0,_0x277bd5),this['drawText'](_0x2f5f6c,_0x277bd5*0x1,0x0,_0x277bd5,'center'),this[_0x5831(0x4bd)](_0x5e38ad,_0x277bd5*0x2,0x0,_0x277bd5,_0x5831(0x72b));const _0x4b1556=this[_0x5831(0x243)](_0x23d1b8)[_0x5831(0x85f)],_0x4614d0=this[_0x5831(0x502)]-_0x4b1556;this[_0x5831(0x2a4)](_0x23d1b8,_0x4614d0,0x0,_0x4b1556);};function Window_TextPopup(){const _0x474059=_0x55d321;this[_0x474059(0x4a1)](...arguments);}function _0x5000(){const _0x1aadce=['MODECHANGE','Smooth','isGamepadAxisMoved','_tpbState','DimColor2','ControllerButtons','WIN_ICO_HELP','paramBaseAboveLevel99','updateKeyText','_tpbChargeTime','_hp','maxLvGaugeColor1','sparamRateJS','KANA','blockWidth','buttonAssistText4','updateCoreEasing','VisuMZ_2_BattleSystemFTB','pagedownShowButton','Game_Unit_onBattleStart','Scene_Name_create','this.paramBase(','MainMenu','AutoStretch','encounterStepsMinimum','autoRemovalTiming','onInputBannedWords','_subject','addChild','onClick','isActiveTpb','makeDocumentTitle','_targetScaleY','isLoopVertical','initialLevel','start','optionsWindowRect','_defaultStretchMode','terminate','Padding','_downArrowSprite','XParamVocab8','_coreEasingType','StatusParamsRect','\x5c}❪SHIFT❫\x5c{','ParamChange','damageColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','prepareNextScene','name','Scene_Map_updateMainMultiply','_moveEasingType','down','sv_actors','BottomButtons','createPointAnimation','itemHitImprovedAccuracy','Flat2','_clickHandler','_buttonAssistWindow','_duration','Scene_Battle_update','ItemMenu','alphabetic','INQUINT','centerSprite','WIN_OEM_AUTO','updateAnchor','isNumpadPressed','yScrollLinkedOffset','_digitGrouping','_cacheScaleY','PRINTSCREEN','setColorTone','mainCommandWidth','encounterStep','Spriteset_Base_initialize','maxHorz','backspace','ColorMaxLvGauge1','isGamepadConnected','retrieveFauxAnimation','length','IDs','Game_Screen_initialize','_commandWindow','button','levelUp','OUTEXPO','toLowerCase','DigitGroupingGaugeSprites','_battlerName','globalAlpha','ParseItemNotetags','IconParam0','randomJS','GoldFontSize','scaleY','initRotationCoreEngine','INQUAD','createDimmerSprite','KeySHIFT','BaseTexture','process_VisuMZ_CoreEngine_Notetags','pagedown','createAnimationSprite','updateScrollBars','STB','_scaleY','isEventTest','current','pos','Window_refreshBack','loadMapData','setEnemyAction','_changingClass','integer','isOpenAndActive','AudioChangeBgsVolume','ctGaugeColor1','mute','EREOF','onKeyDown','checkScrollBarBitmap','removeAllPointAnimations','ListRect','CAPSLOCK','IconXParam2','DisplayLockY','GoldBgType','ColorDeath','processAlwaysEscape','_actorWindow','itemPadding','_clientArea','ctrlKey','repositionEnemiesByResolution','image-rendering','moveCancelButtonSideButtonLayout','BackOpacity','_offsetX','updateOnceParallelInterpreters','VisuMZ_2_BattleSystemETB','xparamPlus2','isHandled','enemy','ColorSystem','Location','Game_Picture_initBasic','ActorRect','OptionsRect','maxBattleMembers','offColor','cursorPagedown','pan','_stored_crisisColor','Graphics_centerElement','ALWAYS','context','useDigitGroupingEx','Game_Picture_angle','_commonEventLayers','destroyed','Window_Selectable_itemRect','drawIcon','DTB','_origin','drawRightArrow','IconSParam6','SwitchToggleOne','areButtonsHidden','ModernControls','HASH','MAT','IconSParam1','_bgmBuffer','children','movePageButtonSideButtonLayout','XParamVocab9','F18','SystemSetBattleSystem','XParamVocab6','_targetOpacity','_digitGroupingEx','removeFauxAnimation','drawGameVersion','itemSuccessRate','_targets','GoldIcon','helpAreaTopSideButtonLayout','gameTitle','setup','SceneManager_onKeyDown','moveRelativeToResolutionChange','powerDownColor','ActorTPColor','getKeyboardInputButtonString','TextJS','initialBattleSystem','FontWidthFix','hideButtonFromView','requestFauxAnimation','_muteSound','updateFrame','width','Window_NameInput_cursorLeft','tilesets','Game_Action_itemHit','drawAllParams','bodyColor','contentsBack','AutoScrollLockY','NUMPAD4','quit','updateDuration','scrollLeft','Game_Character_processMoveCommand','item','ButtonHeight','nah','ButtonFadeSpeed','ItemBgType','CustomParamType','clearTp','UpdatePictureCoordinates','ARRAYNUM','ParamName','CategoryRect','_destroyCanvas','Unnamed','INSERT','advanced','buttonAssistText1','viewport','FTB','Sprite_StateIcon_loadBitmap','ETB','TAB','xScrollLinkedOffset','this.paramBase(3)','destroy','process_VisuMZ_CoreEngine_CustomParameters','dimColor2','CoreEngine','_playtestF7Looping','allIcons','SParamVocab0','bind','F19','END','padZero','_tileExtendSprites','getLevel','maxPictures','ForceNoPlayTest','Window_NameInput_processTouch','allowShiftScrolling','ARRAYJSON','drawNewParam','exportAllMapStrings','changeAnglePlusData','scrollDown','ExtractStrFromTroop','Match','min','Window_NameInput_cursorPagedown','CLEAR','startNormalGame','OS_KEY','createCustomParameter','_stored_mpGaugeColor2','PreserveNumbers','createEnemies','list','setViewportCoreEngineFix','_storedMapText','CommandList','setBackgroundOpacity','setSideButtonLayout','MAXHP','_screenX','Window_StatusBase_drawActorSimpleStatus','_statusEquipWindow','getLastUsedGamepadType','createTitleButtons','iconHeight','targetBackOpacity','ApplyEasing','setupBattleTestItems','VisuMZ_3_EventChainReact','SParamVocab8','paramFlatBonus','measureText','OptionsMenu','open','SCROLL_LOCK','INOUTELASTIC','isItemStyle','stretch','_internalTextures','_active','SwitchToggleRange','XParamVocab1','AdjustAngle','PictureEasingType','playOnceParallelInterpreter','toFixed','_stored_maxLvGaugeColor2','restore','Scene_Item_create','Window_ShopSell_isEnabled','_phase','itemRect','BuyRect','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','startAnimation','displayY','charCode','boxWidth','defaultInputMode','_cacheScaleX','addQueue','processPointAnimationRequests','inputWindowRect','HelpRect','_listWindow','apply','tileset','OptionsBgType','ExportAllMapText','_pressed','createMenuButton','isAnimationOffsetXMirrored','QwertyLayout','framesPerChar','process_VisuMZ_CoreEngine_Settings','_baseSprite','render','remove','HANJA','_list','destroyScrollBarBitmaps','BattleManager_processEscape','measureTextWidthNoRounding','cursorPageup','BTestArmors','playLoad','playTestF7','buttonAssistWindowButtonRect','map','BarThickness','paramMax','getLastGamepadUsed','VisuMZ_1_BattleCore','CodeJS','SellBgType','WIN_ICO_CLEAR','itypeId','targetScaleY','centerCameraCheckData','expGaugeColor1','_troopId','ColorManager_loadWindowskin','getBackgroundOpacity','ColorHPGauge2','keys','Game_Map_changeTileset','ASTERISK','setLastPluginCommandInterpreter','NUMPAD3','makeActionList','EndingID','isSpecialCode','Armor-%1-%2','snapForBackground','scrollY','NON_FRAME','getColor','isFauxAnimationPlaying','Game_System_initialize','targetPosition','currentLevelExp','ParseStateNotetags','Scene_MenuBase_createPageButtons','WIN_OEM_RESET','BlurStrength','writeFile','Actor','windowOpacity','Scene_Shop_create','ColorHPGauge1','ExtractStrFromList','》Comment《\x0a%1\x0a','Bitmap_drawText','CallHandlerJS','_animationSprites','SParamVocab6','scrollX','sin','clearStencil','Class-%1-%2','applyEasing','editWindowRect','setAnglePlusData','pressed','background','_inputString','buttonAssistOffset1','_scrollDuration','setSkill','itemLineRect','Script\x20Call\x20Error\x20from\x20Event\x20%1','KEEP','dashToggle','drawActorExpGauge','requestPointAnimation','WindowLayer_render','_patternHeight','Scene_Map_updateMain','setupTileExtendTerrainTags','buttonAssistOk','paramchangeTextColor','DOWN','processKeyboardBackspace','skillTypeWindowRect','_realScale','PictureID','maxTp','setViewport','CustomParamIcons','PDR','pointY','shouldAutosave','PTB','getGamepads','system','MEV','updateEffekseer','targetEvaRate','isSideButtonLayout','Scene_Map_updateScene','updateAnglePlus','PictureEraseAll','successRate','Plus','retreat','playCursorSound','adjustY','adjustBoxSize','drawCurrentParam','_colorCache','updateBgsParameters','EQUALS','innerHeight','PictureRotateBy','consumable','calcEasing','DisplayLockX','RegExp','KeyboardInput','calcCoreEasing','getControllerInputButtonString','number','NUMPAD2','setDisplayPos','FontShadows','offOpacity','OUTBOUNCE','MINUS','_backSprite1','#%1','img/%1/','_eventId','fillText','processKeyboardDelete','TextManager_param','text%1','pageup','duration','mpGaugeColor2','Scene_SingleLoadTransition','sparamFlat2','Spriteset_Base_destroy','fillAll','picture','_animation','systemColor','BattleManager_update','createWindowLayer','MAX_GL_TEXTURES','playTestShiftT','showIncompleteTilesetError','outlineColorGauge','commandWindowRows','playCursor','EnableNameInput','flush','updatePositionCoreEngine','ShowActorLevel','scrollUp','up2','deselect','clearForcedGameTroopSettingsCoreEngine','removePointAnimation','_onceParallelInterpreters','XParamVocab5','GoldChange','sparamPlusJS','_stored_powerUpColor','process_VisuMZ_CoreEngine_Functions','_image','_mapY','VIEWPORT','Scene_TitleTransition','setTargetAnchor','maxCols','BTB','atypeId','STENCIL_BUFFER_BIT','MRG','OUTQUINT','_cache','setCoreEngineScreenShakeStyle','updateTransform','addAnimationSpriteToContainer','clamp','_pollGamepads','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','Window_Base_destroyContents','NUMPAD5','_stored_hpGaugeColor2','Plus2','isPhysical','MRF','Weapon-%1-%2','anchorCoreEasing','smoothSelect','_startDecrypting','loadBitmap','reserveNewGameCommonEvent','refreshActor','Linear','setSize','isTriggered','ShopMenu','enable','Scene_Title_drawGameTitle','buttonAssistKey5','animationBaseDelay','Bitmap_resize','Scene_Map_shouldAutosave','buttonAssistOffset4','Game_Actor_changeClass','framebuffer','EnableMasking','Scene_Name_onInputOk','Game_Unit_onBattleEnd','openURL','includes','setFrame','displayX','changeClass','DummyRect','paramX','CommandRect','_context','_startLoading','DOLLAR','value','isArrowPressed','object','_playTestFastMode','BTestAddedQuantity','needsUpdate','Basic','refresh','_lastY','_baseTexture','updateScrollBarPosition','initCoreEngine','Window_Base_initialize','F10','_stypeId','updateDocumentTitle','initMembersCoreEngine','Bitmap_measureTextWidth','_opacity','setupButtonImage','DrawIcons','createBackground','WIN_OEM_FJ_ROYA','Game_Interpreter_updateWaitMode','DisplayedParams','Key%1','Center','setBattleSystem','useFontWidthFix','StatusRect','Enable','gaugeHeight','clearRect','updatePadding','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','Window_Base_createContents','deactivate','sparamFlatJS','down2','this.paramBase(2)','isNextScene','JsReplaceUserVar','DetachMapPictureContainer','updatePointAnimations','PGDN','Icon','IconIndex','Window_Base_drawIcon','MultiKeyFmt','charging','AnimationID','contentsOpacity','PositionY','maxVert','repositionCancelButtonSideButtonLayout','DrawItemBackgroundJS','bgm','_stored_hpGaugeColor1','cancel','Bitmap_initialize','BarBodyColor','isPreserveTp','indexOf','_shakeDuration','ProfileBgType','ZOOM','loadTitle2','Page','_dimmerSprite','drawBackgroundRect','META','_bgsBuffer','loadGameImagesCoreEngine','scaleX','isPressed','INCIRC','QUESTION_MARK','tpbAcceleration','equips','trim','KeyTAB','version','changeTileset','$dataMap','HOME','reduce','NEAREST','_displayX','volume','anchor','DELETE','ParseClassNotetags','%1/','subject','WIN_OEM_FJ_LOYA','Enemy-%1-%2','eva','meVolume','openingSpeed','buttonAssistKey2','Game_Troop_setup','Scene_Map_createSpriteset','processKeyboardHandling','showPointAnimations','NoTileShadows','InputBgType','cursorUp','Scene_Base_terminate','Wait','ShowItemBackground','targetObjects','IconSParam3','makeAutoBattleActions','MDF','isBusy','Window_Gold_refresh','Window_NumberInput_start','PA1','hpGaugeColor2','processHandling','selectLast','SLASH','_tileSprite','batch','requiredWtypeId1','layoutSettings','textSizeEx','AudioChangeBgsPan','move','([\x5c+\x5c-]\x5cd+)>','Scene_Map_createMenuButton','centerY','SaveMenu','Sprite_Battler_startMove','Rate','CustomParam','isGamepadButtonPressed','Troop%1','enableDigitGroupingEx','select','cursorRight','Window_MapName_refresh','_anchor','retrievePointAnimation','Spriteset_Battle_createEnemies','keyboard','INOUTBOUNCE','CommandWidth','_backSprite2','Input_update','horizontal','Bitmap_fillRect','checkCacheKey','Scene_MenuBase_createCancelButton','isPlaytest','EVA','mainAreaHeightSideButtonLayout','Flat','traitObjects','update','isAlive','OkText','Mirror','FUNC','_centerCameraCheck','HRG','_stored_gaugeBackColor','xparamFlat1','getCustomBackgroundSettings','Window_NameInput_processHandling','setMoveEasingType','drawSegment','paramBase','refreshWithTextCodeSupport','isCancelled','this.paramBase(4)','MinDuration','AllTroops','_fauxAnimationSprites','arePageButtonsEnabled','SLEEP','Layer','IconXParam1','refreshSpritesetForExtendedTiles','MDR','isPointAnimationPlaying','SideView','updateBackOpacity','subtitle','_editWindow','operand','F13','INBOUNCE','_timeDuration','sparamRate1','forceStencil','_hideTileShadows','drawCircle','isMVAnimation','actorWindowRect','targets','repeat','_pointAnimationSprites','Game_Actor_paramBase','note','jsQuickFunc','isEnabled','tilesetFlags','forceOutOfPlaytest','addWindow','ExportString','shift','optSideView','saveViewport','font-smooth','DEF','buttonAssistText5','updateBgmParameters','isItem','LINEAR','RowSpacing','left','_windowLayer','drawTextEx','statusEquipWindowRect','CTB','_slotWindow','prototype','addChildToBack','DigitGroupingLocale','SParamVocab7','_pauseSignSprite','_texture','MapNameTextCode','F14','isCollidedWithEvents','PAUSE','ConvertToBase','setTopRow','If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.','call','tileHeight','Window_NameInput_cursorPageup','NameInputMessage','1.3.0','FINAL','BACK_SLASH','textHeight','Game_Temp_initialize','CLOSE_CURLY_BRACKET','params','imageSmoothingEnabled','gaugeBackColor','Window_Selectable_cursorDown','cursorDown','KeyItemProtect','RevertPreserveNumbers','_lastCommandSymbol','IconXParam9','powerUpColor','gainGold','popScene','ColorMPGauge1','loadTileset','hpGaugeColor1','_createInternalTextures','createPointAnimationQueue','resetFontSettings','uiAreaWidth','win32','switchModes','isKeyItem','Game_Interpreter_command111','playBgs','fontSize','HelpBgType','Window_NumberInput_processDigitChange','Game_Map_scrollRight','random','isNwjs','DamageColor','createContents','GroupDigits','NameMenu','onMoveEnd','setBackgroundType','_refreshBack','reservePlayTestNewGameCommonEvent','drawActorClass','drawGoldItemStyle','TimeProgress','adjustSprite','_colorTone','StatusParamsBgType','SParamVocab5','CustomParamNames','\x20Origin:\x20%1','ShowJS','faces','skillId','send','_mp','WIN_OEM_BACKTAB','mpColor','rgba(0,\x200,\x200,\x201.0)','ScreenResolution','_pictureContainer','PixelateImageRendering','mirror','StatusEquipRect','_pictureCoordinatesMode','isNormalPriority','⚠️⚠️⚠️\x20Conditional\x20Branch\x20Script\x20Error!\x20⚠️⚠️⚠️','Game_Picture_updateMove','INOUTCUBIC','EQUAL','buttonAssistKey1','isGamepadTriggered','pages','ParseWeaponNotetags','updateOpen','playMiss','_pointAnimationQueue','SceneManager_initialize','drawActorIcons','paramPlus','RIGHT','NUMPAD7','StatusEquipBgType','createExtendedTileSprite','Scene_Map_createSpritesetFix','SplitEscape','titles1','IconParam3','ColorTPGauge1','alwaysDash','maxItems','style','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','dummyWindowRect','TPB\x20WAIT','paramRate1','sparamFlatBonus','gainSilentTp','makeCommandList','scaleSprite','xparamFlatBonus','this.paramBase(1)','Scene_MenuBase_helpAreaTop','Game_Picture_move','OpenSpeed','playBuzzer','initBasic','Subtitle','destroyContents','EXR','ShowScrollBar','isInstanceOfSceneMap','updatePictureCoordinates','initCoreEngineScreenShake','WIN_OEM_CLEAR','mainAreaTop','_hideButtons','ScaleX','measureTextWidth','scrollbarHeight','TCR','currentCommand','padding','_commandList','【%1】\x0a','listWindowRect','_CoreEngineSettings','IconParam6','Sprite_Actor_setActorHome','StatusBgType','floor','outlineColorDmg','setHandler','drawing','getBattleSystem','_itemWindow','AGI','Game_Actor_levelUp','Game_Event_isCollidedWithEvents','removeAllFauxAnimations','Type','mpCostColor','EVAL','processKeyboardEnd','GoldOverlap','LvExpGauge','TGR','Window_Selectable_drawBackgroundRect','_targetOffsetY','BgType','BuyBgType','SideButtons','Upper\x20Left','ActorBgType','COMMA','BannedWords','fillStyle','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','Window_NameInput_refresh','wtypeId','parallaxes','setAnchor','log','helpAreaTop','processTouch','ALT','jsonToZip','match','runCombinedScrollingTextAsCode','startMove','slice','backOpacity','attackSkillId','AccuracyBoost','data/','mpGaugeColor1','CIRCUMFLEX','CreateBattleSystemID','skills','Game_Picture_initRotation','endAnimation','VisuMZ_4_UniqueTileEffects','parse','updateData','_index','setupCustomRateCoreEngine','iconWidth','_tileExtendTerrainTags','Window_NameInput_cursorUp','playTestF6','HELP','_width','_actor','Map%1.json','Total','PictureRotate','blendFunc','drawGameSubtitle','8oMeEmX','visible','ShowButtons','playTestShiftR','Scene_Base_create','ShiftT_Toggle','maxLevel','randomInt','setupScrollBarBitmap','MAX_SAFE_INTEGER','_tile','endAction','OPEN_PAREN','Scene_Base_createWindowLayer','showFauxAnimations','paramWidth','UNDERSCORE','Plus1','isAnimationForEach','Scene_Boot_loadSystemImages','VisuMZ_2_BattleSystemOTB','requestMotion','textColor','onBattleEnd','createPointAnimationSprite','escape','buttonAssistText2','Window_StatusBase_drawActorLevel','createButtonAssistWindow','determineSideButtonLayoutValid','Input_shouldPreventDefault','anglePlus','AllMaps','processMoveCommand','Spriteset_Battle_createLowerLayer','_addSpotTile','_inputWindow','redraw','numberWindowRect','ColorCTGauge2','setActorHomeRepositioned','F16','CategoryBgType','GRD','ATK','canEquip','F15','itemEva','concat','Window_SkillList_includes','ColorGaugeBack','ZERO','initCoreEasing','sparamRate2','FontSize','TitlePicButtons','applyForcedGameTroopSettingsCoreEngine','Scene_Options_create','DigitGroupingExText','BoxMargin','alignBottom','setupNewGame','updateClose','helpWindowRect','transform','createKeyJS','processTouchModernControls','createJsQuickFunction','Spriteset_Base_updatePosition','onlyfilename','updateScene','activate','updatePictureAntiZoom','Bitmap_drawTextOutline','LUK','STRUCT','_upArrowSprite','INOUTQUART','ctGaugeColor2','updateRotation','fillRect','CLOSE_PAREN','SELECT','XParamVocab7','RPGMAKER_VERSION','Skill-%1-%2','coreEngineRepositionEnemies','sparamPlus','pendingColor','_lastIconIndex','updatePosition','expParams','ParseArmorNotetags','WIN_OEM_FJ_TOUROKU','_saveFileID','PictureShowIcon','currentValue','getControllerInputButtonMatch','ParseAllNotetags','expRate','SceneManager_isGameActive','<JS\x20%1\x20%2:[\x20](.*)>','worldTransform','processBack','setClickHandler','tpGaugeColor2','makeDeepCopy','_movementDuration','Gold','_displayY','ItemBackColor2','Param','blt','MenuBg','backgroundBitmap','parseForcedGameTroopSettingsCoreEngine','cos','xparam','NUMPAD6','XParameterFormula','REPLACE','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','isSideView','connected','_battleField','onKeyDownKeysF6F7','gradientFillRect','Scene_Battle_createSpriteset_detach','keyRepeatWait','cancelShowButton','drawFace','createSpriteset','drawActorNickname','gaugeRate','Graphics_defaultStretchMode','Sprite_Button_updateOpacity','performEscape','updatePositionCoreEngineShakeHorz','_fauxAnimationQueue','Game_Picture_calcEasing','_stored_deathColor','_skillTypeWindow','targetSpritePosition','zoomScale','centerX','JUNJA','buttons','battlebacks1','processCursorMove','_updateGamepadState','PERIOD','_smooth','GET','drawGameTitle','enabled','end','onerror','horz','ColorMPCost','test','playOk','%1:\x20Exit\x20','GoldMax','_closing','ColorCrisis','260mbxBkf','EnableJS','TargetAngle','option','targetOpacity','_helpWindow','uiAreaHeight','level','getLastPluginCommandInterpreter','INBACK','animationId','TranslucentOpacity','sparam','ItemStyle','addCommand','destroyCoreEngineMarkedBitmaps','AudioChangeBgmVolume','buttonAssistText%1','_drawTextShadow','outbounce','Manual','Scene_Battle_createSpritesetFix','platform','Scene_Equip_create','_scene','%1\x0a','src','Scene_Base_terminateAnimationClearBugFix','_stored_normalColor','_currentBgs','DimColor1','getTileExtendTerrainTags','WIN_OEM_FJ_JISHO','F17','active','Scene_Boot_startNormalGame','drawGauge','isEnemy','(\x5cd+)([%％])>','paramValueByName','setEasingType','renderNoMask','fadeSpeed','playtestQuickLoad','process_VisuMZ_CoreEngine_RegExp','Scene_Status_create','ParamMax','isOptionValid','helpAreaBottom','playBgm','_stored_tpGaugeColor1','Duration','AudioChangeBgsPitch','horzJS','xparamFlatJS','isClosing','VisuMZ_2_BattleSystemCTB','_sideButtonLayout','standardIconWidth','_setupEventHandlers','%1%2','Window_Base_update','removeTileExtendSprites','Power','isWindowMaskingEnabled','stencilOp','getInputButtonString','Game_Actor_isPreserveTp','TextPopupShow','_centerElementCoreEngine','menu','buttonAssistText3','_startPlaying','isActor','this.paramBase(5)','PERCENT','InputRect','thickness','_sellWindow','StartID','maxScrollX','updatePositionCoreEngineShakeRand','_scrollBarVert','IconXParam6','setActorHome','paramRate','ImprovedAccuracySystem','type','animations','paintOpacity','normal','pictureButtons','Scene_Map_createSpriteset_detach','createPointAnimationTargets','startAutoNewGame','faceHeight','exit','pop','ScaleY','focus','stringKeyMap','STENCIL_TEST','Bitmap_blt','height','_categoryWindow','nextLevelExp','save','fromCharCode','CorrectSkinBleeding','QUOTE','statusParamsWindowRect','IconXParam3','\x0a\x0a\x0a\x0a\x0a','BlendMode','makeFontSmaller','SUBTRACT','findSymbol','Game_BattlerBase_initMembers','BattleSystem','EnableNumberInput','ColorMPGauge2','Spriteset_Base_update','displayName','initialize','charAt','pointX','paramRate2','format','Game_Map_scrollLeft','processTimingData','command355','updatePlayTestF7','DataManager_setupNewGame','isAutoColorAffected','_timerSprite','DECIMAL','ShortcutScripts','updateMotion','PGUP','Bitmap_clearRect','currencyUnit','_offsetY','drawParamName','NUMPAD9','IconSParam4','canUse','Title','paramFlat','seek','isLoopHorizontal','loadTileBitmap','drawText','targetContentsOpacity','createTextPopupWindow','BTestWeapons','makeCoreEngineCommandList','_statusParamsWindow','CRI','onBattleStart','buttonAssistOffset2','mhp','refreshScrollBarBitmap','initRotation','filter','ActorMPColor','makeTargetSprites','drawCharacter','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','show','process_VisuMZ_CoreEngine_ControllerButtons','DummyBgType','SParamVocab3','bgsVolume','OffBarOpacity','isMaxLevel','EXCLAMATION','updateCurrentEvent','setCommonEvent','GREATER_THAN','operation','isSmartEventCollisionOn','_makeFontNameText','skillTypes','_textQueue','tpColor','originalJS','lineHeight','_shouldPreventDefault','DOUBLE_QUOTE','OpenConsole','onEscapeSuccess','ParseEnemyNotetags','createFauxAnimationSprite','checkSubstitute','valueOutlineColor','Game_Picture_y','xparamRate2','MCR','checkPassage','updateSmoothScroll','PictureCoordinatesMode','Scene_GameEnd_createBackground','EncounterRateMinimum','resize','App','drawIconBySize','setEvent','smooth','AnimationPoint','printError','isSceneMap','processKeyboardHome','updateLastTarget','font','removeChild','_bypassCanCounterCheck','Window_EquipItem_isEnabled','_lastPluginCommandInterpreter','NONCONVERT','IconParam1','innerWidth','Game_Interpreter_PluginCommand','getCoreEngineScreenShakeStyle','catchException','resetBattleSystem','targetScaleX','maxGold','standardIconHeight','20946SZJPBI','OPEN_BRACKET','Window_NameInput_initialize','ParseTilesetNotetags','numActions','663760YEllTe','_originalViewport','FadeSpeed','Color','_movementWholeDuration','itemHeight','_stored_ctGaugeColor2','vert','statusWindowRect','Scene_Load','_onKeyPress','_viewportSize','maxScrollY','GoldRect','JSON','PositionX','Scene_Boot_onDatabaseLoaded','ShiftR_Toggle','windowPadding','OffBarColor','_mapNameWindow','result','setupCoreEngine','angle','top','Game_Action_updateLastTarget','processEscape','CEV','REC','index','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Scene_MenuBase_mainAreaTop','_lastOrigin','Settings','setHome','processCursorMoveModernControls','stop','createCustomBackgroundImages','SkillMenu','command357','setCoreEngineUpdateWindowBg','Max','toUpperCase','SParamVocab9','animationNextDelay','_stored_ctGaugeColor1','SystemLoadAudio','_mirror','8utCNFF','Pixelated','isClosed','EXSEL','NewGameCommonEvent','_coreEasing','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Abbreviation','skipBranch','max','_windowskin','baseTextRect','processDigitChange','changeTextColor','ExtJS','join','VariableJsBlock','isMaskingEnabled','_previousClass','SEPARATOR','NUM_LOCK','VisuMZ_2_BattleSystemSTB','pow','setWindowPadding','updatePictureSettings','Scene_Unlisted','Symbol','WIN_OEM_FINISH','LineHeight','removeAnimationFromContainer','createLowerLayer','none','F20','_isWindow','_animationQueue','onNameOk','recoverAll','Bitmap_strokeRect','isRepeated','learnings','ExtDisplayedParams','create','LevelUpFullMp','TextStr','battlerHue','Sprite_StateIcon_updateFrame','ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a','_tilemap','ButtonAssist','CommandBgType','_rate','_centerElement','eventsXyNt','_allTextHeight','_anglePlus','OutlineColorDmg','loadSystem','seVolume','ImgLoad','boxHeight','areButtonsOutsideMainUI','home','useDigitGrouping','updateShadow','INOUTCIRC','CrisisRate','command122','push','IconSet','INOUTQUAD','isScrollBarVisible','this.paramBase(6)','targetY','Window_Scrollable_update','ItemHeight','VisuMZ_2_BattleSystemPTB','_pageupButton','_hovered','dimColor1','mapId','usableSkills','maxTurns','Game_Picture_scaleX','HIT','ColorNormal','_buyWindow','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','Spriteset_Base_isAnimationPlaying','xparamFlat2','INOUTQUINT','Sprite_AnimationMV_processTimingData','stypeId','NUM','Window_Selectable_processCursorMove','Window_Base_drawText','drawItem','isMenuButtonAssistEnabled','ExtractStrFromMap','checkSmartEventCollision','hit','Game_Battler_initTpbChargeTime','tpCostColor','0.00','getCombinedScrollingText','paramPlusJS','child_process','357603sBQuLn','Game_Map_setDisplayPos','TILDE','XParamVocab2','BgFilename1','isMapScrollLinked','parameters','onXhrError','addLoadListener','layeredTiles','LoadMenu','loadTitle1','169485ALBYyW','createScrollBarSprites','ATTN','PHA','hasEncryptedImages','buttonY','CheckSplitEscape','PageChange','SParamVocab2','2022734UVXGZO','NumberBgType','expGaugeColor2','setLastGamepadUsed','slotWindowRect','initDigitGrouping','evade','buttonAssistKey4','normalColor','opacity','ShowDevTools','_mode','drawTextTopAligned','addOnceParallelInterpreter','Sprite_AnimationMV_updatePosition','_shiftY','asin','mainAreaHeight','1.10.0','TitleCommandList','OUTELASTIC','ExportAllTroopText','bitmapWidth','NUMPAD8','sv_enemies','Window_Base_drawCharacter','CancelText','isSceneBattle','DATABASE','playCancel','initMembers','Game_Party_consumeItem','bitmap','_lastGamepad','_goldWindow','textAlign','_displayedPassageError','onActorChange','updateWaitMode','ItemRect','Game_Picture_show','tpGaugeColor1','MenuLayout','exportAllTroopStrings','Graphics_printError','clearCachedKeys','DIVIDE','processFauxAnimationRequests','BlurFilter','GetParamIcon','Game_Action_setAttack','targetX','paramName','_name','goldWindowRect','scrollRight','origin','VOLUME_DOWN','adjustPictureAntiZoom','markCoreEngineModified','offsetY','_shakeSpeed','nw.gui','ColorCTGauge1','createTroopNote','buttonAreaHeight','buttonAssistCancel','scale','_onLoad','_refreshArrows','resetTextColor','itemWindowRect','_shakePower','onTpbCharged','stencilFunc','buttonAssistWindowSideRect','ActorHPColor','crisisColor','clone','split','DurationPerChat','touchUI','SystemSetSideView','ARRAYSTR','WIN_OEM_FJ_MASSHOU','mainFontSize','wait','gaugeLineHeight','original','isEventRunning','gainItem','Spriteset_Map_createTilemap','setAttack','updateScrollBarVisibility','Scene_MenuBase_mainAreaHeight','text','Scene_Map_initialize','createCancelButton','categoryWindowRect','_pictureName','_iconIndex','DefaultStyle','paramRateJS','sparamFlat1','_onError','_targetX','catchUnknownError','toLocaleString','_stored_mpGaugeColor1','_forcedBattleGridSystem','default','initVisuMZCoreEngine','ACCEPT','setSideView','BottomHelp','Game_Interpreter_command105','maxLvGaugeColor2','createPageButtons','Window_Base_createTextState','adjustX','itemBackColor2','createSubSprite','Scene_Battle_createSpriteset','ListBgType','ENTER','cursorLeft','IconParam2','Input_setupEventHandlers','onButtonImageLoad','buttonAssistKey3','description','drawParamText','DashToggleR','loadWindowskin','bgmVolume','DETACH_PICTURE_CONTAINER','_stored_maxLvGaugeColor1','updatePositionCoreEngineShakeVert','IconSParam0','right','vertJS','catchLoadError','currentClass','_spriteset','sqrt','Actor-%1-%2','INCUBIC','(\x5cd+\x5c.?\x5cd+)>','param','_forcedBattleSys','vertical','Sprite_Gauge_currentValue','isUseModernControls','NewGameBoot','AudioChangeBgmPan','initButtonHidden','checkPlayerLocation','Game_Map_scrollUp','_number','_targetY','TextCodeClassNames','valueOutlineWidth','_text','DocumentTitleFmt','DigitGroupingDamageSprites','_data','Sprite_Animation_setViewport','shake','updateMove','PositionJS','_target','LATIN1','XParamVocab4','setMute','getButtonAssistLocation','refreshDimmerBitmap','Chance','itemBackColor1','_targetOffsetX','BKSP','ONE','ColorTPGauge2','MAXMP','MvAnimationRate','etypeId','OUTQUART','replace','ValueJS','ColorExpGauge2','currentExp','processCursorHomeEndTrigger','windowRect','_forcedTroopView','_backgroundSprite','responseText','XParamVocab3','CNT','OPEN_CURLY_BRACKET','buttonAssistOffset5','Window_Base_drawFace','contains','bitmapHeight','isBottomHelpMode','SCALE_MODES','Game_Action_itemEva','GameEnd','ColorPowerUp','_lastX','actor','terms','pictures','updateOpacity','Exported_Script_%1.txt','_cancelButton','tileWidth','removeAnimation','ProfileRect','WIN_OEM_PA2','moveMenuButtonSideButtonLayout','code','_targetAnchor','and\x20add\x20it\x20onto\x20this\x20one.','hpColor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_statusWindow','round','_stored_tpGaugeColor2','IconXParam5','evaded','key%1','sparamRate','Scene_Battle_createCancelButton','faceWidth','offsetX','maxScrollbar','_backgroundFilter','〘Common\x20Event\x20%1:\x20%2〙\x20Start','rightArrowWidth','loadIconBitmap','LEFT','itemHit','getInputMultiButtonStrings','ConvertParams','updateBattleVariables','axes','isAnimationPlaying','_gamepadWait','_drawTextOutline','battlebacks2','bgs','Game_Interpreter_command122','registerCommand','353590pavzgs','IconParam7','BgFilename2','openness','_storedStack','tab','_onKeyDown','Scene_Menu_create','_opening','doesNameContainBannedWords','ConvertNumberToString','invokeCounterAttack','updateFrameCoreEngine','Finish','get','FDR','onload','SceneManager_exit','updateDashToggle','this.paramBase(0)','BasicParameterFormula','ParseActorNotetags','performMiss','storeMapData','Scene_Title','enemies','playEscape','characters','WIN_OEM_ENLW','_textPopupWindow','_stored_powerDownColor','EditRect','filterArea','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_currentBgm','isOpen','ColorTPCost','PLUS','Input_clear','initTpbChargeTime','_coreEngineShakeStyle','_numberWindow','getColorDataFromPluginParameters','overallWidth','CustomParamAbb','Opacity','OUTQUAD','3299085rkYDzV','Speed','_profileWindow','_dummyWindow','removeOnceParallelInterpreter','mainAreaTopSideButtonLayout','ONE_MINUS_SRC_ALPHA','keyMapper','getPointAnimationLayer','scrollbar','easingType','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','QoL','members','contents','evaluate','EISU','createTileExtendSprites','Sprite_Gauge_gaugeRate','NUMPAD1','INSINE','strokeRect','Game_Interpreter_command355','SwitchActorText','Window_NameInput_cursorRight','setupValueFont','rowSpacing','ExportCurMapText','overallHeight','executeLoad','return\x200','Game_Picture_x','pitch','ARRAYEVAL','sceneTerminationClearEffects','loadSystemImages','setValue','createTilemap','applyCoreEasing','outlineColor','Origin','TRG','PLAY','isInputting','F12','_addShadow','AMPERSAND','smallParamFontSize','_customModified','isTpb','MULTIPLY','numRepeats','_backSprite','Scene_Boot_updateDocumentTitle','_isButtonHidden','updateText','TextFmt','_lastScrollBarValues','setupCoreEasing','reserveCommonEvent','_pictureCoordinatesWindow','offset','_currentMap','SellRect','NUMPAD0','_height','center','textBaseline','VOLUME_MUTE','Window_Selectable_processTouch','drawActorLevel','LESS_THAN','EXECUTE','Scene_Skill_create','ScreenShake','textWidth','Game_Map_setup','_repositioned','Keyboard','wholeDuration','isCursorMovable','updateTpbChargeTime','constructor','processSoundTimings','PRESERVCONVERSION(%1)','_buttonType','Control\x20Variables\x20Script\x20Error','ColorMaxLvGauge2','SkillTypeBgType','nextEventCode','_scrollBarHorz','disable','IconXParam4','〘Scrolling\x20Text〙\x0a','updateMain','\x5c}❪TAB❫\x5c{','_encounterCount','_destroyInternalTextures','ceil','_url','makeInputButtonString','process_VisuMZ_CoreEngine_jsQuickFunctions','updatePositionCoreEngineShakeOriginal','_loadingState','target','clearOnceParallelInterpreters','ALTGR','inBattle','SHIFT','setTileFrame','Script\x20Call\x20Code:\x20\x0a%1','consumeItem','isTouchedInsideFrame','Sprite_Picture_updateOrigin','xparamPlus','_registerKeyInput','clear','SCROLLBAR','WIN_OEM_WSCTRL','checkCoreEngineDisplayCenter','translucentOpacity','nickname','Mute','createDigits','Sprite_Picture_loadBitmap','onInputOk','keyCode','RepositionEnemies130','filters','Game_Picture_scaleY','Window','commandWindowRect','Bitmap_drawCircle','SEMICOLON','OUTSINE','Window_NameInput_cursorDown','Input_pollGamepads','updateFauxAnimations','_logWindow','_inputSpecialKeyCode','BACK_QUOTE','command105','missed','erasePicture','defineProperty','Input_updateGamepadState','_pagedownButton','Bitmap_gradientFillRect','isBottomButtonMode','isTileExtended','buttonAssistWindowRect','_maxDigits','areTileShadowsHidden','ControllerMatches','MaxDuration','processKeyboardDigitChange','F11','〘Show\x20Text〙\x0a','exec','createChildSprite','titles2','OTB','ExportStrFromAllMaps','ADD','Sprite_Button_initialize','VisuMZ_2_BattleSystemBTB','XParamVocab0','_optionsWindow','drawActorSimpleStatus','Rate1'];_0x5000=function(){return _0x1aadce;};return _0x5000();}Window_TextPopup[_0x55d321(0x2a8)]=Object[_0x55d321(0x568)](Window_Base['prototype']),Window_TextPopup[_0x55d321(0x2a8)][_0x55d321(0x73b)]=Window_TextPopup,Window_TextPopup['SETTINGS']={'framesPerChar':VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)]['Window'][_0x55d321(0x60e)]??1.5,'framesMin':VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x76b)][_0x55d321(0x275)]??0x5a,'framesMax':VisuMZ[_0x55d321(0x886)][_0x55d321(0x530)][_0x55d321(0x76b)][_0x55d321(0x783)]??0x12c},Window_TextPopup['prototype'][_0x55d321(0x4a1)]=function(){const _0x10832d=_0x55d321,_0x3752eb=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype'][_0x10832d(0x4a1)][_0x10832d(0x2b5)](this,_0x3752eb),this['openness']=0x0,this[_0x10832d(0x660)]='',this[_0x10832d(0x4dd)]=[],this[_0x10832d(0x286)]=0x0;},Window_TextPopup[_0x55d321(0x2a8)][_0x55d321(0x4ab)]=function(){return!![];},Window_TextPopup[_0x55d321(0x2a8)][_0x55d321(0x8d4)]=function(_0x457bb1){const _0x7925b4=_0x55d321;if(this[_0x7925b4(0x4dd)][this[_0x7925b4(0x4dd)]['length']-0x1]===_0x457bb1)return;this[_0x7925b4(0x4dd)][_0x7925b4(0x582)](_0x457bb1),SceneManager[_0x7925b4(0x43e)][_0x7925b4(0x7af)](this);},Window_TextPopup[_0x55d321(0x2a8)][_0x55d321(0x264)]=function(){const _0x453597=_0x55d321;Window_Base['prototype'][_0x453597(0x264)][_0x453597(0x2b5)](this),this[_0x453597(0x720)](),this[_0x453597(0x869)]();},Window_TextPopup[_0x55d321(0x2a8)][_0x55d321(0x720)]=function(){const _0x44e8a4=_0x55d321;if(this[_0x44e8a4(0x660)]!=='')return;if(this[_0x44e8a4(0x4dd)][_0x44e8a4(0x7e5)]<=0x0)return;if(!this[_0x44e8a4(0x541)]())return;this[_0x44e8a4(0x660)]=this['_textQueue'][_0x44e8a4(0x298)]();const _0x3cfa8d=Window_TextPopup['SETTINGS'],_0x197091=Math[_0x44e8a4(0x74b)](this[_0x44e8a4(0x660)][_0x44e8a4(0x7e5)]*_0x3cfa8d[_0x44e8a4(0x8e1)]);this[_0x44e8a4(0x286)]=_0x197091[_0x44e8a4(0x19a)](_0x3cfa8d['framesMin'],_0x3cfa8d['framesMax']);const _0xe10651=this['textSizeEx'](this[_0x44e8a4(0x660)]);let _0x1e4d67=_0xe10651[_0x44e8a4(0x85f)]+this['itemPadding']()*0x2;_0x1e4d67+=$gameSystem['windowPadding']()*0x2;let _0x150e8d=Math[_0x44e8a4(0x548)](_0xe10651[_0x44e8a4(0x48d)],this[_0x44e8a4(0x4e0)]());_0x150e8d+=$gameSystem[_0x44e8a4(0x521)]()*0x2;const _0x2e68b4=Math[_0x44e8a4(0x69f)]((Graphics['width']-_0x1e4d67)/0x2),_0x41bb22=Math[_0x44e8a4(0x69f)]((Graphics[_0x44e8a4(0x48d)]-_0x150e8d)/0x2),_0x2838e6=new Rectangle(_0x2e68b4,_0x41bb22,_0x1e4d67,_0x150e8d);this[_0x44e8a4(0x245)](_0x2838e6['x'],_0x2838e6['y'],_0x2838e6[_0x44e8a4(0x85f)],_0x2838e6[_0x44e8a4(0x48d)]),this['createContents'](),this['refresh'](),this['open'](),SceneManager['_scene']['addChild'](this);},Window_TextPopup[_0x55d321(0x2a8)]['refresh']=function(){const _0x5c1ff2=_0x55d321,_0x3692a0=this[_0x5c1ff2(0x54a)]();this[_0x5c1ff2(0x6f7)]['clear'](),this[_0x5c1ff2(0x2a4)](this['_text'],_0x3692a0['x'],_0x3692a0['y'],_0x3692a0[_0x5c1ff2(0x85f)]);},Window_TextPopup[_0x55d321(0x2a8)][_0x55d321(0x869)]=function(){const _0x36100b=_0x55d321;if(this['isOpening']()||this[_0x36100b(0x45d)]())return;if(this[_0x36100b(0x286)]<=0x0)return;this[_0x36100b(0x286)]--,this['_timeDuration']<=0x0&&(this['close'](),this[_0x36100b(0x660)]='');},VisuMZ[_0x55d321(0x5c8)]=function(_0x423fb7){const _0x41e45f=_0x55d321;if(Utils[_0x41e45f(0x455)](_0x41e45f(0x420))){var _0x215291=require(_0x41e45f(0x5fc))[_0x41e45f(0x76b)][_0x41e45f(0x6c8)]();SceneManager['showDevTools']();if(_0x423fb7)setTimeout(_0x215291[_0x41e45f(0x489)][_0x41e45f(0x88a)](_0x215291),0x190);}},VisuMZ[_0x55d321(0x8b2)]=function(_0x95c8a2,_0x1c320c){const _0x285101=_0x55d321;_0x1c320c=_0x1c320c[_0x285101(0x539)]();var _0x25e39e=1.70158,_0x2c2008=0.7;switch(_0x1c320c){case _0x285101(0x2a0):return _0x95c8a2;case _0x285101(0x6fd):return-0x1*Math[_0x285101(0x3f5)](_0x95c8a2*(Math['PI']/0x2))+0x1;case _0x285101(0x76f):return Math[_0x285101(0x921)](_0x95c8a2*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x285101(0x3f5)](Math['PI']*_0x95c8a2)-0x1);case _0x285101(0x7f6):return _0x95c8a2*_0x95c8a2;case _0x285101(0x6e8):return _0x95c8a2*(0x2-_0x95c8a2);case _0x285101(0x584):return _0x95c8a2<0.5?0x2*_0x95c8a2*_0x95c8a2:-0x1+(0x4-0x2*_0x95c8a2)*_0x95c8a2;case _0x285101(0x650):return _0x95c8a2*_0x95c8a2*_0x95c8a2;case'OUTCUBIC':var _0x1265cd=_0x95c8a2-0x1;return _0x1265cd*_0x1265cd*_0x1265cd+0x1;case _0x285101(0x2ff):return _0x95c8a2<0.5?0x4*_0x95c8a2*_0x95c8a2*_0x95c8a2:(_0x95c8a2-0x1)*(0x2*_0x95c8a2-0x2)*(0x2*_0x95c8a2-0x2)+0x1;case'INQUART':return _0x95c8a2*_0x95c8a2*_0x95c8a2*_0x95c8a2;case _0x285101(0x677):var _0x1265cd=_0x95c8a2-0x1;return 0x1-_0x1265cd*_0x1265cd*_0x1265cd*_0x1265cd;case _0x285101(0x3ce):var _0x1265cd=_0x95c8a2-0x1;return _0x95c8a2<0.5?0x8*_0x95c8a2*_0x95c8a2*_0x95c8a2*_0x95c8a2:0x1-0x8*_0x1265cd*_0x1265cd*_0x1265cd*_0x1265cd;case _0x285101(0x7d3):return _0x95c8a2*_0x95c8a2*_0x95c8a2*_0x95c8a2*_0x95c8a2;case _0x285101(0x195):var _0x1265cd=_0x95c8a2-0x1;return 0x1+_0x1265cd*_0x1265cd*_0x1265cd*_0x1265cd*_0x1265cd;case _0x285101(0x598):var _0x1265cd=_0x95c8a2-0x1;return _0x95c8a2<0.5?0x10*_0x95c8a2*_0x95c8a2*_0x95c8a2*_0x95c8a2*_0x95c8a2:0x1+0x10*_0x1265cd*_0x1265cd*_0x1265cd*_0x1265cd*_0x1265cd;case'INEXPO':if(_0x95c8a2===0x0)return 0x0;return Math[_0x285101(0x555)](0x2,0xa*(_0x95c8a2-0x1));case _0x285101(0x7eb):if(_0x95c8a2===0x1)return 0x1;return-Math[_0x285101(0x555)](0x2,-0xa*_0x95c8a2)+0x1;case'INOUTEXPO':if(_0x95c8a2===0x0||_0x95c8a2===0x1)return _0x95c8a2;var _0x34b14b=_0x95c8a2*0x2,_0x319eda=_0x34b14b-0x1;if(_0x34b14b<0x1)return 0.5*Math['pow'](0x2,0xa*_0x319eda);return 0.5*(-Math[_0x285101(0x555)](0x2,-0xa*_0x319eda)+0x2);case _0x285101(0x210):var _0x34b14b=_0x95c8a2/0x1;return-0x1*(Math[_0x285101(0x64e)](0x1-_0x34b14b*_0x95c8a2)-0x1);case'OUTCIRC':var _0x1265cd=_0x95c8a2-0x1;return Math[_0x285101(0x64e)](0x1-_0x1265cd*_0x1265cd);case _0x285101(0x57f):var _0x34b14b=_0x95c8a2*0x2,_0x319eda=_0x34b14b-0x2;if(_0x34b14b<0x1)return-0.5*(Math[_0x285101(0x64e)](0x1-_0x34b14b*_0x34b14b)-0x1);return 0.5*(Math[_0x285101(0x64e)](0x1-_0x319eda*_0x319eda)+0x1);case _0x285101(0x42f):return _0x95c8a2*_0x95c8a2*((_0x25e39e+0x1)*_0x95c8a2-_0x25e39e);case'OUTBACK':var _0x34b14b=_0x95c8a2/0x1-0x1;return _0x34b14b*_0x34b14b*((_0x25e39e+0x1)*_0x34b14b+_0x25e39e)+0x1;break;case'INOUTBACK':var _0x34b14b=_0x95c8a2*0x2,_0x575f9b=_0x34b14b-0x2,_0x409623=_0x25e39e*1.525;if(_0x34b14b<0x1)return 0.5*_0x34b14b*_0x34b14b*((_0x409623+0x1)*_0x34b14b-_0x409623);return 0.5*(_0x575f9b*_0x575f9b*((_0x409623+0x1)*_0x575f9b+_0x409623)+0x2);case'INELASTIC':if(_0x95c8a2===0x0||_0x95c8a2===0x1)return _0x95c8a2;var _0x34b14b=_0x95c8a2/0x1,_0x319eda=_0x34b14b-0x1,_0x428335=0x1-_0x2c2008,_0x409623=_0x428335/(0x2*Math['PI'])*Math[_0x285101(0x5ce)](0x1);return-(Math[_0x285101(0x555)](0x2,0xa*_0x319eda)*Math[_0x285101(0x921)]((_0x319eda-_0x409623)*(0x2*Math['PI'])/_0x428335));case _0x285101(0x5d2):var _0x428335=0x1-_0x2c2008,_0x34b14b=_0x95c8a2*0x2;if(_0x95c8a2===0x0||_0x95c8a2===0x1)return _0x95c8a2;var _0x409623=_0x428335/(0x2*Math['PI'])*Math[_0x285101(0x5ce)](0x1);return Math[_0x285101(0x555)](0x2,-0xa*_0x34b14b)*Math[_0x285101(0x921)]((_0x34b14b-_0x409623)*(0x2*Math['PI'])/_0x428335)+0x1;case _0x285101(0x8bb):var _0x428335=0x1-_0x2c2008;if(_0x95c8a2===0x0||_0x95c8a2===0x1)return _0x95c8a2;var _0x34b14b=_0x95c8a2*0x2,_0x319eda=_0x34b14b-0x1,_0x409623=_0x428335/(0x2*Math['PI'])*Math[_0x285101(0x5ce)](0x1);if(_0x34b14b<0x1)return-0.5*(Math[_0x285101(0x555)](0x2,0xa*_0x319eda)*Math[_0x285101(0x921)]((_0x319eda-_0x409623)*(0x2*Math['PI'])/_0x428335));return Math[_0x285101(0x555)](0x2,-0xa*_0x319eda)*Math[_0x285101(0x921)]((_0x319eda-_0x409623)*(0x2*Math['PI'])/_0x428335)*0.5+0x1;case _0x285101(0x160):var _0x34b14b=_0x95c8a2/0x1;if(_0x34b14b<0x1/2.75)return 7.5625*_0x34b14b*_0x34b14b;else{if(_0x34b14b<0x2/2.75){var _0x575f9b=_0x34b14b-1.5/2.75;return 7.5625*_0x575f9b*_0x575f9b+0.75;}else{if(_0x34b14b<2.5/2.75){var _0x575f9b=_0x34b14b-2.25/2.75;return 7.5625*_0x575f9b*_0x575f9b+0.9375;}else{var _0x575f9b=_0x34b14b-2.625/2.75;return 7.5625*_0x575f9b*_0x575f9b+0.984375;}}}case _0x285101(0x285):var _0x5bc3bd=0x1-VisuMZ['ApplyEasing'](0x1-_0x95c8a2,_0x285101(0x439));return _0x5bc3bd;case _0x285101(0x257):if(_0x95c8a2<0.5)var _0x5bc3bd=VisuMZ['ApplyEasing'](_0x95c8a2*0x2,'inbounce')*0.5;else var _0x5bc3bd=VisuMZ[_0x285101(0x8b2)](_0x95c8a2*0x2-0x1,_0x285101(0x439))*0.5+0.5;return _0x5bc3bd;default:return _0x95c8a2;}},VisuMZ[_0x55d321(0x5ef)]=function(_0x19c308){const _0xc50894=_0x55d321;_0x19c308=String(_0x19c308)[_0xc50894(0x539)]();const _0x402a60=VisuMZ[_0xc50894(0x886)][_0xc50894(0x530)][_0xc50894(0x3f0)];if(_0x19c308===_0xc50894(0x8aa))return _0x402a60[_0xc50894(0x7f1)];if(_0x19c308===_0xc50894(0x674))return _0x402a60[_0xc50894(0x501)];if(_0x19c308===_0xc50894(0x3ad))return _0x402a60[_0xc50894(0x63c)];if(_0x19c308===_0xc50894(0x29c))return _0x402a60[_0xc50894(0x312)];if(_0x19c308===_0xc50894(0x840))return _0x402a60['IconParam4'];if(_0x19c308===_0xc50894(0x236))return _0x402a60['IconParam5'];if(_0x19c308===_0xc50894(0x343))return _0x402a60[_0xc50894(0x33a)];if(_0x19c308===_0xc50894(0x3cb))return _0x402a60[_0xc50894(0x6bb)];if(_0x19c308===_0xc50894(0x592))return _0x402a60['IconXParam0'];if(_0x19c308===_0xc50894(0x260))return _0x402a60[_0xc50894(0x27b)];if(_0x19c308===_0xc50894(0x4c3))return _0x402a60[_0xc50894(0x812)];if(_0x19c308==='CEV')return _0x402a60[_0xc50894(0x495)];if(_0x19c308===_0xc50894(0x141))return _0x402a60[_0xc50894(0x745)];if(_0x19c308===_0xc50894(0x1a2))return _0x402a60[_0xc50894(0x6a1)];if(_0x19c308===_0xc50894(0x682))return _0x402a60[_0xc50894(0x479)];if(_0x19c308==='HRG')return _0x402a60['IconXParam7'];if(_0x19c308==='MRG')return _0x402a60['IconXParam8'];if(_0x19c308===_0xc50894(0x712))return _0x402a60[_0xc50894(0x2c7)];if(_0x19c308===_0xc50894(0x34d))return _0x402a60[_0xc50894(0x648)];if(_0x19c308==='GRD')return _0x402a60[_0xc50894(0x841)];if(_0x19c308==='REC')return _0x402a60['IconSParam2'];if(_0x19c308===_0xc50894(0x5b8))return _0x402a60[_0xc50894(0x234)];if(_0x19c308===_0xc50894(0x4eb))return _0x402a60[_0xc50894(0x4b6)];if(_0x19c308===_0xc50894(0x333))return _0x402a60['IconSParam5'];if(_0x19c308===_0xc50894(0x941))return _0x402a60[_0xc50894(0x83b)];if(_0x19c308===_0xc50894(0x27d))return _0x402a60['IconSParam7'];if(_0x19c308===_0xc50894(0x6c9))return _0x402a60['IconSParam8'];if(_0x19c308===_0xc50894(0x328))return _0x402a60['IconSParam9'];if(VisuMZ[_0xc50894(0x886)][_0xc50894(0x940)][_0x19c308])return VisuMZ['CoreEngine'][_0xc50894(0x940)][_0x19c308]||0x0;return 0x0;},VisuMZ[_0x55d321(0x6c4)]=function(_0xc92e85,_0x19cd4a,_0x3ade3c){const _0x2b3a12=_0x55d321;if(_0x3ade3c===undefined&&_0xc92e85%0x1===0x0)return _0xc92e85;if(_0x3ade3c!==undefined&&[_0x2b3a12(0x8aa),_0x2b3a12(0x674),_0x2b3a12(0x3ad),_0x2b3a12(0x29c),_0x2b3a12(0x840),_0x2b3a12(0x236),_0x2b3a12(0x343),_0x2b3a12(0x3cb)][_0x2b3a12(0x1bb)](String(_0x3ade3c)[_0x2b3a12(0x539)]()[_0x2b3a12(0x214)]()))return _0xc92e85;_0x19cd4a=_0x19cd4a||0x0;if(VisuMZ['CoreEngine'][_0x2b3a12(0x6e6)][_0x3ade3c])return VisuMZ['CoreEngine'][_0x2b3a12(0x871)][_0x3ade3c]===_0x2b3a12(0x807)?_0xc92e85:String((_0xc92e85*0x64)[_0x2b3a12(0x8c5)](_0x19cd4a))+'%';return String((_0xc92e85*0x64)['toFixed'](_0x19cd4a))+'%';},VisuMZ[_0x55d321(0x2df)]=function(_0x5c3f77){const _0x56a9f9=_0x55d321;_0x5c3f77=String(_0x5c3f77);if(!_0x5c3f77)return _0x5c3f77;if(typeof _0x5c3f77!=='string')return _0x5c3f77;const _0xb3e9c3=VisuMZ['CoreEngine']['Settings'][_0x56a9f9(0x6f5)][_0x56a9f9(0x2aa)]||'en-US',_0x398735={'maximumFractionDigits':0x6};_0x5c3f77=_0x5c3f77[_0x56a9f9(0x678)](/\[(.*?)\]/g,(_0x56ca3c,_0x16baec)=>{const _0x40a0da=_0x56a9f9;return VisuMZ[_0x40a0da(0x8a2)](_0x16baec,'[',']');}),_0x5c3f77=_0x5c3f77[_0x56a9f9(0x678)](/<(.*?)>/g,(_0x6d2136,_0x3b6354)=>{const _0x37b8fb=_0x56a9f9;return VisuMZ[_0x37b8fb(0x8a2)](_0x3b6354,'<','>');}),_0x5c3f77=_0x5c3f77[_0x56a9f9(0x678)](/\{\{(.*?)\}\}/g,(_0x49fdf6,_0x1b38c2)=>{return VisuMZ['PreserveNumbers'](_0x1b38c2,'','');}),_0x5c3f77=_0x5c3f77[_0x56a9f9(0x678)](/(\d+\.?\d*)/g,(_0x50fd6e,_0x152e4f)=>{const _0x1faef8=_0x56a9f9;let _0xa8bf28=_0x152e4f;if(_0xa8bf28[0x0]==='0')return _0xa8bf28;if(_0xa8bf28[_0xa8bf28[_0x1faef8(0x7e5)]-0x1]==='.')return Number(_0xa8bf28)[_0x1faef8(0x629)](_0xb3e9c3,_0x398735)+'.';else return _0xa8bf28[_0xa8bf28[_0x1faef8(0x7e5)]-0x1]===','?Number(_0xa8bf28)[_0x1faef8(0x629)](_0xb3e9c3,_0x398735)+',':Number(_0xa8bf28)[_0x1faef8(0x629)](_0xb3e9c3,_0x398735);});let _0x5b0fb2=0x3;while(_0x5b0fb2--){_0x5c3f77=VisuMZ[_0x56a9f9(0x2c5)](_0x5c3f77);}return _0x5c3f77;},VisuMZ[_0x55d321(0x8a2)]=function(_0x1c1d43,_0x422788,_0x466ad8){const _0x2a4a02=_0x55d321;return _0x1c1d43=_0x1c1d43['replace'](/(\d)/gi,(_0x1ddba8,_0x25b8e8)=>_0x2a4a02(0x73d)['format'](Number(_0x25b8e8))),'%2%1%3'[_0x2a4a02(0x4a5)](_0x1c1d43,_0x422788,_0x466ad8);},VisuMZ['RevertPreserveNumbers']=function(_0x2a0d99){const _0x4af0ab=_0x55d321;return _0x2a0d99=_0x2a0d99[_0x4af0ab(0x678)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x29d774,_0x9fcc14)=>Number(parseInt(_0x9fcc14))),_0x2a0d99;},VisuMZ[_0x55d321(0x1ba)]=function(_0x5608f6){const _0x182196=_0x55d321;SoundManager['playOk']();if(!Utils[_0x182196(0x2dc)]()){const _0x346442=window[_0x182196(0x8b9)](_0x5608f6,'_blank');}else{const _0x544f8f=process['platform']=='darwin'?'open':process[_0x182196(0x43c)]==_0x182196(0x2d2)?_0x182196(0x7b6):'xdg-open';require(_0x182196(0x5a8))[_0x182196(0x787)](_0x544f8f+'\x20'+_0x5608f6);}},VisuMZ[_0x55d321(0x3c2)]=function(_0x57a634,_0x4cc32e){const _0x3b841d=_0x55d321;if(!_0x57a634)return'';const _0x2aa2e2=_0x57a634['baseId']||_0x57a634['id'];let _0x2be5d2='';return _0x57a634[_0x3b841d(0x7b5)]!==undefined&&_0x57a634[_0x3b841d(0x762)]!==undefined&&(_0x2be5d2=_0x3b841d(0x64f)[_0x3b841d(0x4a5)](_0x2aa2e2,_0x4cc32e)),_0x57a634[_0x3b841d(0x3dc)]!==undefined&&_0x57a634[_0x3b841d(0x566)]!==undefined&&(_0x2be5d2=_0x3b841d(0x923)['format'](_0x2aa2e2,_0x4cc32e)),_0x57a634['stypeId']!==undefined&&_0x57a634[_0x3b841d(0x241)]!==undefined&&(_0x2be5d2=_0x3b841d(0x3d6)[_0x3b841d(0x4a5)](_0x2aa2e2,_0x4cc32e)),_0x57a634[_0x3b841d(0x8f8)]!==undefined&&_0x57a634[_0x3b841d(0x154)]!==undefined&&(_0x2be5d2='Item-%1-%2'['format'](_0x2aa2e2,_0x4cc32e)),_0x57a634[_0x3b841d(0x35a)]!==undefined&&_0x57a634[_0x3b841d(0x676)]===0x1&&(_0x2be5d2=_0x3b841d(0x1a3)[_0x3b841d(0x4a5)](_0x2aa2e2,_0x4cc32e)),_0x57a634[_0x3b841d(0x192)]!==undefined&&_0x57a634[_0x3b841d(0x676)]>0x1&&(_0x2be5d2=_0x3b841d(0x908)[_0x3b841d(0x4a5)](_0x2aa2e2,_0x4cc32e)),_0x57a634['dropItems']!==undefined&&_0x57a634[_0x3b841d(0x56b)]!==undefined&&(_0x2be5d2=_0x3b841d(0x224)[_0x3b841d(0x4a5)](_0x2aa2e2,_0x4cc32e)),_0x57a634[_0x3b841d(0x7ac)]!==undefined&&_0x57a634[_0x3b841d(0x590)]!==undefined&&(_0x2be5d2='State-%1-%2'[_0x3b841d(0x4a5)](_0x2aa2e2,_0x4cc32e)),_0x2be5d2;},Window_Base[_0x55d321(0x2a8)]['processDrawIcon']=function(_0x46dd51,_0x14201c){const _0x5317de=_0x55d321,_0xbc09a4=ImageManager['standardIconWidth']||0x20,_0x428883=ImageManager[_0x5317de(0x509)]||0x20;if(_0x14201c[_0x5317de(0x340)]){const _0xa3539d=_0xbc09a4-ImageManager[_0x5317de(0x375)],_0x2b4b47=_0x428883-ImageManager[_0x5317de(0x8b0)];let _0x208b82=0x2,_0x22f255=0x2;this[_0x5317de(0x4e0)]()!==0x24&&(_0x22f255=Math[_0x5317de(0x33d)]((this[_0x5317de(0x4e0)]()-_0x428883)/0x2));const _0x22b203=_0x14201c['x']+Math[_0x5317de(0x33d)](_0xa3539d/0x2)+_0x208b82,_0x386a28=_0x14201c['y']+Math['floor'](_0x2b4b47/0x2)+_0x22f255;this['drawIcon'](_0x46dd51,_0x22b203,_0x386a28);}_0x14201c['x']+=_0xbc09a4+0x4;},Window_StatusBase[_0x55d321(0x2a8)][_0x55d321(0x309)]=function(_0x25858d,_0x3d3f6e,_0x48f37f,_0x10e25e){const _0x9f8ec1=_0x55d321;_0x10e25e=_0x10e25e||0x90;const _0x116305=ImageManager[_0x9f8ec1(0x460)]||0x20,_0xd72982=ImageManager[_0x9f8ec1(0x509)]||0x20,_0x3c672e=_0x116305-ImageManager[_0x9f8ec1(0x375)],_0x2ee7da=_0xd72982-ImageManager['iconHeight'],_0x83ab46=_0x116305,_0xadd9b3=_0x25858d[_0x9f8ec1(0x888)]()[_0x9f8ec1(0x365)](0x0,Math[_0x9f8ec1(0x33d)](_0x10e25e/_0x83ab46));let _0xf58880=_0x3d3f6e+Math[_0x9f8ec1(0x74b)](_0x3c672e/0x2),_0x566143=_0x48f37f+Math[_0x9f8ec1(0x74b)](_0x2ee7da/0x2);for(const _0x599f1a of _0xadd9b3){this[_0x9f8ec1(0x837)](_0x599f1a,_0xf58880,_0x566143),_0xf58880+=_0x83ab46;}},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x21e)]=function(){const _0x1e8112=_0x55d321;return this[_0x1e8112(0x253)];},VisuMZ['CoreEngine']['Game_Picture_initBasic']=Game_Picture['prototype']['initBasic'],Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x325)]=function(){const _0x368815=_0x55d321;VisuMZ['CoreEngine'][_0x368815(0x827)]['call'](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x368815(0x69a)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x55d321(0x2fe)]=Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x666)],Game_Picture[_0x55d321(0x2a8)]['updateMove']=function(){const _0x139b15=_0x55d321;this[_0x139b15(0x7d6)]();const _0x4231c8=this[_0x139b15(0x7cf)];VisuMZ[_0x139b15(0x886)][_0x139b15(0x2fe)]['call'](this),_0x4231c8>0x0&&this[_0x139b15(0x7cf)]<=0x0&&(this['_x']=this[_0x139b15(0x627)],this['_y']=this[_0x139b15(0x65d)],this['_scaleX']=this['_targetScaleX'],this[_0x139b15(0x7ff)]=this[_0x139b15(0x7b3)],this[_0x139b15(0x1d7)]=this[_0x139b15(0x849)],this[_0x139b15(0x253)]&&(this[_0x139b15(0x253)]['x']=this[_0x139b15(0x69a)]['x'],this['_anchor']['y']=this[_0x139b15(0x69a)]['y']));},VisuMZ['CoreEngine'][_0x55d321(0x5e6)]=Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x4ce)],Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x4ce)]=function(_0x1d183a,_0x405f9d,_0x441ce3,_0x1285e6,_0xbf04ab,_0x23a413,_0x417e1a,_0x10b4e0){const _0x2fed0e=_0x55d321;VisuMZ[_0x2fed0e(0x886)][_0x2fed0e(0x5e6)]['call'](this,_0x1d183a,_0x405f9d,_0x441ce3,_0x1285e6,_0xbf04ab,_0x23a413,_0x417e1a,_0x10b4e0),this[_0x2fed0e(0x35c)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x405f9d]||{'x':0x0,'y':0x0});},VisuMZ[_0x55d321(0x886)][_0x55d321(0x322)]=Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x245)],Game_Picture['prototype'][_0x55d321(0x245)]=function(_0x221f23,_0x5e88de,_0x3da505,_0xe1382a,_0x9927ae,_0x1f04fa,_0x45b15f,_0x159898,_0x4c6739){const _0x13de94=_0x55d321;VisuMZ['CoreEngine'][_0x13de94(0x322)][_0x13de94(0x2b5)](this,_0x221f23,_0x5e88de,_0x3da505,_0xe1382a,_0x9927ae,_0x1f04fa,_0x45b15f,_0x159898,_0x4c6739),this[_0x13de94(0x18f)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x221f23]||{'x':0x0,'y':0x0});},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x7d6)]=function(){const _0x337903=_0x55d321;this[_0x337903(0x7cf)]>0x0&&(this[_0x337903(0x253)]['x']=this['applyEasing'](this[_0x337903(0x253)]['x'],this[_0x337903(0x69a)]['x']),this[_0x337903(0x253)]['y']=this[_0x337903(0x924)](this[_0x337903(0x253)]['y'],this[_0x337903(0x69a)]['y']));},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x35c)]=function(_0xf81104){const _0x21fc07=_0x55d321;this['_anchor']=_0xf81104,this['_targetAnchor']=JsonEx['makeDeepCopy'](this[_0x21fc07(0x253)]);},Game_Picture[_0x55d321(0x2a8)][_0x55d321(0x18f)]=function(_0x2b4deb){this['_targetAnchor']=_0x2b4deb;},VisuMZ['CoreEngine'][_0x55d321(0x75a)]=Sprite_Picture[_0x55d321(0x2a8)]['updateOrigin'],Sprite_Picture[_0x55d321(0x2a8)]['updateOrigin']=function(){const _0x466a0c=_0x55d321,_0x2b2cd3=this[_0x466a0c(0x171)]();!_0x2b2cd3['anchor']()?VisuMZ[_0x466a0c(0x886)][_0x466a0c(0x75a)][_0x466a0c(0x2b5)](this):(this[_0x466a0c(0x21e)]['x']=_0x2b2cd3[_0x466a0c(0x21e)]()['x'],this[_0x466a0c(0x21e)]['y']=_0x2b2cd3['anchor']()['y']);},Game_Action[_0x55d321(0x2a8)][_0x55d321(0x805)]=function(_0x34d1e3){const _0x33b78d=_0x55d321;if(_0x34d1e3){const _0x2672fb=_0x34d1e3[_0x33b78d(0x2f0)];if(_0x2672fb===0x1&&this['subject']()[_0x33b78d(0x367)]()!==0x1)this[_0x33b78d(0x61a)]();else _0x2672fb===0x2&&this['subject']()['guardSkillId']()!==0x2?this['setGuard']():this[_0x33b78d(0x92c)](_0x2672fb);}else this[_0x33b78d(0x75d)]();},Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x58f)]=function(){const _0x33f2a1=_0x55d321;return this[_0x33f2a1(0x36d)]()[_0x33f2a1(0x4c9)](_0x385c9b=>this[_0x33f2a1(0x4b7)](_0x385c9b)&&this[_0x33f2a1(0x4dc)]()[_0x33f2a1(0x1bb)](_0x385c9b[_0x33f2a1(0x59a)]));},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x7f7)]=function(){const _0x355b3b=_0x55d321;this['_dimmerSprite']=new Sprite(),this[_0x355b3b(0x209)][_0x355b3b(0x5de)]=new Bitmap(0x0,0x0),this[_0x355b3b(0x209)]['x']=0x0,this[_0x355b3b(0x2a9)](this[_0x355b3b(0x209)]);},Window_Base[_0x55d321(0x2a8)][_0x55d321(0x66d)]=function(){const _0x48356b=_0x55d321;if(this[_0x48356b(0x209)]){const _0x2f4e19=this['_dimmerSprite'][_0x48356b(0x5de)],_0x2e1ede=this[_0x48356b(0x85f)],_0x26c06b=this[_0x48356b(0x48d)],_0x5a6008=this[_0x48356b(0x335)],_0xd8fc1=ColorManager[_0x48356b(0x58d)](),_0xe5a71e=ColorManager[_0x48356b(0x885)]();_0x2f4e19['resize'](_0x2e1ede,_0x26c06b),_0x2f4e19[_0x48356b(0x3ff)](0x0,0x0,_0x2e1ede,_0x5a6008,_0xe5a71e,_0xd8fc1,!![]),_0x2f4e19[_0x48356b(0x3d1)](0x0,_0x5a6008,_0x2e1ede,_0x26c06b-_0x5a6008*0x2,_0xd8fc1),_0x2f4e19[_0x48356b(0x3ff)](0x0,_0x26c06b-_0x5a6008,_0x2e1ede,_0x5a6008,_0xd8fc1,_0xe5a71e,!![]),this['_dimmerSprite'][_0x48356b(0x1bc)](0x0,0x0,_0x2e1ede,_0x26c06b);}},Game_Actor[_0x55d321(0x2a8)][_0x55d321(0x235)]=function(){const _0x43c182=_0x55d321;for(let _0x43141c=0x0;_0x43141c<this[_0x43c182(0x50e)]();_0x43141c++){const _0x42c123=this[_0x43c182(0x905)]();let _0x3d00f8=Number['MIN_SAFE_INTEGER'];this['setAction'](_0x43141c,_0x42c123[0x0]);for(const _0x1dd49a of _0x42c123){const _0x4e7ae1=_0x1dd49a[_0x43c182(0x6f8)]();_0x4e7ae1>_0x3d00f8&&(_0x3d00f8=_0x4e7ae1,this['setAction'](_0x43141c,_0x1dd49a));}}this['setActionState']('waiting');},Window_BattleItem[_0x55d321(0x2a8)][_0x55d321(0x293)]=function(_0x5613b2){const _0xcc86a4=_0x55d321;return BattleManager['actor']()?BattleManager[_0xcc86a4(0x68e)]()[_0xcc86a4(0x4b7)](_0x5613b2):Window_ItemList[_0xcc86a4(0x2a8)][_0xcc86a4(0x293)][_0xcc86a4(0x2b5)](this,_0x5613b2);},VisuMZ['CoreEngine'][_0x55d321(0x30f)]=Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x404)],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x404)]=function(){const _0x1a6b3f=_0x55d321;VisuMZ['CoreEngine'][_0x1a6b3f(0x30f)][_0x1a6b3f(0x2b5)](this);const _0x26fdea=this[_0x1a6b3f(0x64d)][_0x1a6b3f(0x4ac)];if(_0x26fdea)this['addChild'](_0x26fdea);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x43b)]=Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x404)],Scene_Battle[_0x55d321(0x2a8)][_0x55d321(0x404)]=function(){const _0x3b4069=_0x55d321;VisuMZ[_0x3b4069(0x886)][_0x3b4069(0x43b)][_0x3b4069(0x2b5)](this);const _0xe3baaf=this[_0x3b4069(0x64d)][_0x3b4069(0x4ac)];if(_0xe3baaf)this[_0x3b4069(0x7af)](_0xe3baaf);},Sprite_Actor[_0x55d321(0x2a8)]['update']=function(){const _0x29809d=_0x55d321;Sprite_Battler[_0x29809d(0x2a8)]['update']['call'](this),this[_0x29809d(0x57e)]();if(this['_actor'])this[_0x29809d(0x4af)]();else this[_0x29809d(0x7ee)]!==''&&(this[_0x29809d(0x7ee)]='');},Window[_0x55d321(0x2a8)][_0x55d321(0x603)]=function(){const _0x1b1dbc=_0x55d321,_0x4a11f2=this[_0x1b1dbc(0x37a)],_0x387608=this[_0x1b1dbc(0x72a)],_0x386c42=0x18,_0x274e28=_0x386c42/0x2,_0x2eadb0=0x60+_0x386c42,_0xd6c260=0x0+_0x386c42;this[_0x1b1dbc(0x7bb)][_0x1b1dbc(0x5de)]=this['_windowskin'],this[_0x1b1dbc(0x7bb)]['anchor']['x']=0.5,this[_0x1b1dbc(0x7bb)][_0x1b1dbc(0x21e)]['y']=0.5,this[_0x1b1dbc(0x7bb)][_0x1b1dbc(0x1bc)](_0x2eadb0+_0x274e28,_0xd6c260+_0x274e28+_0x386c42,_0x386c42,_0x274e28),this[_0x1b1dbc(0x7bb)][_0x1b1dbc(0x245)](Math[_0x1b1dbc(0x69f)](_0x4a11f2/0x2),Math[_0x1b1dbc(0x69f)](_0x387608-_0x274e28)),this[_0x1b1dbc(0x3cd)]['bitmap']=this[_0x1b1dbc(0x549)],this[_0x1b1dbc(0x3cd)][_0x1b1dbc(0x21e)]['x']=0.5,this['_upArrowSprite'][_0x1b1dbc(0x21e)]['y']=0.5,this['_upArrowSprite'][_0x1b1dbc(0x1bc)](_0x2eadb0+_0x274e28,_0xd6c260,_0x386c42,_0x274e28),this[_0x1b1dbc(0x3cd)]['move'](Math[_0x1b1dbc(0x69f)](_0x4a11f2/0x2),Math['round'](_0x274e28));},Window['prototype']['_refreshPauseSign']=function(){const _0xef5d7d=_0x55d321,_0x1e50ab=0x90,_0x5b9e9e=0x60,_0x35a3b4=0x18;this[_0xef5d7d(0x2ac)][_0xef5d7d(0x5de)]=this[_0xef5d7d(0x549)],this['_pauseSignSprite'][_0xef5d7d(0x21e)]['x']=0.5,this[_0xef5d7d(0x2ac)][_0xef5d7d(0x21e)]['y']=0x1,this[_0xef5d7d(0x2ac)][_0xef5d7d(0x245)](Math[_0xef5d7d(0x69f)](this[_0xef5d7d(0x37a)]/0x2),this['_height']),this[_0xef5d7d(0x2ac)][_0xef5d7d(0x1bc)](_0x1e50ab,_0x5b9e9e,_0x35a3b4,_0x35a3b4),this[_0xef5d7d(0x2ac)]['alpha']=0xff;},Window[_0x55d321(0x2a8)]['_updateFilterArea']=function(){const _0x556d01=_0x55d321,_0x34fd03=this[_0x556d01(0x819)][_0x556d01(0x3e7)][_0x556d01(0x8d9)](new Point(0x0,0x0)),_0x4ad3e1=this[_0x556d01(0x819)][_0x556d01(0x6da)];_0x4ad3e1['x']=_0x34fd03['x']+this['origin']['x'],_0x4ad3e1['y']=_0x34fd03['y']+this[_0x556d01(0x5f6)]['y'],_0x4ad3e1['width']=Math[_0x556d01(0x74b)](this[_0x556d01(0x502)]*this['scale']['x']),_0x4ad3e1[_0x556d01(0x48d)]=Math[_0x556d01(0x74b)](this['innerHeight']*this['scale']['y']);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x803)]=Window[_0x55d321(0x2a8)][_0x55d321(0x2e3)],Window[_0x55d321(0x2a8)][_0x55d321(0x2e3)]=function(){const _0x519383=_0x55d321,_0x30e657=VisuMZ[_0x519383(0x886)][_0x519383(0x530)]['Window'][_0x519383(0x492)]??!![];if(!_0x30e657)return VisuMZ[_0x519383(0x886)][_0x519383(0x803)][_0x519383(0x2b5)](this);const _0x4415a1=this['_margin'],_0x83debb=Math[_0x519383(0x548)](0x0,this[_0x519383(0x37a)]-_0x4415a1*0x2),_0x4d4c83=Math['max'](0x0,this[_0x519383(0x72a)]-_0x4415a1*0x2),_0x4833e8=this[_0x519383(0x71d)],_0x3e5419=_0x4833e8[_0x519383(0x843)][0x0];_0x4833e8['bitmap']=this[_0x519383(0x549)],_0x4833e8[_0x519383(0x1bc)](0x0,0x0,0x60,0x60),_0x4833e8[_0x519383(0x245)](_0x4415a1,_0x4415a1),_0x4833e8[_0x519383(0x601)]['x']=_0x83debb/0x60,_0x4833e8[_0x519383(0x601)]['y']=_0x4d4c83/0x60,_0x3e5419[_0x519383(0x5de)]=this[_0x519383(0x549)],_0x3e5419[_0x519383(0x1bc)](0x0,0x60,0x60,0x60),_0x3e5419[_0x519383(0x245)](0x0,0x0,_0x83debb,_0x4d4c83),_0x3e5419['scale']['x']=0x1/_0x4833e8[_0x519383(0x601)]['x'],_0x3e5419['scale']['y']=0x1/_0x4833e8[_0x519383(0x601)]['y'],_0x4833e8[_0x519383(0x7dc)](this[_0x519383(0x2e9)]);},Game_Temp[_0x55d321(0x2a8)][_0x55d321(0x70b)]=function(){const _0x3ff93a=_0x55d321;this[_0x3ff93a(0x561)]=[],this[_0x3ff93a(0x40b)]=[],this[_0x3ff93a(0x307)]=[],this['_balloonQueue']=[];},VisuMZ['CoreEngine'][_0x55d321(0x441)]=Scene_Base[_0x55d321(0x2a8)]['terminate'],Scene_Base[_0x55d321(0x2a8)][_0x55d321(0x7b9)]=function(){const _0x4d9b99=_0x55d321;if($gameTemp)$gameTemp[_0x4d9b99(0x70b)]();VisuMZ[_0x4d9b99(0x886)]['Scene_Base_terminateAnimationClearBugFix'][_0x4d9b99(0x2b5)](this);},Bitmap[_0x55d321(0x2a8)][_0x55d321(0x8ea)]=function(_0x88ca19){const _0x396152=_0x55d321,_0x4cb0d0=this[_0x396152(0x831)];_0x4cb0d0['save'](),_0x4cb0d0['font']=this['_makeFontNameText']();const _0x1c5ded=_0x4cb0d0[_0x396152(0x8b7)](_0x88ca19)[_0x396152(0x85f)];return _0x4cb0d0[_0x396152(0x8c7)](),_0x1c5ded;},Window_Message[_0x55d321(0x2a8)][_0x55d321(0x734)]=function(_0x135764){const _0x5650bf=_0x55d321;return this[_0x5650bf(0x1e1)]()?this[_0x5650bf(0x6f7)][_0x5650bf(0x8ea)](_0x135764):Window_Base[_0x5650bf(0x2a8)][_0x5650bf(0x734)]['call'](this,_0x135764);},Window_Message[_0x55d321(0x2a8)][_0x55d321(0x1e1)]=function(){const _0x3fa80f=_0x55d321;return VisuMZ[_0x3fa80f(0x886)]['Settings'][_0x3fa80f(0x6f5)][_0x3fa80f(0x85a)]??!![];},VisuMZ[_0x55d321(0x886)]['Game_Action_numRepeats']=Game_Action[_0x55d321(0x2a8)][_0x55d321(0x71c)],Game_Action['prototype'][_0x55d321(0x71c)]=function(){const _0x18471a=_0x55d321;return this[_0x18471a(0x86c)]()?VisuMZ[_0x18471a(0x886)]['Game_Action_numRepeats'][_0x18471a(0x2b5)](this):0x0;},VisuMZ[_0x55d321(0x886)]['Game_Action_setAttack']=Game_Action['prototype'][_0x55d321(0x61a)],Game_Action[_0x55d321(0x2a8)][_0x55d321(0x61a)]=function(){const _0x3fba14=_0x55d321;if(this[_0x3fba14(0x222)]()&&this['subject']()['canAttack']())VisuMZ['CoreEngine'][_0x3fba14(0x5f0)][_0x3fba14(0x2b5)](this);else BattleManager[_0x3fba14(0x4fd)]?VisuMZ[_0x3fba14(0x886)][_0x3fba14(0x5f0)][_0x3fba14(0x2b5)](this):this[_0x3fba14(0x75d)]();},VisuMZ[_0x55d321(0x886)]['BattleManager_invokeCounterAttack']=BattleManager[_0x55d321(0x6c5)],BattleManager['invokeCounterAttack']=function(_0x3f24ab,_0x36d51d){const _0x100f71=_0x55d321;this['_bypassCanCounterCheck']=!![],VisuMZ['CoreEngine']['BattleManager_invokeCounterAttack'][_0x100f71(0x2b5)](this,_0x3f24ab,_0x36d51d),this[_0x100f71(0x4fd)]=undefined;},Sprite_Name['prototype'][_0x55d321(0x687)]=function(){return 0x24;},Sprite_Name[_0x55d321(0x2a8)][_0x55d321(0x3a6)]=function(){const _0x432e44=_0x55d321,_0x55bb20=this['name'](),_0x1738a0=this[_0x432e44(0x5d4)](),_0x4c3f25=this[_0x432e44(0x687)]();this['setupFont'](),this[_0x432e44(0x5de)][_0x432e44(0x75d)](),this['bitmap'][_0x432e44(0x5ca)](_0x55bb20,0x4,0x0,_0x1738a0-0xa,_0x4c3f25,_0x432e44(0x2a2));},Bitmap[_0x55d321(0x2a8)]['drawTextTopAligned']=function(_0x167a21,_0x28e17e,_0x18bb09,_0x335286,_0x528efb,_0x3d3d0e){const _0x3f9314=_0x55d321,_0x4d0cfe=this[_0x3f9314(0x831)],_0x5238b9=_0x4d0cfe[_0x3f9314(0x7ef)];_0x335286=_0x335286||0xffffffff;let _0x18d5ee=_0x28e17e,_0x2190d3=Math[_0x3f9314(0x69f)](_0x18bb09+0x18/0x2+this[_0x3f9314(0x2d7)]*0.35);_0x3d3d0e===_0x3f9314(0x72b)&&(_0x18d5ee+=_0x335286/0x2),_0x3d3d0e===_0x3f9314(0x649)&&(_0x18d5ee+=_0x335286),_0x4d0cfe['save'](),_0x4d0cfe[_0x3f9314(0x4fb)]=this[_0x3f9314(0x4db)](),_0x4d0cfe[_0x3f9314(0x5e1)]=_0x3d3d0e,_0x4d0cfe[_0x3f9314(0x72c)]=_0x3f9314(0x7d2),_0x4d0cfe[_0x3f9314(0x7ef)]=0x1,this[_0x3f9314(0x6b5)](_0x167a21,_0x18d5ee,_0x2190d3,_0x335286),_0x4d0cfe['globalAlpha']=_0x5238b9,this['_drawTextBody'](_0x167a21,_0x18d5ee,_0x2190d3,_0x335286),_0x4d0cfe['restore'](),this[_0x3f9314(0x1ce)][_0x3f9314(0x264)]();},VisuMZ[_0x55d321(0x886)]['BattleManager_checkSubstitute']=BattleManager['checkSubstitute'],BattleManager[_0x55d321(0x4e7)]=function(_0x4b5cf3){const _0xc65e4e=_0x55d321;if(this[_0xc65e4e(0x7ae)]&&this[_0xc65e4e(0x7ae)]['isActor']()===_0x4b5cf3[_0xc65e4e(0x46f)]())return![];return VisuMZ[_0xc65e4e(0x886)]['BattleManager_checkSubstitute'][_0xc65e4e(0x2b5)](this,_0x4b5cf3);},BattleManager['endAction']=function(){const _0x342dfc=_0x55d321;if(this[_0x342dfc(0x7ae)])this[_0x342dfc(0x773)][_0x342dfc(0x38c)](this['_subject']);this[_0x342dfc(0x8ca)]='turn',this[_0x342dfc(0x7ae)]&&this[_0x342dfc(0x7ae)][_0x342dfc(0x50e)]()===0x0&&(this['endBattlerActions'](this[_0x342dfc(0x7ae)]),this[_0x342dfc(0x7ae)]=null);},Bitmap[_0x55d321(0x2a8)][_0x55d321(0x1c3)]=function(){const _0x5c88b7=_0x55d321;this[_0x5c88b7(0x18b)]=new Image(),this[_0x5c88b7(0x18b)][_0x5c88b7(0x6ca)]=this[_0x5c88b7(0x602)]['bind'](this),this[_0x5c88b7(0x18b)][_0x5c88b7(0x41d)]=this[_0x5c88b7(0x626)]['bind'](this),this[_0x5c88b7(0x877)](),this[_0x5c88b7(0x750)]='loading',Utils[_0x5c88b7(0x5b9)]()?this[_0x5c88b7(0x1a6)]():(this[_0x5c88b7(0x18b)][_0x5c88b7(0x440)]=this[_0x5c88b7(0x74c)],![]&&this[_0x5c88b7(0x18b)][_0x5c88b7(0x85f)]>0x0&&(this['_image']['onload']=null,this[_0x5c88b7(0x602)]()));},Scene_Skill[_0x55d321(0x2a8)][_0x55d321(0x5e3)]=function(){const _0x426457=_0x55d321;Scene_MenuBase[_0x426457(0x2a8)]['onActorChange'][_0x426457(0x2b5)](this),this[_0x426457(0x1a9)](),this[_0x426457(0x342)][_0x426457(0x1e9)](),this[_0x426457(0x342)][_0x426457(0x182)](),this['_skillTypeWindow'][_0x426457(0x3c8)]();},Scene_Skill['prototype'][_0x55d321(0x278)]=function(){const _0x2dbdae=_0x55d321;return this[_0x2dbdae(0x40e)]&&this[_0x2dbdae(0x40e)][_0x2dbdae(0x448)];},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x4ec)]=function(_0x3a275d,_0x153a72,_0x120049){const _0x5ad411=_0x55d321,_0x42bdf2=this[_0x5ad411(0x294)](),_0x2d495c=this['allTiles'](_0x3a275d,_0x153a72);for(const _0x457f5c of _0x2d495c){const _0xc82a13=_0x42bdf2[_0x457f5c];if(_0xc82a13===undefined||_0xc82a13===null){if($gameTemp[_0x5ad411(0x25f)]()&&!DataManager[_0x5ad411(0x800)]()){let _0x3eee6a=_0x5ad411(0x8cd)+'\x0a';_0x3eee6a+=_0x5ad411(0x3fa)+'\x0a',_0x3eee6a+=_0x5ad411(0x69b);if(this[_0x5ad411(0x178)]())alert(_0x3eee6a),SceneManager[_0x5ad411(0x486)]();else{if(!this[_0x5ad411(0x5e2)])console[_0x5ad411(0x35d)](_0x3eee6a);this[_0x5ad411(0x5e2)]=!![];}}}if((_0xc82a13&0x10)!==0x0)continue;if((_0xc82a13&_0x120049)===0x0)return!![];if((_0xc82a13&_0x120049)===_0x120049)return![];}return![];},Game_Map[_0x55d321(0x2a8)][_0x55d321(0x178)]=function(){const _0x27f33a=_0x55d321;if(Imported[_0x27f33a(0x8b4)])return!![];if(Imported[_0x27f33a(0x370)])return!![];return![];},Sprite_Animation[_0x55d321(0x2a8)][_0x55d321(0x29a)]=function(_0x49fdcb){const _0xfc358=_0x55d321;!this[_0xfc358(0x510)]&&(this[_0xfc358(0x510)]=_0x49fdcb['gl']['getParameter'](_0x49fdcb['gl'][_0xfc358(0x18d)]));},VisuMZ['CoreEngine'][_0x55d321(0x1b3)]=Scene_Map['prototype'][_0x55d321(0x943)],Scene_Map[_0x55d321(0x2a8)][_0x55d321(0x943)]=function(){const _0x544e5a=_0x55d321,_0x551951=SceneManager[_0x544e5a(0x551)][_0x544e5a(0x7c4)];if([_0x544e5a(0x6d2),_0x544e5a(0x518),_0x544e5a(0x18e),_0x544e5a(0x16d)][_0x544e5a(0x1bb)](_0x551951))return![];return VisuMZ[_0x544e5a(0x886)][_0x544e5a(0x1b3)][_0x544e5a(0x2b5)](this);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x3b2)]=Window_SkillList[_0x55d321(0x2a8)]['includes'],Window_SkillList[_0x55d321(0x2a8)][_0x55d321(0x1bb)]=function(_0x380a2c){const _0x3e0d5f=_0x55d321;if(this[_0x3e0d5f(0x1d3)]<=0x0)return![];return VisuMZ[_0x3e0d5f(0x886)][_0x3e0d5f(0x3b2)][_0x3e0d5f(0x2b5)](this,_0x380a2c);},VisuMZ[_0x55d321(0x886)][_0x55d321(0x5a3)]=Game_Battler[_0x55d321(0x2a8)][_0x55d321(0x6e1)],Game_Battler[_0x55d321(0x2a8)]['initTpbChargeTime']=function(_0x567c00){const _0x1636a6=_0x55d321;VisuMZ[_0x1636a6(0x886)]['Game_Battler_initTpbChargeTime'][_0x1636a6(0x2b5)](this,_0x567c00),isNaN(this[_0x1636a6(0x79c)])&&(VisuMZ[_0x1636a6(0x886)][_0x1636a6(0x5a3)][_0x1636a6(0x2b5)](this,_0x567c00),isNaN(this[_0x1636a6(0x79c)])&&(this[_0x1636a6(0x79c)]=0x0));},Game_Battler['prototype'][_0x55d321(0x73a)]=function(){const _0x3170c4=_0x55d321;this[_0x3170c4(0x796)]===_0x3170c4(0x1f6)&&(this['_tpbChargeTime']+=this['tpbAcceleration'](),isNaN(this[_0x3170c4(0x79c)])&&(this[_0x3170c4(0x79c)]=this[_0x3170c4(0x212)](),isNaN(this[_0x3170c4(0x79c)])&&(this[_0x3170c4(0x79c)]=0x0)),this['_tpbChargeTime']>=0x1&&(this[_0x3170c4(0x79c)]=0x1,this[_0x3170c4(0x607)]()));};