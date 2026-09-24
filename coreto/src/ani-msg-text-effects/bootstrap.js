function installAniMessage(){
    const fail=(code,message)=>{throw new CoreError(code,message);};
    if(Utils.RPGMAKER_NAME!=='MZ'||Utils.RPGMAKER_VERSION!=='1.10.0')fail('ANI_ENGINE_VERSION','Use RPG Maker MZ 1.10.0.');
    const active=$plugins.filter(p=>p.status),providers=active.filter(p=>[catalog.pluginId,catalog.reference.pluginId].includes(p.name));
    if(providers.length!==1||providers[0].name!==catalog.pluginId||globalThis.Coreto?.AniMsgTextEffects)fail('ANI_DUPLICATE_PROVIDER','Enable exactly one Ani provider.');
    const own=providers[0];
    for(const [service,supported]of Object.entries({core:catalog.dependencies.cores,message:catalog.dependencies.messages})){
        const entries=active.filter(p=>Object.hasOwn(supported,p.name));
        if(entries.length!==1)fail('ANI_DEPENDENCY',`Enable exactly one ${service} provider.`);
        const entry=entries[0];
        if(active.indexOf(entry)>=active.indexOf(own))fail('ANI_PLUGIN_ORDER',`Place ${entry.name} before Ani.`);
        const versionMatches=entry.name==='Coreto_0_CoreEngine'?globalThis.Coreto?.CoreEngine?.version===supported[entry.name]:entry.description.includes(`[Version ${supported[entry.name]}]`);
        if(!versionMatches)fail('ANI_DEPENDENCY_VERSION',`Use ${entry.name} ${supported[entry.name]}.`);
    }
    if(!globalThis.VisuMZ?.MessageCore?.Settings||typeof Window_Message.prototype.preFlushTextState!=='function')fail('ANI_MESSAGE_API','Load a supported Message provider before Ani.');
    for(const [name,version]of Object.entries({...catalog.dependencies.before,...catalog.dependencies.integrations})){
        const entries=active.filter(p=>p.name===name);
        if(entries.length>1)fail('ANI_DEPENDENCY_DUPLICATE',`Duplicate ${name}.`);
        if(entries.length&&!entries[0].description.includes(`[Version ${version}]`))fail('ANI_DEPENDENCY_VERSION',`Use ${name} ${version}.`);
        if(entries.length&&Object.hasOwn(catalog.dependencies.before,name)&&active.indexOf(entries[0])>active.indexOf(own))fail('ANI_PLUGIN_ORDER',`Place ${name} before Ani.`);
    }
    if(active.some(p=>/^VisuMZ_3_/.test(p.name)&&active.indexOf(p)<active.indexOf(own)))fail('ANI_PLUGIN_ORDER','Place Ani before tier 3 consumers.');
    const filename=decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if(filename!==catalog.pluginId+'.js')fail('ANI_FILENAME',`Keep the filename ${catalog.pluginId}.js.`);
    const source=resolveAniSource(catalog,$plugins),settings=convertAniParameters(source.rawParameters,VisuMZ);
    const api={pluginId:catalog.pluginId,version:catalog.version,...source,settings};
    globalThis.Coreto??={};Coreto.AniMsgTextEffects=api;
    return api;
}
const aniApi=installAniMessage();
