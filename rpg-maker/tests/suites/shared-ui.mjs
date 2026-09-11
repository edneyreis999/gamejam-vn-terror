import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause, tavern } from '../helpers/formation.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { frames } from '../helpers/closing-presentation.mjs';
import { assertHiddenPictures, click, entry, hidden, installPhase, state } from '../helpers/native-shared.mjs';
const evidence=id=>`docs/qa/evidence/init-rpg-maker-mz/task-11/${id}`;
const fixtures=phaseFixtures();
canonicalCase('IT-025','native HIDE and Tab preserve the same message and consume both supported restoring inputs',{timeout:90000},async t=>{
 const browser=await entry(t);await browser.press('Enter',13);await pause(browser);
 const before=await state(browser),text=await browser.evaluate('$gameMessage.allText()');
 await browser.press('Tab',9);await hidden(browser,true);await frames(browser,15);assert.deepEqual(await state(browser),before);
 await browser.screenshot(`${evidence('IT-025')}/hidden-prologue.png`);
 await browser.press('Tab',9);await hidden(browser,false);assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('$gameMessage.allText()'),text);
 await click(browser,717,693);await hidden(browser,true);
 await click(browser,900,150);await hidden(browser,false);assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('$gameMessage.allText()'),text);
 await browser.screenshot(`${evidence('IT-025')}/restored-prologue.png`);
 await browser.press('Enter',13);await pause(browser);assert.equal((await state(browser)).sequence,before.sequence+1);
});
canonicalCase('IT-026','hidden approach and sacrifice pictures cannot change focus or commit the restoring click',{timeout:120000},async t=>{
 const browser=await tavern(t);
 for(const[kind,fixture]of [['approaches',fixtures.encounter_choice],['sacrifice',fixtures.sacrifice_choice]]){
  await installPhase(browser,fixture);
  if(kind==='sacrifice'){await pause(browser);await browser.press('Enter',13);}
  await choices(browser,kind);await browser.press('ArrowDown',40);
  const before=await state(browser),focus=await browser.evaluate('SceneManager._scene._choiceListWindow.index()');
  await browser.press('Tab',9);await hidden(browser,true);await assertHiddenPictures(browser,[40,41,42,50,51,52]);
  await browser.press('ArrowDown',40);await browser.press('ArrowRight',39);await browser.press('Enter',13);
  assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),focus);await hidden(browser,true);
  await browser.screenshot(`${evidence('IT-026')}/${kind}-hidden.png`);
  await click(browser,640,585);await hidden(browser,false);await choices(browser,kind);
  assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),focus);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.scale.x'),0,`${kind}: HIDE restoration must retain the picture-only choice presentation`);
  await browser.screenshot(`${evidence('IT-026')}/${kind}-restored.png`);
 }
});
canonicalCase('IT-027','HIDE removes consultation overlays and targets while retaining character art and returning focus',{timeout:120000},async t=>{
 const browser=await tavern(t);
 for(const[kind,index]of [['destinations',8],['roster',9]]){
  await activate(browser,'formation',index);await choices(browser,kind);
  const before=await state(browser),focus=await browser.evaluate('SceneManager._scene._choiceListWindow.index()');
  await browser.press('Tab',9);await hidden(browser,true);await assertHiddenPictures(browser,Array.from({length:19},(_,i)=>71+i));
  await click(browser,200,240);await hidden(browser,false);await choices(browser,kind);
  assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),focus);
  await browser.screenshot(`${evidence('IT-027')}/${kind}-restored.png`);
  await browser.press('Escape',27);await choices(browser,'formation');
 }
 await activate(browser,'formation',0);await choices(browser,'hero');
 await activate(browser,'hero',0);await pause(browser);
 const before=await state(browser);await browser.press('Tab',9);await hidden(browser,true);
 assert.equal(await browser.evaluate('SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===60).worldVisible'),true);
 await browser.press('Tab',9);await hidden(browser,false);assert.deepEqual(await state(browser),before);
});
