function installSkillsStatesBuffs(settings) {
    const base = Game_BattlerBase.prototype;
    base.buffTurns = function(paramId) { return this._buffTurns[paramId] || 0; };
    base.debuffTurns = function(paramId) { return this.buffTurns(paramId); };
    const buffIconIndex = base.buffIconIndex;
    base.buffIconIndex = function(buffLevel, paramId) {
        return buffIconIndex.call(this, Math.max(-2, Math.min(2, buffLevel)), paramId);
    };
    const multiplier = new Function(settings.MultiplierJS);
    const callbacks = Object.fromEntries(['AddBuff','AddDebuff','EraseBuff','EraseDebuff','ExpireBuff','ExpireDebuff'].map(kind => [kind, new Function(settings['on' + kind + 'JS'])]));
    base.paramBuffRate = function(paramId) { return multiplier.call(this, paramId, this._buffs[paramId]); };
    base.isMaxBuffAffected = function(paramId) { return this._buffs[paramId] >= settings.StackBuffMax; };
    base.isMaxDebuffAffected = function(paramId) { return this._buffs[paramId] <= -settings.StackDebuffMax; };
    for (const method of ['increaseBuff','decreaseBuff']) {
        const native = base[method];
        base[method] = function(paramId) {
            native.call(this, paramId);
            if (this._buffs[paramId] === 0) this._buffTurns[paramId] = 0;
        };
    }
    base.overwriteBuffTurns = function(paramId, turns) {
        const previous = this._buffTurns[paramId];
        let value = turns;
        if (previous > 0) {
            if (settings.ReapplyRules === 'ignore') value = previous;
            if (settings.ReapplyRules === 'greater') value = Math.max(previous, turns);
            if (settings.ReapplyRules === 'add') value += previous;
        }
        this._buffTurns[paramId] = Math.min(settings.MaxTurns, value);
    };
    for (const [method, kind, test] of [['addBuff','AddBuff','isBuffAffected'], ['addDebuff','AddDebuff','isDebuffAffected']]) {
        const native = Game_Battler.prototype[method];
        Game_Battler.prototype[method] = function(paramId, turns) {
            const alive = this.isAlive(); native.call(this, paramId, turns);
            if (alive && this[test](paramId)) callbacks[kind].call(this, paramId);
        };
    }
    const erase = base.eraseBuff;
    base.eraseBuff = function(paramId) {
        const previous = this._buffs[paramId]; erase.call(this, paramId);
        if (previous) callbacks[previous > 0 ? 'EraseBuff' : 'EraseDebuff'].call(this, paramId);
    };
    Game_Battler.prototype.removeBuffsAuto = function() {
        for (let paramId = 0; paramId < this.buffLength(); paramId++) {
            const previous = this._buffs[paramId];
            if (previous && this.isBuffExpired(paramId)) {
                this.removeBuff(paramId);
                if (!this._buffs[paramId]) callbacks[previous > 0 ? 'ExpireBuff' : 'ExpireDebuff'].call(this, paramId);
            }
        }
    };
    const apply = Game_Action.prototype.applyItemUserEffect, names = ['maxhp','maxmp','atk','def','mat','mdf','agi','luk'];
    Game_Action.prototype.applyItemUserEffect = function(target) {
        apply.call(this, target);
        for (const match of this.item().note.matchAll(/<(SET )?(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) TURNS:\s*([+-]?\d+)>/gi)) {
            const paramId = names.indexOf(match[2].toLowerCase()), level = target._buffs[paramId];
            if (/^buff$/i.test(match[3]) ? level <= 0 : level >= 0) continue;
            const value = Number(match[4]) + (match[1] ? 0 : target._buffTurns[paramId]);
            target._buffTurns[paramId] = Math.max(0, Math.min(settings.MaxTurns, value));
        }
    };
}
