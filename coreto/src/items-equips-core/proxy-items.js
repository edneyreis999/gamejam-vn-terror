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
