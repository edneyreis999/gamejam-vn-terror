function installScrollbars(settings) {
    const options = settings.Window;
    const thickness = options.BarThickness;
    const cache = new WeakMap();
    Window_Base.prototype.isScrollBarVisible = function() { return options.ShowScrollBar && thickness > 0; };
    const destroyContents = Window_Base.prototype.destroyContents;
    Window_Base.prototype.destroyContents = function() {
        destroyContents.call(this);
        for (const sprite of [this._scrollBarHorz, this._scrollBarVert]) {
            if (sprite?.bitmap) {
                sprite.bitmap.destroy();
                sprite.bitmap = null;
            }
        }
        cache.delete(this);
    };
    const createContents = Window_Base.prototype.createContents;
    Window_Base.prototype.createContents = function() {
        createContents.call(this);
        if (!this.isScrollBarVisible()) return;
        if (!this._scrollBarHorz) {
            this._scrollBarHorz = new Sprite();
            this._scrollBarVert = new Sprite();
            this.addChild(this._scrollBarHorz, this._scrollBarVert);
        }
        this._scrollBarHorz.bitmap = new Bitmap(this.innerWidth - 2 * thickness, thickness);
        this._scrollBarVert.bitmap = new Bitmap(thickness, this.innerHeight - 2 * thickness);
        this._scrollBarHorz.visible = this._scrollBarVert.visible = false;
    };
    Window_Scrollable.prototype.scrollbarHeight = function() {
        return this._allTextHeight !== undefined ? Math.max(0, this._allTextHeight) : this.overallHeight();
    };
    function draw(sprite, scroll, maximum, ratio, horizontal) {
        const bitmap = sprite.bitmap;
        bitmap.clear();
        if (maximum <= 0) return;
        bitmap.paintOpacity = options.OffBarOpacity;
        bitmap.fillRect(0, 0, bitmap.width, bitmap.height, ColorManager.getColor(options.OffBarColor));
        bitmap.paintOpacity = 255;
        const position = Math.round(scroll * ratio);
        bitmap.fillRect(horizontal ? position : 0, horizontal ? 0 : position,
            horizontal ? Math.round(bitmap.width * ratio) : bitmap.width,
            horizontal ? bitmap.height : Math.round(bitmap.height * ratio), ColorManager.getColor(options.BarBodyColor));
    }
    const update = Window_Scrollable.prototype.update;
    Window_Scrollable.prototype.update = function() {
        update.call(this);
        const horizontal = this._scrollBarHorz, vertical = this._scrollBarVert;
        if (!horizontal?.bitmap || !vertical?.bitmap) return;
        horizontal.visible = vertical.visible = this.isScrollBarVisible() && this.isOpen();
        const scrollX = this.scrollX(), maximumX = this.maxScrollX();
        const scrollY = this._allTextHeight !== undefined ? this.origin.y : this.scrollY();
        const maximumY = this._allTextHeight !== undefined ? Math.max(0, this._allTextHeight - this.innerHeight) : this.maxScrollY();
        const previous = cache.get(this);
        if (!previous || previous[0] !== scrollX || previous[1] !== maximumX) {
            draw(horizontal, scrollX, maximumX, this.innerWidth / this.overallWidth(), true);
        }
        if (!previous || previous[2] !== scrollY || previous[3] !== maximumY) {
            draw(vertical, scrollY, maximumY, this.innerHeight / this.scrollbarHeight(), false);
        }
        cache.set(this, [scrollX, maximumX, scrollY, maximumY]);
        horizontal.move(this.padding + thickness, this.padding + this.innerHeight + options.BarOffset);
        vertical.move(this.padding + this.innerWidth + options.BarOffset, this.padding + thickness);
    };
}
