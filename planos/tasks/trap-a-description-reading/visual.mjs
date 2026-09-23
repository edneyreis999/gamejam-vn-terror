import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
import { captureNativeSave } from '../../../rpg-maker/qa/native-save-archive.mjs';

const ref = 'planos/tasks/trap-a-description-reading/verification.md#expected-reading';
const names = ['Gorvak', 'Elowen', 'Griznik'];
const gdd = JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json', import.meta.url)));
export const sourceFiles = [new URL('../../../rpg-maker/qa/native-player.mjs', import.meta.url), new URL('../../../rpg-maker/qa/native-save-archive.mjs', import.meta.url), new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json', import.meta.url)];
export const scenario = {
  id: 'trap-a-description-reading',
  criteria: [{ id: 'A-READING', variant: '1280x720', expectedRef: ref }],
  requires: ['native-mz', 'public-input'], storage: { expectedRef: ref },
  browser: { width: 1280, height: 720, dpr: 1, locale: 'pt-BR', channel: 'chrome', launchArgs: ['--force-device-scale-factor=1'], query: '', timeoutMs: 45000, executionTimeoutMs: 1800000 }
};

export async function execute(context) {
  const pages = new Map(), encounters = new Set();
  let checkedReread = false, resumed = false;
  async function observe(player, surface) {
    const state = (await player.snapshot('description-position')).campaign;
    const reading = state.reading?.passageIds[state.reading.index] || '';
    if (!/^encounter\.A[1-8]\.01$/.test(reading)) return;
    const page = surface.text.includes('Como o grupo') ? 2 : 1;
    const key = reading.split('.')[1] + '-page-' + page;
    const metrics = await context.read('description-fit', () => {
      const w = SceneManager._scene._messageWindow, t = w._textState;
      return { text: $gameMessage.allText(), textState: t && { index: t.index, length: t.text.length, x: t.x, y: t.y, height: t.height },
        window: { x: w.x, y: w.y, width: w.width, height: w.height },
        innerHeight: w.innerHeight, fontSize: w.contents.fontSize, lineHeight: w.lineHeight() };
    });
    if (metrics.textState) {
      assert.equal(metrics.textState.index, metrics.textState.length, key + ': overflow introduced another page');
      assert.ok(metrics.textState.y + metrics.textState.height <= metrics.innerHeight, key + ': text exceeds window');
    }
    if (!pages.has(key)) {
      await context.shot(key);
      pages.set(key, metrics);
      console.log('DESCRIPTION', key, JSON.stringify(metrics.textState));
    } else assert.equal(surface.text, pages.get(key).text, 'Repeated description differs');
  }
  const player = new DirectedNativePlayer(context, { onPassage: observe });
  await player.choose('Jogar');
  await player.file(1);
  await player.returnToTavern();
  for (let step = 0; step < 500; step++) {
    const surface = await player.ready();
    const state = (await player.snapshot('navigation-' + step)).campaign;
    if (surface.active && surface.kind === 'formation') {
      for (const [index, name] of names.entries()) {
        if (state.draftPartyIds.includes('H' + (index + 1))) continue;
        await player.choose(name); await player.choose('Selecionar'); await player.returnToTavern();
      }
      const route = ['physical', 'supernatural', 'final'].find(id => !state.completedDungeonIds.includes(id));
      assert.ok(route, 'All A descriptions should have been encountered');
      await player.choose('Destinos');
      const destinations = await player.until('destinations');
      const label = await context.read('route-label', id => $dataCommonEvents[4].list.find(c => c.code === 357 && c.parameters[1] === 'ConfigureRoute' && c.parameters[3].id === id).parameters[3].name, route);
      await player.choose(destinations.labels.find(text => text.includes(label)));
      await player.choose('Partir');
    } else if (surface.active && surface.kind === 'approaches') {
      const encounter = state.assignments[state.dungeonId][state.position - 1];
      if (encounter.startsWith('A')) {
        assert.ok(pages.has(encounter + '-page-1') && pages.has(encounter + '-page-2'), 'Choices appeared before both pages');
        if (!encounters.has(encounter)) await context.shot(encounter + '-choices');
        encounters.add(encounter);
        if (!checkedReread) {
          await player.choose('Rever descrição');
          await player.until('approaches');
          const after = (await player.snapshot('after-reread')).campaign;
          assert.equal(after.position, state.position);
          assert.equal(after.dungeonId, state.dungeonId);
          assert.deepEqual(after.partyIds, state.partyIds);
          checkedReread = true;
        }
        if (!resumed) {
          await captureNativeSave(context, 'own-description-checkpoint');
          await context.reopenPage();
          await player.choose('Continuar'); await player.file(1);
          await player.until('approaches');
          const after = (await player.snapshot('after-continue')).campaign;
          assert.equal(after.position, state.position);
          assert.equal(after.dungeonId, state.dungeonId);
          resumed = true;
        }
        if (encounters.size === 8) break;
      }
      const viable = gdd.encounterPairs[encounter].findIndex(c => state.partyIds.some(h => gdd.heroPairs[h].includes(c)));
      assert.ok(viable >= 0, 'Navigation needs a supported approach');
      await player.choose(surface.labels[viable]);
    } else {
      assert.ok(surface.paused, JSON.stringify(surface));
      await observe(player, surface);
      await context.input.key('Enter');
    }
    assert.ok(step < 499, 'Description navigation did not finish');
  }
  assert.equal(pages.size, 16);
  assert.equal(encounters.size, 8);
  assert.ok(checkedReread && resumed);
  context.report.observations.push({ label: 'description-result', kind: 'description-result', value: { pages: Object.fromEntries(pages), encounters: [...encounters].sort(), checkedReread, resumed } });
}

export async function verify({ expected, artifacts, report }) {
  const result = report.observations.find(row => row.kind === 'description-result');
  return { criteria: expected.map(row => ({ ...row, status: result ? 'executed-awaiting-review' : 'pending', observed: result?.value,
    evidence: artifacts.map(a => a.path), limits: ['Agent visual inspection required; human pacing acceptance pending.'] })),
  pendingReviews: ['Inspect all sixteen A description page captures and choice boundaries.'] };
}
