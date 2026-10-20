function installEventsMoveTimerFollowers() {
    const timer = Game_Timer.prototype, initialize = timer.initialize, start = timer.start, stop = timer.stop, expire = timer.onExpire;
    timer.initEventsMoveCore = function() { this._paused = false; this._speed = -1; this._expireCommonEvent = 0; };
    timer.initialize = function() { initialize.call(this); this.initEventsMoveCore(); };
    timer.update = function(active) {
        if (!active || !this._working || this._paused || this._frames <= 0) return;
        if (this._speed === undefined) this.initEventsMoveCore();
        this._frames += this._speed;
        if (this._frames <= 0) this.onExpire();
    };
    timer.start = function(frames) { start.call(this, frames); if (this._paused === undefined) this.initEventsMoveCore(); this._paused = false; };
    timer.stop = function() { stop.call(this); if (this._paused === undefined) this.initEventsMoveCore(); this._paused = false; };
    timer.pause = function() { if (this._frames > 0) { this._paused = true; this._working = true; } };
    timer.resume = function() { if (this._frames > 0) { this._paused = false; this._working = true; } };
    timer.gainFrames = function(frames) { this.setFrames((this._frames || 0) + frames); };
    timer.setFrames = function(frames) { this._frames = Math.max(1, frames); this._working = true; };
    timer.changeSpeed = function(speed) { this._speed = speed; this._working = true; if (speed > 0) this._frames = Math.max(1, this._frames); };
    timer.setCommonEvent = function(id) { if (this._expireCommonEvent === undefined) this.initEventsMoveCore(); this._expireCommonEvent = id; };
    timer.onExpire = function() { if (this._expireCommonEvent === undefined) this.initEventsMoveCore(); if (this._expireCommonEvent) $gameTemp.reserveCommonEvent(this._expireCommonEvent); else expire.call(this); };

    const system = Game_System.prototype;
    system.initFollowerController = function() { this._followerControlID = 0; this._followerChaseOff = false; };
    system.getControlledFollowerID = function() { if (this._followerControlID === undefined) this.initFollowerController(); return this._followerControlID; };
    system.setControlledFollowerID = function(id) { if (this._followerControlID === undefined) this.initFollowerController(); this._followerControlID = id; };
    system.isStopFollowerChasing = function() { if (this._followerChaseOff === undefined) this.initFollowerController(); return this._followerChaseOff; };
    system.setStopFollowerChasing = function(value) { if (this._followerChaseOff === undefined) this.initFollowerController(); this._followerChaseOff = value; };
    const character = Game_Interpreter.prototype.character;
    Game_Interpreter.prototype.character = function(id) {
        const follower = $gameSystem.getControlledFollowerID();
        return !$gameParty.inBattle() && id < 0 && follower > 0 ? $gamePlayer.followers().follower(follower - 1) : character.call(this, id);
    };
    const follower = Game_Follower.prototype, followerInit = follower.initialize, chase = follower.chaseCharacter, jump = Game_Followers.prototype.jumpAll;
    follower.initialize = function(index) { followerInit.call(this, index); this._chaseOff = false; };
    follower.setChaseOff = function(value) { this._chaseOff = value; };
    follower.chaseCharacter = function(target) { if (this._chaseOff || $gameSystem.isStopFollowerChasing()) return; chase.call(this, target); this._actuallyMoving = true; };
    follower.isDashing = function() { return this._chaseOff ? Game_Character.prototype.isDashing.call(this) : $gamePlayer.isDashing(); };
    follower.isDashingAndMoving = function() { return this._chaseOff ? Game_Character.prototype.isDashingAndMoving.call(this) : $gamePlayer.isDashingAndMoving() && this._actuallyMoving; };
    follower.updateStop = function() { Game_Character.prototype.updateStop.call(this); if (this._stopCount > 0) this._actuallyMoving = false; };
    Game_Followers.prototype.jumpAll = function() { if (!$gameSystem.isStopFollowerChasing()) jump.call(this); };

    Game_Map.prototype.setupFollowerVisibilityOverrides = function() {
        const note = $dataMap ? $dataMap.note : '';
        this._forceHideFollower = /<HIDE FOLLOWERS>/i.test(note);
        this._forceShowFollower = !this._forceHideFollower && /<SHOW FOLLOWERS>/i.test(note);
    };
    Game_Map.prototype.areFollowersForceShown = function() { if (this._forceShowFollower === undefined) this.setupFollowerVisibilityOverrides(); return this._forceShowFollower; };
    Game_Map.prototype.areFollowersForceHidden = function() { if (this._forceHideFollower === undefined) this.setupFollowerVisibilityOverrides(); return this._forceHideFollower; };
    const setupMap = Game_Map.prototype.setup, visible = Game_Followers.prototype.isVisible;
    Game_Map.prototype.setup = function(id) { setupMap.call(this, id); this.setupFollowerVisibilityOverrides(); };
    Game_Followers.prototype.isVisible = function() { return $gameMap.areFollowersForceShown() || !$gameMap.areFollowersForceHidden() && visible.call(this); };

    const value = (expression, context) => new Function('return ' + expression).call(context);
    const frames = (args, context) => value(args.Frames, context) + value(args.Seconds, context) * 60 + value(args.Minutes, context) * 3600 + value(args.Hours, context) * 216000;
    return {
        EventTimerExpireEvent(args) { $gameTimer.setCommonEvent(args.CommonEventID); },
        EventTimerExpireClear() { $gameTimer.setCommonEvent(0); },
        EventTimerSpeed(args) { $gameTimer.changeSpeed(value(args.Speed, this) || 0); },
        EventTimerFramesGain(args) { if ($gameTimer.isWorking()) $gameTimer.gainFrames(frames(args, this)); },
        EventTimerFramesSet(args) { if ($gameTimer.isWorking()) $gameTimer.setFrames(frames(args, this)); },
        EventTimerPause() { if ($gameTimer.isWorking()) $gameTimer.pause(); },
        EventTimerResume() { if ($gameTimer.isWorking()) $gameTimer.resume(); },
        FollowerSetGlobalChase(args) { $gameSystem.setStopFollowerChasing(!args.Chase); },
        FollowerSetTargetChase(args) { $gamePlayer.followers().follower(value(args.FollowerID, this) - 1)?.setChaseOff(!args.Chase); },
        FollowerSetControl(args) { $gameSystem.setControlledFollowerID(value(args.FollowerID, this)); },
        FollowerReset() { $gameSystem.setControlledFollowerID(0); $gameSystem.setStopFollowerChasing(false); for (const target of $gamePlayer.followers()._data) target.setChaseOff(false); }
    };
}
