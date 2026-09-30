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
const track = 'Dryland_Park_ValleyOfGhosts';
if (!context.list.some(command => command.code === 241 && command.parameters[0].name === track)) {
  const index = context.list.findIndex(command => command.code === 241 && command.parameters[0].name === 'Dungeon2');
  assert.ok(index >= 0);
  const original = context.list[index];
  assert.equal(original.indent, 2);
  context.list.splice(index, 1,
    { code: 111, indent: 2, parameters: [12, "$gameVariables.value(34) === 'supernatural'"] },
    { code: 241, indent: 3, parameters: [{ ...original.parameters[0], name: track }] },
    { code: 411, indent: 2, parameters: [] },
    { ...original, indent: 3 },
    { code: 412, indent: 2, parameters: [] }
  );
}
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
