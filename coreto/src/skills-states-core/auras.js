function installSkillsStatesAuras() {
    const notes = new WeakMap();
    function sources(object, aura) {
        let entry = notes.get(object);
        if (!entry || entry.note !== object.note) {
            entry = {note: object.note, aura: [], miasma: []};
            for (const match of object.note.matchAll(/<(Aura|Miasma) States?: ([^>]+)>/gi)) {
                const values = match[2].split(',').map(value => {
                    const text = value.trim();
                    return /^\d+$/.test(text) ? Number(text) : $dataStates.findIndex(state => state?.name.toLowerCase() === text.toLowerCase());
                }).filter(id => id > 0 && $dataStates[id]);
                entry[match[1].toLowerCase()].push(...values);
            }
            notes.set(object, entry);
        }
        return entry[aura ? 'aura' : 'miasma'];
    }
    function allowed(note, aura, emitter, recipient) {
        const type = aura ? 'Aura' : 'Miasma';
        const deadOnly = new RegExp('<Dead ' + type + ' Only>', 'i').test(note);
        const allowDead = new RegExp('<Allow Dead ' + type + '>', 'i').test(note);
        if (emitter.isDead() ? !deadOnly && !allowDead : deadOnly) return false;
        return !aura || emitter !== recipient || !/<Not User Aura>|<Aura Not For User>/i.test(note);
    }
    Game_BattlerBase.AURA_SYSTEM_ENABLED = false;
    const onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        onLoad.call(this, object);
        if ([$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies].includes(object) && object.some(entry => entry && /<(Aura|Miasma) States?: /i.test(entry.note))) Game_BattlerBase.AURA_SYSTEM_ENABLED = true;
    };
    Game_Unit.prototype.getAuraPassiveStateIDs = function(aura, recipient) {
        const ids = [], emitters = this === $gameParty ? this.battleMembers() : this.members();
        for (const emitter of emitters) {
            if (!emitter.isAppeared()) continue;
            for (const object of emitter.passiveStateObjects()) {
                if (!allowed(object.note, aura, emitter, recipient)) continue;
                for (const id of sources(object, aura)) {
                    if (!allowed($dataStates[id].note, aura, emitter, recipient)) continue;
                    ids.push(id);
                    if (!recipient.isStateAffected(id)) recipient.setStateOrigin(id, emitter);
                }
            }
        }
        return ids;
    };
    Game_BattlerBase.prototype.addAuraPassiveStateIDs = function() {
        if (!Game_BattlerBase.AURA_SYSTEM_ENABLED || this.isDead() || !this.isAppeared()) return;
        const own = this._cache.passiveStates;
        const allies = this.friendsUnit().getAuraPassiveStateIDs(true, this);
        const enemies = $gameParty.inBattle() ? this.opponentsUnit().getAuraPassiveStateIDs(false, this) : [];
        this._cache.passiveStates = own.concat(allies, enemies);
    };
    let refreshing = false;
    function refreshRecipients() {
        if (refreshing || !Game_BattlerBase.AURA_SYSTEM_ENABLED || !$gameParty) return;
        refreshing = true;
        try {
            for (const member of [...$gameParty.allMembers(), ...($gameParty.inBattle() ? $gameTroop.members() : [])]) member.refresh();
        } finally { refreshing = false; }
    }
    for (const [owner, methods] of [
        [Game_BattlerBase.prototype, ['setHp','recoverAll','hide','appear']],
        [Game_Battler.prototype, ['addState','removeState']],
        [Game_Actor.prototype, ['changeEquip','changeClass','learnSkill','forgetSkill']],
        [Game_Player.prototype, ['refresh']],
        [Game_Unit.prototype, ['onBattleStart','onBattleEnd']]
    ]) for (const name of methods) {
        const native = owner[name];
        owner[name] = function(...args) {
            const result = native.apply(this, args);
            refreshRecipients();
            return result;
        };
    }
}
