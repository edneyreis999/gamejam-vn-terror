// Complete the speaker multiplier migration for native single-speaker entries.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { parseEventCatalog } = require('../../../rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
const root = 'rpg-maker/The Dryland Drowned';
const file = `${root}/data/CommonEvents.json`, events = JSON.parse(await readFile(file, 'utf8'));
const system = JSON.parse(await readFile(`${root}/data/System.json`, 'utf8'));
system.drylandAssets = JSON.parse(await readFile(`${root}/native-layout-manifest.json`, 'utf8')).assets;
const parsed = parseEventCatalog(events, system);
assert.deepEqual(parsed.violations, []);
const edits = [];
for (const [id, location] of Object.entries(parsed.locations)) {
  const hero = /^(profile|selection|party_full|farewell|epilogue)\.H[1-8]$/.test(id);
  const right = /^lover\.(physical|supernatural)\.(warning|second)$/.test(id) || id === 'council.solo';
  if (!hero && !right) continue;
  const list = events[location.commonEventId].list;
  const first = list.findIndex((command, index) => index >= location.start && index < location.end && command.code === 101);
  assert.ok(first > location.start, id);
  assert.ok(!list.slice(location.start, first).some(command => command.code === 117 && command.parameters[0] >= 68 && command.parameters[0] <= 72), id);
  edits.push({ id, event: location.commonEventId, index: first, helper: hero ? 68 : 71, indent: list[first].indent });
}
assert.equal(edits.length, 45);
for (const edit of edits.sort((a, b) => b.event - a.event || b.index - a.index)) {
  events[edit.event].list.splice(edit.index, 0, { code: 117, indent: edit.indent, parameters: [edit.helper] });
}
assert.deepEqual(parseEventCatalog(events, system).violations, []);
await writeFile(file, '[\n' + events.map(event => JSON.stringify(event)).join(',\n') + '\n]\n');
console.log(JSON.stringify({ firstSpeakerFocusCalls: edits.length, newHelpers: 0, sections: edits.map(edit => edit.id) }));
