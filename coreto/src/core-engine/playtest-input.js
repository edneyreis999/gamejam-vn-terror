function installPlaytestInput(settings) {
    const qol = settings.QoL;
    class Scene_QuickLoad extends Scene_Load {
        prepare(id) { this._saveFileID = id; }
        create() { this.executeLoad(this._saveFileID); }
        start() { Scene_MenuBase.prototype.start.call(this); }
        onLoadFailure() {
            SoundManager.playBuzzer();
            this.popScene();
        }
    }
    globalThis.Scene_QuickLoad = Scene_QuickLoad;
    SceneManager.isSceneBattle = function() { return this._scene instanceof Scene_Battle; };
    SceneManager.playtestQuickLoad = function(id) {
        if (!$gameTemp.isPlaytest() || !qol.CtrlQuickLoad || !DataManager.savefileInfo(id)) return;
        this.push(Scene_QuickLoad);
        this.prepareNextScene(id);
    };
    SceneManager.playTestF6 = function() {
        if (!$gameTemp.isPlaytest() || !qol.F6key) return;
        const volume = ConfigManager.seVolume !== 0 ? 0 : 100;
        for (const key of ["bgmVolume","bgsVolume","meVolume","seVolume"]) ConfigManager[key] = volume;
        ConfigManager.save();
        if (this._scene.constructor === Scene_Options) {
            this._scene._optionsWindow?.refresh();
            this._scene._listWindow?.refresh();
        }
    };
    SceneManager.playTestF7 = function() {
        if ($gameTemp.isPlaytest() && qol.F7key) $gameTemp._playTestFastMode = !$gameTemp._playTestFastMode;
    };
    SceneManager.playTestShiftR = function() {
        if (!qol.ShiftR_Toggle || !$gameTemp.isPlaytest() || !this.isSceneBattle() || !Input.isPressed("shift")) return;
        for (const actor of $gameParty.members()) actor.recoverAll();
    };
    SceneManager.playTestShiftT = function() {
        if (!qol.ShiftT_Toggle || !$gameTemp.isPlaytest() || !this.isSceneBattle() || !Input.isPressed("shift")) return;
        for (const actor of $gameParty.members()) actor.gainSilentTp(actor.maxTp());
    };
    SceneManager.onKeyDownKeysF6F7 = function(event) {
        if (!event.ctrlKey && !event.altKey) {
            if (event.keyCode === 82) this.playTestShiftR();
            if (event.keyCode === 84) this.playTestShiftT();
            if (event.keyCode === 117) this.playTestF6();
            if (event.keyCode === 118 && !Input.isPressed("shift") && !Input.isPressed("ctrl")) this.playTestF7();
        } else if (event.ctrlKey) {
            if (event.keyCode >= 49 && event.keyCode <= 57) this.playtestQuickLoad(event.keyCode - 48);
            if (event.keyCode >= 97 && event.keyCode <= 105) this.playtestQuickLoad(event.keyCode - 96);
        }
    };
    const onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function(event) {
        if ($gameTemp) this.onKeyDownKeysF6F7(event);
        onKeyDown.call(this, event);
    };
    const updateScene = Scene_Map.prototype.updateScene;
    Scene_Map.prototype.updateScene = function() {
        updateScene.call(this);
        this.updateDashToggle();
    };
    Scene_Map.prototype.updateDashToggle = function() {
        if (Input.isTriggered("dashToggle")) {
            ConfigManager.alwaysDash = !ConfigManager.alwaysDash;
            ConfigManager.save();
        }
    };
    const updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply = function() {
        updateMainMultiply.call(this);
        if ($gameTemp._playTestFastMode && !$gameMessage.isBusy()) {
            this.updateMain();
            SceneManager.updateEffekseer();
        }
    };
    const updateBattle = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        updateBattle.call(this);
        if ($gameTemp._playTestFastMode && !BattleManager.isInputting() && !$gameMessage.isBusy()) {
            updateBattle.call(this);
            SceneManager.updateEffekseer();
        }
    };
}
