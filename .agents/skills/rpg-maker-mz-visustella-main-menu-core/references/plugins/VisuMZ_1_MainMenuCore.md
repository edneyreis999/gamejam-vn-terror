# VisuMZ_1_MainMenuCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_MainMenuCore`
- Contract: [RPG Maker MZ] [Tier 1] [MainMenuCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| MainMenuCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| General:struct | General Settings | — | struct&lt;General&gt; | {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"\[\"Scene_Skill\"\]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"} | — | General settings pertaining to the Main Menu and related. |
| CommandList:arraystruct | Command Window List | General:struct | struct&lt;Command&gt;\[\] | \["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &amp;&amp;\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &amp;&amp;\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &amp;&amp;\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments\[1\]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &amp;&amp;\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"bestiary\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"10\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BestiaryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_Bestiary &amp;&amp;\\\\n    this.isBestiaryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBestiaryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBestiary();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &amp;&amp;\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &amp;&amp;\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &amp;&amp;\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"cgGallery\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"311\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.cgGalleryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CGGallery &amp;&amp;\\\\n    this.isCgGalleryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCgGalleryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCgGallery();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"creditsPage\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.CreditsPageMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CreditsPage &amp;&amp;\\\\n    this.isCreditsPageCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCreditsPageCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCreditsPage();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"patchNotes\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.PatchNotesMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_PatchNotes &amp;&amp;\\\\n    this.isPatchNotesCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isPatchNotesCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPatchNotes();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"battleGridTactics\",\"Subcategory:str\":\"\",\"Icon:num\":\"76\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BattleGridTacticsMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_BattleGridSystem &amp;&amp;\\\\n    this.isBattleGridTacticsCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBattleGridTacticsCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBattleGridTactics();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments\[0\];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments\[0\];\\\"\"}"\] | — | Window commands used by the Main Menu. Add new commands here. |
| Playtime:struct | Playtime Window | — | struct&lt;Playtime&gt; | {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""} | — | Settings for the Playtime Window. |
| Variable:struct | Variable Window | — | struct&lt;Variable&gt; | {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"\[\"1\",\"2\"\]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""} | — | Settings for the Variable Window. |
| ParamBreak1 | -------------------------- | — | — | ---------------------------------- | — | — |
| CommandWindowStyle:str | Command Window Style | — | select | top | Default Vertical Side Style=default; Top Horizontal Style=top; Thin Top Horizontal Style=thinTop; Bottom Horizontal Style=bottom; Thin Bottom Horizontal Style=thinBottom; Mobile Full Screen Style=mobile | Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows. |
| CustomCmdWin:struct | Command Style Settings | CommandWindowStyle:str | struct&lt;CustomCmdWin&gt; | {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"} | — | Settings for the non-default Command Window Styles. |
| ParamBreak2 | -------------------------- | — | — | ---------------------------------- | — | — |
| StatusGraphic:str | Status Graphic | — | select | face | None=none; Face=face; Map Sprite=sprite; Sideview Battler=svbattler | Choose how the actor graphics appear in status-like menus. |
| StatusListStyle:str | Main Menu List Style | — | select | portrait | Default Horizontal Style=default; Vertical Style=vertical; Portrait Style=portrait; Solo Style=solo; Thin Horizontal Style=thin; Thicker Horizontal Style=thicker | Choose how the actor status list looks in the Main Menu. |
| InnerMenuListStyle:str | Inner-Menu List Style | StatusListStyle:str | select | default | Default Horizontal Style=default; Vertical Style=vertical; Portrait Style=portrait; Solo Style=solo; Thin Horizontal Style=thin; Thicker Horizontal Style=thicker | Choose how the actor status list looks in the inner menus like Scene_Item, Scene_Skill, etc. |
| ListStyles:struct | List Style Settings | StatusListStyle:str | struct&lt;ListStyles&gt; | {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments\[0\];\\nconst rect = arguments\[1\];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) &lt;= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp &amp;&amp; roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; sw &gt;= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments\[0\];\\nconst rect = arguments\[1\];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments\[0\];\\nconst rect = arguments\[1\];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments\[0\];\\nconst rect = arguments\[1\];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; cw &gt;= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; cw &gt;= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight &gt; rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments\[0\];\\nconst rect = arguments\[1\];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) &gt; rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) &gt; rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments\[0\];\\nconst rect = arguments\[1\];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; sw &gt;= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""} | — | JavaScript code used to determine how the individual styles are drawn. |
| ParamBreak3 | -------------------------- | — | — | ---------------------------------- | — | — |
| MouseCursor:struct | Custom Mouse Cursor | — | struct&lt;MouseCursor&gt; | {"General":"","Enable:eval":"true","Graphics":"","idleFilenameIcon:str":"","clickFilenameIcon:str":"","Anchor":"","anchorX:num":"0.0","anchorY:num":"0.0"} | — | Add/enable a custom mouse cursor for your game. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Command

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Symbol:str | Symbol | — | — | Symbol | — | The symbol used for this command. |
| Subcategory:str | Subcategory | — | — | — | — | The subcategory used for this command. Leave empty for no subcategory. |
| Icon:num | Icon | — | — | 0 | — | Icon used for this command. Use 0 for no icon. |
| TextStr:str | STR: Text | — | — | Untitled | — | Displayed text used for this menu command. If this has a value, ignore the JS: Text version. |
| TextJS:func | JS: Text | — | note | "return 'Text';" | — | JavaScript code used to determine string used for the displayed name. |
| ShowJS:func | JS: Show | — | note | "return true;" | — | JavaScript code used to determine if the item is shown or not. |
| EnableJS:func | JS: Enable | — | note | "return true;" | — | JavaScript code used to determine if the item is enabled or not. |
| ExtJS:func | JS: Ext | — | note | "return null;" | — | JavaScript code used to determine any ext data that should be added. |
| CallHandlerJS:func | JS: Run Code | — | note | "const ext = arguments\[0\];" | — | JavaScript code that runs once this command is selected. |
| PersonalHandlerJS:func | JS: Personal Code | — | note | "const ext = arguments\[0\];" | — | JavaScript code that runs once the actor list is selected with this command highlighted. |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| GoldWindow | Gold Window | — | — | — | — | — |
| ThinGoldWindow:eval | Thinner Gold Window | GoldWindow | boolean | true | — | Make the Gold Window thinner in the Main Menu? Used to match the Playtime and Variable Windows. |
| AutoGoldHeight:eval | Auto Adjust Height | GoldWindow | boolean | true | — | Automatically adjust the height for the thinner Gold Window? |
| AutoGoldY:eval | Auto Adjust Y | GoldWindow | boolean | true | — | Automatically adjust the Y position for the thinner Gold Window? |
| StatusWindow | Status Window | — | — | — | — | — |
| StatusSelectLast:eval | Select Last? | StatusWindow | boolean | false | — | When picking a personal command from the Command Window, select the last picked actor or always the first? |
| SoloParty | Solo Party | — | — | — | — | — |
| SoloQuick:eval | Solo Quick Mode | SoloParty | boolean | true | — | When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene. |
| SubMenus | Sub Menus | — | — | — | — | — |
| ActorBgMenus:arraystr | Menus with Actor BG's | SubMenus | string\[\] | \["Scene_Skill","Scene_Equip","Scene_Status"\] | — | A list of the menus that would be compatible with Actor Menu Backgrounds. |
| ActorBgMenuJS:func | JS: Actor BG Action | SubMenus | note | "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;" | — | Code used to determine how to display the sprites upon loading. |
| PartyWindow | Party Window | — | — | — | — | — |
| ShowReserve:eval | Show Reserve Memebers | PartyWindow | boolean | true | — | Show reserve members while on the Main Menu scene? |
| HideMainMenuOnly:eval | Hide Main Menu Only | ShowReserve:eval | boolean | true | — | If reserve members are hidden, hide them only in the main menu or all scenes? |

### Struct: Playtime

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Use Window | — | boolean | true | — | Use the Playtime Window? |
| AdjustCommandHeight:eval | Adjust Command Window | — | boolean | true | — | Adjust the command window's height to fit in the Playtime Window? |
| BgType:num | Background Type | — | select | 0 | Window=0; Dim=1; Transparent=2 | Select background type for the Playtime window. |
| FontSize:num | Font Size | — | number | 20 | — | Font size used for displaying Gold inside the Playtime window. Default: 26 |
| Icon:num | Time Icon | — | — | 75 | — | Icon displayed for the 'Time' label. |
| Time:str | Time Text | — | — | Time | — | Text for the display of 'Time' in the Playtime window. |
| WindowRect:func | JS: X, Y, W, H | — | note | "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for the Playtime window. |

### Struct: Variable

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Use Window | — | boolean | false | — | Use the Variable Window? |
| AdjustCommandHeight:eval | Adjust Command Window | — | boolean | true | — | Adjust the command window's height to fit in the Variable Window? |
| BgType:num | Background Type | — | select | 0 | Window=0; Dim=1; Transparent=2 | Select background type for the Variable window. |
| FontSize:num | Font Size | — | number | 20 | — | Font size used for displaying Gold inside the Variable window. Default: 26 |
| VarList:arraynum | Variable List | — | variable\[\] | \["1","2","3"\] | — | Select variables to be displayed into the window. Use \i\[x\] to determine their icon. |
| WindowRect:func | JS: X, Y, W, H | — | note | "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for the Variable window. |

### Struct: CustomCmdWin

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Style:str | Command Style | MainList | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw command entries in the Command Window? |
| TextAlign:str | Text Alignment | — | combo | center | left; center; right | Decide how you want the text to be aligned. |
| Rows:num | Rows | — | number | 2 | — | Number of visible rows. |
| Cols:num | Columns | — | number | 4 | — | Number of maximum columns. |
| MobileThickness:num | Mobile Thickness | — | number | 5 | — | The thickness of the buttons for mobile version. |

### Struct: ListStyles

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DefaultStyle:func | JS: Default | — | note | "// Declare Constants\nconst actor = arguments\[0\];\nconst rect = arguments\[1\];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) &lt;= rect.y + rect.height;\nif ($dataSystem.optDisplayTp &amp;&amp; roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; sw &gt;= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}" | — | Code used to draw the data for this particular style. |
| VerticalStyle:func | JS: Vertical | — | note | "// Declare Constants\nconst actor = arguments\[0\];\nconst rect = arguments\[1\];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}" | — | Code used to draw the data for this particular style. |
| PortraitStyle:func | JS: Portrait | — | note | "// Declare Constants\nconst actor = arguments\[0\];\nconst rect = arguments\[1\];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}" | — | Code used to draw the data for this particular style. |
| SoloStyle:func | JS: Solo | — | note | "// Declare Constants\nconst actor = arguments\[0\];\nconst rect = arguments\[1\];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; cw &gt;= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; cw &gt;= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight &gt; rect.y + rect.height) return;\n    }\n}" | — | Code used to draw the data for this particular style. |
| ThinStyle:func | JS: Thin | — | note | "// Declare Constants\nconst actor = arguments\[0\];\nconst rect = arguments\[1\];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) &gt; rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) &gt; rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);" | — | Code used to draw the data for this particular style. |
| ThickerStyle:func | JS: Thicker | — | note | "// Declare Constants\nconst actor = arguments\[0\];\nconst rect = arguments\[1\];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine &amp;&amp; sw &gt;= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}" | — | Code used to draw the data for this particular style. |

### Struct: MouseCursor

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | General Settings | — | — | — | — | — |
| Enable:eval | Enable? | General | boolean | true | — | Enable custom cursor? Requires a custom 'Idle' graphic. |
| Graphics | Graphic Settings | — | — | — | — | — |
| idleFilenameIcon:str | Idle Filename | Graphics | — | — | — | Located in game project's /icon/ folder. Include .png extension (ie. Cursor1.png) |
| clickFilenameIcon:str | Click Filename | Graphics | — | — | — | Optional. Located in game project's /icon/ folder. Include .png extension (ie. Cursor2.png) |
| Anchor | Anchor Settings | — | — | — | — | — |
| anchorX:num | Anchor X | Anchor | — | 0.0 | — | Anchor X value for the custom cursor. 0.0 - left; 0.5 - center; 1.0 - right |
| anchorY:num | Anchor Y | Anchor | — | 0.0 | — | Anchor Y value for the custom cursor. 0.0 - top; 0.5 - middle; 1.0 - bottom |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Actor: Change Menu Image (Group)

- Command ID: `ChangeActorMenuImageGroup`
- Description: Changes the actor's Menu Image. Select from a group of actor ID's to change.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) to affect. |
| Step2:str | Filename | file | — | — | Selected actor(s) will have their menu images changed to this. @ -------------------------------------------------------------------------- |

### Actor: Change Menu Image (Range)

- Command ID: `ChangeActorMenuImageRange`
- Description: Changes the actor's Menu Image. Select from a range of actor ID's to change.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1 | Actor ID Range | — | — | — | — |
| Step1Start:num | Range Start | actor | 1 | — | Select which Actor ID to start from. |
| Step1End:num | Range End | actor | 4 | — | Select which Actor ID to end at. |
| Step2:str | Filename | file | — | — | Selected actor(s) will have their menu images changed to this. @ -------------------------------------------------------------------------- |

### Actor: Change Menu Image (JS) (Legacy)

- Command ID: `ChangeActorMenuImageJS`
- Description: Changes the actor's Menu Image. Select from a group of actor ID's using JavaScript.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1:arrayeval | Actor ID(s) | string\[\] | \["$gameVariables.value(1)"\] | — | Enter which Actor ID(s) to affect. You may use JavaScript code. |
| Step2:str | Filename | file | — | — | Selected actor(s) will have their menu images changed to this. @ -------------------------------------------------------------------------- |

### Actor: Change Menu Image (JS)

- Command ID: `ChangeActorMenuImageJS_v124`
- Description: Changes an actor's Menu Image using JavaScript. Allows more control with more text entry.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActorJS:func | JS: Actor ID | note | "// Get Actor ID here.\nlet actorID = 0;\nactorID = $gameParty.members()\[0\].actorId();\n\n// Return Actor ID\nreturn actorID;" | — | Enter which Actor ID to affect. Uses JavaScript code. |
| FilenameJS:func | JS: Filename | note | "// Get Filename here.\nlet filename = 'Actor1_';\nfilename += String(Math.randomInt(8) + 1);\n\n// Return Filename\nreturn filename;" | — | Enter the filename you wish to use. Uses JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_MenuCommand`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Menu Command: Clear Forced Settings

- Command ID: `MenuCommandClear`
- Description: Clear any forced settings for the menu command symbols.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Symbols:arraystr | Symbol(s) | string\[\] | \[\] | — | Insert the symbols of the menu commands here. The symbols are case sensitive. @ -------------------------------------------------------------------------- |

### Menu Command: Force Disable

- Command ID: `MenuCommandForceDisable`
- Description: Forcefully disable specific menu commands via their symbols. Matching forced enabled symbols will be overwritten.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Symbols:arraystr | Symbol(s) | string\[\] | \[\] | — | Insert the symbols of the menu commands here. The symbols are case sensitive. @ -------------------------------------------------------------------------- |

### Menu Command: Force Enable

- Command ID: `MenuCommandForceEnable`
- Description: Forcefully enable specific menu commands via their symbols. Matching forced disabled symbols will be overwritten.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Symbols:arraystr | Symbol(s) | string\[\] | \[\] | — | Insert the symbols of the menu commands here. The symbols are case sensitive. @ -------------------------------------------------------------------------- |

### Menu Command: Force Hide

- Command ID: `MenuCommandForceHide`
- Description: Forcefully hide specific menu commands via their symbols. Matching forced shown symbols will be overwritten.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Symbols:arraystr | Symbol(s) | string\[\] | \[\] | — | Insert the symbols of the menu commands here. The symbols are case sensitive. @ -------------------------------------------------------------------------- |

### Menu Command: Force Show

- Command ID: `MenuCommandForceShow`
- Description: Forcefully show specific menu commands via their symbols. Matching forced hidden symbols will be overwritten.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Symbols:arraystr | Symbol(s) | string\[\] | \[\] | — | Insert the symbols of the menu commands here. The symbols are case sensitive. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Main Menu Core plugin is designed to give you more control over the Main
Menu outside of RPG Maker MZ's editor's control. Game devs are given control
over how commands work, visual aesthetics pertaining to the Main Menu, and
assign menu images to actors as background portraits.

Features include all (but not limited to) the following:

* Control over general Main Menu settings.
* The ability to set Menu Background Portraits for individual actors.
* Flexibility in changing which commands appear in the Main Menu.
* Add new windows like the Playtime Window and Variable windows.
* Change the style of how the windows are arranged in the Main Menu.
* Change the way the status list is displayed and the way it's displayed.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

<Menu Portrait: filename>

- Used for: Actor
- This is used with the "Portrait" style Main Menu List.
- Sets the menu image for the actor to 'filename'.
- Replace 'filename' with a picture found within your game project's
img/pictures/ folder. Filenames are case sensitive. Leave out the filename
extension from the notetag.

---

<Menu Portrait Offset: +x, +y>
<Menu Portrait Offset: -x, -y>

<Menu Portrait Offset X: +x>
<Menu Portrait Offset X: -x>

<Menu Portrait Offset Y: +y>
<Menu Portrait Offset Y: -y>

- Used for: Actor
- This is used with the "Portrait" style Main Menu List.
- Offsets the X and Y coordinates for the menu image.
- Replace 'x' with a number value that offsets the x coordinate.
- Negative x values offset left. Positive x values offset right.
- Replace 'y' with a number value that offsets the y coordinate.
- Negative y values offset up. Positive x values offset down.
- This only applies to the Main Menu portraits.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Actor Plugin Commands ===

---

Actor: Change Menu Image (Group)
Actor: Change Menu Image (Range)
Actor: Change Menu Image (JS)
- Changes the actor's Menu Image.
- Each version has a different means of selecting Actor ID's.

Actor ID:
- Select which ID(s) to affect.

Filename:
- Selected actor(s) will have their menu images changed to this.

---

- Changes an actor's Menu Image using JavaScript.
- Allows more control with more text entry.

JS: Actor ID:
- Enter which Actor ID to affect.
- Uses JavaScript code.

JS: Filename:
- Enter the filename you wish to use.
- Uses JavaScript code.

---

=== Menu Command Plugin Commands ===

---

Menu Command: Clear Forced Settings
- Clear any forced settings for the menu command symbols.

Symbol(s):
- Insert the symbols of the menu commands here.
- The symbols are case sensitive.
- VisuStella is NOT responsible for any errors produced by menus that
become accessible outside of their intended usage.

---

Menu Command: Force Disable
- Forcefully disable specific menu commands via their symbols.
- Matching forced enabled symbols will be overwritten.

Symbol(s):
- Insert the symbols of the menu commands here.
- The symbols are case sensitive.
- VisuStella is NOT responsible for any errors produced by menus that
become accessible outside of their intended usage.

---

Menu Command: Force Enable
- Forcefully enable specific menu commands via their symbols.
- Matching forced disabled symbols will be overwritten.

Symbol(s):
- Insert the symbols of the menu commands here.
- The symbols are case sensitive.
- VisuStella is NOT responsible for any errors produced by menus that
become accessible outside of their intended usage.

---

Menu Command: Force Hide
- Forcefully hide specific menu commands via their symbols.
- Matching forced shown symbols will be overwritten.

Symbol(s):
- Insert the symbols of the menu commands here.
- The symbols are case sensitive.
- VisuStella is NOT responsible for any errors produced by menus that
become accessible outside of their intended usage.

---

Menu Command: Force Show
- Forcefully show specific menu commands via their symbols.
- Matching forced hidden symbols will be overwritten.

Symbol(s):
- Insert the symbols of the menu commands here.
- The symbols are case sensitive.
- VisuStella is NOT responsible for any errors produced by menus that
become accessible outside of their intended usage.

---

Plugin Parameters: General Settings

These general settings contain various settings on how the Main Menu scene
displays certain windows, alters how specific windows behave, and determines
which scenes would display actor menu images as background portraits.

---

Gold Window

Thinner Gold Window:
- Make the Gold Window thinner in the Main Menu?
- Used to match the Playtime and Variable Windows.
- Only applies to the Command Window style: Default Vertical.

Auto Adjust Height:
- Automatically adjust the height for the thinner Gold Window?

Auto Adjust Y:
- Automatically adjust the Y position for the thinner Gold Window?

---

Status Window

Select Last?:
- When picking a personal command from the Command Window, select the
last picked actor or always the first?

---

Solo Party

Solo Quick Mode:
- When selecting "Skills", "Equip", or "Status" with one party member,
immediately go to the scene.

---

Sub Menus

Menus with Actor BG's:
- A list of the menus that would be compatible with Actor Menu Backgrounds

JS: Actor BG Action:
- Code used to determine how to display the sprites upon loading.

---

Party Window

Show Reserve Memebers:
- Show reserve members while on the Main Menu scene?

Hide Main Menu Only
- If reserve members are hidden, hide them only in the main menu or
all scenes?

---

Plugin Parameters: Command Window List

The Command Window functions as a hub to the various scenes linked from the
Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
so on. This Plugin Parameter is an array that lets you add, remove, and/or
alter the Command Window's various commands, how they're handled, whether or
not they're visible, and how they react when selected.

These will require knowledge of JavaScript to use them properly.

---

Command Window List

Symbol:
- The symbol used for this command.

Subcategory:
- The subcategory used for this command.
- Leave empty for no subcategory.

Icon:
- Icon used for this command.
- Use 0 for no icon.

STR: Text:
- Displayed text used for this title command.
- If this has a value, ignore the JS: Text version.

JS: Text:
- JavaScript code used to determine string used for the displayed name.

JS: Show:
- JavaScript code used to determine if the item is shown or not.

JS: Enable:
- JavaScript code used to determine if the item is enabled or not.

JS: Ext:
- JavaScript code used to determine any ext data that should be added.

JS: Run Code:
- JavaScript code that runs once this command is selected.

JS: Personal Code:
- JavaScript code that runs once the actor list is selected with this
command highlighted.

---

==== Subcategories ====

subcategory is set, it will only display Command Window items that belong
to that subcategory. Those Command Window items do not appear when there is
no subcategory active or if it's a different subcategory.

---

To create a subcategory, a few things must be done:

1. The subcategory symbol must be "subcategory".

2. The string returned by JS: Ext determines the subcategory. In the default
Plugin Parameters, 'datalog' is returned as the subcategory. This becomes
the subcategory when picked.

3. For the JS: Run Code, have the following code somewhere in it:

const ext = arguments[0];
this.setSubcategory(ext);

---

To make a Command Window item be a part of a subcategory do the following:

1. Take the JS: Ext string value (case sensitive).

2. Set it as the target Command Window item's "Subcategory" value.

3. If the subcategory doesn't exist, then this Command Window item will
appear normally.

---

Plugin Parameters: Playtime Window

The Playtime Window is an optional feature that can be displayed in the
Main Menu. As its name suggests, it displays the playtime of the player's
current play through.

---

Playtime Window

Enable:
- Use the Playtime Window?

Adjust Command Window:
- Adjust the command window's height to fit in the Playtime Window?

Background Type:
- Select background type for the Playtime window.

Font Size:
- Font size used for displaying Gold inside the Playtime window.

Time Icon:
- Icon displayed for the 'Time' label.

Time Text:
- Text for the display of 'Time' in the Playtime window.

JS: X, Y, W, H:
- Code used to determine the dimensions for the Playtime window.

---

Plugin Parameters: Variable Window

The Variable Window is an optional feature that can be displayed in the
Main Menu. If enabled, the Variable Window will display variables of the
game dev's choice in the Main Menu itself.

---

Variable Window

Enable:
- Use the Variable Window?

Adjust Command Window:
- Adjust the command window's height to fit in the Variable Window?

Background Type:
- Select background type for the Variable window.

Font Size:
- Font size used for displaying Gold inside the Variable window.

Variable List:
- Select variables to be displayed into the window.
Use \i[x] to determine their icon.

JS: X, Y, W, H:
- Code used to determine the dimensions for the Variable window.

---

Plugin Parameters: Command Window Style & Command Style Settings

This determines how the Main Menu appears based on the Command Window Style.
If anything but the 'Default' is used, then these settings will take over
the window placement settings for the Main Menu. This means that even if you
are using VisuStella's Core Engine, the window layouts will be overwritten.

---

Command Window Style:
- Choose the positioning and style of the Main Menu Command Window.
- This will automatically rearrange windows.

Default Vertical Side Style:
- The default Main Menu layout style.
- Affected by VisuStella's Core Engine's Plugin Parameter settings.

Top Horizontal Style:
- Puts the Command Window at the top of the screen.
- Gold, Playlist, and Variable Windows are moved to the bottom.
- The Actor List Window is placed in the middle.
- Unaffected by VisuStella's Core Engine's Plugin Parameter settings.

Bottom Horizontal Style:
- Puts the Command Window at the bottom of the screen.
- Gold, Playlist, and Variable Windows are moved to the top.
- The Actor List Window is placed in the middle.
- Unaffected by VisuStella's Core Engine's Plugin Parameter settings.

Mobile Full Screen Style:
- Puts the Command Window at the center of the screen with larger buttons.
- Gold, Playlist, and Variable Windows are moved to the bottom.
- The Actor List Window is hidden until prompted to be selected.
- Unaffected by VisuStella's Core Engine's Plugin Parameter settings.

---

Command Style Settings

Style:
- How do you wish to draw command entries in the Command Window?
- Text Only: displays only text.
- Icon Only: displays only the icon.
- Icon + Text: displays icon first, then text.
- Automatic: determines the best fit for the size

Text Alignment:
- Decide how you want the text to be aligned.
- Left, Center, or Right

Rows:
- Number of visible rows.
- Applies only to Top, Bottom, and Mobile styles.

Columns:
- Number of maximum columns.
- Applies only to Top, Bottom, and Mobile styles.

Mobile Thickness:
- The thickness of the buttons for mobile version.
- Applies only to Top, Bottom, and Mobile styles.

---

Plugin Parameters: Status Graphic, Status List Style, & List Style Settings

Choose how the contents Actor Status List Window in the Main Menu appears.
This can range from the which actor graphic is drawn to the style used for
the data that's displayed.

---

Status Graphic:
- Choose how the graphic for actor graphics appear in status-like menus.

None:
- Don't display any graphic for the actors.

Face:
- Display the actors' faces. This is the default option in RPG Maker MZ.

Map Sprite:
- Display the actors' map sprites.

Sideview Battler:
- Display the actors' sideview battlers.

---

Main Menu List Style
- Choose how the actor status list looks in the Main Menu.

Inner-Menu List Style
- Choose how the actor status list looks in the inner menus like Scene_Item,
Scene_Skill, etc.

Default Horizontal Style:
- This is the default style found in RPG Maker MZ's Main Menu.

Vertical Style:
- Makes the display for the actor list vertical instead of horizontal.

Portrait Style:
- Similar to the vertical style, except each actor's Menu Image is
displayed in the background instead. Portraits are required.
- If there is no Menu Image used, this will switch over to the Vertical
Style and use a face graphic instead.

Solo Style:
- Used for solo party member games. Extends the whole view of the Status
Window to accomodate a single actor.

Thin Horizontal Style:
- Makes the selectable menu entries for the actors a single line thin.

Thicker Horizontal Style:
- Makes the selectable menu entries for the actors two lines thick.

---

List Styles
JavaScript code used to determine how the individual styles are drawn.

JS: Default:
JS: Vertical:
JS: Portrait:
JS: Solo:
JS: Thin:
JS: Thicker:
- Code used to draw the data for these styles.

---

Plugin Parameters: Custom Mouse Cursor Settings

Add/enable a custom mouse cursor for your game. This will use a graphic
found in the game project's /icon/ folder to use as the custom mouse
cursor when hovering over the game.

Does not work on mobile devices.

---

General Settings

Enable?:
- Enable custom cursor?
- Requires a custom 'Idle' graphic.

---

Graphic Settings

Idle Filename:
- Graphic used for mouse cursor when idle or moving.
- Required for a custom mouse cursor.
- Located in game project's /icon/ folder.
- Include .png extension (ie. Cursor1.png)

Click Filename:
- Optional.
- Graphic used for mouse cursor when clicked or held.
- Uses the 'Idle' graphic if 'Click' graphic is not used.
- Located in game project's /icon/ folder.
- Include .png extension (ie. Cursor2.png)

---

Anchor Settings

Anchor X:
- Anchor X value for the custom cursor.
- 0.0 - left; 0.5 - center; 1.0 - right

Anchor Y:
- Anchor Y value for the custom cursor.
- 0.0 - top; 0.5 - middle; 1.0 - bottom

---
```
