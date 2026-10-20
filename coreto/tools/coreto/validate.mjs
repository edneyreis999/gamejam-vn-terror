import {validatePictureReference} from './picture-reference.mjs';
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
    const mainMenu = catalog.namespace === 'main-menu';
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
        if (field.availability && !['supported', 'requires-local-service'].includes(field.availability) && !(mainMenu && field.availability === 'editorial')) {
            report('CAPABILITY_UNAVAILABLE', field.reason ?? 'This parameter has no effect in the browser.', path,
                {availability: field.availability, received: value}, 'warning');
        }
        if (mainMenu && ['idleFilenameIcon', 'clickFilenameIcon'].includes(field.key) && value) await source('icon/' + value);
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
    const eventTemplates = new Map();
    async function templateReference(mapId, eventId, target) {
        const infos = await database('MapInfos.json');
        if (!infos[mapId] || infos[mapId].id !== mapId) {
            report('INVALID_REFERENCE', `No map ${mapId} exists for this template.`, target);
            return;
        }
        const map = await database(`Map${String(mapId).padStart(3, '0')}.json`);
        if (eventId !== undefined && map.events[eventId]?.id !== eventId) report('INVALID_REFERENCE', `No event ${eventId} exists on map ${mapId}.`, target);
    }
    await inspect('js/plugins.js', async () => {
        plugins = parsePluginsFile(await source('js/plugins.js')).plugins;
        let core;
        if (catalog.namespace === 'events-move') {
            const providers = [catalog.pluginId, catalog.reference.pluginId, 'Coreto_0_CoreEngine', 'VisuMZ_0_CoreEngine'];
            for (const name of providers) if (plugins.filter(plugin => plugin.name === name).length > 1) report('DUPLICATE_PLUGIN', `Duplicate provider: ${name}.`, 'js/plugins.js');
            core = plugins.findIndex(plugin => plugin.name === catalog.pluginId && plugin.status);
            const dependency = plugins.findIndex(plugin => plugin.name === 'Coreto_0_CoreEngine' && plugin.status);
            if (core < 0) report('EVENTS_NOT_ACTIVE', 'Activate Coreto_1_EventsMoveCore.', 'js/plugins.js');
            for (const [index, consumer] of plugins.entries()) {
                if (!consumer.status || !catalog.orderBefore.includes(consumer.name)) continue;
                if (core < 0) report('CONSUMER_DEPENDENCY', `${consumer.name} requires the Events & Movement capability. Activate Coreto_1_EventsMoveCore before it; keep the original Events provider disabled.`, 'js/plugins.js');
                else if (index < core) report('CONSUMER_LOAD_ORDER', `Place ${consumer.name} after Coreto_1_EventsMoveCore.`, 'js/plugins.js');
                if (!Object.prototype.hasOwnProperty.call(catalog.dependencies.consumers, consumer.name)) report('CAPABILITY_UNAVAILABLE', `${consumer.name} is not supported by this Events build.`, 'js/plugins.js');
                else await inspect(`js/plugins/${consumer.name}.js`, async () => {
                    await source(`js/plugins/${consumer.name}.js`);
                    const version = catalog.dependencies.consumers[consumer.name];
                    if (!consumer.description.includes(`[Version ${version}]`)) report('CONSUMER_VERSION', `Use ${consumer.name} ${version} and preserve its native description.`, 'js/plugins.js');
                });
            }
            const doodadEditor = plugins.findIndex(plugin => plugin.status && plugin.name === 'VisuMZ_3_DoodadsEditor');
            const doodadSystem = plugins.findIndex(plugin => plugin.status && plugin.name === 'VisuMZ_2_DoodadsSystem');
            if (doodadEditor >= 0 && (doodadSystem < 0 || doodadSystem > doodadEditor)) report('CONSUMER_DEPENDENCY', 'VisuMZ_3_DoodadsEditor requires VisuMZ_2_DoodadsSystem before it. Both follow Coreto_1_EventsMoveCore.', 'js/plugins.js');
            if (dependency < 0 || dependency > core) report('CORE_LOAD_ORDER', 'Activate Coreto_0_CoreEngine before Events.', 'js/plugins.js');
            if (plugins.some(plugin => plugin.status && [catalog.reference.pluginId, 'VisuMZ_0_CoreEngine'].includes(plugin.name))) report('PROVIDER_CONFLICT', 'Disable the original Core and Events providers.', 'js/plugins.js');
        } else if (mainMenu) {
            const baseIds = catalog.dependencies.required[0];
            for (const name of [catalog.pluginId, catalog.reference.pluginId, ...baseIds]) {
                if (plugins.filter(plugin => plugin.name === name).length > 1) report('DUPLICATE_PLUGIN', `Duplicate provider: ${name}.`, 'js/plugins.js');
            }
            core = plugins.findIndex(plugin => plugin.name === catalog.pluginId && plugin.status);
            if (core < 0) report('MAIN_MENU_NOT_ACTIVE', `Activate ${catalog.pluginId}.`, 'js/plugins.js');
            if (plugins.some(plugin => plugin.name === catalog.reference.pluginId && plugin.status)) report('PROVIDER_CONFLICT', 'Disable the original MainMenu provider.', 'js/plugins.js');
            const bases = plugins.filter(plugin => plugin.status && baseIds.includes(plugin.name));
            if (bases.length !== 1) report('CORE_PROVIDER_COUNT', 'Activate exactly one supported Core Engine provider.', 'js/plugins.js');
            for (const base of bases) {
                if (plugins.indexOf(base) > core) report('CORE_LOAD_ORDER', 'Place Core Engine before MainMenu.', 'js/plugins.js');
                await source(`js/plugins/${base.name}.js`);
            }
            for (const [index, consumer] of plugins.entries()) {
                if (!consumer.status || !Object.hasOwn(catalog.dependencies.consumers, consumer.name)) continue;
                if (index < core) report('CONSUMER_LOAD_ORDER', `Place ${consumer.name} after MainMenu.`, 'js/plugins.js');
                if (!consumer.description.includes(`[Version ${catalog.dependencies.consumers[consumer.name]}]`)) report('CONSUMER_VERSION', `Use ${consumer.name} ${catalog.dependencies.consumers[consumer.name]}.`, 'js/plugins.js');
                await source(`js/plugins/${consumer.name}.js`);
            }
        } else {
            for (const name of [catalog.pluginId, catalog.compatibility.originalCoreId, catalog.compatibility.messagePluginId, 'Coreto_1_MessageCore']) {
                if (plugins.filter(plugin => plugin.name === name).length > 1) report('DUPLICATE_PLUGIN', `Duplicate provider: ${name}.`, 'js/plugins.js');
            }
            core = plugins.findIndex(plugin => plugin.name === catalog.pluginId && plugin.status);
            const messages = plugins.filter(plugin => [catalog.compatibility.messagePluginId, 'Coreto_1_MessageCore'].includes(plugin.name) && plugin.status);
            if (messages.length > 1) report('MESSAGE_PROVIDER_CONFLICT', 'Keep one Message provider active.', 'js/plugins.js');
            messageProvider = messages[0];
            const message = plugins.indexOf(messageProvider);
            if (core < 0) report('CORE_NOT_ACTIVE', 'Activate Coreto_0_CoreEngine.', 'js/plugins.js');
            if (plugins.some(plugin => plugin.name === catalog.compatibility.originalCoreId && plugin.status)) report('CORE_PROVIDER_CONFLICT', 'Disable the original Core Engine.', 'js/plugins.js');
            if (message < 0 || message < core) report('MESSAGE_LOAD_ORDER', 'Activate a supported Message Core after Coreto.', 'js/plugins.js');
            if (message >= 0 && !plugins[message].description.includes('[MessageCore]')) report('MESSAGE_DESCRIPTION', 'Preserve the [MessageCore] description marker.', 'js/plugins.js');
        }
        if (core >= 0) configuration=resolvePluginConfiguration(catalog,plugins);
        if (core >= 0) for (const field of catalog.parameters) {
            await inspect(`parameters/${field.key}`, async () => {
                const value = decodeValue(field, field.key==='CoretoConfigSource'?configuration.configuredSource:configuration.rawParameters[field.storageKey], `/${field.key}`);
                validateAuthoredCode(field, value, `/${field.key}`);
                await parameterReferences(field, value, `/${field.key}`);
                counts.parameters++;
            });
        }
        if (configuration && catalog.namespace === 'events-move') await inspect('parameters/Template', async () => {
            const field = catalog.parameters.find(field => field.key === 'Template');
            const template = decodeValue(field, configuration.rawParameters[field.storageKey], '/Template');
            for (const mapId of template.PreloadMaps) await inspect('parameters/Template/PreloadMaps', () => templateReference(mapId, undefined, 'parameters/Template/PreloadMaps'));
            for (const [index, entry] of template.List.entries()) {
                const target = `parameters/Template/List/${index}`, name = entry.Name.toUpperCase().trim();
                if (eventTemplates.has(name)) report('DUPLICATE_TEMPLATE', `Template name ${entry.Name} duplicates an earlier entry.`, target);
                eventTemplates.set(name, entry);
                await inspect(target, () => templateReference(entry.MapID, entry.EventID, target));
            }
        });
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
            report('MESSAGE_SOURCE_CHANGED', `The Message file differs from the approved original ${catalog.compatibility.messageVersion}.`, file);
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
                if (catalog.namespace === 'events-move' && item.tag === 'attach-animation-delay' && !plugins.some(plugin => plugin.status && plugin.name === 'VisuMZ_4_AnimatedPictures')) {
                    report('CAPABILITY_UNAVAILABLE', 'This animation tag requires VisuMZ_4_AnimatedPictures 1.05 after Coreto_1_EventsMoveCore.', item.target, {tag:item.tag});
                }
                if (item.availability !== 'supported') {
                    report('CAPABILITY_UNAVAILABLE', item.reason, item.target, {tag: item.tag, availability: item.availability});
                    continue;
                }
                await inspect(item.target, () => tagOperation(text, catalog, tagTarget(root, item.target), {
                    operation: 'set', selector: item.target, tag: item.tag, occurrence: item.occurrence, value: item.value
                }));
                if (mainMenu && item.tag === 'menu-image') await inspect(item.target, async () => {
                    const filename = /<MENU (?:IMAGE|PORTRAIT): (.*)>/i.exec(item.value)?.[1];
                    if (filename) await validatePictureReference(root, filename, item.target, source);
                });
                if (catalog.namespace === 'events-move' && item.tag === 'copy-event') await inspect(item.target, async () => {
                    const numeric = /<COPY EVENT: (?:MAP )?(\d+), (?:EVENT )?(\d+)>/i.exec(item.value);
                    if (numeric) await templateReference(Number(numeric[1]) || Number(/^map:(\d+)/.exec(selector)[1]), Number(numeric[2]), item.target);
                    else {
                        const name = /<COPY EVENT: (.*?)>/i.exec(item.value)[1].toUpperCase().trim();
                        if (!eventTemplates.has(name)) report('INVALID_REFERENCE', `No named template ${name} exists.`, item.target);
                    }
                });
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
                if (!mainMenu && catalog.namespace !== 'events-move' && unit.pluginId === catalog.compatibility.originalCoreId) report('INACTIVE_COMMAND_PROVIDER', 'This event still targets the disabled original Core. Reauthor it with the published Coreto command.', `${selector}/command:${unit.index}`);
                if (unit.pluginId !== catalog.pluginId && !(['events-move', 'main-menu'].includes(catalog.namespace) && unit.pluginId === catalog.reference.pluginId)) continue;
                if (catalog.namespace === 'events-move' && unit.command.startsWith('MsgPopup') && !plugins.some(plugin => plugin.status && ['Coreto_1_MessageCore', 'VisuMZ_1_MessageCore'].includes(plugin.name))) report('CAPABILITY_UNAVAILABLE', 'Event popups require one active MessageCore provider after Events & Movement.', `${selector}/command:${unit.index}`);
                counts.commands++;
                await inspect(`${selector}/command:${unit.index}`, async () => {
                    const change = commandOperation(text, catalog, target, {operation: 'update', command: unit.command, index: unit.index});
                    const descriptor = catalog.commands.find(command => command.key === unit.command);
                    await validateReferences(root, descriptor, change.result.after[0].parameters[3], database);
                    if (mainMenu) for (const field of descriptor.args.filter(field => field.directory === 'img/pictures/')) {
                        const filename = decodeValue(field, change.result.after[0].parameters[3][field.storageKey], field.key);
                        if (filename) await validatePictureReference(root, filename, `${selector}/command:${unit.index}/${field.key}`, source);
                    }
                });
            }
        });
    }
    for (const name of ['Actors', 'Classes', 'Enemies', 'Weapons', 'Armors', 'States', 'Tilesets', 'Animations', 'Troops', 'CommonEvents', 'MapInfos']) {
        await inspect(`data/${name}.json`, async () => {
            for (const record of records(await database(`${name}.json`), name)) {
                const id = record.id;
                if (name === 'CommonEvents') {
                    await events(`common-event:${id}`);
                    if (catalog.tags.some(tag => tag.targets.includes('common-event-comment'))) {
                        for (const [index, command] of record.list.entries()) if (command.code === 108) await tags(`common-event:${id}/comment:${index}`);
                    }
                }
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
                            if (catalog.tags.some(tag => tag.targets.includes('event-note'))) await tags(`map:${id}/event:${event.id}`);
                            for (let page = 1; page <= event.pages.length; page++) {
                                const selector = `map:${id}/event:${event.id}/page:${page}`;
                                await events(selector);
                                if (catalog.tags.some(tag => tag.targets.includes('event-comment'))) {
                                    for (const [index, command] of event.pages[page - 1].list.entries()) {
                                        if (command.code === 108) await tags(`${selector}/comment:${index}`);
                                    }
                                }
                            }
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
        limits: 'Static authoring and installation only; Coreto bundle/source consistency is not checked. Authored JavaScript is compiled, never executed. Unknown external tags/commands and dynamic runtime references are not validated; browser and human QA remain separate.'};
}
