function installEventsMovePilot(settings) {
    const movement = settings.Movement;
    Game_System.prototype.isPlayerControlDisabled = function() { return this._DisablePlayerControl ?? false; };
    Game_System.prototype.setPlayerControlDisable = function(disabled) { this._DisablePlayerControl = disabled; };
    Game_System.prototype.getPlayerDiagonalSetting = function() { return this._PlayerDiagonalSetting ?? 'default'; };
    Game_System.prototype.setPlayerDiagonalSetting = function(setting) { this._PlayerDiagonalSetting = String(setting).trim().toLowerCase(); };

    Game_Map.prototype.isSupportDiagonalMovement = function() {
        if (Utils.isMobileDevice() && !movement.PathfindMobileEnabled) return false;
        const override = $gameSystem.getPlayerDiagonalSetting();
        if (override === 'enable') return true;
        if (override === 'disable') return false;
        const note = $dataMap.note;
        if (/<Diagonal Movement: On>/i.test(note)) return true;
        if (/<Diagonal Movement: Off>/i.test(note)) return false;
        return settings.Movement.EnableDir8;
    };
    const canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() { return !$gameSystem.isPlayerControlDisabled() && canMove.call(this); };
    const inputDirection = Game_Player.prototype.getInputDirection;
    Game_Player.prototype.getInputDirection = function() {
        return $gameMap.isSupportDiagonalMovement() ? Input.dir8 : inputDirection.call(this);
    };
    Game_Map.prototype.roundXWithDirection = function(x, direction) {
        return this.roundX(x + ([1, 4, 7].includes(direction) ? -1 : [3, 6, 9].includes(direction) ? 1 : 0));
    };
    Game_Map.prototype.roundYWithDirection = function(y, direction) {
        return this.roundY(y + ([1, 2, 3].includes(direction) ? 1 : [7, 8, 9].includes(direction) ? -1 : 0));
    };
    Game_CharacterBase.prototype.isDiagonalDirection = function(direction) { return [1, 3, 7, 9].includes(direction); };
    Game_CharacterBase.prototype.correctFacingDirection = function(direction) {
        if (!this.isDiagonalDirection(direction)) return direction;
        const horizontal = direction % 3 === 1 ? 4 : 6;
        return this.canPass(this.x, this.y, horizontal) ? horizontal : direction < 5 ? 2 : 8;
    };
    const setDirection = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(direction) {
        setDirection.call(this, this.correctFacingDirection(direction));
        this.updateMoveSynchDirection();
    };
    Game_CharacterBase.prototype.lastMovedDirection = function() { return this._lastMovedDirection || 0; };
    const moveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(direction) {
        this._lastMovedDirection = direction;
        return moveStraight.call(this, direction);
    };
    Game_CharacterBase.prototype.executeMoveDir8 = function(direction) {
        if (!this.isDiagonalDirection(direction)) return this.moveStraight(direction);
        const horizontal = direction % 3 === 1 ? 4 : 6, vertical = direction < 5 ? 2 : 8;
        if (movement.StrictCollision) {
            if (!this.canPass(this.x, this.y, horizontal)) return this.moveStraight(vertical);
            if (!this.canPass(this.x, this.y, vertical)) return this.moveStraight(horizontal);
            if (!this.canPassDiagonally(this.x, this.y, horizontal, vertical)) {
                return this.moveStraight(movement.FavorHorz ? horizontal : vertical);
            }
        }
        this._lastMovedDirection = direction;
        this.moveDiagonally(horizontal, vertical);
    };
    const executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        return $gameMap.isSupportDiagonalMovement() ? this.executeMoveDir8(direction) : executeMove.call(this, direction);
    };
    Game_CharacterBase.prototype.forceDashing = function() { this._forceDashing = true; };
    Game_CharacterBase.prototype.dashSpeedModifier = function() { return movement.DashModifier; };
    Game_CharacterBase.prototype.adjustDir8MovementSpeed = function(speed) {
        return movement.SlowerSpeed && this.isDiagonalDirection(this.lastMovedDirection()) ? speed * (movement.DiagonalSpeedMultiplier || 0.01) : speed;
    };
    Game_CharacterBase.prototype.realMoveSpeed = function() {
        return this.adjustDir8MovementSpeed(this._moveSpeed + (this.isDashing() ? this.dashSpeedModifier() : 0));
    };
    for (const type of [Game_CharacterBase, Game_Player]) {
        const isDashing = type.prototype.isDashing;
        type.prototype.isDashing = function() {
            if (!movement.DashOnLadder && this.isOnLadder()) return false;
            return this._forceDashing || isDashing.call(this);
        };
    }
    Game_Follower.prototype.realMoveSpeed = function() { return $gamePlayer.realMoveSpeed(); };
    const initMoveSpeed = Game_Vehicle.prototype.initMoveSpeed;
    Game_Vehicle.prototype.initMoveSpeed = function() {
        initMoveSpeed.call(this);
        const speed = this.isBoat() ? movement.BoatSpeed : this.isShip() ? movement.ShipSpeed : movement.AirshipSpeed;
        if (speed) this.setMoveSpeed(speed);
    };
}
