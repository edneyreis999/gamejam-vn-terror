import { join } from "node:path";
import { CoreError } from "../../src/core-engine/parameters.mjs";

function ids(values) {
    const result = values.map(Number);
    if (!result.every(Number.isSafeInteger)) throw new CoreError("INVALID_TARGET", "Target IDs must be safe positive integers.", { field: "target" });
    return result;
}

export function eventTarget(root, selector) {
    let match;
    if ((match = /^map:([1-9]\d*)\/event:([1-9]\d*)\/page:([1-9]\d*)$/.exec(selector ?? ""))) {
        const [map, event, page] = ids(match.slice(1));
        return { file: join(root, "data", `Map${String(map).padStart(3, "0")}.json`), type: "map", path: ["events", event, "pages", page - 1, "list"], recordPath: ["events", event], id: event };
    }
    if ((match = /^common-event:([1-9]\d*)$/.exec(selector ?? ""))) {
        const [id] = ids([match[1]]);
        return { file: join(root, "data/CommonEvents.json"), type: "common-event", path: [id, "list"], recordPath: [id], id };
    }
    if ((match = /^troop:([1-9]\d*)\/page:([1-9]\d*)$/.exec(selector ?? ""))) {
        const [id, page] = ids(match.slice(1));
        return { file: join(root, "data/Troops.json"), type: "troop", path: [id, "pages", page - 1, "list"], recordPath: [id], id };
    }
    throw new CoreError("INVALID_TARGET", "Use map:M/event:E/page:P, common-event:C or troop:T/page:P. Pages are 1-based.", { field: "target", received: selector });
}

export function valueAt(data, path) {
    let value = data;
    for (const key of path) {
        if (!value || !Object.hasOwn(value, key)) throw new CoreError("TARGET_NOT_FOUND", `Missing target at ${path.join("/")}.`, { field: path }, 3);
        value = value[key];
    }
    return value;
}

export function targetList(document, target) {
    const record = valueAt(document.value, target.recordPath);
    if (!record || record.id !== target.id) throw new CoreError("INVALID_DATABASE_ID", "The database record ID does not match its native slot.", { field: target.recordPath });
    const list = valueAt(document.value, target.path);
    if (!Array.isArray(list)) throw new CoreError("INVALID_EVENT_LIST", "The existing target must contain an event command list.", { field: target.path });
    return list;
}
