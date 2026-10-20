function installMainMenuBattleCompatibility() {
    if (!globalThis.Imported?.VisuMZ_1_BattleCore || globalThis.Imported.Coreto_1_BattleCore) return;
    const filename = Game_Actor.prototype.getBattlePortraitFilename;
    Game_Actor.prototype.getBattlePortraitFilename = function() {
        return filename.call(this) || this.getMenuImage();
    };
    const showPortraits = Window_BattleStatus.prototype.showPortraits;
    Window_BattleStatus.prototype.showPortraits = function(actor) {
        return showPortraits.call(this, actor) ||
            (VisuMZ.BattleCore.Settings.BattleLayout.ShowPortraits && !!actor.getMenuImage());
    };
}
