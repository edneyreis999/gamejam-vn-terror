function installEventsMoveScopedData() {
    globalThis.VisuMZ ??= {};
    for (const kind of ['Switches', 'Variables']) {
        for (const prefix of ['Advanced', 'Self', 'Map']) VisuMZ[prefix + kind] = [];
        VisuMZ['Ref' + kind] = {};
    }
    Scene_Boot.prototype.process_VisuMZ_EventsMoveCore_Switches_Variables = function() {
        for (const [kind, source] of [['Switches', $dataSystem.switches], ['Variables', $dataSystem.variables]]) {
            for (let id = 1; id < source.length; id++) {
                const name = source[id];
                if (/<JS>\s*[\s\S]*\s*<\/JS>/i.test(name)) VisuMZ['Advanced' + kind].push(id);
                if (/<SELF>/i.test(name)) VisuMZ['Self' + kind].push(id);
                if (/<MAP>/i.test(name)) VisuMZ['Map' + kind].push(id);
                const reference = /\(\((.*)\)\)/.exec(name) || /（（(.*)））/.exec(name);
                if (reference) VisuMZ['Ref' + kind][reference[1].toUpperCase().trim()] = id;
            }
        }
    };
    const databaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        databaseLoaded.call(this);
        this.process_VisuMZ_EventsMoveCore_Switches_Variables();
    };
    Game_Temp.prototype.registerSelfTarget = function(target) { this._selfTarget = target; };
    Game_Temp.prototype.clearSelfTarget = function() { this._selfTarget = undefined; };
    Game_Temp.prototype.getSelfTarget = function() { return this._selfTarget; };
    const selfValue = Game_SelfSwitches.prototype.value, setSelfValue = Game_SelfSwitches.prototype.setValue;
    Game_SelfSwitches.prototype.selfValue = function(key) { return /VAR/i.test(key[2]) ? this._data[key] || 0 : !!this._data[key]; };
    Game_SelfSwitches.prototype.setSelfValue = function(key, value) {
        this._data[key] = /VAR/i.test(key[2]) ? value : !!value;
        this.onChange();
    };
    Game_SelfSwitches.prototype.value = function(key) { return /SELF|MAP/i.test(key[2]) ? this.selfValue(key) : selfValue.call(this, key); };
    Game_SelfSwitches.prototype.setValue = function(key, value) {
        if (/SELF|MAP/i.test(key[2])) this.setSelfValue(key, value);
        else setSelfValue.call(this, key, value);
    };
    Game_SelfSwitches.prototype.resetSelfSwitchesForMap = function(mapId) {
        const prefix = mapId + ',';
        for (const key of Object.keys(this._data)) if (key.startsWith(prefix)) delete this._data[key];
        if (mapId === $gameMap.mapId()) $gameMap.requestRefresh();
    };
    function selfKey(map, event, id, kind) {
        return [map, event, kind === 'Switch' && typeof id === 'string' ? id.toUpperCase().trim() : 'Self ' + kind + ' ' + id];
    }
    function mapKey(map, id, kind) { return [0, 0, 'Map ' + map + ' ' + kind + ' ' + id]; }
    for (const kind of ['Switch', 'Variable']) {
        globalThis['getSelf' + kind + 'Value'] = (map, event, id) => $gameSelfSwitches.value(selfKey(map, event, id, kind));
        globalThis['setSelf' + kind + 'Value'] = (map, event, id, value) => $gameSelfSwitches.setValue(selfKey(map, event, id, kind), value);
        globalThis['getMap' + kind + 'Value'] = (map, id) => $gameSelfSwitches.value(mapKey(map, id, kind));
        globalThis['setMap' + kind + 'Value'] = (map, id, value) => $gameSelfSwitches.setValue(mapKey(map, id, kind), value);
    }
    for (const [Type, kind, collection] of [[Game_Switches, 'Switch', 'switches'], [Game_Variables, 'Variable', 'variables']]) {
        const plural = kind === 'Switch' ? 'Switches' : 'Variables';
        const value = Type.prototype.value, setValue = Type.prototype.setValue;
        Type.advancedFunc = {};
        for (const prefix of ['Advanced', 'Self', 'Map']) DataManager['is' + prefix + kind] = id => VisuMZ[prefix + plural].includes(id);
        function resolve(id) {
            if (typeof id !== 'string') return id;
            const name = id.toUpperCase().trim();
            if (Object.prototype.hasOwnProperty.call(VisuMZ['Ref' + plural], name)) return VisuMZ['Ref' + plural][name];
            console.warn('Unknown ' + kind.toLowerCase() + ' reference: ' + name);
            return undefined;
        }
        Type.prototype.advancedValue = function(id) {
            if (!Type.advancedFunc[id]) {
                const match = /<JS>\s*([\s\S]*?)\s*<\/JS>/i.exec($dataSystem[collection][id]);
                Type.advancedFunc[id] = new Function(kind.toLowerCase() + 'Id', 'return ' + (match ? match[1] : kind === 'Switch' ? 'false' : '0'));
            }
            return Type.advancedFunc[id].call($gameTemp.getSelfTarget() || this, id);
        };
        Type.prototype.selfValue = function(id) {
            const target = $gameTemp.getSelfTarget() || this;
            return target instanceof Game_Event ? $gameSelfSwitches.value(selfKey(target._mapId, target._eventId, id, kind)) : value.call(this, id);
        };
        Type.prototype.setSelfValue = function(id, next) {
            const target = $gameTemp.getSelfTarget() || this;
            if (target instanceof Game_Event) $gameSelfSwitches.setValue(selfKey(target._mapId, target._eventId, id, kind), next);
            else setValue.call(this, id, next);
        };
        Type.prototype.mapValue = function(id) { return $gameSelfSwitches.value(mapKey($gameMap ? $gameMap.mapId() : 0, id, kind)); };
        Type.prototype.setMapValue = function(id, next) { $gameSelfSwitches.setValue(mapKey($gameMap ? $gameMap.mapId() : 0, id, kind), next); };
        Type.prototype.value = function(id) {
            id = resolve(id);
            if (id === undefined) return kind === 'Switch' ? false : 0;
            let result;
            if (DataManager['isAdvanced' + kind](id)) result = this.advancedValue(id);
            else if (DataManager['isSelf' + kind](id)) result = this.selfValue(id);
            else if (DataManager['isMap' + kind](id)) result = this.mapValue(id);
            else result = value.call(this, id);
            return kind === 'Switch' ? !!result : result;
        };
        Type.prototype.setValue = function(id, next) {
            id = resolve(id);
            if (id === undefined) return;
            if (DataManager['isSelf' + kind](id)) this.setSelfValue(id, next);
            else if (DataManager['isMap' + kind](id)) this.setMapValue(id, next);
            else setValue.call(this, id, next);
        };
    }
    function withTarget(target, operation, receiver, args) {
        const previous = $gameTemp.getSelfTarget();
        $gameTemp.registerSelfTarget(target);
        try { return operation.apply(receiver, args); }
        finally { $gameTemp.registerSelfTarget(previous); }
    }
    const executeCommand = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function() {
        return withTarget(this._conditionCommonEvent || ($gameMap && this._eventId ? $gameMap.event(this._eventId) : null), executeCommand, this, []);
    };
    const meetsConditions = Game_Event.prototype.meetsConditions;
    Game_Event.prototype.checkAdvancedSwitchVariablePresent = function(page) {
        const conditions = page.conditions;
        if (conditions.switch1Valid && DataManager.isAdvancedSwitch(conditions.switch1Id) ||
            conditions.switch2Valid && DataManager.isAdvancedSwitch(conditions.switch2Id) ||
            conditions.variableValid && DataManager.isAdvancedVariable(conditions.variableId)) this._advancedSwitchVariable = true;
    };
    Game_Event.prototype.hasAdvancedSwitchVariable = function() { return this._advancedSwitchVariable; };
    Game_Event.prototype.meetsConditions = function(page) {
        this.checkAdvancedSwitchVariablePresent(page);
        return withTarget(this, meetsConditions, this, [page]);
    };
    Game_CommonEvent.prototype.hasAdvancedSwitchVariable = function() {
        return this.isActive() && this.event().trigger >= 1 && DataManager.isAdvancedSwitch(this.event().switchId);
    };
    Game_Map.prototype.checkNeedForPeriodicRefresh = function() {
        this._needsPeriodicRefresh = this.events().some(event => event.hasAdvancedSwitchVariable()) || this._commonEvents.some(event => event.hasAdvancedSwitchVariable());
    };
    const refresh = Game_Map.prototype.refresh;
    Game_Map.prototype.refresh = function() { refresh.call(this); this.checkNeedForPeriodicRefresh(); };
    Game_Map.prototype.updatePeriodicRefresh = function() {
        if (!this._needsPeriodicRefresh) return;
        this._periodicRefreshTimer = (this._periodicRefreshTimer || 60) - 1;
        if (this._periodicRefreshTimer <= 0) { this.requestRefresh(); this._periodicRefreshTimer = 60; }
    };
    const update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(active) { this.updatePeriodicRefresh(); update.call(this, active); };
    Game_Character.prototype.convertSelfVariableValuesInScriptCall = function(script) {
        return script.replace(/\\SELFVAR\[(\d+)\]/gi, (_, id) => String(getSelfVariableValue(this._mapId, this._eventId, Number(id))));
    };
    Game_Character.prototype.processMoveRouteSelfSwitch = function(id, operation) {
        if (this === $gamePlayer) return;
        const key = selfKey(this._mapId, this._eventId, /^[ABCD]$/i.test(id) ? id : Number(id), 'Switch');
        const value = operation.toUpperCase().trim();
        if (value === 'TOGGLE') $gameSelfSwitches.setValue(key, !$gameSelfSwitches.value(key));
        else if (['ON', 'TRUE', 'OFF', 'FALSE'].includes(value)) $gameSelfSwitches.setValue(key, value === 'ON' || value === 'TRUE');
    };
    Game_Character.prototype.processMoveRouteSelfVariable = function(id, value) {
        if (this !== $gamePlayer) setSelfVariableValue(this._mapId, this._eventId, id, Number(value));
    };
    const processMoveCommand = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        return withTarget(this, function() {
            if (command.code === Game_Character.ROUTE_SCRIPT) {
                const script = this.convertSelfVariableValuesInScriptCall(this.convertVariableValuesInScriptCall(command.parameters[0]));
                let match;
                if ((match = /Self Switch (.*): (.*)/i.exec(script))) return this.processMoveRouteSelfSwitch(match[1], match[2]);
                if ((match = /Self Variable (.*): (.*)/i.exec(script))) return this.processMoveRouteSelfVariable(match[1], match[2]);
                command = {...command, parameters: [script]};
            }
            return processMoveCommand.call(this, command);
        }, this, []);
    };
    function commandKey(args, interpreter, kind) {
        const map = new Function('return ' + args.MapId).call(interpreter) || $gameMap.mapId();
        const event = new Function('return ' + args.EventId).call(interpreter) || interpreter.eventId();
        return selfKey(map, event, kind === 'Variable' ? args.VariableId : args.Letter ?? args.SwitchId, kind);
    }
    function setSwitch(args) {
        const key = commandKey(args, this, 'Switch');
        $gameSelfSwitches.setValue(key, args.Value === 'Toggle' ? !$gameSelfSwitches.value(key) : args.Value === 'ON');
    }
    function getSwitch(args) { $gameSwitches.setValue(args.TargetSwitchId, $gameSelfSwitches.value(commandKey(args, this, 'Switch')) || false); }
    return {
        SelfDataResetAll(args) {
            const map = new Function('return ' + args.MapId).call(this) || $gameMap.mapId();
            $gameSelfSwitches.resetSelfSwitchesForMap(map);
        },
        SelfSwitchABCD: setSwitch,
        SelfSwitchID: setSwitch,
        SwitchGetSelfSwitchABCD: getSwitch,
        SwitchGetSelfSwitchID: getSwitch,
        VariableGetSelfVariableID(args) { $gameVariables.setValue(args.TargetVariableId, $gameSelfSwitches.value(commandKey(args, this, 'Variable')) || false); },
        SelfVariableID(args) {
            const key = commandKey(args, this, 'Variable'), previous = $gameSelfSwitches.value(key);
            const value = new Function('return ' + args.Value).call(this);
            const operations = {'=': () => value, '+': () => previous + value, '-': () => previous - value,
                '*': () => previous * value, '/': () => previous / value, '%': () => previous % value};
            $gameSelfSwitches.setValue(key, operations[args.Operation]());
        }
    };
}
