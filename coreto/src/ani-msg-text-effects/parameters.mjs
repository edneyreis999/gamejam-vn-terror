import {resolvePluginConfiguration} from '../shared/plugin-configuration.mjs';
import {CoreError} from '../core-engine/parameters.mjs';

function aniEncoding(message,field){throw new CoreError('ANI_CONFIG_ENCODING',message,{field});}
function aniJson(raw,path){
    try{return JSON.parse(raw);}catch{aniEncoding(`Invalid JSON at ${path}.`,path);}
}
function completeAniFields(fields,raw,path){
    if(!raw||typeof raw!=='object'||Array.isArray(raw))aniEncoding(`Expected parameter object at ${path}.`,path);
    const output={...raw};
    for(const field of fields){
        if(field.key==='CoretoConfigSource')continue;
        const key=field.storageKey,at=`${path}/${key}`;
        const value=Object.hasOwn(raw,key)?raw[key]:field.nativeDefault;
        if(typeof value!=='string')aniEncoding(`Expected native string at ${at}.`,at);
        if(value===''){output[key]=value;continue;}
        if(field.type==='struct')output[key]=JSON.stringify(completeAniFields(field.fields,aniJson(value,at),at));
        else if(field.type==='array'){
            const items=aniJson(value,at);
            if(!Array.isArray(items))aniEncoding(`Expected array at ${at}.`,at);
            if(field.items.type!=='struct'&&items.some(item=>typeof item!=='string'))aniEncoding(`Expected native string items at ${at}.`,at);
            output[key]=field.items.type==='struct'?JSON.stringify(items.map((item,index)=>{
                if(typeof item!=='string')aniEncoding(`Expected encoded struct at ${at}/${index}.`,at);
                return JSON.stringify(completeAniFields(field.items.fields,aniJson(item,`${at}/${index}`),`${at}/${index}`));
            })):value;
        }else{
            if(field.type==='number'&&!Number.isFinite(Number(value)))aniEncoding(`Expected finite number at ${at}.`,at);
            output[key]=value;
        }
    }
    return output;
}
export function resolveAniSource(catalog,plugins){
    const {configuredSource, source} = resolvePluginConfiguration(catalog, plugins, {errorPrefix: 'ANI'});
    return {configuredSource,effectiveSource:source.name,materialized:configuredSource==='own',rawParameters:completeAniFields(catalog.parameters,source.parameters,source.name)};
}

// Native :eval fields use script completion values in a non-strict converter.
const convertAniNative = new Function(`return function convert(target,raw){
    for(const storageKey in raw){
        const match=storageKey.match(/(.*):(.*)/i);
        if(!match)continue;
        const name=match[1],type=match[2].toUpperCase().trim(),value=raw[storageKey];
        try{
            switch(type){
                case 'NUM':target[name]=value===''?0:Number(value);break;
                case 'STR':target[name]=String(value);break;
                case 'EVAL':target[name]=value===''?null:eval(value);break;
                case 'STRUCT':target[name]=convert.call(this,{},value===''?{}:JSON.parse(value));break;
                case 'ARRAYSTRUCT':target[name]=(value===''?[]:JSON.parse(value)).map(item=>convert.call(this,{},JSON.parse(item)));break;
                case 'ARRAYEVAL':target[name]=(value===''?[]:JSON.parse(value)).map(code=>eval(code));break;
                case 'ARRAYNUM':target[name]=(value===''?[]:JSON.parse(value)).map(Number);break;
                case 'ARRAYSTR':target[name]=(value===''?[]:JSON.parse(value)).map(String);break;
                case 'JSON':target[name]=value===''?'':JSON.parse(value);break;
                case 'ARRAYJSON':target[name]=(value===''?[]:JSON.parse(value)).map(item=>JSON.parse(item));break;
                case 'FUNC':target[name]=new Function(value===''?'return 0':JSON.parse(value));break;
                case 'ARRAYFUNC':target[name]=(value===''?[]:JSON.parse(value)).map(code=>new Function(JSON.parse(code)));break;
            }
        }catch(cause){
            const error=new Error('Cannot evaluate Ani parameter '+storageKey+'.',{cause});
            error.field=storageKey;throw error;
        }
    }
    return target;
}`)();
export function convertAniParameters(raw,receiver){
    try{return convertAniNative.call(receiver,{},raw);}
    catch(cause){throw new CoreError('ANI_CONFIG_VALUE',cause.message,{field:cause.field,cause:cause.cause?.message});}
}
