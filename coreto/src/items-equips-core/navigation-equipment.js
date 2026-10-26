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
