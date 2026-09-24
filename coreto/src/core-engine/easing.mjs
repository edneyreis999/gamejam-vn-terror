function bounceOut(t) {
    const divisor = 2.75;
    if (t < 1 / divisor) return 7.5625 * t * t;
    if (t < 2 / divisor) return 7.5625 * (t - 1.5 / divisor) ** 2 + 0.75;
    if (t < 2.5 / divisor) return 7.5625 * (t - 2.25 / divisor) ** 2 + 0.9375;
    return 7.5625 * (t - 2.625 / divisor) ** 2 + 0.984375;
}

function elasticOut(t) {
    const period = 0.3;
    return 2 ** (-10 * t) * Math.sin((t - period / 4) * 2 * Math.PI / period) + 1;
}

function easingIn(t, family, back = 1.70158) {
    const powers = { QUAD: 2, CUBIC: 3, QUART: 4, QUINT: 5 };
    if (family in powers) return t ** powers[family];
    switch (family) {
        case "SINE": return 1 - Math.cos(t * Math.PI / 2);
        case "EXPO": return t === 0 ? 0 : 2 ** (10 * (t - 1));
        case "CIRC": return 1 - Math.sqrt(1 - t * t);
        case "BACK": return t * t * ((back + 1) * t - back);
        case "ELASTIC": return -(2 ** (10 * (t - 1)) * Math.sin((t - 1 - 0.075) * 2 * Math.PI / 0.3));
        case "BOUNCE": return 1 - bounceOut(1 - t);
    }
}

export function applyEasing(t, type) {
    const name = type.toUpperCase();
    const match = name.match(/^(INOUT|IN|OUT)(SINE|QUAD|CUBIC|QUART|QUINT|EXPO|CIRC|BACK|ELASTIC|BOUNCE)$/);
    if (!match || t === 0 || t === 1) return t;
    const [, direction, family] = match;
    if (direction === "IN") return easingIn(t, family);
    if (direction === "OUT") {
        // The reference's OutElastic progresses twice as fast as its InOut half.
        if (family === "ELASTIC") return elasticOut(t * 2);
        return 1 - easingIn(1 - t, family);
    }
    const back = family === "BACK" ? 1.70158 * 1.525 : 1.70158;
    if (t < 0.5) return easingIn(t * 2, family, back) / 2;
    if (family === "ELASTIC") return elasticOut(t * 2 - 1) / 2 + 0.5;
    return 1 - easingIn(2 - t * 2, family, back) / 2;
}
