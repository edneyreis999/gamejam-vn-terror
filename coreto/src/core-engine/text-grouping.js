function installTextGrouping(settings) {
    const options = settings.QoL;
    const format = value => groupDigits(value, options.DigitGroupingLocale);
    const initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(...args) {
        this._digitGrouping = options.DigitGroupingStandardText;
        this._digitGroupingEx = options.DigitGroupingExText;
        return initialize.apply(this, args);
    };
    Window_Base.prototype.useDigitGrouping = function() { return this._digitGrouping; };
    Window_Base.prototype.useDigitGroupingEx = function() { return this._digitGroupingEx; };
    Window_Base.prototype.enableDigitGrouping = function(enabled) { this._digitGrouping = enabled; };
    Window_Base.prototype.enableDigitGroupingEx = function(enabled) { this._digitGroupingEx = enabled; };
    const draw = Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(text, ...args) {
        return draw.call(this, this.useDigitGrouping() ? format(text) : text, ...args);
    };
    const createTextState = Window_Base.prototype.createTextState;
    Window_Base.prototype.createTextState = function(...args) {
        const state = createTextState.apply(this, args);
        if (this.useDigitGroupingEx()) state.text = format(state.text);
        return state;
    };
    const digits = Sprite_Damage.prototype.createDigits;
    Sprite_Damage.prototype.useDigitGrouping = function() { return options.DigitGroupingDamageSprites; };
    Sprite_Damage.prototype.createDigits = function(value) {
        if (!this.useDigitGrouping()) return digits.apply(this, arguments);
        const text = format(Math.abs(value));
        const height = this.fontSize(), width = Math.floor(height * 0.75);
        Array.from(text).forEach((character, index) => {
            const sprite = this.createChildSprite(width, height);
            sprite.bitmap.drawText(character, 0, 0, width, height, "center");
            sprite.x = (index - (text.length - 1) / 2) * width;
            sprite.dy = -index;
        });
    };
    Sprite_Gauge.prototype.useDigitGrouping = function() { return options.DigitGroupingGaugeSprites; };
    Sprite_Gauge.prototype.drawValue = function() {
        const value = this.currentValue();
        const text = this.useDigitGrouping() ? format(value) : value;
        const height = this.textHeight ? this.textHeight() : this.bitmapHeight();
        this.setupValueFont();
        this.bitmap.drawText(text, 0, 0, this.bitmapWidth() - 1, height, "right");
    };
    return format;
}
