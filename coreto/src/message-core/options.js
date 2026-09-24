function installMessageOptions(settings) {
    const speed=settings.TextSpeed,locale=settings.Localization;
    ConfigManager.textSpeed=speed.Default;
    ConfigManager.textLocale=locale.DefaultLocale || 'English';
    TextManager.messageCoreTextSpeed=speed.Name;
    TextManager.messageCoreLocalization=locale.Name;
    TextManager.getLanguageName=function(language) { return locale[language] || ''; };
    TextManager.getCurrentLanguage=function() { return this.getLanguageName(ConfigManager.textLocale || 'English'); };
    TextManager.getLanguageAt=function(offset) { return this.getLanguageName(locale.Languages[locale.Languages.indexOf(ConfigManager.textLocale || 'English')+offset] || ''); };
    ConfigManager.readTextSpeed=function(data) {
        const value=data.textSpeed;
        if (typeof value!=='number' && (typeof value!=='string' || !value.trim())) return speed.Default;
        const number=Number(value);
        return Number.isFinite(number)?number.clamp(1,11):speed.Default;
    };
    ConfigManager.readTextLocale=function(data) { return locale.Languages.includes(data.textLocale)?data.textLocale:locale.DefaultLocale; };
    const make=ConfigManager.makeData,apply=ConfigManager.applyData;
    ConfigManager.makeData=function() {
        const data=make.call(this);data.textSpeed=this.textSpeed;
        if(locale.Enable)data.textLocale=this.textLocale;
        return data;
    };
    ConfigManager.applyData=function(data) {
        apply.call(this,data);this.textSpeed=this.readTextSpeed(data);
        if(locale.Enable)this.textLocale=this.readTextLocale(data);
    };
    const window=Window_Options.prototype;
    window.addMessageCoreCommands=function() {
        if(locale.Enable && locale.AddOption && this.findSymbol('textLocale')<0)this.addCommand(TextManager.messageCoreLocalization,'textLocale');
        if(speed.AddOption && this.findSymbol('textSpeed')<0)this.addCommand(TextManager.messageCoreTextSpeed,'textSpeed');
    };
    const general=window.addGeneralOptions;
    window.addGeneralOptions=function() { general.call(this);this.addMessageCoreCommands(); };
    window.textSpeedStatusText=function() {
        const value=this.getConfigValue('textSpeed');
        return value>10?speed.Instant:value;
    };
    const status=window.statusText;
    window.statusText=function(index) {
        const symbol=this.commandSymbol(index),value=this.getConfigValue(symbol);
        if(symbol==='textLocale')return TextManager.getLanguageName(value);
        if(symbol==='textSpeed')return this.textSpeedStatusText();
        return status.call(this,index);
    };
    const isVolume=window.isVolumeSymbol,changeVolume=window.changeVolume;
    window.isVolumeSymbol=function(symbol) { return symbol==='textLocale' || symbol==='textSpeed' || isVolume.call(this,symbol); };
    window.changeTextSpeed=function(symbol,forward,wrap) {
        let value=this.getConfigValue(symbol)+(forward?1:-1);
        if(value>11 && wrap)value=1;
        this.changeValue(symbol,value.clamp(1,11));
    };
    window.changeVisuMzTextLocale=function(forward,wrap) {
        let index=locale.Languages.indexOf(this.getConfigValue('textLocale'))+(forward?1:-1);
        if(wrap)index=(index+locale.Languages.length)%locale.Languages.length;
        else index=index.clamp(0,locale.Languages.length-1);
        this.changeValue('textLocale',locale.Languages[index]);
    };
    window.changeVolume=function(symbol,forward,wrap) {
        if(symbol==='textSpeed')return this.changeTextSpeed(symbol,forward,wrap);
        if(symbol==='textLocale')return this.changeVisuMzTextLocale(forward,wrap);
        return changeVolume.apply(this,arguments);
    };
    const max=Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands=function() { return max.call(this)+(speed.AddOption && speed.AdjustRect?1:0)+(locale.Enable && locale.AddOption && locale.AdjustRect?1:0); };
}
installMessageOptions(messageApi.settings);
