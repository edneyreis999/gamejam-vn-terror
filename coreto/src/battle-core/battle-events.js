function installBattleEvents(settings) {
    const troops = new WeakMap();
    const troop = Game_Troop.prototype.troop;
    Game_Troop.prototype.troop = function() { return troops.get(this) ?? troop.call(this); };
    const setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(id) {
        troops.delete(this);
        const source=$dataTroops[id],pages=source.pages.slice(),members=source.members.slice();
        const extension=DataManager.createTroopNote(id).match(/<Extend: ([\d, ]+)>/i);
        if(extension)for(const extraId of extension[1].split(','))members.push(...($dataTroops[Number(extraId)]?.members??[]));
        for(const baseId of settings.Mechanics.BaseTroopIDs) {
            if(Number(baseId)!==id)pages.push(...($dataTroops[Number(baseId)]?.pages??[]));
        }
        troops.set(this,{...source,pages,members});
        setup.call(this,id);
    };

    const validEvent=id=>Boolean($dataCommonEvents[id]?.list.length>1);
    const clearInterpreter=Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear=function(){delete this._coretoBattlePreEventIndex;return clearInterpreter.call(this);};
    const battleCommand=Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301=function(params) {
        const id=settings.Mechanics.BattleStartEvent;
        if (!$gameParty.inBattle() && validEvent(id) && this._coretoBattlePreEventIndex !== this._index) {
            this._coretoBattlePreEventIndex=this._index;
            this.setupChild($dataCommonEvents[id].list,this.isOnCurrentMap()?this._eventId:0);
            return false;
        }
        delete this._coretoBattlePreEventIndex;
        return battleCommand.call(this,params);
    };
    BattleManager.processPostBattleCommonEvents = function(kind) {
        const ids=kind==='EscapeFail'?[]:[settings.Mechanics.BattleEndEvent];
        ids.push(settings.Mechanics[kind+'Event']);
        for(const id of ids)if(validEvent(id))$gameTemp.reserveCommonEvent(id);
    };
    for(const [method,kind]of [['processVictory','Victory'],['processDefeat','Defeat'],['onEscapeSuccess','EscapeSuccess'],['onEscapeFailure','EscapeFail']]){
        const previous=BattleManager[method];
        BattleManager[method]=function(...args){const result=previous.apply(this,args);this.processPostBattleCommonEvents(kind);return result;};
    }
    let encounterInterpreter=null;
    const onEncounter=BattleManager.onEncounter;
    BattleManager.onEncounter=function(){
        onEncounter.call(this);
        if(settings.Mechanics.DefeatEvent>0)this._canLose=true;
        const id=settings.Mechanics.BattleStartEvent;
        if(validEvent(id)){
            encounterInterpreter=$gameMap._interpreter;
            $gameTemp.reserveCommonEvent(id);
            $gameMap.updateInterpreter();
        }
    };
    const launchBattle=Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle=function(){
        if(encounterInterpreter)this._active=true;
        else launchBattle.call(this);
    };
    const isSceneChanging=SceneManager.isSceneChanging;
    SceneManager.isSceneChanging=function(){return encounterInterpreter?false:isSceneChanging.call(this);};
    const terminate=Game_Interpreter.prototype.terminate;
    Game_Interpreter.prototype.terminate=function(){
        const result=terminate.call(this);
        if(this===encounterInterpreter){
            encounterInterpreter=null;
            if(SceneManager._scene instanceof Scene_Map && SceneManager.isNextScene(Scene_Battle))SceneManager._scene.stop();
        }
        return result;
    };
    for(const method of ['createGameObjects','extractSaveContents']){
        const previous=DataManager[method];
        DataManager[method]=function(...args){encounterInterpreter=null;return previous.apply(this,args);};
    }
}
