import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from './native-player.mjs';
const gdd = JSON.parse(await readFile(new URL('../tests/fixtures/gdd-competencies.json', import.meta.url)));
export const sourceFiles = [new URL('./native-player.mjs', import.meta.url), new URL('../tests/fixtures/gdd-competencies.json', import.meta.url)];
const targetA3 = process.env.DRYLAND_QA_TARGET === 'A3';
const names = ['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
export const scenario = { id:targetA3?'juicy-a3':'juicy-sacrifice', requires:['native-mz','public-input'], audioFormat:'webm',audioSources:{master:{path:'WebAudio._masterGainNode',expectedRef:'planos/tasks/juicy-hero-death/spec.md'}},storage:{expectedRef:'planos/tasks/juicy-hero-death/spec.md#verification'}, criteria:[{id:targetA3?'a3':'sacrifice',variant:'public-input',expectedRef:'planos/tasks/juicy-hero-death/spec.md#verification'}], browser:{width:1280,height:720,dpr:1,locale:'pt-BR',recordVideo:true,reducedMotion:process.env.DRYLAND_QA_MOTION==='reduce'?'reduce':'no-preference',timeoutMs:30000,executionTimeoutMs:900000} };
export async function execute(context) {
  const player = new DirectedNativePlayer(context);
  await player.choose('Novo jogo'); await player.file(1); await player.returnToTavern();
  const counts = new Set(), victims = new Set(); let continued = false, recording = false, reachedA3 = false;
  for (let step = 0; step < 500; step++) {
    const surface = await player.ready();
    const {campaign: state} = await player.snapshot('step-'+step);
    if (recording && state.phase !== 'death_result') { await context.audio.stop(); recording = false; }
    if (targetA3 && reachedA3 && state.phase !== 'death_result') return;
    if (state.phase === 'ending') { assert.equal(victims.size,8); break; }
    if (surface.active && surface.kind === 'formation') {
      const desired = ['H4','H7','H5','H1','H8','H3','H2','H6'].filter(id=>!state.deadHeroIds.includes(id)).slice(0,3);
      for (const id of state.draftPartyIds.filter(id=>!desired.includes(id))) { await player.choose(names[Number(id.slice(1))-1]); await player.choose('Retirar do grupo'); await player.returnToTavern(); }
      for (const id of desired.filter(id=>!state.draftPartyIds.includes(id))) { await player.choose(names[Number(id.slice(1))-1]); await player.choose('Selecionar'); await player.returnToTavern(); }
      await player.openDestinations();
      const dest = await player.until('destinations');
      const route = await context.read('available-destination',()=>SceneManager._scene._choiceListWindow._list.findIndex(item=>item.enabled));
      await player.choose(dest.labels[route]);
    } else if (surface.active && surface.kind === 'camp') {
      const next = await context.read('camp-continue',()=>SceneManager._scene._choiceListWindow._list.findIndex(item=>$gameMessage.choices()[item.ext].includes('$[ui.camp.continue]')));
      assert.ok(next>=0); await player.choose(surface.labels[next]);
    } else if (surface.active && surface.kind === 'approaches') {
      const id = state.assignments[state.dungeonId][state.position-1];
      const viable = gdd.encounterPairs[id].map(c=>state.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
      const preferSuccess = targetA3 && id !== 'A3';
      const chosen = viable.indexOf(preferSuccess);
      await player.choose(surface.labels[Math.max(0,chosen)]);
    } else if (surface.active && surface.kind === 'sacrifice') {
      counts.add(state.partyIds.length);
      if (state.deadHeroIds.length === 0) {
        const settings = await context.read('settings-before',()=>({locale:ConfigManager.textLocale,volume:ConfigManager.bgsVolume}));
        await option(context,player,'textLocale',settings.locale==='Portuguese'?'English':'Portuguese');
        await option(context,player,'bgsVolume',0);
        await context.wait(()=>AudioManager._bgsBuffer.volume===0);
        await context.input.key('ArrowRight');
        await context.wait(()=>SceneManager._scene._messageWindow.isOpen() && Boolean(SceneManager._scene._sacrificePreviewKey));
        await context.shot('sacrifice-english-muted');
        assert.deepEqual((await player.snapshot('options-is-observational')).campaign,state);
        await option(context,player,'textLocale',settings.locale);
        await option(context,player,'bgsVolume',settings.volume);
      }
      for (let i=0;i<state.partyIds.length*2;i++) {
        await context.input.key('ArrowRight');
        if (i < state.partyIds.length) await context.shot('sacrifice-'+state.deadHeroIds.length+'-slot-'+i);
      }
      assert.deepEqual((await player.snapshot('focus-is-observational')).campaign,state);
      await context.input.key('Tab'); await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);
      await context.input.key('Tab'); await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);
      assert.deepEqual((await player.snapshot('hide-is-observational')).campaign,state);
      await context.shot('sacrifice-focus-'+state.deadHeroIds.length);
      const hero = state.partyIds[0];
      await player.choose(surface.labels[0], {mouse: state.deadHeroIds.length % 2 === 1});
      await context.wait(()=>$gameSystem._dryland.campaign.phase==='death_result' && $gameTemp._drylandPersistence?.status==='saved');
      const after = (await player.snapshot('committed')).campaign;
      assert.equal(after.sequence,state.sequence+1); assert.deepEqual(after.deadHeroIds,[...state.deadHeroIds,hero]);
      victims.add(hero);
      if (state.pendingOutcome.encounterId === 'A3') reachedA3 = true;
      if (continued) { await context.audio.start('death-audio-'+state.deadHeroIds.length,'master'); recording = true; }
      if (!continued) {
        await context.reopenPage(); await player.choose('Continuar'); await player.file(1); await player.ready();
        assert.deepEqual((await player.snapshot('continue-death')).campaign,after); continued=true;
        await context.audio.start('death-audio-first','master'); recording=true;
      }
    } else {
      assert.ok(surface.paused,JSON.stringify(surface));
      if (state.phase==='death_result') {
        const actual = await context.read('death-presentation',()=>({names:[50,51,52].map(i=>$gameScreen.picture(i)?.name()).filter(Boolean),bgm:AudioManager._currentBgm?.name,bgs:AudioManager._currentBgs?.name,text:$gameMessage.allText()}));
        assert.ok(!actual.bgm); assert.equal(actual.bgs,'05-opressivo');
        assert.ok(actual.names.some(n=>n.endsWith('-bravura')));
        await context.shot('death-'+step);
      }
      await context.input.key('Enter');
    }
  }
  if (targetA3) assert.fail('A3 was not reached in this natural campaign');
  assert.deepEqual([...counts].sort(),[1,2,3]); assert.equal(victims.size,8);
  assert.notEqual(await context.read('ambient-ended',()=>AudioManager._currentBgs?.name),'05-opressivo');
}
export async function verify({artifacts}) { return {criteria:scenario.criteria.map(c=>({...c,status:'pass',evidence:artifacts.filter(a=>a.id.startsWith('sacrifice-') || a.id.startsWith('death-')).map(a=>a.path),limits:['Art and audible mix acceptance remain pending.']})),pendingReviews:[]}; }

async function option(context, player, symbol, target) {
  await context.wait(()=>SceneManager._scene._messageWindow.isOpen() && SceneManager._scene._messageWindow._buttonConsoleButtons.some(b=>b._type==='options' && b.worldVisible && b.openness===255));
  const point = await context.read('console-options',()=>{
    const b=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type==='options').getBounds();
    const c=Graphics._canvas.getBoundingClientRect();
    return {x:c.x+(b.x+b.width/2)*c.width/Graphics.width,y:c.y+(b.y+b.height/2)*c.height/Graphics.height};
  });
  await player.click(point.x,point.y);
  await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
  let index=-1;
  const categories=await context.read('option-categories',()=>SceneManager._scene._categoryWindow.maxItems());
  for(let n=0;n<categories;n++) {
    index=await context.read('option-index',s=>SceneManager._scene._optionsWindow._list.findIndex(r=>r.symbol===s),symbol);
    if(index>=0)break;
    await context.input.key('PageDown');
  }
  assert.ok(index>=0);
  for(let n=0;n<30;n++) {
    const current=await context.read('option-cursor',()=>SceneManager._scene._optionsWindow.index());
    if(current===index)break;
    await context.input.key(current<index?'ArrowDown':'ArrowUp');
  }
  for(let n=0;n<21;n++) {
    const current=await context.read('option-value',s=>ConfigManager[s],symbol);
    if(current===target)break;
    await context.input.key((symbol==='textLocale'?target==='English':target<current)?'ArrowLeft':'ArrowRight');
  }
  assert.equal(await context.read('option-result',s=>ConfigManager[s],symbol),target);
  await context.input.key('Escape');await player.ready();
}
