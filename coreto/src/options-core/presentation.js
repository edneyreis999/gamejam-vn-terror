function installOptionsPresentation(settings){
    TextManager.optionsCoreFonts=[...settings.OptionsSettings.FontFaces];
    const base=Scene_Base.prototype,selectable=Window_Selectable.prototype;
    for(const [method,key,custom]of [
        ['isBottomButtonMode','uiButtonPosition',false],
        ['isBottomHelpMode','uiHelpPosition',true],
        ['isRightInputMode','uiInputPosition',true]
    ]){
        const previous=base[method];
        base[method]=function(){
            if((!custom||ConfigManager.uiMenuStyle)&&ConfigManager[key]!==undefined)return ConfigManager[key];
            return previous.call(this);
        };
    }
    Graphics._isFPSCounterOn=function(){return this._fpsCounter&&this._fpsCounter._boxDiv.style.display!=='none';};
    const createPageButtons=Scene_MenuBase.prototype.createPageButtons;
    Scene_MenuBase.prototype.createPageButtons=function(){
        createPageButtons.call(this);
        if(Graphics._isFPSCounterOn()&&!this.isBottomButtonMode()){
            this._pageupButton.y+=50;
            this._pagedownButton.y+=50;
        }
    };
    const hover=selectable.isHoverEnabled;
    selectable.isHoverEnabled=function(){return ConfigManager.uiHoverSelect===undefined?hover.call(this):ConfigManager.uiHoverSelect;};
    const mainFontFace=Game_System.prototype.mainFontFace;
    Game_System.prototype.mainFontFace=function(){
        const index=ConfigManager.textFont,font=TextManager.optionsCoreFonts[index];
        return index>0&&font?font:mainFontFace.call(this);
    };
    const initializeSystem=Game_System.prototype.initialize;
    Game_System.prototype.initialize=function(){initializeSystem.call(this);this.windowTone();};
    Game_System.prototype.windowTone=function(){
        if(!this._windowTone)this._windowTone=$dataSystem.windowTone.slice();
        return this._windowTone;
    };
    const setupNewGame=DataManager.setupNewGame;
    DataManager.setupNewGame=function(){
        const tone=$gameSystem?.windowTone().slice();
        setupNewGame.call(this);
        if(tone)$gameSystem.setWindowTone(tone);
    };
    Graphics._stretchScreenOptionsCore=function(){
        if(ConfigManager.stretchScreen!==undefined){
            ConfigManager.stretchScreen=!!this._stretchEnabled;
            setTimeout(ConfigManager.save.bind(ConfigManager),100);
        }
        const current=SceneManager._scene;
        if(current?.constructor===Scene_Options)setTimeout(current.refreshWindows.bind(current),100);
    };
    const switchStretch=Graphics._switchStretchMode;
    Graphics._switchStretchMode=function(){switchStretch.call(this);this._stretchScreenOptionsCore();};
    const scene=Scene_Options.prototype,window=Window_Options.prototype;
    window.updateButtonVisibility=function(){
        const current=SceneManager._scene;
        if(ConfigManager.touchUI&&!current._cancelButton)current.createButtons();
        if(current._cancelButton)current._cancelButton.visible=ConfigManager.touchUI;
    };
    window.updateButtonPositions=function(){SceneManager._scene.optionsCoreUpdateButtonPositions();};
    window.updateWindowPositions=function(){SceneManager._scene.optionsCoreUpdateWindowPositions();};
    scene.optionsCoreUpdateButtonPositions=function(){
        for(const key of ['_cancelButton','_pageupButton','_pagedownButton'])if(this[key])this[key].y=this.buttonY();
        this.optionsCoreUpdateWindowPositions();
    };
    scene.optionsCoreUpdateWindowPositions=function(){
        for(const [key,rectangle]of [['_categoryWindow','categoryWindowRect'],['_optionsWindow','optionsWindowRect'],['_buttonAssistWindow','buttonAssistWindowRect']]){
            if(!this[key])continue;
            const rect=this[rectangle]();
            this[key].move(rect.x,rect.y,rect.width,rect.height);
            if(key==='_buttonAssistWindow')this[key].refresh();
        }
        this.refreshWindows();
    };
    window.prepareOptionsCoreSceneChange=function(){
        const current=SceneManager._scene;
        $gameTemp._returnOptionsCore={category:current._categoryWindow.index(),index:this.index(),scrollX:this._scrollX,scrollY:this._scrollY};
    };
    const create=scene.create;
    scene.create=function(){
        create.call(this);
        const saved=$gameTemp._returnOptionsCore;
        if(saved!==undefined){
            this._categoryWindow.select(saved.category);
            this._categoryWindow.update();
            if(this.isUseModernControls())this._categoryWindow.activate();
            else this._categoryWindow.deactivate();
            const options=this._optionsWindow;
            options.activate();
            options._index=saved.index;
            options._scrollX=saved.scrollX;
            options._scrollY=saved.scrollY;
            options._scrollDuration=0;
            options.refreshCursor();
            options.update();
            $gameTemp._returnOptionsCore=undefined;
        }
    };
}
