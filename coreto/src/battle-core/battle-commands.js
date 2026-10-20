function installBattleCommands(settings) {
    const actorConfig = settings.ActorCmd;
    const partyConfig = settings.PartyCmd;
    const actorWindow = Window_ActorCommand.prototype;
    const partyWindow = Window_PartyCommand.prototype;
    const label = (icon, text) => '\\I[' + icon + ']' + text;
    const named = (database, value) => database.find(entry => entry && (String(entry.id) === value || entry.name.toLowerCase() === value.toLowerCase()));
    const sealed = (battler, command) => battleHasTag(battleNotes(battler), 'Seal ' + command);
    for (const command of ['Attack','Guard']) {
        const original = Game_BattlerBase.prototype['can' + command];
        Game_BattlerBase.prototype['can' + command] = function() { return !sealed(this, command) && original.call(this); };
    }
    actorWindow.canAddSkillCommand = function(skill) {
        if (!skill) return false;
        const notes = [skill];
        if (battleHasTag(notes, 'Command Require Learn') && !this._actor.isLearnedSkill(skill.id)) return false;
        if (battleHasTag(notes, 'Command Require Access') && !this._actor.hasSkill(skill.id)) return false;
        for (const match of skill.note.matchAll(/<Command (Show|Hide) (?:(All|Any) Switches|Switch):\s*([\d, ]+)>/gi)) {
            const values = match[3].split(',').map(id => $gameSwitches.value(Number(id)));
            const active = match[2]?.toLowerCase() === 'any' ? values.some(Boolean) : values.every(Boolean);
            if (match[1].toLowerCase() === 'show' ? !active : active) return false;
        }
        const action = new Game_Action(this._actor);
        action.setSkill(skill.id);
        return !!runBattleNote(action, skill, 'JS Command Visible', null, true, 'visible');
    };
    actorWindow.makeCommandList = function() {
        if (!this._actor) return;
        const authored = battleNoteBlock(this._actor.currentClass(), 'Battle Commands');
        const commands = authored === undefined ? actorConfig.BattleCmdList : authored.split(/\r?\n/);
        for (const command of commands) this.makeBattleCommand(command.trim());
    };
    actorWindow.makeBattleCommand = function(command) {
        const key = command.toLowerCase();
        const simple = {attack:'addAttackCommand',skills:'addSkillCommands',guard:'addGuardCommand',item:'addItemCommand',status:'addStatusCommand',escape:'addEscapeCommand','auto battle':'addAutoBattleCommand','all skills':'addSingleSkillCommands'};
        if (simple[key]) return this[simple[key]]();
        if (key === 'party' && globalThis.Imported?.VisuMZ_2_PartySystem) return this.addPartyCommand();
        const match = command.match(/^(stype|skill):\s*(.+)$/i);
        if (!match) return;
        if (match[1].toLowerCase() === 'skill') {
            const skill = named($dataSkills, match[2]);
            if (skill) this.addSingleSkillCommand(skill.id);
        } else {
            const id = /^\d+$/.test(match[2]) ? Number(match[2]) : $dataSystem.skillTypes.findIndex(name => name.toLowerCase() === match[2].toLowerCase());
            if (id > 0) this.addSkillTypeCommand(id);
        }
    };
    const skillName = skill => label(Number(skill.note.match(/<Command Icon:\s*(\d+)>/i)?.[1] ?? skill.iconIndex), skill.note.match(/<Command Text:\s*([^>]+)>/i)?.[1] ?? skill.name);
    actorWindow.addAttackCommand = function() {
        const skill = $dataSkills[this._actor.attackSkillId()];
        if (this.canAddSkillCommand(skill)) this.addCommand(skillName(skill), 'attack', this._actor.canAttack());
    };
    actorWindow.addGuardCommand = function() {
        const skill = $dataSkills[this._actor.guardSkillId()];
        if (this.canAddSkillCommand(skill)) this.addCommand(skillName(skill), 'guard', this._actor.canGuard());
    };
    actorWindow.addSkillCommands = function() { for (const id of this._actor.skillTypes()) this.addSkillTypeCommand(id); };
    actorWindow.addSkillTypeCommand = function(id) {
        if (!$dataSystem.skillTypes[id]) return;
        const icon = $dataSystem.magicSkills.includes(id) ? actorConfig.IconStypeMagic : actorConfig.IconStypeNorm;
        this.addCommand(label(icon, $dataSystem.skillTypes[id]), 'skill', !this._actor.isSkillTypeSealed(id), id);
    };
    actorWindow.isHiddenSkill = function(skill) { return [this._actor.attackSkillId(),this._actor.guardSkillId()].includes(skill.id); };
    actorWindow.addSingleSkillCommands = function() { for (const skill of this._actor.skills()) if (!this.isHiddenSkill(skill)) this.addSingleSkillCommand(skill.id); };
    actorWindow.addSingleSkillCommand = function(id) {
        const skill = $dataSkills[id];
        if (this.canAddSkillCommand(skill)) this.addCommand(skillName(skill), 'singleSkill', this._actor.canUse(skill), id);
    };
    actorWindow.isItemCommandEnabled = function() { return !sealed(this._actor, 'Item'); };
    actorWindow.addItemCommand = function() { this.addCommand(label(actorConfig.CmdIconItem,TextManager.item), 'item', this.isItemCommandEnabled()); };
    actorWindow.addStatusCommand = function() { this.addCommand(label(settings.InBattleStatus.CmdIconStatus, TextManager.status), 'status'); };
    actorWindow.isEscapeCommandEnabled = function() { return BattleManager.canEscape(); };
    actorWindow.addEscapeCommand = function() { this.addCommand(label(partyConfig.CmdIconEscape,TextManager.escape), 'escape', this.isEscapeCommandEnabled()); };
    actorWindow.isAutoBattleCommandEnabled = function() { return this._actor.canInput(); };
    actorWindow.addAutoBattleCommand = function() { this.addCommand(label(partyConfig.CmdIconAutoBattle,partyConfig.CmdTextAutoBattle), 'autoBattle', this.isAutoBattleCommandEnabled()); };
    partyWindow.makeCommandList = function() {
        this.addFightCommand();
        if (this.isAutoBattleCommandAdded()) this.addAutoBattleCommand();
        this.addCustomCommands();
        if (partyConfig.CommandAddStatus) this.addStatusCommand();
        if (this.isOptionsCommandAdded()) this.addOptionsCommand();
        this.addEscapeCommand();
    };
    partyWindow.isFightCommandEnabled = function() { return true; };
    partyWindow.addFightCommand = function() { this.addCommand(label(partyConfig.CmdIconFight,TextManager.fight), 'fight', this.isFightCommandEnabled()); };
    partyWindow.isAutoBattleCommandAdded = function() { return partyConfig.CommandAddAutoBattle; };
    partyWindow.isAutoBattleCommandEnabled = function() { return true; };
    partyWindow.addAutoBattleCommand = function() { this.addCommand(label(partyConfig.CmdIconAutoBattle,partyConfig.CmdTextAutoBattle), 'autoBattle', this.isAutoBattleCommandEnabled()); };
    partyWindow.addCustomCommands = function() {};
    partyWindow.addStatusCommand = function() { this.addCommand(label(partyConfig.CmdIconStatus,TextManager.status), 'status'); };
    partyWindow.isOptionsCommandAdded = function() { return partyConfig.CommandAddOptions; };
    partyWindow.isOptionsCommandEnabled = function() { return true; };
    partyWindow.addOptionsCommand = function() { this.addCommand(label(partyConfig.CmdIconOptions,TextManager.options), 'options', this.isOptionsCommandEnabled()); };
    partyWindow.isEscapeCommandEnabled = actorWindow.isEscapeCommandEnabled;
    partyWindow.addEscapeCommand = actorWindow.addEscapeCommand;
    for (const [prototype,config] of [[actorWindow,actorConfig],[partyWindow,partyConfig]]) {
        prototype.createCommandNameWindow = function() {
            const window = this._commandNameWindow = new Window_Base(new Rectangle(0,0,this.width,this.height));
            window.opacity=0;
            this.addChild(window);
        };
        prototype.updateCommandNameWindow = function() {
            if (!this._commandNameWindow) this.createCommandNameWindow();
            const window=this._commandNameWindow,index=this.index();
            window.visible=this.active && this.isOpen() && index>=0 && this.commandStyleCheck(index)==='icon';
            if (!window.visible) return;
            const text=this.commandName(index).replace(/\\I\[\d+\]/gi,''),rect=this.itemRect(index);
            if (window.width!==this.width || window.height!==this.height) {
                window.move(0,rect.y+18,this.width,this.height);
                window.createContents();
                window._commandText=null;
            }
            window.y=rect.y+18;
            if (window._commandText===text) return;
            window._commandText=text;
            window.contents.clear();
            window.contents.fontSize=$gameSystem.mainFontSize()-2;
            const width=Math.min(window.innerWidth,window.textWidth(text)+16);
            window.contents.fillRect((window.innerWidth-width)/2,4,width,this.lineHeight(),ColorManager.dimColor1());
            window.drawText(text,0,4,window.innerWidth,'center');
        };
        const update=prototype.update;
        prototype.update=function() { update.call(this);this.updateCommandNameWindow(); };
        prototype.commandStyle = function() { return config.CmdStyle; };
        prototype.itemTextAlign = function() { return config.CmdTextAlign; };
        prototype.commandStyleCheck = function(index) {
            if (this.commandStyle() !== 'auto') return this.commandStyle();
            return this.textSizeEx(this.commandName(index)).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
        };
        prototype.drawItemStyleIconText = function(index) {
            const rect = this.itemLineRect(index);
            const text = this.commandStyleCheck(index) === 'text' ? this.commandName(index).replace(/\\I\[\d+\]/gi,'') : this.commandName(index);
            const width = this.textSizeEx(text).width;
            const align = this.itemTextAlign();
            const offset = align === 'right' ? rect.width - width : align === 'center' ? (rect.width-width)/2 : 0;
            this.drawTextEx(text,rect.x+Math.max(0,offset),rect.y,rect.width);
        };
        prototype.drawItemStyleIcon = function(index) {
            const icon = Number(this.commandName(index).match(/\\I\[(\d+)\]/i)?.[1] ?? 0);
            const rect = this.itemLineRect(index);
            this.drawIcon(icon, rect.x + (rect.width-ImageManager.iconWidth)/2, rect.y + (rect.height-ImageManager.iconHeight)/2);
        };
        prototype.drawItem = function(index) {
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            if (this.commandStyleCheck(index) === 'icon') this.drawItemStyleIcon(index);
            else this.drawItemStyleIconText(index);
            if (this instanceof Window_ActorCommand && actorConfig.ShowCosts) this.drawSingleSkillCost(index);
            this.changePaintOpacity(true);
        };
    }
    actorWindow.drawSkillCost = function(actor, skill, x, y, width) {
        if (Window_Base.prototype.drawSkillCost) {
            return Window_Base.prototype.drawSkillCost.call(this, actor, skill, x, y, width);
        }
        if (actor.skillTpCost(skill) > 0) {
            this.changeTextColor(ColorManager.tpCostColor());
            this.drawText(actor.skillTpCost(skill), x, y, width, 'right');
        } else if (actor.skillMpCost(skill) > 0) {
            this.changeTextColor(ColorManager.mpCostColor());
            this.drawText(actor.skillMpCost(skill), x, y, width, 'right');
        }
    };
    actorWindow.drawSingleSkillCost = function(index) {
        const command = this._list[index];
        const id = command.symbol === 'attack' ? this._actor.attackSkillId() : command.symbol === 'guard' ? this._actor.guardSkillId() : command.symbol === 'singleSkill' ? command.ext : 0;
        if (!id) return;
        const rect = this.itemLineRect(index);
        this.drawSkillCost(this._actor,$dataSkills[id],rect.x,rect.y,rect.width);
    };
    const scene = Scene_Battle.prototype;
    const createActor = scene.createActorCommandWindow;
    scene.createActorCommandWindow = function() {
        createActor.call(this);
        const window = this._actorCommandWindow;
        window.setHandler('singleSkill', this.actorCommandSingleSkill.bind(this));
        window.setHandler('escape', this.actorCommandEscape.bind(this));
        window.setHandler('autoBattle', this.actorCommandAutoBattle.bind(this));
        window.setHandler('status', () => this.startInBattleStatus(window));
        if (BattleManager.isTpb()) {
            if (partyConfig.DisablePartyCmd) delete window._handlers.cancel;
            else window.setHandler('cancel', this.actorCommandCancelTPB.bind(this));
        }
    };
    scene.actorCommandCancelTPB = function() {
        this._partyCommandWindow.setup();
        this._actorCommandWindow.close();
    };
    const commandFight = scene.commandFight;
    scene.commandFight = function() {
        if (BattleManager.isTpb() && BattleManager.actor()) this.startActorCommandSelection();
        else commandFight.call(this);
    };
    const createParty = scene.createPartyCommandWindow;
    scene.createPartyCommandWindow = function() { this.createPartyCommandWindowBattleCore(); };
    scene.createPartyCommandWindowBattleCore = function() {
        createParty.call(this);
        const window = this._partyCommandWindow;
        window.setHandler('autoBattle', this.commandAutoBattle.bind(this));
        window.setHandler('options', this.commandOptions.bind(this));
        window.setHandler('status', () => this.startInBattleStatus(window));
    };
    scene.actorCommandSingleSkill = function() {
        const action = BattleManager.inputtingAction();
        action.setSkill(this._actorCommandWindow.currentExt());
        BattleManager.actor().setLastBattleSkill(action.item());
        this.onSelectAction();
    };
    for (const method of ['onEnemyCancel','onActorCancel']) {
        const original = scene[method];
        scene[method] = function() {
            original.call(this);
            if (this._actorCommandWindow.currentSymbol() === 'singleSkill') this._actorCommandWindow.activate();
        };
    }
    scene.actorCommandEscape = function() { this.commandEscape(); };
    scene.actorCommandAutoBattle = function() {
        BattleManager.actor().makeAutoBattleActions();
        this.selectNextCommand();
    };
    scene.commandAutoBattle = function() {
        BattleManager._autoBattle = true;
        for (const actor of $gameParty.battleMembers()) if (actor.canMove()) actor.makeAutoBattleActions();
        this.commandFight();
    };
    const createWindows = scene.createAllWindows;
    scene.createAllWindows = function() {
        createWindows.call(this);
        this._actorCommandWindow.setHelpWindow(this._helpWindow);
        this._partyCommandWindow.setHelpWindow(this._helpWindow);
    };
    partyWindow.updateHelp = function() {
        const key = {fight:'HelpFight',autoBattle:'HelpAutoBattle',options:'HelpOptions',escape:'HelpEscape'}[this.currentSymbol()];
        this.setHelpWindowItem({description:this.currentSymbol() === 'status' ? settings.InBattleStatus.HelpStatus : partyConfig[key] || ''});
    };
    actorWindow.updateHelp = function() {
        const symbol = this.currentSymbol();
        const id = symbol === 'attack' ? this._actor.attackSkillId() : symbol === 'guard' ? this._actor.guardSkillId() : symbol === 'singleSkill' ? this.currentExt() : 0;
        if (id) return this.setHelpWindowItem($dataSkills[id]);
        const key = {item:'HelpItem',escape:'HelpEscape',autoBattle:'HelpAutoBattle',party:'HelpParty'}[symbol];
        const description = symbol === 'status' ? settings.InBattleStatus.HelpStatus : symbol === 'skill' ? actorConfig.HelpSkillType.format($dataSystem.skillTypes[this.currentExt()]) : actorConfig[key] || '';
        this.setHelpWindowItem({description});
    };
    scene.isPartyCommandWindowDisabled = function() { return partyConfig.DisablePartyCmd; };
    const startInput=BattleManager.startInput;
    BattleManager.startInput=function(){
        if(!this.isTpb()&&SceneManager._scene instanceof Scene_Battle)SceneManager._scene._coretoPartyCommandVisited=false;
        return startInput.call(this);
    };
    const startParty = scene.startPartyCommandSelection;
    scene.startPartyCommandSelection = function() {
        if (this.isPartyCommandWindowDisabled() || (partyConfig.SkipPartyCmd && !this._coretoPartyCommandVisited)) {
            this._coretoPartyCommandVisited = true;
            this.commandFight();
        } else startParty.call(this);
    };
}
