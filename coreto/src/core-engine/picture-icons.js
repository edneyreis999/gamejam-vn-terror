function installPictureIcons() {
    const command = catalog.commands.find(command => command.key === "PictureShowIcon");
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        const args = convertEventArguments(command, raw);
        const id = Math.min(Math.max(Math.round(args.PictureID), 1), 100);
        const options = args.Settings;
        const name = `VisuMZ CoreEngine PictureIcon ${args.IconIndex} ${args.Smooth ? "Smooth" : "Pixelated"}`;
        $gameScreen.showPicture(id, name, Math.min(Math.max(options.Origin, 0), 1),
            Math.round(options.PositionX || 0), Math.round(options.PositionY || 0),
            Math.round(options.ScaleX || 0), Math.round(options.ScaleY || 0),
            Math.min(Math.max(Math.round(options.Opacity), 0), 255), options.BlendMode);
    });
    const load = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function(...args) {
        const icon = this._pictureName.match(/VisuMZ CoreEngine PictureIcon (\d+)/i);
        if (!icon) return load.apply(this, args);
        const index = Number(icon[1]);
        const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
        const bitmap = new Bitmap(width, height);
        bitmap.markCoreEngineModified();
        bitmap.smooth = /SMOOTH/i.test(this._pictureName);
        this.bitmap = bitmap;
        const source = ImageManager.loadSystem("IconSet");
        source.addLoadListener(() => {
            if (this.bitmap !== bitmap || !bitmap._baseTexture) return;
            bitmap.blt(source, index % 16 * width, Math.floor(index / 16) * height, width, height, 0, 0);
        });
    };
    const update = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function(...args) {
        const previous = this.bitmap;
        const result = update.apply(this, args);
        if (previous !== this.bitmap) releaseModifiedBitmap(previous);
        return result;
    };
}
