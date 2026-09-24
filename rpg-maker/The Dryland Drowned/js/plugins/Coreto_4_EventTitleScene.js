/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 4] [Version 0.1.0] [EventTitleScene]
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
 * @orderAfter Coreto_1_OptionsCore
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter Coreto_1_SaveCore
 * @orderAfter VisuMZ_1_SaveCore
 * @orderAfter Coreto_4_AttachedPictures
 * @orderAfter VisuMZ_4_AttachedPictures
 * @orderBefore Coreto_4_MessageVisibility
 * @orderBefore VisuMZ_4_MessageVisibility
 * @help
 * Use a map as the title scene. Author an autorun with NewGame, LoadScreen and Options commands.
 * The <Continue> choice tag disables a choice when no save exists.
 * Disable VisuMZ_4_EventTitleScene. Core, Message, Options and Save are optional.
 * CoretoConfigSource selects inherit or own configuration. See coreto/README.md and the event-title-scene CLI namespace.
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
 * @param MapID:num
 * @text Map ID
 * @type number
 * @desc Select the map used for the evented title scene.
 * @default 1
 * @min 1
 * @max 999
 *
 * @param MapX:num
 * @text Map X
 * @type number
 * @desc Player starting X tile coordinate (column, increasing to the right) on the map selected by MapID when the evented title scene starts.
 * @default 10
 * @min 0
 * @max 255
 *
 * @param MapY:num
 * @text Map Y
 * @type number
 * @desc Player starting Y tile coordinate (row, increasing downward) on the map selected by MapID when the evented title scene starts.
 * @default 10
 * @min 0
 * @max 255
 *
 * @param FaceDirection:num
 * @text Face Direction
 * @type select
 * @desc What direction will the player face on the title scene?
 * @default 2
 * @option Down Left
 * @value 1
 * @option Down
 * @value 2
 * @option Down Right
 * @value 3
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 * @option Up Left
 * @value 7
 * @option Up
 * @value 8
 * @option Up Right
 * @value 9
 *
 * @param PlayerTransparent:eval
 * @text Transparent?
 * @type boolean
 * @desc Make the player transparent on the title scene?
 * @default true
 * @on Transparent
 * @off Opaque
 *
 * @param CanInputMove:eval
 * @text Can Input Move?
 * @type boolean
 * @desc Can the player move while on the title scene?
 * @default false
 * @on Allow
 * @off Disallow
 *
 * @param ShowFollowers:eval
 * @text Show Followers?
 * @type boolean
 * @desc Show player followers on the title scene?
 * @default false
 * @on Show
 * @off Hide
 *
 * @command NewGame
 * @text System: Start New Game
 * @desc Leaves the current scene and starts a new game.
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @desc Use a slow fade out transition to the next scene?
 * @default true
 * @on Slow
 * @off Normal
 *
 * @command LoadScreen
 * @text System: Open Load Scene
 * @desc Leaves the current scene and opens the load game scene.
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @desc Use a slow fade out transition to the next scene?
 * @default false
 * @on Slow
 * @off Normal
 *
 * @command Options
 * @text System: Open Options Scene
 * @desc Leaves the current scene and opens the options scene.
 * @arg SlowFade:eval
 * @text Slow Fade Out?
 * @type boolean
 * @desc Use a slow fade out transition to the next scene?
 * @default false
 * @on Slow
 * @off Normal
 *
 */



(() => {
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_4_EventTitleScene","namespace":"event-title-scene","version":"0.1.0","reference":{"pluginId":"VisuMZ_4_EventTitleScene","version":"1.06"},"dependencies":{"required":[],"cores":{"Coreto_0_CoreEngine":"0.1.0","VisuMZ_0_CoreEngine":"1.90"},"messages":{"Coreto_1_MessageCore":"0.1.0","VisuMZ_1_MessageCore":"1.54"}},"orderAfter":["Coreto_0_CoreEngine","VisuMZ_0_CoreEngine","Coreto_1_MessageCore","VisuMZ_1_MessageCore","Coreto_2_PictureChoices","VisuMZ_2_PictureChoices","Coreto_2_VNPictureBusts","VisuMZ_2_VNPictureBusts","Coreto_3_ChoiceCmnEvts","VisuMZ_3_ChoiceCmnEvts","Coreto_1_OptionsCore","VisuMZ_1_OptionsCore","Coreto_1_SaveCore","VisuMZ_1_SaveCore","Coreto_4_AttachedPictures","VisuMZ_4_AttachedPictures"],"orderBefore":["Coreto_4_MessageVisibility","VisuMZ_4_MessageVisibility"],"parameters":[{"id":"CORETO-CONFIG-SOURCE","key":"CoretoConfigSource","storageKey":"CoretoConfigSource","label":"Configuration source","description":"inherit reads the original entry when present; own reads this entry. Switching does not copy values.","type":"string","editorType":"select","options":["inherit","own"],"default":"inherit","nativeDefault":"inherit","availability":"supported"},{"id":"ET-P-MapID:num","key":"MapID","storageKey":"MapID:num","label":"Map ID","description":"Select the map used for the evented title scene.","type":"number","editorType":"number","nativeDefault":"1","default":1,"availability":"supported","min":1,"max":999},{"id":"ET-P-MapX:num","key":"MapX","storageKey":"MapX:num","label":"Map X","description":"Player starting X tile coordinate (column, increasing to the right) on the map selected by MapID when the evented title scene starts.","type":"number","editorType":"number","nativeDefault":"10","default":10,"availability":"supported","min":0,"max":255,"context":"Use a whole tile coordinate with zero at the top-left tile of the selected map. Choose a tile inside that map as well as within the published numeric limits. This sets the player transfer destination, not a pixel offset of the title artwork. The paired MapX/MapY parameters determine the destination even when PlayerTransparent hides the player."},{"id":"ET-P-MapY:num","key":"MapY","storageKey":"MapY:num","label":"Map Y","description":"Player starting Y tile coordinate (row, increasing downward) on the map selected by MapID when the evented title scene starts.","type":"number","editorType":"number","nativeDefault":"10","default":10,"availability":"supported","min":0,"max":255,"context":"Use a whole tile coordinate with zero at the top-left tile of the selected map. Choose a tile inside that map as well as within the published numeric limits. This sets the player transfer destination, not a pixel offset of the title artwork. The paired MapX/MapY parameters determine the destination even when PlayerTransparent hides the player."},{"id":"ET-P-FaceDirection:num","key":"FaceDirection","storageKey":"FaceDirection:num","label":"Face Direction","description":"What direction will the player face on the title scene?","type":"number","editorType":"select","nativeDefault":"2","default":2,"availability":"supported","options":[1,2,3,4,6,7,8,9],"optionLabels":{"1":"Down Left","2":"Down","3":"Down Right","4":"Left","6":"Right","7":"Up Left","8":"Up","9":"Up Right"}},{"id":"ET-P-PlayerTransparent:eval","key":"PlayerTransparent","storageKey":"PlayerTransparent:eval","label":"Transparent?","description":"Make the player transparent on the title scene?","type":"boolean","editorType":"boolean","nativeDefault":"true","default":true,"availability":"supported","on":"Transparent","off":"Opaque"},{"id":"ET-P-CanInputMove:eval","key":"CanInputMove","storageKey":"CanInputMove:eval","label":"Can Input Move?","description":"Can the player move while on the title scene?","type":"boolean","editorType":"boolean","nativeDefault":"false","default":false,"availability":"supported","on":"Allow","off":"Disallow"},{"id":"ET-P-ShowFollowers:eval","key":"ShowFollowers","storageKey":"ShowFollowers:eval","label":"Show Followers?","description":"Show player followers on the title scene?","type":"boolean","editorType":"boolean","nativeDefault":"false","default":false,"availability":"supported","on":"Show","off":"Hide"}],"commands":[{"id":"ET-C-NewGame","key":"NewGame","label":"System: Start New Game","description":"Leaves the current scene and starts a new game.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"ET-NewGame-SlowFade:eval","key":"SlowFade","storageKey":"SlowFade:eval","label":"Slow Fade Out?","description":"Use a slow fade out transition to the next scene?","type":"string","editorType":"boolean","nativeDefault":"true","default":"true","availability":"supported","javascript":{"kind":"expression","returnType":"boolean"},"on":"Slow","off":"Normal"}]},{"id":"ET-C-LoadScreen","key":"LoadScreen","label":"System: Open Load Scene","description":"Leaves the current scene and opens the load game scene.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"ET-LoadScreen-SlowFade:eval","key":"SlowFade","storageKey":"SlowFade:eval","label":"Slow Fade Out?","description":"Use a slow fade out transition to the next scene?","type":"string","editorType":"boolean","nativeDefault":"false","default":"false","availability":"supported","javascript":{"kind":"expression","returnType":"boolean"},"on":"Slow","off":"Normal"}]},{"id":"ET-C-Options","key":"Options","label":"System: Open Options Scene","description":"Leaves the current scene and opens the options scene.","availability":"supported","targets":["map","common-event","troop"],"args":[{"id":"ET-Options-SlowFade:eval","key":"SlowFade","storageKey":"SlowFade:eval","label":"Slow Fade Out?","description":"Use a slow fade out transition to the next scene?","type":"string","editorType":"boolean","nativeDefault":"false","default":"false","availability":"supported","javascript":{"kind":"expression","returnType":"boolean"},"on":"Slow","off":"Normal"}]}],"commandAliases":["VisuMZ_4_EventTitleScene"],"tags":[{"id":"ET-RX-001","key":"continue","label":"Continue choice","description":"Disable the tagged choice when no save exists.","type":"string","pattern":"<CONTINUE>","targets":["choice-text"],"availability":"supported","occurrences":"All matching tags are removed; availability follows storage.","examples":["<Continue>"]}],"methods":[]};
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

const eventTitleApi = installComplement(catalog, 'EventTitleScene', 'ET');
const titleSettings = eventTitleApi.settings;
function Scene_EventedTitleMap() { this.initialize(...arguments); }
Scene_EventedTitleMap.prototype = Object.create(Scene_Map.prototype);
Scene_EventedTitleMap.prototype.constructor = Scene_EventedTitleMap;
Scene_EventedTitleMap.prototype.initialize = function() {
    Scene_Map.prototype.initialize.call(this);
    $gamePlayer.setTransparent(titleSettings.PlayerTransparent);
    if (titleSettings.ShowFollowers) $gamePlayer.showFollowers(); else $gamePlayer.hideFollowers();
};
Scene_EventedTitleMap.prototype.isAutosaveEnabled = function() { return false; };
Scene_EventedTitleMap.prototype.requestAutosave = function() {};
Scene_EventedTitleMap.prototype.executeAutosave = function() {};
Scene_EventedTitleMap.prototype.forceAutosave = function() {};
Scene_EventedTitleMap.prototype.isMapTouchOk = function() { return titleSettings.CanInputMove && Scene_Map.prototype.isMapTouchOk.call(this); };
Scene_EventedTitleMap.prototype.updateEncounter = function() {};
Scene_EventedTitleMap.prototype.isMenuCalled = function() { return false; };
Scene_EventedTitleMap.prototype.callMenu = function() {};
Scene_EventedTitleMap.prototype.updateCallDebug = function() {};
Scene_EventedTitleMap.prototype.isDebugCalled = function() { return false; };
Scene_EventedTitleMap.prototype.createTitleButtons = function() {
    if (this._eventTitleButtonsCreated) return;
    this._eventTitleButtonsCreated = true;
    if (typeof Scene_Title.prototype.createTitleButtons === 'function') Scene_Title.prototype.createTitleButtons.call(this);
};
Scene_EventedTitleMap.prototype.start = function() {
    Scene_Map.prototype.start.call(this);
    this.createTitleButtons();
    if (this._eventTitleLoadError && typeof this.loadFailureConfirmationWindow === 'function') this.loadFailureConfirmationWindow();
};
Scene_EventedTitleMap.prototype.processOptionsCoreFailsafe = function(direction) {
    const sequence = [8,8,2,2,4,6,4,6];
    const index = this._optionsCoreFailsafeCheck ?? 0;
    this._optionsCoreFailsafeCheck = sequence[index] === direction ? index + 1 : 0;
    if (this._optionsCoreFailsafeCheck === sequence.length) {
        ConfigManager.assistMode = true;
        ConfigManager.save();
        SoundManager.playLoad();
    }
};
Scene_EventedTitleMap.prototype.updateOptionsCoreFailsafe = function() {
    if (!globalThis.Imported?.VisuMZ_1_OptionsCore) return;
    for (const [key,direction] of [['up',8],['down',2],['left',4],['right',6]]) {
        if (Input.isTriggered(key)) this.processOptionsCoreFailsafe(direction);
    }
};
Scene_EventedTitleMap.prototype.update = function() {
    Scene_Map.prototype.update.call(this);
    this.updateOptionsCoreFailsafe();
};
globalThis.Scene_EventedTitleMap = Scene_EventedTitleMap;
SceneManager.isSceneMap = function() { return this._scene?.constructor === Scene_Map; };
SceneManager.isSceneTitleMap = function() { return this._scene?.constructor === Scene_EventedTitleMap; };
DataManager.prepareEventedTitleScreen = function() {
    this.setupNewGame();
    $gamePlayer.reserveTransfer(titleSettings.MapID,titleSettings.MapX,titleSettings.MapY,titleSettings.FaceDirection,0);
};
const gotoEventTitle = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
    if (sceneClass === Scene_Title || sceneClass === Scene_EventedTitleMap) {
        DataManager.prepareEventedTitleScreen();
        sceneClass = Scene_EventedTitleMap;
    }
    return gotoEventTitle.call(this,sceneClass);
};
const titleInputDirection = Game_Player.prototype.getInputDirection;
Game_Player.prototype.getInputDirection = function(...args) {
    return SceneManager.isSceneTitleMap() && !titleSettings.CanInputMove ? 0 : titleInputDirection.apply(this,args);
};
const titleAutosave = Scene_Map.prototype.isAutosaveEnabled;
Scene_Map.prototype.isAutosaveEnabled = function(...args) {
    if (SceneManager.isPreviousScene(Scene_TitleTransition) || SceneManager.isPreviousScene(Scene_Save)) return false;
    return titleAutosave.apply(this,args);
};
const makeTitleChoices = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function(...args) {
    const result = makeTitleChoices.apply(this,args);
    for (const choice of this._list) if (/<CONTINUE>/i.test(choice.name)) {
        choice.name = choice.name.replace(/<CONTINUE>/gi,'').trim();
        choice.enabled = choice.enabled && DataManager.isAnySavefileExists();
    }
    return result;
};

function Scene_TitleTransition() { this.initialize(...arguments); }
Scene_TitleTransition.prototype = Object.create(Scene_Base.prototype);
Scene_TitleTransition.prototype.constructor = Scene_TitleTransition;
Scene_TitleTransition.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
};
globalThis.Scene_TitleTransition = Scene_TitleTransition;
function Scene_SingleLoadTransition() { this.initialize(...arguments); }
Scene_SingleLoadTransition.prototype = Object.create(Scene_Base.prototype);
Scene_SingleLoadTransition.prototype.constructor = Scene_SingleLoadTransition;
Scene_SingleLoadTransition.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this._loadPromise = DataManager.loadGame(0).then(()=>this.onLoadSuccess(),error=>this.onLoadFailure(error));
};
Scene_SingleLoadTransition.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
    $gameSystem.onAfterLoad();
    SceneManager.goto(Scene_Map);
};
Scene_SingleLoadTransition.prototype.onLoadFailure = function(error) {
    SoundManager.playBuzzer();
    SceneManager.goto(Scene_EventedTitleMap);
    SceneManager._nextScene._eventTitleLoadError = error;
};
Scene_SingleLoadTransition.prototype.onSaveCoreLoadFailure = Scene_SingleLoadTransition.prototype.onLoadFailure;
globalThis.Scene_SingleLoadTransition = Scene_SingleLoadTransition;
function eventTitleSaveStyle() { return typeof StorageManager.saveStyle === 'function' ? StorageManager.saveStyle() : 'standard'; }
for (const namespace of [catalog.pluginId,catalog.reference.pluginId]) for (const command of catalog.commands) {
    PluginManager.registerCommand(namespace,command.key,function(args) {
        const raw = args['SlowFade:eval'] ?? command.args[0].nativeDefault;
        const slow = Function('return ('+raw+');').call(this);
        const scene = SceneManager._scene;
        if (slow) scene.fadeOutAll();
        if (command.key === 'Options') return SceneManager.push(Scene_Options);
        if (command.key === 'NewGame') {
            if (eventTitleSaveStyle() === 'locked') {
                DataManager.setupNewGame();
                $gameTemp._pickLockedSaveSlot = true;
                return SceneManager.push(Scene_Save);
            }
            return SceneManager.goto(Scene_TitleTransition);
        }
        if (eventTitleSaveStyle() !== 'single') return SceneManager.push(Scene_Load);
        if (DataManager.isAnySavefileExists()) return SceneManager.push(Scene_SingleLoadTransition);
        SoundManager.playBuzzer();
        scene.loadFailureConfirmationWindow();
    });
}
globalThis.Imported ??= {};
Imported.Coreto_4_EventTitleScene = true;
Imported.VisuMZ_4_EventTitleScene = true;
globalThis.VisuMZ ??= {};
VisuMZ.EventTitleScene = {version:Number(catalog.reference.version),Settings:titleSettings};

})();
