function compileMainMenuSetting(field, value) {
    if ((field.javascript?.kind || field.javascript) === 'body') return new Function(value);
    if (field.type === 'array') return value.map(item => compileMainMenuSetting(field.items, item));
    if (field.type === 'struct') {
        for (const child of field.fields) value[child.key] = compileMainMenuSetting(child, value[child.key]);
    }
    return value;
}

function installMainMenuCore() {
    if (globalThis.Imported?.VisuMZ_1_MainMenuCore) throw new CoreError('MM_DUPLICATE_PROVIDER', 'The original MainMenu already executed. Enable only one provider.');
    const api = installComplement(catalog, 'MainMenuCore', 'MM');
    for (const plugin of $plugins.filter(plugin => plugin.status && Object.prototype.hasOwnProperty.call(catalog.dependencies.consumers, plugin.name))) {
        const version = catalog.dependencies.consumers[plugin.name];
        if (!plugin.description.includes('[Version ' + version + ']')) throw new CoreError('MM_CONSUMER_VERSION', 'Use ' + plugin.name + ' ' + version + '.');
    }
    for (const field of catalog.parameters.filter(field => field.key !== 'CoretoConfigSource')) {
        api.settings[field.key] = compileMainMenuSetting(field, api.settings[field.key]);
    }
    globalThis.VisuMZ ??= {};
    VisuMZ.MainMenuCore ??= {};
    VisuMZ.MainMenuCore.Settings = api.settings;
    installMainMenuForcedCommands();
    installMainMenuCommands(api.settings);
    installMainMenuActorGraphics(api.settings);
    installMainMenuBattleCompatibility();
    installMainMenuLayouts(api.settings);
    installMainMenuActorBackground(api.settings);
    installMainMenuImageCommands();
    installMainMenuAuxiliary(api.settings);
    installMainMenuCursor(api.settings);
    installMainMenuPartyCompatibility();
    installMainMenuVictoryCompatibility();
    installMainMenuClassCompatibility();
    installMainMenuItemsCompatibility();
    globalThis.Imported ??= {};
    Imported.Coreto_1_MainMenuCore = true;
    api.capabilities = ['configuration', 'menu-command-list', 'menu-command-categories', 'forced-command-settings', 'actor-selection', 'actor-layouts', 'actor-portraits', 'image-commands', 'actor-menu-backgrounds', 'auxiliary-windows', 'custom-cursor'];
    return api;
}
installMainMenuCore();
