# VisuMZ_1_ItemsEquipsCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_ItemsEquipsCore`
- Contract: [RPG Maker MZ] [Tier 1] [ItemsEquipsCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| ItemsEquipsCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| ItemScene:struct | Item Menu Settings | — | struct&lt;ItemScene&gt; | {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"} | — | Change the Item Menu Scene settings. |
| Categories:struct | Item Categories | ItemScene:struct | struct&lt;Categories&gt; | {"MainList":"","List:arraystruct":"\[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"\]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"} | — | Change the categories displayed in the Item/Shop menus. |
| New:struct | NEW! Labels | ItemScene:struct | struct&lt;NewLabel&gt; | {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"} | — | Change how NEW! Labels apply to your game project. |
| EquipScene:struct | Equip Menu Settings | — | struct&lt;EquipScene&gt; | {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param =&gt; this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth &gt;= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides &gt; 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"\[\]","NonOptimizeETypes:arraynum":"\[\]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"} | — | Adjust the settings regarding the Equip Menu Scene. |
| ShopScene:struct | Shop Menu Settings | — | struct&lt;ShopScene&gt; | {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments\[0\];\\nlet price = arguments\[1\];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments\[0\];\\nlet price = arguments\[1\];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"} | — | Change the Shop Menu Scene settings. |
| StatusWindow:struct | Shop Status Window | ShopScene:struct | struct&lt;StatusWindow&gt; | {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i &lt; actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i &lt; actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"\[\"HIT\"\]","ClassicArmorParameters:arraystr":"\[\"EVA\"\]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"\[\"HIT\",\"CNT\"\]","DoubleArmorParameters:arraystr":"\[\"EVA\",\"GRD\"\]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion &lt; 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion &lt; 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I\[97\]Weapon","ElementNone:str":"\\I\[160\]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"} | — | Change the Item Status Window settings. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: ItemScene

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| EnableLayout:eval | Use Updated Layout | General | boolean | true | — | Use the Updated Item Menu Layout provided by this plugin? This will override the Core Engine windows settings. |
| LayoutStyle:str | Layout Style | General | select | upper/left | Upper Help, Left Input=upper/left; Upper Help, Right Input=upper/right; Lower Help, Left Input=lower/left; Lower Help, Right Input=lower/right | If using an updated layout, how do you want to style the menu scene layout? |
| ListWindow | List Window | — | — | — | — | — |
| ListWindowCols:num | Columns | ListWindow | number | 1 | — | Number of maximum columns. |
| ItemQt | Item Quantity | — | — | — | — | — |
| MaxItems:num | Item Max | ItemQt | — | 99 | — | The default maximum quantity for items. |
| MaxWeapons:num | Weapon Max | ItemQt | — | 99 | — | The default maximum quantity for weapons. |
| MaxArmors:num | Armor Max | ItemQt | — | 99 | — | The default maximum quantity for armors. |
| ItemQuantityFmt:str | Quantity Format | ItemQt | — | ×%1 | — | How to display an item's quantity. %1 - Item Quantity |
| ItemQuantityFontSize:num | Font Size | ItemQt | — | 22 | — | Default font size for item quantity. |
| ShopStatusWindow | Shop Status Window | — | — | — | — | — |
| ShowShopStatus:eval | Show in Item Menu? | ShopStatusWindow | boolean | true | — | Show the Shop Status Window in the Item Menu? This is enabled if the Updated Layout is on. |
| ItemSceneAdjustItemList:eval | Adjust List Window? | ShopStatusWindow | boolean | true | — | Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window? |
| ItemMenuStatusBgType:num | Background Type | ShopStatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| ItemMenuStatusRect:func | JS: X, Y, W, H | ShopStatusWindow | note | "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this Status Window in the Item Menu. |
| ButtonAssist | Button Assist Window | — | — | — | — | — |
| buttonAssistCategory:str | Switch Category | ButtonAssist | — | Switch Category | — | Button assist text used for switching categories. For VisuStella MZ's Core Engine's Button Assist Window. |

### Struct: Categories

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| MainList | List | — | — | — | — | — |
| List:arraystruct | Category List | MainList | struct&lt;Category&gt;\[\] | \["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"\] | — | A list of the item categories displayed in the Item/Shop menus. |
| Style:str | Category Style | MainList | select | icon | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw categorie entries in the Category Window? |
| TextAlign:str | Text Alignment | MainList | combo | center | left; center; right | Decide how you want the text to be aligned. |
| Vocabulary | — | — | — | — | — | — |
| HiddenItemA:str | Hidden Item A | Vocabulary | — | Special Items | — | How this category is named in the Item Menu. |
| HiddenItemB:str | Hidden Item B | Vocabulary | — | Unique Items | — | How this category is named in the Item Menu. |
| Consumable:str | Consumable | Vocabulary | — | Consumable | — | How this category is named in the Item Menu. |
| Nonconsumable:str | Nonconsumable | Vocabulary | — | Nonconsumable | — | How this category is named in the Item Menu. |
| AlwaysUsable:str | Always Usable | Vocabulary | — | Usable | — | How this category is named in the Item Menu. |
| BattleUsable:str | Battle Usable | Vocabulary | — | Battle | — | How this category is named in the Item Menu. |
| FieldUsable:str | Field Usable | Vocabulary | — | Field | — | How this category is named in the Item Menu. |
| NeverUsable:str | Never Usable | Vocabulary | — | Materials | — | How this category is named in the Item Menu. |

### Struct: Category

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Type:str | Type | — | combo | RegularItems | AllItems; ; RegularItems; KeyItems; HiddenItemA; HiddenItemB; ; Consumable; Nonconsumable; ; AlwaysUsable; BattleUsable; FieldUsable; NeverUsable; ; AllWeapons; WType:x; ; AllArmors; AType:x; ; EType:x; ; Category:x; | A list of the item categories displayed in the Item/Shop menus. Replace x with ID numbers or text. |
| Icon:num | Icon | — | — | 0 | — | Icon used for this category. Use 0 for no icon. |
| SwitchID:num | Visibility Switch | — | switch | 0 | — | This Switch must be turned ON in order for the category to show. Use 0 for no Switch requirement. |
| SortBy:str | Sorted By | — | select | ID | ID; Name | Sort this category (in Scene_Item and Scene_Shop only) this way. |

### Struct: NewLabel

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Enable:eval | Use NEW! Labels? | — | boolean | true | — | Use the NEW! Labels or not? |
| Icon:num | Icon | — | — | 0 | — | The icon index used to represent the NEW! text. Use 0 to not draw any icons. |
| Text:str | Text | — | — | NEW! | — | The text written on the NEW! Label. |
| FontColor:str | Font Color | Text:str | — | 17 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| FontFace:str | Font Face | Text:str | — | Verdana | — | Font face used for the NEW! Label. |
| FontSize:str | Font Size | Text:str | — | 16 | — | The font size used for the NEW! text. |
| FadeLimit:num | Fade Limit | — | — | 360 | — | What's the upper opaque limit before reversing? |
| FadeSpeed:num | Fade Speed | — | — | 4 | — | What's the fade speed of the NEW! Label? |
| OffsetX:num | Offset X | — | — | 0 | — | How much to offset the NEW! Label's X position by. |
| OffsetY:num | Offset Y | — | — | 4 | — | How much to offset the NEW! Label's Y position by. |

### Struct: EquipScene

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| EnableLayout:eval | Use Updated Layout | General | boolean | true | — | Use the Updated Equip Layout provided by this plugin? This will override the Core Engine windows settings. |
| LayoutStyle:str | Layout Style | General | select | upper/right | Upper Help, Left Input=upper/left; Upper Help, Right Input=upper/right; Lower Help, Left Input=lower/left; Lower Help, Right Input=lower/right | If using an updated layout, how do you want to style the menu scene layout? |
| ParamValueFontSize:num | Param Font Size | EnableLayout:eval | — | 22 | — | The font size used for parameter values. |
| MenuPortraits:eval | Show Menu Portraits? | EnableLayout:eval | boolean | true | — | If Main Menu Core is installed, display the Menu Portraits instead of the actor's face in the status window? |
| DrawPortraitJS:func | JS: Portrait Upper | EnableLayout:eval | note | "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);" | — | If Menu Portraits are available, this is code used to draw the upper data like this in the Status Window. |
| DrawFaceJS:func | JS: Face Upper | EnableLayout:eval | note | "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);" | — | If faces used used, this is code used to draw the upper data like this in the Status Window. |
| DrawParamJS:func | JS: Parameter Lower | EnableLayout:eval | note | "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param =&gt; this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth &gt;= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides &gt; 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}" | — | Code to determine how parameters are drawn in the Status Window. |
| StatusWindowWidth:num | Status Window Width | General | — | 312 | — | The usual width of the status window if using the non-Updated Equip Menu Layout. |
| DrawBackRect:eval | Show Back Rectangles? | General | boolean | true | — | Show back rectangles of darker colors to display information better? |
| BackRectColor:str | Back Rectangle Color | DrawBackRect:eval | — | 19 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| CursedTextPopup:json | Cursed Equip Popup | General | note | "%1 is cursed by %3%2!" | — | %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed. Requires VisuMZ_0_CoreEngine! Empty to not use. |
| Command | Command Window | — | — | — | — | — |
| CmdStyle:str | Style | Command | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw commands in the Command Window? |
| CmdTextAlign:str | Text Align | Command | combo | center | left; center; right | Text alignment for the Command Window. |
| CmdIconEquip:num | Equip Icon | Command | — | 136 | — | The icon used for the Equip command. |
| equipCmdDesc:json | Help Description | CmdIconEquip:num | note | "Pick and choose equipment to change." | — | Help description used when this command is selected. Text codes allowed. |
| CommandAddOptimize:eval | Add Optimize Command? | Command | boolean | true | — | Add the "Optimize" command to the Command Window? |
| optimizeCmdDesc:json | Help Description | CommandAddOptimize:eval | note | "Equip the strongest available equipment." | — | Help description used when this command is selected. Text codes allowed. |
| CmdIconOptimize:num | Optimize Icon | CommandAddOptimize:eval | — | 137 | — | The icon used for the Optimize command. |
| CommandAddClear:eval | Add Clear Command? | Command | boolean | true | — | Add the "Clear" command to the Command Window? |
| clearCmdDesc:json | Help Description | CommandAddClear:eval | note | "Remove all available equipment." | — | Help description used when this command is selected. Text codes allowed. |
| CmdIconClear:num | Clear Icon | CommandAddClear:eval | — | 135 | — | The icon used for the Clear command. |
| RemoveEquip | Remove Equip | — | — | — | — | — |
| RemoveEquipIcon:num | Icon | RemoveEquip | — | 16 | — | Icon used for equipment removal. |
| RemoveEquipText:str | Text | RemoveEquip | — | Remove | — | Text used for equipment removal. |
| ShiftShortcutKey:eval | Use SHIFT Shortcut? | RemoveEquip | boolean | true | — | Add the "Shift" button as a shortcut key to removing items? |
| Rulings | — | — | — | — | — | — |
| EquipAdjustHpMp:eval | Equip-Adjust HP/MP | Rulings | boolean | true | — | Adjust HP/MP differences after changing equips with MaxHP/MaxMP values. |
| NonRemoveETypes:arraynum | Non-Removable Types | Rulings | number\[\] | \[\] | — | Insert ID's of the Equipment Types that must always have an item equipped and cannot be empty. |
| NonOptimizeETypes:arraynum | Non-Optimized Types | Rulings | number\[\] | \[\] | — | Insert ID's of the Equipment Types that will be ignored when equipment is being optimized. |
| ButtonAssist | Button Assist Window | — | — | — | — | — |
| buttonAssistRemove:str | SHIFT: Remove | ButtonAssist | — | Unequip | — | Button assist text used for the SHIFT Remove Shortcut. For VisuStella MZ's Core Engine's Button Assist Window. |

### Struct: ShopScene

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| EnableLayout:eval | Use Updated Layout | General | boolean | true | — | Use the Updated Shop Layout provided by this plugin? This will override the Core Engine windows settings. |
| LayoutStyle:str | Layout Style | General | select | upper/left | Upper Help, Left Input=upper/left; Upper Help, Right Input=upper/right; Lower Help, Left Input=lower/left; Lower Help, Right Input=lower/right | If using an updated layout, how do you want to style the menu scene layout? |
| Switches | — | — | — | — | — | — |
| SwitchBuy:num | Switch: Buy | Switches | switch | 0 | — | Buying items in the Shop Scene turns this Switch to ON. Switch reverts to OFF whenever the Shop Scene opens. |
| SwitchSell:num | Switch: Sell | Switches | switch | 0 | — | Selling items in the Shop Scene turns this Switch to ON. Switch reverts to OFF whenever the Shop Scene opens. |
| Command | Command Window | — | — | — | — | — |
| CmdHideDisabled:eval | Hide Unavailable? | Command | boolean | true | — | Hide all unavailable commands like when a shop is set to Purchase Only? |
| CmdStyle:str | Style | Command | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw commands in the Command Window? |
| CmdTextAlign:str | Text Align | Command | combo | center | left; center; right | Text alignment for the Command Window. |
| CmdIconBuy:num | Buy Icon | Command | — | 208 | — | The icon used for the Buy command. |
| CmdIconSell:num | Sell Icon | Command | — | 314 | — | The icon used for the Sell command. |
| CmdIconCancel:num | Cancel Icon | Command | — | 82 | — | The icon used for the Cancel command. |
| CmdCancelRename:str | Rename "Cancel" | Command | — | Exit | — | Rename Cancel to something more logical for the Shop Menu Scene. |
| Prices | — | — | — | — | — | — |
| SellPriceRate:num | Sell Price Rate | Prices | — | 0.50 | — | The default sell price rate. |
| BuyPriceJS:func | JS: Buy Price | Prices | note | "// Declare variables\nlet item = arguments\[0\];\nlet price = arguments\[1\];\n\n// Return the finalized price\nreturn price;" | — | Modificatons made to the buy price before finalizing it. |
| SellPriceJS:func | JS: Sell Price | Prices | note | "// Declare variables\nlet item = arguments\[0\];\nlet price = arguments\[1\];\n\n// Return the finalized price\nreturn price;" | — | Modificatons made to the sell price before finalizing it. |
| ButtonAssist | Button Assist Window | — | — | — | — | — |
| buttonAssistSmallIncrement:str | Small Increment | ButtonAssist | — | -1/+1 | — | Text used for changing amount bought/sold. For VisuStella MZ's Core Engine's Button Assist Window. |
| buttonAssistLargeIncrement:str | Large Increment | ButtonAssist | — | -10/+10 | — | Text used for changing amount bought/sold. For VisuStella MZ's Core Engine's Button Assist Window. |

### Struct: StatusWindow

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| Width:num | Window Width | General | — | 352 | — | The usual width of the status window. |
| ParamChangeFontSize:num | Parameter Font Size | General | — | 22 | — | Font size used for parameter changes. |
| Translucent:num | Translucent Opacity | General | — | 64 | — | Opacity setting used for translucent window objects. |
| DrawBackRect:eval | Show Back Rectangles? | General | boolean | true | — | Show back rectangles of darker colors to display information better? |
| BackRectColor:str | Back Rectangle Color | DrawBackRect:eval | — | 19 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| EquipData | Equipment Data | — | — | — | — | — |
| EquipDataStyle:str | Data Style | EquipData | select | compare | Compare - Compares selected equip to equipped gear=compare; Classic - Shows basic parameters of selected equip=classic; Double - Shows basic parameters in double columns=double | How do you wish to display equipment data? |
| EquipDataCompare | Compare Style | EquipDataStyle:str | — | — | — | — |
| AlreadyEquipMarker:str | Already Equipped | EquipDataCompare | — | E | — | Marker used to show an actor cannot equip an item. |
| CannotEquipMarker:str | Can't Equip | EquipDataCompare | — | - | — | Marker used to show an actor cannot equip an item. |
| NoChangeMarker:str | No Changes | EquipDataCompare | — | - | — | Marker used to show no changes have occurred. |
| DrawEquipData:func | JS: Draw Equip Data | EquipDataCompare | note | "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i &lt; actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i &lt; actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}" | — | Code used to draw the equipment data for the Shop Status Window. |
| EquipDataClassic | Classic Style | EquipDataStyle:str | — | — | — | — |
| ClassicWeaponParameters:arraystr | Added Weapon Params | EquipDataClassic | combo\[\] | \["HIT"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK; HIT; EVA; CRI; CEV; MEV; MRF; CNT; HRG; MRG; TRG; TGR; GRD; REC; PHA; MCR; TCR; PDR; MDR; FDR; EXR | Display these parameters when a weapon is selected. Requires VisuMZ_0_CoreEngine! |
| ClassicArmorParameters:arraystr | Added Armor Params | EquipDataClassic | combo\[\] | \["EVA"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK; HIT; EVA; CRI; CEV; MEV; MRF; CNT; HRG; MRG; TRG; TGR; GRD; REC; PHA; MCR; TCR; PDR; MDR; FDR; EXR | Display these parameters when an armor is selected. Requires VisuMZ_0_CoreEngine! |
| DrawEquipClassicData:func | JS: Draw Equip Data | EquipDataClassic | note | "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);" | — | Code used to draw the equipment data for the Shop Status Window. |
| EquipDataDouble | Double Style | EquipDataStyle:str | — | — | — | — |
| DoubleWeaponParameters:arraystr | Added Weapon Params | EquipDataDouble | combo\[\] | \["HIT","CNT"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK; HIT; EVA; CRI; CEV; MEV; MRF; CNT; HRG; MRG; TRG; TGR; GRD; REC; PHA; MCR; TCR; PDR; MDR; FDR; EXR | Display these parameters when a weapon is selected. Requires VisuMZ_0_CoreEngine! |
| DoubleArmorParameters:arraystr | Added Armor Params | EquipDataDouble | combo\[\] | \["EVA","GRD"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK; HIT; EVA; CRI; CEV; MEV; MRF; CNT; HRG; MRG; TRG; TGR; GRD; REC; PHA; MCR; TCR; PDR; MDR; FDR; EXR | Display these parameters when an armor is selected. Requires VisuMZ_0_CoreEngine! |
| DrawEquipDoubleData:func | JS: Draw Equip Data | EquipDataDouble | note | "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);" | — | Code used to draw the equipment data for the Shop Status Window. |
| EquipDelayMS:num | Delay MS | EquipData | number | 240 | — | How many milliseconds (MS) to delay the preview update? This is to prevent lag spikes for equips only. |
| ItemData | Item Data | — | — | — | — | — |
| ItemGeneral | Data Settings | ItemData | — | — | — | — |
| MaxIcons:num | Max State/Buff Icons | ItemGeneral | — | 8 | — | Maximum number of icons that can be displayed for Add/Remove States/Buffs. |
| MultiplierStandard:num | Multiplier Standard | ItemGeneral | — | 1000000 | — | Constant standard to filter out random values when calculating the damage multiplier. |
| DrawItemData:func | JS: Draw Item Data | ItemGeneral | note | "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion &lt; 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion &lt; 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);" | — | Code used to draw the item data for the Shop Status Window. |
| Vocabulary | — | ItemData | — | — | — | — |
| LabelConsume:str | Consumable | Vocabulary | — | Consumable | — | Vocabulary used for this data entry. |
| Consumable:str | Yes | LabelConsume:str | — | ✔ | — | Vocabulary used for this data entry. |
| NotConsumable:str | No | LabelConsume:str | — | ✘ | — | Vocabulary used for this data entry. |
| Occasions | — | Vocabulary | — | — | — | — |
| Occasion0:str | Always | Occasions | — | Anytime Use | — | Vocabulary used for this data entry. |
| Occasion1:str | Battle Screen | Occasions | — | Battle-Only | — | Vocabulary used for this data entry. |
| Occasion2:str | Menu Screen | Occasions | — | Field-Only | — | Vocabulary used for this data entry. |
| Occasion3:str | Never | Occasions | — | - | — | Vocabulary used for this data entry. |
| Scope | — | Vocabulary | — | — | — | — |
| Scope0:str | None | Scope | — | No Target | — | Vocabulary used for this data entry. |
| Scope1:str | 1 Enemy | Scope | — | 1 Foe | — | Vocabulary used for this data entry. |
| Scope2:str | All Enemies | Scope | — | All Foes | — | Vocabulary used for this data entry. |
| Scope3:str | 1 Random Enemy | Scope | — | Random Foe | — | Vocabulary used for this data entry. |
| Scope4:str | 2 Random Enemies | Scope | — | 2 Random Foes | — | Vocabulary used for this data entry. |
| Scope5:str | 3 Random Enemies | Scope | — | 3 Random Foes | — | Vocabulary used for this data entry. |
| Scope6:str | 4 Random Enemies | Scope | — | 4 Random Foes | — | Vocabulary used for this data entry. |
| Scope7:str | 1 Ally | Scope | — | 1 Ally | — | Vocabulary used for this data entry. |
| Scope8:str | All Allies | Scope | — | Alive Allies | — | Vocabulary used for this data entry. |
| Scope9:str | 1 Ally (Dead) | Scope | — | Dead Ally | — | Vocabulary used for this data entry. |
| Scope10:str | All Allies (Dead) | Scope | — | Dead Allies | — | Vocabulary used for this data entry. |
| Scope11:str | The User | Scope | — | User | — | Vocabulary used for this data entry. |
| Scope12:str | 1 Ally (DoA) | Scope | — | Any Ally | — | Vocabulary used for this data entry. |
| Scope13:str | All Allies (DoA) | Scope | — | All Allies | — | Vocabulary used for this data entry. |
| Scope14:str | Enemies &amp; Allies | Scope | — | Everybody | — | Vocabulary used for this data entry. |
| BattleCore | Battle Core Support | Vocabulary | — | — | — | — |
| ScopeRandomAny:str | x Random Any | BattleCore | — | %1 Random Units | — | Vocabulary used for &lt;Target: x Random Any&gt; notetag. |
| ScopeRandomEnemies:str | x Random Enemies | BattleCore | — | %1 Random Foes | — | Vocabulary used for &lt;Target: x Random Enemies&gt; notetag. |
| ScopeRandomAllies:str | x Random Allies | BattleCore | — | %1 Random Allies | — | Vocabulary used for &lt;Target: x Random Allies&gt; notetag. |
| ScopeAlliesButUser:str | All Allies But User | BattleCore | — | Other Allies | — | Vocabulary used for &lt;Target: All Allies But User&gt; notetag. |
| ScopeAllyOrEnemy:str | Ally or Enemy | BattleCore | — | Ally/Enemy | — | Vocabulary used for &lt;Target: Ally or Enemy&gt; notetag. |
| ScopeEnemyOrAlly:str | Enemy or Ally | BattleCore | — | Enemy/Ally | — | Vocabulary used for &lt;Target: Enemy or Ally&gt; notetag. |
| LabelSpeed:str | Speed | Vocabulary | — | Speed | — | Vocabulary used for this data entry. |
| Speed2000:str | &gt;= 2000 Speed | LabelSpeed:str | — | Fastest | — | Vocabulary used for this data entry. |
| Speed1000:str | &gt;= 1000 Speed | LabelSpeed:str | — | Faster | — | Vocabulary used for this data entry. |
| Speed1:str | &gt;= 1 Speed | LabelSpeed:str | — | Fast | — | Vocabulary used for this data entry. |
| Speed0:str | == 0 Speed | LabelSpeed:str | — | Normal | — | Vocabulary used for this data entry. |
| SpeedNeg999:str | &gt;= -999 Speed | LabelSpeed:str | — | Slow | — | Vocabulary used for this data entry. |
| SpeedNeg1999:str | &gt;= -1999 Speed | LabelSpeed:str | — | Slower | — | Vocabulary used for this data entry. |
| SpeedNeg2000:str | &lt;= -2000 Speed | LabelSpeed:str | — | Slowest | — | Vocabulary used for this data entry. |
| LabelSuccessRate:str | Success Rate | Vocabulary | — | Accuracy | — | Vocabulary used for this data entry. |
| LabelRepeats:str | Repeats | Vocabulary | — | Hits | — | Vocabulary used for this data entry. |
| LabelHitType:str | Hit Type | Vocabulary | — | Type | — | Vocabulary used for this data entry. |
| HitType0:str | Certain Hit | LabelHitType:str | — | Neutral | — | Vocabulary used for this data entry. |
| HitType1:str | Physical | LabelHitType:str | — | Physical | — | Vocabulary used for this data entry. |
| HitType2:str | Magical | LabelHitType:str | — | Magical | — | Vocabulary used for this data entry. |
| LabelElement:str | Element | Vocabulary | — | Element | — | Vocabulary used for this data entry. |
| ElementWeapon:str | Weapon-Based | LabelElement:str | — | \I\[97\]Weapon | — | Vocabulary used for this data entry. |
| ElementNone:str | Nonelement Element | LabelElement:str | — | \I\[160\]No Element | — | Vocabulary used for this data entry. |
| DamageType | Damage Type | Vocabulary | — | — | — | — |
| DamageType1:str | HP Damage | DamageType | — | %1 Damage Multiplier | — | Vocabulary used for this data entry. If Visu_1_BattleCore is installed, priority goes to its Damage Style settings. |
| DamageType2:str | MP Damage | DamageType | — | %1 Damage Multiplier | — | Vocabulary used for this data entry. If Visu_1_BattleCore is installed, priority goes to its Damage Style settings. |
| DamageType3:str | HP Recovery | DamageType | — | %1 Recovery Multiplier | — | Vocabulary used for this data entry. If Visu_1_BattleCore is installed, priority goes to its Damage Style settings. |
| DamageType4:str | MP Recovery | DamageType | — | %1 Recovery Multiplier | — | Vocabulary used for this data entry. If Visu_1_BattleCore is installed, priority goes to its Damage Style settings. |
| DamageType5:str | HP Drain | DamageType | — | %1 Drain Multiplier | — | Vocabulary used for this data entry. If Visu_1_BattleCore is installed, priority goes to its Damage Style settings. |
| DamageType6:str | MP Drain | DamageType | — | %1 Drain Multiplier | — | Vocabulary used for this data entry. If Visu_1_BattleCore is installed, priority goes to its Damage Style settings. |
| Effects | — | Vocabulary | — | — | — | — |
| LabelRecoverHP:str | Recover HP | Effects | — | %1 Recovery | — | Vocabulary used for this data entry. |
| LabelRecoverMP:str | Recover MP | Effects | — | %1 Recovery | — | Vocabulary used for this data entry. |
| LabelRecoverTP:str | Recover TP | Effects | — | %1 Recovery | — | Vocabulary used for this data entry. |
| LabelSelfGainTP:str | Self Gain TP | Effects | — | User %1 | — | Vocabulary used for this data entry. |
| LabelDamageHP:str | Damage HP | Effects | — | %1 Damage | — | Vocabulary used for this data entry. |
| LabelDamageMP:str | Damage MP | Effects | — | %1 Damage | — | Vocabulary used for this data entry. |
| LabelDamageTP:str | Damage TP | Effects | — | %1 Damage | — | Vocabulary used for this data entry. |
| LabelApply:str | Add State/Buff | Effects | — | Applies | — | Vocabulary used for this data entry. |
| LabelRemove:str | Remove State/Buff | Effects | — | Removes | — | Vocabulary used for this data entry. |
| EquipType | Equip Type | Vocabulary | — | — | — | — |
| WeaponType:str | Weapon Type | EquipType | — | Weapon Type | — | Vocabulary used for this data entry. |
| ArmorType:str | Armor Type | EquipType | — | Armor Type | — | Vocabulary used for this data entry. |
| NoEquipTypeResult:str | No Equip Type | EquipType | — | - | — | Marker used to show an unlisted equip type. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Actor: Change Equip Slots

- Command ID: `ActorChangeEquipSlots`
- Description: Forcefully change the actor(s) equip slots. These will persist through class changes.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actors:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) to affect. |
| Slots:arraystr | Equip Slots | string\[\] | \["Weapon","Shield","Head","Body","Accessory"\] | — | Insert the equip slots you want the actor(s) to have. These entries are case-sensitive. @ -------------------------------------------------------------------------- |

### Actor: Reset Equip Slots

- Command ID: `ActorResetEquipSlots`
- Description: Reset any forced equip slots for the actor(s). Equip slots will then be based on class.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actors:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) to affect. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Purify`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Purify: Target Actor(s)

- Command ID: `PurifyActors`
- Description: Purifies target actor(s) of any cursed weapons or armors. Cannot be used in battle.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actors:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) to affect. @ -------------------------------------------------------------------------- |

### Purify: Whole Party

- Command ID: `PurifyParty`
- Description: Purifies whole party of any cursed weapons or armors. Cannot be used in battle. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_Shop`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Shop: Advanced

- Command ID: `BatchShop`
- Description: Make it easier to put together inventories for a shop. WARNING: Does not allow for event-specific prices.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1 | Step 1: Item ID's | — | — | — | — |
| Step1Start:num | Range Start | item | 1 | — | Select which Item ID to start from. |
| Step1End:num | Range End | item | 4 | — | Select which Item ID to end at. |
| Step2 | Step 2: Weapon ID's | — | — | — | — |
| Step2Start:num | Range Start | weapon | 1 | — | Select which Weapon ID to start from. |
| Step2End:num | Range End | weapon | 4 | — | Select which Weapon ID to end at. |
| Step3 | Step 3: Armor ID's | — | — | — | — |
| Step3Start:num | Range Start | armor | 1 | — | Select which Armor ID to start from. |
| Step3End:num | Range End | armor | 4 | — | Select which Armor ID to end at. |
| PurchaseOnly:eval | Step 4: Purchase Only? | boolean | false | — | Make the shop purchase-only? |
| Optional | — | — | — | — | — |
| Blacklist:arraystr | Blacklisted Categories | string\[\] | \[\] | — | A list of categories to blacklist from the shop. Not used if empty. Mark categories with &lt;Category: x&gt; |
| Whitelist:arraystr | Whitelisted Categories | string\[\] | \[\] | — | A list of categories to whitelist for the shop. Not used if empty. Mark categories with &lt;Category: x&gt; @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Items & Equips Core makes improvements to the RPG Maker MZ item and
equipment dedicated scenes (including the shop) and how they're handled.
From more item categories, better parameter control, rulings, and more, game
devs are able to take control over key aspects of their game's items.

Features include all (but not limited to) the following:

* Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
* Categorizing items in unique and multiple categories.
* Item Scene and Shop Scene will now display detailed information on items.
* NEW! marker can be displayed over recently acquired items in-game.
* Equipment notetags to adjust parameters past the editor limitations.
* Equipment Rulings to adjust what slot types can and can't be unequipped
and/or optimized.
* Equipment Type Handling offers more control over equipment loadouts.
* Items sold in shops can be hidden/shown based on Switches.
* Items sold in shops can have varying prices adjusted by notetags.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes: New Hard-Coded Features

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Equipment Type Handling

- Characters will no longer have one universal equipment slot setting.
Classes can have different equipment type loadouts, made possible through
the usage of notetags. Also, equipment types of matching names would be
treated as the same type, where previously, they would be different types.
This means if you have two "Accessory" slots, be it in the form of notetags
or through the Database > Types tab, they can both equip the same type of
accessories.

- The Change Equip event command is now updated to reflect this new change.
When processing an equip change, the slot changed will go to the first
empty slot of matching type. If all of the actor's matching slot types are
equipped, then the equip will replace the last slot available.

---

Shop Status Window

- The Status Window found in the Shop Scene was originally barren and did
not display much information at all. This is changed through this plugin's
new features. While the contents of the Shop Status Window can be customized
through the Plugin Parameters, it is a change that cannot be reversed and
for the better since it gives players the much needed information revolving
around the game's items.

---

Core Engine Compatibility: Modern Controls

- If the VisuStella Core Engine is added to your game with Modern Controls
enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
controls will be changed a bit.

- The Item Menu Scene will automatically have the Item List Window active,
with using the Left/Right (for single column) or Page Up/Page Down (for
multi-columns) to navigate between the Item Categories. Similar will occur
when trying to sell items in the Shop Menu Scene.

- The Equip Menu Scene will automatically have the Equip Slots Window active
and only activate the command window upon moving up to it.

---

VisuStella MZ Compatibility

While this plugin is compatible with the majority of the VisuStella MZ
plugin library, it is not compatible with specific plugins or specific
features. This section will highlight the main plugins/features that will
not be compatible with this plugin or put focus on how the make certain
features compatible.

---

VisuMZ_1_BattleCore

Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
Item and Equip Core's Shop Status Window is not done with the Item and Equip
Core's Plugin Parameters if you have the Battle Core installed.

Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
Styles, and adjust the style's version of the "Damage Multiplier" or
"Healing Multiplier" text instead.

Why does this work this way? Because not all damage styles work off
"Multipliers" so in order for it to convey the proper message to the player,
each damage style has its own vocabulary to be more accurate.

In case you forget about that, when you visit the Item and Equip Core's
plugin parameters for these, it should also remind you in the parameter's
description on where to change it.

---

VisuMZ_2_WeaponSwapSystem

The custom equip slots feature from the VisuStella MZ Items and Equips Core
allowed you to add in extra weapon slots. This is now curated up to a max
of one weapon slot per character. This needs to be done to make the Weapon
Swap System viable.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== General ===

These notetags affect the Items, Weapons, and Armors on a general scale.

---

<Max: x>

- Used for: Item, Weapon, Armor Notetags
- Determines the maximum quantity that can be held for this item.
- Replace 'x' with a number value to determine the maximum amount.

---

<Color: x>
<Color: #rrggbb>

- Used for: Item, Weapon, Armor, Skill Notetags
- Determines the color of the object inside the in-game menus.
- Replace 'x' with a number value depicting a window text color.
- Replace 'rrggbb' with a hex color code for a more custom color.

---

<Category: x>

- Used for: Item, Weapon, Armor Notetags
- Arranges items into certain/multiple categories to work with the Category
Plugin Parameter setting: "Category:x".
- Replace 'x' with a category name to mark this item as.

---

<Categories>
x
x
</Categories>

- Used for: Item, Weapon, Armor Notetags
- Arranges items into certain/multiple categories to work with the Category
Plugin Parameter setting: "Category:x".
- Replace each 'x' with a category name to mark this item as.

---

<Conserve: x%>

- Used for: Item
- Gives the item a percent chance when used to not consume the item.
- Replace 'x' with a number representing the percent chance to successfully
conserve the item.
- If an item cannot be consumed, conserve chance will be 100% regardless.

---

<ID Sort Priority: x>

- Used for: Item, Weapon, and Armor Notetags
- Used for Scene_Item, Scene_Equip, Scene_Battle, and Scene_Shop's sell
option (only when selling).
- Changes sorting priority by ID for item, weapon, or armor to 'x'.
- Default priority level is '50'.
- Items, weapons, and armors with higher priority values will be sorted
higher up on the list while lower values will be lower on the list.

---

=== Item Accessibility Notetags ===

The following notetags allow you to choose when items can/cannot be used
based on switches.

---

<Enable Switch: x>

<Enable All Switches: x,x,x>
<Enable Any Switches: x,x,x>

- Used for: Item Notetags
- Determines the enabled status of the item based on switches.
- Replace 'x' with the switch ID to determine the item's enabled status.
- If 'All' notetag variant is used, item will be disabled until all
switches are ON. Then, it would be enabled.
- If 'Any' notetag variant is used, item will be enabled if any of the
switches are ON. Otherwise, it would be disabled.

---

<Disable Switch: x>

<Disable All Switches: x,x,x>
<Disable Any Switches: x,x,x>

- Used for: Item Notetags
- Determines the enabled status of the item based on switches.
- Replace 'x' with the switch ID to determine the item's enabled status.
- If 'All' notetag variant is used, item will be enabled until all switches
are ON. Then, it would be disabled.
- If 'Any' notetag variant is used, item will be disabled if any of the
switches are ON. Otherwise, it would be enabled.

---

=== JavaScript Notetags: Item Accessibility ===

The following are notetags made for users with JavaScript knowledge to
determine if an item can be accessible by code.

---

<JS Item Enable>
code
code
enabled = code;
</JS Item Enable>

- Used for: Item Notetags
- Determines the enabled status of the item based on JavaScript code.
- If the actor this is disabled for is the only party member, it will not be
visible in the item list unless the VisuStella Battle Core is installed.
- If the VisuStella Battle Core is installed, then all battle scope items
will be visible even if they're disabled.
- Replace 'code' to determine the type enabled status of the item.
- The 'enabled' variable returns a boolean (true/false) to determine if the
item will be enabled or not.
- The 'user' variable refers to the user with the item.
- The 'item' variable refers to the item being checked.
- All other item conditions must be met in order for this to code to count.

---

=== Equipment Notetags ===

The following notetags provide equipment-related effects from deciding what
equip slots can be given to classes to the base parameter changes asigned
to weapons and armors.

---

<Equip Slots>
slotName
slotName
slotName
</Equip Slots>

- Used for: Class Notetags
- Changes the equipment slot loadout for any actor who is that class.
- Replace 'slotName' with an Equipment Type name from Database > Types.
This is case-sensitive.
- Insert or remove as many "slotName" equipment types as needed.

---

<param: +x>
<param: -x>

- Used for: Weapon, Armor Notetags
- Changes the base parameter value for the equip item.
- Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
- These notetags do NOT work with X Parameters, S Parameters, or any
custom parameters. These notetags ONLY work with the base parameters.
- Replace 'x' with a number value to set the parameter value to.
- This allows you to bypass the Database Editor's number limitations.

---

<Equip Copy Limit: x>

- Used for: Weapon, Armor Notetags
- Sets a maximum number of copies that the actor can wear of this equipment.
- Replace 'x' with a number value to determine the copy limit.
- This can be bypassed using Event Commands and/or Script Calls.
- Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
on at any time despite having empty accessory slots because the ring has a
<Equip Copy Limit: 1> notetag.

---

<Equip Weapon Type Limit: x>

- Used for: Weapon
- This weapon cannot be equipped with other weapons of the same type once
the limited amount has been reached.
- Replace 'x' with a number value to determine the weapon type limit.
- This can be bypassed using Event Commands and/or Script Calls.
- Usage Example: A dualwielding warrior who can only equip one sword and a
dagger but never two swords or two daggers because the swords and daggers
all have the <Equip Weapon Type Limit: 1> notetags on them.

---

<Equip Armor Type Limit: x>

- Used for: Armor
- This armor cannot be equipped with other armors of the same type once the
limited amount has been reached.
- Replace 'x' with a number value to determine the armor type limit.
- This can be bypassed using Event Commands and/or Script Calls.
- Usage Example: People cannot equip more than two glove accessories on at a
time because the glove is a "Glove" armor-type and each glove item has the
<Equip Armor Type Limit: 2> notetags on them.

---

<Party Artifact>
<Troop Artifact>

<Stackable Party Artifact>
<Stackable Troop Artifact>

- Used for: Armor
- This armor cannot be equipped at all. However, by simply being in the
party's inventory, its parameter bonuses and traits will be applied
globally throughout the whole party or troop (depending on the notetag).
- Add both notetags to affect both groups.
- The normal versions of the notetag is only applied once regardless of the
number of copies are found in the party's inventory.
- The stackable versions of the notetag will have the bonuses and traits
stacked multiple times relative to the number of copies found in the
party's inventory.
- This item will NOT be added during the setup phase for Battle Tests.
- If you want to add the item, do it manually.

---

<Equip For Class Only: x>
<Equip For Classes Only: x, x, x>
<Equip For Class Only: name>
<Equip For Classes Only: name, name, name>

- Used for: Weapon, Armor Notetags
- This piece of equipment can only be worn by members with 'x' as the main
class. If there are multiple classes listed, at least one of them need to
be the actor's main class.
- Replace 'x' with a number representing the ID of the class required.
- For the 'name' variant, replace 'name' with the name of the required class
the actor needs to have in order to equip this object.

---

<Equip Requirements>
requirement
requirement
requirement
</Equip Requirements>

- Used for: Weapon, Armor Notetags
- Defines a requirement(s) for the actor to meet in order for the equip item
to be equippable.
- Failure to meet these requirements will cause the equipment to unequip
automatically.
- Keep in mind that in some cases, this will not happen immediately.
Things like switches will require the actor to meet its cache clear
in order to trigger the automatic unequip.
- Some ways to trigger a cache clear would be to change the actor's HP/MP,
or adding and then removing a state for the actor (preferrably an unused
state that has no real effect).
- Replace 'requirement' with one of the settings bellow:
- Add multiple 'requirement' lines for more requirements.

Requirements:

param > x
param >= x
param === x
param <= x
param < x
- Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
'mdf', 'agi', or 'luk'.
- This will make the piece of equipment require the actor's base parameter
to be greater than (>), greater than or equal to (>=), equal to (===),
less than or equal to (<=), or less than (<).
- This is NOT the value for the total parameter, only the base parameter.
- The base parameter is calculated by the user's class parameter value and
any bonuses received through permanent stat increases.

learned skill: x
learned skill: name
- This will make the piece of equipment require the actor to have learned
skill 'x'.
- If 'name' is used, priority will be given to the skill with the highest
ID in the database.
- The actor needs to have LEARNED the skill. This means that if you have
added a skill to the actor's kit through a trait, it will not count.

switch: x
- This will require switch X to be on.
- If it isn't, the piece of equipment cannot be worn.
- Insert multiple of these to add more switches that are are required to
be on.

***NOTE 1***
There is no "class: x" for these equip requirements. Instead, use the
<Equip For Class Only: x> notetags.

***NOTE 2***
For those wondering where "unique only" is, that does not exist in this
plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.

Example A:

<Equip Requirements>
level >= 20
</Equip Requirements>

- Requires the user to be at least level 20 in order to equip.

Example B:

<Equip Requirements>
atk >= 50
def <= 50
</Equip Requirements>
- Requires the user have at least 50 base ATK to equip.
- Requires the user to be under 50 base DEF to equip.

---

<Added EType: x>
<Added ETypes: x, x, x>

- Used for: Armor Notetags
- This is for armors only and does NOT work with weapons!
- Allows a piece of armor to belong to multiple ETypes. This means a glove
can be equipped as "Armgear" or as an "Accessory" if you so choose.
- Replace 'x' with a number representing the ID of the EType you wish to add
to the list of ETypes.
- Insert multiple 'x' entries to add more than one EType ID.

---

<Cursed>

- Used for: Weapon, Armor Notetags
- If this weapon or armor is equipped, it cannot manually be removed by the
player until it is purified.
- To remove it, it must be done by event commands, script calls, or through
the Purify-related Plugin Commands provided by this plugin.
- Once purified, the weapon or armor will become unequipped unless it has a
purify transformation.
- If the newly transformed weapon/armor is equippable, it will remain in
the actor's equipment slots.
- If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
in order to allow free weapon swapping. Weaponry will not be cursed
if VisuMZ_2_WeaponSwapSystem is installed.

---

<Purify Transform: id>
<Purify Transform: name>

- Used for: Weapon, Armor Notetags
- If this notetag is present on a <Cursed> weapon or armor, then upon the
actor receiving purification, the weapon or armor will transform into a
different item.
- Replace 'id' with a number representing the transformed weapon/armor's ID.
- Replace 'name' with text representing the transformed weapon/armor's name.
- Weapons can only transform into weapons.
- Armors can only transform into armors.

---

=== JavaScript Notetags: Equipment ===

The following are notetags made for users with JavaScript knowledge to
adjust the parameter through code.

---

<JS Parameters>
MaxHP = code;
MaxMP = code;
ATK = code;
DEF = code;
MAT = code;
MDF = code;
AGI = code;
LUK = code;
</JS Parameters>

- Used for: Weapon, Armor Notetags
- Uses JavaScript to determine the values for the basic parameters based on
the code used to calculate its value.
- The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
'LUK' are used to determine the finalized value of the parameter. This
variable is case sensitive.
- If a parameter is not present, its value will be treated as +0.

'''WARNING!''' If you are trying to calculate a value based off a full
parameter value, such as "ATK = user.atk * 0.10", it's going to break and
will cause an infinite loop. Use base parameter values instead.

---

=== Status Window Notetags ===

The following notetags will affect the Shop Status Window info. If for any
reason the data that is displayed is not to your liking or insufficient,
you can change it up using the following notetags.

---

<Status Info>
key: data
key: data
key: data
</Status Info>

- Used for: Skill, Item, Weapon, Armor Notetags
- If you do not like the generated data that's displayed, you can change it
using this notetag to display what you want.
- Replace 'key' with one of the following for skills and items:
- Consumable
- Quantity
- Occasion
- Scope
- Speed
- Success Rate
- Repeat
- Hit Type
- Element
- Damage Multiplier
- HP Recovery
- MP Recovery
- TP Recovery
- HP Damage
- MP Damage
- TP Damage
- User TP Gain
- Added Effects
- Removed Effects
- Replace 'key' with one of the following for weapons and armors:
- 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or 'LUK'
- For those with VisuMZ_0_CoreEngine:
- 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'
- 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'
- Only relevant if the Draw Style for equipment is "classic" or "double".
- Replace 'data' with the text data you want to visually appear. You may use
text codes for this.
- This only affects info entries that are already visible and won't make
other categories suddenly appear.
- Insert or remove as many "key: data" lines as needed.

---

<Custom Status Info>
key: data
key: data
key: data
</Custom Status Info>

- Used for: Skill, Item, Weapon, Armor Notetags
- If you want custom categories and data to be displayed for your items that
aren't provided by the Shop Status Window Info to begin with, you can use
this notetag to add in your own entries.
- When used with weapon or armor database objects, this information is
only relevant if the Draw Style for equipment is "classic" or "double".
- Replace 'key' with text of the exact label you want. You may use text
codes for this.
- Replace 'data' with text of the exact text data you want. You may use text
codes for this.
- Insert or remove as many "key: data" lines as needed.

---

<Shop Picture Name: filename>

- Used for: Skill, Item, Weapon, Armor Notetags
- Enables a shop picture for the status window. This image can be seen in
the item scene, shop scene, and skill scene if enabled.
- If this notetag is not used, there will be no image.
- Replace 'filename' with the filename of the graphic to use from the game
project's img/pictures/ folder. Filenames are case sensitive. Leave out
the filename extension from the notetag.
- Use the supporting notetags to determine where the image appears. If not,
they will default to the background, fit to the window dimensions,
centered at the middle of the window.

---

<Shop Picture Layer: Background>
<Shop Picture Layer: Foreground>

- Used for: Skill, Item, Weapon, Armor Notetags
- Determines which layer the graphic will be drawn on.
- If the background layer is selected, the picture will appear behind the
data text.
- If the foreground layer is selected, the picture will appear in front of
the data text.
- If this notetag is not used, it will default to the background layer.

---

<Shop Picture Max Width: x>
<Shop Picture Max Height: y>
<Shop Picture Max Dimensions: x, y>

- Used for: Skill, Item, Weapon, Armor Notetags
- Determines the maximum width and/or height for the image.
- This means the image will be automatically scaled proportionally to that
width or height as long as everything else does not break boundaries.
- Replace 'x' and 'y' with number values representing the maximum dimensions
the image can be in pixels.
- If these notetags are not used, the image will be automatically scaled to
the dimensions of the shop status window.

---

<Shop Picture Alignment: Left>
<Shop Picture Alignment: Center>
<Shop Picture Alignment: Right>

- Used for: Skill, Item, Weapon, Armor Notetags
- Adjusts the horizontal alignment for the image.
- Left, center, right determines how it's aligned horizontally if the
image does not horizontally fit in the width of the window.
- If any of these notetags are not used, the image will default to the
'center' alignment.

---

<Shop Picture Position: Top>
<Shop Picture Position: Middle>
<Shop Picture Position: Bottom>

- Used for: Skill, Item, Weapon, Armor Notetags
- Adjusts the vertical position for the image.
- Top, middle, bottom determines how it's positioned vertically if the
image does not vertically fit in the width of the window.
- If any of these notetags are not used, the image will default to the
'middle' position.

---

<Shop Picture Offset X: +x>
<Shop Picture Offset X: -x>

<Shop Picture Offset Y: +y>
<Shop Picture Offset Y: -y>

<Shop Picture Offset: +x, +y>
<Shop Picture Offset: -y, -y>

- Used for: Skill, Item, Weapon, Armor Notetags
- Offsets the X and Y positions of the image in the shop status window.
- X offsets adjust the horizontal position by x pixels.
- Positive goes right.
- Negative goes left.
- Y offsets adjust the horizontal position by y pixels.
- Positive goes down.
- Negative goes up.
- Replace 'x' and 'y' with number values representing the pixels to offset
the image by. The '+' and '-' signs are required.
- If none of these notetags are used, there will be no offsets.

---

<Shop Picture Opacity: x>
<Shop Picture Opacity: x%>

- Used for: Skill, Item, Weapon, Armor Notetags
- Adjusts the opacity of the image used.
- When using 'x' and not 'x%', use a number between 0 and 255.
- The closer to 0, the more transparent the image is.
- The closer to 255, the more opaque the image is.
- When using 'x%' and not 'x', use a number between 0% and 100%.
- The closer to 0%, the more transparent the image is.
- The closer to 100%, the more opaque the image is.

---

=== Shop Menu Notetags ===

These notetags adjust how prices and such are managed inside the Shop Menu
as well as whether or not some items are visible depending on switch states.

---

<Price: x>

- Used for: Item, Weapon, Armor Notetags
- Adjusts the buying price for this item.
- Replace 'x' with a number depicting the desired value for the buy price.
- This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.

---

<Can Sell>
<Cannot Sell>

- Used for: Item, Weapon, Armor Notetags
- Makes the item either always sellable or cannot be sold.
- This bypasses the game's internal hard-coding to prevent items with a
price of 0 from being able to be sold.
- This bypasses the game's internal hard-coding to always allow items with
a price value of being able to be sold.

---

<Sell Price: x>

- Used for: Item, Weapon, Armor Notetags
- Changes the sell price to be something different than the default amount.
- Replace 'x' with a number depicting the desired value for the sell price.

---

<Show Shop Switch: x>

<Show Shop All Switches: x,x,x>
<Show Shop Any Switches: x,x,x>

- Used for: Item, Weapon, Armor Notetags
- Determines the visibility of the shop item based on switches.
- Replace 'x' with the switch ID to determine the shop item's visibility.
- If 'All' notetag variant is used, item will be hidden until all switches
are ON. Then, it would be shown.
- If 'Any' notetag variant is used, item will be shown if any of the
switches are ON. Otherwise, it would be hidden.

---

<Hide Shop Switch: x>

<Hide Shop All Switches: x,x,x>
<Hide Shop Any Switches: x,x,x>

- Used for: Item, Weapon, Armor Notetags
- Determines the visibility of the shop item based on switches.
- Replace 'x' with the switch ID to determine the shop item's visibility.
- If 'All' notetag variant is used, item will be shown until all switches
are ON. Then, it would be hidden.
- If 'Any' notetag variant is used, item will be hidden if any of the
switches are ON. Otherwise, it would be shown.

---

<Cannot Sell Switch: x>

<Cannot Sell All Switches: x,x,x>
<Cannot Sell Any Switches: x,x,x>

- Used for: Item, Weapon, Armor Notetags
- Determines the sellability of the shop item based on switches.
- Replace 'x' with the switch ID to determine the shop item's sellability.
- If 'All' notetag variant is used, item cannot be sold until all switches
are ON. Otherwise, it can be sold.
- If 'Any' notetag variant is used, item cannot be sold if any of the
switches are ON. Otherwise, it can be sold.

---

<Buy Turn On Switch: x>
<Buy Turn On Switches: x, x, x>

- Used for: Item, Weapon, Armor Notetags
- When this item, weapon, or armor is bought in the shop scene, turn on the
switch(es) 'x'.
- Replace 'x' with a number representing the ID of the switch to turn on.
- Insert multiple 'x' values to turn on multiple switches upon buying.

---

<Buy Turn Off Switch: x>
<Buy Turn Off Switches: x, x, x>

- Used for: Item, Weapon, Armor Notetags
- When this item, weapon, or armor is bought in the shop scene, turn off the
switch(es) 'x'.
- Replace 'x' with a number representing the ID of the switch to turn off.
- Insert multiple 'x' values to turn off multiple switches upon buying.

---

<Sell Turn On Switch: x>
<Sell Turn On Switches: x, x, x>

- Used for: Item, Weapon, Armor Notetags
- When this item, weapon, or armor is sold in the shop scene, turn on the
switch(es) 'x'.
- Replace 'x' with a number representing the ID of the switch to turn on.
- Insert multiple 'x' values to turn on multiple switches upon selling.

---

<Sell Turn Off Switch: x>
<Sell Turn Off Switches: x, x, x>

- Used for: Item, Weapon, Armor Notetags
- When this item, weapon, or armor is sold in the shop scene, turn off the
switch(es) 'x'.
- Replace 'x' with a number representing the ID of the switch to turn off.
- Insert multiple 'x' values to turn off multiple switches upon selling.

---

=== JavaScript Notetags: Shop Menu ===

The following are notetags made for users with JavaScript knowledge. These
notetags are primarily aimed at Buy and Sell prices.

---

<JS Buy Price>
code
code
price = code;
</JS Buy Price>

- Used for: Item, Weapon, Armor Notetags
- Replace 'code' to determine the buying 'price' of the item.
- Insert the final buy price into the 'price' variable.
- The 'item' variable refers to the item being bought.

---

<JS Sell Price>
code
code
price = code;
</JS Sell Price>

- Used for: Item, Weapon, Armor Notetags
- Replace 'code' to determine the selling 'price' of the item.
- Insert the final sell price into the 'price' variable.
- The 'item' variable refers to the item being sold.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Actor Plugin Commands ===

---

Actor: Change Equip Slots
- Forcefully change the actor(s) equip slots.
- These will persist through class changes.

Actor ID(s):
- Select which Actor ID(s) to affect.

Equip Slots:
- Insert the equip slots you want the actor(s) to have.
- These entries are case-sensitive.

---

Actor: Reset Equip Slots
- Reset any forced equip slots for the actor(s).
- Equip slots will then be based on class.

Actor ID(s):
- Select which Actor ID(s) to affect.

---

=== Purify Plugin Commands ===

---

Purify: Target Actor(s)
- Purifies target actor(s) of any cursed weapons or armors.
- Cannot be used in battle.

Actor ID(s):
- Select which Actor ID(s) to affect.

---

Purify: Whole Party
- Purifies whole party of any cursed weapons or armors.
- Cannot be used in battle.

---

=== Shop Plugin Commands ===

---

Shop: Advanced
- Make it easier to put together inventories for a shop.
- WARNING: Does not allow for event-specific prices.

Step 1: Item ID's
- Select which Item ID ranges to add.

Step 2: Weapon ID's
- Select which Weapon ID ranges to add.

Step 3: Armor ID's
- Select which Armor ID ranges to add.

Step 4: Purchase Only?
- Make the shop purchase-only?

Optional:

Blacklist
- A list of categories to blacklist from the shop.
- Not used if empty. Mark categories with <Category: x>

Whitelist
- A list of categories to whitelist for the shop.
- Not used if empty. Mark categories with <Category: x>

This Plugin Command primarily functions as an alternative to the editor's
"Shop Processing" event command as that one requires you to add items one at
a time, making it extremely tedious to add large amounts of items. This
Plugin Command will mitigate that by allowing ID ranges to determine which
items to make available.

---

Plugin Parameters: Item Menu Settings

The Item Menu Settings allow you to adjust specifics on how key objects and
windows in the Item Menu Scene operate.

---

General Window

Use Updated Layout:
- Use the Updated Item Menu Layout provided by this plugin?
- This will automatically enable the Status Window.
- This will override the Core Engine windows settings.

Layout Style:
- If using an updated layout, how do you want to style the menu scene?
- Upper Help, Left Input
- Upper Help, Right Input
- Lower Help, Left Input
- Lower Help, Right Input

---

List Window

Columns:
- Number of maximum columns.
- If you are using the VisuStella MZ Core Engine and the "Modern Controls"
Plugin Parameter, please read through that section in case you have any
questions about how to switch between categories when using multiple
columns of items at a time.

---

Item Quantity

Item Max:
Weapon Max:
Armor Max:
- The default maximum quantity for items, weapons, and/or armors.

Quantity Format:
- How to display an item's quantity.
- %1 - Item Quantity

Font Size:
- Default font size for item quantity.

---

Shop Status Window

Show in Item Menu?:
- Show the Shop Status Window in the Item Menu?
- This is enabled if the Updated Layout is on.

Adjust List Window?:
- Automatically adjust the Item List Window in the Item Menu if using the
Shop Status Window?

Background Type:
- Select background type for this window.
- 0 - Window
- 1 - Dim
- 2 - Transparent

JS: X, Y, W, H:
- Code used to determine the dimensions for this Status Window in the
Item Menu.

---

Button Assist Window

Switch Category:
- Button assist text used for switching categories.
- For VisuStella MZ's Core Engine's Button Assist Window.

---

Plugin Parameters: Item Categories

Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
only under the Sell command). These Plugin Parameters give you the ability
to add in the specific categories you want displayed, remove the ones you
don't, and associate them with icons.

---

List

Category List
- A list of the item categories displayed in the Item/Shop menus.

Type:
- A list of the item categories displayed in the Item/Shop menus.
- Replace x with ID numbers or text.
- AllItems, RegularItems, KeyItems
- HiddenItemA, HiddenItemB
- Consumable, Nonconsumable
- AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
- AllWeapons, WType:x
- AllArmors, AType:x, EType:x
- Category:x

Icon:
- Icon used for this category.
- Use 0 for no icon.

Visibility Switch:
- This Switch must be turned ON in order for the category to show.
- Use 0 for no Switch requirement.

Sort By:
- Sort this category (in Scene_Item and Scene_Shop only) this way.

Style:
- How do you wish to draw categorie entries in the Category Window?
- Text Only: Display only the text.
- Icon Only: Display only the icon.
- Icon + Text: Display the icon first, then the text.
- Auto: Determine which is better to use based on the size of the cell.

Text Alignment
- Decide how you want the text to be aligned.

---

Vocabulary

Hidden Item A
Hidden Item B
Consumable
Nonconsumable
Always Usable
Battle Usable
Field Usable
Never Usable
- How these categories are named in the Item Menu.

---

Plugin Parameters: NEW! Labels

Whenever the player receives a new item(s), a NEW! Label can be placed on
top of the item's icon when browsing a menu displaying the item(s). This is
a quality of life addition from more modern RPG's to help players figure out
what they've recently received. The following are Plugin Parameters made to
adjust how the NEW! Labels are handled in-game.

---

NEW! Labels

Use NEW! Labels?:
- Use the NEW! Labels or not?

Icon:
- The icon index used to represent the NEW! text.
- Use 0 to not draw any icons.

Text:
- The text written on the NEW! Label.

Font Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Font Size:
- The font size used for the NEW! text.

Fade Limit:
- What's the upper opaque limit before reversing?

Fade Speed:
- What's the fade speed of the NEW! Label?

Offset X:
- How much to offset the NEW! Label's X position by.

Offset Y:
- How much to offset the NEW! Label's Y position by.

---

Plugin Parameters: Equip Menu Settings

These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
a more updated and modern layout, changing the styles of other windows, and
other key visual aspects of the Equip Menu Scene. Other settings here allow
you to adjust how equipment operate under certain rulings, too.

---

General

Use Updated Layout:
- Use the Updated Equip Layout provided by this plugin?
- This will override the Core Engine windows settings.

Param Font Size:
- The font size used for parameter values.

Show Menu Portraits?:
- If Main Menu Core is installed, display the Menu Portraits instead of
the actor's face in the status window?

JS: Portrait Upper:
- If Menu Portraits are available, this is code used to draw the upper
data like this in the Status Window.

JS: Face Upper:
- If faces used used, this is code used to draw the upper data like this
in the Status Window.

JS: Parameter Lower:
- Code to determine how parameters are drawn in the Status Window.

Layout Style:
- If using an updated layout, how do you want to style the menu scene?
- Upper Help, Left Input
- Upper Help, Right Input
- Lower Help, Left Input
- Lower Help, Right Input

Status Window Width:
- The usual width of the status window if using the non-Updated Equip
Menu Layout.

Show Back Rectangles?:
- Show back rectangles of darker colors to display information better?

Back Rectangle Color:
- Use #rrggbb for custom colors or regular numbers for text colors
from the Window Skin.

Cursed Equip Popup:
- Text popup appears when an actor equips a cursed weapon/armor.
- Text codes allowed.
- Requires VisuMZ_0_CoreEngine!
- Empty to not use.
-  %1 - Actor, %2 - Equip, %3 - Icon.

---

Command Window

Style:
- How do you wish to draw commands in the Command Window?
- Text Only: Display only the text.
- Icon Only: Display only the icon.
- Icon + Text: Display the icon first, then the text.
- Auto: Determine which is better to use based on the size of the cell.

Text Align:
- Text alignment for the Command Window.

Equip Icon:
- The icon used for the Equip command.

Help Description:
- Help description used when this command is selected.
- Text codes allowed.

Add Optimize Command?:
- Add the "Optimize" command to the Command Window?

Help Description:
- Help description used when this command is selected.
- Text codes allowed.

Optimize Icon:
- The icon used for the Optimize command.

Add Clear Command?:
- Add the "Clear" command to the Command Window?

Help Description:
- Help description used when this command is selected.
- Text codes allowed.

Clear Icon:
- The icon used for the Clear command.

---

Remove Equip

Icon:
- Icon used for equipment removal.

Text:
- Text used for equipment removal.

Use SHIFT Shortcut?:
- Add the "Shift" button as a shortcut key to removing items?

---

Rulings

Equip-Adjust HP/MP:
- Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.

Non-Removable Types:
- Insert ID's of the Equipment Types that must always have an item
equipped and cannot be empty.

Non-Optimized Types:
- Insert ID's of the Equipment Types that will be ignored when equipment
is being optimized.

---

Button Assist Window

SHIFT: Remove:
- Button assist text used for the SHIFT Remove Shortcut.
- For VisuStella MZ's Core Engine's Button Assist Window.

---

Plugin Parameters: Shop Menu Settings

These Plugin Parameters allow you a number of options to adjust the Shop
Menu Scene. These options range from enabling an updated and modern layout,
adjust how various key visual aspects appear, and determine how prices can
be affected when it comes to selling them or buying them (for coders).

---

General

Use Updated Layout:
- Use the Updated Shop Layout provided by this plugin?
- This will override the Core Engine windows settings.

Layout Style:
- If using an updated layout, how do you want to style the menu scene?
- Upper Help, Left Input
- Upper Help, Right Input
- Lower Help, Left Input
- Lower Help, Right Input

---

Switches:

Switch: Buy:
- Buying items in the Shop Scene turns this Switch to ON.
- Switch reverts to OFF whenever the Shop Scene opens.

Switch: Sell
- Selling items in the Shop Scene turns this Switch to ON.
- Switch reverts to OFF whenever the Shop Scene opens.

---

Command Window

Hide Unavailable?:
- Hide all unavailable commands like when a shop is set to Purchase Only?

Style:
- How do you wish to draw commands in the Command Window?
- Text Only: Display only the text.
- Icon Only: Display only the icon.
- Icon + Text: Display the icon first, then the text.
- Auto: Determine which is better to use based on the size of the cell.

Text Align:
- Text alignment for the Command Window.

Buy Icon:
- The icon used for the Buy command.

Sell Icon:
- The icon used for the Sell command.

Cancel Icon:
- The icon used for the Cancel command.

Rename "Cancel":
- Rename Cancel to something more logical for the Shop Menu Scene.

---

Prices

Sell Price Rate:
- The default sell price rate.

JS: Buy Price:
- Modificatons made to the buy price before finalizing it.

JS: Sell Price:
- Modificatons made to the sell price before finalizing it.

---

Button Assist Window

Small Increment:
Large Increment:
- Text used for changing amount bought/sold.
- For VisuStella MZ's Core Engine's Button Assist Window.

---

Plugin Parameters: Shop Status Window

These Plugin Parameters focuses on the Shop Status Window and determines how
its data is displayed.

---

General

Window Width:
- The usual width of the status window.

Parameter Font Size:
- Font size used for parameter changes.

Translucent Opacity:
- Opacity setting used for translucent window objects.

Show Back Rectangles?:
- Show back rectangles of darker colors to display information better?

Back Rectangle Color:
- Use #rrggbb for custom colors or regular numbers for text colors
from the Window Skin.

---

Equipment Data

Data Style:
- How do you wish to display equipment data?
- Compare - Compares selected equip to equipped gear
- Lists all main party actors
- Displays the parameter differences when equipped
- Calculates custom JS values
- Classic - Shows basic parameters of selected equip
- Involves no actors, only shows the item's stats
- Shows weapon or armor specific parameters
- Does not show custom JS values as those are calculated per actor
- Does not show custom parameters as those are calculated per actor
- Use <Status Info> and <Custom Status Info> notetags to overwrite or
add custom data to classic equip data
- Double - Shows basic parameters in double columns
- Involves no actors, only shows the item's stats
- Shows weapon or armor specific parameters
- Does not show custom JS values as those are calculated per actor
- Does not show custom parameters as those are calculated per actor
- Use <Status Info> and <Custom Status Info> notetags to overwrite or
add custom data to classic equip data

Compare Style:

Already Equipped:
- Marker used to show an actor cannot equip an item.

Can't Equip:
- Marker used to show an actor cannot equip an item.

No Changes:
- Marker used to show no changes have occurred.

JS: Draw Equip Data:
- Code used to draw the equipment data for the Shop Status Window.

Classic Style:

Added Weapon Params:
Added Armor Params:
- Display these parameters when a weapon/armor is selected.
- Requires VisuMZ_0_CoreEngine!

JS: Draw Equip Data:
- Code used to draw the equipment data for the Shop Status Window.

Double Style:

Added Weapon Params:
Added Armor Params:
- Display these parameters when a weapon/armor is selected.
- Requires VisuMZ_0_CoreEngine!

JS: Draw Equip Data:
- Code used to draw the equipment data for the Shop Status Window.

Delay MS:
- How many milliseconds (MS) to delay the preview update?
- This is to prevent lag spikes for equips only.

---

Item Data

Max State/Buff Icons:
- Maximum number of icons that can be displayed for Add/Remove
States/Buffs.

Multiplier Standard:
- Constant standard to filter out random values when calculating the
damage multiplier.

JS: Draw Item Data:
- Code used to draw the item data for the Shop Status Window.

---

Vocabulary

Consumable:
Occasions:
Scope:
Speed:
Success Rate:
Repeats:
Hit Type:
Element:
Damage Type:
Effects:
- Vocabulary used for these data entries.
- Some of these have Plugin Parameters have sub-entries.

NOTE: Regarding Damage Labels

If Visu_1_BattleCore is installed, priority goes to its Damage Style
settings. The label displayed is based on the damage style settings in
place for that specific skill or item.

Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
pick the damage style you want to edit > Damage Label and change the
text settings you'd like there.

---
```
