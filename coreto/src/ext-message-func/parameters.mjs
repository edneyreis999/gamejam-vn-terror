import {resolvePluginConfiguration} from '../shared/plugin-configuration.mjs';
import {CoreError} from '../core-engine/parameters.mjs';

export function resolveExtendedSource(catalog, plugins) {
    const configuration = resolvePluginConfiguration(catalog, plugins, {errorPrefix: 'EXT'});
    const {configuredSource, source} = configuration;
    function complete(fields, raw) {
        const result = {...raw};
        for (const field of fields) {
            if (field.key === 'CoretoConfigSource') continue;
            const value = Object.hasOwn(result, field.storageKey) ? result[field.storageKey] : field.nativeDefault;
            if (field.type === 'array' && value !== '') {
                let array;
                try { array = JSON.parse(value); } catch { throw new CoreError('EXT_CONFIG_ENCODING', `Invalid array ${field.storageKey} in ${source.name}.`); }
                if (!Array.isArray(array)) throw new CoreError('EXT_CONFIG_ENCODING', `Invalid array ${field.storageKey} in ${source.name}.`);
            }
            if (field.javascript && value !== '') {
                try { new Function(value); }
                catch (cause) { throw new CoreError('EXT_AUTHORED_CODE', `Invalid expression at ${field.storageKey}.`, {field:field.storageKey, cause:cause.message}); }
            }
            if (field.type !== 'struct' || value === '') { result[field.storageKey] = value; continue; }
            let nested;
            try { nested = JSON.parse(value); } catch { throw new CoreError('EXT_CONFIG_ENCODING', `Invalid struct ${field.storageKey} in ${source.name}.`); }
            if (!nested || typeof nested !== 'object' || Array.isArray(nested)) throw new CoreError('EXT_CONFIG_ENCODING', `Invalid struct ${field.storageKey} in ${source.name}.`);
            result[field.storageKey] = JSON.stringify(complete(field.fields, nested));
        }
        return result;
    }
    return {configuredSource, effectiveSource: source.name, materialized: configuredSource === 'own', rawParameters: complete(catalog.parameters, source.parameters)};
}

export function resolveExtendedSettings(raw, receiver) {
    return convertExtendedParameters.call(receiver, {}, raw);
}

// The public converter uses sloppy eval with its two original arguments.
export const convertExtendedParameters = new Function('target', 'raw', `
    for (const key in raw) {
        const match = key.match(/(.*):(.*)/i);
        if (!match) continue;
        const name = match[1], type = match[2].toUpperCase().trim(), value = raw[key];
        let decoded;
        switch (type) {
            case 'NUM': decoded = value === '' ? 0 : Number(value); break;
            case 'STR': decoded = value === '' ? '' : String(value); break;
            case 'EVAL': decoded = value === '' ? null : eval(value); break;
            case 'STRUCT': decoded = VisuMZ.ConvertParams({}, value === '' ? {} : JSON.parse(value)); break;
            case 'ARRAYSTR': decoded = (value === '' ? [] : JSON.parse(value)).map(String); break;
            case 'ARRAYNUM': decoded = (value === '' ? [] : JSON.parse(value)).map(Number); break;
            case 'ARRAYEVAL': decoded = (value === '' ? [] : JSON.parse(value)).map(code => eval(code)); break;
            case 'ARRAYSTRUCT': decoded = (value === '' ? [] : JSON.parse(value)).map(item => VisuMZ.ConvertParams({}, JSON.parse(item))); break;
            case 'JSON': decoded = value === '' ? '' : JSON.parse(value); break;
            case 'ARRAYJSON': decoded = (value === '' ? [] : JSON.parse(value)).map(item => JSON.parse(item)); break;
            case 'FUNC': decoded = new Function(value === '' ? 'return 0' : JSON.parse(value)); break;
            case 'ARRAYFUNC': decoded = (value === '' ? [] : JSON.parse(value)).map(item => new Function(JSON.parse(item))); break;
            default: continue;
        }
        target[name] = decoded;
    }
    return target;
`);
