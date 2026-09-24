const pictureChoiceFields = catalog.commands.find(command => command.key === 'ChangePictureChoiceSettingsOne').args.find(field => field.key === 'OnSelectSettings').fields;
function pictureChoiceState(screen) {
    screen._pictureChoiceBinding ??= {};
    screen._pictureChoiceSelected ??= {};
    screen._pictureChoiceDeselected ??= {};
}
Game_Screen.prototype.clearPictureChoices = function() {
    this._pictureChoiceBinding = {};
    this._pictureChoiceSelected = {};
    this._pictureChoiceDeselected = {};
};
Game_Screen.prototype.clearPictureChoiceID = function(id) {
    pictureChoiceState(this);
    delete this._pictureChoiceBinding[id];
    delete this._pictureChoiceSelected[id];
    delete this._pictureChoiceDeselected[id];
};
Game_Screen.prototype.getPictureChoiceBinding = function(id) {
    pictureChoiceState(this);
    return this._pictureChoiceBinding[id] ?? -2;
};
Game_Screen.prototype.addPictureChoiceBinding = function(id, index) {
    pictureChoiceState(this);
    this._pictureChoiceBinding[id] = index;
};
for (const [kind, state] of [['Selected','_pictureChoiceSelected'],['Deselected','_pictureChoiceDeselected']]) {
    Game_Screen.prototype['getPictureChoice'+kind+'Settings'] = function(id) {
        pictureChoiceState(this);
        const settings = this[state][id] ??= {};
        for (const field of pictureChoiceFields) if (settings[field.key] === undefined) settings[field.key] = field.default;
        return settings;
    };
    Game_Screen.prototype['setPictureChoice'+kind+'Settings'] = function(id, settings) {
        pictureChoiceState(this);
        this[state][id] = {...settings};
    };
}
for (const [action,kind] of [['Select','Selected'],['Deselect','Deselected']]) {
    Game_Screen.prototype['applyPictureChoice'+action+'Settings'] = function(id, instant) {
        const picture = this.picture(id);
        if (picture) picture.applyPictureChoiceSettings(this['getPictureChoice'+kind+'Settings'](id), instant);
    };
}
const initializePictureChoiceScreen = Game_Screen.prototype.initialize;
Game_Screen.prototype.initialize = function(...args) {
    const result = initializePictureChoiceScreen.apply(this, args);
    this.clearPictureChoices();
    return result;
};
const erasePictureChoice = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function(id) {
    const result = erasePictureChoice.call(this, id);
    this.clearPictureChoiceID(id);
    return result;
};
const showPictureChoice = Game_Screen.prototype.showPicture;
Game_Screen.prototype.showPicture = function(id, ...args) {
    const result = showPictureChoice.call(this, id, ...args);
    if (this._pictureChoiceDeselected?.[id]) this.applyPictureChoiceDeselectSettings(id, true);
    return result;
};
Game_Picture.prototype.applyPictureChoiceSettings = function(settings, instant) {
    const unchanged = key => String(settings[key]).toUpperCase() === 'UNCHANGED';
    const value = (key, current) => unchanged(key) ? current : eval(settings[key]);
    if (globalThis.Coreto?.CoreEngine || globalThis.Imported?.VisuMZ_0_CoreEngine) this.setEasingType(settings.easingType);
    else this._easingType = ['Linear','InSine','OutSine','InOutSine'].indexOf(settings.easingType);
    this._targetX = value('TargetX', this._targetX);
    this._targetY = value('TargetY', this._targetY);
    this._targetScaleX = value('TargetScaleX', this._targetScaleX);
    this._targetScaleY = value('TargetScaleY', this._targetScaleY);
    this._targetOpacity = value('TargetOpacity', this._targetOpacity);
    if (settings.BlendMode !== -1) this._blendMode = settings.BlendMode;
    this._tone ??= [0,0,0,0];
    const toneKeys = ['Red','Green','Blue','Gray'].map(color => 'TargetTone'+color);
    this._toneTarget = toneKeys.map((key,index) => value(key, this._tone[index]).clamp(index === 3 ? 0 : -255, 255));
    const immediate = instant || settings.Duration <= 0;
    const duration = immediate ? 1 : settings.Duration;
    this._duration = duration;
    this._wholeDuration = duration;
    if (toneKeys.some(key => !unchanged(key))) this._toneDuration = duration;
    if (immediate) this.update();
};
function pictureChoiceCommandSettings(raw) {
    const encoded = JSON.parse(raw);
    return Object.fromEntries(pictureChoiceFields.map(field => [field.key, encoded[field.storageKey] === undefined ? field.default : field.type === 'number' ? Number(encoded[field.storageKey]) : encoded[field.storageKey]]));
}
function pictureChoiceIds(command, args) {
    const maximum = $gameScreen.maxPictures();
    if (command.endsWith('ID') || command.endsWith('One')) return JSON.parse(args['PictureIDs:arraynum']).map(Number).map(id => Math.round(id).clamp(1, maximum));
    const start = Number(args['StartID:num']).clamp(1, maximum), end = Number(args['EndingID:num']).clamp(1, maximum);
    return Array.from({length:Math.abs(end-start)+1}, (_,index) => Math.min(start,end)+index);
}
for (const namespace of [catalog.pluginId, catalog.reference.pluginId]) {
    for (const command of catalog.commands) PluginManager.registerCommand(namespace, command.key, function(args) {
        const native = {...Object.fromEntries(command.args.map(field => [field.storageKey,field.nativeDefault])),...args};
        if (command.key === 'ClearAll') return $gameScreen.clearPictureChoices();
        const ids = pictureChoiceIds(command.key, native);
        if (command.key.startsWith('Clear')) {
            for (const id of ids) $gameScreen.clearPictureChoiceID(id);
            return;
        }
        const selected = pictureChoiceCommandSettings(native['OnSelectSettings:struct']);
        const deselected = pictureChoiceCommandSettings(native['OnDeselectSettings:struct']);
        for (const id of ids) {
            $gameScreen.setPictureChoiceSelectedSettings(id, selected);
            $gameScreen.setPictureChoiceDeselectedSettings(id, deselected);
        }
        if (pictureChoicesApi.settings.SameCheck && Utils.isOptionValid('test') && JSON.stringify(selected) === JSON.stringify(deselected)) {
            alert('Picture Choices: use different On Select and On Deselect settings to produce a visible change.');
            SceneManager.exit();
        }
    });
}
