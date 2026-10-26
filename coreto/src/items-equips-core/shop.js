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
