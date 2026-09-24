function installBattleQuality(settings) {
    const qol = settings.QoL;
    const isPreserveTp = Game_Actor.prototype.isPreserveTp;
    Game_Actor.prototype.isPreserveTp = function() {
        return !$gameParty.inBattle() || isPreserveTp.call(this);
    };
    const onBattleStart = Game_Unit.prototype.onBattleStart;
    Game_Unit.prototype.onBattleStart = function(...args) {
        this._inBattle = true;
        return onBattleStart.apply(this, args);
    };
    const onBattleEnd = Game_Unit.prototype.onBattleEnd;
    Game_Unit.prototype.onBattleEnd = function(...args) {
        for (const member of this.members()) {
            if (!member.isPreserveTp()) member.clearTp();
        }
        return onBattleEnd.apply(this, args);
    };
    Game_Party.prototype.setupBattleTestItems = function() {
        for (const [enabled, items] of [[qol.BTestItems, $dataItems], [qol.BTestWeapons, $dataWeapons], [qol.BTestArmors, $dataArmors]]) {
            if (!enabled) continue;
            for (const item of items) {
                if (item && !(item.name.trim() <= 0) && !/-----/i.test(item.name)) this.gainItem(item, qol.BTestAddedQuantity);
            }
        }
    };
    const processEscape = BattleManager.processEscape;
    BattleManager.processEscape = function() {
        if (!qol.EscapeAlways) return processEscape.call(this);
        $gameParty.performEscape();
        SoundManager.playEscape();
        this.onEscapeSuccess();
        return true;
    };
    Game_Action.prototype.subjectHitRate = function() {
        if (qol.AccuracyBoost && this.isItem()) return 1;
        if (!this.isPhysical()) return 1;
        return this.subject().hit + (qol.AccuracyBoost && this.subject().isActor() ? 0.05 : 0);
    };
    Game_Action.prototype.targetEvaRate = function(target) {
        if (this.subject().isActor() === target.isActor()) return 0;
        if (this.isPhysical()) return target.eva - (qol.AccuracyBoost && target.isEnemy() ? 0.05 : 0);
        if (this.isMagical()) return target.mev;
        return 0;
    };
    const itemHit = Game_Action.prototype.itemHit;
    const itemEva = Game_Action.prototype.itemEva;
    Game_Action.prototype.itemHit = function(target) {
        return qol.ImprovedAccuracySystem ? this.item().successRate * 0.01 * (this.subjectHitRate() - this.targetEvaRate(target)) : itemHit.call(this, target);
    };
    Game_Action.prototype.itemEva = function(target) {
        return qol.ImprovedAccuracySystem ? 0 : itemEva.call(this, target);
    };
    const changingClass = new WeakSet();
    const changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(...args) {
        changingClass.add(this);
        try { return changeClass.apply(this, args); }
        finally { changingClass.delete(this); }
    };
    const levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function(...args) {
        const result = levelUp.apply(this, args);
        if (!changingClass.has(this)) {
            if (qol.LevelUpFullHp) this._hp = this.mhp;
            if (qol.LevelUpFullMp) this._mp = this.mmp;
        }
        return result;
    };
}
