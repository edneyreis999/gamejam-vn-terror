import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const defaultProject = path.resolve('rpg-maker/The Dryland Drowned');
export const hash = value => createHash('sha256').update(value).digest('hex');

export async function nativeFiles(project) {
  const names = (await readdir(path.join(project, 'data')))
    .filter(name => /^(System|MapInfos|Map\d+|CommonEvents)\.json$/.test(name)).sort();
  for (const required of ['System.json', 'MapInfos.json', 'CommonEvents.json']) {
    if (!names.includes(required)) throw new Error(`Missing native database: ${required}`);
  }
  const files = {};
  for (const name of names) files[`data/${name}`] = hash(await readFile(path.join(project, 'data', name)));
  const infos = JSON.parse(await readFile(path.join(project, 'data/MapInfos.json'), 'utf8'));
  for (const info of infos.filter(Boolean)) {
    const file = `data/Map${String(info.id).padStart(3, '0')}.json`;
    if (!files[file]) throw new Error(`Missing native map: ${file}`);
  }
  return files;
}

export async function localAssets(project) {
  const result = [];
  async function visit(relative) {
    for (const entry of await readdir(path.join(project, relative), { withFileTypes: true })) {
      const file = `${relative}/${entry.name}`;
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) result.push(file);
    }
  }
  for (const directory of ['img', 'audio']) await visit(directory);
  return result.sort();
}

export function layoutErrors(manifest, files, assets) {
  const digest = hash(JSON.stringify(files));
  if (!manifest || typeof manifest.nativeLayoutVersion !== 'string' ||
      JSON.stringify(manifest.files) !== JSON.stringify(files) ||
      !Array.isArray(assets) || JSON.stringify(manifest.assets) !== JSON.stringify(assets) ||
      manifest.revisions?.[manifest.nativeLayoutVersion] !== digest) {
    return [{ code: 'native_layout_mismatch' }];
  }
  return [];
}
