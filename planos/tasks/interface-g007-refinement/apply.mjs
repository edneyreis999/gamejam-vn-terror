import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {editCommonEvents,command,plugin,presentation,choices,nested,show,text} from '../prototype-feedback-refinement/native-authoring.mjs';

const windowPicture=(picture,focusPicture=0,width=0,height=0)=>presentation('WindowPicture',Object.fromEntries(Object.entries({picture,focusPicture,width,height}).map(([k,v])=>[k,String(v)])));
editCommonEvents(events=>{
 assert.ok(events[3].list.some(c=>c.code===402&&c.parameters[1].startsWith('Quadro<Bind Picture:')),'Expected original tavern actions');
 const before=structuredClone(events);
 const targets=command=>{
  if([231,232,234,235].includes(command.code))return [command.parameters[0]];
  if(command.code!==357)return [];
  const a=command.parameters[3];
  if(a.picture)return [Number(a.picture)];
  return JSON.parse(a['PictureIDs:arraynum']||'[]');
 };
 // Replace the existing age-choice renderer; never retain its old picture targets.
 events[354].list=events[354].list.filter(c=>!targets(c).some(id=>[3,4,5].includes(id)));
 let checked=true;
 for(const c of events[354].list){
  if(c.code===411&&c.indent===0)checked=false;
  const label=s=>s.replace(/<Bind Picture: \d+>|<Hide Choice Window>/g,'').replace('Tenho 16 anos de idade ou mais',`${checked?'[X]':'[ ]'} Tenho 16 anos de idade ou mais<Choice Width: 680>`);
  if(c.code===102){c.parameters[0]=c.parameters[0].map(label);c.parameters[3]=1;}
  if(c.code===402)c.parameters[1]=label(c.parameters[1]);
 }
 // Restyle the title and spatial text controls in place, leaving artwork untouched.
 for(const id of [2,38]){
  events[id].list=events[id].list.flatMap(c=>{
   if(c.code!==231)return [c];
   const picture=c.parameters[0];
   if(id===2&&picture===2)return [c,windowPicture(2)];
   if(id===38&&picture>=30&&picture<=37){
    const focus=[10,12,11,13,14,15,16,17][picture-30];
    return [c,{...windowPicture(picture,focus),indent:c.indent}];
   }
   if(id===38&&picture===41)return [c,windowPicture(41,41)];
   return [c];
  });
 }
 events[38].list=events[38].list.filter(c=>!targets(c).some(id=>[42,43,44].includes(id)));
 events[38].list.splice(-1,0,show(42,'Dryland_Button',1200,16),windowPicture(42,42,56,48),text(42,'☰'),presentation('BindInterfacePicture',{picture:'42',name:'Taverna — menu'}));
 // Keep Seguir's authored geometry/eligibility, using native cursor instead of a tone flash.
 events[38].list=events[38].list.filter(c=>!(c.code===357&&c.parameters[1]==='ChangePictureChoiceSettingsOne'&&targets(c).includes(41)));
 const list=events[3].list;
 const head=list.find(c=>c.code===102&&c.parameters[0].some(s=>s.startsWith('Seguir<')));
 head.parameters[0]=head.parameters[0].slice(0,3).concat('Menu<Bind Picture: 42><Hide Choice Window>');
 const start=list.findIndex(c=>c.code===402&&c.parameters[1].startsWith('Quadro<'));
 const end=list.findIndex((c,i)=>i>start&&c.code===404&&c.indent===0);
 const bodies=[];
 for(const name of ['Quadro','Configurações','Salvar campanha atual']){
  const at=list.findIndex(c=>c.code===402&&c.parameters[1].startsWith(name+'<'));
  const stop=list.findIndex((c,i)=>i>at&&c.indent===0);
  const body=list.slice(at+1,stop).filter(c=>c.code!==0&&!(c.code===357&&c.parameters[1]==='PictureTextChange')).map(c=>({...c,indent:c.indent-1}));
  bodies.push(name==='Salvar campanha atual'?[presentation('ChoiceProgress',{text:'\\FS[18]Salvando…'}),...body,presentation('ChoiceProgress',{text:''})]:body);
 }
 const menu=choices('formation-menu',['\\FS[18]Quadro','\\FS[18]Configurações','\\FS[18]Salvar\ncampanha\natual','\\FS[18]Fechar menu'],[...bodies,[]],3);
 list.splice(start,end-start,command(402,[3,'Menu<Bind Picture: 42><Hide Choice Window>']),...nested([plugin('VisuMZ_2_PictureChoices','ClearPictureID',{'PictureIDs:arraynum':'[42]'}),...menu]),command(0,[],1));
 // All hero image transforms and the Seguir position are invariants of this increment.
 const geometry=e=>e.list.filter(c=>[231,232].includes(c.code)&&((c.parameters[0]>=10&&c.parameters[0]<=27)||c.parameters[0]===41));
 assert.deepEqual(geometry(events[38]),geometry(before[38]));
 assert.equal(events[354].list.filter(c=>c.code===231&&[3,4,5].includes(c.parameters[0])).length,0);
});

const path='rpg-maker/The Dryland Drowned/js/plugins.js';
const source=readFileSync(path,'utf8'),scope={};vm.runInNewContext(source,scope);
const entry=scope.$plugins.filter(p=>p.name==='VisuMZ_2_ExtMessageFunc');assert.equal(entry.length,1);
const old=entry[0].parameters['MsgCursor:struct'],cursor=JSON.parse(old);
assert.equal(cursor['Enable:eval'],'true');cursor['Enable:eval']='false';
const encoded=JSON.stringify(JSON.stringify(cursor));
assert.ok(source.includes(JSON.stringify(old)));
const output=source.replace(JSON.stringify(old),encoded),check={};vm.runInNewContext(output,check);
entry[0].parameters['MsgCursor:struct']=JSON.stringify(cursor);
assert.equal(JSON.stringify(check.$plugins),JSON.stringify(scope.$plugins));
writeFileSync(path,output);
console.log('Disabled ExtMessageFunc custom cursor; provider and all other settings preserved.');
