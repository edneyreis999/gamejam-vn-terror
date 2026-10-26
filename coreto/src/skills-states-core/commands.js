function installSkillsStatesCommands() {
    // Native :eval fields use script completion, once per command, before selecting battlers.
    function convert(output, raw) {
        for (const storageKey of Object.keys(raw)) {
            const [key, type] = storageKey.split(':');
            if (type === 'num') output[key] = Number(raw[storageKey]);
            else if (type === 'arraynum') output[key] = raw[storageKey] ? JSON.parse(raw[storageKey]).map(Number) : [];
            else if (type === 'eval') output[key] = raw[storageKey] === '' ? null : eval(raw[storageKey]);
        }
        return output;
    }
    for (const receiver of [catalog.pluginId, 'VisuMZ_1_SkillsStatesCore']) {
        for (const command of catalog.commands) {
            PluginManager.registerCommand(receiver, command.key, function(raw) {
                const enemy = command.key.includes('Enemy');
                const cost = command.key.startsWith('Skill');
                if (enemy && !cost && !$gameParty.inBattle()) return;
                const args = convert.call(globalThis.VisuMZ, raw, raw);
                const skill = $dataSkills[args.SkillID];
                const state = $dataStates[args.StateID];
                if (cost ? !skill : !state) return;
                const ids = args[enemy ? 'EnemyIndex' : 'ActorIDs'] || [];
                for (const id of ids) {
                    const battler = enemy ? $gameTroop.members()[id] : $gameActors.actor(id);
                    if (!battler) continue;
                    if (cost) { battler.paySkillCost(skill); continue; }
                    const turns = Number(args.Turns);
                    const add = args.AutoAddState && !battler.isStateAffected(args.StateID);
                    if (add) battler.addState(args.StateID);
                    if (add || command.key.endsWith('To')) battler.setStateTurns(args.StateID, Math.max(turns, 0));
                    else battler.addStateTurns(args.StateID, turns);
                }
            });
        }
    }
}
