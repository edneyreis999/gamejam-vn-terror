import fs from 'node:fs';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const root='docs/qa/evidence/eventbridge-minimal-runtime/task-09/20260912';fs.mkdirSync(root,{recursive:true});
for(const log of ['smoke','provider','boundaries','gates','domain','serialization'])fs.copyFileSync(`/tmp/eventbridge-task09-${log}.log`,`${root}/${log}.log`);
fs.copyFileSync('/tmp/reading-provider-inspection.json',`${root}/provider-before.json`);
const manifest=JSON.parse(fs.readFileSync('rpg-maker/tests/test-manifest.json'));
for(const id of ['UT-041','UT-055','UT-061','IT-001','IT-025','IT-038','IT-050','IT-062','IT-065','IT-071','IT-077']){
 const owner=Object.entries(manifest.tasks).find(([,ids])=>ids.includes(id))[0];fs.cpSync(`docs/qa/evidence/init-rpg-maker-mz/task-${owner}/${id}`,`${root}/${id}`,{recursive:true});
}
const files=['data/CommonEvents.json','data/System.json','js/plugins.js','js/plugins/Dryland_CampaignRules.js','js/plugins/Dryland_EventBridge.js','js/plugins/Dryland_Presentation.js','js/plugins/VisuMZ_2_ExtMessageFunc.js'];
fs.writeFileSync(`${root}/candidate.json`,JSON.stringify({revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:execFileSync('git',['status','--short'],{encoding:'utf8'}),node:process.version,origin:'http://127.0.0.1:18726/',viewport:{width:1280,height:720},zoom:100,motion:'normal',saveProvenance:'labeled isolated native integration fixtures; separate temporary Chrome profiles; file0 serialization before task11 slot migration',sha256:Object.fromEntries(files.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(`rpg-maker/The Dryland Drowned/${file}`)).digest('hex')]))},null,2)+'\n');
