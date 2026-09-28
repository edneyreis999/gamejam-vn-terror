import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
import {captureNativeSave} from '../../../rpg-maker/qa/native-save-archive.mjs';
import {finishCredits} from '../../../rpg-maker/qa/native-journeys.test.mjs';
const ref='planos/tasks/prototype-feedback-refinement/verification.md#runtime-scenario-groups';
const variant=process.env.DRYLAND_QA_REFINEMENT||'physical-first';
const reduced=process.env.DRYLAND_QA_MOTION==='reduce';
const names=['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/qa/native-save-archive.mjs',import.meta.url),new URL('../../../rpg-maker/qa/native-journeys.test.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'refinement-'+variant,criteria:[{id:'refinement-journey',variant,expectedRef:ref}],requires:['native-mz','public-input'],storage:{expectedRef:ref},audioFormat:'wav',audioSources:{master:{path:'WebAudio._masterGainNode',expectedRef:ref}},browser:{width:reduced?1920:1280,height:reduced?1080:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',channel:'chrome',query:'',reducedMotion:reduced?'reduce':'no-preference',recordVideo:true,timeoutMs:30000,executionTimeoutMs:1800000}};

export async function execute(context){
 const returnsOnly=variant==='return-only',bad=variant==='bad'||returnsOnly,branch=Boolean(context.descriptor.nativeArchive);
 const file=branch?context.descriptor.nativeArchive.fileId:1;
 const transcript=[],archives=[],returns=[],controls=new Set();
 let serial=0,audioGroup=null,retreats=0,recovery=false,departures=0,pendingReturn;
 function beginReturn(before){
  assert.equal(pendingReturn,undefined);
  pendingReturn=context.read('return-motion-'+serial,async before=>{
   const rows=[];
   for(let n=0;n<600;n++){
    const scene=SceneManager._scene,w=scene._choiceListWindow,phase=$gameSystem._dryland.campaign.phase;
    const changed=phase!==before.phase||$gameMessage.allText()!==before.text;
    const ready=Boolean(w?.isOpenAndActive()),paused=Boolean(scene._messageWindow?.pause);
    rows.push({frame:Graphics.frameCount,map:$gameMap.mapId(),phase,ready,black:$gameScreen.picture(90)?.opacity(),heroes:Array.from({length:8},(_,i)=>{const p=$gameScreen.picture(10+i);return p?{id:'H'+(i+1),opacity:p.opacity(),duration:p._duration}:null;})});
    if(phase==='formation'&&$gameMap.mapId()===3&&ready)break;
    if(changed&&phase!=='formation'&&(ready||paused)&&!scene.isBusy())break;
    await new Promise(resolve=>requestAnimationFrame(resolve));
   }return rows;
  },{phase:before.phase,text:before.text});
 }
 const state=async label=>(await player.snapshot(label)).campaign;
 async function observe(player,surface){
  const s=await state('passage-state-'+(++serial));
  surface.phase=s.phase;
  const id=s.reading?.passageIds[s.reading.index]||'native-'+surface.map;
  const group=s.phase==='epilogue'?'epilogue':s.phase==='memorial'?'memorial':s.phase==='ending'?'ending':id.startsWith('closure.')?'closure':s.phase==='intro'?'opening':'journey';
  if(audioGroup!==group){if(audioGroup!==null)await context.audio.stop();await context.audio.start('audio-'+serial+'-'+group,'master');audioGroup=group;}
  const shown=await context.read('rendered-passage-'+serial,()=>({text:$gameMessage.allText(),speaker:$gameMessage.speakerName(),bgm:AudioManager._currentBgm,bgs:AudioManager._currentBgs,me:AudioManager._currentMe,bgmStart:AudioManager._bgmBuffer?._startTime,bgsStart:AudioManager._bgsBuffer?._startTime,pictures:Array.from({length:100},(_,id)=>{const p=$gameScreen.picture(id);return p?{id,name:p.name(),x:p.x(),y:p.y(),sx:p.scaleX(),sy:p.scaleY(),opacity:p.opacity(),duration:p._duration}:null;}).filter(Boolean)}));
  transcript.push({serial,id,phase:s.phase,sequence:s.sequence,...shown});
  if(s.phase==='epilogue'){
   assert.equal(shown.speaker,'Rheed');assert.equal(shown.pictures.find(p=>p.id===1)?.name,'Dryland_Black');
   assert.equal(shown.pictures.find(p=>p.id===60)?.name,'Reed final');
   assert.equal(shown.bgm.name,'Town1');assert.equal(shown.bgs.name,'People2');assert.notEqual(shown.me?.name,'Applause1');
  }
  if(!controls.has(group)&&['opening','closure','epilogue'].includes(group)){
   controls.add(group);await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('hide-'+serial);
   await context.input.key('Tab');await player.ready();assert.deepEqual(await state('hide-restored-'+serial),s);
   assert.equal((await player.surface()).text,surface.text);
   if(group==='epilogue'){
    const point=await context.read('epilogue-options-point',()=>{const b=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type==='options').getBounds(),r=Graphics._canvas.getBoundingClientRect();return{x:r.x+(b.x+b.width/2)*r.width/Graphics.width,y:r.y+(b.y+b.height/2)*r.height/Graphics.height};});
    await player.click(point.x,point.y);await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
    for(const target of [0,100])for(const key of ['bgmVolume','bgsVolume']){
     const index=await context.read('epilogue-volume-index',key=>SceneManager._scene._optionsWindow._list.findIndex(c=>c.symbol===key),key);assert.ok(index>=0);
     for(let n=0;n<30;n++){const current=await context.read('epilogue-volume-focus',()=>SceneManager._scene._optionsWindow.index());if(current===index)break;await context.input.key(current<index?'ArrowDown':'ArrowUp');}
     for(let n=0;n<11;n++){const value=await context.read('epilogue-volume',key=>ConfigManager[key],key);if(value===target)break;await context.input.key(value>target?'ArrowLeft':'ArrowRight');}
     assert.equal(await context.read('epilogue-volume-confirmed',key=>ConfigManager[key],key),target);await context.shot('epilogue-'+key+'-'+target);
    }
    await context.input.key('Escape');await player.ready();assert.deepEqual(await state('epilogue-options-restored'),s);
   }
  }
  await context.shot('passage-view-'+serial);
  if(['dungeon_complete','death_result','automatic_retreat'].includes(s.phase))beginReturn(surface);
 }
 async function afterAdvance(player,before){
  const s=await state('after-advance');
  if(pendingReturn){
   const samples=await pendingReturn;pendingReturn=undefined;
   if(samples.some(row=>row.phase==='formation')){
    const current=await state('return-finished');returns.push({fromPhase:before.phase,fromMap:before.map,serial,dead:current.deadHeroIds,samples});await context.shot('return-ready-'+serial);
   }
  }else if(s.phase==='formation'&&before.phase!=='formation'&&before.map!==3&&before.phase!=='intro'){
   const samples=await context.read('return-motion-'+serial,async()=>{
    const rows=[];for(let n=0;n<360;n++){
     const w=SceneManager._scene._choiceListWindow;
     rows.push({frame:Graphics.frameCount,map:$gameMap.mapId(),ready:Boolean(w?.isOpenAndActive()),black:$gameScreen.picture(90)?.opacity(),heroes:Array.from({length:8},(_,i)=>{const p=$gameScreen.picture(10+i);return p?{id:'H'+(i+1),opacity:p.opacity(),duration:p._duration}:null;})});
     if($gameMap.mapId()===3&&w?.isOpenAndActive())break;
     await new Promise(resolve=>requestAnimationFrame(resolve));
    }return rows;
   });returns.push({fromPhase:before.phase,fromMap:before.map,serial,dead:s.deadHeroIds,samples});await context.shot('return-ready-'+serial);
  }
 }
 const player=new DirectedNativePlayer(context,{onPassage:observe,onAdvance:afterAdvance});
 async function archive(id,options){const value=await captureNativeSave(context,id,options);archives.push(value);return value;}
 async function save(id){
  await player.choose('Salvar campanha atual',{settled:()=>Boolean($gameTemp._drylandSaveNotice)&&$gameTemp._drylandPersistence.status==='saved'});
  await context.shot('save-notice-'+id);return archive(id,{method:'native manual save after Salvar campanha atual public activation'});
 }
 async function gateCancel(entry){
  await player.until('title');
  const before=await context.read('gate-storage-before',()=>localforage.keys());
  for(const method of ['button','escape']){
   await player.choose(entry);await player.until('age-notice');
   assert.equal(await context.read('unchecked-age',()=>$gameTemp._drylandAgeNotice.checked),false);
   await context.shot('gate-'+entry.replaceAll(' ','-')+'-'+method);
   if(method==='button')await player.choose('Voltar ao título');else await context.input.key('Escape');
   await player.until('title');assert.deepEqual(await context.read('gate-storage-after',()=>localforage.keys()),before);
  }
 }
 async function resume(){
  if(audioGroup!==null){await context.audio.stop();audioGroup=null;}
  await context.reopenPage();await player.choose('Continuar');await player.file(file);await player.returnToTavern();
 }
 async function board(){
  const before=await state('board-before');await player.choose('Quadro');
  const surface=await player.choicesContaining('Voltar');await context.shot('board-'+before.deadHeroIds.length+'-'+serial);
  assert.deepEqual(await state('board-observation'),before);await player.choose('Voltar');await player.returnToTavern();
  return surface;
 }
 async function roster(ids){
  let s=await state('roster-before');
  for(const id of s.draftPartyIds.filter(id=>!ids.includes(id))){await player.choose(names[+id.slice(1)-1]);await player.choose('Retirar do grupo');await player.returnToTavern();}
  s=await state('roster-after-removals');
  for(const id of ids.filter(id=>!s.draftPartyIds.includes(id))){await player.choose(names[+id.slice(1)-1],{mouse:reduced});await player.choose('Selecionar');await player.returnToTavern();}
 }
 if(!branch)await gateCancel('Novo jogo');
 else await gateCancel('Continuar');
 await player.choose(branch?'Continuar':'Novo jogo');await player.file(file);await player.ready();
 if(!branch){
  await archive('opening');await player.returnToTavern();
  if(!bad){
   await board();
   for(const name of variant==='physical-first'?names:[]){await player.choose(name,{mouse:reduced});await player.choose('Conversar');await player.until('hero');await player.returnToTavern();}
   await roster(['H1']);await save('incomplete-formation');
   await player.choose('Configurações');await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());await context.shot('tavern-options');await context.input.key('Escape');await player.returnToTavern();
   await roster(['H1','H2','H3']);
   await player.choose('Seraphina');await player.choose('Selecionar');await player.until('hero');assert.deepEqual((await state('rejected-full')).draftPartyIds,['H1','H2','H3']);await player.returnToTavern();
   await player.choose('Griznik');await player.choose('Retirar do grupo');await player.returnToTavern();await roster(['H1','H2','H3']);
  }
 }
 const routeOrder=variant==='supernatural-first'?['supernatural','physical','final']:['physical','supernatural','final'];
 const banked=new Set();
 for(let step=0;step<500;step++){
  const surface=await player.ready(),s=await state('decision-'+step);
  if(s.phase==='campaign_complete')break;
  const id=s.reading?.passageIds[s.reading.index];
  const key=s.phase==='final_choice'?'council-parent':s.phase==='ending'?'ending':id?.startsWith('closure.')?id:null;
  if(key&&!banked.has(key)){banked.add(key);await archive(key.replaceAll('.','-'));}
  if(surface.active&&surface.kind==='formation'){
   await board();
   if(returnsOnly&&s.deadHeroIds.length>=7)break;
   const alive=names.map((_,i)=>'H'+(i+1)).filter(id=>!s.deadHeroIds.includes(id));
   await roster((bad?['H4','H7','H5','H1','H8','H3','H2','H6']:['H1','H2','H3']).filter(id=>alive.includes(id)).slice(0,3));
   if(!bad&&!recovery&&s.completedDungeonIds.length===1){
    const saved=await save('before-preparation');assert.equal(saved.campaign.preparationIntroductionCompleted,false);
    await player.choose('Seguir');await player.until('destinations');await player.choose('Voltar');await player.returnToTavern();
    assert.equal((await state('unsaved-introduction')).preparationIntroductionCompleted,true);
    await resume();assert.equal((await state('restored-before-introduction')).preparationIntroductionCompleted,false);
    await gateCancelAfterReopen();
    await player.choose('Seguir');await player.until('destinations');await player.choose('Voltar');await player.returnToTavern();await save('after-preparation');
    await resume();assert.equal((await state('restored-after-introduction')).preparationIntroductionCompleted,true);recovery=true;
   }
   const route=routeOrder.find(id=>!s.completedDungeonIds.includes(id));
   await player.choose('Seguir');const destinations=await player.until('destinations');
   const label=await context.read('route-label',id=>$dataCommonEvents[4].list.find(c=>c.code===357&&c.parameters[1]==='ConfigureRoute'&&c.parameters[3].id===id).parameters[3].name,route);
   await player.choose(destinations.labels.find(text=>text.includes(label)),{settled:id=>$gameSystem._dryland.campaign.selectedDungeonId===id,settledArg:route});
   assert.equal((await state('selected-not-departed')).phase,'formation');await context.shot('destination-'+departures);
   await player.choose('Partir');departures++;
  }else if(surface.active&&surface.kind==='approaches'){
   if(bad&&s.deadHeroIds.length>0&&retreats<2){
    await archive('before-retreat-'+retreats);await player.choose(surface.labels[4]);const retreat=await player.until('retreat');retreat.phase='retreat_confirmation';beginReturn(retreat);await player.choose(retreat.labels[0]);await afterAdvance(player,retreat);await player.returnToTavern();await archive('after-retreat-'+retreats);retreats++;continue;
   }
   const encounter=s.assignments[s.dungeonId][s.position-1];
   const viable=gdd.encounterPairs[encounter].map(c=>s.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
   let index=bad?viable.indexOf(false):viable.indexOf(true);if(bad&&index<0)index=0;
   assert.ok(index>=0);await player.choose(surface.labels[index],{mouse:reduced});
  }else if(surface.active&&surface.kind==='sacrifice'){
   const victim=s.partyIds[Math.min(1,s.partyIds.length-1)];await player.choose(surface.labels[Math.min(1,s.partyIds.length-1)],{mouse:reduced});
   const next=await state('committed-victim');assert.deepEqual(next.deadHeroIds,[...s.deadHeroIds,victim]);
   await archive('death-'+next.deadHeroIds.length);
  }else if(surface.active&&surface.kind==='ending'){
   await context.shot('final-two-panels');await player.choose(surface.labels[variant==='physical-first'?0:1],{mouse:reduced});
  }else{
   assert.ok(surface.paused,JSON.stringify(surface));await observe(player,surface);await context.input.key('Enter');await afterAdvance(player,surface);
  }
  assert.ok(step<499,'Public campaign did not reach credits');
 }
 async function gateCancelAfterReopen(){
  if(audioGroup!==null){await context.audio.stop();audioGroup=null;}await context.reopenPage();await gateCancel('Continuar');await player.choose('Continuar');await player.file(file);await player.returnToTavern();
 }
 const final=await state('completed');
 if(returnsOnly){assert.equal(final.phase,'formation');assert.equal(final.deadHeroIds.length,7);}
 else {assert.equal(final.endingId,bad?'bad':variant==='physical-first'?'reunite':'destroy');if(bad)assert.equal(final.deadHeroIds.length,8);}
 if(audioGroup!==null){await context.audio.stop();audioGroup=null;}
 if(!returnsOnly){assert.equal(await context.read('credits-audio-cleanup',()=>AudioManager._bgmBuffer===null&&AudioManager._bgsBuffer===null),true);await finishCredits(context,player,'refinement');}
 context.report.observations.push({label:'refinement-result',kind:'refinement-result',value:{variant,motion:reduced?'reduced':'normal',final,transcript,returns,controls:[...controls],archives:archives.map(a=>({file:a.fileId,sequence:a.campaign.sequence,phase:a.campaign.phase,payloadSha256:a.payloadSha256,indexSha256:a.indexSha256}))}});
}
export async function verify({expected,artifacts,report}){
 const result=report.observations.find(row=>row.kind==='refinement-result');
 return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Public inputs and read-only observations; image/video inspection and human audio/UI/pacing acceptance remain separate.']})),pendingReviews:['Inspect captures and transitions; obtain the selected human judgments.']};
}
