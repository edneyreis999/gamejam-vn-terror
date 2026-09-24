function prepareWindowCommands(entries, path) {
    return entries.map((entry, index) => Object.fromEntries(Object.entries(entry).map(([key, value]) =>
        [key, key.endsWith("JS") ? authoredCallback(value, `${path}/${index}/${key}`) : value])));
}

function installWindowCommands(WindowClass, entries, path) {
    WindowClass._commandList = prepareWindowCommands(entries, path);
    WindowClass.prototype.makeCommandList = function() { this.makeCoreEngineCommandList(); };
    WindowClass.prototype.makeCoreEngineCommandList = function() {
        for (const entry of WindowClass._commandList) {
            if (!entry.ShowJS.call(this)) continue;
            const text = !entry.TextStr || entry.TextStr === "Untitled" ? entry.TextJS.call(this) : entry.TextStr;
            const enabled = entry.EnableJS.call(this);
            const ext = entry.ExtJS.call(this);
            this.addCommand(text, entry.Symbol, enabled, ext);
            this.setHandler(entry.Symbol, entry.CallHandlerJS.bind(this, ext));
        }
    };
}

function installTitle(settings) {
    const title = settings.MenuLayout.Title;
    Scene_Title.subtitle = title.Subtitle;
    Scene_Title.version = title.Version;
    const updateDocumentTitle = Scene_Boot.prototype.updateDocumentTitle;
    Scene_Boot.prototype.isFullDocumentTitle = function() {
        return !!Scene_Title.subtitle && Scene_Title.subtitle !== "Subtitle" &&
            !!Scene_Title.version && Scene_Title.version !== "0.00";
    };
    Scene_Boot.prototype.makeDocumentTitle = function() {
        document.title = title.DocumentTitleFmt.format($dataSystem.gameTitle, Scene_Title.subtitle || "", Scene_Title.version || "");
    };
    Scene_Boot.prototype.updateDocumentTitle = function() {
        if (this.isFullDocumentTitle()) this.makeDocumentTitle();
        else updateDocumentTitle.call(this);
    };
    for (const method of ["drawGameSubtitle", "drawGameVersion"]) {
        Scene_Title.prototype[method] = authoredCallback(title[method], `/MenuLayout/Title/${method}`);
    }
    const drawTitle = authoredCallback(title.drawGameTitle, "/MenuLayout/Title/drawGameTitle");
    Scene_Title.prototype.drawGameTitle = function() {
        drawTitle.call(this);
        if (Scene_Title.subtitle && Scene_Title.subtitle !== "Subtitle") this.drawGameSubtitle();
        if (Scene_Title.version && Scene_Title.version !== "0.00") this.drawGameVersion();
    };
    Scene_Title.prototype.commandWindowRect = authoredCallback(title.CommandRect, "/MenuLayout/Title/CommandRect");
    Scene_Title.prototype.commandWindowRows = function() {
        return this._commandWindow ? this._commandWindow.maxItems() : settings.TitleCommandList.length;
    };
    installWindowCommands(Window_TitleCommand, settings.TitleCommandList, "/TitleCommandList");
    installWindowCommands(Window_GameEnd, settings.MenuLayout.GameEnd.CommandList, "/MenuLayout/GameEnd/CommandList");
    Scene_Title.prototype.createCommandWindow = function() {
        this.createTitleButtons();
        this._commandWindow = new Window_TitleCommand(this.commandWindowRect());
        this._commandWindow.setBackgroundType($dataSystem.titleCommandWindow.background);
        const rect = this.commandWindowRect();
        this._commandWindow.move(rect.x, rect.y, rect.width, rect.height);
        this._commandWindow.createContents();
        this._commandWindow.refresh();
        this._commandWindow.selectLast();
        this.addWindow(this._commandWindow);
    };
    Scene_GameEnd.prototype.createCommandWindow = function() {
        this._commandWindow = new Window_GameEnd(this.commandWindowRect());
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };
    const selectLast = Window_TitleCommand.prototype.selectLast;
    Window_TitleCommand.prototype.selectLast = function() {
        selectLast.call(this);
        if (!Window_TitleCommand._lastCommandSymbol) return;
        const index = this.findSymbol(Window_TitleCommand._lastCommandSymbol);
        this.smoothSelect(index);
        if (this._scrollDuration > 1) {
            this._scrollDuration = 1;
            this.updateSmoothScroll();
        }
        this.setTopRow(index - (Math.floor(this.maxVisibleItems() / 2) - 1));
    };
    Scene_Title.pictureButtons = prepareWindowCommands(settings.TitlePicButtons, "/TitlePicButtons");
    class Sprite_TitlePictureButton extends Sprite_Clickable {
        initialize(data) {
            super.initialize();
            this._data = data;
            this._clickHandler = null;
            this.setup();
        }
        setup() {
            this.x = Graphics.width;
            this.y = Graphics.height;
            this.visible = false;
            this.setupButtonImage();
        }
        _onBitmapChange() { updateSpriteImageListener(this); }
        setupButtonImage() {
            this.bitmap = ImageManager.loadPicture(this._data.PictureFilename);
            this._coretoButtonLoad = () => this.onButtonImageLoad();
            this.bitmap.addLoadListener(this._coretoButtonLoad);
        }
        onButtonImageLoad() {
            this._data.OnLoadJS.call(this);
            this._data.PositionJS.call(this);
            this.setClickHandler(this._data.CallHandlerJS.bind(this));
        }
        update() {
            super.update();
            this.updateOpacity();
        }
        fadeSpeed() { return title.ButtonFadeSpeed; }
        updateOpacity() {
            if (this._pressed || this._hovered) this.opacity = 255;
            else this.opacity = Math.min(192, this.opacity + (this.visible ? 1 : -1) * this.fadeSpeed());
        }
        setClickHandler(handler) { this._clickHandler = handler; }
        onClick() { this._clickHandler?.(); }
        destroy(...args) {
            releaseSpriteImageListener(this);
            const index = this.bitmap._loadListeners.indexOf(this._coretoButtonLoad);
            if (index >= 0) this.bitmap._loadListeners.splice(index, 1);
            this._coretoButtonLoad = null;
            this._clickHandler = null;
            super.destroy(...args);
        }
    }
    globalThis.Sprite_TitlePictureButton = Sprite_TitlePictureButton;
    Scene_Title.prototype.createTitleButtons = function() {
        for (const data of Scene_Title.pictureButtons) this.addChild(new Sprite_TitlePictureButton(data));
    };
}
