import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';
import { captureNativeSave, sha256 } from './native-save-archive.mjs';

const EDITED_TEXT = 'Esta conversa foi criada no editor. O que espera encontrar, Gorvak?';
const PROFILE_TEXT = 'Gorvak · Ele/dele · Anão · Ferreiro';
const EXPECTED_BUTTON = { id: 92, name: 'Dryland_Button', origin: 0, x: 31, y: 37, scaleX: 30, scaleY: 40, opacity: 181, blendMode: 0 };
const EXPECTED_BUST = { id: 63, name: 'Dryland_ivai', origin: 1, x: 960, y: 850, scaleX: 80, scaleY: 100 };

export const sourceFiles = [
  new URL('./native-player.mjs', import.meta.url),
  new URL('./native-save-archive.mjs', import.meta.url)
];

export const scenario = {
  id: 'native-editor-authorship',
  criteria: [{ id: 'authorship', variant: 'native-editor-copy', expectedRef: 'planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios' }],
  requires: ['native-mz', 'public-input'],
  browser: {
    width: 1280,
    height: 720,
    dpr: 1,
    launchArgs: ['--force-device-scale-factor=1'],
    locale: 'pt-BR',
    query: '',
    reducedMotion: process.env.DRYLAND_QA_MOTION === 'reduce' ? 'reduce' : 'no-preference',
    timeoutMs: 30000
  }
};

function assertPicture(actual, expected, label) {
  assert.ok(actual, `${label} must be present.`);
  for (const [key, value] of Object.entries(expected)) assert.equal(actual[key], value, `${label}.${key}`);
}

function assertRenderedPicture(actual, label) {
  const diagnostic = () => `${label} rendered state: ${JSON.stringify(actual)}`;
  assert.ok(actual?.spritePresent, `${label} Sprite_Picture 92 must be present. ${diagnostic()}`);
  assert.equal(actual.pictureName, EXPECTED_BUTTON.name, `${label} picture name. ${diagnostic()}`);
  assert.equal(actual.bitmapReady, true, `${label} bitmap must be ready. ${diagnostic()}`);
  assert.equal(actual.bitmapError, false, `${label} bitmap must not be in an error state. ${diagnostic()}`);
  assert.equal(actual.visible, true, `${label} sprite must be visible. ${diagnostic()}`);
  assert.equal(actual.worldVisible, true, `${label} sprite must be world-visible. ${diagnostic()}`);
  assert.ok(actual.alpha > 0, `${label} sprite alpha must be positive. ${diagnostic()}`);
  assert.ok(actual.worldAlpha > 0, `${label} world alpha must be positive. ${diagnostic()}`);
  assert.ok(actual.bitmapWidth > 0 && actual.bitmapHeight > 0, `${label} bitmap must have non-zero dimensions. ${diagnostic()}`);
  assert.ok(actual.bounds && actual.bounds.width > 0 && actual.bounds.height > 0, `${label} bounds must have non-zero dimensions. ${diagnostic()}`);
  assert.ok(Math.abs(actual.bounds.x - EXPECTED_BUTTON.x) < 0.5, `${label} bounds.x must track the authored x. ${diagnostic()}`);
  assert.ok(Math.abs(actual.bounds.y - EXPECTED_BUTTON.y) < 0.5, `${label} bounds.y must track the authored y. ${diagnostic()}`);
}

function assertPictureLayer(actual, label, { requireChurch = false } = {}) {
  const diagnostic = () => `${label} picture layer: ${JSON.stringify(actual?.activePictures || [])}`;
  assert.ok(Array.isArray(actual?.activePictures), `${label} must expose active picture layers. ${diagnostic()}`);
  const pictureOne = actual.activePictures.find(picture => picture.id === 1);
  if (requireChurch) {
    assert.equal(pictureOne?.name, 'Dryland_Church', `${label} must retain the authored church background at picture 1. ${diagnostic()}`);
  }
  if (pictureOne) {
    assert.ok(actual.childIndex > pictureOne.childIndex, `${label} picture 92 must draw after picture 1. ${diagnostic()}`);
  }
}

function assertRenderedContinuity(before, after, label) {
  const layers = value => value.activePictures.map(picture => [picture.id, picture.name, picture.childIndex]);
  assert.deepEqual(layers(after), layers(before), `${label} must preserve the active picture layer set and order.`);
  assert.ok(Math.abs(after.alpha - before.alpha) < 0.000001, `${label} must preserve picture 92 alpha.`);
  assert.ok(Math.abs(after.worldAlpha - before.worldAlpha) < 0.000001, `${label} must preserve picture 92 world alpha.`);
  assert.deepEqual(after.bounds, before.bounds, `${label} must preserve picture 92 bounds.`);
}

function campaignFacts(campaign) {
  const { sequence, history, draftPartyIds, ...facts } = campaign;
  return facts;
}

async function observeState(context, label) {
  return context.read(label, () => {
    const picture = id => {
      const value = window.$gameScreen?.picture(id);
      return value ? {
        id,
        name: value.name(),
        origin: value.origin(),
        x: value.x(),
        y: value.y(),
        scaleX: value.scaleX(),
        scaleY: value.scaleY(),
        opacity: value.opacity(),
        blendMode: value.blendMode()
      } : null;
    };
    const system = window.$gameSystem;
    const temp = window.$gameTemp;
    return {
      frame: window.Graphics?.frameCount,
      text: window.$gameMessage?.allText() || '',
      speaker: window.$gameMessage?.speakerName?.() || '',
      readUnits: [...(system?._drylandReadUnits || [])],
      disallowed: Boolean(system?.isExtendedFastForwardDisallowed?.()),
      auto: Boolean(temp?.isMessageAutoForwardMode?.()),
      fast: Boolean(temp?.isExtendedFastForwardMode?.()),
      campaign: system?._dryland?.campaign,
      picture92: picture(92),
      picture63: picture(63),
      mapId: window.$gameMap?.mapId()
    };
  });
}

async function waitForNativeBitmapReady(context, label, pictureId = EXPECTED_BUTTON.id) {
  return context.read(label, async id => {
    const sample = () => {
      const scene = window.SceneManager?._scene;
      const container = scene?._spriteset?._pictureContainer;
      const children = container?.children || [];
      const describe = sprite => {
        const picture = sprite.picture?.();
        const bitmap = sprite.bitmap;
        const bounds = sprite.getBounds?.();
        return {
          id: sprite._pictureId,
          name: picture?.name?.() || null,
          childIndex: children.indexOf(sprite),
          visible: Boolean(sprite.visible),
          worldVisible: Boolean(sprite.worldVisible),
          alpha: sprite.alpha ?? 0,
          worldAlpha: sprite.worldAlpha ?? 0,
          bitmapReady: Boolean(bitmap?.isReady?.()),
          bitmapError: Boolean(bitmap?.isError?.()),
          bounds: bounds ? { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height } : null
        };
      };
      const activePictures = children.filter(sprite => sprite.picture?.()?.name?.()).map(describe);
      const rendered = activePictures.find(picture => picture.id === id);
      const bitmap = children.find(sprite => sprite._pictureId === id)?.bitmap;
      return {
        id,
        spritePresent: Boolean(rendered),
        pictureName: rendered?.name || null,
        childIndex: rendered?.childIndex ?? -1,
        visible: Boolean(rendered?.visible),
        worldVisible: Boolean(rendered?.worldVisible),
        alpha: rendered?.alpha ?? 0,
        worldAlpha: rendered?.worldAlpha ?? 0,
        bitmapReady: Boolean(bitmap?.isReady?.()),
        bitmapError: Boolean(bitmap?.isError?.()),
        bitmapWidth: bitmap?.width ?? 0,
        bitmapHeight: bitmap?.height ?? 0,
        bounds: rendered?.bounds || null,
        activePictures,
        pictureContainerVisible: Boolean(container?.visible),
        pictureContainerWorldVisible: Boolean(container?.worldVisible),
        pictureContainerWorldAlpha: container?.worldAlpha ?? 0
      };
    };
    const deadline = performance.now() + 5000;
    let current = sample();
    while (!current.bitmapReady && !current.bitmapError) {
      if (performance.now() >= deadline) throw Error(`Native picture bitmap did not become ready: ${JSON.stringify(current)}`);
      await new Promise(resolve => requestAnimationFrame(resolve));
      current = sample();
    }
    return current;
  }, pictureId);
}

async function advanceUntilText(context, player, predicate, label) {
  for (let step = 0; step < 100; step++) {
    const surface = await player.ready();
    if (predicate(surface)) return surface;
    assert.ok(surface.paused, `Expected a paused passage before ${label}: ${JSON.stringify(surface)}`);
    await context.shot(`${label}-passage-${step + 1}`);
    await context.input.key('Enter');
  }
  throw new Error(`Too many passages before ${label}.`);
}

async function consolePoint(context, type, label = `editor-console-${type}`) {
  return context.read(label, value => {
    const scene = window.SceneManager?._scene;
    const button = scene?._messageWindow?._buttonConsoleButtons?.find(item => item._type === value);
    if (!button?.worldVisible) throw Error(`Console button is not visible: ${value}`);
    const bounds = button.getBounds();
    const rect = window.Graphics._canvas.getBoundingClientRect();
    return {
      x: rect.x + (bounds.x + bounds.width / 2) * rect.width / window.Graphics.width,
      y: rect.y + (bounds.y + bounds.height / 2) * rect.height / window.Graphics.height
    };
  }, type);
}

async function rejectFast(context, player, before) {
  const point = await consolePoint(context, 'fastfwd', 'editor-unread-fast-geometry');
  await player.click(point.x, point.y);
  await context.wait(frame => window.Graphics.frameCount > frame, before.frame);
  const after = await observeState(context, 'editor-unread-fast-after');
  assert.equal(after.text, before.text, 'FAST must not advance an unread authored unit.');
  assert.deepEqual(after.readUnits, before.readUnits, 'Rejected FAST must not complete an authored unit.');
  assert.equal(after.disallowed, true, 'FAST must remain disallowed for the unread authored unit.');
  assert.equal(after.fast, false, 'Rejected FAST must remain inactive.');
  return after;
}

async function activateFast(context) {
  const point = await consolePoint(context, 'fastfwd', 'editor-reread-fast-geometry');
  await context.input.pointer.move(point.x, point.y);
  await context.input.pointer.down();
  try {
    return await context.read('editor-reread-fast-active', async () => {
      const deadline = performance.now() + 3000;
      for (;;) {
        const system = window.$gameSystem;
        const temp = window.$gameTemp;
        const sample = {
          frame: window.Graphics?.frameCount,
          text: window.$gameMessage?.allText() || '',
          active: Boolean(temp?.isExtendedFastForwardMode?.()),
          disallowed: Boolean(system?.isExtendedFastForwardDisallowed?.()),
          readUnits: [...(system?._drylandReadUnits || [])]
        };
        if (sample.active) return sample;
        if (performance.now() >= deadline) throw Error(`Allowed FAST did not become active: ${JSON.stringify(sample)}`);
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
    });
  } finally {
    await context.input.pointer.up();
  }
}

async function readSavedPicture(context, label, fileId) {
  return context.read(label, async id => {
    const contents = await window.StorageManager.loadObject(`file${id}`);
    const picture = contents?.screen?._pictures?.[92];
    return picture ? {
      id: 92,
      name: picture._name,
      origin: picture._origin,
      x: picture._x,
      y: picture._y,
      scaleX: picture._scaleX,
      scaleY: picture._scaleY,
      opacity: picture._opacity,
      blendMode: picture._blendMode
    } : null;
  }, fileId);
}

async function readAuthoredData(context) {
  return context.read('native-editor-authored-data', () => {
    const list = id => window.$dataCommonEvents?.[id]?.list || [];
    const configure = list(4).find(command => command.code === 357 && command.parameters?.[0] === 'Dryland_EventBridge' && command.parameters?.[1] === 'ConfigureHero' && command.parameters?.[3]?.id === 'H1');
    const selectedCalls = list(5).map((command, index) => ({ index, command })).filter(({ command }) => command.code === 117 && [82, 83, 352].includes(command.parameters?.[0])).map(({ index, command }) => ({ index, id: command.parameters[0] }));
    const replacement = list(352);
    const scaleCommand = replacement.find(command => command.code === 357 && command.parameters?.[1] === 'Scale_ScaleTo');
    const scale = scaleCommand?.parameters?.[3] || {};
    const showPicture = replacement.find(command => command.code === 231 && command.parameters?.[0] === 92)?.parameters || null;
    const preload = list(351).find(command => command.code === 357 && command.parameters?.[0] === 'VisuMZ_0_CoreEngine' && command.parameters?.[1] === 'SystemLoadImages');
    const pictures = preload?.parameters?.[3]?.['pictures:arraystr'] ? JSON.parse(preload.parameters[3]['pictures:arraystr']) : [];
    return {
      configure: configure?.parameters?.[3] || null,
      selectedCalls,
      firstText: replacement.find(command => command.code === 401)?.parameters?.[0] || null,
      showPicture,
      scale: { pictureIds: scale['PictureID:arrayeval'] || null, targetX: scale['TargetScaleX:str'] || null, targetY: scale['TargetScaleY:str'] || null, duration: scale['Duration:eval'] || null },
      preloadPictures: pictures
    };
  });
}

export async function execute(context) {
  const player = new DirectedNativePlayer(context);
  assert.equal(context.descriptor.storageFixture, undefined, 'The authored copy must start without an imported storage fixture.');
  assert.equal(context.descriptor.nativeArchive, undefined, 'The authored copy must not start from an archived campaign.');

  const authoredSources = context.descriptor.files.filter(entry => ['data/CommonEvents.json', 'data/Map003.json'].includes(entry.path));
  assert.equal(authoredSources.length, 2, 'The runtime descriptor must fingerprint the authored data and Gorvak map.');
  await player.ready();
  const authored = await readAuthoredData(context);
  assert.deepEqual(authored.configure, { id: 'H1', name: 'Gorvak vigia' });
  assert.deepEqual(authored.selectedCalls, [{ index: 47, id: 82 }, { index: 49, id: 352 }]);
  assert.equal(authored.firstText, EDITED_TEXT);
  assert.deepEqual(authored.showPicture, [92, 'Dryland_Button', 0, 0, 31, 37, 30, 40, 181, 0]);
  assert.deepEqual(authored.scale, { pictureIds: '["63"]', targetX: '80', targetY: '100', duration: '0' });
  assert.equal(authored.preloadPictures.length, 29, 'The editor-authored preload must retain all 29 native picture names.');
  assert.ok(authored.preloadPictures.includes('Dryland_Button'));

  // Fresh New Game, including the public file-selector cancellation, is the only campaign setup.
  await player.choose('Jogar');
  await context.wait(() => window.SceneManager._scene instanceof Scene_File && !window.SceneManager._scene.isBusy());
  await context.input.key('Escape');
  await player.choicesContaining('Jogar');
  await player.choose('Jogar');
  await player.file(1);
  await player.until('formation');
  assert.ok((await player.surface()).labels.includes('Gorvak vigia'), 'The edited public label must be selectable in formation.');
  const fresh = await player.snapshot('editor-fresh-formation');
  assert.equal(fresh.fileId, 1);
  assert.deepEqual(fresh.campaign.draftPartyIds, []);

  await player.choose('Gorvak vigia');
  await player.choose('Conversar');
  const profile = await player.ready();
  assert.ok(profile.text.includes(PROFILE_TEXT), 'The authored branch must run profile CE82 before CE352.');
  await context.shot('editor-profile-82');
  const custom = await advanceUntilText(context, player, surface => surface.text.includes(EDITED_TEXT), 'editor-custom-unread');
  assert.ok(custom.text.includes(EDITED_TEXT));
  const unread = await observeState(context, 'editor-custom-unread-state');
  assert.ok(unread.readUnits.includes(82), 'The profile must complete before the replacement unit starts.');
  assert.equal(unread.readUnits.includes(83), false, 'The old conversation unit must not execute.');
  assert.equal(unread.readUnits.includes(352), false, 'The replacement unit must begin unread.');
  assert.equal(unread.disallowed, true);
  assert.equal(unread.auto, false);
  assert.equal(unread.fast, false);
  assertPicture(unread.picture92, EXPECTED_BUTTON, 'unread picture92');
  assertPicture(unread.picture63, EXPECTED_BUST, 'unread Ivaí bust');
  const unreadRendered = await waitForNativeBitmapReady(context, 'editor-custom-unread-rendered');
  assertRenderedPicture(unreadRendered, 'unread picture92');
  assertPictureLayer(unreadRendered, 'unread picture92');
  await context.shot('editor-custom-unread');

  const rejected = await rejectFast(context, player, unread);
  await context.shot('editor-custom-fast-rejected');

  // Options is entered through the visible provider control and must preserve the active native scene.
  const optionsBefore = await observeState(context, 'editor-options-before');
  const optionsPoint = await consolePoint(context, 'options', 'editor-options-geometry');
  await player.click(optionsPoint.x, optionsPoint.y);
  await context.wait(() => window.SceneManager._scene instanceof Scene_Options && !window.SceneManager._scene.isBusy());
  await context.shot('editor-options');
  await context.input.key('Escape');
  await player.ready();
  const optionsAfter = await observeState(context, 'editor-options-after');
  assert.equal(optionsAfter.text, optionsBefore.text, 'Options must return to the same authored line.');
  assert.equal(optionsAfter.speaker, optionsBefore.speaker);
  assert.deepEqual(optionsAfter.readUnits, optionsBefore.readUnits, 'Options must not complete the authored unit.');
  assert.deepEqual(optionsAfter.campaign, optionsBefore.campaign, 'Options must preserve campaign facts.');
  assertPicture(optionsAfter.picture92, EXPECTED_BUTTON, 'Options picture92');
  assertPicture(optionsAfter.picture63, EXPECTED_BUST, 'Options Ivaí bust');
  const optionsRendered = await waitForNativeBitmapReady(context, 'editor-options-rendered');
  assertRenderedPicture(optionsRendered, 'Options picture92');
  assertPictureLayer(optionsRendered, 'Options picture92');
  await context.shot('editor-options-restored');

  await player.until('formation');
  const completed = await observeState(context, 'editor-custom-completed');
  assert.ok(completed.readUnits.includes(82));
  assert.ok(completed.readUnits.includes(352), 'The replacement unit must complete once.');
  assert.equal(completed.readUnits.includes(83), false);
  assert.deepEqual(completed.campaign, fresh.campaign, 'An observational conversation must not mutate campaign facts.');

  // Reopen the same public branch. Its seen state is the only permission that enables FAST.
  await player.choose('Gorvak vigia');
  await player.choose('Conversar');
  const reread = await advanceUntilText(context, player, surface => surface.text.includes(EDITED_TEXT), 'editor-custom-reread');
  const rereadState = await observeState(context, 'editor-custom-reread-state');
  assert.equal(reread.text, custom.text);
  assert.equal(rereadState.disallowed, false, 'A completed replacement unit must allow provider reread controls.');
  assert.equal(rereadState.auto, false);
  assert.equal(rereadState.fast, false);
  assert.ok(rereadState.readUnits.includes(352));
  assert.equal(rereadState.readUnits.includes(83), false);
  assertPicture(rereadState.picture92, EXPECTED_BUTTON, 'reread picture92');
  assertPicture(rereadState.picture63, EXPECTED_BUST, 'reread Ivaí bust');
  const rereadRendered = await waitForNativeBitmapReady(context, 'editor-custom-reread-rendered');
  assertRenderedPicture(rereadRendered, 'reread picture92');
  assertPictureLayer(rereadRendered, 'reread picture92');
  await context.shot('editor-custom-reread');
  const fast = await activateFast(context);
  assert.equal(fast.active, true);
  assert.equal(fast.disallowed, false);
  await player.until('formation');
  const afterFast = await observeState(context, 'editor-reread-completed');
  assert.ok(afterFast.readUnits.includes(352));
  assert.equal(afterFast.readUnits.includes(83), false);
  assert.deepEqual(afterFast.campaign, completed.campaign, 'FAST reread must preserve campaign facts.');

  let selectionParent = afterFast.campaign;
  for (const [index, name] of ['Gorvak vigia', 'Elowen', 'Griznik'].entries()) {
    await player.choose(name);
    await player.choose('Selecionar');
    const selected = await player.snapshot(`editor-selected-${index + 1}`);
    const heroId = ['H1', 'H2', 'H3'][index];
    assert.deepEqual(selected.campaign.draftPartyIds, ['H1', 'H2', 'H3'].slice(0, index + 1));
    assert.equal(selected.campaign.sequence, selectionParent.sequence + 1, 'A public selection must advance the campaign sequence once.');
    assert.equal(selected.campaign.history.length, selectionParent.history.length + 1, 'A public selection must append one history entry.');
    assert.deepEqual(selected.campaign.history.at(-1), { sequence: selected.campaign.sequence, type: 'TOGGLE_HERO', heroId });
    assert.deepEqual(campaignFacts(selected.campaign), campaignFacts(selectionParent), 'Public formation selection must preserve unrelated campaign facts.');
    selectionParent = selected.campaign;
  }

  const beforeDeparture = await player.snapshot('editor-before-departure');
  assert.equal(beforeDeparture.campaign.phase, 'formation');
  assert.deepEqual(beforeDeparture.campaign.draftPartyIds, ['H1', 'H2', 'H3']);
  await player.choose('Destinos');
  const destinations = await player.until('destinations');
  const route = destinations.labels.find(label => label.includes('Caminho da Igreja'));
  assert.ok(route, 'The edited copy must retain the public physical route.');
  await player.choose(route);
  await player.choose('Partir');
  await context.wait(sequence => {
    const campaign = window.$gameSystem?._dryland?.campaign;
    const persistence = window.$gameTemp?._drylandPersistence;
    return campaign?.sequence > sequence && campaign.phase === 'dungeon_intro' && campaign.dungeonId === 'physical' && JSON.stringify(campaign.partyIds) === JSON.stringify(['H1', 'H2', 'H3']) && persistence?.status === 'saved' && persistence.lastSuccessfulSequence === campaign.sequence;
  }, beforeDeparture.campaign.sequence);
  await player.ready();
  const departure = await captureNativeSave(context, 'editor-departure');
  assert.equal(departure.fileId, 1);
  assert.equal(departure.campaign.phase, 'dungeon_intro');
  assert.equal(departure.campaign.dungeonId, 'physical');
  assert.deepEqual(departure.campaign.partyIds, ['H1', 'H2', 'H3']);
  assert.ok(departure.nativeState.readUnits.includes(352));
  assert.equal(departure.nativeState.readUnits.includes(83), false);
  const savedPicture = await readSavedPicture(context, 'editor-departure-picture92', departure.fileId);
  assertPicture(savedPicture, EXPECTED_BUTTON, 'persisted picture92');
  const departureRendered = await waitForNativeBitmapReady(context, 'editor-departure-rendered');
  assertRenderedPicture(departureRendered, 'departure picture92');
  assertPictureLayer(departureRendered, 'departure picture92', { requireChurch: true });
  await context.shot('editor-departure');

  // A real close/reopen and Continue must restore the native payload and its authored picture.
  await context.reopen();
  await player.choose('Continuar');
  await player.file(departure.fileId);
  await player.ready();
  const resumed = await player.snapshot('editor-reopened');
  assert.equal(resumed.fileId, departure.fileId);
  assert.deepEqual(resumed.campaign, departure.campaign);
  assert.ok(resumed.readUnits.includes(352));
  assert.equal(resumed.readUnits.includes(83), false);
  const resumedState = await observeState(context, 'editor-reopened-state');
  assertPicture(resumedState.picture92, EXPECTED_BUTTON, 'reopened picture92');
  const reopenedRendered = await waitForNativeBitmapReady(context, 'editor-reopened-rendered');
  assertRenderedPicture(reopenedRendered, 'reopened picture92');
  assertPictureLayer(reopenedRendered, 'reopened picture92', { requireChurch: true });
  assertRenderedContinuity(departureRendered, reopenedRendered, 'Departure/Continue picture 92 appearance');
  assert.equal(sha256(await context.read('editor-reopened-payload', id => window.StorageManager.loadZip(`file${id}`), departure.fileId)), departure.payloadSha256, 'Continue must leave the saved native payload unchanged.');
  await context.shot('editor-reopened-picture92');

  context.report.observations.push({
    label: 'native-editor-result',
    kind: 'native-editor-result',
    value: {
      authored,
      provenance: { fixture: context.fixture, sources: authoredSources, storageFixture: false, setup: 'fresh New Game through native file selector' },
      profile: { text: profile.text, unread: unread.readUnits },
      unread: { before: unread, rejected, rendered: unreadRendered },
      options: { state: optionsAfter, rendered: optionsRendered },
      reread: { state: rereadState, fast, rendered: rereadRendered },
      departure: { campaign: departure.campaign, nativeState: departure.nativeState, payloadSha256: departure.payloadSha256, picture92: savedPicture, rendered: departureRendered },
      reopened: { campaign: resumed.campaign, readUnits: resumed.readUnits, picture92: resumedState.picture92, rendered: reopenedRendered }
    }
  });
}

export async function verify({ expected, artifacts, report }) {
  const result = report.observations.find(observation => observation.kind === 'native-editor-result');
  return {
    criteria: expected.map(criterion => ({
      ...criterion,
      status: result ? 'executed-awaiting-review' : 'fail',
      observed: result?.value,
      evidence: artifacts.map(artifact => artifact.path),
      limits: [
        'The run proves runtime use of the native-edited copy through public input and read-only observations; it does not replace the editor authorship trail.',
        'Map-event opening, editor usability, rendered composition judgment and final visual acceptance remain human/editor review decisions.',
        'The fresh journey covers H1/H2/H3 and the physical departure checkpoint; the other hero entries and map families remain covered by their assigned lots.'
      ]
    })),
    pendingReviews: result ? ['Review the native MZ editor trail and the captured authored-copy composition before closing V-003/V-005/V-006.'] : []
  };
}
