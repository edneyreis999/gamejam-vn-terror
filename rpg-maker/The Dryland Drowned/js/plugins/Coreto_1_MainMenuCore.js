/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 1] [Version 0.1.0] [MainMenuCore]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderBefore VisuMZ_2_PartySystem
 * @orderBefore VisuMZ_3_VictoryAftermath
 * @orderBefore VisuMZ_2_ClassChangeSystem
 * @orderBefore VisuMZ_2_EquipSetBonuses
 * @help
 * Configuração, navegação, retratos e informações auxiliares do menu principal.
 * Ative somente um provedor MainMenu, após Core Engine.
 * CoretoConfigSource: inherit lê o registro original, inclusive desativado; own lê este registro.
 * CLI: main-menu --help. A edição funcional materializa a configuração própria.
 * Consulte main-menu api describe para contextos JavaScript, dependências e exemplos.
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
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu. Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments[1]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments[0];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"bestiary\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"10\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BestiaryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_Bestiary &&\\\\n    this.isBestiaryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBestiaryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBestiary();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"cgGallery\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"311\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.cgGalleryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CGGallery &&\\\\n    this.isCgGalleryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCgGalleryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCgGallery();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"creditsPage\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.CreditsPageMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CreditsPage &&\\\\n    this.isCreditsPageCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCreditsPageCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCreditsPage();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"patchNotes\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.PatchNotesMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_PatchNotes &&\\\\n    this.isPatchNotesCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isPatchNotesCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPatchNotes();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"battleGridTactics\",\"Subcategory:str\":\"\",\"Icon:num\":\"76\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BattleGridTacticsMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_BattleGridSystem &&\\\\n    this.isBattleGridTacticsCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBattleGridTacticsCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBattleGridTactics();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 * @parent General:struct
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 * @parent CommandWindowStyle:str
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @desc Choose the actor status-list layout in the main menu.
 * @default portrait
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @type select
 * @desc Choose how the actor status list looks in the inner menus like Scene_Item, Scene_Skill, etc.
 * @default default
 * @parent StatusListStyle:str
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
 * @parent StatusListStyle:str
 *
 * @param MouseCursor:struct
 * @text Custom Mouse Cursor
 * @type struct<MouseCursor>
 * @desc Add/enable a custom mouse cursor for your game.
 * @default {"General":"","Enable:eval":"true","Graphics":"","idleFilenameIcon:str":"","clickFilenameIcon:str":"","Anchor":"","anchorX:num":"0.0","anchorY:num":"0.0"}
 *
 * @command MenuCommandClear
 * @text Menu Command: Clear Forced Settings
 * @desc Clear visibility and enabled overrides; authored ShowJS and EnableJS apply again.
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.
 * @default []
 *
 * @command MenuCommandForceDisable
 * @text Menu Command: Force Disable
 * @desc Prevent activation of the selected symbols; remove their forced enabled overrides.
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.
 * @default []
 *
 * @command MenuCommandForceEnable
 * @text Menu Command: Force Enable
 * @desc Allow activation of the selected symbols; remove their forced disabled overrides. This does not show a hidden command.
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.
 * @default []
 *
 * @command MenuCommandForceHide
 * @text Menu Command: Force Hide
 * @desc Hide the selected symbols; remove their forced shown overrides.
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.
 * @default []
 *
 * @command MenuCommandForceShow
 * @text Menu Command: Force Show
 * @desc Show the selected symbols; remove their forced hidden overrides. This does not enable a disabled command.
 * @arg Symbols:arraystr
 * @text Symbol(s)
 * @type string[]
 * @desc Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.
 * @default []
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Change the selected actors’ menu portrait filename in img/pictures, without its extension.
 * @arg Step1:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 * @dir img/pictures/
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Change the selected actors’ menu portrait filename in img/pictures, without its extension.
 * @arg Step1
 * @text Actor ID Range
 * @type text
 * @desc Editor grouping label for the inclusive actor ID range; this value has no runtime effect.
 * @default 
 *
 * @arg Step1Start:num
 * @text Range Start
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 * @parent Step1
 *
 * @arg Step1End:num
 * @text Range End
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 * @parent Step1
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 * @dir img/pictures/
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS) (Legacy)
 * @desc Change the selected actors’ menu portrait filename in img/pictures, without its extension.
 * @arg Step1:arrayeval
 * @text Actor ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Filename
 * @type file
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 * @dir img/pictures/
 *
 * @command ChangeActorMenuImageJS_v124
 * @text Actor: Change Menu Image (JS) (v1.24)
 * @desc Change the selected actors’ menu portrait filename in img/pictures, without its extension.
 * @arg ActorJS:func
 * @text JS: Actor ID
 * @type note
 * @desc Enter which Actor ID to affect.
 * @default "// Get Actor ID here.\nlet actorID = 0;\nactorID = $gameParty.members()[0].actorId();\n\n// Return Actor ID\nreturn actorID;"
 *
 * @arg FilenameJS:func
 * @text JS: Filename
 * @type note
 * @desc Enter the filename you wish to use.
 * @default "// Get Filename here.\nlet filename = 'Actor1_';\nfilename += String(Math.randomInt(8) + 1);\n\n// Return Filename\nreturn filename;"
 *
 */

/*~struct~General:
 * @param GoldWindow
 * @text Gold Window
 * @type text
 * @desc Editor grouping label for Gold Window. Its text has no runtime effect.
 * @default 
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @type boolean
 * @desc Make the Gold Window thinner in the Main Menu? Used to match the Playtime and Variable Windows.
 * @default true
 * @on Thinner
 * @off Normal
 * @parent GoldWindow
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @type boolean
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 * @on Automatic
 * @off Manual
 * @parent GoldWindow
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @type boolean
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 * @on Automatic
 * @off Manual
 * @parent GoldWindow
 *
 * @param StatusWindow
 * @text Status Window
 * @type text
 * @desc Editor grouping label for Status Window. Its text has no runtime effect.
 * @default 
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @type boolean
 * @desc When picking a personal command from the Command Window, select the last picked actor or always the first?
 * @default false
 * @on Last Picked Actor
 * @off Always First Actor
 * @parent StatusWindow
 *
 * @param SoloParty
 * @text Solo Party
 * @type text
 * @desc Editor grouping label for Solo Party. Its text has no runtime effect.
 * @default 
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @type boolean
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 * @on Quick
 * @off Normal
 * @parent SoloParty
 *
 * @param SubMenus
 * @text Sub Menus
 * @type text
 * @desc Editor grouping label for Sub Menus. Its text has no runtime effect.
 * @default 
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 * @parent SubMenus
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 * @parent SubMenus
 *
 * @param PartyWindow
 * @text Party Window
 * @type text
 * @desc Editor grouping label for Party Window. Its text has no runtime effect.
 * @default 
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @type boolean
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @parent PartyWindow
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @type boolean
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @parent ShowReserve:eval
 *
 */

/*~struct~Command:
 * @param Symbol:str
 * @text Symbol
 * @type text
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Subcategory:str
 * @text Subcategory
 * @type text
 * @desc The subcategory used for this command. Leave empty for no subcategory.
 * @default 
 *
 * @param Icon:num
 * @text Icon
 * @type text
 * @desc Icon used for this command. Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @type text
 * @desc Displayed text used for this menu command. If this has a value, ignore the JS: Text version.
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
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */

/*~struct~Playtime:
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @desc Use the Playtime Window?
 * @default true
 * @on Enable
 * @off Don't
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 * @on Enable
 * @off Normal
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @desc Select background type for the Playtime window.
 * @default 0
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @desc Font size for text in the playtime window.
 * @default 20
 * @min 1
 *
 * @param Icon:num
 * @text Time Icon
 * @type text
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @type text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */

/*~struct~Variable:
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @desc Use the Variable Window?
 * @default false
 * @on Enable
 * @off Don't
 *
 * @param AdjustCommandHeight:eval
 * @text Adjust Command Window
 * @type boolean
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 * @on Enable
 * @off Normal
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @desc Select background type for the Variable window.
 * @default 0
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @desc Font size for text in the variable window.
 * @default 20
 * @min 1
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window. Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */

/*~struct~CustomCmdWin:
 * @param Style:str
 * @text Command Style
 * @type select
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 * @parent MainList
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @desc Decide how you want the text to be aligned.
 * @default center
 * @option left
 * @option center
 * @option right
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @desc Number of visible rows.
 * @default 2
 * @min 1
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @desc Number of maximum columns.
 * @default 4
 * @min 1
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 * @min 1
 *
 */

/*~struct~ListStyles:
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */

/*~struct~MouseCursor:
 * @param General
 * @text General Settings
 * @type text
 * @desc Editor grouping label for General Settings. Its text has no runtime effect.
 * @default 
 *
 * @param Enable:eval
 * @text Enable?
 * @type boolean
 * @desc Enable custom cursor? Requires a custom 'Idle' graphic.
 * @default true
 * @on Custom Cursor
 * @off Normal Cursor
 * @parent General
 *
 * @param Graphics
 * @text Graphic Settings
 * @type text
 * @desc Editor grouping label for Graphic Settings. Its text has no runtime effect.
 * @default 
 *
 * @param idleFilenameIcon:str
 * @text Idle Filename
 * @type text
 * @desc Located in game project's /icon/ folder. Include .png extension (ie. Cursor1.png)
 * @default 
 * @parent Graphics
 *
 * @param clickFilenameIcon:str
 * @text Click Filename
 * @type text
 * @desc Optional. Located in game project's /icon/ folder. Include .png extension (ie. Cursor2.png)
 * @default 
 * @parent Graphics
 *
 * @param Anchor
 * @text Anchor Settings
 * @type text
 * @desc Editor grouping label for Anchor Settings. Its text has no runtime effect.
 * @default 
 *
 * @param anchorX:num
 * @text Anchor X
 * @type text
 * @desc Anchor X value for the custom cursor. 0.0 - left; 0.5 - center; 1.0 - right
 * @default 0.0
 * @parent Anchor
 *
 * @param anchorY:num
 * @text Anchor Y
 * @type text
 * @desc Anchor Y value for the custom cursor. 0.0 - top; 0.5 - middle; 1.0 - bottom
 * @default 0.0
 * @parent Anchor
 *
 */

(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_1_MainMenuCore","namespace":"main-menu","version":"0.1.0","engine":{"name":"MZ","version":"1.10.0"},"reference":{"pluginId":"VisuMZ_1_MainMenuCore","version":"1.27"},"description":"Main menu commands, categories, actor layouts and portrait selection.","limits":"Desktop menu and native actor/event authoring. External consumers must match their declared supported versions. Saves are qualified for forward continuation in supported compositions.","dependencies":{"required":[["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine"]],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{},"consumers":{"VisuMZ_2_PartySystem":"1.36","VisuMZ_3_VictoryAftermath":"1.23","VisuMZ_2_ClassChangeSystem":"1.20","VisuMZ_1_SkillsStatesCore":"1.58","VisuMZ_1_ItemsEquipsCore":"1.61","VisuMZ_2_EquipSetBonuses":"1.05"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine"],"orderBefore":["VisuMZ_2_PartySystem","VisuMZ_3_VictoryAftermath","VisuMZ_2_ClassChangeSystem","VisuMZ_2_EquipSetBonuses"],"configuration":{"key":"CoretoConfigSource","default":"inherit","modes":["inherit","own"]},"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"MM-P-1","key":"General","storageKey":"General:struct","label":"General Settings","description":"General settings pertaining to the Main Menu and related.","type":"struct","editorType":"struct<General>","nativeDefault":"{\"GoldWindow\":\"\",\"ThinGoldWindow:eval\":\"true\",\"AutoGoldHeight:eval\":\"true\",\"AutoGoldY:eval\":\"true\",\"StatusWindow\":\"\",\"StatusSelectLast:eval\":\"false\",\"SoloParty\":\"\",\"SoloQuick:eval\":\"true\",\"SubMenus\":\"\",\"ActorBgMenus:arraystr\":\"[\\\"Scene_Skill\\\"]\",\"ActorBgMenuJS:func\":\"\\\"this.anchor.x = 0.5;\\\\nconst scale = 1.25;\\\\nthis.scale.x = this.scale.y = scale;\\\\nthis.x = Graphics.width;\\\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\\\nthis._targetX = Graphics.width * 3 / 4;\\\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\\\nthis._duration = 10;\\\\nthis.opacity = 0;\\\"\",\"PartyWindow\":\"\",\"ShowReserve:eval\":\"true\",\"HideMainMenuOnly:eval\":\"true\"}","encoding":"plain","availability":"supported","structName":"General","fields":[{"id":"MM-P-2","key":"GoldWindow","storageKey":"GoldWindow","label":"Gold Window","description":"Editor grouping label for Gold Window. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-3","key":"ThinGoldWindow","storageKey":"ThinGoldWindow:eval","label":"Thinner Gold Window","description":"Make the Gold Window thinner in the Main Menu? Used to match the Playtime and Variable Windows.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"GoldWindow","on":"Thinner","off":"Normal","default":true},{"id":"MM-P-4","key":"AutoGoldHeight","storageKey":"AutoGoldHeight:eval","label":"Auto Adjust Height","description":"Automatically adjust the height for the thinner Gold Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"GoldWindow","on":"Automatic","off":"Manual","default":true},{"id":"MM-P-5","key":"AutoGoldY","storageKey":"AutoGoldY:eval","label":"Auto Adjust Y","description":"Automatically adjust the Y position for the thinner Gold Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"GoldWindow","on":"Automatic","off":"Manual","default":true},{"id":"MM-P-6","key":"StatusWindow","storageKey":"StatusWindow","label":"Status Window","description":"Editor grouping label for Status Window. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-7","key":"StatusSelectLast","storageKey":"StatusSelectLast:eval","label":"Select Last?","description":"When picking a personal command from the Command Window, select the last picked actor or always the first?","type":"boolean","editorType":"boolean","nativeDefault":"false","encoding":"plain","availability":"supported","parent":"StatusWindow","on":"Last Picked Actor","off":"Always First Actor","default":false},{"id":"MM-P-8","key":"SoloParty","storageKey":"SoloParty","label":"Solo Party","description":"Editor grouping label for Solo Party. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-9","key":"SoloQuick","storageKey":"SoloQuick:eval","label":"Solo Quick Mode","description":"When selecting \"Skills\", \"Equip\", or \"Status\" with one party member, immediately go to the scene.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"SoloParty","on":"Quick","off":"Normal","default":true},{"id":"MM-P-10","key":"SubMenus","storageKey":"SubMenus","label":"Sub Menus","description":"Editor grouping label for Sub Menus. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-11","key":"ActorBgMenus","storageKey":"ActorBgMenus:arraystr","label":"Menus with Actor BG's","description":"A list of the menus that would be compatible with Actor Menu Backgrounds.","type":"array","editorType":"string[]","nativeDefault":"[\"Scene_Skill\",\"Scene_Equip\",\"Scene_Status\"]","encoding":"plain","availability":"supported","parent":"SubMenus","items":{"type":"string","encoding":"plain"},"default":["Scene_Skill","Scene_Equip","Scene_Status"],"context":"Requires an actor portrait: see main-menu api describe MM-NT-menu-image. Place the picture in img/pictures and use its filename without extension. The selected actor supplies the background in listed scenes."},{"id":"MM-P-12","key":"ActorBgMenuJS","storageKey":"ActorBgMenuJS:func","label":"JS: Actor BG Action","description":"Code used to determine how to display the sprites upon loading.","type":"string","editorType":"note","nativeDefault":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","encoding":"json","availability":"supported","parent":"SubMenus","javascript":{"kind":"body","receiver":"Sprite_MenuBackgroundActor","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;","context":"No arguments; the actor picture has loaded in this.bitmap and this._actor identifies its owner. Set anchor, scale, x/y, opacity, _targetX/_targetY and _duration in frames. The return value is ignored. Called again when the selected actor changes in an enabled ActorBgMenus scene; use native scene class names. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /General/ActorBgMenuJS --value '\"this.anchor.x = 0.5; this.x = this._targetX = Graphics.width / 2; this.y = this._targetY = 0; this._duration = 0; this.opacity = 255;\"'"]},{"id":"MM-P-13","key":"PartyWindow","storageKey":"PartyWindow","label":"Party Window","description":"Editor grouping label for Party Window. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-14","key":"ShowReserve","storageKey":"ShowReserve:eval","label":"Show Reserve Memebers","description":"Show reserve members while on the Main Menu scene?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"PartyWindow","on":"Show Reserve Members","off":"Hide Reserve Members","default":true},{"id":"MM-P-15","key":"HideMainMenuOnly","storageKey":"HideMainMenuOnly:eval","label":"Hide Main Menu Only","description":"If reserve members are hidden, hide them only in the main menu or all scenes?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"ShowReserve:eval","on":"Hide in Main Menu Only","off":"Hide in all Scenes","default":true}],"default":{"GoldWindow":"","ThinGoldWindow":true,"AutoGoldHeight":true,"AutoGoldY":true,"StatusWindow":"","StatusSelectLast":false,"SoloParty":"","SoloQuick":true,"SubMenus":"","ActorBgMenus":["Scene_Skill"],"ActorBgMenuJS":"this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;","PartyWindow":"","ShowReserve":true,"HideMainMenuOnly":true},"context":"The default on this containing parameter is the native complete preset used when it is absent or reset as a whole. Each nested field retains its separate native editor default, used when that field is absent or reset individually; these defaults can differ. Read parameters get for the currently effective value. A set replaces the selected value and requires every field in a struct, including unchanged editorial labels."},{"id":"MM-P-16","key":"CommandList","storageKey":"CommandList:arraystruct","label":"Command Window List","description":"Window commands used by the Main Menu. Add new commands here.","type":"array","editorType":"struct<Command>[]","nativeDefault":"[\"{\\\"Symbol:str\\\":\\\"item\\\",\\\"Icon:num\\\":\\\"208\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.item;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"item\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.areMainCommandsEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandItem();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"classChange\\\",\\\"Icon:num\\\":\\\"133\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.classChangeMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\\\\\n    this.isClassChangeCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.areMainCommandsEnabled() &&\\\\\\\\n    this.isClassChangeCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandPersonal();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"SceneManager.push(Scene_ClassChange);\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"skill\\\",\\\"Icon:num\\\":\\\"101\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.skill;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"skill\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.areMainCommandsEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandPersonal();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"SceneManager.push(Scene_Skill);\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"equip\\\",\\\"Icon:num\\\":\\\"137\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.equip;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"equip\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.areMainCommandsEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandPersonal();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"SceneManager.push(Scene_Equip);\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"status\\\",\\\"Icon:num\\\":\\\"82\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.status;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"status\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.areMainCommandsEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandPersonal();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"SceneManager.push(Scene_Status);\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"itemCrafting\\\",\\\"Icon:num\\\":\\\"223\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.ItemCraftingMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\\\\\n    this.isItemCraftingCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isItemCraftingCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandItemCrafting();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"subcategory\\\",\\\"Subcategory:str\\\":\\\"\\\",\\\"Icon:num\\\":\\\"230\\\",\\\"TextStr:str\\\":\\\"Datalog\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return 'Text';\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.isSubcategoryVisible(arguments[1]);\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"// This becomes the subcategory name. Case-sensitive.\\\\\\\\n\\\\\\\\nreturn 'datalog';\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\\nthis.setSubcategory(ext);\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"quest\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"186\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.questCommandName;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\\\\\n    this.isQuestCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isQuestCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandQuest();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"bestiary\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"10\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.BestiaryMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_2_Bestiary &&\\\\\\\\n    this.isBestiaryCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isBestiaryCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandBestiary();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"tutorialList\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"187\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.tutorial.menuCmd;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\\\\\n    this.isTutorialListCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isTutorialListCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandTutorialList();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"messageLog\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"193\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.MessageLogMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_3_MessageLog &&\\\\\\\\n    this.isMessageLogCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isMessageLogCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandMessageLog();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"combatLog\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"189\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.combatLog_BattleCmd_Name;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_4_CombatLog &&\\\\\\\\n    this.isCombatLogCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isCombatLogCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandCombatLog();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cgGallery\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"311\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cgGalleryMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_4_CGGallery &&\\\\\\\\n    this.isCgGalleryCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isCgGalleryCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandCgGallery();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"creditsPage\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"193\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.CreditsPageMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_4_CreditsPage &&\\\\\\\\n    this.isCreditsPageCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isCreditsPageCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandCreditsPage();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"patchNotes\\\",\\\"Subcategory:str\\\":\\\"datalog\\\",\\\"Icon:num\\\":\\\"83\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.PatchNotesMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_4_PatchNotes &&\\\\\\\\n    this.isPatchNotesCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isPatchNotesCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandPatchNotes();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"formation\\\",\\\"Icon:num\\\":\\\"75\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.formation;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"formation\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isFormationEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandFormation();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"battleGridTactics\\\",\\\"Subcategory:str\\\":\\\"\\\",\\\"Icon:num\\\":\\\"76\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.BattleGridTacticsMenuCommand;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return Imported.VisuMZ_2_BattleGridSystem &&\\\\\\\\n    this.isBattleGridTacticsCommandVisible();\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isBattleGridTacticsCommandEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandBattleGridTactics();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"options\\\",\\\"Icon:num\\\":\\\"83\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.options;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"options\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isOptionsEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandOptions();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"save\\\",\\\"Icon:num\\\":\\\"189\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.save;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"save\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isSaveEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandSave();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"load\\\",\\\"Icon:num\\\":\\\"191\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return 'Load';\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"save\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return DataManager.isAnySavefileExists();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandLoad();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"commonEvent1\\\",\\\"Icon:num\\\":\\\"88\\\",\\\"TextStr:str\\\":\\\"Common Event 1\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return 'Text';\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return false;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return 1;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandCommonEvent();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"commonEvent2\\\",\\\"Icon:num\\\":\\\"87\\\",\\\"TextStr:str\\\":\\\"Common Event 2\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return 'Text';\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return false;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.areMainCommandsEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return 2;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandPersonal();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"// Declare Ext\\\\\\\\nconst ext = arguments[0];\\\\\\\\n\\\\\\\\n// Declare Status Window\\\\\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\\\\\n\\\\\\\\n// Declare Actor ID\\\\\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\\\\\n\\\\\\\\n// Set variable 1 to Actor ID\\\\\\\\n$gameVariables.setValue(1, actorId);\\\\\\\\n\\\\\\\\n// Prepare Common Event ext to run\\\\\\\\n$gameTemp.reserveCommonEvent(ext);\\\\\\\\n\\\\\\\\n// Exit Main Menu\\\\\\\\nSceneManager._scene.popScene();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"gameEnd\\\",\\\"Icon:num\\\":\\\"187\\\",\\\"TextStr:str\\\":\\\"\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.gameEnd;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return this.needsCommand(\\\\\\\\\\\\\\\"gameEnd\\\\\\\\\\\\\\\");\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return this.isGameEndEnabled();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandGameEnd();\\\\\\\"\\\",\\\"PersonalHandlerJS:func\\\":\\\"\\\\\\\"const ext = arguments[0];\\\\\\\"\\\"}\"]","encoding":"plain","availability":"supported","parent":"General:struct","items":{"type":"struct","structName":"Command","fields":[{"id":"MM-P-17","key":"Symbol","storageKey":"Symbol:str","label":"Symbol","description":"The symbol used for this command.","type":"string","editorType":"text","nativeDefault":"Symbol","encoding":"plain","availability":"supported","default":"Symbol","context":"Case-sensitive action identity. The subcategory symbol receives a numbered runtime suffix in each visible command list. Use a nonempty unique action name such as journal for a new custom action and provide its handler. Native actions include item, skill, equip, status, formation, options, save and gameEnd. The special subcategory symbol creates category entries. Duplicate ordinary symbols share the scene handler and forced visibility/enabled overrides, so avoid them for independently controlled actions."},{"id":"MM-P-18","key":"Subcategory","storageKey":"Subcategory:str","label":"Subcategory","description":"The subcategory used for this command. Leave empty for no subcategory.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"supported","default":"","context":"To define a category, create a complete command entry with Symbol subcategory, ExtJS returning its category name (for example return \"tools\";), and CallHandlerJS calling this.setSubcategory(arguments[0]);. Give child commands Subcategory \"tools\". Matching is case-sensitive. Without a matching category command, those children appear in the root menu. See MM-P-16 for complete-entry authoring."},{"id":"MM-P-19","key":"Icon","storageKey":"Icon:num","label":"Icon","description":"Icon used for this command. Use 0 for no icon.","type":"number","editorType":"text","nativeDefault":"0","encoding":"plain","availability":"supported","default":0,"context":"Use the zero-based icon index in img/system/IconSet.png (16 columns, native 32-by-32 cells). A positive index draws that cell; 0 draws no icon. Choose an existing cell within the image; an out-of-sheet index does not provide a usable icon."},{"id":"MM-P-20","key":"TextStr","storageKey":"TextStr:str","label":"STR: Text","description":"Displayed text used for this menu command. If this has a value, ignore the JS: Text version.","type":"string","editorType":"text","nativeDefault":"Untitled","encoding":"plain","availability":"supported","default":"Untitled","context":"Empty text and the native Untitled sentinel select TextJS; any other string is displayed directly."},{"id":"MM-P-21","key":"TextJS","storageKey":"TextJS:func","label":"JS: Text","description":"JavaScript code used to determine string used for the displayed name.","type":"string","editorType":"note","nativeDefault":"\"return 'Text';\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuCommand","bindings":["arguments","SceneManager","$gameParty","$gameVariables","$gameSwitches"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"return 'Text';","context":"No arguments. Return the displayed text; used when TextStr is empty or Untitled. The function body runs in the game global context. Configure prerequisites before entering the menu; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /CommandList/0/TextJS --value '\"return TextManager.skill;\"'"]},{"id":"MM-P-22","key":"ShowJS","storageKey":"ShowJS:func","label":"JS: Show","description":"JavaScript code used to determine if the item is shown or not.","type":"string","editorType":"note","nativeDefault":"\"return true;\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuCommand","bindings":["arguments","SceneManager","$gameParty","$gameVariables","$gameSwitches"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"return true;","context":"arguments[0] is the case-sensitive authored symbol; arguments[1] is the runtime command definition, with compiled function fields. Return whether the command is visible. Called again during refresh and category visibility checks. The function body runs in the game global context. Configure prerequisites before entering the menu; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /CommandList/0/ShowJS --value '\"return $gameSwitches.value(1);\"'"]},{"id":"MM-P-23","key":"EnableJS","storageKey":"EnableJS:func","label":"JS: Enable","description":"JavaScript code used to determine if the item is enabled or not.","type":"string","editorType":"note","nativeDefault":"\"return true;\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuCommand","bindings":["arguments","SceneManager","$gameParty","$gameVariables","$gameSwitches"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"return true;","context":"arguments[0] is the case-sensitive authored symbol; arguments[1] is the runtime command definition. Return whether activation is allowed. A false result prevents the action from executing. The function body runs in the game global context. Configure prerequisites before entering the menu; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /CommandList/0/EnableJS --value '\"return this.areMainCommandsEnabled();\"'"]},{"id":"MM-P-24","key":"ExtJS","storageKey":"ExtJS:func","label":"JS: Ext","description":"JavaScript code used to determine any ext data that should be added.","type":"string","editorType":"note","nativeDefault":"\"return null;\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuCommand","bindings":["arguments","SceneManager","$gameParty","$gameVariables","$gameSwitches"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"return null;","context":"No arguments. Return the extension passed to direct and personal actions. A subcategory command returns its case-sensitive category name. The function body runs in the game global context. Configure prerequisites before entering the menu; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /CommandList/0/ExtJS --value '\"return 17;\"'"]},{"id":"MM-P-25","key":"CallHandlerJS","storageKey":"CallHandlerJS:func","label":"JS: Run Code","description":"JavaScript code that runs once this command is selected.","type":"string","editorType":"note","nativeDefault":"\"const ext = arguments[0];\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuCommand","bindings":["arguments","SceneManager","$gameParty","$gameVariables","$gameSwitches"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"const ext = arguments[0];","context":"One argument: arguments[0] is the evaluated extension. Runs once on keyboard or pointer activation. If the action stays in this window, refresh and activate it explicitly. The function body runs in the game global context. Configure prerequisites before entering the menu; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /CommandList/0/CallHandlerJS --value '\"$gameVariables.setValue(1, $gameVariables.value(1) + 1); this.refresh(); this.activate();\"'"]},{"id":"MM-P-26","key":"PersonalHandlerJS","storageKey":"PersonalHandlerJS:func","label":"JS: Personal Code","description":"JavaScript code that runs once the actor list is selected with this command highlighted.","type":"string","editorType":"note","nativeDefault":"\"const ext = arguments[0];\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Scene_Menu","bindings":["arguments","SceneManager","$gameParty","$gameVariables","$gameSwitches"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"const ext = arguments[0];","context":"One argument: arguments[0] is the evaluated extension. Runs after actor confirmation. Read the selected actor with this._statusWindow.actor(this._statusWindow.index()); the native menuActor assignment occurs after this callback. The function body runs in the game global context. Configure prerequisites before entering the menu; restart after editing plugin parameters. This callback runs only after personal actor selection. Its command must start that selection, for example CallHandlerJS: this.callHandler(this.currentSymbol()); (with a native personal symbol such as skill). After the user chooses an actor, PersonalHandlerJS runs with the Scene_Menu receiver and the selected actor available through this._statusWindow.actor(this._statusWindow.index()).","examples":["main-menu parameters set --project <game> --path /CommandList/0/PersonalHandlerJS --value '\"const actor = this._statusWindow.actor(this._statusWindow.index()); SceneManager.push(Scene_Skill);\"'"]}]},"default":[{"Symbol":"item","Subcategory":"","Icon":208,"TextStr":"","TextJS":"return TextManager.item;","ShowJS":"return this.needsCommand(\"item\");","EnableJS":"return this.areMainCommandsEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandItem();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"classChange","Subcategory":"","Icon":133,"TextStr":"","TextJS":"return TextManager.classChangeMenuCommand;","ShowJS":"return Imported.VisuMZ_2_ClassChangeSystem &&\n    this.isClassChangeCommandVisible();","EnableJS":"return this.areMainCommandsEnabled() &&\n    this.isClassChangeCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandPersonal();","PersonalHandlerJS":"SceneManager.push(Scene_ClassChange);"},{"Symbol":"skill","Subcategory":"","Icon":101,"TextStr":"","TextJS":"return TextManager.skill;","ShowJS":"return this.needsCommand(\"skill\");","EnableJS":"return this.areMainCommandsEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandPersonal();","PersonalHandlerJS":"SceneManager.push(Scene_Skill);"},{"Symbol":"equip","Subcategory":"","Icon":137,"TextStr":"","TextJS":"return TextManager.equip;","ShowJS":"return this.needsCommand(\"equip\");","EnableJS":"return this.areMainCommandsEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandPersonal();","PersonalHandlerJS":"SceneManager.push(Scene_Equip);"},{"Symbol":"status","Subcategory":"","Icon":82,"TextStr":"","TextJS":"return TextManager.status;","ShowJS":"return this.needsCommand(\"status\");","EnableJS":"return this.areMainCommandsEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandPersonal();","PersonalHandlerJS":"SceneManager.push(Scene_Status);"},{"Symbol":"itemCrafting","Subcategory":"","Icon":223,"TextStr":"","TextJS":"return TextManager.ItemCraftingMenuCommand;","ShowJS":"return Imported.VisuMZ_2_ItemCraftingSys &&\n    this.isItemCraftingCommandVisible();","EnableJS":"return this.isItemCraftingCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandItemCrafting();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"subcategory","Subcategory":"","Icon":230,"TextStr":"Datalog","TextJS":"return 'Text';","ShowJS":"return this.isSubcategoryVisible(arguments[1]);","EnableJS":"return true;","ExtJS":"// This becomes the subcategory name. Case-sensitive.\n\nreturn 'datalog';","CallHandlerJS":"const ext = arguments[0];\nthis.setSubcategory(ext);","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"quest","Subcategory":"datalog","Icon":186,"TextStr":"","TextJS":"return TextManager.questCommandName;","ShowJS":"return Imported.VisuMZ_2_QuestSystem &&\n    this.isQuestCommandVisible();","EnableJS":"return this.isQuestCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandQuest();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"bestiary","Subcategory":"datalog","Icon":10,"TextStr":"","TextJS":"return TextManager.BestiaryMenuCommand;","ShowJS":"return Imported.VisuMZ_2_Bestiary &&\n    this.isBestiaryCommandVisible();","EnableJS":"return this.isBestiaryCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandBestiary();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"tutorialList","Subcategory":"datalog","Icon":187,"TextStr":"","TextJS":"return TextManager.tutorial.menuCmd;","ShowJS":"return Imported.VisuMZ_2_TutorialPanelSys &&\n    this.isTutorialListCommandVisible();","EnableJS":"return this.isTutorialListCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandTutorialList();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"messageLog","Subcategory":"datalog","Icon":193,"TextStr":"","TextJS":"return TextManager.MessageLogMenuCommand;","ShowJS":"return Imported.VisuMZ_3_MessageLog &&\n    this.isMessageLogCommandVisible();","EnableJS":"return this.isMessageLogCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandMessageLog();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"combatLog","Subcategory":"datalog","Icon":189,"TextStr":"","TextJS":"return TextManager.combatLog_BattleCmd_Name;","ShowJS":"return Imported.VisuMZ_4_CombatLog &&\n    this.isCombatLogCommandVisible();","EnableJS":"return this.isCombatLogCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandCombatLog();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"cgGallery","Subcategory":"datalog","Icon":311,"TextStr":"","TextJS":"return TextManager.cgGalleryMenuCommand;","ShowJS":"return Imported.VisuMZ_4_CGGallery &&\n    this.isCgGalleryCommandVisible();","EnableJS":"return this.isCgGalleryCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandCgGallery();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"creditsPage","Subcategory":"datalog","Icon":193,"TextStr":"","TextJS":"return TextManager.CreditsPageMenuCommand;","ShowJS":"return Imported.VisuMZ_4_CreditsPage &&\n    this.isCreditsPageCommandVisible();","EnableJS":"return this.isCreditsPageCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandCreditsPage();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"patchNotes","Subcategory":"datalog","Icon":83,"TextStr":"","TextJS":"return TextManager.PatchNotesMenuCommand;","ShowJS":"return Imported.VisuMZ_4_PatchNotes &&\n    this.isPatchNotesCommandVisible();","EnableJS":"return this.isPatchNotesCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandPatchNotes();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"formation","Subcategory":"","Icon":75,"TextStr":"","TextJS":"return TextManager.formation;","ShowJS":"return this.needsCommand(\"formation\");","EnableJS":"return this.isFormationEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandFormation();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"battleGridTactics","Subcategory":"","Icon":76,"TextStr":"","TextJS":"return TextManager.BattleGridTacticsMenuCommand;","ShowJS":"return Imported.VisuMZ_2_BattleGridSystem &&\n    this.isBattleGridTacticsCommandVisible();","EnableJS":"return this.isBattleGridTacticsCommandEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandBattleGridTactics();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"options","Subcategory":"","Icon":83,"TextStr":"","TextJS":"return TextManager.options;","ShowJS":"return this.needsCommand(\"options\");","EnableJS":"return this.isOptionsEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandOptions();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"save","Subcategory":"","Icon":189,"TextStr":"","TextJS":"return TextManager.save;","ShowJS":"return this.needsCommand(\"save\");","EnableJS":"return this.isSaveEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandSave();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"load","Subcategory":"","Icon":191,"TextStr":"","TextJS":"return 'Load';","ShowJS":"return this.needsCommand(\"save\");","EnableJS":"return DataManager.isAnySavefileExists();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandLoad();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"commonEvent1","Subcategory":"","Icon":88,"TextStr":"Common Event 1","TextJS":"return 'Text';","ShowJS":"return false;","EnableJS":"return true;","ExtJS":"return 1;","CallHandlerJS":"SceneManager._scene.commandCommonEvent();","PersonalHandlerJS":"const ext = arguments[0];"},{"Symbol":"commonEvent2","Subcategory":"","Icon":87,"TextStr":"Common Event 2","TextJS":"return 'Text';","ShowJS":"return false;","EnableJS":"return this.areMainCommandsEnabled();","ExtJS":"return 2;","CallHandlerJS":"SceneManager._scene.commandPersonal();","PersonalHandlerJS":"// Declare Ext\nconst ext = arguments[0];\n\n// Declare Status Window\nconst statusWindow = SceneManager._scene._statusWindow;\n\n// Declare Actor ID\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\n\n// Set variable 1 to Actor ID\n$gameVariables.setValue(1, actorId);\n\n// Prepare Common Event ext to run\n$gameTemp.reserveCommonEvent(ext);\n\n// Exit Main Menu\nSceneManager._scene.popScene();"},{"Symbol":"gameEnd","Subcategory":"","Icon":187,"TextStr":"","TextJS":"return TextManager.gameEnd;","ShowJS":"return this.needsCommand(\"gameEnd\");","EnableJS":"return this.isGameEndEnabled();","ExtJS":"return null;","CallHandlerJS":"SceneManager._scene.commandGameEnd();","PersonalHandlerJS":"const ext = arguments[0];"}],"context":"Setting /CommandList replaces the entire list, not an append. Each entry must contain all fields in items.fields. Start from parameters get --path /CommandList, preserve existing entries, and copy a complete entry before changing its identity, text and handlers. A nested set changes just the selected field. No fields are implicitly filled in a new entry."},{"id":"MM-P-27","key":"Playtime","storageKey":"Playtime:struct","label":"Playtime Window","description":"Settings for the Playtime Window.","type":"struct","editorType":"struct<Playtime>","nativeDefault":"{\"Enable:eval\":\"true\",\"AdjustCommandHeight:func\":\"true\",\"BgType:num\":\"0\",\"FontSize:num\":\"24\",\"Icon:num\":\"75\",\"Time:str\":\"Time\",\"WindowRect:func\":\"\\\"const rows = 1;\\\\nconst ww = this.mainCommandWidth();\\\\nconst wh = this.calcWindowHeight(rows, false);\\\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\\\nlet wy = this.mainAreaBottom() - wh;\\\\nif (this._goldWindow) wy -= this._goldWindow.height;\\\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\"}","encoding":"plain","availability":"supported","structName":"Playtime","fields":[{"id":"MM-P-28","key":"Enable","storageKey":"Enable:eval","label":"Use Window","description":"Use the Playtime Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","on":"Enable","off":"Don't","default":true},{"id":"MM-P-29","key":"AdjustCommandHeight","storageKey":"AdjustCommandHeight:eval","label":"Adjust Command Window","description":"Adjust the command window's height to fit in the Playtime Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","on":"Enable","off":"Normal","default":true},{"id":"MM-P-30","key":"BgType","storageKey":"BgType:num","label":"Background Type","description":"Select background type for the Playtime window.","type":"number","editorType":"select","nativeDefault":"0","encoding":"plain","availability":"supported","options":[0,1,2],"optionLabels":{"0":"Window","1":"Dim","2":"Transparent"},"default":0},{"id":"MM-P-31","key":"FontSize","storageKey":"FontSize:num","label":"Font Size","description":"Font size for text in the playtime window.","type":"number","editorType":"number","nativeDefault":"20","encoding":"plain","availability":"supported","min":1,"default":20},{"id":"MM-P-32","key":"Icon","storageKey":"Icon:num","label":"Time Icon","description":"Icon displayed for the 'Time' label.","type":"number","editorType":"text","nativeDefault":"75","encoding":"plain","availability":"supported","default":75,"context":"Use the zero-based icon index in img/system/IconSet.png (16 columns, native 32-by-32 cells). A positive index draws that cell; 0 draws no icon. Choose an existing cell within the image; an out-of-sheet index does not provide a usable icon."},{"id":"MM-P-33","key":"Time","storageKey":"Time:str","label":"Time Text","description":"Text for the display of 'Time' in the Playtime window.","type":"string","editorType":"text","nativeDefault":"Time","encoding":"plain","availability":"supported","default":"Time"},{"id":"MM-P-34","key":"WindowRect","storageKey":"WindowRect:func","label":"JS: X, Y, W, H","description":"Code used to determine the dimensions for the Playtime window.","type":"string","editorType":"note","nativeDefault":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Scene_Menu","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);","context":"No arguments. Return a Rectangle in menu coordinates with x, y, width and height. Used by the default command-window layout while this information window is enabled; rearranged layouts calculate their own rectangles. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /Playtime/WindowRect --value '\"return new Rectangle(0, this.mainAreaBottom() - this.calcWindowHeight(1, false), this.mainCommandWidth(), this.calcWindowHeight(1, false));\"'"]}],"default":{"Enable":true,"AdjustCommandHeight":true,"BgType":0,"FontSize":24,"Icon":75,"Time":"Time","WindowRect":"const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"},"context":"The default on this containing parameter is the native complete preset used when it is absent or reset as a whole. Each nested field retains its separate native editor default, used when that field is absent or reset individually; these defaults can differ. Read parameters get for the currently effective value. A set replaces the selected value and requires every field in a struct, including unchanged editorial labels. The historical nativeDefault preset contains AdjustCommandHeight:func. The supported boolean field uses storageKey AdjustCommandHeight:eval; CLI authoring writes that canonical key. Native preset text is retained as reference metadata, not input to --value."},{"id":"MM-P-35","key":"Variable","storageKey":"Variable:struct","label":"Variable Window","description":"Settings for the Variable Window.","type":"struct","editorType":"struct<Variable>","nativeDefault":"{\"Enable:eval\":\"false\",\"AdjustCommandHeight:func\":\"true\",\"BgType:num\":\"0\",\"FontSize:num\":\"24\",\"VarList:arraynum\":\"[\\\"1\\\",\\\"2\\\"]\",\"WindowRect:func\":\"\\\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\\\nconst ww = this.mainCommandWidth();\\\\nconst wh = this.calcWindowHeight(rows, false);\\\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\\\nlet wy = this.mainAreaBottom() - wh;\\\\nif (this._goldWindow) wy -= this._goldWindow.height;\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\"}","encoding":"plain","availability":"supported","structName":"Variable","fields":[{"id":"MM-P-36","key":"Enable","storageKey":"Enable:eval","label":"Use Window","description":"Use the Variable Window?","type":"boolean","editorType":"boolean","nativeDefault":"false","encoding":"plain","availability":"supported","on":"Enable","off":"Don't","default":false},{"id":"MM-P-37","key":"AdjustCommandHeight","storageKey":"AdjustCommandHeight:eval","label":"Adjust Command Window","description":"Adjust the command window's height to fit in the Variable Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","on":"Enable","off":"Normal","default":true,"context":"Applies only when /Variable/Enable is true and /CommandWindowStyle is default. Other layouts compute their command rectangle separately."},{"id":"MM-P-38","key":"BgType","storageKey":"BgType:num","label":"Background Type","description":"Select background type for the Variable window.","type":"number","editorType":"select","nativeDefault":"0","encoding":"plain","availability":"supported","options":[0,1,2],"optionLabels":{"0":"Window","1":"Dim","2":"Transparent"},"default":0},{"id":"MM-P-39","key":"FontSize","storageKey":"FontSize:num","label":"Font Size","description":"Font size for text in the variable window.","type":"number","editorType":"number","nativeDefault":"20","encoding":"plain","availability":"supported","min":1,"default":20},{"id":"MM-P-40","key":"VarList","storageKey":"VarList:arraynum","label":"Variable List","description":"Select variables to be displayed into the window. Use \\i[x] to determine their icon.","type":"array","editorType":"variable[]","nativeDefault":"[\"1\",\"2\",\"3\"]","encoding":"plain","availability":"supported","items":{"type":"number","encoding":"plain"},"default":[1,2,3],"context":"Each number is an existing variable ID. For an icon, put the escape text \\i[87] in that variable's name in the native variable database, for example \\i[87] Tokens, not in this numeric array. The index selects a cell in img/system/IconSet.png; positive indexes draw, 0 does not. The CLI does not edit variable names through this parameter."},{"id":"MM-P-41","key":"WindowRect","storageKey":"WindowRect:func","label":"JS: X, Y, W, H","description":"Code used to determine the dimensions for the Variable window.","type":"string","editorType":"note","nativeDefault":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Scene_Menu","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);","context":"No arguments. Return a Rectangle in menu coordinates with x, y, width and height. Used by the default command-window layout while this information window is enabled; rearranged layouts calculate their own rectangles. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /Variable/WindowRect --value '\"return new Rectangle(0, this.mainAreaBottom() - this.calcWindowHeight(1, false), this.mainCommandWidth(), this.calcWindowHeight(1, false));\"'"]}],"default":{"Enable":false,"AdjustCommandHeight":true,"BgType":0,"FontSize":24,"VarList":[1,2],"WindowRect":"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"},"context":"The default on this containing parameter is the native complete preset used when it is absent or reset as a whole. Each nested field retains its separate native editor default, used when that field is absent or reset individually; these defaults can differ. Read parameters get for the currently effective value. A set replaces the selected value and requires every field in a struct, including unchanged editorial labels. The historical nativeDefault preset contains AdjustCommandHeight:func. The supported boolean field uses storageKey AdjustCommandHeight:eval; CLI authoring writes that canonical key. Native preset text is retained as reference metadata, not input to --value."},{"id":"MM-P-42","key":"CommandWindowStyle","storageKey":"CommandWindowStyle:str","label":"Command Window Style","description":"Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.","type":"string","editorType":"select","nativeDefault":"top","encoding":"plain","availability":"supported","options":["default","top","thinTop","bottom","thinBottom","mobile"],"optionLabels":{"default":"Default Vertical Side Style","top":"Top Horizontal Style","thinTop":"Thin Top Horizontal Style","bottom":"Bottom Horizontal Style","thinBottom":"Thin Bottom Horizontal Style","mobile":"Mobile Full Screen Style"},"default":"top"},{"id":"MM-P-43","key":"CustomCmdWin","storageKey":"CustomCmdWin:struct","label":"Command Style Settings","description":"Settings for the non-default Command Window Styles.","type":"struct","editorType":"struct<CustomCmdWin>","nativeDefault":"{\"Style:str\":\"auto\",\"TextAlign:str\":\"center\",\"Rows:num\":\"2\",\"Cols:num\":\"4\",\"MobileThickness:num\":\"5\"}","encoding":"plain","availability":"supported","parent":"CommandWindowStyle:str","structName":"CustomCmdWin","fields":[{"id":"MM-P-44","key":"Style","storageKey":"Style:str","label":"Command Style","description":"How do you wish to draw command entries in the Command Window?","type":"string","editorType":"select","nativeDefault":"auto","encoding":"plain","availability":"supported","parent":"MainList","options":["text","icon","iconText","auto"],"optionLabels":{"text":"Text Only","icon":"Icon Only","iconText":"Icon + Text","auto":"Automatic"},"default":"auto","context":"Style auto checks each formatted command name: without an icon escape it draws text; with an icon it draws icon plus text when the measured name fits the item line width, otherwise only the icon. /CommandWindowStyle chooses the overall layout; /CustomCmdWin/Style chooses content drawing inside each command."},{"id":"MM-P-45","key":"TextAlign","storageKey":"TextAlign:str","label":"Text Alignment","description":"Decide how you want the text to be aligned.","type":"string","editorType":"combo","nativeDefault":"center","encoding":"plain","availability":"supported","suggestions":["left","center","right"],"default":"center"},{"id":"MM-P-46","key":"Rows","storageKey":"Rows:num","label":"Rows","description":"Number of visible rows.","type":"number","editorType":"number","nativeDefault":"2","encoding":"plain","availability":"supported","min":1,"default":2,"context":"Rows affects top and bottom layouts. thinTop and thinBottom always use one row; default uses the native command rectangle. The mobile layout also uses Rows when calculating its centered command-window height."},{"id":"MM-P-47","key":"Cols","storageKey":"Cols:num","label":"Columns","description":"Number of maximum columns.","type":"number","editorType":"number","nativeDefault":"4","encoding":"plain","availability":"supported","min":1,"default":4,"context":"Cols affects top, bottom and mobile layouts. thinTop and thinBottom instead use one column per current command, and default uses the native single column."},{"id":"MM-P-48","key":"MobileThickness","storageKey":"MobileThickness:num","label":"Mobile Thickness","description":"The thickness of the buttons for mobile version.","type":"number","editorType":"number","nativeDefault":"5","encoding":"plain","availability":"supported","min":1,"default":5,"context":"This is a line-height multiplier, not pixels: mobile command item height is lineHeight() * MobileThickness + 8 pixels (5 with the native 36-pixel line height gives 188 pixels). Applies when /CommandWindowStyle is mobile, on desktop too; it does not detect the device platform."}],"default":{"Style":"auto","TextAlign":"center","Rows":2,"Cols":4,"MobileThickness":5},"context":"Style auto checks each formatted command name: without an icon escape it draws text; with an icon it draws icon plus text when the measured name fits the item line width, otherwise only the icon. /CommandWindowStyle chooses the overall layout; /CustomCmdWin/Style chooses content drawing inside each command. MobileThickness affects only the mobile layout; see MM-P-48."},{"id":"MM-P-49","key":"StatusGraphic","storageKey":"StatusGraphic:str","label":"Status Graphic","description":"Choose how the actor graphics appear in status-like menus.","type":"string","editorType":"select","nativeDefault":"face","encoding":"plain","availability":"supported","options":["none","face","sprite","svbattler"],"optionLabels":{"none":"None","face":"Face","sprite":"Map Sprite","svbattler":"Sideview Battler"},"default":"face"},{"id":"MM-P-50","key":"StatusListStyle","storageKey":"StatusListStyle:str","label":"Main Menu List Style","description":"Choose the actor status-list layout in the main menu.","type":"string","editorType":"select","nativeDefault":"portrait","encoding":"plain","availability":"supported","options":["default","vertical","portrait","solo","thin","thicker"],"optionLabels":{"default":"Default Horizontal Style","vertical":"Vertical Style","portrait":"Portrait Style","solo":"Solo Style","thin":"Thin Horizontal Style","thicker":"Thicker Horizontal Style"},"default":"portrait"},{"id":"MM-P-51","key":"InnerMenuListStyle","storageKey":"InnerMenuListStyle:str","label":"Inner-Menu List Style","description":"Choose how the actor status list looks in the inner menus like Scene_Item, Scene_Skill, etc.","type":"string","editorType":"select","nativeDefault":"default","encoding":"plain","availability":"supported","parent":"StatusListStyle:str","options":["default","vertical","portrait","solo","thin","thicker"],"optionLabels":{"default":"Default Horizontal Style","vertical":"Vertical Style","portrait":"Portrait Style","solo":"Solo Style","thin":"Thin Horizontal Style","thicker":"Thicker Horizontal Style"},"default":"default"},{"id":"MM-P-52","key":"ListStyles","storageKey":"ListStyles:struct","label":"List Style Settings","description":"JavaScript code used to determine how the individual styles are drawn.","type":"struct","editorType":"struct<ListStyles>","nativeDefault":"{\"DefaultStyle:func\":\"\\\"// Declare Constants\\\\nconst actor = arguments[0];\\\\nconst rect = arguments[1];\\\\n\\\\n// Draw Actor Graphic\\\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\\\n\\\\n// Draw Status Stuff\\\\nconst sx = rect.x + 180;\\\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\\\nconst lineHeight = this.lineHeight();\\\\nconst sx2 = sx + 180;\\\\nthis.drawActorName(actor, sx, sy);\\\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\\\nthis.drawActorClass(actor, sx2, sy);\\\\n\\\\n// Place Gauges\\\\nconst sy2 = sy + lineHeight;\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx2, sy2);\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx2, sy2 + gaugeLineHeight);\\\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\\\nif ($dataSystem.optDisplayTp && roomForTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx2, sy2 + gaugeLineHeight * 2);\\\\n}\\\\n\\\\n// Following Requires VisuStella MZ's Core Engine\\\\n// Draw Additional Parameter Data if Enough Room\\\\nconst sx3 = sx2 + 180;\\\\nconst sw = rect.width - sx3 - 2;\\\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\\\n    const pw = Math.floor(sw / 2) - 24;\\\\n    let px = sx3;\\\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\\\n    let counter = 0;\\\\n    for (const param of params) {\\\\n        this.resetFontSettings();\\\\n        this.drawParamText(px, py, pw, param, true);\\\\n        this.resetTextColor();\\\\n        this.contents.fontSize -= 8;\\\\n        const paramValue = actor.paramValueByName(param, true);\\\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\\\n        counter++;\\\\n        if (counter % 2 === 0) {\\\\n            px = sx3;\\\\n            py += gaugeLineHeight;\\\\n        } else {\\\\n            px += pw + 24;\\\\n        }\\\\n    }\\\\n}\\\"\",\"VerticalStyle:func\":\"\\\"// Declare Constants\\\\nconst actor = arguments[0];\\\\nconst rect = arguments[1];\\\\n\\\\n\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\\\n\\\\n// Draw Actor Graphic\\\\nconst gw = rect.width;\\\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\\\nconst gx = rect.x;\\\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\\\n\\\\n// Draw Actor Name\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\\\nlet sw = rect.width;\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\"\",\"PortraitStyle:func\":\"\\\"// Declare Constants\\\\nconst actor = arguments[0];\\\\nconst rect = arguments[1];\\\\n\\\\n// Make Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\\\n\\\\n// Draw Actor Graphic\\\\nconst gw = rect.width;\\\\nconst gh = rect.height;\\\\nconst gx = rect.x;\\\\nconst gy = rect.y;\\\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\\\n\\\\n// Draw Dark Rectangle\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\\\nlet sw = rect.width;\\\\nlet sh = rect.y + rect.height - sy;\\\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\\\n\\\\n// Draw Actor Name\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\"\",\"SoloStyle:func\":\"\\\"// Declare Constants\\\\nconst actor = arguments[0];\\\\nconst rect = arguments[1];\\\\n\\\\n// Make Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\n\\\\n// Draw Actor Graphic\\\\nlet sx = rect.x;\\\\nlet sy = rect.y;\\\\nlet sw = rect.width;\\\\nlet sh = rect.height;\\\\n\\\\n// Portrait\\\\nif (actor.getMenuImage() !== '') {\\\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\\\n\\\\n// Everything Else\\\\n} else {\\\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\\\n}\\\\n\\\\n// Draw Dark Rectangle\\\\nsh = Math.ceil(lineHeight * 4.5);\\\\nsy = rect.y + rect.height - sh;\\\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\\\n\\\\n// Draw Actor Name\\\\nsw = Math.round(rect.width / 2);\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\\\nsy += lineHeight;\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Prepare Stat Coordinates\\\\nsx = rect.x + Math.floor(rect.width / 2);\\\\nsw = rect.width / 2;\\\\nsh = rect.height;\\\\nconst sx3 = sx;\\\\nconst cw = rect.width - sx3 - 2;\\\\n\\\\n// Prepare Total Content Height to vertically center the content.\\\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\\\n    totalHeight += lineHeight;\\\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\\\n}\\\\nconst equips = actor.equips();\\\\ntotalHeight += lineHeight;\\\\ntotalHeight += equips.length * lineHeight;\\\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\\\n\\\\n// Place Gauges\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nif ($dataSystem.optDisplayTp) {\\\\n    sy += gaugeLineHeight;\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n    sy += gaugeLineHeight;\\\\n}\\\\nlet ny = sy;\\\\n\\\\n// Following Requires VisuStella MZ's Core Engine\\\\n// Draw Additional Parameter Data if Enough Room\\\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\\\n    sy += lineHeight;\\\\n    const pw = Math.floor(cw / 2) - 24;\\\\n    let px = sx3;\\\\n    let counter = 0;\\\\n    for (const param of params) {\\\\n        this.resetFontSettings();\\\\n        this.drawParamText(px, sy, pw, param, true);\\\\n        this.resetTextColor();\\\\n        this.contents.fontSize -= 8;\\\\n        const paramValue = actor.paramValueByName(param, true);\\\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\\\n        counter++;\\\\n        if (counter % 2 === 0) {\\\\n            px = sx3;\\\\n            sy += gaugeLineHeight;\\\\n        } else {\\\\n            px += pw + 24;\\\\n        }\\\\n    }\\\\n    ny += lineHeight;\\\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\\\n}\\\\n\\\\n// Draw Actor Equipment\\\\nthis.resetFontSettings();\\\\nsx = rect.x + Math.floor(rect.width / 2);\\\\nsy = ny + lineHeight;\\\\nsw = rect.width / 2;\\\\nfor (const equip of equips) {\\\\n    if (equip) {\\\\n        this.drawItemName(equip, sx, sy, sw);\\\\n        sy += lineHeight;\\\\n        if (sy + lineHeight > rect.y + rect.height) return;\\\\n    }\\\\n}\\\"\",\"ThinStyle:func\":\"\\\"// Declare Constants\\\\nconst actor = arguments[0];\\\\nconst rect = arguments[1];\\\\n\\\\n// Draw Actor Graphic\\\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\\\n\\\\n// Draw Status Stuff\\\\nconst lineHeight = this.lineHeight();\\\\nlet sx = rect.x + 160;\\\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\\\n\\\\n// Draw Actor Data\\\\nthis.drawActorName(actor, sx, sy);\\\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\\\n\\\\n// Place Gauges\\\\nsx += 180;\\\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsx += 140;\\\\nif ((sx + 128) > rect.x + rect.width) return;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsx += 140;\\\\nif ((sx + 128) > rect.x + rect.width) return;\\\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\"\",\"ThickerStyle:func\":\"\\\"// Declare Constants\\\\nconst actor = arguments[0];\\\\nconst rect = arguments[1];\\\\n\\\\n// Draw Actor Graphic\\\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\\\n\\\\n// Draw Status Stuff\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nlet sx = rect.x + 160;\\\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\\\n\\\\n// Draw Actor Data\\\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\\\nthis.drawActorName(actor, sx, sy);\\\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\\\n\\\\n// Place Gauges\\\\nsx += 180;\\\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy + gaugeLineHeight);\\\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy + (gaugeLineHeight * 2));\\\\nsx += 160;\\\\n\\\\n// Following Requires VisuStella MZ's Core Engine\\\\n// Draw Additional Parameter Data if Enough Room\\\\nconst sx3 = sx;\\\\nconst sw = rect.width - sx3 - 2;\\\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\\\n    const pw = Math.floor(sw / 2) - 24;\\\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\\\n    let px = sx3;\\\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\\\n    let counter = 0;\\\\n    for (const param of params) {\\\\n        this.resetFontSettings();\\\\n        this.drawParamText(px, py, pw, param, true);\\\\n        this.resetTextColor();\\\\n        this.contents.fontSize -= 8;\\\\n        const paramValue = actor.paramValueByName(param, true);\\\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\\\n        counter++;\\\\n        if (counter % 2 === 0) {\\\\n            px = sx3;\\\\n            py += gaugeLineHeight;\\\\n        } else {\\\\n            px += pw + 24;\\\\n        }\\\\n    }\\\\n}\\\"\"}","encoding":"plain","availability":"supported","parent":"StatusListStyle:str","structName":"ListStyles","fields":[{"id":"MM-P-53","key":"DefaultStyle","storageKey":"DefaultStyle:func","label":"JS: Default","description":"Code used to draw the data for this particular style.","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuStatus","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}","context":"arguments[0] is the Game_Actor and arguments[1] is its Rectangle in contents coordinates. Draw into this.contents using window drawing methods; the return value is ignored. Called when the matching status-list style refreshes. Portrait and solo styles wait for the current picture; portrait without an image uses the vertical callback. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /ListStyles/DefaultStyle --value '\"const actor = arguments[0], rect = arguments[1]; this.drawActorName(actor, rect.x, rect.y, rect.width);\"'"]},{"id":"MM-P-54","key":"VerticalStyle","storageKey":"VerticalStyle:func","label":"JS: Vertical","description":"Code used to draw the data for this particular style.","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuStatus","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}","context":"arguments[0] is the Game_Actor and arguments[1] is its Rectangle in contents coordinates. Draw into this.contents using window drawing methods; the return value is ignored. Called when the matching status-list style refreshes. Portrait and solo styles wait for the current picture; portrait without an image uses the vertical callback. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /ListStyles/VerticalStyle --value '\"const actor = arguments[0], rect = arguments[1]; this.drawActorName(actor, rect.x, rect.y, rect.width);\"'"]},{"id":"MM-P-55","key":"PortraitStyle","storageKey":"PortraitStyle:func","label":"JS: Portrait","description":"Code used to draw the data for this particular style.","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuStatus","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}","context":"arguments[0] is the Game_Actor and arguments[1] is its Rectangle in contents coordinates. Draw into this.contents using window drawing methods; the return value is ignored. Called when the matching status-list style refreshes. Portrait and solo styles wait for the current picture; portrait without an image uses the vertical callback. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /ListStyles/PortraitStyle --value '\"const actor = arguments[0], rect = arguments[1]; this.drawActorName(actor, rect.x, rect.y, rect.width);\"'"]},{"id":"MM-P-56","key":"SoloStyle","storageKey":"SoloStyle:func","label":"JS: Solo","description":"Code used to draw the data for this particular style.","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuStatus","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}","context":"arguments[0] is the Game_Actor and arguments[1] is its Rectangle in contents coordinates. Draw into this.contents using window drawing methods; the return value is ignored. Called when the matching status-list style refreshes. Portrait and solo styles wait for the current picture; portrait without an image uses the vertical callback. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /ListStyles/SoloStyle --value '\"const actor = arguments[0], rect = arguments[1]; this.drawActorName(actor, rect.x, rect.y, rect.width);\"'"]},{"id":"MM-P-57","key":"ThinStyle","storageKey":"ThinStyle:func","label":"JS: Thin","description":"Code used to draw the data for this particular style.","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuStatus","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);","context":"arguments[0] is the Game_Actor and arguments[1] is its Rectangle in contents coordinates. Draw into this.contents using window drawing methods; the return value is ignored. Called when the matching status-list style refreshes. Portrait and solo styles wait for the current picture; portrait without an image uses the vertical callback. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /ListStyles/ThinStyle --value '\"const actor = arguments[0], rect = arguments[1]; this.drawActorName(actor, rect.x, rect.y, rect.width);\"'"]},{"id":"MM-P-58","key":"ThickerStyle","storageKey":"ThickerStyle:func","label":"JS: Thicker","description":"Code used to draw the data for this particular style.","type":"string","editorType":"note","nativeDefault":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","encoding":"json","availability":"supported","javascript":{"kind":"body","receiver":"Window_MenuStatus","bindings":["arguments","Graphics","ImageManager","$gameParty","$gameVariables"],"onError":"Syntax errors at boot and runtime exceptions propagate to the MZ error handler; offline discovery and editing never execute code."},"default":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}","context":"arguments[0] is the Game_Actor and arguments[1] is its Rectangle in contents coordinates. Draw into this.contents using window drawing methods; the return value is ignored. Called when the matching status-list style refreshes. Portrait and solo styles wait for the current picture; portrait without an image uses the vertical callback. Runs inside the game; restart after editing plugin parameters.","examples":["main-menu parameters set --project <game> --path /ListStyles/ThickerStyle --value '\"const actor = arguments[0], rect = arguments[1]; this.drawActorName(actor, rect.x, rect.y, rect.width);\"'"]}],"default":{"DefaultStyle":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}","VerticalStyle":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}","PortraitStyle":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}","SoloStyle":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}","ThinStyle":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);","ThickerStyle":"// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"},"context":"The default on this containing parameter is the native complete preset used when it is absent or reset as a whole. Each nested field retains its separate native editor default, used when that field is absent or reset individually; these defaults can differ. Read parameters get for the currently effective value. A set replaces the selected value and requires every field in a struct, including unchanged editorial labels."},{"id":"MM-P-59","key":"MouseCursor","storageKey":"MouseCursor:struct","label":"Custom Mouse Cursor","description":"Add/enable a custom mouse cursor for your game.","type":"struct","editorType":"struct<MouseCursor>","nativeDefault":"{\"General\":\"\",\"Enable:eval\":\"true\",\"Graphics\":\"\",\"idleFilenameIcon:str\":\"\",\"clickFilenameIcon:str\":\"\",\"Anchor\":\"\",\"anchorX:num\":\"0.0\",\"anchorY:num\":\"0.0\"}","encoding":"plain","availability":"supported","structName":"MouseCursor","fields":[{"id":"MM-P-60","key":"General","storageKey":"General","label":"General Settings","description":"Editor grouping label for General Settings. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-61","key":"Enable","storageKey":"Enable:eval","label":"Enable?","description":"Enable custom cursor? Requires a custom 'Idle' graphic.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General","on":"Custom Cursor","off":"Normal Cursor","default":true},{"id":"MM-P-62","key":"Graphics","storageKey":"Graphics","label":"Graphic Settings","description":"Editor grouping label for Graphic Settings. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-63","key":"idleFilenameIcon","storageKey":"idleFilenameIcon:str","label":"Idle Filename","description":"Located in game project's /icon/ folder. Include .png extension (ie. Cursor1.png)","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"supported","parent":"Graphics","default":""},{"id":"MM-P-64","key":"clickFilenameIcon","storageKey":"clickFilenameIcon:str","label":"Click Filename","description":"Optional. Located in game project's /icon/ folder. Include .png extension (ie. Cursor2.png)","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"supported","parent":"Graphics","default":"","context":"On desktop, the custom cursor must be enabled and idleFilenameIcon must name a valid image. The click image is displayed while a mouse button is held (mousedown until mouseup); then the idle image returns. If clickFilenameIcon is empty, the idle image is used for both states."},{"id":"MM-P-65","key":"Anchor","storageKey":"Anchor","label":"Anchor Settings","description":"Editor grouping label for Anchor Settings. Its text has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","context":"Read-only editorial metadata; configure the adjacent supported fields to change behavior.","writing":"This editorial entry is not writable through the CLI. Parameter writes reject it as CAPABILITY_UNAVAILABLE; keep its current value when replacing a containing struct."},{"id":"MM-P-66","key":"anchorX","storageKey":"anchorX:num","label":"Anchor X","description":"Anchor X value for the custom cursor. 0.0 - left; 0.5 - center; 1.0 - right","type":"number","editorType":"text","nativeDefault":"0.0","encoding":"plain","availability":"supported","parent":"Anchor","default":0},{"id":"MM-P-67","key":"anchorY","storageKey":"anchorY:num","label":"Anchor Y","description":"Anchor Y value for the custom cursor. 0.0 - top; 0.5 - middle; 1.0 - bottom","type":"number","editorType":"text","nativeDefault":"0.0","encoding":"plain","availability":"supported","parent":"Anchor","default":0}],"default":{"General":"","Enable":true,"Graphics":"","idleFilenameIcon":"","clickFilenameIcon":"","Anchor":"","anchorX":0,"anchorY":0}}],"commands":[{"id":"MM-C-MenuCommandClear","key":"MenuCommandClear","label":"Menu Command: Clear Forced Settings","description":"Clear visibility and enabled overrides; authored ShowJS and EnableJS apply again.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-Clear-Symbols","key":"Symbols","storageKey":"Symbols:arraystr","label":"Symbol(s)","description":"Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.","type":"array","items":{"type":"string"},"editorType":"string[]","nativeDefault":"[]","default":[],"availability":"supported"}],"context":"Runs when the native event interpreter reaches this command. Visibility and enabled state are independent. Repeating an operation is idempotent; the last opposing operation wins. Other symbols remain unchanged. Use Clear to restore authored conditions. Existing legacy event receivers remain accepted.","examples":["main-menu commands list --project <game> --target common-event:1","main-menu commands insert --project <game> --target common-event:1 --before 0 --command MenuCommandClear --value '{\"Symbols\":[\"save\"]}' --expected-hash <fileHash>"]},{"id":"MM-C-MenuCommandForceDisable","key":"MenuCommandForceDisable","label":"Menu Command: Force Disable","description":"Prevent activation of the selected symbols; remove their forced enabled overrides.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ForceDisable-Symbols","key":"Symbols","storageKey":"Symbols:arraystr","label":"Symbol(s)","description":"Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.","type":"array","items":{"type":"string"},"editorType":"string[]","nativeDefault":"[]","default":[],"availability":"supported"}],"context":"Runs when the native event interpreter reaches this command. Visibility and enabled state are independent. Repeating an operation is idempotent; the last opposing operation wins. Other symbols remain unchanged. Use Clear to restore authored conditions. Existing legacy event receivers remain accepted.","examples":["main-menu commands list --project <game> --target common-event:1","main-menu commands insert --project <game> --target common-event:1 --before 0 --command MenuCommandForceDisable --value '{\"Symbols\":[\"save\"]}' --expected-hash <fileHash>"]},{"id":"MM-C-MenuCommandForceEnable","key":"MenuCommandForceEnable","label":"Menu Command: Force Enable","description":"Allow activation of the selected symbols; remove their forced disabled overrides. This does not show a hidden command.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ForceEnable-Symbols","key":"Symbols","storageKey":"Symbols:arraystr","label":"Symbol(s)","description":"Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.","type":"array","items":{"type":"string"},"editorType":"string[]","nativeDefault":"[]","default":[],"availability":"supported"}],"context":"Runs when the native event interpreter reaches this command. Visibility and enabled state are independent. Repeating an operation is idempotent; the last opposing operation wins. Other symbols remain unchanged. Use Clear to restore authored conditions. Existing legacy event receivers remain accepted.","examples":["main-menu commands list --project <game> --target common-event:1","main-menu commands insert --project <game> --target common-event:1 --before 0 --command MenuCommandForceEnable --value '{\"Symbols\":[\"save\"]}' --expected-hash <fileHash>"]},{"id":"MM-C-MenuCommandForceHide","key":"MenuCommandForceHide","label":"Menu Command: Force Hide","description":"Hide the selected symbols; remove their forced shown overrides.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ForceHide-Symbols","key":"Symbols","storageKey":"Symbols:arraystr","label":"Symbol(s)","description":"Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.","type":"array","items":{"type":"string"},"editorType":"string[]","nativeDefault":"[]","default":[],"availability":"supported"}],"context":"Runs when the native event interpreter reaches this command. Visibility and enabled state are independent. Repeating an operation is idempotent; the last opposing operation wins. Other symbols remain unchanged. Use Clear to restore authored conditions. Existing legacy event receivers remain accepted.","examples":["main-menu commands list --project <game> --target common-event:1","main-menu commands insert --project <game> --target common-event:1 --before 0 --command MenuCommandForceHide --value '{\"Symbols\":[\"save\"]}' --expected-hash <fileHash>"]},{"id":"MM-C-MenuCommandForceShow","key":"MenuCommandForceShow","label":"Menu Command: Force Show","description":"Show the selected symbols; remove their forced hidden overrides. This does not enable a disabled command.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ForceShow-Symbols","key":"Symbols","storageKey":"Symbols:arraystr","label":"Symbol(s)","description":"Case-sensitive authored command symbols. An empty list changes nothing; repeated symbols do not accumulate overrides.","type":"array","items":{"type":"string"},"editorType":"string[]","nativeDefault":"[]","default":[],"availability":"supported"}],"context":"Runs when the native event interpreter reaches this command. Visibility and enabled state are independent. Repeating an operation is idempotent; the last opposing operation wins. Other symbols remain unchanged. Use Clear to restore authored conditions. Existing legacy event receivers remain accepted.","examples":["main-menu commands list --project <game> --target common-event:1","main-menu commands insert --project <game> --target common-event:1 --before 0 --command MenuCommandForceShow --value '{\"Symbols\":[\"save\"]}' --expected-hash <fileHash>"]},{"id":"MM-C-ChangeActorMenuImageGroup","key":"ChangeActorMenuImageGroup","label":"Actor: Change Menu Image (Group)","description":"Change the selected actors’ menu portrait filename in img/pictures, without its extension.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ChangeActorMenuImageGroup-Step1:arraynum","key":"Step1","storageKey":"Step1:arraynum","label":"Actor ID(s)","description":"Select which Actor ID(s) to affect.","type":"array","editorType":"actor[]","nativeDefault":"[\"1\"]","default":[1],"availability":"supported","items":{"type":"number"}},{"id":"MM-A-ChangeActorMenuImageGroup-Step2:str","key":"Step2","storageKey":"Step2:str","label":"Filename","description":"Selected actor(s) will have their menu images changed to this.","type":"string","editorType":"file","nativeDefault":"","default":"","availability":"supported","directory":"img/pictures/","context":"Picture filename without extension in img/pictures; for example Actor1_1 requires img/pictures/Actor1_1.png. Empty string clears the explicit portrait rather than restoring the actor note image; native graphics or compatible class/equipment portrait providers may then apply.","examples":["\"Actor1_1\"","\"\""]}],"context":"Runs at the native interpreter command. Group and range ignore missing/nonpositive IDs. Range includes both endpoints regardless of order. Legacy JS evaluates expressions and flattens one array level. Current JS evaluates ActorJS first; FilenameJS runs only for an existing actor. CLI stores JavaScript without executing it. The example requires actors 1 and 2 (only actor 1 for the current JS command), an existing common event 1, and img/pictures/Actor1_1.png. An empty filename clears the explicit portrait; native graphic fallback and compatible class/equipment portrait providers may then apply. It does not restore the original actor note image.","examples":["main-menu commands list --project <game> --target common-event:1 --json","main-menu commands insert --project <game> --target common-event:1 --before 0 --command ChangeActorMenuImageGroup --value '{\"Step1\":[1,2],\"Step2\":\"Actor1_1\"}' --expected-hash HASH_FROM_LIST"]},{"id":"MM-C-ChangeActorMenuImageRange","key":"ChangeActorMenuImageRange","label":"Actor: Change Menu Image (Range)","description":"Change the selected actors’ menu portrait filename in img/pictures, without its extension.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ChangeActorMenuImageRange-Step1","key":"Step1","storageKey":"Step1","label":"Actor ID Range","description":"Editor grouping label for the inclusive actor ID range; this value has no runtime effect.","type":"string","editorType":"text","nativeDefault":"","default":"","availability":"editorial"},{"id":"MM-A-ChangeActorMenuImageRange-Step1Start:num","key":"Step1Start","storageKey":"Step1Start:num","label":"Range Start","description":"Select which Actor ID to start from.","type":"number","editorType":"actor","nativeDefault":"1","default":1,"availability":"supported","parent":"Step1"},{"id":"MM-A-ChangeActorMenuImageRange-Step1End:num","key":"Step1End","storageKey":"Step1End:num","label":"Range End","description":"Select which Actor ID to end at.","type":"number","editorType":"actor","nativeDefault":"4","default":4,"availability":"supported","parent":"Step1"},{"id":"MM-A-ChangeActorMenuImageRange-Step2:str","key":"Step2","storageKey":"Step2:str","label":"Filename","description":"Selected actor(s) will have their menu images changed to this.","type":"string","editorType":"file","nativeDefault":"","default":"","availability":"supported","directory":"img/pictures/","context":"Picture filename without extension in img/pictures; for example Actor1_1 requires img/pictures/Actor1_1.png. Empty string clears the explicit portrait rather than restoring the actor note image; native graphics or compatible class/equipment portrait providers may then apply.","examples":["\"Actor1_1\"","\"\""]}],"context":"Runs at the native interpreter command. Group and range ignore missing/nonpositive IDs. Range includes both endpoints regardless of order. Legacy JS evaluates expressions and flattens one array level. Current JS evaluates ActorJS first; FilenameJS runs only for an existing actor. CLI stores JavaScript without executing it. The example requires actors 1 and 2 (only actor 1 for the current JS command), an existing common event 1, and img/pictures/Actor1_1.png. An empty filename clears the explicit portrait; native graphic fallback and compatible class/equipment portrait providers may then apply. It does not restore the original actor note image.","examples":["main-menu commands list --project <game> --target common-event:1 --json","main-menu commands insert --project <game> --target common-event:1 --before 0 --command ChangeActorMenuImageRange --value '{\"Step1\":\"\",\"Step1Start\":1,\"Step1End\":2,\"Step2\":\"Actor1_1\"}' --expected-hash HASH_FROM_LIST"]},{"id":"MM-C-ChangeActorMenuImageJS","key":"ChangeActorMenuImageJS","label":"Actor: Change Menu Image (JS) (Legacy)","description":"Change the selected actors’ menu portrait filename in img/pictures, without its extension.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ChangeActorMenuImageJS-Step1:arrayeval","key":"Step1","storageKey":"Step1:arrayeval","label":"Actor ID(s)","description":"Enter which Actor ID(s) to affect.","type":"array","editorType":"string[]","nativeDefault":"[\"$gameVariables.value(1)\"]","default":["$gameVariables.value(1)"],"availability":"supported","items":{"type":"string","javascript":{"kind":"script","receiver":"Shared runtime namespace","arguments":[],"onError":"Exceptions propagate to the MZ error handler; offline editing never evaluates expressions."}},"context":"Each string is evaluated in order with the shared runtime namespace as this and no arguments. Use JavaScript completion values (for example $gameParty.members().map(actor => actor.actorId())), not return statements. One array level is flattened before actor IDs are resolved; invalid IDs are ignored. Exceptions stop the command and propagate."},{"id":"MM-A-ChangeActorMenuImageJS-Step2:str","key":"Step2","storageKey":"Step2:str","label":"Filename","description":"Selected actor(s) will have their menu images changed to this.","type":"string","editorType":"file","nativeDefault":"","default":"","availability":"supported","directory":"img/pictures/","context":"Picture filename without extension in img/pictures; for example Actor1_1 requires img/pictures/Actor1_1.png. Empty string clears the explicit portrait rather than restoring the actor note image; native graphics or compatible class/equipment portrait providers may then apply.","examples":["\"Actor1_1\"","\"\""]}],"context":"Runs at the native interpreter command. Group and range ignore missing/nonpositive IDs. Range includes both endpoints regardless of order. Legacy JS evaluates expressions and flattens one array level. Current JS evaluates ActorJS first; FilenameJS runs only for an existing actor. CLI stores JavaScript without executing it. The example requires actors 1 and 2 (only actor 1 for the current JS command), an existing common event 1, and img/pictures/Actor1_1.png. An empty filename clears the explicit portrait; native graphic fallback and compatible class/equipment portrait providers may then apply. It does not restore the original actor note image.","examples":["main-menu commands list --project <game> --target common-event:1 --json","main-menu commands insert --project <game> --target common-event:1 --before 0 --command ChangeActorMenuImageJS --value '{\"Step1\":[\"[1, 2]\"],\"Step2\":\"Actor1_1\"}' --expected-hash HASH_FROM_LIST"]},{"id":"MM-C-ChangeActorMenuImageJS_v124","key":"ChangeActorMenuImageJS_v124","label":"Actor: Change Menu Image (JS) (v1.24)","description":"Change the selected actors’ menu portrait filename in img/pictures, without its extension.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"MM-A-ChangeActorMenuImageJS_v124-ActorJS:func","key":"ActorJS","storageKey":"ActorJS:func","label":"JS: Actor ID","description":"Enter which Actor ID to affect.","type":"string","editorType":"note","nativeDefault":"\"// Get Actor ID here.\\nlet actorID = 0;\\nactorID = $gameParty.members()[0].actorId();\\n\\n// Return Actor ID\\nreturn actorID;\"","default":"// Get Actor ID here.\nlet actorID = 0;\nactorID = $gameParty.members()[0].actorId();\n\n// Return Actor ID\nreturn actorID;","availability":"supported","encoding":"json","javascript":{"kind":"body","receiver":"Converted command arguments object","arguments":[],"onError":"Runtime exceptions propagate to the MZ error handler; offline edits never execute this body."},"context":"No arguments. Return one existing actor ID as a number. An unavailable actor produces no image change. Runs when the event interpreter executes the image command; use $gameActors, $gameParty and $gameVariables for current game state."},{"id":"MM-A-ChangeActorMenuImageJS_v124-FilenameJS:func","key":"FilenameJS","storageKey":"FilenameJS:func","label":"JS: Filename","description":"Enter the filename you wish to use.","type":"string","editorType":"note","nativeDefault":"\"// Get Filename here.\\nlet filename = 'Actor1_';\\nfilename += String(Math.randomInt(8) + 1);\\n\\n// Return Filename\\nreturn filename;\"","default":"// Get Filename here.\nlet filename = 'Actor1_';\nfilename += String(Math.randomInt(8) + 1);\n\n// Return Filename\nreturn filename;","availability":"supported","encoding":"json","javascript":{"kind":"body","receiver":"Converted command arguments object","arguments":[],"onError":"Runtime exceptions propagate to the MZ error handler; offline edits never execute this body."},"context":"No arguments. Return the picture filename without extension, or an empty string to clear the explicit image. Runs when the event interpreter executes the image command; use $gameActors, $gameParty and $gameVariables for current game state."}],"context":"Runs at the native interpreter command. Group and range ignore missing/nonpositive IDs. Range includes both endpoints regardless of order. Legacy JS evaluates expressions and flattens one array level. Current JS evaluates ActorJS first; FilenameJS runs only for an existing actor. CLI stores JavaScript without executing it. The example requires actors 1 and 2 (only actor 1 for the current JS command), an existing common event 1, and img/pictures/Actor1_1.png. An empty filename clears the explicit portrait; native graphic fallback and compatible class/equipment portrait providers may then apply. It does not restore the original actor note image.","examples":["main-menu commands list --project <game> --target common-event:1 --json","main-menu commands insert --project <game> --target common-event:1 --before 0 --command ChangeActorMenuImageJS_v124 --value '{\"ActorJS\":\"return 1;\",\"FilenameJS\":\"return \\\"Actor1_1\\\";\"}' --expected-hash HASH_FROM_LIST"]}],"tags":[{"id":"MM-NT-menu-image","key":"menu-image","label":"Menu image or portrait","surface":"notetag","type":"string","default":null,"targets":["actors"],"availability":"supported","description":"Actor Note portrait settings; Image and Portrait spellings are equivalent. Individual axis offsets override the paired offset. Use explicit signs and native spaces.","pattern":"<Menu (?:Image|Portrait):[ ]([^>\\r\\n]*)>","examples":["<Menu Portrait: Actor1_1>"],"context":"Read from the actor database Note. Filename is stored on actor initialization and can be replaced by image commands; offsets remain note-based. Put the resource in img/pictures; omit its extension in the tag. The example requires img/pictures/Actor1_1.png.","syntax":"Pass the complete tag as a JSON string.","occurrences":"First matching tag for each variant wins; individual axes take precedence over paired offsets.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes are preserved."},{"id":"MM-NT-menu-image-offset","key":"menu-image-offset","label":"Paired portrait offset","surface":"notetag","type":"string","default":null,"targets":["actors"],"availability":"supported","description":"Actor Note portrait settings; Image and Portrait spellings are equivalent. Individual axis offsets override the paired offset. Use explicit signs and native spaces.","pattern":"<Menu (?:Image|Portrait) Offset:[ ]([+\\-]\\d+),[ ]([+\\-]\\d+)>","examples":["<Menu Portrait Offset: +8, -6>"],"context":"Read from the actor database Note. Filename is stored on actor initialization and can be replaced by image commands; offsets remain note-based. Offsets are measured in source picture pixels, with X first and Y second in the paired tag. Positive X moves the image right and negative X left; positive Y moves it down and negative Y up within the portrait crop. Individual axis tags override that axis of the paired tag.","syntax":"Pass the complete tag as a JSON string.","occurrences":"First matching tag for each variant wins; individual axes take precedence over paired offsets.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes are preserved."},{"id":"MM-NT-menu-image-offset-x","key":"menu-image-offset-x","label":"Horizontal portrait offset","surface":"notetag","type":"string","default":null,"targets":["actors"],"availability":"supported","description":"Actor Note portrait settings; Image and Portrait spellings are equivalent. Individual axis offsets override the paired offset. Use explicit signs and native spaces.","pattern":"<Menu (?:Image|Portrait) Offset X:[ ]([+\\-]\\d+)>","examples":["<Menu Image Offset X: -3>"],"context":"Read from the actor database Note. Filename is stored on actor initialization and can be replaced by image commands; offsets remain note-based. Offsets are measured in source picture pixels, with X first and Y second in the paired tag. Positive X moves the image right and negative X left; positive Y moves it down and negative Y up within the portrait crop. Individual axis tags override that axis of the paired tag.","syntax":"Pass the complete tag as a JSON string.","occurrences":"First matching tag for each variant wins; individual axes take precedence over paired offsets.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes are preserved."},{"id":"MM-NT-menu-image-offset-y","key":"menu-image-offset-y","label":"Vertical portrait offset","surface":"notetag","type":"string","default":null,"targets":["actors"],"availability":"supported","description":"Actor Note portrait settings; Image and Portrait spellings are equivalent. Individual axis offsets override the paired offset. Use explicit signs and native spaces.","pattern":"<Menu (?:Image|Portrait) Offset Y:[ ]([+\\-]\\d+)>","examples":["<Menu Image Offset Y: +5>"],"context":"Read from the actor database Note. Filename is stored on actor initialization and can be replaced by image commands; offsets remain note-based. Offsets are measured in source picture pixels, with X first and Y second in the paired tag. Positive X moves the image right and negative X left; positive Y moves it down and negative Y up within the portrait crop. Individual axis tags override that axis of the paired tag.","syntax":"Pass the complete tag as a JSON string.","occurrences":"First matching tag for each variant wins; individual axes take precedence over paired offsets.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes are preserved."}],"methods":[],"commandAliases":["VisuMZ_1_MainMenuCore"]};
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

function installMainMenuForcedCommands() {
    const states = ['forceShow', 'forceHide', 'forceEnable', 'forceDisable'];
    Game_System.prototype.initMainMenuCore = function() {
        this._mainMenuCore = this._mainMenuCore || {};
        for (const state of states) this._mainMenuCore[state] = this._mainMenuCore[state] || [];
    };
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        initialize.call(this);
        this.initMainMenuCore();
    };
    Game_System.prototype.mainMenuCoreSettings = function() {
        this.initMainMenuCore();
        return this._mainMenuCore;
    };
    Game_System.prototype.getMainMenuSymbolState = function(symbol, state) {
        const values = this.mainMenuCoreSettings()[state];
        return values ? values.includes(symbol) : false;
    };
    Game_System.prototype.clearShowMainMenuCommand = function(symbol) {
        const settings = this.mainMenuCoreSettings();
        for (const state of states) settings[state].remove(symbol);
    };
    for (const [state, opposite] of [['forceShow', 'forceHide'], ['forceHide', 'forceShow'], ['forceEnable', 'forceDisable'], ['forceDisable', 'forceEnable']]) {
        Game_System.prototype[state + 'MainMenuCommand'] = function(symbol) {
            const settings = this.mainMenuCoreSettings();
            if (!settings[state].includes(symbol)) settings[state].push(symbol);
            settings[opposite].remove(symbol);
        };
    }
    const methods = {MenuCommandClear: 'clearShowMainMenuCommand', MenuCommandForceShow: 'forceShowMainMenuCommand',
        MenuCommandForceHide: 'forceHideMainMenuCommand', MenuCommandForceEnable: 'forceEnableMainMenuCommand',
        MenuCommandForceDisable: 'forceDisableMainMenuCommand'};
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        for (const [command, method] of Object.entries(methods)) PluginManager.registerCommand(receiver, command, function(args) {
            const symbols = JSON.parse(args['Symbols:arraystr'] || '[]').map(String);
            for (const symbol of symbols) $gameSystem[method](symbol);
        });
    }
}

function installMainMenuCommands(settings) {
    const push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if (sceneClass === Scene_Menu) $gameTemp._mainMenuSubcategory = undefined;
        push.call(this, sceneClass);
    };
    const commands = settings.CommandList;
    const initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        this._subcategory = $gameTemp._mainMenuSubcategory || '';
        initialize.call(this, rect);
        this.createCommandNameWindow(rect);
    };
    Window_MenuCommand.prototype.createCommandNameWindow = function(rect) {
        this._commandNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
        this._commandNameWindow.opacity = 0;
        this.addChild(this._commandNameWindow);
        this.updateCommandNameWindow();
    };
    Window_MenuCommand.prototype.callUpdateHelp = function() {
        Window_HorzCommand.prototype.callUpdateHelp.call(this);
        if (this._commandNameWindow) this.updateCommandNameWindow();
    };
    Window_MenuCommand.prototype.updateCommandNameWindow = function() {
        const window = this._commandNameWindow;
        window.contents.clear();
        if (this.commandStyleCheck(this.index()) !== 'icon') return;
        const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[(\d+)\]/gi, '');
        window.resetFontSettings();
        this.commandNameWindowDrawBackground(name, rect);
        this.commandNameWindowDrawText(name, rect);
        this.commandNameWindowCenter(name, rect);
    };
    // Native extension hook: the default command label has no background.
    Window_MenuCommand.prototype.commandNameWindowDrawBackground = function() {};
    Window_MenuCommand.prototype.commandNameWindowDrawText = function(name, rect) {
        const window = this._commandNameWindow;
        window.drawText(name, 0, rect.y, window.innerWidth, 'center');
    };
    Window_MenuCommand.prototype.commandNameWindowCenter = function(name, rect) {
        const window = this._commandNameWindow;
        window.x = -window.width / 2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
        window.y = Math.floor(rect.height / 4);
    };
    Window_MenuCommand.prototype.currentSubcategory = function() { return this._subcategory; };
    Window_MenuCommand.prototype.isSubcategoryVisible = function(command) {
        if (!command) return true;
        const category = command.ExtJS.call(this);
        return commands.some(child => child !== command && (child.Subcategory || '') === category && this.isMainMenuCommandVisible(child.Symbol, child, true));
    };
    Window_MenuCommand.prototype.doesSubcategoryExist = function(category) {
        return commands.some(command => command.Symbol === 'subcategory' && command.ExtJS.call(this) === category);
    };
    Window_MenuCommand.prototype.isIncludedInSubcategory = function(symbol, command) {
        const category = command.Subcategory || '';
        return category === this._subcategory || this._subcategory === '' && !this.doesSubcategoryExist(category);
    };
    Window_MenuCommand.prototype.isMainMenuCommandVisible = function(symbol, command, ignoreCategory) {
        if (!ignoreCategory && !this.isIncludedInSubcategory(symbol, command)) return false;
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceShow')) return true;
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceHide')) return false;
        return command.ShowJS.call(this, symbol, command);
    };
    Window_MenuCommand.prototype.isMainMenuCommandEnabled = function(symbol, command) {
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceEnable')) return true;
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceDisable')) return false;
        return command.EnableJS.call(this, symbol, command);
    };
    Window_MenuCommand.prototype.makeCommandList = function() {
        let categoryIndex = 0;
        for (const command of commands) {
            if (!this.isMainMenuCommandVisible(command.Symbol, command)) continue;
            const text = command.TextStr && command.TextStr !== 'Untitled' ? command.TextStr : command.TextJS.call(this);
            const name = (command.Icon > 0 && settings.CustomCmdWin.Style !== 'text' ? '\\I[' + command.Icon + ']' : '') + text;
            const symbol = command.Symbol === 'subcategory' ? command.Symbol + (++categoryIndex) : command.Symbol;
            this.addCommand(name, symbol, this.isMainMenuCommandEnabled(command.Symbol, command), command.ExtJS.call(this));
            this._list[this._list.length - 1].mainMenuCommand = command;
        }
    };
    Window_MenuCommand.prototype.itemTextAlign = function() { return settings.CustomCmdWin.TextAlign; };
    Window_MenuCommand.prototype.commandStyle = function() { return settings.CustomCmdWin.Style; };
    Window_MenuCommand.prototype.commandStyleCheck = function(index) {
        const style = this.commandStyle();
        if (style !== 'auto') return style;
        const name = this.commandName(index);
        if (!/\\I\[\d+\]/i.test(name)) return 'text';
        return this.textSizeEx(name).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
    };
    Window_MenuCommand.prototype.drawItem = function(index) {
        const style = this.commandStyleCheck(index);
        if (style === 'iconText') this.drawItemStyleIconText(index);
        else if (style === 'icon') this.drawItemStyleIcon(index);
        else Window_Command.prototype.drawItem.call(this, index);
    };
    Window_MenuCommand.prototype.drawItemStyleIcon = function(index) {
        const rect = this.itemLineRect(index), match = this.commandName(index).match(/\\I\[(\d+)\]/i);
        if (match) this.drawIcon(Number(match[1]), rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2), rect.y + (rect.height - ImageManager.iconHeight) / 2);
    };
    Window_MenuCommand.prototype.drawItemStyleIconText = function(index) {
        const rect = this.itemLineRect(index), name = this.commandName(index), width = this.textSizeEx(name).width;
        this.changePaintOpacity(this.isCommandEnabled(index));
        const align = this.itemTextAlign();
        const x = align === 'right' ? rect.x + rect.width - width : align === 'center' ? rect.x + Math.floor((rect.width - width) / 2) : rect.x;
        this.drawTextEx(name, x, rect.y, width);
    };
    Window_MenuCommand.prototype.setSubcategory = function(category) {
        if (this._subcategory === category) return;
        this._subcategory = category;
        $gameTemp._mainMenuSubcategory = category;
        this.refresh(); this.select(0); this.setTopRow(0); this.activate();
    };
    Window_MenuCommand.prototype.removeSubcategory = function() {
        const category = this._subcategory;
        this._subcategory = '';
        $gameTemp._mainMenuSubcategory = undefined;
        this.refresh(); this.setTopRow(0);
        this.select(Math.max(this.findExt(category), 0)); this.activate();
    };
    const cancel = Window_MenuCommand.prototype.processCancel;
    Window_MenuCommand.prototype.processCancel = function() {
        if (!this._subcategory) return cancel.call(this);
        SoundManager.playCancel(); this.updateInputData(); this.removeSubcategory();
    };
    const callOkHandler = Window_MenuCommand.prototype.callOkHandler;
    Window_MenuCommand.prototype.callOkHandler = function() {
        const command = this.currentData()?.mainMenuCommand;
        if (!command) return callOkHandler.call(this);
        command.CallHandlerJS.call(this, this.currentExt());
    };
    const personalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        const window = this._commandWindow, command = window.currentData()?.mainMenuCommand;
        if (!command) return personalOk.call(this);
        command.PersonalHandlerJS.call(this, window.currentExt());
    };
    Scene_Menu.prototype.commandLoad = function() { SceneManager.push(Scene_Load); };
    Scene_Menu.prototype.commandCommonEvent = function() {
        $gameTemp.reserveCommonEvent(this._commandWindow.currentExt());
        this.popScene();
    };
    Scene_Menu.prototype.isSoloQuickMode = function() { return settings.General.SoloQuick && $gameParty.members().length <= 1; };
    const personal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        if (this.isSoloQuickMode() && this._statusWindow) {
            $gameParty.setTargetActor($gameParty.members()[0]);
            this.onPersonalOk();
        } else {
            personal.call(this);
            if (!settings.General.StatusSelectLast) this._statusWindow.select(0);
        }
    };
}

function installMainMenuActorGraphics(settings) {
    ImageManager.svActorHorzCells = ImageManager.svActorHorzCells || 9;
    ImageManager.svActorVertCells = ImageManager.svActorVertCells || 6;
    Window_Base.prototype.drawSvActor = function(name, x, y) {
        const bitmap = ImageManager.loadSvActor(name), single = /\$/i.test(name);
        const width = bitmap.width / (single ? 1 : ImageManager.svActorHorzCells);
        const height = bitmap.height / (single ? 1 : ImageManager.svActorVertCells);
        this.contents.blt(bitmap, 0, 0, width, height, x - width / 2, y - height);
    };
    const setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        setup.call(this, actorId);
        this.initMenuImage();
    };
    Game_Actor.prototype.initMenuImage = function() {
        this._menuImage = this.actor().note.match(/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)?.[1] || '';
    };
    Game_Actor.prototype.getMenuImage = function() {
        if (this._menuImage === undefined) this.initMenuImage();
        return this._menuImage;
    };
    Game_Actor.prototype.setMenuImage = function(filename) { this._menuImage = filename; };
    for (const [axis, index] of [['X', 1], ['Y', 2]]) {
        Game_Actor.prototype['getMenuImageOffset' + axis] = function() {
            const note = this.actor().note;
            const individual = note.match(new RegExp('<MENU (?:IMAGE|PORTRAIT) OFFSET ' + axis + ':[ ]([\\+\\-]\\d+)>', 'i'));
            const pair = note.match(/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i);
            return Number(individual?.[1] ?? pair?.[index] ?? 0);
        };
    }
    const loadFaces = Window_StatusBase.prototype.loadFaceImages;
    Window_StatusBase.prototype.loadFaceImages = function() {
        loadFaces.call(this);
        this.loadOtherActorImages();
    };
    Window_StatusBase.prototype.loadOtherActorImages = function() {
        for (const actor of $gameParty.members()) {
            if (actor.characterName()) ImageManager.loadCharacter(actor.characterName());
            if (actor.battlerName()) ImageManager.loadSvActor(actor.battlerName());
            if (actor.getMenuImage()) ImageManager.loadPicture(actor.getMenuImage());
        }
    };
    Window_StatusBase.prototype.graphicType = function() { return settings.StatusGraphic; };
    Window_EquipStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        switch (this.graphicType()) {
            case 'none': return;
            case 'sprite': return this.drawItemActorSprite(actor, x, y, width, height);
            case 'svbattler': return this.drawItemActorSvBattler(actor, x, y, width, height);
            default: return Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height);
        }
    };
    function paintActor(window, actor, draw) {
        if (window.constructor === Window_MenuStatus) window.changePaintOpacity(actor.isBattleMember());
        draw();
        window.changePaintOpacity(true);
    }
    Window_StatusBase.prototype.drawItemActorFace = function(actor, x, y, width, height) {
        width = width || ImageManager.faceWidth; height = height || ImageManager.faceHeight;
        paintActor(this, actor, () => this.drawActorFace(actor, x + Math.floor((width - ImageManager.faceWidth) / 2), y, ImageManager.faceWidth, height - 2));
    };
    Window_StatusBase.prototype.drawItemActorSprite = function(actor, x, y, width, height) {
        width = width || ImageManager.faceWidth; height = height || ImageManager.faceHeight;
        const bitmap = ImageManager.loadCharacter(actor.characterName()), big = ImageManager.isBigCharacter(actor.characterName());
        const cellWidth = bitmap.width / (big ? 3 : 12), cellHeight = bitmap.height / (big ? 4 : 8);
        const index = big ? 0 : actor.characterIndex();
        paintActor(this, actor, () => this.contents.blt(bitmap,
            (index % 4 * 3 + 1) * cellWidth, Math.floor(index / 4) * 4 * cellHeight,
            Math.min(width, cellWidth), Math.min(height, cellHeight),
            Math.floor(x + Math.max(width - cellWidth, 0) / 2), Math.floor(y + Math.max(height - cellHeight, 0) / 2)));
    };
    Window_StatusBase.prototype.drawItemActorSvBattler = function(actor, x, y, width, height) {
        width = width || ImageManager.faceWidth; height = height || ImageManager.faceHeight;
        const bitmap = ImageManager.loadSvActor(actor.battlerName()), isStatic = actor.hasStaticSvBattler?.();
        const sw = bitmap.width / (isStatic ? 1 : ImageManager.svActorHorzCells), sh = bitmap.height / (isStatic ? 1 : ImageManager.svActorVertCells);
        const scale = Math.min(1, width / sw, height / sh), dw = sw * scale, dh = sh * scale;
        paintActor(this, actor, () => this.contents.blt(bitmap, 0, 0, sw, sh, Math.floor(x + (width - dw) / 2), Math.floor(y + (height - dh) / 2), dw, dh));
    };
    Window_StatusBase.prototype.drawItemActorMenuImage = function(actor, x, y, width, height) {
        const bitmap = ImageManager.loadPicture(actor.getMenuImage());
        width = (width || ImageManager.faceWidth) - 2; height = (height || ImageManager.faceHeight) - 2;
        const sw = Math.min(width, bitmap.width), sh = Math.min(height, bitmap.height);
        paintActor(this, actor, () => this.contents.blt(bitmap,
            Math.round((bitmap.width - sw) / 2) - actor.getMenuImageOffsetX(),
            Math.round((bitmap.height - sh) / 2) - actor.getMenuImageOffsetY(), sw, sh,
            x + 1, Math.max(y + 1, y + height - bitmap.height + 1)));
    };
    const styles = settings.ListStyles;
    Window_MenuStatus.prototype.showOnlyBattleMembers = function() {
        return !settings.General.ShowReserve && (!settings.General.HideMainMenuOnly || SceneManager._scene.constructor === Scene_Menu);
    };
    const maxItems = Window_MenuStatus.prototype.maxItems;
    Window_MenuStatus.prototype.maxItems = function() { return this.showOnlyBattleMembers() ? $gameParty.battleMembers().length : maxItems.call(this); };
    Window_MenuStatus.prototype.listStyle = function() {
        return SceneManager._scene.constructor === Scene_Menu ? settings.StatusListStyle : settings.InnerMenuListStyle;
    };
    Window_MenuStatus.prototype.numVisibleRows = function() { return ['vertical', 'portrait', 'solo'].includes(this.listStyle()) ? 1 : $gameParty.maxBattleMembers(); };
    Window_MenuStatus.prototype.maxCols = function() { return ['vertical', 'portrait'].includes(this.listStyle()) ? $gameParty.maxBattleMembers() : 1; };
    const itemHeight = Window_MenuStatus.prototype.itemHeight;
    Window_MenuStatus.prototype.itemHeight = function() {
        const style = this.listStyle();
        if (['vertical', 'portrait', 'solo'].includes(style)) return this.innerHeight;
        if (style === 'thin') return Window_Selectable.prototype.itemHeight.call(this);
        if (style === 'thicker') return this.lineHeight() * 2 + 8;
        return itemHeight.call(this);
    };
    Window_MenuStatus.prototype.drawItem = function(index) {
        this.drawPendingItemBackground(index);
        this.drawItemStatus(index);
    };
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        this.resetFontSettings();
        const actor = this.actor(index), rect = this.itemRect(index), style = this.listStyle();
        const name = style[0].toUpperCase() + style.slice(1);
        this['drawItemStatus' + name + 'Style'](actor, rect);
    };
    for (const name of ['Default', 'Vertical', 'Thin', 'Thicker']) {
        Window_MenuStatus.prototype['drawItemStatus' + name + 'Style'] = function(actor, rect) { styles[name + 'Style'].call(this, actor, rect); };
    }
    function drawLoaded(window, actor, rect, style) {
        const filename = actor.getMenuImage(), contents = window.contents;
        ImageManager.loadPicture(filename).addLoadListener(() => {
            if (window._destroyed || window.contents !== contents || actor.getMenuImage() !== filename) return;
            const index = $gameParty.members().indexOf(actor);
            if (index < 0 || index >= window.maxItems()) return;
            const current = window.itemRect(index);
            if (['x', 'y', 'width', 'height'].some(key => current[key] !== rect[key])) return;
            window['drawItemStatus' + style + 'OnLoad'](actor, rect);
        });
    }
    Window_MenuStatus.prototype.drawItemStatusPortraitStyle = function(actor, rect) {
        if (actor.getMenuImage()) drawLoaded(this, actor, rect, 'PortraitStyle');
        else this.drawItemStatusVerticalStyle(actor, rect);
    };
    Window_MenuStatus.prototype.drawItemStatusSoloStyle = function(actor, rect) { drawLoaded(this, actor, rect, 'SoloStyle'); };
    for (const style of ['PortraitStyle', 'SoloStyle']) {
        Window_MenuStatus.prototype['drawItemStatus' + style + 'OnLoad'] = function(actor, rect) { styles[style].call(this, actor, rect); };
    }
    Window_MenuStatus.prototype.isExpGaugeDrawn = function() {
        return !['thin', 'thicker'].includes(this.listStyle()) && Window_StatusBase.prototype.isExpGaugeDrawn.call(this);
    };
    const selectLast = Window_MenuStatus.prototype.selectLast;
    Window_MenuStatus.prototype.selectLast = function() {
        if (settings.General.StatusSelectLast) selectLast.call(this);
        else this.smoothSelect(0);
    };
    Window_MenuStatus.prototype.drawActorGraphic = function(actor, x, y, width, height) {
        switch (this.graphicType()) {
            case 'none': return;
            case 'sprite': return this.drawItemActorSprite(actor, x, y + 1, width, height - 2);
            case 'svbattler': return this.drawItemActorSvBattler(actor, x, y + 1, width, height - 2);
            default: return this.drawItemActorFace(actor, x, y, width, height);
        }
    };
}

function installMainMenuLayouts(settings) {
    Scene_Menu.prototype.commandWindowStyle = function() { return settings.CommandWindowStyle; };
    Scene_Menu.prototype.thinGoldWindow = function() { return this.commandWindowStyle() !== 'default' || settings.General.ThinGoldWindow; };
    Scene_Menu.prototype.applyThinnerGoldWindowRect = function(rect) {
        if (!this.thinGoldWindow()) return;
        const height = this.calcWindowHeight(1, false);
        if (settings.General.AutoGoldY) rect.y += rect.height - height;
        if (settings.General.AutoGoldHeight) rect.height = height;
    };
    const goldRect = Scene_Menu.prototype.goldWindowRect;
    Scene_Menu.prototype.goldWindowRect = function() {
        const style = this.commandWindowStyle();
        if (['top', 'thinTop', 'mobile'].includes(style)) return this.goldWindowRectTopStyle();
        if (['bottom', 'thinBottom'].includes(style)) return this.goldWindowRectBottomStyle();
        const rect = goldRect.call(this); this.applyThinnerGoldWindowRect(rect); return rect;
    };
    Scene_Menu.prototype.goldWindowRectTopStyle = function() {
        const width = this.mainCommandWidth(), height = this.calcWindowHeight(1, false);
        return new Rectangle(Graphics.boxWidth - width, this.mainAreaBottom() - height, width, height);
    };
    Scene_Menu.prototype.goldWindowRectBottomStyle = function() {
        const rect = this.goldWindowRectTopStyle(); rect.y = this.mainAreaTop(); return rect;
    };
    const commandRect = Scene_Menu.prototype.commandWindowRect;
    Scene_Menu.prototype.commandWindowRect = function() {
        const style = this.commandWindowStyle();
        if (style === 'default') {
            const rect = commandRect.call(this); this.adjustDefaultCommandWindowRect(rect); return rect;
        }
        return this['commandWindowRect' + style[0].toUpperCase() + style.slice(1) + 'Style']();
    };
    Scene_Menu.prototype.adjustDefaultCommandWindowRect = function(rect) {
        if (this.adjustCommandHeightByPlaytime?.()) rect.height -= this.playtimeWindowRect().height;
        if (this.adjustCommandHeightByVariable?.()) rect.height -= this.variableWindowRect().height;
    };
    for (const [name, bottom, thin] of [['Top', false, false], ['ThinTop', false, true], ['Bottom', true, false], ['ThinBottom', true, true]]) {
        Scene_Menu.prototype['commandWindowRect' + name + 'Style'] = function() {
            const height = this.calcWindowHeight(thin ? 1 : settings.CustomCmdWin.Rows, true);
            return new Rectangle(0, bottom ? this.mainAreaBottom() - height : this.mainAreaTop(), Graphics.boxWidth, height);
        };
    }
    Scene_Menu.prototype.commandWindowRectMobileStyle = function() {
        const height = Window_MenuCommand.prototype.fittingHeight(settings.CustomCmdWin.Rows);
        return new Rectangle(0, Math.round((Graphics.boxHeight - height) / 2), Graphics.boxWidth, height);
    };
    const statusRect = Scene_Menu.prototype.statusWindowRect;
    Scene_Menu.prototype.statusWindowRect = function() {
        const style = this.commandWindowStyle();
        if (['top', 'thinTop'].includes(style)) return this.statusWindowRectTopStyle();
        if (['bottom', 'thinBottom'].includes(style)) return this.statusWindowRectBottomStyle();
        if (style === 'mobile') return this.statusWindowRectMobileStyle();
        return statusRect.call(this);
    };
    Scene_Menu.prototype.statusWindowRectTopStyle = function() {
        return new Rectangle(0, this._commandWindow.y + this._commandWindow.height, Graphics.boxWidth,
            this.mainAreaHeight() - this._commandWindow.height - this._goldWindow.height);
    };
    Scene_Menu.prototype.statusWindowRectBottomStyle = function() {
        const rect = this.statusWindowRectTopStyle(); rect.y = this._goldWindow.y + this._goldWindow.height; return rect;
    };
    Scene_Menu.prototype.statusWindowRectMobileStyle = function() {
        const height = this.mainAreaHeight() - this._goldWindow.height;
        return new Rectangle(0, this.mainAreaBottom() - this._goldWindow.height - height, Graphics.boxWidth, height);
    };
    Window_MenuCommand.prototype.maxCols = function() {
        const style = SceneManager._scene.commandWindowStyle();
        if (['thinTop', 'thinBottom'].includes(style)) return this._list ? this.maxItems() : 4;
        return style === 'default' ? Window_Command.prototype.maxCols.call(this) : settings.CustomCmdWin.Cols;
    };
    Window_MenuCommand.prototype.itemHeight = function() {
        return SceneManager._scene.commandWindowStyle() === 'mobile' ? this.lineHeight() * settings.CustomCmdWin.MobileThickness + 8 : Window_Command.prototype.itemHeight.call(this);
    };
    Scene_Menu.prototype.adjustStatusWindowMobile = function() { if (this.commandWindowStyle() === 'mobile') this._statusWindow.openness = 0; };
    const createStatus = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() { createStatus.call(this); this.adjustStatusWindowMobile(); };
    for (const [method, open] of [['commandPersonal', true], ['commandFormation', true], ['onPersonalCancel', false], ['onFormationCancel', false]]) {
        const previous = Scene_Menu.prototype[method];
        Scene_Menu.prototype[method] = function() {
            if (method === 'commandPersonal' && this.isSoloQuickMode()) return previous.call(this);
            previous.call(this);
            if (this.commandWindowStyle() === 'mobile') this._statusWindow[open ? 'open' : 'close']();
        };
    }
}

function installMainMenuActorBackground(settings) {
    function Sprite_MenuBackgroundActor() { this.initialize(...arguments); }
    Sprite_MenuBackgroundActor.prototype = Object.create(Sprite.prototype);
    Sprite_MenuBackgroundActor.prototype.constructor = Sprite_MenuBackgroundActor;
    Sprite_MenuBackgroundActor.prototype.initialize = function() {
        this._actor = null;
        this._bitmapReady = false;
        Sprite.prototype.initialize.call(this);
        this.x = Graphics.width;
    };
    Sprite_MenuBackgroundActor.prototype.setActor = function(actor) {
        if (this._actor === actor) return;
        this._actor = actor;
        this.loadBitmap();
    };
    Sprite_MenuBackgroundActor.prototype.loadBitmap = function() {
        this._bitmapReady = false;
        const actor = this._actor, generation = this._loadGeneration = (this._loadGeneration || 0) + 1;
        const bitmap = this.bitmap = actor ? ImageManager.loadPicture(actor.getMenuImage()) : new Bitmap(1, 1);
        if (actor) bitmap.addLoadListener(() => {
            if (!this._destroyed && this._loadGeneration === generation && this._actor === actor && this.bitmap === bitmap) this.onBitmapLoad();
        });
    };
    Sprite_MenuBackgroundActor.prototype.onBitmapLoad = function() {
        this._bitmapReady = true;
        settings.General.ActorBgMenuJS.call(this);
    };
    Sprite_MenuBackgroundActor.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._bitmapReady) {
            this.updateOpacity(); this.updatePosition(); this.updateDuration();
        }
    };
    Sprite_MenuBackgroundActor.prototype.updateOpacity = function() {
        if (this._duration > 0) this.opacity = (this.opacity * (this._duration - 1) + 255) / this._duration;
    };
    Sprite_MenuBackgroundActor.prototype.updatePosition = function() {
        if (this._duration > 0) {
            this.x = (this.x * (this._duration - 1) + this._targetX) / this._duration;
            this.y = (this.y * (this._duration - 1) + this._targetY) / this._duration;
        }
    };
    Sprite_MenuBackgroundActor.prototype.updateDuration = function() { if (this._duration > 0) this._duration--; };
    globalThis.Sprite_MenuBackgroundActor = Sprite_MenuBackgroundActor;
    const createBackground = Scene_MenuBase.prototype.createBackground;
    Scene_MenuBase.prototype.createBackground = function() {
        createBackground.call(this);
        this.createActorMenuBackgroundImageSprite();
    };
    Scene_MenuBase.prototype.createActorMenuBackgroundImageSprite = function() {
        this._actorMenuBgSprite = new Sprite_MenuBackgroundActor();
        this.addChild(this._actorMenuBgSprite);
    };
    Scene_MenuBase.prototype.isDisplayActorMenuBackgroundImage = function() { return settings.General.ActorBgMenus.includes(this.constructor.name); };
    const updateActor = Scene_MenuBase.prototype.updateActor;
    Scene_MenuBase.prototype.updateActor = function() {
        updateActor.call(this);
        if (this.isDisplayActorMenuBackgroundImage() && this._actorMenuBgSprite) this._actorMenuBgSprite.setActor(this._actor);
    };
}

function installMainMenuImageCommands() {
    function changeActors(ids, filename) {
        for (const value of ids) {
            const id = parseInt(value) || 0;
            if (id > 0) $gameActors.actor(id)?.setMenuImage(filename);
        }
    }
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageGroup', args => {
            changeActors(JSON.parse(args['Step1:arraynum'] || '[]'), args['Step2:str']);
        });
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageRange', args => {
            const first = Number(args['Step1Start:num']), last = Number(args['Step1End:num']);
            const start = Math.min(first, last), end = Math.max(first, last);
            for (let id = start; id <= end; id++) changeActors([id], args['Step2:str']);
        });
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageJS', args => {
            const evaluate = new Function('source', 'return eval(source);');
            const ids = JSON.parse(args['Step1:arrayeval'] || '[]').map(expression => evaluate.call(globalThis.VisuMZ, expression)).flat(1);
            changeActors(ids, args['Step2:str']);
        });
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageJS_v124', args => {
            const parameters = {...args, ActorJS: new Function(args['ActorJS:func'] === '' ? 'return null;' : JSON.parse(args['ActorJS:func'])), FilenameJS: new Function(args['FilenameJS:func'] === '' ? 'return null;' : JSON.parse(args['FilenameJS:func']))};
            const actor = $gameActors.actor(parameters.ActorJS());
            if (actor) actor.setMenuImage(parameters.FilenameJS());
            else console.log('NO ACTOR FOUND!');
        });
    }
}

function installMainMenuAuxiliary(settings) {
    function drawIconInRect(window, icon, rect) {
        const width = ImageManager.standardIconWidth || 32;
        window.drawIcon(icon, rect.x + Math.ceil((width - ImageManager.iconWidth) / 2), rect.y + (window.lineHeight() - ImageManager.iconHeight) / 2);
        rect.x += width + 4;
        rect.width -= width + 4;
    }
    function Window_ThinGold() { this.initialize(...arguments); }
    Window_ThinGold.prototype = Object.create(Window_Gold.prototype);
    Window_ThinGold.prototype.constructor = Window_ThinGold;
    Window_ThinGold.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_ThinGold.prototype.colSpacing = function() { return Window_Selectable.prototype.colSpacing.call(this); };

    function Window_Playtime() { this.initialize(...arguments); }
    Window_Playtime.prototype = Object.create(Window_Selectable.prototype);
    Window_Playtime.prototype.constructor = Window_Playtime;
    Window_Playtime.prototype.initialize = function(rect) {
        this._playtimeText = $gameSystem.playtimeText();
        this._timer = 60;
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    };
    Window_Playtime.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_Playtime.prototype.resetFontSettings = function() {
        Window_Selectable.prototype.resetFontSettings.call(this);
        this.contents.fontSize = settings.Playtime.FontSize;
    };
    Window_Playtime.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateTimer();
    };
    Window_Playtime.prototype.updateTimer = function() { if (this._timer-- > 0 && this._timer <= 0) this.refresh(); };
    Window_Playtime.prototype.refresh = function() {
        this._timer = 60;
        const rect = this.itemLineRect(0);
        this.contents.clear();
        this.drawTimeIcon(rect);
        this.drawTimeLabel(rect);
        this.drawPlaytime(rect);
    };
    Window_Playtime.prototype.drawTimeIcon = function(rect) { if (settings.Playtime.Icon > 0) drawIconInRect(this, settings.Playtime.Icon, rect); };
    Window_Playtime.prototype.drawTimeLabel = function(rect) {
        this.resetFontSettings();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(settings.Playtime.Time, rect.x, rect.y, rect.width, 'left');
        this.resetTextColor();
    };
    Window_Playtime.prototype.drawPlaytime = function(rect) { this.drawText($gameSystem.playtimeText(), rect.x, rect.y, rect.width, 'right'); };

    function Window_MenuVariables() { this.initialize(...arguments); }
    Window_MenuVariables.prototype = Object.create(Window_Selectable.prototype);
    Window_MenuVariables.prototype.constructor = Window_MenuVariables;
    Window_MenuVariables.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = settings.Variable.VarList;
        this.refresh();
    };
    Window_MenuVariables.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_MenuVariables.prototype.maxCols = function() { return SceneManager._scene.commandWindowStyle() === 'default' ? 1 : settings.Variable.VarList.length; };
    Window_MenuVariables.prototype.maxItems = function() { return this._data.length; };
    Window_MenuVariables.prototype.resetFontSettings = function() {
        Window_Selectable.prototype.resetFontSettings.call(this);
        this.contents.fontSize = settings.Variable.FontSize;
        this.changeTextColor(ColorManager.systemColor());
    };
    // Native extension hook: variable rows have no default background.
    Window_MenuVariables.prototype.drawItemBackground = function() {};
    Window_MenuVariables.prototype.drawItem = function(index) {
        const id = this._data[index];
        if (id <= 0 || !$dataSystem.variables[id]) return;
        const rect = this.itemLineRect(index);
        this.resetFontSettings();
        let name = $dataSystem.variables[id].trim();
        const match = name.match(/\\I\[(\d+)\]/i);
        if (match) {
            name = name.replace(match[0], '').trim();
            if (Number(match[1]) > 0) drawIconInRect(this, Number(match[1]), rect);
        }
        this.drawText(name, rect.x, rect.y, rect.width, 'left');
        this.changeTextColor(ColorManager.normalColor());
        this.drawText($gameVariables.value(id), rect.x, rect.y, rect.width, 'right');
    };
    Object.assign(globalThis, {Window_ThinGold, Window_Playtime, Window_MenuVariables});
    Scene_Menu.prototype.createGoldWindow = function() {
        this._goldWindow = new (this.thinGoldWindow() ? Window_ThinGold : Window_Gold)(this.goldWindowRect());
        this.addWindow(this._goldWindow);
    };
    for (const [name, key, WindowClass] of [['Playtime', 'playtime', Window_Playtime], ['Variable', 'variable', Window_MenuVariables]]) {
        Scene_Menu.prototype['canCreate' + name + 'Window'] = function() { return settings[name].Enable; };
        Scene_Menu.prototype['adjustCommandHeightBy' + name] = function() { return this['canCreate' + name + 'Window']() && (settings[name].AdjustCommandHeight ?? true); };
        Scene_Menu.prototype['create' + name + 'Window'] = function() {
            if (!this['canCreate' + name + 'Window']()) return new Rectangle(0, 0, 0, 0);
            const window = new WindowClass(this[key + 'WindowRect']());
            this['_' + key + 'Window'] = window;
            window.setBackgroundType(settings[name].BgType);
            this.addWindow(window);
        };
        Scene_Menu.prototype[key + 'WindowRect'] = function() {
            const style = this.commandWindowStyle();
            if (['top', 'thinTop', 'mobile'].includes(style)) return this[key + 'WindowRectTopStyle']();
            if (['bottom', 'thinBottom'].includes(style)) return this[key + 'WindowRectBottomStyle']();
            return settings[name].WindowRect.call(this);
        };
        for (const placement of ['Top', 'Bottom']) {
            Scene_Menu.prototype[key + 'WindowRect' + placement + 'Style'] = function() {
                const width = key === 'playtime' ? this.mainCommandWidth() : Graphics.boxWidth - this._goldWindow.width - (this._playtimeWindow?.width || 0);
                const height = this.calcWindowHeight(1, false);
                const x = key === 'playtime' ? 0 : this._goldWindow.x - width;
                return new Rectangle(x, placement === 'Top' ? this.mainAreaBottom() - height : this.mainAreaTop(), width, height);
            };
        }
    }
    Scene_Menu.prototype.needsDummyWindow = function() { return !['default', 'mobile'].includes(this.commandWindowStyle()) && !this._variableWindow; };
    Scene_Menu.prototype.createDummyWindow = function() {
        if (!this.needsDummyWindow()) return;
        this._dummyWindow = new Window_Base(this.variableWindowRect());
        this._dummyWindow.setBackgroundType(settings.Variable.BgType);
        this.addWindow(this._dummyWindow);
    };
    const create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        create.call(this);
        this.createPlaytimeWindow();
        this.createVariableWindow();
        this.createDummyWindow();
    };
}

function installMainMenuCursor(settings) {
    const api = VisuMZ.MainMenuCore;
    api.IsCustomCursorEnabled = function() { return !Utils.isMobileDevice() && settings.MouseCursor.Enable && !!settings.MouseCursor.idleFilenameIcon; };
    api.SetupCustomCursor = function() {
        const options = settings.MouseCursor;
        const idle = 'icon/' + options.idleFilenameIcon;
        const pressed = 'icon/' + (options.clickFilenameIcon || options.idleFilenameIcon);
        const image = new Image();
        image.onload = function() {
            const cursor = document.createElement('div');
            Object.assign(cursor.style, {position: 'absolute', width: image.width + 'px', height: image.height + 'px',
                backgroundImage: 'url(' + idle + ')', pointerEvents: 'none', zIndex: '1000', display: 'none'});
            document.body.appendChild(cursor);
            document.body.style.cursor = 'none';
            document.body.style.overflow = 'hidden';
            function position(x, y) {
                cursor.style.left = (x - Math.round(options.anchorX * image.width)) + 'px';
                cursor.style.top = (y - Math.round(options.anchorY * image.height)) + 'px';
            }
            document.addEventListener('mousemove', event => {
                cursor.style.display = '';
                let x = event.pageX, y = event.pageY;
                if (x <= 0 && y <= 0) { x += Graphics.width * 10; y += Graphics.height * 10; }
                position(x, y);
            });
            document.addEventListener('touchmove', event => position(event.touches[0].pageX, event.touches[0].pageY));
            document.addEventListener('mousedown', () => { cursor.style.backgroundImage = 'url(' + pressed + ')'; });
            document.addEventListener('mouseup', () => { cursor.style.backgroundImage = 'url(' + idle + ')'; });
        };
        image.onerror = function() { console.error('Custom cursor image failed to load.'); };
        image.src = idle;
    };
    const loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        loadSystemImages.call(this);
        if (api.IsCustomCursorEnabled()) api.SetupCustomCursor();
    };
}

function installMainMenuPartyCompatibility() {
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_2_PartySystem) {
            for (const WindowClass of [Window_PartyActive, Window_PartyReserve]) {
                const drawItemImage = WindowClass.prototype.drawItemImage;
                WindowClass.prototype.drawItemImage = function(index) {
                    if (WindowClass._actorGraphic.toLowerCase().trim() === 'svbattler') this.drawItemImageSvActor(index);
                    else drawItemImage.call(this, index);
                };
            }
        }
        start.call(this);
    };
}

function installMainMenuVictoryCompatibility() {
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_3_VictoryAftermath) {
            const onLevelUp = Scene_Battle.prototype.onVictoryStepLevelUpMember;
            Scene_Battle.prototype.onVictoryStepLevelUpMember = function(actor) {
                if (Window_VictoryLevelUp._showBust) ImageManager.loadPicture(actor.getMenuImage());
                return onLevelUp.call(this, actor);
            };
            const setActor = Window_VictoryLevelUp.prototype.setActor;
            Window_VictoryLevelUp.prototype.setActor = function(actor) {
                if (Window_VictoryLevelUp._showBust) this._actorSprite.bitmap = ImageManager.loadPicture(actor.getMenuImage());
                return setActor.call(this, actor);
            };
        }
        start.call(this);
    };
}

function installMainMenuBattleCompatibility() {
    if (!globalThis.Imported?.VisuMZ_1_BattleCore || globalThis.Imported.Coreto_1_BattleCore) return;
    const filename = Game_Actor.prototype.getBattlePortraitFilename;
    Game_Actor.prototype.getBattlePortraitFilename = function() {
        return filename.call(this) || this.getMenuImage();
    };
    const showPortraits = Window_BattleStatus.prototype.showPortraits;
    Window_BattleStatus.prototype.showPortraits = function(actor) {
        return showPortraits.call(this, actor) ||
            (VisuMZ.BattleCore.Settings.BattleLayout.ShowPortraits && !!actor.getMenuImage());
    };
}

function installMainMenuClassCompatibility() {
    const baseImage = Game_Actor.prototype.getMenuImage;
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_2_ClassChangeSystem) {
            const consumerImage = Game_Actor.prototype.getMenuImage;
            Game_Actor.prototype.getMenuImage = function() {
                const image = consumerImage.call(this);
                if (this._priorityMenuImage !== undefined || image) return image;
                return ImageManager.getActorClassMenuPortrait(this) || baseImage.call(this);
            };
            Window_ClassStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
                switch (this.graphicType()) {
                    case 'none': return;
                    case 'sprite': return this.prepareDrawActorSprite(actor, x, y, width, height);
                    case 'svbattler': return this.prepareDrawActorSvBattler(actor, x, y, width, height);
                    default: return this.prepareDrawActorFace(actor, x, y, width, height);
                }
            };
            Window_ClassStatus.prototype.isMainMenuCoreMenuImageOptionAvailable = function() {
                return this._actor.getMenuImage() !== '' && VisuMZ.ClassChangeSystem.Settings.Window.MenuPortraits;
            };
        }
        start.call(this);
    };
}

function installMainMenuItemsCompatibility() {
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_1_ItemsEquipsCore) {
            Window_EquipStatus.prototype.isMainMenuCoreMenuImageOptionAvailable = function() {
                return this._actor.getMenuImage() !== '' && VisuMZ.ItemsEquipsCore.Settings.EquipScene.MenuPortraits;
            };
        }
        start.call(this);
    };
}

function compileMainMenuSetting(field, value) {
    if ((field.javascript?.kind || field.javascript) === 'body') return new Function(value);
    if (field.type === 'array') return value.map(item => compileMainMenuSetting(field.items, item));
    if (field.type === 'struct') {
        for (const child of field.fields) value[child.key] = compileMainMenuSetting(child, value[child.key]);
    }
    return value;
}

function installMainMenuCore() {
    if (globalThis.Imported?.VisuMZ_1_MainMenuCore) throw new CoreError('MM_DUPLICATE_PROVIDER', 'The original MainMenu already executed. Enable only one provider.');
    const api = installComplement(catalog, 'MainMenuCore', 'MM');
    for (const plugin of $plugins.filter(plugin => plugin.status && Object.prototype.hasOwnProperty.call(catalog.dependencies.consumers, plugin.name))) {
        const version = catalog.dependencies.consumers[plugin.name];
        if (!plugin.description.includes('[Version ' + version + ']')) throw new CoreError('MM_CONSUMER_VERSION', 'Use ' + plugin.name + ' ' + version + '.');
    }
    for (const field of catalog.parameters.filter(field => field.key !== 'CoretoConfigSource')) {
        api.settings[field.key] = compileMainMenuSetting(field, api.settings[field.key]);
    }
    globalThis.VisuMZ ??= {};
    VisuMZ.MainMenuCore ??= {};
    VisuMZ.MainMenuCore.Settings = api.settings;
    installMainMenuForcedCommands();
    installMainMenuCommands(api.settings);
    installMainMenuActorGraphics(api.settings);
    installMainMenuBattleCompatibility();
    installMainMenuLayouts(api.settings);
    installMainMenuActorBackground(api.settings);
    installMainMenuImageCommands();
    installMainMenuAuxiliary(api.settings);
    installMainMenuCursor(api.settings);
    installMainMenuPartyCompatibility();
    installMainMenuVictoryCompatibility();
    installMainMenuClassCompatibility();
    installMainMenuItemsCompatibility();
    globalThis.Imported ??= {};
    Imported.Coreto_1_MainMenuCore = true;
    api.capabilities = ['configuration', 'menu-command-list', 'menu-command-categories', 'forced-command-settings', 'actor-selection', 'actor-layouts', 'actor-portraits', 'image-commands', 'actor-menu-backgrounds', 'auxiliary-windows', 'custom-cursor'];
    return api;
}
installMainMenuCore();

})();
