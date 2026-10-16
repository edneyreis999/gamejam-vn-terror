import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
const expectedRef='planos/tasks/campfire-hero-bonds/verification.md#runtime-scenarios';
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'campfire-low-roster',requires:['native-mz','public-input'],criteria:[{id:'low-roster-retreat-total-loss',variant:'reduced-large',expectedRef}],storage:{expectedRef},browser:{width:1920,height:1080,reducedMotion:'reduce',dpr:1,locale:'en-US',channel:'chrome',launchArgs:['--force-device-scale-factor=1'],query:'',timeoutMs:30000,executionTimeoutMs:1200000}};
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
 const queue=[{dead:[],rounds:[]}],seen=new Set(['']);let plan;
 for(let n=0;n<queue.length;n++){
  const node=queue[n];if(node.dead.length===7){plan=node.rounds;break;}
  for(const group of groups(living(node.dead),Math.min(3,8-node.dead.length)))for(const outcome of outcomes(group)){
   const victims=outcome.steps.flatMap(s=>s.victim?[s.victim]:[]);if(!victims.length)continue;
   const dead=[...node.dead,...victims].sort();if(node.dead.length<6&&dead.length>6)continue;
   const key=dead.join(',');if(seen.has(key))continue;seen.add(key);queue.push({dead,rounds:[...node.rounds,{group,steps:outcome.steps,dead}]});
  }
 }
 assert.ok(plan,'Known traps must admit planned public loss path');
 context.report.observations.push({label:'known-route-plan',kind:'plan',value:{known,plan}});
 for(const [roundIndex,round] of plan.entries()){
  const current=await state();
  if(living(current.deadHeroIds).length>3){
   for(const id of current.draftPartyIds.filter(id=>!round.group.includes(id))){await hero(Number(id.slice(1)));await choose('\\V[153]');await until('formation');}
   const selected=(await state()).draftPartyIds;
   for(const id of round.group.filter(id=>!selected.includes(id))){await hero(Number(id.slice(1)));await choose('\\V[153]');await until('formation');}
  }
  await depart('physical');
  for(const [pos,step] of round.steps.entries()){
   await until('approaches');const before=await state();assert.equal(before.assignments.physical[pos],known[pos]);
   await choose(`choice.${known[pos].toLowerCase()}.approach_${step.approach+1}`);
   if(step.victim){await until('sacrifice');await choose('\\V['+(189+before.partyIds.indexOf(step.victim))+']');}
  }
  await until('camp');let camp=await state();assert.deepEqual([...camp.deadHeroIds].sort(),round.dead);
  const total=8-camp.deadHeroIds.length;await context.shot('camp-living-total-'+total+'-round-'+roundIndex);
  assert.equal(await context.read('reduced-dead-absence',()=>{const dead=$gameSystem._dryland.campaign.deadHeroIds;return dead.every(id=>!$gameScreen.picture(Number(id.slice(1))+9));}),true);
  if(total<=2)await context.storage.capture('camp-total-'+total);
  await choose('ui.camp.retreat');await until('formation');
  const returned=await state();for(const key of ['deadHeroIds','deathLocations','assignments','progress'])assert.deepEqual(returned[key],camp[key]);
 }
 assert.equal((await state()).deadHeroIds.length,7);await depart('physical');await until('approaches');
 const before=await state(),skill=gdd.encounterPairs[known[0]].findIndex(c=>!gdd.heroPairs[before.partyIds[0]].includes(c));assert.ok(skill>=0);
 await choose(`choice.${known[0].toLowerCase()}.approach_${skill+1}`);await until('sacrifice');await choose('\\V[189]');
 // Stop at the authored bad ending after acknowledging its preceding death.
 for(let n=0;n<40;n++){await p.ready();if((await state()).phase==='ending')break;await context.input.key('Enter');}
 const ending=await state();assert.equal(ending.endingId,'bad');assert.equal(ending.deadHeroIds.length,8);assert.notEqual(ending.phase,'camp_arrival');await context.shot('total-loss-ending');await context.storage.capture('total-loss');
}
export async function verify({artifacts}){return {criteria:[{...scenario.criteria[0],status:'pass',evidence:artifacts.map(a=>a.path),limits:['Visual inspection separate; only reduced-motion disappearance observed here.']}],pendingReviews:['Inspect one/two living and high-death framing at 1920x1080.']};}
