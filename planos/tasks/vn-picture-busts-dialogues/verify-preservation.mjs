import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root=process.cwd(),project=path.join(root,'rpg-maker/The Dryland Drowned');
const baseline=JSON.parse(await readFile(path.join(root,'docs/qa/evidence/vn-picture-busts-dialogues/task-01/baseline-20260911/baseline-manifest.json')));
const bytes=await readFile(path.join(project,'data/CommonEvents.json'));
const events=JSON.parse(bytes),system=JSON.parse(await readFile(path.join(project,'data/System.json')));
const manifest=JSON.parse(await readFile(path.join(project,'native-layout-manifest.json')));
const require=createRequire(import.meta.url),{parseEventCatalog}=require(path.join(project,'js/plugins/Dryland_EventBridge.js'));
const current=parseEventCatalog(events,{...system,drylandAssets:manifest.assets});
assert.deepEqual(current.violations,[]);assert.deepEqual(current.catalog,baseline.catalog);
const ledger=[];
for(const [id,section] of Object.entries(baseline.sections)){
 const location=current.locations[id],commands=events[location.commonEventId].list.slice(location.start,location.end);
 const unchanged=commands.filter(command=>![111,117,230,357,411,412,657].includes(command.code));
 assert.deepEqual(unchanged,section.commands,`Original content changed: ${id}`);
 const target=/^(profile|speech|selection|party_full|farewell|epilogue|opinion)\.H[1-8]$/.test(id)||/^lover\.(physical|supernatural)\.(warning|second)$/.test(id)||/^council\.(solo|confession|andira)$/.test(id);
 if(target||id==='council.challenge')ledger.push({id,originalTarget:target,boxes:commands.filter(x=>x.code===101).length,commonEventId:location.commonEventId,start:location.start,end:location.end,nativePresentation:commands.some(x=>[117,357].includes(x.code))});
}
assert.equal(ledger.filter(x=>x.originalTarget).length,63);assert.equal(ledger.filter(x=>x.originalTarget).reduce((n,x)=>n+x.boxes,0),103);
const plugin=await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js'),'utf8');
if(process.argv.includes('--complete')){
 assert.ok(ledger.every(x=>x.nativePresentation));
 assert.equal(/speakerBust|bustToken/.test(plugin),false);
}
const editable=new Set(['data/CommonEvents.json','data/System.json','js/plugins/Dryland_EventBridge.js','native-layout-manifest.json']);
let preservedFiles=0;
for(const [file,expected] of Object.entries(baseline.fingerprints)){
 if(editable.has(file))continue;
 assert.equal(createHash('sha256').update(await readFile(path.join(project,file))).digest('hex'),expected,`Unexpected source/asset change: ${file}`);
 preservedFiles++;
}
const output=process.argv.find(x=>x.startsWith('--output='))?.slice(9);
const report={preservedFiles,revision:manifest.nativeLayoutVersion,commonEventsSha256:createHash('sha256').update(bytes).digest('hex'),sections:Object.keys(current.locations).length,boxes:Object.values(baseline.sections).reduce((n,x)=>n+x.commands.filter(c=>c.code===101).length,0),originalTargets:63,originalTargetBoxes:103,migratedTargets:ledger.filter(x=>x.originalTarget&&x.nativePresentation).length,challenge:ledger.find(x=>!x.originalTarget),ledger};
assert.equal(report.sections,258);assert.equal(report.boxes,282);
if(output){await mkdir(path.dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n',{flag:'wx'});}
console.log(JSON.stringify({...report,ledger:undefined}));
