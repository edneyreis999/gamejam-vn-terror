import { prepare } from '../../../rpg-maker/qa/directed-adapter.mjs';
import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
const [task, surface = 'bust-tavern', kind = 'surface'] = process.argv.slice(2);
if (!/^0[1-9]$/.test(task) || !['surface', 'journey'].includes(kind)) throw Error('Usage: run-directed.mjs <01..09> [case] [surface|journey]');
const root = process.cwd();
const parent = path.join(root, 'docs/qa/evidence/vn-picture-busts-dialogues', `task-${task}`);
await mkdir(parent, { recursive: true });
const output = path.join(parent, `directed-${surface}-${new Date().toISOString().replace(/[:.]/g,'-')}`);
process.env.DRYLAND_QA_SURFACE = surface;
const prepared = await prepare({ project: root });
try {
 const args = ['.agents/skills/rpg-maker-mz-qa-execution/scripts/directed-browser.mjs','--project',root,'--fixture',prepared.fixture,
 '--case',path.join(root,`rpg-maker/qa/native-${kind === 'journey' ? 'journeys' : 'surfaces'}.test.mjs`),'--adapter',path.join(root,'rpg-maker/qa/directed-adapter.mjs'),'--output',output];
 const child = spawn(process.execPath,args,{cwd:root,env:{...process.env,DRYLAND_QA_SURFACE:surface,DRYLAND_QA_JOURNEY:surface},stdio:'inherit'});
 process.exitCode = await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',resolve);});
 console.log(JSON.stringify({output,code:process.exitCode}));
} finally { await rm(path.dirname(prepared.fixture),{recursive:true,force:true}); }
