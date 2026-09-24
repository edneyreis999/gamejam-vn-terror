function validateOptionsSettings(settings){
    const options=settings.OptionsSettings;
    for(const [key,allowed]of [['CategoryStyle',['text','icon','iconText','auto']],['categoryWindowBgType',[0,1,2]],['optionsWindowBgType',[0,1,2]],['buttonAssistBgType',[0,1,2]]]){
        if(!allowed.includes(options[key]))throw Object.assign(new Error(`Unknown OptionsSettings.${key}: ${options[key]}`),{code:'OPT_CONFIG_VALUE',field:`OptionsSettings.${key}`});
    }
    const rebind=settings.Rebind,actions=['up','left','down','right','ok','escape','cancel','menu','shift','tab','pageup','pagedown'];
    for(const [key,allowed]of [['HelpWindow_BgType',[0,1,2]],['RebindWindow_BgType',[0,1,2]],['HelpRebindWindow_BgType',[0,1,2]],['keyOrder',actions],['gamepadOrder',actions]]){
        if(rebind[key]===undefined)continue;
        const values=Array.isArray(rebind[key])?rebind[key]:[rebind[key]];
        if(values.some(value=>!allowed.includes(value)))throw Object.assign(new Error(`Unknown Rebind.${key}: ${rebind[key]}`),{code:'OPT_CONFIG_VALUE',field:`Rebind.${key}`});
    }
}
