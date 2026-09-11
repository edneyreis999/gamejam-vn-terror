import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { openChrome, startServer } from '../tests/helpers/native-chrome.mjs';
import { NativePlayer, DirectedNativePlayer } from './native-player.mjs';
import { observeBustPassage, observeBustTransition } from './native-bust-observation.mjs';
import { archiveFiles, captureNativeSave, sha256 } from './native-save-archive.mjs';
export const sourceFiles = [new URL('./native-player.mjs', import.meta.url), new URL('./native-bust-observation.mjs', import.meta.url), new URL('./native-save-archive.mjs', import.meta.url), new URL('../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md', import.meta.url), new URL('../tests/fixtures/boundary-recipes.json', import.meta.url), new URL('../tests/fixtures/council-bust-recipes.json', import.meta.url)];
const directedJourney = process.env.DRYLAND_QA_JOURNEY || 'physical-first-reunite';
const bustBank = directedJourney.startsWith('council-') || directedJourney === 'bust-council-continue';
const bustCoverage = bustBank || process.env.DRYLAND_QA_BUST_COVERAGE === '1';
const controls = process.env.DRYLAND_QA_JOURNEY === 'bust-controls-council';
const mixed = directedJourney === 'mixed-memorial-credits';
const boundary = directedJourney.startsWith('final-sixth-');
const inverse = directedJourney === 'supernatural-first-destroy';
const largeViewport = ['large', 'large-reduced'].includes(process.env.DRYLAND_QA_VIEWPORT);
const reducedMotion = process.env.DRYLAND_QA_VIEWPORT === 'large-reduced';
export const scenario = {
  id: directedJourney,
  publicCommands: ['expeditionQA.setSeed'],
  criteria: bustCoverage ? ['V-004','V-007'].map(id=>({id,variant:`${directedJourney}${largeViewport?'-large-reduced':''}`,expectedRef:'docs/qa/guides/vn-picture-busts-dialogues.md'})) : [{ id: controls ? 'D-06' : mixed ? 'E2E-023' : boundary ? (directedJourney.endsWith('solo-council') ? 'E2E-008' : 'E2E-011') : inverse ? 'E2E-010' : 'E2E-009', variant: `${directedJourney}${largeViewport ? '-large' : ''}`, expectedRef: 'docs/qa/guides/native-mz-cycle.md#Receitas-e-decisoes' }],
  requires: ['native-mz', 'public-input'],
  browser: { width: largeViewport ? 1920 : 1280, height: largeViewport ? 1080 : 720, dpr: 1, reducedMotion: reducedMotion ? 'reduce' : 'no-preference', launchArgs: ['--force-device-scale-factor=1'], locale: 'pt-BR', query: '', timeoutMs: 30000 }
};

const gdd = await readFile(new URL('../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md', import.meta.url), 'utf8');
const decisionPlan = [...gdd.matchAll(/^#### ([AB][1-8])\. ([^\n]+)\n([\s\S]*?)(?=^#### |^### |^## |$(?![\s\S]))/gm)].map(match => ({
  id: match[1], title: match[2], choices: [...match[3].matchAll(/^\| ([^|]+) \| (Força|Destreza|Percepção|Conhecimento|Ocultismo|Vontade|Sobrevivência|Atletismo) \|/gm)].map(row => ({ label: row[1].trim(), competency: row[2] }))
}));
assert.equal(decisionPlan.length, 16);
assert.ok(decisionPlan.every(encounter => encounter.choices.length === 3));

export async function execute(context) {
  const inspected=new Set();
  const player = new DirectedNativePlayer(context,{onPassage:bustCoverage?player=>observeBustPassage(context,player):controls?async player=>{const s=(await player.snapshot('controls-stage')).snapshot;const id=s.reading?.passageId;if(['council.confession','opinion.H1'].includes(id)&&!inspected.has(id)){await player.dialogueControls(id.replaceAll('.','-'),[60,61,62,63]);inspected.add(id);}}:undefined,onAdvance:bustCoverage?player=>observeBustTransition(context,player):undefined});
  if (bustBank) return executeBustBank(context, player);
  if (boundary) return executeBoundary(context, player);
  await player.choicesContaining('Jogar');
  assert.deepEqual(await context.input.publicCommand('expeditionQA.setSeed', [0]), { ok: true, seed: 0 });
  await player.choose('Jogar');
  for (const hero of ['Gorvak', 'Elowen', mixed ? 'Seraphina' : 'Griznik']) {
    await player.choose(hero);
    await player.choose('Selecionar');
  }
  if (mixed) {
    await player.choose('Destinos');
    await player.choose('Caminho da Igreja');
    await player.choose('Partir');
    await player.choose(decisionPlan.find(item => item.id === 'A3').choices[0].label);
    await player.choose('Sacrificar Seraphina');
    await player.choose('Recuar');
    await player.choicesContaining('Continuar expedição');
    await player.choose('Recuar');
    await player.choose('Griznik');
    await player.choose('Selecionar');
  }
  const competencies = new Set(['Força', 'Vontade', 'Destreza', 'Atletismo', 'Percepção', 'Sobrevivência']);
  const routes = inverse ? ['Parque das Águas Assombradas', 'Caminho da Igreja'] : ['Caminho da Igreja', 'Parque das Águas Assombradas'];
  for (const route of [...routes, 'Vilarejo Partido']) {
    await player.choose('Destinos');
    await player.choose(route);
    await player.choose('Partir');
    for (let position = 1; position <= (route === 'Vilarejo Partido' ? 6 : 5); position++) {
      const surface = await player.choicesContaining('Rever descrição');
      const encounter = decisionPlan.find(candidate => candidate.choices.every(choice => surface.labels.includes(choice.label)));
      assert.ok(encounter, `No GDD encounter matches visible choices: ${surface.labels}`);
      const approach = encounter.choices.find(choice => competencies.has(choice.competency));
      assert.ok(approach, `The approved trio must cover ${encounter.id}`);
      context.report.observations.push({ label: 'independent-gdd-decision', kind: 'decision-plan', value: { route, position, encounter: encounter.id, label: approach.label, source: 'GDD §§9,12' } });
      await player.choose(approach.label);
    }
  }
  const endingLabel = inverse ? 'Destruir o medalhão — sobreviver e entregá-los a Andirá' : 'Reunir o medalhão — libertar os amantes e morrer';
  await player.choicesContaining(endingLabel);
  if(controls)assert.deepEqual([...inspected],['council.confession','opinion.H1']);
  const council = await player.snapshot('council');
  assert.deepEqual(council.snapshot.deadHeroes, mixed ? ['H4'] : []);
  assert.deepEqual(council.snapshot.climaxParty, ['H1', 'H2', 'H3']);
  assert.ok(['irati.01', 'irati.02.01', 'map.reveal.01', 'map.reveal.02'].every(id => council.snapshot.seenPassages.includes(id)), 'Completed return-to-formation passages remain seen');
  await context.shot('council-choice');
  await player.choose(endingLabel);
  if (mixed) {
    for (let step = 0; step < 10; step++) {
      await context.wait(() => expeditionQA.snapshot().phase === 'memorial' || (SceneManager._scene._messageWindow?.pause && !SceneManager._scene.isBusy()));
      if ((await player.snapshot('closing-phase')).snapshot.phase === 'memorial') break;
      await player.ready(); await context.shot(`ending-passage-${step}`); await context.input.key('Enter');
    }
    await context.wait(() => $gameScreen.picture(1)?.name() === 'Dryland_Memorial' && $gameScreen.brightness() === 255 && $gameScreen.picture(13)?._duration > 0 && $gameScreen.picture(13)?.name() === 'Dryland_H4');
    const before = await player.snapshot('memorial-animation-before');
    await context.shot('memorial-motion-start');
    await context.wait(() => $gameScreen.picture(13)?._duration < 50 && $gameScreen.picture(13)?._duration > 0);
    await context.shot('memorial-motion-middle');
    await context.wait(() => $gameScreen.picture(13)?.opacity() > 0 && $gameScreen.picture(13)?.opacity() < 255);
    await context.shot('memorial-crossfade');
    await player.ready();
    assert.deepEqual((await player.snapshot('memorial-animation-after')).snapshot.deadHeroes, before.snapshot.deadHeroes);
    await context.shot('memorial-motion-finished');
  }
  await player.choicesContaining('Pular créditos');
  const terminal = await player.snapshot('terminal');
  assert.equal(terminal.snapshot.ending, inverse ? 'destroy' : 'reunite');
  assert.deepEqual(terminal.snapshot.deadHeroes, mixed ? ['H4'] : []);
  assert.deepEqual(terminal.snapshot.epilogueHeroes, ['H1', 'H2', 'H3']);
  await context.shot('credits');
  if (mixed) await context.wait(() => $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow.isOpenAndActive());
  else await player.choose('Pular créditos');
  await player.choicesContaining('Continuar');
  await context.reopen();
  await player.choose('Continuar');
  await player.ready();
  const restored = await player.snapshot('terminal-restored');
  assert.equal(restored.snapshot.ending, terminal.snapshot.ending);
  assert.equal(restored.snapshot.phase, 'ending');
  await context.shot('terminal-restored');
  await player.choicesContaining('Pular créditos');
  await player.choose('Pular créditos', { mouse: true });
  await player.choicesContaining('Continuar');
  await context.shot('title-after-credits');
  if (mixed) {
    await context.reopen();
    await player.choose('Continuar');
    await player.choicesContaining('Pular créditos');
    assert.deepEqual((await player.snapshot('mixed-keyboard-credits')).snapshot.epilogueHeroes, ['H1', 'H2', 'H3']);
    await context.shot('mixed-keyboard-credits');
    await player.choose('Pular créditos');
    await player.choicesContaining('Continuar');
    await context.shot('title-after-keyboard-credits');
  }
}

async function executeBustBank(context, player) {
  const started = Date.now();
  const consumer = directedJourney === 'bust-council-continue';
  let roster, master, masterBytes;
  if (consumer) {
    masterBytes = await readFile(`${context.fixture}/${archiveFiles.archive}`);
    master = JSON.parse(masterBytes);
    assert.equal(master.campaign.phase,'council','Only a genuine Council checkpoint supplies this suffix.');
    roster = master.campaign.climaxPartyIds;
    await player.choose('Continuar'); await player.ready();
    const restored = (await player.snapshot('bank-continue')).snapshot;
    assert.equal(restored.phase,'council');
    assert.equal(restored.sequence,master.campaign.sequence);
    assert.deepEqual(restored.climaxParty,roster);
  } else {
    const bank = JSON.parse(await readFile(new URL('../tests/fixtures/council-bust-recipes.json',import.meta.url),'utf8'));
    const recipe = bank.recipes.find(recipe=>recipe.id===directedJourney);
    assert.ok(recipe,`Unknown Council recipe ${directedJourney}`);
    roster = recipe.targetCouncilRoster;
    await player.choicesContaining('Jogar');
    assert.deepEqual(await context.input.publicCommand('expeditionQA.setSeed',[recipe.seed]),{ok:true,seed:recipe.seed});
    await player.choose('Jogar');
    const names = {H1:'Gorvak',H2:'Elowen',H3:'Griznik',H4:'Seraphina',H5:'Bimbren',H6:'Liora',H7:'Vaelith',H8:'Draska'};
    const routes = {physical:'Caminho da Igreja',supernatural:'Parque das Águas Assombradas',final:'Vilarejo Partido'};
    for (const action of recipe.actionsToCouncil) {
      if (['BEGIN','COMPLETE_PASSAGE','ENTER_DUNGEON'].includes(action.type)) continue;
      context.report.observations.push({label:'bank-recipe-action',kind:'decision-plan',value:action});
      switch (action.type) {
        case 'TOGGLE_HERO': {
          await player.choose(names[action.heroId]);
          const menu = await player.choicesContaining('Conversar');
          await player.choose(menu.labels.includes('Retirar do grupo')?'Retirar do grupo':'Selecionar');
          break;
        }
        case 'SELECT_DESTINATION': await player.choose('Destinos'); await player.choose(routes[action.dungeonId]); break;
        case 'DEPART': await player.choose('Partir'); break;
        case 'CHOOSE_APPROACH': {
          const [id,number]=action.approachId.split('-');
          await player.choose(decisionPlan.find(encounter=>encounter.id===id).choices[Number(number)-1].label);
          break;
        }
        case 'SELECT_VICTIM': await player.choose(`Sacrificar ${names[action.heroId]}`); break;
        default: throw Error(`Unmapped Council recipe action ${action.type}`);
      }
    }
  }
  const prefixMs = Date.now()-started;
  const ending = process.env.DRYLAND_QA_ENDING || (consumer?'destroy':'reunite');
  assert.ok(['reunite','destroy'].includes(ending));
  const label = ending==='reunite'?'Reunir o medalhão — libertar os amantes e morrer':'Destruir o medalhão — sobreviver e entregá-los a Andirá';
  await player.choicesContaining(label);
  const council = (await player.snapshot('bank-final-choice')).snapshot;
  assert.equal(council.lastRejectedAction,null,'No rejected presentation on the public Council route.');
  assert.deepEqual(council.climaxParty,roster);
  assert.deepEqual(await context.read('bank-choice-cleared',()=>[60,61,62,63,64,65].filter(id=>$gameScreen.picture(id))),[]);
  await context.shot('bank-final-choice');
  if (!consumer) {
    const archive = await captureNativeSave(context,'council-checkpoint');
    assert.equal(archive.campaign.phase,'council');
    assert.deepEqual(archive.campaign.climaxPartyIds,roster);
  }
  const suffixStarted=Date.now();
  await player.choose(label);await player.choicesContaining('Pular créditos');
  const terminal=(await player.snapshot('bank-terminal')).snapshot;
  assert.equal(terminal.ending,ending);assert.deepEqual(terminal.epilogueHeroes,roster);
  assert.deepEqual(terminal.deadHeroes,council.deadHeroes);
  assert.deepEqual(await context.read('bank-credits-cleared',()=>[60,61,62,63,64,65].filter(id=>$gameScreen.picture(id))),[]);
  await context.shot('bank-credits');
  await captureNativeSave(context,'terminal-checkpoint');
  await player.choose('Pular créditos');await player.choicesContaining('Continuar');
  if (consumer) assert.equal(sha256(await readFile(`${context.fixture}/${archiveFiles.archive}`)),sha256(masterBytes),'Immutable checkpoint master remains unchanged.');
  context.report.observations.push({label:'bank-timing',kind:'native-checkpoint-bank',value:{consumer,roster,prefixOrRestoreMs:prefixMs,councilAndArchiveMs:suffixStarted-started-prefixMs,endingSuffixMs:Date.now()-suffixStarted,totalMs:Date.now()-started,producer:master?.producer??null}});
}

async function executeBoundary(context, player) {
  const recipe = recipes[directedJourney];
  assert.ok(recipe, `Unknown boundary recipe: ${directedJourney}`);
  const names = { H1: 'Gorvak', H2: 'Elowen', H3: 'Griznik', H4: 'Seraphina', H5: 'Bimbren', H6: 'Liora', H7: 'Vaelith', H8: 'Draska' };
  const routes = { physical: 'Caminho da Igreja', supernatural: 'Parque das Águas Assombradas', final: 'Vilarejo Partido' };
  let resumedFarewell = false;
  await player.choicesContaining('Jogar');
  assert.deepEqual(await context.input.publicCommand('expeditionQA.setSeed', [recipe.seed]), { ok: true, seed: recipe.seed });
  await player.choose('Jogar');
  for (const action of recipe.actions) {
    if (['BEGIN', 'ADVANCE_TEXT', 'ENTER_DUNGEON'].includes(action.type)) continue;
    context.report.observations.push({ label: 'boundary-decision', kind: 'decision-plan', value: action });
    switch (action.type) {
      case 'TOGGLE_HERO': {
        await player.choose(names[action.heroId]);
        const menu = await player.choicesContaining('Conversar');
        await player.choose(menu.labels.includes('Retirar do grupo') ? 'Retirar do grupo' : 'Selecionar');
        break;
      }
      case 'SELECT_DESTINATION':
        await player.choose('Destinos');
        await player.choose(routes[action.dungeonId]);
        break;
      case 'DEPART': await player.choose('Partir'); break;
      case 'CHOOSE_APPROACH': {
        const [encounterId, number] = action.approachId.split('-');
        const encounter = decisionPlan.find(item => item.id === encounterId);
        await player.choose(encounter.choices[Number(number) - 1].label);
        break;
      }
      case 'SELECT_VICTIM': {
        await context.shot(`before-sacrifice-${action.heroId}`);
        await player.choose(`Sacrificar ${names[action.heroId]}`);
        if (action.heroId === 'H1' && !resumedFarewell) {
          await context.wait(() => expeditionQA.snapshot().phase === 'death_result' && expeditionQA.snapshot().persistence.status === 'saved' && expeditionQA.snapshot().persistence.lastSuccessfulSequence === expeditionQA.snapshot().sequence);
          await player.ready();
          const before = await player.snapshot('farewell-before-close');
          await context.shot('farewell-before-close');
          await context.reopen();
          await player.choose('Continuar');
          await player.ready();
          const restored = await player.snapshot('farewell-restored');
          assert.equal(restored.snapshot.phase, 'death_result');
          assert.equal(restored.snapshot.sequence, before.snapshot.sequence);
          assert.deepEqual(restored.snapshot.deadHeroes, ['H1']);
          assert.equal(restored.snapshot.reading.passageId, before.snapshot.reading.passageId);
          await context.wait(() => $gameScreen.picture(60)?.name() === 'Dryland_H1');
          assert.deepEqual(await context.read('farewell-exclusive-slots', () => [61, 62, 63, 64, 65].filter(id => $gameScreen.picture(id))), []);
          await context.shot('farewell-restored');
          resumedFarewell = true;
        }
        break;
      }
      case 'CHOOSE_ENDING': {
        const label = 'Reunir o medalhão — libertar os amantes e morrer';
        await player.choicesContaining(label);
        const solo = await player.snapshot('solo-council');
        assert.deepEqual(solo.snapshot.climaxParty, []);
        assert.ok(solo.snapshot.aliveHeroes.length > 0);
        await context.shot('solo-council-choice');
        await player.choose(label);
        break;
      }
      default: throw new Error(`Unmapped recipe action: ${action.type}`);
    }
  }
  await player.choicesContaining('Pular créditos');
  const terminal = await player.snapshot('boundary-terminal');
  assert.deepEqual(terminal.snapshot.epilogueHeroes, []);
  assert.equal(terminal.snapshot.ending, directedJourney.endsWith('solo-council') ? 'reunite' : 'bad');
  if (directedJourney.endsWith('total-loss')) {
    assert.equal(terminal.snapshot.deadHeroes.length, 8);
    assert.equal(terminal.snapshot.dungeon, 'final');
    assert.equal(terminal.snapshot.position, 6);
    assert.equal(resumedFarewell, true);
  }
  await context.shot('boundary-credits');
  await player.choose('Pular créditos');
  await player.choicesContaining('Continuar');
  await context.reopen();
  await player.choose('Continuar');
  await player.ready();
  const restored = await player.snapshot('boundary-terminal-restored');
  assert.equal(restored.snapshot.ending, terminal.snapshot.ending);
  assert.deepEqual(restored.snapshot.deadHeroes, terminal.snapshot.deadHeroes);
  await context.shot('boundary-terminal-restored');
  await player.choicesContaining('Pular créditos');
  await player.choose('Pular créditos', { mouse: true });
  await player.choicesContaining('Continuar');
}

export async function verify({ expected, artifacts }) {
  return { criteria: expected.map(criterion => ({ ...criterion, status: 'executed-awaiting-review',
    observed: 'Legal GDD-planned campaign, ending and actual tab closure/Continue completed.', evidence: artifacts.map(artifact => artifact.path), limits: ['Visual inspection pending; final creative acceptance remains human.'] })),
    pendingReviews: ['Inspect Council, ending, epilogues and credits.'] };
}
const evidence=`docs/qa/evidence/init-rpg-maker-mz/task-13/legacy-${Date.now()}`;
const recipes=JSON.parse(await readFile('rpg-maker/tests/fixtures/boundary-recipes.json','utf8')).recipes;
async function session(t,name,{width=1280,height=720,reduced=false}={}){
 await startServer(t);const b=await openChrome(t,{width,height,reduced});
 const p=new NativePlayer(b,`${evidence}/journeys/${name}`);
 t.after(async()=>{try{await p.flush();}catch{} });
 return p;
}
async function settle(t,ids,p,details){
 const layout=await readFile('rpg-maker/The Dryland Drowned/native-layout-manifest.json','utf8');
 const meta={status:'partial',observedStatus:'pass',limits:['Legacy internal selectors; acceptance requires directed visible-label replay.'],observedAt:new Date().toISOString(),browser:p.browser.version,
  layout:JSON.parse(layout).nativeLayoutVersion,layoutSha256:createHash('sha256').update(layout).digest('hex'),
  evidence:p.directory,details};
 for(const id of ids){await mkdir(`${evidence}/${id}`,{recursive:true});await writeFile(`${evidence}/${id}/execution.json`,JSON.stringify({...meta,id},null,2)+'\n');}
}
if (process.env.NODE_TEST_CONTEXT) {
for(const [name,order,ending]of[
 ['physical-first-reunite',['physical','supernatural'],'reunite'],
 ['supernatural-first-destroy',['supernatural','physical'],'destroy']
])test(name,{timeout:900000},async t=>{
 const p=await session(t,name);await p.begin(0);
 for(const route of [...order,'final'])await p.route(route);
 const choice=await p.readUntil('ending');assert.equal(choice.entries.length,2);assert.equal(choice.qa.deadHeroes.length,0);
 assert.deepEqual(choice.qa.climaxParty,['H1','H2','H3']);
 await p.action({type:'CHOOSE_ENDING',ending});
 const terminal=await p.closing('keyboard');assert.equal(terminal.ending,ending);assert.deepEqual(terminal.deadHeroes,[]);
 assert.deepEqual(terminal.rewards.routeOrder,order);
 // Reopen the actual game target in the same browser profile/origin.
 await p.browser.reopen();await p.choose('title',e=>e.label==='Continuar');
 const restored=await p.ready();assert.equal(restored.qa.ending,ending);assert.equal(restored.qa.phase,'ending');
 await p.record(restored,'terminal-continue',true);
 const again=await p.closing('mouse');assert.equal(again.ending,ending);
 await settle(t,[ending==='reunite'?'E2E-009':'E2E-010'],p,{order,ending,terminal,restored:restored.qa});
});
test('final-sixth-solo-council',{timeout:900000},async t=>{
 const p=await session(t,'final-sixth-solo-council',{width:1920,height:1080,reduced:true});
 let solo;
 await p.recipe(recipes['final-sixth-solo-council'],{beforeAction:async(action)=>{
  if(action.type==='CHOOSE_ENDING'){
   const s=await p.readUntil('ending');solo=s.qa;assert.deepEqual(s.qa.climaxParty,[]);assert.ok(s.qa.aliveHeroes.length>0);
   assert.ok(p.log.some(row=>row.state?.reading?.passageId==='council.solo'));
  }
 }});
 const terminal=await p.closing('keyboard');assert.deepEqual(terminal.epilogueHeroes,[]);
 assert.ok(!p.log.some(row=>row.state?.phase==='epilogue'));
 await settle(t,['E2E-008'],p,{solo,terminal});
});
test('final-sixth-total-loss',{timeout:900000},async t=>{
 const p=await session(t,'final-sixth-total-loss');let interrupted=false;
 await p.recipe(recipes['final-sixth-total-loss'],{afterAction:async action=>{
  if(action.type==='SELECT_VICTIM'&&action.heroId==='H1'&&!interrupted){
   const before=await p.ready();assert.equal(before.qa.phase,'death_result');
   const restored=await p.resume();assert.equal(restored.qa.phase,'death_result');assert.deepEqual(restored.qa.deadHeroes,['H1']);
   assert.equal(restored.qa.reading.passageId,before.qa.reading.passageId);interrupted=true;
  }
 }});
 const final=await p.ready();assert.equal(final.qa.dungeon,'final');assert.equal(final.qa.position,6);assert.equal(final.qa.deadHeroes.length,8);
 const terminal=await p.closing('automatic');assert.equal(terminal.ending,'bad');assert.deepEqual(terminal.epilogueHeroes,[]);
 assert.ok(!p.log.some(row=>row.kind==='ending'&&row.entries.length===2));
 await p.browser.reopen();await p.choose('title',e=>e.label==='Continuar');
 const resumed=await p.ready();assert.equal(resumed.qa.ending,'bad');assert.equal(resumed.qa.deadHeroes.length,8);
 await p.closing('keyboard');
 await settle(t,['E2E-011','E2E-012'],p,{terminal,resumed:resumed.qa,closedDuringFarewell:interrupted});
});
}
