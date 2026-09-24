import {resolvePluginConfiguration} from './plugin-configuration.mjs';

export function resolveOptionsSaveConfiguration(catalog,plugins){
    const prefix=catalog.pluginId.endsWith('OptionsCore')?'OPT':'SAV';
    const selection=resolvePluginConfiguration(catalog,plugins,{errorPrefix:prefix});
    function fail(path,message){
        const error=new Error(`${message} at ${path}.`);
        error.code=`${prefix}_CONFIG_ENCODING`;error.field=path;throw error;
    }
    function json(raw,path){
        try{return JSON.parse(raw);}catch{fail(path,'Invalid JSON');}
    }
    function complete(fields,raw,path){
        if(!raw||typeof raw!=='object'||Array.isArray(raw))fail(path,'Expected parameter object');
        const output={...raw};
        for(const field of fields){
            if(field.key==='CoretoConfigSource')continue;
            const key=field.storageKey,at=`${path}/${key}`;
            const value=Object.hasOwn(raw,key)?raw[key]:field.nativeDefault;
            if(typeof value!=='string')fail(at,'Expected native string');
            if(value===''){output[key]=value;continue;}
            if(field.type==='struct')output[key]=JSON.stringify(complete(field.fields,value===''?{}:json(value,at),at));
            else if(field.type==='array'){
                const items=value===''?[]:json(value,at);
                if(!Array.isArray(items))fail(at,'Expected array');
                output[key]=JSON.stringify(items.map((item,index)=>{
                    const itemPath=`${at}/${index}`;
                    if(typeof item!=='string')fail(itemPath,'Expected native string item');
                    return field.items.type==='struct'?JSON.stringify(complete(field.items.fields,json(item,itemPath),itemPath)):item;
                }));
            }else{
                if(field.encoding==='json'&&value!==''&&typeof json(value,at)!=='string')fail(at,'Expected JSON string');
                if(field.type==='number'&&!Number.isFinite(Number(value)))fail(at,'Expected finite number');
                output[key]=value;
            }
        }
        return output;
    }
    return {...selection,rawParameters:complete(catalog.parameters,selection.source.parameters,selection.effectiveSource)};
}

export function validateOptionsSaveProviders(catalog,plugins,globals){
    const prefix=catalog.pluginId.endsWith('OptionsCore')?'OPT':'SAV';
    const fail=(code,message)=>{const error=new Error(message);error.code=`${prefix}_${code}`;throw error;};
    if(globals.Utils.RPGMAKER_NAME!=='MZ'||globals.Utils.RPGMAKER_VERSION!=='1.10.0')fail('ENGINE_VERSION','Use RPG Maker MZ 1.10.0.');
    const filename=decodeURIComponent(globals.document.currentScript.src.split('?')[0].split('/').pop());
    if(filename!==catalog.pluginId+'.js')fail('FILENAME',`Keep the filename ${catalog.pluginId}.js.`);
    const active=plugins.filter(p=>p.status),own=active.find(p=>p.name===catalog.pluginId);
    if(active.filter(p=>[catalog.pluginId,catalog.reference.pluginId].includes(p.name)).length!==1||!own)fail('DUPLICATE_PROVIDER','Enable exactly one provider for '+catalog.pluginId+'.');
    for(const [service,supported] of Object.entries(catalog.dependencies)){
        const entries=active.filter(p=>Object.hasOwn(supported,p.name));
        if(entries.length>1||service==='cores'&&entries.length!==1)fail('DEPENDENCY',`Use one supported ${service} provider.`);
        if(!entries.length)continue;
        const entry=entries[0];
        if(active.indexOf(entry)>=active.indexOf(own))fail('PLUGIN_ORDER',`Place ${entry.name} before ${catalog.pluginId}.`);
        const apiName=service==='cores'?'CoreEngine':'MessageCore';
        const version=entry.name.startsWith('Coreto_')?globals.Coreto?.[apiName]?.version:globals.VisuMZ?.[apiName]?.version;
        if(entry.name.startsWith('Coreto_')?version!==supported[entry.name]:version!==Number(supported[entry.name]))fail('DEPENDENCY_VERSION',`Load ${entry.name} ${supported[entry.name]} before ${catalog.pluginId}.`);
    }
    if(active.some(p=>/^(?:Coreto|VisuMZ)_[23]_/.test(p.name)&&active.indexOf(p)<active.indexOf(own)))fail('PLUGIN_ORDER',`Place ${catalog.pluginId} before tier 2/3 consumers.`);
}
