function installOptionsAudio(settings){
    const databaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded=function(){
        databaseLoaded.call(this);
        for(const [index,kind]of ['Cursor','OK','Cancel','Buzzer'].entries()){
            const key=kind==='OK'?'ok':kind.toLowerCase();
            SoundManager[key+'SFXs']=settings.OptionsSettings['SFX'+kind+'List'].map((name,slot)=>slot===0?name:{...$dataSystem.sounds[index],name});
        }
    };
    for(const [kind,key]of [['Cursor','cursor'],['Ok','ok'],['Cancel','cancel'],['Buzzer','buzzer']]){
        const symbol='se'+(kind==='Ok'?'OK':kind),listName=key+'SFXs';
        SoundManager[listName]=[...settings.OptionsSettings['SFX'+(kind==='Ok'?'OK':kind)+'List']];
        const previous=SoundManager['play'+kind];
        SoundManager['play'+kind]=function(){
            const index=ConfigManager[symbol],sound=this[listName][index];
            if(index>0&&sound)return AudioManager.playStaticSe(sound);
            else previous.call(this);
        };
    }
}
