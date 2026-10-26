function installItemsStatusData(api) {
    const settings = api.settings.StatusWindow, proto = Window_ShopStatus.prototype;
    function pair(window, label, text, x, y, width, color) {
        window.drawItemKeyData(label, x, y, width, true);
        if (color) window.changeTextColor(color);
        window.drawItemKeyData(text, x, y, width, false, 'right');
        window.drawItemDarkRect(x, y, width);
        window.resetFontSettings();
        return true;
    }
    proto.getItemConsumableLabel = function() { return settings.LabelConsume; };
    proto.canConsumeItem = function() {
        return !(VisuMZ.CoreEngine?.Settings.QoL.KeyItemProtect && DataManager.isKeyItem(this._item)) && this._item.consumable;
    };
    proto.getItemConsumableText = function() { return this._customItemInfo.CONSUMABLE || (this.canConsumeItem() ? settings.Consumable : settings.NotConsumable); };
    proto.drawItemConsumable = function(x, y, width) {
        return DataManager.isItem(this._item) && pair(this, this.getItemConsumableLabel(), this.getItemConsumableText(), x, y, width);
    };
    proto.getItemOccasionText = function() { return this._customItemInfo.OCCASION || settings['Occasion' + this._item.occasion]; };
    proto.getItemScopeText = function() {
        if (this._customItemInfo.SCOPE) return this._customItemInfo.SCOPE;
        const target = Imported.VisuMZ_1_BattleCore && /<TARGET: (.*)>/i.exec(this._item.note);
        if (target) {
            for (const [pattern, key] of [[/(\d+) RANDOM ANY/i, 'ScopeRandomAny'], [/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i, 'ScopeRandomEnemies'], [/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i, 'ScopeRandomAllies']]) {
                const match = pattern.exec(target[1]);
                if (match) return settings[key].format(Number(match[1]));
            }
            if (/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i.test(target[1])) return settings.ScopeAlliesButUser;
            if (/ALLY OR ENEMY/i.test(target[1])) return settings.ScopeAllyOrEnemy || settings.Scope7;
            if (/ENEMY OR ALLY/i.test(target[1])) return settings.ScopeEnemyOrAlly || settings.Scope1;
        }
        return settings['Scope' + this._item.scope];
    };
    for (const name of ['Occasion', 'Scope']) proto['drawItem' + name] = function(x, y, width) {
        this.drawItemKeyData(this['getItem' + name + 'Text'](), x, y, width, false, 'center');
        this.drawItemDarkRect(x, y, width); this.resetFontSettings();
        return true;
    };
    proto.getItemSpeedText = function() {
        if (this._customItemInfo.SPEED) return this._customItemInfo.SPEED;
        const value = this._item.speed;
        return settings[value >= 2000 ? 'Speed2000' : value >= 1000 ? 'Speed1000' : value > 0 ? 'Speed1' : value === 0 ? 'Speed0' : value > -1000 ? 'SpeedNeg999' : value > -2000 ? 'SpeedNeg1999' : 'SpeedNeg2000'];
    };
    proto.getItemSuccessRateText = function() {
        if (this._customItemInfo['SUCCESS RATE']) return this._customItemInfo['SUCCESS RATE'];
        if (Imported.VisuMZ_1_BattleCore) {
            if (/<ALWAYS HIT>/i.test(this._item.note)) return '100%';
            const match = /<ALWAYS HIT RATE: (\d+)[%％]>/i.exec(this._item.note);
            if (match) return Number(match[1]) + '%';
        }
        return this._item.successRate + '%';
    };
    proto.getItemRepeatsText = function() { return this._customItemInfo.REPEAT || '×' + this._item.repeats; };
    proto.getItemHitTypeText = function() {
        if (this._customItemInfo['HIT TYPE']) return this._customItemInfo['HIT TYPE'];
        return DataManager.isToggleSkill && DataManager.isToggleSkill(this._item) ? TextManager.toggleType : settings['HitType' + this._item.hitType];
    };
    for (const name of ['Speed', 'SuccessRate', 'Repeats', 'HitType']) {
        proto['getItem' + name + 'Label'] = function() { return settings['Label' + name]; };
        proto['drawItem' + name] = function(x, y, width) { return pair(this, this['getItem' + name + 'Label'](), this['getItem' + name + 'Text'](), x, y, width); };
    }
    proto.getItemEffects = function() { return this._item.effects; };
    proto.makeItemData = function() {
        const data = this._itemData = {rateHP: 0, flatHP: 0, rateMP: 0, flatMP: 0, gainTP: 0, selfTP: 0, addState: [], removeState: [], changeBuff: [0,0,0,0,0,0,0,0], removeBuff: [], removeDebuff: [], addStateBuffChanges: false, removeStateBuffChanges: false};
        let found = false;
        for (const effect of this.getItemEffects()) {
            switch (effect.code) {
            case Game_Action.EFFECT_RECOVER_HP: data.rateHP += effect.value1; data.flatHP += effect.value2; break;
            case Game_Action.EFFECT_RECOVER_MP: data.rateMP += effect.value1; data.flatMP += effect.value2; break;
            case Game_Action.EFFECT_GAIN_TP: data.gainTP += effect.value1; break;
            case Game_Action.EFFECT_ADD_STATE: data.addState.push(effect.dataId); break;
            case Game_Action.EFFECT_REMOVE_STATE: data.removeState.push(effect.dataId); data.removeStateBuffChanges = true; break;
            case Game_Action.EFFECT_ADD_BUFF: data.changeBuff[effect.dataId]++; break;
            case Game_Action.EFFECT_ADD_DEBUFF: data.changeBuff[effect.dataId]--; break;
            case Game_Action.EFFECT_REMOVE_BUFF: data.removeBuff.push(effect.dataId); data.removeStateBuffChanges = true; break;
            case Game_Action.EFFECT_REMOVE_DEBUFF: data.removeDebuff.push(effect.dataId); data.removeStateBuffChanges = true; break;
            default: continue;
            }
            found = true;
        }
        data.addStateBuffChanges = data.addState.length > 0 || data.changeBuff.some(value => value !== 0);
        if (this._item.tpGain !== 0) { data.selfTP = this._item.tpGain; found = true; }
        return found || ['HP RECOVERY','MP RECOVERY','TP RECOVERY','HP DAMAGE','MP DAMAGE','TP DAMAGE','USER TP GAIN','ADDED EFFECTS','REMOVED EFFECTS'].some(key => this._customItemInfo[key]);
    };
    for (const [resource, suffix, colorRecovery, colorDamage] of [['HP', 'Hp', 1, 0], ['MP', 'Mp', 3, 2]]) {
        for (const [kind, positive, color] of [['Recovery', true, colorRecovery], ['Damage', false, colorDamage]]) {
            const key = resource + ' ' + kind.toUpperCase(), method = 'ItemEffects' + suffix + kind;
            proto['get' + method + 'Label'] = function() { return settings['Label' + (positive ? 'Recover' : 'Damage') + resource].format(TextManager[resource.toLowerCase()]); };
            proto['get' + method + 'Text'] = function() {
                if (this._customItemInfo[key]) return this._customItemInfo[key];
                const rate = this._itemData['rate' + resource], flat = this._itemData['flat' + resource], values = [];
                if (positive ? rate > 0 : rate < 0) values.push((positive ? '+' : '') + Math.floor(rate * 100) + '%');
                if (positive ? flat > 0 : flat < 0) values.push((positive ? '+' : '') + flat);
                return values.join(' ');
            };
            proto['draw' + method] = function(x, y, width) {
                const rate = this._itemData['rate' + resource], flat = this._itemData['flat' + resource];
                if (!this._customItemInfo[key] && (positive ? rate <= 0 && flat <= 0 : rate >= 0 && flat >= 0)) return false;
                return pair(this, this['get' + method + 'Label'](), this['get' + method + 'Text'](), x, y, width, ColorManager.damageColor(color));
            };
        }
    }
    for (const [suffix, key, field, label] of [['TpRecovery', 'TP RECOVERY', 'gainTP', 'LabelRecoverTP'], ['TpDamage', 'TP DAMAGE', 'gainTP', 'LabelDamageTP'], ['SelfTpGain', 'USER TP GAIN', 'selfTP', 'LabelSelfGainTP']]) {
        const method = 'ItemEffects' + suffix;
        proto['get' + method + 'Label'] = function() { return settings[label].format(TextManager.tp); };
        proto['get' + method + 'Text'] = function() { const value = this._itemData[field]; return this._customItemInfo[key] || (suffix === 'TpRecovery' || suffix === 'SelfTpGain' && value > 0 ? '+' : '') + value; };
        proto['draw' + method] = function(x, y, width) {
            const value = this._itemData[field];
            if (!this._customItemInfo[key] && (suffix === 'TpRecovery' ? value <= 0 : suffix === 'TpDamage' ? value >= 0 : value === 0)) return false;
            const color = suffix === 'TpRecovery' || suffix === 'SelfTpGain' && value > 0 ? ColorManager.powerUpColor() : ColorManager.powerDownColor();
            return pair(this, this['get' + method + 'Label'](), this['get' + method + 'Text'](), x, y, width, color);
        };
    }
    for (const [kind, added] of [['Added', true], ['Removed', false]]) {
        const method = 'ItemEffects' + kind + 'StatesBuffs', key = added ? 'ADDED EFFECTS' : 'REMOVED EFFECTS';
        proto['get' + method + 'Label'] = function() { return added ? settings.LabelApply : settings.LabelRemove; };
        proto['get' + method + 'Text'] = function() {
            if (this._customItemInfo[key]) return this._customItemInfo[key];
            const data = this._itemData, icons = [];
            for (const id of added ? data.addState : data.removeState) if ($dataStates[id]?.iconIndex > 0) icons.push($dataStates[id].iconIndex);
            if (added) for (const [id, value] of data.changeBuff.entries()) { const icon = Game_BattlerBase.prototype.buffIconIndex(value, id); if (icon > 0) icons.push(icon); }
            else for (const [ids, value] of [[data.removeBuff, 1], [data.removeDebuff, -1]]) for (const id of ids) { const icon = Game_BattlerBase.prototype.buffIconIndex(value, id); if (icon > 0) icons.push(icon); }
            return icons.slice(0, Math.max(1, added ? 8 : settings.MaxIcons)).map(icon => '\\I[' + icon + ']').join('');
        };
        proto['draw' + method] = function(x, y, width) {
            if (!this._itemData[added ? 'addStateBuffChanges' : 'removeStateBuffChanges'] && !this._customItemInfo[key]) return false;
            const text = this['get' + method + 'Text']();
            return text.length > 0 && pair(this, this['get' + method + 'Label'](), text, x, y, width);
        };
    }
    proto.drawItemEffects = function(x, y, width) {
        if (!this.makeItemData()) return y;
        for (const name of ['HpRecovery','MpRecovery','TpRecovery','HpDamage','MpDamage','TpDamage','SelfTpGain','AddedStatesBuffs','RemovedStatesBuffs']) if (this['drawItemEffects' + name](x, y, width)) y += this.lineHeight();
        this.resetFontSettings(); return y;
    };
    proto.getItemDamageElementLabel = function() { return settings.LabelElement; };
    proto.getItemDamageElementText = function() {
        const id = this._item.damage.elementId;
        return this._customItemInfo.ELEMENT || (id <= -1 ? settings.ElementWeapon : id === 0 ? settings.ElementNone : $dataSystem.elements[id]);
    };
    proto.drawItemDamageElement = function(x, y, width) { return pair(this, this.getItemDamageElementLabel(), this.getItemDamageElementText(), x, y, width); };
    proto.getItemDamageAmountLabelOriginal = function() { return settings['DamageType' + this._item.damage.type].format(this._item.damage.type % 2 ? TextManager.hp : TextManager.mp); };
    proto.getItemDamageAmountLabel = function() {
        return Imported.VisuMZ_1_BattleCore && DataManager.getDamageStyle(this._item) !== 'MANUAL' ? this.getItemDamageAmountLabelBattleCore() : this.getItemDamageAmountLabelOriginal();
    };
    VisuMZ.ShopMenuStatusStandard = settings.MultiplierStandard;
    const param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(id) { return this._shopStatusMenuMode ? this._shopStatusMenuAlly ? VisuMZ.ShopMenuStatusStandard : 1 : param.call(this, id); };
    Game_Actor.prototype.setShopStatusWindowMode = function(ally) { this._shopStatusMenuMode = true; this._shopStatusMenuAlly = ally; };
    proto.setupItemDamageTempActors = function() { const actor = $gameActors.actor(1); this._tempActorA = JsonEx.makeDeepCopy(actor); this._tempActorB = JsonEx.makeDeepCopy(actor); };
    proto.revertGlobalNamespaceVariables = function() { window.a = window.b = undefined; };
    const evaluateFormula = new Function('source', 'return eval(source);');
    proto.getItemDamageAmountTextOriginal = function() {
        window.a = this._tempActorA; window.b = this._tempActorB;
        this._tempActorA.setShopStatusWindowMode(true);
        this._tempActorB.setShopStatusWindowMode([3,4].includes(this._item.damage.type));
        try {
            const ratio = Math.max(evaluateFormula.call(this, this._item.damage.formula), 0) / window.a.atk;
            this.revertGlobalNamespaceVariables();
            return isNaN(ratio) ? '?????' : Math.round(ratio * 100) + '%';
        } catch (error) {
            if ($gameTemp.isPlaytest()) { console.log('Damage Formula Error for ' + this._item.name); console.log(error); }
            this.revertGlobalNamespaceVariables(); return '?????';
        }
    };
    proto.getItemDamageAmountText = function() {
        if (this._customItemInfo['DAMAGE MULTIPLIER']) return this._customItemInfo['DAMAGE MULTIPLIER'];
        return Imported.VisuMZ_1_BattleCore && DataManager.getDamageStyle(this._item) !== 'MANUAL' ? this.getItemDamageAmountTextBattleCore() : this.getItemDamageAmountTextOriginal();
    };
    proto.drawItemDamageAmount = function(x, y, width) {
        this.drawItemKeyData(this.getItemDamageAmountLabel(), x, y, width, true);
        this.setupItemDamageTempActors();
        const text = this.getItemDamageAmountText();
        this.changeTextColor(ColorManager.damageColor([0,0,2,1,3,1,3][this._item.damage.type]));
        this.drawItemKeyData(text, x, y, width, false, 'right');
        this.drawItemDarkRect(x, y, width); this.resetFontSettings(); return true;
    };
    proto.drawItemDamage = function(x, y, width) {
        if (this._item.damage.type <= 0) return y;
        if (this.drawItemDamageElement(x, y, width)) y += this.lineHeight();
        if (this.drawItemDamageAmount(x, y, width)) y += this.lineHeight();
        this.resetFontSettings(); return y;
    };
}
