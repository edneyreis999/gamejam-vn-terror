import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const project='rpg-maker/The Dryland Drowned', file=`${project}/data/CommonEvents.json`;
const bytes=await readFile(file), baseline=await readFile('docs/qa/evidence/vn-slot-authorship/baseline/data/CommonEvents.json');
assert.equal(createHash('sha256').update(bytes).digest('hex'),createHash('sha256').update(baseline).digest('hex'),'Current native source changed since baseline');
const events=JSON.parse(bytes), old=structuredClone(events), system=JSON.parse(await readFile(`${project}/data/System.json`));
const layout=JSON.parse(await readFile(`${project}/native-layout-manifest.json`));system.drylandAssets=layout.assets;
const {parseEventCatalog}=createRequire(import.meta.url)(`${process.cwd()}/${project}/js/plugins/Dryland_EventBridge.js`);
const parsed=parseEventCatalog(events,system);assert.deepEqual(parsed.violations,[]);assert.equal(events.length,216);
const c=(code,parameters=[],indent=0)=>({code,indent,parameters});
const plugin=(name,args)=>c(357,['VisuMZ_2_VNPictureBusts',name,name,args]);
const call=id=>c(117,[id]);
const branch=(variable,hero,body)=>[c(111,[1,variable,0,hero,0]),...body.map(cmd=>({...cmd,indent:cmd.indent+1})),c(412)];
const focus=slot=>c(357,['Dryland_EventBridge','Focus','Foco por posição',{slot:String(slot),listenerScale:'90',listenerTone:'[-24,-24,-24,0]',offset:'16',duration:'20'}]);
function entry(slot,art,{x=slot<63?320:960,y=850,scale=100,offset=-32}={}) {
 const ids=JSON.stringify([String(slot)]);
 return [plugin('Basic_EnterBust',{'PictureID:eval':String(slot),'PictureName:str':`Dryland_${art}`,'Origin:str':'Bust','Position:num':slot<63?'2':'8','StartOffsetX:eval':String(offset),'StartOffsetY:eval':'0','EasingType:str':'OutSine','HorzMirror:str':'None','Duration:eval':'20'}),
 plugin('Scale_ScaleTo',{'PictureID:arrayeval':ids,'TargetScaleX:str':String(scale),'TargetScaleY:str':String(scale),'Duration:eval':'0'}),
 plugin('Move_MoveToCoordinates',{'PictureID:arrayeval':ids,'TargetX:str':String(x),'TargetY:str':String(y),'EasingType:str':'InOutSine','FlipDirection:str':'None','Duration:eval':'0'}),
 plugin('Tone_NormalBust',{'PictureID:arrayeval':ids,'Duration:eval':'0'})];
}
const exit=(slots,offset=-32)=>[plugin('Basic_ExitBusts',{'PictureID:arrayeval':JSON.stringify(slots.map(String)),'EndOffsetX:eval':String(offset),'EndOffsetY:eval':'0','EasingType:str':'InSine','FlipDirection:str':'None','Duration:eval':'20','AutoErase:eval':'true'}),c(230,[20])];
const helpers=[];
const helper=(name,list)=>{const id=68+helpers.length;helpers.push({id,name:`Bustos — ${name}`,trigger:0,switchId:1,list:[c(108,[`@dryland-presentation-helper ${name}`]),...list,c(0)]});return id;};
for(let slot=60;slot<=64;slot++)assert.equal(helper(`focus.slot${slot}`,[focus(slot)]),68+slot-60);
assert.equal(helper('council.enter',[60,61,62].flatMap(slot=>Array.from({length:8},(_,i)=>branch(144+slot-60,i+1,entry(slot,`H${i+1}`,{x:200+(slot-60)*220,y:650,scale:60}))).flat())),73);
helper('council.intervention',[...exit([60,61,62]),...entry(65,'andira',{x:330,y:500,scale:100,offset:0}),focus(65)]);
helper('council.return',[...exit([65]),call(73)]);
helper('exit.left',exit([60]));helper('exit.council',exit([60,61,62,63,65]));helper('exit.right',exit([63],0));helper('focus.neutral',[focus(0)]);
assert.equal(helpers.length,12);
const replacement=new Map([[68,[call(76)]],[69,exit([60,63])],[70,entry(63,'ivai')],[95,[call(73),call(79)]],[96,[call(71)]],[97,entry(63,'ivai')],[98,[call(74)]],[99,[call(75)]],[100,[call(77)]],[109,entry(63,'perola',{offset:0})],[110,entry(63,'florai',{offset:0})],[111,[call(78)]]]);
for(let hero=1;hero<=8;hero++){
 const first=71+(hero-1)*3;
 replacement.set(first,entry(60,`H${hero}`));replacement.set(first+1,[call(68)]);replacement.set(first+2,[call(71)]);
 replacement.set(100+hero,[144,145,146].flatMap((variable,slot)=>branch(variable,hero,[call(68+slot)])));
}
for(const event of events.slice(1,68)){
 event.list=event.list.flatMap(command=>{
  if(command.code!==117||command.parameters[0]<68)return [command];
  const body=replacement.get(command.parameters[0]);assert.ok(body,`Unexpected external helper ${command.parameters[0]}`);
  return structuredClone(body).map(cmd=>({...cmd,indent:cmd.indent+command.indent}));
 });
 for(const command of event.list){
  if(command.code!==108||!command.parameters[0].startsWith('@dryland-section '))continue;
  const id=command.parameters[0].split('\n')[0].slice(17);
  let source;
  if(/^speech\.H[1-8]$/.test(id))source=id.replace('speech.','profile.');
  if(id==='council.confession')source='council.challenge council.solo';
  if(id==='council.andira'||/^opinion\.H[1-8]$/.test(id))source='council.confession';
  if(source)command.parameters[0]+=`\n@visualFrom ${source}`;
 }
}
events.splice(68,events.length-68,...helpers);
const after=parseEventCatalog(events,system);assert.deepEqual(after.violations,[]);assert.deepEqual(after.catalog,parsed.catalog);
assert.equal(Object.keys(after.helpers).length,12);
const story=xs=>xs.filter(x=>![117,357,657,230,111,411,412].includes(x.code)).map(x=>x.code===108?{...x,parameters:x.parameters.map(s=>s.replace(/\n@visualFrom [^\n]+/g,''))}:x);
for(const [id,before]of Object.entries(parsed.locations)){
 const loc=after.locations[id];assert.deepEqual(story(events[loc.commonEventId].list.slice(loc.start,loc.end)),story(old[before.commonEventId].list.slice(before.start,before.end)),id);
}
for(const event of events.filter(Boolean))for(const command of event.list)if(command.code===117)assert.ok(events[command.parameters[0]],`Missing caller ${event.id}`);
await writeFile(file,`[\n${events.map(x=>JSON.stringify(x)).join(',\n')}\n]\n`);
await writeFile('docs/qa/evidence/vn-slot-authorship/migration.json',JSON.stringify({beforeSha256:createHash('sha256').update(bytes).digest('hex'),afterSha256:createHash('sha256').update(await readFile(file)).digest('hex'),helpers:helpers.map(({id,name})=>({id,name})),preservedSections:Object.keys(after.locations).length,visualSources:after.visualSources},null,2)+'\n');
console.log(JSON.stringify({helpers:12,ids:'68–79',sections:Object.keys(after.locations).length}));
