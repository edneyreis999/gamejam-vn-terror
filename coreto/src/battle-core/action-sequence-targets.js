function battleSequenceTargets(specifiers, context) {
    const user = context.subject, targets = context.targets, target = targets[context.index];
    const actors = $gameParty.battleMembers(), enemies = $gameTroop.members(), battlers = actors.concat(enemies);
    const result = [];
    for (const raw of specifiers) {
        const name = raw.toLowerCase().trim();
        let selected = [];
        if (name === 'user') selected = [user];
        else if (name === 'target' || name === 'current target') selected = [target];
        else if (name === 'prev target') selected = [targets[context.index - 1] ?? target];
        else if (name === 'next target') selected = [targets[context.index + 1] ?? target];
        else if (name === 'special' || /special .*?>/i.test(name)) selected = [target];
        else if (name === 'all targets') selected = targets;
        else if (name === 'focus') selected = [user,...targets];
        else if (name === 'not focus') selected = battlers.filter(battler=>battler.isAlive()&&battler!==user&&!targets.includes(battler));
        else {
            if (!/^(?:alive|dead) (?:friends|opponents|actors|enemies|battlers)(?: not (?:user|target))?$/.test(name) && !/^(?:friend|opponent|actor|enemy) index \d+$/.test(name) && !/^(?:actor|enemy) id \d+$/.test(name)) continue;
            const group = /\b(friends?|opponents?|actors?|enemies|enemy|battlers?)\b/.exec(name)?.[1];
            const unit = /^friend/.test(group) ? user?.friendsUnit().members() : /^opponent/.test(group) ? user?.opponentsUnit().members() : /^actor/.test(group) ? actors : /^(enemy|enemies)/.test(group) ? enemies : /^battler/.test(group) ? battlers : [];
            const index = /index (\d+)/.exec(name), id = /id (\d+)/.exec(name);
            if (index) selected = [unit?.[Number(index[1])]];
            else if (id && group === 'actor') selected = [$gameActors.actor(Number(id[1]))];
            else if (id) selected = unit?.filter(battler=>(battler.isActor()?battler.actorId():battler.enemyId())===Number(id[1])) ?? [];
            else selected = unit?.filter(battler=>name.startsWith('dead ')?battler.isDead():battler.isAlive()) ?? [];
            if (name.endsWith('not user')) selected = selected.filter(battler=>battler!==user);
            if (name.endsWith('not target')) selected = selected.filter(battler=>battler!==target);
        }
        for (const battler of selected) if (battler) result.push(battler);
    }
    return result;
}
