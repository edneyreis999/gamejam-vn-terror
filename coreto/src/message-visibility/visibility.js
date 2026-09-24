const messageVisibilityApi = installComplement(catalog, 'MessageVisibility', 'MV');
const visibilitySettings = messageVisibilityApi.settings;
Window_Message.VISIBILITY_TOGGLE_KEY = visibilitySettings.ToggleKey;
Window_Message.VISIBILITY_COMMON_EVENT_SHOW = visibilitySettings.CommonEventShow;
Window_Message.VISIBILITY_COMMON_EVENT_HIDE = visibilitySettings.CommonEventHide;
SceneManager.isSceneMap = function() { return this._scene?.constructor === Scene_Map; };
Game_Temp.prototype.toggleMessageWindowVisibility = function() { SceneManager._scene?._messageWindow?.toggleVisibility(); };
Game_Temp.prototype.showMessageWindowVisibility = function() { SceneManager._scene?._messageWindow?.setVisibility(true); };
Window_Selectable.prototype.canToggleVisibility = function() {
    return SceneManager.isSceneMap() &&
        [Window_Message,Window_ChoiceList,Window_NumberInput,Window_EventItem].includes(this.constructor);
};
Window_Message.prototype.enableToggleVisibility = function() { this._cannotToggleVisibility = false; };
function canChangeMessageVisibility(window) { return !window._cannotToggleVisibility && SceneManager.isSceneMap(); }
Window_Message.prototype.toggleVisibility = function() { this.setVisibility(this.scale.x <= 0); };
Window_Message.prototype.setWindowVisibility = function(visible) {
    for (const window of [this,this._goldWindow,this._nameBoxWindow,this._choiceListWindow,this._numberInputWindow,this._eventItemWindow,this._choiceListHelpWindow,this._AniMsgTextEffectsContainer]) {
        if (window && !window._pictureChoicesHidden) window.scale.set(visible ? 1 : 0);
    }
};
Window_Message.prototype.setVisibility = function(visible) {
    if (!canChangeMessageVisibility(this) || (this.scale.x > 0) === !!visible) return;
    this.setWindowVisibility(visible);
    Input.clear();
    TouchInput.clear();
    this.runVisibilityCommonEvent(visible);
};
Window_Message.prototype.runVisibilityCommonEvent = function(visible) {
    const id = visible ? Window_Message.VISIBILITY_COMMON_EVENT_SHOW : Window_Message.VISIBILITY_COMMON_EVENT_HIDE;
    if (id > 0 && typeof this.launchMessageCommonEvent === 'function') this.launchMessageCommonEvent(id);
};
function messageWindowIsHidden() { return SceneManager._scene?._messageWindow?.scale.x <= 0; }
function visibilityKeyTriggered() {
    const key = Window_Message.VISIBILITY_TOGGLE_KEY;
    return key !== 'none' && Input.isTriggered(key);
}
const messageVisibilityTriggered = Window_Message.prototype.isTriggered;
Window_Message.prototype.isTriggered = function(...args) {
    if (canChangeMessageVisibility(this)) {
        if (visibilityKeyTriggered()) { this.toggleVisibility(); return false; }
        if (this.scale.x <= 0) {
            if (Input.isRepeated('ok') || TouchInput.isTriggered()) this.setVisibility(true);
            return false;
        }
    }
    return messageVisibilityTriggered.apply(this,args);
};
const visibilityCursorMove = Window_Selectable.prototype.processCursorMove;
Window_Selectable.prototype.processCursorMove = function(...args) {
    if (this.isOpenAndActive() && this.canToggleVisibility()) {
        if (visibilityKeyTriggered()) return $gameTemp.toggleMessageWindowVisibility();
        if (this.isCursorMovable() && messageWindowIsHidden() && ['down','up','left','right','pageup','pagedown'].some(key=>Input.isRepeated(key))) return $gameTemp.showMessageWindowVisibility();
    }
    return visibilityCursorMove.apply(this,args);
};
const visibilityTouch = Window_Selectable.prototype.processTouch;
Window_Selectable.prototype.processTouch = function(...args) {
    if (this.isOpenAndActive() && this.canToggleVisibility() && messageWindowIsHidden() && TouchInput.isTriggered()) return $gameTemp.showMessageWindowVisibility();
    return visibilityTouch.apply(this,args);
};
const visibilityHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function(...args) {
    if (this.isOpenAndActive() && this.canToggleVisibility() && messageWindowIsHidden()) {
        if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isCancelled()) $gameTemp.showMessageWindowVisibility();
        return;
    }
    return visibilityHandling.apply(this,args);
};
const visibilityNumberUpdate = Window_NumberInput.prototype.update;
Window_NumberInput.prototype.update = function(...args) {
    // Core keyboard edits run through both cursor and digit processing.
    if (this.isOpenAndActive() && this.canToggleVisibility() && messageWindowIsHidden() &&
        (Input.isNumpadPressed?.() || [8,46,36,35].includes(Input._inputSpecialKeyCode))) {
        Input.clear();
        TouchInput.clear();
    }
    return visibilityNumberUpdate.apply(this,args);
};
const visibilityPictureClick = Sprite_Picture.prototype.isClickEnabled;
Sprite_Picture.prototype.isClickEnabled = function(...args) {
    if (SceneManager.isSceneMap() && SceneManager._scene._messageWindow?.scale.x <= 0) return false;
    return visibilityPictureClick.apply(this,args);
};
if (TextManager.msgButtonConsole) {
    const buttonName = TextManager.msgButtonConsole;
    TextManager.msgButtonConsole = function(type) {
        return type === 'hide' ? visibilitySettings.ButtonName : buttonName.call(this,type);
    };
}
globalThis.Imported ??= {};
Imported.Coreto_4_MessageVisibility = true;
Imported.VisuMZ_4_MessageVisibility = true;
globalThis.VisuMZ ??= {};
VisuMZ.MessageVisibility = {version:Number(catalog.reference.version),Settings:visibilitySettings};
