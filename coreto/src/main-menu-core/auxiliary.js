function installMainMenuAuxiliary(settings) {
    function drawIconInRect(window, icon, rect) {
        const width = ImageManager.standardIconWidth || 32;
        window.drawIcon(icon, rect.x + Math.ceil((width - ImageManager.iconWidth) / 2), rect.y + (window.lineHeight() - ImageManager.iconHeight) / 2);
        rect.x += width + 4;
        rect.width -= width + 4;
    }
    function Window_ThinGold() { this.initialize(...arguments); }
    Window_ThinGold.prototype = Object.create(Window_Gold.prototype);
    Window_ThinGold.prototype.constructor = Window_ThinGold;
    Window_ThinGold.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_ThinGold.prototype.colSpacing = function() { return Window_Selectable.prototype.colSpacing.call(this); };

    function Window_Playtime() { this.initialize(...arguments); }
    Window_Playtime.prototype = Object.create(Window_Selectable.prototype);
    Window_Playtime.prototype.constructor = Window_Playtime;
    Window_Playtime.prototype.initialize = function(rect) {
        this._playtimeText = $gameSystem.playtimeText();
        this._timer = 60;
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    };
    Window_Playtime.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_Playtime.prototype.resetFontSettings = function() {
        Window_Selectable.prototype.resetFontSettings.call(this);
        this.contents.fontSize = settings.Playtime.FontSize;
    };
    Window_Playtime.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateTimer();
    };
    Window_Playtime.prototype.updateTimer = function() { if (this._timer-- > 0 && this._timer <= 0) this.refresh(); };
    Window_Playtime.prototype.refresh = function() {
        this._timer = 60;
        const rect = this.itemLineRect(0);
        this.contents.clear();
        this.drawTimeIcon(rect);
        this.drawTimeLabel(rect);
        this.drawPlaytime(rect);
    };
    Window_Playtime.prototype.drawTimeIcon = function(rect) { if (settings.Playtime.Icon > 0) drawIconInRect(this, settings.Playtime.Icon, rect); };
    Window_Playtime.prototype.drawTimeLabel = function(rect) {
        this.resetFontSettings();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(settings.Playtime.Time, rect.x, rect.y, rect.width, 'left');
        this.resetTextColor();
    };
    Window_Playtime.prototype.drawPlaytime = function(rect) { this.drawText($gameSystem.playtimeText(), rect.x, rect.y, rect.width, 'right'); };

    function Window_MenuVariables() { this.initialize(...arguments); }
    Window_MenuVariables.prototype = Object.create(Window_Selectable.prototype);
    Window_MenuVariables.prototype.constructor = Window_MenuVariables;
    Window_MenuVariables.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = settings.Variable.VarList;
        this.refresh();
    };
    Window_MenuVariables.prototype.itemHeight = function() { return this.lineHeight(); };
    Window_MenuVariables.prototype.maxCols = function() { return SceneManager._scene.commandWindowStyle() === 'default' ? 1 : settings.Variable.VarList.length; };
    Window_MenuVariables.prototype.maxItems = function() { return this._data.length; };
    Window_MenuVariables.prototype.resetFontSettings = function() {
        Window_Selectable.prototype.resetFontSettings.call(this);
        this.contents.fontSize = settings.Variable.FontSize;
        this.changeTextColor(ColorManager.systemColor());
    };
    // Native extension hook: variable rows have no default background.
    Window_MenuVariables.prototype.drawItemBackground = function() {};
    Window_MenuVariables.prototype.drawItem = function(index) {
        const id = this._data[index];
        if (id <= 0 || !$dataSystem.variables[id]) return;
        const rect = this.itemLineRect(index);
        this.resetFontSettings();
        let name = $dataSystem.variables[id].trim();
        const match = name.match(/\\I\[(\d+)\]/i);
        if (match) {
            name = name.replace(match[0], '').trim();
            if (Number(match[1]) > 0) drawIconInRect(this, Number(match[1]), rect);
        }
        this.drawText(name, rect.x, rect.y, rect.width, 'left');
        this.changeTextColor(ColorManager.normalColor());
        this.drawText($gameVariables.value(id), rect.x, rect.y, rect.width, 'right');
    };
    Object.assign(globalThis, {Window_ThinGold, Window_Playtime, Window_MenuVariables});
    Scene_Menu.prototype.createGoldWindow = function() {
        this._goldWindow = new (this.thinGoldWindow() ? Window_ThinGold : Window_Gold)(this.goldWindowRect());
        this.addWindow(this._goldWindow);
    };
    for (const [name, key, WindowClass] of [['Playtime', 'playtime', Window_Playtime], ['Variable', 'variable', Window_MenuVariables]]) {
        Scene_Menu.prototype['canCreate' + name + 'Window'] = function() { return settings[name].Enable; };
        Scene_Menu.prototype['adjustCommandHeightBy' + name] = function() { return this['canCreate' + name + 'Window']() && (settings[name].AdjustCommandHeight ?? true); };
        Scene_Menu.prototype['create' + name + 'Window'] = function() {
            if (!this['canCreate' + name + 'Window']()) return new Rectangle(0, 0, 0, 0);
            const window = new WindowClass(this[key + 'WindowRect']());
            this['_' + key + 'Window'] = window;
            window.setBackgroundType(settings[name].BgType);
            this.addWindow(window);
        };
        Scene_Menu.prototype[key + 'WindowRect'] = function() {
            const style = this.commandWindowStyle();
            if (['top', 'thinTop', 'mobile'].includes(style)) return this[key + 'WindowRectTopStyle']();
            if (['bottom', 'thinBottom'].includes(style)) return this[key + 'WindowRectBottomStyle']();
            return settings[name].WindowRect.call(this);
        };
        for (const placement of ['Top', 'Bottom']) {
            Scene_Menu.prototype[key + 'WindowRect' + placement + 'Style'] = function() {
                const width = key === 'playtime' ? this.mainCommandWidth() : Graphics.boxWidth - this._goldWindow.width - (this._playtimeWindow?.width || 0);
                const height = this.calcWindowHeight(1, false);
                const x = key === 'playtime' ? 0 : this._goldWindow.x - width;
                return new Rectangle(x, placement === 'Top' ? this.mainAreaBottom() - height : this.mainAreaTop(), width, height);
            };
        }
    }
    Scene_Menu.prototype.needsDummyWindow = function() { return !['default', 'mobile'].includes(this.commandWindowStyle()) && !this._variableWindow; };
    Scene_Menu.prototype.createDummyWindow = function() {
        if (!this.needsDummyWindow()) return;
        this._dummyWindow = new Window_Base(this.variableWindowRect());
        this._dummyWindow.setBackgroundType(settings.Variable.BgType);
        this.addWindow(this._dummyWindow);
    };
    const create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        create.call(this);
        this.createPlaytimeWindow();
        this.createVariableWindow();
        this.createDummyWindow();
    };
}
