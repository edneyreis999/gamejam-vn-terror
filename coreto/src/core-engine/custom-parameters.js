function installCustomParameters(settings) {
    const entries = new Map();
    for (const [index, data] of settings.CustomParam.entries()) {
        const path = `/CustomParam/${index}`;
        const calculate = authoredCallback(data.ValueJS, `${path}/ValueJS`);
        try {
            Object.defineProperty(Game_BattlerBase.prototype, data.Abbreviation, {
                get() {
                    const value = calculate.call(this);
                    return data.Type === "integer" ? Math.round(value) : value;
                }
            });
        } catch (error) {
            throw new CoreError("INVALID_CUSTOM_PARAMETER", `${path}/Abbreviation: ${error.message}`, { field: `${path}/Abbreviation` });
        }
        entries.set(String(data.Abbreviation).toUpperCase().trim(), data);
    }
    Game_BattlerBase.prototype.paramValueByName = function(value, formatted) {
        const name = String(value || "").toUpperCase();
        const identity = parameterIdentity(name);
        let result;
        let percentage;
        if (identity) {
            result = this[{ Param: "param", XParam: "xparam", SParam: "sparam" }[identity.family]](identity.id);
            percentage = identity.family !== "Param";
        } else {
            const custom = entries.get(name);
            if (!custom) return "";
            result = this[custom.Abbreviation];
            percentage = custom.Type !== "integer";
        }
        return percentage && formatted ? `${Math.round(result * 100)}%` : result;
    };
    Game_Actor.prototype.expRate = function() {
        if (this.isMaxLevel()) return 1;
        return ((this.currentExp() - this.currentLevelExp()) / (this.nextLevelExp() - this.currentLevelExp())).clamp(0, 1);
    };
    settings.Param.DisplayedParams = settings.Param.DisplayedParams.map(value => String(value).toUpperCase().trim());
    settings.Param.ExtDisplayedParams = settings.Param.ExtDisplayedParams.map(value => String(value).toUpperCase().trim());
    return entries;
}
