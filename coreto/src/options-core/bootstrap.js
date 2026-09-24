function installOptionsCore(){
    validateOptionsSaveProviders(catalog,$plugins,globalThis);
    if(globalThis.Coreto?.OptionsCore)throw Object.assign(new Error('Options Core is already initialized.'),{code:'OPT_DUPLICATE_PROVIDER'});
    const configuration=resolveOptionsSaveConfiguration(catalog,$plugins);
    const settings=prepareOptionsSaveSettings(configuration,'Options',Number(catalog.reference.version),'OPT_CONFIG_VALUE',validateOptionsSettings);
    globalThis.uiDefault||={};
    Object.assign(uiDefault,{HelpPosition:Scene_Base.prototype.isBottomHelpMode,ButtonPosition:Scene_Base.prototype.isBottomButtonMode,InputPosition:Scene_Base.prototype.isRightInputMode,hoverEnabled:Window_Selectable.prototype.isHoverEnabled});
    installOptionsAudio(settings);
    installOptionsCategories(settings);
    installOptionsPresentation(settings);
    installOptionsGameplay();
    installOptionsInput(settings);
    installOptionsRebind(settings);
    const api={pluginId:catalog.pluginId,version:catalog.version,configuration,settings,capabilities:["categories","gameplay-options","config","input","rebind","volume-shortcuts","legacy-compatible"]};
    globalThis.Coreto??={};Coreto.OptionsCore=api;
    Imported[catalog.pluginId]=true;Imported[catalog.reference.pluginId]=true;
    return api;
}
const optionsApi=installOptionsCore();
