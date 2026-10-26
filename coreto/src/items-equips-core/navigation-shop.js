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
