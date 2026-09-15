// One-time task16 correction authorized on 2026-09-15. Values remain editable
// in native event commands; this script is not loaded by the game.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const directory=new URL('../../../rpg-maker/The Dryland Drowned/data/',import.meta.url);
const read=async name=>JSON.parse(await readFile(new URL(name,directory),'utf8'));
const events=await read('CommonEvents.json'),map=await read('Map023.json');
const before=structuredClone(events),mapBefore=structuredClone(map);
const marker='Enquadramento do Conselho por personagem — correção 2026-09-15';
assert.ok(!events[73].list.some(c=>c.code===108&&c.parameters[0]===marker),'Correction already applied; do not replay this migration over edited native data.');
// Source PNG dimensions and opaque bounds measured before correction. Frame
// each occupied Council slot within 200px, with the portrait top at 80px.
const geometry=[null,
 [1584,1986,144,75,1407],[2160,3840,717,564,1854],
 [1358,2147,138,60,1236],[2160,3840,503,752,1475],
 [1494,2354,91,88,1301],[1552,2397,123,132,1336],
 [2160,3840,386,495,1490],[1264,2136,213,78,1197]];
const round=n=>Math.round(n*100)/100;
const councilFrame=(hero,slot,listening)=>{
 const [width,height,left,top,right]=geometry[hero];
 const scale=round(200/(right-left)*100*(listening ? 0.9 : 1));
 return {scale,x:round([180,400,620][slot-60]-(listening?16:0)+(width/2-(left+right)/2)*scale/100),y:round((listening?90:80)+(height-top)*scale/100)};
};
function transform(command,frame){
 const copy=structuredClone(command),args=copy.parameters[3];
 if(copy.parameters[1]==='Scale_ScaleTo')args['TargetScaleX:str']=args['TargetScaleY:str']=String(frame.scale);
 else {args['TargetX:str']=String(frame.x);args['TargetY:str']=String(frame.y);}
 return copy;
}
const visual=c=>c.code===357&&c.parameters[0]==='VisuMZ_2_VNPictureBusts'&&['Scale_ScaleTo','Move_MoveToCoordinates'].includes(c.parameters[1]);
const rows=[];
for(const id of [68,69,70,71,73,74,79]){
 const result=[];
 for(const command of events[id].list){
  if(!visual(command)){result.push(command);continue;}
  const slot=Number(JSON.parse(command.parameters[3]['PictureID:arrayeval'])[0]);
  if(slot>=60&&slot<=62){
   const listening=id===71||([68,69,70].includes(id)&&slot!==id-8);
   const args=command.parameters[3];
   if(command.parameters[1]==='Scale_ScaleTo')assert.ok(['54','60'].includes(args['TargetScaleX:str']));
   else assert.equal(args['TargetY:str'],'650');
   for(let hero=1;hero<=8;hero++){
    result.push({code:111,indent:command.indent,parameters:[1,144+slot-60,0,hero,0]});
    const framed=transform(command,councilFrame(hero,slot,listening));framed.indent++;
    result.push(framed,{code:412,indent:command.indent,parameters:[]});
   }
  }else if(slot===63){
   const args=command.parameters[3],active=id===71||id===79;
   if(command.parameters[1]==='Scale_ScaleTo')assert.ok(['90','100'].includes(args['TargetScaleX:str']));
   else assert.equal(args['TargetY:str'],'850');
   result.push(transform(command,{scale:active?44:40,x:active?960:976,y:725}));
  }else if(slot===65){
   const args=command.parameters[3];
   if(command.parameters[1]==='Scale_ScaleTo')assert.ok(['90','100'].includes(args['TargetScaleX:str']));
   else assert.equal(args['TargetY:str'],'500');
   result.push(transform(command,{scale:id===74||id===79?30:27,x:330,y:554}));
  }else result.push(command);
 }
 events[id].list=result;rows.push({event:id,name:events[id].name,commands:result.length});
}
events[73].list.unshift({code:108,indent:0,parameters:[marker]});
for(let hero=1;hero<=8;hero++){
 const solo=(await read(`Map${String(36+hero).padStart(3,'0')}.json`)).events[1].pages[0].list;
 for(const name of ['Scale_ScaleTo','Move_MoveToCoordinates']){
  const matches=events[281+hero].list.filter(c=>visual(c)&&c.parameters[1]===name);assert.equal(matches.length,1);
  const source=solo.find(c=>visual(c)&&c.parameters[1]===name).parameters[3];
  const target=matches[0].parameters[3];
  const keys=name==='Scale_ScaleTo'?['TargetScaleX:str','TargetScaleY:str']:['TargetX:str','TargetY:str'];
  assert.deepEqual(keys.map(k=>target[k]),name==='Scale_ScaleTo'?['100','100']:['320','850']);
  for(const key of keys)target[key]=source[key];
 }
 rows.push({event:281+hero,name:events[281+hero].name,commands:events[281+hero].list.length});
}
let ivai=0;
for(const command of map.events[1].pages[0].list){
 if(!visual(command))continue;
 assert.equal(command.parameters[3]['PictureID:arrayeval'],'["63"]');
 const replacement=transform(command,{scale:44,x:960,y:725});
 command.parameters=replacement.parameters;ivai++;
}
assert.equal(ivai,4);
assert.equal(events.length,before.length);
for(let id=0;id<events.length;id++)if(!rows.some(row=>row.event===id))assert.deepEqual(events[id],before[id]);
assert.equal(map.events[1].pages[0].list.length,mapBefore.events[1].pages[0].list.length);
for(const [name,value,spaces] of [['CommonEvents.json',events,4],['Map023.json',map,2]]){
 await writeFile(new URL(name,directory),JSON.stringify(value,null,spaces)+'\n');assert.deepEqual(await read(name),value);
}
console.log(JSON.stringify({events:rows,map:23,ivaiCommands:ivai},null,2));
