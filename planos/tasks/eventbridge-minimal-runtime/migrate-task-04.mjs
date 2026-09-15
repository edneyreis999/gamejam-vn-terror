import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,read,c,bridge,presentation,call,set,query,nest,branch,erase,show,text,focus,append,choices,group,sections,reduced,write,reading} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json'),system=read('System.json');
assert.equal(events.length,118);assert.equal(system.variables.length,186);
for(const name of ['Encontro — nome','Encontro — posição','Encontro — total',...['1','2','3'].map(n=>'Sacrifício — nome '+n)])system.variables.push(name);
for(const [id,name] of [[34,'Pode recuar'],[35,'Candidato 1'],[36,'Candidato 2'],[37,'Candidato 3']])system.switches[id]=name;
const units={};
const unit=(key,list)=>units[key]=append(events,key,[presentation('ObservationBegin'),presentation('MotionPreference',{variable:'47'}),...reduced(list),presentation('ObservationComplete')]);
const resolve=ids=>ids.flatMap(id=>branch(`$gameVariables.value(56) === ${JSON.stringify(id)}`,reading(units[id])));
const eraseStage=[...erase(71,89),...erase(10,21),...erase(30,59)];
const encounterCalls=[];
for(let i=0;i<16;i++){
 const event=events[13+i],id=(i<8?'A':'B')+(i%8+1),bodies=sections(event);
 for(const [key,list] of Object.entries(bodies))if(!key.startsWith('choices.'))unit(key,list);
 const labels=bodies['choices.'+id].find(cmd=>cmd.code===102).parameters[0];
 const options=[];
 for(const [index,label] of labels.entries()){
  const pic=50+index;
  options.push(show(pic,'Dryland_Approach',640,375+index*115),text(pic,'\\FS[22]'+label),focus(pic));
 }
 options.push(group('approaches',true),...choices([
  ...labels.map((label,index)=>({label:label+`<Bind Picture: ${50+index}><Hide Choice Window>`,commands:[set(23,`${id}-${index+1}`)]})),
  {label:'Rever descrição<Bind Picture: 41>',commands:[set(23,'reread')]},
  {label:'Recuar<Bind Picture: 42><Show Switch: 34>',commands:[set(23,'retreat')]}
 ]));
 const choiceId=append(events,'Abordagens — '+id,options);
 event.list=[...branch("$gameVariables.value(21) === 'reread'",[...eraseStage,call(units[`encounter.${id}.01`]),c(115)]),
 ...branch("$gameVariables.value(31) === 'encounter_choice'",[call(choiceId),c(115)]),
 ...resolve(Object.keys(bodies).filter(key=>key.startsWith('encounter.')||key.startsWith('result.'))),c(0)];
 encounterCalls.push(...branch(`$gameVariables.value(32) === '${id}'`,[call(event.id)]));
 const mapId=7+i,map=read(`Map${String(mapId).padStart(3,'0')}.json`);
 map.events[1].name='Fluxo — '+id;
 const entry=structuredClone(map.events[1]);entry.id=map.events.length;entry.name='Descrição, abordagens e resultados — '+id;entry.x=1;entry.pages[0].trigger=0;entry.pages[0].list=[call(event.id),c(0)];map.events.push(entry);
 fs.writeFileSync(root+`data/Map${String(mapId).padStart(3,'0')}.json`,JSON.stringify(map,null,2)+'\n');
}
const dispatch=append(events,'Encontros — chamadas nativas',encounterCalls);
for(const [key,list] of Object.entries(sections(events[29])))unit(key,list);
events[29].list=[...resolve(Object.keys(sections(events[29]))),c(0)];
const moved=new Set();
for(const [key,list] of Object.entries(sections(events[41])))if(/^(death\.|farewell\.|automatic_retreat\.)/.test(key)){unit(key,list);moved.add(key);}
// Preserve the remaining multiplexed closing bodies until task 05.
let section=null;
events[41].list=events[41].list.filter(cmd=>{
 if(cmd.code===108&&String(cmd.parameters[0]).startsWith('@dryland-section '))section=cmd.parameters[0].slice(17);
 const keep=!moved.has(section);if(cmd.code===108&&cmd.parameters[0]==='@dryland-end')section=null;return keep;
});
const consequences=append(events,'Consequências — leituras nativas',resolve([...moved]));
for(const id of [49,50,51,52]){
 const bodies=sections(events[id]);for(const [key,list] of Object.entries(bodies))unit(key,list);
 events[id].list=[...resolve(Object.keys(bodies)),c(0)];
}
events[78].list=reduced(events[78].list.filter(cmd=>![108,408].includes(cmd.code)));
const discoveries=append(events,'Descobertas — chamadas nativas',[...['physical','supernatural'].flatMap((route,i)=>branch(`$gameVariables.value(57).startsWith('lover.${route}')`,[call(49+i)])),...branch("$gameVariables.value(57) === 'irati.02'",[call(51)]),...branch("$gameVariables.value(57) === 'map.reveal'",[call(52)])]);
for(const cmd of events[46].list)if(cmd.code===357&&cmd.parameters[1]==='Present'){cmd.code=117;cmd.parameters=[discoveries];}
const refresh=[...[[26,'canRetreat'],[31,'phase'],[32,'encounterId'],[33,'hasReading'],[34,'dungeonId'],[56,'passageId'],[57,'readingScene'],[58,'readingIndex'],[59,'endingId'],[35,'candidateCount']].map(([v,key])=>query(key,v)),presentation('MotionPreference',{variable:'47'}),set(60,''),...branch("$gameVariables.value(31) === 'epilogue'",[c(122,[60,60,0,4,"$gameVariables.value(57).split('.')[1]"])]),query('canRetreat',0,'',0,34)];
for(let i=0;i<3;i++)refresh.push(query('candidate',36+i,'',i),c(122,[39+i,39+i,0,4,`640 + (${i} - ($gameVariables.value(35) - 1) / 2) * 340`]),c(121,[35+i,35+i,1]),...branch(`$gameVariables.value(35) > ${i}`,[c(121,[35+i,35+i,0]),query('heroName',189+i,'',0,0,36+i)]));
refresh.push(set(42,350),set(43,585),...branch("$gameVariables.value(31) !== 'memorial'",eraseStage));
refresh.push(...branch("$gameVariables.value(31) === 'encounter_choice'",[query('encounterName',186),query('position',187),query('routeTotal',188,'',0,0,34),show(40,'Dryland_EncounterTitle',640,52),text(40,'\\FS[22]Encontro \\V[187]/\\V[188] — \\V[186]'),show(41,'Dryland_Button',920,128),text(41,'\\FS[20]Rever descrição'),focus(41),...branch('$gameVariables.value(26)',[show(42,'Dryland_Button',1150,128),text(42,'\\FS[20]Recuar'),focus(42)])]));
const refreshId=append(events,'Campanha — consultas e palco de encontro',refresh);
const replacements=new Map([[2,refreshId],[22,29],[99,dispatch],[106,dispatch],[110,dispatch],[126,dispatch],[157,consequences],[162,consequences]]);
events[40].list=events[40].list.flatMap((cmd,index)=>{
 if(replacements.has(index))return [c(117,[replacements.get(index)],cmd.indent)];
 if(index===132)return nest([group('retreat')],cmd.indent);
 return [cmd];
});
const sacrifice=events[42].list.slice(0,4);
for(let i=0;i<3;i++)sacrifice.push(...branch(`$gameSwitches.value(${35+i})`,[text(50+i,`\\FS[20]Sacrificar \\V[${189+i}]`),focus(50+i)]));
sacrifice.push(group('sacrifice'),...choices(Array.from({length:3},(_,i)=>({label:`Sacrificar \\V[${189+i}]<Bind Picture: ${50+i}><Show Switch: ${35+i}><Hide Choice Window>`,commands:[c(122,[22,22,0,1,36+i]),bridge('Action',{action:'SELECT_VICTIM',valueVariable:'22'}),...branch("$gameVariables.value(24) === 'ok'",[bridge('Checkpoint',{reason:'sacrifice'}),set(46,'')])]}))),c(0));
events[42].list=sacrifice;
write(events,system);
fs.writeFileSync('planos/tasks/eventbridge-minimal-runtime/task-04-native-units.json',JSON.stringify({units,dispatch,consequences,discoveries,refreshId},null,2)+'\n');
console.log(JSON.stringify({lastEvent:events.length-1,dispatch,consequences,discoveries,refreshId}));
