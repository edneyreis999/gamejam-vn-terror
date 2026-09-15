import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

// Preserve retired IDs using the empty record accepted by the MZ database editor.
const file = new URL('../../../rpg-maker/The Dryland Drowned/data/CommonEvents.json', import.meta.url);
const source = await readFile(file, 'utf8');
const before = JSON.parse(source);
assert.equal(before[0], null);
assert.equal(source, JSON.stringify(before, null, 4) + '\n');
const changed = [];
const events = before.map((event, id) => {
  if (id === 0) return null;
  if (event !== null) {
    assert.equal(event.id, id);
    return event;
  }
  changed.push(id);
  return { id, name: '', trigger: 0, switchId: 1, list: [{ code: 0, indent: 0, parameters: [] }] };
});
if (changed.length) await writeFile(file, JSON.stringify(events, null, 4) + '\n');
const after = JSON.parse(await readFile(file, 'utf8'));
assert.deepEqual(after, events);
assert.equal(after.length, before.length);
for (let id = 0; id < before.length; id++) {
  if (!changed.includes(id)) assert.deepEqual(after[id], before[id]);
}
console.log(JSON.stringify({ changedSlots: changed.length, ids: changed }));
