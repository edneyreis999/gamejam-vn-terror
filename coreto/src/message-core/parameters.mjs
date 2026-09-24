import {CoreError, decodeParameters} from '../core-engine/parameters.mjs';

export function resolveMessageSettings(fields, raw, receiver) {
    const decoded = decodeParameters(fields, raw);
    function runtimeValue(field, value, path) {
        if (field.type === 'struct') return Object.fromEntries(field.fields.map(child =>
            [child.key, runtimeValue(child, value[child.key], `${path}/${child.key}`)]));
        if (field.type === 'array') return value.map((item, index) => runtimeValue(field.items, item, `${path}/${index}`));
        if (!field.javascript) return value;
        try {
            const fn = new Function(field.javascript === 'body' ? value : `return (${value});`);
            return field.javascript === 'body' ? fn : fn.call(receiver);
        } catch (cause) {
            throw new CoreError('MESSAGE_AUTHORED_CODE', `Invalid authored JavaScript at ${path}.`, {field: path, cause: cause.message});
        }
    }
    return Object.fromEntries(fields.map(field => [field.key, runtimeValue(field, decoded[field.key], `/${field.key}`)]));
}
