function releaseSpriteImageListener(sprite) {
    const subscription = sprite._coretoImageSubscription;
    if (!subscription) return;
    const index = subscription.bitmap._loadListeners.indexOf(subscription.listener);
    if (index >= 0) subscription.bitmap._loadListeners.splice(index, 1);
    sprite._coretoImageSubscription = null;
}

function updateSpriteImageListener(sprite) {
    releaseSpriteImageListener(sprite);
    sprite._refreshFrame = !!sprite.bitmap;
    if (!sprite.bitmap) {
        sprite.texture.frame = new Rectangle();
        return;
    }
    const listener = bitmap => sprite._onBitmapLoad(bitmap);
    sprite._coretoImageSubscription = { bitmap: sprite.bitmap, listener };
    sprite.bitmap.addLoadListener(listener);
}

class CoreMenuBackgroundSprite extends Sprite {
    _onBitmapChange() { updateSpriteImageListener(this); }
    destroy(...args) {
        releaseSpriteImageListener(this);
        super.destroy(...args);
    }
}

function installMenuBackgrounds(settings) {
    const subscriptions = new WeakMap();
    Scene_MenuBase.prototype.getCustomBackgroundSettings = function(name) {
        return settings.MenuBg[name] || settings.MenuBg.Scene_Unlisted;
    };
    Scene_MenuBase.prototype.getBackgroundOpacity = function() {
        return this.getCustomBackgroundSettings(this.constructor.name).SnapshotOpacity;
    };
    Scene_MenuBase.prototype.adjustSprite = function(sprite) {
        this.scaleSprite(sprite);
        this.centerSprite(sprite);
    };
    Scene_MenuBase.prototype.createCustomBackgroundImages = function() {
        const background = this.getCustomBackgroundSettings(this.constructor.name);
        if (!background.BgFilename1 && !background.BgFilename2) return;
        const listeners = [];
        subscriptions.set(this, listeners);
        for (const index of [1, 2]) {
            const bitmap = ImageManager[`loadTitle${index}`](background[`BgFilename${index}`]);
            const sprite = this[`_backSprite${index}`] = new CoreMenuBackgroundSprite(bitmap);
            this.addChild(sprite);
            const onLoad = () => this.adjustSprite(sprite);
            listeners.push({ bitmap, onLoad });
            bitmap.addLoadListener(onLoad);
        }
    };
    Scene_MenuBase.prototype.createBackground = function() {
        this._backgroundFilter = new PIXI.filters.BlurFilter(settings.MenuBg.BlurStrength);
        this._backgroundSprite = new Sprite(SceneManager.backgroundBitmap());
        this._backgroundSprite.filters = [this._backgroundFilter];
        this.addChild(this._backgroundSprite);
        this.setBackgroundOpacity(this.getBackgroundOpacity());
        this.createCustomBackgroundImages();
    };
    Scene_GameEnd.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
    };
    const destroy = Scene_MenuBase.prototype.destroy;
    Scene_MenuBase.prototype.destroy = function(...args) {
        for (const { bitmap, onLoad } of subscriptions.get(this) || []) {
            const index = bitmap._loadListeners.indexOf(onLoad);
            if (index >= 0) bitmap._loadListeners.splice(index, 1);
        }
        subscriptions.delete(this);
        if (this._backgroundSprite) this._backgroundSprite.filters = null;
        this._backgroundFilter?.destroy();
        this._backgroundFilter = null;
        destroy.apply(this, args);
    };
}
