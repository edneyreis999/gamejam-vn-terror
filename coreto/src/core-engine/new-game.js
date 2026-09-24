function installNewGameSettings(settings) {
    const options = settings.QoL;
    Game_Temp.prototype.forceOutOfPlaytest = function() {
        if (options.ForceNoPlayTest) this._isPlaytest = false;
    };
    const initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function(...args) {
        const result = initialize.apply(this, args);
        this.forceOutOfPlaytest();
        return result;
    };
    DataManager.reservePlayTestNewGameCommonEvent = function() {
        if ($gameTemp.isPlaytest() && options.NewGameCommonEvent > 0) $gameTemp.reserveCommonEvent(options.NewGameCommonEvent);
    };
    DataManager.reserveNewGameCommonEvent = function() {
        if (options.NewGameCommonEventAll > 0) $gameTemp.reserveCommonEvent(options.NewGameCommonEventAll);
    };
    const setup = DataManager.setupNewGame;
    DataManager.setupNewGame = function(...args) {
        const result = setup.apply(this, args);
        this.reservePlayTestNewGameCommonEvent();
        this.reserveNewGameCommonEvent();
        return result;
    };
    Scene_Boot.prototype.startAutoNewGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    };
    const start = Scene_Boot.prototype.startNormalGame;
    Scene_Boot.prototype.startNormalGame = function(...args) {
        if (Utils.isOptionValid('test') && options.NewGameBoot) return this.startAutoNewGame();
        return start.apply(this, args);
    };
    const autosave = Scene_Map.prototype.shouldAutosave;
    Scene_Map.prototype.shouldAutosave = function(...args) {
        if (['Scene_Title', 'Scene_Load', 'Scene_TitleTransition', 'Scene_SingleLoadTransition'].includes(SceneManager._previousClass?.name)) return false;
        return autosave.apply(this, args);
    };
}
