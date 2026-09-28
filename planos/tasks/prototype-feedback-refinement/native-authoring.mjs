import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

export const game = 'rpg-maker/The Dryland Drowned';
export const command = (code, parameters = [], indent = 0) => ({ code, indent, parameters });
export const plugin = (owner, name, args = {}) => command(357, [owner, name, name, args]);
export const presentation = (name, args = {}) => plugin('Dryland_Presentation', name, args);
export const nested = list => list.map(item => ({ ...item, indent: item.indent + 1 }));
export const branch = (condition, yes, no = []) => [command(111, [12, condition]), ...nested(yes), ...(no.length ? [command(411), ...nested(no)] : []), command(412)];
export function choices(key, labels, bodies, cancel = -1, defaultIndex = 0) {
  return [presentation('ChoiceFocus', { key, remember: 'true', horizontal: 'false' }),
    command(102, [labels, cancel, defaultIndex, 2, 0]),
    ...labels.flatMap((label, index) => [command(402, [index, label]), ...nested(bodies[index]), command(0, [], 1)]), command(404)];
}
export const show = (id, asset, x, y, scaleX = 100, scaleY = scaleX) => command(231, [id, asset, 0, 0, x, y, scaleX, scaleY, 255, 0]);
export function text(id, value, position = 'center', padding = 12) {
  const args = { 'PictureIDs:arraynum': JSON.stringify([id]), 'Padding:eval': String(padding) };
  for (const key of ['upperleft','up','upperright','left','center','right','lowerleft','down','lowerright']) args[key + ':json'] = JSON.stringify(key === position ? value : '');
  return plugin('VisuMZ_1_MessageCore', 'PictureTextChange', args);
}
export function button(id, asset, label, x, y) {
  return [show(id, asset, x, y), text(id, '\\FS[26]' + label),
    plugin('VisuMZ_2_PictureChoices', 'ChangePictureChoiceSettingsOne', {
      'PictureIDs:arraynum': JSON.stringify([id]),
      ...Object.fromEntries([['OnSelectSettings:struct', 65], ['OnDeselectSettings:struct', 0]].map(([key, tone]) => [key, JSON.stringify({
        'Duration:num':'0', 'easingType:str':'Linear', 'TargetX:str':'Unchanged', 'TargetY:str':'Unchanged',
        'TargetScaleX:str':'Unchanged', 'TargetScaleY:str':'Unchanged', 'TargetOpacity:str':'Unchanged', 'BlendMode:num':'-1',
        'TargetToneRed:str':String(tone), 'TargetToneGreen:str':String(tone), 'TargetToneBlue:str':String(tone), 'TargetToneGray:str':'0'
      })]))
    })];
}
export const erase = ids => [...ids.map(id => command(235, [id])), plugin('VisuMZ_2_PictureChoices', 'ClearPictureID', { 'PictureIDs:arraynum': JSON.stringify(ids) })];

export function editMap(id, transform) {
  const file = game + '/data/Map' + String(id).padStart(3,'0') + '.json';
  const source = readFileSync(file,'utf8'), data = JSON.parse(source);
  const spaces = source.match(/\n( +)"/)?.[1].length;
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const encode = value => JSON.stringify(value,null,spaces).replace(/\n/g,newline);
  assert.equal(encode(data),source.trimEnd(),'Preserve native map formatting: ' + file);
  transform(data.events[1].pages[0].list, data);
  const output = encode(data) + source.slice(source.trimEnd().length);
  assert.deepEqual(JSON.parse(output),data);
  writeFileSync(file,output);
  console.log('Map',id);
}

export function message(prose, speaker = '', indent = 0) {
  const lines = [];
  for (const word of prose.split(/\s+/)) {
    if (!lines.length || lines.at(-1).length + word.length + 1 > 80) lines.push(word);
    else lines[lines.length - 1] += ' ' + word;
  }
  const list = [];
  for(let start=0;start<lines.length;start+=4) list.push(command(101,['',0,0,2,speaker],indent),...lines.slice(start,start+4).map(line=>command(401,[line],indent)));
  return list;
}

// Replace only selected native records, preserving every unrelated byte and the
// editor's current formatting. Appends require the current final array slot.
export function editCommonEvents(transform) {
  const file = game + '/data/CommonEvents.json', source = readFileSync(file, 'utf8');
  const before = JSON.parse(source), after = structuredClone(before);
  transform(after);
  let output = source;
  const spaces = source.match(/\n( +)null/)?.[1].length;
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const encode = value => spaces ? JSON.stringify(value, null, spaces).split('\n').map(line => ' '.repeat(spaces) + line).join(newline) : JSON.stringify(value);
  const changed = [];
  for (let id = 1; id < before.length; id++) {
    if (JSON.stringify(before[id]) === JSON.stringify(after[id])) continue;
    const old = encode(before[id]);
    assert.ok(output.includes(old), 'Native formatting changed for CE' + id);
    output = output.replace(old, encode(after[id]));
    changed.push(id);
  }
  if (after.length > before.length) {
    const tail = encode(after[before.length - 1]);
    const offset = output.lastIndexOf(tail);
    assert.ok(offset >= 0 && /^\s*\]\s*$/.test(output.slice(offset + tail.length)));
    output = output.slice(0, offset + tail.length) + ',' + newline + after.slice(before.length).map(encode).join(',' + newline) + output.slice(offset + tail.length);
    changed.push(...after.slice(before.length).map(event => event.id));
  }
  assert.deepEqual(JSON.parse(output), after);
  after.forEach((event, id) => { if (event) { assert.equal(event.id, id); assert.equal(event.list.at(-1).code, 0); } });
  writeFileSync(file, output);
  console.log('Common Events:', changed.join(', ') || 'already applied');
}

// Final UI plates in the existing Dryland_Button palette. Text is authored
// separately with MessageCore; no raster text or placeholder labels.
export function plate(name, width, height, style = 'button') {
  const file = game + '/img/pictures/' + name + '.png';
  if (existsSync(file)) return;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const edge = x < 2 || y < 2 || x >= width - 2 || y >= height - 2;
    const nail = [7,width-8].some(cx => [7,height-8].some(cy => (x-cx)**2+(y-cy)**2<=4));
    let color;
    if (style === 'black') color = [0,0,0,255];
    else if (style === 'text') color = [0,0,0,0];
    else if (style === 'board') {
      color = nail ? [157,139,104,255] : edge ? [100,73,44,255] : y%20===0 ? [48,34,23,255] : [68,48,30,255];
    } else {
      const innerFrame = (x===9||x===width-10) && y>=9 && y<height-9 || (y===9||y===height-10) && x>=9 && x<width-9;
      const diamond = [28,width/2,width-29].some(cx=>[28,height-29].some(cy=>{
        const distance=Math.abs(x-cx)+Math.abs(y-cy);return distance>=6&&distance<=8;
      }));
      color = edge || style === 'final' && (innerFrame || diamond) ? [139,123,79,255] : [34,30,23,255];
    }
    raw.set(color, y * (width * 4 + 1) + 1 + x * 4);
  }
  const crc = bytes => { let value = 0xffffffff; for (const byte of bytes) { value ^= byte; for (let i = 0; i < 8; i++) value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0); } return (value ^ 0xffffffff) >>> 0; };
  const chunk = (name, data) => { const kind = Buffer.from(name), size = Buffer.alloc(4), checksum = Buffer.alloc(4); size.writeUInt32BE(data.length); checksum.writeUInt32BE(crc(Buffer.concat([kind,data]))); return Buffer.concat([size,kind,data,checksum]); };
  const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height,4); header[8]=8; header[9]=6;
  writeFileSync(file, Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR',header),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
}
