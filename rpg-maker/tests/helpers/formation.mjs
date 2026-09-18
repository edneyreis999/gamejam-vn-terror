import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { openChrome, project, selectFile, startServer } from './native-chrome.mjs';

const require = createRequire(import.meta.url);
export const { createCatalog, createRules, CatalogError } = require('../../The Dryland Drowned/js/plugins/Dryland_CampaignRules.js');
const { readConfiguration } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
export const events = JSON.parse(await readFile(path.join(project, 'data/CommonEvents.json'), 'utf8'));
export const gorvakMap = JSON.parse(await readFile(path.join(project, 'data/Map037.json'), 'utf8'));
export const heroMaps = new Map([[37, gorvakMap], ...await Promise.all([38, 39, 40, 41, 42, 43, 44].map(async id => [id, JSON.parse(await readFile(path.join(project, `data/Map${String(id).padStart(3, '0')}.json`), 'utf8'))]))]);
export const catalog = createCatalog(readConfiguration(events[4]));
export const rules = createRules(catalog);
export const heroes = Array.from({ length: 8 }, (_, i) => `H${i + 1}`);
export const prologueMarkers = [
  'Meu nome é Rheed.', 'Naqueles dias,', 'Quando os oito chegaram',
  'Os papéis eram de Irati', 'Os mapas estavam incompletos.', 'Do tesouro, falou pouco.',
  'Minha família deixou as pistas.', 'Você não está esquecendo', 'Os detalhes serão adicionados'
];
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

const presentation = (command, name) => command?.code === 357 && command.parameters?.[0] === 'Dryland_Presentation' && command.parameters?.[1] === name;
export function gorvakUnitTexts(unit) {
  return heroUnitTexts(unit);
}
export function heroUnitTexts(unit) {
  const mapId = 37 + Math.floor((unit - 82) / 4);
  const list = heroMaps.get(mapId).events[1].pages[0].list;
  const start = list.findIndex(command => presentation(command, 'ObservationBegin') && Number(command.parameters?.[3]?.unit) === unit);
  assert.ok(start >= 0, `Missing hero reading unit ${unit}`);
  const end = list.findIndex((command, index) => index > start && presentation(command, 'ObservationComplete'));
  assert.ok(end > start, `Missing completion for hero unit ${unit}`);
  return list.slice(start, end).filter(command => command.code === 401).map(command => command.parameters[0]);
}

export async function choices(browser, kind) {
  await browser.waitFor(`$gameMessage._drylandChoiceFocus?.key === ${JSON.stringify(kind)} && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy() && (${JSON.stringify(kind)} === 'hero' || ${JSON.stringify(kind)} === 'retreat' || !$gameMessage.hasText())`);
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
export async function tavern(t, options = {}) {
  await startServer(t);
  const browser = await openChrome(t, options);
  await browser.waitFor("window.$gameMessage && $gameMessage.choices().includes('Jogar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  await browser.press('Enter', 13);await selectFile(browser,1);
  for (const marker of prologueMarkers) {
    await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(marker)}) && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0`);
    await browser.press('Enter', 13);
  }
  await choices(browser, 'formation');
  return browser;
}

export async function returnToTavern(browser) {
  await browser.waitFor("['hero','formation'].includes($gameMessage._drylandChoiceFocus?.key) && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  if (await browser.evaluate("$gameMessage._drylandChoiceFocus.key === 'hero'")) await activate(browser, 'hero', 2);
  await choices(browser, 'formation');
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
