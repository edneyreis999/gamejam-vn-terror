import assert from 'node:assert/strict';

// Native authoring identities from the accepted MZ scene contract; prose stays editable in events.
const scenes = {
  prologue: ['prologue.01', 'prologue.02', 'irati.01'],
  'irati.02': ['irati.02.01'],
  'map.reveal': ['map.reveal.01', 'map.reveal.02'],
  automatic_retreat: ['automatic_retreat.01'],
  council: ['council.01', 'council.02', 'council.03', 'irati.03', 'council.challenge', 'council.solo', 'council.confession', 'council.andira'],
  memorial: ['memorial.intro']
};
for (const route of ['physical', 'supernatural', 'final']) scenes[`threshold.${route}`] = [`threshold.${route}.01`];
for (const route of ['physical', 'supernatural']) {
  scenes[`lover.${route}.first`] = [`lover.${route}.01`, `lover.${route}.warning`, `reward.${route}`];
  scenes[`lover.${route}.second`] = [`lover.${route}.01`, `lover.${route}.warning`, `lover.${route}.second`, `reward.${route}`];
}
for (const ending of ['reunite', 'destroy', 'bad']) scenes[`ending.${ending}`] = [`ending.${ending}.01`, `ending.${ending}.02`];
for (let hero = 1; hero <= 8; hero++) {
  for (const kind of ['opinion', 'epilogue']) scenes[`${kind}.H${hero}`] = [`${kind}.H${hero}`];
}
for (const family of ['A', 'B']) {
  for (let encounter = 1; encounter <= 8; encounter++) {
    const id = `${family}${encounter}`;
    scenes[`encounter.${id}`] = [`encounter.${id}.01`];
    scenes[`death.${id}`] = [`death.${id}.context`];
    for (let approach = 1; approach <= 3; approach++) {
      for (const result of ['success', 'failure']) {
        const scene = `result.${id}-${approach}.${result}`;
        scenes[scene] = [`${scene}.01`];
      }
    }
  }
}

export function assertNativeContent(events, parsed) {
  assert.deepEqual(parsed.violations, []);
  assert.deepEqual(Object.keys(parsed.catalog.scenes).sort(), Object.keys(scenes).sort(), 'native scene identities');
  for (const [id, passageIds] of Object.entries(scenes)) {
    assert.deepEqual(parsed.catalog.scenes[id].passageIds, passageIds, `scene order: ${id}`);
  }
  const required = new Set(Object.values(scenes).flat());
  for (let hero = 1; hero <= 8; hero++) {
    for (const kind of ['profile', 'speech', 'selection', 'party_full', 'farewell', 'memorial']) required.add(`${kind}.H${hero}`);
  }
  for (const family of ['A', 'B']) {
    for (let encounter = 1; encounter <= 8; encounter++) {
      required.add(`choices.${family}${encounter}`);
      required.add(`memorial_cause.${family}${encounter}`);
    }
  }
  required.add('credits.native');
  assert.deepEqual(Object.keys(parsed.catalog.passages).sort(), [...required].sort(), 'native passage identities');
  for (const id of required) {
    const location = parsed.locations[id];
    const commands = events[location.commonEventId].list.slice(location.start, location.end);
    const passage = parsed.catalog.passages[id];
    assert.ok(passage.source.trim(), `source: ${id}`);
    assert.ok(['confirmed', 'prototype_baseline', 'provisional'].includes(passage.status), `status: ${id}`);
    if (id.startsWith('choices.')) {
      const choices = commands.find(command => command.code === 102).parameters[0];
      assert.equal(choices.length, 3, id);
      assert.ok(choices.every(text => text.trim()), `choice text: ${id}`);
    } else {
      const text = commands.filter(command => command.code === 401).map(command => command.parameters[0]).join('\n');
      assert.ok(text.trim(), `authored text: ${id}`);
      if (id === 'reward.physical') assert.equal(text, 'Você recebeu a peça anã do mapa.');
      if (id === 'reward.supernatural') assert.equal(text, 'Você recebeu a peça élfica do mapa.');
    }
  }
}
