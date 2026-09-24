function installSaveGlobals(){
    VisuMZ.GlobalSwitches=[];VisuMZ.GlobalVariables=[];
    ConfigManager.globalSwitches=[];ConfigManager.globalVariables=[];
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeData=function(){
        const data=makeData.call(this);data.globalSwitches=this.globalSwitches||[];data.globalVariables=this.globalVariables||[];return data;
    };
    ConfigManager.applyData=function(data){applyData.call(this,data);this.globalSwitches=data.globalSwitches||[];this.globalVariables=data.globalVariables||[];};
    const databaseLoaded=Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.process_VisuMZ_SaveCore_Switches_Variables=function(){
        for(let id=1;id<$dataSystem.switches.length;id++)if($dataSystem.switches[id].match(/<GLOBAL>/i))VisuMZ.GlobalSwitches.push(id);
        for(let id=1;id<$dataSystem.variables.length;id++)if($dataSystem.variables[id].match(/<GLOBAL>/i))VisuMZ.GlobalVariables.push(id);
    };
    Scene_Boot.prototype.onDatabaseLoaded=function(){databaseLoaded.call(this);this.process_VisuMZ_SaveCore_Switches_Variables();};
    for(const [Type,database,ids,storage]of [[Game_Switches,'switches','GlobalSwitches','globalSwitches'],[Game_Variables,'variables','GlobalVariables','globalVariables']]){
        const value=Type.prototype.value,setValue=Type.prototype.setValue;
        Type.prototype.isGlobal=function(id){return $dataSystem[database][id]&&VisuMZ[ids].includes(id);};
        Type.prototype.value=function(id){return this.isGlobal(id)?this.globalValue(id):value.call(this,id);};
        Type.prototype.globalValue=function(id){
            ConfigManager[storage]=ConfigManager[storage]||[];
            if(Type===Game_Switches)return !!ConfigManager[storage][id];
            if(ConfigManager[storage][id]===undefined)Reflect.set(Object(ConfigManager[storage]),id,0);
            return ConfigManager[storage][id];
        };
        Type.prototype.setValue=function(id,value){if(this.isGlobal(id))this.setGlobalValue(id,value);setValue.call(this,id,value);};
        Type.prototype.setGlobalValue=function(id,value){
            if(id>0&&id<$dataSystem[database].length){
                ConfigManager[storage]=ConfigManager[storage]||[];
                // Legacy config can contain primitives; original non-strict writes leave them intact.
                Reflect.set(Object(ConfigManager[storage]),id,Type===Game_Variables&&typeof value==='number'?Math.floor(value):value);
                ConfigManager.save();
            }
        };
    }
}
