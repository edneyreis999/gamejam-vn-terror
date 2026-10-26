import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {tooltipAuthoringCatalog} from '../../src/message-core/tooltip-authoring.mjs';
import {parameterOperation} from './parameters.mjs';
import {tagFileOperation} from './tags.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';

export function stateTooltipsHelp() {
    return {
        usage:'message tooltips parameters get|set|reset --path /Tooltip/WindowOpacity [--value <JSON>] | tags list|set|remove --target states:ID [--tag TIP-RX-001|TIP-RX-002|TIP-RX-003 --value <JSON> --expected-hash HASH]',
        discovery:'Use message api list and message api describe TIP-M-015 (parameters) or TIP-RX-002 (state notes).',
        parameters:'Existing VisuMZ_3_StateTooltips registry entry only. Paths use /Tooltip, /Vocab or /Window and the native field name without its :type suffix. get returns decoded values and fileHash; set/reset preserve other fields, entries, activation and order. Optional --expected-hash rejects stale reads. Missing optional fields use documented defaults.',
        tags:'Full native tag strings as JSON, in existing States notes only. list returns fileHash and occurrences. set/remove require --expected-hash; repeated matches require --occurrence. No state application or removal occurs while authoring.',
        writing:'--dry-run previews writes. Registry and database changes are offline; reload the editor and restart the game. Does not install, enable, replace or modify any plugin bundle. Optional integrations retain their runtime dependencies.',
        examples:['message tooltips parameters get --path /Tooltip/WindowOpacity --json','message tooltips parameters set --path /Tooltip/WindowOpacity --value 144 --dry-run --json','message tooltips tags list --target states:31 --json',`message tooltips tags set --target states:31 --tag TIP-RX-002 --value '"<State Tooltip Description>Burns.</State Tooltip Description>"' --expected-hash HASH_FROM_LIST --json`]
    };
}

export async function executeStateTooltipsCli(positionals,values,locateProject) {
    const [, ,group,operation,...rest]=positionals;
    const operations={parameters:['get','set','reset'],tags:['list','set','remove']};
    const usage=()=>{throw new CoreError('INVALID_USAGE','Use message tooltips --help for parameters or state-note authoring.');};
    if(rest.length||!operations[group]?.includes(operation))usage();
    const writing=!['get','list'].includes(operation);
    const allowed=['project','json','help',...(writing?['dry-run','expected-hash']:[]),...(group==='parameters'?['path']:['target',...(writing?['tag','occurrence']:[])]),...(operation==='set'?['value']:[])];
    if(Object.keys(values).some(key=>values[key]!==false&&!allowed.includes(key)))usage();
    if(operation==='set'&&values.value===undefined)usage();
    let value;
    if(values.value!==undefined){try{value=JSON.parse(values.value);}catch{throw new CoreError('INVALID_JSON','Use a JSON value. Strings need JSON quotes.',{field:'value'});}}
    const root=await locateProject(values.project);
    const catalog=tooltipAuthoringCatalog(JSON.parse(await readFile(new URL('../../src/message-core/public-api.json',import.meta.url),'utf8')));
    if(group==='tags') {
        if(!/^states:[1-9]\d*$/.test(values.target||''))throw new CoreError('INVALID_TAG_TARGET','Use states:ID for StateTooltips notes.');
        if(writing&&(!values.tag||!values['expected-hash']))usage();
        if(values.occurrence!==undefined&&!/^(0|[1-9]\d*)$/.test(values.occurrence))usage();
        return tagFileOperation(root,catalog,{operation,target:values.target,tag:values.tag,value,
            occurrence:values.occurrence===undefined?undefined:Number(values.occurrence),expectedHash:values['expected-hash'],dryRun:values['dry-run']});
    }
    const snapshot=await readSnapshot(join(root,'js/plugins.js'),root);
    if(values['expected-hash']!==undefined&&values['expected-hash']!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Read the parameter before retrying.',{fileHash:snapshot.hash},4);
    const change=parameterOperation(snapshot.content.toString('utf8'),catalog,{operation,path:values.path,value});
    const result={file:'js/plugins.js',fileHash:snapshot.hash,...change.result};
    if(writing)Object.assign(result,values['dry-run']?{dryRun:true,written:false,beforeHash:snapshot.hash,proposedHash:hash(change.source)}:{...await writeSnapshot(snapshot,change.source),written:true});
    return {operation:'message tooltips parameters '+operation,target:values.path,result};
}
