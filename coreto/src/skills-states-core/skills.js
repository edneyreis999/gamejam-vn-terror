function installSkillsStatesSkills(settings) {
    const notes = new WeakMap();
    const namedId = (value, values) => /^\d+$/.test(value.trim()) ? Number(value) : values.findIndex(entry => (typeof entry === 'string' ? entry : entry?.name)?.toLowerCase() === value.trim().toLowerCase());
    const ids = (value, values) => value.split(',').map(value => namedId(value, values)).filter(id => id > 0);
    function rules(skill) {
        const cached = notes.get(skill);
        if (cached?.note === skill.note) return cached;
        const result = {note: skill.note, types: [skill.stypeId], visible: [], enabled: [], priority: 50};
        for (const match of skill.note.matchAll(/<Skill Types?:\s*([^>]+)>/gi)) result.types.push(...ids(match[1], $dataSystem.skillTypes));
        result.types = [...new Set(result.types)];
        result.listName = /<List Name:\s*([^>]+)>/i.exec(skill.note)?.[1];
        const priority = /<ID Sort Priority:\s*(\d+)>/i.exec(skill.note);
        if (priority) result.priority = Number(priority[1]);
        result.hideBattle = /<Hide in Battle>/i.test(skill.note);
        result.hideMap = /<Hide outside Battle>/i.test(skill.note);
        for (const match of skill.note.matchAll(/<(Show|Hide|Enable|Disable) (?:(All|Any) )?Switch(?:es)?:\s*([^>]+)>/gi)) {
            const [, action, mode, values] = match;
            const condition = {action: action.toLowerCase(), any: mode?.toLowerCase() === 'any', switches: values.split(',').map(Number)};
            result[/show|hide/i.test(action) ? 'visible' : 'enabled'].push(condition);
        }
        for (const match of skill.note.matchAll(/<(Show|Hide) if (learned|has|have) (?:(All|Any) )?Skills?:\s*([^>]+)>/gi)) {
            const [, action, ownership, mode, values] = match;
            result.visible.push({action: action.toLowerCase(), learned: ownership.toLowerCase() === 'learned', any: mode?.toLowerCase() === 'any', skills: ids(values, $dataSkills)});
        }
        for (const [tag, field, variable] of [['Visible', 'visibilityJS', 'visible'], ['Enable', 'enableJS', 'enabled']]) {
            const match = new RegExp('<JS Skill ' + tag + '>([\\s\\S]*?)</JS Skill ' + tag + '>', 'i').exec(skill.note);
            if (match) result[field] = new Function('skill', 'const user = this; let ' + variable + ' = true;\n' + match[1] + '\nreturn ' + variable + ';');
        }
        notes.set(skill, result);
        return result;
    }
    globalThis.VisuMZ ??= {};
    VisuMZ.SkillsStatesCore ??= {};
    VisuMZ.SkillsStatesCore.Parse_Notetags_Skill_JS = rules;
    const databaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        databaseLoaded.call(this);
        for (const skill of $dataSkills.filter(Boolean)) VisuMZ.SkillsStatesCore.Parse_Notetags_Skill_JS(skill);
    };
    function satisfies(actor, conditions) {
        return conditions.every(condition => {
            const values = condition.switches || condition.skills;
            const test = condition.switches ? id => $gameSwitches.value(id) : id => actor.isActor() && (condition.learned ? actor.isLearnedSkill(id) : actor.hasSkill(id));
            const matched = condition.any ? values.some(test) : values.every(test);
            return condition.action === 'hide' || condition.action === 'disable' ? !matched : matched;
        });
    }
    VisuMZ.SkillsStatesCore.CheckVisibleBattleNotetags = (actor, skill) => {
        const rule = rules(skill);
        return !($gameParty.inBattle() ? rule.hideBattle : rule.hideMap);
    };
    VisuMZ.SkillsStatesCore.CheckVisibleSwitchNotetags = (actor, skill) => satisfies(actor, rules(skill).visible.filter(condition => condition.switches));
    VisuMZ.SkillsStatesCore.CheckVisibleSkillNotetags = (actor, skill) => satisfies(actor, rules(skill).visible.filter(condition => condition.skills));
    for (const [method, check] of [['checkShowHideBattleNotetags', 'CheckVisibleBattleNotetags'], ['checkShowHideSwitchNotetags', 'CheckVisibleSwitchNotetags'], ['checkShowHideSkillNotetags', 'CheckVisibleSkillNotetags']]) {
        Window_SkillList.prototype[method] = function(skill) { return VisuMZ.SkillsStatesCore[check](this._actor, skill); };
    }
    const globalCondition = new Function(settings.SkillConditionJS);
    DataManager.getSkillTypes = skill => rules(skill).types.slice();
    Game_BattlerBase.prototype.isSkillHidden = function(skill) {
        const rule = rules(skill);
        return ($gameParty.inBattle() ? rule.hideBattle : rule.hideMap) || !satisfies(this, rule.visible);
    };
    Game_BattlerBase.prototype.isSkillTypeMatchForUse = function(skill) {
        return !this.isActor() || rules(skill).types.some(id => this.skillTypes().includes(id));
    };
    const meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        if (!meetsSkillConditions.call(this, skill)) return false;
        const rule = rules(skill);
        return satisfies(this, rule.enabled) && (!rule.enableJS || !!rule.enableJS.call(this, skill)) && !!globalCondition.call(this, skill);
    };
    Game_Enemy.prototype.skills = function() {
        return [...new Set(this.enemy().actions.map(action => $dataSkills[action.skillId]).filter(Boolean))];
    };
    const skillTypes = Game_Actor.prototype.skillTypes;
    Game_Actor.prototype.skillTypes = function() {
        return skillTypes.call(this).filter(id => !settings.HiddenSkillTypes.includes(id) && (!$gameParty.inBattle() || !settings.BattleHiddenSkillTypes.includes(id)));
    };
    Window_SkillList.prototype.includes = function(skill) {
        if (!skill || !this._actor) return false;
        const rule = rules(skill);
        return rule.types.includes(this._stypeId) && !this._actor.isSkillHidden(skill) && (!rule.visibilityJS || !!rule.visibilityJS.call(this._actor, skill));
    };
    const isEnabled = Window_SkillList.prototype.isEnabled;
    Window_SkillList.prototype.isEnabled = function(skill) {
        return !!skill && !this._actor.isSkillHidden(skill) && isEnabled.call(this, skill);
    };
    const makeItemList = Window_SkillList.prototype.makeItemList;
    Window_SkillList.prototype.makeItemList = function() {
        makeItemList.call(this);
        if (!(SceneManager._scene instanceof Scene_Skill)) return;
        this._data.sort(settings.SortSkillTypesAbc.includes(this._stypeId)
            ? (a, b) => a.name.localeCompare(b.name) || a.id - b.id
            : (a, b) => rules(b).priority - rules(a).priority || a.id - b.id);
    };
    const drawItemName = Window_SkillList.prototype.drawItemName;
    Window_SkillList.prototype.drawItemName = function(skill, x, y, width) {
        const listName = skill && rules(skill).listName;
        const display = listName === undefined ? skill : {...skill};
        if (listName !== undefined) this.alterSkillName(display);
        drawItemName.call(this, display, x, y, width);
    };
}
