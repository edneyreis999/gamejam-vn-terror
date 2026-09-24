/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 4] [Version 0.1.0] [AttachedPictures]
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter VisuMZ_2_PictureChoices
 * @orderAfter Coreto_2_VNPictureBusts
 * @orderAfter VisuMZ_2_VNPictureBusts
 * @orderAfter Coreto_3_ChoiceCmnEvts
 * @orderAfter VisuMZ_3_ChoiceCmnEvts
 * @orderBefore Coreto_4_EventTitleScene
 * @orderBefore VisuMZ_4_EventTitleScene
 * @orderBefore Coreto_4_MessageVisibility
 * @orderBefore VisuMZ_4_MessageVisibility
 * @help
 * Attach pictures to the message or another picture with the four plugin commands.
 * Disable VisuMZ_4_AttachedPictures before activating this provider. Core and Message are optional.
 * CoretoConfigSource selects inherit or own configuration. See coreto/README.md and the attached-pictures CLI namespace.
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
 * @param PictureIDs:arraynum
 * @text Default Attached ID(s)
 * @type number[]
 * @desc Picture IDs initially attached to the message window in a new game; also used when loading a save with no stored message-picture attachment list.
 * @default ["61","62","63","64","65","66","67","68","69","70"]
 * @min 1
 *
 * @param ContainerPosition:num
 * @text Container Position
 * @type select
 * @desc Layer of the attached-picture container inside the message window: behind its skin, in front of its skin, or in front of its text.
 * @default 1
 * @option 0 - Behind Window Skin
 * @value 0
 * @option 1 - In Front of Window Skin
 * @value 1
 * @option 2 - In Front of Window Text
 * @value 2
 *
 * @command MessageAddPicture
 * @text Message: Attach Picture(s)
 * @desc Attach the selected Picture IDs to the message window. The change takes effect when this event command runs and the window next updates.
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Select which Picture ID's to attach to the Message Window.
 * @default ["1"]
 * @min 1
 *
 * @command MessageRemovePicture
 * @text Message: Remove Picture(s)
 * @desc Detach the selected Picture IDs from the message window without erasing their Show Picture data.
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Select which Picture ID's to remove from the Message Window.
 * @default ["1"]
 * @min 1
 *
 * @command PictureAddPicture
 * @text Picture: Attach Picture(s)
 * @desc Attach the PictureID images as children of the TargetID picture when this event command runs.
 * @arg PictureID:arraynum
 * @text Attach Picture ID(s)
 * @type number[]
 * @desc Select which Picture ID's to attach to another picture.
 * @default ["1"]
 * @min 1
 *
 * @arg TargetID:num
 * @text Target Picture ID
 * @type number
 * @desc Select which Picture ID to attach the above picture(s) to.
 * @default 2
 * @min 1
 *
 * @command PictureRemovePicture
 * @text Picture: Remove Picture(s)
 * @desc Detach the selected child Picture IDs from their picture parents without erasing their Show Picture data.
 * @arg PictureID:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @desc Select which Picture ID's to remove from any other pictures.
 * @default ["1"]
 * @min 1
 *
 */



(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_4_AttachedPictures","namespace":"attached-pictures","version":"0.1.0","reference":{"pluginId":"VisuMZ_4_AttachedPictures","version":"1.05"},"dependencies":{"required":[],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.54"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_MessageCore","VisuMZ_1_MessageCore","Coreto_2_PictureChoices","VisuMZ_2_PictureChoices","Coreto_2_VNPictureBusts","VisuMZ_2_VNPictureBusts","Coreto_3_ChoiceCmnEvts","VisuMZ_3_ChoiceCmnEvts"],"orderBefore":["Coreto_4_EventTitleScene","VisuMZ_4_EventTitleScene","Coreto_4_MessageVisibility","VisuMZ_4_MessageVisibility"],"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"AP-P-PictureIDs:arraynum","key":"PictureIDs","storageKey":"PictureIDs:arraynum","label":"Default Attached ID(s)","description":"Picture IDs initially attached to the message window in a new game; also used when loading a save with no stored message-picture attachment list.","editorType":"number[]","nativeDefault":"[\"61\",\"62\",\"63\",\"64\",\"65\",\"66\",\"67\",\"68\",\"69\",\"70\"]","availability":"supported","type":"array","items":{"type":"number","integer":true,"min":1,"default":1},"default":[61,62,63,64,65,66,67,68,69,70],"min":1,"context":"The list is stored in the save after initialization; changing this default does not replace an existing saved list. Use Show Picture to display each selected ID. Attachments use the picture coordinates relative to the message window, are visible only while it is open, and cannot receive picture clicks. IDs must fit the game picture range. An empty array gives no default attachments. Use MessageAddPicture and MessageRemovePicture to change the current game list."},{"id":"AP-P-ContainerPosition:num","key":"ContainerPosition","storageKey":"ContainerPosition:num","label":"Container Position","description":"Layer of the attached-picture container inside the message window: behind its skin, in front of its skin, or in front of its text.","editorType":"select","nativeDefault":"1","availability":"supported","type":"number","default":1,"options":[0,1,2],"optionLabels":{"0":"0 - Behind Window Skin","1":"1 - In Front of Window Skin","2":"2 - In Front of Window Text"}}],"commands":[{"id":"AP-C-MessageAddPicture","key":"MessageAddPicture","label":"Message: Attach Picture(s)","description":"Attach the selected Picture IDs to the message window. The change takes effect when this event command runs and the window next updates.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"AP-MessageAddPicture-PictureID:arraynum","key":"PictureID","storageKey":"PictureID:arraynum","label":"Picture ID(s)","description":"Select which Picture ID's to attach to the Message Window.","editorType":"number[]","nativeDefault":"[\"1\"]","availability":"supported","type":"array","items":{"type":"number","integer":true,"min":1,"default":1},"default":[1],"min":1}],"context":"Show Picture creates the displayed image; it may run before or after attachment. While attached, its Show/Move Picture coordinates are local to the message window and its normal screen sprite is hidden. The attached image is visible only while the window is open, follows its transforms and cannot receive picture clicks. IDs outside 1..$gameScreen.maxPictures() have no attached sprite. Repeated IDs do not duplicate sprites. A picture that already has attached children is ignored; otherwise any previous picture-parent link is removed. The attachment list persists in the save until removed."},{"id":"AP-C-MessageRemovePicture","key":"MessageRemovePicture","label":"Message: Remove Picture(s)","description":"Detach the selected Picture IDs from the message window without erasing their Show Picture data.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"AP-MessageRemovePicture-PictureID:arraynum","key":"PictureID","storageKey":"PictureID:arraynum","label":"Picture ID(s)","description":"Select which Picture ID's to remove from the Message Window.","editorType":"number[]","nativeDefault":"[\"1\"]","availability":"supported","type":"array","items":{"type":"number","integer":true,"min":1,"default":1},"default":[1],"min":1}],"context":"On the next sprite update, a displayed picture returns to the normal screen picture layer using its existing Show/Move Picture coordinates as screen coordinates. No world-position conversion occurs, so it can jump visually. An erased or never-shown picture stays absent. Removing an ID that is not message-attached has no effect. The updated attachment list persists in the save."},{"id":"AP-C-PictureAddPicture","key":"PictureAddPicture","label":"Picture: Attach Picture(s)","description":"Attach the PictureID images as children of the TargetID picture when this event command runs.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"AP-PictureAddPicture-PictureID:arraynum","key":"PictureID","storageKey":"PictureID:arraynum","label":"Attach Picture ID(s)","description":"Select which Picture ID's to attach to another picture.","editorType":"number[]","nativeDefault":"[\"1\"]","availability":"supported","type":"array","items":{"type":"number","integer":true,"min":1,"default":1},"default":[1],"min":1},{"id":"AP-PictureAddPicture-TargetID:num","key":"TargetID","storageKey":"TargetID:num","label":"Target Picture ID","description":"Select which Picture ID to attach the above picture(s) to.","editorType":"number","nativeDefault":"2","availability":"supported","type":"number","default":2,"min":1}],"context":"Use Show Picture for both child and target; attachment may be set before they are shown. Children use their own Show/Move Picture coordinates relative to the target and inherit its position, scale, rotation and opacity through the parent transform. A missing or erased target hides its children; their normal screen sprites are hidden while attached. Picture clicks are disabled for attached children. Use integer IDs in 1..$gameScreen.maxPictures(). Self-attachment, a target already attached elsewhere, and a child that already has children are ignored, preventing chains and cycles. Repeated IDs do not duplicate sprites. An accepted link replaces any previous parent or message-window attachment and persists in the save."},{"id":"AP-C-PictureRemovePicture","key":"PictureRemovePicture","label":"Picture: Remove Picture(s)","description":"Detach the selected child Picture IDs from their picture parents without erasing their Show Picture data.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"AP-PictureRemovePicture-PictureID:arraynum","key":"PictureID","storageKey":"PictureID:arraynum","label":"Picture ID(s)","description":"Select which Picture ID's to remove from any other pictures.","editorType":"number[]","nativeDefault":"[\"1\"]","availability":"supported","type":"array","items":{"type":"number","integer":true,"min":1,"default":1},"default":[1],"min":1}],"context":"On the next sprite update, a displayed picture returns to the normal screen picture layer with its existing Show/Move Picture coordinates, scale, rotation and opacity. Parent transforms are no longer applied and no world-position conversion occurs, so it can jump visually. An erased or never-shown picture stays absent. IDs without a picture-parent link are unchanged; message-window attachments are not removed by this command. The updated links persist in the save."}],"commandAliases":["VisuMZ_4_AttachedPictures"],"tags":[],"methods":[]};
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
        hint: schema.id ? `Use core api describe ${schema.id} to inspect accepted values and defaults.` : "Use core api list to inspect accepted parameter values."
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
            if (!Object.hasOwn(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
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
        if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        value = Number(raw);
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
    if (Object.hasOwn(parameters, 'CoretoConfigSource')) {
        return {configuredSource: parameters.CoretoConfigSource, format: 'canonical', migrationRequired: false};
    }
    const oldVn = catalog.pluginId === 'Coreto_2_VNPictureBusts';
    if (oldVn && Object.hasOwn(parameters, 'ConfigurationSource') && !['own', 'legacy-if-present'].includes(parameters.ConfigurationSource)) {
        const error = new Error('Use own or legacy-if-present for the historical VN selector.');
        error.code = 'INVALID_CONFIGURATION_SOURCE';
        error.exitCode = 2;
        throw error;
    }
    const configuredSource = oldVn && parameters.ConfigurationSource === 'own' ? 'own'
        : ['Coreto_0_CoreEngine', 'Coreto_1_MessageCore'].includes(catalog.pluginId) ? 'own' : 'inherit';
    return {configuredSource, format: oldVn && Object.hasOwn(parameters, 'ConfigurationSource') ? 'vn-legacy' : 'implicit', migrationRequired: true};
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
        const entries = active.filter(plugin => Object.hasOwn(supported, plugin.name));
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
            throw Object.assign(new Error(error.message, {cause:error}), {code:errorPrefix+'_CONFIG_VALUE',field:field.storageKey});
        }
    }
    const api = {pluginId:catalog.pluginId,version:catalog.version,...source,settings};
    globalThis.Coreto ??= {};
    Coreto[apiName] = api;
    return api;
}

const attachedPicturesApi = installComplement(catalog, 'AttachedPictures', 'AP');
Window_Message.DEFAULT_MESSAGE_PICTURE_IDS = attachedPicturesApi.settings.PictureIDs.slice();
Game_System.prototype.initAttachedPictures = function() {
    this._attachedBasePictures = [];
    this._attachedBasePictureTargets = {};
    this._attachedMessagePictures = Window_Message.DEFAULT_MESSAGE_PICTURE_IDS.slice();
};
const initializeAttachedPictures = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(...args) {
    const result = initializeAttachedPictures.apply(this, args);
    this.initAttachedPictures();
    return result;
};
Game_System.prototype.getAttachedBasePictures = function() {
    if (this._attachedBasePictures === undefined) this._attachedBasePictures = [];
    return this._attachedBasePictures;
};
Game_System.prototype.getAttachedBasePictureTarget = function(id) {
    if (this._attachedBasePictureTargets === undefined) this._attachedBasePictureTargets = {};
    return this._attachedBasePictureTargets[id];
};
Game_System.prototype.getAttachedMessagePictures = function() {
    if (this._attachedMessagePictures === undefined) this._attachedMessagePictures = Window_Message.DEFAULT_MESSAGE_PICTURE_IDS.slice();
    return this._attachedMessagePictures;
};
Game_System.prototype.isAttachedBasePicture = function(id) { return this.getAttachedBasePictures().includes(id); };
Game_System.prototype.isAttachedMessagePicture = function(id) { return this.getAttachedMessagePictures().includes(id); };
Game_System.prototype.isPictureAttached = function(id) { return this.isAttachedBasePicture(id) || this.isAttachedMessagePicture(id); };
Game_System.prototype.hasAttachedPicture = function(id) {
    return this.getAttachedBasePictures().some(child => this.getAttachedBasePictureTarget(child) === id);
};
Game_System.prototype.removeAttachedBasePictureID = function(id) {
    const ids = this.getAttachedBasePictures(), index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
    this.getAttachedBasePictureTarget(id);
    delete this._attachedBasePictureTargets[id];
};
Game_System.prototype.removeAttachedMessagePictureID = function(id) {
    const ids = this.getAttachedMessagePictures(), index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
};
Game_System.prototype.addAttachedBasePictureID = function(id, target) {
    if (id === target || this.isPictureAttached(target) || this.hasAttachedPicture(id)) return;
    this.removeAttachedMessagePictureID(id);
    const ids = this.getAttachedBasePictures();
    if (!ids.includes(id)) ids.push(id);
    this.getAttachedBasePictureTarget(id);
    this._attachedBasePictureTargets[id] = target;
};
Game_System.prototype.addAttachedMessagePictureID = function(id) {
    if (this.hasAttachedPicture(id)) return;
    this.removeAttachedBasePictureID(id);
    const ids = this.getAttachedMessagePictures();
    if (!ids.includes(id)) ids.push(id);
};
for (const namespace of [catalog.pluginId,catalog.reference.pluginId]) {
    for (const command of catalog.commands) PluginManager.registerCommand(namespace, command.key, function(args) {
        const defaults = Object.fromEntries(command.args.map(field => [field.storageKey,field.nativeDefault]));
        const raw = {...defaults,...args};
        const ids = JSON.parse(raw['PictureID:arraynum']).map(Number);
        const method = {MessageAddPicture:'addAttachedMessagePictureID',MessageRemovePicture:'removeAttachedMessagePictureID',PictureAddPicture:'addAttachedBasePictureID',PictureRemovePicture:'removeAttachedBasePictureID'}[command.key];
        for (const id of ids) $gameSystem[method](id, Number(raw['TargetID:num']));
    });
}

function Sprite_AttachPicture(pictureId, parentId) {
    this._parentID = parentId;
    Sprite_Picture.prototype.initialize.call(this, pictureId);
}
Sprite_AttachPicture.prototype = Object.create(Sprite_Picture.prototype);
Sprite_AttachPicture.prototype.constructor = Sprite_AttachPicture;
Sprite_AttachPicture.prototype.isUsingAttachedPicture = function() {
    return $gameSystem.isAttachedBasePicture(this._pictureId) && $gameSystem.getAttachedBasePictureTarget(this._pictureId) === this._parentID;
};
Sprite_AttachPicture.prototype.isClickEnabled = function() { return false; };
function Sprite_MessagePicture(pictureId) { Sprite_Picture.prototype.initialize.call(this, pictureId); }
Sprite_MessagePicture.prototype = Object.create(Sprite_Picture.prototype);
Sprite_MessagePicture.prototype.constructor = Sprite_MessagePicture;
Sprite_MessagePicture.prototype.isUsingAttachedPicture = function() { return $gameSystem.isAttachedMessagePicture(this._pictureId); };
Sprite_MessagePicture.prototype.isClickEnabled = function() { return false; };
globalThis.Sprite_AttachPicture = Sprite_AttachPicture;
globalThis.Sprite_MessagePicture = Sprite_MessagePicture;

const updateAttachedPictureBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function(...args) {
    const result = updateAttachedPictureBitmap.apply(this, args);
    this.hideAttachedPicture();
    return result;
};
Sprite_Picture.prototype.hideAttachedPicture = function() {
    const derived = this instanceof Sprite_AttachPicture || this instanceof Sprite_MessagePicture;
    if (derived ? !this.isUsingAttachedPicture() : $gameSystem.isPictureAttached(this._pictureId)) this.visible = false;
};
const attachedPictureClickEnabled = Sprite_Picture.prototype.isClickEnabled;
Sprite_Picture.prototype.isClickEnabled = function(...args) {
    return !$gameSystem.isPictureAttached(this._pictureId) && attachedPictureClickEnabled.apply(this, args);
};
Sprite_Picture.prototype.hasAttachedPicture = function() {
    return !(this instanceof Sprite_AttachPicture || this instanceof Sprite_MessagePicture) && $gameSystem.hasAttachedPicture(this._pictureId);
};
Sprite_Picture.prototype.createAttachedPictures = function() {
    if (this._pictureContainer) return;
    this._pictureContainer = new Sprite();
    this.addChild(this._pictureContainer);
};
Sprite_Picture.prototype.removeAttachedPictures = function() {
    if (!this._pictureContainer) return;
    this.removeChild(this._pictureContainer);
    this._pictureContainer.destroy();
    this._pictureContainer = null;
};
function syncAttachedSprites(container, ids, create) {
    const wanted = [...new Set(ids)].filter(id => id >= 1 && id <= $gameScreen.maxPictures()).sort((a,b) => a-b);
    for (const sprite of container.children.slice()) if (!wanted.includes(sprite._pictureId)) {
        container.removeChild(sprite);
        sprite.destroy();
    }
    for (const id of wanted) if (!container.children.some(sprite => sprite._pictureId === id)) container.addChild(create(id));
    container.children.sort((a,b) => a._pictureId-b._pictureId);
}
const updateAttachedPicture = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function(...args) {
    const result = updateAttachedPicture.apply(this, args);
    if (this.hasAttachedPicture()) {
        this.createAttachedPictures();
        syncAttachedSprites(this._pictureContainer, $gameSystem.getAttachedBasePictures().filter(id => $gameSystem.getAttachedBasePictureTarget(id) === this._pictureId), id => new Sprite_AttachPicture(id, this._pictureId));
    } else this.removeAttachedPictures();
    return result;
};
Window_Message.prototype.createMessagePictureContainer = function() {
    this._pictureContainer = new Sprite();
    const position = attachedPicturesApi.settings.ContainerPosition;
    if (position === 0 || position === 1) this.addChildAt(this._pictureContainer, position);
    else this.addChild(this._pictureContainer);
    syncAttachedSprites(this._pictureContainer, $gameSystem.getAttachedMessagePictures(), id => new Sprite_MessagePicture(id));
};
Window_Message.prototype.updateMessagePictureContainerVisibility = function() {
    this._pictureContainer.visible = this.isOpen();
};
const initializeAttachedMessage = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(...args) {
    const result = initializeAttachedMessage.apply(this, args);
    this.createMessagePictureContainer();
    return result;
};
const updateAttachedMessage = Window_Message.prototype.update;
Window_Message.prototype.update = function(...args) {
    const result = updateAttachedMessage.apply(this, args);
    syncAttachedSprites(this._pictureContainer, $gameSystem.getAttachedMessagePictures(), id => new Sprite_MessagePicture(id));
    this.updateMessagePictureContainerVisibility();
    return result;
};
globalThis.Imported ??= {};
Imported.Coreto_4_AttachedPictures = true;
Imported.VisuMZ_4_AttachedPictures = true;
globalThis.VisuMZ ??= {};
VisuMZ.AttachedPictures = {version:Number(catalog.reference.version),Settings:attachedPicturesApi.settings};

})();
