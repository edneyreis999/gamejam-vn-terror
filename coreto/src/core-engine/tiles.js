function installExtendedTiles() {
    const derived = new WeakMap();
    function terrainHeights(map) {
        const tileset = map.tileset();
        const cached = derived.get(map);
        if (cached?.tileset === tileset) return cached.heights;
        const heights = new Map();
        for (const match of (tileset?.note || "").matchAll(/<(?:TALLER|EXT|EXTEND|RAISE) BY (\d+): (.*)>/gi)) {
            const height = Math.min(Math.max(Number(match[1]), 1), 16);
            for (const raw of match[2].split(",")) heights.set(Math.min(Math.max(Number(raw), 1), 7), height);
        }
        derived.set(map, { tileset, heights });
        return heights;
    }
    Game_Map.prototype.tileExtendHeight = function(tileId) {
        if (tileId >= 1024) return 0;
        return terrainHeights(this).get(this.tilesetFlags()[tileId] >> 12) || 0;
    };
    Game_Map.prototype.isTileExtended = function(tileId) {
        return this.tileExtendHeight(tileId) > 0;
    };
    const setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(...args) {
        derived.delete(this);
        return setup.apply(this, args);
    };

    class ExtendedTile extends Sprite {
        constructor(tileId, mapX, mapY) {
            super();
            this._mapX = mapX;
            this._mapY = mapY;
            const width = $gameMap.tileWidth();
            const height = $gameMap.tileHeight();
            const extra = $gameMap.tileExtendHeight(tileId) * height;
            const sx = ((Math.floor(tileId / 128) % 2) * 8 + tileId % 8) * width;
            const sy = Math.floor((tileId % 256) / 8) % 16 * height;
            const image = $gameMap.tileset().tilesetNames[5 + Math.floor(tileId / 256)];
            const body = new Sprite(ImageManager.loadTileset(image));
            body.anchor.set(0.5, 1);
            body.y = -(Game_CharacterBase.DEFAULT_SHIFT_Y || -6) + 1;
            body.setFrame(sx, sy - extra, width, height + extra);
            this.addChild(body);
            this.z = $gameMap.tilesetFlags()[tileId] & 0x10 ? 4 : 3;
            this.updatePosition();
        }

        update() {
            super.update();
            this.updatePosition();
        }

        updatePosition() {
            this.x = Math.floor(($gameMap.adjustX(this._mapX) + 0.5) * $gameMap.tileWidth());
            this.y = Math.floor(($gameMap.adjustY(this._mapY) + 1) * $gameMap.tileHeight()) +
                (Game_CharacterBase.DEFAULT_SHIFT_Y || -6) - 1;
        }
    }

    const addTile = Tilemap.prototype._addSpotTile;
    Tilemap.prototype._addSpotTile = function(tileId, ...args) {
        if (!$gameMap.isTileExtended(tileId)) return addTile.call(this, tileId, ...args);
    };
    const addShadow = Tilemap.prototype._addShadow;
    Tilemap.prototype._addShadow = function(...args) {
        if (!$gameMap || !$gameMap.areTileShadowsHidden()) return addShadow.apply(this, args);
    };
    Spriteset_Map.prototype.removeTileExtendSprites = function() {
        for (const sprite of this._tileExtendSprites || []) {
            this._tilemap.removeChild(sprite);
            sprite.destroy();
        }
        this._tileExtendSprites = [];
    };
    Spriteset_Map.prototype.createTileExtendSprites = function() {
        this.removeTileExtendSprites();
        if (terrainHeights($gameMap).size === 0) return;
        for (let y = 0; y < $gameMap.height(); y++) {
            for (let x = 0; x < $gameMap.width(); x++) {
                for (const tileId of $gameMap.layeredTiles(x, y)) {
                    if ($gameMap.isTileExtended(tileId)) {
                        const sprite = new ExtendedTile(tileId, x, y);
                        this._tileExtendSprites.push(sprite);
                        this._tilemap.addChild(sprite);
                    }
                }
            }
        }
    };
    const loadTileset = Spriteset_Map.prototype.loadTileset;
    Spriteset_Map.prototype.loadTileset = function(...args) {
        const result = loadTileset.apply(this, args);
        this.createTileExtendSprites();
        return result;
    };
    const destroy = Spriteset_Map.prototype.destroy;
    Spriteset_Map.prototype.destroy = function(...args) {
        this.removeTileExtendSprites();
        return destroy.apply(this, args);
    };
}
