function installMainMenuClassCompatibility() {
    const baseImage = Game_Actor.prototype.getMenuImage;
    const start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        if (globalThis.Imported?.VisuMZ_2_ClassChangeSystem) {
            const consumerImage = Game_Actor.prototype.getMenuImage;
            Game_Actor.prototype.getMenuImage = function() {
                const image = consumerImage.call(this);
                if (this._priorityMenuImage !== undefined || image) return image;
                return ImageManager.getActorClassMenuPortrait(this) || baseImage.call(this);
            };
            Window_ClassStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
                switch (this.graphicType()) {
                    case 'none': return;
                    case 'sprite': return this.prepareDrawActorSprite(actor, x, y, width, height);
                    case 'svbattler': return this.prepareDrawActorSvBattler(actor, x, y, width, height);
                    default: return this.prepareDrawActorFace(actor, x, y, width, height);
                }
            };
            Window_ClassStatus.prototype.isMainMenuCoreMenuImageOptionAvailable = function() {
                return this._actor.getMenuImage() !== '' && VisuMZ.ClassChangeSystem.Settings.Window.MenuPortraits;
            };
        }
        start.call(this);
    };
}
