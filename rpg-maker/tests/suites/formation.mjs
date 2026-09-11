// IN: independent GDD transcription, pure rules, real MZ/vendor windows in Chrome.
// OUT: complete death/retreat journeys; roster/progress boundaries use explicit fixtures.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, activate, CatalogError, catalog, choices, createRules, events, formation, heroes, installFixture, pause, rosterFixture, rules, tavern } from '../helpers/formation.mjs';

const gdd = JSON.parse(await readFile(new URL('../fixtures/gdd-competencies.json', import.meta.url), 'utf8'));
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-03/${id}`;
function selected(ids = ['H1', 'H2', 'H3']) {
  return ids.reduce((state, heroId) => act(state, 'TOGGLE_HERO', { heroId }).state, formation());
}
function rejected(state, type, fields, code) {
  const before = structuredClone(state);
  const result = act(state, type, fields);
  assert.equal(result.ok, false);
  assert.equal(result.error.code, code);
  assert.deepEqual(result.state, before);
  assert.deepEqual(state, before);
  assert.deepEqual(result.effects, []);
}
canonicalCase('UT-001', 'the native catalog matches the independent GDD transcription, including all 48 approaches', () => {
  assert.equal(Object.keys(gdd.heroPairs).length, 8);
  assert.equal(Object.keys(gdd.encounterPairs).length, 16);
  assert.deepEqual(Object.fromEntries(Object.values(catalog.heroes).map(hero => [hero.id, hero.competencyIds])), gdd.heroPairs);
  assert.deepEqual(Object.fromEntries(Object.values(catalog.encounters).map(encounter => [encounter.id, encounter.approaches.map(approach => approach.competencyId)])), gdd.encounterPairs);
  assert.equal(Object.values(gdd.encounterPairs).flat().length, 48);
  assert.doesNotThrow(() => createRules(catalog));
});
canonicalCase('UT-002', 'corrupt canonical pairs reject construction before a campaign starts', () => {
  for (const pair of [['strength', 'strength'], ['strength', 'unknown'], ['will', 'survival']]) {
    const input = structuredClone(catalog);
    input.heroes.H1.competencyIds = pair;
    assert.throws(() => createRules(input), CatalogError);
  }
  const swapped = structuredClone(catalog);
  [swapped.encounters.A1.approaches[2].competencyId, swapped.encounters.A2.approaches[2].competencyId] =
    [swapped.encounters.A2.approaches[2].competencyId, swapped.encounters.A1.approaches[2].competencyId];
  assert.throws(() => createRules(swapped), CatalogError);
  for (const id of ['threshold.physical', 'threshold.supernatural', 'threshold.final']) {
    const missing = structuredClone(catalog);
    delete missing.scenes[id];
    assert.throws(() => createRules(missing), CatalogError);
  }
});
canonicalCase('UT-008', 'one through three survivors are mandatory; four through eight require three selected heroes', () => {
  for (let count = 1; count <= 8; count++) {
    const state = rosterFixture(heroes.slice(count));
    const result = rules.deriveFormation(state);
    assert.equal(result.automatic, count <= 3);
    assert.equal(result.required, Math.min(count, 3));
    assert.deepEqual(result.livingHeroIds, heroes.slice(0, count));
    assert.deepEqual(result.selectedHeroIds, count <= 3 ? heroes.slice(0, count) : []);
  }
});
canonicalCase('UT-009', 'manual toggles alter only membership and the accepted action journal', () => {
  const initial = formation();
  const added = act(initial, 'TOGGLE_HERO', { heroId: 'H1' });
  assert.equal(added.ok, true);
  assert.deepEqual(added.state.draftPartyIds, ['H1']);
  const removed = act(added.state, 'TOGGLE_HERO', { heroId: 'H1' });
  assert.equal(removed.ok, true);
  assert.deepEqual(removed.state, { ...initial, sequence: initial.sequence + 2, history: removed.state.history });
});
canonicalCase('UT-010', 'a fourth member is rejected without replacing anyone or consuming RNG', () => {
  rejected(selected(), 'TOGGLE_HERO', { heroId: 'H4' }, 'invalid_party_size');
});
canonicalCase('UT-011', 'unknown/dead members and removal from automatic formation are rejected', () => {
  rejected(formation(), 'TOGGLE_HERO', { heroId: 'H9' }, 'invalid_hero');
  rejected(rosterFixture(['H1']), 'TOGGLE_HERO', { heroId: 'H1' }, 'invalid_hero');
  rejected(rosterFixture(heroes.slice(3)), 'TOGGLE_HERO', { heroId: 'H1' }, 'formation_locked');
});
canonicalCase('UT-012', 'unknown destinations preserve the campaign', () => {
  rejected(formation(), 'SELECT_DESTINATION', { dungeonId: 'missing' }, 'invalid_destination');
});
canonicalCase('UT-013', 'locked final and completed routes cannot be selected', () => {
  rejected(formation(), 'SELECT_DESTINATION', { dungeonId: 'final' }, 'destination_unavailable');
  const complete = rosterFixture(heroes.slice(3));
  rejected(complete, 'SELECT_DESTINATION', { dungeonId: 'physical' }, 'destination_unavailable');
});
canonicalCase('UT-014', 'departure requires a destination and exactly three manual members', () => {
  rejected(selected(), 'DEPART', {}, 'destination_required');
  const state = act(selected(['H1', 'H2']), 'SELECT_DESTINATION', { dungeonId: 'physical' }).state;
  rejected(state, 'DEPART', {}, 'invalid_party_size');
});
canonicalCase('UT-015', 'departure carries the selected living heroes and consumes no protagonist slot', () => {
  const state = act(selected(), 'SELECT_DESTINATION', { dungeonId: 'physical' }).state;
  const departure = act(state, 'DEPART');
  assert.equal(departure.ok, true);
  assert.equal(departure.state.phase, 'dungeon_intro');
  assert.equal(departure.state.dungeonId, 'physical');
  assert.deepEqual(departure.state.partyIds, ['H1', 'H2', 'H3']);
  assert.equal(departure.state.rngState, state.rngState);
  assert.equal(rules.validateState(departure.state).ok, true);
});
canonicalCase('UT-017', 'public projections exclude private competencies, viability and pool labels', () => {
  const state = selected();
  const before = structuredClone(state);
  const view = rules.playerView(state);
  assert.equal(view.heroes[0].name, 'Gorvak');
  const text = JSON.stringify(view);
  for (const secret of [...Object.keys(catalog.competencies), 'competencyId', 'viable', 'viability', '"pool"', '"A"', '"B"']) assert.ok(!text.includes(secret), secret);
  assert.deepEqual(state, before);
});
canonicalCase('UT-059', 'stock actor membership and HP cannot change campaign life or competency results', { timeout: 60000 }, async t => {
  const browser = await tavern(t);
  const state = await snapshot(browser);
  const viability = rules.deriveViability(['H1', 'H2', 'H3'], 'A1');
  await browser.evaluate('$gameParty.addActor(1); $gameActors.actor(1).setHp(0)');
  assert.deepEqual(await snapshot(browser), state);
  assert.deepEqual(rules.deriveViability(['H1', 'H2', 'H3'], 'A1'), viability);
  assert.equal(await browser.evaluate('$gameActors.actor(1).hp'), 0);
});
canonicalCase('IT-002', 'native CaptureContext → Action → Observe updates only the intended hero membership', { timeout: 60000 }, async t => {
  const browser = await tavern(t);
  assert.equal(await browser.evaluate('$gameMessage.choices().length'), 11);
  const before = await snapshot(browser);
  const result = await browser.evaluate(`(() => {
    const interpreter = new Game_Interpreter();
    $gameVariables.setValue(22, 'H1');
    PluginManager.callCommand(interpreter, 'Dryland_EventBridge', 'CaptureContext', {});
    PluginManager.callCommand(interpreter, 'Dryland_EventBridge', 'Action', {action:'TOGGLE_HERO',value:'H1'});
    PluginManager.callCommand(interpreter, 'Dryland_EventBridge', 'Observe', {target:'formation'});
    return {result:$gameVariables.value(24), selected:$gameVariables.value(28), state:$gameSystem._dryland.campaign};
  })()`);
  assert.equal(result.result, 'ok');
  assert.equal(result.selected, true);
  assert.deepEqual(result.state.draftPartyIds, ['H1']);
  assert.deepEqual(result.state, { ...before, draftPartyIds: ['H1'], sequence: before.sequence + 1, history: [...before.history, { type: 'TOGGLE_HERO', sequence: before.sequence + 1, heroId: 'H1' }] });
  await browser.screenshot(`${evidence('IT-002')}/selected.png`);
});
canonicalCase('IT-006', 'rapid focus is observational; activation and the full native conversation consume distinct input', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const before = await snapshot(browser);
  const authored = await browser.evaluate('JSON.stringify($dataCommonEvents.slice(68))');
  for (const key of ['ArrowRight', 'ArrowRight', 'ArrowLeft']) await browser.press(key, key === 'ArrowRight' ? 39 : 37);
  assert.equal(await browser.evaluate('$gameVariables.value(22)'), 'H2');
  assert.deepEqual(await snapshot(browser), before);
  assert.equal(await browser.evaluate('$gameMessage.hasText()'), false);
  await activate(browser, 'formation', 0);
  await choices(browser, 'hero');
  assert.deepEqual(await browser.evaluate('$gameMessage.choices()'), ['Conversar', 'Selecionar']);
  assert.deepEqual(await snapshot(browser), before);
  await browser.press('Escape', 27);
  await choices(browser, 'formation');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'), 0);
  await activate(browser, 'formation', 0);
  await activate(browser, 'hero', 0);
  const expected = events[5].list.filter(c => c.code === 401).slice(0, 7).map(c => c.parameters[0]);
  assert.match(expected[0], /Gorvak · Ele\/dele · Anão · Ferreiro/);
  assert.equal(expected.at(-1), 'Lugar velho avisa antes de cair. Prestem atenção aos estalos.');
  for (const [index, text] of expected.entries()) {
    await browser.waitFor(`$gameMessage.allText() === ${JSON.stringify(text)} && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0 && $gameScreen.picture(60)`);
    const speaker = index === 2 || index === 4 ? 'Dryland_ivai' : 'Dryland_H1';
    assert.equal(await browser.evaluate(`$gameScreen.picture(${speaker === 'Dryland_ivai' ? 63 : 60}).name()`), speaker);
    assert.equal(await browser.evaluate('$gameScreen.picture(60).name()'), 'Dryland_H1');
    assert.equal(await browser.evaluate('Boolean($gameScreen.picture(63))'), index >= 2);
    await browser.waitFor('$gameScreen.picture(60)._duration===0');
    assert.equal(await browser.evaluate('$gameScreen.picture(60).scaleX()'),speaker==='Dryland_H1'?100:90,'uniform base with positional focus');
    if (index >= 2) assert.equal(await browser.evaluate('$gameScreen.picture(63).scaleX()'),speaker==='Dryland_ivai'?100:90,'same base for Ivaí');
    assert.equal(await browser.evaluate('$gameScreen.picture(18) == null'), true);
    if (index >= 2) {
      const listener = speaker === 'Dryland_ivai' ? 60 : 63;
      await browser.waitFor(`$gameScreen.picture(${listener}).tone().every((value, index) => value === (index === 3 ? 0 : -24))`);
      assert.deepEqual(await browser.evaluate(`$gameScreen.picture(${listener}).tone()`), [-24, -24, -24, 0]);
    }
    assert.deepEqual(await snapshot(browser), before);
    if (index === 0) await browser.screenshot(`${evidence('IT-006')}/profile.png`);
    if (index === 2) await browser.screenshot(`${evidence('IT-006')}/conversation.png`);
    await browser.press('Enter', 13);
  }
  await pause(browser);
  assert.equal(await browser.evaluate('$gameMessage.allText()'), 'Vivo/Viva · Fora do grupo');
  await browser.press('Enter', 13);
  await choices(browser, 'formation');
  assert.deepEqual(await snapshot(browser), before);
  assert.equal(await browser.evaluate('JSON.stringify($dataCommonEvents.slice(68))'), authored, 'vendor decoding must not mutate editable helper arguments');
  assert.deepEqual(browser.exceptions, []);
});
canonicalCase('IT-007', 'native selection, removal, full-party feedback and mandatory automatic rosters obey their gates', { timeout: 180000 }, async t => {
  const browser = await tavern(t);
  for (let hero = 0; hero < 3; hero++) {
    await activate(browser, 'formation', hero);
    await activate(browser, 'hero', 1);
    await pause(browser);
    assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'), `Dryland_H${hero + 1}`);
    assert.deepEqual((await snapshot(browser)).draftPartyIds, heroes.slice(0, hero + 1));
    assert.equal(await browser.evaluate('$gameMessage.allText()'), events[5 + hero].list.filter(c => c.code === 401).at(-2).parameters[0]);
    const accepted = await snapshot(browser);
    await browser.press('Enter', 13);
    await choices(browser, 'formation');
    assert.deepEqual(await snapshot(browser), accepted);
  }
  const full = await snapshot(browser);
  await activate(browser, 'formation', 3);
  await activate(browser, 'hero', 1);
  await pause(browser);
  assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'), 'Dryland_H4');
  assert.equal(await browser.evaluate('$gameMessage.allText()'), events[8].list.filter(c => c.code === 401).at(-1).parameters[0]);
  assert.deepEqual(await snapshot(browser), full);
  await browser.screenshot(`${evidence('IT-007')}/full-party.png`);
  await browser.press('Enter', 13);
  await choices(browser, 'formation');
  assert.deepEqual(await snapshot(browser), full);
  await activate(browser, 'formation', 0);
  await choices(browser, 'hero');
  assert.deepEqual(await browser.evaluate('$gameMessage.choices()'), ['Conversar', 'Retirar do grupo']);
  await activate(browser, 'hero', 1);
  await choices(browser, 'formation');
  assert.deepEqual((await snapshot(browser)).draftPartyIds, ['H2', 'H3']);
  assert.equal(await browser.evaluate('Boolean($gameVariables.value(25))'), false);
  assert.equal(await browser.evaluate('$gameMessage.hasText()'), false);
  for (const count of [4, 3, 2, 1]) {
    const fixture = rosterFixture(heroes.slice(count));
    fixture.selectedDungeonId = 'supernatural';
    if (count === 4) fixture.draftPartyIds = ['H1', 'H2', 'H3'];
    await installFixture(browser, fixture);
    assert.equal(await browser.evaluate('$gameVariables.value(25)'), true);
    await activate(browser, 'formation', 0);
    await choices(browser, 'hero');
    assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.isCommandEnabled(1)'), count === 4);
    if (count <= 3) {
      const before = await snapshot(browser);
      await activate(browser, 'hero', 1);
      await choices(browser, 'hero');
      assert.deepEqual(await snapshot(browser), before);
      await browser.press('Escape', 27);
      await choices(browser, 'formation');
    } else {
      await activate(browser, 'hero', 1);
      await choices(browser, 'formation');
      assert.equal(await browser.evaluate('Boolean($gameVariables.value(25))'), false);
    }
  }
});
canonicalCase('IT-008', 'destination choice/cancellation preserve membership and return to the tavern', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const before = await snapshot(browser);
  await activate(browser, 'formation', 8);
  await choices(browser, 'destinations');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.isCommandEnabled(2)'), false);
  assert.deepEqual(await browser.evaluate('[72,73,74].map(id => $gameScreen.picture(id).name())'),
    ['Dryland_Destination_physical', 'Dryland_Destination_supernatural', 'Dryland_Destination_final']);
  const panelText = (await browser.evaluate('[75,76,77].map(id => $gameScreen.getPictureTextData(id).upperleft)')).join(' ').replace(/\s+/g, ' ');
  for (const phrase of ['igreja tomada pela mata', 'uma figueira', 'duas peças']) assert.ok(panelText.includes(phrase), phrase);
  await browser.screenshot(`${evidence('IT-008')}/destinations.png`);
  await browser.press('Escape', 27);
  await choices(browser, 'formation');
  assert.deepEqual(await snapshot(browser), before);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'), 8);
  await activate(browser, 'formation', 8);
  await activate(browser, 'destinations', 0);
  await choices(browser, 'formation');
  const after = await snapshot(browser);
  assert.equal(after.selectedDungeonId, 'physical');
  assert.deepEqual(after.draftPartyIds, before.draftPartyIds);
  assert.equal(after.rngState, before.rngState);
  assert.ok((await browser.evaluate('$gameScreen.getPictureTextData(44).center')).includes('Caminho da Igreja'));
  assert.equal(await browser.evaluate('$gameScreen.picture(71) == null'), true);
  assert.equal(await browser.evaluate('Boolean($gameVariables.value(25))'), false);
});
canonicalCase('IT-041', 'prepared retreat/revisit inputs display traversed progress without counting the newly revealed position', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const fixture = structuredClone(formation());
  fixture.assignments.physical = ['A1', 'A2', 'A3', null, null];
  fixture.progress.physical = 2;
  await installFixture(browser, fixture);
  await activate(browser, 'formation', 8);
  await choices(browser, 'destinations');
  assert.deepEqual(rules.playerView(await snapshot(browser)).destinations.physical.landmarks, { traversed: 2, total: 5 });
  assert.ok((await browser.evaluate('$gameScreen.getPictureTextData(78).center')).includes('2/5'));
  await browser.screenshot(`${evidence('IT-041')}/known-progress.png`);
  await browser.press('Escape', 27);
  await choices(browser, 'formation');
  await activate(browser, 'formation', 8);
  await choices(browser, 'destinations');
  assert.deepEqual(await snapshot(browser), fixture);
  assert.deepEqual(rules.playerView(await snapshot(browser)).destinations.physical.landmarks, { traversed: 2, total: 5 });
});

canonicalCase('IT-060', 'cancelling a conversation while its required image loads cannot resurrect its pictures or text', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const before = await snapshot(browser);
  const saved = await browser.evaluate("StorageManager.loadZip('file0')");
  // Hold only the image I/O boundary; the interpreter and vendor remain real.
  await browser.evaluate(`(() => {
    const start = Bitmap.prototype._startLoading;
    Bitmap.prototype._startLoading = function() {
      if (this._url.endsWith('/Dryland_H1.png') && !window.resumeDialogueImage) {
        this._loadingState = 'loading';
        window.resumeDialogueImage = () => start.call(this);
      } else start.call(this);
    };
    delete ImageManager._cache['img/pictures/Dryland_H1.png'];
  })()`);
  await activate(browser, 'formation', 0);
  await activate(browser, 'hero', 0);
  await browser.waitFor('typeof window.resumeDialogueImage === "function"');
  assert.equal(await browser.evaluate('$gameMessage.hasText()'), false, 'unready art cannot expose readable dialogue');
  assert.equal(await browser.evaluate('$gameScreen.picture(60) == null'), true);
  assert.deepEqual(await snapshot(browser), before);
  // Explicit interruption fixture, not a directed player journey.
  await browser.evaluate('$gameMap._interpreter.clear(); SceneManager.goto(Scene_Title); window.resumeDialogueImage();');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && ImageManager.isReady()");
  assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id => !$gameScreen.picture(id))'), true);
  assert.equal(await browser.evaluate('$gameMessage.allText().includes("Gorvak")'), false);
  assert.equal(await browser.evaluate("StorageManager.loadZip('file0')"), saved);
  assert.deepEqual(browser.exceptions, []);
});
