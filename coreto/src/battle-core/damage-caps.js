function installBattleDamageCaps(settings) {
    const damage = settings.Damage;
    Game_BattlerBase.prototype.hardDamageCap = function() {
        const values = battleNotes(this).map(object => Number(object.note.match(/<DAMAGE CAP: (\d+)>/i)?.[1] ?? 0));
        return Math.max(damage.DefaultHardCap, ...values);
    };
    Game_BattlerBase.prototype.softDamageCapRate = function() {
        return damage.DefaultSoftCap + battleTagSum(battleNotes(this), 'Soft Damage Cap', true, {signed:true,decimal:false});
    };
    Game_Action.prototype.getHardDamageCap = function() {
        const cap = this.item().note.match(/<DAMAGE CAP: (\d+)>/i);
        return cap ? Number(cap[1]) : this.subject().hardDamageCap();
    };
    Game_Action.prototype.isBypassDamageCap = function() {
        return !damage.EnableDamageCap || battleHasTag([this.item(), ...battleNotes(this.subject())], 'Bypass Damage Cap');
    };
    Game_Action.prototype.applyHardDamageCap = function(value) { return Math.min(value, this.getHardDamageCap()); };
    Game_Action.prototype.applySoftDamageCap = function(value) {
        const hard = this.getHardDamageCap();
        const rate = Math.max(0.01, this.subject().softDamageCapRate() + battleTagSum([this.item()], 'Soft Damage Cap', true, {signed:true,decimal:false}));
        const soft = hard * rate;
        if (value <= soft) return value;
        const excess = value - soft, scale = (hard - soft) * damage.DefaultSoftScaler;
        return soft + Math.max(excess * scale / (excess + scale), excess * 0.01);
    };
    Game_Action.prototype.applyDamageCaps = function(value) {
        if (this.isBypassDamageCap()) return value;
        const sign = Math.sign(value);
        value = Math.abs(value);
        if (damage.EnableSoftCap && !battleHasTag([this.item(), ...battleNotes(this.subject())], 'Bypass Soft Damage Cap')) value = this.applySoftDamageCap(value);
        return sign * this.applyHardDamageCap(value);
    };
}
