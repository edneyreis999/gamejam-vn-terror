import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { openChrome, startServer } from '../tests/helpers/native-chrome.mjs';
import { NativePlayer, DirectedNativePlayer } from './native-player.mjs';
export const sourceFiles = [new URL('./native-player.mjs', import.meta.url)];
const recovery = process.env.DRYLAND_QA_SURFACE === 'storage-recovery' || process.env.DRYLAND_QA_SURFACE === 'image-recovery';
const imageRecovery = process.env.DRYLAND_QA_SURFACE === 'image-recovery';
const absence = process.env.DRYLAND_QA_SURFACE === 'absence-retreat';
const large = process.env.DRYLAND_QA_VIEWPORT === 'large-reduced';
const nativeZoom = process.env.DRYLAND_QA_VIEWPORT === 'native-zoom';
const editorPackage = process.env.DRYLAND_QA_SURFACE === 'editor-package';
const currentPackage = process.env.DRYLAND_QA_SURFACE === 'current-package';
const packageReview = editorPackage || currentPackage;
const encounterInput = process.env.DRYLAND_QA_SURFACE === 'encounter-input';
export const scenario = {
  id: recovery ? (imageRecovery ? 'image-recovery' : 'storage-recovery') : absence ? 'absence-retreat' : packageReview ? process.env.DRYLAND_QA_SURFACE : encounterInput ? 'encounter-input' : 'entry-preparation-hide',
  faultIds: recovery ? [imageRecovery ? 'required-image' : 'storage-rejection'] : [],
  publicCommands: ['expeditionQA.setSeed'],
  criteria: recovery ? (imageRecovery ? ['E2E-017'] : ['E2E-013', 'E2E-014']).map(id => ({ id, variant: 'isolated-recovery', expectedRef: 'docs/qa/guides/native-mz-cycle.md' })) : absence ? ['E2E-004', 'E2E-005', 'E2E-019'].map(id => ({ id, variant: 'absence-retreat', expectedRef: 'docs/qa/guides/native-mz-cycle.md' })) : editorPackage ? [
    { id: 'E2E-018', variant: 'editor-package', expectedRef: 'docs/qa/guides/native-mz-cycle.md#E2E-018' },
    { id: 'V-EXPORT', variant: 'editor-package', expectedRef: 'docs/qa/guides/native-mz-cycle.md#V-EXPORT' }
  ] : currentPackage ? [
    { id: 'E2E-018', variant: 'current-package', expectedRef: 'docs/qa/guides/native-mz-cycle.md#E2E-018' },
    { id: 'V-EXPORT', variant: 'current-package', expectedRef: 'docs/qa/guides/native-mz-cycle.md#V-EXPORT' }
  ] : encounterInput ? [
    { id: 'E2E-003', variant: 'long-choices-held-input', expectedRef: 'docs/qa/guides/native-mz-cycle.md#E2E-003' }
  ] : [
    { id: 'E2E-002', variant: 'preparation', expectedRef: 'docs/qa/guides/native-mz-cycle.md#E2E-002' },
    { id: 'E2E-015', variant: 'message-choice-hide', expectedRef: 'docs/qa/guides/native-mz-cycle.md#E2E-015' }
  ],
  requires: ['native-mz', 'public-input'],
  browser: { width: large ? 1920 : 1280, height: large ? 1080 : 720, reducedMotion: large ? 'reduce' : 'no-preference', dpr: 1, locale: 'pt-BR', query: '', timeoutMs: 30000, ...(nativeZoom ? { nativeZoom: 1.1, launchArgs: ['--window-size=1920,1080'] } : {}) }
};

export async function execute(context) {
  const player = new DirectedNativePlayer(context);
  if (recovery) return executeRecovery(context, player);
  await player.choicesContaining('Jogar');
  assert.deepEqual(await context.input.publicCommand('expeditionQA.setSeed', [9]), { ok: true, seed: 9 });
  await context.shot('entry');
  const audio = await context.read('no-autoplay', () => ({
    bgm: !!AudioManager._bgmBuffer?.isPlaying(), bgs: !!AudioManager._bgsBuffer?.isPlaying(), me: !!AudioManager._meBuffer?.isPlaying()
  }));
  assert.deepEqual(audio, { bgm: false, bgs: false, me: false });
  await player.choose('Jogar');
  await player.ready();
  assert.equal((await player.surface()).map, 2);
  if (editorPackage) assert.equal((await player.surface()).text, 'Teste de autoria no editor: a chuva chega na taverna.');
  await context.shot('prologue');

  async function hide(stage, mouse) {
    await context.read(`${stage}-window-before`, () => {
      const window = SceneManager._scene._choiceListWindow;
      return { scale: { x: window.scale.x, y: window.scale.y }, visible: window.visible,
        reapply: typeof window.applyHideChoiceWindow };
    });
    const before = await player.snapshot(`${stage}-before-hide`);
    const visibleBefore = await player.surface();
    const text = visibleBefore.text;
    await context.input.key('Tab');
    await context.wait(() => SceneManager._scene._messageWindow.scale.x === 0);
    await context.shot(`${stage}-hidden`);
    await context.input.key('ArrowDown');
    await context.input.key('Enter');
    assert.deepEqual(await player.snapshot(`${stage}-hidden-input`), before);
    if (!(await player.surface()).hidden) await context.input.key('Tab');
    await context.wait(() => SceneManager._scene._messageWindow.scale.x === 0);
    if (mouse) {
      await player.click(640, 360);
    } else await context.input.key('Tab');
    await context.wait(() => SceneManager._scene._messageWindow.scale.x === 1);
    const windowAfter = await context.read(`${stage}-window-after`, () => {
      const window = SceneManager._scene._choiceListWindow;
      return { scale: { x: window.scale.x, y: window.scale.y }, visible: window.visible };
    });
    if (stage.startsWith('choice-')) assert.equal(windowAfter.scale.x, 0, 'Restore picture-only choices without an overlapping native list');
    assert.deepEqual(await player.snapshot(`${stage}-after-hide`), before);
    assert.equal((await player.surface()).text, text);
    assert.equal((await player.surface()).index, visibleBefore.index);
    await context.shot(`${stage}-restored`);
  }
  await hide('message-keyboard', false);
  await hide('message-mouse', true);
  const beforeOptions = await player.snapshot('before-options');
  const optionsPoint = await context.read('options-button-position', () => { const r = document.querySelector('canvas').getBoundingClientRect(); return { x: r.x + 560 * r.width / 1280, y: r.y + 693 * r.height / 720 }; });
  await player.click(optionsPoint.x, optionsPoint.y);
  await context.wait(() => SceneManager._scene.constructor.name === 'Scene_Options' && SceneManager._scene._optionsWindow?.isOpenAndActive());
  const names = await context.read('visible-volume-labels', () => SceneManager._scene._optionsWindow._list.map(row => row.name.replace(/\\I\[\d+\]/g, '')));
  assert.deepEqual(names, ['Música', 'Ambiente', 'Temas', 'Efeitos']);
  for (let index = 0; index < 4; index++) {
    if (index) await context.input.key('ArrowDown');
    for (let step = 0; step < 4; step++) await context.input.key('ArrowLeft');
    assert.equal(await context.read(`volume-${names[index]}`, position => SceneManager._scene._optionsWindow.statusText(position), index), '0%');
  }
  await context.shot('all-volumes-muted');
  await context.input.key('Escape');
  await player.ready();
  assert.deepEqual(await player.snapshot('after-options'), beforeOptions);
  await player.choicesContaining('Gorvak');
  assert.equal((await player.surface()).map, 3);
  const before = await player.snapshot('formation-before-consultation');
  await player.choose('Partir');
  assert.deepEqual(await player.snapshot('invalid-departure'), before);
  await player.choose('Gorvak', { mouse: true });
  await player.choose('Conversar');
  await player.choicesContaining('Gorvak');
  assert.deepEqual(await player.snapshot('formation-after-profile'), before);
  await player.choose('Elenco');
  await player.choose('Fechar');
  await player.choicesContaining('Gorvak');
  assert.deepEqual(await player.snapshot('formation-after-roster'), before);
  for (const name of ['Gorvak', 'Elowen', 'Griznik']) {
    await player.choose(name);
    await player.choose('Selecionar');
  }
  await player.choose('Destinos');
  await player.choose('Caminho da Igreja');
  await player.choose('Partir');
  await player.choicesContaining('Rever descrição');
  const departed = await player.snapshot('departed');
  assert.deepEqual(departed.snapshot.party, ['H1', 'H2', 'H3']);
  assert.equal(departed.snapshot.dungeon, 'physical');
  assert.equal(departed.validation.ok, true);
  await context.shot('encounter-choices');
  await hide('choice-keyboard', false);
  await hide('choice-mouse', true);
  if (encounterInput) {
    const surface = await player.surface();
    assert.ok(surface.labels.includes('Reconstruir a regra dos rastros de pés virados e identificar o único desvio coerente'));
    assert.equal(surface.labels.length, 5);
    assert.ok(surface.labels.every(label => !/viabilidade|inviável|viável/i.test(label)));
    for (let position = 1; position < 3; position++) {
      await context.input.key('ArrowDown');
      assert.equal((await player.surface()).index, position);
      await context.shot(`long-choice-focus-${position}`);
    }
    const before = await player.snapshot('before-reread');
    await player.choose('Rever descrição');
    await player.ready();
    await context.input.key('Enter', 650);
    await player.choicesContaining('Rever descrição');
    assert.deepEqual(await player.snapshot('after-held-advance'), before);
    const inspected = await context.read('qa-read-only', () => {
      const before = expeditionQA.snapshot();
      const validation = expeditionQA.validate();
      return { before, validation, after: expeditionQA.snapshot(), methods: Object.keys(expeditionQA).sort() };
    });
    assert.deepEqual(inspected.before, inspected.after);
    assert.equal(inspected.validation.ok, true);
    assert.deepEqual(inspected.methods, ['setSeed', 'snapshot', 'validate']);
    await context.shot('choices-after-held-advance');
  }
  if (absence) {
    const assigned = (await player.surface()).labels;
    await player.choose('Reconstruir a regra dos rastros de pés virados e identificar o único desvio coerente');
    await player.choose('Sacrificar Gorvak');
    await player.choose('Recuar');
    await player.choicesContaining('Continuar expedição');
    await context.shot('retreat-confirmation');
    await player.choose('Recuar');
    if (large) {
      await context.wait(() => $gameMap.mapId() === 3 && $gameScreen.brightness() > 0);
      const reduced = await context.read('reduced-absence', () => ({ reduced: matchMedia('(prefers-reduced-motion: reduce)').matches, portrait: !!$gameScreen.picture(10) }));
      assert.deepEqual(reduced, { reduced: true, portrait: false });
      await context.shot('reduced-absence-immediate');
    } else {
    await context.wait(() => $gameMap.mapId() === 3 && $gameScreen.picture(10)?.opacity() > 0 && $gameScreen.picture(10)?.opacity() < 255);
    await context.read('absence-start', () => ({ at: performance.now(), opacity: $gameScreen.picture(10)?.opacity(), reduced: matchMedia('(prefers-reduced-motion: reduce)').matches }));
    await context.shot('gorvak-disappearing');
    await context.wait(() => $gameScreen.picture(10)?.opacity() < 130 && $gameScreen.picture(10)?.opacity() > 0);
    await context.shot('gorvak-disappearing-middle');
    await context.wait(() => !$gameScreen.picture(10));
    await context.read('absence-end', () => ({ at: performance.now(), picture: !!$gameScreen.picture(10) }));
    }
    await player.choicesContaining('Destinos');
    await context.shot('gorvak-absent');
    const returned = await player.snapshot('retreated-after-death');
    assert.deepEqual(returned.snapshot.deadHeroes, ['H1']);
    await player.choose('Griznik');
    await player.choose('Retirar do grupo');
    await player.choicesContaining('Destinos');
    assert.ok(!(await player.surface()).labels.includes('Gorvak'));
    await player.choose('Griznik');
    await player.choose('Selecionar');
    await player.choose('Seraphina');
    await player.choose('Selecionar');
    await player.choose('Destinos');
    await player.choose('Parque das Águas Assombradas');
    await player.choose('Partir');
    await player.choicesContaining('Rever descrição');
    await player.choose('Recuar');
    await player.choicesContaining('Continuar expedição');
    await player.choose('Recuar');
    await player.choicesContaining('Destinos');
    await context.shot('gorvak-absent-later-visit');
    assert.equal(await context.read('later-absence-picture', () => !!$gameScreen.picture(10)), false);
    await player.choose('Destinos');
    await player.choose('Caminho da Igreja');
    await player.choose('Partir');
    await player.choicesContaining('Rever descrição');
    assert.deepEqual((await player.surface()).labels, assigned);
    const revisited = await player.snapshot('route-revisited');
    assert.equal(revisited.snapshot.position, 1);
    assert.deepEqual(revisited.snapshot.deadHeroes, ['H1']);
    await context.shot('same-encounter-revisited');
  }
  if (packageReview) {
    await context.wait(() => expeditionQA.snapshot().persistence.status === 'saved');
    const beforeClose = await player.snapshot('package-before-close');
    await context.reopen();
    await player.choose('Continuar');
    await player.choicesContaining('Rever descrição');
    const restored = await player.snapshot('exported-continue');
    assert.deepEqual(restored, beforeClose, 'Continue returns to the same fully read choice and valid public campaign state');
    assert.equal(restored.snapshot.seed, 9);
    assert.equal(restored.snapshot.dungeon, 'physical');
    assert.equal(restored.snapshot.position, 1);
    assert.deepEqual(restored.snapshot.party, ['H1', 'H2', 'H3']);
    assert.deepEqual(restored.snapshot.deadHeroes, []);
    await context.shot('exported-continue');
  }
}

export const faults = {
  'required-image': { type: 'network', pattern: '**/img/pictures/Dryland_H1.png', expectedRef: 'E2E-017' },
  'storage-rejection': { type: 'boundary', expectedRef: 'E2E-013', apply: () => {
    const save = StorageManager.saveObject;
    StorageManager.saveObject = function(name, object) {
      if (name === 'file0') {
        StorageManager.saveObject = save;
        return Promise.reject(new Error('E2E isolated I/O rejection'));
      }
      return save.call(this, name, object);
    };
  } }
};

async function executeRecovery(context, player) {
  await player.choicesContaining('Jogar');
  await context.input.publicCommand('expeditionQA.setSeed', [9]);
  if (imageRecovery) await context.fault('required-image', true);
  await player.choose('Jogar');
  if (imageRecovery) {
    // Read the prologue until the formation needs the blocked portrait.
    for (let step = 0; step < 12; step++) {
      await context.wait(() => document.getElementById('retryButton') || SceneManager._scene?._messageWindow?.pause);
      const retry = await context.read('native-retry-visible', () => {
        const button = document.getElementById('retryButton');
        if (!button) return null;
        const rect = button.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, error: Graphics._errorPrinter.textContent };
      });
      if (retry) {
        assert.match(retry.error, /Dryland_H1.png/);
        await context.shot('native-image-retry');
        await context.fault('required-image', false);
        await player.click(retry.x, retry.y);
        await player.choicesContaining('Gorvak');
        await context.shot('portrait-recovered');
        assert.deepEqual((await player.snapshot('image-recovery-state')).snapshot.deadHeroes, []);
        return;
      }
      await player.ready();
      await context.input.key('Enter');
    }
    throw new Error('Required image failure was not reached');
  }
  await player.choicesContaining('Gorvak');
  await context.wait(() => expeditionQA.snapshot().persistence.lastSuccessfulSequence === 1);
  for (const name of ['Gorvak', 'Elowen', 'Griznik']) {
    await player.choose(name); await player.choose('Selecionar');
  }
  await player.choose('Destinos'); await player.choose('Caminho da Igreja');
  await context.fault('storage-rejection', true);
  await player.choose('Partir');
  await context.wait(() => expeditionQA.snapshot().persistence.status === 'failed');
  const failed = await player.snapshot('save-failed');
  assert.equal(failed.snapshot.persistence.lastError.code, 'save_failed');
  await context.shot('native-save-failure');
  await context.read('save-notification-initial', () => {
    const window = SceneManager._scene._autosaveConfirmWindow;
    return window && { x: window.x, y: window.y, width: window.width, height: window.height, openness: window.openness, contentsOpacity: window.contentsOpacity, padding: window.padding };
  });
  await context.wait(() => SceneManager._scene._autosaveConfirmWindow?.contentsOpacity === 255 && SceneManager._scene._autosaveConfirmWindow._fadeSpeed === 0);
  await context.read('save-notification-visible', () => {
    const window = SceneManager._scene._autosaveConfirmWindow;
    return { x: window.x, y: window.y, width: window.width, height: window.height, openness: window.openness, contentsOpacity: window.contentsOpacity, padding: window.padding };
  });
  await context.shot('native-save-failure-visible');
  await player.ready();
  await context.shot('playable-after-save-failure');
  await context.reopen();
  await player.choose('Continuar'); await player.ready();
  const old = await player.snapshot('last-successful-save');
  assert.equal(old.snapshot.phase, 'intro'); assert.equal(old.snapshot.sequence, 1);
  assert.deepEqual(old.snapshot.deadHeroes, []);
  await context.shot('last-successful-save');
  await context.reopen(); await player.choose('Novo jogo'); await player.ready();
  const fresh = await player.snapshot('new-game');
  assert.equal(fresh.snapshot.phase, 'intro'); assert.equal(fresh.snapshot.aliveHeroes.length, 8);
  assert.deepEqual(fresh.snapshot.seenPassages, []);
  await context.wait(() => expeditionQA.snapshot().persistence.status === 'saved' && expeditionQA.snapshot().persistence.lastSuccessfulSequence === expeditionQA.snapshot().sequence);
  await context.reopen(); await player.choose('Continuar'); await player.ready();
  const restored = await player.snapshot('new-game-restored');
  assert.equal(restored.snapshot.seed, fresh.snapshot.seed);
  assert.equal(restored.snapshot.sequence, fresh.snapshot.sequence);
  await context.shot('new-game-restored');
}

export async function verify({ expected, artifacts, report }) {
  const external = report.network.filter(row => row.url?.startsWith('http') && !row.url.startsWith('http://127.0.0.1:18726/'));
  assert.deepEqual(external, []);
  return { expectedErrors: report.errors.flatMap((error, index) => recovery && /E2E isolated I\/O rejection|Dryland_H1.png|net::ERR_FAILED/.test(error.message) ? [{ index, expectedRef: imageRecovery ? 'E2E-017' : 'E2E-013', reason: 'Explicit isolated boundary fault' }] : []), criteria: expected.map(criterion => ({ ...criterion,
    status: 'executed-awaiting-review', observed: `Completed ${scenario.id}; inspect the matching screenshots and recorded assertions.`,
    evidence: artifacts.map(artifact => artifact.path),
    limits: ['Visual inspection pending.']
  })), pendingReviews: ['Inspect preparation, focus and HIDE screenshots.'] };
}

const evidence=`docs/qa/evidence/init-rpg-maker-mz/task-13/legacy-${Date.now()}`;
async function verdict(ids,p,details){
 const layout=JSON.parse(await readFile('rpg-maker/The Dryland Drowned/native-layout-manifest.json','utf8'));
 for(const id of ids){await mkdir(`${evidence}/${id}`,{recursive:true});await writeFile(`${evidence}/${id}/execution.json`,JSON.stringify({id,status:'partial',observedStatus:'pass',limits:['Legacy internal selectors; acceptance requires directed visible-label replay.'],at:new Date().toISOString(),layout:layout.nativeLayoutVersion,browser:p.browser.version,evidence:p.directory,details},null,2)+'\n');}
}
async function create(t,name,options){await startServer(t);const p=new NativePlayer(await openChrome(t,options),`${evidence}/journeys/${name}`);t.after(()=>p.flush());return p;}
async function qaReadOnly(p){
 const result=await p.browser.evaluate(`(()=>{const before=JSON.stringify(expeditionQA.snapshot());const detached=expeditionQA.snapshot();if(detached.party)detached.party.push('tampered');if(detached.assignments)detached.assignments.physical[0]='tampered';const check=expeditionQA.validate();return{keys:Object.keys(expeditionQA).sort(),before,after:JSON.stringify(expeditionQA.snapshot()),check}})()`);
 assert.deepEqual(result.keys,['setSeed','snapshot','validate']);assert.equal(result.before,result.after);assert.equal(result.check.ok,true);return result;
}
async function hideRoundtrip(p,restore){
 const before=(await p.observe()).qa;await p.browser.press('Tab',9);
 await p.browser.waitFor('SceneManager._scene._messageWindow.scale.x===0');await p.record(await p.observe(),'hide',true);
 if(restore==='mouse')await p.click(600,360);else await p.browser.press('Tab',9);
 await p.browser.waitFor('SceneManager._scene._messageWindow.scale.x===1');
 const after=await p.observe();assert.deepEqual(after.qa,before);await p.record(after,'restored-'+restore,true);
}
if (process.env.NODE_TEST_CONTEXT) {
test('entry-preparation-input-qa',{timeout:180000},async t=>{
 const p=await create(t,'entry-preparation-input-qa');const title=await p.readUntil('title');
 const audio=await p.browser.evaluate('({bgm:AudioManager._bgmBuffer?.isPlaying()||false,bgs:AudioManager._bgsBuffer?.isPlaying()||false,me:AudioManager._meBuffer?.isPlaying()||false})');assert.deepEqual(audio,{bgm:false,bgs:false,me:false});
 assert.ok(title.text.includes('Aviso')||title.text.includes('morte')||title.text.includes('sacrifício'),title.text);
 await p.browser.evaluate('expeditionQA.setSeed(9)');await p.choose('title',e=>e.label==='Jogar');
 const intro=await p.ready();assert.equal(intro.map,2);assert.equal(intro.qa.phase,'intro');
 await hideRoundtrip(p,'keyboard');await hideRoundtrip(p,'mouse');await qaReadOnly(p);
 await p.readUntil('formation');assert.equal((await p.observe()).map,3);
 const before=(await p.observe()).qa;
 await p.choose('formation',e=>e.heroId==='H1',{mouse:true});await p.choose('hero',e=>e.label==='Conversar');
 await p.readUntil('formation');assert.deepEqual((await p.observe()).qa,before);
 await p.choose('formation',e=>e.label.startsWith('Elenco'));await p.choose('roster',0);assert.deepEqual((await p.readUntil('formation')).qa,before);
 for(const heroId of ['H1','H2','H3'])await p.action({type:'TOGGLE_HERO',heroId});
 await p.action({type:'SELECT_DESTINATION',dungeonId:'physical'});await p.action({type:'DEPART'});
 const choices=await p.readUntil('approaches');assert.deepEqual(choices.qa.party,['H1','H2','H3']);
 assert.equal(choices.entries.filter(e=>/^A2-/.test(e.value||'')).length,3);
 assert.ok(choices.entries.every(e=>!/viabilidade|inviável|viável/i.test(e.label)));
 await hideRoundtrip(p,'keyboard');await hideRoundtrip(p,'mouse');await qaReadOnly(p);
 // Hold a real confirm during review text, release before any new choice.
 await p.choose('approaches',e=>e.value==='reread');const reading=await p.ready();
 await p.browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
 await delay(650);await p.browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
 const stable=await p.readUntil('approaches');assert.equal(stable.qa.phase,'encounter_choice');assert.deepEqual(stable.qa.party,reading.qa.party);
 const inspected=await qaReadOnly(p);await verdict(['E2E-002','E2E-003','E2E-019'],p,{audio,inspected,phase:stable.qa.phase,party:stable.qa.party});
});
test('storage-failure-new-game-reopen',{timeout:180000},async t=>{
 const p=await create(t,'storage-failure-new-game-reopen');await p.begin(0);
 for(const heroId of ['H1','H2','H3'])await p.action({type:'TOGGLE_HERO',heroId});
 await p.action({type:'SELECT_DESTINATION',dungeonId:'physical'});
 // This case alone injects a rejection at its explicitly owned storage boundary.
 await p.browser.evaluate(`(()=>{const save=StorageManager.saveObject;let failed=false;StorageManager.saveObject=function(name,object){if(name==='file0'&&!failed){failed=true;return Promise.reject(new Error('E2E isolated I/O rejection'));}return save.call(this,name,object);};})()`);
 await p.action({type:'DEPART'});await p.browser.waitFor("expeditionQA.snapshot().persistence.status==='failed'");
 const failed=await p.observe();assert.equal(failed.qa.persistence.lastError.code,'save_failed');await p.record(failed,'native-save-failure',true);
 await p.browser.reopen();await p.choose('title',e=>e.label==='Continuar');const restored=await p.ready();
 assert.equal(restored.qa.phase,'intro');assert.equal(restored.qa.sequence,1);assert.equal(restored.qa.seed,0);await p.record(restored,'last-successful-save',true);
 await p.browser.reopen();await p.choose('title',e=>e.label==='Novo jogo');const fresh=await p.ready();
 assert.equal(fresh.qa.phase,'intro');assert.deepEqual(fresh.qa.deadHeroes,[]);assert.equal(fresh.qa.aliveHeroes.length,8);assert.deepEqual(fresh.qa.seenPassages,[]);
 await p.browser.waitFor("expeditionQA.snapshot().persistence.status==='saved'");const newSeed=fresh.qa.seed;
 await p.browser.reopen();await p.choose('title',e=>e.label==='Continuar');const newRestore=await p.ready();assert.equal(newRestore.qa.seed,newSeed);assert.equal(newRestore.qa.sequence,1);
 await p.record(newRestore,'new-campaign-continue',true);
 await verdict(['E2E-013','E2E-014'],p,{failed:failed.qa,restored:restored.qa,newRestore:newRestore.qa});
});
test('required-image-retry-through-profile',{timeout:120000},async t=>{
 const p=await create(t,'required-image-retry-through-profile');await p.begin(0);const before=(await p.observe()).qa;
 // Network interception makes the actual required file unavailable once.
 await p.browser.call('Network.setBlockedURLs',{urls:['*img/pictures/Dryland_H1.png']});
 await p.browser.evaluate("delete ImageManager._cache['img/pictures/Dryland_H1.png']");
 await p.choose('formation',e=>e.heroId==='H1');await p.choose('hero',e=>e.label==='Conversar');
 let point;
 for(let n=0;n<200;n++){point=await p.browser.evaluate("(()=>{const b=document.getElementById('retryButton');if(!b)return null;const r=b.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,error:Graphics._errorPrinter.textContent}})()");if(point)break;await delay(50);}
 assert.ok(point);assert.match(point.error,/Dryland_H1.png/);await p.browser.screenshot(`${p.directory}/native-retry.png`);
 await p.browser.call('Network.setBlockedURLs',{urls:[]});await p.click(point.x,point.y);await p.ready();
 assert.deepEqual((await p.observe()).qa,before);await p.record(await p.observe(),'recovered-profile',true);
 await p.readUntil('formation');await verdict(['E2E-017'],p,{required:'img/pictures/Dryland_H1.png',recovered:true});
});

}
