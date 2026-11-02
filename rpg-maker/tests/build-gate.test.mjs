// The Debug plugin must never reach a published build by accident (ADR-G007).
// These tests run the real prune-build against disposable exported-build fixtures.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { DEBUG_PLUGIN, debugReport, debugStatus, differsOnlyByDebug, parsePlugins, withDebugStatus, writePlugins } from '../tools/debug-gate.mjs';

const source = resolve('rpg-maker/The Dryland Drowned');
const prune = resolve('rpg-maker/tools/prune-build.mjs');
const exists = path => stat(path).then(() => true, () => false);

// A minimal exported build: the real plugin list with the Debug entry set as asked.
async function exportedBuild(t, state) {
  const root = await mkdtemp(join(tmpdir(), 'dryland-build-gate-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'js/plugins'), { recursive: true });
  await mkdir(join(root, 'data'));
  await writeFile(join(root, 'index.html'), '<!doctype html>');
  await writeFile(join(root, 'data/CommonEvents.json'), '[null]');
  await writeFile(join(root, 'data/Animations.json'), '[null]');
  const parsed = parsePlugins(await readFile(join(source, 'js/plugins.js'), 'utf8'));
  if (state === 'absent') parsed.plugins = parsed.plugins.filter(plugin => plugin.name !== DEBUG_PLUGIN);
  else parsed.plugins.find(plugin => plugin.name === DEBUG_PLUGIN).status = state === 'enabled';
  await writeFile(join(root, 'js/plugins.js'), writePlugins(parsed));
  await writeFile(join(root, `js/plugins/${DEBUG_PLUGIN}.js`), '// stub');
  return root;
}
const run = (build, args = [], input = '') => spawnSync(process.execPath, [prune, '--build', build, ...args], { encoding: 'utf8', input });
const pluginsOf = async build => parsePlugins(await readFile(join(build, 'js/plugins.js'), 'utf8')).plugins;
const withoutDebug = plugins => plugins.filter(plugin => plugin.name !== DEBUG_PLUGIN);

test('V-001 asks about Debug only when it is enabled in the build', async t => {
  const enabled = await exportedBuild(t, 'enabled');
  const asked = run(enabled, ['--apply', '--prompt'], 'n\n');
  assert.match(asked.stdout, /Publicar com o Debug ativo\? \[s\/N\]/);
  for (const state of ['disabled', 'absent']) {
    const build = await exportedBuild(t, state);
    const result = run(build, ['--apply', '--prompt'], 'n\n');
    assert.doesNotMatch(result.stdout, /Publicar com o Debug ativo/);
    assert.equal(result.status, 0, result.stderr);
  }
});

test('V-002 answering no disables Debug in the build only and prunes its file', async t => {
  const build = await exportedBuild(t, 'enabled');
  const before = withoutDebug(await pluginsOf(build));
  const sourceBefore = await readFile(join(source, 'js/plugins.js'));
  const result = run(build, ['--apply', '--prompt'], 'n\n');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Debug desativado no build/);
  assert.equal(debugStatus(await readFile(join(build, 'js/plugins.js'), 'utf8')), false);
  assert.equal(await exists(join(build, `js/plugins/${DEBUG_PLUGIN}.js`)), false);
  assert.deepEqual(withoutDebug(await pluginsOf(build)), before);
  assert.deepEqual(await readFile(join(source, 'js/plugins.js')), sourceBefore);
});

test('V-003 answering yes keeps Debug, and the build check accepts only that difference', async t => {
  const build = await exportedBuild(t, 'enabled');
  const result = run(build, ['--apply', '--prompt'], 's\n');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(debugStatus(await readFile(join(build, 'js/plugins.js'), 'utf8')), true);
  assert.equal(await exists(join(build, `js/plugins/${DEBUG_PLUGIN}.js`)), true);
  // The source may have Debug on while someone tests with it; the gate must not depend on that.
  const original = withDebugStatus(await readFile(join(source, 'js/plugins.js'), 'utf8'), false);
  const kept = await readFile(join(build, 'js/plugins.js'), 'utf8');
  assert.equal(differsOnlyByDebug(kept, original), true);
  assert.equal(differsOnlyByDebug(withDebugStatus(original, true), original), true);
  // Any other change is still a different build.
  const tampered = parsePlugins(kept);
  tampered.plugins.find(plugin => plugin.name === 'Dryland_EventBridge').status = false;
  assert.equal(differsOnlyByDebug(writePlugins(tampered), original), false);
  assert.equal(debugReport(true, false), 'Debug: ativo');
  assert.equal(debugReport(false, true), 'Debug: inativo (desativado pelo prune-build)');
  assert.equal(debugReport(false, false), 'Debug: inativo');
});

test('V-004 without a terminal Debug is disabled unless the run allows it', async t => {
  const build = await exportedBuild(t, 'enabled');
  const result = run(build, ['--apply']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Debug \(Dryland_7_QADebug\) estava ativo; desativado no build\. Use --allow-debug para mantê-lo\./);
  assert.doesNotMatch(result.stdout, /Publicar com o Debug ativo/);
  assert.equal(debugStatus(await readFile(join(build, 'js/plugins.js'), 'utf8')), false);
  const allowed = await exportedBuild(t, 'enabled');
  const kept = run(allowed, ['--apply', '--allow-debug']);
  assert.equal(kept.status, 0, kept.stderr);
  assert.match(kept.stdout, /Debug mantido no build \(--allow-debug\)\./);
  assert.doesNotMatch(kept.stdout, /Publicar com o Debug ativo/);
  assert.equal(debugStatus(await readFile(join(allowed, 'js/plugins.js'), 'utf8')), true);
});

test('report mode only states the Debug status and changes nothing', async t => {
  const build = await exportedBuild(t, 'enabled');
  const before = await readFile(join(build, 'js/plugins.js'));
  const result = run(build);
  assert.match(result.stdout, /Debug: ativo/);
  assert.deepEqual(await readFile(join(build, 'js/plugins.js')), before);
});
