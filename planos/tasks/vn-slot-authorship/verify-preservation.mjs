// Historical comparison against the local pre-migration snapshot; read-only game data.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
const root='rpg-maker/The Dryland Drowned',out='docs/qa/evidence/vn-slot-authorship';
const read=async p=>JSON.parse(await readFile(p));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const baseline=await read(`${out}/baseline.json`),old=await read(`${out}/baseline/data/CommonEvents.json`),events=await read(`${root}/data/CommonEvents.json`);
const system=await read(`${root}/data/System.json`),layout=await read(`${root}/native-layout-manifest.json`);
system.drylandAssets=layout.assets;
const {parseEventCatalog}=createRequire(import.meta.url)(`${process.cwd()}/${root}/js/plugins/Dryland_EventBridge.js`);
const before=parseEventCatalog(old,system),after=parseEventCatalog(events,system);
assert.deepEqual(before.violations,[]);assert.deepEqual(after.violations,[]);assert.deepEqual(before.catalog,after.catalog);
const content=commands=>commands.filter(c=>![111,117,230,357,411,412,657].includes(c.code)).map(c=>c.code===108?{...c,parameters:c.parameters.map(s=>s.replace(/\n@visualFrom [^\n]+/g,''))}:c);
let boxes=0;
for(const [id,location]of Object.entries(before.locations)){
 const target=after.locations[id];assert.equal(target.commonEventId,location.commonEventId,id);
 const a=content(old[location.commonEventId].list.slice(location.start,location.end));
 const b=content(events[target.commonEventId].list.slice(target.start,target.end));
 assert.deepEqual(b,a,id);boxes+=b.filter(c=>c.code===101).length;
}
for(let id=1;id<=67;id++)for(const key of ['id','name','trigger','switchId'])assert.equal(events[id][key],old[id][key]);
const helpers=Object.values(after.helpers);assert.equal(helpers.length,12);assert.ok(helpers.every(h=>!h.name.startsWith('restore.')));
for(const [file,digest]of Object.entries(baseline.protected))assert.equal(hash(await readFile(`${root}/${file}`)),digest,file);
assert.equal(hash(await readFile(`${root}/package.json`)),baseline.packageSha256,'Preserve unrelated package edit');
const result={revision:layout.nativeLayoutVersion,sections:Object.keys(after.locations).length,boxes,helpers:helpers.length,protectedFiles:Object.keys(baseline.protected).length,packagePreserved:true,sourceSha256:hash(await readFile(`${root}/data/CommonEvents.json`))};
await writeFile(`${out}/preservation.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
