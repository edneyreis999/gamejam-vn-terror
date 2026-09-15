import fs from 'node:fs';
import assert from 'node:assert/strict';
const root='rpg-maker/The Dryland Drowned/data/';
const events=JSON.parse(fs.readFileSync(root+'CommonEvents.json','utf8')),system=JSON.parse(fs.readFileSync(root+'System.json','utf8'));
assert.equal(system.variables.length,165);
for(let h=1;h<=8;h++)system.variables.push(`Interface — nome H${h}`);
for(const kind of ['nome','estado','progresso','total'])for(const route of ['igreja','parque','vilarejo'])system.variables.push(`Destino — ${kind} ${route}`);
system.variables.push('Taverna — destino selecionado');
let nameVariable;
for(const command of events[38].list){
 if(command.code!==357)continue;
 const [plugin,name,,args]=command.parameters;
 if(plugin==='Dryland_EventBridge'&&name==='Query'){
  if(args.kind==='heroName') {nameVariable=164+Number(args.id.slice(1));args.variable=String(nameVariable);}
  if(args.kind==='routeName')args.variable='185';
 }
 if(plugin==='VisuMZ_1_MessageCore'&&name==='PictureTextChange'){
  const id=JSON.parse(args['PictureIDs:arraynum'])[0];
  for(const key of Object.keys(args).filter(key=>key.endsWith(':json')))args[key]=args[key].replaceAll('V[152]',`V[${id===44?185:nameVariable}]`);
 }
}
for(const command of events[3].list){
 if(command.code!==102)continue;
 command.parameters[0]=command.parameters[0].map(label=>{
  const match=/<Bind Picture: (1[0-7])>/.exec(label);
  return match?`\\V[${165+Number(match[1])-10}]`+label.slice(label.indexOf('<')):label;
 });
}
// Progress/status strings remain live in each picture until the panel is erased.
let routeIndex=-1;
for(const command of events[39].list){
 if(command.code===357 && command.parameters[0]==='Dryland_EventBridge'&&command.parameters[1]==='Query'&&command.parameters[3].kind==='routeProgress')routeIndex++;
 if(routeIndex<0 || routeIndex>2)continue;
 const replace=text=>text.replaceAll('value(154)',`value(${179+routeIndex})`).replaceAll('value(155)',`value(${182+routeIndex})`).replaceAll('value(153)',`value(${176+routeIndex})`).replaceAll('V[154]',`V[${179+routeIndex}]`).replaceAll('V[155]',`V[${182+routeIndex}]`).replaceAll('V[153]',`V[${176+routeIndex}]`);
 if(command.code===357){
  const args=command.parameters[3];
  if(command.parameters[0]==='Dryland_EventBridge'&&command.parameters[1]==='Query')args.variable=String({154:179+routeIndex,155:182+routeIndex,153:176+routeIndex}[args.variable]??args.variable);
  else for(const key in args)if(typeof args[key]==='string')args[key]=replace(args[key]);
 }else if(command.code===122 && command.parameters[0]===153)command.parameters[0]=command.parameters[1]=176+routeIndex;
 else command.parameters=command.parameters.map(value=>typeof value==='string'?replace(value):value);
}
fs.writeFileSync(root+'CommonEvents.json','[\n'+events.map(e=>JSON.stringify(e)).join(',\n')+'\n]\n');
fs.writeFileSync(root+'System.json',JSON.stringify(system)+'\n');
