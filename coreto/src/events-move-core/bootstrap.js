function installEventsMoveCore() {
    if (globalThis.Imported?.VisuMZ_1_EventsMoveCore) throw new CoreError('EV_DUPLICATE_PROVIDER', 'The original Events provider already executed. Enable only Coreto_1_EventsMoveCore.');
    const cores = $plugins.filter(plugin => plugin.status && ['Coreto_0_CoreEngine', 'VisuMZ_0_CoreEngine'].includes(plugin.name));
    if (cores.length !== 1 || cores[0].name !== 'Coreto_0_CoreEngine') throw new CoreError('EV_CORE_REQUIRED', 'Enable only Coreto_0_CoreEngine before Events & Movement.');
    const api = installComplement(catalog, 'EventsMoveCore', 'EV');
    const consumers = $plugins.filter(plugin => plugin.status && catalog.orderBefore.includes(plugin.name) && !Object.prototype.hasOwnProperty.call(catalog.dependencies.consumers, plugin.name));
    if (consumers.length) throw new CoreError('EV_CAPABILITY_UNAVAILABLE', 'This build does not yet support these consumers: ' + consumers.map(plugin => plugin.name).join(', '));
    installEventsMovePilot(api.settings);
    installEventsMoveNavigation(api.settings);
    installEventsMoveRoutes();
    installEventsMoveAutonomous(api.settings);
    installEventsMovePassage(api.settings);
    const scopedHandlers = installEventsMoveScopedData();
    installEventsMoveActivation(api.settings);
    const callHandlers = installEventsMoveCalls();
    const pageConditions = installEventsMovePageConditions();
    const templateHandlers = installEventsMoveTemplates(api.settings);
    const locationHandlers = installEventsMoveLocations();
    const spawnHandlers = installEventsMoveSpawn(api.settings);
    installEventsMoveCharacterPresentation(api.settings);
    const presentationHandlers = installEventsMovePresentationData(api.settings);
    installEventsMovePresentationSprites(api.settings);
    const labels = installEventsMoveLabels(api.settings);
    const timerFollowerHandlers = installEventsMoveTimerFollowers();
    const messageHandlers = installEventsMoveMessagePopups();
    installEventsMoveMapLifecycle();
    const handlers = {
        ...scopedHandlers,
        ...callHandlers,
        ...templateHandlers,
        ...locationHandlers,
        ...spawnHandlers,
        ...presentationHandlers,
        ...timerFollowerHandlers,
        ...messageHandlers,
        AutoMoveEvents: args => $gameSystem.setAllowEventAutoMovement(args.Value === 'Toggle' ? !$gameSystem.isAllowEventAutoMovement() : args.Value === 'Allow'),
        DashEnableToggle: args => $gameSystem.setDashingEnabled(args.Value === 'Toggle' ? !$gameSystem.isDashingEnabled() : args.Value === 'Enable'),
        PlayerMovementChange: args => $gameSystem.setPlayerControlDisable(!args.Enable),
        PlayerMovementDiagonal: args => $gameSystem.setPlayerDiagonalSetting(args.Setting)
    };
    for (const command of catalog.commands) for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, command.key, function(raw) {
            if (!handlers[command.key]) throw new CoreError('EV_CAPABILITY_UNAVAILABLE', 'Command is not available in this build: ' + command.key);
            try { handlers[command.key].call(this, decodeParameters(command.args, raw)); }
            catch (error) {
                if (!(error instanceof CoreError) || error.code === 'EV_CAPABILITY_UNAVAILABLE') throw error;
                throw new CoreError('EV_COMMAND_VALUE', error.message, {command: command.key, ...error.details});
            }
        });
    }
    api.capabilities = ['configuration', 'player-control', 'diagonal-toggle', 'movement', 'independent-routes', 'autonomous-movement', 'movement-synchronization', 'passage', 'scoped-data', 'named-data', 'event-activation', 'event-calls', 'page-conditions', 'map-lifecycle', 'templates', 'event-locations', 'dynamic-events', 'character-presentation', 'event-labels', 'event-icons', 'attached-images', 'event-timer', 'follower-control', 'message-context', 'message-popups'];
    globalThis.Imported ??= {};
    Imported[catalog.pluginId] = true;
    Imported[catalog.reference.pluginId] = true;
    globalThis.VisuMZ ??= {};
    VisuMZ.EventsMoveCore = {version: 1.67, Settings: api.settings, CustomPageConditions: pageConditions, ...labels};
    return api;
}
const eventsMoveApi = installEventsMoveCore();
