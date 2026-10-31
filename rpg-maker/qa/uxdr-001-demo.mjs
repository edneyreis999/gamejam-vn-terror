import assert from 'node:assert/strict';
import {setTimeout as delay} from 'node:timers/promises';
import {DirectedNativePlayer} from './native-player.mjs';

export const sourceFiles = [new URL('./native-player.mjs', import.meta.url), new URL('../tests/helpers/keyboard-focus.mjs', import.meta.url)];
const motion = process.env.DRYLAND_QA_MOTION === 'reduce' ? 'reduce' : 'no-preference';
const expectedRef = 'docs/uxdrs/uxdr-001-linguagem-visual-e-estados-de-interacao.md';
export const scenario = {
  id: 'uxdr-001-' + motion, storage: {expectedRef},
  criteria: [{id:'interaction', variant:motion, expectedRef}], requires:['native-mz','public-input'],
  browser: {width:1280, height:720, dpr:1, locale:'pt-BR', reducedMotion:motion, recordVideo:true, timeoutMs:30000}
};

export async function execute(context) {
  const player = new DirectedNativePlayer(context);
  const hold = async label => { await delay(900); await context.shot(label); };
  const point = name => context.read('visible-' + name, name => {
    const scene = SceneManager._scene;
    const sprite = name === 'corner' ? scene._messageWindow._pauseSignSprite : scene._coretoApproachHide;
    const b = sprite.getBounds(), c = Graphics._canvas.getBoundingClientRect();
    return {x:c.x+(b.x+b.width/2)*c.width/Graphics.width, y:c.y+(b.y+b.height/2)*c.height/Graphics.height};
  }, name);
  await player.choose('Novo jogo'); await player.file(1);
  await player.ready();
  const before = await player.snapshot('dialogue-before');
  await hold('page-keyboard');
  await context.input.pointer.move(10,10); await hold('page-closed');
  const corner = await point('corner');
  await context.input.pointer.move(corner.x,corner.y); await hold('page-open');
  await context.input.pointer.move(10,10); await delay(60);
  await context.input.pointer.move(corner.x,corner.y); await delay(60);
  await context.input.pointer.move(10,10); await hold('page-closed-again');
  assert.deepEqual(await player.snapshot('dialogue-after-hover'), before);
  await player.returnToTavern(); await hold('tavern');
  for (const hero of ['Gorvak','Elowen','Griznik']) {
    await player.choose(hero); await player.choose('Selecionar'); await player.returnToTavern();
  }
  await context.input.key('ArrowRight'); await hold('heroes-focus');
  await player.openDestinations();
  await hold('destinations-first'); await context.input.key('ArrowRight'); await hold('destinations-second');
  const destinations = await player.surface();
  const available = await context.read('available-destinations',()=>SceneManager._scene._choiceListWindow._list.map(row=>row.enabled));
  await player.choose(destinations.labels[available.findIndex(Boolean)]);
  for (let n=0;n<100;n++) {
    const surface = await player.ready();
    if (surface.active && surface.kind === 'approaches') break;
    if (surface.active && surface.kind === 'camp') await player.choose('Continuar');
    else { assert.ok(surface.paused, JSON.stringify(surface)); await context.input.key('Enter'); }
  }
  await player.until('approaches'); await hold('trap-visible');
  const state = () => context.read('trap-state',()=>({campaign:$gameSystem._dryland.campaign, choices:$gameMessage.choices(), text:$gameMessage.allText(), index:SceneManager._scene._choiceListWindow.index()}));
  const trap = await state(), hide = await point('hide');
  await player.click(hide.x,hide.y);
  await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0); await hold('trap-hidden');
  await context.input.key('Tab');
  await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);
  assert.deepEqual(await state(),trap,'Restoring HIDE must consume the input without changing the choice or campaign.');
  await hold('trap-restored');
  await player.click(hide.x,hide.y); await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);
  await player.click(640,200); await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);
  assert.deepEqual(await state(),trap,'Mouse restoration must not confirm the selected approach.');
  context.report.observations.push({kind:'uxdr-demo',label:'completed',value:{motion,hideKeyboard:true,hideMouse:true,hoverPreservedCampaign:true}});
}

export async function verify({expected,artifacts,report}) {
  const result = report.observations.find(row=>row.kind==='uxdr-demo');
  return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Player inputs and campaign invariants; visual acceptance remains separate.']})),pendingReviews:['Visual acceptance remains with the user.']};
}
