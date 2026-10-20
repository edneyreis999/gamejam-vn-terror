function installBattleFlinch() {
    const flinching = new WeakSet();
    const clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        flinching.delete(this);
        return clear.call(this);
    };
    const apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        const value = apply.call(this, target);
        if (/<DAMAGE FLINCH>/i.test(this.item().note)) flinching.add(target.result());
        return value;
    };
    const displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target) {
        const result = target.result();
        displayDamage.call(this, target);
        if (flinching.has(result) && result.isHit() && !result.hpAffected && (result.mpDamage > 0 || result.tpDamage > 0)) this.push('performDamage', target);
    };
}
