function installExtendedCursor() {
    Game_System.prototype.initMessageCursorSettings = function() {
        this._msgCursorSettings = JsonEx.makeDeepCopy(extendedApi.settings.MsgCursor);
    };
    Game_System.prototype.getMessageCursorSettings = function() {
        if (this._msgCursorSettings === undefined) this.initMessageCursorSettings();
        return this._msgCursorSettings;
    };
    Game_System.prototype.setMessageCursorSettings = function(settings) {
        if (this._msgCursorSettings === undefined) this.initMessageCursorSettings();
        this._msgCursorSettings = JsonEx.makeDeepCopy(settings);
    };
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        initialize.call(this);
        this.initMessageButtonConsole();
        this.initExtendedFastForward();
        this.initMessageCursorSettings();
    };
    extendedApi.registerCommand('MessageCursorSettings', function(args) {
        $gameSystem.setMessageCursorSettings(args.MsgCursor);
        const window = SceneManager._scene._messageWindow;
        if (window) {
            window._createPauseSignSprites();
            window._refreshPauseSign();
        }
    });
    Window_Message.prototype.isCustomMessageCursorEnabled = function() {
        return $gameSystem.getMessageCursorSettings().Enable;
    };
    Window_Message.prototype._createPauseSignSprites = function() {
        if (this.isCustomMessageCursorEnabled()) {
            this.removeExistingPauseSignSprites();
            this.createCustomMessageCursorPauseSignSprites();
        } else Window_Base.prototype._createPauseSignSprites.call(this);
    };
    Window_Message.prototype.removeExistingPauseSignSprites = function() {
        if (this._pauseSignSprite) this.removeChild(this._pauseSignSprite);
    };
    Window_Message.prototype.createCustomMessageCursorPauseSignSprites = function() {
        const settings = $gameSystem.getMessageCursorSettings();
        this._pauseSignSprite = new Sprite();
        this.addChild(this._pauseSignSprite);
        this._pauseSignSprite.anchor.x = settings.AnchorX;
        this._pauseSignSprite.anchor.y = settings.AnchorY;
        this._pauseSignAnimationCount = 0;
    };
    Window_Message.prototype._refreshPauseSign = function() {
        if (this.isCustomMessageCursorEnabled()) this.refreshCustomMessageCursorPauseSign();
        else {
            Window_Base.prototype._refreshPauseSign.call(this);
            this.updatePauseSignHeightextMsgFunction();
        }
    };
    Window_Message.prototype.refreshCustomMessageCursorPauseSign = function() {
        const sprite = this._pauseSignSprite;
        if (!sprite) return;
        const settings = $gameSystem.getMessageCursorSettings();
        const type = settings.GraphicType.toLowerCase().trim();
        if (type === 'image') sprite.bitmap = ImageManager.loadSystem(settings.Filename);
        else if (type === 'windowskin') {
            sprite.bitmap = this._windowskin;
            sprite.setFrame(144,96,24,24);
        } else sprite.bitmap = ImageManager.loadSystem('IconSet');
    };
    Window_Message.prototype.updatePauseSignHeightextMsgFunction = function() {
        if (!this._pauseSignSprite || !$gameSystem.isMessageButtonConsoleVisible() || this._currentAutoSize) return;
        this._pauseSignSprite.y -= Window_ButtonConsole.BUTTON_HEIGHT;
    };
    Window_Message.prototype._updatePauseSign = function() {
        if (this.isCustomMessageCursorEnabled()) this.updateCustomMessageCursorPauseSignSprites();
        else Window_Base.prototype._updatePauseSign.call(this);
    };
    Window_Message.prototype.updateCustomMessageCursorPauseSignSprites = function() {
        if (this._cache_customMessageCursorFrameCount === Graphics.frameCount) return;
        this._cache_customMessageCursorFrameCount = Graphics.frameCount;
        const sprite = this._pauseSignSprite;
        if (!sprite || sprite.bitmap.width <= 0) return;
        const settings = $gameSystem.getMessageCursorSettings();
        const type = settings.GraphicType.toLowerCase().trim();
        sprite.alpha = this.isAnySubWindowActive() || this.isClosing() ? 0 : 1;
        if (sprite.alpha <= 0) return;
        const duration = settings.Rows * settings.Cols * settings.FrameDelay;
        this._pauseSignAnimationCount++;
        while (this._pauseSignAnimationCount >= duration) this._pauseSignAnimationCount -= duration;
        if (type === 'image') this.updateImageMessageCursorPauseSignSprites();
        else if (type === 'windowskin') Window_Base.prototype._updatePauseSign.call(this);
        else this.updateIconMessageCursorPauseSignSprites();
    };
    Window_Message.prototype.updateImageMessageCursorPauseSignSprites = function() {
        const sprite = this._pauseSignSprite, settings = $gameSystem.getMessageCursorSettings();
        const index = Math.floor(this._pauseSignAnimationCount / settings.FrameDelay);
        const width = Math.floor(sprite.bitmap.width / settings.Cols), height = Math.floor(sprite.bitmap.height / settings.Rows);
        sprite.setFrame(index % settings.Cols * width, Math.floor(index / settings.Cols) * height, width, height);
        sprite.visible = this.isOpen();
    };
    Window_Message.prototype.updateIconMessageCursorPauseSignSprites = function() {
        const sprite = this._pauseSignSprite, settings = $gameSystem.getMessageCursorSettings();
        const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
        sprite.setFrame(settings.IconIndex % 16 * width, Math.floor(settings.IconIndex / 16) * height, width, height);
        sprite.visible = this.isOpen();
        if (settings.FlipMultiplier === 0) return;
        sprite.scale.x = Math.cos(Graphics.frameCount * settings.FlipMultiplier);
    };
    Window_Message.prototype.moveCustomMessageCursorPauseSign = function(state) {
        if (!state || !state.drawing || !this.isCustomMessageCursorEnabled() || !this._pauseSignSprite) return;
        const sprite = this._pauseSignSprite, settings = $gameSystem.getMessageCursorSettings();
        sprite.x = state.x + this.padding + settings.OffsetX + sprite.width / 2;
        sprite.x += this._contentsSprite.x;
        sprite.y = state.y + this.padding + state.height + settings.OffsetY;
        sprite.y += this._contentsSprite.y;
        sprite.x = Math.round(sprite.x.clamp(this.padding,this.width));
        sprite.y = Math.round(sprite.y.clamp(this.padding,this.height-this.padding));
    };
    const flush = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function(state) {
        flush.call(this,state);
        if (this.constructor.name === 'Window_Message') this.moveCustomMessageCursorPauseSign(state);
    };
}
installExtendedCursor();
