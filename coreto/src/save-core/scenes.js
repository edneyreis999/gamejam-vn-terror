function installSaveScenes(settings){
    StorageManager.saveStyle=function(){return settings.Save.SaveStyle;};
    StorageManager.autosaveType=function(){return this.saveStyle()==='single'?'file0':settings.Autosave.AutosaveType;};
    Object.assign(TextManager,{pickLockedSaveSlot:settings.Save.VocabLockedSaveSlot,saveSuccess:settings.SaveConfirm.VocabSaveSuccess,saveFailure:settings.SaveConfirm.VocabSaveFailure,loadFailure:settings.SaveConfirm.VocabLoadFailure});
    const maxSavefiles=DataManager.maxSavefiles;
    DataManager.maxSavefiles=function(){return StorageManager.saveStyle()==='single'?1:maxSavefiles.call(this);};
    const savefileId=Game_System.prototype.savefileId;
    Game_System.prototype.savefileId=function(){
        const style=StorageManager.saveStyle();
        if(style==='single')return 0;
        const id=savefileId.call(this);
        return style==='locked'?id||1:id;
    };
    const newGame=Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame=function(){
        if(StorageManager.saveStyle()!=='locked')return newGame.call(this);
        this.commandNewGameSaveCoreLocked();
    };
    Scene_Title.prototype.commandNewGameSaveCoreLocked=function(){
        DataManager.setupNewGame();$gameTemp._pickLockedSaveSlot=true;
        this._commandWindow.close();SceneManager.push(Scene_Save);
    };
    const help=Scene_Save.prototype.helpWindowText;
    Scene_Save.prototype.helpWindowText=function(){return $gameTemp._pickLockedSaveSlot?TextManager.pickLockedSaveSlot:help.call(this);};
    Scene_Save.prototype.startNewGameLockedSave=function(id){
        $gameTemp._pickLockedSaveSlot=false;SoundManager.playLoad();$gameSystem.setSavefileId(id);
        this.fadeOutAll();SceneManager.goto(Scene_Map);
    };
    const pop=Scene_Save.prototype.popScene;
    Scene_Save.prototype.popScene=function(){
        $gameTemp._pickLockedSaveSlot=false;pop.call(this);
    };
    Scene_Base.prototype.saveConfirmationWindowRect=function(){return saveCallback(settings,'SaveConfirm.ConfirmRect',this);};
    Scene_Base.prototype.isSaveConfirmWindowEnabled=function(){return settings.SaveConfirm.Enable;};
    Scene_Base.prototype.createSaveConfirmationWindow=function(){
        if(this._saveConfirmWindow)return;
        this._saveConfirmWindow=new Window_Base(this.saveConfirmationWindowRect());this._saveConfirmWindow.openness=0;
    };
    Scene_Base.prototype.openSaveConfirmationWindow=function(success,loadFailure=false){
        if(!this.isSaveConfirmWindowEnabled())return this.closeSaveConfirmationWindow(success);
        if(!this._saveConfirmWindow)this.createSaveConfirmationWindow();
        const window=this._saveConfirmWindow;
        this.removeChild(window);this.addChild(window);window.open();window.resetFontSettings();window.contents.clear();
        const text=loadFailure?TextManager.loadFailure:success?TextManager.saveSuccess:TextManager.saveFailure;
        const width=window.textSizeEx(text).width;
        window.drawTextEx(text,(window.innerWidth-width)/2,0,width);
        setTimeout(this.closeSaveConfirmationWindow.bind(this,success),settings.SaveConfirm.Duration);
    };
    Scene_Base.prototype.closeSaveConfirmationWindow=function(){if(this._saveConfirmWindow)this._saveConfirmWindow.close();};
    Scene_Base.prototype.loadFailureConfirmationWindow=function(){this.openSaveConfirmationWindow(false,true);};
    for(const Scene of [Scene_Save,Scene_Load])Scene.prototype.closeSaveConfirmationWindow=function(success){
        Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this.activateListWindow();
    };
    function saved(scene){SoundManager.playSave();saveCallback(settings,'Save.OnSaveSuccessJS',scene);}
    function failed(scene){SoundManager.playBuzzer();saveCallback(settings,'Save.OnSaveFailureJS',scene);}
    Scene_Save.prototype.onSaveSuccess=function(){saved(this);this._listWindow.refresh();this.openSaveConfirmationWindow(true);};
    Scene_Save.prototype.onSaveFailure=function(){failed(this);this.openSaveConfirmationWindow(false);};
    Scene_Save.prototype.executeSave=function(id){
        if($gameTemp._pickLockedSaveSlot)return this.startNewGameLockedSave(id);
        $gameSystem.setSavefileId(id);$gameSystem.onBeforeSave();
        DataManager.saveGame(id).then(()=>this.onSaveSuccess()).catch(()=>this.onSaveFailure());
    };
    const loaded=Scene_Load.prototype.onLoadSuccess;
    VisuMZ.SaveCore.RemoveSaveCoreCache=function(){$gameSystem._saveCorePluginCommandSave=undefined;};
    Scene_Load.prototype.onLoadSuccess=function(){loaded.call(this);saveCallback(settings,'Save.OnLoadSuccessJS',this);setTimeout(VisuMZ.SaveCore.RemoveSaveCoreCache.bind(this),1000);};
    Scene_Load.prototype.onLoadFailure=function(){SoundManager.playBuzzer();saveCallback(settings,'Save.OnLoadFailureJS',this);this.loadFailureConfirmationWindow();};
    Scene_Base.prototype.saveCurrentSlot=function(){};
    Scene_Map.prototype.saveCurrentSlot=function(){
        if($gameSystem._saveCorePluginCommandSave)return;
        const id=$gameSystem.savefileId();
        if(StorageManager.saveStyle()!=='single'&&id<=0)return;
        this._active=false;$gameSystem.setSavefileId(id);$gameSystem.onBeforeSave();$gameSystem._saveCorePluginCommandSave=true;
        DataManager.saveGame(id).then(()=>this.onSaveSuccess()).catch(()=>this.onSaveFailure());
        $gameSystem._saveCorePluginCommandSave=undefined;
    };
    Scene_Map.prototype.onSaveSuccess=function(){saved(this);this.openSaveConfirmationWindow(true);};
    Scene_Map.prototype.onSaveFailure=function(){failed(this);this.openSaveConfirmationWindow(false);};
    Scene_Map.prototype.closeSaveConfirmationWindow=function(success){Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this._active=true;};
    const menuSave=Scene_Menu.prototype.commandSave;
    Scene_Menu.prototype.commandSave=function(){return StorageManager.saveStyle()==='standard'?menuSave.call(this):this.commandSaveLocked();};
    Scene_Menu.prototype.commandSaveLocked=function(){
        const id=$gameSystem.savefileId();$gameSystem.setSavefileId(id);$gameSystem.onBeforeSave();
        DataManager.saveGame(id).then(()=>this.onSaveCoreSaveSuccess()).catch(()=>this.onSaveCoreSaveFailure());
    };
    Scene_Menu.prototype.onSaveCoreSaveSuccess=function(){saved(this);this.openSaveConfirmationWindow(true);};
    Scene_Menu.prototype.onSaveCoreSaveFailure=function(){failed(this);this.openSaveConfirmationWindow(false);};
    Scene_Menu.prototype.closeSaveConfirmationWindow=function(success){Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this._commandWindow.activate();};
    const continueGame=Scene_Title.prototype.commandContinue;
    Scene_Title.prototype.commandContinue=function(){
        if(StorageManager.saveStyle()!=='single')return continueGame.call(this);
        return this.commandContinueSaveCoreSingle();
    };
    Scene_Title.prototype.commandContinueSaveCoreSingle=function(){DataManager.loadGame(0).then(()=>this.onSaveCoreLoadSuccess()).catch(()=>this.onSaveCoreLoadFailure());};
    Scene_Title.prototype.onSaveCoreLoadSuccess=function(){
        this._commandWindow.close();SoundManager.playLoad();this.fadeOutAll();Scene_Load.prototype.reloadMapIfUpdated.call(this);
        SceneManager.goto(Scene_Map);this._loadSuccess=true;saveCallback(settings,'Save.OnLoadSuccessJS',this);
    };
    Scene_Title.prototype.onSaveCoreLoadFailure=function(){SoundManager.playBuzzer();saveCallback(settings,'Save.OnLoadFailureJS',this);this.loadFailureConfirmationWindow();};
    Scene_Title.prototype.closeSaveConfirmationWindow=function(success){Scene_Base.prototype.closeSaveConfirmationWindow.call(this,success);this._commandWindow.open();this._commandWindow.activate();};
    const terminateTitle=Scene_Title.prototype.terminate;
    Scene_Title.prototype.terminate=function(){terminateTitle.call(this);if(this._loadSuccess)$gameSystem.onAfterLoad();};
    const needsFadeIn=Scene_Map.prototype.needsFadeIn;
    Scene_Map.prototype.needsFadeIn=function(){return needsFadeIn.call(this)||SceneManager.isPreviousScene(Scene_Title);};
    for(const pluginId of [catalog.pluginId,catalog.reference.pluginId])PluginManager.registerCommand(pluginId,'SaveCurrentSlot',function(){
        if(SceneManager._scene instanceof Scene_Map)return SceneManager._scene.saveCurrentSlot();
    });
}
