// One-shot migration from vn-slot-authorship. Current editor data is authoritative afterward.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { parsePluginList } from '../../../rpg-maker/tools/plugin-settings.mjs';

const project = 'rpg-maker/The Dryland Drowned';
const eventsFile = `${project}/data/CommonEvents.json`;
const events = JSON.parse(await readFile(eventsFile, 'utf8'));
const baseline = structuredClone(events);
const migrated = [];
function migrate(list) {
  for (let index = 0; index < list.length; index++) {
    const command = list[index], p = command.parameters;
    if (command.code !== 357 || p[0] !== 'Dryland_EventBridge' || p[1] !== 'Focus') continue;
    assert.deepEqual(p[3], { slot: p[3].slot, listenerScale: '90', listenerTone: '[-24,-24,-24,0]', offset: '16', duration: '20' });
    p[3] = { slot: p[3].slot };
    let end = index + 1;
    while (list[end]?.code === 657) end++;
    if (end > index + 1) list.splice(index + 1, end - index - 1, {
      code: 657, indent: command.indent, parameters: [`Picture em destaque (0 = neutro) = ${p[3].slot}`]
    });
    migrated.push(p[3].slot);
  }
}
for (const event of events.filter(Boolean)) migrate(event.list);
assert.deepEqual(migrated, ['60', '61', '62', '63', '64', '65', '0']);
assert.deepEqual(events.slice(0, 68), baseline.slice(0, 68));
assert.equal(events.length, baseline.length);

const pluginsFile = `${project}/js/plugins.js`;
const source = await readFile(pluginsFile, 'utf8');
const plugins = parsePluginList(source), previous = structuredClone(plugins);
const entries = plugins.filter(plugin => plugin.name === 'Dryland_EventBridge');
assert.equal(entries.length, 1);
const entry = entries[0], old = JSON.stringify(entry);
assert.equal(entry.status, true);
assert.deepEqual(entry.parameters, {});
entry.parameters = { ListenerDarkness: '24', ListenerScale: '90', SpeakerScale: '100', ListenerOffset: '16', FocusDuration: '20' };
assert.equal(source.split(old).length, 2);
const updated = source.replace(old, JSON.stringify(entry));
const checked = parsePluginList(updated);
assert.deepEqual(checked.filter(plugin => plugin.name !== entry.name), previous.filter(plugin => plugin.name !== entry.name));
await writeFile(pluginsFile, updated);
await writeFile(eventsFile, '[\n' + events.map(event => JSON.stringify(event)).join(',\n') + '\n]\n');
assert.deepEqual(JSON.parse(await readFile(eventsFile, 'utf8')), events);

const fixtureFile = 'rpg-maker/tests/fixtures/vn-picture-busts-2x2/recipe.json';
const fixture = JSON.parse(await readFile(fixtureFile, 'utf8'));
for (const helper of fixture.helpers) migrate(helper.list);
migrate(fixture.root);
await writeFile(fixtureFile, JSON.stringify(fixture, null, 2) + '\n');
console.log(JSON.stringify({ commonEvents: [68, 69, 70, 71, 72, 74, 79], parameters: entry.parameters, focusCallsIncludingFixture: migrated.length }));
