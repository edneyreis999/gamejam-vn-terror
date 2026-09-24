function messageInstallationError(code, message) {
    throw new CoreError(code, message);
}

function installMessage() {
    if (Utils.RPGMAKER_NAME !== 'MZ' || Utils.RPGMAKER_VERSION !== '1.10.0') {
        messageInstallationError('MESSAGE_ENGINE_VERSION', 'Use RPG Maker MZ 1.10.0.');
    }
    const active = $plugins.filter(plugin => plugin.status);
    const providers = active.filter(plugin => ['Coreto_1_MessageCore', 'VisuMZ_1_MessageCore'].includes(plugin.name));
    if (providers.length !== 1 || providers[0].name !== catalog.pluginId || globalThis.Coreto?.MessageCore) {
        messageInstallationError('MESSAGE_DUPLICATE_PROVIDER', 'Enable exactly one Message provider, using Coreto_1_MessageCore.');
    }
    const own = providers[0];
    if (!globalThis.Coreto?.CoreEngine || active.findIndex(plugin => plugin.name === 'Coreto_0_CoreEngine') >= active.indexOf(own)) {
        messageInstallationError('MESSAGE_CORE_REQUIRED', 'Place Coreto_0_CoreEngine before Coreto_1_MessageCore.');
    }
    if (!own.description.includes('[MessageCore]') || !own.description.includes(`[Version ${catalog.version}]`)) {
        messageInstallationError('MESSAGE_DESCRIPTION', 'Refresh the Message plugin description and version in the editor.');
    }
    const filename = decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if (filename !== `${catalog.pluginId}.js`) messageInstallationError('MESSAGE_FILENAME', `Keep the filename ${catalog.pluginId}.js.`);
    for (const [name, version] of Object.entries({...catalog.dependencies.consumers, ...catalog.dependencies.integrations})) {
        const entries = active.filter(plugin => plugin.name === name);
        if (entries.length > 1) messageInstallationError('MESSAGE_DEPENDENCY_DUPLICATE', `Duplicate plugin: ${name}.`);
        if (!entries.length) continue;
        if (!entries[0].description.includes(`[Version ${version}]`)) messageInstallationError('MESSAGE_DEPENDENCY_VERSION', `Use ${name} ${version}.`);
        if (name in catalog.dependencies.consumers && active.indexOf(entries[0]) < active.indexOf(own)) {
            messageInstallationError('MESSAGE_CONSUMER_ORDER', `Place ${name} after Message.`);
        }
    }
    if (active.some(plugin => plugin.name === 'VisuMZ_3_StateTooltips')) {
        for (const name of ['VisuMZ_1_BattleCore', 'VisuMZ_1_SkillsStatesCore']) {
            const index = active.findIndex(plugin => plugin.name === name);
            const consumer = active.findIndex(plugin => plugin.name === 'VisuMZ_3_StateTooltips');
            if (index < 0 || index > consumer) messageInstallationError('MESSAGE_TOOLTIP_DEPENDENCY', `Place ${name} before StateTooltips.`);
        }
    }
    const raw = resolvePluginConfiguration(catalog, $plugins).rawParameters;
    const settings = resolveMessageSettings(catalog.parameters, raw, null);
    const registered = new Set();
    const api = {
        pluginId: catalog.pluginId,
        version: catalog.version,
        settings,
        rawParameters: JSON.parse(JSON.stringify(raw)),
        registerCommand(name, handler) {
            const schema = catalog.commands.find(command => command.key === name);
            if (!schema || registered.has(name)) messageInstallationError('MESSAGE_COMMAND_REGISTRATION', `Unknown or duplicate Message command: ${name}.`);
            registered.add(name);
            for (const id of [catalog.pluginId, catalog.reference.pluginId]) {
                PluginManager.registerCommand(id, name, function(rawArgs) {
                    const args = resolveMessageSettings(schema.args, rawArgs, this);
                    return handler.call(this, args);
                });
            }
        }
    };
    globalThis.Coreto.MessageCore = api;
    globalThis.Imported ??= {};
    globalThis.Imported.Coreto_1_MessageCore = true;
    globalThis.Imported.VisuMZ_1_MessageCore = true;
    globalThis.VisuMZ ??= {};
    globalThis.VisuMZ.MessageCore = {version: 1.54, Settings: settings};
    return api;
}

const messageApi = installMessage();
SceneManager.isSceneMap = function() { return this._scene instanceof Scene_Map; };
