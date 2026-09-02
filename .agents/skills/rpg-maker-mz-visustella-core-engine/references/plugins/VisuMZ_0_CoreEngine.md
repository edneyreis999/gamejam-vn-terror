# VisuMZ_0_CoreEngine

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_0_CoreEngine`
- Contract: [RPG Maker MZ] [Tier 0] [CoreEngine]
- Required plugins: None declared
- Declared load order: No explicit relation declared
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| CoreEngine | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| QoL:struct | Quality of Life Settings | — | struct&lt;QoLSettings&gt; | {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"} | — | Quality of Life settings for both developers and players. |
| BattleSystem:str | Battle System | — | select | database | Database Default (Use game database setting)=database; -=database; DTB: Default Turn Battle=dtb; TPB Active: Time Progress Battle (Active)=tpb active; TPB wait: Time Progress Battle (Wait)=tpb wait; -=database; BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)=btb; CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)=ctb; ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)=etb; FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)=ftb; OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)=otb; PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)=ptb; STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)=stb | Choose which battle system to use for your game. Some battle systems REQUIRE their specific plugins! |
| Color:struct | Color Settings | — | struct&lt;Color&gt; | {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments\[0\];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments\[0\];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() &lt; 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments\[0\];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() &lt; 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments\[0\];\\n\\n// If a positive change, use power up color.\\nif (change &gt; 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change &lt; 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments\[0\];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""} | — | Change the colors used for in-game text. |
| Gold:struct | Gold Settings | — | struct&lt;Gold&gt; | {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"} | — | Change up how gold operates and is displayed in-game. |
| ImgLoad:struct | Image Loading | — | struct&lt;ImgLoad&gt; | {"animations:arraystr":"\[\]","battlebacks1:arraystr":"\[\]","battlebacks2:arraystr":"\[\]","characters:arraystr":"\[\]","enemies:arraystr":"\[\]","faces:arraystr":"\[\]","parallaxes:arraystr":"\[\]","pictures:arraystr":"\[\]","sv_actors:arraystr":"\[\]","sv_enemies:arraystr":"\[\]","system:arraystr":"\[\"Balloon\",\"IconSet\"\]","tilesets:arraystr":"\[\]","titles1:arraystr":"\[\]","titles2:arraystr":"\[\]"} | — | Game images that will be loaded upon booting up the game. Use this responsibly!!! |
| KeyboardInput:struct | Keyboard Input | — | struct&lt;KeyboardInput&gt; | {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c\[5\]ENTER\\\\c\[0\] when you're done.\\n\\n-or-\\n\\nPress \\\\c\[5\]arrow keys\\\\c\[0\]/\\\\c\[5\]TAB\\\\c\[0\] to switch\\nto manual character entry.\\n\\nPress \\\\c\[5\]ESC\\\\c\[0\]/\\\\c\[5\]TAB\\\\c\[0\] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"} | — | Settings for the game that utilize keyboard input. |
| MenuBg:struct | Menu Background Settings | — | struct&lt;MenuBg&gt; | {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"} | — | Change how menu backgrounds look for each scene. |
| ButtonAssist:struct | Menu Button Assist Window | — | struct&lt;ButtonAssist&gt; | {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"&lt;&lt;","KeyRIGHT:str":"&gt;&gt;","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"} | — | Settings pertaining to the Button Assist window found in in-game menus. |
| ControllerButtons:arraystruct | Controller Button Assist | ButtonAssist:struct | struct&lt;ControllerButtons&gt;\[\] | \[\] | — | Make different icons appear for the Button Assist window when using different controllers. |
| MenuLayout:struct | Menu Layout Settings | — | struct&lt;MenuLayout&gt; | {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"\[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"\]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"} | — | Change how menu layouts look for each scene. |
| Param:struct | Parameter Settings | — | struct&lt;Param&gt; | {"DisplayedParams:arraystr":"\[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"\]","ExtDisplayedParams:arraystr":"\[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"\]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments\[0\];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments\[0\];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments\[0\];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"} | — | Change up the limits of parameters and how they're calculated. |
| CustomParam:arraystruct | Custom Parameters | Param:struct | struct&lt;CustomParam&gt;\[\] | \["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"\] | — | Create custom parameters for your game! These will appear in VisuStella MZ menus. |
| ScreenResolution:struct | Screen Resolution Settings | — | struct&lt;ScreenResolution&gt; | {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"} | — | Alter various properties to make the game look better for varying screen resolutions. |
| ScreenShake:struct | Screen Shake Settings | — | struct&lt;ScreenShake&gt; | {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""} | — | Get more screen shake effects into your game! |
| TitleCommandList:arraystruct | Title Command List | — | struct&lt;Command&gt;\[\] | \["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"\] | — | Window commands used by the title screen. Add new commands here. |
| TitlePicButtons:arraystruct | Title Picture Buttons | — | struct&lt;TitlePictureButton&gt;\[\] | \[\] | — | Buttons that can be inserted into the title screen. Add new title buttons here. |
| UI:struct | UI Settings | — | struct&lt;UI&gt; | {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"} | — | Change up various in-game UI aspects. |
| Window:struct | Window Settings | — | struct&lt;Window&gt; | {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments\[0\];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"} | — | Adjust various in-game window settings. |
| jsQuickFunc:arraystruct | JS: Quick Functions | — | struct&lt;jsQuickFunc&gt;\[\] | \["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments\[0\] \|\| 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments\[0\] \|\| 0, arguments\[1\] \|\| 0);\\\\nlet max = Math.max(arguments\[0\] \|\| 0, arguments\[1\] \|\| 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments\[Math.randomInt(arguments.length)\];\\\"\"}"\] | — | Create quick JavaScript functions available from the global namespace. Use with caution and moderation!!! |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: QoLSettings

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| PlayTest | Play Test | — | — | — | — | — |
| NewGameBoot:eval | New Game on Boot | PlayTest | boolean | false | — | Automatically start a new game on Play Test? Only enabled during Play Test. |
| ForceNoPlayTest:eval | No Play Test Mode | PlayTest | boolean | false | — | Force the game to be out of Play Test mode when play testing. |
| OpenConsole:eval | Open Console on Boot | PlayTest | boolean | true | — | Open the Debug Console upon booting up your game? Only enabled during Play Test. |
| F6key:eval | F6: Toggle Sound | PlayTest | boolean | true | — | F6 Key Function: Turn on all sound to 100% or to 0%, toggling between the two. |
| F7key:eval | F7: Toggle Fast Mode | PlayTest | boolean | true | — | F7 Key Function: Toggle fast mode. |
| CtrlQuickLoad:eval | CTRL + n: Quick Load | PlayTest | boolean | true | — | CTRL + a number from 1 to 9 will yield a quick load of that safe file. Does not count auto saves. |
| NewGameCommonEvent:num | NewGame &gt; CommonEvent | PlayTest | common_event | 0 | — | Runs a common event each time a new game during play test session is started. |
| BattleTest | Battle Test | — | — | — | — | — |
| BTestItems:eval | Add Item Type | BattleTest | boolean | true | — | Add copies of each database item? Effective only during battle test. |
| BTestWeapons:eval | Add Weapon Type | BattleTest | boolean | true | — | Add copies of each database weapon? Effective only during battle test. |
| BTestArmors:eval | Add Armor Type | BattleTest | boolean | true | — | Add copies of each database armor? Effective only during battle test. |
| BTestAddedQuantity:num | Added Quantity | BattleTest | number | 90 | — | Determines how many items are added during a battle test instead of the maximum amount. |
| ShiftR_Toggle:eval | Shift+R: Recover All | BattleTest | boolean | true | — | For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status. |
| ShiftT_Toggle:eval | Shift+T: Full TP | BattleTest | boolean | true | — | For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP. |
| DigitGrouping | Digit Grouping | — | — | — | — | — |
| DigitGroupingStandardText:eval | Standard Text | DigitGrouping | boolean | true | — | Make numbers like 1234567 appear like 1,234,567 for standard text inside windows? |
| DigitGroupingExText:eval | Ex Text | DigitGrouping | boolean | true | — | Make numbers like 1234567 appear like 1,234,567 for ex text, written through drawTextEx (like messages)? |
| DigitGroupingDamageSprites:eval | Damage Sprites | DigitGrouping | boolean | true | — | Make numbers like 1234567 appear like 1,234,567 for in-battle damage sprites? |
| DigitGroupingGaugeSprites:eval | Gauge Sprites | DigitGrouping | boolean | true | — | Make numbers like 1234567 appear like 1,234,567 for visible gauge sprites such as HP, MP, and TP gauges? |
| DigitGroupingLocale:str | Country/Locale | DigitGrouping | combo | en-US | ar-SA; bn-BD; bn-IN; cs-CZ; da-DK; de-AT; de-CH; de-DE; el-GR; en-AU; en-CA; en-GB; en-IE; en-IN; en-NZ; en-US; en-ZA; es-AR; es-CL; es-CO; es-ES; es-MX; es-US; fi-FI; fr-BE; fr-CA; fr-CH; fr-FR; he-IL; hi-IN; hu-HU; id-ID; it-CH; it-IT; jp-JP; ko-KR; nl-BE; nl-NL; no-NO; pl-PL; pt-BR; pt-PT; ro-RO; ru-RU; sk-SK; sv-SE; ta-IN; ta-LK; th-TH; tr-TR; zh-CN; zh-HK; zh-TW | Base the digit grouping on which country/locale? |
| PlayerBenefit | Player Benefit | — | — | — | — | — |
| EncounterRateMinimum:num | Encounter Rate Min | PlayerBenefit | — | 10 | — | Minimum number of steps the player can take without any random encounters. |
| EscapeAlways:eval | Escape Always | PlayerBenefit | boolean | true | — | If the player wants to escape a battle, let them escape the battle with 100% chance. |
| ImprovedAccuracySystem:eval | Accuracy Formula | PlayerBenefit | boolean | true | — | Accuracy formula calculation change to Skill Hit% * (User HIT - Target EVA) for better results. |
| AccuracyBoost:eval | Accuracy Boost | PlayerBenefit | boolean | true | — | Boost HIT and EVA rates in favor of the player. |
| LevelUpFullHp:eval | Level Up -&gt; Full HP | PlayerBenefit | boolean | true | — | Recovers full HP when an actor levels up. |
| LevelUpFullMp:eval | Level Up -&gt; Full MP | PlayerBenefit | boolean | true | — | Recovers full MP when an actor levels up. |
| Pictures | Picture-Related | — | — | — | — | — |
| AntiZoomPictures:eval | Anti-Zoom Pictures | Pictures | boolean | true | — | If on, prevents pictures from being affected by zoom. |
| PictureContainers | Picture Containers | Pictures | — | — | — | — |
| DetachBattlePictureContainer:eval | Detach in Battle | PictureContainers | boolean | false | — | If detached, picture container will be separated from the spriteset while on the battle scene. |
| DetachMapPictureContainer:eval | Detach in Map | PictureContainers | boolean | false | — | If detached, picture container will be separated from the spriteset while on the map scene. |
| Misc | Misc | — | — | — | — | — |
| AnimationMirrorOffset:eval | Ani: Mirror Offset | Misc | boolean | false | — | When animations are mirrored, mirror their Offset X values, too. |
| AutoStretch:str | Auto-Stretch | Misc | select | default | Default=default; Stretch=stretch; Normal=normal | Automatically stretch the game to fit the size of the client? |
| FontShadows:eval | Font Shadows | Misc | boolean | false | — | If on, text uses shadows instead of outlines. |
| FontSmoothing:eval | Font Smoothing | Misc | boolean | true | — | If on, smoothes fonts shown in-game. |
| FontWidthFix:eval | Font Width Fix | Misc | boolean | true | — | Fixes the font width issue with instant display non-monospaced fonts in the Message Window. |
| KeyItemProtect:eval | Key Item Protection | Misc | boolean | true | — | If on, prevents Key Items from being able to be sold and from being able to be consumed. |
| MapNameTextCode:eval | Map Name Text Code | Misc | boolean | true | — | If on, map names will use text codes. If off, only the raw map name will be used. |
| ModernControls:eval | Modern Controls | Misc | boolean | true | — | If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins. |
| MvAnimationRate:num | MV Animation Rate | Misc | — | 4 | — | Adjusts the rate at which MV animations play. Default: 4. Lower for faster. Higher for slower. |
| NewGameCommonEventAll:num | NewGame &gt; CommonEvent | Misc | common_event | 0 | — | Runs a common event each time a new game during any session is started. |
| NoTileShadows:eval | No Tile Shadows | Misc | boolean | false | — | Removes tile shadows from being displayed in-game. |
| PixelateImageRendering:eval | Pixel Image Rendering | Misc | boolean | false | — | If on, pixelates the image rendering (for pixel games). |
| RequireFocus:eval | Require Focus? | Misc | boolean | true | — | Requires the game to be focused? If the game isn't focused, it will pause if it's not the active window. |
| ShortcutScripts:eval | Shortcut Scripts | Misc | boolean | true | — | Enables shortcut-based scripts. View the helpfile for more information. |
| SmartEventCollisionPriority:eval | Smart Event Collision | Misc | boolean | true | — | Makes events only able to collide with one another if they're 'Same as characters' priority. |
| SubfolderParse:eval | Subfolder Name Purge | Misc | boolean | true | — | Purge subfolder name from Plugin Parameters when reading data to let Plugin Commands work properly. |

### Struct: Color

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BasicColors | Basic Colors | — | — | — | — | — |
| ColorNormal:str | Normal | BasicColors | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorSystem:str | System | BasicColors | — | 16 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorCrisis:str | Crisis | BasicColors | — | 17 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorDeath:str | Death | BasicColors | — | 18 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorGaugeBack:str | Gauge Back | BasicColors | — | 19 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorHPGauge1:str | HP Gauge 1 | BasicColors | — | 20 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorHPGauge2:str | HP Gauge 2 | BasicColors | — | 21 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorMPGauge1:str | MP Gauge 1 | BasicColors | — | 22 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorMPGauge2:str | MP Gauge 2 | BasicColors | — | 23 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorMPCost:str | MP Cost | BasicColors | — | 23 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorPowerUp:str | Power Up | BasicColors | — | 24 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorPowerDown:str | Power Down | BasicColors | — | 25 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorCTGauge1:str | CT Gauge 1 | BasicColors | — | 26 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorCTGauge2:str | CT Gauge 2 | BasicColors | — | 27 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorTPGauge1:str | TP Gauge 1 | BasicColors | — | 28 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorTPGauge2:str | TP Gauge 2 | BasicColors | — | 29 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorTPCost:str | TP Cost | BasicColors | — | 29 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorPending:str | Pending Color | BasicColors | — | #2a847d | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorExpGauge1:str | EXP Gauge 1 | BasicColors | — | 30 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorExpGauge2:str | EXP Gauge 2 | BasicColors | — | 31 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorMaxLvGauge1:str | MaxLv Gauge 1 | BasicColors | — | 14 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorMaxLvGauge2:str | MaxLv Gauge 2 | BasicColors | — | 6 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| AlphaColors | Alpha Colors | — | — | — | — | — |
| OutlineColor:str | Window Font Outline | AlphaColors | — | rgba(0, 0, 0, 0.6) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| OutlineColorGauge:str | Gauge Number Outline | AlphaColors | — | rgba(0, 0, 0, 1.0) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| DimColor1:str | Dim Color 1 | AlphaColors | — | rgba(0, 0, 0, 0.6) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| DimColor2:str | Dim Color 2 | AlphaColors | — | rgba(0, 0, 0, 0) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| ItemBackColor1:str | Item Back Color 1 | AlphaColors | — | rgba(32, 32, 32, 0.5) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| ItemBackColor2:str | Item Back Color 2 | AlphaColors | — | rgba(0, 0, 0, 0.5) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| ConditionalColors | Conditional Colors | — | — | — | — | — |
| ActorHPColor:func | JS: Actor HP Color | ConditionalColors | note | "// Set the variables used in this function.\nlet actor = arguments\[0\];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}" | — | Code used for determining what HP color to use for actors. |
| ActorMPColor:func | JS: Actor MP Color | ConditionalColors | note | "// Set the variables used in this function.\nlet actor = arguments\[0\];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() &lt; 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}" | — | Code used for determining what MP color to use for actors. |
| ActorTPColor:func | JS: Actor TP Color | ConditionalColors | note | "// Set the variables used in this function.\nlet actor = arguments\[0\];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() &lt; 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}" | — | Code used for determining what TP color to use for actors. |
| ParamChange:func | JS: Parameter Change | ConditionalColors | note | "// Set the variables used in this function.\nlet change = arguments\[0\];\n\n// If a positive change, use power up color.\nif (change &gt; 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change &lt; 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}" | — | Code used for determining whatcolor to use for parameter changes. |
| DamageColor:func | JS: Damage Colors | ConditionalColors | note | "// Set the variables used in this function.\nlet colorType = arguments\[0\];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}" | — | Code used for determining what color to use for damage types. |

### Struct: Gold

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| GoldMax:num | Gold Max | — | num | 99999999 | — | Maximum amount of Gold the party can hold. Default 99999999 |
| GoldFontSize:num | Gold Font Size | — | number | 24 | — | Font size used for displaying Gold inside Gold Windows. Default: 26 |
| GoldIcon:num | Gold Icon | — | — | 314 | — | Icon used to represent Gold. Use 0 for no icon. |
| GoldOverlap:str | Gold Overlap | — | — | A Lot | — | Text used too much Gold to fit in the window. |
| ItemStyle:eval | Item Style | — | boolean | true | — | Draw gold in the item style? ie: Icon, Label, Value |

### Struct: ImgLoad

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| animations:arraystr | img/animations/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| battlebacks1:arraystr | img/battlebacks1/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| battlebacks2:arraystr | img/battlebacks2/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| characters:arraystr | img/characters/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| enemies:arraystr | img/enemies/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| faces:arraystr | img/faces/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| parallaxes:arraystr | img/parallaxes/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| pictures:arraystr | img/pictures/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| sv_actors:arraystr | img/sv_actors/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| sv_enemies:arraystr | img/sv_enemies/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| system:arraystr | img/system/ | — | file\[\] | \["Balloon","IconSet"\] | — | Which files do you wish to load from this directory upon starting up the game? |
| tilesets:arraystr | img/tilesets/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| titles1:arraystr | img/titles1/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |
| titles2:arraystr | img/titles2/ | — | file\[\] | \[\] | — | Which files do you wish to load from this directory upon starting up the game? |

### Struct: KeyboardInput

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Controls | — | — | — | — | — | — |
| WASD:eval | WASD Movement | Controls | boolean | false | — | Enables or disables WASD movement for your game project. Moves the W page down button to E. |
| DashToggleR:eval | R Button: Dash Toggle | Controls | boolean | false | — | Enables or disables R button as an Always Dash option toggle. |
| NameInput | Name Input | — | — | — | — | — |
| EnableNameInput:eval | Enable? | NameInput | boolean | true | — | Enables keyboard input for name entry. Only tested with English keyboards. |
| DefaultMode:str | Default Mode | NameInput | select | keyboard | Default - Uses Arrow Keys to select letters.=default; Keyboard - Uses Keyboard to type in letters.=keyboard | Select default mode when entering the scene. |
| QwertyLayout:eval | QWERTY Layout | NameInput | boolean | true | — | Uses the QWERTY layout for manual entry. |
| NameInputMessage:eval | Keyboard Message | NameInput | note | "Type in this character's name.\nPress \\c\[5\]ENTER\\c\[0\] when you're done.\n\n-or-\n\nPress \\c\[5\]arrow keys\\c\[0\]/\\c\[5\]TAB\\c\[0\] to switch\nto manual character entry.\n\nPress \\c\[5\]ESC\\c\[0\]/\\c\[5\]TAB\\c\[0\] to use to keyboard." | — | The message displayed when allowing keyboard entry. You may use text codes here. |
| BannedWords:arraystr | Banned Words | NameInput | string\[\] | \[\] | — | Players cannot use these words for names. These include words inside the names. |
| NumberInput | Number Input | — | — | — | — | — |
| EnableNumberInput:eval | Enable? | NumberInput | boolean | true | — | Enables keyboard input for number entry. Only tested with English keyboards. |
| ButtonAssist | Button Assist | — | — | — | — | — |
| Finish:str | Finish Entry | ButtonAssist | — | Finish | — | Text used to describe finish entry. |
| PageChange:str | Page Change | ButtonAssist | — | Page | — | Text used to describe character page changing. |
| Keyboard:str | Switch To Keyboard | ButtonAssist | — | Keyboard | — | Text used to describe the keyboard switch. |
| Manual:str | Switch To Manual | ButtonAssist | — | Manual | — | Text used to describe the manual entry switch. |

### Struct: MenuBg

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BlurStrength:num | Blur Strength | — | — | 8 | — | Strength used for menu background snapshots. Default: 8. Higher is stronger. Lower is weaker. |
| Scene_Menu:struct | Scene_Menu | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Item:struct | Scene_Item | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Skill:struct | Scene_Skill | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Equip:struct | Scene_Equip | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Status:struct | Scene_Status | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Options:struct | Scene_Options | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Save:struct | Scene_Save | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Load:struct | Scene_Load | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_GameEnd:struct | Scene_GameEnd | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Shop:struct | Scene_Shop | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Name:struct | Scene_Name | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for this scene. |
| Scene_Unlisted:struct | Scene_Unlisted | — | struct&lt;BgSettings&gt; | {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""} | — | The individual background settings for any scenes that aren't listed here. |

### Struct: BgSettings

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| SnapshotOpacity:num | Snapshop Opacity | — | number | 192 | — | Snapshot opacity for the scene. |
| BgFilename1:str | Background 1 | — | file | — | — | Filename used for the bottom background image. Leave empty if you don't wish to use one. |
| BgFilename2:str | Background 2 | — | file | — | — | Filename used for the upper background image. Leave empty if you don't wish to use one. |

### Struct: ButtonAssist

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| Enable:eval | Enable | General | boolean | true | — | Enable the Menu Button Assist Window. |
| Location:str | Location | General | select | bottom | Top of Screen=top; Bottom of Screen=bottom | Determine the location of the Button Assist Window. Requires Plugin Parameters =&gt; UI =&gt; Side Buttons ON. |
| BgType:num | Background Type | General | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| SplitEscape:eval | Split "Escape" | General | boolean | false | — | "Split" makes separate instances of "Cancel" and "Menu". "Don't" will consolidate both into "Escape". |
| Text | — | — | — | — | — | — |
| TextFmt:str | Text Format | Text | — | %1:%2 | — | Format on how the buttons are displayed. Text codes allowed. %1 - Key, %2 - Text |
| MultiKeyFmt:str | Multi-Key Format | Text | — | %1/%2 | — | Format for actions with multiple keys. Text codes allowed. %1 - Key 1, %2 - Key 2 |
| OkText:str | OK Text | Text | — | Select | — | Default text used to display OK Key Action. Text codes allowed. |
| CancelText:str | Cancel Text | Text | — | Back | — | Default text used to display Cancel Key Action. Text codes allowed. |
| SwitchActorText:str | Switch Actor Text | Text | — | Switch Ally | — | Default text used to display Switch Actor Action. Text codes allowed. |
| Keys | — | — | — | — | — | — |
| KeyUnlisted:str | Key: Unlisted Format | Keys | — | \}❪%1❫\{ | — | If a key is not listed below, use this format. Text codes allowed. %1 - Key |
| KeyUP:str | Key: Up | Keys | — | ^ | — | How this key is shown in-game. Text codes allowed. |
| KeyDOWN:str | Key: Down | Keys | — | v | — | How this key is shown in-game. Text codes allowed. |
| KeyLEFT:str | Key: Left | Keys | — | &lt;&lt; | — | How this key is shown in-game. Text codes allowed. |
| KeyRIGHT:str | Key: Right | Keys | — | &gt;&gt; | — | How this key is shown in-game. Text codes allowed. |
| KeySHIFT:str | Key: Shift | Keys | — | \}❪SHIFT❫\{ | — | How this key is shown in-game. Text codes allowed. |
| KeyTAB:str | Key: Tab | Keys | — | \}❪TAB❫\{ | — | How this key is shown in-game. Text codes allowed. |
| KeyA:str | Key: A | Keys | — | A | — | How this key is shown in-game. Text codes allowed. |
| KeyB:str | Key: B | Keys | — | B | — | How this key is shown in-game. Text codes allowed. |
| KeyC:str | Key: C | Keys | — | C | — | How this key is shown in-game. Text codes allowed. |
| KeyD:str | Key: D | Keys | — | D | — | How this key is shown in-game. Text codes allowed. |
| KeyE:str | Key: E | Keys | — | E | — | How this key is shown in-game. Text codes allowed. |
| KeyF:str | Key: F | Keys | — | F | — | How this key is shown in-game. Text codes allowed. |
| KeyG:str | Key: G | Keys | — | G | — | How this key is shown in-game. Text codes allowed. |
| KeyH:str | Key: H | Keys | — | H | — | How this key is shown in-game. Text codes allowed. |
| KeyI:str | Key: I | Keys | — | I | — | How this key is shown in-game. Text codes allowed. |
| KeyJ:str | Key: J | Keys | — | J | — | How this key is shown in-game. Text codes allowed. |
| KeyK:str | Key: K | Keys | — | K | — | How this key is shown in-game. Text codes allowed. |
| KeyL:str | Key: L | Keys | — | L | — | How this key is shown in-game. Text codes allowed. |
| KeyM:str | Key: M | Keys | — | M | — | How this key is shown in-game. Text codes allowed. |
| KeyN:str | Key: N | Keys | — | N | — | How this key is shown in-game. Text codes allowed. |
| KeyO:str | Key: O | Keys | — | O | — | How this key is shown in-game. Text codes allowed. |
| KeyP:str | Key: P | Keys | — | P | — | How this key is shown in-game. Text codes allowed. |
| KeyQ:str | Key: Q | Keys | — | Q | — | How this key is shown in-game. Text codes allowed. |
| KeyR:str | Key: R | Keys | — | R | — | How this key is shown in-game. Text codes allowed. |
| KeyS:str | Key: S | Keys | — | S | — | How this key is shown in-game. Text codes allowed. |
| KeyT:str | Key: T | Keys | — | T | — | How this key is shown in-game. Text codes allowed. |
| KeyU:str | Key: U | Keys | — | U | — | How this key is shown in-game. Text codes allowed. |
| KeyV:str | Key: V | Keys | — | V | — | How this key is shown in-game. Text codes allowed. |
| KeyW:str | Key: W | Keys | — | W | — | How this key is shown in-game. Text codes allowed. |
| KeyX:str | Key: X | Keys | — | X | — | How this key is shown in-game. Text codes allowed. |
| KeyY:str | Key: Y | Keys | — | Y | — | How this key is shown in-game. Text codes allowed. |
| KeyZ:str | Key: Z | Keys | — | Z | — | How this key is shown in-game. Text codes allowed. |

### Struct: ControllerButtons

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ID | ID Information | — | — | — | — | — |
| Name:str | Controller ID Name | ID | — | Untitled | — | Exact string used for this controller ID. Plugin Command "Debug: Current Controller ID" for ID help. |
| Match:str | Similarity Match | ID | — | Untitled | — | Similar text used for this controller ID. Plugin Command "Debug: Current Controller ID" for ID help. |
| Directions | — | — | — | — | — | — |
| up:str | Up | Directions | — | — | — | How this button is shown in-game. Text codes allowed. |
| left:str | Left | Directions | — | — | — | How this button is shown in-game. Text codes allowed. |
| right:str | Right | Directions | — | — | — | How this button is shown in-game. Text codes allowed. |
| down:str | Down | Directions | — | — | — | How this button is shown in-game. Text codes allowed. |
| Actions | — | — | — | — | — | — |
| ok:str | OK | Actions | — | — | — | How this button is shown in-game. Text codes allowed. |
| cancel:str | Cancel | Actions | — | — | — | How this button is shown in-game. Text codes allowed. |
| menu:str | Menu | Actions | — | — | — | How this button is shown in-game. Text codes allowed. |
| shift:str | Shift | Actions | — | — | — | How this button is shown in-game. Text codes allowed. |
| pageup:str | Page Up | Actions | — | — | — | How this button is shown in-game. Text codes allowed. |
| pagedown:str | Page Down | Actions | — | — | — | How this button is shown in-game. Text codes allowed. |

### Struct: MenuLayout

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Title:struct | Scene_Title | SceneSettings | struct&lt;Title&gt; | {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"} | — | Various options on adjusting the Title Scene. |
| MainMenu:struct | Scene_Menu | SceneSettings | struct&lt;MainMenu&gt; | {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Main Menu Scene. |
| ItemMenu:struct | Scene_Item | SceneSettings | struct&lt;ItemMenu&gt; | {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Item Menu Scene. |
| SkillMenu:struct | Scene_Skill | SceneSettings | struct&lt;SkillMenu&gt; | {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Skill Menu Scene. |
| EquipMenu:struct | Scene_Equip | SceneSettings | struct&lt;EquipMenu&gt; | {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""} | — | Various options on adjusting the Equip Menu Scene. |
| StatusMenu:struct | Scene_Status | SceneSettings | struct&lt;StatusMenu&gt; | {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Status Menu Scene. |
| OptionsMenu:struct | Scene_Options | SceneSettings | struct&lt;OptionsMenu&gt; | {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Options Menu Scene. |
| SaveMenu:struct | Scene_Save | SceneSettings | struct&lt;SaveMenu&gt; | {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Save Menu Scene. |
| LoadMenu:struct | Scene_Load | SceneSettings | struct&lt;LoadMenu&gt; | {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Load Menu Scene. |
| GameEnd:struct | Scene_GameEnd | SceneSettings | struct&lt;GameEnd&gt; | {"CommandList:arraystruct":"\[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"\]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Game End Scene. |
| ShopMenu:struct | Scene_Shop | SceneSettings | struct&lt;ShopMenu&gt; | {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Shop Menu Scene. |
| NameMenu:struct | Scene_Name | SceneSettings | struct&lt;NameMenu&gt; | {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""} | — | Various options on adjusting the Actor Rename Scene. |

### Struct: MainMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| CommandWindow | Command Window | — | — | — | — | — |
| CommandBgType:num | Background Type | CommandWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CommandRect:func | JS: X, Y, W, H | CommandWindow | note | "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| GoldWindow | Gold Window | — | — | — | — | — |
| GoldBgType:num | Background Type | GoldWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| GoldRect:func | JS: X, Y, W, H | GoldWindow | note | "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusWindow | Status Window | — | — | — | — | — |
| StatusBgType:num | Background Type | StatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusRect:func | JS: X, Y, W, H | StatusWindow | note | "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: ItemMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpBgType:num | Background Type | HelpWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| HelpRect:func | JS: X, Y, W, H | HelpWindow | note | "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| CategoryWindow | Category Window | — | — | — | — | — |
| CategoryBgType:num | Background Type | CategoryWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CategoryRect:func | JS: X, Y, W, H | CategoryWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ItemWindow | Item Window | — | — | — | — | — |
| ItemBgType:num | Background Type | ItemWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ItemRect:func | JS: X, Y, W, H | ItemWindow | note | "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ActorWindow | Actor Window | — | — | — | — | — |
| ActorBgType:num | Background Type | ActorWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ActorRect:func | JS: X, Y, W, H | ActorWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: SkillMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpBgType:num | Background Type | HelpWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| HelpRect:func | JS: X, Y, W, H | HelpWindow | note | "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| SkillTypeWindow | Skill Type Window | — | — | — | — | — |
| SkillTypeBgType:num | Background Type | SkillTypeWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| SkillTypeRect:func | JS: X, Y, W, H | SkillTypeWindow | note | "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusWindow | Status Window | — | — | — | — | — |
| StatusBgType:num | Background Type | StatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusRect:func | JS: X, Y, W, H | StatusWindow | note | "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ItemWindow | Item Window | — | — | — | — | — |
| ItemBgType:num | Background Type | ItemWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ItemRect:func | JS: X, Y, W, H | ItemWindow | note | "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ActorWindow | Actor Window | — | — | — | — | — |
| ActorBgType:num | Background Type | ActorWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ActorRect:func | JS: X, Y, W, H | ActorWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: EquipMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpBgType:num | Background Type | HelpWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| HelpRect:func | JS: X, Y, W, H | HelpWindow | note | "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusWindow | Status Window | — | — | — | — | — |
| StatusBgType:num | Background Type | StatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusRect:func | JS: X, Y, W, H | StatusWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| CommandWindow | Command Window | — | — | — | — | — |
| CommandBgType:num | Background Type | CommandWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CommandRect:func | JS: X, Y, W, H | CommandWindow | note | "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| SlotWindow | Slot Window | — | — | — | — | — |
| SlotBgType:num | Background Type | SlotWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| SlotRect:func | JS: X, Y, W, H | SlotWindow | note | "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ItemWindow | Item Window | — | — | — | — | — |
| ItemBgType:num | Background Type | ItemWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ItemRect:func | JS: X, Y, W, H | ItemWindow | note | "return this.slotWindowRect();" | — | Code used to determine the dimensions for this window. |

### Struct: StatusMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ProfileWindow | Profile Window | — | — | — | — | — |
| ProfileBgType:num | Background Type | ProfileWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ProfileRect:func | JS: X, Y, W, H | ProfileWindow | note | "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusWindow | Status Window | — | — | — | — | — |
| StatusBgType:num | Background Type | StatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusRect:func | JS: X, Y, W, H | StatusWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusParamsWindow | Parameters Window | — | — | — | — | — |
| StatusParamsBgType:num | Background Type | StatusParamsWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusParamsRect:func | JS: X, Y, W, H | StatusParamsWindow | note | "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusEquipWindow | Equipment Window | — | — | — | — | — |
| StatusEquipBgType:num | Background Type | StatusEquipWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusEquipRect:func | JS: X, Y, W, H | StatusEquipWindow | note | "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: OptionsMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| OptionsWindow | Options Window | — | — | — | — | — |
| OptionsBgType:num | Background Type | OptionsWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| OptionsRect:func | JS: X, Y, W, H | OptionsWindow | note | "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: SaveMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpBgType:num | Background Type | HelpWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| HelpRect:func | JS: X, Y, W, H | HelpWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ListWindow | List Window | — | — | — | — | — |
| ListBgType:num | Background Type | ListWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ListRect:func | JS: X, Y, W, H | ListWindow | note | "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: LoadMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpBgType:num | Background Type | HelpWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| HelpRect:func | JS: X, Y, W, H | HelpWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ListWindow | List Window | — | — | — | — | — |
| ListBgType:num | Background Type | ListWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ListRect:func | JS: X, Y, W, H | ListWindow | note | "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: GameEnd

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| CommandList:arraystruct | Command Window List | — | struct&lt;Command&gt;\[\] | \["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"\] | — | Window commands used by the Game End screen. Add new commands here. |
| CommandBgType:num | Background Type | CommandList:arraystruct | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CommandRect:func | JS: X, Y, W, H | CommandList:arraystruct | note | "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: ShopMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpBgType:num | Background Type | HelpWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| HelpRect:func | JS: X, Y, W, H | HelpWindow | note | "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |
| GoldWindow | Gold Window | — | — | — | — | — |
| GoldBgType:num | Background Type | GoldWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| GoldRect:func | JS: X, Y, W, H | GoldWindow | note | "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| CommandWindow | Command Window | — | — | — | — | — |
| CommandBgType:num | Background Type | CommandWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CommandRect:func | JS: X, Y, W, H | CommandWindow | note | "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| DummyWindow | Dummy Window | — | — | — | — | — |
| DummyBgType:num | Background Type | DummyWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| DummyRect:func | JS: X, Y, W, H | DummyWindow | note | "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| NumberWindow | Number Window | — | — | — | — | — |
| NumberBgType:num | Background Type | NumberWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| NumberRect:func | JS: X, Y, W, H | NumberWindow | note | "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| StatusWindow | Status Window | — | — | — | — | — |
| StatusBgType:num | Background Type | StatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusRect:func | JS: X, Y, W, H | StatusWindow | note | "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| BuyWindow | Buy Window | — | — | — | — | — |
| BuyBgType:num | Background Type | BuyWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| BuyRect:func | JS: X, Y, W, H | BuyWindow | note | "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| CategoryWindow | Category Window | — | — | — | — | — |
| CategoryBgType:num | Background Type | CategoryWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| CategoryRect:func | JS: X, Y, W, H | CategoryWindow | note | "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| SellWindow | Sell Window | — | — | — | — | — |
| SellBgType:num | Background Type | SellWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| SellRect:func | JS: X, Y, W, H | SellWindow | note | "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: NameMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| EditWindow | Edit Window | — | — | — | — | — |
| EditBgType:num | Background Type | EditWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| EditRect:func | JS: X, Y, W, H | EditWindow | note | "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| InputWindow | Input Window | — | — | — | — | — |
| InputBgType:num | Background Type | InputWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| InputRect:func | JS: X, Y, W, H | InputWindow | note | "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |

### Struct: Title

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| TitleScreen | Title Screen | — | — | — | — | — |
| DocumentTitleFmt:str | Document Title Format | TitleScreen | — | %1: %2 - Version %3 | — | Format to display text in document title. %1 - Main Title, %2 - Subtitle, %3 - Version |
| Subtitle:str | Subtitle | TitleScreen | — | Subtitle | — | Subtitle to be displayed under the title name. |
| Version:str | Version | TitleScreen | — | 0.00 | — | Version to be display in the title screen corner. |
| drawGameTitle:func | JS: Draw Title | TitleScreen | note | "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");" | — | Code used to draw the game title. |
| drawGameSubtitle:func | JS: Draw Subtitle | TitleScreen | note | "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");" | — | Code used to draw the game subtitle. |
| drawGameVersion:func | JS: Draw Version | TitleScreen | note | "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");" | — | Code used to draw the game version. |
| CommandRect:func | JS: X, Y, W, H | TitleScreen | note | "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| ButtonFadeSpeed:num | Button Fade Speed | TitleScreen | number | 4 | — | Speed at which the buttons fade in at (1-255). |

### Struct: Param

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DisplayedParams:arraystr | Displayed Parameters | — | combo\[\] | \["ATK","DEF","MAT","MDF","AGI","LUK"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK; HIT; EVA; CRI; CEV; MEV; MRF; CNT; HRG; MRG; TRG; TGR; GRD; REC; PHA; MCR; TCR; PDR; MDR; FDR; EXR | A list of the parameters that will be displayed in-game. |
| ExtDisplayedParams:arraystr | Extended Parameters | DisplayedParams:arraystr | combo\[\] | \["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK; HIT; EVA; CRI; CEV; MEV; MRF; CNT; HRG; MRG; TRG; TGR; GRD; REC; PHA; MCR; TCR; PDR; MDR; FDR; EXR | The list shown in extended scenes (for other VisuStella plugins). |
| BasicParameters | Basic Parameters | — | — | — | — | — |
| ShowActorLevel:eval | Show Actor Level? | BasicParameters | boolean | true | — | Show the actor level when displaying actors? Affects for most windows in-game. |
| CrisisRate:num | HP Crisis Rate | BasicParameters | — | 0.25 | — | HP Ratio at which a battler can be considered in crisis mode. |
| BasicParameterFormula:func | JS: Formula | BasicParameters | note | "// Determine the variables used in this calculation.\nlet paramId = arguments\[0\];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));" | — | Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK. |
| BasicParamCaps | Parameter Caps | BasicParameters | — | — | — | — |
| BasicActorParamCaps | Actors | BasicParamCaps | — | — | — | — |
| BasicActorParamMax0:str | MaxHP Cap | BasicActorParamCaps | — | 9999 | — | Formula used to determine MaxHP cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax1:str | MaxMP Cap | BasicActorParamCaps | — | 9999 | — | Formula used to determine MaxMP cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax2:str | ATK Cap | BasicActorParamCaps | — | 999 | — | Formula used to determine ATK cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax3:str | DEF Cap | BasicActorParamCaps | — | 999 | — | Formula used to determine DEF cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax4:str | MAT Cap | BasicActorParamCaps | — | 999 | — | Formula used to determine MAT cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax5:str | MDF Cap | BasicActorParamCaps | — | 999 | — | Formula used to determine MDF cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax6:str | AGI Cap | BasicActorParamCaps | — | 999 | — | Formula used to determine AGI cap. Use 0 if you don't want a cap for this parameter. |
| BasicActorParamMax7:str | LUK Cap | BasicActorParamCaps | — | 999 | — | Formula used to determine LUK cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamCaps | Enemies | BasicParamCaps | — | — | — | — |
| BasicEnemyParamMax0:str | MaxHP Cap | BasicEnemyParamCaps | — | 999999 | — | Formula used to determine MaxHP cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax1:str | MaxMP Cap | BasicEnemyParamCaps | — | 9999 | — | Formula used to determine MaxMP cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax2:str | ATK Cap | BasicEnemyParamCaps | — | 999 | — | Formula used to determine ATK cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax3:str | DEF Cap | BasicEnemyParamCaps | — | 999 | — | Formula used to determine DEF cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax4:str | MAT Cap | BasicEnemyParamCaps | — | 999 | — | Formula used to determine MAT cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax5:str | MDF Cap | BasicEnemyParamCaps | — | 999 | — | Formula used to determine MDF cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax6:str | AGI Cap | BasicEnemyParamCaps | — | 999 | — | Formula used to determine AGI cap. Use 0 if you don't want a cap for this parameter. |
| BasicEnemyParamMax7:str | LUK Cap | BasicEnemyParamCaps | — | 999 | — | Formula used to determine LUK cap. Use 0 if you don't want a cap for this parameter. |
| XParameters | X Parameters | — | — | — | — | — |
| XParameterFormula:func | JS: Formula | XParameters | note | "// Determine the variables used in this calculation.\nlet xparamId = arguments\[0\];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;" | — | Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG. |
| XParamVocab | Vocabulary | XParameters | — | — | — | — |
| XParamVocab0:str | HIT | XParamVocab | — | Hit | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab1:str | EVA | XParamVocab | — | Evasion | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab2:str | CRI | XParamVocab | — | Crit.Rate | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab3:str | CEV | XParamVocab | — | Crit.Evade | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab4:str | MEV | XParamVocab | — | Magic Evade | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab5:str | MRF | XParamVocab | — | Magic Reflect | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab6:str | CNT | XParamVocab | — | Counter | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab7:str | HRG | XParamVocab | — | HP Regen | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab8:str | MRG | XParamVocab | — | MP Regen | — | The in-game vocabulary used for this X Parameter. |
| XParamVocab9:str | TRG | XParamVocab | — | TP Regen | — | The in-game vocabulary used for this X Parameter. |
| SParameters | S Parameters | — | — | — | — | — |
| SParameterFormula:func | JS: Formula | SParameters | note | "// Determine the variables used in this calculation.\nlet sparamId = arguments\[0\];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;" | — | Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR. |
| SParamVocab | Vocabulary | SParameters | — | — | — | — |
| SParamVocab0:str | TGR | SParamVocab | — | Aggro | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab1:str | GRD | SParamVocab | — | Guard | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab2:str | REC | SParamVocab | — | Recovery | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab3:str | PHA | SParamVocab | — | Item Effect | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab4:str | MCR | SParamVocab | — | MP Cost | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab5:str | TCR | SParamVocab | — | TP Charge | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab6:str | PDR | SParamVocab | — | Physical DMG | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab7:str | MDR | SParamVocab | — | Magical DMG | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab8:str | FDR | SParamVocab | — | Floor DMG | — | The in-game vocabulary used for this S Parameter. |
| SParamVocab9:str | EXR | SParamVocab | — | EXP Gain | — | The in-game vocabulary used for this S Parameter. |
| Icons | Icons | — | — | — | — | — |
| DrawIcons:eval | Draw Icons? | Icons | boolean | true | — | Draw icons next to parameter names? |
| IconParam0:str | MaxHP | Icons | — | 84 | — | Icon used for this parameter. |
| IconParam1:str | MaxMP | Icons | — | 165 | — | Icon used for this parameter. |
| IconParam2:str | ATK | Icons | — | 76 | — | Icon used for this parameter. |
| IconParam3:str | DEF | Icons | — | 81 | — | Icon used for this parameter. |
| IconParam4:str | MAT | Icons | — | 101 | — | Icon used for this parameter. |
| IconParam5:str | MDF | Icons | — | 133 | — | Icon used for this parameter. |
| IconParam6:str | AGI | Icons | — | 140 | — | Icon used for this parameter. |
| IconParam7:str | LUK | Icons | — | 87 | — | Icon used for this parameter. |
| IconXParam0:str | HIT | Icons | — | 102 | — | Icon used for this parameter. |
| IconXParam1:str | EVA | Icons | — | 82 | — | Icon used for this parameter. |
| IconXParam2:str | CRI | Icons | — | 78 | — | Icon used for this parameter. |
| IconXParam3:str | CEV | Icons | — | 82 | — | Icon used for this parameter. |
| IconXParam4:str | MEV | Icons | — | 171 | — | Icon used for this parameter. |
| IconXParam5:str | MRF | Icons | — | 222 | — | Icon used for this parameter. |
| IconXParam6:str | CNT | Icons | — | 77 | — | Icon used for this parameter. |
| IconXParam7:str | HRG | Icons | — | 72 | — | Icon used for this parameter. |
| IconXParam8:str | MRG | Icons | — | 72 | — | Icon used for this parameter. |
| IconXParam9:str | TRG | Icons | — | 72 | — | Icon used for this parameter. |
| IconSParam0:str | TGR | Icons | — | 5 | — | Icon used for this parameter. |
| IconSParam1:str | GRD | Icons | — | 128 | — | Icon used for this parameter. |
| IconSParam2:str | REC | Icons | — | 72 | — | Icon used for this parameter. |
| IconSParam3:str | PHA | Icons | — | 176 | — | Icon used for this parameter. |
| IconSParam4:str | MCR | Icons | — | 165 | — | Icon used for this parameter. |
| IconSParam5:str | TCR | Icons | — | 164 | — | Icon used for this parameter. |
| IconSParam6:str | PDR | Icons | — | 76 | — | Icon used for this parameter. |
| IconSParam7:str | MDR | Icons | — | 79 | — | Icon used for this parameter. |
| IconSParam8:str | FDR | Icons | — | 141 | — | Icon used for this parameter. |
| IconSParam9:str | EXR | Icons | — | 73 | — | Icon used for this parameter. |

### Struct: Command

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Symbol:str | Symbol | — | — | Symbol | — | The symbol used for this command. |
| TextStr:str | STR: Text | — | — | Untitled | — | Displayed text used for this title command. If this has a value, ignore the JS: Text version. |
| TextJS:func | JS: Text | — | note | "return 'Text';" | — | JavaScript code used to determine string used for the displayed name. |
| ShowJS:func | JS: Show | — | note | "return true;" | — | JavaScript code used to determine if the item is shown or not. |
| EnableJS:func | JS: Enable | — | note | "return true;" | — | JavaScript code used to determine if the item is enabled or not. |
| ExtJS:func | JS: Ext | — | note | "return null;" | — | JavaScript code used to determine any ext data that should be added. |
| CallHandlerJS:func | JS: Run Code | — | note | "" | — | JavaScript code that runs once this command is selected. |

### Struct: TitlePictureButton

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| PictureFilename:str | Picture's Filename | — | file | — | — | Filename used for the picture. |
| ButtonURL:str | Button URL | — | — | &lt;external-url&gt; | — | URL for the button to go to upon being clicked. |
| PositionJS:func | JS: Position | — | note | "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;" | — | JavaScript code that helps determine the button's Position. |
| OnLoadJS:func | JS: On Load | — | note | "this.opacity = 0;\nthis.visible = true;" | — | JavaScript code that runs once this button bitmap is loaded. |
| CallHandlerJS:func | JS: Run Code | — | note | "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);" | — | JavaScript code that runs once this button is pressed. |

### Struct: UI

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| UIArea | UI Area | — | — | — | — | — |
| FadeSpeed:num | Fade Speed | UIArea | — | 24 | — | Default fade speed for transitions. |
| BoxMargin:num | Box Margin | UIArea | number | 4 | — | Set the margin in pixels for the screen borders. Default: 4 |
| CommandWidth:num | Command Window Width | UIArea | number | 240 | — | Sets the width for standard Command Windows. Default: 240 |
| BottomHelp:eval | Bottom Help Window | UIArea | boolean | false | — | Put the Help Window at the bottom of the screen? |
| RightMenus:eval | Right Aligned Menus | UIArea | boolean | true | — | Put most command windows to the right side of the screen. |
| ShowButtons:eval | Show Buttons | UIArea | boolean | true | — | Show clickable buttons in your game? This will affect all buttons. |
| cancelShowButton:eval | Show Cancel Button | ShowButtons:eval | boolean | true | — | Show cancel button? If 'Show Buttons' is false, this will be hidden. |
| menuShowButton:eval | Show Menu Button | ShowButtons:eval | boolean | true | — | Show main menu button from the map scene? If 'Show Buttons' is false, this will be hidden. |
| pagedownShowButton:eval | Show Page Up/Down | ShowButtons:eval | boolean | true | — | Show page up/down buttons? If 'Show Buttons' is false, this will be hidden. |
| numberShowButton:eval | Show Number Buttons | ShowButtons:eval | boolean | true | — | Show number adjustment buttons? If 'Show Buttons' is false, this will be hidden. |
| ButtonHeight:num | Button Area Height | UIArea | number | 52 | — | Sets the height for the button area. Default: 52 |
| BottomButtons:eval | Bottom Buttons | UIArea | boolean | false | — | Put the buttons at the bottom of the screen? |
| SideButtons:eval | Side Buttons | UIArea | boolean | true | — | Push buttons to the side of the UI if there is room. |
| StateIconsNonFrame:eval | State Icons Non-Frame | UIArea | boolean | true | — | Replace sprite frame system for non-frame. Better for any instances where icons are zoomed. |
| MenuObjects | Menu Objects | — | — | — | — | — |
| LvExpGauge:eval | Level -&gt; EXP Gauge | MenuObjects | boolean | true | — | Draw an EXP Gauge under the drawn level. |
| ParamArrow:str | Parameter Arrow | MenuObjects | — | → | — | The arrow used to show changes in the parameter values. |
| TextCodeSupport | Text Code Support | — | — | — | — | — |
| TextCodeClassNames:eval | Class Names | TextCodeSupport | boolean | true | — | Make class names support text codes? |
| TextCodeNicknames:eval | Nicknames | TextCodeSupport | boolean | true | — | Make nicknames support text codes? |

### Struct: Window

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| WindowDefaults | Defaults | — | — | — | — | — |
| EnableMasking:eval | Enable Masking | WindowDefaults | boolean | false | — | Enable window masking (windows hide other windows behind them)? WARNING: Turning it on can obscure data. |
| CorrectSkinBleeding:eval | Correct Skin Bleed | WindowDefaults | boolean | true | — | Corrects window skin bleeding bug when used with higher screen resolutions? |
| LineHeight:num | Line Height | WindowDefaults | — | 36 | — | Default line height used for standard windows. Default: 36. Avoid using odd numbers. |
| ItemPadding:num | Item Padding | WindowDefaults | — | 8 | — | Default line padding used for standard windows. Default: 8. Avoid using odd numbers. |
| BackOpacity:num | Back Opacity | WindowDefaults | — | 192 | — | Default back opacity used for standard windows. Default: 192 |
| TranslucentOpacity:num | Translucent Opacity | WindowDefaults | — | 160 | — | Default translucent opacity used for standard windows. Default: 160 |
| OpenSpeed:num | Window Opening Speed | WindowDefaults | — | 24 | — | Default open speed used for standard windows. Default: 32 (Use a number between 0-255) |
| ColSpacing:num | Column Spacing | WindowDefaults | — | 8 | — | Default column spacing for selectable windows. Default: 8 |
| RowSpacing:num | Row Spacing | WindowDefaults | — | 4 | — | Default row spacing for selectable windows. Default: 4 |
| ScrollBar | Scroll Bar | — | — | — | — | — |
| ShowScrollBar:eval | Show Scroll Bar? | ScrollBar | boolean | true | — | Show the scroll bar for scrollable windows? |
| BarThickness:num | Thickness | ScrollBar | number | 2 | — | How thick do you want the scroll bar to be? |
| BarOffset:num | Offset | ScrollBar | — | +2 | — | How much do you want to offset the scroll bar by? |
| BarBodyColor:str | Bar Body Color | ScrollBar | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| OffBarColor:str | Off Bar Color | ScrollBar | — | 7 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| OffBarOpacity:num | Off Bar Opacity | ScrollBar | number | 128 | — | What opacity value do you want the off bar opacity to be? Use a number between 0 and 255. |
| SelectableItems | Selectable Items | — | — | — | — | — |
| ShowItemBackground:eval | Show Background? | SelectableItems | boolean | true | — | Selectable menu items have dark boxes behind them. Show them? |
| ItemHeight:num | Item Height Padding | SelectableItems | — | 8 | — | Default padding for selectable items. Default: 8. Avoid using odd numbers. |
| DrawItemBackgroundJS:func | JS: Draw Background | SelectableItems | note | "const rect = arguments\[0\];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);" | — | Code used to draw the background rectangle behind clickable menu objects |
| TextPopup | Text Popup Window | — | — | — | — | — |
| DurationPerChat:num | Duration Per Text | TextPopup | — | 1.5 | — | What is the increase in duration per text character? |
| MinDuration:num | Minimum Duration | TextPopup | number | 90 | — | Minimum duration for window to stay on the screen. |
| MaxDuration:num | Maximum Duration | TextPopup | number | 300 | — | Maximum duration for window to stay on the screen. |

### Struct: ScreenResolution

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Maps | — | — | — | — | — | — |
| AutoScrollLockX:eval | Scroll Lock Small X? | Maps | boolean | true | — | Automatically scroll lock X scrolling if the map is too small? |
| AutoScrollLockY:eval | Scroll Lock Small Y? | Maps | boolean | true | — | Automatically scroll lock Y scrolling if the map is too small? |
| DisplayLockX:num | Locked Display X? | Maps | — | 0.15625 | — | What display X value do you want for auto-scroll locked maps? Use a number between 0 and 1 for best results. |
| DisplayLockY:num | Locked Display Y? | Maps | — | 0.00000 | — | What display Y value do you want for auto-scroll locked maps? Use a number between 0 and 1 for best results. |
| Troops | — | — | — | — | — | — |
| RepositionActors:eval | Reposition Actors | Troops | boolean | true | — | Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core. |
| RepositionEnemies:eval | Reposition Enemies | Troops | boolean | true | — | Update the position of enemies in battle if the screen resolution has changed. |
| RepositionEnemies130:eval | For MZ 1.3.0+? | RepositionEnemies:eval | boolean | false | — | Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+. |

### Struct: ScreenShake

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DefaultStyle:str | Default Style | — | select | random | Original=original; Random=random; Horizontal=horizontal; Vertical=vertical | The default style used for screen shakes. |
| originalJS:func | JS: Original Style | — | note | "// Calculation\nthis.x += Math.round($gameScreen.shake());" | — | This code gives you control over screen shake for this screen shake style. |
| randomJS:func | JS: Random Style | — | note | "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);" | — | This code gives you control over screen shake for this screen shake style. |
| horzJS:func | JS: Horizontal Style | — | note | "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);" | — | This code gives you control over screen shake for this screen shake style. |
| vertJS:func | JS: Vertical Style | — | note | "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);" | — | This code gives you control over screen shake for this screen shake style. |

### Struct: CustomParam

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ParamName:str | Parameter Name | — | — | Untitled | — | What's the parameter's name? Used for VisuStella MZ menus. |
| Abbreviation:str | Abbreviation | ParamName:str | — | unt | — | What abbreviation do you want to use for the parameter? Do not use special characters. Avoid numbers if possible. |
| Icon:num | Icon | ParamName:str | — | 160 | — | What icon do you want to use to represent this parameter? Used for VisuStella MZ menus. |
| Type:str | Type | ParamName:str | select | integer | Integer (Whole Numbers Only)=integer; Float (Decimals are Allowed)=float | What kind of number value will be returned with this parameter? |
| ValueJS:json | JS: Value | — | note | "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;" | — | Run this code when this parameter is to be returned. |

### Struct: ShowPicture

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Position | — | — | — | — | — | — |
| Origin:num | Origin | Position | select | 0 | 0 - Upper Left=0; 1 - Center=1 | What is the origin of this picture icon? |
| PositionX:eval | Position X | Position | — | 0 | — | X coordinate of the picture. You may use JavaScript code. |
| PositionY:eval | Position Y | Position | — | 0 | — | Y coordinate of the picture. You may use JavaScript code. |
| Scale | — | — | — | — | — | — |
| ScaleX:eval | Width % | Scale | — | 100 | — | Horizontal scale of the picture. You may use JavaScript code. |
| ScaleY:eval | Height % | Scale | — | 100 | — | Vertical scale of the picture. You may use JavaScript code. |
| Blend | — | — | — | — | — | — |
| Opacity:eval | Opacity | Blend | — | 255 | — | Insert a number to determine opacity level. Use a number between 0 and 255. You may use JavaScript code. |
| BlendMode:num | Blend Mode | Blend | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the picture? |

### Struct: jsQuickFunc

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| FunctionName:str | Function Name | — | — | Untitled | — | The function's name in the global namespace. Will not overwrite functions/variables of the same name. |
| CodeJS:json | JS: Code | — | note | "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n" | — | Run this code when using the function. |

## Plugin commands

### -

- Command ID: `Separator_Animation`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Animation: Play at Coordinate

- Command ID: `AnimationPoint`
- Description: Plays an animation on the screen at a specific x, y coordinate even if there is no sprite attached.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| AnimationID:num | Animation ID | animation | 1 | — | Plays this animation. |
| Coordinates | — | — | — | — | — |
| pointX:eval | X | — | Graphics.width / 2 | — | X coordinate used for the animation. You may use JavaScript code. |
| pointY:eval | Y | — | Graphics.height / 2 | — | Y coordinate used for the animation. You may use JavaScript code. |
| Mirror:eval | Mirror Animation? | boolean | false | — | Mirror the animation? |
| Mute:eval | Mute Animation? | boolean | false | — | Mute the animation? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Audio`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Audio: Change Current BGM Volume

- Command ID: `AudioChangeBgmVolume`
- Description: Changes the current BGM volume without changing any of the current BGM's other properties and without restarting the BGM.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| volume:eval | Volume | — | 100 | — | Change the current BGM's volume to what amount? You may use JavaScript code. Use numbers from 0 to 100. @ -------------------------------------------------------------------------- |

### Audio: Change Current BGM Pitch

- Command ID: `AudioChangeBgmPitch`
- Description: Changes the current BGM pitch without changing any of the current BGM's other properties and without restarting the BGM.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| pitch:eval | Pitch | — | 100 | — | Change the current BGM's pitch to what amount? You may use JavaScript code. Use numbers from 50 to 150. @ -------------------------------------------------------------------------- |

### Audio: Change Current BGM Pan

- Command ID: `AudioChangeBgmPan`
- Description: Changes the current BGM pan without changing any of the current BGM's other properties and without restarting the BGM.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| pan:eval | Pan | — | 0 | — | Change the current BGM's pan to what amount? You may use JavaScript code. Use numbers from -100 to 100. @ -------------------------------------------------------------------------- |

### Audio: Change Current BGS Volume

- Command ID: `AudioChangeBgsVolume`
- Description: Changes the current BGS volume without changing any of the current BGS's other properties and without restarting the BGS.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| volume:eval | Volume | — | 100 | — | Change the current BGS's volume to what amount? You may use JavaScript code. Use numbers from 0 to 100. @ -------------------------------------------------------------------------- |

### Audio: Change Current BGS Pitch

- Command ID: `AudioChangeBgsPitch`
- Description: Changes the current BGS pitch without changing any of the current BGS's other properties and without restarting the BGS.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| pitch:eval | Pitch | — | 100 | — | Change the current BGS's pitch to what amount? You may use JavaScript code. Use numbers from 50 to 150. @ -------------------------------------------------------------------------- |

### Audio: Change Current BGS Pan

- Command ID: `AudioChangeBgsPan`
- Description: Changes the current BGS pan without changing any of the current BGS's other properties and without restarting the BGS.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| pan:eval | Pan | — | 0 | — | Change the current BGS's pan to what amount? You may use JavaScript code. Use numbers from -100 to 100. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Debug`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Debug: Current Controller ID

- Command ID: `DebugConsoleLastControllerID`
- Description: PLAY TEST ONLY. Shows current controller ID in debug console. Also copies to computer clipboard if possible. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_Export`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Export: All Maps Text

- Command ID: `ExportAllMapText`
- Description: PLAY TEST ONLY. Exports all of the text from all maps, their events, event pages, and any associated Common Events. @ --------------------------------------------------------------------------

No arguments are declared.

### Export: All Troops Text

- Command ID: `ExportAllTroopText`
- Description: PLAY TEST ONLY. Exports all of the text from all troops, their event pages, and any associated Common Events. @ --------------------------------------------------------------------------

No arguments are declared.

### Export: Current Map Text

- Command ID: `ExportCurMapText`
- Description: PLAY TEST ONLY. Exports all of the text on the current map, its events, the event pages, and any associated Common Events. @ --------------------------------------------------------------------------

No arguments are declared.

### Export: Current Troop Text

- Command ID: `ExportCurTroopText`
- Description: PLAY TEST ONLY. Exports all of the text on the current troop, the troop's event pages, and any associated Common Events. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_Game`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Game: Open URL

- Command ID: `OpenURL`
- Description: Opens a website URL from the game.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| URL:str | URL | — | &lt;external-url&gt; | — | Where do you want to take the player? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Gold`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Gold: Gain/Lose

- Command ID: `GoldChange`
- Description: Allows you to give/take more gold than the event editor limit.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| value:eval | Value | — | 0 | — | How much gold should the player gain/lose? Use negative values to remove gold. You may use JS. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Map`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Map: Once Parallel

- Command ID: `MapOnceParallel`
- Description: Plays a Common Event parallel to the event once without repeating itself when done. Map only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| CommonEventID:num | Common Event ID | common_event | 1 | — | The ID of the parallel Common Event to play. Does NOT repeat itself when finished. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Picture`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Picture: Coordinates Mode

- Command ID: `PictureCoordinatesMode`
- Description: Play Test Mode only! Gets the coordinates of a specific picture as you move it across the screen.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:num | Picture ID | number | 1 | — | The ID of the pictures to track the coordinates of. @ -------------------------------------------------------------------------- |

### Picture: Easing Type

- Command ID: `PictureEasingType`
- Description: Changes the easing type to a number of options.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| pictureId:num | Picture ID | number | 1 | — | Which picture do you wish to apply this easing to? |
| easingType:str | Easing Type | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| LineBreak | ------------------------ | — | -------------------------------- | — | — |
| Instructions1 | Instructions | — | Insert this Plugin Command after | — | — |
| Instructions2 | - | — | a "Move Picture" event command. | — | — |
| Instructions3 | - | — | Turn off "Wait for Completion" | — | — |
| Instructions4 | - | — | in the "Move Picture" event. | — | — |
| Instructions5 | - | — | You may have to add in your own | — | — |
| Instructions6 | - | — | "Wait" event command after. | — | @ -------------------------------------------------------------------------- |

### Picture: Erase All

- Command ID: `PictureEraseAll`
- Description: Erases all pictures on the screen because it's extremely tedious to do it one by one. @ --------------------------------------------------------------------------

No arguments are declared.

### Picture: Erase Range

- Command ID: `PictureEraseRange`
- Description: Erases all pictures within a range of numbers because it's extremely tedious to do it one by one.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| StartID:num | Starting ID | number | 1 | — | The starting ID of the pictures to erase. |
| EndingID:num | Ending ID | number | 100 | — | The ending ID of the pictures to erase. @ -------------------------------------------------------------------------- |

### Picture: Rotate By Angle

- Command ID: `PictureRotateBy`
- Description: Rotates target picture by a amount angle over a set duration instead of continuously.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:eval | Picture ID Number | — | 1 | — | What is the ID of the picture you wish to rotate? Use a number between 1 and 100. You may use JavaScript code. |
| AdjustAngle:eval | Adjust Angle | — | 0 | — | What is the angle you wish to rotate the picture by? Use degrees (360 degrees per full rotation). |
| easingType:str | Easing Type | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| Duration:eval | Duration | — | 60 | — | Duration of rotation effect in frames. 60 frames = 1 second. You may use JavaScript code. |
| Wait:eval | Wait for Completion | boolean | true | — | Wait until completion before moving onto the next event? @ -------------------------------------------------------------------------- |

### Picture: Rotate to Angle

- Command ID: `PictureRotate`
- Description: Rotates target picture to a certain angle over a set duration instead of continuously.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:eval | Picture ID Number | — | 1 | — | What is the ID of the picture you wish to rotate? Use a number between 1 and 100. You may use JavaScript code. |
| TargetAngle:eval | Target Angle | — | 0 | — | What is the target angle you wish to rotate the picture? Use degrees (360 degrees per full rotation). |
| easingType:str | Easing Type | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| Duration:eval | Duration | — | 60 | — | Duration of rotation effect in frames. 60 frames = 1 second. You may use JavaScript code. |
| Wait:eval | Wait for Completion | boolean | true | — | Wait until completion before moving onto the next event? @ -------------------------------------------------------------------------- |

### Picture: Show Icon

- Command ID: `PictureShowIcon`
- Description: Shows an icon instead of a picture image. The picture icon can be controlled like any other picture.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — |
| PictureID:eval | Picture ID Number | — | 1 | — | What is the ID of the picture you wish to show at? Use a number between 1 and 100. You may use JavaScript code. |
| IconIndex:eval | Icon Index | — | 23 | — | Select the icon index to use for this picture. You may use JavaScript code. |
| Smooth:eval | Smooth Icon? | boolean | false | — | This will make the icon smoothed out or pixelated. |
| PictureSettings | Picture Settings | — | — | — | — |
| Settings:struct | Settings | struct&lt;ShowPicture&gt; | {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"} | — | Alter the settings for how the picture will be shown. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_ScreenShake`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Screen Shake: Custom

- Command ID: `ScreenShake`
- Description: Creates a custom screen shake effect and also sets the following uses of screen shake to this style.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Type:str | Shake Style | select | random | Original=original; Random=random; Horizontal=horizontal; Vertical=vertical | Select shake style type. |
| Power:num | Power | number | 5 | — | Power level for screen shake. |
| Speed:num | Speed | number | 5 | — | Speed level for screen shake. |
| Duration:eval | Duration | — | 60 | — | Duration of screenshake. You can use code as well. |
| Wait:eval | Wait for Completion | boolean | true | — | Wait until completion before moving onto the next event? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Switch`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Switches: Randomize ID(s)

- Command ID: `SwitchRandomizeOne`
- Description: Select specific Switch ID's to randomize ON/OFF.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| IDs:arraynum | Switch ID(s) | switch\[\] | \["1"\] | — | Select which Switch ID(s) to toggle. |
| Chance:num | Chance for ON | number | 50 | — | Chance out of 100 that determines the switches to be ON. @ -------------------------------------------------------------------------- |

### Switches: Randomize Range

- Command ID: `SwitchRandomizeRange`
- Description: Select specific Switch ID Range to randomize ON/OFF. The ratio determines the ON/OFF distribution.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| StartID:num | Starting ID | switch | 1 | — | The starting ID of the Switch to toggle. |
| EndingID:num | Ending ID | switch | 20 | — | The ending ID of the Switch to toggle. |
| Chance:num | Chance for ON | number | 50 | — | Chance out of 100 that determines the switches to be ON. @ -------------------------------------------------------------------------- |

### Switches: Toggle ID(s)

- Command ID: `SwitchToggleOne`
- Description: Select specific Switch ID's to toggle ON/OFF. ON becomes OFF. OFF becomes ON.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| IDs:arraynum | Switch ID(s) | switch\[\] | \["1"\] | — | Select which Switch ID(s) to toggle. @ -------------------------------------------------------------------------- |

### Switches: Toggle Range

- Command ID: `SwitchToggleRange`
- Description: Select specific Switch ID Range to toggle ON/OFF. ON becomes OFF. OFF becomes ON.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| StartID:num | Starting ID | switch | 1 | — | The starting ID of the Switch to toggle. |
| EndingID:num | Ending ID | switch | 20 | — | The ending ID of the Switch to toggle. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_System`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### System: Battle System Change

- Command ID: `SystemSetBattleSystem`
- Description: Switch to a different battle system in-game. Some battle systems REQUIRE their specific plugins!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| option:str | Change To | select | database | Database Default (Use game database setting)=database; -=database; DTB: Default Turn Battle=dtb; TPB Active: Time Progress Battle (Active)=tpb active; TPB Wait: Time Progress Battle (Wait)=tpb wait; -=database; BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)=btb; CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)=ctb; ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)=etb; FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)=ftb; OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)=otb; PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)=ptb; STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)=stb | Choose which battle system to switch to. @ -------------------------------------------------------------------------- |

### System: Load Images

- Command ID: `SystemLoadImages`
- Description: Allows you to (pre) load up images ahead of time.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| animations:arraystr | img/animations/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| battlebacks1:arraystr | img/battlebacks1/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| battlebacks2:arraystr | img/battlebacks2/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| characters:arraystr | img/characters/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| enemies:arraystr | img/enemies/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| faces:arraystr | img/faces/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| parallaxes:arraystr | img/parallaxes/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| pictures:arraystr | img/pictures/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| sv_actors:arraystr | img/sv_actors/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| sv_enemies:arraystr | img/sv_enemies/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| system:arraystr | img/system/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| tilesets:arraystr | img/tilesets/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| titles1:arraystr | img/titles1/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? |
| titles2:arraystr | img/titles2/ | file\[\] | \[\] | — | Which files do you wish to load from this directory? @ -------------------------------------------------------------------------- |

### System: Main Font Size

- Command ID: `SystemSetFontSize`
- Description: Set the game's main font size.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| option:num | Change To | number | 26 | — | Change the font size to this number. @ -------------------------------------------------------------------------- |

### System: Side View Battle

- Command ID: `SystemSetSideView`
- Description: Switch between Front View or Side View for battle.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| option:str | Change To | select | Toggle | Front View; Side View; Toggle | Choose which view type to switch to. @ -------------------------------------------------------------------------- |

### System: Window Padding

- Command ID: `SystemSetWindowPadding`
- Description: Change the game's window padding amount.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| option:num | Change To | number | 12 | — | Change the game's standard window padding to this value. Default: 12 @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_TextPopup`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Text Popup: Show Text

- Command ID: `TextPopupShow`
- Description: Adds text to a text popup window to briefly appear. Multiple text popups will be queued.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| text:json | Text | note | "Insert message here." | — | Write the text that you want to appear here. You may use text codes. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Variable`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Variable: JS Eval

- Command ID: `VariableEvalReference`
- Description: Pick a variable ID and value to alter through JS. Functions like RM2k3's Variable Pointers.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| id:eval | Variable ID | — | 1 | — | This is the target variable to alter. You may use JavaScript. ie: $gameVariables.value(1) |
| operation:str | Operation Type | select | = | Set==; Add=+; Sub=-; Mul=*; Div=/; Mod=% | What operation do you wish to use for this Plugin Command? |
| operand:eval | Operand Modifier | — | 0 | — | Value to be used in calculating the target variable. You may use JavaScript. ie: $gameVariables.value(1) @ -------------------------------------------------------------------------- |

### Variable: JS Block

- Command ID: `VariableJsBlock`
- Description: Pick a variable ID and value to alter through JS. Functions like RM2k3's Variable Pointers.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| id:func | Variable ID | note | "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;" | — | This is the target variable to alter. You may use JavaScript. ie: $gameVariables.value(1) |
| operation:str | Operation Type | select | = | Set==; Add=+; Sub=-; Mul=*; Div=/; Mod=% | What operation do you wish to use for this Plugin Command? |
| operand:func | Operand Modifier | note | "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;" | — | Value to be used in calculating the target variable. You may use JavaScript. ie: $gameVariables.value(1) @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Core Engine plugin is designed to fix any bugs that may have slipped
past RPG Maker MZ's source code and to give game devs more control over
RPG Maker MZ's various features, ranging from mechanics to aesthetics to
quality of life improvements.

Features include all (but not limited to) the following:

* Bug fixes for the problems existing in the RPG Maker MZ base code.
* Failsafes added for Script Call related event commands.
* Lots of Quality of Life Settings that can be activated through the
Plugin Parameters.
* Control over the various Text Colors used throughout the game.
* Change up the maximum amount of gold carried, give it an icon attached to
the label, and include text for overlap specifics.
* Preload images as the game boots up.
* Add specific background images for menus found throughout the game.
* A button assist window will appear at the top or bottom of the screen,
detailing which buttons do what when inside a menu. This feature can be
turned off.
* Choose which in-game battler parameters to display inside menus (ie ATK,
DEF, AGI, etc.) and determine their maximum values, along with plenty of
notetags to give more control over parameter, x-parameter, s-parameter
bonuses through equipment, states, and other trait objects.
* Control over how the UI objects appear (such as the menu button, cancel
button, left/right actor switch buttons).
* Reposition actors and enemies if the battle resolution is larger.
* Allow class names and nicknames to support text codes when displayed.
* Determine how windows behave in the game, if they will mask other windows,
their line height properties, and more.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 0 ------

This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ Plugin library.

Important Changes: Bug Fixes

This plugin also serves to fix various bugs found in RPG Maker MZ that have
been unaddressed or not yet taken care of. The following is a list of bugs
that have been fixed by this plugin:

---

Attack Skill Trait

Enemies are unaffected by the Attack Skill Trait. This means if they have
an Attack action, they will always use Attack over and over even if their
Attack Skill Trait has been changed. This plugin will change it up so that
the Attack skill will comply with whatever their Attack Skill Trait's skill
is set to.

---

Auto Battle Actor Skill Usage

If an actor with Auto Battle has access to a skill but not have any access
to that skill's type, that actor will still be able to use the skill during
Auto Battle despite the fact that the actor cannot use that skill during
manual input.

---

Auto Battle Attack Seal Bypass

By default, if the attack skill is sealed via a trait and an actor has
auto-battle, the action can still be used via auto-battle. This is now fixed
and actors should not be able to attack via auto-battle if their attack
ability is sealed.

---

Auto Battle Lock Up

If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
they will not use any actions at all. This can cause potential game freezing
and softlocks. This plugin will change that and have them default to a
regular Attack.

---

Auto Save After New Game

Normally, when starting a new game through the "New Game" option, there is
no auto save trigger. However, if you start a new game or load a saved game,
then go to the Game End screen, return back to the title screen, then start
a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
will now patch this and prevent the trigger from taking place.

---

Battle Forced End Action Crash

Depending on various circumstances, currently active battlers can be cleared
from the battle system at will due to a number of reasons. However, if it
just so happens that the targets are cleared, too, with actions remaining,
then a crash will follow up. This plugin will prevent that change. Fix made
by Olivia.

---

Debug Console Refresh Bug

When pressing F5 to refresh while the debug console (DevTools) is open,
some graphics will fail to load properly. This started occurring since the
RPG Maker MZ 1.5.0 update and the code for loading the images has now been
reverted to the 1.4.4 version where it was last stable.

---

Gamepad Repeat Input

Cleared inputs on gamepads do not have a downtime and will trigger the
following input frame. The causes problems with certain RPG Maker MZ menus
where the inputs have to be cleared as the next immediate frame will have
them inputted again. This plugin changes it so that whenever inputs are
cleared, there is a downtime equal to the keyboard clear frames before the
gamepad input is registered once more.

---

Invisible Battle Sprites

If you removed a party member during battle and added that exact party
member back into the same slot, their sprite would appear invisible. The
VisuStella Core Engine will fix this problem and prevent it from happening.

---

Instant Text Discrepancy for Window_Message

Window_Message displays text differently when it draws letters one by one
versus when the text is displayed instantly. This isn't noticeable with the
default font, but it's very visible when using something like Arial. The
error is due to Bitmap.measureTextWidth yielding a rounded value per letter
versus per word. The Core Engine will provide a bug fix that will single out
the cause and make it so that only Window_Message will not utilize any round
number values when determining the width of each letter, whether or not it
is shown instantly. This change will only affect Window_Message and not any
other window in order to prevent unintended side effects.

This can be disabled through the Plugin Parameters:

Plugin Parameters > QoL Settings > Misc > Font Width Fix

---

Move Picture, Origin Differences

If a Show Picture event command is made with an Origin setting of
"Upper Left" and a Move Picture event command is made afterwards with an
Origin setting of "Center", RPG Maker MZ would originally have it instantly
jump into the new origin setting without making a clean transition between
them. This plugin will create that clean transition between origins.

---

Overly-Protective Substitute

When an ally with critical health is being targeted by a friendly non-
Certain Hit skill (such as a heal or buff) and another ally has the
substitute state, the other ally would "protect" the originally targeted
ally and take the heal or buff.

The new changed behavior is that now, substitute will not trigger for any
actions whose scope targets allies.

---

Skill List Active After Party Member Change

If the skill list is active (ie. the player can move the cursor around) and
the party member currently being viewed is changed via the button commands,
then previously, RPG Maker MZ would still have that window be active despite
having the cursor hidden temporarily. Upon pressing direction buttons, the
cursor reveals itself and both the skill type window and skill list window
are both active, making way for lots of potential problems to happen.

---

Sprite Removal and Destroy Crash

A texture check will now occur for sprites that are being removed and
destroyed in order to prevent crashes. In the off chance that someone
creates a sprite through a script call and removes it through such, the
likelihood of this occurance becomes higher. This makes the "destroy"
property take into account a texture check in order to see if the sprite
removal is taking extra steps and will reduce those extra steps.

---

Status Window Name Vertical Cutoffs

In the battle status windows, whenever actor names are displayed, the bitmap
used to display their name text do not extend vertically all the way,
causing letters like lowercase "Q" and "G" to be cut off, making them hard
to distinguish from one another. The Core Engine will remedy this by
extending the bitmap to allow enough room. Fix made by Irina.

---

Termination Clear Effects

In RPG Maker MZ, requesting an animation while transitioning between
scenes, such as going from the map scene to the battle scene, can cause
crashes. This is because the animation queue does not take off immediately
and will likely register incorrect targets for the scene. This plugin will
forcefully clear any registered animations and balloon effects when
terminating a scene in order to prevent crashes.

---

Timer Sprite

By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
maps or for battles. There is one major problem with this: when spritesets
are affected by filters, zooms, and/or blurs, this hinders how readable the
timer sprite is, making the information perceived by the player to be much
harder than it needs to be. The Core Engine adds the sprite to the parent
scene instead of the spriteset to ensure it's unobscured by anything else.

---

Unusable Battle Items

If any party member is able to use an item in battle, then all party members
are able to use said item, even if that party member is supposed to be
unable to use that item. This is now changed so that battle items are
checked on an individual basis and not on a party-wide basis.

---

Water Tile Bug

It seems like there's a new bug that occurs if you create a tileset from
does is it causes many tiles to become water tiles without intending to.
You can find this out by turning off all the plugins in your project,
putting a Ship or Boat on what are normally ground tiles, and then seeing
the Ship or Boat traverse through it.

There are two ways to fix this. We cannot fix it through code in this plugin
as it's a problem that involves the tileset json data there are ways to work
around it so that you can get the proper water-flags to go where they need
to be at.

1. Copy a working un-bugged tileset onto the currently bugged one and
reapply the tile features like passability, terrain tags, etc. This will
make sure the water-passability tiles get copied over correctly.

un-bugged tileset (usually a pre-existing tileset when a new project is
made), click the "Copy Page" button, go to the bugged tileset and press
"Paste Page". You'll have to reapply any different properties like
passabilities and terrain tags, but the water tile flags should now be
working properly.

The plugin will not fix the problem itself since flag data is delicate and
should not be tampered with midgame as the changes made by the plugin might
not match the desired settings.

This plugin, however, will also send out an alert message when coming across
such a tile. Pay attention to it and do one of the following two steps above
to fix the problem.

---

Window Arrows Sprite Tearing

If a window object in RPG Maker MZ were to have an odd number for width size
then the arrow elements found for the window would be positioned on a half
pixel, giving it a blurry look and also have sprite tearing issues. This is
now fixed by rounding the number to the nearest whole number.

---

Window Client Area Scaling Bug

If the window has a scale value different from 1.0, the client area (the
interactable parts) will not scale properly and appear clipped out. This
is now fixed by adjusting the client area to the window's scale values and
rounding upward to the nearest whole number.

---

Window Skin Bleeding

been set from 96 to 95. This results in the window skin bleeding past the
window's intended borders. The Core Engine now reverts this change to
prevent the bleeding effect from happening.

---

Major Changes: New Hard-Coded Features

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Scroll-Linked Pictures

- If a Parallax has a ! at the start of its filename, it is bound to the map
scrolling. The same thing now happens with pictures. If a Picture has a ! at
the start of its filename, it is bound to the map's scrolling as well.

---

Movement Route Scripts

- If code in a Movement Route Script command fails, instead of crashing the
game, it will now act as if nothing happened except to display the cause of
the error inside the console.

---

Script Call Failsafes

- If code found in Conditional Branches, Control Variables, and/or Script
Calls fail to activate, instead of crashing the game, it will now act as if
nothing happened except to display the cause of the error inside the
console.

---

Digit Grouping

- There exists an option to change how numbers are displayed and converted
in your game. This option can be enabled or disabled by going into the
Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
Digit Grouping and toggling on/off whichever ones you want.

- Digit Grouping will follow the rules of whatever country/locale the Plugin
Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
instead.

- This uses JavaScript's Number.toLocaleString() function and will therefore
follow whatever rules it has. This means if there are trailing zeroes at the
end of a decimal, it will cut them off. Numbers like 123.45000 will become
123.45 instead. Excess numbers past 6 decimal places will be rounded. A
number like 0.123456789 will become 0.123457 instead.

- Numbers in between [ and ], < and > will be excluded from digit grouping
in order for text codes to be preserved accurately. \I[1234] will remain as
\I[1234].

- If you would like to enter in a number without digit grouping, surround it
with {{ and }}. Typing in {{1234567890}} will yield 1234567890.

---

Show Scrolling Text, additional functionality

The event command "Show Scrolling Text" now has additional functionality as
long as the VisuStella MZ Core Engine is installed. If the game dev inserts
"// Script Call" (without the quotes) inside the scrolling text, then the
entirity of the Show Scrolling Text event command will be ran as a giant
script call event command.

The reason why this functionality is added is because the "Script..." event
command contains only 12 lines maximum. This means for any script call
larger than 12 lines of code cannot be done by normal means as each script
call is ran as a separate instance.

By repurposing the "Show Scrolling Text" event command to be able to
function as an extended "Script..." event command, such a thing is now
possible with less hassle and more lines to code with.

This effect does not occur if the Show Scrolling Text event command does not
have "// Script Call" in its contents.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Actors-Related Notetags ===

Parameter limits can be adjusted in the Plugin Parameters, but this won't
lift the ability to change the values of an actor's initial or max level
past the editor's limits. Instead, this must be done through the usage of
notetags to accomplish the feat.

---

<Max Level: x>

- Used for: Actor Notetags
- Replace 'x' with an integer to determine the actor's max level.
- This allows you to go over the database limit of 99.
- If this notetag isn't used, default to the actor's database value.

---

<Initial Level: x>

- Used for: Actor Notetags
- Replace 'x' with an integer to determine the actor's initial level.
- This allows you to go over the database limit of 99.
- If this notetag isn't used, default to the actor's database value.

---

=== Classes-Related Notetags ===

As actor levels can now surpass 99 due to the notetag system, there may be
some skills you wish certain classes can learn upon reaching higher levels
past 99, too.

---

<Learn At Level: x>

- Used for: Class Skill Learn Notetags
- Replace 'x' with an integer to determine the level this class will learn
the associated skill at.
- This allows you to go over the database limit of 99.
- If this notetag isn't used, default to the class's database value.

---

=== Enemies-Related Notetags ===

Enemies are now given levels. The levels don't do anything except to serve
as a container for a number value. This way, levels can be used in damage
formulas (ie. a.atk - b.level) without causing any errors. To give enemies
levels, use the notetags below. These notetags also allow you to adjust the
base parameters, EXP, and Gold past the database limitations.

---

<Level: x>

- Used for: Enemy Notetags
- Replace 'x' with an integer to determine the enemy's level.
- If no level is declared, the level will default to 1.

---

<param: x>

- Used for: Enemy Notetags
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to alter.
- This notetag does NOT work with X Parameters, S Parameters, or any
custom parameters. This notetag ONLY works with the base parameters.
- Replace 'x' with an integer to set an enemy's 'param' base value.
- This will overwrite the enemy's database value and can exceed the original
value limitation in the database.
- If these notetags aren't used, default to the enemy's database value.

---

<EXP: x>
<Gold: x>

- Used for: Enemy Notetags
- Replace 'x' with an integer to determine the enemy's EXP or Gold values.
- This will overwrite the enemy's database value and can exceed the original
value limitation in the database.
- If these notetags aren't used, default to the enemy's database value.

---

=== Animations-Related Notetags ===

Animations in RPG Maker MZ are done by Effekseer and the animation system
has been revamped. However, the animations are only centered on the targets
now, and cannot be attached to the head or foot. Insert these tags into
the names of the animations in the database to adjust their positions.

---

<Head>
<Foot>

- Used for: Animation Name Tags
- Will set the animation to anchor on top of the sprite (if <Head> is used)
or at the bottom of the sprite (if <Foot> is used).

---

<Anchor X: x>
<Anchor Y: y>

<Anchor: x, y>

- Used for: Animation Name Tags
- Will anchor the animation at a specific point within the sprite based on
the 'x' and 'y' values.
- Replace 'x' and 'y' with numeric values representing their positions based
on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
the furthest right/down (x, y respectively).

Examples:

<Anchor X: 0.4>
<Anchor Y: 0.8>

<Anchor: 0.2, 0.9>

---

<Offset X: +x>
<Offset X: -x>
<Offset Y: +y>
<Offset Y: -y>

<Offset: +x, +y>
<Offset: -x, -y>

- Used for: Animation Name Tags
- Will anchor the animation to be offset by an exact number of pixels.
- This does the same the editor does, except it lets you input values
greater than 999 and lower than -999.
- Replace 'x' and 'y' with numeric values the exact number of pixels to
offset the animation's x and y coordinates by.

Examples:

<Offset X: +20>
<Offset Y: -50>

<Offset: +10, -30>

---

<Mirror Offset X>
<No Mirror Offset X>

- Used for: Animation Name Tags
- If an animation is mirrored, you can choose to have the animation's Offset
X value be mirrored, too (or not at all).
- If no name tag is discovered, this will use the setting found in the
Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.

---

<Rate: x>

- Used for: MV Animation Name Tags
- Allows you to adjust the update for this MV Animation.
- Does NOT work with Effekseer animations.
- The lower the number, the faster.
- Replace 'x' with a number representing the animation update rate.
- Default rate: 4.
- Minimum rate: 1.
- Maximum rate: 10.

---

=== Quality of Life-Related Notetags ===

By default, RPG Maker MZ does not offer an encounter step minimum after a
random encounter has finished. This means that one step immediately after
finishing a battle, the player can immediately enter another battle. The
Quality of Life improvement: Minimum Encounter Steps allows you to set a
buffer range between battles for the player to have some breathing room.

---

<Minimum Encounter Steps: x>

- Used for: Map Notetags
- Replace 'x' with the minimum number of steps before the player enters a
random encounter on that map.
- If this notetag is not used, then the minimum encounter steps for the map
will default to Quality of Life Settings => Encounter Rate Min.

---

Tile shadows are automatically added to certain tiles in the map editor.
These tile shadows may or may not fit some types of maps. You can turn them
on/off with the Quality of Life Plugin Parameters or you can override the
settings with the following notetags:

---

<Show Tile Shadows>
<Hide Tile Shadows>

- Used for: Map Notetags
- Use the respective notetag for the function you wish to achieve.
- If this notetag is not used, then the minimum encounter steps for the map
will default to Quality of Life Settings => No Tile Shadows.

---

<Scroll Lock X>
<Scroll Lock Y>

- Used for: Map Notetags
- Will prevent the map from being able to scroll left/right(x) or up/down(y)
if these notetags are present.
- Useful for when maps are just slightly smaller than normal and the tiny
scrolling is distracting.
- This will use the display nudge setting found in the Plugin Parameters.
- This setting will be disabled if the map is zoomed in.

---

<Scroll Lock X: x>
<Scroll Lock Y: y>

- Used for: Map Notetags
- Will prevent the map from being able to scroll left/right(x) or up/down(y)
if these notetags are present and will nudge the map camera slightly.
- Useful for when maps are just slightly smaller than normal and the tiny
scrolling is distracting.
- Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
being judged.
- For example, for a 1280x720 resolution, a 27 tile wide map will benefit
from a nudge of 0.15625. Play with these numbers to determine the best
value for your maps.
- This setting will be disabled if the map is zoomed in.

---

=== Basic, X, and S Parameters-Related Notetags ===

A battler's parameters, or stats as some devs know them as, are the values
that determine how a battler performs. These settings allow you to alter
behaviors and give boosts to trait objects in a more controlled manner.

---

<param Plus: +x>
<param Plus: -x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Adds or subtracts 'x' to 'param' plus value when calculating totals.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'x' with an integer on how much to adjust the parameter by.
- This is used to calculate the 'plus' portion in the Parameter Settings =>
Basic Parameter => Formula.

---

<param Rate: x%>
<param Rate: x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Changes 'param' rate to 'x' to alter the total 'param' value.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'paramRate' portion in Parameter Settings =>
Basic Parameter => Formula.

---

<param Flat: +x>
<param Flat: -x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Adds or subtracts 'x' to 'param' plus value when calculating totals.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'x' with an integer on how much to adjust the parameter by.
- This is used to calculate the 'flatBonus' portion in Parameter Settings =>
Basic Parameter => Formula.

---

<param Max: x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Sets max caps for the 'param' to be 'x'. If there are multiple max caps
available to the unit, then the highest will be selected.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'x' with an integer to determine what the max cap should be.
- This does NOT set the max cap to be lower than the default cap.

---

<xparam Plus: +x%>
<xparam Plus: -x%>

<xparam Plus: +x.x>
<xparam Plus: -x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
- Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'plus' portion in the Parameter Settings =>
X Parameter => Formula.

---

<xparam Rate: x%>
<xparam Rate: x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Changes 'param' rate to 'x' to alter the total 'xparam' value.
- Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'paramRate' portion in Parameter Settings =>
X Parameter => Formula.

---

<xparam Flat: +x%>
<xparam Flat: -x%>

<xparam Flat: +x.x>
<xparam Flat: -x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
- Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'flatBonus' portion in Parameter Settings =>
X Parameter => Formula.

---

<sparam Plus: +x%>
<sparam Plus: -x%>

<sparam Plus: +x.x>
<sparam Plus: -x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
- Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'plus' portion in the Parameter Settings =>
S Parameter => Formula.

---

<sparam Rate: x%>
<sparam Rate: x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Changes 'param' rate to 'x' to alter the total 'sparam' value.
- Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'paramRate' portion in Parameter Settings =>
S Parameter => Formula.

---

<sparam Flat: +x%>
<sparam Flat: -x%>

<sparam Flat: +x.x>
<sparam Flat: -x.x>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
- Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
- Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
- This is used to calculate the 'flatBonus' portion in Parameter Settings =>
S Parameter => Formula.

---

=== Tileset-Related Notetags ===

---

<Taller By x: id>

- Used for: Tileset Notetags
- Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
by 'x' tiles.
- Replace 'x' with a number representing the tiles to be taller by.
- Replace 'id' with a number representing the Terrain Tag you will use to
mark this tile with in the Database editor.
- When placing these tiles on the map, all you have to do is just place the
bottom tile.
- ie.: For a tree that's one tile taller, just place the tile at the
bottom where you see the trunk.
- Then, in-game, the tree will appear taller by one tile as marked.
- Depending on the priority settings, the tile will appear on different
layers.
- O will place the tile on the below player layer.
- X will place the tile on the same level as the player.
- ★ will place the tile on the above player layer.
- O/X layer tiles have a special property where tall sprites standing in
front of it will no longer clip the top of the sprite, while sprites
standing behind it will be covered by it.
- The X layer sprite will only have a hitbox of 1x1 at the base.
- This does not work with events using tiles as graphics. Instead, if you
want to do similar, use the Event & Movement Core's <Tile Expand> notetags
for better control.

---

=== JavaScript Notetags: Basic, X, and S Parameters ===

The following are notetags made for users with JavaScript knowledge. These
notetags are primarily aimed at Basic, X, and S Parameters.

---

<JS param Plus: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'param' plus value.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
plus amount for the parameter's total calculation.
- This is used to calculate the 'plus' portion in the Parameter Settings =>
Basic Parameter => Formula.

---

<JS param Rate: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'param' rate value.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
param rate amount for the parameter's total calculation.
- This is used to calculate the 'paramRate' portion in Parameter Settings =>
Basic Parameter => Formula.

---

<JS param Flat: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'param' flat value.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
flat bonus amount for the parameter's total calculation.
- This is used to calculate the 'flatBonus' portion in Parameter Settings =>
Basic Parameter => Formula.

---

<JS param Max: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to determine what the max cap for 'param' should be. If there
are multiple max caps available to the unit, then the highest is selected.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter to modify.
- Replace 'code' with JavaScript code to determine the max cap for the
desired parameter.

---

<JS xparam Plus: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'xparam' plus value.
- Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
plus amount for the X parameter's total calculation.
- This is used to calculate the 'plus' portion in the Parameter Settings =>
X Parameter => Formula.

---

<JS xparam Rate: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'xparam' rate value.
- Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
param rate amount for the X parameter's total calculation.
- This is used to calculate the 'paramRate' portion in Parameter Settings =>
X Parameter => Formula.

---

<JS xparam Flat: code>
- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'xparam' flat value.
- Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
flat bonus amount for the X parameter's total calculation.
- This is used to calculate the 'flatBonus' portion in Parameter Settings =>
X Parameter => Formula.

---

<JS sparam Plus: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'sparam' plus value.
- Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
plus amount for the S parameter's total calculation.
- This is used to calculate the 'plus' portion in the Parameter Settings =>
S Parameter => Formula.

---

<JS sparam Rate: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'sparam' rate value.
- Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
param rate amount for the S parameter's total calculation.
- This is used to calculate the 'paramRate' portion in Parameter Settings =>
S Parameter => Formula.

---

<JS sparam Flat: code>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs 'code' to change the 'sparam' flat value.
- Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
- Replace 'code' with JavaScript code to determine how much to change the
flat bonus amount for the S parameter's total calculation.
- This is used to calculate the 'flatBonus' portion in Parameter Settings =>
S Parameter => Formula.

---

=== Battle Setting-Related Notetags ===

These tags will change the settings for battle regardless of how the battle
system is set up normally. Insert these tags in either the noteboxes of maps
or the names of troops for them to take effect. If both are present for a
specific battle, then priority goes to the setting found in the troop name.

---

<FV>
<Front View>
<Battle View: FV>
<Battle View: Front View>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Changes the perspective of battle to front view for this specific map or
battle.
- Make sure you have the enemy image files available in the img/enemies/
folder as they will used instead of the "sv_enemies" graphics.
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.

---

<SV>
<Side View>
<Battle View: SV>
<Battle View: Side View>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Changes the perspective of battle to side view for this specific map or
battle.
- Make sure you have the enemy image files available in the img/sv_enemies/
folder as they will used instead of the "enemies" graphics.
- Make sure your actors have "sv_actor" graphics attached to them.
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.

---

<DTB>
<Battle System: DTB>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Changes the battle system to the default battle system (DTB).
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.

---

<TPB Active>
<ATB Active>
<Battle System: TPB Active>
<Battle System: ATB Active>

<TPB Wait>
<ATB Wait>
<Battle System: TPB Wait>
<Battle System: ATB Wait>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Changes the battle system to the time progress battle system (TPB) or
active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
installed for the game project.
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.

---

<BTB>
<Battle System: BTB>

<CTB>
<Battle System: CTB>

<ETB>
<Battle System: ETB>

<FTB>
<Battle System: FTB>

<OTB>
<Battle System: OTB>

<PTB>
<Battle System: PTB>

<STB>
<Battle System: STB>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Changes the battle system to the respective battle system as long as you
have those plugins installed in the current project.
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.

---

<Grid>
<Battle Grid>

<No Grid>
<No Battle Grid>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Requires VisuMZ_2_BattleGridSystem!
- Changes the battle system to utilize the Battle Grid System or not.
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.
- If none of these notetags or comment tags are found, refer to the default
settings found in the Plugin Parameters.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Animation Commands ===

---

Animation: Play at Coordinate
- Plays an animation on the screen at a specific x, y coordinate even if
there is no sprite attached.

Animation ID:
- Plays this animation.

Coordinates:

X:
Y:
- X/Y coordinate used for the animation.
You may use JavaScript code.

Mirror Animation?:
- Mirror the animation?

Mute Animation?:
- Mute the animation?

---

=== Audio Plugin Commands ===

---

Audio: Change Current BGM Volume
- Changes the current BGM volume without changing any of the current BGM's
other properties and without restarting the BGM.

Volume:
- Change the current BGM's volume to what amount?
- You may use JavaScript code.
- Use numbers from 0 to 100.

---

Audio: Change Current BGM Pitch
- Changes the current BGM pitch without changing any of the current BGM's
other properties and without restarting the BGM.

Pitch:
- Change the current BGM's pitch to what amount?
- You may use JavaScript code.
- Use numbers from 50 to 150.

---

Audio: Change Current BGM Pan
- Changes the current BGM pan without changing any of the current BGM's
other properties and without restarting the BGM.

Pan:
- Change the current BGM's pan to what amount?
- You may use JavaScript code.
- Use numbers from -100 to 100.

---

Audio: Change Current BGM Volume
- Changes the current BGM volume without changing any of the current BGM's
other properties and without restarting the BGM.

Volume:
- Change the current BGM's volume to what amount?
- You may use JavaScript code.
- Use numbers from 0 to 100.

---

Audio: Change Current BGM Pitch
- Changes the current BGM pitch without changing any of the current BGM's
other properties and without restarting the BGM.

Pitch:
- Change the current BGM's pitch to what amount?
- You may use JavaScript code.
- Use numbers from 50 to 150.

---

Audio: Change Current BGM Pan
- Changes the current BGM pan without changing any of the current BGM's
other properties and without restarting the BGM.

Pan:
- Change the current BGM's pan to what amount?
- You may use JavaScript code.
- Use numbers from -100 to 100.

---

=== Debug Plugin Commands ===

---

Debug: Current Controller ID
- PLAY TEST ONLY.
- Shows current controller ID in debug console.
- If you press a key on the keyboard, this data will be erased.
- Also copies to computer clipboard if possible.

---

=== Export Plugin Commands ===

---

Export: All Maps Text
- PLAY TEST ONLY. Exports all of the text from all maps,
their events, event pages, and any associated Common Events.

- Exports 'Show Text' event commands.
- Exports 'Show Choices' event commands.
- Exports 'Show Scrolling Text' event commands.
- Exports 'Comments' event commands.
- Only the raw text will be exported.
- Only usable during Play Test.

---

Export: All Troops Text
- PLAY TEST ONLY. Exports all of the text from all troops,
their event pages, and any associated Common Events.

- Exports 'Show Text' event commands.
- Exports 'Show Choices' event commands.
- Exports 'Show Scrolling Text' event commands.
- Exports 'Comments' event commands.
- Only the raw text will be exported.
- Only usable during Play Test.

---

Export: Current Map Text
- PLAY TEST ONLY. Exports all of the text on the current map,
its events, the event pages, and any associated Common Events.

- Exports 'Show Text' event commands.
- Exports 'Show Choices' event commands.
- Exports 'Show Scrolling Text' event commands.
- Exports 'Comments' event commands.
- Only the raw text will be exported.
- Only usable during Play Test.
- If not in battle, this Plugin Command will not work.

---

Export: Current Troop Text
- PLAY TEST ONLY. Exports all of the text on the current troop,
the troop's event pages, and any associated Common Events.

- Exports 'Show Text' event commands.
- Exports 'Show Choices' event commands.
- Exports 'Show Scrolling Text' event commands.
- Exports 'Comments' event commands.
- Only the raw text will be exported.
- Only usable during Play Test.
- If not in battle, this Plugin Command will not work.

---

=== Game Plugin Commands ===

---

Game: Open URL
- Opens a website URL from the game.

URL:
- Where do you want to take the player?

---

=== Gold Plugin Commands ===

---

Gold: Gain/Lose
- Allows you to give/take more gold than the event editor limit.

Value:
- How much gold should the player gain/lose?
- Use negative values to remove gold.

---

=== Map Plugin Commands ===

---

Map: Once Parallel
- Plays a Common Event parallel to the event once without repeating itself
when done.
- Map only!

Common Event ID:
- The ID of the parallel Common Event to play.
- Does NOT repeat itself when finished.
- When exiting map scene or changing maps, all Once Parallels are cleared.
- Once Parallels are not retained upon reentering the scene or map.
- Once Parallels are not stored in memory and cannot be saved.

---

=== Picture Plugin Commands ===

---

Picture: Coordinates Mode
- Play Test Mode only! Gets the coordinates of a specific picture as you
move it across the screen.

Picture ID:
- The ID of the pictures to track the coordinates of.

---

Picture: Easing Type
- Changes the easing type to a number of options.

Picture ID:
- Which picture do you wish to apply this easing to?

Easing Type:
- Select which easing type you wish to apply.

Instructions:
- Insert this Plugin Command after a "Move Picture" event command.
- Turn off "Wait for Completion" in the "Move Picture" event.
- You may have to add in your own "Wait" event command after.

---

Picture: Erase All
- Erases all pictures on the screen because it's extremely tedious to do it
one by one.

---

Picture: Erase Range
- Erases all pictures within a range of numbers because it's extremely
tedious to do it one by one.

Starting ID:
- The starting ID of the pictures to erase.

Ending ID:
- The ending ID of the pictures to erase.

---

Picture: Rotate by Angle
- Rotates target picture by a amount angle over a set duration instead of
continuously.

Picture ID Number:
- What is the ID of the picture you wish to rotate?
- Use a number between 1 and 100.
- You may use JavaScript code.

Adjust Angle:
- What is the angle you wish to rotate the picture by?
- Use degrees (360 degrees per full rotation).
- You may use JavaScript code.

Easing Type:
- Select which easing type you wish to apply.

Duration:
- Duration of rotation effect in frames.
- 60 frames = 1 second.
- You may use JavaScript code.

Wait for Completion:
- Wait until completion before moving onto the next event?

---

Picture: Rotate to Angle
- Rotates target picture to a certain angle over a set duration
instead of continuously.

Picture ID Number:
- What is the ID of the picture you wish to rotate?
- Use a number between 1 and 100.
- You may use JavaScript code.

Target Angle:
- What is the target angle you wish to rotate the picture?
- Use degrees (360 degrees per full rotation).
- You may use JavaScript code.

Easing Type:
- Select which easing type you wish to apply.

Duration:
- Duration of rotation effect in frames.
- 60 frames = 1 second.
- You may use JavaScript code.

Wait for Completion:
- Wait until completion before moving onto the next event?

---

Picture: Show Icon
- Shows an icon instead of a picture image.
- The picture icon can be controlled like any other picture.

General:

Picture ID Number:
- What is the ID of the picture you wish to show at?
- Use a number between 1 and 100.
- You may use JavaScript code.

Icon Index:
- Select the icon index to use for this picture.
- You may use JavaScript code.

Smooth Icon?:
- This will make the icon smoothed out or pixelated.

Picture Settings:

Position:

Origin:
- What is the origin of this picture icon?
- Upper Left
- Center

Position X:
- X coordinate of the picture.
- You may use JavaScript code.

Position Y:
- Y coordinate of the picture.
- You may use JavaScript code.

Scale:

Width %:
- Horizontal scale of the picture.
- You may use JavaScript code.
- 100 is 100%

Height %:
- Vertical scale of the picture.
- You may use JavaScript code.
- 100 is 100%

Blend:

Opacity:
- Insert a number to determine opacity level.
- Use a number between 0 and 255.
- You may use JavaScript code.

Blend Mode:
- What kind of blend mode do you wish to apply to the picture?

---

=== Screen Shake Plugin Commands ===

---

Screen Shake: Custom:
- Creates a custom screen shake effect and also sets the following uses of
screen shake to this style.

Shake Style:
- Select shake style type.
- Original
- Random
- Horizontal
- Vertical

Power:
- Power level for screen shake.

Speed:
- Speed level for screen shake.

Duration:
- Duration of screenshake.
- You can use code as well.

Wait for Completion:
- Wait until completion before moving onto the next event?

---

=== Switch Plugin Commands ===

---

Switches: Randomize ID(s)
- Select specific Switch ID's to randomize ON/OFF.

Switch ID(s):
- Select which Switch ID(s) to toggle.

Chance for ON:
- Chance out of 100 that determines the switches to be ON.

---

Switches: Randomize Range
- Select specific Switch ID Range to randomize ON/OFF.
- The ratio determines the ON/OFF distribution.

Starting ID:
- The starting ID of the Switch to toggle.

Ending ID:
- The ending ID of the Switch to toggle.

Chance for ON:
- Chance out of 100 that determines the switches to be ON.

---

Switches: Toggle ID(s)
- Select specific Switch ID's to toggle ON/OFF.
- ON becomes OFF. OFF becomes ON.

Switch ID(s):
- Select which Switch ID(s) to toggle.

---

Switches: Toggle Range
- Select specific Switch ID Range to toggle ON/OFF.
- ON becomes OFF. OFF becomes ON.

Starting ID:
- The starting ID of the Switch to toggle.

Ending ID:
- The ending ID of the Switch to toggle.

---

=== System Plugin Commands ===

---

System: Battle System Change
- Switch to a different battle system in-game.
- Some battle systems REQUIRE their specific plugins!

Change To:
- Choose which battle system to switch to.
- Database Default (Use game database setting)
- -
- DTB: Default Turn Battle
- TPB Active: Time Progress Battle (Active)
- TPB Wait: Time Progress Battle (Wait)
- -
- BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
- CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
- OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
- STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)

---

System: Load Images
- Allows you to (pre) load up images ahead of time.

img/animations/:
img/battlebacks1/:
img/battlebacks2/:
img/enemies/:
img/faces/:
img/parallaxes/:
img/pictures/:
img/sv_actors/:
img/sv_enemies/:
img/system/:
img/tilesets/:
img/titles1/:
img/titles2/:
- Which files do you wish to load from this directory?

---

System: Main Font Size
- Set the game's main font size.

Change To:
- Change the font size to this number.

---

System: Side View Battle
- Switch between Front View or Side View for battle.

Change To:
- Choose which view type to switch to.

---

System: Window Padding
- Change the game's window padding amount.

Change To:
- Change the game's standard window padding to this value.

---

=== Text Popup Command ===

---

Text Popup: Show Text
- Adds text to a text popup window to briefly appear.
- Multiple text popups will be queued.
- Does not halt the game and works parallel to game activity.

Text:
- Write the text that you want to appear here.
- You may use text codes.

---

=== Variable Plugin Commands ===

---

Variable: JS Eval
- Pick a variable ID and value to alter through JS.
- Allows one line of code for variable ID and operand.
- Functions like RM2k3's Variable Pointers.

Variable ID:
- This is the target variable to alter.
- You may use JavaScript.
- ie: $gameVariables.value(1)

Operation Type:
- What operation do you wish to use for this Plugin Command?

Operand Modifier:
- Value to be used in calculating the target variable.
- You may use JavaScript.
- ie: $gameVariables.value(1)

---

Variable: JS Block
- Pick a variable ID and value to alter through JS.
- Allows JS block code for variable ID and operand.
- Functions like RM2k3's Variable Pointers.

Variable ID:
- This is the target variable to alter.
- You may use JavaScript.
- ie: $gameVariables.value(1)

Operation Type:
- What operation do you wish to use for this Plugin Command?

Operand Modifier:
- Value to be used in calculating the target variable.
- You may use JavaScript.
- ie: $gameVariables.value(1)

---

Plugin Parameters: Quality of Life Settings

A variety of (optional) settings and changes are added with the Core Engine
to improve the quality of life for both the game devs and players alike.

---

Play Test

New Game on Boot:
- Automatically start a new game on Play Test?
- Only enabled during Play Test.

No Play Test Mode:
- Force the game to be out of Play Test mode when play testing.

Open Console on Boot:
- Open the Debug Console upon booting up your game?
- Only enabled during Play Test.

F6: Toggle Sound:
- F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
the two.
- Only enabled during Play Test.

F7: Toggle Fast Mode:
- F7 Key Function: Toggle fast mode.
- Only enabled during Play Test.

CTRL + n: Quick Load:
- CTRL + a number from 1 to 9 will yield a quick load of that safe file.
- Does not count auto saves.

New Game > Common Event:
- Runs a common event each time a new game is started.
- Only enabled during Play Test.

---

Battle Test

Add Item Type:
Add Weapon Type:
Add Armor Type:
- Add copies of each database item, weapon, and/or armor?
- Effective only during battle test.

Added Quantity:
- Determines how many items are added during a battle test instead of
the maximum amount.

Shift+R: Recover All:
- For Play Test only!
- During battle, pressing SHIFT + R will refill the whole party's HP
and MP and status.

Shift+T: Full TP
- For Play Test only!
- During battle, pressing SHIFT + T will refill the whole party's TP.

---

Digit Grouping

Standard Text:
- Make numbers like 1234567 appear like 1,234,567 for standard text
inside windows?

Ex Text:
- Make numbers like 1234567 appear like 1,234,567 for ex text,
written through drawTextEx (like messages)?

Damage Sprites:
- Make numbers like 1234567 appear like 1,234,567 for in-battle
damage sprites?

Gauge Sprites:
- Make numbers like 1234567 appear like 1,234,567 for visible gauge
sprites such as HP, MP, and TP gauges?

Country/Locale
- Base the digit grouping on which country/locale?
- This will follow all of the digit grouping rules found here:
<external-url>

---

Player Benefit

Encounter Rate Min:
- Minimum number of steps the player can take without any
random encounters.

Escape Always:
- If the player wants to escape a battle, let them escape the battle
with 100% chance.

Accuracy Formula:
- Accuracy formula calculation change to
Skill Hit% * (User HIT - Target EVA) for better results.

Accuracy Boost:
- Boost HIT and EVA rates in favor of the player.

Level Up -> Full HP:
Level Up -> Full MP:
- Recovers full HP or MP when an actor levels up.

---

Picture-Related

Anti-Zoom Pictures:
- If on, prevents pictures from being affected by zoom.

Picture Containers > Detach in Battle:
- If detached, picture container will be separated from the spriteset
while on the battle scene.
- This will prevent any visual effects that alter the entire spriteset
from affecting the detached picture container.

Picture Containers > Detach in Map:
- If detached, picture container will be separated from the spriteset
while on the map scene.
- This will prevent any visual effects that alter the entire spriteset
from affecting the detached picture container.

---

Misc

Animation: Mirror Offset X:
- When animations are mirrored, mirror their Offset X values, too.
- The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
override this effect for that specific animation.

Font Shadows:
- If on, text uses shadows instead of outlines.

Font Smoothing:
- If on, smoothes fonts shown in-game.

Font Width Fix:
- Fixes the font width issue with instant display non-monospaced fonts
in the Message Window.

Key Item Protection:
- If on, prevents Key Items from being able to be sold and from being
able to be consumed.

Map Name Text Code:
- If on, map names will use text codes.
- If off, only the raw map name will be used.

Modern Controls:
- If on, allows usage of the Home/End buttons.
- Home would scroll to the first item on a list.
- End would scroll to the last item on a list.
- Shift + Up would page up.
- Shift + Down would page down.

MV Animation Rate:
- Adjusts the rate at which MV animations play.
- Default: 4.
- Lower for faster.
- Higher for slower.

NewGame > CommonEvent:
- Runs a common event each time a new game during any session is started.
- Applies to all types of sessions, play test or not.

No Tile Shadows:
- Removes tile shadows from being displayed in-game.

Pixel Image Rendering:
- If on, pixelates the image rendering (for pixel games).

Require Focus?
- Requires the game to be focused? If the game isn't focused, it will
pause if it's not the active window.

Shortcut Scripts:
- Enables shortcut-based script variables and functions that can be used
for script calls.
- Shortcut list enabled for this is as follows:

$commonEvent(id)
- Queues a common event.
- This does not interrupt the current event to run the desired common
event. Any queued common events will run after the current event list
has finished.
- Replace 'id' with the ID of the common event you wish to queue.
- Common events only run in the map scene and battle scene.

$onceParallel(id)
- Runs a common event in the background as a once parallel event.
- Once parallel events will run in the background like a parallel
process, except that it does not repeat after finishing.
- Replace 'id' with the ID of the common event you wish to run.
- Only works in the map scene and battle scene. Battle scene usage will
require VisuMZ_1_BattleCore.

$scene
- Returns current scene.

$spriteset
- Returns current scene's spriteset if there is one.

$subject
- Returns last recorded identity of the battle's subject/user.

$targets
- Returns last recorded targets marked in battle.

$target
- Returns last recorded target marked in battle.
- Works better with VisuMZ_1_BattleCore.

$event
- Returns currently initiated map event.

Smart Event Collision:
- Makes events only able to collide with one another if they're
'Same as characters' priority.

Subfolder Name Purge:
- Purge subfolder name from Plugin Parameters when reading data to let
Plugin Commands work properly.
- This is for plugins (such as the VisuMZ library) that utilize dynamic
name registrations for Plugin Commands. Turn this on if you plan on
using subfolders with VisuMZ plugins.

---

Plugin Parameters: Battle System

Choose which battle system to use for your game.

Some battle systems REQUIRE their specific plugins! This means if you do not
have the required battle system plugin installed, it will not change over.
The Core Engine plugin does not contain data for all of the battle systems
inside its code.

---

Database Default (Use game database setting)

-

DTB: Default Turn Battle
TPB Active: Time Progress Battle (Active)
TPB Wait: Time Progress Battle (Wait)

-

BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)

-

---

Plugin Parameters: Color Settings

These settings allow you, the game dev, to have more control over which
colors appear for what conditions found in the game. You can use regular
numbers to use the colors predetermined by the game's Window Skin or you
can use the #rrggbb format for a hex color code.

If the game's Window Skin is changed mid-game, the colors used will still be
based off the default Window Skin's colors. This is due to storing them in a
cache and preventing extra processing and reduces lag.

You can find out what hex codes belong to which color from this website:
<external-url>

---

Basic Colors
- These are colors that almost never change and are used globally throughout
the in-game engine.

Normal:
System:
Crisis:
Death:
Gauge Back:
HP Gauge:
MP Gauge:
MP Cost:
Power Up:
Power Down:
CT Gauge:
TP Gauge:
Pending Color:
EXP Gauge:
MaxLv Gauge:
- Use #rrggbb for custom colors or regular numbers
for text colors from the Window Skin.

---

Alpha Colors:
- These are colors that have a bit of transparency to them and are specified
by the 'rgba(red, green, blue, alpha)' format.
- Replace 'red' with a number between 0-255 (integer).
- Replace 'green' with a number between 0-255 (integer).
- Replace 'blue' with a number between 0-255 (integer).
- Replace 'alpha' with a number between 0 and 1 (decimal).

Window Font Outline:
Gauge Number Outline:
Dim Color:
Item Back Color:
- Colors with a bit of alpha settings.
- Format rgba(0-255, 0-255, 0-255, 0-1)

---

Conditional Colors:
- These require a bit of JavaScript knowledge. These determine what colors
to use under which situations and uses such as different values of HP, MP,
TP, for comparing equipment, and determine damage popup colors.

JS: Actor HP Color:
JS: Actor MP Color:
JS: Actor TP Color:
- Code used for determining what HP, MP, or TP color to use for actors.

JS: Parameter Change:
- Code used for determining whatcolor to use for parameter changes.

JS: Damage Colors:
- Code used for determining what color to use for damage types.

---

Plugin Parameters: Gold Settings

Gold is the main currency in RPG Maker MZ. The settings provided here will
determine how Gold appears in the game and certain behaviors Gold has.

---

Gold Settings

Gold Max:
- Maximum amount of Gold the party can hold.
- Default 99999999

Gold Font Size:
- Font size used for displaying Gold inside Gold Windows.
- Default: 26

Gold Icon:
- Icon used to represent Gold.
- Use 0 for no icon.

Gold Overlap:
- Text used too much Gold to fit in the window.

---

Plugin Parameters: Image Loading

Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
loading which means images are loaded when needed. This may cause delays in
when you want certain images to appear. However, if an image is loaded
beforehand, they can be used immediately provided they aren't removed from
the image cache.

---

Image Loading

img/animations/:
img/battlebacks1/:
img/battlebacks2/:
img/enemies/:
img/faces/:
img/parallaxes/:
img/pictures/:
img/sv_actors/:
img/sv_enemies/:
img/system/:
img/tilesets/:
img/titles1/:
img/titles2/:
- Which files do you wish to load from this directory upon starting
up the game?

---

Plugin Parameters: Keyboard Input Settings

Settings for the game that utilize keyboard input. These are primarily for
the name input scene (Scene_Name) and the number input event command. These
settings have only been tested on English keyboards and may or may not be
compatible with other languages, so please disable these features if they do
not fit in with your game.

If a controller is connected upon entering the name change scene, it will
use the default manual-entry mode instead of the keyboard-entry mode. If a
controller button is pressed during the keyboard-entry mode, it will
automatically switch to the manual-entry mode.

This plugin does not provide support for controllers that are undetected by
RPG Maker MZ's default controller support.

---

Controls

WASD Movement:
- Enables or disables WASD movement for your game project.
- Moves the W page down button to E.

R Button: Dash Toggle:
- Enables or disables R button as an Always Dash option toggle.

---

Name Input

Enable?:
- Enables keyboard input for name entry.
- Only tested with English keyboards.

Default Mode:
- Select default mode when entering the scene.
- Default - Uses Arrow Keys to select letters.
- Keyboard - Uses Keyboard to type in letters.

QWERTY Layout:
- Uses the QWERTY layout for manual entry.

Keyboard Message:
- The message displayed when allowing keyboard entry.
- You may use text codes here.

Banned Words:
- Players cannot use these words for names.
- These include words inside the names.
- If a banned word is used, a buzzer sound will play.

---

Number Input

Enable?:
- Enables keyboard input for number entry.
- Only tested with English keyboards.

---

Button Assist

Finish Entry:
- Text used to describe finish entry.

Page Change:
- Text used to describe character page changing.

Switch to Keyboard:
- Text used to describe the keyboard switch.

Switch To Manual:
- Text used to describe the manual entry switch.

---

Plugin Parameters: Menu Background Settings

These settings in the Plugin Parameters allow you to adjust the background
images used for each of the scenes. The images will be taken from the game
project folders img/titles1/ and img/titles2/ to load into the game.

These settings are only available to scenes found within the Main Menu, the
Shop scene, and the Actor Naming scene.

---

Menu Background Settings:

Blur Strength:
- Strength used for menu background snapshots.
- Default: 8. Higher is stronger. Lower is weaker.

Scene_Menu:
Scene_Item:
Scene_Skill:
Scene_Equip:
Scene_Status:
Scene_Options:
Scene_Save:
Scene_Load:
Scene_GameEnd:
Scene_Shop:
Scene_Name:
- Individual background settings for the scene.

Scene_Unlisted
- Individual background settings for any scenes that aren't listed above.

---

Background Settings

Snapshop Opacity:
- Snapshot opacity for the scene.

Background 1:
- Filename used for the bottom background image.
- Leave empty if you don't wish to use one.

Background 2:
- Filename used for the upper background image.
- Leave empty if you don't wish to use one.

---

Plugin Parameters: Menu Button Assist Window

In most modern RPG's, there exist small windows on the screen which tell the
player what the control schemes are for that scene. This plugin gives you
the option to add that window to the menu scenes in the form of a Button
Assist Window.

---

General

Enable:
- Enable the Menu Button Assist Window.

Location:
- Determine the location of the Button Assist Window.
- Requires Plugin Parameters => UI => Side Buttons ON.

Background Type:
- Select background type for this window.

Split "Escape":
- Used ONLY for those making their own custom keyboard key input maps.
- "Split" option makes separate instances of "Cancel" and "Menu" keys.
- "Don't" option will consolidate both into "Escape" keys.

---

Text

Text Format:
- Format on how the buttons are displayed.
- Text codes allowed. %1 - Key, %2 - Text

Multi-Key Format:
- Format for actions with multiple keys.
- Text codes allowed. %1 - Key 1, %2 - Key 2

OK Text:
Cancel Text:
Switch Actor Text:
- Default text used to display these various actions.

---

Keys

Key: Unlisted Format:
- If a key is not listed below, use this format.
- Text codes allowed. %1 - Key

Key: Up:
Key: Down:
Key: Left:
Key: Right:
Key: Shift:
Key: Tab:
Key: A through Z:
- How this key is shown in-game.
- Text codes allowed.

---

Plugin Parameters: Controller Button Assist Settings

These are sub-settings for the Button Assist Window Plugin Parameters. Where
the Button Assist Window Plugin Parameters are focused on keyboard entries,
these sections are focused on gamepad controllers.

Add multiple gamepads to the list to give them different button assist text.
If a gamepad is being used but not listed here, the button assist text will
default to the keyboard version.

For those looking for more information regarding controllers, visit this
site: <external-url>

---

ID Information

Controller ID Name:
- Exact string used for this controller ID.
- Plugin Command "Debug: Current Controller ID" for ID help.
- Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)

Similarity Match:
- Partial string used to check for controller ID.
- Plugin Command "Debug: Current Controller ID" for ID help.
- This check occurs secondary to the exact name.
- Example: Xbox

---

Directions

Up:
Left:
Right:
Down:
- How this button is shown in-game.
- Text codes allowed.

---

Actions

OK:
Cancel:
Menu:
Shift:
Page Up:
Page Down:
- How this button is shown in-game.
- Text codes allowed.
- *NOTE*: Controllers use a different mapping scheme from keyboards.
- The "cancel" button is separate from the "menu" button though, for the
majority of the button assist window help text, we'll be referring to
the cancel button usually.

---

Plugin Parameters: Menu Layout Settings

These settings allow you to rearrange the positions of the scenes accessible
from the Main Menu, the Shop scene, and the Actor Naming scene. This will
require you to have some JavaScript knowledge to make the windows work the
way you would like.

---

Menu Layout Settings

Scene_Title:
Scene_Menu:
Scene_Item:
Scene_Skill:
Scene_Equip:
Scene_Status:
Scene_Options:
Scene_Save:
Scene_Load:
Scene_GameEnd:
Scene_Shop:
Scene_Name:
- Various options on adjusting the selected scene.

---

Scene Window Settings

Background Type:
- Selects the background type for the selected window.
- Window
- Dim
- Transparent

JS: X, Y, W, H
- Code used to determine the dimensions for the selected window.

---

Scene_Title Settings
- The following are settings unique to Scene_Title.

Title Screen

Document Title Format:
- Format to display text in document title.
- %1 - Main Title, %2 - Subtitle, %3 - Version

Subtitle:
- Subtitle to be displayed under the title name.

Version:
- Version to be display in the title screen corner.

JS: Draw Title:
- Code used to draw the game title.

JS: Draw Subtitle:
- Code used to draw the game subtitle.

JS: Draw Version:
- Code used to draw the game version.

Button Fade Speed:
- Speed at which the buttons fade in at (1-255).

---

Scene_GameEnd Settings
- The following are settings unique to Scene_GameEnd.

Command Window List:
- Window commands used by the title screen.
- Add new commands here.

---

Command Window List
- This is found under Scene_Title and Scene_GameEnd settings.

Symbol:
- The symbol used for this command.

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

---

Title Picture Buttons:
- This is found under Scene_Title settings.

Picture's Filename:
- Filename used for the picture.

Button URL:
- URL for the button to go to upon being clicked.

JS: Position:
- JavaScript code that helps determine the button's Position.

JS: On Load:
- JavaScript code that runs once this button bitmap is loaded.

JS: Run Code:
- JavaScript code that runs once this button is pressed.

---

Plugin Parameters: Parameter Settings

A battler's parameters, or stats as some devs know them as, are the values
that determine how a battler performs. These settings allow you to alter
their behaviors and give boosts to trait objects in a controlled manner.

---

Parameter Settings

Displayed Parameters
- A list of the parameters that will be displayed in-game.
- Shown in the Equip Menu.
- Shown in the Status Menu.

Extended Parameters
- The list shown in extended scenes (for other VisuStella plugins).

---

=== Basic Parameters ===

MHP - MaxHP
- This is the maximum health points value. The amount of health points (HP)
a battler has determines whether or not the battler is in a living state or
a dead state. If the HP value is above 0, then the battler is living. If it
is 0 or below, the battler is in a dead state unless the battler has a way
to counteract death (usually through immortality). When the battler takes
damage, it is usually dealt to the HP value and reduces it. If the battler
is healed, then the HP value is increased. The MaxHP value determines what's
the maximum amount the HP value can be held at, meaning the battler cannot
be healed past that point.

MMP - MaxMP
- This is the maximum magic points value. Magic points (MP) are typically
used for the cost of skills and spells in battle. If the battler has enough
MP to fit the cost of the said skill, the battler is able to use the said
skill provided that all of the skill's other conditions are met. If not, the
battler is then unable to use the skill. Upon using a skill that costs MP,
the battler's MP is reduced. However, the battler's MP can be recovered and
results in a gain of MP. The MaxMP value determines what is the maximum
amount the MP value can be held at, meaning the battler cannot recover MP
past the MaxMP value.

ATK - Attack
- This is the attack value of the battler. By default, this stat is used for
the purpose of damage calculations only, and is typically used to represent
the battler's physical attack power. Given normal damage formulas, higher
values mean higher damage output for physical attacks.

DEF - Defense
- This is the defense value of the battler. By default, this stat is used
for the purpose of damage calculations only, and is typically used to
represent the battler's physical defense. Given normal damage formulas,
higher values mean less damage received from physical attacks.

MAT - Magic Attack
- This is the magic attack value of the battler. By default, this stat is
used for the purpose of damage calculations only, and is typically used to
represent the battler's magical attack power. Given normal damage formulas,
higher values mean higher damage output for magical attacks.

MDF - Magic Defense
- This is the magic defense value of the battler. By default, this stat is
used for the purpose of damage calculations only, and is typically used to
represent the battler's magical defense. Given normal damage formulas,
higher values mean less damage received from magical attacks.

AGI - Agility
- This is the agility value of the battler. By default, this stat is used to
determine battler's position in the battle turn's order. Given a normal turn
calculation formula, the higher the value, the faster the battler is, and
the more likely the battler will have its turn earlier in a turn.

LUK - Luck
- This is the luck value of the battler. By default, this stat is used to
affect the success rate of states, buffs, and debuffs applied by the battler
and received by the battler. If the user has a higher LUK value, the state,
buff, or debuff is more likely to succeed. If the target has a higher LUK
value, then the state, buff, or debuff is less likely to succeed.

---

Basic Parameters

Show Actor Level?:
- Show the actor level when displaying actors?
- Affects for most windows in-game.

HP Crisis Rate:
- HP Ratio at which a battler can be considered in crisis mode.

JS: Formula:
- Formula used to determine the total value all 8 basic parameters:
- MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.

Parameter Caps:

MaxHP Cap:
MaxMP Cap:
ATK Cap:
DEF Cap:
MAT Cap:
MDF Cap:
AGI Cap:
LUK Cap:
- Formula used to determine the selected parameter's cap.
- These settings DO NOT raise the editor's maximum values. If you want to
raise an enemy's maximum parameter value past their default cap, use the
associated notetag for them instead.

---

=== X Parameters ===

HIT - Hit Rate%
- This determines the physical hit success rate of the any physical action.
All physical attacks make a check through the HIT rate to see if the attack
will connect. If the HIT value passes the randomizer check, the attack will
connect. If the HIT value fails to pass the randomizer check, the attack
will be considered a MISS.

EVA - Evasion Rate%
- This determines the physical evasion rate against any incoming physical
actions. If the HIT value passes, the action is then passed to the EVA check
through a randomizer check. If the randomizer check passes, the physical
attack is evaded and will fail to connect. If the randomizer check passes,
the attempt to evade the action will fail and the action connects.

CRI - Critical Hit Rate%
- Any actions that enable Critical Hits will make a randomizer check with
this number. If the randomizer check passes, extra damage will be carried
out by the initiated action. If the randomizer check fails, no extra damage
will be added upon the action.

CEV - Critical Evasion Rate%
- This value is put against the Critical Hit Rate% in a multiplicative rate.
If the Critical Hit Rate is 90% and the Critical Evasion Rate is
20%, then the randomizer check will make a check against 72% as the values
are calculated by the source code as CRI * (1 - CEV), therefore, with values
as 0.90 * (1 - 0.20) === 0.72.

MEV - Magic Evasion Rate%
- Where EVA is the evasion rate against physical actions, MEV is the evasion
rate against magical actions. As there is not magical version of HIT, the
MEV value will always be bit against when a magical action is initiated. If
the randomizer check passes for MEV, the magical action will not connect. If
the randomizer check fails for MEV, the magical action will connect.

MRF - Magic Reflect Rate%
- If a magical action connects and passes, there is a chance the magical
action can be bounced back to the caster. That chance is the Magic Reflect
Rate. If the randomizer check for the Magic Reflect Rate passes, then the
magical action is bounced back to the caster, ignoring the caster's Magic
Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
the magical action will connect with its target.

CNT - Counter Attack Rate%
- If a physical action connects and passes, there is a chance the physical
action can be avoided and a counter attack made by the user will land on the
attacking unit. This is the Counter Attack Rate. If the randomizer check for
the Counter Attack Rate passes, the physical action is evaded and the target
will counter attack the user. If the randomizer check fails, the physical
action will connect to the target.

HRG - HP% Regeneration
- During a battler's regeneration phase, the battler will regenerate this
percentage of its MaxHP as gained HP with a 100% success rate.

MRG - MP% Regeneration
- During a battler's regeneration phase, the battler will regenerate this
percentage of its MaxMP as gained MP with a 100% success rate.

TRG - TP% Regeneration
- During a battler's regeneration phase, the battler will regenerate this
percentage of its MaxTP as gained TP with a 100% success rate.

---

X Parameters

JS: Formula:
- Formula used to determine the total value all 10 X parameters:
- HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.

Vocabulary

HIT:
EVA:
CRI:
CEV:
MEV:
MRF:
CNT:
HRG:
MRG:
TRG:
- In-game vocabulary used for the selected X Parameter.

---

=== S Parameters ===

TGR - Target Rate
- Against the standard enemy, the Target Rate value determines the odds of
an enemy specifically targeting the user for a single target attack. At 0%,
the enemy will almost never target the user. At 100%, it will have normal
targeting opportunity. At 100%+, the user will have an increased chance of
being targeted.
*NOTE: For those using the Battle A.I. Core, any actions that have specific
target conditions will bypass the TGR rate.

GRD - Guard Effect
- This is the effectiveness of guarding. This affects the guard divisor
value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
become 'damage / (2 * 2.00)' and so forth.

REC - Recovery Effect
- This is how effective heals are towards the user. The higher the REC rate,
the more the user is healed. If a spell were to heal for 100 and the user
has 300% REC, then the user is healed for 300 instead.

PHA - Pharmacology
- This is how effective items are when used by the user. The higher the PHA
rate, the more effective the item effect. If the user is using a Potion that
recovers 100% on a target ally and the user has 300% PHA, then the target
ally will receive healing for 300 instead.

MCR - MP Cost Rate
- This rate affects how much MP skills with an MP Cost will require to use.
If the user has 100% MCR, then the MP Cost will be standard. If the user has
50% MCR, then all skills that cost MP will cost only half the required MP.
If the user has 200% MCR, then all skills will cost 200% their MP cost.

TCR - TP Charge Rate
- This rate affects how much TP skills with an TP will charge when gaining
TP through various actions. At 100%, TP will charge normally. At 50%, TP
will charge at half speed. At 200%, TP will charge twice as fast.

PDR - Physical Damage Rate
- This rate affects how much damage the user will take from physical damage.
If the user has 100% PDR, then the user takes the normal amount. If the user
has 50% PDR, then all physical damage dealt to the user is halved. If the
user has 200% PDR, then all physical damage dealt to the user is doubled.

MDR - Magical Damage Rate
- This rate affects how much damage the user will take from magical damage.
If the user has 100% MDR, then the user takes the normal amount. If the user
has 50% MDR, then all magical damage dealt to the user is halved. If the
user has 200% MDR, then all magical damage dealt to the user is doubled.

FDR - Floor Damage Rate
- On the field map, this alters how much damage the user will take when the
player walks over a tile that damages the party. The FDR value only affects
the damage dealt to the particular actor and not the whole party. If FDR is
at 100%, then the user takes the full damage. If FDR is at 50%, then only
half of the damage goes through. If FDR is at 200%, then floor damage is
doubled for that actor.

EXR - Experience Rate
- This determines the amount of experience gain the user whenever the user
gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
At 50%, the experience gain is halved. At 200%, the experience gain for the
user is doubled.

---

S Parameters

JS: Formula
- Formula used to determine the total value all 10 S parameters:
- TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.

Vocabulary

TGR:
GRD:
REC:
PHA:
MCR:
TCR:
PDR:
MDR:
FDR:
EXR:
- In-game vocabulary used for the selected S Parameter.

---

Icons

Draw Icons?
- Draw icons next to parameter names?

MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
- Icon used for the selected parameter.

---

Plugin Parameters: Custom Parameters Settings

MZ's default set of parameters isn't enough for you. These parameters can
have variable functionality depending on how you code it. More importantly,
these are compatible with the VisuStella MZ menus and the VisuStella Core
Engine's Parameters settings.

For clarification, these settings do NOT create brand-new parameters for you
to use and add to your game nor are the bonuses supported by other plugins
in the VisuStella MZ library. These settings exist to function as a bridge
for non-VisuStella MZ plugins that have created their own parameter values
and to show them inside VisuStella menus.

---

Custom Parameter

Parameter Name:
- What's the parameter's name?
- Used for VisuStella MZ menus.

Abbreviation:
- What abbreviation do you want to use for the parameter?
- Do not use special characters. Avoid numbers if possible.

Icon:
- What icon do you want to use to represent this parameter?
- Used for VisuStella MZ menus.

Type:
- What kind of number value will be returned with this parameter?
- Integer (Whole Numbers Only)
- Float (Decimals are Allowed)

JS: Value:
- Run this code when this parameter is to be returned.

---

Instructions on Adding Custom Parameters to VisuStella Menus

In the Core Engine and Elements and Status Menu Core plugins, there are
plugin parameter fields for you to insert the parameters you want displayed
and visible to the player.

Insert in those the abbreviation of the custom parameter. For example, if
you want to add the "Strength" custom parameter and the abbreviation is
"str", then add "str" to the Core Engine/Elements and Status Menu Core's
plugin parameter field for "Strength" to appear in-game. Case does not
matter here so you can insert "str" or "STR" and it will register all the
same to make them appear in-game.

---

Instructions on Using Custom Parameters as Mechanics

If you want to use a custom parameter in, say, a damage formula, refer to
the abbreviation you have set for the custom parameter. For example, if you
want to call upon the "Strength" custom parameter's value and its set
abbreviation is "str", then refer to it as such. This is case sensitive.

An example damage formula would be something like the following if using
"str" for "Strength" and "con" for "Constitution":

a.str - b.con

These values are attached to the Game_Battlerbase prototype class.

---

Instructions on Setting Custom Parameter Values

This requires JavaScript knowledge. There is no way around it. Whatever code
you insert into the "JS: Value" field will return the value desired. The
'user' variable will refer to the Game_Battlerbase prototype object in which
the information is to be drawn from.

Depending on the "type" you've set for the Custom Parameter, the returned
value will be rounded using Math.round for integers and left alone if set as
a float number.

---

Plugin Parameters: Screen Resolution Settings

Alter various properties to make the game look better for varying screen
Troops tab has been updated to match the screen resolution settings found in
the System 2 Database tab.

---

Maps

Scroll Lock Small X?:
Scroll Lock Small Y?:
- Automatically scroll lock X/Y scrolling if the map is too small?
- Useful for 1280x720 resolutions when the map is 27 tiles wide.
- This will get rid of the subtle scrolling when moving from one half of
the screen to the other.
- This setting will be disabled if the map is zoomed in.

Locked Display X?:
Locked Display Y?:
- What display X/Y value do you want for auto-scroll locked maps?
- Use a number between 0 and 1 for best results.

---

Troops

Reposition Actors:
- Update the position of actors in battle if the screen resolution
has changed to become larger than 816x624.
- Ignore if using the VisuStella MZ Battle Core.
- When using the VisuStella MZ Battle Core, adjust the position through
Battle Core > Parameters > Actor Battler Settings > JS: Home Position

Reposition Enemies:
- Update the position of enemies in battle if the screen resolution
has changed to become larger than 816x624.

For MZ 1.3.0+?:
- Both this parameter and its parent parameter need to be on when using
RPG Maker MZ 1.3.0+.
- If the Core Script is below 1.3.0, this setting is ignored. This does
not take into account what version the editor is on. Pay attention to
that as the plugin will not auto adjust for it.

---

Plugin Parameters: Screen Shake Settings

Get more screen shake effects into your game!

These effects have been added by Aries of Sheratan!

---

Settings

Default Style:
- The default style used for screen shakes.
- Original
- Random
- Horizontal
- Vertical

JS: Original Style:
JS: Random Style
JS: Horizontal Style
JS: Vertical Style
- This code gives you control over screen shake for this screen
shake style.

---

Plugin Parameters: Title Command List Settings

This plugin parameter allows you to adjust the commands that appear on the
title screen. Some JavaScript knowledge is needed.

---

Title Command

Symbol:
- The symbol used for this command.

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

---

Plugin Parameters: Title Picture Buttons Settings

These allow you to insert picture buttons on your title screen that can
send users to various links on the internet when clicked.

---

Settings

Picture's Filename:
- Filename used for the picture.

Button URL:
- URL for the button to go to upon being clicked.

JS: Position:
- JavaScript code that helps determine the button's Position.

JS: On Load:
- JavaScript code that runs once this button bitmap is loaded.

JS: Run Code:
- JavaScript code that runs once this button is pressed.

---

Plugin Parameters: UI Settings

In previous iterations of RPG Maker, the Core Engine would allow you to
change the screen resolution. In MZ, that functionality is provided by
default but a number of UI settings still remain. These settings allow you
adjust how certain in-game objects and menus are displayed.

---

UI Area

Fade Speed:
- Default fade speed for transitions.

Box Margin:
- Set the margin in pixels for the screen borders.

Command Window Width:
- Sets the width for standard Command Windows.

Bottom Help Window:
- Put the Help Window at the bottom of the screen?

Right Aligned Menus:
- Put most command windows to the right side of the screen.

Show Buttons:
- Show clickable buttons in your game?

Show Cancel Button:
Show Menu Button:
Show Page Up/Down:
Show Number Buttons:
- Show/hide these respective buttons if the above is enabled.
- If 'Show Buttons' is false, these will be hidden no matter what.

Button Area Height:
- Sets the height for the button area.

Bottom Buttons:
- Put the buttons at the bottom of the screen?

Side Buttons:
- Push buttons to the side of the UI if there is room.

State Icons Non-Frame:
- Replace sprite frame system for non-frame.
- Better for any instances where icons are zoomed.

---

Larger Resolutions

---

Menu Objects

Level -> EXP Gauge:
- Draw an EXP Gauge under the drawn level.

Parameter Arrow:
- The arrow used to show changes in the parameter values.

---

Text Code Support

Class Names:
- Make class names support text codes?

Nicknames:
- Make nicknames support text codes?

---

Plugin Parameters: Window Settings

Adjust the default settings of the windows in-game. This ranges from things
such as the line height (to better fit your font size) to the opacity level
(to fit your window skins).

These settings also allow you to add scroll bars to scrollable windows,
letting the player know how much of the window's contents there are left for
scrolling. The scroll bar can be enabled, disabled, have its thickness
changed, colors changed, etc.

---

Window Defaults

Enable Masking:
- Enable window masking (windows hide other windows behind them)?
- WARNING: Turning it on can obscure data.

Correct Skin Bleed:
- Allows you to enable/disable the window skin bleeding correction for
those who wish to use the 95 calculator instead of 96 to augment higher
and larger screen resolutions.
- Read the "Bug Fixes" section if you don't understand what the window
skin bleeding problem is.

Line Height:
- Default line height used for standard windows.
- Avoid using odd numbers.
- Visuals in RPG Maker and general game dev don't work well with odd
numbers so avoid them unless you want your game's visuals to behave
inconsistently.

Item Padding:
- Default line padding used for standard windows.
- Avoid using odd numbers.
- Visuals in RPG Maker and general game dev don't work well with odd
numbers so avoid them unless you want your game's visuals to behave
inconsistently.

Back Opacity:
- Default back opacity used for standard windows.
- This will still work for lower versions.

Translucent Opacity:
- Default translucent opacity used for standard windows.

Window Opening Speed:
- Default open speed used for standard windows.
- Default: 32 (Use a number between 0-255)

Column Spacing:
- Default column spacing for selectable windows.
- Default: 8

Row Spacing:
- Default row spacing for selectable windows.
- Default: 4

---

Scroll Bar

Show Scroll Bar?:
- Show the scroll bar for scrollable windows?

Thickness:
- How thick do you want the scroll bar to be?

Offset:
- How much do you want to offset the scroll bar by?

Bar Body Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Off Bar Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Off Bar Opacity:
- What opacity value do you want the off bar opacity to be?
- Use a number between 0 and 255.

---

Selectable Items:

Show Background?:
- Selectable menu items have dark boxes behind them. Show them?

Item Height Padding:
- Default padding for selectable items.
- Avoid using odd numbers.
- Visuals in RPG Maker and general game dev don't work well with odd
numbers so avoid them unless you want your game's visuals to behave
inconsistently.

JS: Draw Background:
- Code used to draw the background rectangle behind clickable menu objects

---

Plugin Parameters: JS: Quick Functions

WARNING: This feature is highly experimental! Use it at your own risk!

JavaScript Quick Functions allow you to quickly declare functions in the
global namespace for ease of access. It's so that these functions can be
used in Script Calls, Control Variable Script Inputs, Conditional Branch
Script Inputs, Damage Formulas, and more.

---

JS: Quick Function

Function Name:
- The function's name in the global namespace.
- Will not overwrite functions/variables of the same name.

JS: Code:
- Run this code when using the function.

---

If you have a Function Name of "Example", then typing "Example()" in a
Script Call, Conditional Branch Script Input, or similar field will yield
whatever the code is instructed to return.

If a function or variable of a similar name already exists in the global
namespace, then the quick function will be ignored and not created.

If a quick function contains bad code that would otherwise crash the game,
a fail safe has been implemented to prevent it from doing so, display an
error log, and then return a 0 value.

---
```
