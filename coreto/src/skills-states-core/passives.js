function installSkillsStatesPassives(settings) {
    const notes = new WeakMap(), caches = new WeakMap();
    const namedIds = (text, database) => text.split(',').map(value => {
        const key = value.trim();
        if (/^\d+$/.test(key)) return Number(key);
        if (database === $dataClasses && DataManager.getClassIdWithName) return DataManager.getClassIdWithName(key);
        return database.findIndex(object => object?.name.toLowerCase() === key.toLowerCase());
    }).filter(id => id > 0 && database[id]);
    function info(object) {
        const previous = notes.get(object);
        if (previous?.note === object.note) return previous;
        const result = {note: object.note, sources: [], switches: [], stackable: /<PASSIVE STACKABLE>/i.test(object.note)};
        for (const match of object.note.matchAll(/<PASSIVE STATES?:\s*([^>]+)>/gi)) result.sources.push(...namedIds(match[1], $dataStates));
        for (const [key, pattern] of [['classes', /<PASSIVE CONDITION CLASS(?:ES)?:\s*([^>]+)>/i], ['multiclasses', /<PASSIVE CONDITION MULTICLASS:\s*([^>]+)>/i]]) {
            const match = pattern.exec(object.note);
            if (match) result[key] = namedIds(match[1], $dataClasses);
        }
        for (const match of object.note.matchAll(/<PASSIVE CONDITION (?:(ALL|ANY) )?SWITCH(?:ES)? (ON|OFF):\s*([\d, ]+)>/gi)) result.switches.push({any: /^any$/i.test(match[1]), on: /^on$/i.test(match[2]), ids: match[3].split(',').map(Number)});
        const js = /<JS PASSIVE CONDITION>([\s\S]*?)<\/JS PASSIVE CONDITION>/i.exec(object.note);
        if (js) result.condition = new Function('state', 'const stateId = state.id; const user = this; const target = this; const a = this; const b = this; let condition = true;\n' + skillsStatesCallbackBody(js[1], '<JS Passive Condition>') + '\nreturn condition;');
        notes.set(object, result); return result;
    }
    const globalCondition = new Function(settings.PassiveConditionJS);
    function cache(battler) {
        if (!caches.has(battler)) caches.set(battler, {javascript: new Map(), results: new Map(), count: 0, frame: -1});
        return caches.get(battler);
    }
    const base = Game_BattlerBase.prototype;
    base.passiveStateObjects = function() {
        if (this.isActor()) {
            return [this.actor(), this.currentClass(), ...this.equips(), ...this._skills.map(id => $dataSkills[id])].filter(Boolean);
        }
        return this.isEnemy() ? [this.enemy(), ...this.enemy().actions.map(action => $dataSkills[action.skillId])].filter(Boolean) : [];
    };
    base.meetsPassiveStateConditions = function(state) {
        const rule = info(state);
        if (this.isActor() && rule.classes && !rule.classes.includes(this.currentClass().id)) return false;
        if (this.isActor() && rule.multiclasses && !(this.multiclasses ? this.multiclasses() : [this.currentClass()]).some(object => object && rule.multiclasses.includes(object.id))) return false;
        for (const condition of rule.switches) {
            const test = id => $gameSwitches.value(id) === condition.on;
            if (!(condition.any ? condition.ids.some(test) : condition.ids.every(test))) return false;
        }
        if (rule.condition && !this.meetsPassiveStateConditionJS(state)) return false;
        return !!globalCondition.call(this, state);
    };
    base.meetsPassiveStateConditionJS = function(state) {
        const rule = info(state);
        if (!rule.condition) return true;
        const current = cache(this);
        if (current.frame !== Graphics.frameCount) {
            current.frame = Graphics.frameCount; current.count = 0; current.javascript.clear();
        }
        // The reference bounds authored condition evaluations per battler/frame, retaining their last result.
        if (++current.count >= 30) return current.javascript.get(state.id) ?? true;
        const result = !!rule.condition.call(this, state);
        current.javascript.set(state.id, result);
        return result;
    };
    base.addPassiveStatesFromOtherPlugins = function() {
        if (Imported.VisuMZ_1_ElementStatusCore) this.addPassiveStatesTraitSets();
    };
    base.createPassiveStatesCache = function() {
        this._checkingVisuMzPassiveStateObjects = true;
        try {
            this._cache.passiveStates = [];
            this.addPassiveStatesFromOtherPlugins();
            const external = this._cache.passiveStates;
            const ids = [...external, ...settings.Global, ...(this.isActor() ? settings.Actor : settings.Enemy), ...this.passiveStateObjects().flatMap(object => info(object).sources)].sort((a, b) => a - b);
            this._cache.passiveStates = ids;
            this.addAuraPassiveStateIDs();
            this._cache.passiveStates.sort((a, b) => a - b);
        } finally { this._checkingVisuMzPassiveStateObjects = false; }
    };
    base.convertPassiveStates = function() {
        const current = cache(this);
        for (;;) {
            let changed = false;
            const result = [];
            for (const id of this._cache.passiveStates) {
                const state = $dataStates[id];
                if (!state) continue;
                const allowed = this.meetsPassiveStateConditions(state);
                if (current.results.get(id) !== allowed) { current.results.set(id, allowed); changed = true; }
                if (allowed) result.push(state);
            }
            if (!changed) return result;
            if (!this._checkingTraitsSetSkillsStatesCore) this.refresh();
            this.createPassiveStatesCache();
        }
    };
    base.passiveStates = function() {
        if (this.checkCacheKey('passiveStates')) return this.convertPassiveStates();
        if (this._checkingVisuMzPassiveStateObjects) return [];
        this.createPassiveStatesCache();
        return this.convertPassiveStates();
    };
    const battleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function() {
        battleEnd.call(this);
        const current = cache(this);
        current.frame = -1;
        current.count = 0;
        current.javascript.clear();
    };
    const traitsSet = base.traitsSet;
    base.traitsSet = function(code) {
        this._checkingTraitsSetSkillsStatesCore = true;
        try { return traitsSet.call(this, code); }
        finally { this._checkingTraitsSetSkillsStatesCore = undefined; }
    };
    const refresh = base.refresh;
    base.refresh = function() { this._cache = {}; refresh.call(this); };
    const states = base.states;
    base.states = function() {
        const result = states.call(this);
        if ($gameTemp._checkingPassiveStates) return result;
        $gameTemp._checkingPassiveStates = true;
        try {
            for (const state of this.passiveStates()) if (!result.includes(state) || info(state).stackable) result.push(state);
            return result.sort((a, b) => b.priority - a.priority);
        } finally { $gameTemp._checkingPassiveStates = false; }
    };
    for (const method of ['learnSkill','forgetSkill']) {
        const native = Game_Actor.prototype[method];
        Game_Actor.prototype[method] = function(skillId) { native.call(this, skillId); this._cache = {}; this.passiveStates(); };
    }
    for (const [type, enabled] of [[Game_Switches, settings.RefreshCacheSwitch], [Game_Variables, settings.RefreshCacheVar]]) {
        const onChange = type.prototype.onChange;
        type.prototype.onChange = function() {
            onChange.call(this);
            if (enabled && SceneManager.isSceneBattle()) for (const battler of BattleManager.allBattleMembers()) battler.refresh();
        };
    }
}
