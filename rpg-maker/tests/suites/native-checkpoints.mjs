import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause } from '../helpers/formation.mjs';
import { accepted, failureWithCount } from '../helpers/campaign.mjs';
import { councilBoundary, finalChoice } from '../helpers/closing.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { discoveryBoundary } from '../helpers/discovery.mjs';
import { titleReady } from '../helpers/closing-presentation.mjs';
import { entry, installPhase, saveBytes, state } from '../helpers/native-shared.mjs';
const fixtures=phaseFixtures();
async function arm(browser,reason){await browser.evaluate(`checkpointRecords=[];checkpointHoldReason=${JSON.stringify(reason)};checkpointLoaded=null;`);}
async function advanceUntilSaved(browser,reason){
 for(let step=0;step<12;step++){
  await browser.waitFor(`checkpointRecords.some(r=>r.reason===${JSON.stringify(reason)}&&r.done)||($gameMessage.hasText()&&SceneManager._scene._messageWindow?.pause&&SceneManager._scene._messageWindow._waitCount===0&&!SceneManager._scene.isBusy())`);
  if(await browser.evaluate(`checkpointRecords.some(r=>r.reason===${JSON.stringify(reason)}&&r.done)`))return;
  await browser.press('Enter',13);
 }
 assert.fail(`Native reading did not produce ${reason}.`);
}
async function roundTrip(browser,reason){
 await browser.waitFor(`checkpointRecords.some(r=>r.reason===${JSON.stringify(reason)}&&r.done)&&$gameTemp._drylandPersistence.status==='saved'`);
 const record=await browser.evaluate(`checkpointRecords.find(r=>r.reason===${JSON.stringify(reason)}&&r.done)`);
 assert.deepEqual(await state(browser),record.state,reason);
 assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file0').then(c=>c.system._dryland.campaign)"),record.state,reason);
 const bytes=await saveBytes(browser);
 await browser.evaluate("checkpointHoldReason=null;$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);");await titleReady(browser);
 await browser.evaluate('checkpointObserveLoad=true;');await browser.press('Enter',13);
 await browser.waitFor("checkpointLoaded&&SceneManager._scene.constructor.name==='Scene_Map'&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()");
 assert.deepEqual(await browser.evaluate('checkpointLoaded'),record.state,reason);
 assert.deepEqual(await state(browser),record.state,reason);assert.equal(await saveBytes(browser),bytes,reason);
 await browser.evaluate('checkpointObserveLoad=false;checkpointLoaded=null;');
 await browser.waitFor("SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()&&(($gameMessage.hasText()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0)||$gameMessage.isChoice())");
 return {reason,sequence:record.state.sequence,phase:record.state.phase,deathLocations:record.state.deathLocations};
}
canonicalCase('IT-014','all nine authored semantic checkpoints save and install exactly their committed campaign through native Continue',{timeout:240000},async t=>{
 const browser=await entry(t),evidence=[];
 // Pause interpreter execution only at completed I/O boundaries so a following
 // automatic checkpoint cannot overwrite the exact boundary under inspection.
 // Serialization, compression, storage, validation, extraction and native
 // Continue are the real engine implementation throughout.
 await browser.evaluate(`window.checkpointRecords=[];window.checkpointHoldReason=null;window.checkpointObserveLoad=false;window.checkpointLoaded=null;
 const save=DataManager.saveGame;DataManager.saveGame=function(id){let i=$gameMap._interpreter;while(i._childInterpreter)i=i._childInterpreter;const c=i.currentCommand();const r={reason:c?.parameters?.[3]?.reason,state:structuredClone($gameSystem._dryland.campaign),done:false};if(id===0)checkpointRecords.push(r);return save.call(this,id).then(value=>{r.done=true;return value;});};
 const load=DataManager.loadGame;DataManager.loadGame=function(id){return load.call(this,id).then(value=>{if(checkpointObserveLoad)checkpointLoaded=structuredClone($gameSystem._dryland.campaign);return value;});};
 const execute=Game_Interpreter.prototype.executeCommand;Game_Interpreter.prototype.executeCommand=function(){if((checkpointObserveLoad&&checkpointLoaded)||(checkpointHoldReason&&checkpointRecords.some(r=>r.reason===checkpointHoldReason&&r.done)))return false;return execute.call(this);};`);
 await arm(browser,'new_campaign');await browser.press('Enter',13);evidence.push(await roundTrip(browser,'new_campaign'));
 let prepared=fixtures.formation;for(const heroId of ['H1','H2','H3'])prepared=accepted(prepared,'TOGGLE_HERO',{heroId});prepared=accepted(prepared,'SELECT_DESTINATION',{dungeonId:'physical'});
 await installPhase(browser,prepared);await choices(browser,'formation');await arm(browser,'departure');await activate(browser,'formation',10);evidence.push(await roundTrip(browser,'departure'));
 await arm(browser,'reveal');await advanceUntilSaved(browser,'reveal');evidence.push(await roundTrip(browser,'reveal'));
 await browser.press('Enter',13);await choices(browser,'approaches');const index=await browser.evaluate('expeditionQA.snapshot().currentEncounter.approaches.findIndex(a=>a.viable)');assert.ok(index>=0);
 await arm(browser,'approach');await activate(browser,'approaches',index);evidence.push(await roundTrip(browser,'approach'));
 await installPhase(browser,failureWithCount(3));await pause(browser);await browser.press('Enter',13);await choices(browser,'sacrifice');
 await arm(browser,'sacrifice');await activate(browser,'sacrifice',0);evidence.push(await roundTrip(browser,'sacrifice'));
 await arm(browser,'consequence');await advanceUntilSaved(browser,'consequence');evidence.push(await roundTrip(browser,'consequence'));
 await installPhase(browser,discoveryBoundary(['physical','supernatural']));await arm(browser,'reward');await advanceUntilSaved(browser,'reward');evidence.push(await roundTrip(browser,'reward'));
 await installPhase(browser,councilBoundary());await arm(browser,'council');await advanceUntilSaved(browser,'council');evidence.push(await roundTrip(browser,'council'));
 await installPhase(browser,finalChoice());await choices(browser,'ending');await arm(browser,'ending');await activate(browser,'ending',1);evidence.push(await roundTrip(browser,'ending'));
 assert.deepEqual(evidence.map(r=>r.reason),['new_campaign','departure','reveal','approach','sacrifice','consequence','reward','council','ending']);
 const directory='docs/qa/evidence/init-rpg-maker-mz/task-11/IT-014';await mkdir(directory,{recursive:true});await writeFile(`${directory}/boundaries.json`,JSON.stringify(evidence,null,2)+'\n');
});
