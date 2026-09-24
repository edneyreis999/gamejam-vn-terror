function installGoldPresentation(settings, groupDigits) {
    const gold = settings.Gold;
    Game_Party.prototype.maxGold = function() { return gold.GoldMax; };
    function drawValue(window, value, x, y, width) {
        window.resetTextColor();
        const measured = window._digitGrouping ? groupDigits(value) : value;
        window.drawText(window.textWidth(measured) > width ? gold.GoldOverlap : value, x, y, width, "right");
        window.resetFontSettings();
    }
    Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
        this.resetFontSettings();
        this.contents.fontSize = gold.GoldFontSize;
        if (gold.GoldIcon > 0 && unit === TextManager.currencyUnit) {
            this.drawIcon(gold.GoldIcon, x + width - ImageManager.iconWidth, y + (this.lineHeight() - ImageManager.iconHeight) / 2);
            width -= ImageManager.iconWidth + 4;
        } else {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(unit, x, y, width, "right");
            width -= this.textWidth(unit) + 6;
        }
        drawValue(this, value, x, y, width);
    };
    Window_Gold.prototype.isItemStyle = function() {
        return this.currencyUnit() === TextManager.currencyUnit && gold.ItemStyle;
    };
    Window_Gold.prototype.drawGoldItemStyle = function() {
        this.resetFontSettings();
        this.contents.clear();
        this.contents.fontSize = gold.GoldFontSize;
        const rect = this.itemLineRect(0);
        if (gold.GoldIcon > 0) {
            const size = ImageManager.standardIconWidth || 32;
            this.drawIcon(gold.GoldIcon, rect.x + Math.ceil((size - ImageManager.iconWidth) / 2), rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2);
            rect.x += size + 4;
            rect.width -= size + 4;
        }
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(this.currencyUnit(), rect.x, rect.y, rect.width, "left");
        const unitWidth = this.textWidth(this.currencyUnit()) + 6;
        drawValue(this, this.value(), rect.x + unitWidth, rect.y, rect.width - unitWidth);
    };
    const refresh = Window_Gold.prototype.refresh;
    Window_Gold.prototype.refresh = function() {
        if (this.isItemStyle()) this.drawGoldItemStyle();
        else refresh.call(this);
    };
}
