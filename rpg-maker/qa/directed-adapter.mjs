import { cp, mkdtemp, readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { startServer, origin } from '../tests/helpers/native-chrome.mjs';

export const sourceFiles = [new URL('../tests/helpers/native-chrome.mjs', import.meta.url)];

export async function prepare({ project }) {
  const directory = await mkdtemp(join(tmpdir(), 'dryland-directed-'));
  const fixture = join(directory, 'game');
  await cp(resolve(project, 'rpg-maker/The Dryland Drowned'), fixture, { recursive: true });
  return { fixture, omittedNavigation: [], storage: 'fresh isolated browser context' };
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
  return { files, mutablePaths: [], capabilities: ['native-mz', 'public-input'],
    layout: layout.nativeLayoutVersion, git: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: project, encoding: 'utf8' }).trim(),
    command: [process.execPath, ...process.argv.slice(1)], storage: 'isolated browser context; no preinstalled campaign' };
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
