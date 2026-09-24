const choiceCommonEventsApi = installComplement(catalog, 'ChoiceCommonEvents', 'CC');
Window_ChoiceList.prototype.clearChoiceCommonEvents = function() {
    this._choiceCommonEvents = {};
};
Window_ChoiceList.prototype.applyChoiceCommonEvents = function() {
    this.clearChoiceCommonEvents();
    for (const [index,command] of this._list.entries()) command.name = command.name.replace(/<(?:CHOICE|SELECT) (?:COMMON EVENT|COMMONEVENT|EVENT): (\d+)>/gi, (_,id) => {
        this._choiceCommonEvents[index] = Number(id);
        return '';
    }).trim();
};
Window_ChoiceList.prototype.isSceneSelectChoiceCommonEventValid = function() {
    return SceneManager._scene instanceof Scene_Map || SceneManager._scene?.constructor.name === 'Scene_EventedTitleMap';
};
Window_ChoiceList.prototype.onSelectChoiceCommonEvents = function(index, previous) {
    if (index === previous) return;
    const id = this._choiceCommonEvents?.[index];
    if (!id) return;
    if (!this.isSceneSelectChoiceCommonEventValid()) {
        if (!$gameTemp._choiceCommonEventAlert) {
            $gameTemp._choiceCommonEventAlert = true;
            alert('Choice Common Events only work on the map scene!');
        }
        return;
    }
    $gameMap.addMessageCommonEvent(id);
};
const makeCommonEventChoices = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makeCommonEventChoices.apply(this, args);
    this.applyChoiceCommonEvents();
    return result;
};
const selectCommonEventChoice = Window_ChoiceList.prototype.select;
Window_ChoiceList.prototype.select = function(index) {
    const previous = this.index();
    const result = selectCommonEventChoice.call(this, index);
    this.onSelectChoiceCommonEvents(index, previous);
    return result;
};
const startCommonEventChoice = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function(...args) {
    this.deselect();
    return startCommonEventChoice.apply(this, args);
};
globalThis.Imported ??= {};
Imported.Coreto_3_ChoiceCmnEvts = true;
Imported.VisuMZ_3_ChoiceCmnEvts = true;
globalThis.VisuMZ ??= {};
VisuMZ.ChoiceCmnEvts = {version:Number(catalog.reference.version),Settings:choiceCommonEventsApi.settings};
