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
const index = context.list.findIndex(command => command.code === 111 &&
  command.parameters[1] === "$gameVariables.value(31) === 'final_choice'");
assert.ok(index >= 0);
const cue = context.list[index + 1];
assert.equal(cue.code, 241);
assert.ok(['', 'Dryland_FinalChoice_UndeadKillingSpree'].includes(cue.parameters[0].name));
cue.parameters[0].name = 'Dryland_FinalChoice_UndeadKillingSpree';
cue.parameters[0].volume = 18;
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
