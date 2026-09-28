import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import { command as c, plugin, presentation, branch, choices, show, text, button, erase, editCommonEvents, plate } from './native-authoring.mjs';

plate('Dryland_WallBoard',160,64,'board');
plate('Dryland_NamesReader',640,480);
plate('Dryland_NameRow',640,48,'text');
const query=(kind,id,variable)=>plugin('Dryland_EventBridge','Query',{kind,id,variable:String(variable),switch:'0'});
const bind=id=>presentation('BindInterfacePicture',{picture:String(id),name:'Quadro — '+id});
editCommonEvents(events=>{
  assert.ok(events[117].list.some(row=>row.code===357&&row.parameters[3].kind==='heroSelected'),'Replace the inspected all-roster reader');
  const stage=events[38].list;
  for(const row of stage) {
    if(row.code===231&&row.parameters[0]===42) row.parameters=[42,'Dryland_WallBoard',0,0,64,112,100,100,255,0];
    if(row.code===357&&row.parameters[1]==='PictureTextChange'&&row.parameters[3]['PictureIDs:arraynum']==='[42]') row.parameters[3]['center:json']=JSON.stringify('\\FS[26]Quadro');
  }
  for(const row of events[3].list) {
    if(row.code===102) row.parameters[0]=row.parameters[0].map(label=>label.startsWith('Elenco')?'Quadro<Bind Picture: 42><Hide Choice Window>':label);
    if(row.code===402&&row.parameters[1].startsWith('Elenco')) row.parameters[1]='Quadro<Bind Picture: 42><Hide Choice Window>';
  }
  const clear=erase([71,72,73,74,75,76,77,78,79,81]);
  const list=[...erase([...Array.from({length:28},(_,i)=>10+i),40,41,42,43,44]),
    ...clear,show(71,'Dryland_NamesReader',320,112),text(71,''),bind(71),
    c(122,[157,157,0,0,640]),c(122,[158,158,0,0,208]),query('deadCount','',28),
    ...branch('$gameVariables.value(28) === 0',[text(71,'\\FS[28]Ninguém ficou pelo caminho')])];
  for(let index=0;index<8;index++) {
    const picture=72+index,name=165+index;
    list.push(query('heroDead','H'+(index+1),28),...branch('$gameVariables.value(28)',[
      query('heroName','H'+(index+1),name),
      c(231,[picture,'Dryland_NameRow',1,1,157,158,100,100,255,0]),
      text(picture,'\\FS[28]\\V['+name+']'),bind(picture),c(122,[158,158,1,0,48])
    ]));
  }
  list.push(...button(81,'Dryland_RouteFooter','Voltar',512,624),bind(81),presentation('ConsumeInput'),
    ...choices('roster',['Voltar<Bind Picture: 81><Hide Choice Window>'],[[...clear]],0),c(0));
  events[117].name='Taverna — Quadro dos ausentes';events[117].list=list;
  const preload=events[351].list.find(row=>row.code===357&&row.parameters[1]==='SystemLoadImages').parameters[3];
  preload['pictures:arraystr']=JSON.stringify([...JSON.parse(preload['pictures:arraystr']),'Dryland_WallBoard','Dryland_NamesReader','Dryland_NameRow']);
});
const file='rpg-maker/The Dryland Drowned/data/System.json';
let source=readFileSync(file,'utf8');const data=JSON.parse(source);
for(const [id,name] of [[157,'Quadro — X da linha'],[158,'Quadro — Y da linha']]) {
  assert.ok(data.variables[id].startsWith('Elenco — linha'));
  source=source.replace(JSON.stringify(data.variables[id]),JSON.stringify(name));data.variables[id]=name;
}
assert.deepEqual(JSON.parse(source),data);writeFileSync(file,source);
