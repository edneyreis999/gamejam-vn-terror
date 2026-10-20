function installBattleDamage(settings) {
    const damage = settings.Damage;
    const styles = new Map(damage.DamageStyleList.map(style => [style.Name.toUpperCase(), style]));
    VisuMZ.DamageStyles = Object.fromEntries(styles);
    DataManager.getDamageStyle = function(item) {
        const tagged = item.note.match(/<DAMAGE STYLE: (.*)>/i)?.[1].toUpperCase().trim();
        if (tagged === 'MANUAL' || styles.has(tagged)) return tagged;
        const fallback = damage.DefaultDamageStyle.toUpperCase().trim();
        return styles.has(fallback) ? fallback : 'MANUAL';
    };
    Window_ShopStatus.prototype.getItemDamageAmountLabelBattleCore = function() {
        const style = styles.get(DataManager.getDamageStyle(this._item));
        if (!style) return this.getItemDamageAmountLabelOriginal();
        const type = this._item.damage.type;
        const resource = [null, TextManager.hp, TextManager.mp, TextManager.hp, TextManager.mp, TextManager.hp, TextManager.mp][type];
        return style['DamageType' + type].format(resource);
    };
    Window_ShopStatus.prototype.getItemDamageAmountTextBattleCore = function() {
        const style = styles.get(DataManager.getDamageStyle(this._item));
        return style ? style.DamageDisplay.call(this) : this.getItemDamageAmountTextOriginal();
    };
    Game_Action.prototype.damageStyle = function() {
        return (this.item().note.match(/<DAMAGE STYLE: (.*?)>/i)?.[1] ?? 'Manual').toUpperCase();
    };
    const nativeFormula = Game_Action.prototype.evalDamageFormula;
    Game_Action.prototype.evalDamageFormula = function(target) {
        const name = this.item().note.match(/<DAMAGE STYLE: (.*?)>/i)?.[1] ?? damage.DefaultDamageStyle;
        const style = styles.get(name.toUpperCase());
        if (!style) return nativeFormula.call(this, target);
        try {
            const value = style.Formula.call(this, target);
            return Number.isNaN(value) ? 0 : value;
        }
        catch (cause) {
            console.error(`[BATTLE_DAMAGE_FORMULA] ${this.item().name} (${this.item().id}), style ${style.Name}`, cause);
            return nativeFormula.call(this, target);
        }
    };
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        return damage.OverallFormulaJS.call(this, target, critical);
    };
    Game_Action.prototype.applyVariance = function(value, variance) { return damage.VarianceFormulaJS.call(this, value, variance); };
    Game_Action.prototype.applyGuard = function(value, target) { return damage.GuardFormulaJS.call(this, value, target); };
    Game_Action.prototype.applyCritical = function(value) { return damage.CriticalHitMultiplier.call(this, value); };
    Game_Action.prototype.itemCri = function(target) {
        if (!this.item().damage.critical) return 0;
        let rate = damage.CriticalHitRateJS.call(this, target);
        if ($gameParty.inBattle()) {
            for (const object of battleNotes(this.subject())) rate = runBattleNote(this, object, 'JS Critical Rate as User', target, rate, 'rate');
            for (const object of battleNotes(target)) rate = runBattleNote(this, object, 'JS Critical Rate as Target', target, rate, 'rate');
        }
        return rate;
    };
    const itemHit = Game_Action.prototype.itemHit;
    Game_Action.prototype.itemHit = function(target) {
        const note = this.item().note;
        if (/<ALWAYS HIT>/i.test(note)) return 1;
        const fixed = note.match(/<ALWAYS HIT RATE: (\d+)[%％]>/i);
        if (fixed) return Number(fixed[1]) / 100;
        let rate = itemHit.call(this, target);
        if ($gameParty.inBattle()) {
            rate = runBattleNote(this, this.item(), 'JS Accuracy', target, rate, 'rate');
            for (const object of battleNotes(this.subject())) rate = runBattleNote(this, object, 'JS Accuracy as User', target, rate, 'rate');
            for (const object of battleNotes(target)) rate = runBattleNote(this, object, 'JS Accuracy as Target', target, rate, 'rate');
        }
        return rate;
    };
    const itemEva = Game_Action.prototype.itemEva;
    Game_Action.prototype.itemEva = function(target) {
        return /<ALWAYS HIT(?: RATE: \d+[%％])?>/i.test(this.item().note) ? 0 : itemEva.call(this, target);
    };
}
