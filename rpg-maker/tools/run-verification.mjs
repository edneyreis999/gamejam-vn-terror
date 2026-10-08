import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,join} from 'node:path';
import {performance} from 'node:perf_hooks';
import {parseArgs} from 'node:util';
const root=fileURLToPath(new URL('../../',import.meta.url));
const {values}=parseArgs({options:{output:{type:'string'},scope:{type:'string',default:'all'}}});
if(!['all','fast','slow'].includes(values.scope))throw Error('Unknown scope');
const output=resolve(root,values.output||'.artifacts/verification/'+Date.now());await mkdir(output,{recursive:false});
const start=performance.now(),runs=[];let child,stopping=false;
for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>{stopping=true;child?.kill(signal);});
async function command(file,args,id){const started=performance.now();child=spawn(process.execPath,[join(root,'rpg-maker/tools',file),...args],{cwd:root,stdio:'inherit'});const code=await new Promise(resolve=>child.on('close',resolve));runs.push({id,command:[process.execPath,file,...args],exitCode:code,wallMs:performance.now()-started});child=null;let accounting;try{accounting=JSON.parse(await readFile(args.at(-1)+'/run.json','utf8'));}catch{stopping=true;runs.at(-1).infrastructureError='Missing runner accounting; dependent lanes not launched';}if(accounting?.unrun?.length)stopping=true;}
if(values.scope!=='slow')await command('run-tests.mjs',['--scope','fast','--pruned','--output',join(output,'fast')],'fast');
let slowWallMs=null;if(values.scope!=='fast'&&!stopping){const slowStart=performance.now();await command('run-tests.mjs',['--scope','slow','--pruned','--output',join(output,'canonical-slow')],'canonical-slow');if(!stopping)await command('run-recipes.mjs',['--output',join(output,'recipes')],'recipes');slowWallMs=performance.now()-slowStart;}
const report={scope:values.scope,runs,stoppedForInfrastructureOrSignal:stopping,unrunLanes:(values.scope==='all'?['fast','canonical-slow','recipes']:values.scope==='fast'?['fast']:['canonical-slow','recipes']).filter(id=>!runs.some(run=>run.id===id)),slowWallMs,wallMs:performance.now()-start,status:runs.some(x=>x.exitCode!==0)?'failed-or-incomplete':'executed-awaiting-human-review'};
await writeFile(join(output,'run.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));process.exitCode=report.status==='failed-or-incomplete'?1:0;
