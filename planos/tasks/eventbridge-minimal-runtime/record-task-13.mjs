import fs from 'node:fs';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const root='docs/qa/evidence/eventbridge-minimal-runtime/task-13/20260912';fs.mkdirSync(root,{recursive:true});
for(const name of ['native','scroll','file-identity'])fs.copyFileSync(`/tmp/eventbridge-task13-${name}.log`,`${root}/${name}.log`);
for(const id of ['IT-022','IT-058'])fs.cpSync(`docs/qa/evidence/init-rpg-maker-mz/task-10/${id}`,`${root}/${id}`,{recursive:true});
const files=['data/CommonEvents.json','js/plugins.js','js/plugins/Dryland_EventBridge.js','js/plugins/Dryland_Presentation.js','js/rmmz_windows.js'];
fs.writeFileSync(`${root}/candidate.json`,JSON.stringify({revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),dirty:execFileSync('git',['status','--short'],{encoding:'utf8'}),node:process.version,origin:'http://127.0.0.1:18726/',viewport:{width:1280,height:720},zoom:100,motion:'normal',sha256:Object.fromEntries(files.map(file=>[file,crypto.createHash('sha256').update(fs.readFileSync(`rpg-maker/The Dryland Drowned/${file}`)).digest('hex')]))},null,2)+'\n');
