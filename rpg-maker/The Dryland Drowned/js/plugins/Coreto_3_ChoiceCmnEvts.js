/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 3] [Version 0.1.0] [ChoiceCmnEvts]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter VisuMZ_2_PictureChoices
 * @orderBefore Coreto_4_AttachedPictures
 * @orderBefore VisuMZ_4_AttachedPictures
 * @orderBefore Coreto_4_EventTitleScene
 * @orderBefore VisuMZ_4_EventTitleScene
 * @orderBefore Coreto_4_MessageVisibility
 * @orderBefore VisuMZ_4_MessageVisibility
 * @help
 * Requires one supported Message Core provider before this plugin.
 * Use <Choice Common Event: 1> in Show Choices to run that event on selection.
 * Disable VisuMZ_3_ChoiceCmnEvts before activating this provider.
 * CoretoConfigSource selects inherit or own configuration. There are no functional parameters or plugin commands.
 * See coreto/README.md and the choice-common-events CLI namespace.
 *
 * @param CoretoConfigSource
 * @text Configuration source
 * @type select
 * @desc inherit reads the original entry when present; own reads this entry. Switching does not copy values.
 * @default inherit
 * @option inherit
 * @value inherit
 * @option own
 * @value own
 *
 */



(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_3_ChoiceCmnEvts","namespace":"choice-common-events","version":"0.1.0","reference":{"pluginId":"VisuMZ_3_ChoiceCmnEvts","version":"1.02"},"dependencies":{"required":[["Coreto_1_MessageCore","VisuMZ_1_MessageCore"]],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.57"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_MessageCore","VisuMZ_1_MessageCore","Coreto_2_PictureChoices","VisuMZ_2_PictureChoices"],"orderBefore":["Coreto_4_AttachedPictures","VisuMZ_4_AttachedPictures","Coreto_4_EventTitleScene","VisuMZ_4_EventTitleScene","Coreto_4_MessageVisibility","VisuMZ_4_MessageVisibility"],"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"}],"commands":[],"commandAliases":[],"tags":[{"id":"CC-T-SELECT","key":"choice-common-event","label":"Choice Common Event","description":"Start the Common Event whose database ID replaces {value} when the cursor highlights this native Show Choices option, including the initial highlight. Put the tag in the choice label in a map event. This happens before confirmation; staying on the same option does not retrigger it.","type":"number","min":0,"max":9007199254740991,"pattern":"<(?:CHOICE|SELECT) (?:COMMON EVENT|COMMONEVENT|EVENT): (\\d+)>","template":"<Choice Common Event: {value}>","targets":["choice-text"],"availability":"supported","scopeLimit":"Choose an existing ID in Database > Common Events. ID 0 does nothing; with Coreto Message, a missing ID is ignored. Runs as a separate message Common Event interpreter while choices remain open, on Scene_Map or the event-title map scene; battle choices are not supported. If a label has multiple tags, the last ID wins. The tag is removed from the displayed label. Matching is case-insensitive (global, case-insensitive regex flags); <Choice Common Event: 1> and <CHOICE COMMON EVENT: 1> are equivalent. The pattern field shows the regex body without its flags.","dependencies":["Enable Coreto_3_ChoiceCmnEvts after a Message provider (Coreto_1_MessageCore 0.1.0 or VisuMZ_1_MessageCore 1.57); do not enable both Message providers."],"examples":["<Choice Common Event: 1>","message commands list --target common-event:1 --json","message text get --target common-event:1 --index 0 --path choices --json","choice-common-events tags list --target common-event:1/text:0/choice:0 --json","choice-common-events tags set --target common-event:1/text:0/choice:0 --tag choice-common-event --value '1' --expected-hash HASH_FROM_LIST --dry-run"],"context":"Enable Coreto_3_ChoiceCmnEvts 0.1.0 with choice-common-events install after its optional providers/consumers have been arranged; the bundle must already be delivered. install selects this provider instead of VisuMZ_3_ChoiceCmnEvts and preserves other provider selections. Restart the game after configuration changes. A Message provider is required: enable Coreto_1_MessageCore 0.1.0 or VisuMZ_1_MessageCore 1.57 before this plugin; do not enable both. Coreto Message also requires Coreto_0_CoreEngine before it (see message --help and core install). If Picture Choices is active, put Choice Common Events after it. Put this plugin before active Attached Pictures, Event Title Scene and Message Visibility. This tag belongs to a single-line native Show Choices label, not Note, Comment or Show Text. Accepts CHOICE or SELECT with COMMON EVENT, COMMONEVENT or EVENT and a space after the colon. Tag editing does not execute the Common Event. Each changed highlight launches a separate interpreter without waiting; changing away does not cancel an earlier event, and overlapping events are possible. With Coreto Message, finished interpreters are removed; map initialization/setup clears the list, while loading a save preserves its serialized list. Choice-to-event bindings are rebuilt for each choice list. The Common Event uses the main map interpreter event ID as context. For an evented title, enable Coreto_4_EventTitleScene after this plugin and configure event-title-scene api describe ET-P-MapID:num, then place Show Choices on that map.","writing":"Find an existing Show Choices unit (code 102) and index I with message commands list --target common-event:1. Read message text get --target common-event:1 --index I --path choices and choose zero-based J. choice-common-events tags list --target common-event:1/text:I/choice:J supplies result.fileHash for --expected-hash and occurrence indices. Example IDs/indexes are illustrative; Common Event 1 must exist in data/CommonEvents.json. Use --occurrence when multiple matching tags exist. Removing a tag affects subsequent choice-list construction, not already launched interpreters."}],"methods":[]};
class CoreError extends Error {
    constructor(code, message, details = {}, exitCode = 2) {
        super(message);
        this.code = code;
        this.details = details;
        this.exitCode = exitCode;
    }
}

function valueError(schema, value, path, expected = schema.type) {
    throw new CoreError("INVALID_VALUE", `Invalid value at ${path}; expected ${expected}.`, {
        field: path, received: value, expected,
        discovery: schema.id ? {id:schema.id} : {}
    });
}

function validateValue(schema, value, path) {
    if (schema.type === "struct") {
        if (!value || typeof value !== "object" || Array.isArray(value)) valueError(schema, value, path);
        for (const key of Object.keys(value)) {
            const field = schema.fields.find(field => field.key === key);
            if (!field) throw new CoreError("UNKNOWN_FIELD", `Unknown field ${path}/${key}.`, { field: `${path}/${key}` });
            validateValue(field, value[key], `${path}/${key}`);
        }
        for (const field of schema.fields) {
            if (!Object.prototype.hasOwnProperty.call(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
        }
    } else if (schema.type === "array") {
        if (!Array.isArray(value)) valueError(schema, value, path);
        value.forEach((item, index) => validateValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof value !== "number" || !Number.isFinite(value)) valueError(schema, value, path, "a finite number");
        if (schema.integer && !Number.isInteger(value)) valueError(schema, value, path, "an integer");
        if (schema.min !== undefined && value < schema.min) valueError(schema, value, path, `a number >= ${schema.min}`);
        if (schema.max !== undefined && value > schema.max) valueError(schema, value, path, `a number <= ${schema.max}`);
    } else if (schema.type === "boolean" || schema.type === "string") {
        if (typeof value !== schema.type) valueError(schema, value, path);
    } else {
        throw new CoreError("UNSUPPORTED_TYPE", `Unsupported parameter type: ${schema.type}.`, { field: path }, 6);
    }
    const unavailable = schema.unavailableOptions?.find(option => option.value === String(value).trim().toLowerCase());
    if (unavailable) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Value is unavailable at ${path}: ${value}.`, {
            field: path, received: value, availability: unavailable.availability,
            hint: unavailable.reason
        }, 6);
    }
    if (schema.options && !schema.options.includes(value)) valueError(schema, value, path, JSON.stringify(schema.options));
    return value;
}

function parseLayer(raw, path) {
    if (typeof raw !== "string") throw new CoreError("INVALID_ENCODING", `Expected a native string at ${path}.`, { field: path, received: raw });
    try {
        return JSON.parse(raw);
    } catch {
        throw new CoreError("INVALID_ENCODING", `Invalid JSON encoding at ${path}.`, { field: path, received: raw });
    }
}

function decodeValue(schema, raw, path) {
    if (raw === undefined) return validateValue(schema, JSON.parse(JSON.stringify(schema.default)), path);
    let value;
    if (schema.type === "struct") {
        const encoded = parseLayer(raw, path);
        if (!encoded || typeof encoded !== "object" || Array.isArray(encoded)) valueError(schema, encoded, path);
        value = Object.fromEntries(schema.fields.map(field => [field.key,
            decodeValue(field, encoded[field.storageKey], `${path}/${field.key}`)]));
    } else if (schema.type === "array") {
        const encoded = parseLayer(raw, path);
        if (!Array.isArray(encoded)) valueError(schema, encoded, path);
        value = encoded.map((item, index) => decodeValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        // Hand-written arrays such as "[5]" hold JSON numbers where the editor writes "[\"5\"]"; the original plugins accept both.
        if (typeof raw === "number") value = raw;
        else if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        else value = Number(raw);
    } else if (schema.type === "boolean") {
        if (raw !== "true" && raw !== "false") valueError(schema, raw, path);
        value = raw === "true";
    } else {
        value = schema.encoding === "json" ? parseLayer(raw, path) : raw;
    }
    return validateValue(schema, value, path);
}

function encodeValue(schema, value, path, previous) {
    validateValue(schema, value, path);
    if (schema.type === "struct") {
        const encoded = previous === undefined ? {} : parseLayer(previous, path);
        for (const field of schema.fields) {
            encoded[field.storageKey] = encodeValue(field, value[field.key], `${path}/${field.key}`, encoded[field.storageKey]);
        }
        return JSON.stringify(encoded);
    }
    if (schema.type === "array") {
        const encoded = previous === undefined ? [] : parseLayer(previous, path);
        return JSON.stringify(value.map((item, index) => encodeValue(schema.items, item, `${path}/${index}`, encoded[index])));
    }
    // A whole-object edit must not reformat an untouched native numeric field.
    if (schema.type === "number" && typeof previous === "string" && previous.trim() !== "" && Number(previous) === value) return previous;
    return schema.encoding === "json" ? JSON.stringify(value) : String(value);
}

function parameterAt(parameters, path) {
    if (!path?.startsWith("/") || path === "/") throw new CoreError("INVALID_PATH", "Use a parameter path such as /Gold/GoldMax.", { field: path });
    const segments = path.slice(1).split("/");
    let schema = parameters.find(field => field.key === segments[0]);
    if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
    const chain = [schema];
    for (const segment of segments.slice(1)) {
        schema = schema.type === "struct" ? schema.fields.find(field => field.key === segment) :
            schema.type === "array" && /^(0|[1-9]\d*)$/.test(segment) ? schema.items : undefined;
        if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
        chain.push(schema);
    }
    return { chain, segments };
}

function decodeParameters(parameters, raw) {
    return Object.fromEntries(parameters.map(field => [field.key, decodeValue(field, raw[field.storageKey], `/${field.key}`)]));
}

const configurationSourceField = {
    id: 'CORETO-CONFIG-SOURCE',
    key: 'CoretoConfigSource',
    storageKey: 'CoretoConfigSource',
    label: 'Configuration source',
    description: 'inherit reads the original entry when present; own reads this entry. Switching does not copy values.',
    type: 'string',
    editorType: 'select',
    options: ['inherit', 'own'],
    default: 'inherit',
    nativeDefault: 'inherit',
    availability: 'supported'
};

function configurationSelection(catalog, parameters) {
    if (Object.prototype.hasOwnProperty.call(parameters, 'CoretoConfigSource')) {
        return {configuredSource: parameters.CoretoConfigSource, format: 'canonical', migrationRequired: false};
    }
    const oldVn = catalog.pluginId === 'Coreto_2_VNPictureBusts';
    if (oldVn && Object.prototype.hasOwnProperty.call(parameters, 'ConfigurationSource') && !['own', 'legacy-if-present'].includes(parameters.ConfigurationSource)) {
        const error = new Error('Use own or legacy-if-present for the historical VN selector.');
        error.code = 'INVALID_CONFIGURATION_SOURCE';
        error.exitCode = 2;
        throw error;
    }
    const configuredSource = oldVn && parameters.ConfigurationSource === 'own' ? 'own'
        : ['Coreto_0_CoreEngine', 'Coreto_1_MessageCore'].includes(catalog.pluginId) ? 'own' : 'inherit';
    return {configuredSource, format: oldVn && Object.prototype.hasOwnProperty.call(parameters, 'ConfigurationSource') ? 'vn-legacy' : 'implicit', migrationRequired: true};
}

function resolvePluginConfiguration(catalog, plugins, {errorPrefix = 'CORETO', allowMissingOwn = false} = {}) {
    const ownEntries = plugins.filter(plugin => plugin.name === catalog.pluginId);
    const originalId = catalog.reference?.pluginId ?? 'VisuMZ_0_CoreEngine';
    const originals = plugins.filter(plugin => plugin.name === originalId);
    function fail(suffix, message) {
        const error = new Error(message);
        error.code = `${errorPrefix}_CONFIG_${suffix}`;
        error.exitCode = 2;
        throw error;
    }
    if (ownEntries.length > 1 || originals.length > 1 || (!allowMissingOwn && ownEntries.length !== 1)) {
        fail('DUPLICATE', 'Use one own entry and at most one original entry.');
    }
    const own = ownEntries[0];
    if (own && (!own.parameters || typeof own.parameters !== 'object' || Array.isArray(own.parameters))) {
        fail('ENCODING', 'Expected own parameter object.');
    }
    const selection = own ? configurationSelection(catalog, own.parameters)
        : {configuredSource: 'inherit', format: 'absent', migrationRequired: false};
    if (!configurationSourceField.options.includes(selection.configuredSource)) {
        fail('SOURCE', 'CoretoConfigSource must be inherit or own.');
    }
    const source = selection.configuredSource === 'inherit' && originals.length ? originals[0] : own;
    return {...selection, own, source, effectiveSource: source?.name ?? catalog.pluginId,
        materialized: selection.configuredSource === 'own', rawParameters: source?.parameters ?? {}};
}

function installComplement(catalog, apiName, errorPrefix) {
    function fail(code, message) { throw Object.assign(new Error(message), {code:errorPrefix+'_'+code}); }
    if (Utils.RPGMAKER_NAME !== 'MZ' || Utils.RPGMAKER_VERSION !== '1.10.0') fail('ENGINE_VERSION', 'Use RPG Maker MZ 1.10.0.');
    const active = $plugins.filter(plugin => plugin.status);
    const providers = active.filter(plugin => [catalog.pluginId, catalog.reference.pluginId].includes(plugin.name));
    if (providers.length !== 1 || providers[0].name !== catalog.pluginId || globalThis.Coreto?.[apiName]) fail('DUPLICATE_PROVIDER', 'Enable exactly one '+catalog.namespace+' provider.');
    const own = providers[0];
    for (const alternatives of catalog.dependencies.required) if (!active.some(plugin => alternatives.includes(plugin.name))) fail('DEPENDENCY_MISSING', 'Enable a supported provider: '+alternatives.join(' or ')+'.');
    if (active.some(plugin => catalog.orderAfter.includes(plugin.name) && active.indexOf(plugin) > active.indexOf(own))) fail('PLUGIN_ORDER', 'Place '+catalog.namespace+' after its dependencies.');
    for (const supported of [catalog.dependencies.cores, catalog.dependencies.messages]) {
        const entries = active.filter(plugin => Object.prototype.hasOwnProperty.call(supported, plugin.name));
        if (entries.length > 1) fail('DEPENDENCY_DUPLICATE', 'Enable at most one provider per dependency.');
        for (const entry of entries) {
            if (active.indexOf(entry) > active.indexOf(own)) fail('PLUGIN_ORDER', 'Place '+entry.name+' before '+catalog.namespace+'.');
            const versionMatches = entry.name === 'Coreto_0_CoreEngine' ? globalThis.Coreto?.CoreEngine?.version === supported[entry.name] : entry.description.includes('[Version '+supported[entry.name]+']');
            if (!versionMatches) fail('DEPENDENCY_VERSION', 'Use '+entry.name+' '+supported[entry.name]+'.');
        }
    }
    if (active.some(plugin => catalog.orderBefore.includes(plugin.name) && active.indexOf(plugin) < active.indexOf(own))) fail('PLUGIN_ORDER', 'Place '+catalog.namespace+' before its consumers.');
    const filename = decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if (filename !== catalog.pluginId+'.js') fail('FILENAME', 'Keep the filename '+catalog.pluginId+'.js.');
    const source = resolvePluginConfiguration(catalog, $plugins, {errorPrefix});
    const settings = {};
    for (const field of catalog.parameters.filter(field => field.key !== 'CoretoConfigSource')) {
        try {
            settings[field.key] = decodeValue(field, source.rawParameters[field.storageKey], field.storageKey);
        } catch (error) {
            if (!(error instanceof CoreError)) throw error;
            const wrapped = new Error(error.message);
            Object.defineProperty(wrapped, 'cause', {value:error, writable:true, configurable:true});
            throw Object.assign(wrapped, {code:errorPrefix+'_CONFIG_VALUE',field:field.storageKey});
        }
    }
    const api = {pluginId:catalog.pluginId,version:catalog.version,...source,settings};
    globalThis.Coreto ??= {};
    Coreto[apiName] = api;
    return api;
}

const choiceCommonEventsApi = installComplement(catalog, 'ChoiceCommonEvents', 'CC');
Window_ChoiceList.prototype.clearChoiceCommonEvents = function() {
    this._choiceCommonEvents = {};
};
Window_ChoiceList.prototype.applyChoiceCommonEvents = function() {
    this.clearChoiceCommonEvents();
    for (const [index,command] of this._list.entries()) command.name = command.name.replace(/<(?:CHOICE|SELECT) (?:COMMON EVENT|COMMONEVENT|EVENT): (\d+)>/gi, (_,id) => {
        this._choiceCommonEvents[index] = Number(id);
        return '';
    }).trim();
};
Window_ChoiceList.prototype.isSceneSelectChoiceCommonEventValid = function() {
    return SceneManager._scene instanceof Scene_Map || SceneManager._scene?.constructor.name === 'Scene_EventedTitleMap';
};
Window_ChoiceList.prototype.onSelectChoiceCommonEvents = function(index, previous) {
    if (index === previous) return;
    const id = this._choiceCommonEvents?.[index];
    if (!id) return;
    if (!this.isSceneSelectChoiceCommonEventValid()) {
        if (!$gameTemp._choiceCommonEventAlert) {
            $gameTemp._choiceCommonEventAlert = true;
            alert('Choice Common Events only work on the map scene!');
        }
        return;
    }
    $gameMap.addMessageCommonEvent(id);
};
const makeCommonEventChoices = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makeCommonEventChoices.apply(this, args);
    this.applyChoiceCommonEvents();
    return result;
};
const selectCommonEventChoice = Window_ChoiceList.prototype.select;
Window_ChoiceList.prototype.select = function(index) {
    const previous = this.index();
    const result = selectCommonEventChoice.call(this, index);
    this.onSelectChoiceCommonEvents(index, previous);
    return result;
};
const startCommonEventChoice = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function(...args) {
    this.deselect();
    return startCommonEventChoice.apply(this, args);
};
globalThis.Imported ??= {};
Imported.Coreto_3_ChoiceCmnEvts = true;
Imported.VisuMZ_3_ChoiceCmnEvts = true;
globalThis.VisuMZ ??= {};
VisuMZ.ChoiceCmnEvts = {version:Number(catalog.reference.version),Settings:choiceCommonEventsApi.settings};

})();
