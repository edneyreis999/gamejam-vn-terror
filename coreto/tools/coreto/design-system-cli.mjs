import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import catalog from '../../src/design-system/public-api.json' with {type:'json'};
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';
import {parsePluginsFile,replacePlugin,insertPlugin} from './plugins-file.mjs';
import {readPluginMetadata} from '../project.mjs';

const pluginId=catalog.pluginId;
const defaults=Object.fromEntries(catalog.parameters.map(field=>[field.key,field.default]));
function decode(value){
    if(typeof value==='string'){try{return decode(JSON.parse(value));}catch{return value;}}
    if(Array.isArray(value))return value.map(decode);
    if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decode(v)]));
    return value;
}
function encode(value){
    if(Array.isArray(value))return JSON.stringify(value.map(encode));
    if(value&&typeof value==='object')return JSON.stringify(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,encode(v)])));
    return String(value);
}
function merge(base,values){
    const result=structuredClone(base);
    for(const [key,value]of Object.entries(values))result[key]=value&&typeof value==='object'&&!Array.isArray(value)&&base[key]?merge(base[key],value):value;
    return result;
}
function select(path) {
  if (!path?.startsWith('/') || path.includes('//')) throw new Error('Supply --path /Group/Field (or / for all parameters).');
  const parts = path === '/' ? [] : path.slice(1).split('/');
  let value = defaults;
  for (const part of parts) {
    if (!value || !Object.hasOwn(value,part)) throw new Error(`Unknown parameter: ${path}`);
    value = value[part];
  }
  return {parts, value};
}

function validate(value, baseline, path) {
  if (Array.isArray(baseline)) {
    if (!Array.isArray(value)) throw new Error(`${path}: expected array.`);
    const images = new Set();
    for (const role of value) {
      if (!role || Object.keys(role).sort().join(',') !== 'Image,Role' ||
          typeof role.Image!=='string' || !/^[\w -]+$/.test(role.Image) || !['secondary','primary','card','panel'].includes(role.Role) || images.has(role.Image)) {
        throw new Error(`${path}: expected unique {Image: filename without extension, Role: secondary|primary|card|panel} entries.`);
      }
      images.add(role.Image);
    }
  } else if (baseline && typeof baseline === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${path}: expected object.`);
    for (const [key, child] of Object.entries(value)) {
      if (!Object.hasOwn(baseline,key)) throw new Error(`${path}/${key}: unknown field.`);
      validate(child,baseline[key],`${path}/${key}`);
    }
  } else {
    if (typeof value !== typeof baseline) throw new Error(`${path}: expected ${typeof baseline}.`);
    if (typeof value === 'number' && (!Number.isFinite(value) || value < 0 || value > 4096)) throw new Error(`${path}: expected finite number from 0 to 4096.`);
    if (path === '/Choice/MaxWidth' && value < 80) throw new Error(`${path}: minimum 80.`);
    if (path === '/Controls/ValueRatio' && (value <= 0 || value >= 100)) throw new Error(`${path}: must be between 0 and 100, exclusive.`);
    if (path.endsWith('/ContinuePlacement') && !['corner','provider'].includes(value)) throw new Error(`${path}: expected corner or provider.`);
    if (path.startsWith('/Icons/') && !/^[\w -]+$/.test(value)) throw new Error(`${path}: expected a system image basename.`);
    if (path.startsWith('/Surfaces/') && !/^#[\da-f]{6}$/i.test(value)) throw new Error(`${path}: expected #RRGGBB.`);
  }
}

function describe(path) {
  const {parts,value}=select(path);
  let schema={key:'/',label:'All DesignSystem parameters',description:'Complete DesignSystem configuration. Select a published child path to inspect its purpose, units and conditions; object writes merge named fields, while arrays replace the selected array.',type:'struct',fields:catalog.parameters};
  for(const part of parts)schema=schema.fields.find(field=>field.key===part);
  return {...schema,id:path,default:value,plugin:pluginId,surface:'parameter',availability:'supported',usages:[{surface:'parameter',path}],
    context:'Stored in js/plugins.js for Coreto_5_DesignSystem 1.3.0 and read at boot. Missing fields use the published defaults. Object writes merge named fields; arrays replace the array; reset restores the complete selected default. CLI numeric authoring accepts finite numbers from 0 to 4096, including fractions, even where editor metadata specifies a different minimum; /Choice/MaxWidth requires at least 80 and /Controls/ValueRatio is strictly between 0 and 100. Enable Coreto_0_CoreEngine, Coreto_1_MessageCore and Coreto_2_ExtMessageFunc first, then design-system install. Keep DesignSystem after active providers listed by the catalog. Fonts and images are prepared through skills describe game-coreto-eng-design-system; the full preset also needs OptionsCore and SaveCore. Restart after changing parameters; scene changes and save/load do not reload them. Provider callbacks keep their authored snapshot; changing a token does not rewrite those callbacks.',
    writing:`Use --project pointing to the MZ game. Read design-system parameters get --path ${path} for the current value and fileHash; set accepts --value JSON or --input FILE and optional --expected-hash. The CLI authors configuration without executing gameplay or drawing callbacks.`,
    examples:[`design-system parameters get --path ${path} --json`,`design-system parameters set --path ${path} --value '${JSON.stringify(value).replaceAll("'", "'\\''")}' --dry-run --json`]};
}

export function designSystemHelp(){
    return {usage:'node tools/coreto/cli.mjs design-system api list|describe <id|path> | install | parameters get|set|reset --path /Group/Field | validate',
        implemented:['api list','api describe','install','parameters get','parameters set','parameters reset','validate'],
        writing:'install enables only DesignSystem after its active dependencies. Parameters merge objects; reset restores selected defaults. --dry-run previews; --expected-hash guards the registry. Restart the game afterwards.',
        preset:'skills describe game-coreto-eng-design-system installs no plugins; its applicator supplies the full visual preset and assets.',version:catalog.version};
}
export async function executeDesignSystemCli(positionals,values,locateProject){
    const [,group,operation,id,...rest]=positionals;
    const mutation=group==='install'||group==='parameters'&&operation!=='get';
    const allowed=['project','json','help',...(mutation?['dry-run','expected-hash']:[]),...(group==='parameters'?['path',...(operation==='set'?['value','input']:[])]:[])];
    if(rest.length||Object.entries(values).some(([k,v])=>v!==false&&!allowed.includes(k)))throw new CoreError('INVALID_USAGE','Use design-system --help.');
    if(group==='api'){
        if(!['list','describe'].includes(operation)||(operation==='describe')!==Boolean(id))throw new CoreError('INVALID_USAGE','Use design-system api list|describe <id|path>.');
        const entries=['/',...Object.keys(defaults).map(k=>'/'+k),...Object.entries(defaults).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).map(n=>`/${k}/${n}`):[])].map(describe);
        entries.push(...[...catalog.methods,...catalog.apis].map(entry=>({...entry,plugin:pluginId})));
        const result=id?entries.find(entry=>entry.id===id||entry.key===id):entries;
        if(!result)throw new CoreError('TARGET_NOT_FOUND','Unknown DesignSystem API: '+id,{},3);
        return {operation:'design-system api '+operation,result};
    }
    if(id||!(group==='install'&&!operation||group==='validate'&&!operation||group==='parameters'&&['get','set','reset'].includes(operation)))throw new CoreError('INVALID_USAGE','Use design-system --help.');
    const project=await locateProject(values.project),snapshot=await readSnapshot(join(project,'js/plugins.js'),project);
    const parsed=parsePluginsFile(snapshot.content.toString('utf8'));
    const matches=parsed.plugins.flatMap((p,i)=>p.name===pluginId?[i]:[]);
    if(matches.length>1)throw new CoreError('DUPLICATE_PLUGIN','Use exactly one '+pluginId+' entry.');
    if(values['expected-hash']&&values['expected-hash']!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Registry changed since the previous read.',{},4);
    const source=await readFile(join(project,'js/plugins',pluginId+'.js'),'utf8');
    if(!source.includes('Design System '+catalog.version))throw new CoreError('PLUGIN_VERSION','Install DesignSystem '+catalog.version+' before authoring.');
    let index=matches[0],entry=index===undefined?{name:pluginId,status:true,...readPluginMetadata(source)}:structuredClone(parsed.plugins[index]);
    if(group==='install'||group==='validate'){
        for(const dependency of catalog.dependencies.required){
            const active=parsed.plugins.filter(p=>p.name===dependency&&p.status);
            if(active.length!==1)throw new CoreError('MISSING_DEPENDENCY','Enable exactly one '+dependency+' first.',{},3);
            await readFile(join(project,'js/plugins',dependency+'.js'));
        }
        if(index!==undefined&&parsed.plugins.some((p,i)=>p.status&&catalog.orderAfter.includes(p.name)&&i>index))throw new CoreError('PLUGIN_ORDER','Place DesignSystem after its providers before continuing.');
    }
    if(group==='install'){
        entry.status=true;
        const content=index===undefined?insertPlugin(parsed,parsed.plugins.length,entry):replacePlugin(parsed,index,entry);
        const changed=index===undefined||JSON.stringify(entry)!==JSON.stringify(parsed.plugins[index]);
        const result={plugin:pluginId,changed,written:false,beforeHash:snapshot.hash,proposedHash:hash(changed?content:snapshot.content)};
        if(changed&&!values['dry-run'])Object.assign(result,await writeSnapshot(snapshot,content),{written:true});
        return {operation:'design-system install',result};
    }
    if(index===undefined||!entry.status)throw new CoreError('PLUGIN_NOT_ENABLED','Use design-system install first.',{},3);
    const authored=Object.fromEntries(Object.keys(defaults).filter(k=>Object.hasOwn(entry.parameters,k)).map(k=>[k,decode(entry.parameters[k])]));
    try{validate(authored,defaults,'');}catch(error){throw new CoreError('INVALID_VALUE',error.message);}
    const current=merge(defaults,authored);
    if(group==='validate')return {operation:'design-system validate',result:{valid:true,version:catalog.version,fileHash:snapshot.hash,diagnostics:[]}};
    let selected;
    try{selected=select(values.path);}catch(error){throw new CoreError('INVALID_VALUE',error.message);}
    const {parts,value:baseline}=selected,get=obj=>parts.reduce((v,k)=>v[k],obj);
    if(operation==='get')return {operation:'design-system parameters get',result:{path:values.path,value:get(current),fileHash:snapshot.hash}};
    if(values.value!==undefined&&values.input!==undefined)throw new CoreError('INVALID_USAGE','Choose --value or --input.');
    const raw=values.input?await readFile(resolve(values.input),'utf8'):values.value;
    if(operation==='set'&&raw===undefined)throw new CoreError('INVALID_USAGE','Supply --value JSON or --input FILE.');
    let next;
    try{next=operation==='reset'?structuredClone(baseline):JSON.parse(raw);validate(next,baseline,values.path==='/'?'':values.path);}
    catch(error){throw new CoreError('INVALID_VALUE',error.message);}
    if(operation==='set'&&baseline&&typeof baseline==='object'&&!Array.isArray(baseline))next=merge(get(current),next);
    const updated=structuredClone(current);
    if(!parts.length)Object.assign(updated,next);
    else parts.slice(0,-1).reduce((v,k)=>v[k],updated)[parts.at(-1)]=next;
    for(const key of parts.length?[parts[0]]:Object.keys(defaults))entry.parameters[key]=encode(updated[key]);
    const changed=JSON.stringify(entry)!==JSON.stringify(parsed.plugins[index]);
    const content=changed?replacePlugin(parsed,index,entry):snapshot.content.toString('utf8');
    const result={path:values.path,before:get(current),value:get(updated),changed,written:false,beforeHash:snapshot.hash,proposedHash:hash(content)};
    if(changed&&!values['dry-run'])Object.assign(result,await writeSnapshot(snapshot,content),{written:true});
    return {operation:'design-system parameters '+operation,result};
}
