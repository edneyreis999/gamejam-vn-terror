function installActorPresentation(settings, parameterIcon) {
    Window_Base.prototype.drawIconBySize = function(icon, x, y, size, smoothing) {
        const source = ImageManager.loadSystem("IconSet");
        const width = ImageManager.iconWidth;
        const height = ImageManager.iconHeight;
        this.contents.context.imageSmoothingEnabled = smoothing;
        this.contents.blt(source, icon % 16 * width, Math.floor(icon / 16) * height, width, height, x, y, size, size);
        this.contents.context.imageSmoothingEnabled = true;
    };
    Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        const height = Sprite_Gauge.prototype.gaugeHeight.call(this);
        const gaugeY = y + this.lineHeight() - height - 2;
        this.contents.fillRect(x, gaugeY, width, height, ColorManager.gaugeBackColor());
        this.contents.gradientFillRect(x + 1, gaugeY + 1, Math.floor((width - 2) * rate), height - 2, color1, color2);
    };
    Window_StatusBase.prototype.smallParamFontSize = function() { return $gameSystem.mainFontSize() - 8; };
    Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width = 168) {
        this.resetTextColor();
        const name = actor.currentClass().name;
        if (settings.UI.TextCodeClassNames) this.drawTextEx(name, x, y, width || 168);
        else this.drawText(name.replace(/\\I\[(\d+)\]/gi, ""), x, y, width || 168);
    };
    Window_StatusBase.prototype.drawActorNickname = function(actor, x, y, width = 270) {
        this.resetTextColor();
        if (settings.UI.TextCodeNicknames) this.drawTextEx(actor.nickname(), x, y, width || 270);
        else this.drawText(actor.nickname(), x, y, width || 270);
    };
    Window_StatusBase.prototype.isExpGaugeDrawn = function() { return settings.UI.LvExpGauge; };
    const drawActorLevel = Window_StatusBase.prototype.drawActorLevel;
    Window_StatusBase.prototype.drawActorLevel = function(actor, x, y) {
        if (!settings.Param.ShowActorLevel) return;
        if (this.isExpGaugeDrawn()) this.drawActorExpGauge(actor, x, y);
        drawActorLevel.call(this, actor, x, y);
    };
    Window_StatusBase.prototype.drawActorExpGauge = function(actor, x, y) {
        if (!actor || !actor.isActor()) return;
        const rate = actor.expRate();
        const prefix = rate >= 1 ? "maxLvGauge" : "expGauge";
        this.drawGauge(x, y, 128, rate, ColorManager[`${prefix}Color1`](), ColorManager[`${prefix}Color2`]());
    };
    Window_StatusParams.prototype.maxItems = function() { return settings.Param.DisplayedParams.length; };
    Window_StatusParams.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const name = settings.Param.DisplayedParams[index];
        this.drawParamText(rect.x, rect.y, 160, name, false);
        this.resetTextColor();
        this.drawText(this._actor.paramValueByName(name, true), rect.x + 160, rect.y, 60, "right");
    };
    Window_EquipStatus.prototype.drawAllParams = function() {
        settings.Param.DisplayedParams.forEach((name, index) => this.drawItem(this.itemPadding(), this.paramY(index), name));
    };
    Window_EquipStatus.prototype.drawParamName = function(x, y, name) {
        this.drawParamText(x, y, this.paramX() - this.itemPadding() * 2, name, false);
    };
    Window_EquipStatus.prototype.drawCurrentParam = function(x, y, name) {
        this.resetTextColor();
        this.drawText(this._actor.paramValueByName(name, true), x, y, this.paramWidth(), "right");
    };
    Window_EquipStatus.prototype.drawNewParam = function(x, y, name) {
        const delta = this._tempActor.paramValueByName(name) - this._actor.paramValueByName(name);
        this.changeTextColor(ColorManager.paramchangeTextColor(delta));
        this.drawText(this._tempActor.paramValueByName(name, true), x, y, this.paramWidth(), "right");
    };
    Window_EquipStatus.prototype.drawRightArrow = function(x, y) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(settings.UI.ParamArrow, x, y, this.rightArrowWidth(), "center");
    };
    Window_StatusBase.prototype.drawParamText = function(x, y, width, value, small) {
        const name = String(value || "").toUpperCase();
        if (settings.Param.DrawIcons) {
            if (small) {
                const size = this.gaugeLineHeight();
                this.drawIconBySize(parameterIcon(name), x, y, size);
                x += size + 2;
                width -= size + 2;
            } else {
                const iconWidth = ImageManager.standardIconWidth || 32;
                const iconHeight = ImageManager.standardIconHeight || 32;
                const offsetY = this.lineHeight() === 36 ? 2 : Math.floor((this.lineHeight() - iconHeight) / 2);
                this.drawIcon(parameterIcon(name), x + Math.floor((iconWidth - ImageManager.iconWidth) / 2) + 2,
                    y + Math.floor((iconHeight - ImageManager.iconHeight) / 2) + offsetY);
                x += iconWidth + 4;
                width -= iconWidth + 4;
            }
        }
        this.resetFontSettings();
        this.changeTextColor(ColorManager.systemColor());
        if (small) {
            this.contents.fontSize = this.smallParamFontSize();
            this.contents.drawText(TextManager.param(name), x, y, width, this.gaugeLineHeight(), "left");
        } else this.drawText(TextManager.param(name), x, y, width);
        this.resetFontSettings();
    };
}

function installStateIconPresentation(settings) {
    Sprite_StateIcon.NON_FRAME = settings.UI.StateIconsNonFrame;
    const loadBitmap = Sprite_StateIcon.prototype.loadBitmap;
    Sprite_StateIcon.prototype.loadBitmap = function() {
        if (Sprite_StateIcon.NON_FRAME) this.loadBitmapCoreEngine();
        else loadBitmap.call(this);
    };
    Sprite_StateIcon.prototype.loadBitmapCoreEngine = function() {
        this.bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
        this._srcBitmap = ImageManager.loadSystem("IconSet");
    };
    const updateFrame = Sprite_StateIcon.prototype.updateFrame;
    Sprite_StateIcon.prototype.updateFrame = function() {
        if (Sprite_StateIcon.NON_FRAME) this.updateFrameCoreEngine();
        else updateFrame.call(this);
    };
    Sprite_StateIcon.prototype.updateFrameCoreEngine = function() {
        if (this._lastIconIndex === this._iconIndex) return;
        this._lastIconIndex = this._iconIndex;
        const width = ImageManager.iconWidth;
        const height = ImageManager.iconHeight;
        this.bitmap.clear();
        this.bitmap.blt(this._srcBitmap, this._iconIndex % 16 * width, Math.floor(this._iconIndex / 16) * height,
            width, height, 0, 0, this.bitmap.width, this.bitmap.height);
    };
    Bitmap.prototype.drawTextTopAligned = function(text, x, y, width, lineHeight, align) {
        width ||= 0xffffffff;
        const context = this.context;
        const alpha = context.globalAlpha;
        const textX = x + (align === "center" ? width / 2 : align === "right" ? width : 0);
        const baseline = Math.round(y + 12 + this.fontSize * 0.35);
        context.save();
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = "alphabetic";
        context.globalAlpha = 1;
        this._drawTextOutline(text, textX, baseline, width);
        context.globalAlpha = alpha;
        this._drawTextBody(text, textX, baseline, width);
        context.restore();
        this._baseTexture.update();
        this.markCoreEngineModified();
    };
    Sprite_Name.prototype.bitmapHeight = function() { return 36; };
    Sprite_Name.prototype.redraw = function() {
        this.setupFont();
        this.bitmap.clear();
        this.bitmap.drawTextTopAligned(this.name(), 4, 0, this.bitmapWidth() - 10, this.bitmapHeight(), "left");
    };
}
