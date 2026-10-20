function installEventsMoveAutonomous(settings) {
    Game_System.prototype.isAllowEventAutoMovement = function() { return this._EventsMoveCoreSettings?.EventAutoMovement ?? true; };
    Game_System.prototype.setAllowEventAutoMovement = function(enabled) {
        this._EventsMoveCoreSettings ??= {};
        this._EventsMoveCoreSettings.EventAutoMovement = enabled;
    };
    Game_System.prototype.isDashingEnabled = function() { return this._EventsMoveCoreSettings?.DashingEnable ?? true; };
    Game_System.prototype.setDashingEnabled = function(enabled) {
        this._EventsMoveCoreSettings ??= {};
        this._EventsMoveCoreSettings.DashingEnable = enabled;
    };
    const dashDisabled = Game_Map.prototype.isDashDisabled;
    Game_Map.prototype.isDashDisabled = function() { return !$gameSystem.isDashingEnabled() || dashDisabled.call(this); };
    const setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        setupPage.call(this);
        this._randomMoveWeight = settings.Movement.RandomMoveWeight;
        this._moveSynch = {target: -1, type: 'random', delay: 1, opacityDelta: 0};
        const lines = [this.event().note, ...(this.page()?.list ?? []).filter(command => command.code === 108 || command.code === 408).map(command => command.parameters[0])];
        for (const line of lines) {
            if (/<TRUE RANDOM MOVE>/i.test(line)) this._randomMoveWeight = 0;
            else {
                const match = /<RANDOM MOVE WEIGHT: (.*?)>/i.exec(line);
                if (match) this._randomMoveWeight = Number(match[1]) || 0;
            }
            const target = /<MOVE SYNCH TARGET: (.*?)>/i.exec(line);
            if (target) {
                if (/PLAYER/i.test(target[1])) this._moveSynch.target = 0;
                else {
                    const event = /EVENT (\d+)/i.exec(target[1]);
                    if (event) this._moveSynch.target = Number(event[1]);
                }
            }
            const type = /<MOVE SYNCH TYPE: (.*?)>/i.exec(line);
            if (type) this._moveSynch.type = type[1].toLowerCase().trim();
            const delay = /<MOVE SYNCH DELAY: (\d+)>/i.exec(line);
            if (delay) this._moveSynch.delay = Number(delay[1]);
            const opacity = /<MOVE SYNCH DISTANCE OPACITY: (.*?)>/i.exec(line);
            if (opacity) this._moveSynch.opacityDelta = Number(opacity[1]);
        }
    };
    Game_Event.prototype.isPreventSelfMovement = function() {
        return $gameMap.isEventRunning() && settings.Movement.StopAutoMoveEvents ||
            $gameMessage.isBusy() && settings.Movement.StopAutoMoveMessages ||
            !$gameSystem.isAllowEventAutoMovement() || this.moveSynchTarget() >= 0 || !SceneManager._scene._active;
    };
    const selfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function() {
        if (this.isPreventSelfMovement()) return;
        selfMovement.call(this);
        if (this.isMoving()) VisuMZ.MoveAllSynchTargets(this.eventId());
    };
    Game_Event.prototype.moveBackToRandomHome = function() {
        const dx = this.deltaXFrom(this._randomHomeX), dy = this.deltaYFrom(this._randomHomeY);
        if (Math.abs(dx) > Math.abs(dy)) {
            this.moveStraight(dx > 0 ? 4 : 6);
            if (!this.isMovementSucceeded() && dy) this.moveStraight(dy > 0 ? 8 : 2);
        } else if (dy) {
            this.moveStraight(dy > 0 ? 8 : 2);
            if (!this.isMovementSucceeded() && dx) this.moveStraight(dx > 0 ? 4 : 6);
        }
    };
    const randomMovement = Game_Event.prototype.moveTypeRandom;
    Game_Event.prototype.moveTypeRandom = function() {
        const weight = $gameMap.distance(this.x, this.y, this._randomHomeX, this._randomHomeY) * (this._randomMoveWeight || 0);
        if (Math.random() >= weight) randomMovement.call(this);
        else this.moveBackToRandomHome();
    };
    globalThis.VisuMZ ??= {};
    VisuMZ.GetMoveSynchTarget = id => id === 0 ? $gamePlayer : $gameMap.event(id);
    VisuMZ.MoveAllSynchTargets = id => {
        for (const event of $gameMap.events()) if (event.moveSynchTarget() === id) event.updateMoveSynch();
    };
    VisuMZ.FaceSynchAllSynchTargets = id => {
        for (const event of $gameMap.events()) if (event.moveSynchTarget() === id) event.processMoveSynchDirection();
    };
    Game_Event.prototype.moveSynchTarget = function() { return this._moveSynch?.target ?? -1; };
    Game_Event.prototype.moveSynchType = function() { return this._moveSynch.type; };
    Game_Event.prototype.updateMoveSynch = function() {
        this._moveSynch.timer = (this._moveSynch.timer || 0) - 1;
        if (this._moveSynch.timer > 0) return;
        this._moveSynch.timer = this._moveSynch.delay;
        this.processMoveSynch();
    };
    function mirroredDirection(type, direction) {
        if (['mimic', 'copy'].includes(type)) return direction;
        if (['reverse mimic', 'reverse copy'].includes(type)) return 10 - direction;
        if (['mirror horizontal', 'horizontal mirror', 'mirror horz', 'horz mirror'].includes(type)) return [0, 7, 8, 9, 4, 0, 6, 1, 2, 3][direction];
        if (['mirror vertical', 'vertical mirror', 'mirror vert', 'vert mirror'].includes(type)) return [0, 3, 2, 1, 6, 0, 4, 9, 8, 7][direction];
    }
    Game_Event.prototype.processMoveSynchDirection = function() {
        const target = VisuMZ.GetMoveSynchTarget(this.moveSynchTarget());
        if (!target) return;
        const direction = mirroredDirection(this.moveSynchType(), target.direction());
        if (direction !== undefined) { this.setDirection(direction); this.update(); }
    };
    Game_Event.prototype.processMoveSynch = function() {
        const target = VisuMZ.GetMoveSynchTarget(this.moveSynchTarget());
        if (!target) return;
        const type = this.moveSynchType(), direction = mirroredDirection(type, target.lastMovedDirection());
        if (direction !== undefined) this.executeMoveDir8(direction);
        else if (type === 'approach') this.moveTowardPoint(target.x, target.y);
        else if (type === 'away') this.moveAwayFromPoint(target.x, target.y);
        else if (type === 'custom') this.updateRoutineMove();
        else {
            const directions = $gameMap.isSupportDiagonalMovement() ? [2, 4, 6, 8, 1, 3, 7, 9] : [2, 4, 6, 8];
            const passable = directions.filter(direction => this.canPass(this.x, this.y, direction));
            if (passable.length) this.executeMoveDir8(passable[Math.randomInt(passable.length)]);
        }
        this.update();
    };
    const speed = Game_Event.prototype.realMoveSpeed;
    Game_Event.prototype.realMoveSpeed = function() {
        const target = this.moveSynchTarget() >= 0 && VisuMZ.GetMoveSynchTarget(this.moveSynchTarget());
        return target ? target.realMoveSpeed() : speed.call(this);
    };
    Game_CharacterBase.prototype.adjustMoveSynchOpacityDelta = function(opacity) { return opacity; };
    Game_Event.prototype.adjustMoveSynchOpacityDelta = function(opacity) {
        const target = this.moveSynchTarget() >= 0 && VisuMZ.GetMoveSynchTarget(this.moveSynchTarget());
        if (!target) return opacity;
        const distance = Math.max(0, $gameMap.distance(this._realX, this._realY, target._realX, target._realY) - 1);
        return opacity - distance * Math.min($gameMap.tileWidth(), $gameMap.tileHeight()) * (this._moveSynch.opacityDelta || 0);
    };
    const opacity = Game_CharacterBase.prototype.opacity;
    Game_CharacterBase.prototype.opacity = function() { return this.adjustMoveSynchOpacityDelta(opacity.call(this)); };
    const increaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function() { increaseSteps.call(this); VisuMZ.MoveAllSynchTargets(0); };
    Game_CharacterBase.prototype.updateMoveSynchDirection = function() {};
    Game_Player.prototype.updateMoveSynchDirection = function() { VisuMZ.FaceSynchAllSynchTargets(0); };
    Game_Event.prototype.updateMoveSynchDirection = function() { VisuMZ.FaceSynchAllSynchTargets(this.eventId()); };
}
