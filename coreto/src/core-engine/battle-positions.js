function installBattlePositions(settings) {
    const startMove = Sprite_Battler.prototype.startMove;
    Sprite_Battler.prototype.startMove = function(x, y, duration) {
        const changed = this._targetOffsetX !== x || this._targetOffsetY !== y;
        const originX = this._offsetX, originY = this._offsetY;
        const result = startMove.call(this, x, y, duration);
        if (changed) {
            this._movementOriginX = originX;
            this._movementOriginY = originY;
            this._movementWholeDuration = duration;
            this._moveEasingType = 'Linear';
        }
        return result;
    };
    Sprite_Battler.prototype.setMoveEasingType = function(type) { this._moveEasingType = type; };
    Sprite_Battler.prototype.applyEasing = function(current, target, duration, wholeDuration, type, origin) {
        const before = applyEasing((wholeDuration - duration) / wholeDuration, type || 'Linear');
        const after = applyEasing((wholeDuration - duration + 1) / wholeDuration, type || 'Linear');
        if (origin === undefined) {
            if (before === 1) throw new CoreError('EASING_ORIGIN_REQUIRED', 'This curve has already reached its target; provide the original coordinate as the sixth argument.');
            origin = (current - target * before) / (1 - before);
        }
        return origin + (target - origin) * after;
    };
    Sprite_Battler.prototype.updateMove = function() {
        if (this._movementDuration <= 0) return;
        this._offsetX = this.applyEasing(this._offsetX, this._targetOffsetX, this._movementDuration, this._movementWholeDuration, this._moveEasingType, this._movementOriginX);
        this._offsetY = this.applyEasing(this._offsetY, this._targetOffsetY, this._movementDuration, this._movementWholeDuration, this._moveEasingType, this._movementOriginY);
        this._movementDuration--;
        if (this._movementDuration === 0) this.onMoveEnd();
    };
    const resolution = settings.ScreenResolution;
    const setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        if (!resolution.RepositionActors) return setActorHome.call(this, index);
        const x = Math.round(Graphics.width / 2 + 192) - Math.floor((Graphics.width - Graphics.boxWidth) / 2) + index * 32;
        const y = Graphics.height - 200 - $gameParty.maxBattleMembers() * 48 - Math.floor((Graphics.height - Graphics.boxHeight) / 2) + index * 48;
        this.setHome(x, y);
    };
    const screenX = Game_Enemy.prototype.screenX;
    const screenY = Game_Enemy.prototype.screenY;
    const enabled = resolution.RepositionEnemies && resolution.RepositionEnemies130;
    Spriteset_Battle.prototype.coreEngineRepositionEnemies = function() { return Boolean(enabled); };
    // BattleCore requests a preparatory coordinate mutation. The getters below already
    // apply that projection, including after resize; base troop coordinates stay intact.
    Spriteset_Battle.prototype.repositionEnemiesByResolution = function() {};
    Game_Enemy.prototype.screenX = function() {
        const x = screenX.call(this);
        if (!enabled) return x;
        return x + ($gameSystem.isSideView() ? -Math.floor((Graphics.width - Graphics.boxWidth) / 2) : Math.round((Graphics.boxWidth - 816) / 2));
    };
    Game_Enemy.prototype.screenY = function() {
        const y = screenY.call(this);
        return enabled ? y + Math.round((Graphics.height - 624) / 2) - Math.floor((Graphics.height - Graphics.boxHeight) / 2) : y;
    };
}
