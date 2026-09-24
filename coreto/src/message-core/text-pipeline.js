function runMessageTextScript(rule, field, receiver, args, phase) {
    try {
        return rule[field].apply(receiver, args);
    } catch (cause) {
        throw new CoreError('MESSAGE_TEXT_SCRIPT', `Text code ${rule.Match}: ${field} failed during ${phase}.`,
            {entry: rule.Match, field, phase, window: receiver.constructor.name, cause: String(cause?.message ?? cause)});
    }
}

function installMessageText(settings) {
    const base = Window_Base.prototype;
    const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const normalizeSlashes = text => String(text ?? '').replace(/\\/g, '\x1b').replace(/\x1b\x1b/g, '\\');
    function compile(rule, macro) {
        try {
            const pattern = macro ? `\\[${rule.Match}\\]` : `\x1b${rule.Match}${rule.Type}`;
            return {...rule, pattern: new RegExp(pattern, 'gi')};
        } catch (cause) {throw new CoreError('MESSAGE_TEXT_PATTERN', `Invalid text pattern: ${rule.Match}.`, {cause: cause.message});}
    }
    const macros = settings.TextMacros.map(rule => compile(rule, true));
    const replacements = settings.TextCodeReplace.slice().sort((a, b) => b.Match.length - a.Match.length).map(rule => compile(rule, false));
    for (const [index, rule] of macros.entries()) {
        settings.TextMacros[index].textCodeCheck = rule.pattern;
        settings.TextMacros[index].textCodeResult = function(...args) {
            return rule.TextStr && rule.TextStr !== 'Undefined' ? rule.TextStr :
                runMessageTextScript(rule,'TextJS',this,args,'conversion');
        };
    }
    function replaceRules(text, rules, receiver, resolveVariables = false) {
        for (const rule of rules) {
            text = text.replace(rule.pattern, (...args) => {
                const result = rule.TextStr && rule.TextStr !== 'Undefined' ? rule.TextStr :
                    runMessageTextScript(rule, 'TextJS', receiver, args, receiver._messageMeasuring ? 'measurement' : 'conversion');
                return normalizeSlashes(result);
            });
            if (resolveVariables) text = receiver.convertVariableEscapeCharacters(text);
        }
        return text;
    }
    base.convertTextMacros = function(text) {
        text = String(text ?? '');
        this._textMacroFound = false;
        for (const rule of settings.TextMacros) {
            rule.textCodeCheck.lastIndex = 0;
            if (!rule.textCodeCheck.test(text)) continue;
            this._textMacroFound = true;
            rule.textCodeCheck.lastIndex = 0;
            text = text.replace(rule.textCodeCheck,rule.textCodeResult.bind(this));
        }
        return text;
    };
    base.convertBackslashCharacters = normalizeSlashes;
    base.convertVariableEscapeCharacters = function(text) {
        const seen = new Set();
        const variable = /(?:\\|\x1b)V\[(\d+)\]/gi;
        while (variable.test(text)) {
            variable.lastIndex = 0;
            if (seen.has(text) || seen.size >= 100) throw new CoreError('MESSAGE_TEXT_RECURSION', 'Recursive variable text.', {text});
            seen.add(text);
            text = text.replace(variable, (_, id) => normalizeSlashes($gameVariables.value(Number(id))));
        }
        return text;
    };
    base.convertButtonAssistEscapeCharacters = function(text) {
        return text.replace(/<(up|down|left|right|ok|cancel|menu|shift|page ?up|page ?down|pagedn) (?:key|button)>/gi,
            (_, button) => this.convertButtonAssistText(button.toLowerCase().replace(' ', '').replace('pagedn', 'pagedown')));
    };
    base.convertButtonAssistText = function(button) {
        return this.convertVariableEscapeCharacters(normalizeSlashes(TextManager.getInputButtonString(button) || '')).trim();
    };
    base.preConvertEscapeCharacters = function(text) {return text;};
    base.postConvertEscapeCharacters = function(text) {return text;};
    base.convertBaseEscapeCharacters = function(text) {
        return text.replace(/\x1bN\[(\d+)\]/gi, (_, id) => this.actorName(Number(id)))
            .replace(/\x1bP\[(\d+)\]/gi, (_, id) => this.partyMemberName(Number(id)))
            .replace(/\x1bG/gi, () => TextManager.currencyUnit);
    };
    base.convertMessageCoreEscapeReplacements = function(text) {
        return replaceRules(text, replacements, this, true);
    };
    base.convertFontSettingsEscapeCharacters = function(text) {
        for (const [tag, code] of [['B', 'BOLD'], ['I', 'ITALIC']]) {
            text = text.replace(new RegExp(`<${tag}>`, 'gi'), `\x1b${code}[1]`).replace(new RegExp(`</${tag}>`, 'gi'), `\x1b${code}[0]`);
        }
        return text;
    };
    base.convertCasingEscapeCharacters = function(text) {
        for (const [index, aliases] of ['LC|LOWERCASE|LOWER CASE|LOWER','UC|UPPERCASE|UPPER CASE|UPPER','CAPS|CAPSLOCK|CAPS LOCK|CAP','ALT|ALTERNATE|ALT CASE','CHAOS|CHAOSCASE|CHAOS CASE'].entries()) {
            text = text.replace(new RegExp(`<(${aliases})>`, 'gi'), `\x1bCASING[${index+1}]`).replace(new RegExp(`</(${aliases})>`, 'gi'), '\x1bCASING[0]');
        }
        return text;
    };
    base.convertLockColorsEscapeCharacters = function(text) {
        return text.replace(/<colorlock>|\(\(\(/gi, '\x1bCOLORLOCK[1]').replace(/<\/colorlock>|\)\)\)/gi, '\x1bCOLORLOCK[0]');
    };
    base.isAutoColorAffected = function() {return false;};
    for (const Window of [Window_Message, Window_Help, Window_ChoiceList]) Window.prototype.isAutoColorAffected = function() {return true;};
    if (typeof Window_TextPopup !== 'undefined') Window_TextPopup.prototype.isAutoColorAffected = function() {return true;};
    const colorGroups = Array.from({length: 32}, (_, color) => [...(settings.AutoColor[`TextColor${color}`] ?? [])]);
    const words = [];
    let colorsDirty = true;
    const auto = VisuMZ.MessageCore;
    auto.AutoColorRegExp = words;
    const reservedNames = new Set(['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\\','$','.','|','!','^',
        '<B>','</B>','<I>','</I>','<LEFT>','</LEFT>','<CENTER>','</CENTER>','<RIGHT>','</RIGHT>',
        '<COLORLOCK>','</COLORLOCK>','(((',')))','<WORDWRAP>','</WORDWRAP>','<BR>','<LINE BREAK>',
        'PICTURE','CENTERPICTURE','COMMONEVENT','WAIT','SHOW','HIDE','ENABLE','DISABLE','SWITCH','SWITCHES','ALL','ANY']);
    const colorize = (name, color) => `\x1bC[${color}]${name}\x1bPREVCOLOR[0]`;
    function colorRule(name, color, allowCjk) {
        const cjk = allowCjk && /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u2605-\u2606\u2190-\u2195\u203b]/.test(name);
        return [cjk ? new RegExp(escape(name), 'i') : new RegExp(`\\b${escape(name)}\\b`, 'g'), colorize(name, color)];
    }
    for (const [category, group] of [['Class','Classes'],['Skill','Skills'],['Item','Items'],['Weapon','Weapons'],['Armor','Armors'],['Enemy','Enemies'],['State','States']]) {
        const key = `Parse${category}Notetags`, previous = VisuMZ[key];
        VisuMZ[key] = function(record) {
            const result = previous.call(this, record);
            const color = Number(settings.AutoColor[group]);
            let name = record.name.trim();
            if (color > 0 && colorGroups[color] && !/^\d+$/.test(name) && !reservedNames.has(name.toUpperCase())) {
                name = name.replace(/(?:\\|\x1b)I\[\d+\]/gi, '');
                if (name && !name.includes('-----')) {
                    colorGroups[color].push(name);
                    colorsDirty = true;
                }
            }
            return result;
        };
    }
    base.processAutoColorWords = function(text) {
        if (!this.isAutoColorAffected()) return text;
        if (colorsDirty) {
            words.length = 0;
            for (let color = 1; color < colorGroups.length; color++) {
                for (const name of colorGroups[color].slice().sort((a,b) => b.length-a.length)) {
                    if (name && !/^\d+$/.test(name)) words.push(colorRule(name, color, true));
                }
            }
            colorsDirty = false;
        }
        for (const [pattern, replacement] of words) text = text.replace(pattern, replacement);
        const actorColor = Number(settings.AutoColor.Actors);
        if (actorColor > 0 && $gameActors) {
            for (const actor of $gameActors._data) {
                if (!actor) continue;
                const name = actor.name();
                if (!name.trim() || /^\d+$/.test(name) || name.includes('-----')) continue;
                const [pattern, replacement] = colorRule(name, actorColor, false);
                text = text.replace(pattern, replacement);
            }
        }
        return text;
    };
    base.databaseObjectName = function(database, id, icon) {
        if (!database) return '';
        const record = database[id];
        const text = record ? `${icon && record.iconIndex ? `\x1bi[${record.iconIndex}]` : ''}${record.name || ''}` : '';
        const localized = TextManager.parseLocalizedText(text);
        return this.isAutoColorAffected() ? this.applyDatabaseAutoColor(localized, database) : localized;
    };
    base.applyDatabaseAutoColor = function(text, database) {
        for (const [records, category] of [[$dataActors,'Actors'],[$dataClasses,'Classes'],[$dataSkills,'Skills'],
            [$dataItems,'Items'],[$dataWeapons,'Weapons'],[$dataArmors,'Armors'],[$dataEnemies,'Enemies'],[$dataStates,'States']]) {
            if (records !== database) continue;
            const color = Number(settings.AutoColor[category]);
            return color > 0 ? colorize(text, color) : text;
        }
        return text;
    };
    const gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        const result = gainItem.apply(this, arguments);
        if (item && amount > 0) this._lastGainedItemData = {id: item.id, type: DataManager.isItem(item) ? 0 : DataManager.isWeapon(item) ? 1 : 2, quantity: amount};
        return result;
    };
    Game_Party.prototype.getLastGainedItemData = function() {return this._lastGainedItemData ?? {id: -1, type: 0, quantity: 0};};
    base.lastGainedObjectName = function(icon) {
        const data = $gameParty.getLastGainedItemData();
        const item = [$dataItems,$dataWeapons,$dataArmors][data.type][data.id];
        if (!item) return '';
        const name = TextManager.parseLocalizedText(item.name || '');
        return `${icon ? `\x1bi[${item.iconIndex}]` : ''}${name}`;
    };
    base.lastGainedObjectIcon = function() {
        const data = $gameParty.getLastGainedItemData(), item = [$dataItems,$dataWeapons,$dataArmors][data.type][data.id];
        return item ? `\x1bi[${item.iconIndex}]` : '';
    };
    base.lastGainedObjectQuantity = function() {const data = $gameParty.getLastGainedItemData(); return data.id > 0 ? data.quantity : '';};
    base.battleTargetName = function() {return SceneManager.isSceneBattle() ? (BattleManager._target ?? BattleManager._targets?.[0])?.name() ?? '' : '';};
    base.battleUserName = function() {return SceneManager.isSceneBattle() ? (BattleManager._subject ?? (BattleManager.isInputting() ? BattleManager.actor() : null))?.name() ?? '' : '';};
    base.battleActionName = function(icon) {
        if (!SceneManager.isSceneBattle()) return '';
        const action = BattleManager._action ?? (BattleManager.isInputting() ? BattleManager.inputtingAction() : null);
        const item = action?.item();
        return item ? `${icon ? `\x1bI[${item.iconIndex}]` : ''}${item.name}` : '';
    };
    base.isSupportMessageKeywords = function() { return true; };
    base.convertHardcodedEscapeReplacements = function(text) {
        return text.replace(/<(?:CURRENT )?BATTLE TARGET>/gi, () => this.battleTargetName())
            .replace(/<(?:CURRENT )?BATTLE (?:USER|SUBJECT)>/gi, () => this.battleUserName())
            .replace(/<(?:CURRENT )?BATTLE (?:ITEM|SKILL|ACTION)( NAME)?>/gi, (_, name) => this.battleActionName(!name));
    };
    base.convertEscapeCharacters = function(text) {
        text = String(text ?? '');
        text = this.convertTextMacros(text);
        text = this.convertBackslashCharacters(text);
        text = this.convertVariableEscapeCharacters(text);
        for (const method of ['convertButtonAssistEscapeCharacters','preConvertEscapeCharacters','convertFontSettingsEscapeCharacters',
            'convertShowChoiceEscapeCodes','convertTextAlignmentEscapeCharacters','convertLockColorsEscapeCharacters','convertCasingEscapeCharacters','convertBaseEscapeCharacters',
            'convertHardcodedEscapeReplacements','convertMessageCoreEscapeActions','convertMessageCoreEscapeReplacements','postConvertEscapeCharacters']) text = this[method](text);
        return this.processAutoColorWords(this.convertVariableEscapeCharacters(text));
    };
}
installMessageText(messageApi.settings);
