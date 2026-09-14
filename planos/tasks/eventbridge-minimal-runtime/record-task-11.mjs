import fs from 'node:fs';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const root='docs/qa/evidence/eventbridge-minimal-runtime/task-11/20260912';fs.mkdirSync(root,{recursive:true});
for(const log of ['smoke','io','files','native-files','terminal-revision','boundary-index'])fs.copyFileSync(`/tmp/eventbridge-task11-${log}.log`,`${root}/${log}.log`);
fs.copyFileSync('/tmp/eventbridge-task11-selection.txt',`${root}/provider-selection.txt`);fs.copyFileSync('/tmp/save-selection.png',`${root}/file-selection.png`);
const manifest=JSON.parse(fs.readFileSync('rpg-maker/tests/test-manifest.json'));
for(const id of ['IT-001','IT-014','IT-015','IT-016','IT-017','IT-018','IT-019','IT-020','IT-021','IT-023','IT-024','IT-039','IT-044','IT-045','IT-048','IT-059']){
 const owner=Object.entries(manifest.tasks).find(([,ids])=>ids.includes(id))[0];fs.cpSync(`docs/qa/evidence/init-rpg-maker-mz/task-${owner}/${id}`,`${root}/${id}`,{recursive:true});
}
// Native checkpoint suite stores its runtime stack log in its existing shared-UI folder.
fs.cpSync('docs/qa/evidence/init-rpg-maker-mz/task-11/IT-014',`${root}/IT-014/runtime`,{recursive:true});
const files=['data/CommonEvents.json','data/Map001.json','data/Map002.json','js/plugins.js','js/plugins/Dryland_EventBridge.js','js/plugins/Dryland_Presentation.js','js/plugins/VisuMZ_1_SaveCore.js','js/plugins/VisuMZ_4_EventTitleScene.js'];
fs.writeFileSync(`${root}/candidate.json`,JSON.stringify({revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:execFileSync('git',['status','--short'],{encoding:'utf8'}),node:process.version,origin:'http://127.0.0.1:18726/',viewport:{width:1280,height:720},zoom:100,saveProvenance:'IT024 A/B prefixes earned by native player actions and browser restarts; other structural/I/O/closing prefixes are explicitly isolated fixtures; full campaign archives belong to task16',sha256:Object.fromEntries(files.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(`rpg-maker/The Dryland Drowned/${file}`)).digest('hex')]))},null,2)+'\n');
const events=JSON.parse(fs.readFileSync('rpg-maker/The Dryland Drowned/data/CommonEvents.json'));
fs.writeFileSync(`${root}/authored-checkpoints.json`,JSON.stringify(events.filter(Boolean).flatMap(event=>event.list.flatMap((command,index)=>command.code===357&&command.parameters[0]==='Dryland_EventBridge'&&command.parameters[1]==='Checkpoint'?[{commonEvent:event.id,name:event.name,index,reason:command.parameters[3].reason}]:[])),null,2)+'\n');
