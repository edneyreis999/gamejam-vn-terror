import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { root } from './native-migration-helpers.mjs';

// Restore the parent's serialization style after the initial removal run.
const base = 'de4f9768c8fda6cdd075e662fc66e02244ec3d06';
const inventory = JSON.parse(fs.readFileSync('planos/tasks/eventbridge-minimal-runtime/removed-map-shortcuts.json'));
let formatted = 0;
for (const id of new Set(inventory.map(entry => entry.map))) {
  const file = root + `data/Map${String(id).padStart(3, '0')}.json`;
  const original = execFileSync('git', ['show', `${base}:${file}`], { encoding: 'utf8' });
  if (!original.startsWith('{\n  ')) continue;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const output = JSON.stringify(data, null, 2) + '\n';
  assert.deepEqual(JSON.parse(output), data);
  fs.writeFileSync(file, output);
  formatted++;
}
assert.equal(formatted, 28);
console.log('Preserved two-space serialization in all28 originally formatted maps; no data changed.');
