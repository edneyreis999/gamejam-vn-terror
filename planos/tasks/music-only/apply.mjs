import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = 'rpg-maker/The Dryland Drowned/data/';
for (const file of ['CommonEvents.json', 'Map002.json', 'System.json']) {
  const path = root + file;
  const source = readFileSync(path, 'utf8');
  const data = JSON.parse(source);
  const names = new Set();
  function silence(audio) {
    if (audio.name) names.add(audio.name);
    audio.name = '';
  }
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if ([245, 250].includes(value.code)) silence(value.parameters[0]);
    for (const child of Object.values(value)) visit(child);
  }
  if (file === 'System.json') data.sounds.forEach(silence);
  else visit(data);
  // Verify the text-preserving replacement against the structured mutation.
  let result;
  if (file === 'System.json') {
    result = source.replace(/("sounds"\s*:\s*)\[[\s\S]*?\]/,
      block => block.replace(/("name"\s*:\s*)"[^"\\]*"/g, '$1""'));
  } else {
    result = source.replace(/("name"\s*:\s*)"([^"\\]*)"/g,
      (match, prefix, name) => names.has(name) ? prefix + '""' : match);
  }
  assert.deepEqual(JSON.parse(result), data);
  writeFileSync(path, result);
  console.log(file + ': ' + names.size + ' sound names cleared');
}

const options = [
  ...['Cursor', 'OK', 'Cancel', 'Buzzer'].map(kind => ['/OptionsSettings/SFX' + kind + 'List', ['Default']]),
  ['/MasterVolShortcut/upName', ''],
  ['/MasterVolShortcut/downName', '']
];
for (const [path, value] of options) {
  execFileSync(process.execPath, ['coreto/tools/coreto/cli.mjs', '--project',
    'rpg-maker/The Dryland Drowned', 'options', 'parameters', 'set',
    '--path', path, '--value', JSON.stringify(value), '--json']);
}
