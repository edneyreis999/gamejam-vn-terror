import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {describeCoreApi} from '../../src/core-engine/api-descriptors.mjs';
import {configurationParameterOperation,installConfiguredPlugin} from './configuration-authoring.mjs';
import {commandFileOperation} from './commands.mjs';
import {tagFileOperation} from './tags.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';
function operationsFor(catalog){return {api:['list','describe'],install:[],parameters:['get','set','reset'],...(catalog.commands.length?{commands:['list','insert','update','remove']}:{}),...(catalog.tags.length?{tags:['list','set','remove']}:{})};}
function usage(message){throw new CoreError('INVALID_USAGE',message);}
export function complementHelp(catalog){
    const operations=operationsFor(catalog);
    return {usage:'node tools/coreto/cli.mjs '+catalog.namespace+' <group> <operation> --project <jogo>',implemented:operations,
        discovery:'api list | api describe <id|key|path>',parameters:'parameters get|set|reset --path <catalog path> [--value <json>]',
        ...(catalog.commands.length?{commands:'commands list|insert|update|remove --target <event selector> --before I|--index I --command <ID> [--value <json>]'}:{}),
        ...(catalog.tags.length?{tags:'tags list|set|remove --target <event selector>/text:I/choice:J --tag '+catalog.tags.map(tag=>tag.key).join('|')+' [--value <json>]'}:{}),
        writing:'Mutations selected by index require --expected-hash from list. Writes accept --dry-run. Reopen the project in the Editor after CLI writes.',
        configuration:'install materializes own configuration and switches only this provider pair. Dependencies remain unchanged. Switching CoretoConfigSource alone does not copy values.'};
}
function integer(value){
    if(!/^(0|[1-9]\d*)$/.test(value??'')||!Number.isSafeInteger(Number(value)))usage('Use a zero-based safe integer index.');
    return Number(value);
}
export async function executeComplementCli(catalog,positionals,values,locateProject){
    const operations=operationsFor(catalog);
    const [namespace,group,operation,id,...rest]=positionals;
    if(!operations[group]||(group==='install'?operation!==undefined:!operations[group].includes(operation))||rest.length||id&&!(group==='api'&&operation==='describe'))usage('Use '+catalog.namespace+' --help.');
    const mutation=group==='install'||group==='parameters'&&operation!=='get'||['commands','tags'].includes(group)&&operation!=='list';
    const allowed=['project','help','json',...(mutation?['dry-run','expected-hash']:[])];
    if(group==='parameters')allowed.push('path',...(operation==='set'?['value','input']:[]));
    if(group==='commands')allowed.push('target',...(operation==='list'?[]:['command',operation==='insert'?'before':'index']),...(['insert','update'].includes(operation)?['value','input']:[]));
    if(group==='tags')allowed.push('target',...(operation==='list'?[]:['tag','occurrence']),...(operation==='set'?['value','input']:[]));
    for(const [key,value]of Object.entries(values))if(value!==false&&!allowed.includes(key))usage('Unsupported --'+key+' for this operation.');
    if(group==='api'){
        if((operation==='describe')!==Boolean(id))usage('Use api list or api describe <id|key|path>.');
        const entries=describeCoreApi(catalog).map(entry=>({...entry,examples:entry.examples?.map(example=>example.replaceAll('core ',catalog.namespace+' '))}));
        const matches=id?entries.filter(entry=>entry.id===id||entry.key===id||entry.usages.some(usage=>usage.path===id)):entries;
        if(id&&matches.length!==1)throw new CoreError(matches.length?'AMBIGUOUS_API_ENTRY':'TARGET_NOT_FOUND','Choose one exact API ID.',{candidates:matches.map(entry=>entry.id)},3);
        return {operation:namespace+' api '+operation,result:id?matches[0]:entries};
    }
    const root=await locateProject(values.project);
    if(group==='install')return {operation:namespace+' install',result:await installConfiguredPlugin(root,catalog,{dryRun:values['dry-run'],expectedHash:values['expected-hash']})};
    if(mutation&&['commands','tags'].includes(group)&&!values['expected-hash'])usage('Indexed mutations require --expected-hash from the last list operation.');
    if(values.value!==undefined&&values.input!==undefined)usage('Choose --value or --input.');
    const raw=values.input?await readFile(resolve(values.input),'utf8'):values.value;
    let value;
    if(raw!==undefined){try{value=JSON.parse(raw);}catch{throw new CoreError('INVALID_JSON','Supply valid JSON.');}}
    if(['parameters','tags'].includes(group)&&operation==='set'&&raw===undefined)usage('set requires --value or --input.');
    const options={operation,dryRun:values['dry-run'],expectedHash:values['expected-hash'],value};
    if(group==='commands')return commandFileOperation(root,catalog,{...options,target:values.target,command:values.command,index:operation==='list'?undefined:integer(values.before??values.index),value:value??{}});
    if(group==='tags')return tagFileOperation(root,catalog,{...options,target:values.target,tag:values.tag,occurrence:values.occurrence===undefined?undefined:integer(values.occurrence)});
    const snapshot=await readSnapshot(join(root,'js/plugins.js'),root);
    if(values['expected-hash']!==undefined&&values['expected-hash']!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Read the parameters before retrying.',{fileHash:snapshot.hash},4);
    const change=configurationParameterOperation(snapshot.content.toString('utf8'),catalog,{operation,path:values.path,value});
    const result={file:'js/plugins.js',fileHash:snapshot.hash,...change.result};
    if(mutation)Object.assign(result,values['dry-run']?{written:false,dryRun:true,beforeHash:snapshot.hash,proposedHash:hash(change.source)}:{...await writeSnapshot(snapshot,change.source),written:true});
    return {operation:namespace+' parameters '+operation,result};
}
