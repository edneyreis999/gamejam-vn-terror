export const independentRoutePatterns = [
    'SELF SWITCH (?:[ABCD]|\\d+): (?:ON|OFF|TRUE|FALSE|TOGGLE)', 'SELF VARIABLE \\d+: [+-]?\\d+(?:\\.\\d+)?',
    'ANIMATION: \\d+', 'BALLOON: .+', 'FADE (?:IN|OUT): \\d+',
    'FORCE (?:DASH|DASHING|RUN|RUNNING): (?:TRUE|ON|FALSE|OFF)', 'HUG: (?:LEFT|RIGHT)',
    'FORCE (?:CARRY|CARRYING|HOLD|HOLDING): (?:TRUE|ON|FALSE|OFF)', 'PATTERN LOCK: \\d+', 'PATTERN UNLOCK', 'POSE: (?:Item|Hmph|Victory|Hurt|Kneel|Collapse|Exclamation|Question|!|\\?|Music Note|Heart|Anger|Sweat|Cobweb|Silence|Light Bulb|Sleep|ZZZ)',
    'INDEX: [+-]?\\d+', 'JUMP FORWARD: \\d+',
    '(?:(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH|AVOID|EVADE|DODGE) )?MOVE (?:LOWER LEFT|DOWN|LOWER RIGHT|LEFT|RIGHT|UPPER LEFT|UP|UPPER RIGHT) UNTIL STOP',
    'MOVE (?:LOWER LEFT|DOWN|LOWER RIGHT|LEFT|RIGHT|UPPER LEFT|UP|UPPER RIGHT): \\d+',
    'OPACITY: (?:\\d+[%％]|[+-]\\d+[%％]?)', 'TURN (?:LOWER LEFT|LOWER RIGHT|UPPER LEFT|UPPER RIGHT)',
    '(?:(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH|AVOID|EVADE|DODGE) )?(?:JUMP TO|MOVE TO|STEP TOWARD|STEP AWAY FROM|TURN TO|TURN AWAY FROM|TELEPORT TO)(?::\\s*\\d+\\s*[, ]\\s*\\d+| EVENT: \\d+| (?:PLAYER|HOME))'
];
export function independentRouteSupported(script) {
    if (typeof script !== 'string') return false;
    const resolved = script.replace(/\\(?:V|SELFVAR)\[\d+\]|\$gameVariables\.value\(\d+\)/gi, '0');
    return independentRoutePatterns.some(pattern => new RegExp('^(?:' + pattern + ')$', 'i').test(resolved));
}
