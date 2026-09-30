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
if (!context.list.some(command => command.code === 241 && command.parameters[0].name === 'Dryland_Revelation_TheLastKey')) {
  assert.equal(context.list[14].parameters[3].kind, 'readingIndex');
  const commands = [];
  for (const [phase, name] of [['council', 'Dryland_Revelation_TheLastKey'], ['final_choice', '']]) {
    commands.push(
      { code: 111, indent: 0, parameters: [12, `$gameVariables.value(31) === '${phase}'`] },
      { code: 241, indent: 1, parameters: [{ name, volume: 25, pitch: 100, pan: 0 }] },
      { code: 245, indent: 1, parameters: [{ name: '', volume: 60, pitch: 100, pan: 0 }] },
      { code: 115, indent: 1, parameters: [] },
      { code: 412, indent: 0, parameters: [] }
    );
  }
  context.list.splice(15, 0, ...commands);
}
const revelation = context.list.find(command => command.code === 241 && command.parameters[0].name === 'Dryland_Revelation_TheLastKey');
revelation.parameters[0].volume = 25;
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
