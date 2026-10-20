import {CoreError} from '../../src/core-engine/parameters.mjs';
import {readSnapshot, writeSnapshot, hash} from './files.mjs';
import {parseJsonDocument, jsonSpan} from './json-document.mjs';
import {tagTarget} from './tag-target.mjs';
import {validateAuthoredCode} from './javascript.mjs';

export function eventsNameFacts(name) {
    const reference = /\(\((.*)\)\)/.exec(name) || /（（(.*)））/.exec(name);
    return {self: /<SELF>/i.test(name), map: /<MAP>/i.test(name), javascript: /<JS>/i.test(name), global: /<GLOBAL>/i.test(name),
        reference: reference ? reference[1].toUpperCase().trim() : null};
}
export async function eventsNameOperation(root, {operation, target: selector, value, expectedHash, dryRun}) {
    const target = tagTarget(root, selector);
    if (!['system-switch', 'system-variable'].includes(target.type)) throw new CoreError('INVALID_TARGET', 'Use system:switch:ID or system:variable:ID.');
    const snapshot = await readSnapshot(target.file, root), document = parseJsonDocument(snapshot.content.toString('utf8'));
    const names = document.value[target.path[0]], before = names?.[target.id];
    if (typeof before !== 'string') throw new CoreError('TARGET_NOT_FOUND', 'The native System name does not exist.', {target: selector}, 3);
    if (operation === 'get') return {operation: 'events-move names get', target: selector, result: {value: before, hash: snapshot.hash, facts: eventsNameFacts(before)}};
    if (snapshot.hash !== expectedHash) throw new CoreError('FILE_CONFLICT', 'Read the current name and use its hash before editing.', {target: selector}, 4);
    if (typeof value !== 'string') throw new CoreError('INVALID_VALUE', 'A native switch or variable name must be a JSON string.');
    const facts = eventsNameFacts(value);
    if ([facts.self, facts.map, facts.javascript].filter(Boolean).length > 1 || facts.global && (facts.self || facts.javascript)) throw new CoreError('INCOMPATIBLE_TAGS', 'Use one of Self, Map or JS; Global cannot coexist with Self or JS.');
    if (facts.javascript) {
        const expression = /<JS>\s*([\s\S]*?)\s*<\/JS>/i.exec(value);
        if (!expression) throw new CoreError('INVALID_JAVASCRIPT', 'Close the JS expression with </JS>.');
        validateAuthoredCode({javascript: 'expression'}, expression[1], selector);
    }
    if (facts.reference && names.some((name, id) => id !== target.id && eventsNameFacts(name).reference === facts.reference)) throw new CoreError('DUPLICATE_REFERENCE', 'Another native name already owns this case-insensitive reference.', {reference: facts.reference}, 4);
    const span = jsonSpan(document, target.path), source = document.source.slice(0, span.start) + JSON.stringify(value) + document.source.slice(span.end);
    const result = {before, after: value, beforeHash: snapshot.hash, afterHash: hash(source), facts, written: false};
    if (!dryRun && value !== before) Object.assign(result, await writeSnapshot(snapshot, source), {written: true});
    return {operation: 'events-move names set', target: selector, result};
}
