import { createHash } from 'node:crypto';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const hash = value => createHash('sha256').update(value).digest('hex');

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
