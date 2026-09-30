import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'rpg-maker/The Dryland Drowned/data/CommonEvents.json';
const source = readFileSync(path, 'utf8');
const events = JSON.parse(source);
const context = events[67];
assert.equal(context.name, 'Áudio — Contexto da campanha');
const newline = source.includes('\r\n') ? '\r\n' : '\n';
const serialize = value => JSON.stringify(value, null, 4).split('\n').map(line => '    ' + line).join(newline);
const before = serialize(context);
assert.ok(source.includes(before));
const start = context.list.findIndex(c => c.code === 111 && c.parameters[1] === "$gameVariables.value(31) === 'ending'");
assert.ok(start >= 0);
const condition = "['reunite', 'destroy'].includes($gameVariables.value(59))";
if (!context.list.some(c => c.code === 111 && c.parameters[1] === condition)) {
  const end = context.list.findIndex((c, i) => i > start && c.code === 412 && c.indent === 0);
  const original = context.list.slice(start, end + 1);
  assert.deepEqual(original.filter(c => c.code === 249).map(c => c.parameters[0].name), ['Musical1', 'Organ']);
  const marker = original.find(c => c.code === 122);
  assert.deepEqual(marker.parameters, [64, 64, 0, 4, '$gameVariables.value(59)']);
  context.list.splice(start, original.length,
    original[0],
    { code: 249, indent: 1, parameters: [{ name: '', volume: 65, pitch: 100, pan: 0 }] },
    { code: 111, indent: 1, parameters: [12, condition] },
    { code: 241, indent: 2, parameters: [{ name: 'Dryland_Opening_TheWell', volume: 35, pitch: 100, pan: 0 }] },
    { code: 411, indent: 1, parameters: [] },
    { ...original[1], indent: 2 },
    { code: 412, indent: 1, parameters: [] },
    original[2],
    { ...marker, indent: 1 },
    { code: 412, indent: 0, parameters: [] }
  );
}
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
