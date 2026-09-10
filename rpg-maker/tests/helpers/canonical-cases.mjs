import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

export const manifest = JSON.parse(readFileSync(new URL('../test-manifest.json', import.meta.url), 'utf8'));
const registered = [];
const runStarted = new Date().toISOString();
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export function assertRegistrations(contract, ids) {
  assert.ok(contract?.tasks && typeof contract.tasks === 'object', 'Missing test manifest');
  const expected = Object.values(contract.tasks).flat();
  assert.ok(expected.length > 0, 'Empty test manifest');
  assert.ok(expected.every(id => /^(UT|IT)-\d{3}$/.test(id)), 'Invalid canonical ID');
  assert.equal(new Set(expected).size, expected.length, 'Duplicate manifest ID');
  assert.equal(new Set(ids).size, ids.length, 'Duplicate test registration');
  assert.deepEqual([...ids].sort(), expected.sort(), 'Missing or unexpected test registration');
}
export function verifyRegistrations() { assertRegistrations(manifest, registered); }

async function evidence(id, verdict, error) {
  const owner = Object.entries(manifest.tasks).find(([, ids]) => ids.includes(id))?.[0];
  assert.ok(owner, `Unowned canonical case ${id}`);
  const sha256 = {};
  for (const directory of ['rpg-maker/tests', 'rpg-maker/tools', 'rpg-maker/The Dryland Drowned/data']) {
    async function visit(current) {
      for (const entry of await readdir(current, { withFileTypes: true })) {
        const file = path.join(current, entry.name);
        if (entry.isDirectory()) await visit(file);
        else if (/\.(mjs|json)$/.test(entry.name)) sha256[file] = hash(await readFile(file));
      }
    }
    await visit(directory);
  }
  for (const file of ['js/plugins.js', 'js/plugins/Dryland_CampaignRules.js', 'js/plugins/Dryland_EventBridge.js', 'native-layout-manifest.json']) {
    const full = `rpg-maker/The Dryland Drowned/${file}`;
    sha256[full] = hash(await readFile(full));
  }
  const directory = `docs/qa/evidence/init-rpg-maker-mz/task-${owner}/${id}`;
  await mkdir(directory, { recursive: true });
  const filters = process.execArgv.filter(arg => arg.startsWith('--test-name-pattern')).map(arg => JSON.stringify(arg));
  await writeFile(`${directory}/execution.json`, JSON.stringify({ id, verdict, runStarted, finished: new Date().toISOString(),
    command: ['node --test', ...filters, 'rpg-maker/tests/*.test.mjs'].join(' '), node: process.version, scope: manifest.scope,
    ...(error ? { error: error.message } : {}), sha256 }, null, 2) + '\n');
}

export function canonicalCase(id, title, options, body) {
  if (typeof options === 'function') { body = options; options = {}; }
  registered.push(id);
  test(`${id} — ${title}`, options, async t => {
    try {
      await body(t);
      await evidence(id, 'PASS');
    } catch (error) {
      await evidence(id, 'FAIL', error);
      throw error;
    }
  });
}
