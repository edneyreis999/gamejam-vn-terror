import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const game = 'rpg-maker/The Dryland Drowned';
const root = game + '/data/';

// [file, event/common-event locator, command index, expected code, name to restore]
const system = ['Cursor3', 'Decision2', 'Cancel2', 'Buzzer1', 'Equip1', 'Save2', 'Load2', 'Battle1',
  'Run', 'Attack3', 'Damage4', 'Collapse1', 'Collapse2', 'Collapse3', 'Damage5', 'Collapse4',
  'Recovery', 'Miss', 'Evasion1', 'Evasion2', 'Reflection', 'Shop1', 'Item3', 'Item3'];
const commonEvents = [
  [47, 22, 250, 'Item3'], [48, 6, 250, 'Item3'], [48, 14, 250, 'Item3'],
  [67, 37, 245, 'People2'], [67, 41, 245, 'People1', 25],
  [67, 54, 245, 'Drips'], [67, 57, 245, 'Wind1'], [67, 60, 245, 'Darkness'],
  [67, 74, 250, 'Door1'], [67, 77, 250, 'Collapse1'], [67, 80, 250, 'Water1']
];

function edit(file, mutate, patchText) {
  const path = root + file;
  const source = readFileSync(path, 'utf8');
  const data = JSON.parse(source);
  mutate(data);
  let result;
  if (patchText) {
    // Map and System files are not uniformly indented; patch only the audio name text.
    result = patchText(source);
    assert.deepEqual(JSON.parse(result), data, file + ' text patch must match structured mutation');
  } else {
    assert.equal(JSON.stringify(JSON.parse(source), null, 4), source.replace(/\r?\n$/, ''), file + ' formatting must round-trip');
    result = JSON.stringify(data, null, 4) + (source.endsWith('\n') ? '\n' : '');
  }
  writeFileSync(path, result);
}
function restore(audio, name, where) {
  assert.equal(audio.name, '', where + ' must still be silent');
  audio.name = name;
}

edit('CommonEvents.json', data => {
  for (const [id, index, code, name, volume] of commonEvents) {
    const command = data[id].list[index];
    assert.equal(command.code, code, `CE ${id}[${index}] code`);
    restore(command.parameters[0], name, `CE ${id}[${index}]`);
    if (volume !== undefined) command.parameters[0].volume = volume;
  }
});
edit('Map002.json', data => {
  const command = data.events[1].pages[0].list[16];
  assert.equal(command.code, 250);
  restore(command.parameters[0], 'Applause1', 'Map002 event 1');
}, source => {
  let hits = 0;
  const out = source.replace(/("code":\s*250,\s*"indent":\s*\d+,\s*"parameters":\s*\[\s*\{\s*"name":\s*)""/g,
    (m, prefix) => { hits++; return prefix + '"Applause1"'; });
  assert.equal(hits, 1, 'Map002 has exactly one SE command');
  return out;
});
edit('System.json', data => {
  assert.equal(data.sounds.length, system.length);
  data.sounds.forEach((audio, i) => restore(audio, system[i], 'System.sounds[' + i + ']'));
}, source => {
  let i = 0;
  return source.replace(/("sounds"\s*:\s*)\[[\s\S]*?\n    \]/, block =>
    block.replace(/("name"\s*:\s*)""/g, (m, prefix) => prefix + JSON.stringify(system[i++])));
});

const options = [
  ['/OptionsSettings/SFXCursorList', ['Default', 'Book2', 'Coin', 'Cursor1', 'Cursor2', 'Hammer', 'Key', 'Knock', 'Open1', 'Open2', 'Open3', 'Paralyze1']],
  ['/OptionsSettings/SFXOKList', ['Default', 'Bell3', 'Computer', 'Decision2', 'Flash1', 'Bell3', 'Cat', 'Item1', 'Item2', 'Item3', 'Ice4', 'Decision1']],
  ['/OptionsSettings/SFXCancelList', ['Default', 'Absorb1', 'Book1', 'Cancel1', 'Cancel2', 'Raise2', 'Skill1', 'Dog', 'Shot2', 'Ice3', 'Magic1', 'Magic2']],
  ['/OptionsSettings/SFXBuzzerList', ['Default', 'Buzzer2', 'Fall', 'Skill2', 'Shot3', 'Bell1', 'Crow', 'Horn', 'Ice2', 'Magic3', 'Open4', 'Buzzer1']],
  ['/MasterVolShortcut/upName', 'Up1'],
  ['/MasterVolShortcut/downName', 'Down1']
];
for (const [path, value] of options) {
  execFileSync(process.execPath, ['coreto/tools/coreto/cli.mjs', '--project', game,
    'options', 'parameters', 'set', '--path', path, '--value', JSON.stringify(value), '--json']);
}
console.log('sound effects restored');
