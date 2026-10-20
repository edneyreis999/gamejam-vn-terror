import {relative} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {independentRouteSupported} from '../../src/events-move-core/route-grammar.mjs';
import {eventTarget, targetList, valueAt} from './event-target.mjs';
import {eventUnits, unitAt} from './event-list.mjs';
import {parseJsonDocument, spliceJsonArray} from './json-document.mjs';
import {readSnapshot, writeSnapshot, hash} from './files.mjs';

export function routeOperation(source, target, {operation, index, value, ownerIndex}) {
    const document = parseJsonDocument(source), eventList = targetList(document, target);
    let path, owner, unit;
    if (ownerIndex === undefined) {
        if (target.type !== 'map') throw new CoreError('INVALID_TARGET', 'Autonomous routes belong to map event pages.');
        path = [...target.path.slice(0, -1), 'moveRoute'];
    } else {
        unit = unitAt(eventUnits(eventList), ownerIndex, 'update'); owner = eventList[ownerIndex];
        if (owner.code !== 205 || owner.parameters.length !== 2) throw new CoreError('INVALID_TARGET', 'Select a native Set Movement Route command (205).');
        path = [...target.path, ownerIndex, 'parameters', 1];
    }
    const route = valueAt(document.value, path), list = route.list;
    if (!Array.isArray(list) || !list.length || list.at(-1)?.code !== 0 ||
        list.some((step, i) => !Number.isInteger(step?.code) || step.code < 0 || step.code > 45 || i < list.length - 1 && step.code === 0 ||
            step.parameters !== undefined && !Array.isArray(step.parameters) || step.code === 45 && typeof step.parameters?.[0] !== 'string')) {
        throw new CoreError('INVALID_MOVE_ROUTE', 'Preserve a valid native movement route and its final code 0.');
    }
    if (owner) {
        const annotations = eventList.slice(ownerIndex + 1, unit.endIndex).map(command => command.parameters[0]);
        if (JSON.stringify(annotations) !== JSON.stringify(list.slice(0, -1))) throw new CoreError('INVALID_MOVE_ROUTE', 'Route annotations (505) differ from their 205 owner. Reopen the route in the editor.');
    }
    if (operation === 'list') return {source, result: {route, instructions: list.map((step, index) => ({index, ...step}))}};
    if (!Number.isSafeInteger(index) || index < 0 || index >= list.length || operation !== 'insert' && index === list.length - 1) throw new CoreError('INVALID_INDEX', 'Select an existing route instruction; the terminal can only receive an insertion before it.');
    if (operation !== 'remove' && !independentRouteSupported(value)) {
        throw new CoreError('INVALID_ROUTE_INSTRUCTION', 'Use a supported Events movement instruction; consult events-move --help.');
    }
    const count = operation === 'insert' ? 0 : 1, items = operation === 'remove' ? [] : [{code: 45, parameters: [value]}];
    const updated = [...list.slice(0, index), ...items, ...list.slice(index + count)];
    let written;
    if (owner) {
        const changed = {...owner, parameters: [owner.parameters[0], {...route, list: updated}]};
        const block = [changed, ...updated.slice(0, -1).map(step => ({code: 505, indent: owner.indent, parameters: [step]}))];
        written = spliceJsonArray(document, target.path, ownerIndex, unit.endIndex - ownerIndex, block);
        eventUnits(targetList(written, target));
    } else written = spliceJsonArray(document, [...path, 'list'], index, count, items);
    return {source: written.source, result: {index, before: list.slice(index, index + count), after: items, route: {...route, list: updated}}};
}

export async function routeFileOperation(root, options) {
    const match = /^(.*?)(?:\/command:(0|[1-9]\d*))?\/route$/.exec(options.target ?? '');
    if (!match) throw new CoreError('INVALID_TARGET', 'Use map:M/event:E/page:P/route or an event selector followed by /command:I/route.');
    const target = eventTarget(root, match[1]), snapshot = await readSnapshot(target.file, root);
    if (options.expectedHash !== undefined && options.expectedHash !== snapshot.hash) throw new CoreError('FILE_CONFLICT', 'Read the route before retrying.', {fileHash: snapshot.hash}, 4);
    const change = routeOperation(snapshot.content.toString('utf8'), target, {...options, ownerIndex: match[2] === undefined ? undefined : Number(match[2])});
    const result = {file: relative(root, target.file), fileHash: snapshot.hash, ...change.result};
    if (options.operation !== 'list') Object.assign(result, options.dryRun ? {written: false, dryRun: true, proposedHash: hash(change.source)} : {...await writeSnapshot(snapshot, change.source), written: true});
    return {operation: 'events-move routes ' + options.operation, target: options.target, result};
}
