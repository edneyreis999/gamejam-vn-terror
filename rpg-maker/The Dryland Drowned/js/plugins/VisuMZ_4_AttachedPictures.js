//=============================================================================
// VisuStella MZ - Attached Pictures
// VisuMZ_4_AttachedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AttachedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AttachedPictures = VisuMZ.AttachedPictures || {};
VisuMZ.AttachedPictures.version = 1.05;

//=============================================================================
/*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.05] [AttachedPictures]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Attached_Pictures_VisuStella_MZ
 * @orderAfter VisuMZ_1_MessageCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin allows you to attach Pictures to the Message Window or other
 * Pictures. This means that their positions, effects, and the like become
 * relative to the attached target's, including their position and properties.
 * Use this to display busts on Message Windows or piece together actor busts
 * with a basic body image, a set of eyes, and a mouth. Add some flavor by
 * letting pictures interact with the Message Window in different ways as well
 * as make your actor busts more vivid.
 *
 * This plugin allows you to attach pictures to the Message Window. This means
 * that their positions, effects, and the like become relative to the Message
 * Window's position. Use this to display busts, special effects on an actor's
 * face, or add some flavor by letting pictures interact with the Message
 * Window in different ways.
 *
 * Features include all (but not limited to) the following:
 *
 * * Pictures attached to other pictures will appear relative to the target
 *   picture's position, origin, and share its other properties like scaling,
 *   opacity, tint, and rotation.
 * * Pictures attached to the Message Window will appear relative to the
 *   Message Window's position.
 * * Control these pictures with event commands, such as movement, rotation,
 *   tint, and any kind of picture-related Plugin Command.
 * * Use pictures as Message Window busts, special effects, or anything you can
 *   think of.
 * * Create a bust system for your actors displaying various emotions without
 *   needing a whole picture for each emotional combination.
 * * Change the attached pictures throughout the game. Add to the Message
 *   Window or remove from it with Plugin Commands!
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 *
 * VisuMZ_4_PictureCmnEvts
 *
 * Attached Pictures (for both pictures attached to other pictures or pictures
 * that are attached to the Message Window) will no longer trigger click
 * effects in order to reduce lag. Instead, the click area is now bound only to
 * the base picture it is attached to, if it is a picture. This does not apply
 * to the Message Window as it would not work with the Message Window anyway.
 *
 * ---
 *
 * ============================================================================
 * Instructions - Message Pictures
 * ============================================================================
 *
 * Here are the instructions on how to use this plugin.
 *
 * ---
 *
 * Step 1:
 *
 * Option A:
 *
 * - Open up the Plugin Parameters for this plugin.
 * - Modify the Message Window > Default Attached ID Plugin Parameter.
 * - This marks the Picture ID's attached to the Message Window by default.
 * - Default Picture ID values: 61, 62, 63, 64, 65, 66, 67, 68, 69, 70
 * - Remember these ID's.
 *
 * OR
 *
 * Option B:
 *
 * - Use the Plugin Command: "Message: Attach Picture(s)"
 * - Add specific Picture ID's to be attached to the Message Window.
 * - Remember these ID's.
 *
 * ---
 *
 * Step 2:
 *
 * - Create an event or edit an existing one.
 * - Create a "Show Picture" event using one of the ID's attached to the
 *   Message Window from Step 1.
 * - Modify the specific ID's with "Move Picture", "Rotate Picture",
 *   "Tint Picture", or "Erase Picture" event commands.
 * - The effects will be applied to picture(s) attached to the Message Window.
 *
 * ---
 *
 * Things to Note:
 *
 * - The picture coordinates are relative to the Message Window's upper left
 * corner. This means if your picture has an X coordinate of 100, and a Y
 * coordinate of 50, it will be 100 pixels across and 50 pixels down from the
 * upper left corner of the Message Window while paying heed to the picture's
 * anchor/origin position.
 *
 * - Pictures will be layered in the order of smallest ID towards the bottom to
 * largest ID towards the top, just like it would on the main map.
 *
 * - Pictures will only be positioned relative to the Message Window. Any
 * supplemental windows like the Name Window, Choice Window, and Number Input
 * Window will appear above the pictures. Keep this in mind as you use them.
 * There is no changing this.
 *
 * - Removing a picture from being attached to the Message Window while it is
 * visible will place it back to the main screen.
 *
 * - The opposite is also true. If you attach a picture to the Message Window
 * while it is already on the main screen, it will be attached to the Message
 * Window suddenly.
 *
 * - If the Message Window is closing or is invisible, all attached pictures
 * to the Message Window will disappear until it is fully opened again.
 *
 * - If the Message Window changes positions (ie from the bottom to the middle)
 * then all attached pictures will be transported relative to the new location.
 *
 * - Pictures cannot be simultaneously attached to Message Windows and other
 * Pictures at the same time. The attachment will go towards whichever command
 * last attaches them. Attached Pictures also cannot be attached to other
 * Attached Pictures regardless of their sources.
 *
 * ---
 *
 * ============================================================================
 * Instructions - Pictures Attached to Other Pictures
 * ============================================================================
 *
 * Here are the instructions on how to use this plugin.
 *
 * ---
 *
 * Step 1:
 *
 * - Use the Plugin Command: "Picture: Attach Picture(s)"
 * - Add "Attach Picture ID(s)" to be attached to the "Target Picture ID".
 * - Remember these ID's.
 *
 * ---
 *
 * Step 2:
 *
 * - Create an event or edit an existing one.
 * - Create a "Show Picture" event using one of the ID's attached to the
 *   target Picture from Step 1.
 * - Create a "Show Picture" event using the target picture ID from Step 1.
 * - Modify the specific ID's with "Move Picture", "Rotate Picture",
 *   "Tint Picture", or "Erase Picture" event commands.
 * - The effects will be applied to picture(s) attached to the target Picture.
 *
 * ---
 *
 * Things to Note:
 *
 * - The picture coordinates of the attached pictures are relative to the
 * origin point determined by the target picture. This means if the target
 * picture uses the "Upper Left" origin point, any attached pictures will use
 * that as their 0, 0. If they use a "Center" origin point, then the attached
 * pictures will use the target picture's center.
 *
 * - Attached pictures will be layered in the order of smallest ID towards the
 * bottom to largest ID towards the top, just like it would on the main map.
 *
 * - Attached pictures will always be on top of the picture it is attached to
 * regardless of their ID's. This means if picture 5 is attached to picture 20,
 * the attached picture 5 will appear on top of picture 20.
 *
 * - Attached pictures of base pictures with higher ID's will appear above
 * other attached pictures and base pictures of lower ID's. This means if
 * picture 5 is attached to picture 20, it will appear on top of picture 90
 * that is attached to picture 15.
 *
 * - Removing a picture from being attached to the target picture while it is
 * visible will place it back to the main screen.
 *
 * - The opposite is also true. If you attach a picture to a target picture
 * while it is already on the main screen, it will be attached to the target
 * picture suddenly.
 *
 * - If the target picture is stretched via scale, has its opacity changed,
 * rotating, or is tinted, attached pictures will adopt those properties. In
 * regards to opacity changes, each layer can be visibly seen apart from one
 * another. There is nothing we can do about this as it's a Pixi-related issue.
 *
 * - The attached pictures won't be shown if the target picture is erased.
 *
 * - Pictures cannot be simultaneously attached to Message Windows and other
 * Pictures at the same time. The attachment will go towards whichever command
 * last attaches them. Attached Pictures also cannot be attached to other
 * Attached Pictures regardless of their sources.
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
 * === Message Plugin Commands ===
 *
 * ---
 *
 * Message: Attach Picture(s)
 * - Select which Picture ID's to attach to the Message Window.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to attach to the Message Window.
 *
 * ---
 *
 * Message: Remove Picture(s)
 * - Select which Picture ID's to remove from the Message Window.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to remove from the Message Window.
 *
 * ---
 *
 * === Picture Plugin Commands ===
 *
 * ---
 *
 * Picture: Attach Picture(s)
 * - Select which Picture ID's to attach to another picture.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to attach to another picture.
 *
 *   Target Picture ID:
 *   - Select which Picture ID to attach the above picture(s) to.
 *
 * ---
 *
 * Picture: Remove Picture(s)
 * - Select which Picture ID's to remove from any other pictures.
 *
 *   Picture ID(s):
 *   - Select which Picture ID's to remove from any other pictures.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings available to this plugin.
 *
 * ---
 *
 * Message Window
 *
 *   Default Attached ID(s):
 *   - Select which Picture ID's to default to being attached to
 *     Message Window.
 *   - Can be updated with Plugin Commands.
 *
 *   Container Position:
 *   - Select the position of the picture container.
 *   - Pictures will still appear behind supplemental windows.
 *     - 0 - Behind Window Skin
 *     - 1 - In Front of Window Skin
 *     - 2 - In Front of Window Text
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
 * Version 1.05: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 *
 * Version 1.04: September 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.03: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause attached pictures to appear multiple times
 *    when attaching multiple pairs. Fix made by Arisu.
 *
 * Version 1.02: January 20, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.01: December 2, 2021
 * * Documentation Update!
 * ** Added section under "VisuStella MZ Compatibility" for Picture Common
 *    Events explaining the new feature update.
 * * Feature Update!
 * ** Attached pictures are no longer affected by Picture Common Event click
 *    triggers in order to reduce lag. Update made by Arisu.
 *
 * Version 1.00 Official Release Date: December 10, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageAddPicture
 * @text Message: Attach Picture(s)
 * @desc Select which Picture ID's to attach to the Message Window.
 *
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID's to attach to the Message Window.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageRemovePicture
 * @text Message: Remove Picture(s)
 * @desc Select which Picture ID's to remove from the Message Window.
 *
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID's to remove from the Message Window.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_P
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureAddPicture
 * @text Picture: Attach Picture(s)
 * @desc Select which Picture ID's to attach to another picture.
 *
 * @arg PictureID:arraynum
 * @text Attach Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID's to attach to another picture.
 * @default ["1"]
 *
 * @arg TargetID:num
 * @text Target Picture ID
 * @type number
 * @min 1
 * @desc Select which Picture ID to attach the above picture(s) to.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRemovePicture
 * @text Picture: Remove Picture(s)
 * @desc Select which Picture ID's to remove from any other pictures.
 *
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc Select which Picture ID's to remove from any other pictures.
 * @default ["1"]
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
 * @param AttachedPictures
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MsgWindow
 * @text Message Window
 *
 * @param PictureIDs:arraynum
 * @text Default Attached ID(s)
 * @parent MsgWindow
 * @type number[]
 * @min 1
 * @desc Select which Picture ID's to default to being attached
 * to Message Window. Can be updated with Plugin Commands.
 * @default ["61","62","63","64","65","66","67","68","69","70"]
 *
 * @param ContainerPosition:num
 * @text Container Position
 * @parent MsgWindow
 * @type select
 * @option 0 - Behind Window Skin
 * @value 0
 * @option 1 - In Front of Window Skin
 * @value 1
 * @option 2 - In Front of Window Text
 * @value 2
 * @desc Select the position of the picture container.
 * Pictures will still appear behind supplemental windows.
 * @default 1
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
//=============================================================================

function _0x3109() {
  const _0x4fc4b8 = [
    'create',
    'format',
    'PictureAddPicture',
    'update',
    'DEFAULT_MESSAGE_PICTURE_IDS',
    'version',
    'initialize',
    'exit',
    'name',
    'AttachedPictures',
    'addChild',
    'constructor',
    'toUpperCase',
    'updateMessagePictureContainerVisibility',
    'isAttachedBasePicture',
    'includes',
    'Window_Message_update',
    'STRUCT',
    'clone',
    'updateBitmap',
    'openness',
    'Window_Message_initialize',
    '2239803bkkItX',
    'removeAttachedPictures',
    '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.',
    '_attachedMessagePictures',
    'JSON',
    '_parentID',
    'removeAttachedMessagePictureID',
    'STR',
    'ConvertParams',
    '11180136cYIIdX',
    'getAttachedMessagePictures',
    'hideAttachedPicture',
    'TargetID',
    '1252StGPdR',
    'MESSAGE_PICTURE_CONTAINER_LOCATION',
    'isBeingTouched',
    'map',
    'SortByLayerZ',
    'description',
    'Game_System_initialize',
    '_attachedBasePictures',
    'isClickEnabled',
    'trim',
    '_attachedBasePictureTargets',
    '_pictureContainer',
    '14316804OnuOOI',
    'ContainerPosition',
    'prototype',
    'PictureRemovePicture',
    'parameters',
    'maxPictures',
    'remove',
    'parse',
    'push',
    '_pictureName',
    '196077ogArzY',
    'addAttachedBasePictureID',
    'PictureID',
    'onClick',
    '6605PmqMDn',
    'Settings',
    'onMouseEnter',
    'visible',
    'registerCommand',
    'max',
    'getAttachedBasePictures',
    'onPress',
    'createAttachedPictures',
    '851286fEudIG',
    'addAttachedMessagePictureID',
    'VisuMZ_2_PictureEffects',
    'PictureIDs',
    'Sprite_Picture_initialize',
    '16zQXBOD',
    'onMouseExit',
    'isAttachedMessagePicture',
    '75hBuMpQ',
    'addChildToBack',
    '_pictureId',
    'MessageAddPicture',
    'removeAttachedBasePictureID',
    'call',
    '10uWSFbC',
    'Sprite_Picture_updateBitmap',
    'hasAttachedPicture',
    'some',
    'return\x200',
    'getAttachedBasePictureTarget',
    'MessageRemovePicture',
    'initAttachedPictures',
    'isUsingAttachedPicture',
    'match',
    'addChildAt',
    'createMessagePictureContainer',
    '4194cavFNZ',
    'ARRAYSTRUCT',
    '330IAyWCO',
    'isPictureAttached',
  ];
  _0x3109 = function () {
    return _0x4fc4b8;
  };
  return _0x3109();
}
const _0x2812de = _0x45bf;
(function (_0x492289, _0x3edb4a) {
  const _0x3f574d = _0x45bf,
    _0x5e05e9 = _0x492289();
  while (!![]) {
    try {
      const _0x19181c =
        (-parseInt(_0x3f574d(0x8a)) / 0x1) * (parseInt(_0x3f574d(0x9c)) / 0x2) +
        -parseInt(_0x3f574d(0x82)) / 0x3 +
        (parseInt(_0x3f574d(0xc3)) / 0x4) * (parseInt(_0x3f574d(0x79)) / 0x5) +
        (parseInt(_0x3f574d(0x9e)) / 0x6) * (parseInt(_0x3f574d(0x75)) / 0x7) +
        (parseInt(_0x3f574d(0x87)) / 0x8) * (-parseInt(_0x3f574d(0xb6)) / 0x9) +
        (-parseInt(_0x3f574d(0x90)) / 0xa) * (-parseInt(_0x3f574d(0xbf)) / 0xb) +
        -parseInt(_0x3f574d(0x6b)) / 0xc;
      if (_0x19181c === _0x3edb4a) break;
      else _0x5e05e9['push'](_0x5e05e9['shift']());
    } catch (_0x423bac) {
      _0x5e05e9['push'](_0x5e05e9['shift']());
    }
  }
})(_0x3109, 0xccbd8);
var label = _0x2812de(0xa9),
  tier = tier || 0x0,
  dependencies = [],
  pluginData = $plugins['filter'](function (_0x31977c) {
    const _0x37e25a = _0x2812de;
    return _0x31977c['status'] && _0x31977c['description'][_0x37e25a(0xaf)]('[' + label + ']');
  })[0x0];
(VisuMZ[label][_0x2812de(0x7a)] = VisuMZ[label][_0x2812de(0x7a)] || {}),
  (VisuMZ['ConvertParams'] = function (_0x5d5fa7, _0x363c2d) {
    const _0x40d4ec = _0x2812de;
    for (const _0x5c780a in _0x363c2d) {
      if (_0x5c780a[_0x40d4ec(0x99)](/(.*):(.*)/i)) {
        const _0x31e254 = String(RegExp['$1']),
          _0x13d20c = String(RegExp['$2'])[_0x40d4ec(0xac)]()[_0x40d4ec(0x68)]();
        let _0x72581e, _0x543d80, _0x3af0be;
        switch (_0x13d20c) {
          case 'NUM':
            _0x72581e = _0x363c2d[_0x5c780a] !== '' ? Number(_0x363c2d[_0x5c780a]) : 0x0;
            break;
          case 'ARRAYNUM':
            (_0x543d80 = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : []), (_0x72581e = _0x543d80['map'](_0x2fc248 => Number(_0x2fc248)));
            break;
          case 'EVAL':
            _0x72581e = _0x363c2d[_0x5c780a] !== '' ? eval(_0x363c2d[_0x5c780a]) : null;
            break;
          case 'ARRAYEVAL':
            (_0x543d80 = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : []), (_0x72581e = _0x543d80[_0x40d4ec(0xc6)](_0x2b4a67 => eval(_0x2b4a67)));
            break;
          case _0x40d4ec(0xba):
            _0x72581e = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : '';
            break;
          case 'ARRAYJSON':
            (_0x543d80 = _0x363c2d[_0x5c780a] !== '' ? JSON['parse'](_0x363c2d[_0x5c780a]) : []), (_0x72581e = _0x543d80[_0x40d4ec(0xc6)](_0xdf2e48 => JSON[_0x40d4ec(0x72)](_0xdf2e48)));
            break;
          case 'FUNC':
            _0x72581e = _0x363c2d[_0x5c780a] !== '' ? new Function(JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a])) : new Function(_0x40d4ec(0x94));
            break;
          case 'ARRAYFUNC':
            (_0x543d80 = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : []),
              (_0x72581e = _0x543d80[_0x40d4ec(0xc6)](_0x268658 => new Function(JSON[_0x40d4ec(0x72)](_0x268658))));
            break;
          case _0x40d4ec(0xbd):
            _0x72581e = _0x363c2d[_0x5c780a] !== '' ? String(_0x363c2d[_0x5c780a]) : '';
            break;
          case 'ARRAYSTR':
            (_0x543d80 = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : []), (_0x72581e = _0x543d80[_0x40d4ec(0xc6)](_0x216692 => String(_0x216692)));
            break;
          case _0x40d4ec(0xb1):
            (_0x3af0be = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : {}), (_0x72581e = VisuMZ[_0x40d4ec(0xbe)]({}, _0x3af0be));
            break;
          case _0x40d4ec(0x9d):
            (_0x543d80 = _0x363c2d[_0x5c780a] !== '' ? JSON[_0x40d4ec(0x72)](_0x363c2d[_0x5c780a]) : []),
              (_0x72581e = _0x543d80['map'](_0x30dc2b => VisuMZ[_0x40d4ec(0xbe)]({}, JSON[_0x40d4ec(0x72)](_0x30dc2b))));
            break;
          default:
            continue;
        }
        _0x5d5fa7[_0x31e254] = _0x72581e;
      }
    }
    return _0x5d5fa7;
  }),
  (_0x4f317d => {
    const _0x102b50 = _0x2812de,
      _0x1e80f9 = _0x4f317d[_0x102b50(0xa8)];
    for (const _0x45d52f of dependencies) {
      if (!Imported[_0x45d52f]) {
        alert(_0x102b50(0xb8)[_0x102b50(0xa1)](_0x1e80f9, _0x45d52f)), SceneManager['exit']();
        break;
      }
    }
    const _0x8d6270 = _0x4f317d[_0x102b50(0xc8)];
    if (_0x8d6270[_0x102b50(0x99)](/\[Version[ ](.*?)\]/i)) {
      const _0x20dfac = Number(RegExp['$1']);
      _0x20dfac !== VisuMZ[label][_0x102b50(0xa5)] &&
        (alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x102b50(0xa1)](_0x1e80f9, _0x20dfac)),
        SceneManager[_0x102b50(0xa7)]());
    }
    if (_0x8d6270[_0x102b50(0x99)](/\[Tier[ ](\d+)\]/i)) {
      const _0x326412 = Number(RegExp['$1']);
      _0x326412 < tier
        ? (alert(
            '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[
              _0x102b50(0xa1)
            ](_0x1e80f9, _0x326412, tier),
          ),
          SceneManager['exit']())
        : (tier = Math[_0x102b50(0x7e)](_0x326412, tier));
    }
    VisuMZ[_0x102b50(0xbe)](VisuMZ[label][_0x102b50(0x7a)], _0x4f317d[_0x102b50(0x6f)]);
  })(pluginData),
  PluginManager['registerCommand'](pluginData['name'], _0x2812de(0x8d), _0x3c479f => {
    const _0xe991e2 = _0x2812de;
    VisuMZ[_0xe991e2(0xbe)](_0x3c479f, _0x3c479f);
    const _0x44ceec = _0x3c479f[_0xe991e2(0x77)];
    for (const _0x698e18 of _0x44ceec) {
      $gameSystem[_0xe991e2(0x83)](_0x698e18);
    }
  }),
  PluginManager['registerCommand'](pluginData[_0x2812de(0xa8)], _0x2812de(0x96), _0x3f51f3 => {
    const _0x4009cb = _0x2812de;
    VisuMZ[_0x4009cb(0xbe)](_0x3f51f3, _0x3f51f3);
    const _0x10399a = _0x3f51f3[_0x4009cb(0x77)];
    for (const _0x197883 of _0x10399a) {
      $gameSystem[_0x4009cb(0xbc)](_0x197883);
    }
  }),
  PluginManager[_0x2812de(0x7d)](pluginData[_0x2812de(0xa8)], _0x2812de(0xa2), _0x2b9888 => {
    const _0x2085b9 = _0x2812de;
    VisuMZ[_0x2085b9(0xbe)](_0x2b9888, _0x2b9888);
    const _0x310bc6 = _0x2b9888[_0x2085b9(0x77)],
      _0x256899 = _0x2b9888[_0x2085b9(0xc2)];
    for (const _0x44073b of _0x310bc6) {
      $gameSystem[_0x2085b9(0x76)](_0x44073b, _0x256899);
    }
  }),
  PluginManager[_0x2812de(0x7d)](pluginData[_0x2812de(0xa8)], _0x2812de(0x6e), _0xe8ec83 => {
    const _0x46fd4c = _0x2812de;
    VisuMZ[_0x46fd4c(0xbe)](_0xe8ec83, _0xe8ec83);
    const _0x378891 = _0xe8ec83[_0x46fd4c(0x77)];
    for (const _0x548f99 of _0x378891) {
      $gameSystem[_0x46fd4c(0x8e)](_0x548f99);
    }
  }),
  (VisuMZ[_0x2812de(0xa9)][_0x2812de(0xc9)] = Game_System[_0x2812de(0x6d)][_0x2812de(0xa6)]),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0xa6)] = function () {
    const _0x496d24 = _0x2812de;
    VisuMZ[_0x496d24(0xa9)][_0x496d24(0xc9)][_0x496d24(0x8f)](this), this[_0x496d24(0x97)]();
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0x97)] = function () {
    const _0x5f498a = _0x2812de;
    (this[_0x5f498a(0xca)] = []), (this['_attachedBasePictureTargets'] = {}), (this['_attachedMessagePictures'] = Window_Message[_0x5f498a(0xa4)][_0x5f498a(0xb2)]());
  }),
  (Game_System[_0x2812de(0x6d)]['isPictureAttached'] = function (_0x2bd159) {
    const _0xd71a7d = _0x2812de;
    if (this[_0xd71a7d(0xae)](_0x2bd159)) return !![];
    if (this[_0xd71a7d(0x89)](_0x2bd159)) return !![];
    return ![];
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0x7f)] = function () {
    const _0x48b1d4 = _0x2812de;
    return this[_0x48b1d4(0xca)] === undefined && this[_0x48b1d4(0x97)](), this[_0x48b1d4(0xca)];
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0xae)] = function (_0x4ef576) {
    const _0x180405 = _0x2812de;
    return this[_0x180405(0xca)] === undefined && this['initAttachedPictures'](), this[_0x180405(0xca)][_0x180405(0xaf)](_0x4ef576);
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0x95)] = function (_0x105980) {
    const _0x5c704f = _0x2812de;
    return this['_attachedBasePictureTargets'] === undefined && this[_0x5c704f(0x97)](), this[_0x5c704f(0x69)][_0x105980];
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0x76)] = function (_0x2e510f, _0x4dd3d5) {
    const _0x1640ce = _0x2812de;
    this[_0x1640ce(0xca)] === undefined && this[_0x1640ce(0x97)](),
      !this['_attachedBasePictures'][_0x1640ce(0xaf)](_0x2e510f) && (this[_0x1640ce(0xca)]['push'](_0x2e510f), (this[_0x1640ce(0x69)][_0x2e510f] = _0x4dd3d5)),
      this[_0x1640ce(0xbc)](_0x2e510f);
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0x8e)] = function (_0x2edc5c) {
    const _0x32435a = _0x2812de;
    this['_attachedBasePictures'] === undefined && this[_0x32435a(0x97)](),
      this['_attachedBasePictures'][_0x32435a(0xaf)](_0x2edc5c) && (this['_attachedBasePictures']['remove'](_0x2edc5c), delete this['_attachedBasePictureTargets'][_0x2edc5c]);
  }),
  (Game_System[_0x2812de(0x6d)]['hasAttachedPicture'] = function (_0x3943f2) {
    const _0x481416 = _0x2812de;
    return this[_0x481416(0xca)] ? this[_0x481416(0xca)][_0x481416(0x93)](_0x336e4f => this[_0x481416(0x69)][_0x336e4f] === _0x3943f2) : ![];
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0xc0)] = function () {
    const _0x3a0662 = _0x2812de;
    return this[_0x3a0662(0xb9)] === undefined && this['initAttachedPictures'](), this['_attachedMessagePictures'];
  }),
  (Game_System['prototype'][_0x2812de(0x89)] = function (_0x21f564) {
    const _0x348b89 = _0x2812de;
    return this[_0x348b89(0xb9)] === undefined && this['initAttachedPictures'](), this['_attachedMessagePictures']['includes'](_0x21f564);
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0x83)] = function (_0x457ada) {
    const _0x5b62c6 = _0x2812de;
    this['_attachedMessagePictures'] === undefined && this['initAttachedPictures'](),
      !this[_0x5b62c6(0xb9)][_0x5b62c6(0xaf)](_0x457ada) && this[_0x5b62c6(0xb9)][_0x5b62c6(0x73)](_0x457ada),
      this[_0x5b62c6(0x8e)](_0x457ada);
  }),
  (Game_System[_0x2812de(0x6d)][_0x2812de(0xbc)] = function (_0x5a5807) {
    const _0x62256 = _0x2812de;
    this[_0x62256(0xb9)] === undefined && this[_0x62256(0x97)](), this[_0x62256(0xb9)]['includes'](_0x5a5807) && this[_0x62256(0xb9)][_0x62256(0x71)](_0x5a5807);
  }),
  (VisuMZ['AttachedPictures'][_0x2812de(0x86)] = Sprite_Picture['prototype']['initialize']),
  (Sprite_Picture[_0x2812de(0x6d)][_0x2812de(0xa6)] = function (_0x54a2a1) {
    const _0x4171c2 = _0x2812de;
    VisuMZ[_0x4171c2(0xa9)][_0x4171c2(0x86)]['call'](this, _0x54a2a1);
    if (this[_0x4171c2(0x92)]()) this[_0x4171c2(0x81)]();
  }),
  (Sprite_Picture[_0x2812de(0x6d)]['hasAttachedPicture'] = function () {
    return $gameSystem['hasAttachedPicture'](this['_pictureId']);
  }),
  (Sprite_Picture[_0x2812de(0x6d)][_0x2812de(0x81)] = function () {
    const _0x36be1f = _0x2812de;
    if (this[_0x36be1f(0xab)] !== Sprite_Picture) return;
    if (this['_pictureContainer']) return;
    (this[_0x36be1f(0x6a)] = new Sprite()), this['addChild'](this['_pictureContainer']);
    for (let _0x42be6d = 0x1; _0x42be6d <= $gameScreen[_0x36be1f(0x70)](); _0x42be6d++) {
      this['_pictureContainer']['addChild'](new Sprite_AttachPicture(_0x42be6d, this['_pictureId']));
    }
  }),
  (Sprite_Picture[_0x2812de(0x6d)][_0x2812de(0xb7)] = function () {
    const _0x391fa0 = _0x2812de;
    if (!this[_0x391fa0(0x6a)]) return;
    this['removeChild'](this[_0x391fa0(0x6a)]), (this[_0x391fa0(0x6a)] = undefined);
  }),
  (VisuMZ[_0x2812de(0xa9)][_0x2812de(0x91)] = Sprite_Picture[_0x2812de(0x6d)][_0x2812de(0xb3)]),
  (Sprite_Picture[_0x2812de(0x6d)][_0x2812de(0xb3)] = function () {
    const _0x3e1d65 = _0x2812de;
    this[_0x3e1d65(0x92)]() ? (this[_0x3e1d65(0x81)](), Imported[_0x3e1d65(0x84)] && VisuMZ['PictureEffects'][_0x3e1d65(0xc7)](this[_0x3e1d65(0x6a)])) : this['removeAttachedPictures'](),
      this[_0x3e1d65(0xab)] === Sprite_Picture && $gameSystem[_0x3e1d65(0x9f)](this[_0x3e1d65(0x8c)]) ? this[_0x3e1d65(0xc1)]() : VisuMZ[_0x3e1d65(0xa9)][_0x3e1d65(0x91)][_0x3e1d65(0x8f)](this);
  }),
  (Sprite_Picture['prototype'][_0x2812de(0xc1)] = function () {
    const _0x82faba = _0x2812de;
    (this[_0x82faba(0x7c)] = ![]), (this[_0x82faba(0x74)] = '');
  });
function _0x45bf(_0x4e966f, _0x2c8984) {
  const _0x310993 = _0x3109();
  return (
    (_0x45bf = function (_0x45bf26, _0x3aca07) {
      _0x45bf26 = _0x45bf26 - 0x68;
      let _0xece60e = _0x310993[_0x45bf26];
      return _0xece60e;
    }),
    _0x45bf(_0x4e966f, _0x2c8984)
  );
}
function Sprite_AttachPicture() {
  const _0x346de5 = _0x2812de;
  this[_0x346de5(0xa6)](...arguments);
}
(Sprite_AttachPicture[_0x2812de(0x6d)] = Object[_0x2812de(0xa0)](Sprite_Picture[_0x2812de(0x6d)])),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0xab)] = Sprite_AttachPicture),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0xa6)] = function (_0x3f8863, _0x540c33) {
    const _0x52b71b = _0x2812de;
    (this[_0x52b71b(0xbb)] = _0x540c33), Sprite_Picture[_0x52b71b(0x6d)][_0x52b71b(0xa6)][_0x52b71b(0x8f)](this, _0x3f8863);
  }),
  (Sprite_AttachPicture[_0x2812de(0x6d)]['updateBitmap'] = function () {
    const _0x64ffe7 = _0x2812de;
    this[_0x64ffe7(0x98)]() ? Sprite_Picture[_0x64ffe7(0x6d)][_0x64ffe7(0xb3)][_0x64ffe7(0x8f)](this) : this['hideAttachedPicture']();
  }),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0x98)] = function () {
    const _0x576345 = _0x2812de;
    if (!$gameSystem[_0x576345(0xae)](this['_pictureId'])) return ![];
    if ($gameSystem[_0x576345(0x95)](this[_0x576345(0x8c)]) !== this[_0x576345(0xbb)]) return ![];
    return !![];
  }),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0xcb)] = function () {
    return ![];
  }),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0xc5)] = function () {
    return ![];
  }),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0x7b)] = function () {}),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0x88)] = function () {}),
  (Sprite_AttachPicture[_0x2812de(0x6d)][_0x2812de(0x80)] = function () {}),
  (Sprite_AttachPicture[_0x2812de(0x6d)]['onClick'] = function () {});
function Sprite_MessagePicture() {
  const _0x22cc50 = _0x2812de;
  this[_0x22cc50(0xa6)](...arguments);
}
(Sprite_MessagePicture[_0x2812de(0x6d)] = Object[_0x2812de(0xa0)](Sprite_Picture[_0x2812de(0x6d)])),
  (Sprite_MessagePicture['prototype'][_0x2812de(0xab)] = Sprite_MessagePicture),
  (Sprite_MessagePicture[_0x2812de(0x6d)][_0x2812de(0xb3)] = function () {
    const _0x32b637 = _0x2812de;
    !$gameSystem[_0x32b637(0x89)](this[_0x32b637(0x8c)]) ? this[_0x32b637(0xc1)]() : Sprite_Picture['prototype'][_0x32b637(0xb3)][_0x32b637(0x8f)](this);
  }),
  (Sprite_MessagePicture[_0x2812de(0x6d)][_0x2812de(0xcb)] = function () {
    return ![];
  }),
  (Sprite_MessagePicture[_0x2812de(0x6d)][_0x2812de(0xc5)] = function () {
    return ![];
  }),
  (Sprite_MessagePicture[_0x2812de(0x6d)]['onMouseEnter'] = function () {}),
  (Sprite_MessagePicture[_0x2812de(0x6d)][_0x2812de(0x88)] = function () {}),
  (Sprite_MessagePicture['prototype']['onPress'] = function () {}),
  (Sprite_MessagePicture[_0x2812de(0x6d)][_0x2812de(0x78)] = function () {}),
  (Window_Message[_0x2812de(0xa4)] = VisuMZ[_0x2812de(0xa9)][_0x2812de(0x7a)][_0x2812de(0x85)]),
  (Window_Message[_0x2812de(0xc4)] = VisuMZ[_0x2812de(0xa9)]['Settings'][_0x2812de(0x6c)]),
  (VisuMZ[_0x2812de(0xa9)][_0x2812de(0xb5)] = Window_Message[_0x2812de(0x6d)][_0x2812de(0xa6)]),
  (Window_Message[_0x2812de(0x6d)][_0x2812de(0xa6)] = function (_0x3cb2ca) {
    const _0x37a9f3 = _0x2812de;
    VisuMZ[_0x37a9f3(0xa9)][_0x37a9f3(0xb5)][_0x37a9f3(0x8f)](this, _0x3cb2ca), this['createMessagePictureContainer']();
  }),
  (Window_Message[_0x2812de(0x6d)][_0x2812de(0x9b)] = function () {
    const _0x51f7ec = _0x2812de;
    this[_0x51f7ec(0x6a)] = new Sprite();
    switch (Window_Message[_0x51f7ec(0xc4)]) {
      case 0x0:
        const _0x54f0f5 = this['children']['indexOf'](this['_container']);
        this[_0x51f7ec(0x9a)](this[_0x51f7ec(0x6a)], _0x54f0f5);
        break;
      case 0x1:
        this[_0x51f7ec(0x8b)](this[_0x51f7ec(0x6a)]);
        break;
      default:
        this[_0x51f7ec(0xaa)](this['_pictureContainer']);
        break;
    }
    for (let _0x21674a = 0x1; _0x21674a <= $gameScreen['maxPictures'](); _0x21674a++) {
      this['_pictureContainer'][_0x51f7ec(0xaa)](new Sprite_MessagePicture(_0x21674a));
    }
  }),
  (VisuMZ[_0x2812de(0xa9)][_0x2812de(0xb0)] = Window_Message[_0x2812de(0x6d)][_0x2812de(0xa3)]),
  (Window_Message[_0x2812de(0x6d)][_0x2812de(0xa3)] = function () {
    const _0x1eaf66 = _0x2812de;
    VisuMZ[_0x1eaf66(0xa9)][_0x1eaf66(0xb0)][_0x1eaf66(0x8f)](this), this[_0x1eaf66(0xad)]();
  }),
  (Window_Message['prototype'][_0x2812de(0xad)] = function () {
    const _0x395722 = _0x2812de;
    if (!this[_0x395722(0x6a)]) return;
    (this[_0x395722(0x6a)]['visible'] = this[_0x395722(0xb4)] >= 0xff), Imported[_0x395722(0x84)] && VisuMZ['PictureEffects']['SortByLayerZ'](this['_pictureContainer']);
  });
