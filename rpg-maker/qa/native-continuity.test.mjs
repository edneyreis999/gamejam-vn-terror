import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';
import { captureNativeSave, sha256 } from './native-save-archive.mjs';
import { observeBustPassage, observeBustTransition } from './native-bust-observation.mjs';
export const sourceFiles=[new URL('./native-player.mjs',import.meta.url),new URL('./native-save-archive.mjs',import.meta.url),new URL('./native-bust-observation.mjs',import.meta.url)];
const family=process.env.DRYLAND_QA_CONTEXT||'farewell';
export const scenario={id:'continuity-'+family,criteria:[{id:'continuity',variant:family,expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios'}],requires:['native-mz','public-input'],browser:{width:1280,height:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',reducedMotion:process.env.DRYLAND_QA_MOTION==='reduce'?'reduce':'no-preference',timeoutMs:30000}};
async function reach(player){
 for(let i=0;i<80;i++){
  const surface=await player.ready(),{campaign}=await player.snapshot('context-navigation');
  const id=campaign.reading?.passageIds[campaign.reading.index];
  if((family==='council'&&id==='council.challenge')||(family==='farewell'&&id?.startsWith('farewell.'))||(family==='epilogue'&&id?.startsWith('epilogue.')))return id;
  assert.ok(surface.paused,'Context must be reachable through reading alone');
  await player.context.shot('context-prefix-'+(++player.serial));await player.context.input.key('Enter');
 }
 throw Error('Context not reached');
}
export async function execute(context){
 const player=new DirectedNativePlayer(context),parent=context.descriptor.nativeArchive;assert.ok(parent);
 await player.choose('Continuar');await player.file(parent.fileId);await player.ready();
 assert.equal((await player.snapshot('loaded-file')).fileId,parent.fileId);
 assert.equal(sha256(await context.read('parent-bytes',id=>StorageManager.loadZip('file'+id),parent.fileId)),parent.payloadSha256);
 const id=await reach(player);await observeBustPassage(context,player);
 const {campaign:before}=await player.snapshot('before-controls');
 const slots=family==='council'?before.climaxPartyIds.map((_,i)=>60+i):[60];
 await player.dialogueControls(family,slots);
 const text=(await player.surface()).text;
 const point=await context.read('options-button',()=>{
  const b=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type==='options').getBounds(),r=Graphics._canvas.getBoundingClientRect();
  return{x:r.x+(b.x+b.width/2)*r.width/Graphics.width,y:r.y+(b.y+b.height/2)*r.height/Graphics.height};
 });await player.click(point.x,point.y);
 await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());await context.shot('options');
 await context.input.key('Escape');await player.ready();assert.equal((await player.surface()).text,text);assert.deepEqual((await player.snapshot('after-options')).campaign,before);
 await observeBustPassage(context,player);const save=await captureNativeSave(context,'context-checkpoint');
 await context.reopen();await player.choose('Continuar');await player.file(save.fileId);await player.ready();
 assert.deepEqual((await player.snapshot('loaded-checkpoint')).campaign,save.campaign);
 assert.equal(await reach(player),id);await observeBustPassage(context,player);
 assert.equal((await player.surface()).text,text);assert.deepEqual((await player.snapshot('after-reread-prefix')).campaign,before);
 assert.equal(sha256(await context.read('unchanged-save',id=>StorageManager.loadZip('file'+id),save.fileId)),save.payloadSha256);
 const temporal=await observeBustTransition(context,player,()=>context.input.key('Enter'));
 context.report.observations.push({label:'continuity-result',kind:'continuity-result',value:{family,id,parent,checkpoint:save.payloadSha256,temporal}});
}
export async function verify({expected,artifacts,report}){
 const result=report.observations.find(o=>o.kind==='continuity-result');
 return{criteria:expected.map(c=>({...c,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Native composition and campaign facts compared; screenshots need inspection; no human judgment.']})),pendingReviews:['Inspect native composition captures.']};
}
