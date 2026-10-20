function installBattleOptions(settings) {
    SceneManager.checkSceneBattleTransitionable = function(sceneClass) { return sceneClass === Scene_Options; };
    SceneManager.isNextSceneBattleTransitionable = function() { return this.checkSceneBattleTransitionable(this._nextScene?.constructor); };
    SceneManager.isPreviousSceneBattleTransitionable = function() { return this.checkSceneBattleTransitionable(this._previousClass); };
    const scene = Scene_Battle.prototype;
    scene.isQueueOptionsMenu = function() { return BattleManager.isActiveTpb(); };
    scene.commandOptions = function() {
        this._callSceneOptions = true;
        if (this.isQueueOptionsMenu()) {
            this._helpWindow.setText(settings.PartyCmd.ActiveTpbOptionsMessage);
            this._helpWindow.show();
        } else this.callOptions();
    };
    scene.callOptions = function() {
        this._callSceneOptions = false;
        SceneManager.push(Scene_Options);
        if (BattleManager.isTpb()) BattleManager._tpbSceneChangeCacheActor = BattleManager.actor();
    };
    const update = scene.updateBattleProcess;
    scene.updateBattleProcess = function() {
        update.call(this);
        if (this._callSceneOptions && !BattleManager._subject && BattleManager._phase !== 'action' && !this._spriteset.isAnimationPlaying()) this.callOptions();
    };
    BattleManager.revertTpbCachedActor = function() {
        const actor = this._tpbSceneChangeCacheActor;
        this._tpbSceneChangeCacheActor = null;
        if (actor && $gameParty.battleMembers().includes(actor)) {
            this._currentActor = actor;
            actor._tpbState = 'charged';
            this._inputting = true;
        } else {
            this.cancelActorInput();
            this._currentActor = null;
            this._inputting = false;
        }
    };
    const checkTpbInputClose = BattleManager.checkTpbInputClose;
    BattleManager.checkTpbInputClose = function() {
        if (this._tpbSceneChangeCacheActor && (!this.isPartyTpbInputtable() || this.needsActorInputCancel())) this.revertTpbCachedActor();
        else checkTpbInputClose.call(this);
    };
    const start = scene.start;
    scene.start = function() {
        if (!SceneManager.isPreviousSceneBattleTransitionable() || !$gameParty.inBattle()) return start.call(this);
        Scene_Message.prototype.start.call(this);
        if (BattleManager._tpbSceneChangeCacheActor) BattleManager.revertTpbCachedActor();
        this._coretoPartyCommandVisited = true;
        this._statusWindow.refresh();
        this.startFadeIn(this.fadeSpeed(),false);
        this.changeInputWindow();
    };
    const terminate = scene.terminate;
    scene.terminate = function() {
        if (!SceneManager.isNextSceneBattleTransitionable()) return terminate.call(this);
        Scene_Message.prototype.terminate.call(this);
    };
}
