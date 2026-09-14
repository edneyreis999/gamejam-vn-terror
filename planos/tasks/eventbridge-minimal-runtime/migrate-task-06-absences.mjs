import fs from 'node:fs';
import {read,c,query,presentation,call,branch,nest,erase,show,append,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json'),system=read('System.json');
if(events.length!==348)throw new Error('Expected task 06 memorial baseline');
const switchValue=(id,on)=>c(121,[id,id,on?0:1]);
const register=[];
for(let i=0;i<8;i++) register.push(query('heroDead',28,`H${i+1}`),...branch(`$gameVariables.value(28) && !$gameSwitches.value(${38+i})`,[switchValue(38+i,true),presentation('ArmEffect',{key:`absence.H${i+1}`})]));
const arm=append(events,'Taverna — registrar ausências antes do checkpoint',[
 query('phase',31),query('readingScene',57),
 ...branch("$gameVariables.value(31) === 'formation' || ['irati.02','map.reveal'].includes($gameVariables.value(57))",register)
]);
const cleanup=append(events,'Taverna — concluir ausências',[
 ...Array.from({length:8},(_,i)=>[query('heroDead',28,`H${i+1}`),...branch('$gameVariables.value(28)',erase(10+i))]).flat(),switchValue(47,false)
]);
const parallel=append(events,'Taverna — duração das ausências',[c(230,[60]),...branch('$gameMap.mapId() === 3',[call(cleanup)],[switchValue(47,false)])]);
events[parallel].trigger=2;events[parallel].switchId=47;system.switches[47]='Ausências em animação';
const positions=[[344,520],[840,176],[760,497],[1000,448],[528,336],[368,160],[1032,224],[176,264]];
events[45].list=[];
for(let i=0;i<8;i++){
 const [x,y]=positions[i];
 events[45].list.push(presentation('TakeEffect',{key:`absence.H${i+1}`,variable:String(48+i)}),...branch(`$gameVariables.value(${48+i})`,branch('$gameVariables.value(47)',erase(10+i),[
  show(10+i,`Dryland_Tavern_H${i+1}`,x,y,35),c(232,[10+i,0,1,0,x,y,35,35,0,0,60,false,0]),switchValue(47,true)
 ])));
}
events[45].list.push(c(0));
events[38].list.unshift(call(cleanup));
events[38].list.splice(-1,0,call(45));
events[3].list=events[3].list.filter(cmd=>!(cmd.code===117&&cmd.parameters[0]===45)).flatMap(cmd=>cmd.code===402?[cmd,...nest([call(cleanup)],cmd.indent+1)]:[cmd]);
for(const event of events.filter(Boolean))event.list=event.list.flatMap(cmd=>cmd.code===357&&cmd.parameters[0]==='Dryland_EventBridge'&&cmd.parameters[1]==='Checkpoint'&&['consequence','reward'].includes(cmd.parameters[3].reason)?[{...call(arm),indent:cmd.indent},cmd]:[cmd]);
// Keep the larger travelling portraits completely within the memorial canvas.
for(const cmd of events[59].list)if(cmd.code===122&&cmd.parameters[0]>=136&&cmd.parameters[0]<=143&&typeof cmd.parameters[4]==='string')cmd.parameters[4]=cmd.parameters[4].replace(/\$gameVariables.value\((9[6-9]|10[0-3])\) - 20/g,match=>`($gameVariables.value(62) ? ${match} : Math.floor($gameVariables.value(187) / 4) * 290 + 80)`);
write(events,system);
const rulesPath='rpg-maker/The Dryland Drowned/js/plugins/Dryland_CampaignRules.js';
let rules=fs.readFileSync(rulesPath,'utf8').replace('deadHeroIds: [], presentedDeathIds: [],','deadHeroIds: [],').replace("'deadHeroIds', 'presentedDeathIds',","'deadHeroIds',");
rules=rules.replace(/^.*var presented = .*\n/m,'').replace(/^.*if \(!Array.isArray\(state.presentedDeathIds\)\).*\n/m,'').replace(/      presented.forEach\([\s\S]*?      \}\);\n/,'').replace(/^.*var newDeaths = .*\n/m,'').replace(/,\n          presentedDeathIds: state.presentedDeathIds.concat\(newDeaths\)/,'').replace("effects: newDeaths.length ? [{ type: 'tavern_absence', heroIds: newDeaths }] : []","effects: []").replace("presentedDeaths: list('presentedDeathIds'), ",'');
fs.writeFileSync(rulesPath,rules);
const bridgePath='rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js';
let bridge=fs.readFileSync(bridgePath,'utf8').replace(/^.*if \(effect.type === 'tavern_absence'\).*\n/m,'');
bridge=bridge.replace(/  \/\/ The Common Event owns all fade movements\.[\s\S]*?(?=  const terminateMap)/,'').replace(/^.*for \(const id of \$gameTemp._drylandAbsencePictures.*\n/m,'').replace(/^.*\$gameTemp._drylandAbsencePictures = \[\];\n/m,'');
fs.writeFileSync(bridgePath,bridge);
console.log({arm,cleanup,parallel});
