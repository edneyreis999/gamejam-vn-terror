import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, activate, choices, formation, heroes, pause, rosterFixture, rules, tavern } from '../helpers/formation.mjs';
import { accepted, finishReading, replayUntil, rejectUnchanged } from '../helpers/campaign.mjs';
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-07/${id}`;
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const automatic = () => replayUntil('final-sixth-total-loss', state => state.phase === 'automatic_retreat');
const interrupted = () => replayUntil('final-sixth-total-loss', state => state.phase === 'encounter_choice' && state.deadHeroIds.length === 2);
function threshold(state = formation()) {
  if (!state.draftPartyIds.length) for (const heroId of ['H1', 'H2', 'H3']) state = accepted(state, 'TOGGLE_HERO', { heroId });
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId: state.completedDungeonIds.includes('physical') ? 'supernatural' : 'physical' });
  return accepted(state, 'DEPART');
}
canonicalCase('UT-029', 'voluntary retreat requires at least three living heroes even with automatic formation', () => {
  for (const count of [3, 2, 1]) {
    const state = threshold(rosterFixture(heroes.slice(0, 8 - count)));
    assert.equal(rules.playerView(state).canRetreat, count === 3);
    const result = act(state, 'REQUEST_RETREAT');
    assert.equal(result.ok, count === 3);
    if (count === 3) assert.equal(result.state.phase, 'retreat_confirmation');
    else { assert.equal(result.error.code, 'retreat_unavailable'); assert.deepEqual(result.state, state); }
  }
});
canonicalCase('UT-030', 'confirmed retreat preserves deaths, assignments and greatest progress across renewed attempts', () => {
  const before = interrupted();
  assert.equal(before.position, 3); assert.equal(before.progress.physical, 2);
  const returned = accepted(accepted(before, 'REQUEST_RETREAT'), 'CONFIRM_RETREAT');
  assert.equal(returned.phase, 'formation'); assert.equal(returned.position, null); assert.equal(returned.dungeonId, null);
  for (const key of ['deadHeroIds', 'deathLocations', 'assignments', 'progress', 'rngState']) assert.deepEqual(returned[key], before[key], key);
  assert.deepEqual(returned.presentedDeathIds, ['H1', 'H2']);
  let state = returned;
  for (const heroId of ['H4', 'H5']) state = accepted(state, 'TOGGLE_HERO', { heroId });
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId: 'supernatural' });
  state = accepted(state, 'DEPART');
  assert.equal(state.position, 1); assert.deepEqual(state.assignments, before.assignments); assert.deepEqual(state.progress, before.progress);
  state = accepted(accepted(state, 'REQUEST_RETREAT'), 'CONFIRM_RETREAT');
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId: 'physical' });
  state = accepted(state, 'DEPART');
  assert.equal(state.position, 1); assert.deepEqual(state.assignments, before.assignments); assert.deepEqual(state.progress, before.progress);
});
canonicalCase('UT-031', 'retreat cancellation restores each exact allowed cursor and rejects repeated cancellation', () => {
  const entry = threshold();
  const revealed = accepted(finishReading(entry), 'ENTER_DUNGEON');
  const choice = finishReading(revealed);
  for (const before of [entry, revealed, choice]) {
    const pending = accepted(before, 'REQUEST_RETREAT');
    assert.deepEqual(pending.retreatReturn, { phase: before.phase, reading: before.reading });
    const after = accepted(pending, 'CANCEL_RETREAT');
    const { sequence: aSequence, history: aHistory, ...a } = after;
    const { sequence: bSequence, history: bHistory, ...b } = before;
    assert.deepEqual(a, b); assert.equal(aSequence, bSequence + 2); assert.equal(aHistory.length, bHistory.length + 2);
    rejectUnchanged(after, 'CANCEL_RETREAT', {}, 'invalid_transition');
  }
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
      if(args[0]>=10 && args[0]<=17 && args[6]===0 && args[8]===60) absenceMoves.push({frame:Graphics.frameCount,args});
      return move.apply(this,args);
    };
    const update=Game_Screen.prototype.updatePictures;
    Game_Screen.prototype.updatePictures=function(){
      update.call(this);
      if(absenceMoves.length && elapsed<65) {
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
canonicalCase('IT-009', 'native return fades simultaneous new losses at fixed positions over sixty picture frames', { timeout: 90000 }, async t => {
  const { browser, before } = await beginReturn(t);
  const returned = await snapshot(browser);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.deepEqual(returned, finishReading(before));
  assert.deepEqual(returned.presentedDeathIds, ['H1', 'H2', 'H3']);
  assert.equal(returned.history.filter(action => action.passageId?.startsWith('prologue.')).length, before.history.filter(action => action.passageId?.startsWith('prologue.')).length);
  const moves = await browser.evaluate('absenceMoves');
  assert.deepEqual(moves.map(move => move.args[0]), [10, 11, 12]);
  assert.equal(new Set(moves.map(move => move.frame)).size, 1);
  assert.deepEqual(moves.map(move => move.args.slice(2, 4)), [[115, 367], [320, 396], [486, 309]]);
  await browser.waitFor('absenceFrames.length === 65');
  const frames = await browser.evaluate('absenceFrames');
  for (const frame of frames) {
    const visible = frame.pictures.filter(Boolean);
    assert.ok(visible.length === 0 || visible.length === 3);
    if (visible.length) {
      assert.equal(new Set(visible.map(picture => picture.opacity)).size, 1);
      for (const [index, picture] of visible.entries()) {
        assert.ok(Math.abs(picture.x - moves[index].args[2]) < 1e-9);
        assert.ok(Math.abs(picture.y - moves[index].args[3]) < 1e-9);
      }
    }
  }
  assert.ok(frames[28].pictures.every(picture => picture && picture.opacity > 100 && picture.opacity < 150));
  assert.deepEqual(frames[59].pictures, [null, null, null]);
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
  assert.ok(await browser.evaluate('[10,11,12].some(id=>$gameScreen.picture(id)?.opacity()>0)'), 'Interruption occurs before the native fade completes.');
  assert.equal(await browser.evaluate("$gameMessage._drylandChoices.entries.some(entry=>['H1','H2','H3'].includes(entry.heroId))"), false);
  await browser.call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 115, y: 367 });
  await browser.call('Input.dispatchMouseEvent', { type: 'mousePressed', x: 115, y: 367, button: 'left', clickCount: 1 });
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
  await browser.call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 115, y: 367, button: 'left', clickCount: 1 });
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(resolve))');
  assert.equal(await browser.evaluate('$gameMessage._drylandChoices?.kind'), 'formation');
  assert.deepEqual(await snapshot(browser), before);
  // Interrupt at the native map-transfer I/O boundary. Shared map 4 routes the
  // unchanged formation back to map 3 through its real orchestration event.
  await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();$gamePlayer.reserveTransfer(4,10,7,2,0);SceneManager.goto(Scene_Map);');
  await choices(browser, 'formation');
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.equal(await browser.evaluate('absenceMoves.length'), 3);
  assert.deepEqual(await browser.evaluate('[10,11,12].map(id=>Boolean($gameScreen.picture(id)))'), [false,false,false]);
  assert.equal(await browser.evaluate("$gameMessage._drylandChoices.entries.some(entry=>['H1','H2','H3'].includes(entry.heroId))"), false);
  assert.deepEqual(await snapshot(browser), before);
  // The accepted return already consumed these deaths in campaign truth.
  // Continue at that checkpoint shows empty places, without a second fade.
  await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  await browser.press('Enter', 13); await choices(browser, 'formation');
  assert.equal(await browser.evaluate('absenceMoves.length'), 3);
  assert.deepEqual(await browser.evaluate('[10,11,12].map(id=>Boolean($gameScreen.picture(id)))'), [false,false,false]);
  assert.deepEqual(await snapshot(browser), before);
});
canonicalCase('IT-011', 'native reduced motion immediately removes new losses while roster text preserves them', { timeout: 90000 }, async t => {
  const { browser, before } = await beginReturn(t, true);
  assert.deepEqual(await snapshot(browser), finishReading(before));
  assert.equal(await browser.evaluate('absenceMoves.length'), 0);
  assert.deepEqual(await browser.evaluate('[10,11,12].map(id=>Boolean($gameScreen.picture(id)))'), [false,false,false]);
  const index = await browser.evaluate("$gameMessage._drylandChoices.entries.findIndex(entry=>entry.branch===2)");
  await activate(browser, 'formation', index); await choices(browser, 'roster');
  const panel = await browser.evaluate('$gameScreen.getPictureTextData(71)');
  for (const name of ['Gorvak', 'Elowen', 'Griznik']) assert.ok(JSON.stringify(panel).includes(`${name} — Morto`), name);
  await browser.screenshot(`${evidence('IT-011')}/reduced-motion-roster.png`);
});
canonicalCase('IT-013', 'native retreat cancellation restores choices, confirmation returns safely and commitment removes retreat', { timeout: 120000 }, async t => {
  const browser = await tavern(t), before = interrupted();
  await installRoute(browser, before); await choices(browser, 'approaches');
  await activate(browser, 'approaches', 4); await choices(browser, 'retreat');
  await activate(browser, 'retreat', 1); await choices(browser, 'approaches');
  const cancelled = await snapshot(browser);
  assert.equal(cancelled.phase, before.phase);
  for (const key of ['assignments','progress','rngState','deadHeroIds','deathLocations','reading']) assert.deepEqual(cancelled[key], before[key], key);
  await activate(browser, 'approaches', 4); await choices(browser, 'retreat');
  await activate(browser, 'retreat', 0); await choices(browser, 'formation');
  const returned = await snapshot(browser);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.equal(returned.position, null);
  for (const key of ['assignments','progress','rngState','deadHeroIds','deathLocations']) assert.deepEqual(returned[key], before[key], key);
  assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file0').then(contents=>contents.system._dryland.campaign)"), returned);
  await installRoute(browser, before); await choices(browser, 'approaches');
  await activate(browser, 'approaches', 0); await pause(browser);
  const committed = await snapshot(browser);
  assert.equal(committed.phase, 'approach_result');
  assert.equal(await browser.evaluate('Boolean($gameScreen.picture(42))'), false);
  await browser.evaluate("(()=>{const i=new Game_Interpreter();PluginManager.callCommand(i,'Dryland_EventBridge','CaptureContext',{});PluginManager.callCommand(i,'Dryland_EventBridge','Action',{action:'REQUEST_RETREAT',value:''});})()");
  assert.equal(await browser.evaluate('$gameVariables.value(24)'), 'retreat_unavailable');
  assert.deepEqual(await snapshot(browser), committed);
});
