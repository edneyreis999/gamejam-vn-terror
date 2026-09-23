import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
import { captureNativeSave } from '../../../rpg-maker/qa/native-save-archive.mjs';

const ref = 'planos/tasks/dungeon-dialogue-reading/verification.md#expected-dungeon-reading';
const names = ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska'];
const matrixURL = new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json', import.meta.url);
const pagesURL = new URL('./reading-pages.json', import.meta.url);
const gdd = JSON.parse(await readFile(matrixURL));
const authored = JSON.parse(await readFile(pagesURL));
export const sourceFiles = [new URL('../../../rpg-maker/qa/native-player.mjs', import.meta.url), new URL('../../../rpg-maker/qa/native-save-archive.mjs', import.meta.url), matrixURL, pagesURL];
export const scenario = {
  id: 'dungeon-dialogue-reading',
  criteria: [{ id: 'DUNGEON-READING', variant: '1280x720', expectedRef: ref }],
  requires: ['native-mz', 'public-input'], storage: { expectedRef: ref },
  browser: { width: 1280, height: 720, dpr: 1, locale: 'pt-BR', channel: 'chrome', launchArgs: ['--force-device-scale-factor=1'], query: '', timeoutMs: 45000, executionTimeoutMs: 1800000 }
};

export async function execute(context) {
  const observed = new Map(), selected = [], descriptions = new Set();
  let deathTaken = false, resumed = false, reread = false, measured = false;
  async function observe(player, surface) {
    const state = (await player.snapshot('reading-position')).campaign;
    const id = state.reading?.passageIds[state.reading.index] || '';
    if (!/^(encounter\.|result\.|death\.|farewell\.|closure\.|council\.|opinion\.|ending\.|threshold\.|lover\.|reward\.|map\.reveal|irati\.)/.test(id)) return;
    const key = id + ':' + surface.text;
    if (observed.has(key)) return;
    observed.set(key, { id, text: surface.text, speaker: await context.read('visible-speaker', () => $gameMessage.speakerName()) });
    if (id.startsWith('encounter.')) descriptions.add(id);
    const select = id.startsWith('encounter.B') || id === 'result.B3-3.success.01' ||
      (id.includes('.success') && !selected.some(x => x.id.includes('.success'))) ||
      /^(death\.|farewell\.|closure\.|council\.(01|02|03|confession)|ending\.)/.test(id);
    if (select) {
      const shot = `reading-${selected.length + 1}-${id.replaceAll('.', '-')}`;
      await context.shot(shot);
      selected.push({ shot, id, text: surface.text });
      console.log('READING', id);
    }
    if (!measured && id.startsWith('encounter.')) {
      const widths = await context.read('all-authored-page-widths', pages => {
        const w = SceneManager._scene._messageWindow;
        const available = w.contentsWidth() - w.newLineX({ rtl: false });
        return { font: w.contents.fontFace, fontSize: w.contents.fontSize, available,
          pages: pages.map(page => {
            const lines = [];
            for (const paragraph of page.text.split(/<br>|\n/)) {
              let line = '';
              for (const word of paragraph.trim().split(/\s+/)) {
                const next = line ? line + ' ' + word : word;
                if (line && w.textWidth(next) > available) { lines.push(line); line = word; }
                else line = next;
              }
              lines.push(line);
            }
            return { ...page, lines, widths: lines.map(line => w.textWidth(line)) };
          }) };
      }, authored);
      for (const page of widths.pages) {
        assert.ok(page.lines.length <= 4, `More than four rows: ${page.reading}: ${page.text}`);
        assert.ok(page.widths.every(width => width <= widths.available), `Horizontal overflow: ${page.reading}`);
      }
      context.report.observations.push({ label: 'all-page-widths', kind: 'all-page-widths', value: widths });
      measured = true;
    }
  }
  const player = new DirectedNativePlayer(context, { onPassage: observe });
  await player.choose('Jogar'); await player.file(1); await player.returnToTavern();
  for (let step = 0; step < 600; step++) {
    const surface = await player.ready();
    const state = (await player.snapshot('navigation-' + step)).campaign;
    if (['memorial', 'epilogue', 'campaign_complete'].includes(state.phase)) break;
    if (surface.active && surface.kind === 'formation') {
      const desired = ['H1', 'H2', 'H3', 'H5', 'H8', 'H4'].filter(id => !state.deadHeroIds.includes(id)).slice(0, 3);
      for (const id of state.draftPartyIds.filter(id => !desired.includes(id))) {
        await player.choose(names[Number(id.slice(1)) - 1]); await player.choose('Retirar do grupo'); await player.returnToTavern();
      }
      for (const id of desired.filter(id => !state.draftPartyIds.includes(id))) {
        await player.choose(names[Number(id.slice(1)) - 1]); await player.choose('Selecionar'); await player.returnToTavern();
      }
      const route = ['physical', 'supernatural', 'final'].find(id => !state.completedDungeonIds.includes(id));
      assert.ok(route);
      await player.choose('Destinos'); const destinations = await player.until('destinations');
      const label = await context.read('route-label', id => $dataCommonEvents[4].list.find(c => c.code === 357 && c.parameters[1] === 'ConfigureRoute' && c.parameters[3].id === id).parameters[3].name, route);
      await player.choose(destinations.labels.find(text => text.includes(label))); await player.choose('Partir');
    } else if (surface.active && surface.kind === 'approaches') {
      const encounter = state.assignments[state.dungeonId][state.position - 1];
      assert.equal([...observed.values()].filter(x => x.id === `encounter.${encounter}.01`).length, 2);
      if (!reread) { await player.choose('Rever descrição'); await player.until('approaches'); reread = true; }
      if (!resumed) {
        await captureNativeSave(context, 'own-first-description');
        await context.reopenPage(); await player.choose('Continuar'); await player.file(1);
        await player.until('approaches'); resumed = true;
      }
      const viable = gdd.encounterPairs[encounter].map(c => state.partyIds.some(h => gdd.heroPairs[h].includes(c)));
      const missing = viable.indexOf(false);
      let choice = viable.indexOf(true);
      if (!deathTaken && encounter.startsWith('A') && missing >= 0) { choice = missing; deathTaken = true; }
      else if (encounter === 'B3') { assert.ok(viable[2]); choice = 2; }
      if (choice < 0) {
        await player.choose('Recuar'); const retreat = await player.until('retreat'); await player.choose(retreat.labels[0]); await player.returnToTavern();
        continue;
      }
      await player.choose(surface.labels[choice]);
    } else if (surface.active && surface.kind === 'sacrifice') {
      await context.shot('sacrifice-choice'); await player.choose(surface.labels[0]);
    } else if (surface.active && surface.kind === 'ending') {
      await context.shot('final-choice'); await captureNativeSave(context, 'own-council-choice');
      await player.choose(surface.labels[0]);
    } else {
      assert.ok(surface.paused, JSON.stringify(surface));
      await observe(player, surface); await context.input.key('Enter');
    }
    assert.ok(step < 599, 'Journey did not reach final consequence');
  }
  assert.equal(descriptions.size, 16);
  assert.ok(deathTaken && resumed && reread && measured);
  for (const prefix of ['death.', 'closure.first.', 'closure.second.', 'council.03', 'ending.reunite.01', 'ending.reunite.02', 'result.B3-3.success']) {
    assert.ok([...observed.values()].some(x => x.id.startsWith(prefix)), 'Missing reading ' + prefix);
  }
  context.report.observations.push({ label: 'dungeon-reading-result', kind: 'dungeon-reading-result', value: { observed: [...observed.values()], selected, resumed, reread, descriptions: [...descriptions], deathTaken } });
}

export async function verify({ expected, artifacts, report }) {
  const result = report.observations.find(row => row.kind === 'dungeon-reading-result');
  return { criteria: expected.map(row => ({ ...row, status: result ? 'executed-awaiting-review' : 'pending', observed: result?.value,
    evidence: artifacts.map(a => a.path), limits: ['Inspect selected captures; unvisited variants have static and font-width coverage only. Human pacing acceptance pending.'] })),
  pendingReviews: ['Inspect selected description, success, farewell/death, closure, Council and ending captures.'] };
}
