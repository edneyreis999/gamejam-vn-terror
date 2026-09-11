// Pure rare boundaries replay immutable historical player actions, without
// calling the historical runtime. Native tests install those validated inputs
// at the engine's game-object boundary, then exercise actual windows/plugins.
import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, activate, catalog, choices, events, heroes, pause, rules, tavern } from '../helpers/formation.mjs';
import { accepted, complete, failureWithCount, finishReading, rejectUnchanged, replayUntil } from '../helpers/campaign.mjs';
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const evidence = 'docs/qa/evidence/init-rpg-maker-mz/task-05/IT-012';
canonicalCase('UT-021', 'one victim activation is irreversible and its original revision cannot kill again', () => {
  const before = failureWithCount(3), action = { type: 'SELECT_VICTIM', heroId: 'H1', expectedSequence: before.sequence };
  const result = rules.dispatch(before, action), dead = result.state;
  assert.equal(result.ok, true);
  assert.deepEqual(dead.deadHeroIds, ['H1']);
  assert.equal(dead.sequence, before.sequence + 1);
  assert.deepEqual(dead.partyIds, ['H2', 'H3']);
  assert.equal(dead.phase, 'death_result');
  const repeated = rules.dispatch(dead, action);
  assert.equal(repeated.error.code, 'stale_action');
  assert.deepEqual(repeated.state, dead);
  assert.equal(dead.rngState, before.rngState);
});
canonicalCase('UT-022', 'protagonist, reserve, unknown and dead victims are rejected without mutation', () => {
  const state = failureWithCount(2);
  assert.deepEqual(state.deadHeroIds, ['H1']);
  for (const heroId of ['ivai', 'H4', 'H9', 'H1']) rejectUnchanged(state, 'SELECT_VICTIM', { heroId }, 'invalid_victim');
});
canonicalCase('UT-023', 'the sole remaining H2 still requires an explicit victim activation', () => {
  let state = finishReading(accepted(failureWithCount(2), 'SELECT_VICTIM', { heroId: 'H3' }));
  state = complete(accepted(state, 'ENTER_DUNGEON'));
  state = complete(accepted(state, 'CHOOSE_APPROACH', { approachId: 'A1-1' }));
  assert.equal(state.phase, 'sacrifice_choice');
  assert.deepEqual(state.partyIds, ['H2']);
  const before = structuredClone(state);
  for (let repeat = 0; repeat < 3; repeat++) { rules.playerView(state); rules.snapshot(state); }
  assert.deepEqual(state, before);
  assert.equal(accepted(state, 'SELECT_VICTIM', { heroId: 'H2' }).phase, 'death_result');
});
canonicalCase('UT-024', 'a death leaving H2 continues with H2 and cannot recruit reserves mid-route', () => {
  let state = finishReading(accepted(failureWithCount(3), 'SELECT_VICTIM', { heroId: 'H3' }));
  state = complete(accepted(state, 'ENTER_DUNGEON'));
  state = complete(accepted(state, 'CHOOSE_APPROACH', { approachId: 'A7-1' }));
  state = complete(accepted(state, 'ENTER_DUNGEON'));
  state = complete(accepted(state, 'CHOOSE_APPROACH', { approachId: 'A1-3' }));
  assert.deepEqual(state.partyIds, ['H1', 'H2']);
  state = finishReading(accepted(state, 'SELECT_VICTIM', { heroId: 'H1' }));
  assert.equal(state.phase, 'dungeon_intro');
  assert.equal(state.position, 4);
  assert.deepEqual(state.partyIds, ['H2']);
  assert.deepEqual(state.draftPartyIds, ['H2']);
  assert.ok(heroes.filter(id => !state.deadHeroIds.includes(id)).length > 1);
});
canonicalCase('UT-025', 'an empty expedition before the route end returns automatically when reserves survive', () => {
  let state = accepted(failureWithCount(1), 'SELECT_VICTIM', { heroId: 'H3' });
  state = complete(state);
  assert.equal(state.phase, 'death_result', 'Farewell completion alone cannot finish the consequence.');
  state = complete(state);
  assert.equal(state.phase, 'automatic_retreat');
  assert.equal(state.progress.physical, 3);
  assert.deepEqual(state.partyIds, []);
  assert.equal(state.reading.sceneId, 'automatic_retreat');
});
canonicalCase('UT-026', 'the fifth initial encounter rewards completion even when the last present hero dies', () => {
  const before = replayUntil('initial-fifth-last-party', state => state.phase === 'sacrifice_choice' && state.position === 5);
  let state = complete(complete(accepted(before, 'SELECT_VICTIM', { heroId: 'H8' })));
  assert.equal(state.phase, 'dungeon_complete');
  assert.deepEqual(state.partyIds, []);
  assert.equal(state.reading.sceneId, 'lover.physical.first');
  assert.deepEqual(state.completedDungeonIds, ['physical']);
  assert.deepEqual(state.mapPieceIds, []);
  state = finishReading(state);
  assert.deepEqual(state.mapPieceIds, ['physical']);
  assert.equal(state.phase, 'formation');
});
canonicalCase('UT-027', 'the sixth final encounter with living reserves enters the solo Council', () => {
  const before = replayUntil('final-sixth-solo-council', state => state.phase === 'sacrifice_choice' && state.position === 6);
  const state = complete(complete(accepted(before, 'SELECT_VICTIM', { heroId: 'H8' })));
  assert.equal(state.phase, 'council');
  assert.deepEqual(state.climaxPartyIds, []);
  assert.ok(state.reading.passageIds.includes('council.solo'));
  assert.equal(state.reading.passageIds.some(id => id.startsWith('opinion.')), false);
  assert.ok(heroes.some(id => !state.deadHeroIds.includes(id)));
});
canonicalCase('UT-028', 'the eighth death takes bad-ending precedence even on the sixth final encounter', () => {
  const before = replayUntil('final-sixth-total-loss', state => state.phase === 'sacrifice_choice' && state.dungeonId === 'final' && state.position === 6);
  assert.equal(before.deadHeroIds.length, 7);
  const state = complete(complete(accepted(before, 'SELECT_VICTIM', { heroId: 'H8' })));
  assert.equal(state.deadHeroIds.length, 8);
  assert.equal(state.phase, 'ending');
  assert.equal(state.endingId, 'bad');
  assert.equal(state.reading.sceneId, 'ending.bad');
  assert.equal(state.completedDungeonIds.includes('final'), false);
  assert.equal(state.medallionComplete, false);
});
canonicalCase('UT-056', 'zero living heroes cannot depart and the terminal ending remains authoritative', () => {
  const state = replayUntil('final-sixth-total-loss', state => state.phase === 'ending');
  assert.deepEqual(rules.deriveFormation(state).livingHeroIds, []);
  assert.equal(rules.playerView(state).canDepart, false);
  rejectUnchanged(state, 'DEPART', {}, 'invalid_transition');
});
canonicalCase('UT-066', 'death context is atomic, immutable, strictly validated and cleared by New Game', () => {
  const before = replayUntil('final-sixth-solo-council', state => state.phase === 'sacrifice_choice' && state.position === 6);
  const state = accepted(before, 'SELECT_VICTIM', { heroId: 'H8' });
  assert.deepEqual(state.deathLocations.H8, { routeId: 'final', encounterId: 'B5', encounterPosition: 6, approachId: 'B5-1' });
  assert.deepEqual(Object.keys(state.deathLocations).sort(), [...state.deadHeroIds].sort());
  const stale = rules.dispatch(state, { type: 'SELECT_VICTIM', heroId: 'H8', expectedSequence: before.sequence });
  assert.equal(stale.error.code, 'stale_action');
  assert.deepEqual(stale.state.deathLocations, state.deathLocations);
  for (const mutate of [
    input => { delete input.deathLocations.H8; },
    input => { input.deathLocations.H1 = structuredClone(input.deathLocations.H8); },
    input => { input.deathLocations.H8.routeId = 'supernatural'; },
    input => { input.deathLocations.H8.encounterId = 'B4'; },
    input => { input.deathLocations.H8.encounterPosition = 1; },
    input => { input.deathLocations.H8.approachId = 'A1-1'; }
  ]) {
    const invalid = structuredClone(state); mutate(invalid);
    assert.ok(rules.validateState(invalid).violations.some(violation => violation.code === 'invalid_death_locations'));
    assert.equal(act(invalid, 'COMPLETE_PASSAGE', { passageId: invalid.reading.passageIds[0] }).error.code, 'invalid_state');
  }
  const terminal = replayUntil('final-sixth-total-loss', state => state.phase === 'campaign_complete');
  assert.deepEqual(accepted(terminal, 'NEW_CAMPAIGN').deathLocations, {});
  for (const id of Object.keys(catalog.encounters)) {
    assert.ok(catalog.passages[`memorial_cause.${id}`]);
    assert.equal(catalog.passages[`memorial_cause.${id}`].status, 'provisional');
  }
  assert.equal(events.filter(Boolean).flatMap(event => event.list).filter(command => command.code === 108 && command.parameters[0].startsWith('@dryland-section memorial_cause.')).length, 16);
});
canonicalCase('IT-012', 'native sacrifice warns before three, two or one candidates and activates exactly one death', { timeout: 120000 }, async t => {
  const browser = await tavern(t);
  for (const count of [3, 2, 1]) {
    const state = failureWithCount(count), encounter = state.pendingOutcome.encounterId;
    const mapId = 6 + Number(encounter.slice(1));
    await browser.evaluate(`$gameSystem._dryland.campaign = ${JSON.stringify(state)}; $gameMap._interpreter.clear(); $gameMessage.clear(); $gamePlayer.reserveTransfer(${mapId},10,7,2,0); SceneManager.goto(Scene_Map);`);
    await browser.waitFor(`$gameMap.mapId() === ${mapId} && $gameMessage.allText().includes('A escolha é irreversível') && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0 && !SceneManager._scene.isBusy()`);
    assert.equal(await browser.evaluate("$gameMessage._drylandChoices?.kind === 'sacrifice'"), false);
    assert.deepEqual(await snapshot(browser), state);
    await browser.screenshot(`${evidence}/warning-${count}.png`);
    await browser.press('Enter', 13);
    await choices(browser, 'sacrifice');
    assert.deepEqual(await browser.evaluate('$gameMessage._drylandChoices.entries.map(entry => entry.heroId)'), state.partyIds);
    assert.equal(await browser.evaluate(`Array.from({length:${count}}, (_, index) => $gameScreen.picture(10 + index)).every(picture => picture.x() > 100 && picture.x() < 1180 && picture.y() > 200 && picture.y() < 550)`), true, 'Each candidate illustration must be framed inside the native desktop stage.');
    await browser.press('Escape', 27);
    await choices(browser, 'sacrifice');
    assert.deepEqual(await snapshot(browser), state);
    await browser.screenshot(`${evidence}/candidates-${count}.png`);
    await activate(browser, 'sacrifice', count - 1);
    const victim = state.partyIds[count - 1];
    await browser.waitFor(`$gameSystem._dryland.campaign.phase === 'death_result' && $gameMessage.speakerName() === ${JSON.stringify(catalog.heroes[victim].name)} && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0 && $gameScreen.picture(60)?.name() === 'Dryland_${victim}'`);
    const after = await snapshot(browser);
    assert.deepEqual(after.deadHeroIds, [...state.deadHeroIds, victim]);
    assert.equal(after.sequence, state.sequence + 1);
    assert.deepEqual(after.deathLocations[victim], { routeId: 'physical', encounterId: encounter, encounterPosition: state.position, approachId: state.pendingOutcome.approachId });
    assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), `Dryland_Encounter_${encounter}`);
    assert.equal(await browser.evaluate('$gameScreen.picture(50) == null'), true);
    await browser.screenshot(`${evidence}/farewell-${count}.png`);
    await browser.press('Enter', 13);
    await pause(browser);
    assert.equal(await browser.evaluate('$gameScreen.picture(60) == null'), true);
    assert.equal(await browser.evaluate('$gameMessage.speakerName()'), '');
    assert.equal((await snapshot(browser)).deadHeroIds.length, state.deadHeroIds.length + 1);
    await browser.screenshot(`${evidence}/context-${count}.png`);
  }
});
