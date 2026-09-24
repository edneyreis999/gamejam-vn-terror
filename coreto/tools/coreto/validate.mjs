import {resolvePluginConfiguration} from '../../src/shared/plugin-configuration.mjs';
import {sourceFacts} from './configuration-authoring.mjs';
import { join } from 'node:path';
import { CoreError, decodeValue } from '../../src/core-engine/parameters.mjs';
import { readSnapshot } from './files.mjs';
import { parsePluginsFile } from './plugins-file.mjs';
import { validateAuthoredCode } from './javascript.mjs';
import { commandOperation, validateReferences } from './commands.mjs';
import { eventTarget } from './event-target.mjs';
import { tagOperation } from './tags.mjs';
import { tagTarget } from './tag-target.mjs';

// Every diagnostic refers to the same captured input; a final reread detects drift.
export async function validateProject(root, catalog) {
    const snapshots = new Map();
    const diagnostics = [];
    const counts = {parameters: 0, eventLists: 0, commands: 0, tags: 0};
    const report = (code, message, target, details = {}, severity = 'error') => diagnostics.push({severity, code, message, target, ...details});
    async function inspect(target, action) {
        try { return await action(); }
        catch (error) {
            if (!(error instanceof CoreError) && !error.code && !(error instanceof SyntaxError)) throw error;
            report(error.code ?? 'INVALID_JSON', error.message, target, error.details);
        }
    }
    async function source(file) {
        if (!snapshots.has(file)) snapshots.set(file, await readSnapshot(join(root, file), root));
        return snapshots.get(file).content.toString('utf8');
    }
    async function database(name) { return JSON.parse(await source(`data/${name}`)); }
    function records(data, target) {
        if (!Array.isArray(data)) throw new CoreError('INVALID_DATABASE', 'Expected a native database array.', {field: target});
        return data.flatMap((record, id) => {
            if (!record) return [];
            if (!id || record.id !== id) throw new CoreError('INVALID_DATABASE_ID', 'Record ID must match its native slot.', {field: `${target}/${id}`});
            return [record];
        });
    }
    async function parameterReferences(field, value, path) {
        if (field.availability && !['supported', 'requires-local-service'].includes(field.availability)) {
            report('CAPABILITY_UNAVAILABLE', field.reason ?? 'This parameter has no effect in the browser.', path,
                {availability: field.availability, received: value}, 'warning');
        }
        if (field.type === 'struct') {
            for (const item of field.fields) await parameterReferences(item, value[item.key], `${path}/${item.key}`);
        } else if (field.type === 'array') {
            for (const [index, item] of value.entries()) await parameterReferences(field.items, item, `${path}/${index}`);
        } else if (field.editorType === 'common_event' && value !== 0) {
            const records = await database('CommonEvents.json');
            if (!Number.isSafeInteger(value) || records[value]?.id !== value) throw new CoreError('INVALID_REFERENCE', `No Common Event exists with ID ${value}.`, {field: path});
        }
    }
    let plugins = [];
    let messageProvider, configuration;
    await inspect('js/plugins.js', async () => {
        plugins = parsePluginsFile(await source('js/plugins.js')).plugins;
        for (const name of [catalog.pluginId, catalog.compatibility.originalCoreId, catalog.compatibility.messagePluginId, 'Coreto_1_MessageCore']) {
            if (plugins.filter(plugin => plugin.name === name).length > 1) report('DUPLICATE_PLUGIN', `Duplicate provider: ${name}.`, 'js/plugins.js');
        }
        const core = plugins.findIndex(plugin => plugin.name === catalog.pluginId && plugin.status);
        const messages = plugins.filter(plugin => [catalog.compatibility.messagePluginId, 'Coreto_1_MessageCore'].includes(plugin.name) && plugin.status);
        if (messages.length > 1) report('MESSAGE_PROVIDER_CONFLICT', 'Keep one Message provider active.', 'js/plugins.js');
        messageProvider = messages[0];
        const message = plugins.indexOf(messageProvider);
        if (core < 0) report('CORE_NOT_ACTIVE', 'Activate Coreto_0_CoreEngine.', 'js/plugins.js');
        if (plugins.some(plugin => plugin.name === catalog.compatibility.originalCoreId && plugin.status)) report('CORE_PROVIDER_CONFLICT', 'Disable the original Core Engine.', 'js/plugins.js');
        if (message < 0 || message < core) report('MESSAGE_LOAD_ORDER', 'Activate a supported Message Core after Coreto.', 'js/plugins.js');
        if (message >= 0 && !plugins[message].description.includes('[MessageCore]')) report('MESSAGE_DESCRIPTION', 'Preserve the [MessageCore] description marker.', 'js/plugins.js');
        if (core >= 0) configuration=resolvePluginConfiguration(catalog,plugins);
        if (core >= 0) for (const field of catalog.parameters) {
            await inspect(`parameters/${field.key}`, async () => {
                const value = decodeValue(field, field.key==='CoretoConfigSource'?configuration.configuredSource:configuration.rawParameters[field.storageKey], `/${field.key}`);
                validateAuthoredCode(field, value, `/${field.key}`);
                await parameterReferences(field, value, `/${field.key}`);
                counts.parameters++;
            });
        }
    });
    await inspect('js/rmmz_core.js', async () => {
        const version = /Utils\.RPGMAKER_VERSION\s*=\s*["']([^"']+)/.exec(await source('js/rmmz_core.js'))?.[1];
        if (version !== '1.10.0') report('ENGINE_VERSION', 'This build requires RPG Maker MZ 1.10.0.', 'js/rmmz_core.js', {received: version ?? null});
    });
    await inspect(`js/plugins/${catalog.pluginId}.js`, () => source(`js/plugins/${catalog.pluginId}.js`));
    if (messageProvider) await inspect(`js/plugins/${messageProvider.name}.js`, async () => {
        const file = `js/plugins/${messageProvider.name}.js`;
        await source(file);
        if (messageProvider.name === catalog.compatibility.messagePluginId && snapshots.get(file).hash !== catalog.compatibility.messageSha256) {
            report('MESSAGE_SOURCE_CHANGED', 'The Message file differs from the approved original 1.54.', file);
        }
    });
    async function tags(selector) {
        await inspect(selector, async () => {
            const target = tagTarget(root, selector);
            const file = target.file.slice(root.length + 1);
            const text = await source(file);
            const listed = tagOperation(text, catalog, target, {operation: 'list', selector}).result;
            for (const item of listed.occurrences) {
                counts.tags++;
                if (item.availability !== 'supported') {
                    report('CAPABILITY_UNAVAILABLE', item.reason, item.target, {tag: item.tag, availability: item.availability});
                    continue;
                }
                await inspect(item.target, () => tagOperation(text, catalog, tagTarget(root, item.target), {
                    operation: 'set', selector: item.target, tag: item.tag, occurrence: item.occurrence, value: item.value
                }));
            }
        });
    }
    async function events(selector) {
        await inspect(selector, async () => {
            const target = eventTarget(root, selector);
            const text = await source(target.file.slice(root.length + 1));
            const {units} = commandOperation(text, catalog, target, {operation: 'list'}).result;
            counts.eventLists++;
            for (const unit of units.filter(unit => unit.code === 357)) {
                if (unit.pluginId === catalog.compatibility.originalCoreId) report('INACTIVE_COMMAND_PROVIDER', 'This event still targets the disabled original Core. Reauthor it with the published Coreto command.', `${selector}/command:${unit.index}`);
                if (unit.pluginId !== catalog.pluginId) continue;
                counts.commands++;
                await inspect(`${selector}/command:${unit.index}`, async () => {
                    const change = commandOperation(text, catalog, target, {operation: 'update', command: unit.command, index: unit.index});
                    const descriptor = catalog.commands.find(command => command.key === unit.command);
                    await validateReferences(root, descriptor, change.result.after[0].parameters[3], database);
                });
            }
        });
    }
    for (const name of ['Actors', 'Classes', 'Enemies', 'Weapons', 'Armors', 'States', 'Tilesets', 'Animations', 'Troops', 'CommonEvents', 'MapInfos']) {
        await inspect(`data/${name}.json`, async () => {
            for (const record of records(await database(`${name}.json`), name)) {
                const id = record.id;
                if (name === 'CommonEvents') await events(`common-event:${id}`);
                else if (name === 'Troops') {
                    await tags(`troop:${id}`);
                    if (!Array.isArray(record.pages)) throw new CoreError('INVALID_EVENT_LIST', 'Troop pages must be an array.');
                    for (let page = 1; page <= record.pages.length; page++) await events(`troop:${id}/page:${page}`);
                } else if (name === 'MapInfos') {
                    await inspect(`map:${id}`, async () => {
                        const map = await database(`Map${String(id).padStart(3, '0')}.json`);
                        await tags(`map:${id}`);
                        for (const event of records(map.events, `map:${id}/events`)) {
                            if (!Array.isArray(event.pages)) throw new CoreError('INVALID_EVENT_LIST', 'Map event pages must be an array.');
                            for (let page = 1; page <= event.pages.length; page++) await events(`map:${id}/event:${event.id}/page:${page}`);
                        }
                    });
                } else if (name === 'Animations') await tags(`animation:${id}`);
                else {
                    await tags(`${name.toLowerCase()}:${id}`);
                    if (name === 'Classes') {
                        if (!Array.isArray(record.learnings)) throw new CoreError('INVALID_DATABASE', 'Class learnings must be an array.');
                        for (let learning = 0; learning < record.learnings.length; learning++) await tags(`class:${id}/learning:${learning}`);
                    }
                }
            }
        });
    }
    for (const [file, snapshot] of snapshots) await inspect(file, async () => {
        if ((await readSnapshot(join(root, file), root)).hash !== snapshot.hash) report('FILE_CONFLICT', 'File changed during validation. Run validate again.', file);
    });
    return {valid: !diagnostics.some(item => item.severity === 'error'), written: false, diagnostics, counts, configuration:configuration?sourceFacts(configuration):null,
        inputHashes: Object.fromEntries([...snapshots].map(([file, snapshot]) => [file, snapshot.hash])),
        limits: 'Static Core authoring and installation only; Coreto bundle/source consistency is not checked. Authored JavaScript is compiled, never executed. Unknown external tags/commands and dynamic runtime references are not validated; browser and human QA remain separate.'};
}
