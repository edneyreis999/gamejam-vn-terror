import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
const expectedRef='planos/tasks/campfire-hero-bonds/verification.md#runtime-scenarios';
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'campfire-routes-audio',requires:['native-mz','public-input'],criteria:[{id:'routes-novelty-audio',variant:'all-routes',expectedRef}],storage:{expectedRef},audioFormat:'webm',audioSources:{master:{path:'WebAudio._masterGainNode',expectedRef}},browser:{width:1280,height:720,dpr:1,locale:'en-US',channel:'chrome',launchArgs:['--force-device-scale-factor=1'],query:'',timeoutMs:30000,executionTimeoutMs:1200000}};
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

 async function option(symbol){
  for(let page=0;page<4;page++){
   const index=await context.read('option-index',key=>SceneManager._scene._optionsWindow._list.findIndex(item=>item.symbol===key),symbol);
   if(index>=0){for(let n=0;n<30;n++){const i=await context.read('option-focus',()=>SceneManager._scene._optionsWindow.index());if(i===index)return;await context.input.key(i<index?'ArrowDown':'ArrowUp');}throw Error('Option focus');}
   await context.input.key('PageDown');
  }
  throw Error('Option unavailable '+symbol);
 }
 async function openOptions(){await choose('☰');await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());}
 await p.ready();await choose('choice.title.new_game');await p.file(1);await until('formation');
 for(const id of [1,2,3]){await hero(id);await choose('\\V[153]');await until('formation');}
 await depart('physical');await encounter();await encounter();await until('camp');
 await hero(1);await choose('choice.conv.talk');await until('hero');
 let c=await state();assert.ok(c.completedSocialUnitIds.includes('camp.h1.church.a'));assert.ok(!c.completedSocialUnitIds.includes('interject.h1.h5'));
 await choose('ui.camp.back');await until('camp');await choose('ui.camp.retreat');await until('formation');
 await hero(2);await choose('\\V[153]');await until('formation');await hero(5);await choose('\\V[153]');await until('formation');
 await depart('physical');await encounter();await encounter();await until('camp');
 await hero(1);await context.shot('new-suffix-on-read-base');await choose('choice.conv.talk');await until('hero');
 c=await state();assert.ok(c.completedSocialUnitIds.includes('interject.h1.h5'));await choose('ui.camp.back');await until('camp');
 await context.audio.start('camp-options-and-exits','master');
 const audio=()=>context.read('audio-context',()=>({bgm:AudioManager._currentBgm?.name||'',bgs:AudioManager._currentBgs?.name||'',start:AudioManager._bgsBuffer?._startTime,volume:AudioManager._bgsBuffer?.volume,playing:AudioManager._bgsBuffer?.isPlaying()}));
 const initial=await audio();assert.equal(initial.bgm,'');assert.equal(initial.bgs,'Fire1');
 const before=await state();await openOptions();await option('textLocale');await context.input.key('ArrowRight');
 assert.equal(await context.read('locale',()=>ConfigManager.textLocale),'Portuguese');
 await option('bgsVolume');const volume=await context.read('configured-bgs',()=>ConfigManager.bgsVolume);
 for(let n=0;n<12&&await context.read('configured-bgs',()=>ConfigManager.bgsVolume)>0;n++)await context.input.key('ArrowLeft');
 const muted=await audio();assert.equal(muted.volume,0);assert.equal(muted.start,initial.start);
 await context.shot('fire-muted');
 for(let n=0;n<12&&await context.read('configured-bgs',()=>ConfigManager.bgsVolume)<volume;n++)await context.input.key('ArrowRight');
 const restored=await audio();assert.equal(restored.start,initial.start);assert.equal(restored.volume,initial.volume);
 await context.input.key('Escape');await until('camp');assert.deepEqual(await state(),before);await context.shot('camp-portuguese');
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('camp-hidden');
 await context.input.key('Tab');await until('camp');assert.deepEqual(await state(),before);
 // Pointer selects the visible Gorvak portrait; commands remain ordinary native choices.
 await p.choose('Gorvak',{mouse:true});await until('hero');await context.shot('hero-portuguese');await choose('ui.camp.back');await until('camp');
 await choose('ui.camp.continue');await encounter();await encounter();await until('camp');assert.equal((await state()).position,4);
 await choose('ui.camp.continue');await encounter();await until('formation');
 assert.ok((await state()).completedDungeonIds.includes('physical'));assert.notEqual((await audio()).bgs,'Fire1');await context.audio.stop();
 for(const route of ['supernatural','final']){
  await choose('choice.tavern.depart');await until('destinations');await choose(route==='supernatural'?'174':'175');
  const total=route==='final'?6:5;
  for(let pos=1;pos<=total;pos++){
   await encounter();
   if(pos===2||pos===4){await until('camp');assert.equal((await state()).position,pos);await context.shot(route+'-camp-'+pos);await choose('ui.camp.continue');}
  }
  await until(route==='final'?'ending':'formation');
 }
 c=await state();assert.equal(c.phase,'final_choice');assert.equal(c.position,6);assert.equal(c.deadHeroIds.length,0);await context.shot('council-final-choice');await context.storage.capture('surviving-final-route');
}
export async function verify({artifacts}){return {criteria:[{...scenario.criteria[0],status:'pass',evidence:artifacts.map(a=>a.path),limits:['Audio recording needs human listening; appearance requires image inspection.']}],pendingReviews:['Inspect PT surfaces and listen to fire/mute/exits recording.']};}
