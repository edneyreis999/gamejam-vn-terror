import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { deflateSync } from 'node:zlib';
import { validateNativeArchive, sha256 } from '../../qa/native-save-archive.mjs';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, activate, choices, pause, rules, tavern } from '../helpers/formation.mjs';
import { accepted, complete, failureWithCount, replayUntil } from '../helpers/campaign.mjs';
import { councilState } from '../helpers/closing.mjs';
import { installPhase, clickConsole } from '../helpers/native-shared.mjs';
import { endingWithHeroes } from '../helpers/closing-presentation.mjs';
import { openChrome, origin, project, selectFile, startServer } from '../helpers/native-chrome.mjs';
const require = createRequire(import.meta.url);
const { validateCheckpoint } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
const envelope = campaign => ({ campaign });
const safe = { scene: 'Scene_Map', interpreterRunning: true, messageBusy: false };
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-06/${id}`;
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const diagnostic = browser => browser.evaluate('$gameTemp._drylandPersistence');
async function savedCampaign(browser) { return browser.evaluate("StorageManager.loadObject('file'+$gameSystem.savefileId()).then(contents => contents.system._dryland.campaign)"); }
async function savedBytes(browser) { return browser.evaluate("StorageManager.loadZip('file'+$gameSystem.savefileId())"); }
async function toTitle(browser) {
  await browser.evaluate('$gameMap._interpreter.clear(); $gameMessage.clear(); SceneManager.goto(Scene_Title);');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
}
async function titleChoice(browser, label, fileId) {
  const index = await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(label)})`);
  assert.ok(index >= 0);
  for (let step = 0; step < 4; step++) {
    const current = await browser.evaluate('SceneManager._scene._choiceListWindow.index()');
    if (current === index) break;
    await browser.press(current < index ? 'ArrowDown' : 'ArrowUp', current < index ? 40 : 38);
  }
  await browser.press('Enter', 13);
  if(label==='Continuar')await selectFile(browser,fileId);
}
async function prepareSacrifice(browser, count = 3) {
  const state = failureWithCount(count), encounter = state.pendingOutcome.encounterId, mapId = 6 + Number(encounter.slice(1));
  await browser.evaluate(`$gameSystem._dryland.campaign = ${JSON.stringify(state)}; $gameTemp._drylandPersistence = {status:'idle',lastSuccessfulSequence:null,lastError:null}; $gameMap._interpreter.clear(); $gameMessage.clear(); $gamePlayer.reserveTransfer(${mapId},10,7,2,0); SceneManager.goto(Scene_Map);`);
  await browser.waitFor(`$gameMap.mapId() === ${mapId} && $gameMessage.allText().includes('A escolha é irreversível') && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0 && !SceneManager._scene.isBusy()`);
  await browser.press('Enter', 13);
  await choices(browser, 'sacrifice');
  return state;
}
async function commitSacrifice(browser) {
  const before = await prepareSacrifice(browser);
  await activate(browser, 'sacrifice', 0);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'death_result' && $gameTemp._drylandPersistence?.status === 'saved' && $gameMessage.speakerName() === 'Gorvak' && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0");
  return { before, after: await snapshot(browser) };
}
async function observeNativeText(browser) {
  await browser.evaluate(`window.nativeTextLog = []; for (const name of ['drawText','drawTextEx']) { const original = Window_Base.prototype[name]; Window_Base.prototype[name] = function(text,...args) { nativeTextLog.push(String(text)); return original.call(this,text,...args); }; }`);
}
async function observeLoadInstallation(browser) {
  await browser.evaluate(`window.loadInstallation = {create:0,extract:0,after:0,reload:0}; for (const [owner,key,counter] of [[DataManager,'createGameObjects','create'],[DataManager,'extractSaveContents','extract'],[Game_System.prototype,'onAfterLoad','after'],[Scene_Load.prototype,'reloadMapIfUpdated','reload']]) { const original=owner[key]; owner[key]=function(...args){loadInstallation[counter]++;return original.apply(this,args);}; }`);
}
async function awaitLoadFailure(browser) {
  await browser.waitFor("nativeTextLog.some(text => text.includes('Esta campanha não pode ser carregada.'))");
  assert.deepEqual(await browser.evaluate('loadInstallation'), { create: 0, extract: 0, after: 0, reload: 0 });
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
}
canonicalCase('UT-042', 'terminal New Game clears every prior campaign fact', () => {
  const terminal = replayUntil('final-sixth-total-loss', state => state.phase === 'campaign_complete');
  assert.equal(terminal.deadHeroIds.length, 8);
  const ready = accepted(terminal, 'NEW_CAMPAIGN');
  assert.deepEqual(ready, rules.createReadyState());
  assert.deepEqual(ready.deathLocations, {});
  assert.deepEqual(ready.seenPassageIds, []);
});
canonicalCase('UT-044', 'campaign serialization round-trip retains the entire pending death campaign', () => {
  const state = accepted(failureWithCount(3), 'SELECT_VICTIM', { heroId: 'H1' });
  const restored = JSON.parse(JSON.stringify(envelope(state)));
  assert.deepEqual(rules.validateState(restored.campaign), { ok: true, violations: [] });
  assert.deepEqual(restored.campaign, state);
  assert.deepEqual(restored.campaign.pendingOutcome, { encounterId: 'A2', approachId: 'A2-3', success: false, victimId: 'H1' });
  assert.deepEqual(Object.keys(restored.campaign).sort(), Object.keys(rules.createReadyState()).sort());
});
canonicalCase('UT-045', 'missing and mechanically corrupt campaign facts reject without creating ready state', () => {
  const valid = envelope(failureWithCount(3));
  assert.equal(rules.validateState(valid.campaign).ok, true);
  const corruptHistories = [];
  for (const [index, event] of valid.campaign.history.entries()) {
    for (const replacement of [null, {}, { ...event, extra: 'unrecognized' }, { sequence: event.sequence, type: 'NEW_CAMPAIGN' }]) {
      const copy = structuredClone(valid);
      copy.campaign.history[index] = replacement;
      corruptHistories.push(copy);
    }
    for (const field of Object.keys(event).filter(key => !['sequence', 'type'].includes(key))) {
      for (const invalid of ['missing', 'wrong-value']) {
        const copy = structuredClone(valid);
        if (invalid === 'missing') delete copy.campaign.history[index][field];
        else copy.campaign.history[index][field] = 'not-a-valid-payload';
        corruptHistories.push(copy);
      }
    }
  }
  for (const copy of corruptHistories) {
    const before = structuredClone(copy);
    assert.equal(rules.validateState(copy.campaign).ok, false, JSON.stringify(copy.campaign.history));
    assert.deepEqual(copy, before, 'Rejected history does not mutate the save');
  }
  for (const value of [null, {}, { ...valid, campaign: null }, { ...valid, campaign: {} }]) {
    const before = structuredClone(value), result = rules.validateState(value?.campaign);
    assert.equal(result.ok, false);
    assert.deepEqual(value, before);
    assert.equal(Object.hasOwn(result, 'campaign'), false);
  }
});
canonicalCase('UT-058', 'each saved terminal choice preserves its own ending and closing eligibility', () => {
  const finalChoice = replayUntil('final-sixth-solo-council', state => state.phase === 'final_choice');
  const bad = replayUntil('final-sixth-total-loss', state => state.phase === 'ending');
  for (const state of [accepted(finalChoice, 'CHOOSE_ENDING', { ending: 'reunite' }), accepted(finalChoice, 'CHOOSE_ENDING', { ending: 'destroy' }), bad]) {
    const restored = JSON.parse(JSON.stringify(envelope(state)));
    assert.equal(rules.validateState(restored.campaign).ok, true);
    assert.equal(restored.campaign.phase, 'ending');
    assert.equal(restored.campaign.reading.sceneId, `ending.${state.endingId}`);
    assert.deepEqual(restored.campaign.climaxPartyIds, state.climaxPartyIds);
    assert.equal(act(restored.campaign, 'CHOOSE_ENDING', { ending: 'reunite' }).ok, false);
  }
});
canonicalCase('UT-063', 'unknown reasons and busy native messages cannot be checkpoint boundaries', () => {
  const state = accepted(failureWithCount(3), 'SELECT_VICTIM', { heroId: 'H1' });
  assert.deepEqual(validateCheckpoint('sacrifice', state, safe), { ok: true });
  for (const [reason, context] of [['missing', safe], ['sacrifice', { ...safe, messageBusy: true }], ['sacrifice', { ...safe, interpreterRunning: false }], ['sacrifice', { ...safe, scene: 'Scene_Title' }]]) {
    assert.equal(validateCheckpoint(reason, state, context).error.code, 'invalid_checkpoint');
  }
  assert.equal(validateCheckpoint('departure', state, safe).error.code, 'invalid_checkpoint');
});
canonicalCase('IT-015', 'the saved checkpoint command replays without repeating its preceding sacrifice', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const { after } = await commitSacrifice(browser);
  assert.deepEqual(await savedCampaign(browser), after);
  const stack = await browser.evaluate("StorageManager.loadObject('file'+$gameSystem.savefileId()).then(contents => { const rows = []; for(let i=contents.map._interpreter;i;i=i._childInterpreter) rows.push({index:i._index,command:i.currentCommand(),wait:i._waitMode}); return rows; })");
  assert.equal(stack.at(-1).command.parameters[1], 'Checkpoint');
  assert.equal(stack.at(-1).command.parameters[3].reason, 'sacrifice');
  assert.equal(stack.at(-1).wait, 'dryland-save');
  const bytes = await savedBytes(browser);
  await toTitle(browser);
  await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.speakerName() === 'Gorvak' && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0");
  assert.deepEqual(await snapshot(browser), after);
  assert.equal(await savedBytes(browser), bytes, 'Exact replay performs no redundant storage write.');
  await browser.screenshot(`${evidence('IT-015')}/continued-farewell.png`);
});
canonicalCase('IT-016', 'a nested common-event save restores its parents and finishes each consequence once', { timeout: 90000 }, async t => {
  const browser = await tavern(t), { after } = await commitSacrifice(browser);
  assert.ok(await browser.evaluate("StorageManager.loadObject('file'+$gameSystem.savefileId()).then(contents=>{let count=0;for(let i=contents.map._interpreter;i;i=i._childInterpreter)count++;return count;})") >= 3);
  await toTitle(browser); await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.speakerName() === 'Gorvak' && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0");
  await browser.press('Enter', 13); await pause(browser);
  assert.equal((await snapshot(browser)).reading.index, 1);
  await browser.press('Enter', 13);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'encounter_intro' && $gameSystem._dryland.campaign.position === 2 && $gameTemp._drylandPersistence.status === 'saved' && $gameMessage.hasText()");
  const state = await snapshot(browser);
  assert.deepEqual(state.deadHeroIds, after.deadHeroIds);
  assert.deepEqual(state.deathLocations, after.deathLocations);
  assert.equal(state.history.filter(action => action.type === 'SELECT_VICTIM').length, 1);
  assert.equal(state.progress.physical, 1);
  assert.equal(state.seenPassageIds.filter(id => id === 'farewell.H1').length, 1);
});
canonicalCase('IT-017', 'one pending native storage write prevents overlapping writes and player progress', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  await prepareSacrifice(browser);
  await browser.evaluate(`window.nativeWrites=0;const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){if(name!=='file'+$gameSystem.savefileId())return nativeSave.call(this,name,contents);nativeWrites++;return new Promise((resolve,reject)=>{window.finishNativeWrite=()=>nativeSave.call(this,name,contents).then(resolve,reject);});};`);
  await activate(browser, 'sacrifice', 0);
  await browser.waitFor("$gameTemp._drylandPersistence.status === 'saving' && nativeWrites === 1");
  const before = await snapshot(browser);
  assert.equal(await browser.evaluate('$gameMessage.hasText()'), false);
  await browser.evaluate(`let i=$gameMap._interpreter;while(i._childInterpreter)i=i._childInterpreter;PluginManager.callCommand(i,'Dryland_EventBridge','Checkpoint',{reason:'sacrifice'});`);
  for (let repeat = 0; repeat < 3; repeat++) await browser.press('Enter', 13);
  assert.equal(await browser.evaluate('nativeWrites'), 1);
  assert.deepEqual(await snapshot(browser), before);
  assert.equal((await diagnostic(browser)).lastSuccessfulSequence, null);
  await browser.evaluate('finishNativeWrite()');
  await browser.waitFor("$gameTemp._drylandPersistence.status === 'saved' && $gameMessage.speakerName() === 'Gorvak'");
  assert.equal((await diagnostic(browser)).lastSuccessfulSequence, before.sequence);
});
canonicalCase('IT-018', 'a write failure releases native waiting and preserves the previous successful save', { timeout: 90000 }, async t => {
  const browser = await tavern(t), previous = await diagnostic(browser), bytes = await savedBytes(browser);
  await prepareSacrifice(browser);
  // This prepared encounter retains the real initial save's diagnostic. Inject
  // failure on the same map so the native notification can be inspected fully.
  await browser.evaluate(`$gameTemp._drylandPersistence=${JSON.stringify(previous)}`);
  await observeNativeText(browser);
  await browser.evaluate(`const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){return name==='file'+$gameSystem.savefileId()?Promise.reject(new Error('injected native I/O failure')):nativeSave.call(this,name,contents);};`);
  await activate(browser, 'sacrifice', 0);
  await browser.waitFor("$gameTemp._drylandPersistence.status === 'failed' && $gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.hasText()");
  assert.deepEqual(await diagnostic(browser), { status: 'failed', lastSuccessfulSequence: previous.lastSuccessfulSequence, lastError: { code: 'save_failed' } });
  assert.equal(await savedBytes(browser), bytes);
  await browser.waitFor("nativeTextLog.some(text => text.includes('Não foi possível salvar.'))");
  await browser.screenshot(`${evidence('IT-018')}/native-write-failure.png`);
});
canonicalCase('IT-019', 'the first failed autosave never claims a resumable new campaign', { timeout: 60000 }, async t => {
  await startServer(t); const browser = await openChrome(t);
  await browser.waitFor("window.$gameMessage && $gameMessage.choices().includes('Jogar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  await observeNativeText(browser);
  await browser.evaluate(`const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){return name==='file'+$gameSystem.savefileId()?Promise.reject(new Error('injected first-write failure')):nativeSave.call(this,name,contents);};`);
  await browser.press('Enter', 13);await selectFile(browser,1);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'intro' && $gameTemp._drylandPersistence?.status === 'failed' && $gameMessage.hasText()");
  assert.deepEqual(await diagnostic(browser), { status: 'failed', lastSuccessfulSequence: null, lastError: { code: 'save_failed' } });
  assert.equal(await browser.evaluate('DataManager.savefileExists($gameSystem.savefileId())'), false);
  await browser.waitFor("nativeTextLog.some(text => text.includes('Não foi possível salvar.'))");
});
canonicalCase('IT-020', 'invalid checkpoint reasons do not reach native storage', { timeout: 60000 }, async t => {
  const browser = await tavern(t), before = await snapshot(browser), bytes = await savedBytes(browser);
  await browser.evaluate(`window.invalidWrites=0;const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(...args){invalidWrites++;return nativeSave.apply(this,args);};const i=new Game_Interpreter();i.setup([{code:0,indent:0,parameters:[]}],0);PluginManager.callCommand(i,'Dryland_EventBridge','Checkpoint',{reason:'missing'});`);
  assert.equal(await browser.evaluate('$gameVariables.value(24)'), 'invalid_checkpoint');
  assert.equal(await browser.evaluate('invalidWrites'), 0);
  assert.deepEqual(await snapshot(browser), before);
  assert.equal(await savedBytes(browser), bytes);
});
canonicalCase('IT-021', 'native load failure distinguishes unreadable bytes from missing campaign structure without rewriting either file', { timeout:120000 }, async t => {
 const browser=await tavern(t);await commitSacrifice(browser);
 const original=await savedBytes(browser),file=await browser.evaluate('$gameSystem.savefileId()'),observations=[];
 for(const variant of ['unreadable','missing-campaign']){
  await browser.evaluate(`StorageManager.saveZip('file'+${file},${JSON.stringify(original)})`);
  if(variant==='unreadable')await browser.evaluate(`StorageManager.saveZip('file'+${file},'not-a-native-compressed-save')`);
  else await browser.evaluate(`StorageManager.loadObject('file'+${file}).then(c=>{delete c.system._dryland;return StorageManager.saveObject('file'+${file},c);})`);
  const bytes=await browser.evaluate(`StorageManager.loadZip('file'+${file})`);
  await browser.reopen();await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
  await observeLoadInstallation(browser);
  await browser.evaluate('window.nativeLoadFailures=0;const failed=Scene_Load.prototype.onLoadFailure;Scene_Load.prototype.onLoadFailure=function(){nativeLoadFailures++;return failed.call(this);};');
  await titleChoice(browser,'Continuar',file);
  await browser.waitFor('nativeLoadFailures===1&&SceneManager._scene instanceof Scene_Load&&SceneManager._scene._listWindow.isOpenAndActive()');
  const installation=await browser.evaluate('loadInstallation');
  if(variant==='unreadable')assert.deepEqual(installation,{create:0,extract:0,after:0,reload:0});
  else {assert.equal(installation.extract,1);assert.equal(installation.after,0);assert.equal(await browser.evaluate('Boolean($gameSystem._dryland?.campaign)'),false);}
  assert.equal(await browser.evaluate(`StorageManager.loadZip('file'+${file})`),bytes);
  observations.push({variant,installation,nativeFailure:true});
  await browser.screenshot(`${evidence('IT-021')}/${variant}-native-failure.png`);
 }
 await writeFile(`${evidence('IT-021')}/native-failure-boundaries.json`,JSON.stringify(observations,null,2)+'\n');
});
canonicalCase('IT-023', 'native title Continue loads the existing state and leaves save bytes unchanged', { timeout: 60000 }, async t => {
  const browser = await tavern(t), { after } = await commitSacrifice(browser), bytes = await savedBytes(browser);
  await toTitle(browser); await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.speakerName() === 'Gorvak' && SceneManager._scene._messageWindow.pause");
  assert.deepEqual(await snapshot(browser), after);
  assert.equal(await savedBytes(browser), bytes);
  assert.equal((await diagnostic(browser)).lastSuccessfulSequence, after.sequence);
});
canonicalCase('IT-024', 'player-selected A and B files retain separate campaigns and UI reading histories across cancellation and Continue', { timeout:240000 }, async t => {
 const browser=await tavern(t),records=[];
 async function finishTavernUnit(){
  for(let box=0;box<16;box++){
   await browser.waitFor("($gameMessage._drylandChoiceFocus?.key==='formation'&&SceneManager._scene._choiceListWindow.isOpenAndActive()&&!$gameMessage.hasText())||($gameMessage.hasText()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0)");
   if(await browser.evaluate("$gameMessage._drylandChoiceFocus?.key==='formation'&&!$gameMessage.hasText()"))return;
   await browser.press('Enter',13);
  }
  assert.fail('Tavern reading did not return to formation');
 }
 async function earnDeparture(file,hero,party,route){
  assert.equal(await browser.evaluate('$gameSystem.savefileId()'),file);
  await activate(browser,'formation',hero);await activate(browser,'hero',0);await finishTavernUnit();
  for(const index of party){await activate(browser,'formation',index);await activate(browser,'hero',1);await finishTavernUnit();}
  await activate(browser,'formation',8);await activate(browser,'destinations',route);await choices(browser,'formation');
  await activate(browser,'formation',10);
  await browser.waitFor("$gameSystem._dryland.campaign.phase==='dungeon_intro'&&$gameTemp._drylandPersistence.status==='saved'&&$gameMessage.hasText()&&SceneManager._scene._messageWindow.pause");
  const record=await browser.evaluate(`StorageManager.loadObject('file'+${file}).then(c=>({file:${file},campaign:c.system._dryland.campaign,ui:c.system._drylandReadUnits,permission:c.system.isExtendedFastForwardDisallowed(),stack:(()=>{const rows=[];for(let i=c.map._interpreter;i;i=i._childInterpreter)rows.push({index:i._index,code:i.currentCommand()?.code});return rows;})()}))`);
  records.push(record);return record;
 }
 const a=await earnDeparture(1,0,[0,1,2],0),aBytes=await savedBytes(browser);
 assert.ok(a.ui.includes(82)&&a.ui.includes(83));
 await browser.reopen();
 await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await titleChoice(browser,'Novo jogo');
 await browser.waitFor('SceneManager._scene instanceof Scene_File&&SceneManager._scene._listWindow.isOpenAndActive()&&!SceneManager._scene.isBusy()');
 assert.equal(await browser.evaluate('SceneManager._scene._listWindow.maxItems()'),20);
 await browser.press('Escape',27);
 await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 assert.equal(await browser.evaluate("StorageManager.loadZip('file1')"),aBytes,'Cancelling the occupied-file selection preserves A');
 await titleChoice(browser,'Novo jogo');await selectFile(browser,2);await pause(browser);
 assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'),[]);
 for(const marker of ['A chuva acompanha Ivaí','Minha mãe deixou registros','Irati escrevera']){
  await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(marker)})&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0`);
  await browser.press('Enter',13);
 }
 await choices(browser,'formation');const b=await earnDeparture(2,1,[3,4,5],1),bBytes=await savedBytes(browser);
 assert.ok(b.ui.includes(86)&&b.ui.includes(87));assert.equal(b.ui.includes(82),false);
 assert.equal(await browser.evaluate("StorageManager.loadZip('file1')"),aBytes);
 assert.notDeepEqual(a.campaign.partyIds,b.campaign.partyIds);
 for(const record of [a,b]){
  await browser.reopen();await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
  await titleChoice(browser,'Continuar',record.file);await pause(browser);
  assert.equal(await browser.evaluate('$gameSystem.savefileId()'),record.file);
  assert.deepEqual(await snapshot(browser),record.campaign);
  assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'),record.ui);
  assert.equal(await browser.evaluate('Boolean($gameTemp.isMessageAutoForwardMode()||$gameTemp.isExtendedFastForwardMode())'),false);
  assert.equal(await browser.evaluate("StorageManager.loadZip('file1')"),aBytes);
  assert.equal(await browser.evaluate("StorageManager.loadZip('file2')"),bBytes);
  await browser.screenshot(`${evidence('IT-024')}/continued-file-${record.file}.png`);
 }
 await writeFile(`${evidence('IT-024')}/player-files.json`,JSON.stringify({origin,kind:'player-earned prologue, observation, formation and departure; browser restart between files',records},null,2)+'\n');
 assert.deepEqual(browser.exceptions,[]);
});
canonicalCase('IT-039', 'a restored checkpoint wait with no live Promise resumes normally', { timeout: 60000 }, async t => {
  const browser = await tavern(t); await commitSacrifice(browser);
  assert.equal(await browser.evaluate("StorageManager.loadObject('file'+$gameSystem.savefileId()).then(contents=>{let i=contents.map._interpreter;while(i._childInterpreter)i=i._childInterpreter;return i._waitMode;})"), 'dryland-save');
  await toTitle(browser); await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.hasText() && SceneManager._scene._messageWindow.pause");
  assert.equal(await browser.evaluate("(()=>{for(let i=$gameMap._interpreter;i;i=i._childInterpreter)if(i._waitMode==='dryland-save')return false;return true;})()"), true);
});
canonicalCase('IT-044', 'Continue preserves a revealed assignment and RNG instead of drawing again', { timeout: 90000 }, async t => {
  const browser = await tavern(t); await commitSacrifice(browser);
  await browser.press('Enter', 13); await pause(browser); await browser.press('Enter', 13);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'encounter_intro' && $gameSystem._dryland.campaign.position === 2 && $gameTemp._drylandPersistence.status === 'saved' && SceneManager._scene._messageWindow?.pause");
  const state = await snapshot(browser), bytes = await savedBytes(browser);
  await toTitle(browser); await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'encounter_intro' && $gameSystem._dryland.campaign.position === 2 && SceneManager._scene._messageWindow?.pause");
  assert.deepEqual(await snapshot(browser), state);
  assert.equal(await savedBytes(browser), bytes);
});
canonicalCase('IT-045', 'SaveCore replaces an explicitly selected occupied file and cancellation leaves unindexed native bytes intact', { timeout:90000 }, async t => {
 const browser=await tavern(t),oldBytes=await savedBytes(browser),file=await browser.evaluate('$gameSystem.savefileId()');
 await browser.reopen();await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await titleChoice(browser,'Novo jogo');await selectFile(browser,file);await pause(browser);
 await browser.waitFor("$gameMap.mapId()===2&&$gameTemp._drylandPersistence.status==='saved'");
 assert.equal(await browser.evaluate('$gameSystem.savefileId()'),file);
 assert.notEqual(await savedBytes(browser),oldBytes);
 assert.equal((await snapshot(browser)).history.length,1);
 const bytes=await savedBytes(browser);
 // Isolated native-index fault: the provider only advertises its existing index.
 await browser.evaluate("DataManager._globalInfo=[];StorageManager.saveObject('global',[])");
 await browser.reopen();await browser.waitFor("window.$gameMessage?.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await browser.waitFor('SceneManager._scene instanceof Scene_Save&&SceneManager._scene._listWindow.isOpenAndActive()&&!SceneManager._scene.isBusy()');
 await browser.press('Escape',27);await browser.waitFor("window.$gameMessage?.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 assert.equal(await browser.evaluate(`StorageManager.loadZip('file'+${file})`),bytes);
 await browser.screenshot(`${evidence('IT-045')}/cancelled-unindexed-file.png`);
});
canonicalCase('IT-059', 'text and historical revision labels do not reject native saves while an unsupported map reference follows native LoadError', { timeout:120000 }, async t => {
 const directory=await mkdtemp(path.join(tmpdir(),'dryland-native-revision-'));
 t.after(()=>rm(directory,{recursive:true,force:true}));
 for(const entry of await readdir(project,{withFileTypes:true})){
  const source=path.join(project,entry.name),target=path.join(directory,entry.name);
  if(entry.isDirectory()&&entry.name!=='data')await symlink(source,target);else await cp(source,target,{recursive:true});
 }
 await startServer(t,directory);const browser=await openChrome(t);
 await browser.waitFor("window.$gameMessage?.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
 const before=await snapshot(browser);
 // Isolated I/O fixture adds old labels to otherwise current native objects.
 await browser.evaluate("StorageManager.loadObject('file1').then(c=>{Object.assign(c.system._dryland,{schemaVersion:99,catalogVersion:99,nativeLayoutVersion:'historical-label'});return StorageManager.saveObject('file1',c);})");
 const bytes=await savedBytes(browser),eventFile=path.join(directory,'data/CommonEvents.json'),edited=JSON.parse(await readFile(eventFile,'utf8'));
 const revised='Texto revisado na mesma estrutura nativa.';
 edited[115].list.find(c=>c.code===401).parameters[0]=revised;
 await writeFile(eventFile,JSON.stringify(edited));
 await browser.reopen();await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await titleChoice(browser,'Continuar',1);await pause(browser);
 assert.deepEqual(await snapshot(browser),before);
 assert.equal(await savedBytes(browser),bytes);
 await browser.press('Enter',13);
 await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(revised)})&&SceneManager._scene._messageWindow.pause`);
 assert.equal((await snapshot(browser)).sequence,before.sequence+1);
 assert.equal(await savedBytes(browser),bytes);
 await browser.screenshot(`${evidence('IT-059')}/same-structure-revised-text.png`);
 // An unavailable historical map is an unsupported native structure, not a revision-label rejection.
 await browser.evaluate("StorageManager.loadObject('file1').then(c=>{c.map._mapId=999;return StorageManager.saveObject('file1',c);})");
 const unsupported=await savedBytes(browser);
 await browser.reopen();await browser.waitFor("window.$gameMessage?.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await titleChoice(browser,'Continuar',1);
 await assert.rejects(browser.waitFor('$gameMap.mapId()===999&&SceneManager._scene.constructor===Scene_Map&&SceneManager._scene.isStarted()&&!SceneManager._scene.isBusy()'),/Map999/);
 assert.equal(await browser.evaluate("StorageManager.loadZip('file1')"),unsupported);
 assert.match(await browser.evaluate('Graphics._errorPrinter.textContent'),/Map999/);
 await browser.screenshot(`${evidence('IT-059')}/unsupported-map-native-error.png`);
});

canonicalCase('IT-062','native Options and saved interpreters retain tavern Council farewell and epilogue pictures without replay',{timeout:180000},async t=>{
 const browser=await tavern(t);
 await browser.evaluate(`window.continuityLoaded=false;window.continuityHold=false;window.continuityCues=[];
  const execute=Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand=function(){return continuityLoaded&&continuityHold?false:execute.call(this);};
  const load=DataManager.loadGame;DataManager.loadGame=function(id){return load.call(this,id).then(result=>{continuityLoaded=true;return result;});};
  const audio=AudioManager.playSe;AudioManager.playSe=function(cue){continuityCues.push(cue.name);return audio.call(this,cue);};`);
 const pictures=()=>browser.evaluate(`Array.from({length:100},(_,id)=>{const p=$gameScreen.picture(id);return p?{id,name:p.name(),x:p.x(),y:p.y(),scaleX:p.scaleX(),scaleY:p.scaleY(),opacity:p.opacity(),tone:p.tone(),origin:p.origin()}:null;}).filter(Boolean)`);
 for(const kind of ['tavern','council','farewell','epilogue']){
  await browser.evaluate('continuityLoaded=false;continuityHold=false;');
  if(kind==='tavern'){await activate(browser,'formation',0);await activate(browser,'hero',0);}
  else if(kind==='council')await installPhase(browser,councilState());
  else if(kind==='farewell')await installPhase(browser,complete(accepted(failureWithCount(3),'SELECT_VICTIM',{heroId:'H1'})));
  else {let epilogue=endingWithHeroes(['H1','H2','H3']);while(epilogue.phase==='ending')epilogue=complete(epilogue);await installPhase(browser,epilogue);}
  await pause(browser);
  await browser.evaluate("$gameScreen.showPicture(92,'Dryland_Button',0,31,37,30,40,181,0)");
  await browser.waitFor('$gameScreen._pictures.filter(Boolean).every(p=>p._duration===0&&p._toneDuration===0)');
  const before=await snapshot(browser),shown=await pictures(),cues=await browser.evaluate('continuityCues.slice()');
  await clickConsole(browser,'options');await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
  await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()");await pause(browser);
  assert.deepEqual(await pictures(),shown,kind+' Options');assert.deepEqual(await snapshot(browser),before);
  assert.deepEqual(await browser.evaluate('continuityCues'),cues,kind+' Options must not replay audio');
  // Isolated native save fixture. Freeze only the post-load execution boundary
  // to inspect the serialized screen/interpreter before ordinary continuation.
  await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');const bytes=await savedBytes(browser);
  await toTitle(browser);await browser.evaluate('continuityLoaded=false;continuityHold=true;');await titleChoice(browser,'Continuar');
  await browser.waitFor("continuityLoaded&&SceneManager._scene.constructor.name==='Scene_Map'&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()");
  assert.deepEqual(await pictures(),shown,kind+' Continue');assert.deepEqual(await snapshot(browser),before);assert.equal(await savedBytes(browser),bytes);
  assert.equal(await browser.evaluate('Boolean($gameMap._interpreter._childInterpreter)'),true,'Native interpreter chain survives serialization');
  await browser.screenshot(evidence('IT-062')+'/'+kind+'-native-continuity.png');
  await browser.evaluate('continuityHold=false;');
 }
});



canonicalCase('UT-069','native QA archives bind the selected file, identity, source, origin and payload/index without mutating their master',()=>{
 const files=[{path:'data/System.json',sha256:'source'}];
 const nativeState={mapId:2,readUnits:[83],presentedDeaths:Array.from({length:8},(_,index)=>({heroId:'H'+(index+1),presented:index===0})),interpreters:[{eventId:1,commonEventId:83,index:4,waitMode:'message'}]};
 const contents={system:{_savefileId:7,_dryland:{campaign:{sequence:3}},_drylandReadUnits:[83]},map:{_mapId:2,_interpreter:{_eventId:1,_drylandCommonEventId:83,_index:4,_waitMode:'message','@':'Game_Interpreter'}},switches:{_data:Array.from({length:46},(_,index)=>index===38)}};
 const encode=value=>deflateSync(JSON.stringify(value),{level:1}).toString('latin1');
 const payload=encode(contents),indexPayload=encode([null,null,null,null,null,null,null,{title:'native'}]);
 const archive={schemaVersion:2,nativeState,origin:'http://127.0.0.1:18726',fileId:7,gameId:42,campaign:{sequence:3},index:{title:'native'},sourceFiles:files,keys:{payload:'rmmzsave.42.file7',index:'rmmzsave.42.global'},payloadSha256:sha256(payload),indexSha256:sha256(indexPayload),storageState:{origins:[{indexedDB:[{stores:[{records:[{key:'rmmzsave.42.file7',value:payload},{key:'rmmzsave.42.global',value:indexPayload}]}]}]}]}};
 archive.identitySha256=sha256(JSON.stringify({fileId:archive.fileId,gameId:archive.gameId,campaign:archive.campaign,index:archive.index,keys:archive.keys}));
 const baseline=structuredClone(archive);
 validateNativeArchive(archive,files,archive.origin);
 for(const change of [value=>value.sourceFiles[0].sha256='changed',value=>value.fileId=8,value=>value.gameId=8,value=>value.keys.index='wrong',value=>value.index.title='wrong',value=>value.campaign.sequence=9,value=>value.origin='http://127.0.0.1:18727',value=>value.storageState.origins[0].indexedDB[0].stores[0].records[0].value='changed',value=>value.storageState.origins[0].indexedDB[0].stores[0].records[1].value='changed']){
  const edited=structuredClone(archive);change(edited);assert.throws(()=>validateNativeArchive(edited,files,archive.origin));
 }
 for(const change of [value=>value.index.title='coordinated',value=>value.campaign.sequence=9,value=>value.nativeState.mapId=9,value=>value.nativeState.readUnits.push(84),value=>value.nativeState.presentedDeaths[0].presented=false,value=>value.nativeState.interpreters[0].index=9]){
  const edited=structuredClone(archive);change(edited);
  edited.identitySha256=sha256(JSON.stringify({fileId:edited.fileId,gameId:edited.gameId,campaign:edited.campaign,index:edited.index,keys:edited.keys}));
  assert.throws(()=>validateNativeArchive(edited,files,archive.origin),/differs from native/);
 }
 assert.deepEqual(archive,baseline);
});

canonicalCase('IT-066','cold native Continue retains saved pictures and cancelling load does not rewrite the checkpoint',{timeout:90000},async t=>{
 const browser=await tavern(t);await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 const fileId=await browser.evaluate('$gameSystem.savefileId()');
 await browser.evaluate("$gameScreen.showPicture(92,'Dryland_Button',0,31,37,30,40,181,0);DataManager.saveGame($gameSystem.savefileId())");const bytes=await savedBytes(browser);
 await toTitle(browser);
 await browser.evaluate(`ImageManager.clear();
  const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){if(this._url.endsWith('/Dryland_H1.png')&&!window.resumeSavedImage){this._loadingState='loading';window.resumeSavedImage=()=>start.call(this);}else start.call(this);};`);
 await titleChoice(browser,'Continuar');await browser.waitFor('typeof resumeSavedImage==="function"&&$gameMap.mapId()===3');
 assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'),'Dryland_H1');
 assert.equal(await browser.evaluate('$gameScreen.picture(92)?.opacity()'),181);
 assert.equal(await browser.evaluate(`StorageManager.loadZip('file${fileId}')`),bytes);
 // Isolated cancellation at the native scene/loading boundary. Nothing rebuilds
 // a visual prefix or schedules a story command when the bitmap later resolves.
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);resumeSavedImage();');
 await browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()");
 assert.equal(await browser.evaluate('$gameMessage.allText().includes("Gorvak")'),false);
 assert.equal(await browser.evaluate(`StorageManager.loadZip('file${fileId}')`),bytes);
 await browser.screenshot(`${evidence('IT-066')}/cancelled-native-load.png`);
});
