import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';
export const sourceFiles=[new URL('./native-player.mjs',import.meta.url)];
const cue=process.env.DRYLAND_QA_AUDIO||'me';
const audioCoverage={
 bgm:{status:'campaign-no-live-cue',canonical:['System.titleBgm.name','CommonEvents[2] command241 blank'],equivalence:'IT-029 isolated command241 with System.battleBgm',humanLimit:'The reference asset proves native decoding only; it does not assign musical direction.'},
 bgs:{status:'authored-live-cue',canonical:['CommonEvents[67] command245']},
 me:{status:'authored-live-cue',canonical:['CommonEvents[67] command249']},
 se:{status:'authored-and-system-cue',canonical:['CommonEvents[47,48,67] command250','System.sounds']}
};
if (!audioCoverage[cue]) throw new Error(`Unsupported DRYLAND_QA_AUDIO cue: ${cue}`);
export const scenario={id:'audio-'+cue,criteria:[{id:'audio',variant:cue,expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios'}],requires:['native-mz','public-input'],audioFormat:'webm',audioSources:{master:{path:'WebAudio._masterGainNode',expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios'}},browser:{width:1280,height:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',timeoutMs:30000}};
const keys=['bgmVolume','bgsVolume','meVolume','seVolume'];
const volumes=context=>context.read('audio-preferences',()=>Object.fromEntries(['bgmVolume','bgsVolume','meVolume','seVolume'].map(k=>[k,ConfigManager[k]])));
async function consolePoint(context,type,label=`console-${type}`){
 return context.read(label,value=>{const button=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type===value);if(!button?.worldVisible)throw Error('Console button not visible: '+value);const bounds=button.getBounds(),rect=Graphics._canvas.getBoundingClientRect();return{x:rect.x+(bounds.x+bounds.width/2)*rect.width/Graphics.width,y:rect.y+(bounds.y+bounds.height/2)*rect.height/Graphics.height};},type);
}
async function options(context,player){
 const point=await consolePoint(context,'options','audio-options-geometry');
 await player.click(point.x,point.y);await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
}
async function select(context,key){
 const index=await context.read('volume-option-index',k=>SceneManager._scene._optionsWindow._list.findIndex(item=>item.symbol===k),key);assert.ok(index>=0);
 for(let step=0;step<4;step++){const current=await context.read('volume-option-focus',()=>SceneManager._scene._optionsWindow.index());if(current===index)return;await context.input.key(current<index?'ArrowDown':'ArrowUp');}
 assert.equal(await context.read('volume-final-focus',()=>SceneManager._scene._optionsWindow.index()),index);
}
async function setVolume(context,key,target){
 await select(context,key);
 for(let step=0;step<12;step++){
  const current=(await volumes(context))[key];
  if(current===target)return;
  await context.input.key(current>target?'ArrowLeft':'ArrowRight');
 }
 assert.equal((await volumes(context))[key],target);
}
async function observeSeInput(context){
 const samples=[];
 for(const target of [40,0,30]){
  await setVolume(context,'seVolume',target);
  const before=await context.read(`se-input-${target}-before`,()=>{const d=$dataSystem.sounds[0],b=AudioManager._staticBuffers.find(buffer=>buffer.name===d.name);return{frame:Graphics.frameCount,name:d.name,descriptorVolume:d.volume,volume:b?.volume??null,playing:b?.isPlaying()??false,start:b?._startTime??null,configured:ConfigManager.seVolume};});
  await context.input.keyDown('ArrowUp');let after;
  try{
   after=await context.read(`se-input-${target}-after`,async previousStart=>{
    const started=performance.now();
    while(performance.now()-started<3000){
     const d=$dataSystem.sounds[0],b=AudioManager._staticBuffers.find(buffer=>buffer.name===d.name);
     if(b&&b._startTime!==previousStart&&b.isPlaying())return{frame:Graphics.frameCount,name:b.name,descriptorVolume:d.volume,volume:b.volume,playing:b.isPlaying(),start:b._startTime,configured:ConfigManager.seVolume};
     await new Promise(resolve=>requestAnimationFrame(resolve));
    }
    throw Error('Public cursor input did not start its native SE.');
   },before.start);
  }finally{await context.input.keyUp('ArrowUp');}
  assert.equal(after.name,before.name);assert.equal(after.configured,target);assert.equal(after.volume,after.configured*after.descriptorVolume/10000);assert.equal(after.playing,true,'A public options input must start the native system SE.');
  samples.push({target,input:'ArrowUp',before,after});
 }
 return{samples,engineLimit:'ConfigManager.seVolume affects a newly played static cue; MZ does not retune an already-playing static buffer.'};
}
async function observeFastInput(context,player,audioKind=null){
 const before=await context.read('fast-input-before',kind=>({frame:Graphics.frameCount,disallowed:$gameSystem.isExtendedFastForwardDisallowed(),active:$gameTemp.isExtendedFastForwardMode(),paused:!!SceneManager._scene._messageWindow?.pause,audio:kind==='bgs'&&AudioManager._bgsBuffer?{name:AudioManager._currentBgs?.name??null,start:AudioManager._bgsBuffer._startTime??null,volume:AudioManager._bgsBuffer.volume,playing:AudioManager._bgsBuffer.isPlaying()}:null}),audioKind);
 if(!before.paused)return{status:'unavailable',before};
 const point=await consolePoint(context,'fastfwd','fast-input-geometry');
 const sampleFast=async kind=>{
  const sample=()=>({frame:Graphics.frameCount,disallowed:$gameSystem.isExtendedFastForwardDisallowed(),active:$gameTemp.isExtendedFastForwardMode(),passageId:$gameSystem._dryland.campaign.reading?.passageIds[$gameSystem._dryland.campaign.reading.index]??null,audio:kind==='bgs'&&AudioManager._bgsBuffer?{name:AudioManager._currentBgs?.name??null,start:AudioManager._bgsBuffer._startTime??null,volume:AudioManager._bgsBuffer.volume,playing:AudioManager._bgsBuffer.isPlaying()}:null});
  const started=performance.now();let current=sample();
  while(!current.active&&performance.now()-started<3000){await new Promise(resolve=>requestAnimationFrame(resolve));current=sample();}
  return current;
 };
 let during;
 if(before.disallowed){
  await player.click(point.x,point.y);
  during=await context.read('fast-input-rejected',()=>({active:$gameTemp.isExtendedFastForwardMode()}));
  assert.equal(during.active,false,'A disallowed reading must reject FAST input.');await player.ready();return{status:'blocked-by-reading-permission',before,during};
 }
 [during]=await Promise.all([context.read('fast-input-during',sampleFast,audioKind),player.click(point.x,point.y)]);
 assert.equal(during.active,true,'An allowed reading must activate FAST through its public control.');
 await player.returnToTavern();
 const after=await context.read('fast-input-after',kind=>({frame:Graphics.frameCount,active:$gameTemp.isExtendedFastForwardMode(),passageId:$gameSystem._dryland.campaign.reading?.passageIds[$gameSystem._dryland.campaign.reading.index]??null,audio:kind==='bgs'&&AudioManager._bgsBuffer?{name:AudioManager._currentBgs?.name??null,start:AudioManager._bgsBuffer._startTime??null,volume:AudioManager._bgsBuffer.volume,playing:AudioManager._bgsBuffer.isPlaying()}:null}),audioKind);
 assert.equal(after.active,false,'FAST must reset at the native choice boundary.');
 if(audioKind==='bgs'&&before.audio){for(const sample of [during.audio,after.audio]){assert.equal(sample?.name,before.audio.name);assert.equal(sample?.start,before.audio.start);assert.equal(sample?.volume,before.audio.volume);assert.equal(sample?.playing,true);}}
 await player.ready();return{status:'input-observed',before,during,after};
}
export async function execute(context){
 const player=new DirectedNativePlayer(context),file=context.descriptor.nativeArchive.fileId;
 await player.choose('Continuar');await player.file(file);await player.ready();
 if(cue==='bgm'){
  const coverage=await context.read('bgm-campaign-coverage',()=>({titleBgm:$dataSystem.titleBgm?.name||'',currentBgm:AudioManager._currentBgm?.name||'',buffer:Boolean(AudioManager._bgmBuffer),phase:$gameSystem._dryland.campaign.phase}));
  assert.equal(coverage.titleBgm,'');assert.equal(coverage.currentBgm,'');assert.equal(coverage.buffer,false);
  context.report.observations.push({label:'audio-result',kind:'audio-result',value:{cue,status:'campaign-no-live-cue',coverage,equivalence:audioCoverage.bgm.equivalence}});return;
 }
 let fastInput=null,transition=null;
 if(cue==='bgs'){
  const transitionBefore=await context.read('bgs-transition-before',()=>({frame:Graphics.frameCount,name:AudioManager._currentBgs?.name||'',start:AudioManager._bgsBuffer?._startTime??null}));
  await player.returnToTavern();await player.choose('Gorvak');await player.choose('Conversar');await player.returnToTavern();
  const completed=await player.snapshot('bgs-after-first-gorvak');assert.ok(completed.readUnits.includes(83),'The first Gorvak conversation must complete before the FAST reread probe.');
  const transitionAfter=await context.read('bgs-transition-after',()=>({frame:Graphics.frameCount,name:AudioManager._currentBgs?.name||'',start:AudioManager._bgsBuffer?._startTime??null}));
  transition={before:transitionBefore,after:transitionAfter,trigger:'public reading/choice inputs'};
  assert.equal(transitionAfter.name,'People1');
  await player.choose('Gorvak');await player.choose('Conversar');await player.ready();
  fastInput=await observeFastInput(context,player,'bgs');
  const afterFast=await player.snapshot('bgs-after-fast');assert.deepEqual(afterFast.campaign,completed.campaign,'FAST reread must preserve campaign facts.');
  const reset=await context.read('fast-choice-reset',()=>({fast:$gameTemp.isExtendedFastForwardMode(),auto:$gameTemp.isMessageAutoForwardMode(),kind:$gameMessage._drylandChoiceFocus?.key||'formation'}));assert.equal(reset.fast,false);assert.equal(reset.auto,false);fastInput={...fastInput,reset};
  await player.choose('Gorvak');await player.choose('Conversar');await player.ready();
 }
 if(cue==='me')fastInput=await observeFastInput(context,player);
 if(cue==='se'){
  const before=await player.snapshot('audio-campaign-before');await context.audio.start('se-input-response','master');await options(context,player);
  const se=await observeSeInput(context),configured=await volumes(context);
  await context.input.key('Escape');await player.ready();assert.deepEqual((await player.snapshot('audio-campaign-after-options')).campaign,before.campaign);
  await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('audio-hide');
  await context.input.key('Tab');await player.ready();await context.audio.stop();
  await context.reopenPage();await player.choose('Continuar');await player.file(file);await player.ready();assert.deepEqual(await volumes(context),configured);
  context.report.observations.push({label:'audio-result',kind:'audio-result',value:{cue,se,configured,fastInput,coverage:audioCoverage[cue]}});return;
 }
 await context.wait(kind=>AudioManager['_'+kind+'Buffer']?.isPlaying(),cue);
 const before=await player.snapshot('audio-campaign-before');
 const buffer=()=>context.read('live-cue',kind=>{const b=AudioManager['_'+kind+'Buffer'];return b?{name:AudioManager['_current'+kind[0].toUpperCase()+kind.slice(1)]?.name,start:b._startTime,volume:b.volume,playing:b.isPlaying()}:null;},cue);
 const initial=await buffer();await context.audio.start('live-cue-volume-response','master');
 await options(context,player);await select(context,cue+'Volume');
 for(let i=0;i<4;i++)await context.input.key('ArrowLeft');
 const muted=await buffer();assert.ok(muted?.playing,'The cue must still be playing at mute');assert.equal(muted.volume,0);assert.equal(muted.start,initial.start);
 await context.shot('cue-muted');
 for(let i=0;i<4;i++)await context.input.key('ArrowRight');
 const restored=await buffer();assert.ok(restored?.playing);assert.equal(restored.volume,initial.volume);assert.equal(restored.start,initial.start);
 await context.shot('cue-restored');
 for(const key of keys){
  await select(context,key);await context.input.key('ArrowLeft');
  assert.equal((await volumes(context))[key],30);
 }
 const configured=await volumes(context);await context.input.key('Escape');await player.ready();
 assert.deepEqual((await player.snapshot('audio-campaign-after-options')).campaign,before.campaign);
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('audio-hide');
 await context.input.key('Tab');await player.ready();await context.audio.stop();
 await context.reopenPage();await player.choose('Continuar');await player.file(file);await player.ready();assert.deepEqual(await volumes(context),configured);
 context.report.observations.push({label:'audio-result',kind:'audio-result',value:{cue,initial,muted,restored,configured,transition,fastInput,coverage:audioCoverage[cue]}});
}
export async function verify({expected,artifacts,report}){
 const result=report.observations.find(o=>o.kind==='audio-result');
 const noLive=result?.value?.status==='campaign-no-live-cue';
 return{criteria:expected.map(c=>({...c,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Recorded rendered WebAudio graph and native buffer response; actual listening and human perceptibility remain separate.',...(noLive?['The campaign has no live BGM; IT-029 isolates the configured native BGM command and this run records the absence without inventing a musical cue.']:[]),...(result?.value?.se?['SE volume is asserted on a newly played system buffer; the MZ static-SE path does not retune an already-playing buffer.']:[])]})),pendingReviews:noLive?[]:['Listen to cue volume recording and evaluate perceptibility.']};
}
