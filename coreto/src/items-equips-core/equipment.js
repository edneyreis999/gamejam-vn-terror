function installItemsEquipment(api) {
    function namedId(name, database, className = false) {
        const wanted = name.toUpperCase().trim();
        let result = 0;
        for (const entry of database) {
            if (!entry) continue;
            const label = className ? entry.name.replace(/\x1I\[(\d+)\]/gi, '').replace(/\\I\[(\d+)\]/gi, '') : entry.name;
            if (label.toUpperCase().trim() === wanted) result = entry.id;
        }
        return result;
    }
    DataManager.getClassIdWithName = function(name) { return namedId(name, $dataClasses, true); };
    DataManager.getSkillIdWithName = function(name) { return namedId(name, $dataSkills); };
    DataManager.getEtypeIdWithName = function(name) {
        const wanted = name.toUpperCase().trim();
        const match = $dataSystem.equipTypes.find(type => type.toUpperCase().trim() === wanted);
        return match === undefined ? 0 : $dataSystem.equipTypes.indexOf(match);
    };
    const typeCache = new Map(), classCache = new Map(), requirementCache = new Map();
    DataManager.getEtypeIDsCache = function(item) {
        if (!typeCache.has(item)) {
            const ids = [item.etypeId || 0], match = /<ADDED ETYPE(?:|S): (.*)>/i.exec(item.note || '');
            if (match) for (const value of match[1].split(',').map(value => value.trim())) {
                const id = /^\d+$/.test(value) ? Number(value) : this.getEtypeIdWithName(value);
                if (id > 1) ids.push(id);
            }
            typeCache.set(item, ids);
        }
        return typeCache.get(item);
    };
    DataManager.getEtypeIDs = function(item) { return this.isArmor(item) ? this.getEtypeIDsCache(item) : [item.etypeId || 0]; };
    DataManager.getClassRequirements = function(item) {
        if (!item) return [];
        if (!classCache.has(item)) {
            const match = /<EQUIP FOR CLASS(?:|ES) ONLY: (.*)>/i.exec(item.note || '');
            classCache.set(item, match ? match[1].split(',').map(value => value.trim()).map(value => /^\d+$/.test(value) ? Number(value) : this.getClassIdWithName(value)) : []);
        }
        return classCache.get(item);
    };
    DataManager.getEquipRequirements = function(item) {
        if (!item) return [];
        if (!requirementCache.has(item)) {
            const match = /<EQUIP(?:|MENT) REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT) REQUIREMENT(?:|S)>/i.exec(item.note || '');
            requirementCache.set(item, match ? match[1].split(/[\r\n]+/) : []);
        }
        return requirementCache.get(item);
    };
    DataManager.meetsClassRequirements = function(actor, item) {
        if (!actor || this.isItem(item)) return false;
        if ($gameTemp._checkEquipRequirements || BattleManager.isBattleTest()) return true;
        const classes = this.getClassRequirements(item);
        return classes.length === 0 || classes.includes(actor.currentClass().id);
    };
    DataManager.meetsEquipRequirement = function(actor, line) {
        const level = /(?:LEVEL|LV|LVL) (>|>=|===|<=|<) (\d+)/i.exec(line);
        if (level) return itemRequirementComparison(actor.level, level[1], Number(level[2]));
        const parameter = /(MAXHP|MAXMP|MHP|MMP|ATK|DEF|MAT|MDF|AGI|LUK) (>|>=|===|<=|<) (\d+)/i.exec(line);
        if (parameter) {
            const key = parameter[1].toUpperCase();
            const id = ['MAXHP', 'MHP'].includes(key) ? 0 : ['MAXMP', 'MMP'].includes(key) ? 1 : ['ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'].indexOf(key) + 2;
            return itemRequirementComparison(actor.paramBase(id) + (actor._paramPlus[id] || 0), parameter[2], Number(parameter[3]));
        }
        const skillId = /LEARNED SKILL: (\d+)/i.exec(line);
        if (skillId) return actor.isLearnedSkill(Number(skillId[1]));
        const skillName = /LEARNED SKILL: (.*)/i.exec(line);
        if (skillName) return actor.isLearnedSkill(this.getSkillIdWithName(skillName[1]));
        const switchId = /SWITCH: (\d+)/i.exec(line);
        return switchId ? $gameSwitches.value(Number(switchId[1])) : true;
    };
    DataManager.meetsEquipRequirements = function(actor, item) {
        if (!actor || this.isItem(item)) return false;
        if ($gameTemp._checkEquipRequirements || BattleManager.isBattleTest()) return true;
        return this.getEquipRequirements(item).every(line => this.meetsEquipRequirement(actor, line));
    };
    const canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item) {
        return DataManager.meetsClassRequirements(this, item) && DataManager.meetsEquipRequirements(this, item) && canEquip.call(this, item);
    };
    Game_BattlerBase.prototype.canEquipArmor = function(item) {
        return this.isEquipAtypeOk(item.atypeId) && !this.isEquipTypeSealed(item.etypeId) && DataManager.getEtypeIDs(item).every(id => !this.isEquipTypeSealed(id));
    };
    const trade = Game_Actor.prototype.tradeItemWithParty;
    Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
        if (this._tempActor) return false;
        $gameTemp._bypassNewLabel = true;
        try { return trade.call(this, newItem, oldItem); }
        finally { $gameTemp._bypassNewLabel = false; }
    };
    Game_Actor.prototype.changeEquipBase = function(slot, item) {
        if (!this.tradeItemWithParty(item, this.equips()[slot])) return;
        if (item && !DataManager.getEtypeIDs(item).includes(this.equipSlots()[slot])) return;
        if (!this._equips[slot]) this._equips[slot] = new Game_Item();
        this._equips[slot].setObject(item);
        if (api.CheckCursedItemMsg && api.CheckCursedItemMsg(item)) {
            const template = api.settings.EquipScene.CursedTextPopup || '';
            const message = template.format(this.name(), '\\I[' + item.iconIndex + ']', item.name || '');
            if (message.length > 0) $textPopup(message);
        }
        this.refresh();
    };
    Game_Actor.prototype.changeEquip = function(slot, item) { this.changeEquipBase(slot, item); };
    Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
        if (this._bypassReleaseUnequippableItemsItemsEquipsCore) return;
        for (let pass = 0; pass < 3; pass++) {
            const slots = this.equipSlots(), equips = this.equips();
            let changed = false;
            for (let index = 0; index < equips.length; index++) {
                const item = equips[index];
                if (!item || this.canEquip(item) && DataManager.getEtypeIDs(item).includes(slots[index])) continue;
                if (!forcing) this.tradeItemWithParty(null, item);
                if (this._equips[index]) this._equips[index].setObject(null);
                changed = true;
            }
            if (!changed) break;
        }
    };
    Game_Actor.prototype.nonRemovableEtypes = function() { return api.settings.EquipScene.NonRemoveETypes; };
    Game_Actor.prototype.nonOptimizeEtypes = function() { return api.settings.EquipScene.NonOptimizeETypes; };
    Game_Actor.prototype.isClearEquipOk = function(slot) { return !this.nonRemovableEtypes().includes(this.equipSlots()[slot]) && this.isEquipChangeOk(slot); };
    Game_Actor.prototype.isOptimizeEquipOk = function(slot) { return !this.nonOptimizeEtypes().includes(this.equipSlots()[slot]) && this.isEquipChangeOk(slot); };
    Game_Actor.prototype.clearEquipments = function() {
        for (let slot = 0; slot < this.equipSlots().length; slot++) if (this.isClearEquipOk(slot)) this.changeEquip(slot, null);
    };
    Game_Actor.prototype.optimizeEquipments = function() {
        const count = this.equipSlots().length;
        for (let slot = 0; slot < count; slot++) if (this.isOptimizeEquipOk(slot)) this.changeEquip(slot, null);
        for (let slot = 0; slot < count; slot++) if (this.isOptimizeEquipOk(slot)) this.changeEquip(slot, this.bestEquipItem(slot));
    };
    Game_Actor.prototype.canEquipWithOptimize = function(item) {
        if (!item) return false;
        const copy = itemEquipLimit(item.note, 'COPY');
        if (copy !== null && this.equips().filter(equip => equip === item).length >= (copy || 1)) return false;
        for (const [matches, field, kind] of [[DataManager.isWeapon, 'wtypeId', 'WEAPON TYPE'], [DataManager.isArmor, 'atypeId', 'ARMOR TYPE']]) {
            if (!matches.call(DataManager, item)) continue;
            const held = this.equips().filter(equip => matches.call(DataManager, equip) && equip[field] === item[field]);
            const limit = itemEquipLimit(item.note, kind);
            if (limit !== null && held.length >= (limit || 1)) return false;
            let otherLimit = 9999;
            for (const equip of held) { const other = itemEquipLimit(equip.note, kind); if (other !== null) otherLimit = Math.min(otherLimit, other); }
            if (held.length > 0 && held.length >= otherLimit) return false;
        }
        return true;
    };
    Game_Actor.prototype.bestEquipItem = function(slot) {
        const type = this.equipSlots()[slot];
        let best = null, score = -1000;
        for (const item of $gameParty.equipItems()) {
            if (!DataManager.getEtypeIDs(item).includes(type) || !this.canEquip(item) || !this.canEquipWithOptimize(item)) continue;
            const performance = this.calcEquipItemPerformance(item);
            if (performance > score) { best = item; score = performance; }
        }
        return best;
    };
    Window_EquipSlot.prototype.equipSlotIndex = function() { return this.index(); };
    const slotEnabled = Window_EquipSlot.prototype.isEnabled;
    Window_EquipSlot.prototype.isEnabled = function(index) { return this.maxItems() > 0 && slotEnabled.call(this, index); };
    Window_EquipItem.prototype.nonRemovableEtypes = function() { return api.settings.EquipScene.NonRemoveETypes; };
    const includes = Window_EquipItem.prototype.includes;
    Window_EquipItem.prototype.includes = function(item) {
        if (item === null && this.nonRemovableEtypes().includes(this.etypeId())) return false;
        $gameTemp._checkEquipRequirements = true;
        try {
            if (includes.call(this, item)) return true;
            return !!item && DataManager.isArmor(item) && !!this._actor && this._actor.isEquipAtypeOk(item.atypeId || 0) && DataManager.getEtypeIDs(item).includes(this.etypeId());
        } finally { $gameTemp._checkEquipRequirements = undefined; }
    };
    function otherEquips(window) {
        const equips = window._actor.equips();
        equips[SceneManager._scene._slotWindow.equipSlotIndex()] = null;
        return equips;
    }
    Window_EquipItem.prototype.itemHasEquipLimit = function(item) {
        const limit = itemEquipLimit(item.note, 'COPY');
        return limit !== null && otherEquips(this).filter(equip => equip && DataManager.isWeapon(equip) === DataManager.isWeapon(item) && equip.id === item.id).length >= (limit || 1);
    };
    function typeLimit(window, item, matches, field, kind) {
        if (!matches.call(DataManager, item)) return false;
        let count = 0;
        for (const equip of otherEquips(window)) {
            if (!matches.call(DataManager, equip) || equip[field] !== item[field]) continue;
            count++;
            const incoming = itemEquipLimit(item.note, kind), existing = itemEquipLimit(equip.note, kind);
            if (incoming !== null && count >= (incoming || 1) || existing !== null && count >= (existing || 1)) return true;
        }
        return false;
    }
    Window_EquipItem.prototype.isSoleWeaponType = function(item) { return typeLimit(this, item, DataManager.isWeapon, 'wtypeId', 'WEAPON TYPE'); };
    Window_EquipItem.prototype.isSoleArmorType = function(item) { return typeLimit(this, item, DataManager.isArmor, 'atypeId', 'ARMOR TYPE'); };
    const enabled = Window_EquipItem.prototype.isEnabled;
    Window_EquipItem.prototype.isEnabled = function(item) {
        if (item && this._actor && (this.itemHasEquipLimit(item) || this.isSoleWeaponType(item) || this.isSoleArmorType(item) || !this._actor.canEquip(item))) return false;
        return item ? enabled.call(this, item) : !this.nonRemovableEtypes().includes(this.etypeId());
    };
    Window_EquipItem.prototype.drawRemoveItem = function(index) {
        const settings = api.settings.EquipScene, rect = this.itemLineRect(index);
        const iconWidth = ImageManager.standardIconWidth || 32, textOffset = iconWidth + 4;
        this.changePaintOpacity(this.isEnabled(null));
        this.resetTextColor();
        this.drawIcon(settings.RemoveEquipIcon, rect.x + Math.ceil((iconWidth - ImageManager.iconWidth) / 2), rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2);
        this.drawText(settings.RemoveEquipText, rect.x + textOffset, rect.y, Math.max(0, rect.width - textOffset));
        this.changePaintOpacity(true);
    };
    Window_EquipItem.prototype.drawItem = function(index) {
        if (this.itemAt(index)) Window_ItemList.prototype.drawItem.call(this, index);
        else this.drawRemoveItem(index);
    };
    Window_EquipCommand.prototype.commandStyle = function() { return api.settings.EquipScene.CmdStyle; };
    Window_EquipCommand.prototype.isUseModernControls = function() { return !!Imported.VisuMZ_0_CoreEngine && Window_HorzCommand.prototype.isUseModernControls.call(this); };
    Window_EquipCommand.prototype.isEquipCommandAdded = function() { return !this.isUseModernControls(); };
    Window_EquipCommand.prototype.isOptimizeCommandAdded = function() { return api.settings.EquipScene.CommandAddOptimize; };
    Window_EquipCommand.prototype.isClearCommandAdded = function() { return api.settings.EquipScene.CommandAddClear; };
    Window_EquipCommand.prototype.isEquipCommandEnabled = function() { return true; };
    Window_EquipCommand.prototype.isOptimizeCommandEnabled = function() { return true; };
    Window_EquipCommand.prototype.isClearCommandEnabled = function() { return true; };
    for (const [name, symbol, text, icon] of [['Equip', 'equip', 'equip2', 'CmdIconEquip'], ['Optimize', 'optimize', 'optimize', 'CmdIconOptimize'], ['Clear', 'clear', 'clear', 'CmdIconClear']]) {
        Window_EquipCommand.prototype['add' + name + 'Command'] = function() {
            if (!this['is' + name + 'CommandAdded']()) return;
            const label = this.commandStyle() === 'text' ? TextManager[text] : '\\I[' + api.settings.EquipScene[icon] + ']' + TextManager[text];
            this.addCommand(label, symbol, this['is' + name + 'CommandEnabled']());
        };
    }
    Window_EquipCommand.prototype.makeCommandList = function() { this.addEquipCommand(); this.addOptimizeCommand(); this.addClearCommand(); };
}
