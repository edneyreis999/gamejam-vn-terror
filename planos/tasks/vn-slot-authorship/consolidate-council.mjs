// One-shot migration from slot-authorship-01; not an ongoing authoring generator.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const root='rpg-maker/The Dryland Drowned';
const layout=JSON.parse(await readFile(`${root}/native-layout-manifest.json`));
assert.equal(layout.nativeLayoutVersion,'mz-20260911-slot-authorship-01');
const file=`${root}/data/CommonEvents.json`,events=JSON.parse(await readFile(file));
const helper=events[73],old=helper.list;
assert.equal(old[0].parameters[0],'@dryland-presentation-helper council.enter');
assert.equal(old.filter(c=>c.code===357&&c.parameters[1]==='Basic_EnterBust').length,24);
const command=(code,parameters=[],indent=0)=>({code,parameters,indent});
const list=[old[0]];
for(let slot=60;slot<=62;slot++){
 list.push(command(111,[1,144+slot-60,0,0,0]),command(411));
 for(let hero=1;hero<=8;hero++){
  const entry=old.find(c=>c.code===357&&c.parameters[1]==='Basic_EnterBust'&&c.parameters[3]['PictureID:eval']===String(slot)&&c.parameters[3]['PictureName:str']===`Dryland_H${hero}`);
  list.push(command(111,[1,144+slot-60,0,hero,0],1),{...entry,indent:2},command(412,[],1));
 }
 for(const name of ['Scale_ScaleTo','Move_MoveToCoordinates','Tone_NormalBust']){
  const transform=old.find(c=>c.code===357&&c.parameters[1]===name&&c.parameters[3]['PictureID:arrayeval']===JSON.stringify([String(slot)]));
  list.push({...transform,indent:1});
 }
 list.push(command(412));
}
helper.list=[...list,command(0)];
await writeFile(file,`[\n${events.map(x=>JSON.stringify(x)).join(',\n')}\n]\n`);
