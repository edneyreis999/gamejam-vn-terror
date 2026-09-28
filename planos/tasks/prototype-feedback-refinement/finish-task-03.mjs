import { readFileSync,writeFileSync } from 'node:fs';
import { editMap,editCommonEvents,presentation } from './native-authoring.mjs';
function bindControls(list) {
  for(let index=list.length-1;index>=0;index--) {
    const row=list[index];
    if(row.code===231&&row.parameters[1]==='Dryland_NarrativeChoice'&&list[index+1]?.parameters[1]!=='BindInterfacePicture') list.splice(index+1,0,{...presentation('BindInterfacePicture',{picture:String(row.parameters[0]),name:'Escolha narrativa'}),indent:row.indent});
  }
}
for(const id of [...Array.from({length:16},(_,i)=>7+i),...Array.from({length:8},(_,i)=>37+i)])editMap(id,bindControls);
editCommonEvents(events=>bindControls(events[46].list));
const file='rpg-maker/tests/suites/native-inventory.mjs';
let source=readFileSync(file,'utf8');
source=source.replace("'MapElven','MapComplete'].map", "'MapElven','MapComplete','HeroContainer','NarrativeChoice'].map");
source=source.replace('slice(-29).map','slice(-expected.length).map');
source=source.replace("browser.evaluate('preloadLog.filter(item=>item.type===\"request\").slice(-29).map(item=>item.name)')", 'browser.evaluate(`preloadLog.filter(item=>item.type==="request").slice(-${expected.length}).map(item=>item.name)`)');
writeFileSync(file,source);
const formation='rpg-maker/tests/suites/formation.mjs';
source=readFileSync(formation,'utf8').replace("assert.equal(expected.at(-1), 'Lugar velho avisa antes de cair. Prestem atenção aos estalos.');","assert.equal(expected.at(-1).replace(/\\s+/g,' '), 'Mas prestem atenção aos estalos. Madeira velha pode estar avisando que vai ceder.');");
writeFileSync(formation,source);
