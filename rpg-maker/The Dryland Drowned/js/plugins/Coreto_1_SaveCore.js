/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 1] [Version 0.1.0] [SaveCore]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderBefore Coreto_2_ExtMessageFunc
 * @orderBefore VisuMZ_2_ExtMessageFunc
 * @orderBefore Coreto_2_VNPictureBusts
 * @orderBefore VisuMZ_2_VNPictureBusts
 * @orderBefore Coreto_2_AniMsgTextEffects
 * @orderBefore VisuMZ_2_AniMsgTextEffects
 * @orderBefore VisuMZ_3_MessageLog
 * @orderBefore VisuMZ_3_MsgLetterSounds
 * @help
 * Menus de save/load, autosave e estado global.
 * Guia de uso: coreto/README.md. CLI: save --help.
 * Save em disco NW.js e consumidores externos exigem validação no ambiente alvo.
 * Requer um Core compatível. Message é opcional.
 * Desative VisuMZ_1_SaveCore antes de ativar este provider.
 * CoretoConfigSource: inherit lê o registro original; own lê este registro.
 * A troca da fonte não copia valores.
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
 * @param BreakHead
 * @text --------------------------
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default ----------------------------------
 *
 * @param SaveCore
 * @text SaveCore
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @text ATTENTION
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save behavior, storage names and save/load callbacks.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @type struct<SaveConfirm>
 * @desc Configure the manual save/load-failure confirmation popup.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 * @parent Save:struct
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Configure automatic save destinations, request triggers and callbacks.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @type struct<AutosaveConfirm>
 * @desc Configure the autosave result popup.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 * @parent Autosave:struct
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:eval":"true"}
 * @parent Autosave:struct
 *
 * @param StyleBreak
 * @text --------------------------
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 * @option none
 * @value none
 * @option face
 * @value face
 * @option sprite
 * @value sprite
 * @option svbattler
 * @value svbattler
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 * @option list
 * @value list
 * @option vertical
 * @value vertical
 * @option box
 * @value box
 * @option large
 * @value large
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
 * @parent SaveMenuStyle:str
 *
 * @param BreakEnd1
 * @text --------------------------
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default ----------------------------------
 *
 * @param End Of
 * @text End Of
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default ----------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc Plugin Manager section label or separator; no game behavior.
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or disable the saved game autosave flag.
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @desc Enable or disable autosave?
 * @default true
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Request autosave using the normal enablement checks.
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Execute autosave when the player autosave option is on.
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosave regardless of player option and normal request gates.
 * @command Separator_Save
 * @text -
 * @desc Plugin Manager section label or separator; no game behavior.
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Save the running map game to its current slot.
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set description metadata for future saves.
 * @arg Text:str
 * @text Text
 * @type text
 * @desc Insert desired save description text here.
 * @default Text
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture filename used in future save-list metadata.
 * @arg Filename:str
 * @text Filename
 * @type file
 * @desc Input the filename here of the desired picture.
 * @default 
 * @dir img/pictures/
 *
 * @command Separator_End
 * @text -
 * @desc Plugin Manager section label or separator; no game behavior.
 */

/*~struct~Save:
 * @param General
 * @text General
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param SaveStyle:str
 * @text Save Style
 * @type select
 * @desc Save style: standard, locked or single.
 * @default standard
 * @parent General
 * @option standard
 * @value standard
 * @option locked
 * @value locked
 * @option single
 * @value single
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @type text
 * @desc Maximum configured savefile count.
 * @default 20
 * @parent General
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @type boolean
 * @desc Count the autosave file towards the max count?
 * @default false
 * @parent General
 *
 * @param LocalMode
 * @text Local Mode
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @type boolean
 * @desc Use filesystem saves in the NW.js desktop client.
 * @default true
 * @parent LocalMode
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @type text
 * @desc Logical name format for numbered save slots.
 * @default file%1
 * @parent LocalMode
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @type text
 * @desc Filesystem filename format applied to each logical storage name.
 * @default %1.rmmzsave
 * @parent LocalMode
 *
 * @param ForageKey
 * @text Forage Key
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @type text
 * @desc localforage key format for browser-backed storage.
 * @default rmmzsave.%1.%2
 * @parent ForageKey
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @type text
 * @desc Temporary localforage write-probe key.
 * @default rmmzsave.test
 * @parent ForageKey
 *
 * @param Vocabulary
 * @text Vocabulary
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @type text
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 * @parent Vocabulary
 *
 * @param JavaScript
 * @text JavaScript
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @type note
 * @desc JavaScript callback body for OnSaveSuccessJS.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 * @parent JavaScript
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @type note
 * @desc JavaScript callback body for OnSaveFailureJS.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 * @parent JavaScript
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @type note
 * @desc JavaScript callback body for OnLoadSuccessJS.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 * @parent JavaScript
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @type note
 * @desc JavaScript callback body for OnLoadFailureJS.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 * @parent JavaScript
 *
 */

/*~struct~SaveConfirm:
 * @param General
 * @text General
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param Enable:eval
 * @text Enable Window?
 * @type boolean
 * @desc Enable the Save Confirmation Window?
 * @default true
 * @parent General
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @type number
 * @desc Delay in milliseconds before the save confirmation window closes.
 * @default 1000
 * @parent General
 * @min 1
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc JavaScript body returning the manual confirmation window rectangle.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 * @parent General
 *
 * @param Vocabulary
 * @text Vocabulary
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @type text
 * @desc Text used for a "Save Success" message popup.
 * @default Save Successful!
 * @parent Vocabulary
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @type text
 * @desc Text used for a "Save Failure" message popup.
 * @default Could not save!
 * @parent Vocabulary
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @type text
 * @desc Text used for a "Load Failure" message popup.
 * @default Could not load save file!
 * @parent Vocabulary
 *
 */

/*~struct~Autosave:
 * @param General
 * @text General
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @type select
 * @desc Autosave destination: file0, current or both.
 * @default file0
 * @parent General
 * @option file0
 * @value file0
 * @option current
 * @value current
 * @option both
 * @value both
 *
 * @param Requests
 * @text Requests
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @type boolean
 * @desc Gate normal autosave requests on native save access.
 * @default true
 * @parent Requests
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @type boolean
 * @desc Request autosave on returning from battle to the map.
 * @default true
 * @parent Requests
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @type boolean
 * @desc Request autosave after a map transfer accepted by shouldAutosave.
 * @default true
 * @parent Requests
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @type boolean
 * @desc Request autosave when creating the main menu from the map.
 * @default true
 * @parent Requests
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @type boolean
 * @desc Request autosave when returning from the main menu to the map.
 * @default true
 * @parent Requests
 *
 * @param JavaScript
 * @text JavaScript
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @type note
 * @desc JavaScript callback body for OnAutosaveSuccessJS.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 * @parent JavaScript
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @type note
 * @desc JavaScript callback body for OnAutosaveFailureJS.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 * @parent JavaScript
 *
 */

/*~struct~AutosaveConfirm:
 * @param General
 * @text General
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param Enable:eval
 * @text Enable Window?
 * @type boolean
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 * @parent General
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @type number
 * @desc Delay in milliseconds before autosave confirmation begins fading out.
 * @default 1000
 * @parent General
 * @min 1
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @type select
 * @desc Where does this window appear on the screen?
 * @default lower right
 * @parent General
 * @option lower left
 * @value lower left
 * @option lower center
 * @value lower center
 * @option lower right
 * @value lower right
 * @option middle left
 * @value middle left
 * @option middle center
 * @value middle center
 * @option middle right
 * @value middle right
 * @option upper left
 * @value upper left
 * @option upper center
 * @value upper center
 * @option upper right
 * @value upper right
 *
 * @param Vocabulary
 * @text Vocabulary
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @type text
 * @desc Text used for an "Autosave Success" message popup.
 * @default \I[193]Autosaved!
 * @parent Vocabulary
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @type text
 * @desc Text used for an "Autosave Failure" message popup.
 * @default \I[194]Autosave failed!
 * @parent Vocabulary
 *
 */

/*~struct~AutosaveOption:
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @type text
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @desc Determine the default value of this option.
 * @default true
 *
 */

/*~struct~SaveMenu:
 * @param General
 * @text General
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param LatestText:str
 * @text Latest Text
 * @type text
 * @desc Text used to depict latest save file.
 * @default NEW!
 * @parent General
 *
 * @param LatestColor:str
 * @text Latest Color
 * @type text
 * @desc Latest-save marker color as a CSS color or numeric palette index string.
 * @default #f49ac1
 * @parent General
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @type number
 * @desc Horizontal spacing in pixels between map-character sprites in save-list actor drawing.
 * @default 48
 * @parent General
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @type number
 * @desc Horizontal spacing in pixels between side-view battler sprites in save-list actor drawing.
 * @default 64
 * @parent General
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 * @parent General
 *
 * @param List
 * @text List Style
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param ListRows:num
 * @text Rows
 * @type number
 * @desc Number of rows for this style.
 * @default 4
 * @parent List
 * @min 1
 *
 * @param ListCols:num
 * @text Columns
 * @type number
 * @desc Number of column for this style.
 * @default 1
 * @parent List
 * @min 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 * @parent List
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 * @parent List
 *
 * @param Vertical
 * @text Vertical Style
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param VertRows:num
 * @text Rows
 * @type number
 * @desc Number of rows for this style.
 * @default 1
 * @parent Vertical
 * @min 1
 *
 * @param VertCols:num
 * @text Columns
 * @type number
 * @desc Number of column for this style.
 * @default 3
 * @parent Vertical
 * @min 1
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 * @parent Vertical
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 * @parent Vertical
 *
 * @param Box
 * @text Box Style
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param BoxRows:num
 * @text Rows
 * @type number
 * @desc Number of rows for this style.
 * @default 2
 * @parent Box
 * @min 1
 *
 * @param BoxCols:num
 * @text Columns
 * @type number
 * @desc Number of column for this style.
 * @default 3
 * @parent Box
 * @min 1
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 * @parent Box
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 * @parent Box
 *
 * @param Large
 * @text Large Style
 * @type text
 * @desc Plugin Manager section label or separator; no game behavior.
 * @default 
 *
 * @param LargeRows:num
 * @text Rows
 * @type number
 * @desc Number of rows for this style.
 * @default 1
 * @parent Large
 * @min 1
 *
 * @param LargeCols:num
 * @text Columns
 * @type number
 * @desc Number of column for this style.
 * @default 1
 * @parent Large
 * @min 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 * @parent Large
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 * @parent Large
 *
 */

(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_1_SaveCore","version":"0.1.0","reference":{"pluginId":"VisuMZ_1_SaveCore","version":"1.13"},"dependencies":{"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.54"}},"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","type":"string","editorType":"select","options":["inherit","own"],"nativeDefault":"inherit","availability":"supported"},{"id":"SAV-META-014","key":"BreakHead","storageKey":"BreakHead","type":"string","editorType":"text","nativeDefault":"----------------------------------","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-015","key":"SaveCore","storageKey":"SaveCore","type":"string","editorType":"text","nativeDefault":"Plugin Parameters","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-016","key":"ATTENTION","storageKey":"ATTENTION","type":"string","editorType":"text","nativeDefault":"READ THE HELP FILE","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-017","key":"BreakSettings","storageKey":"BreakSettings","type":"string","editorType":"text","nativeDefault":"----------------------------------","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-018","key":"Save","storageKey":"Save:struct","type":"struct","editorType":"struct<Save>","nativeDefault":"{\"General\":\"\",\"SaveStyle:str\":\"standard\",\"MaxSaveFiles:num\":\"20\",\"AutosaveMaxCount:eval\":\"false\",\"LocalMode\":\"\",\"LocalMode:eval\":\"true\",\"FilenameFmt:str\":\"file%1\",\"ExtensionFmt:str\":\"%1.rmmzsave\",\"ForageKey\":\"\",\"KeyFmt:str\":\"rmmzsave.%1.%2\",\"TestKey:str\":\"rmmzsave.test\",\"Vocabulary\":\"\",\"VocabLockedSaveSlot:str\":\"Pick a file to start a new game.\",\"JavaScript\":\"\",\"OnSaveSuccessJS:func\":\"\\\"// Declare Constants\\\\nconst scene = this;\\\\n\\\\n// Actions\\\\n\\\"\",\"OnSaveFailureJS:func\":\"\\\"// Declare Constants\\\\nconst scene = this;\\\\n\\\\n// Actions\\\\n\\\"\",\"OnLoadSuccessJS:func\":\"\\\"// Declare Constants\\\\nconst scene = this;\\\\n\\\\n// Actions\\\\n\\\"\",\"OnLoadFailureJS:func\":\"\\\"// Declare Constants\\\\nconst scene = this;\\\\n\\\\n// Actions\\\\n\\\"\"}","encoding":"plain","availability":"supported","structName":"Save","fields":[{"id":"SAV-META-030","key":"General","storageKey":"General","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-031","key":"SaveStyle","storageKey":"SaveStyle:str","type":"string","editorType":"select","nativeDefault":"standard","encoding":"plain","availability":"supported","options":["standard","locked","single"],"parent":"General","context":"standard opens slot selection for manual saving. locked asks for a slot when New Game is chosen from the title, then menu saves reuse that slot; an unresolved current slot falls back to 1. single uses slot 0 for manual save, Continue and autosave, reports one savefile and enables database autosave at boot. Changing styles does not migrate existing saves."},{"id":"SAV-META-032","key":"MaxSaveFiles","storageKey":"MaxSaveFiles:num","type":"number","editorType":"text","nativeDefault":"20","encoding":"plain","availability":"supported","parent":"General","context":"Use a nonnegative integer; startup validation rejects negative or fractional values. The count returned to the engine is MaxSaveFiles + 1 when AutosaveMaxCount is false, otherwise MaxSaveFiles. Thus the native autosave slot 0 is additional when it is not counted. Single style overrides the total to 1. No upper bound is enforced by this plugin."},{"id":"SAV-META-033","key":"AutosaveMaxCount","storageKey":"AutosaveMaxCount:eval","type":"boolean","editorType":"boolean","nativeDefault":"false","encoding":"plain","availability":"supported","parent":"General"},{"id":"SAV-META-034","key":"LocalMode","storageKey":"LocalMode","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-035","key":"LocalMode","storageKey":"LocalMode:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"LocalMode","context":"True selects files under the game save/ directory only when running NW.js. False uses localforage browser storage even in NW.js; ordinary browsers always use localforage regardless of this flag. Switching does not copy or migrate saves between stores."},{"id":"SAV-META-036","key":"FilenameFmt","storageKey":"FilenameFmt:str","type":"string","editorType":"text","nativeDefault":"file%1","encoding":"plain","availability":"supported","parent":"LocalMode","context":"%1 is the numeric slot ID: file%1 makes file1 for slot 1 and file0 for slot 0. Config/global storage names are supplied separately by the engine. For filesystem storage, ExtensionFmt wraps this logical name. Formats are not sanitized; choose distinct flat names valid on the target filesystem, without path separators. Changing the format changes lookup names; it does not rename existing saves."},{"id":"SAV-META-037","key":"ExtensionFmt","storageKey":"ExtensionFmt:str","type":"string","editorType":"text","nativeDefault":"%1.rmmzsave","encoding":"plain","availability":"supported","parent":"LocalMode","context":"%1 is the logical name (for example file1 from FilenameFmt, or config/global from the engine). %1.rmmzsave makes file1.rmmzsave under save/. Used only in NW.js LocalMode. Keep %1 so different storage objects remain distinct; choose a flat valid filename without path separators. Changes do not migrate existing files."},{"id":"SAV-META-038","key":"ForageKey","storageKey":"ForageKey","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-039","key":"KeyFmt","storageKey":"KeyFmt:str","type":"string","editorType":"text","nativeDefault":"rmmzsave.%1.%2","encoding":"plain","availability":"supported","parent":"ForageKey","context":"%1 is the game ID from System Advanced settings; %2 is the logical storage name, for example file1, config or global. Default rmmzsave.%1.%2 distinguishes games and storage objects. Keep both placeholders or another equivalent unique naming scheme to prevent collisions in the same browser origin. Changing the format does not migrate old keys."},{"id":"SAV-META-040","key":"TestKey","storageKey":"TestKey:str","type":"string","editorType":"text","nativeDefault":"rmmzsave.test","encoding":"plain","availability":"supported","parent":"ForageKey","context":"The engine writes save data to this key and schedules its removal before the real storage write. Use a dedicated unused key distinct from every real KeyFmt result. An existing value at this key is overwritten and removed; it is not backed up. Used only by localforage storage."},{"id":"SAV-META-041","key":"Vocabulary","storageKey":"Vocabulary","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-042","key":"VocabLockedSaveSlot","storageKey":"VocabLockedSaveSlot:str","type":"string","editorType":"text","nativeDefault":"Pick a file to start a new game.","encoding":"plain","availability":"supported","parent":"Vocabulary"},{"id":"SAV-META-043","key":"JavaScript","storageKey":"JavaScript","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-044","key":"OnSaveSuccessJS","storageKey":"OnSaveSuccessJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","encoding":"json","availability":"supported","javascript":"body","parent":"JavaScript","context":"Runs after a successful manual save and the save sound, before list refresh/confirmation. this is Scene_Save, Scene_Map or Scene_Menu. No arguments are passed, including no error argument on failure; use normal game globals for game data. Return value is ignored. Example of a harmless empty callback: return; Exceptions become SAV_CALLBACK_FAILED with field and cause; they are not silently ignored. A success callback exception can enter the surrounding save/load failure path. Keep callback changes synchronous; returned promises are not awaited."},{"id":"SAV-META-045","key":"OnSaveFailureJS","storageKey":"OnSaveFailureJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","encoding":"json","availability":"supported","javascript":"body","parent":"JavaScript","context":"Runs after a failed manual save and buzzer, before failure confirmation. this is Scene_Save, Scene_Map or Scene_Menu. No arguments are passed, including no error argument on failure; use normal game globals for game data. Return value is ignored. Example of a harmless empty callback: return; Exceptions become SAV_CALLBACK_FAILED with field and cause; they are not silently ignored. A success callback exception can enter the surrounding save/load failure path. Keep callback changes synchronous; returned promises are not awaited."},{"id":"SAV-META-046","key":"OnLoadSuccessJS","storageKey":"OnLoadSuccessJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","encoding":"json","availability":"supported","javascript":"body","parent":"JavaScript","context":"Runs after successful load handling has scheduled transition to Scene_Map. this is Scene_Load, or Scene_Title in single style. No arguments are passed, including no error argument on failure; use normal game globals for game data. Return value is ignored. Example of a harmless empty callback: return; Exceptions become SAV_CALLBACK_FAILED with field and cause; they are not silently ignored. A success callback exception can enter the surrounding save/load failure path. Keep callback changes synchronous; returned promises are not awaited."},{"id":"SAV-META-047","key":"OnLoadFailureJS","storageKey":"OnLoadFailureJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","encoding":"json","availability":"supported","javascript":"body","parent":"JavaScript","context":"Runs after failed loading and the buzzer, before failure confirmation. this is Scene_Load, or Scene_Title in single style. No arguments are passed, including no error argument on failure; use normal game globals for game data. Return value is ignored. Example of a harmless empty callback: return; Exceptions become SAV_CALLBACK_FAILED with field and cause; they are not silently ignored. A success callback exception can enter the surrounding save/load failure path. Keep callback changes synchronous; returned promises are not awaited."}],"context":"CLI parameters get returns decoded keys such as SaveStyle, without native :str/:num suffixes. Use those keys in --value JSON; nativeDefault/example retain editor serialization for reference. Setting a struct merges supplied known fields and preserves omitted existing fields; setting a child updates only that child. Editor-only labels are not CLI-authored settings. SaveStyle chooses freely selected slots, a locked slot chosen at new game, or one slot 0. Consult each child for storage formats and callback scope."},{"id":"SAV-META-019","key":"SaveConfirm","storageKey":"SaveConfirm:struct","type":"struct","editorType":"struct<SaveConfirm>","nativeDefault":"{\"General\":\"\",\"Enable:eval\":\"true\",\"Duration:num\":\"1000\",\"ConfirmRect:func\":\"\\\"const width = Graphics.boxWidth / 2;\\\\nconst height = this.calcWindowHeight(1, false);\\\\nconst x = (Graphics.width - width) / 2;\\\\nconst y = (Graphics.height - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"Vocabulary\":\"\",\"VocabSaveSuccess:str\":\"Save Successful!\",\"VocabSaveFailure:str\":\"Could not save!\",\"VocabLoadFailure:str\":\"Could not load save file!\"}","encoding":"plain","availability":"supported","structName":"SaveConfirm","fields":[{"id":"SAV-META-048","key":"General","storageKey":"General","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-049","key":"Enable","storageKey":"Enable:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General"},{"id":"SAV-META-050","key":"Duration","storageKey":"Duration:num","type":"number","editorType":"number","nativeDefault":"1000","encoding":"plain","availability":"supported","min":1,"parent":"General","context":"1000 means one second. CLI/editor schema requires at least 1 millisecond; the runtime separately accepts finite nonnegative raw values, so a raw 0 schedules closing on the next available event-loop turn. Window opening/closing animations remain separate."},{"id":"SAV-META-051","key":"ConfirmRect","storageKey":"ConfirmRect:func","type":"string","editorType":"note","nativeDefault":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","encoding":"json","availability":"supported","javascript":"body","parent":"General","context":"this is the current Scene_Save, Scene_Load, Scene_Map, Scene_Menu or Scene_Title that creates the popup; no arguments are passed. Return new Rectangle(x,y,width,height), using finite screen-pixel coordinates and positive dimensions large enough for padding/text. Example: const width = Graphics.boxWidth / 2; const height = this.calcWindowHeight(1, false); return new Rectangle((Graphics.width-width)/2,(Graphics.height-height)/2,width,height); The result is used by Window_Base without an extra shape validator. It runs when the scene first creates this window; errors are wrapped as SAV_CALLBACK_FAILED, preserving cause."},{"id":"SAV-META-052","key":"Vocabulary","storageKey":"Vocabulary","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-053","key":"VocabSaveSuccess","storageKey":"VocabSaveSuccess:str","type":"string","editorType":"text","nativeDefault":"Save Successful!","encoding":"plain","availability":"supported","parent":"Vocabulary"},{"id":"SAV-META-054","key":"VocabSaveFailure","storageKey":"VocabSaveFailure:str","type":"string","editorType":"text","nativeDefault":"Could not save!","encoding":"plain","availability":"supported","parent":"Vocabulary"},{"id":"SAV-META-055","key":"VocabLoadFailure","storageKey":"VocabLoadFailure:str","type":"string","editorType":"text","nativeDefault":"Could not load save file!","encoding":"plain","availability":"supported","parent":"Vocabulary"}],"parent":"Save:struct","context":"CLI parameters get returns decoded keys such as SaveStyle, without native :str/:num suffixes. Use those keys in --value JSON; nativeDefault/example retain editor serialization for reference. Setting a struct merges supplied known fields and preserves omitted existing fields; setting a child updates only that child. Editor-only labels are not CLI-authored settings. Duration is milliseconds before closing. ConfirmRect returns a Rectangle in screen pixels with this bound to the scene creating the window. Vocabulary is drawn with native text codes."},{"id":"SAV-META-020","key":"Autosave","storageKey":"Autosave:struct","type":"struct","editorType":"struct<Autosave>","nativeDefault":"{\"General\":\"\",\"AutosaveType:str\":\"file0\",\"StartEnabled:eval\":\"true\",\"Requests\":\"\",\"RequestsRequireSaveEnable:eval\":\"true\",\"AfterBattle:eval\":\"true\",\"AfterTransfer:eval\":\"true\",\"AfterMenuCall:eval\":\"true\",\"AfterExitMenu:eval\":\"true\",\"JavaScript\":\"\",\"OnAutosaveSuccessJS:func\":\"\\\"// Declare Constants\\\\nconst scene = this;\\\\n\\\\n// Actions\\\\n\\\"\",\"OnAutosaveFailureJS:func\":\"\\\"// Declare Constants\\\\nconst scene = this;\\\\n\\\\n// Actions\\\\n\\\"\"}","encoding":"plain","availability":"supported","structName":"Autosave","fields":[{"id":"SAV-META-056","key":"General","storageKey":"General","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-057","key":"AutosaveType","storageKey":"AutosaveType:str","type":"string","editorType":"select","nativeDefault":"file0","encoding":"plain","availability":"supported","options":["file0","current","both"],"parent":"General","context":"file0 writes slot 0. current writes the current Game_System savefileId only when it is greater than 0; with no positive current slot it writes nothing. both starts a write to slot 0 and, when positive, the current slot; these writes are independent, not a transaction. single save style always forces file0. Destinations do not themselves enable requests. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-058","key":"Requests","storageKey":"Requests","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-059","key":"RequestsRequireSaveEnable","storageKey":"RequestsRequireSaveEnable:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Requests","context":"When true, Game_System.isSaveEnabled must be true, controlled by the event command Change Save Access. False removes only that gate; database autosave, game autosave state and the player option still govern normal automatic saves. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-060","key":"AfterBattle","storageKey":"AfterBattle:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Requests","context":"Applies when Scene_Map loads with Scene_Battle as previous scene; it does not write while the battle scene is active. False suppresses that trigger. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-061","key":"AfterTransfer","storageKey":"AfterTransfer:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Requests","context":"The transfer must reach the native Scene_Map transfer-end autosave path. Other plugins can further constrain shouldAutosave; enabling this flag does not override them. False bypasses this transfer request. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-062","key":"AfterMenuCall","storageKey":"AfterMenuCall:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Requests","context":"Applies to Scene_Menu with Scene_Map as previous scene, not every submenu or arbitrary menu-like scene. False suppresses that trigger. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-063","key":"AfterExitMenu","storageKey":"AfterExitMenu:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Requests","context":"Applies when Scene_Map loads with Scene_Menu as previous scene. False suppresses that trigger. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-064","key":"JavaScript","storageKey":"JavaScript","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-065","key":"OnAutosaveSuccessJS","storageKey":"OnAutosaveSuccessJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","encoding":"json","availability":"supported","javascript":"body","parent":"JavaScript","context":"Runs after the native autosave-success hook and before success confirmation; repeated successful destinations are suppressed after the first. this is the requesting Scene_Base subclass. No arguments are passed, including no error argument on failure; use normal game globals for game data. Return value is ignored. Example of a harmless empty callback: return; Exceptions become SAV_CALLBACK_FAILED with field and cause; they are not silently ignored. A success callback exception can enter the surrounding save/load failure path. Keep callback changes synchronous; returned promises are not awaited."},{"id":"SAV-META-066","key":"OnAutosaveFailureJS","storageKey":"OnAutosaveFailureJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","encoding":"json","availability":"supported","javascript":"body","parent":"JavaScript","context":"Runs after the native autosave-failure hook and before failure confirmation; it is suppressed if this batch already processed success. this is the requesting Scene_Base subclass. No arguments are passed, including no error argument on failure; use normal game globals for game data. Return value is ignored. Example of a harmless empty callback: return; Exceptions become SAV_CALLBACK_FAILED with field and cause; they are not silently ignored. A success callback exception can enter the surrounding save/load failure path. Keep callback changes synchronous; returned promises are not awaited."}],"context":"CLI parameters get returns decoded keys such as SaveStyle, without native :str/:num suffixes. Use those keys in --value JSON; nativeDefault/example retain editor serialization for reference. Setting a struct merges supplied known fields and preserves omitted existing fields; setting a child updates only that child. Editor-only labels are not CLI-authored settings. The serialized StartEnabled:eval field is retained for compatibility but has no effect here; Game_System initializes autosaveEnabled=true and AutosaveEnable controls it at runtime. A normal request requires database autosave enabled, no battle/event test, Game_System autosave enabled, and (when RequestsRequireSaveEnable is true) the native Change Save Access state enabled. Actual automatic writes also require the player autosave option on. Single save style enables database autosave at boot. The trigger requests a save; it does not guarantee a successful write."},{"id":"SAV-META-021","key":"AutosaveConfirm","storageKey":"AutosaveConfirm:struct","type":"struct","editorType":"struct<AutosaveConfirm>","nativeDefault":"{\"General\":\"\",\"Enable:eval\":\"true\",\"Duration:num\":\"1000\",\"ScreenPosition:str\":\"lower right\",\"Vocabulary\":\"\",\"VocabAutosaveSuccess:str\":\"\\\\I[193]Autosaved!\",\"VocabAutosaveFailure:str\":\"\\\\I[194]Autosave failed!\"}","encoding":"plain","availability":"supported","structName":"AutosaveConfirm","fields":[{"id":"SAV-META-067","key":"General","storageKey":"General","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-068","key":"Enable","storageKey":"Enable:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General"},{"id":"SAV-META-069","key":"Duration","storageKey":"Duration:num","type":"number","editorType":"number","nativeDefault":"1000","encoding":"plain","availability":"supported","min":1,"parent":"General","context":"1000 means one second. CLI/editor schema requires at least 1 millisecond; the runtime separately accepts finite nonnegative raw values, so a raw 0 schedules fade-out on the next available event-loop turn. Fade-in and fade-out change content opacity by 16 per update and are separate from this timer."},{"id":"SAV-META-070","key":"ScreenPosition","storageKey":"ScreenPosition:str","type":"string","editorType":"select","nativeDefault":"lower right","encoding":"plain","availability":"supported","options":["lower left","lower center","lower right","middle left","middle center","middle right","upper left","upper center","upper right"],"parent":"General"},{"id":"SAV-META-071","key":"Vocabulary","storageKey":"Vocabulary","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-072","key":"VocabAutosaveSuccess","storageKey":"VocabAutosaveSuccess:str","type":"string","editorType":"text","nativeDefault":"\\I[193]Autosaved!","encoding":"plain","availability":"supported","parent":"Vocabulary"},{"id":"SAV-META-073","key":"VocabAutosaveFailure","storageKey":"VocabAutosaveFailure:str","type":"string","editorType":"text","nativeDefault":"\\I[194]Autosave failed!","encoding":"plain","availability":"supported","parent":"Vocabulary"}],"parent":"Autosave:struct","context":"CLI parameters get returns decoded keys such as SaveStyle, without native :str/:num suffixes. Use those keys in --value JSON; nativeDefault/example retain editor serialization for reference. Setting a struct merges supplied known fields and preserves omitted existing fields; setting a child updates only that child. Editor-only labels are not CLI-authored settings. Duration is milliseconds until fade-out begins. Vocabulary supports native text codes: \\I[193] draws icon 193 from img/system/IconSet.png; change or remove that code to choose the icon."},{"id":"SAV-META-022","key":"AutosaveOption","storageKey":"AutosaveOption:struct","type":"struct","editorType":"struct<AutosaveOption>","nativeDefault":"{\"AddOption:eval\":\"true\",\"AdjustRect:eval\":\"true\",\"Name:str\":\"Autosave\",\"Default:eval\":\"true\"}","encoding":"plain","availability":"supported","structName":"AutosaveOption","fields":[{"id":"SAV-META-074","key":"AddOption","storageKey":"AddOption:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","context":"Adds the autosave toggle through Window_Options.addGeneralOptions when true. It does not by itself enable database autosave or create an autosave request. Custom options/category plugins may provide their own entry."},{"id":"SAV-META-075","key":"AdjustRect","storageKey":"AdjustRect:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","context":"When AddOption is also true, adds one command to the native Scene_Options.maxCommands calculation so its standard window can account for the extra row. It does not resize arbitrary custom option windows. False leaves that command-count adjustment disabled."},{"id":"SAV-META-076","key":"Name","storageKey":"Name:str","type":"string","editorType":"text","nativeDefault":"Autosave","encoding":"plain","availability":"supported","context":"Player-facing label exposed as TextManager.autosaveOption and used by the native autosave option entry. Plain text such as Autosave; it does not select a save slot or enable autosave."},{"id":"SAV-META-077","key":"Default","storageKey":"Default:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","context":"Initial ConfigManager.autosave value and fallback when stored configuration lacks the key. Persistence saves currentValue || Default: if Default=true, a current false is saved as true and returns on next configuration load; Default=false preserves false. The current session still respects an off toggle. This is separate from database and Game_System autosave gates."}],"parent":"Autosave:struct","context":"CLI parameters get returns decoded keys without native type suffixes; use these keys in --value JSON. Struct writes merge supplied known fields and preserve omitted existing fields. nativeDefault/example retain editor serialization; editor-only labels are excluded from CLI writes. Configures the native autosave option, label and initial/fallback value. Persistence uses currentValue || Default when saving ConfigManager: with Default=true, turning the option off works for the running session but saves true for the next load. With Default=false, false is preserved. This does not change the separate Game_System autosave-enabled flag."},{"id":"SAV-META-023","key":"StyleBreak","storageKey":"StyleBreak","type":"string","editorType":"text","nativeDefault":"----------------------------------","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-024","key":"ActorGraphic","storageKey":"ActorGraphic:str","type":"string","editorType":"select","nativeDefault":"face","encoding":"plain","availability":"supported","options":["none","face","sprite","svbattler"],"context":"Graphics drawn for saved party members by the selected SaveMenu ContentsJS preset: none skips actors; face uses saved face images; sprite uses saved map-character images; svbattler uses saved side-view battler names, falling back to map sprites for older metadata without svbattlers. The default MakeSavefileInfoJS populates that field. Custom ContentsJS may choose not to call drawActors."},{"id":"SAV-META-025","key":"SaveMenuStyle","storageKey":"SaveMenuStyle:str","type":"string","editorType":"select","nativeDefault":"box","encoding":"plain","availability":"supported","options":["list","vertical","box","large"],"context":"Selects the matching SaveMenu row/column counts and ContentsJS/FileDataJS drawing callbacks. Defaults: list is 4 rows x1 column; vertical is 1 x3; box is 2 x3; large is 1 x1. These are editable presets, not forced dimensions. Slot selection and save style are configured separately by /Save/SaveStyle."},{"id":"SAV-META-026","key":"SaveMenu","storageKey":"SaveMenu:struct","type":"struct","editorType":"struct<SaveMenu>","nativeDefault":"{\"General\":\"\",\"LatestText:str\":\"NEW!\",\"LatestColor:str\":\"#f49ac1\",\"SpriteWidth:num\":\"48\",\"SvBattlerWidth:num\":\"64\",\"MakeSavefileInfoJS:func\":\"\\\"// Declare Constants\\\\nconst info = arguments[0];\\\\n\\\\n// Store Displayed Save Data\\\\ninfo.gold = $gameParty.gold();\\\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\\\ninfo.description = $gameSystem.getSaveDescription() || '';\\\\ninfo.picture = $gameSystem.getSavePicture() || '';\\\\n\\\\n// Return Save Info\\\\nreturn info;\\\"\",\"List\":\"\",\"ListRows:num\":\"4\",\"ListCols:num\":\"1\",\"ListContentsJS:func\":\"\\\"// Declare Variables\\\\nconst info = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\n\\\\n// Draw Actors\\\\nconst minimumScale = true;\\\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\\\nlet ch = rect.height;\\\\nif (this.actorStyle() === 'sprite') {\\\\n    ch -= lineHeight - 8;\\\\n} else if (this.actorStyle() === 'svbattler') {\\\\n    ch -= lineHeight - 12;\\\\n}\\\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\\\n\\\\n// Draw Gradients\\\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\\\nif (info.gold || info.description) {\\\\n    const gy = rect.y + rect.height - lineHeight;\\\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\\\n}\\\\n\\\\n// Draw Data\\\\nthis.contents.fontSize = 18;\\\\ny = rect.y;\\\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\\\ny = rect.y + rect.height - lineHeight;\\\\nif (info.gold) {\\\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\\\n}\\\\n\\\\n// Draw Description\\\\ny = rect.y + rect.height - lineHeight;\\\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\\"\",\"ListFileDataJS:func\":\"\\\"// Declare Constants\\\\nconst savefileId = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\\\n\\\\n// Draw File Data\\\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\\\"\",\"Vertical\":\"\",\"VertRows:num\":\"1\",\"VertCols:num\":\"3\",\"VertContentsJS:func\":\"\\\"// Declare Variables\\\\nconst info = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\n\\\\n// Draw Actors\\\\nconst minimumScale = true;\\\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\\\nconst cy = rect.y + ((rect.height - ch) / 2);\\\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\\\n\\\\n// Draw Gradients\\\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\\\nconst gy = rect.y + rect.height - lineHeight * 2;\\\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\\\n\\\\n// Draw Description\\\\ny = rect.y + lineHeight * 2;\\\\nthis.setWordWrap(true);\\\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\\\nthis.resetWordWrap(false);\\\\n\\\\n// Draw Data\\\\nthis.contents.fontSize = 18;\\\\ny = rect.y + rect.height - lineHeight;\\\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\\\ny -= lineHeight;\\\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\\\nif (info.gold) {\\\\n    y -= lineHeight;\\\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\\\n}\\\"\",\"VertFileDataJS:func\":\"\\\"// Declare Constants\\\\nconst savefileId = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\n\\\\n// Draw File Data\\\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\\\nthis.drawLatestMarker(savefileId, x2, rect.y);\\\"\",\"Box\":\"\",\"BoxRows:num\":\"2\",\"BoxCols:num\":\"3\",\"BoxContentsJS:func\":\"\\\"// Declare Variables\\\\nconst info = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\n\\\\n// Draw Actors\\\\nconst minimumScale = false;\\\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\\\nconst rh = rect.height - lineHeight * 3;\\\\nconst ch = ImageManager.faceHeight;\\\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\\\n\\\\n// Draw Gradients\\\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\\\nconst gy = rect.y + rect.height - lineHeight * 2;\\\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\\\n\\\\n// Draw Data\\\\nthis.contents.fontSize = 18;\\\\ny = rect.y + lineHeight;\\\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\\\ny += lineHeight;\\\\nconst hw = rect.width / 2;\\\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\\\nif (info.gold) {\\\\n    // Ignore drawing gold in this style\\\\n    // y = rect.y + rect.height - lineHeight * 3;\\\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\\\n}\\\\n\\\\n// Draw Description\\\\ny = rect.y + rect.height - lineHeight * 2;\\\\nthis.setWordWrap(true);\\\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\\\nthis.resetWordWrap(false);\\\"\",\"BoxFileDataJS:func\":\"\\\"// Declare Constants\\\\nconst savefileId = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\n\\\\n// Draw File Data\\\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\\\nthis.drawLatestMarker(savefileId, x2, rect.y);\\\"\",\"Large\":\"\",\"LargeRows:num\":\"1\",\"LargeCols:num\":\"1\",\"LargeContentsJS:func\":\"\\\"// Declare Variables\\\\nconst info = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\n\\\\n// Draw Actors\\\\nconst minimumScale = false;\\\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\\\nconst cy = rect.y + ((rect.height - ch) / 2);\\\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\\\n\\\\n// Draw Gradients\\\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\\\nconst gy = rect.y + rect.height - lineHeight;\\\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\\\n\\\\n// Draw Description\\\\ny = rect.y + lineHeight * 1.5;\\\\nthis.setWordWrap(true);\\\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\\\nthis.resetWordWrap(false);\\\\n\\\\n// Draw Data\\\\nthis.contents.fontSize = 18;\\\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\\\ny = rect.y + rect.height - lineHeight;\\\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\\\nif (info.gold) {\\\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\\\n}\\\"\",\"LargeFileDataJS:func\":\"\\\"// Declare Constants\\\\nconst savefileId = arguments[0];\\\\nconst rect = arguments[1];\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\n\\\\n// Draw File Data\\\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\\\nthis.drawLatestMarker(savefileId, x2, rect.y);\\\"\"}","encoding":"plain","availability":"supported","structName":"SaveMenu","fields":[{"id":"SAV-META-078","key":"General","storageKey":"General","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-079","key":"LatestText","storageKey":"LatestText:str","type":"string","editorType":"text","nativeDefault":"NEW!","encoding":"plain","availability":"supported","parent":"General","context":"Marker text drawn by drawLatestMarker only for DataManager.latestSavefileId and never for slot 0. Default layouts call that helper; custom FileDataJS can omit it. An empty string hides the text; this does not change which file is considered latest."},{"id":"SAV-META-080","key":"LatestColor","storageKey":"LatestColor:str","type":"string","editorType":"text","nativeDefault":"#f49ac1","encoding":"plain","availability":"supported","parent":"General","context":"For example #f49ac1 or 2 selects a custom color or windowskin text palette color. Used by drawLatestMarker for the latest non-autosave slot, when its drawing callback includes that helper. This changes presentation only."},{"id":"SAV-META-081","key":"SpriteWidth","storageKey":"SpriteWidth:num","type":"number","editorType":"number","nativeDefault":"48","encoding":"plain","availability":"supported","parent":"General","context":"Used as the step between actor centers and to center the row. It does not resize or crop the character frames; drawCharacter uses the native frame dimensions. Choose a positive spacing suitable for your character graphics to avoid overlap. Applies with ActorGraphic=sprite and as the old-save fallback for svbattler."},{"id":"SAV-META-082","key":"SvBattlerWidth","storageKey":"SvBattlerWidth:num","type":"number","editorType":"number","nativeDefault":"64","encoding":"plain","availability":"supported","parent":"General","context":"Used as the step between actor centers and to center the row; it does not resize battler frames. Frames come from a 9x6 sheet unless the filename contains $, which treats the whole image as one frame. Choose positive spacing suitable for the graphics. Applies with ActorGraphic=svbattler and saved svbattlers metadata. The default vertical and large ContentsJS presets also use this value as actor-area height for non-face graphics, including map sprites, so it affects their vertical layout without resizing frames."},{"id":"SAV-META-083","key":"MakeSavefileInfoJS","storageKey":"MakeSavefileInfoJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","encoding":"json","availability":"supported","javascript":"body","parent":"General","context":"JavaScript body called by DataManager.makeSavefileInfo with this=DataManager and arguments[0]=the native metadata object (title, faces, characters, playtime, timestamp, etc.). Return that object or a compatible object; the return becomes the stored save-list metadata. Example: const info = arguments[0]; info.chapter = $gameVariables.value(1); return info; Preserve native fields and, when using default layouts, gold/svbattlers/description/picture additions shown in the default body. Existing saves are not retroactively updated. Exceptions are wrapped as SAV_CALLBACK_FAILED with field and cause; no asynchronous return is awaited."},{"id":"SAV-META-084","key":"List","storageKey":"List","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-085","key":"ListRows","storageKey":"ListRows:num","type":"number","editorType":"number","nativeDefault":"4","encoding":"plain","availability":"supported","min":1,"parent":"List","context":"Visible rows for SaveMenuStyle=list. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-086","key":"ListCols","storageKey":"ListCols:num","type":"number","editorType":"number","nativeDefault":"1","encoding":"plain","availability":"supported","min":1,"parent":"List","context":"Visible columns for SaveMenuStyle=list. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-087","key":"ListContentsJS","storageKey":"ListContentsJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","encoding":"json","availability":"supported","javascript":"body","parent":"List","context":"JavaScript drawing body for SaveMenuStyle=list. this is Window_SavefileList; arguments[0] is existing save metadata and arguments[1] is its item Rectangle in window-content pixels. It runs only for populated slots after the optional picture has loaded; stale asynchronous draws are discarded after refresh/destruction. Return value is ignored. Example: const info = arguments[0]; const rect = arguments[1]; this.drawText(String(info.gold ?? 0), rect.x, rect.y, rect.width, \"left\"); Use drawActors/drawDescription/drawCenteredPicture helpers as in the default body for richer layouts. FileDataJS runs afterwards; empty slots skip this callback. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-088","key":"ListFileDataJS","storageKey":"ListFileDataJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","encoding":"json","availability":"supported","javascript":"body","parent":"List","context":"JavaScript drawing body for SaveMenuStyle=list. this is Window_SavefileList; arguments[0] is the numeric savefile ID and arguments[1] is its item Rectangle in content pixels. Runs for empty slots too, and after ContentsJS for populated slots; metadata may be absent. Return value is ignored. Example: const id = arguments[0]; const rect = arguments[1]; this.drawTitle(id, rect.x, rect.y); Custom drawing must fit rect and may add drawLatestMarker. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-089","key":"Vertical","storageKey":"Vertical","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-090","key":"VertRows","storageKey":"VertRows:num","type":"number","editorType":"number","nativeDefault":"1","encoding":"plain","availability":"supported","min":1,"parent":"Vertical","context":"Visible rows for SaveMenuStyle=vertical. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-091","key":"VertCols","storageKey":"VertCols:num","type":"number","editorType":"number","nativeDefault":"3","encoding":"plain","availability":"supported","min":1,"parent":"Vertical","context":"Visible columns for SaveMenuStyle=vertical. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-092","key":"VertContentsJS","storageKey":"VertContentsJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","encoding":"json","availability":"supported","javascript":"body","parent":"Vertical","context":"JavaScript drawing body for SaveMenuStyle=vertical. this is Window_SavefileList; arguments[0] is existing save metadata and arguments[1] is its item Rectangle in window-content pixels. It runs only for populated slots after the optional picture has loaded; stale asynchronous draws are discarded after refresh/destruction. Return value is ignored. Example: const info = arguments[0]; const rect = arguments[1]; this.drawText(String(info.gold ?? 0), rect.x, rect.y, rect.width, \"left\"); Use drawActors/drawDescription/drawCenteredPicture helpers as in the default body for richer layouts. FileDataJS runs afterwards; empty slots skip this callback. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-093","key":"VertFileDataJS","storageKey":"VertFileDataJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","encoding":"json","availability":"supported","javascript":"body","parent":"Vertical","context":"JavaScript drawing body for SaveMenuStyle=vertical. this is Window_SavefileList; arguments[0] is the numeric savefile ID and arguments[1] is its item Rectangle in content pixels. Runs for empty slots too, and after ContentsJS for populated slots; metadata may be absent. Return value is ignored. Example: const id = arguments[0]; const rect = arguments[1]; this.drawTitle(id, rect.x, rect.y); Custom drawing must fit rect and may add drawLatestMarker. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-094","key":"Box","storageKey":"Box","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-095","key":"BoxRows","storageKey":"BoxRows:num","type":"number","editorType":"number","nativeDefault":"2","encoding":"plain","availability":"supported","min":1,"parent":"Box","context":"Visible rows for SaveMenuStyle=box. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-096","key":"BoxCols","storageKey":"BoxCols:num","type":"number","editorType":"number","nativeDefault":"3","encoding":"plain","availability":"supported","min":1,"parent":"Box","context":"Visible columns for SaveMenuStyle=box. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-097","key":"BoxContentsJS","storageKey":"BoxContentsJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","encoding":"json","availability":"supported","javascript":"body","parent":"Box","context":"JavaScript drawing body for SaveMenuStyle=box. this is Window_SavefileList; arguments[0] is existing save metadata and arguments[1] is its item Rectangle in window-content pixels. It runs only for populated slots after the optional picture has loaded; stale asynchronous draws are discarded after refresh/destruction. Return value is ignored. Example: const info = arguments[0]; const rect = arguments[1]; this.drawText(String(info.gold ?? 0), rect.x, rect.y, rect.width, \"left\"); Use drawActors/drawDescription/drawCenteredPicture helpers as in the default body for richer layouts. FileDataJS runs afterwards; empty slots skip this callback. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-098","key":"BoxFileDataJS","storageKey":"BoxFileDataJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","encoding":"json","availability":"supported","javascript":"body","parent":"Box","context":"JavaScript drawing body for SaveMenuStyle=box. this is Window_SavefileList; arguments[0] is the numeric savefile ID and arguments[1] is its item Rectangle in content pixels. Runs for empty slots too, and after ContentsJS for populated slots; metadata may be absent. Return value is ignored. Example: const id = arguments[0]; const rect = arguments[1]; this.drawTitle(id, rect.x, rect.y); Custom drawing must fit rect and may add drawLatestMarker. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-099","key":"Large","storageKey":"Large","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-100","key":"LargeRows","storageKey":"LargeRows:num","type":"number","editorType":"number","nativeDefault":"1","encoding":"plain","availability":"supported","min":1,"parent":"Large","context":"Visible rows for SaveMenuStyle=large. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-101","key":"LargeCols","storageKey":"LargeCols:num","type":"number","editorType":"number","nativeDefault":"1","encoding":"plain","availability":"supported","min":1,"parent":"Large","context":"Visible columns for SaveMenuStyle=large. Use an integer of at least 1; startup validation rejects zero, negative or fractional values. Other styles retain their own counts. More cells reduce the available area per save entry; custom drawing must fit the resulting item rectangle."},{"id":"SAV-META-102","key":"LargeContentsJS","storageKey":"LargeContentsJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","encoding":"json","availability":"supported","javascript":"body","parent":"Large","context":"JavaScript drawing body for SaveMenuStyle=large. this is Window_SavefileList; arguments[0] is existing save metadata and arguments[1] is its item Rectangle in window-content pixels. It runs only for populated slots after the optional picture has loaded; stale asynchronous draws are discarded after refresh/destruction. Return value is ignored. Example: const info = arguments[0]; const rect = arguments[1]; this.drawText(String(info.gold ?? 0), rect.x, rect.y, rect.width, \"left\"); Use drawActors/drawDescription/drawCenteredPicture helpers as in the default body for richer layouts. FileDataJS runs afterwards; empty slots skip this callback. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."},{"id":"SAV-META-103","key":"LargeFileDataJS","storageKey":"LargeFileDataJS:func","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","encoding":"json","availability":"supported","javascript":"body","parent":"Large","context":"JavaScript drawing body for SaveMenuStyle=large. this is Window_SavefileList; arguments[0] is the numeric savefile ID and arguments[1] is its item Rectangle in content pixels. Runs for empty slots too, and after ContentsJS for populated slots; metadata may be absent. Return value is ignored. Example: const id = arguments[0]; const rect = arguments[1]; this.drawTitle(id, rect.x, rect.y); Custom drawing must fit rect and may add drawLatestMarker. Exceptions become SAV_CALLBACK_FAILED with field and cause; returned promises are not awaited."}],"parent":"SaveMenuStyle:str","context":"CLI parameters get returns decoded keys without native type suffixes; use these keys in --value JSON. Struct writes merge supplied known fields and preserve omitted existing fields. nativeDefault/example retain editor serialization; editor-only labels are excluded from CLI writes. Configure the four save-list layouts. The selected /SaveMenuStyle chooses its rows, columns and two drawing callbacks. MakeSavefileInfoJS supplies metadata when saving; layout callbacks receive that metadata and a pixel rectangle. See individual callback descriptors for receiver, arguments and return requirements."},{"id":"SAV-META-027","key":"BreakEnd1","storageKey":"BreakEnd1","type":"string","editorType":"text","nativeDefault":"----------------------------------","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-028","key":"End Of","storageKey":"End Of","type":"string","editorType":"text","nativeDefault":"Plugin Parameters","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-META-029","key":"BreakEnd2","storageKey":"BreakEnd2","type":"string","editorType":"text","nativeDefault":"----------------------------------","encoding":"plain","availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."}],"commands":[{"id":"SAV-COMMAND-Separator_Begin","key":"Separator_Begin","args":[],"availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-COMMAND-AutosaveEnable","key":"AutosaveEnable","args":[{"id":"SAV-META-003","key":"Enable","storageKey":"Enable:eval","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported"}],"availability":"supported","targets":["map","common-event","troop"],"context":"Requires database autosave compatibility (not battle/event test, database autosave on; single style turns it on at boot). Changes Game_System autosaveEnabled, which is stored with the game. It does not change the player ConfigManager option and does not write a save immediately. Enable is a JavaScript expression evaluated when the event command executes; true and false are simple examples."},{"id":"SAV-COMMAND-AutosaveRequest","key":"AutosaveRequest","args":[],"availability":"supported","targets":["map","common-event","troop"],"context":"Runs only outside battle and with database autosave compatibility. Requires Game_System autosave enabled, native save access enabled when configured, and player autosave option on. A pending trigger bypass can suppress the request once. Uses the configured autosave destination; current without a positive slot writes nothing. Event execution does not wait for the asynchronous write."},{"id":"SAV-COMMAND-AutosaveExecute","key":"AutosaveExecute","args":[],"availability":"supported","targets":["map","common-event","troop"],"context":"Runs only outside battle and with database autosave compatibility. Bypasses the normal request checks for Game_System autosave-enabled and save-access state, but still checks ConfigManager.autosave. Uses the configured destination; current without a positive slot writes nothing. Event execution does not wait for the asynchronous write."},{"id":"SAV-COMMAND-AutosaveForce","key":"AutosaveForce","args":[],"availability":"supported","targets":["map","common-event","troop"],"context":"Runs only outside battle and with database autosave compatibility. Bypasses ConfigManager.autosave, Game_System autosave-enabled and save-access state. Uses the configured destination; current without a positive slot writes nothing. Event execution does not wait for the asynchronous write."},{"id":"SAV-COMMAND-Separator_Save","key":"Separator_Save","args":[],"availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."},{"id":"SAV-COMMAND-SaveCurrentSlot","key":"SaveCurrentSlot","args":[],"availability":"supported","targets":["map","common-event","troop"],"context":"Only Scene_Map executes this command. standard requires a current positive slot; locked falls back to 1; single uses slot 0. It does not open slot selection or test the player autosave option. A successful write uses the manual save callback/confirmation. The scene becomes inactive until confirmation closes; the event command does not create an interpreter wait for the save promise."},{"id":"SAV-COMMAND-SaveDescription","key":"SaveDescription","args":[{"id":"SAV-META-010","key":"Text","storageKey":"Text:str","type":"string","editorType":"text","nativeDefault":"Text","encoding":"plain","availability":"supported"}],"availability":"supported","targets":["map","common-event","troop"],"context":"Updates Game_System save description; it does not immediately save or alter metadata already stored in old saves. Variable, actor-name and party-name escapes are resolved when assigned: \\V[1], \\N[1], \\P[1]. Other text codes are left for later drawTextEx rendering. Default MakeSavefileInfoJS copies it to info.description and the default layouts draw it."},{"id":"SAV-COMMAND-SavePicture","key":"SavePicture","args":[{"id":"SAV-META-012","key":"Filename","storageKey":"Filename:str","type":"string","editorType":"file","nativeDefault":"","encoding":"plain","availability":"supported","directory":"img/pictures/"}],"availability":"supported","targets":["map","common-event","troop"],"context":"Use a file under img/pictures without the .png extension, such as Chapter1; an empty string clears the choice. This only updates Game_System until a later save stores metadata through MakeSavefileInfoJS. It neither shows a map picture nor rewrites old save metadata. Default save-list layouts load and draw info.picture; a custom metadata or drawing callback must retain that behavior if desired."},{"id":"SAV-COMMAND-Separator_End","key":"Separator_End","args":[],"availability":"editorial","context":"This entry preserves the editor layout and its native value. It is not a player-facing setting or an executable script. Keep the existing value; the CLI excludes editor-only entries from authoring. A path shared with a functional field refers to that functional field when used in authoring."}],"availability":"supported","namespace":"save"};
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


function resolveOptionsSaveConfiguration(catalog,plugins){
    const prefix=catalog.pluginId.endsWith('OptionsCore')?'OPT':'SAV';
    const selection=resolvePluginConfiguration(catalog,plugins,{errorPrefix:prefix});
    function fail(path,message){
        const error=new Error(`${message} at ${path}.`);
        error.code=`${prefix}_CONFIG_ENCODING`;error.field=path;throw error;
    }
    function json(raw,path){
        try{return JSON.parse(raw);}catch{fail(path,'Invalid JSON');}
    }
    function complete(fields,raw,path){
        if(!raw||typeof raw!=='object'||Array.isArray(raw))fail(path,'Expected parameter object');
        const output={...raw};
        for(const field of fields){
            if(field.key==='CoretoConfigSource')continue;
            const key=field.storageKey,at=`${path}/${key}`;
            const value=Object.hasOwn(raw,key)?raw[key]:field.nativeDefault;
            if(typeof value!=='string')fail(at,'Expected native string');
            if(value===''){output[key]=value;continue;}
            if(field.type==='struct')output[key]=JSON.stringify(complete(field.fields,value===''?{}:json(value,at),at));
            else if(field.type==='array'){
                const items=value===''?[]:json(value,at);
                if(!Array.isArray(items))fail(at,'Expected array');
                output[key]=JSON.stringify(items.map((item,index)=>{
                    const itemPath=`${at}/${index}`;
                    if(typeof item!=='string')fail(itemPath,'Expected native string item');
                    return field.items.type==='struct'?JSON.stringify(complete(field.items.fields,json(item,itemPath),itemPath)):item;
                }));
            }else{
                if(field.encoding==='json'&&value!==''&&typeof json(value,at)!=='string')fail(at,'Expected JSON string');
                if(field.type==='number'&&!Number.isFinite(Number(value)))fail(at,'Expected finite number');
                output[key]=value;
            }
        }
        return output;
    }
    return {...selection,rawParameters:complete(catalog.parameters,selection.source.parameters,selection.effectiveSource)};
}

function validateOptionsSaveProviders(catalog,plugins,globals){
    const prefix=catalog.pluginId.endsWith('OptionsCore')?'OPT':'SAV';
    const fail=(code,message)=>{const error=new Error(message);error.code=`${prefix}_${code}`;throw error;};
    if(globals.Utils.RPGMAKER_NAME!=='MZ'||globals.Utils.RPGMAKER_VERSION!=='1.10.0')fail('ENGINE_VERSION','Use RPG Maker MZ 1.10.0.');
    const filename=decodeURIComponent(globals.document.currentScript.src.split('?')[0].split('/').pop());
    if(filename!==catalog.pluginId+'.js')fail('FILENAME',`Keep the filename ${catalog.pluginId}.js.`);
    const active=plugins.filter(p=>p.status),own=active.find(p=>p.name===catalog.pluginId);
    if(active.filter(p=>[catalog.pluginId,catalog.reference.pluginId].includes(p.name)).length!==1||!own)fail('DUPLICATE_PROVIDER','Enable exactly one provider for '+catalog.pluginId+'.');
    for(const [service,supported] of Object.entries(catalog.dependencies)){
        const entries=active.filter(p=>Object.hasOwn(supported,p.name));
        if(entries.length>1||service==='cores'&&entries.length!==1)fail('DEPENDENCY',`Use one supported ${service} provider.`);
        if(!entries.length)continue;
        const entry=entries[0];
        if(active.indexOf(entry)>=active.indexOf(own))fail('PLUGIN_ORDER',`Place ${entry.name} before ${catalog.pluginId}.`);
        const apiName=service==='cores'?'CoreEngine':'MessageCore';
        const version=entry.name.startsWith('Coreto_')?globals.Coreto?.[apiName]?.version:globals.VisuMZ?.[apiName]?.version;
        if(entry.name.startsWith('Coreto_')?version!==supported[entry.name]:version!==Number(supported[entry.name]))fail('DEPENDENCY_VERSION',`Load ${entry.name} ${supported[entry.name]} before ${catalog.pluginId}.`);
    }
    if(active.some(p=>/^(?:Coreto|VisuMZ)_[23]_/.test(p.name)&&active.indexOf(p)<active.indexOf(own)))fail('PLUGIN_ORDER',`Place ${catalog.pluginId} before tier 2/3 consumers.`);
}

function decodeOptionsSaveParameters(raw,scope,code,target={},source=raw){
    function convert(values,path,output,authored=values){
        for(const storageKey of Object.keys(values)){
            const value=Object.hasOwn(authored,storageKey)?authored[storageKey]:values[storageKey];
            const [key,type]=storageKey.split(':');
            if(!type)continue;
            const at=`${path}/${storageKey}`;
            try{
                if(type==='struct'){
                    output[key]={};
                    convert(values[storageKey]===''?{}:JSON.parse(values[storageKey]),at,output[key],value===''?{}:JSON.parse(value));
                }else if(type==='arraystruct'){
                    output[key]=[];
                    const completed=values[storageKey]===''?[]:JSON.parse(values[storageKey]);
                    for(const [index,item]of (value===''?[]:JSON.parse(value)).entries()){
                        output[key][index]={};convert(JSON.parse(completed[index]??item),`${at}/${index}`,output[key][index],JSON.parse(item));
                    }
                }
                else if(type==='func')output[key]=new Function(value===''?'return 0;':JSON.parse(value));
                else if(type==='json')output[key]=value===''?'':JSON.parse(value);
                else if(type==='eval')output[key]=value===''?null:new Function('output','raw',`return eval(${JSON.stringify(value)});`).call(globalThis.VisuMZ,output,authored);
                else if(type==='num')output[key]=Number(value);
                else if(type==='str')output[key]=value;
                else if(type==='arraystr')output[key]=value===''?[]:JSON.parse(value);
            }catch(cause){
                if(cause.code===code)throw cause;
                const error=new Error(`Cannot decode ${at}: ${cause.message}`,{cause});
                error.code=code;error.field=at;throw error;
            }
        }
        return output;
    }
    return convert(raw,scope,target,source);
}

function prepareOptionsSaveSettings(configuration,scope,version,code,validate){
    const previousVisuMZ=Object.getOwnPropertyDescriptor(globalThis,'VisuMZ');
    const previousImported=Object.getOwnPropertyDescriptor(globalThis,'Imported');
    globalThis.VisuMZ??={};
    const key=scope+'Core',previousNamespace=Object.getOwnPropertyDescriptor(VisuMZ,key);
    const namespace=VisuMZ[key]||{},settings=namespace.Settings||{};
    const namespaceProperties=Object.getOwnPropertyDescriptors(namespace),settingsProperties=Object.getOwnPropertyDescriptors(settings);
    function restore(object,properties){
        for(const key of Reflect.ownKeys(object))if(!Object.hasOwn(properties,key))delete object[key];
        Object.defineProperties(object,properties);
    }
    try{
        if(scope==='Options')globalThis.Imported??={};
        VisuMZ[key]=namespace;namespace.version=version;namespace.Settings=settings;
        decodeOptionsSaveParameters(configuration.rawParameters,scope,code,settings,configuration.source.parameters);
        validate(settings);
        return settings;
    }catch(error){
        restore(settings,settingsProperties);restore(namespace,namespaceProperties);
        if(previousNamespace)Object.defineProperty(VisuMZ,key,previousNamespace);else delete VisuMZ[key];
        if(previousVisuMZ)Object.defineProperty(globalThis,'VisuMZ',previousVisuMZ);else delete globalThis.VisuMZ;
        if(previousImported)Object.defineProperty(globalThis,'Imported',previousImported);else delete globalThis.Imported;
        throw error;
    }
}

function validateSaveSettings(settings){
    function check(value,predicate,field,message){
        if(!predicate(value))throw Object.assign(new Error(`${message}: ${field}`),{code:'SAV_CONFIG_VALUE',field});
    }
    check(settings.Save?.SaveStyle,value=>['standard','locked','single'].includes(value),'Save.SaveStyle','Unknown save style');
    check(settings.SaveMenuStyle,value=>['list','vertical','box','large'].includes(value),'SaveMenuStyle','Unknown save menu style');
    check(settings.ActorGraphic,value=>['none','face','sprite','svbattler'].includes(value),'ActorGraphic','Unknown actor graphic');
    check(settings.Save.MaxSaveFiles,value=>Number.isInteger(value)&&value>=0,'Save.MaxSaveFiles','Expected a nonnegative slot count');
    for(const prefix of ['List','Vert','Box','Large'])for(const suffix of ['Rows','Cols']){
        const key=prefix+suffix;check(settings.SaveMenu?.[key],value=>Number.isInteger(value)&&value>=1,`SaveMenu.${key}`,'Expected at least one row or column');
    }
    if(settings.SaveConfirm.Enable||Object.hasOwn(settings.SaveConfirm,'Duration'))check(settings.SaveConfirm.Duration,value=>Number.isFinite(value)&&value>=0,'SaveConfirm.Duration','Expected a nonnegative duration');
    if(Object.hasOwn(settings.Autosave,'AutosaveType'))check(settings.Autosave.AutosaveType,value=>['file0','current','both'].includes(value),'Autosave.AutosaveType','Unknown autosave destination');
    if(settings.AutosaveConfirm.Enable||Object.hasOwn(settings.AutosaveConfirm,'Duration'))check(settings.AutosaveConfirm.Duration,value=>Number.isFinite(value)&&value>=0,'AutosaveConfirm.Duration','Expected a nonnegative duration');
    if(settings.AutosaveConfirm.Enable||Object.hasOwn(settings.AutosaveConfirm,'ScreenPosition'))check(settings.AutosaveConfirm.ScreenPosition,value=>/^(lower|middle|upper) (left|center|right)$/.test(value),'AutosaveConfirm.ScreenPosition','Unknown autosave confirmation position');
}

function saveCallback(settings,path,receiver,...args){
    const [group,key]=path.split('.');
    try{return settings[group][key].apply(receiver,args);}
    catch(cause){throw Object.assign(new Error(`Save callback ${path} failed: ${cause.message}`,{cause}),{code:'SAV_CALLBACK_FAILED',field:path});}
}

function installSaveState(settings){
    const init=Game_System.prototype.initialize;
    Game_System.prototype.initialize=function(){init.call(this);this.initSaveCore();};
    Game_System.prototype.initSaveCore=function(){
        this._SaveCoreSettings??={};
        const defaults={autosaveEnabled:true,saveDescription:'',savePicture:''};
        for(const [key,value]of Object.entries(defaults))if(!Object.hasOwn(this._SaveCoreSettings,key))this._SaveCoreSettings[key]=value;
    };
    Game_System.prototype.getSaveDescription=function(){this.initSaveCore();return this._SaveCoreSettings.saveDescription;};
    Game_System.prototype.getSavePicture=function(){this.initSaveCore();return this._SaveCoreSettings.savePicture;};
    Game_System.prototype.setSavePicture=function(value){this.initSaveCore();this._SaveCoreSettings.savePicture=value;};
    Game_System.prototype.setSaveDescription=function(value){
        this.initSaveCore();
        this._SaveCoreSettings.saveDescription=VisuMZ.SaveCore.ParseTextCodes(value);
    };
    VisuMZ.SaveCore.ParseTextCodes=function(text){
        while(text.match(/\\V\[(\d+)\]/gi))text=text.replace(/\\V\[(\d+)\]/gi,(_,id)=>$gameVariables.value(Number(id)));
        while(text.match(/\\N\[(\d+)\]/gi))text=text.replace(/\\N\[(\d+)\]/gi,(_,id)=>Window_Base.prototype.actorName(Number(id)));
        while(text.match(/\\P\[(\d+)\]/gi))text=text.replace(/\\P\[(\d+)\]/gi,(_,id)=>Window_Base.prototype.partyMemberName(Number(id)));
        return text;
    };
    const afterLoad=Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad=function(){
        afterLoad.call(this);
        if($gameMap&&globalThis.Imported?.VisuMZ_1_EventsMoveCore)$gameMap.clearEventCache();
        setTimeout(VisuMZ.SaveCore.RemoveSaveCoreCache.bind(this),settings.SaveConfirm.Duration+10);
    };
    Game_Party.prototype.svbattlersForSaveFile=function(){return this.battleMembers().map(actor=>actor.battlerName());};
    const makeInfo=DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo=function(){return saveCallback(settings,'SaveMenu.MakeSavefileInfoJS',this,makeInfo.call(this));};
    DataManager.maxSavefiles=function(){return settings.Save.MaxSaveFiles+(settings.Save.AutosaveMaxCount?0:1);};
    for(const pluginId of [catalog.pluginId,catalog.reference.pluginId]){
        PluginManager.registerCommand(pluginId,'SaveDescription',function(args){$gameSystem.setSaveDescription(args['Text:str']);});
        PluginManager.registerCommand(pluginId,'SavePicture',function(args){$gameSystem.setSavePicture(args['Filename:str']);});
    }
}

function installSaveStorage(settings){
    DataManager.makeSavename=function(id){return settings.Save.FilenameFmt.format(id);};
    StorageManager.isLocalMode=function(){return Utils.isNwjs()?settings.Save.LocalMode:false;};
    StorageManager.filePath=function(name){return this.fileDirectoryPath()+settings.Save.ExtensionFmt.format(name);};
    StorageManager.forageKey=function(name){return settings.Save.KeyFmt.format($dataSystem.advanced.gameId,name);};
    StorageManager.forageTestKey=function(){return settings.Save.TestKey;};
    // Preserve native saveGame/saveGlobalInfo completion and failure semantics (ADR002).
    DataManager.loadGame=async function(id){
        const contents=await StorageManager.loadObject(this.makeSavename(id));
        const classes={system:Game_System,screen:Game_Screen,timer:Game_Timer,switches:Game_Switches,variables:Game_Variables,selfSwitches:Game_SelfSwitches,actors:Game_Actors,party:Game_Party,map:Game_Map,player:Game_Player};
        for(const [key,Type]of Object.entries(classes)){
            if(!(contents?.[key] instanceof Type))throw Object.assign(new Error(`Save ${id} has an invalid ${key}.`),{code:'SAV_INVALID_CONTENTS',savefileId:id,field:key});
        }
        this.createGameObjects();this.extractSaveContents(contents);this.correctDataErrors();return 0;
    };
}

function installSaveList(settings){
    const menu=settings.SaveMenu;
    ImageManager.saveMenuSpriteWidth=menu.SpriteWidth;
    ImageManager.saveMenuSvBattlerWidth=menu.SvBattlerWidth;
    ImageManager.svActorHorzCells=9;ImageManager.svActorVertCells=6;
    TextManager.latestSave=menu.LatestText;
    ColorManager.latestSavefile=function(){return this._colorCache?._stored_latestSavefile||this.getColorDataFromPluginParameters('_stored_latestSavefile',menu.LatestColor);};
    const createGameObjects=DataManager.createGameObjects;
    DataManager.createGameObjects=function(){createGameObjects.call(this);Scene_File.MAX_BATTLE_MEMBERS=$gameParty.maxBattleMembers();};
    const prefixes={list:'List',vertical:'Vert',box:'Box',large:'Large'};
    const list=Window_SavefileList.prototype;
    list.selectSavefile=function(id){this.smoothSelect(Math.max(0,this.savefileIdToIndex(id)));};
    const setMode=list.setMode;
    list.setMode=function(mode,autosave){setMode.call(this,mode,StorageManager.autosaveType()==='current'||$gameTemp._pickLockedSaveSlot?false:autosave);};
    const refresh=list.refresh;
    list.refresh=function(){this._saveDrawGeneration=(this._saveDrawGeneration??0)+1;refresh.call(this);};
    list.menuStyle=function(){return settings.SaveMenuStyle;};
    list.actorStyle=function(){return settings.ActorGraphic;};
    list.numVisibleRows=function(){return menu[prefixes[this.menuStyle()]+'Rows'];};
    list.maxCols=function(){return menu[prefixes[this.menuStyle()]+'Cols'];};
    list.setWordWrap=function(value){this._wordWrap=value;};
    list.resetWordWrap=function(){this.setWordWrap(false);};
    list.drawItem=function(index){
        const id=this.indexToSavefileId(index),info=DataManager.savefileInfo(id);
        if(info)info.savefileId=id;
        this._savefileId=id;
        const rect=this.itemRect(index);
        this.resetFontSettings();this.changePaintOpacity(this.isEnabled(id));
        this.drawContents(info,rect);
    };
    const styleNames={list:'List',vertical:'Vertical',box:'Box',large:'Large'};
    for(const [style,name]of Object.entries(styleNames))for(const kind of ['Contents','FileData']){
        list[`draw${name}Style${kind}`]=function(value,rect){saveCallback(settings,`SaveMenu.${prefixes[style]}${kind}JS`,this,value,rect);};
    }
    list.drawContents=function(info,rect){
        if(!info){this.drawFileData(this._savefileId,rect);return;}
        const bitmap=ImageManager.loadPicture(info.picture||''),generation=this._saveDrawGeneration;
        bitmap.addLoadListener(()=>{
            if(this._destroyed||generation!==this._saveDrawGeneration)return;
            this.drawContentsLoaded(info,rect);
        });
    };
    list.drawContentsLoaded=function(info,rect){
        this[`draw${styleNames[this.menuStyle()]}StyleContents`](info,rect);
        this.resetFontSettings();this.drawFileData(info.savefileId,rect);
    };
    list.drawFileData=function(id,rect){this[`draw${styleNames[this.menuStyle()]}StyleFileData`](id,rect);};
    list.drawLatestMarker=function(id,x,y){
        if(id===0||id!==DataManager.latestSavefileId())return;
        this.changeTextColor(ColorManager.latestSavefile());this.drawText(TextManager.latestSave,x,y,180);
    };
    list.drawPlaytime=function(info,x,y,width,align){if(info.playtime)this.drawText(info.playtime,x,y,width,align||'left');};
    list.getTimestamp=function(info){
        const date=new Date(info.timestamp),pad=value=>String(value).padStart(2,'0');
        return `${String(date.getFullYear()).split('').join('\u200b')}.${date.getMonth()+1}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    list.drawTimestamp=function(info,x,y,width,align){
        if(!info.timestamp)return;
        let text=this.getTimestamp(info);
        if(globalThis.Imported?.VisuMZ_0_CoreEngine&&this.useDigitGrouping())text=`{{${text}}}`;
        this.drawText(text,x,y,width,align||'left');
    };
    list.drawCurrency=function(info,x,y,width){if(info.gold!==undefined)Window_SavefileList.prototype.drawCurrencyValue.call(this,info.gold,TextManager.currencyUnit,x,y,width);};
    list.drawDescription=function(info,x,y,width){if(info.description)this.drawTextEx(info.description,x,y,width);};
    list.drawActors=function(info,x,y,width,height){
        const method={face:'drawActorFaces',sprite:'drawActorSprites',svbattler:'drawSvBattlerSprites'}[this.actorStyle()];
        if(method)this[method](info,x,y,width,height);
    };
    list.drawActorFaces=function(info,x,y,width,height){
        const faces=info.faces??[],count=Math.max(Scene_File.MAX_BATTLE_MEMBERS,faces.length),w=Math.min(ImageManager.faceWidth,Math.floor(width/count)),h=Math.min(ImageManager.faceHeight,height-2);
        const start=Math.round(x+(width-w*count)/2);
        faces.forEach(([name,index],i)=>this.drawFace(name,index,start+w*i,y+1,w,h));
    };
    list.drawActorSprites=function(info,x,y,width,height){
        const actors=info.characters??[],step=ImageManager.saveMenuSpriteWidth,start=x+Math.round((width-step*Math.max(Scene_File.MAX_BATTLE_MEMBERS,actors.length))/2)+step/2;
        actors.forEach(([name,index],i)=>this.drawCharacter(name,index,start+step*i,y+height-8));
    };
    list.drawSvBattlerSprites=function(info,x,y,width,height){
        if(!info.svbattlers)return this.drawActorSprites(info,x,y,width,height);
        const actors=info.svbattlers,step=ImageManager.saveMenuSvBattlerWidth,start=x+Math.round((width-step*Math.max(Scene_File.MAX_BATTLE_MEMBERS,actors.length))/2)+step/2;
        actors.forEach((name,i)=>this.drawSvActor(name,start+step*i,y+height-8));
    };
    Window_Base.prototype.drawSvActor=function(name,x,y){
        const bitmap=ImageManager.loadSvActor(name);
        const generation=this._saveDrawGeneration;
        bitmap.addLoadListener(()=>{
            if(this._destroyed||generation!==this._saveDrawGeneration)return;
            const single=/\$/i.test(name),w=bitmap.width/(single?1:ImageManager.svActorHorzCells),h=bitmap.height/(single?1:ImageManager.svActorVertCells);
            this.contents.blt(bitmap,0,0,w,h,x-w/2,y-h);
        });
    };
    list.drawPicture=function(name,x,y,width,height,minimumScale){
        if(name==='')return;
        const bitmap=ImageManager.loadPicture(name),scale=Math.min((width-4)/bitmap.width,(height-4)/bitmap.height,minimumScale?1:1000);
        this.contentsBack.blt(bitmap,0,0,bitmap.width,bitmap.height,x+2,y+2,Math.ceil(bitmap.width*scale),Math.ceil(bitmap.height*scale));
    };
    list.drawCenteredPicture=function(name,x,y,width,height,minimumScale){
        if(!name)return;
        const bitmap=ImageManager.loadPicture(name),generation=this._saveDrawGeneration;
        bitmap.addLoadListener(()=>{
            if(this._destroyed||generation!==this._saveDrawGeneration)return;
            let scale=Math.min((width-4)/bitmap.width,(height-4)/bitmap.height);
            if(minimumScale)scale=Math.min(1,scale);
            const w=Math.ceil(bitmap.width*scale),h=Math.ceil(bitmap.height*scale);
            this.contentsBack.blt(bitmap,0,0,bitmap.width,bitmap.height,x+(width-w)/2,y+(height-h)/2,w,h);
        });
    };
    const loadImages=DataManager.loadSavefileImages;
    DataManager.loadSavefileImages=function(info){
        loadImages.call(this,info);
        for(const name of info.svbattlers??[])ImageManager.loadSvActor(name);
        if(info.picture)ImageManager.loadPicture(info.picture);
    };
    const loadAllImages=DataManager.loadAllSavefileImages;
    DataManager.loadAllSavefileImages=function(){loadAllImages.call(this);this.loadPartyImagesForSavefile();};
    DataManager.loadPartyImagesForSavefile=function(){
        for(const actor of $gameParty.members()){
            if(actor.faceName())ImageManager.loadFace(actor.faceName());
            if(actor.characterName())ImageManager.loadCharacter(actor.characterName());
            if(actor.battlerName())ImageManager.loadSvActor(actor.battlerName());
        }
    };
}

function installSaveScenes(settings){
    StorageManager.saveStyle=function(){return settings.Save.SaveStyle;};
    StorageManager.autosaveType=function(){return this.saveStyle()==='single'?'file0':settings.Autosave.AutosaveType;};
    Object.assign(TextManager,{pickLockedSaveSlot:settings.Save.VocabLockedSaveSlot,saveSuccess:settings.SaveConfirm.VocabSaveSuccess,saveFailure:settings.SaveConfirm.VocabSaveFailure,loadFailure:settings.SaveConfirm.VocabLoadFailure});
    const maxSavefiles=DataManager.maxSavefiles;
    DataManager.maxSavefiles=function(){return StorageManager.saveStyle()==='single'?1:maxSavefiles.call(this);};
    const savefileId=Game_System.prototype.savefileId;
    Game_System.prototype.savefileId=function(){
        const style=StorageManager.saveStyle();
        if(style==='single')return 0;
        const id=savefileId.call(this);
        return style==='locked'?id||1:id;
    };
    const newGame=Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame=function(){
        if(StorageManager.saveStyle()!=='locked')return newGame.call(this);
        this.commandNewGameSaveCoreLocked();
    };
    Scene_Title.prototype.commandNewGameSaveCoreLocked=function(){
        DataManager.setupNewGame();$gameTemp._pickLockedSaveSlot=true;
        this._commandWindow.close();SceneManager.push(Scene_Save);
    };
    const help=Scene_Save.prototype.helpWindowText;
    Scene_Save.prototype.helpWindowText=function(){return $gameTemp._pickLockedSaveSlot?TextManager.pickLockedSaveSlot:help.call(this);};
    Scene_Save.prototype.startNewGameLockedSave=function(id){
        $gameTemp._pickLockedSaveSlot=false;SoundManager.playLoad();$gameSystem.setSavefileId(id);
        this.fadeOutAll();SceneManager.goto(Scene_Map);
    };
    const pop=Scene_Save.prototype.popScene;
    Scene_Save.prototype.popScene=function(){
        $gameTemp._pickLockedSaveSlot=false;pop.call(this);
    };
    Scene_Base.prototype.saveConfirmationWindowRect=function(){return saveCallback(settings,'SaveConfirm.ConfirmRect',this);};
    Scene_Base.prototype.isSaveConfirmWindowEnabled=function(){return settings.SaveConfirm.Enable;};
    Scene_Base.prototype.createSaveConfirmationWindow=function(){
        if(this._saveConfirmWindow)return;
        this._saveConfirmWindow=new Window_Base(this.saveConfirmationWindowRect());this._saveConfirmWindow.openness=0;
    };
    Scene_Base.prototype.openSaveConfirmationWindow=function(success,loadFailure=false){
        if(!this.isSaveConfirmWindowEnabled())return this.closeSaveConfirmationWindow(success);
        if(!this._saveConfirmWindow)this.createSaveConfirmationWindow();
        const window=this._saveConfirmWindow;
        this.removeChild(window);this.addChild(window);window.open();window.resetFontSettings();window.contents.clear();
        const text=loadFailure?TextManager.loadFailure:success?TextManager.saveSuccess:TextManager.saveFailure;
        const width=window.textSizeEx(text).width;
        window.drawTextEx(text,(window.innerWidth-width)/2,0,width);
        setTimeout(this.closeSaveConfirmationWindow.bind(this,success),settings.SaveConfirm.Duration);
    };
    Scene_Base.prototype.closeSaveConfirmationWindow=function(){if(this._saveConfirmWindow)this._saveConfirmWindow.close();};
    Scene_Base.prototype.loadFailureConfirmationWindow=function(){this.openSaveConfirmationWindow(false,true);};
    for(const Scene of [Scene_Save,Scene_Load])Scene.prototype.closeSaveConfirmationWindow=function(success){
        Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this.activateListWindow();
    };
    function saved(scene){SoundManager.playSave();saveCallback(settings,'Save.OnSaveSuccessJS',scene);}
    function failed(scene){SoundManager.playBuzzer();saveCallback(settings,'Save.OnSaveFailureJS',scene);}
    Scene_Save.prototype.onSaveSuccess=function(){saved(this);this._listWindow.refresh();this.openSaveConfirmationWindow(true);};
    Scene_Save.prototype.onSaveFailure=function(){failed(this);this.openSaveConfirmationWindow(false);};
    Scene_Save.prototype.executeSave=function(id){
        if($gameTemp._pickLockedSaveSlot)return this.startNewGameLockedSave(id);
        $gameSystem.setSavefileId(id);$gameSystem.onBeforeSave();
        DataManager.saveGame(id).then(()=>this.onSaveSuccess()).catch(()=>this.onSaveFailure());
    };
    const loaded=Scene_Load.prototype.onLoadSuccess;
    VisuMZ.SaveCore.RemoveSaveCoreCache=function(){$gameSystem._saveCorePluginCommandSave=undefined;};
    Scene_Load.prototype.onLoadSuccess=function(){loaded.call(this);saveCallback(settings,'Save.OnLoadSuccessJS',this);setTimeout(VisuMZ.SaveCore.RemoveSaveCoreCache.bind(this),1000);};
    Scene_Load.prototype.onLoadFailure=function(){SoundManager.playBuzzer();saveCallback(settings,'Save.OnLoadFailureJS',this);this.loadFailureConfirmationWindow();};
    Scene_Base.prototype.saveCurrentSlot=function(){};
    Scene_Map.prototype.saveCurrentSlot=function(){
        if($gameSystem._saveCorePluginCommandSave)return;
        const id=$gameSystem.savefileId();
        if(StorageManager.saveStyle()!=='single'&&id<=0)return;
        this._active=false;$gameSystem.setSavefileId(id);$gameSystem.onBeforeSave();$gameSystem._saveCorePluginCommandSave=true;
        DataManager.saveGame(id).then(()=>this.onSaveSuccess()).catch(()=>this.onSaveFailure());
        $gameSystem._saveCorePluginCommandSave=undefined;
    };
    Scene_Map.prototype.onSaveSuccess=function(){saved(this);this.openSaveConfirmationWindow(true);};
    Scene_Map.prototype.onSaveFailure=function(){failed(this);this.openSaveConfirmationWindow(false);};
    Scene_Map.prototype.closeSaveConfirmationWindow=function(success){Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this._active=true;};
    const menuSave=Scene_Menu.prototype.commandSave;
    Scene_Menu.prototype.commandSave=function(){return StorageManager.saveStyle()==='standard'?menuSave.call(this):this.commandSaveLocked();};
    Scene_Menu.prototype.commandSaveLocked=function(){
        const id=$gameSystem.savefileId();$gameSystem.setSavefileId(id);$gameSystem.onBeforeSave();
        DataManager.saveGame(id).then(()=>this.onSaveCoreSaveSuccess()).catch(()=>this.onSaveCoreSaveFailure());
    };
    Scene_Menu.prototype.onSaveCoreSaveSuccess=function(){saved(this);this.openSaveConfirmationWindow(true);};
    Scene_Menu.prototype.onSaveCoreSaveFailure=function(){failed(this);this.openSaveConfirmationWindow(false);};
    Scene_Menu.prototype.closeSaveConfirmationWindow=function(success){Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this._commandWindow.activate();};
    const continueGame=Scene_Title.prototype.commandContinue;
    Scene_Title.prototype.commandContinue=function(){
        if(StorageManager.saveStyle()!=='single')return continueGame.call(this);
        return this.commandContinueSaveCoreSingle();
    };
    Scene_Title.prototype.commandContinueSaveCoreSingle=function(){DataManager.loadGame(0).then(()=>this.onSaveCoreLoadSuccess()).catch(()=>this.onSaveCoreLoadFailure());};
    Scene_Title.prototype.onSaveCoreLoadSuccess=function(){
        this._commandWindow.close();SoundManager.playLoad();this.fadeOutAll();Scene_Load.prototype.reloadMapIfUpdated.call(this);
        SceneManager.goto(Scene_Map);this._loadSuccess=true;saveCallback(settings,'Save.OnLoadSuccessJS',this);
    };
    Scene_Title.prototype.onSaveCoreLoadFailure=function(){SoundManager.playBuzzer();saveCallback(settings,'Save.OnLoadFailureJS',this);this.loadFailureConfirmationWindow();};
    Scene_Title.prototype.closeSaveConfirmationWindow=function(success){Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this._commandWindow.open();this._commandWindow.activate();};
    const terminateTitle=Scene_Title.prototype.terminate;
    Scene_Title.prototype.terminate=function(){terminateTitle.call(this);if(this._loadSuccess)$gameSystem.onAfterLoad();};
    const needsFadeIn=Scene_Map.prototype.needsFadeIn;
    Scene_Map.prototype.needsFadeIn=function(){return needsFadeIn.call(this)||SceneManager.isPreviousScene(Scene_Title);};
    for(const pluginId of [catalog.pluginId,catalog.reference.pluginId])PluginManager.registerCommand(pluginId,'SaveCurrentSlot',function(){
        if(SceneManager._scene instanceof Scene_Map)return SceneManager._scene.saveCurrentSlot();
    });
}

function installAutosave(settings){
    const options=settings.AutosaveOption,autosave=settings.Autosave;
    ConfigManager.autosave=options.Default;
    TextManager.autosaveOption=options.Name;
    TextManager.autosaveSuccess=settings.AutosaveConfirm.VocabAutosaveSuccess;
    TextManager.autosaveFailure=settings.AutosaveConfirm.VocabAutosaveFailure;
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeData=function(){const data=makeData.call(this);data.autosave=this.autosave||options.Default;return data;};
    ConfigManager.applyData=function(data){applyData.call(this,data);this.autosave=data.autosave!==undefined?data.autosave:options.Default;};
    DataManager.isAutosaveCompatible=function(){return !this.isBattleTest()&&!this.isEventTest()&&$dataSystem.optAutosave;};
    Game_System.prototype.enableAutosave=function(value){if(!$dataSystem.optAutosave)return;this.initSaveCore();this._SaveCoreSettings.autosaveEnabled=value;};
    Game_System.prototype.isAutosaveEnabled=function(){
        if(!$dataSystem.optAutosave)return false;
        this.initSaveCore();
        if(this._SaveCoreSettings.autosaveEnabled===undefined)this._SaveCoreSettings.autosaveEnabled=true;
        return this._SaveCoreSettings.autosaveEnabled;
    };
    const databaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.process_VisuMZ_SaveCore_Settings=function(){if(StorageManager.saveStyle()==='single')$dataSystem.optAutosave=true;};
    Scene_Boot.prototype.onDatabaseLoaded=function(){databaseLoaded.call(this);this.process_VisuMZ_SaveCore_Settings();};
    const addGeneral=Window_Options.prototype.addGeneralOptions,maxCommands=Scene_Options.prototype.maxCommands;
    Window_Options.prototype.addSaveCoreAutosaveCommand=function(){this.addCommand(TextManager.autosaveOption,'autosave');};
    Window_Options.prototype.addSaveCoreCommands=function(){if(options.AddOption)this.addSaveCoreAutosaveCommand();};
    Window_Options.prototype.addGeneralOptions=function(){addGeneral.call(this);this.addSaveCoreCommands();};
    Scene_Options.prototype.maxCommands=function(){return maxCommands.call(this)+(options.AddOption&&options.AdjustRect?1:0);};
    Scene_Base.prototype.isAutosaveEnabled=function(){return DataManager.isAutosaveCompatible()&&$gameSystem.isAutosaveEnabled()&&(!autosave.RequestsRequireSaveEnable||$gameSystem.isSaveEnabled());};
    const request=Scene_Base.prototype.requestAutosave;
    Scene_Base.prototype.requestAutosave=function(){if(!this._bypassAutosave)request.call(this);this._bypassAutosave=false;};
    Scene_Base.prototype.executeAutosave=function(){if(ConfigManager.autosave)this.forceAutosave();};
    Scene_Base.prototype.forceAutosave=function(){
        $gameSystem.onBeforeSave();this._processingAutosave=false;
        const type=StorageManager.autosaveType(),ids=[];
        if(type==='file0'||type==='both')ids.push(0);
        if((type==='current'||type==='both')&&$gameSystem.savefileId()>0)ids.push($gameSystem.savefileId());
        for(const id of ids)DataManager.saveGame(id).then(()=>this.onAutosaveSuccess()).catch(cause=>{
            if(cause?.code==='SAV_CALLBACK_FAILED')console.error(cause);
            this.onAutosaveFailure();
        });
        this._processingAutosave=false;
    };
    const success=Scene_Base.prototype.onAutosaveSuccess,failure=Scene_Base.prototype.onAutosaveFailure;
    Scene_Base.prototype.onAutosaveSuccess=function(){
        if(this._processingAutosave)return;
        success.call(this);saveCallback(settings,'Autosave.OnAutosaveSuccessJS',this);this.openAutosaveConfirmationWindow(true);this._processingAutosave=true;
    };
    Scene_Base.prototype.onAutosaveFailure=function(){
        if(this._processingAutosave)return;
        failure.call(this);saveCallback(settings,'Autosave.OnAutosaveFailureJS',this);this.openAutosaveConfirmationWindow(false);
    };
    Scene_Base.prototype.determineAutosaveBypass=function(trigger){
        const key={battle:'AfterBattle',transfer:'AfterTransfer',callMenu:'AfterMenuCall',exitMenu:'AfterExitMenu'}[trigger];
        if(!key||trigger==='transfer'&&!this.shouldAutosave())return;
        this._bypassAutosave=!autosave[key];
    };
    const transferEnd=Scene_Map.prototype.onTransferEnd,mapLoaded=Scene_Map.prototype.onMapLoaded,menuCreate=Scene_Menu.prototype.create;
    Scene_Map.prototype.onTransferEnd=function(){if(this.shouldAutosave())this.determineAutosaveBypass('transfer');transferEnd.call(this);};
    Scene_Map.prototype.onMapLoaded=function(){
        mapLoaded.call(this);
        const trigger=SceneManager.isPreviousScene(Scene_Menu)?'exitMenu':SceneManager.isPreviousScene(Scene_Battle)?'battle':null;
        if(trigger){this.determineAutosaveBypass(trigger);this.requestAutosave();}
    };
    Scene_Menu.prototype.create=function(){menuCreate.call(this);if(SceneManager.isPreviousScene(Scene_Map)){this.determineAutosaveBypass('callMenu');this.requestAutosave();}};
    Scene_Battle.prototype.requestAutosave=function(){};
    for(const pluginId of [catalog.pluginId,catalog.reference.pluginId]){
        PluginManager.registerCommand(pluginId,'AutosaveEnable',function(args){
            if(!DataManager.isAutosaveCompatible())return;
            decodeOptionsSaveParameters(args,'AutosaveEnable','SAV_COMMAND_VALUE',args);
            if($gameSystem)$gameSystem.enableAutosave(args.Enable);
        });
        for(const [command,method]of [['AutosaveRequest','requestAutosave'],['AutosaveExecute','executeAutosave'],['AutosaveForce','forceAutosave']])PluginManager.registerCommand(pluginId,command,function(){
            if(DataManager.isAutosaveCompatible()&&!$gameParty.inBattle())SceneManager._scene[method]();
        });
    }
    installAutosaveConfirmation(settings);
}
function installAutosaveConfirmation(settings){
    class Window_AutosaveConfirm extends Window_Base{
        initialize(rect){this._fadeSpeed=0;super.initialize(rect);this.opacity=0;this.contentsOpacity=0;}
        getScreenPosition(){return settings.AutosaveConfirm.ScreenPosition;}
        setSetSuccess(success){this._success=success;this.refresh();}
        refresh(){
            this.contents.clear();const text=this._success?TextManager.autosaveSuccess:TextManager.autosaveFailure,width=Math.ceil(this.textSizeEx(text).width);
            this.width=width+2*($gameSystem.windowPadding()+this.itemPadding());this.updatePosition();this.createContents();this.drawBackground();
            this.drawTextEx(text,Math.floor((this.innerWidth-width)/2),0,width);
        }
        drawBackground(){const half=this.innerWidth/2,c1=ColorManager.dimColor1(),c2=ColorManager.dimColor2();this.contents.gradientFillRect(0,0,half,this.innerHeight,c2,c1);this.contents.gradientFillRect(half,0,half,this.innerHeight,c1,c2);}
        updatePosition(){
            const position=this.getScreenPosition(),padding=$gameSystem.windowPadding();
            this.x=Math.round(/left/i.test(position)?-padding:/right/i.test(position)?Graphics.width-this.width+padding:(Graphics.width-this.width)/2);
            this.y=Math.round(/upper/i.test(position)?-padding:/lower/i.test(position)?Graphics.height-this.height+padding:(Graphics.height-this.height)/2);
        }
        setFadeSpeed(speed){this._fadeSpeed=speed;}
        fadeIn(){this.setFadeSpeed(16);}
        fadeOut(){this.setFadeSpeed(-16);}
        update(){super.update();if(this._fadeSpeed!==0)this.updateFade();}
        updateFade(){this.contentsOpacity+=this._fadeSpeed;if(this.contentsOpacity===0||this.contentsOpacity===255)this.setFadeSpeed(0);}
    }
    globalThis.Window_AutosaveConfirm=Window_AutosaveConfirm;
    Scene_Base.prototype.autosaveConfirmationWindowRect=function(){const width=this.mainCommandWidth(),height=this.calcWindowHeight(1,false);return new Rectangle(Graphics.width-width,Graphics.height-height,width,height);};
    Scene_Base.prototype.isAutosaveConfirmWindowEnabled=function(){return settings.AutosaveConfirm.Enable;};
    Scene_Base.prototype.createAutosaveConfirmationWindow=function(){if(!this._autosaveConfirmWindow)this._autosaveConfirmWindow=new Window_AutosaveConfirm(this.autosaveConfirmationWindowRect());};
    Scene_Base.prototype.openAutosaveConfirmationWindow=function(success){
        if(!this.isAutosaveConfirmWindowEnabled())return this.closeAutosaveConfirmationWindow(success);
        if(!this._autosaveConfirmWindow)this.createAutosaveConfirmationWindow();
        const window=this._autosaveConfirmWindow;this.removeChild(window);this.addChild(window);window.setSetSuccess(success);window.fadeIn();
        setTimeout(this.closeAutosaveConfirmationWindow.bind(this,success),settings.AutosaveConfirm.Duration);
    };
    Scene_Base.prototype.closeAutosaveConfirmationWindow=function(){if(this._autosaveConfirmWindow)this._autosaveConfirmWindow.fadeOut();};
}

function installSaveGlobals(){
    VisuMZ.GlobalSwitches=[];VisuMZ.GlobalVariables=[];
    ConfigManager.globalSwitches=[];ConfigManager.globalVariables=[];
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeData=function(){
        const data=makeData.call(this);data.globalSwitches=this.globalSwitches||[];data.globalVariables=this.globalVariables||[];return data;
    };
    ConfigManager.applyData=function(data){applyData.call(this,data);this.globalSwitches=data.globalSwitches||[];this.globalVariables=data.globalVariables||[];};
    const databaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.process_VisuMZ_SaveCore_Switches_Variables=function(){
        for(let id=1;id<$dataSystem.switches.length;id++)if($dataSystem.switches[id].match(/<GLOBAL>/i))VisuMZ.GlobalSwitches.push(id);
        for(let id=1;id<$dataSystem.variables.length;id++)if($dataSystem.variables[id].match(/<GLOBAL>/i))VisuMZ.GlobalVariables.push(id);
    };
    Scene_Boot.prototype.onDatabaseLoaded=function(){databaseLoaded.call(this);this.process_VisuMZ_SaveCore_Switches_Variables();};
    for(const [Type,database,ids,storage]of [[Game_Switches,'switches','GlobalSwitches','globalSwitches'],[Game_Variables,'variables','GlobalVariables','globalVariables']]){
        const value=Type.prototype.value,setValue=Type.prototype.setValue;
        Type.prototype.isGlobal=function(id){return $dataSystem[database][id]&&VisuMZ[ids].includes(id);};
        Type.prototype.value=function(id){return this.isGlobal(id)?this.globalValue(id):value.call(this,id);};
        Type.prototype.globalValue=function(id){
            ConfigManager[storage]=ConfigManager[storage]||[];
            if(Type===Game_Switches)return !!ConfigManager[storage][id];
            if(ConfigManager[storage][id]===undefined)Reflect.set(Object(ConfigManager[storage]),id,0);
            return ConfigManager[storage][id];
        };
        Type.prototype.setValue=function(id,value){if(this.isGlobal(id))this.setGlobalValue(id,value);setValue.call(this,id,value);};
        Type.prototype.setGlobalValue=function(id,value){
            if(id>0&&id<$dataSystem[database].length){
                ConfigManager[storage]=ConfigManager[storage]||[];
                // Legacy config can contain primitives; original non-strict writes leave them intact.
                Reflect.set(Object(ConfigManager[storage]),id,Type===Game_Variables&&typeof value==='number'?Math.floor(value):value);
                ConfigManager.save();
            }
        };
    }
}

function installSaveCore(){
    validateOptionsSaveProviders(catalog,$plugins,globalThis);
    if(globalThis.Coreto?.SaveCore)throw Object.assign(new Error('Save Core is already initialized.'),{code:'SAV_DUPLICATE_PROVIDER'});
    const configuration=resolveOptionsSaveConfiguration(catalog,$plugins);
    const settings=prepareOptionsSaveSettings(configuration,'Save',Number(catalog.reference.version),'SAV_CONFIG_VALUE',validateSaveSettings);
    installSaveState(settings);
    installSaveStorage(settings);
    installSaveList(settings);
    installSaveScenes(settings);
    installAutosave(settings);
    installSaveGlobals();
    const api={pluginId:catalog.pluginId,version:catalog.version,configuration,settings,capabilities:["save-metadata","save-scenes","save-layouts","save-commands","autosave","global-state","storage","legacy-compatible"]};
    globalThis.Coreto??={};Coreto.SaveCore=api;
    globalThis.Imported??={};Imported[catalog.pluginId]=true;Imported[catalog.reference.pluginId]=true;
    return api;
}
const saveApi=installSaveCore();

})();
