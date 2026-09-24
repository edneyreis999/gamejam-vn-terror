// Extended :eval fields accept JavaScript completion values, including empty scripts.
function authoredField(field) {
    return {...field, ...(field.javascript ? {javascript: 'script'} : {}),
        ...(field.fields ? {fields: field.fields.map(authoredField)} : {}),
        ...(field.items ? {items: authoredField(field.items)} : {})};
}

export function extendedAuthoringSchema(catalog) {
    return {...catalog, namespace: 'ext-message', partialCommandStructs: true,
        preserveCommandAnnotations: true, parameters: catalog.parameters.map(authoredField),
        commands: catalog.commands.map(command => ({...command, availability: 'supported', args: command.args.map(authoredField)})),
        tags: [], methods: []};
}
