function validateSaveSettings(settings){
    function check(value,predicate,field,message){
        if(!predicate(value))throw Object.assign(new Error(`${message}: ${field}`),{code:'SAV_CONFIG_VALUE',field});
    }
    check(settings.Save?.SaveStyle,value=>['standard','locked','single'].includes(value),'Save.SaveStyle','Unknown save style');
    check(settings.SaveMenuStyle,value=>['list','vertical','box','large'].includes(value),'SaveMenuStyle','Unknown save menu style');
    check(settings.ActorGraphic,value=>['none','face','sprite','svbattler'].includes(value),'ActorGraphic','Unknown actor graphic');
    check(settings.Save.MaxSaveFiles,value=>Number.isInteger(value)&&value>=0,'Save.MaxSaveFiles','Expected a nonnegative slot count');
    for(const prefix of ['List','Vert','Box','Large'])for(const suffix of ['Rows','Cols']){
        const key=prefix+suffix;check(settings.SaveMenu?.[key],value=>Number.isInteger(value)&&value>=1,`SaveMenu.${key}`,'Expected at least one row or column');
    }
    if(settings.SaveConfirm.Enable||Object.hasOwn(settings.SaveConfirm,'Duration'))check(settings.SaveConfirm.Duration,value=>Number.isFinite(value)&&value>=0,'SaveConfirm.Duration','Expected a nonnegative duration');
    if(Object.hasOwn(settings.Autosave,'AutosaveType'))check(settings.Autosave.AutosaveType,value=>['file0','current','both'].includes(value),'Autosave.AutosaveType','Unknown autosave destination');
    if(settings.AutosaveConfirm.Enable||Object.hasOwn(settings.AutosaveConfirm,'Duration'))check(settings.AutosaveConfirm.Duration,value=>Number.isFinite(value)&&value>=0,'AutosaveConfirm.Duration','Expected a nonnegative duration');
    if(settings.AutosaveConfirm.Enable||Object.hasOwn(settings.AutosaveConfirm,'ScreenPosition'))check(settings.AutosaveConfirm.ScreenPosition,value=>/^(lower|middle|upper) (left|center|right)$/.test(value),'AutosaveConfirm.ScreenPosition','Unknown autosave confirmation position');
}
