function installExtendedMessageCursorOwnership() {
    let installed = false;
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this, args);
        if (installed || !Imported.VisuMZ_2_ExtMessageFunc) return result;
        installed = true;
        const move = Window_Message.prototype.moveCustomMessageCursorPauseSign;
        Window_Message.prototype.moveCustomMessageCursorPauseSign = function(state) {
            if (state?.drawing) {
                this._messageCursorTextPosition = {x: state.x, y: state.y, height: state.height, drawing: true};
            }
            return move.call(this, state);
        };
        const newPage = Window_Message.prototype.newPage;
        Window_Message.prototype.newPage = function(state) {
            this._messageCursorTextPosition = null;
            return newPage.call(this, state);
        };
        const create = Window_Message.prototype._createPauseSignSprites;
        Window_Message.prototype._createPauseSignSprites = function() {
            const previous = this._pauseSignSprite;
            const result = create.apply(this, arguments);
            this._messageCursorNeedsPosition = true;
            // WORKAROUND: Ext 1.22 retains the custom sprite when switching to native; see MC-QA-023.
            if (previous && previous !== this._pauseSignSprite) {
                if (previous.parent === this) this.removeChild(previous);
                previous.destroy();
            }
            return result;
        };
        const update = Window_Message.prototype._updatePauseSign;
        Window_Message.prototype._updatePauseSign = function() {
            const result = update.apply(this, arguments);
            if (this._messageCursorNeedsPosition && this._messageCursorTextPosition &&
                this.isCustomMessageCursorEnabled() && this._pauseSignSprite.bitmap.width > 0) {
                move.call(this, this._messageCursorTextPosition);
                this._messageCursorNeedsPosition = false;
            }
            return result;
        };
        return result;
    };
}
installExtendedMessageCursorOwnership();
