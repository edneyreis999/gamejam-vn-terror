function installMessageLogViewport() {
    let installed = false;
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this, args);
        if (installed || !Imported.VisuMZ_3_MessageLog) return result;
        installed = true;
        const prototype = Window_MessageLog.prototype;
        const calculateHeight = prototype.calculateTextHeight;
        prototype.calculateTextHeight = function() {
            calculateHeight.call(this);
            const gl = Graphics.app?.renderer?.gl;
            this._messageLogViewportEntries = null;
            if (!gl || this._allTextHeight <= gl.getParameter(gl.MAX_TEXTURE_SIZE)) return;
            let top = this.lineHeight();
            this._messageLogViewportEntries = $gameSystem.getLoggedMessages().filter(Boolean).map(entry => {
                const speakerHeight = entry.speaker ? this.textSizeEx(entry.speaker).height : 0;
                const faceHeight = entry.faceName && Window_MessageLog.SHOW_FACES ? ImageManager.faceHeight : 0;
                const height = speakerHeight + Math.max(faceHeight, this.textSizeEx(entry.messageBody).height) + this.lineHeight();
                const layout = {entry, top, bottom: top + height};
                top += height;
                return layout;
            });
        };
        const contentsHeight = prototype.contentsHeight;
        prototype.contentsHeight = function() {
            return this._messageLogViewportEntries ? this.innerHeight : contentsHeight.call(this);
        };
        const drawAllText = prototype.drawAllText;
        prototype.drawAllText = function() {
            if (!this._messageLogViewportEntries) return drawAllText.call(this);
            this.scrollToBottom();
            this.drawMessageLogViewport();
        };
        prototype.drawMessageLogViewport = function() {
            this.contents.clear();
            this.contentsBack.clear();
            this.removeAllReplayVoiceSprites();
            const top = this.origin.y;
            const bottom = top + this.innerHeight;
            this._lineY = -top;
            this.drawHorzLine();
            for (const layout of this._messageLogViewportEntries) {
                if (layout.bottom < top) continue;
                if (layout.top > bottom) break;
                this._lineY = layout.top - top;
                this.resetFontSettings();
                this.drawMessageText(layout.entry);
                this.resetWordWrap();
            }
            this._messageLogViewportOrigin = top;
        };
        const update = prototype.update;
        prototype.update = function() {
            update.call(this);
            if (this._messageLogViewportEntries && this._messageLogViewportOrigin !== this.origin.y) this.drawMessageLogViewport();
        };
        const clientArea = prototype._updateClientArea;
        prototype._updateClientArea = function() {
            clientArea.call(this);
            // Scroll remains in history coordinates; the bitmap contains only the viewport.
            const top = this._messageLogViewportEntries ? this.origin.y : 0;
            this._contentsSprite.y = top;
            this._contentsBackSprite.y = top;
        };
        const addReplayVoiceSprite = prototype.addReplayVoiceSprite;
        prototype.addReplayVoiceSprite = function(entry, x, y) {
            return addReplayVoiceSprite.call(this, entry, x, y + (this._messageLogViewportEntries ? this.origin.y : 0));
        };
        return result;
    };
}
installMessageLogViewport();
