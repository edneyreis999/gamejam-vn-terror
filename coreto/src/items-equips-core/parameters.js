function installItemsParameters(api) {
    const names = ['MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
    api.paramJS = {};
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        for (const database of [$dataWeapons, $dataArmors]) for (const item of database) {
            if (!item) continue;
            for (const [index, name] of names.entries()) item.params[index] = itemEquipmentParameter(item.note, name, item.params[index]);
            const block = /<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i.exec(item.note || '');
            if (!block) continue;
            const callback = new Function('item', 'paramId',
                'let MaxHP=0, MaxMP=0, ATK=0, DEF=0, MAT=0, MDF=0, AGI=0, LUK=0;\n' +
                'const user=this, target=this, a=this, b=this;\n' +
                'try {\n' + block[1] + '\n} catch(error) { if($gameTemp.isPlaytest()) console.log(error); }\n' +
                'return [MaxHP,MaxMP,ATK,DEF,MAT,MDF,AGI,LUK][paramId];');
            const key = (database === $dataWeapons ? 'W' : 'A') + item.id;
            for (const [index, name] of names.entries()) if (new RegExp('\\b' + name + '\\b').test(block[1])) api.paramJS[key + '-' + index] = callback;
        }
    };
    Game_Actor.prototype.paramPlusItemsEquipsCoreCustomJS = function(item, paramId) {
        if (this._calculatingJSParameters) return 0;
        const callback = api.paramJS[(DataManager.isWeapon(item) ? 'W' : 'A') + item.id + '-' + paramId];
        if (!callback) return 0;
        this._calculatingJSParameters = true;
        try { return callback.call(this, item, paramId); }
        finally { this._calculatingJSParameters = false; }
    };
    const paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function(paramId) {
        let value = paramPlus.call(this, paramId);
        for (const item of this.equips()) if (item) value += this.paramPlusItemsEquipsCoreCustomJS(item, paramId);
        return value;
    };
    Game_Actor.prototype.equipAdjustHpMp = function(previous) {
        if (this._tempActor || !api.settings.EquipScene.EquipAdjustHpMp) return;
        const values = itemAdjustedVitals(this.hp, this.mp, this.mhp, this.mmp, previous.hpRate(), previous.mpRate());
        if (this.hp > 0) this.setHp(values[0]);
        if (this.mp > 0) this.setMp(values[1]);
    };
    for (const name of ['changeEquip', 'forceChangeEquip', 'discardEquip']) {
        const change = Game_Actor.prototype[name];
        Game_Actor.prototype[name] = function(...args) {
            if (name === 'forceChangeEquip' && !this._equips[args[0]]) this._equips[args[0]] = new Game_Item();
            if (this._tempActor) return change.apply(this, args);
            const previous = JsonEx.makeDeepCopy(this);
            previous._tempActor = true;
            const result = change.apply(this, args);
            this.equipAdjustHpMp(previous);
            return result;
        };
    }
}
