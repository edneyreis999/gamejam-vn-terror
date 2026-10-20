import {readFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {parseArgs} from 'node:util';
import {coretoRoot, coretoModules, decode, encode, merge, preset, pluginId, errorResult} from './shared.mjs';

function select(path) {
  if (!path?.startsWith('/') || path.includes('//')) throw new Error('Supply --path /Group/Field (or / for all parameters).');
  const parts = path === '/' ? [] : path.slice(1).split('/');
  let value = preset.defaults;
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
          !/^[\w -]+$/.test(role.Image) || !['secondary','primary','card','panel'].includes(role.Role) || images.has(role.Image)) {
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
  const {value} = select(path);
  return {id:path,path,type:Array.isArray(value)?'array':typeof value,default:value,plugin:pluginId,
    context:'Persisted RPG Maker MZ parameter. Restart the game after changing it. Object writes merge named fields; reset restores the complete selected default.'};
}

async function main() {
  const {values,positionals:[group,operation,id,...rest]} = parseArgs({allowPositionals:true,options:{
    project:{type:'string'},coreto:{type:'string'},path:{type:'string'},value:{type:'string'},input:{type:'string'},
    'expected-hash':{type:'string'},'dry-run':{type:'boolean'},json:{type:'boolean'},help:{type:'boolean'}
  }});
  let result;
  if (values.help) result={usage:'node <skill>/scripts/design-system-cli.mjs --project <game> [--coreto <coreto>] api list|describe /Path | parameters get|set|reset --path /Path [--value JSON|--input FILE] | validate',
    writing:'Only parameters in the existing enabled Coreto_5_DesignSystem entry are writable. --dry-run previews; --expected-hash rejects stale writes. No install or activation.',version:preset.version};
  else if (group === 'api' && !rest.length && ['list','describe'].includes(operation)) {
    if (operation === 'describe') result=describe(id);
    else result=['/',...Object.keys(preset.defaults).map(k=>'/'+k),...Object.entries(preset.defaults).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?Object.keys(v).map(n=>`/${k}/${n}`):[])].map(describe);
  } else {
    if (!values.project || rest.length || id || !(group === 'validate' && !operation || group === 'parameters' && ['get','set','reset'].includes(operation))) throw new Error('Invalid invocation; use --help.');
    const project=resolve(values.project), root=await coretoRoot(project,values.coreto);
    if (!(await readFile(join(project,'game.rmmzproject'),'utf8')).startsWith('RPGMZ ')) throw new Error('Expected an RPG Maker MZ project.');
    const {readSnapshot,writeSnapshot,parsePluginsFile,replacePlugin,hash}=await coretoModules(root);
    const snapshot=await readSnapshot(join(project,'js/plugins.js'),project), parsed=parsePluginsFile(snapshot.content.toString('utf8'));
    const matches=parsed.plugins.flatMap((p,i)=>p.name===pluginId?[i]:[]);
    if (matches.length!==1 || !parsed.plugins[matches[0]].status) throw new Error(`${pluginId}: install and enable exactly one entry first.`);
    const source=await readFile(join(project,'js/plugins',pluginId+'.js'),'utf8');
    if (!source.includes(`Design System ${preset.version}`)) throw new Error(`Expected ${pluginId} ${preset.version}; install the matching plugin first.`);
    const index=matches[0], entry=structuredClone(parsed.plugins[index]);
    const authored=Object.fromEntries(Object.keys(preset.defaults).filter(k=>Object.hasOwn(entry.parameters,k)).map(k=>[k,decode(entry.parameters[k])]));
    validate(authored,preset.defaults,'');
    const current=merge(preset.defaults,authored);
    if (values['expected-hash'] && values['expected-hash']!==snapshot.hash) throw Object.assign(new Error('Registry changed since the previous read.'),{code:'FILE_CONFLICT',exitCode:4});
    if (group === 'validate') result={valid:true,version:preset.version,fileHash:snapshot.hash};
    else {
      const {parts,value:baseline}=select(values.path);
      const get=obj=>parts.reduce((v,k)=>v[k],obj);
      if (operation==='get') result={path:values.path,value:get(current),fileHash:snapshot.hash};
      else {
        if (values.value!==undefined && values.input!==undefined) throw new Error('Choose --value or --input.');
        const raw=values.input?await readFile(resolve(values.input),'utf8'):values.value;
        if (operation==='set' && raw===undefined) throw new Error('Supply --value JSON or --input FILE.');
        let next=operation==='reset'?structuredClone(baseline):JSON.parse(raw);
        validate(next,baseline,values.path==='/'?'':values.path);
        if (operation==='set' && baseline && typeof baseline==='object' && !Array.isArray(baseline)) next=merge(get(current),next);
        const updated=structuredClone(current);
        if (!parts.length) Object.assign(updated,next);
        else {
          const parent=parts.slice(0,-1).reduce((v,k)=>v[k],updated);
          parent[parts.at(-1)]=next;
        }
        for (const key of parts.length?[parts[0]]:Object.keys(preset.defaults)) {
          const v=updated[key];
          entry.parameters[key]=encode(v);
        }
        const changed=JSON.stringify(entry)!==JSON.stringify(parsed.plugins[index]);
        const content=changed?replacePlugin(parsed,index,entry):snapshot.content.toString('utf8');
        result={path:values.path,before:get(current),value:get(updated),changed,written:false,beforeHash:snapshot.hash,proposedHash:hash(content)};
        if (changed && !values['dry-run']) Object.assign(result,await writeSnapshot(snapshot,content),{written:true});
      }
    }
  }
  const envelope={schemaVersion:1,ok:true,operation:['design-system',group,operation].filter(Boolean).join(' '),result};
  console.log(JSON.stringify(envelope,null,values.json?undefined:2));
}
main().catch(errorResult);
