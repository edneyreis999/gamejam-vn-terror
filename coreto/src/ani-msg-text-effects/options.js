ConfigManager.textEffects=true;
const aniMakeConfig=ConfigManager.makeData;
ConfigManager.makeData=function(){
    const data=aniMakeConfig.call(this);data.textEffects=this.textEffects;return data;
};
const aniApplyConfig=ConfigManager.applyData;
ConfigManager.applyData=function(data){
    aniApplyConfig.call(this,data);
    this.textEffects='textEffects' in data?data.textEffects:true;
};
TextManager.textEffects=aniApi.settings.Options.Name||'';
const aniGeneralOptions=Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions=function(){
    aniGeneralOptions.call(this);this.addTextEffectsCommands();
};
Window_Options.prototype.addTextEffectsCommands=function(){
    if(aniApi.settings.Options.AddOption)this.addTemplatetextEffectsCommand();
};
Window_Options.prototype.addTemplatetextEffectsCommand=function(){
    this.addCommand(TextManager.textEffects,'textEffects');
};
