function numericNote(note, label) {
    const match = new RegExp(`<${label}: (\\d+)>`, "i").exec(note);
    return match ? Number(match[1]) : undefined;
}

function readCoreDatabaseNotes(data) {
    if (data === $dataActors) {
        for (const actor of data.filter(Boolean)) {
            const maximum = numericNote(actor.note, "MAX LEVEL");
            if (maximum !== undefined) actor.maxLevel = maximum === 0 ? Number.MAX_SAFE_INTEGER : maximum;
            const initial = numericNote(actor.note, "INITIAL LEVEL");
            if (initial !== undefined) actor.initialLevel = Math.min(initial, actor.maxLevel);
        }
    } else if (data === $dataClasses) {
        for (const profession of data.filter(Boolean)) {
            for (const learning of profession.learnings) {
                const level = numericNote(learning.note, "LEARN AT LEVEL");
                if (level !== undefined) learning.level = Math.max(level, 1);
            }
        }
    } else if (data === $dataEnemies) {
        for (const enemy of data.filter(Boolean)) {
            enemy.level = numericNote(enemy.note, "LEVEL") ?? 1;
            for (const [id, name] of basicParameterNames.entries()) {
                const value = numericNote(enemy.note, name);
                if (value !== undefined) enemy.params[id] = value;
            }
            for (const name of ["exp", "gold"]) {
                const value = numericNote(enemy.note, name);
                if (value !== undefined) enemy[name] = value;
            }
        }
    }
}

function installCoreDatabaseNotes() {
    const onLoad = DataManager.onLoad;
    DataManager.onLoad = function(data, ...args) {
        const result = onLoad.call(this, data, ...args);
        readCoreDatabaseNotes(data);
        return result;
    };
}
