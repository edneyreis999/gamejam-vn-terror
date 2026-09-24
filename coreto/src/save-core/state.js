function saveCallback(settings,path,receiver,...args){
    const [group,key]=path.split('.');
    try{return settings[group][key].apply(receiver,args);}
    catch(cause){throw Object.assign(new Error(`Save callback ${path} failed: ${cause.message}`,{cause}),{code:'SAV_CALLBACK_FAILED',field:path});}
}

function installSaveState(settings){
    const init=Game_System.prototype.initialize;
    Game_System.prototype.initialize=function(){init.call(this);this.initSaveCore();};
    Game_System.prototype.initSaveCore=function(){
        this._SaveCoreSettings??={};
        const defaults={autosaveEnabled:true,saveDescription:'',savePicture:''};
        for(const [key,value]of Object.entries(defaults))if(!Object.hasOwn(this._SaveCoreSettings,key))this._SaveCoreSettings[key]=value;
    };
    Game_System.prototype.getSaveDescription=function(){this.initSaveCore();return this._SaveCoreSettings.saveDescription;};
    Game_System.prototype.getSavePicture=function(){this.initSaveCore();return this._SaveCoreSettings.savePicture;};
    Game_System.prototype.setSavePicture=function(value){this.initSaveCore();this._SaveCoreSettings.savePicture=value;};
    Game_System.prototype.setSaveDescription=function(value){
        this.initSaveCore();
        this._SaveCoreSettings.saveDescription=VisuMZ.SaveCore.ParseTextCodes(value);
    };
    VisuMZ.SaveCore.ParseTextCodes=function(text){
        while(text.match(/\\V\[(\d+)\]/gi))text=text.replace(/\\V\[(\d+)\]/gi,(_,id)=>$gameVariables.value(Number(id)));
        while(text.match(/\\N\[(\d+)\]/gi))text=text.replace(/\\N\[(\d+)\]/gi,(_,id)=>Window_Base.prototype.actorName(Number(id)));
        while(text.match(/\\P\[(\d+)\]/gi))text=text.replace(/\\P\[(\d+)\]/gi,(_,id)=>Window_Base.prototype.partyMemberName(Number(id)));
        return text;
    };
    const afterLoad=Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad=function(){
        afterLoad.call(this);
        if($gameMap&&globalThis.Imported?.VisuMZ_1_EventsMoveCore)$gameMap.clearEventCache();
        setTimeout(VisuMZ.SaveCore.RemoveSaveCoreCache.bind(this),settings.SaveConfirm.Duration+10);
    };
    Game_Party.prototype.svbattlersForSaveFile=function(){return this.battleMembers().map(actor=>actor.battlerName());};
    const makeInfo=DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo=function(){return saveCallback(settings,'SaveMenu.MakeSavefileInfoJS',this,makeInfo.call(this));};
    DataManager.maxSavefiles=function(){return settings.Save.MaxSaveFiles+(settings.Save.AutosaveMaxCount?0:1);};
    for(const pluginId of [catalog.pluginId,catalog.reference.pluginId]){
        PluginManager.registerCommand(pluginId,'SaveDescription',function(args){$gameSystem.setSaveDescription(args['Text:str']);});
        PluginManager.registerCommand(pluginId,'SavePicture',function(args){$gameSystem.setSavePicture(args['Filename:str']);});
    }
}
