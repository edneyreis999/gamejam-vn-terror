import {configurationPublicField, publicDescriptor, validatePublicEntries, validateOperationalCatalog} from '../shared/public-api.mjs';

export function describeCoreApi(catalog) {
    validateOperationalCatalog(catalog);
    const entries = new Map(), signatures = new Map();
    const namespace = catalog.namespace ?? 'core';
    const quote = value => "'" + value.replaceAll("'", "'\\''") + "'";
    function add(descriptor, usage, source) {
        const signature = JSON.stringify(source);
        if (signatures.has(descriptor.id) && signatures.get(descriptor.id) !== signature) throw new Error(`${catalog.namespace}/${descriptor.id}: conflicting descriptors share an ID`);
        signatures.set(descriptor.id,signature);
        const existing = entries.get(descriptor.id);
        if (existing) existing.usages.push(usage);
        else entries.set(descriptor.id, publicDescriptor({...descriptor, usages: [usage]}, catalog.namespace ?? catalog.pluginId));
    }
    function fields(list, parent, surface, command) {
        for (const field of list) {
            const path = `${parent}/${field.key}`;
            const example = surface === 'parameter'
                ? `${namespace} parameters get --path ${path.replaceAll('{index}', '0')} --json`
                : `${namespace} api describe ${command} --json`;
            const operational = configurationPublicField(field, catalog);
            const writing = surface === 'parameter' ? `${namespace} parameters set --path ${path.replaceAll('{index}', '0')} --value <JSON> [--dry-run] [--json]. Use the field type, default and limits to choose the JSON value. Run the CLI with --project pointing to the MZ game folder; the plugin entry must exist in js/plugins.js. Reload the editor after writing.` : undefined;
            add({...operational, surface, context: operational.context ?? 'browser runtime; authoring is offline',
                ...(writing ? {writing:operational.writing ?? writing} : {}), examples: operational.examples ?? [example]}, {surface, path, ...(command ? {command} : {})}, field);
            if (field.type === 'struct') fields(field.fields, path, surface, command);
            if (field.type === 'array' && field.items.type === 'struct') fields(field.items.fields, `${path}/{index}`, surface, command);
        }
    }
    fields(catalog.parameters, '', 'parameter');
    for (const command of catalog.commands) {
        add({...command, surface: 'command', context: command.context ?? command.environment ?? 'browser runtime',
            writing: command.writing ?? 'Use an existing target and insertion index from commands list; pass its result.fileHash as --expected-hash. Run the CLI with --project pointing to the MZ game folder. The command executes later when the game interpreter reaches it; authoring does not run it.',
            examples: command.examples ?? [`${namespace} commands list --target common-event:1 --json`, `${namespace} commands insert --target common-event:1 --before 0 --command ${command.key} --value ${quote(JSON.stringify(Object.fromEntries(command.args.map(field => [field.key, field.default]))))} --expected-hash HASH_FROM_LIST`]},
        {surface: 'command', path: `/commands/${command.key}`}, command);
        fields(command.args, `/commands/${command.key}`, 'command-argument', command.key);
    }
    for (const tag of catalog.tags) add({...tag, surface: 'tag', context: tag.context ?? 'native authoring field; interpreted by browser runtime'}, {surface: 'tag', path: `/tags/${tag.key}`}, tag);
    for (const method of catalog.methods) add({...method, surface: 'method', context: method.context ?? 'browser runtime only; CLI describes but never invokes this method', examples: [method.example]}, {surface: 'method', path: `/methods/${method.id}`}, method);
    return validatePublicEntries(catalog.namespace ?? catalog.pluginId, [...entries.values()]);
}
