import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, catalog, choices, events, heroes, pause, tavern } from '../helpers/formation.mjs';
import { failureWithCount, replayUntil } from '../helpers/campaign.mjs';
import { continueSave } from '../helpers/discovery.mjs';
import { finishPhase, memorialReady, observePresentation, pictureRows, titleReady } from '../helpers/closing-presentation.mjs';
import { installPhase, qa, saveBytes, state } from '../helpers/native-shared.mjs';
const normalize=text=>text.replace(/\s+/g,' ').trim();
function causeText(id){
 for(const event of events.filter(Boolean)){
  const start=event.list.findIndex(c=>c.code===108&&c.parameters[0]===`@dryland-section memorial_cause.${id}`);
  if(start<0)continue;const end=event.list.findIndex((c,i)=>i>start&&c.code===108&&c.parameters[0]==='@dryland-end');
  return event.list.slice(start,end).filter(c=>c.code===401).map(c=>c.parameters[0]).join('\n');
 }
 assert.fail(`Missing authored cause ${id}.`);
}
async function victimChoices(browser,input){await installPhase(browser,input);await pause(browser);await browser.press('Enter',13);await choices(browser,'sacrifice');}
async function deathReady(browser){await browser.waitFor("$gameSystem._dryland.campaign.phase==='death_result'&&$gameTemp._drylandPersistence.status==='saved'&&$gameMessage.hasText()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0");}
canonicalCase('IT-057','native death locations are atomic immutable resumable and rendered as eight matching public accounts',{timeout:240000},async t=>{
 const browser=await tavern(t);await observePresentation(browser);await victimChoices(browser,failureWithCount(3));
 await browser.evaluate(`window.deathWrites=[];const save=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){if(name==='file0')deathWrites.push(structuredClone(contents.system._dryland.campaign));return save.call(this,name,contents);};window.victimOwner=$gameMap._interpreter;while(victimOwner._childInterpreter)victimOwner=victimOwner._childInterpreter;`);
 const before=await state(browser);assert.equal(before.deathLocations.H1,undefined);
 await activate(browser,'sacrifice',0);await deathReady(browser);const committed=await state(browser),context=committed.deathLocations.H1;
 assert.deepEqual(context,{routeId:'physical',encounterId:'A2',encounterPosition:1,approachId:'A2-3'});
 assert.deepEqual(await browser.evaluate('deathWrites[0].deathLocations.H1'),context);assert.equal(await browser.evaluate('deathWrites.length'),1);
 await browser.evaluate("PluginManager.callCommand(victimOwner,'Dryland_EventBridge','Action',{action:'SELECT_VICTIM',value:'H2'});");
 assert.equal((await qa(browser)).lastRejectedAction.code,'stale_action');assert.deepEqual(await state(browser),committed);assert.equal(await browser.evaluate('deathWrites.length'),1);
 const deathBytes=await saveBytes(browser);await continueSave(browser);await deathReady(browser);assert.deepEqual(await state(browser),committed);assert.equal(await saveBytes(browser),deathBytes);
 for(let step=0;step<3&&(await state(browser)).phase==='death_result';step++){await pause(browser);await browser.press('Enter',13);}
 await browser.waitFor("$gameSystem._dryland.campaign.phase==='encounter_intro'&&$gameTemp._drylandPersistence.status==='saved'");await pause(browser);await browser.press('Enter',13);await choices(browser,'approaches');
 await activate(browser,'approaches',4);await choices(browser,'retreat');await activate(browser,'retreat',0);await choices(browser,'formation');
 assert.deepEqual((await state(browser)).deathLocations.H1,context);const retreat=await state(browser);const retreatBytes=await saveBytes(browser);
 await continueSave(browser);await choices(browser,'formation');assert.deepEqual(await state(browser),retreat);assert.equal(await saveBytes(browser),retreatBytes);
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');await titleReady(browser);
 await browser.evaluate('window.contextInstallations=0;const extract=DataManager.extractSaveContents;DataManager.extractSaveContents=function(contents){contextInstallations++;return extract.call(this,contents);};');
 for(const mutation of ["delete contents.system._dryland.campaign.deathLocations.H1","contents.system._dryland.campaign.deathLocations.H1.routeId='final'","contents.system._dryland.campaign.deathLocations.H1.approachId='B3-1'"]){
  await browser.evaluate(`StorageManager.loadObject('file0').then(contents=>{${mutation};return StorageManager.saveObject('file0',contents);})`);
  const invalidBytes=await saveBytes(browser),ready=await state(browser);
  assert.equal(await browser.evaluate("DataManager.loadGame(0).then(()=>null,error=>error.message)"),'invalid_state');
  assert.equal(await browser.evaluate('contextInstallations'),0);assert.deepEqual(await state(browser),ready);assert.equal(await saveBytes(browser),invalidBytes);
  await browser.evaluate(`StorageManager.saveZip('file0',${JSON.stringify(retreatBytes)})`);
 }
 await browser.press('ArrowDown',40);await browser.press('Enter',13);await pause(browser);assert.deepEqual((await state(browser)).deathLocations,{});assert.deepEqual((await state(browser)).deadHeroIds,[]);
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
 const sizes=await browser.evaluate('(()=>{const w=new Window_Base(new Rectangle(0,0,320,200));const sizes=Object.values(closingPresentation.captions).map(t=>w.textSizeEx(t));w.destroy();return sizes;})()');
 assert.ok(sizes.every(s=>s.width<=300&&s.height<=176),JSON.stringify(sizes));
 assert.deepEqual((await state(browser)).deathLocations,terminal.deathLocations);await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-11/IT-057/eight-death-contexts.png');
});
