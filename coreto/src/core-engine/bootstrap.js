function installationError(code, message) {
    const error = new Error(`[${code}] ${message}`);
    error.code = code;
    throw error;
}

function installCore() {
    if (Utils.RPGMAKER_NAME !== catalog.engine.name ||
        Utils.RPGMAKER_VERSION !== catalog.engine.version) {
        installationError("CORE_ENGINE_VERSION", "Use RPG Maker MZ 1.10.0 with this Core.");
    }

    const active = $plugins.filter(plugin => plugin.status);
    if (active.some(plugin => Utils.extractFileName(plugin.name) === "VisuMZ_0_CoreEngine") ||
        globalThis.Imported?.VisuMZ_0_CoreEngine) {
        installationError("CORE_DUPLICATE_PROVIDER", "Disable VisuMZ_0_CoreEngine before enabling Coreto_0_CoreEngine.");
    }
    const entries = active.filter(plugin => plugin.name === catalog.pluginId);
    if (entries.length !== 1 || globalThis.Coreto?.CoreEngine) {
        installationError("CORE_INSTALLATION", "Enable exactly one Coreto_0_CoreEngine entry in js/plugins.js.");
    }
    const filename = decodeURIComponent(document.currentScript.src.split("?")[0].split("/").pop());
    if (filename !== `${catalog.pluginId}.js`) {
        installationError("CORE_FILENAME", `Keep the plugin filename ${catalog.pluginId}.js.`);
    }
    const ownIndex = active.indexOf(entries[0]);
    const messageIndex = active.findIndex(plugin => ["VisuMZ_1_MessageCore", "Coreto_1_MessageCore"].includes(plugin.name));
    if (messageIndex >= 0 && messageIndex < ownIndex) {
        installationError("CORE_PLUGIN_ORDER", "Place Coreto_0_CoreEngine before the Message provider.");
    }

    const configuration = resolvePluginConfiguration(catalog, $plugins);
    const settings = decodeParameters(catalog.parameters, configuration.rawParameters);
    installQuickFunctions(settings);
    installEventCommands(settings);
    installEventFailsafes();
    installGoldChange();
    installMapRules(settings);
    installExtendedTiles();
    installAnimationGeometry(settings);
    installRenderOptions(settings);
    installScreenShake(settings);
    const normalizePicture = installPictureState();
    installPictureCommands();
    installSpriteResources();
    installPictureContainers(settings);
    installAnimationLifecycle();
    installPictureIcons();
    installTextMetrics(settings);
    const formatDigits = installTextGrouping(settings);
    const normalizeSystem = installSystemSettings();
    installColors(settings);
    installWindows(settings);
    installScrollbars(settings);
    installWindowLayer(settings);
    installWindowEasing();
    installTextPopups(settings);
    installAudioCommands();
    installResourceLoading(settings);
    const openURL = installOpenUrl();
    installBattlerParameters(settings);
    installBattlerLevels();
    installCoreDatabaseNotes();
    const customParameters = installCustomParameters(settings);
    const parameterIcon = installParameterNames(settings, customParameters);
    installInput(settings);
    installInputLabels(settings);
    installModernControls(settings);
    installPlaytestInput(settings);
    installUiSettings(settings);
    installButtonAssist(settings);
    installNameInput(settings);
    installNumberInput(settings);
    installBattleRules();
    const normalizeBattle = installBattleSettings(settings);
    installBattleQuality(settings);
    installBattlePositions(settings);
    installActorPresentation(settings, parameterIcon);
    installStateIconPresentation(settings);
    installMenuLayouts(settings);
    installMenuBackgrounds(settings);
    installTitle(settings);
    installGoldPresentation(settings, formatDigits);
    installPictureCoordinates(installMetadataOperations());
    installMessageCompatibility(active, settings, formatDigits, parameterIcon);
    installSaveLifecycle({normalizeSystem, normalizeBattle, normalizePicture});
    installNewGameSettings(settings);

    const api = {
        version: catalog.version,
        pluginId: catalog.pluginId,
        parameterIcon,
        displayedParameters(extended = false) {
            return [...settings.Param[extended ? "ExtDisplayedParams" : "DisplayedParams"]];
        },
        applyEasing,
        groupDigits: formatDigits,
        openURL,
        describe() {
            return JSON.parse(JSON.stringify({
                schemaVersion: catalog.schemaVersion,
                pluginId: catalog.pluginId,
                version: catalog.version,
                engine: catalog.engine,
                parameters: catalog.parameters,
                commands: catalog.commands,
                tags: catalog.tags,
                methods: catalog.methods,
                entries: describeCoreApi(catalog),
                compatibility: catalog.compatibility
            }));
        }
    };
    globalThis.Coreto ??= {};
    globalThis.Coreto.CoreEngine = api;
}

installCore();
