import assert from 'node:assert/strict';

// Expected participants come from the public campaign and authored scene
// contract, independently of the migration's commands or helper IDs.
export async function observeBustPassage(context, player) {
  player.lastBustPassage = null;
  const before = await player.snapshot('bust-passage-state');
  const state = before.snapshot, id = state.reading?.passageId;
  if (!id) return;
  const expected = new Map();
  const hero = /^(farewell|epilogue)\.(H[1-8])$/.exec(id);
  if (hero) expected.set(60, `Dryland_${hero[2]}`);
  if (/^lover\.(physical|supernatural)\.(warning|second)$/.test(id)) expected.set(63, id.includes('physical') ? 'Dryland_perola' : 'Dryland_florai');
  if (/^(council\.(challenge|solo|confession|andira)|opinion\.H[1-8])$/.test(id)) {
    if (id !== 'council.andira') state.climaxParty.forEach((hero, index) => expected.set(60 + index, `Dryland_${hero}`));
    if (id !== 'council.challenge') expected.set(63, 'Dryland_ivai');
    if (id === 'council.andira') expected.set(65, 'Dryland_andira');
  }
  await context.wait(() => [60,61,62,63,64,65].every(id => {
    const picture = $gameScreen.picture(id);
    return !picture || (picture._duration === 0 && picture._toneDuration === 0);
  }));
  const actual = await context.read(`bust-composition-${id}`, () => ({
    frame: Graphics.frameCount, text: $gameMessage.allText(), speaker: $gameMessage.speakerName(),
    viewport: { width: innerWidth, height: innerHeight, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches },
    pictures: [60,61,62,63,64,65].flatMap(id => {
      const p = $gameScreen.picture(id);
      return p ? [{id, name:p.name(), x:p.x(), y:p.y(), scale:p.scaleX(), tone:p.tone(), opacity:p.opacity()}] : [];
    })
  }));
  assert.deepEqual(actual.pictures.map(p => [p.id,p.name]), [...expected]);
  for (const picture of actual.pictures) {
    let listening = false;
    if (id === 'council.confession') listening = picture.id < 63;
    else if (id === 'council.andira') listening = picture.id === 63;
    else if (id.startsWith('opinion.')) listening = picture.name !== `Dryland_${id.split('.')[1]}`;
    assert.deepEqual(picture.tone, listening ? [-24,-24,-24,0] : [0,0,0,0]);
    assert.equal(picture.opacity,255);
  }
  assert.deepEqual(await player.snapshot('bust-passage-after-inspection'),before);
  const label = `bust-${++player.bustSerial}-${id.replaceAll('.', '-')}`;
  await context.shot(label);
  context.report.observations.push({label,kind:'bust-coverage',value:{id,expected:[...expected],actual,state}});
  player.lastBustPassage = id;
}

export async function observeBustTransition(context, player) {
  const id = player.lastBustPassage;
  if (!/^(council\.(challenge|confession|andira)|opinion\.|lover\.|farewell\.|epilogue\.)/.test(id || '')) return;
  for (let sample = 0; sample < 3; sample++) {
    const value = await context.read(`bust-transition-${id}-${sample}`, () => ({frame:Graphics.frameCount,
      pictures:[60,61,62,63,64,65].flatMap(id=>{const p=$gameScreen.picture(id);return p?[{id,name:p.name(),x:p.x(),scale:p.scaleX(),tone:p.tone(),opacity:p.opacity()}]:[]})}));
    const label = `bust-transition-${player.bustSerial}-${sample}-${id.replaceAll('.', '-')}`;
    await context.shot(label);
    context.report.observations.push({label,kind:'bust-temporal',value});
  }
}
