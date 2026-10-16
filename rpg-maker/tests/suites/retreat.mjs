import { installPhase } from '../helpers/native-shared.mjs';
import { chooseTitle, selectFile } from '../helpers/native-chrome.mjs';
import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, formation, heroes, pause, rosterFixture, rules, tavern } from '../helpers/formation.mjs';
import { accepted, finishReading, finishCamp, replayUntil, rejectUnchanged } from '../helpers/campaign.mjs';
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-07/${id}`;
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const automatic = () => replayUntil('final-sixth-total-loss', state => state.phase === 'automatic_retreat');
const interrupted = () => replayUntil('final-sixth-total-loss', state => state.phase === 'camp' && state.deadHeroIds.length === 2);
function threshold(state = formation()) {
  if (!state.draftPartyIds.length) for (const heroId of ['H1', 'H2', 'H3']) state = accepted(state, 'TOGGLE_HERO', { heroId });
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId: state.completedDungeonIds.includes('physical') ? 'supernatural' : 'physical' });
  return accepted(state, 'DEPART');
}
function firstCamp(state = formation()) {
  state = finishReading(threshold(state));
  for (let n = 0; n < 2; n++) {
    state = finishReading(accepted(state, 'ENTER_DUNGEON'));
    const id = state.assignments[state.dungeonId][state.position - 1];
    const approach = rules.deriveViability(state.partyIds, id).approaches.find(a => a.viable);
    state = accepted(state, 'CHOOSE_APPROACH', { approachId: approach.id });
    state = finishReading(state);
  }
  return finishCamp(state);
}
canonicalCase('UT-029', 'voluntary retreat is exclusive to camp with any living roster', () => {
  for (const count of [3, 2, 1]) {
    const initial = rosterFixture(heroes.slice(0, 8 - count));
    const entry = threshold(initial);
    rejectUnchanged(entry, 'REQUEST_RETREAT', {}, 'retreat_unavailable');
    const state = structuredClone(entry);
    state.phase = 'camp'; state.reading = null; state.position = 2;
    const route = state.dungeonId;
    if (!state.assignments[route][0]) state.assignments[route][0] = 'B1';
    if (!state.assignments[route][1]) state.assignments[route][1] = 'B2';
    state.progress[route] = Math.max(2, state.progress[route]);
    assert.equal(rules.validateState(state).ok, true);
    assert.equal(rules.playerView(state).canRetreat, true);
    assert.equal(accepted(state, 'REQUEST_RETREAT').phase, 'retreat_confirmation');
  }
});
canonicalCase('UT-030', 'camp retreat preserves deaths, assignments and progress on renewed attempts', () => {
  const before = interrupted();
  assert.equal(before.position, 2); assert.equal(before.progress.physical, 2);
  const returned = accepted(accepted(before, 'REQUEST_RETREAT'), 'CONFIRM_RETREAT');
  assert.equal(returned.phase, 'formation'); assert.equal(returned.position, null);
  for (const key of ['deadHeroIds', 'deathLocations', 'assignments', 'progress', 'rngState']) assert.deepEqual(returned[key], before[key], key);
  let state = returned;
  for (const heroId of ['H4', 'H5']) state = accepted(state, 'TOGGLE_HERO', { heroId });
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId: 'supernatural' });
  state = accepted(state, 'DEPART');
  assert.equal(state.position, 1); assert.equal(state.campDeathBaseline, before.deadHeroIds.length);
  assert.deepEqual(state.assignments, before.assignments); assert.deepEqual(state.progress, before.progress);
  rejectUnchanged(state, 'REQUEST_RETREAT', {}, 'retreat_unavailable');
});
canonicalCase('UT-031', 'retreat cancellation restores camp and rejects repeated cancellation', () => {
  const before = firstCamp();
  const pending = accepted(before, 'REQUEST_RETREAT');
  assert.deepEqual(pending.retreatReturn, { phase: 'camp', reading: null });
  const after = accepted(pending, 'CANCEL_RETREAT');
  const { sequence: aSequence, history: aHistory, ...a } = after;
  const { sequence: bSequence, history: bHistory, ...b } = before;
  assert.deepEqual(a, b); assert.equal(aSequence, bSequence + 2); assert.equal(aHistory.length, bHistory.length + 2);
  rejectUnchanged(after, 'CANCEL_RETREAT', {}, 'invalid_transition');
});
async function installRoute(browser, state) {
  assert.equal(rules.validateState(state).ok, true);
  const encounter = state.assignments[state.dungeonId][state.position - 1];
  const mapId = (encounter.startsWith('A') ? 6 : 14) + Number(encounter.slice(1));
  await browser.evaluate(`$gameSystem._dryland.campaign=${JSON.stringify(state)}; $gameTemp._drylandPersistence={status:'idle',lastSuccessfulSequence:null,lastError:null}; $gameMap._interpreter.clear(); $gameMessage.clear(); $gamePlayer.reserveTransfer(${mapId},10,7,2,0); SceneManager.goto(Scene_Map);`);
  await browser.waitFor(`$gameMap.mapId() === ${mapId} && SceneManager._scene._messageWindow && !SceneManager._scene.isBusy()`);
}
async function observeAbsence(browser) {
  // Observe the engine's native 60 Hz picture-update boundary. Original methods
  // still execute; samples record every actual movement, not a replacement fade.
  await browser.evaluate(`(() => {
    window.absenceMoves=[]; window.absenceFrames=[]; let elapsed=0;
    const move=Game_Screen.prototype.movePicture;
    Game_Screen.prototype.movePicture=function(...args){
      if(this.picture(args[0])?.name().startsWith('Dryland_Tavern_H') && args[6]===0) absenceMoves.push({frame:Graphics.frameCount,args});
      return move.apply(this,args);
    };
    const update=Game_Screen.prototype.updatePictures;
    Game_Screen.prototype.updatePictures=function(){
      update.call(this);
      if(absenceMoves.length && elapsed<185) {
        elapsed++;
        absenceFrames.push({elapsed,pictures:absenceMoves.map(({args})=>{const p=this.picture(args[0]);return p?{id:args[0],x:p.x(),y:p.y(),opacity:p.opacity()}:null;})});
      }
    };
  })()`);
}
async function beginReturn(t, reduced = false) {
  const browser = await tavern(t);
  await browser.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
  const before = automatic();
  await installRoute(browser, before); await pause(browser); await observeAbsence(browser);
  await browser.press('Enter', 13);
  await choices(browser, 'formation');
  return { browser, before };
}
canonicalCase('IT-009', 'native return completes simultaneous three-second absences without repeating losses', { timeout: 90000 }, async t => {
  const { browser, before } = await beginReturn(t);
  const returned = await snapshot(browser);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.deepEqual(returned, finishReading(before));
  assert.deepEqual(await browser.evaluate('[38,39,40].map(id=>$gameSwitches.value(id))'), [true,true,true]);
  assert.equal(returned.history.filter(action => action.passageId?.startsWith('prologue.')).length, before.history.filter(action => action.passageId?.startsWith('prologue.')).length);
  const moves = await browser.evaluate('absenceMoves');
  assert.deepEqual(moves.map(move => move.args[0]), [26, 22, 27]);
  assert.equal(new Set(moves.map(move => move.frame)).size, 1);
  await browser.waitFor('absenceFrames.length === 185');
  const frames = await browser.evaluate('absenceFrames');
  for (const frame of frames) {
    const visible = frame.pictures.filter(Boolean);
    assert.ok(visible.length === 0 || visible.length === 3);
    if (visible.length) {
      assert.equal(new Set(visible.map(picture => picture.opacity)).size, 1);
    }
  }
  assert.ok(frames[88].pictures.every(picture => picture && picture.opacity > 100 && picture.opacity < 150));
  assert.ok(frames[178].pictures.every(picture => picture && picture.opacity > 0));
  assert.ok(frames[179].pictures.every(picture=>!picture || picture.opacity===0));
  assert.deepEqual(frames[184].pictures, [null, null, null]);
  assert.deepEqual(await snapshot(browser), returned);
  await browser.screenshot(`${evidence('IT-009')}/empty-fixed-places.png`);
  // Redraw the same dedicated map with no new domain transition: no repeat fade.
  await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Map);');
  await choices(browser, 'formation');
  assert.equal(await browser.evaluate('absenceMoves.length'), 3);
  assert.deepEqual(await snapshot(browser), returned);
});
canonicalCase('IT-010', 'interrupting the first return consumes absence and never restores dead interaction targets', { timeout: 90000 }, async t => {
  const { browser } = await beginReturn(t);
  const before = await snapshot(browser);
  assert.ok(await browser.evaluate('[26,22,27].some(id=>$gameScreen.picture(id)?.opacity()>0)'), 'Interruption occurs before the native fade completes.');
  assert.equal(await browser.evaluate("SceneManager._scene._choiceListWindow._list.some(entry=>/Bind Picture: (12|13|16)>/.test(entry.name))"), false);
  await browser.call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 344, y: 520 });
  await browser.call('Input.dispatchMouseEvent', { type: 'mousePressed', x: 344, y: 520, button: 'left', clickCount: 1 });
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
  await browser.call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 344, y: 520, button: 'left', clickCount: 1 });
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
  assert.equal(await browser.evaluate('$gameMessage._drylandChoiceFocus?.key'), 'formation');
  assert.deepEqual(await snapshot(browser), before);
  // Interrupt at the native map-transfer I/O boundary. Shared map 4 routes the
  // unchanged formation back to map 3 through its real orchestration event.
  await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();$gamePlayer.reserveTransfer(4,10,7,2,0);SceneManager.goto(Scene_Map);');
  await choices(browser, 'formation');
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.equal(await browser.evaluate('absenceMoves.length'), 3);
  assert.equal(await browser.evaluate('[12,13,16,26,22,27].some(id=>$gameScreen.picture(id))'), false);
  assert.equal(await browser.evaluate("SceneManager._scene._choiceListWindow._list.some(entry=>/Bind Picture: (12|13|16)>/.test(entry.name))"), false);
  assert.deepEqual(await snapshot(browser), before);
  // The accepted return already saved the native absence switches.
  // Continue at that checkpoint shows empty places, without a second fade.
  await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().some(c=>c.includes('choice.title.continue')) && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  await chooseTitle(browser, 'choice.title.continue'); await selectFile(browser,1); await choices(browser, 'formation');
  assert.equal(await browser.evaluate('absenceMoves.length'), 3);
  assert.equal(await browser.evaluate('[12,13,16,26,22,27].some(id=>$gameScreen.picture(id))'), false);
  assert.deepEqual(await snapshot(browser), before);
});
canonicalCase('IT-011', 'native reduced motion immediately removes new losses', { timeout: 90000 }, async t => {
  const { browser, before } = await beginReturn(t, true);
  assert.deepEqual(await snapshot(browser), finishReading(before));
  assert.equal(await browser.evaluate('absenceMoves.length'), 0);
  assert.equal(await browser.evaluate('[12,13,16,26,22,27].some(id=>$gameScreen.picture(id))'), false);
  // O botão Elenco (lista de presentes/mortos) saiu da taverna; a regra de ausência fica coberta acima.
});
canonicalCase('IT-013', 'native camp retreat preserves progress and continuing removes retreat until the next camp', { timeout: 120000 }, async t => {
  const browser = await tavern(t), before = interrupted();
  await installPhase(browser, before); await choices(browser, 'camp');
  const retreatIndex = await browser.evaluate("SceneManager._scene._choiceListWindow._list.findIndex(item => $gameMessage.choices()[item.ext].includes('ui.camp.retreat'))");
  assert.ok(retreatIndex >= 0);
  await activate(browser, 'camp', retreatIndex); await choices(browser, 'formation');
  const returned = await snapshot(browser);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.equal(returned.position, null);
  for (const key of ['assignments','progress','rngState','deadHeroIds','deathLocations']) assert.deepEqual(returned[key], before[key], key);
  assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file'+$gameSystem.savefileId()).then(contents=>contents.system._dryland.campaign)"), returned);
  await installPhase(browser, before); await choices(browser, 'camp');
  const continueIndex = await browser.evaluate("SceneManager._scene._choiceListWindow._list.findIndex(item => $gameMessage.choices()[item.ext].includes('ui.camp.continue'))");
  assert.ok(continueIndex >= 0);
  await activate(browser, 'camp', continueIndex);
  for (let n=0;n<30;n++) {
    await browser.waitFor("SceneManager._scene._choiceListWindow?.isOpenAndActive() || (SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount===0)");
    if (await browser.evaluate("SceneManager._scene._choiceListWindow?.isOpenAndActive() && $gameMessage._drylandChoiceFocus?.key==='approaches'")) break;
    await browser.press('Enter',13);
  }
  await choices(browser,'approaches');
  const continued = await snapshot(browser);
  assert.equal(continued.position, before.position + 1);
  assert.equal(await browser.evaluate("$gameMessage.choices().some(text=>text.includes('retreat'))"), false);
  await browser.evaluate("(()=>{const i=new Game_Interpreter();PluginManager.callCommand(i,'Dryland_EventBridge','CaptureContext',{});PluginManager.callCommand(i,'Dryland_EventBridge','Action',{action:'REQUEST_RETREAT',value:''});})()");
  assert.equal(await browser.evaluate('$gameVariables.value(24)'), 'retreat_unavailable');
  assert.deepEqual(await snapshot(browser), continued);
});
