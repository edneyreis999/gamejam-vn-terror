function installMainMenuCommands(settings) {
    const push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        if (sceneClass === Scene_Menu) $gameTemp._mainMenuSubcategory = undefined;
        push.call(this, sceneClass);
    };
    const commands = settings.CommandList;
    const initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        this._subcategory = $gameTemp._mainMenuSubcategory || '';
        initialize.call(this, rect);
        this.createCommandNameWindow(rect);
    };
    Window_MenuCommand.prototype.createCommandNameWindow = function(rect) {
        this._commandNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
        this._commandNameWindow.opacity = 0;
        this.addChild(this._commandNameWindow);
        this.updateCommandNameWindow();
    };
    Window_MenuCommand.prototype.callUpdateHelp = function() {
        Window_HorzCommand.prototype.callUpdateHelp.call(this);
        if (this._commandNameWindow) this.updateCommandNameWindow();
    };
    Window_MenuCommand.prototype.updateCommandNameWindow = function() {
        const window = this._commandNameWindow;
        window.contents.clear();
        if (this.commandStyleCheck(this.index()) !== 'icon') return;
        const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[(\d+)\]/gi, '');
        window.resetFontSettings();
        this.commandNameWindowDrawBackground(name, rect);
        this.commandNameWindowDrawText(name, rect);
        this.commandNameWindowCenter(name, rect);
    };
    // Native extension hook: the default command label has no background.
    Window_MenuCommand.prototype.commandNameWindowDrawBackground = function() {};
    Window_MenuCommand.prototype.commandNameWindowDrawText = function(name, rect) {
        const window = this._commandNameWindow;
        window.drawText(name, 0, rect.y, window.innerWidth, 'center');
    };
    Window_MenuCommand.prototype.commandNameWindowCenter = function(name, rect) {
        const window = this._commandNameWindow;
        window.x = -window.width / 2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
        window.y = Math.floor(rect.height / 4);
    };
    Window_MenuCommand.prototype.currentSubcategory = function() { return this._subcategory; };
    Window_MenuCommand.prototype.isSubcategoryVisible = function(command) {
        if (!command) return true;
        const category = command.ExtJS.call(this);
        return commands.some(child => child !== command && (child.Subcategory || '') === category && this.isMainMenuCommandVisible(child.Symbol, child, true));
    };
    Window_MenuCommand.prototype.doesSubcategoryExist = function(category) {
        return commands.some(command => command.Symbol === 'subcategory' && command.ExtJS.call(this) === category);
    };
    Window_MenuCommand.prototype.isIncludedInSubcategory = function(symbol, command) {
        const category = command.Subcategory || '';
        return category === this._subcategory || this._subcategory === '' && !this.doesSubcategoryExist(category);
    };
    Window_MenuCommand.prototype.isMainMenuCommandVisible = function(symbol, command, ignoreCategory) {
        if (!ignoreCategory && !this.isIncludedInSubcategory(symbol, command)) return false;
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceShow')) return true;
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceHide')) return false;
        return command.ShowJS.call(this, symbol, command);
    };
    Window_MenuCommand.prototype.isMainMenuCommandEnabled = function(symbol, command) {
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceEnable')) return true;
        if ($gameSystem.getMainMenuSymbolState(symbol, 'forceDisable')) return false;
        return command.EnableJS.call(this, symbol, command);
    };
    Window_MenuCommand.prototype.makeCommandList = function() {
        let categoryIndex = 0;
        for (const command of commands) {
            if (!this.isMainMenuCommandVisible(command.Symbol, command)) continue;
            const text = command.TextStr && command.TextStr !== 'Untitled' ? command.TextStr : command.TextJS.call(this);
            const name = (command.Icon > 0 && settings.CustomCmdWin.Style !== 'text' ? '\\I[' + command.Icon + ']' : '') + text;
            const symbol = command.Symbol === 'subcategory' ? command.Symbol + (++categoryIndex) : command.Symbol;
            this.addCommand(name, symbol, this.isMainMenuCommandEnabled(command.Symbol, command), command.ExtJS.call(this));
            this._list[this._list.length - 1].mainMenuCommand = command;
        }
    };
    Window_MenuCommand.prototype.itemTextAlign = function() { return settings.CustomCmdWin.TextAlign; };
    Window_MenuCommand.prototype.commandStyle = function() { return settings.CustomCmdWin.Style; };
    Window_MenuCommand.prototype.commandStyleCheck = function(index) {
        const style = this.commandStyle();
        if (style !== 'auto') return style;
        const name = this.commandName(index);
        if (!/\\I\[\d+\]/i.test(name)) return 'text';
        return this.textSizeEx(name).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
    };
    Window_MenuCommand.prototype.drawItem = function(index) {
        const style = this.commandStyleCheck(index);
        if (style === 'iconText') this.drawItemStyleIconText(index);
        else if (style === 'icon') this.drawItemStyleIcon(index);
        else Window_Command.prototype.drawItem.call(this, index);
    };
    Window_MenuCommand.prototype.drawItemStyleIcon = function(index) {
        const rect = this.itemLineRect(index), match = this.commandName(index).match(/\\I\[(\d+)\]/i);
        if (match) this.drawIcon(Number(match[1]), rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2), rect.y + (rect.height - ImageManager.iconHeight) / 2);
    };
    Window_MenuCommand.prototype.drawItemStyleIconText = function(index) {
        const rect = this.itemLineRect(index), name = this.commandName(index), width = this.textSizeEx(name).width;
        this.changePaintOpacity(this.isCommandEnabled(index));
        const align = this.itemTextAlign();
        const x = align === 'right' ? rect.x + rect.width - width : align === 'center' ? rect.x + Math.floor((rect.width - width) / 2) : rect.x;
        this.drawTextEx(name, x, rect.y, width);
    };
    Window_MenuCommand.prototype.setSubcategory = function(category) {
        if (this._subcategory === category) return;
        this._subcategory = category;
        $gameTemp._mainMenuSubcategory = category;
        this.refresh(); this.select(0); this.setTopRow(0); this.activate();
    };
    Window_MenuCommand.prototype.removeSubcategory = function() {
        const category = this._subcategory;
        this._subcategory = '';
        $gameTemp._mainMenuSubcategory = undefined;
        this.refresh(); this.setTopRow(0);
        this.select(Math.max(this.findExt(category), 0)); this.activate();
    };
    const cancel = Window_MenuCommand.prototype.processCancel;
    Window_MenuCommand.prototype.processCancel = function() {
        if (!this._subcategory) return cancel.call(this);
        SoundManager.playCancel(); this.updateInputData(); this.removeSubcategory();
    };
    const callOkHandler = Window_MenuCommand.prototype.callOkHandler;
    Window_MenuCommand.prototype.callOkHandler = function() {
        const command = this.currentData()?.mainMenuCommand;
        if (!command) return callOkHandler.call(this);
        command.CallHandlerJS.call(this, this.currentExt());
    };
    const personalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        const window = this._commandWindow, command = window.currentData()?.mainMenuCommand;
        if (!command) return personalOk.call(this);
        command.PersonalHandlerJS.call(this, window.currentExt());
    };
    Scene_Menu.prototype.commandLoad = function() { SceneManager.push(Scene_Load); };
    Scene_Menu.prototype.commandCommonEvent = function() {
        $gameTemp.reserveCommonEvent(this._commandWindow.currentExt());
        this.popScene();
    };
    Scene_Menu.prototype.isSoloQuickMode = function() { return settings.General.SoloQuick && $gameParty.members().length <= 1; };
    const personal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        if (this.isSoloQuickMode() && this._statusWindow) {
            $gameParty.setTargetActor($gameParty.members()[0]);
            this.onPersonalOk();
        } else {
            personal.call(this);
            if (!settings.General.StatusSelectLast) this._statusWindow.select(0);
        }
    };
}
