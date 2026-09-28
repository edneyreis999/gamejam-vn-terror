import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { editMap, editCommonEvents, message } from './native-authoring.mjs';

const spec = readFileSync(new URL('spec.md',import.meta.url),'utf8');
const prologue = spec.split('### RQ-003 — Welcoming prologue')[1].split('### RQ-004')[0];
const blocks = [...prologue.matchAll(/^\s*> (.+)$/gm)].map(match=>match[1].trim());
assert.equal(blocks.length,9);
const isCommand = (item, name) => item.code === 357 && item.parameters[1] === name;

function frame(list) {
  const portraits = new Map();
  for(const item of list) {
    if(item.code !== 357 || item.parameters[0] !== 'VisuMZ_2_VNPictureBusts') continue;
    const [,name,,args] = item.parameters;
    if(name === 'Basic_EnterBust') portraits.set(args['PictureID:eval'],args['PictureName:str']);
    const ids = JSON.parse(args['PictureID:arrayeval'] || '[]');
    if(ids.length !== 1) continue;
    const portrait = portraits.get(ids[0]);
    if(portrait === 'Reed final') {
      if(name === 'Scale_ScaleTo') args['TargetScaleX:str'] = args['TargetScaleY:str'] = '82.14285714285714';
      if(name === 'Move_MoveToCoordinates') {args['TargetX:str']='472.42857142857144';args['TargetY:str']='40';}
    }
    if(portrait === 'Dryland_ivai' && ids[0] === '63') {
      if(name === 'Scale_ScaleTo' && args['TargetScaleX:str'] === '44') args['TargetScaleX:str'] = args['TargetScaleY:str'] = '50';
      if(name === 'Move_MoveToCoordinates') {args['TargetX:str']='960';args['TargetY:str']='725';}
    }
  }
}

editMap(2, list => {
  const completions = list.flatMap((item,index)=>isCommand(item,'ReadingComplete')?[index]:[]);
  assert.equal(completions.length,6);
  for(let passage=2;passage>=0;passage--) {
    const from = passage === 0 ? 0 : completions[passage-1]+1;
    const start = list.findIndex((item,index)=>index>=from && item.code===101);
    let end=start;
    while([101,401].includes(list[end].code))end++;
    assert.ok(start>=0 && end<completions[passage]);
    list.splice(start,end-start,...blocks.slice(passage*2,passage*2+2).flatMap(prose=>message(prose,'Rheed')));
  }
  frame(list);
  const actual = [];let text=[];
  for(const item of list) {
    if(item.code===101 && text.length){actual.push(text.join(' '));text=[];}
    if(item.code===401)text.push(item.parameters[0].trim());
  }
  if(text.length)actual.push(text.join(' '));
  assert.deepEqual(actual,blocks,'All nine approved blocks including the final exchange are preserved');
});
editMap(23,frame);
editCommonEvents(events=>{for(const id of [263,264,265,302,352,353])frame(events[id].list);});
