import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, read, write, c, pc, call, set, query, bridge, presentation, nest, branch, erase, show } from './native-migration-helpers.mjs';

// One-time, reviewed transformation of the parent branch; never run on edited Map037.
const events = read('CommonEvents.json');
const infos = read('MapInfos.json');
const tavern = read('Map003.json');
assert.equal(infos.length, 37);
assert.equal(fs.existsSync(root + 'data/Map037.json'), false);
for (const [id, name] of [[5, 'Interagir — Gorvak'], [82, 'Perfil — Gorvak'], [83, 'Conversa — Gorvak'], [84, 'Selecionado — Gorvak'], [85, 'Grupo cheio — Gorvak']]) {
  assert.equal(events[id]?.name, name);
}
const sourceUnits = structuredClone(events.slice(82, 86));
const bust = (command, args) => pc('VisuMZ_2_VNPictureBusts', command, args);
const ids = id => ({ 'PictureID:arrayeval': JSON.stringify([String(id)]) });
function enter(id, name, x, scale) {
  return [
    bust('Basic_EnterBust', { 'PictureID:eval': String(id), 'PictureName:str': name, 'Origin:str': 'Bust', 'Position:num': '2', 'StartOffsetX:eval': '0', 'StartOffsetY:eval': '0', 'EasingType:str': 'OutSine', 'HorzMirror:str': 'None', 'Duration:eval': '0' }),
    bust('Scale_ScaleTo', { ...ids(id), 'TargetScaleX:str': String(scale), 'TargetScaleY:str': String(scale), 'Duration:eval': '0' }),
    bust('Move_MoveToCoordinates', { ...ids(id), 'TargetX:str': String(x), 'TargetY:str': '725', 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None', 'Duration:eval': '0' }),
    bust('Tone_NormalBust', { ...ids(id), 'Duration:eval': '0' })
  ];
}
function focus(speaker, pair, immediate = false) {
  const commands = [];
  for (const id of pair ? [60, 63] : [60]) {
    const active = (speaker === 'Ivaí') === (id === 63);
    const scale = id === 60 ? (active ? 34 : 32) : (active ? 44 : 42);
    commands.push(bust('Scale_ScaleTo', { ...ids(id), 'TargetScaleX:str': String(scale), 'TargetScaleY:str': String(scale), 'Duration:eval': '20' }),
      bust('Tone_CustomToneBust', { ...ids(id), 'customTone:eval': active ? '[0,0,0,0]' : '[-24,-24,-24,0]', 'Duration:eval': '20' }));
  }
  const still = commands.map(command => {
    const copy = structuredClone(command);
    copy.parameters[3]['Duration:eval'] = '0';
    return copy;
  });
  return immediate ? still : branch('$gameVariables.value(47)', still, commands);
}
function unit(id) {
  const source = sourceUnits[id - 82];
  const result = [c(108, [`Leitura ${id}: ${source.name}. Texto nativo; identidade preservada pela ADR-005.`]),
    presentation('ObservationBegin', { unit: String(id), switch: '0' }),
    presentation('MotionPreference', { variable: '47' })];
  if (id === 83) result.push(...enter(63, 'Dryland_ivai', 960, 44));
  let firstBox = true;
  for (const command of source.list) {
    if (command.code === 101) {
      result.push(...focus(command.parameters[4], id === 83, id === 83 && firstBox), call(351));
      firstBox = false;
    }
    if ([101, 401].includes(command.code)) result.push(structuredClone(command));
  }
  result.push(presentation('ObservationComplete'), call(44));
  return result;
}

const list = [c(108, ['ADR-005 experimental: esta é a interação jogável de Gorvak. Menu, falas e bustos são editados aqui.']),
  call(351), query('phase', 31),
  ...branch("$gameVariables.value(31) !== 'formation'", [c(201, [0, 4, 10, 7, 2, 2]), c(115)]),
  query('heroAlive', 28, 'H1'), ...branch('!$gameVariables.value(28)', [c(119, ['return'])]),
  show(1, 'Dryland_Taverna', 640, 360), ...enter(60, 'Dryland_H1', 320, 34),
  c(118, ['hero']), ...erase(63), presentation('MotionPreference', { variable: '47' }), ...focus('Gorvak', false, true),
  query('heroSelected', 28, 'H1'), query('automaticFormation', 29), query('selectedCount', 150), query('requiredCount', 151),
  set(153, 'Selecionar'), ...branch('$gameVariables.value(28)', [set(153, 'Retirar do grupo')]),
  c(121, [30, 30, 0]), ...branch('$gameVariables.value(29)', [c(121, [30, 30, 1])]),
  bridge('CaptureContext'), presentation('ChoiceFocus', { key: 'hero', horizontal: 'false', remember: 'false' }),
  c(101, ['', 0, 0, 2, 'Gorvak']), c(401, ['Grupo: \\V[150]/\\V[151]']),
  c(102, [['Conversar', '\\V[153]<Enable Switch: 30>', 'Voltar à taverna'], 2, 0, 2, 0]),
  c(402, [0, 'Conversar']), ...nest([...unit(82), ...unit(83), c(119, ['hero'])]), c(0, [], 1),
  c(402, [1, 'Selecionar / Retirar do grupo']),
  ...nest([bridge('Action', { action: 'TOGGLE_HERO', value: 'H1', valueVariable: '0' }), query('heroSelected', 28, 'H1'),
    ...branch("$gameVariables.value(24) === 'ok' && $gameVariables.value(28)", unit(84)),
    ...branch("$gameVariables.value(24) === 'invalid_party_size'", unit(85)), c(119, ['hero'])]), c(0, [], 1),
  c(402, [2, 'Voltar à taverna']), ...nest([c(119, ['return'])]), c(0, [], 1), c(404),
  c(118, ['return']), c(108, ['Imagens pertencem à tela global: limpar antes de transferir. Encerrar para liberar o autorun da Taverna.']),
  ...erase(60), ...erase(63), c(201, [0, 3, 10, 7, 2, 2]), c(115), c(0)];
const map = structuredClone(tavern);
map.note = '<drylandMap:gorvak-interaction>';
map.events = [null, structuredClone(tavern.events[1])];
map.events[1].name = 'Interagir — Gorvak';
map.events[1].pages[0].list = list;
infos.push({ id: 37, expanded: false, name: 'Conversa — Gorvak', order: 37, parentId: 3, scrollX: 0, scrollY: 0 });
const caller = events[3].list;
const oldCall = caller.findIndex(command => command.code === 117 && command.parameters[0] === 5);
assert.ok(oldCall > 0);
caller.splice(oldCall, 1, ...nest([c(108, ['Gorvak agora é editado no mapa filho Conversa — Gorvak (ADR-005 experimental).']),
  ...erase(10, 17), ...erase(30, 37), ...erase(40, 44), c(201, [0, 37, 10, 7, 2, 2]), c(115)]));
for (const id of [5, 82, 83, 84, 85]) events[id] = null;

assert.deepEqual(list.filter(command => command.code === 401).slice(1).map(command => command.parameters),
  sourceUnits.flatMap(event => event.list.filter(command => command.code === 401).map(command => command.parameters)));
assert.deepEqual(list.filter(command => command.code === 357 && command.parameters[1] === 'ObservationBegin').map(command => command.parameters[3].unit), ['82', '83', '84', '85']);
write(events);
fs.writeFileSync(root + 'data/MapInfos.json', '[\n' + infos.map(entry => JSON.stringify(entry)).join(',\n') + '\n]\n');
fs.writeFileSync(root + 'data/Map037.json', JSON.stringify(map) + '\n');
assert.deepEqual(read('Map037.json'), map);
assert.equal(read('CommonEvents.json')[5], null);
console.log('Created Map037/event001; rerouted CE003; retired CE005/082–085. Run the paired shortcut removal before validation (Map003/event003 still references CE005).');
