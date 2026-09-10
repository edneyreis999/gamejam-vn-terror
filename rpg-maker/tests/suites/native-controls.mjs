import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause, tavern } from '../helpers/formation.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { frames, titleReady } from '../helpers/closing-presentation.mjs';
import { assertHiddenPictures, click, entry, hidden, installPhase, state } from '../helpers/native-shared.mjs';
const fixtures=phaseFixtures();
const evidence=id=>`docs/qa/evidence/init-rpg-maker-mz/task-11/${id}`;
async function hold(browser,key,keyCode){await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:keyCode});}
async function release(browser,key,keyCode){await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:keyCode});await frames(browser,3);}
canonicalCase('IT-030','failed required native bitmap exposes Retry and resumes the same authored campaign after recovery',{timeout:90000},async t=>{
 const browser=await tavern(t),before=await state(browser);
 // Fail the actual bitmap's loader boundary once. Retry uses the unchanged
 // native Bitmap.retry/_startLoading path and the real package asset.
 await browser.evaluate(`window.requiredImageLoads=[];const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){requiredImageLoads.push(this._url);if(this._url.endsWith('/Dryland_H1.png')&&!window.requiredImageFailed){window.requiredImageFailed=true;this._onError();}else start.call(this);};delete ImageManager._cache['img/pictures/Dryland_H1.png'];`);
 await activate(browser,'formation',0);await activate(browser,'hero',0);
 let failed=false;
 for(let attempt=0;attempt<200;attempt++){
  failed=await browser.evaluate("Boolean(document.getElementById('retryButton'))");if(failed)break;await delay(50);
 }
 assert.equal(failed,true,JSON.stringify(await browser.evaluate('({failed:window.requiredImageFailed,loads:requiredImageLoads,cache:Object.keys(ImageManager._cache).filter(k=>k.includes("H1")),error:Graphics._errorPrinter.textContent})')));
 assert.match(await browser.evaluate('Graphics._errorPrinter.textContent'),/Dryland_H1\.png/);assert.deepEqual(await state(browser),before);
 await browser.screenshot(`${evidence('IT-030')}/required-image-failed.png`);
 const point=await browser.evaluate("(()=>{const r=document.getElementById('retryButton').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
 await click(browser,point.x,point.y);await pause(browser);
 await browser.waitFor("$gameScreen.picture(18)?.name()==='Dryland_H1'&&ImageManager.loadPicture('Dryland_H1').isReady()");
 assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('Boolean(document.getElementById("retryButton"))'),false);
 assert.ok(await browser.evaluate("$gameMessage.allText().includes('Gorvak')"));await browser.screenshot(`${evidence('IT-030')}/required-image-recovered.png`);
});
canonicalCase('IT-038','native Options and consultations cannot carry held confirmation into the background story or party',{timeout:120000},async t=>{
 const browser=await entry(t);await browser.press('Enter',13);await pause(browser);const intro=await state(browser);
 await click(browser,560,693);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await hold(browser,'Enter',13);await frames(browser,35);assert.deepEqual(await state(browser),intro);
 for(let step=0;step<4&&await browser.evaluate("SceneManager._scene.constructor.name==='Scene_Options'");step++)await browser.press('Escape',27);
 await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await frames(browser,40);
 assert.deepEqual(await state(browser),intro);await release(browser,'Enter',13);
 await installPhase(browser,fixtures.formation);
 for(const [kind,index,closeIndex]of [['destinations',8,3],['roster',9,0]]){
  await activate(browser,'formation',index);await choices(browser,kind);
  for(let step=0;step<closeIndex;step++)await browser.press('ArrowDown',40);
  const before=await state(browser);await hold(browser,'Enter',13);await choices(browser,'formation');await frames(browser,40);
  assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('$gameMessage.hasText()'),false);await release(browser,'Enter',13);
 }
});
canonicalCase('IT-050','upper encounter utilities use mouse and keyboard, suspend during text and HIDE, and seen-only skip consumes its input',{timeout:180000},async t=>{
 const browser=await tavern(t);await installPhase(browser,fixtures.encounter_choice);await choices(browser,'approaches');
 const before=await state(browser);
 const bounds=await browser.evaluate(`[41,42,50,51,52].map(id=>{const b=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id).getBounds();return {id,x:b.x,y:b.y,w:b.width,h:b.height}})`);
 for(const b of bounds){assert.ok(b.x>=0&&b.x+b.w<=1280&&b.y>=0&&b.y+b.h<=720,JSON.stringify(b));if(b.id<50)assert.ok(b.y+b.h<230);else assert.ok(b.y>230);}
 await click(browser,920,128);await pause(browser);assert.deepEqual(await state(browser),before);
 assert.equal(await browser.evaluate('$gameScreen.picture(41)==null&&$gameScreen.picture(42)==null'),true);
 await browser.press('Tab',9);await hidden(browser,true);await click(browser,1150,128);await hidden(browser,false);assert.deepEqual(await state(browser),before);
 await browser.press('Enter',13);await choices(browser,'approaches');assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),3);
 await click(browser,1150,128);await choices(browser,'retreat');await activate(browser,'retreat',1);await choices(browser,'approaches');
 assert.deepEqual((await state(browser)).partyIds,before.partyIds);assert.equal((await state(browser)).phase,'encounter_choice');
 await activate(browser,'approaches',3);await pause(browser);const reread=await state(browser);await browser.press('Enter',13);await choices(browser,'approaches');assert.deepEqual(await state(browser),reread);
 await activate(browser,'approaches',4);await choices(browser,'retreat');await activate(browser,'retreat',1);await choices(browser,'approaches');
 await browser.press('Tab',9);await hidden(browser,true);await assertHiddenPictures(browser,[41,42]);const still=await state(browser);
 await click(browser,920,128);await hidden(browser,false);assert.deepEqual(await state(browser),still);await choices(browser,'approaches');
 await browser.screenshot(`${evidence('IT-050')}/upper-utilities.png`);
 // Prepared persisted reading input models a re-entry to seen narrative. The
 // key and mouse controls themselves are the shipped native player surface.
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');await titleReady(browser);
 await browser.press('ArrowDown',40);await browser.press('Enter',13);await pause(browser);
 await browser.evaluate(`(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.seenPassageIds=s.reading.passageIds.slice(0,2);$gameSystem._dryland.campaign=s;})()`);
 await browser.waitFor('SceneManager._scene._drylandSkipWindow.visible');await hold(browser,'s',83);await pause(browser);await frames(browser,35);
 let skipped=await state(browser);assert.equal(skipped.reading.index,2);assert.equal(skipped.history.at(-1).type,'SKIP_SEEN_TEXT');await release(browser,'s',83);
 assert.equal(await browser.evaluate('SceneManager._scene._drylandSkipWindow.visible'),false);await browser.press('s',83);assert.deepEqual(await state(browser),skipped);
 await browser.evaluate('(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.seenPassageIds=s.reading.passageIds.slice();$gameSystem._dryland.campaign=s;})()');
 await browser.waitFor('SceneManager._scene._drylandSkipWindow.visible');await click(browser,1050,40);await choices(browser,'formation');
 skipped=await state(browser);assert.equal(skipped.history.filter(a=>a.type==='SKIP_SEEN_TEXT').length,2);assert.deepEqual(skipped.draftPartyIds,[]);
});
