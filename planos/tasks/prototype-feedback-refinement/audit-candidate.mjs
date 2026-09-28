import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root='planos/tasks/prototype-feedback-refinement/',output='docs/qa/evidence/prototype-feedback-refinement/task-13';
const git=(...args)=>execFileSync('git',['-c','core.quotePath=false',...args],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const names=[...new Set([...git('diff','--name-only','-z').split('\0'),...git('ls-files','--others','--exclude-standard','-z').split('\0'),root+'candidate-audit.md'].filter(Boolean))];
const ownedData=new Set(['CommonEvents.json','System.json',...Array.from({length:44},(_,i)=>i+1).filter(id=>id===2||(id>=7&&id<=23)||id>=29).map(id=>'Map'+String(id).padStart(3,'0')+'.json')]);
const rows=names.map(path=>{
 let owner,disposition,reason;
 if(path.startsWith('rpg-maker/The Dryland Drowned/')){
  const name=path.split('/').at(-1);
  if(ownedData.has(name)||/^Dryland_(CampaignRules|EventBridge|Presentation)\.js$/.test(name)||path.includes('/img/pictures/')){owner='Tasks 01–11';disposition='keep';reason='Native behavior, domain/presentation integration or final art consumed by the approved increment; mixed pre-existing edits remain preserved.';}
  else {owner='Pre-existing user work';disposition='defer';reason='Outside this increment’s mutation ownership; preserved, not implicitly accepted for versioning.';}
 }else if(path.startsWith('rpg-maker/tests/')||path.startsWith('rpg-maker/qa/')){owner='Canonical verification / directed QA';disposition='keep';reason='Maintained tests and public-input navigation for the changed native contracts.';}
 else if(path.startsWith(root)){
  owner='Approved spec / execution record';
  if(/(?:apply-task|update-task|finish-task|measure-task|add-task|repair-directed|update-qa-plan|native-authoring).*\.mjs$/.test(path)){disposition='archive';reason='One-shot historical transformation, not an idempotent maintenance command. Preserve source/evidence provenance locally; propose exclusion from maintained tooling after acceptance.';}
  else{disposition='keep';reason='Authority, task tracking, reproducible directed case/request or independent review needed to understand and verify the delivery.';}
 }else if(path.startsWith('docs/qa/')){owner='QA planning / results';disposition='keep';reason='Existing scenario and bug owners retain history and current increment; new guide/charter has no duplicate verdict authority.';}
 else {owner='Pre-existing design/history/user work';disposition='defer';reason='Preserved pending work outside implementation ownership; canonical GDD remains authority, but execution does not approve all unrelated hunks.';}
 return {path,owner,disposition,reason};
});
mkdirSync(output,{recursive:true});
const result={capturedAt:new Date().toISOString(),head:git('rev-parse','HEAD'),index:git('diff','--cached','--name-only'),rows};
const counts=Object.fromEntries(['keep','archive','defer'].map(key=>[key,rows.filter(r=>r.disposition===key).length]));
writeFileSync(root+'candidate-audit.md',`# Candidate audit — prototype feedback refinement\n\nRead-only pre-acceptance proposal, captured ${result.capturedAt}. Base HEAD: \`${result.head}\`. No staging, commit, deletion, archive move or delivery acceptance occurs here. Current lifecycle remains in verification.md.\n\nCounts: ${JSON.stringify(counts)}. Every path and exact hash is in the [local inventory](../../../${output}/candidate-inventory.json); raw evidence is local-only and is not a fresh-clone dependency.\n\n| Group | Disposition | Maintained value / boundary |\n| --- | --- | --- |\n| Native scoped data, three Dryland plugins and final PNGs | keep | Required by events/runtime; preserve mixed user edits. Independent review checks the full frozen runtime. |\n| Canonical tests and directed QA helpers/case | keep | Current executable proof and public navigation; no external campaign/save dependency. |\n| Approved spec/contracts/tasks and QA owners | keep | Decisions, expected effects, results, failures and limitations remain understandable without the conversation. |\n| One-shot authoring/test-generator/finish scripts | archive (proposal) | Historical transformations are not safe to rerun on the final tree. Preserve their causal value; do not advertise them as current commands. No deletion or move before acceptance. |\n| Pre-existing unrelated data/configuration/design edits | defer | Preserve exactly; this delivery does not automatically approve their broader versioned set. |\n| Raw recordings/archives/test logs | local archive | Retain first failures and genuine save parents. Select review media separately; no claim that ignored local bytes are long-term backup. |\n\nFresh-clone review: game sources and final PNGs are maintained inputs; no build/new game dependency. Canonical tests generate isolated saves. Directed cases need the installed QA skill plus its declared Playwright/FFmpeg prerequisites; native Editor round-trip and human judgments remain distinct. Task receipt links intentionally identify local historical evidence, while durable notes preserve commands, IDs, outcomes and limitations. Absolute paths in raw archives describe this machine and are not executable setup instructions.\n\nThe installed executor needed a Windows separator correction outside the game candidate. Its materialized repair script records that environmental repair; it is not a new game runtime contract. Final audit must be refreshed after any remaining implementation or sensor correction. Selected review/devlog media, link checks, final human acceptance and post-acceptance organization are still pending.\n`);
const hashFile=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
for(const row of rows)row.sha256=hashFile(row.path);
const assetHashes={};
function visitAssets(path){for(const entry of readdirSync(path,{withFileTypes:true})){const file=path+'/'+entry.name;if(entry.isDirectory())visitAssets(file);else if(entry.isFile())assetHashes[file]=hashFile(file);}}
for(const directory of ['img/pictures','audio','fonts'])visitAssets('rpg-maker/The Dryland Drowned/'+directory);
result.assetHashes=assetHashes;
result.assetBoundary='Canonical execution.json covers source/data/helpers, not asset bytes. This supplement and directed fixture descriptors bind final PNG/audio/font bytes; retain earlier receipts only for unchanged assets and invalidate affected render/audio scopes on replacement.';
writeFileSync(output+'/candidate-inventory.json',JSON.stringify(result,null,2)+'\n');
for(const row of rows)if(hashFile(row.path)!==row.sha256)throw Error('Candidate changed during audit: '+row.path);
console.log(JSON.stringify({head:result.head,paths:rows.length,assets:Object.keys(assetHashes).length,counts,index:result.index}));
