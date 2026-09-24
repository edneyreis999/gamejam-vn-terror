const eventTitleApi = installComplement(catalog, 'EventTitleScene', 'ET');
const titleSettings = eventTitleApi.settings;
function Scene_EventedTitleMap() { this.initialize(...arguments); }
Scene_EventedTitleMap.prototype = Object.create(Scene_Map.prototype);
Scene_EventedTitleMap.prototype.constructor = Scene_EventedTitleMap;
Scene_EventedTitleMap.prototype.initialize = function() {
    Scene_Map.prototype.initialize.call(this);
    $gamePlayer.setTransparent(titleSettings.PlayerTransparent);
    if (titleSettings.ShowFollowers) $gamePlayer.showFollowers(); else $gamePlayer.hideFollowers();
};
Scene_EventedTitleMap.prototype.isAutosaveEnabled = function() { return false; };
Scene_EventedTitleMap.prototype.requestAutosave = function() {};
Scene_EventedTitleMap.prototype.executeAutosave = function() {};
Scene_EventedTitleMap.prototype.forceAutosave = function() {};
Scene_EventedTitleMap.prototype.isMapTouchOk = function() { return titleSettings.CanInputMove && Scene_Map.prototype.isMapTouchOk.call(this); };
Scene_EventedTitleMap.prototype.updateEncounter = function() {};
Scene_EventedTitleMap.prototype.isMenuCalled = function() { return false; };
Scene_EventedTitleMap.prototype.callMenu = function() {};
Scene_EventedTitleMap.prototype.updateCallDebug = function() {};
Scene_EventedTitleMap.prototype.isDebugCalled = function() { return false; };
Scene_EventedTitleMap.prototype.createTitleButtons = function() {
    if (this._eventTitleButtonsCreated) return;
    this._eventTitleButtonsCreated = true;
    if (typeof Scene_Title.prototype.createTitleButtons === 'function') Scene_Title.prototype.createTitleButtons.call(this);
};
Scene_EventedTitleMap.prototype.start = function() {
    Scene_Map.prototype.start.call(this);
    this.createTitleButtons();
    if (this._eventTitleLoadError && typeof this.loadFailureConfirmationWindow === 'function') this.loadFailureConfirmationWindow();
};
Scene_EventedTitleMap.prototype.processOptionsCoreFailsafe = function(direction) {
    const sequence = [8,8,2,2,4,6,4,6];
    const index = this._optionsCoreFailsafeCheck ?? 0;
    this._optionsCoreFailsafeCheck = sequence[index] === direction ? index + 1 : 0;
    if (this._optionsCoreFailsafeCheck === sequence.length) {
        ConfigManager.assistMode = true;
        ConfigManager.save();
        SoundManager.playLoad();
    }
};
Scene_EventedTitleMap.prototype.updateOptionsCoreFailsafe = function() {
    if (!globalThis.Imported?.VisuMZ_1_OptionsCore) return;
    for (const [key,direction] of [['up',8],['down',2],['left',4],['right',6]]) {
        if (Input.isTriggered(key)) this.processOptionsCoreFailsafe(direction);
    }
};
Scene_EventedTitleMap.prototype.update = function() {
    Scene_Map.prototype.update.call(this);
    this.updateOptionsCoreFailsafe();
};
globalThis.Scene_EventedTitleMap = Scene_EventedTitleMap;
SceneManager.isSceneMap = function() { return this._scene?.constructor === Scene_Map; };
SceneManager.isSceneTitleMap = function() { return this._scene?.constructor === Scene_EventedTitleMap; };
DataManager.prepareEventedTitleScreen = function() {
    this.setupNewGame();
    $gamePlayer.reserveTransfer(titleSettings.MapID,titleSettings.MapX,titleSettings.MapY,titleSettings.FaceDirection,0);
};
const gotoEventTitle = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
    if (sceneClass === Scene_Title || sceneClass === Scene_EventedTitleMap) {
        DataManager.prepareEventedTitleScreen();
        sceneClass = Scene_EventedTitleMap;
    }
    return gotoEventTitle.call(this,sceneClass);
};
const titleInputDirection = Game_Player.prototype.getInputDirection;
Game_Player.prototype.getInputDirection = function(...args) {
    return SceneManager.isSceneTitleMap() && !titleSettings.CanInputMove ? 0 : titleInputDirection.apply(this,args);
};
const titleAutosave = Scene_Map.prototype.isAutosaveEnabled;
Scene_Map.prototype.isAutosaveEnabled = function(...args) {
    if (SceneManager.isPreviousScene(Scene_TitleTransition) || SceneManager.isPreviousScene(Scene_Save)) return false;
    return titleAutosave.apply(this,args);
};
const makeTitleChoices = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makeTitleChoices.apply(this,args);
    for (const choice of this._list) if (/<CONTINUE>/i.test(choice.name)) {
        choice.name = choice.name.replace(/<CONTINUE>/gi,'').trim();
        choice.enabled = choice.enabled && DataManager.isAnySavefileExists();
    }
    return result;
};
