import assert from 'node:assert/strict';
import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url)];

export const scenario = {
  id: 'opening-the-well',
  browser: { width: 1280, height: 720, dpr: 1, locale: 'en-US', channel: 'chrome' },
  requires: ['browser', 'public-input'],
  criteria: [{ id: 'music', variant: 'opening', expectedRef: 'planos/tasks/opening-the-well/spec.md#expected-result' }]
};

export async function execute(context) {
  const {wait,read,input,shot}=context;
  const player=new DirectedNativePlayer(context);
  await wait(() => window.$gameMessage?.isChoice());
  await input.key('ArrowDown');
  await wait(() => AudioManager._bgmBuffer?.isPlaying() && AudioManager._bgmBuffer?.isReady());
  const opening = await read('opening-audio', () => ({
    name: AudioManager._currentBgm.name,
    loop: AudioManager._bgmBuffer._loop,
    duration: AudioManager._bgmBuffer._totalTime
  }));
  assert.equal(opening.name, 'Dryland_Opening_TheWell');
  assert.equal(opening.loop, true);
  assert.ok(opening.duration > 30 && opening.duration < 32);
  await shot('opening');
  await player.choose('New Game');
  await wait(() => $gameMap.mapId()===1 && SceneManager._scene._messageWindow?.pause);
  assert.equal(await read('notice-audio', () => AudioManager._currentBgm?.name), 'Dryland_Opening_TheWell');
  await shot('age-notice');
  await player.file(1);
  await wait(() => $gameMap.mapId() === 2 && AudioManager._currentBgm?.name === 'Dryland_Opening_TheWell');
  await read('prologue-audio', () => ({ map: $gameMap.mapId(), bgm: AudioManager._currentBgm }));
}

export async function verify() {
  return { criteria: [{ ...scenario.criteria[0], status: 'executed-awaiting-review', evidence: [], limits: ['Runtime loading, native looping flag and departure only; no listening or full-cycle observation.'] }], pendingReviews: ['Human audio comfort judgment.'] };
}
