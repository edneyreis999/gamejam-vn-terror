# VisuMZ_1_MessageCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_MessageCore`
- Contract: [RPG Maker MZ] [Tier 1] [MessageCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| MessageCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| General:struct | General Settings | — | struct&lt;General&gt; | {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"} | — | General settings involving the message system. |
| AutoColor:struct | Auto-Color Settings | — | struct&lt;AutoColor&gt; | {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"\[\]","TextColor2:arraystr":"\[\]","TextColor3:arraystr":"\[\]","TextColor4:arraystr":"\[\]","TextColor5:arraystr":"\[\]","TextColor6:arraystr":"\[\]","TextColor7:arraystr":"\[\]","TextColor8:arraystr":"\[\]","TextColor9:arraystr":"\[\]","TextColor10:arraystr":"\[\]","TextColor11:arraystr":"\[\]","TextColor12:arraystr":"\[\]","TextColor13:arraystr":"\[\]","TextColor14:arraystr":"\[\]","TextColor15:arraystr":"\[\]","TextColor16:arraystr":"\[\]","TextColor17:arraystr":"\[\]","TextColor18:arraystr":"\[\]","TextColor19:arraystr":"\[\]","TextColor20:arraystr":"\[\]","TextColor21:arraystr":"\[\]","TextColor22:arraystr":"\[\]","TextColor23:arraystr":"\[\]","TextColor24:arraystr":"\[\]","TextColor25:arraystr":"\[\]","TextColor26:arraystr":"\[\]","TextColor27:arraystr":"\[\]","TextColor28:arraystr":"\[\]","TextColor29:arraystr":"\[\]","TextColor30:arraystr":"\[\]","TextColor31:arraystr":"\[\]"} | — | Automatically color certain keywords a specific way. |
| CustomFonts:arraystruct | Custom Font Manager | — | struct&lt;CustomFont&gt;\[\] | \[\] | — | Register custom fonts here. Custom fonts that aren't the message or number fonts cannot be used without this. |
| TextCodeActions:arraystruct | Text Code Actions | — | struct&lt;TextCodeAction&gt;\[\] | \["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\&lt;(.*?)\\\\&gt;\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data\[0\].trim();\\\\n        const index = parseInt(data\[1\] \|\| '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing &amp;&amp; this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\&lt;(.*?)\\\\&gt;\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\&lt;(.*?)\\\\&gt;\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() &amp;&amp; textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() &amp;&amp; textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\&lt;(.*?)\\\\&gt;\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() &amp;&amp; textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\&lt;(.*?)\\\\&gt;\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data\[0\] ? Number(data\[0\].trim()) : this.x;\\\\n    const y = !!data\[1\] ? Number(data\[1\].trim()) : this.y;\\\\n    const width = !!data\[2\] ? Number(data\[2\].trim()) : this.width;\\\\n    const height = !!data\[3\] ? Number(data\[3\].trim()) : this.height;\\\\n    const duration = !!data\[4\] ? Number(data\[4\].trim()) : 20;\\\\n    const easingType = !!data\[5\] ? data\[5\].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\&lt;(.*?)\\\\&gt;\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data\[0\] ? Number(data\[0\].trim()) : 0;\\\\n    const y = !!data\[1\] ? Number(data\[1\].trim()) : 0;\\\\n    const width = !!data\[2\] ? Number(data\[2\].trim()) : 0;\\\\n    const height = !!data\[3\] ? Number(data\[3\].trim()) : 0;\\\\n    const duration = !!data\[4\] ? Number(data\[4\].trim()) : 20;\\\\n    const easingType = !!data\[5\] ? data\[5\].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments\[0\];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"\] | — | Text codes that perform actions. |
| TextCodeReplace:arraystruct | Text Code Replacements | — | struct&lt;TextCodeReplace&gt;\[\] | \["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments\[1\]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message &amp;&amp; actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments\[1\]) - 1;\\\\nconst actor = $gameParty.members()\[index\];\\\\nif (this.constructor === Window_Message &amp;&amp; actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst obj = database\[id\];\\\\nconst icon = obj ? (obj.iconIndex \|\| 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI\[%1\]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst obj = database\[id\];\\\\nconst icon = obj ? (obj.iconIndex \|\| 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI\[%1\]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst obj = database\[id\];\\\\nconst icon = obj ? (obj.iconIndex \|\| 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI\[%1\]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments\[1\]);\\\\nreturn $gameParty.numItems(database\[id\]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst obj = database\[id\];\\\\nconst icon = obj ? (obj.iconIndex \|\| 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI\[%1\]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments\[1\]);\\\\nreturn $gameParty.numItems(database\[id\]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst obj = database\[id\];\\\\nconst icon = obj ? (obj.iconIndex \|\| 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI\[%1\]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments\[1\]);\\\\nreturn $gameParty.numItems(database\[id\]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst obj = database\[id\];\\\\nconst icon = obj ? (obj.iconIndex \|\| 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI\[%1\]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments\[1\]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments\[1\]) - 1) \|\| 0;\\\\nconst member = $gameTroop.members()\[index\];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\\[(\\\\d+)\\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments\[1\]) - 1) \|\| 0;\\\\nconst member = $gameTroop.members()\[index\];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"\] | — | Text codes that replace themselves with text. |
| TextMacros:arraystruct | Text Code Macros | — | struct&lt;TextMacro&gt;\[\] | \["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type \[Example Macro\].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P\[1\]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"\] | — | Macros that are used to quickly write batches of text. Format style: \[MacroName\] |
| Localization:struct | Text Language Settings | — | struct&lt;Localization&gt; | {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"\[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"\]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"} | — | Text Language settings for this plugin. |
| LanguageFonts:struct | Language Fonts | Localization:struct | struct&lt;LanguageFonts&gt; | {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"} | — | Different default fonts used for different languages. Players can override this with Options Core. |
| LanguageImages:struct | Language Images | Localization:struct | struct&lt;LanguageImages&gt; | {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"\[XX\]","Chinese(Simplified):str":"\[XX\]","Chinese(Traditional):str":"\[XX\]","Czech:str":"\[XX\]","Danish:str":"\[XX\]","Dutch:str":"\[XX\]","English:str":"\[XX\]","Finnish:str":"\[XX\]","French:str":"\[XX\]","German:str":"\[XX\]","Greek:str":"\[XX\]","Hindi:str":"\[XX\]","Hungarian:str":"\[XX\]","Indonesian:str":"\[XX\]","Italian:str":"\[XX\]","Japanese:str":"\[XX\]","Korean:str":"\[XX\]","Norwegian:str":"\[XX\]","Polish:str":"\[XX\]","Portuguese:str":"\[XX\]","Romanian:str":"\[XX\]","Russian:str":"\[XX\]","Slovak:str":"\[XX\]","Spanish:str":"\[XX\]","Swedish:str":"\[XX\]","Tamil:str":"\[XX\]","Thai:str":"\[XX\]","Turkish:str":"\[XX\]"} | — | Allows different images to be used when different languages are used. See help for more information. |
| TextSpeed:struct | Text Speed Option Settings | — | struct&lt;TextSpeed&gt; | {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"} | — | Text Speed Options Menu settings. |
| WordWrap:struct | Word Wrap Settings | — | struct&lt;WordWrap&gt; | {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"} | — | Settings involving Word Wrap. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| MessageWindow | Message Window | — | — | — | — | — |
| MessageRows:num | Default Rows | MessageWindow | num | 4 | — | Default number of rows to display for the Message Window. |
| MessageWidth:num | Default Width | MessageWindow | num | 816 | — | Default Message Window width in pixels. |
| FastForwardKey:str | Fast Forward Key | MessageWindow | combo | pagedown | none; tab; shift; control; pageup; pagedown | This is the key used for fast forwarding messages. |
| MessageTextDelay:num | Text Delay | MessageWindow | number | 1 | — | How many frames to wait between characters drawn? Use 0 for instant. |
| MsgWindowOffsetX:num | Offset X | MessageWindow | — | +0 | — | Offset Message Window horizontally. Negative: Left; Positive: Right |
| MsgWindowOffsetY:num | Offset Y | MessageWindow | — | +0 | — | Offset Message Window vertically. Negative: Up; Positive: Down |
| StretchDimmedBg:eval | Stretch Dimmed BG | MessageWindow | boolean | true | — | Stretch dimmed window background to fit the whole screen. |
| DefaultOutlineWidth:num | Default Outline Width | MessageWindow | number | 3 | — | Changes the default outline width to this many pixels thick. |
| EachMessageStart:json | Each Message Start | MessageWindow | note | "" | — | This is text that is added at the start of each message. You may use text codes. |
| EachMessageEnd:json | Each Message End | MessageWindow | note | "" | — | This is text that is added at the end of each message. You may use text codes. |
| NameBoxWindow | Name Box Window | — | — | — | — | — |
| NameBoxWindowDefaultColor:num | Default Color | NameBoxWindow | — | 0 | — | Default color for the Name Box Window's text. |
| NameBoxWindowOffsetX:num | Offset X | NameBoxWindow | — | +0 | — | How much to offset the name box window X by (as long as it doesn't go offscreen). |
| NameBoxWindowOffsetY:num | Offset Y | NameBoxWindow | — | +0 | — | How much to offset the name box window Y by (as long as it doesn't go offscreen). |
| ChoiceListWindow | Choice List Window | — | — | — | — | — |
| ChoiceWindowLineHeight:num | Line Height | ChoiceListWindow | number | 36 | — | What is the default line height for Show Choices? |
| ChoiceWindowMinWidth:num | Minimum Choice Width | ChoiceListWindow | number | 96 | — | What is the minimum choice width for each choice? 96 is the default width. |
| ChoiceWindowMaxRows:num | Max Rows | ChoiceListWindow | number | 8 | — | Maximum number of rows to visibly display? |
| ChoiceWindowMaxCols:num | Max Columns | ChoiceListWindow | number | 1 | — | Maximum number of columns to visibly display? |
| ChoiceWindowTextAlign:str | Text Alignment | ChoiceListWindow | select | rmmz-mainfont | Default=default; Left=left; Center=center; Right=right | Default alignment for Show Choice window. |
| DefaultTextCodes | Default Text Codes | — | — | — | — | — |
| RelativePXPY:eval | Relative \PX \PY | DefaultTextCodes | boolean | true | — | Make \PX\[x\] and \PY\[x\] adjust relative starting position than exact coordinates. |
| FontBiggerCap:eval | \{ Maximum | DefaultTextCodes | number | 108 | — | Determine the maximum size that \{ can reach. |
| FontSmallerCap:eval | \} Minimum | DefaultTextCodes | number | 12 | — | Determine the minimum size that \} can reach. |
| FontChangeValue:eval | \{ Change \} | DefaultTextCodes | number | 12 | — | How much does \{ and \} change font size by? |

### Struct: AutoColor

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DatabaseHighlighting | Database Highlighting | — | — | — | — | — |
| Actors:str | Actors | DatabaseHighlighting | number | 0 | — | Any usage of an Actor's name is given this text color. Use 0 to not auto-color. |
| Classes:str | Classes | DatabaseHighlighting | number | 0 | — | Any usage of a Class's name is given this text color. Use 0 to not auto-color. |
| Skills:str | Skills | DatabaseHighlighting | number | 0 | — | Any usage of a Skill's name is given this text color. Use 0 to not auto-color. |
| Items:str | Items | DatabaseHighlighting | number | 0 | — | Any usage of an Item's name is given this text color. Use 0 to not auto-color. |
| Weapons:str | Weapons | DatabaseHighlighting | number | 0 | — | Any usage of a Weapon's name is given this text color. Use 0 to not auto-color. |
| Armors:str | Armors | DatabaseHighlighting | number | 0 | — | Any usage of an Armor's name is given this text color. Use 0 to not auto-color. |
| Enemies:str | Enemies | DatabaseHighlighting | number | 0 | — | Any usage of an Enemy's name is given this text color. Use 0 to not auto-color. |
| States:str | States | DatabaseHighlighting | number | 0 | — | Any usage of a State's name is given this text color. Use 0 to not auto-color. |
| WordHighlighting | Word Highlighting | — | — | — | — | — |
| TextColor1:arraystr | \C\[1\]: Blue | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor2:arraystr | \C\[2\]: Red | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor3:arraystr | \C\[3\]: Green | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor4:arraystr | \C\[4\]: Sky Blue | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor5:arraystr | \C\[5\]: Purple | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor6:arraystr | \C\[6\]: Yellow | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor7:arraystr | \C\[7\]: Gray | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor8:arraystr | \C\[8\]: Light Gray | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor9:arraystr | \C\[9\]: Dark Blue | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor10:arraystr | \C\[10\]: Dark Red | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor11:arraystr | \C\[11\]: Dark Green | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor12:arraystr | \C\[12\]: Dark Sky Blue | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor13:arraystr | \C\[13\]: Dark Purple | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor14:arraystr | \C\[14\]: Solid Yellow | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor15:arraystr | \C\[15\]: Black | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor16:arraystr | \C\[16\]: System Blue | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor17:arraystr | \C\[17\]: Crisis Yellow | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor18:arraystr | \C\[18\]: Dead Red | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor19:arraystr | \C\[19\]: Outline Black | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor20:arraystr | \C\[20\]: HP Orange 1 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor21:arraystr | \C\[21\]: HP Orange 2 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor22:arraystr | \C\[22\]: MP Blue 1 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor23:arraystr | \C\[23\]: MP Blue 2 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor24:arraystr | \C\[24\]: Param Up Green | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor25:arraystr | \C\[25\]: Param Down Red | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor26:arraystr | \C\[26\]: System Purple | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor27:arraystr | \C\[27\]: System Pink | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor28:arraystr | \C\[28\]: TP Green 1 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor29:arraystr | \C\[29\]: TP Green 2 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor30:arraystr | \C\[30\]: EXP Purple 1 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |
| TextColor31:arraystr | \C\[31\]: EXP Purple 2 | WordHighlighting | string\[\] | \[\] | — | A list of all the words that will be automatically colored with this text color. |

### Struct: CustomFont

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| FontFamily:str | Font Family | — | — | Unnamed | — | This will be what's used by RPG Maker MZ and plugins to reference this specific font. NO filename extensions! |
| Filename:str | Filename | — | — | Unnamed.ttf | — | What is the filename of the font you would like to use? Located inside the project's "fonts" folder. |

### Struct: TextCodeAction

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Match:str | Match | — | — | Key | — | This is what needs to be matched in order for this text code to work. |
| Type:str | Type | — | select | — | none=; \[x\] (number)=\\[(\d+)\\]; &lt;x&gt; (string)=\&lt;(.*?)\&gt; | The type of parameter to obtain (none, number, or string). |
| CommonEvent:num | Common Event | — | common_event | 0 | — | Select a common event to run when this text code is used in a message. |
| ActionJS:func | JS: Action | — | note | "const textState = arguments\[0\];" | — | JavaScript code used to perform an action when this text code appears. |

### Struct: TextCodeReplace

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Match:str | Match | — | — | Key | — | This is what needs to be matched in order for this text code to work. |
| Type:str | Type | — | select | — | none=; \[x\] (number)=\\[(\d+)\\]; &lt;x&gt; (string)=\&lt;(.*?)\&gt; | The type of parameter to obtain (none, number, or string). |
| TextStr:str | STR: Text | — | — | Undefined | — | The text that will appear if this match appears. If this has a value, ignore the JS: Text version. |
| TextJS:func | JS: Text | — | note | "return 'Text';" | — | JavaScript code used to determine the text that will appear if this match appears. |

### Struct: TextMacro

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Match:str | Match | — | — | Key | — | This is what needs to be matched in order for this macro to work. |
| TextStr:str | STR: Text | — | — | Undefined | — | The replacement text that will appear from the macro. If this has a value, ignore the JS: Text version. |
| TextJS:func | JS: Text | — | note | "return 'Text';" | — | JavaScript code used to determine the text that will appear if this macro appears. |

### Struct: Localization

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Main | Main Settings | — | — | — | — | — |
| Enable:eval | Enable Switching? | Main | boolean | false | — | Enable language switching settings for this plugin? |
| CsvFilename:str | CSV Filename | Main | — | Languages.csv | — | What is the filename of the CSV file to read from? Located within the project's /data/ folder. |
| Options | Options | — | — | — | — | — |
| AddOption:eval | Add Option? | Options | boolean | true | — | Add the 'Language' option to the Options menu? |
| AdjustRect:eval | Adjust Window Height | Options | boolean | true | — | Automatically adjust the options window height? |
| Name:str | Option Name | Options | — | Text Language | — | Command name of the option. |
| Localized | Languages | — | — | — | — | — |
| DefaultLocale:str | Default Language | Localized | select | English | Bengali; Chinese(Simplified); Chinese(Traditional); Czech; Danish; Dutch; English; Finnish; French; German; Greek; Hindi; Hungarian; Indonesian; Italian; Japanese; Korean; Norwegian; Polish; Portuguese; Romanian; Russian; Slovak; Spanish; Swedish; Tamil; Thai; Turkish | What is the default language used for this game? |
| Languages:arraystr | Supported Languages | Localized | select\[\] | \["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"\] | Bengali; Chinese(Simplified); Chinese(Traditional); Czech; Danish; Dutch; English; Finnish; French; German; Greek; Hindi; Hungarian; Indonesian; Italian; Japanese; Korean; Norwegian; Polish; Portuguese; Romanian; Russian; Slovak; Spanish; Swedish; Tamil; Thai; Turkish | What are all the supported languages supported by this game's script? Remove any that aren't translated. |
| LangNames | Language Names | — | — | — | — | — |
| Bengali:str | Bengali | LangNames | — | বাংলা | — | How does this language appear in the in-game options? |
| Chinese(Simplified):str | Chinese (Simplified) | LangNames | — | 简体中文 | — | How does this language appear in the in-game options? |
| Chinese(Traditional):str | Chinese (Traditional) | LangNames | — | 繁體中文 | — | How does this language appear in the in-game options? |
| Czech:str | Czech | LangNames | — | Čeština | — | How does this language appear in the in-game options? |
| Danish:str | Danish | LangNames | — | Dansk | — | How does this language appear in the in-game options? |
| Dutch:str | Dutch | LangNames | — | Nederlands | — | How does this language appear in the in-game options? |
| English:str | English | LangNames | — | English | — | How does this language appear in the in-game options? |
| Finnish:str | Finnish | LangNames | — | Suomi | — | How does this language appear in the in-game options? |
| French:str | French | LangNames | — | Français | — | How does this language appear in the in-game options? |
| German:str | German | LangNames | — | Deutsch | — | How does this language appear in the in-game options? |
| Greek:str | Greek | LangNames | — | Ελληνικά | — | How does this language appear in the in-game options? |
| Hindi:str | Hindi | LangNames | — | हिन्दी | — | How does this language appear in the in-game options? |
| Hungarian:str | Hungarian | LangNames | — | Magyar | — | How does this language appear in the in-game options? |
| Indonesian:str | Indonesian | LangNames | — | Bahasa Indo | — | How does this language appear in the in-game options? |
| Italian:str | Italian | LangNames | — | Italiano | — | How does this language appear in the in-game options? |
| Japanese:str | Japanese | LangNames | — | 日本語 | — | How does this language appear in the in-game options? |
| Korean:str | Korean | LangNames | — | 한국어 | — | How does this language appear in the in-game options? |
| Norwegian:str | Norwegian | LangNames | — | Norsk | — | How does this language appear in the in-game options? |
| Polish:str | Polish | LangNames | — | Polski | — | How does this language appear in the in-game options? |
| Portuguese:str | Portuguese | LangNames | — | Português | — | How does this language appear in the in-game options? |
| Romanian:str | Romanian | LangNames | — | Română | — | How does this language appear in the in-game options? |
| Russian:str | Russian | LangNames | — | Русский | — | How does this language appear in the in-game options? |
| Slovak:str | Slovak | LangNames | — | Slovenčina | — | How does this language appear in the in-game options? |
| Spanish:str | Spanish | LangNames | — | Español | — | How does this language appear in the in-game options? |
| Swedish:str | Swedish | LangNames | — | Svenska | — | How does this language appear in the in-game options? |
| Tamil:str | Tamil | LangNames | — | தமிழ் | — | How does this language appear in the in-game options? |
| Thai:str | Thai | LangNames | — | ไทย | — | How does this language appear in the in-game options? |
| Turkish:str | Turkish | LangNames | — | Türkçe | — | How does this language appear in the in-game options? |

### Struct: LanguageFonts

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Bengali:str | Bengali | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Chinese(Simplified):str | Chinese (Simplified) | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Chinese(Traditional):str | Chinese (Traditional) | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Czech:str | Czech | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Danish:str | Danish | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Dutch:str | Dutch | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| English:str | English | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Finnish:str | Finnish | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| French:str | French | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| German:str | German | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Greek:str | Greek | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Hindi:str | Hindi | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Hungarian:str | Hungarian | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Indonesian:str | Indonesian | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Italian:str | Italian | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Japanese:str | Japanese | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Korean:str | Korean | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Norwegian:str | Norwegian | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Polish:str | Polish | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Portuguese:str | Portuguese | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Romanian:str | Romanian | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Russian:str | Russian | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Slovak:str | Slovak | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Spanish:str | Spanish | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Swedish:str | Swedish | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Tamil:str | Tamil | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Thai:str | Thai | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |
| Turkish:str | Turkish | — | — | rmmz-mainfont | — | What font face is used for this language? Make sure it is registered under Custom Font Manager. |

### Struct: LanguageImages

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ConvertDefault:eval | Convert Default? | — | boolean | false | — | ON: Default language uses converted marker. OFF: Default languages uses \[XX\] as marker. |
| Languages | Languages | — | — | — | — | — |
| Bengali:str | Bengali | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Chinese(Simplified):str | Chinese (Simplified) | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Chinese(Traditional):str | Chinese (Traditional) | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Czech:str | Czech | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Danish:str | Danish | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Dutch:str | Dutch | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| English:str | English | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Finnish:str | Finnish | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| French:str | French | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| German:str | German | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Greek:str | Greek | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Hindi:str | Hindi | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Hungarian:str | Hungarian | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Indonesian:str | Indonesian | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Italian:str | Italian | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Japanese:str | Japanese | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Korean:str | Korean | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Norwegian:str | Norwegian | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Polish:str | Polish | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Portuguese:str | Portuguese | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Romanian:str | Romanian | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Russian:str | Russian | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Slovak:str | Slovak | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Spanish:str | Spanish | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Swedish:str | Swedish | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Tamil:str | Tamil | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Thai:str | Thai | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |
| Turkish:str | Turkish | Languages | — | \[XX\] | — | This text will replace \[XX\] with in image folder names and filenames when this language is selected. |

### Struct: TextSpeed

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AddOption:eval | Add Option? | — | boolean | true | — | Add the 'Text Speed' option to the Options menu? |
| AdjustRect:eval | Adjust Window Height | — | boolean | true | — | Automatically adjust the options window height? |
| Name:str | Option Name | — | — | Text Speed | — | Command name of the option. |
| Default:num | Default Value | — | number | 10 | — | 1 - 10, slowest to fastest. 11 is instant value. |
| Instant:str | Instant Speed | — | — | Instant | — | Text to show "instant" text. |

### Struct: WordWrap

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| EnableWordWrap | Enable Word Wrap | — | — | — | — | — |
| MessageWindow:eval | Message Window | EnableWordWrap | boolean | false | — | Automatically enable Word Wrap for this window? |
| HelpWindow:eval | Help Window | EnableWordWrap | boolean | false | — | Automatically enable Word Wrap for this window? |
| Rules | Rules | — | — | — | — | — |
| LineBreakSpace:eval | Link Break -&gt; Space | Rules | boolean | true | — | Convert manually placed (non tagged) line breaks with spaces? |
| TightWrap:eval | Tight Wrap | Rules | boolean | false | — | If a face graphic is present in a message, word wrap will be tighter. |
| EndPadding:num | End Padding | Rules | number | 0 | — | Add extra padding to your window to make text wrap further away from the end of the window. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Message: Properties

- Command ID: `MessageWindowProperties`
- Description: Change the various properties of the Message Window.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Rows:num | Rows | number | 4 | — | Change the number of Message Window rows. Leave at 0 to keep it unchanged. |
| Width:num | Width | number | 816 | — | Change the Message Window width in pixels. Leave at 0 to keep it unchanged. |
| WordWrap:str | Word Wrap | select | No Change | No Change; Enable=true; Disable=false | Enable or disable Word Wrap for the Message Window? @ -------------------------------------------------------------------------- |

### Message: X/Y Offsets

- Command ID: `MessageWindowXyOffsets`
- Description: Change the X and Y Offsets of the Message Window. The offset value(s) will be saved and stored.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| OffsetX:eval | Offset X | — | +0 | — | Offset Message Window horizontally. Negative: Left; Positive: Right |
| OffsetY:eval | Offset Y | — | +0 | — | Offset Message Window vertically. Negative: Up; Positive: Down @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Choice`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Choices: Distance

- Command ID: `ChoiceWindowDistance`
- Description: Change the distance from choice window to the message window.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Distance:eval | Distance | — | +0 | — | Change distance between the choice and message windows. Default distance is 0. Use negative to center align. @ -------------------------------------------------------------------------- |

### Choices: Properties

- Command ID: `ChoiceWindowProperties`
- Description: Change the properties found in the Show Choices event command.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| LineHeight:num | Choice Line Height | number | 36 | — | Change the line height for the show choices. Leave at 0 to keep this unchanged. |
| MinWidth:num | Minimum Choice Width | number | 96 | — | What is the minimum width size for each choice? 96 is the default width. |
| MaxRows:num | Max Rows | number | 8 | — | Maximum number of choice rows to be displayed. Leave at 0 to keep this unchanged. |
| MaxCols:num | Max Columns | number | 1 | — | Maximum number of choice columns to be displayed. Leave at 0 to keep this unchanged. |
| TextAlign:str | Text Alignment | select | rmmz-mainfont | Default=default; Left=left; Center=center; Right=right | Text alignment for Show Choice window. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Select`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Select: Weapon

- Command ID: `SelectWeapon`
- Description: Opens the Event Select Item Window to let the player pick a weapon to choose from.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| VariableID:num | Variable ID | number | 1 | — | This variable will be used to record the ID of the selected weapon. It will result in 0 otherwise. |
| WeaponTypeID:num | Weapon Type ID | number | 0 | — | Reduce all the weapons to a specific weapon type. Leave at 0 to not use filters. @ -------------------------------------------------------------------------- |

### Select: Armor

- Command ID: `SelectArmor`
- Description: Opens the Event Select Item Window to let the player pick an armor to choose from.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| VariableID:num | Variable ID | number | 1 | — | This variable will be used to record the ID of the selected armor. It will result in 0 otherwise. |
| ArmorTypeID:num | Armor Type ID | number | 0 | — | Reduce all the armors to a specific armor type. Leave at 0 to not use filters. |
| EquipTypeID:num | Equip Type ID | number | 0 | — | Reduce all the armors to a specific equip type. Leave at 0 to not use filters. @ -------------------------------------------------------------------------- |

### Select: Skill

- Command ID: `SelectSkill`
- Description: Opens the Event Select Item Window to let the player pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| VariableID:num | Variable ID | number | 1 | — | This variable will be used to record the ID of the selected skill. It will result in 0 otherwise. |
| ActorID:num | Actor ID | actor | 0 | — | Select an actor to get the skill list from. Use 0 to select from the party leader. |
| SkillTypeID:num | Skill Type ID | number | 0 | — | Reduce all the skills to a specific skill type. Leave at 0 to not use filters. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Picture`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Picture: Change Text

- Command ID: `PictureTextChange`
- Description: Change text for target picture(s) to show. You may use text codes.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureIDs:arraynum | Picture ID(s) | number\[\] | \["1"\] | — | The ID(s) of the picture(s) to set text to. |
| Padding:eval | Padding | — | $gameSystem.windowPadding() | — | How much padding from the sides should there be? |
| Text | — | — | — | — | — |
| upperleft:json | Upper Left | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| up:json | Upper Center | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| upperright:json | Upper Right | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| left:json | Middle Left | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| center:json | Middle Center | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| right:json | Middle Right | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| lowerleft:json | Lower Left | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| down:json | Lower Center | note | "" | — | The text that's aligned to this picture's side. You may use text codes. |
| lowerright:json | Lower Right | note | "" | — | The text that's aligned to this picture's side. You may use text codes. @ -------------------------------------------------------------------------- |

### Picture: Erase Text

- Command ID: `PictureTextErase`
- Description: Erase all text for target picture(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureIDs:arraynum | Picture ID(s) | number\[\] | \["1"\] | — | The ID(s) of the picture(s) to erase text for. @ -------------------------------------------------------------------------- |

### Picture: Refresh Text

- Command ID: `PictureTextRefresh`
- Description: Refreshes the text used for all on-screen pictures. To be used if any dynamic text codes are updated like \n[x]. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Message Core plugin extends and builds upon the message functionality of
RPG Maker MZ and allows you, the game dev, to customize the workflow for
your game's message system.

Features include all (but not limited to) the following:

* Control over general message settings.
* Auto-Color key words and/or database entries.
* Increases the text codes available to perform newer functions/effects.
* Ability for you to implement custom Text Code actions.
* Ability for you to implement custom Text code string replacements.
* Invoke a macro system to speed up the dev process.
* Add a Text Speed option to the Options menu.
* Add the ever so useful Word Wrap to your message system.
* Extend the choice selection process to your liking.
* The ability to enable/disable as well as show/hide certain choices.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Dim Background Extension

Before, when using the Dim Background as a part of a Show Text event, its
size is only the same as the message window's width itself. This looked
really ugly because it had hard edges cutting off while gradients are seen
elsewhere. To make it look better, we extended the dimmed background to span
the width of the screen instead.

---

Extended Messages

If you decide to expand the size of the message window to allow for more
rows to be displayed, you can type in the data for them by chaining together
Show Message events. They will take data from each other and display them in
the same message window as long as there are enough rows.

---

Extended Choice Lists

Choice lists can be extended by just chaining one Choice List event after
the other in succession along the same indentation. They do not extend if
there is any event other than a Choice List option between them on the same
indentation level.

---

Text Language Information

The "Text Language" feature allows your players to switch between different
languages for your game to allow people from around the globe to enjoy what
story you have to tell.

Disclaimers: This is not an automatic translation tool. Translations made
through the "Text Language" feature of the VisuStella MZ Message Core
will require manual input by the game developer.

---

=== How to Enable Switching ===

Text Language is NOT enabled by default. Here's what you have to do:

#1. Open up the Message Core's Plugin Parameters
#2. Plugin Parameters > Text Language Settings > Enable Switching?
#3. Change the "Enable Switching?" parameter setting to "true".
#4. Adjust any other settings as needed.
#5. Save the Plugin Parameter changes.
#6. Save your game.

Now, it's time to get the CSV file that will contain all of the text used to
translate your game's script.

#1. Play test your game. Make sure Play test mode is NOT disabled.
#2. A popup will appear asking to create a language CSV file.
#3. Click "OK" and let the plugin do its thing.
#4. The project's /data/ folder will appear with Language.csv made.
#5. The plugin will then ask you to restart your game.

'''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
this in mind as most CSV editors will default to comma (,) instead of the
semicolon (;) for their separator.

---

=== How to Edit the Language CSV ===

The Language CSV is structured as a normal CSV file would be, which also
means it can be modified in programs like Microsoft Excel or Google Sheets.
We recommend using either of those programs to modify the text.

We do not recommend modifying the CSV file in programs like notepad directly
due to the way certain things like commas (,) are handled and how easy it is
to be error-prone.

The table will appear something like this at first:

Key        English    Chinese    Japanese     Korean
Greeting   Hello      你好       こんにちは    안녕하세요
Farewell   Good-bye   再见       さようなら    안녕히
Wow        Wow        哇         ワオ          와우

The "Key" column refers to the reference key used to determine which lines
will be inserted into the text. The columns with the languages will utilize
the respective phrases for that language.

You can remove columns containing languages that you aren't planning to
translate for your game.

---

=== Things to Keep in Mind ===

When adding text to the CSV file via the spreadsheet editor (Excel or Google
Sheets), there's a few things to keep in mind.

---

==== Line Breaks ====

When you want to insert line breaks into the translated phrases, use the
<br> text code. This is best used for text that is to be transferred into
the message window or help window.

==== Text Codes ====

Text codes like \C[2] can be inserted normally. However, they only work in
windows that support text codes, such as the message window or help window.
Otherwise, the text codes will not transfer over properly.

==== Semicolons ====

Due to the nature of the CSV file, we used the semicolon (;) as the
separator. As such, semicolons should not be used in the text entries.
Though some sentences will work with the semicolon, not all of them will. If
you do want to use a semicolon, use the text code <semicolon> instead.

Example:

"The pancakes were delicious<semicolon> they were fluffy and sweet."

Other variations of the semicolon text code are <semi> and <semi-colon>.
The <semicolon> text code and variants only work with the Language CSV and
are ignored otherwise when typed in a regular message box entry.

---

==== Macros and Language Switches ====

For those using both text macros and text language switches, macros will be
converted to text before language switches as it allows for better text
transitions that way.

---

=== How to Use the Reference Keys ===

Remember the "Key" column and the reference keys? Those are used to
determine which lines will be inserted into the text for the message window
and just about any other window. However, there's a specific way these keys
must be used in order for them to work.

The "text code" format works like this. Use any of the following:

\tl{keyName}
\translate{keyName}
\loc{keyName}
\locale{keyName}
\localize{keyName}

or for those coming from different translation plugins but want to switch
over to the VisuStella MZ Message Core's translation system:

${keyName}

For example, to use one of the default keys made with the Language CSV:

\tl{Greeting}

This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
Japanese, and "안녕하세요" in Korean.

Key names are not case sensitive and any trailing spaces will be removed
from them in order to make sure the CSV table is stable to reference any
translated text from.

You can insert these language "text codes" into item names, skill names,
etc. as well as system entries like for Attack, Defense, etc.

---

=== Naming Weapon Types, Armor Types, Equip Types, Item Categories ===

You might have noticed that if you've decided to use \tl{keyName} for weapon
or other database types, other parts of the game will error out. Don't
worry, for these, you don't have to change the currently used database name.
Go straight to the CSV and insert in a new key for that particular database
name. For example, the equip type "Accessory" will use "Accessory" as the
automatic key to look for a translated phrase. If there isn't any in the CSV
file, then the default database text entry will be used.

---

Available Text Codes

The following are text codes that you may use with this plugin. Some of
these are original text codes provided by RPG Maker MZ, while others are
new text codes added through this plugin. You may even add your own text
codes through the plugin parameters.

=== RPG Maker MZ Text Codes ===

The following are text codes that come with RPG Maker MZ. These text codes
cannot be edited through the Plugin Parameters.

---

------------------   -------------------------------------------------------
Text Code            Effect (Global)
------------------   -------------------------------------------------------
\V[x]                Replaced by the value of variable 'x'.
\N[x]                Replaced by the name of actor 'x'.
\P[x]                Replaced by the name of party member 'x'.
\C[x]                Draw the subsequent text with window skin color 'x'.
\I[x]                Draw icon 'x'.

\PX[x]               Moves text x position to 'x'.
\PY[x]               Moves text y position to 'y'.

\G                   Replaced by the currency unit.

\{                   Increase the text font size by one step.
\}                   Decrease the text font size by one step.
\FS[x]               Changes the text font size to 'x'.

\\                   Replaced by the backslash character.

---

------------------   -------------------------------------------------------
Text Code            Effect (Message Window Only)
------------------   -------------------------------------------------------
\$                   Opens the gold window.
\.                   Waits a 1/4 second.
\|                   Waits a full second.
\!                   Waits for button input.
\>                   Display remaining text on same line all at once.
\<                   Cancel the effect that displays text all at once.
\^                   Do not wait for input after displaying text to move on.

---

=== Message Core Hard-Coded Text Codes ===

The following text codes are hard-coded into VisuStella MZ Message Core's
code. These text codes cannot be edited through the Plugin Parameters.

---

------------------   -------------------------------------------------------
Text Code            Effect (Global)
------------------   -------------------------------------------------------
<b>                  Makes subsequent text bold.
</b>                 Removes bold from subsequent text.
<i>                  Makes subsequent text italic.
</i>                 Removes italic from subsequent text.

<left>               Makes subsequent text left-aligned. *Note1*
</left>              Removes left-alignment for subsequent text.
<center>             Makes subsequent text center-aligned. *Note1*
</center>            Removes center-alignment for subsequent text.
<right>              Makes subsequent text right-aligned. *Note1*
</right>             Removes right-alignment for subsequent text.

Note1: Use at line-start. Does not work with Word Wrap.

<ColorLock>          Text codes can't change text color for subsequent text.
</ColorLock>         Removes Color Lock property.

<WordWrap>           Enables Word Wrap for this window. *Note2*
</WordWrap>          Disables Word Wrap for this window. *Note2*
<br>                 Adds a line break. Requires Word Wrap enabled.
<line break>         Adds a line break. Requires Word Wrap enabled.

Note2: Some windows cannot use Word Wrap such as the Choice Window.
Word Wrap also cannot be used together with <left>, <center>, or <right> and
will disable itself if text alignment text codes are detected.

\picture<x>          Draws picture x (filename) at current text position.
\CenterPicture<x>    Draws picture x (filename) centered at the window.

---

------------------   -------------------------------------------------------
Text Code            Effect (Global)
------------------   -------------------------------------------------------
<Caps>               Makes all text after this capitalized.
Turns off other auto-text case modes.
ie: "hello world" becomes "HELLO WORLD"
</Caps>              Turns off auto text-casing effects.

<Upper>              Makes the first letter of any word after a space to be
capitalized. Other letters are left alone.
Turns off other auto-text case modes.
ie. "old mcDonald" becomes "Old McDonald"
</Upper>             Turns off auto text-casing effects.

<Lower>              Makes all text after this lowercase.
Turns off other auto-text case modes.
ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
</Lower>             Turns off auto text-casing effects.

<Alt>                Makes all text after this alternate between uppercase
and lowercase. Turns off other auto-text case modes.
ie: "Hello" becomes "HeLlO"
</Alt>               Turns off auto text-casing effects.

<Chaos>              Makes all text after this randomize between uppercase
and lowercase. Turns off other auto-text case modes.
ie: "Wassup" becomes "waSsUP" or "WasSuP"
</Chaos>             Turns off auto text-casing effects.

**Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
</Lower>, </Alt>, and </Chaos> all do the same thing and can be used
interchangeably with each other. For example, you can do this:
<Caps>hello world</Lower> and it would still accomplish the same effect, but
you won't do that because you're not a monster of a developer.

---

------------------   -------------------------------------------------------
Text Code            Effect (Message Window Only)
------------------   -------------------------------------------------------
\CommonEvent[x]      Runs common event x when text code is reached.
\Wait[x]             Makes the message wait x frames before continuing.

<Next Page>          Ends the current message page at this line. This is
used for messages when rows are at 5 or above and the
message lines don't match the amount. This is used to
prevent grabbing message windows from following message
events. Any lines following <Next Page> in the same
message event will be ignored.

<Auto>               Resizes message window dimensions to fit text. *Note3*
<Auto Width>         Resizes message window width to fit text. *Note3*
<Auto Height>        Resizes message window height to fit text. *Note3*

<Auto Actor: x>      Resizes message window and positions it over actor x
sprite's head. *Note3*
<Auto Party: x>      Resizes message window and positions it over party
member x sprite's head. *Note3*
<Auto Player>        Map-Only. Resizes message window and positions it over
the player sprite's head. *Note3*
<Auto Event: x>      Map-Only. Resizes message window and positions it over
event x sprite's head. *Note3*
<Auto Enemy: x>      Battle-Only. Resizes message window and positions it
over enemy x sprite's head. *Note3*

Note3: Upon using these text codes, the message window's settings will be
reset for the upcoming message. These effects do not work with Word Wrap.

---

----------------------------   ---------------------------------------------
Text Code                      Effect (Battle Only)
----------------------------   ---------------------------------------------
<Current Battle Target>        Replaces text code with the current target of
an action in battle.
<Current Battle User>          Replaces text code with the currently active
user in battle.
<Current Battle Action>        Replaces text code with the current battle
action's name with an icon in front.
<Current Battle Action Name>   Replaces text code with the current battle
action's name without an icon.

If there is no battle, no target, no user, or no action, then the text code
will just be replaced with no text.

These text codes are NOT recommended to be used inside of Help Descriptions.
They are best used with "Show Text" event commands.

---

-----------------------------  ---------------------------------------------
Text Code                      Effect (Choice Window Only)
-----------------------------  ---------------------------------------------
<Show>                         Choice is always shown.
<Show Switch: x>               Choice shown if switch x is ON.
<Show Switches: x,x,x>         Choice shown if the x switches are all ON.
<Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
<Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.

<Hide>                         Choice is always hidden.
<Hide Switch: x>               Choice hidden if switch x is ON.
<Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
<Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
<Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.

<Enable>                       Choice is always enabled.
<Enable Switch: x>             Choice enabled if switch x is ON.
<Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
<Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
<Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.

<Disable>                      Choice is always disabled.
<Disable Switch: x>            Choice disabled if switch x is ON.
<Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
<Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
<Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.

<Choice Width: x>              Sets the minimum text area width to x.
Applies to whole choice window.
<Choice Indent: x>             Sets the indent to x value. Applies to
current choice selection only.

<BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
color of this choice to 'x' text color. This
will be combined with a fading
<BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
color of this choice to 'x' to 'y' gradient
text color.
<BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
color of this choice to '#rrggbb' color using
hex color values.
<BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
color of this choice to '#rrggbb' gradient
using hex color values.

<Help> text </Help>            Makes a help window appear and have it show
'text' in its contents. The help window will
disappear if no text is displayed.

<Shuffle>                      Shuffles the order of all choices. Any cancel
shortcuts other than "Branch" will be undone.
<Shuffle: x>                   Shuffles the order of all choices and only
x number of them will appear. Any cancel
shortcuts other than "Branch" will be undone.
Hidden choices do not count towards x number.

---

-----------------------------  ---------------------------------------------
Text Code                      Background Effects (Choice Window Only)
-----------------------------  ---------------------------------------------

<BgImg: filename>              Creates a background image from img/pictures/
stretched across the choice rectangle.
<BgImg LowerLeft: filename>    Creates a background image from img/pictures/
scaled to the lower left of choice rect.
<BgImg LowerCenter: filename>  Creates a background image from img/pictures/
scaled to the lower center of choice rect.
<BgImg LowerRight: filename>   Creates a background image from img/pictures/
scaled to the lower right of choice rect.
<BgImg MidLeft: filename>      Creates a background image from img/pictures/
scaled to the middle left of choice rect.
<BgImg Center: filename>       Creates a background image from img/pictures/
scaled to the center of choice rect.
<BgImg MidRight: filename>     Creates a background image from img/pictures/
scaled to the middle right of choice rect.
<BgImg UpperLeft: filename>    Creates a background image from img/pictures/
scaled to the upper left of choice rect.
<BgImg UpperCenter: filename>  Creates a background image from img/pictures/
scaled to the upper center of choice rect.
<BgImg UpperRight: filename>   Creates a background image from img/pictures/
scaled to the upper right of choice rect.

*Note:* For the <BgImg: filename> text code variants, even if the background
image is smaller than the choice contents, it will overscale to match its
choice rectangle dimensions.

*Note:* Using a background image will clear the dimmed background rectangle
that is normally behind each selectable choice.

*Note:* Each choice can only have one background image but can use a
combination of one background and one foreground image.

*Note:* Images in the background will appear behind the select cursor.

---

-----------------------------  ---------------------------------------------
Text Code                      Foreground Effects (Choice Window Only)
-----------------------------  ---------------------------------------------

<FgImg: filename>              Creates a foreground image from img/pictures/
stretched across the choice rectangle.
<FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
scaled to the lower left of choice rect.
<FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
scaled to the lower center of choice rect.
<FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
scaled to the lower right of choice rect.
<FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
scaled to the middle left of choice rect.
<FgImg Center: filename>       Creates a foreground image from img/pictures/
scaled to the center of choice rect.
<FgImg MidRight: filename>     Creates a foreground image from img/pictures/
scaled to the middle right of choice rect.
<FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
scaled to the upper left of choice rect.
<FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
scaled to the upper center of choice rect.
<FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
scaled to the upper right of choice rect.

*Note:* For the <FgImg: filename> text code variants, unlike the background
variant, the foreground image will not overscale past its original size.
Instead, it will maintain its original size or be smaller, so long as it can
be scaled to exist within the choice rectangle unless it is intended to be
stretched by using the <FgImg: filename> variant.

*Note:* Text is then written on top of the foreground image.

*Note:* Each choice can only have one foreground image but can use a
combination of one background and one foreground image.

*Note:* Images in the foreground will appear behind the select cursor.

---

-----------------  ---------------------------------------------------------
Text Code          Effect (Name Window Only)
-----------------  ---------------------------------------------------------
<Left>             Positions the name box window to the left.
<Center>           Positions the name box window to the center.
<Right>            Positions the name box window to the right.
<Position: x>      Replace 'x' with a number from 0 to 10. This positions
the name box window on the screen relative to the
position of the value 'x' represents.
\NormalBG          Changes background type of window to normal type.
\DimBG             Changes background type of window to dim type.
\TransparentBG     Changes background type of window to transparent type.

---

-------------------------------   ------------------------------------------
Text Code                         Effect (Message Window Only)
-------------------------------   ------------------------------------------

<Position: x, y, width, height>   Forces the message window to exact listed
coordinates and dimensions. Replace each
of the arguments with numbers. *Note*

<Coordinates: x, y>               Forces the message window to the exact
listed coordinates. Replace each of the
arguments with numbers. *Note*

<Dimensions: width, height>       Forces the message window size to the
exact listed dimensions. Replace each of
the arguments with numbers. *Note*

<Offset: +x, +y>                  Quickly adjust the message window offset
<Offset: -x, -y>                  values to the x and y amounts. The values
<Offset: +x, -y>                  will replace the previous offset settings
<Offset: -x, +y>                  if there were any.

*NOTE* These text codes do not work with Word Wrap.

---

------------------   -------------------------------------------------------
Text Code            Effect (Requires VisuMZ_0_CoreEngine)
------------------   -------------------------------------------------------
<Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
<Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
<Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
<Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.

<Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
<Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
<Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
<Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
<Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
<Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.

---

=== Random Text Pool ===

<RNG> text1 | text2 | text3 </RNG>

Using the above text code format in a Show Message entry, you can get a
random result out of the various inserted texts. Use "|" (without quotes) as
a separator between text entries. You can have unlimited entries. The result
will have any excess white space trimmed.

This text code cannot be inserted into a macro and parsed properly.

---

=== Message Core Customizable Text Codes ===

The following text codes can be altered through the Message Core's various
Plugin Parameters to adjust replacements and actions.

---

------------------   -------------------------------------------------------
Text Code            Effect (Global)
------------------   -------------------------------------------------------
\Class[x]            Draws class x's icon (if have) and name.
\ClassName[x]        Draws class x's name only.

\Skill[x]            Draws skill x's icon (if have) and name.
\SkillName[x]        Draws skill x's name only.

\Item[x]             Draws item x's icon (if have) and name.
\ItemName[x]         Draws item x's name only.
\ItemQuantity[x]     Inserts the number of item x's owned by the party.

\Weapon[x]           Draws weapon x's icon (if have) and name.
\WeaponName[x]       Draws weapon x's name only.
\WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.

\Armor[x]            Draws armor x's icon (if have) and name.
\ArmorName[x]        Draws armor x's name only.
\ArmorQuantity[x]    Inserts the number of armor x's owned by the party.

\LastGainObj         Draws the icon + name of the last party-gained object.
\LastGainObjName     Draws the name of the last party-gained object.
\LastGainObjQuantity Inserts the quantity of the last party-gained object.

\State[x]            Draws state x's icon (if have) and name.
\StateName[x]        Draws state x's name only.

\Enemy[x]            Draws enemy x's icon (if have) and name.
\EnemyName[x]        Draws enemy x's name only.

\Troop[x]            Draws troop x's icon (if have) and name.
\TroopName[x]        Draws troop x's name only.

\TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
\TroopNameMember[x]  Draws troop member x's name only. *Note1*

Note1: Only works in battle.

\NormalBG            Changes background type of window to normal type.
\DimBG               Changes background type of window to dim type.
\TransparentBG       Changes background type of window to transparent type.

\FontChange<x>       Changes font face to x font name.
\ResetFont           Resets font settings.

\ResetColor          Resets color settings.
\HexColor<x>         Changes text color to x hex color (ie. #123abc).
\OutlineColor[x]     Changes outline color to text color x.
\OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
\OutlineWidth[x]     Changes outline width to x thickness.

\WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
\WindowMoveBy<?>     Moves window by relative values. *Note2*
\WindowReset         Resets window position to original position.

Note2: Replace '?' with the following format:
targetX, targetY, targetWidth, targetHeight, duration, easingType
Only targetX and targetY are required arguments. These will only alter the
window dimensions when the text has arrived at that point. They will not
alter the window preemptively. This is not used as a window positioner.
Use the <Position: x, y, width, height> text code for that.

---

------------------   -------------------------------------------------------
Text Code            Effect (Message Window Only)
------------------   -------------------------------------------------------
\ActorFace[x]        Inserts actor x's face into the Message Window.
\PartyFace[x]        Inserts party member x's face into the Message Window.
\ChangeFace<x,y>     Changes message face to x filename, y index.
\FaceIndex[x]        Changes message face index to x.

\TextDelay[x]        Sets delay in frames between characters to x frames.

Note: These text codes only work with the Message Window. Keep in mind that
even if some windows might look like the Message Window, it may not
necessarily be one.

---

As these text codes can be added, removed, and/or altered, their functions
may or may not be the same depending on how you've altered them. VisuStella
is not responsible for any errors caused by changes made to pre-made text
codes nor any new text codes they did not make.

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Message Plugin Commands ===

---

Message: Properties
Change the various properties of the Message Window.

Rows:
- Change the number of Message Window rows.
- Leave at 0 to keep it unchanged.

Width:
- Change the Message Window width in pixels.
- Leave at 0 to keep it unchanged.

Word Wrap:
- Enable or disable Word Wrap for the Message Window?

---

Message: X/Y Offsets
- Change the X and Y Offsets of the Message Window.
- The offset value(s) will be saved and stored.

Offset X:
- Offset Message Window horizontally.
- Negative: Left; Positive: Right
- Message Window coordinates are still restricted via clamping.

Offset Y:
- Offset Message Window vertically.
- Negative: Up; Positive: Down
- Message Window coordinates are still restricted via clamping.

---

=== Choice Plugin Commands ===

---

Choices: Distance
- Change the distance from choice window to the message window.

Distance:
- Change distance between the choice and message windows.
- Default distance is 0.
- Use negative to center align with remaining space.

---

Choices: Properties
- Change the properties found in the Show Choices event command.

Line Height:
- Change the line height for the show choices.
- Leave at 0 to keep this unchanged.

Minimum Choice Width:
- What is the minimum width size for each choice?
- 96 is the default width.

Max Rows:
- Maximum number of choice rows to be displayed.
- Leave at 0 to keep this unchanged.

Max Columns:
- Maximum number of choice columns to be displayed.
- Leave at 0 to keep this unchanged.

Text Alignment:
- Text alignment for Show Choice window.

---

=== Select Plugin Commands ===

---

Select: Weapon
- Opens the Event Select Item Window to let the player pick a weapon to
choose from.
- Can be opened while the Message Window is open.

Variable ID:
- This variable will be used to record the ID of the selected weapon.
- It will result in 0 otherwise.

Weapon Type ID:
- Reduce all the weapons to a specific weapon type.
- Leave at 0 to not use filters.

---

Select: Armor
- Opens the Event Select Item Window to let the player pick an armor to
choose from.
- Can be opened while the Message Window is open.

Variable ID:
- This variable will be used to record the ID of the selected armor.
- It will result in 0 otherwise.

Armor Type ID:
- Reduce all the armors to a specific armor type.
- Leave at 0 to not use filters.

Equip Type ID:
- Reduce all the armors to a specific equip type.
- Leave at 0 to not use filters.

---

Select: Skill
- Opens the Event Select Item Window to let the player pick a skill to
choose from.
- Requires VisuMZ_1_SkillsStatesCore!
- Can be opened while the Message Window is open.
- Skills will not be listed if they are hidden by the actor.
- Skills will not be listed if the actor lacks access to their Skill Type.

Variable ID:
- This variable will be used to record the ID of the selected skill.
- It will result in 0 otherwise.

Actor ID:
- Select an actor to get the skill list from.
- Use 0 to select from the party leader.

Skill Type ID:
- Reduce all the skills to a specific skill type.
- Leave at 0 to not use filters.

---

=== Picture Plugin Commands ===

---

Picture: Change Text
- Change text for target picture(s) to show.
- You may use text codes.
- Text will adapt to picture's properties.
- Settings will be erased if picture is erased.

Picture ID(s):
- The ID(s) of the picture(s) to set text to.

Padding:
- How much padding from the sides should there be?

Text:

Upper Left:
Upper Center:
Upper Right:
Middle Left:
Middle Center:
Middle Right:
Lower Left:
Lower Center:
Lower Right:
- The text that's aligned to this picture's side.
- You may use text codes.

---

Picture: Erase Text
- Erase all text for target picture(s).

Picture ID(s):
- The ID(s) of the picture(s) to erase text for.

---

Picture: Refresh Text
- Refreshes the text used for all on-screen pictures.
- To be used if any dynamic text codes are updated like \n[x].

---

Plugin Parameters: General Settings

General settings involving the message system. These settings range from
adjust how the Message Window looks to more intricate settings like how
some of the default text codes work.

---

Message Window

Default Rows:
- Default number of rows to display for the Message Window.

Default Width:
- Default Message Window width in pixels.

Fast Forward Key:
- This is the key used for fast forwarding messages.
- WARNING: If this key is the same as the dash button, this will clear out
any held down inputs upon triggering an event  to prevent players from
skipping potentially useful information stored in messages. If you do
not want the input to be cleared, use a different key.

Text Delay:
- How many frames to wait between characters drawn?
- Use 0 for instant.

Offset X:
Offset Y:
- Offset Message Window horizontally or vertically.
- Horizontal: Left; Positive: Right
- Veritcal: Negative: Up; Positive: Down

Stretch Dimmed BG:
- Stretch dimmed window background to fit the whole screen.

Default Outline Width:
- Changes the default outline width to this many pixels thick.

Each Message Start:
Each Message End:
- This is text that is added at the start/end of each message.
- You may use text codes.
- Keep in mind that if a message extends to a different page (due to word
wrap, excess lines, etc), that does not mean the starting text will
be added to where the next page begins or the ending text will be added
where the previous page ends.
- Can be used for things like adding "<center>" to the start of each
message without having to type it every time.

---

Name Box Window

Default Color:
- Default color for the Name Box Window's text.

Offset X:
- How much to offset the name box window X by
(as long as it doesn't go offscreen).

Offset Y:
- How much to offset the name box window Y by
(as long as it doesn't go offscreen).

---

Choice List Window

Line Height:
- What is the default line height for Show Choices?

Minimum Choice Width:
- What is the minimum choice width for each choice?
- 96 is the default width.

Max Rows:
- Maximum number of rows to visibly display?

Max Columns:
- Maximum number of columns to visibly display?

Text Alignment:
- Default alignment for Show Choice window.

---

Default Text Codes

Relative \PX \PY:
- Make \PX[x] and \PY[x] adjust relative starting position than
exact coordinates.

\{ Maximum:
- Determine the maximum size that \{ can reach.

\} Minimum:
- Determine the minimum size that \} can reach.

\{ Change \}
- How much does \{ and \} change font size by?

---

Plugin Parameters: Auto-Color Settings

For certain windows such as the Message Window, Help Window, and Choice
Window, Auto-Color is enabled to automatically highlight and color certain
database entries, keywords, and just about anything you, the game dev, wants
to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
every time Jack's name is written out as it will be automatically colored in
those specific windows.

The Plugin Parameters will give you full reign over which database entries
and keywords you want to be automatically colored as long as they follow a
few rules:

Auto-Color Rules:

1. Database names and keywords are case sensitive.
This means if "Potion" is a marked keyword, typing out "potion" will not
prompt the auto-color to highlight "potion". You must add the lowercase
version of the word into the keyword list if you want it to count.

2. Database names and keywords are exact size (for Roman languages)
This means if "Potion" is a marked keyword, typing out "potions" will not
prompt the auto-color to highlight "potions". You must type out all of
the variations of the words you want affected into the keyword list to
prompt the auto-color highlight.

This does not apply to Japanese, Korean, or Chinese languages.

3. Possessive cases and other language symbols aren't counted.
Symbols such as periods, commas, quotes, parentheses, and similar symbols
do no count towards Rule 2. This means if "Potion" is a marked keyword,
the typing out "(Potion)" will still highlight the "Potion" part of the
word according to the auto-color.

4. Names with special characters like !, ?, [, ], etc. will be ignored.
These cause conflicts with how auto-colors are detected.

---

Database Highlighting

Actors:
Classes:
Skills:
Items:
Weapons:
Armors:
Enemies:
States:
- Any usage of a the selected database entry's name is auto-colored with
the text code number.
- Use 0 to not auto-color.

---

Word Highlighting

\C[x]: Color
- These are lists of all the words that will be automatically colored with
the x text color.

---

Plugin Parameters: Custom Font Manager

Custom fonts that aren't the message or number fonts cannot be used without
registration. If you try to use custom fonts in RPG Maker MZ without
registering their font family first, you will find out that they will not
work. These plugin parameters allow you to register your game's custom fonts
here.

---

Settings:

Font Family:
- This will be what's used by RPG Maker MZ and plugins to reference this
specific font.
- NO filename extensions!

Filename:
- What is the filename of the custom font you would like to use?
- Located inside the project's "fonts" folder.

---

Examples:

Font Family: WildWords
Filename: WildWords-Regular.ttf

How you would use this in other plugins as a preface to the font face or
font family would be to use "WildWords" as the font face/family name. Then
RPG Maker MZ will use its own innate FontManager to refer that to the
"WildWords-Regular.ttf" file found in the game's "fonts" folder.

---

Plugin Parameters: Text Code Actions

Text codes are used for one of two things: performing actions or replacing
themselves with text data. This Plugin Parameter will focus on the aspect of
performing actions. These actions can be done through each JavaScript or by
a common event (if it is used in the Message Window). Adequate knowledge of
both is recommended before attempting to modify and/or add new Text Code
Actions to the Plugin Parameters.

Each of the Text Code Actions are formatted in such a way:

---

Text Code Action

Match:
- This is what needs to be matched in order for this text code to work.
- This is the primary text marker after the \ in a text code.
- In \N[x], this would be the 'N'.

Type:
- The type of parameter to obtain (none, number, or string).
- This is the way the text code determines the condition type.
- In \N[x], this would be the '[x]'.

Common Event:
- Select a common event to run when this text code is used in a message.

JS: Action:
- JavaScript code used to perform an action when this text code appears.

---

Plugin Parameters: Text Code Replacements

Text codes are used for one of two things: performing actions or replacing
themselves with text data. This Plugin Parameter will focus on the aspect of
replacing the text codes with text data. Text data can be replaced with
an exact exchange of text or dynamically through JavaScript. Adding a new
Text Code Replacement is done through the Plugin Parameters.

Each of the Text Code Replacements are formatted in such a way:

---

Text Code Replacement

Match:
- This is what needs to be matched in order for this text code to work.
- This is the primary text marker after the \ in a text code.
- In \N[x], this would be the 'N'.

Type:
- The type of parameter to obtain (none, number, or string).
- This is the way the text code determines the condition type.
- In \N[x], this would be the '[x]'.

STR: Text:
- The text that will appear if this match appears.
If this has a value, ignore the JS: Text version.

JS: Text:
- JavaScript code used to determine the text that will appear if this
match appears.

---

Plugin Parameters: Text Macros

Text macros are used in similar fashion to text codes replacements to
replace themselves with text data. The primary difference is that macros are
made in a different format with no conditional argument modifiers (ie the
[x] that follows a text code).

To use a text macro, type in the matching keyword between two [brackets] and
it will be replaced by the string data or run the JavaScript code found in
the Plugin Parameter settings.

For example, if you have the text macro "Leader", made to return the party
leader's name, you can type in [Leader] in the Message Window and it will be
replaced with the party leader's name. The output can also output text codes
into the resulting text.

This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
Use the method stated before with the brackets to [MacroName] instead.

Each of the Text Macros are formatted in such a way:

---

Text Macro

Match:
- This is what needs to be matched in order for this macro to work.
- In [Leader], this would be the 'Leader' text.

STR: Text:
- The replacement text that will appear from the macro.
- If this has a value, ignore the JS: Text version.

JS: Text:
- JavaScript code used to determine the text that will appear if this
macro appears.

---

Plugin Parameters: Text Language Settings

The "Text Language" feature allows your players to switch between different
languages for your game to allow people from around the globe to enjoy what
story you have to tell.

Disclaimers: This is not an automatic translation tool. Translations made
through the "Text Language" feature of the VisuStella MZ Message Core
will require manual input by the game developer.

See the "Text Language Information" for more information.

---

Main Settings:

Enable Switching?:
- Enable language switching settings for this plugin?

CSV Filename:
- What is the filename of the CSV file to read from?
- Located within the project's /data/ folder.

---

Options:

Add Option?:
- Add the 'Text Language' option to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Option Name:
- Command name of the option.

---

Languages:

Default Language:
- What is the default language used for this game?

Supported Languages:
- What are all the supported languages supported by this game's
script?
- Remove any that aren't translated.

---

Language Names:

Bengali:
Chinese (Simplified):
Chinese (Traditional):
Czech:
Danish:
Dutch:
English:
Finnish:
French:
German:
Greek:
Hindi:
Hungarian:
Indonesian:
Italian:
Japanese:
Korean:
Norwegian:
Polish:
Portuguese:
Romanian:
Russian:
Slovak:
Spanish:
Swedish:
Tamil:
Thai:
Turkish:
- How does this language appear in the in-game options?

---

Plugin Parameters: Language Fonts

Different default fonts used for different languages. This allows different
stylistic choices to be made for different languages in case the current
font you're using doesn't have support for other language types.

Keep in mind that players can override this with Options Core if they select
a text option other than 'Default' for the 'Text Font' option.

Make sure any new custom fonts used for different languages are registered
with the 'Custom Font Manager' found in this plugin's Plugin Parameters.

---

Languages:

Bengali:
Chinese (Simplified):
Chinese (Traditional):
Czech:
Danish:
Dutch:
English:
Finnish:
French:
German:
Greek:
Hindi:
Hungarian:
Indonesian:
Italian:
Japanese:
Korean:
Norwegian:
Polish:
Portuguese:
Romanian:
Russian:
Slovak:
Spanish:
Swedish:
Tamil:
Thai:
Turkish:
- What font face is used for this language?
- Make sure it is registered under Custom Font Manager.

---

Plugin Parameters: Language Images

Allows different images to be used when different languages are used. This
is for images that have text on it that you want to appear in different
languages based on the text language selected by the player.

There are two ways this works:

#1: Folder Name
- The name of the folder containing those images will be named something
like "Scrolls[XX]"
- When a different language is picked, like English, it can reference
the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
the 'Scrolls[JP]' folder as well.
- The text used to replace the [XX] in the folder name can be determined
in the Plugin Parameters.
- Make sure you change the settings for each language you wish to use to
have translated images for.

#2: Filename
- The filename of the image to be translated can be named something like
ReidProfile[XX].png
- When a different language is picked, like English, it will reference the
'ReidProfile[EN].png' image instead. For Japanese, it will reference the
'ReidProfile[JP].png' as well.
- The text used to replace the [XX] in the filename can be determined in
the Plugin Parameters.
- Make sure you change the settings for each language you wish to use to
have translated images for.

---

Settings

Convert Default?
- ON: Default language uses converted marker.
- OFF: Default languages uses [XX] as marker.

Here's an explanation of what this does:

- The default language picked is English and the player has English picked
as their desired language.
- If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
will reference and look for the 'ReidProfile[EN]' image.
- If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
then used for the English language instead of 'ReidProfile[EN]'.
- This is to avoid duplicate images and save on file space.
- The reasoning behind the [XX] is that there needs to be an anchor image
used for the RPG Maker MZ client in order to have something to reference
before branching out to different languages.

---

Languages

Bengali:
Chinese (Simplified):
Chinese (Traditional):
Czech:
Danish:
Dutch:
English:
Finnish:
French:
German:
Greek:
Hindi:
Hungarian:
Indonesian:
Italian:
Japanese:
Korean:
Norwegian:
Polish:
Portuguese:
Romanian:
Russian:
Slovak:
Spanish:
Swedish:
Tamil:
Thai:
Turkish:
- This text will replace [XX] with in image folder names and filenames
when this language is selected.

---

Plugin Parameters: Text Speed Option Settings

Modern RPG's on the market have the option to adjust the message speed rate
for players. These Plugin Parameters allow you to add that option to the
Options Menu as well.

---

Text Speed Option Settings

Add Option?:
- Add the 'Text Speed' option to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Option Name:
- Command name of the option.

Default Value:
- 1 - 10, slowest to fastest.
- 11 is instant value.

Instant Speed:
- Text to show "instant" text.

---

Plugin Parameters: Word Wrap Settings

Word wrap is a property that will cause any overflowing text to wrap around
and move into the next line. This property can only be enabled inside text
that accept text codes, such as the Message Window and Help Window. However,
word wrap is disabled for the Choice Window due to the nature of the Choice
Window's base properties.

Word wrap can be enabled or disabled in three ways. One is by using the text
code <WordWrap> to enable it or </WordWrap> to disable it. The second method
is by enabling it with the Plugin Command: 'Message: Properties'. The third
method is by enabling it by default with the Plugin Parameters.

Word wrap only supports left-to-right alphabetical languages that utilize
spaces.

Word Wrap also cannot be used together with <left>, <center>, or <right> and
will disable itself if text alignment text codes are detected.

are now supported for word wrap. Korean language is only supported if spaces
are used.

---

Enable Word Wrap

Message Window:
- Automatically enable Word Wrap for this window?

Help Window:
- Automatically enable Word Wrap for this window?

---

Rules

Link Break -> Space:
- Convert manually placed (non tagged) line breaks with spaces?
- Line breaks must be inserted using the <br> text code.

Tight Wrap:
- If a face graphic is present in a message, word wrap will be tighter.

End Padding:
- Add extra padding to your window to make text wrap further away from the
end of the window.
- This will default to 0.

---
```
