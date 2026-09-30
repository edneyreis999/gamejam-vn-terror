import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'rpg-maker/The Dryland Drowned/data/CommonEvents.json';
const source = readFileSync(path, 'utf8');
const events = JSON.parse(source);
const context = events[67];
assert.equal(context.name, 'Áudio — Contexto da campanha');
const serialize = value => JSON.stringify(value, null, 4).split('\n').map(line => '    ' + line).join('\n');
const before = serialize(context);
assert.ok(source.includes(before));
const track = 'Dryland_PrologueTavern_ManMadeWings';
if (!context.list.some(command => command.code === 241 && command.parameters[0].name === track)) {
  const tavern = context.list.filter(command => command.code === 241 && command.parameters[0].name === 'Town3');
  assert.equal(tavern.length, 1);
  tavern[0].parameters[0].name = track;
  const index = context.list.findIndex(command => command.code === 241 && command.parameters[0].name === 'Town1');
  assert.ok(index >= 0);
  const original = context.list[index];
  assert.equal(original.indent, 1);
  context.list.splice(index, 1,
    { code: 111, indent: 1, parameters: [12, "['prologue.rheed.01','prologue.rheed.02','prologue.rheed.03'].includes($gameVariables.value(56))"] },
    { code: 241, indent: 2, parameters: [{ name: track, volume: 35, pitch: 100, pan: 0 }] },
    { code: 411, indent: 1, parameters: [] },
    { ...original, indent: 2 },
    { code: 412, indent: 1, parameters: [] }
  );
}
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
