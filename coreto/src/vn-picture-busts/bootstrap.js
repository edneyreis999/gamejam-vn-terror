const legacyId = catalog.reference.pluginId;
const ownEntry = $plugins.find(plugin => plugin.name === catalog.pluginId && plugin.status);
const legacyEntry = $plugins.find(plugin => plugin.name === legacyId);
if (!ownEntry) throw new Error(`${catalog.pluginId}: active plugin entry missing.`);
if ($plugins.some(plugin => plugin.name === legacyId && plugin.status) || globalThis.Imported?.[legacyId]) {
    throw new Error(`${catalog.pluginId}: disable ${legacyId} before enabling the replacement.`);
}
const coreEntry = $plugins.find(plugin => plugin.status && ['VisuMZ_0_CoreEngine', 'Coreto_0_CoreEngine'].includes(plugin.name));
if (!coreEntry || $plugins.indexOf(coreEntry) >= $plugins.indexOf(ownEntry) ||
    typeof Game_Picture.prototype.setAnchor !== 'function' || typeof Game_Picture.prototype.setTargetAnchor !== 'function') {
    throw new Error(`${catalog.pluginId}: load Core Engine (original or Coreto) before VN.`);
}
const configuration = resolvePluginConfiguration(catalog, $plugins);
const mode = configuration.configuredSource === 'inherit' ? 'legacy-if-present' : 'own';
const rawSettings = Object.fromEntries(catalog.parameters.filter(field => field.key !== 'CoretoConfigSource').map(field => [field.storageKey, configuration.rawParameters[field.storageKey] ?? field.nativeDefault]));

function convertVnFields(raw) {
    const output = {};
    if (typeof globalThis.VisuMZ?.ConvertParams === 'function') return VisuMZ.ConvertParams(output, raw);
    for (const [storageKey, value] of Object.entries(raw)) {
        const [key, encoding] = storageKey.split(':');
        if (encoding === 'num') output[key] = Number(value);
        else if (encoding === 'str') output[key] = String(value);
        else if (encoding === 'eval') output[key] = value === '' ? null : eval(value);
        else if (encoding === 'arraynum') output[key] = (value === '' ? [] : JSON.parse(value)).map(Number);
        else if (encoding === 'arrayeval') output[key] = (value === '' ? [] : JSON.parse(value)).map(item => eval(item));
        else if (encoding === 'func') output[key] = new Function(value === '' ? 'return 0;' : JSON.parse(value));
        else throw new Error(`${catalog.pluginId}: unsupported encoding ${storageKey}.`);
    }
    return output;
}
const api = {
    version: Number(catalog.reference.version),
    provider: catalog.pluginId,
    providerVersion: catalog.version,
    Settings: convertVnFields(rawSettings),
    configuration: {mode, source: configuration.effectiveSource, configuredSource: configuration.configuredSource, effectiveSource: configuration.effectiveSource, materialized: configuration.materialized},
    catalog
};
globalThis.Imported ??= {};
globalThis.VisuMZ ??= {};
globalThis.Coreto ??= {};
Imported[catalog.pluginId] = true;
Imported[legacyId] = true;
VisuMZ.VNPictureBusts = api;
Coreto.VNPictureBusts = api;
api.HorzMirrorCheck = function(mode, position) {
    switch (mode.toUpperCase().trim()) {
        case 'MIRROR': return true;
        case 'AUTO': return this.Settings.InvertedScale.includes(position);
        case 'AUTO-REVERSE': return !this.Settings.InvertedScale.includes(position);
        default: return false;
    }
};
