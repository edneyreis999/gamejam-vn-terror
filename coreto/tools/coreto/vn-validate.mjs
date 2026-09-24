import {sourceFacts} from './configuration-authoring.mjs';
import {validatePictureReference} from './picture-reference.mjs';
import {decodeAuthoredValue as decodeValue} from './authored-values.mjs';
import {join} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {readSnapshot} from './files.mjs';
import {parsePluginsFile} from './plugins-file.mjs';
import {vnConfiguration} from './vn-authoring.mjs';
import {validateAuthoredCode} from './javascript.mjs';
import {commandOperation,validateReferences} from './commands.mjs';
import {eventTarget} from './event-target.mjs';

export async function validateVnProject(root,catalog) {
    let selected;
    const snapshots=new Map(),diagnostics=[];const counts={parameters:0,eventLists:0,commands:0};
    async function source(file){if(!snapshots.has(file))snapshots.set(file,await readSnapshot(join(root,file),root));return snapshots.get(file).content.toString('utf8');}
    const database=async name=>JSON.parse(await source(`data/${name}`));
    async function inspect(target,action){try{await action();}catch(error){if(!(error instanceof CoreError)&&!error.code&&!(error instanceof SyntaxError))throw error;diagnostics.push({severity:'error',target,code:error.code??'INVALID_JSON',message:error.message,...error.details});}}
    await inspect('js/plugins.js',async()=>{
        const plugins=parsePluginsFile(await source('js/plugins.js')).plugins;const configuration=vnConfiguration(plugins,catalog);selected=sourceFacts(configuration);
        if(!configuration.own?.status)throw new CoreError('VN_NOT_ACTIVE','Activate the own VN provider.');
        if(plugins.some(p=>p.name===catalog.reference.pluginId&&p.status))throw new CoreError('VN_PROVIDER_CONFLICT','Disable the original VN provider.');
        if(plugins.filter(p=>p.status&&['VisuMZ_1_MessageCore','Coreto_1_MessageCore'].includes(p.name)).length>1)throw new CoreError('VN_MESSAGE_CONFLICT','Enable at most one Message provider.');
        const cores=plugins.flatMap((p,i)=>p.status&&['VisuMZ_0_CoreEngine','Coreto_0_CoreEngine'].includes(p.name)?[i]:[]);
        if(cores.length!==1||cores[0]>=configuration.index)throw new CoreError('VN_CORE_REQUIRED','Exactly one compatible Core must precede VN.');
        for(const name of ['VisuMZ_1_MessageCore','Coreto_1_MessageCore','VisuMZ_1_BattleCore'])if(plugins.some((p,i)=>p.status&&p.name===name&&i>=configuration.index))throw new CoreError('VN_LOAD_ORDER',`${name} must precede VN.`);
        for(const plugin of plugins.filter(p=>p.status&&['VisuMZ_0_CoreEngine','Coreto_0_CoreEngine','VisuMZ_1_MessageCore','Coreto_1_MessageCore','VisuMZ_1_BattleCore'].includes(p.name)))await source(`js/plugins/${plugin.name}.js`);
        for(const field of catalog.parameters.filter(p=>p.key!=='CoretoConfigSource'))await inspect(`parameters/${field.key}`,async()=>{const value=decodeValue(field,configuration.effective[field.storageKey],`/${field.key}`);validateAuthoredCode(field,value,`/${field.key}`);counts.parameters++;});
    });
    await inspect(`js/plugins/${catalog.pluginId}.js`,()=>source(`js/plugins/${catalog.pluginId}.js`));
    async function events(selector){await inspect(selector,async()=>{
        const target=eventTarget(root,selector),text=await source(target.file.slice(root.length+1));const {units}=commandOperation(text,catalog,target,{operation:'list'}).result;counts.eventLists++;
        for(const unit of units.filter(u=>u.code===357&&[catalog.pluginId,...catalog.commandAliases].includes(u.pluginId)))await inspect(`${selector}/command:${unit.index}`,async()=>{
            const change=commandOperation(text,catalog,target,{operation:'update',command:unit.command,index:unit.index});const descriptor=catalog.commands.find(c=>c.key===unit.command);await validateReferences(root,descriptor,change.result.after[0].parameters[3],database);for(const field of descriptor.args.filter(field=>field.metadata?.type?.[0]==='file')){
                const value=decodeValue(field,change.result.after[0].parameters[3][field.storageKey],field.key);
                await validatePictureReference(root,value,field.key,source);
            }
            counts.commands++;
        });
    });}
    for(const name of ['CommonEvents','Troops','MapInfos'])await inspect(`data/${name}.json`,async()=>{
        const data=await database(`${name}.json`);if(!Array.isArray(data))throw new CoreError('INVALID_DATABASE','Expected a native database array.');
        for(const [id,record] of data.entries()){
            if(!record)continue;if(!id||record.id!==id)throw new CoreError('INVALID_DATABASE_ID','Record ID does not match its slot.');
            if(name==='CommonEvents')await events(`common-event:${id}`);
            else if(name==='Troops'){if(!Array.isArray(record.pages))throw new CoreError('INVALID_DATABASE','Expected troop pages.');for(let page=1;page<=record.pages.length;page++)await events(`troop:${id}/page:${page}`);}
            else await inspect(`map:${id}`,async()=>{const map=await database(`Map${String(id).padStart(3,'0')}.json`);if(!Array.isArray(map.events))throw new CoreError('INVALID_DATABASE','Expected map events.');for(const [eventId,event] of map.events.entries())if(event){if(eventId!==event.id)throw new CoreError('INVALID_DATABASE_ID','Event ID does not match its slot.');if(!Array.isArray(event.pages))throw new CoreError('INVALID_DATABASE','Expected event pages.');for(let page=1;page<=event.pages.length;page++)await events(`map:${id}/event:${eventId}/page:${page}`);}});
        }
    });
    for(const [file,snapshot] of snapshots)await inspect(file,async()=>{if((await readSnapshot(join(root,file),root)).hash!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Input changed during validation.');});
    return {valid:diagnostics.length===0,written:false,diagnostics,counts,configuration:selected??null,inputHashes:Object.fromEntries([...snapshots].map(([file,s])=>[file,s.hash])),limits:'Static native VN authoring and provider presence only; Coreto bundle/source consistency is not checked. Expressions are compiled, never executed; dynamic references and provider runtime compatibility require directed QA.'};
}
