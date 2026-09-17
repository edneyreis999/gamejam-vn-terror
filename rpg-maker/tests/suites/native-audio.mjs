import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { selectFile } from '../helpers/native-chrome.mjs';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause, prologueMarkers } from '../helpers/formation.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { entry, hidden, installPhase, state } from '../helpers/native-shared.mjs';
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
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);assert.deepEqual(await volumes(browser),configured);
});
canonicalCase('IT-029','native ambience replacement and ending themes decode without stacking and zero volume leaves controls usable',{timeout:150000},async t=>{
 const observations=[];const browser=await entry(t);assert.equal(await browser.evaluate('Boolean(AudioManager._bgmBuffer||AudioManager._bgsBuffer||AudioManager._meBuffer)'),false);
 await browser.evaluate(`window.audioBuffers=[];const create=AudioManager.createBuffer;AudioManager.createBuffer=function(folder,name){const b=create.call(this,folder,name);audioBuffers.push({folder,name,buffer:b});return b;};`);
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
 assert.equal((await state(browser)).phase,'intro');
 for(const marker of prologueMarkers){
  await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(marker)})&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0`);
  assert.equal(await browser.evaluate('Boolean(AudioManager._bgmBuffer||AudioManager._bgsBuffer||AudioManager._meBuffer)'),false);
  await browser.press('Enter',13);
 }
 await choices(browser,'formation');
 await browser.waitFor("AudioManager._currentBgs?.name==='People1'&&AudioManager._bgsBuffer.isReady()");
 const current=await state(browser);assert.equal(current.phase,'formation');
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
  const playing=await browser.evaluate('window.observedMe=AudioManager._meBuffer;({volume:observedMe.volume,start:observedMe._startTime,count:audioBuffers.length,descriptor:AudioManager._currentMe})');const volume=playing.volume;assert.ok(volume>0);assert.equal(playing.descriptor.name,name);observations.push({name,...playing});
  await browser.press('Tab',9);await hidden(browser,true);await browser.press('Tab',9);await hidden(browser,false);
  assert.equal(await browser.evaluate('AudioManager._meBuffer===observedMe'),true,'HIDE does not restart the one-shot cue');
  await browser.evaluate('ConfigManager.meVolume=0;');assert.equal(await browser.evaluate('AudioManager._meBuffer.volume'),0,'Temas must mute the ME already playing.');
  await browser.evaluate('ConfigManager.meVolume=40;');assert.equal(await browser.evaluate('AudioManager._meBuffer.volume'),volume);
  assert.equal(await browser.evaluate('AudioManager._meBuffer===observedMe'),true);
  assert.equal(await browser.evaluate('observedMe._startTime'),playing.start);assert.equal(await browser.evaluate('audioBuffers.length'),playing.count);
 }
 // The authored campaign has no live BGM (System.titleBgm is empty). Use the
 // configured System battle BGM as a native command equivalence, without
 // claiming that the campaign has a new musical cue.
 const beforeBgm=await state(browser),bgmConfig=await browser.evaluate('ConfigManager.bgmVolume');
 await browser.evaluate("new Game_Interpreter().command249([{name:'',volume:60,pitch:100,pan:0}]);");
 await browser.evaluate("new Game_Interpreter().command241([{...$dataSystem.battleBgm}]);");
 await browser.waitFor('AudioManager._bgmBuffer?.isReady()&&AudioManager._bgmBuffer.isPlaying()');
 const isolatedBgm=await browser.evaluate('window.observedBgm=AudioManager._bgmBuffer;({name:AudioManager._currentBgm?.name,start:observedBgm._startTime,volume:observedBgm.volume,playing:observedBgm.isPlaying(),configured:ConfigManager.bgmVolume,source:$dataSystem.battleBgm.name,descriptorVolume:$dataSystem.battleBgm.volume})');
 assert.equal(isolatedBgm.name,isolatedBgm.source);assert.ok(isolatedBgm.playing);assert.equal(isolatedBgm.volume,bgmConfig*isolatedBgm.descriptorVolume/10000);
 await browser.evaluate('ConfigManager.bgmVolume=0;');
 const mutedBgm=await browser.evaluate('({start:observedBgm._startTime,volume:observedBgm.volume,playing:observedBgm.isPlaying()})');
 assert.equal(mutedBgm.volume,0);assert.equal(mutedBgm.start,isolatedBgm.start);assert.equal(mutedBgm.playing,true);
 await browser.evaluate(`ConfigManager.bgmVolume=${bgmConfig};`);assert.equal(await browser.evaluate('AudioManager._bgmBuffer===observedBgm'),true);assert.equal(await browser.evaluate('AudioManager._bgmBuffer._startTime'),isolatedBgm.start);
 const restoredBgm=await browser.evaluate('({start:observedBgm._startTime,volume:observedBgm.volume,playing:observedBgm.isPlaying()})');
 assert.equal(restoredBgm.volume,isolatedBgm.volume);assert.equal(restoredBgm.playing,true);
 await browser.evaluate('AudioManager.stopBgm();');assert.equal(await browser.evaluate('AudioManager._bgmBuffer===null'),true);assert.deepEqual(await state(browser),beforeBgm);
 observations.push({kind:'bgm-equivalence',status:'isolated-configured-reference',source:isolatedBgm,muted:mutedBgm,restored:restoredBgm});

 // System sounds are short native SE buffers. ConfigManager.seVolume is
 // applied when a new cue is created; the existing buffer is intentionally
 // left untouched by MZ's setter.
 const beforeSe=await state(browser),seConfig=await browser.evaluate('ConfigManager.seVolume'),seName=await browser.evaluate('$dataSystem.sounds[0].name');
 await browser.evaluate("new Game_Interpreter().command250([{...$dataSystem.sounds[0]}]);");
 await browser.waitFor('audioBuffers.at(-1).buffer.isReady()&&audioBuffers.at(-1).buffer.isPlaying()');
 const firstSe=await browser.evaluate("(()=>{const x=audioBuffers.at(-1),d=$dataSystem.sounds[0];return{name:x.name,descriptorVolume:d.volume,volume:x.buffer.volume,playing:x.buffer.isPlaying()};})()");
 assert.equal(firstSe.name,seName);assert.equal(firstSe.volume,seConfig*firstSe.descriptorVolume/10000);assert.equal(firstSe.playing,true);
 await browser.evaluate('window.seFrame=Graphics.frameCount;');await browser.waitFor('Graphics.frameCount>window.seFrame');
 await browser.evaluate('ConfigManager.seVolume=0;new Game_Interpreter().command250([{...$dataSystem.sounds[0]}]);');
 await browser.waitFor('audioBuffers.at(-1).buffer.isReady()&&audioBuffers.at(-1).buffer.isPlaying()');
 const secondSe=await browser.evaluate("(()=>{const x=audioBuffers.at(-1),d=$dataSystem.sounds[0];return{name:x.name,descriptorVolume:d.volume,volume:x.buffer.volume,playing:x.buffer.isPlaying()};})()");
 assert.equal(secondSe.name,seName);assert.equal(secondSe.volume,0);assert.equal(secondSe.playing,true);assert.equal(firstSe.volume,seConfig*firstSe.descriptorVolume/10000);
 await browser.evaluate(`ConfigManager.seVolume=${seConfig};`);assert.deepEqual(await state(browser),beforeSe);
 observations.push({kind:'se-input-equivalence',status:'new-cue-volume',source:{name:seName,initial:firstSe.volume,reconfigured:secondSe.volume}});
 // Isolated native audio commands exercise replacement/stop/end, without campaign mutation.
 const beforeAudio=await state(browser);
 await browser.evaluate("new Game_Interpreter().command249([{name:'Musical1',volume:60,pitch:100,pan:0}]);");
 await browser.waitFor('AudioManager._meBuffer?.isReady()&&AudioManager._meBuffer.isPlaying()');
 await browser.evaluate('window.replacedMe=AudioManager._meBuffer;');
 await browser.evaluate("new Game_Interpreter().command249([{name:'Organ',volume:60,pitch:100,pan:0}]);");
 await browser.waitFor('AudioManager._meBuffer?.isReady()&&AudioManager._meBuffer.isPlaying()');
 assert.equal(await browser.evaluate('replacedMe.isPlaying()'),false);
 assert.equal(await browser.evaluate('AudioManager._currentMe.name'),'Organ');
 assert.equal(await browser.evaluate("audioBuffers.filter(x=>x.folder==='me/'&&x.buffer.isPlaying()).length"),1);
 await browser.evaluate("new Game_Interpreter().command249([{name:'',volume:60,pitch:100,pan:0}]);");
 assert.equal(await browser.evaluate('AudioManager._meBuffer===null&&AudioManager._currentMe===null'),true);
 const stoppedCount=await browser.evaluate('audioBuffers.length');
 await browser.evaluate('ConfigManager.meVolume=0;ConfigManager.meVolume=40;');
 assert.equal(await browser.evaluate('audioBuffers.length'),stoppedCount);
 assert.equal(await browser.evaluate('AudioManager._meBuffer===null&&AudioManager._currentMe===null'),true);
 await browser.evaluate("new Game_Interpreter().command249([{name:'Musical1',volume:60,pitch:100,pan:0}]);");
 await browser.waitFor('AudioManager._meBuffer?.isReady()&&AudioManager._meBuffer.isPlaying()');
 await browser.waitFor('AudioManager._meBuffer===null&&AudioManager._currentMe===null');
 assert.deepEqual(await state(browser),beforeAudio);
 await browser.evaluate('for(const k of ["bgmVolume","bgsVolume","meVolume","seVolume"])ConfigManager[k]=0;');
 await installPhase(browser,fixtures.encounter_choice);await choices(browser,'approaches');const before=await state(browser);
 await activate(browser,'approaches',3);await pause(browser);await browser.press('Enter',13);await choices(browser,'approaches');assert.deepEqual(await state(browser),before);
 assert.equal(await browser.evaluate('AudioManager._bgsBuffer.volume'),0);
 assert.deepEqual(await browser.evaluate('Object.fromEntries([...new Set(audioBuffers.filter(x=>["bgs/","me/"].includes(x.folder)).map(x=>x.folder+x.name))].map(k=>[k,true]))'),Object.fromEntries(['bgs/People1','bgs/Drips','bgs/Wind1','bgs/Darkness','me/Musical1','me/Organ'].map(k=>[k,true])));
 const effects=await browser.evaluate('[...new Set([...$dataCommonEvents.filter(Boolean).flatMap(e=>e.list.filter(c=>c.code===250).map(c=>c.parameters[0].name)),...[0,1,2,3,5,6].map(i=>$dataSystem.sounds[i].name)])].sort()');
 assert.deepEqual(effects,['Buzzer1','Cancel2','Collapse1','Cursor3','Decision2','Door1','Item3','Load2','Save2','Water1'].sort());
 const directory='docs/qa/evidence/init-rpg-maker-mz/task-11/IT-029';await mkdir(directory,{recursive:true});
 await writeFile(`${directory}/buffers.json`,JSON.stringify({browser:browser.version,kind:'isolated native buffer integration; no audible judgment',observations,buffers:await browser.evaluate('audioBuffers.map(x=>({folder:x.folder,name:x.name,ready:x.buffer.isReady(),playing:x.buffer.isPlaying(),duration:x.buffer._totalTime}))')},null,2)+'\n');
});
