import {validatePictureReference} from './picture-reference.mjs';
import {decodeAuthoredValue as decodeValue,encodeAuthoredValue as encodeValue} from './authored-values.mjs';
import { relative, join } from "node:path";
import { CoreError, validateValue } from "../../src/core-engine/parameters.mjs";
import { validateAuthoredCode } from "./javascript.mjs";
import { parseJsonDocument, spliceJsonArray } from "./json-document.mjs";
import { eventTarget, targetList } from "./event-target.mjs";
import { eventUnits, unitAt } from "./event-list.mjs";
import { readSnapshot, writeSnapshot, hash } from "./files.mjs";

function commandSchema(catalog, key) {
    const command = catalog.commands.find(command => command.key === key);
    if (!command) throw new CoreError("UNKNOWN_COMMAND", `Unknown Core command: ${key}.`, { field: "command", received: key, hint: "Use core api list to see published commands." }, 3);
    return command;
}

function partialStruct(field,value,path,previous){
    if(!value||typeof value!=='object'||Array.isArray(value))throw new CoreError('INVALID_VALUE','Use an object for a partial command struct.',{field:path});
    let encoded={};
    if(previous!==undefined){
        try{encoded=JSON.parse(previous);}catch{throw new CoreError('INVALID_ENCODING','Invalid existing command struct.',{field:path});}
        if(!encoded||typeof encoded!=='object'||Array.isArray(encoded))throw new CoreError('INVALID_ENCODING','Existing command struct must encode an object.',{field:path});
    }
    for(const [key,item]of Object.entries(value)){
        const child=field.fields.find(child=>child.key===key);
        if(!child)throw new CoreError('UNKNOWN_FIELD','Unknown command struct field: '+key,{field:path+'/'+key});
        if(child.type==='struct')encoded[child.storageKey]=partialStruct(child,item,path+'/'+key,encoded[child.storageKey]);
        else{validateAuthoredCode(child,item,path+'/'+key);encoded[child.storageKey]=encodeValue(child,item,path+'/'+key,encoded[child.storageKey]);}
    }
    return JSON.stringify(encoded);
}

function nativeArgs(command, payload, previous = {}, partialCommandStructs = false) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new CoreError("INVALID_VALUE", "Command arguments must be a JSON object.", { field: "value" });
    for (const key of Object.keys(payload)) {
        if (!command.args.some(field => field.key === key)) throw new CoreError("UNKNOWN_FIELD", `Unknown command argument: ${key}.`, { field: key });
    }
    const args = { ...previous };
    for (const field of command.args) {
        const path = `${command.key}/${field.key}`;
        const selected = Object.hasOwn(payload, field.key);
        if(partialCommandStructs&&field.type==='struct'&&selected){
            args[field.storageKey]=partialStruct(field,payload[field.key],path,previous[field.storageKey]);
            continue;
        }
        const value = selected ? payload[field.key] : decodeValue(field, previous[field.storageKey], path);
        validateValue(field.editorMin === undefined ? field : { ...field, min: field.editorMin }, value, path);
        validateAuthoredCode(field, value, path);
        if (selected || !Object.hasOwn(previous, field.storageKey)) args[field.storageKey] = encodeValue(field, value, path, previous[field.storageKey]);
    }
    return args;
}

function blockFor(catalog, command, indent, args, previous, previousAnnotations) {
    const head = { ...previous, code: 357, indent, parameters: [(previous?.parameters[0] ?? catalog.pluginId), command.key, previous?.parameters[2] ?? command.label, args,
        ...(previous?.parameters.slice(4) ?? [])] };
    let annotations = Object.entries(args).map(([key, value]) => ({
        code: 657, indent, parameters: [`${command.args.find(field => field.storageKey === key)?.label ?? key} = ${value}`]
    }));
    if(previousAnnotations){
        const seen=new Set();
        annotations=previousAnnotations.map(annotation=>{
            const text=annotation.parameters[0];
            for(const [key,value]of Object.entries(args)){
                const field=command.args.find(field=>field.storageKey===key);
                const prefix=[field?.label,field?.key,key].filter(Boolean).map(label=>label+' = ').find(prefix=>text.startsWith(prefix));
                if(prefix){seen.add(key);return {...annotation,parameters:[prefix+value,...annotation.parameters.slice(1)]};}
            }
            return annotation;
        });
        for(const [key,value]of Object.entries(args))if(!seen.has(key))annotations.push({code:657,indent,parameters:[`${command.args.find(field=>field.storageKey===key)?.label??key} = ${value}`]});
    }
    return [head, ...annotations];
}

function inspectBlock(head, catalog, expected, validateArgs) {
    if (head.code !== 357 || ![catalog.pluginId,...(catalog.commandAliases??[])].includes(head.parameters[0]) || head.parameters[1] !== expected) {
        throw new CoreError("COMMAND_MISMATCH", "The selected index must be the expected command from this Core.", {
            field: "index", expected: { pluginId: catalog.pluginId, command: expected },
            received: { code: head.code, pluginId: head.parameters[0], command: head.parameters[1] }
        }, 4);
    }
    const args = head.parameters[3];
    if (validateArgs && (typeof head.parameters[2] !== "string" || !args || typeof args !== "object" || Array.isArray(args) || Object.values(args).some(value => typeof value !== "string"))) {
        throw new CoreError("INVALID_COMMAND_ARGS", "Existing plugin command arguments must be native strings.", { field: "parameters/3" });
    }
    return args;
}

export function commandOperation(source, catalog, target, { operation, command: key, index, value = {} }) {
    const document = parseJsonDocument(source);
    const list = targetList(document, target);
    const units = eventUnits(list);
    if (operation === "list") {
        return { source, result: { units: units.map(unit => {
            const head = list[unit.index];
            const own = head.code === 357 && [catalog.pluginId,...(catalog.commandAliases??[])].includes(head.parameters[0]);
            const command = own && catalog.commands.find(command => command.key === head.parameters[1]);
            const result = { ...unit, editable: !!command,
                ...(head.code === 357 ? { pluginId: head.parameters[0], command: head.parameters[1], args: head.parameters[3] } : {}) };
            if (command) {
                try {
                    const args = inspectBlock(head, catalog, command.key, true);
                    result.values = Object.fromEntries(command.args.map(field => [field.key, decodeValue(field, args[field.storageKey], `${command.key}/${field.key}`)]));
                } catch (error) {
                    if (!(error instanceof CoreError)) throw error;
                    result.error = { code: error.code, message: error.message, ...error.details };
                }
            }
            return result;
        }) } };
    }
    const command = commandSchema(catalog, key);
    if (operation !== "remove" && !["supported", "requires-local-service"].includes(command.availability)) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Command ${key} is not available: ${command.availability}.`, { field: "command" }, 6);
    }
    if (operation !== "remove" && !command.targets.includes(target.type)) throw new CoreError("INVALID_COMMAND_CONTEXT", `${key} cannot be authored in ${target.type}. Use a supported map/Common Event target.`, { field: "target", expected: command.targets });
    const unit = unitAt(units, index, operation);
    const head = list[index];
    const previous = operation === "insert" ? undefined : inspectBlock(head, catalog, key, operation === "update");
    const block = operation === "remove" ? [] : blockFor(catalog, command, unit.indent, nativeArgs(command, value, previous, catalog.partialCommandStructs), operation === "update" ? head : undefined, operation === "update" && catalog.preserveCommandAnnotations ? list.slice(index+1,unit.endIndex) : undefined);
    const count = operation === "insert" ? 0 : unit.endIndex - index;
    const updated = [...list.slice(0, index), ...block, ...list.slice(index + count)];
    eventUnits(updated);
    const written = spliceJsonArray(document, target.path, index, count, block);
    if (JSON.stringify(targetList(written, target)) !== JSON.stringify(updated)) throw new CoreError("INVALID_POSTCONDITION", "The serialized command list differs from the requested change.", {}, 5);
    return { source: written.source, result: { index, command: key, before: list.slice(index, index + count), after: block } };
}

export async function commandFileOperation(root, catalog, options) {
    const target = eventTarget(root, options.target);
    const snapshot = await readSnapshot(target.file, root);
    if(options.expectedHash!==undefined&&options.expectedHash!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Read the target before retrying.',{fileHash:snapshot.hash},4);
    const change = commandOperation(snapshot.content.toString("utf8"), catalog, target, options);
    if (["insert", "update"].includes(options.operation)) {
        await validateReferences(root, commandSchema(catalog, options.command), change.result.after[0].parameters[3]);
    }
    const result = { file: relative(root, target.file), fileHash:snapshot.hash, ...change.result };
    if (options.operation !== "list") {
        if (options.dryRun) Object.assign(result, { dryRun: true, written: false, beforeHash: snapshot.hash, proposedHash: hash(change.source) });
        else Object.assign(result, await writeSnapshot(snapshot, change.source), { written: true });
    }
    return { operation: `${catalog.namespace ?? "core"} commands ${options.operation}`, target: options.target, result };
}

export async function validateReferences(root, command, args, read = async name => {
    const snapshot = await readSnapshot(join(root, "data", name), root);
    return parseJsonDocument(snapshot.content.toString("utf8")).value;
}) {
    const cache = new Map();
    async function check(field, value, path) {
        if(field.metadata?.type?.[0]==='file'&&field.metadata?.dir?.[0]==='img/pictures/')await validatePictureReference(root,value,path);
        if (field.type === "array") {
            for (let index = 0; index < value.length; index++) await check(field.items, value[index], `${path}/${index}`);
        } else if (field.type === "struct") {
            for (const item of field.fields) await check(item, value[item.key], `${path}/${item.key}`);
        } else if (["switch", "variable", "common_event", "animation", "actor", "weapon-type", "armor-type", "equip-type", "skill-type", "picture"].includes(field.editorType)) {
            if(field.javascript){if(typeof value==='string'&&/^\d+$/.test(value.trim()))value=Number(value);else return;}
            if (field.allowZero && value === 0) return;
            const database = {common_event: "CommonEvents.json", animation: "Animations.json", actor: "Actors.json"}[field.editorType];
            const name = database ?? "System.json";
            if (!cache.has(name)) {
                cache.set(name, await read(name));
            }
            const data = cache.get(name);
            const columns = {switch:'switches', variable:'variables', 'weapon-type':'weaponTypes', 'armor-type':'armorTypes', 'equip-type':'equipTypes', 'skill-type':'skillTypes'};
            if (field.editorType === 'picture') {
                const maximum = data.advanced?.picturesUpperLimit ?? 100;
                if (Number.isSafeInteger(value) && value > 0 && value <= maximum) return;
                throw new CoreError("INVALID_REFERENCE", `Picture ID must be between 1 and ${maximum}.`, {field:path, received:value});
            }
            const records = database ? data : data[columns[field.editorType]];
            const exists = Array.isArray(records) && Number.isSafeInteger(value) && value > 0 && value < records.length &&
                (!database || records[value]?.id === value);
            if (!exists) throw new CoreError("INVALID_REFERENCE", `No ${field.editorType} exists with ID ${value}.`, {
                field: path, received: value, hint: "Select an existing native ID; this CLI does not create database records."
            });
        }
    }
    for (const field of command.args) {
        const path = `${command.key}/${field.key}`;
        await check(field, decodeValue(field, args[field.storageKey], path), path);
    }
}
