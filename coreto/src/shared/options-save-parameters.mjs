export function decodeOptionsSaveParameters(raw,scope,code,target={},source=raw){
    function convert(values,path,output,authored=values){
        for(const storageKey of Object.keys(values)){
            const value=Object.hasOwn(authored,storageKey)?authored[storageKey]:values[storageKey];
            const [key,type]=storageKey.split(':');
            if(!type)continue;
            const at=`${path}/${storageKey}`;
            try{
                if(type==='struct'){
                    output[key]={};
                    convert(values[storageKey]===''?{}:JSON.parse(values[storageKey]),at,output[key],value===''?{}:JSON.parse(value));
                }else if(type==='arraystruct'){
                    output[key]=[];
                    const completed=values[storageKey]===''?[]:JSON.parse(values[storageKey]);
                    for(const [index,item]of (value===''?[]:JSON.parse(value)).entries()){
                        output[key][index]={};convert(JSON.parse(completed[index]??item),`${at}/${index}`,output[key][index],JSON.parse(item));
                    }
                }
                else if(type==='func')output[key]=new Function(value===''?'return 0;':JSON.parse(value));
                else if(type==='json')output[key]=value===''?'':JSON.parse(value);
                else if(type==='eval')output[key]=value===''?null:new Function('output','raw',`return eval(${JSON.stringify(value)});`).call(globalThis.VisuMZ,output,authored);
                else if(type==='num')output[key]=Number(value);
                else if(type==='str')output[key]=value;
                else if(type==='arraystr')output[key]=value===''?[]:JSON.parse(value);
            }catch(cause){
                if(cause.code===code)throw cause;
                const error=new Error(`Cannot decode ${at}: ${cause.message}`,{cause});
                error.code=code;error.field=at;throw error;
            }
        }
        return output;
    }
    return convert(raw,scope,target,source);
}

export function prepareOptionsSaveSettings(configuration,scope,version,code,validate){
    const previousVisuMZ=Object.getOwnPropertyDescriptor(globalThis,'VisuMZ');
    const previousImported=Object.getOwnPropertyDescriptor(globalThis,'Imported');
    globalThis.VisuMZ??={};
    const key=scope+'Core',previousNamespace=Object.getOwnPropertyDescriptor(VisuMZ,key);
    const namespace=VisuMZ[key]||{},settings=namespace.Settings||{};
    const namespaceProperties=Object.getOwnPropertyDescriptors(namespace),settingsProperties=Object.getOwnPropertyDescriptors(settings);
    function restore(object,properties){
        for(const key of Reflect.ownKeys(object))if(!Object.hasOwn(properties,key))delete object[key];
        Object.defineProperties(object,properties);
    }
    try{
        if(scope==='Options')globalThis.Imported??={};
        VisuMZ[key]=namespace;namespace.version=version;namespace.Settings=settings;
        decodeOptionsSaveParameters(configuration.rawParameters,scope,code,settings,configuration.source.parameters);
        validate(settings);
        return settings;
    }catch(error){
        restore(settings,settingsProperties);restore(namespace,namespaceProperties);
        if(previousNamespace)Object.defineProperty(VisuMZ,key,previousNamespace);else delete VisuMZ[key];
        if(previousVisuMZ)Object.defineProperty(globalThis,'VisuMZ',previousVisuMZ);else delete globalThis.VisuMZ;
        if(previousImported)Object.defineProperty(globalThis,'Imported',previousImported);else delete globalThis.Imported;
        throw error;
    }
}
