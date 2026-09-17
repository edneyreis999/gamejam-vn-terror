import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';
import { captureNativeSave } from './native-save-archive.mjs';

export const sourceFiles = [new URL('./native-player.mjs', import.meta.url), new URL('./native-save-archive.mjs', import.meta.url)];
const variant = process.env.DRYLAND_PROLOGUE_VARIANT || 'A1';
const large = ['A3', 'A4'].includes(variant);
const controls = ['A1', 'A4'].includes(variant);
const recovery = variant === 'B';
const expectedRef = 'docs/qa/guides/prologo-rheed.md';
export const scenario = {
  id: `prologo-rheed-${variant}`,
  criteria: [{ id: recovery ? 'continuity' : 'opening', variant, expectedRef }],
  requires: ['native-mz', 'public-input'],
  storage: { expectedRef },
  audioFormat: 'wav', audioSources: { master: { path: 'WebAudio._masterGainNode', expectedRef } },
  browser: { width: large ? 1920 : 1280, height: large ? 1080 : 720, dpr: 1,
    locale: 'pt-BR', query: '', reducedMotion: ['A2', 'A4'].includes(variant) ? 'reduce' : 'no-preference',
    timeoutMs: 45000, executionTimeoutMs: 600000, launchArgs: ['--force-device-scale-factor=1',
      ...(process.env.DRYLAND_PROLOGUE_RENDERER === 'software' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : [])] }
};

const markers = ['Meu nome é Rheed.', 'Naqueles dias,', 'Quando os oito', 'Os papéis eram de Irati,',
  'Os mapas estavam incompletos.', 'Do tesouro, falou pouco.', 'Minha família deixou as pistas.',
  'Você não está esquecendo de nenhuma informação, mestre?', 'Os detalhes serão adicionados ao longo do caminho.'];
const observe = context => context.read('prologue-composition', () => ({
  text: $gameMessage.allText().replace(/\s+/g, ' ').trim(), speaker: $gameMessage.speakerName(),
  picture: $gameScreen.picture(60)?.name() ?? null,
  pair: [60, 61].map(id => { const p = $gameScreen.picture(id); return p ? { name: p.name(), x: p.x(), y: p.y(), scale: p.scaleX() } : null; }), background: $gameScreen.picture(1)?.name() ?? null, map: $gameMap.mapId(),
  bgm: AudioManager._currentBgm?.name || '', bgs: AudioManager._currentBgs?.name || '',
  me: Boolean(AudioManager._meBuffer?.isPlaying()),
  campaign: $gameSystem._dryland.campaign, read: $gameSystem._drylandReadUnits
}));

async function settledMessage(context, player) {
  await player.ready();
  await context.wait(() => {
    const w = SceneManager._scene._messageWindow;
    return w.openness === 255 && !w.isOpening() && !w.isClosing() && w.scale.x === 1;
  });
}

async function button(context, player, type) {
  const point = await context.read('console-button-geometry', value => {
    const b = SceneManager._scene._messageWindow._buttonConsoleButtons.find(b => b._type === value);
    if (!b?.worldVisible) throw Error('Missing visible control: ' + value);
    const bounds = b.getBounds(), canvas = Graphics._canvas.getBoundingClientRect();
    return { x: canvas.x + (bounds.x + bounds.width / 2) * canvas.width / Graphics.width,
      y: canvas.y + (bounds.y + bounds.height / 2) * canvas.height / Graphics.height };
  }, type);
  await player.click(point.x, point.y);
}

async function exerciseControls(context, player, index) {
  const before = await observe(context);
  for (const mode of ['keyboard', 'mouse']) {
    if (mode === 'keyboard') await context.input.key('Tab');
    else await button(context, player, 'hide');
    await context.wait(() => SceneManager._scene._messageWindow.scale.x === 0);
    await context.shot(`controls-${index}-${mode}-hidden`);
    if (mode === 'keyboard') await context.input.key('Tab');
    else {
      const p = await context.read('restore-location', () => { const r = Graphics._canvas.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 3 }; });
      await player.click(p.x, p.y);
    }
    await settledMessage(context, player); assert.deepEqual(await observe(context), before);
    await context.shot(`controls-${index}-${mode}-restored`);
  }
  await button(context, player, 'options');
  await context.wait(() => SceneManager._scene instanceof Scene_Options && !SceneManager._scene.isBusy());
  await context.shot(`controls-${index}-settings`);
  await context.input.keyDown('Escape');
  try {
    await context.wait(() => !(SceneManager._scene instanceof Scene_Options));
  } finally {
    await context.input.keyUp('Escape');
  }
  await settledMessage(context, player);
  assert.deepEqual(await observe(context), before);
  assert.equal(await context.read('unseen-fast-disallowed', () => $gameSystem.isExtendedFastForwardDisallowed()), true);
  await button(context, player, 'fastfwd'); await player.ready();
  assert.equal(await context.read('fast-remains-off', () => Boolean($gameTemp.isExtendedFastForwardMode())), false);
  assert.deepEqual(await observe(context), before);
}

async function readOpening(context, player, { prefix = 'opening', checkControls = false, audio = false } = {}) {
  const boxes = [];
  if (audio) await context.audio.start(`${prefix}-audio`, 'master');
  for (let i = 0; i < markers.length; i++) {
    await settledMessage(context, player);
    const state = await observe(context);
    assert.ok(state.text.startsWith(markers[i]), `Expected box ${i + 1}: ${JSON.stringify(state)}`);
    assert.equal(state.map, 2);
    assert.equal(state.background, i < 6 ? null : 'Dryland_Taverna');
    assert.equal(state.speaker, i === 6 || i === 8 ? 'Ivaí' : 'Rheed');
    assert.equal(state.picture, i >= 6 ? 'Reed-novo' : 'Reed final');
    if (i < 6) assert.equal(state.pair[1], null);
    else {
      const [young, ivai] = state.pair;
      assert.equal(ivai.name, 'Dryland_ivai');
      assert.ok(young.x < ivai.x, 'Young Rheed left, Ivaí right');
      const [active, listener] = i === 7 ? [young, ivai] : [ivai, young];
      assert.ok(Math.abs(active.scale / listener.scale - 1.1) < 0.000001, 'Speaking portrait is 10% larger');
    }
    assert.equal(state.bgm, ''); assert.equal(state.bgs, ''); assert.equal(state.me, false);
    if (i < 3) assert.ok(!(state.read || []).includes(1), 'N01 must not complete before its last box');
    boxes.push(state); await context.shot(`${prefix}-box-${i + 1}`);
    if (checkControls && [0, 6, 7].includes(i)) await exerciseControls(context, player, i);
    // Stop silence capture before the final input permits the tavern's ambience.
    if (audio && i === 8) await context.audio.stop();
    if (['A2', 'A3'].includes(variant)) {
      const p = await context.read('advance-message-location', () => { const r = Graphics._canvas.getBoundingClientRect(); return { x: r.x + r.width * .35, y: r.y + r.height * .8 }; });
      await player.click(p.x, p.y);
    } else await context.input.key('Enter');
  }
  await player.until('formation');
  const state = await observe(context);
  assert.equal(state.map, 3); assert.equal(state.picture, null);
  assert.deepEqual(state.pair, [null, null]);
  await context.shot(`${prefix}-preparation`);
  const surface = await player.surface();
  for (const hero of ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska']) assert.ok(surface.labels.includes(hero));
  assert.ok(!surface.labels.includes('Rheed'));
  context.report.observations.push({ label: `${prefix}-boxes`, kind: 'prologue-boxes', value: boxes });
}

export async function execute(context) {
  const player = new DirectedNativePlayer(context);
  await player.choicesContaining('Jogar');
  await context.read('title-audio-and-environment', () => ({ bgm: $dataSystem.titleBgm, current: AudioManager._currentBgm,
    volumes: [ConfigManager.bgmVolume, ConfigManager.bgsVolume, ConfigManager.meVolume, ConfigManager.seVolume],
    viewport: [innerWidth, innerHeight, devicePixelRatio], reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches }));
  await player.choose('Jogar', { mouse: variant === 'A2' }); await player.file(1); await player.ready();
  if (recovery) {
    const initial = await captureNativeSave(context, 'PR-N');
    await context.input.key('Enter'); await player.ready();
    await context.reopenContext(); await player.choose('Continuar'); await player.file(1); await player.ready();
    assert.ok((await observe(context)).text.startsWith(markers[0]));
    await readOpening(context, player, { prefix: 'resumed-intro', audio: true });
    const formationSave = await captureNativeSave(context, 'PR-F-still-new-campaign');
    assert.deepEqual(formationSave.campaign, initial.campaign);
    await context.reopenContext(); await player.choose('Continuar'); await player.file(1);
    await readOpening(context, player, { prefix: 'resumed-from-formation' });
    await player.choose('Gorvak'); await player.choose('Conversar');
    await player.ready(); await context.shot('hero-conversation'); await player.returnToTavern();
    for (const name of ['Gorvak', 'Elowen', 'Griznik']) { await player.choose(name); await player.choose('Selecionar'); await player.returnToTavern(); }
    await player.choose('Destinos'); const routes = await player.until('destinations'); await player.choose(routes.labels[0]);
    await player.choose('Partir'); await player.until('approaches');
    const departure = await captureNativeSave(context, 'PR-D');
    await context.reopenContext(); await player.choose('Continuar'); await player.file(1); await player.ready();
    assert.deepEqual((await player.snapshot('departure-restored')).campaign, departure.campaign);
    await player.until('approaches');
    const approaches = await player.surface();
    const retreat = approaches.labels.find(label => /recuar/i.test(label));
    assert.ok(retreat, 'First encounter must expose a legal retreat for this case');
    await player.choose(retreat);
    const confirmation = await player.until('retreat'); await player.choose(confirmation.labels[0]);
    await player.returnToTavern();
    assert.equal((await observe(context)).picture, null);
    await context.shot('returned-after-retreat'); await captureNativeSave(context, 'PR-return');
  } else {
    await readOpening(context, player, { checkControls: controls, audio: variant === 'A3' });
  }
  await context.wait(() => AudioManager._bgsBuffer?.isPlaying() && AudioManager._currentBgs?.name === 'People1');
  if (variant === 'A3' || recovery) {
    await context.audio.start('preparation-audio', 'master');
    // Observe a full authored ambience interval; this duration is a sampling window, not a readiness guard.
    await context.read('preparation-audio-window', async () => { const start = performance.now(); while (performance.now() - start < 3000) await new Promise(resolve => requestAnimationFrame(resolve)); return { bgs: AudioManager._currentBgs?.name, volumes: [ConfigManager.bgmVolume, ConfigManager.bgsVolume, ConfigManager.meVolume, ConfigManager.seVolume] }; });
    await context.audio.stop();
  }
  context.report.observations.push({ label: 'completed-prologue-case', kind: 'completed-prologue-case', value: { variant, controls, recovery } });
}

export async function verify({ expected, artifacts, report }) {
  const complete = report.observations.find(row => row.kind === 'completed-prologue-case');
  return { criteria: expected.map(row => ({ ...row, status: complete ? 'executed-awaiting-review' : 'fail',
    observed: complete?.value, evidence: artifacts.map(a => a.path),
    limits: ['Public inputs plus read-only observations; captures require inspection. Human editorial, framing and audio acceptance remain separate. Old formation save unavailable.'] })),
    pendingReviews: ['Inspect all prologue and control compositions; listen to registered audio when available.'] };
}
