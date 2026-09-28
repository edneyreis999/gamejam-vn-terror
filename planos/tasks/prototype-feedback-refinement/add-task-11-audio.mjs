import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const file='rpg-maker/tests/suites/native-audio.mjs';
let source=readFileSync(file,'utf8');assert.ok(!source.includes("canonicalCase('IT-090'"));
source+=String.raw`

canonicalCase('IT-090','epilogue narration retains present-day buffers across heroes and controls then stops before credits',{timeout:240000},async t=>{
 const {tavern}=await import('../helpers/formation.mjs');
 const {beginEnding,finishPhase,creditsReady}=await import('../helpers/closing-presentation.mjs');
 const {closingReady}=await import('../helpers/closing.mjs');
 const {continueSave}=await import('../helpers/discovery.mjs');
 const {clickConsole}=await import('../helpers/native-shared.mjs');
 const browser=await tavern(t);
 await browser.evaluate("window.epilogueAudio=[];const create=AudioManager.createBuffer;AudioManager.createBuffer=function(folder,name){const buffer=create.call(this,folder,name);epilogueAudio.push({folder,name,buffer});return buffer;};");
 await beginEnding(browser,'collective','destroy');await finishPhase(browser,'ending');
 const ready=()=>browser.waitFor("$gameSystem._dryland.campaign.phase==='epilogue'&&AudioManager._currentBgm?.name==='Town1'&&AudioManager._currentBgs?.name==='People2'&&AudioManager._bgmBuffer?.isPlaying()&&AudioManager._bgsBuffer?.isPlaying()");
 await ready();
 const descriptors=await browser.evaluate('({bgm:AudioManager._currentBgm,bgs:AudioManager._currentBgs})');
 for(const [key,name,volume] of [['bgm','Town1',45],['bgs','People2',25]]){
  assert.equal(descriptors[key].name,name);assert.equal(descriptors[key].volume,volume);assert.equal(descriptors[key].pitch,100);assert.equal(descriptors[key].pan,0);
 }
 await browser.evaluate('window.epilogueBgm=AudioManager._bgmBuffer;window.epilogueBgs=AudioManager._bgsBuffer;window.epilogueStarts=[epilogueBgm._startTime,epilogueBgs._startTime];');
 const unchanged=async()=>{
  assert.equal(await browser.evaluate('AudioManager._bgmBuffer===epilogueBgm&&AudioManager._bgsBuffer===epilogueBgs'),true);
  assert.equal(await browser.evaluate('epilogueBgm._startTime===epilogueStarts[0]&&epilogueBgs._startTime===epilogueStarts[1]'),true);
 };
 const initial=await state(browser);
 await browser.press('Tab',9);await hidden(browser,true);await unchanged();
 await browser.press('Tab',9);await hidden(browser,false);
 await clickConsole(browser,'options');await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await unchanged();await browser.press('Escape',27);await pause(browser);await unchanged();assert.deepEqual(await state(browser),initial);
 await clickConsole(browser,'fastFwd');await unchanged();assert.deepEqual(await state(browser),initial,'FAST cannot skip an unseen epilogue');
 await browser.evaluate('ConfigManager.bgmVolume=0;ConfigManager.bgsVolume=0;');
 assert.deepEqual(await browser.evaluate('[AudioManager._bgmBuffer.volume,AudioManager._bgsBuffer.volume]'),[0,0]);await unchanged();
 await browser.evaluate('ConfigManager.bgmVolume=40;ConfigManager.bgsVolume=40;');
 const seen=[];
 while((await state(browser)).phase==='epilogue'){
  await closingReady(browser);await unchanged();const current=await state(browser);
  if(!seen.includes(current.reading.sceneId))seen.push(current.reading.sceneId);
  await browser.press('Enter',13);
 }
 assert.deepEqual(seen,['epilogue.H1','epilogue.H2','epilogue.H3']);
 await creditsReady(browser);assert.equal(await browser.evaluate('AudioManager._bgmBuffer===null&&AudioManager._bgsBuffer===null'),true);
 assert.equal(await browser.evaluate("epilogueAudio.filter(x=>x.name==='Applause1').length"),0);
 // The real ending checkpoint replays through Continue; a new document/context
 // is allowed to create buffers, unlike uninterrupted hero succession.
 await continueSave(browser);await closingReady(browser);await finishPhase(browser,'ending');await ready();
 assert.equal(await browser.evaluate('AudioManager._bgmBuffer!==epilogueBgm&&AudioManager._bgsBuffer!==epilogueBgs'),true);
 await finishPhase(browser,'epilogue');await creditsReady(browser);
 assert.equal(await browser.evaluate('AudioManager._bgmBuffer===null&&AudioManager._bgsBuffer===null'),true);
 for(const [kind,ending] of [['solo','destroy'],['bad','bad']]){
  await beginEnding(browser,kind,ending);await finishPhase(browser,'ending');
  if((await state(browser)).phase==='memorial')await finishPhase(browser,'memorial');
  await creditsReady(browser);assert.equal(await browser.evaluate('AudioManager._bgmBuffer===null&&AudioManager._bgsBuffer===null'),true);
 }
 const {evidenceRoot}=await import('../helpers/canonical-cases.mjs');
 await mkdir(evidenceRoot+'/epilogue-audio',{recursive:true});
 await writeFile(evidenceRoot+'/epilogue-audio/buffers.json',JSON.stringify({descriptors,seen,buffers:await browser.evaluate('epilogueAudio.map(({folder,name,buffer})=>({folder,name,ready:buffer.isReady(),playing:buffer.isPlaying()}))')},null,2));
});
`;
writeFileSync(file,source);
const path='rpg-maker/tests/test-manifest.json',manifest=JSON.parse(readFileSync(path,'utf8'));
manifest.tasks['prototype-feedback-refinement'].push('IT-090');
writeFileSync(path,JSON.stringify(manifest,null,2)+'\n');
