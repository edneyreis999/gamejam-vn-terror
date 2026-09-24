function installOptionsInput(settings){
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeRebindSave=function(data){
        if(Scene_Options.ADD_REBIND_OPTIONS){
            data.keyMapper=Input.keyMapper;
            data.gamepadMapper=Input.gamepadMapper;
        }
        return data;
    };
    ConfigManager.applySavedRebinds=function(data){
        if(data.keyMapper)Input.keyMapper=data.keyMapper;
        if(data.gamepadMapper)Input.gamepadMapper=data.gamepadMapper;
    };
    ConfigManager.makeData=function(){const data=makeData.call(this);this.makeRebindSave(data);return data;};
    ConfigManager.applyData=function(data){applyData.call(this,data);this.applySavedRebinds(data);};
    const shortcut=settings.MasterVolShortcut,api=VisuMZ.OptionsCore;
    api.VolumeShortcut={enabled:shortcut.Enable??true,change:shortcut.change??true};
    for(const direction of ['Up','Down'])SoundManager['playMasterVolume'+direction]=function(){
        const prefix=direction.toLowerCase();
        AudioManager.playSe({name:shortcut[prefix+'Name'],volume:shortcut[prefix+'Volume'],pitch:shortcut[prefix+'Pitch'],pan:shortcut[prefix+'Pan']});
    };
    api.changeMasterVolumeViaShortcut=function(symbol){
        const before=ConfigManager.masterVolume;
        let value=Math.round(WebAudio._masterVolume*100);
        if(symbol==='pageup')value+=api.VolumeShortcut.change;
        else if(symbol==='pagedown')value-=api.VolumeShortcut.change;
        ConfigManager.masterVolume=value.clamp(0,100);
        ConfigManager.save();
        WebAudio.setMasterVolume(ConfigManager.masterVolume/100);
        const changed=before!==ConfigManager.masterVolume;
        if(changed){
            if(symbol==='pageup')SoundManager.playMasterVolumeUp();
            else if(symbol==='pagedown')SoundManager.playMasterVolumeDown();
        }
        return changed;
    };
    api.processVolumeShortcut=function(symbol){
        if(!this.changeMasterVolumeViaShortcut(symbol))return;
        const current=SceneManager._scene;
        if(current.constructor===Scene_Options)current._optionsWindow.refresh();
    };
    const triggered=Input.isTriggered,repeated=Input.isRepeated;
    api.meetVolumeShortcutConditions=function(symbol,repeat){
        if(!api.VolumeShortcut.enabled||ConfigManager.masterVolume===undefined||!Input.isPressed('control'))return false;
        if(symbol!=='pageup'&&symbol!=='pagedown')return false;
        return (repeat?repeated:triggered).call(Input,symbol);
    };
    for(const [method,previous,repeat]of [['isTriggered',triggered,false],['isRepeated',repeated,true]])Input[method]=function(symbol){
        if(api.meetVolumeShortcutConditions(symbol,repeat)){api.processVolumeShortcut(symbol);return false;}
        return previous.call(this,symbol);
    };
}
