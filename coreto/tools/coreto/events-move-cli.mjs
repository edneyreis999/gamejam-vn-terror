import catalog from '../../src/events-move-core/public-api.json' with {type: 'json'};
import {complementHelp, executeComplementCli} from './complement-cli.mjs';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {independentRoutePatterns} from '../../src/events-move-core/route-grammar.mjs';
import {validateProject} from './validate.mjs';
import {eventsNameOperation} from './events-move-names.mjs';
import {routeFileOperation} from './events-move-routes.mjs';
export const eventsMoveHelp = () => {
    const help = complementHelp(catalog);
    return {...help, tags: 'tags list|set|remove --target map:M, map:M/event:E, map:M/event:E/page:P/comment:I, common-event:E/comment:I or troop:T/page:P/comment:I; use api list and api describe for tag IDs, values and contexts.', implemented: {...help.implemented, routes: ['list', 'insert', 'update', 'remove'], names: ['get', 'set'], validate: []},
        names: 'names get|set --target system:switch:ID or system:variable:ID. Set accepts a JSON string through --value or --input and requires --expected-hash. Native System.json names; authored JS is compiled without execution.',
        routes: 'routes list|insert|update|remove --target map:M/event:E/page:P/route or <event-selector>/command:I/route; --before I for insert, --index I for update/remove; --value JSON string; mutations require --expected-hash.',
        compatibleOriginalConsumers: catalog.dependencies.consumers, routeGrammar: independentRoutePatterns, routeEnvironment: 'Custom routes execute in Playtest. Editor Preview does not execute this grammar.', limits: catalog.limits};
};
export async function executeEventsMoveCli(positionals, values, locateProject) {
    if (positionals[1] === 'names') {
        const operation = positionals[2], write = operation === 'set';
        const allowed = ['project', 'json', 'target', ...(write ? ['value', 'input', 'expected-hash', 'dry-run'] : [])];
        if (positionals.length !== 3 || !['get', 'set'].includes(operation) || Object.entries(values).some(([key, value]) => value !== false && !allowed.includes(key))) throw new CoreError('INVALID_USAGE', 'Use events-move names get|set --target system:switch:ID|system:variable:ID.');
        if (write && !values['expected-hash']) throw new CoreError('INVALID_USAGE', 'Read names get, then supply --expected-hash.');
        return eventsNameOperation(await locateProject(values.project), {operation, target: values.target, value: write ? await readJsonValue(values) : undefined,
            expectedHash: values['expected-hash'], dryRun: values['dry-run']});
    }
    if (positionals[1] === 'validate') {
        if (positionals.length !== 2 || Object.entries(values).some(([key, value]) => value !== false && !['project', 'json'].includes(key))) throw new CoreError('INVALID_USAGE', 'Use events-move validate --project <game> --json without editing arguments.');
        const result = await validateProject(await locateProject(values.project), catalog);
        if (!result.valid) throw new CoreError('VALIDATION_FAILED', 'Events validation found errors. Correct the listed targets.', result);
        return {operation: 'events-move validate', result};
    }
    if (positionals[1] !== 'routes') return executeComplementCli(catalog, positionals, values, locateProject);
    const operation = positionals[2], mutation = operation !== 'list';
    const fail = message => {throw new CoreError('INVALID_USAGE', message);};
    if (positionals.length !== 3 || !['list', 'insert', 'update', 'remove'].includes(operation)) fail('Use events-move routes list|insert|update|remove.');
    const allowed = ['project', 'json', 'target', ...(mutation ? ['expected-hash', 'dry-run', operation === 'insert' ? 'before' : 'index'] : []),
        ...(['insert', 'update'].includes(operation) ? ['value', 'input'] : [])];
    for (const [key, value] of Object.entries(values)) if (value !== false && !allowed.includes(key)) fail('Unsupported --' + key + ' for routes ' + operation + '.');
    if (mutation && !values['expected-hash']) fail('Read routes list, then supply --expected-hash.');
    const rawIndex = values[operation === 'insert' ? 'before' : 'index'];
    if (mutation && !/^(0|[1-9]\d*)$/.test(rawIndex ?? '')) fail('Use a nonnegative native instruction index.');
    const value = ['insert', 'update'].includes(operation) ? await readJsonValue(values) : undefined;
    return routeFileOperation(await locateProject(values.project), {operation, target: values.target, index: mutation ? Number(rawIndex) : undefined,
        value, expectedHash: values['expected-hash'], dryRun: values['dry-run']});
}
async function readJsonValue(values) {
    if (values.input !== undefined && values.value !== undefined) throw new CoreError('INVALID_USAGE', 'Choose --value or --input.');
    const raw = values.input !== undefined ? await readFile(resolve(values.input), 'utf8') : values.value;
    if (raw === undefined) throw new CoreError('INVALID_USAGE', 'Supply --value or --input containing JSON.');
    try { return JSON.parse(raw); } catch { throw new CoreError('INVALID_JSON', 'Supply valid JSON.'); }
}
