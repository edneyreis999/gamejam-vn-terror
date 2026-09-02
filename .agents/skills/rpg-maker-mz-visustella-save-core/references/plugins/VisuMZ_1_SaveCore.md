# VisuMZ_1_SaveCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_SaveCore`
- Contract: [RPG Maker MZ] [Tier 1] [SaveCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| SaveCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Save:struct | Save Settings | — | struct&lt;Save&gt; | {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""} | — | General save settings pertaining to the game. |
| SaveConfirm:struct | Confirm Window | Save:struct | struct&lt;SaveConfirm&gt; | {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"} | — | Settings regarding the Save Confirmation Window. |
| Autosave:struct | Autoave Settings | — | struct&lt;Autosave&gt; | {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""} | — | Game settings related to autosave. |
| AutosaveConfirm:struct | Confirm Window | Autosave:struct | struct&lt;AutosaveConfirm&gt; | {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I\[193\]Autosaved!","VocabAutosaveFailure:str":"\\I\[194\]Autosave failed!"} | — | Settings regarding the Autosave Confirmation Window. |
| AutosaveOption:struct | Options Settings | Autosave:struct | struct&lt;AutosaveOption&gt; | {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:eval":"true"} | — | Options Menu settings regarding Autosave. |
| StyleBreak | -------------------------- | — | — | ---------------------------------- | — | — |
| ActorGraphic:str | Actor Graphic | — | select | face | None=none; Face=face; Map Sprite=sprite; Sideview Battler=svbattler | Choose how the actor graphics appear in save menus. |
| SaveMenuStyle:str | Save Menu Style | — | select | box | List=list; Vertical=vertical; Box=box; Large=large | Choose what kind of style to use for the Save Menu. |
| SaveMenu:struct | Style Settings | SaveMenuStyle:str | struct&lt;SaveMenu&gt; | {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments\[0\];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() \|\| '';\\ninfo.picture = $gameSystem.getSavePicture() \|\| '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold \|\| info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments\[0\];\\nconst rect = arguments\[1\];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""} | — | Settings regarding the individual Save Menu styles. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Save

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| SaveStyle:str | Save Style | General | select | standard | Standard: Save freely in any slot.=standard; Slot-Locked: Select one dedicated slot at New Game.=locked; Single: Only one slot is available for the game.=single | Select a save style for the game. Some of these options may alter other Plugin Parameter settings. |
| MaxSaveFiles:num | Max Save Files | General | — | 20 | — | Maximum number of save files for the game. |
| AutosaveMaxCount:eval | Autosave Counts? | General | boolean | false | — | Count the autosave file towards the max count? |
| LocalMode | Local Mode | — | — | — | — | — |
| LocalMode:eval | Local Mode? | LocalMode | boolean | true | — | When running the game on client, use the Local Mode of saving via files or store saves to forage keys? |
| FilenameFmt:str | Filename Format | LocalMode | — | file%1 | — | Filename format for save files. %1 - Save File ID |
| ExtensionFmt:str | Extension Format | LocalMode | — | %1.rmmzsave | — | Filename extension format for save files. %1 - Save Name |
| ForageKey | Forage Key | — | — | — | — | — |
| KeyFmt:str | Forage Key Format | ForageKey | — | rmmzsave.%1.%2 | — | Forage Key format when saving to memory. %1 - Game ID, %2 - Save Name |
| TestKey:str | Forage Key Test | ForageKey | — | rmmzsave.test | — | Key used to test if saving a forage key is possible. |
| Vocabulary | — | — | — | — | — | — |
| VocabLockedSaveSlot:str | Help: Slot-Locked | Vocabulary | — | Pick a file to start a new game. | — | Help description used for initial slot-locked selection. |
| JavaScript | — | — | — | — | — | — |
| OnSaveSuccessJS:func | JS: On Save Success | JavaScript | note | "// Declare Constants\nconst scene = this;\n\n// Actions\n" | — | Code to perform when a save is successful. |
| OnSaveFailureJS:func | JS: On Save Failure | JavaScript | note | "// Declare Constants\nconst scene = this;\n\n// Actions\n" | — | Code to perform when a save has failed. |
| OnLoadSuccessJS:func | JS: On Load Success | JavaScript | note | "// Declare Constants\nconst scene = this;\n\n// Actions\n" | — | Code to perform when a load is successful. |
| OnLoadFailureJS:func | JS: On Load Failure | JavaScript | note | "// Declare Constants\nconst scene = this;\n\n// Actions\n" | — | Code to perform when a load has failed. |

### Struct: SaveConfirm

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| Enable:eval | Enable Window? | General | boolean | true | — | Enable the Save Confirmation Window? |
| Duration:num | Pop Up Duration | General | number | 1000 | — | How long should the window be open for before closing? Insert the time in milliseconds. |
| ConfirmRect:func | JS: X, Y, W, H | General | note | "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions of the Save Confirmation Window. |
| Vocabulary | — | — | — | — | — | — |
| VocabSaveSuccess:str | Pop Up: Save Success | Vocabulary | — | Save Successful! | — | Text used for a "Save Success" message popup. Text codes are allowed. |
| VocabSaveFailure:str | Pop Up: Save Failure | Vocabulary | — | Could not save! | — | Text used for a "Save Failure" message popup. Text codes are allowed. |
| VocabLoadFailure:str | Pop Up: Load Failure | Vocabulary | — | Could not load save file! | — | Text used for a "Load Failure" message popup. Text codes are allowed. |

### Struct: Autosave

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| AutosaveType:str | Autosave Type | General | select | file0 | Autosave File: Dedicated file for autosaves.=file0; Current File: Overwrites the current save file.=current; Autosave File + Current File: Both of the above.=both | Select autosave type. Requires Database =&gt; System 1 =&gt; \[x\] Enable Autosave |
| Requests | — | — | — | — | — | — |
| RequestsRequireSaveEnable:eval | Requires Save Enable? | Requests | boolean | true | — | Autosave requests require Saving to be enabled? |
| AfterBattle:eval | Request after Battle? | Requests | boolean | true | — | Requests an autosave after battle? |
| AfterTransfer:eval | Request on Transfer? | Requests | boolean | true | — | Requests an autosave after a map transfer? |
| AfterMenuCall:eval | Request on Menu Open? | Requests | boolean | true | — | Requests an autosave after opening the main menu? |
| AfterExitMenu:eval | Request on Menu Exit? | Requests | boolean | true | — | Requests an autosave after exiting the main menu? |
| JavaScript | — | — | — | — | — | — |
| OnAutosaveSuccessJS:func | JS: On Success | JavaScript | note | "// Declare Constants\nconst scene = this;\n\n// Actions\n" | — | Code to perform when an autosave is successful. |
| OnAutosaveFailureJS:func | JS: On Failure | JavaScript | note | "// Declare Constants\nconst scene = this;\n\n// Actions\n" | — | Code to perform when an autosave has failed. |

### Struct: AutosaveConfirm

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| Enable:eval | Enable Window? | General | boolean | true | — | Enable the Autoave Confirmation Window? |
| Duration:num | Pop Up Duration | General | number | 1000 | — | How long should the window be open for before closing? Insert the time in milliseconds. |
| ScreenPosition:str | Screen Position | General | select | lower right | Lower Left=lower left; Lower Center=lower center; Lower Right=lower right; Middle Left=middle left; Middle Center=middle center; Middle Right=middle right; Upper Left=upper left; Upper Center=upper center; Upper Right=upper right | Where does this window appear on the screen? |
| Vocabulary | — | — | — | — | — | — |
| VocabAutosaveSuccess:str | Pop Up: Save Success | Vocabulary | — | \I\[193\]Autosaved! | — | Text used for an "Autosave Success" message popup. Text codes are allowed. |
| VocabAutosaveFailure:str | Pop Up: Save Failure | Vocabulary | — | \I\[194\]Autosave failed! | — | Text used for an "Autosave Failure" message popup. Text codes are allowed. |

### Struct: AutosaveOption

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AddOption:eval | Add Option? | — | boolean | true | — | Add the 'Autosave' option to the Options menu? |
| AdjustRect:eval | Adjust Window Height | — | boolean | true | — | Automatically adjust the options window height? |
| Name:str | Option Name | — | — | Autosave | — | Command name of the option. |
| Default:eval | Default Value | — | boolean | true | — | Determine the default value of this option. |

### Struct: SaveMenu

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| LatestText:str | Latest Text | General | — | NEW! | — | Text used to depict latest save file. |
| LatestColor:str | Latest Color | General | — | #f49ac1 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| SpriteWidth:num | Sprite Width | General | number | 48 | — | Pixel width of map sprites when drawn in the Save Menu. |
| SvBattlerWidth:num | SV Battler Width | General | number | 64 | — | Pixel width of sv battlers when drawn in the Save Menu. |
| MakeSavefileInfoJS:func | JS: Save Display Info | General | note | "// Declare Constants\nconst info = arguments\[0\];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() \|\| '';\ninfo.picture = $gameSystem.getSavePicture() \|\| '';\n\n// Return Save Info\nreturn info;" | — | Code that, upon saving, determines which info is quickly stored for displaying. |
| List | List Style | — | — | — | — | — |
| ListRows:num | Rows | List | number | 4 | — | Number of rows for this style. |
| ListCols:num | Columns | List | number | 1 | — | Number of column for this style. |
| ListContentsJS:func | JS: Draw Contents | List | note | "// Declare Variables\nconst info = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold \|\| info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');" | — | Code on how to draw the contents for this style. |
| ListFileDataJS:func | JS: Draw File Data | List | note | "// Declare Constants\nconst savefileId = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);" | — | Code on how to draw the file data for this style. |
| Vertical | Vertical Style | — | — | — | — | — |
| VertRows:num | Rows | Vertical | number | 1 | — | Number of rows for this style. |
| VertCols:num | Columns | Vertical | number | 3 | — | Number of column for this style. |
| VertContentsJS:func | JS: Draw Contents | Vertical | note | "// Declare Variables\nconst info = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}" | — | Code on how to draw the contents for this style. |
| VertFileDataJS:func | JS: Draw File Data | Vertical | note | "// Declare Constants\nconst savefileId = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);" | — | Code on how to draw the file data for this style. |
| Box | Box Style | — | — | — | — | — |
| BoxRows:num | Rows | Box | number | 2 | — | Number of rows for this style. |
| BoxCols:num | Columns | Box | number | 3 | — | Number of column for this style. |
| BoxContentsJS:func | JS: Draw Contents | Box | note | "// Declare Variables\nconst info = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);" | — | Code on how to draw the contents for this style. |
| BoxFileDataJS:func | JS: Draw File Data | Box | note | "// Declare Constants\nconst savefileId = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);" | — | Code on how to draw the file data for this style. |
| Large | Large Style | — | — | — | — | — |
| LargeRows:num | Rows | Large | number | 1 | — | Number of rows for this style. |
| LargeCols:num | Columns | Large | number | 1 | — | Number of column for this style. |
| LargeContentsJS:func | JS: Draw Contents | Large | note | "// Declare Variables\nconst info = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}" | — | Code on how to draw the contents for this style. |
| LargeFileDataJS:func | JS: Draw File Data | Large | note | "// Declare Constants\nconst savefileId = arguments\[0\];\nconst rect = arguments\[1\];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);" | — | Code on how to draw the file data for this style. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Autosave: Enable/Disable

- Command ID: `AutosaveEnable`
- Description: Requires Enables/disables Autosave on a local (lowest) level. Requires Database => System 1 => [x] Enable Autosave

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable or Disable? | boolean | true | — | Enable or disable autosave? @ -------------------------------------------------------------------------- |

### Autosave: (Stage 1) Request

- Command ID: `AutosaveRequest`
- Description: Autosaves the game at current point if enabled. Requires Database => System 1 => [x] Enable Autosave @ --------------------------------------------------------------------------

No arguments are declared.

### Autosave: (Stage 2) Execute

- Command ID: `AutosaveExecute`
- Description: Executes autosaves the game at the current point. Requires Database => System 1 => [x] Enable Autosave @ --------------------------------------------------------------------------

No arguments are declared.

### Autosave: (Stage 3) Force

- Command ID: `AutosaveForce`
- Description: Force autosaves the game at the current point. Requires Database => System 1 => [x] Enable Autosave @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_Save`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Save: Current Slot

- Command ID: `SaveCurrentSlot`
- Description: Process the game's current save at the current point. Must be outside of battle and on the map. @ --------------------------------------------------------------------------

No arguments are declared.

### Save: Set Description

- Command ID: `SaveDescription`
- Description: Set the description text that will appear in the save files.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:str | Text | — | Text | — | Insert desired save description text here. Text codes supported. \V\[x\], \N\[x\], \P\[x\] are save local. @ -------------------------------------------------------------------------- |

### Save: Set Picture

- Command ID: `SavePicture`
- Description: Set the picture that would appear in the save file.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Filename:str | Filename | file | — | — | Input the filename here of the desired picture. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Save Core plugin adds upon the existing functionality of how saves
operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
autosaves is also provided by this plugin as well as the ability to make
Global Switches and Variables accessible across all game saves (including
new games).

Features include all (but not limited to) the following:

* Save file technicalities including how filenames are made and or how
forage keys are labeled to distinguish games from one another.
* Save types (standard, slot-locked, or single) to change saving to be
suited for each game type.
* Save confirmation window added to relay information to player on whether
or not a save has been made successfully.
* Global Switches and Variables that span across all saves and new games.
* Control over how autosaves handle (their own file, save over existing
files, and/or both).
* Plugin Commands that enable/disable autosaves and forcefully activate them
or request them.
* Change up how the Save Menu appears with various save styles.
* Add descriptions and pictures to the save files.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Global Switches and Global Variables

Global Switches and Global Variables are now added into the game engine via
this plugin. Global Switches and Global Variables exist in the same state
across all save files. This means if Switch 40 is declared to be a Global
Switch and is turned ON, then whether you start up a new game or open a
different save file, Switch 40 will be in the ON state. Similar will occur
with Global Variables.

---

<Global> Switch/Variable Name

To declare Global Switches and/or Global Variables, insert <Global> into
the Switch/Variable's name. That's all there is to it. Whatever value you
change the Global Switch/Variable to after declaring it will be changed
across all saves.

---

NOTE: Tagged Switches/Variables are mutually exclusive from one another.
You cannot tag them with <Global>, <JS>, or <Self> simultaneously.

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Autosave Plugin Commands ===

---

Autosave: Enable/Disable
- Enables/disables Autosave on a local (lowest) level.
- Requires Database => System 1 => [x] Enable Autosave
- This does NOT mean it will change autosaving for other loaded game saves
or new game sessions.
- This ONLY applies to the local session for the dev to control whether or
not autosaving will occur at its usual conditions and scenarios.

Enable or Disable?:
- Enable or disable autosave?

---

Autosave: (Stage 1) Request
- Autosaves the game at current point if enabled.
- Requires Database => System 1 => [x] Enable Autosave
- Autosave does not go through if it is neither enabled in the database or
in-game through the "Autosave: Enable/Disable" plugin command.
- This Plugin Command will not autosave if the player turned off "Autosave"
in the Options Menu.

---

Autosave: (Stage 2) Execute
- Executes autosaves the game at the current point.
- Requires Database => System 1 => [x] Enable Autosave
- This will require autosave to be enabled through the database, but it will
ignore the "Autosave: Enable/Disable" plugin command state.
- This Plugin Command will not autosave if the player turned off "Autosave"
in the Options Menu.

---

Autosave: (Stage 3) Force
- Forces autosaves the game at the current point.
- Requires Database => System 1 => [x] Enable Autosave
- This will require autosave to be enabled through the database, but it will
ignore the "Autosave: Enable/Disable" plugin command state.

---

Save: Current Slot
- Process the game's current save at the current point.
- Must be outside of battle and on the map.

---

=== Save Plugin Commands ===

---

Save: Set Description
- Set the description text that will appear in the save files.

Text:
- Insert desired save description text here.
- Text codes supported.
- \V[x], \N[x], \P[x] are save local.
- Other text codes will draw data from the currently active game.

---

Save: Set Picture
- Set the picture that would appear in the save file.

Filename:
- Input the filename here of the desired picture.

---

Plugin Parameters: General Save Settings

These are general settings pertaining to saves and the technicalities behind
how saves work in your game.

---

General

Save Style:
- Select a save style for the game. Some of these options may alter other
Plugin Parameter settings.
- Standard: Save freely in any slot.
- Slot-Locked: Select one dedicated slot at New Game.
- Single: Only one slot is available for the game.

Max Save Files:
- Maximum number of save files for the game.

Autosave Counts?:
- Count the autosave file towards the max count?

---

Local Mode

Local Mode?:
- When running the game on client, use the Local Mode of saving via files
or store saves to forage keys?

Filename Format:
- Filename format for save files.
- %1 - Save File ID

Extension Format:
- Filename extension format for save files.
- %1 - Save Name

---

Forage Key

Forage Key Format:
- Forage Key format when saving to memory.
- %1 - Game ID, %2 - Save Name

Forage Key Test:
- Key used to test if saving a forage key is possible.

---

Vocabulary

Help: Slot-Locked:
- Help description used for initial slot-locked selection.

---

JavaScript

JS: On Save Success:
- Code to perform when a save is successful.

JS: On Save Failure:
- Code to perform when a save has failed.

JS: On Load Success:
- Code to perform when a load is successful.

JS: On Load Failure:
- Code to perform when a load has failed.

---

Plugin Parameters: Save Confirm Window Settings

The Save Confirmation Window is a new feature added through this plugin.
It gives the player visual feedback letting the player know that a save is
successful or not.

---

General

Enable Window?:
- Enable the Save Confirmation Window?

Pop Up Duration:
- How long should the window be open for before closing?
- Insert the time in milliseconds.

JS: X, Y, W, H:
- Code used to determine the dimensions of the Save Confirmation Window.

---

Vocabulary

Pop Up: Save Success:
- Text used for a "Save Success" message popup.
- Text codes are allowed.

Pop Up: Save Failure:
- Text used for a "Save Failure" message popup.
- Text codes are allowed.

Pop Up: Load Failure:
- Text used for a "Load Failure" message popup.
- Text codes are allowed.

---

Plugin Parameters: Autosave Settings

These settings adjust how autosaves work in your game project. The settings
will encompass the original autosave settings made by RPG Maker MZ as well
as new settings added through this plugin.

---

General

Autosave Type:
- Select autosave type.
- Requires Database => System 1 => [x] Enable Autosave
- Autosave File: Dedicated save file for autosaves.
- Current File: Overwrites the current save file.
- Autosave File + Current File: Both of the above.

---

Requests

Requires Save Enable?:
- Autosave requests require Saving to be enabled?

Request after Battle?:
- Requests an autosave after battle?

Request on Transfer?:
- Requests an autosave after a map transfer?

Request on Menu Open?:
- Requests an autosave after opening the main menu?

Request on Menu Exit?:
- Requests an autosave after exiting the main menu?

---

JavaScript

JS: On Success:
- Code to perform when an autosave is successful.

JS: On Failure:
- Code to perform when an autosave has failed.

---

Plugin Parameters: Autosave Confirm Window Settings

The Autosave Confirmation Window is a new feature added by this plugin to
notify the player whenever autosaving occurs.

---

General

Enable Window?:
- Enable the Autoave Confirmation Window?

Pop Up Duration:
- How long should the window be open for before closing?
- Insert the time in milliseconds.

Screen Position:
- Where does this window appear on the screen?
- Lower Left
- Lower Center
- Lower Right
- Middle Left
- Middle Center
- Middle Right
- Upper Left
- Upper Center
- Upper Right

---

Vocabulary

Pop Up: Save Success:
- Text used for an "Autosave Success" message popup.
- Text codes are allowed

Pop Up: Save Failure:
- Text used for an "Autosave Failure" message popup.
- Text codes are allowed.

---

Plugin Parameters: Autosave Options Settings

This plugin adds the "Autosave" option to the Options menu, allowing players
to decide if they want autosave enabled or not. This feature can be disabled
as well, to better suit games. If the "Autosave" option is turned off by the
player, then any Autosave requests and executions.

---

Autosave Options

Add Option?:
- Add the 'Autosave' option to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Option Name:
- Command name of the option.

Default Value:
- Determine the default value of this option.

---

Plugin Parameters: Actor Graphic Settings

This Plugin Parameter lets you select which graphic to use for displaying
the actor party found inside the save menu.

---

Actor Graphic

None:
- Don't display any actors.

Face:
- Display the face graphics for the actors.

Map Sprite:
- Display the sprite graphics for the actors.

Sideview Battler:
- Display the SV Battler graphics for the actors.
- Note: If you have an existing save made before this plugin was
installed, you may need to save over the existing ones to see the
Sideview Battler graphics.

---

Plugin Parameters: Save Menu Styles

Save Menu Styles affect how the save files themselves appear to the player,
as long horizontal lists, vertical columns, small boxes, or a large file.

---

Save Menu Styles

List:
- Save files stretch horizontally across the screen.
- Save files are listed as rows.

Vertical:
- Save files are stretched vertically across the screen.
- Save files are depicted as columns.

Box:
- Save files are small boxes shown on the screen.
- Save files are sign in both rows and columns.

Large:
- Save files take up the whole screen.

---

Plugin Parameters: Style Settings

These settings allow you, the game dev, to manipulate how the save styles
appear in-game if they're not to your liking. JavaScript familiarity is a
must to adjust them.

---

General

Latest Text:
- Text used to depict latest save file.
- The "NEW!" text will not appear on auto save slots. This is intentional.

Latest Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Sprite Width:
- Pixel width of map sprites when drawn in the Save Menu.

SV Battler Width:
- Pixel width of sv battlers when drawn in the Save Menu.

JS: Save Display Info:
- Code that, upon saving, determines which info is quickly stored
for displaying.

---

List Style
Vertical Style
Box Style
Large Style

Rows:
- Number of rows for this style.

Columns:
- Number of column for this style.

JS: Draw Contents:
- Code on how to draw the contents for this style.

JS: Draw File Data:
- Code on how to draw the file data for this style.

---
```
