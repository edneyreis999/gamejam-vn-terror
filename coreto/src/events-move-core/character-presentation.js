function installEventsMoveCharacterPresentation(settings) {
    const base = Game_CharacterBase.prototype;
    const init = base.initMembers;
    base.initMembers = function() { init.call(this); this._scaleBaseX = 1; this._scaleBaseY = 1; this._patternLocked = false; this.clearPose(); this.clearSpriteOffsets(); this.clearStepPattern(); };
    ImageManager.isInvisibleCharacter = name => /\[INV(?:ISIBLE)?\]/i.test(name);
    base.isSpriteVS8dir = function() {
        if (this === $gamePlayer && this.isInVehicle()) return /\[VS8\]/i.test(this.vehicle().characterName());
        return !!this.hasDragonbones?.() || /\[VS8\]/i.test(this.characterName());
    };
    base.isDashingAndMoving = function() { return this.isDashing() && this._stopCount === 0; };
    base.clearPose = function() { this._pose = ''; this._poseDuration = 0; };
    base.getPose = function() { return this.isSpriteVS8dir() ? (this._pose || '').toUpperCase().trim() : ''; };
    base.isPosing = function() { return this.isSpriteVS8dir() && !!this._pose; };
    base.setPose = function(name, duration) { if (this.isSpriteVS8dir()) { this._pose = /Z|SLEEP/i.test(name) ? 'ZZZ' : name.toUpperCase().trim(); this._poseDuration = duration || Infinity; } };
    base.setBalloonPose = function(id, duration) { this.setPose(['', 'EXCLAMATION', 'QUESTION', 'MUSIC NOTE', 'HEART', 'ANGER', 'SWEAT', 'COBWEB', 'SILENCE', 'LIGHT BULB', 'ZZZ', '', '', '', '', ''][id] || '', duration); };
    base.forceCarrying = function() { this._forceCarrying = true; };
    base.clearCarrying = function() { this._forceCarrying = false; };
    base.useCarryPoseForIcons = function() { return settings.VS8.CarryPose; };
    const poseRows = [['EXCLAMATION', 'QUESTION', 'MUSIC NOTE', '!', '?'], ['HEART', 'ANGER', 'SWEAT'], ['ITEM', 'HMPH', 'VICTORY', 'COBWEB', 'SILENCE', 'LIGHT BULB'], ['HURT', 'KNEEL', 'COLLAPSE', 'ZZZ', 'SLEEP']];
    const poseColumns = [['ITEM', 'HURT', 'EXCLAMATION', '!', 'HEART', 'COBWEB'], ['HMPH', 'KNEEL', 'QUESTION', '?', 'ANGER', 'SILENCE'], ['VICTORY', 'COLLAPSE', 'MUSIC NOTE', 'SWEAT', 'LIGHT BULB']];
    base.getPosingCharacterIndex = function() { return ['ITEM', 'HMPH', 'VICTORY', 'HURT', 'KNEEL', 'COLLAPSE'].includes(this.getPose()) ? 6 : 7; };
    base.getPosingCharacterDirection = function() { const row = poseRows.findIndex(names => names.includes(this.getPose())); return row >= 0 ? (row + 1) * 2 : this._direction; };
    const direction = base.direction, pattern = base.pattern, index = base.characterIndex, facing = base.correctFacingDirection, diagonal = base.moveDiagonally;
    base.directionOnLadderSpriteVS8dir = function() { return this.isOnRope() ? 4 : 2; };
    base.direction = function() { if ($dataMap && this.isOnLadder() && !this.isJumping()) return this.isSpriteVS8dir() ? this.directionOnLadderSpriteVS8dir() : 8; return this.isPosing() ? this.getPosingCharacterDirection() : direction.call(this); };
    base.getPosingCharacterPattern = function() { const column = poseColumns.findIndex(names => names.includes(this.getPose())); return column >= 0 ? column : pattern.call(this); };
    base.pattern = function() { return this.isPosing() ? this.getPosingCharacterPattern() : pattern.call(this); };
    base.correctFacingDirection = function(value) { return this.isSpriteVS8dir() ? value : facing.call(this, value); };
    base.setDiagonalDirection = function(horizontal, vertical) { this.setDirection(vertical === 2 ? horizontal === 4 ? 1 : 3 : horizontal === 4 ? 7 : 9); };
    base.moveDiagonally = function(horizontal, vertical) { diagonal.call(this, horizontal, vertical); if (this.isSpriteVS8dir()) this.setDiagonalDirection(horizontal, vertical); };
    base.characterIndexVS8 = function() {
        const offset = this.isDiagonalDirection(this.direction()) ? 1 : 0;
        if (this.isJumping()) return 4 + offset;
        if (this.isOnLadder()) return 6;
        if (this.isPosing()) return this.getPosingCharacterIndex();
        if (this._forceCarrying || this.hasEventIcon() && this.useCarryPoseForIcons()) return 4 + offset;
        return (this.isDashingAndMoving() ? 2 : 0) + offset;
    };
    base.characterIndex = function() { return this.isSpriteVS8dir() ? this.characterIndexVS8() : index.call(this); };
    const step = base.hasStepAnime, update = base.update, updatePattern = base.updatePattern;
    base.hasStepAnime = function() { return this.getPose() === 'ZZZ' || step.call(this); };
    base.updateScaleBase = function() { this._scaleX = this._scaleBaseX ?? 1; this._scaleY = this._scaleBaseY ?? 1; };
    base.updatePose = function() { if (this._poseDuration > 0 && --this._poseDuration <= 0 && this._pose !== 'ZZZ') this.clearPose(); };
    base.update = function() { this.updateScaleBase(); update.call(this); this.updatePose(); };
    base.clearSpriteOffsets = function() { this._spriteOffsetX = 0; this._spriteOffsetY = 0; };
    base.clearStepPattern = function() { this._stepPattern = ''; };
    base.updatePatternEventsMoveCore = function() {
        if (!this.hasStepAnime() && this._stopCount > 0) return false;
        switch ((this._stepPattern || '').toUpperCase().trim()) {
            case 'LEFT TO RIGHT': this.setPattern((this._pattern + 1) % 3); break;
            case 'RIGHT TO LEFT': this.setPattern((this._pattern + 2) % 3); break;
            case 'SPIN CLOCKWISE': case 'SPIN CW': this.turnRight90(); break;
            case 'SPIN COUNTERCLOCKWISE': case 'SPIN CCW': case 'SPIN ANTICLOCKWISE': case 'SPIN ACW': this.turnLeft90(); break;
            default: return false;
        }
        return true;
    };
    base.updatePattern = function() { if (!this._patternLocked && !this.updatePatternEventsMoveCore()) updatePattern.call(this); };
    const screenX = base.screenX, screenY = base.screenY, bush = base.bushDepth;
    base.screenX = function() { return screenX.call(this) + (this._spriteOffsetX || 0); };
    base.screenY = function() { return screenY.call(this) + (this._spriteOffsetY || 0); };
    Game_CharacterBase.DEFAULT_SHIFT_Y = settings.Movement.ShiftY;
    base.shiftY = function() { return Math.round((this.isObjectCharacter() ? 0 : -Game_CharacterBase.DEFAULT_SHIFT_Y) * (this._scaleY ?? 1)); };
    base.bushDepth = function() { return Math.floor(bush.call(this) / Math.max(this._scaleY ?? 1, 0.00001)); };
    Game_Character.prototype.processMoveRoutePatternLock = function(value) { this._patternLocked = true; this.setPattern(value); };
    base.isShadowVisible = function() { return !this.isTile() && !this._isObjectCharacter && this.characterName() !== '' && !(this instanceof Game_Vehicle) && !this.isTransparent() && !this._noMovementShadow; };
    const followerShadow = base.isShadowVisible;
    Game_Follower.prototype.isShadowVisible = function() { return !$gamePlayer._noFollowerMovementShadow && this.isVisible() && followerShadow.call(this); };
    base.isShadowShrink = function() { return this.isOnLadder() || this === $gamePlayer && this.isInVehicle(); };
    base.shadowFilename = function() { return settings.Movement.DefaultShadow; };
    base.shadowX = function() { return this.screenX(); };
    base.shadowY = function() { return Math.floor((this.scrolledY() + 1) * $gameMap.tileHeight()); };
}
