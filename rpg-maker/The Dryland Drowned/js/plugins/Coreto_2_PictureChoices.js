/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 2] [Version 0.1.0] [PictureChoices]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderBefore Coreto_3_ChoiceCmnEvts
 * @orderBefore VisuMZ_3_ChoiceCmnEvts
 * @orderBefore Coreto_4_AttachedPictures
 * @orderBefore VisuMZ_4_AttachedPictures
 * @orderBefore Coreto_4_EventTitleScene
 * @orderBefore VisuMZ_4_EventTitleScene
 * @orderBefore Coreto_4_MessageVisibility
 * @orderBefore VisuMZ_4_MessageVisibility
 * @help
 * Bind pictures to choices with <Bind Picture: 1>.
 * <Hide Choice Window> hides the choice window while preserving input.
 * Disable VisuMZ_2_PictureChoices before activating this provider.
 * Core and Message are optional. Extended easing requires Core.
 * CoretoConfigSource: inherit reads the original entry; own reads this entry.
 * Switching the selector does not copy values. See coreto/README.md and the picture-choices CLI namespace.
 *
 * @param CoretoConfigSource
 * @text Configuration source
 * @type select
 * @desc inherit reads the original entry when present; own reads this entry. Switching does not copy values.
 * @default inherit
 * @option inherit
 * @value inherit
 * @option own
 * @value own
 *
 * @param AutoClear:eval
 * @text Auto Clear
 * @type boolean
 * @desc Clear all picture-to-choice bindings and their selected/deselected settings after a choice is confirmed or cancelled. Does not erase displayed pictures. Set false to retain these settings until a Clear command, Erase Picture, or a new game clears them.
 * @default true
 * @on Automatic
 * @off Manual
 *
 * @param SameCheck:eval
 * @text Same Check
 * @type boolean
 * @desc During playtest, compare the On Select and On Deselect objects supplied to a Change Picture Choice Settings command. If equal, display an alert and exit the game. Disable to allow identical settings. This check does not run in a deployed game.
 * @default true
 * @on Check
 * @off Don't Check
 *
 * @command ClearAll
 * @text Clear: All Selection Settings
 * @desc Clear all picture-to-choice bindings and selection settings for every picture ID.
 * @command ClearPictureID
 * @text Clear: Picture ID(s) Selection Settings
 * @desc Clears all selection settings for the ID'd pictures.
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Select which Picture ID(s) to clear.
 * @default ["1"]
 * @min 1
 *
 * @command ClearPictureRange
 * @text Clear: Picture Range Selection Settings
 * @desc Clears all selection settings for the picture ID's in range.
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @desc First boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.
 * @default 1
 * @min 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @desc Second boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.
 * @default 100
 * @min 1
 *
 * @command ChangePictureChoiceSettingsOne
 * @text Picture Settings: Change ID(s)
 * @desc Changes select and deselect settings for the picture ID(s).
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Select which Picture ID(s) to change settings for.
 * @default ["1"]
 * @min 1
 *
 * @arg OnSelectSettings:struct
 * @text On Select Settings
 * @type struct<Picture>
 * @desc Picture settings when selecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @arg OnDeselectSettings:struct
 * @text On Deselect Settings
 * @type struct<Picture>
 * @desc Picture settings when deselecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @command ChangePictureChoiceSettingsRange
 * @text Picture Settings: Change Range
 * @desc Changes select and deselect settings for the picture ID's in range.
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @desc First boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.
 * @default 1
 * @min 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @desc Second boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.
 * @default 100
 * @min 1
 *
 * @arg OnSelectSettings:struct
 * @text On Select Settings
 * @type struct<Picture>
 * @desc Picture settings when selecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 * @arg OnDeselectSettings:struct
 * @text On Deselect Settings
 * @type struct<Picture>
 * @desc Picture settings when deselecting that choice.
 * @default {"Easing":"","Duration:num":"10","easingType:str":"Linear","Position":"","TargetX:str":"Unchanged","TargetY:str":"Unchanged","TargetScaleX:str":"Unchanged","TargetScaleY:str":"Unchanged","Blend":"","TargetOpacity:str":"Unchanged","BlendMode:num":"-1","Tone":"","TargetToneRed:str":"Unchanged","TargetToneGreen:str":"Unchanged","TargetToneBlue:str":"Unchanged","TargetToneGray:str":"Unchanged"}
 *
 */

/*~struct~Picture:
 * @param Duration:num
 * @text Duration
 * @type text
 * @desc Transition length in game update frames for picture position, scale, opacity and tone. Use a positive whole number (normally 60 frames is about one second); zero or a negative value applies immediately. Initial choice highlighting and applying deselected settings when showing a picture are immediate regardless of this value.
 * @default 10
 *
 * @param easingType:str
 * @text Easing Type
 * @type combo
 * @desc Transition interpolation curve. Linear has uniform speed; In accelerates from rest, Out decelerates toward the target, and InOut combines both. Sine, Quad, Cubic, Quart, Quint, Expo and Circ choose the curve shape; Back overshoots, Elastic oscillates, Bounce rebounds. Without a Core Engine provider only Linear, InSine, OutSine and InOutSine are supported. Choose a listed name exactly.
 * @default Linear
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
 *
 * @param TargetX:str
 * @text Target X
 * @type text
 * @desc Target X position of the picture origin in pixels, increasing rightward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as "320" or "this.x() + 20"; Unchanged preserves the existing target X. The picture origin remains the one chosen in Show Picture.
 * @default Unchanged
 *
 * @param TargetY:str
 * @text Target Y
 * @type text
 * @desc Target Y position of the picture origin in pixels, increasing downward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as "240" or "this.y() + 20"; Unchanged preserves the existing target Y. The picture origin remains the one chosen in Show Picture.
 * @default Unchanged
 *
 * @param TargetScaleX:str
 * @text Target Width %
 * @type text
 * @desc Target horizontal scale as a percentage of the image width: 100 is original size, 50 is half, 0 collapses width, and negative values mirror horizontally. Enter a numeric JavaScript expression as a string, such as "110"; Unchanged preserves the current target horizontal scale.
 * @default Unchanged
 *
 * @param TargetScaleY:str
 * @text Target Height %
 * @type text
 * @desc Target vertical scale as a percentage of the image height: 100 is original size, 50 is half, 0 collapses height, and negative values mirror vertically. Enter a numeric JavaScript expression as a string, such as "110"; Unchanged preserves the current target vertical scale.
 * @default Unchanged
 *
 * @param TargetOpacity:str
 * @text Target Opacity
 * @type text
 * @desc Target opacity from 0 (transparent) to 255 (fully opaque). Enter a numeric JavaScript expression as a string, such as "128"; Unchanged preserves the current target opacity. Choose a value in 0..255; this command does not clamp the expression result.
 * @default Unchanged
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default -1
 * @option -1 - Unchanged
 * @value -1
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 *
 * @param TargetToneRed:str
 * @text Target Tone Red
 * @type text
 * @desc Target red tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as "40"; Unchanged preserves the current red tone component.
 * @default Unchanged
 *
 * @param TargetToneGreen:str
 * @text Target Tone Green
 * @type text
 * @desc Target green tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as "40"; Unchanged preserves the current green tone component.
 * @default Unchanged
 *
 * @param TargetToneBlue:str
 * @text Target Tone Blue
 * @type text
 * @desc Target blue tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as "40"; Unchanged preserves the current blue tone component.
 * @default Unchanged
 *
 * @param TargetToneGray:str
 * @text Target Tone Gray
 * @type text
 * @desc Target grayscale amount from 0 (original color saturation) to 255 (fully grayscale), clamped to this range. Enter a numeric JavaScript expression as a string, such as "128"; Unchanged preserves the current gray tone component.
 * @default Unchanged
 *
 */

(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_2_PictureChoices","namespace":"picture-choices","version":"0.1.0","reference":{"pluginId":"VisuMZ_2_PictureChoices","version":"1.02"},"dependencies":{"required":[],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.54"},"before":{},"integrations":{}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_MessageCore","VisuMZ_1_MessageCore"],"orderBefore":["Coreto_3_ChoiceCmnEvts","VisuMZ_3_ChoiceCmnEvts","Coreto_4_AttachedPictures","VisuMZ_4_AttachedPictures","Coreto_4_EventTitleScene","VisuMZ_4_EventTitleScene","Coreto_4_MessageVisibility","VisuMZ_4_MessageVisibility"],"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"PC-P-AutoClear:eval","key":"AutoClear","storageKey":"AutoClear:eval","label":"Auto Clear","description":"Clear all picture-to-choice bindings and their selected/deselected settings after a choice is confirmed or cancelled. Does not erase displayed pictures. Set false to retain these settings until a Clear command, Erase Picture, or a new game clears them.","editorType":"boolean","nativeDefault":"true","availability":"supported","type":"boolean","default":true,"on":"Automatic","off":"Manual"},{"id":"PC-P-SameCheck:eval","key":"SameCheck","storageKey":"SameCheck:eval","label":"Same Check","description":"During playtest, compare the On Select and On Deselect objects supplied to a Change Picture Choice Settings command. If equal, display an alert and exit the game. Disable to allow identical settings. This check does not run in a deployed game.","editorType":"boolean","nativeDefault":"true","availability":"supported","type":"boolean","default":true,"on":"Check","off":"Don't Check"}],"commands":[{"id":"PC-C-ClearAll","key":"ClearAll","label":"Clear: All Selection Settings","description":"Clear all picture-to-choice bindings and selection settings for every picture ID.","availability":"supported","targets":["map","common-event","troop"],"args":[],"context":"Clears both choice bindings and selected/deselected settings, without erasing displayed pictures. ClearAll affects all IDs. ID lists are rounded and clamped to the game picture range; range boundaries are clamped, sorted and included at both ends. Use whole picture IDs."},{"id":"PC-C-ClearPictureID","key":"ClearPictureID","label":"Clear: Picture ID(s) Selection Settings","description":"Clears all selection settings for the ID'd pictures.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"PC-ClearPictureID-PictureIDs:arraynum","key":"PictureIDs","storageKey":"PictureIDs:arraynum","label":"Picture ID(s)","description":"Select which Picture ID(s) to clear.","editorType":"number[]","nativeDefault":"[\"1\"]","availability":"supported","type":"array","items":{"type":"number","default":1,"integer":true,"min":1},"default":[1],"min":1}],"context":"Clears both choice bindings and selected/deselected settings, without erasing displayed pictures. ClearAll affects all IDs. ID lists are rounded and clamped to the game picture range; range boundaries are clamped, sorted and included at both ends. Use whole picture IDs."},{"id":"PC-C-ClearPictureRange","key":"ClearPictureRange","label":"Clear: Picture Range Selection Settings","description":"Clears all selection settings for the picture ID's in range.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"PC-ClearPictureRange-StartID:num","key":"StartID","storageKey":"StartID:num","label":"Starting ID","description":"First boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.","editorType":"number","nativeDefault":"1","availability":"supported","type":"number","default":1,"min":1},{"id":"PC-ClearPictureRange-EndingID:num","key":"EndingID","storageKey":"EndingID:num","label":"Ending ID","description":"Second boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.","editorType":"number","nativeDefault":"100","availability":"supported","type":"number","default":100,"min":1}],"context":"Clears both choice bindings and selected/deselected settings, without erasing displayed pictures. ClearAll affects all IDs. ID lists are rounded and clamped to the game picture range; range boundaries are clamped, sorted and included at both ends. Use whole picture IDs."},{"id":"PC-C-ChangePictureChoiceSettingsOne","key":"ChangePictureChoiceSettingsOne","label":"Picture Settings: Change ID(s)","description":"Changes select and deselect settings for the picture ID(s).","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"PC-ChangePictureChoiceSettingsOne-PictureIDs:arraynum","key":"PictureIDs","storageKey":"PictureIDs:arraynum","label":"Picture ID(s)","description":"Select which Picture ID(s) to change settings for.","editorType":"number[]","nativeDefault":"[\"1\"]","availability":"supported","type":"array","items":{"type":"number","default":1,"integer":true,"min":1},"default":[1],"min":1},{"id":"PC-ChangePictureChoiceSettingsOne-OnSelectSettings:struct","key":"OnSelectSettings","storageKey":"OnSelectSettings:struct","label":"On Select Settings","description":"Picture settings when selecting that choice.","editorType":"struct<Picture>","nativeDefault":"{\"Easing\":\"\",\"Duration:num\":\"10\",\"easingType:str\":\"Linear\",\"Position\":\"\",\"TargetX:str\":\"Unchanged\",\"TargetY:str\":\"Unchanged\",\"TargetScaleX:str\":\"Unchanged\",\"TargetScaleY:str\":\"Unchanged\",\"Blend\":\"\",\"TargetOpacity:str\":\"Unchanged\",\"BlendMode:num\":\"-1\",\"Tone\":\"\",\"TargetToneRed:str\":\"Unchanged\",\"TargetToneGreen:str\":\"Unchanged\",\"TargetToneBlue:str\":\"Unchanged\",\"TargetToneGray:str\":\"Unchanged\"}","availability":"supported","type":"struct","structName":"Picture","fields":[{"id":"PC-PICTURE-Duration:num","key":"Duration","storageKey":"Duration:num","label":"Duration","description":"Transition length in game update frames for picture position, scale, opacity and tone. Use a positive whole number (normally 60 frames is about one second); zero or a negative value applies immediately. Initial choice highlighting and applying deselected settings when showing a picture are immediate regardless of this value.","editorType":"text","nativeDefault":"10","availability":"supported","type":"number","default":10},{"id":"PC-PICTURE-easingType:str","key":"easingType","storageKey":"easingType:str","label":"Easing Type","description":"Transition interpolation curve. Linear has uniform speed; In accelerates from rest, Out decelerates toward the target, and InOut combines both. Sine, Quad, Cubic, Quart, Quint, Expo and Circ choose the curve shape; Back overshoots, Elastic oscillates, Bounce rebounds. Without a Core Engine provider only Linear, InSine, OutSine and InOutSine are supported. Choose a listed name exactly.","editorType":"combo","nativeDefault":"Linear","availability":"supported","type":"string","default":"Linear","suggestions":["Linear","InSine","OutSine","InOutSine","InQuad","OutQuad","InOutQuad","InCubic","OutCubic","InOutCubic","InQuart","OutQuart","InOutQuart","InQuint","OutQuint","InOutQuint","InExpo","OutExpo","InOutExpo","InCirc","OutCirc","InOutCirc","InBack","OutBack","InOutBack","InElastic","OutElastic","InOutElastic","InBounce","OutBounce","InOutBounce"]},{"id":"PC-PICTURE-TargetX:str","key":"TargetX","storageKey":"TargetX:str","label":"Target X","description":"Target X position of the picture origin in pixels, increasing rightward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"320\" or \"this.x() + 20\"; Unchanged preserves the existing target X. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetY:str","key":"TargetY","storageKey":"TargetY:str","label":"Target Y","description":"Target Y position of the picture origin in pixels, increasing downward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"240\" or \"this.y() + 20\"; Unchanged preserves the existing target Y. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleX:str","key":"TargetScaleX","storageKey":"TargetScaleX:str","label":"Target Width %","description":"Target horizontal scale as a percentage of the image width: 100 is original size, 50 is half, 0 collapses width, and negative values mirror horizontally. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target horizontal scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleY:str","key":"TargetScaleY","storageKey":"TargetScaleY:str","label":"Target Height %","description":"Target vertical scale as a percentage of the image height: 100 is original size, 50 is half, 0 collapses height, and negative values mirror vertically. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target vertical scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetOpacity:str","key":"TargetOpacity","storageKey":"TargetOpacity:str","label":"Target Opacity","description":"Target opacity from 0 (transparent) to 255 (fully opaque). Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current target opacity. Choose a value in 0..255; this command does not clamp the expression result.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-BlendMode:num","key":"BlendMode","storageKey":"BlendMode:num","label":"Blend Mode","description":"What kind of blend mode do you wish to apply to the picture?","editorType":"select","nativeDefault":"-1","availability":"supported","type":"number","default":-1,"options":[-1,0,1,2,3],"optionLabels":{"0":"0 - Normal","1":"1 - Additive","2":"2 - Multiply","3":"3 - Screen","-1":"-1 - Unchanged"}},{"id":"PC-PICTURE-TargetToneRed:str","key":"TargetToneRed","storageKey":"TargetToneRed:str","label":"Target Tone Red","description":"Target red tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current red tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGreen:str","key":"TargetToneGreen","storageKey":"TargetToneGreen:str","label":"Target Tone Green","description":"Target green tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current green tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneBlue:str","key":"TargetToneBlue","storageKey":"TargetToneBlue:str","label":"Target Tone Blue","description":"Target blue tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current blue tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGray:str","key":"TargetToneGray","storageKey":"TargetToneGray:str","label":"Target Tone Gray","description":"Target grayscale amount from 0 (original color saturation) to 255 (fully grayscale), clamped to this range. Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current gray tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}}],"default":{"Duration":10,"easingType":"Linear","TargetX":"Unchanged","TargetY":"Unchanged","TargetScaleX":"Unchanged","TargetScaleY":"Unchanged","TargetOpacity":"Unchanged","BlendMode":-1,"TargetToneRed":"Unchanged","TargetToneGreen":"Unchanged","TargetToneBlue":"Unchanged","TargetToneGray":"Unchanged"},"context":"Fill this object inside the command value using its field keys. These settings apply when the matching choice is highlighted. JavaScript expression fields are strings evaluated with this bound to the Game_Picture; Unchanged is a case-insensitive sentinel. This object does not create a choice binding. Use <Bind Picture: 1> in the corresponding Show Choices text for illustrative picture ID 1."},{"id":"PC-ChangePictureChoiceSettingsOne-OnDeselectSettings:struct","key":"OnDeselectSettings","storageKey":"OnDeselectSettings:struct","label":"On Deselect Settings","description":"Picture settings when deselecting that choice.","editorType":"struct<Picture>","nativeDefault":"{\"Easing\":\"\",\"Duration:num\":\"10\",\"easingType:str\":\"Linear\",\"Position\":\"\",\"TargetX:str\":\"Unchanged\",\"TargetY:str\":\"Unchanged\",\"TargetScaleX:str\":\"Unchanged\",\"TargetScaleY:str\":\"Unchanged\",\"Blend\":\"\",\"TargetOpacity:str\":\"Unchanged\",\"BlendMode:num\":\"-1\",\"Tone\":\"\",\"TargetToneRed:str\":\"Unchanged\",\"TargetToneGreen:str\":\"Unchanged\",\"TargetToneBlue:str\":\"Unchanged\",\"TargetToneGray:str\":\"Unchanged\"}","availability":"supported","type":"struct","structName":"Picture","fields":[{"id":"PC-PICTURE-Duration:num","key":"Duration","storageKey":"Duration:num","label":"Duration","description":"Transition length in game update frames for picture position, scale, opacity and tone. Use a positive whole number (normally 60 frames is about one second); zero or a negative value applies immediately. Initial choice highlighting and applying deselected settings when showing a picture are immediate regardless of this value.","editorType":"text","nativeDefault":"10","availability":"supported","type":"number","default":10},{"id":"PC-PICTURE-easingType:str","key":"easingType","storageKey":"easingType:str","label":"Easing Type","description":"Transition interpolation curve. Linear has uniform speed; In accelerates from rest, Out decelerates toward the target, and InOut combines both. Sine, Quad, Cubic, Quart, Quint, Expo and Circ choose the curve shape; Back overshoots, Elastic oscillates, Bounce rebounds. Without a Core Engine provider only Linear, InSine, OutSine and InOutSine are supported. Choose a listed name exactly.","editorType":"combo","nativeDefault":"Linear","availability":"supported","type":"string","default":"Linear","suggestions":["Linear","InSine","OutSine","InOutSine","InQuad","OutQuad","InOutQuad","InCubic","OutCubic","InOutCubic","InQuart","OutQuart","InOutQuart","InQuint","OutQuint","InOutQuint","InExpo","OutExpo","InOutExpo","InCirc","OutCirc","InOutCirc","InBack","OutBack","InOutBack","InElastic","OutElastic","InOutElastic","InBounce","OutBounce","InOutBounce"]},{"id":"PC-PICTURE-TargetX:str","key":"TargetX","storageKey":"TargetX:str","label":"Target X","description":"Target X position of the picture origin in pixels, increasing rightward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"320\" or \"this.x() + 20\"; Unchanged preserves the existing target X. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetY:str","key":"TargetY","storageKey":"TargetY:str","label":"Target Y","description":"Target Y position of the picture origin in pixels, increasing downward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"240\" or \"this.y() + 20\"; Unchanged preserves the existing target Y. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleX:str","key":"TargetScaleX","storageKey":"TargetScaleX:str","label":"Target Width %","description":"Target horizontal scale as a percentage of the image width: 100 is original size, 50 is half, 0 collapses width, and negative values mirror horizontally. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target horizontal scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleY:str","key":"TargetScaleY","storageKey":"TargetScaleY:str","label":"Target Height %","description":"Target vertical scale as a percentage of the image height: 100 is original size, 50 is half, 0 collapses height, and negative values mirror vertically. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target vertical scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetOpacity:str","key":"TargetOpacity","storageKey":"TargetOpacity:str","label":"Target Opacity","description":"Target opacity from 0 (transparent) to 255 (fully opaque). Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current target opacity. Choose a value in 0..255; this command does not clamp the expression result.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-BlendMode:num","key":"BlendMode","storageKey":"BlendMode:num","label":"Blend Mode","description":"What kind of blend mode do you wish to apply to the picture?","editorType":"select","nativeDefault":"-1","availability":"supported","type":"number","default":-1,"options":[-1,0,1,2,3],"optionLabels":{"0":"0 - Normal","1":"1 - Additive","2":"2 - Multiply","3":"3 - Screen","-1":"-1 - Unchanged"}},{"id":"PC-PICTURE-TargetToneRed:str","key":"TargetToneRed","storageKey":"TargetToneRed:str","label":"Target Tone Red","description":"Target red tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current red tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGreen:str","key":"TargetToneGreen","storageKey":"TargetToneGreen:str","label":"Target Tone Green","description":"Target green tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current green tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneBlue:str","key":"TargetToneBlue","storageKey":"TargetToneBlue:str","label":"Target Tone Blue","description":"Target blue tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current blue tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGray:str","key":"TargetToneGray","storageKey":"TargetToneGray:str","label":"Target Tone Gray","description":"Target grayscale amount from 0 (original color saturation) to 255 (fully grayscale), clamped to this range. Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current gray tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}}],"default":{"Duration":10,"easingType":"Linear","TargetX":"Unchanged","TargetY":"Unchanged","TargetScaleX":"Unchanged","TargetScaleY":"Unchanged","TargetOpacity":"Unchanged","BlendMode":-1,"TargetToneRed":"Unchanged","TargetToneGreen":"Unchanged","TargetToneBlue":"Unchanged","TargetToneGray":"Unchanged"},"context":"Fill this object inside the command value using its field keys. These settings apply when another choice is highlighted, so this bound choice is not selected. JavaScript expression fields are strings evaluated with this bound to the Game_Picture; Unchanged is a case-insensitive sentinel. This object does not create a choice binding. Use <Bind Picture: 1> in the corresponding Show Choices text for illustrative picture ID 1."}],"context":"Configure settings before Show Choices. Show Picture creates each image; add <Bind Picture: 1> to its choice text for illustrative ID 1. Cursor highlighting, including initial selection, applies selected settings to matching bound pictures and deselected settings to the others; missing pictures are skipped. Pointer hover highlights and clicking confirms the bound choice. These commands only store settings; they neither show images nor bind choices. Initial highlighting applies instantly. Erase Picture clears that ID, and AutoClear can clear all bindings/settings after confirmation or cancellation. Use whole IDs; lists are rounded/clamped and ranges are clamped/sorted/inclusive within the game picture range. The example uses opacity 255 when selected and 160 when deselected, so the two settings differ with SameCheck enabled; use existing shown and bound pictures 1 (or 1 and 2 for the range).","examples":["picture-choices commands list --target common-event:1 --json","picture-choices commands insert --target common-event:1 --before 0 --command ChangePictureChoiceSettingsOne --value '{\"PictureIDs\":[1],\"OnSelectSettings\":{\"Duration\":10,\"easingType\":\"Linear\",\"TargetX\":\"Unchanged\",\"TargetY\":\"Unchanged\",\"TargetScaleX\":\"Unchanged\",\"TargetScaleY\":\"Unchanged\",\"TargetOpacity\":\"255\",\"BlendMode\":-1,\"TargetToneRed\":\"Unchanged\",\"TargetToneGreen\":\"Unchanged\",\"TargetToneBlue\":\"Unchanged\",\"TargetToneGray\":\"Unchanged\"},\"OnDeselectSettings\":{\"Duration\":10,\"easingType\":\"Linear\",\"TargetX\":\"Unchanged\",\"TargetY\":\"Unchanged\",\"TargetScaleX\":\"Unchanged\",\"TargetScaleY\":\"Unchanged\",\"TargetOpacity\":\"160\",\"BlendMode\":-1,\"TargetToneRed\":\"Unchanged\",\"TargetToneGreen\":\"Unchanged\",\"TargetToneBlue\":\"Unchanged\",\"TargetToneGray\":\"Unchanged\"}}' --expected-hash HASH_FROM_LIST"]},{"id":"PC-C-ChangePictureChoiceSettingsRange","key":"ChangePictureChoiceSettingsRange","label":"Picture Settings: Change Range","description":"Changes select and deselect settings for the picture ID's in range.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"PC-ChangePictureChoiceSettingsRange-StartID:num","key":"StartID","storageKey":"StartID:num","label":"Starting ID","description":"First boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.","editorType":"number","nativeDefault":"1","availability":"supported","type":"number","default":1,"min":1},{"id":"PC-ChangePictureChoiceSettingsRange-EndingID:num","key":"EndingID","storageKey":"EndingID:num","label":"Ending ID","description":"Second boundary of the picture ID range. Both endpoints are included; reversed boundaries are sorted. Use whole IDs; runtime clamps each boundary to 1..$gameScreen.maxPictures(). Fractional boundaries are not rounded: the runtime steps by 1 from the smaller numeric boundary, which can produce fractional picture keys. Use whole IDs for actual pictures.","editorType":"number","nativeDefault":"100","availability":"supported","type":"number","default":100,"min":1},{"id":"PC-ChangePictureChoiceSettingsRange-OnSelectSettings:struct","key":"OnSelectSettings","storageKey":"OnSelectSettings:struct","label":"On Select Settings","description":"Picture settings when selecting that choice.","editorType":"struct<Picture>","nativeDefault":"{\"Easing\":\"\",\"Duration:num\":\"10\",\"easingType:str\":\"Linear\",\"Position\":\"\",\"TargetX:str\":\"Unchanged\",\"TargetY:str\":\"Unchanged\",\"TargetScaleX:str\":\"Unchanged\",\"TargetScaleY:str\":\"Unchanged\",\"Blend\":\"\",\"TargetOpacity:str\":\"Unchanged\",\"BlendMode:num\":\"-1\",\"Tone\":\"\",\"TargetToneRed:str\":\"Unchanged\",\"TargetToneGreen:str\":\"Unchanged\",\"TargetToneBlue:str\":\"Unchanged\",\"TargetToneGray:str\":\"Unchanged\"}","availability":"supported","type":"struct","structName":"Picture","fields":[{"id":"PC-PICTURE-Duration:num","key":"Duration","storageKey":"Duration:num","label":"Duration","description":"Transition length in game update frames for picture position, scale, opacity and tone. Use a positive whole number (normally 60 frames is about one second); zero or a negative value applies immediately. Initial choice highlighting and applying deselected settings when showing a picture are immediate regardless of this value.","editorType":"text","nativeDefault":"10","availability":"supported","type":"number","default":10},{"id":"PC-PICTURE-easingType:str","key":"easingType","storageKey":"easingType:str","label":"Easing Type","description":"Transition interpolation curve. Linear has uniform speed; In accelerates from rest, Out decelerates toward the target, and InOut combines both. Sine, Quad, Cubic, Quart, Quint, Expo and Circ choose the curve shape; Back overshoots, Elastic oscillates, Bounce rebounds. Without a Core Engine provider only Linear, InSine, OutSine and InOutSine are supported. Choose a listed name exactly.","editorType":"combo","nativeDefault":"Linear","availability":"supported","type":"string","default":"Linear","suggestions":["Linear","InSine","OutSine","InOutSine","InQuad","OutQuad","InOutQuad","InCubic","OutCubic","InOutCubic","InQuart","OutQuart","InOutQuart","InQuint","OutQuint","InOutQuint","InExpo","OutExpo","InOutExpo","InCirc","OutCirc","InOutCirc","InBack","OutBack","InOutBack","InElastic","OutElastic","InOutElastic","InBounce","OutBounce","InOutBounce"]},{"id":"PC-PICTURE-TargetX:str","key":"TargetX","storageKey":"TargetX:str","label":"Target X","description":"Target X position of the picture origin in pixels, increasing rightward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"320\" or \"this.x() + 20\"; Unchanged preserves the existing target X. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetY:str","key":"TargetY","storageKey":"TargetY:str","label":"Target Y","description":"Target Y position of the picture origin in pixels, increasing downward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"240\" or \"this.y() + 20\"; Unchanged preserves the existing target Y. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleX:str","key":"TargetScaleX","storageKey":"TargetScaleX:str","label":"Target Width %","description":"Target horizontal scale as a percentage of the image width: 100 is original size, 50 is half, 0 collapses width, and negative values mirror horizontally. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target horizontal scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleY:str","key":"TargetScaleY","storageKey":"TargetScaleY:str","label":"Target Height %","description":"Target vertical scale as a percentage of the image height: 100 is original size, 50 is half, 0 collapses height, and negative values mirror vertically. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target vertical scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetOpacity:str","key":"TargetOpacity","storageKey":"TargetOpacity:str","label":"Target Opacity","description":"Target opacity from 0 (transparent) to 255 (fully opaque). Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current target opacity. Choose a value in 0..255; this command does not clamp the expression result.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-BlendMode:num","key":"BlendMode","storageKey":"BlendMode:num","label":"Blend Mode","description":"What kind of blend mode do you wish to apply to the picture?","editorType":"select","nativeDefault":"-1","availability":"supported","type":"number","default":-1,"options":[-1,0,1,2,3],"optionLabels":{"0":"0 - Normal","1":"1 - Additive","2":"2 - Multiply","3":"3 - Screen","-1":"-1 - Unchanged"}},{"id":"PC-PICTURE-TargetToneRed:str","key":"TargetToneRed","storageKey":"TargetToneRed:str","label":"Target Tone Red","description":"Target red tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current red tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGreen:str","key":"TargetToneGreen","storageKey":"TargetToneGreen:str","label":"Target Tone Green","description":"Target green tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current green tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneBlue:str","key":"TargetToneBlue","storageKey":"TargetToneBlue:str","label":"Target Tone Blue","description":"Target blue tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current blue tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGray:str","key":"TargetToneGray","storageKey":"TargetToneGray:str","label":"Target Tone Gray","description":"Target grayscale amount from 0 (original color saturation) to 255 (fully grayscale), clamped to this range. Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current gray tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}}],"default":{"Duration":10,"easingType":"Linear","TargetX":"Unchanged","TargetY":"Unchanged","TargetScaleX":"Unchanged","TargetScaleY":"Unchanged","TargetOpacity":"Unchanged","BlendMode":-1,"TargetToneRed":"Unchanged","TargetToneGreen":"Unchanged","TargetToneBlue":"Unchanged","TargetToneGray":"Unchanged"},"context":"Fill this object inside the command value using its field keys. These settings apply when the matching choice is highlighted. JavaScript expression fields are strings evaluated with this bound to the Game_Picture; Unchanged is a case-insensitive sentinel. This object does not create a choice binding. Use <Bind Picture: 1> in the corresponding Show Choices text for illustrative picture ID 1."},{"id":"PC-ChangePictureChoiceSettingsRange-OnDeselectSettings:struct","key":"OnDeselectSettings","storageKey":"OnDeselectSettings:struct","label":"On Deselect Settings","description":"Picture settings when deselecting that choice.","editorType":"struct<Picture>","nativeDefault":"{\"Easing\":\"\",\"Duration:num\":\"10\",\"easingType:str\":\"Linear\",\"Position\":\"\",\"TargetX:str\":\"Unchanged\",\"TargetY:str\":\"Unchanged\",\"TargetScaleX:str\":\"Unchanged\",\"TargetScaleY:str\":\"Unchanged\",\"Blend\":\"\",\"TargetOpacity:str\":\"Unchanged\",\"BlendMode:num\":\"-1\",\"Tone\":\"\",\"TargetToneRed:str\":\"Unchanged\",\"TargetToneGreen:str\":\"Unchanged\",\"TargetToneBlue:str\":\"Unchanged\",\"TargetToneGray:str\":\"Unchanged\"}","availability":"supported","type":"struct","structName":"Picture","fields":[{"id":"PC-PICTURE-Duration:num","key":"Duration","storageKey":"Duration:num","label":"Duration","description":"Transition length in game update frames for picture position, scale, opacity and tone. Use a positive whole number (normally 60 frames is about one second); zero or a negative value applies immediately. Initial choice highlighting and applying deselected settings when showing a picture are immediate regardless of this value.","editorType":"text","nativeDefault":"10","availability":"supported","type":"number","default":10},{"id":"PC-PICTURE-easingType:str","key":"easingType","storageKey":"easingType:str","label":"Easing Type","description":"Transition interpolation curve. Linear has uniform speed; In accelerates from rest, Out decelerates toward the target, and InOut combines both. Sine, Quad, Cubic, Quart, Quint, Expo and Circ choose the curve shape; Back overshoots, Elastic oscillates, Bounce rebounds. Without a Core Engine provider only Linear, InSine, OutSine and InOutSine are supported. Choose a listed name exactly.","editorType":"combo","nativeDefault":"Linear","availability":"supported","type":"string","default":"Linear","suggestions":["Linear","InSine","OutSine","InOutSine","InQuad","OutQuad","InOutQuad","InCubic","OutCubic","InOutCubic","InQuart","OutQuart","InOutQuart","InQuint","OutQuint","InOutQuint","InExpo","OutExpo","InOutExpo","InCirc","OutCirc","InOutCirc","InBack","OutBack","InOutBack","InElastic","OutElastic","InOutElastic","InBounce","OutBounce","InOutBounce"]},{"id":"PC-PICTURE-TargetX:str","key":"TargetX","storageKey":"TargetX:str","label":"Target X","description":"Target X position of the picture origin in pixels, increasing rightward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"320\" or \"this.x() + 20\"; Unchanged preserves the existing target X. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetY:str","key":"TargetY","storageKey":"TargetY:str","label":"Target Y","description":"Target Y position of the picture origin in pixels, increasing downward from the top-left of the screen. For an attached picture, coordinates are local to its parent. Enter a numeric JavaScript expression as a string, such as \"240\" or \"this.y() + 20\"; Unchanged preserves the existing target Y. The picture origin remains the one chosen in Show Picture.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleX:str","key":"TargetScaleX","storageKey":"TargetScaleX:str","label":"Target Width %","description":"Target horizontal scale as a percentage of the image width: 100 is original size, 50 is half, 0 collapses width, and negative values mirror horizontally. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target horizontal scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetScaleY:str","key":"TargetScaleY","storageKey":"TargetScaleY:str","label":"Target Height %","description":"Target vertical scale as a percentage of the image height: 100 is original size, 50 is half, 0 collapses height, and negative values mirror vertically. Enter a numeric JavaScript expression as a string, such as \"110\"; Unchanged preserves the current target vertical scale.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetOpacity:str","key":"TargetOpacity","storageKey":"TargetOpacity:str","label":"Target Opacity","description":"Target opacity from 0 (transparent) to 255 (fully opaque). Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current target opacity. Choose a value in 0..255; this command does not clamp the expression result.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-BlendMode:num","key":"BlendMode","storageKey":"BlendMode:num","label":"Blend Mode","description":"What kind of blend mode do you wish to apply to the picture?","editorType":"select","nativeDefault":"-1","availability":"supported","type":"number","default":-1,"options":[-1,0,1,2,3],"optionLabels":{"0":"0 - Normal","1":"1 - Additive","2":"2 - Multiply","3":"3 - Screen","-1":"-1 - Unchanged"}},{"id":"PC-PICTURE-TargetToneRed:str","key":"TargetToneRed","storageKey":"TargetToneRed:str","label":"Target Tone Red","description":"Target red tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current red tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGreen:str","key":"TargetToneGreen","storageKey":"TargetToneGreen:str","label":"Target Tone Green","description":"Target green tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current green tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneBlue:str","key":"TargetToneBlue","storageKey":"TargetToneBlue:str","label":"Target Tone Blue","description":"Target blue tone offset from -255 to 255, clamped to this range: 0 is neutral, positive adds the channel and negative subtracts it. Enter a numeric JavaScript expression as a string, such as \"40\"; Unchanged preserves the current blue tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}},{"id":"PC-PICTURE-TargetToneGray:str","key":"TargetToneGray","storageKey":"TargetToneGray:str","label":"Target Tone Gray","description":"Target grayscale amount from 0 (original color saturation) to 255 (fully grayscale), clamped to this range. Enter a numeric JavaScript expression as a string, such as \"128\"; Unchanged preserves the current gray tone component.","editorType":"text","nativeDefault":"Unchanged","availability":"supported","type":"string","default":"Unchanged","javascript":{"kind":"expression","context":"Game_Picture; Unchanged is a case-insensitive sentinel"}}],"default":{"Duration":10,"easingType":"Linear","TargetX":"Unchanged","TargetY":"Unchanged","TargetScaleX":"Unchanged","TargetScaleY":"Unchanged","TargetOpacity":"Unchanged","BlendMode":-1,"TargetToneRed":"Unchanged","TargetToneGreen":"Unchanged","TargetToneBlue":"Unchanged","TargetToneGray":"Unchanged"},"context":"Fill this object inside the command value using its field keys. These settings apply when another choice is highlighted, so this bound choice is not selected. JavaScript expression fields are strings evaluated with this bound to the Game_Picture; Unchanged is a case-insensitive sentinel. This object does not create a choice binding. Use <Bind Picture: 1> in the corresponding Show Choices text for illustrative picture ID 1."}],"context":"Configure settings before Show Choices. Show Picture creates each image; add <Bind Picture: 1> to its choice text for illustrative ID 1. Cursor highlighting, including initial selection, applies selected settings to matching bound pictures and deselected settings to the others; missing pictures are skipped. Pointer hover highlights and clicking confirms the bound choice. These commands only store settings; they neither show images nor bind choices. Initial highlighting applies instantly. Erase Picture clears that ID, and AutoClear can clear all bindings/settings after confirmation or cancellation. Use whole IDs; lists are rounded/clamped and ranges are clamped/sorted/inclusive within the game picture range. The example uses opacity 255 when selected and 160 when deselected, so the two settings differ with SameCheck enabled; use existing shown and bound pictures 1 (or 1 and 2 for the range).","examples":["picture-choices commands list --target common-event:1 --json","picture-choices commands insert --target common-event:1 --before 0 --command ChangePictureChoiceSettingsRange --value '{\"StartID\":1,\"EndingID\":2,\"OnSelectSettings\":{\"Duration\":10,\"easingType\":\"Linear\",\"TargetX\":\"Unchanged\",\"TargetY\":\"Unchanged\",\"TargetScaleX\":\"Unchanged\",\"TargetScaleY\":\"Unchanged\",\"TargetOpacity\":\"255\",\"BlendMode\":-1,\"TargetToneRed\":\"Unchanged\",\"TargetToneGreen\":\"Unchanged\",\"TargetToneBlue\":\"Unchanged\",\"TargetToneGray\":\"Unchanged\"},\"OnDeselectSettings\":{\"Duration\":10,\"easingType\":\"Linear\",\"TargetX\":\"Unchanged\",\"TargetY\":\"Unchanged\",\"TargetScaleX\":\"Unchanged\",\"TargetScaleY\":\"Unchanged\",\"TargetOpacity\":\"160\",\"BlendMode\":-1,\"TargetToneRed\":\"Unchanged\",\"TargetToneGreen\":\"Unchanged\",\"TargetToneBlue\":\"Unchanged\",\"TargetToneGray\":\"Unchanged\"}}' --expected-hash HASH_FROM_LIST"]}],"commandAliases":["VisuMZ_2_PictureChoices"],"tags":[{"id":"PC-T-BIND","key":"bind-picture","label":"Bind Picture","description":"Place this tag in Show Choices choice text to bind the given picture ID to that choice; the tag is removed from displayed text. Use Show Picture to create the image before choices appear. Hovering the picture highlights its choice; clicking confirms it. A missing picture has no visible/clickable sprite and is skipped for selection effects. Bind IDs within the game picture range; selection effects currently iterate IDs below $gameScreen.maxPictures(), excluding that final ID. The last binding for the same picture wins. Erase Picture and the configured AutoClear behavior clear bindings. The published min/max describe accepted tag syntax, not the available picture slots: the parser stores the ID without clamping. ID 0 and IDs above the game picture maximum do not identify a normal displayed picture.","type":"number","min":0,"max":9007199254740991,"pattern":"<BIND PICTURES?: (\\d+)>","template":"<Bind Picture: {value}>","targets":["choice-text"],"availability":"supported","occurrences":"last binding for each picture","examples":["<Bind Picture: 1>"]},{"id":"PC-T-HIDE","key":"hide-choice-window","label":"Hide Choice Window","description":"Hide the choice window while retaining keyboard and picture input.","type":"string","pattern":"<HIDE CHOICE WINDOW>","targets":["choice-text"],"availability":"supported","occurrences":"any choice hides the window","examples":["<Hide Choice Window>"]}],"methods":[]};
class CoreError extends Error {
    constructor(code, message, details = {}, exitCode = 2) {
        super(message);
        this.code = code;
        this.details = details;
        this.exitCode = exitCode;
    }
}

function valueError(schema, value, path, expected = schema.type) {
    throw new CoreError("INVALID_VALUE", `Invalid value at ${path}; expected ${expected}.`, {
        field: path, received: value, expected,
        hint: schema.id ? `Use core api describe ${schema.id} to inspect accepted values and defaults.` : "Use core api list to inspect accepted parameter values."
    });
}

function validateValue(schema, value, path) {
    if (schema.type === "struct") {
        if (!value || typeof value !== "object" || Array.isArray(value)) valueError(schema, value, path);
        for (const key of Object.keys(value)) {
            const field = schema.fields.find(field => field.key === key);
            if (!field) throw new CoreError("UNKNOWN_FIELD", `Unknown field ${path}/${key}.`, { field: `${path}/${key}` });
            validateValue(field, value[key], `${path}/${key}`);
        }
        for (const field of schema.fields) {
            if (!Object.hasOwn(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
        }
    } else if (schema.type === "array") {
        if (!Array.isArray(value)) valueError(schema, value, path);
        value.forEach((item, index) => validateValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof value !== "number" || !Number.isFinite(value)) valueError(schema, value, path, "a finite number");
        if (schema.integer && !Number.isInteger(value)) valueError(schema, value, path, "an integer");
        if (schema.min !== undefined && value < schema.min) valueError(schema, value, path, `a number >= ${schema.min}`);
        if (schema.max !== undefined && value > schema.max) valueError(schema, value, path, `a number <= ${schema.max}`);
    } else if (schema.type === "boolean" || schema.type === "string") {
        if (typeof value !== schema.type) valueError(schema, value, path);
    } else {
        throw new CoreError("UNSUPPORTED_TYPE", `Unsupported parameter type: ${schema.type}.`, { field: path }, 6);
    }
    const unavailable = schema.unavailableOptions?.find(option => option.value === String(value).trim().toLowerCase());
    if (unavailable) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Value is unavailable at ${path}: ${value}.`, {
            field: path, received: value, availability: unavailable.availability,
            hint: unavailable.reason
        }, 6);
    }
    if (schema.options && !schema.options.includes(value)) valueError(schema, value, path, JSON.stringify(schema.options));
    return value;
}

function parseLayer(raw, path) {
    if (typeof raw !== "string") throw new CoreError("INVALID_ENCODING", `Expected a native string at ${path}.`, { field: path, received: raw });
    try {
        return JSON.parse(raw);
    } catch {
        throw new CoreError("INVALID_ENCODING", `Invalid JSON encoding at ${path}.`, { field: path, received: raw });
    }
}

function decodeValue(schema, raw, path) {
    if (raw === undefined) return validateValue(schema, JSON.parse(JSON.stringify(schema.default)), path);
    let value;
    if (schema.type === "struct") {
        const encoded = parseLayer(raw, path);
        if (!encoded || typeof encoded !== "object" || Array.isArray(encoded)) valueError(schema, encoded, path);
        value = Object.fromEntries(schema.fields.map(field => [field.key,
            decodeValue(field, encoded[field.storageKey], `${path}/${field.key}`)]));
    } else if (schema.type === "array") {
        const encoded = parseLayer(raw, path);
        if (!Array.isArray(encoded)) valueError(schema, encoded, path);
        value = encoded.map((item, index) => decodeValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        value = Number(raw);
    } else if (schema.type === "boolean") {
        if (raw !== "true" && raw !== "false") valueError(schema, raw, path);
        value = raw === "true";
    } else {
        value = schema.encoding === "json" ? parseLayer(raw, path) : raw;
    }
    return validateValue(schema, value, path);
}

function encodeValue(schema, value, path, previous) {
    validateValue(schema, value, path);
    if (schema.type === "struct") {
        const encoded = previous === undefined ? {} : parseLayer(previous, path);
        for (const field of schema.fields) {
            encoded[field.storageKey] = encodeValue(field, value[field.key], `${path}/${field.key}`, encoded[field.storageKey]);
        }
        return JSON.stringify(encoded);
    }
    if (schema.type === "array") {
        const encoded = previous === undefined ? [] : parseLayer(previous, path);
        return JSON.stringify(value.map((item, index) => encodeValue(schema.items, item, `${path}/${index}`, encoded[index])));
    }
    return schema.encoding === "json" ? JSON.stringify(value) : String(value);
}

function parameterAt(parameters, path) {
    if (!path?.startsWith("/") || path === "/") throw new CoreError("INVALID_PATH", "Use a parameter path such as /Gold/GoldMax.", { field: path });
    const segments = path.slice(1).split("/");
    let schema = parameters.find(field => field.key === segments[0]);
    if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
    const chain = [schema];
    for (const segment of segments.slice(1)) {
        schema = schema.type === "struct" ? schema.fields.find(field => field.key === segment) :
            schema.type === "array" && /^(0|[1-9]\d*)$/.test(segment) ? schema.items : undefined;
        if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
        chain.push(schema);
    }
    return { chain, segments };
}

function decodeParameters(parameters, raw) {
    return Object.fromEntries(parameters.map(field => [field.key, decodeValue(field, raw[field.storageKey], `/${field.key}`)]));
}

const configurationSourceField = {
    id: 'CORETO-CONFIG-SOURCE',
    key: 'CoretoConfigSource',
    storageKey: 'CoretoConfigSource',
    label: 'Configuration source',
    description: 'inherit reads the original entry when present; own reads this entry. Switching does not copy values.',
    type: 'string',
    editorType: 'select',
    options: ['inherit', 'own'],
    default: 'inherit',
    nativeDefault: 'inherit',
    availability: 'supported'
};

function configurationSelection(catalog, parameters) {
    if (Object.hasOwn(parameters, 'CoretoConfigSource')) {
        return {configuredSource: parameters.CoretoConfigSource, format: 'canonical', migrationRequired: false};
    }
    const oldVn = catalog.pluginId === 'Coreto_2_VNPictureBusts';
    if (oldVn && Object.hasOwn(parameters, 'ConfigurationSource') && !['own', 'legacy-if-present'].includes(parameters.ConfigurationSource)) {
        const error = new Error('Use own or legacy-if-present for the historical VN selector.');
        error.code = 'INVALID_CONFIGURATION_SOURCE';
        error.exitCode = 2;
        throw error;
    }
    const configuredSource = oldVn && parameters.ConfigurationSource === 'own' ? 'own'
        : ['Coreto_0_CoreEngine', 'Coreto_1_MessageCore'].includes(catalog.pluginId) ? 'own' : 'inherit';
    return {configuredSource, format: oldVn && Object.hasOwn(parameters, 'ConfigurationSource') ? 'vn-legacy' : 'implicit', migrationRequired: true};
}

function resolvePluginConfiguration(catalog, plugins, {errorPrefix = 'CORETO', allowMissingOwn = false} = {}) {
    const ownEntries = plugins.filter(plugin => plugin.name === catalog.pluginId);
    const originalId = catalog.reference?.pluginId ?? 'VisuMZ_0_CoreEngine';
    const originals = plugins.filter(plugin => plugin.name === originalId);
    function fail(suffix, message) {
        const error = new Error(message);
        error.code = `${errorPrefix}_CONFIG_${suffix}`;
        error.exitCode = 2;
        throw error;
    }
    if (ownEntries.length > 1 || originals.length > 1 || (!allowMissingOwn && ownEntries.length !== 1)) {
        fail('DUPLICATE', 'Use one own entry and at most one original entry.');
    }
    const own = ownEntries[0];
    if (own && (!own.parameters || typeof own.parameters !== 'object' || Array.isArray(own.parameters))) {
        fail('ENCODING', 'Expected own parameter object.');
    }
    const selection = own ? configurationSelection(catalog, own.parameters)
        : {configuredSource: 'inherit', format: 'absent', migrationRequired: false};
    if (!configurationSourceField.options.includes(selection.configuredSource)) {
        fail('SOURCE', 'CoretoConfigSource must be inherit or own.');
    }
    const source = selection.configuredSource === 'inherit' && originals.length ? originals[0] : own;
    return {...selection, own, source, effectiveSource: source?.name ?? catalog.pluginId,
        materialized: selection.configuredSource === 'own', rawParameters: source?.parameters ?? {}};
}

function installComplement(catalog, apiName, errorPrefix) {
    function fail(code, message) { throw Object.assign(new Error(message), {code:errorPrefix+'_'+code}); }
    if (Utils.RPGMAKER_NAME !== 'MZ' || Utils.RPGMAKER_VERSION !== '1.10.0') fail('ENGINE_VERSION', 'Use RPG Maker MZ 1.10.0.');
    const active = $plugins.filter(plugin => plugin.status);
    const providers = active.filter(plugin => [catalog.pluginId, catalog.reference.pluginId].includes(plugin.name));
    if (providers.length !== 1 || providers[0].name !== catalog.pluginId || globalThis.Coreto?.[apiName]) fail('DUPLICATE_PROVIDER', 'Enable exactly one '+catalog.namespace+' provider.');
    const own = providers[0];
    for (const alternatives of catalog.dependencies.required) if (!active.some(plugin => alternatives.includes(plugin.name))) fail('DEPENDENCY_MISSING', 'Enable a supported provider: '+alternatives.join(' or ')+'.');
    if (active.some(plugin => catalog.orderAfter.includes(plugin.name) && active.indexOf(plugin) > active.indexOf(own))) fail('PLUGIN_ORDER', 'Place '+catalog.namespace+' after its dependencies.');
    for (const supported of [catalog.dependencies.cores, catalog.dependencies.messages]) {
        const entries = active.filter(plugin => Object.hasOwn(supported, plugin.name));
        if (entries.length > 1) fail('DEPENDENCY_DUPLICATE', 'Enable at most one provider per dependency.');
        for (const entry of entries) {
            if (active.indexOf(entry) > active.indexOf(own)) fail('PLUGIN_ORDER', 'Place '+entry.name+' before '+catalog.namespace+'.');
            const versionMatches = entry.name === 'Coreto_0_CoreEngine' ? globalThis.Coreto?.CoreEngine?.version === supported[entry.name] : entry.description.includes('[Version '+supported[entry.name]+']');
            if (!versionMatches) fail('DEPENDENCY_VERSION', 'Use '+entry.name+' '+supported[entry.name]+'.');
        }
    }
    if (active.some(plugin => catalog.orderBefore.includes(plugin.name) && active.indexOf(plugin) < active.indexOf(own))) fail('PLUGIN_ORDER', 'Place '+catalog.namespace+' before its consumers.');
    const filename = decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if (filename !== catalog.pluginId+'.js') fail('FILENAME', 'Keep the filename '+catalog.pluginId+'.js.');
    const source = resolvePluginConfiguration(catalog, $plugins, {errorPrefix});
    const settings = {};
    for (const field of catalog.parameters.filter(field => field.key !== 'CoretoConfigSource')) {
        try {
            settings[field.key] = decodeValue(field, source.rawParameters[field.storageKey], field.storageKey);
        } catch (error) {
            if (!(error instanceof CoreError)) throw error;
            throw Object.assign(new Error(error.message, {cause:error}), {code:errorPrefix+'_CONFIG_VALUE',field:field.storageKey});
        }
    }
    const api = {pluginId:catalog.pluginId,version:catalog.version,...source,settings};
    globalThis.Coreto ??= {};
    Coreto[apiName] = api;
    return api;
}

const pictureChoicesApi = installComplement(catalog, 'PictureChoices', 'PC');

const pictureChoiceFields = catalog.commands.find(command => command.key === 'ChangePictureChoiceSettingsOne').args.find(field => field.key === 'OnSelectSettings').fields;
function pictureChoiceState(screen) {
    screen._pictureChoiceBinding ??= {};
    screen._pictureChoiceSelected ??= {};
    screen._pictureChoiceDeselected ??= {};
}
Game_Screen.prototype.clearPictureChoices = function() {
    this._pictureChoiceBinding = {};
    this._pictureChoiceSelected = {};
    this._pictureChoiceDeselected = {};
};
Game_Screen.prototype.clearPictureChoiceID = function(id) {
    pictureChoiceState(this);
    delete this._pictureChoiceBinding[id];
    delete this._pictureChoiceSelected[id];
    delete this._pictureChoiceDeselected[id];
};
Game_Screen.prototype.getPictureChoiceBinding = function(id) {
    pictureChoiceState(this);
    return this._pictureChoiceBinding[id] ?? -2;
};
Game_Screen.prototype.addPictureChoiceBinding = function(id, index) {
    pictureChoiceState(this);
    this._pictureChoiceBinding[id] = index;
};
for (const [kind, state] of [['Selected','_pictureChoiceSelected'],['Deselected','_pictureChoiceDeselected']]) {
    Game_Screen.prototype['getPictureChoice'+kind+'Settings'] = function(id) {
        pictureChoiceState(this);
        const settings = this[state][id] ??= {};
        for (const field of pictureChoiceFields) if (settings[field.key] === undefined) settings[field.key] = field.default;
        return settings;
    };
    Game_Screen.prototype['setPictureChoice'+kind+'Settings'] = function(id, settings) {
        pictureChoiceState(this);
        this[state][id] = {...settings};
    };
}
for (const [action,kind] of [['Select','Selected'],['Deselect','Deselected']]) {
    Game_Screen.prototype['applyPictureChoice'+action+'Settings'] = function(id, instant) {
        const picture = this.picture(id);
        if (picture) picture.applyPictureChoiceSettings(this['getPictureChoice'+kind+'Settings'](id), instant);
    };
}
const initializePictureChoiceScreen = Game_Screen.prototype.initialize;
Game_Screen.prototype.initialize = function(...args) {
    const result = initializePictureChoiceScreen.apply(this, args);
    this.clearPictureChoices();
    return result;
};
const erasePictureChoice = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function(id) {
    const result = erasePictureChoice.call(this, id);
    this.clearPictureChoiceID(id);
    return result;
};
const showPictureChoice = Game_Screen.prototype.showPicture;
Game_Screen.prototype.showPicture = function(id, ...args) {
    const result = showPictureChoice.call(this, id, ...args);
    if (this._pictureChoiceDeselected?.[id]) this.applyPictureChoiceDeselectSettings(id, true);
    return result;
};
Game_Picture.prototype.applyPictureChoiceSettings = function(settings, instant) {
    const unchanged = key => String(settings[key]).toUpperCase() === 'UNCHANGED';
    const value = (key, current) => unchanged(key) ? current : eval(settings[key]);
    if (globalThis.Coreto?.CoreEngine || globalThis.Imported?.VisuMZ_0_CoreEngine) this.setEasingType(settings.easingType);
    else this._easingType = ['Linear','InSine','OutSine','InOutSine'].indexOf(settings.easingType);
    this._targetX = value('TargetX', this._targetX);
    this._targetY = value('TargetY', this._targetY);
    this._targetScaleX = value('TargetScaleX', this._targetScaleX);
    this._targetScaleY = value('TargetScaleY', this._targetScaleY);
    this._targetOpacity = value('TargetOpacity', this._targetOpacity);
    if (settings.BlendMode !== -1) this._blendMode = settings.BlendMode;
    this._tone ??= [0,0,0,0];
    const toneKeys = ['Red','Green','Blue','Gray'].map(color => 'TargetTone'+color);
    this._toneTarget = toneKeys.map((key,index) => value(key, this._tone[index]).clamp(index === 3 ? 0 : -255, 255));
    const immediate = instant || settings.Duration <= 0;
    const duration = immediate ? 1 : settings.Duration;
    this._duration = duration;
    this._wholeDuration = duration;
    if (toneKeys.some(key => !unchanged(key))) this._toneDuration = duration;
    if (immediate) this.update();
};
function pictureChoiceCommandSettings(raw) {
    const encoded = JSON.parse(raw);
    return Object.fromEntries(pictureChoiceFields.map(field => [field.key, encoded[field.storageKey] === undefined ? field.default : field.type === 'number' ? Number(encoded[field.storageKey]) : encoded[field.storageKey]]));
}
function pictureChoiceIds(command, args) {
    const maximum = $gameScreen.maxPictures();
    if (command.endsWith('ID') || command.endsWith('One')) return JSON.parse(args['PictureIDs:arraynum']).map(Number).map(id => Math.round(id).clamp(1, maximum));
    const start = Number(args['StartID:num']).clamp(1, maximum), end = Number(args['EndingID:num']).clamp(1, maximum);
    return Array.from({length:Math.abs(end-start)+1}, (_,index) => Math.min(start,end)+index);
}
for (const namespace of [catalog.pluginId, catalog.reference.pluginId]) {
    for (const command of catalog.commands) PluginManager.registerCommand(namespace, command.key, function(args) {
        const native = {...Object.fromEntries(command.args.map(field => [field.storageKey,field.nativeDefault])),...args};
        if (command.key === 'ClearAll') return $gameScreen.clearPictureChoices();
        const ids = pictureChoiceIds(command.key, native);
        if (command.key.startsWith('Clear')) {
            for (const id of ids) $gameScreen.clearPictureChoiceID(id);
            return;
        }
        const selected = pictureChoiceCommandSettings(native['OnSelectSettings:struct']);
        const deselected = pictureChoiceCommandSettings(native['OnDeselectSettings:struct']);
        for (const id of ids) {
            $gameScreen.setPictureChoiceSelectedSettings(id, selected);
            $gameScreen.setPictureChoiceDeselectedSettings(id, deselected);
        }
        if (pictureChoicesApi.settings.SameCheck && Utils.isOptionValid('test') && JSON.stringify(selected) === JSON.stringify(deselected)) {
            alert('Picture Choices: use different On Select and On Deselect settings to produce a visible change.');
            SceneManager.exit();
        }
    });
}

Window_ChoiceList.prototype.applyHideChoiceWindow = function() {
    this._pictureChoicesHidden = false;
    for (const command of this._list) command.name = command.name.replace(/<HIDE CHOICE WINDOW>/gi, () => {
        this._pictureChoicesHidden = true;
        return '';
    }).trim();
    this.scale.set(this._pictureChoicesHidden ? 0 : 1);
};
Window_ChoiceList.prototype.applyPictureChoiceBindings = function() {
    for (const [index,command] of this._list.entries()) command.name = command.name.replace(/<BIND PICTURES?: (\d+)>/gi, (_,id) => {
        $gameScreen.addPictureChoiceBinding(Number(id), index);
        return '';
    }).trim();
};
const makePictureChoiceList = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makePictureChoiceList.apply(this, args);
    this.applyHideChoiceWindow();
    this.applyPictureChoiceBindings();
    return result;
};
Window_ChoiceList.prototype.autoClearPictureChoices = function() {
    if (pictureChoicesApi.settings.AutoClear) $gameScreen.clearPictureChoices();
};
for (const name of ['callOkHandler','callCancelHandler']) {
    const original = Window_ChoiceList.prototype[name];
    Window_ChoiceList.prototype[name] = function(...args) {
        const result = original.apply(this, args);
        this.autoClearPictureChoices();
        return result;
    };
}
Window_ChoiceList.prototype.onSelectPictureChoices = function(index) {
    for (let id = 0; id < $gameScreen.maxPictures(); id++) {
        const binding = $gameScreen.getPictureChoiceBinding(id);
        if (binding < 0 || !$gameScreen.picture(id)) continue;
        if (binding === index) $gameScreen.applyPictureChoiceSelectSettings(id, this._instantPictureChoiceSelect);
        else $gameScreen.applyPictureChoiceDeselectSettings(id, this._instantPictureChoiceSelect);
    }
};
const selectPictureChoice = Object.hasOwn(Window_ChoiceList.prototype, 'select') ? Window_ChoiceList.prototype.select : null;
Window_ChoiceList.prototype.select = function(index) {
    // Keep inherited dispatch live: later consumers extend Window_Selectable.select.
    const result = (selectPictureChoice ?? Window_Command.prototype.select).call(this, index);
    this.onSelectPictureChoices(index);
    return result;
};
const selectDefaultPictureChoice = Window_ChoiceList.prototype.selectDefault;
Window_ChoiceList.prototype.selectDefault = function(...args) {
    this._instantPictureChoiceSelect = true;
    const result = selectDefaultPictureChoice.apply(this, args);
    this._instantPictureChoiceSelect = undefined;
    return result;
};
Window_ChoiceList.prototype.pictureChoiceSelect = function(index) {
    const previous = this.index();
    this.select(index);
    if (this.index() !== previous) this.playCursorSound();
};
function pictureChoiceWindow(sprite) {
    if (!(sprite instanceof Sprite_Picture)) return null;
    const window = SceneManager._scene?._choiceListWindow;
    if (!window?.active || $gameScreen.getPictureChoiceBinding(sprite._pictureId) < 0) return null;
    return window;
}
Sprite_Clickable.prototype.hasPictureChoiceBinding = function() { return !!pictureChoiceWindow(this); };
Sprite_Clickable.prototype.onMouseEnterPictureChoice = function() {
    const window = pictureChoiceWindow(this);
    if (window) window.pictureChoiceSelect($gameScreen.getPictureChoiceBinding(this._pictureId));
};
Sprite_Clickable.prototype.onClickPictureChoice = function() {
    const window = pictureChoiceWindow(this);
    if (window) {
        window.pictureChoiceSelect($gameScreen.getPictureChoiceBinding(this._pictureId));
        window.processOk();
    }
};
for (const [name,action] of [['onMouseEnter','onMouseEnterPictureChoice'],['onClick','onClickPictureChoice']]) {
    const original = Sprite_Clickable.prototype[name];
    Sprite_Clickable.prototype[name] = function(...args) {
        const result = original.apply(this, args);
        this[action]();
        return result;
    };
}
globalThis.Imported ??= {};
Imported.Coreto_2_PictureChoices = true;
Imported.VisuMZ_2_PictureChoices = true;
globalThis.VisuMZ ??= {};
VisuMZ.PictureChoices = {version:Number(catalog.reference.version),Settings:pictureChoicesApi.settings};

})();
