function installWindows(settings) {
    const options = settings.Window;
    const initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(rect) {
        this.checkRectObject(rect);
        return initialize.call(this, new Rectangle(...[rect.x, rect.y, rect.width, rect.height].map(Math.round)));
    };
    for (const [method, field] of [["lineHeight", "LineHeight"], ["itemPadding", "ItemPadding"], ["translucentOpacity", "TranslucentOpacity"], ["openingSpeed", "OpenSpeed"]]) {
        Window_Base.prototype[method] = function() { return options[field]; };
    }
    Window_Base.prototype.updateOpen = function() {
        if (this._opening) {
            this.openness += this.openingSpeed();
            if (this.isOpen()) this._opening = false;
        }
    };
    Window_Base.prototype.updateClose = function() {
        if (this._closing) {
            this.openness -= this.openingSpeed();
            if (this.isClosed()) this._closing = false;
        }
    };
    // MZ 1.10 owns background opacity and the corrected 95px windowskin frame.
    for (const [method, field] of [["colSpacing", "ColSpacing"], ["rowSpacing", "RowSpacing"]]) {
        Window_Selectable.prototype[method] = function() { return options[field]; };
    }
    Window_Selectable.prototype.itemHeight = function() {
        return Window_Scrollable.prototype.itemHeight.call(this) + options.ItemHeight;
    };
    const nativeBackground = Window_Selectable.prototype.drawBackgroundRect;
    const background = options.DrawItemBackgroundJS ? compileAuthoredBody(options.DrawItemBackgroundJS, "/Window/DrawItemBackgroundJS") : null;
    Window_Selectable.prototype.drawBackgroundRect = function(rect) {
        if (!options.ShowItemBackground) return;
        if (!background) return nativeBackground.call(this, rect);
        try { return background.call(this, rect); }
        catch (error) { throw new CoreError("AUTHORED_CODE_FAILED", `/Window/DrawItemBackgroundJS: ${error.message}`, { field: "/Window/DrawItemBackgroundJS" }); }
    };
    const arrows = Window.prototype._refreshArrows;
    Window.prototype._refreshArrows = function() {
        arrows.call(this);
        this._upArrowSprite.move(Math.round(this.width / 2), 12);
        this._downArrowSprite.move(Math.round(this.width / 2), Math.round(this.height - 12));
    };
    const pauseSign = Window.prototype._refreshPauseSign;
    Window.prototype._refreshPauseSign = function() {
        pauseSign.call(this);
        this._pauseSignSprite.x = Math.round(this.width / 2);
        this._pauseSignSprite.alpha = 255;
    };
    const filterArea = Window.prototype._updateFilterArea;
    Window.prototype._updateFilterArea = function() {
        filterArea.call(this);
        this._clientArea.filterArea.width = Math.ceil(this.innerWidth * this.scale.x);
        this._clientArea.filterArea.height = Math.ceil(this.innerHeight * this.scale.y);
    };
    const mapName = Window_MapName.prototype.refresh;
    Window_MapName.prototype.refresh = function() {
        if (!settings.QoL.MapNameTextCode) return mapName.call(this);
        return this.refreshWithTextCodeSupport();
    };
    Window_MapName.prototype.refreshWithTextCodeSupport = function() {
        this.contents.clear();
        const name = $gameMap.displayName();
        if (name) {
            this.drawBackground(0, 0, this.innerWidth, this.lineHeight());
            this.drawTextEx(name, Math.floor((this.innerWidth - this.textSizeEx(name).width) / 2), 0);
        }
    };
}
