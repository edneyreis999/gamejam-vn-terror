import assert from 'node:assert/strict';
import { cp, mkdtemp, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { startServer, origin } from '../tests/helpers/native-chrome.mjs';
import { archiveFiles, validateNativeArchive } from './native-save-archive.mjs';

export const sourceFiles = [new URL('../tests/helpers/native-chrome.mjs', import.meta.url), new URL('./native-save-archive.mjs', import.meta.url)];

function validateFixtureArchive(archive, files, layout) {
  if (process.env.DRYLAND_QA_SURFACE === 'bust-save-incompatible') {
    assert.notEqual(archive.layout, layout, 'Refusal case requires a genuinely older native revision.');
    validateNativeArchive(archive, archive.sourceFiles, new URL(origin).origin, archive.layout);
  } else validateNativeArchive(archive, files, new URL(origin).origin, layout);
}

export async function prepare({ project }) {
  const directory = await mkdtemp(join(tmpdir(), 'dryland-directed-'));
  const fixture = join(directory, 'game');
  try {
    await cp(resolve(project, 'rpg-maker/The Dryland Drowned'), fixture, { recursive: true });
    if (process.env.DRYLAND_QA_BASELINE) {
      assert.equal(process.env.DRYLAND_QA_SURFACE, 'bust-save-producer');
      for (const file of ['data/CommonEvents.json', 'data/System.json', 'js/plugins/Dryland_EventBridge.js', 'native-layout-manifest.json']) {
        await cp(resolve(process.env.DRYLAND_QA_BASELINE, file), join(fixture, file));
      }
    }
    if (process.env.DRYLAND_QA_SAVE_ARCHIVE) {
      const archive = JSON.parse(await readFile(resolve(process.env.DRYLAND_QA_SAVE_ARCHIVE), 'utf8'));
      const current = await describe({ project, fixture });
      validateFixtureArchive(archive, current.files, current.layout);
      await writeFile(join(fixture, archiveFiles.archive), JSON.stringify(archive) + '\n', { flag: 'wx' });
      await writeFile(join(fixture, archiveFiles.storage), JSON.stringify(archive.storageState) + '\n', { flag: 'wx' });
      return { fixture, omittedNavigation: [{ producer: archive.producer, campaign: archive.campaign }], storage: 'native checkpoint copy restored before first page' };
    }
    return { fixture, omittedNavigation: [], storage: 'fresh isolated browser context' };
  } catch (error) {
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
}

export async function describe({ project, fixture }) {
  const files = [];
  async function visit(relative = '') {
    for (const entry of (await readdir(join(fixture, relative), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = join(relative, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) files.push({ path, sha256: createHash('sha256').update(await readFile(join(fixture, path))).digest('hex') });
      else throw new Error(`Unsupported fixture entry: ${path}`);
    }
  }
  await visit();
  const layout = JSON.parse(await readFile(join(fixture, 'native-layout-manifest.json'), 'utf8'));
  const storageFile = files.find(entry => entry.path === archiveFiles.storage);
  const archive = storageFile ? JSON.parse(await readFile(join(fixture, archiveFiles.archive), 'utf8')) : null;
  if (archive) validateFixtureArchive(archive, files, layout.nativeLayoutVersion);
  return { files, mutablePaths: [], capabilities: ['native-mz', 'public-input'],
    ...(archive ? { storageFixture: storageFile, omittedNavigation: [{ producer: archive.producer, campaign: archive.campaign }] } : {}),
    layout: layout.nativeLayoutVersion, git: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: project, encoding: 'utf8' }).trim(),
    command: [process.execPath, ...process.argv.slice(1)], storage: archive ? 'native checkpoint copy; pre-boot restore; Continue required' : 'isolated browser context; no preinstalled campaign' };
}

export async function start({ fixture }) {
  const cleanup = [];
  try {
    const service = await startServer({ after: fn => cleanup.push(fn) }, fixture);
    return { url: origin, close: () => service.stop() };
  } catch (error) {
    for (const close of cleanup) await close();
    throw error;
  }
}
