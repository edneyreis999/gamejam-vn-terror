import {resolveOptionsSaveConfiguration} from '../../src/shared/options-save-configuration.mjs';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {resolvePluginConfiguration} from '../../src/shared/plugin-configuration.mjs';
import {resolveExtendedSource} from '../../src/ext-message-func/parameters.mjs';
import {resolveAniSource} from '../../src/ani-msg-text-effects/parameters.mjs';
import {decodeAuthoredValue,encodeAuthoredValue} from './authored-values.mjs';
import {validateAuthoredCode} from './javascript.mjs';
import {parsePluginsFile,replacePlugin,insertPlugin} from './plugins-file.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';
import {readPluginMetadata} from '../project.mjs';
import {parameterOperation} from './parameters.mjs';
import {join} from 'node:path';

export const sourceFacts=({configuredSource,effectiveSource,materialized})=>({configuredSource,effectiveSource,materialized});
const prefix=catalog=>({'Coreto_2_ExtMessageFunc':'EXT','Coreto_2_AniMsgTextEffects':'ANI','Coreto_2_VNPictureBusts':'VN','Coreto_1_OptionsCore':'OPT','Coreto_1_SaveCore':'SAV'}[catalog.pluginId]??'CORETO');
function completeField(field,raw,path){
    if(raw===undefined)return encodeAuthoredValue(field,field.default,path);
    decodeAuthoredValue(field,raw,path);
    if(raw===''||!['struct','array'].includes(field.type))return raw;
    if(field.type==='array'&&!['struct','array'].includes(field.items.type))return raw;
    const stored=JSON.parse(raw),completed=field.type==='array'
        ?stored.map((item,index)=>completeField(field.items,item,path+'/'+index))
        :completeFields(field.fields,stored,path);
    return JSON.stringify(stored)===JSON.stringify(completed)?raw:JSON.stringify(completed);
}
function completeFields(fields,raw,path=''){
    const result={...raw};
    for(const field of fields.filter(field=>field.key!=='CoretoConfigSource'))result[field.storageKey]=completeField(field,raw[field.storageKey],path+'/'+field.key);
    return result;
}
export function effectiveConfiguration(catalog,plugins){
    const result=resolvePluginConfiguration(catalog,plugins,{errorPrefix:prefix(catalog),allowMissingOwn:true});
    if(!result.own){
        const seed={name:catalog.pluginId,status:false,description:'',parameters:{CoretoConfigSource:'inherit'}};
        return {...effectiveConfiguration(catalog,[...plugins,seed]),own:undefined};
    }
    if(['Coreto_1_OptionsCore','Coreto_1_SaveCore'].includes(catalog.pluginId)){
        let completed;
        try{completed=resolveOptionsSaveConfiguration(catalog,plugins).rawParameters;}
        catch(error){
            if(error.code===prefix(catalog)+'_CONFIG_ENCODING')throw new CoreError(error.code,error.message,{field:error.field});
            throw error;
        }
        result.rawParameters=preserveEncoding(catalog.parameters,result.rawParameters,completed);
    }else if(catalog.pluginId==='Coreto_2_ExtMessageFunc')result.rawParameters=resolveExtendedSource(catalog,plugins).rawParameters;
    else if(catalog.pluginId==='Coreto_2_AniMsgTextEffects'){
        const completed=resolveAniSource(catalog,plugins).rawParameters;
        result.rawParameters=preserveEncoding(catalog.parameters,result.rawParameters,completed);
    }else result.rawParameters=completeFields(catalog.parameters,result.rawParameters);
    return result;
}
function preserveFieldEncoding(schema,raw,completed){
    if(raw===undefined)return completed;
    if(raw===''||!['struct','array'].includes(schema.type))return raw;
    const stored=JSON.parse(raw),values=JSON.parse(completed);
    if(schema.type==='struct'){
        for(const field of schema.fields)values[field.storageKey]=preserveFieldEncoding(field,stored[field.storageKey],values[field.storageKey]);
    }else for(let index=0;index<values.length;index++)values[index]=preserveFieldEncoding(schema.items,stored[index],values[index]);
    return JSON.stringify(stored)===JSON.stringify(values)?raw:JSON.stringify(values);
}
function preserveEncoding(fields,raw,completed){
    const result={...completed};
    for(const field of fields)result[field.storageKey]=preserveFieldEncoding(field,raw[field.storageKey],completed[field.storageKey]);
    return result;
}
export function materializeConfiguration(catalog,previous,effective){
    function ownStruct(raw,key){
        let value;
        try{value=JSON.parse(raw);}catch{throw new CoreError(prefix(catalog)+'_CONFIG_ENCODING','Invalid own struct '+key+'.');}
        if(!value||typeof value!=='object'||Array.isArray(value))throw new CoreError(prefix(catalog)+'_CONFIG_ENCODING','Invalid own struct '+key+'.');
        return value;
    }
    function merge(fields,own,selected){
        const result={...own,...selected};
        for(const field of fields){
            const key=field.storageKey;
            if(field.type==='struct'&&own[key]&&selected[key]){
                const combined=merge(field.fields,ownStruct(own[key],key),JSON.parse(selected[key]));
                if(JSON.stringify(combined)!==JSON.stringify(JSON.parse(selected[key])))result[key]=JSON.stringify(combined);
            }
        }
        return result;
    }
    const result=merge(catalog.parameters,previous,effective);
    result.CoretoConfigSource='own';
    if(catalog.pluginId==='Coreto_2_VNPictureBusts')delete result.ConfigurationSource;
    return result;
}

export function configurationParameterOperation(source,catalog,options){
    let parsed=parsePluginsFile(source);
    const before=resolvePluginConfiguration(catalog,parsed.plugins,{errorPrefix:prefix(catalog),allowMissingOwn:true});
    const selector=options.path==='/CoretoConfigSource';
    if(!before.own&&(!before.source||options.operation!=='get'))throw new CoreError(prefix(catalog)+'_NOT_CONFIGURED','Use '+catalog.namespace+' install before editing parameters.',{field:'js/plugins.js'},3);
    const own=before.own??{name:catalog.pluginId,status:false,description:'',parameters:{CoretoConfigSource:'inherit'}};
    let index=parsed.plugins.indexOf(before.own);
    if(index<0){index=parsed.plugins.length;parsed=parsePluginsFile(insertPlugin(parsed,index,own));}
    if(options.operation==='get'){
        const effective=catalog.pluginId==='Coreto_2_ExtMessageFunc'?effectiveConfiguration(catalog,parsed.plugins).rawParameters:before.rawParameters;
        const view={...own,parameters:{...effective,CoretoConfigSource:before.configuredSource}};
        return {source,result:{...parameterOperation(replacePlugin(parsed,index,view),catalog,options).result,...sourceFacts(before)}};
    }
    if(parsed.plugins.filter(plugin=>plugin.status&&[catalog.pluginId,catalog.reference?.pluginId].includes(plugin.name)).length>1)throw new CoreError(prefix(catalog)+'_DUPLICATE_PROVIDER','Use install to select one active provider.');
    const parameters=!selector&&before.configuredSource==='inherit'
        ?materializeConfiguration(catalog,own.parameters,effectiveConfiguration(catalog,parsed.plugins).rawParameters)
        :{...own.parameters,CoretoConfigSource:selector?before.configuredSource:'own'};
    if(catalog.pluginId==='Coreto_2_VNPictureBusts')delete parameters.ConfigurationSource;
    const prepared=replacePlugin(parsed,index,{...own,parameters});
    const change=parameterOperation(prepared,catalog,options);
    const final=parsePluginsFile(change.source).plugins;
    const after=resolvePluginConfiguration(catalog,final,{errorPrefix:prefix(catalog)});
    if(catalog.pluginId==='Coreto_2_ExtMessageFunc')validateConfiguration(catalog,effectiveConfiguration(catalog,final).rawParameters);
    return {...change,result:{...change.result,...sourceFacts(after),sourceBefore:sourceFacts(before)}};
}
export function validateConfiguration(catalog,raw){
    if(catalog.pluginId==='Coreto_2_AniMsgTextEffects'){
        resolveAniSource(catalog,[{name:catalog.pluginId,parameters:raw}]);
        return;
    }
    for(const field of catalog.parameters.filter(field=>field.key!=='CoretoConfigSource')){
        const path='/'+field.key,value=decodeAuthoredValue(field,raw[field.storageKey],path);
        validateAuthoredCode(field,value,path);
    }
}
function removePlugin(source,index){
    const parsed=parsePluginsFile(source),span=parsed.spans[index],next=parsed.spans[index+1],previous=parsed.spans[index-1];
    return source.slice(0,next?span.start:previous?.end??span.start)+source.slice(next?.start??span.end);
}
function orderConstraints(catalog){
    if(catalog.orderAfter)return {before:catalog.orderAfter,after:catalog.orderBefore??[]};
    const id=catalog.pluginId;
    if(['Coreto_1_OptionsCore','Coreto_1_SaveCore'].includes(id))return {before:Object.keys({...catalog.dependencies.cores,...catalog.dependencies.messages}),after:['Coreto_2_ExtMessageFunc','VisuMZ_2_ExtMessageFunc','Coreto_2_VNPictureBusts','VisuMZ_2_VNPictureBusts','Coreto_2_AniMsgTextEffects','VisuMZ_2_AniMsgTextEffects','VisuMZ_3_MessageLog','VisuMZ_3_MsgLetterSounds']};
    if(id==='Coreto_0_CoreEngine')return {before:[],after:['Coreto_1_MessageCore','VisuMZ_1_MessageCore','Coreto_2_VNPictureBusts','VisuMZ_2_VNPictureBusts']};
    if(id==='Coreto_1_MessageCore')return {before:['Coreto_0_CoreEngine'],after:[...Object.keys(catalog.dependencies.consumers),'Coreto_2_ExtMessageFunc','Coreto_2_AniMsgTextEffects']};
    if(id==='Coreto_2_VNPictureBusts')return {before:['Coreto_0_CoreEngine','VisuMZ_0_CoreEngine','Coreto_1_MessageCore','VisuMZ_1_MessageCore','VisuMZ_1_BattleCore'],after:['Coreto_2_AniMsgTextEffects']};
    return {before:Object.keys({...catalog.dependencies.cores,...catalog.dependencies.messages,...catalog.dependencies.before}),after:['Coreto_2_AniMsgTextEffects',...Object.keys(catalog.dependencies.integrations??{}).filter(name=>name.startsWith('VisuMZ_3_'))].filter(name=>name!==id)};
}
export function installConfiguration(source,catalog,metadata,{validate=validateConfiguration}={}){
    let parsed=parsePluginsFile(source);
    if(catalog.pluginId==='Coreto_2_VNPictureBusts'){
        for(const [ids,code] of [[['Coreto_0_CoreEngine','VisuMZ_0_CoreEngine'],'VN_CORE_REQUIRED'],[['Coreto_1_MessageCore','VisuMZ_1_MessageCore'],'VN_MESSAGE_CONFLICT']]){
            if(parsed.plugins.filter(plugin=>plugin.status&&ids.includes(plugin.name)).length>1)throw new CoreError(code,'Enable at most one provider for each dependency.',{},4);
        }
    }
    const before=effectiveConfiguration(catalog,parsed.plugins),oldIndex=parsed.plugins.indexOf(before.own);
    const seed=before.own??{name:catalog.pluginId,status:false,description:metadata.description,parameters:{}};
    const changed={...seed,status:true,description:metadata.description,parameters:materializeConfiguration(catalog,seed.parameters,before.rawParameters)};
    validate(catalog,changed.parameters);
    if(oldIndex>=0)source=removePlugin(source,oldIndex);
    parsed=parsePluginsFile(source);
    const original=parsed.plugins.findIndex(plugin=>plugin.name===catalog.reference?.pluginId||plugin.name===catalog.pluginId.replace('Coreto_','VisuMZ_'));
    if(original>=0)source=replacePlugin(parsed,original,{...parsed.plugins[original],status:false});
    parsed=parsePluginsFile(source);
    const constraints=orderConstraints(catalog);
    const lower=Math.max(-1,...parsed.plugins.flatMap((plugin,index)=>plugin.status&&constraints.before.includes(plugin.name)?[index]:[]))+1;
    const upper=parsed.plugins.findIndex(plugin=>plugin.status&&(constraints.after.includes(plugin.name)||catalog.pluginId.includes('_2_')&&plugin.status&&plugin.name.startsWith('VisuMZ_3_')));
    if(upper>=0&&lower>upper)throw new CoreError(prefix(catalog)+'_PLUGIN_ORDER','Place dependencies before consumers before installing this plugin.');
    const index=oldIndex>=lower&&(upper<0||oldIndex<=upper)?oldIndex:upper>=0?upper:Math.max(lower,parsed.plugins.length);
    source=insertPlugin(parsed,index,changed);
    const final=parsePluginsFile(source).plugins;
    const groups=catalog.orderAfter?catalog.dependencies.required:(catalog.pluginId==='Coreto_0_CoreEngine'?[]:catalog.pluginId==='Coreto_1_MessageCore'?[['Coreto_0_CoreEngine']]
        :[['Coreto_0_CoreEngine','VisuMZ_0_CoreEngine'],...(['Coreto_2_VNPictureBusts','Coreto_1_OptionsCore','Coreto_1_SaveCore'].includes(catalog.pluginId)?[]:[['Coreto_1_MessageCore','VisuMZ_1_MessageCore']])]);
    return {source,result:{pluginId:catalog.pluginId,index,...sourceFacts(effectiveConfiguration(catalog,final)),sourceBefore:sourceFacts(before),before:before.own??null,value:changed,
        dependencies:{providers:groups.map(alternatives=>({alternatives,satisfied:final.filter(plugin=>plugin.status&&alternatives.includes(plugin.name)).length===1})),note:'Only the requested pair is activated/deactivated. Runtime versions and composition still require validation.'}}};
}
export async function installConfiguredPlugin(root,catalog,{dryRun=false,expectedHash,validate}={}){
    const snapshot=await readSnapshot(join(root,'js/plugins.js'),root),file=join(root,'js/plugins',catalog.pluginId+'.js');
    if(expectedHash!==undefined&&expectedHash!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Read the registry before retrying.',{},4);
    let bundle;
    try{bundle=await readSnapshot(file,root);}catch(error){
        if(error.code!=='ENOENT')throw error;
        throw new CoreError('PLUGIN_BUNDLE_MISSING','Deliver the plugin through the installer or its build before install.',{file},3);
    }
    const code=bundle.content.toString('utf8'),match=code.match(/^const catalog = (\{[\s\S]*?\});$/m);
    const identity=match?JSON.parse(match[1]):null;
    if(identity?.pluginId!==catalog.pluginId||identity.version!==catalog.version)throw new CoreError('PLUGIN_BUNDLE_IDENTITY','Use the delivered bundle with the expected plugin identity and version.',{file},4);
    const change=installConfiguration(snapshot.content.toString('utf8'),catalog,readPluginMetadata(code),{validate});
    const unchanged=JSON.stringify(parsePluginsFile(snapshot.content.toString('utf8')).plugins)===JSON.stringify(parsePluginsFile(change.source).plugins);
    const result={file:snapshot.file,...change.result,bundle:{file,sha256:bundle.hash,bytes:bundle.content.length},dryRun,written:false,changed:false,beforeHash:snapshot.hash,proposedHash:unchanged?snapshot.hash:hash(change.source),afterHash:snapshot.hash};
    if(!dryRun&&!unchanged){
        if((await readSnapshot(file,root)).hash!==bundle.hash)throw new CoreError('FILE_CONFLICT','The plugin bundle changed; inspect it before retrying.',{file},4);
        Object.assign(result,await writeSnapshot(snapshot,change.source),{written:true,changed:true});
    }
    return result;
}
