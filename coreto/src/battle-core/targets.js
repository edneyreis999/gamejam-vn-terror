function installBattleTargets() {
    const onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        onLoad.call(this, object);
        if (object !== $dataSkills && object !== $dataItems) return;
        for (const item of object.filter(Boolean)) {
            const scope = item.note.match(/<TARGET: ([^>]+)>/i);
            if (scope && /^(\d+ RANDOM (ANY|ENEMIES|ALLIES)|ALL ALLIES BUT USER|ALLY OR ENEMY|ENEMY OR ALLY)$/i.test(scope[1])) item.scope = scope[1].toUpperCase();
            const repeats = item.note.match(/<REPEAT HITS: (\d+)>/i);
            if (repeats) item.repeats = Number(repeats[1]);
        }
    };
    Game_Action.prototype.isForAnyone = function() { return this.isBattleCoreTargetScope() && this.item().scope.match(/ALLY/); };
    Game_Action.prototype.isForAnyoneFocusOpponents = function() { return this.item()?.scope==='ENEMY OR ALLY'; };
    Game_Action.prototype.isForAnyoneFocusFriends = function() { return this.item()?.scope==='ALLY OR ENEMY'; };
    Game_Action.prototype.isForNotUser = function() { return this.item()?.note.match(/<CANNOT TARGET USER>/i) ?? null; };
    Game_Action.prototype.isForOpponentBattleCore = function() {
        const scope=this.item()?.scope;
        return typeof scope==='string' ? (/RANDOM ANY/.test(scope) || scope.match(/ENEM(?:Y|IES)/)) : null;
    };
    Game_Action.prototype.isBattleCoreTargetScope = function() { return typeof this.item()?.scope === 'string'; };
    Game_Action.prototype.isForRandomBattleCore = function() { return this.isBattleCoreTargetScope() && /RANDOM/.test(this.item().scope); };
    for (const [name,pattern] of [
        ['isForOpponent',/ENEM|ANY/],['isForFriend',/ALL|ALLY/],
        ['isForOne',/^(ALLY OR ENEMY|ENEMY OR ALLY)$/],['needsSelection',/^(ALLY OR ENEMY|ENEMY OR ALLY)$/],
        ['isForRandom',/RANDOM/],['isForAll',/^$/],['isForUser',/^$/],
        ['isForAliveFriend',/ALL|ALLY/],['isForDeadFriend',/^$/],['isForEveryone',/RANDOM ANY/]
    ]) {
        const original = Game_Action.prototype[name];
        Game_Action.prototype[name] = function() { return this.isBattleCoreTargetScope() ? pattern.test(this.item().scope) : original.call(this); };
    }
    Game_Action.prototype.applyTargetFilters = function(targets) {
        if (!/<CANNOT TARGET USER>/i.test(this.item().note)) return targets;
        const user = this.subject(), alternatives = this.friendsUnit().aliveMembers().filter(member => member !== user);
        if (this.isForAll()) return targets.filter(target => target !== user);
        return targets.map(target => target === user ? alternatives[Math.randomInt(alternatives.length)] : target).filter(Boolean);
    };
    Game_Action.prototype.makeTargetsBattleCore = function() {
        const scope = this.item().scope, random = scope.match(/^(\d+) RANDOM (ANY|ENEMIES|ALLIES)$/);
        if (random) {
            const targets = [];
            for (let index = 0; index < Number(random[1]); index++) {
                let unit = this.friendsUnit();
                if (random[2] === 'ENEMIES' || (random[2] === 'ANY' && Math.random() < 0.5)) unit = this.opponentsUnit();
                const members = unit.aliveMembers();
                targets.push(members[Math.randomInt(members.length)]);
            }
            return targets;
        }
        if (scope === 'ALL ALLIES BUT USER') return this.friendsUnit().aliveMembers().filter(member => member !== this.subject());
        return this.targetsForOpponents();
    };
    Game_Action.prototype.makeTargetsBattleCoreJS = function(targets) {
        return runBattleNote(this, this.item(), 'JS Targets', this.subject(), targets, 'targets');
    };
    const makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        if (!this.item()) return [];
        const targets = this.isBattleCoreTargetScope() && (this._forcing || !this.subject().isConfused())
            ? this.repeatTargets(this.makeTargetsBattleCore()) : makeTargets.call(this);
        const result = this.applyTargetFilters(this.makeTargetsBattleCoreJS(targets));
        this._coretoTargetCount = result.length;
        return result;
    };
    Game_Action.prototype.shouldDisperseDamage = function() { return !!this.item() && $gameParty.inBattle() && /<DISPERSE DAMAGE>/i.test(this.item().note); };
    Game_Action.prototype.disperseDamage = function(value) {
        if (!this.shouldDisperseDamage()) return value;
        value /= Math.max(this._coretoTargetCount ?? 1, 1);
        if (this.isAttack()) value *= this.subject().attackTimesAdd() + 1;
        return Math.sign(value) * Math.ceil(Math.abs(value));
    };
}
