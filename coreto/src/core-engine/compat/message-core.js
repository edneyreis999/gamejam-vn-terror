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
    // Legacy consumers use the reference API version to select implemented Core hooks.
    // Settings is the actual Core state, so rebinding and presentation read the same values.
    compatibility.CoreEngine = {version: 1.90, Settings: settings};
    const imported = globalThis.Imported ??= {};
    const categories = ["Class", "Skill", "Item", "Weapon", "Armor", "Enemy", "State"];
    // Message wraps these extension points before the database-ready dispatcher invokes them.
    for (const category of categories) compatibility[`Parse${category}Notetags`] ??= function() {};
    compatibility.ParseAllNotetags = function() {
        const groups = [$dataClasses, $dataSkills, $dataItems, $dataWeapons, $dataArmors, $dataEnemies, $dataStates];
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
    compatibility.ApplyEasing = applyEasing;
    compatibility.GroupDigits = formatDigits;
    compatibility.GetParamIcon = parameterIcon;
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
    imported.VisuMZ_0_CoreEngine = true;
}
