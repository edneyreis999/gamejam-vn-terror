function parameterIdentity(name) {
    for (const [family, names] of [["Param", basicParameterNames], ["XParam", extraParameterNames], ["SParam", specialParameterNames]]) {
        const id = names.indexOf(name);
        if (id >= 0) return { family, id };
    }
    return undefined;
}

function installParameterNames(settings, customParameters) {
    const nativeName = TextManager.param;
    TextManager.paramName = function(value) {
        const identity = parameterIdentity(String(value || "").toUpperCase());
        if (!identity) return customParameters.get(String(value || "").toUpperCase())?.ParamName || "";
        return identity.family === "Param" ? nativeName.call(this, identity.id) :
            settings.Param[`${identity.family}Vocab${identity.id}`];
    };
    TextManager.param = function(value, ...args) {
        return typeof value === "number" ? nativeName.call(this, value, ...args) : this.paramName(value);
    };
    return function parameterIcon(value) {
        const identity = parameterIdentity(String(value).toUpperCase());
        return identity ? settings.Param[`Icon${identity.family}${identity.id}`] : customParameters.get(String(value).toUpperCase())?.Icon || 0;
    };
}
