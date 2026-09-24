function installSaveStorage(settings){
    DataManager.makeSavename=function(id){return settings.Save.FilenameFmt.format(id);};
    StorageManager.isLocalMode=function(){return Utils.isNwjs()?settings.Save.LocalMode:false;};
    StorageManager.filePath=function(name){return this.fileDirectoryPath()+settings.Save.ExtensionFmt.format(name);};
    StorageManager.forageKey=function(name){return settings.Save.KeyFmt.format($dataSystem.advanced.gameId,name);};
    StorageManager.forageTestKey=function(){return settings.Save.TestKey;};
    // Preserve native saveGame/saveGlobalInfo completion and failure semantics (ADR002).
    DataManager.loadGame=async function(id){
        const contents=await StorageManager.loadObject(this.makeSavename(id));
        const classes={system:Game_System,screen:Game_Screen,timer:Game_Timer,switches:Game_Switches,variables:Game_Variables,selfSwitches:Game_SelfSwitches,actors:Game_Actors,party:Game_Party,map:Game_Map,player:Game_Player};
        for(const [key,Type]of Object.entries(classes)){
            if(!(contents?.[key] instanceof Type))throw Object.assign(new Error(`Save ${id} has an invalid ${key}.`),{code:'SAV_INVALID_CONTENTS',savefileId:id,field:key});
        }
        this.createGameObjects();this.extractSaveContents(contents);this.correctDataErrors();return 0;
    };
}
