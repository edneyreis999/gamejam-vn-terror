import assert from 'node:assert/strict';
import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
const large=process.env.DRYLAND_HERO_VIEW==='large';
const variant=large?'1920':'1280';
const expectedRef='planos/tasks/prototype-feedback-refinement/verification.md#manual-feedback-hero-composition-and-dialogue-ink';
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url)];
export const scenario={id:'hero-dialogue-feedback',criteria:[{id:'composition',variant,expectedRef}],requires:['native-mz','public-input'],browser:{width:large?1920:1280,height:large?1080:720,dpr:1,locale:'pt-BR',channel:'chrome',query:'',recordVideo:true}};
export async function execute(context){
 const player=new DirectedNativePlayer(context);
 const ink=()=>context.read('dialogue-ink',()=>{const w=SceneManager._scene._messageWindow;return {text:w.contents.textColor,outline:w.contents.outlineWidth,skin:w.windowskin.url,background:$gameMessage.background()};});
 await player.until('title');await player.choose('Novo jogo');await player.file(1);
 let captured=false;
 for(let i=0;i<35;i++){
  const surface=await player.ready();if(surface.kind==='formation'&&surface.active)break;
  assert.equal(surface.paused,true);
  if(!captured){assert.equal((await ink()).text,'#211c14');await context.shot('dialogue-opening');captured=true;}
  await context.input.key('Enter');assert.ok(i<34);
 }
 await player.until('formation');await context.shot('heroes-restored');
 const positions=[[344,520],[840,176],[760,497],[1000,448],[528,336],[368,160],[1032,224],[176,264]];
 for(const hero of [0,1,2]){
  const point=await context.read('hero-name-point-'+hero,position=>{const r=Graphics._canvas.getBoundingClientRect();return {x:r.x+position[0]*r.width/Graphics.width,y:r.y+(position[1]+151)*r.height/Graphics.height};},positions[hero]);
  await player.click(point.x,point.y);
  await context.wait(()=>$gameMessage._drylandChoiceFocus?.key==='hero'&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy());
  await player.until('hero');
  assert.equal(await context.read('hero-map',()=>$gameMap.mapId()),37+hero);
  await context.shot('hero-menu-'+hero);await context.input.key('Escape');await player.until('formation');
 }
 await player.choose((await player.surface()).labels[0]);await player.until('hero');
 await player.choose((await player.surface()).labels[0]);
 const reading=await player.ready();assert.equal(reading.paused,true);
 assert.equal((await ink()).text,'#211c14');await context.shot('dialogue-hero');
 for(let i=0;i<25;i++){
  const s=await player.ready();if(s.kind==='hero'&&s.active)break;
  assert.equal(s.paused,true);await context.input.key('Enter');assert.ok(i<24);
 }
 await context.input.key('Escape');await player.until('formation');await context.shot('heroes-after-return');
 context.report.observations.push({kind:'feedback-complete',value:{variant,captured}});
}
export async function verify({expected,artifacts,report}){
 const complete=report.observations.some(o=>o.kind==='feedback-complete');
 return {criteria:expected.map(c=>({...c,status:complete?'executed-awaiting-review':'fail',evidence:artifacts.map(a=>a.path),limits:['Agent visual/contrast inspection and human aesthetic judgment are separate.']})),pendingReviews:['Inspect dialogue contrast and original hero composition.']};
}
