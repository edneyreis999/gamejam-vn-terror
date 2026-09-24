function installUiSettings(settings) {
    const ui = settings.UI;
    SceneManager._sideButtonLayout = false;
    SceneManager._hideButtons = !ui.ShowButtons;
    SceneManager.setSideButtonLayout = function(value) {
        if (ui.SideButtons) this._sideButtonLayout = value;
    };
    SceneManager.isSideButtonLayout = function() { return this._sideButtonLayout; };
    SceneManager.areButtonsHidden = function() { return this._hideButtons; };
    SceneManager.areButtonsOutsideMainUI = function() { return this.areButtonsHidden() || this.isSideButtonLayout(); };
    Scene_Boot.prototype.determineSideButtonLayoutValid = function() {
        const available = Graphics.width - Graphics.boxWidth - ui.BoxMargin * 2;
        if (ui.SideButtons && available >= Sprite_Button.prototype.blockWidth.call(this) * 4) SceneManager.setSideButtonLayout(true);
    };
    Scene_Boot.prototype.adjustBoxSize = function() {
        Graphics.boxWidth = $dataSystem.advanced.uiAreaWidth - ui.BoxMargin * 2;
        Graphics.boxHeight = $dataSystem.advanced.uiAreaHeight - ui.BoxMargin * 2;
        this.determineSideButtonLayoutValid();
    };
    for (const [method, key] of Object.entries({fadeSpeed:"FadeSpeed",isBottomHelpMode:"BottomHelp",isBottomButtonMode:"BottomButtons",isRightInputMode:"RightMenus",mainCommandWidth:"CommandWidth",buttonAreaHeight:"ButtonHeight"})) {
        Scene_Base.prototype[method] = function() { return ui[key]; };
    }
    Scene_Base.prototype.isWindowMaskingEnabled = function() { return settings.Window.EnableMasking; };
    const helpAreaTop = Scene_MenuBase.prototype.helpAreaTop;
    Scene_MenuBase.prototype.helpAreaTop = function() {
        return SceneManager.areButtonsOutsideMainUI() ? this.helpAreaTopSideButtonLayout() : helpAreaTop.call(this);
    };
    Scene_MenuBase.prototype.helpAreaTopSideButtonLayout = function() {
        return this.isBottomHelpMode() ? this.mainAreaBottom() : 0;
    };
    const mainAreaTop = Scene_MenuBase.prototype.mainAreaTop;
    Scene_MenuBase.prototype.mainAreaTop = function() {
        return SceneManager.areButtonsOutsideMainUI() ? this.mainAreaTopSideButtonLayout() : mainAreaTop.call(this);
    };
    Scene_MenuBase.prototype.mainAreaTopSideButtonLayout = function() {
        return this.isBottomHelpMode() ? 0 : this.helpAreaBottom();
    };
    const mainAreaHeight = Scene_MenuBase.prototype.mainAreaHeight;
    Scene_MenuBase.prototype.mainAreaHeight = function() {
        return SceneManager.areButtonsOutsideMainUI() ? Graphics.boxHeight - this.helpAreaHeight() : mainAreaHeight.call(this);
    };
    const createCancelButton = Scene_MenuBase.prototype.createCancelButton;
    Scene_MenuBase.prototype.createCancelButton = function() {
        createCancelButton.call(this);
        if (SceneManager.isSideButtonLayout()) this.moveCancelButtonSideButtonLayout();
    };
    Scene_MenuBase.prototype.moveCancelButtonSideButtonLayout = function() { this._cancelButton.x = Graphics.boxWidth + 4; };
    const createPageButtons = Scene_MenuBase.prototype.createPageButtons;
    Scene_MenuBase.prototype.createPageButtons = function() {
        createPageButtons.call(this);
        if (SceneManager.isSideButtonLayout()) this.movePageButtonSideButtonLayout();
    };
    Scene_MenuBase.prototype.movePageButtonSideButtonLayout = function() {
        this._pageupButton.x = -(this._pageupButton.width + this._pagedownButton.width + 8);
        this._pagedownButton.x = -(this._pagedownButton.width + 4);
    };
    const initializeButton = Sprite_Button.prototype.initialize;
    Sprite_Button.prototype.initialize = function(...args) {
        initializeButton.apply(this, args);
        this.initButtonHidden();
    };
    Sprite_Button.prototype.initButtonHidden = function() {
        const key = {cancel:"cancelShowButton",pageup:"pagedownShowButton",pagedown:"pagedownShowButton",down:"numberShowButton",up:"numberShowButton",down2:"numberShowButton",up2:"numberShowButton",ok:"numberShowButton",menu:"menuShowButton"}[this._buttonType];
        this._isButtonHidden = key ? !ui[key] : false;
    };
    const updateOpacity = Sprite_Button.prototype.updateOpacity;
    Sprite_Button.prototype.updateOpacity = function() {
        if (SceneManager.areButtonsHidden() || this._isButtonHidden) this.hideButtonFromView();
        else updateOpacity.call(this);
    };
    Sprite_Button.prototype.hideButtonFromView = function() {
        this.visible = false;
        this.opacity = 0;
        this.x = Graphics.width * 10;
        this.y = Graphics.height * 10;
    };
    DataManager.isKeyItem = function(item) { return this.isItem(item) && item.itypeId === 2; };
    const consumeItem = Game_Party.prototype.consumeItem;
    Game_Party.prototype.consumeItem = function(item) {
        if (settings.QoL.KeyItemProtect && DataManager.isKeyItem(item)) return;
        consumeItem.call(this, item);
    };
    const isEnabled = Window_ShopSell.prototype.isEnabled;
    Window_ShopSell.prototype.isEnabled = function(item) {
        return settings.QoL.KeyItemProtect && DataManager.isKeyItem(item) ? false : isEnabled.call(this, item);
    };
}
