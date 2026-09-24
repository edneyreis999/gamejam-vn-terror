/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 1] [Version 0.1.0] [MessageCore]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderBefore VisuMZ_2_AniMsgTextEffects
 * @orderBefore VisuMZ_2_ExtMessageFunc
 * @orderBefore VisuMZ_3_ChoiceCmnEvts
 * @orderBefore VisuMZ_3_MessageLog
 * @orderBefore VisuMZ_3_MsgLetterSounds
 * @orderBefore VisuMZ_3_StateTooltips
 * @help
 * Message Core for RPG Maker MZ 1.10.0 in the browser.
 * Disable VisuMZ_1_MessageCore. Existing event commands retain their legacy ID.
 * See coreto/README.md and message api describe in the Coreto CLI.
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register font families and files loaded from the game's fonts/ directory during boot.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @type struct<LanguageImages>
 * @desc Choose image filename markers for each active language.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 * @arg Rows:num
 * @text Rows
 * @type number
 * @desc Change the number of Message Window rows.
 * @default 4
 * @min 0
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @desc Change the Message Window width in pixels.
 * @default 816
 * @min 0
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 * @option No Change
 * @value No Change
 * @option true
 * @value true
 * @option false
 * @value false
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * @arg OffsetX:eval
 * @text Offset X
 * @type text
 * @desc Offset Message Window horizontally.
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @type text
 * @desc Offset Message Window vertically.
 * @default +0
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 * @arg Distance:eval
 * @text Distance
 * @type text
 * @desc Change distance between the choice and message windows.
 * @default +0
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @desc Change the line height for the show choices.
 * @default 36
 * @min 0
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @desc What is the minimum width size for each choice?
 * @default 96
 * @min 0
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @desc Maximum number of choice rows to be displayed.
 * @default 8
 * @min 0
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @desc Maximum number of choice columns to be displayed.
 * @default 1
 * @min 0
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @desc Text alignment for Show Choice window.
 * @default default
 * @option default
 * @value default
 * @option left
 * @value left
 * @option center
 * @value center
 * @option right
 * @value right
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @desc Game variable ID receiving the selected database ID, or 0 when canceled.
 * @default 1
 * @min 0
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @desc Reduce all the weapons to a specific weapon type.
 * @default 0
 * @min 0
 * @max 100
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @desc Game variable ID receiving the selected database ID, or 0 when canceled.
 * @default 1
 * @min 0
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @desc Reduce all the armors to a specific armor type.
 * @default 0
 * @min 0
 * @max 100
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @desc Reduce all the armors to a specific equip type.
 * @default 0
 * @min 0
 * @max 100
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @desc Game variable ID receiving the selected database ID, or 0 when canceled.
 * @default 1
 * @min 0
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @desc Reduce all the skills to a specific skill type.
 * @default 0
 * @min 0
 * @max 100
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Array of numeric picture IDs; for example [1,2,3].
 * @default ["1"]
 * @min 1
 *
 * @arg Padding:eval
 * @text Padding
 * @type text
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 *
 * @arg upperleft:json
 * @text Upper Left
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @type note
 * @desc The text that's aligned to this picture's side.
 * @default ""
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Array of numeric picture IDs; for example [1,2,3].
 * @default ["1"]
 * @min 1
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 */

/*~struct~General:
 * @param MessageRows:num
 * @text Default Rows
 * @type number
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 * @min 1
 *
 * @param MessageWidth:num
 * @text Default Width
 * @type number
 * @desc Default Message Window width in pixels.
 * @default 816
 * @min 1
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @type combo
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 * @option none
 * @value none
 * @option tab
 * @value tab
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @type number
 * @desc How many frames to wait between characters drawn?
 * @default 1
 * @min 0
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @type number
 * @desc Message window horizontal offset in pixels; positive right and negative left.
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Message window vertical offset in pixels; positive down and negative up.
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @type boolean
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @type number
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 * @min 0
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @type note
 * @desc This is text that is added at the start of each message.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @type note
 * @desc This is text that is added at the end of each message.
 * @default ""
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @type number
 * @desc Default color for the Name Box Window's text.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @type number
 * @desc Name-box horizontal offset setting in pixels, adjusted by speaker alignment.
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Name-box vertical offset in pixels; positive down and negative up from native placement.
 * @default +0
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @type number
 * @desc Choice row line-height setting in pixels; actual item height adds 8 pixels.
 * @default 36
 * @min 1
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @desc Minimum per-choice content width in pixels before window padding and columns.
 * @default 96
 * @min 0
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @type number
 * @desc Maximum number of rows to visibly display?
 * @default 8
 * @min 1
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @type number
 * @desc Maximum number of columns to visibly display?
 * @default 1
 * @min 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @type select
 * @desc Default alignment for Show Choice window.
 * @default default
 * @option default
 * @value default
 * @option left
 * @value left
 * @option center
 * @value center
 * @option right
 * @value right
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @type boolean
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @type number
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 * @min 1
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @type number
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 * @min 1
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @type number
 * @desc How much does \{ and \} change font size by?
 * @default 12
 * @min 1
 *
 */

/*~struct~AutoColor:
 * @param Actors:str
 * @text Actors
 * @type number
 * @desc Any usage of an Actor's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param Classes:str
 * @text Classes
 * @type number
 * @desc Any usage of a Class's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param Skills:str
 * @text Skills
 * @type number
 * @desc Any usage of a Skill's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param Items:str
 * @text Items
 * @type number
 * @desc Any usage of an Item's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param Weapons:str
 * @text Weapons
 * @type number
 * @desc Any usage of a Weapon's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param Armors:str
 * @text Armors
 * @type number
 * @desc Any usage of an Armor's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param Enemies:str
 * @text Enemies
 * @type number
 * @desc Any usage of an Enemy's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param States:str
 * @text States
 * @type number
 * @desc Any usage of a State's name is given this text color.
 * @default 0
 * @min 0
 * @max 31
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 1 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 2 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 3 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 4 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 5 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 6 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 7 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 8 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 9 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 10 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 11 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 12 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 13 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 14 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 15 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 16 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 17 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 18 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 19 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 20 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 21 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 22 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 23 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 24 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 25 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 26 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 27 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 28 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 29 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 30 in supported formatted-text windows.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @type text[]
 * @desc Words automatically wrapped in windowskin palette color 31 in supported formatted-text windows.
 * @default []
 *
 */

/*~struct~CustomFont:
 * @param FontFamily:str
 * @text Font Family
 * @type text
 * @desc Family name registered for the file, then used by text rendering.
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @type text
 * @desc Font filename including extension, relative to the game's fonts/ directory.
 * @default Unnamed.ttf
 *
 */

/*~struct~TextCodeAction:
 * @param Match:str
 * @text Match
 * @type text
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 * @option 
 * @value 
 * @option \[(\d+)\]
 * @value \[(\d+)\]
 * @option \<(.*?)\>
 * @value \<(.*?)\>
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */

/*~struct~TextCodeReplace:
 * @param Match:str
 * @text Match
 * @type text
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 * @option 
 * @value 
 * @option \[(\d+)\]
 * @value \[(\d+)\]
 * @option \<(.*?)\>
 * @value \<(.*?)\>
 *
 * @param TextStr:str
 * @text STR: Text
 * @type text
 * @desc The text that will appear if this match appears.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */

/*~struct~TextMacro:
 * @param Match:str
 * @text Match
 * @type text
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @type text
 * @desc The replacement text that will appear from the macro.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */

/*~struct~Localization:
 * @param Enable:eval
 * @text Enable Switching?
 * @type boolean
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param LangFiletype:str
 * @text File Type
 * @type select
 * @desc Which file type do you wish to use?
 * @default tsv
 * @option csv
 * @value csv
 * @option tsv
 * @value tsv
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @type text
 * @desc What is the filename of the CSV file to read from?
 * @default Languages.csv
 *
 * @param TsvFilename:str
 * @text TSV Filename
 * @type text
 * @desc What is the filename of the TSV file to read from?
 * @default Languages.tsv
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @desc Add the 'Language' option to the Options menu?
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
 * @default Text Language
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @type select
 * @desc What is the default language used for this game?
 * @default English
 * @option Bengali
 * @value Bengali
 * @option Chinese(Simplified)
 * @value Chinese(Simplified)
 * @option Chinese(Traditional)
 * @value Chinese(Traditional)
 * @option Czech
 * @value Czech
 * @option Danish
 * @value Danish
 * @option Dutch
 * @value Dutch
 * @option English
 * @value English
 * @option Finnish
 * @value Finnish
 * @option French
 * @value French
 * @option German
 * @value German
 * @option Greek
 * @value Greek
 * @option Hindi
 * @value Hindi
 * @option Hungarian
 * @value Hungarian
 * @option Indonesian
 * @value Indonesian
 * @option Italian
 * @value Italian
 * @option Japanese
 * @value Japanese
 * @option Korean
 * @value Korean
 * @option Norwegian
 * @value Norwegian
 * @option Polish
 * @value Polish
 * @option Portuguese
 * @value Portuguese
 * @option Romanian
 * @value Romanian
 * @option Russian
 * @value Russian
 * @option Slovak
 * @value Slovak
 * @option Spanish
 * @value Spanish
 * @option Swedish
 * @value Swedish
 * @option Tamil
 * @value Tamil
 * @option Thai
 * @value Thai
 * @option Turkish
 * @value Turkish
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @type text[]
 * @desc What are all the supported languages supported by this
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 * @option Bengali
 * @value Bengali
 * @option Chinese(Simplified)
 * @value Chinese(Simplified)
 * @option Chinese(Traditional)
 * @value Chinese(Traditional)
 * @option Czech
 * @value Czech
 * @option Danish
 * @value Danish
 * @option Dutch
 * @value Dutch
 * @option English
 * @value English
 * @option Finnish
 * @value Finnish
 * @option French
 * @value French
 * @option German
 * @value German
 * @option Greek
 * @value Greek
 * @option Hindi
 * @value Hindi
 * @option Hungarian
 * @value Hungarian
 * @option Indonesian
 * @value Indonesian
 * @option Italian
 * @value Italian
 * @option Japanese
 * @value Japanese
 * @option Korean
 * @value Korean
 * @option Norwegian
 * @value Norwegian
 * @option Polish
 * @value Polish
 * @option Portuguese
 * @value Portuguese
 * @option Romanian
 * @value Romanian
 * @option Russian
 * @value Russian
 * @option Slovak
 * @value Slovak
 * @option Spanish
 * @value Spanish
 * @option Swedish
 * @value Swedish
 * @option Tamil
 * @value Tamil
 * @option Thai
 * @value Thai
 * @option Turkish
 * @value Turkish
 *
 * @param Bengali:str
 * @text Bengali
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 *
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 *
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 *
 * @param Czech:str
 * @text Czech
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 *
 * @param Danish:str
 * @text Danish
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 *
 * @param Dutch:str
 * @text Dutch
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 *
 * @param English:str
 * @text English
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default English
 *
 * @param Finnish:str
 * @text Finnish
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 *
 * @param French:str
 * @text French
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Français
 *
 * @param German:str
 * @text German
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 *
 * @param Greek:str
 * @text Greek
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 *
 * @param Hindi:str
 * @text Hindi
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 *
 * @param Hungarian:str
 * @text Hungarian
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 *
 * @param Indonesian:str
 * @text Indonesian
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 *
 * @param Italian:str
 * @text Italian
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 *
 * @param Japanese:str
 * @text Japanese
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 *
 * @param Korean:str
 * @text Korean
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 *
 * @param Norwegian:str
 * @text Norwegian
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 *
 * @param Polish:str
 * @text Polish
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Polski
 *
 * @param Portuguese:str
 * @text Portuguese
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Português
 *
 * @param Romanian:str
 * @text Romanian
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Română
 *
 * @param Russian:str
 * @text Russian
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Русский
 *
 * @param Slovak:str
 * @text Slovak
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 *
 * @param Spanish:str
 * @text Spanish
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Español
 *
 * @param Swedish:str
 * @text Swedish
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 *
 * @param Tamil:str
 * @text Tamil
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 *
 * @param Thai:str
 * @text Thai
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 *
 * @param Turkish:str
 * @text Turkish
 * @type text
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */

/*~struct~LanguageFonts:
 * @param Bengali:str
 * @text Bengali
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Czech:str
 * @text Czech
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Danish:str
 * @text Danish
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Dutch:str
 * @text Dutch
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param English:str
 * @text English
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Finnish:str
 * @text Finnish
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param French:str
 * @text French
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param German:str
 * @text German
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Greek:str
 * @text Greek
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Hindi:str
 * @text Hindi
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Hungarian:str
 * @text Hungarian
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Indonesian:str
 * @text Indonesian
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Italian:str
 * @text Italian
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Japanese:str
 * @text Japanese
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Korean:str
 * @text Korean
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Norwegian:str
 * @text Norwegian
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Polish:str
 * @text Polish
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Portuguese:str
 * @text Portuguese
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Romanian:str
 * @text Romanian
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Russian:str
 * @text Russian
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Slovak:str
 * @text Slovak
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Spanish:str
 * @text Spanish
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Swedish:str
 * @text Swedish
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Tamil:str
 * @text Tamil
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Thai:str
 * @text Thai
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 * @param Turkish:str
 * @text Turkish
 * @type text
 * @desc What font face is used for this language?
 * @default rmmz-mainfont
 *
 */

/*~struct~LanguageImages:
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @desc ON: Default language uses converted marker.
 * @default false
 *
 * @param Bengali:str
 * @text Bengali
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Czech:str
 * @text Czech
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Danish:str
 * @text Danish
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Dutch:str
 * @text Dutch
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param English:str
 * @text English
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Finnish:str
 * @text Finnish
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param French:str
 * @text French
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param German:str
 * @text German
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Greek:str
 * @text Greek
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Hindi:str
 * @text Hindi
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Hungarian:str
 * @text Hungarian
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Indonesian:str
 * @text Indonesian
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Italian:str
 * @text Italian
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Japanese:str
 * @text Japanese
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Korean:str
 * @text Korean
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Norwegian:str
 * @text Norwegian
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Polish:str
 * @text Polish
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Portuguese:str
 * @text Portuguese
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Romanian:str
 * @text Romanian
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Russian:str
 * @text Russian
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Slovak:str
 * @text Slovak
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Spanish:str
 * @text Spanish
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Swedish:str
 * @text Swedish
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Tamil:str
 * @text Tamil
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Thai:str
 * @text Thai
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 * @param Turkish:str
 * @text Turkish
 * @type text
 * @desc Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.
 * @default [XX]
 *
 */

/*~struct~TextSpeed:
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @desc Add the 'Text Speed' option to the Options menu?
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
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @desc Initial text speed: 1..10 slowest to fastest, 11 Instant.
 * @default 10
 * @min 1
 * @max 11
 *
 * @param Instant:str
 * @text Instant Speed
 * @type text
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */

/*~struct~WordWrap:
 * @param MessageWindow:eval
 * @text Message Window
 * @type boolean
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @type boolean
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @type boolean
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @type boolean
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @type number
 * @desc Extra horizontal space reserved at the end of wrapped text, in pixels.
 * @default 0
 *
 */

(() => {
"use strict";
const catalog = {
  "schemaVersion": 1,
  "pluginId": "Coreto_1_MessageCore",
  "version": "0.1.0",
  "reference": {
    "pluginId": "VisuMZ_1_MessageCore",
    "version": "1.54"
  },
  "parameters": [
    {
      "id": "CORETO-CONFIG-SOURCE",
      "key": "CoretoConfigSource",
      "storageKey": "CoretoConfigSource",
      "label": "Configuration source",
      "description": "inherit reads the original entry when present; own reads this entry. Switching does not copy values.",
      "type": "string",
      "editorType": "select",
      "options": [
        "inherit",
        "own"
      ],
      "default": "inherit",
      "nativeDefault": "inherit",
      "availability": "supported"
    },
    {
      "id": "MSG-M-052",
      "key": "General",
      "storageKey": "General:struct",
      "label": "General Settings",
      "description": "General settings involving the message system.",
      "editorType": "struct<General>",
      "nativeDefault": "{\"MessageWindow\":\"\",\"MessageRows:num\":\"4\",\"MessageWidth:num\":\"816\",\"FastForwardKey:str\":\"pagedown\",\"MessageTextDelay:num\":\"1\",\"StretchDimmedBg:eval\":\"true\",\"DefaultOutlineWidth:num\":\"3\",\"NameBoxWindow\":\"\",\"NameBoxWindowDefaultColor:num\":\"0\",\"NameBoxWindowOffsetX:num\":\"0\",\"NameBoxWindowOffsetY:num\":\"0\",\"ChoiceListWindow\":\"\",\"ChoiceWindowLineHeight:num\":\"36\",\"ChoiceWindowMaxRows:num\":\"8\",\"ChoiceWindowMaxCols:num\":\"1\",\"ChoiceWindowTextAlign:str\":\"default\",\"DefaultTextCodes\":\"\",\"RelativePXPY:eval\":\"true\",\"FontBiggerCap:eval\":\"108\",\"FontSmallerCap:eval\":\"12\",\"FontChangeValue:eval\":\"12\"}",
      "type": "struct",
      "structName": "General",
      "fields": [
        {
          "id": "MSG-M-067",
          "key": "MessageRows",
          "storageKey": "MessageRows:num",
          "label": "Default Rows",
          "description": "Default number of rows to display for the Message Window.",
          "editorType": "num",
          "nativeDefault": "4",
          "type": "number",
          "min": 1,
          "default": 4
        },
        {
          "id": "MSG-M-068",
          "key": "MessageWidth",
          "storageKey": "MessageWidth:num",
          "label": "Default Width",
          "description": "Default Message Window width in pixels.",
          "editorType": "num",
          "nativeDefault": "816",
          "type": "number",
          "min": 1,
          "default": 816
        },
        {
          "id": "MSG-M-069",
          "key": "FastForwardKey",
          "storageKey": "FastForwardKey:str",
          "label": "Fast Forward Key",
          "description": "This is the key used for fast forwarding messages.",
          "editorType": "combo",
          "nativeDefault": "pagedown",
          "type": "string",
          "options": [
            "none",
            "tab",
            "shift",
            "control",
            "pageup",
            "pagedown"
          ],
          "default": "pagedown"
        },
        {
          "id": "MSG-M-070",
          "key": "MessageTextDelay",
          "storageKey": "MessageTextDelay:num",
          "label": "Text Delay",
          "description": "How many frames to wait between characters drawn?",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 0,
          "default": 1
        },
        {
          "id": "MSG-M-071",
          "key": "MsgWindowOffsetX",
          "storageKey": "MsgWindowOffsetX:num",
          "label": "Offset X",
          "description": "Message window horizontal offset in pixels; positive right and negative left.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /General/MsgWindowOffsetX as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. Initializes the saved game-system x offset. Normal placement starts from horizontal centering in the game box and adds it, then clamps to the full game screen/box margins. Auto-target placement also adds it; an explicit forced x overrides ordinary placement. Existing saves retain their stored offset; use MessageWindowXyOffsets to change current game state.",
          "examples": [
            {
              "input": "message parameters set --path /General/MsgWindowOffsetX --value 12 --dry-run --json",
              "expected": "Previews the illustrative value 12; remove --dry-run to apply the validated configuration."
            }
          ]
        },
        {
          "id": "MSG-M-072",
          "key": "MsgWindowOffsetY",
          "storageKey": "MsgWindowOffsetY:num",
          "label": "Offset Y",
          "description": "Message window vertical offset in pixels; positive down and negative up.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /General/MsgWindowOffsetY as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. Initializes the saved game-system y offset. Normal placement starts from the Show Text top/middle/bottom position and adds it, then clamps to the full game screen/box margins. Auto-target placement also adds it; an explicit forced y overrides ordinary placement. Existing saves retain their stored offset; use MessageWindowXyOffsets to change current game state.",
          "examples": [
            {
              "input": "message parameters set --path /General/MsgWindowOffsetY --value -8 --dry-run --json",
              "expected": "Previews the illustrative value -8; remove --dry-run to apply the validated configuration."
            }
          ]
        },
        {
          "id": "MSG-M-073",
          "key": "StretchDimmedBg",
          "storageKey": "StretchDimmedBg:eval",
          "label": "Stretch Dimmed BG",
          "description": "Stretch dimmed window background to fit the whole screen.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-074",
          "key": "DefaultOutlineWidth",
          "storageKey": "DefaultOutlineWidth:num",
          "label": "Default Outline Width",
          "description": "Changes the default outline width to this many pixels thick.",
          "editorType": "number",
          "nativeDefault": "3",
          "type": "number",
          "min": 0,
          "default": 3
        },
        {
          "id": "MSG-M-075",
          "key": "EachMessageStart",
          "storageKey": "EachMessageStart:json",
          "label": "Each Message Start",
          "description": "This is text that is added at the start of each message.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-076",
          "key": "EachMessageEnd",
          "storageKey": "EachMessageEnd:json",
          "label": "Each Message End",
          "description": "This is text that is added at the end of each message.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-078",
          "key": "NameBoxWindowDefaultColor",
          "storageKey": "NameBoxWindowDefaultColor:num",
          "label": "Default Color",
          "description": "Default color for the Name Box Window's text.",
          "editorType": "text",
          "nativeDefault": "0",
          "type": "number",
          "min": 0,
          "max": 31,
          "default": 0,
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. Default text color in the Name Box Window; a text color escape in the speaker text takes precedence."
        },
        {
          "id": "MSG-M-079",
          "key": "NameBoxWindowOffsetX",
          "storageKey": "NameBoxWindowOffsetX:num",
          "label": "Offset X",
          "description": "Name-box horizontal offset setting in pixels, adjusted by speaker alignment.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /General/NameBoxWindowOffsetX as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. For non-RTL text, alignment position n uses floor(offset*(5-n)/5) after relative placement: n=0 left gives +offset, n=5 center gives 0, n=10 right gives -offset. Position n comes from speaker LEFT/CENTER/RIGHT or POSITION tag. Positive offset therefore moves a left-aligned box right but a right-aligned box left. Screen clamps apply. RTL keeps its native placement path plus the base offset rather than this relative-alignment calculation.",
          "examples": [
            {
              "input": "message parameters set --path /General/NameBoxWindowOffsetX --value 12 --dry-run --json",
              "expected": "Previews the illustrative value 12; remove --dry-run to apply the validated configuration."
            }
          ]
        },
        {
          "id": "MSG-M-080",
          "key": "NameBoxWindowOffsetY",
          "storageKey": "NameBoxWindowOffsetY:num",
          "label": "Offset Y",
          "description": "Name-box vertical offset in pixels; positive down and negative up from native placement.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /General/NameBoxWindowOffsetY as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. Added after the native name-box updatePlacement chooses above/below the message. Screen clamp then applies. If the name box overlaps the top of the message under the provider overlap test, it is moved below the message. The field changes name-box placement, not message height or text cursor y.",
          "examples": [
            {
              "input": "message parameters set --path /General/NameBoxWindowOffsetY --value 4 --dry-run --json",
              "expected": "Previews the illustrative value 4; remove --dry-run to apply the validated configuration."
            }
          ]
        },
        {
          "id": "MSG-M-082",
          "key": "ChoiceWindowLineHeight",
          "storageKey": "ChoiceWindowLineHeight:num",
          "label": "Line Height",
          "description": "Choice row line-height setting in pixels; actual item height adds 8 pixels.",
          "editorType": "number",
          "nativeDefault": "36",
          "type": "number",
          "min": 1,
          "default": 36,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /General/ChoiceWindowLineHeight as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. Initializes the saved choice line-height setting. A value of 36 yields itemHeight=44. Use a finite positive value large enough for the text/icons; no extra clamp is added by the getter. Multiple lines and font sizes still determine drawn text height. Change current-game setting with ChoiceWindowProperties LineHeight; existing saves retain their value.",
          "examples": [
            {
              "input": "message parameters set --path /General/ChoiceWindowLineHeight --value 36 --dry-run --json",
              "expected": "Previews the illustrative value 36; remove --dry-run to apply the validated configuration."
            }
          ]
        },
        {
          "id": "MSG-M-083",
          "key": "ChoiceWindowMinWidth",
          "storageKey": "ChoiceWindowMinWidth:num",
          "label": "Minimum Choice Width",
          "description": "Minimum per-choice content width in pixels before window padding and columns.",
          "editorType": "number",
          "nativeDefault": "96",
          "type": "number",
          "min": 0,
          "default": 96,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /General/ChoiceWindowMinWidth as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. Initializes a saved width floor. The renderer uses at least 1 pixel, any larger CHOICE WIDTH tag, and measured text plus item padding. Column count/spacing/window padding then contribute to window width, capped to Graphics.width. Use a finite nonnegative value; this is not a fixed overall window width. ChoiceWindowProperties MinWidth changes current game state.",
          "examples": [
            {
              "input": "message parameters set --path /General/ChoiceWindowMinWidth --value 160 --dry-run --json",
              "expected": "Previews the illustrative value 160; remove --dry-run to apply the validated configuration."
            }
          ]
        },
        {
          "id": "MSG-M-084",
          "key": "ChoiceWindowMaxRows",
          "storageKey": "ChoiceWindowMaxRows:num",
          "label": "Max Rows",
          "description": "Maximum number of rows to visibly display?",
          "editorType": "number",
          "nativeDefault": "8",
          "type": "number",
          "min": 1,
          "default": 8
        },
        {
          "id": "MSG-M-085",
          "key": "ChoiceWindowMaxCols",
          "storageKey": "ChoiceWindowMaxCols:num",
          "label": "Max Columns",
          "description": "Maximum number of columns to visibly display?",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 1,
          "default": 1
        },
        {
          "id": "MSG-M-086",
          "key": "ChoiceWindowTextAlign",
          "storageKey": "ChoiceWindowTextAlign:str",
          "label": "Text Alignment",
          "description": "Default alignment for Show Choice window.",
          "editorType": "select",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "options": [
            "default",
            "left",
            "center",
            "right"
          ],
          "default": "default",
          "defaultReason": "Original field metadata uses rmmz-mainfont outside its own enum; effective General group default is default."
        },
        {
          "id": "MSG-M-088",
          "key": "RelativePXPY",
          "storageKey": "RelativePXPY:eval",
          "label": "Relative \\PX \\PY",
          "description": "Make \\PX[x] and \\PY[x] adjust relative starting position than exact coordinates.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-089",
          "key": "FontBiggerCap",
          "storageKey": "FontBiggerCap:eval",
          "label": "\\{ Maximum",
          "description": "Determine the maximum size that \\{ can reach.",
          "editorType": "number",
          "nativeDefault": "108",
          "type": "string",
          "javascript": "expression",
          "min": 1,
          "default": "108"
        },
        {
          "id": "MSG-M-090",
          "key": "FontSmallerCap",
          "storageKey": "FontSmallerCap:eval",
          "label": "\\} Minimum",
          "description": "Determine the minimum size that \\} can reach.",
          "editorType": "number",
          "nativeDefault": "12",
          "type": "string",
          "javascript": "expression",
          "min": 1,
          "default": "12"
        },
        {
          "id": "MSG-M-091",
          "key": "FontChangeValue",
          "storageKey": "FontChangeValue:eval",
          "label": "\\{ Change \\}",
          "description": "How much does \\{ and \\} change font size by?",
          "editorType": "number",
          "nativeDefault": "12",
          "type": "string",
          "javascript": "expression",
          "min": 1,
          "default": "12"
        }
      ],
      "default": {
        "MessageRows": 4,
        "MessageWidth": 816,
        "FastForwardKey": "pagedown",
        "MessageTextDelay": 1,
        "MsgWindowOffsetX": 0,
        "MsgWindowOffsetY": 0,
        "StretchDimmedBg": true,
        "DefaultOutlineWidth": 3,
        "EachMessageStart": "",
        "EachMessageEnd": "",
        "NameBoxWindowDefaultColor": 0,
        "NameBoxWindowOffsetX": 0,
        "NameBoxWindowOffsetY": 0,
        "ChoiceWindowLineHeight": 36,
        "ChoiceWindowMinWidth": 96,
        "ChoiceWindowMaxRows": 8,
        "ChoiceWindowMaxCols": 1,
        "ChoiceWindowTextAlign": "default",
        "RelativePXPY": true,
        "FontBiggerCap": "108",
        "FontSmallerCap": "12",
        "FontChangeValue": "12"
      },
      "context": "Configure startup message and window settings. CLI parameters get returns decoded JSON. Setting /General requires the complete object, including all defined fields; it does not merge a partial object. To preserve sibling values, set one child path such as /General/MessageRows instead. Reload the editor after a CLI write and restart the game to reload plugin settings."
    },
    {
      "id": "MSG-M-053",
      "key": "AutoColor",
      "storageKey": "AutoColor:struct",
      "label": "Auto-Color Settings",
      "description": "Automatically color certain keywords a specific way.",
      "editorType": "struct<AutoColor>",
      "nativeDefault": "{\"DatabaseHighlighting\":\"\",\"Actors:str\":\"0\",\"Classes:str\":\"0\",\"Skills:str\":\"0\",\"Items:str\":\"0\",\"Weapons:str\":\"0\",\"Armors:str\":\"0\",\"Enemies:str\":\"0\",\"States:str\":\"0\",\"WordHighlighting\":\"\",\"TextColor1:arraystr\":\"[]\",\"TextColor2:arraystr\":\"[]\",\"TextColor3:arraystr\":\"[]\",\"TextColor4:arraystr\":\"[]\",\"TextColor5:arraystr\":\"[]\",\"TextColor6:arraystr\":\"[]\",\"TextColor7:arraystr\":\"[]\",\"TextColor8:arraystr\":\"[]\",\"TextColor9:arraystr\":\"[]\",\"TextColor10:arraystr\":\"[]\",\"TextColor11:arraystr\":\"[]\",\"TextColor12:arraystr\":\"[]\",\"TextColor13:arraystr\":\"[]\",\"TextColor14:arraystr\":\"[]\",\"TextColor15:arraystr\":\"[]\",\"TextColor16:arraystr\":\"[]\",\"TextColor17:arraystr\":\"[]\",\"TextColor18:arraystr\":\"[]\",\"TextColor19:arraystr\":\"[]\",\"TextColor20:arraystr\":\"[]\",\"TextColor21:arraystr\":\"[]\",\"TextColor22:arraystr\":\"[]\",\"TextColor23:arraystr\":\"[]\",\"TextColor24:arraystr\":\"[]\",\"TextColor25:arraystr\":\"[]\",\"TextColor26:arraystr\":\"[]\",\"TextColor27:arraystr\":\"[]\",\"TextColor28:arraystr\":\"[]\",\"TextColor29:arraystr\":\"[]\",\"TextColor30:arraystr\":\"[]\",\"TextColor31:arraystr\":\"[]\"}",
      "type": "struct",
      "structName": "AutoColor",
      "fields": [
        {
          "id": "MSG-M-093",
          "key": "Actors",
          "storageKey": "Actors:str",
          "label": "Actors",
          "description": "Any usage of an Actor's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Actors: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Actor names are read from current instantiated actors during text conversion, so renaming an actor changes later matching."
        },
        {
          "id": "MSG-M-094",
          "key": "Classes",
          "storageKey": "Classes:str",
          "label": "Classes",
          "description": "Any usage of a Class's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Classes: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-095",
          "key": "Skills",
          "storageKey": "Skills:str",
          "label": "Skills",
          "description": "Any usage of a Skill's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Skills: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-096",
          "key": "Items",
          "storageKey": "Items:str",
          "label": "Items",
          "description": "Any usage of an Item's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Items: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-097",
          "key": "Weapons",
          "storageKey": "Weapons:str",
          "label": "Weapons",
          "description": "Any usage of a Weapon's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Weapons: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-098",
          "key": "Armors",
          "storageKey": "Armors:str",
          "label": "Armors",
          "description": "Any usage of an Armor's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Armors: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-099",
          "key": "Enemies",
          "storageKey": "Enemies:str",
          "label": "Enemies",
          "description": "Any usage of an Enemy's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.Enemies: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-100",
          "key": "States",
          "storageKey": "States:str",
          "label": "States",
          "description": "Any usage of a State's name is given this text color.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "string",
          "min": 0,
          "max": 31,
          "default": "0",
          "context": "Color numbers refer to the current img/system/Window.png windowskin palette, not a universal named-color table. It has 32 cells in four rows of eight, starting at palette coordinate (96,144); index n samples pixel (96+(n%8)*12+6,144+floor(n/8)*12+6). Thus 0 is the first cell and 8 the first cell of the second row. A custom windowskin changes the actual colors. Configure the relevant numeric index; no new color asset is created. AutoColor.States: index0 disables this database-name highlighting; use1..31 for a palette color. Applies in message, help, choices and popup windows that enable auto-color. Names are collected when the corresponding database records are parsed; renaming a runtime actor does not rename these database entries. Icon escapes are removed from collected names; empty, numeric-only, reserved or separator names are excluded."
        },
        {
          "id": "MSG-M-102",
          "key": "TextColor1",
          "storageKey": "TextColor1:arraystr",
          "label": "\\C[1]: Blue",
          "description": "Words automatically wrapped in windowskin palette color 1 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor1 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor1 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 1 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-103",
          "key": "TextColor2",
          "storageKey": "TextColor2:arraystr",
          "label": "\\C[2]: Red",
          "description": "Words automatically wrapped in windowskin palette color 2 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor2 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor2 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 2 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-104",
          "key": "TextColor3",
          "storageKey": "TextColor3:arraystr",
          "label": "\\C[3]: Green",
          "description": "Words automatically wrapped in windowskin palette color 3 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor3 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor3 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 3 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-105",
          "key": "TextColor4",
          "storageKey": "TextColor4:arraystr",
          "label": "\\C[4]: Sky Blue",
          "description": "Words automatically wrapped in windowskin palette color 4 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor4 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor4 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 4 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-106",
          "key": "TextColor5",
          "storageKey": "TextColor5:arraystr",
          "label": "\\C[5]: Purple",
          "description": "Words automatically wrapped in windowskin palette color 5 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor5 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor5 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 5 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-107",
          "key": "TextColor6",
          "storageKey": "TextColor6:arraystr",
          "label": "\\C[6]: Yellow",
          "description": "Words automatically wrapped in windowskin palette color 6 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor6 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor6 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 6 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-108",
          "key": "TextColor7",
          "storageKey": "TextColor7:arraystr",
          "label": "\\C[7]: Gray",
          "description": "Words automatically wrapped in windowskin palette color 7 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor7 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor7 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 7 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-109",
          "key": "TextColor8",
          "storageKey": "TextColor8:arraystr",
          "label": "\\C[8]: Light Gray",
          "description": "Words automatically wrapped in windowskin palette color 8 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor8 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor8 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 8 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-110",
          "key": "TextColor9",
          "storageKey": "TextColor9:arraystr",
          "label": "\\C[9]: Dark Blue",
          "description": "Words automatically wrapped in windowskin palette color 9 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor9 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor9 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 9 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-111",
          "key": "TextColor10",
          "storageKey": "TextColor10:arraystr",
          "label": "\\C[10]: Dark Red",
          "description": "Words automatically wrapped in windowskin palette color 10 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor10 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor10 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 10 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-112",
          "key": "TextColor11",
          "storageKey": "TextColor11:arraystr",
          "label": "\\C[11]: Dark Green",
          "description": "Words automatically wrapped in windowskin palette color 11 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor11 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor11 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 11 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-113",
          "key": "TextColor12",
          "storageKey": "TextColor12:arraystr",
          "label": "\\C[12]: Dark Sky Blue",
          "description": "Words automatically wrapped in windowskin palette color 12 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor12 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor12 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 12 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-114",
          "key": "TextColor13",
          "storageKey": "TextColor13:arraystr",
          "label": "\\C[13]: Dark Purple",
          "description": "Words automatically wrapped in windowskin palette color 13 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor13 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor13 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 13 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-115",
          "key": "TextColor14",
          "storageKey": "TextColor14:arraystr",
          "label": "\\C[14]: Solid Yellow",
          "description": "Words automatically wrapped in windowskin palette color 14 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor14 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor14 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 14 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-116",
          "key": "TextColor15",
          "storageKey": "TextColor15:arraystr",
          "label": "\\C[15]: Black",
          "description": "Words automatically wrapped in windowskin palette color 15 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor15 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor15 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 15 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-117",
          "key": "TextColor16",
          "storageKey": "TextColor16:arraystr",
          "label": "\\C[16]: System Blue",
          "description": "Words automatically wrapped in windowskin palette color 16 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor16 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor16 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 16 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-118",
          "key": "TextColor17",
          "storageKey": "TextColor17:arraystr",
          "label": "\\C[17]: Crisis Yellow",
          "description": "Words automatically wrapped in windowskin palette color 17 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor17 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor17 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 17 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-119",
          "key": "TextColor18",
          "storageKey": "TextColor18:arraystr",
          "label": "\\C[18]: Dead Red",
          "description": "Words automatically wrapped in windowskin palette color 18 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor18 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor18 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 18 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-120",
          "key": "TextColor19",
          "storageKey": "TextColor19:arraystr",
          "label": "\\C[19]: Outline Black",
          "description": "Words automatically wrapped in windowskin palette color 19 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor19 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor19 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 19 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-121",
          "key": "TextColor20",
          "storageKey": "TextColor20:arraystr",
          "label": "\\C[20]: HP Orange 1",
          "description": "Words automatically wrapped in windowskin palette color 20 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor20 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor20 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 20 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-122",
          "key": "TextColor21",
          "storageKey": "TextColor21:arraystr",
          "label": "\\C[21]: HP Orange 2",
          "description": "Words automatically wrapped in windowskin palette color 21 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor21 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor21 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 21 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-123",
          "key": "TextColor22",
          "storageKey": "TextColor22:arraystr",
          "label": "\\C[22]: MP Blue 1",
          "description": "Words automatically wrapped in windowskin palette color 22 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor22 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor22 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 22 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-124",
          "key": "TextColor23",
          "storageKey": "TextColor23:arraystr",
          "label": "\\C[23]: MP Blue 2",
          "description": "Words automatically wrapped in windowskin palette color 23 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor23 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor23 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 23 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-125",
          "key": "TextColor24",
          "storageKey": "TextColor24:arraystr",
          "label": "\\C[24]: Param Up Green",
          "description": "Words automatically wrapped in windowskin palette color 24 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor24 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor24 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 24 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-126",
          "key": "TextColor25",
          "storageKey": "TextColor25:arraystr",
          "label": "\\C[25]: Param Down Red",
          "description": "Words automatically wrapped in windowskin palette color 25 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor25 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor25 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 25 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-127",
          "key": "TextColor26",
          "storageKey": "TextColor26:arraystr",
          "label": "\\C[26]: System Purple",
          "description": "Words automatically wrapped in windowskin palette color 26 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor26 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor26 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 26 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-128",
          "key": "TextColor27",
          "storageKey": "TextColor27:arraystr",
          "label": "\\C[27]: System Pink",
          "description": "Words automatically wrapped in windowskin palette color 27 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor27 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor27 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 27 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-129",
          "key": "TextColor28",
          "storageKey": "TextColor28:arraystr",
          "label": "\\C[28]: TP Green 1",
          "description": "Words automatically wrapped in windowskin palette color 28 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor28 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor28 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 28 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-130",
          "key": "TextColor29",
          "storageKey": "TextColor29:arraystr",
          "label": "\\C[29]: TP Green 2",
          "description": "Words automatically wrapped in windowskin palette color 29 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor29 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor29 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 29 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-131",
          "key": "TextColor30",
          "storageKey": "TextColor30:arraystr",
          "label": "\\C[30]: EXP Purple 1",
          "description": "Words automatically wrapped in windowskin palette color 30 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor30 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor30 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 30 in an eligible unlocked text window."
            }
          ]
        },
        {
          "id": "MSG-M-132",
          "key": "TextColor31",
          "storageKey": "TextColor31:arraystr",
          "label": "\\C[31]: EXP Purple 2",
          "description": "Words automatically wrapped in windowskin palette color 31 in supported formatted-text windows.",
          "editorType": "string[]",
          "nativeDefault": "[]",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": [],
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /AutoColor/TextColor31 as a JSON array of strings, for example [\"Potion\"], using message parameters set with --project selecting the MZ game. Reload the editor/restart after editing. Message, Help, ChoiceList and an available TextPopup use automatic coloring. Latin entries match case-sensitively at word boundaries, globally; entries containing recognized CJK/symbol characters match a case-insensitive literal occurrence without word boundaries and without the global flag. Empty/numeric-only entries are ignored. Rules compile by ascending palette index and descending word length inside each color, and run sequentially; overlapping entries can therefore wrap earlier replacements, so keep a word in one color list for predictable output. Database-name rules join these lists; live actor-name coloring runs afterwards. COLORLOCK blocks drawing-time color changes. Existing palette cells come from img/system/Window.png; this field does not change the RGB colors. See message api describe MSG-BEH-autocolor --json for the full pipeline.",
          "examples": [
            {
              "input": "message parameters set --path /AutoColor/TextColor31 --value '[\"Potion\"]' --dry-run --json; after applying/restarting, MZ Show Text: Potion.",
              "expected": "The preview validates the illustrative word list. Applied configuration colors Potion with palette index 31 in an eligible unlocked text window."
            }
          ]
        }
      ],
      "default": {
        "Actors": "0",
        "Classes": "0",
        "Skills": "0",
        "Items": "0",
        "Weapons": "0",
        "Armors": "0",
        "Enemies": "0",
        "States": "0",
        "TextColor1": [],
        "TextColor2": [],
        "TextColor3": [],
        "TextColor4": [],
        "TextColor5": [],
        "TextColor6": [],
        "TextColor7": [],
        "TextColor8": [],
        "TextColor9": [],
        "TextColor10": [],
        "TextColor11": [],
        "TextColor12": [],
        "TextColor13": [],
        "TextColor14": [],
        "TextColor15": [],
        "TextColor16": [],
        "TextColor17": [],
        "TextColor18": [],
        "TextColor19": [],
        "TextColor20": [],
        "TextColor21": [],
        "TextColor22": [],
        "TextColor23": [],
        "TextColor24": [],
        "TextColor25": [],
        "TextColor26": [],
        "TextColor27": [],
        "TextColor28": [],
        "TextColor29": [],
        "TextColor30": [],
        "TextColor31": []
      },
      "context": "Applies to message, help and choice windows (and an available text-popup window). TextColor1 through TextColor31 are literal keyword lists; color 0 disables database highlighting. Latin keywords use case-sensitive whole-word matching and replace every match. Keywords containing CJK or the supported symbol ranges use case-insensitive substring matching of the first occurrence. Lists run in ascending color order, with longer names first within a list; later rules can match text already colored. Avoid duplicate or overlapping keywords when choosing a single color. Actor names are processed afterwards. Set a child path to preserve other lists; replacing /AutoColor requires the complete object."
    },
    {
      "id": "MSG-M-054",
      "key": "CustomFonts",
      "storageKey": "CustomFonts:arraystruct",
      "label": "Custom Font Manager",
      "description": "Register font families and files loaded from the game's fonts/ directory during boot.",
      "editorType": "struct<CustomFont>[]",
      "nativeDefault": "[]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "CustomFont",
        "fields": [
          {
            "id": "MSG-M-133",
            "key": "FontFamily",
            "storageKey": "FontFamily:str",
            "label": "Font Family",
            "description": "Family name registered for the file, then used by text rendering.",
            "editorType": "text",
            "nativeDefault": "Unnamed",
            "type": "string",
            "default": "Unnamed",
            "context": "Configure one /CustomFonts row with FontFamily=\"StoryFont\" and Filename=\"StoryFont.ttf\", then provide fonts/StoryFont.ttf. Both names are illustrative; use the actual family/file you supply. Empty or Unnamed families and the filename Unnamed.ttf are ignored at boot. This loads/registers the family but does not select it for drawing; use the same family in the desired font setting and restart the game."
          },
          {
            "id": "MSG-M-134",
            "key": "Filename",
            "storageKey": "Filename:str",
            "label": "Filename",
            "description": "Font filename including extension, relative to the game's fonts/ directory.",
            "editorType": "text",
            "nativeDefault": "Unnamed.ttf",
            "type": "string",
            "default": "Unnamed.ttf",
            "context": "Configure one /CustomFonts row with FontFamily=\"StoryFont\" and Filename=\"StoryFont.ttf\", then provide fonts/StoryFont.ttf. Both names are illustrative; use the actual family/file you supply. Empty or Unnamed families and the filename Unnamed.ttf are ignored at boot. This loads/registers the family but does not select it for drawing; use the same family in the desired font setting and restart the game."
          }
        ]
      },
      "default": [],
      "context": "Add a complete {\"FontFamily\":\"StoryFont\",\"Filename\":\"StoryFont.ttf\"} item to CustomFonts and place that actual font file in fonts/. The filename includes its extension. Loading uses the runtime FontFace implementation, so use a font format it can decode (for example a valid .ttf); the plugin does not convert fonts. Blank or Unnamed families and the placeholder Unnamed.ttf are skipped. Registration alone does not change the text font. With the default FontChange action retained, Show Text: \\FontChange<StoryFont>Hello\\ResetFont. Restart the game after editing the list."
    },
    {
      "id": "MSG-M-055",
      "key": "TextCodeActions",
      "storageKey": "TextCodeActions:arraystruct",
      "label": "Text Code Actions",
      "description": "Text codes that perform actions.",
      "editorType": "struct<TextCodeAction>[]",
      "nativeDefault": "[\"{\\\"Match:str\\\":\\\"ChangeFace\\\",\\\"Type:str\\\":\\\"\\\\\\\\<(.*?)\\\\\\\\>\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\\\\\nif (this instanceof Window_Message) {\\\\\\\\n    if (textState.drawing) {\\\\\\\\n        const filename = data[0].trim();\\\\\\\\n        const index = parseInt(data[1] || '0');\\\\\\\\n        $gameMessage.setFaceImage(filename, index);\\\\\\\\n        this.loadMessageFace();\\\\\\\\n        const rtl = $gameMessage.isRTL();\\\\\\\\n        const width = ImageManager.faceWidth;\\\\\\\\n        const height = this.innerHeight;\\\\\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\\\\\n        this.contents.clearRect(x, 0, width, height);\\\\\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\\\\\n    }\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"FaceIndex\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst index = this.obtainEscapeParam(textState);\\\\\\\\nif (this instanceof Window_Message) {\\\\\\\\n    if (textState.drawing) {\\\\\\\\n        const filename = $gameMessage.faceName();\\\\\\\\n        $gameMessage.setFaceImage(filename, index);\\\\\\\\n        this.loadMessageFace();\\\\\\\\n        const rtl = $gameMessage.isRTL();\\\\\\\\n        const width = ImageManager.faceWidth;\\\\\\\\n        const height = this.innerHeight;\\\\\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\\\\\n        this.contents.clearRect(x, 0, width, height);\\\\\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\\\\\n    }\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"TextDelay\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst delay = this.obtainEscapeParam(textState);\\\\\\\\nif (this instanceof Window_Message) {\\\\\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\\\\\n        this.setTextDelay(delay);\\\\\\\\n    }\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"NormalBG\\\",\\\"Type:str\\\":\\\"\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nif (textState.drawing) {\\\\\\\\n    this.setBackgroundType(0);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"DimBG\\\",\\\"Type:str\\\":\\\"\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nif (textState.drawing) {\\\\\\\\n    this.setBackgroundType(1);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"TransparentBG\\\",\\\"Type:str\\\":\\\"\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nif (textState.drawing) {\\\\\\\\n    this.setBackgroundType(2);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"FontChange\\\",\\\"Type:str\\\":\\\"\\\\\\\\<(.*?)\\\\\\\\>\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst fontName = this.obtainEscapeString(textState);\\\\\\\\nthis.contents.fontFace = fontName;\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ResetFont\\\",\\\"Type:str\\\":\\\"\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"this.resetFontSettings();\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ResetColor\\\",\\\"Type:str\\\":\\\"\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"this.resetTextColor();\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"HexColor\\\",\\\"Type:str\\\":\\\"\\\\\\\\<(.*?)\\\\\\\\>\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\\\\\n    this.changeTextColor(hexColor);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"OutlineColor\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"OutlineHexColor\\\",\\\"Type:str\\\":\\\"\\\\\\\\<(.*?)\\\\\\\\>\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\\\\\n    this.changeOutlineColor(hexColor);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"OutlineWidth\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst width = this.obtainEscapeParam(textState);\\\\\\\\nif (textState.drawing) {\\\\\\\\n    this.contents.outlineWidth = width;\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"WindowMoveTo\\\",\\\"Type:str\\\":\\\"\\\\\\\\<(.*?)\\\\\\\\>\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\\\\\nif (textState.drawing) {\\\\\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"WindowMoveBy\\\",\\\"Type:str\\\":\\\"\\\\\\\\<(.*?)\\\\\\\\>\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\\\\\nif (textState.drawing) {\\\\\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"WindowReset\\\",\\\"Type:str\\\":\\\"\\\",\\\"CommonEvent:num\\\":\\\"0\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nif (textState.drawing) {\\\\\\\\n    const frames = 20;\\\\\\\\n    const easingType = 0;\\\\\\\\n    this.resetRect(frames, easingType);\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"heart\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"CommonEvent:num\\\":\\\"3\\\",\\\"ActionJS:func\\\":\\\"\\\\\\\"const textState = arguments[0];\\\\\\\\nconst index = this.obtainEscapeParam(textState);\\\\\\\"\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "TextCodeAction",
        "fields": [
          {
            "id": "MSG-M-135",
            "key": "Match",
            "storageKey": "Match:str",
            "label": "Match",
            "description": "This is what needs to be matched in order for this text code to work.",
            "editorType": "text",
            "nativeDefault": "Key",
            "type": "string",
            "default": "Key",
            "context": "Configure one /TextCodeActions row with Match=\"MARK\", Type=\"\", CommonEvent=0 and ActionJS=\"const state=arguments[0]; this.contents.fontBold=true;\". In Show Text use \\MARKBold text. Match is regex source after the escape marker, case-insensitive; prefer an alphabetic name without regex metacharacters or a built-in escape name. Rules normalize longest Match first, while dispatch compares the uppercased Match to the parsed code. Type empty adds a synthetic [0] that the dispatcher consumes. For a numeric argument use nonempty Type and text \\MARK[3]; ActionJS can call this.obtainEscapeParam(state), which consumes the bracketed integer and returns an empty string if absent. For a string use \\MARK<hello> and this.obtainEscapeString(state), which consumes the angle-bracket string and returns empty if absent. Action Type does not append its regex to the conversion matcher. ActionJS is a function body with this=the text window and arguments[0]=textState (text,index,x,y,startX,startY,drawing,buffer among its fields). It runs during drawing and measurement; guard side effects with state.drawing. CommonEvent runs only during real Window_Message drawing on a map, not measurement or battle, requires an existing event ID, and starts a separate map-updated interpreter without blocking the message. Multiple triggers can overlap; map initialization/setupEvents clears them and completion removes finished interpreters; loading preserves a serialized array and initializes it only if absent. Zero disables the event."
          },
          {
            "id": "MSG-M-136",
            "key": "Type",
            "storageKey": "Type:str",
            "label": "Type",
            "description": "The type of parameter to obtain (none, number, or string).",
            "editorType": "select",
            "nativeDefault": "",
            "type": "string",
            "options": [
              "",
              "\\[(\\d+)\\]",
              "\\<(.*?)\\>"
            ],
            "default": "",
            "context": "Configure one /TextCodeActions row with Match=\"MARK\", Type=\"\", CommonEvent=0 and ActionJS=\"const state=arguments[0]; this.contents.fontBold=true;\". In Show Text use \\MARKBold text. Match is regex source after the escape marker, case-insensitive; prefer an alphabetic name without regex metacharacters or a built-in escape name. Rules normalize longest Match first, while dispatch compares the uppercased Match to the parsed code. Type empty adds a synthetic [0] that the dispatcher consumes. For a numeric argument use nonempty Type and text \\MARK[3]; ActionJS can call this.obtainEscapeParam(state), which consumes the bracketed integer and returns an empty string if absent. For a string use \\MARK<hello> and this.obtainEscapeString(state), which consumes the angle-bracket string and returns empty if absent. Action Type does not append its regex to the conversion matcher. ActionJS is a function body with this=the text window and arguments[0]=textState (text,index,x,y,startX,startY,drawing,buffer among its fields). It runs during drawing and measurement; guard side effects with state.drawing. CommonEvent runs only during real Window_Message drawing on a map, not measurement or battle, requires an existing event ID, and starts a separate map-updated interpreter without blocking the message. Multiple triggers can overlap; map initialization/setupEvents clears them and completion removes finished interpreters; loading preserves a serialized array and initializes it only if absent. Zero disables the event."
          },
          {
            "id": "MSG-M-137",
            "key": "CommonEvent",
            "storageKey": "CommonEvent:num",
            "label": "Common Event",
            "description": "Select a common event to run when this text code is used in a message.",
            "editorType": "common_event",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Configure one /TextCodeActions row with Match=\"MARK\", Type=\"\", CommonEvent=0 and ActionJS=\"const state=arguments[0]; this.contents.fontBold=true;\". In Show Text use \\MARKBold text. Match is regex source after the escape marker, case-insensitive; prefer an alphabetic name without regex metacharacters or a built-in escape name. Rules normalize longest Match first, while dispatch compares the uppercased Match to the parsed code. Type empty adds a synthetic [0] that the dispatcher consumes. For a numeric argument use nonempty Type and text \\MARK[3]; ActionJS can call this.obtainEscapeParam(state), which consumes the bracketed integer and returns an empty string if absent. For a string use \\MARK<hello> and this.obtainEscapeString(state), which consumes the angle-bracket string and returns empty if absent. Action Type does not append its regex to the conversion matcher. ActionJS is a function body with this=the text window and arguments[0]=textState (text,index,x,y,startX,startY,drawing,buffer among its fields). It runs during drawing and measurement; guard side effects with state.drawing. CommonEvent runs only during real Window_Message drawing on a map, not measurement or battle, requires an existing event ID, and starts a separate map-updated interpreter without blocking the message. Multiple triggers can overlap; map initialization/setupEvents clears them and completion removes finished interpreters; loading preserves a serialized array and initializes it only if absent. Zero disables the event."
          },
          {
            "id": "MSG-M-138",
            "key": "ActionJS",
            "storageKey": "ActionJS:func",
            "label": "JS: Action",
            "description": "JavaScript code used to perform an action when this text code appears.",
            "editorType": "note",
            "nativeDefault": "\"const textState = arguments[0];\"",
            "type": "string",
            "encoding": "json",
            "javascript": "body",
            "default": "const textState = arguments[0];",
            "context": "Configure one /TextCodeActions row with Match=\"MARK\", Type=\"\", CommonEvent=0 and ActionJS=\"const state=arguments[0]; this.contents.fontBold=true;\". In Show Text use \\MARKBold text. Match is regex source after the escape marker, case-insensitive; prefer an alphabetic name without regex metacharacters or a built-in escape name. Rules normalize longest Match first, while dispatch compares the uppercased Match to the parsed code. Type empty adds a synthetic [0] that the dispatcher consumes. For a numeric argument use nonempty Type and text \\MARK[3]; ActionJS can call this.obtainEscapeParam(state), which consumes the bracketed integer and returns an empty string if absent. For a string use \\MARK<hello> and this.obtainEscapeString(state), which consumes the angle-bracket string and returns empty if absent. Action Type does not append its regex to the conversion matcher. ActionJS is a function body with this=the text window and arguments[0]=textState (text,index,x,y,startX,startY,drawing,buffer among its fields). It runs during drawing and measurement; guard side effects with state.drawing. CommonEvent runs only during real Window_Message drawing on a map, not measurement or battle, requires an existing event ID, and starts a separate map-updated interpreter without blocking the message. Multiple triggers can overlap; map initialization/setupEvents clears them and completion removes finished interpreters; loading preserves a serialized array and initializes it only if absent. Zero disables the event."
          }
        ]
      },
      "default": [
        {
          "Match": "ChangeFace",
          "Type": "\\<(.*?)\\>",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst data = this.obtainEscapeString(textState).split(',');\nif (this instanceof Window_Message) {\n    if (textState.drawing) {\n        const filename = data[0].trim();\n        const index = parseInt(data[1] || '0');\n        $gameMessage.setFaceImage(filename, index);\n        this.loadMessageFace();\n        const rtl = $gameMessage.isRTL();\n        const width = ImageManager.faceWidth;\n        const height = this.innerHeight;\n        const x = rtl ? this.innerWidth - width - 4 : 4;\n        this.contents.clearRect(x, 0, width, height);\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\n    }\n}"
        },
        {
          "Match": "FaceIndex",
          "Type": "\\[(\\d+)\\]",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst index = this.obtainEscapeParam(textState);\nif (this instanceof Window_Message) {\n    if (textState.drawing) {\n        const filename = $gameMessage.faceName();\n        $gameMessage.setFaceImage(filename, index);\n        this.loadMessageFace();\n        const rtl = $gameMessage.isRTL();\n        const width = ImageManager.faceWidth;\n        const height = this.innerHeight;\n        const x = rtl ? this.innerWidth - width - 4 : 4;\n        this.contents.clearRect(x, 0, width, height);\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\n    }\n}"
        },
        {
          "Match": "TextDelay",
          "Type": "\\[(\\d+)\\]",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst delay = this.obtainEscapeParam(textState);\nif (this instanceof Window_Message) {\n    if (textState.drawing && this.constructor === Window_Message) {\n        this.setTextDelay(delay);\n    }\n}"
        },
        {
          "Match": "NormalBG",
          "Type": "",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nif (textState.drawing) {\n    this.setBackgroundType(0);\n}"
        },
        {
          "Match": "DimBG",
          "Type": "",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nif (textState.drawing) {\n    this.setBackgroundType(1);\n}"
        },
        {
          "Match": "TransparentBG",
          "Type": "",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nif (textState.drawing) {\n    this.setBackgroundType(2);\n}"
        },
        {
          "Match": "FontChange",
          "Type": "\\<(.*?)\\>",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst fontName = this.obtainEscapeString(textState);\nthis.contents.fontFace = fontName;"
        },
        {
          "Match": "ResetFont",
          "Type": "",
          "CommonEvent": 0,
          "ActionJS": "this.resetFontSettings();"
        },
        {
          "Match": "ResetColor",
          "Type": "",
          "CommonEvent": 0,
          "ActionJS": "this.resetTextColor();"
        },
        {
          "Match": "HexColor",
          "Type": "\\<(.*?)\\>",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst hexColor = this.obtainEscapeString(textState);\nif (!this.isColorLocked() && textState.drawing) {\n    this.changeTextColor(hexColor);\n}"
        },
        {
          "Match": "OutlineColor",
          "Type": "\\[(\\d+)\\]",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst colorIndex = this.obtainEscapeParam(textState);\nif (!this.isColorLocked() && textState.drawing) {\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\n}"
        },
        {
          "Match": "OutlineHexColor",
          "Type": "\\<(.*?)\\>",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst hexColor = this.obtainEscapeString(textState);\nif (!this.isColorLocked() && textState.drawing) {\n    this.changeOutlineColor(hexColor);\n}"
        },
        {
          "Match": "OutlineWidth",
          "Type": "\\[(\\d+)\\]",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst width = this.obtainEscapeParam(textState);\nif (textState.drawing) {\n    this.contents.outlineWidth = width;\n}"
        },
        {
          "Match": "WindowMoveTo",
          "Type": "\\<(.*?)\\>",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst data = this.obtainEscapeString(textState).split(',');\nif (textState.drawing) {\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\n    const easingType = !!data[5] ? data[5].trim() : 0;\n    this.moveTo(x, y, width, height, duration, easingType);\n}"
        },
        {
          "Match": "WindowMoveBy",
          "Type": "\\<(.*?)\\>",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nconst data = this.obtainEscapeString(textState).split(',');\nif (textState.drawing) {\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\n    const easingType = !!data[5] ? data[5].trim() : 0;\n    this.moveBy(x, y, width, height, duration, easingType);\n}"
        },
        {
          "Match": "WindowReset",
          "Type": "",
          "CommonEvent": 0,
          "ActionJS": "const textState = arguments[0];\nif (textState.drawing) {\n    const frames = 20;\n    const easingType = 0;\n    this.resetRect(frames, easingType);\n}"
        },
        {
          "Match": "heart",
          "Type": "\\[(\\d+)\\]",
          "CommonEvent": 3,
          "ActionJS": "const textState = arguments[0];\nconst index = this.obtainEscapeParam(textState);"
        }
      ],
      "context": "Register complete action records, then invoke their Match as an escape code in Show Text. Example item: {\"Match\":\"Signal\",\"Type\":\"\",\"CommonEvent\":1,\"ActionJS\":\"const state = arguments[0];\"}; use \\Signal to run existing Common Event 1. CommonEvent 0 disables launch. ActionJS runs first with this bound to the text window and arguments[0] equal to its text state; it can run during measurement, so guard game side effects with state.drawing. After ActionJS, CommonEvent launches only while drawing in an exact Window_Message, outside battle using a parallel map interpreter; a missing common event is ignored. Type empty needs no authored argument; for parameterized actions consume the argument from the text state yourself. Match is case-insensitive; actions sharing a Match all run in array order and may consume the same state sequentially. Built-in handled codes take precedence; use a distinct alphabetic Match. Setting the whole array replaces it: read, append complete records, then set to preserve the existing actions."
    },
    {
      "id": "MSG-M-056",
      "key": "TextCodeReplace",
      "storageKey": "TextCodeReplace:arraystruct",
      "label": "Text Code Replacements",
      "description": "Text codes that replace themselves with text.",
      "editorType": "struct<TextCodeReplace>[]",
      "nativeDefault": "[\"{\\\"Match:str\\\":\\\"ActorFace\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const actorId = parseInt(arguments[1]);\\\\\\\\nconst actor = $gameActors.actor(actorId);\\\\\\\\nif (this.constructor === Window_Message && actor) {\\\\\\\\n    $gameMessage.setFaceImage(\\\\\\\\n        actor.faceName(),\\\\\\\\n        actor.faceIndex()\\\\\\\\n    );\\\\\\\\n}\\\\\\\\nreturn '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"PartyFace\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const index = parseInt(arguments[1]) - 1;\\\\\\\\nconst actor = $gameParty.members()[index];\\\\\\\\nif (this.constructor === Window_Message && actor) {\\\\\\\\n    $gameMessage.setFaceImage(\\\\\\\\n        actor.faceName(),\\\\\\\\n        actor.faceIndex()\\\\\\\\n    );\\\\\\\\n}\\\\\\\\nreturn '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Class\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataClasses;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ClassIcon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataClasses;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst obj = database[id];\\\\\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\\\\\nreturn icon ? '\\\\\\\\\\\\\\\\x1bI[%1]'.format(icon) : '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ClassName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataClasses;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Skill\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataSkills;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"SkillIcon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataSkills;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst obj = database[id];\\\\\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\\\\\nreturn icon ? '\\\\\\\\\\\\\\\\x1bI[%1]'.format(icon) : '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"SkillName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataSkills;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Item\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataItems;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ItemIcon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataItems;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst obj = database[id];\\\\\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\\\\\nreturn icon ? '\\\\\\\\\\\\\\\\x1bI[%1]'.format(icon) : '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ItemName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataItems;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ItemQuantity\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataItems;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nreturn $gameParty.numItems(database[id]);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Weapon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataWeapons;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"WeaponIcon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataWeapons;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst obj = database[id];\\\\\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\\\\\nreturn icon ? '\\\\\\\\\\\\\\\\x1bI[%1]'.format(icon) : '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"WeaponName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataWeapons;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"WeaponQuantity\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataWeapons;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nreturn $gameParty.numItems(database[id]);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Armor\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataArmors;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ArmorIcon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataArmors;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst obj = database[id];\\\\\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\\\\\nreturn icon ? '\\\\\\\\\\\\\\\\x1bI[%1]'.format(icon) : '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ArmorName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataArmors;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"ArmorQuantity\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataArmors;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nreturn $gameParty.numItems(database[id]);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"State\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataStates;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"StateIcon\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataStates;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst obj = database[id];\\\\\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\\\\\nreturn icon ? '\\\\\\\\\\\\\\\\x1bI[%1]'.format(icon) : '';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"StateName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataStates;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"LastGainObj\\\",\\\"Type:str\\\":\\\"\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const icon = true;\\\\\\\\nreturn this.lastGainedObjectName(icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"LastGainObjIcon\\\",\\\"Type:str\\\":\\\"\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return this.lastGainedObjectIcon();\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"LastGainObjName\\\",\\\"Type:str\\\":\\\"\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const icon = false;\\\\\\\\nreturn this.lastGainedObjectName(icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"LastGainObjQuantity\\\",\\\"Type:str\\\":\\\"\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return this.lastGainedObjectQuantity();\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Enemy\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataEnemies;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"EnemyName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataEnemies;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Troop\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataTroops;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"TroopName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"const database = $dataTroops;\\\\\\\\nconst id = parseInt(arguments[1]);\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"TroopMember\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"if (!$gameParty.inBattle()) return \\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\";\\\\\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\\\\\nconst member = $gameTroop.members()[index];\\\\\\\\nconst database = $dataEnemies;\\\\\\\\nconst id = member ? member.enemyId() : 0;\\\\\\\\nconst icon = true;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"TroopMemberName\\\",\\\"Type:str\\\":\\\"\\\\\\\\[(\\\\\\\\d+)\\\\\\\\]\\\",\\\"TextStr:str\\\":\\\"Undefined\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"if (!$gameParty.inBattle()) return \\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\";\\\\\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\\\\\nconst member = $gameTroop.members()[index];\\\\\\\\nconst database = $dataEnemies;\\\\\\\\nconst id = member ? member.enemyId() : 0;\\\\\\\\nconst icon = false;\\\\\\\\nreturn this.databaseObjectName(database, id, icon);\\\\\\\"\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "TextCodeReplace",
        "fields": [
          {
            "id": "MSG-M-139",
            "key": "Match",
            "storageKey": "Match:str",
            "label": "Match",
            "description": "This is what needs to be matched in order for this text code to work.",
            "editorType": "text",
            "nativeDefault": "Key",
            "type": "string",
            "default": "Key",
            "context": "Configure one /TextCodeReplace row with Match=\"POINTS\", Type=\"\\\\[(\\\\d+)\\\\]\" (the JSON string decodes to a bracketed-digit capture regex), TextStr=\"\" and TextJS=\"return String(Number(arguments[1])*2);\". Show Text \\POINTS[3] converts to6. Match and Type are concatenated as regex source after the escape marker with global/case-insensitive matching; regex captures become callback arguments. Prefer a unique alphabetic Match and use the field option value for Type. TextJS is a function body with this=the text window; arguments follow String.replace: full match, captured groups, match offset, entire input (and named groups if present). TextStr overrides TextJS unless empty or exactly \"Undefined\". Converted text can contain further supported escapes. Conversion may run during text measurement, so keep callbacks free of gameplay side effects."
          },
          {
            "id": "MSG-M-140",
            "key": "Type",
            "storageKey": "Type:str",
            "label": "Type",
            "description": "The type of parameter to obtain (none, number, or string).",
            "editorType": "select",
            "nativeDefault": "",
            "type": "string",
            "options": [
              "",
              "\\[(\\d+)\\]",
              "\\<(.*?)\\>"
            ],
            "default": "",
            "context": "Configure one /TextCodeReplace row with Match=\"POINTS\", Type=\"\\\\[(\\\\d+)\\\\]\" (the JSON string decodes to a bracketed-digit capture regex), TextStr=\"\" and TextJS=\"return String(Number(arguments[1])*2);\". Show Text \\POINTS[3] converts to6. Match and Type are concatenated as regex source after the escape marker with global/case-insensitive matching; regex captures become callback arguments. Prefer a unique alphabetic Match and use the field option value for Type. TextJS is a function body with this=the text window; arguments follow String.replace: full match, captured groups, match offset, entire input (and named groups if present). TextStr overrides TextJS unless empty or exactly \"Undefined\". Converted text can contain further supported escapes. Conversion may run during text measurement, so keep callbacks free of gameplay side effects."
          },
          {
            "id": "MSG-M-141",
            "key": "TextStr",
            "storageKey": "TextStr:str",
            "label": "STR: Text",
            "description": "The text that will appear if this match appears.",
            "editorType": "text",
            "nativeDefault": "Undefined",
            "type": "string",
            "default": "Undefined",
            "context": "Configure one /TextCodeReplace row with Match=\"POINTS\", Type=\"\\\\[(\\\\d+)\\\\]\" (the JSON string decodes to a bracketed-digit capture regex), TextStr=\"\" and TextJS=\"return String(Number(arguments[1])*2);\". Show Text \\POINTS[3] converts to6. Match and Type are concatenated as regex source after the escape marker with global/case-insensitive matching; regex captures become callback arguments. Prefer a unique alphabetic Match and use the field option value for Type. TextJS is a function body with this=the text window; arguments follow String.replace: full match, captured groups, match offset, entire input (and named groups if present). TextStr overrides TextJS unless empty or exactly \"Undefined\". Converted text can contain further supported escapes. Conversion may run during text measurement, so keep callbacks free of gameplay side effects."
          },
          {
            "id": "MSG-M-142",
            "key": "TextJS",
            "storageKey": "TextJS:func",
            "label": "JS: Text",
            "description": "JavaScript code used to determine the text that will appear if this match appears.",
            "editorType": "note",
            "nativeDefault": "\"return 'Text';\"",
            "type": "string",
            "encoding": "json",
            "javascript": "body",
            "default": "return 'Text';",
            "context": "Configure one /TextCodeReplace row with Match=\"POINTS\", Type=\"\\\\[(\\\\d+)\\\\]\" (the JSON string decodes to a bracketed-digit capture regex), TextStr=\"\" and TextJS=\"return String(Number(arguments[1])*2);\". Show Text \\POINTS[3] converts to6. Match and Type are concatenated as regex source after the escape marker with global/case-insensitive matching; regex captures become callback arguments. Prefer a unique alphabetic Match and use the field option value for Type. TextJS is a function body with this=the text window; arguments follow String.replace: full match, captured groups, match offset, entire input (and named groups if present). TextStr overrides TextJS unless empty or exactly \"Undefined\". Converted text can contain further supported escapes. Conversion may run during text measurement, so keep callbacks free of gameplay side effects."
          }
        ]
      },
      "default": [
        {
          "Match": "ActorFace",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const actorId = parseInt(arguments[1]);\nconst actor = $gameActors.actor(actorId);\nif (this.constructor === Window_Message && actor) {\n    $gameMessage.setFaceImage(\n        actor.faceName(),\n        actor.faceIndex()\n    );\n}\nreturn '';"
        },
        {
          "Match": "PartyFace",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const index = parseInt(arguments[1]) - 1;\nconst actor = $gameParty.members()[index];\nif (this.constructor === Window_Message && actor) {\n    $gameMessage.setFaceImage(\n        actor.faceName(),\n        actor.faceIndex()\n    );\n}\nreturn '';"
        },
        {
          "Match": "Class",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataClasses;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "ClassIcon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataClasses;\nconst id = parseInt(arguments[1]);\nconst obj = database[id];\nconst icon = obj ? (obj.iconIndex || 0) : 0;\nreturn icon ? '\\x1bI[%1]'.format(icon) : '';"
        },
        {
          "Match": "ClassName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataClasses;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "Skill",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataSkills;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "SkillIcon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataSkills;\nconst id = parseInt(arguments[1]);\nconst obj = database[id];\nconst icon = obj ? (obj.iconIndex || 0) : 0;\nreturn icon ? '\\x1bI[%1]'.format(icon) : '';"
        },
        {
          "Match": "SkillName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataSkills;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "Item",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataItems;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "ItemIcon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataItems;\nconst id = parseInt(arguments[1]);\nconst obj = database[id];\nconst icon = obj ? (obj.iconIndex || 0) : 0;\nreturn icon ? '\\x1bI[%1]'.format(icon) : '';"
        },
        {
          "Match": "ItemName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataItems;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "ItemQuantity",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataItems;\nconst id = parseInt(arguments[1]);\nreturn $gameParty.numItems(database[id]);"
        },
        {
          "Match": "Weapon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataWeapons;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "WeaponIcon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataWeapons;\nconst id = parseInt(arguments[1]);\nconst obj = database[id];\nconst icon = obj ? (obj.iconIndex || 0) : 0;\nreturn icon ? '\\x1bI[%1]'.format(icon) : '';"
        },
        {
          "Match": "WeaponName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataWeapons;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "WeaponQuantity",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataWeapons;\nconst id = parseInt(arguments[1]);\nreturn $gameParty.numItems(database[id]);"
        },
        {
          "Match": "Armor",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataArmors;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "ArmorIcon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataArmors;\nconst id = parseInt(arguments[1]);\nconst obj = database[id];\nconst icon = obj ? (obj.iconIndex || 0) : 0;\nreturn icon ? '\\x1bI[%1]'.format(icon) : '';"
        },
        {
          "Match": "ArmorName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataArmors;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "ArmorQuantity",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataArmors;\nconst id = parseInt(arguments[1]);\nreturn $gameParty.numItems(database[id]);"
        },
        {
          "Match": "State",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataStates;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "StateIcon",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataStates;\nconst id = parseInt(arguments[1]);\nconst obj = database[id];\nconst icon = obj ? (obj.iconIndex || 0) : 0;\nreturn icon ? '\\x1bI[%1]'.format(icon) : '';"
        },
        {
          "Match": "StateName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataStates;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "LastGainObj",
          "Type": "",
          "TextStr": "Undefined",
          "TextJS": "const icon = true;\nreturn this.lastGainedObjectName(icon);"
        },
        {
          "Match": "LastGainObjIcon",
          "Type": "",
          "TextStr": "Undefined",
          "TextJS": "return this.lastGainedObjectIcon();"
        },
        {
          "Match": "LastGainObjName",
          "Type": "",
          "TextStr": "Undefined",
          "TextJS": "const icon = false;\nreturn this.lastGainedObjectName(icon);"
        },
        {
          "Match": "LastGainObjQuantity",
          "Type": "",
          "TextStr": "Undefined",
          "TextJS": "return this.lastGainedObjectQuantity();"
        },
        {
          "Match": "Enemy",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataEnemies;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "EnemyName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataEnemies;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "Troop",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataTroops;\nconst id = parseInt(arguments[1]);\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "TroopName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "const database = $dataTroops;\nconst id = parseInt(arguments[1]);\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "TroopMember",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "if (!$gameParty.inBattle()) return \"\";\nconst index = (parseInt(arguments[1]) - 1) || 0;\nconst member = $gameTroop.members()[index];\nconst database = $dataEnemies;\nconst id = member ? member.enemyId() : 0;\nconst icon = true;\nreturn this.databaseObjectName(database, id, icon);"
        },
        {
          "Match": "TroopMemberName",
          "Type": "\\[(\\d+)\\]",
          "TextStr": "Undefined",
          "TextJS": "if (!$gameParty.inBattle()) return \"\";\nconst index = (parseInt(arguments[1]) - 1) || 0;\nconst member = $gameTroop.members()[index];\nconst database = $dataEnemies;\nconst id = member ? member.enemyId() : 0;\nconst icon = false;\nreturn this.databaseObjectName(database, id, icon);"
        }
      ],
      "context": "Register replacement records and invoke them with a backslash in text. Example item: {\"Match\":\"Greeting\",\"Type\":\"\",\"TextStr\":\"Hello!\",\"TextJS\":\"return 'Fallback';\"}; Show Text \\Greeting yields Hello!. A nonempty TextStr other than the exact sentinel Undefined wins; only otherwise is TextJS called. In TextJS, this is the converting window; arguments are the String.replace callback arguments (full match, captures, offset, input, plus named groups if present). Match and Type form a case-insensitive global regular expression; escape regex metacharacters when a literal is intended. Rules run by descending Match-string length, preserving input order for equal lengths; later rules can process earlier output. JavaScript can be called during measurement too, so use it to return text without game side effects. Setting the whole array replaces it: read, append complete records, then set to preserve prior rules."
    },
    {
      "id": "MSG-M-057",
      "key": "TextMacros",
      "storageKey": "TextMacros:arraystruct",
      "label": "Text Code Macros",
      "description": "Macros that are used to quickly write batches of text.",
      "editorType": "struct<TextMacro>[]",
      "nativeDefault": "[\"{\\\"Match:str\\\":\\\"Example Macro\\\",\\\"TextStr:str\\\":\\\"This is the text that will be displayed when you type [Example Macro].\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return 'Text';\\\\\\\"\\\"}\",\"{\\\"Match:str\\\":\\\"Leader\\\",\\\"TextStr:str\\\":\\\"\\\\\\\\P[1]\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return 'Text';\\\\\\\"\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "TextMacro",
        "fields": [
          {
            "id": "MSG-M-143",
            "key": "Match",
            "storageKey": "Match:str",
            "label": "Match",
            "description": "This is what needs to be matched in order for this macro to work.",
            "editorType": "text",
            "nativeDefault": "Key",
            "type": "string",
            "default": "Key",
            "context": "Configure one /TextMacros row with Match=\"GREETING\", TextStr=\"Hello\" and TextJS=\"return 'Hello';\". Use [GREETING] in Show Text; no backslash is required. Match is embedded as regex source inside literal square brackets, global/case-insensitive, so choose a unique name without regex metacharacters. Entries run in configured order. TextStr overrides TextJS unless empty or exactly \"Undefined\"; clear it to use the script. TextJS is a function body with this=the text window and String.replace arguments: full match, any capture groups, offset, full input (plus named groups if defined). For example Match=\"VALUE(\\\\d+)\" and TextJS=\"return arguments[1];\" reads a captured number from [VALUE3]. Macro conversion may run in measurement; avoid gameplay side effects. It is a text substitution, not a plugin command."
          },
          {
            "id": "MSG-M-144",
            "key": "TextStr",
            "storageKey": "TextStr:str",
            "label": "STR: Text",
            "description": "The replacement text that will appear from the macro.",
            "editorType": "text",
            "nativeDefault": "Undefined",
            "type": "string",
            "default": "Undefined",
            "context": "Configure one /TextMacros row with Match=\"GREETING\", TextStr=\"Hello\" and TextJS=\"return 'Hello';\". Use [GREETING] in Show Text; no backslash is required. Match is embedded as regex source inside literal square brackets, global/case-insensitive, so choose a unique name without regex metacharacters. Entries run in configured order. TextStr overrides TextJS unless empty or exactly \"Undefined\"; clear it to use the script. TextJS is a function body with this=the text window and String.replace arguments: full match, any capture groups, offset, full input (plus named groups if defined). For example Match=\"VALUE(\\\\d+)\" and TextJS=\"return arguments[1];\" reads a captured number from [VALUE3]. Macro conversion may run in measurement; avoid gameplay side effects. It is a text substitution, not a plugin command."
          },
          {
            "id": "MSG-M-145",
            "key": "TextJS",
            "storageKey": "TextJS:func",
            "label": "JS: Text",
            "description": "JavaScript code used to determine the text that will appear if this macro appears.",
            "editorType": "note",
            "nativeDefault": "\"return 'Text';\"",
            "type": "string",
            "encoding": "json",
            "javascript": "body",
            "default": "return 'Text';",
            "context": "Configure one /TextMacros row with Match=\"GREETING\", TextStr=\"Hello\" and TextJS=\"return 'Hello';\". Use [GREETING] in Show Text; no backslash is required. Match is embedded as regex source inside literal square brackets, global/case-insensitive, so choose a unique name without regex metacharacters. Entries run in configured order. TextStr overrides TextJS unless empty or exactly \"Undefined\"; clear it to use the script. TextJS is a function body with this=the text window and String.replace arguments: full match, any capture groups, offset, full input (plus named groups if defined). For example Match=\"VALUE(\\\\d+)\" and TextJS=\"return arguments[1];\" reads a captured number from [VALUE3]. Macro conversion may run in measurement; avoid gameplay side effects. It is a text substitution, not a plugin command."
          }
        ]
      },
      "default": [
        {
          "Match": "Example Macro",
          "TextStr": "This is the text that will be displayed when you type [Example Macro].",
          "TextJS": "return 'Text';"
        },
        {
          "Match": "Leader",
          "TextStr": "\\P[1]",
          "TextJS": "return 'Text';"
        }
      ],
      "context": "Register macro records, then use [Match] without a backslash. Example item: {\"Match\":\"Greeting\",\"TextStr\":\"Hello!\",\"TextJS\":\"return 'Fallback';\"}; Show Text [Greeting] yields Hello!. A nonempty TextStr other than the exact sentinel Undefined wins; otherwise TextJS supplies the text. In TextJS, this is the converting window; arguments are the String.replace callback arguments (full match, captures, offset, input, plus named groups if present). Match is embedded in a case-insensitive global regular expression within literal brackets, so avoid regex metacharacters for simple names. Macros run in array order; later macros can process earlier output and duplicate matches may already have been replaced. JavaScript can run during measurement, so keep it free of game side effects. Setting the whole array replaces it: read, append complete records, then set to preserve existing macros."
    },
    {
      "id": "MSG-M-058",
      "key": "Localization",
      "storageKey": "Localization:struct",
      "label": "Text Language Settings",
      "description": "Text Language settings for this plugin.",
      "editorType": "struct<Localization>",
      "nativeDefault": "{\"Main\":\"\",\"Enable:eval\":\"false\",\"CsvFilename:str\":\"Languages.csv\",\"Options\":\"\",\"AddOption:eval\":\"true\",\"AdjustRect:eval\":\"true\",\"Name:str\":\"Text Language\",\"Localized\":\"\",\"DefaultLocale:str\":\"English\",\"Languages:arraystr\":\"[\\\"Bengali\\\",\\\"Chinese(Simplified)\\\",\\\"Chinese(Traditional)\\\",\\\"Czech\\\",\\\"Danish\\\",\\\"Dutch\\\",\\\"English\\\",\\\"Finnish\\\",\\\"French\\\",\\\"German\\\",\\\"Greek\\\",\\\"Hindi\\\",\\\"Hungarian\\\",\\\"Indonesian\\\",\\\"Italian\\\",\\\"Japanese\\\",\\\"Korean\\\",\\\"Norwegian\\\",\\\"Polish\\\",\\\"Portuguese\\\",\\\"Romanian\\\",\\\"Russian\\\",\\\"Slovak\\\",\\\"Spanish\\\",\\\"Swedish\\\",\\\"Tamil\\\",\\\"Thai\\\",\\\"Turkish\\\"]\",\"LangNames\":\"\",\"Bengali:str\":\"বাংলা\",\"Chinese(Simplified):str\":\"简体中文\",\"Chinese(Traditional):str\":\"繁體中文\",\"Czech:str\":\"Čeština\",\"Danish:str\":\"Dansk\",\"Dutch:str\":\"Nederlands\",\"English:str\":\"English\",\"Finnish:str\":\"Suomi\",\"French:str\":\"Français\",\"German:str\":\"Deutsch\",\"Greek:str\":\"Ελληνικά\",\"Hindi:str\":\"हिन्दी\",\"Hungarian:str\":\"Magyar\",\"Indonesian:str\":\"Bahasa Indo\",\"Italian:str\":\"Italiano\",\"Japanese:str\":\"日本語\",\"Korean:str\":\"한국어\",\"Norwegian:str\":\"Norsk\",\"Polish:str\":\"Polski\",\"Portuguese:str\":\"Português\",\"Romanian:str\":\"Română\",\"Russian:str\":\"Русский\",\"Slovak:str\":\"Slovenčina\",\"Spanish:str\":\"Español\",\"Swedish:str\":\"Svenska\",\"Tamil:str\":\"தமிழ்\",\"Thai:str\":\"ไทย\",\"Turkish:str\":\"Türkçe\"}",
      "type": "struct",
      "structName": "Localization",
      "fields": [
        {
          "id": "MSG-M-147",
          "key": "Enable",
          "storageKey": "Enable:eval",
          "label": "Enable Switching?",
          "description": "Enable language switching settings for this plugin?",
          "editorType": "boolean",
          "nativeDefault": "false",
          "type": "boolean",
          "default": false,
          "context": "Requires /Localization/Enable=true and a nonempty Languages array. Place the configured basename Languages.csv or Languages.tsv in the game root, beside index.html, not data/. CSV uses semicolons; TSV uses tabs. UTF-8 header starts Key followed by language column names such as English and Portuguese. Each row must have the same number of cells; keys and column names must be nonempty and unique after case/whitespace normalization. Use <br> inside cells instead of physical newlines. Example CSV: Key;English;Portuguese followed by a new row Greeting;Hello;Ola. Author Show Text as $[Greeting] or \\KEY[Greeting]. Key lookup ignores case/outer whitespace, but language-column lookup uses the exact configured locale spelling after trimming the header. A missing key returns undefined (explicit replacement can render \"undefined\"); a missing/empty language cell renders UNDEFINED!, not an English fallback. HTTP/parse failure stops database readiness with a load error; no file is created by the runtime. See MSG-BEH-language-write-boundary for CLI create/convert/validate commands."
        },
        {
          "id": "MSG-M-148",
          "key": "LangFiletype",
          "storageKey": "LangFiletype:str",
          "label": "File Type",
          "description": "Which file type do you wish to use?",
          "editorType": "select",
          "nativeDefault": "tsv",
          "type": "string",
          "options": [
            "csv",
            "tsv"
          ],
          "default": "tsv"
        },
        {
          "id": "MSG-M-149",
          "key": "CsvFilename",
          "storageKey": "CsvFilename:str",
          "label": "CSV Filename",
          "description": "What is the filename of the CSV file to read from?",
          "editorType": "text",
          "nativeDefault": "Languages.csv",
          "type": "string",
          "default": "Languages.csv",
          "context": "Requires /Localization/Enable=true and a nonempty Languages array. Place the configured basename Languages.csv or Languages.tsv in the game root, beside index.html, not data/. CSV uses semicolons; TSV uses tabs. UTF-8 header starts Key followed by language column names such as English and Portuguese. Each row must have the same number of cells; keys and column names must be nonempty and unique after case/whitespace normalization. Use <br> inside cells instead of physical newlines. Example CSV: Key;English;Portuguese followed by a new row Greeting;Hello;Ola. Author Show Text as $[Greeting] or \\KEY[Greeting]. Key lookup ignores case/outer whitespace, but language-column lookup uses the exact configured locale spelling after trimming the header. A missing key returns undefined (explicit replacement can render \"undefined\"); a missing/empty language cell renders UNDEFINED!, not an English fallback. HTTP/parse failure stops database readiness with a load error; no file is created by the runtime. See MSG-BEH-language-write-boundary for CLI create/convert/validate commands."
        },
        {
          "id": "MSG-M-150",
          "key": "TsvFilename",
          "storageKey": "TsvFilename:str",
          "label": "TSV Filename",
          "description": "What is the filename of the TSV file to read from?",
          "editorType": "text",
          "nativeDefault": "Languages.tsv",
          "type": "string",
          "default": "Languages.tsv",
          "context": "Requires /Localization/Enable=true and a nonempty Languages array. Place the configured basename Languages.csv or Languages.tsv in the game root, beside index.html, not data/. CSV uses semicolons; TSV uses tabs. UTF-8 header starts Key followed by language column names such as English and Portuguese. Each row must have the same number of cells; keys and column names must be nonempty and unique after case/whitespace normalization. Use <br> inside cells instead of physical newlines. Example CSV: Key;English;Portuguese followed by a new row Greeting;Hello;Ola. Author Show Text as $[Greeting] or \\KEY[Greeting]. Key lookup ignores case/outer whitespace, but language-column lookup uses the exact configured locale spelling after trimming the header. A missing key returns undefined (explicit replacement can render \"undefined\"); a missing/empty language cell renders UNDEFINED!, not an English fallback. HTTP/parse failure stops database readiness with a load error; no file is created by the runtime. See MSG-BEH-language-write-boundary for CLI create/convert/validate commands."
        },
        {
          "id": "MSG-M-152",
          "key": "AddOption",
          "storageKey": "AddOption:eval",
          "label": "Add Option?",
          "description": "Add the 'Language' option to the Options menu?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-153",
          "key": "AdjustRect",
          "storageKey": "AdjustRect:eval",
          "label": "Adjust Window Height",
          "description": "Automatically adjust the options window height?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-154",
          "key": "Name",
          "storageKey": "Name:str",
          "label": "Option Name",
          "description": "Command name of the option.",
          "editorType": "text",
          "nativeDefault": "Text Language",
          "type": "string",
          "default": "Text Language"
        },
        {
          "id": "MSG-M-156",
          "key": "DefaultLocale",
          "storageKey": "DefaultLocale:str",
          "label": "Default Language",
          "description": "What is the default language used for this game?",
          "editorType": "select",
          "nativeDefault": "English",
          "type": "string",
          "options": [
            "Bengali",
            "Chinese(Simplified)",
            "Chinese(Traditional)",
            "Czech",
            "Danish",
            "Dutch",
            "English",
            "Finnish",
            "French",
            "German",
            "Greek",
            "Hindi",
            "Hungarian",
            "Indonesian",
            "Italian",
            "Japanese",
            "Korean",
            "Norwegian",
            "Polish",
            "Portuguese",
            "Romanian",
            "Russian",
            "Slovak",
            "Spanish",
            "Swedish",
            "Tamil",
            "Thai",
            "Turkish"
          ],
          "default": "English",
          "context": "Requires /Localization/Enable=true and a nonempty Languages array. Place the configured basename Languages.csv or Languages.tsv in the game root, beside index.html, not data/. CSV uses semicolons; TSV uses tabs. UTF-8 header starts Key followed by language column names such as English and Portuguese. Each row must have the same number of cells; keys and column names must be nonempty and unique after case/whitespace normalization. Use <br> inside cells instead of physical newlines. Example CSV: Key;English;Portuguese followed by a new row Greeting;Hello;Ola. Author Show Text as $[Greeting] or \\KEY[Greeting]. Key lookup ignores case/outer whitespace, but language-column lookup uses the exact configured locale spelling after trimming the header. A missing key returns undefined (explicit replacement can render \"undefined\"); a missing/empty language cell renders UNDEFINED!, not an English fallback. HTTP/parse failure stops database readiness with a load error; no file is created by the runtime. See MSG-BEH-language-write-boundary for CLI create/convert/validate commands."
        },
        {
          "id": "MSG-M-157",
          "key": "Languages",
          "storageKey": "Languages:arraystr",
          "label": "Supported Languages",
          "description": "What are all the supported languages supported by this",
          "editorType": "select[]",
          "nativeDefault": "[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]",
          "type": "array",
          "items": {
            "type": "string",
            "options": [
              "Bengali",
              "Chinese(Simplified)",
              "Chinese(Traditional)",
              "Czech",
              "Danish",
              "Dutch",
              "English",
              "Finnish",
              "French",
              "German",
              "Greek",
              "Hindi",
              "Hungarian",
              "Indonesian",
              "Italian",
              "Japanese",
              "Korean",
              "Norwegian",
              "Polish",
              "Portuguese",
              "Romanian",
              "Russian",
              "Slovak",
              "Spanish",
              "Swedish",
              "Tamil",
              "Thai",
              "Turkish"
            ]
          },
          "default": [
            "Bengali",
            "Chinese(Simplified)",
            "Chinese(Traditional)",
            "Czech",
            "Danish",
            "Dutch",
            "English",
            "Finnish",
            "French",
            "German",
            "Greek",
            "Hindi",
            "Hungarian",
            "Indonesian",
            "Italian",
            "Japanese",
            "Korean",
            "Norwegian",
            "Polish",
            "Portuguese",
            "Romanian",
            "Russian",
            "Slovak",
            "Spanish",
            "Swedish",
            "Tamil",
            "Thai",
            "Turkish"
          ]
        },
        {
          "id": "MSG-M-159",
          "key": "Bengali",
          "storageKey": "Bengali:str",
          "label": "Bengali",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "বাংলা",
          "type": "string",
          "default": "বাংলা"
        },
        {
          "id": "MSG-M-160",
          "key": "Chinese(Simplified)",
          "storageKey": "Chinese(Simplified):str",
          "label": "Chinese (Simplified)",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "简体中文",
          "type": "string",
          "default": "简体中文"
        },
        {
          "id": "MSG-M-161",
          "key": "Chinese(Traditional)",
          "storageKey": "Chinese(Traditional):str",
          "label": "Chinese (Traditional)",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "繁體中文",
          "type": "string",
          "default": "繁體中文"
        },
        {
          "id": "MSG-M-162",
          "key": "Czech",
          "storageKey": "Czech:str",
          "label": "Czech",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Čeština",
          "type": "string",
          "default": "Čeština"
        },
        {
          "id": "MSG-M-163",
          "key": "Danish",
          "storageKey": "Danish:str",
          "label": "Danish",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Dansk",
          "type": "string",
          "default": "Dansk"
        },
        {
          "id": "MSG-M-164",
          "key": "Dutch",
          "storageKey": "Dutch:str",
          "label": "Dutch",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Nederlands",
          "type": "string",
          "default": "Nederlands"
        },
        {
          "id": "MSG-M-165",
          "key": "English",
          "storageKey": "English:str",
          "label": "English",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "English",
          "type": "string",
          "default": "English"
        },
        {
          "id": "MSG-M-166",
          "key": "Finnish",
          "storageKey": "Finnish:str",
          "label": "Finnish",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Suomi",
          "type": "string",
          "default": "Suomi"
        },
        {
          "id": "MSG-M-167",
          "key": "French",
          "storageKey": "French:str",
          "label": "French",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Français",
          "type": "string",
          "default": "Français"
        },
        {
          "id": "MSG-M-168",
          "key": "German",
          "storageKey": "German:str",
          "label": "German",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Deutsch",
          "type": "string",
          "default": "Deutsch"
        },
        {
          "id": "MSG-M-169",
          "key": "Greek",
          "storageKey": "Greek:str",
          "label": "Greek",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Ελληνικά",
          "type": "string",
          "default": "Ελληνικά"
        },
        {
          "id": "MSG-M-170",
          "key": "Hindi",
          "storageKey": "Hindi:str",
          "label": "Hindi",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "हिन्दी",
          "type": "string",
          "default": "हिन्दी"
        },
        {
          "id": "MSG-M-171",
          "key": "Hungarian",
          "storageKey": "Hungarian:str",
          "label": "Hungarian",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Magyar",
          "type": "string",
          "default": "Magyar"
        },
        {
          "id": "MSG-M-172",
          "key": "Indonesian",
          "storageKey": "Indonesian:str",
          "label": "Indonesian",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Bahasa Indo",
          "type": "string",
          "default": "Bahasa Indo"
        },
        {
          "id": "MSG-M-173",
          "key": "Italian",
          "storageKey": "Italian:str",
          "label": "Italian",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Italiano",
          "type": "string",
          "default": "Italiano"
        },
        {
          "id": "MSG-M-174",
          "key": "Japanese",
          "storageKey": "Japanese:str",
          "label": "Japanese",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "日本語",
          "type": "string",
          "default": "日本語"
        },
        {
          "id": "MSG-M-175",
          "key": "Korean",
          "storageKey": "Korean:str",
          "label": "Korean",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "한국어",
          "type": "string",
          "default": "한국어"
        },
        {
          "id": "MSG-M-176",
          "key": "Norwegian",
          "storageKey": "Norwegian:str",
          "label": "Norwegian",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Norsk",
          "type": "string",
          "default": "Norsk"
        },
        {
          "id": "MSG-M-177",
          "key": "Polish",
          "storageKey": "Polish:str",
          "label": "Polish",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Polski",
          "type": "string",
          "default": "Polski"
        },
        {
          "id": "MSG-M-178",
          "key": "Portuguese",
          "storageKey": "Portuguese:str",
          "label": "Portuguese",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Português",
          "type": "string",
          "default": "Português"
        },
        {
          "id": "MSG-M-179",
          "key": "Romanian",
          "storageKey": "Romanian:str",
          "label": "Romanian",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Română",
          "type": "string",
          "default": "Română"
        },
        {
          "id": "MSG-M-180",
          "key": "Russian",
          "storageKey": "Russian:str",
          "label": "Russian",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Русский",
          "type": "string",
          "default": "Русский"
        },
        {
          "id": "MSG-M-181",
          "key": "Slovak",
          "storageKey": "Slovak:str",
          "label": "Slovak",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Slovenčina",
          "type": "string",
          "default": "Slovenčina"
        },
        {
          "id": "MSG-M-182",
          "key": "Spanish",
          "storageKey": "Spanish:str",
          "label": "Spanish",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Español",
          "type": "string",
          "default": "Español"
        },
        {
          "id": "MSG-M-183",
          "key": "Swedish",
          "storageKey": "Swedish:str",
          "label": "Swedish",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Svenska",
          "type": "string",
          "default": "Svenska"
        },
        {
          "id": "MSG-M-184",
          "key": "Tamil",
          "storageKey": "Tamil:str",
          "label": "Tamil",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "தமிழ்",
          "type": "string",
          "default": "தமிழ்"
        },
        {
          "id": "MSG-M-185",
          "key": "Thai",
          "storageKey": "Thai:str",
          "label": "Thai",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "ไทย",
          "type": "string",
          "default": "ไทย"
        },
        {
          "id": "MSG-M-186",
          "key": "Turkish",
          "storageKey": "Turkish:str",
          "label": "Turkish",
          "description": "How does this language appear in the in-game options?",
          "editorType": "text",
          "nativeDefault": "Türkçe",
          "type": "string",
          "default": "Türkçe"
        }
      ],
      "default": {
        "Enable": false,
        "LangFiletype": "tsv",
        "CsvFilename": "Languages.csv",
        "TsvFilename": "Languages.tsv",
        "AddOption": true,
        "AdjustRect": true,
        "Name": "Text Language",
        "DefaultLocale": "English",
        "Languages": [
          "Bengali",
          "Chinese(Simplified)",
          "Chinese(Traditional)",
          "Czech",
          "Danish",
          "Dutch",
          "English",
          "Finnish",
          "French",
          "German",
          "Greek",
          "Hindi",
          "Hungarian",
          "Indonesian",
          "Italian",
          "Japanese",
          "Korean",
          "Norwegian",
          "Polish",
          "Portuguese",
          "Romanian",
          "Russian",
          "Slovak",
          "Spanish",
          "Swedish",
          "Tamil",
          "Thai",
          "Turkish"
        ],
        "Bengali": "বাংলা",
        "Chinese(Simplified)": "简体中文",
        "Chinese(Traditional)": "繁體中文",
        "Czech": "Čeština",
        "Danish": "Dansk",
        "Dutch": "Nederlands",
        "English": "English",
        "Finnish": "Suomi",
        "French": "Français",
        "German": "Deutsch",
        "Greek": "Ελληνικά",
        "Hindi": "हिन्दी",
        "Hungarian": "Magyar",
        "Indonesian": "Bahasa Indo",
        "Italian": "Italiano",
        "Japanese": "日本語",
        "Korean": "한국어",
        "Norwegian": "Norsk",
        "Polish": "Polski",
        "Portuguese": "Português",
        "Romanian": "Română",
        "Russian": "Русский",
        "Slovak": "Slovenčina",
        "Spanish": "Español",
        "Swedish": "Svenska",
        "Tamil": "தமிழ்",
        "Thai": "ไทย",
        "Turkish": "Türkçe"
      },
      "context": "Requires /Localization/Enable=true and a nonempty Languages array. Place the configured basename Languages.csv or Languages.tsv in the game root, beside index.html, not data/. CSV uses semicolons; TSV uses tabs. UTF-8 header starts Key followed by language column names such as English and Portuguese. Each row must have the same number of cells; keys and column names must be nonempty and unique after case/whitespace normalization. Use <br> inside cells instead of physical newlines. Example CSV: Key;English;Portuguese followed by a new row Greeting;Hello;Ola. Author Show Text as $[Greeting] or \\KEY[Greeting]. Key lookup ignores case/outer whitespace, but language-column lookup uses the exact configured locale spelling after trimming the header. A missing key returns undefined (explicit replacement can render \"undefined\"); a missing/empty language cell renders UNDEFINED!, not an English fallback. HTTP/parse failure stops database readiness with a load error; no file is created by the runtime. See MSG-BEH-language-write-boundary for CLI create/convert/validate commands."
    },
    {
      "id": "MSG-M-059",
      "key": "LanguageFonts",
      "storageKey": "LanguageFonts:struct",
      "label": "Language Fonts",
      "description": "Different default fonts used for different languages.",
      "editorType": "struct<LanguageFonts>",
      "nativeDefault": "{\"Bengali:str\":\"rmmz-mainfont\",\"Chinese(Simplified):str\":\"rmmz-mainfont\",\"Chinese(Traditional):str\":\"rmmz-mainfont\",\"Czech:str\":\"rmmz-mainfont\",\"Danish:str\":\"rmmz-mainfont\",\"Dutch:str\":\"rmmz-mainfont\",\"English:str\":\"rmmz-mainfont\",\"Finnish:str\":\"rmmz-mainfont\",\"French:str\":\"rmmz-mainfont\",\"German:str\":\"rmmz-mainfont\",\"Greek:str\":\"rmmz-mainfont\",\"Hindi:str\":\"rmmz-mainfont\",\"Hungarian:str\":\"rmmz-mainfont\",\"Indonesian:str\":\"rmmz-mainfont\",\"Italian:str\":\"rmmz-mainfont\",\"Japanese:str\":\"rmmz-mainfont\",\"Korean:str\":\"rmmz-mainfont\",\"Norwegian:str\":\"rmmz-mainfont\",\"Polish:str\":\"rmmz-mainfont\",\"Portuguese:str\":\"rmmz-mainfont\",\"Romanian:str\":\"rmmz-mainfont\",\"Russian:str\":\"rmmz-mainfont\",\"Slovak:str\":\"rmmz-mainfont\",\"Spanish:str\":\"rmmz-mainfont\",\"Swedish:str\":\"rmmz-mainfont\",\"Tamil:str\":\"rmmz-mainfont\",\"Thai:str\":\"rmmz-mainfont\",\"Turkish:str\":\"rmmz-mainfont\"}",
      "type": "struct",
      "structName": "LanguageFonts",
      "fields": [
        {
          "id": "MSG-M-187",
          "key": "Bengali",
          "storageKey": "Bengali:str",
          "label": "Bengali",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-188",
          "key": "Chinese(Simplified)",
          "storageKey": "Chinese(Simplified):str",
          "label": "Chinese (Simplified)",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-189",
          "key": "Chinese(Traditional)",
          "storageKey": "Chinese(Traditional):str",
          "label": "Chinese (Traditional)",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-190",
          "key": "Czech",
          "storageKey": "Czech:str",
          "label": "Czech",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-191",
          "key": "Danish",
          "storageKey": "Danish:str",
          "label": "Danish",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-192",
          "key": "Dutch",
          "storageKey": "Dutch:str",
          "label": "Dutch",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-193",
          "key": "English",
          "storageKey": "English:str",
          "label": "English",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-194",
          "key": "Finnish",
          "storageKey": "Finnish:str",
          "label": "Finnish",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-195",
          "key": "French",
          "storageKey": "French:str",
          "label": "French",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-196",
          "key": "German",
          "storageKey": "German:str",
          "label": "German",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-197",
          "key": "Greek",
          "storageKey": "Greek:str",
          "label": "Greek",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-198",
          "key": "Hindi",
          "storageKey": "Hindi:str",
          "label": "Hindi",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-199",
          "key": "Hungarian",
          "storageKey": "Hungarian:str",
          "label": "Hungarian",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-200",
          "key": "Indonesian",
          "storageKey": "Indonesian:str",
          "label": "Indonesian",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-201",
          "key": "Italian",
          "storageKey": "Italian:str",
          "label": "Italian",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-202",
          "key": "Japanese",
          "storageKey": "Japanese:str",
          "label": "Japanese",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-203",
          "key": "Korean",
          "storageKey": "Korean:str",
          "label": "Korean",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-204",
          "key": "Norwegian",
          "storageKey": "Norwegian:str",
          "label": "Norwegian",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-205",
          "key": "Polish",
          "storageKey": "Polish:str",
          "label": "Polish",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-206",
          "key": "Portuguese",
          "storageKey": "Portuguese:str",
          "label": "Portuguese",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-207",
          "key": "Romanian",
          "storageKey": "Romanian:str",
          "label": "Romanian",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-208",
          "key": "Russian",
          "storageKey": "Russian:str",
          "label": "Russian",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-209",
          "key": "Slovak",
          "storageKey": "Slovak:str",
          "label": "Slovak",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-210",
          "key": "Spanish",
          "storageKey": "Spanish:str",
          "label": "Spanish",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-211",
          "key": "Swedish",
          "storageKey": "Swedish:str",
          "label": "Swedish",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-212",
          "key": "Tamil",
          "storageKey": "Tamil:str",
          "label": "Tamil",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-213",
          "key": "Thai",
          "storageKey": "Thai:str",
          "label": "Thai",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        },
        {
          "id": "MSG-M-214",
          "key": "Turkish",
          "storageKey": "Turkish:str",
          "label": "Turkish",
          "description": "What font face is used for this language?",
          "editorType": "text",
          "nativeDefault": "rmmz-mainfont",
          "type": "string",
          "default": "rmmz-mainfont",
          "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
        }
      ],
      "default": {
        "Bengali": "rmmz-mainfont",
        "Chinese(Simplified)": "rmmz-mainfont",
        "Chinese(Traditional)": "rmmz-mainfont",
        "Czech": "rmmz-mainfont",
        "Danish": "rmmz-mainfont",
        "Dutch": "rmmz-mainfont",
        "English": "rmmz-mainfont",
        "Finnish": "rmmz-mainfont",
        "French": "rmmz-mainfont",
        "German": "rmmz-mainfont",
        "Greek": "rmmz-mainfont",
        "Hindi": "rmmz-mainfont",
        "Hungarian": "rmmz-mainfont",
        "Indonesian": "rmmz-mainfont",
        "Italian": "rmmz-mainfont",
        "Japanese": "rmmz-mainfont",
        "Korean": "rmmz-mainfont",
        "Norwegian": "rmmz-mainfont",
        "Polish": "rmmz-mainfont",
        "Portuguese": "rmmz-mainfont",
        "Romanian": "rmmz-mainfont",
        "Russian": "rmmz-mainfont",
        "Slovak": "rmmz-mainfont",
        "Spanish": "rmmz-mainfont",
        "Swedish": "rmmz-mainfont",
        "Tamil": "rmmz-mainfont",
        "Thai": "rmmz-mainfont",
        "Turkish": "rmmz-mainfont"
      },
      "context": "Requires localization enabled. The selected locale uses this configured CSS/font family unless ConfigManager.textFont is truthy (an Options font choice then takes precedence). This field does not load a font file. To add one, configure /CustomFonts with FontFamily and an existing Filename in fonts/, for example family \"MyFont\" and file \"MyFont.ttf\", then use MyFont here. Boot loads that file through FontManager; a load failure is an engine loading error. Empty/unconfigured language family uses rmmz-mainfont; the Database advanced fallbackFonts list is appended to the chosen family for unavailable glyphs/browser font fallback. The same main font face supplies measurement and drawing."
    },
    {
      "id": "MSG-M-060",
      "key": "LanguageImages",
      "storageKey": "LanguageImages:struct",
      "label": "Language Images",
      "description": "Choose image filename markers for each active language.",
      "editorType": "struct<LanguageImages>",
      "nativeDefault": "{\"ConvertDefault:eval\":\"false\",\"Languages\":\"\",\"Bengali:str\":\"[XX]\",\"Chinese(Simplified):str\":\"[XX]\",\"Chinese(Traditional):str\":\"[XX]\",\"Czech:str\":\"[XX]\",\"Danish:str\":\"[XX]\",\"Dutch:str\":\"[XX]\",\"English:str\":\"[XX]\",\"Finnish:str\":\"[XX]\",\"French:str\":\"[XX]\",\"German:str\":\"[XX]\",\"Greek:str\":\"[XX]\",\"Hindi:str\":\"[XX]\",\"Hungarian:str\":\"[XX]\",\"Indonesian:str\":\"[XX]\",\"Italian:str\":\"[XX]\",\"Japanese:str\":\"[XX]\",\"Korean:str\":\"[XX]\",\"Norwegian:str\":\"[XX]\",\"Polish:str\":\"[XX]\",\"Portuguese:str\":\"[XX]\",\"Romanian:str\":\"[XX]\",\"Russian:str\":\"[XX]\",\"Slovak:str\":\"[XX]\",\"Spanish:str\":\"[XX]\",\"Swedish:str\":\"[XX]\",\"Tamil:str\":\"[XX]\",\"Thai:str\":\"[XX]\",\"Turkish:str\":\"[XX]\"}",
      "type": "struct",
      "structName": "LanguageImages",
      "fields": [
        {
          "id": "MSG-M-215",
          "key": "ConvertDefault",
          "storageKey": "ConvertDefault:eval",
          "label": "Convert Default?",
          "description": "ON: Default language uses converted marker.",
          "editorType": "boolean",
          "nativeDefault": "false",
          "type": "boolean",
          "default": false,
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-217",
          "key": "Bengali",
          "storageKey": "Bengali:str",
          "label": "Bengali",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-218",
          "key": "Chinese(Simplified)",
          "storageKey": "Chinese(Simplified):str",
          "label": "Chinese (Simplified)",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-219",
          "key": "Chinese(Traditional)",
          "storageKey": "Chinese(Traditional):str",
          "label": "Chinese (Traditional)",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-220",
          "key": "Czech",
          "storageKey": "Czech:str",
          "label": "Czech",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-221",
          "key": "Danish",
          "storageKey": "Danish:str",
          "label": "Danish",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-222",
          "key": "Dutch",
          "storageKey": "Dutch:str",
          "label": "Dutch",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-223",
          "key": "English",
          "storageKey": "English:str",
          "label": "English",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-224",
          "key": "Finnish",
          "storageKey": "Finnish:str",
          "label": "Finnish",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-225",
          "key": "French",
          "storageKey": "French:str",
          "label": "French",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-226",
          "key": "German",
          "storageKey": "German:str",
          "label": "German",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-227",
          "key": "Greek",
          "storageKey": "Greek:str",
          "label": "Greek",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-228",
          "key": "Hindi",
          "storageKey": "Hindi:str",
          "label": "Hindi",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-229",
          "key": "Hungarian",
          "storageKey": "Hungarian:str",
          "label": "Hungarian",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-230",
          "key": "Indonesian",
          "storageKey": "Indonesian:str",
          "label": "Indonesian",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-231",
          "key": "Italian",
          "storageKey": "Italian:str",
          "label": "Italian",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-232",
          "key": "Japanese",
          "storageKey": "Japanese:str",
          "label": "Japanese",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-233",
          "key": "Korean",
          "storageKey": "Korean:str",
          "label": "Korean",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-234",
          "key": "Norwegian",
          "storageKey": "Norwegian:str",
          "label": "Norwegian",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-235",
          "key": "Polish",
          "storageKey": "Polish:str",
          "label": "Polish",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-236",
          "key": "Portuguese",
          "storageKey": "Portuguese:str",
          "label": "Portuguese",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-237",
          "key": "Romanian",
          "storageKey": "Romanian:str",
          "label": "Romanian",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-238",
          "key": "Russian",
          "storageKey": "Russian:str",
          "label": "Russian",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-239",
          "key": "Slovak",
          "storageKey": "Slovak:str",
          "label": "Slovak",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-240",
          "key": "Spanish",
          "storageKey": "Spanish:str",
          "label": "Spanish",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-241",
          "key": "Swedish",
          "storageKey": "Swedish:str",
          "label": "Swedish",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-242",
          "key": "Tamil",
          "storageKey": "Tamil:str",
          "label": "Tamil",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-243",
          "key": "Thai",
          "storageKey": "Thai:str",
          "label": "Thai",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        },
        {
          "id": "MSG-M-244",
          "key": "Turkish",
          "storageKey": "Turkish:str",
          "label": "Turkish",
          "description": "Replacement for [XX] in the ImageManager filename argument, including any subpath within that argument. The separate folder argument is unchanged.",
          "editorType": "text",
          "nativeDefault": "[XX]",
          "type": "string",
          "default": "[XX]",
          "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
        }
      ],
      "default": {
        "ConvertDefault": false,
        "Bengali": "[XX]",
        "Chinese(Simplified)": "[XX]",
        "Chinese(Traditional)": "[XX]",
        "Czech": "[XX]",
        "Danish": "[XX]",
        "Dutch": "[XX]",
        "English": "[XX]",
        "Finnish": "[XX]",
        "French": "[XX]",
        "German": "[XX]",
        "Greek": "[XX]",
        "Hindi": "[XX]",
        "Hungarian": "[XX]",
        "Indonesian": "[XX]",
        "Italian": "[XX]",
        "Japanese": "[XX]",
        "Korean": "[XX]",
        "Norwegian": "[XX]",
        "Polish": "[XX]",
        "Portuguese": "[XX]",
        "Romanian": "[XX]",
        "Russian": "[XX]",
        "Slovak": "[XX]",
        "Spanish": "[XX]",
        "Swedish": "[XX]",
        "Tamil": "[XX]",
        "Thai": "[XX]",
        "Turkish": "[XX]"
      },
      "context": "Requires localization enabled. ImageManager.loadBitmap replaces the exact uppercase marker [XX] in its filename argument (which may include subfolders), not in its separate folder argument. It substitutes the selected language string when ConvertDefault=true or the current locale differs from DefaultLocale. Example: show picture \"Title_[XX]\", set /LanguageImages/Portuguese=\"pt\", and select Portuguese; img/pictures/Title_pt.png must exist. A marker in a filename subpath such as \"[XX]/Title\" resolves img/pictures/pt/Title.png. Empty/missing mapping leaves [XX] unchanged. There is no automatic fallback to the default-language asset if a resolved file is missing; normal image-load failure applies. Install all required assets. This does not translate image pixels or generate files."
    },
    {
      "id": "MSG-M-061",
      "key": "TextSpeed",
      "storageKey": "TextSpeed:struct",
      "label": "Text Speed Option Settings",
      "description": "Text Speed Options Menu settings.",
      "editorType": "struct<TextSpeed>",
      "nativeDefault": "{\"AddOption:eval\":\"true\",\"AdjustRect:eval\":\"true\",\"Name:str\":\"Text Speed\",\"Default:num\":\"10\",\"Instant:str\":\"Instant\"}",
      "type": "struct",
      "structName": "TextSpeed",
      "fields": [
        {
          "id": "MSG-M-245",
          "key": "AddOption",
          "storageKey": "AddOption:eval",
          "label": "Add Option?",
          "description": "Add the 'Text Speed' option to the Options menu?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-246",
          "key": "AdjustRect",
          "storageKey": "AdjustRect:eval",
          "label": "Adjust Window Height",
          "description": "Automatically adjust the options window height?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-247",
          "key": "Name",
          "storageKey": "Name:str",
          "label": "Option Name",
          "description": "Command name of the option.",
          "editorType": "text",
          "nativeDefault": "Text Speed",
          "type": "string",
          "default": "Text Speed"
        },
        {
          "id": "MSG-M-248",
          "key": "Default",
          "storageKey": "Default:num",
          "label": "Default Value",
          "description": "Initial text speed: 1..10 slowest to fastest, 11 Instant.",
          "editorType": "number",
          "nativeDefault": "10",
          "type": "number",
          "min": 1,
          "max": 11,
          "default": 10,
          "context": "Player text speed uses 1..10 from slowest to fastest; 11 is Instant. The runtime delay multiplier is 11-ConfigManager.textSpeed, so 11 gives zero added per-character delay; explicit event/message wait commands are separate. The configured Default initializes the setting; loading a finite stored number/string clamps it to 1..11, and invalid/missing values fall back to Default. Options presents 11 with the Instant label."
        },
        {
          "id": "MSG-M-249",
          "key": "Instant",
          "storageKey": "Instant:str",
          "label": "Instant Speed",
          "description": "Text to show \"instant\" text.",
          "editorType": "text",
          "nativeDefault": "Instant",
          "type": "string",
          "default": "Instant",
          "context": "Player text speed uses 1..10 from slowest to fastest; 11 is Instant. The runtime delay multiplier is 11-ConfigManager.textSpeed, so 11 gives zero added per-character delay; explicit event/message wait commands are separate. The configured Default initializes the setting; loading a finite stored number/string clamps it to 1..11, and invalid/missing values fall back to Default. Options presents 11 with the Instant label."
        }
      ],
      "default": {
        "AddOption": true,
        "AdjustRect": true,
        "Name": "Text Speed",
        "Default": 10,
        "Instant": "Instant"
      },
      "context": "Player text speed uses 1..10 from slowest to fastest; 11 is Instant. The runtime delay multiplier is 11-ConfigManager.textSpeed, so 11 gives zero added per-character delay; explicit event/message wait commands are separate. The configured Default initializes the setting; loading a finite stored number/string clamps it to 1..11, and invalid/missing values fall back to Default. Options presents 11 with the Instant label."
    },
    {
      "id": "MSG-M-062",
      "key": "WordWrap",
      "storageKey": "WordWrap:struct",
      "label": "Word Wrap Settings",
      "description": "Settings involving Word Wrap.",
      "editorType": "struct<WordWrap>",
      "nativeDefault": "{\"EnableWordWrap\":\"\",\"MessageWindow:eval\":\"false\",\"HelpWindow:eval\":\"false\",\"Rules\":\"\",\"LineBreakSpace:eval\":\"true\",\"TightWrap:eval\":\"false\",\"EndPadding:num\":\"0\"}",
      "type": "struct",
      "structName": "WordWrap",
      "fields": [
        {
          "id": "MSG-M-251",
          "key": "MessageWindow",
          "storageKey": "MessageWindow:eval",
          "label": "Message Window",
          "description": "Automatically enable Word Wrap for this window?",
          "editorType": "boolean",
          "nativeDefault": "false",
          "type": "boolean",
          "default": false
        },
        {
          "id": "MSG-M-252",
          "key": "HelpWindow",
          "storageKey": "HelpWindow:eval",
          "label": "Help Window",
          "description": "Automatically enable Word Wrap for this window?",
          "editorType": "boolean",
          "nativeDefault": "false",
          "type": "boolean",
          "default": false
        },
        {
          "id": "MSG-M-254",
          "key": "LineBreakSpace",
          "storageKey": "LineBreakSpace:eval",
          "label": "Link Break -> Space",
          "description": "Convert manually placed (non tagged) line breaks with spaces?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "boolean",
          "default": true
        },
        {
          "id": "MSG-M-255",
          "key": "TightWrap",
          "storageKey": "TightWrap:eval",
          "label": "Tight Wrap",
          "description": "If a face graphic is present in a message, word wrap will be tighter.",
          "editorType": "boolean",
          "nativeDefault": "false",
          "type": "boolean",
          "default": false
        },
        {
          "id": "MSG-M-256",
          "key": "EndPadding",
          "storageKey": "EndPadding:num",
          "label": "End Padding",
          "description": "Extra horizontal space reserved at the end of wrapped text, in pixels.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "number",
          "default": 0,
          "context": "Enable Coreto_0_CoreEngine then Coreto_1_MessageCore. Configure /WordWrap/EndPadding as a JSON number through message parameters set, selecting the intended MZ game with --project. Reload the editor/restart after parameter edits. The wrapping boundary subtracts this value from available text width before face adjustments. Use a finite nonnegative value smaller than the usable width; runtime adds no clamp, so a negative value expands allowance and an oversized value forces early breaks/overflow rather than resizing the window. It applies only to active wrapping; choices/alignment/auto-size disable wrapping. It does not add physical window padding.",
          "examples": [
            {
              "input": "message parameters set --path /WordWrap/EndPadding --value 12 --dry-run --json",
              "expected": "Previews the illustrative value 12; remove --dry-run to apply the validated configuration."
            }
          ]
        }
      ],
      "default": {
        "MessageWindow": false,
        "HelpWindow": false,
        "LineBreakSpace": true,
        "TightWrap": false,
        "EndPadding": 0
      }
    }
  ],
  "commands": [
    {
      "id": "MSG-M-002",
      "key": "MessageWindowProperties",
      "label": "Message: Properties",
      "description": "Change the various properties of the Message Window.",
      "args": [
        {
          "id": "MSG-M-003",
          "key": "Rows",
          "storageKey": "Rows:num",
          "label": "Rows",
          "description": "Change the number of Message Window rows.",
          "editorType": "number",
          "nativeDefault": "4",
          "type": "number",
          "min": 0,
          "default": 4
        },
        {
          "id": "MSG-M-004",
          "key": "Width",
          "storageKey": "Width:num",
          "label": "Width",
          "description": "Change the Message Window width in pixels.",
          "editorType": "number",
          "nativeDefault": "816",
          "type": "number",
          "min": 0,
          "default": 816
        },
        {
          "id": "MSG-M-005",
          "key": "WordWrap",
          "storageKey": "WordWrap:str",
          "label": "Word Wrap",
          "description": "Enable or disable Word Wrap for the Message Window?",
          "editorType": "select",
          "nativeDefault": "No Change",
          "type": "string",
          "options": [
            "No Change",
            "true",
            "false"
          ],
          "default": "No Change"
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ]
    },
    {
      "id": "MSG-M-006",
      "key": "MessageWindowXyOffsets",
      "label": "Message: X/Y Offsets",
      "description": "Change the X and Y Offsets of the Message Window.",
      "args": [
        {
          "id": "MSG-M-007",
          "key": "OffsetX",
          "storageKey": "OffsetX:eval",
          "label": "Offset X",
          "description": "Offset Message Window horizontally.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "string",
          "javascript": "expression",
          "default": "+0"
        },
        {
          "id": "MSG-M-008",
          "key": "OffsetY",
          "storageKey": "OffsetY:eval",
          "label": "Offset Y",
          "description": "Offset Message Window vertically.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "string",
          "javascript": "expression",
          "default": "+0"
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Offsets in pixels affect the next message placement. The final rectangle is clamped to the render viewport: left=-floor(Graphics.width-Graphics.boxWidth)/2 and top=-floor(Graphics.height-Graphics.boxHeight)/2; x remains between left and left+Graphics.width-windowWidth, and y between top and top+Graphics.height-windowHeight. Size is capped at Graphics.width/height."
    },
    {
      "id": "MSG-M-010",
      "key": "ChoiceWindowDistance",
      "label": "Choices: Distance",
      "description": "Change the distance from choice window to the message window.",
      "args": [
        {
          "id": "MSG-M-011",
          "key": "Distance",
          "storageKey": "Distance:eval",
          "label": "Distance",
          "description": "Change distance between the choice and message windows.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "string",
          "javascript": "expression",
          "default": "+0"
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ]
    },
    {
      "id": "MSG-M-012",
      "key": "ChoiceWindowProperties",
      "label": "Choices: Properties",
      "description": "Change the properties found in the Show Choices event command.",
      "args": [
        {
          "id": "MSG-M-013",
          "key": "LineHeight",
          "storageKey": "LineHeight:num",
          "label": "Choice Line Height",
          "description": "Change the line height for the show choices.",
          "editorType": "number",
          "nativeDefault": "36",
          "type": "number",
          "min": 0,
          "default": 36
        },
        {
          "id": "MSG-M-014",
          "key": "MinWidth",
          "storageKey": "MinWidth:num",
          "label": "Minimum Choice Width",
          "description": "What is the minimum width size for each choice?",
          "editorType": "number",
          "nativeDefault": "96",
          "type": "number",
          "min": 0,
          "default": 96
        },
        {
          "id": "MSG-M-015",
          "key": "MaxRows",
          "storageKey": "MaxRows:num",
          "label": "Max Rows",
          "description": "Maximum number of choice rows to be displayed.",
          "editorType": "number",
          "nativeDefault": "8",
          "type": "number",
          "min": 0,
          "default": 8
        },
        {
          "id": "MSG-M-016",
          "key": "MaxCols",
          "storageKey": "MaxCols:num",
          "label": "Max Columns",
          "description": "Maximum number of choice columns to be displayed.",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 0,
          "default": 1
        },
        {
          "id": "MSG-M-017",
          "key": "TextAlign",
          "storageKey": "TextAlign:str",
          "label": "Text Alignment",
          "description": "Text alignment for Show Choice window.",
          "editorType": "select",
          "nativeDefault": "default",
          "type": "string",
          "options": [
            "default",
            "left",
            "center",
            "right"
          ],
          "default": "default"
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ]
    },
    {
      "id": "MSG-M-019",
      "key": "SelectWeapon",
      "label": "Select: Weapon",
      "description": "Opens the Event Select Item Window to let the player",
      "args": [
        {
          "id": "MSG-M-020",
          "key": "VariableID",
          "storageKey": "VariableID:num",
          "label": "Variable ID",
          "description": "Game variable ID receiving the selected database ID, or 0 when canceled.",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 0,
          "default": 1,
          "context": "Use an existing variable ID greater than 0. VariableID 0 does not activate the item/weapon/armor/skill selection window because the engine requires a positive choice variable; it also does not store a result.",
          "expected": "Com VariableID válido maior que 0, grava o ID selecionado ou 0 no cancelamento. VariableID 0 não ativa a janela de seleção nem grava resultado."
        },
        {
          "id": "MSG-M-021",
          "key": "WeaponTypeID",
          "storageKey": "WeaponTypeID:num",
          "label": "Weapon Type ID",
          "description": "Reduce all the weapons to a specific weapon type.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "number",
          "min": 0,
          "max": 100,
          "default": 0
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Select from weapons held in the party inventory, filtered by WeaponTypeID (0 includes every weapon type). Equipped items are not added to that inventory list. The chosen database weapon ID is stored in VariableID; cancel stores 0. Place directly after Show Text to combine the prompt and selector, or run as a standalone command. Requires Coreto_0_CoreEngine before Coreto_1_MessageCore."
    },
    {
      "id": "MSG-M-022",
      "key": "SelectArmor",
      "label": "Select: Armor",
      "description": "Opens the Event Select Item Window to let the player",
      "args": [
        {
          "id": "MSG-M-023",
          "key": "VariableID",
          "storageKey": "VariableID:num",
          "label": "Variable ID",
          "description": "Game variable ID receiving the selected database ID, or 0 when canceled.",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 0,
          "default": 1,
          "context": "Use an existing variable ID greater than 0. VariableID 0 does not activate the item/weapon/armor/skill selection window because the engine requires a positive choice variable; it also does not store a result.",
          "expected": "Com VariableID válido maior que 0, grava o ID selecionado ou 0 no cancelamento. VariableID 0 não ativa a janela de seleção nem grava resultado."
        },
        {
          "id": "MSG-M-024",
          "key": "ArmorTypeID",
          "storageKey": "ArmorTypeID:num",
          "label": "Armor Type ID",
          "description": "Reduce all the armors to a specific armor type.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "number",
          "min": 0,
          "max": 100,
          "default": 0
        },
        {
          "id": "MSG-M-025",
          "key": "EquipTypeID",
          "storageKey": "EquipTypeID:num",
          "label": "Equip Type ID",
          "description": "Reduce all the armors to a specific equip type.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "number",
          "min": 0,
          "max": 100,
          "default": 0
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Select from armors held in the party inventory, filtered by ArmorTypeID and EquipTypeID (0 disables that filter). Equipped items are not added to that inventory list. The chosen database armor ID is stored in VariableID; cancel stores 0. Place directly after Show Text to combine prompt and selector, or run standalone. Requires Coreto_0_CoreEngine before Coreto_1_MessageCore."
    },
    {
      "id": "MSG-M-026",
      "key": "SelectSkill",
      "label": "Select: Skill",
      "description": "Opens the Event Select Item Window to let the player",
      "args": [
        {
          "id": "MSG-M-027",
          "key": "VariableID",
          "storageKey": "VariableID:num",
          "label": "Variable ID",
          "description": "Game variable ID receiving the selected database ID, or 0 when canceled.",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 0,
          "default": 1,
          "context": "Use an existing variable ID greater than 0. VariableID 0 does not activate the item/weapon/armor/skill selection window because the engine requires a positive choice variable; it also does not store a result.",
          "expected": "Com VariableID válido maior que 0, grava o ID selecionado ou 0 no cancelamento. VariableID 0 não ativa a janela de seleção nem grava resultado."
        },
        {
          "id": "MSG-M-028",
          "key": "ActorID",
          "storageKey": "ActorID:num",
          "label": "Actor ID",
          "description": "Select an actor to get the skill list from.",
          "editorType": "actor",
          "nativeDefault": "0",
          "type": "number",
          "default": 0
        },
        {
          "id": "MSG-M-029",
          "key": "SkillTypeID",
          "storageKey": "SkillTypeID:num",
          "label": "Skill Type ID",
          "description": "Reduce all the skills to a specific skill type.",
          "editorType": "number",
          "nativeDefault": "0",
          "type": "number",
          "min": 0,
          "max": 100,
          "default": 0
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Requires Coreto_0_CoreEngine before Coreto_1_MessageCore and VisuMZ_1_SkillsStatesCore version 1.48 active before this command is used. The list uses the selected actor's learned skills; ActorID 0 or an unresolved actor falls back to the party leader. No actor gives an empty list. Skills must pass the integration's isSkillHidden and isSkillTypeMatchForUse checks; SkillTypeID 0 accepts every type, otherwise getSkillTypes must include it. The selected database skill ID is stored in VariableID; cancel stores 0. Can follow Show Text or run standalone."
    },
    {
      "id": "MSG-M-031",
      "key": "PictureTextChange",
      "label": "Picture: Change Text",
      "description": "Change text for target picture(s) to show.",
      "args": [
        {
          "id": "MSG-M-032",
          "key": "PictureIDs",
          "storageKey": "PictureIDs:arraynum",
          "label": "Picture ID(s)",
          "description": "Array of numeric picture IDs; for example [1,2,3].",
          "editorType": "number[]",
          "nativeDefault": "[\"1\"]",
          "type": "array",
          "items": {
            "type": "number"
          },
          "min": 1,
          "default": [
            1
          ],
          "context": "Supply individual numeric IDs, not range strings such as 1-3. Map and battle picture slots are separate. Use positive IDs within the game picture limit; IDs outside it have no visible picture sprite.",
          "expected": "Apenas os IDs numéricos do array recebem a alteração no espaço de pictures de mapa ou batalha; strings de faixa não são aceitas."
        },
        {
          "id": "MSG-M-033",
          "key": "Padding",
          "storageKey": "Padding:eval",
          "label": "Padding",
          "description": "How much padding from the sides should there be?",
          "editorType": "text",
          "nativeDefault": "$gameSystem.windowPadding()",
          "type": "string",
          "javascript": "expression",
          "default": "$gameSystem.windowPadding()"
        },
        {
          "id": "MSG-M-035",
          "key": "upperleft",
          "storageKey": "upperleft:json",
          "label": "Upper Left",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-036",
          "key": "up",
          "storageKey": "up:json",
          "label": "Upper Center",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-037",
          "key": "upperright",
          "storageKey": "upperright:json",
          "label": "Upper Right",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-038",
          "key": "left",
          "storageKey": "left:json",
          "label": "Middle Left",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-039",
          "key": "center",
          "storageKey": "center:json",
          "label": "Middle Center",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-040",
          "key": "right",
          "storageKey": "right:json",
          "label": "Middle Right",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-041",
          "key": "lowerleft",
          "storageKey": "lowerleft:json",
          "label": "Lower Left",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-042",
          "key": "down",
          "storageKey": "down:json",
          "label": "Lower Center",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        },
        {
          "id": "MSG-M-043",
          "key": "lowerright",
          "storageKey": "lowerright:json",
          "label": "Lower Right",
          "description": "The text that's aligned to this picture's side.",
          "editorType": "note",
          "nativeDefault": "\"\"",
          "type": "string",
          "encoding": "json",
          "default": ""
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Assign text to picture slots before or after Show Picture; assignment stores data and requests redraw but does not show an image. Text becomes visible while the picture sprite is visible. Every supplied zone replaces that slot's zone text; an empty string clears it. Erase Picture also clears text and padding. Variable-driven text is redrawn on picture-text change, map refresh or PictureTextRefresh; it is not reevaluated on every frame."
    },
    {
      "id": "MSG-M-044",
      "key": "PictureTextErase",
      "label": "Picture: Erase Text",
      "description": "Erase all text for target picture(s).",
      "args": [
        {
          "id": "MSG-M-045",
          "key": "PictureIDs",
          "storageKey": "PictureIDs:arraynum",
          "label": "Picture ID(s)",
          "description": "Array of numeric picture IDs; for example [1,2,3].",
          "editorType": "number[]",
          "nativeDefault": "[\"1\"]",
          "type": "array",
          "items": {
            "type": "number"
          },
          "min": 1,
          "default": [
            1
          ],
          "context": "Supply individual numeric IDs, not range strings such as 1-3. Map and battle picture slots are separate. Use positive IDs within the game picture limit; IDs outside it have no visible picture sprite.",
          "expected": "Apenas os IDs numéricos do array recebem a alteração no espaço de pictures de mapa ou batalha; strings de faixa não são aceitas."
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ]
    },
    {
      "id": "MSG-M-046",
      "key": "PictureTextRefresh",
      "label": "Picture: Refresh Text",
      "description": "Refreshes the text used for all on-screen pictures.",
      "args": [],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Queues redraw for all currently existing pictures. Example: show picture 1, assign center text Gold: \\V[1] with PictureTextChange, then change variable 1 and run PictureTextRefresh to update the rendered number. It does not create pictures or alter stored text; refresh is processed when each picture sprite is visible."
    }
  ],
  "dependencies": {
    "core": "Coreto_0_CoreEngine",
    "consumers": {
      "VisuMZ_2_AniMsgTextEffects": "1.05",
      "VisuMZ_2_ExtMessageFunc": "1.22",
      "VisuMZ_3_ChoiceCmnEvts": "1.02",
      "VisuMZ_3_MessageLog": "1.08",
      "VisuMZ_3_MsgLetterSounds": "1.03",
      "VisuMZ_3_StateTooltips": "1.10"
    },
    "integrations": {
      "VisuMZ_1_BattleCore": "1.85",
      "VisuMZ_1_SkillsStatesCore": "1.48",
      "VisuMZ_1_SaveCore": "1.13",
      "VisuMZ_1_OptionsCore": "1.27"
    }
  }
};
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


function resolveMessageSettings(fields, raw, receiver) {
    const decoded = decodeParameters(fields, raw);
    function runtimeValue(field, value, path) {
        if (field.type === 'struct') return Object.fromEntries(field.fields.map(child =>
            [child.key, runtimeValue(child, value[child.key], `${path}/${child.key}`)]));
        if (field.type === 'array') return value.map((item, index) => runtimeValue(field.items, item, `${path}/${index}`));
        if (!field.javascript) return value;
        try {
            const fn = new Function(field.javascript === 'body' ? value : `return (${value});`);
            return field.javascript === 'body' ? fn : fn.call(receiver);
        } catch (cause) {
            throw new CoreError('MESSAGE_AUTHORED_CODE', `Invalid authored JavaScript at ${path}.`, {field: path, cause: cause.message});
        }
    }
    return Object.fromEntries(fields.map(field => [field.key, runtimeValue(field, decoded[field.key], `/${field.key}`)]));
}


function isLanguageBasename(value, format) {
    return typeof value === 'string' && !!value && value === value.trim() &&
        !/[\\/:?#%\x00-\x1f\x7f]/.test(value) && !value.startsWith('.') && value.endsWith(`.${format}`);
}

const normalized = value => value.trim().toLowerCase();
function invalid(message, row, column) {
    throw new CoreError('INVALID_LANGUAGE_TABLE', message, {row, column});
}
function languageDelimiter(format) {
    if (format === 'csv') return ';';
    if (format === 'tsv') return '\t';
    throw new CoreError('INVALID_LANGUAGE_FORMAT', 'Use csv or tsv.', {received: format});
}
function validateLanguageRows(rows) {
    const header = rows[0];
    if (!header || header.length < 2 || normalized(header[0]) !== 'key') invalid('First column must be Key, followed by language columns.', 1, 1);
    const columns = new Set();
    for (const [index, value] of header.entries()) {
        const key = normalized(value);
        if (!key || columns.has(key)) invalid('Empty or duplicate normalized column.', 1, index + 1);
        columns.add(key);
    }
    const keys = new Set();
    for (const [index, row] of rows.entries()) {
        if (row.length !== header.length) invalid(`Expected ${header.length} cells.`, index + 1, row.length + 1);
        if (row.some(value => /[\r\n]/.test(value))) invalid('Use <br> instead of physical newlines inside a cell.', index + 1, 1);
        if (!index) continue;
        const key = normalized(row[0]);
        if (!key || keys.has(key)) invalid('Empty or duplicate normalized key.', index + 1, 1);
        keys.add(key);
    }
    return rows;
}
function parseLanguageTable(text, format) {
    const delimiter = languageDelimiter(format);
    text = text.replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], cell = '', state = 'start';
    function endCell() {row.push(cell); cell = ''; state = 'start';}
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        if (char === '\r' || char === '\n') {
            if (state === 'quoted') invalid('Use <br> instead of physical newlines inside a quoted cell.', rows.length + 1, row.length + 1);
            if (char === '\r' && text[index + 1] !== '\n') invalid('Use LF or CRLF line endings.', rows.length + 1, row.length + 1);
            if (char === '\r') index++;
            endCell(); rows.push(row); row = [];
        } else if (state === 'quoted') {
            if (char === '"') {
                if (text[index + 1] === '"') {cell += '"'; index++;}
                else state = 'closed';
            } else cell += char;
        } else if (char === delimiter) endCell();
        else if (char === '"' && state === 'start') state = 'quoted';
        else if (char === '"' || state === 'closed') invalid('Unexpected character outside a quoted cell.', rows.length + 1, row.length + 1);
        else {cell += char; state = 'plain';}
    }
    if (state === 'quoted') invalid('Unclosed quoted cell.', rows.length + 1, row.length + 1);
    if (row.length || cell || state !== 'start') {endCell(); rows.push(row);}
    return validateLanguageRows(rows);
}
function serializeLanguageTable(rows, format) {
    const delimiter = languageDelimiter(format);
    validateLanguageRows(rows);
    return rows.map(row => row.map(cell => cell.includes(delimiter) || cell.includes('"') ? `"${cell.replaceAll('"', '""')}"` : cell).join(delimiter)).join('\n') + '\n';
}

// Original 1.54 template data; no runtime implementation is copied.
const languageTemplate = [
    [
        "Key",
        "English",
        "Bengali",
        "Chinese(Simplified)",
        "Chinese(Traditional)",
        "Czech",
        "Danish",
        "Dutch",
        "Finnish",
        "French",
        "German",
        "Greek",
        "Hindi",
        "Hungarian",
        "Indonesian",
        "Italian",
        "Japanese",
        "Korean",
        "Norwegian",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Slovak",
        "Spanish",
        "Swedish",
        "Tamil",
        "Thai",
        "Turkish"
    ],
    [
        "Greeting",
        "Hello",
        "হ্যালো",
        "你好",
        "你好",
        "Ahoj",
        "Hej",
        "Hallo",
        "Hei",
        "Bonjour",
        "Hallo",
        "Γειά σου",
        "नमस्ते",
        "Szia",
        "Halo",
        "Ciao",
        "こんにちは",
        "안녕하세요",
        "Hei",
        "Cześć",
        "Olá",
        "Salut",
        "Привет",
        "Ahoj",
        "Hola",
        "Hej",
        "வணக்கம்",
        "สวัสดี",
        "Merhaba"
    ],
    [
        "Farewell",
        "Good-bye",
        "বিদায়",
        "再见",
        "再見",
        "Sbohem",
        "Farvel",
        "Tot ziens",
        "Näkemiin",
        "Au revoir",
        "Auf Wiedersehen",
        "Αντίο",
        "अलविदा",
        "Viszontlátásra",
        "Selamat tinggal",
        "Arrivederci",
        "さようなら",
        "안녕히 가세요",
        "Ha det",
        "Do widzenia",
        "Adeus",
        "La revedere",
        "До свидания",
        "Zbohom",
        "Adiós",
        "Hejdå",
        "பிரியாவிடை",
        "ลาก่อน",
        "Hoşça kal"
    ],
    [
        "Wow",
        "Wow",
        "ওহে",
        "哇",
        "哇",
        "Ó",
        "Wow",
        "Wauw",
        "Vau",
        "Waouh",
        "Wow",
        "Ουάου",
        "वाह",
        "Hűha",
        "Wah",
        "Wow",
        "ワオ",
        "와우",
        "Oi",
        "O",
        "Uau",
        "Uau",
        "Вау",
        "Ó",
        "Guau",
        "Oj",
        "ஆஹா",
        "ว้าว",
        "Vay"
    ]
];

function messageInstallationError(code, message) {
    throw new CoreError(code, message);
}

function installMessage() {
    if (Utils.RPGMAKER_NAME !== 'MZ' || Utils.RPGMAKER_VERSION !== '1.10.0') {
        messageInstallationError('MESSAGE_ENGINE_VERSION', 'Use RPG Maker MZ 1.10.0.');
    }
    const active = $plugins.filter(plugin => plugin.status);
    const providers = active.filter(plugin => ['Coreto_1_MessageCore', 'VisuMZ_1_MessageCore'].includes(plugin.name));
    if (providers.length !== 1 || providers[0].name !== catalog.pluginId || globalThis.Coreto?.MessageCore) {
        messageInstallationError('MESSAGE_DUPLICATE_PROVIDER', 'Enable exactly one Message provider, using Coreto_1_MessageCore.');
    }
    const own = providers[0];
    if (!globalThis.Coreto?.CoreEngine || active.findIndex(plugin => plugin.name === 'Coreto_0_CoreEngine') >= active.indexOf(own)) {
        messageInstallationError('MESSAGE_CORE_REQUIRED', 'Place Coreto_0_CoreEngine before Coreto_1_MessageCore.');
    }
    if (!own.description.includes('[MessageCore]') || !own.description.includes(`[Version ${catalog.version}]`)) {
        messageInstallationError('MESSAGE_DESCRIPTION', 'Refresh the Message plugin description and version in the editor.');
    }
    const filename = decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if (filename !== `${catalog.pluginId}.js`) messageInstallationError('MESSAGE_FILENAME', `Keep the filename ${catalog.pluginId}.js.`);
    for (const [name, version] of Object.entries({...catalog.dependencies.consumers, ...catalog.dependencies.integrations})) {
        const entries = active.filter(plugin => plugin.name === name);
        if (entries.length > 1) messageInstallationError('MESSAGE_DEPENDENCY_DUPLICATE', `Duplicate plugin: ${name}.`);
        if (!entries.length) continue;
        if (!entries[0].description.includes(`[Version ${version}]`)) messageInstallationError('MESSAGE_DEPENDENCY_VERSION', `Use ${name} ${version}.`);
        if (name in catalog.dependencies.consumers && active.indexOf(entries[0]) < active.indexOf(own)) {
            messageInstallationError('MESSAGE_CONSUMER_ORDER', `Place ${name} after Message.`);
        }
    }
    if (active.some(plugin => plugin.name === 'VisuMZ_3_StateTooltips')) {
        for (const name of ['VisuMZ_1_BattleCore', 'VisuMZ_1_SkillsStatesCore']) {
            const index = active.findIndex(plugin => plugin.name === name);
            const consumer = active.findIndex(plugin => plugin.name === 'VisuMZ_3_StateTooltips');
            if (index < 0 || index > consumer) messageInstallationError('MESSAGE_TOOLTIP_DEPENDENCY', `Place ${name} before StateTooltips.`);
        }
    }
    const raw = resolvePluginConfiguration(catalog, $plugins).rawParameters;
    const settings = resolveMessageSettings(catalog.parameters, raw, null);
    const registered = new Set();
    const api = {
        pluginId: catalog.pluginId,
        version: catalog.version,
        settings,
        rawParameters: JSON.parse(JSON.stringify(raw)),
        registerCommand(name, handler) {
            const schema = catalog.commands.find(command => command.key === name);
            if (!schema || registered.has(name)) messageInstallationError('MESSAGE_COMMAND_REGISTRATION', `Unknown or duplicate Message command: ${name}.`);
            registered.add(name);
            for (const id of [catalog.pluginId, catalog.reference.pluginId]) {
                PluginManager.registerCommand(id, name, function(rawArgs) {
                    const args = resolveMessageSettings(schema.args, rawArgs, this);
                    return handler.call(this, args);
                });
            }
        }
    };
    globalThis.Coreto.MessageCore = api;
    globalThis.Imported ??= {};
    globalThis.Imported.Coreto_1_MessageCore = true;
    globalThis.Imported.VisuMZ_1_MessageCore = true;
    globalThis.VisuMZ ??= {};
    globalThis.VisuMZ.MessageCore = {version: 1.54, Settings: settings};
    return api;
}

const messageApi = installMessage();
SceneManager.isSceneMap = function() { return this._scene instanceof Scene_Map; };

function runMessageTextScript(rule, field, receiver, args, phase) {
    try {
        return rule[field].apply(receiver, args);
    } catch (cause) {
        throw new CoreError('MESSAGE_TEXT_SCRIPT', `Text code ${rule.Match}: ${field} failed during ${phase}.`,
            {entry: rule.Match, field, phase, window: receiver.constructor.name, cause: String(cause?.message ?? cause)});
    }
}

function installMessageText(settings) {
    const base = Window_Base.prototype;
    const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const normalizeSlashes = text => String(text ?? '').replace(/\\/g, '\x1b').replace(/\x1b\x1b/g, '\\');
    function compile(rule, macro) {
        try {
            const pattern = macro ? `\\[${rule.Match}\\]` : `\x1b${rule.Match}${rule.Type}`;
            return {...rule, pattern: new RegExp(pattern, 'gi')};
        } catch (cause) {throw new CoreError('MESSAGE_TEXT_PATTERN', `Invalid text pattern: ${rule.Match}.`, {cause: cause.message});}
    }
    const macros = settings.TextMacros.map(rule => compile(rule, true));
    const replacements = settings.TextCodeReplace.slice().sort((a, b) => b.Match.length - a.Match.length).map(rule => compile(rule, false));
    for (const [index, rule] of macros.entries()) {
        settings.TextMacros[index].textCodeCheck = rule.pattern;
        settings.TextMacros[index].textCodeResult = function(...args) {
            return rule.TextStr && rule.TextStr !== 'Undefined' ? rule.TextStr :
                runMessageTextScript(rule,'TextJS',this,args,'conversion');
        };
    }
    function replaceRules(text, rules, receiver, resolveVariables = false) {
        for (const rule of rules) {
            text = text.replace(rule.pattern, (...args) => {
                const result = rule.TextStr && rule.TextStr !== 'Undefined' ? rule.TextStr :
                    runMessageTextScript(rule, 'TextJS', receiver, args, receiver._messageMeasuring ? 'measurement' : 'conversion');
                return normalizeSlashes(result);
            });
            if (resolveVariables) text = receiver.convertVariableEscapeCharacters(text);
        }
        return text;
    }
    base.convertTextMacros = function(text) {
        text = String(text ?? '');
        this._textMacroFound = false;
        for (const rule of settings.TextMacros) {
            rule.textCodeCheck.lastIndex = 0;
            if (!rule.textCodeCheck.test(text)) continue;
            this._textMacroFound = true;
            rule.textCodeCheck.lastIndex = 0;
            text = text.replace(rule.textCodeCheck,rule.textCodeResult.bind(this));
        }
        return text;
    };
    base.convertBackslashCharacters = normalizeSlashes;
    base.convertVariableEscapeCharacters = function(text) {
        const seen = new Set();
        const variable = /(?:\\|\x1b)V\[(\d+)\]/gi;
        while (variable.test(text)) {
            variable.lastIndex = 0;
            if (seen.has(text) || seen.size >= 100) throw new CoreError('MESSAGE_TEXT_RECURSION', 'Recursive variable text.', {text});
            seen.add(text);
            text = text.replace(variable, (_, id) => normalizeSlashes($gameVariables.value(Number(id))));
        }
        return text;
    };
    base.convertButtonAssistEscapeCharacters = function(text) {
        return text.replace(/<(up|down|left|right|ok|cancel|menu|shift|page ?up|page ?down|pagedn) (?:key|button)>/gi,
            (_, button) => this.convertButtonAssistText(button.toLowerCase().replace(' ', '').replace('pagedn', 'pagedown')));
    };
    base.convertButtonAssistText = function(button) {
        return this.convertVariableEscapeCharacters(normalizeSlashes(TextManager.getInputButtonString(button) || '')).trim();
    };
    base.preConvertEscapeCharacters = function(text) {return text;};
    base.postConvertEscapeCharacters = function(text) {return text;};
    base.convertBaseEscapeCharacters = function(text) {
        return text.replace(/\x1bN\[(\d+)\]/gi, (_, id) => this.actorName(Number(id)))
            .replace(/\x1bP\[(\d+)\]/gi, (_, id) => this.partyMemberName(Number(id)))
            .replace(/\x1bG/gi, () => TextManager.currencyUnit);
    };
    base.convertMessageCoreEscapeReplacements = function(text) {
        return replaceRules(text, replacements, this, true);
    };
    base.convertFontSettingsEscapeCharacters = function(text) {
        for (const [tag, code] of [['B', 'BOLD'], ['I', 'ITALIC']]) {
            text = text.replace(new RegExp(`<${tag}>`, 'gi'), `\x1b${code}[1]`).replace(new RegExp(`</${tag}>`, 'gi'), `\x1b${code}[0]`);
        }
        return text;
    };
    base.convertCasingEscapeCharacters = function(text) {
        for (const [index, aliases] of ['LC|LOWERCASE|LOWER CASE|LOWER','UC|UPPERCASE|UPPER CASE|UPPER','CAPS|CAPSLOCK|CAPS LOCK|CAP','ALT|ALTERNATE|ALT CASE','CHAOS|CHAOSCASE|CHAOS CASE'].entries()) {
            text = text.replace(new RegExp(`<(${aliases})>`, 'gi'), `\x1bCASING[${index+1}]`).replace(new RegExp(`</(${aliases})>`, 'gi'), '\x1bCASING[0]');
        }
        return text;
    };
    base.convertLockColorsEscapeCharacters = function(text) {
        return text.replace(/<colorlock>|\(\(\(/gi, '\x1bCOLORLOCK[1]').replace(/<\/colorlock>|\)\)\)/gi, '\x1bCOLORLOCK[0]');
    };
    base.isAutoColorAffected = function() {return false;};
    for (const Window of [Window_Message, Window_Help, Window_ChoiceList]) Window.prototype.isAutoColorAffected = function() {return true;};
    if (typeof Window_TextPopup !== 'undefined') Window_TextPopup.prototype.isAutoColorAffected = function() {return true;};
    const colorGroups = Array.from({length: 32}, (_, color) => [...(settings.AutoColor[`TextColor${color}`] ?? [])]);
    const words = [];
    let colorsDirty = true;
    const auto = VisuMZ.MessageCore;
    auto.AutoColorRegExp = words;
    const reservedNames = new Set(['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\\','$','.','|','!','^',
        '<B>','</B>','<I>','</I>','<LEFT>','</LEFT>','<CENTER>','</CENTER>','<RIGHT>','</RIGHT>',
        '<COLORLOCK>','</COLORLOCK>','(((',')))','<WORDWRAP>','</WORDWRAP>','<BR>','<LINE BREAK>',
        'PICTURE','CENTERPICTURE','COMMONEVENT','WAIT','SHOW','HIDE','ENABLE','DISABLE','SWITCH','SWITCHES','ALL','ANY']);
    const colorize = (name, color) => `\x1bC[${color}]${name}\x1bPREVCOLOR[0]`;
    function colorRule(name, color, allowCjk) {
        const cjk = allowCjk && /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u2605-\u2606\u2190-\u2195\u203b]/.test(name);
        return [cjk ? new RegExp(escape(name), 'i') : new RegExp(`\\b${escape(name)}\\b`, 'g'), colorize(name, color)];
    }
    for (const [category, group] of [['Class','Classes'],['Skill','Skills'],['Item','Items'],['Weapon','Weapons'],['Armor','Armors'],['Enemy','Enemies'],['State','States']]) {
        const key = `Parse${category}Notetags`, previous = VisuMZ[key];
        VisuMZ[key] = function(record) {
            const result = previous.call(this, record);
            const color = Number(settings.AutoColor[group]);
            let name = record.name.trim();
            if (color > 0 && colorGroups[color] && !/^\d+$/.test(name) && !reservedNames.has(name.toUpperCase())) {
                name = name.replace(/(?:\\|\x1b)I\[\d+\]/gi, '');
                if (name && !name.includes('-----')) {
                    colorGroups[color].push(name);
                    colorsDirty = true;
                }
            }
            return result;
        };
    }
    base.processAutoColorWords = function(text) {
        if (!this.isAutoColorAffected()) return text;
        if (colorsDirty) {
            words.length = 0;
            for (let color = 1; color < colorGroups.length; color++) {
                for (const name of colorGroups[color].slice().sort((a,b) => b.length-a.length)) {
                    if (name && !/^\d+$/.test(name)) words.push(colorRule(name, color, true));
                }
            }
            colorsDirty = false;
        }
        for (const [pattern, replacement] of words) text = text.replace(pattern, replacement);
        const actorColor = Number(settings.AutoColor.Actors);
        if (actorColor > 0 && $gameActors) {
            for (const actor of $gameActors._data) {
                if (!actor) continue;
                const name = actor.name();
                if (!name.trim() || /^\d+$/.test(name) || name.includes('-----')) continue;
                const [pattern, replacement] = colorRule(name, actorColor, false);
                text = text.replace(pattern, replacement);
            }
        }
        return text;
    };
    base.databaseObjectName = function(database, id, icon) {
        if (!database) return '';
        const record = database[id];
        const text = record ? `${icon && record.iconIndex ? `\x1bi[${record.iconIndex}]` : ''}${record.name || ''}` : '';
        const localized = TextManager.parseLocalizedText(text);
        return this.isAutoColorAffected() ? this.applyDatabaseAutoColor(localized, database) : localized;
    };
    base.applyDatabaseAutoColor = function(text, database) {
        for (const [records, category] of [[$dataActors,'Actors'],[$dataClasses,'Classes'],[$dataSkills,'Skills'],
            [$dataItems,'Items'],[$dataWeapons,'Weapons'],[$dataArmors,'Armors'],[$dataEnemies,'Enemies'],[$dataStates,'States']]) {
            if (records !== database) continue;
            const color = Number(settings.AutoColor[category]);
            return color > 0 ? colorize(text, color) : text;
        }
        return text;
    };
    const gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        const result = gainItem.apply(this, arguments);
        if (item && amount > 0) this._lastGainedItemData = {id: item.id, type: DataManager.isItem(item) ? 0 : DataManager.isWeapon(item) ? 1 : 2, quantity: amount};
        return result;
    };
    Game_Party.prototype.getLastGainedItemData = function() {return this._lastGainedItemData ?? {id: -1, type: 0, quantity: 0};};
    base.lastGainedObjectName = function(icon) {
        const data = $gameParty.getLastGainedItemData();
        const item = [$dataItems,$dataWeapons,$dataArmors][data.type][data.id];
        if (!item) return '';
        const name = TextManager.parseLocalizedText(item.name || '');
        return `${icon ? `\x1bi[${item.iconIndex}]` : ''}${name}`;
    };
    base.lastGainedObjectIcon = function() {
        const data = $gameParty.getLastGainedItemData(), item = [$dataItems,$dataWeapons,$dataArmors][data.type][data.id];
        return item ? `\x1bi[${item.iconIndex}]` : '';
    };
    base.lastGainedObjectQuantity = function() {const data = $gameParty.getLastGainedItemData(); return data.id > 0 ? data.quantity : '';};
    base.battleTargetName = function() {return SceneManager.isSceneBattle() ? (BattleManager._target ?? BattleManager._targets?.[0])?.name() ?? '' : '';};
    base.battleUserName = function() {return SceneManager.isSceneBattle() ? (BattleManager._subject ?? (BattleManager.isInputting() ? BattleManager.actor() : null))?.name() ?? '' : '';};
    base.battleActionName = function(icon) {
        if (!SceneManager.isSceneBattle()) return '';
        const action = BattleManager._action ?? (BattleManager.isInputting() ? BattleManager.inputtingAction() : null);
        const item = action?.item();
        return item ? `${icon ? `\x1bI[${item.iconIndex}]` : ''}${item.name}` : '';
    };
    base.isSupportMessageKeywords = function() { return true; };
    base.convertHardcodedEscapeReplacements = function(text) {
        return text.replace(/<(?:CURRENT )?BATTLE TARGET>/gi, () => this.battleTargetName())
            .replace(/<(?:CURRENT )?BATTLE (?:USER|SUBJECT)>/gi, () => this.battleUserName())
            .replace(/<(?:CURRENT )?BATTLE (?:ITEM|SKILL|ACTION)( NAME)?>/gi, (_, name) => this.battleActionName(!name));
    };
    base.convertEscapeCharacters = function(text) {
        text = String(text ?? '');
        text = this.convertTextMacros(text);
        text = this.convertBackslashCharacters(text);
        text = this.convertVariableEscapeCharacters(text);
        for (const method of ['convertButtonAssistEscapeCharacters','preConvertEscapeCharacters','convertFontSettingsEscapeCharacters',
            'convertShowChoiceEscapeCodes','convertTextAlignmentEscapeCharacters','convertLockColorsEscapeCharacters','convertCasingEscapeCharacters','convertBaseEscapeCharacters',
            'convertHardcodedEscapeReplacements','convertMessageCoreEscapeActions','convertMessageCoreEscapeReplacements','postConvertEscapeCharacters']) text = this[method](text);
        return this.processAutoColorWords(this.convertVariableEscapeCharacters(text));
    };
}
installMessageText(messageApi.settings);

function installMessageActions(settings) {
    const base = Window_Base.prototype;
    const conversion = settings.TextCodeActions.slice().sort((a,b) => b.Match.length - a.Match.length).map(rule => ({...rule, pattern: new RegExp(`\x1b${rule.Match}`, 'gi')}));
    base.convertMessageCoreEscapeActions = function(text) {
        for (const rule of conversion) text = text.replace(rule.pattern, `\x1b${rule.Match.toUpperCase()}${rule.Type ? '' : '[0]'}`);
        return text;
    };
    const resetFont = base.resetFontSettings;
    base.resetFontSettings = function(...args) {
        this._textCasing = 0; this._textCasingUpperState = true; this._lastAltCase = false; this._colorLock = false;
        const result = resetFont.apply(this, args);
        this.contents.fontBold = false; this.contents.fontItalic = false; this.contents.outlineWidth = settings.General.DefaultOutlineWidth;
        return result;
    };
    const measure = base.textSizeEx;
    base.textSizeEx = function(...args) {
        const fields = ['fontFace','fontSize','fontBold','fontItalic','textColor','outlineColor','outlineWidth','paintOpacity'];
        const font = Object.fromEntries(fields.map(key => [key, this.contents[key]]));
        const stateFields = ['_textCasing','_textCasingUpperState','_lastAltCase','_colorLock','_textColorStack','_wordWrap','_messageMeasuring','_textAlignment'];
        const state = Object.fromEntries(stateFields.map(key => [key, key === '_textColorStack' ? this[key]?.slice() : this[key]]));
        this._messageMeasuring = true;
        try {return measure.apply(this, args);} finally {Object.assign(this.contents, font); Object.assign(this, state);}
    };
    const character = base.processCharacter;
    base.processCharacter = function(state) {
        const char = state.text[state.index];
        if (char.charCodeAt(0) < 32 || !this._textCasing) return character.call(this, state);
        let result = char;
        if (this._textCasing === 1) result = char.toLowerCase();
        if (this._textCasing === 2) {if (this._textCasingUpperState) result = char.toUpperCase(); this._textCasingUpperState = /\s/.test(char);}
        if (this._textCasing === 3) result = char.toUpperCase();
        if (this._textCasing === 4) {result = this._lastAltCase ? char.toUpperCase() : char.toLowerCase(); this._lastAltCase = !this._lastAltCase;}
        if (this._textCasing === 5) result = Math.random() < .5 ? char.toUpperCase() : char.toLowerCase();
        state.index++; state.buffer += result;
    };
    base.obtainEscapeString = function(state) {
        const match = /^<(.*?)>/.exec(state.text.slice(state.index));
        if (!match) return '';
        state.index += match[0].length;
        return match[1];
    };
    base.isColorLocked = function() {return !!this._colorLock;};
    base.setColorLock = function(value) {this._colorLock = value;};
    const changeColor = base.changeTextColor;
    base.changeTextColor = function(color) {
        if (this.isColorLocked()) return;
        (this._textColorStack ??= []).unshift(this.contents.textColor);
        return changeColor.call(this, color.replaceAll(',', ''));
    };
    base.processPreviousColor = function(state) {
        this.obtainEscapeParam(state);
        if (state.drawing && !this.isColorLocked()) this.contents.textColor = this._textColorStack?.shift() || ColorManager.normalColor();
    };
    const process = base.processEscapeCharacter;
    base.processEscapeCharacter = function(code, state) {
        if (code === 'PX' || code === 'PY') {
            const axis = code === 'PX' ? 'x' : 'y', start = code === 'PX' ? state.startX : state.startY;
            state[axis] = this.obtainEscapeParam(state) + (settings.General.RelativePXPY ? start : 0); return;
        }
        if (code === 'CASING') {this._textCasing = this.obtainEscapeParam(state); this._textCasingUpperState = true; this._lastAltCase = true; return;}
        if (code === 'COMMONEVENT') {const id = this.obtainEscapeParam(state); if (state.drawing && this.constructor === Window_Message) this.launchMessageCommonEvent(id); return;}
        if (code === 'WAIT') {const frames = this.obtainEscapeParam(state); if (state.drawing && this.constructor === Window_Message) this.startWait(frames); return;}
        if (code === 'FS') {this.contents.fontSize = this.obtainEscapeParam(state).clamp(settings.General.FontSmallerCap, settings.General.FontBiggerCap); return;}
        if (code === 'BOLD' || code === 'ITALIC') {this.contents[code === 'BOLD' ? 'fontBold' : 'fontItalic'] = !!this.obtainEscapeParam(state); return;}
        if (code === 'COLORLOCK') {this.setColorLock(!!this.obtainEscapeParam(state)); return;}
        if (code === 'PREVCOLOR') return this.processPreviousColor(state);
        const rules = settings.TextCodeActions.filter(rule => rule.Match.toUpperCase() === code);
        if (rules.length) {
            for (const rule of rules) {
                if (!rule.Type) this.obtainEscapeParam(state);
                runMessageTextScript(rule, 'ActionJS', this, [state], state.drawing ? 'drawing' : 'measurement');
                if (state.drawing && this.constructor === Window_Message && rule.CommonEvent > 0) this.launchMessageCommonEvent(rule.CommonEvent);
            }
            return;
        }
        return process.apply(this, arguments);
    };
    base.maxFontSizeInLine = function(line) {
        let maximum = this.contents.fontSize;
        for (const match of line.matchAll(/\x1b({|}|FS)(\[(\d+)])?/gi)) {
            const code = match[1].toUpperCase();
            if (code === '{') this.makeFontBigger();
            if (code === '}') this.makeFontSmaller();
            if (code === 'FS') this.contents.fontSize = Number(match[3]).clamp(settings.General.FontSmallerCap, settings.General.FontBiggerCap);
            maximum = Math.max(maximum, this.contents.fontSize);
        }
        return maximum;
    };
    base.makeFontBigger = function() {this.contents.fontSize = Math.min(this.contents.fontSize + settings.General.FontChangeValue, settings.General.FontBiggerCap);};
    base.makeFontSmaller = function() {this.contents.fontSize = Math.max(this.contents.fontSize - settings.General.FontChangeValue, settings.General.FontSmallerCap);};
    // Native Message has wait/audio side effects; measurement uses only the base style processor.
    const messageProcess = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, state) {
        if (!state.drawing) return base.processEscapeCharacter.call(this, code, state);
        return messageProcess.apply(this, arguments);
    };
}
installMessageActions(messageApi.settings);

function Game_MessageCommonEvent(commonEventId, eventId) {
    this.initialize(commonEventId, eventId);
}
Game_MessageCommonEvent.prototype.initialize = function(commonEventId, eventId) {
    this._commonEventId = commonEventId;
    this._eventId = eventId || 0;
    this.refresh();
};
Game_MessageCommonEvent.prototype.event = function() { return $dataCommonEvents[this._commonEventId]; };
Game_MessageCommonEvent.prototype.list = function() { return this.event().list; };
Game_MessageCommonEvent.prototype.refresh = function() {
    this._interpreter = new Game_Interpreter();
    this._interpreter.setup(this.list(), this._eventId);
};
Game_MessageCommonEvent.prototype.clear = function() { this._interpreter = null; };
Game_MessageCommonEvent.prototype.update = function() {
    if (!this._interpreter) return;
    if (this._interpreter.isRunning()) this._interpreter.update();
    else this.clear();
};
globalThis.Game_MessageCommonEvent = Game_MessageCommonEvent;

function installMessageCommonEvents() {
    const clearMessage = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function(...args) {
        const result = clearMessage.apply(this, args);
        this._messageEventContext = null;
        return result;
    };
    for (const method of ['initialize', 'setupEvents']) {
        const previous = Game_Map.prototype[method];
        Game_Map.prototype[method] = function(...args) {
            this._messageCommonEvents = [];
            return previous.apply(this, args);
        };
    }
    Game_Map.prototype.addMessageCommonEvent = function(id, eventId = this._interpreter.eventId()) {
        if (!$dataCommonEvents[id]) return;
        (this._messageCommonEvents ??= []).push(new Game_MessageCommonEvent(id, eventId));
    };
    Game_Map.prototype.updateMessageCommonEvents = function() {
        const events = this._messageCommonEvents ?? [];
        for (const event of [...events]) event.update();
        this._messageCommonEvents = events.filter(event => event._interpreter);
    };
    const update = Game_Map.prototype.updateEvents;
    Game_Map.prototype.updateEvents = function(...args) {
        const result = update.apply(this, args);
        this.updateMessageCommonEvents();
        return result;
    };
    Window_Message.prototype.launchMessageCommonEvent = function(id) {
        if ($gameParty.inBattle()) return;
        const context = $gameMessage._messageEventContext;
        const eventId = context?.mapId === $gameMap.mapId() ? context.eventId : $gameMap._interpreter.eventId();
        $gameMap.addMessageCommonEvent(id, eventId);
    };
}
installMessageCommonEvents();

Window_Message._autoSizeRegexp = /<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi;
Window_Message._autoPosRegExp = /<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi;

function installMessageMovement() {
    const base = Window_Base.prototype;
    const initialize = base.initialize;
    base.initialize = function(rect) {
        const result = initialize.apply(this, arguments);
        this._messageResetRect = {x: rect.x, y: rect.y, width: rect.width, height: rect.height};
        this._moveDuration = 0;
        return result;
    };
    base.moveTo = function(x, y, width, height, duration = 20, easing = 0) {
        if (![x,y,width,height,duration].every(Number.isFinite) || width < 0 || height < 0 || duration < 0) {
            throw new CoreError('MESSAGE_MOVE_DIMENSIONS', 'Message movement requires finite dimensions and duration.');
        }
        this._messageMoveStart = {x:this.x, y:this.y, width:this.width, height:this.height};
        this._moveTargetX=x; this._moveTargetY=y; this._moveTargetWidth=width; this._moveTargetHeight=height;
        this._moveDuration = this._moveMaxDuration = Math.round(duration);
        this._moveEasingType = easing;
        if (!this._moveDuration) {
            this._moveDuration = this._moveMaxDuration = 1;
            this.updateMove();
        }
    };
    base.moveBy = function(x,y,width,height,duration,easing) {return this.moveTo(this.x+x,this.y+y,this.width+width,this.height+height,duration,easing);};
    base.resetRect = function(duration = 20,easing = 0) {
        const rect=this._messageResetRect;
        return this.moveTo(rect.x,rect.y,rect.width,rect.height,duration,easing);
    };
    Window_Message.prototype.resetRect = function(duration = 20,easing = 0) {
        const rect=this._messageResetRect;
        const y=this._positionType*(Graphics.boxHeight-this.height)/2;
        return this.moveTo(rect.x,y,rect.width,rect.height,duration,easing);
    };
    base.calcMoveEasing = function(progress) {
        if (this._moveEasingType === 0) return progress;
        if (this._moveEasingType === 1) return progress*progress;
        if (this._moveEasingType === 2) return 1-(1-progress)*(1-progress);
        if (this._moveEasingType === 3) return progress < .5 ? 2*progress*progress : 1-2*(1-progress)*(1-progress);
        return VisuMZ.applyMoveEasing(progress,this._moveEasingType);
    };
    base.canMove = function() {return false;};
    Window_Message.prototype.canMove = function() {return true;};
    base.updateMove = function() {
        if (this._moveDuration > 0) {
            const progress = this.calcMoveEasing(1-(--this._moveDuration)/this._moveMaxDuration);
            const start = this._messageMoveStart;
            if (this.canMove()) {
                this.move(
                start.x+(this._moveTargetX-start.x)*progress,
                start.y+(this._moveTargetY-start.y)*progress,
                start.width+(this._moveTargetWidth-start.width)*progress,
                start.height+(this._moveTargetHeight-start.height)*progress);
                this.clampPlacementPosition();
            }
        }
    };
    Window_Message.prototype.updateNameBoxMove = function(previous) {
        if (this._nameBoxWindow) {
            this._nameBoxWindow.x += this.x-previous.x;
            this._nameBoxWindow.y += this.y-previous.y;
        }
    };
    Window_Message.prototype.updateMove = function() {
        const previous = {x:this.x, y:this.y};
        base.updateMove.call(this);
        this.updateNameBoxMove(previous);
    };
    const update = base.update;
    base.update = function(...args) {
        const result = update.apply(this,args);
        this.updateMove();
        return result;
    };
}
installMessageMovement();

function installMessageWrapping(settings) {
    const base=Window_Base.prototype;
    const convert=base.convertEscapeCharacters;
    base.convertEscapeCharacters=function(text){
        text=convert.call(this,text);
        if (!this._messageRawMeasuring) this._wordWrap=this instanceof Window_Message ? $gameSystem?.isMessageWindowWordWrap() : this instanceof Window_Help ? $gameSystem?.isHelpWindowWordWrap() : false;
        return this.prepareWordWrapEscapeCharacters(text);
    };
    base.prepareWordWrapEscapeCharacters=function(text){
        if (text.includes('\x1bTEXTALIGNMENT')) {
            this._wordWrap=false;
            return text.replace(/<(?:BR|LINEBREAK)>/gi,' \n').replace(/<(?:WORDWRAP|WORD WRAP|NOWORDWRAP|NO WORD WRAP)>|<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,'');
        }
        if (/<(?:WORDWRAP|WORD WRAP)>/i.test(text)) this._wordWrap=true;
        if (/<(?:NOWORDWRAP|NO WORD WRAP)>|<\/(?:WORDWRAP|WORD WRAP)>/i.test(text)) this._wordWrap=false;
        if (this instanceof Window_ChoiceList || /\x1bTEXTALIGNMENT|<AUTO(?: ?(?:SIZE|WIDTH|HEIGHT|PLAYER|ACTOR|PARTY|ENEMY|EVENT))?(?:>|: )/i.test(text)) this._wordWrap=false;
        text=text.replace(/<\/?(?:WORDWRAP|WORD WRAP)>|<(?:NOWORDWRAP|NO WORD WRAP)>/gi,'');
        if (this._wordWrap) {
            text=settings.WordWrap.LineBreakSpace ? text.replace(/[\n\r]+/g,' ') : text.replace(/\r\n?/g,'\n');
            text=text.replace(/<(?:BR|LINEBREAK)>/gi,settings.WordWrap.LineBreakSpace?' \n':'\n');
            text=text.replace(/[\u3040-\u30FF\u4E00-\u9FFF](?!\x1bWrapJpBreak\[0\])/g,character=>character+'\x1bWrapJpBreak[0]');
            text=text.replace(/ /g,'\x1bWrapBreak[0]');
            text=text.replace(/<LINE\x1bWrapBreak0BREAK>/gi,'\n');
        } else text=text.replace(/<(?:BR|LINEBREAK)>/gi,' \n');
        return text;
    };
    Window_Base.WORD_WRAP_PADDING=settings.WordWrap.EndPadding;
    base.textSizeExWordWrap=function(text) {
        const previous=this._messageWrapMeasuring;
        this._messageWrapMeasuring=true;
        try { return this.textSizeExRaw(text); }
        finally { this._messageWrapMeasuring=previous; }
    };
    base.processWrapBreak=function(state,japanese=false) {
        const extra=this.obtainEscapeParam(state);
        if(!japanese)state.x+=(state.rtl?-1:1)*this.textWidth(' ')*(extra>0?2:1);
        if(state.rtl || this._messageWrapMeasuring)return;
        const token=japanese?'\x1bWrapJpBreak[0]':'\x1bWrapBreak[0]';
        const next=state.text.indexOf(token,state.index+1),newline=state.text.indexOf('\n',state.index);
        const end=Math.min(next<0?state.text.length:next,newline<0?state.text.length:newline);
        const width=this.textSizeExWordWrap(state.text.slice(state.index,end)).width;
        let available=(state.width || this.innerWidth)-Window_Base.WORD_WRAP_PADDING;
        if(this.constructor===Window_Message && $gameMessage.faceName())available-=(ImageManager.faceWidth+20)*(settings.WordWrap.TightWrap?2:1);
        if(width>0 && state.x+width>state.startX+available)state.text=state.text.slice(0,state.index)+'\n'+state.text.slice(state.index);
    };
    const process=base.processEscapeCharacter;
    base.processEscapeCharacter=function(code,state) {
        if(code==='WRAPBREAK' || code==='WRAPJPBREAK')return this.processWrapBreak(state,code==='WRAPJPBREAK');
        return process.apply(this,arguments);
    };
}
installMessageWrapping(messageApi.settings);

function installMessageAlignment() {
    const base = Window_Base.prototype;
    base.initTextAlignement = function() { this._textAlignment = 'default'; };
    base.setTextAlignment = function(value) { this._textAlignment = value; };
    base.getTextAlignment = function() { return this._textAlignment ?? 'default'; };
    base.convertTextAlignmentEscapeCharacters = function(text) {
        return text.replace(/<(LEFT|CENTER|RIGHT)>/gi, (_, align) => `\x1bTEXTALIGNMENT[${['LEFT','CENTER','RIGHT'].indexOf(align.toUpperCase())+1}]`)
            .replace(/<\/(?:LEFT|CENTER|RIGHT)>/gi, '\x1bTEXTALIGNMENT[0]');
    };
    base.getPreservedFontSettings = function() {
        return Object.fromEntries(['fontFace','fontSize','fontBold','fontItalic','textColor','outlineColor','outlineWidth','paintOpacity'].map(key => [key, this.contents[key]]));
    };
    base.returnPreservedFontSettings = function(settings) { Object.assign(this.contents, settings); };
    base.textSizeExRaw = function(text) {
        const font = this.getPreservedFontSettings();
        const keys = ['_messageMeasuring','_messageRawMeasuring','_wordWrap','_textAlignment','_textCasing','_textCasingUpperState','_lastAltCase','_colorLock','_textColorStack'];
        const previous = Object.fromEntries(keys.map(key => [key, key === '_textColorStack' ? this[key]?.slice() : this[key]]));
        this._messageMeasuring = true;
        this._messageRawMeasuring = true;
        try {
            const state = this.createTextState(text, 0, 0, 0);
            state.drawing = false;
            this.processAllText(state);
            return {width: state.outputWidth, height: state.outputHeight};
        } finally {
            this.returnPreservedFontSettings(font);
            Object.assign(this, previous);
        }
    };
    base.textSizeExTextAlignment = function(text) { return this.textSizeExRaw(text); };
    base.processTextAlignmentX = function(state) {
        const align = this.getTextAlignment();
        if (!state.drawing || state.rtl || align === 'default') return;
        const remaining = state.text.slice(state.index).split(/\n|\x1bTEXTALIGNMENT/)[0];
        const textWidth = this.textSizeExTextAlignment(remaining).width;
        const width = state.width || this.innerWidth-8;
        const faceIndent = this.constructor === Window_Message && $gameMessage.faceName() ? state.startX : 0;
        state.x = state.startX;
        if (align === 'center') state.x += Math.floor((width-textWidth)/2) - faceIndent/2;
        if (align === 'right') state.x += width-textWidth-faceIndent;
    };
    base.processTextAlignmentChange = function(state) {
        const index = this.obtainEscapeParam(state);
        if (!state.drawing) return;
        this.setTextAlignment(['default','left','center','right'][index] ?? 'default');
        this.processTextAlignmentX(state);
    };
    const process = base.processEscapeCharacter;
    base.processEscapeCharacter = function(code, state) {
        if (code === 'TEXTALIGNMENT') return this.processTextAlignmentChange(state);
        return process.apply(this, arguments);
    };
    const newline = base.processNewLine;
    base.processNewLine = function(state) {
        newline.call(this, state);
        this.processTextAlignmentX(state);
    };
    const clear = Window_Message.prototype.clearFlags;
    const processAllText = base.processAllText;
    base.processAllText = function(state) {
        const result = processAllText.call(this, state);
        if (state.drawing) this.setTextAlignment('default');
        return result;
    };
    Window_Message.prototype.clearFlags = function(...args) {
        const result = clear.apply(this, args);
        this.setTextAlignment('default');
        return result;
    };
}
installMessageAlignment();

function installMessageMapName() {
    const window=Window_MapName.prototype;
    window.realignMapName=function(text) {
        for(const [axis,size,viewport,tags] of [
            ['x',this.width,Graphics.boxWidth,['LEFT','CENTER','RIGHT']],
            ['y',this.height,Graphics.boxHeight,['TOP','MIDDLE','BOTTOM']]
        ]) {
            const position=tags.findIndex(tag=>new RegExp('<'+tag+'>','i').test(text));
            if(position>=0)this[axis]=Math.floor((viewport-size)*position/2);
            text=text.replace(new RegExp('<\\/?(?:'+tags.join('|')+')>','gi'),'');
            const offsets=new RegExp('<'+axis+': ([+-]\\d+)>','gi');
            const last=Array.from(text.matchAll(offsets)).at(-1);
            if(last)this[axis]+=Number(last[1]);
            text=text.replace(offsets,'');
        }
        return text;
    };
    window.refreshWithTextCodeSupport=function() {
        this.contents.clear();
        const name=$gameMap.displayName();
        if(!name)return;
        this.drawBackground(0,0,this.innerWidth,this.lineHeight());
        const text=this.realignMapName(name);
        this.drawTextEx(text,Math.floor((this.innerWidth-this.textSizeEx(text).width)/2),0);
    };
}
installMessageMapName();

function installMessageWindow(settings) {
    const general = settings.General;
    Game_System.prototype.initializeMessageCoreSettings = function() {
        const defaults = {messageRows:general.MessageRows,messageWidth:general.MessageWidth,
            messageWordWrap:settings.WordWrap.MessageWindow,helpWordWrap:settings.WordWrap.HelpWindow,
            choiceLineHeight:general.ChoiceWindowLineHeight,choiceMinWidth:general.ChoiceWindowMinWidth,
            choiceRows:general.ChoiceWindowMaxRows,choiceCols:general.ChoiceWindowMaxCols,choiceTextAlign:general.ChoiceWindowTextAlign,choiceDistance:0};
        this._MessageCoreSettings ??= {};
        for (const [key, value] of Object.entries(defaults)) if (this._MessageCoreSettings[key] === undefined) this._MessageCoreSettings[key] = value;
        this._messageOffsetX ??= general.MsgWindowOffsetX;
        this._messageOffsetY ??= general.MsgWindowOffsetY;
    };
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(...args) {
        const result = initialize.apply(this,args);
        this.initializeMessageCoreSettings();
        return result;
    };
    for (const [suffix,key] of [['MessageWindowRows','messageRows'],['ChoiceListLineHeight','choiceLineHeight'],
        ['ChoiceListMinChoiceWidth','choiceMinWidth'],['ChoiceListMaxRows','choiceRows'],['ChoiceListMaxColumns','choiceCols'],['ChoiceListTextAlign','choiceTextAlign'],['ChoiceMessageDistance','choiceDistance']]) {
        Game_System.prototype[`get${suffix}`]=function(){return this._MessageCoreSettings[key];};
        Game_System.prototype[`set${suffix}`]=function(value){this._MessageCoreSettings[key]=value;};
    }
    Game_System.prototype.getMessageWindowWidth=function(){return this._MessageCoreSettings.messageWidth;};
    Game_System.prototype.setMessageWindowWidth=function(value){
        value=Math.ceil(value);
        if(value%2!==0)value+=1;
        this._MessageCoreSettings.messageWidth=value||2;
    };
    Game_System.prototype.isMessageWindowWordWrap=function(){return this._MessageCoreSettings.messageWordWrap;};
    Game_System.prototype.isHelpWindowWordWrap=function(){return this._MessageCoreSettings.helpWordWrap;};
    Game_System.prototype.setMessageWindowXyOffsets=function(x,y){this._messageOffsetX=x;this._messageOffsetY=y;};
    Game_System.prototype.getMessageWindowXyOffsets=function(){return{x:this._messageOffsetX,y:this._messageOffsetY};};
    function addedText(text) {
        text = general.EachMessageStart + text + general.EachMessageEnd;
        return text.replace(/<(?:NEXT PAGE|NEXTPAGE)>/gi, '')
            .replace(/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi, (_, pool) => {
                const options = pool.split('|').map(value => value.trim()).filter(Boolean);
                return options[Math.randomInt(options.length)];
            });
    }
    Game_Interpreter.prototype.command101 = function(params) {
        if ($gameMessage.isBusy()) return false;
        $gameMessage.setFaceImage(params[0], params[1]);
        $gameMessage.setBackground(params[2]);
        $gameMessage.setPositionType(params[3]);
        $gameMessage.setSpeakerName(params[4]);
        $gameMessage._messageEventContext = {mapId: this._mapId, eventId: this.eventId()};
        const rows = $gameSystem.getMessageWindowRows();
        while (this.nextEventCode() === 401 || (rows > 4 && this.nextEventCode() === 101)) {
            if (this.nextEventCode() === 101 && !params.every((value, index) => value === this._list[this._index + 1].parameters[index])) break;
            this._index++;
            const command = this.currentCommand();
            if (command.code === 401) {
                $gameMessage.add(addedText(command.parameters[0]));
                if (/<(?:NEXT PAGE|NEXTPAGE)>/i.test(command.parameters[0])) break;
            }
            if ($gameMessage._texts.length >= rows && this.nextEventCode() !== 401) break;
        }
        this.prepareShowTextFollowups();
        this.setWaitMode('message');
        return true;
    };
    Scene_Message.prototype.messageWindowRect = function() {
        const width = Math.min(Graphics.width, $gameSystem.getMessageWindowWidth());
        const height = this.calcWindowHeight($gameSystem.getMessageWindowRows(), false);
        return new Rectangle((Graphics.boxWidth-width)/2, 0, width, height);
    };
    const window = Window_Message.prototype;
    // Consumers contribute their extra dimensions through these extension points.
    window.addedWidth=function(){return 0;};
    window.addedHeight=function(){return 0;};
    window.updateDimensions=function(){
        const oldWidth=this.width, oldHeight=this.height;
        this.width=Math.min(Graphics.width,this._forcedPosition?.width ?? this._messageAutoSize?.width ?? ($gameSystem.getMessageWindowWidth()+this.addedWidth()));
        this.height=Math.min(Graphics.height,this._forcedPosition?.height ?? this._messageAutoSize?.height ?? (Scene_Base.prototype.calcWindowHeight.call(SceneManager._scene,$gameSystem.getMessageWindowRows(),false)+this.addedHeight()));
        if(this.contents && (oldWidth!==this.width || oldHeight!==this.height))this.createContents();
    };
    window.clampPlacementPosition=function(){
        this.x=Math.max(0,Math.min(this.x,Graphics.boxWidth-this.width));
        this.y=Math.max(0,Math.min(this.y,Graphics.boxHeight-this.height));
    };
    const placement=window.updatePlacement;
    window.updatePlacement=function(...args){
        this.updateDimensions();
        const result=placement.apply(this,args),offset=$gameSystem.getMessageWindowXyOffsets();
        this.x=this._forcedPosition?.x ?? (Graphics.boxWidth-this.width)/2+offset.x;
        this.y=this._forcedPosition?.y ?? this.y+offset.y;
        this.clampPlacementPosition();return result;
    };
    const convert=window.convertEscapeCharacters;
    window.convertEscapeCharacters=function(text){
        text=convert.call(this,text);
        if(this._wordWrap)return text;
        return text.replace(/<(POSITION|COORDINATES|DIMENSIONS|OFFSET): *(.*?)>/gi,(_,tag,source)=>{
            if(this._messageMeasuring)return '';
            const values=source.split(',').map(value=>Number(value)||0),kind=tag.toUpperCase();
            if(kind==='OFFSET')$gameSystem.setMessageWindowXyOffsets(values[0],values[1]??0);
            else {
                const keys=kind==='DIMENSIONS'?['width','height']:kind==='COORDINATES'?['x','y']:['x','y','width','height'];
                this._forcedPosition??={};
                keys.forEach((key,index)=>{if(index<values.length)this._forcedPosition[key]=values[index];});
            }
            return '';
        });
    };
    const startMessage=window.startMessage;
    window.startMessage=function(...args){
        this._forcedPosition=null;
        this.updateDimensions();
        this.setTextDelay(general.MessageTextDelay);
        return startMessage.apply(this,args);
    };
    window.setTextDelay=function(value){this._textDelay=this._textDelayCount=Math.round(value*(11-(ConfigManager.textSpeed ?? 10)));};
    const process=window.processCharacter;
    window.processCharacter=function(state){
        if (!state.drawing) return Window_Base.prototype.processCharacter.call(this,state);
        if (--this._textDelayCount>0) return;
        this._textDelayCount=this._textDelay;
        if (this._textDelay<=0) this._showFast=true;
        return process.call(this,state);
    };
    const triggered=window.isTriggered;
    window.isTriggered=function(){return triggered.apply(this,arguments)||Input.isPressed(general.FastForwardKey);};
    const nameColor=Window_NameBox.prototype.resetTextColor;
    Window_NameBox.prototype.resetTextColor=function(...args){const result=nameColor.apply(this,args);this.changeTextColor(ColorManager.textColor(general.NameBoxWindowDefaultColor));return result;};
    const namePlacement=Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement=function(...args){const result=namePlacement.apply(this,args);this.x+=general.NameBoxWindowOffsetX;this.y+=general.NameBoxWindowOffsetY;return result;};
    messageApi.registerCommand('MessageWindowProperties',function(args){
        if(args.Rows>0)$gameSystem.setMessageWindowRows(args.Rows);
        if(args.Width>0)$gameSystem.setMessageWindowWidth(args.Width);
        if(args.WordWrap!=='No Change')$gameSystem._MessageCoreSettings.messageWordWrap=args.WordWrap==='true';
        const message=SceneManager._scene?._messageWindow;
        if(message){message.updatePlacement();message.createContents();}
    });
    messageApi.registerCommand('MessageWindowXyOffsets',function(args){return $gameSystem.setMessageWindowXyOffsets(args.OffsetX,args.OffsetY);});
}
installMessageWindow(messageApi.settings);

function installMessageAutoLayout(settings) {
    const base = Window_Base.prototype;
    base.setWordWrap = function(value) { this._wordWrap = value; return ''; };
    base.isWordWrapEnabled = function() { return !!this._wordWrap; };
    base.resetWordWrap = function() { this.setWordWrap(false); };
    Window_Help.prototype.resetWordWrap = function() { this.setWordWrap($gameSystem.isHelpWindowWordWrap()); };
    base.clampPlacementPosition = function(keepSize = false, keepPosition = false) {
        if (!keepSize) { this.width = Math.min(this.width, Graphics.width); this.height = Math.min(this.height, Graphics.height); }
        if (keepPosition) return;
        const left = -Math.floor(Graphics.width-Graphics.boxWidth)/2;
        const top = -Math.floor(Graphics.height-Graphics.boxHeight)/2;
        this.x = Math.max(left, Math.min(this.x, left+Graphics.width-this.width));
        this.y = Math.max(top, Math.min(this.y, top+Graphics.height-this.height));
    };
    const window = Window_Message.prototype;
    window.clampPlacementPosition = base.clampPlacementPosition;
    window.resetWordWrap = function() { this.setWordWrap($gameSystem.isMessageWindowWordWrap()); };
    const contentsHeight = window.contentsHeight;
    window.contentsHeight = function() { return contentsHeight.call(this)-this.addedHeight(); };
    const dimmer = window.refreshDimmerBitmap;
    window.refreshDimmerBitmap = function() {
        dimmer.call(this);
        if (settings.General.StretchDimmedBg) this.stretchDimmerSprite();
    };
    window.stretchDimmerSprite = function() {
        this._dimmerSprite.x = Math.round(this.width/2);
        this._dimmerSprite.anchor.x = .5;
        this._dimmerSprite.scale.x = Graphics.width;
    };
    window.autoPositionOffsetX = function() { return 0; };
    window.autoPositionOffsetY = function() { return 0; };
    window.processAutoSize = function(text, width, height) {
        const clean = text.replace(/<AUTO(?:SIZE| SIZE|WIDTH| WIDTH|HEIGHT| HEIGHT|PLAYER| PLAYER)?>/gi, '')
            .replace(/<AUTO ?(?:ACTOR|PARTY|ENEMY|EVENT|PLAYER): .*?>/gi, '');
        this._currentAutoSize = true;
        this.setWordWrap(false);
        const size = this.textSizeExRaw(clean);
        const faceWidth = $gameMessage.faceName() ? ImageManager.faceWidth+20 : 4;
        const dimensions = {};
        if (width) dimensions.width = Math.ceil((size.width+$gameSystem.windowPadding()*2+6+faceWidth)/2)*2;
        if (height) dimensions.height = SceneManager._scene.calcWindowHeight(Math.ceil(size.height/this.lineHeight()), false)+this.addedHeight();
        this._messageAutoSize = {...this._messageAutoSize, ...dimensions};
        this.updateDimensions();
    };
    window.processAutoPosition = function(context, id) {
        const [scene, kind] = context.split(' ');
        let target;
        if (scene === 'battle') {
            if (kind === 'actor') target = $gameActors.actor(id);
            if (kind === 'party') target = $gameParty.members()[id-1];
            if (kind === 'enemy') target = $gameTroop.members()[id-1];
        } else if (scene === 'map') {
            if (kind === 'player') target = $gamePlayer;
            if (kind === 'event') target = $gameMap.event(id);
            if (kind === 'actor' || kind === 'party') {
                const index = kind === 'actor' ? $gameActors.actor(id)?.index() : id-1;
                if (index === 0) target = $gamePlayer;
                else if (index > 0) target = $gamePlayer.followers().follower(index-1);
            }
        }
        this._autoPositionTarget = target;
    };
    window.prepareAutoSizeEscapeCharacters = function(state) {
        if (this._messageMeasuring) return;
        let text = state.text;
        text = text.replace(/<(AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT)>/gi, (_, tag) => {
            const mode = tag.toUpperCase();
            this.processAutoSize(text, !mode.includes('HEIGHT'), !mode.includes('WIDTH'));
            this.processAutoPosition('none');
            return '';
        });
        const scene = SceneManager.isSceneBattle() ? 'battle' : SceneManager.isSceneMap() ? 'map' : null;
        if (scene) text = text.replace(/<AUTO ?(ACTOR|PARTY|ENEMY|EVENT): (.*?)>|<AUTO ?(PLAYER)>/gi, (all, kind, source, player) => {
            kind = (kind || player).toLowerCase();
            if ((scene === 'map' && kind === 'enemy') || (scene === 'battle' && ['event','player'].includes(kind))) return all;
            this.processAutoSize(text, true, true);
            this.processAutoPosition(`${scene} ${kind}`, Number(source) || (kind === 'actor' ? 1 : 0));
            return '';
        });
        state.text = text;
    };
    window.updateAutoPosition = function() {
        if (!this._autoPositionTarget) return;
        const spriteset = SceneManager._scene?._spriteset;
        if (!spriteset) return;
        const sprite = spriteset.findTargetSprite(this._autoPositionTarget);
        if (!sprite) return;
        const zoom = SceneManager.isSceneMap() ? $gameScreen.zoomScale() : 1;
        const offset = $gameSystem.getMessageWindowXyOffsets();
        this.x = Math.round(sprite.x*zoom-this.width/2-(Graphics.width-Graphics.boxWidth)/2+this.autoPositionOffsetX()+offset.x);
        this.y = Math.round((sprite.y-sprite.height-8-this.height)*zoom-(Graphics.height-Graphics.boxHeight)/2+this.autoPositionOffsetY()+offset.y);
        this.clampPlacementPosition(true);
        this._forcedPosition = {...this._forcedPosition, x:this.x, y:this.y, width:this.width, height:this.height};
        if (this._nameBoxWindow) this._nameBoxWindow.updatePlacement();
    };
    const start = window.startMessage;
    window.startMessage = function(...args) {
        this._messageAutoSize = null;
        this._currentAutoSize = false;
        this._autoPositionTarget = null;
        return start.apply(this, args);
    };
    const page = window.newPage;
    window.convertNewPageTextStateMacros = function(state) {
        if (!state) return;
        this._macroBypassWordWrap = false;
        state.text = this.convertTextMacros(state.text);
        if (this._textMacroFound) {
            state.text = this.prepareWordWrapEscapeCharacters(state.text);
            this._macroBypassWordWrap = true;
        }
    };
    window.newPage = function(state) {
        this.convertNewPageTextStateMacros(state);
        this.prepareAutoSizeEscapeCharacters(state);
        page.call(this, state);
        this.updateDimensions();
        this.updateAutoPosition();
    };
    const placement = window.updatePlacement;
    window.updatePlacement = function(...args) {
        const result = placement.apply(this, args);
        this.updateAutoPosition();
        return result;
    };
    const update = window.update;
    window.update = function(...args) {
        const result = update.apply(this, args);
        if (this.isOpen()) this.updateAutoPosition();
        return result;
    };
    const namebox = Window_NameBox.prototype;
    const preConvert = namebox.preConvertEscapeCharacters;
    namebox.preConvertEscapeCharacters = function(text) {
        text = text.replace(/<(LEFT|CENTER|RIGHT)>|<POSITION: (\d+)>/gi, (_, align, index) => {
            if (!this._messageMeasuring) this._relativePosition = index === undefined ? {LEFT:0,CENTER:5,RIGHT:10}[align.toUpperCase()] : Number(index);
            return '';
        }).replace(/<\/(?:LEFT|CENTER|RIGHT)>/gi,'').trim();
        return preConvert.call(this, text);
    };
    namebox.updateRelativePosition = function() {
        if ($gameMessage.isRTL()) return;
        const message = this._messageWindow;
        this.x = message.x+Math.floor(message.width*(this._relativePosition ?? 0)/10)-Math.floor(this.width/2);
        this.x = Math.min(Math.max(this.x, message.x), message.x+message.width-this.width);
    };
    const namePlacement = namebox.updatePlacement;
    namebox.updatePlacement = function(...args) {
        const result = namePlacement.apply(this, args);
        this.updateRelativePosition();
        if (!$gameMessage.isRTL()) this.x += Math.floor(settings.General.NameBoxWindowOffsetX*(5-(this._relativePosition ?? 0))/5);
        this.clampPlacementPosition();
        const message = this._messageWindow;
        if (message.y > this.y && message.y < this.y+this.height-settings.General.NameBoxWindowOffsetY) this.y = message.y+message.height;
        return result;
    };
    const refresh = namebox.refresh;
    namebox.refresh = function(...args) {
        this._relativePosition = 0;
        const result = refresh.apply(this, args);
        if (this._messageWindow) this.updatePlacement();
        return result;
    };
}
installMessageAutoLayout(messageApi.settings);

function installMessageResources(settings) {
    Scene_Boot.prototype.loadCustomFontsMessageCore = function() {
        for (const font of settings.CustomFonts) {
            const family = font.FontFamily;
            if (family.trim() && family.toLowerCase().trim() !== 'unnamed' && font.Filename !== 'Unnamed.ttf') FontManager.load(family, font.Filename);
        }
    };
    const loadFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function(...args) {
        const result = loadFonts.apply(this, args);
        this.loadCustomFontsMessageCore();
        return result;
    };
    const base = Window_Base.prototype;
    base.clearMessageResourceRequests = function() {
        for (const request of this._messageResourceRequests ?? []) request.owner = null;
        this._messageResourceRequests = [];
    };
    for (const method of ['createContents', 'destroy']) {
        const previous = base[method];
        base[method] = function(...args) {
            this.clearMessageResourceRequests();
            return previous.apply(this, args);
        };
    }
    for (const Window of [Window_Help, Window_NameBox]) {
        const refresh = Window.prototype.refresh;
        Window.prototype.refresh = function(...args) {
            this.clearMessageResourceRequests();
            this.contentsBack.clear();
            return refresh.apply(this, args);
        };
    }
    const newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(...args) {
        this.clearMessageResourceRequests();
        this.contentsBack.clear();
        return newPage.apply(this, args);
    };
    base.withMessagePicture = function(name, draw) {
        const bitmap = ImageManager.loadPicture(name);
        const request = {owner: this, bitmap, name, locale: ConfigManager.textLocale};
        (this._messageResourceRequests ??= []).push(request);
        bitmap.addLoadListener(function() {
            const owner = request.owner;
            if (!owner) return;
            request.owner = null;
            owner._messageResourceRequests = owner._messageResourceRequests.filter(item => item !== request);
            if (request.locale === ConfigManager.textLocale) draw(owner, bitmap);
        });
    };
    const update = base.update;
    base.update = function(...args) {
        const result = update.apply(this, args);
        for (const request of this._messageResourceRequests ?? []) {
            if (request.bitmap.isError()) throw new CoreError('MESSAGE_IMAGE', `Cannot load message picture: ${request.name}.`, {asset: request.name});
        }
        return result;
    };
    base.processDrawPicture = function(state) {
        const [name, width, height] = this.obtainEscapeString(state).split(',');
        if (!state.drawing) return;
        const x = state.x, y = state.y, opacity = this.contents.paintOpacity;
        this.withMessagePicture(name.trim(), (owner, bitmap) => owner.drawBackPicture(bitmap, x, y, Number(width), Number(height), opacity));
    };
    base.drawBackPicture = function(bitmap, x, y, width, height, opacity) {
        this.contentsBack.paintOpacity = opacity;
        this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, width || bitmap.width, height || bitmap.height);
        this.contentsBack.paintOpacity = 255;
    };
    base.processDrawCenteredPicture = function(state) {
        const name = this.obtainEscapeString(state).split(',')[0].trim();
        if (!state.drawing) return;
        const snapshot = {width: state.width, startX: state.startX, startY: state.startY};
        const opacity = this.contents.paintOpacity;
        this.withMessagePicture(name, (owner, bitmap) => owner.drawBackCenteredPicture(bitmap, snapshot, opacity));
    };
    base.drawBackCenteredPicture = function(bitmap, state, opacity) {
        const width = state.width || this.innerWidth;
        const selectable = this instanceof Window_Selectable;
        const height = selectable ? this.itemHeight() : this.innerHeight;
        const scale = Math.min(width / bitmap.width, height / bitmap.height, 1);
        const padding = selectable ? this.itemRectWithPadding(0).height - this.lineHeight() : 0;
        const w = bitmap.width * scale, h = bitmap.height * scale;
        this.drawBackPicture(bitmap, state.startX + Math.floor((width-w)/2), state.startY + Math.floor((height-h)/2)-padding, w, h, opacity);
    };
    const escape = base.processEscapeCharacter;
    base.processEscapeCharacter = function(code, state) {
        if (code === 'PICTURE') return this.processDrawPicture(state);
        if (code === 'CENTERPICTURE') return this.processDrawCenteredPicture(state);
        return escape.apply(this, arguments);
    };
    const drawFace = Window_Message.prototype.drawMessageFace;
    Window_Message.prototype.drawMessageFace = function(bitmap) {
        if (this._destroyed || (bitmap && bitmap !== this._faceBitmap) || (this._faceBitmap && !this._faceBitmap.isReady())) return;
        return drawFace.call(this);
    };
}
installMessageResources(messageApi.settings);

function installMessageChoices() {
    const interpreter = Game_Interpreter.prototype;
    interpreter.addContinuousShowChoices = function() {
        // Event data is shared by parallel interpreters; edits belong to this execution.
        this._list = this._list.map(command => ({...command, parameters: JSON.parse(JSON.stringify(command.parameters))}));
        const root = this._index, indent = this._indent;
        let branches = 0;
        for (let cursor = root+1; cursor < this._list.length; cursor++) {
            const command = this._list[cursor];
            if (command.indent !== indent) continue;
            if (command.code === 402) command.parameters[0] = branches++;
            if (command.code !== 404) continue;
            const next = this._list[cursor+1];
            if (next?.code !== 102 || next.indent !== indent) break;
            const target = this._list[root].parameters;
            if (next.parameters[2] >= 0) target[2] = next.parameters[2]+branches;
            if (next.parameters[1] >= 0) target[1] = next.parameters[1]+branches;
            else if (next.parameters[1] === -2) target[1] = -2;
            target[0].push(...next.parameters[0]);
            this._list.splice(cursor, 2);
            cursor--;
        }
        return this._list[root].parameters;
    };
    const setupChoices = interpreter.setupChoices;
    interpreter.setupChoices = function() {
        delete this._branch[this._indent];
        setupChoices.call(this, this.addContinuousShowChoices());
        $gameMessage.setupShuffleChoices();
    };
    const cancelBranch = interpreter.command403;
    interpreter.command403 = function(...args) {
        if (!Object.hasOwn(this._branch, this._indent)) {
            this.skipBranch();
            return true;
        }
        return cancelBranch.apply(this, args);
    };
    const message = Game_Message.prototype;
    const setChoices = message.setChoices;
    message.setChoices = function(...args) {
        this._scriptCall = true;
        this._choiceIndexArray = undefined;
        this._maxShuffleChoices = undefined;
        return setChoices.apply(this, args);
    };
    message.setupShuffleChoices = function() {
        this._scriptCall = false;
        this._choiceIndexArray = this._choices.map((_, index) => index);
        this._maxShuffleChoices = this._choices.length;
        let shuffle = false;
        this._choices = this._choices.map(text => text.replace(/<SHUFFLE(?:: (VAR )?(\d+))?>/gi, (_, variable, limit) => {
            shuffle = true;
            if (limit !== undefined) this._maxShuffleChoices = Math.min(this._maxShuffleChoices, variable ? $gameVariables.value(Number(limit)) || 1 : Number(limit));
            return '';
        }));
        if (shuffle) {
            for (let i = this._choiceIndexArray.length-1; i > 0; i--) {
                const j = Math.randomInt(i+1);
                [this._choiceIndexArray[i], this._choiceIndexArray[j]] = [this._choiceIndexArray[j], this._choiceIndexArray[i]];
            }
            if (this.choiceCancelType() !== -2) this._choiceCancelType = -1;
        }
    };
    message.choiceIndexArray = function() { if (!this._choiceIndexArray) this.setupShuffleChoices(); return this._choiceIndexArray; };
    message.maxShuffleChoices = function() { if (this._maxShuffleChoices === undefined) this.setupShuffleChoices(); return this._maxShuffleChoices; };

    const base = Window_Base.prototype;
    base.isChoiceWindow = function() { return this instanceof Window_ChoiceList || this.constructor.name === 'Window_MessageLog'; };
    base.convertShowChoiceEscapeCodes = function(text) {
        if (!this.isChoiceWindow()) return text;
        return text.replace(/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi, '')
            .replace(/<(?:SHOW|HIDE|DISABLE|ENABLE) (?:SWITCH|SWITCHES): (.*?)>/gi, '')
            .replace(/<(?:SHOW|HIDE|DISABLE|ENABLE) (?:ALL|ANY) (?:SWITCH|SWITCHES): (.*?)>/gi, '')
            .replace(/<CHOICE (?:WIDTH|INDENT): (\d+)>/gi, '')
            .replace(/<(?:BGCOLOR|BG COLOR): (.*?)>/gi, '')
            .replace(/<(?:FG|BG) ?(?:IMG|IMAGE|PIC|PICTURE): (.*?)>/gi, '')
            .replace(/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE) *(.*?): (.*?)>/gi, '');
    };
    function passesGates(text, positive, negative, switchNames) {
        if (new RegExp(`<${negative}>`, 'i').test(text)) return false;
        if (new RegExp(`<${positive}>`, 'i').test(text)) return true;
        for (const [word, any, rejectOn] of [[positive,false,false],[positive,true,false],[negative,false,true],[negative,true,true]]) {
            const match = text.match(new RegExp(`<${word} ${any ? 'ANY ' : '(?:ALL )?'}(?:${switchNames}): (.*?)>`, 'i'));
            if (!match) continue;
            const states = match[1].split(',').map(id => $gameSwitches.value(Number(id) || 0));
            const enabled = any ? states.some(Boolean) : states.every(Boolean);
            if (enabled === rejectOn) return false;
        }
        return true;
    }
    const window = Window_ChoiceList.prototype;
    window.isChoiceVisible = function(text) { return passesGates(text, 'SHOW', 'HIDE', 'SW|SWITCH|SWITCHES'); };
    window.isChoiceEnabled = function(text) { return passesGates(text, 'ENABLE', 'DISABLE', 'SWITCH|SWITCHES'); };
    window.convertChoiceMacros = function(text) { return this.convertTextMacros(text); };
    window.parseChoiceText = function(text) { return text.replace(/<(?:BR|LINEBREAK)>/gi, '\n').replace(/<LINE\x1bWrapBreak[0]BREAK>/gi, '\n'); };
    window.makeCommandListScriptCall = function() {
        $gameMessage.choices().forEach((raw, index) => {
            const text = this.convertChoiceMacros(raw);
            if (this.isChoiceVisible(text)) this.addCommand(this.parseChoiceText(text), 'choice', this.isChoiceEnabled(text), index);
        });
    };
    window.makeCommandListShuffle = function() {
        const indices = $gameMessage.choiceIndexArray();
        const limit = $gameMessage.maxShuffleChoices();
        for (const index of indices) {
            if (this._list.length >= limit) break;
            const raw = $gameMessage.choices()[index];
            if (raw === undefined) continue;
            const text = this.convertChoiceMacros(raw);
            if (this.isChoiceVisible(text)) this.addCommand(this.parseChoiceText(text), 'choice', this.isChoiceEnabled(text), index);
        }
    };
    window.clearChoiceHelpDescriptions = function() {
        this._choiceHelpDescriptions = {};
        if (this._helpWindow) { this._helpWindow.clear(); this._helpWindow.hide(); }
    };
    window.applyChoiceHelpDescriptions = function() {
        const pattern = /<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;
        this._list.forEach((item, index) => {
            const match = item.name.match(pattern);
            this._choiceHelpDescriptions[index] = match ? match[1].trim() : '';
            if (match) item.name = item.name.replace(pattern, '').trim();
        });
    };
    window.makeCommandList = function() {
        if ($gameMessage._scriptCall) this.makeCommandListScriptCall();
        else this.makeCommandListShuffle();
        this.clearChoiceHelpDescriptions();
        this.applyChoiceHelpDescriptions();
    };
    window.updateHelp = function() {
        if (!this._helpWindow) return;
        const description = this._choiceHelpDescriptions?.[this.index()] || '';
        this._helpWindow.setText(description);
        if (description) this._helpWindow.show();
        else this._helpWindow.hide();
    };
    window.processFailsafeChoice = function() {
        if (this._list.some(item => item.enabled)) return;
        this.deactivate(); this.close(); $gameMessage._choices = [];
        if (this._messageWindow.isOpen()) this._messageWindow.startPause();
    };
    window.start = function() { this.refresh(); this.selectDefault(); this.open(); this.activate(); this.processFailsafeChoice(); };
    window.selectDefault = function() {
        const original = $gameMessage.choiceDefaultType();
        const visible = this._list.findIndex(item => item.ext === original);
        this.select(original < 0 ? -1 : visible >= 0 ? visible : this._list.findIndex(item => item.enabled));
    };
    window.callOkHandler = function() {
        $gameMessage.onChoice(this.currentExt());
        this._messageWindow.terminateMessage();
        this.close();
        this._helpWindow?.clear();
    };
    const cancel = window.callCancelHandler;
    window.callCancelHandler = function() {
        const result = cancel.apply(this, arguments);
        this._helpWindow?.clear();
        return result;
    };
    const close = window.close;
    window.close = function(...args) { this._helpWindow?.hide(); return close.apply(this, args); };
    window.itemHeight = function() { return $gameSystem.getChoiceListLineHeight()+8; };
    window.maxCols = function() { return $gameSystem.getChoiceListMaxColumns(); };
    window.maxLines = function() {
        const y = this._messageWindow?.y || 0, height = this._messageWindow?.height || 0;
        return y < Graphics.boxHeight/2 && y+height > Graphics.boxHeight/2 ? 4 : $gameSystem.getChoiceListMaxRows();
    };
    window.numVisibleRows = function() {
        let count = $gameMessage.choices().filter(text => this.isChoiceVisible(this.convertChoiceMacros(text))).length;
        if (!$gameMessage._scriptCall) count = Math.min(count, $gameMessage.maxShuffleChoices());
        return Math.max(1, Math.min(Math.ceil(count/this.maxCols()), this.maxLines()));
    };
    window.getStartingChoiceWidth = function() {
        let width = $gameSystem.getChoiceListMinChoiceWidth();
        for (const text of $gameMessage.choices()) for (const match of text.matchAll(/<CHOICE WIDTH: (\d+)>/gi)) width = Math.max(width, Number(match[1]));
        return Math.max(1, width);
    };
    window.getChoiceIndent = function(text) { return Number([...text.matchAll(/<(?:CHOICE|CHOICE |)INDENT: (\d+)>/gi)].at(-1)?.[1]) || 0; };
    window.maxChoiceWidth = function() {
        return this._list.reduce((width, item) => Math.max(width, Math.ceil(this.textSizeEx(item.name).width+this.getChoiceIndent(item.name))+this.itemPadding()*2), this.getStartingChoiceWidth());
    };
    const nativeWindowX = window.windowX;
    window.windowX = function() {
        return this._messageWindow ? this.messageCoreWindowX() : nativeWindowX.call(this);
    };
    window.messageCoreWindowX = function() {
        const position = $gameMessage.choicePositionType();
        if (position === 1) return (Graphics.boxWidth-this.windowWidth())/2;
        return this._messageWindow.x + (position === 2 ? this._messageWindow.width-this.windowWidth() : 0);
    };
    window.windowWidth = function() { return Math.min((this.maxChoiceWidth()+this.colSpacing())*this.maxCols()+this.padding*2, Graphics.width); };
    window.choiceAlignText = function() { const align = $gameSystem.getChoiceListTextAlign(); return align === 'default' ? '' : `<${align}>`; };
    window.drawItemContents = function(index) {
        const rect = this.itemRectWithPadding(index), text = this.choiceAlignText()+this.commandName(index);
        this.changePaintOpacity(this.isCommandEnabled(index));
        const height = this.textSizeEx(text).height;
        this.drawTextEx(text, rect.x+this.getChoiceIndent(text), Math.max(rect.y, rect.y+Math.round((rect.height-height)/2)), rect.width);
    };
    window.drawItem = function(index) { this.drawItemContents(index); };
    window.addChoiceDistance = function() {
        const distance = $gameSystem.getChoiceMessageDistance() || 0, message = this._messageWindow;
        const name = message._nameBoxWindow;
        const nameHeight = name && name.openness > 0 && name.width > 0 ? name.height : 0;
        if (distance < 0 && (message.isClosed() || message.isClosing())) this.y = Math.round((Graphics.boxHeight-this.height)/2);
        else if (message.y >= Graphics.boxHeight/2) this.y = distance >= 0 ? this.y-distance : Math.floor((message.y-this.height-nameHeight)/2);
        else if (distance >= 0) this.y += distance;
        else this.y += Math.floor((Graphics.boxHeight-message.y-message.height-nameHeight-this.height)/2)+nameHeight;
    };
    const placement = window.updatePlacement;
    window.updatePlacement = function() { placement.call(this); this.addChoiceDistance(); this.clampPlacementPosition(); };
    window.refresh = function() {
        this.clearCommandList(); this.makeCommandList();
        if (this._messageWindow) { this.updatePlacement(); this.placeCancelButton(); }
        this.createContents(); this.updateBackground(); this.refreshDimmerBitmap();
        Window_Selectable.prototype.refresh.call(this);
    };
    const scene = Scene_Message.prototype;
    scene.choiceListHelpWindowRect = function() { return new Rectangle(0, 0, Graphics.boxWidth, this.calcWindowHeight(2, false)); };
    scene.createChoiceListHelpWindow = function() {
        const help = new Window_Help(this.choiceListHelpWindowRect());
        help.hide(); this._choiceListWindow.setHelpWindow(help); this._messageWindow.setChoiceListHelpWindow(help);
        this.addWindow(help); this._choiceListHelpWindow = help;
    };
    Window_Message.prototype.setChoiceListHelpWindow = function(help) { this._choiceListHelpWindow = help; };
    const create = scene.createAllWindows;
    scene.createAllWindows = function(...args) { create.apply(this, args); this.createChoiceListHelpWindow(); };
    messageApi.registerCommand('ChoiceWindowDistance', function(args) { $gameSystem.setChoiceMessageDistance(args.Distance); });
    messageApi.registerCommand('ChoiceWindowProperties', function(args) {
        for (const [field, suffix] of [['LineHeight','LineHeight'],['MaxRows','MaxRows'],['MaxCols','MaxColumns']]) {
            if (args[field] > 0) $gameSystem[`setChoiceList${suffix}`](args[field]);
        }
        $gameSystem.setChoiceListMinChoiceWidth(args.MinWidth);
        $gameSystem.setChoiceListTextAlign(args.TextAlign);
    });
}
installMessageChoices();

function installChoiceImages() {
    const window = Window_ChoiceList.prototype;
    const colors = {red:'#f26c4f',orange:'#fbaf5d',yellow:'#fff799',green:'#7cc576',blue:'#6dcff6',purple:'#a186be',violet:'#a186be',brown:'#c69c6d',pink:'#ffc8e0',white:'#ffffff',gray:'#acacac',grey:'#acacac',black:'#707070'};
    window.drawCustomBackgroundColor = function(rect, color1, color2, single) {
        const border = ColorManager.itemBackColor1();
        color1 ??= border; color2 ??= color1;
        this.contentsBack.gradientFillRect(rect.x,rect.y,rect.width,rect.height,color1,color2,true);
        if (single) this.contentsBack.gradientFillRect(rect.x,rect.y,rect.width,rect.height,border,color2,true);
        this.contentsBack.strokeRect(rect.x,rect.y,rect.width,rect.height,border);
    };
    window.changeChoiceBackgroundColor = function(index) {
        const text = this.commandName(index);
        const gradients = [...text.matchAll(/<(?:BGCOLOR|BG COLOR): (.*?),(.*?)>/gi)];
        const singles = [...text.matchAll(/<(?:BGCOLOR|BG COLOR): (.*?)>/gi)];
        if (!gradients.length && !singles.length) return;
        let first, second;
        if (gradients.length) {
            const match = gradients.at(-1);
            first = ColorManager.getColor(match[1]).trim(); second = ColorManager.getColor(match[2]).trim();
        } else {
            const name = singles.at(-1)[1].toLowerCase().trim();
            const dynamic = {yes:'powerUpColor',no:'powerDownColor',system:'systemColor',crisis:'crisisColor'}[name];
            first = second = colors[name] ?? (dynamic ? ColorManager[dynamic]() : ColorManager.getColor(name));
        }
        const rect = this.itemRect(index);
        this.contentsBack.clearRect(rect.x,rect.y,rect.width,rect.height);
        this.drawCustomBackgroundColor(rect,first,second,!gradients.length);
    };
    function imageTag(text, layer) {
        const plain = text.match(new RegExp(`<${layer} ?(?:IMG|IMAGE|PIC|PICTURE): (.*?)>`, 'i'));
        if (plain) return {name:plain[1].trim(),position:''};
        const anchored = text.match(new RegExp(`<${layer} ?(?:PICTURE|IMAGE|IMG|PIC) *(.*?): (.*?)>`, 'i'));
        return anchored ? {name:anchored[2].trim(),position:anchored[1].trim().toLowerCase()} : null;
    }
    const anchors = [[],['lowerleft','lower-left','lower left','downleft','down-left','down left'],
        ['lowercenter','lower-center','lower center','downcenter','down-center','down center','down'],
        ['lowerright','lower-right','lower right','downright','down-right','down right'],
        ['midleft','middleleft','left'],['midcenter','middlecenter','center','centered'],['midright','middleright','right'],
        ['upperleft','upper-left','upper left','upleft','up-left','up left'],
        ['uppercenter','upper-center','upper center','upcenter','up-center','up center','up'],
        ['upperright','upper-right','upper right','upright','up-right','up right']];
    window.requestChoiceForegroundImage = function(index) { return imageTag(this.choiceAlignText()+this.commandName(index),'FG')?.name || ''; };
    window.requestChoiceBackgroundImage = function(index, text, rect) {
        const tag = imageTag(text,'BG');
        if (tag?.name) this.withMessagePicture(tag.name, (owner,bitmap) => owner.drawChoiceLocationImage(index,false,text,rect,bitmap));
    };
    window.drawChoiceLocationImage = function(index, foreground, text, snapshot, bitmap) {
        if (this._destroyed || this.choiceAlignText()+this.commandName(index) !== text) return;
        const current = this.itemRectWithPadding(index);
        if (['x','y','width','height'].some(key => snapshot[key] !== current[key])) return;
        const tag = imageTag(text,foreground?'FG':'BG');
        // The reference gives an unpositioned BG precedence over a positioned FG.
        const position = foreground && /<BG ?(?:IMG|IMAGE|PIC|PICTURE): (.*?)>/i.test(text) ? '' : tag?.position || '';
        const anchor = anchors.findIndex((names,index) => index > 0 && (names.includes(position) || String(index) === position));
        const rect = this.itemRect(index), contents = foreground ? this.contents : this.contentsBack;
        if (!foreground) contents.clearRect(rect.x-1,rect.y-1,rect.width+2,rect.height+2);
        let x=rect.x+2,y=rect.y+2,width=rect.width-4,height=rect.height-4;
        if (anchor > 0) {
            const scale = Math.min(width/bitmap.width,height/bitmap.height,foreground?1:Infinity);
            const w=Math.round(bitmap.width*scale),h=Math.round(bitmap.height*scale);
            const column=(anchor-1)%3,row=Math.floor((anchor-1)/3);
            x += column===1?Math.round((width-w)/2):column===2?width-w:0;
            y += row===1?Math.round((height-h)/2):row===0?height-h:0;
            width=w;height=h;
        }
        contents.blt(bitmap,0,0,bitmap.width,bitmap.height,x,y,width,height);
        if (foreground) this.drawItemContents(index);
    };
    const drawContents = window.drawItemContents;
    window.drawItemContents = function(index) {
        drawContents.call(this,index);
        this.changeChoiceBackgroundColor(index);
        this.requestChoiceBackgroundImage(index,this.choiceAlignText()+this.commandName(index),this.itemRectWithPadding(index));
    };
    window.drawItem = function(index) {
        const name = this.requestChoiceForegroundImage(index);
        if (!name) return this.drawItemContents(index);
        const text = this.choiceAlignText()+this.commandName(index),rect=this.itemRectWithPadding(index);
        this.withMessagePicture(name,(owner,bitmap)=>owner.drawChoiceLocationImage(index,true,text,rect,bitmap));
    };
}
installChoiceImages();

function installMessageSelectors() {
    const message = Game_Message.prototype;
    message.setWeaponChoice = function(variableId, typeId) {
        this._itemChoiceVariableId=variableId;this._itemChoiceItypeId='weapon';
        this._itemChoiceWtypeId=typeId;this._itemChoiceEtypeId=0;
    };
    message.setArmorChoice = function(variableId, typeId, equipId) {
        this._itemChoiceVariableId=variableId;this._itemChoiceItypeId='armor';
        this._itemChoiceAtypeId=typeId;this._itemChoiceEtypeId=equipId;
    };
    message.setSkillChoice = function(variableId, actorId, typeId) {
        this._itemChoiceVariableId=variableId;this._itemChoiceItypeId='skill';
        this._itemChoiceActorId=actorId;this._itemChoiceStypeId=typeId;
    };
    for (const suffix of ['WtypeId','AtypeId','EtypeId','ActorId','StypeId']) {
        message[`itemChoice${suffix}`] = function() { return this[`_itemChoice${suffix}`] || 0; };
    }
    message.itemChoiceActor = function() { return $gameActors.actor(this.itemChoiceActorId()) || $gameParty.leader() || null; };
    const handlers = {
        SelectWeapon(args) { $gameMessage.setWeaponChoice(args.VariableID,args.WeaponTypeID); },
        SelectArmor(args) { $gameMessage.setArmorChoice(args.VariableID,args.ArmorTypeID,args.EquipTypeID); },
        SelectSkill(args) { $gameMessage.setSkillChoice(args.VariableID,args.ActorID,args.SkillTypeID); }
    };
    for (const [name, handler] of Object.entries(handlers)) {
        messageApi.registerCommand(name, function(args) { handler(args); this.setWaitMode('message'); });
    }
    const interpreter = Game_Interpreter.prototype;
    interpreter.prepareShowTextFollowups = function() {
        const setup = {102:'setupChoices',103:'setupNumInput',104:'setupItemChoice'}[this.nextEventCode()];
        if (setup) { this._index++; this[setup](this.currentCommand().parameters); return; }
        if (this.nextEventCode() !== 357) return;
        const [provider,name,,raw] = this._list[this._index+1].parameters;
        if (![catalog.pluginId,catalog.reference.pluginId].includes(provider) || !handlers[name]) return;
        if (name === 'SelectSkill' && !Imported.VisuMZ_1_SkillsStatesCore) return;
        const schema = catalog.commands.find(command => command.key === name);
        const args = resolveMessageSettings(schema.args,raw,this);
        this._index++;
        handlers[name](args);
    };
    const window = Window_EventItem.prototype;
    const includes = window.includes;
    window.includes = function(item) {
        const kind = $gameMessage.itemChoiceItypeId();
        if (kind === 'weapon') return DataManager.isWeapon(item) && (!$gameMessage.itemChoiceWtypeId() || item.wtypeId === $gameMessage.itemChoiceWtypeId());
        if (kind === 'armor') return DataManager.isArmor(item) && (!$gameMessage.itemChoiceAtypeId() || item.atypeId === $gameMessage.itemChoiceAtypeId()) && (!$gameMessage.itemChoiceEtypeId() || item.etypeId === $gameMessage.itemChoiceEtypeId());
        if (kind === 'skill') {
            if (!DataManager.isSkill(item) || !Imported.VisuMZ_1_SkillsStatesCore) return false;
            const actor = $gameMessage.itemChoiceActor();
            return !!actor && !actor.isSkillHidden(item) && actor.isSkillTypeMatchForUse(item) && (!$gameMessage.itemChoiceStypeId() || DataManager.getSkillTypes(item).includes($gameMessage.itemChoiceStypeId()));
        }
        return includes.call(this,item);
    };
    window.makeSkillList = function() {
        this._data = ($gameMessage.itemChoiceActor()?.skills() || []).filter(item => this.includes(item));
        if (this.includes(null)) this._data.push(null);
    };
    window.makeItemList = function() {
        if ($gameMessage.itemChoiceItypeId() === 'skill' && Imported.VisuMZ_1_SkillsStatesCore) this.makeSkillList();
        else Window_ItemList.prototype.makeItemList.call(this);
    };
    const drawNumber = Window_ItemList.prototype.drawItemNumber;
    Window_ItemList.prototype.drawItemNumber = function(item,x,y,width) {
        if ($gameMessage.itemChoiceItypeId() === 'skill') this.drawSkillCost($gameMessage.itemChoiceActor(),item,x,y,width);
        else drawNumber.apply(this,arguments);
    };
}
installMessageSelectors();

function installPictureText() {
    const zones = ['upperleft','up','upperright','left','center','right','lowerleft','down','lowerright'];
    const screen = Game_Screen.prototype;
    screen.clearAllPictureTexts = function() { this._pictureText=[];this._pictureTextBuffer=[];this._pictureTextRefresh=[]; };
    const clear = screen.clearPictures;
    screen.clearPictures = function(...args) { const result=clear.apply(this,args);this.clearAllPictureTexts();return result; };
    screen.getPictureTextData = function(id) {
        this._pictureText ??= [];this._pictureTextBuffer ??= [];this._pictureTextRefresh ??= [];
        return this._pictureText[this.realPictureId(id)] ??= {};
    };
    screen.getPictureText = function(id,position) { return this.getPictureTextData(id)[position.trim().toLowerCase()] || ''; };
    screen.setPictureText = function(id,text,position) {
        this.getPictureTextData(id)[position.trim().toLowerCase()] = text || '';
        this.requestPictureTextRefresh(id);
    };
    screen.eraseAllPictureTexts = function(id) { this.getPictureTextData(id);this._pictureText[this.realPictureId(id)]=null;this.requestPictureTextRefresh(id); };
    screen.getPictureTextBuffer = function(id) { this.getPictureTextData(id);return this._pictureTextBuffer[this.realPictureId(id)] || 0; };
    screen.setPictureTextBuffer = function(id,padding) { this.getPictureTextData(id);this._pictureTextBuffer[this.realPictureId(id)]=Math.max(0,padding); };
    screen.erasePictureTextBuffer = function(id) { this.getPictureTextData(id);this._pictureTextBuffer[this.realPictureId(id)]=0; };
    screen.requestPictureTextRefresh = function(id) { this.getPictureTextData(id);this._pictureTextRefresh.push(this.realPictureId(id)); };
    screen.requestPictureTextRefreshAll = function() {
        this._pictureText ??= [];this._pictureTextBuffer ??= [];this._pictureTextRefresh ??= [];
        // _pictures already uses real IDs; applying realPictureId again crosses battle slots.
        this._pictures.forEach((picture,id)=>{if(picture)this._pictureTextRefresh.push(id);});
    };
    screen.needsPictureTextRefresh = function(id) { this.getPictureTextData(id);return this._pictureTextRefresh.includes(this.realPictureId(id)); };
    screen.clearPictureTextRefresh = function(id) { this.getPictureTextData(id);const real=this.realPictureId(id);this._pictureTextRefresh=this._pictureTextRefresh.filter(value=>value!==real); };
    screen.hasPictureText = function(id) { return zones.some(zone=>!!this.getPictureText(id,zone)); };
    const erase = screen.erasePicture;
    screen.erasePicture = function(id) { erase.call(this,id);this.eraseAllPictureTexts(id);this.erasePictureTextBuffer(id);this.clearPictureTextRefresh(id); };
    const clearBattle = screen.eraseBattlePictures;
    screen.eraseBattlePictures = function() {
        clearBattle.call(this);
        if (!this._pictureText) return;
        const start=this.maxPictures()+1;
        this._pictureText.length=Math.min(this._pictureText.length,start);
        this._pictureTextBuffer.length=Math.min(this._pictureTextBuffer.length,start);
        this._pictureTextRefresh=this._pictureTextRefresh.filter(id=>id<start);
    };
    const refreshMap = Game_Map.prototype.refresh;
    Game_Map.prototype.refresh = function(...args) { const result=refreshMap.apply(this,args);$gameScreen.requestPictureTextRefreshAll();return result; };
    const sprite = Sprite_Picture.prototype;
    sprite.createPictureText = function() {
        if (this._pictureTextWindow) return;
        this._pictureTextWindow=new Window_Base(new Rectangle(0,0,0,0));
        this._pictureTextWindow.padding=0;
        this._pictureTextSprite=new Sprite();this.addChildAt(this._pictureTextSprite,0);
        this._pictureTextWidth=0;this._pictureTextHeight=0;this._pictureTextCache={};
    };
    sprite.resizePictureText = function() {
        if (this._pictureTextWidth===this.width && this._pictureTextHeight===this.height) return;
        this._pictureTextWidth=this.width;this._pictureTextHeight=this.height;this._pictureTextCache={};
        this._pictureTextWindow.move(0,0,this.width,this.height);
    };
    sprite.anchorPictureText = function() { this._pictureTextSprite.anchor.copyFrom(this.anchor); };
    sprite.anyPictureTextChanges = function() { return $gameScreen.needsPictureTextRefresh(this._pictureId) || zones.some(zone=>this._pictureTextCache[zone]!==$gameScreen.getPictureText(this._pictureId,zone)); };
    sprite.drawPictureTextZone = function(zone) {
        const text=$gameScreen.getPictureText(this._pictureId,zone),window=this._pictureTextWindow;
        this._pictureTextCache[zone]=text;
        const size=window.textSizeEx(text),padding=$gameScreen.getPictureTextBuffer(this._pictureId);
        const index=zones.indexOf(zone),column=index%3,row=Math.floor(index/3);
        const x=column===1?Math.floor((this.width-size.width)/2):column===2?Math.floor(this.width-size.width-padding):padding;
        const y=row===1?Math.floor((this.height-size.height)/2):row===2?Math.floor(this.height-size.height-padding):padding;
        window.drawTextEx(text,x,y);
    };
    sprite.drawPictureText = function() {
        if (!this.anyPictureTextChanges()) return;
        this._pictureTextWindow.createContents();
        zones.forEach(zone=>this.drawPictureTextZone(zone));
        $gameScreen.clearPictureTextRefresh(this._pictureId);
    };
    sprite.attachPictureText = function() { this._pictureTextSprite.bitmap=this._pictureTextWindow.contents; };
    sprite.updatePictureText = function() {
        if (!this.visible) return;
        this.resizePictureText();this.anchorPictureText();this.drawPictureText();this.attachPictureText();
    };
    const updateBitmap=sprite.updateBitmap;
    sprite.updateBitmap=function() { updateBitmap.call(this);this.createPictureText(); };
    const update=sprite.update;
    sprite.update=function() { update.call(this);this.updatePictureText(); };
    messageApi.registerCommand('PictureTextChange',function(args) {
        for (const id of args.PictureIDs) {
            $gameScreen.setPictureTextBuffer(id,args.Padding);
            for (const zone of zones) $gameScreen.setPictureText(id,args[zone],zone);
        }
    });
    messageApi.registerCommand('PictureTextErase',function(args) { for(const id of args.PictureIDs){$gameScreen.eraseAllPictureTexts(id);$gameScreen.erasePictureTextBuffer(id);} });
    messageApi.registerCommand('PictureTextRefresh',function() { $gameScreen.requestPictureTextRefreshAll(); });
}
installPictureText();

function installMessageOptions(settings) {
    const speed=settings.TextSpeed,locale=settings.Localization;
    ConfigManager.textSpeed=speed.Default;
    ConfigManager.textLocale=locale.DefaultLocale || 'English';
    TextManager.messageCoreTextSpeed=speed.Name;
    TextManager.messageCoreLocalization=locale.Name;
    TextManager.getLanguageName=function(language) { return locale[language] || ''; };
    TextManager.getCurrentLanguage=function() { return this.getLanguageName(ConfigManager.textLocale || 'English'); };
    TextManager.getLanguageAt=function(offset) { return this.getLanguageName(locale.Languages[locale.Languages.indexOf(ConfigManager.textLocale || 'English')+offset] || ''); };
    ConfigManager.readTextSpeed=function(data) {
        const value=data.textSpeed;
        if (typeof value!=='number' && (typeof value!=='string' || !value.trim())) return speed.Default;
        const number=Number(value);
        return Number.isFinite(number)?number.clamp(1,11):speed.Default;
    };
    ConfigManager.readTextLocale=function(data) { return locale.Languages.includes(data.textLocale)?data.textLocale:locale.DefaultLocale; };
    const make=ConfigManager.makeData,apply=ConfigManager.applyData;
    ConfigManager.makeData=function() {
        const data=make.call(this);data.textSpeed=this.textSpeed;
        if(locale.Enable)data.textLocale=this.textLocale;
        return data;
    };
    ConfigManager.applyData=function(data) {
        apply.call(this,data);this.textSpeed=this.readTextSpeed(data);
        if(locale.Enable)this.textLocale=this.readTextLocale(data);
    };
    const window=Window_Options.prototype;
    window.addMessageCoreCommands=function() {
        if(locale.Enable && locale.AddOption && this.findSymbol('textLocale')<0)this.addCommand(TextManager.messageCoreLocalization,'textLocale');
        if(speed.AddOption && this.findSymbol('textSpeed')<0)this.addCommand(TextManager.messageCoreTextSpeed,'textSpeed');
    };
    const general=window.addGeneralOptions;
    window.addGeneralOptions=function() { general.call(this);this.addMessageCoreCommands(); };
    window.textSpeedStatusText=function() {
        const value=this.getConfigValue('textSpeed');
        return value>10?speed.Instant:value;
    };
    const status=window.statusText;
    window.statusText=function(index) {
        const symbol=this.commandSymbol(index),value=this.getConfigValue(symbol);
        if(symbol==='textLocale')return TextManager.getLanguageName(value);
        if(symbol==='textSpeed')return this.textSpeedStatusText();
        return status.call(this,index);
    };
    const isVolume=window.isVolumeSymbol,changeVolume=window.changeVolume;
    window.isVolumeSymbol=function(symbol) { return symbol==='textLocale' || symbol==='textSpeed' || isVolume.call(this,symbol); };
    window.changeTextSpeed=function(symbol,forward,wrap) {
        let value=this.getConfigValue(symbol)+(forward?1:-1);
        if(value>11 && wrap)value=1;
        this.changeValue(symbol,value.clamp(1,11));
    };
    window.changeVisuMzTextLocale=function(forward,wrap) {
        let index=locale.Languages.indexOf(this.getConfigValue('textLocale'))+(forward?1:-1);
        if(wrap)index=(index+locale.Languages.length)%locale.Languages.length;
        else index=index.clamp(0,locale.Languages.length-1);
        this.changeValue('textLocale',locale.Languages[index]);
    };
    window.changeVolume=function(symbol,forward,wrap) {
        if(symbol==='textSpeed')return this.changeTextSpeed(symbol,forward,wrap);
        if(symbol==='textLocale')return this.changeVisuMzTextLocale(forward,wrap);
        return changeVolume.apply(this,arguments);
    };
    const max=Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands=function() { return max.call(this)+(speed.AddOption && speed.AdjustRect?1:0)+(locale.Enable && locale.AddOption && locale.AdjustRect?1:0); };
}
installMessageOptions(messageApi.settings);

function installMessageLocalization(settings) {
    const locale=settings.Localization,format=locale.LangFiletype;
    const usesTable=locale.Enable && locale.Languages.length>0;
    VisuMZ.MessageCore.LocalizationType=format;
    globalThis.$dataLocalization=null;
    TextManager.isVisuMzLocalizationEnabled=function() { return locale.Enable; };
    TextManager.getLocalizedText=function(key) {
        if(!$dataLocalization)return '';
        const row=$dataLocalization[String(key).toLowerCase().trim()];
        if(!row)return undefined;
        return (row[ConfigManager.textLocale || 'English'] || 'UNDEFINED!').replace(/\\/g,'\x1b').replace(/<SEMI(?:|-COLON|COLON)>/gi,';');
    };
    TextManager.parseLocalizedText=function(text) {
        if(!usesTable)return text;
        text=String(text ?? '');
        for(const pattern of [/\$[\[<{](.*?)[\]>}]/gi,
            /\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)[\[<{](.*?)[\]>}]/gi,
            /\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)[\[<{](.*?)[\]>}]/gi]) {
            text=text.replace(pattern,(_,key)=>this.getLocalizedText(key));
        }
        return text;
    };
    const macros=Window_Base.prototype.convertTextMacros;
    Window_Base.prototype.convertTextMacros=function(text) { return TextManager.parseLocalizedText(macros.call(this,text)); };
    const pre=Window_Base.prototype.preConvertEscapeCharacters;
    Window_Base.prototype.preConvertEscapeCharacters=function(text) { return pre.call(this,TextManager.parseLocalizedText(text)); };
    const formatString=String.prototype.format;
    String.prototype.format=function(...args) { return formatString.apply(TextManager.parseLocalizedText(String(this)),args); };
    for(const method of ['drawText','drawTextTopAligned','measureTextWidth']) {
        const previous=Bitmap.prototype[method];
        Bitmap.prototype[method]=function(text,...args) { return previous.call(this,TextManager.parseLocalizedText(text),...args); };
    }
    function implicit(text) {
        if(!locale.Enable || !$dataLocalization || typeof text!=='string' || !$dataLocalization[text.toLowerCase().trim()])return text;
        return TextManager.getLocalizedText(text);
    }
    const addCommand=Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand=function(name,...args) { return addCommand.call(this,implicit(name),...args); };
    const slot=Window_StatusBase.prototype.actorSlotName;
    Window_StatusBase.prototype.actorSlotName=function(...args) { return implicit(slot.apply(this,args)); };
    const font=Game_System.prototype.mainFontFace;
    Game_System.prototype.mainFontFace=function() {
        if(!locale.Enable || ConfigManager.textFont)return font.call(this);
        return `${settings.LanguageFonts[ConfigManager.textLocale] || 'rmmz-mainfont'}, ${$dataSystem.advanced.fallbackFonts}`;
    };
    const bitmap=ImageManager.loadBitmap;
    ImageManager.loadBitmap=function(folder,name) {
        if(locale.Enable && (settings.LanguageImages.ConvertDefault || ConfigManager.textLocale!==locale.DefaultLocale))name=name.replace(/\[XX\]/g,settings.LanguageImages[ConfigManager.textLocale] || '[XX]');
        return bitmap.call(this,folder,name);
    };
    messageApi.refreshLocalizedScene = function() {
        if (!locale.Enable) return;
        $gameScreen?.requestPictureTextRefreshAll();
        const layer = SceneManager._scene?._windowLayer;
        for (const window of layer?.children ?? []) {
            window.clearMessageResourceRequests?.();
            if (typeof window.refresh === 'function') window.refresh();
        }
    };
    const changeOption = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        const previous = ConfigManager.textLocale;
        const result = changeOption.call(this, symbol, value);
        if (symbol === 'textLocale' && previous !== ConfigManager.textLocale) messageApi.refreshLocalizedScene();
        return result;
    };
    const pictureBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        const previousName = this._pictureName;
        pictureBitmap.call(this);
        if (locale.Enable && this._messagePictureLocale !== ConfigManager.textLocale) {
            this._messagePictureLocale = ConfigManager.textLocale;
            if (this._pictureName && this._pictureName === previousName && this._pictureName.includes('[XX]')) this.loadBitmap();
        }
    };
    DataManager.loadLocalization=function() {
        if(!usesTable)return;
        const filename=locale[format==='csv'?'CsvFilename':'TsvFilename'];
        if(!isLanguageBasename(filename, format)) {
            throw new CoreError('MESSAGE_LANGUAGE_FILENAME','Use a language basename in the project root.',{filename});
        }
        const previous=this._messageLanguageLoad;
        if(previous?.status==='pending')previous.xhr.abort();
        const xhr=new XMLHttpRequest();
        const request={status:'pending',filename,xhr};
        this._messageLanguageLoad=request;
        globalThis.$dataLocalization=null;
        const fail=reason=>{if(this._messageLanguageLoad===request){request.status='error';request.reason=reason;}};
        xhr.open('GET',filename);
        xhr.overrideMimeType('text/plain');
        xhr.timeout=30000;
        xhr.onload=()=>{
            if(this._messageLanguageLoad!==request)return;
            if(xhr.status<200 || xhr.status>=400)return fail(`HTTP ${xhr.status}`);
            try {
                const rows=parseLanguageTable(xhr.responseText,format),header=rows[0],table=Object.create(null);
                for(const row of rows.slice(1))table[row[0].toLowerCase().trim()]=Object.fromEntries(header.slice(1).map((name,index)=>[name.trim(),row[index+1]]));
                globalThis.$dataLocalization=table;
                request.status='ready';
            } catch(error) { fail(`${error.code || error.name}: ${error.message}`); }
        };
        xhr.onerror=()=>fail('Network error');
        xhr.ontimeout=()=>fail('Timeout after 30000ms');
        xhr.send();
    };
    const load=DataManager.loadDatabase;
    DataManager.loadDatabase=function(...args) { load.apply(this,args);this.loadLocalization(); };
    const ready=DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded=function() {
        const loaded=ready.call(this);
        if(!usesTable)return loaded;
        const request=this._messageLanguageLoad;
        if(request?.status==='error')throw ['LoadError',`${request.filename}: ${request.reason}`,()=>this.loadLocalization()];
        return loaded && request?.status==='ready';
    };
}
installMessageLocalization(messageApi.settings);

function installMessageFlushHooks() {
    // These are the public extension points chained by the unchanged consumers.
    Window_Message.prototype.preFlushTextState = function(textState) {};
    Window_Message.prototype.postFlushTextState = function(textState) {};
    Window_Message.prototype.flushTextState = function(textState) {
        this.preFlushTextState(textState);
        Window_Base.prototype.flushTextState.call(this,textState);
        this.postFlushTextState(textState);
    };
    let installed = false;
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this,args);
        if (installed || !Imported.VisuMZ_2_AniMsgTextEffects) return result;
        installed = true;
        const clear = Window_Message.prototype.clearTextEffects;
        Window_Message.prototype.clearTextEffects = function() {
            const children = [...(this._AniMsgTextEffectsContainer?.children || [])];
            clear.call(this);
            for (const sprite of children) {
                const ownBitmap = sprite._textState.iconIndex === undefined ? sprite.bitmap : null;
                if (!sprite._destroyed) sprite.destroy();
                if (ownBitmap) ownBitmap.destroy();
                sprite._msgWindow = null;
            }
        };
        const destroy = Window_Message.prototype.destroy;
        Window_Message.prototype.destroy = function(...args) {
            this.clearTextEffects();
            return destroy.apply(this,args);
        };
        return result;
    };
}
installMessageFlushHooks();

function installExtendedMessageCursorOwnership() {
    let installed = false;
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this, args);
        if (installed || !Imported.VisuMZ_2_ExtMessageFunc) return result;
        installed = true;
        const move = Window_Message.prototype.moveCustomMessageCursorPauseSign;
        Window_Message.prototype.moveCustomMessageCursorPauseSign = function(state) {
            if (state?.drawing) {
                this._messageCursorTextPosition = {x: state.x, y: state.y, height: state.height, drawing: true};
            }
            return move.call(this, state);
        };
        const newPage = Window_Message.prototype.newPage;
        Window_Message.prototype.newPage = function(state) {
            this._messageCursorTextPosition = null;
            return newPage.call(this, state);
        };
        const create = Window_Message.prototype._createPauseSignSprites;
        Window_Message.prototype._createPauseSignSprites = function() {
            const previous = this._pauseSignSprite;
            const result = create.apply(this, arguments);
            this._messageCursorNeedsPosition = true;
            // WORKAROUND: Ext 1.22 retains the custom sprite when switching to native; see MC-QA-023.
            if (previous && previous !== this._pauseSignSprite) {
                if (previous.parent === this) this.removeChild(previous);
                previous.destroy();
            }
            return result;
        };
        const update = Window_Message.prototype._updatePauseSign;
        Window_Message.prototype._updatePauseSign = function() {
            const result = update.apply(this, arguments);
            if (this._messageCursorNeedsPosition && this._messageCursorTextPosition &&
                this.isCustomMessageCursorEnabled() && this._pauseSignSprite.bitmap.width > 0) {
                move.call(this, this._messageCursorTextPosition);
                this._messageCursorNeedsPosition = false;
            }
            return result;
        };
        return result;
    };
}
installExtendedMessageCursorOwnership();

function installMessageLogViewport() {
    let installed = false;
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this, args);
        if (installed || !Imported.VisuMZ_3_MessageLog) return result;
        installed = true;
        const prototype = Window_MessageLog.prototype;
        const calculateHeight = prototype.calculateTextHeight;
        prototype.calculateTextHeight = function() {
            calculateHeight.call(this);
            const gl = Graphics.app?.renderer?.gl;
            this._messageLogViewportEntries = null;
            if (!gl || this._allTextHeight <= gl.getParameter(gl.MAX_TEXTURE_SIZE)) return;
            let top = this.lineHeight();
            this._messageLogViewportEntries = $gameSystem.getLoggedMessages().filter(Boolean).map(entry => {
                const speakerHeight = entry.speaker ? this.textSizeEx(entry.speaker).height : 0;
                const faceHeight = entry.faceName && Window_MessageLog.SHOW_FACES ? ImageManager.faceHeight : 0;
                const height = speakerHeight + Math.max(faceHeight, this.textSizeEx(entry.messageBody).height) + this.lineHeight();
                const layout = {entry, top, bottom: top + height};
                top += height;
                return layout;
            });
        };
        const contentsHeight = prototype.contentsHeight;
        prototype.contentsHeight = function() {
            return this._messageLogViewportEntries ? this.innerHeight : contentsHeight.call(this);
        };
        const drawAllText = prototype.drawAllText;
        prototype.drawAllText = function() {
            if (!this._messageLogViewportEntries) return drawAllText.call(this);
            this.scrollToBottom();
            this.drawMessageLogViewport();
        };
        prototype.drawMessageLogViewport = function() {
            this.contents.clear();
            this.contentsBack.clear();
            this.removeAllReplayVoiceSprites();
            const top = this.origin.y;
            const bottom = top + this.innerHeight;
            this._lineY = -top;
            this.drawHorzLine();
            for (const layout of this._messageLogViewportEntries) {
                if (layout.bottom < top) continue;
                if (layout.top > bottom) break;
                this._lineY = layout.top - top;
                this.resetFontSettings();
                this.drawMessageText(layout.entry);
                this.resetWordWrap();
            }
            this._messageLogViewportOrigin = top;
        };
        const update = prototype.update;
        prototype.update = function() {
            update.call(this);
            if (this._messageLogViewportEntries && this._messageLogViewportOrigin !== this.origin.y) this.drawMessageLogViewport();
        };
        const clientArea = prototype._updateClientArea;
        prototype._updateClientArea = function() {
            clientArea.call(this);
            // Scroll remains in history coordinates; the bitmap contains only the viewport.
            const top = this._messageLogViewportEntries ? this.origin.y : 0;
            this._contentsSprite.y = top;
            this._contentsBackSprite.y = top;
        };
        const addReplayVoiceSprite = prototype.addReplayVoiceSprite;
        prototype.addReplayVoiceSprite = function(entry, x, y) {
            return addReplayVoiceSprite.call(this, entry, x, y + (this._messageLogViewportEntries ? this.origin.y : 0));
        };
        return result;
    };
}
installMessageLogViewport();

function installStateTooltipOwnership() {
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this, args);
        if (!Imported.VisuMZ_3_StateTooltips || messageApi.stateTooltipOwnershipInstalled) return result;
        messageApi.stateTooltipOwnershipInstalled = true;
        const tooltip = Window_StateTooltip.prototype;
        tooltip.cancelMessageTooltipSelection = function() {
            if (this._messageTooltipTimer !== undefined) clearTimeout(this._messageTooltipTimer);
            delete this._messageTooltipTimer;
        };
        tooltip.moveStateTooltipToBattler = function(battler) {
            this.cancelMessageTooltipSelection();
            const scene = SceneManager._scene, x = TouchInput.x, y = TouchInput.y;
            this._messageTooltipTimer = setTimeout(() => {
                delete this._messageTooltipTimer;
                if (this._destroyed || SceneManager._scene !== scene || scene._stateTooltipWindow !== this || !battler || battler.isDead() || !battler.isAppeared()) return;
                if (TouchInput.x !== x || TouchInput.y !== y || this.getShowSelectStateTooltipBattler() !== battler) return;
                this.processShowSelectStateTooltipBattler(battler, x, y);
            }, Window_StateTooltip.SELECT_DELAY_BEFORE_SHOW);
        };
        const setBattler = tooltip.setBattler;
        tooltip.setBattler = function(battler) {
            this.cancelMessageTooltipSelection();
            if (this._destroyed) return;
            return setBattler.call(this, battler);
        };
        const destroy = tooltip.destroy;
        tooltip.destroy = function(...args) {
            this.cancelMessageTooltipSelection();
            this._battler = null;
            return destroy.apply(this, args);
        };
        const terminate = Scene_Base.prototype.terminate;
        Scene_Base.prototype.terminate = function(...args) {
            this._stateTooltipWindow?.cancelMessageTooltipSelection();
            return terminate.apply(this, args);
        };
        // Hit testing is cheap and uses PIXI's current world transform. It also detects
        // scrolling/parent transforms with a stationary pointer, unlike x/y caching.
        Window_Selectable.prototype.processTouchStateTooltips = function() {
            if (!this.isStateTooltipEnabled() || SceneManager._scene?._stateTooltipWindow?._touchMoveClose) return;
            this._cache_StateTooltips ??= {};
            const cache = this._cache_StateTooltips;
            if (this.isOpen() && this.visible && this.isStateTooltipTouched()) {
                const battler = this.getStateTooltipBattler();
                if (battler && (cache.battler !== battler || SceneManager.currentTooltipBattler() !== battler)) this.openTouchStateTooltips();
                else if (!battler && cache.battler) this.closeTouchStateTooltips();
            } else if (cache.battler) this.closeTouchStateTooltips();
        };
        const close = Window_Selectable.prototype.closeTouchStateTooltips;
        Window_Selectable.prototype.closeTouchStateTooltips = function() {
            const battler = this._cache_StateTooltips?.battler;
            if (battler && SceneManager.currentTooltipBattler() !== battler) {
                this._cache_StateTooltips = {};
                return;
            }
            return close.call(this);
        };
        return result;
    };
}
installStateTooltipOwnership();

function installMessageSaveLifecycle() {
    const extract = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        const result = extract.call(this, contents);
        $gameSystem.initializeMessageCoreSettings();
        $gameScreen.requestPictureTextRefreshAll();
        $gameMap._messageCommonEvents ??= [];
        return result;
    };
}
installMessageSaveLifecycle();

})();
