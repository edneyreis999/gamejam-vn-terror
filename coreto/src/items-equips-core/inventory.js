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
