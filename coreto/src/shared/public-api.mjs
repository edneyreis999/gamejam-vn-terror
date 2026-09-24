const descriptorFields = `id key storageKey label title description type editorType encoding default nativeDefault
    defaultReason availability availabilityReason context surface plugin version authoring aliases expected
    min max integer decimals editorMin runtimeBounds options suggestions optionLabels unavailableOptions
    on off parent structName directory javascript fields items args arguments returns targets receiver
    environment reason example examples metadata editorArgs dependencies members usages pattern template
    occurrences syntax selection precedence writing diagnostic diagnostics scopeLimit categoryIndex
    optionIndex symbol gates showJs allowZero conflicts`.split(/\s+/);
const stringFields = new Set(`id key storageKey label title description type editorType encoding nativeDefault
    defaultReason availability availabilityReason context surface plugin version authoring expected structName
    directory environment reason receiver returns pattern template occurrences syntax selection precedence
    writing diagnostic scopeLimit symbol showJs on off parent runtimeBounds`.split(/\s+/));
const nestedFields = {
    javascript: 'kind receiver arguments bindings capture context failure onError returnType',
    metadata: 'text parent type desc default min max on off option value dir require',
    diagnostics: 'context unavailable',
    usages: 'surface path command',
    unavailableOptions: 'value availability reason',
    arguments: 'name type default',
    editorArgs: 'key metadata',
    examples: 'input expected code indent parameters'
};

function copyPublicValue(value) {
    if (Array.isArray(value)) return value.map(copyPublicValue);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,child]) => [key,copyPublicValue(child)]));
    return value;
}

function failure(namespace, id, path, message) {
    const error = new Error(`${namespace}/${id} ${path}: ${message}`);
    error.code = 'PUBLIC_API_CONTRACT';
    error.namespace = namespace;
    error.id = id;
    error.field = path;
    throw error;
}

function record(input, fields, namespace, id, path, transform) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) failure(namespace, id, path, 'expected object');
    for (const key of Object.keys(input)) {
        if (!fields.includes(key)) failure(namespace, id, `${path}/${key}`, 'unclassified public field');
    }
    const result = {};
    for (const key of fields) {
        if (Object.hasOwn(input, key) && input[key] !== undefined) result[key] = transform(input[key], key);
    }
    return result;
}

function publicMetadata(value, namespace, id, path) {
    return record(value, nestedFields.metadata.split(' '), namespace, id, path, (strings,key) => {
        if (!Array.isArray(strings) || strings.some(item=>typeof item !== 'string')) failure(namespace,id,`${path}/${key}`,'expected metadata strings');
        return [...strings];
    });
}

// Construction and validation share the public contract. Defaults remain authored data;
// fields/items/args describe their native shape and are the authoring validator's authority.
export function publicDescriptor(input, namespace, path = '', owner = input.id) {
    return record(input, descriptorFields, namespace, owner, path, (value, key) => {
        const location = `${path}/${key}`;
        if (stringFields.has(key) && typeof value !== 'string') failure(namespace, owner, location, 'expected string');
        if (['min','max','editorMin','decimals','categoryIndex','optionIndex'].includes(key) && typeof value !== 'number') failure(namespace, owner, location, 'expected number');
        if (['integer','allowZero'].includes(key) && typeof value !== 'boolean') failure(namespace, owner, location, 'expected boolean');
        if (['fields','args','examples','arguments','editorArgs','usages','unavailableOptions','options','suggestions','targets','members','aliases','gates','conflicts','dependencies'].includes(key) && !Array.isArray(value)) failure(namespace, owner, location, 'expected array');
        if (['options','suggestions','targets','members','aliases','gates','conflicts','dependencies'].includes(key)) {
            for (const [index,item] of value.entries()) {
                if (!['string','number','boolean'].includes(typeof item)) failure(namespace, owner, `${location}/${index}`, 'expected scalar value');
            }
        }
        if (key === 'optionLabels') {
            return record(value, (input.options ?? []).map(String), namespace, owner, location, (label,name) => {
                if (typeof label !== 'string') failure(namespace, owner, `${location}/${name}`, 'expected label string');
                return label;
            });
        }
        if (['fields', 'args'].includes(key)) return value.map((field, index) => publicDescriptor(field, namespace, `${location}/${index}`, owner));
        if (key === 'items') return publicDescriptor(value, namespace, location, owner);
        if (key === 'metadata') return publicMetadata(value, namespace, owner, location);
        if (nestedFields[key]) {
            if (key === 'javascript' && typeof value === 'string') return value;
            const copy = (item, at) => {
                if (key === 'examples' && ['string','number','boolean'].includes(typeof item)) return item;
                return record(item, nestedFields[key].split(' '), namespace, owner, at, (child, name) => {
                    if (key === 'editorArgs' && name === 'metadata') {
                        return publicMetadata(child, namespace, owner, `${at}/metadata`);
                    }
                    if (key === 'javascript') {
                        const valid = ['arguments','bindings'].includes(name) ? Array.isArray(child) && child.every(item=>typeof item === 'string') : name === 'capture' ? Number.isInteger(child) && child >= 0 : typeof child === 'string';
                        if (!valid) failure(namespace, owner, `${at}/${name}`, 'expected JavaScript contract value');
                    }
                    if ((key === 'arguments' && name !== 'default') || (key === 'editorArgs' && name === 'key') ||
                        (key === 'examples' && ['input','expected'].includes(name))) {
                        if (typeof child !== 'string') failure(namespace, owner, `${at}/${name}`, 'expected string');
                    }
                    if (key === 'examples' && ['code','indent'].includes(name) && (!Number.isInteger(child) || child < 0)) {
                        failure(namespace, owner, `${at}/${name}`, 'expected nonnegative integer');
                    }
                    if (key === 'examples' && name === 'parameters') {
                        if (item.code !== 357 || !Array.isArray(child) || child.length !== 4 || child.slice(0,3).some(part => typeof part !== 'string')) {
                            failure(namespace, owner, `${at}/parameters`, 'expected MZ plugin-command parameters');
                        }
                        const args = record(child[3], (input.editorArgs ?? []).map(arg => arg.key), namespace, owner, `${at}/parameters/3`, (argument, argumentKey) => {
                            if (typeof argument !== 'string') failure(namespace, owner, `${at}/parameters/3/${argumentKey}`, 'expected serialized argument string');
                            return argument;
                        });
                        return [...child.slice(0,3), args];
                    }
                    if (['usages','diagnostics','unavailableOptions'].includes(key) && !['string','number','boolean'].includes(typeof child)) failure(namespace, owner, `${at}/${name}`, 'expected scalar value');
                    return copyPublicValue(child);
                });
            };
            return ['javascript','diagnostics'].includes(key) ? copy(value, location) : value.map((item, index) => copy(item, `${location}/${index}`));
        }
        if (key === 'example' && value && typeof value === 'object' && !Array.isArray(value)) {
            const keys = (input.args ?? []).map(arg => arg.key);
            return record(value, keys, namespace, owner, location, v => copyPublicValue(v));
        }
        return copyPublicValue(value);
    });
}

export function configurationPublicField(field, catalog) {
    if (field.key !== 'CoretoConfigSource') return field;
    const namespace = catalog.namespace;
    const original = catalog.reference?.pluginId ?? catalog.compatibility?.originalCoreId;
    return {...field, plugin:catalog.pluginId,
        description:`Configuration source in the game's js/plugins.js: inherit reads parameters from ${original}, even if inactive; when that entry is absent, it reads ${catalog.pluginId}. own always reads ${catalog.pluginId}. Switching the selector does not copy values.`,
        context:`Edit the CoretoConfigSource parameter of ${catalog.pluginId} in the MZ Plugin Manager or through the CLI. The plugin entry must exist in js/plugins.js.`,
        writing:`Run the CLI with --project pointing to the MZ game folder. ${namespace} parameters set changes the selector only; install or the first edit of a functional parameter in inherit materializes own values. Reload the editor after a CLI write.`,
        examples:[`${namespace} parameters get --path /CoretoConfigSource --json`,`${namespace} parameters set --path /CoretoConfigSource --value '\"own\"' --json`]};
}

export function validatePublicEntries(namespace, entries) {
    const ids = new Set();
    for (const entry of entries) {
        if (typeof entry.id !== 'string' || !entry.id) failure(namespace, '?', '/id', 'expected nonempty ID');
        if (ids.has(entry.id)) failure(namespace, entry.id, '/id', 'duplicate ID');
        ids.add(entry.id);
        publicDescriptor(entry, namespace);
    }
    if (!ids.size) failure(namespace, '?', '/', 'empty capability catalog');
    return entries;
}

export function validateOperationalCatalog(catalog, namespace = catalog.namespace ?? catalog.pluginId) {
    const fields = `schemaVersion pluginId namespace version engine description reference dependencies
        orderAfter orderBefore compatibility configuration parameters commands tags methods entries
        optionItems availability editorParameters editorCommands apis limits commandAliases
        partialCommandStructs preserveCommandAnnotations`.split(/\s+/);
    record(catalog, fields, namespace, 'catalog', '', value => value);
    if (catalog.schemaVersion !== undefined && catalog.schemaVersion !== 1) failure(namespace,'catalog','/schemaVersion','expected schema version 1');
    for (const group of ['parameters','commands','tags','methods','optionItems','apis','entries','editorParameters','editorCommands']) {
        if (catalog[group] !== undefined && !Array.isArray(catalog[group])) failure(namespace,'catalog',`/${group}`,'expected array');
    }
    for (const group of ['parameters', 'commands', 'tags', 'methods', 'optionItems', 'apis']) {
        for (const [index, entry] of (catalog[group] ?? []).entries()) publicDescriptor(entry, namespace, `/${group}/${index}`);
    }
    for (const [index, entry] of (catalog.entries ?? []).entries()) {
        if (entry.delegate) {
            record(entry, ['id', 'delegate'], namespace, entry.id, `/entries/${index}`, (value,key) => {
                if (key === 'id' && typeof value !== 'string') failure(namespace,'catalog',`/entries/${index}/id`,'expected string');
                return value;
            });
            record(entry.delegate, ['catalog', 'collection'], namespace, entry.id, `/entries/${index}/delegate`, (value,key) => {
                if (typeof value !== 'string') failure(namespace,entry.id,`/entries/${index}/delegate/${key}`,'expected delegate string');
                return value;
            });
        } else publicDescriptor(entry, namespace, `/entries/${index}`);
    }
    for (const group of ['editorParameters','editorCommands']) {
        for (const [index,entry] of (catalog[group] ?? []).entries()) {
            record(entry, ['id','key','metadata'], namespace, entry.id ?? entry.key, `/${group}/${index}`, (value,key) => {
                if (key === 'metadata') publicMetadata(value, namespace, entry.id ?? entry.key, `/${group}/${index}/metadata`);
                else if (typeof value !== 'string') failure(namespace,'catalog',`/${group}/${index}/${key}`,'expected string');
                return value;
            });
        }
    }
    for (const key of ['limits','description','pluginId','namespace','version','availability']) {
        if (catalog[key] !== undefined && typeof catalog[key] !== 'string') failure(namespace,'catalog',`/${key}`,'expected string');
    }
    for (const key of ['orderAfter','orderBefore','commandAliases']) {
        if (catalog[key] !== undefined && (!Array.isArray(catalog[key]) || catalog[key].some(item=>typeof item !== 'string'))) failure(namespace,'catalog',`/${key}`,'expected strings');
    }
    for (const key of ['preserveCommandAnnotations','partialCommandStructs']) if (catalog[key] !== undefined && typeof catalog[key] !== 'boolean') failure(namespace,'catalog',`/${key}`,'expected boolean');
    const strings = (input, keys, path) => record(input, keys, namespace, 'catalog', path, (value,key) => {
        if (typeof value !== 'string') failure(namespace,'catalog',`${path}/${key}`,'expected string');
        return value;
    });
    if (catalog.compatibility) strings(catalog.compatibility, ['messagePluginId','messageVersion','messageSha256','originalCoreId','policy'], '/compatibility');
    if (catalog.engine && typeof catalog.engine !== 'string') strings(catalog.engine, ['name','version'], '/engine');
    if (catalog.configuration) record(catalog.configuration, ['key','default','modes'], namespace,'catalog','/configuration',(value,key)=>{
        const valid=key==='modes'?Array.isArray(value)&&value.every(item=>typeof item==='string'):typeof value==='string';
        if (!valid) failure(namespace,'catalog',`/configuration/${key}`,'expected configuration selector');
        return value;
    });
    if (catalog.dependencies) record(catalog.dependencies, ['core','required','optional','cores','messages','before','consumers','integrations'], namespace, 'catalog', '/dependencies', (value,key) => {
        const path = `/dependencies/${key}`;
        if (key === 'core') {
            if (typeof value !== 'string') failure(namespace,'catalog',path,'expected plugin ID');
        } else if (['required','optional'].includes(key)) {
            if (!Array.isArray(value) || value.some(item=> typeof item !== 'string' && !(Array.isArray(item) && item.every(id=>typeof id === 'string')))) failure(namespace,'catalog',path,'expected plugin requirements');
        } else {
            if (!value || typeof value !== 'object' || Array.isArray(value)) failure(namespace,'catalog',path,'expected plugin version map');
            for (const [id,version] of Object.entries(value)) {
                if (!/^(Coreto|VisuMZ)_\d+_[A-Za-z0-9]+$/.test(id) || typeof version !== 'string') failure(namespace,'catalog',`${path}/${id}`,'expected plugin ID and version');
            }
        }
        return value;
    });
    if (catalog.reference) strings(catalog.reference, ['pluginId', 'version'], '/reference');
    return catalog;
}
