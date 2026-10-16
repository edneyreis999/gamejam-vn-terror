import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
const expectedRef='planos/tasks/campfire-hero-bonds/verification.md#runtime-scenarios';
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'campfire-automatic-return',requires:['native-mz','public-input'],criteria:[{id:'last-participant-return',variant:'reserves-present',expectedRef}],storage:{expectedRef},browser:{width:1280,height:720,dpr:1,locale:'en-US',channel:'chrome',launchArgs:['--force-device-scale-factor=1'],query:'',timeoutMs:30000,executionTimeoutMs:1200000}};
export async function execute(context){
 const p=new DirectedNativePlayer(context);
 const state=()=>context.read('campaign',()=>JSON.parse(JSON.stringify($gameSystem._dryland.campaign)));
 async function choose(fragment){
  const s=await p.ready();assert.ok(s.active,JSON.stringify(s));
  const prior=await context.read('choice-signature',()=>JSON.stringify($gameMessage.choices()));
  const i=await context.read('raw-target',fragment=>SceneManager._scene._choiceListWindow._list.findIndex(item=>$gameMessage.choices()[item.ext].includes(fragment)),fragment);
  assert.ok(i>=0,'Missing '+fragment+' '+JSON.stringify(s));
  for(let n=0;n<20;n++){
   const current=await context.read('focus',()=>SceneManager._scene._choiceListWindow.index());if(current===i)break;
   await context.input.key(current<i?'ArrowDown':'ArrowUp');
  }
  await context.input.key('Enter');await context.wait(prior=>!SceneManager._scene._choiceListWindow?.isOpenAndActive()||JSON.stringify($gameMessage.choices())!==prior,prior);
 }
 async function until(kind){
  for(let n=0;n<200;n++){
   const s=await p.ready();if(s.active&&s.kind===kind)return s;
   if(kind==='formation'&&s.active&&s.kind==='hero'){await choose('choice.conv.back');continue;}
   assert.ok(s.paused,JSON.stringify(s));
   const c=await state();
   if(c.phase==='camp_arrival'&&!c.activeSocialTopicId)await context.shot('arrival-'+c.sequence);
   await context.input.key('Enter');
  }
  throw Error('Too many passages before '+kind);
 }
 async function hero(id){await choose('\\V['+(164+id)+']');await until('hero');}
 async function depart(route){await choose('choice.tavern.depart');await until('destinations');await choose(route==='physical'?'173':'174');}
 async function encounter(victim){
  await until('approaches');const c=await state(),id=c.assignments[c.dungeonId][c.position-1];
  const viable=gdd.encounterPairs[id].map(skill=>c.partyIds.some(h=>gdd.heroPairs[h].includes(skill)));
  const i=viable.indexOf(!victim);assert.ok(i>=0,JSON.stringify({id,viable,victim}));
  await choose(`choice.${id.toLowerCase()}.approach_${i+1}`);
  if(victim){await until('sacrifice');const index=c.partyIds.indexOf('H'+victim);assert.ok(index>=0);await choose('\\V['+(189+index)+']');}
 }


 await p.ready();await choose('choice.title.new_game');await p.file(1);await until('formation');
 for(const id of [1,2,3]){await hero(id);await choose('\\V[153]');await until('formation');}
 await depart('physical');await encounter();await encounter();await until('camp');
 const known=(await state()).assignments.physical.slice(0,2);await context.shot('large-three-survivors');
 await choose('ui.camp.retreat');await until('formation');
 const heroes=Object.keys(gdd.heroPairs);
 const living=dead=>heroes.filter(id=>!dead.includes(id));
 function groups(ids,n){if(!n)return [[]];return ids.flatMap((id,i)=>groups(ids.slice(i+1),n-1).map(rest=>[id,...rest]));}
 function outcomes(party,pos=0,steps=[]){
  if(pos===2)return [{party,steps}];
  const skills=gdd.encounterPairs[known[pos]],viable=skills.map(skill=>party.some(id=>gdd.heroPairs[id].includes(skill))),rows=[];
  if(viable.includes(true))rows.push(...outcomes(party,pos+1,[...steps,{approach:viable.indexOf(true)}]));
  if(party.length>1&&viable.includes(false))for(const victim of party)rows.push(...outcomes(party.filter(id=>id!==victim),pos+1,[...steps,{approach:viable.indexOf(false),victim}]));
  return rows;
 }

 const plan=groups(heroes,3).flatMap(group=>outcomes(group).filter(o=>o.party.length===1).map(o=>({group,...o})))[0];
 assert.ok(plan,'Known route supports losing two members');
 const before=await state();
 for(const id of before.draftPartyIds.filter(id=>!plan.group.includes(id))){await hero(Number(id.slice(1)));await choose('\\V[153]');await until('formation');}
 const selected=(await state()).draftPartyIds;
 for(const id of plan.group.filter(id=>!selected.includes(id))){await hero(Number(id.slice(1)));await choose('\\V[153]');await until('formation');}
 await depart('physical');
 for(const [pos,step] of plan.steps.entries()){
  await until('approaches');const c=await state();await choose(`choice.${known[pos].toLowerCase()}.approach_${step.approach+1}`);
  await until('sacrifice');await choose('\\V['+(189+c.partyIds.indexOf(step.victim))+']');
 }
 await until('camp');const camp=await state();assert.equal(camp.partyIds.length,1);assert.equal(camp.deadHeroIds.length,2);await context.shot('one-present-with-reserves');
 await choose('ui.camp.continue');await until('approaches');const current=await state(),id=current.assignments.physical[2];
 const failure=gdd.encounterPairs[id].findIndex(skill=>!gdd.heroPairs[current.partyIds[0]].includes(skill));assert.ok(failure>=0);
 await choose(`choice.${id.toLowerCase()}.approach_${failure+1}`);await until('sacrifice');await choose('\\V[189]');await until('formation');
 const returned=await state();assert.equal(returned.phase,'formation');assert.equal(returned.deadHeroIds.length,3);assert.equal(returned.endingId,null);assert.equal(returned.progress.physical,3);
 assert.deepEqual(returned.assignments,current.assignments);assert.ok(returned.history.some(a=>a.type==='COMPLETE_PASSAGE'&&a.passageId.startsWith('automatic_retreat')));
 await context.shot('automatic-return-with-reserves');await context.storage.capture('automatic-return');
}
export async function verify({artifacts}){return {criteria:[{...scenario.criteria[0],status:'pass',evidence:artifacts.map(a=>a.path),limits:[]}],pendingReviews:[]};}
