import {publicDescriptor, validatePublicEntries} from '../../src/shared/public-api.mjs';
import options from '../../src/options-core/public-api.json' with {type:'json'};
import save from '../../src/save-core/public-api.json' with {type:'json'};
import {CoreError,parameterAt,validateValue} from '../../src/core-engine/parameters.mjs';
import {describeCoreApi} from '../../src/core-engine/api-descriptors.mjs';
import {effectiveConfiguration,materializeConfiguration,sourceFacts} from './configuration-authoring.mjs';
import {parsePluginsFile,replacePlugin} from './plugins-file.mjs';
import {validateAuthoredCode} from './javascript.mjs';

const globalTag={
    id:'SAV-TAG-GLOBAL',key:'global',type:'string',label:'Estado global',availability:'supported',
    description:'Put <Global> anywhere in an existing switch or variable name in the MZ System database. Matching is case-insensitive and is collected at game boot; restart the game after changing names. Reads then use the game configuration shared across save slots and new games in the same storage profile, rather than the value loaded from a particular save. An unset global switch reads false; an unset global variable reads 0. Use ordinary Control Switches/Control Variables events to write values: each write requests ConfigManager.save(), independently of saving a game slot. Numeric variable values are rounded down. Persistence requires that configuration write to succeed; it does not synchronize different devices or storage profiles. Removing the marker restores ordinary per-save reads; it does not migrate or clear the stored configuration value. Do not combine <Global> with <JS>, <JS:...>, <Self> or <Self:...> in the same name: the authoring CLI rejects that combination because those tags assign conflicting value sources.',
    targets:['system-switch','system-variable'],pattern:'<Global>',template:'<Global>',
    examples:['save tags set --target system:switch:1 --tag global --value \'"<Global>"\'', 'Illustrative MZ switch name: New Game Plus <Global>. Turn switch 1 ON with Control Switches after completing the game; once configuration storage succeeds, a new game or another slot reads it as ON. Use an existing switch ID chosen for your project.'],
    conflicts:['<(?:JS|Self)(?::[^>]*|)>'],occurrences:'Each occurrence marks the existing System name; preserves other text.'
};
const catalogs={options:{...options,namespace:'options',tags:[],methods:[]},save:{...save,namespace:'save',preserveCommandAnnotations:true,commandAliases:[save.reference.pluginId],tags:[globalTag],methods:[]}};
function authoringField(field){
    const result={...field};
    if(field.fields)result.fields=field.fields.filter(child=>child.availability!=='editorial').map(authoringField);
    if(field.items)result.items=authoringField(field.items);
    if(Object.hasOwn(field,'nativeDefault'))result.default=decode(result,field.nativeDefault);
    else if(field.type==='struct')result.default=Object.fromEntries(result.fields.map(child=>[child.key,structuredClone(child.default)]));
    return result;
}
export const optionsSaveCatalogs=Object.fromEntries(Object.entries(catalogs).map(([name,catalog])=>[name,{...catalog,commands:catalog.commands.filter(command=>command.availability!=='editorial').map(command=>({...command,args:command.args.map(field=>field.storageKey.endsWith(':eval')?{...field,type:'string',default:field.nativeDefault,javascript:'expression'}:field.directory?{...field,metadata:{type:['file'],dir:[field.directory]}}:field)})),parameters:catalog.parameters.filter(field=>field.availability!=='editorial').map(authoringField)}]));
export function describeOptionsSave(namespace){
    const catalog=catalogs[namespace];
    const versions = providers => Object.entries(providers).map(([id,version])=>`${id} ${version}`).join(' or ');
    const dependencies = [
        `Runtime: RPG Maker MZ 1.10.0; enable ${catalog.pluginId} and disable ${catalog.reference.pluginId}.`,
        `Required before this plugin: exactly one Core provider, ${versions(catalog.dependencies.cores)}.`,
        `Message is optional; when enabled, use exactly one provider before this plugin: ${versions(catalog.dependencies.messages)}.`,
        'Load this plugin before tier 2/3 plugins. Offline CLI authoring does not execute or activate these dependencies.'
    ];
    return validatePublicEntries(namespace, [...describeCoreApi(catalog).map(entry=>({...entry,
        ...(entry.availability === 'editorial' ? {
            context: entry.context === 'browser runtime; authoring is offline'
                ? 'Plugin Manager section label or separator; no runtime effect. Preserve its native value.' : entry.context,
            writing: 'Read-only discovery of an editor label. The CLI excludes this entry from parameter writes; any shared path selects the functional field instead.',
            examples: [`${namespace} api describe ${entry.id} --json`]
        } : {examples:entry.examples?.map(example=>example.replaceAll('core ',namespace+' '))})})),...catalog.optionItems.map(item=>({...item,surface:'option-item',key:item.symbol,context:item.context??'Conditional browser consumer; metadata remains authorable when its provider is absent.',usages:[{surface:'parameter',path:`/Categories/${item.categoryIndex}/List/${item.optionIndex}`}],examples:item.examples??[`options lists get --path /Categories/${item.categoryIndex}/List --index ${item.optionIndex}`]}))].map(entry=>publicDescriptor({...entry,plugin:catalog.pluginId,dependencies:[...dependencies,...(entry.dependencies??[])]}, namespace)));
}
function decode(schema,raw){
    if(raw===undefined)return structuredClone(schema.default);
    if(schema.type==='struct'){
        const stored=raw===''?{}:JSON.parse(raw);
        return Object.fromEntries(schema.fields.filter(field=>Object.hasOwn(stored,field.storageKey)).map(field=>[field.key,decode(field,stored[field.storageKey])]));
    }
    if(schema.type==='array')return(raw===''?[]:JSON.parse(raw)).map(value=>decode(schema.items,value));
    if(schema.type==='number')return Number(raw);
    if(schema.type==='boolean')return raw==='true'?true:raw==='false'?false:raw;
    return schema.encoding==='json'&&raw!==''?JSON.parse(raw):raw;
}
function encode(schema,value,previous){
    if(previous!==undefined&&JSON.stringify(decode(schema,previous))===JSON.stringify(value))return previous;
    if(schema.type==='struct'){
        const stored=previous?JSON.parse(previous):{};
        for(const field of schema.fields)if(Object.hasOwn(value,field.key))stored[field.storageKey]=encode(field,value[field.key],stored[field.storageKey]);
        return JSON.stringify(stored);
    }
    if(schema.type==='array'){
        const stored=previous?JSON.parse(previous):[];
        return JSON.stringify(value.map((item,index)=>encode(schema.items,item,stored[index])));
    }
    return schema.encoding==='json'?JSON.stringify(value):String(value);
}
function validate(schema,value,path){
    if(schema.storageKey?.endsWith(':eval')&&typeof value==='string'){
        if(value!=='')validateAuthoredCode({javascript:'expression'},value,path);
        return;
    }
    if(schema.type==='struct'){
        if(!value||typeof value!=='object'||Array.isArray(value))throw new CoreError('INVALID_VALUE','Use an object at '+path,{field:path});
        for(const [key,child]of Object.entries(value)){
            const field=schema.fields.find(field=>field.key===key);
            if(!field)throw new CoreError('UNKNOWN_FIELD','Unknown field '+path+'/'+key,{field:path+'/'+key});
            validate(field,child,path+'/'+key);
        }
    }else if(schema.type==='array'){
        if(!Array.isArray(value))throw new CoreError('INVALID_VALUE','Use an array at '+path,{field:path});
        value.forEach((item,index)=>validate(schema.items,item,path+'/'+index));
    }else{
        validateValue(schema,value,path);
        if(value!=='')validateAuthoredCode(schema,value,path);
    }
}
export function validateOptionsSaveAuthoring(catalog,raw){
    for(const field of catalog.parameters)validate(field,decode(field,raw[field.storageKey]),'/'+field.key);
}
function context(source,catalog,reading){
    const parsed=parsePluginsFile(source),before=effectiveConfiguration(catalog,parsed.plugins),index=parsed.plugins.indexOf(before.own);
    if(index<0&&!reading)throw new CoreError(catalog.namespace==='options'?'OPT_NOT_CONFIGURED':'SAV_NOT_CONFIGURED','Install the delivered bundle before editing.',{},3);
    if(!reading&&parsed.plugins.filter(plugin=>plugin.status&&[catalog.pluginId,catalog.reference.pluginId].includes(plugin.name)).length>1)throw new CoreError('DUPLICATE_PROVIDER','Use install to select one provider.');
    return {parsed,before,index};
}
function locate(catalog,raw,path){
    const {chain,segments}=parameterAt(catalog.parameters,path);let value=raw[chain[0].storageKey];
    for(let depth=1;depth<chain.length;depth++){
        const parent=chain[depth-1],stored=value?JSON.parse(value):parent.type==='array'?[]:{};
        const key=parent.type==='array'?segments[depth]:chain[depth].storageKey;
        if(parent.type==='array'&&!Object.hasOwn(stored,key))throw new CoreError('TARGET_NOT_FOUND','No list item at '+path,{field:path},3);
        value=stored[key];
    }
    return {chain,segments,raw:value,schema:chain.at(-1)};
}
function replace(chain,segments,raw,replacement,depth=0){
    if(depth===chain.length-1)return replacement;
    const schema=chain[depth],stored=raw?JSON.parse(raw):schema.type==='array'?[]:{};
    const key=schema.type==='array'?segments[depth+1]:chain[depth+1].storageKey;
    stored[key]=replace(chain,segments,stored[key],replacement,depth+1);return JSON.stringify(stored);
}
function finish(ctx,catalog,selection,replacement,result){
    const {parsed,before,index}=ctx,own=parsed.plugins[index],selector=selection.chain[0].key==='CoretoConfigSource';
    const parameters=!selector&&before.configuredSource==='inherit'?materializeConfiguration(catalog,own.parameters,before.rawParameters):{...own.parameters};
    const root=selection.chain[0];
    parameters[root.storageKey]=replace(selection.chain,selection.segments,parameters[root.storageKey]??before.rawParameters[root.storageKey],replacement);
    const source=replacePlugin(parsed,index,{...own,parameters}),after=effectiveConfiguration(catalog,parsePluginsFile(source).plugins);
    validateOptionsSaveAuthoring(catalog,after.rawParameters);
    return {source,result:{...result,...sourceFacts(after),sourceBefore:sourceFacts(before)}};
}
export function optionsSaveParameterOperation(source,catalog,{operation,path,value}){
    const ctx=context(source,catalog,operation==='get');
    const selected=locate(catalog,{...ctx.before.rawParameters,CoretoConfigSource:ctx.before.configuredSource},path),before=decode(selected.schema,selected.raw);
    if(operation==='get')return {source,result:{path,value:before,...sourceFacts(ctx.before)}};
    if(operation==='reset'&&!Object.hasOwn(selected.schema,'default'))throw new CoreError('RESET_UNAVAILABLE','Reset the containing group.',{field:path});
    const replacement=operation==='reset'?structuredClone(selected.schema.default):value;
    validate(selected.schema,replacement,path);
    return finish(ctx,catalog,selected,encode(selected.schema,replacement,selected.raw),{path,before,value:replacement});
}
export function optionsSaveListOperation(source,catalog,{operation,path,index,to,value}){
    const ctx=context(source,catalog,['get','list'].includes(operation)),selected=locate(catalog,ctx.before.rawParameters,path);
    if(selected.schema.type!=='array'||selected.schema.items.type!=='struct')throw new CoreError('INVALID_PATH','Select Categories, a category List, or ControllerButtons.',{field:path});
    const own=ctx.parsed.plugins[ctx.index]?.parameters;
    const authored=ctx.before.configuredSource==='own'&&Object.hasOwn(own,selected.chain[0].storageKey)?locate(catalog,own,path).raw:undefined;
    const raw=authored??selected.raw,items=raw?JSON.parse(raw):[];
    const facts=sourceFacts(ctx.before),schema=selected.schema.items;
    if(operation==='list')return {source,result:{path,items:items.map((raw,index)=>({index,value:decode(schema,raw)})),...facts}};
    if(!Number.isSafeInteger(index)||index<0||index>items.length||operation!=='insert'&&index===items.length)throw new CoreError('INVALID_POSITION','Select an existing zero-based index; insert may append.');
    const before=operation==='insert'?null:decode(schema,items[index]);
    if(operation==='get')return {source,result:{path,index,value:before,...facts}};
    if(['insert','update'].includes(operation)){
        validate(schema,value,path+'/'+index);
        const replacement={...(operation==='insert'?structuredClone(schema.default):before),...value};
        const raw=encode(schema,replacement,operation==='insert'?undefined:items[index]);
        if(operation==='insert')items.splice(index,0,raw);else items[index]=raw;
    }else if(operation==='remove')items.splice(index,1);
    else if(operation==='move'){
        if(!Number.isSafeInteger(to)||to<0||to>=items.length)throw new CoreError('INVALID_POSITION','Move destination must be an existing index.');
        items.splice(to,0,items.splice(index,1)[0]);
    }else throw new CoreError('INVALID_USAGE','Unknown list operation.');
    return finish(ctx,catalog,selected,JSON.stringify(items),{path,index,...(to!==undefined?{to}:{}),before,items:items.map((raw,index)=>({index,value:decode(schema,raw)}))});
}
