// Task16 visual correction: reuse each hero's verified solo framing in its epilogue.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const data=new URL('../../../rpg-maker/The Dryland Drowned/data/',import.meta.url);
const command=(list,name)=>list.filter(c=>c.code===357&&c.parameters[0]==='VisuMZ_2_VNPictureBusts'&&c.parameters[1]===name);
for(let hero=1;hero<=8;hero++){
 const source=JSON.parse(await readFile(new URL(`Map${String(36+hero).padStart(3,'0')}.json`,data),'utf8'));
 const path=new URL(`Map${String(28+hero).padStart(3,'0')}.json`,data),map=JSON.parse(await readFile(path,'utf8'));
 const list=map.events[1].pages[0].list,before=structuredClone(list);
 const solo=source.events[1].pages[0].list;
 for(const [name,keys,old] of [
  ['Scale_ScaleTo',['TargetScaleX:str','TargetScaleY:str'],['100','100']],
  ['Move_MoveToCoordinates',['TargetX:str','TargetY:str'],['320','850']]
 ]){
  const targets=command(list,name);assert.equal(targets.length,1);
  const target=targets[0].parameters[3],reference=command(solo,name)[0].parameters[3];
  assert.equal(target['PictureID:arrayeval'],'["60"]');
  assert.equal(target['Duration:eval'],'0');
  keys.forEach((key,i)=>{assert.ok(target[key]===old[i]||target[key]===reference[key]);target[key]=reference[key];});
 }
 const changed=list.map((c,i)=>JSON.stringify(c)!==JSON.stringify(before[i])).filter(Boolean).length;
 assert.ok(changed===0||changed===2);
 if(changed){await writeFile(path,JSON.stringify(map,null,2)+'\n');assert.deepEqual(JSON.parse(await readFile(path,'utf8')),map);}
 console.log(`Map${28+hero}: ${changed} framing commands changed; native list positions preserved`);
}
