function installPictureContainers(settings) {
    const options = settings.QoL;
    const scales = new WeakMap();
    const detached = spriteset => spriteset instanceof Spriteset_Map ? options.DetachMapPictureContainer :
        spriteset instanceof Spriteset_Battle && options.DetachBattlePictureContainer;
    const initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function(...args) {
        const result = initialize.apply(this, args);
        scales.set(this, { x: this.scale.x, y: this.scale.y });
        return result;
    };
    Spriteset_Base.prototype.updatePictureAntiZoom = function() {
        if (!options.AntiZoomPictures) return;
        const previous = scales.get(this);
        if (previous?.x === this.scale.x && previous.y === this.scale.y) return;
        if (!detached(this)) {
            for (const axis of ["x", "y"]) {
                if (this.scale[axis] !== 0) {
                    this._pictureContainer.scale[axis] = 1 / this.scale[axis];
                    this._pictureContainer[axis] = -this[axis] / this.scale[axis];
                }
            }
        }
        // Reference compensation changes with scale, not with translation-only frames.
        scales.set(this, { x: this.scale.x, y: this.scale.y });
    };
    const update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function(...args) {
        const result = update.apply(this, args);
        this.updatePictureAntiZoom();
        return result;
    };
    for (const Scene of [Scene_Map, Scene_Battle]) {
        const create = Scene.prototype.createSpriteset;
        Scene.prototype.createSpriteset = function(...args) {
            const result = create.apply(this, args);
            this.addChild(this._spriteset._timerSprite);
            if (detached(this._spriteset)) this.addChild(this._spriteset._pictureContainer);
            return result;
        };
    }
}
