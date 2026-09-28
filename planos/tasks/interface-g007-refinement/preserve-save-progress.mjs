import assert from 'node:assert/strict';
import {editCommonEvents,presentation} from '../prototype-feedback-refinement/native-authoring.mjs';
editCommonEvents(events=>{
 const list=events[3].list;
 const index=list.findIndex(c=>c.code===357&&c.parameters[1]==='SaveCurrentCampaign');
 assert.ok(index>0);
 if(list[index-1].parameters?.[1]==='ChoiceProgress')return;
 const progress=text=>({...presentation('ChoiceProgress',{text}),indent:list[index].indent});
 list.splice(index,1,progress('\\FS[18]Salvando…'),list[index],progress(''));
});
