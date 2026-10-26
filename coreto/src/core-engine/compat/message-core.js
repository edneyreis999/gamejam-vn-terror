function installMessageCompatibility(active, settings, formatDigits, parameterIcon) {
    const providers = active.filter(plugin => ["VisuMZ_1_MessageCore", "Coreto_1_MessageCore"].includes(plugin.name));
    if (providers.length > 1) installationError("CORE_MESSAGE_DUPLICATE_PROVIDER", "Enable exactly one Message provider.");
    const message = providers[0];
    if (!message) return;
    if (!message.description.includes("[MessageCore]")) {
        installationError("CORE_MESSAGE_DESCRIPTION", "Keep the original [MessageCore] marker in the active Message Core description.");
    }
    const compatibility = globalThis.VisuMZ ??= {};
    if (compatibility.coretoMessageBridge) installationError("CORE_MESSAGE_BRIDGE_DUPLICATE", "Message bridge already installed.");
    compatibility.coretoMessageBridge = true;
    installLegacyCoreInterface(settings, formatDigits, parameterIcon);
    installLegacyCoreNotetags();
    compatibility.applyMoveEasing = applyEasing;
    for (const method of ["easeIn", "easeOut", "easeInOut"]) {
        Window_Base.prototype[method] = Game_Picture.prototype[method];
    }
    const destroyPicture = Sprite_Picture.prototype.destroy;
    Sprite_Picture.prototype.destroy = function(...args) {
        const textWindow = this._pictureTextWindow;
        try {
            return destroyPicture.apply(this, args);
        } finally {
            // Message owns an off-tree window; destroying picture children cannot release it.
            if (textWindow && !textWindow._destroyed) textWindow.destroy();
            this._pictureTextWindow = null;
        }
    };
}

function installLegacyCoreInterface(settings, formatDigits, parameterIcon) {
    const compatibility = globalThis.VisuMZ ??= {};
    const entries = settings.CustomParam.map(data => [String(data.Abbreviation).toUpperCase().trim(), data]);
    compatibility.CoreEngine = {version: 1.90, Settings: settings,
        CustomParamNames: Object.fromEntries(entries.map(([name, data]) => [name, data.ParamName])),
        CustomParamAbb: Object.fromEntries(entries.map(([name, data]) => [name, data.Abbreviation])),
        CustomParamType: Object.fromEntries(entries.map(([name, data]) => [name, data.Type]))};
    compatibility.ConvertNumberToString = function(value, decimals, parameter) {
        if (parameter === undefined && value % 1 === 0) return value;
        if (parameter !== undefined && basicParameterNames.includes(String(parameter).toUpperCase().trim())) return value;
        const core = compatibility.CoreEngine;
        if (core.CustomParamAbb[parameter] && core.CustomParamType[parameter] === "integer") return value;
        return String((value * 100).toFixed(decimals || 0)) + "%";
    };
    compatibility.ApplyEasing = applyEasing;
    compatibility.GroupDigits = formatDigits;
    compatibility.GetParamIcon = parameterIcon;
    globalThis.Imported ??= {};
    Imported.VisuMZ_0_CoreEngine = true;
}

function installVictoryCoreCompatibility(active, settings, formatDigits, parameterIcon) {
    if (active.some(plugin => plugin.name === "VisuMZ_3_VictoryAftermath")) {
        installLegacyCoreInterface(settings, formatDigits, parameterIcon);
    }
}

function installLegacyCoreNotetags() {
    const compatibility = globalThis.VisuMZ;
    const categories = ["Actor", "Class", "Skill", "Item", "Weapon", "Armor", "Enemy", "State"];
    // Consumers wrap these extension points before the database-ready dispatcher invokes them.
    for (const category of categories) compatibility[`Parse${category}Notetags`] ??= function() {};
    compatibility.ParseAllNotetags = function() {
        const groups = [$dataActors, $dataClasses, $dataSkills, $dataItems, $dataWeapons, $dataArmors, $dataEnemies, $dataStates];
        for (const [index, group] of groups.entries()) {
            for (const record of group) {
                if (record) compatibility[`Parse${categories[index]}Notetags`].call(this, record);
            }
        }
    };
    const onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = onDatabaseLoaded.apply(this, args);
        compatibility.ParseAllNotetags();
        return result;
    };
}

function installEquipCoreCompatibility(active, settings, formatDigits, parameterIcon) {
    if (!active.some(plugin => plugin.name === "VisuMZ_2_EquipSetBonuses")) return;
    installLegacyCoreInterface(settings, formatDigits, parameterIcon);
    if (!VisuMZ.coretoMessageBridge) installLegacyCoreNotetags();
}

function installOptionsCoreCompatibility(active, settings, formatDigits, parameterIcon) {
    if (active.some(plugin => ["VisuMZ_1_OptionsCore", "Coreto_1_OptionsCore"].includes(plugin.name))) {
        installLegacyCoreInterface(settings, formatDigits, parameterIcon);
    }
}

function installItemsCoreCompatibility(active, settings, formatDigits, parameterIcon) {
    if (active.some(plugin => ["VisuMZ_1_ItemsEquipsCore", "Coreto_1_ItemsEquipsCore"].includes(plugin.name))) {
        installLegacyCoreInterface(settings, formatDigits, parameterIcon);
    }
}
