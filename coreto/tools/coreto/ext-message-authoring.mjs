import {publicDescriptor, validatePublicEntries, validateOperationalCatalog} from '../../src/shared/public-api.mjs';
import {configurationParameterOperation} from './configuration-authoring.mjs';
import catalog from '../../src/ext-message-func/public-api.json' with {type:'json'};
import {describeCoreApi} from '../../src/core-engine/api-descriptors.mjs';
import {extendedAuthoringSchema} from '../../src/ext-message-func/authoring-catalog.mjs';

export const extendedAuthoringCatalog=extendedAuthoringSchema(catalog);

export function describeExtendedApi(){
    validateOperationalCatalog(catalog);
    const schemas=new Map(describeCoreApi(extendedAuthoringCatalog).map(entry=>[entry.id,entry]));
    const entries=catalog.entries.map(reference=>{
        const schema=schemas.get(reference.id);
        return {...reference,...schema,plugin:catalog.pluginId,version:catalog.version,
            authoring:schema?'cli-editor':reference.surface==='text-grammar'?'show-text':'runtime',
            examples:schema?.examples.map(example=>typeof example==='string'?example.replaceAll('core ', 'ext-message '):example)??reference.examples};
    });
    const selector=schemas.get('EXT-CONFIG-SOURCE');
    return validatePublicEntries('ext-message', [...entries,{...selector,plugin:catalog.pluginId,availability:'supported',examples:selector.examples.map(example=>example.replaceAll('core ','ext-message '))}].map(entry=>publicDescriptor(entry, 'ext-message')));
}

export function extendedParameterOperation(source,options){
    return configurationParameterOperation(source,extendedAuthoringCatalog,options);
}

export function inspectExtendedText(text){
    let remaining=text;const tags=[];
    for(const entry of catalog.entries.filter(entry=>entry.surface==='text-grammar')){
        const last=entry.title.lastIndexOf('/');const regex=new RegExp(entry.title.slice(1,last),entry.title.slice(last+1));
        remaining=remaining.replace(regex,(match,...args)=>{tags.push({id:entry.id,text:match,...(entry.id==='EXT-RX-001'?{}:{positionX:Number(args[0])})});return entry.id==='EXT-RX-001'?'<HIDEBUTTONCONSOLE>':'';});
        if(entry.id==='EXT-RX-001')remaining=remaining.replace('<HIDEBUTTONCONSOLE>','');
    }
    return {tags,literalText:remaining,authority:'Original regex pass order; DL belongs to bottom-left; DR and malformed tags remain literal. Variables resolve only in runtime.'};
}
