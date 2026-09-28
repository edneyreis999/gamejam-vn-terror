import assert from 'node:assert/strict';
import {editCommonEvents,plugin} from './native-authoring.mjs';

// Only CE002's title commands change; age acknowledgement remains in CE354.
editCommonEvents(events=>{
 const event=events[2];
 assert.equal(event.list.filter(c=>c.code===102).length,2);
 if(!event.list.some(c=>c.code===231&&c.parameters[1]==='Dryland_MenuButton')){
  assert.ok(event.list.filter(c=>c.code===102).every(c=>c.parameters[0][0]==='Novo jogo<Choice Width: 352>'));
  return;
 }
 const buttonIds=new Set([3,4,5]);
 event.list=event.list.filter(c=>{
  if([231,234].includes(c.code)&&buttonIds.has(c.parameters[0]))return false;
  if(c.code!==357||!['PictureTextChange','ChangePictureChoiceSettingsOne'].includes(c.parameters[1]))return true;
  return !JSON.parse(c.parameters[3]['PictureIDs:arraynum']).every(id=>buttonIds.has(id));
 });
 const clean=label=>label.replace(/<Bind Picture: \d+>|<Hide Choice Window>/g,'');
 for(const c of event.list){
  if(c.code===102){c.parameters[0]=c.parameters[0].map(clean);c.parameters[0][0]+='<Choice Width: 352>';c.parameters[3]=1;}
  if(c.code===402){c.parameters[1]=clean(c.parameters[1]);if(c.parameters[0]===0)c.parameters[1]+='<Choice Width: 352>';}
 }
 assert.ok(event.list.filter(c=>c.code===102).every(c=>c.parameters[0].length===3&&c.parameters[4]===0));
});

editCommonEvents(events=>{
 const list=events[2].list;
 if(list.some(c=>c.code===357&&c.parameters[1]==='ChoiceWindowDistance'))return;
 for(let i=list.length-1;i>=0;i--){
  if(list[i].code!==102)continue;
  const indent=list[i].indent;
  const distance=value=>({...plugin('VisuMZ_1_MessageCore','ChoiceWindowDistance',{'Distance:eval':value}),indent});
  list.splice(i+1,0,distance('0'));
  list.splice(i,0,distance('Graphics.boxHeight / 2 - SceneManager._scene._messageWindow.height'));
 }
});
