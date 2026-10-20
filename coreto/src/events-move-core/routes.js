function installEventsMoveRoutes() {
    const directions = {'LOWER LEFT': 1, DOWN: 2, 'LOWER RIGHT': 3, LEFT: 4, RIGHT: 6, 'UPPER LEFT': 7, UP: 8, 'UPPER RIGHT': 9};
    const balloonNames = [[], ['!', 'EXCLAMATION'], ['?', 'QUESTION'], ['MUSIC', 'NOTE', 'MUSIC NOTE', 'MUSIC-NOTE', 'MUSICNOTE'],
        ['HEART', 'LOVE'], ['ANGER'], ['SWEAT'], ['COBWEB', 'ANNOYED', 'FRUSTRATION'], ['SILENCE', '...'],
        ['LIGHT', 'BULB', 'LIGHT BULB', 'LIGHT-BULB', 'LIGHTBULB'], ['Z', 'ZZ', 'ZZZ', 'SLEEP'],
        ['USER-DEFINED 1'], ['USER-DEFINED 2'], ['USER-DEFINED 3'], ['USER-DEFINED 4'], ['USER-DEFINED 5']];
    Game_CharacterBase.prototype.clearDashing = function() { this._forceDashing = false; };
    const locate = Game_Event.prototype.locate;
    Game_Event.prototype.locate = function(x, y) {
        locate.call(this, x, y);
        this._randomHomeX = x; this._randomHomeY = y;
    };
    const playerCollision = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        return !$gameTemp._moveAllowPlayerCollision && playerCollision.call(this, x, y);
    };
    for (const name of ['setMoveRoute', 'forceMoveRoute']) {
        const native = Game_Character.prototype[name];
        Game_Character.prototype[name] = function(route) { return native.call(this, JsonEx.makeDeepCopy(route)); };
    }
    Game_Character.prototype.processMoveRouteAnimation = function(id) { $gameTemp.requestAnimation([this], id); };
    Game_Character.prototype.processMoveRouteBalloon = function(name) {
        const id = balloonNames.findIndex(names => names.includes(name.toUpperCase().trim()));
        $gameTemp.requestBalloon(this, Math.max(0, id));
    };
    Game_Character.prototype.processMoveRouteFadeIn = function(amount) {
        this.setOpacity(Math.min(255, this.opacity() + amount));
        if (this.opacity() < 255) this._moveRouteIndex--;
    };
    Game_Character.prototype.processMoveRouteFadeOut = function(amount) {
        this.setOpacity(Math.max(0, this.opacity() - amount));
        if (this.opacity() > 0) this._moveRouteIndex--;
    };
    Game_Character.prototype.processMoveRouteSetIndex = function(index) {
        if (!ImageManager.isBigCharacter(this.characterName())) this.setImage(this.characterName(), Math.max(0, Math.min(7, index)));
    };
    Game_Character.prototype.processMoveRouteJumpForward = function(distance) {
        const direction = this.direction();
        this.jump(([1, 4, 7].includes(direction) ? -1 : [3, 6, 9].includes(direction) ? 1 : 0) * distance,
            ([1, 2, 3].includes(direction) ? 1 : [7, 8, 9].includes(direction) ? -1 : 0) * distance);
    };
    Game_Character.prototype.processMoveRouteJumpTo = function(x, y) { this.jump(Math.round(x - this.x), Math.round(y - this.y)); };
    Game_Character.prototype.processMoveRouteTeleportTo = function(x, y) { this.locate(x, y); };
    Game_Character.prototype.processMoveRouteStepTo = function(x, y, crash) {
        let direction;
        if (crash) $gameTemp._moveAllowPlayerCollision = true;
        try { direction = $gameMap.isSupportDiagonalMovement() ? this.findDiagonalDirectionTo(x, y) : this.findDirectionTo(x, y); }
        finally { if (crash) $gameTemp._moveAllowPlayerCollision = false; }
        this.executeMoveDir8(direction);
        this.setMovementSuccess(true);
    };
    Game_Character.prototype.processMoveRouteMoveTo = function(x, y, crash) {
        this.processMoveRouteStepTo(x, y, crash);
        if (this.x !== x || this.y !== y) this._moveRouteIndex--;
    };
    Game_Character.prototype.processMoveRouteMoveToCharacter = function(target, crash) {
        if (!target || target._erased) return;
        this.processMoveRouteMoveTo(target.x, target.y, crash);
        if (target.isNormalPriority() && this.isNormalPriority() && $gameMap.distance(this.x, this.y, target.x, target.y) <= 1) this._moveRouteIndex++;
    };
    Game_Character.prototype.processMoveRouteMoveRepeat = function(direction, count) {
        const code = [0, 5, 1, 6, 2, 0, 3, 7, 4, 8][direction];
        this._moveRoute.list[this._moveRouteIndex].parameters[0] = '';
        this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, ...Array.from({length: count}, () => ({code, indent: null, parameters: []})));
    };
    Game_Character.prototype.processMoveRouteMoveUntilStop = function(name, crash) {
        const direction = directions[name.toUpperCase().trim()];
        if (!direction) return;
        let passable;
        if (crash) $gameTemp._moveAllowPlayerCollision = true;
        try { passable = this.canPass(this.x, this.y, direction); }
        finally { if (crash) $gameTemp._moveAllowPlayerCollision = false; }
        if (passable) {
            this.executeMoveDir8(direction);
            if (this.isMovementSucceeded() || this._moveRoute.skippable) this._moveRouteIndex--;
        }
    };
    Game_Character.prototype.processMoveRouteHugWall = function(side) {
        const left = [0, 3, 6, 9, 2, 0, 8, 1, 4, 7], right = [0, 7, 4, 1, 8, 0, 2, 9, 6, 3];
        const direction = this.direction(), near = (side === 'left' ? left : right)[direction], far = (side === 'left' ? right : left)[direction];
        if (this.canPass(this.x, this.y, near)) side === 'left' ? this.turnLeft90() : this.turnRight90();
        else if (!this.canPass(this.x, this.y, direction)) {
            if (this.canPass(this.x, this.y, far)) side === 'left' ? this.turnRight90() : this.turnLeft90();
            else this.turn180();
        }
        if (this.canPass(this.x, this.y, this.direction())) this.moveForward();
    };
    Game_Character.prototype.convertVariableValuesInScriptCall = function(script) {
        return script.replace(/\\V\[(\d+)\]|\$gameVariables\.value\((\d+)\)/gi, (_, escapeId, callId) => String($gameVariables.value(Number(escapeId ?? callId))));
    };
    const nativeCommand = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        if (command.code !== Game_Character.ROUTE_SCRIPT) return nativeCommand.call(this, command);
        const script = this.convertVariableValuesInScriptCall(command.parameters[0]);
        let match;
        if ((match = /ANIMATION: (\d+)/i.exec(script))) return this.processMoveRouteAnimation(Number(match[1]));
        if ((match = /BALLOON: (.*)/i.exec(script))) return this.processMoveRouteBalloon(match[1]);
        if ((match = /FADE (IN|OUT): (\d+)/i.exec(script))) return match[1].toUpperCase() === 'IN' ? this.processMoveRouteFadeIn(Number(match[2])) : this.processMoveRouteFadeOut(Number(match[2]));
        if ((match = /FORCE (?:DASH|DASHING|RUN|RUNNING): (TRUE|ON|FALSE|OFF)/i.exec(script))) return /^(TRUE|ON)$/i.test(match[1]) ? this.forceDashing() : this.clearDashing();
        if ((match = /FORCE (?:CARRY|CARRYING|HOLD|HOLDING): (TRUE|ON|FALSE|OFF)/i.exec(script))) return /^(TRUE|ON)$/i.test(match[1]) ? this.forceCarrying() : this.clearCarrying();
        if ((match = /PATTERN LOCK: (\d+)/i.exec(script))) return this.processMoveRoutePatternLock(Number(match[1]));
        if (/PATTERN UNLOCK/i.test(script)) { this._patternLocked = false; return; }
        if ((match = /POSE: (.*)/i.exec(script))) return this.setPose(match[1]);
        if ((match = /HUG: (LEFT|RIGHT)/i.exec(script))) return this.processMoveRouteHugWall(match[1].toLowerCase());
        if ((match = /INDEX: ([+-]?\d+)/i.exec(script))) return this.processMoveRouteSetIndex(Number(match[1]) + (/^[+-]/.test(match[1]) ? this.characterIndex() : 0));
        if ((match = /JUMP FORWARD: (\d+)/i.exec(script))) return this.processMoveRouteJumpForward(Number(match[1]));
        if ((match = /MOVE (.*) UNTIL STOP/i.exec(script))) return this.processMoveRouteMoveUntilStop(match[1], /CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH/i.test(script));
        if ((match = /MOVE (LOWER LEFT|DOWN|LOWER RIGHT|LEFT|RIGHT|UPPER LEFT|UP|UPPER RIGHT): (\d+)/i.exec(script))) return this.processMoveRouteMoveRepeat(directions[match[1].toUpperCase()], Number(match[2]));
        if ((match = /OPACITY: ([+-]?\d+)([%％]?)/i.exec(script)) && (match[2] || /^[+-]/.test(match[1]))) {
            const amount = match[2] ? Math.round(Number(match[1]) / 100 * 255) : Number(match[1]);
            return this.setOpacity(Math.max(0, Math.min(255, amount + (/^[+-]/.test(match[1]) ? this.opacity() : 0))));
        }
        if ((match = /TURN (LOWER LEFT|LOWER RIGHT|UPPER LEFT|UPPER RIGHT)/i.exec(script))) return this.setDirection(directions[match[1].toUpperCase()]);
        if ((match = /(JUMP TO|MOVE TO|STEP TOWARD|STEP AWAY FROM|TURN TO|TURN AWAY FROM|TELEPORT TO)(?::\s*(\d+)\s*[, ]\s*(\d+)| EVENT: (\d+)| (PLAYER|HOME))/i.exec(script))) {
            const action = match[1].toUpperCase(), target = match[4] ? $gameMap.event(Number(match[4])) : match[5]?.toUpperCase() === 'PLAYER' ? $gamePlayer : null;
            const home = match[5]?.toUpperCase() === 'HOME';
            if (match[4] && (!target || target._erased) || home && !this.eventId) return;
            const x = target ? target.x : home ? this._randomHomeX : Number(match[2]);
            const y = target ? target.y : home ? this._randomHomeY : Number(match[3]);
            const crash = /CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH/i.test(script);
            if (action === 'MOVE TO' && target) return this.processMoveRouteMoveToCharacter(target, crash);
            const method = {'JUMP TO': 'processMoveRouteJumpTo', 'MOVE TO': 'processMoveRouteMoveTo', 'STEP TOWARD': 'processMoveRouteStepTo',
                'STEP AWAY FROM': 'moveAwayFromPoint', 'TURN TO': 'turnTowardPoint', 'TURN AWAY FROM': 'turnAwayFromPoint', 'TELEPORT TO': 'processMoveRouteTeleportTo'}[action];
            return this[method](x, y, crash);
        }
        return nativeCommand.call(this, command);
    };
}
