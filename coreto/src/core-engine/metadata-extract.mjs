function metadataDataError(message) {
    const error = new Error(message);
    error.code = 'METADATA_INVALID_DATA';
    throw error;
}

function metadataDatabase(value, name) {
    if (!Array.isArray(value)) metadataDataError(`${name} must be a native database array.`);
    const records = value.filter(Boolean);
    const ids = new Set();
    for (const record of records) {
        if (!Number.isSafeInteger(record.id) || record.id <= 0 || ids.has(record.id)) metadataDataError(`${name} has an invalid or repeated ID.`);
        ids.add(record.id);
    }
    return records.sort((a, b) => a.id - b.id);
}

function metadataRawText(value) {
    if (typeof value !== 'string') metadataDataError('An exported event text field is not a string.');
    return value.replace(/\r\n?/g, '\n');
}

function metadataEventText(list, commonEvents, lines) {
    const frames = [{list, index: 0, commonId: null}];
    const active = new Set();
    while (frames.length) {
        const frame = frames.at(-1);
        if (!Array.isArray(frame.list)) metadataDataError('An event page has no command list.');
        if (frame.index === frame.list.length) {
            frames.pop();
            if (frame.commonId !== null) { active.delete(frame.commonId); lines.push(`[End Common Event ${frame.commonId}]`); }
            continue;
        }
        const command = frame.list[frame.index++];
        if (!command || !Array.isArray(command.parameters)) metadataDataError('An event command has invalid parameters.');
        const args = command.parameters;
        switch (command.code) {
            case 101: lines.push(`[Show Text${args[4] ? ': ' + metadataRawText(args[4]) : ''}]`); break;
            case 401: case 405: case 408: lines.push(metadataRawText(args[0])); break;
            case 102:
                if (!Array.isArray(args[0])) metadataDataError('A choices command has no choice list.');
                args[0].forEach((choice, index) => lines.push(`[Choice ${index + 1}] ${metadataRawText(choice)}`));
                break;
            case 402: lines.push(`[Choice Branch ${args[0] + 1}] ${metadataRawText(args[1])}`); break;
            case 403: lines.push('[Choice Cancel]'); break;
            case 404: lines.push('[End Choices]'); break;
            case 105: lines.push('[Scrolling Text]'); break;
            case 108: lines.push('[Comment]', metadataRawText(args[0])); break;
            case 117: {
                const id = args[0], event = commonEvents.get(id);
                if (!event) metadataDataError(`Referenced Common Event ${id} does not exist.`);
                if (active.has(id)) { lines.push(`[Cycle: Common Event ${id}]`); break; }
                lines.push(`[Common Event ${id}: ${metadataRawText(event.name)}]`);
                active.add(id);
                frames.push({list: event.list, index: 0, commonId: id});
                break;
            }
        }
    }
}

export function extractMetadataText({type, context, data}) {
    const commonEvents = new Map(metadataDatabase(data['CommonEvents.json'], 'CommonEvents').map(event => [event.id, event]));
    const lines = [];
    const pageText = pages => {
        if (!Array.isArray(pages)) metadataDataError('A map event or troop has no pages.');
        pages.forEach((page, index) => { lines.push(`### Page ${index + 1}`); metadataEventText(page.list, commonEvents, lines); lines.push(''); });
    };
    if (type === 'ExportAllMapText' || type === 'ExportCurMapText') {
        const maps = type === 'ExportAllMapText' ? metadataDatabase(data['MapInfos.json'], 'MapInfos') : [{id: context.id, name: ''}];
        for (const info of maps) {
            const map = data[`Map${String(info.id).padStart(3, '0')}.json`];
            if (!map) metadataDataError(`Map ${info.id} was not loaded.`);
            lines.push(`# Map ${String(info.id).padStart(3, '0')}${info.name ? ': ' + metadataRawText(info.name) : ''}`, '');
            for (const event of metadataDatabase(map.events, `Map ${info.id} events`)) {
                lines.push(`## Event ${event.id}: ${metadataRawText(event.name)}`);
                pageText(event.pages);
            }
        }
    } else if (type === 'ExportAllTroopText' || type === 'ExportCurTroopText') {
        const troops = metadataDatabase(data['Troops.json'], 'Troops');
        const selected = type === 'ExportAllTroopText' ? troops : troops.filter(troop => troop.id === context.id);
        if (type === 'ExportCurTroopText' && !selected.length) metadataDataError(`Troop ${context.id} was not loaded.`);
        for (const troop of selected) {
            lines.push(`# Troop ${String(troop.id).padStart(3, '0')}: ${metadataRawText(troop.name)}`);
            pageText(troop.pages);
        }
    } else metadataDataError('This document type does not extract event text.');
    return lines.join('\n') + (lines.length && lines.at(-1) !== '' ? '\n' : '');
}
