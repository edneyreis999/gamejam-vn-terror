//=============================================================================
// VisuStella MZ - Message Keywords
// VisuMZ_3_MessageKeywords.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_MessageKeywords = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageKeywords = VisuMZ.MessageKeywords || {};
VisuMZ.MessageKeywords.version = 1.05;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.05] [MessageKeywords]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Keywords_VisuStella_MZ
 * @base VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Keyword support for the Message Window and any others
 * listed in the Plugin Parameters. By having Keyword support, the player can
 * hover their mouse cursor over the Keyword and a tooltip window will appear,
 * explaining further about the Keyword in question. This can be used in the
 * Message Window to explain lore, in the Help Window to go into detail about
 * more complex mechanics, and more!
 *
 * Features include all (but not limited to) the following:
 *
 * * Setup Keywords within the Plugin Parameters.
 * * Keywords determine how the Keyword marker will be replaced and what kind
 *   of text will be displayed in the tooltip window.
 * * Use Keywords to explain or remind the player about lore heavy topics.
 * * Keywords can be used to explain indepth mechanics inside Help Window.
 * * Alter the tooltip window's settings to your liking.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_1_MessageCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Here are the instructions on how to use this plugin.
 *
 * ---
 *
 * Step 1:
 *
 * - Open up the Plugin Parameters for this plugin.
 * - Open up the "Keyword List" Parameter list.
 * - Add your own or modify existing Keywords.
 *   - The "Keyword" is the Keyword Marker that will be referenced when using a
 *     Keyword inside of the Message Window or Help Window. Remember this.
 *   - The "Replacement Text" is the text that appears in place of the Keyword
 *     Marker. This can be used to color code or as a shortcut for Keywords.
 *     - Replacement text does not have to be exactly the same as the Keyword.
 *   - "Tooltip Text" is the text that appears inside the tooltip window when
 *     the player's mouse cursor hovers over the Keyword.
 * - Save your changes.
 *
 * ---
 *
 * Step 2:
 *
 * - Create a new "Show Message" event command or modify a database object's
 *   help "Description".
 * - Insert the Keyword Marker in the following format: ((Keyword))
 *   - Replace "Keyword" with the Keyword Marker mentioned in Step 1.
 *   - To use the default examples, you can type in ((Example)) or ((Ojima)).
 * - Save the changes.
 * - Go view them in game.
 * - Hover the mouse cursor over the specific Keywords and a tooltip window
 *   should appear.
 *
 * ---
 *
 * Tooltip window text does not support Word Wrap. It is simply disabled from
 * the very start so any Word Wrap text codes will not work with it.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_ElementStatusCore
 *
 * VisuMZ_1_ItemsEquipsCore
 *
 * VisuMZ_2_QuestSystem
 *
 * VisuMZ_3_MessageLog
 *
 * VisuMZ_3_VisualTextWindows
 *
 * - Custom windows provided by these plugins will have Keyword support as long
 * as their respective window names are listed in the Plugin Parameters.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin.
 *
 * === Keyword-Related Text Codes ===
 *
 * ---
 *
 * --------------------   -----------------------------------------------------
 * Text Code              Effect (Supported Message Windows)
 * --------------------   -----------------------------------------------------
 *
 * ((Keyword))            Replaces the "Keyword" Marker with the Replacement
 *                        Text found in the Message Keywords Plugin Parameters.
 *                        If the player hovers the mouse cursor over a Keyword,
 *                        a tooltip window will appear explaining about the
 *                        Keyword's lore and/or mechanics. The replacement text
 *                        and tooltip text can be modified inside the Message
 *                        Keywords Plugin Parameters.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyword List
 * ============================================================================
 *
 * This array governs the Keywords that are used for the game.
 *
 * ---
 *
 * Keyword List
 *
 *   Keyword Marker:
 *   - This is the marker used to determine the tooltip and any associated text
 *   - To use this inside the Message Window or Help Description, type out the
 *     following:
 *
 *     ((Keyword))
 *
 *     Where "Keyword" would be the Keyword Marker used. Case does not matter.
 *
 *   Replacement Text:
 *   - The text displayed as a replacement for the tooltip.
 *   - You may use text codes.
 *
 *   Tooltip Text:
 *   - The text displayed for this tooltip.
 *   - You may use text codes.
 *
 *   Cascades:
 *   - Used only for Window_Help Cascades.
 *   - Displays these additional keywords.
 *
 *     Cascade Family:
 *     - What is the name of this cascade family?
 *     - Same families won't have multiple cascades.
 *     - ie. Multiple cascades in the "Heal" cascade will won't display others.
 *     - If no family is used, its keyword will be its family name.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Settings for the Message Keyword Tooltips Window.
 *
 * ---
 *
 * Appearance
 *
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 *
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 *
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 *
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * Help Window Cascade
 *
 * Cascading tooltips will show all of the available keywords found in the
 * help window and list them off to the side to show off each tooltip at once.
 * This allows players to read keyword definitions without needing to utilize
 * touch inputs.
 *
 * **WARNING**: The more keywords you use per help description, the more
 * windows will appear on the screen. You need to keep this in mind as you
 * design your help description keywords as to not clutter the screen.
 *
 * **NOTE**: Cascades will not appear in Scene_Equip when the slot window is
 * currently active in order to make sure the slot items are visible and not
 * obscured. Hovering over keywords is still possible.
 *
 *   Enable Cascade?:
 *   - Enable Window_Help cascade tooltips?
 *   - Must be enabled to use.
 *
 *     Attach to Window?:
 *     - Attach cascade windows to Window_Help?
 *
 *   Activation Style:
 *   - What is the activation style you wish to use for cascading tooltips?
 *     - Always Activated
 *     - Shift Toggles On/Off
 *
 *     Default Toggle State:
 *     - What is the default toggle state if the shift toggle option is used?
 *
 *   Offset Position:
 *
 *     Offset X:
 *     - Offset the cascade X position?
 *     - Negative: left. Positive: right.
 *
 *     Offset Y:
 *     - Offset the cascade Y position?
 *     - Negative: up. Positive: down.
 *
 *   Move Animation:
 *
 *     Start X:
 *     - Starting offset cascade X position?
 *     - Negative: left. Positive: right.
 *
 *     Start Y:
 *     - Starting offset cascade Y position?
 *     - Negative: up. Positive: down.
 *
 *     Duration:
 *     - Duration to move cascading windows into position?
 *
 *   Toggle Button Prompt:
 *   - Requires VisuMZ_0_CoreEngine!
 *
 *     Prompt Format:
 *     - Prompt display for toggling cascade mode.
 *     - Requires VisuMZ_0_CoreEngine!
 *
 *     Scale:
 *     - Use a number between 0 and 1 to determine the scale.
 *     - 0 = 0%; 0.5 = 50%; 1.0 = 100%
 *
 *     Offset X:
 *     - Offset the cascade prompt X position?
 *     - Negative: left. Positive: right.
 *
 *     Offset Y:
 *     - Offset the cascade prompt Y position?
 *     - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Supported Windows
 * ============================================================================
 *
 * Message Keyword support will be provided to these windows.
 * Not every window is a valid candidate, however.
 *
 * ---
 *
 * Supported Windows
 *
 *   String:
 *   - Type in the constructor name of window you wish to add to the supported
 *     Window list.
 *   - Any windows not on the list will not support Keywords in the sense that
 *     tooltips will not appear. However, Keyword Markers can still be used to
 *     offer a quick shortcut to replacement text outside of tooltip windows.
 *   - Any of the windows listed here will have their refresh functions monkey
 *     patched via JavaScript to support Message Keywords.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 *
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 *
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Keyword List > Keyword > Cascades
 * **** Used only for Window_Help Cascades.
 * **** Displays these additional keywords.
 * *** Parameters > Tooltip Settings > Help Window Cascade
 * **** Cascading tooltips will show all of the available keywords found in the
 *      help window and list them off to the side to show off each tooltip at
 *      once. This allows players to read keyword definitions without needing
 *      to utilize touch inputs.
 *
 * Version 1.04: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon opening up the log window.
 *    Fix made by Irina.
 *
 * Version 1.03: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused games with a sleeping mouse on initialization to
 *    always trigger the tooltip window. Fix made by Arisu.
 *
 * Version 1.02: April 21, 2022
 * * Compatibility Update!
 * ** Added compatibility update with VisuMZ's Quest Journal System to not
 *    auto-clear the keyword tooltip window when tracking variables are being
 *    updated with the Quest Tracker open. Update made by Arisu.
 *
 * Version 1.01: February 24, 2022
 * * Feature Update!
 * ** Variables are now parsed before and after the parsing of keywords.
 *    Update made by Arisu.
 *
 * Version 1.00 Official Release Date: December 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageKeywords
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Keywords:arraystruct
 * @text Keyword List
 * @parent Keywords
 * @type struct<Keyword>[]
 * @desc This is a list of Keywords used for this plugin.
 * @default ["{\"Keyword:str\":\"Example\",\"Text:str\":\"\\\\c[5]Example\\\\c[0]\",\"Tooltip:json\":\"\\\"This is an example to show how \\\\\\\\c[5]Keywords\\\\\\\\c[0] work.\\\\n\\\\nBy typing \\\\\\\\c[6]((Example))\\\\\\\\c[0] in the \\\\\\\\c[4]Message Window\\\\\\\\c[0],\\\\nit creates an area that the player can hover\\\\nthe \\\\\\\\c[4]mouse\\\\\\\\c[0] over.\\\\n\\\\nOnce hovered, a \\\\\\\\c[4]tooltip\\\\\\\\c[0] will appear displaying\\\\nthis text.\\\"\"}","{\"Keyword:str\":\"Ojima\",\"Text:str\":\"\\\\c[6]Yoji Ojima\\\\c[0]\",\"Tooltip:json\":\"\\\"\\\\\\\\c[6]Yoji Ojima\\\\\\\\c[0] is the creator of many \\\\\\\\c[4]RPG Maker\\\\\\\\c[0] iterations\\\\nincluding \\\\\\\\c[4]RPG Maker MZ\\\\\\\\c[0]. Without him, \\\\\\\\c[4]RPG Maker\\\\\\\\c[0] as we\\\\nknow it would be completely different. \\\\\\\\c[4]RPG Maker MZ\\\\\\\\c[0]'s\\\\nbeautiful and clean core scripts is all thanks to this\\\\nvery talented individual.\\\"\"}"]
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Settings for the Message Keyword Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0","Cascade":"","EnableCascade:eval":"true","CascadeAttachHelp:eval":"true","CascadeActivation:str":"shift toggle","DefaultToggleState:eval":"false","CascadeOffset":"","CascadeOffsetX:num":"+0","CascadeOffsetY:num":"+0","CascadeMoveAni":"","CascadeStartX:num":"+128","CascadeStartY:num":"+0","CascadeDuration:num":"12","CascadeButtonPrompt":"Requires VisuMZ_0_CoreEngine!","CascadePromptFmt:str":"%1:Keywords","CascadePromptScale:num":"0.8","CascadePromptOffsetX:num":"+0","CascadePromptOffsetY:num":"+0"}
 *
 * @param SupportedWindows:arraystr
 * @text Supported Windows
 * @type string[]
 * @desc Message Keyword support will be provided to these windows.
 * Not every window is a valid candidate, however.
 * @default ["Window_Help","Window_SkillStatus","Window_EquipStatus","Window_Status","Window_ShopStatus","Window_Message","Window_NameBox","Window_StatusData","Window_QuestLog","Window_QuestTracker","Window_MessageLog","Window_VisualText"]
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
 * Keyword Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Keyword:
 *
 * @param Keyword:str
 * @text Keyword Marker
 * @desc This is the marker used to determine the tooltip and
 * any associated text.
 * @default Untitled
 *
 * @param Text:str
 * @text Replacement Text
 * @type str
 * @desc The text displayed as a replacement for the tooltip.
 * You may use text codes.
 * @default Untitled
 *
 * @param Tooltip:json
 * @text Tooltip Text
 * @type note
 * @desc The text displayed for this tooltip.
 * You may use text codes.
 * @default ""
 *
 * @param Cascades:arraystr
 * @text Cascades
 * @type string[]
 * @desc Used only for Window_Help Cascades.
 * Displays these additional keywords.
 * @default []
 *
 * @param CascadeFamily:str
 * @text Cascade Family
 * @parent Cascades:arraystr
 * @desc What is the name of this cascade family?
 * Same families won't have multiple cascades.
 * @default
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Cascade
 * @text Help Window Cascade
 *
 * @param EnableCascade:eval
 * @text Enable Cascade?
 * @parent Cascade
 * @type boolean
 * @on Enable
 * @off Don't Enable
 * @desc Enable Window_Help cascade tooltips?
 * @default true
 *
 * @param CascadeAttachHelp:eval
 * @text Attach Help Window?
 * @parent EnableCascade:eval
 * @type boolean
 * @on Attach
 * @off Don't Attach
 * @desc Attach cascade windows to Window_Help?
 * @default true
 *
 * @param CascadeActivation:str
 * @text Activation Style
 * @parent Cascade
 * @type select
 * @option Always Activated
 * @value always
 * @option Shift Toggles On/Off
 * @value shift toggle
 * @desc What is the activation style you wish to use for cascading tooltips?
 * @default shift toggle
 *
 * @param DefaultToggleState:eval
 * @text Default Toggle State
 * @parent CascadeActivation:str
 * @type boolean
 * @on On
 * @off Off
 * @desc What is the default toggle state if the shift toggle option is used?
 * @default false
 *
 * @param CascadeOffset
 * @text Offset Position
 * @parent Cascade
 *
 * @param CascadeOffsetX:num
 * @text Offset X
 * @parent CascadeOffset
 * @desc Offset the cascade X position?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param CascadeOffsetY:num
 * @text Offset Y
 * @parent CascadeOffset
 * @desc Offset the cascade Y position?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param CascadeMoveAni
 * @text Move Animation
 * @parent Cascade
 *
 * @param CascadeStartX:num
 * @text Start X
 * @parent CascadeMoveAni
 * @desc Starting offset cascade X position?
 * Negative: left. Positive: right.
 * @default +100
 *
 * @param CascadeStartY:num
 * @text Start Y
 * @parent CascadeMoveAni
 * @desc Starting offset cascade Y position?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param CascadeDuration:num
 * @text Duration
 * @parent CascadeMoveAni
 * @desc Duration to move cascading windows into position?
 * @default 12
 *
 * @param CascadeButtonPrompt
 * @text Toggle Button Prompt
 * @parent Cascade
 * @default Requires VisuMZ_0_CoreEngine!
 *
 * @param CascadePromptFmt:str
 * @text Prompt Format
 * @parent CascadeButtonPrompt
 * @desc Prompt display for toggling cascade mode.
 * Requires VisuMZ_0_CoreEngine!
 * @default %1:Keywords
 *
 * @param CascadePromptScale:num
 * @text Scale
 * @parent CascadeButtonPrompt
 * @desc Use a number between 0 and 1 to determine the scale.
 * 0 = 0%; 0.5 = 50%; 1.0 = 100%
 * @default 0.8
 *
 * @param CascadePromptOffsetX:num
 * @text Offset X
 * @parent CascadeButtonPrompt
 * @desc Offset the cascade prompt X position?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param CascadePromptOffsetY:num
 * @text Offset Y
 * @parent CascadeButtonPrompt
 * @desc Offset the cascade prompt Y position?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
//=============================================================================

function _0xd90d(_0x47c012, _0x2ace34) {
  const _0x29435e = _0x529b();
  return (
    (_0xd90d = function (_0x3a36fa, _0x461275) {
      _0x3a36fa = _0x3a36fa - (-0x3bf * -0x9 + -0xb4d + -0x72b * 0x3);
      let _0x2e7376 = _0x29435e[_0x3a36fa];
      return _0x2e7376;
    }),
    _0xd90d(_0x47c012, _0x2ace34)
  );
}
const _0x51e40e = _0xd90d;
(function (_0x2e6ce7, _0x5a0c21) {
  const _0x5d17c9 = _0xd90d,
    _0x33f9aa = _0x2e6ce7();
  while (!![]) {
    try {
      const _0x3e7cc4 =
        (-parseInt(_0x5d17c9(0x2b8)) / (-0x7 * 0x1eb + 0xbe8 + 0x186 * 0x1)) * (-parseInt(_0x5d17c9(0x22b)) / (0x1 * -0x197f + 0x5 * -0x63f + 0x2 * 0x1c5e)) +
        (-parseInt(_0x5d17c9(0x267)) / (0x659 * -0x1 + 0xf2f + 0x3 * -0x2f1)) * (parseInt(_0x5d17c9(0x165)) / (0x29 * 0x8 + 0x1 * -0x1f + -0x125 * 0x1)) +
        -parseInt(_0x5d17c9(0x169)) / (0x19f7 + -0x1906 + -0x4 * 0x3b) +
        (-parseInt(_0x5d17c9(0x29b)) / (-0x7 * 0x477 + -0x59f + 0x24e6)) * (parseInt(_0x5d17c9(0x1a1)) / (-0x13 * 0x1e + 0x25 * 0xe7 + -0x1f22)) +
        (parseInt(_0x5d17c9(0x265)) / (0x1682 + -0x56c * -0x1 + -0xdf3 * 0x2)) * (-parseInt(_0x5d17c9(0x1d1)) / (-0xd9 + -0x1ba9 + -0x1 * -0x1c8b)) +
        (-parseInt(_0x5d17c9(0x186)) / (0xc1 * 0xe + -0x4 * 0x715 + -0x13 * -0xf0)) * (-parseInt(_0x5d17c9(0x1c3)) / (0xcec * 0x2 + -0x215 * 0x12 + 0xbad)) +
        parseInt(_0x5d17c9(0x1a2)) / (-0x7b5 + 0x253a + 0x1 * -0x1d79);
      if (_0x3e7cc4 === _0x5a0c21) break;
      else _0x33f9aa['push'](_0x33f9aa['shift']());
    } catch (_0x53cb1a) {
      _0x33f9aa['push'](_0x33f9aa['shift']());
    }
  }
})(_0x529b, -0xce537 + 0x2 * -0x2c8fc + 0x1a36d6);
var label = 'MessageKey' + 'words',
  tier = tier || -0x754 * 0x2 + 0xe14 + 0x2 * 0x4a,
  dependencies = [_0x51e40e(0x178) + _0x51e40e(0x19e)],
  pluginData = $plugins[_0x51e40e(0x18b)](function (_0x223076) {
    const _0x3ebadb = _0x51e40e,
      _0x34adbd = {
        pSXtK: function (_0x523a34, _0x50f2d1) {
          return _0x523a34 + _0x50f2d1;
        },
      };
    return _0x223076[_0x3ebadb(0x2c5)] && _0x223076[_0x3ebadb(0x2bc) + 'n'][_0x3ebadb(0x12c)](_0x34adbd[_0x3ebadb(0x160)](_0x34adbd['pSXtK']('[', label), ']'));
  })[0x47 * -0x6c + 0x11c * -0x1 + 0x4 * 0x7c4];
(VisuMZ[label][_0x51e40e(0x18f)] = VisuMZ[label]['Settings'] || {}),
  (VisuMZ[_0x51e40e(0x130) + _0x51e40e(0x25e)] = function (_0x5a434b, _0x3b031e) {
    const _0x7f1dfe = _0x51e40e,
      _0xe16de4 = {
        FSoHg: function (_0x5ee87a, _0x451b07) {
          return _0x5ee87a(_0x451b07);
        },
        jdKHb: _0x7f1dfe(0x1db),
        blrkN: function (_0x437c96, _0x1777a1) {
          return _0x437c96 !== _0x1777a1;
        },
        BWYMq: function (_0x26bc8f, _0x23664a) {
          return _0x26bc8f(_0x23664a);
        },
        nleJi: _0x7f1dfe(0x2e0),
        inNvj: _0x7f1dfe(0x128),
        qRfbP: function (_0x1bf1e7, _0x49bdcb) {
          return _0x1bf1e7(_0x49bdcb);
        },
        Omukm: _0x7f1dfe(0x154),
        zbUUV: _0x7f1dfe(0x201),
        WGsXP: _0x7f1dfe(0xea),
        qoKnR: _0x7f1dfe(0x28d),
        YUcLF: function (_0x2722ba, _0x2b84f5) {
          return _0x2722ba !== _0x2b84f5;
        },
        UbVyd: _0x7f1dfe(0x18a),
        LiGmQ: _0x7f1dfe(0x2a8),
        govPw: _0x7f1dfe(0x2e3),
        sRldC: function (_0x23ce38, _0x261ef5) {
          return _0x23ce38 !== _0x261ef5;
        },
        tcOzs: _0x7f1dfe(0x2ac),
        hyMLs: _0x7f1dfe(0x13f),
        zPEmz: function (_0x16747, _0x269ec2) {
          return _0x16747 !== _0x269ec2;
        },
        ypllN: _0x7f1dfe(0x206) + 'T',
        lBjBt: function (_0x59c262, _0x1b6b08) {
          return _0x59c262 !== _0x1b6b08;
        },
      };
    for (const _0x4632d8 in _0x3b031e) {
      if (_0x4632d8['match'](/(.*):(.*)/i)) {
        const _0x3d6203 = _0xe16de4['FSoHg'](String, RegExp['$1']),
          _0x507037 = _0xe16de4[_0x7f1dfe(0x223)](String, RegExp['$2'])['toUpperCas' + 'e']()[_0x7f1dfe(0x15c)]();
        let _0xee885c, _0x5c3d95, _0x2576ef;
        switch (_0x507037) {
          case _0xe16de4[_0x7f1dfe(0x248)]:
            _0xee885c = _0xe16de4[_0x7f1dfe(0x2b1)](_0x3b031e[_0x4632d8], '') ? _0xe16de4[_0x7f1dfe(0x212)](Number, _0x3b031e[_0x4632d8]) : -0x639 + 0x108c + -0xa53;
            break;
          case _0xe16de4[_0x7f1dfe(0x26d)]:
            (_0x5c3d95 = _0xe16de4[_0x7f1dfe(0x2b1)](_0x3b031e[_0x4632d8], '') ? JSON[_0x7f1dfe(0x21a)](_0x3b031e[_0x4632d8]) : []), (_0xee885c = _0x5c3d95['map'](_0x30dd1b => Number(_0x30dd1b)));
            break;
          case _0xe16de4[_0x7f1dfe(0x166)]:
            _0xee885c = _0xe16de4['blrkN'](_0x3b031e[_0x4632d8], '') ? _0xe16de4['qRfbP'](eval, _0x3b031e[_0x4632d8]) : null;
            break;
          case _0xe16de4[_0x7f1dfe(0x103)]:
            (_0x5c3d95 = _0xe16de4[_0x7f1dfe(0x2b1)](_0x3b031e[_0x4632d8], '') ? JSON['parse'](_0x3b031e[_0x4632d8]) : []), (_0xee885c = _0x5c3d95[_0x7f1dfe(0x10a)](_0x50dc28 => eval(_0x50dc28)));
            break;
          case _0xe16de4[_0x7f1dfe(0x216)]:
            _0xee885c = _0xe16de4[_0x7f1dfe(0x2b1)](_0x3b031e[_0x4632d8], '') ? JSON[_0x7f1dfe(0x21a)](_0x3b031e[_0x4632d8]) : '';
            break;
          case _0xe16de4[_0x7f1dfe(0x1c7)]:
            (_0x5c3d95 = _0xe16de4[_0x7f1dfe(0x2b1)](_0x3b031e[_0x4632d8], '') ? JSON[_0x7f1dfe(0x21a)](_0x3b031e[_0x4632d8]) : []),
              (_0xee885c = _0x5c3d95[_0x7f1dfe(0x10a)](_0xb63cf0 => JSON[_0x7f1dfe(0x21a)](_0xb63cf0)));
            break;
          case _0xe16de4[_0x7f1dfe(0x2b4)]:
            _0xee885c = _0xe16de4[_0x7f1dfe(0x27a)](_0x3b031e[_0x4632d8], '') ? new Function(JSON['parse'](_0x3b031e[_0x4632d8])) : new Function(_0xe16de4[_0x7f1dfe(0x1c9)]);
            break;
          case _0xe16de4['LiGmQ']:
            (_0x5c3d95 = _0xe16de4[_0x7f1dfe(0x27a)](_0x3b031e[_0x4632d8], '') ? JSON['parse'](_0x3b031e[_0x4632d8]) : []),
              (_0xee885c = _0x5c3d95['map'](_0x47d43c => new Function(JSON[_0x7f1dfe(0x21a)](_0x47d43c))));
            break;
          case _0xe16de4[_0x7f1dfe(0x29d)]:
            _0xee885c = _0xe16de4[_0x7f1dfe(0x2ab)](_0x3b031e[_0x4632d8], '') ? _0xe16de4[_0x7f1dfe(0x223)](String, _0x3b031e[_0x4632d8]) : '';
            break;
          case _0xe16de4[_0x7f1dfe(0x1f1)]:
            (_0x5c3d95 = _0xe16de4[_0x7f1dfe(0x2b1)](_0x3b031e[_0x4632d8], '') ? JSON['parse'](_0x3b031e[_0x4632d8]) : []), (_0xee885c = _0x5c3d95['map'](_0x2e9868 => String(_0x2e9868)));
            break;
          case _0xe16de4[_0x7f1dfe(0x22c)]:
            (_0x2576ef = _0xe16de4[_0x7f1dfe(0x109)](_0x3b031e[_0x4632d8], '') ? JSON[_0x7f1dfe(0x21a)](_0x3b031e[_0x4632d8]) : {}),
              (_0xee885c = VisuMZ['ConvertPar' + _0x7f1dfe(0x25e)]({}, _0x2576ef));
            break;
          case _0xe16de4[_0x7f1dfe(0x27c)]:
            (_0x5c3d95 = _0xe16de4['lBjBt'](_0x3b031e[_0x4632d8], '') ? JSON[_0x7f1dfe(0x21a)](_0x3b031e[_0x4632d8]) : []),
              (_0xee885c = _0x5c3d95['map'](_0x2fced3 => VisuMZ['ConvertPar' + _0x7f1dfe(0x25e)]({}, JSON[_0x7f1dfe(0x21a)](_0x2fced3))));
            break;
          default:
            continue;
        }
        _0x5a434b[_0x3d6203] = _0xee885c;
      }
    }
    return _0x5a434b;
  }),
  (_0x2ade9e => {
    const _0x220f53 = _0x51e40e,
      _0x549b2c = {
        jXOsI: function (_0x3c06a7, _0x36206f) {
          return _0x3c06a7(_0x36206f);
        },
        SkUMv: _0x220f53(0xff) + 'ing\x20a\x20requ' + _0x220f53(0x2d2) + _0x220f53(0x13a) + _0x220f53(0x2b5) + _0x220f53(0x2c0) + _0x220f53(0x11a) + _0x220f53(0x1a7),
        tjstO: function (_0x14c2f8, _0x41450d) {
          return _0x14c2f8(_0x41450d);
        },
        rWHsU: function (_0x322515, _0x580576) {
          return _0x322515 !== _0x580576;
        },
        CrKpQ: function (_0x1b1e5e, _0x2941a5) {
          return _0x1b1e5e(_0x2941a5);
        },
        OEMjv: _0x220f53(0x209) + _0x220f53(0x226) + _0x220f53(0x28e) + _0x220f53(0xe9) + _0x220f53(0x259) + _0x220f53(0x17f) + _0x220f53(0x102) + _0x220f53(0x2df),
        iMvEP: function (_0xf101ec, _0x50253d) {
          return _0xf101ec < _0x50253d;
        },
        kZdAg: function (_0x37377a, _0x4dfc17) {
          return _0x37377a(_0x4dfc17);
        },
        XVpfQ:
          _0x220f53(0x26c) +
          _0x220f53(0x1d3) +
          _0x220f53(0x12a) +
          _0x220f53(0x10b) +
          _0x220f53(0x1ce) +
          _0x220f53(0x180) +
          _0x220f53(0x23f) +
          _0x220f53(0x221) +
          _0x220f53(0x2db) +
          _0x220f53(0x2ce) +
          _0x220f53(0x245) +
          _0x220f53(0x249) +
          _0x220f53(0x10b) +
          'ist\x20from\x20s' +
          _0x220f53(0x188) +
          _0x220f53(0x2b2) +
          _0x220f53(0x2d3) +
          's.',
      },
      _0x173470 = _0x2ade9e[_0x220f53(0x14e)];
    for (const _0x4e7c59 of dependencies) {
      if (!Imported[_0x4e7c59]) {
        _0x549b2c[_0x220f53(0x2c3)](alert, _0x549b2c[_0x220f53(0x2d9)][_0x220f53(0x2c1)](_0x173470, _0x4e7c59)), SceneManager[_0x220f53(0x159)]();
        break;
      }
    }
    const _0xb5ebae = _0x2ade9e[_0x220f53(0x2bc) + 'n'];
    if (_0xb5ebae[_0x220f53(0x1a8)](/\[Version[ ](.*?)\]/i)) {
      const _0x430e86 = _0x549b2c[_0x220f53(0x262)](Number, RegExp['$1']);
      _0x549b2c[_0x220f53(0x2e1)](_0x430e86, VisuMZ[label]['version']) &&
        (_0x549b2c[_0x220f53(0x1f0)](alert, _0x549b2c[_0x220f53(0x239)][_0x220f53(0x2c1)](_0x173470, _0x430e86)), SceneManager[_0x220f53(0x159)]());
    }
    if (_0xb5ebae['match'](/\[Tier[ ](\d+)\]/i)) {
      const _0x1bf061 = _0x549b2c['tjstO'](Number, RegExp['$1']);
      _0x549b2c[_0x220f53(0x2d8)](_0x1bf061, tier)
        ? (_0x549b2c[_0x220f53(0x290)](alert, _0x549b2c[_0x220f53(0xf0)][_0x220f53(0x2c1)](_0x173470, _0x1bf061, tier)), SceneManager[_0x220f53(0x159)]())
        : (tier = Math[_0x220f53(0x250)](_0x1bf061, tier));
    }
    VisuMZ[_0x220f53(0x130) + 'ams'](VisuMZ[label][_0x220f53(0x18f)], _0x2ade9e[_0x220f53(0x25d)]);
  })(pluginData),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x23a) + _0x51e40e(0x1f2) + _0x51e40e(0x1d4)] = Scene_Boot[_0x51e40e(0x155)][_0x51e40e(0x15d) + _0x51e40e(0x215)]),
  (Scene_Boot[_0x51e40e(0x155)][_0x51e40e(0x15d) + _0x51e40e(0x215)] = function () {
    const _0x713df5 = _0x51e40e;
    VisuMZ[_0x713df5(0xf1) + 'words'][_0x713df5(0x23a) + '_onDatabas' + 'eLoaded'][_0x713df5(0x158)](this), this[_0x713df5(0xfa) + _0x713df5(0x129) + _0x713df5(0x126)]();
  }),
  (Scene_Boot['prototype'][_0x51e40e(0xfa) + _0x51e40e(0x129) + _0x51e40e(0x126)] = function () {
    const _0x1ce47e = _0x51e40e;
    VisuMZ[_0x1ce47e(0xf1) + _0x1ce47e(0x113)][_0x1ce47e(0x220) + _0x1ce47e(0xf4)](), VisuMZ[_0x1ce47e(0xf1) + _0x1ce47e(0x113)]['CreateRefr' + 'eshPatches']();
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x279)] = {}),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x220) + 'ywords'] = function () {
    const _0x20c9b2 = _0x51e40e,
      _0x48c4a1 = {
        IOYog: function (_0x2f7ed5, _0x210d41) {
          return _0x2f7ed5 <= _0x210d41;
        },
        rkpqB: function (_0x544601, _0x40a77e) {
          return _0x544601 === _0x40a77e;
        },
        nNMWm: 'UNTITLED',
      };
    for (const _0x1418a9 of VisuMZ[_0x20c9b2(0xf1) + _0x20c9b2(0x113)][_0x20c9b2(0x18f)][_0x20c9b2(0x279)]) {
      if (!_0x1418a9) continue;
      if (!_0x1418a9[_0x20c9b2(0x21d)]) continue;
      if (_0x48c4a1[_0x20c9b2(0x237)](_0x1418a9[_0x20c9b2(0x21d)]['trim'](), 0x1b4 * 0x4 + 0xbc3 * -0x2 + 0x10b6)) continue;
      if (_0x48c4a1[_0x20c9b2(0x210)](_0x1418a9[_0x20c9b2(0x21d)]['toUpperCas' + 'e']()[_0x20c9b2(0x15c)](), _0x48c4a1[_0x20c9b2(0x14f)])) continue;
      (_0x1418a9[_0x20c9b2(0x21d)] = _0x1418a9[_0x20c9b2(0x21d)][_0x20c9b2(0x27f) + 'e']()[_0x20c9b2(0x15c)]()),
        (VisuMZ[_0x20c9b2(0xf1) + 'words']['Keywords'][_0x1418a9[_0x20c9b2(0x21d)]] = _0x1418a9);
    }
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x29a) + 'odeFmt'] =
    _0x51e40e(0x213) + _0x51e40e(0x277) + _0x51e40e(0x2d6) + _0x51e40e(0x2c6) + _0x51e40e(0x107) + '.MessageKe' + _0x51e40e(0x273) + _0x51e40e(0x120) + ';\x0a'),
  (VisuMZ[_0x51e40e(0xf1) + 'words'][_0x51e40e(0x15f) + _0x51e40e(0x24e)] = function () {
    const _0x3f643c = _0x51e40e,
      _0x1dffd3 = { exgmT: _0x3f643c(0x111) },
      _0x100601 = Window_MessageKeywordTooltip[_0x3f643c(0xf5) + _0x3f643c(0x24c)];
    for (const _0x436e48 of _0x100601) {
      if (window[_0x436e48] && window[_0x436e48][_0x3f643c(0x155)][_0x3f643c(0x2cb)]) {
        const _0x36fcf9 = _0x1dffd3[_0x3f643c(0x187)][_0x3f643c(0x2c1)](_0x436e48);
        VisuMZ['MessageKey' + _0x3f643c(0x113)][_0x36fcf9] = window[_0x436e48][_0x3f643c(0x155)][_0x3f643c(0x2cb)];
        const _0x4acc6e = VisuMZ[_0x3f643c(0xf1) + _0x3f643c(0x113)][_0x3f643c(0x29a) + _0x3f643c(0x14d)]['format'](_0x36fcf9);
        window[_0x436e48][_0x3f643c(0x155)]['refresh'] = new Function(_0x4acc6e);
      }
    }
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)]['Scene_Base' + _0x51e40e(0x2e4) + _0x51e40e(0x184)] = Scene_Base[_0x51e40e(0x155)][_0x51e40e(0x231) + _0x51e40e(0x118)]),
  (Scene_Base[_0x51e40e(0x155)][_0x51e40e(0x231) + _0x51e40e(0x118)] = function () {
    const _0x3b5fc3 = _0x51e40e;
    VisuMZ[_0x3b5fc3(0xf1) + _0x3b5fc3(0x113)][_0x3b5fc3(0x299) + _0x3b5fc3(0x2e4) + _0x3b5fc3(0x184)][_0x3b5fc3(0x158)](this),
      this[_0x3b5fc3(0x193) + _0x3b5fc3(0x157) + _0x3b5fc3(0x20f) + _0x3b5fc3(0x182)]();
  }),
  (Scene_Base[_0x51e40e(0x155)][_0x51e40e(0x193) + 'ageKeyword' + _0x51e40e(0x20f) + _0x51e40e(0x182)] = function () {
    const _0x13a414 = _0x51e40e;
    (this['_messageKe' + _0x13a414(0x1d6) + _0x13a414(0x10c)] = new Window_MessageKeywordTooltip()), this[_0x13a414(0x121)](this[_0x13a414(0x2de) + _0x13a414(0x1d6) + _0x13a414(0x10c)]);
  }),
  (Scene_Base[_0x51e40e(0x155)][_0x51e40e(0x193) + _0x51e40e(0x157) + _0x51e40e(0x258) + _0x51e40e(0x18d)] = function () {
    const _0xb7560e = _0x51e40e;
    if (this[_0xb7560e(0x202) + _0xb7560e(0x16f) + 'r']) return;
    (this[_0xb7560e(0x202) + _0xb7560e(0x145) + _0xb7560e(0x285)] = []), (this[_0xb7560e(0x202) + _0xb7560e(0x16f) + 'r'] = []);
  }),
  (Scene_Base[_0x51e40e(0x155)]['clearMessa' + 'geKeywordH' + _0x51e40e(0x11b) + _0x51e40e(0x21c)] = function () {
    const _0x1df13a = _0x51e40e,
      _0x3646bb = {
        XZdFJ: function (_0x2aa2e5, _0x1eeb75) {
          return _0x2aa2e5 === _0x1eeb75;
        },
      };
    if (_0x3646bb['XZdFJ'](this['_helpCasca' + _0x1df13a(0x16f) + 'r'], undefined)) return;
    for (const _0x1ad2e6 of this[_0x1df13a(0x202) + _0x1df13a(0x16f) + 'r']) {
      this['removeChil' + 'd'](_0x1ad2e6);
    }
    (this[_0x1df13a(0x202) + 'deKeywordF' + _0x1df13a(0x285)] = []), (this[_0x1df13a(0x202) + _0x1df13a(0x16f) + 'r'] = []);
  }),
  (Scene_Base[_0x51e40e(0x155)][_0x51e40e(0x1e1) + _0x51e40e(0x1f6) + _0x51e40e(0x2bf) + _0x51e40e(0x2bb)] = function (_0x57ff7f, _0x2d9b42, _0x1a68b3) {
    const _0xeee99 = _0x51e40e,
      _0x57e1ac = {
        rLnLd: function (_0x5e3e3c, _0x442d03) {
          return _0x5e3e3c > _0x442d03;
        },
      },
      _0xb9caf6 = VisuMZ[_0xeee99(0xf1) + _0xeee99(0x113)][_0xeee99(0x174) + 'FamilyName'](_0x57ff7f, _0x2d9b42);
    if (this[_0xeee99(0x202) + _0xeee99(0x145) + _0xeee99(0x285)][_0xeee99(0x12c)](_0xb9caf6)) return;
    const _0x585ed5 = VisuMZ[_0xeee99(0xf1) + _0xeee99(0x113)][_0xeee99(0x279)][_0x2d9b42[_0xeee99(0x27f) + 'e']()['trim']()];
    if (_0x585ed5 && _0x585ed5[_0xeee99(0x2be)] && _0x57e1ac[_0xeee99(0x27d)](_0x585ed5['Tooltip'][_0xeee99(0x293)], 0x1 * -0xa0 + -0xabf * 0x3 + 0x20dd)) {
      const _0x53a54c = new Window_MessageKeywordTooltip();
      _0x53a54c[_0xeee99(0x20e) + _0xeee99(0x192)](_0x2d9b42, _0x1a68b3), this[_0xeee99(0x121)](_0x53a54c), this['_helpCasca' + _0xeee99(0x16f) + 'r']['push'](_0x53a54c);
    }
    this['_helpCasca' + _0xeee99(0x145) + _0xeee99(0x285)][_0xeee99(0x11d)](_0xb9caf6), this['addCascadi' + 'ngKeywords' + 'HelpCascad' + _0xeee99(0x2c8)](_0x2d9b42);
  }),
  (VisuMZ[_0x51e40e(0xf1) + 'words'][_0x51e40e(0x174) + _0x51e40e(0x2d4)] = function (_0x1e06ab, _0x206267) {
    const _0x277da1 = _0x51e40e,
      _0x5c7858 = {
        SrCKr: function (_0x4a523a, _0xa2c5a7) {
          return _0x4a523a > _0xa2c5a7;
        },
      };
    let _0x17b587 = _0x1e06ab;
    const _0x332947 = VisuMZ[_0x277da1(0xf1) + _0x277da1(0x113)][_0x277da1(0x279)][_0x206267[_0x277da1(0x27f) + 'e']()[_0x277da1(0x15c)]()];
    return (
      _0x332947 &&
        _0x332947[_0x277da1(0x260) + _0x277da1(0x189)] &&
        _0x5c7858['SrCKr'](_0x332947[_0x277da1(0x260) + _0x277da1(0x189)]['length'], -0x1e * 0x7b + 0xd * 0x3e + 0xb44) &&
        (_0x17b587 = _0x332947['CascadeFam' + _0x277da1(0x189)]),
      _0x17b587[_0x277da1(0x27f) + 'e']()[_0x277da1(0x15c)]()
    );
  }),
  (Scene_Base[_0x51e40e(0x155)]['addCascadi' + _0x51e40e(0x167) + _0x51e40e(0x258) + _0x51e40e(0x2c8)] = function (_0x48e038) {
    const _0x465c50 = _0x51e40e,
      _0x4d5144 = {
        kzCsz: function (_0x57d0d4, _0x1666a1) {
          return _0x57d0d4(_0x1666a1);
        },
        gjVlQ: function (_0x2b1bf2, _0x4e809e) {
          return _0x2b1bf2(_0x4e809e);
        },
      },
      _0x5cdbb9 = VisuMZ[_0x465c50(0xf1) + _0x465c50(0x113)]['Keywords'][_0x48e038[_0x465c50(0x27f) + 'e']()[_0x465c50(0x15c)]()];
    if (!_0x5cdbb9) return;
    const _0x48e6cc = _0x5cdbb9[_0x465c50(0x1b4)] || [];
    for (const _0x48e92d of _0x48e6cc) {
      let _0x33b1c0 = _0x48e92d,
        _0x3badab = '';
      _0x33b1c0[_0x465c50(0x1a8)](/(.*)\:(.*)/i) &&
        ((_0x3badab = _0x4d5144[_0x465c50(0x1bc)](String, RegExp['$2'])['trim']()), (_0x33b1c0 = _0x4d5144[_0x465c50(0x1a3)](String, RegExp['$1'])[_0x465c50(0x15c)]())),
        this[_0x465c50(0x1e1) + _0x465c50(0x1f6) + 'pCascadeWi' + 'ndow'](_0x48e92d, _0x33b1c0, _0x3badab);
    }
  }),
  (Scene_Base['prototype']['alignMessa' + 'geKeywordH' + _0x51e40e(0x11b) + _0x51e40e(0x21c)] = function () {
    const _0x2bc69f = _0x51e40e,
      _0x448638 = {
        KSFce: function (_0x1b0661, _0xdee5cf) {
          return _0x1b0661 <= _0xdee5cf;
        },
        lETIg: function (_0x589a3c, _0x1db68b) {
          return _0x589a3c / _0x1db68b;
        },
        yoszB: function (_0x2fe12f, _0x2308c0) {
          return _0x2fe12f * _0x2308c0;
        },
        QhegO: function (_0x2beed2, _0x32bb07) {
          return _0x2beed2 * _0x32bb07;
        },
      },
      _0x34043d = _0x448638[_0x2bc69f(0x1f5)](this[_0x2bc69f(0x142) + 'w']['y'], _0x448638['lETIg'](Graphics[_0x2bc69f(0x27b)], 0x61d + -0x2f * -0x7d + -0x1d0e));
    let _0x584b56 = this[_0x2bc69f(0xf2) + _0x2bc69f(0x2d1) + _0x2bc69f(0x24f)](),
      _0x19b7d1 = this[_0x2bc69f(0xf2) + 'eKeywordHe' + _0x2bc69f(0x1aa)](_0x34043d);
    for (const _0x188e20 of this[_0x2bc69f(0x202) + 'deContaine' + 'r']) {
      (_0x188e20[_0x2bc69f(0x11e)] = _0x584b56),
        (_0x188e20[_0x2bc69f(0x236)] = _0x19b7d1),
        _0x188e20['startCasca' + _0x2bc69f(0x232)](),
        (_0x19b7d1 += _0x448638[_0x2bc69f(0x2cc)](
          _0x34043d ? 0x13 * 0xa5 + 0x1 * 0x2d7 + -0xf15 : -(0x1 * 0xf8b + 0x13 * -0x2f + -0xc0d),
          Math['ceil'](_0x448638[_0x2bc69f(0x172)](_0x188e20[_0x2bc69f(0x295)], _0x188e20[_0x2bc69f(0x17d)]['y'])),
        ));
    }
  }),
  (Scene_Base[_0x51e40e(0x155)][_0x51e40e(0xf2) + _0x51e40e(0x2d1) + _0x51e40e(0x24f)] = function () {
    const _0x22a1d6 = _0x51e40e,
      _0x5ca3e7 = {
        slWle: function (_0x51e842, _0x1f0e84) {
          return _0x51e842 + _0x1f0e84;
        },
        YPnbq: function (_0x3517fd, _0x4825a4) {
          return _0x3517fd + _0x4825a4;
        },
        DSiMA: function (_0x125f8a, _0x21b174) {
          return _0x125f8a * _0x21b174;
        },
      };
    let _0x2c5ff0 = 0x23b3 + -0x1d34 + -0x67f;
    return (
      Window_Help[_0x22a1d6(0x152) + _0x22a1d6(0x1dc)][_0x22a1d6(0x234) + _0x22a1d6(0x297)] &&
        ((_0x2c5ff0 = _0x5ca3e7['slWle'](
          _0x5ca3e7[_0x22a1d6(0x14c)](
            this[_0x22a1d6(0x142) + 'w']['x'],
            Math[_0x22a1d6(0x105)](_0x5ca3e7[_0x22a1d6(0x1f8)](this[_0x22a1d6(0x142) + 'w'][_0x22a1d6(0x10d)], this[_0x22a1d6(0x142) + 'w'][_0x22a1d6(0x17d)]['x'])),
          ),
          this[_0x22a1d6(0x230) + 'er']['x'],
        )),
        (_0x2c5ff0 -= this['calcMessag' + _0x22a1d6(0x2d1) + _0x22a1d6(0x133) + _0x22a1d6(0x268)]())),
      Imported[_0x22a1d6(0x175) + _0x22a1d6(0x20b) + _0x22a1d6(0x14b)] &&
        BattleManager['isUsingSid' + _0x22a1d6(0x1cb) + _0x22a1d6(0x1fa)]() &&
        ((_0x2c5ff0 -= Window_SideviewUiBattleStatus[_0x22a1d6(0x2cd)]),
        (_0x2c5ff0 -= Window_SideviewUiBattleStatus[_0x22a1d6(0x12e)]),
        (_0x2c5ff0 -= this[_0x22a1d6(0x142) + 'w']['itemPaddin' + 'g']())),
      (_0x2c5ff0 += Window_Help['CASCADE_TO' + _0x22a1d6(0x1dc)]['offsetX']),
      _0x2c5ff0
    );
  }),
  (Scene_Base['prototype'][_0x51e40e(0xf2) + _0x51e40e(0x2d1) + _0x51e40e(0x1aa)] = function (_0x5c22e5) {
    const _0x4eb481 = _0x51e40e,
      _0x269b24 = {
        zbsFu: function (_0x6f05b3, _0x1fbe21) {
          return _0x6f05b3 + _0x1fbe21;
        },
        iGcOr: function (_0x217cad, _0x3b7104) {
          return _0x217cad * _0x3b7104;
        },
      };
    let _0x30e2bc = 0x53 * -0x3e + -0x13 * -0xfb + 0xd * 0x1d;
    if (Window_Help['CASCADE_TO' + _0x4eb481(0x1dc)][_0x4eb481(0x234) + _0x4eb481(0x297)]) {
      _0x30e2bc = _0x269b24[_0x4eb481(0x150)](this[_0x4eb481(0x142) + 'w']['y'], this[_0x4eb481(0x230) + 'er']['y']);
      if (_0x5c22e5) _0x30e2bc += Math[_0x4eb481(0x105)](_0x269b24[_0x4eb481(0x136)](this[_0x4eb481(0x142) + 'w'][_0x4eb481(0x295)], this[_0x4eb481(0x142) + 'w'][_0x4eb481(0x17d)]['y']));
    }
    return (_0x30e2bc += Window_Help[_0x4eb481(0x152) + 'OLTIPS'][_0x4eb481(0x135)]), _0x30e2bc;
  }),
  (Scene_Base[_0x51e40e(0x155)][_0x51e40e(0xf2) + _0x51e40e(0x2d1) + _0x51e40e(0x133) + _0x51e40e(0x268)] = function (_0xa5d3b6) {
    const _0x1f645e = _0x51e40e,
      _0x24625e = {
        JZEHl: function (_0x343acd, _0x57549c) {
          return _0x343acd * _0x57549c;
        },
      };
    let _0x1d31d5 = -0x20e0 * -0x1 + 0x9e + -0x217e;
    for (const _0x266766 of this['_helpCasca' + _0x1f645e(0x16f) + 'r']) {
      let _0x2f7afd = _0x266766[_0x1f645e(0x10d)];
      if (!_0xa5d3b6) _0x2f7afd = Math['floor'](_0x24625e['JZEHl'](_0x266766[_0x1f645e(0x10d)], _0x266766[_0x1f645e(0x17d)]['x']));
      _0x1d31d5 = Math[_0x1f645e(0x250)](_0x1d31d5, _0x2f7afd);
    }
    return _0x1d31d5;
  });
function Sprite_MessageKeywordTooltip() {
  const _0x348f41 = _0x51e40e;
  this[_0x348f41(0x238)](...arguments);
}
function _0x529b() {
  const _0x290f6b = [
    'visible',
    'OffsetX',
    's.\x0aPlease\x20',
    'updateMess',
    'WindowSkin',
    'jdKHb',
    'reorder\x20th',
    '_cascadeTo',
    'CBrJR',
    'WINDOWS',
    'PatdK',
    'eshPatches',
    'lpCascadeX',
    'max',
    'tion',
    'active',
    'oreEngine',
    'geKeywordH',
    'AkyLh',
    'kOCng',
    'OqgPv',
    'HelpCascad',
    'ease\x20updat',
    'WINDOW_SCA',
    'iableEscap',
    'D<%1>%2\x1bMS',
    'parameters',
    'ams',
    '_cascadeDu',
    'CascadeFam',
    'isBeingTou',
    'tjstO',
    'drawMessag',
    'onMouseExi',
    '72264NhakMu',
    'Window',
    '21tqaRfC',
    'indowWidth',
    'clampPosit',
    'wordStartX',
    'ViCoN',
    '%1\x20is\x20inco',
    'nleJi',
    'fontSize',
    'iqXtM',
    'rdMapping',
    'isCascadeC',
    'KeDOR',
    'ywords.%1.',
    'stLog',
    'resh',
    'dgyOI',
    'clearMessa',
    'updatePosi',
    'Keywords',
    'YUcLF',
    'boxWidth',
    'ypllN',
    'rLnLd',
    'N_FILENAME',
    'toUpperCas',
    'Window_Mes',
    'removeChil',
    'scapeChara',
    'GoyhT',
    'updateCasc',
    'amilies',
    'endKeyword',
    'hMKFD',
    'innerWidth',
    'p_refreshC',
    'ivation',
    'toggleHelp',
    'rgetY',
    'FUNC',
    't\x20match\x20pl',
    'cter',
    'kZdAg',
    'startOffse',
    'replace',
    'length',
    'caYvh',
    'height',
    'gleState',
    'lpWindow',
    'messageKey',
    'Scene_Base',
    'funcPatchC',
    '444PfXLdP',
    'LKldG',
    'govPw',
    'jBpbU',
    'OffsetY',
    'wKbTL',
    'setupText',
    'processNew',
    'p_update',
    'rmTko',
    'processTou',
    'sCascadeTo',
    'zOLur',
    'ARRAYFUNC',
    'isMessageK',
    'ascadeWind',
    'sRldC',
    'ARRAYSTR',
    'ettings',
    'applyInver',
    '_cascadeMo',
    'rYaLO',
    'blrkN',
    '\x20largest\x20t',
    'eHelpWindo',
    'qoKnR',
    'install\x20%2',
    'rgetX',
    'setupKeywo',
    '1VAjUsV',
    'activation',
    'sCascadeSh',
    'ndow',
    'descriptio',
    'obtainEsca',
    'Tooltip',
    'pCascadeWi',
    '\x20into\x20the\x20',
    'format',
    'shift\x20togg',
    'jXOsI',
    'mptScale',
    'status',
    'prites();\x0a',
    'wordEndX',
    'eWindow',
    'itemPaddin',
    'p_hide',
    'refresh',
    'yoszB',
    'WIDTH_BASE',
    '\x20%3\x20plugin',
    'update',
    'setupMessa',
    'eKeywordHe',
    'ired\x20plugi',
    'ier\x20number',
    'FamilyName',
    'CascadePro',
    'geKeywordS',
    'MSGKEYWORD',
    'iMvEP',
    'SkUMv',
    'convertVar',
    'other\x20Tier',
    'clamp',
    'ity',
    '_messageKe',
    'anager.',
    'ARRAYNUM',
    'rWHsU',
    'requestRef',
    'STR',
    '_createWin',
    'uCqsX',
    'ugin\x27s.\x20Pl',
    'ARRAYJSON',
    'clear',
    'indow',
    'hitTest',
    'zCKqy',
    'ggleKey',
    'XVpfQ',
    'MessageKey',
    'calcMessag',
    'children',
    'ywords',
    'SUPPORTED_',
    'sageKeywor',
    'isWordWrap',
    'nzBzx',
    'isParentWi',
    'process_Vi',
    'mptFmt',
    'sibility',
    'ration',
    'hide',
    '%1\x20is\x20miss',
    'p_isSuppor',
    'drawTextEx',
    'e\x20Plugin\x20M',
    'Omukm',
    'p_show',
    'round',
    'ascade',
    '\x20\x20\x20\x20VisuMZ',
    'show',
    'zPEmz',
    'map',
    'e\x20plugin\x20l',
    'ipWindow',
    'width',
    'wordMode',
    'acity',
    '_parentWin',
    '%1_refresh',
    'wordStartY',
    'words',
    'essage',
    'ade',
    'resetFontS',
    'ttonString',
    'owLayer',
    'vXkKh',
    'Plugin\x20Man',
    'elpCascade',
    'VcKFR',
    'push',
    '_baseX',
    'ows',
    'call(this)',
    'addChild',
    'exIin',
    'DifMx',
    '_createKey',
    'CascadeSta',
    'geKeywords',
    'e_initiali',
    'EVAL',
    'suMZ_Messa',
    'aced\x20on\x20th',
    'startKeywo',
    'includes',
    'Window_Que',
    'WIDTH_MOVE',
    'xluVq',
    'ConvertPar',
    'rOoKw',
    'adeMotion',
    'lpCascadeW',
    'gCVjg',
    'offsetY',
    'iGcOr',
    'alignMessa',
    'enabled',
    'baseTextRe',
    'n.\x0aPlease\x20',
    'cters',
    '_scene',
    'isOpen',
    '_slotWindo',
    'STRUCT',
    'iftToggle',
    'qJGgV',
    '_helpWindo',
    'String',
    'setFrame',
    'deKeywordF',
    '2|3|0|1|5|',
    'TxZSJ',
    'rdText',
    'ZabIy',
    'e_convertE',
    'tleUI',
    'YPnbq',
    'odeFmt',
    'name',
    'nNMWm',
    'zbsFu',
    'N_OPACITY',
    'CASCADE_TO',
    'prites',
    'ARRAYEVAL',
    'prototype',
    'padding',
    'ageKeyword',
    'call',
    'exit',
    'resizeWind',
    'qVlXw',
    'trim',
    'onDatabase',
    'shift',
    'CreateRefr',
    'pSXtK',
    'Window_Bas',
    'PJjCf',
    'mptOffsetX',
    'peString',
    '323324CrPWQl',
    'inNvj',
    'ngKeywords',
    'setX',
    '3476895GKZZME',
    'cadeShiftT',
    'Met',
    'MOUSE_OFFS',
    'isSupportM',
    'setBackgro',
    'deContaine',
    '_cascadeTa',
    'CcyWv',
    'QhegO',
    '_requestRe',
    'GetCascade',
    'VisuMZ_3_S',
    'FEjAW',
    'ult',
    'VisuMZ_1_M',
    'D[0]',
    'CASCADE_SH',
    'fDUOM',
    '\x1bMSGKEYWOR',
    'scale',
    'startCasca',
    'e\x20it\x20in\x20th',
    '\x20a\x20Tier\x20%2',
    '_keyword',
    'dow',
    'isTriggere',
    'dowLayer',
    'setY',
    '10vOZRJN',
    'exgmT',
    'mallest\x20to',
    'ily',
    'return\x200',
    'filter',
    'ggleNote',
    'eContainer',
    'iner',
    'Settings',
    'parseMessa',
    '2|3|1|4|0',
    'deMode',
    'createMess',
    'contents',
    'bitmap',
    'RDiSi',
    'CascadeOff',
    'tMessageKe',
    'eWikV',
    'contentsOp',
    'apeCharact',
    'geKeywordC',
    'ceil',
    'essageCore',
    'targetWind',
    'bcaEY',
    '10073qjxxnc',
    '14050020lZvnUI',
    'gjVlQ',
    'NkBew',
    'essageKeyw',
    'ET_X',
    'ager.',
    'match',
    'undType',
    'lpCascadeY',
    'WINDOW_SKI',
    'IGmHz',
    'wordString',
    'newPage',
    '3|2|1|0|4',
    '_addWord',
    'khdtD',
    'Window_Hel',
    'ascadeTogg',
    'Cascades',
    'updateOpac',
    'wqJbH',
    'aJgQD',
    'rted',
    'ers',
    'rtX',
    'Fczjj',
    'kzCsz',
    'setKeyword',
    'CascadeDur',
    'ET_Y',
    'Line',
    'CascadeAct',
    'VisuMZ_0_C',
    '8283099zezjwh',
    'ywordConta',
    'worldTrans',
    'ched',
    'WGsXP',
    'toggleDefa',
    'UbVyd',
    '_hoverStat',
    'eviewUiLay',
    'qJBhq',
    'kwegv',
    'ist.\x0aIt\x20is',
    'TeHYE',
    'allowKeyWo',
    '144uyvxNU',
    'eywordsCas',
    'rrectly\x20pl',
    'eLoaded',
    'lity',
    'ywordToolt',
    'EnableCasc',
    'getInputBu',
    'vHNYc',
    'ggleVisibi',
    'NUM',
    'OLTIPS',
    'MVMvq',
    'sage_newPa',
    'Opacity',
    'gDUCN',
    'addMessage',
    'onditionMe',
    'IFT_TOGGLE',
    'ywordToggl',
    'ion',
    'XceIR',
    'wordsCasca',
    '_text',
    'rdRefresh',
    'playUseSki',
    'terminateM',
    'deToggleVi',
    'DefaultTog',
    'lineHeight',
    'oggleSuppo',
    'CrKpQ',
    'tcOzs',
    '_onDatabas',
    'Enabled',
    'isCascadeM',
    'KSFce',
    'KeywordHel',
    'eKeywordsC',
    'DSiMA',
    'processEsc',
    'out',
    'sage_termi',
    'windowskin',
    'isMainHelp',
    'onMouseEnt',
    'convertEsc',
    'ewLine',
    'JSON',
    '_helpCasca',
    'e_processE',
    'leNote',
    '_reference',
    'ARRAYSTRUC',
    'nateMessag',
    'textSizeEx',
    '%1\x27s\x20versi',
    'oFIrz',
    'ideviewBat',
    '_wordWrap',
    'eCharacter',
    'setupCasca',
    'TooltipWin',
    'rkpqB',
    'Scale',
    'BWYMq',
    '\x0a\x20\x20\x20\x20this.',
    'kCVom',
    'Loaded',
    'zbUUV',
    'nCQAn',
    'ords',
    'LvkRW',
    'parse',
    'KQzgR',
    'Windows',
    'Keyword',
    'canCreateM',
    'xDnrv',
    'RegisterKe',
    'aced\x20over\x20',
    'split',
    'FSoHg',
    'Mapping',
    'fresh',
    'on\x20does\x20no',
    'eToggleNot',
    'ndowValid',
    'eWindows',
    'kvZUL',
    '192362iFOIEx',
    'hyMLs',
    'vphyw',
    'XgRdz',
    'fFYiG',
    '_windowLay',
    'createWind',
    'deMotion',
    'ation',
    'attachToHe',
    'constructo',
    '_baseY',
    'IOYog',
    'initialize',
    'OEMjv',
    'Scene_Boot',
    'convertMes',
    'moveDurati',
    'drawing',
    'e_processN',
    '\x20plugin\x20pl',
    'create',
    'updateBack',
    'SupportedW',
  ];
  _0x529b = function () {
    return _0x290f6b;
  };
  return _0x529b();
}
(Sprite_MessageKeywordTooltip[_0x51e40e(0x155)] = Object[_0x51e40e(0x240)](Sprite_Clickable[_0x51e40e(0x155)])),
  (Sprite_MessageKeywordTooltip['prototype'][_0x51e40e(0x235) + 'r'] = Sprite_MessageKeywordTooltip),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x238)] = function (_0x52f869, _0x312613) {
    const _0x307669 = _0x51e40e,
      _0x48586d = { PatdK: 'magenta' };
    (this[_0x307669(0x205) + _0x307669(0x143)] = _0x52f869),
      Sprite_Clickable[_0x307669(0x155)][_0x307669(0x238)][_0x307669(0x158)](this),
      this[_0x307669(0x144)](0x3 * 0x7a3 + -0x4 * 0x25 + -0x1655, 0x3 * -0x4cd + -0x1cac + 0x2b13, _0x312613[_0x307669(0x10d)], _0x312613['height']),
      (this['x'] = _0x312613['x']),
      (this['y'] = _0x312613['y']);
    let _0x1d371e = ![];
    _0x1d371e &&
      ((this[_0x307669(0x195)] = new Bitmap(_0x312613[_0x307669(0x10d)], _0x312613[_0x307669(0x295)])),
      this['bitmap']['fillRect'](-0x1 * 0x23f0 + -0x1 * -0x1499 + 0xf57, 0x3fd + 0x1 * -0x215b + 0x3 * 0x9ca, _0x312613[_0x307669(0x10d)], _0x312613[_0x307669(0x295)], _0x48586d[_0x307669(0x24d)]),
      (this['opacity'] = 0xb * 0x161 + 0xcba + 0x7 * -0x3f3));
  }),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)]['setParentW' + _0x51e40e(0xec)] = function (_0x155144) {
    const _0x4df5e5 = _0x51e40e;
    this[_0x4df5e5(0x110) + _0x4df5e5(0x182)] = _0x155144;
  }),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)]['isParentWi' + _0x51e40e(0x228)] = function () {
    const _0x564c47 = _0x51e40e,
      _0x1d1a03 = {
        LvkRW: _0x564c47(0x146) + '4',
        koZgY: function (_0x4dfe2a, _0x1937e6) {
          return _0x4dfe2a <= _0x1937e6;
        },
      },
      _0x1b52f1 = _0x1d1a03[_0x564c47(0x219)]['split']('|');
    let _0x3304db = -0x2518 + -0x6f * 0x20 + -0x3a4 * -0xe;
    while (!![]) {
      switch (_0x1b52f1[_0x3304db++]) {
        case '0':
          if (!this[_0x564c47(0x110) + _0x564c47(0x182)]['visible']) return ![];
          continue;
        case '1':
          if (_0x1d1a03['koZgY'](this[_0x564c47(0x110) + 'dow'][_0x564c47(0x19a) + _0x564c47(0x10f)], 0xd53 + 0xef7 + -0x1c4a)) return ![];
          continue;
        case '2':
          if (!this[_0x564c47(0x110) + 'dow']) return ![];
          continue;
        case '3':
          if (!this['_parentWin' + _0x564c47(0x182)][_0x564c47(0x13d)]()) return ![];
          continue;
        case '4':
          return !![];
        case '5':
          if (this['isCascadeC' + _0x564c47(0x1e2) + 't']()) return ![];
          continue;
      }
      break;
    }
  }),
  (Sprite_MessageKeywordTooltip['prototype'][_0x51e40e(0x271) + _0x51e40e(0x1e2) + 't'] = function () {
    const _0x374c0e = _0x51e40e,
      _0x31a95e = {
        zOLur: function (_0x5c1033, _0x4ca7d8) {
          return _0x5c1033 === _0x4ca7d8;
        },
        kCVom: function (_0x229586, _0x524876) {
          return _0x229586 !== _0x524876;
        },
        eWikV: _0x374c0e(0x1b2) + 'p',
        FEjAW: function (_0x779bb6, _0x433ac8) {
          return _0x779bb6 === _0x433ac8;
        },
        exIin: 'always',
      },
      _0x3e4630 = SceneManager['_scene'];
    if (_0x3e4630 && _0x31a95e[_0x374c0e(0x2a7)](_0x3e4630['constructo' + 'r'], Scene_Equip)) {
      const _0x25e84b = _0x3e4630[_0x374c0e(0x13e) + 'w'];
      if (_0x25e84b && _0x25e84b[_0x374c0e(0x252)]) return ![];
    }
    if (_0x31a95e[_0x374c0e(0x214)](this[_0x374c0e(0x110) + 'dow'][_0x374c0e(0x235) + 'r'][_0x374c0e(0x14e)], _0x31a95e[_0x374c0e(0x199)])) return ![];
    const _0x9b33de = Window_Help[_0x374c0e(0x152) + _0x374c0e(0x1dc)];
    if (!_0x9b33de[_0x374c0e(0x138)]) return ![];
    if (_0x31a95e[_0x374c0e(0x176)](_0x9b33de[_0x374c0e(0x2b9)], _0x31a95e[_0x374c0e(0x122)])) return !![];
    return Window_Help['CASCADE_SH' + _0x374c0e(0x1e3)];
  }),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x19f) + 'ow'] = function () {
    const _0x36b763 = _0x51e40e;
    return SceneManager[_0x36b763(0x13c)][_0x36b763(0x2de) + 'ywordToolt' + _0x36b763(0x10c)];
  }),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x1fe) + 'er'] = function () {
    const _0x3cea7c = _0x51e40e;
    Sprite_Clickable[_0x3cea7c(0x155)][_0x3cea7c(0x1fe) + 'er'][_0x3cea7c(0x158)](this);
    const _0x401ade = this['targetWind' + 'ow']();
    _0x401ade && this[_0x3cea7c(0xf9) + _0x3cea7c(0x228)]() && _0x401ade[_0x3cea7c(0x1bd)](this[_0x3cea7c(0x205) + _0x3cea7c(0x143)]);
  }),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x264) + 't'] = function () {
    const _0x3372e3 = _0x51e40e,
      _0x26e000 = {
        TeHYE: function (_0x128d8e, _0x5d4d6a) {
          return _0x128d8e === _0x5d4d6a;
        },
      };
    Sprite_Clickable['prototype'][_0x3372e3(0x264) + 't']['call'](this);
    const _0x13ea8e = this[_0x3372e3(0x19f) + 'ow']();
    _0x13ea8e && _0x26e000[_0x3372e3(0x1cf)](_0x13ea8e[_0x3372e3(0x181)], this['_reference' + _0x3372e3(0x143)]) && _0x13ea8e['setKeyword'](null);
  }),
  (Sprite_MessageKeywordTooltip['prototype'][_0x51e40e(0x2a5) + 'ch'] = function () {
    const _0x39a15e = _0x51e40e,
      _0x3b48e2 = {
        PGzvr: function (_0x1e046c, _0x4c2b22) {
          return _0x1e046c !== _0x4c2b22;
        },
      },
      _0x39b610 = this[_0x39a15e(0x1ca) + 'e'];
    (this[_0x39a15e(0x1ca) + 'e'] = this[_0x39a15e(0x261) + _0x39a15e(0x1c6)]()),
      _0x3b48e2['PGzvr'](this[_0x39a15e(0x1ca) + 'e'], _0x39b610) && (this[_0x39a15e(0x1ca) + 'e'] ? this[_0x39a15e(0x1fe) + 'er']() : this[_0x39a15e(0x264) + 't']());
  }),
  (Sprite_MessageKeywordTooltip[_0x51e40e(0x155)]['isBeingTou' + _0x51e40e(0x1c6)] = function () {
    const _0x400c81 = _0x51e40e,
      _0x27d357 = {
        xDnrv: function (_0x9ec480, _0x26b05f) {
          return _0x9ec480 === _0x26b05f;
        },
      };
    if (_0x27d357[_0x400c81(0x21f)](TouchInput['x'], -0x1281 + 0x2 * -0x248 + -0x1 * -0x1711) && _0x27d357[_0x400c81(0x21f)](TouchInput['y'], -0x677 * -0x1 + -0xb07 + 0x490 * 0x1)) return ![];
    const _0x39f884 = new Point(TouchInput['x'], TouchInput['y']),
      _0x542315 = this[_0x400c81(0x1c5) + 'form'][_0x400c81(0x2ae) + 'se'](_0x39f884);
    return this[_0x400c81(0xed)](_0x542315['x'], _0x542315['y']);
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x161) + _0x51e40e(0x127) + 'ze'] = Window_Base['prototype'][_0x51e40e(0x238)]),
  (Window_Base[_0x51e40e(0x155)][_0x51e40e(0x238)] = function (_0x23ecb7) {
    const _0x5517c5 = _0x51e40e;
    VisuMZ[_0x5517c5(0xf1) + 'words'][_0x5517c5(0x161) + _0x5517c5(0x127) + 'ze'][_0x5517c5(0x158)](this, _0x23ecb7), this['clearMessa' + _0x5517c5(0x2d6) + _0x5517c5(0x153)]();
  }),
  (Window_Base[_0x51e40e(0x155)]['clearMessa' + _0x51e40e(0x2d6) + _0x51e40e(0x153)] = function () {
    const _0x256ce1 = _0x51e40e,
      _0x200152 = {
        MVMvq: function (_0x2475bf, _0x419040) {
          return _0x2475bf > _0x419040;
        },
      };
    !this[_0x256ce1(0x2de) + _0x256ce1(0x1c4) + _0x256ce1(0x18e)] &&
      ((this['_messageKe' + _0x256ce1(0x1c4) + _0x256ce1(0x18e)] = new Sprite()), this['_clientAre' + 'a']['addChild'](this[_0x256ce1(0x2de) + _0x256ce1(0x1c4) + _0x256ce1(0x18e)]));
    while (_0x200152[_0x256ce1(0x1dd)](this[_0x256ce1(0x2de) + _0x256ce1(0x1c4) + _0x256ce1(0x18e)][_0x256ce1(0xf3)][_0x256ce1(0x293)], -0x22cc + 0x8b * -0x2f + 0x3c51)) {
      const _0x13343c = this[_0x256ce1(0x2de) + _0x256ce1(0x1c4) + _0x256ce1(0x18e)][_0x256ce1(0xf3)][-0x2439 + -0x15bc * 0x1 + 0x1 * 0x39f5];
      this[_0x256ce1(0x2de) + _0x256ce1(0x1c4) + _0x256ce1(0x18e)][_0x256ce1(0x281) + 'd'](_0x13343c);
    }
    if (this[_0x256ce1(0x1d0) + _0x256ce1(0x1e9)]()) {
      const _0x1a779e = SceneManager[_0x256ce1(0x13c)][_0x256ce1(0x2de) + _0x256ce1(0x1d6) + _0x256ce1(0x10c)];
      _0x1a779e && _0x1a779e[_0x256ce1(0x1bd)](null);
    }
  }),
  (Window_Base['prototype'][_0x51e40e(0x1d0) + _0x51e40e(0x1e9)] = function () {
    const _0x2ed000 = _0x51e40e,
      _0x597ee6 = { qJBhq: _0x2ed000(0x12d) + _0x2ed000(0x274), BxgBH: _0x2ed000(0x12d) + 'stTracker' },
      _0xc2efde = [];
    return _0xc2efde[_0x2ed000(0x11d)](_0x597ee6[_0x2ed000(0x1cc)], _0x597ee6['BxgBH']), !_0xc2efde[_0x2ed000(0x12c)](this[_0x2ed000(0x235) + 'r'][_0x2ed000(0x14e)]);
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x161) + _0x51e40e(0x14a) + _0x51e40e(0x282) + 'cters'] = Window_Base['prototype']['convertEsc' + _0x51e40e(0x19b) + _0x51e40e(0x1b9)]),
  (Window_Base[_0x51e40e(0x155)][_0x51e40e(0x1ff) + _0x51e40e(0x19b) + _0x51e40e(0x1b9)] = function (_0x305949) {
    const _0x41e60d = _0x51e40e;
    return (
      (_0x305949 = this[_0x41e60d(0x23b) + _0x41e60d(0xf6) + 'ds'](_0x305949)),
      (_0x305949 = VisuMZ[_0x41e60d(0xf1) + _0x41e60d(0x113)][_0x41e60d(0x161) + _0x41e60d(0x14a) + _0x41e60d(0x282) + _0x41e60d(0x13b)][_0x41e60d(0x158)](this, _0x305949)),
      _0x305949
    );
  }),
  (Window_Base[_0x51e40e(0x155)][_0x51e40e(0x23b) + 'sageKeywor' + 'ds'] = function (_0x238540) {
    const _0xef745a = _0x51e40e,
      _0x4cb214 = {
        fDUOM: function (_0x307a99, _0x26fd3a) {
          return _0x307a99(_0x26fd3a);
        },
        KQzgR: _0xef745a(0x17c) + _0xef745a(0x25c) + 'GKEYWORDEN' + _0xef745a(0x179),
      };
    return (
      (_0x238540 = this[_0xef745a(0x2da) + _0xef745a(0x25b) + _0xef745a(0x20d) + 's'](_0x238540)),
      (_0x238540 = _0x238540[_0xef745a(0x292)](/\(\((.*?)\)\)/gi, (_0x595551, _0xcb55b1) => {
        const _0x14264b = _0xef745a,
          _0x1e7c58 = _0x4cb214['fDUOM'](String, _0xcb55b1);
        let _0x576728 = _0x1e7c58,
          _0x496b00 = '';
        _0x576728['match'](/(.*)\:(.*)/i) &&
          ((_0x496b00 = _0x4cb214[_0x14264b(0x17b)](String, RegExp['$2'])[_0x14264b(0x15c)]()), (_0x576728 = _0x4cb214[_0x14264b(0x17b)](String, RegExp['$1'])[_0x14264b(0x15c)]()));
        if (VisuMZ[_0x14264b(0xf1) + _0x14264b(0x113)][_0x14264b(0x279)][_0x576728[_0x14264b(0x27f) + 'e']()[_0x14264b(0x15c)]()]) {
          const _0x5f5a98 = VisuMZ[_0x14264b(0xf1) + _0x14264b(0x113)][_0x14264b(0x279)][_0x576728[_0x14264b(0x27f) + 'e']()[_0x14264b(0x15c)]()],
            _0x408d65 = _0x5f5a98['Text']['format'](_0x496b00)[_0x14264b(0x15c)]();
          return this['isSupportM' + _0x14264b(0x1a5) + _0x14264b(0x218)]() ? _0x4cb214[_0x14264b(0x21b)][_0x14264b(0x2c1)](_0x1e7c58, _0x408d65) : _0x408d65;
        } else return '';
      })),
      _0x238540
    );
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x161) + 'e_processE' + _0x51e40e(0x282) + _0x51e40e(0x28f)] = Window_Base[_0x51e40e(0x155)][_0x51e40e(0x1f9) + _0x51e40e(0x19b) + 'er']),
  (Window_Base[_0x51e40e(0x155)]['processEsc' + _0x51e40e(0x19b) + 'er'] = function (_0x57d9e6, _0x3244b3) {
    const _0x363176 = _0x51e40e,
      _0x208d42 = { xluVq: 'MSGKEYWORD', kOCng: _0x363176(0x2d7) + 'END' };
    switch (_0x57d9e6) {
      case _0x208d42[_0x363176(0x12f)]:
        _0x3244b3[_0x363176(0x23d)] ? this[_0x363176(0x12b) + _0x363176(0x270)](_0x3244b3) : this[_0x363176(0x2bd) + _0x363176(0x164)](_0x3244b3);
        break;
      case _0x208d42[_0x363176(0x256)]:
        _0x3244b3['drawing'] && this[_0x363176(0x124) + _0x363176(0x10e)] && this[_0x363176(0x286) + 'Mapping'](_0x3244b3);
        this['obtainEsca' + 'peParam'](_0x3244b3);
        break;
      default:
        return VisuMZ['MessageKey' + _0x363176(0x113)][_0x363176(0x161) + _0x363176(0x203) + _0x363176(0x282) + _0x363176(0x28f)][_0x363176(0x158)](this, _0x57d9e6, _0x3244b3);
        break;
    }
  }),
  (Window_Base[_0x51e40e(0x155)]['startKeywo' + 'rdMapping'] = function (_0x18f91e) {
    const _0xbb3f81 = _0x51e40e,
      _0x207fcf = this[_0xbb3f81(0x2bd) + _0xbb3f81(0x164)](_0x18f91e);
    (this[_0xbb3f81(0x124) + _0xbb3f81(0x1ad)] = _0x207fcf['toUpperCas' + 'e']()[_0xbb3f81(0x15c)]()),
      (this[_0xbb3f81(0x124) + _0xbb3f81(0x10e)] = !![]),
      (this[_0xbb3f81(0x124) + _0xbb3f81(0x26a)] = _0x18f91e['x']),
      (this['_createKey' + _0xbb3f81(0x112)] = _0x18f91e['y']);
  }),
  (Window_Base['prototype'][_0x51e40e(0x286) + _0x51e40e(0x224)] = function (_0x4ad959) {
    const _0x3ae792 = _0x51e40e;
    (this[_0x3ae792(0x124) + 'wordMode'] = ![]), (this[_0x3ae792(0x124) + 'wordEndX'] = _0x4ad959['x']), (this[_0x3ae792(0x124) + 'wordEndY'] = _0x4ad959['y']), this[_0x3ae792(0x1e1) + 'Keyword']();
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x161) + _0x51e40e(0x23e) + _0x51e40e(0x200)] = Window_Base[_0x51e40e(0x155)][_0x51e40e(0x2a2) + _0x51e40e(0x1c0)]),
  (Window_Base[_0x51e40e(0x155)][_0x51e40e(0x2a2) + _0x51e40e(0x1c0)] = function (_0x102c64) {
    const _0x43f883 = _0x51e40e;
    _0x102c64[_0x43f883(0x23d)] &&
      this[_0x43f883(0x124) + _0x43f883(0x10e)] &&
      ((this[_0x43f883(0x124) + _0x43f883(0x2c7)] = _0x102c64['x']), (this['_createKey' + 'wordEndY'] = _0x102c64['y']), this[_0x43f883(0x1e1) + 'Keyword']()),
      VisuMZ['MessageKey' + _0x43f883(0x113)][_0x43f883(0x161) + _0x43f883(0x23e) + _0x43f883(0x200)][_0x43f883(0x158)](this, _0x102c64),
      _0x102c64[_0x43f883(0x23d)] &&
        this[_0x43f883(0x124) + _0x43f883(0x10e)] &&
        ((this[_0x43f883(0x124) + _0x43f883(0x26a)] = _0x102c64['x']), (this['_createKey' + _0x43f883(0x112)] = _0x102c64['y']));
  }),
  (Window_Base[_0x51e40e(0x155)][_0x51e40e(0x16d) + _0x51e40e(0x1a5) + _0x51e40e(0x218)] = function () {
    const _0x4ced34 = _0x51e40e;
    return Window_MessageKeywordTooltip[_0x4ced34(0xf5) + _0x4ced34(0x24c)][_0x4ced34(0x12c)](this[_0x4ced34(0x235) + 'r'][_0x4ced34(0x14e)]);
  }),
  (Window_Base[_0x51e40e(0x155)][_0x51e40e(0x1e1) + _0x51e40e(0x21d)] = function () {
    const _0x5e1a2f = _0x51e40e,
      _0x22c724 = {
        AkyLh: function (_0x1e0a98, _0x57e9f3) {
          return _0x1e0a98 + _0x57e9f3;
        },
        kwegv: function (_0x3fee89, _0x33cf25) {
          return _0x3fee89 - _0x33cf25;
        },
        nCQAn: function (_0xc6b28, _0x20c15a) {
          return _0xc6b28 + _0x20c15a;
        },
        jBpbU: function (_0x3e9941, _0x19a4fb) {
          return _0x3e9941 + _0x19a4fb;
        },
      };
    if (!this[_0x5e1a2f(0x16d) + _0x5e1a2f(0x1a5) + _0x5e1a2f(0x218)]()) return;
    const _0x309eff = this[_0x5e1a2f(0x124) + _0x5e1a2f(0x1ad)];
    let _0x241966 = this[_0x5e1a2f(0x124) + 'wordStartX'],
      _0x148a39 = _0x22c724[_0x5e1a2f(0x255)](this[_0x5e1a2f(0x124) + _0x5e1a2f(0x112)], -0x2051 * -0x1 + -0x1 * -0x1b72 + -0x3bc1),
      _0xf89e91 = _0x22c724['kwegv'](this[_0x5e1a2f(0x124) + 'wordEndX'], _0x241966),
      _0x2f729e = _0x22c724[_0x5e1a2f(0x1cd)](
        _0x22c724[_0x5e1a2f(0x217)](
          _0x22c724['kwegv'](this[_0x5e1a2f(0x124) + 'wordEndY'], _0x148a39),
          _0x22c724[_0x5e1a2f(0x29e)](this[_0x5e1a2f(0x194)][_0x5e1a2f(0x26e)], -0x39 * -0x71 + 0x3 * -0x205 + 0x2 * -0x988),
        ),
        -0x1fc2 + -0x3 * 0xaf7 + 0x1d9 * 0x23,
      );
    const _0x492515 = new Rectangle(_0x241966, _0x148a39, _0xf89e91, _0x2f729e),
      _0x2d9812 = new Sprite_MessageKeywordTooltip(_0x309eff, _0x492515);
    _0x2d9812['setParentW' + _0x5e1a2f(0xec)](this), this[_0x5e1a2f(0x2de) + _0x5e1a2f(0x1c4) + _0x5e1a2f(0x18e)]['addChild'](_0x2d9812);
  }),
  (Window_Help[_0x51e40e(0x152) + _0x51e40e(0x1dc)] = {
    enabled: VisuMZ['MessageKey' + 'words'][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x1d7) + _0x51e40e(0x115)] ?? ![],
    attachToHelpWindow: VisuMZ[_0x51e40e(0xf1) + 'words']['Settings']['Tooltip'][_0x51e40e(0x1d7) + _0x51e40e(0x115)] ?? !![],
    activation: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x1c1) + _0x51e40e(0x28a)] ?? _0x51e40e(0x2c2) + 'le',
    toggleDefault: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x1ed) + _0x51e40e(0x296)] ?? !![],
    offsetX: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x197) + _0x51e40e(0x168)] ?? 0x1 * -0xe94 + 0x60 + -0x194 * -0x9,
    offsetY: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x197) + _0x51e40e(0x185)] ?? 0x22dd + 0x3b * 0x59 + -0x3760,
    startOffsetX: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)]['Tooltip']['CascadeSta' + _0x51e40e(0x1ba)] ?? -0x10a5 * -0x2 + 0xb85 + 0x2c6b * -0x1,
    startOffsetY: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x125) + 'rtY'] ?? 0x1 * 0x2273 + 0x452 + -0x26c5,
    moveDuration: VisuMZ[_0x51e40e(0xf1) + 'words'][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x1be) + _0x51e40e(0x233)] ?? 0x1a00 + 0x18 * -0xc1 + -0x4 * 0x1f7,
    toggleHelpFmt: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)]['Tooltip'][_0x51e40e(0x2d5) + _0x51e40e(0xfb)] ?? '%1:Keyword' + 's',
    toggleHelpScale: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)]['Tooltip'][_0x51e40e(0x2d5) + _0x51e40e(0x2c4)] ?? -0x5ff + -0x2 * -0x544 + -0x489 + 0.8,
    toggleHelpOffsetX: VisuMZ[_0x51e40e(0xf1) + 'words']['Settings'][_0x51e40e(0x2be)][_0x51e40e(0x2d5) + _0x51e40e(0x163)] ?? -0x18d + 0x4 * -0x115 + 0x7 * 0xd7,
    toggleHelpOffsetY: VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x2d5) + 'mptOffsetY'] ?? -0x3 * -0xb54 + 0x16a5 + -0x38a1,
  }),
  (Window_Help[_0x51e40e(0x17a) + 'IFT_TOGGLE'] = Window_Help[_0x51e40e(0x152) + 'OLTIPS'][_0x51e40e(0x1c8) + _0x51e40e(0x177)]),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x1b2) + _0x51e40e(0x100) + _0x51e40e(0x198) + _0x51e40e(0xf4)] =
    Window_Help[_0x51e40e(0x155)][_0x51e40e(0x16d) + 'essageKeyw' + _0x51e40e(0x218)]),
  (Window_Help['prototype']['isSupportM' + _0x51e40e(0x1a5) + _0x51e40e(0x218)] = function () {
    const _0x4ddc9e = _0x51e40e;
    if (Window_Help[_0x4ddc9e(0x152) + _0x4ddc9e(0x1dc)][_0x4ddc9e(0x138)]) return !![];
    return VisuMZ[_0x4ddc9e(0xf1) + _0x4ddc9e(0x113)][_0x4ddc9e(0x1b2) + 'p_isSuppor' + _0x4ddc9e(0x198) + _0x4ddc9e(0xf4)][_0x4ddc9e(0x158)](this);
  }),
  (VisuMZ['MessageKey' + _0x51e40e(0x113)][_0x51e40e(0x1b2) + _0x51e40e(0x104)] = Window_Help[_0x51e40e(0x155)]['show']),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x108)] = function () {
    const _0x2851aa = _0x51e40e;
    VisuMZ['MessageKey' + 'words']['Window_Hel' + _0x2851aa(0x104)]['call'](this), Window_Help[_0x2851aa(0x152) + _0x2851aa(0x1dc)][_0x2851aa(0x138)] && this[_0x2851aa(0x2cb)]();
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x1b2) + _0x51e40e(0x2ca)] = Window_Help['prototype']['hide']),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0xfe)] = function () {
    const _0x174f05 = _0x51e40e;
    VisuMZ[_0x174f05(0xf1) + 'words'][_0x174f05(0x1b2) + _0x174f05(0x2ca)][_0x174f05(0x158)](this);
    if (Window_Help['CASCADE_TO' + 'OLTIPS'][_0x174f05(0x138)] && this[_0x174f05(0x1fd) + _0x174f05(0x266)]()) {
      const _0x285e16 = SceneManager['_scene'];
      _0x285e16[_0x174f05(0x277) + _0x174f05(0x254) + _0x174f05(0x11b) + 'Windows']();
    }
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x1b2) + 'p_update'] = Window_Help[_0x51e40e(0x155)][_0x51e40e(0x2cf)]),
  (Window_Help['prototype'][_0x51e40e(0x2cf)] = function () {
    const _0x513aea = _0x51e40e;
    VisuMZ[_0x513aea(0xf1) + 'words'][_0x513aea(0x1b2) + _0x513aea(0x2a3)][_0x513aea(0x158)](this),
      this[_0x513aea(0x246) + 'ageKeyword' + _0x513aea(0x2a6) + _0x513aea(0x18c)](),
      this[_0x513aea(0x246) + _0x513aea(0x157) + _0x513aea(0x2ba) + _0x513aea(0x140)]();
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x246) + 'ageKeyword' + _0x51e40e(0x2ba) + _0x51e40e(0x140)] = function () {
    const _0x40cf17 = _0x51e40e,
      _0xafdbc5 = { DvhXx: _0x40cf17(0x15e) };
    if (!this[_0x40cf17(0x2a9) + 'eywordsCas' + _0x40cf17(0x16a) + _0x40cf17(0x1ef) + _0x40cf17(0x1b8)]()) return;
    if (Input[_0x40cf17(0x183) + 'd'](_0xafdbc5['DvhXx'])) {
      SoundManager[_0x40cf17(0x1ea) + 'll'](), (Window_Help[_0x40cf17(0x17a) + _0x40cf17(0x1e3)] = !Window_Help[_0x40cf17(0x17a) + _0x40cf17(0x1e3)]);
      if (Window_Help[_0x40cf17(0x17a) + _0x40cf17(0x1e3)]) {
        const _0x33707a = SceneManager[_0x40cf17(0x13c)];
        if (_0x33707a) {
          const _0x522535 = _0x33707a['_messageKe' + _0x40cf17(0x1d6) + _0x40cf17(0x10c)];
          if (_0x522535) _0x522535[_0x40cf17(0x1bd)](null);
        }
      } else
        for (const _0x180ea8 of this[_0x40cf17(0x2de) + 'ywordConta' + _0x40cf17(0x18e)][_0x40cf17(0xf3)]) {
          (_0x180ea8['_hoverStat' + 'e'] = undefined), _0x180ea8[_0x40cf17(0x2a5) + 'ch']();
        }
    }
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x2a9) + _0x51e40e(0x1d2) + _0x51e40e(0x16a) + _0x51e40e(0x1ef) + _0x51e40e(0x1b8)] = function () {
    const _0x3272cf = _0x51e40e,
      _0x562ac7 = {
        jWDmt: function (_0x40bc7b, _0x198b11) {
          return _0x40bc7b !== _0x198b11;
        },
        rOoKw: function (_0x197a8d, _0x2f3c47) {
          return _0x197a8d !== _0x2f3c47;
        },
        syMzf: _0x3272cf(0x2c2) + 'le',
        dgyOI: function (_0x354d24, _0x13f8ed) {
          return _0x354d24 <= _0x13f8ed;
        },
        QNzlD: function (_0x4c4716, _0x2a9c75) {
          return _0x4c4716 === _0x2a9c75;
        },
      },
      _0x538099 = Window_Help[_0x3272cf(0x152) + _0x3272cf(0x1dc)];
    if (!_0x538099['enabled']) return ![];
    if (_0x562ac7['jWDmt'](this, SceneManager[_0x3272cf(0x13c)][_0x3272cf(0x142) + 'w'])) return ![];
    if (_0x562ac7[_0x3272cf(0x131)](_0x538099[_0x3272cf(0x2b9)], _0x562ac7['syMzf'])) return ![];
    if (_0x562ac7[_0x3272cf(0x276)](this[_0x3272cf(0x2de) + _0x3272cf(0x1c4) + _0x3272cf(0x18e)]['children'][_0x3272cf(0x293)], 0x1 * -0x16fd + -0x234 * -0x5 + 0x5 * 0x265)) return ![];
    const _0x520caf = SceneManager['_scene'];
    if (_0x562ac7['QNzlD'](_0x520caf[_0x3272cf(0x235) + 'r'], Scene_Equip)) {
      const _0x292cf4 = _0x520caf[_0x3272cf(0x13e) + 'w'];
      if (_0x292cf4 && _0x292cf4[_0x3272cf(0x252)]) return ![];
    }
    return !![];
  }),
  (Window_Help[_0x51e40e(0x155)]['isMainHelp' + 'Window'] = function () {
    const _0x40e7f5 = _0x51e40e,
      _0xe39d56 = {
        NkBew: function (_0x18678, _0x2aa2ec) {
          return _0x18678 === _0x2aa2ec;
        },
      };
    if (!SceneManager[_0x40e7f5(0x13c)]) return ![];
    return _0xe39d56[_0x40e7f5(0x1a4)](SceneManager[_0x40e7f5(0x13c)][_0x40e7f5(0x142) + 'w'], this);
  }),
  (VisuMZ['MessageKey' + 'words'][_0x51e40e(0x1b2) + _0x51e40e(0x289) + _0x51e40e(0x106)] = Window_Help[_0x51e40e(0x155)][_0x51e40e(0x2cb)]),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x2cb)] = function () {
    const _0x5f48e5 = _0x51e40e;
    if (this[_0x5f48e5(0x1fd) + _0x5f48e5(0x266)]()) {
      const _0x44c28d = SceneManager[_0x5f48e5(0x13c)];
      _0x44c28d[_0x5f48e5(0x193) + _0x5f48e5(0x157) + _0x5f48e5(0x258) + _0x5f48e5(0x18d)]();
    }
    VisuMZ[_0x5f48e5(0xf1) + _0x5f48e5(0x113)]['Window_Hel' + _0x5f48e5(0x289) + _0x5f48e5(0x106)][_0x5f48e5(0x158)](this),
      Window_Help[_0x5f48e5(0x152) + 'OLTIPS'][_0x5f48e5(0x138)] && this['isMainHelp' + _0x5f48e5(0x266)]() && this[_0x5f48e5(0x2d0) + _0x5f48e5(0x19c) + _0x5f48e5(0x2aa) + _0x5f48e5(0x11f)]();
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x2d0) + _0x51e40e(0x19c) + _0x51e40e(0x2aa) + _0x51e40e(0x11f)] = function () {
    const _0x4652bb = _0x51e40e;
    if (!this['isMainHelp' + _0x4652bb(0x266)]()) return;
    const _0x11a74b = SceneManager[_0x4652bb(0x13c)];
    _0x11a74b[_0x4652bb(0x277) + _0x4652bb(0x254) + _0x4652bb(0x11b) + _0x4652bb(0x21c)](),
      this[_0x4652bb(0x190) + _0x4652bb(0x126) + 'IntoCascad' + _0x4652bb(0x229)](),
      _0x11a74b[_0x4652bb(0x137) + _0x4652bb(0x254) + _0x4652bb(0x11b) + _0x4652bb(0x21c)]();
  }),
  (Window_Help[_0x51e40e(0x155)]['parseMessa' + _0x51e40e(0x126) + 'IntoCascad' + _0x51e40e(0x229)] = function () {
    const _0x4b6d73 = _0x51e40e,
      _0x452b81 = {
        rYaLO: function (_0x161574, _0x394005) {
          return _0x161574(_0x394005);
        },
      },
      _0x254664 = SceneManager[_0x4b6d73(0x13c)],
      _0xf35b0c = /\(\((.*?)\)\)/gi,
      _0x59365a = this[_0x4b6d73(0x1e8)]['match'](_0xf35b0c);
    if (_0x59365a)
      for (const _0x554c73 of _0x59365a) {
        _0x554c73[_0x4b6d73(0x1a8)](_0xf35b0c);
        const _0x1497b6 = _0x452b81[_0x4b6d73(0x2b0)](String, RegExp['$1']);
        let _0x3c86bc = _0x1497b6,
          _0x57cb3b = '';
        _0x3c86bc['match'](/(.*)\:(.*)/i) &&
          ((_0x57cb3b = _0x452b81[_0x4b6d73(0x2b0)](String, RegExp['$2'])['trim']()), (_0x3c86bc = _0x452b81[_0x4b6d73(0x2b0)](String, RegExp['$1'])[_0x4b6d73(0x15c)]())),
          VisuMZ[_0x4b6d73(0xf1) + _0x4b6d73(0x113)][_0x4b6d73(0x279)][_0x3c86bc['toUpperCas' + 'e']()[_0x4b6d73(0x15c)]()] &&
            _0x254664[_0x4b6d73(0x1e1) + _0x4b6d73(0x1f6) + _0x4b6d73(0x2bf) + _0x4b6d73(0x2bb)](_0x1497b6, _0x3c86bc, _0x57cb3b);
      }
  }),
  (Window_Help['prototype'][_0x51e40e(0x246) + _0x51e40e(0x157) + _0x51e40e(0x2a6) + 'ggleNote'] = function () {
    const _0xc376ac = _0x51e40e;
    !this[_0xc376ac(0x2de) + 'ywordToggl' + _0xc376ac(0x2b3) + 'w']
      ? this[_0xc376ac(0x193) + _0xc376ac(0x157) + _0xc376ac(0x2a6) + _0xc376ac(0x18c)]()
      : (this[_0xc376ac(0x263) + _0xc376ac(0x1f7) + _0xc376ac(0x1b3) + _0xc376ac(0x204)](), this[_0xc376ac(0x246) + _0xc376ac(0x157) + _0xc376ac(0x2a6) + 'ggleVisibi' + _0xc376ac(0x1d5)]());
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x21e) + 'essageKeyw' + 'ordsCascad' + _0x51e40e(0x227) + 'e'] = function () {
    const _0x133911 = _0x51e40e,
      _0xfcefe0 = {
        VcKFR: function (_0x2e942d, _0x596046) {
          return _0x2e942d === _0x596046;
        },
      };
    if (!Imported[_0x133911(0x1c2) + _0x133911(0x253)]) return ![];
    if (this[_0x133911(0x2de) + _0x133911(0x1e4) + _0x133911(0x2b3) + 'w']) return ![];
    const _0x229fba = Window_Help[_0x133911(0x152) + _0x133911(0x1dc)];
    if (!_0x229fba[_0x133911(0x138)]) return ![];
    const _0x2ebe90 = SceneManager[_0x133911(0x13c)];
    if (!_0x2ebe90) return ![];
    const _0x14974e = SceneManager[_0x133911(0x13c)][_0x133911(0x142) + 'w'];
    if (!_0x14974e) return ![];
    return _0xfcefe0[_0x133911(0x11c)](this, _0x14974e);
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x193) + _0x51e40e(0x157) + 'sCascadeTo' + _0x51e40e(0x18c)] = function () {
    const _0x33f38b = _0x51e40e,
      _0x4be6eb = {
        XgRdz: function (_0x169188, _0x1d0cb7) {
          return _0x169188 - _0x1d0cb7;
        },
        vphyw: function (_0x2335df, _0x1b88fc) {
          return _0x2335df * _0x1b88fc;
        },
        eskIc: function (_0x5eb348, _0x34d3c2) {
          return _0x5eb348 - _0x34d3c2;
        },
        caYvh: function (_0x35184e, _0x5734d6) {
          return _0x35184e / _0x5734d6;
        },
        RDiSi: function (_0x1135b7, _0x5f4fe9) {
          return _0x1135b7 * _0x5f4fe9;
        },
      };
    if (!this['canCreateM' + 'essageKeyw' + 'ordsCascad' + _0x33f38b(0x227) + 'e']()) return;
    const _0x18c0c7 = Window_Help[_0x33f38b(0x152) + _0x33f38b(0x1dc)],
      _0x20842a = new Rectangle(-0x114b * -0x1 + -0x881 + -0x8ca, -0x1956 + -0x1176 + 0x2acc, this['width'], this[_0x33f38b(0x295)]),
      _0x32079a = new Window_Base(_0x20842a);
    _0x32079a[_0x33f38b(0x16e) + _0x33f38b(0x1a9)](-0x1c74 + -0x3ae + 0x2c * 0xbb),
      (_0x32079a[_0x33f38b(0x17d)]['x'] = _0x32079a[_0x33f38b(0x17d)]['y'] = _0x18c0c7[_0x33f38b(0x28b) + 'Scale']),
      (_0x32079a['x'] = _0x4be6eb[_0x33f38b(0x22e)](this[_0x33f38b(0x10d)], _0x4be6eb[_0x33f38b(0x22d)](_0x32079a[_0x33f38b(0x17d)]['x'], this['width']))),
      (_0x32079a['x'] += _0x18c0c7[_0x33f38b(0x28b) + _0x33f38b(0x244)]),
      (_0x32079a['y'] = _0x4be6eb[_0x33f38b(0x22e)](
        _0x4be6eb['eskIc'](this[_0x33f38b(0x295)], this[_0x33f38b(0x1ee)]()),
        _0x4be6eb[_0x33f38b(0x294)](this[_0x33f38b(0x2c9) + 'g'](), 0x1 * -0x22ae + 0x1c22 + 0x68e),
      )),
      (_0x32079a['y'] += _0x18c0c7[_0x33f38b(0x28b) + _0x33f38b(0x29f)]),
      Imported[_0x33f38b(0x175) + _0x33f38b(0x20b) + 'tleUI'] &&
        BattleManager['isUsingSid' + _0x33f38b(0x1cb) + 'out']() &&
        ((_0x32079a['x'] -= Window_SideviewUiBattleStatus['WIDTH_BASE']),
        (_0x32079a['x'] -= Window_SideviewUiBattleStatus[_0x33f38b(0x12e)]),
        (_0x32079a['x'] -= this[_0x33f38b(0x2c9) + 'g']()),
        (_0x32079a['y'] -= Math[_0x33f38b(0x19d)](
          _0x4be6eb[_0x33f38b(0x294)](_0x4be6eb[_0x33f38b(0x196)](this[_0x33f38b(0x2c9) + 'g'](), 0x71e + 0x168c + -0x1da7), 0x109d + -0xb8f * 0x3 + 0xd * 0x164),
        ))),
      (this[_0x33f38b(0x2de) + _0x33f38b(0x1e4) + _0x33f38b(0x2b3) + 'w'] = _0x32079a),
      this[_0x33f38b(0x121)](_0x32079a),
      this[_0x33f38b(0x263) + _0x33f38b(0x1f7) + 'ascadeTogg' + _0x33f38b(0x204)](),
      this[_0x33f38b(0x246) + _0x33f38b(0x157) + _0x33f38b(0x2a6) + 'ggleVisibi' + 'lity']();
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x263) + 'eKeywordsC' + 'ascadeTogg' + 'leNote'] = function () {
    const _0x3a20e0 = _0x51e40e,
      _0xe698f2 = {
        uCqsX: function (_0x29b97f, _0xb03d7d) {
          return _0x29b97f === _0xb03d7d;
        },
        oFIrz: _0x3a20e0(0x15e),
        qVlXw: function (_0x1c7307, _0x30c6da) {
          return _0x1c7307 - _0x30c6da;
        },
      };
    if (_0xe698f2[_0x3a20e0(0x2e5)](this['_cascadeTo' + _0x3a20e0(0xef)], TextManager[_0x3a20e0(0x1d8) + 'ttonString'](_0xe698f2[_0x3a20e0(0x20a)]))) return;
    this[_0x3a20e0(0x24a) + _0x3a20e0(0xef)] = TextManager[_0x3a20e0(0x1d8) + _0x3a20e0(0x117)](_0xe698f2[_0x3a20e0(0x20a)]);
    const _0x1c0b45 = this[_0x3a20e0(0x2de) + _0x3a20e0(0x1e4) + _0x3a20e0(0x2b3) + 'w'],
      _0x2a13ec = Window_Help[_0x3a20e0(0x152) + _0x3a20e0(0x1dc)],
      _0x3a9259 = _0x2a13ec[_0x3a20e0(0x28b) + 'Fmt'],
      _0x5609ed = _0x3a9259['format'](this['_cascadeTo' + _0x3a20e0(0xef)]),
      _0x427325 = this[_0x3a20e0(0x208)](_0x5609ed),
      _0x41719e = _0xe698f2[_0x3a20e0(0x15b)](_0xe698f2[_0x3a20e0(0x15b)](_0x1c0b45[_0x3a20e0(0x288)], _0x427325[_0x3a20e0(0x10d)]), this['itemPaddin' + 'g']());
    _0x1c0b45[_0x3a20e0(0x194)][_0x3a20e0(0xeb)](), _0x1c0b45[_0x3a20e0(0x101)](_0x5609ed, _0x41719e, -0x119 * -0x1b + 0x1392 + -0x3135);
  }),
  (Window_Help['prototype'][_0x51e40e(0x246) + _0x51e40e(0x157) + _0x51e40e(0x2a6) + _0x51e40e(0x1da) + 'lity'] = function () {
    const _0x4ef9d3 = _0x51e40e,
      _0x13b221 = this[_0x4ef9d3(0x298) + _0x4ef9d3(0x1e7) + _0x4ef9d3(0x1ec) + _0x4ef9d3(0xfc)]();
    this[_0x4ef9d3(0x2de) + 'ywordToggl' + _0x4ef9d3(0x2b3) + 'w']['visible'] = _0x13b221;
  }),
  (Window_Help[_0x51e40e(0x155)][_0x51e40e(0x298) + 'wordsCasca' + _0x51e40e(0x1ec) + _0x51e40e(0xfc)] = function () {
    const _0x399146 = _0x51e40e,
      _0x4cf3e6 = {
        PYDbE: function (_0x18600b, _0x30777f) {
          return _0x18600b === _0x30777f;
        },
        zCKqy: function (_0x11fc69, _0x5a2a26) {
          return _0x11fc69 <= _0x5a2a26;
        },
      },
      _0x487b94 = SceneManager['_scene'];
    if (_0x4cf3e6['PYDbE'](_0x487b94['constructo' + 'r'], Scene_Equip)) {
      const _0x398ec0 = _0x487b94[_0x399146(0x13e) + 'w'];
      if (_0x398ec0 && _0x398ec0[_0x399146(0x252)]) return ![];
    }
    if (_0x4cf3e6[_0x399146(0xee)](this['_messageKe' + _0x399146(0x1c4) + 'iner'][_0x399146(0xf3)][_0x399146(0x293)], 0xce5 * -0x3 + -0x5f9 * 0x2 + 0xd * 0x3e5)) return ![];
    return !![];
  }),
  (VisuMZ['MessageKey' + _0x51e40e(0x113)][_0x51e40e(0x280) + 'sage_newPa' + 'ge'] = Window_Message[_0x51e40e(0x155)][_0x51e40e(0x1ae)]),
  (Window_Message[_0x51e40e(0x155)][_0x51e40e(0x1ae)] = function (_0x8d72f0) {
    const _0x186e28 = _0x51e40e;
    this[_0x186e28(0x277) + _0x186e28(0x2d6) + _0x186e28(0x153)](), VisuMZ[_0x186e28(0xf1) + _0x186e28(0x113)][_0x186e28(0x280) + _0x186e28(0x1de) + 'ge']['call'](this, _0x8d72f0);
  }),
  (VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x280) + _0x51e40e(0x1fb) + _0x51e40e(0x207) + 'e'] = Window_Message[_0x51e40e(0x155)][_0x51e40e(0x1eb) + _0x51e40e(0x114)]),
  (Window_Message[_0x51e40e(0x155)][_0x51e40e(0x1eb) + _0x51e40e(0x114)] = function () {
    const _0x54dd68 = _0x51e40e;
    this['clearMessa' + 'geKeywordS' + 'prites'](), VisuMZ[_0x54dd68(0xf1) + _0x54dd68(0x113)][_0x54dd68(0x280) + _0x54dd68(0x1fb) + _0x54dd68(0x207) + 'e']['call'](this);
  });
function Window_MessageKeywordTooltip() {
  const _0x1fff2b = _0x51e40e;
  this[_0x1fff2b(0x238)](...arguments);
}
(Window_MessageKeywordTooltip[_0x51e40e(0x155)] = Object['create'](Window_Base[_0x51e40e(0x155)])),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)]['constructo' + 'r'] = Window_MessageKeywordTooltip),
  (Window_MessageKeywordTooltip['WINDOW_SCA' + 'LE'] = VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)]['Tooltip'][_0x51e40e(0x211)]),
  (Window_MessageKeywordTooltip[_0x51e40e(0x1ab) + 'N_FILENAME'] = VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x247)]),
  (Window_MessageKeywordTooltip['WINDOW_SKI' + _0x51e40e(0x151)] = VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)]['Tooltip']['WindowOpac' + _0x51e40e(0x2dd)]),
  (Window_MessageKeywordTooltip[_0x51e40e(0x16c) + _0x51e40e(0x1a6)] = VisuMZ['MessageKey' + 'words'][_0x51e40e(0x18f)][_0x51e40e(0x2be)][_0x51e40e(0x244)]),
  (Window_MessageKeywordTooltip[_0x51e40e(0x16c) + _0x51e40e(0x1bf)] = VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x2be)]['OffsetY']),
  (Window_MessageKeywordTooltip[_0x51e40e(0xf5) + 'WINDOWS'] = VisuMZ[_0x51e40e(0xf1) + _0x51e40e(0x113)][_0x51e40e(0x18f)][_0x51e40e(0x242) + 'indows']),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x238)] = function () {
    const _0x2f16ab = _0x51e40e,
      _0x22d552 = new Rectangle(-0xe6b + -0x2 * -0x4be + -0x1 * -0x4ef, 0x1a25 + 0x2f * 0x1 + -0x1a54, Graphics[_0x2f16ab(0x10d)], Graphics[_0x2f16ab(0x295)]);
    Window_Base[_0x2f16ab(0x155)][_0x2f16ab(0x238)][_0x2f16ab(0x158)](this, _0x22d552),
      (this[_0x2f16ab(0x17d)]['x'] = this[_0x2f16ab(0x17d)]['y'] = Window_MessageKeywordTooltip['WINDOW_SCA' + 'LE']),
      this[_0x2f16ab(0xfe)](),
      (this[_0x2f16ab(0x181)] = '');
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)]['loadWindow' + 'skin'] = function () {
    const _0x32d6 = _0x51e40e;
    this[_0x32d6(0x1fc)] = ImageManager['loadSystem'](Window_MessageKeywordTooltip[_0x32d6(0x1ab) + _0x32d6(0x27e)]);
  }),
  (Window_MessageKeywordTooltip['prototype'][_0x51e40e(0x241) + _0x51e40e(0x1df)] = function () {
    const _0x33eafa = _0x51e40e;
    this['backOpacit' + 'y'] = Window_MessageKeywordTooltip[_0x33eafa(0x1ab) + 'N_OPACITY'];
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x1bd)] = function (_0x5e3902) {
    const _0x4bb55f = _0x51e40e,
      _0x56784b = {
        gCVjg: function (_0x125ca1, _0x31fba7) {
          return _0x125ca1 === _0x31fba7;
        },
        hKgdu: function (_0x1ce864, _0x4fed32) {
          return _0x1ce864(_0x4fed32);
        },
        OqgPv: function (_0x4cbff6, _0x4372c6) {
          return _0x4cbff6 !== _0x4372c6;
        },
        qJGgV: function (_0x4bd745, _0x234767) {
          return _0x4bd745 || _0x234767;
        },
        OFlIg: function (_0x4856df, _0x2c5b3e) {
          return _0x4856df > _0x2c5b3e;
        },
      };
    if (_0x56784b[_0x4bb55f(0x134)](this[_0x4bb55f(0x181)], _0x5e3902)) return;
    let _0x486947 = _0x5e3902;
    _0x5e3902 && _0x5e3902['match'](/(.*)\:(.*)/i)
      ? ((this[_0x4bb55f(0x1b0)] = _0x56784b['hKgdu'](String, RegExp['$2'])), (_0x486947 = _0x56784b['hKgdu'](String, RegExp['$1'])))
      : (this[_0x4bb55f(0x1b0)] = '');
    if (_0x56784b[_0x4bb55f(0x257)](_0x486947, null) && !VisuMZ[_0x4bb55f(0xf1) + 'words'][_0x4bb55f(0x279)][_0x486947['toUpperCas' + 'e']()[_0x4bb55f(0x15c)]()]) return;
    this[_0x4bb55f(0x181)] = _0x56784b[_0x4bb55f(0x141)](_0x5e3902, '');
    if (_0x56784b['OFlIg'](this[_0x4bb55f(0x181)][_0x4bb55f(0x15c)]()[_0x4bb55f(0x293)], -0x1faf * 0x1 + -0x3 * 0x16a + 0x23ed)) this['refresh']();
    else {
      if (this[_0x4bb55f(0x194)]) this[_0x4bb55f(0x194)][_0x4bb55f(0xeb)]();
      this[_0x4bb55f(0xfe)]();
    }
  }),
  (Window_MessageKeywordTooltip['prototype'][_0x51e40e(0xf7) + _0x51e40e(0x1f3)] = function () {
    const _0x545d8b = _0x51e40e;
    return this[_0x545d8b(0x20c)];
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)]['refresh'] = function () {
    const _0x2ced8e = _0x51e40e,
      _0x338309 = {
        fFYiG: function (_0x14d8c4, _0x25322b) {
          return _0x14d8c4 > _0x25322b;
        },
      };
    this[_0x2ced8e(0x194)][_0x2ced8e(0xeb)](), this[_0x2ced8e(0x2a1)]();
    if (_0x338309[_0x2ced8e(0x22f)](this[_0x2ced8e(0x1e8)][_0x2ced8e(0x293)], 0x4a0 + 0x1742 * 0x1 + -0x1be2)) {
      this['resizeWind' + 'ow']();
      const _0x5f3c7b = this[_0x2ced8e(0x139) + 'ct']();
      this[_0x2ced8e(0x101)](this[_0x2ced8e(0x1e8)], _0x5f3c7b['x'], _0x5f3c7b['y'], _0x5f3c7b[_0x2ced8e(0x10d)]), this[_0x2ced8e(0x108)]();
    } else this[_0x2ced8e(0x194)][_0x2ced8e(0xeb)](), this['hide']();
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x23b) + _0x51e40e(0xf6) + 'ds'] = function (_0x125bc8) {
    return _0x125bc8;
  }),
  (Window_MessageKeywordTooltip['prototype']['isSupportM' + 'essageKeyw' + _0x51e40e(0x218)] = function () {
    return ![];
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x2a1)] = function () {
    const _0x35f764 = _0x51e40e;
    this[_0x35f764(0x1e8)] = '';
    if (!this[_0x35f764(0x181)]) return;
    this[_0x35f764(0x2b7) + _0x35f764(0x148)](), (this[_0x35f764(0x1e8)] = this['_text']['trim']());
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x2b7) + _0x51e40e(0x148)] = function () {
    const _0x49e532 = _0x51e40e,
      _0x38a7c4 = {
        wqJbH: function (_0xc26e1a, _0x6b02ec) {
          return _0xc26e1a(_0x6b02ec);
        },
      };
    let _0x226cd3 = this[_0x49e532(0x181)];
    _0x226cd3[_0x49e532(0x1a8)](/(.*)\:(.*)/i) && (_0x226cd3 = _0x38a7c4[_0x49e532(0x1b6)](String, RegExp['$1'])[_0x49e532(0x15c)]());
    const _0x57137d = VisuMZ[_0x49e532(0xf1) + _0x49e532(0x113)][_0x49e532(0x279)][_0x226cd3[_0x49e532(0x27f) + 'e']()[_0x49e532(0x15c)]()] || '';
    this['_text'] = _0x57137d['Tooltip']['format'](this[_0x49e532(0x1b0)] || '');
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x15a) + 'ow'] = function () {
    const _0x2b69bd = _0x51e40e,
      _0x165340 = {
        DifMx: function (_0x3992b8, _0x301a65) {
          return _0x3992b8 + _0x301a65;
        },
        nzBzx: function (_0x33c1f4, _0x1c02b2) {
          return _0x33c1f4 * _0x1c02b2;
        },
        CcyWv: function (_0x49c746, _0x35eef3) {
          return _0x49c746 + _0x35eef3;
        },
        XceIR: function (_0x583fb1, _0x36858f) {
          return _0x583fb1 * _0x36858f;
        },
      },
      _0x1cf298 = this['textSizeEx'](this[_0x2b69bd(0x1e8)]);
    (this[_0x2b69bd(0x10d)] = _0x165340[_0x2b69bd(0x123)](
      _0x1cf298['width'],
      _0x165340[_0x2b69bd(0xf8)](_0x165340['DifMx'](this[_0x2b69bd(0x2c9) + 'g'](), this[_0x2b69bd(0x156)]), 0x1312 + -0x9d * 0x1c + -0x1e4),
    )),
      (this['height'] = _0x165340[_0x2b69bd(0x171)](_0x1cf298[_0x2b69bd(0x295)], _0x165340[_0x2b69bd(0x1e6)](this[_0x2b69bd(0x156)], 0x194b + -0x6a1 * -0x3 + -0xb4b * 0x4))),
      this['createCont' + 'ents'](),
      this[_0x2b69bd(0x116) + _0x2b69bd(0x2ad)]();
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x2cf)] = function () {
    const _0x184b45 = _0x51e40e,
      _0x93ae1f = { ZabIy: _0x184b45(0x191) },
      _0x524fbd = _0x93ae1f[_0x184b45(0x149)][_0x184b45(0x222)]('|');
    let _0x122296 = -0x1 * 0x12af + 0x119b + 0x4 * 0x45;
    while (!![]) {
      switch (_0x524fbd[_0x122296++]) {
        case '0':
          this[_0x184b45(0x1b5) + _0x184b45(0x2dd)]();
          continue;
        case '1':
          this[_0x184b45(0x278) + _0x184b45(0x251)]();
          continue;
        case '2':
          Window_Base[_0x184b45(0x155)][_0x184b45(0x2cf)]['call'](this);
          continue;
        case '3':
          this[_0x184b45(0x173) + _0x184b45(0x225)] && ((this[_0x184b45(0x173) + _0x184b45(0x225)] = ![]), this[_0x184b45(0x2cb)]());
          continue;
        case '4':
          this[_0x184b45(0x284) + _0x184b45(0x132)]();
          continue;
      }
      break;
    }
  }),
  (Window_MessageKeywordTooltip['prototype'][_0x51e40e(0x2e2) + _0x51e40e(0x275)] = function () {
    const _0x283223 = _0x51e40e;
    this[_0x283223(0x173) + 'fresh'] = !![];
  }),
  (Window_MessageKeywordTooltip['prototype'][_0x51e40e(0x278) + _0x51e40e(0x251)] = function () {
    const _0x304fe4 = _0x51e40e,
      _0x28881c = {
        PwUTf: '1|4|3|0|2',
        aJgQD: function (_0x1f3b34, _0x5f03b1) {
          return _0x1f3b34 + _0x5f03b1;
        },
      },
      _0x4a1c6f = _0x28881c['PwUTf']['split']('|');
    let _0x5630fe = 0x16eb * 0x1 + -0x531 + -0x11ba;
    while (!![]) {
      switch (_0x4a1c6f[_0x5630fe++]) {
        case '0':
          this['y'] = _0x28881c[_0x304fe4(0x1b7)](TouchInput['y'], Window_MessageKeywordTooltip[_0x304fe4(0x16c) + 'ET_Y']);
          continue;
        case '1':
          if (!this[_0x304fe4(0x243)]) return;
          continue;
        case '2':
          this[_0x304fe4(0x269) + _0x304fe4(0x1e5)]();
          continue;
        case '3':
          this['x'] = _0x28881c[_0x304fe4(0x1b7)](TouchInput['x'], Window_MessageKeywordTooltip['MOUSE_OFFS' + _0x304fe4(0x1a6)]);
          continue;
        case '4':
          if (this[_0x304fe4(0x2af) + 'de']) return;
          continue;
      }
      break;
    }
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x269) + 'ion'] = function () {
    const _0x4395c5 = _0x51e40e,
      _0x597c05 = {
        LKldG: function (_0x202b97, _0x1e9ac3) {
          return _0x202b97 * _0x1e9ac3;
        },
        IGmHz: function (_0x20f187, _0x4950a4) {
          return _0x20f187 - _0x4950a4;
        },
      },
      _0x5cbdc0 = _0x597c05[_0x4395c5(0x29c)](this[_0x4395c5(0x10d)], Window_MessageKeywordTooltip[_0x4395c5(0x25a) + 'LE'] || 0x1a1 * -0x16 + -0x6 * 0x45 + -0x22 * -0x11a + 0.01),
      _0xa9fae9 = _0x597c05[_0x4395c5(0x29c)](this[_0x4395c5(0x295)], Window_MessageKeywordTooltip['WINDOW_SCA' + 'LE'] || -0x343 * -0x5 + -0x130e + 0x2bf + 0.01);
    (this['x'] = Math[_0x4395c5(0x105)](this['x'][_0x4395c5(0x2dc)](0x43 * 0x46 + 0x2f * 0x2 + 0x170 * -0xd, _0x597c05[_0x4395c5(0x1ac)](Graphics[_0x4395c5(0x10d)], _0x5cbdc0)))),
      (this['y'] = Math[_0x4395c5(0x105)](this['y']['clamp'](0x641 + 0x8 * 0x1dc + -0x70b * 0x3, _0x597c05[_0x4395c5(0x1ac)](Graphics[_0x4395c5(0x295)], _0xa9fae9))));
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x1b5) + 'ity'] = function () {
    const _0x3ccf94 = _0x51e40e,
      _0x360523 = {
        GoyhT: function (_0xfd186a, _0x58eee9) {
          return _0xfd186a + _0x58eee9;
        },
        vHNYc: function (_0x2e7b1d, _0x12a35f) {
          return _0x2e7b1d <= _0x12a35f;
        },
        ViCoN: function (_0xa638b8, _0x5b6790) {
          return _0xa638b8 >= _0x5b6790;
        },
      };
    let _0x3c99e1 = -0x7e8 + -0x22d5 + -0x1 * -0x2bbc;
    if (this[_0x3ccf94(0x2af) + 'de']) {
      if (this['isCascadeM' + 'odeOpacity' + _0x3ccf94(0x16b)]()) _0x3c99e1 = 0x161 * -0x3 + 0x74 * -0x50 + 0x1 * 0x2962;
      else {
        _0x3c99e1 = -0x2 * -0x238 + 0x21ad + -0x1 * 0x261d;
        const _0x126f39 = Window_Help[_0x3ccf94(0x152) + _0x3ccf94(0x1dc)];
        (this['x'] = _0x360523[_0x3ccf94(0x283)](this[_0x3ccf94(0x11e)], _0x126f39['startOffse' + 'tX']) ?? 0xb * -0x1ec + 0x1 * 0xfb1 + 0x573),
          (this['y'] = _0x360523[_0x3ccf94(0x283)](this[_0x3ccf94(0x236)], _0x126f39['startOffse' + 'tY']) ?? 0x34a + 0x2 * -0x191 + -0x28),
          (this[_0x3ccf94(0x25f) + _0x3ccf94(0xfd)] = _0x126f39['moveDurati' + 'on'] ?? -0x9 * 0x209 + 0x1 * 0xc53 + 0x60a);
      }
    } else {
      if (_0x360523[_0x3ccf94(0x1d9)](TouchInput['x'], 0x2004 + -0x1e04 + -0x200)) _0x3c99e1 = 0x2e3 * 0x5 + 0x9e5 + 0x6 * -0x40e;
      if (_0x360523[_0x3ccf94(0x26b)](TouchInput['x'], Graphics[_0x3ccf94(0x10d)])) _0x3c99e1 = -0xb84 + -0xad * -0x4 + -0x18 * -0x5e;
      if (_0x360523['vHNYc'](TouchInput['y'], 0x1 * -0xdea + 0x2f6 + 0xaf4)) _0x3c99e1 = 0x1 * 0x1bd + 0xc17 + -0x14 * 0xb1;
      if (_0x360523['ViCoN'](TouchInput['y'], Graphics[_0x3ccf94(0x295)])) _0x3c99e1 = -0xd4c + -0x20a9 + -0x931 * -0x5;
    }
    this['opacity'] = this[_0x3ccf94(0x19a) + _0x3ccf94(0x10f)] = _0x3c99e1;
  }),
  (Window_MessageKeywordTooltip['prototype'][_0x51e40e(0x1f4) + 'odeOpacity' + _0x51e40e(0x16b)] = function () {
    const _0x2b46b5 = _0x51e40e,
      _0x2b555b = {
        TxZSJ: function (_0x4ea399, _0x3b416a) {
          return _0x4ea399 === _0x3b416a;
        },
        KeDOR: 'always',
      },
      _0x234192 = SceneManager[_0x2b46b5(0x13c)];
    if (_0x234192 && _0x2b555b[_0x2b46b5(0x147)](_0x234192[_0x2b46b5(0x235) + 'r'], Scene_Equip)) {
      const _0x3d2062 = _0x234192[_0x2b46b5(0x13e) + 'w'];
      if (_0x3d2062 && _0x3d2062[_0x2b46b5(0x252)]) return ![];
    }
    const _0x3c8a4a = Window_Help['CASCADE_TO' + 'OLTIPS'];
    if (_0x2b555b[_0x2b46b5(0x147)](_0x3c8a4a[_0x2b46b5(0x2b9)], _0x2b555b[_0x2b46b5(0x272)])) return !![];
    return Window_Help['CASCADE_SH' + _0x2b46b5(0x1e3)];
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)]['setupCasca' + _0x51e40e(0x192)] = function (_0x5d843b, _0x189c2c) {
    const _0x48d957 = _0x51e40e,
      _0x245702 = {
        Fczjj: _0x48d957(0x1af),
        KGruN: function (_0x3eebb1, _0x312d9e) {
          return _0x3eebb1 > _0x312d9e;
        },
        kvZUL: '%1:%2',
        ZMsUm: function (_0x54ae8f, _0x906f3d) {
          return _0x54ae8f || _0x906f3d;
        },
      },
      _0xa37e86 = _0x245702[_0x48d957(0x1bb)][_0x48d957(0x222)]('|');
    let _0x237c78 = -0xca6 + 0x23d4 + -0x81 * 0x2e;
    while (!![]) {
      switch (_0xa37e86[_0x237c78++]) {
        case '0':
          this[_0x48d957(0x108)]();
          continue;
        case '1':
          this[_0x48d957(0x1bd)](_0x5d843b);
          continue;
        case '2':
          if (_0x245702['KGruN'](_0x189c2c[_0x48d957(0x293)], 0x105f + -0x4eb * -0x4 + -0x240b * 0x1)) _0x5d843b = _0x245702[_0x48d957(0x22a)][_0x48d957(0x2c1)](_0x5d843b, _0x189c2c);
          continue;
        case '3':
          _0x189c2c = _0x245702['ZMsUm'](_0x189c2c, '');
          continue;
        case '4':
          this[_0x48d957(0x2af) + 'de'] = !![];
          continue;
      }
      break;
    }
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x17e) + _0x51e40e(0x232)] = function () {
    const _0x4b1ae0 = _0x51e40e,
      _0x3c7172 = {
        gDUCN: function (_0x284c51, _0x2672dc) {
          return _0x284c51 + _0x2672dc;
        },
      },
      _0x12a7db = Window_Help[_0x4b1ae0(0x152) + _0x4b1ae0(0x1dc)];
    (this[_0x4b1ae0(0x170) + _0x4b1ae0(0x2b6)] = this['_baseX']),
      (this[_0x4b1ae0(0x170) + _0x4b1ae0(0x28c)] = this['_baseY']),
      (this['x'] = _0x3c7172[_0x4b1ae0(0x1e0)](this[_0x4b1ae0(0x11e)], _0x12a7db[_0x4b1ae0(0x291) + 'tX']) ?? 0xfe * 0xd + -0x1f63 + -0x127d * -0x1),
      (this['y'] = _0x3c7172[_0x4b1ae0(0x1e0)](this[_0x4b1ae0(0x236)], _0x12a7db[_0x4b1ae0(0x291) + 'tY']) ?? -0x19c3 + 0x1d21 + -0x1 * 0x35e),
      (this[_0x4b1ae0(0x25f) + _0x4b1ae0(0xfd)] = Window_Help[_0x4b1ae0(0x152) + _0x4b1ae0(0x1dc)][_0x4b1ae0(0x23c) + 'on'] ?? -0x1a6f + -0x614 * 0x5 + -0x45 * -0xd3);
  }),
  (Window_MessageKeywordTooltip[_0x51e40e(0x155)][_0x51e40e(0x284) + 'adeMotion'] = function () {
    const _0x33085e = _0x51e40e,
      _0x37570b = {
        hMKFD: function (_0x45f9af, _0x5050ec) {
          return _0x45f9af <= _0x5050ec;
        },
        iqXtM: function (_0x17e804, _0x281710) {
          return _0x17e804 <= _0x281710;
        },
        bcaEY: function (_0xbd4f05, _0x237d46) {
          return _0xbd4f05 / _0x237d46;
        },
        McEos: function (_0x3cfec9, _0x373f3a) {
          return _0x3cfec9 + _0x373f3a;
        },
        khdtD: function (_0x445f45, _0x3ee8ee) {
          return _0x445f45 * _0x3ee8ee;
        },
        wKbTL: function (_0x78a11f, _0x2c899e) {
          return _0x78a11f - _0x2c899e;
        },
        PJjCf: function (_0x4fa36f, _0x458917) {
          return _0x4fa36f / _0x458917;
        },
        vXkKh: function (_0x2a7907, _0x170da8) {
          return _0x2a7907 + _0x170da8;
        },
        rmTko: function (_0x59eb40, _0x1dc883) {
          return _0x59eb40 - _0x1dc883;
        },
        CBrJR: function (_0x5014dc, _0x12b633) {
          return _0x5014dc <= _0x12b633;
        },
      };
    if (!this[_0x33085e(0x2af) + 'de']) return;
    if (!this[_0x33085e(0x25f) + _0x33085e(0xfd)]) return;
    if (_0x37570b[_0x33085e(0x287)](this['_cascadeDu' + _0x33085e(0xfd)], 0x41 * 0x5 + 0x2297 + -0x23dc)) return;
    if (_0x37570b[_0x33085e(0x26f)](this[_0x33085e(0x19a) + _0x33085e(0x10f)], -0xb25 + -0x31 * 0xb3 + -0x1 * -0x2d68)) return;
    const _0x43245e = this[_0x33085e(0x25f) + _0x33085e(0xfd)];
    (this['x'] = _0x37570b[_0x33085e(0x1a0)](
      _0x37570b['McEos'](_0x37570b[_0x33085e(0x1b1)](this['x'], _0x37570b[_0x33085e(0x2a0)](_0x43245e, 0x118 + 0x24d2 * -0x1 + -0x1 * -0x23bb)), this[_0x33085e(0x170) + 'rgetX']),
      _0x43245e,
    )),
      (this['y'] = _0x37570b[_0x33085e(0x162)](
        _0x37570b[_0x33085e(0x119)](_0x37570b[_0x33085e(0x1b1)](this['y'], _0x37570b[_0x33085e(0x2a4)](_0x43245e, -0x1407 + 0x34c + -0x3 * -0x594)), this[_0x33085e(0x170) + _0x33085e(0x28c)]),
        _0x43245e,
      )),
      this['_cascadeDu' + _0x33085e(0xfd)]--,
      _0x37570b[_0x33085e(0x24b)](this[_0x33085e(0x25f) + _0x33085e(0xfd)], -0x755 * -0x4 + -0x97 * 0x3b + -0x579 * -0x1) &&
        ((this['x'] = this[_0x33085e(0x170) + _0x33085e(0x2b6)]), (this['y'] = this[_0x33085e(0x170) + 'rgetY']));
  });
