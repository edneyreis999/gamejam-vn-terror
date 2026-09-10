import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause } from '../helpers/formation.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { frames, titleReady } from '../helpers/closing-presentation.mjs';
import { click, entry, installPhase, state } from '../helpers/native-shared.mjs';
import { accepted } from '../helpers/campaign.mjs';
import { finalChoice } from '../helpers/closing.mjs';
const fixtures=phaseFixtures(),keys=['bgmVolume','bgsVolume','meVolume','seVolume'];
const volumes=browser=>browser.evaluate('Object.fromEntries(["bgmVolume","bgsVolume","meVolume","seVolume"].map(k=>[k,ConfigManager[k]]))');
canonicalCase('IT-028','native audio preferences begin at40 clamp through keyboard input and survive a new campaign',{timeout:120000},async t=>{
 const browser=await entry(t);assert.deepEqual(await volumes(browser),Object.fromEntries(keys.map(k=>[k,40])));
 await browser.press('ArrowDown',40);await browser.press('Enter',13);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&SceneManager._scene._optionsWindow?.isOpenAndActive()");
 assert.deepEqual(await browser.evaluate('SceneManager._scene._optionsWindow._list.map(c=>({name:c.name,symbol:c.symbol}))'),keys.map((symbol,i)=>({symbol,name:'\\I[80]'+['Música','Ambiente','Temas','Efeitos'][i]})));
 for(const [index,key]of keys.entries()){
  if(index)await browser.press('ArrowDown',40);
  for(let step=0;step<6;step++)await browser.press('ArrowLeft',37);assert.equal((await volumes(browser))[key],0);
  for(let step=0;step<12;step++)await browser.press('ArrowRight',39);assert.equal((await volumes(browser))[key],100);
  for(let step=0;step<index+1;step++)await browser.press('ArrowLeft',37);
 }
 const configured=await volumes(browser);assert.deepEqual(configured,{bgmVolume:90,bgsVolume:80,meVolume:70,seVolume:60});
 await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-11/IT-028/audio-options.png');
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene instanceof Scene_Map&&$gameMap.mapId()===1&&$gameMessage.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 const stored=await browser.evaluate("StorageManager.loadObject('config')");for(const key of keys)assert.equal(stored[key],configured[key]);
 if(await browser.evaluate('SceneManager._scene._choiceListWindow.index()')!==0)await browser.press('ArrowUp',38);
 await browser.press('Enter',13);await pause(browser);assert.deepEqual(await volumes(browser),configured);
});
canonicalCase('IT-029','native ambience replacement and ending themes decode without stacking and zero volume leaves controls usable',{timeout:150000},async t=>{
 const browser=await entry(t);assert.equal(await browser.evaluate('Boolean(AudioManager._bgmBuffer||AudioManager._bgsBuffer||AudioManager._meBuffer)'),false);
 await browser.evaluate(`window.audioBuffers=[];const create=AudioManager.createBuffer;AudioManager.createBuffer=function(folder,name){const b=create.call(this,folder,name);audioBuffers.push({folder,name,buffer:b});return b;};`);
 await browser.press('Enter',13);await pause(browser);
 await browser.waitFor("AudioManager._currentBgs?.name==='People1'&&AudioManager._bgsBuffer.isReady()");
 const current=await state(browser);assert.equal(current.phase,'intro');
 for(const [route,name]of [['physical','Drips'],['supernatural','Wind1'],['final','Darkness']]){
  // Valid prepared route states exercise the installed native audio event.
  let prepared=route==='final'?finalChoice():fixtures.encounter_intro;
  if(route==='supernatural'){
   const { replayUntil }=await import('../helpers/campaign.mjs');prepared=replayUntil('final-sixth-solo-council',s=>s.phase==='encounter_intro'&&s.dungeonId===route);
  }
  await installPhase(browser,prepared);
  await browser.waitFor(`AudioManager._currentBgs?.name===${JSON.stringify(name)}&&AudioManager._bgsBuffer.isReady()`);
  assert.equal(await browser.evaluate("audioBuffers.filter(x=>x.folder==='bgs/'&&x.buffer.isPlaying()).length"),1);
 }
 for(const [ending,name]of [['reunite','Musical1'],['destroy','Organ']]){
  await installPhase(browser,accepted(finalChoice(),'CHOOSE_ENDING',{ending}));await pause(browser);
  await browser.waitFor(`AudioManager._meBuffer?.isReady()&&audioBuffers.some(x=>x.folder==='me/'&&x.name===${JSON.stringify(name)})`);
  assert.equal(await browser.evaluate('AudioManager._bgsBuffer'),null);
  assert.equal(await browser.evaluate("audioBuffers.filter(x=>x.folder==='me/'&&x.buffer.isPlaying()).length"),1);
  const volume=await browser.evaluate('AudioManager._meBuffer.volume');assert.ok(volume>0);
  await browser.evaluate('ConfigManager.meVolume=0;');assert.equal(await browser.evaluate('AudioManager._meBuffer.volume'),0,'Temas must mute the ME already playing.');
  await browser.evaluate('ConfigManager.meVolume=40;');assert.equal(await browser.evaluate('AudioManager._meBuffer.volume'),volume);
 }
 await browser.evaluate('for(const k of ["bgmVolume","bgsVolume","meVolume","seVolume"])ConfigManager[k]=0;');
 await installPhase(browser,fixtures.encounter_choice);await choices(browser,'approaches');const before=await state(browser);
 await activate(browser,'approaches',3);await pause(browser);await browser.press('Enter',13);await choices(browser,'approaches');assert.deepEqual(await state(browser),before);
 assert.equal(await browser.evaluate('AudioManager._bgsBuffer.volume'),0);
 assert.deepEqual(await browser.evaluate('Object.fromEntries([...new Set(audioBuffers.filter(x=>["bgs/","me/"].includes(x.folder)).map(x=>x.folder+x.name))].map(k=>[k,true]))'),Object.fromEntries(['bgs/People1','bgs/Drips','bgs/Wind1','bgs/Darkness','me/Musical1','me/Organ'].map(k=>[k,true])));
 const effects=await browser.evaluate('[...new Set([...$dataCommonEvents.filter(Boolean).flatMap(e=>e.list.filter(c=>c.code===250).map(c=>c.parameters[0].name)),...[0,1,2,3,5,6].map(i=>$dataSystem.sounds[i].name)])].sort()');
 assert.deepEqual(effects,['Buzzer1','Cancel2','Collapse1','Cursor3','Decision2','Door1','Item3','Load2','Save2','Water1'].sort());
});
