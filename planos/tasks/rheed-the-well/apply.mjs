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
assert.equal(context.list[15].code, 111);
assert.ok(context.list[15].parameters[1].includes('closure.first.01'));
for (const [index, oldName] of [[17, 'Dryland_PrologueTavern_ManMadeWings'], [19, 'Town1']]) {
  const command = context.list[index];
  assert.equal(command.code, 241);
  assert.ok([oldName, 'Dryland_Opening_TheWell'].includes(command.parameters[0].name));
  command.parameters[0].name = 'Dryland_Opening_TheWell';
}
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
