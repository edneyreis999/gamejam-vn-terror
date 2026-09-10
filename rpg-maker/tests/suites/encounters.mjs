// IN: independent matrix, real domain transitions and real MZ/Chrome inputs.
// OUT: staged sacrifice, semantic saving and later discovery/ending surfaces.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, activate, catalog, choices, formation, heroes, pause, rules, tavern } from '../helpers/formation.mjs';
const gdd = JSON.parse(await readFile(new URL('../fixtures/gdd-competencies.json', import.meta.url), 'utf8'));
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-04/${id}`;
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
function accepted(state, type, fields = {}) {
  const result = act(state, type, fields);
  assert.equal(result.ok, true, JSON.stringify(result.error));
  assert.deepEqual(rules.validateState(result.state), { ok: true, violations: [] });
  return result.state;
}
function complete(state) { return accepted(state, 'COMPLETE_PASSAGE', { passageId: state.reading.passageIds[state.reading.index] }); }
function readAll(state) { while (state.reading) state = complete(state); return state; }
function depart(state = formation(), dungeonId = 'physical', party = ['H1', 'H2', 'H3']) {
  for (const id of state.draftPartyIds) if (!party.includes(id)) state = accepted(state, 'TOGGLE_HERO', { heroId: id });
  for (const id of party) if (!state.draftPartyIds.includes(id)) state = accepted(state, 'TOGGLE_HERO', { heroId: id });
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId });
  return readAll(accepted(state, 'DEPART'));
}
function encounterFixture(id, party = ['H1', 'H2', 'H3']) {
  const state = structuredClone(depart(formation(), id[0] === 'A' ? 'physical' : 'supernatural', party));
  state.assignments[state.dungeonId][0] = id;
  state.phase = 'encounter_choice';
  assert.equal(rules.validateState(state).ok, true);
  return state;
}
function rejected(state, type, fields, code) {
  const before = structuredClone(state), result = act(state, type, fields);
  assert.equal(result.ok, false);
  assert.equal(result.error.code, code);
  assert.deepEqual(result.state, before);
  assert.deepEqual(state, before);
  assert.deepEqual(result.effects, []);
}
canonicalCase('UT-003', 'Mulberry32 preserves the independent seed-zero vector', () => {
  assert.deepEqual(rules.mulberry32Step(0), { state: 1831565813, value: 0.26642920868471265 });
});
canonicalCase('UT-004', 'BEGIN accepts only unsigned 32-bit integer seeds', () => {
  for (const seed of [-1, 4294967296, 1.5, '1']) rejected(rules.createReadyState(), 'BEGIN', { seed }, 'invalid_seed');
  for (const seed of [0, 4294967295]) assert.equal(accepted(rules.createReadyState(), 'BEGIN', { seed }).seed, seed);
});
canonicalCase('UT-005', 'first reveal assigns only the current position, without increasing progress', () => {
  const before = depart(formation(0));
  const after = accepted(before, 'ENTER_DUNGEON');
  assert.deepEqual(after.assignments.physical, ['A3', null, null, null, null]);
  assert.deepEqual(after.assignments.supernatural, Array(5).fill(null));
  assert.deepEqual(after.assignments.final, Array(6).fill(null));
  assert.equal(after.rngState, 1831565813);
  assert.equal(after.progress.physical, 0);
});
canonicalCase('UT-006', 'real retreat/departure/reveal transitions reuse the saved position and RNG', () => {
  const first = accepted(depart(), 'ENTER_DUNGEON');
  let state = accepted(first, 'REQUEST_RETREAT');
  state = accepted(state, 'CONFIRM_RETREAT');
  state = accepted(depart(state), 'ENTER_DUNGEON');
  assert.deepEqual(state.assignments, first.assignments);
  assert.equal(state.rngState, first.rngState);
  assert.equal(state.progress.physical, 0);
});
canonicalCase('UT-007', 'the final route consumes exactly the three leftovers from each initial pool', () => {
  let state = formation(0);
  for (const route of ['physical', 'supernatural']) {
    state = depart(state, route);
    for (let position = 1; position <= 5; position++) {
      state = complete(accepted(state, 'ENTER_DUNGEON'));
      const id = state.assignments[route][position - 1];
      const index = gdd.encounterPairs[id].findIndex(competency => state.partyIds.some(hero => gdd.heroPairs[hero].includes(competency)));
      state = complete(accepted(state, 'CHOOSE_APPROACH', { approachId: `${id}-${index + 1}` }));
    }
    state = readAll(state);
    assert.equal(state.phase, 'formation');
  }
  const candidates = rules.deriveFinalCandidates(state.assignments);
  assert.equal(candidates.length, 6);
  for (const pool of ['A', 'B']) assert.equal(candidates.filter(id => id[0] === pool).length, 3);
  state = depart(state, 'final');
  for (let position = 1; position <= 6; position++) {
    state = complete(accepted(state, 'ENTER_DUNGEON'));
    const id = state.assignments.final[position - 1];
    const index = gdd.encounterPairs[id].findIndex(competency => state.partyIds.some(hero => gdd.heroPairs[hero].includes(competency)));
    state = complete(accepted(state, 'CHOOSE_APPROACH', { approachId: `${id}-${index + 1}` }));
  }
  assert.deepEqual([...state.assignments.final].sort(), [...candidates].sort());
  assert.equal(new Set(Object.values(state.assignments).flat()).size, 16);
  assert.equal(state.phase, 'council');
});
canonicalCase('UT-016', 'all 48 approaches follow independent provider sets for every three-hero party', () => {
  let checked = 0;
  for (const [id, competencies] of Object.entries(gdd.encounterPairs)) {
    for (let a = 0; a < 6; a++) for (let b = a + 1; b < 7; b++) for (let c = b + 1; c < 8; c++) {
      const party = [heroes[a], heroes[b], heroes[c]], state = encounterFixture(id, party);
      for (const [index, competency] of competencies.entries()) {
        const outcome = accepted(state, 'CHOOSE_APPROACH', { approachId: `${id}-${index + 1}` });
        assert.equal(outcome.pendingOutcome.success, party.some(hero => gdd.heroPairs[hero].includes(competency)), `${id}-${index + 1} ${party}`);
        assert.equal(outcome.rngState, state.rngState);
        checked++;
      }
    }
  }
  assert.equal(checked, 48 * 56);
});
canonicalCase('UT-018', 'a zero-viability party still receives all three choices and fails each approach', () => {
  const state = encounterFixture('A1', ['H4', 'H7', 'H8']);
  assert.equal(rules.playerView(state).currentEncounter.approachIds.length, 3);
  for (let index = 1; index <= 3; index++) assert.equal(accepted(state, 'CHOOSE_APPROACH', { approachId: `A1-${index}` }).pendingOutcome.success, false);
});
canonicalCase('UT-019', 'an approach from another encounter cannot commit an outcome', () => {
  rejected(encounterFixture('A1'), 'CHOOSE_APPROACH', { approachId: 'B1-1' }, 'invalid_approach');
});
canonicalCase('UT-020', 'retreat is unavailable after committing either outcome', () => {
  for (const party of [['H1', 'H2', 'H3'], ['H4', 'H7', 'H8']]) {
    rejected(accepted(encounterFixture('A1', party), 'CHOOSE_APPROACH', { approachId: 'A1-1' }), 'REQUEST_RETREAT', {}, 'retreat_unavailable');
  }
});
canonicalCase('UT-037', 'seen-text skipping stops before the first unseen passage or a choice', () => {
  const state = structuredClone(accepted(rules.createReadyState(), 'BEGIN', { seed: 0 }));
  state.seenPassageIds = ['prologue.01', 'prologue.02'];
  const skipped = accepted(state, 'SKIP_SEEN_TEXT');
  assert.equal(skipped.reading.index, 2);
  assert.equal(skipped.reading.passageIds[2], 'irati.01');
  assert.deepEqual(skipped.seenPassageIds, state.seenPassageIds);
  state.seenPassageIds.push('irati.01');
  assert.equal(accepted(state, 'SKIP_SEEN_TEXT').phase, 'formation');
});
canonicalCase('UT-038', 'unseen text cannot be skipped', () => {
  rejected(accepted(rules.createReadyState(), 'BEGIN', { seed: 0 }), 'SKIP_SEEN_TEXT', {}, 'text_not_seen');
});
canonicalCase('UT-055', 'only the current passage can record completion', () => {
  const intro = accepted(rules.createReadyState(), 'BEGIN', { seed: 0 });
  const completed = readAll(intro);
  assert.deepEqual(completed.seenPassageIds, intro.reading.passageIds);
  assert.deepEqual(intro.seenPassageIds, []);
  rejected(accepted(rules.createReadyState(), 'BEGIN', { seed: 0 }), 'COMPLETE_PASSAGE', { passageId: 'prologue.02' }, 'invalid_transition');
});

async function nativeEncounter(t) {
  const browser = await tavern(t);
  await browser.evaluate(`window.nativeSaveCalls = []; const nativeSave = DataManager.saveGame; DataManager.saveGame = function(id) { nativeSaveCalls.push(id); return nativeSave.call(this,id); }`);
  for (let index = 0; index < 3; index++) {
    await activate(browser, 'formation', index);
    await activate(browser, 'hero', 1);
    await pause(browser);
    await browser.press('Enter', 13);
    await choices(browser, 'formation');
  }
  await activate(browser, 'formation', 8);
  await activate(browser, 'destinations', 0);
  await activate(browser, 'formation', 10);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'dungeon_intro' && $gameMessage.hasText() && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0");
  await browser.press('Enter', 13);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'encounter_intro' && $gameMap.mapId() >= 7 && $gameMap.mapId() <= 14 && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0 && !SceneManager._scene.isBusy()");
  return browser;
}
async function frames(browser, count = 4) {
  await browser.evaluate(`new Promise(resolve => { let count = ${count}; function frame() { if (--count <= 0) resolve(); else requestAnimationFrame(frame); } requestAnimationFrame(frame); })`);
}
canonicalCase('IT-005', 'real transfer and final-description held/double input never commit a newly opened approach', { timeout: 90000 }, async t => {
  const browser = await nativeEncounter(t);
  const before = await snapshot(browser), id = before.assignments.physical[0];
  assert.equal(await browser.evaluate('$gameMap.mapId()'), Number(id.slice(1)) + 6);
  assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), `Dryland_Encounter_${id}`);
  await browser.call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await frames(browser, 20);
  const after = await snapshot(browser);
  assert.equal(after.phase, 'encounter_choice');
  assert.equal(after.pendingOutcome, null);
  assert.equal(after.rngState, before.rngState);
  assert.deepEqual(after.assignments, before.assignments);
  await browser.call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await choices(browser, 'approaches');
  assert.equal(await browser.evaluate('$gameMessage._drylandChoices.entries.filter(entry => /^A[1-8]-[1-3]$/.test(entry.value)).length'), 3);
  await browser.screenshot(`${evidence('IT-005')}/approaches.png`);
  // Restore the same native pre-description input to exercise the mouse boundary.
  await browser.evaluate(`$gameSystem._dryland.campaign = ${JSON.stringify(before)}; $gameMap._interpreter.clear(); $gameMessage.clear(); SceneManager.goto(Scene_Map);`);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'encounter_intro' && $gameMessage.hasText() && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0 && !SceneManager._scene.isBusy()");
  for (const clickCount of [1, 2]) {
    await browser.call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', x: 640, y: 605, clickCount });
    await frames(browser, 2);
    await browser.call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', x: 640, y: 605, clickCount });
    await frames(browser, 2);
  }
  await choices(browser, 'approaches');
  assert.equal((await snapshot(browser)).phase, 'encounter_choice');
  assert.equal((await snapshot(browser)).pendingOutcome, null);
  assert.deepEqual(await browser.evaluate('nativeSaveCalls'), [0, 0], 'Only departure and reveal save; transfer and closing input add no write.');
});
canonicalCase('IT-049', 'repeated native rereading is observational and restores the same choices and focus', { timeout: 90000 }, async t => {
  const browser = await nativeEncounter(t);
  const description = await browser.evaluate('$gameMessage.allText()');
  await browser.press('Enter', 13);
  await choices(browser, 'approaches');
  const before = await snapshot(browser), labels = await browser.evaluate('$gameMessage.choices()');
  for (let repeat = 0; repeat < 3; repeat++) {
    await activate(browser, 'approaches', 3);
    await pause(browser);
    assert.equal(await browser.evaluate('$gameMessage.allText()'), description);
    assert.deepEqual(await snapshot(browser), before);
    assert.equal(await browser.evaluate('$gameScreen.picture(18) == null'), true);
    await browser.press('Enter', 13);
    await choices(browser, 'approaches');
    assert.deepEqual(await browser.evaluate('$gameMessage.choices()'), labels);
    assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'), 3);
    assert.deepEqual(await snapshot(browser), before);
  }
  assert.deepEqual(await browser.evaluate('nativeSaveCalls'), [0, 0], 'Repeated rereading adds no write after departure/reveal.');
  await browser.screenshot(`${evidence('IT-049')}/restored-choices.png`);
  await activate(browser, 'approaches', 0);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'approach_result' && $gameMessage.hasText()");
  assert.equal(await browser.evaluate('$gameScreen.picture(41) == null && $gameScreen.picture(42) == null'), true);
  assert.equal(await browser.evaluate("$gameMessage._drylandChoices?.entries.some(entry => entry.value === 'reread') || false"), false);
});
canonicalCase('IT-051', 'success uses native text on the same encounter artwork with no hero or success illustration', { timeout: 90000 }, async t => {
  const browser = await nativeEncounter(t);
  const before = await snapshot(browser), background = await browser.evaluate('$gameScreen.picture(1).name()');
  await browser.press('Enter', 13);
  await activate(browser, 'approaches', 0);
  await browser.waitFor("$gameSystem._dryland.campaign.phase === 'approach_result' && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0");
  assert.equal((await snapshot(browser)).pendingOutcome.success, true);
  assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), background);
  assert.equal(await browser.evaluate('Array.from({length:12}, (_,i)=>$gameScreen.picture(10+i)).some(Boolean)'), false);
  assert.equal(await browser.evaluate('$gameScreen.picture(41) == null && $gameScreen.picture(42) == null'), true);
  assert.ok(await browser.evaluate('$gameMessage.allText().length > 10'));
  await browser.screenshot(`${evidence('IT-051')}/native-success.png`);
  await browser.press('Enter', 13);
  await browser.waitFor("$gameSystem._dryland.campaign.position === 2 && $gameSystem._dryland.campaign.phase === 'encounter_intro'");
  const after = await snapshot(browser);
  assert.equal(after.progress.physical, 1);
  assert.equal(after.assignments.physical[0], before.assignments.physical[0]);
  assert.equal(after.assignments.physical.filter(Boolean).length, 2);
  assert.deepEqual(rules.validateState(after), { ok: true, violations: [] });
});
