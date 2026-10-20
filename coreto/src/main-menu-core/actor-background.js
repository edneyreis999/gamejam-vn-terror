function installMainMenuActorBackground(settings) {
    function Sprite_MenuBackgroundActor() { this.initialize(...arguments); }
    Sprite_MenuBackgroundActor.prototype = Object.create(Sprite.prototype);
    Sprite_MenuBackgroundActor.prototype.constructor = Sprite_MenuBackgroundActor;
    Sprite_MenuBackgroundActor.prototype.initialize = function() {
        this._actor = null;
        this._bitmapReady = false;
        Sprite.prototype.initialize.call(this);
        this.x = Graphics.width;
    };
    Sprite_MenuBackgroundActor.prototype.setActor = function(actor) {
        if (this._actor === actor) return;
        this._actor = actor;
        this.loadBitmap();
    };
    Sprite_MenuBackgroundActor.prototype.loadBitmap = function() {
        this._bitmapReady = false;
        const actor = this._actor, generation = this._loadGeneration = (this._loadGeneration || 0) + 1;
        const bitmap = this.bitmap = actor ? ImageManager.loadPicture(actor.getMenuImage()) : new Bitmap(1, 1);
        if (actor) bitmap.addLoadListener(() => {
            if (!this._destroyed && this._loadGeneration === generation && this._actor === actor && this.bitmap === bitmap) this.onBitmapLoad();
        });
    };
    Sprite_MenuBackgroundActor.prototype.onBitmapLoad = function() {
        this._bitmapReady = true;
        settings.General.ActorBgMenuJS.call(this);
    };
    Sprite_MenuBackgroundActor.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this._bitmapReady) {
            this.updateOpacity(); this.updatePosition(); this.updateDuration();
        }
    };
    Sprite_MenuBackgroundActor.prototype.updateOpacity = function() {
        if (this._duration > 0) this.opacity = (this.opacity * (this._duration - 1) + 255) / this._duration;
    };
    Sprite_MenuBackgroundActor.prototype.updatePosition = function() {
        if (this._duration > 0) {
            this.x = (this.x * (this._duration - 1) + this._targetX) / this._duration;
            this.y = (this.y * (this._duration - 1) + this._targetY) / this._duration;
        }
    };
    Sprite_MenuBackgroundActor.prototype.updateDuration = function() { if (this._duration > 0) this._duration--; };
    globalThis.Sprite_MenuBackgroundActor = Sprite_MenuBackgroundActor;
    const createBackground = Scene_MenuBase.prototype.createBackground;
    Scene_MenuBase.prototype.createBackground = function() {
        createBackground.call(this);
        this.createActorMenuBackgroundImageSprite();
    };
    Scene_MenuBase.prototype.createActorMenuBackgroundImageSprite = function() {
        this._actorMenuBgSprite = new Sprite_MenuBackgroundActor();
        this.addChild(this._actorMenuBgSprite);
    };
    Scene_MenuBase.prototype.isDisplayActorMenuBackgroundImage = function() { return settings.General.ActorBgMenus.includes(this.constructor.name); };
    const updateActor = Scene_MenuBase.prototype.updateActor;
    Scene_MenuBase.prototype.updateActor = function() {
        updateActor.call(this);
        if (this.isDisplayActorMenuBackgroundImage() && this._actorMenuBgSprite) this._actorMenuBgSprite.setActor(this._actor);
    };
}
