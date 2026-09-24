import {relative} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {parseJsonDocument, jsonSpan, spliceJsonArray} from './json-document.mjs';
import {eventTarget, targetList} from './event-target.mjs';
import {eventUnits, unitAt} from './event-list.mjs';
import {readSnapshot, writeSnapshot, hash} from './files.mjs';

const pictureTextLabels = {upperleft:'Upper Left', up:'Upper Center', upperright:'Upper Right', left:'Middle Left', center:'Middle Center', right:'Middle Right', lowerleft:'Lower Left', down:'Lower Center', lowerright:'Lower Right'};
export const pictureTextZones = Object.keys(pictureTextLabels);
const messageIds = ['Coreto_1_MessageCore', 'VisuMZ_1_MessageCore'];

function reject(message, details = {}) {
    throw new CoreError('INVALID_TEXT_TARGET', message, details);
}

function string(value, multiline = true) {
    if (typeof value !== 'string' || /\r|\x00|\x1b/.test(value) || !multiline && /\n/.test(value)) {
        throw new CoreError('INVALID_TEXT_VALUE', 'Use native text with LF line breaks and authored backslash escapes. This field does not accept control characters or a non-string value.');
    }
    return value;
}

function replace(document, path, value) {
    const span = jsonSpan(document, path);
    return parseJsonDocument(document.source.slice(0, span.start) + JSON.stringify(value) + document.source.slice(span.end));
}

export function choiceBranches(list, index) {
    const head = list[index];
    const choices = head.parameters[0];
    if (!Array.isArray(choices) || !choices.length || choices.length > 6 || choices.some(value => typeof value !== 'string')) reject('102 requires one to six native choice labels.');
    const [,cancel,selected,position,background]=head.parameters;
    if(head.parameters.length!==5 || !Number.isInteger(cancel) || cancel < -2 || cancel >= choices.length || !Number.isInteger(selected) || selected < -1 || selected >= choices.length || ![0,1,2].includes(position) || ![0,1,2].includes(background)) reject('102 requires valid native cancel/default choices, position and background.');
    const branches = [];
    for (let cursor = index + 1; cursor < list.length; cursor++) {
        const item = list[cursor];
        if (item.indent !== head.indent) continue;
        if (item.code === 404) break;
        if (item.code === 402) {
            const branch = item.parameters[0];
            if (!Number.isSafeInteger(branch) || branch < 0 || branch >= choices.length || branches.some(entry => entry.branch === branch) || item.parameters[1] !== choices[branch]) reject('402 indices and labels must match their 102 owner exactly.', {index: cursor});
            branches.push({index: cursor, branch});
        }
    }
    if (branches.length !== choices.length) reject('Each native choice requires exactly one matching 402 branch.');
    return branches;
}

export function textField(document, target, index, selected) {
    const list = targetList(document, target);
    const unit = unitAt(eventUnits(list), index, 'update');
    const head = list[index];
    const base = [...target.path, index, 'parameters'];
    const path = selected ?? (head.code === 102 ? 'choices' : 'text');
    if (head.code === 101) {
        if (head.parameters.length < 5 || typeof head.parameters[0] !== 'string' || !Number.isInteger(head.parameters[1]) || head.parameters[1] < 0 || head.parameters[1] > 7 || ![0, 1, 2].includes(head.parameters[2]) || ![0, 1, 2].includes(head.parameters[3])) reject('101 requires native face, background, position and speaker parameters.');
        const speaker=string(head.parameters[4],false);
        if (path === 'speaker') return {type: 'speaker', paths: [[...base, 4]], value: speaker};
        if (path !== 'text') reject('101 accepts text or speaker.');
        const lines = list.slice(index + 1, unit.endIndex);
        if (!lines.length || lines.length > 4 || lines.some(line => line.parameters.length !== 1)) reject('101 must own one to four 401 lines; larger messages use adjacent native Show Text blocks.');
        return {type: 'message-text', unit, value: lines.map(line => string(line.parameters[0], false)).join('\n')};
    }
    if (head.code === 102) {
        const branches = choiceBranches(list, index);
        const choices = head.parameters[0];
        if (path === 'choices') return {type: 'choices', branches, value: choices, paths: [[...base, 0]]};
        const match = /^choice:(0|[1-9]\d*)$/.exec(path);
        if (!match || Number(match[1]) >= choices.length) reject('102 accepts choices or choice:N, using an existing zero-based choice.');
        const branch = Number(match[1]);
        return {type: 'choice-text', value: string(choices[branch], false), paths: [[...base, 0, branch], [...target.path, branches.find(item => item.branch === branch).index, 'parameters', 1]]};
    }
    if (head.code === 357 && messageIds.includes(head.parameters[0]) && head.parameters[1] === 'PictureTextChange') {
        if (!pictureTextZones.includes(path)) reject('PictureText requires one of its nine named zones.');
        const key = `${path}:json`;
        const raw = head.parameters[3]?.[key];
        if (typeof raw !== 'string') reject('Select an existing native PictureText zone.');
        let value;
        try { value = JSON.parse(raw); } catch { reject('PictureText notes must contain a native JSON-encoded string.'); }
        return {type: 'picture-text', value: string(value), paths: [[...base, 3, key]], unit, key};
    }
    reject('Select an existing 101, 102 or MessageCore PictureTextChange header.');
}

export function textOperation(source, target, {operation, index, path, value}) {
    let document = parseJsonDocument(source);
    const field = textField(document, target, index, path);
    if (operation !== 'set') return {source, result: {index, path: path ?? (field.type === 'choices' ? 'choices' : 'text'), type: field.type, value: field.value, valid: true}};
    if (field.type === 'choices') {
        if (!Array.isArray(value) || value.length !== field.value.length) throw new CoreError('INVALID_CHOICE_COUNT', 'Changing choice count requires branch authoring in the editor. Supply the same number of labels.');
        value.forEach(label => string(label, false));
        document = replace(document, field.paths[0], value);
        for (const branch of field.branches) document = replace(document, [...target.path, branch.index, 'parameters', 1], value[branch.branch]);
    } else {
        string(value, ['message-text', 'picture-text'].includes(field.type));
        if (field.type === 'message-text') {
            const lines = value.split('\n');
            if (lines.length > 4) throw new CoreError('INVALID_TEXT_LINES', 'One native 101 block owns at most four 401 lines. Edit adjacent blocks separately.');
            const previous = targetList(document, target);
            const parts = lines.map((line, offset) => ({...(index + 1 + offset < field.unit.endIndex ? previous[index + 1 + offset] : {}), code: 401, indent: field.unit.indent, parameters: [line]}));
            document = spliceJsonArray(document, target.path, index + 1, field.unit.endIndex - index - 1, parts);
        } else {
            for (const destination of field.paths) document = replace(document, destination, field.type === 'picture-text' ? JSON.stringify(value) : value);
            if (field.type === 'picture-text') {
                const list = targetList(document, target);
                const prefixes = [`${path} = `, `${pictureTextLabels[path]} = `];
                for (let cursor = index + 1; cursor < field.unit.endIndex; cursor++) {
                    const prefix = prefixes.find(prefix => list[cursor].parameters[0].startsWith(prefix));
                    if (prefix) document = replace(document, [...target.path, cursor, 'parameters', 0], prefix + JSON.stringify(value));
                }
            }
        }
    }
    const written = textField(document, target, index, path);
    if (JSON.stringify(written.value) !== JSON.stringify(value)) throw new CoreError('INVALID_POSTCONDITION', 'The native text differs after serialization.', {}, 5);
    return {source: document.source, result: {index, path, type: field.type, before: field.value, value}};
}

export async function textFileOperation(root, options) {
    const target = eventTarget(root, options.target);
    const snapshot = await readSnapshot(target.file, root);
    if(options.expectedHash!==undefined){
        if(!/^[a-f0-9]{64}$/.test(options.expectedHash))throw new CoreError('INVALID_USAGE','Expected hash must be a SHA-256 hex digest.');
        if(options.expectedHash!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Text file changed since it was read.',{fileHash:snapshot.hash},4);
    }
    const change = textOperation(snapshot.content.toString('utf8'), target, options);
    if(options.acceptedType&&change.result.type!==options.acceptedType)reject('This namespace authors only the text of an existing Show Text101.');
    const result = {file: relative(root, target.file), ...(options.namespace==='ani-message'?{fileHash:snapshot.hash}:{}), ...change.result,...(options.inspect?{grammar:options.inspect(change.result.value)}:{})};
    if (options.operation === 'set') {
        if (options.dryRun) Object.assign(result, {dryRun: true, written: false, beforeHash: snapshot.hash, proposedHash: hash(change.source)});
        else Object.assign(result, await writeSnapshot(snapshot, change.source), {written: true});
    }
    return {operation: `${options.namespace??'message'} text ${options.operation}`, target: options.target, result};
}
