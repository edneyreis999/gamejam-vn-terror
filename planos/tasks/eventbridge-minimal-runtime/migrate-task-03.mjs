import assert from 'node:assert/strict';
import fs from 'node:fs';
const root='rpg-maker/The Dryland Drowned/';
const read=name=>JSON.parse(fs.readFileSync(root+'data/'+name,'utf8'));
const events=read('CommonEvents.json'),system=read('System.json'),map=read('Map003.json');
assert.equal(events.length,117);
const c=(code,parameters=[],indent=0)=>({code,indent,parameters});
const pc=(plugin,name,args={})=>c(357,[plugin,name,name,args]);
const bridge=(name,args={})=>pc('Dryland_EventBridge',name,args);
const presentation=(name,args={})=>pc('Dryland_Presentation',name,args);
const call=id=>c(117,[id]);
const set=(id,value)=>c(122,[id,id,0,4,JSON.stringify(value)]);
const query=(kind,variable,id='',switchId=0)=>bridge('Query',{kind,id,variable:String(variable),switch:String(switchId)});
const nest=(list,indent=1)=>list.map(cmd=>({...structuredClone(cmd),indent:cmd.indent+indent}));
const branch=(condition,yes,no)=>[c(111,[12,condition]),...nest(yes),...(no?[c(411),...nest(no)]:[]),c(412)];
const erase=(from,to)=>Array.from({length:to-from+1},(_,i)=>c(235,[from+i]));
const show=(id,file,x,y,sx=100,sy=sx,opacity=255,origin=1)=>c(231,[id,file,origin,0,x,y,sx,sy,opacity,0]);
const text=(id,value,anchor='center')=>pc('VisuMZ_1_MessageCore','PictureTextChange',{
 'PictureIDs:arraynum':JSON.stringify([id]),'Padding:eval':'8',...Object.fromEntries(['upperleft','up','upperright','left','center','right','lowerleft','down','lowerright'].map(a=>[a+':json',JSON.stringify(a===anchor?value:'')]))
});
const focus=id=>{
 const tone=brightness=>JSON.stringify({'Duration:num':'0','easingType:str':'Linear','TargetX:str':'Unchanged','TargetY:str':'Unchanged','TargetScaleX:str':'Unchanged','TargetScaleY:str':'Unchanged','TargetOpacity:str':'Unchanged','BlendMode:num':'-1','TargetToneRed:str':String(brightness),'TargetToneGreen:str':String(brightness),'TargetToneBlue:str':String(brightness),'TargetToneGray:str':'0'});
 return pc('VisuMZ_2_PictureChoices','ChangePictureChoiceSettingsOne',{'PictureIDs:arraynum':JSON.stringify([id]),'OnSelectSettings:struct':tone(65),'OnDeselectSettings:struct':tone(0)});
};
function append(name,list){const id=events.length;events.push({id,name,trigger:0,switchId:1,list:[...list,c(0)]});return id;}
function choices(items,{cancel=false}={}){
 const result=[];
 // MessageCore joins consecutive native Show Choices. Each editor dialog stays within six entries.
 for(let start=0;start<items.length;start+=6){
  const group=items.slice(start,start+6);
  result.push(c(102,[group.map(item=>item.label),cancel?-2:-1,0,2,0]));
  for(const [index,item] of group.entries())result.push(c(402,[index,item.label]),...nest(item.commands),c(0,[],1));
  if(cancel)result.push(c(403),c(0,[],1));
  result.push(c(404));
 }
 return result;
}
const group=key=>presentation('ChoiceFocus',{key,horizontal:'true',remember:key==='formation'?'true':'false'});
const names=Object.fromEntries(events[4].list.filter(cmd=>cmd.code===357&&cmd.parameters[1]==='ConfigureHero').map(cmd=>[cmd.parameters[3].id,cmd.parameters[3].name]));
assert.equal(system.variables.length,150);
for(const name of ['Grupo — quantidade','Grupo — necessário','Interface — nome','Interface — estado','Destino — progresso','Destino — total','Elenco — texto',...Array.from({length:8},(_,i)=>`Elenco — linha ${i+1}`)])system.variables.push(name);
// IDs 21–28 are hero availability; 29 depart; 30 manual party; 31–33 route availability.
for(const [id,name] of [...Array.from({length:8},(_,i)=>[21+i,`Herói H${i+1} vivo`]),[29,'Grupo pode partir'],[30,'Formação manual'],[31,'Rota igreja disponível'],[32,'Rota parque disponível'],[33,'Rota vilarejo disponível']])system.switches[id]=name;
const stage=[];
for(let hero=1;hero<=8;hero++)stage.push(query('heroAlive',0,`H${hero}`,20+hero));
stage.push(query('canDepart',25,'',29),query('automaticFormation',29),query('selectedCount',150),query('requiredCount',151),query('selectedDungeonId',30),presentation('MotionPreference',{variable:'47'}));
stage.push(c(121,[30,30,0]),...branch('$gameVariables.value(29)',[c(121,[30,30,1])]),...erase(71,89),c(235,[18]));
const originalStage=events[38].list.filter(cmd=>cmd.code===231 || (cmd.code===111||cmd.code===412));
stage.push(...originalStage);
for(let hero=1;hero<=8;hero++){
 const pic=9+hero,tag=29+hero,position=events[38].list.find(cmd=>cmd.code===231&&cmd.parameters[0]===pic).parameters;
 stage.push(...branch(`$gameSwitches.value(${20+hero})`,[
  query('heroName',152,`H${hero}`),query('heroSelected',28,`H${hero}`),show(tag,'Dryland_Tag',position[4],position[5]+151),
  ...branch('$gameVariables.value(28)',[text(tag,'\\FS[18]\\V[152] ✓')],[text(tag,'\\FS[18]\\V[152]')]),focus(pic)
 ],[c(235,[pic]),c(235,[tag])]));
 events[29+hero].list=[set(22,`H${hero}`),c(0)];
}
stage.push(...branch('$gameVariables.value(29)',[text(40,'\\FS[20]Grupo \\V[150]/\\V[151] · Auto')],[text(40,'\\FS[20]Grupo \\V[150]/\\V[151]')]));
for(const [id,label] of [[41,'Destinos'],[42,'Elenco'],[43,'Partir']])stage.push(text(id,'\\FS[22]'+label),focus(id));
stage.push(text(44,'\\FS[18]Destino não escolhido'));
for(const route of ['physical','supernatural','final'])stage.push(...branch(`$gameVariables.value(30) === '${route}'`,[query('routeName',152,route),text(44,'\\FS[18]\\V[152]')]));
stage.push(...branch('!$gameVariables.value(25)',[c(234,[43,[-70,-70,-70,180],0]),c(232,[43,0,1,0,1136,664,100,100,100,0,0,false,0])]));
events[38].list=[...stage,c(0)];
// Existing destination illustration/rumor commands remain the author-owned baseline.
const destinations=events[39].list.slice(0,-1);
for(const [i,route] of ['physical','supernatural','final'].entries()){
 destinations.push(query('routeProgress',154,route),query('routeTotal',155,route),query('routeStatus',153,route),c(121,[31+i,31+i,1]));
 destinations.push(...branch("$gameVariables.value(153) === 'available'",[c(121,[31+i,31+i,0]),set(153,'Disponível'),...branch(`$gameVariables.value(30) === '${route}'`,[set(153,'Selecionado')])],[c(234,[72+i,[-70,-70,-70,180],0]),...branch("$gameVariables.value(153) === 'locked'",[set(153,'Bloqueado')],[set(153,'Concluído')])]));
 destinations.push(text(78+i,'\\FS[20]\\V[154]/\\V[155] · \\V[153]'),focus(72+i));
}
destinations.push(focus(81),bridge('CaptureContext'),group('destinations'),...choices([
 ...['physical','supernatural','final'].map((route,i)=>({label:`${['Caminho da Igreja','Parque das Águas Assombradas','Vilarejo Partido'][i]}<Bind Picture: ${72+i}><Enable Switch: ${31+i}><Hide Choice Window>`,commands:[bridge('Action',{action:'SELECT_DESTINATION',value:route})]})),
 {label:'Fechar<Bind Picture: 81>',commands:[]}
],{cancel:true}));
events[39].list=[...destinations,c(0)];
const roster=[...erase(71,89),show(71,'Dryland_Panel',640,320)];
for(let hero=1;hero<=8;hero++)roster.push(query('heroName',152,`H${hero}`),query('heroAlive',28,`H${hero}`),...branch('$gameVariables.value(28)',[set(153,'Presente')],[set(153,'Morto')]),query('heroSelected',28,`H${hero}`),...branch('$gameVariables.value(28)',[set(153,'Presente · No grupo')]),c(122,[156+hero,156+hero,0,4,"$gameVariables.value(152) + ' — ' + $gameVariables.value(153)"]));
roster.push(text(71,'\\FS[28]Elenco\n\n\\FS[22]'+Array.from({length:8},(_,i)=>`\\V[${157+i}]`).join('\n'),'upperleft'),group('roster'),...choices([{label:'Fechar',commands:[]}],{cancel:true}));
const rosterId=append('Taverna — Elenco',roster);
for(let hero=1;hero<=8;hero++){
 const event=events[4+hero];
 event.list=event.list.filter(cmd=>!(cmd.code===108&&String(cmd.parameters[0]).startsWith('@dryland-choice')));
 event.list.unshift(set(22,`H${hero}`),query('heroSelected',28,`H${hero}`),set(153,'Selecionar'),...branch('$gameVariables.value(28)',[set(153,'Retirar do grupo')]),group('hero'));
 for(const cmd of event.list){
  if(cmd.code===102)cmd.parameters[0]=['Conversar','\\V[153]<Enable Switch: 30>'];
  if(cmd.code===357&&cmd.parameters[0]==='Dryland_EventBridge'&&cmd.parameters[1]==='Observe'){
   cmd.code=117;cmd.parameters=[38];
  }
 }
 // After the action, query this hero rather than relying on Bridge's former drawing projection.
 const idx=event.list.findIndex(cmd=>cmd.code===357&&cmd.parameters[1]==='Action');
 event.list.splice(idx+1,0,...nest([query('heroSelected',28,`H${hero}`)],event.list[idx].indent));
}
const items=Array.from({length:8},(_,i)=>({label:`${names['H'+(i+1)]}<Bind Picture: ${10+i}><Choice Common Event: ${30+i}><Show Switch: ${21+i}><Hide Choice Window>`,commands:[call(5+i)]}));
items.push({label:'Destinos<Bind Picture: 41>',commands:[call(39)]},{label:'Elenco<Bind Picture: 42>',commands:[call(rosterId)]},{label:'Partir<Bind Picture: 43><Enable Switch: 29>',commands:[bridge('Action',{action:'DEPART',value:''}),...branch("$gameVariables.value(24) === 'ok'",[bridge('Checkpoint',{reason:'departure'}),set(46,''),c(201,[0,4,10,7,2,0]),c(115)])]});
events[3].list=[call(67),c(118,['tavern']),call(38),call(45),bridge('CaptureContext'),group('formation'),...choices(items),c(119,['tavern']),c(0)];
for(const [name,id] of [['Interface da taverna',38],['Destinos',39],['Elenco',rosterId]]){
 const entry=structuredClone(map.events[2]);entry.id=map.events.length;entry.name=name;entry.x=entry.id;entry.pages[0].list=[call(id),c(0)];map.events.push(entry);
}
fs.writeFileSync(root+'data/CommonEvents.json','[\n'+events.map(e=>JSON.stringify(e)).join(',\n')+'\n]\n');
fs.writeFileSync(root+'data/System.json',JSON.stringify(system)+'\n');
fs.writeFileSync(root+'data/Map003.json',JSON.stringify(map,null,2)+'\n');
console.log(JSON.stringify({rosterId,variables:'150–164',switches:'21–33'}));
