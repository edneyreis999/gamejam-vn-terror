import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { project } from './native-chrome.mjs';
import { hash, nativeFiles } from '../../tools/native-layout.mjs';

export const ensembleFixture = JSON.parse(await readFile(new URL('../fixtures/vn-picture-busts-2x2/recipe.json', import.meta.url), 'utf8'));
export function appendEnsemble(events) {
  const offset = events.length - 1;
  const relocate = list => structuredClone(list).map(command => {
    if (command.code === 117) command.parameters[0] += offset;
    return command;
  });
  for (const helper of ensembleFixture.helpers) events.push({ id: offset + helper.id, name: helper.name, trigger: 0, switchId: 1, list: relocate(helper.list) });
  const root = events.length;
  events.push({ id: root, name: 'Fixture técnica — 2x2', trigger: 0, switchId: 1, list: relocate(ensembleFixture.root) });
  return root;
}
export async function prepareBustFixture(t, revision, edit) {
  const directory = await mkdtemp(path.join(tmpdir(), 'dryland-native-recipe-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const entry of await readdir(project, { withFileTypes: true })) {
    const source = path.join(project, entry.name), target = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== 'data') await symlink(source, target);
    else await cp(source, target, { recursive: true });
  }
  const file = path.join(directory, 'data/CommonEvents.json');
  const events = JSON.parse(await readFile(file, 'utf8'));
  const result = edit(events);
  await writeFile(file, JSON.stringify(events));
  const manifestFile = path.join(directory, 'native-layout-manifest.json');
  const layout = JSON.parse(await readFile(manifestFile, 'utf8'));
  if (Object.hasOwn(layout.revisions, revision)) throw Error('Fixture revision already used');
  layout.nativeLayoutVersion = revision;
  layout.files = await nativeFiles(directory);
  layout.revisions[revision] = hash(JSON.stringify(layout.files));
  await writeFile(manifestFile, JSON.stringify(layout));
  return { directory, events, result };
}
