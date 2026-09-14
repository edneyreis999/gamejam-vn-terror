import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,read,c,pc,presentation,call,query,branch,erase,append,group,sections,reduced,write,reading} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json');assert.equal(events.length,305);
const units={};
for(const id of [41,54,55,56,57]){
 const bodies=sections(events[id]);
 for(const [key,list] of Object.entries(bodies))units[key]=append(events,key,[presentation('ObservationBegin'),presentation('MotionPreference',{variable:'47'}),...reduced(list),presentation('ObservationComplete')]);
 events[id].list=[...Object.keys(bodies).flatMap(key=>branch(`$gameVariables.value(56) === ${JSON.stringify(key)}`,reading(units[key]))),c(0)];
}
for(const id of [68,69,70,71,72,73,74,75,77,79])events[id].list=reduced(events[id].list.filter(cmd=>![108,408].includes(cmd.code)));
const projection=[];
for(let i=0;i<3;i++)projection.push(query('climaxHero',144+i,'',i),c(122,[144+i,144+i,0,4,`Number($gameVariables.value(${144+i}).slice(1))`]));
const council=append(events,'Conselho — leituras nativas',[...projection,call(54),call(41)]);
const ending=append(events,'Desfecho — leituras nativas', ['reunite','destroy','bad'].flatMap((id,i)=>branch(`$gameVariables.value(59) === '${id}'`,[call(55+i)])));
const cleanup=append(events,'Desfecho — preparar palco',[pc('VisuMZ_1_MessageCore','MessageWindowProperties',{'Rows:num':'4','Width:num':'1280','WordWrap:str':'true'}),...erase(71,89),...erase(2,59)]);
events[53].list=events[53].list.flatMap(cmd=>{
 if(cmd.code===357&&cmd.parameters[1]==='Conversation')return [call(77)];
 if(cmd.code===108&&cmd.parameters[0]==='@dryland-choice ending')return [group('ending')];return [cmd];
});
let phase;
events[40].list=events[40].list.flatMap(cmd=>{
 if(cmd.code===111&&cmd.indent===0)phase=cmd.parameters[1];
 if(cmd.code!==357)return [cmd];const name=cmd.parameters[1];
 if(name==='Conversation')return [];
 if(name==='Observe'&&cmd.parameters[3].target==='closing')return [{...call(cleanup),indent:cmd.indent}];
 if(name==='Present'){
  const id=phase.includes('council')?council:phase.includes("'ending'")?ending:phase.includes('epilogue')?41:null;
  if(id)return [{...call(id),indent:cmd.indent}];
 }
 return [cmd];
});
for(const [mapId,name,id] of [[23,'Conselho',council],[23,'Escolha do medalhão',53],[25,'Reunir',55],[26,'Destruir',56],[27,'Perda total',57],...Array.from({length:8},(_,i)=>[29+i,`Epílogo H${i+1}`,units[`epilogue.H${i+1}`]])]){
 const map=read(`Map${String(mapId).padStart(3,'0')}.json`),entry=structuredClone(map.events[1]);
 assert.ok(entry, `Missing active map entry ${mapId}`);
 const prior=map.events.find(event=>event?.name===name);
 if(prior){prior.pages[0].list=[call(id),c(0)];fs.writeFileSync(root+`data/Map${String(mapId).padStart(3,'0')}.json`,JSON.stringify(map,null,2)+'\n');continue;}
 map.events[1].name='Fluxo — '+name;entry.id=map.events.length;entry.name=name;entry.x=1;entry.pages[0].trigger=0;entry.pages[0].list=[call(id),c(0)];map.events.push(entry);
 fs.writeFileSync(root+`data/Map${String(mapId).padStart(3,'0')}.json`,JSON.stringify(map,null,2)+'\n');
}
write(events);fs.writeFileSync('planos/tasks/eventbridge-minimal-runtime/task-05-native-units.json',JSON.stringify({units,council,ending,cleanup},null,2)+'\n');
console.log(JSON.stringify({lastEvent:events.length-1,council,ending,cleanup}));
