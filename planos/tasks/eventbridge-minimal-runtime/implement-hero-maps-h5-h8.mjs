import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, read, c, pc, erase, nest } from './native-migration-helpers.mjs';

// One-time task20 transformation. Later native-editor changes are authoritative.
const events = read('CommonEvents.json');
const infos = read('MapInfos.json');
const template = read('Map037.json');
const before = structuredClone(events);
const heroes = [
  { id: 'H5', name: 'Bimbren', slug: 'bimbren', ce: 9, unit: 98, map: 41, x: 345, y: 1095, scale: 45, listenerY: 1050 },
  { id: 'H6', name: 'Liora', slug: 'liora', ce: 10, unit: 102, map: 42, x: 342, y: 1072, scale: 44, listenerY: 1027 },
  { id: 'H7', name: 'Vaelith', slug: 'vaelith', ce: 11, unit: 106, map: 43, x: 395, y: 1513, scale: 43, listenerY: 1446 },
  { id: 'H8', name: 'Draska', slug: 'draska', ce: 12, unit: 110, map: 44, x: 280, y: 1125, scale: 51, listenerY: 1084 }
];
assert.equal(infos.length, 41, 'Allocate only after reconciling the live map inventory');
const retired = heroes.flatMap(hero => [hero.ce, ...Array.from({ length: 4 }, (_, i) => hero.unit + i)]);
const consumers = [];
function inspect(list, owner) {
  list.forEach((command, index) => {
    if (command.code === 117 && retired.includes(command.parameters[0])) consumers.push({ owner, index, target: command.parameters[0] });
  });
}
for (const event of events.filter(Boolean)) inspect(event.list, `CE${event.id}`);
for (const file of fs.readdirSync(root + 'data').filter(name => /^Map\d{3}\.json$/.test(name))) {
  for (const event of read(file).events.filter(Boolean)) for (const [page, value] of event.pages.entries()) inspect(value.list, `${file}/event${event.id}/page${page}`);
}
for (const troop of read('Troops.json').filter(Boolean)) for (const [page, value] of troop.pages.entries()) inspect(value.list, `Troop${troop.id}/page${page}`);
assert.equal(consumers.length, 20);
assert.ok(consumers.every(({ owner, target }) => owner === 'CE3' ? [9, 10, 11, 12].includes(target) : heroes.some(hero => owner === `CE${hero.ce}` && target >= hero.unit && target < hero.unit + 4)));

const maps = [];
for (const hero of heroes) {
  const filename = `Map${String(hero.map).padStart(3, '0')}.json`;
  assert.equal(fs.existsSync(root + 'data/' + filename), false);
  assert.equal(events[hero.ce]?.name, `Interagir — ${hero.name}`);
  const source = [];
  for (let offset = 0; offset < 4; offset++) {
    const event = events[hero.unit + offset];
    assert.equal(event?.name, `${['Perfil', 'Conversa', 'Selecionado', 'Grupo cheio'][offset]} — ${hero.name}`);
    assert.equal(event.trigger, 0);
    source.push(...event.list.filter(command => [101, 401].includes(command.code)));
  }
  assert.equal(source.filter(command => command.code === 101).length, 9);
  const map = structuredClone(template);
  map.note = `<drylandMap:${hero.slug}-interaction>`;
  const event = map.events[1];
  event.name = `Interagir — ${hero.name}`;
  const list = [];
  let textIndex = 0;
  for (const original of event.pages[0].list) {
    const command = structuredClone(original);
    const args = command.parameters[3];
    if ([101, 401].includes(command.code)) {
      if (command.code === 101 && command.parameters[4] === 'Gorvak' && textIndex === 0 && !list.some(row => row.code === 401)) command.parameters[4] = hero.name;
      else if (!(command.code === 401 && command.parameters[0] === 'Grupo: \\V[150]/\\V[151]')) {
        assert.equal(command.code, source[textIndex]?.code, 'Preserve the native text-box sequence');
        command.parameters = structuredClone(source[textIndex++].parameters);
      }
    }
    if (command.code === 108) command.parameters[0] = command.parameters[0].replace('ADR-005 experimental: esta é a interação jogável de Gorvak.', `ADR-G001 / ADR-006: esta é a interação jogável de ${hero.name}.`).replace(/Leitura (8[2-5]): (.*)/, (_, id) => `Leitura ${hero.unit + Number(id) - 82}: ${events[hero.unit + Number(id) - 82].name}. Identidade de leitura preservada.`);
    if (command.code === 357 && command.parameters[0] === 'Dryland_EventBridge') {
      if (args.id === 'H1') args.id = hero.id;
      if (args.value === 'H1') args.value = hero.id;
    }
    if (command.code === 357 && command.parameters[1] === 'ObservationBegin') args.unit = String(hero.unit + Number(args.unit) - 82);
    if (command.code === 357 && command.parameters[0] === 'VisuMZ_2_VNPictureBusts') {
      if (args['PictureName:str'] === 'Dryland_H1') args['PictureName:str'] = `Dryland_${hero.id}`;
      if (args['PictureID:arrayeval'] === '["60"]') {
        if (command.parameters[1] === 'Move_MoveToCoordinates') Object.assign(args, { 'TargetX:str': String(hero.x), 'TargetY:str': String(hero.y) });
        if (command.parameters[1] === 'Scale_ScaleTo') {
          const listener = args['TargetScaleX:str'] === '32';
          args['TargetScaleX:str'] = args['TargetScaleY:str'] = String(hero.scale - (listener ? 2 : 0));
          if (list.at(-1)?.parameters[1] !== 'Basic_EnterBust') list.push({ ...pc('VisuMZ_2_VNPictureBusts', 'Move_MoveToCoordinates', { 'PictureID:arrayeval': '["60"]', 'TargetX:str': String(hero.x), 'TargetY:str': String(listener ? hero.listenerY : hero.y), 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None', 'Duration:eval': args['Duration:eval'] }), indent: command.indent });
        }
      }
    }
    list.push(command);
  }
  assert.equal(textIndex, source.length);
  assert.deepEqual(list.filter(command => [101, 401].includes(command.code)).slice(2).map(command => command.parameters), source.map(command => command.parameters));
  event.pages[0].list = list;
  const caller = events[3].list;
  const index = caller.findIndex(command => command.code === 117 && command.parameters[0] === hero.ce);
  assert.ok(index >= 0);
  caller.splice(index, 1, ...nest([c(108, [`Interação editada no mapa filho Conversa — ${hero.name}.`]), ...erase(10, 17), ...erase(30, 37), ...erase(40, 44), c(201, [0, hero.map, 10, 7, 2, 2]), c(115)], caller[index].indent));
  infos.push({ id: hero.map, expanded: false, name: `Conversa — ${hero.name}`, order: hero.map, parentId: 3, scrollX: 0, scrollY: 0 });
  maps.push({ filename, map });
}
for (const id of retired) events[id] = null;
for (let id = 0; id < events.length; id++) if (id !== 3 && !retired.includes(id)) assert.deepEqual(events[id], before[id]);
for (const event of events.filter(Boolean)) for (const command of event.list) assert.ok(command.code !== 117 || !retired.includes(command.parameters[0]));

// Preserve the current four-space database formatting and untouched object order.
for (const [filename, data] of [['CommonEvents.json', events], ['MapInfos.json', infos]]) {
  const raw = fs.readFileSync(root + 'data/' + filename, 'utf8');
  assert.equal(raw, JSON.stringify(JSON.parse(raw), null, 4));
  fs.writeFileSync(root + 'data/' + filename, JSON.stringify(data, null, 4));
  assert.deepEqual(read(filename), data);
}
for (const { filename, map } of maps) {
  fs.writeFileSync(root + 'data/' + filename, JSON.stringify(map) + '\n');
  assert.deepEqual(read(filename), map);
}
console.log(JSON.stringify({ maps: heroes, removed: retired.map(id => ({ id, name: before[id].name })), originalConsumers: consumers }, null, 2));
