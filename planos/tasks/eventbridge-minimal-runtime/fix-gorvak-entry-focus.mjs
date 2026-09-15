import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, read } from './native-migration-helpers.mjs';

// VN duration zero settles on the next frame. Do not replace it with a
// twenty-frame focus tween in the same entry tick (that starts at scale100).
const map = read('Map037.json');
const list = map.events[1].pages[0].list;
const starts = [list.findIndex(c => c.code === 118 && c.parameters[0] === 'hero'),
  list.findIndex(c => c.code === 357 && c.parameters[1] === 'ObservationBegin' && c.parameters[3].unit === '83')];
assert.ok(starts.every(index => index >= 0));
let changed = 0;
for (const start of starts) {
  const end = list.findIndex((c, index) => index > start && c.code === 101);
  assert.ok(end > start);
  for (const c of list.slice(start, end)) {
    if (c.code === 357 && ['Scale_ScaleTo', 'Tone_CustomToneBust'].includes(c.parameters[1]) && c.parameters[3]['Duration:eval'] === '20') {
      c.parameters[3]['Duration:eval'] = '0'; changed++;
    }
  }
}
assert.ok(changed === 0 || changed === 6);
let simplified = 0;
for (let index = list.length - 1; index >= 0; index--) {
  const command = list[index];
  if (command.code !== 111 || command.parameters[1] !== '$gameVariables.value(47)') continue;
  const otherwise = list.findIndex((c, i) => i > index && c.indent === command.indent && c.code === 411);
  const end = list.findIndex((c, i) => i > index && c.indent === command.indent && c.code === 412);
  if (otherwise < 0 || end < otherwise) continue;
  const yes = list.slice(index + 1, otherwise), no = list.slice(otherwise + 1, end);
  if (JSON.stringify(yes) !== JSON.stringify(no)) continue;
  list.splice(index, end - index + 1, ...yes.map(c => ({ ...c, indent: c.indent - 1 })));
  simplified++;
}
assert.equal(simplified, 2, 'Only the two immediate entrance/menu focus branches are identical');
fs.writeFileSync(root + 'data/Map037.json', JSON.stringify(map) + '\n');
assert.deepEqual(read('Map037.json'), map);
console.log('Initial H1/menu and Ivaí framing now settle immediately; later speaker focus retains authored motion.');
