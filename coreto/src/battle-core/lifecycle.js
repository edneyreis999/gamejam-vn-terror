function installBattleLifecycle(settings) {
    const mechanics = settings.Mechanics;
    const hookNames={PreStartBattleJS:'Pre-Start Battle',PostStartBattleJS:'Post-Start Battle',PreEndBattleJS:'Pre-End Battle',PostEndBattleJS:'Post-End Battle',PreStartTurnJS:'Pre-Start Turn',PostStartTurnJS:'Post-Start Turn',PreEndTurnJS:'Pre-End Turn',PostEndTurnJS:'Post-End Turn',PreRegenerateJS:'Pre-Regenerate',PostRegenerateJS:'Post-Regenerate',BattleVictoryJS:'Battle Victory',BattleDefeatJS:'Battle Defeat',EscapeSuccessJS:'Escape Success',EscapeFailureJS:'Escape Failure'};
    Game_Battler.prototype.processBattleCoreJS = function(key) {
        if(typeof key!=='string'||typeof mechanics[key]!=='function')return;
        mechanics[key].call(this);
        const name=hookNames[key];
        if(name)for(const object of battleNotes(this))runBattleNote(this,object,'JS '+name,this,0,'value');
    };
    Game_Unit.prototype.processBattleCoreJS = function(name) {
        for (const battler of this.members()) battler.processBattleCoreJS(name);
    };
    const initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        initMembers.call(this);
        this._endingBattle = false;
    };
    BattleManager.processBattleCoreJS = function(name) {
        if (name === 'BattleVictoryJS') this._endingBattle = true;
        $gameParty.processBattleCoreJS(name);
        $gameTroop.processBattleCoreJS(name);
    };
    const each = name => BattleManager.processBattleCoreJS(name);
    for (const [method,before,after] of [
        ['startBattle','PreStartBattleJS','PostStartBattleJS'],
        ['startTurn','PreStartTurnJS','PostStartTurnJS'],
        ['endBattle','PreEndBattleJS','PostEndBattleJS'],
        ['processVictory','BattleVictoryJS',null],
        ['processDefeat','BattleDefeatJS',null],
        ['onEscapeSuccess','EscapeSuccessJS',null]
    ]) {
        const original = BattleManager[method];
        BattleManager[method] = function(...args) {
            each(before);
            const result = original.apply(this, args);
            if (after) each(after);
            return result;
        };
    }
    const onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        this.processBattleCoreJS('PreEndTurnJS');
        const result = onTurnEnd.call(this);
        if (mechanics.SyncBuffExpire) this.removeBuffsAuto();
        this.processBattleCoreJS('PostEndTurnJS');
        return result;
    };
    const regenerateAll = Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll = function() {
        if (!$gameParty.inBattle()) return regenerateAll.call(this);
        if ($gameTroop.turnCount() === 0) return;
        this.processBattleCoreJS('PreRegenerateJS');
        const result = regenerateAll.call(this);
        this._lastRegenFrameCount = Graphics.frameCount;
        this.processBattleCoreJS('PostRegenerateJS');
        return result;
    };
    if (mechanics.SyncBuffExpire) {
        Game_Battler.prototype.onAllActionsEnd = function() {
            this.clearResult();
            this.removeStatesAuto(1);
        };
    }
    BattleManager.makeEscapeRatio = function() { this._escapeRatio = mechanics.CalcEscapeRatioJS.call(this); };
    BattleManager.onEscapeFailure = function() {
        each('EscapeFailureJS');
        $gameParty.onEscapeFailure();
        this.displayEscapeFailureMessage();
        this._escapeRatio += mechanics.CalcEscapeRaiseJS.call(this);
        if (!this.isTpb()) this.startTurn();
    };
    Game_Action.prototype.allowRandomSpeed = function() { return mechanics.AllowRandomSpeed; };
    Game_Action.prototype.speed = function() { return mechanics.CalcActionSpeedJS.call(this); };
    const updateTpbChargeTime = Game_Battler.prototype.updateTpbChargeTime;
    Game_Battler.prototype.updateTpbChargeTime = function() {
        if (typeof this._tpbChargeTime !== 'number' || Number.isNaN(this._tpbChargeTime)) this._tpbChargeTime = 0;
        return updateTpbChargeTime.call(this);
    };
}
