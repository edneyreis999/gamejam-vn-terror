import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {CoreError,parameterAt} from '../../src/core-engine/parameters.mjs';
import {optionsSaveCatalogs,describeOptionsSave,optionsSaveParameterOperation,optionsSaveListOperation,validateOptionsSaveAuthoring} from './options-save-authoring.mjs';
import {installConfiguredPlugin} from './configuration-authoring.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';
import {commandFileOperation} from './commands.mjs';
import {tagFileOperation} from './tags.mjs';
const operations={api:['list','describe'],install:[],parameters:['get','set','reset'],lists:['list','get','insert','update','remove','move'],commands:['list','get','insert','update','remove'],tags:['list','set','remove','validate']};
function usage(message){throw new CoreError('INVALID_USAGE',message);}
function integer(value,name){if(!/^(0|[1-9]\d*)$/.test(value??'')||!Number.isSafeInteger(Number(value)))usage('Use a zero-based integer for --'+name+'.');return Number(value);}
export function optionsSaveHelp(positionals){
    const [namespace,group,operation,id,...rest]=positionals;
    if(group&&!operations[group]||operation&&!operations[group]?.includes(operation)||rest.length||id&&!(group==='api'&&operation==='describe'))usage('Use '+namespace+' --help.');
    return {usage:`node tools/coreto/cli.mjs ${namespace} <group> <operation> --project <jogo>`,implemented:{...operations,...(namespace==='options'?{tags:[],commands:['list']}:{lists:[]})},
        discovery:'api list | api describe <id|key|path>; JSON mostra defaults, encoding e dependências.',
        configuration:'inherit lê a entrada original, mesmo desativada. install materializa own e ativa somente o par escolhido. Primeira edição funcional materializa e edita em uma escrita. Trocar/resetar CoretoConfigSource não copia valores.',
        parameters:'parameters get|set|reset --path /Group/Field [--value <json> | --input <file>]',
        lists:'options lists list|get|insert|update|remove|move --path /Categories|/Categories/N/List|/ControllerButtons; get/insert/update/remove usam --index, move usa --from e --to. Toda mutação de lista ou campo indexado exige --expected-hash da leitura.',
        commands:'save commands list|get|insert|update|remove --target map:N/event:N/page:N|common-event:N|troop:N/page:N [--command ID] [--before I|--index I] [--value <json>]. Options não possui comandos357.',
        tags:'save tags list|set|remove|validate --target system:switch:N|system:variable:N [--tag global] [--value \'"<Global>"\']. Rejeita Global com JS/Self; preserva os demais marcadores.',
        writing:'--dry-run calcula sem escrever; --expected-hash rejeita seleção antiga. Escrita atômica por arquivo com recibo de releitura. Reabra o projeto no editor. Scripts são validados sem execução; HelpVocab é texto JSON.',
        limits:'Save em disco NW.js e plugins externos ausentes não são qualificados pelo browser. Autoria não executa comandos de save nem altera saves do jogador.',
        examples:[`${namespace} install --dry-run --json`,`${namespace} parameters get --path /CoretoConfigSource --json`,namespace==='options'?'options lists list --path /Categories --json':'save commands insert --target common-event:1 --before 0 --command SaveDescription --value \'{"Text":"Capítulo 1"}\''],
        exitCodes:{0:'success',2:'invalid input',3:'missing target',4:'conflict or unconfirmed write',5:'IO failure',6:'unavailable capability'}};
}
export async function executeOptionsSaveCli(positionals,values,locateProject){
    const [namespace,group,operation,id,...rest]=positionals,catalog=optionsSaveCatalogs[namespace];
    if(!operations[group]||(group==='install'?operation!==undefined:!operations[group].includes(operation))||rest.length||id&&!(group==='api'&&operation==='describe'))usage('Use '+namespace+' --help.');
    if(namespace==='options'&&group==='tags'||namespace==='save'&&group==='lists')usage('This namespace has no '+group+'.');
    if(namespace==='options'&&group==='commands'&&operation!=='list')usage('Options has no commands357.');
    const mutation=group==='install'||group==='parameters'&&operation!=='get'||group==='lists'&&!['get','list'].includes(operation)||group==='commands'&&!['get','list'].includes(operation)||group==='tags'&&['set','remove'].includes(operation);
    const allowed=['project','json','help',...(mutation?['dry-run','expected-hash']:[])];
    if(group==='parameters')allowed.push('path',...(operation==='set'?['value','input']:[]));
    if(group==='lists')allowed.push('path',...(operation==='move'?['from','to']:operation==='list'?[]:['index']),...(['insert','update'].includes(operation)?['value','input']:[]));
    if(group==='commands')allowed.push('target',...(['get','update','remove'].includes(operation)?['index']:[]),...(operation==='insert'?['before']:[]),...(['insert','update','remove'].includes(operation)?['command']:[]),...(['insert','update'].includes(operation)?['value','input']:[]));
    if(group==='tags')allowed.push('target',...(['set','remove'].includes(operation)?['tag','occurrence']:[]),...(operation==='set'?['value','input']:[]));
    for(const [key,value]of Object.entries(values))if(value!==false&&!allowed.includes(key))usage('Unsupported --'+key+' for this operation.');
    if(group==='api'){
        if((operation==='describe')!==Boolean(id))usage('Use api list or api describe <id|key|path>.');
        const entries=describeOptionsSave(namespace);
        if(operation==='list')return {operation:namespace+' api list',result:entries};
        const exact=entries.find(entry=>entry.id===id),matches=exact?[exact]:entries.filter(entry=>entry.key===id||entry.usages?.some(usage=>usage.path===id));
        if(matches.length!==1)throw new CoreError(matches.length?'AMBIGUOUS_API_ENTRY':'TARGET_NOT_FOUND','Select an exact API ID.',{candidates:matches.map(entry=>entry.id)},matches.length?4:3);
        return {operation:namespace+' api describe',result:matches[0]};
    }
    if(namespace==='options'&&group==='commands')return {operation:'options commands list',result:{commands:[],reason:'Options has no commands357; use parameters and lists.'}};
    const root=await locateProject(values.project);
    if(group==='install')return {operation:namespace+' install',result:await installConfiguredPlugin(root,catalog,{dryRun:values['dry-run'],expectedHash:values['expected-hash'],validate:validateOptionsSaveAuthoring})};
    if(values.value!==undefined&&values.input!==undefined)usage('Choose --value or --input.');
    const raw=values.input?await readFile(resolve(values.input),'utf8'):values.value;
    const needsValue=group==='parameters'&&operation==='set'||group==='lists'&&['insert','update'].includes(operation);
    if(needsValue&&raw===undefined)usage('Supply --value <json> or --input <file>.');
    let value;if(raw!==undefined){try{value=JSON.parse(raw);}catch{throw new CoreError('INVALID_JSON','Supply valid JSON.');}}
    if(group==='commands'){
        if(['insert','update','remove'].includes(operation)&&!values.command)usage('Select --command.');
        if(value&&typeof value==='object'&&!Array.isArray(value)){
            value={...value};
            for(const field of catalog.commands.find(command=>command.key===values.command)?.args??[])if(field.storageKey.endsWith(':eval')&&Object.hasOwn(value,field.key)&&['boolean','number'].includes(typeof value[field.key]))value[field.key]=String(value[field.key]);
        }
        const options={operation:operation==='get'?'list':operation,target:values.target,command:values.command,value,dryRun:values['dry-run'],expectedHash:values['expected-hash']};
        if(operation==='insert')options.index=integer(values.before,'before');
        if(['update','remove'].includes(operation))options.index=integer(values.index,'index');
        const result=await commandFileOperation(root,catalog,options);
        if(operation==='get'){
            const index=integer(values.index,'index'),command=result.result.units.find(command=>command.index===index&&command.editable);
            if(!command)throw new CoreError('TARGET_NOT_FOUND','No command at this index.',{},3);
            return {operation:'save commands get',target:values.target,result:{...result.result,units:[command]}};
        }
        return result;
    }
    if(group==='tags')return tagFileOperation(root,catalog,{operation:operation==='validate'?'list':operation,target:values.target,tag:values.tag??'global',value:value??'<Global>',occurrence:values.occurrence===undefined?undefined:integer(values.occurrence,'occurrence'),dryRun:values['dry-run'],expectedHash:values['expected-hash'],validateOnly:operation==='validate'});
    const snapshot=await readSnapshot(join(root,'js/plugins.js'),root);
    const selected=parameterAt(catalog.parameters,values.path);
    if(mutation&&(group==='lists'||selected.chain.some((field,index)=>field.type==='array'&&index<selected.chain.length-1))&&values['expected-hash']===undefined)usage('List mutations require --expected-hash from the last read.');
    if(values['expected-hash']!==undefined&&values['expected-hash']!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Read the registry before retrying.',{fileHash:snapshot.hash},4);
    const source=snapshot.content.toString('utf8');
    const change=group==='parameters'?optionsSaveParameterOperation(source,catalog,{operation,path:values.path,value}):optionsSaveListOperation(source,catalog,{operation,path:values.path,index:operation==='list'?undefined:integer(operation==='move'?values.from:values.index,operation==='move'?'from':'index'),to:operation==='move'?integer(values.to,'to'):undefined,value});
    const result={file:'js/plugins.js',fileHash:snapshot.hash,...change.result};
    if(mutation)Object.assign(result,values['dry-run']?{dryRun:true,written:false,beforeHash:snapshot.hash,proposedHash:hash(change.source)}:{...await writeSnapshot(snapshot,change.source),written:true});
    return {operation:namespace+' '+group+' '+operation,result};
}
