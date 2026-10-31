// Authoring preservation is owned by the portable 1.6.1 package.
// Keep this project entry point so the maintained game command exercises it.
import '../../packages/coreto-design-system/tests/authoring.test.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, writeFile, copyFile, rm, readdir} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {prepareInstall, transaction, registry} from '../../packages/coreto-design-system/src/authoring.mjs';

const game = resolve(process.env.DRYLAND_GAME_ROOT || 'rpg-maker/The Dryland Drowned');
const coretoCli = resolve('coreto/tools/coreto/cli.mjs');
async function fixture(t) {
  const parent = resolve('.artifacts/design-system-tests');
  await mkdir(parent, {recursive:true});
  const root = await mkdtemp(join(parent, 'dryland-design-'));
  t.after(() => rm(root, {recursive:true, force:true}));
  await mkdir(join(root, 'js/plugins'), {recursive:true});
  await mkdir(join(root, 'data'));
  for (const file of ['game.rmmzproject', 'js/plugins.js', 'Languages.tsv', 'data/System.json']) {
    await copyFile(join(game, file), join(root, file));
  }
  for (const name of (await readdir(join(game, 'js/plugins'))).filter(name => name.endsWith('.js'))) {
    await copyFile(join(game, 'js/plugins', name), join(root, 'js/plugins', name));
  }
  return root;
}

test('active Dryland consumer preserves native data and reapplies without changes', async t => {
  const root = await fixture(t), file = join(root, 'js/plugins.js');
  const before = await readFile(file), system = await readFile(join(root, 'data/System.json'));
  const prepared = prepareInstall(root, {preset:'dryland', coretoCli});
  assert(transaction(root, prepared.changes, {dryRun:true, expectedHash:prepared.hash}).changed > 0);
  assert.deepEqual(await readFile(file), before);
  transaction(root, prepared.changes, {expectedHash:prepared.hash});
  assert.deepEqual(await readFile(join(root, 'data/System.json')), system);
  assert.equal(transaction(root, prepareInstall(root, {preset:'dryland', coretoCli}).changes, {dryRun:true}).changed, 0);
});

test('Dryland rejects a missing provider before writing configuration', async t => {
  const root = await fixture(t), file = join(root, 'js/plugins.js');
  const reg = registry(root);
  reg.plugins.splice(reg.plugins.findIndex(p => p.name === 'Coreto_4_MessageVisibility'), 1);
  await writeFile(file, reg.serialize());
  const before = await readFile(file);
  assert.throws(() => prepareInstall(root, {preset:'dryland', coretoCli}), /Coreto_4_MessageVisibility/);
  assert.deepEqual(await readFile(file), before);
});
