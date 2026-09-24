import { join } from "node:path";
import { CoreError } from "../../src/core-engine/parameters.mjs";
import { textField } from "./texts.mjs";
import { eventTarget, valueAt } from "./event-target.mjs";
import { eventUnits } from "./event-list.mjs";

const databases = {actors: "Actors", classes: "Classes", enemies: "Enemies", weapons: "Weapons", armors: "Armors", states: "States", tilesets: "Tilesets"};
function numbers(match) {
    const values = match.map(Number);
    if (!values.every(Number.isSafeInteger)) throw new CoreError("INVALID_TARGET", "Target IDs and indices must be safe integers.", {field: "target"});
    return values;
}

export function tagTarget(root, selector) {
    let match;
    if((match=/^system:(switch|variable):([1-9]\d*)$/.exec(selector??''))){
        const [id]=numbers([match[2]]);
        return {file:join(root,'data/System.json'),type:'system-'+match[1],id,path:[match[1]==='switch'?'switches':'variables',id]};
    }
    if ((match = /^(.*)\/text:(0|[1-9]\d*)\/(text|speaker|choice:(?:0|[1-9]\d*)|upperleft|up|upperright|left|center|right|lowerleft|down|lowerright)$/.exec(selector ?? ""))) {
        const base = eventTarget(root, match[1]);
        return {...base, type: "event-text", textIndex: Number(match[2]), textPath: match[3]};
    }
    if ((match = /^map:([1-9]\d*)\/name$/.exec(selector ?? ""))) {
        const [id] = numbers(match.slice(1));
        return {file: join(root, "data", `Map${String(id).padStart(3, "0")}.json`), type: "map-name", id, path: ["displayName"]};
    }
    if ((match = /^(actors|classes|enemies|weapons|armors|states|tilesets):([1-9]\d*)$/.exec(selector ?? ""))) {
        const [id] = numbers([match[2]]);
        return {file: join(root, "data", databases[match[1]] + ".json"), type: match[1], id, recordPath: [id], path: [id, "note"]};
    }
    if ((match = /^map:([1-9]\d*)$/.exec(selector ?? ""))) {
        const [id] = numbers(match.slice(1));
        return {file: join(root, "data", `Map${String(id).padStart(3, "0")}.json`), type: "map", id, path: ["note"]};
    }
    if ((match = /^class:([1-9]\d*)\/learning:(0|[1-9]\d*)$/.exec(selector ?? ""))) {
        const [id, learning] = numbers(match.slice(1));
        return {file: join(root, "data/Classes.json"), type: "class-learning", id, recordPath: [id], path: [id, "learnings", learning, "note"]};
    }
    if ((match = /^animation:([1-9]\d*)$/.exec(selector ?? ""))) {
        const [id] = numbers(match.slice(1));
        return {file: join(root, "data/Animations.json"), type: "animation", id, recordPath: [id], path: [id, "name"]};
    }
    if ((match = /^troop:([1-9]\d*)(?:\/(name)|\/page:([1-9]\d*)\/comment:(0|[1-9]\d*))?$/.exec(selector ?? ""))) {
        const [id] = numbers([match[1]]);
        const base = {file: join(root, "data/Troops.json"), id, recordPath: [id]};
        if (match[2]) return {...base, type: "troop-name", path: [id, "name"]};
        if (match[3]) {
            const [page, index] = numbers(match.slice(3));
            return {...base, type: "troop-comment", page, index, listPath: [id, "pages", page - 1, "list"]};
        }
        return {...base, type: "troop"};
    }
    throw new CoreError("INVALID_TARGET", "Use actors:A, classes:C, enemies:E, weapons:W, armors:A, states:S, tilesets:T, map:M, class:C/learning:L, animation:A, troop:T/name or troop:T/page:P/comment:I. troop:T lists all fields.", {field: "target", received: selector});
}

export function tagFields(document, target, selector) {
    if (target.type === "event-text") {
        const field = textField(document, target, target.textIndex, target.textPath);
        return [{...target, type: field.type, textTarget: target, selector, text: field.value}];
    }
    if (target.recordPath) {
        const record = valueAt(document.value, target.recordPath);
        if (!record || record.id !== target.id) throw new CoreError("INVALID_DATABASE_ID", "Record ID differs from its native database slot.", {field: target.recordPath});
    }
    if (target.type === "troop") {
        const troop = valueAt(document.value, target.recordPath);
        if (!Array.isArray(troop.pages)) throw new CoreError("INVALID_EVENT_LIST", "The troop must contain existing pages.");
        const fields = tagFields(document, {...target, type: "troop-name", path: [target.id, "name"]}, `${selector}/name`);
        for (const [page, data] of troop.pages.entries()) {
            const units = eventUnits(data.list);
            for (const unit of units) {
                if (data.list[unit.index].code === 108) fields.push(...tagFields(document, {...target, type: "troop-comment", page: page + 1, index: unit.index, listPath: [target.id, "pages", page, "list"]}, `${selector}/page:${page + 1}/comment:${unit.index}`));
            }
        }
        return fields;
    }
    if (target.type === "troop-comment") {
        const list = valueAt(document.value, target.listPath);
        const unit = eventUnits(list).find(unit => unit.index === target.index);
        if (!unit || list[target.index].code !== 108) throw new CoreError("INVALID_COMMENT_TARGET", "Select the index of an existing 108 comment header, not a 408 continuation.", {field: "comment", received: target.index});
        const parts = list.slice(unit.index, unit.endIndex);
        if (parts.some(command => command.parameters.length !== 1 || typeof command.parameters[0] !== "string")) throw new CoreError("INVALID_COMMENT", "Every comment line must contain one native string.", {field: target.listPath});
        return [{...target, selector, text: parts.map(command => command.parameters[0]).join("\n"), parts}];
    }
    const text = valueAt(document.value, target.path);
    if (typeof text !== "string") throw new CoreError("INVALID_TAG_FIELD", "The existing native field must be a string.", {field: target.path});
    return [{...target, selector, text}];
}
