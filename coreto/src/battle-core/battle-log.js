function installBattleLog(settings) {
    const config = settings.BattleLog;
    const log = Window_BattleLog.prototype;
    BattleManager.displayStartMessages=function(){
        const show=text=>{this._logWindow.push('addText',text);this._logWindow.push('wait');};
        if(settings.Enemy.EmergeText)for(const name of $gameTroop.enemyNames())show(TextManager.emerge.format(name));
        if(this._preemptive)show(TextManager.preemptive.format($gameParty.name()));
        else if(this._surprise)show(TextManager.surprise.format($gameParty.name()));
        if(settings.Enemy.EmergeText){this._logWindow.push('wait');this._logWindow.push('clear');}
    };
    Scene_Battle.prototype.logWindowRect = function() { return config.BattleLogRectJS.call(this); };
    log.maxLines = function() { return config.MaxLines; };
    log.messageSpeed = function() { return config.MessageWait; };
    log.addText=function(text){this._lines.push(text);this.refresh();};
    log.backColor = function() { return config.BackColor; };
    log.drawLineText = function(index) {
        const rect = this.lineRect(index);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
        const text = this._lines[index];
        const width = this.textSizeEx(text).width;
        const offset = /<(?:LEFT|CENTER|RIGHT)>/i.test(text) ? 0 : config.TextAlign === 'right' ? rect.width - width : config.TextAlign === 'center' ? (rect.width - width) / 2 : 0;
        this.drawTextEx(text, rect.x + Math.max(0, offset), rect.y, rect.width);
    };
    log.startTurn = function() {
        if (config.StartTurnShow) {
            this.push('addText', config.StartTurnMsg.format($gameTroop.turnCount()));
            this.push('waitForTime', config.StartTurnWait);
            this.push('clear');
        }
    };
    log.waitForTime = function(frames) { this._waitCount = Number(frames); };
    log.displayAction = function(subject, item) {
        if (config.ActionCenteredName) {
            const icon = item.note.match(/<Display Icon: (\d+)>/i)?.[1] ?? item.iconIndex;
            const text = item.note.match(/<Display Text: (.*)>/i)?.[1] ?? item.name;
            this.push('addText', '<CENTER>\\I[' + icon + ']' + text);
        }
        if (DataManager.isSkill(item)) {
            if (config.ActionSkillMsg1) this.displayItemMessage(item.message1, subject, item);
            if (config.ActionSkillMsg2) this.displayItemMessage(item.message2, subject, item);
        } else if (config.ActionItemMsg) this.displayItemMessage(TextManager.useItem, subject, item);
    };
    for (const [method, flag] of [['displayFailure','ShowFailure'], ['displayCritical','ShowCritical'], ['displayCurrentState','ShowCurrentState'], ['displayRemovedStates','ShowRemovedState']]) {
        const original = log[method];
        log[method] = function(...args) { if (config[flag]) return original.apply(this, args); };
    }
    for (const [method, motion, message, flag] of [
        ['displayCounter','performCounter','counterAttack','ShowCounter'],
        ['displayReflection','performReflection','magicReflection','ShowReflect']
    ]) log[method] = function(target) {
        this.push(motion, target);
        if (config[flag]) {
            this.push('addText', TextManager[message].format(target.name()));
            this.push('waitForTime', config[flag + 'Wait']);
        }
    };
    log.displaySubstitute = function(substitute, target) {
        this.push('performSubstitute', substitute, target);
        if (config.ShowSubstitute) {
            this.push('addText', TextManager.substitute.format(substitute.name(), target.name()));
            this.push('waitForTime', config.ShowSubstituteWait);
        }
    };
    log.displayMiss = function(target) {
        const physical = target.result().physical;
        if (physical) this.push('performMiss', target);
        if (config.ShowMissEvasion) {
            const fmt = physical ? (target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit) : TextManager.actionFailure;
            this.push('addText', fmt.format(target.name()));
        }
    };
    log.displayEvasion = function(target) {
        const physical = target.result().physical;
        this.push(physical ? 'performEvasion' : 'performMagicEvasion', target);
        if (config.ShowMissEvasion) this.push('addText', (physical ? TextManager.evasion : TextManager.magicEvasion).format(target.name()));
    };
    log.displayHpDamage = function(target) {
        const result = target.result();
        if (!result.hpAffected) return;
        if (result.hpDamage > 0 && !result.drain) this.push('performDamage', target);
        if (result.hpDamage < 0) this.push('performRecovery', target);
        if (config.ShowHpDmg) this.push('addText', this.makeHpDamageText(target));
    };
    for (const resource of ['Mp','Tp']) log['display' + resource + 'Damage'] = function(target) {
        const damage = target.result()[resource.toLowerCase() + 'Damage'];
        if (!target.isAlive() || damage === 0) return;
        if (damage < 0) this.push('performRecovery', target);
        if (config['Show' + resource + 'Dmg']) this.push('addText', this['make' + resource + 'DamageText'](target));
    };
    log.displayAddedStates = function(target) {
        for (const state of target.result().addedStateObjects()) {
            if (state.id === target.deathStateId()) this.push('performCollapse', target);
            const text = target.isActor() ? state.message1 : state.message2;
            if (config.ShowAddedState && text) {
                this.push('popBaseLine');
                this.push('pushBaseLine');
                this.push('addText', text.format(target.name()));
                this.push('waitForEffect');
            }
        }
    };
    log.displayChangedBuffs = function(target) {
        const result = target.result();
        if (config.ShowAddedBuff) this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
        if (config.ShowAddedDebuff) this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
        if (config.ShowRemovedBuff) this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
    };
}
