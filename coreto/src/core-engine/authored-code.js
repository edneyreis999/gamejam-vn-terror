function reportAuthoredError(error, context) {
    if (Utils.isOptionValid("test")) console.error(`[CORE_AUTHORED_CODE] ${context}`, error);
}

// Native MZ eval fields run in non-strict functions. The generated plugin itself remains strict.
const evaluateAuthoredScript = new Function("code", "args", "return function(params) { return eval(code); }.apply(this, args);");
const evaluateRouteScript = new Function("code", "args", "return function(command) { const params = command.parameters; const gc = Game_Character; return eval(code); }.apply(this, args);");

function compileAuthoredBody(source, context) {
    try {
        return new Function(source);
    } catch (error) {
        throw new CoreError("INVALID_JAVASCRIPT", `Cannot compile ${context}: ${error.message}`, { field: context });
    }
}

function evaluateCommandScript(source, args, context, input = args) {
    const receiver = globalThis.VisuMZ ??= {};
    try {
        return evaluateAuthoredScript.call(receiver, source, [args, input]);
    } catch (error) {
        throw new CoreError("AUTHORED_CODE_FAILED", `${context}: ${error.message}`, { field: context });
    }
}

function installQuickFunctions(settings) {
    const prepared = settings.jsQuickFunc.map((entry, index) => ({
        name: entry.FunctionName.replace(/ /g, ""),
        body: compileAuthoredBody(entry.CodeJS, `/jsQuickFunc/${index}/CodeJS`)
    }));
    for (const { name, body } of prepared) {
        if (!name || name in globalThis) continue;
        globalThis[name] = function(...args) {
            try {
                return body.apply(this, args);
            } catch (error) {
                reportAuthoredError(error, `quick function ${name}`);
                return 0;
            }
        };
    }
}
