function installEventsMovePresentationSprites(settings) {
    const sprite = Sprite_Character.prototype, init = sprite.initMembers, update = sprite.update, bitmap = sprite.setCharacterBitmap;
    sprite.initMembers = function() { init.call(this); this.createAttachPictureSprite(); this.createIconSprite(); };
    sprite.createIconSprite = function() { const icon = this._eventIconSprite = new Sprite(ImageManager.loadSystem('IconSet')); icon.bitmap.smooth = false; icon.anchor.set(0.5, 1); icon.setFrame(0, 0, 0, 0); this.addChild(icon); };
    sprite.createAttachPictureSprite = function() { const picture = this._attachPictureSprite = new Sprite(); picture.anchor.set(0.5, 1); this.addChild(picture); };
    sprite.isSpriteVS8dir = function() { return /\[VS8\]/i.test(this._characterName); };
    sprite.characterPatternYVS8 = function() { const directions = this._character._mirrorSprite ? [2, 4, 2, 2, 6, 2, 4, 8, 8, 6] : [2, 2, 2, 4, 4, 2, 6, 6, 8, 8]; return (directions[this._character.direction()] - 2) / 2; };
    sprite.characterPatternYBasic = function() { let direction = this._character.direction(); if (this._character._mirrorSprite && [4, 6].includes(direction)) direction = 10 - direction; return (direction - 2) / 2; };
    sprite.characterPatternY = function() { return this.isSpriteVS8dir() ? this.characterPatternYVS8() : this.characterPatternYBasic(); };
    sprite.setCharacterBitmap = function() {
        bitmap.call(this);
        const source = this.bitmap, name = this._characterName;
        source.addLoadListener(() => {
            if (this._destroyed || this.bitmap !== source || this._characterName !== name) return;
            source.smooth = settings.Movement.BitmapSmoothing;
            if (ImageManager.isInvisibleCharacter(name)) { this._invisibleBitmap?.destroy(); this._invisibleBitmap = new Bitmap(source.width, source.height); this.bitmap = this._invisibleBitmap; }
        });
    };
    sprite.getTileExpandData = function() { return this._character._tileExpand || {}; };
    sprite.updateTileFrame = function() {
        const width = this.patternWidth(), height = this.patternHeight(), tile = this._tileId, expand = this.getTileExpandData();
        const left = expand.left || 0, right = expand.right || 0, up = expand.up || 0, down = expand.down || 0;
        this.setFrame((Math.floor(tile / 128) % 2 * 8 + tile % 8 - left) * width, (Math.floor(tile % 256 / 8) % 16 - up) * height, width * (1 + left + right), height * (1 + up + down));
    };
    sprite.getEventIconIndex = function() { return this._character && !this._character._erased ? this._character.getEventIconData()?.iconIndex || 0 : 0; };
    sprite.isAutoBufferIcon = function() { return this.isSpriteVS8dir() && settings.VS8.AutoBuffer; };
    sprite.autoEventIconBuffer = function(icon) { icon.x = 0; icon.y = -this.height * 3 / 5 + (this._character.pattern() === 1 ? 0 : 1); };
    sprite.updateEventIconSprite = function() {
        const icon = this._eventIconSprite, index = this.getEventIconIndex();
        if (index <= 0) { icon.setFrame(0, 0, 0, 0); return; }
        icon.setFrame(index % 16 * ImageManager.iconWidth, Math.floor(index / 16) * ImageManager.iconHeight, ImageManager.iconWidth, ImageManager.iconHeight);
        const data = this._character.getEventIconData();
        if (this.isAutoBufferIcon()) this.autoEventIconBuffer(icon);
        else { icon.x = data.bufferX; icon.y = -this.height + data.bufferY; }
        icon.blendMode = data.blendMode; icon.rotation = -this.rotation;
        this.removeChild(icon); this.addChild(icon); this.visible = true;
    };
    sprite.isEventsMoveCoreInvisible = function() { if (this.getEventIconIndex() > 0 || this._character?.attachPictureFilename()) return false; return this.isEmptyCharacter() || this._character?.isTransparent(); };
    sprite.updateVisibility = function() { Sprite.prototype.updateVisibility.call(this); if (this.isEventsMoveCoreInvisible()) this.visible = false; };
    sprite.updateScaleBase = function() { this.scale.set(this._character._scaleX ?? 1, this._character._scaleY ?? 1); };
    sprite.isAllowCharacterTilt = function() { return !this._dragonbones && this._character.isDashingAndMoving() && !this._character.isOnLadder() && !this._character.isPosing() && this.getEventIconIndex() === 0; };
    sprite.updateTilt = function() {
        if (!settings.Movement.EnableDashTilt) return;
        this.rotation = 0;
        if (!this.isAllowCharacterTilt()) return;
        const direction = this._character.direction(), movement = settings.Movement;
        this.rotation = [1, 4, 7].includes(direction) ? movement.TiltLeft : [3, 6, 9].includes(direction) ? movement.TiltRight : [-movement.TiltVert, 0, movement.TiltVert][this._character.pattern()];
        if (this._reflection) this.rotation *= -1;
    };
    sprite.updateEventCustomZ = function() { const z = this._character._customZ; if (z !== undefined && z !== false) { this.z = z; if (this._shadowSprite) this._shadowSprite.z = z < 0 ? z - 1 : 0; } };
    sprite.updateEventMirrorSprite = function() { this.scale.x = Math.abs(this.scale.x) * (this._character._mirrorSprite ? -1 : 1); };
    sprite.updateShadow = function() {
        const shadow = this._shadowSprite, event = this._character;
        if (!shadow) return;
        if (shadow._filename !== event.shadowFilename()) { shadow._filename = event.shadowFilename(); shadow.bitmap = ImageManager.loadSystem(shadow._filename); }
        shadow.x = event.shadowX(); shadow.y = event.shadowY(); shadow.opacity = this.opacity; shadow.visible = event.isShadowVisible(); shadow._hidden = this._hidden;
        if (event.isShadowShrink()) shadow.scale.set(Math.max(0, shadow.scale.x - 0.1), Math.max(0, shadow.scale.y - 0.1));
        else shadow.scale.set(this.scale.x, this.scale.y);
    };
    sprite.needsAttachPictureUpdate = function() { const data = this._character.attachPictureSettings(); return this._lastAttachPictureFilename !== data.filename || this._lastAttachPictureType !== data.type || this._lastAttachPictureMaxSize !== data.maxSize || this._lastAttachPictureScale !== data.scale; };
    sprite.setupAttachPictureBitmap = function() {
        if (!this.needsAttachPictureUpdate()) return;
        const data = this._character.attachPictureSettings();
        this._lastAttachPictureFilename = data.filename; this._lastAttachPictureType = data.type; this._lastAttachPictureMaxSize = data.maxSize; this._lastAttachPictureScale = data.scale;
        const request = this._attachRequest = {};
        if (!data.filename) { this._attachPictureSprite.bitmap = null; return; }
        const image = data.type === 'enemy' ? ImageManager.loadEnemy(data.filename) : data.type === 'sv enemy' ? ImageManager.loadSvEnemy(data.filename) : ImageManager.loadPicture(data.filename);
        image.addLoadListener(() => { if (!this._destroyed && this._attachRequest === request && this._character.attachPictureSettings() === data) this.onLoadAttachPicture(image); });
    };
    sprite.getAttachPictureBitmapWidth = function() { return this._attachPictureSprite.bitmap?.width || 0; };
    sprite.getAttachPictureBitmapHeight = function() { return this._attachPictureSprite.bitmap?.height || 0; };
    sprite.onLoadAttachPicture = function(image) {
        const data = this._character.attachPictureSettings(), picture = this._attachPictureSprite;
        picture.bitmap = image;
        const scale = (data.maxSize > 0 ? data.maxSize / Math.max(1, this.getAttachPictureBitmapWidth(), this.getAttachPictureBitmapHeight()) : 1) * data.scale;
        picture.scale.set(scale, scale); if (scale !== 1) image.smooth = true;
        this.visible = true; this.updateAttachPictureBitmap();
    };
    sprite.updateAttachPictureBitmap = function() { const data = this._character.attachPictureSettings(), picture = this._attachPictureSprite; picture.x = data.offsetX; picture.y = data.offsetY; picture.blendMode = data.blendMode; picture.visible = !this._character._erased; };
    sprite.updateAttachPictureSprite = function() { if (this._character) { this.setupAttachPictureBitmap(); this.updateAttachPictureBitmap(); } };
    sprite.updateEventsAndMovementCore = function() { this.updateScaleBase(); this.updateTilt(); this.updateShadow(); this.updateEventIconSprite(); this.updateEventCustomZ(); this.updateEventMirrorSprite(); this.updateAttachPictureSprite(); };
    sprite.update = function() { update.call(this); if (this._character) this.updateEventsAndMovementCore(); };
    const destroy = sprite.destroy;
    sprite.destroy = function() { this._attachRequest = null; this._invisibleBitmap?.destroy(); destroy.call(this); };
    Spriteset_Map.prototype.createCharacterShadow = function(character) { const shadow = character._shadowSprite = new Sprite(ImageManager.loadSystem(character._character.shadowFilename())); shadow._filename = character._character.shadowFilename(); shadow.anchor.set(0.5, 1); shadow.z = settings.Movement.ShadowLayer; this._tilemap.addChild(shadow); };
    Spriteset_Map.prototype.createShadows = function() { if (settings.Movement.ShowShadows) for (const character of this._characterSprites) this.createCharacterShadow(character); };
    const lower = Spriteset_Map.prototype.createLowerLayer, spawn = Spriteset_Map.prototype.createSpawnedEvent;
    Spriteset_Map.prototype.createLowerLayer = function() { lower.call(this); this.createShadows(); };
    Spriteset_Map.prototype.createSpawnedEvent = function(event) { spawn.call(this, event); if (settings.Movement.ShowShadows) this.createCharacterShadow(this.findTargetSprite(event)); };
    const balloonSetup = Sprite_Balloon.prototype.setup, balloonPosition = Sprite_Balloon.prototype.updatePosition;
    Sprite_Balloon.prototype.setup = function(target, id) { balloonSetup.call(this, target, id); if (settings.VS8.AutoBalloon) target._character?.setBalloonPose(id, this._duration); };
    Sprite_Balloon.prototype.updatePosition = function() { balloonPosition.call(this); if (this._target._character?.isSpriteVS8dir()) { this.x += settings.VS8.BalloonOffsetX; this.y += settings.VS8.BalloonOffsetY; } };
}
