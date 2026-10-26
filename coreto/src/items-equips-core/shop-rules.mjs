export function itemShopFixedPrice(note, heading, fallback) {
    const match = new RegExp('<' + heading + ': (\\d+)>', 'i').exec(note || '');
    return match ? Number(match[1]) : fallback;
}

export function itemShopSwitches(note, heading) {
    const match = new RegExp('<' + heading + ' SWITCH(?:|ES): (.*)>', 'i').exec(note || '');
    return match ? match[1].split(',').map(Number) : null;
}

export function itemShopVisible(note, value) {
    for (const [prefix, mode, hide] of [['SHOW SHOP (?:ALL |)', 'all', false], ['SHOW SHOP ANY ', 'any', false], ['HIDE SHOP (?:ALL |)', 'all', true], ['HIDE SHOP ANY ', 'any', true]]) {
        const match = new RegExp('<' + prefix + 'SWITCH(?:|ES): (.*)>', 'i').exec(note || '');
        if (!match) continue;
        const ids = match[1].split(',').map(Number), passes = mode === 'all' ? ids.every(value) : ids.some(value);
        if (hide ? passes : !passes) return false;
    }
    return true;
}

export function itemShopSellable(note, value, nativeEnabled) {
    if (/<CANNOT SELL>/i.test(note || '')) return false;
    if (/<CAN SELL>/i.test(note || '')) return true;
    for (const mode of ['', ' ALL', ' ANY']) {
        const match = new RegExp('<CANNOT SELL' + mode + ' (?:SW|SWITCH|SWITCHES): *(\\d+(?:\\s*,\\s*\\d+)*)>', 'i').exec(note || '');
        if (!match) continue;
        const ids = match[1].match(/\d+/g).map(Number);
        if (mode === ' ANY' ? ids.some(value) : ids.some(id => !value(id))) return false;
    }
    return nativeEnabled;
}

export function itemShopIncluded(item, blacklist, whitelist) {
    if (!item.name.trim() || /-----/.test(item.name)) return false;
    if (blacklist.some(category => category && item.categories.includes(category))) return false;
    return whitelist.length === 0 || whitelist.some(category => category && item.categories.includes(category));
}
