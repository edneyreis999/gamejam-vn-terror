function installSkillsStatesToggles(settings) {
    const isToggle = skill => DataManager.isSkill(skill) && /<Toggle>|<Initial Toggle: (?:ON|OFF)>|<Toggle Exclu(?:de|sion) Groups?: [^>]+>/i.test(skill.note);
    const groups = skill => (/Toggle Exclu(?:de|sion) Groups?: ([^>]+)>/i.exec(skill.note)?.[1] || '').split(',').map(value => value.trim().toUpperCase()).filter(Boolean);
    const initial = skill => {
        const value = /<Initial Toggle: (ON|OFF)>/i.exec(skill.note);
        return value ? value[1].toUpperCase() === 'ON' : settings.DefaultToggle;
    };
    const refresh = actor => {
        actor.refresh();
        for (const member of $gameParty.members()) member.refresh();
        if ($gameParty.inBattle()) for (const member of $gameTroop.members()) member.refresh();
    };
    DataManager.isToggleSkill = isToggle;
    DataManager.defaultToggleSkillSetting = initial;
    DataManager.toggleExclusionGroups = skill => DataManager.isSkill(skill) ? groups(skill) : [];
    Game_BattlerBase.prototype.isSkillToggled = function(skill) {
        if (!skill) return false;
        if (this.isEnemy()) return true;
        this._skillToggle ||= {};
        if (this._skillToggle[skill.id] === undefined) {
            this._skillToggle[skill.id] = this.isActor() ? initial(skill) : true;
            const exclusion = groups(skill);
            if (this._skillToggle[skill.id] && exclusion.length && this.skills().some(other => other !== skill && isToggle(other) && groups(other).some(value => exclusion.includes(value)))) this._skillToggle[skill.id] = false;
            if (this._skillToggle[skill.id]) refresh(this);
        }
        return this._skillToggle[skill.id];
    };
    Game_BattlerBase.prototype.setSkillToggle = function(skill, value) {
        if (!isToggle(skill) || this.isEnemy()) return;
        this._skillToggle ||= {};
        const exclusion = groups(skill);
        if (value && exclusion.length) for (const other of this.skills()) {
            if (isToggle(other) && groups(other).some(group => exclusion.includes(group))) this._skillToggle[other.id] = false;
        }
        this._skillToggle[skill.id] = value;
        refresh(this);
    };
    const sources = Game_BattlerBase.prototype.passiveStateObjects;
    Game_BattlerBase.prototype.passiveStateObjects = function() {
        return sources.call(this).filter(object => !DataManager.isSkill(object) || !isToggle(object) || this.isSkillToggled(object));
    };
    const conditions = Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        if (isToggle(skill)) {
            if (!this.isActor()) return false;
            if ($gameParty.inBattle() && (this.isAutoBattle() || this.isConfused())) return false;
            if (this.isSkillToggled(skill)) return true;
        }
        return conditions.call(this, skill);
    };
    function toggle(actor, skill) {
        SoundManager.playEquip();
        const value = !actor.isSkillToggled(skill);
        if (value) actor.paySkillCost(skill);
        actor.setSkillToggle(skill, value);
        const tag = new RegExp('<Toggle ' + (value ? 'On' : 'Off') + ' (?:Ani|Animation):\\s*(\\d+)>', 'i').exec(skill.note);
        const animation = tag ? Number(tag[1]) : value ? skill.animationId : settings.ToggleOffAnimationID;
        if (animation > 0 && $gameParty.inBattle()) $gameTemp.requestFauxAnimation([actor], animation, false, false);
    }
    Scene_Battle.prototype.onSkillToggle = function(skill) {
        toggle(BattleManager.actor(), skill);
        if (this._statusWindow) this._statusWindow.refresh();
    };
    const battleOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const skill = this._skillWindow.item();
        if (!isToggle(skill)) return battleOk.call(this);
        this.onSkillToggle(skill);
        this._skillWindow.refresh(); this._skillWindow.activate(); this._statusWindow.refresh();
    };
    for (const key of ['ToggleType', 'ToggleOn', 'ToggleOff', 'ToggleOffLocation']) TextManager[key[0].toLowerCase() + key.slice(1)] = settings[key];
    const costText = Window_Base.prototype.createAllSkillCostText;
    Window_Base.prototype.createAllSkillCostText = function(actor, skill) {
        const text = costText.call(this, actor, skill);
        if (!actor || !isToggle(skill)) return text;
        if (actor.isSkillToggled(skill)) return settings.ToggleOn;
        return settings.ToggleOffLocation === 'front' ? (settings.ToggleOff + ' ' + text).trim() : (text + ' ' + settings.ToggleOff).trim();
    };
    const drawItem = Window_SkillList.prototype.drawItem;
    Window_SkillList.prototype.drawItem = function(index) {
        const skill = this.itemAt(index);
        this._toggleSkillColor = isToggle(skill) && this._actor && this._actor.isSkillToggled(skill);
        try { return drawItem.call(this, index); }
        finally { this._toggleSkillColor = undefined; }
    };
    const changeColor = Window_Base.prototype.changeTextColor;
    Window_Base.prototype.changeTextColor = function(color) {
        changeColor.call(this, this._toggleSkillColor ? ColorManager.getColor(settings.ToggleOnTextColor) : color);
    };
    const drawText = Window_Base.prototype.drawText;
    Window_Base.prototype.drawText = function(...args) {
        const result = drawText.apply(this, args);
        this._toggleSkillColor = undefined;
        return result;
    };
    const menuOk = Scene_Skill.prototype.onItemOk;
    Scene_Skill.prototype.onItemOk = function() {
        const skill = this.item();
        if (!isToggle(skill)) return menuOk.call(this);
        toggle(this.actor(), skill);
        this._itemWindow.refresh(); this._itemWindow.activate(); this._statusWindow.refresh();
    };
}
