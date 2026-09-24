function convertEventArguments(command, raw) {
    function convertObject(fields, input, path, shared) {
        const result = shared ? { ...input } : {};
        const ordered = [...Object.keys(input), ...fields.map(field => field.storageKey).filter(key => !Object.hasOwn(input, key))];
        for (const key of ordered) {
            const field = fields.find(field => field.storageKey === key);
            if (!field) {
                if (!shared) Object.defineProperty(result, key, { value: input[key], enumerable: true, writable: true, configurable: true });
                continue;
            }
            const location = `${path}/${field.key}`;
            if (field.type === "struct") {
                const source = parseLayer(input[key] ?? encodeValue(field, field.default, location), location);
                if (!source || typeof source !== "object" || Array.isArray(source)) valueError(field, source, location);
                result[field.key] = convertObject(field.fields, source, location, false);
                continue;
            }
            const inputField = field.runtimeBounds === "handler" ? { ...field, min: undefined, max: undefined, integer: false, options: undefined } : field;
            const value = decodeValue(inputField, input[key], location);
            result[field.key] = field.javascript?.kind === "body" ? compileAuthoredBody(value, location) :
                field.javascript?.kind === "script" ? evaluateCommandScript(value, result, location, shared ? result : input) : value;
        }
        return result;
    }
    return convertObject(command.args, raw, command.key, true);
}

function applyVariableOperation(args, command) {
    let id, operand;
    try {
        id = (typeof args.id === "function" ? args.id() : args.id) || 1;
        operand = (typeof args.operand === "function" ? args.operand() : args.operand) || 0;
    } catch (error) {
        throw new CoreError("AUTHORED_CODE_FAILED", `${command}: ${error.message}`, { field: command });
    }
    const before = $gameVariables.value(id) || 0;
    const operations = {
        "=": () => operand, "+": () => before + operand, "-": () => before - operand,
        "*": () => before * operand, "/": () => before / operand, "%": () => before % operand
    };
    $gameVariables.setValue(id, operations[args.operation]() || 0);
}

function installEventCommands(settings) {
    const running = new WeakMap();
    const terminated = new WeakSet();
    function clearScene(scene) {
        const interpreters = running.get(scene) ?? [];
        running.delete(scene);
        for (const interpreter of interpreters) interpreter.clear();
    }
    function currentScene() {
        const scene = SceneManager._scene;
        return scene && !terminated.has(scene) ? scene : undefined;
    }
    function onceParallel(id, eventId = 0) {
        const scene = currentScene();
        if (!(scene instanceof Scene_Map)) return;
        const event = $dataCommonEvents[id];
        if (!event) return;
        const interpreter = new Game_Interpreter();
        interpreter.setup(event.list, eventId);
        if (!running.has(scene)) running.set(scene, []);
        running.get(scene).push(interpreter);
    }
    const updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function(...args) {
        const result = updateMain.apply(this, args);
        const interpreters = running.get(this);
        if (interpreters) {
            // Defer removal so completed siblings do not skip an update; appended work keeps native order.
            for (const interpreter of interpreters) {
                if (running.get(this) !== interpreters) break;
                interpreter.update();
            }
            if (running.get(this) === interpreters) {
                running.set(this, interpreters.filter(interpreter => interpreter.isRunning()));
            }
        }
        return result;
    };
    for (const method of ['terminate', 'destroy']) {
        const previous = Scene_Base.prototype[method];
        Scene_Base.prototype[method] = function(...args) {
            clearScene(this);
            terminated.add(this);
            return previous.apply(this, args);
        };
    }
    for (const method of ['createGameObjects', 'extractSaveContents']) {
        const previous = DataManager[method];
        DataManager[method] = function(...args) {
            clearScene(SceneManager._scene);
            return previous.apply(this, args);
        };
    }
    const setupMap = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(...args) {
        const scene = currentScene();
        if (scene) clearScene(scene);
        return setupMap.apply(this, args);
    };

    Game_Temp.prototype.setLastPluginCommandInterpreter = function(interpreter) {
        this._lastPluginCommandInterpreter = interpreter;
    };
    Game_Temp.prototype.getLastPluginCommandInterpreter = function() {
        return this._lastPluginCommandInterpreter;
    };
    const command357 = Game_Interpreter.prototype.command357;
    Game_Interpreter.prototype.command357 = function(...args) {
        $gameTemp.setLastPluginCommandInterpreter(this);
        return command357.apply(this, args);
    };

    const ownedCommands = ["MapOnceParallel", "SwitchRandomizeOne", "SwitchRandomizeRange", "SwitchToggleOne", "SwitchToggleRange", "VariableEvalReference", "VariableJsBlock"];
    for (const command of catalog.commands.filter(command => ownedCommands.includes(command.key))) {
        PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
            if (command.key.startsWith("Switch") && $gameParty.inBattle()) return;
            if (command.key === "MapOnceParallel" && !(currentScene() instanceof Scene_Map)) return;
            const args = convertEventArguments(command, raw);
            if (command.key === "MapOnceParallel") return onceParallel(args.CommonEventID);
            if (command.key.startsWith("Variable")) return applyVariableOperation(args, command.key);
            const ids = args.IDs ?? Array.from({ length: Math.abs(args.EndingID - args.StartID) + 1 },
                (_, index) => Math.min(args.StartID, args.EndingID) + index);
            for (const id of ids) {
                const value = command.key.startsWith("SwitchRandomize") ? Math.random() <= args.Chance / 100 : !$gameSwitches.value(id);
                $gameSwitches.setValue(id, value);
            }
        });
    }
    if (settings.QoL.ShortcutScripts) {
        globalThis.$commonEvent = id => $gameTemp.reserveCommonEvent(id);
        globalThis.$onceParallel = onceParallel;
        const battle = () => currentScene() instanceof Scene_Battle;
        const getters = {
            $scene: currentScene,
            $spriteset: () => currentScene()?._spriteset,
            $subject: () => battle() ? BattleManager._subject : undefined,
            $targets: () => battle() ? BattleManager._targets : undefined,
            $target: () => battle() ? BattleManager._target || BattleManager._targets?.[0] : undefined,
            $event: () => {
                if (!$gameMap.isEventRunning()) return undefined;
                let interpreter = $gameMap._interpreter;
                while (interpreter._childInterpreter) interpreter = interpreter._childInterpreter;
                return $gameMap.event(interpreter.eventId());
            }
        };
        for (const [name, get] of Object.entries(getters)) Object.defineProperty(globalThis, name, { get, configurable: true });
    }
}

function installEventFailsafes() {
    const branch = Game_Interpreter.prototype.command111;
    Game_Interpreter.prototype.command111 = function(params) {
        if (params[0] !== 12) return branch.apply(this, arguments);
        let result;
        try { result = !!evaluateAuthoredScript.call(this, params[1], Array.from(arguments)); }
        catch (error) {
            reportAuthoredError(error, `conditional branch, event ${this.eventId()}, index ${this._index}`);
            delete this._branch[this._indent];
            this.skipBranch();
            return true;
        }
        this._branch[this._indent] = result;
        if (!result) this.skipBranch();
        return true;
    };
    const variables = Game_Interpreter.prototype.command122;
    Game_Interpreter.prototype.command122 = function(params) {
        if (params[3] !== 4) return variables.apply(this, arguments);
        let value;
        try { value = evaluateAuthoredScript.call(this, params[4], Array.from(arguments)); }
        catch (error) {
            reportAuthoredError(error, `control variables, event ${this.eventId()}, index ${this._index}`);
            return true;
        }
        return variables.call(this, [params[0], params[1], params[2], 0, value]);
    };
    Game_Interpreter.prototype.command355 = function() {
        let source = this.currentCommand().parameters[0] + "\n";
        while (this.nextEventCode() === 655) {
            this._index++;
            source += this.currentCommand().parameters[0] + "\n";
        }
        try { evaluateAuthoredScript.call(this, source, Array.from(arguments)); }
        catch (error) { reportAuthoredError(error, `script, event ${this.eventId()}, index ${this._index}`); }
        return true;
    };
    const scrolling = Game_Interpreter.prototype.command105;
    Game_Interpreter.prototype.command105 = function(...args) {
        const lines = [];
        let index = this._index + 1;
        while (this._list[index]?.code === 405) lines.push(this._list[index++].parameters[0]);
        const source = lines.join("\n");
        if (!/\/\/[ ]SCRIPT[ ]CALL/i.test(source)) return scrolling.apply(this, args);
        try { evaluateAuthoredScript.call(this, source, args); }
        catch (error) { reportAuthoredError(error, `scrolling script, event ${this.eventId()}, index ${this._index}`); }
        return true;
    };
    const route = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        if (command.code !== Game_Character.ROUTE_SCRIPT) return route.apply(this, arguments);
        try { evaluateRouteScript.call(this, command.parameters[0], Array.from(arguments)); }
        catch (error) { reportAuthoredError(error, `move route, index ${this._moveRouteIndex}`); }
    };
}
