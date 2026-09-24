/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 4] [Version 0.1.0] [MessageVisibility]
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
 * @orderAfter Coreto_2_ExtMessageFunc
 * @orderAfter VisuMZ_2_ExtMessageFunc
 * @orderAfter Coreto_2_AniMsgTextEffects
 * @orderAfter VisuMZ_2_AniMsgTextEffects
 * @orderAfter Coreto_4_AttachedPictures
 * @orderAfter VisuMZ_4_AttachedPictures
 * @orderAfter Coreto_4_EventTitleScene
 * @orderAfter VisuMZ_4_EventTitleScene
 * @help
 * Toggle map message visibility with a key or the Extended HIDE button.
 * Disable VisuMZ_4_MessageVisibility before activating this provider. Core and Message are optional.
 * CoretoConfigSource selects inherit or own configuration. See coreto/README.md and the message-visibility CLI namespace.
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
 * @param ToggleKey:str
 * @text Toggle Key
 * @type combo
 * @desc Input action name used to hide or show the message window on Scene_Map. none disables the shortcut.
 * @default tab
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 *
 * @param CommonEventShow:num
 * @text Common Event on Show
 * @type common_event
 * @desc Common Event ID to launch when the message window actually changes from hidden to visible on Scene_Map. Select its ID from Database > Common Events; 0 disables this callback.
 * @default 0
 * @min 0
 *
 * @param CommonEventHide:num
 * @text Common Event on Hide
 * @type common_event
 * @desc Common Event ID to launch when the message window actually changes from visible to hidden on Scene_Map. Select its ID from Database > Common Events; 0 disables this callback.
 * @default 0
 * @min 0
 *
 * @param ButtonName:str
 * @text Button Name
 * @type text
 * @desc Text of the hide button in the Extended Message Function button console beside the message window.
 * @default HIDE
 *
 */



(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_4_MessageVisibility","namespace":"message-visibility","version":"0.1.0","reference":{"pluginId":"VisuMZ_4_MessageVisibility","version":"1.03"},"dependencies":{"required":[],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.54"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_MessageCore","VisuMZ_1_MessageCore","Coreto_2_PictureChoices","VisuMZ_2_PictureChoices","Coreto_2_VNPictureBusts","VisuMZ_2_VNPictureBusts","Coreto_3_ChoiceCmnEvts","VisuMZ_3_ChoiceCmnEvts","Coreto_2_ExtMessageFunc","VisuMZ_2_ExtMessageFunc","Coreto_2_AniMsgTextEffects","VisuMZ_2_AniMsgTextEffects","Coreto_4_AttachedPictures","VisuMZ_4_AttachedPictures","Coreto_4_EventTitleScene","VisuMZ_4_EventTitleScene"],"orderBefore":[],"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"MV-P-ToggleKey:str","key":"ToggleKey","storageKey":"ToggleKey:str","label":"Toggle Key","description":"Input action name used to hide or show the message window on Scene_Map. none disables the shortcut.","type":"string","editorType":"combo","nativeDefault":"tab","default":"tab","availability":"supported","suggestions":["none","tab","shift","control","pageup","pagedown"],"context":"Use a suggested action such as tab or shift; other strings require a matching RPG Maker Input mapping. The shortcut works during message input or an active choice, number-input or item-selection window. Visibility changes are unavailable in battle and other scenes or while the message window forbids toggling. Confirm or touch can restore a hidden message; hiding does not erase its contents."},{"id":"MV-P-CommonEventShow:num","key":"CommonEventShow","storageKey":"CommonEventShow:num","label":"Common Event on Show","description":"Common Event ID to launch when the message window actually changes from hidden to visible on Scene_Map. Select its ID from Database > Common Events; 0 disables this callback.","type":"number","editorType":"common_event","nativeDefault":"0","default":0,"availability":"supported","integer":true,"min":0,"context":"Requires a Message provider implementing launchMessageCommonEvent. With Coreto_1_MessageCore, an absent Common Event ID is ignored and a separate interpreter runs the event alongside map events. Repeating show while already visible, battle/other scenes, and forbidden toggles do not launch it. The callback is not the initial opening of every message."},{"id":"MV-P-CommonEventHide:num","key":"CommonEventHide","storageKey":"CommonEventHide:num","label":"Common Event on Hide","description":"Common Event ID to launch when the message window actually changes from visible to hidden on Scene_Map. Select its ID from Database > Common Events; 0 disables this callback.","type":"number","editorType":"common_event","nativeDefault":"0","default":0,"availability":"supported","integer":true,"min":0,"context":"Requires a Message provider implementing launchMessageCommonEvent. With Coreto_1_MessageCore, an absent Common Event ID is ignored and a separate interpreter runs the event alongside map events. Repeating hide while already hidden, battle/other scenes, and forbidden toggles do not launch it. Closing a message normally does not trigger this callback."},{"id":"MV-P-ButtonName:str","key":"ButtonName","storageKey":"ButtonName:str","label":"Button Name","description":"Text of the hide button in the Extended Message Function button console beside the message window.","type":"string","editorType":"text","nativeDefault":"HIDE","default":"HIDE","availability":"supported","context":"To display this button, enable Coreto_2_ExtMessageFunc before this plugin, include hide in its Buttons.List, and show the button console on Scene_Map. Its visibility also follows the console's message-specific hiding and auto-size settings. This parameter only changes the label; it does not create a button without the console, change the toggle key, or enable visibility changes outside Scene_Map."}],"commands":[],"commandAliases":[],"tags":[],"methods":[]};
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

const messageVisibilityApi = installComplement(catalog, 'MessageVisibility', 'MV');
const visibilitySettings = messageVisibilityApi.settings;
Window_Message.VISIBILITY_TOGGLE_KEY = visibilitySettings.ToggleKey;
Window_Message.VISIBILITY_COMMON_EVENT_SHOW = visibilitySettings.CommonEventShow;
Window_Message.VISIBILITY_COMMON_EVENT_HIDE = visibilitySettings.CommonEventHide;
SceneManager.isSceneMap = function() { return this._scene?.constructor === Scene_Map; };
Game_Temp.prototype.toggleMessageWindowVisibility = function() { SceneManager._scene?._messageWindow?.toggleVisibility(); };
Game_Temp.prototype.showMessageWindowVisibility = function() { SceneManager._scene?._messageWindow?.setVisibility(true); };
Window_Selectable.prototype.canToggleVisibility = function() {
    return SceneManager.isSceneMap() &&
        [Window_Message,Window_ChoiceList,Window_NumberInput,Window_EventItem].includes(this.constructor);
};
Window_Message.prototype.enableToggleVisibility = function() { this._cannotToggleVisibility = false; };
function canChangeMessageVisibility(window) { return !window._cannotToggleVisibility && SceneManager.isSceneMap(); }
Window_Message.prototype.toggleVisibility = function() { this.setVisibility(this.scale.x <= 0); };
Window_Message.prototype.setWindowVisibility = function(visible) {
    for (const window of [this,this._goldWindow,this._nameBoxWindow,this._choiceListWindow,this._numberInputWindow,this._eventItemWindow,this._choiceListHelpWindow,this._AniMsgTextEffectsContainer]) {
        if (window && !window._pictureChoicesHidden) window.scale.set(visible ? 1 : 0);
    }
};
Window_Message.prototype.setVisibility = function(visible) {
    if (!canChangeMessageVisibility(this) || (this.scale.x > 0) === !!visible) return;
    this.setWindowVisibility(visible);
    Input.clear();
    TouchInput.clear();
    this.runVisibilityCommonEvent(visible);
};
Window_Message.prototype.runVisibilityCommonEvent = function(visible) {
    const id = visible ? Window_Message.VISIBILITY_COMMON_EVENT_SHOW : Window_Message.VISIBILITY_COMMON_EVENT_HIDE;
    if (id > 0 && typeof this.launchMessageCommonEvent === 'function') this.launchMessageCommonEvent(id);
};
function messageWindowIsHidden() { return SceneManager._scene?._messageWindow?.scale.x <= 0; }
function visibilityKeyTriggered() {
    const key = Window_Message.VISIBILITY_TOGGLE_KEY;
    return key !== 'none' && Input.isTriggered(key);
}
const messageVisibilityTriggered = Window_Message.prototype.isTriggered;
Window_Message.prototype.isTriggered = function(...args) {
    if (canChangeMessageVisibility(this)) {
        if (visibilityKeyTriggered()) { this.toggleVisibility(); return false; }
        if (this.scale.x <= 0) {
            if (Input.isRepeated('ok') || TouchInput.isTriggered()) this.setVisibility(true);
            return false;
        }
    }
    return messageVisibilityTriggered.apply(this,args);
};
const visibilityCursorMove = Window_Selectable.prototype.processCursorMove;
Window_Selectable.prototype.processCursorMove = function(...args) {
    if (this.isOpenAndActive() && this.canToggleVisibility()) {
        if (visibilityKeyTriggered()) return $gameTemp.toggleMessageWindowVisibility();
        if (this.isCursorMovable() && messageWindowIsHidden() && ['down','up','left','right','pageup','pagedown'].some(key=>Input.isRepeated(key))) return $gameTemp.showMessageWindowVisibility();
    }
    return visibilityCursorMove.apply(this,args);
};
const visibilityTouch = Window_Selectable.prototype.processTouch;
Window_Selectable.prototype.processTouch = function(...args) {
    if (this.isOpenAndActive() && this.canToggleVisibility() && messageWindowIsHidden() && TouchInput.isTriggered()) return $gameTemp.showMessageWindowVisibility();
    return visibilityTouch.apply(this,args);
};
const visibilityHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function(...args) {
    if (this.isOpenAndActive() && this.canToggleVisibility() && messageWindowIsHidden()) {
        if (Input.isTriggered('ok') || Input.isTriggered('cancel') || TouchInput.isCancelled()) $gameTemp.showMessageWindowVisibility();
        return;
    }
    return visibilityHandling.apply(this,args);
};
const visibilityNumberUpdate = Window_NumberInput.prototype.update;
Window_NumberInput.prototype.update = function(...args) {
    // Core keyboard edits run through both cursor and digit processing.
    if (this.isOpenAndActive() && this.canToggleVisibility() && messageWindowIsHidden() &&
        (Input.isNumpadPressed?.() || [8,46,36,35].includes(Input._inputSpecialKeyCode))) {
        Input.clear();
        TouchInput.clear();
    }
    return visibilityNumberUpdate.apply(this,args);
};
const visibilityPictureClick = Sprite_Picture.prototype.isClickEnabled;
Sprite_Picture.prototype.isClickEnabled = function(...args) {
    if (SceneManager.isSceneMap() && SceneManager._scene._messageWindow?.scale.x <= 0) return false;
    return visibilityPictureClick.apply(this,args);
};
if (TextManager.msgButtonConsole) {
    const buttonName = TextManager.msgButtonConsole;
    TextManager.msgButtonConsole = function(type) {
        return type === 'hide' ? visibilitySettings.ButtonName : buttonName.call(this,type);
    };
}
globalThis.Imported ??= {};
Imported.Coreto_4_MessageVisibility = true;
Imported.VisuMZ_4_MessageVisibility = true;
globalThis.VisuMZ ??= {};
VisuMZ.MessageVisibility = {version:Number(catalog.reference.version),Settings:visibilitySettings};

})();
