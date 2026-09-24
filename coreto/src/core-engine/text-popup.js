function installTextPopups(settings) {
    const options = settings.Window;
    function Window_TextPopup() { this.initialize(...arguments); }
    Window_TextPopup.prototype = Object.create(Window_Base.prototype);
    Window_TextPopup.prototype.constructor = Window_TextPopup;
    Window_TextPopup.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, 1, 1));
        this.openness = 0;
        this._text = "";
        this._queue = [];
        this._duration = 0;
    };
    Window_TextPopup.prototype.isAutoColorAffected = function() { return true; };
    Window_TextPopup.prototype.addQueue = function(text) {
        if (this._queue.at(-1) !== text) this._queue.push(text);
        if (this.parent) this.parent.addChild(this);
    };
    Window_TextPopup.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateText();
        this.updateDuration();
    };
    Window_TextPopup.prototype.updateText = function() {
        if (this._text || !this._queue.length || !this.isClosed()) return;
        this._text = this._queue.shift();
        this._duration = Math.ceil(this._text.length * options.DurationPerChat).clamp(options.MinDuration, options.MaxDuration);
        const size = this.textSizeEx(this._text);
        const width = size.width + 2 * this.itemPadding() + 2 * $gameSystem.windowPadding();
        const height = Math.max(size.height, this.lineHeight()) + 2 * $gameSystem.windowPadding();
        this.move(Math.round((Graphics.width - width) / 2), Math.round((Graphics.height - height) / 2), width, height);
        this.createContents();
        this.refresh();
        this.open();
        if (this.parent) this.parent.addChild(this);
    };
    Window_TextPopup.prototype.refresh = function() {
        this.contents.clear();
        const rect = this.baseTextRect();
        this.drawTextEx(this._text, rect.x, rect.y, rect.width);
    };
    Window_TextPopup.prototype.updateDuration = function() {
        if (this.isOpening() || this.isClosing()) return;
        if (this._duration > 0 && --this._duration <= 0) {
            this.close();
            this._text = "";
        }
    };
    Window_TextPopup.prototype.destroy = function(...args) {
        this._queue.length = 0;
        this._text = "";
        this._duration = 0;
        return Window_Base.prototype.destroy.apply(this, args);
    };
    Window_TextPopup.prototype.clearCorePopup = function() {
        this._queue.length = 0;
        this._text = '';
        this._duration = 0;
        this._opening = this._closing = false;
        this.openness = 0;
        this.contents.clear();
    };
    for (const method of ['createGameObjects', 'extractSaveContents']) {
        const previous = DataManager[method];
        DataManager[method] = function(...args) {
            const popup = SceneManager._scene?._textPopupWindow;
            if (popup && !popup._destroyed) popup.clearCorePopup();
            return previous.apply(this, args);
        };
    }
    globalThis.Window_TextPopup = Window_TextPopup;
    Scene_Base.prototype.createTextPopupWindow = function() {
        this._textPopupWindow = new Window_TextPopup();
        this.addChild(this._textPopupWindow);
    };
    const createLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        createLayer.call(this);
        this._windowLayer.x = Math.round(this._windowLayer.x);
        this._windowLayer.y = Math.round(this._windowLayer.y);
        this.createTextPopupWindow();
    };
    globalThis.$textPopup = function(text) {
        SceneManager._scene?._textPopupWindow?.addQueue(text);
    };
    const command = catalog.commands.find(command => command.key === "TextPopupShow");
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        $textPopup(convertEventArguments(command, raw).text || "");
    });
}
