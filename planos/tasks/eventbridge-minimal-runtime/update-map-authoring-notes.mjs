import assert from 'node:assert/strict';
import fs from 'node:fs';

// One-time task29 authoring notes; executable commands and indices are unchanged.
const [pluginSource, pluginDestination, mapSource, mapDestination] = process.argv.slice(2);
assert.ok(pluginSource && pluginDestination && mapSource && mapDestination, 'Provide source/destination paths for Presentation and Map037');
const pluginBefore = fs.readFileSync(pluginSource, 'utf8');
let pluginAfter = pluginBefore;
for (const [oldLine, newLine] of [
  [' * Map037 reserva 82–85, IDs dos eventos comuns aposentados de Gorvak.', ' * Maps037–044 reservam 82–113, identidades das leituras dos oito heróis.'],
  [' * AUTO e FAST usam o provedor instalado e exigem seleção do jogador.', ' * FAST usa o provedor instalado e exige seleção do jogador.']
]) {
  assert.equal(pluginAfter.split(oldLine).length, 2, `Expected unique help line: ${oldLine}`);
  pluginAfter = pluginAfter.replace(oldLine, newLine);
}
assert.equal(pluginAfter.slice(pluginAfter.indexOf('*/') + 2), pluginBefore.slice(pluginBefore.indexOf('*/') + 2));
const mapBefore = fs.readFileSync(mapSource, 'utf8'), map = JSON.parse(mapBefore), original = structuredClone(map);
assert.equal(mapBefore, JSON.stringify(map) + '\n', 'Preserve Map037 native format');
const comments = map.events[1].pages[0].list.filter(command => command.code === 108 && command.parameters[0].includes('ADR-005'));
assert.equal(comments.length, 5);
for (const command of comments) command.parameters[0] = command.parameters[0].replace('ADR-005 experimental', 'ADR-G001 aceita').replace('pela ADR-005', 'pela ADR-G001');
for (const [index, command] of map.events[1].pages[0].list.entries()) {
  if (!comments.includes(command)) assert.deepEqual(command, original.events[1].pages[0].list[index]);
}
fs.writeFileSync(pluginDestination, pluginAfter);
fs.writeFileSync(mapDestination, JSON.stringify(map) + '\n');
assert.equal(fs.readFileSync(pluginDestination, 'utf8'), pluginAfter);
assert.deepEqual(JSON.parse(fs.readFileSync(mapDestination, 'utf8')), map);
console.log(JSON.stringify({ pluginDestination, mapDestination, change: 'two help lines and five native comments; executable code and command indices preserved' }));
