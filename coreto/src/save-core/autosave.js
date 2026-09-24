function installAutosave(settings){
    const options=settings.AutosaveOption,autosave=settings.Autosave;
    ConfigManager.autosave=options.Default;
    TextManager.autosaveOption=options.Name;
    TextManager.autosaveSuccess=settings.AutosaveConfirm.VocabAutosaveSuccess;
    TextManager.autosaveFailure=settings.AutosaveConfirm.VocabAutosaveFailure;
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeData=function(){const data=makeData.call(this);data.autosave=this.autosave||options.Default;return data;};
    ConfigManager.applyData=function(data){applyData.call(this,data);this.autosave=data.autosave!==undefined?data.autosave:options.Default;};
    DataManager.isAutosaveCompatible=function(){return !this.isBattleTest()&&!this.isEventTest()&&$dataSystem.optAutosave;};
    Game_System.prototype.enableAutosave=function(value){if(!$dataSystem.optAutosave)return;this.initSaveCore();this._SaveCoreSettings.autosaveEnabled=value;};
    Game_System.prototype.isAutosaveEnabled=function(){
        if(!$dataSystem.optAutosave)return false;
        this.initSaveCore();
        if(this._SaveCoreSettings.autosaveEnabled===undefined)this._SaveCoreSettings.autosaveEnabled=true;
        return this._SaveCoreSettings.autosaveEnabled;
    };
    const databaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.process_VisuMZ_SaveCore_Settings=function(){if(StorageManager.saveStyle()==='single')$dataSystem.optAutosave=true;};
    Scene_Boot.prototype.onDatabaseLoaded=function(){databaseLoaded.call(this);this.process_VisuMZ_SaveCore_Settings();};
    const addGeneral=Window_Options.prototype.addGeneralOptions,maxCommands=Scene_Options.prototype.maxCommands;
    Window_Options.prototype.addSaveCoreAutosaveCommand=function(){this.addCommand(TextManager.autosaveOption,'autosave');};
    Window_Options.prototype.addSaveCoreCommands=function(){if(options.AddOption)this.addSaveCoreAutosaveCommand();};
    Window_Options.prototype.addGeneralOptions=function(){addGeneral.call(this);this.addSaveCoreCommands();};
    Scene_Options.prototype.maxCommands=function(){return maxCommands.call(this)+(options.AddOption&&options.AdjustRect?1:0);};
    Scene_Base.prototype.isAutosaveEnabled=function(){return DataManager.isAutosaveCompatible()&&$gameSystem.isAutosaveEnabled()&&(!autosave.RequestsRequireSaveEnable||$gameSystem.isSaveEnabled());};
    const request=Scene_Base.prototype.requestAutosave;
    Scene_Base.prototype.requestAutosave=function(){if(!this._bypassAutosave)request.call(this);this._bypassAutosave=false;};
    Scene_Base.prototype.executeAutosave=function(){if(ConfigManager.autosave)this.forceAutosave();};
    Scene_Base.prototype.forceAutosave=function(){
        $gameSystem.onBeforeSave();this._processingAutosave=false;
        const type=StorageManager.autosaveType(),ids=[];
        if(type==='file0'||type==='both')ids.push(0);
        if((type==='current'||type==='both')&&$gameSystem.savefileId()>0)ids.push($gameSystem.savefileId());
        for(const id of ids)DataManager.saveGame(id).then(()=>this.onAutosaveSuccess()).catch(cause=>{
            if(cause?.code==='SAV_CALLBACK_FAILED')console.error(cause);
            this.onAutosaveFailure();
        });
        this._processingAutosave=false;
    };
    const success=Scene_Base.prototype.onAutosaveSuccess,failure=Scene_Base.prototype.onAutosaveFailure;
    Scene_Base.prototype.onAutosaveSuccess=function(){
        if(this._processingAutosave)return;
        success.call(this);saveCallback(settings,'Autosave.OnAutosaveSuccessJS',this);this.openAutosaveConfirmationWindow(true);this._processingAutosave=true;
    };
    Scene_Base.prototype.onAutosaveFailure=function(){
        if(this._processingAutosave)return;
        failure.call(this);saveCallback(settings,'Autosave.OnAutosaveFailureJS',this);this.openAutosaveConfirmationWindow(false);
    };
    Scene_Base.prototype.determineAutosaveBypass=function(trigger){
        const key={battle:'AfterBattle',transfer:'AfterTransfer',callMenu:'AfterMenuCall',exitMenu:'AfterExitMenu'}[trigger];
        if(!key||trigger==='transfer'&&!this.shouldAutosave())return;
        this._bypassAutosave=!autosave[key];
    };
    const transferEnd=Scene_Map.prototype.onTransferEnd,mapLoaded=Scene_Map.prototype.onMapLoaded,menuCreate=Scene_Menu.prototype.create;
    Scene_Map.prototype.onTransferEnd=function(){if(this.shouldAutosave())this.determineAutosaveBypass('transfer');transferEnd.call(this);};
    Scene_Map.prototype.onMapLoaded=function(){
        mapLoaded.call(this);
        const trigger=SceneManager.isPreviousScene(Scene_Menu)?'exitMenu':SceneManager.isPreviousScene(Scene_Battle)?'battle':null;
        if(trigger){this.determineAutosaveBypass(trigger);this.requestAutosave();}
    };
    Scene_Menu.prototype.create=function(){menuCreate.call(this);if(SceneManager.isPreviousScene(Scene_Map)){this.determineAutosaveBypass('callMenu');this.requestAutosave();}};
    Scene_Battle.prototype.requestAutosave=function(){};
    for(const pluginId of [catalog.pluginId,catalog.reference.pluginId]){
        PluginManager.registerCommand(pluginId,'AutosaveEnable',function(args){
            if(!DataManager.isAutosaveCompatible())return;
            decodeOptionsSaveParameters(args,'AutosaveEnable','SAV_COMMAND_VALUE',args);
            if($gameSystem)$gameSystem.enableAutosave(args.Enable);
        });
        for(const [command,method]of [['AutosaveRequest','requestAutosave'],['AutosaveExecute','executeAutosave'],['AutosaveForce','forceAutosave']])PluginManager.registerCommand(pluginId,command,function(){
            if(DataManager.isAutosaveCompatible()&&!$gameParty.inBattle())SceneManager._scene[method]();
        });
    }
    installAutosaveConfirmation(settings);
}
function installAutosaveConfirmation(settings){
    class Window_AutosaveConfirm extends Window_Base{
        initialize(rect){this._fadeSpeed=0;super.initialize(rect);this.opacity=0;this.contentsOpacity=0;}
        getScreenPosition(){return settings.AutosaveConfirm.ScreenPosition;}
        setSetSuccess(success){this._success=success;this.refresh();}
        refresh(){
            this.contents.clear();const text=this._success?TextManager.autosaveSuccess:TextManager.autosaveFailure,width=Math.ceil(this.textSizeEx(text).width);
            this.width=width+2*($gameSystem.windowPadding()+this.itemPadding());this.updatePosition();this.createContents();this.drawBackground();
            this.drawTextEx(text,Math.floor((this.innerWidth-width)/2),0,width);
        }
        drawBackground(){const half=this.innerWidth/2,c1=ColorManager.dimColor1(),c2=ColorManager.dimColor2();this.contents.gradientFillRect(0,0,half,this.innerHeight,c2,c1);this.contents.gradientFillRect(half,0,half,this.innerHeight,c1,c2);}
        updatePosition(){
            const position=this.getScreenPosition(),padding=$gameSystem.windowPadding();
            this.x=Math.round(/left/i.test(position)?-padding:/right/i.test(position)?Graphics.width-this.width+padding:(Graphics.width-this.width)/2);
            this.y=Math.round(/upper/i.test(position)?-padding:/lower/i.test(position)?Graphics.height-this.height+padding:(Graphics.height-this.height)/2);
        }
        setFadeSpeed(speed){this._fadeSpeed=speed;}
        fadeIn(){this.setFadeSpeed(16);}
        fadeOut(){this.setFadeSpeed(-16);}
        update(){super.update();if(this._fadeSpeed!==0)this.updateFade();}
        updateFade(){this.contentsOpacity+=this._fadeSpeed;if(this.contentsOpacity===0||this.contentsOpacity===255)this.setFadeSpeed(0);}
    }
    globalThis.Window_AutosaveConfirm=Window_AutosaveConfirm;
    Scene_Base.prototype.autosaveConfirmationWindowRect=function(){const width=this.mainCommandWidth(),height=this.calcWindowHeight(1,false);return new Rectangle(Graphics.width-width,Graphics.height-height,width,height);};
    Scene_Base.prototype.isAutosaveConfirmWindowEnabled=function(){return settings.AutosaveConfirm.Enable;};
    Scene_Base.prototype.createAutosaveConfirmationWindow=function(){if(!this._autosaveConfirmWindow)this._autosaveConfirmWindow=new Window_AutosaveConfirm(this.autosaveConfirmationWindowRect());};
    Scene_Base.prototype.openAutosaveConfirmationWindow=function(success){
        if(!this.isAutosaveConfirmWindowEnabled())return this.closeAutosaveConfirmationWindow(success);
        if(!this._autosaveConfirmWindow)this.createAutosaveConfirmationWindow();
        const window=this._autosaveConfirmWindow;this.removeChild(window);this.addChild(window);window.setSetSuccess(success);window.fadeIn();
        setTimeout(this.closeAutosaveConfirmationWindow.bind(this,success),settings.AutosaveConfirm.Duration);
    };
    Scene_Base.prototype.closeAutosaveConfirmationWindow=function(){if(this._autosaveConfirmWindow)this._autosaveConfirmWindow.fadeOut();};
}
