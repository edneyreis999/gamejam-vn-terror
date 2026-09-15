import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, read, nest } from './native-migration-helpers.mjs';

// One-time task21 operation; the native map remains the authoring source.
const events = read('CommonEvents.json');
const map = read('Map002.json');
const retired = [1, 114, 115, 116];
const before = structuredClone(events);
assert.equal(events[1]?.name, 'História — Prólogo');
assert.deepEqual(events[1].list.filter(command => command.code === 117).map(command => command.parameters[0]), [114, 115, 116]);
function inline(list) {
  return list.flatMap(command => command.code === 117 && retired.includes(command.parameters[0])
    ? nest(inline(events[command.parameters[0]].list.slice(0, -1)), command.indent)
    : [structuredClone(command)]);
}
const page = map.events[1].pages[0];
assert.equal(page.list.filter(command => command.code === 117 && command.parameters[0] === 1).length, 1);
page.list = inline(page.list);
assert.equal(page.list.filter(command => command.code === 401).length, 3);
assert.equal(page.list.filter(command => command.code === 357 && command.parameters[1] === 'ReadingComplete').length, 3);
for (const id of retired) events[id] = null;
for (const file of fs.readdirSync(root + 'data').filter(name => /^(Map\d{3}|Troops)\.json$/.test(name))) {
  const data = file === 'Map002.json' ? map : read(file);
  const lists = file === 'Troops.json' ? data.filter(Boolean).flatMap(troop => troop.pages.map(page => page.list)) : data.events.filter(Boolean).flatMap(event => event.pages.map(page => page.list));
  for (const list of lists) for (const command of list) assert.ok(command.code !== 117 || !retired.includes(command.parameters[0]), `${file} retains retired call`);
}
for (const event of events.filter(Boolean)) {
  assert.deepEqual(event, before[event.id]);
  for (const command of event.list) assert.ok(command.code !== 117 || !retired.includes(command.parameters[0]));
}
for (const [file, value] of [['CommonEvents.json', events], ['Map002.json', map]]) {
  const raw = fs.readFileSync(root + 'data/' + file, 'utf8');
  const style = raw === JSON.stringify(JSON.parse(raw), null, 4) ? 4 : null;
  assert.ok(style || raw.trim() === JSON.stringify(JSON.parse(raw)), `Unknown formatting: ${file}`);
  fs.writeFileSync(root + 'data/' + file, JSON.stringify(value, null, style) + (raw.endsWith('\n') ? '\n' : ''));
  assert.deepEqual(read(file), value);
}
console.log(JSON.stringify({ map: 2, event: 1, removed: retired.map(id => ({ id, name: before[id].name })) }, null, 2));
