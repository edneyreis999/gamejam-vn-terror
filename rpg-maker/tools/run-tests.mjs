import { readFile, mkdir, symlink, writeFile, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { performance } from 'node:perf_hooks';
import { parseArgs } from 'node:util';
import { setTimeout as delay } from 'node:timers/promises';
import { randomUUID } from 'node:crypto';
import {appendFileSync} from 'node:fs';
import {processRows,signalOwnedGroup,terminateOwnedGroup} from './owned-processes.mjs';

export async function limits(root, overrides={}) {
 let config={};try{config=JSON.parse(await readFile(path.join(root,'loki.config.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
 const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 if(!object(config)||config.slowTests!==undefined&&!object(config.slowTests))throw new Error('Invalid slow-test configuration object');
 const result={},sources={};for(const key of ['maxWorkers','maxBrowsers']){
  const configured=config.slowTests?.[key];for(const value of [configured,overrides[key]])if(value!==undefined&&(!Number.isSafeInteger(value)||value<=0))throw new Error('Invalid '+key);
  result[key]=overrides[key]??configured??10;sources[key]=overrides[key]!==undefined?'request':configured!==undefined?'loki.config.json':'default';
 }return {...result,sources};
}
const root=fileURLToPath(new URL('../../',import.meta.url));
if(process.argv[1]===fileURLToPath(import.meta.url))await main();
async function main(){
 const {values}=parseArgs({options:{scope:{type:'string',default:'all'},ids:{type:'string'},output:{type:'string'},maxWorkers:{type:'string'},maxBrowsers:{type:'string'},pruned:{type:'boolean',default:false}}});
 const config=await limits(root,Object.fromEntries(['maxWorkers','maxBrowsers'].filter(k=>values[k]!==undefined).map(k=>[k,Number(values[k])])));
 const groups=JSON.parse(await readFile(path.join(root,'rpg-maker/tests/execution-groups.json'),'utf8'));
 const manifest=JSON.parse(await readFile(path.join(root,'rpg-maker/tests/test-manifest.json'),'utf8'));
 const expected=Object.values(manifest.tasks).flat(),classified=Object.values(groups).flat();
 if(new Set(classified).size!==classified.length||JSON.stringify([...classified].sort())!==JSON.stringify([...expected].sort()))throw new Error('Execution groups do not exactly cover canonical manifest');
 let selected=values.ids?values.ids.split(','):values.scope==='all'?classified:groups[values.scope];
 if(!selected?.length||new Set(selected).size!==selected.length||selected.some(id=>!expected.includes(id)))throw new Error('Invalid test selection');
 const output=path.resolve(root,values.output||'.artifacts/test-runs/'+new Date().toISOString().replaceAll(':','-'));
 await mkdir(output,{recursive:false});
 const start=performance.now(),events=[],jobs=[],tokens=new Map();let live=0,peak=0,active=0,workerPeak=0,stopping=false;
 const record=(event,extra={})=>{const row={event,ms:performance.now()-start,...extra};events.push(row);appendFileSync(path.join(output,'events.jsonl'),JSON.stringify(row)+'\n');};
 let testProject=process.env.DRYLAND_QA_PROJECT || path.join(root,'rpg-maker/The Dryland Drowned');
 if(values.pruned){
  testProject=path.join(output,'pruned-game');
  await cp(path.join(root,'rpg-maker/The Dryland Drowned'),testProject,{recursive:true,filter:p=>!['save','game.rmmzproject'].includes(path.basename(p))});
  const prune=spawn(process.execPath,[path.join(root,'rpg-maker/tools/prune-build.mjs'),'--build',testProject,'--apply'],{stdio:['ignore','pipe','pipe']});let log='';prune.stdout.on('data',x=>log+=x);prune.stderr.on('data',x=>log+=x);
  const code=await new Promise(resolve=>prune.on('close',resolve));await writeFile(path.join(output,'prune.log'),log);if(code!==0)throw new Error('Pruned fixture preparation failed: '+log);
 }
 const broker=http.createServer(async(req,res)=>{let body='';for await(const chunk of req)body+=chunk;
  if(req.url==='/reserve'){
   const job=jobs.find(j=>j.id===body&&j.status==='running');
   if(!job||tokens.size>=config.maxBrowsers||[...tokens.values()].some(t=>t.job===body)){res.writeHead(409);res.end('Browser admission denied');return;}
   const token=randomUUID();tokens.set(token,{job:body});record('browser-reserve',{job:body,token});res.end(token);
  }else if(req.url==='/started'){
   const {token,pid}=JSON.parse(body),reservation=tokens.get(token);if(!reservation){res.writeHead(409);res.end();return;}
   reservation.pid=pid;live++;peak=Math.max(peak,live);record('browser-start',{job:reservation.job,pid,live});res.end();
  }else if(req.url==='/release'){
   const reservation=tokens.get(body);if(reservation){if(reservation.pid)live--;tokens.delete(body);record('browser-exit',{...reservation,live});}res.end();
  }else{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>broker.listen(0,'127.0.0.1',resolve));
 const brokerUrl=`http://127.0.0.1:${broker.address().port}`;
 const children=new Set();
 const stop=()=>{stopping=true;for(const child of children){const errors=signalOwnedGroup(child.pid);if(errors.length)record('signal-errors',{pid:child.pid,errors});}};
 process.once('SIGINT',stop);process.once('SIGTERM',stop);
 async function run(id){
  const job={id,status:'running',startMs:performance.now()-start,browserDemand:groups.slow.includes(id)?1:0};jobs.push(job);active++;workerPeak=Math.max(workerPeak,active);record('job-start',{id,active});
  const cwd=path.join(output,id);await mkdir(cwd);await mkdir(path.join(cwd,'tmp'));await symlink(path.join(root,'rpg-maker'),path.join(cwd,'rpg-maker'),'dir');
  const args=['--test','--test-concurrency=1','--test-reporter=tap',`--test-name-pattern=^${id} —`,path.join(root,'rpg-maker/tests/campaign.test.mjs')];
  const child=spawn(process.execPath,args,{cwd,detached:true,env:{...process.env,TMPDIR:path.join(cwd,'tmp'),DRYLAND_QA_PORT:'0',DRYLAND_QA_PROJECT:testProject,DRYLAND_BROWSER_BROKER:brokerUrl,DRYLAND_JOB_ID:id},stdio:['ignore','pipe','pipe']});children.add(child);job.pid=child.pid;record('job-spawn',{id,pid:child.pid});
  let stdout='',stderr='';child.stdout.on('data',x=>{stdout+=x;appendFileSync(path.join(cwd,'stdout.tap'),x);});child.stderr.on('data',x=>{stderr+=x;appendFileSync(path.join(cwd,'stderr.log'),x);});
  const code=await new Promise(resolve=>{child.on('error',e=>{stderr+=e.stack;resolve(1);});child.on('close',(code,signal)=>{job.signal=signal;resolve(code);});});children.delete(child);
  job.exitCode=code;job.status=code===0?'pass':'fail';
  const outcomes=[...stdout.matchAll(/^(not ok|ok) \d+ - ((?:UT|IT)-\d{3}) —.*$/gm)].map(m=>({id:m[2],pass:m[1]==='ok'}));job.outcomes=outcomes;job.tapSummary=Object.fromEntries([...stdout.matchAll(/^# (tests|pass|fail|cancelled|skipped|todo) (\d+)$/gm)].map(m=>[m[1],Number(m[2])]));
  if(outcomes.length!==1||outcomes[0].id!==id){job.status='fail';job.accountingError='Missing or duplicate selected outcome';}
  for(const [token,reservation]of tokens)if(reservation.job===id){job.status='fail';job.cleanupError='Browser token unreleased';if(reservation.pid){try{process.kill(reservation.pid,'SIGTERM');}catch(e){if(e.code!=='ESRCH')throw e;}live--;}tokens.delete(token);}
  const cleanup=await terminateOwnedGroup(child.pid);job.cleanup=cleanup;
  if(!cleanup.closed||cleanup.errors.length){job.cleanupError='Owned process cleanup failed';job.status='fail';}
  else {await rm(path.join(cwd,'tmp'),{recursive:true,force:true});record('owned-group-absence-confirmed',{id});}
  for (const event of events.filter(e=>e.event==='browser-start'&&e.job===id)) {
   let alive=true;for(let attempt=0;attempt<100;attempt++){alive=processRows().some(row=>row.pid===event.pid);if(!alive)break;await delay(20);}
   if(alive){job.status='fail';job.cleanupError='Owned browser still alive after teardown';}else record('browser-absence-confirmed',{id,pid:event.pid});
  }
  job.durationMs=performance.now()-start-job.startMs;await writeFile(path.join(cwd,'stdout.tap'),stdout);await writeFile(path.join(cwd,'stderr.log'),stderr);await writeFile(path.join(cwd,'result.json'),JSON.stringify(job,null,2));active--;record('job-end',{id,status:job.status,active});console.log(id,job.status,Math.round(job.durationMs)+'ms');
 }
 const queue=[...selected],running=new Set();
 try{while(queue.length||running.size){while(!stopping&&queue.length&&running.size<Math.min(config.maxWorkers,config.maxBrowsers)){
   const id=queue.shift(),promise=run(id).catch(error=>{const job=jobs.find(x=>x.id===id);Object.assign(job,{status:'fail',infrastructureError:error.stack});record('job-infrastructure-error',{id,error:error.stack});stop();});running.add(promise);promise.finally(()=>running.delete(promise));
  }if(stopping&&!running.size)break;if(running.size)await Promise.race(running);
 }}finally{stop();await Promise.allSettled([...running]);await new Promise(resolve=>broker.close(resolve));}
 const result={selection:selected,testProject,pruned:values.pruned,config,workerPeak,browserPeak:peak,liveBrowsersAfterCleanup:live,unrun:queue,jobs,events,wallMs:performance.now()-start,node:process.version,renderer:process.env.DRYLAND_QA_ANGLE||'metal',status:queue.length||jobs.some(j=>j.status!=='pass')?'fail':'pass'};
 await writeFile(path.join(output,'run.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({status:result.status,wallMs:result.wallMs,workerPeak,browserPeak:peak,output}));process.exitCode=result.status==='pass'?0:1;
}
