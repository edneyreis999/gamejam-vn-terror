import assert from 'node:assert/strict';
import {command as c,plugin,presentation,button,text,erase,plate,editMap,editCommonEvents} from './native-authoring.mjs';
plate('Dryland_FinalChoice',504,304,'final');
editMap(23,list=>{
  const index=list.findIndex(row=>row.code===102),choice=list[index];
  assert.equal(choice.parameters[0].length,2);
  assert.ok(choice.parameters[0].every(label=>!label.includes('Bind Picture')));
  const labels=choice.parameters[0].map((label,i)=>label+`<Bind Picture: ${50+i}><Hide Choice Window>`);
  choice.parameters[0]=labels;
  const bodies=['\\FS[36]Reunir o medalhão\n\n\\FS[26]libertar os amantes\ne morrer','\\FS[36]Destruir o medalhão\n\n\\FS[26]sobreviver e entregá-los\na Andirá'];
  const stage=[...erase(Array.from({length:11},(_,i)=>60+i)),
    plugin('VisuMZ_4_AttachedPictures','MessageRemovePicture',{'PictureID:arraynum':JSON.stringify(Array.from({length:11},(_,i)=>60+i))})];
  for(let i=0;i<2;i++)stage.push(...button(50+i,'Dryland_FinalChoice','',112+552*i,208),text(50+i,bodies[i],'center',32),presentation('BindInterfacePicture',{picture:String(50+i),name:'Decisão final — '+(i?'destruir':'reunir')}));
  list.splice(index,0,...stage);
  for(let i=list.length-1;i>=0;i--)if(list[i].code===402&&list[i].indent===0) {
    list[i].parameters[1]=labels[list[i].parameters[0]];
    list.splice(i+1,0,...erase([50,51]).map(row=>({...row,indent:1})));
  }
});
editCommonEvents(events=>{
  const args=events[351].list.find(row=>row.code===357&&row.parameters[1]==='SystemLoadImages').parameters[3];
  args['pictures:arraystr']=JSON.stringify([...JSON.parse(args['pictures:arraystr']),'Dryland_FinalChoice']);
});
