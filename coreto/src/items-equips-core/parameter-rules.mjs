export function itemEquipmentParameter(note, name, fallback) {
    const match = new RegExp('<' + name + ': ([+-]\\d+)>', 'i').exec(note || '');
    return match ? Number(match[1]) : fallback;
}

export function itemAdjustedVitals(hp, mp, mhp, mmp, hpRate, mpRate) {
    return [hp > 0 ? Math.round(hpRate * mhp) : hp, mp > 0 ? Math.round(mpRate * mmp) : mp];
}
