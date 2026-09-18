// IN: independent GDD transcription, pure rules, real MZ/vendor windows in Chrome.
// OUT: complete death/retreat journeys; roster/progress boundaries use explicit fixtures.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { assertAdvanceIndicatorFits } from '../helpers/native-reading.mjs';
import { clickConsole, hidden } from '../helpers/native-shared.mjs';
import { act, activate, CatalogError, catalog, choices, createRules, events, formation, gorvakUnitTexts, heroUnitTexts, heroes, installFixture, pause, returnToTavern, rosterFixture, rules, tavern } from '../helpers/formation.mjs';

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
  for (const secret of [...new Set(Object.values(gdd.heroPairs).flat()), 'competencyId', 'viable', 'viability', '"pool"', '"A"', '"B"']) assert.ok(!text.includes(secret), secret);
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
canonicalCase('IT-002', 'native CaptureContext → Action → Query updates only the intended hero membership', { timeout: 60000 }, async t => {
  const browser = await tavern(t);
  assert.equal(await browser.evaluate('$gameMessage.choices().length'), 11);
  const before = await snapshot(browser);
  const result = await browser.evaluate(`(() => {
    const interpreter = new Game_Interpreter();
    $gameVariables.setValue(22, 'H1');
    PluginManager.callCommand(interpreter, 'Dryland_EventBridge', 'CaptureContext', {});
    PluginManager.callCommand(interpreter, 'Dryland_EventBridge', 'Action', {action:'TOGGLE_HERO',value:'H1'});
    PluginManager.callCommand(interpreter, 'Dryland_EventBridge', 'Query', {kind:'heroSelected',id:'H1',variable:'28'});
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
  for (const key of ['ArrowRight', 'ArrowRight', 'ArrowLeft']) await browser.press(key, key === 'ArrowRight' ? 39 : 37);
  assert.equal(await browser.evaluate('$gameVariables.value(22)'), 'H2');
  assert.deepEqual(await snapshot(browser), before);
  assert.equal(await browser.evaluate('$gameMessage.hasText()'), false);
  await activate(browser, 'formation', 0);
  await choices(browser, 'hero');
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 37, 'Gorvak interaction is authored by its child map');
  assert.equal(await browser.evaluate('$gameVariables.value(153)'), 'Selecionar');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.maxItems()'), 3);
  assert.deepEqual(await snapshot(browser), before);
  await browser.press('Escape', 27);
  await choices(browser, 'formation');
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'), 0);
  await activate(browser, 'formation', 0);
  await activate(browser, 'hero', 0);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 37);
  const expected = [...gorvakUnitTexts(82), ...gorvakUnitTexts(83)];
  assert.match(expected[0], /Gorvak · Ele\/dele · Anão · Ferreiro/);
  assert.equal(expected.at(-1), 'Lugar velho avisa antes de cair. Prestem atenção aos estalos.');
  for (const [index, text] of expected.entries()) {
    await browser.waitFor(`$gameMessage.allText() === ${JSON.stringify(text)} && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0 && $gameScreen.picture(60)`);
    const speaker = index === 2 || index === 4 ? 'Dryland_ivai' : 'Dryland_H1';
    assert.equal(await browser.evaluate(`$gameScreen.picture(${speaker === 'Dryland_ivai' ? 63 : 60}).name()`), speaker);
    assert.equal(await browser.evaluate('$gameScreen.picture(60).name()'), 'Dryland_H1');
    assert.equal(await browser.evaluate('Boolean($gameScreen.picture(63))'), index >= 2);
    await browser.waitFor('$gameScreen.picture(60)._duration===0');
    assert.equal(await browser.evaluate('$gameScreen.picture(60).scaleX()'),speaker==='Dryland_H1'?34:32,'map-authored Gorvak scale and subsequent native focus');
    if (index >= 2) assert.equal(await browser.evaluate('$gameScreen.picture(63).scaleX()'),speaker==='Dryland_ivai'?44:42,'map-authored Ivaí focus');
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
  await choices(browser, 'hero');
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 37, 'Conversation returns to the Gorvak menu before the player leaves it');
  assert.equal(await browser.evaluate('$gameScreen.picture(63) == null'), true, 'Ivaí is removed before the hero menu is shown again');
  await returnToTavern(browser);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 3);
  assert.deepEqual(await snapshot(browser), before);
  assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'), [82,83], 'only completed native profile and conversation units were read');
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
    const expected = heroUnitTexts(84 + hero * 4)[0];
    assert.equal(await browser.evaluate('$gameMessage.allText()'), expected);
    const accepted = await snapshot(browser);
    await browser.press('Enter', 13);
    await returnToTavern(browser);
    assert.deepEqual(await snapshot(browser), accepted);
  }
  const full = await snapshot(browser);
  await activate(browser, 'formation', 3);
  await activate(browser, 'hero', 1);
  await pause(browser);
  assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'), 'Dryland_H4');
  assert.equal(await browser.evaluate('$gameMessage.allText()'), heroUnitTexts(97)[0]);
  assert.deepEqual(await snapshot(browser), full);
  await browser.screenshot(`${evidence('IT-007')}/full-party.png`);
  await browser.press('Enter', 13);
  await returnToTavern(browser);
  assert.deepEqual(await snapshot(browser), full);
  await activate(browser, 'formation', 0);
  await choices(browser, 'hero');
  assert.equal(await browser.evaluate('$gameVariables.value(153)'), 'Retirar do grupo');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.maxItems()'), 3);
  await activate(browser, 'hero', 1);
  await returnToTavern(browser);
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
      await returnToTavern(browser);
      assert.equal(await browser.evaluate('Boolean($gameVariables.value(25))'), false);
    }
  }
});

// INVARIANT: each migrated visit owns its text/read identity and preserves native
// controls and membership gates. IN: real MZ/providers; OUT: human framing approval.
canonicalCase('IT-081', 'All eight heroes retain independent reading and formation behavior in their maps', { timeout: 600000 }, async t => {
  const browser = await tavern(t);
  for (const reduced of [false, true]) {
    await browser.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
    await browser.call('Emulation.setDeviceMetricsOverride', { width: reduced ? 1920 : 1280, height: reduced ? 1080 : 720, deviceScaleFactor: 1, mobile: false });
    for (const heroIndex of [0, 1, 2, 3, 4, 5, 6, 7]) {
      const heroId = heroes[heroIndex], mapId = 37 + heroIndex, unit = 82 + heroIndex * 4;
      await installFixture(browser, formation());
      const before = await snapshot(browser);
      await activate(browser, 'formation', heroIndex);
      await choices(browser, 'hero');
      assert.equal(await browser.evaluate('$gameMap.mapId()'), mapId);
      await browser.screenshot(`${evidence('IT-081')}/${heroId}-${reduced ? 'reduced' : 'normal'}-menu.png`);
      await activate(browser, 'hero', 0);
      const expected = [...heroUnitTexts(unit), ...heroUnitTexts(unit + 1)];
      assert.equal(expected.length, 7);
      for (const [index, text] of expected.entries()) {
        await browser.waitFor(`$gameMessage.allText() === ${JSON.stringify(text)} && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0`);
        await assertAdvanceIndicatorFits(browser);
        if (index === 1) await browser.screenshot(`${evidence('IT-081')}/${heroId}-${reduced ? 'reduced' : 'normal'}-description.png`);
        assert.equal(await browser.evaluate('$gameScreen.picture(60).name()'), `Dryland_${heroId}`);
        assert.equal(await browser.evaluate('Boolean($gameScreen.picture(63))'), index >= 2);
        if (!reduced) assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${index < 2 ? unit : unit + 1})`), false, 'Partial unit remains unread');
        if (index === 2) {
          await browser.waitFor('$gameScreen.picture(60)._duration===0&&$gameScreen.picture(60)._toneDuration===0&&$gameScreen.picture(63)._duration===0');
          const pictures = await browser.evaluate('JsonEx.stringify([$gameScreen.picture(60),$gameScreen.picture(63)])');
          await browser.press('Tab', 9); await hidden(browser, true);
          await browser.press('Tab', 9); await hidden(browser, false);
          await pause(browser);
          assert.equal(await browser.evaluate('$gameMessage.allText()'), text, 'HIDE restore consumes no reading input');
          await clickConsole(browser, 'options');
          await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
          await browser.press('Escape', 27); await pause(browser);
          assert.equal(await browser.evaluate('JsonEx.stringify([$gameScreen.picture(60),$gameScreen.picture(63)])'), pictures);
          await browser.screenshot(`${evidence('IT-081')}/${heroId}-${reduced ? 'reduced' : 'normal'}-conversation.png`);
        }
        assert.deepEqual(await snapshot(browser), before);
        await browser.press('Enter', 13);
      }
      await choices(browser, 'hero');
      assert.equal(await browser.evaluate('Boolean($gameScreen.picture(63))'), false);
      assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${unit})&&$gameSystem._drylandReadUnits.includes(${unit + 1})`), true);
      await activate(browser, 'hero', 0); await pause(browser);
      assert.equal(await browser.evaluate('$gameSystem.isExtendedFastForwardDisallowed()'), false);
      await clickConsole(browser, 'fastfwd');
      await browser.waitFor(`$gameMessage.allText()===${JSON.stringify(expected[2])}&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0`);
      assert.equal(await browser.evaluate('Boolean($gameTemp.isExtendedFastForwardMode())'), false, 'The next observation unit resets FAST');
      assert.equal(await browser.evaluate('$gameSystem.isExtendedFastForwardDisallowed()'), false, 'The completed conversation remains eligible');
      await clickConsole(browser, 'fastfwd'); await choices(browser, 'hero');
      assert.equal(await browser.evaluate('Boolean($gameTemp.isExtendedFastForwardMode())'), false, 'FAST stops at the hero menu');
      await returnToTavern(browser);
      assert.deepEqual(await snapshot(browser), before);
    }
  }
  for (const heroIndex of [0, 1, 2, 3, 4, 5, 6, 7]) {
    const heroId = heroes[heroIndex], unit = 82 + heroIndex * 4;
    await installFixture(browser, formation());
    await activate(browser, 'formation', heroIndex); await activate(browser, 'hero', 1); await pause(browser);
    assert.equal(await browser.evaluate('$gameMessage.allText()'), heroUnitTexts(unit + 2)[0]);
    assert.deepEqual((await snapshot(browser)).draftPartyIds, [heroId]);
    await browser.press('Enter', 13); await choices(browser, 'hero');
    await activate(browser, 'hero', 1); await choices(browser, 'hero');
    assert.deepEqual((await snapshot(browser)).draftPartyIds, []);
    await returnToTavern(browser);
    const full = selected(heroes.filter(id => id !== heroId).slice(0, 3));
    await installFixture(browser, full);
    await activate(browser, 'formation', heroIndex); await activate(browser, 'hero', 1); await pause(browser);
    assert.equal(await browser.evaluate('$gameMessage.allText()'), heroUnitTexts(unit + 3)[0]);
    assert.deepEqual(await snapshot(browser), full);
    await browser.press('Enter', 13); await returnToTavern(browser);
    const automatic = rosterFixture(heroes.filter(id => ![heroId, ...heroes.filter(other => other !== heroId).slice(0, 2)].includes(id)));
    await installFixture(browser, automatic);
    const availableIndex = heroes.filter(id => !automatic.deadHeroIds.includes(id)).indexOf(heroId);
    await activate(browser, 'formation', availableIndex); await choices(browser, 'hero');
    assert.equal(await browser.evaluate('$gameMap.mapId()'), 37 + heroIndex);
    assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.isCommandEnabled(1)'), false);
    await activate(browser, 'hero', 1); await choices(browser, 'hero');
    assert.deepEqual(await snapshot(browser), automatic);
    await returnToTavern(browser);
  }
  assert.deepEqual(browser.exceptions, []);
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
  const destinationLabel = await browser.evaluate('SceneManager._scene._messageWindow.convertEscapeCharacters($gameScreen.getPictureTextData(44).center)');
  assert.ok(destinationLabel.replaceAll(String.fromCharCode(27) + 'WrapBreak[0]', ' ').includes('Caminho da Igreja'));
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
  assert.ok((await browser.evaluate('SceneManager._scene._messageWindow.convertEscapeCharacters($gameScreen.getPictureTextData(78).center)')).includes('2/5'));
  await browser.screenshot(`${evidence('IT-041')}/known-progress.png`);
  await browser.press('Escape', 27);
  await choices(browser, 'formation');
  await activate(browser, 'formation', 8);
  await choices(browser, 'destinations');
  assert.deepEqual(await snapshot(browser), fixture);
  assert.deepEqual(rules.playerView(await snapshot(browser)).destinations.physical.landmarks, { traversed: 2, total: 5 });
});

canonicalCase('IT-060', 'default asynchronous bust loading continues native text and cancellation cannot resurrect it', { timeout: 90000 }, async t => {
  const browser = await tavern(t);
  const before = await snapshot(browser);
  const savedFile = await browser.evaluate('$gameSystem.savefileId()');
  const saved = await browser.evaluate("StorageManager.loadZip('file'+$gameSystem.savefileId())");
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
  await browser.waitFor('$gameMessage.hasText()');
  assert.equal(await browser.evaluate("ImageManager._cache['img/pictures/Dryland_H1.png'].isReady()"), false, 'Default loading does not create a project text barrier');
  assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'), 'Dryland_H1');
  assert.deepEqual(await snapshot(browser), before);
  // Explicit interruption fixture, not a directed player journey.
  await browser.evaluate('$gameMap._interpreter.clear(); SceneManager.goto(Scene_Title); window.resumeDialogueImage();');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && ImageManager.isReady()");
  assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id => !$gameScreen.picture(id))'), true);
  assert.equal(await browser.evaluate('$gameMessage.allText().includes("Gorvak")'), false);
  assert.equal(await browser.evaluate(`StorageManager.loadZip('file${savedFile}')`), saved);
  assert.deepEqual(browser.exceptions, []);
});

canonicalCase('UT-075', 'editor declarations change public names without scene metadata or campaign mutation', async () => {
  const { readConfiguration, query } = await import('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js').then(m => m.default);
  const { createCatalog } = await import('../../The Dryland Drowned/js/plugins/Dryland_CampaignRules.js').then(m => m.default);
  const edited = structuredClone(events[4]);
  edited.list.find(c => c.parameters[1] === 'ConfigureHero').parameters[3].name = 'Gorvak editado';
  edited.list.unshift({code:108,indent:0,parameters:['Comentário livre sem metadados.']});
  const configuration = readConfiguration(edited), data = createCatalog(configuration), localRules = createRules(data);
  const state = formation(), before = JSON.stringify(state);
  assert.equal(query(localRules, data, state, 'heroName', 'H1'), 'Gorvak editado');
  assert.equal(query(localRules, data, state, 'livingCount'), 8);
  assert.equal(query(localRules, data, state, 'selectedCount'), 0);
  assert.equal(query(localRules, data, state, 'livingHero', '', 7), 'H8');
  assert.equal(query(localRules, data, state, 'candidateCount'), 0);
  assert.equal(query(localRules, data, state, 'routeStatus', 'final'), 'locked');
  assert.equal(query(localRules, data, state, 'deadCount'), 0);
  assert.equal(query(localRules, data, state, 'deathRoute', 'H1'), '');
  assert.equal(query(localRules, data, state, 'hasReading'), false);
  assert.equal(JSON.stringify(state), before);
  assert.deepEqual(readConfiguration(edited), configuration);
  assert.throws(() => query(localRules, data, state, 'notAQuery'), /Unknown campaign query/);
  assert.throws(() => query(localRules, data, state, 'heroName', 'H9'), /Unknown identity/);
  assert.equal(query(localRules, data, state, 'encounterName'), '');
  delete configuration.encounters.A1;
  assert.throws(() => createRules(createCatalog(configuration)), CatalogError);
});

canonicalCase('IT-070', 'native queries and configuration are observational and captured completion rejects replay', {timeout:60000}, async t => {
  const browser = await tavern(t);
  const result = await browser.evaluate(`(() => {
    const interpreter = new Game_Interpreter(), before = JSON.stringify($gameSystem._dryland.campaign);
    interpreter.setup($dataCommonEvents[4].list, 0);
    interpreter.update();
    PluginManager.callCommand(interpreter,'Dryland_EventBridge','Query',{kind:'phase',variable:'31'});
    const phase = $gameVariables.value(31);
    const unchanged = before === JSON.stringify($gameSystem._dryland.campaign);
    const missing = $gameSystem._dryland;
    delete $gameSystem._dryland;
    let error;
    try { PluginManager.callCommand(interpreter,'Dryland_EventBridge','Query',{kind:'phase',variable:'31'}); }
    catch (failure) { error = failure.message; }
    $gameSystem._dryland = missing;
    // Isolated command-boundary fixture, not a player journey or save.
    const config = DrylandEventBridge.readConfiguration($dataCommonEvents[4]);
    const rules = DrylandCampaignRules.createRules(DrylandCampaignRules.createCatalog(config));
    $gameSystem._dryland.campaign = rules.dispatch(rules.createReadyState(), {type:'BEGIN',seed:123,expectedSequence:0}).state;
    const start = $gameSystem._dryland.campaign;
    PluginManager.callCommand(interpreter,'Dryland_EventBridge','CaptureContext',{});
    $gameVariables.setValue(148,9999);
    $gameVariables.setValue(149,'unrelated-global-variable');
    PluginManager.callCommand(interpreter,'Dryland_EventBridge','ReadingComplete',{});
    const completed = $gameSystem._dryland.campaign;
    PluginManager.callCommand(interpreter,'Dryland_EventBridge','ReadingComplete',{});
    const replay = $gameVariables.value(24), once = completed === $gameSystem._dryland.campaign;
    interpreter._drylandContext = completed.sequence; // Isolated wrong-passage boundary fixture.
    PluginManager.callCommand(interpreter,'Dryland_EventBridge','ReadingComplete',{});
    return {phase,unchanged,error,advance:completed.sequence-start.sequence,replay,once,wrongPassageUnchanged:completed === $gameSystem._dryland.campaign};
  })()`);
  assert.equal(result.phase, 'formation');
  assert.equal(result.unchanged, true);
  assert.match(result.error, /Campaign data is missing/);
  assert.equal(result.advance, 1);
  assert.equal(result.once, true);
  assert.equal(result.wrongPassageUnchanged, true);
  assert.equal(result.replay, 'stale_action');
  const loading = await browser.evaluate(`(async () => {
    const name = DataManager.makeSavename($gameSystem.savefileId()), contents = await StorageManager.loadObject(name);
    const expected = contents.system._dryland.campaign.sequence;
    contents.system._dryland.nativeLayoutVersion = 'older-text-only-revision';
    await StorageManager.saveObject(name, contents);
    await DataManager.loadGame($gameSystem.savefileId());
    const actual = $gameSystem._dryland.campaign.sequence;
    delete contents.system._dryland;
    await StorageManager.saveObject(name, contents);
    let rejected = false;
    try { await DataManager.loadGame($gameSystem.savefileId()); } catch { rejected = true; }
    return {expected, actual, rejected, repaired: Boolean($gameSystem._dryland)};
  })()`);
  assert.equal(loading.actual, loading.expected);
  assert.equal(loading.rejected, true);
  assert.equal(loading.repaired, false);
  assert.deepEqual(browser.exceptions, []);
});

// INVARIANT: each native tavern label retains its own identity and roster inspection is observational.
// OWNING_LAYER: native integration; EXISTING_SUITE: formation.mjs.
canonicalCase('IT-072', 'native tavern labels and mouse roster work at the larger desktop viewport', {timeout:60000}, async t => {
  const browser=await tavern(t,{width:1920,height:1080});
  const before=await snapshot(browser);
  const labels=await browser.evaluate(`Array.from({length:8},(_,i)=>SceneManager._scene._messageWindow.convertEscapeCharacters($gameScreen.getPictureTextData(30+i).center).replace(/\\x1bFS\\[\\d+\\]/g,''))`);
  assert.deepEqual(labels,['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska']);
  await browser.screenshot('docs/qa/evidence/eventbridge-minimal-runtime/task-03/20260912/tavern-1920.png');
  const point=await browser.evaluate(`(() => {const rect=Graphics._canvas.getBoundingClientRect();return {x:rect.x+1144*rect.width/1280,y:rect.y+56*rect.height/720};})()`);
  await browser.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
  await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});
  await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});
  await choices(browser,'roster');
  const roster=await browser.evaluate('Array.from({length:8},(_,i)=>$gameVariables.value(157+i))');
  assert.deepEqual(roster,labels.map(name=>`${name} — Presente`));
  assert.deepEqual(await snapshot(browser),before);
  await browser.screenshot('docs/qa/evidence/eventbridge-minimal-runtime/task-03/20260912/roster-1920.png');
  await browser.press('Escape',27);await choices(browser,'formation');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),9);
  assert.deepEqual(await snapshot(browser),before);
  assert.deepEqual(browser.exceptions,[]);
});
