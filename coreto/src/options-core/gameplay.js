function installOptionsGameplay(){
    for(const [method,value]of [['hasEncounterNone',0],['hasEncounterHalf',1]]){
        const previous=Game_Party.prototype[method];
        Game_Party.prototype[method]=function(){
            if(ConfigManager.randomEncounters===value||ConfigManager.assistMode&&ConfigManager.assistRandomEncounters===value)return true;
            return previous.call(this);
        };
    }
    const mapUpdate=Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply=function(){
        mapUpdate.call(this);
        if(ConfigManager.assistMode&&!$gameMessage.isBusy())for(let i=0;i<ConfigManager.assistMapSpeed;i++)this.updateMain();
    };
    for(const [prototype,method,symbol]of [
        [Game_Troop.prototype,'expTotal','assistExpMultiplier'],
        [Game_Troop.prototype,'goldRate','assistGoldMultiplier'],
        [Game_Enemy.prototype,'dropItemRate','assistDropMultiplier']
    ]){
        const previous=prototype[method];
        prototype[method]=function(){
            const value=previous.call(this);
            return ConfigManager.assistMode?value*2**ConfigManager[symbol]:value;
        };
    }
    const useItem=Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem=function(item){
        if(this.isActor()&&ConfigManager.assistMode){
            if(DataManager.isSkill(item)&&!ConfigManager.assistSkillCosts)return;
            if(DataManager.isItem(item)&&!ConfigManager.assistConsumeItems)return;
        }
        return useItem.call(this,item);
    };
    const stateResist=Game_BattlerBase.prototype.isStateResist;
    Game_BattlerBase.prototype.isStateResist=function(stateId){
        if(this.isActor()&&ConfigManager.assistMode&&ConfigManager.assistGodmode&&stateId===this.deathStateId())return true;
        if(this.isActor()&&ConfigManager.assistMode&&ConfigManager.assistResistNegatives&&Imported.VisuMZ_1_SkillsStatesCore){
            const state=$dataStates[stateId];
            if(state&&state.categories&&state.categories.includes('NEGATIVE'))return true;
        }
        return stateResist.call(this,stateId);
    };
    const addDebuff=Game_Battler.prototype.addDebuff;
    Game_Battler.prototype.addDebuff=function(paramId,turns){
        if(this.isActor()&&ConfigManager.assistMode&&ConfigManager.assistResistNegatives&&Imported.VisuMZ_1_SkillsStatesCore)return true;
        return addDebuff.call(this,paramId,turns);
    };
    const hpDamage=Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage=function(target,value){
        if(ConfigManager.assistMode&&this.subject().isActor()&&target.isEnemy()&&ConfigManager.assistInstantKO)value=Math.max(value,target.mhp);
        return hpDamage.call(this,target,value);
    };
    if(Imported.VisuMZ_0_CoreEngine||Imported.VisuMZ_1_BattleCore){
        const requestAnimation=Game_Temp.prototype.requestAnimation;
        Game_Temp.prototype.showRegularAnimations=function(){return !$gameParty.inBattle()||ConfigManager.battleAniShow>0;};
        Game_Temp.prototype.requestAnimation=function(...args){
            if(this.showRegularAnimations())return requestAnimation.apply(this,args);
        };
    }
    if(typeof Game_Temp.prototype.showFauxAnimations==='function'){
        const showFauxAnimations=Game_Temp.prototype.showFauxAnimations;
        Game_Temp.prototype.showFauxAnimations=function(){
            return $gameParty.inBattle()?ConfigManager.battleAniShow===2:showFauxAnimations.call(this);
        };
    }
    const battleUpdate=Scene_Battle.prototype.update;
    Scene_Battle.prototype.update=function(){
        battleUpdate.call(this);
        this.updateOptionsCoreBattleAniSpeed();
    };
    Scene_Battle.prototype.updateOptionsCoreBattleAniSpeed=function(){
        if(this._battleAniSpeedLooping||BattleManager.isInputting()||$gameMessage.isBusy())return;
        this._battleAniSpeedLooping=true;
        for(let i=0;i<ConfigManager.battleAniSpeed;i++){
            this.update();
            SceneManager.updateEffekseer();
        }
        this._battleAniSpeedLooping=false;
    };
}
