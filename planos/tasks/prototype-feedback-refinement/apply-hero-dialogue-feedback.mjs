import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {game,plugin,editCommonEvents,plate} from './native-authoring.mjs';

const revision='c47c6fcbc847158d0f96c9ec3eab912f6de127e2';
const baseline=JSON.parse(execFileSync('git',['show',`${revision}:${game}/data/CommonEvents.json`],{encoding:'utf8',maxBuffer:10e6}))[38].list;
const is=(c,name)=>c.code===357&&c.parameters[1]===name;
const picture=(list,id)=>list.find(c=>c.code===231&&c.parameters[0]===id);
const attach=(id,parent,indent)=>({...plugin('VisuMZ_4_AttachedPictures','PictureAddPicture',{'PictureID:arraynum':JSON.stringify([id]),'TargetID:num':String(parent)}),indent});
const detach=(id,indent)=>({...plugin('VisuMZ_4_AttachedPictures','PictureRemovePicture',{'PictureID:arraynum':JSON.stringify([id])}),indent});
const nameId=c=>is(c,'PictureTextChange')?JSON.parse(c.parameters[3]['PictureIDs:arraynum'])[0]:-1;

editCommonEvents(events=>{
 if(events[38].list.some(c=>c.code===231&&c.parameters[1]==='Dryland_HeroGroup_H1'))return;
 if(!events[38].list.some(c=>c.code===231&&c.parameters[1]==='Dryland_HeroContainer')){
  for(let id=10;id<=17;id++)assert.deepEqual(picture(events[38].list,id),picture(baseline,id));
  console.log('Historical hero layout already restored');return;
 }
 // Revert only the hero presentation, retaining current preparation/actions.
 for(const eventId of [38,45]){
  const list=events[eventId].list;
  for(let i=list.length-1;i>=0;i--){
   const c=list[i],id=c.parameters[0];
   if(c.code===231&&id>=10&&id<=17){
    list[i]={...structuredClone(picture(baseline,id)),indent:c.indent};
   }else if(c.code===231&&id>=20&&id<=27||is(c,'PictureAddPicture')&&Number(c.parameters[3]['TargetID:num'])>=10&&Number(c.parameters[3]['TargetID:num'])<=17){
    list.splice(i,1);
   }else if(is(c,'BindInterfacePicture')&&Number(c.parameters[3].picture)>=20&&Number(c.parameters[3].picture)<=27){
    list.splice(i,1);
   }else if(c.code===232&&id>=10&&id<=17){
    const original=picture(baseline,id).parameters;
    c.parameters[2]=original[2];
    for(const j of [4,5,6,7])c.parameters[j]=original[j];
   }else if(nameId(c)>=10&&nameId(c)<=17){
    const label=nameId(c)+20,selected=c.parameters[3]['down:json'].includes('✓');
    const original=baseline.find(row=>nameId(row)===label&&row.parameters[3]['center:json'].includes('✓')===selected);
    assert.ok(original);
    list[i]={...structuredClone(original),indent:c.indent};
   }
  }
  for(let id=10;id<=17;id++){
   const label=id+20,original=picture(baseline,id).parameters;
   const first=list.findIndex(c=>nameId(c)===label);assert.ok(first>=0);
   let insert=first;
   if(eventId===38)while(list[insert].code!==111||list[insert].indent!==1)insert--;
   const indent=eventId===38?1:list[first].indent;
   const tag=structuredClone(picture(baseline,label));tag.indent=indent;
   // Restore the historical name before the final group conversion below.
   const p=tag.parameters;
   p[4]=(p[4]-original[4])/(original[6]/100);
   p[5]=(p[5]-original[5])/(original[7]/100);
   p[6]/=original[6]/100;p[7]/=original[7]/100;
   list.splice(insert,0,tag,attach(label,id,indent));
  }
 }
 // Undo the old portrait attachment cleanup, then own the name attachment.
 for(const eventId of [3,38,39,45,349]){
  const list=events[eventId].list;
  for(let i=list.length-1;i>=0;i--){
   const c=list[i];
   if(is(c,'PictureRemovePicture')&&JSON.parse(c.parameters[3]['PictureID:arraynum']).every(id=>id>=20&&id<=27))list.splice(i,1);
   else if(c.code===235&&c.parameters[0]>=30&&c.parameters[0]<=37)list.splice(i+1,0,detach(c.parameters[0],c.indent));
  }
 }
 for(let id=10;id<=17;id++)assert.deepEqual(picture(events[38].list,id),picture(baseline,id));
 for(const id of [38,45])assert.ok(!events[id].list.some(c=>c.code===231&&c.parameters[1]==='Dryland_HeroContainer'));
});

const roots=[10,12,11,13,14,15,16,17];
editCommonEvents(events=>{
 if(events[38].list.some(c=>c.code===231&&c.parameters[1]==='Dryland_HeroGroup_H1'))return;
 for(const eventId of [38,45]){
  const list=events[eventId].list;
  for(let i=list.length-1;i>=0;i--){
   const c=list[i],id=c.parameters[0];
   if(c.code===231&&id>=10&&id<=17){
    const hero=id-10,original=picture(baseline,id).parameters,asset='Dryland_HeroGroup_H'+(hero+1);
    const png=readFileSync(game+'/img/pictures/'+original[1]+'.png');
    const tag=readFileSync(game+'/img/pictures/Dryland_Tag.png');
    plate(asset,Math.ceil(Math.max(png.readUInt32BE(16)*0.35,tag.readUInt32BE(16))),Math.ceil(Math.max(png.readUInt32BE(20)*0.35,302+tag.readUInt32BE(20))),'text');
    const container=structuredClone(c);container.parameters=[roots[hero],asset,1,0,original[4],original[5],100,100,255,0];
    const image=structuredClone(c);image.parameters=[20+hero,original[1],1,0,0,0,35,35,255,0];
    list.splice(i,1,container,image,attach(20+hero,roots[hero],c.indent));
   }else if(c.code===231&&id>=30&&id<=37){
    c.parameters=structuredClone(picture(baseline,id).parameters);c.parameters[4]=0;c.parameters[5]=151;
   }else if(is(c,'PictureAddPicture')){
    const label=JSON.parse(c.parameters[3]['PictureID:arraynum'])[0];
    if(label>=30&&label<=37)c.parameters[3]['TargetID:num']=String(roots[label-30]);
   }else if(c.code===232&&id>=10&&id<=17){
    c.parameters[0]=roots[id-10];c.parameters[6]=100;c.parameters[7]=100;
   }else if(is(c,'ChangePictureChoiceSettingsOne')){
    const ids=JSON.parse(c.parameters[3]['PictureIDs:arraynum']);
    if(ids.length===1&&ids[0]>=10&&ids[0]<=17)c.parameters[3]['PictureIDs:arraynum']=JSON.stringify([roots[ids[0]-10]]);
   }
  }
 }
 // Elowen's label overlaps Griznik's silhouette. Their portraits do not overlap;
 // grouping Elowen above Griznik retains both the artwork and readable names.
 for(const c of events[3].list){
  const remap=s=>s.replace(/<Bind Picture: (10|11|12|13|14|15|16|17)>/g,(_,id)=>`<Bind Picture: ${roots[Number(id)-10]}>`);
  if(c.code===102)c.parameters[0]=c.parameters[0].map(remap);
  if(c.code===402)c.parameters[1]=remap(c.parameters[1]);
 }
 for(const eventId of [3,38,39,45,349]){
  const list=events[eventId].list;
  for(let i=list.length-1;i>=0;i--)if(list[i].code===235&&list[i].parameters[0]>=20&&list[i].parameters[0]<=27)list.splice(i+1,0,detach(list[i].parameters[0],list[i].indent));
 }
 const preload=events[351].list.find(c=>is(c,'SystemLoadImages')).parameters[3];
 const assets=JSON.parse(preload['pictures:arraystr']).filter(name=>name!=='Dryland_HeroContainer');
 preload['pictures:arraystr']=JSON.stringify([...assets,...roots.map((_,i)=>'Dryland_HeroGroup_H'+(i+1))]);
});

editCommonEvents(events=>{
 // Creation guards and dead-hero cleanup follow the group, not its old layer.
 for(const id of [11,12]){
  const list=events[38].list,asset='Dryland_HeroGroup_H'+(id-9);
  const start=list.findIndex(c=>c.code===231&&c.parameters[1]===asset);
  assert.ok(start>=0);list[start-1].parameters[1]=`!$gameScreen.picture(${roots[id-10]})`;
  const label=list.findIndex(c=>c.code===231&&c.parameters[0]===id+20);
  const end=list.findIndex((c,i)=>i>label&&c.code===412&&c.indent===0);
  assert.ok(label>=0&&end>label);
  for(const c of list.slice(label,end))if(c.code===235&&[11,12].includes(c.parameters[0]))c.parameters[0]=roots[id-10];
  const clean=events[349].list;
  const query=clean.findIndex(c=>is(c,'Query')&&c.parameters[3].id==='H'+(id-9));
  const cleanEnd=clean.findIndex((c,i)=>i>query&&c.code===412&&c.indent===0);
  assert.ok(query>=0&&cleanEnd>query);
  for(const c of clean.slice(query,cleanEnd))if(c.code===235&&[11,12].includes(c.parameters[0]))c.parameters[0]=roots[id-10];
 }
});
