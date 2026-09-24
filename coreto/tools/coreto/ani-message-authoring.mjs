import {publicDescriptor, validatePublicEntries, validateOperationalCatalog} from '../../src/shared/public-api.mjs';
import {effectiveConfiguration,materializeConfiguration} from './configuration-authoring.mjs';
import catalog from '../../src/ani-msg-text-effects/public-api.json' with {type:'json'};
import {CoreError,parameterAt,validateValue} from '../../src/core-engine/parameters.mjs';
import {describeCoreApi} from '../../src/core-engine/api-descriptors.mjs';
import {parsePluginsFile,replacePlugin} from './plugins-file.mjs';
import {validateAuthoredCode} from './javascript.mjs';

export const aniAuthoringCatalog={...catalog,namespace:'ani-message',tags:[],methods:[]};
export const aniFamilies=catalog.parameters.filter(field=>field.type==='array').map(field=>field.key);
const facts=({configuredSource,effectiveSource,materialized})=>({configuredSource,effectiveSource,materialized});

function resolveAuthoringSource(plugins){return effectiveConfiguration(catalog,plugins);}

export function describeAniApi(){
    validateOperationalCatalog(catalog);
    const schemas=new Map(describeCoreApi(aniAuthoringCatalog).map(entry=>[entry.id,entry]));
    const entries=catalog.entries.map(reference=>{
        const schema=schemas.get(reference.id);
        return {...reference,...schema,plugin:catalog.pluginId,version:catalog.version,
            authoring:schema?'cli-editor':reference.surface==='text-grammar'?'show-text':'runtime',
            examples:(schema?.examples??reference.examples).map(example=>typeof example==='string'?example.replaceAll('core ','ani-message '):example)};
    });
    const selector=schemas.get('ANI-CONFIG-SOURCE');
    return validatePublicEntries('ani-message', [...entries,{...selector,plugin:catalog.pluginId,availability:'supported',examples:selector.examples.map(example=>example.replaceAll('core ','ani-message '))}].map(entry=>publicDescriptor(entry, 'ani-message')));
}

// Decode native strings without evaluating scripts. Empty containers and numeric strings
// have native meanings; unchanged encoded leaves retain their original spelling.
function decode(schema,raw){
    if(raw===undefined)return structuredClone(schema.default);
    if(schema.type==='struct'){
        const object=raw===''?{}:JSON.parse(raw);
        return Object.fromEntries(schema.fields.filter(field=>Object.hasOwn(object,field.storageKey)).map(field=>[field.key,decode(field,object[field.storageKey])]));
    }
    if(schema.type==='array')return (raw===''?[]:JSON.parse(raw)).map(item=>decode(schema.items,item));
    return schema.type==='number'?Number(raw):raw;
}
function encode(schema,value,previous){
    if(previous!==undefined&&JSON.stringify(decode(schema,previous))===JSON.stringify(value))return previous;
    if(schema.type==='struct'){
        const object=previous?JSON.parse(previous):{};
        for(const field of schema.fields)object[field.storageKey]=encode(field,value[field.key],object[field.storageKey]);
        return JSON.stringify(object);
    }
    if(schema.type==='array'){
        const items=previous?JSON.parse(previous):[];
        return JSON.stringify(value.map((item,index)=>encode(schema.items,item,items[index])));
    }
    return String(value);
}
function validateRaw(schema,raw,path){
    if(raw===undefined||raw===''&&['struct','array'].includes(schema.type))return;
    if(schema.type==='struct'){
        const object=JSON.parse(raw);
        for(const field of schema.fields)validateRaw(field,object[field.storageKey],path+'/'+field.key);
    }else if(schema.type==='array')JSON.parse(raw).forEach((item,index)=>validateRaw(schema.items,item,path+'/'+index));
    else {const value=decode(schema,raw);validateValue(schema,value,path);validateAuthoredCode(schema,value,path);}
}
export function validateAniConfiguration(raw){for(const field of catalog.parameters)validateRaw(field,raw[field.storageKey],'/'+field.key);}
function insert(source,index,plugin){
    const parsed=parsePluginsFile(source),span=parsed.spans[index],last=parsed.spans.at(-1);
    const at=span?.start??last?.end??parsed.arrayStart+1;
    return source.slice(0,at)+(span?JSON.stringify(plugin)+',\n':(last?',\n':'')+JSON.stringify(plugin))+source.slice(at);
}

function context(source,reading=false){
    let parsed=parsePluginsFile(source),index=parsed.plugins.findIndex(plugin=>plugin.name===catalog.pluginId);
    if(index<0){
        if(!reading||!parsed.plugins.some(plugin=>plugin.name===catalog.reference.pluginId))throw new CoreError('ANI_NOT_CONFIGURED','Use ani-message install before editing configuration.',{field:'js/plugins.js'},3);
        index=parsed.plugins.length;
        parsed=parsePluginsFile(insert(source,index,{name:catalog.pluginId,status:false,description:'',parameters:{}}));
    }
    return {parsed,index,before:resolveAuthoringSource(parsed.plugins)};
}
function editable({parsed,index,before},selector=false){
    if(parsed.plugins.filter(plugin=>plugin.status&&[catalog.pluginId,catalog.reference.pluginId].includes(plugin.name)).length>1)throw new CoreError('ANI_DUPLICATE_PROVIDER','Use ani-message install to select one Ani provider.');
    const plugin=parsed.plugins[index];
    return {...plugin,parameters:!selector&&before.configuredSource==='inherit'?materializeConfiguration(catalog,plugin.parameters,before.rawParameters):{...plugin.parameters}};
}
function finish(ctx,plugin,result){
    const source=replacePlugin(ctx.parsed,ctx.index,plugin),after=resolveAuthoringSource(parsePluginsFile(source).plugins);
    validateAniConfiguration(after.rawParameters);
    return {source,result:{...result,...facts(after),sourceBefore:facts(ctx.before)}};
}
function replacePath(chain,segments,raw,value,depth=0){
    const schema=chain[depth];
    if(depth===chain.length-1)return encode(schema,value,raw);
    const object=raw?JSON.parse(raw):schema.type==='array'?[]:{};
    const key=schema.type==='array'?segments[depth+1]:chain[depth+1].storageKey;
    object[key]=replacePath(chain,segments,object[key],value,depth+1);
    return JSON.stringify(object);
}
export function aniParameterOperation(source,{operation,path,value}){
    const ctx=context(source,operation==='get'),{chain,segments}=parameterAt(catalog.parameters,path),root=chain[0];
    let current=path==='/CoretoConfigSource'?ctx.before.configuredSource:decode(root,ctx.before.rawParameters[root.storageKey]);
    for(let depth=1;depth<segments.length;depth++){
        const segment=segments[depth];
        if(current===undefined||!Object.hasOwn(current,segment)){
            if(chain[depth-1].type==='array'||operation==='get')throw new CoreError('TARGET_NOT_FOUND','No value at '+path,{field:path},3);
            current=undefined;
        }else current=current[segment];
    }
    if(operation==='get')return {source,result:{path,value:current,...facts(ctx.before)}};
    const selected=chain.at(-1),replacement=operation==='reset'?structuredClone(selected.default):value;
    validateValue(selected,replacement,path);validateAuthoredCode(selected,replacement,path);
    const plugin=editable(ctx,path==='/CoretoConfigSource');
    // Complete absent native fields for the selected group only; preserve other groups.
    const raw=plugin.parameters[root.storageKey]??ctx.before.rawParameters[root.storageKey];
    plugin.parameters[root.storageKey]=replacePath(chain,segments,raw,replacement);
    return finish(ctx,plugin,{path,before:current,value:replacement});
}
export function aniEffectOperation(source,{operation,family,index,to,value}){
    const schema=catalog.parameters.find(field=>field.key===family&&aniFamilies.includes(field.key));
    if(!schema)throw new CoreError('UNKNOWN_FIELD','Use --family '+aniFamilies.join('|'),{field:family});
    const ctx=context(source,['list','get'].includes(operation));
    const effective=ctx.before.rawParameters[schema.storageKey],effectiveItems=effective===''?[]:JSON.parse(effective);
    const raw=ctx.before.configuredSource==='own'?(ctx.parsed.plugins[ctx.index].parameters[schema.storageKey]??effective):effective;
    const items=raw===''?[]:JSON.parse(raw);
    if(operation==='list')return {source,result:{family,items:effectiveItems.map((item,index)=>({index,value:decode(schema.items,item)})),...facts(ctx.before)}};
    if(!Number.isSafeInteger(index)||index<0||index>items.length||operation!=='insert'&&index===items.length)throw new CoreError('INVALID_POSITION','Use an existing zero-based index (insert also accepts the list length).',{field:'index'});
    const before=operation==='insert'?null:decode(schema.items,effectiveItems[index]);
    if(operation==='get')return {source,result:{family,index,value:before,...facts(ctx.before)}};
    const plugin=editable(ctx);
    if(['insert','update'].includes(operation)){
        if(!value||typeof value!=='object'||Array.isArray(value))throw new CoreError('INVALID_VALUE','Preset values must be an object.');
        const replacement={...structuredClone(schema.items.default),...(before??{}),...value};
        validateValue(schema.items,replacement,'/'+family+'/'+index);validateAuthoredCode(schema.items,replacement,'/'+family+'/'+index);
        if(operation==='insert')items.splice(index,0,encode(schema.items,replacement));
        else items[index]=encode(schema.items,replacement,items[index]);
    }else if(operation==='remove')items.splice(index,1);
    else if(operation==='move'){
        if(!Number.isSafeInteger(to)||to<0||to>=items.length)throw new CoreError('INVALID_POSITION','Move destination must be an existing zero-based index.',{field:'to'});
        items.splice(to,0,items.splice(index,1)[0]);
    }else throw new CoreError('INVALID_USAGE','Unknown effects operation.');
    plugin.parameters[schema.storageKey]=JSON.stringify(items);
    return finish(ctx,plugin,{family,index,...(operation==='move'?{to}:{}),before,value:operation==='remove'?null:decode(schema.items,items[operation==='move'?to:index])});
}
export function inspectAniText(text){
    const tags=[];
    const literalText=text.replace(/\\\\|\\EFFECT<(.*?)>|<CLEAR EFFECTS?>/gi,(match,names)=>{
        if(match==='\\\\')return match;
        tags.push({id:names===undefined?'ANI-RX-002':'ANI-RX-001',text:match,...(names===undefined?{}:{names:names.split(',').map(name=>name.trim().toLowerCase())})});
        return '';
    });
    return {tags,literalText,authority:'Native Effect/Clear grammar only; preset names and other escape codes resolve in the game.'};
}
