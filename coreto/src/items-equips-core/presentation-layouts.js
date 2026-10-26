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
