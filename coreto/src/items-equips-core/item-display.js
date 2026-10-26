function installItemsDisplay(api) {
    ColorManager.getItemColor = function(item) {
        if (!item) return this.normalColor();
        const index = /<COLOR: (\d+)>/i.exec(item.note || '');
        if (index) return this.textColor(Number(index[1]).clamp(0, 31));
        const hex = /<COLOR: #(.*)>/i.exec(item.note || '');
        return hex ? '#' + hex[1] : this.normalColor();
    };
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
        if (!item) return;
        const standard = ImageManager.standardIconWidth || 32, offset = standard + 4;
        this.changeTextColor(ColorManager.getItemColor(item));
        this.drawIcon(item.iconIndex, x + Math.ceil((standard - ImageManager.iconWidth) / 2), y + (this.lineHeight() - ImageManager.iconHeight) / 2);
        this.drawText(item.name, x + offset, y, Math.max(0, width - offset));
        this.resetTextColor();
    };
    Window_Base.prototype.isDrawItemNumber = function(item) { return DataManager.isKeyItem(item) ? $dataSystem.optKeyItemsNumber : true; };
    Window_Base.prototype.drawItemNumber = function(item, x, y, width) {
        if (!this.isDrawItemNumber(item)) return;
        this.resetFontSettings();
        this.contents.fontSize = api.settings.ItemScene.ItemQuantityFontSize;
        this.drawText(api.settings.ItemScene.ItemQuantityFmt.format($gameParty.numItems(item)), x, y, width, 'right');
        this.resetFontSettings();
    };
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) { Window_Selectable.prototype.drawItemNumber.call(this, item, x, y, width); };

    const settings = api.settings.New;
    function createLabel() {
        const bitmap = new Bitmap(32, 32);
        if (settings.Icon > 0) {
            const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
            bitmap.blt(ImageManager.loadSystem('IconSet'), settings.Icon % 16 * width, Math.floor(settings.Icon / 16) * height, width, height, 0, 0);
        }
        if (settings.Text !== '') {
            bitmap.fontFace = settings.FontFace || $gameSystem.mainFontFace();
            bitmap.textColor = String(settings.FontColor).includes('#') ? '#' + String(settings.FontColor).split('#').slice(1).join('#') : ColorManager.textColor(settings.FontColor);
            bitmap.fontSize = settings.FontSize;
            bitmap.drawText(settings.Text, 0, 16, 32, 16, 'center');
        }
        return new Sprite(bitmap);
    }
    Window_Selectable.prototype.initNewLabelSprites = function() {
        this._newLabelSprites = {};
        this._newLabelOpacity = 255;
        this._newLabelOpacityChange = settings.FadeSpeed;
        this._newLabelOpacityUpperLimit = settings.FadeLimit;
    };
    const initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function(rect) { this.initNewLabelSprites(); initialize.call(this, rect); };
    Window_Selectable.prototype.isShowNew = function() { return false; };
    Window_ItemList.prototype.isShowNew = function() { return true; };
    Window_Selectable.prototype.createNewLabelSprite = function(key) {
        if (!this._newLabelSprites[key]) {
            this._newLabelSprites[key] = createLabel();
            this.addInnerChild(this._newLabelSprites[key]);
        }
        return this._newLabelSprites[key];
    };
    Window_Selectable.prototype.placeNewLabel = function(item, x, y) {
        const key = itemsObjectKey(item);
        if (key === undefined) return;
        const sprite = this.createNewLabelSprite(key);
        sprite.move(x, y); sprite.show(); sprite.opacity = this._newLabelOpacity;
    };
    Window_Selectable.prototype.clearNewLabelFromItem = function(item) {
        if (!item) return;
        $gameParty.clearNewItem(item);
        const sprite = this._newLabelSprites[itemsObjectKey(item)];
        if (sprite) sprite.hide();
    };
    Window_Selectable.prototype.hideNewLabelSprites = function() { for (const sprite of Object.values(this._newLabelSprites)) sprite.hide(); };
    const help = Window_Selectable.prototype.setHelpWindowItem;
    Window_Selectable.prototype.setHelpWindowItem = function(item) { help.call(this, item); if (this.isShowNew()) this.clearNewLabelFromItem(item); };
    const refresh = Window_Selectable.prototype.refresh;
    Window_Selectable.prototype.refresh = function() { this.hideNewLabelSprites(); refresh.call(this); };
    Window_Selectable.prototype.updateNewLabelOpacity = function() {
        if (!this.isShowNew()) return;
        const limit = this._newLabelOpacityUpperLimit;
        this._newLabelOpacity += this._newLabelOpacityChange;
        if (this._newLabelOpacity >= limit || this._newLabelOpacity <= 0) this._newLabelOpacityChange *= -1;
        this._newLabelOpacity = this._newLabelOpacity.clamp(0, limit);
        for (const sprite of Object.values(this._newLabelSprites)) sprite.opacity = this._newLabelOpacity;
    };
    const update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function() { this.updateNewLabelOpacity(); update.call(this); };
    Window_ItemList.prototype.placeItemNewLabel = function(index) {
        const item = this.itemAt(index);
        if (!item || !this.isShowNew() || !$gameParty.isNewItem(item)) return;
        const rect = this.itemLineRect(index);
        this.placeNewLabel(item, rect.x + settings.OffsetX, rect.y + (this.lineHeight() - 32) / 2 + settings.OffsetY);
    };
    const draw = Window_ItemList.prototype.drawItem;
    Window_ItemList.prototype.drawItem = function(index) { draw.call(this, index); this.placeItemNewLabel(index); };
    const activate = Scene_ItemBase.prototype.activateItemWindow;
    Scene_ItemBase.prototype.activateItemWindow = function() { activate.call(this); this._itemWindow.callUpdateHelp(); };
}
