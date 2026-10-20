function installBattleActionEffects(settings) {
    const mechanics = settings.Mechanics;
    const applications = new WeakMap(), lastHpDamage = new WeakMap(), totals = new WeakMap();
    Game_Action.prototype.applyBattleCoreJS=function(key,target,value,readOnly){
        key=key.replace('%1','');
        const result=mechanics[key].call(this,value,target);
        return runBattleActionNotes(this,key,target,readOnly?value:result,readOnly);
    };
    Game_Action.prototype.actionBattleCoreJS=function(key){
        const value=totals.get(this)??0;
        mechanics[key].call(this,value);
        runBattleActionNotes(this,key,this.subject(),value);
    };
    Game_Action.prototype.getLastHpDamage = function(target) { return lastHpDamage.get(this)?.get(target) ?? 0; };
    const apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        const parent = applications.get(this), current = {value:0};
        applications.set(this, current);
        try {
            this.applyBattleCoreJS("PreApply%1JS",target,0,true);
            const result = apply.call(this, target);
            this.applyBattleCoreJS("PostApply%1JS",target,current.value,true);
            const hpDamage = target.result().hpDamage;
            const variable = hpDamage > 0 ? mechanics.VariableDmg : mechanics.VariableHeal;
            if (variable && hpDamage) $gameVariables.setValue(variable, $gameVariables.value(variable) + Math.abs(hpDamage));
            if (mechanics.SwitchCritical && target.result().critical) $gameSwitches.setValue(mechanics.SwitchCritical, true);
            if (mechanics.SwitchMissEvade && (target.result().missed || target.result().evaded)) $gameSwitches.setValue(mechanics.SwitchMissEvade, true);
            return result;
        } finally {
            if (parent) applications.set(this, parent);
            else applications.delete(this);
        }
    };
    const executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        value=this.applyBattleCoreJS("PreDamage%1JS",target,value,false);
        value = this.applyDamageCaps(this.disperseDamage(value));
        value = Math.sign(value) * Math.ceil(Math.abs(value));
        const result = executeDamage.call(this, target, value);
        totals.set(this, (totals.get(this) ?? 0) + value);
        const current = applications.get(this);
        if (current) current.value = value;
        if (this.isHpEffect()) {
            if (!lastHpDamage.has(this)) lastHpDamage.set(this, new WeakMap());
            lastHpDamage.get(this).set(target, value);
        }
        this.applyBattleCoreJS("PostDamage%1JS",target,value,true);
        return result;
    };
    const startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        const action = this._subject.currentAction();
        totals.set(action, 0);
        action.actionBattleCoreJS("PreStartActionJS");
        for (const id of [mechanics.SwitchCritical, mechanics.SwitchMissEvade]) if (id) $gameSwitches.setValue(id, false);
        for (const id of [mechanics.VariableDmg, mechanics.VariableHeal]) if (id) $gameVariables.setValue(id, 0);
        const result = startAction.call(this);
        action.actionBattleCoreJS("PostStartActionJS");
        return result;
    };
    const endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        const action = this._action;
        if (!action || this._phase !== 'action') return endAction.call(this);
        action.actionBattleCoreJS("PreEndActionJS");
        const result = endAction.call(this);
        action.actionBattleCoreJS("PostEndActionJS");
        totals.delete(action);
        return result;
    };

}
