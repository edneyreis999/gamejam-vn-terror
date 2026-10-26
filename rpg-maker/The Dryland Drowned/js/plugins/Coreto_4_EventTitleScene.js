/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 4] [Version 0.1.0] [EventTitleScene]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter VisuMZ_2_PictureChoices
 * @orderAfter Coreto_2_VNPictureBusts
 * @orderAfter VisuMZ_2_VNPictureBusts
 * @orderAfter Coreto_3_ChoiceCmnEvts
 * @orderAfter VisuMZ_3_ChoiceCmnEvts
 * @orderAfter Coreto_1_OptionsCore
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter Coreto_1_SaveCore
 * @orderAfter VisuMZ_1_SaveCore
 * @orderAfter Coreto_4_AttachedPictures
 * @orderAfter VisuMZ_4_AttachedPictures
 * @orderBefore Coreto_4_MessageVisibility
 * @orderBefore VisuMZ_4_MessageVisibility
 * @help
 * Use a map as the title scene. Author an autorun with NewGame, LoadScreen and Options commands.
 * The <Continue> choice tag disables a choice when no save exists.
 * Disable VisuMZ_4_EventTitleScene. Core, Message, Options and Save are optional.
 * CoretoConfigSource selects inherit or own configuration. See coreto/README.md and the event-title-scene CLI namespace.
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
 * @param MapID:num
 * @text Map ID
 * @type number
 * @desc Existing map used whenever the normal title scene is entered. The plugin starts fresh temporary new-game state and transfers the player to MapID at MapX/MapY; map events provide the title interface instead of the native title command window.
 * @default 1
 * @min 1
 * @max 999
 *
 * @param MapX:num
 * @text Map X
 * @type number
 * @desc Player starting X tile coordinate (column, increasing to the right) on the map selected by MapID when the evented title scene starts.
 * @default 10
 * @min 0
 * @max 255
 *
 * @param MapY:num
 * @text Map Y
 * @type number
 * @desc Player starting Y tile coordinate (row, increasing downward) on the map selected by MapID when the evented title scene starts.
 * @default 10
 * @min 0
 * @max 255
 *
 * @param FaceDirection:num
 * @text Face Direction
 * @type select
 * @desc Initial player facing passed to the title-map transfer: 2 down, 4 left, 6 right, 8 up; 1 down-left, 3 down-right, 7 up-left and 9 up-right request diagonals. Use 2/4/6/8 for ordinary native four-direction character sheets. Diagonal rendering needs a compatible movement/sprite provider; Coreto Events Move supports a [VS8] sheet (events-move api describe EV-P-VS8), and converts diagonals to cardinal facing for ordinary sheets. This affects facing, not the transfer coordinates.
 * @default 2
 * @option Down Left
 * @value 1
 * @option Down
 * @value 2
 * @option Down Right
 * @value 3
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up Left
 * @value 7
 * @option Up
 * @value 8
 * @option Up Right
 * @value 9
 *
 * @param PlayerTransparent:eval
 * @text Transparent?
 * @type boolean
 * @desc When true, hide the player character on the title map; when false, show the configured party leader sprite. This does not remove the player, disable event interaction or control movement (see ET-P-CanInputMove:eval). Native followers copy player transparency, so true also prevents visible followers even when ShowFollowers is enabled.
 * @default true
 * @on Transparent
 * @off Opaque
 *
 * @param CanInputMove:eval
 * @text Can Input Move?
 * @type boolean
 * @desc When true, allow the normal player directional and map-touch movement checks on the title map; events or other native restrictions can still block movement. When false, suppress player direction input and map-touch destinations there. Scripted movement/routes are not disabled. This setting does not enable menu input or encounters.
 * @default false
 * @on Allow
 * @off Disallow
 *
 * @param ShowFollowers:eval
 * @text Show Followers?
 * @type boolean
 * @desc When true, enable the follower group on the title map; visible followers still require additional party battle members and PlayerTransparent=false. When false, hide the follower group. It does not add party actors or override each follower copying the player transparency.
 * @default false
 * @on Show
 * @off Hide
 *
 * @command NewGame
 * @text System: Start New Game
 * @desc Discard current game state and start a new game at the database starting position, not the title MapID. With Save Core locked style, first reset state and open the save-slot picker; selecting a slot starts that new game, while cancelling returns to a fresh title map when called there. Without locked style, use the transition scene to reset and enter Scene_Map. No save file is written by this command itself.
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @desc JavaScript expression encoded as a JSON string, such as "true", "false" or "$gameSwitches.value(1)". A truthy result calls the current scene fadeOutAll before changing scene; false skips this extra fade and leaves any destination-scene transition behavior intact. Native fadeOutAll fades screen, BGM, BGS and ME over slowFadeSpeed (normally 48 update frames, about 0.8 seconds at 60 updates/s).
 * @default true
 * @on Slow
 * @off Normal
 *
 * @command LoadScreen
 * @text System: Open Load Scene
 * @desc With standard/locked save style (or no Save Core), push Scene_Load for slot selection; cancelling returns to the previous scene class, rebuilding fresh title-map state when invoked from the title. With Save Core single style, attempt slot 0 directly instead of showing a slot list. Missing saves report load failure; a failed asynchronous load returns to a fresh evented title map. A successful load restores the saved game and enters Scene_Map.
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @desc JavaScript expression encoded as a JSON string, such as "true", "false" or "$gameSwitches.value(1)". A truthy result calls the current scene fadeOutAll before changing scene; false skips this extra fade and leaves any destination-scene transition behavior intact. Native fadeOutAll fades screen, BGM, BGS and ME over slowFadeSpeed (normally 48 update frames, about 0.8 seconds at 60 updates/s).
 * @default false
 * @on Slow
 * @off Normal
 *
 * @command Options
 * @text System: Open Options Scene
 * @desc Push Scene_Options; closing it returns to the previous scene class. If that class is the evented title, it is rebuilt with fresh title-map state. Options changes follow ConfigManager persistence.
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @desc JavaScript expression encoded as a JSON string, such as "true", "false" or "$gameSwitches.value(1)". A truthy result calls the current scene fadeOutAll before changing scene; false skips this extra fade and leaves any destination-scene transition behavior intact. Native fadeOutAll fades screen, BGM, BGS and ME over slowFadeSpeed (normally 48 update frames, about 0.8 seconds at 60 updates/s).
 * @default false
 * @on Slow
 * @off Normal
 *
 */



(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_4_EventTitleScene","namespace":"event-title-scene","version":"0.1.0","reference":{"pluginId":"VisuMZ_4_EventTitleScene","version":"1.06"},"dependencies":{"required":[],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.57"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_MessageCore","VisuMZ_1_MessageCore","Coreto_2_PictureChoices","VisuMZ_2_PictureChoices","Coreto_2_VNPictureBusts","VisuMZ_2_VNPictureBusts","Coreto_3_ChoiceCmnEvts","VisuMZ_3_ChoiceCmnEvts","Coreto_1_OptionsCore","VisuMZ_1_OptionsCore","Coreto_1_SaveCore","VisuMZ_1_SaveCore","Coreto_4_AttachedPictures","VisuMZ_4_AttachedPictures"],"orderBefore":["Coreto_4_MessageVisibility","VisuMZ_4_MessageVisibility"],"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"ET-P-MapID:num","key":"MapID","storageKey":"MapID:num","label":"Map ID","description":"Existing map used whenever the normal title scene is entered. The plugin starts fresh temporary new-game state and transfers the player to MapID at MapX/MapY; map events provide the title interface instead of the native title command window.","type":"number","editorType":"number","nativeDefault":"1","default":1,"availability":"supported","min":1,"max":999,"context":"Enable Coreto_4_EventTitleScene 0.1.0 with event-title-scene install after its optional providers/consumers have been arranged; the bundle must already be delivered. install selects this provider instead of VisuMZ_4_EventTitleScene and preserves other provider selections. Restart the game after configuration changes. Core Engine and Message Core are optional: if used, enable one supported provider of each before this plugin (Coreto_0_CoreEngine 0.1.0 / VisuMZ_0_CoreEngine 1.90; Coreto_1_MessageCore 0.1.0 / VisuMZ_1_MessageCore 1.57). Place it after active Options Core, Save Core, Picture Choices, VN Picture Busts, Choice Common Events and Attached Pictures, and before Message Visibility. The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. Choose a whole map database ID in 1..999 from data/MapInfos.json with a corresponding data/MapNNN.json file, for example Map001.json for ID 1. The schema accepts fractional numbers but those do not identify a normal map file. The selected map must contain your title UI events (for example an Autorun Show Choices event calling ET-C-NewGame, ET-C-LoadScreen and ET-C-Options). Check MapX/MapY against its dimensions. Returning from Options or cancelling Load into the title reconstructs this map with fresh game state; changes made during the previous title visit are discarded. Title-map autosave, random encounters, normal menu input and debug input are disabled. This does not replace the database starting map used by NewGame. The CLI edits configuration and does not create the map or its events."},{"id":"ET-P-MapX:num","key":"MapX","storageKey":"MapX:num","label":"Map X","description":"Player starting X tile coordinate (column, increasing to the right) on the map selected by MapID when the evented title scene starts.","type":"number","editorType":"number","nativeDefault":"10","default":10,"availability":"supported","min":0,"max":255,"context":"Use a whole tile coordinate with zero at the top-left tile of the selected map. Choose a tile inside that map as well as within the published numeric limits. This sets the player transfer destination, not a pixel offset of the title artwork. The paired MapX/MapY parameters determine the destination even when PlayerTransparent hides the player. The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. See event-title-scene api describe ET-P-MapID:num for activation, map selection and title-state reset on reentry. This parameter is applied when the title map is prepared; runtime event commands may subsequently change player state."},{"id":"ET-P-MapY:num","key":"MapY","storageKey":"MapY:num","label":"Map Y","description":"Player starting Y tile coordinate (row, increasing downward) on the map selected by MapID when the evented title scene starts.","type":"number","editorType":"number","nativeDefault":"10","default":10,"availability":"supported","min":0,"max":255,"context":"Use a whole tile coordinate with zero at the top-left tile of the selected map. Choose a tile inside that map as well as within the published numeric limits. This sets the player transfer destination, not a pixel offset of the title artwork. The paired MapX/MapY parameters determine the destination even when PlayerTransparent hides the player. The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. See event-title-scene api describe ET-P-MapID:num for activation, map selection and title-state reset on reentry. This parameter is applied when the title map is prepared; runtime event commands may subsequently change player state."},{"id":"ET-P-FaceDirection:num","key":"FaceDirection","storageKey":"FaceDirection:num","label":"Face Direction","description":"Initial player facing passed to the title-map transfer: 2 down, 4 left, 6 right, 8 up; 1 down-left, 3 down-right, 7 up-left and 9 up-right request diagonals. Use 2/4/6/8 for ordinary native four-direction character sheets. Diagonal rendering needs a compatible movement/sprite provider; Coreto Events Move supports a [VS8] sheet (events-move api describe EV-P-VS8), and converts diagonals to cardinal facing for ordinary sheets. This affects facing, not the transfer coordinates.","type":"number","editorType":"select","nativeDefault":"2","default":2,"availability":"supported","options":[1,2,3,4,6,7,8,9],"optionLabels":{"1":"Down Left","2":"Down","3":"Down Right","4":"Left","6":"Right","7":"Up Left","8":"Up","9":"Up Right"},"context":" The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. See event-title-scene api describe ET-P-MapID:num for activation, map selection and title-state reset on reentry. This parameter is applied when the title map is prepared; runtime event commands may subsequently change player state."},{"id":"ET-P-PlayerTransparent:eval","key":"PlayerTransparent","storageKey":"PlayerTransparent:eval","label":"Transparent?","description":"When true, hide the player character on the title map; when false, show the configured party leader sprite. This does not remove the player, disable event interaction or control movement (see ET-P-CanInputMove:eval). Native followers copy player transparency, so true also prevents visible followers even when ShowFollowers is enabled.","type":"boolean","editorType":"boolean","nativeDefault":"true","default":true,"availability":"supported","on":"Transparent","off":"Opaque","context":" The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. See event-title-scene api describe ET-P-MapID:num for activation, map selection and title-state reset on reentry. This parameter is applied when the title map is prepared; runtime event commands may subsequently change player state."},{"id":"ET-P-CanInputMove:eval","key":"CanInputMove","storageKey":"CanInputMove:eval","label":"Can Input Move?","description":"When true, allow the normal player directional and map-touch movement checks on the title map; events or other native restrictions can still block movement. When false, suppress player direction input and map-touch destinations there. Scripted movement/routes are not disabled. This setting does not enable menu input or encounters.","type":"boolean","editorType":"boolean","nativeDefault":"false","default":false,"availability":"supported","on":"Allow","off":"Disallow","context":" The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. See event-title-scene api describe ET-P-MapID:num for activation, map selection and title-state reset on reentry. This parameter is applied when the title map is prepared; runtime event commands may subsequently change player state."},{"id":"ET-P-ShowFollowers:eval","key":"ShowFollowers","storageKey":"ShowFollowers:eval","label":"Show Followers?","description":"When true, enable the follower group on the title map; visible followers still require additional party battle members and PlayerTransparent=false. When false, hide the follower group. It does not add party actors or override each follower copying the player transparency.","type":"boolean","editorType":"boolean","nativeDefault":"false","default":false,"availability":"supported","on":"Show","off":"Hide","context":" The CLI edits js/plugins.js for the next game boot; it does not change an already running game. parameters reset and missing native values use this entry's published default. parameters get reports the effective value; event-title-scene api describe CORETO-CONFIG-SOURCE explains inherit/own. See event-title-scene api describe ET-P-MapID:num for activation, map selection and title-state reset on reentry. This parameter is applied when the title map is prepared; runtime event commands may subsequently change player state."}],"commands":[{"id":"ET-C-NewGame","key":"NewGame","label":"System: Start New Game","description":"Discard current game state and start a new game at the database starting position, not the title MapID. With Save Core locked style, first reset state and open the save-slot picker; selecting a slot starts that new game, while cancelling returns to a fresh title map when called there. Without locked style, use the transition scene to reset and enter Scene_Map. No save file is written by this command itself.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"ET-NewGame-SlowFade:eval","key":"SlowFade","storageKey":"SlowFade:eval","label":"Slow Fade Out?","description":"JavaScript expression encoded as a JSON string, such as \"true\", \"false\" or \"$gameSwitches.value(1)\". A truthy result calls the current scene fadeOutAll before changing scene; false skips this extra fade and leaves any destination-scene transition behavior intact. Native fadeOutAll fades screen, BGM, BGS and ME over slowFadeSpeed (normally 48 update frames, about 0.8 seconds at 60 updates/s).","type":"string","editorType":"boolean","nativeDefault":"true","default":"true","availability":"supported","javascript":{"kind":"expression","receiver":"Game_Interpreter executing the plugin command","arguments":[],"bindings":["this: Game_Interpreter","RPG Maker runtime globals, e.g. $gameSwitches"],"returnType":"boolean (consumed by JavaScript truthiness)","context":"Evaluated once when the event command executes, before scene selection. No callback arguments or local bindings are supplied. The CLI compiles syntax only; runtime errors propagate. A truthy result invokes currentScene.fadeOutAll; the expression does not choose the destination scene."},"on":"Slow","off":"Normal","context":"Argument of event-title-scene api describe ET-C-NewGame. This is authored as a string even though the editor presents a boolean. The CLI validates syntax without evaluating it; use a boolean result. The transition itself still occurs for false."}],"context":"Enable Coreto_4_EventTitleScene 0.1.0 with event-title-scene install after its optional providers/consumers have been arranged; the bundle must already be delivered. install selects this provider instead of VisuMZ_4_EventTitleScene and preserves other provider selections. Restart the game after configuration changes. Core Engine and Message Core are optional: if used, enable one supported provider of each before this plugin (Coreto_0_CoreEngine 0.1.0 / VisuMZ_0_CoreEngine 1.90; Coreto_1_MessageCore 0.1.0 / VisuMZ_1_MessageCore 1.57). Place it after active Options Core, Save Core, Picture Choices, VN Picture Busts, Choice Common Events and Attached Pictures, and before Message Visibility. The command runs when the game interpreter reaches the authored 357 Plugin Command, including when called outside the title map. SlowFade is a JavaScript expression string; see event-title-scene api describe ET-NewGame-SlowFade:eval. Optional save modes are configured by save api describe SAV-META-031 (/Save/SaveStyle); enable a supported Save Core before Event Title Scene to use locked/single behavior. Use event-title-scene api describe ET-P-MapID:num for title-map preparation and reentry. The generated common-event:1 example is illustrative: choose an existing target/index and result.fileHash from commands list. On insert an omitted SlowFade uses the published default; on update it retains the existing value."},{"id":"ET-C-LoadScreen","key":"LoadScreen","label":"System: Open Load Scene","description":"With standard/locked save style (or no Save Core), push Scene_Load for slot selection; cancelling returns to the previous scene class, rebuilding fresh title-map state when invoked from the title. With Save Core single style, attempt slot 0 directly instead of showing a slot list. Missing saves report load failure; a failed asynchronous load returns to a fresh evented title map. A successful load restores the saved game and enters Scene_Map.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"ET-LoadScreen-SlowFade:eval","key":"SlowFade","storageKey":"SlowFade:eval","label":"Slow Fade Out?","description":"JavaScript expression encoded as a JSON string, such as \"true\", \"false\" or \"$gameSwitches.value(1)\". A truthy result calls the current scene fadeOutAll before changing scene; false skips this extra fade and leaves any destination-scene transition behavior intact. Native fadeOutAll fades screen, BGM, BGS and ME over slowFadeSpeed (normally 48 update frames, about 0.8 seconds at 60 updates/s).","type":"string","editorType":"boolean","nativeDefault":"false","default":"false","availability":"supported","javascript":{"kind":"expression","receiver":"Game_Interpreter executing the plugin command","arguments":[],"bindings":["this: Game_Interpreter","RPG Maker runtime globals, e.g. $gameSwitches"],"returnType":"boolean (consumed by JavaScript truthiness)","context":"Evaluated once when the event command executes, before scene selection. No callback arguments or local bindings are supplied. The CLI compiles syntax only; runtime errors propagate. A truthy result invokes currentScene.fadeOutAll; the expression does not choose the destination scene."},"on":"Slow","off":"Normal","context":"Argument of event-title-scene api describe ET-C-LoadScreen. This is authored as a string even though the editor presents a boolean. The CLI validates syntax without evaluating it; use a boolean result. The transition itself still occurs for false."}],"context":"Enable Coreto_4_EventTitleScene 0.1.0 with event-title-scene install after its optional providers/consumers have been arranged; the bundle must already be delivered. install selects this provider instead of VisuMZ_4_EventTitleScene and preserves other provider selections. Restart the game after configuration changes. Core Engine and Message Core are optional: if used, enable one supported provider of each before this plugin (Coreto_0_CoreEngine 0.1.0 / VisuMZ_0_CoreEngine 1.90; Coreto_1_MessageCore 0.1.0 / VisuMZ_1_MessageCore 1.57). Place it after active Options Core, Save Core, Picture Choices, VN Picture Busts, Choice Common Events and Attached Pictures, and before Message Visibility. The command runs when the game interpreter reaches the authored 357 Plugin Command, including when called outside the title map. SlowFade is a JavaScript expression string; see event-title-scene api describe ET-LoadScreen-SlowFade:eval. Optional save modes are configured by save api describe SAV-META-031 (/Save/SaveStyle); enable a supported Save Core before Event Title Scene to use locked/single behavior. Use event-title-scene api describe ET-P-MapID:num for title-map preparation and reentry. The generated common-event:1 example is illustrative: choose an existing target/index and result.fileHash from commands list. On insert an omitted SlowFade uses the published default; on update it retains the existing value."},{"id":"ET-C-Options","key":"Options","label":"System: Open Options Scene","description":"Push Scene_Options; closing it returns to the previous scene class. If that class is the evented title, it is rebuilt with fresh title-map state. Options changes follow ConfigManager persistence.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"ET-Options-SlowFade:eval","key":"SlowFade","storageKey":"SlowFade:eval","label":"Slow Fade Out?","description":"JavaScript expression encoded as a JSON string, such as \"true\", \"false\" or \"$gameSwitches.value(1)\". A truthy result calls the current scene fadeOutAll before changing scene; false skips this extra fade and leaves any destination-scene transition behavior intact. Native fadeOutAll fades screen, BGM, BGS and ME over slowFadeSpeed (normally 48 update frames, about 0.8 seconds at 60 updates/s).","type":"string","editorType":"boolean","nativeDefault":"false","default":"false","availability":"supported","javascript":{"kind":"expression","receiver":"Game_Interpreter executing the plugin command","arguments":[],"bindings":["this: Game_Interpreter","RPG Maker runtime globals, e.g. $gameSwitches"],"returnType":"boolean (consumed by JavaScript truthiness)","context":"Evaluated once when the event command executes, before scene selection. No callback arguments or local bindings are supplied. The CLI compiles syntax only; runtime errors propagate. A truthy result invokes currentScene.fadeOutAll; the expression does not choose the destination scene."},"on":"Slow","off":"Normal","context":"Argument of event-title-scene api describe ET-C-Options. This is authored as a string even though the editor presents a boolean. The CLI validates syntax without evaluating it; use a boolean result. The transition itself still occurs for false."}],"context":"Enable Coreto_4_EventTitleScene 0.1.0 with event-title-scene install after its optional providers/consumers have been arranged; the bundle must already be delivered. install selects this provider instead of VisuMZ_4_EventTitleScene and preserves other provider selections. Restart the game after configuration changes. Core Engine and Message Core are optional: if used, enable one supported provider of each before this plugin (Coreto_0_CoreEngine 0.1.0 / VisuMZ_0_CoreEngine 1.90; Coreto_1_MessageCore 0.1.0 / VisuMZ_1_MessageCore 1.57). Place it after active Options Core, Save Core, Picture Choices, VN Picture Busts, Choice Common Events and Attached Pictures, and before Message Visibility. The command runs when the game interpreter reaches the authored 357 Plugin Command, including when called outside the title map. SlowFade is a JavaScript expression string; see event-title-scene api describe ET-Options-SlowFade:eval. Optional save modes are configured by save api describe SAV-META-031 (/Save/SaveStyle); enable a supported Save Core before Event Title Scene to use locked/single behavior. Use event-title-scene api describe ET-P-MapID:num for title-map preparation and reentry. The generated common-event:1 example is illustrative: choose an existing target/index and result.fileHash from commands list. On insert an omitted SlowFade uses the published default; on update it retains the existing value."}],"commandAliases":["VisuMZ_4_EventTitleScene"],"tags":[{"id":"ET-RX-001","key":"continue","label":"Continue choice","description":"In any native Show Choices label, <Continue> keeps that choice disabled when DataManager.isAnySavefileExists() reports no save. The check runs when the choice list is built, including outside the title map. It never enables a choice already disabled by another rule and does not load a save by itself; call ET-C-LoadScreen in the selected branch.","type":"string","pattern":"<CONTINUE>","targets":["choice-text"],"availability":"supported","occurrences":"All matching tags are removed; availability follows storage.","examples":["<Continue>","event-title-scene commands list --target common-event:1 --json","message text get --target common-event:1 --index 0 --path choices --json","event-title-scene tags list --target common-event:1/text:0/choice:0 --json","event-title-scene tags set --target common-event:1/text:0/choice:0 --tag continue --value '\"<Continue>\"' --expected-hash HASH_FROM_LIST --dry-run"],"context":"Enable Coreto_4_EventTitleScene 0.1.0 with event-title-scene install after its optional providers/consumers have been arranged; the bundle must already be delivered. install selects this provider instead of VisuMZ_4_EventTitleScene and preserves other provider selections. Restart the game after configuration changes. Core Engine and Message Core are optional: if used, enable one supported provider of each before this plugin (Coreto_0_CoreEngine 0.1.0 / VisuMZ_0_CoreEngine 1.90; Coreto_1_MessageCore 0.1.0 / VisuMZ_1_MessageCore 1.57). Place it after active Options Core, Save Core, Picture Choices, VN Picture Busts, Choice Common Events and Attached Pictures, and before Message Visibility. The single-line case-insensitive tag is removed from the displayed label. Native availability checks loaded save metadata, not a successful read of the save contents; a listed file can still fail to load. A later choice list checks again. Removing the authored tag affects the next construction, not a currently displayed list. This tag belongs to Show Choices text, not Note, Comment or Show Text.","writing":"Use event-title-scene commands list --target common-event:1 to find Show Choices code 102 index I; message text get --target common-event:1 --index I --path choices identifies zero-based choice J. event-title-scene tags list --target common-event:1/text:I/choice:J supplies result.fileHash and occurrence indices. Replace illustrative target/index/choice 0 before writing, and use --occurrence if multiple matches exist."}],"methods":[]};
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
        discovery: schema.id ? {id:schema.id} : {}
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
            if (!Object.prototype.hasOwnProperty.call(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
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
        // Hand-written arrays such as "[5]" hold JSON numbers where the editor writes "[\"5\"]"; the original plugins accept both.
        if (typeof raw === "number") value = raw;
        else if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        else value = Number(raw);
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
    // A whole-object edit must not reformat an untouched native numeric field.
    if (schema.type === "number" && typeof previous === "string" && previous.trim() !== "" && Number(previous) === value) return previous;
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
    if (Object.prototype.hasOwnProperty.call(parameters, 'CoretoConfigSource')) {
        return {configuredSource: parameters.CoretoConfigSource, format: 'canonical', migrationRequired: false};
    }
    const oldVn = catalog.pluginId === 'Coreto_2_VNPictureBusts';
    if (oldVn && Object.prototype.hasOwnProperty.call(parameters, 'ConfigurationSource') && !['own', 'legacy-if-present'].includes(parameters.ConfigurationSource)) {
        const error = new Error('Use own or legacy-if-present for the historical VN selector.');
        error.code = 'INVALID_CONFIGURATION_SOURCE';
        error.exitCode = 2;
        throw error;
    }
    const configuredSource = oldVn && parameters.ConfigurationSource === 'own' ? 'own'
        : ['Coreto_0_CoreEngine', 'Coreto_1_MessageCore'].includes(catalog.pluginId) ? 'own' : 'inherit';
    return {configuredSource, format: oldVn && Object.prototype.hasOwnProperty.call(parameters, 'ConfigurationSource') ? 'vn-legacy' : 'implicit', migrationRequired: true};
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
        const entries = active.filter(plugin => Object.prototype.hasOwnProperty.call(supported, plugin.name));
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
            const wrapped = new Error(error.message);
            Object.defineProperty(wrapped, 'cause', {value:error, writable:true, configurable:true});
            throw Object.assign(wrapped, {code:errorPrefix+'_CONFIG_VALUE',field:field.storageKey});
        }
    }
    const api = {pluginId:catalog.pluginId,version:catalog.version,...source,settings};
    globalThis.Coreto ??= {};
    Coreto[apiName] = api;
    return api;
}

const eventTitleApi = installComplement(catalog, 'EventTitleScene', 'ET');
const titleSettings = eventTitleApi.settings;
function Scene_EventedTitleMap() { this.initialize(...arguments); }
Scene_EventedTitleMap.prototype = Object.create(Scene_Map.prototype);
Scene_EventedTitleMap.prototype.constructor = Scene_EventedTitleMap;
Scene_EventedTitleMap.prototype.initialize = function() {
    Scene_Map.prototype.initialize.call(this);
    $gamePlayer.setTransparent(titleSettings.PlayerTransparent);
    if (titleSettings.ShowFollowers) $gamePlayer.showFollowers(); else $gamePlayer.hideFollowers();
};
Scene_EventedTitleMap.prototype.isAutosaveEnabled = function() { return false; };
Scene_EventedTitleMap.prototype.requestAutosave = function() {};
Scene_EventedTitleMap.prototype.executeAutosave = function() {};
Scene_EventedTitleMap.prototype.forceAutosave = function() {};
Scene_EventedTitleMap.prototype.isMapTouchOk = function() { return titleSettings.CanInputMove && Scene_Map.prototype.isMapTouchOk.call(this); };
Scene_EventedTitleMap.prototype.updateEncounter = function() {};
Scene_EventedTitleMap.prototype.isMenuCalled = function() { return false; };
Scene_EventedTitleMap.prototype.callMenu = function() {};
Scene_EventedTitleMap.prototype.updateCallDebug = function() {};
Scene_EventedTitleMap.prototype.isDebugCalled = function() { return false; };
Scene_EventedTitleMap.prototype.createTitleButtons = function() {
    if (this._eventTitleButtonsCreated) return;
    this._eventTitleButtonsCreated = true;
    if (typeof Scene_Title.prototype.createTitleButtons === 'function') Scene_Title.prototype.createTitleButtons.call(this);
};
Scene_EventedTitleMap.prototype.start = function() {
    Scene_Map.prototype.start.call(this);
    this.createTitleButtons();
    if (this._eventTitleLoadError && typeof this.loadFailureConfirmationWindow === 'function') this.loadFailureConfirmationWindow();
};
Scene_EventedTitleMap.prototype.processOptionsCoreFailsafe = function(direction) {
    const sequence = [8,8,2,2,4,6,4,6];
    const index = this._optionsCoreFailsafeCheck ?? 0;
    this._optionsCoreFailsafeCheck = sequence[index] === direction ? index + 1 : 0;
    if (this._optionsCoreFailsafeCheck === sequence.length) {
        ConfigManager.assistMode = true;
        ConfigManager.save();
        SoundManager.playLoad();
    }
};
Scene_EventedTitleMap.prototype.updateOptionsCoreFailsafe = function() {
    if (!globalThis.Imported?.VisuMZ_1_OptionsCore) return;
    for (const [key,direction] of [['up',8],['down',2],['left',4],['right',6]]) {
        if (Input.isTriggered(key)) this.processOptionsCoreFailsafe(direction);
    }
};
Scene_EventedTitleMap.prototype.update = function() {
    Scene_Map.prototype.update.call(this);
    this.updateOptionsCoreFailsafe();
};
globalThis.Scene_EventedTitleMap = Scene_EventedTitleMap;
SceneManager.isSceneMap = function() { return this._scene?.constructor === Scene_Map; };
SceneManager.isSceneTitleMap = function() { return this._scene?.constructor === Scene_EventedTitleMap; };
DataManager.prepareEventedTitleScreen = function() {
    this.setupNewGame();
    $gamePlayer.reserveTransfer(titleSettings.MapID,titleSettings.MapX,titleSettings.MapY,titleSettings.FaceDirection,0);
};
const gotoEventTitle = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
    if (sceneClass === Scene_Title || sceneClass === Scene_EventedTitleMap) {
        DataManager.prepareEventedTitleScreen();
        sceneClass = Scene_EventedTitleMap;
    }
    return gotoEventTitle.call(this,sceneClass);
};
const titleInputDirection = Game_Player.prototype.getInputDirection;
Game_Player.prototype.getInputDirection = function(...args) {
    return SceneManager.isSceneTitleMap() && !titleSettings.CanInputMove ? 0 : titleInputDirection.apply(this,args);
};
const titleAutosave = Scene_Map.prototype.isAutosaveEnabled;
Scene_Map.prototype.isAutosaveEnabled = function(...args) {
    if (SceneManager.isPreviousScene(Scene_TitleTransition) || SceneManager.isPreviousScene(Scene_Save)) return false;
    return titleAutosave.apply(this,args);
};
const makeTitleChoices = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makeTitleChoices.apply(this,args);
    for (const choice of this._list) if (/<CONTINUE>/i.test(choice.name)) {
        choice.name = choice.name.replace(/<CONTINUE>/gi,'').trim();
        choice.enabled = choice.enabled && DataManager.isAnySavefileExists();
    }
    return result;
};

function Scene_TitleTransition() { this.initialize(...arguments); }
Scene_TitleTransition.prototype = Object.create(Scene_Base.prototype);
Scene_TitleTransition.prototype.constructor = Scene_TitleTransition;
Scene_TitleTransition.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
};
globalThis.Scene_TitleTransition = Scene_TitleTransition;
function Scene_SingleLoadTransition() { this.initialize(...arguments); }
Scene_SingleLoadTransition.prototype = Object.create(Scene_Base.prototype);
Scene_SingleLoadTransition.prototype.constructor = Scene_SingleLoadTransition;
Scene_SingleLoadTransition.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this._loadPromise = DataManager.loadGame(0).then(()=>this.onLoadSuccess(),error=>this.onLoadFailure(error));
};
Scene_SingleLoadTransition.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
    $gameSystem.onAfterLoad();
    SceneManager.goto(Scene_Map);
};
Scene_SingleLoadTransition.prototype.onLoadFailure = function(error) {
    SoundManager.playBuzzer();
    SceneManager.goto(Scene_EventedTitleMap);
    SceneManager._nextScene._eventTitleLoadError = error;
};
Scene_SingleLoadTransition.prototype.onSaveCoreLoadFailure = Scene_SingleLoadTransition.prototype.onLoadFailure;
globalThis.Scene_SingleLoadTransition = Scene_SingleLoadTransition;
function eventTitleSaveStyle() { return typeof StorageManager.saveStyle === 'function' ? StorageManager.saveStyle() : 'standard'; }
for (const namespace of [catalog.pluginId,catalog.reference.pluginId]) for (const command of catalog.commands) {
    PluginManager.registerCommand(namespace,command.key,function(args) {
        const raw = args['SlowFade:eval'] ?? command.args[0].nativeDefault;
        const slow = Function('return ('+raw+');').call(this);
        const scene = SceneManager._scene;
        if (slow) scene.fadeOutAll();
        if (command.key === 'Options') return SceneManager.push(Scene_Options);
        if (command.key === 'NewGame') {
            if (eventTitleSaveStyle() === 'locked') {
                DataManager.setupNewGame();
                $gameTemp._pickLockedSaveSlot = true;
                return SceneManager.push(Scene_Save);
            }
            return SceneManager.goto(Scene_TitleTransition);
        }
        if (eventTitleSaveStyle() !== 'single') return SceneManager.push(Scene_Load);
        if (DataManager.isAnySavefileExists()) return SceneManager.push(Scene_SingleLoadTransition);
        SoundManager.playBuzzer();
        scene.loadFailureConfirmationWindow();
    });
}
globalThis.Imported ??= {};
Imported.Coreto_4_EventTitleScene = true;
Imported.VisuMZ_4_EventTitleScene = true;
globalThis.VisuMZ ??= {};
VisuMZ.EventTitleScene = {version:Number(catalog.reference.version),Settings:titleSettings};

})();
