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
