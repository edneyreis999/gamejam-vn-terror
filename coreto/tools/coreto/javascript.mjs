import vm from "node:vm";
import { CoreError } from "../../src/core-engine/parameters.mjs";

export function validateAuthoredCode(schema, value, path) {
    if (schema.javascript) {
        const kind = typeof schema.javascript === "string" ? schema.javascript : schema.javascript.kind;
        if (!["body", "script", "expression"].includes(kind)) {
            throw new CoreError("UNSUPPORTED_JS_CONTEXT", `Unknown JavaScript grammar at ${path}.`, { field: path }, 6);
        }
        try {
            if (kind === "body") vm.compileFunction(value, [], { filename: path });
            else if (kind === "expression") vm.compileFunction(`return (${value});`, [], {filename: path});
            else new vm.Script(value, { filename: path });
        } catch (error) {
            throw new CoreError("INVALID_JAVASCRIPT", `Invalid ${kind} at ${path}: ${error.message}`, {
                field: path, expected: schema.javascript,
                hint: "Fix JavaScript syntax. Validation does not execute code or prove that runtime variables exist."
            });
        }
    }
    if (schema.type === "struct") {
        for (const field of schema.fields) validateAuthoredCode(field, value[field.key], `${path}/${field.key}`);
    } else if (schema.type === "array") {
        value.forEach((item, index) => validateAuthoredCode(schema.items, item, `${path}/${index}`));
    }
}
