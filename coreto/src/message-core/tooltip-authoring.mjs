import {decodeValue} from '../core-engine/parameters.mjs';

// The existing external-provider descriptors own both discovery and native storage.
export function tooltipAuthoringCatalog(message) {
    const entries=message.entries.filter(entry=>entry.plugin==='VisuMZ_3_StateTooltips');
    const parameters=entries.filter(entry=>entry.title.startsWith('plugin/')&&entry.surface==='parameter').map(entry=>{
        const storageKey=entry.title.slice(7),key=storageKey.split(':')[0];
        const fields=entries.filter(child=>child.title.startsWith('struct:'+key+'/')).map(child=>{
            const storageKey=child.title.split('/')[1],key=storageKey.split(':')[0],suffix=storageKey.split(':')[1];
            const type=suffix==='num'?'number':suffix==='eval'?'boolean':'string';
            const field={id:child.id,key,storageKey,type,description:child.description,availability:'supported',
                ...(suffix==='json'?{encoding:'json'}:{}),...(child.metadata.min?{min:Number(child.metadata.min[0])}:{}),
                ...(child.metadata.max?{max:Number(child.metadata.max[0])}:{}),context:child.context};
            field.default=decodeValue(field,child.metadata.default[0],'/'+key);
            return field;
        });
        return {id:entry.id,key,storageKey,type:'struct',fields,description:entry.description,availability:'supported',context:entry.context,
            default:decodeValue({type:'struct',fields},entry.metadata.default[0],'/'+key)};
    });
    const tags=entries.filter(entry=>['TIP-RX-001','TIP-RX-002','TIP-RX-003'].includes(entry.id)).map(entry=>({
        id:entry.id,key:entry.id,pattern:entry.title.slice(1,entry.title.lastIndexOf('/')),type:'string',targets:['states'],
        ...(entry.id!=='TIP-RX-003'?{encoding:'block'}:{}),availability:'supported',description:entry.description,context:entry.context,
        examples:entry.examples,writing:'message tooltips tags list --target states:ID returns fileHash; set/remove require --expected-hash. set takes a JSON string containing the complete native tag. Use --dry-run to preview; reload the editor afterwards.',occurrences:'Use one description block per kind. If multiple matches exist, choose the zero-based occurrence from tags list.'
    }));
    return {schemaVersion:1,pluginId:'VisuMZ_3_StateTooltips',namespace:'message tooltips',version:'1.10',parameters,tags,commands:[],methods:[]};
}
