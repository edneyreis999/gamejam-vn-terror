function installSystemSettings() {
    const fontSize = Game_System.prototype.mainFontSize;
    const padding = Game_System.prototype.windowPadding;
    function state(system) {
        system._coretoCore ??= {};
        system._coretoCore.schemaVersion ??= 1;
        if (system._coretoCore.fontSize === undefined) system._coretoCore.fontSize = fontSize.call(system);
        if (system._coretoCore.windowPadding === undefined) system._coretoCore.windowPadding = padding.call(system);
        return system._coretoCore;
    }
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(...args) {
        const result = initialize.apply(this, args);
        state(this);
        return result;
    };
    Game_System.prototype.mainFontSize = function() { return state(this).fontSize; };
    Game_System.prototype.windowPadding = function() { return state(this).windowPadding; };
    Game_System.prototype.setMainFontSize = function(value) { state(this).fontSize = value; };
    Game_System.prototype.setWindowPadding = function(value) { state(this).windowPadding = value; };
    for (const [key, setter] of [["SystemSetFontSize", "setMainFontSize"], ["SystemSetWindowPadding", "setWindowPadding"]]) {
        const command = catalog.commands.find(command => command.key === key);
        PluginManager.registerCommand(catalog.pluginId, key, function(raw) {
            const args = convertEventArguments(command, raw);
            $gameSystem[setter](args.option || 1);
        });
    }
    return state;
}
