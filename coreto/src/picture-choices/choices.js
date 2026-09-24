Window_ChoiceList.prototype.applyHideChoiceWindow = function() {
    this._pictureChoicesHidden = false;
    for (const command of this._list) command.name = command.name.replace(/<HIDE CHOICE WINDOW>/gi, () => {
        this._pictureChoicesHidden = true;
        return '';
    }).trim();
    this.scale.set(this._pictureChoicesHidden ? 0 : 1);
};
Window_ChoiceList.prototype.applyPictureChoiceBindings = function() {
    for (const [index,command] of this._list.entries()) command.name = command.name.replace(/<BIND PICTURES?: (\d+)>/gi, (_,id) => {
        $gameScreen.addPictureChoiceBinding(Number(id), index);
        return '';
    }).trim();
};
const makePictureChoiceList = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makePictureChoiceList.apply(this, args);
    this.applyHideChoiceWindow();
    this.applyPictureChoiceBindings();
    return result;
};
Window_ChoiceList.prototype.autoClearPictureChoices = function() {
    if (pictureChoicesApi.settings.AutoClear) $gameScreen.clearPictureChoices();
};
for (const name of ['callOkHandler','callCancelHandler']) {
    const original = Window_ChoiceList.prototype[name];
    Window_ChoiceList.prototype[name] = function(...args) {
        const result = original.apply(this, args);
        this.autoClearPictureChoices();
        return result;
    };
}
Window_ChoiceList.prototype.onSelectPictureChoices = function(index) {
    for (let id = 0; id < $gameScreen.maxPictures(); id++) {
        const binding = $gameScreen.getPictureChoiceBinding(id);
        if (binding < 0 || !$gameScreen.picture(id)) continue;
        if (binding === index) $gameScreen.applyPictureChoiceSelectSettings(id, this._instantPictureChoiceSelect);
        else $gameScreen.applyPictureChoiceDeselectSettings(id, this._instantPictureChoiceSelect);
    }
};
const selectPictureChoice = Object.hasOwn(Window_ChoiceList.prototype, 'select') ? Window_ChoiceList.prototype.select : null;
Window_ChoiceList.prototype.select = function(index) {
    // Keep inherited dispatch live: later consumers extend Window_Selectable.select.
    const result = (selectPictureChoice ?? Window_Command.prototype.select).call(this, index);
    this.onSelectPictureChoices(index);
    return result;
};
const selectDefaultPictureChoice = Window_ChoiceList.prototype.selectDefault;
Window_ChoiceList.prototype.selectDefault = function(...args) {
    this._instantPictureChoiceSelect = true;
    const result = selectDefaultPictureChoice.apply(this, args);
    this._instantPictureChoiceSelect = undefined;
    return result;
};
Window_ChoiceList.prototype.pictureChoiceSelect = function(index) {
    const previous = this.index();
    this.select(index);
    if (this.index() !== previous) this.playCursorSound();
};
function pictureChoiceWindow(sprite) {
    if (!(sprite instanceof Sprite_Picture)) return null;
    const window = SceneManager._scene?._choiceListWindow;
    if (!window?.active || $gameScreen.getPictureChoiceBinding(sprite._pictureId) < 0) return null;
    return window;
}
Sprite_Clickable.prototype.hasPictureChoiceBinding = function() { return !!pictureChoiceWindow(this); };
Sprite_Clickable.prototype.onMouseEnterPictureChoice = function() {
    const window = pictureChoiceWindow(this);
    if (window) window.pictureChoiceSelect($gameScreen.getPictureChoiceBinding(this._pictureId));
};
Sprite_Clickable.prototype.onClickPictureChoice = function() {
    const window = pictureChoiceWindow(this);
    if (window) {
        window.pictureChoiceSelect($gameScreen.getPictureChoiceBinding(this._pictureId));
        window.processOk();
    }
};
for (const [name,action] of [['onMouseEnter','onMouseEnterPictureChoice'],['onClick','onClickPictureChoice']]) {
    const original = Sprite_Clickable.prototype[name];
    Sprite_Clickable.prototype[name] = function(...args) {
        const result = original.apply(this, args);
        this[action]();
        return result;
    };
}
globalThis.Imported ??= {};
Imported.Coreto_2_PictureChoices = true;
Imported.VisuMZ_2_PictureChoices = true;
globalThis.VisuMZ ??= {};
VisuMZ.PictureChoices = {version:Number(catalog.reference.version),Settings:pictureChoicesApi.settings};
