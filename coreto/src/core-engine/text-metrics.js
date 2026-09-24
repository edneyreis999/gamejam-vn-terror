function installTextMetrics(settings) {
    const options = settings.QoL;
    const measure = Bitmap.prototype.measureTextWidth;
    Bitmap.prototype.measureTextWidthNoRounding = function(...args) { return measure.apply(this, args); };
    Bitmap.prototype.measureTextWidth = function(...args) { return Math.ceil(measure.apply(this, args)); };
    const draw = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, width, height, align) {
        return draw.call(this, text, Math.round(x), Math.round(y), Math.ceil(width), Math.ceil(height), align);
    };
    const outline = Bitmap.prototype._drawTextOutline;
    Bitmap.prototype._drawTextOutline = function(text, x, y, width) {
        if (!options.FontShadows) return outline.apply(this, arguments);
        this.context.fillStyle = this.outlineColor;
        this.context.fillText(text, x + 2, y + 2, width);
    };
    Window_Message.prototype.useFontWidthFix = function() { return options.FontWidthFix; };
    Window_Message.prototype.textWidth = function(text) {
        return this.useFontWidthFix() ? this.contents.measureTextWidthNoRounding(text) : Window_Base.prototype.textWidth.call(this, text);
    };
    const center = Graphics._centerElement;
    Graphics._centerElement = function(element) {
        const result = center.apply(this, arguments);
        if (options.FontSmoothing) element.style["font-smooth"] = "none";
        return result;
    };
}
