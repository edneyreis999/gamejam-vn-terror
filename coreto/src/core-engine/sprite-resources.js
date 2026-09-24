function releaseModifiedBitmap(bitmap) {
    if (bitmap?._customModified && bitmap._baseTexture && !bitmap._baseTexture.destroyed) bitmap.destroy();
}

function installSpriteResources() {
    Bitmap.prototype.markCoreEngineModified = function() { this._customModified = true; };
    for (const method of ["resize", "blt", "clearRect", "fillRect", "strokeRect", "gradientFillRect", "drawCircle", "drawText"]) {
        const mutate = Bitmap.prototype[method];
        Bitmap.prototype[method] = function(...args) {
            if (method === "blt") {
                for (let index = 1; index <= 6; index++) args[index] = Math.round(args[index]);
            } else if (method === "drawCircle") {
                for (let index = 0; index < 3; index++) args[index] = Math.round(args[index]);
            }
            const result = mutate.apply(this, args);
            this.markCoreEngineModified();
            return result;
        };
    }
    const destroy = Sprite.prototype.destroy;
    Sprite.prototype.destroy = function(...args) {
        const bitmap = this.bitmap;
        if (this._texture) destroy.apply(this, args);
        else if (!this._destroyed) PIXI.Container.prototype.destroy.call(this, { children: true });
        releaseModifiedBitmap(bitmap);
    };
}
