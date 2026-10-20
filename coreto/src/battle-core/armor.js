function installBattleArmor() {
    Game_Action.prototype.applyArmorModifiers = function(target, value) {
        const kind = this.isPhysical() ? 'Armor' : 'Magic';
        const defender = battleNotes(target), attacker = battleNotes(this.subject());
        value -= battleTagSum(defender, kind + ' Reduction');
        value -= battleTagSum(attacker, kind + ' Penetration');
        value -= battleTagSum([this.item()], kind + ' Penetration');
        if (value > 0) {
            value *= 1 - battleTagSum(defender, kind + ' Reduction', true);
            value *= 1 - battleTagSum(attacker, kind + ' Penetration', true);
            // The 1.90 item contract uses the authored percentage as a raw multiplier.
            value *= 1 - battleTagSum([this.item()], kind + ' Penetration', true) * 100;
        }
        return value;
    };
}
