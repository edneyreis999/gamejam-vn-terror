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
