function installSaveCore(){
    validateOptionsSaveProviders(catalog,$plugins,globalThis);
    if(globalThis.Coreto?.SaveCore)throw Object.assign(new Error('Save Core is already initialized.'),{code:'SAV_DUPLICATE_PROVIDER'});
    const configuration=resolveOptionsSaveConfiguration(catalog,$plugins);
    const settings=prepareOptionsSaveSettings(configuration,'Save',Number(catalog.reference.version),'SAV_CONFIG_VALUE',validateSaveSettings);
    installSaveState(settings);
    installSaveStorage(settings);
    installSaveList(settings);
    installSaveScenes(settings);
    installAutosave(settings);
    installSaveGlobals();
    const api={pluginId:catalog.pluginId,version:catalog.version,configuration,settings,capabilities:["save-metadata","save-scenes","save-layouts","save-commands","autosave","global-state","storage","legacy-compatible"]};
    globalThis.Coreto??={};Coreto.SaveCore=api;
    globalThis.Imported??={};Imported[catalog.pluginId]=true;Imported[catalog.reference.pluginId]=true;
    return api;
}
const saveApi=installSaveCore();
