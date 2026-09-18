import assert from 'node:assert/strict';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';

const reduced = process.env.DRYLAND_QA_MOTION === 'reduce';
const variant = reduced ? 'reduced' : 'normal';
const ref = 'planos/tasks/approved-narrative-dialogue-staging/verification.md#runtime-scenarios';
const names = ['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
export const sourceFiles = [new URL('../../../rpg-maker/qa/native-player.mjs', import.meta.url)];
export const scenario = { id:'staging-formation-'+variant, criteria:[{id:'formation-render',variant,expectedRef:ref}], requires:['native-mz','public-input'], browser:{width:reduced?1920:1280,height:reduced?1080:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',reducedMotion:reduced?'reduce':'no-preference',recordVideo:true,timeoutMs:30000,executionTimeoutMs:600000} };

export async function execute(context) {
  let serial = 0;
  const transcript = [];
  async function capture(label) {
    await context.wait(() => {
      const scene = SceneManager._scene;
      const settled = Array.from({length:11},(_,i)=>$gameScreen.picture(60+i)).filter(Boolean).every(p=>p._duration===0&&p._toneDuration===0&&Math.abs(p.opacity()-255)<1e-6);
      return settled && (!scene._messageWindow.pause || !$gameMessage.speakerName() || scene._nameBoxWindow.openness===255);
    });
    const frame = await context.read('stable-'+label, async () => {
      await new Promise(resolve=>Graphics.app.renderer.once('postrender',resolve));
      return {map:$gameMap.mapId(),text:$gameMessage.allText(),speaker:$gameMessage.speakerName(),campaign:$gameSystem._dryland.campaign,pictures:Array.from({length:11},(_,i)=>({id:60+i,p:$gameScreen.picture(60+i)})).filter(row=>row.p).map(({id,p})=>({id,name:p.name(),opacity:p.opacity()}))};
    });
    await context.shot(label);
    transcript.push({label,...frame});
  }
  const player = new DirectedNativePlayer(context,{onPassage:async()=>capture('reading-'+(++serial))});
  await player.choose('Jogar'); await player.file(1); await player.returnToTavern();
  for (const name of names) {
    await player.choose(name,{mouse:reduced}); await player.choose('Conversar'); await player.until('hero');
    await player.choose('Selecionar'); await player.until('hero'); await capture('selected-'+name);
    assert.deepEqual((await player.snapshot('selected-state-'+name)).campaign.draftPartyIds,['H'+(names.indexOf(name)+1)]);
    await player.choose('Retirar do grupo'); await player.until('hero'); await capture('removed-'+name);
    assert.deepEqual((await player.snapshot('removed-state-'+name)).campaign.draftPartyIds,[]);
    await player.returnToTavern();
  }
  for (const name of names.slice(0,3)) { await player.choose(name); await player.choose('Selecionar'); await player.returnToTavern(); }
  for (const target of names) {
    const roster = (await player.snapshot('full-entry')).campaign.draftPartyIds.map(id=>names[Number(id.slice(1))-1]);
    if (roster.includes(target)) {
      await player.choose(target); await player.choose('Retirar do grupo'); await player.returnToTavern();
      await player.choose(names.find(name=>!roster.includes(name))); await player.choose('Selecionar'); await player.returnToTavern();
    }
    const full = (await player.snapshot('before-refusal-'+target)).campaign;
    await player.choose(target); await player.choose('Selecionar'); await player.until('hero'); await capture('refused-'+target);
    assert.deepEqual((await player.snapshot('after-refusal-'+target)).campaign,full);
    await player.returnToTavern();
  }
  context.report.observations.push({label:'formation-result',kind:'formation-result',value:{variant,transcript}});
}

export async function verify({expected,artifacts,report}) {
  const result = report.observations.find(row=>row.kind==='formation-result');
  return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Captures require actual visual inspection; input assertions do not grant visual acceptance.']})),pendingReviews:['Inspect settled formation captures; removal is a menu/state observation.']};
}
