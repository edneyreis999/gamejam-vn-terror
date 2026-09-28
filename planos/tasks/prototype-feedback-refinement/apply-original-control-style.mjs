import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { editCommonEvents } from './native-authoring.mjs';

editCommonEvents(events => {
  const formation = events[3].list.find(command => command.code === 102 &&
    command.parameters?.[0]?.some(choice => String(choice).startsWith('Seguir<Bind Picture: 41>')));
  assert.ok(formation, 'original formation controls are missing');
  assert.ok(formation.parameters[0].every(choice => !String(choice).includes('<Choice Width:')),
    'formation must not contain an injected native choice width');

  const age = events[354]?.list?.find(command => command.code === 102 &&
    command.parameters?.[0]?.some(choice => String(choice).startsWith('Tenho 16 anos')));
  assert.ok(age, 'original age notice controls are missing');
  assert.ok(age.parameters[0].every(choice => String(choice).includes('<Hide Choice Window>')),
    'age notice must keep one picture-control set');

  for (const event of events) {
    for (const command of event?.list || []) {
      if (command.code !== 357 || command.parameters?.[1] !== 'PictureTextChange') continue;
      const args = command.parameters[3] || {};
      let ids = [];
      try { ids = JSON.parse(args['PictureIDs:arraynum'] || '[]'); } catch {}
      if (ids.length !== 1 || ids[0] < 30 || ids[0] > 37) continue;
      for (const key of ['upperleft:json','up:json','upperright:json','left:json','center:json','right:json','lowerleft:json','down:json','lowerright:json']) {
        if (typeof args[key] === 'string') args[key] = args[key].replaceAll('\\FS[18]', '\\FS[22]');
      }
    }
  }
});

const data = JSON.parse(readFileSync('rpg-maker/The Dryland Drowned/data/CommonEvents.json', 'utf8'));
assert.equal(data[38].list.filter(command => command.code === 231 && [41,42,43,44].includes(command.parameters?.[0])).length, 4);
assert.equal(data[354].list.filter(command => command.code === 231 && [3,4,5].includes(command.parameters?.[0])).length, 4);
console.log('Original controls preserved; hero-name text styling updated in place.');
