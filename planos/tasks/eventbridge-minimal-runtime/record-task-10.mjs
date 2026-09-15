import fs from 'node:fs';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const root='docs/qa/evidence/eventbridge-minimal-runtime/task-10/20260912';fs.mkdirSync(root,{recursive:true});
for(const log of ['interface','desktop','desktop-fixed','final','appearance'])fs.copyFileSync(`/tmp/eventbridge-task10-${log}.log`,`${root}/${log}.log`);
fs.copyFileSync('/tmp/eventbridge-task10-startup-inspection.txt',`${root}/startup-inspection.txt`);
const manifest=JSON.parse(fs.readFileSync('rpg-maker/tests/test-manifest.json'));
for(const id of ['IT-001','IT-025','IT-026','IT-027','IT-038','IT-055','IT-065','IT-077','IT-078']){
 const owner=Object.entries(manifest.tasks).find(([,ids])=>ids.includes(id))[0];fs.cpSync(`docs/qa/evidence/init-rpg-maker-mz/task-${owner}/${id}`,`${root}/${id}`,{recursive:true});
}
// The desktop fixture's screenshots and geometry are kept with its historical suite folder.
fs.cpSync('docs/qa/evidence/init-rpg-maker-mz/task-11/IT-078',`${root}/IT-078/desktop`,{recursive:true});
const files=['data/CommonEvents.json','data/Map002.json','js/plugins.js','js/plugins/Dryland_EventBridge.js','js/plugins/Dryland_Presentation.js','js/plugins/VisuMZ_0_CoreEngine.js','js/plugins/VisuMZ_2_ExtMessageFunc.js','js/plugins/VisuMZ_4_MessageVisibility.js'];
fs.writeFileSync(`${root}/candidate.json`,JSON.stringify({revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:execFileSync('git',['status','--short'],{encoding:'utf8'}),node:process.version,origin:'http://127.0.0.1:18726/',saveProvenance:'isolated native integration fixtures in temporary Chrome profiles',sha256:Object.fromEntries(files.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(`rpg-maker/The Dryland Drowned/${file}`)).digest('hex')]))},null,2)+'\n');
