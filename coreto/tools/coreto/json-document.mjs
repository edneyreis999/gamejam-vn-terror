import { CoreError } from "../../src/core-engine/parameters.mjs";

function nextToken(source, index) {
    while (/\s/.test(source[index] ?? "!")) index++;
    return index;
}

function valueEnd(source, start) {
    let quoted = false;
    let escaped = false;
    let depth = 0;
    const container = source[start] === "[" || source[start] === "{";
    for (let index = start; index < source.length; index++) {
        const char = source[index];
        if (quoted) {
            if (escaped) escaped = false;
            else if (char === "\\") escaped = true;
            else if (char === '"') {
                quoted = false;
                if (!container) return index + 1;
            }
        } else if (char === '"') quoted = true;
        else if (char === "[" || char === "{") depth++;
        else if (char === "]" || char === "}") {
            if (!container) return index;
            if (--depth === 0) return index + 1;
        } else if (!container && (char === "," || /\s/.test(char))) return index;
    }
    return source.length;
}

export function parseJsonDocument(source) {
    let value;
    try { value = JSON.parse(source); }
    catch (error) { throw new CoreError("INVALID_JSON_FILE", `Project JSON is invalid: ${error.message}`); }
    return { source, value };
}

function children(source, start) {
    const object = source[start] === "{";
    if (!object && source[start] !== "[") throw new CoreError("INVALID_JSON_TARGET", "Expected a JSON object or array.");
    const result = [];
    const keys = new Set();
    let index = nextToken(source, start + 1);
    while (source[index] !== (object ? "}" : "]")) {
        let key = result.length;
        if (object) {
            const end = valueEnd(source, index);
            key = JSON.parse(source.slice(index, end));
            if (keys.has(key)) throw new CoreError("AMBIGUOUS_JSON_KEY", `Duplicate JSON key: ${key}.`, { field: key });
            keys.add(key);
            index = nextToken(source, nextToken(source, end) + 1);
        }
        const end = valueEnd(source, index);
        result.push({ key, start: index, end });
        index = nextToken(source, end);
        if (source[index] === ",") index = nextToken(source, index + 1);
    }
    return result;
}

export function jsonSpan(document, path) {
    let node = { start: nextToken(document.source, 0), end: document.source.length };
    for (const key of path) {
        node = children(document.source, node.start).find(child => child.key === key);
        if (!node) throw new CoreError("TARGET_NOT_FOUND", `Missing JSON path: ${path.join("/")}.`, { field: path }, 3);
    }
    return node;
}

export function spliceJsonArray(document, path, index, count, items) {
    const span = jsonSpan(document, path);
    const entries = children(document.source, span.start);
    const start = entries[index]?.start;
    if (start === undefined) throw new CoreError("INVALID_POSITION", "Select an existing command index.", { field: "index", received: index });
    const text = items.map(item => JSON.stringify(item)).join(",");
    let end = start;
    let replacement = text;
    if (count) {
        const last = entries[index + count - 1];
        if (!last) throw new CoreError("INVALID_POSITION", "The selected block exceeds the list.");
        end = last.end;
        if (!items.length) {
            if (!entries[index + count]) throw new CoreError("INVALID_POSITION", "The final terminator cannot be removed.");
            end = entries[index + count].start;
        }
    } else if (items.length) replacement += ",";
    const source = document.source.slice(0, start) + replacement + document.source.slice(end);
    return parseJsonDocument(source);
}
