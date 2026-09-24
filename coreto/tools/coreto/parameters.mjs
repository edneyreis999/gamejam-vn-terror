import {decodeAuthoredValue as decodeValue,encodeAuthoredValue as encodeValue} from './authored-values.mjs';
import { CoreError, parameterAt, validateValue } from "../../src/core-engine/parameters.mjs";
import { parsePluginsFile, replacePlugin } from "./plugins-file.mjs";
import { validateAuthoredCode } from "./javascript.mjs";

function replaceEncoded(chain, segments, raw, replacement, depth = 0) {
    const schema = chain[depth];
    const path = `/${segments.slice(0, depth + 1).join("/")}`;
    if (depth === chain.length - 1) return encodeValue(schema, replacement, path, raw);
    const encoded = JSON.parse(raw ?? encodeValue(schema, schema.default, path));
    const key = schema.type === "array" ? segments[depth + 1] : chain[depth + 1].storageKey;
    encoded[key] = replaceEncoded(chain, segments, encoded[key], replacement, depth + 1);
    return JSON.stringify(encoded);
}

function validateAvailableChanges(schema, before, after, path) {
    if (schema.availability && !["supported", "requires-local-service"].includes(schema.availability) &&
        JSON.stringify(before) !== JSON.stringify(after)) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Parameter is not available in this environment: ${path}.`, { field: path }, 6);
    }
    if (schema.type === "struct") {
        for (const field of schema.fields) validateAvailableChanges(field, before?.[field.key], after[field.key], `${path}/${field.key}`);
    } else if (schema.type === "array") {
        after.forEach((value, index) => validateAvailableChanges(schema.items, before?.[index], value, `${path}/${index}`));
    }
}

export function parameterOperation(source, catalog, { operation, path, value }) {
    const parsed = parsePluginsFile(source);
    const indexes = parsed.plugins.flatMap((plugin, index) => plugin.name === catalog.pluginId ? [index] : []);
    if (indexes.length !== 1) {
        throw new CoreError("CORE_NOT_CONFIGURED", `Expected one ${catalog.pluginId} entry in js/plugins.js.`, {
            field: "js/plugins.js", hint: "Add the Core through the RPG Maker plugin editor; this CLI edits existing configuration."
        }, indexes.length ? 2 : 3);
    }
    const index = indexes[0];
    const plugin = parsed.plugins[index];
    const { chain, segments } = parameterAt(catalog.parameters, path);
    const rootSchema = chain[0];
    const rootValue = decodeValue(rootSchema, plugin.parameters[rootSchema.storageKey], `/${rootSchema.key}`);
    let current = rootValue;
    for (const segment of segments.slice(1)) {
        if (!Object.hasOwn(current, segment)) throw new CoreError("TARGET_NOT_FOUND", `Array position does not exist: ${path}.`, { field: path }, 3);
        current = current[segment];
    }
    if (operation === "get") return { source, result: { path, value: current } };
    if (!chain.every(field => field.availability === undefined || field.availability === "supported" || field.availability === "requires-local-service")) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Parameter is not available in this environment: ${path}.`, { field: path }, 6);
    }
    const selected = chain.at(-1);
    if (operation === "reset" && !Object.hasOwn(selected, "default")) {
        throw new CoreError("RESET_UNAVAILABLE", `No native default exists for ${path}. Reset the containing parameter instead.`, { field: path, hint: `Use parameters reset --path /${rootSchema.key}.` });
    }
    const replacement = operation === "reset" ? JSON.parse(JSON.stringify(selected.default)) : value;
    validateValue(selected, replacement, path);
    validateAvailableChanges(selected, current, replacement, path);
    validateAuthoredCode(selected, replacement, path);
    const before = current;
    const encoded = replaceEncoded(chain, segments, plugin.parameters[rootSchema.storageKey], replacement);
    const changed = { ...plugin, parameters: { ...plugin.parameters, [rootSchema.storageKey]: encoded } };
    return { source: replacePlugin(parsed, index, changed), result: { path, before, value: replacement } };
}
