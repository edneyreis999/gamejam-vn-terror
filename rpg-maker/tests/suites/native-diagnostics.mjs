import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { tavern } from '../helpers/formation.mjs';
import { frames, titleReady } from '../helpers/closing-presentation.mjs';
import { saveBytes, state } from '../helpers/native-shared.mjs';
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-11/${id}`;
export async function toTitle(browser) {
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');
 await titleReady(browser);
}
export async function titleAction(browser,label) {
 const index=await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(label)})`);assert.ok(index>=0);
 for(let step=0;step<5;step++){
  const current=await browser.evaluate('SceneManager._scene._choiceListWindow.index()');if(current===index)break;
  await browser.press(current<index?'ArrowDown':'ArrowUp',current<index?40:38);
 }
 await browser.press('Enter',13);
}
canonicalCase('IT-003','native captured context permits one activation and rejects missing or stale reuse',{timeout:60000},async t=>{
 const browser=await tavern(t),before=await state(browser),bytes=await saveBytes(browser);
 await browser.evaluate(`window.probeInterpreter=new Game_Interpreter();PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','Action',{action:'TOGGLE_HERO',value:'H1'});`);
 assert.equal((await browser.evaluate('$gameTemp._drylandLastRejection || null')).code,'missing_context');assert.deepEqual(await state(browser),before);
 await browser.evaluate(`PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','CaptureContext',{});PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','Action',{action:'TOGGLE_HERO',value:'H1'});`);
 const once=await state(browser);assert.equal(once.sequence,before.sequence+1);assert.deepEqual(once.draftPartyIds,['H1']);assert.equal((await browser.evaluate('$gameTemp._drylandLastRejection || null')),null);
 await browser.evaluate(`PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','Action',{action:'TOGGLE_HERO',value:'H2'});`);
 assert.equal((await browser.evaluate('$gameTemp._drylandLastRejection || null')).code,'stale_action');assert.deepEqual(await state(browser),once);assert.equal(await saveBytes(browser),bytes);
 await frames(browser,3);await browser.screenshot(`${evidence('IT-003')}/stale-feedback.png`);
});


canonicalCase('IT-031','the loaded native game exposes no QA console, seed setter or editorial enforcement API',{timeout:60000},async t=>{
 const browser=await tavern(t);
 assert.equal(await browser.evaluate("typeof expeditionQA"),'undefined');
 assert.deepEqual(await browser.evaluate('Object.keys(DrylandEventBridge).sort()'),['query','readConfiguration','validateBridgeAction','validateCapturedContext','validateCheckpoint']);
 assert.equal(await browser.evaluate("'snapshot' in DrylandCampaignRules.createRules(DrylandCampaignRules.createCatalog(DrylandEventBridge.readConfiguration($dataCommonEvents[4])))"),false);
});
canonicalCase('IT-040','invalid functional actions fail without executing values or changing the campaign',{timeout:90000},async t=>{
 const browser=await tavern(t),before=await state(browser),bytes=await saveBytes(browser);
 for(const [command,args,code]of [['Action',{action:'evil',value:''},'invalid_action'],['Action',{action:'TOGGLE_HERO',value:'globalThis.executed=1'},'invalid_action']]){
  await browser.evaluate(`PluginManager.callCommand(new Game_Interpreter(),'Dryland_EventBridge',${JSON.stringify(command)},${JSON.stringify(args)})`);
  assert.equal((await browser.evaluate('$gameTemp._drylandLastRejection || null')).code,code);assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('window.executed===undefined'),true);
 }
 assert.equal(await saveBytes(browser),bytes);
});
