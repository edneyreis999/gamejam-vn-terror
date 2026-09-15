import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';

export const sourceFiles = [new URL('./native-player.mjs', import.meta.url)];
export const scenario = {
  id: 'gorvak-map-native-editor',
  criteria: [{ id: 'map-authored-text', variant: 'native-mz-edit', expectedRef: 'docs/qa/guides/eventbridge-minimal-runtime.md' }],
  requires: ['native-mz', 'public-input'],
  browser: { width: 1280, height: 720, dpr: 1, locale: 'pt-BR', query: '', timeoutMs: 30000 }
};

// Run only against a disposable copy edited in the MZ UI as the guide describes.
export async function execute(context) {
  const player = new DirectedNativePlayer(context);
  await player.choose('Jogar');
  await player.file(1);
  await player.until('formation');
  const before = await player.snapshot('before-map-authored-text');
  await player.choose('Gorvak', { mouse: true });
  await player.until('hero');
  assert.equal((await player.surface()).map, 37);
  await player.choose('Conversar');
  assert.equal((await player.ready()).text, 'Gorvak — fala editada no mapa.');
  const author = await context.read('authored-command-owner', () => ({
    event: $gameMap._interpreter._eventId,
    nativeList: $gameMap._interpreter._list === $dataMap.events[1].pages[0].list,
    unit: $gameMap._interpreter._drylandObservedUnit,
    unread: $gameSystem.isExtendedFastForwardDisallowed()
  }));
  assert.deepEqual(author, { event: 1, nativeList: true, unit: 82, unread: true });
  await context.shot('map-edited-line-in-game');
  await player.until('hero');
  assert.equal((await player.surface()).map, 37);
  const after = await player.snapshot('map-authored-text-completed');
  assert.deepEqual(after.campaign, before.campaign);
  assert.ok(after.readUnits.includes(82) && after.readUnits.includes(83));
  await player.returnToTavern();
  await context.shot('map-edited-return');
  await context.read('editor-experiment-completed', () => ({ map: $gameMap.mapId(), text: $gameMessage.allText() }));
}

export async function verify({ expected, report, artifacts }) {
  const completed = report.observations.some(row => row.label === 'editor-experiment-completed');
  return {
    criteria: expected.map(row => ({ ...row, status: completed ? 'executed-awaiting-review' : 'fail',
      observed: 'A native MZ text edit in Map037/event001 was played through the actual tavern portrait.',
      evidence: artifacts.map(artifact => artifact.path), limits: ['Technical editability does not accept human authoring usability.'] })),
    pendingReviews: ['Inspect the edited-line capture; human architectural acceptance remains pending.']
  };
}
