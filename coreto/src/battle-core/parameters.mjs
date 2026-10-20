import {CoreError,decodeParameters} from '../core-engine/parameters.mjs';
import {resolvePluginConfiguration} from '../shared/plugin-configuration.mjs';

export function resolveBattleConfiguration(catalog,plugins){
    const configuration=resolvePluginConfiguration(catalog,plugins,{errorPrefix:'BATTLE'});
    const values=decodeParameters(catalog.parameters,configuration.rawParameters);
    function prepare(field,value,path){
        if(field.type==='struct')return Object.fromEntries(field.fields.map(child=>[child.key,prepare(child,value[child.key],path+'/'+child.key)]));
        if(field.type==='array')return value.map((item,index)=>prepare(field.items,item,path+'/'+index));
        if(!field.javascript)return value;
        if(field.key==='ComboWindow_DrawJS'&&value.trim()==='')return null;
        try{
            const fn=new Function(field.javascript==='body'?value:`return (${value});`);
            return field.javascript==='body'?fn:fn.call(globalThis.VisuMZ);
        }catch(cause){throw new CoreError('BATTLE_AUTHORED_CODE','Invalid Battle callback at '+path+'.',{field:path,cause:cause.message});}
    }
    return {configuration,settings:Object.fromEntries(catalog.parameters.map(field=>[field.key,prepare(field,values[field.key],'/'+field.key)]))};
}
