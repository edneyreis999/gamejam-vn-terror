import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = 'docs/qa/evidence/eventbridge-minimal-runtime/task-14/20260912';
fs.mkdirSync(root, { recursive: true });
const manifest = JSON.parse(fs.readFileSync('rpg-maker/tests/test-manifest.json'));
const cases = Object.values(manifest.tasks).flat();
const results = new Map();
for (const name of ['full-current', 'focused-final']) {
  const source = `/tmp/eventbridge-task14-${name}.log`;
  const log = fs.readFileSync(source, 'utf8');
  fs.copyFileSync(source, `${root}/${name}.log`);
  for (const match of log.matchAll(/^(not ok|ok) \d+ - ((?:UT|IT)-\d{3})/gm)) {
    results.set(match[2], { result: match[1], log: `${name}.log` });
  }
}
for (const id of cases) assert.equal(results.get(id)?.result, 'ok', id);
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const game = 'rpg-maker/The Dryland Drowned';
const files = {};
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else files[path.relative(game, file)] = sha256(fs.readFileSync(file));
  }
}
visit(game);
const plugins = {};
vm.runInNewContext(fs.readFileSync(`${game}/js/plugins.js`, 'utf8'), plugins);
const candidate = {
  recordedAt: new Date().toISOString(),
  revision: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  dirty: execFileSync('git', ['status', '--short'], { encoding: 'utf8' }),
  node: process.version, chrome: '153.0.8010.36',
  engine: fs.readFileSync(`${game}/js/rmmz_core.js`, 'utf8').match(/Utils.RPGMAKER_VERSION = "([^"]+)"/)?.[1],
  origin: 'http://127.0.0.1:18726/',
  plugins: plugins.$plugins.filter(plugin => plugin.status).map(({ name, description }) => ({ name, description })),
  sha256: files,
  results: Object.fromEntries(cases.map(id => [id, results.get(id)])),
  limits: [
    'Full run exit1 retained: five obsolete fixture oracles and one browser raster-scale configuration corrected and rerun; retired IT030 is replaced by the passing native lifecycle owner IT075.',
    'Game data/plugins were unchanged throughout the full run. Test oracle/import and QA metadata edits made during that run are explicitly disposed in task14; focused-final freezes its actual inputs.',
    'Native integration is distinct from directed campaigns, editor interaction, audio perception and human acceptance.'
  ]
};
fs.writeFileSync(`${root}/candidate.json`, JSON.stringify(candidate, null, 2) + '\n');
console.log(`${cases.length} current canonical IDs have passing applicable evidence.`);
