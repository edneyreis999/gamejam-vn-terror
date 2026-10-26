function installSkillsStatesSkillPresentation(settings, raw) {
    const scene = Scene_Skill.prototype;
    scene.isUseSkillsStatesCoreUpdatedLayout = () => settings.EnableLayout;
    scene.updatedLayoutStyle = () => settings.LayoutStyle;
    scene.isUseModernControls = function() { return this._categoryWindow && this._categoryWindow.isUseModernControls(); };
    scene.buttonAssistText1 = function() { return this._skillTypeWindow?.active ? TextManager.buttonAssistSwitch : ''; };
    scene.isBottomHelpMode = function() {
        if (ConfigManager.uiMenuStyle && ConfigManager.uiHelpPosition !== undefined) return ConfigManager.uiHelpPosition;
        if (settings.EnableLayout) return /lower/i.test(settings.LayoutStyle);
    };
    scene.isRightInputMode = function() {
        if (ConfigManager.uiMenuStyle && ConfigManager.uiInputPosition !== undefined) return ConfigManager.uiInputPosition;
        return settings.EnableLayout ? /right/i.test(settings.LayoutStyle) : Scene_ItemBase.prototype.isRightInputMode.call(this);
    };
    scene.mainCommandWidth = function() {
        return Object.prototype.hasOwnProperty.call(raw, 'CmdWidth:num') ? settings.CmdWidth : Scene_MenuBase.prototype.mainCommandWidth.call(this);
    };
    scene.allowCreateShopStatusWindow = () => !!Imported.VisuMZ_1_ItemsEquipsCore && (settings.EnableLayout || settings.ShowShopStatus);
    scene.adjustItemWidthByShopStatus = () => settings.SkillSceneAdjustSkillList;
    scene.shopStatusWidth = () => Imported.VisuMZ_1_ItemsEquipsCore ? Scene_Shop.prototype.statusWidth() : 0;
    const originalRects = Object.fromEntries(['helpWindowRect','skillTypeWindowRect','statusWindowRect','itemWindowRect'].map(key => [key, scene[key]]));
    scene.helpWindowRect = function() {
        return settings.EnableLayout ? new Rectangle(0, this.helpAreaTop(), Graphics.boxWidth, this.helpAreaHeight()) : originalRects.helpWindowRect.call(this);
    };
    scene.skillTypeWindowRect = function() {
        if (!settings.EnableLayout) return originalRects.skillTypeWindowRect.call(this);
        const width = this.mainCommandWidth();
        return new Rectangle(this.isRightInputMode() ? Graphics.boxWidth - width : 0, this.mainAreaTop(), width, this.calcWindowHeight(3, true));
    };
    scene.statusWindowRect = function() {
        if (!settings.EnableLayout) return originalRects.statusWindowRect.call(this);
        const width = Graphics.boxWidth - this.mainCommandWidth();
        return new Rectangle(this.isRightInputMode() ? 0 : Graphics.boxWidth - width, this.mainAreaTop(), width, this._skillTypeWindow.height);
    };
    scene.itemWindowRect = function() {
        if (!settings.EnableLayout) {
            const rect = originalRects.itemWindowRect.call(this);
            if (this.allowCreateShopStatusWindow() && settings.SkillSceneAdjustSkillList) rect.width -= this.shopStatusWidth();
            return rect;
        }
        const width = Graphics.boxWidth - this.shopStatusWidth();
        return new Rectangle(this.isRightInputMode() ? Graphics.boxWidth - width : 0, this._statusWindow.y + this._statusWindow.height, width, this.mainAreaHeight() - this._statusWindow.height);
    };
    const statusRect = new Function(settings.SkillMenuStatusRect);
    scene.shopStatusWindowRect = function() {
        if (!settings.EnableLayout) return statusRect.call(this);
        const width = this.shopStatusWidth();
        return new Rectangle(this.isRightInputMode() ? 0 : Graphics.boxWidth - width, this._itemWindow.y, width, this._itemWindow.height);
    };
    scene.createShopStatusWindow = function() {
        this._shopStatusWindow = new Window_ShopStatus(this.shopStatusWindowRect());
        this.addWindow(this._shopStatusWindow);
        this._itemWindow.setStatusWindow(this._shopStatusWindow);
        this._shopStatusWindow.setBackgroundType(settings.SkillSceneStatusBgType);
    };
    const createItem = scene.createItemWindow;
    scene.createItemWindow = function() {
        createItem.call(this);
        if (this.allowCreateShopStatusWindow()) this.createShopStatusWindow();
    };
    const list = Window_SkillList.prototype, maxCols = list.maxCols, setActor = list.setActor, updateHelp = list.updateHelp;
    list.maxCols = function() { return SceneManager._scene?.constructor === Scene_Battle ? maxCols.call(this) : settings.ListWindowCols; };
    list.setStatusWindow = function(window) { this._statusWindow = window; this.callUpdateHelp(); };
    list.updateHelp = function() {
        updateHelp.call(this);
        if (this._statusWindow?.constructor === Window_ShopStatus) this._statusWindow.setItem(this.item());
    };
    list.setActor = function(actor) {
        const changed = this._actor !== actor;
        setActor.call(this, actor);
        if (changed && this._statusWindow?.constructor === Window_ShopStatus) this._statusWindow.setItem(this.itemAt(0));
    };
    list.setStypeId = function(id) {
        if (!id || this._stypeId === id) return;
        this._stypeId = id; this.refresh(); this.scrollTo(0, 0);
        if (this._statusWindow?.constructor === Window_ShopStatus) this._statusWindow.setItem(this.itemAt(0));
    };
    list.alterSkillName = function(skill) {
        const match = skill && /<LIST NAME:\s*(.*)>/i.exec(skill.note);
        if (!match) return;
        skill.name = match[1].trim();
        while (/\\V\[\d+\]/i.test(skill.name)) skill.name = skill.name.replace(/\\V\[(\d+)\]/gi, (_, id) => $gameVariables.value(Number(id)));
    };
    const type = Window_SkillType.prototype;
    type.isUseModernControls = function() { return !!Imported.VisuMZ_0_CoreEngine && Window_Command.prototype.isUseModernControls.call(this); };
    type.commandStyle = () => settings.CmdStyle;
    type.itemTextAlign = () => settings.CmdTextAlign;
    type.makeCommandName = function(id) {
        const name = $dataSystem.skillTypes[id];
        if (/\\I\[\d+\]/i.test(name) || settings.CmdStyle === 'text') return name;
        return '\\I[' + ($dataSystem.magicSkills.includes(id) ? settings.IconStypeMagic : settings.IconStypeNorm) + ']' + name;
    };
    type.makeCommandList = function() {
        if (this._actor) for (const id of this._actor.skillTypes()) this.addCommand(this.makeCommandName(id), 'skill', true, id);
    };
    type.commandStyleCheck = function(index) {
        if (index < 0) return 'text';
        if (settings.CmdStyle !== 'auto') return settings.CmdStyle;
        if (this.maxItems() && /\\I\[\d+\]/i.test(this.commandName(index))) return this.textSizeEx(this.commandName(index)).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
        return 'text';
    };
    type.drawItem = function(index) {
        const style = this.commandStyleCheck(index), rect = this.itemLineRect(index), name = this.commandName(index);
        if (style === 'text') return Window_Command.prototype.drawItem.call(this, index);
        if (style === 'icon') {
            const icon = Number(/\\I\[(\d+)\]/i.exec(name)?.[1] || 0);
            this.drawIcon(icon, rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2), rect.y + (rect.height - ImageManager.iconHeight) / 2);
            return;
        }
        const width = this.textSizeEx(name).width;
        this.changePaintOpacity(this.isCommandEnabled(index));
        const x = rect.x + (settings.CmdTextAlign === 'right' ? rect.width - width : settings.CmdTextAlign === 'center' ? Math.floor((rect.width - width) / 2) : 0);
        this.drawTextEx(name, x, rect.y, width);
    };
    type.updateCommandNameWindow = function() {
        const window = this._commandNameWindow;
        window.contents.clear();
        if (this.commandStyleCheck(this.index()) !== 'icon' || !this.maxItems()) return;
        const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[\d+\]/gi, '');
        window.resetFontSettings();window.drawText(name, 0, rect.y, window.innerWidth, 'center');
        window.x = -window.width / 2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
        window.y = Math.floor(rect.height / 2);
    };
    const initialize = type.initialize, help = type.callUpdateHelp;
    type.initialize = function(rect) {
        initialize.call(this, rect);
        this._commandNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
        this._commandNameWindow.opacity = 0; this.addChild(this._commandNameWindow); this.updateCommandNameWindow();
    };
    type.callUpdateHelp = function() { help.call(this); if (this._commandNameWindow) this.updateCommandNameWindow(); };
}
