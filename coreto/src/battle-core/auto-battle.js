function installBattleAutoBattle(settings) {
    const config=settings.AutoBattle;
    ConfigManager.autoBattleAtStart = false;
    ConfigManager.autoBattleUseSkills = false;
    const addOptions=Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions=function(){
        addOptions.call(this);
        if(config.AddOption){
            this.addCommand(config.StartName,'autoBattleAtStart');
            this.addCommand(config.StyleName,'autoBattleUseSkills');
        }
    };
    const statusText=Window_Options.prototype.statusText;
    Window_Options.prototype.statusText=function(index){
        if(this.commandSymbol(index)==='autoBattleUseSkills')return this.getConfigValue('autoBattleUseSkills')?config.StyleON:config.StyleOFF;
        return statusText.call(this,index);
    };
    const maxCommands=Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands=function(){return maxCommands.call(this)+(config.AddOption&&config.AdjustRect?2:0);};
    const makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        return {...makeData.call(this),autoBattleAtStart:this.autoBattleAtStart,autoBattleUseSkills:this.autoBattleUseSkills};
    };
    const applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        applyData.call(this, config);
        this.autoBattleAtStart = this.readFlag(config, 'autoBattleAtStart', false);
        this.autoBattleUseSkills = this.readFlag(config, 'autoBattleUseSkills', false);
    };
    const startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        this._autoBattle = ConfigManager.autoBattleAtStart;
        return startBattle.call(this);
    };
    const isAutoBattle = Game_Actor.prototype.isAutoBattle;
    Game_Actor.prototype.isAutoBattle = function() {
        return ($gameParty.inBattle() && BattleManager._autoBattle) || isAutoBattle.call(this);
    };
    const makeActionList = Game_Actor.prototype.makeActionList;
    Game_Actor.prototype.makeActionList = function() {
        const actions = makeActionList.call(this);
        if (!BattleManager._autoBattle || ConfigManager.autoBattleUseSkills) return actions;
        const attacks = actions.filter(action => action.isAttack());
        if (attacks.length === 0 && this.canGuard()) {
            const guard = new Game_Action(this);
            guard.setGuard();
            attacks.push(guard);
        }
        return attacks;
    };
    class Window_AutoBattleCancel extends Window_Base {
        constructor(rect) {
            super(rect);
            this.setBackgroundType(this.bgType());
            this.refresh();
            this.updateVisibility();
        }
        bgType() { return config.AutoBattleBgType; }
        okButtonText() { return TextManager.getInputButtonString('ok'); }
        cancelButtonText() { return TextManager.getInputButtonString('cancel'); }
        refresh() {
            this.contents.clear();
            this._text=config.AutoBattleMsg.format(this.okButtonText(),this.cancelButtonText());
            const width=this.textSizeEx(this._text).width;
            this.drawTextEx(this._text,(this.innerWidth-width)/2,0,this.innerWidth);
        }
        updateVisibility() { this.visible=!!BattleManager._autoBattle; }
        updateCancel() {
            if(this.visible&&(Input.isTriggered('ok')||Input.isTriggered('cancel')||TouchInput.isCancelled()))BattleManager._autoBattle=false;
        }
        update() {
            super.update();
            this.updateVisibility();
            if(this.visible&&this._text!==config.AutoBattleMsg.format(this.okButtonText(),this.cancelButtonText()))this.refresh();
            this.updateCancel();
        }
    }
    globalThis.Window_AutoBattleCancel=Window_AutoBattleCancel;
    Scene_Battle.prototype.autoBattleWindowRect=function(){return config.AutoBattleRect.call(this);};
    Scene_Battle.prototype.createAutoBattleWindow=function(){
        this._autoBattleWindow=new Window_AutoBattleCancel(this.autoBattleWindowRect());
        this.addWindow(this._autoBattleWindow);
    };
    const createWindows=Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows=function(){createWindows.call(this);this.createAutoBattleWindow();};
}
