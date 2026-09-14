import assert from 'node:assert/strict';
import { selectFile } from '../helpers/native-chrome.mjs';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, catalog, choices, events, heroes, pause, tavern } from '../helpers/formation.mjs';
import { failureWithCount, replayUntil } from '../helpers/campaign.mjs';
import { continueSave } from '../helpers/discovery.mjs';
import { finishPhase, memorialReady, observePresentation, pictureRows, titleReady } from '../helpers/closing-presentation.mjs';
import { installPhase, saveBytes, state } from '../helpers/native-shared.mjs';
const normalize=text=>text.replace(/<br>/g,' ').replace(/\s+/g,' ').trim();
function causeText(id){
 const event = events.find(event=>event?.name===`memorial_cause.${id}`);
 const command = event?.list.find(command=>command.code===122&&command.parameters[0]===152);
 if(command)return JSON.parse(command.parameters[4]);
 assert.fail(`Missing authored cause ${id}.`);
}
async function victimChoices(browser,input){await installPhase(browser,input);await pause(browser);await browser.press('Enter',13);await choices(browser,'sacrifice');}
async function deathReady(browser){await browser.waitFor("$gameSystem._dryland.campaign.phase==='death_result'&&$gameTemp._drylandPersistence.status==='saved'&&$gameMessage.hasText()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0");}
canonicalCase('IT-057','native death locations are atomic immutable resumable and rendered as eight matching public accounts',{timeout:240000},async t=>{
 const browser=await tavern(t);await observePresentation(browser);await victimChoices(browser,failureWithCount(3));
 await browser.evaluate(`window.deathWrites=[];const save=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){if(name==='file'+$gameSystem.savefileId())deathWrites.push(structuredClone(contents.system._dryland.campaign));return save.call(this,name,contents);};window.victimOwner=$gameMap._interpreter;while(victimOwner._childInterpreter)victimOwner=victimOwner._childInterpreter;`);
 const before=await state(browser);assert.equal(before.deathLocations.H1,undefined);
 await activate(browser,'sacrifice',0);await deathReady(browser);const committed=await state(browser),context=committed.deathLocations.H1;
 assert.deepEqual(context,{routeId:'physical',encounterId:'A2',encounterPosition:1,approachId:'A2-3'});
 assert.deepEqual(await browser.evaluate('deathWrites[0].deathLocations.H1'),context);assert.equal(await browser.evaluate('deathWrites.length'),1);
 await browser.evaluate("PluginManager.callCommand(victimOwner,'Dryland_EventBridge','Action',{action:'SELECT_VICTIM',value:'H2'});");
 assert.equal((await browser.evaluate('$gameTemp._drylandLastRejection')).code,'stale_action');assert.deepEqual(await state(browser),committed);assert.equal(await browser.evaluate('deathWrites.length'),1);
 const deathBytes=await saveBytes(browser);await continueSave(browser);await deathReady(browser);assert.deepEqual(await state(browser),committed);assert.equal(await saveBytes(browser),deathBytes);
 for(let step=0;step<3&&(await state(browser)).phase==='death_result';step++){await pause(browser);await browser.press('Enter',13);}
 await browser.waitFor("$gameSystem._dryland.campaign.phase==='encounter_intro'&&$gameTemp._drylandPersistence.status==='saved'");await pause(browser);await browser.press('Enter',13);await choices(browser,'approaches');
 await activate(browser,'approaches',4);await choices(browser,'retreat');await activate(browser,'retreat',0);await choices(browser,'formation');
 assert.deepEqual((await state(browser)).deathLocations.H1,context);const retreat=await state(browser);const retreatBytes=await saveBytes(browser);
 await continueSave(browser);await choices(browser,'formation');assert.deepEqual(await state(browser),retreat);assert.equal(await saveBytes(browser),retreatBytes);
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');await titleReady(browser);
 // Malformed historical-envelope rejection was retired by the approved increment.
 await browser.press('ArrowDown',40);await browser.press('Enter',13);await selectFile(browser,2);await pause(browser);assert.deepEqual((await state(browser)).deathLocations,{});assert.deepEqual((await state(browser)).deadHeroIds,[]);
 const finalFailure=replayUntil('final-sixth-total-loss',s=>s.phase==='sacrifice_choice'&&s.dungeonId==='final'&&s.position===6);
 assert.equal(finalFailure.deathLocations.H8,undefined);await victimChoices(browser,finalFailure);await activate(browser,'sacrifice',0);await deathReady(browser);
 const allDead=await state(browser);assert.deepEqual(allDead.deathLocations.H8,{routeId:'final',encounterId:'B3',encounterPosition:6,approachId:'B3-1'});assert.equal(allDead.deadHeroIds.length,8);
 for(let step=0;step<3&&(await state(browser)).phase==='death_result';step++){await pause(browser);await browser.press('Enter',13);}
 await browser.waitFor("$gameSystem._dryland.campaign.phase==='ending'&&$gameTemp._drylandPersistence.status==='saved'");await pause(browser);
 const terminal=await state(browser);await continueSave(browser);await pause(browser);assert.deepEqual(await state(browser),terminal);
 await finishPhase(browser,'ending');await memorialReady(browser);const rows=await pictureRows(browser);assert.deepEqual(rows.filter(r=>r.caption).map(r=>r.id),heroes);
 for(const row of rows){
  const saved=terminal.deathLocations[row.id],caption=normalize(row.caption);assert.ok(caption.includes(normalize(causeText(saved.encounterId))),row.id);
  assert.ok(caption.includes(catalog.destinations[saved.routeId].name),row.id);assert.ok(caption.includes(catalog.encounters[saved.encounterId].name),row.id);
  assert.doesNotMatch(caption,/strength|dexterity|will|occult|survival|viability|A[1-8]-[1-3]|B[1-8]-[1-3]/);
  assert.ok(row.text.x>=0&&row.text.y>=0&&row.text.x+row.text.width<=1280&&row.text.y+row.text.height<=620,JSON.stringify(row.text));
 }
 const sizes=await browser.evaluate('(()=>{const w=new Window_Base(new Rectangle(0,0,320,200));const sizes=Object.entries(closingPresentation.captions).map(([id,t])=>{const size=w.textSizeEx(t),p=$gameScreen.picture(Number(id));return {width:(size.width+16)*p.scaleX()/100,height:(size.height+16)*p.scaleY()/100};});w.destroy();return sizes;})()');
 assert.ok(sizes.every(s=>s.width<=300&&s.height<=176),JSON.stringify(sizes));
 assert.deepEqual((await state(browser)).deathLocations,terminal.deathLocations);await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-11/IT-057/eight-death-contexts.png');
});
