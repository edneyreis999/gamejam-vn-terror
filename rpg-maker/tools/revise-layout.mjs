import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defaultProject, hash, localAssets, nativeFiles } from './native-layout.mjs';

const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== '--revision' || !/^[a-z0-9][a-z0-9._-]{0,79}$/i.test(args[1])) {
  console.error('Usage: node rpg-maker/tools/revise-layout.mjs --revision <new-revision>');
  process.exitCode = 2;
} else {
  try {
    const file = path.join(defaultProject, 'native-layout-manifest.json');
    let previous = { revisions: {} };
    try { previous = JSON.parse(await readFile(file, 'utf8')); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (Object.hasOwn(previous.revisions, args[1])) throw new Error('This revision already exists. Choose a new revision; existing revisions are immutable.');
    const files = await nativeFiles(defaultProject);
    const manifest = {
      nativeLayoutVersion: args[1],
      revisions: { ...previous.revisions, [args[1]]: hash(JSON.stringify(files)) },
      files, assets: await localAssets(defaultProject)
    };
    await writeFile(file, JSON.stringify(manifest, null, 2) + '\n');
    console.log(JSON.stringify({ ok: true, nativeLayoutVersion: args[1] }));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
