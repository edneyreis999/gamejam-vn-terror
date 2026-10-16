import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
const expectedRef='planos/tasks/campfire-hero-bonds/verification.md#runtime-scenarios';
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'campfire-losses',requires:['native-mz','public-input'],criteria:[{id:'loss-grief-about-resume',variant:'witness-and-away',expectedRef}],storage:{expectedRef},browser:{width:1280,height:720,dpr:1,locale:'en-US',channel:'chrome',launchArgs:['--force-device-scale-factor=1'],query:'',timeoutMs:30000,executionTimeoutMs:1200000}};
export async function execute(context){
 const p=new DirectedNativePlayer(context);
 const state=()=>context.read('campaign',()=>JSON.parse(JSON.stringify($gameSystem._dryland.campaign)));
 let reloadedGrief=false;
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
   assert.ok(s.paused,JSON.stringify(s));
   const c=await state();
   if(!reloadedGrief&&c.activeSocialTopicId==='grief.h8.h1'&&c.completedSocialUnitIds.includes('grief.h5.h1')){
    await context.shot('second-grief-pending');await context.storage.capture('first-grief-completed');
    reloadedGrief=true;await context.reopenPage();await p.ready();await choose('choice.title.continue');await p.file(1);
    const resumed=await p.ready();assert.ok(resumed.paused);
    const loaded=await state();assert.ok(loaded.completedSocialUnitIds.includes('grief.h5.h1'));assert.ok(!loaded.completedSocialUnitIds.includes('grief.h8.h1'));
    await context.shot('second-grief-resumed');continue;
   }
   if(c.phase==='camp_arrival'&&c.reading?.sceneId.startsWith('arrival.')&&c.deadHeroIds.length){
    const ids=c.deadHeroIds.map(id=>Number(id.slice(1))+9);
    const [frames]=await Promise.all([
     context.read('camp-absence-temporal',async ids=>{
      const samples=[];let appeared=false,last=-1;
      const deadline=performance.now()+20000;
      while(performance.now()<deadline){
       await new Promise(resolve=>requestAnimationFrame(resolve));
       if(last===Graphics.frameCount)continue;last=Graphics.frameCount;
       const values=ids.map(id=>$gameScreen.picture(id)?.opacity()??null);
       if(values.every(v=>v!==null))appeared=true;
       if(appeared)samples.push({frame:last,values});
       if(appeared&&values.every(v=>v===null))return samples;
      }
      throw Error('Camp absence did not finish');
     },ids),
     (async()=>{await context.input.key('Enter');await context.wait(ids=>ids.every(id=>{const p=$gameScreen.picture(id);return p&&p.opacity()>40&&p.opacity()<200;}),ids);await context.shot('all-dead-fade-'+c.sequence);})()
    ]);
    assert.ok(frames.some(row=>row.values.every(v=>v!==null&&v>0&&v<255)));
    for(const row of frames)assert.equal(new Set(row.values).size,1,'All campaign-dead portraits fade together');
    assert.ok(frames.at(-1).values.every(v=>v===null));continue;
   }
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
 for(const id of [1,5,8]){await hero(id);await choose('\\V[153]');await until('formation');}
 await depart('physical');await encounter(1);await encounter();await until('camp');
 let c=await state();assert.equal(c.position,2);assert.equal(c.partyIds.length,2);assert.equal(reloadedGrief,true);
 assert.deepEqual(c.deathLocations.H1.witnessHeroIds,['H5','H8']);
 for(const id of ['grief.h5.h1','grief.h8.h1'])assert.equal(c.completedSocialUnitIds.filter(x=>x===id).length,1);
 await context.shot('two-survivor-camp');
 await hero(5);await choose('choice.conv.talk');await p.ready();
 assert.ok((await state()).activeSocialTopicId);await context.shot('unfinished-topic');
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('topic-hidden');
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);
 await context.reopenPage();await p.ready();await choose('choice.title.continue');await p.file(1);await until('camp');
 c=await state();assert.ok(!c.completedSocialUnitIds.includes('camp.h5.church.a'));await context.shot('unfinished-remains-new');
 await choose('ui.camp.retreat');await until('formation');await hero(5);await context.shot('about-witness-new');await choose('ui.social.about.h1');await until('hero');
 c=await state();for(const part of ['witness','after','body'])assert.ok(c.completedSocialUnitIds.includes('tavern.h5.h1.'+part));
 await context.shot('about-witness-read');await choose('choice.conv.back');await until('formation');
 // New party: Draska will die with Bimbren and Elowen; Griznik remains in town.
 await hero(c.assignments.physical[0]==='A7'?7:2);await choose('\\V[153]');await until('formation');
 await depart('physical');await encounter(8);await encounter();await until('camp');
 c=await state();assert.ok(c.deadHeroIds.includes('H8'));assert.ok(!c.deathLocations.H8.witnessHeroIds.includes('H3'));
 await context.shot('second-loss-camp');await choose('ui.camp.retreat');await until('formation');
 await hero(3);await context.shot('about-away-first-new');await choose('ui.social.about.h8');await until('hero');
 c=await state();for(const part of ['away','first','body'])assert.ok(c.completedSocialUnitIds.includes('tavern.h3.h8.'+part));
 await choose('\\V[153]');await until('formation');await depart('physical');await encounter();await encounter();await until('camp');
 c=await state();assert.ok(c.completedSocialUnitIds.includes('grief.h3.h8'));await context.shot('away-survivor-grief-completed');
 await choose('ui.camp.retreat');await until('formation');await hero(3);await context.shot('about-after-bridge-new');await choose('ui.social.about.h8');await until('hero');
 c=await state();assert.ok(c.completedSocialUnitIds.includes('tavern.h3.h8.after'));await context.storage.capture('contextual-about-completed');await context.shot('about-away-read');
}
export async function verify({artifacts}){return {criteria:[{...scenario.criteria[0],status:'pass',evidence:artifacts.map(a=>a.path),limits:['Reduced total roster, final route and audio listening are separate.']}],pendingReviews:['Inspect losses and About captures; editorial and emotional acceptance remains human.']};}
