import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = 'rpg-maker/The Dryland Drowned';
const mapFile = `${root}/data/Map002.json`;
const map = JSON.parse(await readFile(mapFile, 'utf8'));
const before = JSON.parse(execFileSync('git', ['show', `HEAD:${mapFile}`], { encoding: 'utf8' }));
const commands = map.events[1].pages[0].list;
map.events[1].pages[0].list = before.events[1].pages[0].list;
assert.deepEqual(map, before, 'No map fields outside the played event changed');
const narrative = await readFile('planos/tasks/prologo-rheed/prologo-rheed.narrativa.md', 'utf8');
const expected = [...narrative.matchAll(/## N\d{2}[^\n]*\n([\s\S]*?)(?=\n## |$)/g)]
  .map(match => match[1].match(/“([\s\S]*?)”/)[1].replace(/\s+/g, ' ').trim());
const actual = [];
let lines = [];
for (const command of commands) {
  if (command.code === 401) lines.push(command.parameters[0]);
  if (command.code === 357 && command.parameters[1] === 'ReadingComplete') {
    actual.push(lines.join(' ').replace(/\s+/g, ' ').trim());
    lines = [];
  }
}
assert.deepEqual(actual, expected, 'Native passages preserve the approved copy and order');
assert.equal(commands.filter(c => c.code === 101).length, 9);
assert.equal(commands.filter(c => c.code === 201).length, 1);
assert.equal(commands.filter(c => c.code === 117 && c.parameters[0] === 67).length, 0);
assert.equal(commands.filter(c => [241, 245, 249].includes(c.code) && c.parameters[0].name).length, 0);
const parsePlugins = source => JSON.parse(source.slice(source.indexOf('[')).trim().replace(/;$/, ''));
const pluginFile = `${root}/js/plugins.js`;
const plugins = parsePlugins(await readFile(pluginFile, 'utf8'));
const oldPlugins = parsePlugins(execFileSync('git', ['show', `HEAD:${pluginFile}`], { encoding: 'utf8' }));
const attached = oldPlugins.find(p => p.name === 'VisuMZ_4_AttachedPictures');
attached.status = true;
attached.parameters['PictureIDs:arraynum'] = '[]';
assert.deepEqual(plugins, oldPlugins, 'Only explicit AttachedPictures activation/settings change');
const files = [mapFile, pluginFile, `${root}/js/plugins/Dryland_CampaignRules.js`, `${root}/img/pictures/Reed final.png`];
const sha256 = Object.fromEntries(await Promise.all(files.map(async file => [file, createHash('sha256').update(await readFile(file)).digest('hex')])));
assert.equal(sha256[files[3]], 'ef2845c560e42eaa3c15827c110286ee714232f64cf2e713c9644071be207e18');
const result = { checkedAt: new Date().toISOString(), verdict: 'PASS', scope: 'Native text, map preservation, explicit plugin activation and unchanged supplied art; not visual/audio acceptance', sha256 };
await writeFile(path.resolve('docs/qa/evidence/prologo-rheed/task-01/static.json'), JSON.stringify(result, null, 2) + '\n');
console.log(result.verdict, result.scope);
