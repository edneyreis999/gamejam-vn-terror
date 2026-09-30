import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'rpg-maker/The Dryland Drowned/data/CommonEvents.json';
const source = readFileSync(path, 'utf8');
const events = JSON.parse(source);
const opening = events[2];
assert.equal(opening.name, 'Interface — Título');
assert.equal(opening.list[0].code, 241);
const bgm = opening.list[0].parameters[0];
assert.ok(['', 'Dryland_Opening_TheWell'].includes(bgm.name));
const serialize = value => JSON.stringify(value, null, 4).split('\n').map(line => '    ' + line).join('\n');
const before = serialize(opening);
assert.ok(source.includes(before));
bgm.name = 'Dryland_Opening_TheWell';
writeFileSync(path, source.replace(before, serialize(opening)));
assert.equal(JSON.parse(readFileSync(path, 'utf8'))[2].list[0].parameters[0].name, bgm.name);
