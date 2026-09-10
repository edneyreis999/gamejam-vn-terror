import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { localAssets } from '../../tools/native-layout.mjs';
import { openChrome, project, startServer } from './native-chrome.mjs';

const require = createRequire(import.meta.url);
export const { createRules, CatalogError } = require('../../The Dryland Drowned/js/plugins/Dryland_CampaignRules.js');
const { parseEventCatalog } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
export const events = JSON.parse(await readFile(path.join(project, 'data/CommonEvents.json'), 'utf8'));
const system = { ...JSON.parse(await readFile(path.join(project, 'data/System.json'), 'utf8')), drylandAssets: await localAssets(project) };
export const catalog = parseEventCatalog(events, system).catalog;
export const rules = createRules(catalog);
export const heroes = Array.from({ length: 8 }, (_, i) => `H${i + 1}`);
export function act(state, type, fields = {}) { return rules.dispatch(state, { type, ...fields, expectedSequence: state.sequence }); }
export function formation(seed = 12345) {
  let state = act(rules.createReadyState(), 'BEGIN', { seed }).state;
  while (state.reading) state = act(state, 'COMPLETE_PASSAGE', { passageId: state.reading.passageIds[state.reading.index] }).state;
  return state;
}
// Prepared domain fixtures cover roster boundaries before the death task owns
// their complete journey. These are test inputs, never a shipped mutation API.
export function rosterFixture(deadHeroIds) {
  const state = structuredClone(formation());
  state.deadHeroIds = deadHeroIds.slice();
  state.presentedDeathIds = deadHeroIds.slice();
  for (const [index, id] of deadHeroIds.entries()) {
    const routeId = index < 5 ? 'physical' : 'supernatural';
    const position = index < 5 ? index + 1 : index - 4;
    const encounterId = (index < 5 ? 'A' : 'B') + position;
    state.assignments[routeId][position - 1] = encounterId;
    state.progress[routeId] = position;
    state.deathLocations[id] = { routeId, encounterId, encounterPosition: position, approachId: `${encounterId}-1` };
  }
  if (state.progress.physical === 5) { state.completedDungeonIds = ['physical']; state.mapPieceIds = ['physical']; }
  const living = heroes.filter(id => !deadHeroIds.includes(id));
  if (living.length <= 3) state.draftPartyIds = living;
  assert.deepEqual(rules.validateState(state), { ok: true, violations: [] });
  return state;
}
export async function choices(browser, kind) {
  await browser.waitFor(`$gameMessage._drylandChoices?.kind === ${JSON.stringify(kind)} && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy() && (${JSON.stringify(kind)} === 'retreat' || !$gameMessage.hasText())`);
}
export async function activate(browser, kind, index) {
  await choices(browser, kind);
  for (let count = 0; count < 16; count++) {
    const current = await browser.evaluate('SceneManager._scene._choiceListWindow.index()');
    if (current === index) break;
    await browser.press(current < index ? 'ArrowDown' : 'ArrowUp', current < index ? 40 : 38);
  }
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'), index);
  await browser.press('Enter', 13);
}
export async function pause(browser) {
  await browser.waitFor('$gameMessage.hasText() && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0');
}
export async function tavern(t) {
  await startServer(t);
  const browser = await openChrome(t);
  await browser.waitFor("window.$gameMessage && $gameMessage.choices().includes('Jogar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  await browser.press('Enter', 13);
  for (const marker of ['A chuva acompanha Ivaí', 'Minha mãe deixou registros', 'Irati escrevera']) {
    await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(marker)}) && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0`);
    await browser.press('Enter', 13);
  }
  await choices(browser, 'formation');
  return browser;
}
export async function installFixture(browser, state) {
  assert.equal(rules.validateState(state).ok, true);
  // Install a prepared domain input at the real engine's game-object boundary.
  // Every action and projection after this point runs native code and vendors.
  await browser.evaluate(`(() => {
    $gameSystem._dryland.campaign = ${JSON.stringify(state)};
    $gameMap._interpreter.clear();
    $gameMessage.clear();
    SceneManager.goto(Scene_Map);
  })()`);
  await choices(browser, 'formation');
}
