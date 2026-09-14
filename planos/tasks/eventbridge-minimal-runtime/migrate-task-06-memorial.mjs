import assert from 'node:assert/strict';
import fs from 'node:fs';
import {read,c,pc,presentation,call,set,query,branch,erase,show,text,append,sections,write,reading} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json'),system=read('System.json');assert.equal(events.length,338);assert.equal(system.variables.length,192);
for(const label of ['Causa','Rota','Encontro'])for(let i=1;i<=8;i++)system.variables.push(`Memorial — ${label} H${i}`);
system.switches[46]='Memorial pronto';
const bodies=sections(events[58]),units={};
for(const [key,list] of Object.entries(bodies))units[key]=append(events,key,[presentation('ObservationBegin'),...list,presentation('ObservationComplete')]);
events[58].list=[...Object.keys(bodies).flatMap(key=>branch(`$gameVariables.value(56) === ${JSON.stringify(key)}`,reading(units[key]))),c(0)];
const causes=[];
for(const event of events.filter(e=>e?.name.startsWith('memorial_cause.'))){
 const cause=event.list.filter(cmd=>cmd.code===401).map(cmd=>cmd.parameters[0]).join(' '),id=event.name.split('.')[1];
 event.list=[set(152,cause),c(0)];causes.push(...branch(`$gameVariables.value(186) === '${id}'`,[call(event.id)]));
}
const causeId=append(events,'Memorial — causa da morte',causes);
const script=(id,expression)=>c(122,[id,id,0,4,expression]);
const posShow=(id,file,x,y,scale,opacity=255)=>c(231,[id,file,1,1,x,y,scale,scale,opacity,0]);
const move=(id,x,y,scale,opacity,duration)=>c(232,[id,0,1,1,x,y,scale,scale,opacity,0,duration,false,0]);
const stage=[call(337),pc('VisuMZ_1_MessageCore','MessageWindowProperties',{'Rows:num':'1','Width:num':'1280','WordWrap:str':'true'}),presentation('MotionPreference',{variable:'47'}),query('deadCount',35),script(62,'$gameVariables.value(35) <= 4'),set(187,0),show(1,'Dryland_Memorial',640,360,100*1280/1672)];
for(let i=0;i<8;i++){
 stage.push(query('heroDead',80+i,`H${i+1}`),...branch(`$gameVariables.value(${80+i})`,[
  script(88+i,'640 + ($gameVariables.value(187) % 4 - (Math.min(4, $gameVariables.value(35)) - 1) / 2) * 310'),
  script(188,'$gameVariables.value(62) ? 70 : Math.floor($gameVariables.value(187) / 4) * 290'),
  script(104+i,'$gameVariables.value(188) + ($gameVariables.value(62) ? 150 : 90)'),
  script(96+i,'$gameVariables.value(188) + 495 * ($gameVariables.value(62) ? 300 : 180) / 1404'),
  script(112+i,`$gameVariables.value(${88+i}) - 150`),
  script(120+i,'$gameVariables.value(188) + ($gameVariables.value(62) ? 245 : 110)'),
  script(128+i,`$gameVariables.value(${88+i}) + ($gameVariables.value(187) % 2 ? 30 : -30)`),
  script(136+i,`$gameVariables.value(${96+i}) - 20`),
  query('heroName',165+i,`H${i+1}`),query('deathRoute',186,`H${i+1}`),query('routeName',200+i,'',0,0,186),query('deathEncounter',186,`H${i+1}`),query('encounterName',208+i,'',0,0,186),call(causeId),c(122,[192+i,192+i,0,1,152]),
  ...branch('$gameVariables.value(62)',[posShow(22+i,'Dryland_Gravestone',88+i,104+i,300/1404*100)],[posShow(22+i,'Dryland_Gravestone',88+i,104+i,180/1404*100)]),
  c(231,[30+i,'Dryland_DestinationCard',0,1,112+i,120+i,300/330*100,176/212*100,255,0]),
  text(30+i,`<WordWrap>\\FS[26]\\V[${165+i}]<br>\\FS[22]\\V[${192+i}]<br>\\FS[19]\\V[${200+i}] · \\V[${208+i}]`,'upperleft'),
  c(122,[187,187,1,0,1])
 ]));
}
stage.push(call(60));
// Each travelling portrait is an ordinary native picture. The final portrait
// sits below its stone; both opacity commands execute on the same frame.
for(let i=0;i<8;i++)stage.push(...branch(`$gameVariables.value(${80+i}) && !$gameVariables.value(47)`,[
 ...branch('$gameVariables.value(62)',[posShow(46+i,`Dryland_Memorial_H${i+1}`,128+i,136+i,220/1402*100),move(46+i,88+i,96+i,590*300/1404/1402*100,255,90)],[posShow(46+i,`Dryland_Memorial_H${i+1}`,128+i,136+i,132/1402*100),move(46+i,88+i,96+i,590*180/1404/1402*100,255,90)])
]));
stage.push(...branch('!$gameVariables.value(47)',[c(230,[90])]));
for(let i=0;i<8;i++)stage.push(...branch(`$gameVariables.value(${80+i}) && !$gameVariables.value(47)`,[
 ...branch('$gameVariables.value(62)',[move(46+i,88+i,96+i,590*300/1404/1402*100,0,45),move(10+i,88+i,96+i,590*300/1404/1402*100,255,45)],[move(46+i,88+i,96+i,590*180/1404/1402*100,0,45),move(10+i,88+i,96+i,590*180/1404/1402*100,255,45)])
]));
stage.push(...branch('!$gameVariables.value(47)',[c(230,[45])]),...erase(46,53),c(121,[46,46,0]),c(0));events[59].list=stage;
const portraits=[];
for(let i=0;i<8;i++)portraits.push(...branch(`$gameVariables.value(${80+i})`,[
 ...branch('$gameVariables.value(62)',branch('$gameVariables.value(47)',[posShow(10+i,`Dryland_Memorial_H${i+1}`,88+i,96+i,590*300/1404/1402*100)],[posShow(10+i,`Dryland_Memorial_H${i+1}`,88+i,96+i,590*300/1404/1402*100,0)]),branch('$gameVariables.value(47)',[posShow(10+i,`Dryland_Memorial_H${i+1}`,88+i,96+i,590*180/1404/1402*100)],[posShow(10+i,`Dryland_Memorial_H${i+1}`,88+i,96+i,590*180/1404/1402*100,0)]))
]));events[60].list=[...portraits,c(0)];
events[337].list.unshift(c(121,[46,46,1]));
for(const cmd of events[40].list){
 if(cmd.code===111&&cmd.parameters[1]==='!$gameTemp._drylandMemorial?.ready')cmd.parameters[1]='!$gameSwitches.value(46)';
 if(cmd.code===357&&cmd.parameters[1]==='Present'){cmd.code=117;cmd.parameters=[58];}
}
assert.ok(!events[40].list.some(cmd=>cmd.code===357&&cmd.parameters[1]==='Present'));
write(events,system);fs.writeFileSync('planos/tasks/eventbridge-minimal-runtime/task-06-native-units.json',JSON.stringify({units,causeId},null,2)+'\n');
console.log(JSON.stringify({lastEvent:events.length-1,causeId}));
