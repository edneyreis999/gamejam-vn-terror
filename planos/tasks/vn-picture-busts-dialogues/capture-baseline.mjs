import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = process.cwd(), project = path.join(root, 'rpg-maker/The Dryland Drowned');
const out = path.join(root, 'docs/qa/evidence/vn-picture-busts-dialogues/task-01/baseline-20260911');
await mkdir(out, { recursive: true });
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const require = createRequire(import.meta.url);
const { parseEventCatalog } = require(path.join(project, 'js/plugins/Dryland_EventBridge.js'));
async function files(dir) {
 const result = [];
 for (const entry of await readdir(dir, { withFileTypes: true })) {
  const file = path.join(dir, entry.name);
  if (entry.isDirectory()) result.push(...await files(file)); else result.push(file);
 }
 return result;
}
const fingerprints = {};
for (const dir of ['data', 'js', 'img', 'audio']) for (const file of await files(path.join(project, dir))) fingerprints[path.relative(project,file)] = hash(await readFile(file));
for (const name of ['native-layout-manifest.json', 'game.rmmzproject']) fingerprints[name] = hash(await readFile(path.join(project,name)));
for (const name of ['data/CommonEvents.json','data/System.json','native-layout-manifest.json','js/plugins/Dryland_EventBridge.js','js/plugins.js']) {
 const target = path.join(out,name); await mkdir(path.dirname(target),{recursive:true});
 await writeFile(target,await readFile(path.join(project,name)),{flag:'wx'});
 if(hash(await readFile(target))!==fingerprints[name]) throw Error('Baseline readback mismatch');
}
const events = JSON.parse(await readFile(path.join(project,'data/CommonEvents.json')));
const system = JSON.parse(await readFile(path.join(project,'data/System.json')));
const parsed = parseEventCatalog(events,{...system,drylandAssets:Object.keys(fingerprints).filter(f=> /^(img|audio)\//.test(f))});
if(parsed.violations.length) throw Error(JSON.stringify(parsed.violations));
const sections=Object.fromEntries(Object.entries(parsed.locations).map(([id,loc])=>[id,{...loc,metadata:parsed.catalog.passages[id],commands:events[loc.commonEventId].list.slice(loc.start,loc.end)}]));
await writeFile(path.join(out,'baseline-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),node:process.version,dirty:execFileSync('git',['status','--short'],{encoding:'utf8'}),fingerprints,sections,catalog:parsed.catalog},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({out,files:Object.keys(fingerprints).length,sections:Object.keys(sections).length,boxes:Object.values(sections).flatMap(s=>s.commands).filter(c=>c.code===101).length,variables:system.variables.length,commonEvents:events.length}));
