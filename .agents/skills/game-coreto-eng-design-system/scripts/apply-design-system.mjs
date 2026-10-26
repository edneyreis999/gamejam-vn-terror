import {readFile, writeFile, mkdir, copyFile, access, rm, lstat} from 'node:fs/promises';
import {join, resolve, dirname} from 'node:path';
import {parseArgs} from 'node:util';
import {loadPreset, pluginId, skillRoot, coretoRoot, coretoModules, invoke, hash, errorResult} from './shared.mjs';
import {recipe, backgroundRecipe} from './recipes.mjs';

const ids={core:'Coreto_0_CoreEngine',message:'Coreto_1_MessageCore',options:'Coreto_1_OptionsCore',save:'Coreto_1_SaveCore','ext-message':'Coreto_2_ExtMessageFunc','design-system':pluginId};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

async function main() {
  const {values}=parseArgs({options:{project:{type:'string'},coreto:{type:'string'},profile:{type:'string',default:'coreto'},'dry-run':{type:'boolean'},backup:{type:'string'},restore:{type:'string'},json:{type:'boolean'},help:{type:'boolean'}}});
  if(values.help){console.log('Usage: node <skill>/scripts/apply-design-system.mjs --project <game> [--coreto <coreto>] [--profile coreto|dryland] [--dry-run] [--backup <new-directory>] [--restore <backup.json>] [--json]\nRequires installed enabled plugins; never installs plugins or writes their source. Restores only managed visual settings.');return;}
  if(!values.project)throw new Error('Supply --project <game>.');
  const project=resolve(values.project), root=await coretoRoot(project,values.coreto), cli=join(root,'tools/coreto/cli.mjs');
  const preset=await loadPreset(root);
  if(!preset.profiles[values.profile])throw new Error('Unknown profile. Choose coreto or dryland.');
  const {parsePluginsFile}=await coretoModules(root), registry=join(project,'js/plugins.js');
  const original=await readFile(registry), plugins=parsePluginsFile(original.toString('utf8')).plugins;
  let expectedHash=hash(original);
  const command=(ns,group,op,extra=[])=>invoke(cli,[ns,'--project',project,group,...(op?[op]:[]),...extra]);
  const get=(ns,path)=>command(ns,'parameters','get',['--path',path]);
  const set=(ns,path,value,dryRun=false)=>command(ns,'parameters','set',['--path',path,'--value='+JSON.stringify(value),...(['options','save','design-system'].includes(ns)?['--expected-hash',hashCache]:[]),...(dryRun?['--dry-run']:[])]);
  let hashCache=expectedHash;
  const assertUnchanged=async()=>{
    hashCache=hash(await readFile(registry));
    if(hashCache!==expectedHash)throw new Error('Registry changed during preset application. Inspect the backup before retrying.');
  };
  // Check every dependency before invoking any mutation, including asset copies.
  let previous=-1;
  for(const id of Object.values(ids)){
    const matches=plugins.flatMap((p,i)=>p.name===id?[i]:[]);
    if(matches.length!==1||!plugins[matches[0]].status)throw new Error(`${id}: install and enable exactly one entry before applying the preset.`);
    if(matches[0]<=previous)throw new Error(`${id}: incorrect plugin order.`);
    previous=matches[0];
    await access(join(project,'js/plugins',id+'.js'));
  }
  command('design-system','validate');
  for(const asset of preset.assets){
    let target=project;
    for(const part of asset.destination.split('/')){
      target=join(target,part);
      try{if((await lstat(target)).isSymbolicLink())throw new Error(`Asset path is a symlink: ${target}`);}
      catch(error){if(error.code!=='ENOENT')throw error;}
    }
  }
  const operations=[],assets=[],skipped=[];
  const queue=async(namespace,path,value)=>{
    const before=get(namespace,path).value;
    if(!equal(before,value))operations.push({namespace,path,before,value});
  };
  let restore;
  if(values.restore){
    restore=JSON.parse(await readFile(resolve(values.restore),'utf8'));
    if(restore.schemaVersion!==1||restore.project!==project)throw new Error('Backup belongs to a different project or schema.');
    for(const op of [...restore.operations].reverse()){
      if(!Object.hasOwn(ids,op.namespace))throw new Error('Invalid namespace in backup.');
      const current=get(op.namespace,op.path).value;
      if(!equal(current,op.before)&&!equal(current,op.value))throw new Error(`Restore conflict: ${op.namespace} ${op.path} was edited after application.`);
      await queue(op.namespace,op.path,op.before);
    }
    for(const asset of restore.assets){
      if(!preset.assets.some(a=>a.destination===asset.destination)||!/^asset-\d+$/.test(asset.backup))throw new Error('Invalid asset destination in backup.');
      let current;
      try{current=hash(await readFile(join(project,asset.destination)));}catch(error){if(error.code!=='ENOENT')throw error;}
      if(current!==(asset.beforeHash??undefined)&&current!==(asset.afterHash??undefined))throw new Error(`Restore conflict: ${asset.destination} was edited after application.`);
      if(asset.existed&&hash(await readFile(join(dirname(resolve(values.restore)),asset.backup)))!==asset.beforeHash)throw new Error(`Backup checksum mismatch: ${asset.destination}`);
      assets.push({...asset,source:asset.existed?join(dirname(resolve(values.restore)),asset.backup):null,restoring:true});
    }
  }else{
    for(const setting of preset.settings){
      const descriptor=invoke(cli,[setting.namespace,'api','describe',setting.path]);
      const value=descriptor.type==='string'&&typeof setting.value!=='string'?String(setting.value):descriptor.type==='number'?Number(setting.value):setting.value;
      await queue(setting.namespace,setting.path,value);
    }
    const fonts=get('message','/CustomFonts').value;
    // Keep existing order when replacing already installed theme families.
    const mergedFonts=fonts.map(f=>preset.fonts.find(p=>p.FontFamily===f.FontFamily)||f);
    for(const f of preset.fonts)if(!fonts.some(p=>p.FontFamily===f.FontFamily))mergedFonts.push(f);
    await queue('message','/CustomFonts',mergedFonts);
    await queue('core','/Window/DrawItemBackgroundJS',backgroundRecipe(preset));
    const categories=get('options','/Categories').value;
    const supported=new Set(['textLocale','textEffects','bgmVolume','bgsVolume','meVolume','seVolume']);
    for(const [i,category]of categories.entries())for(const [j,row]of category.List.entries()){
      if(supported.has(row.Symbol))await queue('options',`/Categories/${i}/List/${j}/DrawJS`,await recipe('option',preset));
      else skipped.push(row.Symbol);
    }
    await queue('save','/SaveMenu/BoxContentsJS',await recipe('save-contents',preset));
    await queue('save','/SaveMenu/BoxFileDataJS',await recipe('save-file',preset));
    const ds=structuredClone(preset.defaults);
    const existing=get('design-system','/PictureRoles').value;
    const roles=preset.profiles[values.profile].PictureRoles;
    ds.PictureRoles=[...existing.filter(r=>!roles.some(p=>p.Image===r.Image)),...roles];
    await queue('design-system','/',ds);
    for(const asset of preset.assets){
      const source=join(skillRoot,'assets',asset.file),bytes=await readFile(source);
      if(hash(bytes)!==asset.sha256)throw new Error(`Bundled asset checksum mismatch: ${asset.file}`);
      let current;
      try{current=await readFile(join(project,asset.destination));}catch(error){if(error.code!=='ENOENT')throw error;}
      if(!current||hash(current)!==asset.sha256)assets.push({...asset,source,existed:!!current});
    }
  }
  for(const op of operations){await assertUnchanged();set(op.namespace,op.path,op.value,true);}
  await assertUnchanged();
  const summary={version:preset.version,profile:values.profile,dryRun:!!values['dry-run'],parameters:operations.map(({namespace,path})=>({namespace,path})),assets:assets.map(a=>a.destination),preservedCustomOptions:skipped};
  if(values['dry-run']||!operations.length&&!assets.length){console.log(JSON.stringify({ok:true,...summary,changed:!!(operations.length||assets.length),written:false},null,values.json?undefined:2));return;}
  const backup=resolve(values.backup||join(project,'.coreto-design-system-backups',new Date().toISOString().replace(/[:.]/g,'-')));
  await mkdir(dirname(backup),{recursive:true});
  await mkdir(backup,{recursive:false});
  const receipt={schemaVersion:1,project,version:preset.version,operations,assets:[],completed:[],status:'applying'};
  for(const [i,asset]of assets.entries()){
    let bytes;
    try{bytes=await readFile(join(project,asset.destination));}catch(error){if(error.code!=='ENOENT')throw error;}
    const item={destination:asset.destination,existed:!!bytes,backup:`asset-${i}`,beforeHash:bytes?hash(bytes):null,afterHash:asset.source?hash(await readFile(asset.source)):null};
    if(bytes)await writeFile(join(backup,item.backup),bytes);
    receipt.assets.push(item);
    if(asset.source)await access(asset.source);
  }
  const receiptFile=join(backup,'backup.json');
  const record=()=>writeFile(receiptFile,JSON.stringify(receipt,null,2)+'\n');
  await record();
  try{
    for(const op of operations){
      await assertUnchanged();set(op.namespace,op.path,op.value);
      expectedHash=hash(await readFile(registry));
      if(!equal(get(op.namespace,op.path).value,op.value))throw new Error(`Readback mismatch: ${op.namespace} ${op.path}`);
      receipt.completed.push(`${op.namespace}:${op.path}`);await record();
    }
    for(const asset of assets){
      const target=join(project,asset.destination);
      if(asset.source){await mkdir(dirname(target),{recursive:true});await copyFile(asset.source,target);}
      else await rm(target,{force:true});
      receipt.completed.push(asset.destination);await record();
    }
    receipt.status='complete';await record();
  }catch(error){receipt.status='failed';receipt.error=error.message;await record();throw new Error(`${error.message}\nRecovery: --restore ${receiptFile}`);}
  console.log(JSON.stringify({ok:true,...summary,changed:true,written:true,backup:receiptFile},null,values.json?undefined:2));
}
main().catch(errorResult);
