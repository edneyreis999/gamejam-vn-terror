import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, read, c, set, bridge, call } from './native-migration-helpers.mjs';

const targets = [];
const add = (map, event, common) => targets.push({ map, event, common });
add(3, 2, 4);
for (let hero = 1; hero <= 8; hero++) add(3, hero + 2, hero + 4);
for (const [event, common] of [[11, 38], [12, 39], [13, 117], [14, 351]]) add(3, event, common);
for (let map = 7; map <= 22; map++) add(map, 2, map + 6);
add(23, 2, 335); add(23, 3, 53);
for (let map = 25; map <= 27; map++) add(map, 2, map + 30);
for (let map = 29; map <= 36; map++) add(map, 2, 306 + (map - 29) * 2);
assert.equal(targets.length, 42);
const maps = new Map();
const indentation = new Map();
const inventory = [];
for (const target of targets) {
  const name = `Map${String(target.map).padStart(3, '0')}.json`;
  if (!maps.has(name)) {
    const source = fs.readFileSync(root + 'data/' + name, 'utf8');
    maps.set(name, JSON.parse(source));
    indentation.set(name, source.startsWith('{\n  ') ? 2 : undefined);
  }
  const map = maps.get(name);
  const event = map.events[target.event];
  assert.equal(event?.id, target.event, `${name}: expected original event ${target.event}`);
  assert.equal(event.pages.length, 1);
  const page = event.pages[0];
  assert.equal(page.trigger, 0);
  assert.equal(page.image.characterName, '');
  assert.equal(page.image.tileId, 0);
  assert.ok(Object.entries(page.conditions).filter(([key]) => key.endsWith('Valid')).every(([, value]) => value === false));
  const expected = target.map === 3 && target.event >= 3 && target.event <= 10
    ? [set(22, `H${target.event - 2}`), bridge('CaptureContext'), call(target.common), c(0)]
    : [call(target.common), c(0)];
  assert.deepEqual(page.list, expected, `${name}/event${target.event}: content changed since the survey`);
  inventory.push({ ...target, name: event.name });
  map.events[target.event] = null;
}
assert.equal(maps.size, 29);
// Validate everything before writing any map. Keep every surviving event and field.
for (const [name, map] of maps) {
  const before = read(name);
  assert.deepEqual(map.events.filter(Boolean), before.events.filter(event => event && !targets.some(target => name === `Map${String(target.map).padStart(3, '0')}.json` && target.event === event.id)));
  assert.deepEqual({ ...map, events: null }, { ...before, events: null });
}
for (const [name, map] of maps) {
  fs.writeFileSync(root + 'data/' + name, JSON.stringify(map, null, indentation.get(name)) + '\n');
  assert.deepEqual(read(name), map);
}
const events = read('CommonEvents.json');
const lists = events.filter(Boolean).map(event => event.list);
for (const name of fs.readdirSync(root + 'data').filter(name => /^Map\d+\.json$/.test(name))) {
  for (const event of read(name).events.filter(Boolean)) for (const page of event.pages) lists.push(page.list);
}
for (const list of lists) for (const command of list) {
  if (command.code === 117) assert.ok(events[command.parameters[0]], `Dangling Common Event: ${command.parameters[0]}`);
}
fs.writeFileSync('planos/tasks/eventbridge-minimal-runtime/removed-map-shortcuts.json', JSON.stringify(inventory, null, 2) + '\n');
console.log('Removed exactly 42 authoring shortcuts in 29 maps; preserved slots, surviving objects and Common Event destinations; all native calls resolve.');
