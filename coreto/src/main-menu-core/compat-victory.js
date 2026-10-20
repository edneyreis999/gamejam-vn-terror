function installMainMenuVictoryCompatibility() {
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_3_VictoryAftermath) {
            const onLevelUp = Scene_Battle.prototype.onVictoryStepLevelUpMember;
            Scene_Battle.prototype.onVictoryStepLevelUpMember = function(actor) {
                if (Window_VictoryLevelUp._showBust) ImageManager.loadPicture(actor.getMenuImage());
                return onLevelUp.call(this, actor);
            };
            const setActor = Window_VictoryLevelUp.prototype.setActor;
            Window_VictoryLevelUp.prototype.setActor = function(actor) {
                if (Window_VictoryLevelUp._showBust) this._actorSprite.bitmap = ImageManager.loadPicture(actor.getMenuImage());
                return setActor.call(this, actor);
            };
        }
        start.call(this);
    };
}
