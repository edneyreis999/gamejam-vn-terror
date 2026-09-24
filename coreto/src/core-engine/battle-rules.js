function installBattleRules() {
    const countering = new WeakSet();
    const setEnemyAction = Game_Action.prototype.setEnemyAction;
    Game_Action.prototype.setEnemyAction = function(action) {
        if (action?.skillId === 1 && this.subject().attackSkillId() !== 1) this.setAttack();
        else if (action?.skillId === 2 && this.subject().guardSkillId() !== 2) this.setGuard();
        else setEnemyAction.call(this, action);
    };
    const setAttack = Game_Action.prototype.setAttack;
    Game_Action.prototype.setAttack = function() {
        const subject = this.subject();
        if (subject.canAttack() || countering.has(subject)) setAttack.call(this);
        else this.clear();
    };
    const invokeCounterAttack = BattleManager.invokeCounterAttack;
    BattleManager.invokeCounterAttack = function(subject, target) {
        countering.add(target);
        try { return invokeCounterAttack.call(this, subject, target); }
        finally { countering.delete(target); }
    };
    const numRepeats = Game_Action.prototype.numRepeats;
    Game_Action.prototype.numRepeats = function() { return this.item() ? numRepeats.call(this) : 0; };
    Game_Actor.prototype.traitObjects = function() {
        const objects = Game_Battler.prototype.traitObjects.call(this);
        objects.push(...this.equips().filter(Boolean), this.currentClass(), this.actor());
        return objects;
    };
    const usableSkills = Game_Actor.prototype.usableSkills;
    Game_Actor.prototype.usableSkills = function() {
        const types = this.skillTypes();
        return usableSkills.call(this).filter(skill => types.includes(skill.stypeId));
    };
    const makeActionList = Game_Actor.prototype.makeActionList;
    Game_Actor.prototype.makeActionList = function() {
        const actions = makeActionList.call(this).filter(action => action.isValid());
        if (actions.length === 0 && this.canGuard()) {
            const guard = new Game_Action(this);
            guard.setGuard();
            actions.push(guard);
        }
        return actions;
    };
    const makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
    Game_Actor.prototype.makeAutoBattleActions = function() {
        makeAutoBattleActions.call(this);
        this._actions = this._actions.filter(action => action.isValid());
    };
    const checkSubstitute = BattleManager.checkSubstitute;
    BattleManager.checkSubstitute = function(target) {
        if (this._action.subject().isActor() === target.isActor()) return false;
        return checkSubstitute.call(this, target);
    };
    const endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        if (["battleEnd", "aborting", ""].includes(this._phase)) return;
        if (this._subject) return endAction.call(this);
        if (this._phase === "action") this._phase = "turn";
    };
    const isBattleItemEnabled = Window_BattleItem.prototype.isEnabled;
    Window_BattleItem.prototype.isEnabled = function(item) {
        const actor = BattleManager.actor();
        return actor ? actor.canUse(item) : isBattleItemEnabled.call(this, item);
    };
}
