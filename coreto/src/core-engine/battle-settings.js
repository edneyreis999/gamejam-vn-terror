function coreBattleSystemId(value, database) {
    const normalized = String(value || "database").toUpperCase().trim();
    const supported = {DTB: 0, "TPB ACTIVE": 1, "TPB WAIT": 2};
    if (Object.hasOwn(supported, normalized)) return supported[normalized];
    if (/^(?:BTB|CTB|ETB|FTB|OTB|PTB|STB|GRID)$/.test(normalized)) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Battle system ${normalized} requires an external plugin.`, {field: "/BattleSystem", received: value}, 6);
    }
    return database;
}

function readBattleOverrides(text, field) {
    const result = {};
    const view = /<BATTLE[ ]?VIEW:[ ](.*)>/i.exec(text)?.[1];
    const system = /<BATTLE[ ]?SYSTEM:[ ](.*)>/i.exec(text)?.[1];
    if (/<(?:CTB|STB|BTB|FTB|OTB|ETB|PTB|(?:NO )?(?:BATTLE )?GRID)>/i.test(text) ||
        /(?:CTB|STB|BTB|FTB|OTB|ETB|PTB|GRID)/i.test(system || view || "")) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", "Battle tags require an external battle-system plugin.", {field}, 6);
    }
    if (/<(?:FRONT[ ]?VIEW|FV)>/i.test(text)) result.sideView = false;
    else if (/<(?:SIDE[ ]?VIEW|SV)>/i.test(text)) result.sideView = true;
    else if (/(?:FRONT[ ]?VIEW|FV)/i.test(view || "")) result.sideView = false;
    else if (/(?:SIDE[ ]?VIEW|SV)/i.test(view || "")) result.sideView = true;
    if (/<DTB>/i.test(text)) result.battleSystem = 0;
    else if (/<(?:TPB|ATB) ACTIVE>/i.test(text)) result.battleSystem = 1;
    else if (/<(?:TPB|ATB)(?: WAIT)?>/i.test(text)) result.battleSystem = 2;
    else {
        const value = system ?? view ?? "";
        if (/DTB/i.test(value)) result.battleSystem = 0;
        else if (/(?:TPB|ATB) ACTIVE/i.test(value)) result.battleSystem = 1;
        else if (/(?:TPB|ATB)(?: WAIT)?/i.test(value)) result.battleSystem = 2;
    }
    return result;
}

function installBattleSettings(settings) {
    const nativeSideView = Game_System.prototype.isSideView;
    function state(system) {
        system._coretoCore ??= {};
        system._coretoCore.schemaVersion ??= 1;
        if (system._coretoCore.battleSystem === undefined) system._coretoCore.battleSystem = coreBattleSystemId(settings.BattleSystem, $dataSystem.battleSystem);
        if (system._coretoCore.sideView === undefined) system._coretoCore.sideView = nativeSideView.call(system);
        return system._coretoCore;
    }
    const initializeSystem = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(...args) {
        const result = initializeSystem.apply(this, args);
        state(this);
        return result;
    };
    Game_System.prototype.getBattleSystem = function() { return $gameTemp?._coretoBattle?.battleSystem ?? state(this).battleSystem; };
    Game_System.prototype.isSideView = function() { return $gameTemp?._coretoBattle?.sideView ?? state(this).sideView; };
    Game_System.prototype.setBattleSystem = function(value) {
        if (![0,1,2].includes(value)) throw new CoreError("INVALID_VALUE", "Battle system must be 0, 1 or 2.", {field: "/BattleSystem", received: value});
        state(this).battleSystem = value;
    };
    Game_System.prototype.setSideView = function(value) {
        if (typeof value !== "boolean") throw new CoreError("INVALID_VALUE", "Side view must be a boolean.", {field: "sideView", received: value});
        state(this).sideView = value;
    };
    BattleManager.isTpb = function() { return $gameSystem.getBattleSystem() >= 1; };
    BattleManager.isActiveTpb = function() { return $gameSystem.getBattleSystem() === 1; };
    DataManager.createTroopNote = function(id) {
        const troop = $dataTroops[id];
        const comments = troop.pages.flatMap(page => page.list.filter(command => command.code === 108 || command.code === 408).map(command => command.parameters[0]));
        return [troop.name, ...comments].join("\n");
    };
    Game_Temp.prototype.clearCoreBattleContext = function(expected) {
        if (arguments.length === 0 || this._coretoBattle === expected) delete this._coretoBattle;
    };
    const setupTroop = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(id, ...args) {
        $gameTemp.clearCoreBattleContext();
        const map = readBattleOverrides($dataMap?.note || "", `Map${$gameMap.mapId()}.note`);
        const troop = readBattleOverrides(DataManager.createTroopNote(id), `Troop${id}.name/comments`);
        const context = {...map, ...troop};
        $gameTemp._coretoBattle = context;
        try { return setupTroop.call(this, id, ...args); }
        catch (error) {
            $gameTemp.clearCoreBattleContext(context);
            throw error;
        }
    };
    const endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(...args) {
        const context = $gameTemp._coretoBattle;
        try { return endBattle.apply(this, args); }
        finally {
            const scene = SceneManager._scene;
            if (!(scene instanceof Scene_Battle && scene._coretoBattleContext === context)) {
                $gameTemp.clearCoreBattleContext(context);
            }
        }
    };
    const initializeBattle = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function(...args) {
        const result = initializeBattle.apply(this, args);
        this._coretoBattleContext = $gameTemp._coretoBattle;
        return result;
    };
    const terminateBattle = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function(...args) {
        try { return terminateBattle.apply(this, args); }
        finally { $gameTemp.clearCoreBattleContext(this._coretoBattleContext); }
    };
    for (const key of ["SystemSetBattleSystem", "SystemSetSideView"]) {
        const command = catalog.commands.find(command => command.key === key);
        PluginManager.registerCommand(catalog.pluginId, key, function(raw) {
            if ($gameParty.inBattle()) return;
            const args = convertEventArguments(command, raw);
            if (key === "SystemSetBattleSystem") $gameSystem.setBattleSystem(coreBattleSystemId(args.option, $dataSystem.battleSystem));
            else if (/front/i.test(args.option)) $gameSystem.setSideView(false);
            else if (/side/i.test(args.option)) $gameSystem.setSideView(true);
            else $gameSystem.setSideView(!$gameSystem.isSideView());
        });
    }
    return state;
}
