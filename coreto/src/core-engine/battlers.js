function installGoldChange() {
    const command = catalog.commands.find(command => command.key === "GoldChange");
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        const args = convertEventArguments(command, raw);
        $gameParty.gainGold(args.value || 0);
    });
}

const basicParameterNames = ["MAXHP", "MAXMP", "ATK", "DEF", "MAT", "MDF", "AGI", "LUK"];
const extraParameterNames = ["HIT", "EVA", "CRI", "CEV", "MEV", "MRF", "CNT", "HRG", "MRG", "TRG"];
const specialParameterNames = ["TGR", "GRD", "REC", "PHA", "MCR", "TCR", "PDR", "MDR", "FDR", "EXR"];

function traitFormulaSource(source, convertToBase) {
    let code = ` ${source}`;
    if (convertToBase) {
        const properties = ["mhp", "mmp", "atk", "def", "mat", "mdf", "agi", "luk"];
        for (const [id, property] of properties.entries()) {
            code = code.replace(new RegExp(`\\s(?:user|this)\\.${property}\\b`, "gi"), `this.paramBase(${id})`);
        }
        code = code.replace(/\s(?:user|this)\.param\(/gi, "this.paramBase(");
    }
    return code.replace(/\suser\./gi, " this.");
}

function traitPatterns(names, stage, fractional) {
    return names.map(name => {
        const start = `<${name} ${stage}: `;
        const sign = stage === "Rate" ? "" : "[+-]";
        const numeric = stage === "Max" ? [["(\\d+)", 1]] : fractional || stage === "Rate" ?
            [[`(${sign}\\d+)[%％]`, 100], [`(${sign}\\d+\\.?\\d+)`, 1]] : [["([+-]\\d+)", 1]];
        return {
            numeric: numeric.map(([pattern, divisor]) => ({
                expression: new RegExp(start + pattern + ">", "i"), divisor
            })),
            javascript: new RegExp(`<JS ${name} ${stage}: (.*)>`, "i")
        };
    });
}

function installBattlerLevels() {
    const paramBase = Game_Actor.prototype.paramBase;
    Game_Actor.prototype.paramBase = function(id, ...args) {
        if (this.level <= 99) return paramBase.call(this, id, ...args);
        const curve = this.currentClass().params[id];
        return curve[99] + (curve[99] - curve[98]) * (this.level - 99);
    };
    Game_Enemy.prototype.getLevel = function() {
        return this.enemy().level;
    };
    Object.defineProperty(Game_Enemy.prototype, "level", {
        configurable: true,
        get() { return this.getLevel(); }
    });
}

function installBattlerParameters(settings) {
    const options = settings.Param;
    const caches = new WeakMap();
    const cacheFor = battler => {
        if (!caches.has(battler)) caches.set(battler, new Map());
        return caches.get(battler);
    };
    const refresh = Game_BattlerBase.prototype.refresh;
    Game_BattlerBase.prototype.refresh = function(...args) {
        caches.delete(this);
        return refresh.apply(this, args);
    };
    const levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function(...args) {
        const result = levelUp.apply(this, args);
        caches.delete(this);
        return result;
    };
    function applyTraits(battler, pattern, initial, stage, args) {
        let result = initial;
        const combine = (left, right) => stage === "Rate" ? left * right : stage === "Max" ? Math.max(left, right) : left + right;
        for (const object of battler.traitObjects()) {
            if (!object) continue;
            for (const { expression, divisor } of pattern.numeric) {
                const match = expression.exec(object.note);
                if (match) {
                    const value = Number(match[1]) / divisor;
                    result = combine(result, stage === "Max" && value === 0 ? Number.MAX_SAFE_INTEGER : value);
                }
            }
            const authored = pattern.javascript.exec(object.note);
            if (authored) {
                try {
                    const value = evaluateAuthoredScript.call(battler, traitFormulaSource(authored[1], options.ConvertToBase), args);
                    result = combine(result, stage === "Max" ? Number(value) : value);
                } catch (error) {
                    reportAuthoredError(error, `${object.name ?? object.id}: ${authored[0]}`);
                }
            }
        }
        return result;
    }
    const nativePlus = Game_BattlerBase.prototype.paramPlus;
    const nativeRate = Game_BattlerBase.prototype.paramRate;
    for (const [family, names] of [["param", basicParameterNames], ["xparam", extraParameterNames], ["sparam", specialParameterNames]]) {
        for (const stage of ["Plus", "Rate", "Flat"]) {
            const patterns = traitPatterns(names, stage, family !== "param");
            const method = `${family}${stage === "Flat" ? "FlatBonus" : stage}`;
            Game_BattlerBase.prototype[method] = function(id, ...args) {
                const initial = family === "param" && stage === "Plus" ? nativePlus.call(this, id, ...args) :
                    family === "param" && stage === "Rate" ? nativeRate.call(this, id, ...args) : stage === "Rate" ? 1 : 0;
                return applyTraits(this, patterns[id], initial, stage, [id, ...args]);
            };
        }
        const setting = `${family === "param" ? "Basic" : family === "xparam" ? "X" : "S"}ParameterFormula`;
        const formula = compileAuthoredBody(options[setting], `/Param/${setting}`);
        Game_BattlerBase.prototype[family] = function(id) {
            const cache = cacheFor(this);
            const key = `${family}/${id}`;
            if (cache.get(key) !== undefined) return cache.get(key);
            let value;
            try { value = formula.call(this, id); }
            catch (error) {
                if (error instanceof CoreError) throw error;
                throw new CoreError("AUTHORED_CODE_FAILED", `/Param/${setting}: ${error.message}`, { field: `/Param/${setting}` });
            }
            if (family === "param") value = Math.round(value);
            cache.set(key, value);
            return value;
        };
    }
    const maximums = traitPatterns(basicParameterNames, "Max", false);
    Game_BattlerBase.prototype.paramMax = function(id) {
        const cache = cacheFor(this);
        const key = `cap/${id}`;
        if (cache.get(key) !== undefined) return cache.get(key);
        const field = `Basic${this.isActor() ? "Actor" : "Enemy"}ParamMax${id}`;
        let value;
        try { value = evaluateAuthoredScript.call(this, options[field], arguments); }
        catch (error) { throw new CoreError("AUTHORED_CODE_FAILED", `/Param/${field}: ${error.message}`, { field: `/Param/${field}` }); }
        if (value === 0) value = Number.MAX_SAFE_INTEGER;
        cache.set(key, value);
        value = applyTraits(this, maximums[id], value, "Max", arguments);
        cache.set(key, value);
        return value;
    };
    Game_BattlerBase.prototype.isDying = function() {
        return this.isAlive() && this.hp < this.mhp * options.CrisisRate;
    };
}
