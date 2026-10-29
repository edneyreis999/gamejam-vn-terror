#!/usr/bin/env node
import fs from 'node:fs';
import catalog from './design/public-api.json' with {type:'json'};
import path from 'node:path';
import {parseArgs} from 'node:util';
import {schema,entries,external,defaults,approvedRecipe,decode,validate,pluginId,version} from './src/schema.mjs';
import {projectRoot,registry,pluginEntry,paramPath,readParam,setParam,checkParameters,prepareInstall,transaction,sha,fail} from './src/authoring.mjs';
const options=Object.fromEntries(['project','path','value','input','preset','expected-hash','output','coreto-cli'].map(k=>[k,{type:'string'}]));
for(const k of ['json','dry-run','help','reapply'])options[k]={type:'boolean'};
const output=(operation,target,result)=>({schemaVersion:1,ok:true,operation,target,result});
try{
  const {values:v,positionals:a}=parseArgs({options,allowPositionals:true});
  const [group,operation,id]=a;
  if(v.input&&!(group==='parameters'&&operation==='set'||group==='restore'))fail('--input é aceito em parameters set e restore.');
  let result;
  if(v.help||!group)result=output('help',null,{version,usage:'node cli.mjs <group> [operation] --project <jogo> [--json]',operations:['api list|describe <path>','parameters get|set|reset --path /Group/Field','preset list|apply|export','install','validate','restore --input receipt.json'],writing:'Writes unless --dry-run. Reload MZ before saving; restart playtest. Reinstall and --reapply preserve custom parameters and handlers; update drawing delegates and assets explicitly.',exitCodes:{0:'success',2:'invalid input',3:'missing target',4:'conflict',5:'IO failure',6:'unavailable'}});
  else if(group==='api'){
    const all=[...entries().map(({fields,...e})=>e),...external,...(catalog.methods||[]),...(catalog.apis||[])];
    if(operation==='list')result=output('api list',null,all);
    else if(operation==='describe'){const lookup=id||v.path;const found=all.filter(e=>e.path===lookup||e.name===lookup||e.key===lookup);if(!found.length)fail('Propriedade não encontrada',3);result=output('api describe',lookup,found);}
    else fail('Operação de catálogo inválida');
  }else if(group==='preset'&&operation==='list')result=output('preset list',null,[{name:'coreto-default',description:'Biblioteca de marca e provedores presentes'},{name:'dryland',description:'Integração Dryland completa: adaptadores, assets e UI localizada; preserva eventos e saves'}]);
  else{
    const root=projectRoot(v.project),reg=registry(root);
    if(group==='parameters'){
      const entry=pluginEntry(reg),{parts,node}=paramPath(v.path);
      if(operation==='get')result=output('parameters get',root,{path:v.path,value:readParam(entry,parts),hash:reg.hash});
      else if(['set','reset'].includes(operation)){
        if(v.value!==undefined&&v.input)fail('Escolha --value ou --input');
        const value=operation==='reset'?(node.type==='struct'?defaults(node.fields):node.default):JSON.parse(v.input?fs.readFileSync(v.input,'utf8'):v.value??fail('Informe --value ou --input'));
        validate(value,node,v.path);setParam(entry,parts,value);checkParameters(entry);
        result=output('parameters '+operation,root,transaction(root,[{file:'js/plugins.js',bytes:reg.serialize()}],{dryRun:v['dry-run'],expectedHash:v['expected-hash']||reg.hash,operation:'parameters '+operation}));
      }else fail('Operação inválida');
    }else if(group==='install'||group==='preset'&&operation==='apply'){
      const prepared=prepareInstall(root,{preset:v.preset||'coreto-default',reapply:!!v.reapply,coretoCli:v['coreto-cli']});
      result=output(group==='install'?'install':'preset apply',root,transaction(root,prepared.changes,{dryRun:v['dry-run'],expectedHash:v['expected-hash']||prepared.hash,operation:'install '+prepared.preset}));
    }else if(group==='preset'&&operation==='export'){
      const exported={schemaVersion:1,version,plugin:pluginId,parameters:decode(pluginEntry(reg).parameters),providers:reg.plugins.filter(p=>p.status&&p.name.startsWith('Coreto_')&&p.name!==pluginId).map(p=>({name:p.name,parameters:p.parameters}))};
      if(v.output)fs.writeFileSync(v.output,JSON.stringify(exported,null,2)+'\n');result=output('preset export',root,exported);
    }else if(group==='validate'){
      const e=pluginEntry(reg),warnings=checkParameters(e),errors=[];
      const index=reg.plugins.indexOf(e);
      for(const id of catalog.dependencies.required)if(!reg.plugins.some(p=>p.name===id&&p.status))errors.push('Provedor obrigatório ausente ou desligado: '+id);
      if(reg.plugins.some((p,i)=>i>index&&p.status&&p.name.startsWith('Coreto_')&&p.name!==pluginId))errors.push('Design System deve carregar depois dos provedores Coreto.');
      const names={...approvedRecipe.Icons,...decode(e.parameters.Icons||'{}')};
      for(const f of ['js/plugins/'+pluginId+'.js','fonts/Outfit.ttf','fonts/AveriaLibre-Regular.ttf','fonts/CinzelDecorative-Regular.ttf',...Object.values(names).map(n=>'img/system/'+n+'.png'),'img/system/CoretoTheme_continue.png','img/system/CoretoWindow.png'])if(!fs.existsSync(path.join(root,f))||!fs.statSync(path.join(root,f)).size)errors.push('Arquivo ausente/vazio: '+f);
      result=output('validate',root,{valid:!errors.length,errors,warnings,hash:reg.hash});if(errors.length)process.exitCode=2;
    }else if(group==='restore'){
      if(!v.input)fail('Informe --input receipt.json');const receipt=JSON.parse(fs.readFileSync(v.input,'utf8'));
      if(receipt.project!==root||receipt.status!=='applied')fail('Recibo não aplicado ou de outro projeto',4);
      // Restore checks every file before modifying or deleting anything.
      for(const x of receipt.files){const target=path.resolve(root,x.file);if(!target.startsWith(root+path.sep))fail('Recibo fora do projeto');if((fs.existsSync(target)?sha(fs.readFileSync(target)):null)!==x.afterHash)fail('Arquivo mudou desde instalação: '+x.file,4);}
      const changes=receipt.files.map(x=>({file:x.file,bytes:x.before===null?null:Buffer.from(x.before,'base64'),expectedBefore:x.afterHash}));
      result=output('restore',root,{...transaction(root,changes,{dryRun:v['dry-run'],expectedHash:v['expected-hash']||reg.hash,operation:'restore'})});
    }else fail('Comando inválido. Use --help.');
  }
  console.log(JSON.stringify(result,null,2));
}catch(e){console.log(JSON.stringify({schemaVersion:1,ok:false,error:{code:e.exitCode??(e.code?5:2),message:e.message}},null,2));process.exitCode=e.exitCode??(e.code?5:2);}
