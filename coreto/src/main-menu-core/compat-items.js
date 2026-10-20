function installMainMenuItemsCompatibility() {
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_1_ItemsEquipsCore) {
            Window_EquipStatus.prototype.isMainMenuCoreMenuImageOptionAvailable = function() {
                return this._actor.getMenuImage() !== '' && VisuMZ.ItemsEquipsCore.Settings.EquipScene.MenuPortraits;
            };
        }
        start.call(this);
    };
}
