const messageTriggerBeforeExtended = Window_Message.prototype.isTriggered;
function installExtendedModes() {
    const settings = extendedApi.settings;
    Window_Message.AUTO_FORWARD_DELAY_PER_CHAR = settings.Auto.WaitPerChar;
    Window_Message.AUTO_FORWARD_MIN_DELAY = settings.Auto.MinimumWait;
    Scene_Message.EXT_FAST_FORWARD_ENABLED = settings.FastFwd.Enable;
    Scene_Message.EXT_FAST_FORWARD_LOOPS = settings.FastFwd.Speed;
    Scene_Message.EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE = settings.FastFwd.SceneChangeReset;

    Game_Temp.prototype.isMessageAutoForwardMode = function() { return this._messageAutoForwardMode; };
    Game_Temp.prototype.setMessageAutoForwardMode = function(enabled) { this._messageAutoForwardMode = enabled; };
    Game_Temp.prototype.isExtendedFastForwardMode = function() { return this._extendedFastForwardMode; };
    Game_Temp.prototype.setExtendedFastForwardMode = function(enabled) { this._extendedFastForwardMode = enabled; };
    Game_System.prototype.initExtendedFastForward = function() { this._disallowFastForward = false; };
    Game_System.prototype.isExtendedFastForwardDisallowed = function() {
        if (this._disallowFastForward === undefined) this.initExtendedFastForward();
        return this._disallowFastForward;
    };
    Game_System.prototype.setExtendedFastForwardDisallowed = function(disallowed) {
        if (this._disallowFastForward === undefined) this.initExtendedFastForward();
        this._disallowFastForward = disallowed;
    };
    extendedApi.registerCommand('ExtFastFwdDisallow', function(args) { $gameSystem.setExtendedFastForwardDisallowed(!args.Allow); });

    SceneManager.isSceneMap = function() { return this._scene && this._scene.constructor === Scene_Map; };
    SceneManager.isSceneBattle = function() { return this._scene && this._scene.constructor === Scene_Battle; };
    Scene_Message.prototype.anyActiveMessageInputWindows = function() {
        return [this._choiceListWindow,this._numberInputWindow,this._eventItemWindow].some(window => window && window.active);
    };
    Scene_Message.prototype.isActivatedExtendedFastForwardMode = function() {
        if (!this.anyActiveMessageInputWindows() && Input.isPressed(VisuMZ.MessageCore.Settings.General.FastForwardKey)) return true;
        return $gameTemp.isExtendedFastForwardMode();
    };
    Scene_Message.prototype.isExtendedFastForwardMode = function() {
        if (!Scene_Message.EXT_FAST_FORWARD_ENABLED || $gameSystem.isExtendedFastForwardDisallowed() || this.anyActiveMessageInputWindows()) return false;
        return this.isActivatedExtendedFastForwardMode();
    };
    Scene_Map.prototype.isExtendedFastForwardMode = function() {
        return Scene_Message.prototype.isExtendedFastForwardMode.call(this) && $gameMap.isEventRunning();
    };
    Scene_Battle.prototype.isExtendedFastForwardMode = function() { return false; };
    Game_Temp.prototype.isSceneUsingExFastForward = function() {
        const scene = SceneManager._scene;
        return scene && scene.isExtendedFastForwardMode && scene.isExtendedFastForwardMode();
    };
    const requestAnimation = Game_Temp.prototype.requestAnimation;
    Game_Temp.prototype.requestAnimation = function(...args) {
        if (!this.isSceneUsingExFastForward()) return requestAnimation.apply(this,args);
    };
    const startWait = Window_Message.prototype.startWait;
    Window_Message.prototype.startWait = function(count) {
        if (!SceneManager._scene.isExtendedFastForwardMode()) startWait.call(this,count);
    };
    Scene_Message.prototype.updateExtendedFastForwardCancel = function() {
        if (Input.isTriggered('escape') || TouchInput.isCancelled()) {
            $gameTemp.setExtendedFastForwardMode(false);
            return true;
        }
        return false;
    };
    Scene_Map.prototype.updateExtendedFastForwardMode = function() {
        for (let count = 0; count < Scene_Message.EXT_FAST_FORWARD_LOOPS && $gameMap.isEventRunning() && !this.anyActiveMessageInputWindows(); count++) {
            this.updateFade();
            this.updateColorFilter();
            this.updateMain();
            SceneManager.updateEffekseer();
            if (this.updateExtendedFastForwardCancel()) break;
        }
    };
    const updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply = function() {
        if (this.isExtendedFastForwardMode()) return this.updateExtendedFastForwardMode();
        return updateMainMultiply.apply(this,arguments);
    };
    const updateBattle = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        updateBattle.apply(this,arguments);
        if (this.isExtendedFastForwardMode()) this.updateExtendedFastForwardMode();
    };
    Scene_Battle.prototype.updateExtendedFastForwardMode = function() {
        this._extFastForwardLooping = true;
        for (let count = 0; count < Scene_Message.EXT_FAST_FORWARD_LOOPS && $gameTroop.isEventRunning() && !this.anyActiveMessageInputWindows(); count++) {
            this.update();
            SceneManager.updateEffekseer();
            if (this.updateExtendedFastForwardCancel()) break;
        }
        this._extFastForwardLooping = false;
    };
    const updateWindowLayer = WindowLayer.prototype.update;
    WindowLayer.prototype.update = function() {
        if (SceneManager._scene._extFastForwardLooping) return;
        return updateWindowLayer.apply(this,arguments);
    };
    const createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function() {
        const result = createAllWindows.apply(this,arguments);
        if (Scene_Message.EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE) $gameTemp.setExtendedFastForwardMode(false);
        return result;
    };

    Window_Message.prototype.meetExtMsgFuncResetRequirements = function() {
        if (SceneManager.isSceneMap() && $gameMap && !$gameMap.isEventRunning()) return true;
        // Extended 1.22 consults the map even in battle; D-03 preserves that defect.
        return SceneManager.isSceneBattle() && !$gameMap.isEventRunning();
    };
    Window_Message.prototype.updateExtMsgFuncResetTimers = function() {
        if (!this.meetExtMsgFuncResetRequirements()) return;
        if ($gameTemp.isMessageAutoForwardMode()) $gameTemp.setMessageAutoForwardMode(false);
        if ($gameTemp.isExtendedFastForwardMode()) $gameTemp.setExtendedFastForwardMode(false);
    };
    const updateMessage = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        updateMessage.apply(this,arguments);
        this.updateExtMsgFuncResetTimers();
    };
    const initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(...args) {
        initialize.apply(this,args);
        this._autoForwardCount = 0;
    };
    const newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(state) {
        const result = newPage.call(this,state);
        this._autoForwardCount = 0;
        return result;
    };
    Window_Message.prototype.addAutoForwardDelay = function(state) {
        this._autoForwardCount = Math.max(0,this._autoForwardCount) + (state.buffer || '').length * Window_Message.AUTO_FORWARD_DELAY_PER_CHAR;
    };
    const flushTextState = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function(state) {
        if (this.constructor.name === "Window_Message") this.addAutoForwardDelay(state);
        return flushTextState.call(this,state);
    };
    const startPause = Window_Message.prototype.startPause;
    Window_Message.prototype.startPause = function() {
        const result = startPause.apply(this,arguments);
        this._autoForwardCount = Math.max(this._autoForwardCount,Window_Message.AUTO_FORWARD_MIN_DELAY);
        return result;
    };
    const isTriggered = messageTriggerBeforeExtended;
    Window_Message.prototype.autoForwardTriggered = function() {
        this._autoForwardCount = this._autoForwardCount || 0;
        if (isTriggered.call(this)) {
            SoundManager.playCancel();
            $gameTemp.setMessageAutoForwardMode(false);
            return true;
        }
        return this._autoForwardCount-- <= 0;
    };
    Window_Message.prototype.isTriggered = function() {
        if (SceneManager._scene.isExtendedFastForwardMode()) return true;
        return this.pause && $gameTemp.isMessageAutoForwardMode() ? this.autoForwardTriggered() : isTriggered.call(this);
    };
}
installExtendedModes();
