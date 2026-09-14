import fs from 'node:fs';import crypto from 'node:crypto';
const root='docs/qa/evidence/eventbridge-minimal-runtime/task-06/20260912';fs.mkdirSync(root,{recursive:true});
for(const log of ['absence','final','captions','native-lines','caption-scale'])fs.copyFileSync(`/tmp/eventbridge-task06-${log}.log`,`${root}/${log}.log`);
const manifest=JSON.parse(fs.readFileSync('rpg-maker/tests/test-manifest.json'));
for(const id of ['UT-030','IT-009','IT-010','IT-011','IT-013','IT-055','IT-056','IT-057']){
 const owner=Object.entries(manifest.tasks).find(([,ids])=>ids.includes(id))[0];fs.cpSync(`docs/qa/evidence/init-rpg-maker-mz/task-${owner}/${id}`,`${root}/${id}`,{recursive:true});
}
const files=['data/CommonEvents.json','data/System.json','js/plugins.js','js/plugins/Dryland_CampaignRules.js','js/plugins/Dryland_EventBridge.js','js/plugins/Dryland_Presentation.js',...Array.from({length:8},(_,i)=>`img/pictures/Dryland_Memorial_H${i+1}.png`)];
fs.writeFileSync(`${root}/source-hashes.json`,JSON.stringify(Object.fromEntries(files.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(`rpg-maker/The Dryland Drowned/${file}`)).digest('hex')])),null,2)+'\n');
