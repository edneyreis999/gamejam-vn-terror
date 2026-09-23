import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
import { captureNativeSave } from '../../../rpg-maker/qa/native-save-archive.mjs';

const ref = 'planos/tasks/revised-trap-prose-integration/task-05.md#required-visual-coverage';
const names = ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska'];
const gdd = JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json', import.meta.url)));
export const sourceFiles = [new URL('../../../rpg-maker/qa/native-player.mjs', import.meta.url), new URL('../../../rpg-maker/qa/native-save-archive.mjs', import.meta.url), new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json', import.meta.url)];
export const scenario = {
  id: 'revised-trap-prose-fit',
  criteria: [{ id: 'FIT-CHOICES', variant: '1280x720', expectedRef: ref }, { id: 'FIT-PROSE', variant: '1280x720', expectedRef: ref }],
  requires: ['native-mz', 'public-input'], storage: { expectedRef: ref },
  browser: { width: 1280, height: 720, dpr: 1, locale: 'pt-BR', channel: 'chrome', launchArgs: ['--force-device-scale-factor=1'], query: '', timeoutMs: 45000, executionTimeoutMs: 1800000 }
};

export async function execute(context) {
  const choices = new Set(), prose = [], boxes = new Map();
  let deathTaken = false, resumed = false, serial = 0;
  async function observe(player, surface) {
    const state = (await player.snapshot('prose-position')).campaign;
    const id = state.reading?.passageIds[state.reading.index] || '';
    if (!/^(encounter\.|result\..+success|death\.)/.test(id)) return;
    const box = (boxes.get(id) || 0) + 1;
    boxes.set(id, box);
    const metrics = await context.read('prose-fit-metrics', () => {
      const w = SceneManager._scene._messageWindow;
      const lines = $gameMessage.allText().replaceAll('<br>', '').split('\n');
      return { lines, widths: lines.map(line => w.textWidth(line)), fontFace: w.contents.fontFace, fontSize: w.contents.fontSize,
        window: { x: w.x, y: w.y, width: w.width, height: w.height }, contentsWidth: w.contentsWidth(), lineHeight: w.lineHeight() };
    });
    const category = id.startsWith('encounter.') ? 'description' : id.startsWith('death.') ? 'death' : 'success';
    const prior = prose.filter(p => p.category === category);
    const width = Math.max(...metrics.widths);
    // Retain first shared format and subsequently wider boxes, plus paragraph questions.
    if (!prior.length || width > Math.max(...prior.map(p => p.width)) || (category === 'description' && surface.text.trim().endsWith('?') && !prose.some(p => p.question))) {
      const shot = `prose-${++serial}-${id.replaceAll('.', '-')}-box${box}`;
      await context.shot(shot);
      prose.push({ id, box, category, width, question: surface.text.trim().endsWith('?'), shot, ...metrics });
      console.log('PROSE', id, box, width);
    }
  }
  const player = new DirectedNativePlayer(context, { onPassage: observe });
  await player.choose(context.descriptor.nativeArchive ? 'Continuar' : 'Jogar');
  await player.file(1);
  if (!context.descriptor.nativeArchive) await player.returnToTavern();
  for (let step = 0; step < 500; step++) {
    const surface = await player.ready();
    const state = (await player.snapshot('navigation-' + step)).campaign;
    if (choices.size === 16 && prose.some(p => p.category === 'death') && surface.active && surface.kind !== 'approaches') break;
    if (surface.active && surface.kind === 'formation') {
      const alive = names.map((_, i) => 'H' + (i + 1)).filter(id => !state.deadHeroIds.includes(id));
      const desired = ['H1', 'H2', 'H3', 'H5', 'H8', 'H4', 'H6', 'H7'].filter(id => alive.includes(id)).slice(0, 3);
      for (const id of state.draftPartyIds.filter(id => !desired.includes(id))) {
        await player.choose(names[Number(id.slice(1)) - 1]); await player.choose('Retirar do grupo'); await player.returnToTavern();
      }
      for (const id of desired.filter(id => !state.draftPartyIds.includes(id))) {
        await player.choose(names[Number(id.slice(1)) - 1]); await player.choose('Selecionar'); await player.returnToTavern();
      }
      const route = ['physical', 'supernatural', 'final'].find(id => !state.completedDungeonIds.includes(id));
      await player.choose('Destinos');
      const destinations = await player.until('destinations');
      const label = await context.read('route-label', id => $dataCommonEvents[4].list.find(c => c.code === 357 && c.parameters[1] === 'ConfigureRoute' && c.parameters[3].id === id).parameters[3].name, route);
      await player.choose(destinations.labels.find(text => text.includes(label)));
      await player.choose('Partir');
    } else if (surface.active && surface.kind === 'approaches') {
      const encounter = state.assignments[state.dungeonId][state.position - 1];
      if (!choices.has(encounter)) {
        await context.shot('choices-' + encounter);
        choices.add(encounter);
        context.report.observations.push({ label: 'choice-' + encounter, kind: 'choice-fit', value: { encounter, labels: surface.labels.slice(0, 3), file: state.currentFileId, map: surface.map } });
        console.log('CHOICES', encounter, choices.size);
      }
      if (!resumed) {
        await captureNativeSave(context, 'own-first-reveal');
        await context.reopenPage();
        await player.choose('Continuar'); await player.file(1);
        resumed = true;
        continue;
      }
      const viable = gdd.encounterPairs[encounter].map(c => state.partyIds.some(h => gdd.heroPairs[h].includes(c)));
      const missing = viable.indexOf(false);
      const index = !deathTaken && missing >= 0 ? missing : viable.indexOf(true);
      assert.ok(index >= 0, 'Navigation needs a supported approach');
      if (!viable[index]) deathTaken = true;
      await player.choose(surface.labels[index]);
    } else if (surface.active && surface.kind === 'sacrifice') {
      await player.choose(surface.labels[0]);
    } else {
      assert.ok(surface.paused, JSON.stringify(surface));
      await observe(player, surface);
      await context.input.key('Enter');
    }
    assert.ok(step < 499, 'Visual navigation did not finish');
  }
  await captureNativeSave(context, 'own-visual-end');
  context.report.observations.push({ label: 'visual-result', kind: 'visual-result', value: { choices: [...choices].sort(), prose, resumedOwnSave: resumed, fileId: 1 } });
  assert.equal(choices.size, 16);
  assert.ok(['description', 'success', 'death'].every(category => prose.some(p => p.category === category)));
}

export async function verify({ expected, artifacts, report }) {
  const result = report.observations.find(row => row.kind === 'visual-result');
  return { criteria: expected.map(row => ({ ...row, status: result ? 'executed-awaiting-review' : 'pending', observed: result?.value,
    evidence: artifacts.map(a => a.path), limits: ['Visual fit only; narrative sampling; engine, controls and save correctness are waived.'] })),
  pendingReviews: ['View all sixteen choice captures and selected description/success/death boxes.'] };
}
