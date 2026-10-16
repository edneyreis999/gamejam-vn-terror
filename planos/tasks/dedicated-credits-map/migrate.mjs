import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../../../rpg-maker/The Dryland Drowned/data/', import.meta.url);
const read = name => JSON.parse(readFileSync(new URL(name, root), 'utf8'));
const common = read('CommonEvents.json');
const infos = read('MapInfos.json');
assert.equal(infos[46], undefined, 'Map 46 must be available');
assert.equal(common[61].list.filter(c => c.code === 117 && c.parameters[0] === 63).length, 1);
assert.equal(common[63].list[0].code, 105);

const map = read('Map028.json');
const event = map.events[1];
event.name = 'Créditos — apresentação';
event.pages[0].list = common[61].list.flatMap(c =>
  c.code === 117 && c.parameters[0] === 63 ? common[63].list.slice(0, -1) : [c]);
map.events = [null, event];
const transfer = { code: 201, indent: 0, parameters: [0, 46, 10, 7, 2, 0] };
common[61].list = [transfer, { code: 0, indent: 0, parameters: [] }];
common[61].name = 'Encerramento — Ir aos créditos';
common[63].name = '';
common[63].list = [{ code: 0, indent: 0, parameters: [] }];
const route = common[40].list;
const start = route.findIndex(c => c.code === 111 && c.parameters[1] === "$gameVariables.value(31) === 'campaign_complete'");
assert.ok(start >= 0);
assert.equal(route[start + 1].parameters[1], '$gameMap.mapId() !== 28');
assert.equal(route[start + 2].code, 201);
route[start + 1].parameters[1] = '$gameMap.mapId() !== 46';
route[start + 2].parameters[1] = 46;
assert.equal(route[start + 5].parameters[0], 61);
route.splice(start + 5, 1);
infos[46] = { id: 46, expanded: false, name: 'Créditos', order: Math.max(...infos.filter(Boolean).map(m => m.order)) + 1, parentId: 0, scrollX: 0, scrollY: 0 };

const outputs = [['CommonEvents.json', common, 4], ['MapInfos.json', infos, 4], ['Map046.json', map, 0]];
for (const [name, data, spaces] of outputs) {
  writeFileSync(new URL(name, root), JSON.stringify(data, null, spaces));
  assert.deepEqual(read(name), data);
}
assert.equal(read('Map046.json').events[1].pages[0].trigger, 3);
console.log('Created Map046; moved CE61/63 presentation into its autorun; routed terminal CE40 to Map046.');
