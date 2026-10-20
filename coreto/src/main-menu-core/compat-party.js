function installMainMenuPartyCompatibility() {
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_2_PartySystem) {
            for (const WindowClass of [Window_PartyActive, Window_PartyReserve]) {
                const drawItemImage = WindowClass.prototype.drawItemImage;
                WindowClass.prototype.drawItemImage = function(index) {
                    if (WindowClass._actorGraphic.toLowerCase().trim() === 'svbattler') this.drawItemImageSvActor(index);
                    else drawItemImage.call(this, index);
                };
            }
        }
        start.call(this);
    };
}
