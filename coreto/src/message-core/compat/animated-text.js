function installMessageFlushHooks() {
    // These are the public extension points chained by the unchanged consumers.
    Window_Message.prototype.preFlushTextState = function(textState) {};
    Window_Message.prototype.postFlushTextState = function(textState) {};
    Window_Message.prototype.flushTextState = function(textState) {
        this.preFlushTextState(textState);
        Window_Base.prototype.flushTextState.call(this,textState);
        this.postFlushTextState(textState);
    };
    let installed = false;
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this,args);
        if (installed || !Imported.VisuMZ_2_AniMsgTextEffects) return result;
        installed = true;
        const clear = Window_Message.prototype.clearTextEffects;
        Window_Message.prototype.clearTextEffects = function() {
            const children = [...(this._AniMsgTextEffectsContainer?.children || [])];
            clear.call(this);
            for (const sprite of children) {
                const ownBitmap = sprite._textState.iconIndex === undefined ? sprite.bitmap : null;
                if (!sprite._destroyed) sprite.destroy();
                if (ownBitmap) ownBitmap.destroy();
                sprite._msgWindow = null;
            }
        };
        const destroy = Window_Message.prototype.destroy;
        Window_Message.prototype.destroy = function(...args) {
            this.clearTextEffects();
            return destroy.apply(this,args);
        };
        return result;
    };
}
installMessageFlushHooks();
