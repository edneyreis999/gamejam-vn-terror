import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { entry } from '../helpers/native-shared.mjs';
const historic=vm.createContext({});historic.window=historic;
for(const name of ['data','narrative'])vm.runInContext(await readFile(`prototype/${name}.js`,'utf8'),historic);
const baseline=JSON.parse(JSON.stringify(historic.ExpeditionNarrative));
const source=JSON.parse(JSON.stringify(historic.ExpeditionData));
const normalize=text=>text.replace(/\s+/g,' ').trim();
canonicalCase('IT-047','all193 original passages and160 reading plans resolve to real native authored content including both lover orders',{timeout:60000},async t=>{
 const browser=await entry(t);
 const native=await browser.evaluate(`(()=>{const passages={},scenes={};for(const event of $dataCommonEvents.filter(Boolean)){let section=null;for(const c of event.list){if([108,408].includes(c.code)){for(const line of String(c.parameters[0]).split('\\n')){if(line.startsWith('@scene ')&&!section){const s=JSON.parse(line.slice(7));scenes[s.id]=s;}else if(line.startsWith('@dryland-section ')){section={id:line.slice(17),text:[],choices:[]};passages[section.id]=section;}else if(line==='@dryland-end')section=null;else if(section&&/^@(speaker|status|source) /.test(line)){const at=line.indexOf(' ');section[line.slice(1,at)]=line.slice(at+1);}}}else if(section&&c.code===401)section.text.push(c.parameters[0]);else if(section&&c.code===102)section.choices=c.parameters[0];}}return {passages,scenes};})()`);
 assert.equal(Object.keys(baseline.passages).length,193);assert.equal(Object.keys(baseline.scenes).length,160);
 assert.equal(Object.keys(native.passages).length,258);
 for(const [id,p]of Object.entries(baseline.passages)){
  const actual=native.passages[id];assert.ok(actual,id);assert.ok(actual.source&&actual.status,id);
  let expected=p.text;
  if(p.heroText)expected=source.heroes[p.heroText.heroId][p.heroText.field];
  if(p.encounterText){const ref=p.encounterText,e=source.encounters[ref.encounterId];expected=ref.approachId?e.approaches.find(a=>a.id===ref.approachId)[ref.field]:e[ref.field];}
  // The accepted native receipt contract replaces only these two lines;
  // their stable passage IDs still own the original reward boundaries.
  if(id==='reward.physical')expected='Você recebeu a peça anã do mapa.';
  if(id==='reward.supernatural')expected='Você recebeu a peça élfica do mapa.';
  assert.equal(normalize(actual.text.join('\n')),normalize(expected),id);
 }
 for(const [id,s]of Object.entries(baseline.scenes))assert.deepEqual(native.scenes[id].passageIds,s.passageIds,id);
 for(let i=1;i<=8;i++)for(const prefix of ['profile','speech','selection','party_full','farewell','opinion','epilogue']){
  const passage=native.passages[`${prefix}.H${i}`];assert.ok(passage?.text.join('').trim(),`${prefix}.H${i}`);
 }
 for(const family of ['A','B'])for(let i=1;i<=8;i++)assert.equal(native.passages[`choices.${family}${i}`].choices.length,3);
 for(const route of ['physical','supernatural']){
  const first=native.scenes[`lover.${route}.first`].passageIds,second=native.scenes[`lover.${route}.second`].passageIds;
  assert.equal(first.includes(`lover.${route}.second`),false);assert.equal(second.includes(`lover.${route}.second`),true);
 }
});
