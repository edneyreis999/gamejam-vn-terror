export function itemClassSlots(note, names, battleTest = false) {
    const types = names.map(name => name ? name.trim() : '');
    const block = !battleTest && /<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i.exec(note || '');
    const slots = block ? block[1].split(/[\r\n]+/) : types;
    return slots.map(name => types.indexOf(name.trim())).filter(id => id > 0);
}

export function itemRequirementComparison(value, operator, threshold) {
    switch (operator) {
    case '>': return value > threshold;
    case '>=': return value >= threshold;
    case '===': return value === threshold;
    case '<=': return value <= threshold;
    case '<': return value < threshold;
    }
    return false;
}

export function itemEquipLimit(note, kind) {
    const match = new RegExp('<EQUIP ' + kind + ' LIMIT: (\\d+)>', 'i').exec(note || '');
    return match ? Number(match[1]) : null;
}
