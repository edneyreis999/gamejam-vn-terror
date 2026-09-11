import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = process.cwd(), project = path.join(root, 'rpg-maker/The Dryland Drowned');
const evidence = path.join(root, 'docs/qa/evidence/vn-picture-busts-dialogues');
const baseline = JSON.parse(await readFile(path.join(evidence,'task-01/baseline-20260911/baseline-manifest.json')));
const phase = process.argv[2];
if (!['tavern','council','remaining','recovery'].includes(phase)) throw Error('Supported phases: tavern, council, remaining, recovery');
const target = path.join(project, 'data/CommonEvents.json'), bytes = await readFile(target);
const hash = value => createHash('sha256').update(value).digest('hex');
const prior = phase === 'tavern' ? baseline.fingerprints['data/CommonEvents.json'] : JSON.parse(await readFile(path.join(evidence,{council:'task-02/migration-tavern/receipt.json',remaining:'task-03/migration-council/receipt.json',recovery:'task-04/migration-remaining/receipt.json'}[phase]))).after;
assert.equal(hash(bytes), prior, 'Refusing to overwrite changed native authorship');
const events = JSON.parse(bytes), system = JSON.parse(await readFile(path.join(project,'data/System.json')));
const firstHelper=events.length;
assert.equal(events.length,{tavern:68,council:95,remaining:109,recovery:112}[phase]); assert.equal(system.variables.length,['remaining','recovery'].includes(phase)?147:144);
const require = createRequire(import.meta.url);
const {parseEventCatalog} = require(path.join(project,'js/plugins/Dryland_EventBridge.js'));
const c = (code,parameters=[],indent=0) => ({code,indent,parameters});
const command = (name,args) => c(357,['VisuMZ_2_VNPictureBusts',name,name,args]);
const bridge = (operation,indent) => c(357,['Dryland_EventBridge','Conversation','Conversation',{operation,kind:phase}],indent);
const call = id => c(117,[id]);
const layouts = {
 H1:{x:310,y:950,scale:46}, H2:{x:260,y:1230,scale:34}, H3:{x:310,y:1090,scale:48},
 H4:{x:365,y:1140,scale:34}, H5:{x:325,y:1155,scale:47}, H6:{x:325,y:1180,scale:48},
 H7:{x:370,y:1260,scale:35}, H8:{x:265,y:1075,scale:48}, ivai:{x:955,y:855,scale:52}
};
function helper(name,list) {
 const id=events.length; events.push({id,name:`Bustos — ${name}`,trigger:0,switchId:1,list:[c(108,[`@dryland-presentation-helper ${name}`]),...list,c(0)]}); return id;
}
function focus(id,art,active,duration=20,layout=layouts[art]) {
 const ids=JSON.stringify([String(id)]), scale=String(Number((layout.scale*(active?1:0.9)).toFixed(3)));
 return [command('Scale_ScaleTo',{'PictureID:arrayeval':ids,'TargetScaleX:str':scale,'TargetScaleY:str':scale,'Duration:eval':String(duration)}),
 command('Move_MoveToCoordinates',{'PictureID:arrayeval':ids,'TargetX:str':String(layout.x+(active && !['andira','perola','florai'].includes(art)?(id<63?16:-16):0)),'TargetY:str':String(layout.y),'EasingType:str':'InOutSine','FlipDirection:str':'None','Duration:eval':String(duration)}),
 command(active?'Tone_NormalBust':'Tone_CustomToneBust',{'PictureID:arrayeval':ids,...(active?{}:{'customTone:eval':'[-24,-24,-24,0]'}),'Duration:eval':String(duration)})];
}
function enter(id,art,layout=layouts[art],offset=-32) {
 return [command('Basic_EnterBust',{'PictureID:eval':String(id),'PictureName:str':`Dryland_${art}`,'Origin:str':'Bust','Position:num':id<63?'2':'8','StartOffsetX:eval':String(offset),'StartOffsetY:eval':'0','EasingType:str':'OutSine','HorzMirror:str':'None','Duration:eval':'20'}),...focus(id,art,true,0,layout)];
}
function exit(ids,offset=-32) { return [command('Basic_ExitBusts',{'PictureID:arrayeval':JSON.stringify(ids.map(String)),'EndOffsetX:eval':String(offset),'EndOffsetY:eval':'0','EasingType:str':'InSine','FlipDirection:str':'None','Duration:eval':'20','AutoErase:eval':'true'}),c(230,[20])]; }
const parsed = parseEventCatalog(events, {...system,drylandAssets:Object.keys(baseline.fingerprints).filter(f=>/^(img|audio)\//.test(f))});
const edits=[];
if (phase === 'tavern') {
const exitSingle=helper('tavern.exit-single',exit([60])), exitPair=helper('tavern.exit-pair',exit([60,63]));
const ivaiEnter=helper('tavern.ivai-enter',enter(63,'ivai'));

for(let number=1;number<=8;number++) {
 const art=`H${number}`, entry=helper(`tavern.${art}.enter`,enter(60,art));
 const heroFocus=helper(`tavern.${art}.focus`,[...focus(63,'ivai',false),...focus(60,art,true)]);
 const ivaiFocus=helper(`tavern.${art}.listen`,[...focus(60,art,false),...focus(63,'ivai',true)]);
 for(const family of ['profile','speech','selection','party_full']) {
  const id=`${family}.${art}`, loc=parsed.locations[id], source=events[loc.commonEventId].list.slice(loc.start,loc.end), list=[];
  let box=0;
  for(const original of source) {
   if(original.code===101) {
    if(family==='speech') {
     if(box===0) list.push(call(ivaiEnter));
     if(box<4) list.push(call(box%2===0?ivaiFocus:heroFocus));
    } else if(box===0) list.push(call(entry));
    box++;
   }
   list.push(original);
  }
  if(['selection','party_full'].includes(family)) list.push(call(exitSingle));
  edits.push({id,...loc,list:list.map(command=>({...command,indent:command.indent+loc.indent})),boxes:box});
 }
}
} else if (phase === 'council') {
 system.variables.push('VN Conselho — herói esquerdo 1','VN Conselho — herói esquerdo 2','VN Conselho — herói esquerdo 3');
 const branch=(variable,value,yes,no=[])=>[c(111,[1,variable,0,value,0]),...yes.map(x=>({...x,indent:x.indent+1})),...(no.length?[c(411),...no.map(x=>({...x,indent:x.indent+1}))]:[]),c(412)];
 const councilLayout=(slot,art)=>({x:180+(slot-60)*230+(layouts[art].x-320)*0.6,y:160+(layouts[art].y-160)*0.6,scale:Number((layouts[art].scale*0.6).toFixed(3))});
 const roster=(operation,activeHero=0)=>[60,61,62].flatMap(slot=>Array.from({length:8},(_,i)=>{
  const art=`H${i+1}`,layout=councilLayout(slot,art);
  return branch(144+slot-60,i+1,operation==='enter'?enter(slot,art,layout):focus(slot,art,i+1===activeHero,20,layout));
 }).flat());
 const rosterEnter=helper('council.roster-enter',roster('enter'));
 const rosterListen=helper('council.roster-listen',roster('focus'));
 const ivaiEnter=helper('council.ivai-enter',enter(63,'ivai'));
 layouts.andira={x:330,y:500,scale:31.25};
 const intervention=helper('council.intervention',[...exit([60,61,62]),...focus(63,'ivai',false),...enter(65,'andira')]);
 const restore=helper('council.restore',[...exit([65]),call(rosterEnter)]);
 const exitAll=helper('council.exit',exit([60,61,62,63,65]));
 const recipes={
  'council.challenge':[call(rosterEnter)],
  'council.solo':[call(ivaiEnter)],
  'council.confession':[...branch(144,0,[],[call(ivaiEnter)]),call(rosterListen)],
  'council.andira':[call(intervention)]
 };
 for(let hero=1;hero<=8;hero++){
  const focusHero=helper(`council.H${hero}.focus`,[...roster('focus',hero),...focus(63,'ivai',false)]);
  recipes[`opinion.H${hero}`]=[...branch(144,hero,[call(restore)]),call(focusHero)];
 }
 for(const [id,recipe] of Object.entries(recipes)){
  const loc=parsed.locations[id],source=events[loc.commonEventId].list.slice(loc.start,loc.end),at=source.findIndex(x=>x.code===101);
  source.splice(at,0,...recipe.map(x=>({...x,indent:x.indent+loc.indent})));
  edits.push({id,...loc,list:source,boxes:source.filter(x=>x.code===101).length});
 }
 const council=events[40].list;
 assert.equal(council[182].parameters[1],'Present');
 council.splice(182,0,bridge('begin',2));
 events[53].list.unshift(call(exitAll),bridge('end',0));
} else if (phase === 'remaining') {
 const existing=name=>{
  const found=events.filter(event=>event?.list[0]?.parameters[0]===`@dryland-presentation-helper ${name}`);
  assert.equal(found.length,1);return found[0].id;
 };
 const recipes={};
 for(let n=1;n<=8;n++) for(const family of ['farewell','epilogue'])recipes[`${family}.H${n}`]={entry:existing(`tavern.H${n}.enter`),exit:existing('tavern.exit-single')};
 layouts.perola={x:955,y:855,scale:52};layouts.florai={x:955,y:855,scale:52};
 const entries={};for(const art of ['perola','florai'])entries[art]=helper(`lover.${art}.enter`,enter(63,art,layouts[art],0));
 const exitRight=helper('lover.exit',exit([63],0));
 for(const route of ['physical','supernatural'])for(const stage of ['warning','second'])recipes[`lover.${route}.${stage}`]={entry:entries[route==='physical'?'perola':'florai'],exit:exitRight};
 for(const [id,recipe] of Object.entries(recipes)){
  const loc=parsed.locations[id],source=events[loc.commonEventId].list.slice(loc.start,loc.end),at=source.findIndex(x=>x.code===101);
  source.splice(at,0,{...call(recipe.entry),indent:loc.indent});source.push({...call(recipe.exit),indent:loc.indent});
  edits.push({id,...loc,list:source,boxes:source.filter(x=>x.code===101).length});
 }
} else {
 const existing=name=>{
  const found=events.filter(event=>event?.list[0]?.parameters[0]===`@dryland-presentation-helper ${name}`);
  assert.equal(found.length,1,name);return found[0].id;
 };
 const use=name=>call(existing(name));
 const recovery=(id,box,list)=>helper(`restore.${id}.${box}`,list);
 for(let n=1;n<=8;n++){
  const art=`H${n}`,heroEntry=()=>use(`tavern.${art}.enter`);
  for(const family of ['profile','selection','party_full','farewell','epilogue']){
   const id=`${family}.${art}`,loc=parsed.locations[id],count=events[loc.commonEventId].list.slice(loc.start,loc.end).filter(x=>x.code===101).length;
   for(let box=0;box<count;box++)recovery(id,box,[heroEntry()]);
  }
  for(let box=0;box<5;box++)recovery(`speech.${art}`,box,[heroEntry(),use('tavern.ivai-enter'),use(`tavern.${art}.${box===0||box===2?'listen':'focus'}`)]);
  recovery(`opinion.${art}`,0,[use('council.roster-enter'),use('council.ivai-enter'),use(`council.${art}.focus`)]);
 }
 for(const route of ['physical','supernatural'])for(const stage of ['warning','second'])recovery(`lover.${route}.${stage}`,0,[use(`lover.${route==='physical'?'perola':'florai'}.enter`)]);
 recovery('council.challenge',0,[use('council.roster-enter')]);
 recovery('council.solo',0,[use('council.ivai-enter')]);
 recovery('council.confession',0,[use('council.roster-enter'),use('council.ivai-enter'),use('council.roster-listen')]);
 recovery('council.andira',0,[use('council.ivai-enter'),use('council.intervention')]);
}
for(const edit of edits.slice().sort((a,b)=>b.commonEventId-a.commonEventId||b.start-a.start)) events[edit.commonEventId].list.splice(edit.start,edit.end-edit.start,...edit.list);
if (phase === 'tavern') {
const tavern=events[3].list;
assert.equal(tavern[13].code,122); assert.equal(tavern[19].parameters[1],'Observe');
tavern.splice(19,0,{...call(exitPair),indent:2},bridge('end',2)); tavern.splice(13,0,bridge('begin',2));
}
const result=parseEventCatalog(events,{...system,drylandAssets:Object.keys(baseline.fingerprints).filter(f=>/^(img|audio)\//.test(f))});
assert.deepEqual(result.violations,[]);
assert.deepEqual(result.catalog,baseline.catalog);
for(const [id,section] of Object.entries(baseline.sections)) {
 const loc=result.locations[id], current=events[loc.commonEventId].list.slice(loc.start,loc.end);
 assert.deepEqual(current.filter(c=>![117,357,657,230,111,411,412].includes(c.code)),section.commands,`Preserve ${id}`);
}
const serialized='[\n'+events.map(event=>JSON.stringify(event)).join(',\n')+'\n]\n';
const out=path.join(evidence,`task-${{tavern:'02',council:'03',remaining:'04',recovery:'05'}[phase]}/migration-${phase}`); await mkdir(out,{recursive:true});
await writeFile(path.join(out,'receipt.json'),JSON.stringify({phase,before:hash(bytes),after:hash(serialized),helpers:events.slice(firstHelper).map(({id,name})=>({id,name})),layouts,coverage:edits.map(({id,boxes})=>({id,boxes}))},null,2)+'\n',{flag:'wx'});
if (phase === 'council') await writeFile(path.join(project,'data/System.json'),JSON.stringify(system)+'\n');
await writeFile(target,serialized); assert.equal(hash(await readFile(target)),hash(serialized));
console.log(JSON.stringify({phase,helpers:events.length-firstHelper,sections:edits.length,boxes:edits.reduce((n,e)=>n+e.boxes,0)}));
