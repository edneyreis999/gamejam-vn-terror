import catalog from '../../src/message-core/public-api.json' with {type:'json'};
import {resolvePluginConfiguration} from '../../src/shared/plugin-configuration.mjs';
import {sourceFacts} from './configuration-authoring.mjs';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {TextDecoder} from 'node:util';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {languageTemplate, parseLanguageTable, serializeLanguageTable, languageDelimiter, isLanguageBasename} from '../../src/message-core/language-table.mjs';
import {parsePluginsFile} from './plugins-file.mjs';
import {readSnapshot, publishNewFile} from './files.mjs';

function filename(value, format) {
    if (!isLanguageBasename(value, format)) {
        throw new CoreError('INVALID_LANGUAGE_FILENAME', `Use a basename ending in .${format} inside the project root.`, {received: value});
    }
    return value;
}
async function configuration(root) {
    const plugins = parsePluginsFile(await readFile(join(root, 'js/plugins.js'), 'utf8')).plugins;
    const providers = plugins.filter(p => p.status && ['Coreto_1_MessageCore', 'VisuMZ_1_MessageCore'].includes(p.name));
    if (providers.length > 1) throw new CoreError('DUPLICATE_MESSAGE_PROVIDER', 'Select one Message provider before using its language configuration.', {}, 4);
    const provider=providers[0], selected=provider?.name===catalog.pluginId?resolvePluginConfiguration(catalog,plugins):null;
    const facts={provider:provider?.name??null,...(selected?sourceFacts(selected):{})};
    const raw=(selected?.rawParameters??provider?.parameters)?.['Localization:struct'];
    if (raw === undefined) return {config:{},facts};
    try {
        const value = JSON.parse(raw);
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Expected a struct.');
        return {config:value,facts};
    } catch {throw new CoreError('INVALID_LANGUAGE_CONFIGURATION', 'Localization must be a native JSON struct.');}
}
function decode(snapshot) {
    try {return new TextDecoder('utf-8', {fatal: true}).decode(snapshot.content);}
    catch {throw new CoreError('INVALID_LANGUAGE_ENCODING', 'Use UTF-8 for language files.', {field: snapshot.file});}
}
export async function messageLanguageOperation(root, operation, values) {
    if (!['create', 'convert', 'validate'].includes(operation)) throw new CoreError('INVALID_USAGE', 'Use message language create|convert|validate.');
    const {config,facts} = await configuration(root);
    const format = values.format ?? (operation === 'convert' ? 'tsv' : config['LangFiletype:str'] || 'tsv');
    languageDelimiter(format);
    const target = filename(values.name ?? (config[format === 'csv' ? 'CsvFilename:str' : 'TsvFilename:str'] || `Languages.${format}`), format);
    if (operation !== 'convert' && values.from) throw new CoreError('INVALID_USAGE', '--from is only valid for CSV conversion.');
    if (operation === 'validate') {
        const snapshot = await readSnapshot(join(root, target), root);
        const rows = parseLanguageTable(decode(snapshot), format);
        return {configuration:facts,file: target, format, bytes: snapshot.content.length, sha256: snapshot.hash, keys: rows.length - 1, languages: rows[0].slice(1)};
    }
    let rows = languageTemplate, sourceSnapshot;
    if (operation === 'convert') {
        if (format !== 'tsv' || !values.from) throw new CoreError('INVALID_USAGE', 'Convert requires --from <basename.csv> --format tsv.');
        sourceSnapshot = await readSnapshot(join(root, filename(values.from, 'csv')), root);
        rows = parseLanguageTable(decode(sourceSnapshot), 'csv');
    }
    const content = serializeLanguageTable(rows, format);
    const receipt = await publishNewFile(join(root, target), root, content, {sourceSnapshot});
    return {...receipt,configuration:facts, format, keys: rows.length - 1, languages: rows[0].slice(1), ...(sourceSnapshot ? {sourceHash: sourceSnapshot.hash} : {})};
}
