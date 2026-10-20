function installMainMenuLayouts(settings) {
    Scene_Menu.prototype.commandWindowStyle = function() { return settings.CommandWindowStyle; };
    Scene_Menu.prototype.thinGoldWindow = function() { return this.commandWindowStyle() !== 'default' || settings.General.ThinGoldWindow; };
    Scene_Menu.prototype.applyThinnerGoldWindowRect = function(rect) {
        if (!this.thinGoldWindow()) return;
        const height = this.calcWindowHeight(1, false);
        if (settings.General.AutoGoldY) rect.y += rect.height - height;
        if (settings.General.AutoGoldHeight) rect.height = height;
    };
    const goldRect = Scene_Menu.prototype.goldWindowRect;
    Scene_Menu.prototype.goldWindowRect = function() {
        const style = this.commandWindowStyle();
        if (['top', 'thinTop', 'mobile'].includes(style)) return this.goldWindowRectTopStyle();
        if (['bottom', 'thinBottom'].includes(style)) return this.goldWindowRectBottomStyle();
        const rect = goldRect.call(this); this.applyThinnerGoldWindowRect(rect); return rect;
    };
    Scene_Menu.prototype.goldWindowRectTopStyle = function() {
        const width = this.mainCommandWidth(), height = this.calcWindowHeight(1, false);
        return new Rectangle(Graphics.boxWidth - width, this.mainAreaBottom() - height, width, height);
    };
    Scene_Menu.prototype.goldWindowRectBottomStyle = function() {
        const rect = this.goldWindowRectTopStyle(); rect.y = this.mainAreaTop(); return rect;
    };
    const commandRect = Scene_Menu.prototype.commandWindowRect;
    Scene_Menu.prototype.commandWindowRect = function() {
        const style = this.commandWindowStyle();
        if (style === 'default') {
            const rect = commandRect.call(this); this.adjustDefaultCommandWindowRect(rect); return rect;
        }
        return this['commandWindowRect' + style[0].toUpperCase() + style.slice(1) + 'Style']();
    };
    Scene_Menu.prototype.adjustDefaultCommandWindowRect = function(rect) {
        if (this.adjustCommandHeightByPlaytime?.()) rect.height -= this.playtimeWindowRect().height;
        if (this.adjustCommandHeightByVariable?.()) rect.height -= this.variableWindowRect().height;
    };
    for (const [name, bottom, thin] of [['Top', false, false], ['ThinTop', false, true], ['Bottom', true, false], ['ThinBottom', true, true]]) {
        Scene_Menu.prototype['commandWindowRect' + name + 'Style'] = function() {
            const height = this.calcWindowHeight(thin ? 1 : settings.CustomCmdWin.Rows, true);
            return new Rectangle(0, bottom ? this.mainAreaBottom() - height : this.mainAreaTop(), Graphics.boxWidth, height);
        };
    }
    Scene_Menu.prototype.commandWindowRectMobileStyle = function() {
        const height = Window_MenuCommand.prototype.fittingHeight(settings.CustomCmdWin.Rows);
        return new Rectangle(0, Math.round((Graphics.boxHeight - height) / 2), Graphics.boxWidth, height);
    };
    const statusRect = Scene_Menu.prototype.statusWindowRect;
    Scene_Menu.prototype.statusWindowRect = function() {
        const style = this.commandWindowStyle();
        if (['top', 'thinTop'].includes(style)) return this.statusWindowRectTopStyle();
        if (['bottom', 'thinBottom'].includes(style)) return this.statusWindowRectBottomStyle();
        if (style === 'mobile') return this.statusWindowRectMobileStyle();
        return statusRect.call(this);
    };
    Scene_Menu.prototype.statusWindowRectTopStyle = function() {
        return new Rectangle(0, this._commandWindow.y + this._commandWindow.height, Graphics.boxWidth,
            this.mainAreaHeight() - this._commandWindow.height - this._goldWindow.height);
    };
    Scene_Menu.prototype.statusWindowRectBottomStyle = function() {
        const rect = this.statusWindowRectTopStyle(); rect.y = this._goldWindow.y + this._goldWindow.height; return rect;
    };
    Scene_Menu.prototype.statusWindowRectMobileStyle = function() {
        const height = this.mainAreaHeight() - this._goldWindow.height;
        return new Rectangle(0, this.mainAreaBottom() - this._goldWindow.height - height, Graphics.boxWidth, height);
    };
    Window_MenuCommand.prototype.maxCols = function() {
        const style = SceneManager._scene.commandWindowStyle();
        if (['thinTop', 'thinBottom'].includes(style)) return this._list ? this.maxItems() : 4;
        return style === 'default' ? Window_Command.prototype.maxCols.call(this) : settings.CustomCmdWin.Cols;
    };
    Window_MenuCommand.prototype.itemHeight = function() {
        return SceneManager._scene.commandWindowStyle() === 'mobile' ? this.lineHeight() * settings.CustomCmdWin.MobileThickness + 8 : Window_Command.prototype.itemHeight.call(this);
    };
    Scene_Menu.prototype.adjustStatusWindowMobile = function() { if (this.commandWindowStyle() === 'mobile') this._statusWindow.openness = 0; };
    const createStatus = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() { createStatus.call(this); this.adjustStatusWindowMobile(); };
    for (const [method, open] of [['commandPersonal', true], ['commandFormation', true], ['onPersonalCancel', false], ['onFormationCancel', false]]) {
        const previous = Scene_Menu.prototype[method];
        Scene_Menu.prototype[method] = function() {
            if (method === 'commandPersonal' && this.isSoloQuickMode()) return previous.call(this);
            previous.call(this);
            if (this.commandWindowStyle() === 'mobile') this._statusWindow[open ? 'open' : 'close']();
        };
    }
}
