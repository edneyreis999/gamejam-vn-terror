import {configurationParameterOperation,effectiveConfiguration} from './configuration-authoring.mjs';

export function vnAuthoringCatalog(catalog) {
    function field(item) {
        const encoding=item.encoding;
        const schema={...item,availability:'supported'};
        if(encoding==='num')Object.assign(schema,{type:'number',encoding:'plain',default:Number(item.nativeDefault),emptyValue:0});
        else if(encoding==='arraynum'||encoding==='arrayeval'){
            const numeric=encoding==='arraynum';
            Object.assign(schema,{type:'array',coerceNativeNumbers:numeric,emptyValue:[],default:JSON.parse(item.nativeDefault).map(value=>numeric?Number(value):String(value)),items:{type:numeric?'number':'string',encoding:'plain',...(numeric?{}:{javascript:'script'})}});
        }else Object.assign(schema,{type:'string',encoding:encoding==='func'?'json':'plain',default:encoding==='func'?JSON.parse(item.nativeDefault):item.nativeDefault,...(encoding==='func'?{javascript:'body',emptyValue:''}:encoding==='eval'?{javascript:'script'}:{})});
        if(item.metadata?.type?.[0]?.startsWith('number')){
            const numeric=schema.type==='array'?schema.items:schema;
            numeric.min=Number(item.metadata.min?.[0]??0);
            if(item.metadata.max)numeric.max=Number(item.metadata.max[0]);
        }
        if(item.metadata?.type?.[0]==='select')schema.options=item.metadata.value??item.metadata.option;
        if(item.key==='AnimationID')schema.editorType='animation';
        if(['TargetX','TargetY','MoveX','MoveY','TargetScaleX','TargetScaleY'].includes(item.key))schema.javascript='script';
        return schema;
    }
    return {...catalog,namespace:'vn',commandAliases:[catalog.reference.pluginId],parameters:catalog.parameters.map(field),commands:catalog.commands.map(command=>({...command,availability:'supported',targets:['map','common-event','troop'],args:command.args.map(field)}))};
}
export function vnConfiguration(plugins,catalog) {
    const result=effectiveConfiguration(catalog,plugins);
    return {...result,index:plugins.indexOf(result.own),mode:result.configuredSource==='inherit'?'legacy-if-present':'own',source:result.effectiveSource,effective:result.rawParameters};
}
export function vnParameterOperation(source,catalog,options) {
    const alias=options.path==='/ConfigurationSource';
    return configurationParameterOperation(source,catalog,{...options,
        path:alias?'/CoretoConfigSource':options.path,
        value:(alias||options.path==='/CoretoConfigSource')&&options.value==='legacy-if-present'?'inherit':options.value});
}
