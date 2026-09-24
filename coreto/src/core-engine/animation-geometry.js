function installAnimationGeometry(settings) {
    const options = settings.QoL;
    Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
        const name = this._animation.name;
        const height = sprite.height * sprite.scale.y;
        let x = 0, y = -height / 2;
        if (/<(?:HEAD|HEADER|TOP)>/i.test(name)) y = -height;
        if (/<(?:FOOT|FOOTER|BOTTOM)>/i.test(name) || this._animation.alignBottom) y = 0;
        if (/<LEFT>/i.test(name)) x = -sprite.width / 2;
        if (/<RIGHT>/i.test(name)) x = sprite.width / 2;
        const anchorX = name.match(/<ANCHOR X: (\d+\.?\d*)>/i);
        const anchorY = name.match(/<ANCHOR Y: (\d+\.?\d*)>/i);
        const anchor = name.match(/<ANCHOR: (\d+\.?\d*), (\d+\.?\d*)>/i);
        if (anchorX) x = Number(anchorX[1]) * sprite.width;
        if (anchorY) y = (Number(anchorY[1]) - 1) * height;
        if (anchor) {
            x = Number(anchor[1]) * sprite.width;
            y = (Number(anchor[2]) - 1) * height;
        }
        const offsetX = name.match(/<OFFSET X: ([+-]\d+)>/i);
        const offsetY = name.match(/<OFFSET Y: ([+-]\d+)>/i);
        const offset = name.match(/<OFFSET: ([+-]\d+), ([+-]\d+)>/i);
        if (offsetX) x += Number(offsetX[1]);
        if (offsetY) y += Number(offsetY[1]);
        if (offset) {
            x += Number(offset[1]);
            y += Number(offset[2]);
        }
        sprite.updateTransform();
        return sprite.worldTransform.apply(new Point(x, y));
    };
    Sprite_Animation.prototype.isAnimationOffsetXMirrored = function() {
        if (!this._animation) return false;
        const name = this._animation.name || "";
        if (/<MIRROR OFFSET X>/i.test(name)) return true;
        if (/<NO MIRROR OFFSET X>/i.test(name)) return false;
        return options.AnimationMirrorOffset;
    };
    const viewport = Sprite_Animation.prototype.setViewport;
    Sprite_Animation.prototype.setViewport = function(renderer) {
        if (!this.isAnimationOffsetXMirrored()) return viewport.call(this, renderer);
        const size = this._viewportSize;
        const position = this.targetPosition(renderer);
        const offsetX = this._animation.offsetX * (this._mirror ? -1 : 1);
        renderer.gl.viewport(position.x + offsetX - size / 2,
            position.y + this._animation.offsetY - size / 2, size, size);
    };
    Sprite_AnimationMV.prototype.setupRate = function() {
        const tag = (this._animation.name || "").match(/<RATE: (\d+)>/i);
        this._rate = Math.min(Math.max(tag ? Number(tag[1]) || 1 : options.MvAnimationRate, 1), 10);
    };
}
