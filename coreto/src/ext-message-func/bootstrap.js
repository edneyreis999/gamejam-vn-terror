function installExtendedMessage() {
    const fail = (code, message) => { throw new CoreError(code, message); };
    if (Utils.RPGMAKER_NAME !== 'MZ' || Utils.RPGMAKER_VERSION !== '1.10.0') fail('EXT_ENGINE_VERSION', 'Use RPG Maker MZ 1.10.0.');
    const active = $plugins.filter(p => p.status);
    const extended = active.filter(p => [catalog.pluginId, catalog.reference.pluginId].includes(p.name));
    if (extended.length !== 1 || extended[0].name !== catalog.pluginId || globalThis.Coreto?.ExtMessageFunc) fail('EXT_DUPLICATE_PROVIDER', 'Enable exactly one Extended provider.');
    const own = extended[0];
    for (const [service, providers] of Object.entries({core:catalog.dependencies.cores, message:catalog.dependencies.messages})) {
        const entries = active.filter(p => p.name in providers);
        if (entries.length !== 1) fail('EXT_DEPENDENCY', `Enable exactly one ${service} provider.`);
        const entry = entries[0];
        if (active.indexOf(entry) >= active.indexOf(own)) fail('EXT_PLUGIN_ORDER', `Place ${entry.name} before Extended.`);
        const versionMatches = entry.name === 'Coreto_0_CoreEngine' ? globalThis.Coreto?.CoreEngine?.version === providers[entry.name] : entry.description.includes(`[Version ${providers[entry.name]}]`);
        if (!versionMatches) fail('EXT_DEPENDENCY_VERSION', `Use ${entry.name} ${providers[entry.name]}.`);
    }
    if (!globalThis.VisuMZ?.MessageCore?.Settings || typeof Window_Message.prototype.addedHeight !== 'function') fail('EXT_MESSAGE_API', 'The Message provider must be loaded before Extended.');
    for (const [name, version] of Object.entries(catalog.dependencies.integrations)) {
        const entries = active.filter(p => p.name === name);
        if (entries.length > 1) fail('EXT_DEPENDENCY_DUPLICATE', `Duplicate ${name}.`);
        if (entries.length && !entries[0].description.includes(`[Version ${version}]`)) fail('EXT_DEPENDENCY_VERSION', `Use ${name} ${version}.`);
    }
    if (active.some(p => /^VisuMZ_3_/.test(p.name) && active.indexOf(p) < active.indexOf(own))) fail('EXT_PLUGIN_ORDER', 'Place Extended before tier 3 consumers.');
    const filename = decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if (filename !== `${catalog.pluginId}.js`) fail('EXT_FILENAME', `Keep the filename ${catalog.pluginId}.js.`);
    const source = resolveExtendedSource(catalog, $plugins);
    VisuMZ.ConvertParams = convertExtendedParameters;
    const settings = resolveExtendedSettings(source.rawParameters, VisuMZ);
    const registered = new Set();
    const api = {pluginId:catalog.pluginId, version:catalog.version, ...source, settings,
        registerCommand(name, handler) {
            const schema = catalog.commands.find(c => c.key === name);
            if (!schema || registered.has(name)) fail('EXT_COMMAND_REGISTRATION', `Unknown or duplicate Extended command ${name}.`);
            registered.add(name);
            for (const id of [catalog.pluginId, catalog.reference.pluginId]) PluginManager.registerCommand(id, name, function(raw) {
                return handler.call(this, convertExtendedParameters.call(VisuMZ,raw,raw));
            });
        }
    };
    globalThis.Coreto ??= {};
    Coreto.ExtMessageFunc = api;
    globalThis.Imported ??= {};
    Imported.Coreto_2_ExtMessageFunc = true;
    Imported.VisuMZ_2_ExtMessageFunc = true;
    VisuMZ.ExtMessageFunc = {version:1.22, Settings:settings};
    return api;
}
const extendedApi = installExtendedMessage();
