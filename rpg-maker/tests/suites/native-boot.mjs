// Suite: native campaign entry.
// Invariant: explicit entry uses the selected native stack and exclusive scene maps.
// Boundary IN: installed engine/plugins, authored title/prologue, map tree, loopback process.
// Boundary OUT: campaign rules, semantic saves and the later interactive tavern.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { openChrome, origin, project, startServer } from '../helpers/native-chrome.mjs';

const evidenceRoot = path.resolve('docs/qa/evidence/init-rpg-maker-mz/task-01');
const requiredPlugins = [
  'VisuMZ_0_CoreEngine', 'VisuMZ_1_MessageCore', 'VisuMZ_1_OptionsCore', 'VisuMZ_1_SaveCore',
  'VisuMZ_2_ExtMessageFunc', 'VisuMZ_2_PictureChoices', 'VisuMZ_2_VNPictureBusts',
  'VisuMZ_3_ChoiceCmnEvts', 'VisuMZ_4_EventTitleScene', 'VisuMZ_4_MessageVisibility',
  'Dryland_CampaignRules', 'Dryland_EventBridge'
];

async function record(id, result) {
  const files = ['js/plugins.js', ...requiredPlugins.map(name => `js/plugins/${name}.js`),
    ...(await readdir(path.join(project, 'data'))).filter(name => /^(Map\d+|MapInfos|CommonEvents|System)\.json$/.test(name)).map(name => `data/${name}`)];
  const hashes = {};
  for (const file of files) hashes[file] = createHash('sha256').update(await readFile(path.join(project, file))).digest('hex');
  const directory = path.join(evidenceRoot, id);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'result.json'), JSON.stringify({ id, timestamp: new Date().toISOString(), command: 'node --test rpg-maker/tests/*.test.mjs', node: process.version, ...result, sha256: hashes }, null, 2) + '\n');
}

canonicalCase('IT-001', 'native entry loads the selected plugins, explicit prologue and complete map hierarchy', { timeout: 90000 }, async t => {
  await startServer(t);
  const browser = await openChrome(t);
  await browser.waitFor("window.$gameMessage && $gameMessage.choices().includes('Jogar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  const entry = await browser.evaluate(`({
    plugins: $plugins.filter(p => p.status).map(p => p.name),
    loaded: PluginManager._scripts, size: [Graphics.width, Graphics.height],
    mapId: $gameMap.mapId(), text: $gameMessage.allText(), choices: $gameMessage.choices(),
    actors: $gameParty.members().length, moving: $gamePlayer.canMove(),
    menu: SceneManager._scene.isMenuEnabled(), bgm: AudioManager._currentBgm,
    console: JSON.parse(JSON.parse($plugins.find(p => p.name === 'VisuMZ_2_ExtMessageFunc').parameters['Buttons:struct'])['List:arraystr'])
  })`);
  assert.deepEqual(entry.plugins, requiredPlugins);
  for (const name of requiredPlugins) assert.ok(entry.loaded.includes(name), `Plugin was actually loaded: ${name}`);
  assert.deepEqual(entry.size, [1280, 720]);
  assert.equal(entry.mapId, 1);
  assert.equal(entry.actors, 0);
  assert.equal(entry.moving, false);
  assert.equal(entry.menu, false);
  assert.ok(!entry.bgm?.name);
  assert.match(entry.text, /16 anos.*morte permanente/s);
  assert.deepEqual(entry.choices, ['Jogar', 'Configurações']);
  assert.deepEqual(entry.console, ['options', 'hide']);

  const maps = await browser.evaluate(`Promise.all($dataMapInfos.filter(Boolean).map(async info => {
    const response = await fetch('data/Map' + String(info.id).padStart(3, '0') + '.json');
    if (!response.ok) throw new Error('Missing map ' + info.id);
    const map = await response.json();
    return {id:info.id,parent:info.parentId,name:info.name,stable:map.note,width:map.width,height:map.height,cells:map.data.length,events:map.events.filter(Boolean).length};
  }))`);
  assert.equal(maps.length, 36);
  assert.equal(new Set(maps.map(map => map.stable)).size, 36);
  for (const map of maps) assert.equal(map.cells, map.width * map.height * 6);
  const lookup = id => maps.find(map => map.stable === `<drylandMap:${id}>`);
  assert.equal(lookup('prologue').id, 2);
  assert.equal(lookup('tavern').id, 3);
  assert.equal(lookup('story').id, 4);
  for (const [family, parent] of [['A', 'physical_traps'], ['B', 'supernatural_traps']]) {
    for (let number = 1; number <= 8; number++) assert.equal(lookup(`encounter.${family}${number}`).parent, lookup(parent).id);
  }
  for (const ending of ['reunite', 'destroy', 'total_loss']) assert.equal(lookup(`ending.${ending}`).parent, lookup('endings').id);
  for (let hero = 1; hero <= 8; hero++) assert.equal(lookup(`epilogue.H${hero}`).parent, lookup('closing').id);
  assert.equal(lookup('council').parent, 0);
  await browser.screenshot(path.join(evidenceRoot, 'IT-001/entry.png'));

  await browser.press('Enter', 13);
  await browser.waitFor("$gameMap.mapId() === 2 && SceneManager._scene._messageWindow?.pause");
  const passages = [];
  for (const marker of ['A chuva acompanha Ivaí', 'Minha mãe deixou registros', 'Irati escrevera']) {
    await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(marker)}) && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0`);
    passages.push(await browser.evaluate('$gameMessage.allText()'));
    if (passages.length === 1) await browser.screenshot(path.join(evidenceRoot, 'IT-001/prologue.png'));
    await browser.press('Enter', 13);
  }
  await browser.waitFor("$gameMap.mapId() === 3 && !SceneManager._scene.isBusy() && $gameMessage._drylandChoices?.kind === 'formation' && SceneManager._scene._choiceListWindow?.isOpenAndActive()");
  const tavern = await browser.evaluate('({mapId:$gameMap.mapId(),canMove:$gamePlayer.canMove(),menu:SceneManager._scene.isMenuEnabled(),text:$gameMessage.allText(),picture:$gameScreen.picture(1).name()})');
  assert.equal(tavern.canMove, false);
  assert.equal(tavern.menu, false);
  assert.equal(tavern.text, '');
  assert.equal(tavern.picture, 'Dryland_Taverna');
  assert.deepEqual(browser.exceptions, []);
  await browser.screenshot(path.join(evidenceRoot, 'IT-001/tavern-stage.png'));
  await record('IT-001', { verdict: 'PASS', browser: browser.version, entry, maps, passages, tavern });
});

canonicalCase('IT-037', 'documented loopback command serves the native entry in Chrome and stops on SIGINT', { timeout: 45000 }, async t => {
  const server = await startServer(t);
  const browser = await openChrome(t);
  await browser.waitFor("window.$gameMessage && $gameMessage.choices().includes('Jogar')");
  assert.equal(await browser.evaluate('location.href'), origin);
  assert.equal(await browser.evaluate('$gameMap.mapId()'), 1);
  await server.stop();
  await assert.rejects(fetch(origin, { signal: AbortSignal.timeout(2000) }));
  await record('IT-037', { verdict: 'PASS', browser: browser.version, origin, serverLog: server.log(), shutdown: 'SIGINT (Ctrl+C equivalent); origin refused subsequent connection' });
});
