/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 1] [Version 0.1.0] [ItemsEquipsCore]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderBefore VisuMZ_2_ItemCraftingSys
 * @orderBefore VisuMZ_2_WeaponSwapSystem
 * @orderBefore VisuMZ_4_ButtonCmnEvts
 * @orderBefore VisuMZ_4_VisualItemInv
 * @help
 * Inventory, equipment and shop configuration.
 * Enable one Items provider after Core Engine. Keep native database notes and event commands.
 * CoretoConfigSource: inherit reads the original registry entry, even when disabled; own reads this entry.
 * CLI: items-equips --help. Functional edits materialize the effective configuration.
 * Use items-equips api describe for supported operations, arguments and examples.
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
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 * @parent ItemScene:struct
 *
 * @param New:struct
 * @text NEW! Labels
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 * @parent ItemScene:struct
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nif (this.innerHeight > 444) {\\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\\n} else {\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\\n}\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    const standardWidth = ImageManager.standardIconWidth || 32;\\n    paramNameWidth += standardWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @type struct<StatusWindow>
 * @desc Configure the shared item and equipment status window used in inventory and shops.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","EquipDataStyle:str":"compare","EquipDataCompare":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","EquipDataClassic":"","ClassicWeaponParameters:arraystr":"[\"HIT\"]","ClassicArmorParameters:arraystr":"[\"EVA\"]","DrawEquipClassicData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDataDouble":"","DoubleWeaponParameters:arraystr":"[\"HIT\",\"CNT\"]","DoubleArmorParameters:arraystr":"[\"EVA\",\"GRD\"]","DrawEquipDoubleData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","EquipDelayMS:num":"240","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes","EquipType":"","WeaponType:str":"Weapon Type","ArmorType:str":"Armor Type","NoEquipTypeResult:str":"-"}
 * @parent ShopScene:struct
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Force the selected actors to use the supplied equipment type names, in order. Names are case-sensitive and must match Database > Types in this game. Other actors are unchanged.
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Remove the forced layout and restore the actor current class slots. Repeating reset does not duplicate returns.
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purify each listed actor in authored order; absent actor IDs are ignored and duplicates invoke that actor again. No effect in battle. Each invocation advances each currently cursed slot once; refresh/re-entry does not repeat it. Eligible transformed equipment stays in the slot; otherwise native removal/release rules preserve the corresponding object.
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purify every party member, including reserve members. No effect in battle. Each invocation advances each currently cursed slot once; refresh/re-entry does not repeat it. Eligible transformed equipment stays in the slot; otherwise native removal/release rules preserve the corresponding object.
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Open a shop with normalized inclusive item/weapon/armor ID ranges. Skip missing, blank and separator entries; blacklist categories before the optional whitelist. PurchaseOnly hides or disables selling. Uses database prices; event-specific prices are not supported.
 * @arg Step1
 * @text Step 1: Item ID's
 * @type text
 * @desc Editor heading for Step 1: Item ID's. Groups Range Start, Range End. This heading has no independent runtime action.
 * @default 
 *
 * @arg Step1Start:num
 * @text Range Start
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 * @parent Step1
 *
 * @arg Step1End:num
 * @text Range End
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 * @parent Step1
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 * @type text
 * @desc Editor heading for Step 2: Weapon ID's. Groups Range Start, Range End. This heading has no independent runtime action.
 * @default 
 *
 * @arg Step2Start:num
 * @text Range Start
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 * @parent Step2
 *
 * @arg Step2End:num
 * @text Range End
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 * @parent Step2
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 * @type text
 * @desc Editor heading for Step 3: Armor ID's. Groups Range Start, Range End. This heading has no independent runtime action.
 * @default 
 *
 * @arg Step3Start:num
 * @text Range Start
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 * @parent Step3
 *
 * @arg Step3End:num
 * @text Range End
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 * @parent Step3
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @desc True opens BatchShop as purchase-only; false permits selling subject to ordinary shop rules. IE-P-92 decides whether the unavailable Sell command is hidden or disabled. This is a JSON boolean, not a JavaScript expression.
 * @default false
 * @on Purchase-Only
 * @off Sell Accessible
 *
 * @arg Optional
 * @text Optional
 * @type text
 * @desc Editor heading for Optional. Groups Blacklisted Categories, Whitelisted Categories. This heading has no independent runtime action.
 * @default 
 *
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @type string[]
 * @desc Exclude goods matching any listed category name from their Categories notes. Values are names such as "Healing" or "Trade", not Category:name or built-in menu selectors. Matching trims whitespace and ignores case. Blacklist runs first; an empty Whitelist imposes no inclusion restriction.
 * @default []
 * @parent Optional
 *
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @type string[]
 * @desc Keep only goods matching any listed category name from their Categories notes. Values are names such as "Healing" or "Trade", not Category:name or built-in menu selectors. Matching trims whitespace and ignores case. Blacklist runs first; an empty Whitelist imposes no inclusion restriction.
 * @default []
 * @parent Optional
 *
 */

/*~struct~ItemScene:
 * @param General
 * @text General
 * @type text
 * @desc Editor heading for General. Groups Use Updated Layout, Layout Style. This heading has no independent runtime action.
 * @default 
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @type boolean
 * @desc Use an Item menu with a full-width category row above a narrower item list and an adjacent shop-status panel. Layout Style places the help area and chooses the input side; the status panel occupies the opposite side.
 * @default true
 * @on Use
 * @off Don't Use
 * @parent General
 *
 * @param DisabledVanilla:eval
 * @text Disabled: Vanilla
 * @type boolean
 * @desc When EnableLayout is false, true selects the pure native Item scene: the standard four category groups, text category labels, two item columns, no added status panel and standard navigation. False allows the authored category, column, status-panel and control settings. This switch does not disable inventory rules such as quantity caps.
 * @default true
 * @on Pure Vanilla
 * @off Allow Options
 * @parent EnableLayout:eval
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @type select
 * @desc Choose whether the updated item layout places help above or below the content, and input on the left or right.
 * @default upper/left
 * @parent General
 * @option upper/left
 * @value upper/left
 * @option upper/right
 * @value upper/right
 * @option lower/left
 * @value lower/left
 * @option lower/right
 * @value lower/right
 *
 * @param ListWindow
 * @text List Window
 * @type text
 * @desc Editor heading for List Window. Groups Columns. This heading has no independent runtime action.
 * @default 
 *
 * @param ListWindowCols:num
 * @text Columns
 * @type number
 * @desc Number of columns in the ordinary item and equipment replacement lists. Use a positive whole number. Pure vanilla Scene_Item forces two columns; battle/map item windows keep their native columns, and the shop sale list uses one column with the updated shop layout or two without it.
 * @default 1
 * @parent ListWindow
 * @min 1
 *
 * @param ItemQt
 * @text Item Quantity
 * @type text
 * @desc Editor heading for Item Quantity. Groups Item Max, Weapon Max, Armor Max, Quantity Format, Font Size. This heading has no independent runtime action.
 * @default 
 *
 * @param MaxItems:num
 * @text Item Max
 * @type text
 * @desc Default maximum inventory quantity per database identity for items, excluding equipped ownership. An object-specific <Max: N> note overrides this value.
 * @default 99
 * @parent ItemQt
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @type text
 * @desc Default maximum inventory quantity per database identity for weapons, excluding equipped ownership. An object-specific <Max: N> note overrides this value.
 * @default 99
 * @parent ItemQt
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @type text
 * @desc Default maximum inventory quantity per database identity for armors, excluding equipped ownership. An object-specific <Max: N> note overrides this value.
 * @default 99
 * @parent ItemQt
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @type text
 * @desc Quantity text in ordinary item lists and shared item/shop status. %1 is replaced by the party inventory count; for example, "×%1" shows "×3" for three copies. Ordinary quantity text is drawn literally after substitution. Original ButtonCmnEvts 1.11 and VisualItemInv 1.08 also consume this setting when this Items provider is active; show-only button tags do not consume items.
 * @default ×%1
 * @parent ItemQt
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @type text
 * @desc Font size in pixels for the ordinary item-list quantity. Choose a positive size that fits the item row. Original ButtonCmnEvts 1.11 uses it for assigned-button quantities and VisualItemInv 1.08 for enlarged inventory cells when this Items provider is active.
 * @default 22
 * @parent ItemQt
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 * @type text
 * @desc Editor heading for Shop Status Window. Groups Show in Item Menu?, Adjust List Window?, Background Type, JS: X, Y, W, H. This heading has no independent runtime action.
 * @default 
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @type boolean
 * @desc Show the selected item details in an additional status panel in the Item menu when the updated layout is disabled and pure vanilla mode is off. The updated layout always creates this panel, regardless of this toggle.
 * @default true
 * @on Show
 * @off Don't Show
 * @parent ShopStatusWindow
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @type boolean
 * @desc Outside the updated Item layout, reduce the item-list width by the additional status-panel width when that panel is enabled. False retains the original list width. The updated layout supplies its own list rectangle and ignores this toggle.
 * @default true
 * @on Adjust
 * @off Don't
 * @parent ShopStatusWindow
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @type select
 * @desc Choose the Item-menu status panel background: 0 normal window frame/background, 1 dim background, or 2 transparent background.
 * @default 0
 * @parent ShopStatusWindow
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 * @parent ShopStatusWindow
 *
 * @param ButtonAssist
 * @text Button Assist Window
 * @type text
 * @desc Editor heading for Button Assist Window. Groups Switch Category. This heading has no independent runtime action.
 * @default 
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @type text
 * @desc Button assist text used for switching categories.
 * @default Switch Category
 * @parent ButtonAssist
 *
 */

/*~struct~Categories:
 * @param MainList
 * @text List
 * @type text
 * @desc Editor heading for List. Groups Category List, Category Style, Text Alignment. This heading has no independent runtime action.
 * @default 
 *
 * @param List:arraystruct
 * @text Category List
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 * @parent MainList
 *
 * @param Style:str
 * @text Category Style
 * @type select
 * @desc Choose category presentation: text draws the label, icon draws only its configured icon, iconText draws both, and auto uses iconText when the combined label fits, otherwise icon; without an icon auto uses text.
 * @default icon
 * @parent MainList
 * @option text
 * @value text
 * @option icon
 * @value icon
 * @option iconText
 * @value iconText
 * @option auto
 * @value auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @desc Horizontal alignment of category text or combined icon/text within its command cell: left, center or right. Icon-only presentation always centers its icon. Pure vanilla Item mode uses text presentation and still reads this alignment.
 * @default center
 * @parent MainList
 * @option left
 * @option center
 * @option right
 *
 * @param Vocabulary
 * @text Vocabulary
 * @type text
 * @desc Editor heading for Vocabulary. Groups Hidden Item A, Hidden Item B, Consumable, Nonconsumable, Always Usable, Battle Usable, Field Usable, Never Usable. This heading has no independent runtime action.
 * @default 
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @type text
 * @desc Category label for hidden item A, used by a configured IE-P-24 Type of HiddenItemA. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Special Items
 * @parent Vocabulary
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @type text
 * @desc Category label for hidden item B, used by a configured IE-P-24 Type of HiddenItemB. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Unique Items
 * @parent Vocabulary
 *
 * @param Consumable:str
 * @text Consumable
 * @type text
 * @desc Category label for consumable items, used by a configured IE-P-24 Type of Consumable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Consumable
 * @parent Vocabulary
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @type text
 * @desc Category label for nonconsumable items, used by a configured IE-P-24 Type of Nonconsumable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Nonconsumable
 * @parent Vocabulary
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @type text
 * @desc Category label for items with occasion Always, used by a configured IE-P-24 Type of AlwaysUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Usable
 * @parent Vocabulary
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @type text
 * @desc Category label for items usable in battle, used by a configured IE-P-24 Type of BattleUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Battle
 * @parent Vocabulary
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @type text
 * @desc Category label for items usable in the menu, used by a configured IE-P-24 Type of FieldUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Field
 * @parent Vocabulary
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @type text
 * @desc Category label for items with occasion Never, used by a configured IE-P-24 Type of NeverUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.
 * @default Materials
 * @parent Vocabulary
 *
 */

/*~struct~Category:
 * @param Type:str
 * @text Type
 * @type combo
 * @desc Choose which database objects one category includes. AllItems includes all Items records; RegularItems and KeyItems select normal and key items; HiddenItemA/B select hidden item types. AllWeapons/AllArmors select equipment. Consumable/Nonconsumable filter item consumability. AlwaysUsable means occasion Always; BattleUsable includes Always and Battle; FieldUsable includes Always and Menu; NeverUsable means occasion Never.
 * @default RegularItems
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option 
 *
 * @param Icon:num
 * @text Icon
 * @type text
 * @desc Use an icon index from this game's img/system/IconSet.png for the category. Index 0 omits the icon. Choose the index in the MZ icon picker for the game's IconSet.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc Visibility switch for this category: 0 means always visible; a positive native switch ID requires that switch to be ON when the category command list is built.
 * @default 0
 *
 * @param SortBy:str
 * @text Sorted By
 * @type select
 * @desc Sort the matching category: ID orders higher <Sort Priority: N> values first, then ascending database ID; NAME orders native database names with localeCompare and ignores priority. The first configured category with the same Type supplies the sort rule. Applies to matching lists in Scene_Item, Scene_Equip, Scene_Shop and Scene_Battle.
 * @default ID
 * @option ID
 * @value ID
 * @option Name
 * @value Name
 *
 */

/*~struct~NewLabel:
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @desc Mark newly gained inventory objects with the NEW label until the player highlights them. Disabling hides labels and stops new-item tracking updates without erasing stored flags.
 * @default true
 * @on Use
 * @off Don't Use
 *
 * @param Icon:num
 * @text Icon
 * @type text
 * @desc Icon index from this game's img/system/IconSet.png for the NEW label. Use the database icon picker to choose the index. Zero omits the icon; text is controlled separately.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @type text
 * @desc Text painted on the NEW label. An empty string omits text; the separate Icon setting can still display an icon.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @type text
 * @desc NEW label text color: use a hex string such as #ff8800 or a numeric text-color index from this game's window skin.
 * @default 17
 * @parent Text:str
 *
 * @param FontFace:str
 * @text Font Face
 * @type text
 * @desc Font family for NEW label text. It must be loaded by the game; an empty string uses the game's main font.
 * @default Verdana
 * @parent Text:str
 *
 * @param FontSize:str
 * @text Font Size
 * @type text
 * @desc Pixel size of the NEW! marker text, stored as a numeric string. For example, use the JSON string "18" for an 18-pixel font; use a positive size that fits the marker bitmap.
 * @default 16
 * @parent Text:str
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @type text
 * @desc Upper bound of the NEW label's opacity animation counter. It reverses at this bound and at zero. Display opacity saturates at 255, so a higher bound such as 360 creates a fully opaque pause.
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @type text
 * @desc Opacity-counter change per frame for the NEW label pulse. A positive value controls its speed; zero stops the pulse. The direction reverses at zero and Fade Limit.
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @type text
 * @desc Horizontal offset in pixels of the NEW! marker. Positive values move it right; negative values move it left. The ordinary origin is the left edge of the item line rectangle. With VisualItemInv 1.08 enabled, the origin is the enlarged cell top-left.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type text
 * @desc Vertical offset in pixels of the NEW! marker. Positive values move it down; negative values move it up. The ordinary origin vertically centers the 32-pixel marker in the item line. With VisualItemInv 1.08 enabled, the origin is the enlarged cell top-left.
 * @default 4
 *
 */

/*~struct~EquipScene:
 * @param General
 * @text General
 * @type text
 * @desc Editor heading for General. Groups Use Updated Layout, Layout Style, Status Window Width, Show Back Rectangles?, Cursed Equip Popup. This heading has no independent runtime action.
 * @default 
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @type boolean
 * @desc Use an Equip menu with half the screen for actor status and the other half for equipment commands and slots; the status includes a portrait or face and parameter comparisons. Layout Style chooses help and input sides.
 * @default true
 * @on Use
 * @off Don't Use
 * @parent General
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @type select
 * @desc Choose upper/lower help placement and left/right equipment input placement for the updated Equip layout.
 * @default upper/right
 * @parent General
 * @option upper/left
 * @value upper/left
 * @option upper/right
 * @value upper/right
 * @option lower/left
 * @value lower/left
 * @option lower/right
 * @value lower/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @type text
 * @desc Font size in pixels for parameter values in the updated Equip status panel. It is used by the drawing helpers; custom drawing callbacks can choose their own sizes.
 * @default 22
 * @parent EnableLayout:eval
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @type boolean
 * @desc Show the actor's configured menu portrait in updated equipment status when an active Main Menu provider supplies one. Otherwise use the actor-face drawing callback.
 * @default true
 * @on Use Portraits
 * @off Use Faces
 * @parent EnableLayout:eval
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @type note
 * @desc Draw the upper portion of updated equipment status when a menu portrait is available. This callback draws content; its return value is ignored.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 * @parent EnableLayout:eval
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @type note
 * @desc Draw the upper portion of updated equipment status when a menu portrait is unavailable or disabled. This callback draws content; its return value is ignored.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nif (this.innerHeight > 444) {\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\n} else {\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\n}"
 * @parent EnableLayout:eval
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @type note
 * @desc Draw the parameter section of updated equipment status after its portrait or face. This callback draws content; its return value is ignored.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    const standardWidth = ImageManager.standardIconWidth || 32;\n    paramNameWidth += standardWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 * @parent EnableLayout:eval
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @type text
 * @desc Width in pixels of the Equip status window when the updated layout is disabled. The updated layout uses half the screen width instead.
 * @default 312
 * @parent General
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @type boolean
 * @desc Draw the dark rectangles requested by the updated Equip status drawing helpers. False omits these rectangles; it does not hide the text or change the native window background.
 * @default true
 * @on Draw
 * @off Don't Draw
 * @parent General
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @type text
 * @desc Color of the darker rectangles behind status information. Use a hex string such as #202020 or a numeric text-color index from this game's window skin. Requires Show Back Rectangles.
 * @default 19
 * @parent DrawBackRect:eval
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @type note
 * @desc Popup after an actual cursed equip with CoreEngine 1.79+. Native interpolation is %1 actor name, %2 icon escape, %3 equipment name. Empty disables the popup; text codes are supported.
 * @default "%1 is cursed by %3%2!"
 * @parent General
 *
 * @param Command
 * @text Command Window
 * @type text
 * @desc Editor heading for Command Window. Groups Style, Text Align, Equip Icon, Add Optimize Command?, Add Clear Command?. This heading has no independent runtime action.
 * @default 
 *
 * @param CmdStyle:str
 * @text Style
 * @type select
 * @desc Presentation of Equip commands: text, icon, or iconText. auto uses iconText when it fits the command cell, otherwise icon; a command without an icon uses text. In icon mode, the selected command also shows its name.
 * @default auto
 * @parent Command
 * @option text
 * @value text
 * @option icon
 * @value icon
 * @option iconText
 * @value iconText
 * @option auto
 * @value auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @type combo
 * @desc Text alignment for the Command Window.
 * @default center
 * @parent Command
 * @option left
 * @option center
 * @option right
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @type text
 * @desc Icon for the Equip command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.
 * @default 136
 * @parent Command
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @type note
 * @desc Help description used when this command is selected.
 * @default "Pick and choose equipment to change."
 * @parent CmdIconEquip:num
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @type boolean
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 * @on Add
 * @off Don't
 * @parent Command
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @type note
 * @desc Help description used when this command is selected.
 * @default "Equip the strongest available equipment."
 * @parent CommandAddOptimize:eval
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @type text
 * @desc Icon for the Optimize command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.
 * @default 137
 * @parent CommandAddOptimize:eval
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @type boolean
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 * @on Add
 * @off Don't
 * @parent Command
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @type note
 * @desc Help description used when this command is selected.
 * @default "Remove all available equipment."
 * @parent CommandAddClear:eval
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @type text
 * @desc Icon for the Clear command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.
 * @default 135
 * @parent CommandAddClear:eval
 *
 * @param RemoveEquip
 * @text Remove Equip
 * @type text
 * @desc Editor heading for Remove Equip. Groups Icon, Text, Use SHIFT Shortcut?. This heading has no independent runtime action.
 * @default 
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @type text
 * @desc Icon for the empty equipment-replacement choice, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. With VisualItemInv 1.08 enabled, the choice displays this icon enlarged.
 * @default 16
 * @parent RemoveEquip
 *
 * @param RemoveEquipText:str
 * @text Text
 * @type text
 * @desc Text for the empty equipment-replacement choice in the ordinary list. With VisualItemInv 1.08 enabled, that choice displays only the enlarged icon and this text is not drawn.
 * @default Remove
 * @parent RemoveEquip
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @type boolean
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true
 * @on Use
 * @off Don't
 * @parent RemoveEquip
 *
 * @param Rulings
 * @text Rulings
 * @type text
 * @desc Editor heading for Rulings. Groups Equip-Adjust HP/MP, Non-Removable Types, Non-Optimized Types. This heading has no independent runtime action.
 * @default 
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @type boolean
 * @desc After change/force/discard equipment, preserve previous HP/MP proportions using rounded new maxima when current values remain positive. Does not revive zero HP or replenish zero MP. Disabled retains current amounts subject to native clamps. Temporary comparison actors skip this adjustment.
 * @default true
 * @on Adjust
 * @off Don't
 * @parent Rulings
 *
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @type number[]
 * @desc Equipment type IDs that Clear and the empty replacement choice must not remove. Read these IDs from this game's Equipment Types. Eligible replacements and event changes remain allowed.
 * @default []
 * @parent Rulings
 * @min 1
 * @max 100
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @type number[]
 * @desc Equipment type IDs skipped by Optimize, preserving their current equipment. Read these IDs from this game's Equipment Types.
 * @default []
 * @parent Rulings
 * @min 1
 * @max 100
 *
 * @param ButtonAssist
 * @text Button Assist Window
 * @type text
 * @desc Editor heading for Button Assist Window. Groups SHIFT: Remove. This heading has no independent runtime action.
 * @default 
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @type text
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * @default Unequip
 * @parent ButtonAssist
 *
 */

/*~struct~ShopScene:
 * @param General
 * @text General
 * @type text
 * @desc Editor heading for General. Groups Use Updated Layout, Layout Style. This heading has no independent runtime action.
 * @default 
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @type boolean
 * @desc Use a Shop menu with a full-width help area and a goods or quantity list beside an always-visible status panel, replacing the blank initial goods area. Layout Style chooses help and input sides.
 * @default true
 * @on Use
 * @off Don't Use
 * @parent General
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @type select
 * @desc Choose upper/lower help placement and left/right shop input placement for the updated Shop layout.
 * @default upper/left
 * @parent General
 * @option upper/left
 * @value upper/left
 * @option upper/right
 * @value upper/right
 * @option lower/left
 * @value lower/left
 * @option lower/right
 * @value lower/right
 *
 * @param Switches
 * @text Switches
 * @type text
 * @desc Editor heading for Switches. Groups Switch: Buy, Switch: Sell. This heading has no independent runtime action.
 * @default 
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @type switch
 * @desc Game switch ID set ON after a purchase; entering a shop resets this configured switch OFF. Zero disables the purchase flag and also prevents setting the sale flag, matching the supported transaction behavior.
 * @default 0
 * @parent Switches
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @type switch
 * @desc Game switch ID set ON after a sale when Switch Buy is nonzero. Entering a shop resets this configured switch OFF independently of Switch Buy. Zero disables this flag.
 * @default 0
 * @parent Switches
 *
 * @param Command
 * @text Command Window
 * @type text
 * @desc Editor heading for Command Window. Groups Hide Unavailable?, Style, Text Align, Buy Icon, Sell Icon, Cancel Icon, Rename "Cancel". This heading has no independent runtime action.
 * @default 
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @type boolean
 * @desc Hide unavailable shop commands instead of displaying them disabled. Buy is unavailable when the prepared shop has no valid goods; Sell is unavailable in a purchase-only shop. Cancel remains available.
 * @default true
 * @on Hide
 * @off Default
 * @parent Command
 *
 * @param CmdStyle:str
 * @text Style
 * @type select
 * @desc Presentation of Shop commands: text, icon, or iconText. auto uses iconText when it fits the command cell, otherwise icon; a command without an icon uses text. In icon mode, the selected command also shows its name.
 * @default auto
 * @parent Command
 * @option text
 * @value text
 * @option icon
 * @value icon
 * @option iconText
 * @value iconText
 * @option auto
 * @value auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @type combo
 * @desc Text alignment for the Command Window.
 * @default center
 * @parent Command
 * @option left
 * @option center
 * @option right
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @type text
 * @desc Icon for the Buy command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.
 * @default 208
 * @parent Command
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @type text
 * @desc Icon for the Sell command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.
 * @default 314
 * @parent Command
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @type text
 * @desc Icon for the Cancel command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.
 * @default 82
 * @parent Command
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @type text
 * @desc Caption of the shop Cancel command. Empty text removes its visible caption; an icon command style can still show IE-P-97. It does not change the command action.
 * @default Exit
 * @parent Command
 *
 * @param Prices
 * @text Prices
 * @type text
 * @desc Editor heading for Prices. Groups Sell Price Rate, JS: Buy Price, JS: Sell Price. This heading has no independent runtime action.
 * @default 
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @type text
 * @desc Multiplier applied to an item's database price for its default selling price; 0.5 sells at half price. The base result is floored before note overrides and the Sell Price callback.
 * @default 0.50
 * @parent Prices
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @type note
 * @desc Return the final buy price. arguments[0] is the database object; arguments[1] is the note-adjusted price. Buy floors the callback result, maps NaN to zero and clamps nonnegative.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * @parent Prices
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @type note
 * @desc Return the final sell price. arguments[0] is the database object; arguments[1] is the note-adjusted price. Sell does not round or clamp the callback result.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * @parent Prices
 *
 * @param ButtonAssist
 * @text Button Assist Window
 * @type text
 * @desc Editor heading for Button Assist Window. Groups Small Increment, Large Increment. This heading has no independent runtime action.
 * @default 
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @type text
 * @desc Button-assist caption for changing the shop quantity by one with left/right while the quantity window is active. This changes the help text, not the increment.
 * @default -1/+1
 * @parent ButtonAssist
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @type text
 * @desc Button-assist caption for changing the shop quantity by ten with up/down while the quantity window is active. The quantity remains bounded by the shop limits; this changes the help text, not the increment.
 * @default -10/+10
 * @parent ButtonAssist
 *
 */

/*~struct~StatusWindow:
 * @param General
 * @text General
 * @type text
 * @desc Editor heading for General. Groups Window Width, Parameter Font Size, Translucent Opacity, Show Back Rectangles?. This heading has no independent runtime action.
 * @default 
 *
 * @param Width:num
 * @text Window Width
 * @type text
 * @desc Width in UI pixels of the shared item/shop status window. Updated Item and Shop layouts place their list beside this width; the ordinary Item status callback can override its rectangle. Choose a positive width that leaves room for the adjacent list.
 * @default 352
 * @parent General
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @type text
 * @desc Font size in pixels for parameter names and actor differences drawn by the shared equipment comparison helpers. Custom status drawing can choose other sizes.
 * @default 22
 * @parent General
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @type text
 * @desc Opacity for status-window drawing marked as unavailable, such as an actor who cannot equip the selected equipment in the default comparison view. Use a number from 0 (invisible) to 255 (fully opaque); 64 gives a faint appearance. This does not change the opacity of the darker background rectangles.
 * @default 64
 * @parent General
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @type boolean
 * @desc Draw the dark rectangles requested by the shared item/shop status drawing helpers. False omits them while retaining text and the native window background.
 * @default true
 * @on Draw
 * @off Don't Draw
 * @parent General
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @type text
 * @desc Color of the darker rectangles behind status information. Use a hex string such as #202020 or a numeric text-color index from this game's window skin. Requires Show Back Rectangles.
 * @default 19
 * @parent DrawBackRect:eval
 *
 * @param EquipData
 * @text Equipment Data
 * @type text
 * @desc Editor heading for Equipment Data. Groups Data Style, Delay MS. This heading has no independent runtime action.
 * @default 
 *
 * @param EquipDataStyle:str
 * @text Data Style
 * @type select
 * @desc Default equipment presentation in the item/shop status window: compare shows parameter differences for party battle members, classic shows the equipment values in one column, and double shows those values in two columns. Each style uses its corresponding drawing callback, so customized callbacks can change its appearance. A per-equipment Status Style note overrides this default.
 * @default compare
 * @parent EquipData
 * @option compare
 * @value compare
 * @option classic
 * @value classic
 * @option double
 * @value double
 *
 * @param EquipDataCompare
 * @text Compare Style
 * @type text
 * @desc Editor heading for Compare Style. Groups Already Equipped, Can't Equip, No Changes, JS: Draw Equip Data. This heading has no independent runtime action.
 * @default 
 * @parent EquipDataStyle:str
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @type text
 * @desc Text shown in the comparison view when the actor already has this item equipped and has no empty slot of the same equipment type. For example, "E" marks existing equipment; this changes only the marker, not equipment eligibility.
 * @default E
 * @parent EquipDataCompare
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @type text
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 * @parent EquipDataCompare
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @type text
 * @desc Marker used to show no changes have occurred.
 * @default -
 * @parent EquipDataCompare
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @type note
 * @desc Draw equipment details for the compare style in the shared item/shop status window. The selected IE-P-114 style or IE-NT-status-style chooses this callback; its return value is ignored.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 * @parent EquipDataCompare
 *
 * @param EquipDataClassic
 * @text Classic Style
 * @type text
 * @desc Editor heading for Classic Style. Groups Added Weapon Params, Added Armor Params, JS: Draw Equip Data. This heading has no independent runtime action.
 * @default 
 * @parent EquipDataStyle:str
 *
 * @param ClassicWeaponParameters:arraystr
 * @text Added Weapon Params
 * @type combo[]
 * @desc Append these parameter names to the Core Engine displayed-parameter list for a selected weapon in classic style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.
 * @default ["HIT"]
 * @parent EquipDataClassic
 * @option MaxHP
 * @value MaxHP
 * @option MaxMP
 * @value MaxMP
 * @option ATK
 * @value ATK
 * @option DEF
 * @value DEF
 * @option MAT
 * @value MAT
 * @option MDF
 * @value MDF
 * @option AGI
 * @value AGI
 * @option LUK
 * @value LUK
 * @option HIT
 * @value HIT
 * @option EVA
 * @value EVA
 * @option CRI
 * @value CRI
 * @option CEV
 * @value CEV
 * @option MEV
 * @value MEV
 * @option MRF
 * @value MRF
 * @option CNT
 * @value CNT
 * @option HRG
 * @value HRG
 * @option MRG
 * @value MRG
 * @option TRG
 * @value TRG
 * @option TGR
 * @value TGR
 * @option GRD
 * @value GRD
 * @option REC
 * @value REC
 * @option PHA
 * @value PHA
 * @option MCR
 * @value MCR
 * @option TCR
 * @value TCR
 * @option PDR
 * @value PDR
 * @option MDR
 * @value MDR
 * @option FDR
 * @value FDR
 * @option EXR
 * @value EXR
 *
 * @param ClassicArmorParameters:arraystr
 * @text Added Armor Params
 * @type combo[]
 * @desc Append these parameter names to the Core Engine displayed-parameter list for a selected armor in classic style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.
 * @default ["EVA"]
 * @parent EquipDataClassic
 * @option MaxHP
 * @value MaxHP
 * @option MaxMP
 * @value MaxMP
 * @option ATK
 * @value ATK
 * @option DEF
 * @value DEF
 * @option MAT
 * @value MAT
 * @option MDF
 * @value MDF
 * @option AGI
 * @value AGI
 * @option LUK
 * @value LUK
 * @option HIT
 * @value HIT
 * @option EVA
 * @value EVA
 * @option CRI
 * @value CRI
 * @option CEV
 * @value CEV
 * @option MEV
 * @value MEV
 * @option MRF
 * @value MRF
 * @option CNT
 * @value CNT
 * @option HRG
 * @value HRG
 * @option MRG
 * @value MRG
 * @option TRG
 * @value TRG
 * @option TGR
 * @value TGR
 * @option GRD
 * @value GRD
 * @option REC
 * @value REC
 * @option PHA
 * @value PHA
 * @option MCR
 * @value MCR
 * @option TCR
 * @value TCR
 * @option PDR
 * @value PDR
 * @option MDR
 * @value MDR
 * @option FDR
 * @value FDR
 * @option EXR
 * @value EXR
 *
 * @param DrawEquipClassicData:func
 * @text JS: Draw Equip Data
 * @type note
 * @desc Draw equipment details for the classic style in the shared item/shop status window. The selected IE-P-114 style or IE-NT-status-style chooses this callback; its return value is ignored.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 * @parent EquipDataClassic
 *
 * @param EquipDataDouble
 * @text Double Style
 * @type text
 * @desc Editor heading for Double Style. Groups Added Weapon Params, Added Armor Params, JS: Draw Equip Data. This heading has no independent runtime action.
 * @default 
 * @parent EquipDataStyle:str
 *
 * @param DoubleWeaponParameters:arraystr
 * @text Added Weapon Params
 * @type combo[]
 * @desc Append these parameter names to the Core Engine displayed-parameter list for a selected weapon in double style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.
 * @default ["HIT","CNT"]
 * @parent EquipDataDouble
 * @option MaxHP
 * @value MaxHP
 * @option MaxMP
 * @value MaxMP
 * @option ATK
 * @value ATK
 * @option DEF
 * @value DEF
 * @option MAT
 * @value MAT
 * @option MDF
 * @value MDF
 * @option AGI
 * @value AGI
 * @option LUK
 * @value LUK
 * @option HIT
 * @value HIT
 * @option EVA
 * @value EVA
 * @option CRI
 * @value CRI
 * @option CEV
 * @value CEV
 * @option MEV
 * @value MEV
 * @option MRF
 * @value MRF
 * @option CNT
 * @value CNT
 * @option HRG
 * @value HRG
 * @option MRG
 * @value MRG
 * @option TRG
 * @value TRG
 * @option TGR
 * @value TGR
 * @option GRD
 * @value GRD
 * @option REC
 * @value REC
 * @option PHA
 * @value PHA
 * @option MCR
 * @value MCR
 * @option TCR
 * @value TCR
 * @option PDR
 * @value PDR
 * @option MDR
 * @value MDR
 * @option FDR
 * @value FDR
 * @option EXR
 * @value EXR
 *
 * @param DoubleArmorParameters:arraystr
 * @text Added Armor Params
 * @type combo[]
 * @desc Append these parameter names to the Core Engine displayed-parameter list for a selected armor in double style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.
 * @default ["EVA","GRD"]
 * @parent EquipDataDouble
 * @option MaxHP
 * @value MaxHP
 * @option MaxMP
 * @value MaxMP
 * @option ATK
 * @value ATK
 * @option DEF
 * @value DEF
 * @option MAT
 * @value MAT
 * @option MDF
 * @value MDF
 * @option AGI
 * @value AGI
 * @option LUK
 * @value LUK
 * @option HIT
 * @value HIT
 * @option EVA
 * @value EVA
 * @option CRI
 * @value CRI
 * @option CEV
 * @value CEV
 * @option MEV
 * @value MEV
 * @option MRF
 * @value MRF
 * @option CNT
 * @value CNT
 * @option HRG
 * @value HRG
 * @option MRG
 * @value MRG
 * @option TRG
 * @value TRG
 * @option TGR
 * @value TGR
 * @option GRD
 * @value GRD
 * @option REC
 * @value REC
 * @option PHA
 * @value PHA
 * @option MCR
 * @value MCR
 * @option TCR
 * @value TCR
 * @option PDR
 * @value PDR
 * @option MDR
 * @value MDR
 * @option FDR
 * @value FDR
 * @option EXR
 * @value EXR
 *
 * @param DrawEquipDoubleData:func
 * @text JS: Draw Equip Data
 * @type note
 * @desc Draw equipment details for the double style in the shared item/shop status window. The selected IE-P-114 style or IE-NT-status-style chooses this callback; its return value is ignored.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 * @parent EquipDataDouble
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @type number
 * @desc Delay in milliseconds before refreshing selected equipment details. Zero schedules the refresh without an added delay. A callback only refreshes if its equipment is still selected; item details do not use this delay.
 * @default 240
 * @parent EquipData
 * @min 1
 * @max 999
 *
 * @param ItemData
 * @text Item Data
 * @type text
 * @desc Editor heading for Item Data. Groups Data Settings, Vocabulary. This heading has no independent runtime action.
 * @default 
 *
 * @param ItemGeneral
 * @text Data Settings
 * @type text
 * @desc Editor heading for Data Settings. Groups Max State/Buff Icons, Multiplier Standard, JS: Draw Item Data. This heading has no independent runtime action.
 * @default 
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @type text
 * @desc Maximum icon count for the Removed Effects row. The runtime uses at least one icon and truncates to the available icons. The Added Effects row uses a fixed maximum of eight, independent of this setting.
 * @default 8
 * @parent ItemGeneral
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @type text
 * @desc Positive numeric reference value used only to estimate the displayed multiplier for a manual damage formula. The preview substitutes this value for the sample user stats, uses 1 for an enemy target (the reference value for a recovery target), evaluates the formula and divides by the sample user attack. Keep 1000000 for the usual approximation of stat coefficients; with a.atk + 100, choosing 100 displays 200%. This does not set real actor stats or combat damage. A recognized Battle Core damage style can provide its own display instead.
 * @default 1000000
 * @parent ItemGeneral
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @type note
 * @desc Draw item/skill details in the shared status window when the selected object is not equipment. The return value is ignored. The shipped callback omits use, damage and effect rows for occasion Never, while still drawing name, quantity and custom rows.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 * @parent ItemGeneral
 *
 * @param Vocabulary
 * @text Vocabulary
 * @type text
 * @desc Editor heading for Vocabulary. Groups Consumable, Occasions, Scope, Battle Core Support, Speed, Success Rate, Repeats, Hit Type, Element, Damage Type, Effects, Equip Type. This heading has no independent runtime action.
 * @default 
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @type text
 * @desc Heading of the Consumable row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Consumable
 * @parent Vocabulary
 *
 * @param Consumable:str
 * @text Yes
 * @type text
 * @desc Value shown for a consumable item unless Core Engine key-item protection applies. This changes displayed wording, not the database setting or gameplay effect.
 * @default ✔
 * @parent LabelConsume:str
 *
 * @param NotConsumable:str
 * @text No
 * @type text
 * @desc Value shown for a nonconsumable or protected key item. This changes displayed wording, not the database setting or gameplay effect.
 * @default ✘
 * @parent LabelConsume:str
 *
 * @param Occasions
 * @text Occasions
 * @type text
 * @desc Editor heading for Occasions. Groups Always, Battle Screen, Menu Screen, Never. This heading has no independent runtime action.
 * @default 
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @type text
 * @desc Value for occasion 0 (Always). This changes displayed wording, not the database setting or gameplay effect.
 * @default Anytime Use
 * @parent Occasions
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @type text
 * @desc Value for occasion 1 (Battle Screen). This changes displayed wording, not the database setting or gameplay effect.
 * @default Battle-Only
 * @parent Occasions
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @type text
 * @desc Value for occasion 2 (Menu Screen). This changes displayed wording, not the database setting or gameplay effect.
 * @default Field-Only
 * @parent Occasions
 *
 * @param Occasion3:str
 * @text Never
 * @type text
 * @desc Value for occasion 3 (Never); the shipped drawing callback omits the occasion row for this case. This changes displayed wording, not the database setting or gameplay effect.
 * @default -
 * @parent Occasions
 *
 * @param Scope
 * @text Scope
 * @type text
 * @desc Editor heading for Scope. Groups None, 1 Enemy, All Enemies, 1 Random Enemy, 2 Random Enemies, 3 Random Enemies, 4 Random Enemies, 1 Ally, All Allies, 1 Ally (Dead), All Allies (Dead), The User, 1 Ally (DoA), All Allies (DoA), Enemies & Allies. This heading has no independent runtime action.
 * @default 
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @type text
 * @desc Value for scope 0 (None). This changes displayed wording, not the database setting or gameplay effect.
 * @default No Target
 * @parent Scope
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @type text
 * @desc Value for scope 1 (One Enemy). This changes displayed wording, not the database setting or gameplay effect.
 * @default 1 Foe
 * @parent Scope
 *
 * @param Scope2:str
 * @text All Enemies
 * @type text
 * @desc Value for scope 2 (All Enemies). This changes displayed wording, not the database setting or gameplay effect.
 * @default All Foes
 * @parent Scope
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @type text
 * @desc Value for scope 3 (One Random Enemy). This changes displayed wording, not the database setting or gameplay effect.
 * @default Random Foe
 * @parent Scope
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @type text
 * @desc Value for scope 4 (Two Random Enemies). This changes displayed wording, not the database setting or gameplay effect.
 * @default 2 Random Foes
 * @parent Scope
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @type text
 * @desc Value for scope 5 (Three Random Enemies). This changes displayed wording, not the database setting or gameplay effect.
 * @default 3 Random Foes
 * @parent Scope
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @type text
 * @desc Value for scope 6 (Four Random Enemies). This changes displayed wording, not the database setting or gameplay effect.
 * @default 4 Random Foes
 * @parent Scope
 *
 * @param Scope7:str
 * @text 1 Ally
 * @type text
 * @desc Value for scope 7 (One Living Ally). This changes displayed wording, not the database setting or gameplay effect.
 * @default 1 Ally
 * @parent Scope
 *
 * @param Scope8:str
 * @text All Allies
 * @type text
 * @desc Value for scope 8 (All Living Allies). This changes displayed wording, not the database setting or gameplay effect.
 * @default Alive Allies
 * @parent Scope
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @type text
 * @desc Value for scope 9 (One Dead Ally). This changes displayed wording, not the database setting or gameplay effect.
 * @default Dead Ally
 * @parent Scope
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @type text
 * @desc Value for scope 10 (All Dead Allies). This changes displayed wording, not the database setting or gameplay effect.
 * @default Dead Allies
 * @parent Scope
 *
 * @param Scope11:str
 * @text The User
 * @type text
 * @desc Value for scope 11 (User). This changes displayed wording, not the database setting or gameplay effect.
 * @default User
 * @parent Scope
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @type text
 * @desc Caption for native scope 12: one ally, dead or alive (DoA). Unlike scope 7, the ally does not have to be alive; unlike scope 9, the ally does not have to be dead. This setting changes the displayed wording, not the item scope.
 * @default Any Ally
 * @parent Scope
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @type text
 * @desc Caption for native scope 13: all allies, dead or alive (DoA). Unlike scope 8, this includes dead allies; unlike scope 10, it also includes living allies. This setting changes the displayed wording, not the item scope.
 * @default All Allies
 * @parent Scope
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @type text
 * @desc Value for scope 14 (Everyone). This changes displayed wording, not the database setting or gameplay effect.
 * @default Everybody
 * @parent Scope
 *
 * @param BattleCore
 * @text Battle Core Support
 * @type text
 * @desc Editor heading for Battle Core Support. Groups x Random Any, x Random Enemies, x Random Allies, All Allies But User, Ally or Enemy, Enemy or Ally. This heading has no independent runtime action.
 * @default 
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @type text
 * @desc Caption for <Target: x Random Any>. The %1 placeholder becomes the numeric target count x; for example, "Targets: %1 Units" with <Target: 3 Random Any> displays "Targets: 3 Units". A string without %1 is displayed literally.
 * @default %1 Random Units
 * @parent BattleCore
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @type text
 * @desc Caption for <Target: x Random Enemies>. The %1 placeholder becomes the numeric target count x; for example, "Targets: %1 Foes" with <Target: 3 Random Enemies> displays "Targets: 3 Foes". A string without %1 is displayed literally.
 * @default %1 Random Foes
 * @parent BattleCore
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @type text
 * @desc Caption for <Target: x Random Allies>. The %1 placeholder becomes the numeric target count x; for example, "Targets: %1 Allies" with <Target: 3 Random Allies> displays "Targets: 3 Allies". A string without %1 is displayed literally.
 * @default %1 Random Allies
 * @parent BattleCore
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @type text
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 * @parent BattleCore
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @type text
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 * @parent BattleCore
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @type text
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 * @parent BattleCore
 *
 * @param LabelSpeed:str
 * @text Speed
 * @type text
 * @desc Heading of the action Speed row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Speed
 * @parent Vocabulary
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @type text
 * @desc Speed value for action speed at least 2000. This changes displayed wording, not the database setting or gameplay effect.
 * @default Fastest
 * @parent LabelSpeed:str
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @type text
 * @desc Speed value for action speed from 1000 to below 2000. This changes displayed wording, not the database setting or gameplay effect.
 * @default Faster
 * @parent LabelSpeed:str
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @type text
 * @desc Speed value for action speed above 0 and below 1000. This changes displayed wording, not the database setting or gameplay effect.
 * @default Fast
 * @parent LabelSpeed:str
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @type text
 * @desc Speed value for action speed exactly 0. This changes displayed wording, not the database setting or gameplay effect.
 * @default Normal
 * @parent LabelSpeed:str
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @type text
 * @desc Speed value for action speed above -1000 and below 0. This changes displayed wording, not the database setting or gameplay effect.
 * @default Slow
 * @parent LabelSpeed:str
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @type text
 * @desc Speed value for action speed above -2000 through -1000. This changes displayed wording, not the database setting or gameplay effect.
 * @default Slower
 * @parent LabelSpeed:str
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @type text
 * @desc Speed value for action speed at or below -2000. This changes displayed wording, not the database setting or gameplay effect.
 * @default Slowest
 * @parent LabelSpeed:str
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @type text
 * @desc Heading of the success-rate row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Accuracy
 * @parent Vocabulary
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @type text
 * @desc Heading of the action repeat-count row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Hits
 * @parent Vocabulary
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @type text
 * @desc Heading of the hit-type row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Type
 * @parent Vocabulary
 *
 * @param HitType0:str
 * @text Certain Hit
 * @type text
 * @desc Value for hit type 0 (Certain Hit). This changes displayed wording, not the database setting or gameplay effect.
 * @default Neutral
 * @parent LabelHitType:str
 *
 * @param HitType1:str
 * @text Physical
 * @type text
 * @desc Value for hit type 1 (Physical Attack). This changes displayed wording, not the database setting or gameplay effect.
 * @default Physical
 * @parent LabelHitType:str
 *
 * @param HitType2:str
 * @text Magical
 * @type text
 * @desc Value for hit type 2 (Magical Attack). This changes displayed wording, not the database setting or gameplay effect.
 * @default Magical
 * @parent LabelHitType:str
 *
 * @param LabelElement:str
 * @text Element
 * @type text
 * @desc Heading of the damage-element row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Element
 * @parent Vocabulary
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @type text
 * @desc Element value when the damage element uses the user normal-attack elements (negative ID). This changes displayed wording, not the database setting or gameplay effect.
 * @default \I[97]Weapon
 * @parent LabelElement:str
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @type text
 * @desc Element value for damage element 0 (None). This changes displayed wording, not the database setting or gameplay effect.
 * @default \I[160]No Element
 * @parent LabelElement:str
 *
 * @param DamageType
 * @text Damage Type
 * @type text
 * @desc Editor heading for Damage Type. Groups HP Damage, MP Damage, HP Recovery, MP Recovery, HP Drain, MP Drain. This heading has no independent runtime action.
 * @default 
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @type text
 * @desc Heading for the HP damage multiplier in item details; %1 inserts this game's HP name. For example, "%1 Damage" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.
 * @default %1 Damage Multiplier
 * @parent DamageType
 *
 * @param DamageType2:str
 * @text MP Damage
 * @type text
 * @desc Heading for the MP damage multiplier in item details; %1 inserts this game's MP name. For example, "%1 Damage" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.
 * @default %1 Damage Multiplier
 * @parent DamageType
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @type text
 * @desc Heading for the HP recovery multiplier in item details; %1 inserts this game's HP name. For example, "%1 Recovery" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.
 * @default %1 Recovery Multiplier
 * @parent DamageType
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @type text
 * @desc Heading for the MP recovery multiplier in item details; %1 inserts this game's MP name. For example, "%1 Recovery" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.
 * @default %1 Recovery Multiplier
 * @parent DamageType
 *
 * @param DamageType5:str
 * @text HP Drain
 * @type text
 * @desc Heading for the HP drain multiplier in item details; %1 inserts this game's HP name. For example, "%1 Drain" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.
 * @default %1 Drain Multiplier
 * @parent DamageType
 *
 * @param DamageType6:str
 * @text MP Drain
 * @type text
 * @desc Heading for the MP drain multiplier in item details; %1 inserts this game's MP name. For example, "%1 Drain" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.
 * @default %1 Drain Multiplier
 * @parent DamageType
 *
 * @param Effects
 * @text Effects
 * @type text
 * @desc Editor heading for Effects. Groups Recover HP, Recover MP, Recover TP, Self Gain TP, Damage HP, Damage MP, Damage TP, Add State/Buff, Remove State/Buff. This heading has no independent runtime action.
 * @default 
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @type text
 * @desc Heading for recovered HP in the item status effects rows. The %1 placeholder becomes the game's HP term from Database > Terms; for example, "Restore %1" displays "Restore HP" when that term is "HP". A string without %1 is displayed literally.
 * @default %1 Recovery
 * @parent Effects
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @type text
 * @desc Heading for recovered MP in the item status effects rows. The %1 placeholder becomes the game's MP term from Database > Terms; for example, "Restore %1" displays "Restore MP" when that term is "MP". A string without %1 is displayed literally.
 * @default %1 Recovery
 * @parent Effects
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @type text
 * @desc Heading for recovered TP in the item status effects rows. The %1 placeholder becomes the game's TP term from Database > Terms; for example, "Restore %1" displays "Restore TP" when that term is "TP". A string without %1 is displayed literally.
 * @default %1 Recovery
 * @parent Effects
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @type text
 * @desc Heading for TP gained by the item user in the item status effects rows. The %1 placeholder becomes the game's TP term from Database > Terms; for example, "User %1" displays "User TP" when that term is "TP". A string without %1 is displayed literally.
 * @default User %1
 * @parent Effects
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @type text
 * @desc Heading for HP lost through item effects in the item status effects rows. The %1 placeholder becomes the game's HP term from Database > Terms; for example, "Lost %1" displays "Lost HP" when that term is "HP". A string without %1 is displayed literally.
 * @default %1 Damage
 * @parent Effects
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @type text
 * @desc Heading for MP lost through item effects in the item status effects rows. The %1 placeholder becomes the game's MP term from Database > Terms; for example, "Lost %1" displays "Lost MP" when that term is "MP". A string without %1 is displayed literally.
 * @default %1 Damage
 * @parent Effects
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @type text
 * @desc Heading for TP lost through item effects in the item status effects rows. The %1 placeholder becomes the game's TP term from Database > Terms; for example, "Lost %1" displays "Lost TP" when that term is "TP". A string without %1 is displayed literally.
 * @default %1 Damage
 * @parent Effects
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @type text
 * @desc Heading of the added-state/buff effects row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Applies
 * @parent Effects
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @type text
 * @desc Heading of the removed-state/buff effects row. This changes displayed wording, not the database setting or gameplay effect.
 * @default Removes
 * @parent Effects
 *
 * @param EquipType
 * @text Equip Type
 * @type text
 * @desc Editor heading for Equip Type. Groups Weapon Type, Armor Type, No Equip Type. This heading has no independent runtime action.
 * @default 
 * @parent Vocabulary
 *
 * @param WeaponType:str
 * @text Weapon Type
 * @type text
 * @desc Heading for the selected weapon type in Classic/Double equipment details. This changes displayed wording, not the database setting or gameplay effect.
 * @default Weapon Type
 * @parent EquipType
 *
 * @param ArmorType:str
 * @text Armor Type
 * @type text
 * @desc Heading for the selected armor type in Classic/Double equipment details. This changes displayed wording, not the database setting or gameplay effect.
 * @default Armor Type
 * @parent EquipType
 *
 * @param NoEquipTypeResult:str
 * @text No Equip Type
 * @type text
 * @desc Fallback value when the selected equipment has no named weapon/armor type. This changes displayed wording, not the database setting or gameplay effect.
 * @default -
 * @parent EquipType
 *
 */

(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_1_ItemsEquipsCore","namespace":"items-equips","version":"0.1.0","engine":{"name":"MZ","version":"1.10.0"},"reference":{"pluginId":"VisuMZ_1_ItemsEquipsCore","version":"1.61"},"description":"Inventory, equipment and shop settings and native event authorship.","limits":"Supports inventory, class/forced slots and equipment restrictions, commerce, parameter/artifact effects, curse/purification, Item/Equip/Shop presentation and standard/modern navigation. Consumer-specific integrations retain their separately qualified contracts; enable only qualified provider compositions.","dependencies":{"required":[["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine"]],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{},"consumers":{"VisuMZ_2_ItemCraftingSys":"1.26","VisuMZ_2_WeaponSwapSystem":"1.14","VisuMZ_4_ButtonCmnEvts":"1.11","VisuMZ_4_VisualItemInv":"1.08"},"integrations":{"Coreto_1_BattleCore":"0.1.0","VisuMZ_1_BattleCore":"1.90","Coreto_1_OptionsCore":"0.1.0","VisuMZ_1_OptionsCore":"1.28"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_BattleCore","VisuMZ_1_BattleCore"],"orderBefore":["VisuMZ_2_ItemCraftingSys","VisuMZ_2_WeaponSwapSystem","VisuMZ_4_ButtonCmnEvts","VisuMZ_4_VisualItemInv"],"configuration":{"key":"CoretoConfigSource","default":"inherit","modes":["inherit","own"]},"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"IE-P-1","key":"ItemScene","storageKey":"ItemScene:struct","label":"Item Menu Settings","description":"Change the Item Menu Scene settings.","type":"struct","editorType":"struct<ItemScene>","nativeDefault":"{\"General\":\"\",\"EnableLayout:eval\":\"true\",\"LayoutStyle:str\":\"upper/left\",\"ListWindow\":\"\",\"ListWindowCols:num\":\"1\",\"ItemQt\":\"\",\"MaxItems:num\":\"99\",\"MaxWeapons:num\":\"99\",\"MaxArmors:num\":\"99\",\"ItemQuantityFmt:str\":\"×%1\",\"ItemQuantityFontSize:num\":\"22\",\"ShopStatusWindow\":\"\",\"ShowShopStatus:eval\":\"true\",\"ItemSceneAdjustItemList:eval\":\"true\",\"ItemMenuStatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._itemWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._itemWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonAssist\":\"\",\"buttonAssistCategory:str\":\"Switch Category\"}","encoding":"plain","availability":"supported","structName":"ItemScene","fields":[{"id":"IE-P-2","key":"General","storageKey":"General","label":"General","description":"Editor heading for General. Groups Use Updated Layout, Layout Style. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-3","IE-P-5"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-3 --json","items-equips api describe IE-P-5 --json"]},{"id":"IE-P-3","key":"EnableLayout","storageKey":"EnableLayout:eval","label":"Use Updated Layout","description":"Use an Item menu with a full-width category row above a narrower item list and an adjacent shop-status panel. Layout Style places the help area and chooses the input side; the status panel occupies the opposite side.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General","on":"Use","off":"Don't Use","default":true,"context":"Native ItemScene setting; restart after authoring changes. Values are stored without offline JavaScript execution. Updated layout takes precedence over vanilla suppression and the custom Item status rectangle."},{"id":"IE-P-4","key":"DisabledVanilla","storageKey":"DisabledVanilla:eval","label":"Disabled: Vanilla","description":"When EnableLayout is false, true selects the pure native Item scene: the standard four category groups, text category labels, two item columns, no added status panel and standard navigation. False allows the authored category, column, status-panel and control settings. This switch does not disable inventory rules such as quantity caps.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"EnableLayout:eval","on":"Pure Vanilla","off":"Allow Options","default":true,"context":"Only applies to Scene_Item while the updated item layout is disabled. The updated layout takes precedence; restart after changing plugin parameters."},{"id":"IE-P-5","key":"LayoutStyle","storageKey":"LayoutStyle:str","label":"Layout Style","description":"Choose whether the updated item layout places help above or below the content, and input on the left or right.","type":"string","editorType":"select","nativeDefault":"upper/left","encoding":"plain","availability":"supported","parent":"General","options":["upper/left","upper/right","lower/left","lower/right"],"default":"upper/left","context":"Native ItemScene setting; restart after authoring changes. Values are stored without offline JavaScript execution. Upper/lower chooses help placement; left/right chooses input placement. Explicit Options UI style positions take precedence when enabled."},{"id":"IE-P-6","key":"ListWindow","storageKey":"ListWindow","label":"List Window","description":"Editor heading for List Window. Groups Columns. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-7"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-7 --json"]},{"id":"IE-P-7","key":"ListWindowCols","storageKey":"ListWindowCols:num","label":"Columns","description":"Number of columns in the ordinary item and equipment replacement lists. Use a positive whole number. Pure vanilla Scene_Item forces two columns; battle/map item windows keep their native columns, and the shop sale list uses one column with the updated shop layout or two without it.","type":"number","editorType":"number","nativeDefault":"1","encoding":"plain","availability":"supported","parent":"ListWindow","min":1,"default":1},{"id":"IE-P-8","key":"ItemQt","storageKey":"ItemQt","label":"Item Quantity","description":"Editor heading for Item Quantity. Groups Item Max, Weapon Max, Armor Max, Quantity Format, Font Size. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-9","IE-P-10","IE-P-11","IE-P-12","IE-P-13"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-9 --json","items-equips api describe IE-P-10 --json"]},{"id":"IE-P-9","key":"MaxItems","storageKey":"MaxItems:num","label":"Item Max","description":"Default maximum inventory quantity per database identity for items, excluding equipped ownership. An object-specific <Max: N> note overrides this value.","type":"number","editorType":"text","nativeDefault":"99","encoding":"plain","availability":"supported","parent":"ItemQt","default":99,"context":"Choose a nonnegative whole-number quantity, for example 99; zero prevents gaining more of that identity. The CLI accepts finite numbers without imposing a narrower range. The limit is applied when native gainItem changes the inventory; lowering a configured limit does not sweep an existing save immediately. Use IE-NT-max for an object-specific limit.","members":["IE-NT-max"]},{"id":"IE-P-10","key":"MaxWeapons","storageKey":"MaxWeapons:num","label":"Weapon Max","description":"Default maximum inventory quantity per database identity for weapons, excluding equipped ownership. An object-specific <Max: N> note overrides this value.","type":"number","editorType":"text","nativeDefault":"99","encoding":"plain","availability":"supported","parent":"ItemQt","default":99,"context":"Choose a nonnegative whole-number quantity, for example 99; zero prevents gaining more of that identity. The CLI accepts finite numbers without imposing a narrower range. The limit is applied when native gainItem changes the inventory; lowering a configured limit does not sweep an existing save immediately. Use IE-NT-max for an object-specific limit.","members":["IE-NT-max"]},{"id":"IE-P-11","key":"MaxArmors","storageKey":"MaxArmors:num","label":"Armor Max","description":"Default maximum inventory quantity per database identity for armors, excluding equipped ownership. An object-specific <Max: N> note overrides this value.","type":"number","editorType":"text","nativeDefault":"99","encoding":"plain","availability":"supported","parent":"ItemQt","default":99,"context":"Choose a nonnegative whole-number quantity, for example 99; zero prevents gaining more of that identity. The CLI accepts finite numbers without imposing a narrower range. The limit is applied when native gainItem changes the inventory; lowering a configured limit does not sweep an existing save immediately. Use IE-NT-max for an object-specific limit.","members":["IE-NT-max"]},{"id":"IE-P-12","key":"ItemQuantityFmt","storageKey":"ItemQuantityFmt:str","label":"Quantity Format","description":"Quantity text in ordinary item lists and shared item/shop status. %1 is replaced by the party inventory count; for example, \"×%1\" shows \"×3\" for three copies. Ordinary quantity text is drawn literally after substitution. Original ButtonCmnEvts 1.11 and VisualItemInv 1.08 also consume this setting when this Items provider is active; show-only button tags do not consume items.","type":"string","editorType":"text","nativeDefault":"×%1","encoding":"plain","availability":"supported","parent":"ItemQt","default":"×%1"},{"id":"IE-P-13","key":"ItemQuantityFontSize","storageKey":"ItemQuantityFontSize:num","label":"Font Size","description":"Font size in pixels for the ordinary item-list quantity. Choose a positive size that fits the item row. Original ButtonCmnEvts 1.11 uses it for assigned-button quantities and VisualItemInv 1.08 for enlarged inventory cells when this Items provider is active.","type":"number","editorType":"text","nativeDefault":"22","encoding":"plain","availability":"supported","parent":"ItemQt","default":22},{"id":"IE-P-14","key":"ShopStatusWindow","storageKey":"ShopStatusWindow","label":"Shop Status Window","description":"Editor heading for Shop Status Window. Groups Show in Item Menu?, Adjust List Window?, Background Type, JS: X, Y, W, H. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-15","IE-P-16","IE-P-17","IE-P-18"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-15 --json","items-equips api describe IE-P-16 --json"]},{"id":"IE-P-15","key":"ShowShopStatus","storageKey":"ShowShopStatus:eval","label":"Show in Item Menu?","description":"Show the selected item details in an additional status panel in the Item menu when the updated layout is disabled and pure vanilla mode is off. The updated layout always creates this panel, regardless of this toggle.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"ShopStatusWindow","on":"Show","off":"Don't Show","default":true,"context":"The panel is created when entering the Item scene. Set EnableLayout=false and DisabledVanilla=false to let this toggle control it. Shop scenes have their own status panel. Restart after configuration changes."},{"id":"IE-P-16","key":"ItemSceneAdjustItemList","storageKey":"ItemSceneAdjustItemList:eval","label":"Adjust List Window?","description":"Outside the updated Item layout, reduce the item-list width by the additional status-panel width when that panel is enabled. False retains the original list width. The updated layout supplies its own list rectangle and ignores this toggle.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"ShopStatusWindow","on":"Adjust","off":"Don't","default":true},{"id":"IE-P-17","key":"ItemMenuStatusBgType","storageKey":"ItemMenuStatusBgType:num","label":"Background Type","description":"Choose the Item-menu status panel background: 0 normal window frame/background, 1 dim background, or 2 transparent background.","type":"number","editorType":"select","nativeDefault":"0","encoding":"plain","availability":"supported","parent":"ShopStatusWindow","options":[0,1,2],"default":0,"optionLabels":{"0":"Window","1":"Dim","2":"Transparent"},"context":"Applies when Scene_Item creates its status panel. EnableLayout=true creates it; with EnableLayout=false, ShowShopStatus must be true and DisabledVanilla false. This is a native window background mode, not an opacity percentage."},{"id":"IE-P-18","key":"ItemMenuStatusRect","storageKey":"ItemMenuStatusRect:func","label":"JS: X, Y, W, H","description":"Code dimensions for this Status Window in the Item Menu.","type":"string","editorType":"note","nativeDefault":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","encoding":"json","availability":"supported","parent":"ShopStatusWindow","javascript":{"kind":"body","receiver":"Scene_Item","arguments":[],"returnType":"Rectangle for the status panel.","failure":"Exceptions propagate from the authored rectangle callback."},"context":"Runs with the live Scene_Item as this after its item list has been created, when the additional status panel is created outside the updated layout. Return an MZ Rectangle in game UI coordinates; this._itemWindow and this.statusWidth() are available. EnableLayout=true uses the updated layout rectangle instead. With EnableLayout=false, ShowShopStatus must be true and DisabledVanilla false. Authoring validates the JavaScript without executing it; restart the game after edits.","default":"const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"},{"id":"IE-P-19","key":"ButtonAssist","storageKey":"ButtonAssist","label":"Button Assist Window","description":"Editor heading for Button Assist Window. Groups Switch Category. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-20"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-20 --json"]},{"id":"IE-P-20","key":"buttonAssistCategory","storageKey":"buttonAssistCategory:str","label":"Switch Category","description":"Button assist text used for switching categories.","type":"string","editorType":"text","nativeDefault":"Switch Category","encoding":"plain","availability":"supported","parent":"ButtonAssist","default":"Switch Category","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."}],"default":{"General":"","EnableLayout":true,"DisabledVanilla":true,"LayoutStyle":"upper/left","ListWindow":"","ListWindowCols":1,"ItemQt":"","MaxItems":99,"MaxWeapons":99,"MaxArmors":99,"ItemQuantityFmt":"×%1","ItemQuantityFontSize":22,"ShopStatusWindow":"","ShowShopStatus":true,"ItemSceneAdjustItemList":true,"ItemMenuStatusBgType":0,"ItemMenuStatusRect":"const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);","ButtonAssist":"","buttonAssistCategory":"Switch Category"},"context":"A complete configuration object for Item Menu Settings. Read it before editing. A whole-object write requires every declared field, including unchanged editorial values; omitted fields are rejected. To change one value while preserving siblings, write that child path instead. Restart the game after configuration changes.","writing":"Use items-equips parameters get --project <game> --path /ItemScene --json, change the intended fields of result.value, then submit the complete JSON object with items-equips parameters set --project <game> --path /ItemScene --value <JSON>. The plugin entry must exist. Unrelated native values are preserved. Reload the editor after writing.","defaultReason":"The default belongs to resetting this whole block; an individual field reset uses that field descriptor. Native fields omitted from stored configuration are read with their individual defaults."},{"id":"IE-P-21","key":"Categories","storageKey":"Categories:struct","label":"Item Categories","description":"Change the categories displayed in the Item/Shop menus.","type":"struct","editorType":"struct<Categories>","nativeDefault":"{\"MainList\":\"\",\"List:arraystruct\":\"[\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"FieldUsable\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"208\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"BattleUsable\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"218\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"NeverUsable\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"302\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"AllWeapons\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"97\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"EType:2\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"128\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"EType:3\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"131\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"EType:4\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"137\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"EType:5\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"145\\\\\\\"}\\\",\\\"{\\\\\\\"Type:str\\\\\\\":\\\\\\\"KeyItems\\\\\\\",\\\\\\\"Icon:num\\\\\\\":\\\\\\\"195\\\\\\\"}\\\"]\",\"Style:str\":\"icon\",\"TextAlign:str\":\"center\",\"Vocabulary\":\"\",\"HiddenItemA:str\":\"Special Items\",\"HiddenItemB:str\":\"Unique Items\",\"Consumable:str\":\"Consumable\",\"Nonconsumable:str\":\"Nonconsumable\",\"AlwaysUsable:str\":\"Usable\",\"BattleUsable:str\":\"Battle\",\"FieldUsable:str\":\"Field\",\"NeverUsable:str\":\"Materials\"}","encoding":"plain","availability":"supported","parent":"ItemScene:struct","structName":"Categories","fields":[{"id":"IE-P-22","key":"MainList","storageKey":"MainList","label":"List","description":"Editor heading for List. Groups Category List, Category Style, Text Alignment. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-23","IE-P-28","IE-P-29"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-23 --json","items-equips api describe IE-P-28 --json"]},{"id":"IE-P-23","key":"List","storageKey":"List:arraystruct","label":"Category List","description":"A list of the item categories displayed in the Item/Shop menus.","type":"array","editorType":"struct<Category>[]","nativeDefault":"[\"{\\\"Type:str\\\":\\\"RegularItems\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"AllArmors\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","encoding":"plain","availability":"supported","parent":"MainList","items":{"type":"struct","structName":"Category","fields":[{"id":"IE-P-24","key":"Type","storageKey":"Type:str","label":"Type","description":"Choose which database objects one category includes. AllItems includes all Items records; RegularItems and KeyItems select normal and key items; HiddenItemA/B select hidden item types. AllWeapons/AllArmors select equipment. Consumable/Nonconsumable filter item consumability. AlwaysUsable means occasion Always; BattleUsable includes Always and Battle; FieldUsable includes Always and Menu; NeverUsable means occasion Never.","type":"string","editorType":"combo","nativeDefault":"RegularItems","encoding":"plain","availability":"supported","suggestions":["AllItems","","RegularItems","KeyItems","HiddenItemA","HiddenItemB","","Consumable","Nonconsumable","","AlwaysUsable","BattleUsable","FieldUsable","NeverUsable","","AllWeapons","WType:x","","AllArmors","AType:x","","EType:x","","Category:x",""],"default":"RegularItems","context":"WType:x and AType:x match a weapon/armor type ID or exact Database Types name. EType:x matches equipment type: a numeric ID can include weapons and armors, while the named form selects armors. Use forms such as WType:1 or Category:Healing. Category:x matches the case-insensitive trimmed name in an object category note (see IE-NT-categories). Blank suggestions are editor separators, not useful categories; unknown strings match no objects. Set an existing zero-based array index, or replace the complete list to add an entry. Use numeric WType/AType/EType forms when a visible database type name is needed: the built-in label resolver derives type labels from numeric selectors. Category:x displays x; configured vocabulary can be replaced by an active localization entry.","members":["IE-NT-categories"]},{"id":"IE-P-25","key":"Icon","storageKey":"Icon:num","label":"Icon","description":"Use an icon index from this game's img/system/IconSet.png for the category. Index 0 omits the icon. Choose the index in the MZ icon picker for the game's IconSet.","type":"number","editorType":"text","nativeDefault":"0","encoding":"plain","availability":"supported","default":0,"context":"Use a nonnegative whole-number icon index present in the game asset. The CLI accepts finite numbers without checking the image bounds. Categories Style text ignores the icon; icon displays only the icon, iconText displays it with the category label, and auto chooses based on available width. The referenced asset is prepared by the game author."},{"id":"IE-P-26","key":"SwitchID","storageKey":"SwitchID:num","label":"Visibility Switch","description":"Visibility switch for this category: 0 means always visible; a positive native switch ID requires that switch to be ON when the category command list is built.","type":"number","editorType":"switch","nativeDefault":"0","encoding":"plain","availability":"supported","default":0,"context":"Use an existing switch ID for gated visibility. Reopen the menu after changing a switch to rebuild its category list; this field does not poll and rebuild an already-open command list."},{"id":"IE-P-27","key":"SortBy","storageKey":"SortBy:str","label":"Sorted By","description":"Sort the matching category: ID orders higher <Sort Priority: N> values first, then ascending database ID; NAME orders native database names with localeCompare and ignores priority. The first configured category with the same Type supplies the sort rule. Applies to matching lists in Scene_Item, Scene_Equip, Scene_Shop and Scene_Battle.","type":"string","editorType":"select","nativeDefault":"ID","encoding":"plain","availability":"supported","options":["ID","Name"],"default":"ID","context":" Use IE-NT-sort-priority to author priority. A category filter must match the list; changing this field does not create category membership."}],"availability":"supported"},"default":[{"Type":"RegularItems","Icon":208,"SwitchID":0,"SortBy":"ID"},{"Type":"AllWeapons","Icon":97,"SwitchID":0,"SortBy":"ID"},{"Type":"AllArmors","Icon":137,"SwitchID":0,"SortBy":"ID"},{"Type":"KeyItems","Icon":195,"SwitchID":0,"SortBy":"ID"}],"context":"An ordered array of Category objects. Writing this path replaces the whole category list; include every desired entry and all four fields Type, Icon, SwitchID and SortBy. Child paths such as /Categories/List/0/Type edit an existing zero-based entry without replacing siblings. The standalone list default differs from the list in the /Categories whole-block default; each reset uses its exact target default. Restart after edits."},{"id":"IE-P-28","key":"Style","storageKey":"Style:str","label":"Category Style","description":"Choose category presentation: text draws the label, icon draws only its configured icon, iconText draws both, and auto uses iconText when the combined label fits, otherwise icon; without an icon auto uses text.","type":"string","editorType":"select","nativeDefault":"icon","encoding":"plain","availability":"supported","parent":"MainList","options":["text","icon","iconText","auto"],"default":"icon","context":"An icon-only entry with Icon 0 has no icon to draw; choose text or supply an icon. Pure vanilla Item mode forces text regardless of this setting. The Shop scene also uses the authored category style. Restart after edits."},{"id":"IE-P-29","key":"TextAlign","storageKey":"TextAlign:str","label":"Text Alignment","description":"Horizontal alignment of category text or combined icon/text within its command cell: left, center or right. Icon-only presentation always centers its icon. Pure vanilla Item mode uses text presentation and still reads this alignment.","type":"string","editorType":"combo","nativeDefault":"center","encoding":"plain","availability":"supported","parent":"MainList","suggestions":["left","center","right"],"default":"center"},{"id":"IE-P-30","key":"Vocabulary","storageKey":"Vocabulary","label":"Vocabulary","description":"Editor heading for Vocabulary. Groups Hidden Item A, Hidden Item B, Consumable, Nonconsumable, Always Usable, Battle Usable, Field Usable, Never Usable. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-31","IE-P-32","IE-P-33","IE-P-34","IE-P-35","IE-P-36","IE-P-37","IE-P-38"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-31 --json","items-equips api describe IE-P-32 --json"]},{"id":"IE-P-31","key":"HiddenItemA","storageKey":"HiddenItemA:str","label":"Hidden Item A","description":"Category label for hidden item A, used by a configured IE-P-24 Type of HiddenItemA. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Special Items","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Special Items"},{"id":"IE-P-32","key":"HiddenItemB","storageKey":"HiddenItemB:str","label":"Hidden Item B","description":"Category label for hidden item B, used by a configured IE-P-24 Type of HiddenItemB. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Unique Items","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Unique Items"},{"id":"IE-P-33","key":"Consumable","storageKey":"Consumable:str","label":"Consumable","description":"Category label for consumable items, used by a configured IE-P-24 Type of Consumable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Consumable","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Consumable"},{"id":"IE-P-34","key":"Nonconsumable","storageKey":"Nonconsumable:str","label":"Nonconsumable","description":"Category label for nonconsumable items, used by a configured IE-P-24 Type of Nonconsumable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Nonconsumable","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Nonconsumable"},{"id":"IE-P-35","key":"AlwaysUsable","storageKey":"AlwaysUsable:str","label":"Always Usable","description":"Category label for items with occasion Always, used by a configured IE-P-24 Type of AlwaysUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Usable","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Usable"},{"id":"IE-P-36","key":"BattleUsable","storageKey":"BattleUsable:str","label":"Battle Usable","description":"Category label for items usable in battle, used by a configured IE-P-24 Type of BattleUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Battle","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Battle"},{"id":"IE-P-37","key":"FieldUsable","storageKey":"FieldUsable:str","label":"Field Usable","description":"Category label for items usable in the menu, used by a configured IE-P-24 Type of FieldUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Field","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Field"},{"id":"IE-P-38","key":"NeverUsable","storageKey":"NeverUsable:str","label":"Never Usable","description":"Category label for items with occasion Never, used by a configured IE-P-24 Type of NeverUsable. It does not add a category or change item usability. Text escapes can be drawn by iconText presentation; an empty label has no visible text.","type":"string","editorType":"text","nativeDefault":"Materials","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Materials"}],"default":{"MainList":"","List":[{"Type":"FieldUsable","Icon":208,"SwitchID":0,"SortBy":"ID"},{"Type":"BattleUsable","Icon":218,"SwitchID":0,"SortBy":"ID"},{"Type":"NeverUsable","Icon":302,"SwitchID":0,"SortBy":"ID"},{"Type":"AllWeapons","Icon":97,"SwitchID":0,"SortBy":"ID"},{"Type":"EType:2","Icon":128,"SwitchID":0,"SortBy":"ID"},{"Type":"EType:3","Icon":131,"SwitchID":0,"SortBy":"ID"},{"Type":"EType:4","Icon":137,"SwitchID":0,"SortBy":"ID"},{"Type":"EType:5","Icon":145,"SwitchID":0,"SortBy":"ID"},{"Type":"KeyItems","Icon":195,"SwitchID":0,"SortBy":"ID"}],"Style":"icon","TextAlign":"center","Vocabulary":"","HiddenItemA":"Special Items","HiddenItemB":"Unique Items","Consumable":"Consumable","Nonconsumable":"Nonconsumable","AlwaysUsable":"Usable","BattleUsable":"Battle","FieldUsable":"Field","NeverUsable":"Materials"},"context":"A complete configuration object for Item Categories. Read it before editing. A whole-object write requires every declared field, including unchanged editorial values; omitted fields are rejected. To change one value while preserving siblings, write that child path instead. Restart the game after configuration changes.","writing":"Use items-equips parameters get --project <game> --path /Categories --json, change the intended fields of result.value, then submit the complete JSON object with items-equips parameters set --project <game> --path /Categories --value <JSON>. The plugin entry must exist. Unrelated native values are preserved. Reload the editor after writing.","defaultReason":"Resetting /Categories uses this object default, whose list starts with FieldUsable. Resetting /Categories/List uses that child descriptor default, whose list starts with RegularItems. These are distinct reset targets; inspect the default of the exact path you intend to reset."},{"id":"IE-P-39","key":"New","storageKey":"New:struct","label":"NEW! Labels","description":"Change how NEW! Labels apply to your game project.","type":"struct","editorType":"struct<NewLabel>","nativeDefault":"{\"Enable:eval\":\"true\",\"Icon:num\":\"0\",\"Text:str\":\"NEW!\",\"FontColor:str\":\"17\",\"FontFace:str\":\"Verdana\",\"FontSize:str\":\"16\",\"FadeLimit:num\":\"360\",\"FadeSpeed:num\":\"4\",\"OffsetX:num\":\"0\",\"OffsetY:num\":\"4\"}","encoding":"plain","availability":"supported","parent":"ItemScene:struct","structName":"NewLabel","fields":[{"id":"IE-P-40","key":"Enable","storageKey":"Enable:eval","label":"Use NEW! Labels?","description":"Mark newly gained inventory objects with the NEW label until the player highlights them. Disabling hides labels and stops new-item tracking updates without erasing stored flags.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","on":"Use","off":"Don't Use","default":true,"context":" Flags belong to Game_Party and are saved with the game; a new game starts with an empty flag list. Re-enabling tracking can reveal previously stored flags. See Game_Party.setNewItem, Game_Party.clearNewItem and Game_Party.isNewItem."},{"id":"IE-P-41","key":"Icon","storageKey":"Icon:num","label":"Icon","description":"Icon index from this game's img/system/IconSet.png for the NEW label. Use the database icon picker to choose the index. Zero omits the icon; text is controlled separately.","type":"number","editorType":"text","nativeDefault":"0","encoding":"plain","availability":"supported","default":0},{"id":"IE-P-42","key":"Text","storageKey":"Text:str","label":"Text","description":"Text painted on the NEW label. An empty string omits text; the separate Icon setting can still display an icon.","type":"string","editorType":"text","nativeDefault":"NEW!","encoding":"plain","availability":"supported","default":"NEW!"},{"id":"IE-P-43","key":"FontColor","storageKey":"FontColor:str","label":"Font Color","description":"NEW label text color: use a hex string such as #ff8800 or a numeric text-color index from this game's window skin.","type":"string","editorType":"text","nativeDefault":"17","encoding":"plain","availability":"supported","parent":"Text:str","default":"17"},{"id":"IE-P-44","key":"FontFace","storageKey":"FontFace:str","label":"Font Face","description":"Font family for NEW label text. It must be loaded by the game; an empty string uses the game's main font.","type":"string","editorType":"text","nativeDefault":"Verdana","encoding":"plain","availability":"supported","parent":"Text:str","default":"Verdana"},{"id":"IE-P-45","key":"FontSize","storageKey":"FontSize:str","label":"Font Size","description":"Pixel size of the NEW! marker text, stored as a numeric string. For example, use the JSON string \"18\" for an 18-pixel font; use a positive size that fits the marker bitmap.","type":"string","editorType":"text","nativeDefault":"16","encoding":"plain","availability":"supported","parent":"Text:str","default":"16"},{"id":"IE-P-46","key":"FadeLimit","storageKey":"FadeLimit:num","label":"Fade Limit","description":"Upper bound of the NEW label's opacity animation counter. It reverses at this bound and at zero. Display opacity saturates at 255, so a higher bound such as 360 creates a fully opaque pause.","type":"number","editorType":"text","nativeDefault":"360","encoding":"plain","availability":"supported","default":360},{"id":"IE-P-47","key":"FadeSpeed","storageKey":"FadeSpeed:num","label":"Fade Speed","description":"Opacity-counter change per frame for the NEW label pulse. A positive value controls its speed; zero stops the pulse. The direction reverses at zero and Fade Limit.","type":"number","editorType":"text","nativeDefault":"4","encoding":"plain","availability":"supported","default":4},{"id":"IE-P-48","key":"OffsetX","storageKey":"OffsetX:num","label":"Offset X","description":"Horizontal offset in pixels of the NEW! marker. Positive values move it right; negative values move it left. The ordinary origin is the left edge of the item line rectangle. With VisualItemInv 1.08 enabled, the origin is the enlarged cell top-left.","type":"number","editorType":"text","nativeDefault":"0","encoding":"plain","availability":"supported","default":0},{"id":"IE-P-49","key":"OffsetY","storageKey":"OffsetY:num","label":"Offset Y","description":"Vertical offset in pixels of the NEW! marker. Positive values move it down; negative values move it up. The ordinary origin vertically centers the 32-pixel marker in the item line. With VisualItemInv 1.08 enabled, the origin is the enlarged cell top-left.","type":"number","editorType":"text","nativeDefault":"4","encoding":"plain","availability":"supported","default":4}],"default":{"Enable":true,"Icon":0,"Text":"NEW!","FontColor":"17","FontFace":"Verdana","FontSize":"16","FadeLimit":360,"FadeSpeed":4,"OffsetX":0,"OffsetY":4},"context":"A complete configuration object for NEW! Labels. Read it before editing. A whole-object write requires every declared field, including unchanged editorial values; omitted fields are rejected. To change one value while preserving siblings, write that child path instead. Restart the game after configuration changes.","writing":"Use items-equips parameters get --project <game> --path /New --json, change the intended fields of result.value, then submit the complete JSON object with items-equips parameters set --project <game> --path /New --value <JSON>. The plugin entry must exist. Unrelated native values are preserved. Reload the editor after writing.","defaultReason":"The default belongs to resetting this whole block; an individual field reset uses that field descriptor. Native fields omitted from stored configuration are read with their individual defaults."},{"id":"IE-P-50","key":"EquipScene","storageKey":"EquipScene:struct","label":"Equip Menu Settings","description":"Adjust the settings regarding the Equip Menu Scene.","type":"struct","editorType":"struct<EquipScene>","nativeDefault":"{\"General\":\"\",\"EnableLayout:eval\":\"true\",\"ParamValueFontSize:num\":\"22\",\"MenuPortraits:eval\":\"true\",\"DrawPortraitJS:func\":\"\\\"// Declare Variables\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst x1 = padding;\\\\nconst x2 = this.innerWidth - 128 - padding;\\\\n\\\\n// Draw Menu Image\\\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\\\n\\\\n// Draw Data\\\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\\\"\",\"DrawFaceJS:func\":\"\\\"// Declare Variables\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst x = Math.floor(this.innerWidth / 2);\\\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\\\nlet dataHeight = lineHeight * 3;\\\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\\\n\\\\n// Draw Data\\\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\\\nif (this.innerHeight > 444) {\\\\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\\\\n} else {\\\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\\\\n}\\\"\",\"DrawParamJS:func\":\"\\\"// Declare variables\\\\nconst params = this.actorParams();\\\\nconst lineHeight = this.lineHeight();\\\\nconst padding = this.itemPadding();\\\\nconst baseX = 0;\\\\nconst baseY = this.innerHeight - params.length * lineHeight;\\\\nconst baseWidth = this.innerWidth;\\\\nconst valueFontSize = this.paramValueFontSize();\\\\n\\\\n// Calculate Widths\\\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\\\nparamNameWidth += padding * 2;\\\\nif (this.isUseParamNamesWithIcons()) {\\\\n    const standardWidth = ImageManager.standardIconWidth || 32;\\\\n    paramNameWidth += standardWidth + 4;\\\\n}\\\\nlet arrowWidth = this.rightArrowWidth();\\\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\\\n\\\\n// Draw Parameters\\\\nlet x = baseX;\\\\nlet y = baseY;\\\\nlet value = 0;\\\\nlet diffValue = 0;\\\\nlet alter = 2;\\\\nfor (const paramId of params) {\\\\n    // Draw Param Name\\\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\\\n    this.resetFontSettings();\\\\n    x += paramNameWidth;\\\\n\\\\n    // Draw Param Before\\\\n    this.contents.fontSize = valueFontSize;\\\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\\\n    this.resetFontSettings();\\\\n    x += paramValueWidth;\\\\n\\\\n    // Draw Arrow\\\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\\\n    this.drawRightArrow(x, y);\\\\n    x += arrowWidth;\\\\n\\\\n    // Draw Param After\\\\n    this.contents.fontSize = valueFontSize;\\\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\\\n    x += paramValueWidth;\\\\n\\\\n    // Draw Param Change\\\\n    if (totalDivides > 2) {\\\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\\\n    }\\\\n\\\\n    // Prepare Next Parameter\\\\n    x = baseX;\\\\n    y += lineHeight;\\\\n    alter = alter === 2 ? 1 : 2;\\\\n}\\\"\",\"LayoutStyle:str\":\"upper/right\",\"StatusWindowWidth:num\":\"312\",\"DrawBackRect:eval\":\"true\",\"BackRectColor:str\":\"19\",\"CursedTextPopup:json\":\"\\\"%1 is cursed by %3%2!\\\"\",\"Command\":\"\",\"CmdStyle:str\":\"auto\",\"CmdTextAlign:str\":\"center\",\"CmdIconEquip:num\":\"136\",\"equipCmdDesc:json\":\"\\\"Pick and choose equipment to change.\\\"\",\"CommandAddOptimize:eval\":\"true\",\"optimizeCmdDesc:json\":\"\\\"Equip the strongest available equipment.\\\"\",\"CmdIconOptimize:num\":\"137\",\"CommandAddClear:eval\":\"true\",\"clearCmdDesc:json\":\"\\\"Remove all available equipment.\\\"\",\"CmdIconClear:num\":\"135\",\"RemoveEquip\":\"\",\"RemoveEquipIcon:num\":\"16\",\"RemoveEquipText:str\":\"Remove\",\"ShiftShortcutKey:eval\":\"true\",\"Rulings\":\"\",\"EquipAdjustHpMp:eval\":\"true\",\"NonRemoveETypes:arraynum\":\"[]\",\"NonOptimizeETypes:arraynum\":\"[]\",\"ButtonAssist\":\"\",\"buttonAssistRemove:str\":\"Unequip\"}","encoding":"plain","availability":"supported","structName":"EquipScene","fields":[{"id":"IE-P-51","key":"General","storageKey":"General","label":"General","description":"Editor heading for General. Groups Use Updated Layout, Layout Style, Status Window Width, Show Back Rectangles?, Cursed Equip Popup. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-52","IE-P-53","IE-P-59","IE-P-60","IE-P-62"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-52 --json","items-equips api describe IE-P-53 --json"]},{"id":"IE-P-52","key":"EnableLayout","storageKey":"EnableLayout:eval","label":"Use Updated Layout","description":"Use an Equip menu with half the screen for actor status and the other half for equipment commands and slots; the status includes a portrait or face and parameter comparisons. Layout Style chooses help and input sides.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General","on":"Use","off":"Don't Use","default":true,"context":"Restart after authoring changes. With the updated layout off, the standard equipment layout uses Status Window Width. Explicit Options UI positions take precedence when enabled."},{"id":"IE-P-53","key":"LayoutStyle","storageKey":"LayoutStyle:str","label":"Layout Style","description":"Choose upper/lower help placement and left/right equipment input placement for the updated Equip layout.","type":"string","editorType":"select","nativeDefault":"upper/right","encoding":"plain","availability":"supported","parent":"General","options":["upper/left","upper/right","lower/left","lower/right"],"default":"upper/right","context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution. Upper/lower chooses help placement; left/right chooses input placement. Explicit Options UI style positions take precedence when enabled."},{"id":"IE-P-54","key":"ParamValueFontSize","storageKey":"ParamValueFontSize:num","label":"Param Font Size","description":"Font size in pixels for parameter values in the updated Equip status panel. It is used by the drawing helpers; custom drawing callbacks can choose their own sizes.","type":"number","editorType":"text","nativeDefault":"22","encoding":"plain","availability":"supported","parent":"EnableLayout:eval","default":22,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-55","key":"MenuPortraits","storageKey":"MenuPortraits:eval","label":"Show Menu Portraits?","description":"Show the actor's configured menu portrait in updated equipment status when an active Main Menu provider supplies one. Otherwise use the actor-face drawing callback.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"EnableLayout:eval","on":"Use Portraits","off":"Use Faces","default":true,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution. Requires an active MainMenu provider and a nonempty actor menu image; otherwise DrawFaceJS runs. Activate Coreto_1_MainMenuCore or a supported Main Menu provider. For actor portrait setup, query main-menu api describe MM-NT-menu-image --json; it documents the actor Note tag and the required img/pictures resource. Use main-menu api describe MM-C-ChangeActorMenuImageGroup --json to change the portrait of an already initialized actor through an event."},{"id":"IE-P-56","key":"DrawPortraitJS","storageKey":"DrawPortraitJS:func","label":"JS: Portrait Upper","description":"Draw the upper portion of updated equipment status when a menu portrait is available. This callback draws content; its return value is ignored.","type":"string","editorType":"note","nativeDefault":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","encoding":"json","availability":"supported","parent":"EnableLayout:eval","javascript":{"kind":"body","receiver":"Window_EquipStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs with Window_EquipStatus as this, no arguments. this._actor is the displayed actor; this._tempActor is the potential equipment preview or null. Requires updated layout, Menu Portraits and an available actor menu image. Repeated refreshes may invoke it; author drawing rather than one-time game-state changes. Activate Coreto_1_MainMenuCore or a supported Main Menu provider. For actor portrait setup, query main-menu api describe MM-NT-menu-image --json; it documents the actor Note tag and the required img/pictures resource. Use main-menu api describe MM-C-ChangeActorMenuImageGroup --json to change the portrait of an already initialized actor through an event.","default":"// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"},{"id":"IE-P-57","key":"DrawFaceJS","storageKey":"DrawFaceJS:func","label":"JS: Face Upper","description":"Draw the upper portion of updated equipment status when a menu portrait is unavailable or disabled. This callback draws content; its return value is ignored.","type":"string","editorType":"note","nativeDefault":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nif (this.innerHeight > 444) {\\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\\n} else {\\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\\n}\"","encoding":"json","availability":"supported","parent":"EnableLayout:eval","javascript":{"kind":"body","receiver":"Window_EquipStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs with Window_EquipStatus as this, no arguments, while the updated layout is active. this._actor is the displayed actor; this._tempActor is the potential equipment preview or null. Repeated refreshes may invoke it; author drawing rather than one-time game-state changes.","default":"// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nif (this.innerHeight > 444) {\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\n} else {\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\n}"},{"id":"IE-P-58","key":"DrawParamJS","storageKey":"DrawParamJS:func","label":"JS: Parameter Lower","description":"Draw the parameter section of updated equipment status after its portrait or face. This callback draws content; its return value is ignored.","type":"string","editorType":"note","nativeDefault":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    const standardWidth = ImageManager.standardIconWidth || 32;\\n    paramNameWidth += standardWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","encoding":"json","availability":"supported","parent":"EnableLayout:eval","javascript":{"kind":"body","receiver":"Window_EquipStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs with Window_EquipStatus as this, no arguments, while the updated layout is active. this._actor is the current actor; this._tempActor is the potential equipment preview or null. Repeated refreshes may invoke it; author drawing rather than one-time game-state changes.","default":"// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    const standardWidth = ImageManager.standardIconWidth || 32;\n    paramNameWidth += standardWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"},{"id":"IE-P-59","key":"StatusWindowWidth","storageKey":"StatusWindowWidth:num","label":"Status Window Width","description":"Width in pixels of the Equip status window when the updated layout is disabled. The updated layout uses half the screen width instead.","type":"number","editorType":"text","nativeDefault":"312","encoding":"plain","availability":"supported","parent":"General","default":312,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-60","key":"DrawBackRect","storageKey":"DrawBackRect:eval","label":"Show Back Rectangles?","description":"Draw the dark rectangles requested by the updated Equip status drawing helpers. False omits these rectangles; it does not hide the text or change the native window background.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General","on":"Draw","off":"Don't Draw","default":true,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-61","key":"BackRectColor","storageKey":"BackRectColor:str","label":"Back Rectangle Color","description":"Color of the darker rectangles behind status information. Use a hex string such as #202020 or a numeric text-color index from this game's window skin. Requires Show Back Rectangles.","type":"string","editorType":"text","nativeDefault":"19","encoding":"plain","availability":"supported","parent":"DrawBackRect:eval","default":"19","context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-62","key":"CursedTextPopup","storageKey":"CursedTextPopup:json","label":"Cursed Equip Popup","description":"Popup after an actual cursed equip with CoreEngine 1.79+. Native interpolation is %1 actor name, %2 icon escape, %3 equipment name. Empty disables the popup; text codes are supported.","type":"string","editorType":"note","nativeDefault":"\"%1 is cursed by %3%2!\"","encoding":"json","availability":"supported","parent":"General","default":"%1 is cursed by %3%2!"},{"id":"IE-P-63","key":"Command","storageKey":"Command","label":"Command Window","description":"Editor heading for Command Window. Groups Style, Text Align, Equip Icon, Add Optimize Command?, Add Clear Command?. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-64","IE-P-65","IE-P-66","IE-P-68","IE-P-71"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-64 --json","items-equips api describe IE-P-65 --json"]},{"id":"IE-P-64","key":"CmdStyle","storageKey":"CmdStyle:str","label":"Style","description":"Presentation of Equip commands: text, icon, or iconText. auto uses iconText when it fits the command cell, otherwise icon; a command without an icon uses text. In icon mode, the selected command also shows its name.","type":"string","editorType":"select","nativeDefault":"auto","encoding":"plain","availability":"supported","parent":"Command","options":["text","icon","iconText","auto"],"default":"auto","context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-65","key":"CmdTextAlign","storageKey":"CmdTextAlign:str","label":"Text Align","description":"Text alignment for the Command Window.","type":"string","editorType":"combo","nativeDefault":"center","encoding":"plain","availability":"supported","parent":"Command","suggestions":["left","center","right"],"default":"center","context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-66","key":"CmdIconEquip","storageKey":"CmdIconEquip:num","label":"Equip Icon","description":"Icon for the Equip command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.","type":"number","editorType":"text","nativeDefault":"136","encoding":"plain","availability":"supported","parent":"Command","default":136,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-67","key":"equipCmdDesc","storageKey":"equipCmdDesc:json","label":"Help Description","description":"Help description used when this command is selected.","type":"string","editorType":"note","nativeDefault":"\"Pick and choose equipment to change.\"","encoding":"json","availability":"supported","parent":"CmdIconEquip:num","default":"Pick and choose equipment to change.","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."},{"id":"IE-P-68","key":"CommandAddOptimize","storageKey":"CommandAddOptimize:eval","label":"Add Optimize Command?","description":"Add the \"Optimize\" command to the Command Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Command","on":"Add","off":"Don't","default":true,"context":"Adds the Optimize command to the Equip command window."},{"id":"IE-P-69","key":"optimizeCmdDesc","storageKey":"optimizeCmdDesc:json","label":"Help Description","description":"Help description used when this command is selected.","type":"string","editorType":"note","nativeDefault":"\"Equip the strongest available equipment.\"","encoding":"json","availability":"supported","parent":"CommandAddOptimize:eval","default":"Equip the strongest available equipment.","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."},{"id":"IE-P-70","key":"CmdIconOptimize","storageKey":"CmdIconOptimize:num","label":"Optimize Icon","description":"Icon for the Optimize command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.","type":"number","editorType":"text","nativeDefault":"137","encoding":"plain","availability":"supported","parent":"CommandAddOptimize:eval","default":137,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-71","key":"CommandAddClear","storageKey":"CommandAddClear:eval","label":"Add Clear Command?","description":"Add the \"Clear\" command to the Command Window?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Command","on":"Add","off":"Don't","default":true,"context":"Adds the Clear command to the Equip command window."},{"id":"IE-P-72","key":"clearCmdDesc","storageKey":"clearCmdDesc:json","label":"Help Description","description":"Help description used when this command is selected.","type":"string","editorType":"note","nativeDefault":"\"Remove all available equipment.\"","encoding":"json","availability":"supported","parent":"CommandAddClear:eval","default":"Remove all available equipment.","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."},{"id":"IE-P-73","key":"CmdIconClear","storageKey":"CmdIconClear:num","label":"Clear Icon","description":"Icon for the Clear command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.","type":"number","editorType":"text","nativeDefault":"135","encoding":"plain","availability":"supported","parent":"CommandAddClear:eval","default":135,"context":"Native EquipScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-74","key":"RemoveEquip","storageKey":"RemoveEquip","label":"Remove Equip","description":"Editor heading for Remove Equip. Groups Icon, Text, Use SHIFT Shortcut?. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-75","IE-P-76","IE-P-77"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-75 --json","items-equips api describe IE-P-76 --json"]},{"id":"IE-P-75","key":"RemoveEquipIcon","storageKey":"RemoveEquipIcon:num","label":"Icon","description":"Icon for the empty equipment-replacement choice, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. With VisualItemInv 1.08 enabled, the choice displays this icon enlarged.","type":"number","editorType":"text","nativeDefault":"16","encoding":"plain","availability":"supported","parent":"RemoveEquip","default":16,"context":"Icon painted beside the empty replacement choice."},{"id":"IE-P-76","key":"RemoveEquipText","storageKey":"RemoveEquipText:str","label":"Text","description":"Text for the empty equipment-replacement choice in the ordinary list. With VisualItemInv 1.08 enabled, that choice displays only the enlarged icon and this text is not drawn.","type":"string","editorType":"text","nativeDefault":"Remove","encoding":"plain","availability":"supported","parent":"RemoveEquip","default":"Remove","context":"The empty choice is absent for a non-removable equipment type. Reload the editor and restart after changing the text."},{"id":"IE-P-77","key":"ShiftShortcutKey","storageKey":"ShiftShortcutKey:eval","label":"Use SHIFT Shortcut?","description":"Add the \"Shift\" button as a shortcut key to removing items?","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"RemoveEquip","on":"Use","off":"Don't","default":true,"context":"When the equipment-slot list is active, select an occupied removable slot and press Shift to unequip it. Locked, sealed or non-removable slots reject removal. The shortcut is available with standard and modern Core Engine controls when enabled; it does not act from the replacement-item list. Restart after changing this setting."},{"id":"IE-P-78","key":"Rulings","storageKey":"Rulings","label":"Rulings","description":"Editor heading for Rulings. Groups Equip-Adjust HP/MP, Non-Removable Types, Non-Optimized Types. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-79","IE-P-80","IE-P-81"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-79 --json","items-equips api describe IE-P-80 --json"]},{"id":"IE-P-79","key":"EquipAdjustHpMp","storageKey":"EquipAdjustHpMp:eval","label":"Equip-Adjust HP/MP","description":"After change/force/discard equipment, preserve previous HP/MP proportions using rounded new maxima when current values remain positive. Does not revive zero HP or replenish zero MP. Disabled retains current amounts subject to native clamps. Temporary comparison actors skip this adjustment.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Rulings","on":"Adjust","off":"Don't","default":true},{"id":"IE-P-80","key":"NonRemoveETypes","storageKey":"NonRemoveETypes:arraynum","label":"Non-Removable Types","description":"Equipment type IDs that Clear and the empty replacement choice must not remove. Read these IDs from this game's Equipment Types. Eligible replacements and event changes remain allowed.","type":"array","editorType":"number[]","nativeDefault":"[]","encoding":"plain","availability":"supported","parent":"Rulings","min":1,"max":100,"items":{"type":"number"},"default":[],"context":"Equipment type IDs omitted from Clear and the empty replacement entry. This does not forbid an eligible replacement or event changes."},{"id":"IE-P-81","key":"NonOptimizeETypes","storageKey":"NonOptimizeETypes:arraynum","label":"Non-Optimized Types","description":"Equipment type IDs skipped by Optimize, preserving their current equipment. Read these IDs from this game's Equipment Types.","type":"array","editorType":"number[]","nativeDefault":"[]","encoding":"plain","availability":"supported","parent":"Rulings","min":1,"max":100,"items":{"type":"number"},"default":[],"context":"Equipment type IDs skipped by Optimize; their current equipment remains."},{"id":"IE-P-82","key":"ButtonAssist","storageKey":"ButtonAssist","label":"Button Assist Window","description":"Editor heading for Button Assist Window. Groups SHIFT: Remove. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-83"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-83 --json"]},{"id":"IE-P-83","key":"buttonAssistRemove","storageKey":"buttonAssistRemove:str","label":"SHIFT: Remove","description":"Button assist text used for the SHIFT Remove Shortcut.","type":"string","editorType":"text","nativeDefault":"Unequip","encoding":"plain","availability":"supported","parent":"ButtonAssist","default":"Unequip","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."}],"default":{"General":"","EnableLayout":true,"LayoutStyle":"upper/right","ParamValueFontSize":22,"MenuPortraits":true,"DrawPortraitJS":"// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);","DrawFaceJS":"// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nif (this.innerHeight > 444) {\n    this.drawActorClass(this._actor, x, dataY + lineHeight * 2);\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\n} else {\n    this.placeBasicGauges(this._actor, x, dataY + lineHeight * 2);\n}","DrawParamJS":"// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    const standardWidth = ImageManager.standardIconWidth || 32;\n    paramNameWidth += standardWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}","StatusWindowWidth":312,"DrawBackRect":true,"BackRectColor":"19","CursedTextPopup":"%1 is cursed by %3%2!","Command":"","CmdStyle":"auto","CmdTextAlign":"center","CmdIconEquip":136,"equipCmdDesc":"Pick and choose equipment to change.","CommandAddOptimize":true,"optimizeCmdDesc":"Equip the strongest available equipment.","CmdIconOptimize":137,"CommandAddClear":true,"clearCmdDesc":"Remove all available equipment.","CmdIconClear":135,"RemoveEquip":"","RemoveEquipIcon":16,"RemoveEquipText":"Remove","ShiftShortcutKey":true,"Rulings":"","EquipAdjustHpMp":true,"NonRemoveETypes":[],"NonOptimizeETypes":[],"ButtonAssist":"","buttonAssistRemove":"Unequip"},"context":"A complete configuration object for Equip Menu Settings. Read it before editing. A whole-object write requires every declared field, including unchanged editorial values; omitted fields are rejected. To change one value while preserving siblings, write that child path instead. Restart the game after configuration changes.","writing":"Use items-equips parameters get --project <game> --path /EquipScene --json, change the intended fields of result.value, then submit the complete JSON object with items-equips parameters set --project <game> --path /EquipScene --value <JSON>. The plugin entry must exist. Unrelated native values are preserved. Reload the editor after writing.","defaultReason":"The default belongs to resetting this whole block; an individual field reset uses that field descriptor. Native fields omitted from stored configuration are read with their individual defaults."},{"id":"IE-P-84","key":"ShopScene","storageKey":"ShopScene:struct","label":"Shop Menu Settings","description":"Change the Shop Menu Scene settings.","type":"struct","editorType":"struct<ShopScene>","nativeDefault":"{\"General\":\"\",\"EnableLayout:eval\":\"true\",\"LayoutStyle:str\":\"upper/left\",\"Command\":\"\",\"CmdHideDisabled:eval\":\"true\",\"CmdStyle:str\":\"auto\",\"CmdTextAlign:str\":\"center\",\"CmdIconBuy:num\":\"208\",\"CmdIconSell:num\":\"314\",\"CmdIconCancel:num\":\"82\",\"CmdCancelRename:str\":\"Exit\",\"Prices\":\"\",\"SellPriceRate:num\":\"0.50\",\"BuyPriceJS:func\":\"\\\"// Declare variables\\\\nlet item = arguments[0];\\\\nlet price = arguments[1];\\\\n\\\\n// Return the finalized price\\\\nreturn price;\\\"\",\"SellPriceJS:func\":\"\\\"// Declare variables\\\\nlet item = arguments[0];\\\\nlet price = arguments[1];\\\\n\\\\n// Return the finalized price\\\\nreturn price;\\\"\",\"ButtonAssist\":\"\",\"buttonAssistSmallIncrement:str\":\"-1/+1\",\"buttonAssistLargeIncrement:str\":\"-10/+10\"}","encoding":"plain","availability":"supported","structName":"ShopScene","fields":[{"id":"IE-P-85","key":"General","storageKey":"General","label":"General","description":"Editor heading for General. Groups Use Updated Layout, Layout Style. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-86","IE-P-87"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-86 --json","items-equips api describe IE-P-87 --json"]},{"id":"IE-P-86","key":"EnableLayout","storageKey":"EnableLayout:eval","label":"Use Updated Layout","description":"Use a Shop menu with a full-width help area and a goods or quantity list beside an always-visible status panel, replacing the blank initial goods area. Layout Style chooses help and input sides.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General","on":"Use","off":"Don't Use","default":true,"context":"Restart after authoring changes. Explicit Options UI positions take precedence when enabled. Disabling restores the standard shop arrangement."},{"id":"IE-P-87","key":"LayoutStyle","storageKey":"LayoutStyle:str","label":"Layout Style","description":"Choose upper/lower help placement and left/right shop input placement for the updated Shop layout.","type":"string","editorType":"select","nativeDefault":"upper/left","encoding":"plain","availability":"supported","parent":"General","options":["upper/left","upper/right","lower/left","lower/right"],"default":"upper/left","context":"Native ShopScene setting; restart after authoring changes. Values are stored without offline JavaScript execution. Upper/lower chooses help placement; left/right chooses input placement. Explicit Options UI style positions take precedence when enabled."},{"id":"IE-P-88","key":"Switches","storageKey":"Switches","label":"Switches","description":"Editor heading for Switches. Groups Switch: Buy, Switch: Sell. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-89","IE-P-90"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-89 --json","items-equips api describe IE-P-90 --json"]},{"id":"IE-P-89","key":"SwitchBuy","storageKey":"SwitchBuy:num","label":"Switch: Buy","description":"Game switch ID set ON after a purchase; entering a shop resets this configured switch OFF. Zero disables the purchase flag and also prevents setting the sale flag, matching the supported transaction behavior.","type":"number","editorType":"switch","nativeDefault":"0","encoding":"plain","availability":"supported","parent":"Switches","default":0},{"id":"IE-P-90","key":"SwitchSell","storageKey":"SwitchSell:num","label":"Switch: Sell","description":"Game switch ID set ON after a sale when Switch Buy is nonzero. Entering a shop resets this configured switch OFF independently of Switch Buy. Zero disables this flag.","type":"number","editorType":"switch","nativeDefault":"0","encoding":"plain","availability":"supported","parent":"Switches","default":0},{"id":"IE-P-91","key":"Command","storageKey":"Command","label":"Command Window","description":"Editor heading for Command Window. Groups Hide Unavailable?, Style, Text Align, Buy Icon, Sell Icon, Cancel Icon, Rename \"Cancel\". This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-92","IE-P-93","IE-P-94","IE-P-95","IE-P-96","IE-P-97","IE-P-98"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-92 --json","items-equips api describe IE-P-93 --json"]},{"id":"IE-P-92","key":"CmdHideDisabled","storageKey":"CmdHideDisabled:eval","label":"Hide Unavailable?","description":"Hide unavailable shop commands instead of displaying them disabled. Buy is unavailable when the prepared shop has no valid goods; Sell is unavailable in a purchase-only shop. Cancel remains available.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"Command","on":"Hide","off":"Default","default":true},{"id":"IE-P-93","key":"CmdStyle","storageKey":"CmdStyle:str","label":"Style","description":"Presentation of Shop commands: text, icon, or iconText. auto uses iconText when it fits the command cell, otherwise icon; a command without an icon uses text. In icon mode, the selected command also shows its name.","type":"string","editorType":"select","nativeDefault":"auto","encoding":"plain","availability":"supported","parent":"Command","options":["text","icon","iconText","auto"],"default":"auto","context":"Native ShopScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-94","key":"CmdTextAlign","storageKey":"CmdTextAlign:str","label":"Text Align","description":"Text alignment for the Command Window.","type":"string","editorType":"combo","nativeDefault":"center","encoding":"plain","availability":"supported","parent":"Command","suggestions":["left","center","right"],"default":"center","context":"Native ShopScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-95","key":"CmdIconBuy","storageKey":"CmdIconBuy:num","label":"Buy Icon","description":"Icon for the Buy command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.","type":"number","editorType":"text","nativeDefault":"208","encoding":"plain","availability":"supported","parent":"Command","default":208,"context":"Native ShopScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-96","key":"CmdIconSell","storageKey":"CmdIconSell:num","label":"Sell Icon","description":"Icon for the Sell command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.","type":"number","editorType":"text","nativeDefault":"314","encoding":"plain","availability":"supported","parent":"Command","default":314,"context":"Native ShopScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-97","key":"CmdIconCancel","storageKey":"CmdIconCancel:num","label":"Cancel Icon","description":"Icon for the Cancel command, using this game's img/system/IconSet.png index. Choose the index with the database icon picker. It appears in icon, iconText or auto command styles; text style omits it.","type":"number","editorType":"text","nativeDefault":"82","encoding":"plain","availability":"supported","parent":"Command","default":82,"context":"Native ShopScene setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-98","key":"CmdCancelRename","storageKey":"CmdCancelRename:str","label":"Rename \"Cancel\"","description":"Caption of the shop Cancel command. Empty text removes its visible caption; an icon command style can still show IE-P-97. It does not change the command action.","type":"string","editorType":"text","nativeDefault":"Exit","encoding":"plain","availability":"supported","parent":"Command","default":"Exit"},{"id":"IE-P-99","key":"Prices","storageKey":"Prices","label":"Prices","description":"Editor heading for Prices. Groups Sell Price Rate, JS: Buy Price, JS: Sell Price. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-100","IE-P-101","IE-P-102"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-100 --json","items-equips api describe IE-P-101 --json"]},{"id":"IE-P-100","key":"SellPriceRate","storageKey":"SellPriceRate:num","label":"Sell Price Rate","description":"Multiplier applied to an item's database price for its default selling price; 0.5 sells at half price. The base result is floored before note overrides and the Sell Price callback.","type":"number","editorType":"text","nativeDefault":"0.50","encoding":"plain","availability":"supported","parent":"Prices","default":0.5},{"id":"IE-P-101","key":"BuyPriceJS","storageKey":"BuyPriceJS:func","label":"JS: Buy Price","description":"Return the final buy price. arguments[0] is the database object; arguments[1] is the note-adjusted price. Buy floors the callback result, maps NaN to zero and clamps nonnegative.","type":"string","editorType":"note","nativeDefault":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","encoding":"json","availability":"supported","parent":"Prices","javascript":{"kind":"body","receiver":"Window_ShopBuy","arguments":["item (arguments[0])","price (arguments[1])"],"bindings":[],"context":"Called on every price evaluation, including previews; keep authored code free of transaction side effects.","returnType":"number","failure":"Global callback exceptions propagate; note-block exceptions are caught and logged in playtest."},"context":"Runs in the game when computing the buy price with Window_ShopBuy as this. The database object and note-adjusted price are arguments[0] and arguments[1]. The callback may run repeatedly while browsing or changing quantities, so avoid one-time side effects. Authoring validates the JavaScript without executing it; restart the game after edits.","default":"// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"},{"id":"IE-P-102","key":"SellPriceJS","storageKey":"SellPriceJS:func","label":"JS: Sell Price","description":"Return the final sell price. arguments[0] is the database object; arguments[1] is the note-adjusted price. Sell does not round or clamp the callback result.","type":"string","editorType":"note","nativeDefault":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","encoding":"json","availability":"supported","parent":"Prices","javascript":{"kind":"body","receiver":"Scene_Shop","arguments":["item (arguments[0])","price (arguments[1])"],"bindings":[],"context":"Called on every price evaluation, including previews; keep authored code free of transaction side effects.","returnType":"number","failure":"Global callback exceptions propagate; note-block exceptions are caught and logged in playtest."},"context":"Runs in the game when computing the sell price with Scene_Shop as this. The database object and note-adjusted price are arguments[0] and arguments[1]. The callback may run repeatedly while browsing or changing quantities, so avoid one-time side effects. Authoring validates the JavaScript without executing it; restart the game after edits.","default":"// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"},{"id":"IE-P-103","key":"ButtonAssist","storageKey":"ButtonAssist","label":"Button Assist Window","description":"Editor heading for Button Assist Window. Groups Small Increment, Large Increment. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-104","IE-P-105"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-104 --json","items-equips api describe IE-P-105 --json"]},{"id":"IE-P-104","key":"buttonAssistSmallIncrement","storageKey":"buttonAssistSmallIncrement:str","label":"Small Increment","description":"Button-assist caption for changing the shop quantity by one with left/right while the quantity window is active. This changes the help text, not the increment.","type":"string","editorType":"text","nativeDefault":"-1/+1","encoding":"plain","availability":"supported","parent":"ButtonAssist","default":"-1/+1","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."},{"id":"IE-P-105","key":"buttonAssistLargeIncrement","storageKey":"buttonAssistLargeIncrement:str","label":"Large Increment","description":"Button-assist caption for changing the shop quantity by ten with up/down while the quantity window is active. The quantity remains bounded by the shop limits; this changes the help text, not the increment.","type":"string","editorType":"text","nativeDefault":"-10/+10","encoding":"plain","availability":"supported","parent":"ButtonAssist","default":"-10/+10","context":"Native navigation help or shortcut setting. Core Engine selects standard/modern controls; changes take effect after restart. Empty help text and false shortcut values remain authored values."}],"default":{"General":"","EnableLayout":true,"LayoutStyle":"upper/left","Switches":"","SwitchBuy":0,"SwitchSell":0,"Command":"","CmdHideDisabled":true,"CmdStyle":"auto","CmdTextAlign":"center","CmdIconBuy":208,"CmdIconSell":314,"CmdIconCancel":82,"CmdCancelRename":"Exit","Prices":"","SellPriceRate":0.5,"BuyPriceJS":"// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;","SellPriceJS":"// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;","ButtonAssist":"","buttonAssistSmallIncrement":"-1/+1","buttonAssistLargeIncrement":"-10/+10"},"context":"A complete configuration object for Shop Menu Settings. Read it before editing. A whole-object write requires every declared field, including unchanged editorial values; omitted fields are rejected. To change one value while preserving siblings, write that child path instead. Restart the game after configuration changes.","writing":"Use items-equips parameters get --project <game> --path /ShopScene --json, change the intended fields of result.value, then submit the complete JSON object with items-equips parameters set --project <game> --path /ShopScene --value <JSON>. The plugin entry must exist. Unrelated native values are preserved. Reload the editor after writing.","defaultReason":"The default belongs to resetting this whole block; an individual field reset uses that field descriptor. Native fields omitted from stored configuration are read with their individual defaults."},{"id":"IE-P-106","key":"StatusWindow","storageKey":"StatusWindow:struct","label":"Shop Status Window","description":"Configure the shared item and equipment status window used in inventory and shops.","type":"struct","editorType":"struct<StatusWindow>","nativeDefault":"{\"General\":\"\",\"Width:num\":\"352\",\"ParamChangeFontSize:num\":\"22\",\"Translucent:num\":\"64\",\"DrawBackRect:eval\":\"true\",\"BackRectColor:str\":\"19\",\"EquipData\":\"\",\"EquipDataStyle:str\":\"compare\",\"EquipDataCompare\":\"\",\"AlreadyEquipMarker:str\":\"E\",\"CannotEquipMarker:str\":\"-\",\"NoChangeMarker:str\":\"-\",\"DrawEquipData:func\":\"\\\"// Set Variables\\\\nconst lineHeight = this.lineHeight();\\\\nconst paramheight = this.gaugeLineHeight() + 8;\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth;\\\\nlet height = this.innerHeight;\\\\nlet hw = Math.floor(width / 2);\\\\nlet hx = x + width - hw;\\\\n\\\\n// Draw Item Name, Type, and Quantity\\\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\\\nthis.drawItemDarkRect(x, y, width);\\\\ny += lineHeight;\\\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\\\n\\\\n// Draw Parameter Names\\\\nconst params = this.actorParams();\\\\nconst backY = y;\\\\ny = height - (params.length * paramheight) - 4;\\\\nlet paramX = x;\\\\nlet paramWidth = 0;\\\\nlet tableY = y;\\\\nfor (const paramId of params) {\\\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\\\n    y += paramheight;\\\\n}\\\\n\\\\n// Draw Actor Data\\\\nconst actorMax = $gameParty.maxBattleMembers();\\\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\\\nparamWidth = width - (actorWidth * actorMax);\\\\nfor (const actor of $gameParty.battleMembers()) {\\\\n    const index = $gameParty.battleMembers().indexOf(actor);\\\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\\\n    this.changePaintOpacity(actor.canEquip(this._item));\\\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\\\n    let actorY = tableY;\\\\n\\\\n    // Draw Parameter Changes\\\\n    for (const paramId of params) {\\\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\\\n        actorY += paramheight;\\\\n    }\\\\n}\\\\n\\\\n// Draw Back Rectangles\\\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\\\nfor (let i = 0; i < actorMax; i++) {\\\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\\\n}\\\\nfor (const paramId of params) {\\\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\\\n    for (let i = 0; i < actorMax; i++) {\\\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\\\n    }\\\\n    tableY += paramheight;\\\\n}\\\"\",\"EquipDataClassic\":\"\",\"ClassicWeaponParameters:arraystr\":\"[\\\"HIT\\\"]\",\"ClassicArmorParameters:arraystr\":\"[\\\"EVA\\\"]\",\"DrawEquipClassicData:func\":\"\\\"// Set Variables\\\\nconst lineHeight = this.lineHeight();\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth;\\\\nlet height = this.innerHeight;\\\\nlet hw = Math.floor(width / 2);\\\\nlet hx = x + width - hw;\\\\n\\\\n// Draw Item Name, Type, and Quantity\\\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\\\nthis.drawItemDarkRect(x, y, width);\\\\ny += lineHeight;\\\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\\\n\\\\n// Draw Item Weapon Type or Armor Type\\\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\\\n\\\\n// Draw Parameter Values\\\\nconst params = this.actorParams();\\\\nfor (const paramId of params) {\\\\n    if (this.isCustomParameter(paramId)) continue;\\\\n    this.drawActorParamClassic(paramId, x, y, width);\\\\n    y += lineHeight;\\\\n}\\\\n\\\\n// Draw Custom Entries\\\\ny = this.drawItemCustomEntries(x, y, width);\\\\n\\\\n// Fill Rest of the Window\\\\nthis.drawItemDarkRect(x, y, width, height - y);\\\"\",\"EquipDataDouble\":\"\",\"DoubleWeaponParameters:arraystr\":\"[\\\"HIT\\\",\\\"CNT\\\"]\",\"DoubleArmorParameters:arraystr\":\"[\\\"EVA\\\",\\\"GRD\\\"]\",\"DrawEquipDoubleData:func\":\"\\\"// Set Variables\\\\nconst lineHeight = this.lineHeight();\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth;\\\\nlet height = this.innerHeight;\\\\nlet hw = Math.floor(width / 2);\\\\nlet hx = x + width - hw;\\\\n\\\\n// Draw Item Name, Type, and Quantity\\\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\\\nthis.drawItemDarkRect(x, y, width);\\\\ny += lineHeight;\\\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\\\n\\\\n// Draw Item Weapon Type or Armor Type\\\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\\\n\\\\n// Draw Parameter Values\\\\nconst params = this.actorParams();\\\\nfor (const paramId of params) {\\\\n    if (this.isCustomParameter(paramId)) continue;\\\\n    this.drawActorParamClassic(paramId, x, y, hw);\\\\n    if (x === hw) {\\\\n        y += lineHeight;\\\\n        x = 0;\\\\n    } else {\\\\n        x = hw;\\\\n    }\\\\n}\\\\n// Realign\\\\nif (x === hw) {\\\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\\\n    y += lineHeight;\\\\n    x = 0;\\\\n}\\\\n\\\\n// Draw Custom Entries\\\\ny = this.drawItemCustomEntries(x, y, width);\\\\n\\\\n// Fill Rest of the Window\\\\nthis.drawItemDarkRect(x, y, width, height - y);\\\"\",\"EquipDelayMS:num\":\"240\",\"ItemData\":\"\",\"ItemGeneral\":\"\",\"MaxIcons:num\":\"8\",\"MultiplierStandard:num\":\"1000000\",\"DrawItemData:func\":\"\\\"const lineHeight = this.lineHeight();\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth;\\\\nlet height = this.innerHeight;\\\\nlet hw = Math.floor(width / 2);\\\\nlet hx = x + width - hw;\\\\n\\\\n// Draw Item Name and Quantity\\\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\\\nthis.drawItemDarkRect(x, y, width);\\\\ny += lineHeight;\\\\n\\\\n// Draw Main Item Properties\\\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\\\nif (this._item.occasion < 3) {\\\\n    y = this.drawItemDamage(x, y, width);\\\\n    y = this.drawItemEffects(x, y, width);\\\\n}\\\\ny = this.drawItemCustomEntries(x, y, width);\\\\n\\\\n// Draw Remaining Item Properties\\\\nif (this._item.occasion < 3) {\\\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\\\n}\\\\n\\\\n// Fill Rest of the Window\\\\nthis.drawItemDarkRect(x, y, width, height - y);\\\"\",\"Vocabulary\":\"\",\"LabelConsume:str\":\"Consumable\",\"Consumable:str\":\"✔\",\"NotConsumable:str\":\"✘\",\"Occasions\":\"\",\"Occasion0:str\":\"Anytime Use\",\"Occasion1:str\":\"Battle-Only\",\"Occasion2:str\":\"Field-Only\",\"Occasion3:str\":\"-\",\"Scope\":\"\",\"Scope0:str\":\"No Target\",\"Scope1:str\":\"1 Foe\",\"Scope2:str\":\"All Foes\",\"Scope3:str\":\"Random Foe\",\"Scope4:str\":\"2 Random Foes\",\"Scope5:str\":\"3 Random Foes\",\"Scope6:str\":\"4 Random Foes\",\"Scope7:str\":\"1 Ally\",\"Scope8:str\":\"Alive Allies\",\"Scope9:str\":\"Dead Ally\",\"Scope10:str\":\"Dead Allies\",\"Scope11:str\":\"User\",\"Scope12:str\":\"Any Ally\",\"Scope13:str\":\"All Allies\",\"Scope14:str\":\"Everybody\",\"BattleCore\":\"\",\"ScopeRandomAny:str\":\"%1 Random Units\",\"ScopeRandomEnemies:str\":\"%1 Random Foes\",\"ScopeRandomAllies:str\":\"%1 Random Allies\",\"ScopeAlliesButUser:str\":\"Other Allies\",\"ScopeAllyOrEnemy:str\":\"Ally/Enemy\",\"ScopeEnemyOrAlly:str\":\"Enemy/Ally\",\"LabelSpeed:str\":\"Speed\",\"Speed2000:str\":\"Fastest\",\"Speed1000:str\":\"Faster\",\"Speed1:str\":\"Fast\",\"Speed0:str\":\"Normal\",\"SpeedNeg999:str\":\"Slow\",\"SpeedNeg1999:str\":\"Slower\",\"SpeedNeg2000:str\":\"Slowest\",\"LabelSuccessRate:str\":\"Accuracy\",\"LabelRepeats:str\":\"Hits\",\"LabelHitType:str\":\"Type\",\"HitType0:str\":\"Neutral\",\"HitType1:str\":\"Physical\",\"HitType2:str\":\"Magical\",\"LabelElement:str\":\"Element\",\"ElementWeapon:str\":\"\\\\I[97]Weapon\",\"ElementNone:str\":\"\\\\I[160]No Element\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"Effects\":\"\",\"LabelRecoverHP:str\":\"%1 Recovery\",\"LabelRecoverMP:str\":\"%1 Recovery\",\"LabelRecoverTP:str\":\"%1 Recovery\",\"LabelSelfGainTP:str\":\"User %1\",\"LabelDamageHP:str\":\"%1 Damage\",\"LabelDamageMP:str\":\"%1 Damage\",\"LabelDamageTP:str\":\"%1 Damage\",\"LabelApply:str\":\"Applies\",\"LabelRemove:str\":\"Removes\",\"EquipType\":\"\",\"WeaponType:str\":\"Weapon Type\",\"ArmorType:str\":\"Armor Type\",\"NoEquipTypeResult:str\":\"-\"}","encoding":"plain","availability":"supported","parent":"ShopScene:struct","structName":"StatusWindow","fields":[{"id":"IE-P-107","key":"General","storageKey":"General","label":"General","description":"Editor heading for General. Groups Window Width, Parameter Font Size, Translucent Opacity, Show Back Rectangles?. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-108","IE-P-109","IE-P-110","IE-P-111"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-108 --json","items-equips api describe IE-P-109 --json"]},{"id":"IE-P-108","key":"Width","storageKey":"Width:num","label":"Window Width","description":"Width in UI pixels of the shared item/shop status window. Updated Item and Shop layouts place their list beside this width; the ordinary Item status callback can override its rectangle. Choose a positive width that leaves room for the adjacent list.","type":"number","editorType":"text","nativeDefault":"352","encoding":"plain","availability":"supported","parent":"General","default":352,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-109","key":"ParamChangeFontSize","storageKey":"ParamChangeFontSize:num","label":"Parameter Font Size","description":"Font size in pixels for parameter names and actor differences drawn by the shared equipment comparison helpers. Custom status drawing can choose other sizes.","type":"number","editorType":"text","nativeDefault":"22","encoding":"plain","availability":"supported","parent":"General","default":22,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-110","key":"Translucent","storageKey":"Translucent:num","label":"Translucent Opacity","description":"Opacity for status-window drawing marked as unavailable, such as an actor who cannot equip the selected equipment in the default comparison view. Use a number from 0 (invisible) to 255 (fully opaque); 64 gives a faint appearance. This does not change the opacity of the darker background rectangles.","type":"number","editorType":"text","nativeDefault":"64","encoding":"plain","availability":"supported","parent":"General","default":64,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-111","key":"DrawBackRect","storageKey":"DrawBackRect:eval","label":"Show Back Rectangles?","description":"Draw the dark rectangles requested by the shared item/shop status drawing helpers. False omits them while retaining text and the native window background.","type":"boolean","editorType":"boolean","nativeDefault":"true","encoding":"plain","availability":"supported","parent":"General","on":"Draw","off":"Don't Draw","default":true,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-112","key":"BackRectColor","storageKey":"BackRectColor:str","label":"Back Rectangle Color","description":"Color of the darker rectangles behind status information. Use a hex string such as #202020 or a numeric text-color index from this game's window skin. Requires Show Back Rectangles.","type":"string","editorType":"text","nativeDefault":"19","encoding":"plain","availability":"supported","parent":"DrawBackRect:eval","default":"19","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-113","key":"EquipData","storageKey":"EquipData","label":"Equipment Data","description":"Editor heading for Equipment Data. Groups Data Style, Delay MS. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-114","IE-P-128"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-114 --json","items-equips api describe IE-P-128 --json"]},{"id":"IE-P-114","key":"EquipDataStyle","storageKey":"EquipDataStyle:str","label":"Data Style","description":"Default equipment presentation in the item/shop status window: compare shows parameter differences for party battle members, classic shows the equipment values in one column, and double shows those values in two columns. Each style uses its corresponding drawing callback, so customized callbacks can change its appearance. A per-equipment Status Style note overrides this default.","type":"string","editorType":"select","nativeDefault":"compare","encoding":"plain","availability":"supported","parent":"EquipData","options":["compare","classic","double"],"default":"compare","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-115","key":"EquipDataCompare","storageKey":"EquipDataCompare","label":"Compare Style","description":"Editor heading for Compare Style. Groups Already Equipped, Can't Equip, No Changes, JS: Draw Equip Data. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"EquipDataStyle:str","default":"","members":["IE-P-116","IE-P-117","IE-P-118","IE-P-119"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-116 --json","items-equips api describe IE-P-117 --json"]},{"id":"IE-P-116","key":"AlreadyEquipMarker","storageKey":"AlreadyEquipMarker:str","label":"Already Equipped","description":"Text shown in the comparison view when the actor already has this item equipped and has no empty slot of the same equipment type. For example, \"E\" marks existing equipment; this changes only the marker, not equipment eligibility.","type":"string","editorType":"text","nativeDefault":"E","encoding":"plain","availability":"supported","parent":"EquipDataCompare","default":"E","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-117","key":"CannotEquipMarker","storageKey":"CannotEquipMarker:str","label":"Can't Equip","description":"Marker used to show an actor cannot equip an item.","type":"string","editorType":"text","nativeDefault":"-","encoding":"plain","availability":"supported","parent":"EquipDataCompare","default":"-","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-118","key":"NoChangeMarker","storageKey":"NoChangeMarker:str","label":"No Changes","description":"Marker used to show no changes have occurred.","type":"string","editorType":"text","nativeDefault":"-","encoding":"plain","availability":"supported","parent":"EquipDataCompare","default":"-","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-119","key":"DrawEquipData","storageKey":"DrawEquipData:func","label":"JS: Draw Equip Data","description":"Draw equipment details for the compare style in the shared item/shop status window. The selected IE-P-114 style or IE-NT-status-style chooses this callback; its return value is ignored.","type":"string","editorType":"note","nativeDefault":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","encoding":"json","availability":"supported","parent":"EquipDataCompare","javascript":{"kind":"body","receiver":"Window_ShopStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs on each applicable refresh with Window_ShopStatus as this and no arguments. this._item is the selected equipment. this._tempActor is reset to null before the callback and can be populated by comparison helpers; this window does not supply an actor in this._actor. Draw through the window and avoid one-time game-state changes. Empty code draws no details. Syntax is checked without executing code; restart after edits.","default":"// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"},{"id":"IE-P-120","key":"EquipDataClassic","storageKey":"EquipDataClassic","label":"Classic Style","description":"Editor heading for Classic Style. Groups Added Weapon Params, Added Armor Params, JS: Draw Equip Data. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"EquipDataStyle:str","default":"","members":["IE-P-121","IE-P-122","IE-P-123"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-121 --json","items-equips api describe IE-P-122 --json"]},{"id":"IE-P-121","key":"ClassicWeaponParameters","storageKey":"ClassicWeaponParameters:arraystr","label":"Added Weapon Params","description":"Append these parameter names to the Core Engine displayed-parameter list for a selected weapon in classic style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.","type":"array","editorType":"combo[]","nativeDefault":"[\"HIT\"]","encoding":"plain","availability":"supported","parent":"EquipDataClassic","suggestions":["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK","HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG","TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"],"items":{"type":"string"},"default":["HIT"],"context":"Use an ordered JSON array of case-insensitive parameter names such as [\"HIT\",\"EVA\"]. Supported equipment values are MAXHP, MAXMP, ATK, DEF, MAT, MDF, AGI, LUK; HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG; TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR. Classic/Double omit actor-dependent custom parameters. An empty array adds no extra names; it does not remove the Core Engine list. Restart after edits."},{"id":"IE-P-122","key":"ClassicArmorParameters","storageKey":"ClassicArmorParameters:arraystr","label":"Added Armor Params","description":"Append these parameter names to the Core Engine displayed-parameter list for a selected armor in classic style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.","type":"array","editorType":"combo[]","nativeDefault":"[\"EVA\"]","encoding":"plain","availability":"supported","parent":"EquipDataClassic","suggestions":["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK","HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG","TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"],"items":{"type":"string"},"default":["EVA"],"context":"Use an ordered JSON array of case-insensitive parameter names such as [\"HIT\",\"EVA\"]. Supported equipment values are MAXHP, MAXMP, ATK, DEF, MAT, MDF, AGI, LUK; HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG; TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR. Classic/Double omit actor-dependent custom parameters. An empty array adds no extra names; it does not remove the Core Engine list. Restart after edits."},{"id":"IE-P-123","key":"DrawEquipClassicData","storageKey":"DrawEquipClassicData:func","label":"JS: Draw Equip Data","description":"Draw equipment details for the classic style in the shared item/shop status window. The selected IE-P-114 style or IE-NT-status-style chooses this callback; its return value is ignored.","type":"string","editorType":"note","nativeDefault":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, width);\\n    y += lineHeight;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","encoding":"json","availability":"supported","parent":"EquipDataClassic","javascript":{"kind":"body","receiver":"Window_ShopStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs on each applicable refresh with Window_ShopStatus as this and no arguments. this._item is the selected equipment. this._tempActor is reset to null before the callback and can be populated by comparison helpers; this window does not supply an actor in this._actor. Draw through the window and avoid one-time game-state changes. Empty code draws no details. Syntax is checked without executing code; restart after edits.","default":"// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"},{"id":"IE-P-124","key":"EquipDataDouble","storageKey":"EquipDataDouble","label":"Double Style","description":"Editor heading for Double Style. Groups Added Weapon Params, Added Armor Params, JS: Draw Equip Data. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"EquipDataStyle:str","default":"","members":["IE-P-125","IE-P-126","IE-P-127"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-125 --json","items-equips api describe IE-P-126 --json"]},{"id":"IE-P-125","key":"DoubleWeaponParameters","storageKey":"DoubleWeaponParameters:arraystr","label":"Added Weapon Params","description":"Append these parameter names to the Core Engine displayed-parameter list for a selected weapon in double style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.","type":"array","editorType":"combo[]","nativeDefault":"[\"HIT\",\"CNT\"]","encoding":"plain","availability":"supported","parent":"EquipDataDouble","suggestions":["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK","HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG","TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"],"items":{"type":"string"},"default":["HIT","CNT"],"context":"Use an ordered JSON array of case-insensitive parameter names such as [\"HIT\",\"EVA\"]. Supported equipment values are MAXHP, MAXMP, ATK, DEF, MAT, MDF, AGI, LUK; HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG; TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR. Classic/Double omit actor-dependent custom parameters. An empty array adds no extra names; it does not remove the Core Engine list. Restart after edits."},{"id":"IE-P-126","key":"DoubleArmorParameters","storageKey":"DoubleArmorParameters:arraystr","label":"Added Armor Params","description":"Append these parameter names to the Core Engine displayed-parameter list for a selected armor in double style. Requires Core Engine; without it the eight native base parameters are used. A per-object IE-NT-custom-status-parameters list replaces both lists.","type":"array","editorType":"combo[]","nativeDefault":"[\"EVA\",\"GRD\"]","encoding":"plain","availability":"supported","parent":"EquipDataDouble","suggestions":["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK","HIT","EVA","CRI","CEV","MEV","MRF","CNT","HRG","MRG","TRG","TGR","GRD","REC","PHA","MCR","TCR","PDR","MDR","FDR","EXR"],"items":{"type":"string"},"default":["EVA","GRD"],"context":"Use an ordered JSON array of case-insensitive parameter names such as [\"HIT\",\"EVA\"]. Supported equipment values are MAXHP, MAXMP, ATK, DEF, MAT, MDF, AGI, LUK; HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG; TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR. Classic/Double omit actor-dependent custom parameters. An empty array adds no extra names; it does not remove the Core Engine list. Restart after edits."},{"id":"IE-P-127","key":"DrawEquipDoubleData","storageKey":"DrawEquipDoubleData:func","label":"JS: Draw Equip Data","description":"Draw equipment details for the double style in the shared item/shop status window. The selected IE-P-114 style or IE-NT-status-style chooses this callback; its return value is ignored.","type":"string","editorType":"note","nativeDefault":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Item Weapon Type or Armor Type\\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\\n\\n// Draw Parameter Values\\nconst params = this.actorParams();\\nfor (const paramId of params) {\\n    if (this.isCustomParameter(paramId)) continue;\\n    this.drawActorParamClassic(paramId, x, y, hw);\\n    if (x === hw) {\\n        y += lineHeight;\\n        x = 0;\\n    } else {\\n        x = hw;\\n    }\\n}\\n// Realign\\nif (x === hw) {\\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\\n    y += lineHeight;\\n    x = 0;\\n}\\n\\n// Draw Custom Entries\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","encoding":"json","availability":"supported","parent":"EquipDataDouble","javascript":{"kind":"body","receiver":"Window_ShopStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs on each applicable refresh with Window_ShopStatus as this and no arguments. this._item is the selected equipment. this._tempActor is reset to null before the callback and can be populated by comparison helpers; this window does not supply an actor in this._actor. Draw through the window and avoid one-time game-state changes. Empty code draws no details. Syntax is checked without executing code; restart after edits.","default":"// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"},{"id":"IE-P-128","key":"EquipDelayMS","storageKey":"EquipDelayMS:num","label":"Delay MS","description":"Delay in milliseconds before refreshing selected equipment details. Zero schedules the refresh without an added delay. A callback only refreshes if its equipment is still selected; item details do not use this delay.","type":"number","editorType":"number","nativeDefault":"240","encoding":"plain","availability":"supported","parent":"EquipData","min":1,"max":999,"default":240,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-129","key":"ItemData","storageKey":"ItemData","label":"Item Data","description":"Editor heading for Item Data. Groups Data Settings, Vocabulary. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-P-130","IE-P-134"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-130 --json","items-equips api describe IE-P-134 --json"]},{"id":"IE-P-130","key":"ItemGeneral","storageKey":"ItemGeneral","label":"Data Settings","description":"Editor heading for Data Settings. Groups Max State/Buff Icons, Multiplier Standard, JS: Draw Item Data. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"ItemData","default":"","members":["IE-P-131","IE-P-132","IE-P-133"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-131 --json","items-equips api describe IE-P-132 --json"]},{"id":"IE-P-131","key":"MaxIcons","storageKey":"MaxIcons:num","label":"Max State/Buff Icons","description":"Maximum icon count for the Removed Effects row. The runtime uses at least one icon and truncates to the available icons. The Added Effects row uses a fixed maximum of eight, independent of this setting.","type":"number","editorType":"text","nativeDefault":"8","encoding":"plain","availability":"supported","parent":"ItemGeneral","default":8,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-132","key":"MultiplierStandard","storageKey":"MultiplierStandard:num","label":"Multiplier Standard","description":"Positive numeric reference value used only to estimate the displayed multiplier for a manual damage formula. The preview substitutes this value for the sample user stats, uses 1 for an enemy target (the reference value for a recovery target), evaluates the formula and divides by the sample user attack. Keep 1000000 for the usual approximation of stat coefficients; with a.atk + 100, choosing 100 displays 200%. This does not set real actor stats or combat damage. A recognized Battle Core damage style can provide its own display instead.","type":"number","editorType":"text","nativeDefault":"1000000","encoding":"plain","availability":"supported","parent":"ItemGeneral","default":1000000,"context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-133","key":"DrawItemData","storageKey":"DrawItemData:func","label":"JS: Draw Item Data","description":"Draw item/skill details in the shared status window when the selected object is not equipment. The return value is ignored. The shipped callback omits use, damage and effect rows for occasion Never, while still drawing name, quantity and custom rows.","type":"string","editorType":"note","nativeDefault":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","encoding":"json","availability":"supported","parent":"ItemGeneral","javascript":{"kind":"body","receiver":"Window_ShopStatus","arguments":[],"bindings":[],"returnType":"Ignored; draw through this window.","failure":"Authored callback exceptions propagate."},"context":"Runs on applicable status refreshes with Window_ShopStatus as this, no arguments and the selected object in this._item. No actor receiver or this._actor is supplied. Draw through the window and avoid one-time game-state changes. Empty code draws no details. Syntax is checked without executing code; restart after edits.","default":"const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"},{"id":"IE-P-134","key":"Vocabulary","storageKey":"Vocabulary","label":"Vocabulary","description":"Editor heading for Vocabulary. Groups Consumable, Occasions, Scope, Battle Core Support, Speed, Success Rate, Repeats, Hit Type, Element, Damage Type, Effects, Equip Type. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"ItemData","default":"","members":["IE-P-135","IE-P-138","IE-P-143","IE-P-159","IE-P-166","IE-P-174","IE-P-175","IE-P-176","IE-P-180","IE-P-183","IE-P-190","IE-P-200"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-135 --json","items-equips api describe IE-P-138 --json"]},{"id":"IE-P-135","key":"LabelConsume","storageKey":"LabelConsume:str","label":"Consumable","description":"Heading of the Consumable row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Consumable","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Consumable","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-136","key":"Consumable","storageKey":"Consumable:str","label":"Yes","description":"Value shown for a consumable item unless Core Engine key-item protection applies. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"✔","encoding":"plain","availability":"supported","parent":"LabelConsume:str","default":"✔","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-137","key":"NotConsumable","storageKey":"NotConsumable:str","label":"No","description":"Value shown for a nonconsumable or protected key item. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"✘","encoding":"plain","availability":"supported","parent":"LabelConsume:str","default":"✘","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-138","key":"Occasions","storageKey":"Occasions","label":"Occasions","description":"Editor heading for Occasions. Groups Always, Battle Screen, Menu Screen, Never. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"Vocabulary","default":"","members":["IE-P-139","IE-P-140","IE-P-141","IE-P-142"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-139 --json","items-equips api describe IE-P-140 --json"]},{"id":"IE-P-139","key":"Occasion0","storageKey":"Occasion0:str","label":"Always","description":"Value for occasion 0 (Always). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Anytime Use","encoding":"plain","availability":"supported","parent":"Occasions","default":"Anytime Use","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-140","key":"Occasion1","storageKey":"Occasion1:str","label":"Battle Screen","description":"Value for occasion 1 (Battle Screen). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Battle-Only","encoding":"plain","availability":"supported","parent":"Occasions","default":"Battle-Only","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-141","key":"Occasion2","storageKey":"Occasion2:str","label":"Menu Screen","description":"Value for occasion 2 (Menu Screen). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Field-Only","encoding":"plain","availability":"supported","parent":"Occasions","default":"Field-Only","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-142","key":"Occasion3","storageKey":"Occasion3:str","label":"Never","description":"Value for occasion 3 (Never); the shipped drawing callback omits the occasion row for this case. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"-","encoding":"plain","availability":"supported","parent":"Occasions","default":"-","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-143","key":"Scope","storageKey":"Scope","label":"Scope","description":"Editor heading for Scope. Groups None, 1 Enemy, All Enemies, 1 Random Enemy, 2 Random Enemies, 3 Random Enemies, 4 Random Enemies, 1 Ally, All Allies, 1 Ally (Dead), All Allies (Dead), The User, 1 Ally (DoA), All Allies (DoA), Enemies & Allies. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"Vocabulary","default":"","members":["IE-P-144","IE-P-145","IE-P-146","IE-P-147","IE-P-148","IE-P-149","IE-P-150","IE-P-151","IE-P-152","IE-P-153","IE-P-154","IE-P-155","IE-P-156","IE-P-157","IE-P-158"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-144 --json","items-equips api describe IE-P-145 --json"]},{"id":"IE-P-144","key":"Scope0","storageKey":"Scope0:str","label":"None","description":"Value for scope 0 (None). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"No Target","encoding":"plain","availability":"supported","parent":"Scope","default":"No Target","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-145","key":"Scope1","storageKey":"Scope1:str","label":"1 Enemy","description":"Value for scope 1 (One Enemy). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"1 Foe","encoding":"plain","availability":"supported","parent":"Scope","default":"1 Foe","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-146","key":"Scope2","storageKey":"Scope2:str","label":"All Enemies","description":"Value for scope 2 (All Enemies). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"All Foes","encoding":"plain","availability":"supported","parent":"Scope","default":"All Foes","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-147","key":"Scope3","storageKey":"Scope3:str","label":"1 Random Enemy","description":"Value for scope 3 (One Random Enemy). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Random Foe","encoding":"plain","availability":"supported","parent":"Scope","default":"Random Foe","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-148","key":"Scope4","storageKey":"Scope4:str","label":"2 Random Enemies","description":"Value for scope 4 (Two Random Enemies). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"2 Random Foes","encoding":"plain","availability":"supported","parent":"Scope","default":"2 Random Foes","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-149","key":"Scope5","storageKey":"Scope5:str","label":"3 Random Enemies","description":"Value for scope 5 (Three Random Enemies). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"3 Random Foes","encoding":"plain","availability":"supported","parent":"Scope","default":"3 Random Foes","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-150","key":"Scope6","storageKey":"Scope6:str","label":"4 Random Enemies","description":"Value for scope 6 (Four Random Enemies). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"4 Random Foes","encoding":"plain","availability":"supported","parent":"Scope","default":"4 Random Foes","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-151","key":"Scope7","storageKey":"Scope7:str","label":"1 Ally","description":"Value for scope 7 (One Living Ally). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"1 Ally","encoding":"plain","availability":"supported","parent":"Scope","default":"1 Ally","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-152","key":"Scope8","storageKey":"Scope8:str","label":"All Allies","description":"Value for scope 8 (All Living Allies). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Alive Allies","encoding":"plain","availability":"supported","parent":"Scope","default":"Alive Allies","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-153","key":"Scope9","storageKey":"Scope9:str","label":"1 Ally (Dead)","description":"Value for scope 9 (One Dead Ally). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Dead Ally","encoding":"plain","availability":"supported","parent":"Scope","default":"Dead Ally","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-154","key":"Scope10","storageKey":"Scope10:str","label":"All Allies (Dead)","description":"Value for scope 10 (All Dead Allies). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Dead Allies","encoding":"plain","availability":"supported","parent":"Scope","default":"Dead Allies","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-155","key":"Scope11","storageKey":"Scope11:str","label":"The User","description":"Value for scope 11 (User). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"User","encoding":"plain","availability":"supported","parent":"Scope","default":"User","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-156","key":"Scope12","storageKey":"Scope12:str","label":"1 Ally (DoA)","description":"Caption for native scope 12: one ally, dead or alive (DoA). Unlike scope 7, the ally does not have to be alive; unlike scope 9, the ally does not have to be dead. This setting changes the displayed wording, not the item scope.","type":"string","editorType":"text","nativeDefault":"Any Ally","encoding":"plain","availability":"supported","parent":"Scope","default":"Any Ally","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-157","key":"Scope13","storageKey":"Scope13:str","label":"All Allies (DoA)","description":"Caption for native scope 13: all allies, dead or alive (DoA). Unlike scope 8, this includes dead allies; unlike scope 10, it also includes living allies. This setting changes the displayed wording, not the item scope.","type":"string","editorType":"text","nativeDefault":"All Allies","encoding":"plain","availability":"supported","parent":"Scope","default":"All Allies","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-158","key":"Scope14","storageKey":"Scope14:str","label":"Enemies & Allies","description":"Value for scope 14 (Everyone). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Everybody","encoding":"plain","availability":"supported","parent":"Scope","default":"Everybody","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-159","key":"BattleCore","storageKey":"BattleCore","label":"Battle Core Support","description":"Editor heading for Battle Core Support. Groups x Random Any, x Random Enemies, x Random Allies, All Allies But User, Ally or Enemy, Enemy or Ally. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"Vocabulary","default":"","members":["IE-P-160","IE-P-161","IE-P-162","IE-P-163","IE-P-164","IE-P-165"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-160 --json","items-equips api describe IE-P-161 --json"]},{"id":"IE-P-160","key":"ScopeRandomAny","storageKey":"ScopeRandomAny:str","label":"x Random Any","description":"Caption for <Target: x Random Any>. The %1 placeholder becomes the numeric target count x; for example, \"Targets: %1 Units\" with <Target: 3 Random Any> displays \"Targets: 3 Units\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Random Units","encoding":"plain","availability":"supported","parent":"BattleCore","default":"%1 Random Units","context":"StatusWindow vocabulary for the Battle Core target integration. With Coreto_1_BattleCore active after Core Engine (installed through the battle namespace) and the matching item Target note described by battle api describe BATTLE-NT-target, the status scope row uses this caption; otherwise it uses the native Scope caption. The caption does not enable or change targeting. Restart after authoring changes."},{"id":"IE-P-161","key":"ScopeRandomEnemies","storageKey":"ScopeRandomEnemies:str","label":"x Random Enemies","description":"Caption for <Target: x Random Enemies>. The %1 placeholder becomes the numeric target count x; for example, \"Targets: %1 Foes\" with <Target: 3 Random Enemies> displays \"Targets: 3 Foes\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Random Foes","encoding":"plain","availability":"supported","parent":"BattleCore","default":"%1 Random Foes","context":"StatusWindow vocabulary for the Battle Core target integration. With Coreto_1_BattleCore active after Core Engine (installed through the battle namespace) and the matching item Target note described by battle api describe BATTLE-NT-target, the status scope row uses this caption; otherwise it uses the native Scope caption. The caption does not enable or change targeting. Restart after authoring changes."},{"id":"IE-P-162","key":"ScopeRandomAllies","storageKey":"ScopeRandomAllies:str","label":"x Random Allies","description":"Caption for <Target: x Random Allies>. The %1 placeholder becomes the numeric target count x; for example, \"Targets: %1 Allies\" with <Target: 3 Random Allies> displays \"Targets: 3 Allies\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Random Allies","encoding":"plain","availability":"supported","parent":"BattleCore","default":"%1 Random Allies","context":"StatusWindow vocabulary for the Battle Core target integration. With Coreto_1_BattleCore active after Core Engine (installed through the battle namespace) and the matching item Target note described by battle api describe BATTLE-NT-target, the status scope row uses this caption; otherwise it uses the native Scope caption. The caption does not enable or change targeting. Restart after authoring changes."},{"id":"IE-P-163","key":"ScopeAlliesButUser","storageKey":"ScopeAlliesButUser:str","label":"All Allies But User","description":"Vocabulary used for <Target: All Allies But User> notetag.","type":"string","editorType":"text","nativeDefault":"Other Allies","encoding":"plain","availability":"supported","parent":"BattleCore","default":"Other Allies","context":"StatusWindow vocabulary for the Battle Core target integration. With Coreto_1_BattleCore active after Core Engine (installed through the battle namespace) and the matching item Target note described by battle api describe BATTLE-NT-target, the status scope row uses this caption; otherwise it uses the native Scope caption. The caption does not enable or change targeting. Restart after authoring changes."},{"id":"IE-P-164","key":"ScopeAllyOrEnemy","storageKey":"ScopeAllyOrEnemy:str","label":"Ally or Enemy","description":"Vocabulary used for <Target: Ally or Enemy> notetag.","type":"string","editorType":"text","nativeDefault":"Ally/Enemy","encoding":"plain","availability":"supported","parent":"BattleCore","default":"Ally/Enemy","context":"StatusWindow vocabulary for the Battle Core target integration. With Coreto_1_BattleCore active after Core Engine (installed through the battle namespace) and the matching item Target note described by battle api describe BATTLE-NT-target, the status scope row uses this caption; otherwise it uses the native Scope caption. The caption does not enable or change targeting. Restart after authoring changes."},{"id":"IE-P-165","key":"ScopeEnemyOrAlly","storageKey":"ScopeEnemyOrAlly:str","label":"Enemy or Ally","description":"Vocabulary used for <Target: Enemy or Ally> notetag.","type":"string","editorType":"text","nativeDefault":"Enemy/Ally","encoding":"plain","availability":"supported","parent":"BattleCore","default":"Enemy/Ally","context":"StatusWindow vocabulary for the Battle Core target integration. With Coreto_1_BattleCore active after Core Engine (installed through the battle namespace) and the matching item Target note described by battle api describe BATTLE-NT-target, the status scope row uses this caption; otherwise it uses the native Scope caption. The caption does not enable or change targeting. Restart after authoring changes."},{"id":"IE-P-166","key":"LabelSpeed","storageKey":"LabelSpeed:str","label":"Speed","description":"Heading of the action Speed row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Speed","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Speed","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-167","key":"Speed2000","storageKey":"Speed2000:str","label":">= 2000 Speed","description":"Speed value for action speed at least 2000. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Fastest","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Fastest","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-168","key":"Speed1000","storageKey":"Speed1000:str","label":">= 1000 Speed","description":"Speed value for action speed from 1000 to below 2000. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Faster","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Faster","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-169","key":"Speed1","storageKey":"Speed1:str","label":">= 1 Speed","description":"Speed value for action speed above 0 and below 1000. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Fast","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Fast","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-170","key":"Speed0","storageKey":"Speed0:str","label":"== 0 Speed","description":"Speed value for action speed exactly 0. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Normal","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Normal","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-171","key":"SpeedNeg999","storageKey":"SpeedNeg999:str","label":">= -999 Speed","description":"Speed value for action speed above -1000 and below 0. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Slow","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Slow","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-172","key":"SpeedNeg1999","storageKey":"SpeedNeg1999:str","label":">= -1999 Speed","description":"Speed value for action speed above -2000 through -1000. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Slower","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Slower","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-173","key":"SpeedNeg2000","storageKey":"SpeedNeg2000:str","label":"<= -2000 Speed","description":"Speed value for action speed at or below -2000. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Slowest","encoding":"plain","availability":"supported","parent":"LabelSpeed:str","default":"Slowest","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-174","key":"LabelSuccessRate","storageKey":"LabelSuccessRate:str","label":"Success Rate","description":"Heading of the success-rate row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Accuracy","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Accuracy","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-175","key":"LabelRepeats","storageKey":"LabelRepeats:str","label":"Repeats","description":"Heading of the action repeat-count row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Hits","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Hits","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-176","key":"LabelHitType","storageKey":"LabelHitType:str","label":"Hit Type","description":"Heading of the hit-type row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Type","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Type","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-177","key":"HitType0","storageKey":"HitType0:str","label":"Certain Hit","description":"Value for hit type 0 (Certain Hit). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Neutral","encoding":"plain","availability":"supported","parent":"LabelHitType:str","default":"Neutral","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-178","key":"HitType1","storageKey":"HitType1:str","label":"Physical","description":"Value for hit type 1 (Physical Attack). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Physical","encoding":"plain","availability":"supported","parent":"LabelHitType:str","default":"Physical","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-179","key":"HitType2","storageKey":"HitType2:str","label":"Magical","description":"Value for hit type 2 (Magical Attack). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Magical","encoding":"plain","availability":"supported","parent":"LabelHitType:str","default":"Magical","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-180","key":"LabelElement","storageKey":"LabelElement:str","label":"Element","description":"Heading of the damage-element row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Element","encoding":"plain","availability":"supported","parent":"Vocabulary","default":"Element","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-181","key":"ElementWeapon","storageKey":"ElementWeapon:str","label":"Weapon-Based","description":"Element value when the damage element uses the user normal-attack elements (negative ID). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"\\I[97]Weapon","encoding":"plain","availability":"supported","parent":"LabelElement:str","default":"\\I[97]Weapon","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-182","key":"ElementNone","storageKey":"ElementNone:str","label":"Nonelement Element","description":"Element value for damage element 0 (None). This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"\\I[160]No Element","encoding":"plain","availability":"supported","parent":"LabelElement:str","default":"\\I[160]No Element","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-183","key":"DamageType","storageKey":"DamageType","label":"Damage Type","description":"Editor heading for Damage Type. Groups HP Damage, MP Damage, HP Recovery, MP Recovery, HP Drain, MP Drain. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"Vocabulary","default":"","members":["IE-P-184","IE-P-185","IE-P-186","IE-P-187","IE-P-188","IE-P-189"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-184 --json","items-equips api describe IE-P-185 --json"]},{"id":"IE-P-184","key":"DamageType1","storageKey":"DamageType1:str","label":"HP Damage","description":"Heading for the HP damage multiplier in item details; %1 inserts this game's HP name. For example, \"%1 Damage\" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.","type":"string","editorType":"text","nativeDefault":"%1 Damage Multiplier","encoding":"plain","availability":"supported","parent":"DamageType","default":"%1 Damage Multiplier","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-185","key":"DamageType2","storageKey":"DamageType2:str","label":"MP Damage","description":"Heading for the MP damage multiplier in item details; %1 inserts this game's MP name. For example, \"%1 Damage\" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.","type":"string","editorType":"text","nativeDefault":"%1 Damage Multiplier","encoding":"plain","availability":"supported","parent":"DamageType","default":"%1 Damage Multiplier","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-186","key":"DamageType3","storageKey":"DamageType3:str","label":"HP Recovery","description":"Heading for the HP recovery multiplier in item details; %1 inserts this game's HP name. For example, \"%1 Recovery\" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.","type":"string","editorType":"text","nativeDefault":"%1 Recovery Multiplier","encoding":"plain","availability":"supported","parent":"DamageType","default":"%1 Recovery Multiplier","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-187","key":"DamageType4","storageKey":"DamageType4:str","label":"MP Recovery","description":"Heading for the MP recovery multiplier in item details; %1 inserts this game's MP name. For example, \"%1 Recovery\" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.","type":"string","editorType":"text","nativeDefault":"%1 Recovery Multiplier","encoding":"plain","availability":"supported","parent":"DamageType","default":"%1 Recovery Multiplier","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-188","key":"DamageType5","storageKey":"DamageType5:str","label":"HP Drain","description":"Heading for the HP drain multiplier in item details; %1 inserts this game's HP name. For example, \"%1 Drain\" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.","type":"string","editorType":"text","nativeDefault":"%1 Drain Multiplier","encoding":"plain","availability":"supported","parent":"DamageType","default":"%1 Drain Multiplier","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-189","key":"DamageType6","storageKey":"DamageType6:str","label":"MP Drain","description":"Heading for the MP drain multiplier in item details; %1 inserts this game's MP name. For example, \"%1 Drain\" keeps the resource name in the heading. Used for manual damage formulas; a recognized non-Manual Battle Core damage style supplies its own label instead.","type":"string","editorType":"text","nativeDefault":"%1 Drain Multiplier","encoding":"plain","availability":"supported","parent":"DamageType","default":"%1 Drain Multiplier","context":"Native StatusWindow setting; restart after authoring changes. Values are stored without offline JavaScript execution."},{"id":"IE-P-190","key":"Effects","storageKey":"Effects","label":"Effects","description":"Editor heading for Effects. Groups Recover HP, Recover MP, Recover TP, Self Gain TP, Damage HP, Damage MP, Damage TP, Add State/Buff, Remove State/Buff. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"Vocabulary","default":"","members":["IE-P-191","IE-P-192","IE-P-193","IE-P-194","IE-P-195","IE-P-196","IE-P-197","IE-P-198","IE-P-199"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-191 --json","items-equips api describe IE-P-192 --json"]},{"id":"IE-P-191","key":"LabelRecoverHP","storageKey":"LabelRecoverHP:str","label":"Recover HP","description":"Heading for recovered HP in the item status effects rows. The %1 placeholder becomes the game's HP term from Database > Terms; for example, \"Restore %1\" displays \"Restore HP\" when that term is \"HP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Recovery","encoding":"plain","availability":"supported","parent":"Effects","default":"%1 Recovery","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-192","key":"LabelRecoverMP","storageKey":"LabelRecoverMP:str","label":"Recover MP","description":"Heading for recovered MP in the item status effects rows. The %1 placeholder becomes the game's MP term from Database > Terms; for example, \"Restore %1\" displays \"Restore MP\" when that term is \"MP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Recovery","encoding":"plain","availability":"supported","parent":"Effects","default":"%1 Recovery","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-193","key":"LabelRecoverTP","storageKey":"LabelRecoverTP:str","label":"Recover TP","description":"Heading for recovered TP in the item status effects rows. The %1 placeholder becomes the game's TP term from Database > Terms; for example, \"Restore %1\" displays \"Restore TP\" when that term is \"TP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Recovery","encoding":"plain","availability":"supported","parent":"Effects","default":"%1 Recovery","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-194","key":"LabelSelfGainTP","storageKey":"LabelSelfGainTP:str","label":"Self Gain TP","description":"Heading for TP gained by the item user in the item status effects rows. The %1 placeholder becomes the game's TP term from Database > Terms; for example, \"User %1\" displays \"User TP\" when that term is \"TP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"User %1","encoding":"plain","availability":"supported","parent":"Effects","default":"User %1","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-195","key":"LabelDamageHP","storageKey":"LabelDamageHP:str","label":"Damage HP","description":"Heading for HP lost through item effects in the item status effects rows. The %1 placeholder becomes the game's HP term from Database > Terms; for example, \"Lost %1\" displays \"Lost HP\" when that term is \"HP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Damage","encoding":"plain","availability":"supported","parent":"Effects","default":"%1 Damage","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-196","key":"LabelDamageMP","storageKey":"LabelDamageMP:str","label":"Damage MP","description":"Heading for MP lost through item effects in the item status effects rows. The %1 placeholder becomes the game's MP term from Database > Terms; for example, \"Lost %1\" displays \"Lost MP\" when that term is \"MP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Damage","encoding":"plain","availability":"supported","parent":"Effects","default":"%1 Damage","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-197","key":"LabelDamageTP","storageKey":"LabelDamageTP:str","label":"Damage TP","description":"Heading for TP lost through item effects in the item status effects rows. The %1 placeholder becomes the game's TP term from Database > Terms; for example, \"Lost %1\" displays \"Lost TP\" when that term is \"TP\". A string without %1 is displayed literally.","type":"string","editorType":"text","nativeDefault":"%1 Damage","encoding":"plain","availability":"supported","parent":"Effects","default":"%1 Damage","context":"Native StatusWindow vocabulary; the configured item status drawing must include the corresponding effects row. This changes its heading, not effect values. Restart after authoring changes."},{"id":"IE-P-198","key":"LabelApply","storageKey":"LabelApply:str","label":"Add State/Buff","description":"Heading of the added-state/buff effects row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Applies","encoding":"plain","availability":"supported","parent":"Effects","default":"Applies","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-199","key":"LabelRemove","storageKey":"LabelRemove:str","label":"Remove State/Buff","description":"Heading of the removed-state/buff effects row. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Removes","encoding":"plain","availability":"supported","parent":"Effects","default":"Removes","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-200","key":"EquipType","storageKey":"EquipType","label":"Equip Type","description":"Editor heading for Equip Type. Groups Weapon Type, Armor Type, No Equip Type. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","parent":"Vocabulary","default":"","members":["IE-P-201","IE-P-202","IE-P-203"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-P-201 --json","items-equips api describe IE-P-202 --json"]},{"id":"IE-P-201","key":"WeaponType","storageKey":"WeaponType:str","label":"Weapon Type","description":"Heading for the selected weapon type in Classic/Double equipment details. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Weapon Type","encoding":"plain","availability":"supported","parent":"EquipType","default":"Weapon Type","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-202","key":"ArmorType","storageKey":"ArmorType:str","label":"Armor Type","description":"Heading for the selected armor type in Classic/Double equipment details. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"Armor Type","encoding":"plain","availability":"supported","parent":"EquipType","default":"Armor Type","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."},{"id":"IE-P-203","key":"NoEquipTypeResult","storageKey":"NoEquipTypeResult:str","label":"No Equip Type","description":"Fallback value when the selected equipment has no named weapon/armor type. This changes displayed wording, not the database setting or gameplay effect.","type":"string","editorType":"text","nativeDefault":"-","encoding":"plain","availability":"supported","parent":"EquipType","default":"-","context":"Used when the status drawing callback includes the corresponding row. Text escapes are supported; an empty string draws no text. Applicable nonempty IE-NT-status-info values override the standard row value. Restart after parameter edits."}],"default":{"General":"","Width":352,"ParamChangeFontSize":22,"Translucent":64,"DrawBackRect":true,"BackRectColor":"19","EquipData":"","EquipDataStyle":"compare","EquipDataCompare":"","AlreadyEquipMarker":"E","CannotEquipMarker":"-","NoChangeMarker":"-","DrawEquipData":"// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}","EquipDataClassic":"","ClassicWeaponParameters":["HIT"],"ClassicArmorParameters":["EVA"],"DrawEquipClassicData":"// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, width);\n    y += lineHeight;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);","EquipDataDouble":"","DoubleWeaponParameters":["HIT","CNT"],"DoubleArmorParameters":["EVA","GRD"],"DrawEquipDoubleData":"// Set Variables\nconst lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Item Weapon Type or Armor Type\nif (this.drawItemEquipSubType(x, y, width)) y += lineHeight;\n\n// Draw Parameter Values\nconst params = this.actorParams();\nfor (const paramId of params) {\n    if (this.isCustomParameter(paramId)) continue;\n    this.drawActorParamClassic(paramId, x, y, hw);\n    if (x === hw) {\n        y += lineHeight;\n        x = 0;\n    } else {\n        x = hw;\n    }\n}\n// Realign\nif (x === hw) {\n    this.drawItemDarkRect(hw, y, hw, lineHeight);\n    y += lineHeight;\n    x = 0;\n}\n\n// Draw Custom Entries\ny = this.drawItemCustomEntries(x, y, width);\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);","EquipDelayMS":240,"ItemData":"","ItemGeneral":"","MaxIcons":8,"MultiplierStandard":1000000,"DrawItemData":"const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);","Vocabulary":"","LabelConsume":"Consumable","Consumable":"✔","NotConsumable":"✘","Occasions":"","Occasion0":"Anytime Use","Occasion1":"Battle-Only","Occasion2":"Field-Only","Occasion3":"-","Scope":"","Scope0":"No Target","Scope1":"1 Foe","Scope2":"All Foes","Scope3":"Random Foe","Scope4":"2 Random Foes","Scope5":"3 Random Foes","Scope6":"4 Random Foes","Scope7":"1 Ally","Scope8":"Alive Allies","Scope9":"Dead Ally","Scope10":"Dead Allies","Scope11":"User","Scope12":"Any Ally","Scope13":"All Allies","Scope14":"Everybody","BattleCore":"","ScopeRandomAny":"%1 Random Units","ScopeRandomEnemies":"%1 Random Foes","ScopeRandomAllies":"%1 Random Allies","ScopeAlliesButUser":"Other Allies","ScopeAllyOrEnemy":"Ally/Enemy","ScopeEnemyOrAlly":"Enemy/Ally","LabelSpeed":"Speed","Speed2000":"Fastest","Speed1000":"Faster","Speed1":"Fast","Speed0":"Normal","SpeedNeg999":"Slow","SpeedNeg1999":"Slower","SpeedNeg2000":"Slowest","LabelSuccessRate":"Accuracy","LabelRepeats":"Hits","LabelHitType":"Type","HitType0":"Neutral","HitType1":"Physical","HitType2":"Magical","LabelElement":"Element","ElementWeapon":"\\I[97]Weapon","ElementNone":"\\I[160]No Element","DamageType":"","DamageType1":"%1 Damage Multiplier","DamageType2":"%1 Damage Multiplier","DamageType3":"%1 Recovery Multiplier","DamageType4":"%1 Recovery Multiplier","DamageType5":"%1 Drain Multiplier","DamageType6":"%1 Drain Multiplier","Effects":"","LabelRecoverHP":"%1 Recovery","LabelRecoverMP":"%1 Recovery","LabelRecoverTP":"%1 Recovery","LabelSelfGainTP":"User %1","LabelDamageHP":"%1 Damage","LabelDamageMP":"%1 Damage","LabelDamageTP":"%1 Damage","LabelApply":"Applies","LabelRemove":"Removes","EquipType":"","WeaponType":"Weapon Type","ArmorType":"Armor Type","NoEquipTypeResult":"-"},"context":"A complete configuration object for Shop Status Window. Read it before editing. A whole-object write requires every declared field, including unchanged editorial values; omitted fields are rejected. To change one value while preserving siblings, write that child path instead. Restart the game after configuration changes.","writing":"Use items-equips parameters get --project <game> --path /StatusWindow --json, change the intended fields of result.value, then submit the complete JSON object with items-equips parameters set --project <game> --path /StatusWindow --value <JSON>. The plugin entry must exist. Unrelated native values are preserved. Reload the editor after writing.","defaultReason":"The default belongs to resetting this whole block; an individual field reset uses that field descriptor. Native fields omitted from stored configuration are read with their individual defaults."}],"commands":[{"id":"IE-C-ActorChangeEquipSlots","key":"ActorChangeEquipSlots","label":"Actor: Change Equip Slots","description":"Force the selected actors to use the supplied equipment type names, in order. Names are case-sensitive and must match Database > Types in this game. Other actors are unchanged.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"IE-A-204","key":"Actors","storageKey":"Actors:arraynum","label":"Actor ID(s)","description":"Select which Actor ID(s) to affect.","type":"array","editorType":"actor[]","nativeDefault":"[\"1\"]","encoding":"plain","availability":"supported","items":{"type":"number"},"default":[1],"context":"JSON array of native Actor database IDs, for example [1,2]. An empty array affects nobody. Existing actors are processed in authored order; absent IDs are ignored. See the containing command for battle restrictions and repeated-ID effects."},{"id":"IE-A-205","key":"Slots","storageKey":"Slots:arraystr","label":"Equip Slots","description":"Insert the equip slots you want the actor(s) to have.","type":"array","editorType":"string[]","nativeDefault":"[\"Weapon\",\"Shield\",\"Head\",\"Body\",\"Accessory\"]","encoding":"plain","availability":"supported","items":{"type":"string"},"default":["Weapon","Shield","Head","Body","Accessory"],"context":"Ordered JSON array of exact, case-sensitive Equipment Types names from Database > Types, for example [\"Weapon\",\"Accessory\",\"Accessory\"]. Input names are trimmed; duplicate names resolve to the first matching type. Unknown names and the empty type are removed. An empty array forces no slots. The actor dual-wield trait still converts the second slot to Weapon when at least two slots exist."}],"context":"Runs when the native event interpreter reaches this command; existing legacy receivers remain valid. The forced layout survives class changes until ActorResetEquipSlots. Repeating this command replaces the layout; it does not append slots. Equipment removed by shrinking or changing the layout returns to the party. The actor slot override is stored in the save. New actors start from their class slots; class changes keep a forced layout until reset.","examples":["items-equips commands list --project <game> --target common-event:1","items-equips commands insert --project <game> --target common-event:1 --before 0 --command ActorChangeEquipSlots --value '{\"Actors\":[1],\"Slots\":[\"Weapon\",\"Shield\",\"Head\",\"Body\",\"Accessory\"]}' --expected-hash <fileHash>"]},{"id":"IE-C-ActorResetEquipSlots","key":"ActorResetEquipSlots","label":"Actor: Reset Equip Slots","description":"Remove the forced layout and restore the actor current class slots. Repeating reset does not duplicate returns.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"IE-A-206","key":"Actors","storageKey":"Actors:arraynum","label":"Actor ID(s)","description":"Select which Actor ID(s) to affect.","type":"array","editorType":"actor[]","nativeDefault":"[\"1\"]","encoding":"plain","availability":"supported","items":{"type":"number"},"default":[1],"context":"JSON array of native Actor database IDs, for example [1,2]. An empty array affects nobody. Existing actors are processed in authored order; absent IDs are ignored. See the containing command for battle restrictions and repeated-ID effects."}],"context":"Runs when the native interpreter reaches the command. Legacy receivers remain valid. Incompatible or removed-slot equipment returns to the party; other actors remain unchanged. The actor slot override is stored in the save. New actors start from their class slots; class changes keep a forced layout until reset.","examples":["items-equips commands list --project <game> --target common-event:1","items-equips commands insert --project <game> --target common-event:1 --before 0 --command ActorResetEquipSlots --value '{\"Actors\":[1]}' --expected-hash <fileHash>"]},{"id":"IE-C-PurifyActors","key":"PurifyActors","label":"Purify: Target Actor(s)","description":"Purify each listed actor in authored order; absent actor IDs are ignored and duplicates invoke that actor again. No effect in battle. Each invocation advances each currently cursed slot once; refresh/re-entry does not repeat it. Eligible transformed equipment stays in the slot; otherwise native removal/release rules preserve the corresponding object.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"IE-A-207","key":"Actors","storageKey":"Actors:arraynum","label":"Actor ID(s)","description":"Select which Actor ID(s) to affect.","type":"array","editorType":"actor[]","nativeDefault":"[\"1\"]","encoding":"plain","availability":"supported","items":{"type":"number"},"default":[1],"context":"JSON array of native Actor database IDs, for example [1,2]. An empty array affects nobody. Existing actors are processed in authored order; absent IDs are ignored. See the containing command for battle restrictions and repeated-ID effects."}],"context":"Runs when the native event interpreter reaches this command; existing legacy receivers remain valid."},{"id":"IE-C-PurifyParty","key":"PurifyParty","label":"Purify: Whole Party","description":"Purify every party member, including reserve members. No effect in battle. Each invocation advances each currently cursed slot once; refresh/re-entry does not repeat it. Eligible transformed equipment stays in the slot; otherwise native removal/release rules preserve the corresponding object.","availability":"supported","targets":["map","common-event","troop"],"args":[],"context":"Runs when the native event interpreter reaches this command; existing legacy receivers remain valid."},{"id":"IE-C-BatchShop","key":"BatchShop","label":"Shop: Advanced","description":"Open a shop with normalized inclusive item/weapon/armor ID ranges. Skip missing, blank and separator entries; blacklist categories before the optional whitelist. PurchaseOnly hides or disables selling. Uses database prices; event-specific prices are not supported.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"IE-A-208","key":"Step1","storageKey":"Step1","label":"Step 1: Item ID's","description":"Editor heading for Step 1: Item ID's. Groups Range Start, Range End. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-A-209","IE-A-210"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-A-209 --json","items-equips api describe IE-A-210 --json"]},{"id":"IE-A-209","key":"Step1Start","storageKey":"Step1Start:num","label":"Range Start","description":"Select which Item ID to start from.","type":"number","editorType":"item","nativeDefault":"1","encoding":"plain","availability":"supported","parent":"Step1","default":1,"context":"Inclusive native Item database ID boundary. Use whole numbers: the runtime swaps reversed bounds but does not round them. Missing records are skipped. Set both bounds to 0 to select no records of this kind. Separate IE-A-219/IE-A-220 category filters can remove selected goods."},{"id":"IE-A-210","key":"Step1End","storageKey":"Step1End:num","label":"Range End","description":"Select which Item ID to end at.","type":"number","editorType":"item","nativeDefault":"4","encoding":"plain","availability":"supported","parent":"Step1","default":4,"context":"Inclusive native Item database ID boundary. Use whole numbers: the runtime swaps reversed bounds but does not round them. Missing records are skipped. Set both bounds to 0 to select no records of this kind. Separate IE-A-219/IE-A-220 category filters can remove selected goods."},{"id":"IE-A-211","key":"Step2","storageKey":"Step2","label":"Step 2: Weapon ID's","description":"Editor heading for Step 2: Weapon ID's. Groups Range Start, Range End. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-A-212","IE-A-213"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-A-212 --json","items-equips api describe IE-A-213 --json"]},{"id":"IE-A-212","key":"Step2Start","storageKey":"Step2Start:num","label":"Range Start","description":"Select which Weapon ID to start from.","type":"number","editorType":"weapon","nativeDefault":"1","encoding":"plain","availability":"supported","parent":"Step2","default":1,"context":"Inclusive native Weapon database ID boundary. Use whole numbers: the runtime swaps reversed bounds but does not round them. Missing records are skipped. Set both bounds to 0 to select no records of this kind. Separate IE-A-219/IE-A-220 category filters can remove selected goods."},{"id":"IE-A-213","key":"Step2End","storageKey":"Step2End:num","label":"Range End","description":"Select which Weapon ID to end at.","type":"number","editorType":"weapon","nativeDefault":"4","encoding":"plain","availability":"supported","parent":"Step2","default":4,"context":"Inclusive native Weapon database ID boundary. Use whole numbers: the runtime swaps reversed bounds but does not round them. Missing records are skipped. Set both bounds to 0 to select no records of this kind. Separate IE-A-219/IE-A-220 category filters can remove selected goods."},{"id":"IE-A-214","key":"Step3","storageKey":"Step3","label":"Step 3: Armor ID's","description":"Editor heading for Step 3: Armor ID's. Groups Range Start, Range End. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-A-215","IE-A-216"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-A-215 --json","items-equips api describe IE-A-216 --json"]},{"id":"IE-A-215","key":"Step3Start","storageKey":"Step3Start:num","label":"Range Start","description":"Select which Armor ID to start from.","type":"number","editorType":"armor","nativeDefault":"1","encoding":"plain","availability":"supported","parent":"Step3","default":1,"context":"Inclusive native Armor database ID boundary. Use whole numbers: the runtime swaps reversed bounds but does not round them. Missing records are skipped. Set both bounds to 0 to select no records of this kind. Separate IE-A-219/IE-A-220 category filters can remove selected goods."},{"id":"IE-A-216","key":"Step3End","storageKey":"Step3End:num","label":"Range End","description":"Select which Armor ID to end at.","type":"number","editorType":"armor","nativeDefault":"4","encoding":"plain","availability":"supported","parent":"Step3","default":4,"context":"Inclusive native Armor database ID boundary. Use whole numbers: the runtime swaps reversed bounds but does not round them. Missing records are skipped. Set both bounds to 0 to select no records of this kind. Separate IE-A-219/IE-A-220 category filters can remove selected goods."},{"id":"IE-A-217","key":"PurchaseOnly","storageKey":"PurchaseOnly:eval","label":"Step 4: Purchase Only?","description":"True opens BatchShop as purchase-only; false permits selling subject to ordinary shop rules. IE-P-92 decides whether the unavailable Sell command is hidden or disabled. This is a JSON boolean, not a JavaScript expression.","type":"boolean","editorType":"boolean","nativeDefault":"false","encoding":"plain","availability":"supported","on":"Purchase-Only","off":"Sell Accessible","default":false},{"id":"IE-A-218","key":"Optional","storageKey":"Optional","label":"Optional","description":"Editor heading for Optional. Groups Blacklisted Categories, Whitelisted Categories. This heading has no independent runtime action.","type":"string","editorType":"text","nativeDefault":"","encoding":"plain","availability":"editorial","default":"","members":["IE-A-219","IE-A-220"],"context":"Use api describe for the listed member IDs to configure the actual controls.","writing":"This editorial field is read-only. Configure its operational members instead; preserve this field when writing the containing object.","examples":["items-equips api describe IE-A-219 --json","items-equips api describe IE-A-220 --json"]},{"id":"IE-A-219","key":"Blacklist","storageKey":"Blacklist:arraystr","label":"Blacklisted Categories","description":"Exclude goods matching any listed category name from their Categories notes. Values are names such as \"Healing\" or \"Trade\", not Category:name or built-in menu selectors. Matching trims whitespace and ignores case. Blacklist runs first; an empty Whitelist imposes no inclusion restriction.","type":"array","editorType":"string[]","nativeDefault":"[]","encoding":"plain","availability":"supported","parent":"Optional","items":{"type":"string"},"default":[],"context":"BatchShop argument. Author category membership with IE-NT-categories or IE-NT-category-block. For a record with <Categories: Healing, Trade>, either name matches; a blacklist match always excludes it even if it also matches the whitelist.","examples":["items-equips api describe BatchShop --json","Blacklist=[\"Trade\"] matches a record carrying <Categories: Healing, Trade>."]},{"id":"IE-A-220","key":"Whitelist","storageKey":"Whitelist:arraystr","label":"Whitelisted Categories","description":"Keep only goods matching any listed category name from their Categories notes. Values are names such as \"Healing\" or \"Trade\", not Category:name or built-in menu selectors. Matching trims whitespace and ignores case. Blacklist runs first; an empty Whitelist imposes no inclusion restriction.","type":"array","editorType":"string[]","nativeDefault":"[]","encoding":"plain","availability":"supported","parent":"Optional","items":{"type":"string"},"default":[],"context":"BatchShop argument. Author category membership with IE-NT-categories or IE-NT-category-block. For a record with <Categories: Healing, Trade>, either name matches; a blacklist match always excludes it even if it also matches the whitelist.","examples":["items-equips api describe BatchShop --json","Whitelist=[\"Trade\"] matches a record carrying <Categories: Healing, Trade>."]}],"context":"Runs when the native event interpreter reaches this command; existing legacy receivers remain valid."}],"tags":[{"surface":"notetag","type":"number","default":null,"availability":"supported","syntax":"Pass a nonnegative JSON integer.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-max","key":"max","label":"Maximum held quantity","targets":["items","weapons","armors"],"pattern":"<Max: (\\d+)>","examples":[3],"description":"Nonnegative maximum for this database identity; 0 forbids holding it. Falls back to the matching ItemScene type maximum.","context":"Database Items, Weapons or Armors > Note. Runtime caps gainItem; equipped ownership is separate.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence.","min":0,"max":9007199254740991,"integer":true,"template":"<Max: {value}>"},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-categories","key":"categories","label":"Inline categories","targets":["items","weapons","armors"],"pattern":"<(?:Category|Categories): (.*)>","examples":["<Categories: Healing, Trade>"],"description":"Accumulates comma-separated names across inline and block forms. Matching ignores case; membership does not duplicate possessions.","context":"Database Note; configure Categories/List Type as Category: Healing. The note creates membership, not a tab.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-category-block","key":"category-block","label":"Category block","targets":["items","weapons","armors"],"pattern":"<(?:Category|Categories)>\\s*([\\s\\S]*)\\s*</(?:Category|Categories)>","examples":["<Categories>\nHealing\nTrade\n</Categories>"],"description":"Accumulates one category per line, alongside inline membership.","context":"Database Note; category list entries select the matching names.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence.","encoding":"block"},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-sort-priority","key":"sort-priority","label":"Inventory sort priority","targets":["items","weapons","armors"],"pattern":"<(?:|ID )Sort(?:|ing) Priority: (\\d+)>","examples":["<Sort Priority: 80>"],"description":"Default 50. ID sort uses descending priority, then ascending ID; NAME categories sort by native display name.","context":"Database Note; Categories/List SortBy chooses Name or ID.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-color","key":"color","label":"Item name color","targets":["items","weapons","armors"],"pattern":"<Color: (?:\\d+|#[^>\\r\\n]*)>","examples":["<Color: #11aa77>","<Color: 17>"],"description":"Numeric colors clamp to the window palette 0..31. A numeric tag takes precedence over a hex tag.","context":"Database Note; rendered item/equipment names use the chosen color and retain the native name.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-item-switch","key":"item-switch","label":"Item switch condition","targets":["items"],"pattern":"<(?:Enable|Disable)(?: All| Any)? (?:SW|Switch|Switches): *(\\d+(?:\\s*,\\s*\\d+)*)>","examples":["<Enable All Switches: 1, 2>","<Disable Any Switches: 1, 2>"],"description":"Evaluation precedence: Enable, Enable All, Enable Any, Disable, Disable All, Disable Any. First matching family returns immediately. Unqualified forms mean ALL; Disable negates the all/any result.","context":"Database Items > Note. Native possession, occasion and user conditions still apply; switch IDs refer to System switches.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-item-enable-js","key":"item-enable-js","label":"Item enable JavaScript","targets":["items"],"pattern":"<JS Item Enable>\\s*([\\s\\S]*)\\s*</JS Item Enable>","examples":["<JS Item Enable>\nenabled = user.hp > 1;\n</JS Item Enable>"],"description":"Assign enabled (initially true). The receiver this and user/target/a/b all identify the user battler; item is the database item argument. Errors are logged only in playtest and return the current enabled value.","context":"Database Items > Note. Runs after native conditions and switch gates. Menu use uses the selected scene user, not the recipient. CLI checks syntax without evaluating authored code.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence.","encoding":"block","javascript":{"kind":"body","capture":1,"receiver":"Game_BattlerBase","arguments":["item"],"bindings":["enabled","user","target","a","b"]}},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-conserve","key":"conserve","label":"Item conservation","targets":["items"],"pattern":"<(?:Conserve|Preserve): (\\d+)[%％]>","examples":["<Conserve: 0%>","<Preserve: 100%>"],"description":"The first conservation tag samples Math.random and skips consumption below percentage/100. 0 always consumes a consumable; 100 always conserves it. Nonconsumables retain native behavior. Values above 100 always conserve; the runtime does not clamp the authored percentage.","context":"Database Items > Note. Consumption changes; the action still applies its effect. Both ASCII and full-width percent signs are accepted.","occurrences":"First matching native tag wins unless the description specifies accumulation or family precedence."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-equip-slots","key":"equip-slots","label":"Class equipment slots","targets":["classes"],"pattern":"<Equip Slots>\\s*([\\s\\S]*)\\s*</Equip Slots>","examples":["<Equip Slots>\nWeapon\nAccessory\nAccessory\n</Equip Slots>"],"description":"One exact, case-sensitive Database > Types equipment name per line. Unknown names are ignored; an empty block gives no slots. A forced actor layout overrides this class layout until reset. Dual wield changes the second slot to weapon when at least two slots exist.","context":"Class Note. Database type names are trimmed; duplicate names resolve to their first native ID. Battle test uses the default type list.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes.","encoding":"block"},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-equip-copy-limit","key":"equip-copy-limit","label":"Equipment copy limit","targets":["weapons","armors"],"pattern":"<Equip Copy Limit: (\\d+)>","examples":["<Equip Copy Limit: 1>"],"description":"Limits copies of this database identity equipped by one actor in public equip selection and optimization. Other actors and unequipped inventory copies are not counted. The currently selected slot is excluded during replacement. Event and script changes can bypass this limit. A written zero acts as one.","context":"Weapon or Armor Note; distinct database identities do not share the copy limit.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-equip-weapon-type-limit","key":"equip-weapon-type-limit","label":"Weapon type limit","targets":["weapons"],"pattern":"<Equip Weapon Type Limit: (\\d+)>","examples":["<Equip Weapon Type Limit: 2>","With one matching weapon equipped and both limits set to 2, a second can be selected; with two matching weapons, another is disabled."],"description":"Limits weapons of the same Weapon Type equipped by one actor. Other actors and unequipped inventory copies are not counted. Public replacement excludes its current slot; event and script changes can bypass the limit. Use positive limits.","context":"Weapon Note. This counts Weapon Type, not Equipment Type or database identity. During public selection, matching equipped objects are counted in slot order: the candidate is disabled as soon as that running count reaches its own limit or the limit on the matching object currently visited. Optimization compares the total matching equipped count against the incoming limit and the smallest limit on matching equipped objects. A written zero acts as one for admitting an additional object.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-equip-armor-type-limit","key":"equip-armor-type-limit","label":"Armor type limit","targets":["armors"],"pattern":"<Equip Armor Type Limit: (\\d+)>","examples":["<Equip Armor Type Limit: 2>","With one matching armor equipped and both limits set to 2, a second can be selected; with two matching armors, another is disabled."],"description":"Limits armors of the same Armor Type equipped by one actor. Other actors and unequipped inventory copies are not counted. Public replacement excludes its current slot; event and script changes can bypass the limit. Use positive limits.","context":"Armor Note. This counts Armor Type, not Equipment Type or database identity. During public selection, matching equipped objects are counted in slot order: the candidate is disabled as soon as that running count reaches its own limit or the limit on the matching object currently visited. Optimization compares the total matching equipped count against the incoming limit and the smallest limit on matching equipped objects. A written zero acts as one for admitting an additional object.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-equip-class-only","key":"equip-class-only","label":"Equipment main-class restriction","targets":["weapons","armors"],"pattern":"<Equip For Class(?:|es) Only: (.*)>","examples":["<Equip For Classes Only: 1, Ranger>"],"description":"At least one comma-separated class ID or name must match the actor main class. Names ignore case and icon markup; duplicate names resolve to the highest matching ID. Restriction is bypassed in battle test.","context":"Weapon or Armor Note. A failed requirement leaves the item visible but disabled in public selection; refresh releases an equipped item that no longer qualifies.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-equip-requirements","key":"equip-requirements","label":"Equipment requirements","targets":["weapons","armors"],"pattern":"<Equip(?:|ment) Requirement(?:|s)>\\s*([\\s\\S]*)\\s*</Equip(?:|ment) Requirement(?:|s)>","examples":["<Equip Requirements>\nlevel >= 5\natk >= 10\nLearned Skill: 1\nSwitch: 2\n</Equip Requirements>"],"description":"All recognized lines must pass: LEVEL/LV/LVL or MAXHP/MAXMP/MHP/MMP/ATK/DEF/MAT/MDF/AGI/LUK, an operator > >= === <= <, and a nonnegative integer; Learned Skill: ID or name; Switch: ID requires that System switch to be ON (OFF fails). Parameters use base plus permanent additions, excluding equipment bonuses. Unknown lines are ignored, never evaluated as JavaScript.","context":"Weapon or Armor Note. Learned skills must actually be learned; names ignore case. Native possession, type and class checks still apply. Actor refresh releases equipment that no longer qualifies; switching a switch alone does not promise immediate refresh. Battle test bypasses these requirements.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes.","encoding":"block"},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","id":"IE-NT-added-etypes","key":"added-etypes","label":"Additional armor equipment types","targets":["armors"],"pattern":"<Added EType(?:|s): (.*)>","examples":["<Added ETypes: 4, Accessory>"],"description":"Adds comma-separated equipment type IDs or case-insensitive names greater than 1 to the armor primary etypeId. Does not make armor into a weapon. Any sealed primary or added type prevents equipping.","context":"Armor Note. Slot targeting accepts these additional types; native starting equipment still matches the primary type.","occurrences":"The first matching native tag or block wins; restart the game after authored database changes."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-price","key":"price","label":"Database price override","targets":["items","weapons","armors"],"pattern":"<Price: (\\d+)>","examples":["<Price: 1000000>"],"description":"Nonnegative integer database buy price, including values beyond the Editor limit. Native event custom prices still override it.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-sell-price","key":"sell-price","label":"Sale price override","targets":["items","weapons","armors"],"pattern":"<Sell Price: (\\d+)>","examples":["<Sell Price: 7>"],"description":"Nonnegative fixed sale price; a JS Sell Price block takes precedence, then the global sale callback runs.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-sellability","key":"sellability","label":"Always or never sell","targets":["items","weapons","armors"],"pattern":"<(?:Can|Cannot) Sell>","examples":["<Can Sell>"],"description":"Can Sell allows zero-price goods; Cannot Sell wins and forbids selling.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-shop-visibility","key":"shop-visibility","label":"Shop listing switches","targets":["items","weapons","armors"],"pattern":"<(?:Show|Hide) Shop (?:All |Any |)Switch(?:es)?: (.*)>","examples":["<Show Shop All Switches: 1, 2>"],"description":"Show All/single requires all switches on; Show Any requires one. Hide All/single hides when all are on; Hide Any hides when one is on. Listing refresh has no transaction effects.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-sell-switch","key":"sell-switch","label":"Conditional sale switches","targets":["items","weapons","armors"],"pattern":"<Cannot Sell(?: All| Any|) (?:SW|Switch|Switches): *(\\d+(?:\\s*,\\s*\\d+)*)>","examples":["<Cannot Sell Any Switches: 1, 2>"],"description":"Native 1.61 semantics: unqualified/All requires all listed switches ON to allow sale; Any forbids sale when any is ON. Explicit Can/Cannot Sell takes precedence.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-shop-transaction-switch","key":"shop-transaction-switch","label":"Committed transaction switches","targets":["items","weapons","armors"],"pattern":"<(?:Buy|Sell) Turn (?:On|Off) Switch(?:es)?: (.*)>","examples":["<Buy Turn On Switches: 1, 2>"],"description":"After the native money/inventory transaction, apply On switches then Off switches. Cancellation and draw/list refresh do not run these effects.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell."},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-shop-buy-price-js","key":"shop-buy-price-js","label":"Buy price JavaScript","targets":["items","weapons","armors"],"pattern":"<JS Buy Price>\\s*([\\s\\S]*)\\s*</JS Buy Price>","examples":["<JS Buy Price>\nprice = item.price * 0.5;\n</JS Buy Price>"],"description":"Assign price using item and this. Starts from native event/database price; global BuyPriceJS then floors/clamps. Errors log only during playtest and retain current price; window.item/window.price are cleared afterward. Keep this preview callback free of side effects.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell.","encoding":"block","javascript":{"kind":"body","capture":1,"receiver":"Window_ShopBuy","arguments":[],"bindings":["item","price"]}},{"surface":"notetag","type":"string","default":null,"availability":"supported","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated note bytes remain unchanged.","id":"IE-NT-shop-sell-price-js","key":"shop-sell-price-js","label":"Sell price JavaScript","targets":["items","weapons","armors"],"pattern":"<JS Sell Price>\\s*([\\s\\S]*)\\s*</JS Sell Price>","examples":["<JS Sell Price>\nprice = item.price * 0.5;\n</JS Sell Price>"],"description":"Assign price using item and this. Starts from database price times SellPriceRate; note result is floored before global SellPriceJS. Errors log only during playtest and retain current price; window.item/window.price are cleared afterward. Keep this preview callback free of side effects.","context":"Database Item, Weapon or Armor Note. Separate switch tags onto different physical lines; restart after authored database edits.","occurrences":"The first matching tag in each family wins. Visibility families combine; Cannot Sell takes precedence over Can Sell.","encoding":"block","javascript":{"kind":"body","capture":1,"receiver":"Scene_Shop","arguments":[],"bindings":["item","price"]}},{"id":"IE-NT-equipment-parameter","key":"equipment-parameter","label":"Signed base equipment parameter","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["weapons","armors"],"pattern":"<(?:MaxHP|MaxMP|ATK|DEF|MAT|MDF|AGI|LUK): ([+-]\\d+)>","examples":["<ATK: +1200>"],"description":"Replaces the equipment base value, including values outside Editor limits; requires an explicit sign and space after colon. Actor limits still clamp the final result. Does not set X/S/custom parameters.","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; preserve unrelated note bytes.","context":"Database Note. Restart after authored changes.","occurrences":"First matching tag/block for each parameter or family wins."},{"id":"IE-NT-equipment-parameters-js","key":"equipment-parameters-js","label":"Wearer parameter JavaScript","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["weapons","armors"],"pattern":"<JS Parameters>\\s*([\\s\\S]*)\\s*</JS Parameters>","examples":["<JS Parameters>\nATK = user.paramBase(2) * 0.1;\nMaxMP = 5;\n</JS Parameters>"],"description":"Assign case-sensitive MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI and LUK (initially zero). Values add to base equipment parameters for the current wearer. this/user/target/a/b identify that actor; item is the equipment and paramId the requested base parameter. Only parameter names present in the source are registered. Runtime errors retain assigned values and log in playtest; recursive calculation returns zero for nested custom contributions. Use base values to avoid recursive total-stat formulas.","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; preserve unrelated note bytes.","context":"Database Note. Restart after authored changes.","occurrences":"First matching tag/block for each parameter or family wins.","encoding":"block","javascript":{"kind":"body","capture":1,"receiver":"Game_Actor","arguments":["item","paramId"],"bindings":["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK","user","target","a","b"]}},{"id":"IE-NT-artifact","key":"artifact","label":"Party or troop artifact","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["armors"],"pattern":"<(?:Stackable |Stack |)(?:Party|Ally|Troop|Foe) (?:Artifact|Relic)>","examples":["<Stackable Party Artifact>"],"description":"Armor remains in inventory and cannot be equipped. Party/Ally applies its parameters and traits to actors, Troop/Foe to enemies; both tags affect both. Unstacked contributes once regardless of quantity. Any stackable tag makes the armor stack on both declared sides; each held copy repeats parameters and traits. Inventory changes invalidate affected actor and current battle-enemy caches. Battle-test auto grants omit artifacts; deliberate grants still work. Troop artifacts apply static parameters and traits, not actor-only wearer JS.","syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; preserve unrelated note bytes.","context":"Database Note. Restart after authored changes.","occurrences":"First matching tag/block for each parameter or family wins."},{"surface":"notetag","type":"string","default":null,"availability":"supported","targets":["weapons","armors"],"syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated Note bytes remain unchanged.","context":"Weapon or Armor Note. Restart after authored changes.","id":"IE-NT-cursed","key":"cursed","label":"Cursed equipment","pattern":"<Cursed>","examples":["<Cursed>"],"description":"Public equipment removal, clear and optimize cannot remove this equipped object. Native event/script changes can bypass the lock. Purification transforms or removes it. Original WeaponSwapSystem suppresses weapon curses; armor curses remain.","occurrences":"Presence applies; repeated tags do not accumulate."},{"surface":"notetag","type":"string","default":null,"availability":"supported","targets":["weapons","armors"],"syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence for duplicate physical entries; unrelated Note bytes remain unchanged.","context":"Weapon or Armor Note. Restart after authored changes.","id":"IE-NT-purify-transform","key":"purify-transform","label":"Purification transformation","pattern":"<Purify Transform: (.*)>","examples":["<Purify Transform: Clear Ring>"],"description":"Resolve an ID or trimmed case-insensitive name within the same database kind; duplicate names choose the highest ID. A compatible equipment type and allowed weapon/armor type permit replacement; normal refresh can release a transformed object that fails other requirements. No-transform/incompatible-slot removal returns the original. A still-cursed result advances again only on a later invocation. Missing targets are invalid authoring: validate reports INVALID_REFERENCE; runtime rejects with IE_PURIFY_TARGET before that slot changes.","occurrences":"The first recognized transform tag wins. The space after colon is required; malformed unmatched tags are ignored by the runtime."},{"id":"IE-NT-status-info","key":"status-info","label":"Status information overrides","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Status Info>\\s*([\\s\\S]*)\\s*</Status Info>","examples":["<Status Info>\nConsumable: Shared supply\nQuantity: Shared\n</Status Info>"],"description":"Override recognized status values using normalized keys: Consumable, Quantity, Occasion, Scope, Speed, Success Rate, Repeat, Hit Type, Element, Damage Multiplier, HP/MP/TP Recovery or Damage, User TP Gain, Added/Removed Effects. Classic/Double equipment also accepts standard, extra and special parameter names. Nonempty values support text escapes; empty values fall back. Effect overrides can make their corresponding effect rows appear without a database effect, but the drawing callback must call those row helpers. Other overrides do not add arbitrary new rows.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines.","encoding":"block"},{"id":"IE-NT-custom-status-info","key":"custom-status-info","label":"Additional status rows","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Custom Status Info>\\s*([\\s\\S]*)\\s*</Custom Status Info>","examples":["<Custom Status Info>\nOrigin: Observatory\n</Custom Status Info>"],"description":"Append authored label: value rows, with text escapes, to item/skill status and Classic/Double equipment. Compare uses its authored drawing callback.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines.","encoding":"block"},{"id":"IE-NT-status-style","key":"status-style","label":"Equipment status style","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["weapons","armors"],"pattern":"<Status Style: (.*)>","examples":["<Status Style: Double>"],"description":"Override the configured equipment status style. Compare shows each party battle member and the projected parameter changes from equipping the object. Classic draws its database parameters in one column; Double uses two columns. Classic and Double omit actor-dependent custom parameters. The selected style uses its configured drawing callback; see IE-P-114. Values are trimmed and matched case-insensitively; values other than compare or double use Classic.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Weapon or Armor Note. The tag overrides StatusWindow/EquipDataStyle for this object. Restart after authored changes.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-custom-status-parameters","key":"custom-status-parameters","label":"Equipment parameter order","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["weapons","armors"],"pattern":"<Custom Status Param(?:|s|eters): (.*)>","examples":["<Custom Status Parameters: ATK, DEF, HIT>"],"description":"Replace the displayed parameter list for this equipment in Compare, Classic and Double with the comma-separated names in the authored order. Requires Core Engine. Names are case-insensitive and trimmed; omitted parameters are not displayed. Unrecognized names and custom actor parameter names are excluded. Without this tag, the configured actor custom parameters remain available to Compare.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Weapon or Armor Note. Supported names: MAXHP, MAXMP, ATK, DEF, MAT, MDF, AGI, LUK; HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG; TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR. For example, ATK, DEF, HIT displays only those three parameters in that order. Restart after authored changes.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-shop-picture","key":"shop-picture","label":"Status picture","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image|Picture Name|Picture Filename|Image Name|Image Filename): (.*)>","examples":["<Shop Picture Name: Actor1_2>"],"description":"Load the exact case-sensitive extensionless filename from img/pictures. Matching lines accumulate. Status refresh clears previous content; pending loads draw only when their item is still selected.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-shop-picture-layer","key":"shop-picture-layer","label":"Status picture layer","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image) Layer: (Background|Foreground)>","examples":["<Shop Picture Layer: Foreground>"],"description":"Background draws behind text on contentsBack; Foreground draws after data on contents. Default is Background.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"Any recognized Foreground tag selects the foreground, even when a Background tag appears earlier. Without Foreground, pictures use the background."},{"id":"IE-NT-shop-picture-dimensions","key":"shop-picture-dimensions","label":"Status picture maximum size","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image) Max (?:Width: \\d+|Height: \\d+|Dimensions: \\d+, *\\d+)>","examples":["<Shop Picture Max Dimensions: 100, 80>"],"description":"Preserve aspect ratio and never enlarge above native size. Defaults are window inner dimensions. Max Dimensions overrides separate Width/Height; integer pixel output is floored. A zero maximum width or height produces a zero-size image.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-shop-picture-alignment","key":"shop-picture-alignment","label":"Status picture horizontal alignment","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image) (?:Align|Alignment): (Left|Center|Right)>","examples":["<Shop Picture Alignment: Right>"],"description":"Left, Center (default), or Right within inner width; Center uses rounded positioning.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-shop-picture-position","key":"shop-picture-position","label":"Status picture vertical position","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image) Position: (Top|Middle|Bottom)>","examples":["<Shop Picture Position: Bottom>"],"description":"Top, Middle (default), or Bottom within inner height; Middle uses rounded positioning.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-shop-picture-offset","key":"shop-picture-offset","label":"Status picture offsets","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image) Offset(?: X: [+\\-]\\d+| Y: [+\\-]\\d+|: [+\\-]\\d+, *[+\\-]\\d+)>","examples":["<Shop Picture Offset: +3, -2>"],"description":"Signed pixel offsets. Separate X/Y offsets add to the paired Offset; signs and colon spaces are required.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"First recognized setting/block wins except accumulated picture-name lines."},{"id":"IE-NT-shop-picture-opacity","key":"shop-picture-opacity","label":"Status picture opacity","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["skills","items","weapons","armors"],"pattern":"<Shop (?:Picture|Image) Opacity: \\d+[%％]?>","examples":["<Shop Picture Opacity: 50%>"],"description":"Default 255. A raw integer is passed to native bitmap opacity; a percentage is rounded to 0–255 and clamped. Paint opacity returns to 255 after the image.","syntax":"Supply the complete native tag/block as a JSON string.","context":"Native database Note; restart after authored changes. Optional skill scenes require the skill provider; this does not install it.","selection":"Use --occurrence for repeated physical entries; unrelated Note bytes are preserved.","occurrences":"The first raw-integer tag takes precedence over every percentage tag. Otherwise the first percentage tag is used; absent tags use 255."},{"id":"IE-NT-proxy","key":"proxy","label":"Proxy item","surface":"notetag","type":"string","default":null,"availability":"supported","targets":["items","weapons","armors"],"pattern":"<Proxy: (.*)>","examples":["<Proxy: 5>","<Proxy: Restorative Tonic>"],"syntax":"Pass the complete native tag as a JSON string.","selection":"Use --occurrence to select duplicate physical entries. Unrelated native note bytes remain unchanged.","description":"Resolve one same-kind database identity by ID or case-insensitive name. Copies target name, icon and description at boot; retains recipe Note and price. Missing targets resolve to the proxy itself.","context":"Database Note. Crafting recipes retain ingredients on the proxy and grant the resolved product. Direct gainItem(proxy) and Game_Item.setObject(proxy) do not grant or equip it; numItems(proxy) reads the target count. Resolution is one level only. Duplicate names choose the highest matching ID. Boot-time display copies and cached name lookups require restart after database edits; this tag does not itself install a crafting provider.","occurrences":"The first matching native tag wins."}],"methods":[{"id":"Game_Actor.forceChangeEquipSlots","arguments":[{"name":"slots","type":"number[]"}],"returns":"undefined","example":"$gameParty.leader().forceChangeEquipSlots([1, 5, 5])","description":"Override this actor's equipment slots using native equipment-type IDs.","context":"Call after game objects/database load. Removes 0/-1 in place and retains the supplied array identity. Refreshes restrictions and returns removed trailing equipment to inventory. Repeating the same valid configuration does not duplicate ownership. Native class slots remain available through reset. With the qualified WeaponSwapSystem consumer active, its own hook limits physical weapon slots to one and represents equipped weapons by weapon type; standalone Items keeps authored multiple weapon slots. The actor slot override is stored in the save. New actors start from their class slots; class changes keep a forced layout until reset.","availability":"supported"},{"id":"Game_Actor.forceResetEquipSlots","arguments":[],"returns":"undefined","example":"$gameParty.leader().forceResetEquipSlots()","description":"Remove the forced slot override and restore the current class slots.","context":"Actor receiver after game objects load; refreshes and updates equipment ownership. Repetition is safe for unchanged game state. The actor slot override is stored in the save. New actors start from their class slots; class changes keep a forced layout until reset.","availability":"supported"},{"id":"Game_Actor.purifyCursedEquips","arguments":[],"returns":"undefined","example":"$gameParty.leader().purifyCursedEquips()","description":"Purify this actor's cursed equipment with native transformations and inventory returns.","context":"Actor receiver after database load. Each invocation performs one transformation step; repeating can advance an authored chain. Prefer the plugin command to retain its battle guard. Missing targets produce IE_PURIFY_TARGET; validate authored notes before play.","availability":"supported"},{"id":"Game_Party.purifyCursedEquips","arguments":[],"returns":"undefined","example":"$gameParty.purifyCursedEquips()","description":"Apply actor purification to every party member, including reserves.","context":"Party receiver after database load; same chain semantics as the actor method. The PurifyParty command is inactive during battle.","availability":"supported"},{"id":"Game_Party.isNewItem","arguments":[{"name":"item","type":"RPG.Item|RPG.Weapon|RPG.Armor"}],"returns":"boolean|undefined","example":"$gameParty.isNewItem($dataItems[1])","description":"Read the NEW label state.","context":"Party receiver after game objects/database load. Returns true for a tracked native item, weapon or armor and false for an unmarked one. Returns false when New.Enable is disabled or the temporary equipment-trade bypass is active; these gates do not erase stored flags. Returns undefined when enabled but the argument is not a recognized native item/weapon/armor. No inventory acquisition is performed; see IE-P-40. Flags are saved with Game_Party; new games start with an empty list. Disabling IE-P-40 hides flags and blocks updates without clearing them.","availability":"supported"},{"id":"Game_Party.setNewItem","arguments":[{"name":"item","type":"RPG.Item|RPG.Weapon|RPG.Armor"}],"returns":"undefined","example":"$gameParty.setNewItem($dataItems[1])","description":"Mark a database Item, Weapon or Armor as new when NEW tracking is enabled. Ownership is not checked: this records a flag without granting inventory.","context":"Party receiver and loaded native database object. Respects New.Enable and temporary bypass. Repeated set/clear does not duplicate entries. No inventory acquisition is performed. Flags are saved with Game_Party; new games start with an empty list. Disabling IE-P-40 hides flags and blocks updates without clearing them.","availability":"supported"},{"id":"Game_Party.clearNewItem","arguments":[{"name":"item","type":"RPG.Item|RPG.Weapon|RPG.Armor"}],"returns":"undefined","example":"$gameParty.clearNewItem($dataItems[1])","description":"Clear its NEW label without changing quantity.","context":"Party receiver and loaded native database object. Respects New.Enable and temporary bypass. Repeated set/clear does not duplicate entries. No inventory acquisition is performed. Flags are saved with Game_Party; new games start with an empty list. Disabling IE-P-40 hides flags and blocks updates without clearing them.","availability":"supported"},{"id":"Game_Party.getShopTrackingItemBuy","arguments":[{"name":"item","type":"RPG.Item|RPG.Weapon|RPG.Armor"}],"returns":"number","example":"$gameParty.getShopTrackingItemBuy($dataItems[1])","description":"Read cumulative buy quantity for this database object.","context":"Party receiver after load; absent tracking initializes to zero. Reading does not trade or alter gold. Shop transactions maintain these counters automatically. Tracking belongs to Game_Party and is retained in save files; a new game begins with zero counters on first access. It counts committed shop transactions, not generic event inventory/gold changes.","availability":"supported"},{"id":"Game_Party.getShopTrackingGoldBuy","arguments":[],"returns":"number","example":"$gameParty.getShopTrackingGoldBuy()","description":"Read cumulative buy gold.","context":"Party receiver after load; absent tracking initializes to zero. Reading does not trade or alter gold. Shop transactions maintain these counters automatically. Tracking belongs to Game_Party and is retained in save files; a new game begins with zero counters on first access. It counts committed shop transactions, not generic event inventory/gold changes.","availability":"supported"},{"id":"Game_Party.getShopTrackingItemSell","arguments":[{"name":"item","type":"RPG.Item|RPG.Weapon|RPG.Armor"}],"returns":"number","example":"$gameParty.getShopTrackingItemSell($dataItems[1])","description":"Read cumulative sell quantity for this database object.","context":"Party receiver after load; absent tracking initializes to zero. Reading does not trade or alter gold. Shop transactions maintain these counters automatically. Tracking belongs to Game_Party and is retained in save files; a new game begins with zero counters on first access. It counts committed shop transactions, not generic event inventory/gold changes.","availability":"supported"},{"id":"Game_Party.getShopTrackingGoldSell","arguments":[],"returns":"number","example":"$gameParty.getShopTrackingGoldSell()","description":"Read cumulative sell gold.","context":"Party receiver after load; absent tracking initializes to zero. Reading does not trade or alter gold. Shop transactions maintain these counters automatically. Tracking belongs to Game_Party and is retained in save files; a new game begins with zero counters on first access. It counts committed shop transactions, not generic event inventory/gold changes.","availability":"supported"},{"id":"DataManager.getProxyItem","arguments":[{"name":"item","type":"DatabaseObject|null"}],"returns":"DatabaseObject|null","example":"DataManager.getProxyItem($dataItems[5])","description":"Resolve one target declared by a Proxy note. Return the original object when it has no proxy or its target is missing; return null for null input.","context":"Call after database load. ID/name lookup stays within Items, Weapons or Armors and resolves one step, not a recursive chain. Author the target with IE-NT-proxy. The resolver itself does not grant inventory, equip anything or execute crafting.","availability":"supported"},{"id":"Window_ItemList.proxyItem","arguments":[],"returns":"DatabaseObject|null","example":"SceneManager._scene._itemWindow.proxyItem()","description":"Read the raw selected list object before proxy resolution.","context":"Receiver must be a live item list, such as the crafting list. item() resolves the displayed product; proxyItem() retains recipe identity.","availability":"supported"},{"id":"Window_ShopBuy.proxyItem","arguments":[],"returns":"DatabaseObject|null","example":"SceneManager._scene._buyWindow.proxyItem()","description":"Read the raw selected shop goods object before proxy resolution.","context":"Receiver must be a live shop buy window; item() normally resolves its product.","availability":"supported"},{"id":"VisuMZ.ItemsEquipsCore.SortByIDandPriority","arguments":[{"name":"items","type":"DatabaseObject[]"}],"returns":"DatabaseObject[]","example":"VisuMZ.ItemsEquipsCore.SortByIDandPriority($gameParty.allItems())","description":"Sort the supplied array in place by descending native priority, then ascending database ID; return that same array.","context":"Call after database load. Missing sortPriority is parsed from the native Sort Priority note, default 50. This legacy namespace is owned by the active Coreto provider and requires no original Items code.","availability":"supported"}],"commandAliases":["VisuMZ_1_ItemsEquipsCore"]};
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

function itemSwitchEnabled(note, value) {
    for (const [verb, mode] of [['ENABLE', ''], ['ENABLE', 'ALL'], ['ENABLE', 'ANY'], ['DISABLE', ''], ['DISABLE', 'ALL'], ['DISABLE', 'ANY']]) {
        const expression = new RegExp('<' + verb + (mode ? ' ' + mode : '') + ' (?:SW|SWITCH|SWITCHES): *(\\d+(?:\\s*,\\s*\\d+)*)>', 'i');
        const match = expression.exec(note || '');
        if (!match) continue;
        const states = match[1].match(/\d+/g).map(id => value(Number(id)));
        const enabled = mode === 'ANY' ? states.some(Boolean) : states.every(Boolean);
        return verb === 'ENABLE' ? enabled : !enabled;
    }
    return true;
}

function itemNoteCategories(note) {
    const result = [];
    for (const match of (note || '').matchAll(/<(?:CATEGORY|CATEGORIES): (.*)>/gi)) {
        result.push(...match[1].toUpperCase().trim().split(',').map(value => value.trim()));
    }
    const block = /<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i.exec(note || '');
    if (block) result.push(...block[1].split(/[\r\n]+/).map(value => value.toUpperCase().trim()));
    return result;
}

function itemSortPriority(note) {
    const match = /<(?:|ID )SORT(?:|ING) PRIORITY: (\d+)>/i.exec(note || '');
    return match ? Number(match[1]) : 50;
}

function itemMaximum(note, fallback) {
    const match = /<MAX: (\d+)>/i.exec(note || '');
    return match ? Number(match[1]) : fallback;
}

function itemConserved(note, random) {
    const match = /<(?:CONSERVE|PRESERVE): (\d+)[%％]>/i.exec(note || '');
    return !!match && random() < Number(match[1]) / 100;
}

function itemsObjectKey(item) {
    if (DataManager.isItem(item)) return 'item-' + item.id;
    if (DataManager.isWeapon(item)) return 'weapon-' + item.id;
    if (DataManager.isArmor(item)) return 'armor-' + item.id;
    return undefined;
}

function installItemsInventory(api) {
    DataManager.isKeyItem = function(item) { return this.isItem(item) && item.itypeId === 2; };
    const itemEnable = new Map();
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        itemEnable.clear();
        for (const group of [$dataItems, $dataWeapons, $dataArmors]) {
            for (const item of group) {
                if (!item) continue;
                item.categories = itemNoteCategories(item.note);
                item.sortPriority = itemSortPriority(item.note);
                if (group !== $dataItems) continue;
                const match = /<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i.exec(item.note || '');
                if (match) itemEnable.set(item.id, new Function('item',
                    'let enabled = true; const user = this, target = this, a = this, b = this;\ntry {\n' + match[1] +
                    '\n} catch (error) { if ($gameTemp.isPlaytest()) console.log(error); }\nreturn enabled;'));
            }
        }
    };
    DataManager.defaultItemMax = function(item) {
        const settings = api.settings.ItemScene;
        if (this.isItem(item)) return settings.MaxItems;
        if (this.isWeapon(item)) return settings.MaxWeapons;
        if (this.isArmor(item)) return settings.MaxArmors;
        return 99;
    };
    DataManager.maxItemAmount = function(item) {
        return item ? itemMaximum(item.note, this.defaultItemMax(item)) : 99;
    };
    Game_Party.prototype.maxItems = function(item) { return DataManager.maxItemAmount(item); };
    const consume = Game_Party.prototype.consumeItem;
    Game_Party.prototype.consumeItem = function(item) {
        if (item && itemConserved(item.note, Math.random)) return;
        consume.call(this, item);
    };
    const conditions = Game_BattlerBase.prototype.meetsItemConditions;
    Game_BattlerBase.prototype.meetsItemConditions = function(item) {
        return !!item && conditions.call(this, item) && this.meetsItemConditionsNotetags(item) && this.meetsItemConditionsJS(item);
    };
    Game_BattlerBase.prototype.checkItemConditionsSwitchNotetags = function(item) {
        return itemSwitchEnabled(item.note, id => $gameSwitches.value(id));
    };
    Game_BattlerBase.prototype.meetsItemConditionsNotetags = function(item) { return this.checkItemConditionsSwitchNotetags(item); };
    Game_BattlerBase.prototype.meetsItemConditionsJS = function(item) {
        const evaluate = itemEnable.get(item.id);
        return evaluate ? evaluate.call(this, item) : true;
    };

    Game_Temp.prototype.newLabelEnabled = function() { return !this._bypassNewLabel && api.settings.New.Enable; };
    Game_Party.prototype.initNewItemsList = function() { this._newItemsList = []; };
    const initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() { initialize.call(this); this.initNewItemsList(); };
    Game_Party.prototype.isNewItem = function(item) {
        if (!$gameTemp.newLabelEnabled()) return false;
        if (this._newItemsList === undefined) this.initNewItemsList();
        const key = itemsObjectKey(item);
        return key === undefined ? undefined : this._newItemsList.includes(key);
    };
    Game_Party.prototype.setNewItem = function(item) {
        if (!$gameTemp.newLabelEnabled()) return;
        if (this._newItemsList === undefined) this.initNewItemsList();
        const key = itemsObjectKey(item);
        if (key !== undefined && !this._newItemsList.includes(key)) this._newItemsList.push(key);
    };
    Game_Party.prototype.clearNewItem = function(item) {
        if (!$gameTemp.newLabelEnabled()) return;
        if (this._newItemsList === undefined) this.initNewItemsList();
        const index = this._newItemsList.indexOf(itemsObjectKey(item));
        if (index >= 0) this._newItemsList.splice(index, 1);
    };
    const gain = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        const before = this.numItems(item);
        gain.call(this, item, amount, includeEquip);
        if (this.numItems(item) > before) this.setNewItem(item);
    };
}

function itemsCategoryIncludes(type, item) {
    const isItem = DataManager.isItem(item);
    switch (type) {
    case 'AllItems': return isItem;
    case 'RegularItems': return isItem && item.itypeId === 1;
    case 'KeyItems': return isItem && item.itypeId === 2;
    case 'HiddenItemA': return isItem && item.itypeId === 3;
    case 'HiddenItemB': return isItem && item.itypeId === 4;
    case 'Consumable': return isItem && item.consumable;
    case 'Nonconsumable': return isItem && !item.consumable;
    case 'AlwaysUsable': return isItem && item.occasion === 0;
    case 'BattleUsable': return isItem && [0, 1].includes(item.occasion);
    case 'FieldUsable': return isItem && [0, 2].includes(item.occasion);
    case 'NeverUsable': return isItem && item.occasion === 3;
    case 'AllWeapons': return DataManager.isWeapon(item);
    case 'AllArmors': return DataManager.isArmor(item);
    }
    const source = String(type || '');
    for (const [prefix, names, field, accepts] of [
        ['WTYPE', $dataSystem.weaponTypes, 'wtypeId', DataManager.isWeapon],
        ['ATYPE', $dataSystem.armorTypes, 'atypeId', DataManager.isArmor],
        ['ETYPE', $dataSystem.equipTypes, 'etypeId', DataManager.isArmor]
    ]) {
        const numeric = new RegExp(prefix + ':(\\d+)', 'i').exec(source);
        if (numeric) return !!item && (prefix === 'ETYPE' || accepts.call(DataManager, item)) && item[field] === Number(numeric[1]);
        const named = new RegExp(prefix + ':(.*)', 'i').exec(source);
        if (named) return accepts.call(DataManager, item) && item[field] === names.indexOf(named[1].trim());
    }
    const category = /Category:(.*)/i.exec(source);
    return !!(category && item && item.categories.includes(category[1].toUpperCase().trim()));
}

function installItemsCategories(api) {
    const settings = api.settings.Categories;
    Window_ItemCategory.categoryList = settings.List;
    Window_ItemCategory.categoryItemTypes = ['HiddenItemA', 'HiddenItemB', 'Consumable', 'Nonconsumable', 'AlwaysUsable', 'BattleUsable', 'FieldUsable', 'NeverUsable'];
    Scene_Item.prototype.isPureVanillaMode = function() { return !api.settings.ItemScene.EnableLayout && api.settings.ItemScene.DisabledVanilla; };
    Window_ItemCategory.prototype.categoryStyle = function() {
        return SceneManager._scene?.constructor === Scene_Item && SceneManager._scene.isPureVanillaMode() ? 'text' : settings.Style;
    };
    Window_ItemCategory.prototype.makeCommandList = function() { this.addItemCategories(); this.select(this.index()); };
    Window_ItemCategory.prototype.addItemCategories = function() {
        const pure = SceneManager._scene?.constructor === Scene_Item && SceneManager._scene.isPureVanillaMode();
        const categories = pure ? ['RegularItems', 'AllWeapons', 'AllArmors', 'KeyItems'].map(Type => ({Type, Icon: 0, SwitchID: 0, SortBy: 'ID'})) : Window_ItemCategory.categoryList;
        for (const category of categories) this.addItemCategory(category);
    };
    Window_ItemCategory.prototype.addItemCategory = function(category) {
        if (category.SwitchID > 0 && !$gameSwitches.value(category.SwitchID)) return;
        const type = category.Type;
        let name = '';
        const custom = /Category:(.*)/i.exec(type);
        if (custom) name = custom[1].trim();
        else if (Window_ItemCategory.categoryItemTypes.includes(type)) name = settings[type];
        else if (['AllItems', 'RegularItems'].includes(type)) name = TextManager.item;
        else if (type === 'KeyItems') name = TextManager.keyItem;
        else if (type === 'AllWeapons') name = TextManager.weapon;
        else if (type === 'AllArmors') name = TextManager.armor;
        else {
            for (const [prefix, names] of [['WTYPE', $dataSystem.weaponTypes], ['ATYPE', $dataSystem.armorTypes], ['ETYPE', $dataSystem.equipTypes]]) {
                const match = new RegExp(prefix + ':(\\d+)', 'i').exec(type);
                if (match) { name = names[Number(match[1])] || ''; break; }
            }
        }
        if (TextManager.parseLocalizedText && TextManager.isVisuMzLocalizationEnabled()) {
            const key = name.toLowerCase().trim();
            if (key && $dataLocalization[key]) name = $dataLocalization[key][ConfigManager.textLocale || 'English'] || 'UNDEFINED!';
        }
        if (category.Icon > 0 && this.categoryStyle() !== 'text') name = '\\I[' + category.Icon + ']' + name;
        this.addCommand(name, 'category', true, type);
    };
    Window_ItemCategory.prototype.maxCols = function() { return this._list ? this.maxItems() : 4; };
    Window_ItemCategory.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (this._itemWindow) this._itemWindow.setCategory(this.currentExt());
    };
    const setWindow = Window_ItemCategory.prototype.setItemWindow;
    Window_ItemCategory.prototype.setItemWindow = function(window) { setWindow.call(this, window); window._categoryWindow = this; };
    Window_ItemCategory.prototype.itemTextAlign = function() { return settings.TextAlign; };
    Window_ItemCategory.prototype.categoryStyleCheck = function(index) {
        if (index < 0) return 'text';
        const style = this.categoryStyle();
        if (style !== 'auto') return style;
        const name = this.commandName(index);
        if (!/\\I\[(\d+)\]/i.test(name)) return 'text';
        return this.textSizeEx(name).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
    };
    Window_ItemCategory.prototype.drawItem = function(index) {
        const style = this.categoryStyleCheck(index);
        if (style === 'icon') this.drawItemStyleIcon(index);
        else if (style === 'iconText') this.drawItemStyleIconText(index);
        else Window_HorzCommand.prototype.drawItem.call(this, index);
    };
    Window_ItemCategory.prototype.drawItemStyleIcon = function(index) {
        const match = /\\I\[(\d+)\]/i.exec(this.commandName(index));
        if (!match) return;
        const rect = this.itemLineRect(index);
        this.drawIcon(Number(match[1]), rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2), rect.y + (rect.height - ImageManager.iconHeight) / 2);
    };
    Window_ItemCategory.prototype.drawItemStyleIconText = function(index) {
        const rect = this.itemLineRect(index), name = this.commandName(index), width = this.textSizeEx(name).width;
        this.changePaintOpacity(this.isCommandEnabled(index));
        const align = this.itemTextAlign();
        const offset = align === 'right' ? rect.width - width : align === 'center' ? Math.floor((rect.width - width) / 2) : 0;
        this.drawTextEx(name, rect.x + offset, rect.y, width);
    };
    const initialize = Window_ItemCategory.prototype.initialize;
    Window_ItemCategory.prototype.initialize = function(rect) { initialize.call(this, rect); this.createCategoryNameWindow(rect); };
    Window_ItemCategory.prototype.createCategoryNameWindow = function(rect) {
        this._categoryNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
        this._categoryNameWindow.opacity = 0;
        this.addChild(this._categoryNameWindow);
        this.updateCategoryNameWindow();
    };
    Window_ItemCategory.prototype.callUpdateHelp = function() {
        Window_HorzCommand.prototype.callUpdateHelp.call(this);
        if (this._categoryNameWindow) this.updateCategoryNameWindow();
    };
    Window_ItemCategory.prototype.updateCategoryNameWindow = function() {
        const window = this._categoryNameWindow;
        window.contents.clear();
        if (this.categoryStyleCheck(this.index()) !== 'icon') return;
        const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[(\d+)\]/gi, '');
        window.resetFontSettings();
        window.drawText(name, 0, rect.y, window.innerWidth, 'center');
        window.x = window.width / -2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
        window.y = Math.floor(rect.height / 2);
    };
    Window_ItemList.prototype.includes = function(item) { return itemsCategoryIncludes(this._category, item); };
    Window_ItemList.prototype.canSortListItemScene = function() { return ['Scene_Battle', 'Scene_Item', 'Scene_Equip', 'Scene_Shop'].includes(SceneManager._scene?.constructor.name); };
    Window_ItemList.prototype.sortListItemScene = function() {
        const category = Window_ItemCategory.categoryList.find(entry => entry.Type === this._category);
        const byName = String(category?.SortBy || 'ID').toUpperCase().trim() === 'NAME';
        this._data.sort((a, b) => !a || !b ? 0 : byName ? a.name.localeCompare(b.name) : b.sortPriority - a.sortPriority || a.id - b.id);
    };
    const makeList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function() { makeList.call(this); if (this.canSortListItemScene()) this.sortListItemScene(); };
}

function installItemsDisplay(api) {
    ColorManager.getItemColor = function(item) {
        if (!item) return this.normalColor();
        const index = /<COLOR: (\d+)>/i.exec(item.note || '');
        if (index) return this.textColor(Number(index[1]).clamp(0, 31));
        const hex = /<COLOR: #(.*)>/i.exec(item.note || '');
        return hex ? '#' + hex[1] : this.normalColor();
    };
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
        if (!item) return;
        const standard = ImageManager.standardIconWidth || 32, offset = standard + 4;
        this.changeTextColor(ColorManager.getItemColor(item));
        this.drawIcon(item.iconIndex, x + Math.ceil((standard - ImageManager.iconWidth) / 2), y + (this.lineHeight() - ImageManager.iconHeight) / 2);
        this.drawText(item.name, x + offset, y, Math.max(0, width - offset));
        this.resetTextColor();
    };
    Window_Base.prototype.isDrawItemNumber = function(item) { return DataManager.isKeyItem(item) ? $dataSystem.optKeyItemsNumber : true; };
    Window_Base.prototype.drawItemNumber = function(item, x, y, width) {
        if (!this.isDrawItemNumber(item)) return;
        this.resetFontSettings();
        this.contents.fontSize = api.settings.ItemScene.ItemQuantityFontSize;
        this.drawText(api.settings.ItemScene.ItemQuantityFmt.format($gameParty.numItems(item)), x, y, width, 'right');
        this.resetFontSettings();
    };
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) { Window_Selectable.prototype.drawItemNumber.call(this, item, x, y, width); };

    const settings = api.settings.New;
    function createLabel() {
        const bitmap = new Bitmap(32, 32);
        if (settings.Icon > 0) {
            const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
            bitmap.blt(ImageManager.loadSystem('IconSet'), settings.Icon % 16 * width, Math.floor(settings.Icon / 16) * height, width, height, 0, 0);
        }
        if (settings.Text !== '') {
            bitmap.fontFace = settings.FontFace || $gameSystem.mainFontFace();
            bitmap.textColor = String(settings.FontColor).includes('#') ? '#' + String(settings.FontColor).split('#').slice(1).join('#') : ColorManager.textColor(settings.FontColor);
            bitmap.fontSize = settings.FontSize;
            bitmap.drawText(settings.Text, 0, 16, 32, 16, 'center');
        }
        return new Sprite(bitmap);
    }
    Window_Selectable.prototype.initNewLabelSprites = function() {
        this._newLabelSprites = {};
        this._newLabelOpacity = 255;
        this._newLabelOpacityChange = settings.FadeSpeed;
        this._newLabelOpacityUpperLimit = settings.FadeLimit;
    };
    const initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function(rect) { this.initNewLabelSprites(); initialize.call(this, rect); };
    Window_Selectable.prototype.isShowNew = function() { return false; };
    Window_ItemList.prototype.isShowNew = function() { return true; };
    Window_Selectable.prototype.createNewLabelSprite = function(key) {
        if (!this._newLabelSprites[key]) {
            this._newLabelSprites[key] = createLabel();
            this.addInnerChild(this._newLabelSprites[key]);
        }
        return this._newLabelSprites[key];
    };
    Window_Selectable.prototype.placeNewLabel = function(item, x, y) {
        const key = itemsObjectKey(item);
        if (key === undefined) return;
        const sprite = this.createNewLabelSprite(key);
        sprite.move(x, y); sprite.show(); sprite.opacity = this._newLabelOpacity;
    };
    Window_Selectable.prototype.clearNewLabelFromItem = function(item) {
        if (!item) return;
        $gameParty.clearNewItem(item);
        const sprite = this._newLabelSprites[itemsObjectKey(item)];
        if (sprite) sprite.hide();
    };
    Window_Selectable.prototype.hideNewLabelSprites = function() { for (const sprite of Object.values(this._newLabelSprites)) sprite.hide(); };
    const help = Window_Selectable.prototype.setHelpWindowItem;
    Window_Selectable.prototype.setHelpWindowItem = function(item) { help.call(this, item); if (this.isShowNew()) this.clearNewLabelFromItem(item); };
    const refresh = Window_Selectable.prototype.refresh;
    Window_Selectable.prototype.refresh = function() { this.hideNewLabelSprites(); refresh.call(this); };
    Window_Selectable.prototype.updateNewLabelOpacity = function() {
        if (!this.isShowNew()) return;
        const limit = this._newLabelOpacityUpperLimit;
        this._newLabelOpacity += this._newLabelOpacityChange;
        if (this._newLabelOpacity >= limit || this._newLabelOpacity <= 0) this._newLabelOpacityChange *= -1;
        this._newLabelOpacity = this._newLabelOpacity.clamp(0, limit);
        for (const sprite of Object.values(this._newLabelSprites)) sprite.opacity = this._newLabelOpacity;
    };
    const update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function() { this.updateNewLabelOpacity(); update.call(this); };
    Window_ItemList.prototype.placeItemNewLabel = function(index) {
        const item = this.itemAt(index);
        if (!item || !this.isShowNew() || !$gameParty.isNewItem(item)) return;
        const rect = this.itemLineRect(index);
        this.placeNewLabel(item, rect.x + settings.OffsetX, rect.y + (this.lineHeight() - 32) / 2 + settings.OffsetY);
    };
    const draw = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) { draw.call(this, index); this.placeItemNewLabel(index); };
    const activate = Scene_ItemBase.prototype.activateItemWindow;
    Scene_ItemBase.prototype.activateItemWindow = function() { activate.call(this); this._itemWindow.callUpdateHelp(); };
}

function itemClassSlots(note, names, battleTest = false) {
    const types = names.map(name => name ? name.trim() : '');
    const block = !battleTest && /<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i.exec(note || '');
    const slots = block ? block[1].split(/[\r\n]+/) : types;
    return slots.map(name => types.indexOf(name.trim())).filter(id => id > 0);
}

function itemRequirementComparison(value, operator, threshold) {
    switch (operator) {
    case '>': return value > threshold;
    case '>=': return value >= threshold;
    case '===': return value === threshold;
    case '<=': return value <= threshold;
    case '<': return value < threshold;
    }
    return false;
}

function itemEquipLimit(note, kind) {
    const match = new RegExp('<EQUIP ' + kind + ' LIMIT: (\\d+)>', 'i').exec(note || '');
    return match ? Number(match[1]) : null;
}

function installItemsEquipment(api) {
    function namedId(name, database, className = false) {
        const wanted = name.toUpperCase().trim();
        let result = 0;
        for (const entry of database) {
            if (!entry) continue;
            const label = className ? entry.name.replace(/\x1I\[(\d+)\]/gi, '').replace(/\\I\[(\d+)\]/gi, '') : entry.name;
            if (label.toUpperCase().trim() === wanted) result = entry.id;
        }
        return result;
    }
    DataManager.getClassIdWithName = function(name) { return namedId(name, $dataClasses, true); };
    DataManager.getSkillIdWithName = function(name) { return namedId(name, $dataSkills); };
    DataManager.getEtypeIdWithName = function(name) {
        const wanted = name.toUpperCase().trim();
        const match = $dataSystem.equipTypes.find(type => type.toUpperCase().trim() === wanted);
        return match === undefined ? 0 : $dataSystem.equipTypes.indexOf(match);
    };
    const typeCache = new Map(), classCache = new Map(), requirementCache = new Map();
    DataManager.getEtypeIDsCache = function(item) {
        if (!typeCache.has(item)) {
            const ids = [item.etypeId || 0], match = /<ADDED ETYPE(?:|S): (.*)>/i.exec(item.note || '');
            if (match) for (const value of match[1].split(',').map(value => value.trim())) {
                const id = /^\d+$/.test(value) ? Number(value) : this.getEtypeIdWithName(value);
                if (id > 1) ids.push(id);
            }
            typeCache.set(item, ids);
        }
        return typeCache.get(item);
    };
    DataManager.getEtypeIDs = function(item) { return this.isArmor(item) ? this.getEtypeIDsCache(item) : [item.etypeId || 0]; };
    DataManager.getClassRequirements = function(item) {
        if (!item) return [];
        if (!classCache.has(item)) {
            const match = /<EQUIP FOR CLASS(?:|ES) ONLY: (.*)>/i.exec(item.note || '');
            classCache.set(item, match ? match[1].split(',').map(value => value.trim()).map(value => /^\d+$/.test(value) ? Number(value) : this.getClassIdWithName(value)) : []);
        }
        return classCache.get(item);
    };
    DataManager.getEquipRequirements = function(item) {
        if (!item) return [];
        if (!requirementCache.has(item)) {
            const match = /<EQUIP(?:|MENT) REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT) REQUIREMENT(?:|S)>/i.exec(item.note || '');
            requirementCache.set(item, match ? match[1].split(/[\r\n]+/) : []);
        }
        return requirementCache.get(item);
    };
    DataManager.meetsClassRequirements = function(actor, item) {
        if (!actor || this.isItem(item)) return false;
        if ($gameTemp._checkEquipRequirements || BattleManager.isBattleTest()) return true;
        const classes = this.getClassRequirements(item);
        return classes.length === 0 || classes.includes(actor.currentClass().id);
    };
    DataManager.meetsEquipRequirement = function(actor, line) {
        const level = /(?:LEVEL|LV|LVL) (>|>=|===|<=|<) (\d+)/i.exec(line);
        if (level) return itemRequirementComparison(actor.level, level[1], Number(level[2]));
        const parameter = /(MAXHP|MAXMP|MHP|MMP|ATK|DEF|MAT|MDF|AGI|LUK) (>|>=|===|<=|<) (\d+)/i.exec(line);
        if (parameter) {
            const key = parameter[1].toUpperCase();
            const id = ['MAXHP', 'MHP'].includes(key) ? 0 : ['MAXMP', 'MMP'].includes(key) ? 1 : ['ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'].indexOf(key) + 2;
            return itemRequirementComparison(actor.paramBase(id) + (actor._paramPlus[id] || 0), parameter[2], Number(parameter[3]));
        }
        const skillId = /LEARNED SKILL: (\d+)/i.exec(line);
        if (skillId) return actor.isLearnedSkill(Number(skillId[1]));
        const skillName = /LEARNED SKILL: (.*)/i.exec(line);
        if (skillName) return actor.isLearnedSkill(this.getSkillIdWithName(skillName[1]));
        const switchId = /SWITCH: (\d+)/i.exec(line);
        return switchId ? $gameSwitches.value(Number(switchId[1])) : true;
    };
    DataManager.meetsEquipRequirements = function(actor, item) {
        if (!actor || this.isItem(item)) return false;
        if ($gameTemp._checkEquipRequirements || BattleManager.isBattleTest()) return true;
        return this.getEquipRequirements(item).every(line => this.meetsEquipRequirement(actor, line));
    };
    const canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item) {
        return DataManager.meetsClassRequirements(this, item) && DataManager.meetsEquipRequirements(this, item) && canEquip.call(this, item);
    };
    Game_BattlerBase.prototype.canEquipArmor = function(item) {
        return this.isEquipAtypeOk(item.atypeId) && !this.isEquipTypeSealed(item.etypeId) && DataManager.getEtypeIDs(item).every(id => !this.isEquipTypeSealed(id));
    };
    const trade = Game_Actor.prototype.tradeItemWithParty;
    Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
        if (this._tempActor) return false;
        $gameTemp._bypassNewLabel = true;
        try { return trade.call(this, newItem, oldItem); }
        finally { $gameTemp._bypassNewLabel = false; }
    };
    Game_Actor.prototype.changeEquipBase = function(slot, item) {
        if (!this.tradeItemWithParty(item, this.equips()[slot])) return;
        if (item && !DataManager.getEtypeIDs(item).includes(this.equipSlots()[slot])) return;
        if (!this._equips[slot]) this._equips[slot] = new Game_Item();
        this._equips[slot].setObject(item);
        if (api.CheckCursedItemMsg && api.CheckCursedItemMsg(item)) {
            const template = api.settings.EquipScene.CursedTextPopup || '';
            const message = template.format(this.name(), '\\I[' + item.iconIndex + ']', item.name || '');
            if (message.length > 0) $textPopup(message);
        }
        this.refresh();
    };
    Game_Actor.prototype.changeEquip = function(slot, item) { this.changeEquipBase(slot, item); };
    Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
        if (this._bypassReleaseUnequippableItemsItemsEquipsCore) return;
        for (let pass = 0; pass < 3; pass++) {
            const slots = this.equipSlots(), equips = this.equips();
            let changed = false;
            for (let index = 0; index < equips.length; index++) {
                const item = equips[index];
                if (!item || this.canEquip(item) && DataManager.getEtypeIDs(item).includes(slots[index])) continue;
                if (!forcing) this.tradeItemWithParty(null, item);
                if (this._equips[index]) this._equips[index].setObject(null);
                changed = true;
            }
            if (!changed) break;
        }
    };
    Game_Actor.prototype.nonRemovableEtypes = function() { return api.settings.EquipScene.NonRemoveETypes; };
    Game_Actor.prototype.nonOptimizeEtypes = function() { return api.settings.EquipScene.NonOptimizeETypes; };
    Game_Actor.prototype.isClearEquipOk = function(slot) { return !this.nonRemovableEtypes().includes(this.equipSlots()[slot]) && this.isEquipChangeOk(slot); };
    Game_Actor.prototype.isOptimizeEquipOk = function(slot) { return !this.nonOptimizeEtypes().includes(this.equipSlots()[slot]) && this.isEquipChangeOk(slot); };
    Game_Actor.prototype.clearEquipments = function() {
        for (let slot = 0; slot < this.equipSlots().length; slot++) if (this.isClearEquipOk(slot)) this.changeEquip(slot, null);
    };
    Game_Actor.prototype.optimizeEquipments = function() {
        const count = this.equipSlots().length;
        for (let slot = 0; slot < count; slot++) if (this.isOptimizeEquipOk(slot)) this.changeEquip(slot, null);
        for (let slot = 0; slot < count; slot++) if (this.isOptimizeEquipOk(slot)) this.changeEquip(slot, this.bestEquipItem(slot));
    };
    Game_Actor.prototype.canEquipWithOptimize = function(item) {
        if (!item) return false;
        const copy = itemEquipLimit(item.note, 'COPY');
        if (copy !== null && this.equips().filter(equip => equip === item).length >= (copy || 1)) return false;
        for (const [matches, field, kind] of [[DataManager.isWeapon, 'wtypeId', 'WEAPON TYPE'], [DataManager.isArmor, 'atypeId', 'ARMOR TYPE']]) {
            if (!matches.call(DataManager, item)) continue;
            const held = this.equips().filter(equip => matches.call(DataManager, equip) && equip[field] === item[field]);
            const limit = itemEquipLimit(item.note, kind);
            if (limit !== null && held.length >= (limit || 1)) return false;
            let otherLimit = 9999;
            for (const equip of held) { const other = itemEquipLimit(equip.note, kind); if (other !== null) otherLimit = Math.min(otherLimit, other); }
            if (held.length > 0 && held.length >= otherLimit) return false;
        }
        return true;
    };
    Game_Actor.prototype.bestEquipItem = function(slot) {
        const type = this.equipSlots()[slot];
        let best = null, score = -1000;
        for (const item of $gameParty.equipItems()) {
            if (!DataManager.getEtypeIDs(item).includes(type) || !this.canEquip(item) || !this.canEquipWithOptimize(item)) continue;
            const performance = this.calcEquipItemPerformance(item);
            if (performance > score) { best = item; score = performance; }
        }
        return best;
    };
    Window_EquipSlot.prototype.equipSlotIndex = function() { return this.index(); };
    const slotEnabled = Window_EquipSlot.prototype.isEnabled;
    Window_EquipSlot.prototype.isEnabled = function(index) { return this.maxItems() > 0 && slotEnabled.call(this, index); };
    Window_EquipItem.prototype.nonRemovableEtypes = function() { return api.settings.EquipScene.NonRemoveETypes; };
    const includes = Window_EquipItem.prototype.includes;
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null && this.nonRemovableEtypes().includes(this.etypeId())) return false;
        $gameTemp._checkEquipRequirements = true;
        try {
            if (includes.call(this, item)) return true;
            return !!item && DataManager.isArmor(item) && !!this._actor && this._actor.isEquipAtypeOk(item.atypeId || 0) && DataManager.getEtypeIDs(item).includes(this.etypeId());
        } finally { $gameTemp._checkEquipRequirements = undefined; }
    };
    function otherEquips(window) {
        const equips = window._actor.equips();
        equips[SceneManager._scene._slotWindow.equipSlotIndex()] = null;
        return equips;
    }
    Window_EquipItem.prototype.itemHasEquipLimit = function(item) {
        const limit = itemEquipLimit(item.note, 'COPY');
        return limit !== null && otherEquips(this).filter(equip => equip && DataManager.isWeapon(equip) === DataManager.isWeapon(item) && equip.id === item.id).length >= (limit || 1);
    };
    function typeLimit(window, item, matches, field, kind) {
        if (!matches.call(DataManager, item)) return false;
        let count = 0;
        for (const equip of otherEquips(window)) {
            if (!matches.call(DataManager, equip) || equip[field] !== item[field]) continue;
            count++;
            const incoming = itemEquipLimit(item.note, kind), existing = itemEquipLimit(equip.note, kind);
            if (incoming !== null && count >= (incoming || 1) || existing !== null && count >= (existing || 1)) return true;
        }
        return false;
    }
    Window_EquipItem.prototype.isSoleWeaponType = function(item) { return typeLimit(this, item, DataManager.isWeapon, 'wtypeId', 'WEAPON TYPE'); };
    Window_EquipItem.prototype.isSoleArmorType = function(item) { return typeLimit(this, item, DataManager.isArmor, 'atypeId', 'ARMOR TYPE'); };
    const enabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function(item) {
        if (item && this._actor && (this.itemHasEquipLimit(item) || this.isSoleWeaponType(item) || this.isSoleArmorType(item) || !this._actor.canEquip(item))) return false;
        return item ? enabled.call(this, item) : !this.nonRemovableEtypes().includes(this.etypeId());
    };
    Window_EquipItem.prototype.drawRemoveItem = function(index) {
        const settings = api.settings.EquipScene, rect = this.itemLineRect(index);
        const iconWidth = ImageManager.standardIconWidth || 32, textOffset = iconWidth + 4;
        this.changePaintOpacity(this.isEnabled(null));
        this.resetTextColor();
        this.drawIcon(settings.RemoveEquipIcon, rect.x + Math.ceil((iconWidth - ImageManager.iconWidth) / 2), rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2);
        this.drawText(settings.RemoveEquipText, rect.x + textOffset, rect.y, Math.max(0, rect.width - textOffset));
        this.changePaintOpacity(true);
    };
    Window_EquipItem.prototype.drawItem = function(index) {
        if (this.itemAt(index)) Window_ItemList.prototype.drawItem.call(this, index);
        else this.drawRemoveItem(index);
    };
    Window_EquipCommand.prototype.commandStyle = function() { return api.settings.EquipScene.CmdStyle; };
    Window_EquipCommand.prototype.isUseModernControls = function() { return !!Imported.VisuMZ_0_CoreEngine && Window_HorzCommand.prototype.isUseModernControls.call(this); };
    Window_EquipCommand.prototype.isEquipCommandAdded = function() { return !this.isUseModernControls(); };
    Window_EquipCommand.prototype.isOptimizeCommandAdded = function() { return api.settings.EquipScene.CommandAddOptimize; };
    Window_EquipCommand.prototype.isClearCommandAdded = function() { return api.settings.EquipScene.CommandAddClear; };
    Window_EquipCommand.prototype.isEquipCommandEnabled = function() { return true; };
    Window_EquipCommand.prototype.isOptimizeCommandEnabled = function() { return true; };
    Window_EquipCommand.prototype.isClearCommandEnabled = function() { return true; };
    for (const [name, symbol, text, icon] of [['Equip', 'equip', 'equip2', 'CmdIconEquip'], ['Optimize', 'optimize', 'optimize', 'CmdIconOptimize'], ['Clear', 'clear', 'clear', 'CmdIconClear']]) {
        Window_EquipCommand.prototype['add' + name + 'Command'] = function() {
            if (!this['is' + name + 'CommandAdded']()) return;
            const label = this.commandStyle() === 'text' ? TextManager[text] : '\\I[' + api.settings.EquipScene[icon] + ']' + TextManager[text];
            this.addCommand(label, symbol, this['is' + name + 'CommandEnabled']());
        };
    }
    Window_EquipCommand.prototype.makeCommandList = function() { this.addEquipCommand(); this.addOptimizeCommand(); this.addClearCommand(); };
}

function installItemsEquipSlots() {
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        for (const entry of $dataClasses) if (entry) entry.equipSlots = itemClassSlots(entry.note, $dataSystem.equipTypes, BattleManager.isBattleTest());
    };
    Game_Actor.prototype.equipSlots = function() {
        const slots = (this._forcedSlots || this.currentClass().equipSlots).slice();
        if (slots.length >= 2 && this.isDualWield()) slots[1] = 1;
        return slots;
    };
    Game_Actor.prototype.convertInitEquipsToItems = function(equips) {
        const items = [];
        for (let index = 0; index < equips.length; index++) {
            const id = equips[index];
            if (id <= 0) continue;
            if ($dataSystem.equipTypes[index + 1] === $dataSystem.equipTypes[1] || index === 1 && this.isDualWield()) items.push($dataWeapons[id]);
            else if ($dataArmors[id]?.etypeId === index + 1) items.push($dataArmors[id]);
        }
        return items;
    };
    Game_Actor.prototype.getMatchingInitEquip = function(items, type) {
        const index = items.findIndex(item => item?.etypeId === type);
        return index < 0 ? null : items.splice(index, 1)[0];
    };
    Game_Actor.prototype.initEquips = function(equips) {
        const items = this.convertInitEquipsToItems(equips), slots = this.equipSlots();
        this._equips = slots.map(() => new Game_Item());
        for (let index = 0; index < slots.length; index++) {
            const item = this.getMatchingInitEquip(items, slots[index]);
            if (this.canEquip(item)) this._equips[index].setObject(item);
        }
        this.releaseUnequippableItems(true);
        this.refresh();
    };
    Game_Actor.prototype.getNextAvailableEtypeId = function(type) {
        const slots = this.equipSlots(), equips = this.equips();
        let selected = 0;
        for (let index = 0; index < slots.length; index++) if (slots[index] === type) {
            selected = index;
            if (!equips[index]) return selected;
        }
        return selected;
    };
    Game_Actor.prototype.changeEquipById = function(type, itemId) {
        const slot = this.getNextAvailableEtypeId(type);
        if (slot >= 0) this.changeEquip(slot, type === 1 ? $dataWeapons[itemId] : $dataArmors[itemId]);
    };
    const changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(classId, keepExp) { changeClass.call(this, classId, keepExp); this.updateChangedSlots(); };
    Game_Actor.prototype.updateChangedSlots = function() {
        const count = this.equipSlots().length;
        while (this._equips.length > count) {
            const removed = this._equips[this._equips.length - 1];
            if (removed && removed.object()) $gameParty.gainItem(removed.object(), 1);
            this._equips.pop();
        }
        while (this._equips.length < count) this._equips.push(new Game_Item());
    };
    Game_Actor.prototype.forceChangeEquipSlots = function(slots) {
        slots.remove(0);
        slots.remove(-1);
        this._forcedSlots = slots;
        this.refresh();
        this.updateChangedSlots();
    };
    Game_Actor.prototype.forceResetEquipSlots = function() {
        this._forcedSlots = undefined;
        this.refresh();
        this.updateChangedSlots();
    };
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, 'ActorChangeEquipSlots', args => {
            const actors = JSON.parse(args['Actors:arraynum'] || '["1"]');
            const names = JSON.parse(args['Slots:arraystr'] || '["Weapon","Shield","Head","Body","Accessory"]');
            const slots = names.map(name => $dataSystem.equipTypes.indexOf(name.trim()));
            for (const id of actors) {
                const actor = $gameActors.actor(Number(id));
                if (actor) actor.forceChangeEquipSlots(slots);
            }
        });
        PluginManager.registerCommand(receiver, 'ActorResetEquipSlots', args => {
            for (const id of JSON.parse(args['Actors:arraynum'] || '["1"]')) {
                const actor = $gameActors.actor(Number(id));
                if (actor) actor.forceResetEquipSlots();
            }
        });
    }
}

function itemEquipmentParameter(note, name, fallback) {
    const match = new RegExp('<' + name + ': ([+-]\\d+)>', 'i').exec(note || '');
    return match ? Number(match[1]) : fallback;
}

function itemAdjustedVitals(hp, mp, mhp, mmp, hpRate, mpRate) {
    return [hp > 0 ? Math.round(hpRate * mhp) : hp, mp > 0 ? Math.round(mpRate * mmp) : mp];
}

function installItemsParameters(api) {
    const names = ['MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
    api.paramJS = {};
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        for (const database of [$dataWeapons, $dataArmors]) for (const item of database) {
            if (!item) continue;
            for (const [index, name] of names.entries()) item.params[index] = itemEquipmentParameter(item.note, name, item.params[index]);
            const block = /<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i.exec(item.note || '');
            if (!block) continue;
            const callback = new Function('item', 'paramId',
                'let MaxHP=0, MaxMP=0, ATK=0, DEF=0, MAT=0, MDF=0, AGI=0, LUK=0;\n' +
                'const user=this, target=this, a=this, b=this;\n' +
                'try {\n' + block[1] + '\n} catch(error) { if($gameTemp.isPlaytest()) console.log(error); }\n' +
                'return [MaxHP,MaxMP,ATK,DEF,MAT,MDF,AGI,LUK][paramId];');
            const key = (database === $dataWeapons ? 'W' : 'A') + item.id;
            for (const [index, name] of names.entries()) if (new RegExp('\\b' + name + '\\b').test(block[1])) api.paramJS[key + '-' + index] = callback;
        }
    };
    Game_Actor.prototype.paramPlusItemsEquipsCoreCustomJS = function(item, paramId) {
        if (this._calculatingJSParameters) return 0;
        const callback = api.paramJS[(DataManager.isWeapon(item) ? 'W' : 'A') + item.id + '-' + paramId];
        if (!callback) return 0;
        this._calculatingJSParameters = true;
        try { return callback.call(this, item, paramId); }
        finally { this._calculatingJSParameters = false; }
    };
    const paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function(paramId) {
        let value = paramPlus.call(this, paramId);
        for (const item of this.equips()) if (item) value += this.paramPlusItemsEquipsCoreCustomJS(item, paramId);
        return value;
    };
    Game_Actor.prototype.equipAdjustHpMp = function(previous) {
        if (this._tempActor || !api.settings.EquipScene.EquipAdjustHpMp) return;
        const values = itemAdjustedVitals(this.hp, this.mp, this.mhp, this.mmp, previous.hpRate(), previous.mpRate());
        if (this.hp > 0) this.setHp(values[0]);
        if (this.mp > 0) this.setMp(values[1]);
    };
    for (const name of ['changeEquip', 'forceChangeEquip', 'discardEquip']) {
        const change = Game_Actor.prototype[name];
        Game_Actor.prototype[name] = function(...args) {
            if (name === 'forceChangeEquip' && !this._equips[args[0]]) this._equips[args[0]] = new Game_Item();
            if (this._tempActor) return change.apply(this, args);
            const previous = JsonEx.makeDeepCopy(this);
            previous._tempActor = true;
            const result = change.apply(this, args);
            this.equipAdjustHpMp(previous);
            return result;
        };
    }
}

function installItemsArtifacts(api) {
    const partyPattern = /<(?:STACKABLE |STACK |)(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i;
    const troopPattern = /<(?:STACKABLE |STACK |)(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i;
    DataManager.isPartyArtifact = function(item) { return this.isArmor(item) && partyPattern.test(item.note || ''); };
    DataManager.isTroopArtifact = function(item) { return this.isArmor(item) && troopPattern.test(item.note || ''); };
    DataManager.isArtifact = function(item) { return this.isPartyArtifact(item) || this.isTroopArtifact(item); };
    DataManager.isStackableArtifact = function(item) { return this.isArtifact(item) && /<(?:STACKABLE|STACK) (?:PARTY|ALLY|TROOP|FOE) (?:ARTIFACT|RELIC)>/i.test(item.note || ''); };
    api.artifactIDs = {partyArtifactIDs: [], troopArtifactIDs: []};
    api.SetupArtifactItemIDs = function() {
        for (const side of ['party', 'troop']) api.artifactIDs[side + 'ArtifactIDs'] = $dataArmors.filter(item => item && DataManager['is' + (side === 'party' ? 'Party' : 'Troop') + 'Artifact'](item)).map(item => item.id);
    };
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() { boot.call(this); api.SetupArtifactItemIDs(); };
    for (const side of ['party', 'troop']) Game_Party.prototype[side + 'Artifacts'] = function() {
        const items = [];
        for (const id of api.artifactIDs[side + 'ArtifactIDs']) {
            const item = $dataArmors[id];
            if (!item || !this.hasItem(item)) continue;
            const count = DataManager.isStackableArtifact(item) ? this.numItems(item) : 1;
            for (let index = 0; index < count; index++) items.push(item);
        }
        return items;
    };
    Game_Party.prototype.artifacts = function() { return this.partyArtifacts().concat(this.troopArtifacts()); };
    const canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item) { return !DataManager.isArtifact(item) && canEquip.call(this, item); };
    const equips = Game_Actor.prototype.equips;
    Game_Actor.prototype.equips = function() {
        const result = equips.call(this);
        return this._allowArtifactTraitObjects || this._allowArtifactParamBase ? result.concat($gameParty.partyArtifacts()) : result;
    };
    const traits = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        this._allowArtifactTraitObjects = true;
        try { return traits.call(this); }
        finally { this._allowArtifactTraitObjects = undefined; }
    };
    const param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(id) {
        this._allowArtifactParamBase = true;
        try { return param.call(this, id); }
        finally { this._allowArtifactParamBase = undefined; }
    };
    const plus = Game_BattlerBase.prototype.paramPlus;
    Game_BattlerBase.prototype.paramPlus = function(id) {
        let value = plus.call(this, id);
        if (this.constructor === Game_Enemy) for (const item of $gameParty.troopArtifacts()) value += item.params[id];
        return value;
    };
    const enemyTraits = Game_Enemy.prototype.traitObjects;
    Game_Enemy.prototype.traitObjects = function() { return enemyTraits.call(this).concat($gameParty.troopArtifacts()); };
    const gain = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        gain.call(this, item, amount, includeEquip);
        if (!DataManager.isArtifact(item)) return;
        const recipients = this.allMembers().concat(this.inBattle() ? $gameTroop.members() : []);
        for (const actor of recipients) if (actor) actor._cache = {};
    };
    Game_Party.prototype.removeBattleTestArtifacts = function() {
        for (const item of this.armors()) if (DataManager.isArtifact(item)) this.loseItem(item, this.numItems(item));
    };
    const testItems = Game_Party.prototype.setupBattleTestItems;
    Game_Party.prototype.setupBattleTestItems = function() { testItems.call(this); this.removeBattleTestArtifacts(); };
}

function installItemsCurses(api) {
    for (const [kind, field, database] of [['Weapon', '_weaponIDs', () => $dataWeapons], ['Armor', '_armorIDs', () => $dataArmors]]) {
        DataManager['get' + kind + 'IdWithName'] = function(name) {
            const wanted = name.toUpperCase().trim();
            const cache = this[field] = this[field] || Object.create(null);
            if (cache[wanted]) return cache[wanted];
            for (const item of database()) if (item) cache[item.name.toUpperCase().trim()] = item.id;
            return cache[wanted] || 0;
        };
    }
    DataManager.isCursedItem = function(item) {
        if (!this.isWeapon(item) && !this.isArmor(item)) return false;
        if (Imported.VisuMZ_2_WeaponSwapSystem && this.isWeapon(item)) return false;
        return item.note ? item.note.match(/<CURSED>/i) : false;
    };
    DataManager.getPurifyTransformation = function(item) {
        if (!item || !this.isWeapon(item) && !this.isArmor(item)) return item;
        const match = /<PURIFY TRANSFORM: (.*)>/i.exec(item.note || '');
        if (!match) return item;
        const target = match[1].trim(), weapon = this.isWeapon(item);
        const id = /^\d+$/.test(target) ? Number(target) : this[weapon ? 'getWeaponIdWithName' : 'getArmorIdWithName'](target);
        return (weapon ? $dataWeapons : $dataArmors)[id];
    };
    api.CheckCursedItemMsg = function(item) {
        return !!item && Imported.VisuMZ_0_CoreEngine && VisuMZ.CoreEngine.version >= 1.79 && DataManager.isCursedItem(item);
    };
    const changeOk = Game_Actor.prototype.isEquipChangeOk;
    Game_Actor.prototype.isEquipChangeOk = function(slot) {
        if (!this._equips[slot]) this._equips[slot] = new Game_Item();
        return !DataManager.isCursedItem(this._equips[slot].object()) && changeOk.call(this, slot);
    };
    Game_Actor.prototype.isPurifyItemSwapOk = function(item, target) {
        if (item === target) return false;
        if (!target) throw new CoreError('IE_PURIFY_TARGET', 'Purify Transform must name an existing object of the same database kind.');
        if (!DataManager.getEtypeIDs(target).includes(item.etypeId)) return false;
        if (DataManager.isWeapon(target)) return this.isEquipWtypeOk(target.wtypeId);
        return DataManager.isArmor(target) && this.isEquipAtypeOk(target.atypeId);
    };
    Game_Actor.prototype.purifyCursedEquips = function() {
        for (let slot = 0; slot < this.equipSlots().length; slot++) {
            const item = this._equips[slot] && this._equips[slot].object();
            if (!DataManager.isCursedItem(item)) continue;
            const target = DataManager.getPurifyTransformation(item);
            if (this.isPurifyItemSwapOk(item, target)) {
                this._equips[slot].setObject(target);
                this.refresh();
            } else this.changeEquip(slot, null);
        }
    };
    Game_Party.prototype.purifyCursedEquips = function() {
        for (const actor of this.allMembers()) if (actor) actor.purifyCursedEquips();
    };
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, 'PurifyActors', args => {
            if ($gameParty.inBattle()) return;
            for (const id of JSON.parse(args['Actors:arraynum'] || '[]')) {
                const actor = $gameActors.actor(Number(id));
                if (actor) actor.purifyCursedEquips();
            }
        });
        PluginManager.registerCommand(receiver, 'PurifyParty', () => {
            if (!$gameParty.inBattle()) $gameParty.purifyCursedEquips();
        });
    }
}

function itemShopFixedPrice(note, heading, fallback) {
    const match = new RegExp('<' + heading + ': (\\d+)>', 'i').exec(note || '');
    return match ? Number(match[1]) : fallback;
}

function itemShopSwitches(note, heading) {
    const match = new RegExp('<' + heading + ' SWITCH(?:|ES): (.*)>', 'i').exec(note || '');
    return match ? match[1].split(',').map(Number) : null;
}

function itemShopVisible(note, value) {
    for (const [prefix, mode, hide] of [['SHOW SHOP (?:ALL |)', 'all', false], ['SHOW SHOP ANY ', 'any', false], ['HIDE SHOP (?:ALL |)', 'all', true], ['HIDE SHOP ANY ', 'any', true]]) {
        const match = new RegExp('<' + prefix + 'SWITCH(?:|ES): (.*)>', 'i').exec(note || '');
        if (!match) continue;
        const ids = match[1].split(',').map(Number), passes = mode === 'all' ? ids.every(value) : ids.some(value);
        if (hide ? passes : !passes) return false;
    }
    return true;
}

function itemShopSellable(note, value, nativeEnabled) {
    if (/<CANNOT SELL>/i.test(note || '')) return false;
    if (/<CAN SELL>/i.test(note || '')) return true;
    for (const mode of ['', ' ALL', ' ANY']) {
        const match = new RegExp('<CANNOT SELL' + mode + ' (?:SW|SWITCH|SWITCHES): *(\\d+(?:\\s*,\\s*\\d+)*)>', 'i').exec(note || '');
        if (!match) continue;
        const ids = match[1].match(/\d+/g).map(Number);
        if (mode === ' ANY' ? ids.some(value) : ids.some(id => !value(id))) return false;
    }
    return nativeEnabled;
}

function itemShopIncluded(item, blacklist, whitelist) {
    if (!item.name.trim() || /-----/.test(item.name)) return false;
    if (blacklist.some(category => category && item.categories.includes(category))) return false;
    return whitelist.length === 0 || whitelist.some(category => category && item.categories.includes(category));
}

function installItemsShop(api) {
    const settings = api.settings.ShopScene;
    settings.BuyPriceJS = new Function(settings.BuyPriceJS);
    settings.SellPriceJS = new Function(settings.SellPriceJS);
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        for (const database of [$dataItems, $dataWeapons, $dataArmors]) for (const item of database) {
            if (item) item.price = itemShopFixedPrice(item.note, 'PRICE', item.price);
        }
    };
    SceneManager.isSceneShop = function() { return this._scene && this._scene.constructor === Scene_Shop; };
    const prepare = Scene_Shop.prototype.prepare;
    Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
        prepare.call(this, JSON.parse(JSON.stringify(goods)), purchaseOnly);
        this.adjustHiddenShownGoods();
    };
    Scene_Shop.prototype.isGoodShown = function(goods) {
        return goods[0] >= 0 && goods[0] <= 2 && !![$dataItems, $dataWeapons, $dataArmors][goods[0]][goods[1]];
    };
    Scene_Shop.prototype.adjustHiddenShownGoods = function() {
        this._goods = this._goods.filter(goods => this.isGoodShown(goods));
        this._goodsCount = this._goods.length;
    };
    const goodsToItem = Window_ShopBuy.prototype.goodsToItem;
    Window_ShopBuy.prototype.goodsToItem = function(goods) {
        const item = goodsToItem.call(this, goods);
        return item && !this.meetsShopListingConditions(item) ? null : item;
    };
    Window_ShopBuy.prototype.meetsShopListingConditions = function(item) {
        return !!item && itemShopVisible(item.note, id => $gameSwitches.value(id));
    };
    Window_ShopBuy.prototype.updateMoneyAmount = function() {
        if (SceneManager.isSceneShop()) this._money = SceneManager._scene.money();
    };
    const refresh = Window_ShopBuy.prototype.refresh;
    Window_ShopBuy.prototype.refresh = function() { this.updateMoneyAmount(); refresh.call(this); };
    const evaluatePrice = new Function('source', 'return eval(source);');
    function notePrice(receiver, item, price, side) {
        const match = new RegExp('<JS ' + side + ' PRICE>\\s*([\\s\\S]*)\\s*</JS ' + side + ' PRICE>', 'i').exec(item.note || '');
        if (!match) return null;
        window.item = item;
        window.price = price;
        try { evaluatePrice.call(receiver, match[1]); }
        catch (error) { if ($gameTemp.isPlaytest()) console.log(error); }
        const result = window.price;
        window.item = undefined;
        window.price = undefined;
        return {value: result};
    }
    Window_ShopBuy.prototype.modifiedBuyPriceItemsEquipsCore = function(item, price) {
        const note = notePrice(this, item, price, 'BUY');
        if (note) price = note.value;
        price = settings.BuyPriceJS.call(this, item, price);
        return Math.floor(isNaN(price) ? 0 : price);
    };
    const price = Window_ShopBuy.prototype.price;
    Window_ShopBuy.prototype.price = function(item) {
        return item ? Math.max(0, this.modifiedBuyPriceItemsEquipsCore(item, price.call(this, item))) : 0;
    };
    Scene_Shop.prototype.sellPriceRate = function() { return settings.SellPriceRate; };
    Scene_Shop.prototype.baseSellingPrice = function() { return this._item.price * this.sellPriceRate(); };
    Scene_Shop.prototype.determineBaseSellingPrice = function() {
        const price = this._item.price;
        const note = notePrice(this, this._item, price * this.sellPriceRate(), 'SELL');
        if (note) return Math.floor(isNaN(note.value) ? 0 : note.value);
        return itemShopFixedPrice(this._item.note, 'SELL PRICE', Math.floor(this.baseSellingPrice()));
    };
    Scene_Shop.prototype.sellingPrice = function() { return settings.SellPriceJS.call(this, this._item, this.determineBaseSellingPrice()); };
    Scene_Shop.prototype.sellPriceOfItem = function(item) {
        const previous = this._item;
        this._item = item;
        const result = this.sellingPrice();
        this._item = previous;
        return result;
    };
    const sellEnabled = Window_ShopSell.prototype.isEnabled;
    Window_ShopSell.prototype.isEnabled = function(item) {
        return !!item && itemShopSellable(item.note, id => $gameSwitches.value(id), sellEnabled.call(this, item));
    };

    Game_Party.prototype.initShopTrackingData = function() { this._shopTrackingData = {buy: {gold: 0, items: {}}, sell: {gold: 0, items: {}}}; };
    Game_Party.prototype.getShopTrackingData = function() {
        if (this._shopTrackingData === undefined) this.initShopTrackingData();
        return this._shopTrackingData;
    };
    Game_Party.prototype.getShopTrackingItem = function(side, item) {
        if (!item) return 0;
        const data = this.getShopTrackingData()[side];
        if (!data) return 0;
        if (item === 'gold') return data.gold = data.gold || 0;
        const key = itemsObjectKey(item);
        return key === undefined ? 0 : data.items[key] = data.items[key] || 0;
    };
    Game_Party.prototype.addShopTrackingItem = function(side, item, amount) {
        if (!item || amount <= 0) return;
        const data = this.getShopTrackingData()[side];
        if (!data) return;
        if (item === 'gold') { data.gold = (data.gold || 0) + amount; return; }
        const key = itemsObjectKey(item);
        if (key !== undefined) data.items[key] = (data.items[key] || 0) + amount;
    };
    for (const [suffix, side] of [['Buy', 'buy'], ['Sell', 'sell']]) {
        Game_Party.prototype['getShopTrackingItem' + suffix] = function(item) { return this.getShopTrackingItem(side, item); };
        Game_Party.prototype['getShopTrackingGold' + suffix] = function() { return this.getShopTrackingItem(side, 'gold'); };
        Game_Party.prototype['addShopTrackingItem' + suffix] = function(item, amount) { this.addShopTrackingItem(side, item, amount); };
        Game_Party.prototype['addShopTrackingGold' + suffix] = function(amount) { this.addShopTrackingItem(side, 'gold', amount); };
        Scene_Shop.prototype['processShopCondListingOn' + suffix + 'Item'] = function(item, number) {
            if (!item || !number) return;
            for (const [state, enabled] of [['ON', true], ['OFF', false]]) {
                const ids = itemShopSwitches(item.note, side.toUpperCase() + ' TURN ' + state);
                if (ids) for (const id of ids) $gameSwitches.setValue(id, enabled);
            }
        };
        Scene_Shop.prototype['on' + suffix + 'Item'] = function(item, number) {
            this['processShopCondListingOn' + suffix + 'Item'](item, number);
            $gameParty['addShopTrackingItem' + suffix](item, number);
            $gameParty['addShopTrackingGold' + suffix](number * this[side === 'buy' ? 'buyingPrice' : 'sellingPrice']());
        };
        const transaction = Scene_Shop.prototype['do' + suffix];
        Scene_Shop.prototype['do' + suffix] = function(number) {
            transaction.call(this, number);
            this['on' + suffix + 'Item'](this._item, number);
            if (number <= 0) return;
            // Version 1.61 gates both transaction flags on SwitchBuy, including a sale.
            if (settings.SwitchBuy) $gameSwitches.setValue(settings['Switch' + suffix], true);
            this._buyWindow.refresh();
            this._sellWindow.refresh();
        };
    }
    Scene_Shop.prototype.resetShopSwitches = function() {
        if (!SceneManager.isSceneShop()) return;
        if (settings.SwitchBuy) $gameSwitches.setValue(settings.SwitchBuy, false);
        if (settings.SwitchSell) $gameSwitches.setValue(settings.SwitchSell, false);
    };
    const create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() { create.call(this); this.resetShopSwitches(); };
    Window_ShopCommand.prototype.maxCols = function() { return this._list ? this._list.length : 3; };
    Window_ShopCommand.prototype.hideDisabledCommands = function() { return settings.CmdHideDisabled; };
    Window_ShopCommand.prototype.commandStyle = function() { return settings.CmdStyle; };
    Window_ShopCommand.prototype.isBuyCommandEnabled = function() { return !SceneManager.isSceneShop() || SceneManager._scene._goodsCount > 0; };
    Window_ShopCommand.prototype.isSellCommandEnabled = function() { return !this._purchaseOnly; };
    for (const [suffix, symbol] of [['Buy', 'buy'], ['Sell', 'sell'], ['Cancel', 'cancel']]) {
        Window_ShopCommand.prototype['add' + suffix + 'Command'] = function() {
            const enabled = suffix === 'Cancel' || this['is' + suffix + 'CommandEnabled']();
            if (!enabled && this.hideDisabledCommands()) return;
            const text = suffix === 'Cancel' ? settings.CmdCancelRename : TextManager[symbol];
            const name = this.commandStyle() === 'text' ? text : '\\I[' + settings['CmdIcon' + suffix] + ']' + text;
            this.addCommand(name, symbol, enabled);
        };
    }
    Window_ShopCommand.prototype.makeCommandList = function() { this.addBuyCommand(); this.addSellCommand(); this.addCancelCommand(); };
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) PluginManager.registerCommand(receiver, 'BatchShop', args => {
        const blacklist = JSON.parse(args['Blacklist:arraystr'] || '[]').map(value => value.toUpperCase().trim());
        const whitelist = JSON.parse(args['Whitelist:arraystr'] || '[]').map(value => value.toUpperCase().trim());
        const goods = [];
        for (const [index, database] of [$dataItems, $dataWeapons, $dataArmors].entries()) {
            const start = Number(args['Step' + (index + 1) + 'Start:num'] || 1), end = Number(args['Step' + (index + 1) + 'End:num'] || 4);
            for (let id = Math.min(start, end); id <= Math.max(start, end); id++) {
                const item = database[id];
                if (item && itemShopIncluded(item, blacklist, whitelist)) goods.push([index, id, 0, item.price]);
            }
        }
        SceneManager.push(Scene_Shop);
        SceneManager.prepareNextScene(goods, args['PurchaseOnly:eval'] === 'true');
    });
}

function installItemsStatusWindow(api) {
    const settings = api.settings.StatusWindow;
    for (const key of ['DrawItemData', 'DrawEquipData', 'DrawEquipClassicData', 'DrawEquipDoubleData']) settings[key] = new Function(settings[key]);
    const proto = Window_ShopStatus.prototype;
    Scene_Shop.prototype.statusWidth = function() { return settings.Width; };
    ColorManager.getItemsEquipsCoreBackColor1 = function() { return this.getColor(settings.BackRectColor === undefined ? 19 : settings.BackRectColor); };
    proto.translucentOpacity = function() { return settings.Translucent; };
    proto.drawItemDarkRect = function(x, y, width, height, repeats) {
        if (settings.DrawBackRect === false) return;
        for (let count = Math.max(repeats || 1, 1); count > 0; count--) {
            this.contentsBack.paintOpacity = 160;
            this.contentsBack.fillRect(x + 1, y + 1, width - 2, (height || this.lineHeight()) - 2, ColorManager.getItemsEquipsCoreBackColor1());
            this.contentsBack.paintOpacity = 255;
        }
    };
    proto.refresh = function() {
        this.contents.clear();
        this.contentsBack.clear();
        if (!this._item) return;
        this.resetFontSettings();
        this.changePaintOpacity(true);
        this.prepareItemCustomData();
        if (this.isEquipItem()) this.drawEquipData();
        else this.drawItemData();
        this.drawCustomShopGraphic();
    };
    const setItem = proto.setItem;
    proto.setItem = function(item) {
        if (DataManager.isWeapon(item) || DataManager.isArmor(item)) this.setItemDelay(item);
        else setItem.call(this, item);
    };
    Window_ShopStatus.EQUIP_DELAY_MS = settings.EquipDelayMS;
    proto.setItemDelay = function(item) { this._item = item; setTimeout(this.refreshDelay.bind(this, item), Window_ShopStatus.EQUIP_DELAY_MS); };
    proto.refreshDelay = function(item) { if (this._item === item) this.refresh(); };
    proto.loadFaceImages = function() {
        Window_StatusBase.prototype.loadFaceImages.call(this);
        for (const actor of $gameParty.members()) ImageManager.loadCharacter(actor.characterName());
    };
    proto.drawItemData = function() { settings.DrawItemData.call(this); };
    proto.drawEquipData = function() {
        const style = this.getEquipDataStyle();
        if (style === 'compare') this.drawEquipDataCompare();
        else if (style === 'double') this.drawEquipDataDouble();
        else this.drawEquipDataClassic();
    };
    proto.getEquipDataStyle = function() {
        const match = this._item && /<STATUS STYLE: (.*)>/i.exec(this._item.note || '');
        return match ? match[1].toLowerCase().trim() : settings.EquipDataStyle ?? 'compare';
    };
    proto.drawEquipDataCompare = function() { this._tempActor = null; settings.DrawEquipData.call(this); };
    proto.drawEquipDataClassic = function() { this._tempActor = null; settings.DrawEquipClassicData.call(this); };
    proto.drawEquipDataDouble = function() { this._tempActor = null; settings.DrawEquipDoubleData.call(this); };
    proto.prepareItemCustomData = function() {
        this._customItemInfo = {};
        const block = this._item && /<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i.exec(this._item.note);
        if (block) for (const line of block[1].split(/[\r\n]+/)) {
            const entry = /(.*): (.*)/i.exec(line);
            if (entry) this._customItemInfo[entry[1].toUpperCase().trim()] = entry[2].trim();
        }
    };
    proto.itemDataFontSize = function() { return Math.max(1, $gameSystem.mainFontSize() - 4); };
    proto.resetFontSettings = function() {
        Window_StatusBase.prototype.resetFontSettings.call(this);
        this.contents.fontSize = this._resetFontSize || this.contents.fontSize;
        this.contents.textColor = this._resetFontColor || this.contents.textColor;
    };
    proto.fontSizeRatio = function() { return this.contents.fontSize / $gameSystem.mainFontSize(); };
    proto.drawIcon = function(icon, x, y) {
        const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
        this.contents.blt(ImageManager.loadSystem('IconSet'), icon % 16 * width, Math.floor(icon / 16) * height, width, height, x, y,
            Math.ceil(width * this.fontSizeRatio()), Math.ceil(height * this.fontSizeRatio()));
    };
    proto.processDrawIcon = function(icon, state) {
        const width = ImageManager.standardIconWidth || 32, height = ImageManager.standardIconHeight || 32;
        if (state.drawing) {
            const x = state.x + Math.ceil(Math.floor((width - ImageManager.iconWidth) / 2) * this.fontSizeRatio()) + 2;
            const offsetY = this.lineHeight() === 36 ? 2 : Math.floor((this.lineHeight() - height) / 2);
            const y = state.y + Math.ceil(Math.floor((height - ImageManager.iconHeight) / 2) * this.fontSizeRatio()) + offsetY;
            this.drawIcon(icon, x, y);
        }
        state.x += Math.ceil(width * this.fontSizeRatio()) + Math.ceil(4 * this.fontSizeRatio());
    };
    proto.drawItemKeyData = function(text, x, y, width, systemColor, align) {
        text = text || '';
        this._resetFontSize = this.itemDataFontSize();
        this._resetFontColor = systemColor ? ColorManager.systemColor() : this.contents.textColor;
        x += this.itemPadding();
        width -= this.itemPadding() * 2;
        const size = this.textSizeEx(text);
        if (align === 'center') x += Math.floor((width - size.width) / 2);
        else if (align === 'right') x += width - size.width;
        this.drawTextEx(text, x, y + (this.lineHeight() - size.height) / 2, width);
        this._resetFontSize = this._resetFontColor = undefined;
        this.resetFontSettings();
    };
    proto.drawItemCustomEntryLine = function(label, text, x, y, width) {
        this.drawItemKeyData(label, x, y, width, true);
        this.drawItemKeyData(text, x, y, width, false, 'right');
        this.drawItemDarkRect(x, y, width);
        this.resetFontSettings();
    };
    proto.drawItemCustomEntries = function(x, y, width) {
        const block = /<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i.exec(this._item.note);
        if (block) for (const line of block[1].split(/[\r\n]+/)) {
            const entry = /(.*): (.*)/i.exec(line);
            if (!entry) continue;
            this.drawItemCustomEntryLine(entry[1].trim(), entry[2].trim(), x, y, width);
            y += this.lineHeight();
        }
        this.resetFontSettings();
        return y;
    };
    proto.getItemQuantityText = function() { return this._customItemInfo.QUANTITY || api.settings.ItemScene.ItemQuantityFmt.format($gameParty.numItems(this._item)); };
    proto.drawItemQuantity = function(x, y, width) {
        if (!this.isEquipItem() && !DataManager.isItem(this._item)) return false;
        if (DataManager.isKeyItem(this._item) && !$dataSystem.optKeyItemsNumber) this.drawItemKeyData(TextManager.keyItem, x, y, width, true, 'center');
        else {
            this.drawItemKeyData(TextManager.possession, x, y, width, true);
            this.drawItemKeyData(this.getItemQuantityText(), x, y, width, false, 'right');
        }
        this.drawItemDarkRect(x, y, width);
        this.resetFontSettings();
        return true;
    };
    proto.drawItemEquipType = function(x, y, width) {
        if (!this.isEquipItem()) return false;
        this.drawItemKeyData($dataSystem.equipTypes[this._item.etypeId], x, y, width, true);
        this.drawItemDarkRect(x, y, width);
        this.resetFontSettings();
        return true;
    };
    proto.drawItemEquipSubType = function(x, y, width) {
        if (!this.isEquipItem()) return false;
        const weapon = DataManager.isWeapon(this._item);
        const label = weapon ? settings.WeaponType ?? 'Weapon Type' : settings.ArmorType ?? 'Armor Type';
        const value = (weapon ? $dataSystem.weaponTypes[this._item.wtypeId] : $dataSystem.armorTypes[this._item.atypeId]) || settings.NoEquipTypeResult || '-';
        this.drawItemCustomEntryLine(label, value, x, y, width);
        return true;
    };
}

function installItemsStatusPictures() {
    const proto = Window_ShopStatus.prototype;
    proto.drawCustomShopGraphic = function() {
        if (!this._item) return;
        const pattern = /<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME): (.*)>/gi;
        for (const match of (this._item.note || '').matchAll(pattern)) {
            const name = match[1].trim();
            if (!name) continue;
            const bitmap = ImageManager.loadPicture(name);
            bitmap.addLoadListener(this.drawCustomShopGraphicLoad.bind(this, bitmap, this._item));
        }
    };
    proto.drawCustomShopGraphicLoad = function(bitmap, item) {
        if (this._item !== item || !bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;
        const note = item.note || '';
        const target = /<SHOP (?:PICTURE|IMAGE) LAYER: FOREGROUND>/i.test(note) ? this.contents : this.contentsBack;
        const width = /<SHOP (?:PICTURE|IMAGE) MAX WIDTH: (\d+)>/i.exec(note);
        const height = /<SHOP (?:PICTURE|IMAGE) MAX HEIGHT: (\d+)>/i.exec(note);
        const dimensions = /<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS: (\d+), *(\d+)>/i.exec(note);
        const maxWidth = dimensions ? Number(dimensions[1]) : width ? Number(width[1]) : this.innerWidth;
        const maxHeight = dimensions ? Number(dimensions[2]) : height ? Number(height[1]) : this.innerHeight;
        const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
        const drawWidth = Math.floor(bitmap.width * scale), drawHeight = Math.floor(bitmap.height * scale);
        const align = (/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT): (LEFT|CENTER|RIGHT)>/i.exec(note) || [null, 'center'])[1].toLowerCase();
        const position = (/<SHOP (?:PICTURE|IMAGE) POSITION: (TOP|MIDDLE|BOTTOM)>/i.exec(note) || [null, 'middle'])[1].toLowerCase();
        let x = align === 'left' ? 0 : align === 'right' ? this.innerWidth - drawWidth : Math.round((this.innerWidth - drawWidth) / 2);
        let y = position === 'top' ? 0 : position === 'bottom' ? this.innerHeight - drawHeight : Math.round((this.innerHeight - drawHeight) / 2);
        const offsetX = /<SHOP (?:PICTURE|IMAGE) OFFSET X: ([+\-]\d+)>/i.exec(note);
        const offsetY = /<SHOP (?:PICTURE|IMAGE) OFFSET Y: ([+\-]\d+)>/i.exec(note);
        const offset = /<SHOP (?:PICTURE|IMAGE) OFFSET: ([+\-]\d+), *([+\-]\d+)>/i.exec(note);
        x += (offsetX ? Number(offsetX[1]) : 0) + (offset ? Number(offset[1]) : 0);
        y += (offsetY ? Number(offsetY[1]) : 0) + (offset ? Number(offset[2]) : 0);
        const opacity = /<SHOP (?:PICTURE|IMAGE) OPACITY: (\d+)>/i.exec(note);
        const percent = /<SHOP (?:PICTURE|IMAGE) OPACITY: (\d+)[%％]>/i.exec(note);
        target.paintOpacity = opacity ? Number(opacity[1]) : percent ? Math.round(Number(percent[1]) * 0.01 * 255).clamp(0, 255) : 255;
        target.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, drawWidth, drawHeight);
        target.paintOpacity = 255;
    };
}

function installItemsStatusEquipment(api) {
    const settings = api.settings.StatusWindow, proto = Window_ShopStatus.prototype;
    const base = ['MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
    const extra = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
    const special = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
    Game_Actor.prototype.anyEmptyEquipSlotsOfSameEtype = function(item) {
        return !!item && this.equipSlots().some((type, index) => type === item.etypeId && !this.equips()[index]);
    };
    Game_Actor.prototype.getEmptyEquipSlotOfSameEtype = function(item) {
        if (!item) return -1;
        const slots = this.equipSlots(), empty = slots.findIndex((type, index) => type === item.etypeId && !this.equips()[index]);
        return empty >= 0 ? empty : slots.indexOf(item.etypeId);
    };
    proto.equipHasCustomParams = function() { return this._item && /<CUSTOM STATUS PARAM(?:|S|ETERS): (.*)>/i.exec(this._item.note || ''); };
    proto.customEquipParams = function() {
        const match = /<CUSTOM STATUS PARAM(?:|S|ETERS): (.*)>/i.exec(this._item.note);
        return match[1].split(',').map(name => name.toUpperCase().trim()).filter(name => base.includes(name) || extra.includes(name) || special.includes(name));
    };
    proto.actorParams = function() {
        let params = [0, 1, 2, 3, 4, 5, 6, 7];
        if (Imported.VisuMZ_0_CoreEngine) {
            params = VisuMZ.CoreEngine.Settings.Param.ExtDisplayedParams;
            if (this.equipHasCustomParams()) return this.customEquipParams();
            const style = this.getEquipDataStyle(), kind = DataManager.isWeapon(this._item) ? 'Weapon' : DataManager.isArmor(this._item) ? 'Armor' : null;
            if (kind && ['classic', 'double'].includes(style)) params = params.concat(settings[(style === 'classic' ? 'Classic' : 'Double') + kind + 'Parameters'] || []);
        }
        return params.map(name => typeof name === 'number' ? name : name.toUpperCase().trim());
    };
    proto.smallParamFontSize = function() { return settings.ParamChangeFontSize; };
    proto.drawParamName = function(param, x, y, width) {
        this.resetFontSettings(); this.contents.fontSize = this.smallParamFontSize();
        let measured = this.textWidth(TextManager.param(param)) + 4 + x;
        if (Imported.VisuMZ_0_CoreEngine) {
            this.drawParamText(x, y, width, param, true);
            if (VisuMZ.CoreEngine.Settings.Param.DrawIcons) measured += ImageManager.iconWidth + 4;
        } else { this.changeTextColor(ColorManager.systemColor()); this.drawText(TextManager.param(param), x, y, width); }
        this.resetFontSettings();
        return measured;
    };
    proto.needsNewTempActor = function(actor) { return !this._tempActor || this._tempActor.actorId() !== actor.actorId(); };
    proto.createTempActorEquips = function(actor) {
        if (this.needsNewTempActor(actor)) {
            const copy = JsonEx.makeDeepCopy(actor);
            copy._tempActor = true;
            const slot = copy.getEmptyEquipSlotOfSameEtype(this._item);
            if (slot >= 0) copy.forceChangeEquip(slot, this._item);
            this._tempActor = copy;
        }
        return this._tempActor;
    };
    proto.drawActorParamDifference = function(actor, param, x, y, width) {
        x += this.itemPadding(); width -= this.itemPadding() * 2;
        this.contents.fontSize = settings.ParamChangeFontSize;
        this.changePaintOpacity(actor.canEquip(this._item));
        let text;
        if (actor.isEquipped(this._item) && !actor.anyEmptyEquipSlotsOfSameEtype(this._item)) text = settings.AlreadyEquipMarker;
        else if (!actor.canEquip(this._item)) text = settings.CannotEquipMarker;
        else {
            const copy = this.createTempActorEquips(actor);
            const change = Imported.VisuMZ_0_CoreEngine ? copy.paramValueByName(param) - actor.paramValueByName(param) : copy.param(param) - actor.param(param);
            this.changeTextColor(ColorManager.paramchangeTextColor(change));
            text = (change >= 0 ? '+' : '') + (Imported.VisuMZ_0_CoreEngine ? VisuMZ.ConvertNumberToString(change, 0, param) : change);
            if (text === '+0') text = settings.NoChangeMarker;
        }
        this.drawText(text, x, y, width, 'center');
        this.resetFontSettings(); this.changePaintOpacity(true);
    };
    proto.isCustomParameter = function(param) { return !!Imported.VisuMZ_0_CoreEngine && !!VisuMZ.CoreEngine.CustomParamNames[param]; };
    proto.getParamValueClassicCore = function(param) {
        if (this._customItemInfo[param]) return this._customItemInfo[param];
        let value;
        if (base.includes(param)) {
            value = this._item.params[base.indexOf(param)] || 0;
            this.changeTextColor(ColorManager.paramchangeTextColor(value));
            return (value >= 0 ? '+' : '') + String(value);
        }
        if (extra.includes(param)) {
            value = this._item.traits.filter(trait => trait.code === 22 && trait.dataId === extra.indexOf(param)).reduce((sum, trait) => sum + (trait.value || 0), 0);
            this.changeTextColor(ColorManager.paramchangeTextColor(value));
            return (value >= 0 ? '+' : '') + String(value * 100) + '%';
        }
        if (special.includes(param)) {
            value = this._item.traits.filter(trait => trait.code === 23 && trait.dataId === special.indexOf(param)).reduce((product, trait) => product * (trait.value || 0), 1);
            const direction = ['TGR', 'MCR', 'PDR', 'MDR', 'FDR'].includes(param) ? -1 : 1;
            this.changeTextColor(ColorManager.paramchangeTextColor((value - 1) * direction));
            return String(value * 100) + '%';
        }
        return '';
    };
    proto.getParamValueClassicNoCore = function(param) {
        if (this._customItemInfo[base[param] || 'n/a']) return this._customItemInfo[base[param] || 'n/a'];
        const value = Number(this._item.params[param] || 0);
        this.changeTextColor(ColorManager.paramchangeTextColor(value));
        return (value >= 0 ? '+' : '') + String(value);
    };
    proto.drawActorParamClassic = function(param, x, y, width) {
        this.drawItemKeyData(TextManager.param(param), x, y, width, true);
        const text = Imported.VisuMZ_0_CoreEngine ? this.getParamValueClassicCore(param) : this.getParamValueClassicNoCore(param);
        this.drawItemKeyData(text, x, y, width, false, 'right');
        this.drawItemDarkRect(x, y, width);
    };
}

function installItemsStatusData(api) {
    const settings = api.settings.StatusWindow, proto = Window_ShopStatus.prototype;
    function pair(window, label, text, x, y, width, color) {
        window.drawItemKeyData(label, x, y, width, true);
        if (color) window.changeTextColor(color);
        window.drawItemKeyData(text, x, y, width, false, 'right');
        window.drawItemDarkRect(x, y, width);
        window.resetFontSettings();
        return true;
    }
    proto.getItemConsumableLabel = function() { return settings.LabelConsume; };
    proto.canConsumeItem = function() {
        return !(VisuMZ.CoreEngine?.Settings.QoL.KeyItemProtect && DataManager.isKeyItem(this._item)) && this._item.consumable;
    };
    proto.getItemConsumableText = function() { return this._customItemInfo.CONSUMABLE || (this.canConsumeItem() ? settings.Consumable : settings.NotConsumable); };
    proto.drawItemConsumable = function(x, y, width) {
        return DataManager.isItem(this._item) && pair(this, this.getItemConsumableLabel(), this.getItemConsumableText(), x, y, width);
    };
    proto.getItemOccasionText = function() { return this._customItemInfo.OCCASION || settings['Occasion' + this._item.occasion]; };
    proto.getItemScopeText = function() {
        if (this._customItemInfo.SCOPE) return this._customItemInfo.SCOPE;
        const target = Imported.VisuMZ_1_BattleCore && /<TARGET: (.*)>/i.exec(this._item.note);
        if (target) {
            for (const [pattern, key] of [[/(\d+) RANDOM ANY/i, 'ScopeRandomAny'], [/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i, 'ScopeRandomEnemies'], [/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i, 'ScopeRandomAllies']]) {
                const match = pattern.exec(target[1]);
                if (match) return settings[key].format(Number(match[1]));
            }
            if (/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i.test(target[1])) return settings.ScopeAlliesButUser;
            if (/ALLY OR ENEMY/i.test(target[1])) return settings.ScopeAllyOrEnemy || settings.Scope7;
            if (/ENEMY OR ALLY/i.test(target[1])) return settings.ScopeEnemyOrAlly || settings.Scope1;
        }
        return settings['Scope' + this._item.scope];
    };
    for (const name of ['Occasion', 'Scope']) proto['drawItem' + name] = function(x, y, width) {
        this.drawItemKeyData(this['getItem' + name + 'Text'](), x, y, width, false, 'center');
        this.drawItemDarkRect(x, y, width); this.resetFontSettings();
        return true;
    };
    proto.getItemSpeedText = function() {
        if (this._customItemInfo.SPEED) return this._customItemInfo.SPEED;
        const value = this._item.speed;
        return settings[value >= 2000 ? 'Speed2000' : value >= 1000 ? 'Speed1000' : value > 0 ? 'Speed1' : value === 0 ? 'Speed0' : value > -1000 ? 'SpeedNeg999' : value > -2000 ? 'SpeedNeg1999' : 'SpeedNeg2000'];
    };
    proto.getItemSuccessRateText = function() {
        if (this._customItemInfo['SUCCESS RATE']) return this._customItemInfo['SUCCESS RATE'];
        if (Imported.VisuMZ_1_BattleCore) {
            if (/<ALWAYS HIT>/i.test(this._item.note)) return '100%';
            const match = /<ALWAYS HIT RATE: (\d+)[%％]>/i.exec(this._item.note);
            if (match) return Number(match[1]) + '%';
        }
        return this._item.successRate + '%';
    };
    proto.getItemRepeatsText = function() { return this._customItemInfo.REPEAT || '×' + this._item.repeats; };
    proto.getItemHitTypeText = function() {
        if (this._customItemInfo['HIT TYPE']) return this._customItemInfo['HIT TYPE'];
        return DataManager.isToggleSkill && DataManager.isToggleSkill(this._item) ? TextManager.toggleType : settings['HitType' + this._item.hitType];
    };
    for (const name of ['Speed', 'SuccessRate', 'Repeats', 'HitType']) {
        proto['getItem' + name + 'Label'] = function() { return settings['Label' + name]; };
        proto['drawItem' + name] = function(x, y, width) { return pair(this, this['getItem' + name + 'Label'](), this['getItem' + name + 'Text'](), x, y, width); };
    }
    proto.getItemEffects = function() { return this._item.effects; };
    proto.makeItemData = function() {
        const data = this._itemData = {rateHP: 0, flatHP: 0, rateMP: 0, flatMP: 0, gainTP: 0, selfTP: 0, addState: [], removeState: [], changeBuff: [0,0,0,0,0,0,0,0], removeBuff: [], removeDebuff: [], addStateBuffChanges: false, removeStateBuffChanges: false};
        let found = false;
        for (const effect of this.getItemEffects()) {
            switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP: data.rateHP += effect.value1; data.flatHP += effect.value2; break;
            case Game_Action.EFFECT_RECOVER_MP: data.rateMP += effect.value1; data.flatMP += effect.value2; break;
            case Game_Action.EFFECT_GAIN_TP: data.gainTP += effect.value1; break;
            case Game_Action.EFFECT_ADD_STATE: data.addState.push(effect.dataId); break;
            case Game_Action.EFFECT_REMOVE_STATE: data.removeState.push(effect.dataId); data.removeStateBuffChanges = true; break;
            case Game_Action.EFFECT_ADD_BUFF: data.changeBuff[effect.dataId]++; break;
            case Game_Action.EFFECT_ADD_DEBUFF: data.changeBuff[effect.dataId]--; break;
            case Game_Action.EFFECT_REMOVE_BUFF: data.removeBuff.push(effect.dataId); data.removeStateBuffChanges = true; break;
            case Game_Action.EFFECT_REMOVE_DEBUFF: data.removeDebuff.push(effect.dataId); data.removeStateBuffChanges = true; break;
            default: continue;
            }
            found = true;
        }
        data.addStateBuffChanges = data.addState.length > 0 || data.changeBuff.some(value => value !== 0);
        if (this._item.tpGain !== 0) { data.selfTP = this._item.tpGain; found = true; }
        return found || ['HP RECOVERY','MP RECOVERY','TP RECOVERY','HP DAMAGE','MP DAMAGE','TP DAMAGE','USER TP GAIN','ADDED EFFECTS','REMOVED EFFECTS'].some(key => this._customItemInfo[key]);
    };
    for (const [resource, suffix, colorRecovery, colorDamage] of [['HP', 'Hp', 1, 0], ['MP', 'Mp', 3, 2]]) {
        for (const [kind, positive, color] of [['Recovery', true, colorRecovery], ['Damage', false, colorDamage]]) {
            const key = resource + ' ' + kind.toUpperCase(), method = 'ItemEffects' + suffix + kind;
            proto['get' + method + 'Label'] = function() { return settings['Label' + (positive ? 'Recover' : 'Damage') + resource].format(TextManager[resource.toLowerCase()]); };
            proto['get' + method + 'Text'] = function() {
                if (this._customItemInfo[key]) return this._customItemInfo[key];
                const rate = this._itemData['rate' + resource], flat = this._itemData['flat' + resource], values = [];
                if (positive ? rate > 0 : rate < 0) values.push((positive ? '+' : '') + Math.floor(rate * 100) + '%');
                if (positive ? flat > 0 : flat < 0) values.push((positive ? '+' : '') + flat);
                return values.join(' ');
            };
            proto['draw' + method] = function(x, y, width) {
                const rate = this._itemData['rate' + resource], flat = this._itemData['flat' + resource];
                if (!this._customItemInfo[key] && (positive ? rate <= 0 && flat <= 0 : rate >= 0 && flat >= 0)) return false;
                return pair(this, this['get' + method + 'Label'](), this['get' + method + 'Text'](), x, y, width, ColorManager.damageColor(color));
            };
        }
    }
    for (const [suffix, key, field, label] of [['TpRecovery', 'TP RECOVERY', 'gainTP', 'LabelRecoverTP'], ['TpDamage', 'TP DAMAGE', 'gainTP', 'LabelDamageTP'], ['SelfTpGain', 'USER TP GAIN', 'selfTP', 'LabelSelfGainTP']]) {
        const method = 'ItemEffects' + suffix;
        proto['get' + method + 'Label'] = function() { return settings[label].format(TextManager.tp); };
        proto['get' + method + 'Text'] = function() { const value = this._itemData[field]; return this._customItemInfo[key] || (suffix === 'TpRecovery' || suffix === 'SelfTpGain' && value > 0 ? '+' : '') + value; };
        proto['draw' + method] = function(x, y, width) {
            const value = this._itemData[field];
            if (!this._customItemInfo[key] && (suffix === 'TpRecovery' ? value <= 0 : suffix === 'TpDamage' ? value >= 0 : value === 0)) return false;
            const color = suffix === 'TpRecovery' || suffix === 'SelfTpGain' && value > 0 ? ColorManager.powerUpColor() : ColorManager.powerDownColor();
            return pair(this, this['get' + method + 'Label'](), this['get' + method + 'Text'](), x, y, width, color);
        };
    }
    for (const [kind, added] of [['Added', true], ['Removed', false]]) {
        const method = 'ItemEffects' + kind + 'StatesBuffs', key = added ? 'ADDED EFFECTS' : 'REMOVED EFFECTS';
        proto['get' + method + 'Label'] = function() { return added ? settings.LabelApply : settings.LabelRemove; };
        proto['get' + method + 'Text'] = function() {
            if (this._customItemInfo[key]) return this._customItemInfo[key];
            const data = this._itemData, icons = [];
            for (const id of added ? data.addState : data.removeState) if ($dataStates[id]?.iconIndex > 0) icons.push($dataStates[id].iconIndex);
            if (added) for (const [id, value] of data.changeBuff.entries()) { const icon = Game_BattlerBase.prototype.buffIconIndex(value, id); if (icon > 0) icons.push(icon); }
            else for (const [ids, value] of [[data.removeBuff, 1], [data.removeDebuff, -1]]) for (const id of ids) { const icon = Game_BattlerBase.prototype.buffIconIndex(value, id); if (icon > 0) icons.push(icon); }
            return icons.slice(0, Math.max(1, added ? 8 : settings.MaxIcons)).map(icon => '\\I[' + icon + ']').join('');
        };
        proto['draw' + method] = function(x, y, width) {
            if (!this._itemData[added ? 'addStateBuffChanges' : 'removeStateBuffChanges'] && !this._customItemInfo[key]) return false;
            const text = this['get' + method + 'Text']();
            return text.length > 0 && pair(this, this['get' + method + 'Label'](), text, x, y, width);
        };
    }
    proto.drawItemEffects = function(x, y, width) {
        if (!this.makeItemData()) return y;
        for (const name of ['HpRecovery','MpRecovery','TpRecovery','HpDamage','MpDamage','TpDamage','SelfTpGain','AddedStatesBuffs','RemovedStatesBuffs']) if (this['drawItemEffects' + name](x, y, width)) y += this.lineHeight();
        this.resetFontSettings(); return y;
    };
    proto.getItemDamageElementLabel = function() { return settings.LabelElement; };
    proto.getItemDamageElementText = function() {
        const id = this._item.damage.elementId;
        return this._customItemInfo.ELEMENT || (id <= -1 ? settings.ElementWeapon : id === 0 ? settings.ElementNone : $dataSystem.elements[id]);
    };
    proto.drawItemDamageElement = function(x, y, width) { return pair(this, this.getItemDamageElementLabel(), this.getItemDamageElementText(), x, y, width); };
    proto.getItemDamageAmountLabelOriginal = function() { return settings['DamageType' + this._item.damage.type].format(this._item.damage.type % 2 ? TextManager.hp : TextManager.mp); };
    proto.getItemDamageAmountLabel = function() {
        return Imported.VisuMZ_1_BattleCore && DataManager.getDamageStyle(this._item) !== 'MANUAL' ? this.getItemDamageAmountLabelBattleCore() : this.getItemDamageAmountLabelOriginal();
    };
    VisuMZ.ShopMenuStatusStandard = settings.MultiplierStandard;
    const param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(id) { return this._shopStatusMenuMode ? this._shopStatusMenuAlly ? VisuMZ.ShopMenuStatusStandard : 1 : param.call(this, id); };
    Game_Actor.prototype.setShopStatusWindowMode = function(ally) { this._shopStatusMenuMode = true; this._shopStatusMenuAlly = ally; };
    proto.setupItemDamageTempActors = function() { const actor = $gameActors.actor(1); this._tempActorA = JsonEx.makeDeepCopy(actor); this._tempActorB = JsonEx.makeDeepCopy(actor); };
    proto.revertGlobalNamespaceVariables = function() { window.a = window.b = undefined; };
    const evaluateFormula = new Function('source', 'return eval(source);');
    proto.getItemDamageAmountTextOriginal = function() {
        window.a = this._tempActorA; window.b = this._tempActorB;
        this._tempActorA.setShopStatusWindowMode(true);
        this._tempActorB.setShopStatusWindowMode([3,4].includes(this._item.damage.type));
        try {
            const ratio = Math.max(evaluateFormula.call(this, this._item.damage.formula), 0) / window.a.atk;
            this.revertGlobalNamespaceVariables();
            return isNaN(ratio) ? '?????' : Math.round(ratio * 100) + '%';
        } catch (error) {
            if ($gameTemp.isPlaytest()) { console.log('Damage Formula Error for ' + this._item.name); console.log(error); }
            this.revertGlobalNamespaceVariables(); return '?????';
        }
    };
    proto.getItemDamageAmountText = function() {
        if (this._customItemInfo['DAMAGE MULTIPLIER']) return this._customItemInfo['DAMAGE MULTIPLIER'];
        return Imported.VisuMZ_1_BattleCore && DataManager.getDamageStyle(this._item) !== 'MANUAL' ? this.getItemDamageAmountTextBattleCore() : this.getItemDamageAmountTextOriginal();
    };
    proto.drawItemDamageAmount = function(x, y, width) {
        this.drawItemKeyData(this.getItemDamageAmountLabel(), x, y, width, true);
        this.setupItemDamageTempActors();
        const text = this.getItemDamageAmountText();
        this.changeTextColor(ColorManager.damageColor([0,0,2,1,3,1,3][this._item.damage.type]));
        this.drawItemKeyData(text, x, y, width, false, 'right');
        this.drawItemDarkRect(x, y, width); this.resetFontSettings(); return true;
    };
    proto.drawItemDamage = function(x, y, width) {
        if (this._item.damage.type <= 0) return y;
        if (this.drawItemDamageElement(x, y, width)) y += this.lineHeight();
        if (this.drawItemDamageAmount(x, y, width)) y += this.lineHeight();
        this.resetFontSettings(); return y;
    };
}

function installItemsStatusScene(api) {
    const settings = api.settings.ItemScene;
    settings.ItemMenuStatusRect = new Function(settings.ItemMenuStatusRect);
    Scene_Item.prototype.allowCreateStatusWindow = function() { return !this.isPureVanillaMode() && (settings.EnableLayout || settings.ShowShopStatus); };
    Scene_Item.prototype.adjustItemWidthByStatus = function() { return settings.ItemSceneAdjustItemList; };
    Scene_Item.prototype.statusWidth = function() { return Scene_Shop.prototype.statusWidth(); };
    Scene_Item.prototype.statusWindowRect = function() { return settings.ItemMenuStatusRect.call(this); };
    Scene_Item.prototype.createStatusWindow = function() {
        this._statusWindow = new Window_ShopStatus(this.statusWindowRect());
        this.addWindow(this._statusWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._statusWindow.setBackgroundType(settings.ItemMenuStatusBgType || 0);
    };
    const create = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() { create.call(this); if (this.allowCreateStatusWindow()) this.createStatusWindow(); };
    const rect = Scene_Item.prototype.itemWindowRect;
    Scene_Item.prototype.itemWindowRect = function() {
        const result = rect.call(this);
        if (this.allowCreateStatusWindow() && this.adjustItemWidthByStatus()) result.width -= this.statusWidth();
        return result;
    };
    Window_ItemList.prototype.setStatusWindow = function(window) { this._statusWindow = window; this.callUpdateHelp(); };
    const updateHelp = Window_ItemList.prototype.updateHelp;
    Window_ItemList.prototype.updateHelp = function() {
        updateHelp.call(this);
        if (this._statusWindow?.constructor === Window_ShopStatus) this._statusWindow.setItem(this.item());
    };
}

function installItemsPresentationLayouts(api) {
    function route(proto, name, method) {
        const previous = proto[name];
        proto[name] = function() { return this.isUseItemsEquipsCoreUpdatedLayout() ? this[method]() : previous.apply(this, arguments); };
    }
    for (const [scene, key] of [[Scene_Item, 'ItemScene'], [Scene_Equip, 'EquipScene'], [Scene_Shop, 'ShopScene']]) {
        const proto = scene.prototype, settings = api.settings[key];
        proto.updatedLayoutStyle = function() { return settings.LayoutStyle; };
        proto.isUseItemsEquipsCoreUpdatedLayout = function() { return settings.EnableLayout && !(scene === Scene_Item && this.isPureVanillaMode()); };
        for (const [method, option, pattern] of [['isBottomHelpMode', 'uiHelpPosition', /LOWER/i], ['isRightInputMode', 'uiInputPosition', /RIGHT/i]]) {
            const previous = proto[method];
            proto[method] = function() {
                if (ConfigManager.uiMenuStyle && ConfigManager[option] !== undefined) return ConfigManager[option];
                if (this.isUseItemsEquipsCoreUpdatedLayout()) return this.updatedLayoutStyle().match(pattern);
                // The original Equip/Shop fallback has no return; preserve its falsy layout result.
                return scene === Scene_Item ? previous.call(this) : undefined;
            };
        }
        proto.helpWindowRectItemsEquipsCore = function() { return new Rectangle(0, this.helpAreaTop(), Graphics.boxWidth, this.helpAreaHeight()); };
        route(proto, 'helpWindowRect', 'helpWindowRectItemsEquipsCore');
    }
    const item = Scene_Item.prototype;
    item.categoryWindowRectItemsEquipsCore = function() { return new Rectangle(0, this.mainAreaTop(), Graphics.boxWidth, this.calcWindowHeight(1, true)); };
    item.itemWindowRectItemsEquipsCore = function() {
        const y = this._categoryWindow.y + this._categoryWindow.height;
        return new Rectangle(this.isRightInputMode() ? this.statusWidth() : 0, y, Graphics.boxWidth - this.statusWidth(), this.mainAreaBottom() - y);
    };
    item.statusWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? 0 : Graphics.boxWidth - this.statusWidth(), this._itemWindow.y, this.statusWidth(), this._itemWindow.height); };
    for (const name of ['categoryWindowRect', 'itemWindowRect', 'statusWindowRect']) route(item, name, name + 'ItemsEquipsCore');
    const equip = Scene_Equip.prototype;
    equip.geUpdatedLayoutStatusWidth = function() { return Math.floor(Graphics.boxWidth / 2); };
    equip.statusWidth = function() { return this.isUseItemsEquipsCoreUpdatedLayout() ? this.geUpdatedLayoutStatusWidth() : api.settings.EquipScene.StatusWindowWidth; };
    equip.shouldCommandWindowExist = function() { return api.settings.EquipScene.CommandAddOptimize || api.settings.EquipScene.CommandAddClear; };
    equip.statusWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? 0 : Graphics.boxWidth - this.statusWidth(), this.mainAreaTop(), this.statusWidth(), this.mainAreaHeight()); };
    equip.commandWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? this.statusWidth() : 0, this.mainAreaTop(), Graphics.boxWidth - this.statusWidth(), this.shouldCommandWindowExist() ? this.calcWindowHeight(1, true) : 0); };
    equip.slotWindowRectItemsEquipsCore = function() {
        const command = this.commandWindowRect();
        return new Rectangle(this.isRightInputMode() ? this.statusWidth() : 0, command.y + command.height, Graphics.boxWidth - this.statusWidth(), this.mainAreaHeight() - command.height);
    };
    for (const name of ['statusWindowRect', 'commandWindowRect', 'slotWindowRect']) route(equip, name, name + 'ItemsEquipsCore');
    route(equip, 'itemWindowRect', 'slotWindowRect');
    const shop = Scene_Shop.prototype;
    shop.goldWindowRectItemsEquipsCore = function() { const width = this.mainCommandWidth(); return new Rectangle(this.isRightInputMode() ? 0 : Graphics.boxWidth - width, this.mainAreaTop(), width, this.calcWindowHeight(1, true)); };
    shop.commandWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? this.mainCommandWidth() : 0, this.mainAreaTop(), Graphics.boxWidth - this.mainCommandWidth(), this.calcWindowHeight(1, true)); };
    shop.numberWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? this.statusWidth() : 0, this._commandWindow.y + this._commandWindow.height, Graphics.boxWidth - this.statusWidth(), this.mainAreaHeight() - this._commandWindow.height); };
    shop.buyWindowRectItemsEquipsCore = shop.numberWindowRectItemsEquipsCore;
    shop.statusWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? 0 : Graphics.boxWidth - this.statusWidth(), this._commandWindow.y + this._commandWindow.height, this.statusWidth(), this.mainAreaHeight() - this._commandWindow.height); };
    shop.categoryWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? Graphics.boxWidth - this._commandWindow.width : 0, this._commandWindow.y, this._commandWindow.width, this.calcWindowHeight(1, true)); };
    shop.sellWindowRectItemsEquipsCore = function() { return new Rectangle(this.isRightInputMode() ? this.statusWidth() : 0, this._categoryWindow.y + this._categoryWindow.height, Graphics.boxWidth - this.statusWidth(), this.mainAreaHeight() - this._categoryWindow.height); };
    for (const name of ['goldWindowRect', 'commandWindowRect', 'numberWindowRect', 'buyWindowRect', 'statusWindowRect', 'categoryWindowRect', 'sellWindowRect']) route(shop, name, name + 'ItemsEquipsCore');
    shop.postCreateItemsEquipsCore = function() { this._dummyWindow.hide(); this._buyWindow.show(); this._buyWindow.deselect(); this._statusWindow.show(); };
    const create = shop.create;
    shop.create = function() { create.call(this); if (this.isUseItemsEquipsCoreUpdatedLayout()) this.postCreateItemsEquipsCore(); };
    shop.postCreateSellWindowItemsEquipsCore = function() { this._sellWindow.setStatusWindow(this._statusWindow); };
    const createSell = shop.createSellWindow;
    shop.createSellWindow = function() { createSell.call(this); if (this.isUseItemsEquipsCoreUpdatedLayout()) this.postCreateSellWindowItemsEquipsCore(); };
}

function installItemsEquipStatus(api) {
    const settings = api.settings.EquipScene, proto = Window_EquipStatus.prototype;
    for (const key of ['DrawPortraitJS', 'DrawFaceJS', 'DrawParamJS']) settings[key] = new Function(settings[key]);
    ColorManager.getItemsEquipsCoreBackColor2 = function() { return this.getColor(settings.BackRectColor); };
    proto.isUseItemsEquipsCoreUpdatedLayout = function() { return settings.EnableLayout; };
    const refresh = proto.refresh;
    proto.refresh = function() {
        this.hideAdditionalSprites(); this.resetFontSettings();
        if (this._actor) this._actor.refresh();
        if (this.isUseItemsEquipsCoreUpdatedLayout()) this.prepareRefreshItemsEquipsCoreLayout();
        else refresh.call(this);
    };
    proto.prepareRefreshItemsEquipsCoreLayout = function() {
        this.contents.clear();
        if (!this._actor) return;
        if (this.isMainMenuCoreMenuImageOptionAvailable()) ImageManager.loadPicture(this._actor.getMenuImage()).addLoadListener(this.onMenuImageLoad.bind(this));
        else this.refreshItemsEquipsCoreNoMenuImage();
    };
    proto.isMainMenuCoreMenuImageOptionAvailable = function() { return Imported.VisuMZ_1_MainMenuCore && this._actor.getMenuImage() !== '' && settings.MenuPortraits; };
    proto.onMenuImageLoad = function() {
        if (!this._actor) return;
        settings.DrawPortraitJS.call(this); this.drawParamsItemsEquipsCore();
    };
    proto.refreshItemsEquipsCoreNoMenuImage = function() { settings.DrawFaceJS.call(this); this.drawParamsItemsEquipsCore(); };
    proto.drawParamsItemsEquipsCore = function() { this.resetFontSettings(); settings.DrawParamJS.call(this); };
    proto.drawItemActorMenuImage = function(actor, x, y, width, height) {
        const bitmap = ImageManager.loadPicture(actor.getMenuImage()), difference = this.innerWidth - bitmap.width;
        x += difference / 2;
        if (difference < 0) width -= difference;
        Window_StatusBase.prototype.drawItemActorMenuImage.call(this, actor, x, y, width, height);
    };
    proto.actorParams = function() { return Imported.VisuMZ_0_CoreEngine ? VisuMZ.CoreEngine.Settings.Param.ExtDisplayedParams : [0,1,2,3,4,5,6,7]; };
    proto.paramValueFontSize = function() { return settings.ParamValueFontSize; };
    proto.isUseParamNamesWithIcons = function() { return Imported.VisuMZ_0_CoreEngine && VisuMZ.CoreEngine.Settings.Param.DrawIcons; };
    proto.drawUpdatedParamName = function(param, x, y, width) {
        x += this.itemPadding();
        if (Imported.VisuMZ_0_CoreEngine) this.drawParamText(x, y, width, param, false);
        else { this.changeTextColor(ColorManager.systemColor()); this.drawText(TextManager.param(param), x, y, width); }
    };
    function value(actor, param, formatted) { return Imported.VisuMZ_0_CoreEngine ? actor.paramValueByName(param, formatted) : actor.param(param); }
    proto.drawUpdatedBeforeParamValue = function(param, x, y, width) { this.drawText(value(this._actor, param, true), x, y, width - this.itemPadding(), 'right'); };
    proto.drawUpdatedAfterParamValue = function(param, x, y, width) {
        if (!this._tempActor) return;
        const change = value(this._tempActor, param, false) - value(this._actor, param, false);
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText(value(this._tempActor, param, true), x, y, width - this.itemPadding(), 'right');
    };
    proto.drawUpdatedParamValueDiff = function(param, x, y, width) {
        if (!this._tempActor) return;
        const before = value(this._actor, param, false), after = value(this._tempActor, param, false), change = after - before;
        const percent = Imported.VisuMZ_0_CoreEngine ? /[%％]/.test(String(value(this._actor, param, true))) : before % 1 !== 0 || after % 1 !== 0;
        if (change === 0) return;
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText((change > 0 ? '(+%1)' : '(%1)').format(percent ? Math.round(change * 100) + '%' : change), x + this.itemPadding(), y, width, 'left');
    };
    proto.drawItemDarkRect = function(x, y, width, height, repeats) {
        if (settings.DrawBackRect === false) return;
        for (let count = Math.max(repeats || 1, 1); count > 0; count--) {
            this.contents.paintOpacity = 160;
            this.contents.fillRect(x + 1, y + 1, width - 2, (height || this.lineHeight()) - 2, ColorManager.getItemsEquipsCoreBackColor2());
            this.contents.paintOpacity = 255;
        }
    };
}

function installItemsPresentationCommands(api) {
    for (const [type, key] of [[Window_EquipCommand, 'EquipScene'], [Window_ShopCommand, 'ShopScene']]) {
        const proto = type.prototype, settings = api.settings[key];
        proto.itemTextAlign = function() { return settings.CmdTextAlign; };
        proto.commandStyleCheck = function(index) {
            if (index < 0) return 'text';
            const style = this.commandStyle();
            if (style !== 'auto') return style;
            if (this.maxItems() > 0 && /\\I\[(\d+)\]/i.test(this.commandName(index))) return this.textSizeEx(this.commandName(index)).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
            return 'text';
        };
        proto.drawItem = function(index) {
            const style = this.commandStyleCheck(index);
            if (style === 'iconText') this.drawItemStyleIconText(index);
            else if (style === 'icon') this.drawItemStyleIcon(index);
            else Window_HorzCommand.prototype.drawItem.call(this, index);
        };
        proto.drawItemStyleIconText = Window_ItemCategory.prototype.drawItemStyleIconText;
        proto.drawItemStyleIcon = Window_ItemCategory.prototype.drawItemStyleIcon;
        proto.createCommandNameWindow = function(rect) {
            this._commandNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
            this._commandNameWindow.opacity = 0;
            this.addChild(this._commandNameWindow);
            this.updateCommandNameWindow();
        };
        proto.commandNameWindowDrawText = function(name, rect) { this._commandNameWindow.drawText(name, 0, rect.y, this._commandNameWindow.innerWidth, 'center'); };
        proto.commandNameWindowCenter = function(name, rect) {
            this._commandNameWindow.x = this._commandNameWindow.width / -2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
            this._commandNameWindow.y = Math.floor(rect.height / 2);
        };
        proto.updateCommandNameWindow = function() {
            const window = this._commandNameWindow;
            window.contents.clear();
            if (this.commandStyleCheck(this.index()) !== 'icon') return;
            const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[(\d+)\]/gi, '');
            window.resetFontSettings(); this.commandNameWindowDrawText(name, rect); this.commandNameWindowCenter(name, rect);
        };
        const initialize = proto.initialize;
        proto.initialize = function(rect) { initialize.apply(this, arguments); this.createCommandNameWindow(rect); };
        const help = proto.callUpdateHelp;
        proto.callUpdateHelp = function() { help.call(this); if (this._commandNameWindow) this.updateCommandNameWindow(); };
    }
}

function installItemsListNavigation(api) {
    const category = Window_ItemCategory.prototype, list = Window_ItemList.prototype;
    category.isUseModernControls = function() {
        if (SceneManager._scene?.constructor === Scene_Item && SceneManager._scene.isPureVanillaMode()) return false;
        return !!Imported.VisuMZ_0_CoreEngine && Window_HorzCommand.prototype.isUseModernControls.call(this);
    };
    category.playOkSound = function() { if (!this.isUseModernControls()) Window_HorzCommand.prototype.playOkSound.call(this); };
    category.isHoverEnabled = function() { return !this.isUseModernControls() && Window_HorzCommand.prototype.isHoverEnabled.call(this); };
    // Home/End belongs to the linked list; it must not change both selections.
    category.processCursorHomeEndTrigger = function() {};
    category.processCursorMoveModernControls = function() {
        if (!this.isCursorMovable()) return;
        const before = this.index(), cols = this._itemWindow?.maxCols();
        const right = cols <= 1 ? 'right' : 'pagedown', left = cols <= 1 ? 'left' : 'pageup';
        if (cols > 0 && !(cols > 1 && Input.isPressed('shift'))) {
            if (Input.isRepeated(right)) this.cursorRight(Input.isTriggered(right));
            if (Input.isRepeated(left)) this.cursorLeft(Input.isTriggered(left));
        }
        if (before !== this.index()) this.playCursorSound();
    };
    category.processHandling = function() { if (!this.isUseModernControls()) Window_HorzCommand.prototype.processHandling.call(this); };
    category.processTouchModernControls = function() {
        if (!this.isOpenAndActive()) return;
        if (TouchInput.isTriggered()) this.onTouchSelect(true);
        if (TouchInput.isClicked()) this.onTouchOk();
        else if (TouchInput.isCancelled()) this.onTouchCancel();
    };
    category.onTouchSelect = function(triggered) {
        if (this.isUseModernControls()) this.onTouchSelectModern(true);
        else Window_HorzCommand.prototype.onTouchSelect.call(this, triggered);
    };
    category.onTouchSelectModern = function(triggered) {
        this._doubleTouch = false;
        if (!this.isCursorMovable()) return;
        const before = this.index(), hit = this.hitIndex();
        if (hit >= 0 && hit !== before) this.select(hit);
        if (triggered && this.index() !== before) this.playCursorSound();
    };
    list.setCategory = function(category) {
        if (this._category === category) return;
        this._category = category;
        this.refresh();
        if (this._categoryWindow?.isUseModernControls()) this.smoothSelect(0);
        else this.scrollTo(0, 0);
    };
    const spacing = list.colSpacing;
    list.colSpacing = function() { return this.maxCols() <= 1 ? Window_Selectable.prototype.colSpacing.call(this) : spacing.call(this); };
    for (const action of ['activate', 'deactivate']) list[action] = function() {
        Window_Selectable.prototype[action].call(this);
        if (this._categoryWindow?.isUseModernControls()) this._categoryWindow[action]();
    };
    list.limitedPageUpDownSceneCheck = function() { return [Scene_Item, Scene_Shop].includes(SceneManager._scene?.constructor); };
    list.processCursorMoveModernControls = function() {
        if (!this.isCursorMovable()) return;
        const before = this.index();
        if (this.maxCols() <= 1) {
            if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) this.cursorPagedown();
            if (!this.isHandled('pageup') && Input.isTriggered('pageup')) this.cursorPageup();
        } else {
            if (Input.isRepeated('right')) this.cursorRight(Input.isTriggered('right'));
            if (Input.isRepeated('left')) this.cursorLeft(Input.isTriggered('left'));
            if (!this.limitedPageUpDownSceneCheck() || Input.isPressed('shift')) {
                if (Input.isTriggered('pagedown')) this.cursorPagedown();
                if (Input.isTriggered('pageup')) this.cursorPageup();
            }
        }
        for (const direction of ['down', 'up']) if (Input.isRepeated(direction)) {
            if (Input.isPressed('shift') && this.allowShiftScrolling()) this[direction === 'down' ? 'cursorPagedown' : 'cursorPageup']();
            else this[direction === 'down' ? 'cursorDown' : 'cursorUp'](Input.isTriggered(direction));
        }
        if (Imported.VisuMZ_0_CoreEngine) this.processCursorHomeEndTrigger();
        if (this.index() !== before) this.playCursorSound();
    };
    const columns = list.maxCols;
    list.maxCols = function() {
        const scene = SceneManager._scene;
        if (scene?.constructor === Scene_Item && scene.isPureVanillaMode()) return 2;
        if ([Scene_Battle, Scene_Map].includes(scene?.constructor)) return columns.call(this);
        return api.settings.ItemScene.ListWindowCols;
    };
    for (const type of [Scene_Item, Scene_Shop]) {
        const proto = type.prototype, createCategory = proto.createCategoryWindow;
        proto.isUseModernControls = function() { return this._categoryWindow && this._categoryWindow.isUseModernControls(); };
        proto.postCreateCategoryWindowItemsEquipsCore = function() { delete this._categoryWindow._handlers.ok; delete this._categoryWindow._handlers.cancel; };
        proto.createCategoryWindow = function() { createCategory.call(this); if (this.isUseModernControls()) this.postCreateCategoryWindowItemsEquipsCore(); };
    }
    const item = Scene_Item.prototype, create = item.create, createList = item.createItemWindow;
    item.postCreateItemWindowModernControls = function() { this._itemWindow.setHandler('cancel', this.popScene.bind(this)); };
    item.createItemWindow = function() { createList.call(this); if (this.isUseModernControls()) this.postCreateItemWindowModernControls(); };
    item.create = function() { create.call(this); if (this.isUseModernControls()) this.onCategoryOk(); };
}

function installItemsEquipNavigation(api) {
    const settings = api.settings.EquipScene, command = Window_EquipCommand.prototype, slot = Window_EquipSlot.prototype, scene = Scene_Equip.prototype;
    command.maxCols = function() { return this._list ? this._list.length : 3; };
    command.playOkSound = function() { if (this.currentSymbol() === 'equip') Window_HorzCommand.prototype.playOkSound.call(this); };
    command.actor = function() { return SceneManager._scene?.user ? SceneManager._scene.user() : null; };
    TextManager.ITEMS_EQUIPS_CORE = TextManager.ITEMS_EQUIPS_CORE || {};
    TextManager.ITEMS_EQUIPS_CORE.helpDesc = {equip: settings.equipCmdDesc, optimize: settings.optimizeCmdDesc, clear: settings.clearCmdDesc};
    command.helpDescriptionText = function() { return TextManager.ITEMS_EQUIPS_CORE.helpDesc[this.currentSymbol()] || ''; };
    command.updateHelp = function() { Window_Command.prototype.updateHelp.call(this); this._helpWindow.setText(this.helpDescriptionText()); };
    command.processCursorMoveModernControls = function() {
        if (!this.processCursorSpecialCheckModernControls()) Window_HorzCommand.prototype.processCursorMoveModernControls.call(this);
    };
    command.processCursorSpecialCheckModernControls = function() {
        if (this.isCursorMovable() && SceneManager._scene?.constructor === Scene_Equip && Input.isTriggered('down')) this.processDownCursorSpecialCheckModernControls();
        return false;
    };
    command.processDownCursorSpecialCheckModernControls = function() { this.playCursorSound(); SceneManager._scene.commandEquip(); SceneManager._scene._slotWindow.smoothSelect(-1); };
    slot.isUseModernControls = command.isUseModernControls;
    slot.activate = function() { Window_StatusBase.prototype.activate.call(this); this.callUpdateHelp(); };
    slot.isShiftRemoveShortcutEnabled = function() { return !!this.active && !!settings.ShiftShortcutKey; };
    slot.isShiftShortcutKeyForRemove = function() { return settings.ShiftShortcutKey; };
    slot.canShiftRemoveEquipment = function(index) {
        const actor = SceneManager._scene._actor;
        if (!actor) return;
        return actor.isEquipChangeOk(index) && !actor.nonRemovableEtypes().includes(actor.equipSlots()[index]);
    };
    slot.processShiftRemoveShortcut = function() {
        SoundManager.playEquip();
        SceneManager._scene._actor.changeEquip(this.index(), null);
        this.refresh(); this._itemWindow.refresh(); this.callUpdateHelp();
        if (SceneManager._scene._statusWindow) SceneManager._scene._statusWindow.refresh();
    };
    slot.checkShiftRemoveShortcut = function() {
        if (!this.isShiftRemoveShortcutEnabled() || !Input.isTriggered('shift') || !this.item() || !SceneManager._scene._actor) return;
        if (this.canShiftRemoveEquipment(this.index())) { this.processShiftRemoveShortcut(); this.updateHelp(); }
        else this.playBuzzerSound();
    };
    slot.processCursorMove = function() { Window_StatusBase.prototype.processCursorMove.call(this); this.checkShiftRemoveShortcut(); };
    slot.allowCommandWindowCursorUp = function() { return this.index() === 0 && (settings.CommandAddOptimize || settings.CommandAddClear) && Input.isTriggered('up'); };
    slot.processCursorMoveModernControls = function() { if (!this.processCursorSpecialCheckModernControls()) Window_StatusBase.prototype.processCursorMoveModernControls.call(this); };
    slot.processCursorSpecialCheckModernControls = function() {
        if (!this.isCursorMovable() || SceneManager._scene?.constructor !== Scene_Equip) return false;
        if (this.allowCommandWindowCursorUp()) { this.playCursorSound(); Input.clear(); SceneManager._scene.onSlotCancel(); return false; }
        if (Input.isRepeated('down')) {
            const before = this.index();
            if (Input.isPressed('shift')) this.cursorPagedown(); else this.cursorDown(Input.isTriggered('down'));
            if (this.index() !== before) this.playCursorSound();
            return true;
        }
        return !!this.isShiftShortcutKeyForRemove() && Input.isTriggered('shift');
    };
    for (const [proto, otherKey, isSlot] of [[command, '_slotWindow', false], [slot, '_commandWindow', true]]) {
        proto.processTouchModernControls = function() {
            if (!this.isOpen() || !this.visible || SceneManager._scene?.constructor !== Scene_Equip) return;
            if (this.isHoverEnabled() && TouchInput.isHovered()) this.onTouchSelectModernControls(false);
            else if (TouchInput.isTriggered()) this.onTouchSelectModernControls(true);
            if (TouchInput.isClicked()) this.onTouchOk();
            else if (isSlot && TouchInput.isCancelled()) {
                if (this.isUseModernControls() && this.active && !settings.CommandAddOptimize && !settings.CommandAddClear) { SoundManager.playCancel(); SceneManager.pop(); }
                else this.onTouchCancel();
            }
        };
        proto.onTouchSelectModernControls = function(triggered) {
            this._doubleTouch = false;
            const before = this.index(), hit = this.hitIndex(), other = SceneManager._scene[otherKey];
            if (other.isOpen() && other.visible) {
                if (hit >= 0) {
                    this._doubleTouch = hit === before;
                    this.activate(); this.select(hit);
                    if (isSlot) other.deactivate();
                } else if (other.hitIndex() >= 0) { this.deactivate(); this.deselect(); if (isSlot) other.activate(); }
            }
            if (triggered && this.index() !== before) this.playCursorSound();
        };
    }
    scene.isUseModernControls = function() { return this._commandWindow && this._commandWindow.isUseModernControls(); };
    const create = scene.create, createCommand = scene.createCommandWindow, createSlot = scene.createSlotWindow, equip = scene.commandEquip, slotOk = scene.onSlotOk, slotCancel = scene.onSlotCancel, actorChange = scene.onActorChange;
    scene.create = function() { create.call(this); if (this.isUseModernControls()) this.commandEquip(); };
    scene.createCommandWindow = function() { createCommand.call(this); if (this._helpWindow) this._commandWindow.setHelpWindow(this._helpWindow); };
    scene.postCreateSlotWindowItemsEquipsCore = function() {
        for (const [key, method] of [['cancel', 'popScene'], ['pagedown', 'nextActor'], ['pageup', 'previousActor']]) this._slotWindow.setHandler(key, this[method].bind(this));
    };
    scene.createSlotWindow = function() { createSlot.call(this); if (this.isUseModernControls()) this.postCreateSlotWindowItemsEquipsCore(); };
    scene.commandEquip = function() { if (this.isUseModernControls()) { this._commandWindow.deselect(); this._commandWindow.deactivate(); } equip.call(this); };
    scene.onSlotOk = function() {
        if (this._slotWindow.index() >= 0) { slotOk.call(this); this.onSlotOkAutoSelect(); }
        else { this._slotWindow.smoothSelect(0); this._slotWindow.activate(); }
    };
    scene.onSlotOkAutoSelect = function() {
        const list = this._itemWindow;
        list.refresh();
        const index = list._data.indexOf(this._slotWindow.item()), half = Math.floor(list.maxVisibleItems() / 2) - 1;
        list.smoothSelect(index >= 0 ? index : 0);
        if (list._scrollDuration > 1) { list._scrollDuration = 1; list.updateSmoothScroll(); }
        list.setTopRow(list.index() - half);
    };
    scene.onSlotCancel = function() { slotCancel.call(this); if (this.isUseModernControls()) { this._commandWindow.smoothSelect(0); this._slotWindow.deactivate(); } };
    scene.onActorChange = function() {
        actorChange.call(this);
        if (this.isUseModernControls()) { this._commandWindow.deactivate(); this._commandWindow.deselect(); this._slotWindow.smoothSelect(0); this._slotWindow.activate(); }
    };
    scene.start = function() { Scene_ItemBase.prototype.start.call(this); this.refreshActor(); };
    scene.popScene = function() { SceneManager.pop(); };
}

function installItemsShopNavigation(api) {
    Window_ShopSell.prototype.maxCols = function() { return SceneManager._scene.isUseItemsEquipsCoreUpdatedLayout() ? 1 : 2; };
    const scene = Scene_Shop.prototype;
    const buy = scene.commandBuy, sell = scene.commandSell, buyOk = scene.onBuyOk, buyCancel = scene.onBuyCancel, categoryCancel = scene.onCategoryCancel, sellOk = scene.onSellOk, sellCancel = scene.onSellCancel;
    scene.commandBuyItemsEquipsCore = function() { this._buyWindowLastIndex = this._buyWindowLastIndex || 0; this._buyWindow.smoothSelect(this._buyWindowLastIndex); };
    scene.commandSellItemsEquipsCore = function() { this._buyWindow.hide(); this._commandWindow.hide(); };
    scene.onBuyCancelItemsEquipsCore = function() {
        this._buyWindowLastIndex = this._buyWindow.index();
        this._buyWindow.show(); this._buyWindow.deselect(); this._buyWindow.smoothScrollTo(0, 0); this._statusWindow.show(); this._dummyWindow.hide();
    };
    scene.onCategoryCancelItemsEquipsCore = function() { this._buyWindow.show(); this._commandWindow.show(); };
    scene.onSellOkItemsEquipsCore = function() { this._categoryWindow.show(); };
    scene.commandBuy = function() { buy.call(this); if (this.isUseItemsEquipsCoreUpdatedLayout()) this.commandBuyItemsEquipsCore(); };
    scene.commandSell = function() {
        sell.call(this);
        if (this.isUseItemsEquipsCoreUpdatedLayout()) this.commandSellItemsEquipsCore();
        if (this.isUseModernControls()) { this._categoryWindow.smoothSelect(0); this.onCategoryOk(); }
    };
    scene.onBuyOk = function() { $gameTemp._bypassProxy = true; try { buyOk.call(this); } finally { $gameTemp._bypassProxy = false; } this._item = this._buyWindow.item(); };
    scene.onBuyCancel = function() { buyCancel.call(this); if (this.isUseItemsEquipsCoreUpdatedLayout()) this.onBuyCancelItemsEquipsCore(); };
    scene.onCategoryCancel = function() { categoryCancel.call(this); if (this.isUseItemsEquipsCoreUpdatedLayout()) this.onCategoryCancelItemsEquipsCore(); };
    scene.onSellOk = function() { sellOk.call(this); if (this.isUseItemsEquipsCoreUpdatedLayout()) this.onSellOkItemsEquipsCore(); };
    scene.onSellCancel = function() { sellCancel.call(this); if (this.isUseModernControls()) this.onCategoryCancel(); if (this.isUseItemsEquipsCoreUpdatedLayout()) this._dummyWindow.hide(); };
    for (const [type, base, key] of [[Scene_Item, Scene_ItemBase, '_itemWindow'], [Scene_Shop, Scene_MenuBase, '_sellWindow']]) {
        const proto = type.prototype;
        proto.buttonAssistItemListRequirement = function() { return !!this.updatedLayoutStyle() && !!this.isUseModernControls() && !!this[key]?.active; };
        proto.buttonAssistKey1 = function() {
            if (this.buttonAssistItemListRequirement()) return this[key].maxCols() === 1 ? TextManager.getInputMultiButtonStrings('left', 'right') : TextManager.getInputMultiButtonStrings('pageup', 'pagedown');
            if (type === Scene_Shop && this._numberWindow?.active) return TextManager.getInputMultiButtonStrings('left', 'right');
            return base.prototype.buttonAssistKey1.call(this);
        };
        proto.buttonAssistText1 = function() {
            if (this.buttonAssistItemListRequirement()) return api.settings.ItemScene.buttonAssistCategory;
            if (type === Scene_Shop && this._numberWindow?.active) return api.settings.ShopScene.buttonAssistSmallIncrement;
            return base.prototype.buttonAssistText1.call(this);
        };
    }
    scene.buttonAssistKey2 = function() { return this._numberWindow?.active ? TextManager.getInputMultiButtonStrings('up', 'down') : Scene_MenuBase.prototype.buttonAssistKey2.call(this); };
    scene.buttonAssistText2 = function() { return this._numberWindow?.active ? api.settings.ShopScene.buttonAssistLargeIncrement : Scene_MenuBase.prototype.buttonAssistText2.call(this); };
    const equip = Scene_Equip.prototype;
    equip.buttonAssistSlotWindowShift = function() { return !!this._slotWindow?.active && this._slotWindow.isShiftRemoveShortcutEnabled(); };
    equip.buttonAssistKey3 = function() { return this.buttonAssistSlotWindowShift() ? TextManager.getInputButtonString('shift') : Scene_MenuBase.prototype.buttonAssistKey3.call(this); };
    equip.buttonAssistText3 = function() { return this.buttonAssistSlotWindowShift() ? api.settings.EquipScene.buttonAssistRemove : Scene_MenuBase.prototype.buttonAssistText3.call(this); };
    equip.buttonAssistOffset3 = function() { return this.buttonAssistSlotWindowShift() ? this._buttonAssistWindow.width / 5 / -3 : Scene_MenuBase.prototype.buttonAssistOffset3.call(this); };
}

function installItemsProxies() {
    DataManager.getItemIdWithName = function(name) {
        const wanted = name.toUpperCase().trim(), cache = this._itemIDs = this._itemIDs || Object.create(null);
        if (cache[wanted]) return cache[wanted];
        for (const item of $dataItems) if (item) cache[item.name.toUpperCase().trim()] = item.id;
        return cache[wanted] || 0;
    };
    DataManager.isProxyItem = function(item) { return !!item && !!item.note && item.note.match(/<PROXY: (.*)>/i); };
    DataManager.switchProxyItem = function(item) {
        const match = /<PROXY: (.*)>/i.exec(item.note || '');
        if (!match) return item;
        const name = match[1].trim();
        for (const [kind, database] of [['Item', $dataItems], ['Weapon', $dataWeapons], ['Armor', $dataArmors]]) {
            if (!this['is' + kind](item)) continue;
            const id = /^\d+$/.test(name) ? Number(name) : this['get' + kind + 'IdWithName'](name);
            return database[id] || item;
        }
        return item;
    };
    DataManager.getProxyItem = function(item) { return this.isProxyItem(item) ? this.switchProxyItem(item) || item : item; };
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        for (const group of [$dataItems, $dataWeapons, $dataArmors]) for (const item of group) {
            if (!DataManager.isProxyItem(item)) continue;
            const target = DataManager.getProxyItem(item);
            for (const key of ['name', 'iconIndex', 'description']) item[key] = target[key];
        }
    };
    const gain = Game_Party.prototype.gainItem, count = Game_Party.prototype.numItems, setObject = Game_Item.prototype.setObject;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) { gain.call(this, DataManager.isProxyItem(item) ? null : item, amount, includeEquip); };
    Game_Party.prototype.numItems = function(item) { return count.call(this, DataManager.getProxyItem(item)); };
    Game_Item.prototype.setObject = function(item) { if (!DataManager.isProxyItem(item)) setObject.call(this, item); };
    for (const type of [Window_ItemList, Window_ShopBuy]) {
        const item = type.prototype.item;
        type.prototype.proxyItem = function() { return item.call(this); };
        type.prototype.item = function() { const selected = item.call(this); return $gameTemp._bypassProxy ? selected : DataManager.getProxyItem(selected); };
    }
    const statusItem = Window_ShopStatus.prototype.setItem;
    Window_ShopStatus.prototype.setItem = function(item) { statusItem.call(this, DataManager.getProxyItem(item)); };
}

function installItemsConsumerInterface(api) {
    const sort = items => {
        items.sort((left, right) => {
            if (!left || !right) return 0;
            if (left.sortPriority === undefined) left.sortPriority = itemSortPriority(left.note);
            if (right.sortPriority === undefined) right.sortPriority = itemSortPriority(right.note);
            return right.sortPriority - left.sortPriority || left.id - right.id;
        });
        return items;
    };
    // Consumers use the native contract version and live decoded settings.
    // Their supported compositions are separately declared and verified.
    VisuMZ.ItemsEquipsCore = {version: 1.61, Settings: api.settings, SortByIDandPriority: sort};
    Imported.VisuMZ_1_ItemsEquipsCore = true;
}

function installItemsEquipsCore() {
    if (globalThis.Imported?.VisuMZ_1_ItemsEquipsCore) throw new CoreError('IE_DUPLICATE_PROVIDER', 'Enable one Items provider; the original already executed.');
    globalThis.VisuMZ ??= {};
    const api = installComplement(catalog, 'ItemsEquipsCore', 'IE');
    installItemsInventory(api);
    installItemsCategories(api);
    installItemsDisplay(api);
    installItemsEquipment(api);
    installItemsEquipSlots();
    installItemsParameters(api);
    installItemsArtifacts(api);
    installItemsCurses(api);
    installItemsShop(api);
    installItemsStatusWindow(api);
    installItemsStatusPictures();
    installItemsStatusEquipment(api);
    installItemsStatusData(api);
    installItemsStatusScene(api);
    installItemsPresentationLayouts(api);
    installItemsEquipStatus(api);
    installItemsPresentationCommands(api);
    installItemsListNavigation(api);
    installItemsEquipNavigation(api);
    installItemsShopNavigation(api);
    installItemsProxies();
    globalThis.Imported ??= {};
    Imported.Coreto_1_ItemsEquipsCore = true;
    api.capabilities = ['configuration', 'actor-equipment-slot-commands', 'item-list-columns', 'inventory-limits', 'item-availability', 'item-conservation', 'item-categories', 'item-labels', 'class-equipment-slots', 'equipment-restrictions', 'equipment-optimization', 'shop-transactions', 'batch-shops', 'item-details', 'equipment-parameters', 'inventory-artifacts', 'cursed-equipment', 'purification'];
    installItemsConsumerInterface(api);
    return api;
}
installItemsEquipsCore();

})();
