api.Sprite_Animation_targetSpritePosition = Sprite_Animation.prototype.targetSpritePosition;
Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
    if (sprite.constructor !== Sprite_Picture) return api.Sprite_Animation_targetSpritePosition.call(this, sprite);
    const name = this._animation.name;
    let x = 0.5, y = 0.5, offsetX = 0, offsetY = 0;
    if (/<(?:HEAD|HEADER|TOP)>/i.test(name)) y = 0;
    if (/<(?:FOOT|FOOTER|BOTTOM)>/i.test(name) || this._animation.alignBottom) y = 1;
    if (/<LEFT>/i.test(name)) x = 0;
    if (/<RIGHT>/i.test(name)) x = 1;
    const anchorX = name.match(/<ANCHOR X: (\d+\.?\d*)>/i);
    const anchorY = name.match(/<ANCHOR Y: (\d+\.?\d*)>/i);
    const anchor = name.match(/<ANCHOR: (\d+\.?\d*), (\d+\.?\d*)>/i);
    if (anchorX) x = Number(anchorX[1]);
    if (anchorY) y = Number(anchorY[1]);
    if (anchor) { x = Number(anchor[1]); y = Number(anchor[2]); }
    const deltaX = name.match(/<OFFSET X: ([+-]\d+)>/i);
    const deltaY = name.match(/<OFFSET Y: ([+-]\d+)>/i);
    const delta = name.match(/<OFFSET: ([+-]\d+), ([+-]\d+)>/i);
    if (deltaX) offsetX = Number(deltaX[1]);
    if (deltaY) offsetY = Number(deltaY[1]);
    if (delta) { offsetX = Number(delta[1]); offsetY = Number(delta[2]); }
    const point = new Point((x - sprite.anchor.x) * sprite.width + offsetX, (y - sprite.anchor.y) * sprite.height + offsetY);
    sprite.updateTransform();
    return sprite.worldTransform.apply(point);
};
