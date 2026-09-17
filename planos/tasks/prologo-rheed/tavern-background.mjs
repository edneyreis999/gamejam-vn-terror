import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const file = 'rpg-maker/The Dryland Drowned/data/Map002.json';
const map = JSON.parse(await readFile(file, 'utf8'));
const original = structuredClone(map);
const list = map.events[1].pages[0].list;
assert.equal(map.note, '<drylandMap:prologue>');
const events = JSON.parse(await readFile('rpg-maker/The Dryland Drowned/data/CommonEvents.json', 'utf8'));
const background = events[38].list.find(c => c.code === 231 && c.parameters[1] === 'Dryland_Taverna');
assert.deepEqual(background.parameters, [1, 'Dryland_Taverna', 1, 0, 640, 360, 100, 100, 255, 0]);
await readFile('rpg-maker/The Dryland Drowned/img/pictures/Dryland_Taverna.png');
assert.equal(list.filter(c => c.code === 101).length, 9);
const firstIvai = list.findIndex(c => c.code === 357 && c.parameters[1] === 'Basic_EnterBust' && c.parameters[3]['PictureName:str'] === 'Dryland_ivai');
assert.ok(firstIvai > 0);
assert.equal(list.filter(c => c.code === 231).length, 0, 'One-time edit: refuse to overwrite a later background change');
list.splice(firstIvai, 0, structuredClone(background));
const restored = structuredClone(map);
restored.events[1].pages[0].list.splice(firstIvai, 1);
assert.deepEqual(restored, original, 'Only the background command may change');
let visibleBackground = null;
const boxes = [];
for (const command of list) {
  if (command.code === 235 && command.parameters[0] === 1) visibleBackground = null;
  if (command.code === 231 && command.parameters[0] === 1) visibleBackground = command.parameters[1];
  if (command.code === 101) boxes.push(visibleBackground);
}
assert.deepEqual(boxes, [...Array(6).fill(null), ...Array(3).fill('Dryland_Taverna')]);
const output = JSON.stringify(map) + '\n';
assert.deepEqual(JSON.parse(output), map);
await writeFile(file, output);
console.log('Map002/event 1: black for older Rheed; existing tavern for N04–N06. One command inserted; other data unchanged.');
