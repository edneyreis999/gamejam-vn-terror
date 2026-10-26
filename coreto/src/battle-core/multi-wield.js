function installBattleMultiWield(sequences) {
    const weaponsForAction = new WeakMap(), activeWeapon = new WeakMap();
    const equips = Game_Actor.prototype.equips;
    Game_Actor.prototype.equips = function() {
        const all = equips.call(this), context = activeWeapon.get(this);
        if (!context) return all;
        return all.map((item, slot) => DataManager.isWeapon(item) && slot !== context.slot ? null : item);
    };
    const param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(id) {
        const context = activeWeapon.get(this);
        return context && id < 2 ? context.maximums[id] : param.call(this, id);
    };
    Game_Actor.prototype.setActiveWeapon = function(slot) {
        if (slot <= 0) activeWeapon.delete(this);
        else {
            const maximums=activeWeapon.get(this)?.maximums??[this.mhp,this.mmp];
            activeWeapon.set(this,{slot:slot-1,maximums});
        }
        this._cache = {};
    };
    Game_Actor.prototype.clearActiveWeapon = function() { this.setActiveWeapon(0); };
    Game_Actor.prototype.nextActiveWeapon = function() {
        const slot=(activeWeapon.get(this)?.slot??-1)+1;
        this.setActiveWeapon(slot+1);
        return DataManager.isWeapon(equips.call(this)[slot]);
    };
    const makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        const targets = makeTargets.call(this), subject = this.subject();
        weaponsForAction.delete(this);
        if (sequences.custom(this.item()) || !this.isAttack() || !subject.isActor() || !subject.isDualWield()) return targets;
        const slots = equips.call(subject).flatMap((item, slot) => DataManager.isWeapon(item) ? [slot] : []);
        if (slots.length < 2) return targets;
        const hits = slots.flatMap(slot => targets.map(target => ({target,slot})));
        weaponsForAction.set(this, {hits,index:0,maximums:[subject.mhp,subject.mmp]});
        this._coretoTargetCount = hits.length;
        return hits.map(hit => hit.target);
    };
    const invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        const currentAction = this._action;
        const action = weaponsForAction.get(currentAction);
        if (!action) {
            try { return invokeAction.call(this,subject,target); }
            finally { if(activeWeapon.has(subject))subject.refresh(); }
        }
        if (activeWeapon.has(subject)) {
            try { return invokeAction.call(this,subject,target); }
            finally { subject.refresh(); }
        }
        const hit = action.hits[action.index++];
        if (!hit) throw new CoreError('BATTLE_WEAPON_CONTEXT', 'The weapon hit has no matching action target.');
        const parent = activeWeapon.get(subject);
        activeWeapon.set(subject, {slot:hit.slot,maximums:action.maximums});
        subject._cache = {};
        try {
            return invokeAction.call(this, subject, target);
        }
        finally {
            if (parent) activeWeapon.set(subject, parent);
            else activeWeapon.delete(subject);
            subject.refresh();
            if (action.index === action.hits.length) weaponsForAction.delete(currentAction);
        }
    };
}
