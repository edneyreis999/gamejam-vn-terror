function installRenderOptions(settings) {
    const options = settings.QoL;
    const stretch = Graphics._defaultStretchMode;
    Graphics._defaultStretchMode = function(...args) {
        if (options.AutoStretch === "stretch") return true;
        if (options.AutoStretch === "normal") return false;
        return stretch.apply(this, args);
    };
    const center = Graphics._centerElement;
    Graphics._centerElement = function(element) {
        const result = center.call(this, element);
        if (options.PixelateImageRendering) element.style["image-rendering"] = "pixelated";
        element.style.width = `${Math.max(0, Math.floor(element.width * this._realScale))}px`;
        element.style.height = `${Math.max(0, Math.floor(element.height * this._realScale))}px`;
        return result;
    };
    const initialize = Bitmap.prototype.initialize;
    Bitmap.prototype.initialize = function(...args) {
        const result = initialize.apply(this, args);
        this.smooth = !options.PixelateImageRendering;
        return result;
    };
    const createTextures = Tilemap.Renderer.prototype._createInternalTextures;
    Tilemap.Renderer.prototype._createInternalTextures = function(...args) {
        const result = createTextures.apply(this, args);
        for (const texture of this._internalTextures) {
            texture.scaleMode = options.PixelateImageRendering ? PIXI.SCALE_MODES.NEAREST : PIXI.SCALE_MODES.LINEAR;
        }
        return result;
    };
}
