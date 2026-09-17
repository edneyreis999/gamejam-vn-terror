import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve('rpg-maker/The Dryland Drowned');
const plan = path.resolve('planos/tasks/prologo-rheed');
const files = ['data/Map002.json', 'js/plugins.js', 'js/plugins/Dryland_CampaignRules.js'];
const original = Object.fromEntries(await Promise.all(files.map(async file => [file, await readFile(path.join(root, file), 'utf8')])));
const map = JSON.parse(original[files[0]]);
const list = map.events[1].pages[0].list;
assert.equal(map.note, '<drylandMap:prologue>');
assert.ok(list.some(c => c.code === 401 && c.parameters[0].startsWith('A chuva acompanha Ivaí')),
  'Expected the original prologue; this one-time authoring transformation must not overwrite later edits.');
const script = await readFile(path.join(plan, 'prologo-rheed.narrativa.md'), 'utf8');
const sections = [...script.matchAll(/## N(\d{2})[^\n]*\n([\s\S]*?)(?=\n## |$)/g)].map(match => {
  const text = match[2].match(/“([\s\S]*?)”/);
  assert.ok(text, `Missing approved text in N${match[1]}`);
  return { id: `prologue.rheed.${match[1]}`, text: text[1] };
});
assert.equal(sections.length, 6);
const pluginsSource = original[files[1]];
const offset = pluginsSource.indexOf('[');
const plugins = JSON.parse(pluginsSource.slice(offset).trim().replace(/;$/, ''));
const attached = plugins.find(p => p.name === 'VisuMZ_4_AttachedPictures');
assert.equal(attached.status, false);
attached.status = true;
// Attach only this scene's explicitly authored portrait, not existing global slots.
attached.parameters['PictureIDs:arraynum'] = '[]';
const rules = original[files[2]];
const oldPlan = "prologue: ['prologue.01', 'prologue.02', 'irati.01']";
assert.ok(rules.includes(oldPlan));
const picture = 60;
const command = (code, parameters, indent = 0) => ({ code, indent, parameters });
const plugin = (name, id, args) => command(357, [name, id, id, args]);
const attach = id => plugin('VisuMZ_4_AttachedPictures', id, { 'PictureID:arraynum': JSON.stringify([String(picture)]) });
const clear = () => [command(235, [picture]), attach('MessageRemovePicture')];
async function bust(name) {
  const png = await readFile(path.join(root, 'img/pictures', `${name}.png`));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  const scale = 48000 / height;
  return [...clear(), plugin('VisuMZ_2_VNPictureBusts', 'Basic_EnterBust', {
    'PictureID:eval': String(picture), 'PictureName:str': name, 'Origin:str': 'Upper Left',
    'Position:num': '5', 'StartOffsetX:eval': '0', 'StartOffsetY:eval': '0',
    'EasingType:str': 'Linear', 'HorzMirror:str': 'None', 'Duration:eval': '0'
  }), plugin('VisuMZ_2_VNPictureBusts', 'Scale_ScaleTo', {
    'PictureID:arrayeval': '["60"]', 'TargetScaleX:str': String(scale), 'TargetScaleY:str': String(scale), 'Duration:eval': '0'
  }), plugin('VisuMZ_2_VNPictureBusts', 'Move_MoveToCoordinates', {
    'PictureID:arrayeval': '["60"]', 'TargetX:str': `(Graphics.boxWidth - ${width * scale / 100}) / 2`,
    'TargetY:str': '-480', 'EasingType:str': 'Linear', 'FlipDirection:str': 'None', 'Duration:eval': '0'
  }), attach('MessageAddPicture')];
}
function boxes(text) {
  return text.split(/\n\s*\n/).flatMap(paragraph => {
    const lines = [];
    for (const word of paragraph.split(/\s+/)) {
      if (!lines.length || lines.at(-1).length + word.length + 1 > 84) lines.push(word);
      else lines[lines.length - 1] += ` ${word}`;
    }
    const result = [];
    for (let i = 0; i < lines.length; i += 4) result.push(lines.slice(i, i + 4));
    return result;
  });
}
const output = [command(241, [{ name: '', volume: 90, pitch: 100, pan: 0 }]),
  command(245, [{ name: '', volume: 90, pitch: 100, pan: 0 }]),
  command(249, [{ name: '', volume: 90, pitch: 100, pan: 0 }]), command(251, []), command(235, [1]),
  ...structuredClone(list.slice(2, 12))];
for (let i = 0; i < sections.length; i++) {
  if (i === 0) output.push(...await bust('Reed final'));
  if (i === 3 || i === 5) output.push(...await bust('Dryland_ivai'));
  if (i === 4) output.push(...clear());
  output.push(...structuredClone(list.slice(13, 23)));
  for (const lines of boxes(sections[i].text)) {
    output.push(command(101, ['', 0, 0, 2, i === 3 || i === 5 ? 'Ivaí' : 'Rheed']),
      ...lines.map(line => command(401, [line])));
  }
  output.push(...structuredClone(list.slice(25, 31)));
}
output.push(...clear(), ...structuredClone(list.slice(67)));
map.events[1].pages[0].list = output;
assert.equal(output.at(-1).code, 0);
assert.equal(output.filter(c => c.code === 201).length, 1);
assert.equal(output.filter(c => c.code === 357 && c.parameters[1] === 'ReadingComplete').length, 6);
const evidence = path.resolve('docs/qa/evidence/prologo-rheed/task-01');
await mkdir(evidence, { recursive: true });
await writeFile(path.join(evidence, 'baseline.json'), JSON.stringify({
  capturedAt: new Date().toISOString(), files: Object.fromEntries(files.map(file => [file, createHash('sha256').update(original[file]).digest('hex')])),
  prologue: list, asset: { path: 'img/pictures/Reed final.png', sha256: createHash('sha256').update(await readFile(path.join(root, 'img/pictures/Reed final.png'))).digest('hex') },
  baselineFormationSave: 'not captured: existing native Chrome helper requires unavailable python3 alias on this Windows host'
}, null, 2) + '\n');
await writeFile(path.join(root, files[0]), JSON.stringify(map) + '\n');
await writeFile(path.join(root, files[1]), pluginsSource.slice(0, offset) + JSON.stringify(plugins, null, 4) + ';\n');
await writeFile(path.join(root, files[2]), rules.replace(oldPlan, `prologue: ${JSON.stringify(sections.map(s => s.id))}`));
console.log('Updated Map002, AttachedPictures activation/explicit-only attachments, and six prologue passage identities.');
