function installSkillsStatesCosts(settings) {
    const types = settings.map(setting => ({setting, callbacks: Object.fromEntries(
        Object.entries(setting).filter(([key]) => key.endsWith('JS')).map(([key, body]) => [key, new Function(body)])
    )}));
    const byName = name => types.find(type => type.setting.Name.toLowerCase() === name.toLowerCase());
    const call = (type, key, receiver, ...args) => type.callbacks[key].apply(receiver,
        key === 'ShowJS' || key === 'TextJS' ? [...args, type.setting] : args);
    const calculate = (type, user, skill) => call(type, 'CalcJS', user, skill);
    const load = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        load.call(this, object);
        if (object === $dataSkills) {
            for (const skill of object.filter(Boolean)) {
                for (const resource of ['MP', 'TP']) {
                    const match = new RegExp('<' + resource + ' COST:\\s*(\\d+)>', 'i').exec(skill.note);
                    if (match) skill[resource.toLowerCase() + 'Cost'] = Number(match[1]);
                }
            }
        }
    };
    for (const resource of ['MP', 'TP']) {
        const method = 'skill' + resource[0] + resource[1].toLowerCase() + 'Cost';
        const nativeCost = Game_BattlerBase.prototype[method];
        Game_BattlerBase.prototype[method] = function(skill) {
            const type = byName(resource);
            return type ? calculate(type, this, skill) : nativeCost.call(this, skill);
        };
    }
    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        return types.every(type => call(type, 'CanPayJS', this, skill, calculate(type, this, skill)));
    };
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        for (const type of types) call(type, 'PayJS', this, skill, calculate(type, this, skill));
    };
    Window_Base.prototype.skillCostSeparator = function() { return ' '; };
    Window_Base.prototype.makeAdditionalSkillCostText = function(user, skill, text) { return text; };
    Window_Base.prototype.createAllSkillCostText = function(user, skill) {
        const labels = [];
        for (const type of types) {
            const cost = calculate(type, user, skill);
            if (call(type, 'ShowJS', user, skill, cost)) labels.push(call(type, 'TextJS', user, skill, cost));
        }
        const custom = /<CUSTOM COST TEXT>([\s\S]*?)<\/CUSTOM COST TEXT>/i.exec(skill.note);
        let text = this.makeAdditionalSkillCostText(user, skill, labels.join(this.skillCostSeparator()));
        if (custom) text += (text ? this.skillCostSeparator() : '') + custom[1].trim();
        return text;
    };
    Window_Base.prototype.drawSkillCost = function(user, skill, x, y, width) {
        const text = this.createAllSkillCostText(user, skill);
        const size = this.textSizeEx(text);
        this.drawTextEx(text, x + width - size.width, y, size.width);
        this.resetFontSettings();
    };
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        Window_Base.prototype.drawSkillCost.call(this, this._actor, skill, x, y, width);
    };
    const placeGauge = Window_StatusBase.prototype.placeGauge;
    Window_StatusBase.prototype.placeGauge = function(actor, statusType, x, y) {
        const match = actor.isActor() && new RegExp('<REPLACE ' + statusType + ' GAUGE:\\s*([^>]+)>', 'i').exec(actor.currentClass().note);
        const type = match ? match[1].trim().toLowerCase() : statusType;
        if (!['none', 'untitled'].includes(type)) placeGauge.call(this, actor, type, x, y);
    };
    const setup = Sprite_Gauge.prototype.setup;
    Sprite_Gauge.prototype.setup = function(battler, statusType) {
        this._costType = byName(statusType);
        this._costSettings = this._costType?.setting;
        setup.call(this, battler, statusType);
    };
    for (const [method, callback] of [['currentValue', 'GaugeCurrentJS'], ['currentMaxValue', 'GaugeMaxJS']]) {
        const native = Sprite_Gauge.prototype[method];
        Sprite_Gauge.prototype[method] = function() {
            return this._costType ? call(this._costType, callback, this._battler) : native.call(this);
        };
    }
    const redraw = Sprite_Gauge.prototype.redraw;
    Sprite_Gauge.prototype.redraw = function() {
        if (!this._costType) return redraw.call(this);
        this.bitmap.clear();
        if (!Number.isNaN(this.currentValue())) call(this._costType, 'GaugeDrawJS', this);
    };
    Sprite_Gauge.prototype.currentDisplayedValue = function() {
        const value = this.currentValue();
        return Imported.VisuMZ_0_CoreEngine && this.useDigitGrouping() ? VisuMZ.GroupDigits(value) : value;
    };
    Sprite_Gauge.prototype.drawFullGauge = function(color1, color2, x, y, width, height) {
        this.bitmap.fillRect(x, y, width, height, this.gaugeBackColor());
        this.bitmap.gradientFillRect(x + 1, y + 1, Math.floor((width - 2) * this.gaugeRate()), height - 2, color1, color2);
    };
}
