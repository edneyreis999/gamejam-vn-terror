function installMainMenuForcedCommands() {
    const states = ['forceShow', 'forceHide', 'forceEnable', 'forceDisable'];
    Game_System.prototype.initMainMenuCore = function() {
        this._mainMenuCore = this._mainMenuCore || {};
        for (const state of states) this._mainMenuCore[state] = this._mainMenuCore[state] || [];
    };
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        initialize.call(this);
        this.initMainMenuCore();
    };
    Game_System.prototype.mainMenuCoreSettings = function() {
        this.initMainMenuCore();
        return this._mainMenuCore;
    };
    Game_System.prototype.getMainMenuSymbolState = function(symbol, state) {
        const values = this.mainMenuCoreSettings()[state];
        return values ? values.includes(symbol) : false;
    };
    Game_System.prototype.clearShowMainMenuCommand = function(symbol) {
        const settings = this.mainMenuCoreSettings();
        for (const state of states) settings[state].remove(symbol);
    };
    for (const [state, opposite] of [['forceShow', 'forceHide'], ['forceHide', 'forceShow'], ['forceEnable', 'forceDisable'], ['forceDisable', 'forceEnable']]) {
        Game_System.prototype[state + 'MainMenuCommand'] = function(symbol) {
            const settings = this.mainMenuCoreSettings();
            if (!settings[state].includes(symbol)) settings[state].push(symbol);
            settings[opposite].remove(symbol);
        };
    }
    const methods = {MenuCommandClear: 'clearShowMainMenuCommand', MenuCommandForceShow: 'forceShowMainMenuCommand',
        MenuCommandForceHide: 'forceHideMainMenuCommand', MenuCommandForceEnable: 'forceEnableMainMenuCommand',
        MenuCommandForceDisable: 'forceDisableMainMenuCommand'};
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        for (const [command, method] of Object.entries(methods)) PluginManager.registerCommand(receiver, command, function(args) {
            const symbols = JSON.parse(args['Symbols:arraystr'] || '[]').map(String);
            for (const symbol of symbols) $gameSystem[method](symbol);
        });
    }
}
