import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { validateNativeArchive, sha256 } from '../../qa/native-save-archive.mjs';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, activate, choices, events, pause, rules, tavern } from '../helpers/formation.mjs';
import { accepted, complete, failureWithCount, replayUntil } from '../helpers/campaign.mjs';
import { closingReady, councilState, installClosing } from '../helpers/closing.mjs';
import { openChrome, origin, project, startServer } from '../helpers/native-chrome.mjs';
import { hash, localAssets, nativeFiles } from '../../tools/native-layout.mjs';
const require = createRequire(import.meta.url);
const { validateEnvelope, validateCheckpoint } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
const layout = JSON.parse(await readFile(new URL('../../The Dryland Drowned/native-layout-manifest.json', import.meta.url), 'utf8'));
const envelope = campaign => ({ schemaVersion: 1, catalogVersion: 1, nativeLayoutVersion: layout.nativeLayoutVersion, campaign });
const safe = { scene: 'Scene_Map', interpreterRunning: true, messageBusy: false, presentationActive: false };
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-06/${id}`;
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const diagnostic = browser => browser.evaluate('$gameTemp._drylandPersistence');
async function savedCampaign(browser) { return browser.evaluate("StorageManager.loadObject('file0').then(contents => contents.system._dryland.campaign)"); }
async function savedBytes(browser) { return browser.evaluate("StorageManager.loadZip('file0')"); }
async function toTitle(browser) {
  await browser.evaluate('$gameMap._interpreter.clear(); $gameMessage.clear(); SceneManager.goto(Scene_Title);');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
}
async function titleChoice(browser, label) {
  const index = await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(label)})`);
  assert.ok(index >= 0);
  for (let step = 0; step < 4; step++) {
    const current = await browser.evaluate('SceneManager._scene._choiceListWindow.index()');
    if (current === index) break;
    await browser.press(current < index ? 'ArrowDown' : 'ArrowUp', current < index ? 40 : 38);
  }
  await browser.press('Enter', 13);
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
canonicalCase('UT-044', 'save envelope round-trip retains the entire pending death campaign', () => {
  const state = accepted(failureWithCount(3), 'SELECT_VICTIM', { heroId: 'H1' });
  const restored = JSON.parse(JSON.stringify(envelope(state)));
  assert.deepEqual(validateEnvelope(restored, layout.nativeLayoutVersion, rules.validateState), { ok: true });
  assert.deepEqual(restored.campaign, state);
  assert.deepEqual(restored.campaign.pendingOutcome, { encounterId: 'A2', approachId: 'A2-3', success: false, victimId: 'H1' });
  assert.deepEqual(Object.keys(restored.campaign).sort(), Object.keys(rules.createReadyState()).sort());
});
canonicalCase('UT-045', 'missing, incompatible and corrupt envelopes reject without creating ready state', () => {
  const valid = envelope(failureWithCount(3));
  assert.equal(validateEnvelope(valid, layout.nativeLayoutVersion, rules.validateState).ok, true);
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
    assert.equal(validateEnvelope(copy, layout.nativeLayoutVersion, rules.validateState).ok, false, JSON.stringify(copy.campaign.history));
    assert.deepEqual(copy, before, 'Rejected history does not mutate the save');
  }
  for (const value of [null, {}, { ...valid, schemaVersion: 2 }, { ...valid, catalogVersion: 2 }, { ...valid, nativeLayoutVersion: 'old' }, { ...valid, campaign: null }, { ...valid, campaign: {} }]) {
    const before = structuredClone(value), result = validateEnvelope(value, layout.nativeLayoutVersion, rules.validateState);
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
    assert.equal(validateEnvelope(restored, layout.nativeLayoutVersion, rules.validateState).ok, true);
    assert.equal(restored.campaign.phase, 'ending');
    assert.equal(restored.campaign.reading.sceneId, `ending.${state.endingId}`);
    assert.deepEqual(restored.campaign.climaxPartyIds, state.climaxPartyIds);
    assert.equal(act(restored.campaign, 'CHOOSE_ENDING', { ending: 'reunite' }).ok, false);
  }
});
canonicalCase('UT-063', 'unknown reasons and active presentation cannot be checkpoint boundaries', () => {
  const state = accepted(failureWithCount(3), 'SELECT_VICTIM', { heroId: 'H1' });
  assert.deepEqual(validateCheckpoint('sacrifice', state, safe), { ok: true });
  for (const [reason, context] of [['missing', safe], ['sacrifice', { ...safe, messageBusy: true }], ['sacrifice', { ...safe, presentationActive: true }], ['sacrifice', { ...safe, interpreterRunning: false }], ['sacrifice', { ...safe, scene: 'Scene_Title' }]]) {
    assert.equal(validateCheckpoint(reason, state, context).error.code, 'invalid_checkpoint');
  }
  assert.equal(validateCheckpoint('departure', state, safe).error.code, 'invalid_checkpoint');
});
canonicalCase('IT-015', 'the saved checkpoint command replays without repeating its preceding sacrifice', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const { after } = await commitSacrifice(browser);
  assert.deepEqual(await savedCampaign(browser), after);
  const stack = await browser.evaluate("StorageManager.loadObject('file0').then(contents => { const rows = []; for(let i=contents.map._interpreter;i;i=i._childInterpreter) rows.push({index:i._index,command:i.currentCommand(),wait:i._waitMode}); return rows; })");
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
  assert.ok(await browser.evaluate("StorageManager.loadObject('file0').then(contents=>{let count=0;for(let i=contents.map._interpreter;i;i=i._childInterpreter)count++;return count;})") >= 3);
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
  await browser.evaluate(`window.nativeWrites=0;const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){if(name!=='file0')return nativeSave.call(this,name,contents);nativeWrites++;return new Promise((resolve,reject)=>{window.finishNativeWrite=()=>nativeSave.call(this,name,contents).then(resolve,reject);});};`);
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
  await browser.evaluate(`const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){return name==='file0'?Promise.reject(new Error('injected native I/O failure')):nativeSave.call(this,name,contents);};`);
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
  await browser.evaluate(`const nativeSave=StorageManager.saveObject;StorageManager.saveObject=function(name,contents){return name==='file0'?Promise.reject(new Error('injected first-write failure')):nativeSave.call(this,name,contents);};`);
  await browser.press('Enter', 13);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'intro' && $gameTemp._drylandPersistence?.status === 'failed' && $gameMessage.hasText()");
  assert.deepEqual(await diagnostic(browser), { status: 'failed', lastSuccessfulSequence: null, lastError: { code: 'save_failed' } });
  assert.equal(await browser.evaluate('DataManager.savefileExists(0)'), false);
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
canonicalCase('IT-021', 'corrupt or incompatible saves fail before native game-object installation', { timeout: 150000 }, async t => {
  const browser = await tavern(t); await commitSacrifice(browser);
  const originalBytes = await savedBytes(browser);
  for (const mutation of ["delete contents.system._dryland", "contents.system._dryland.schemaVersion=2", "contents.system._dryland.catalogVersion=2", "contents.system._dryland.campaign={}", "contents.system._dryland.nativeLayoutVersion='old'", "delete contents.system._dryland.campaign.history[0].seed"] ) {
    await browser.evaluate(`StorageManager.saveZip('file0',${JSON.stringify(originalBytes)})`);
    await browser.evaluate(`StorageManager.loadObject('file0').then(contents=>{${mutation};return StorageManager.saveObject('file0',contents);})`);
    const corruptBytes = await savedBytes(browser);
    await toTitle(browser); await observeNativeText(browser); await observeLoadInstallation(browser);
    await titleChoice(browser, 'Continuar'); await awaitLoadFailure(browser);
    assert.equal(await savedBytes(browser), corruptBytes);
  }
  await browser.screenshot(`${evidence('IT-021')}/usable-title-after-rejection.png`);
});
canonicalCase('IT-023', 'native title Continue loads the existing state and leaves save bytes unchanged', { timeout: 60000 }, async t => {
  const browser = await tavern(t), { after } = await commitSacrifice(browser), bytes = await savedBytes(browser);
  await toTitle(browser); await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.speakerName() === 'Gorvak' && SceneManager._scene._messageWindow.pause");
  assert.deepEqual(await snapshot(browser), after);
  assert.equal(await savedBytes(browser), bytes);
  assert.equal((await diagnostic(browser)).lastSuccessfulSequence, after.sequence);
});
canonicalCase('IT-024', 'one native New Game starts directly over existing, terminal and invalid payloads', { timeout: 120000 }, async t => {
  const browser = await tavern(t); await commitSacrifice(browser);
  const baseBytes = await savedBytes(browser);
  const terminal = replayUntil('final-sixth-total-loss', state => state.phase === 'ending');
  for (const variant of ['existing', 'terminal', 'invalid']) {
    await browser.evaluate(`StorageManager.saveZip('file0',${JSON.stringify(baseBytes)})`);
    if (variant !== 'existing') await browser.evaluate(`StorageManager.loadObject('file0').then(contents=>{contents.system._dryland.campaign=${JSON.stringify(variant === 'terminal' ? terminal : {})};return StorageManager.saveObject('file0',contents);})`);
    await toTitle(browser);
    await browser.evaluate(`(() => { window.newGamePayloadReads=0;const nativeLoad=StorageManager.loadObject;StorageManager.loadObject=function(name){if(name==='file0')newGamePayloadReads++;return nativeLoad.call(this,name);}; })()`);
    await titleChoice(browser, 'Novo jogo');
    await browser.waitFor("$gameMap.mapId() === 2 && $gameSystem._dryland.campaign.phase === 'intro' && $gameTemp._drylandPersistence.status === 'saved' && $gameMessage.allText().includes('A chuva acompanha') && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0");
    assert.equal(await browser.evaluate('newGamePayloadReads'), 0);
    const state = await snapshot(browser);
    assert.deepEqual(state.deadHeroIds, []); assert.deepEqual(state.deathLocations, {}); assert.deepEqual(state.seenPassageIds, []);
    assert.equal(state.sequence, 1); assert.equal(state.endingId, null);
    assert.deepEqual(await savedCampaign(browser), state);
  }
});
canonicalCase('IT-039', 'a restored checkpoint wait with no live Promise resumes normally', { timeout: 60000 }, async t => {
  const browser = await tavern(t); await commitSacrifice(browser);
  assert.equal(await browser.evaluate("StorageManager.loadObject('file0').then(contents=>{let i=contents.map._interpreter;while(i._childInterpreter)i=i._childInterpreter;return i._waitMode;})"), 'dryland-save');
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
canonicalCase('IT-045', 'missing save-index metadata never turns an existing payload into permission to overwrite', { timeout: 90000 }, async t => {
  const browser = await tavern(t); await commitSacrifice(browser);
  const bytes = await savedBytes(browser);
  await browser.evaluate("DataManager._globalInfo=[];StorageManager.saveObject('global',[])");
  await toTitle(browser);
  assert.ok(await browser.evaluate("$gameMessage.choices().includes('Continuar') && $gameMessage.choices().includes('Novo jogo')"));
  assert.equal(await savedBytes(browser), bytes);
  await titleChoice(browser, 'Continuar');
  await browser.waitFor("$gameMessage.allText() === 'Esta campanha não pode ser carregada.' && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0");
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 1);
  await browser.press('Enter', 13);
  await browser.waitFor("$gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive()");
  assert.equal(await savedBytes(browser), bytes);
});
async function layoutFixture(t, variant) {
  const directory = await mkdtemp(path.join(tmpdir(), 'dryland-save-layout-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const entry of await readdir(project, { withFileTypes: true })) {
    const source = path.join(project, entry.name), destination = path.join(directory, entry.name);
    if (entry.name === 'data') await cp(source, destination, { recursive: true });
    else if (entry.name === 'native-layout-manifest.json') await cp(source, destination);
    else await symlink(source, destination);
  }
  const eventFile = path.join(directory, 'data/CommonEvents.json'), events = JSON.parse(await readFile(eventFile, 'utf8'));
  if (variant === 'insert') events[42].list.unshift({ code: 108, indent: 0, parameters: ['Fixture: inserted command'] });
  if (variant === 'reorder') {
    const left = events[38].list.findIndex(command => command.code === 231 && command.parameters[0] === 40);
    const right = events[38].list.findIndex(command => command.code === 231 && command.parameters[0] === 41);
    assert.ok(left >= 0 && right >= 0);
    [events[38].list[left], events[38].list[right]] = [events[38].list[right], events[38].list[left]];
  }
  if (variant === 'wording') events[1].list.find(command => command.code === 401).parameters[0] += ' Texto revisado na fixture.';
  if (variant === 'common-id') {
    const moved = events.length; events.push({ ...events[42], id: moved }); events[42] = null;
    for (const event of events.filter(Boolean)) for (const command of event.list) if (command.code === 117 && command.parameters[0] === 42) command.parameters[0] = moved;
  }
  if (variant === 'map-id') {
    const infosFile = path.join(directory, 'data/MapInfos.json'), infos = JSON.parse(await readFile(infosFile, 'utf8'));
    infos[48] = { ...infos[8], id: 48 }; infos[8] = null;
    await cp(path.join(directory, 'data/Map008.json'), path.join(directory, 'data/Map048.json'));
    await rm(path.join(directory, 'data/Map008.json'));
    await writeFile(infosFile, JSON.stringify(infos, null, 2));
    for (const command of events[40].list) {
      if (command.code === 201 && command.parameters[1] === 8) command.parameters[1] = 48;
      if (command.code === 111 && command.parameters[1]?.includes("=== 'A2'")) command.parameters[1] = command.parameters[1].replace('!== 8', '!== 48');
    }
  }
  if (variant === 'system') {
    const file = path.join(directory, 'data/System.json'), system = JSON.parse(await readFile(file, 'utf8')); system.versionId++;
    await writeFile(file, JSON.stringify(system, null, 2));
  }
  await writeFile(eventFile, JSON.stringify(events, null, 2));
  const drift = spawnSync(process.execPath, ['rpg-maker/tools/validate-content.mjs', '--json', '--project', directory], { encoding: 'utf8' });
  assert.equal(drift.status, 1, variant);
  assert.deepEqual(JSON.parse(drift.stdout), { ok: false, errors: [{ code: 'native_layout_mismatch' }] });
  const files = await nativeFiles(directory), version = `fixture-${variant}`;
  await writeFile(path.join(directory, 'native-layout-manifest.json'), JSON.stringify({ ...layout, nativeLayoutVersion: version, revisions: { ...layout.revisions, [version]: hash(JSON.stringify(files)) }, files, assets: await localAssets(project) }, null, 2));
  const valid = spawnSync(process.execPath, ['rpg-maker/tools/validate-content.mjs', '--json', '--project', directory], { encoding: 'utf8' });
  assert.equal(valid.status, 0, valid.stdout);
  return directory;
}
canonicalCase('IT-059', 'all native layout changes reject old nested saves before installation while New Game remains usable', { timeout: 240000 }, async t => {
  // One temporary browser profile keeps the same real IndexedDB across builds.
  let server = await startServer(t);
  const browser = await openChrome(t);
  await browser.waitFor("window.$gameMessage && $gameMessage.choices().includes('Jogar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  await browser.press('Enter', 13);
  await browser.waitFor("$gameTemp._drylandPersistence?.status === 'saved' && $gameMessage.hasText() && SceneManager._scene._messageWindow.pause");
  await commitSacrifice(browser);
  const bytes = await savedBytes(browser);
  for (const variant of ['insert', 'reorder', 'common-id', 'map-id', 'wording', 'system']) {
    const directory = await layoutFixture(t, variant);
    await server.stop(); server = await startServer(t, directory);
    await browser.call('Page.navigate', { url: origin });
    await browser.waitFor("window.$gameMap && $gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
    assert.equal(await savedBytes(browser), bytes);
    await observeNativeText(browser); await observeLoadInstallation(browser);
    await titleChoice(browser, 'Continuar'); await awaitLoadFailure(browser);
    assert.equal(await savedBytes(browser), bytes);
    await titleChoice(browser, 'Novo jogo');
    await browser.waitFor("$gameMap.mapId() === 2 && $gameSystem._dryland.campaign.phase === 'intro' && $gameTemp._drylandPersistence.status === 'saved' && $gameMessage.hasText() && SceneManager._scene._messageWindow.pause");
    assert.deepEqual((await snapshot(browser)).deadHeroIds, []);
    await browser.evaluate(`StorageManager.saveZip('file0',${JSON.stringify(bytes)})`);
  }
});

canonicalCase('IT-062','native Continue rebuilds missing conversation pictures from saved presentation stacks without replaying displayed text',{timeout:180000},async t=>{
 const browser=await tavern(t);
 const text=events[5].list.filter(c=>c.code===401).slice(0,7).map(c=>c.parameters[0]);
 await browser.evaluate(`window.bustSaveHold=false;window.bustSaveHeld=false;
  const execute=Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand=function(){const c=this.currentCommand();if(bustSaveHold&&c?.code===357&&c.parameters[0]==='VisuMZ_2_VNPictureBusts'&&c.parameters[1]==='Tone_NormalBust'){bustSaveHeld=true;return false;}return execute.call(this);};`);
 for(const savedBox of [-1,0,2]){
  await browser.evaluate(`bustSaveHold=${savedBox===-1};bustSaveHeld=false;`);
  await activate(browser,'formation',0);await activate(browser,'hero',0);
  for(let box=0;box<=savedBox;box++){
   await browser.waitFor(`$gameMessage.allText()===${JSON.stringify(text[box])}&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0`);
   if(box<savedBox)await browser.press('Enter',13);
  }
  if(savedBox===-1)await browser.waitFor('bustSaveHeld');
  const before=await snapshot(browser);
  // Synthetic active-text save: this exercises native serialization and load,
  // not a new player checkpoint. Remove only transient visual fixture state.
  await browser.evaluate('for(let id=60;id<=65;id++)$gameScreen.erasePicture(id);');
  await browser.evaluate('DataManager.saveGame(0)');const bytes=await savedBytes(browser);
  await toTitle(browser);await browser.evaluate('bustSaveHold=false;ImageManager.clear();');await browser.press('Enter',13);
  await browser.waitFor(`$gameMessage.allText()===${JSON.stringify(text[savedBox+1])}&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0`);
  assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'),'Dryland_H1');
  assert.equal(await browser.evaluate('$gameScreen.picture(63)?.name()||null'),savedBox>=2?'Dryland_ivai':null);
  assert.deepEqual(await snapshot(browser),before);assert.equal(await savedBytes(browser),bytes);
  await browser.screenshot(`${evidence('IT-062')}/continued-box-${savedBox+1}.png`);
  for(let box=savedBox+1;box<7;box++){await pause(browser);await browser.press('Enter',13);}
  await pause(browser);await browser.press('Enter',13);await choices(browser,'formation');
 }
});

canonicalCase('IT-063','continued Council stages restore derived roster and helper effects while native completion advances exactly once',{timeout:240000},async t=>{
 const browser=await tavern(t);
 for(const [kind,target] of [['collective','council.challenge'],['collective','council.confession'],['collective','council.andira'],['collective','opinion.H1'],['collective','opinion.H2'],['solo','council.solo']]){
  await installClosing(browser,councilState(kind));
  for(let step=0;step<12;step++){
   await closingReady(browser);const current=await snapshot(browser);
   if(current.reading.passageIds[current.reading.index]===target)break;
   await browser.press('Enter',13);
  }
  const before=await snapshot(browser);assert.equal(before.reading.passageIds[before.reading.index],target);
  await browser.evaluate('for(let id=60;id<=65;id++)$gameScreen.erasePicture(id);[144,145,146].forEach((id,index)=>$gameVariables.setValue(id,8-index));');
  await browser.evaluate('DataManager.saveGame(0)');const bytes=await savedBytes(browser);
  await toTitle(browser);await browser.press('Enter',13);await closingReady(browser);
  const after=await snapshot(browser);assert.deepEqual(after,complete(before));assert.equal(await savedBytes(browser),bytes);
  const next=after.reading.passageIds[after.reading.index];
  const heroes=next==='council.andira'?[]:after.climaxPartyIds;
  assert.deepEqual(await browser.evaluate('Array.from({length:6},(_,i)=>$gameScreen.picture(60+i)?.name()||null)'),[...Array.from({length:3},(_,i)=>heroes[i]?`Dryland_${heroes[i]}`:null),'Dryland_ivai',null,next==='council.andira'?'Dryland_andira':null]);
  assert.deepEqual(await browser.evaluate('[144,145,146].map(id=>$gameVariables.value(id))'),Array.from({length:3},(_,i)=>after.climaxPartyIds[i]?Number(after.climaxPartyIds[i].slice(1)):0));
  await browser.screenshot(`${evidence('IT-063')}/${kind}-${target}-continued.png`);
 }
});

canonicalCase('UT-069','native QA archives reject changed source, revision, origin and payload/index without mutating their master',()=>{
 const files=[{path:'data/System.json',sha256:'source'}];
 const archive={schemaVersion:1,origin:'http://127.0.0.1:18727',layout:'native-current',sourceFiles:files,keys:{payload:'native.file0',index:'native.global'},payloadSha256:sha256('payload'),indexSha256:sha256('index'),storageState:{origins:[{indexedDB:[{stores:[{records:[{key:'native.file0',value:'payload'},{key:'native.global',value:'index'}]}]}]}]}};
 const baseline=structuredClone(archive);
 validateNativeArchive(archive,files,archive.origin,archive.layout);
 for(const [change,expected] of [
  [value=>value.sourceFiles[0].sha256='changed',/sources changed/],
  [value=>value.layout='native-older',/revision is incompatible/],
  [value=>value.origin='http://127.0.0.1:18726',/strictly equal/],
  [value=>value.storageState.origins[0].indexedDB[0].stores[0].records[0].value='changed',/strictly equal/],
  [value=>value.storageState.origins[0].indexedDB[0].stores[0].records[1].value='changed',/strictly equal/]
 ]){const edited=structuredClone(archive);change(edited);assert.throws(()=>validateNativeArchive(edited,files,archive.origin,archive.layout),expected);}
 assert.deepEqual(archive,baseline);
});

canonicalCase('IT-066','cancelling a cold post-load reconstruction invalidates its queued image and private helper without touching the save',{timeout:90000},async t=>{
 const browser=await tavern(t);await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 const before=await snapshot(browser);
 // Remove transient pictures so the private restoration helper, rather than
 // Scene_Map's initial sprite loading, owns the held cold image request.
 await browser.evaluate('for(let id=60;id<=65;id++)$gameScreen.erasePicture(id);DataManager.saveGame(0)');const bytes=await savedBytes(browser);
 await toTitle(browser);
 await browser.evaluate(`ImageManager.clear();window.cancelledRecovery=false;
  const update=Game_Map.prototype.updateInterpreter;Game_Map.prototype.updateInterpreter=function(){if(!cancelledRecovery)update.call(this);};
  const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){if(this._url.endsWith('/Dryland_H1.png')&&!window.resumeRecoveryImage){this._loadingState='loading';window.resumeRecoveryImage=()=>start.call(this);}else start.call(this);};`);
 await titleChoice(browser,'Continuar');await browser.waitFor('typeof resumeRecoveryImage==="function"&&$gameMap.mapId()===3');
 assert.equal(await browser.evaluate('$gameMessage.hasText()'),false,'Recovery waits for the actual required bitmap.');
 await browser.evaluate(`$gameScreen.showPicture(18,'Dryland_H2',0,20,30,10,10,255,0);cancelledRecovery=true;$gameMap._interpreter.clear();$gameMessage.clear();resumeRecoveryImage();`);
 await browser.waitFor('ImageManager.isReady()');await browser.evaluate('new Promise(resolve=>{let frames=45;const tick=()=>--frames?requestAnimationFrame(tick):resolve();requestAnimationFrame(tick);})');
 assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id=>!$gameScreen.picture(id))'),true);
 assert.equal(await browser.evaluate('$gameScreen.picture(18).name()'),'Dryland_H2');
 assert.equal(await browser.evaluate('$gameMessage.hasText()'),false);
 assert.deepEqual(await snapshot(browser),before);assert.equal(await savedBytes(browser),bytes);
 await browser.screenshot(`${evidence('IT-066')}/cancelled-cold-reconstruction.png`);
});
