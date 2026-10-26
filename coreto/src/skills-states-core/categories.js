function skillsStatesStateClassification(state) {
    if (/<POSITIVE STATE>/i.test(state.note)) return 1;
    if (/<NEGATIVE STATE>/i.test(state.note)) return -1;
    return 0;
}
function installSkillsStatesCategories() {
    function parseCategories(state) {
        state.categories = ['ALL', 'ANY'];
        for (const match of state.note.matchAll(/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi)) {
            state.categories.push(...match[1].toUpperCase().trim().split(',').map(value => value.trim()));
        }
        const block = /<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i.exec(state.note);
        if (block) state.categories.push(...block[1].split(/[\r\n]+/).map(value => value.toUpperCase().trim()));
        if (/<POSITIVE STATE>/i.test(state.note)) state.categories.push('POSITIVE');
        if (/<NEGATIVE STATE>/i.test(state.note)) state.categories.push('NEGATIVE');
    }
    VisuMZ.SkillsStatesCore.Parse_Notetags_State_Category = parseCategories;
    const databaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        databaseLoaded.call(this);
        for (const state of $dataStates.filter(Boolean)) VisuMZ.SkillsStatesCore.Parse_Notetags_State_Category(state);
    };
    Game_Battler.prototype.statesByCategory = function(category) {
        category = category.toUpperCase().trim();
        return this.states().filter(state => state.categories.includes(category));
    };
    Game_Battler.prototype.totalStateCategory = function(category) {
        return this.statesByCategory(category).length;
    };
    Game_Battler.prototype.totalStateCategoryAffected = function(category) {
        return this.statesByCategory(category).filter(state => this.isStateAffected(state.id)).length;
    };
    Game_Battler.prototype.isStateCategoryAffected = function(category) { return this.totalStateCategoryAffected(category) > 0; };
    Game_Battler.prototype.hasStateCategory = function(category) { return this.totalStateCategory(category) > 0; };
    Game_Battler.prototype.removeStatesByCategory = function(category, count = 0) {
        const states = this.statesByCategory(category).slice(0, Math.max(0, Math.ceil(count)));
        if (states.length) this.result().success = true;
        for (const state of states) this.removeState(state.id);
    };
    Game_Battler.prototype.removeStatesByCategoryAll = function(category, except = []) {
        const states = this.statesByCategory(category).filter(state => !except.includes(state));
        if (states.length) this.result().success = true;
        for (const state of states) this.removeState(state.id);
    };
    const base = Game_BattlerBase.prototype;
    base.makeResistedStateCategories = function() {
        const categories = [];
        for (const object of this.traitObjects()) {
            for (const match of object.note.matchAll(/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi)) {
                categories.push(...match[1].split(',').map(value => value.toUpperCase().trim()));
            }
            const block = /<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i.exec(object.note);
            if (block) categories.push(...block[1].split(/[\r\n]+/).map(value => value.toUpperCase().trim()));
        }
        return categories;
    };
    base.isStateCategoryResisted = function(category) {
        return this.makeResistedStateCategories().includes(category);
    };
    const resist = base.isStateResist;
    base.isStateResist = function(stateId) {
        return $dataStates[stateId]?.categories.some(category => this.isStateCategoryResisted(category)) || resist.call(this, stateId);
    };
    base.removeOtherStatesOfSameCategory = function(stateId) {
        const state = $dataStates[stateId];
        if (!state) return;
        for (const match of state.note.matchAll(/<REMOVE OTHER (.*) STATES>/gi)) this.removeStatesByCategoryAll(match[1], [state]);
    };
    const onAdd = Game_Battler.prototype.onAddState;
    Game_Battler.prototype.onAddState = function(stateId) {
        this.removeOtherStatesOfSameCategory(stateId);
        onAdd.call(this, stateId);
    };
    const testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testSkillStatesCoreNotetags = function(target) {
        const item = this.item();
        if (!item) return;
        const category = /<STATE (.*) CATEGORY REMOVE: (.*)>/i.exec(item.note);
        if (category && target.isStateCategoryAffected(category[1])) return true;
        const turns = /<SET STATE (.*) TURNS: (.*)>/i.exec(item.note);
        if (turns) {
            const name = turns[1];
            const state = /^\d+$/.test(name) ? $dataStates[Number(name)] : $dataStates.find(state => state && state.name.toUpperCase().trim() === name.toUpperCase().trim());
            if (state && target.isStateAffected(state.id)) return true;
        }
        return false;
    };
    Game_Action.prototype.testApply = function(target) {
        return this.testSkillStatesCoreNotetags(target) || testApply.call(this, target);
    };
    const apply = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        apply.call(this, target);
        for (const match of this.item().note.matchAll(/<STATE (.+?) CATEGORY REMOVE:[ ](ALL|\d+)>/gi)) {
            if (/^all$/i.test(match[2])) target.removeStatesByCategoryAll(match[1]);
            else target.removeStatesByCategory(match[1], Number(match[2]));
        }
    };
}
