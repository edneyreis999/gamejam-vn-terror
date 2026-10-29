const designRevision = 'parchment-ink-1.6.1';
import fs from 'node:fs';
import {loadProfile, configureProfile, registerProfile, addTranslations} from './profile.mjs';

import path from 'node:path';

import crypto from 'node:crypto';

import {execFileSync} from 'node:child_process';

import {fileURLToPath} from 'node:url';

import {schema,defaults,decode,validate,pluginId,version} from './schema.mjs';

export const packageRoot=fileURLToPath(new URL('../',import.meta.url));

export const sha=b=>crypto.createHash('sha256').update(b).digest('hex');

export function fail(message,code=2){throw Object.assign(Error(message),{exitCode:code});}

export function projectRoot(input){

  if(!input)fail('Informe --project <pasta do jogo>.');

  const root=fs.realpathSync(input);

  for(const f of ['game.rmmzproject','js/plugins.js','data/System.json'])if(!fs.existsSync(path.join(root,f)))fail('Projeto MZ inválido: '+f,3);

  return root;

}

export function registry(root){

  const file=path.join(root,'js/plugins.js'),source=fs.readFileSync(file,'utf8');

  const start=source.indexOf('['),end=source.lastIndexOf(']');

  const plugins=JSON.parse(source.slice(start,end+1));

  if(!Array.isArray(plugins))fail('Registry inválido');

  return {plugins,source,hash:sha(Buffer.from(source)),serialize:()=>source.slice(0,start)+JSON.stringify(plugins,null,/\n([ \t]+)\{/.exec(source)?.[1]||2)+source.slice(end+1)};

}

export const encode=value=>Array.isArray(value)?JSON.stringify(value.map(encode)):value&&typeof value==='object'?JSON.stringify(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,encode(v)]))):String(value);

export function pluginEntry(reg){const matches=reg.plugins.filter(p=>p.name===pluginId);if(matches.length!==1)fail('Esperada uma entrada '+pluginId,3);return matches[0];}

export function paramPath(input){

  const parts=String(input||'').split('/').filter(Boolean);let node={type:'struct',fields:schema};

  for(const key of parts){node=node.type==='array'&&/^\d+$/.test(key)?{type:'struct',fields:node.fields}:node.fields?.[key];if(!node)fail('Parâmetro próprio inexistente. Consulte api list para o proprietário: '+input);}

  if(!parts.length)fail('Informe --path /Grupo/Campo');return {parts,node};

}

function mergeDefaults(base,provided){if(Array.isArray(base))return provided??base;return Object.fromEntries([...new Set([...Object.keys(base),...Object.keys(provided||{})])].map(k=>[k,base[k]&&typeof base[k]==='object'?mergeDefaults(base[k],provided?.[k]):provided?.[k]??base[k]]));}

export function readParam(entry,parts){let value=mergeDefaults(defaults(),decode(entry.parameters));for(const k of parts)value=value?.[k];return value;}

export function setParam(entry,parts,value){

  if(parts.length===1){entry.parameters[parts[0]]=encode(value);return;}

  const top=parts[0],obj=schema[top].type==='array'?structuredClone(readParam(entry,[top])):{...defaults(schema[top].fields),...decode(entry.parameters[top]||'{}')};let target=obj;
  if(Array.isArray(obj)&&(!/^\d+$/.test(parts[1])||Number(parts[1])>=obj.length))fail('Índice inexistente; edite a lista para adicionar uma associação.');

  for(const k of parts.slice(1,-1))target=target[k]??={};target[parts.at(-1)]=value;entry.parameters[top]=encode(obj);

}

export function checkParameters(entry){

  const warnings=[];

  for(const [key,raw]of Object.entries(entry.parameters)){
    if(!schema[key]){warnings.push('Parâmetro desconhecido preservado: '+key);continue;}
    const clean=(v,n)=>n.type==='array'&&Array.isArray(v)?v.map(x=>clean(x,{type:'struct',fields:n.fields})):n.fields&&v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).filter(([k])=>{if(!n.fields[k])warnings.push('Campo desconhecido preservado: '+key+'/'+k);return n.fields[k];}).map(([k,x])=>[k,clean(x,n.fields[k])])):v;
    validate(clean(decode(raw),schema[key]),schema[key],'/'+key);
  }

  return warnings;

}

function safeFile(root,relative){

  if(path.isAbsolute(relative)||relative.split(/[\\/]/).includes('..'))fail('Caminho fora do projeto');

  const target=path.resolve(root,relative);if(!target.startsWith(root+path.sep))fail('Caminho fora do projeto');

  let parent=target;while(!fs.existsSync(parent))parent=path.dirname(parent);

  if(fs.realpathSync(parent)!==parent)fail('Destino com link simbólico não suportado: '+relative);

  return target;

}

export function transaction(root,changes,{dryRun=false,expectedHash,operation='apply',beforeCommit}={}){

  if(expectedHash&&registry(root).hash!==expectedHash)fail('Registry mudou; releia antes de gravar.',4);

  const snapshots=changes.map(({file,bytes,expectedBefore})=>{

    const target=safeFile(root,file),before=fs.existsSync(target)?fs.readFileSync(target):null;

    if(expectedBefore!==undefined&&(before?sha(before):null)!==expectedBefore)fail('Conflito desde preparação: '+file,4);

    return {file,target,before,after:bytes===null?null:Buffer.isBuffer(bytes)?bytes:Buffer.from(bytes)};

  }).filter(x=>(x.before===null)!==(x.after===null)||(x.before&&x.after&&!x.before.equals(x.after)));

  const diff=snapshots.map(x=>({file:x.file,before:x.before?sha(x.before):null,after:x.after?sha(x.after):null,bytes:x.after?.length??0}));

  if(dryRun||!snapshots.length)return {changed:snapshots.length,dryRun,diff};

  const id=new Date().toISOString().replace(/[:.]/g,'-')+'-'+crypto.randomUUID().slice(0,8);

  const dir=path.join(packageRoot,'backups','design-system',id);fs.mkdirSync(dir,{recursive:true});

  const receipt={version,designRevision,project:root,operation,createdAt:new Date().toISOString(),status:'prepared',files:snapshots.map(x=>({file:x.file,before:x.before?.toString('base64')??null,afterHash:x.after?sha(x.after):null}))};

  const receiptFile=path.join(dir,'receipt.json');fs.writeFileSync(receiptFile,JSON.stringify(receipt,null,2));

  const written=[];

  try{

    beforeCommit?.();

    if(expectedHash&&registry(root).hash!==expectedHash)fail('Registry mudou durante preparação.',4);

    for(const x of snapshots){

      const now=fs.existsSync(x.target)?fs.readFileSync(x.target):null;

      if((now===null)!==(x.before===null)||(now&&!now.equals(x.before)))fail('Conflito: '+x.file,4);

      fs.mkdirSync(path.dirname(x.target),{recursive:true});

      const temp=x.target+'.coreto-'+id+'.tmp';

      try{if(x.after===null)fs.unlinkSync(x.target);else {fs.writeFileSync(temp,x.after,{flag:'wx'});fs.renameSync(temp,x.target);}}finally{if(fs.existsSync(temp))fs.unlinkSync(temp);}

      written.push(x);

    }

    receipt.status='applied';fs.writeFileSync(receiptFile,JSON.stringify(receipt,null,2));

  }catch(e){

    for(const x of written.reverse()){if(x.before===null)fs.unlinkSync(x.target);else fs.writeFileSync(x.target,x.before);}

    receipt.status='rolled-back';receipt.error=e.message;fs.writeFileSync(receiptFile,JSON.stringify(receipt,null,2));throw e;

  }

  return {changed:snapshots.length,diff,receipt:receiptFile};

}

// Installation owns the theme and provider parameters, never native game data.
export function prepareInstall(root,{preset='coreto-default',reapply=false,coretoCli}={}) {
  if (!['coreto-default','dryland'].includes(preset)) fail('Preset desconhecido');
  const original=registry(root), changes=[], before=new Map();
  const remember=file=>{if(!before.has(file)){const target=safeFile(root,file);before.set(file,fs.existsSync(target)?sha(fs.readFileSync(target)):null);}};
  const put=(file,bytes)=>{remember(file);changes.push({file,bytes});};
  const read=file=>{const target=safeFile(root,file);return fs.existsSync(target)?fs.readFileSync(target):null;};
  const profile=preset==='dryland'?loadProfile({packageRoot,plugins:original.plugins,read,sha,fail}):null;
  remember('js/plugins.js');
  const manifest=JSON.parse(fs.readFileSync(path.join(packageRoot,'manifest.json'),'utf8'));
  const metadata=file=>{
    const bytes=fs.readFileSync(path.join(packageRoot,file));
    if(manifest.files[file]!==sha(bytes))fail('Hash do pacote divergente: '+file,4);
    return JSON.parse(bytes);
  };
  const recipe=metadata('design/preset.json'),compatibility=metadata('design/compatibility.json');
  const previous=original.plugins.find(p=>p.name===pluginId), fresh=!previous;
  const entry=previous||{name:pluginId,status:true,description:'Coreto DesignSystem '+version,parameters:{}};
  const provided=decode(entry.parameters), merged=mergeDefaults(defaults(),provided);
  // Reapply changes documented defaults only; extension fields and custom values survive.
  entry.parameters=Object.fromEntries(Object.entries(merged).map(([k,v])=>[k,encode(v)]));
  entry.description='Coreto DesignSystem '+version;
  if(fresh){const last=original.plugins.findLastIndex(p=>p.status&&p.name.startsWith('Coreto_'));original.plugins.splice(last+1,0,entry);}
  checkParameters(entry);
  const stagingRoot=path.join(packageRoot,'staging');fs.mkdirSync(stagingRoot,{recursive:true});
  const staging=fs.mkdtempSync(path.join(stagingRoot,'install-'));
  try {
    fs.mkdirSync(path.join(staging,'js'));fs.mkdirSync(path.join(staging,'data'));
    fs.writeFileSync(path.join(staging,'game.rmmzproject'),'RPGMZ 1.10.0');
    fs.copyFileSync(path.join(root,'data/System.json'),path.join(staging,'data/System.json'));
    fs.writeFileSync(path.join(staging,'js/plugins.js'),original.serialize());
    const providers={core:'Coreto_0_CoreEngine',message:'Coreto_1_MessageCore','ext-message':'Coreto_2_ExtMessageFunc',options:'Coreto_1_OptionsCore',save:'Coreto_1_SaveCore','message-visibility':'Coreto_4_MessageVisibility'};
    const enabled=ns=>original.plugins.some(p=>p.name===providers[ns]&&p.status);
    if(!coretoCli){for(let parent=root; ; parent=path.dirname(parent)){const candidate=path.join(parent,'coreto/tools/coreto/cli.mjs');if(fs.existsSync(candidate)){coretoCli=candidate;break;}if(path.dirname(parent)===parent)break;}}
    const native=(ns,args)=>{
      if(!coretoCli)fail('Informe --coreto-cli para configurar os provedores presentes.',6);
      const input=path.join(staging,'value.json'), argv=[ns,...args];
      const value=argv.indexOf('--value');if(value>=0){fs.writeFileSync(input,argv[value+1]);argv.splice(value,2,'--input',input);}
      let result;
      try{result=JSON.parse(execFileSync(process.execPath,[coretoCli,...argv,'--project',staging,'--json'],{encoding:'utf8',maxBuffer:16*1024*1024}));}
      catch(error){fail('Provider '+ns+': '+(error.stdout||error.message),2);}
      if(!result.ok)fail('Provider '+ns+': '+JSON.stringify(result.error));
      return result.result;
    };
    const get=(ns,p)=>{const result=native(ns,['parameters','get','--path',p]);return result.value??result;};
    const set=(ns,p,value)=>native(ns,['parameters','set','--path',p,'--value',JSON.stringify(value)]);
    const catalogs=new Map();
    const setTyped=(ns,key,value)=>{
      if(!catalogs.has(ns))catalogs.set(ns,native(ns,['api','list']));
      const field=catalogs.get(ns).find(field=>field.usages?.some(use=>use.surface==='parameter'&&use.path===key));
      if(!field)fail('Parâmetro ausente no catálogo público: '+ns+' '+key);
      set(ns,key,field.type==='string'?String(value):field.type==='number'?Number(value):value);
    };
    if(profile)configureProfile(profile,{get,set:setTyped,fail});
    for(const setting of recipe.settings) if(enabled(setting.namespace)&&!setting.path.endsWith('JS')) {
      if(fresh)setTyped(setting.namespace,setting.path,setting.value);
      else if(Object.hasOwn(setting,'legacy'))configureProfile({settings:[setting]},{get,set:setTyped,fail});
    }
    if(enabled('message')) {
      const fonts=get('message','/CustomFonts');
      let changed=false;
      for(const font of recipe.fonts) if(!fonts.some(item=>item.FontFamily===font.FontFamily)){fonts.push(font);changed=true;}
      if(changed)set('message','/CustomFonts',fonts);
    }
    function delegate(source,call,identity) {
      const marker='// CoretoDesignSystem 1.4 delegate';
      const prefix=marker+'\nif (globalThis.CoretoDesignSystem) { '+call+'; return; }\n';
      const normalized=source.replaceAll('\r\n','\n');
      const known=code=>compatibility.callbacks[identity]?.includes(sha(code));
      if(!known(normalized)&&!(normalized.startsWith(prefix)&&known(normalized.slice(prefix.length)))) {
        fail('Callback visual personalizado conflitante: '+identity,4);
      }
      if(normalized.startsWith(prefix))return source;
      if(/^return DrylandParchmentUI\.draw(?:Option|SaveFile|SaveContents)\.apply\(this, arguments\);$/.test(source.trim())) source='';
      // Keep the original callback as a disabled-theme fallback, including custom logic.
      return marker+'\nif (globalThis.CoretoDesignSystem) { '+call+'; return; }\n'+source;
    }
    if(enabled('core')) {
      const key='/Window/DrawItemBackgroundJS',source=get('core',key);
      set('core',key,delegate(source,'for (let i=0;i<this.maxItems();i++) CoretoDesignSystem.drawItemBackground.call(this,i)','core:'+key));
    }
    if(enabled('options')) {
      const categories=get('options','/Categories');
      for(const category of categories)for(const row of category.List||[])if(['textLocale','textEffects','bgmVolume','bgsVolume','meVolume','seVolume'].includes(row.Symbol))
        row.DrawJS=delegate(row.DrawJS||'','CoretoDesignSystem.drawOption.apply(this,arguments)','options:'+row.Symbol);
      set('options','/Categories',categories);
    }
    if(enabled('save'))for(const [key,call] of [['/SaveMenu/BoxFileDataJS','CoretoDesignSystem.drawSaveFile.apply(this,arguments)'],['/SaveMenu/BoxContentsJS','CoretoDesignSystem.drawSaveContents.apply(this,arguments)']])set('save',key,delegate(get('save',key),call,'save:'+key));
    const installed=registry(staging);
    if(profile)registerProfile(profile,installed,fail);
    put('js/plugins.js',installed.serialize());
  } finally {
    if(path.dirname(path.resolve(staging))!==path.resolve(stagingRoot))fail('Staging fora do pacote');
    fs.rmSync(staging,{recursive:true,force:true});
  }
  const files=[['Coreto_5_DesignSystem.js','js/plugins/'+pluginId+'.js'],
    ...fs.readdirSync(path.join(packageRoot,'fonts')).filter(name=>/\.(ttf|txt)$/.test(name)).map(name=>['fonts/'+name,'fonts/'+name]),
    ...fs.readdirSync(path.join(packageRoot,'assets')).filter(name=>/^(CoretoTheme_|CoretoConsole_|CoretoWindow).*\.png$/.test(name)&&name!=='CoretoTheme_Black.png').map(name=>['assets/'+name,'img/system/'+name])];
  for(const [source,file]of files){
    const bytes=fs.readFileSync(path.join(packageRoot,source));
    if(manifest.files[source]!==sha(bytes))fail('Hash do pacote divergente: '+source,4);
    const current=read(file),known=compatibility.assets[file]||[];
    if(current && !current.equals(bytes) && file!==('js/plugins/'+pluginId+'.js') && !known.includes(sha(current)))fail('Asset personalizado conflitante: '+file,4);
    put(file,bytes);
  }
  if(profile)for(const file of profile.files)put(file.file,file.bytes);
  const languageFile=path.join(root,'Languages.tsv');
  if(fs.existsSync(languageFile)) {
    remember('Languages.tsv');
    let text=fs.readFileSync(languageFile,'utf8');
    if(!/^coreto.ui.restore_hint\t/m.test(text)) {
      const header=text.split(/\r?\n/)[0].replace(/^\ufeff/,'').split('\t');
      const values={English:'Click or press Confirm to restore the interface.',Portuguese:'Clique ou pressione Confirmar para restaurar a interface.'};
      const line=['coreto.ui.restore_hint',...header.slice(1).map(locale=>values[locale]||'')].join('\t');
      text+=(text.endsWith('\n')?'':'\n')+line+'\n';
    }
    if(profile)text=addTranslations(text,profile.languages,fail);
    put('Languages.tsv',text);
  }
  put('.coreto-design-revision.json',JSON.stringify({version,designRevision,preset},null,2)+'\n');
  return {changes:changes.map(c=>({...c,expectedBefore:before.get(c.file)})),hash:original.hash,fresh,preset};
}
