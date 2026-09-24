// CLI descriptors select public authored grammar, never internal ESC scanners.
export function messageAuthoringCatalog(catalog) {
    const parameter = field => ({...field,
        ...(field.editorType === 'common_event' && field.default === 0 ? {allowZero: true} : {}),
        ...(field.fields ? {fields: field.fields.map(parameter)} : {}),
        ...(field.items ? {items: parameter(field.items)} : {})});
    const tags = catalog.entries.filter(entry => entry.plugin === catalog.pluginId && entry.surface === 'text-grammar' && !entry.title.includes('\\x1b')).map(entry => {
        const pattern = entry.title.slice(1, entry.title.lastIndexOf('/'));
        const number = Number(entry.id.split('-').at(-1));
        let targets;
        if (number >= 110) targets = ['map-name'];
        else if (number >= 25 && number <= 27) targets = ['message-text', 'choice-text'];
        else if (number >= 7 && number <= 10 || number >= 89 && number <= 107 || number >= 25 && number <= 32) targets = ['choice-text'];
        else if (number === 11 || number === 12 || number >= 74 && number <= 88) targets = ['message-text'];
        else targets = ['message-text', 'choice-text', 'speaker', 'picture-text', 'map-name'];
        return {id: entry.id, key: entry.id, pattern, type: 'string', targets, availability: 'supported', examples: entry.examples,
            occurrences: 'Explicit occurrence is required when the same grammar occurs more than once.'};
    });
    const references = {VariableID:'variable', ActorID:'actor', WeaponTypeID:'weapon-type', ArmorTypeID:'armor-type', EquipTypeID:'equip-type', SkillTypeID:'skill-type'};
    return {...catalog, parameters: catalog.parameters.map(parameter), namespace: 'message', tags, commands: catalog.commands.map(command => ({...command, availability: 'supported', args: command.args.map(field => {
        if (references[field.key]) return {...field, editorType: references[field.key], allowZero: true};
        if (field.key === 'PictureIDs') return {...field, items:{...field.items, editorType:'picture'}};
        return field;
    })}))};
}
