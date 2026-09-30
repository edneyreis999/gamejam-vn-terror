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
const commands = context.list.filter(command => command.code === 241 &&
  ['Dungeon2', 'Dryland_Village_Combined'].includes(command.parameters[0].name));
assert.equal(commands.length, 1);
assert.equal(commands[0].indent, 3);
commands[0].parameters[0].name = 'Dryland_Village_Combined';
writeFileSync(path, source.replace(before, serialize(context)));
assert.deepEqual(JSON.parse(readFileSync(path, 'utf8'))[67], context);
