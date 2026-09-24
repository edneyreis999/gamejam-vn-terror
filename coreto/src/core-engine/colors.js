function installColors(settings) {
    const options = settings.Color;
    ColorManager.getColor = function(value) {
        const text = String(value);
        const start = text.indexOf("#");
        if (start < 0) return this.textColor(Number(text));
        // Message reads RegExp.$2 after this call; color conversion must not overwrite it.
        let end = start + 1;
        while (end < text.length && !"\r\n\u2028\u2029".includes(text[end])) end++;
        return text.slice(start, end);
    };
    ColorManager.clearCachedKeys = function() { this._colorCache = {}; };
    ColorManager.getColorDataFromPluginParameters = function(key, value) {
        this._colorCache ??= {};
        return this._colorCache[key] = this.getColor(value);
    };
    const loadWindowskin = ColorManager.loadWindowskin;
    ColorManager.loadWindowskin = function(...args) {
        const result = loadWindowskin.apply(this, args);
        this._colorCache ??= {};
        return result;
    };
    const indexed = {
        normalColor: "ColorNormal", systemColor: "ColorSystem", crisisColor: "ColorCrisis", deathColor: "ColorDeath",
        gaugeBackColor: "ColorGaugeBack", hpGaugeColor1: "ColorHPGauge1", hpGaugeColor2: "ColorHPGauge2",
        mpGaugeColor1: "ColorMPGauge1", mpGaugeColor2: "ColorMPGauge2", mpCostColor: "ColorMPCost",
        powerUpColor: "ColorPowerUp", powerDownColor: "ColorPowerDown", ctGaugeColor1: "ColorCTGauge1", ctGaugeColor2: "ColorCTGauge2",
        tpGaugeColor1: "ColorTPGauge1", tpGaugeColor2: "ColorTPGauge2", tpCostColor: "ColorTPCost",
        pendingColor: "ColorTPCost", expGaugeColor1: "ColorExpGauge1", expGaugeColor2: "ColorExpGauge2",
        maxLvGaugeColor1: "ColorMaxLvGauge1", maxLvGaugeColor2: "ColorMaxLvGauge2"
    };
    for (const [method, field] of Object.entries(indexed)) {
        ColorManager[method] = function() {
            const key = `_stored_${method}`;
            this._colorCache ??= {};
            return this._colorCache[key] || this.getColorDataFromPluginParameters(key, options[field]);
        };
    }
    const direct = {
        outlineColor: "OutlineColor", dimColor1: "DimColor1", dimColor2: "DimColor2",
        itemBackColor1: "ItemBackColor1", itemBackColor2: "ItemBackColor2"
    };
    for (const [method, field] of Object.entries(direct)) ColorManager[method] = function() { return options[field]; };
    ColorManager.outlineColorGauge = function() { return options.OutlineColorGauge || "rgba(0, 0, 0, 1.0)"; };
    ColorManager.outlineColorDmg = function() { return "rgba(0, 0, 0, 0.7)"; };
    const conditional = { hpColor: "ActorHPColor", mpColor: "ActorMPColor", tpColor: "ActorTPColor", paramchangeTextColor: "ParamChange", damageColor: "DamageColor" };
    for (const [method, field] of Object.entries(conditional)) {
        const callback = compileAuthoredBody(options[field], `/Color/${field}`);
        ColorManager[method] = function(...args) {
            try { return callback.apply(this, args); }
            catch (error) { throw new CoreError("AUTHORED_CODE_FAILED", `/Color/${field}: ${error.message}`, { field: `/Color/${field}` }); }
        };
    }
    Sprite_Damage.prototype.valueOutlineColor = function() { return ColorManager.outlineColorDmg(); };
    Sprite_Gauge.prototype.valueOutlineColor = function() { return ColorManager.outlineColorGauge(); };
    Sprite_Gauge.prototype.valueOutlineWidth = function() { return 3; };
}
