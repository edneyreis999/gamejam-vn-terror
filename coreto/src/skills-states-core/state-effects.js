function installSkillsStatesEffects() {
    const notes = new WeakMap();
    function effects(state) {
        const cached = notes.get(state);
        if (cached?.note === state.note) return cached;
        const result = {note: state.note, refresh: /<JS SLIP REFRESH>/i.test(state.note), functions: []};
        for (const resource of ['HP', 'MP', 'TP']) for (const mode of ['Damage', 'Heal']) {
            const match = new RegExp('<JS ' + resource + ' Slip ' + mode + '>([\\s\\S]*?)</JS ' + resource + ' Slip ' + mode + '>', 'i').exec(state.note);
            if (!match) continue;
            const variable = mode.toLowerCase();
            const context = '<JS ' + resource + ' Slip ' + mode + '>';
            const callback = new Function('stateId', 'const state = $dataStates[stateId]; const user = this.getStateOrigin(stateId); const origin = user; const target = this; const a = user; const b = target; let ' + variable + ' = 0;\n' + skillsStatesCallbackBody(match[1], context) + '\nreturn ' + variable + ';');
            result.functions.push({resource: resource.toLowerCase(), sign: mode === 'Damage' ? -1 : 1, callback});
            break;
        }
        notes.set(state, result);
        return result;
    }
    function calculate(battler, state) {
        for (const effect of effects(state).functions) {
            const key = 'slip' + effect.resource[0].toUpperCase() + effect.resource.slice(1);
            battler.setStateData(state.id, key, Math.round(effect.sign * Math.max(0, effect.callback.call(battler, state.id))));
        }
    }
    const add = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        const allowed = this.isStateAddable(stateId);
        add.call(this, stateId);
        if (allowed && this.isStateAffected(stateId)) calculate(this, $dataStates[stateId]);
    };
    const regenerate = Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll = function() {
        for (const state of this.states()) {
            if (effects(state).refresh) calculate(this, state);
        }
        regenerate.call(this);
        for (const state of this.passiveStates()) calculate(this, state);
        if (!this.isAlive()) return;
        for (const state of this.states()) {
            const values = {hp: this.getStateData(state.id, 'slipHp') || 0, mp: this.getStateData(state.id, 'slipMp') || 0, tp: this.getStateData(state.id, 'slipTp') || 0};
            const hp = Math.max(values.hp, -this.maxSlipDamage());
            if (hp !== 0) {
                const previous = this.result().hpDamage || 0;
                this.gainHp(hp);
                this.result().hpDamage += previous;
            }
            if (values.mp !== 0) {
                const previous = this.result().mpDamage || 0;
                this.gainMp(values.mp);
                this.result().mpDamage += previous;
            }
            if (values.tp !== 0) this.gainSilentTp(values.tp);
        }
    };
}
