function installOptionsRebind(settings){
    const defaults=decodeOptionsSaveParameters({'Rebind:struct':catalog.parameters.find(field=>field.key==='Rebind').nativeDefault},'Options','OPT_CONFIG_VALUE').Rebind;
    const rebind={...defaults,...settings.Rebind};
    const actions=['up','left','down','right','ok','escape','cancel','menu','pageup','pagedown','shift','tab'];
    TextManager.REBIND=Object.fromEntries([...actions,'buttonFmt','dpadFmt'].map(key=>[key,rebind[key]]));
    Input.getKeyboardMappingByKeyType=function(action){return Object.keys(this.keyMapper).map(Number).filter(code=>![96,98,100,102,104,32,45].includes(code)&&this.keyMapper[code]===action);};
    Input.getGamepadButtonID=function(action){return Object.keys(this.gamepadMapper).map(Number).filter(code=>this.gamepadMapper[code]===action);};
    const profiles=new Map(),matches=new Map(),controllerLabel=TextManager.getControllerInputButtonString;
    for(const profile of settings.ControllerButtons){const name=profile.Name.toLowerCase().trim();profiles.set(name,profile);matches.set(profile.Match.toLowerCase().trim(),name);}
    TextManager.findControllerInputRebindMatch=function(id){for(const [match,name]of matches)if(id.includes(match))return profiles.get(name);return null;};
    TextManager.rebindControllerInputButtonString=function(id,action){
        const normalized=id.toLowerCase().trim(),button=Input.getGamepadButtonID(action)[0],profile=profiles.get(normalized)||this.findControllerInputRebindMatch(normalized);
        if(profile)return profile['button'+button]||controllerLabel.call(this,id,action);
        const defaults={0:'ok',1:'cancel',2:'shift',3:'menu',4:'pageup',5:'pagedown',12:'up',13:'down',14:'left',15:'right'};
        if(!$gameTemp._bypassForRebindController&&defaults[button])return controllerLabel.call(this,id,defaults[button]);
        return [12,13,14,15].includes(button)?rebind.dpadFmt.format(TextManager.REBIND[action]):rebind.buttonFmt.format(button);
    };
    TextManager.getControllerInputButtonString=function(id,action){return Scene_Options.ADD_REBIND_OPTIONS?this.rebindControllerInputButtonString(id,action):controllerLabel.call(this,id,action);};
    const updateGamepad=Input._updateGamepadState;
    Input._updateGamepadState=function(gamepad){updateGamepad.call(this,gamepad);if(this._rebindState)this._lastGamepadState=this._gamepadStates[gamepad.index].indexOf(true);};
    class Window_RebindHelp extends Window_Help {
        updateBackOpacity(){this.backOpacity=255;}
        refresh(){
            this.contents.clear();const size=this.textSizeEx(this._text);
            this.drawTextEx(this._text,Math.round((this.innerWidth-size.width)/2),Math.round((this.innerHeight-size.height)/2));
        }
    }
    class Window_KeyRebinds extends Window_Command {
        initialize(rect){this.setupType();super.initialize(rect);this.select(this.isForKeyboard()?2:1);}
        setupType(){this._type=SceneManager._scene.isForKeyboard()?'keyboard':SceneManager._scene.isForGamepad()?'gamepad':'none';}
        isForKeyboard(){return this._type==='keyboard';}
        isForGamepad(){return this._type==='gamepad';}
        maxCols(){return 1+this.extraColumns();}
        extraColumns(){return this.isForKeyboard()?2:this.isForGamepad()?1:0;}
        keyCode(){
            const action=this.keyType();
            return this.isForKeyboard()?Number(Input.getKeyboardMappingByKeyType(action)[Number(this.commandName(this.index()))]??-1):Input.getGamepadButtonID(action)[0];
        }
        keyType(){return String(this._list[this.index()].ext||'');}
        select(index){
            if(Input.isTriggered('home'))index=this.isForKeyboard()?2:1;
            if(index%this.maxCols()===0||this.isForKeyboard()&&index%this.maxCols()===1)return;
            super.select(index);
        }
        makeCommandList(){for(const action of this.isForKeyboard()?rebind.keyOrder:rebind.gamepadOrder)this.addKeyboardColumns(action);}
        addKeyboardColumns(action){
            if(this.extraColumns()<=0)return;
            this.addCommand(action,'keyName',false,action);
            for(let i=0;i<this.extraColumns();i++)this.addCommand(String(i),'rebind',this.canRebindInput(action,i),action);
        }
        canRebindInput(action,column){return this.isForKeyboard()?column!==0:!['up','left','down','right'].includes(action);}
        drawItemBackground(index){if(index%this.maxCols()!==0)this.drawBackgroundRect(this.itemRect(index));}
        drawItem(index){if(this.commandSymbol(index)==='keyName')this.drawItemKeyName(index);else this.drawItemKeyRebind(index);}
        drawAlignedKey(index,text,enabled){
            const rect=this.itemLineRect(index),width=this.textSizeEx(text).width,align=rebind.keyNameAlign||'center';
            this.resetFontSettings();this.changePaintOpacity(enabled);
            const x=align==='right'?rect.x+rect.width-width:align==='center'?rect.x+Math.floor((rect.width-width)/2):rect.x;
            this.drawTextEx(text,x,rect.y,width);
        }
        drawItemKeyName(index){this.drawAlignedKey(index,TextManager.REBIND[this._list[index].ext]||'',true);}
        drawItemKeyRebind(index){
            $gameTemp._bypassForRebindController=this.isForGamepad();
            let text;
            try{text=this.getKeyName(Number(this.commandName(index)),String(this._list[index].ext||''));}
            finally{$gameTemp._bypassForRebindController=undefined;}
            this.drawAlignedKey(index,text,this.isCommandEnabled(index));
        }
        getKeyName(column,action){
            if(this.isForKeyboard()){
                const name=TextManager.stringKeyMap[Input.getKeyboardMappingByKeyType(action)[column]];
                return name===undefined?'-':TextManager.makeInputButtonString([name]);
            }
            if(this.isForGamepad()){
                const id=Input.getLastUsedGamepadType();
                if(id!=='Keyboard')return TextManager.getControllerInputButtonString(id,action);
                return ['up','left','down','right'].includes(action)?rebind.dpadFmt.format(TextManager.REBIND[action]):rebind.buttonFmt.format(Input.getGamepadButtonID(action));
            }
            return '';
        }
        playOkSound(){if(this.isForGamepad()&&!Input.isGamepadConnected())this.playBuzzerSound();else super.playOkSound();}
        playBuzzerSound(){super.playBuzzerSound();if(this.isForGamepad()&&this._helpWindow)this._helpWindow.setText(rebind.buttonForbidden);}
        update(){super.update();this.updateShiftRemoveShortcut();this.updateGamepadChange();}
        updateShiftRemoveShortcut(){
            if(!this.isOpenAndActive()||!Input.isTriggered('shift'))return;
            if(this.isForKeyboard()&&this.keyCode()>=0)SceneManager._scene.shiftRemove(this.keyCode());
            if(this.isForGamepad())SceneManager._scene.shiftReset();
        }
        updateGamepadChange(){if(this.isForGamepad()&&this._lastGamepadType!==Input.getLastUsedGamepadType()){this._lastGamepadType=Input.getLastUsedGamepadType();this.refresh();}}
        updateHelp(){this._helpWindow.clear();this._helpWindow.setText(this.isForKeyboard()?rebind.selectKeyboard:rebind.selectGamepad);}
    }
    class Scene_RebindBase extends Scene_MenuBase {
        initialize(){
            super.initialize();
            if(!Imported.VisuMZ_0_CoreEngine)throw Object.assign(new Error('Rebinding requires the compatible Core input interface.'),{code:'OPT_DEPENDENCY'});
            if(VisuMZ.CoreEngine.version<1.8){
                alert('VisuMZ_0_CoreEngine needs to be updated in order for key rebinds to work.');
                SceneManager.exit();
            }
            this._rebindKeyListener=this.onKeyDown.bind(this);
            document.addEventListener('keydown',this._rebindKeyListener);
        }
        buttonAssistKey3(){return TextManager.getInputButtonString('shift');}
        buttonAssistText3(){return rebind.removeAssist;}
        buttonAssistText4(){return rebind.confirmAssist;}
        buttonAssistText5(){return rebind.cancelAssist;}
        create(){super.create();this.createHelpWindow();this.createRebindWindow();this.createInputMsgWindow();}
        createHelpWindow(){super.createHelpWindow();this._helpWindow.setBackgroundType(rebind.HelpWindow_BgType);}
        createRebindWindow(){
            const window=new Window_KeyRebinds(this.rebindWindowRect());this.addWindow(window);
            window.setHandler('rebind',this.startRebind.bind(this));window.setHandler('cancel',this.popScene.bind(this));window.setHelpWindow(this._helpWindow);window.setBackgroundType(rebind.RebindWindow_BgType);this._rebindWindow=window;
        }
        rebindWindowRect(){return rebind.RebindWindow_RectJS.call(this);}
        inputMsgWindowRect(){return rebind.HelpRebindWindow_RectJS.call(this);}
        isForKeyboard(){return false;}
        isForGamepad(){return false;}
        createInputMsgWindow(){const window=new Window_RebindHelp(this.inputMsgWindowRect());this.addChild(window);window.openness=0;window.setBackgroundType(rebind.HelpRebindWindow_BgType);this._inputMsgWindow=window;}
        startRebind(){Input.clear();TouchInput.clear();this._helpWindow.clear();this._inputMsgWindow.open();this._inputMsgWindow.setText(this.inputKeyboardMessage());}
        inputKeyboardMessage(){return '-';}
        onKeyDown(event){if(SceneManager._scene===this&&this._inputMsgWindow?.isOpen()){Input.clear();TouchInput.clear();this.processEventKeyDown(event);}}
        processEventKeyDown(event){if(event.keyCode===27)this.cancelRebinding();else if(this.isForKeyboard()){if(this.isForbiddenKeycode(event.keyCode))this.playErrorKeybind();else this.processKeybind(event.keyCode);}}
        cancelRebinding(){SoundManager.playCancel();this._inputMsgWindow.close();this._rebindWindow.activate();this._rebindWindow.refresh();}
        isForbiddenKeycode(){return true;}
        playErrorKeybind(){SoundManager.playBuzzer();this._inputMsgWindow.setText(rebind.pressForbidden);}
        processKeybind(code){this.updateKeybinds(code);$gameMap.requestRefresh();Input.clear();TouchInput.clear();SoundManager.playEquip();this._inputMsgWindow.close();this._rebindWindow.activate();this._rebindWindow.refresh();ConfigManager.save();}
        releaseRebindInput(){document.removeEventListener('keydown',this._rebindKeyListener);Input._rebindState=false;Input._lastGamepadState=-1;Input.clear();TouchInput.clear();}
        terminate(){this.releaseRebindInput();super.terminate();}
        destroy(options){this.releaseRebindInput();super.destroy(options);}
    }
    class Scene_RebindKeyboard extends Scene_RebindBase {
        isForKeyboard(){return true;}
        startRebind(){super.startRebind();this._replaceKeyID=this._rebindWindow.keyCode();}
        inputKeyboardMessage(){return rebind.pressKeyboard;}
        isForbiddenKeycode(code){return !(code>=48&&code<=57||code>=65&&code<=90||code>=186&&code<=192||code>=219&&code<=222);}
        updateKeybinds(code){Input.keyMapper[this._replaceKeyID]=Input.keyMapper[code]||undefined;Input.keyMapper[code]=this._rebindWindow.keyType();Input.keyMapper[-1]=undefined;this.reassignCoreEngineControls();}
        reassignCoreEngineControls(){const core=VisuMZ.CoreEngine.Settings;if(core.KeyboardInput.DashToggleR&&Input.keyMapper[82]===undefined)Input.keyMapper[82]='dashToggle';if(core.QoL.ModernControls){Input.keyMapper[35]='end';Input.keyMapper[36]='home';}}
        shiftRemove(code){Input.keyMapper[Number(code)]=undefined;SoundManager.playEquip();this._rebindWindow.refresh();ConfigManager.save();}
    }
    class Scene_RebindGamepad extends Scene_RebindBase {
        isForGamepad(){return true;}
        buttonAssistText3(){return rebind.resetAssist;}
        startRebind(){
            if(!Input.isGamepadConnected()){this._rebindWindow.activate();this._helpWindow.setText(rebind.noGamepadFound);return;}
            Input._rebindState=true;Input._lastGamepadState=-1;super.startRebind();this._replaceKeyID=this._rebindWindow.keyCode();
        }
        inputKeyboardMessage(){return rebind.pressGamepad;}
        update(){super.update();this.checkGamepadButtonPress();}
        checkGamepadButtonPress(){if(this._inputMsgWindow.isOpen()&&Input._lastGamepadState>=0&&![12,13,14,15].includes(Input._lastGamepadState))this.processKeybind(Input._lastGamepadState);}
        cancelRebinding(){Input._rebindState=false;Input._lastGamepadState=-1;super.cancelRebinding();}
        updateKeybinds(code){Input._rebindState=false;Input._lastGamepadState=-1;Input.gamepadMapper[this._replaceKeyID]=Input.gamepadMapper[code]||undefined;Input.gamepadMapper[code]=this._rebindWindow.keyType();Input.gamepadMapper[-1]=undefined;}
        shiftReset(){rebind.gamepadReset.call(this);SoundManager.playEquip();this._rebindWindow.refresh();ConfigManager.save();}
    }
    Object.assign(globalThis,{Scene_RebindBase,Scene_RebindKeyboard,Scene_RebindGamepad,Window_KeyRebinds,Window_RebindHelp});
}
