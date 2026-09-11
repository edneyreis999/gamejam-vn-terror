import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { parsePluginList } from '../../../rpg-maker/tools/plugin-settings.mjs';

const root = 'rpg-maker/The Dryland Drowned';
const file = `${root}/data/CommonEvents.json`;
const events = JSON.parse(await readFile(file, 'utf8'));
assert.equal(events.length, 80, 'Expected the accepted 12-helper baseline');
const narrative = events.slice(0, 68).map(event => event?.list.filter(c => [101, 401, 102, 402, 403, 404].includes(c.code)));
const command = (name, args, indent = 0) => ({ code: 357, indent, parameters: ['VisuMZ_2_VNPictureBusts', name, name, args] });
const transforms = (slot, x, y, scale, tone, duration = 20) => {
  const common = { 'PictureID:arrayeval': JSON.stringify([String(slot)]), 'Duration:eval': String(duration) };
  return [
    command('Scale_ScaleTo', { ...common, 'TargetScaleX:str': String(scale), 'TargetScaleY:str': String(scale) }),
    command('Move_MoveToCoordinates', { ...common, 'TargetX:str': String(x), 'TargetY:str': String(y), 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None' }),
    command('Tone_CustomToneBust', { ...common, 'customTone:eval': JSON.stringify(tone) })
  ];
};
const council = [[60,200,650,60],[61,420,650,60],[62,640,650,60],[63,960,850,100],[64,1120,850,100],[65,330,500,100]];
const tavern = [[60,200,725,100],[63,960,850,100]];
function nativeFocus(bases, active) {
  return bases.flatMap(([slot,x,y,scale]) => {
    const listener = active !== 0 && slot !== active;
    return transforms(slot, x + (listener && slot !== 65 ? (slot < 63 ? -16 : 16) : 0), y,
      scale * (listener ? 0.9 : 1), listener ? [-24,-24,-24,0] : [0,0,0,0]);
  });
}
function helper(id, name, commands) {
  return { id, name: `Bustos — ${name}`, trigger: 0, switchId: 1,
    list: [{ code: 108, indent: 0, parameters: [`@dryland-presentation-helper ${name}`] }, ...commands, { code: 0, indent: 0, parameters: [] }] };
}
for (const [id,slot] of [[68,60],[69,61],[70,62],[71,63],[72,64],[79,0]]) {
  assert.equal(events[id].list[1].parameters[1], 'Focus');
  events[id] = helper(id, slot ? `conselho.falante${slot}` : 'conselho.neutro', nativeFocus(council,slot));
}
events.push(helper(80, 'taverna.heroi', nativeFocus(tavern,60)));
events.push(helper(81, 'taverna.ivai', nativeFocus(tavern,63)));
let removed = 0, migrated = 0;
for (const event of events.slice(1,68)) {
  let section = '';
  event.list = event.list.flatMap(c => {
    if ([108,408].includes(c.code)) {
      const match = /@dryland-section ([^\s]+)/.exec(c.parameters[0]);
      if (match) section = match[1];
    }
    if (c.code === 357 && c.parameters[0] === 'Dryland_EventBridge' && c.parameters[1] === 'Conversation') delete c.parameters[3].slots;
    if (c.code !== 117 || ![68,71].includes(c.parameters[0])) return [c];
    if (section.startsWith('speech.')) { c.parameters[0] = c.parameters[0] === 68 ? 80 : 81; migrated++; return [c]; }
    if (/^(profile|selection|party_full|farewell|epilogue|lover)\./.test(section) || section === 'council.solo') { removed++; return []; }
    return [c];
  });
}
events[74].list = events[74].list.flatMap(c => c.code === 357 && c.parameters[0] === 'Dryland_EventBridge' && c.parameters[1] === 'Focus'
  ? nativeFocus(council.filter(([id]) => [63,65].includes(id)),65) : [c]);
assert.deepEqual(events.slice(0,68).map(event => event?.list.filter(c => [101,401,102,402,403,404].includes(c.code))), narrative);
assert.ok(!events.some(e => e?.list.some(c => c.code === 357 && c.parameters[0] === 'Dryland_EventBridge' && c.parameters[1] === 'Focus')));
const output = '[\n' + events.map(e => JSON.stringify(e)).join(',\n') + '\n]\n';
await writeFile(file, output);
assert.deepEqual(JSON.parse(await readFile(file,'utf8')), events);

const pluginFile = `${root}/js/plugins.js`, source = await readFile(pluginFile,'utf8');
const plugins = parsePluginList(source), entry = plugins.filter(p => p.name === 'Dryland_EventBridge');
assert.equal(entry.length,1);
const before = JSON.stringify(entry[0]);
assert.equal(entry[0].parameters.SpeakerScale,'100');
entry[0].parameters = {};
await writeFile(pluginFile,source.replace(before,JSON.stringify(entry[0])));
assert.deepEqual(parsePluginList(await readFile(pluginFile,'utf8')), plugins);
console.log({file, migrated, redundantSoloFocusRemoved:removed, helpers:events.length-68});

const fixtureFile = 'rpg-maker/tests/fixtures/vn-picture-busts-2x2/recipe.json';
const fixture = JSON.parse(await readFile(fixtureFile,'utf8'));
const fixtureBases = [[60,210,650,60],[61,470,650,60],[63,810,650,60],[64,1100,650,60]];
for (const helper of fixture.helpers) {
  helper.list = helper.list.flatMap(c => c.code === 357 && c.parameters[0] === 'Dryland_EventBridge' && c.parameters[1] === 'Focus'
    ? nativeFocus(fixtureBases,Number(c.parameters[3].slot)).map(replacement => ({...replacement,indent:c.indent})) : [c]);
}
for (const c of fixture.root) if (c.code === 357 && c.parameters[0] === 'Dryland_EventBridge' && c.parameters[1] === 'Conversation') delete c.parameters[3].slots;
await writeFile(fixtureFile,JSON.stringify(fixture,null,2)+'\n');
