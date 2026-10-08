import {readFile,writeFile,mkdir,readdir,rm,access} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn,execFileSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';
import {parseArgs} from 'node:util';
import {setTimeout as delay} from 'node:timers/promises';
import {limits} from './run-tests.mjs';
import {signalOwnedGroup,terminateOwnedGroup} from './owned-processes.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
const {values}=parseArgs({options:{output:{type:'string'},ids:{type:'string'},maxWorkers:{type:'string'},maxBrowsers:{type:'string'}}});
const config=await limits(root,Object.fromEntries(['maxWorkers','maxBrowsers'].filter(k=>values[k]!==undefined).map(k=>[k,Number(values[k])])));
const registry=JSON.parse(await readFile(join(root,'rpg-maker/qa/recipes.json'),'utf8'));
const selected=values.ids?registry.filter(x=>values.ids.split(',').includes(x.id)):registry;
if(!selected.length||values.ids&&selected.length!==values.ids.split(',').length)throw Error('Unknown recipe selection');
const output=resolve(root,values.output||'.artifacts/recipe-runs/'+Date.now());await mkdir(output,{recursive:false});
const start=performance.now(),events=[],results=[],active=new Map();let stopping=false,peak=0,workerPeak=0;
const stamp=(event,details={})=>events.push({event,ms:performance.now()-start,...details});
const stop=()=>{stopping=true;for(const pid of observed)try{process.kill(pid,'SIGTERM');}catch(e){if(e.code!=='ESRCH')throw e;}for(const {child}of active.values())signalOwnedGroup(child.pid);};
process.once('SIGINT',stop);process.once('SIGTERM',stop);
const observed=new Set();
function processes(){return execFileSync('ps',['-axo','pid=,ppid=,pgid=,command='],{encoding:'utf8'}).trim().split('\n').map(line=>/^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/.exec(line)).filter(Boolean).map(m=>({pid:Number(m[1]),parent:Number(m[2]),group:Number(m[3]),command:m[4]}));}
const monitor=setInterval(()=>{const rows=processes(),owned=new Set([...active.values()].map(x=>x.child.pid));let prior=-1;while(prior!==owned.size){prior=owned.size;for(const row of rows)if(owned.has(row.parent)||owned.has(row.group))owned.add(row.pid);}let live=0;for(const row of rows)if(owned.has(row.pid)&&row.command.includes('/Google Chrome.app/Contents/MacOS/Google Chrome ')){live++;if(!observed.has(row.pid)){observed.add(row.pid);stamp('browser-observed',{pid:row.pid,group:row.group});}}peak=Math.max(peak,live);if(live>config.maxBrowsers){stamp('browser-budget-exceeded',{live});stop();}},100);

async function archives(directory,name){let found=[];try{for(const entry of await readdir(directory,{withFileTypes:true})){const p=join(directory,entry.name);if(entry.isDirectory())found.push(...await archives(p,name));else if(entry.name===name||name.startsWith('regex:')&&new RegExp(name.slice(6)).test(entry.name))found.push(p);}}catch(e){if(e.code!=='ENOENT')throw e;}return found;}
async function execute(item){
 const dir=join(output,item.id);await mkdir(dir);const started=performance.now();const env={...process.env,DRYLAND_QA_PORT:'0',...item.env,TMPDIR:join(dir,'tmp')};await mkdir(env.TMPDIR);
 if(item.dependency){const producer=results.find(r=>r.id===item.dependency.id);const files=await archives(join(output,item.dependency.id,'evidence'),item.dependency.archive);if(!producer||!files.length){const result={id:item.id,status:'blocked-prerequisite',reason:'Fresh producer did not provide required native archive',dependency:item.dependency,producerStatus:producer?.status,wallMs:performance.now()-started};results.push(result);await writeFile(join(dir,'result.json'),JSON.stringify(result,null,2));await rm(env.TMPDIR,{recursive:true,force:true});return;}env.DRYLAND_QA_SAVE_ARCHIVE=files[0];if(item.dependency.inputKind){const archive=JSON.parse(await readFile(files[0],'utf8'));if(item.dependency.inputKind==='approach')env.DRYLAND_QA_APPROACH=String(item.dependency.inputIndex+1);else env.DRYLAND_QA_VICTIM=String(item.dependency.inputIndex+1);}}
 const itemFile=join(dir,'item.json'),resultFile=join(dir,'result.json');await writeFile(itemFile,JSON.stringify({...item,evidenceRoot:join(dir,'evidence')},null,2));
 try{await access(join(root,item.case));}catch(error){const result={id:item.id,status:'blocked-source',missing:item.case,wallMs:performance.now()-started};results.push(result);await writeFile(resultFile,JSON.stringify(result,null,2));await rm(env.TMPDIR,{recursive:true,force:true});return;}
 const child=spawn(process.execPath,[join(root,'rpg-maker/tools/run-recipe.mjs'),root,itemFile,resultFile],{cwd:root,env,detached:true,stdio:['ignore','pipe','pipe']});active.set(item.id,{child});workerPeak=Math.max(workerPeak,active.size);stamp('job-start',{id:item.id,pid:child.pid});
 let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);
 const code=await new Promise(resolve=>{child.on('error',e=>{stderr+=e.stack;resolve(1);});child.on('close',resolve);});
 let result;try{result=JSON.parse(await readFile(resultFile,'utf8'));}catch{result={status:'fail',error:'No recipe result (interruption or worker failure)'};}
 const cleanup=await terminateOwnedGroup(child.pid);result.cleanup=cleanup;
 if(!cleanup.closed||cleanup.errors.length){result.status='fail';result.cleanupError='Owned process cleanup failed';}else{await rm(env.TMPDIR,{recursive:true,force:true});stamp('owned-group-absence-confirmed',{id:item.id,pid:child.pid});}
 active.delete(item.id);result={...result,id:item.id,exitCode:code,wallMs:performance.now()-started};results.push(result);await Promise.all([writeFile(resultFile,JSON.stringify(result,null,2)),writeFile(join(dir,'stdout.log'),stdout),writeFile(join(dir,'stderr.log'),stderr)]);console.log(item.id,result.status,Math.round(result.wallMs)+'ms');
}
const pending=[...selected],running=new Set();
try{while(pending.length||running.size){for(let n=0;n<pending.length&&!stopping&&running.size<Math.min(config.maxWorkers,config.maxBrowsers);){const item=pending[n];if(item.dependency&&selected.some(x=>x.id===item.dependency.id)&&!results.some(r=>r.id===item.dependency.id)){n++;continue;}pending.splice(n,1);const promise=execute(item);running.add(promise);promise.finally(()=>running.delete(promise));}if(running.size)await Promise.race(running);else if(pending.length)break;}}finally{stop();await Promise.allSettled([...running]);clearInterval(monitor);}
const stillAlive=processes().filter(p=>observed.has(p.pid));const result={selection:selected.map(x=>x.id),config,workerPeak,browserPeak:peak,browserPids:[...observed],stillAlive,unrun:pending.map(x=>x.id),results,events,wallMs:performance.now()-start,status:stillAlive.length||pending.length||results.some(r=>!['pass','executed-awaiting-review'].includes(r.status))?'incomplete-or-failed':'executed-awaiting-review'};
await writeFile(join(output,'run.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,wallMs:result.wallMs,browserPeak:peak}));process.exitCode=result.status==='incomplete-or-failed'?1:0;
