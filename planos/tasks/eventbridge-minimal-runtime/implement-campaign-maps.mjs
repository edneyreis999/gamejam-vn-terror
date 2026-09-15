import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, read, c, call, bridge, branch, nest, set } from './native-migration-helpers.mjs';

// Historical, one-time task slices. Native event lists remain authoritative.
const task = Number(process.argv[2]);
assert.ok([22, 23, 24, 25, 26, 27, 28].includes(task), 'Choose the approved migration slice');
const events = read('CommonEvents.json');
const before = structuredClone(events);
const maps = new Map();
const retired = [];
const flow = events[40].list;

function span(list, condition, indent = 0) {
  const start = list.findIndex(command => command.code === 111 && command.indent === indent && command.parameters[1] === condition);
  assert.ok(start >= 0, `Missing native branch: ${condition}`);
  const end = list.findIndex((command, index) => index > start && command.code === 412 && command.indent === indent);
  assert.ok(end > start);
  return { start, end };
}
function removeBranch(list, condition, indent = 0) {
  const { start, end } = span(list, condition, indent);
  return list.splice(start, end - start + 1);
}
function route(condition, mapId) {
  // Exit also when already on the target: its autorun owns the next command.
  const route = branch(condition, [...branch(`$gameMap.mapId() !== ${mapId}`, [c(201, [0, mapId, 10, 7, 2, 0])]), c(115)]);
  const index = flow.findIndex(command => command.code === 117 && command.parameters[0] === 67);
  assert.ok(index >= 0);
  flow.splice(index, 0, ...route);
}
function ownMap(mapId, condition, body) {
  const name = `Map${String(mapId).padStart(3, '0')}.json`;
  const map = read(name), page = map.events[1].pages[0];
  assert.deepEqual(page.list.slice(-2), [call(40), c(0)], `${name} must still be the original campaign entry`);
  const prefix = page.list.slice(0, -2);
  assert.ok(prefix.every(command => command.code === 231 && command.parameters[0] === 1), 'Preserve only the original encounter backdrop prefix');
  page.list = [...prefix, c(118, ['scene']), call(304),
    ...branch(`!(${condition})`, [call(40), c(115)]),
    call(67), ...body, call(44), c(119, ['scene']), c(0)];
  maps.set(name, map);
}
function inline(list, ids) {
  return list.flatMap(command => command.code === 117 && ids.includes(command.parameters[0])
    ? nest(inline(events[command.parameters[0]].list.slice(0, -1), ids), command.indent)
    : [structuredClone(command)]);
}

for (const hero of task === 22 ? [1] : task === 23 ? [2, 3, 4, 5, 6, 7, 8] : []) {
  const id = 304 + hero * 2;
  assert.equal(events[id]?.name, `epilogue.H${hero}`);
  const condition = `$gameVariables.value(31) === 'epilogue' && $gameVariables.value(60) === 'H${hero}'`;
  const { start: phaseStart } = span(flow, "$gameVariables.value(31) === 'epilogue'");
  const preparation = flow.slice(phaseStart).findIndex(command => command.code === 117 && command.parameters[0] === 337) + phaseStart;
  const background = structuredClone(flow[preparation + 1]);
  assert.equal(background.code, 231); background.indent = 0;
  ownMap(28 + hero, condition, [call(337), background, bridge('CaptureContext'), ...structuredClone(events[id].list.slice(0, -1)), bridge('ReadingComplete')]);
  removeBranch(flow, `$gameVariables.value(60) === 'H${hero}'`, 1);
  removeBranch(events[41].list, `$gameVariables.value(56) === "epilogue.H${hero}"`);
  route(condition, 28 + hero);
  retired.push(id);
}
if (task === 23) removeBranch(flow, "$gameVariables.value(31) === 'epilogue'");
if (task === 24) {
  retired.push(55, 56, 57, 329, 330, 331, 332, 333, 334, 336);
  for (const [ending, mapId, eventId] of [['reunite', 25, 55], ['destroy', 26, 56], ['bad', 27, 57]]) {
    const { start, end } = span(flow, `$gameVariables.value(59) === '${ending}'`, 1);
    const background = structuredClone(flow.slice(start, end).find(command => command.code === 231));
    assert.ok(background); background.indent = 0;
    const condition = `$gameVariables.value(31) === 'ending' && $gameVariables.value(59) === '${ending}'`;
    ownMap(mapId, condition, [call(337), background, ...inline(events[eventId].list.slice(0, -1), retired)]);
    route(condition, mapId);
  }
  removeBranch(flow, "$gameVariables.value(31) === 'ending'");
}
if (task === 25) {
  retired.push(41, 53, 54, 335, ...Array.from({ length: 8 }, (_, index) => 305 + index * 2), ...Array.from({ length: 8 }, (_, index) => 321 + index));
  const condition = "['council','final_choice'].includes($gameVariables.value(31))";
  const { start, end } = span(flow, condition);
  const background = structuredClone(flow.slice(start, end).find(command => command.code === 231));
  assert.ok(background); background.indent = 0;
  ownMap(23, condition, [call(337), background,
    ...branch("$gameVariables.value(31) === 'council'", [...inline(events[335].list.slice(0, -1), retired), call(44), c(119, ['scene'])]),
    ...inline(events[53].list.slice(0, -1), retired)]);
  removeBranch(flow, condition);
  route(condition, 23);
}
if (task >= 26) {
  const phases = ['encounter_intro', 'encounter_choice', 'approach_result', 'retreat_confirmation', 'sacrifice_choice', 'death_result', 'automatic_retreat'];
  const encounterNumbers = task === 26 ? [0] : task === 27 ? [1, 2, 3, 4, 5, 6, 7] : [8, 9, 10, 11, 12, 13, 14, 15];
  function localPhase(phase) {
    const { start, end } = span(flow, `$gameVariables.value(31) === '${phase}'`);
    return structuredClone(flow.slice(start, end + 1)).map(command => {
      if (command.code === 119 && command.parameters[0] === 'campaign') command.parameters[0] = 'scene';
      return command;
    });
  }
  for (const number of encounterNumbers) {
    const id = `${number < 8 ? 'A' : 'B'}${number % 8 + 1}`, mapId = 7 + number, controller = 13 + number, unit = 118 + number * 9;
    assert.equal(events[controller]?.name, `Encontro — ${id}`);
    assert.equal(events[unit]?.name, `encounter.${id}.01`);
    const privateIds = [controller, ...Array.from({ length: 7 }, (_, index) => unit + index), unit + 8];
    const source = events[controller].list;
    const descriptionSpan = span(source, `$gameVariables.value(56) === "encounter.${id}.01"`);
    const results = inline(source.slice(descriptionSpan.end + 1, -1), privateIds);
    assert.equal(results.filter(command => command.code === 401).length, 6);
    const rereadSpan = span(source, "$gameVariables.value(21) === 'reread'");
    const cleanup = nest(source.slice(rereadSpan.start + 1, rereadSpan.end).filter(command => command.code === 235), -1);
    const choice = localPhase('encounter_choice');
    const reread = span(choice, "$gameVariables.value(23) === 'reread'", 1);
    choice.splice(reread.start, reread.end - reread.start + 1,
      ...nest(branch("$gameVariables.value(23) === 'reread'", [set(21, 'reread'), ...cleanup, c(119, ['description'])]), 1));
    const nativeChoice = choice.flatMap(command => command.code === 117 && command.parameters[0] === 262
      ? nest(events[unit + 8].list.slice(0, -1), command.indent) : [command]);
    const condition = `${JSON.stringify(phases)}.includes($gameVariables.value(31)) && $gameVariables.value(32) === '${id}'`;
    ownMap(mapId, condition, [
      ...branch("$gameVariables.value(31) === 'encounter_intro'", [c(119, ['description'])]),
      ...nativeChoice,
      ...branch("$gameVariables.value(31) === 'approach_result'", [...results, call(44), c(119, ['scene'])]),
      ...phases.slice(3).flatMap(localPhase),
      c(118, ['description']),
      ...branch("$gameVariables.value(21) !== 'reread'", [bridge('CaptureContext')]),
      ...structuredClone(events[unit].list.slice(0, -1)),
      ...branch("$gameVariables.value(21) !== 'reread'", [bridge('ReadingComplete')])
    ]);
    const list = maps.get(`Map${String(mapId).padStart(3, '0')}.json`).events[1].pages[0].list;
    list.splice(list.findIndex(command => command.code === 118 && command.parameters[0] === 'scene') + 1, 0, set(21, ''));
    removeBranch(flow, `$gameVariables.value(32) === '${id}' && $gameMap.mapId() !== ${mapId}`, 1);
    removeBranch(events[262].list, `$gameVariables.value(32) === '${id}'`);
    route(condition, mapId);
    retired.push(...privateIds);
  }
  if (task === 28) {
    for (const phase of phases) removeBranch(flow, `$gameVariables.value(31) === '${phase}'`);
    retired.push(262);
  }
}
for (const id of retired) events[id] = null;
for (let id = 0; id < events.length; id++) if (![40, 41, ...(task >= 26 ? [262] : []), ...retired].includes(id)) assert.deepEqual(events[id], before[id]);
const lists = events.filter(Boolean).map(event => event.list);
for (const file of fs.readdirSync(root + 'data').filter(name => /^Map\d{3}\.json$/.test(name))) {
  for (const event of (maps.get(file) || read(file)).events.filter(Boolean)) for (const page of event.pages) lists.push(page.list);
}
for (const troop of read('Troops.json').filter(Boolean)) for (const page of troop.pages) lists.push(page.list);
for (const list of lists) for (const command of list) assert.ok(command.code !== 117 || !retired.includes(command.parameters[0]), 'Retired body still has a caller');
const writes = [['CommonEvents.json', events], ...maps].map(([name, value]) => {
  const raw = fs.readFileSync(root + 'data/' + name, 'utf8');
  const indent = [0, 2, 4].find(indent => raw.trim() === JSON.stringify(JSON.parse(raw), null, indent));
  assert.notEqual(indent, undefined, `Unknown format: ${name}`);
  return { name, value, bytes: JSON.stringify(value, null, indent) + (raw.endsWith('\n') ? '\n' : '') };
});
for (const { name, value, bytes } of writes) {
  fs.writeFileSync(root + 'data/' + name, bytes);
  assert.deepEqual(read(name), value);
}
console.log(JSON.stringify({ task, maps: [...maps.keys()], removed: retired.map(id => ({ id, name: before[id].name })) }, null, 2));
