import assert from 'node:assert/strict';
import {command as c,plugin,text,plate,editCommonEvents} from './native-authoring.mjs';
plate('Dryland_MemorialLabel',296,192);
editCommonEvents(events=>{
  const before=JSON.stringify(events.filter(e=>e?.name.startsWith('memorial_cause.')));
  for(const row of events[59].list){
    const p=row.parameters;
    if(row.code===122&&p[3]===4&&typeof p[4]==='string'){
      p[4]=p[4].replace('* 310','* 312').replace('* 290','* 306');
      if(p[0]>=112&&p[0]<=119)p[4]=p[4].replace('- 150','- 148');
    }
    if(row.code===122&&p[0]>=192&&p[0]<=199){p[3]=4;p[4]="$gameVariables.value(152).replace(/<br>/g, ' ')";}
    if(row.code===231&&p[0]>=30&&p[0]<=37){assert.equal(p[1],'Dryland_DestinationCard');p[1]='Dryland_MemorialLabel';p[6]=p[7]=100;}
    if(row.code===357&&p[1]==='PictureTextChange'){
      const id=JSON.parse(p[3]['PictureIDs:arraynum'])[0];
      if(id>=30&&id<=37){const i=id-30;row.parameters=text(id,`<WordWrap>\\FS[24]\\V[${165+i}]<br>\\V[${200+i}]<br>\\V[${208+i}]`,'upperleft',8).parameters;}
    }
  }
  for(let i=0;i<8;i++){
    const list=events[338+i].list,index=list.findIndex(row=>row.code===401);
    assert.equal(list.filter(row=>row.code===401).length,1);
    list.splice(index+1,0,c(101,['',0,0,2,'']),c(401,[`\\V[${192+i}]`]));
  }
  // These IDs change from tavern children to independent memorial stones.
  const detach=plugin('VisuMZ_4_AttachedPictures','PictureRemovePicture',{'PictureID:arraynum':JSON.stringify(Array.from({length:8},(_,i)=>20+i))});
  events[337].list.unshift(structuredClone(detach));
  // The ordinary formation exit must release the same child bindings.
  events[39].list.unshift(structuredClone(detach));
  const args=events[351].list.find(row=>row.code===357&&row.parameters[1]==='SystemLoadImages').parameters[3];
  args['pictures:arraystr']=JSON.stringify([...JSON.parse(args['pictures:arraystr']),'Dryland_MemorialLabel']);
  assert.equal(JSON.stringify(events.filter(e=>e?.name.startsWith('memorial_cause.'))),before);
});
