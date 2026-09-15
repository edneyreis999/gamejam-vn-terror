import { readFile, realpath, mkdir } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

// Separate process: optional receipt imports cannot disable ordinary preparation.
const input = JSON.parse(await readFile(process.argv[2], 'utf8'));
const project = await realpath(input.project);
const adapter = await import(pathToFileURL(resolve(project, input.request.adapter)).href);
const parent = resolve(project, await adapter.fixtureDirectory?.({ project, request: input.request }) ?? dirname(input.fixture));
let ancestor = parent;
while (true) {
  try {
    const actual = resolve(await realpath(ancestor), relative(ancestor, parent));
    const part = relative(project, actual);
    if (part === '..' || part.startsWith('../') || isAbsolute(part)) throw new Error('Fixture destination outside project.');
    break;
  } catch (error) { if (error.code !== 'ENOENT') throw error; ancestor = dirname(ancestor); }
}
await mkdir(parent, { recursive: true });
const output = resolve(parent, input.owner.runId);
const prepared = await adapter.prepare({ project, output, scenario: input.request.scenario });
if (await realpath(prepared.fixture) !== await realpath(output)) throw new Error('Adapter returned a different fixture.');
console.log(JSON.stringify({ fixture: prepared.fixture }));
