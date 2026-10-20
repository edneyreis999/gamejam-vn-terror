function installEventsMoveNavigation(settings) {
    Game_CharacterBase.DIAGONAL_PATHFINDING_EVENT_LIMIT = 100;
    Game_Map.prototype.isPassableByAnyDirection = function(x, y) {
        return [2, 4, 6, 8].some(direction => this.isPassable(x, y, direction));
    };
    Game_CharacterBase.prototype.getDiagonalDestination = function(x, y) {
        const chasing = this instanceof Game_Event && this.isChaseEnabled?.() && (this.isChaseAlerted() || this.isChaseReturning());
        const diagonal = chasing ? this.canChaseDiagonally() : $gameMap.isSupportDiagonalMovement();
        return !TouchInput.isPressed() && diagonal &&
            !$gameMap.eventsXyNt(x, y).length && $gameMap.isPassableByAnyDirection(x, y) &&
            $gameMap._events.length < Game_CharacterBase.DIAGONAL_PATHFINDING_EVENT_LIMIT;
    };
    Game_Character.prototype.findDiagonalDirectionTo = function(x, y) {
        const cardinal = this.findDirectionTo(x, y);
        if (!this.getDiagonalDestination(x, y) || this.isCollidedWithEvents(x, y)) return cardinal;
        let direction = cardinal;
        const east = this.canPass(this.x, this.y, 6), west = this.canPass(this.x, this.y, 4);
        if (cardinal === 2 || cardinal === 8) {
            if (x > this.x && east) direction = cardinal === 2 ? 3 : 9;
            if (x < this.x && west) direction = cardinal === 2 ? 1 : 7;
        } else if (cardinal === 4 || cardinal === 6) {
            if (y > this.y && west) direction = cardinal === 4 ? 1 : 3;
            if (y < this.y && east) direction = cardinal === 4 ? 7 : 9;
        }
        if (!this.canPass(this.x, this.y, direction)) return cardinal;
        const nextX = $gameMap.roundXWithDirection(this.x, direction), nextY = $gameMap.roundYWithDirection(this.y, direction);
        return this.isCollidedWithEvents(nextX, nextY) ? cardinal : direction;
    };
    Game_Character.prototype.getDirectionToPoint = function(x, y, diagonal) {
        const dx = this.deltaXFrom(x), dy = this.deltaYFrom(y);
        if (diagonal && $gameMap.isSupportDiagonalMovement() && dx && dy) return dy > 0 ? (dx > 0 ? 7 : 9) : (dx > 0 ? 1 : 3);
        if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 4 : 6;
        return dy ? (dy > 0 ? 8 : 2) : 0;
    };
    Game_Character.prototype.getDirectionFromPoint = function(x, y, diagonal) {
        const direction = this.getDirectionToPoint(x, y, diagonal);
        return direction ? this.reverseDir(direction) : 0;
    };
    for (const [name, away, turn] of [['moveTowardPoint', false, false], ['moveAwayFromPoint', true, false],
        ['turnTowardPoint', false, true], ['turnAwayFromPoint', true, true]]) {
        Game_Character.prototype[name] = function(x, y) {
            const direction = away ? this.getDirectionFromPoint(x, y, !turn) : this.getDirectionToPoint(x, y, !turn);
            if (direction) turn ? this.setDirection(direction) : this.executeMoveDir8(direction);
        };
    }
    Game_Player.prototype.isTurnInPlace = function() {
        return settings.Movement.EnableTurnInPlace && !$gameTemp.isDestinationValid() &&
            !this.isDashing() && !this.isMoving() && !this.isOnLadder() && this._inputTime < settings.Movement.TurnInPlaceDelay;
    };
    Game_Player.prototype.moveByInput = function() {
        if ($gameSystem.isPlayerControlDisabled() || this.isMoving() || !this.canMove()) return;
        let direction = this.getInputDirection();
        if (direction > 0) $gameTemp.clearDestination();
        else if ($gameTemp.isDestinationValid()) {
            const x = $gameTemp.destinationX(), y = $gameTemp.destinationY();
            direction = this.getDiagonalDestination(x, y) ? this.findDiagonalDirectionTo(x, y) : this.findDirectionTo(x, y);
        }
        if (direction > 0) {
            this._inputTime = this._inputTime || 0;
            this.isTurnInPlace() ? this.setDirection(direction) : this.executeMove(direction);
            this._inputTime++;
        } else this._inputTime = 0;
    };
}
