function installItemsStatusEquipment(api) {
    const settings = api.settings.StatusWindow, proto = Window_ShopStatus.prototype;
    const base = ['MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
    const extra = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
    const special = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
    Game_Actor.prototype.anyEmptyEquipSlotsOfSameEtype = function(item) {
        return !!item && this.equipSlots().some((type, index) => type === item.etypeId && !this.equips()[index]);
    };
    Game_Actor.prototype.getEmptyEquipSlotOfSameEtype = function(item) {
        if (!item) return -1;
        const slots = this.equipSlots(), empty = slots.findIndex((type, index) => type === item.etypeId && !this.equips()[index]);
        return empty >= 0 ? empty : slots.indexOf(item.etypeId);
    };
    proto.equipHasCustomParams = function() { return this._item && /<CUSTOM STATUS PARAM(?:|S|ETERS): (.*)>/i.exec(this._item.note || ''); };
    proto.customEquipParams = function() {
        const match = /<CUSTOM STATUS PARAM(?:|S|ETERS): (.*)>/i.exec(this._item.note);
        return match[1].split(',').map(name => name.toUpperCase().trim()).filter(name => base.includes(name) || extra.includes(name) || special.includes(name));
    };
    proto.actorParams = function() {
        let params = [0, 1, 2, 3, 4, 5, 6, 7];
        if (Imported.VisuMZ_0_CoreEngine) {
            params = VisuMZ.CoreEngine.Settings.Param.ExtDisplayedParams;
            if (this.equipHasCustomParams()) return this.customEquipParams();
            const style = this.getEquipDataStyle(), kind = DataManager.isWeapon(this._item) ? 'Weapon' : DataManager.isArmor(this._item) ? 'Armor' : null;
            if (kind && ['classic', 'double'].includes(style)) params = params.concat(settings[(style === 'classic' ? 'Classic' : 'Double') + kind + 'Parameters'] || []);
        }
        return params.map(name => typeof name === 'number' ? name : name.toUpperCase().trim());
    };
    proto.smallParamFontSize = function() { return settings.ParamChangeFontSize; };
    proto.drawParamName = function(param, x, y, width) {
        this.resetFontSettings(); this.contents.fontSize = this.smallParamFontSize();
        let measured = this.textWidth(TextManager.param(param)) + 4 + x;
        if (Imported.VisuMZ_0_CoreEngine) {
            this.drawParamText(x, y, width, param, true);
            if (VisuMZ.CoreEngine.Settings.Param.DrawIcons) measured += ImageManager.iconWidth + 4;
        } else { this.changeTextColor(ColorManager.systemColor()); this.drawText(TextManager.param(param), x, y, width); }
        this.resetFontSettings();
        return measured;
    };
    proto.needsNewTempActor = function(actor) { return !this._tempActor || this._tempActor.actorId() !== actor.actorId(); };
    proto.createTempActorEquips = function(actor) {
        if (this.needsNewTempActor(actor)) {
            const copy = JsonEx.makeDeepCopy(actor);
            copy._tempActor = true;
            const slot = copy.getEmptyEquipSlotOfSameEtype(this._item);
            if (slot >= 0) copy.forceChangeEquip(slot, this._item);
            this._tempActor = copy;
        }
        return this._tempActor;
    };
    proto.drawActorParamDifference = function(actor, param, x, y, width) {
        x += this.itemPadding(); width -= this.itemPadding() * 2;
        this.contents.fontSize = settings.ParamChangeFontSize;
        this.changePaintOpacity(actor.canEquip(this._item));
        let text;
        if (actor.isEquipped(this._item) && !actor.anyEmptyEquipSlotsOfSameEtype(this._item)) text = settings.AlreadyEquipMarker;
        else if (!actor.canEquip(this._item)) text = settings.CannotEquipMarker;
        else {
            const copy = this.createTempActorEquips(actor);
            const change = Imported.VisuMZ_0_CoreEngine ? copy.paramValueByName(param) - actor.paramValueByName(param) : copy.param(param) - actor.param(param);
            this.changeTextColor(ColorManager.paramchangeTextColor(change));
            text = (change >= 0 ? '+' : '') + (Imported.VisuMZ_0_CoreEngine ? VisuMZ.ConvertNumberToString(change, 0, param) : change);
            if (text === '+0') text = settings.NoChangeMarker;
        }
        this.drawText(text, x, y, width, 'center');
        this.resetFontSettings(); this.changePaintOpacity(true);
    };
    proto.isCustomParameter = function(param) { return !!Imported.VisuMZ_0_CoreEngine && !!VisuMZ.CoreEngine.CustomParamNames[param]; };
    proto.getParamValueClassicCore = function(param) {
        if (this._customItemInfo[param]) return this._customItemInfo[param];
        let value;
        if (base.includes(param)) {
            value = this._item.params[base.indexOf(param)] || 0;
            this.changeTextColor(ColorManager.paramchangeTextColor(value));
            return (value >= 0 ? '+' : '') + String(value);
        }
        if (extra.includes(param)) {
            value = this._item.traits.filter(trait => trait.code === 22 && trait.dataId === extra.indexOf(param)).reduce((sum, trait) => sum + (trait.value || 0), 0);
            this.changeTextColor(ColorManager.paramchangeTextColor(value));
            return (value >= 0 ? '+' : '') + String(value * 100) + '%';
        }
        if (special.includes(param)) {
            value = this._item.traits.filter(trait => trait.code === 23 && trait.dataId === special.indexOf(param)).reduce((product, trait) => product * (trait.value || 0), 1);
            const direction = ['TGR', 'MCR', 'PDR', 'MDR', 'FDR'].includes(param) ? -1 : 1;
            this.changeTextColor(ColorManager.paramchangeTextColor((value - 1) * direction));
            return String(value * 100) + '%';
        }
        return '';
    };
    proto.getParamValueClassicNoCore = function(param) {
        if (this._customItemInfo[base[param] || 'n/a']) return this._customItemInfo[base[param] || 'n/a'];
        const value = Number(this._item.params[param] || 0);
        this.changeTextColor(ColorManager.paramchangeTextColor(value));
        return (value >= 0 ? '+' : '') + String(value);
    };
    proto.drawActorParamClassic = function(param, x, y, width) {
        this.drawItemKeyData(TextManager.param(param), x, y, width, true);
        const text = Imported.VisuMZ_0_CoreEngine ? this.getParamValueClassicCore(param) : this.getParamValueClassicNoCore(param);
        this.drawItemKeyData(text, x, y, width, false, 'right');
        this.drawItemDarkRect(x, y, width);
    };
}
