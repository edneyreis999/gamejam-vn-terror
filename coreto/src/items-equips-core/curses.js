function installItemsCurses(api) {
    for (const [kind, field, database] of [['Weapon', '_weaponIDs', () => $dataWeapons], ['Armor', '_armorIDs', () => $dataArmors]]) {
        DataManager['get' + kind + 'IdWithName'] = function(name) {
            const wanted = name.toUpperCase().trim();
            const cache = this[field] = this[field] || Object.create(null);
            if (cache[wanted]) return cache[wanted];
            for (const item of database()) if (item) cache[item.name.toUpperCase().trim()] = item.id;
            return cache[wanted] || 0;
        };
    }
    DataManager.isCursedItem = function(item) {
        if (!this.isWeapon(item) && !this.isArmor(item)) return false;
        if (Imported.VisuMZ_2_WeaponSwapSystem && this.isWeapon(item)) return false;
        return item.note ? item.note.match(/<CURSED>/i) : false;
    };
    DataManager.getPurifyTransformation = function(item) {
        if (!item || !this.isWeapon(item) && !this.isArmor(item)) return item;
        const match = /<PURIFY TRANSFORM: (.*)>/i.exec(item.note || '');
        if (!match) return item;
        const target = match[1].trim(), weapon = this.isWeapon(item);
        const id = /^\d+$/.test(target) ? Number(target) : this[weapon ? 'getWeaponIdWithName' : 'getArmorIdWithName'](target);
        return (weapon ? $dataWeapons : $dataArmors)[id];
    };
    api.CheckCursedItemMsg = function(item) {
        return !!item && Imported.VisuMZ_0_CoreEngine && VisuMZ.CoreEngine.version >= 1.79 && DataManager.isCursedItem(item);
    };
    const changeOk = Game_Actor.prototype.isEquipChangeOk;
    Game_Actor.prototype.isEquipChangeOk = function(slot) {
        if (!this._equips[slot]) this._equips[slot] = new Game_Item();
        return !DataManager.isCursedItem(this._equips[slot].object()) && changeOk.call(this, slot);
    };
    Game_Actor.prototype.isPurifyItemSwapOk = function(item, target) {
        if (item === target) return false;
        if (!target) throw new CoreError('IE_PURIFY_TARGET', 'Purify Transform must name an existing object of the same database kind.');
        if (!DataManager.getEtypeIDs(target).includes(item.etypeId)) return false;
        if (DataManager.isWeapon(target)) return this.isEquipWtypeOk(target.wtypeId);
        return DataManager.isArmor(target) && this.isEquipAtypeOk(target.atypeId);
    };
    Game_Actor.prototype.purifyCursedEquips = function() {
        for (let slot = 0; slot < this.equipSlots().length; slot++) {
            const item = this._equips[slot] && this._equips[slot].object();
            if (!DataManager.isCursedItem(item)) continue;
            const target = DataManager.getPurifyTransformation(item);
            if (this.isPurifyItemSwapOk(item, target)) {
                this._equips[slot].setObject(target);
                this.refresh();
            } else this.changeEquip(slot, null);
        }
    };
    Game_Party.prototype.purifyCursedEquips = function() {
        for (const actor of this.allMembers()) if (actor) actor.purifyCursedEquips();
    };
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, 'PurifyActors', args => {
            if ($gameParty.inBattle()) return;
            for (const id of JSON.parse(args['Actors:arraynum'] || '[]')) {
                const actor = $gameActors.actor(Number(id));
                if (actor) actor.purifyCursedEquips();
            }
        });
        PluginManager.registerCommand(receiver, 'PurifyParty', () => {
            if (!$gameParty.inBattle()) $gameParty.purifyCursedEquips();
        });
    }
}
