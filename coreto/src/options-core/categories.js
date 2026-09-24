function installOptionsCategories(settings){
    const categories=settings.Categories,options=categories.flatMap(category=>category.List).filter(option=>option.Symbol);
    const modern=()=>globalThis.Imported?.VisuMZ_0_CoreEngine&&VisuMZ.CoreEngine.Settings.QoL.ModernControls;
    function invoke(option,key,receiver,...args){
        try{return option[key].apply(receiver,args);}
        catch(cause){
            const error=new Error(`Options ${key} (${option.Symbol??option.Name}): ${cause.message}`,{cause});
            error.code='OPT_CALLBACK_FAILED';error.callback=key;throw error;
        }
    }
    const databaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded=function(){
        databaseLoaded.call(this);
        for(const option of options)invoke(option,'DefaultJS',this,undefined,option.Symbol);
    };
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeData=function(){
        const data=makeData.call(this);
        for(const option of options)invoke(option,'SaveJS',this,data,option.Symbol);
        return data;
    };
    ConfigManager.applyData=function(data){
        applyData.call(this,data);
        for(const option of options)invoke(option,data[option.Symbol]===undefined?'DefaultJS':'LoadJS',this,data,option.Symbol);
    };
    class Window_OptionsCategory extends Window_HorzCommand {
        initialize(rect){
            super.initialize(rect);
            this._commandNameWindow=new Window_Base(new Rectangle(0,0,rect.width,rect.height));
            this._commandNameWindow.opacity=0;this.addChild(this._commandNameWindow);
        }
        maxCols(){return this._list?.length??0;}
        isUseModernControls(){return modern();}
        processCursorMove(){if(!modern())super.processCursorMove();}
        processHandling(){if(!modern())super.processHandling();}
        makeCommandList(){
            for(const category of categories){
                if(!invoke(category,'ShowJS',this))continue;
                const name=this.commandStyle()==='text'?category.Name:`\\I[${category.Icon}]${category.Name}`;
                this.addCommand(name,'category',true,category.List);
            }
        }
        setListWindow(window){this._listWindow=window;this.refresh();}
        update(){
            super.update();
            if(this._listWindow)this._listWindow.setCategory(this.currentData());
            this.updateCommandNameWindow();
        }
        itemTextAlign(){return settings.OptionsSettings.CategoryTextAlign;}
        commandStyle(){return settings.OptionsSettings.CategoryStyle;}
        usesIconOnly(index){
            const style=this.commandStyle();
            return style==='icon'||style==='auto'&&this.textSizeEx(this.commandName(index)).width>this.itemLineRect(index).width;
        }
        callUpdateHelp(){
            super.callUpdateHelp();
            if(this._commandNameWindow)this.updateCommandNameWindow(true);
        }
        updateCommandNameWindow(force=false){
            const name=this.currentData()&&this.usesIconOnly(this.index())?this.commandName(this.index()).replace(/^\\I\[\d+\]/,''):'';
            if(!force&&this._commandName===name)return;
            this._commandName=name;const window=this._commandNameWindow;window.contents.clear();
            if(!name)return;
            const rect=this.itemLineRect(this.index());
            window.x=this.padding+rect.x+rect.width/2-window.width/2;window.y=this.lineHeight()/2;
            window.drawText(name,0,rect.y,window.innerWidth,'center');
        }
        drawItem(index){
            const rect=this.itemLineRect(index),name=this.commandName(index),style=this.commandStyle();
            this.resetTextColor();this.changePaintOpacity(this.isCommandEnabled(index));
            if(style==='text')this.drawText(name,rect.x,rect.y,rect.width,this.itemTextAlign());
            else if(this.usesIconOnly(index)){
                const icon=Number(/^\\I\[(\d+)\]/.exec(name)[1]);
                this.drawIcon(icon,rect.x+(rect.width-ImageManager.iconWidth)/2,rect.y+(this.lineHeight()-ImageManager.iconHeight)/2);
            }else{
                const remaining=rect.width-this.textSizeEx(name).width,align=this.itemTextAlign();
                const x=rect.x+(align==='center'?remaining/2:align==='right'?remaining:0);
                this.drawTextEx(name,x,rect.y,rect.width);
            }
        }
    }
    globalThis.Window_OptionsCategory=Window_OptionsCategory;
    const window=Window_Options.prototype;
    const initialize=window.initialize;
    window.initialize=function(rect){this._name=null;this._data=null;initialize.call(this,rect);};
    window.makeCommandList=function(){
        this._coretoOptionRows=[];
        for(const option of this._data??[]){
            if(!invoke(option,'ShowJS',this))continue;
            const text=option.TextStr&&option.TextStr!=='Untitled'?option.TextStr:invoke(option,'TextJS',this);
            const name=option.Icon?`\\I[${option.Icon}]`+text:text;
            this.addCommand(name,option.Symbol,invoke(option,'EnableJS',this),invoke(option,'ExtJS',this));
            this._coretoOptionRows.push(option);
        }
    };
    window.setCategory=function(command){
        if(!command||this._name===command.name)return;
        this._name=command.name;this._data=command.ext;this.smoothScrollTo(0,0);this.refresh();
        if(modern())this.select(0);
    };
    window.drawItem=function(index){
        this.resetFontSettings();this.changePaintOpacity(this.isCommandEnabled(index));
        const row=this._coretoOptionRows[index];this._currentDrawingIndex=index;
        try{invoke(row,'DrawJS',this,row.Symbol,index);}
        finally{this._currentDrawingIndex=undefined;}
    };
    for(const [method,callback]of [['processOk','ProcessOkJS'],['cursorRight','CursorRightJS'],['cursorLeft','CursorLeftJS']]){
        window[method]=function(){
            const index=this.index(),symbol=this.commandSymbol(index),row=this._coretoOptionRows[index];
            if(!this.isCommandEnabled(index)){this.playBuzzerSound();return;}
            invoke(row,callback,this,symbol,index);
        };
    }
    Scene_Options.ADD_REBIND_OPTIONS=settings.Rebind.EnableRebind&&globalThis.Imported?.VisuMZ_0_CoreEngine&&VisuMZ.CoreEngine.version>1.65;
    window.isRebindingEnabled=function(){return Scene_Options.ADD_REBIND_OPTIONS;};
    window.isUseModernControls=modern;
    const scene=Scene_Options.prototype;
    scene.create=function(){
        Scene_MenuBase.prototype.create.call(this);
        this.createCategoryWindow();this.createOptionsWindow();this.postCreateWindows();
    };
    scene.helpAreaHeight=function(){return 0;};
    scene.isUseModernControls=modern;
    scene.categoryWindowRect=function(){return new Rectangle(0,this.mainAreaTop(),Graphics.boxWidth,this.calcWindowHeight(1,true));};
    scene.optionsWindowRect=function(){const rect=this.categoryWindowRect();return new Rectangle(0,rect.y+rect.height,Graphics.boxWidth,this.mainAreaHeight()-rect.height);};
    scene.createCategoryWindow=function(){
        this._categoryWindow=new Window_OptionsCategory(this.categoryWindowRect());
        this.addWindow(this._categoryWindow);
        if(!this.isUseModernControls()){
            this._categoryWindow.setHandler('category',this.commandCategory.bind(this));
            this._categoryWindow.setHandler('cancel',this.popScene.bind(this));
        }
    };
    scene.createOptionsWindow=function(){
        this._optionsWindow=new Window_Options(this.optionsWindowRect());
        this._optionsWindow.setHandler('cancel',modern()?this.popScene.bind(this):this.onListCancel.bind(this));
        if(modern()){
            this._optionsWindow.setHandler('pageup',()=>this.switchCategory(-1));
            this._optionsWindow.setHandler('pagedown',()=>this.switchCategory(1));
        }
        this._optionsWindow.deactivate();this._optionsWindow.deselect();
        this._categoryWindow.setListWindow(this._optionsWindow);this.addWindow(this._optionsWindow);
    };
    scene.postCreateWindows=function(){this.updateOptionsSceneBgTypes();if(modern()){this._optionsWindow.activate();this._optionsWindow.select(0);}};
    scene.switchCategory=function(offset){
        const window=this._categoryWindow,count=window.maxItems();
        if(count)window.select((window.index()+offset+count)%count);
        this._optionsWindow.setCategory(window.currentData());this._optionsWindow.activate();
    };
    scene.commandCategory=function(){this._optionsWindow.activate();this._optionsWindow.smoothSelect(0);};
    scene.onListCancel=function(){this._optionsWindow.deselect();this._optionsWindow.deactivate();this._categoryWindow.activate();};
    scene.buttonAssistText1=function(){return settings.OptionsSettings.buttonAssistCategory;};
    scene.updateOptionsSceneBgTypes=function(){
        const s=settings.OptionsSettings;
        this._categoryWindow.setBackgroundType(s.categoryWindowBgType);
        this._optionsWindow.setBackgroundType(s.optionsWindowBgType);
        this._buttonAssistWindow?.setBackgroundType(s.buttonAssistBgType);
    };
    scene.refreshWindows=function(){this._categoryWindow.refresh();this._optionsWindow.refresh();this._buttonAssistWindow?.refresh();};
    window.refreshWindows=function(){SceneManager._scene.refreshWindows();};
}
