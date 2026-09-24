function installExtendedMenus() {
    const push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        push.call(this,sceneClass);
        if ([Scene_SaveButtonConsole,Scene_Save,Scene_Load].includes(sceneClass)) this.loadPartyGraphics();
    };
    SceneManager.loadPartyGraphics = function() {
        for (const actor of $gameParty.members()) {
            if (actor.faceName()) ImageManager.loadFace(actor.faceName());
            if (actor.characterName()) ImageManager.loadCharacter(actor.characterName());
            if (actor.battlerName()) ImageManager.loadSvActor(actor.battlerName());
        }
    };
    const command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        this._lastExtMsgFuncIndex = this._index;
        return command101.call(this,params);
    };
    Scene_SaveButtonConsole.prototype.onSavefileOk = function() {
        this._cachedIndex = 0;
        let interpreter = $gameMap._interpreter;
        while (interpreter._childInterpreter) interpreter = interpreter._childInterpreter;
        this._cachedIndex = interpreter._index;
        interpreter._index = interpreter._lastExtMsgFuncIndex;
        Scene_Save.prototype.onSavefileOk.call(this);
        interpreter._index = this._cachedIndex;
    };
    Scene_SaveButtonConsole.prototype.getCustomBackgroundSettings = function() {
        return Scene_Save.prototype.getCustomBackgroundSettings.call(this,'Scene_Save');
    };
}
installExtendedMenus();
