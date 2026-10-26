function installItemsStatusWindow(api) {
    const settings = api.settings.StatusWindow;
    for (const key of ['DrawItemData', 'DrawEquipData', 'DrawEquipClassicData', 'DrawEquipDoubleData']) settings[key] = new Function(settings[key]);
    const proto = Window_ShopStatus.prototype;
    Scene_Shop.prototype.statusWidth = function() { return settings.Width; };
    ColorManager.getItemsEquipsCoreBackColor1 = function() { return this.getColor(settings.BackRectColor === undefined ? 19 : settings.BackRectColor); };
    proto.translucentOpacity = function() { return settings.Translucent; };
    proto.drawItemDarkRect = function(x, y, width, height, repeats) {
        if (settings.DrawBackRect === false) return;
        for (let count = Math.max(repeats || 1, 1); count > 0; count--) {
            this.contentsBack.paintOpacity = 160;
            this.contentsBack.fillRect(x + 1, y + 1, width - 2, (height || this.lineHeight()) - 2, ColorManager.getItemsEquipsCoreBackColor1());
            this.contentsBack.paintOpacity = 255;
        }
    };
    proto.refresh = function() {
        this.contents.clear();
        this.contentsBack.clear();
        if (!this._item) return;
        this.resetFontSettings();
        this.changePaintOpacity(true);
        this.prepareItemCustomData();
        if (this.isEquipItem()) this.drawEquipData();
        else this.drawItemData();
        this.drawCustomShopGraphic();
    };
    const setItem = proto.setItem;
    proto.setItem = function(item) {
        if (DataManager.isWeapon(item) || DataManager.isArmor(item)) this.setItemDelay(item);
        else setItem.call(this, item);
    };
    Window_ShopStatus.EQUIP_DELAY_MS = settings.EquipDelayMS;
    proto.setItemDelay = function(item) { this._item = item; setTimeout(this.refreshDelay.bind(this, item), Window_ShopStatus.EQUIP_DELAY_MS); };
    proto.refreshDelay = function(item) { if (this._item === item) this.refresh(); };
    proto.loadFaceImages = function() {
        Window_StatusBase.prototype.loadFaceImages.call(this);
        for (const actor of $gameParty.members()) ImageManager.loadCharacter(actor.characterName());
    };
    proto.drawItemData = function() { settings.DrawItemData.call(this); };
    proto.drawEquipData = function() {
        const style = this.getEquipDataStyle();
        if (style === 'compare') this.drawEquipDataCompare();
        else if (style === 'double') this.drawEquipDataDouble();
        else this.drawEquipDataClassic();
    };
    proto.getEquipDataStyle = function() {
        const match = this._item && /<STATUS STYLE: (.*)>/i.exec(this._item.note || '');
        return match ? match[1].toLowerCase().trim() : settings.EquipDataStyle ?? 'compare';
    };
    proto.drawEquipDataCompare = function() { this._tempActor = null; settings.DrawEquipData.call(this); };
    proto.drawEquipDataClassic = function() { this._tempActor = null; settings.DrawEquipClassicData.call(this); };
    proto.drawEquipDataDouble = function() { this._tempActor = null; settings.DrawEquipDoubleData.call(this); };
    proto.prepareItemCustomData = function() {
        this._customItemInfo = {};
        const block = this._item && /<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i.exec(this._item.note);
        if (block) for (const line of block[1].split(/[\r\n]+/)) {
            const entry = /(.*): (.*)/i.exec(line);
            if (entry) this._customItemInfo[entry[1].toUpperCase().trim()] = entry[2].trim();
        }
    };
    proto.itemDataFontSize = function() { return Math.max(1, $gameSystem.mainFontSize() - 4); };
    proto.resetFontSettings = function() {
        Window_StatusBase.prototype.resetFontSettings.call(this);
        this.contents.fontSize = this._resetFontSize || this.contents.fontSize;
        this.contents.textColor = this._resetFontColor || this.contents.textColor;
    };
    proto.fontSizeRatio = function() { return this.contents.fontSize / $gameSystem.mainFontSize(); };
    proto.drawIcon = function(icon, x, y) {
        const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
        this.contents.blt(ImageManager.loadSystem('IconSet'), icon % 16 * width, Math.floor(icon / 16) * height, width, height, x, y,
            Math.ceil(width * this.fontSizeRatio()), Math.ceil(height * this.fontSizeRatio()));
    };
    proto.processDrawIcon = function(icon, state) {
        const width = ImageManager.standardIconWidth || 32, height = ImageManager.standardIconHeight || 32;
        if (state.drawing) {
            const x = state.x + Math.ceil(Math.floor((width - ImageManager.iconWidth) / 2) * this.fontSizeRatio()) + 2;
            const offsetY = this.lineHeight() === 36 ? 2 : Math.floor((this.lineHeight() - height) / 2);
            const y = state.y + Math.ceil(Math.floor((height - ImageManager.iconHeight) / 2) * this.fontSizeRatio()) + offsetY;
            this.drawIcon(icon, x, y);
        }
        state.x += Math.ceil(width * this.fontSizeRatio()) + Math.ceil(4 * this.fontSizeRatio());
    };
    proto.drawItemKeyData = function(text, x, y, width, systemColor, align) {
        text = text || '';
        this._resetFontSize = this.itemDataFontSize();
        this._resetFontColor = systemColor ? ColorManager.systemColor() : this.contents.textColor;
        x += this.itemPadding();
        width -= this.itemPadding() * 2;
        const size = this.textSizeEx(text);
        if (align === 'center') x += Math.floor((width - size.width) / 2);
        else if (align === 'right') x += width - size.width;
        this.drawTextEx(text, x, y + (this.lineHeight() - size.height) / 2, width);
        this._resetFontSize = this._resetFontColor = undefined;
        this.resetFontSettings();
    };
    proto.drawItemCustomEntryLine = function(label, text, x, y, width) {
        this.drawItemKeyData(label, x, y, width, true);
        this.drawItemKeyData(text, x, y, width, false, 'right');
        this.drawItemDarkRect(x, y, width);
        this.resetFontSettings();
    };
    proto.drawItemCustomEntries = function(x, y, width) {
        const block = /<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i.exec(this._item.note);
        if (block) for (const line of block[1].split(/[\r\n]+/)) {
            const entry = /(.*): (.*)/i.exec(line);
            if (!entry) continue;
            this.drawItemCustomEntryLine(entry[1].trim(), entry[2].trim(), x, y, width);
            y += this.lineHeight();
        }
        this.resetFontSettings();
        return y;
    };
    proto.getItemQuantityText = function() { return this._customItemInfo.QUANTITY || api.settings.ItemScene.ItemQuantityFmt.format($gameParty.numItems(this._item)); };
    proto.drawItemQuantity = function(x, y, width) {
        if (!this.isEquipItem() && !DataManager.isItem(this._item)) return false;
        if (DataManager.isKeyItem(this._item) && !$dataSystem.optKeyItemsNumber) this.drawItemKeyData(TextManager.keyItem, x, y, width, true, 'center');
        else {
            this.drawItemKeyData(TextManager.possession, x, y, width, true);
            this.drawItemKeyData(this.getItemQuantityText(), x, y, width, false, 'right');
        }
        this.drawItemDarkRect(x, y, width);
        this.resetFontSettings();
        return true;
    };
    proto.drawItemEquipType = function(x, y, width) {
        if (!this.isEquipItem()) return false;
        this.drawItemKeyData($dataSystem.equipTypes[this._item.etypeId], x, y, width, true);
        this.drawItemDarkRect(x, y, width);
        this.resetFontSettings();
        return true;
    };
    proto.drawItemEquipSubType = function(x, y, width) {
        if (!this.isEquipItem()) return false;
        const weapon = DataManager.isWeapon(this._item);
        const label = weapon ? settings.WeaponType ?? 'Weapon Type' : settings.ArmorType ?? 'Armor Type';
        const value = (weapon ? $dataSystem.weaponTypes[this._item.wtypeId] : $dataSystem.armorTypes[this._item.atypeId]) || settings.NoEquipTypeResult || '-';
        this.drawItemCustomEntryLine(label, value, x, y, width);
        return true;
    };
}
