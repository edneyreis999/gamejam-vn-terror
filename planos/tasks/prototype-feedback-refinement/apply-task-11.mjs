import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {game,command as c,show,presentation,editMap,editCommonEvents} from './native-authoring.mjs';
const prologue=JSON.parse(readFileSync(game+'/data/Map002.json','utf8')).events[1].pages[0].list;
const start=prologue.findIndex(row=>row.code===357&&row.parameters[1]==='Basic_EnterBust'&&row.parameters[3]['PictureName:str']==='Reed final');
assert.ok(start>=0);
const frame=prologue.slice(start,start+3);
for(let id=29;id<=36;id++)editMap(id,list=>{
  const prose=JSON.stringify(list.filter(row=>row.code===401));
  const image=list.findIndex(row=>row.code===231&&row.parameters[1]===`Dryland_EpilogueH${id-28}`);
  assert.ok(image>=0);
  list.splice(image,1,show(1,'Dryland_Black',0,0),presentation('MotionPreference',{variable:'47'}),...structuredClone(frame));
  for(const row of list)if(row.code===101)row.parameters[4]='Rheed';
  assert.equal(JSON.stringify(list.filter(row=>row.code===401)),prose);
});
editCommonEvents(events=>{
  const present=events[67].list.find(row=>row.code===111&&row.parameters[1].startsWith("(['prologue.rheed.01'"));
  assert.ok(present&&!present.parameters[1].includes("=== 'epilogue'"));
  present.parameters[1]=`($gameVariables.value(31) === 'epilogue') || ${present.parameters[1]}`;
  events[61].list.unshift(c(241,[{name:'',volume:45,pitch:100,pan:0}]),c(245,[{name:'',volume:25,pitch:100,pan:0}]));
  // The final eligible hero also leaves through this shared stage cleanup.
  const index=events[337].list.findIndex(row=>row.code===235);
  events[337].list.splice(index,0,...Array.from({length:11},(_,i)=>c(235,[60+i])));
});
