import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {editCommonEvents} from './native-authoring.mjs';
const names=['Black','TitleText','AgeWarning','MenuButton','AgeCheckbox','AgeMark'];
if(process.argv[2]==='test'){
 const path='rpg-maker/tests/suites/native-inventory.mjs';let source=readFileSync(path,'utf8');
 assert.ok(source.includes("'FinalChoice','MemorialLabel'].map"));
 source=source.replace("'FinalChoice','MemorialLabel'].map","'FinalChoice','MemorialLabel',"+names.map(name=>JSON.stringify(name)).join(',')+'].map');
 writeFileSync(path,source);
}else if(process.argv[2]==='runtime'){
 editCommonEvents(events=>{
  const args=events[351].list.find(c=>c.code===357&&c.parameters[1]==='SystemLoadImages').parameters[3];
  const pictures=JSON.parse(args['pictures:arraystr']);
  for(const name of names){assert.ok(!pictures.includes('Dryland_'+name));pictures.push('Dryland_'+name);}
  args['pictures:arraystr']=JSON.stringify(pictures);
 });
}else throw Error('Select test or runtime explicitly.');
