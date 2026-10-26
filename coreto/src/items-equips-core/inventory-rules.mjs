export function itemSwitchEnabled(note, value) {
    for (const [verb, mode] of [['ENABLE', ''], ['ENABLE', 'ALL'], ['ENABLE', 'ANY'], ['DISABLE', ''], ['DISABLE', 'ALL'], ['DISABLE', 'ANY']]) {
        const expression = new RegExp('<' + verb + (mode ? ' ' + mode : '') + ' (?:SW|SWITCH|SWITCHES): *(\\d+(?:\\s*,\\s*\\d+)*)>', 'i');
        const match = expression.exec(note || '');
        if (!match) continue;
        const states = match[1].match(/\d+/g).map(id => value(Number(id)));
        const enabled = mode === 'ANY' ? states.some(Boolean) : states.every(Boolean);
        return verb === 'ENABLE' ? enabled : !enabled;
    }
    return true;
}

export function itemNoteCategories(note) {
    const result = [];
    for (const match of (note || '').matchAll(/<(?:CATEGORY|CATEGORIES): (.*)>/gi)) {
        result.push(...match[1].toUpperCase().trim().split(',').map(value => value.trim()));
    }
    const block = /<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i.exec(note || '');
    if (block) result.push(...block[1].split(/[\r\n]+/).map(value => value.toUpperCase().trim()));
    return result;
}

export function itemSortPriority(note) {
    const match = /<(?:|ID )SORT(?:|ING) PRIORITY: (\d+)>/i.exec(note || '');
    return match ? Number(match[1]) : 50;
}

export function itemMaximum(note, fallback) {
    const match = /<MAX: (\d+)>/i.exec(note || '');
    return match ? Number(match[1]) : fallback;
}

export function itemConserved(note, random) {
    const match = /<(?:CONSERVE|PRESERVE): (\d+)[%％]>/i.exec(note || '');
    return !!match && random() < Number(match[1]) / 100;
}
