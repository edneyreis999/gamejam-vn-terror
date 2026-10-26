function installSkillsStatesLifecycle(settings) {
    const callbacks = Object.fromEntries(['Add', 'Erase', 'Expire'].map(kind => [kind, new Function('stateId', skillsStatesCallbackBody(settings['on' + kind + 'StateJS'], '/States/on' + kind + 'StateJS'))]));
    const notes = new WeakMap();
    const stateInfo = state => {
        const cached = notes.get(state);
        if (cached?.note === state.note) return cached;
        const match = /<REAPPLY RULES:\s*(IGNORE|RESET|GREATER|ADD)>/i.exec(state.note);
        const maximum = /<MAX TURNS:\s*(\d+)>/i.exec(state.note);
        const info = {note: state.note, rule: match ? match[1].toLowerCase() : settings.ReapplyRules,
            maximum: maximum ? Number(maximum[1]) : settings.MaxTurns,
            death: /<NO DEATH CLEAR>/i.test(state.note), recover: /<NO RECOVER ALL CLEAR>/i.test(state.note),
            defeat: /<GROUP DEFEAT>/i.test(state.note), callbacks: {}};
        for (const kind of ['Add', 'Erase', 'Expire']) {
            const code = new RegExp('<JS ON ' + kind + ' STATE>([\\s\\S]*?)</JS ON ' + kind + ' STATE>', 'i').exec(state.note);
            if (code) info.callbacks[kind] = new Function('stateId', 'const state = $dataStates[stateId]; const origin = this.getStateOrigin(stateId); const user = this.getCurrentStateActiveUser(); const target = this; const a = origin; const b = this;\n' + skillsStatesCallbackBody(code[1], '<JS On ' + kind + ' State>'));
        }
        notes.set(state, info);
        return info;
    };
    const run = (battler, kind, stateId) => {
        stateInfo($dataStates[stateId]).callbacks[kind]?.call(battler, stateId);
        callbacks[kind].call(battler, stateId);
    };
    DataManager.stateMaximumTurns = state => stateInfo(typeof state === 'number' ? $dataStates[state] : state).maximum;
    const base = Game_BattlerBase.prototype;
    Game_Battler.prototype.onAddState = function(stateId) { run(this, 'Add', stateId); };
    Game_Battler.prototype.onRemoveState = function(stateId) { run(this, 'Erase', stateId); };
    base.getStateReapplyRulings = function(state) { return /<REAPPLY RULES: (.*)>/i.exec(state.note)?.[1] ?? settings.ReapplyRules; };
    base.stateTurns = function(state) { return this._stateTurns[typeof state === 'number' ? state : state.id] || 0; };
    base.setStateTurns = function(state, turns) {
        const id = typeof state === 'number' ? state : state.id;
        if (!this.isStateAffected(id)) return;
        this._stateTurns[id] = turns.clamp(0, DataManager.stateMaximumTurns(id));
        if (this._stateTurns[id] <= 0) this.removeState(id);
    };
    base.addStateTurns = function(state, turns) {
        const id = typeof state === 'number' ? state : state.id;
        if (this.isStateAffected(id)) this.setStateTurns(id, this.stateTurns(id) + turns);
    };
    base.getCurrentStateActiveUser = function() {
        if ($gameParty.inBattle()) return BattleManager._subject || BattleManager._currentActor || this;
        if (![Scene_Map, Scene_Item].includes(SceneManager._scene.constructor)) return $gameParty.menuActor();
        return this;
    };
    base.getStateRetainType = function() { return this._stateRetainType || ''; };
    base.setStateOrigin = function(stateId, origin) {
        origin = origin || this.getCurrentStateActiveUser();
        this._stateOrigin ??= {};
        this._stateOrigin[stateId] = origin.isActor() ? '<actor-' + origin.actorId() + '>'
            : '<enemy-' + origin.enemyId() + '> <member-' + origin.index() + '> <troop-' + $gameTroop.getCurrentTroopUniqueID() + '>';
    };
    base.getStateOrigin = function(stateId) {
        stateId = typeof stateId === 'number' ? stateId : stateId.id;
        const source = this._stateOrigin?.[stateId] || '';
        const actor = /<actor-(\d+)>/.exec(source);
        if (actor) return $gameActors.actor(Number(actor[1]));
        const enemy = /<enemy-(\d+)> <member-(\d+)> <troop-(\d+)>/.exec(source);
        if ($gameParty.inBattle() && enemy && Number(enemy[3]) === $gameTroop.getCurrentTroopUniqueID()) {
            const member = $gameTroop.members()[Number(enemy[2])];
            if (member?.enemyId() === Number(enemy[1])) return member;
        }
        return this;
    };
    base.clearStateOrigin = function(stateId) { if (this._stateOrigin) delete this._stateOrigin[stateId]; };
    base.clearAllStateOrigins = function() { this._stateOrigin = {}; };
    const battleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function() {
        battleEnd.call(this);
        this.clearAllStateOrigins();
    };
    Game_Troop.prototype.makeCurrentTroopUniqueID = function() { this._currentTroopUniqueID = Graphics.frameCount; };
    Game_Troop.prototype.getCurrentTroopUniqueID = function() { return this._currentTroopUniqueID; };
    const setupTroop = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        setupTroop.call(this, troopId); this.makeCurrentTroopUniqueID();
    };
    base.stateData = function(state) {
        const id = typeof state === 'number' ? state : state.id;
        this._stateData ??= {};
        return this._stateData[id] ??= {};
    };
    base.getStateData = function(state, key) { return this.stateData(state)[key]; };
    base.setStateData = function(state, key, value) { this.stateData(state)[key] = value; };
    base.clearStateData = function(state) {
        this._stateData ??= {};
        this._stateData[typeof state === 'number' ? state : state.id] = {};
    };
    base.getStateDisplay = function(state) { return this._stateDisplay?.[typeof state === 'number' ? state : state.id] ?? ''; };
    base.setStateDisplay = function(state, value) { this._stateDisplay ??= {}; this._stateDisplay[typeof state === 'number' ? state : state.id] = value; };
    base.clearStateDisplay = function(state) { this.setStateDisplay(state, ''); };
    const load = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        load.call(this, object);
        if (object === $dataStates && settings.ActionEndUpdate) for (const state of object.filter(Boolean)) {
            if (state.restriction === 4 && state.autoRemovalTiming === 1) state.autoRemovalTiming = 2;
        }
    };
    const counts = base.resetStateCounts;
    base.resetStateCounts = function(stateId) {
        const previous = this._stateTurns[stateId];
        counts.call(this, stateId);
        const info = stateInfo($dataStates[stateId]);
        if (previous !== undefined) {
            if (info.rule === 'ignore') this._stateTurns[stateId] = previous;
            if (info.rule === 'greater') this._stateTurns[stateId] = Math.max(previous, this._stateTurns[stateId]);
            if (info.rule === 'add') this._stateTurns[stateId] += previous;
        }
        this._stateTurns[stateId] = Math.min(info.maximum, this._stateTurns[stateId]);
    };
    const addable = Game_Battler.prototype.isStateAddable;
    Game_Battler.prototype.isStateAddable = function(stateId) {
        if ($dataStates[stateId] && stateInfo($dataStates[stateId]).death && this.isDead()) {
            return !this.isStateResist(stateId) && !this.isStateRestrict(stateId);
        }
        return addable.call(this, stateId);
    };
    base.addNewState = function(stateId) {
        if (stateId === this.deathStateId()) this.die();
        const restricted = this.isRestricted();
        // Erase callbacks can refresh the battler and add death before die returns.
        if (!this.isStateAffected(stateId)) this._states.push(stateId);
        this.sortStates();
        if (!restricted && this.isRestricted()) this.onRestrict();
    };
    const add = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        const allowed = this.isStateAddable(stateId);
        if (allowed) this.setStateOrigin(stateId, this.getCurrentStateActiveUser());
        add.call(this, stateId);
        if (allowed && this.isStateAffected(stateId)) this.onAddState(stateId);
    };
    const erase = base.eraseState;
    base.eraseState = function(stateId) {
        const affected = this.isStateAffected(stateId);
        erase.call(this, stateId);
        if (affected) {
            this.onRemoveState(stateId);
            this.clearStateData(stateId); this.clearStateDisplay(stateId);
        }
    };
    base.canClearState = function(state) {
        const retain = this.getStateRetainType(), info = stateInfo(state);
        return this.isStateAffected(state.id) && !(retain === 'death' && info.death || retain === 'recover all' && info.recover);
    };
    const clearStates = base.clearStates;
    base.clearStates = function() {
        if (!this.getStateRetainType()) {
            clearStates.call(this);
            this._stateRetainType = '';
            this._stateData = {}; this._stateDisplay = {}; this._stateOrigin = {}; this._skillToggle = {};
            return;
        }
        this._states ??= []; this._stateTurns ??= {}; this._stateOrigin ??= {};
        for (const id of [...this._states]) if (this.canClearState($dataStates[id])) {
            const retain = this.getStateRetainType();
            try { this.eraseState(id); } finally { this._stateRetainType = retain; }
        }
        this._cache = {};
    };
    const actorClear = Game_Actor.prototype.clearStates;
    Game_Actor.prototype.clearStates = function() {
        const steps = {...this._stateSteps};
        actorClear.call(this);
        for (const id of this._states) if (steps[id] !== undefined) this._stateSteps[id] = steps[id];
    };
    for (const [method, retain] of [['die', 'death'], ['recoverAll', 'recover all']]) {
        const native = base[method];
        base[method] = function() {
            this._stateRetainType = retain;
            try { return native.call(this); } finally { this._stateRetainType = ''; }
        };
    }
    Game_Battler.prototype.removeStatesAuto = function(timing) {
        for (const state of this.states()) if (this.isStateExpired(state.id) && state.autoRemovalTiming === timing) {
            this.removeState(state.id); run(this, 'Expire', state.id);
        }
    };
    const updateTurns = base.updateStateTurns;
    base.updateStateTurns = function(timing = 2) {
        if (!settings.ActionEndUpdate) return updateTurns.call(this);
        for (const id of this._states) if ((timing === 1 ? $dataStates[id].autoRemovalTiming === 1 : $dataStates[id].autoRemovalTiming !== 1) && this._stateTurns[id] > 0) this._stateTurns[id]--;
    };
    const endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        if (settings.ActionEndUpdate && this._subject) {
            this._subject.updateStateTurns(1); this._subject.removeStatesAuto(1);
        }
        endAction.call(this);
    };
    Game_Actor.prototype.stepsForTurn = function() { return settings.TurnEndOnMap; };
    Game_Unit.prototype.isAllDead = function() { return this.aliveMembers().every(member => member.states().some(state => stateInfo(state).defeat)); };
    let currentAction;
    const apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        const previous = currentAction; currentAction = this;
        try {
            const result = apply.call(this, target);
            return result;
        } finally { currentAction = previous; }
    };
    const userEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        userEffect.call(this, target);
        for (const match of this.item().note.matchAll(/<(SET )?STATE (.+?) TURNS:\s*([+-]?\d+)>/gi)) {
            const name = match[2].trim();
            const state = /^\d+$/.test(name) ? $dataStates[Number(name)] : $dataStates.find(state => state && state.name.toLowerCase() === name.toLowerCase());
            if (!state || !target.isStateAffected(state.id)) continue;
            const value = Number(match[3]) + (match[1] ? 0 : target._stateTurns[state.id]);
            target._stateTurns[state.id] = Math.max(0, Math.min(stateInfo(state).maximum, value));
            if (target._stateTurns[state.id] === 0) target.removeState(state.id);
        }
    };
    const bypass = (object, suffix, state) => {
        const expression = new RegExp('<BYPASS STATE DAMAGE REMOVAL' + suffix + ':\\s*([^>]+)>', 'gi');
        return [...object.note.matchAll(expression)].some(match => match[1].split(',').some(value => value.trim() === String(state.id) || value.trim().toLowerCase() === state.name.toLowerCase()));
    };
    Game_Battler.prototype.removeStatesByDamage = function() {
        const action = BattleManager._action || currentAction, attacker = action?.subject();
        for (const state of this.states()) {
            const skip = action && (bypass(action.item(), '', state) || attacker.traitObjects().some(object => bypass(object, ' AS ATTACKER', state)) || this.traitObjects().some(object => bypass(object, ' AS TARGET', state)));
            if (state.removeByDamage && !skip && Math.randomInt(100) < state.chanceByDamage) this.removeState(state.id);
        }
    };
}
