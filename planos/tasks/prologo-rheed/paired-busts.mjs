import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const root = 'rpg-maker/The Dryland Drowned';
const file = `${root}/data/Map002.json`;
const map = JSON.parse(await readFile(file, 'utf8'));
const before = structuredClone(map);
const list = map.events[1].pages[0].list;
assert.equal(map.note, '<drylandMap:prologue>');
assert.equal(list.filter(c => c.code === 101).length, 9);
assert.ok(!JSON.stringify(list).includes('Reed-novo'), 'One-time transformation; refuse later edits');
const assets = {};
for (const name of ['Reed-novo', 'Dryland_ivai']) {
  const bytes = await readFile(`${root}/img/pictures/${name}.png`);
  assets[name] = { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}
const cmd = (code, parameters) => ({ code, indent: 0, parameters });
const plugin = (name, action, args) => cmd(357, [name, action, action, args]);
const attach = (action, ids) => plugin('VisuMZ_4_AttachedPictures', action, { 'PictureID:arraynum': JSON.stringify(ids.map(String)) });
const clear = () => [cmd(235, [60]), cmd(235, [61]), attach('MessageRemovePicture', [60, 61])];
function pose(id, name, center, speaking) {
  const height = speaking ? 480 : 480 / 1.1;
  const scale = height / assets[name].height * 100;
  return [plugin('VisuMZ_2_VNPictureBusts', 'Scale_ScaleTo', {
    'PictureID:arrayeval': JSON.stringify([String(id)]), 'TargetScaleX:str': String(scale),
    'TargetScaleY:str': String(scale), 'Duration:eval': '0'
  }), plugin('VisuMZ_2_VNPictureBusts', 'Move_MoveToCoordinates', {
    'PictureID:arrayeval': JSON.stringify([String(id)]),
    'TargetX:str': `Graphics.boxWidth * ${center} - ${assets[name].width * scale / 200}`,
    'TargetY:str': String(-height), 'EasingType:str': 'Linear', 'FlipDirection:str': 'None', 'Duration:eval': '0'
  })];
}
function enter(id, name) {
  return plugin('VisuMZ_2_VNPictureBusts', 'Basic_EnterBust', {
    'PictureID:eval': String(id), 'PictureName:str': name, 'Origin:str': 'Upper Left',
    'Position:num': '5', 'StartOffsetX:eval': '0', 'StartOffsetY:eval': '0',
    'EasingType:str': 'Linear', 'HorzMirror:str': 'None', 'Duration:eval': '0'
  });
}
const isPortrait = c => c.code === 235 && [60, 61].includes(c.parameters[0]) ||
  c.code === 357 && ['VisuMZ_2_VNPictureBusts', 'VisuMZ_4_AttachedPictures'].includes(c.parameters[0]);
let passage = 0;
const result = [];
for (const c of list) {
  if (passage >= 3 && isPortrait(c)) continue;
  if (c.code === 101 && passage >= 3) {
    if (passage === 3) result.push(...clear(), enter(60, 'Reed-novo'), enter(61, 'Dryland_ivai'));
    result.push(...pose(60, 'Reed-novo', .27, passage === 4), ...pose(61, 'Dryland_ivai', .73, passage !== 4));
    if (passage === 3) result.push(attach('MessageAddPicture', [60, 61]));
  }
  if (passage === 6 && c.code === 117 && c.parameters[0] === 44) result.push(...clear());
  result.push(c);
  if (c.code === 357 && c.parameters[1] === 'ReadingComplete') passage++;
}
assert.equal(passage, 6);
assert.deepEqual(result.filter(c => !isPortrait(c)), list.filter(c => !isPortrait(c)), 'Text, background, audio and flow must stay unchanged');
map.events[1].pages[0].list = result;
const otherFields = structuredClone(map);
otherFields.events[1].pages[0].list = before.events[1].pages[0].list;
assert.deepEqual(otherFields, before);
await writeFile(file, JSON.stringify(map) + '\n');
console.log('Map002: paired young Rheed/ Ivaí, anchored left/right; active speaker 10% larger; both slots detached on exit.');
