import { CoreError } from "../../src/core-engine/parameters.mjs";

function endOfValue(source, start) {
    let depth = 0;
    let quoted = false;
    let escaped = false;
    for (let index = start; index < source.length; index++) {
        const char = source[index];
        if (quoted) {
            if (escaped) escaped = false;
            else if (char === "\\") escaped = true;
            else if (char === '"') quoted = false;
        } else if (char === '"') quoted = true;
        else if (char === "{" || char === "[") depth++;
        else if (char === "}" || char === "]") {
            if (--depth === 0) return index + 1;
        }
    }
    throw new CoreError("INVALID_PLUGIN_FILE", "Unterminated plugins array in js/plugins.js.", { field: "js/plugins.js" });
}

export function parsePluginsFile(source) {
    const prefix = source.match(/^\uFEFF?(?:(?:\s+)|(?:\/\/[^\n]*(?:\n|$))|(?:\/\*[\s\S]*?\*\/))*var\s+\$plugins\s*=\s*/)?.[0];
    if (!prefix || source[prefix.length] !== "[") {
        throw new CoreError("INVALID_PLUGIN_FILE", "Expected the native var $plugins = [...] envelope; JavaScript is not evaluated.", { field: "js/plugins.js" });
    }
    const end = endOfValue(source, prefix.length);
    if (!/^\s*;?(?:(?:\s+)|(?:\/\/[^\n]*(?:\n|$))|(?:\/\*[\s\S]*?\*\/))*$/.test(source.slice(end))) {
        throw new CoreError("INVALID_PLUGIN_FILE", "Unexpected executable content after the plugins array.", { field: "js/plugins.js" });
    }
    let plugins;
    try {
        plugins = JSON.parse(source.slice(prefix.length, end));
    } catch {
        throw new CoreError("INVALID_PLUGIN_FILE", "The plugins array must be valid JSON.", { field: "js/plugins.js" });
    }
    if (!plugins.every(plugin => plugin && typeof plugin === "object" && !Array.isArray(plugin) &&
        typeof plugin.name === "string" && typeof plugin.status === "boolean" &&
        typeof plugin.description === "string" && plugin.parameters && typeof plugin.parameters === "object" &&
        !Array.isArray(plugin.parameters) && Object.values(plugin.parameters).every(value => typeof value === "string"))) {
        throw new CoreError("INVALID_PLUGIN_FILE", "Invalid native plugin record or parameter encoding.", { field: "js/plugins.js" });
    }
    const spans = [];
    let cursor = prefix.length + 1;
    for (let index = 0; index < plugins.length; index++) {
        while (/[\s,]/.test(source[cursor])) cursor++;
        const finish = endOfValue(source, cursor);
        spans.push({ start: cursor, end: finish });
        cursor = finish;
    }
    return { plugins, spans, source, arrayStart: prefix.length, arrayEnd: end };
}

export function replacePlugin(parsed, index, plugin) {
    const { start, end } = parsed.spans[index];
    const result = parsed.source.slice(0, start) + JSON.stringify(plugin) + parsed.source.slice(end);
    parsePluginsFile(result);
    return result;
}

export function insertPlugin(parsed, index, plugin) {
    if(!Number.isInteger(index)||index<0||index>parsed.plugins.length)throw new CoreError('INVALID_PLUGIN_INDEX','Invalid plugin insertion index.');
    let offset, text;
    if(index<parsed.spans.length){offset=parsed.spans[index].start;text=JSON.stringify(plugin)+',';}
    else if(parsed.spans.length){offset=parsed.spans.at(-1).end;text=','+JSON.stringify(plugin);}
    else{offset=parsed.arrayStart+1;text=JSON.stringify(plugin);}
    const result=parsed.source.slice(0,offset)+text+parsed.source.slice(offset);parsePluginsFile(result);return result;
}
