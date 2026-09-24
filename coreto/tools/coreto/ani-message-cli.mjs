import {installConfiguredPlugin} from './configuration-authoring.mjs';
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {CoreError,parameterAt} from '../../src/core-engine/parameters.mjs';
import {messageHelp} from '../../src/message-core/api-descriptors.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';
import {textFileOperation} from './texts.mjs';
import {aniAuthoringCatalog,aniFamilies,describeAniApi,aniParameterOperation,aniEffectOperation,validateAniConfiguration,inspectAniText} from './ani-message-authoring.mjs';

const operations={api:['list','describe'],install:[],parameters:['get','set','reset'],effects:['list','get','insert','update','remove','move'],text:['get','set','validate'],commands:['list']};
export function aniHelp(positionals){
    const [,group,operation,...rest]=positionals;
    if(group&&!operations[group]||operation&&!operations[group]?.includes(operation)||rest.length&&!(group==='api'&&operation==='describe'&&rest.length===1))throw new CoreError('INVALID_USAGE','Use ani-message --help.');
    return {...messageHelp(),usage:'node tools/coreto/cli.mjs ani-message <group> <operation> --project <jogo>',
        install:'ani-message install [--dry-run] [--json] configures an already delivered bundle and materializes own parameters.',
        discovery:'api list | api describe <id|name|path>',implemented:operations,
        commands:'commands list retorna []: Ani não possui comandos 357.',
        parameters:'parameters get|set|reset --path /Group/Field [--value <json>]',
        text:'text get|set|validate --target map:N/event:N/page:N|common-event:N|troop:N/page:N --index I [--value <json>]',
        language:undefined,tags:undefined,validate:undefined,
        configuration:'install materializa a fonte efetiva em own e ativa somente Ani. A primeira edição funcional em inherit materializa e edita em uma escrita.',
        limits:'effects list|get|insert|update|remove|move --family '+aniFamilies.join('|')+'; get/update/remove usam --index I; insert usa --index I e --value; move usa --from I --to J. Mutações de presets, incluindo parameters set/reset em /Family/índice, exigem --expected-hash <fileHash> obtido na leitura.',
        examples:['ani-message install --dry-run --json','ani-message effects list --family AngleEffects --json','ani-message effects update --family AngleEffects --index 0 --expected-hash <hash> --value \'{"Name":"Balanço"}\'','ani-message parameters set --path /Options/Name --value \'"Efeitos do texto"\''],
        writing:'Toda escrita aceita --dry-run; --expected-hash também é opcional nas demais mutações. Reabra o projeto no editor após a CLI. Scripts são validados sem execução.',
        compatibility:'inherit usa todo o legado, mesmo desativado; own usa o próprio. Trocar o seletor não copia. Nomes podem repetir; renomear/remover não procura nem altera referências nos textos.'};
}
function usage(message){throw new CoreError('INVALID_USAGE',message);}
function integer(value,field){
    if(!/^(0|[1-9]\d*)$/.test(value??''))usage('Use a zero-based integer for --'+field+'.');
    const number=Number(value);if(!Number.isSafeInteger(number))usage('Index exceeds the safe integer range.');return number;
}
function expected(snapshot,value,required=false){
    if(value===undefined){if(required)usage('Preset mutations require --expected-hash from effects list/get or parameters get.');return;}
    if(!/^[a-f0-9]{64}$/.test(value))usage('--expected-hash requires a SHA-256 hex digest.');
    if(snapshot.hash!==value)throw new CoreError('FILE_CONFLICT','The file changed since the selected item was read; read it again.',{expectedHash:value,fileHash:snapshot.hash},4);
}
export async function executeAniCli(positionals,values,locateProject){
    const [,group,operation,id,...rest]=positionals;
    if(!operations[group]||(group==='install'?operation!==undefined:!operations[group].includes(operation)))usage('Use ani-message --help to list operations.');
    if(rest.length||id&&!(group==='api'&&operation==='describe'))usage('Unexpected positional argument.');
    const allowed=['project','json','help'];
    if(group==='parameters')allowed.push('path',...(operation==='set'?['value','input']:[]));
    if(group==='effects')allowed.push('family',...(operation==='move'?['from','to']:operation==='list'?[]:['index']),...(['insert','update'].includes(operation)?['value','input']:[]));
    if(group==='text')allowed.push('target','index','path',...(operation==='set'?['value','input']:[]));
    const mutation=group==='install'||group==='parameters'&&operation!=='get'||group==='effects'&&!['get','list'].includes(operation)||group==='text'&&operation==='set';
    if(mutation)allowed.push('dry-run','expected-hash');
    for(const [key,value]of Object.entries(values))if(value!==false&&!allowed.includes(key))usage('Unsupported --'+key+' for this Ani operation.');
    if(group==='api'){
        if((operation==='describe')!==Boolean(id))usage('Use api list or api describe <id|name|path>.');
        const entries=describeAniApi();
        if(operation==='list')return {operation:'ani-message api list',result:entries};
        const exact=entries.find(entry=>entry.id===id),matches=exact?[exact]:entries.filter(entry=>entry.key===id||entry.title===id||entry.aliases?.includes(id)||entry.usages?.some(usage=>usage.path===id));
        if(matches.length>1)throw new CoreError('AMBIGUOUS_API_ENTRY','Use an exact ANI ID.',{candidates:matches.map(entry=>entry.id)},4);
        if(!matches.length)throw new CoreError('TARGET_NOT_FOUND','Unknown Ani entry: '+id,{},3);
        return {operation:'ani-message api describe',result:matches[0]};
    }
    if(group==='commands')return {operation:'ani-message commands list',result:{commands:[],reason:'Ani has no plugin commands (357); use parameters, effects or native Show Text.'}};
    const root=await locateProject(values.project);
    if(group==='install')return {operation:'ani-message install',result:await installConfiguredPlugin(root,aniAuthoringCatalog,{dryRun:values['dry-run'],expectedHash:values['expected-hash'],validate:(_,raw)=>validateAniConfiguration(raw)})};
    if(values.value!==undefined&&values.input!==undefined)usage('Choose --value or --input.');
    const raw=values.input?await readFile(resolve(values.input),'utf8'):values.value;
    const needsValue=group==='parameters'&&operation==='set'||group==='text'&&operation==='set'||group==='effects'&&['insert','update'].includes(operation);
    if(needsValue&&raw===undefined)usage('This operation requires --value <json> or --input <file>.');
    let value;
    if(raw!==undefined){try{value=JSON.parse(raw);}catch{throw new CoreError('INVALID_JSON','Supply valid JSON for the authored value.');}}
    if(group==='text')return textFileOperation(root,{operation,target:values.target,index:integer(values.index,'index'),path:values.path,value,dryRun:values['dry-run'],namespace:'ani-message',acceptedType:'message-text',inspect:inspectAniText,expectedHash:values['expected-hash']});
    const snapshot=await readSnapshot(join(root,'js/plugins.js'),root);
    const parameterSelection=group==='parameters'&&mutation?parameterAt(aniAuthoringCatalog.parameters,values.path):null;
    const indexedPreset=parameterSelection?.chain[0].type==='array'&&parameterSelection.chain.length>1;
    expected(snapshot,values['expected-hash'],mutation&&(group==='effects'||indexedPreset));
    const source=snapshot.content.toString('utf8');
    const change=group==='parameters'?aniParameterOperation(source,{operation,path:values.path,value}):aniEffectOperation(source,{operation,family:values.family,index:operation==='list'?undefined:integer(operation==='move'?values.from:values.index,operation==='move'?'from':'index'),to:operation==='move'?integer(values.to,'to'):undefined,value});
    const result={file:'js/plugins.js',fileHash:snapshot.hash,...change.result};
    if(mutation)Object.assign(result,values['dry-run']?{dryRun:true,written:false,beforeHash:snapshot.hash,proposedHash:hash(change.source)}:{...await writeSnapshot(snapshot,change.source),written:true});
    return {operation:'ani-message '+group+(operation?' '+operation:''),result};
}
