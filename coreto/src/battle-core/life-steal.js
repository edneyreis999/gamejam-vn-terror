function installBattleLifeSteal() {
    Game_Action.prototype.isCancelLifeSteal = function(target, kind) {
        return this.isDrain() ||
            battleHasTag([this.item()], `Cancel (?:${kind} )?Life Steal`) ||
            battleHasTag(battleNotes(this.subject()), `Disarm (?:${kind} )?Life Steal`) ||
            battleHasTag(battleNotes(target), `Guard (?:${kind} )?Life Steal`);
    };
    Game_Action.prototype.lifeStealRate = function(target, kind) {
        if (this.isCancelLifeSteal(target, kind)) return 0;
        const category = this.isPhysical() ? 'Physical Hit' : this.isMagical() ? 'Magical Hit' : 'Certain Hit';
        return battleTagSum([this.item()], `${kind} Life Steal`, true, {decimal:false}) +
            battleTagSum(battleNotes(this.subject()), `${kind} Life Steal ${category}`, true, {signed:true,stack:true,decimal:false});
    };
    Game_Action.prototype.performLifeSteal = function(target, value, kind) {
        if (value <= 0) return;
        const amount = Math.floor(value * this.lifeStealRate(target, kind));
        if (amount !== 0) this.subject()[kind === 'HP' ? 'gainHp' : 'gainMp'](amount);
    };
    for (const [method,kind] of [['executeHpDamage','HP'],['executeMpDamage','MP']]) {
        const original = Game_Action.prototype[method];
        Game_Action.prototype[method] = function(target, value) {
            const dealt = kind === 'MP' && !this.isMpRecover() ? Math.min(target.mp, value) : value;
            const result = original.call(this, target, value);
            this.performLifeSteal(target, dealt, kind);
            return result;
        };
    }
}
