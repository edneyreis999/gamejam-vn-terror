function installItemsEquipSlots() {
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        boot.call(this);
        for (const entry of $dataClasses) if (entry) entry.equipSlots = itemClassSlots(entry.note, $dataSystem.equipTypes, BattleManager.isBattleTest());
    };
    Game_Actor.prototype.equipSlots = function() {
        const slots = (this._forcedSlots || this.currentClass().equipSlots).slice();
        if (slots.length >= 2 && this.isDualWield()) slots[1] = 1;
        return slots;
    };
    Game_Actor.prototype.convertInitEquipsToItems = function(equips) {
        const items = [];
        for (let index = 0; index < equips.length; index++) {
            const id = equips[index];
            if (id <= 0) continue;
            if ($dataSystem.equipTypes[index + 1] === $dataSystem.equipTypes[1] || index === 1 && this.isDualWield()) items.push($dataWeapons[id]);
            else if ($dataArmors[id]?.etypeId === index + 1) items.push($dataArmors[id]);
        }
        return items;
    };
    Game_Actor.prototype.getMatchingInitEquip = function(items, type) {
        const index = items.findIndex(item => item?.etypeId === type);
        return index < 0 ? null : items.splice(index, 1)[0];
    };
    Game_Actor.prototype.initEquips = function(equips) {
        const items = this.convertInitEquipsToItems(equips), slots = this.equipSlots();
        this._equips = slots.map(() => new Game_Item());
        for (let index = 0; index < slots.length; index++) {
            const item = this.getMatchingInitEquip(items, slots[index]);
            if (this.canEquip(item)) this._equips[index].setObject(item);
        }
        this.releaseUnequippableItems(true);
        this.refresh();
    };
    Game_Actor.prototype.getNextAvailableEtypeId = function(type) {
        const slots = this.equipSlots(), equips = this.equips();
        let selected = 0;
        for (let index = 0; index < slots.length; index++) if (slots[index] === type) {
            selected = index;
            if (!equips[index]) return selected;
        }
        return selected;
    };
    Game_Actor.prototype.changeEquipById = function(type, itemId) {
        const slot = this.getNextAvailableEtypeId(type);
        if (slot >= 0) this.changeEquip(slot, type === 1 ? $dataWeapons[itemId] : $dataArmors[itemId]);
    };
    const changeClass = Game_Actor.prototype.changeClass;
    Game_Actor.prototype.changeClass = function(classId, keepExp) { changeClass.call(this, classId, keepExp); this.updateChangedSlots(); };
    Game_Actor.prototype.updateChangedSlots = function() {
        const count = this.equipSlots().length;
        while (this._equips.length > count) {
            const removed = this._equips[this._equips.length - 1];
            if (removed && removed.object()) $gameParty.gainItem(removed.object(), 1);
            this._equips.pop();
        }
        while (this._equips.length < count) this._equips.push(new Game_Item());
    };
    Game_Actor.prototype.forceChangeEquipSlots = function(slots) {
        slots.remove(0);
        slots.remove(-1);
        this._forcedSlots = slots;
        this.refresh();
        this.updateChangedSlots();
    };
    Game_Actor.prototype.forceResetEquipSlots = function() {
        this._forcedSlots = undefined;
        this.refresh();
        this.updateChangedSlots();
    };
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, 'ActorChangeEquipSlots', args => {
            const actors = JSON.parse(args['Actors:arraynum'] || '["1"]');
            const names = JSON.parse(args['Slots:arraystr'] || '["Weapon","Shield","Head","Body","Accessory"]');
            const slots = names.map(name => $dataSystem.equipTypes.indexOf(name.trim()));
            for (const id of actors) {
                const actor = $gameActors.actor(Number(id));
                if (actor) actor.forceChangeEquipSlots(slots);
            }
        });
        PluginManager.registerCommand(receiver, 'ActorResetEquipSlots', args => {
            for (const id of JSON.parse(args['Actors:arraynum'] || '["1"]')) {
                const actor = $gameActors.actor(Number(id));
                if (actor) actor.forceResetEquipSlots();
            }
        });
    }
}
