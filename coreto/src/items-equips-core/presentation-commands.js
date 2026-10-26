function installItemsPresentationCommands(api) {
    for (const [type, key] of [[Window_EquipCommand, 'EquipScene'], [Window_ShopCommand, 'ShopScene']]) {
        const proto = type.prototype, settings = api.settings[key];
        proto.itemTextAlign = function() { return settings.CmdTextAlign; };
        proto.commandStyleCheck = function(index) {
            if (index < 0) return 'text';
            const style = this.commandStyle();
            if (style !== 'auto') return style;
            if (this.maxItems() > 0 && /\\I\[(\d+)\]/i.test(this.commandName(index))) return this.textSizeEx(this.commandName(index)).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
            return 'text';
        };
        proto.drawItem = function(index) {
            const style = this.commandStyleCheck(index);
            if (style === 'iconText') this.drawItemStyleIconText(index);
            else if (style === 'icon') this.drawItemStyleIcon(index);
            else Window_HorzCommand.prototype.drawItem.call(this, index);
        };
        proto.drawItemStyleIconText = Window_ItemCategory.prototype.drawItemStyleIconText;
        proto.drawItemStyleIcon = Window_ItemCategory.prototype.drawItemStyleIcon;
        proto.createCommandNameWindow = function(rect) {
            this._commandNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
            this._commandNameWindow.opacity = 0;
            this.addChild(this._commandNameWindow);
            this.updateCommandNameWindow();
        };
        proto.commandNameWindowDrawText = function(name, rect) { this._commandNameWindow.drawText(name, 0, rect.y, this._commandNameWindow.innerWidth, 'center'); };
        proto.commandNameWindowCenter = function(name, rect) {
            this._commandNameWindow.x = this._commandNameWindow.width / -2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
            this._commandNameWindow.y = Math.floor(rect.height / 2);
        };
        proto.updateCommandNameWindow = function() {
            const window = this._commandNameWindow;
            window.contents.clear();
            if (this.commandStyleCheck(this.index()) !== 'icon') return;
            const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[(\d+)\]/gi, '');
            window.resetFontSettings(); this.commandNameWindowDrawText(name, rect); this.commandNameWindowCenter(name, rect);
        };
        const initialize = proto.initialize;
        proto.initialize = function(rect) { initialize.apply(this, arguments); this.createCommandNameWindow(rect); };
        const help = proto.callUpdateHelp;
        proto.callUpdateHelp = function() { help.call(this); if (this._commandNameWindow) this.updateCommandNameWindow(); };
    }
}
