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
  'VisuMZ_3_ChoiceCmnEvts', 'VisuMZ_4_AttachedPictures', 'VisuMZ_4_EventTitleScene', 'VisuMZ_4_MessageVisibility',
  'Dryland_CampaignRules', 'Dryland_EventBridge', 'Dryland_Presentation'
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
