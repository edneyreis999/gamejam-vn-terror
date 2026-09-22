import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
import { captureNativeSave } from '../../../rpg-maker/qa/native-save-archive.mjs';
import { finishCredits } from '../../../rpg-maker/qa/native-journeys.test.mjs';

const ref='planos/tasks/approved-narrative-dialogue-staging/verification.md#runtime-scenarios';
const variant=process.env.DRYLAND_QA_STAGING||'physical-first';
const reduced=process.env.DRYLAND_QA_MOTION==='reduce';
const names=['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/qa/native-save-archive.mjs',import.meta.url),new URL('../../../rpg-maker/qa/native-journeys.test.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'approved-staging-'+variant,criteria:[{id:'staging-journey',variant,expectedRef:ref}],requires:['native-mz','public-input'],storage:{expectedRef:ref},audioFormat:'wav',audioSources:{master:{path:'WebAudio._masterGainNode',expectedRef:ref}},browser:{width:reduced?1920:1280,height:reduced?1080:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',channel:'chrome',query:'',reducedMotion:reduced?'reduce':'no-preference',recordVideo:true,timeoutMs:30000,executionTimeoutMs:1800000}};

async function consolePoint(context,type){
 return context.read('console-point-'+type,value=>{const button=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type===value);const b=button.getBounds(),r=Graphics._canvas.getBoundingClientRect();return{x:r.x+(b.x+b.width/2)*r.width/Graphics.width,y:r.y+(b.y+b.height/2)*r.height/Graphics.height};},type);
}

async function allVolumes(context,target){
 for(const key of ['bgmVolume','bgsVolume','meVolume','seVolume']){
  const index=await context.read('volume-index',key=>SceneManager._scene._optionsWindow._list.findIndex(c=>c.symbol===key),key);
  assert.ok(index>=0);
  while(await context.read('volume-focus',()=>SceneManager._scene._optionsWindow.index())!==index)await context.input.key('ArrowDown');
  for(let step=0;step<11;step++){
   const value=await context.read('volume-value',key=>ConfigManager[key],key);if(value===target)break;
   await context.input.key(value>target?'ArrowLeft':'ArrowRight');
  }
  assert.equal(await context.read('volume-verified',key=>ConfigManager[key],key),target);
 }
}

export async function execute(context){
 let serial=0,audioContext=null;
 const transcript=[],controlled=new Set(),archives=[];
 const branch=variant==='branch-destroy',bad=variant==='bad';
 const file=branch?context.descriptor.nativeArchive.fileId:Number(process.env.DRYLAND_QA_FILE||1);
 async function observe(player,surface){
  const before=await player.snapshot('reading-'+(++serial));
  const state=before.campaign,id=state.reading?.passageIds[state.reading.index]||`hero.${surface.map}`;
  const contextId=id.startsWith('prologue.rheed.')?Number(id.slice(-2))<=3?'present':'past-tavern':id.startsWith('closure.')||['council.01','council.03','council.challenge','council.solo'].includes(id)?'present':state.phase==='formation'?'past-tavern':state.phase==='ending'?'ending-'+state.endingId:state.phase==='epilogue'?'epilogue':'past-'+state.dungeonId;
  if(audioContext!==contextId){if(audioContext!==null)await context.audio.stop();await context.audio.start(`sound-${serial}-${contextId}`,'master');audioContext=contextId;}
  await context.wait(()=>{
   if($gameTemp.isExtendedFastForwardMode())return true;
   const scene=SceneManager._scene;
   return Array.from({length:11},(_,i)=>$gameScreen.picture(60+i)).filter(Boolean).every(p=>p._duration===0&&p._toneDuration===0&&Math.abs(p.opacity()-255)<1e-6)&&(!$gameMessage.speakerName()||scene._nameBoxWindow.openness===255);
  });
  const shown=await context.read('staging-'+serial,()=>({text:$gameMessage.allText(),speaker:$gameMessage.speakerName(),pictures:Array.from({length:100},(_,id)=>{const p=$gameScreen.picture(id);return p?{id,name:p.name(),x:p.x(),y:p.y(),sx:p.scaleX(),sy:p.scaleY(),opacity:p.opacity()}:null;}).filter(Boolean),bgm:AudioManager._currentBgm,bgs:AudioManager._currentBgs,me:AudioManager._currentMe,logical:[Graphics.width,Graphics.height]}));
  if(['encounter_intro','approach_result'].includes(state.phase))assert.equal(shown.pictures.some(p=>p.id>=60&&p.id<=70),false,'Threshold portraits must leave before the encounter art and result.');
  if(id.startsWith('farewell.'))assert.deepEqual(shown.pictures.filter(p=>p.id>=60&&p.id<=70).map(p=>p.id),[60],'Only the farewell speaker remains.');
  transcript.push({serial,id,phase:state.phase,sequence:state.sequence,...shown});
  if(contextId==='present'){
   assert.equal(shown.pictures.find(p=>p.id===1),undefined);
   assert.deepEqual(shown.pictures.filter(p=>p.id>=60&&p.id<=70).map(p=>p.name),['Reed final']);
   assert.equal(shown.bgm.name,'Town1');assert.equal(shown.bgs.name,'People2');
  }
  const group=id.startsWith('prologue.')?contextId:id.startsWith('closure.')?'closure':id.startsWith('council.')?'council':state.phase;
  if(!controlled.has(group)&&['present','past-tavern','closure','council','approach_result','ending','epilogue'].includes(group)){
   controlled.add(group);
   const rendered=()=>context.read('portrait-render-'+serial,async()=>{
    await new Promise(resolve=>Graphics.app.renderer.once('postrender',resolve));
    const scene=SceneManager._scene;
    return Array.from({length:11},(_,i)=>60+i).filter(id=>$gameScreen.picture(id)).map(id=>{const container=($gameSystem._attachedMessagePictures||[]).includes(id)?scene._messageWindow._pictureContainer:scene._spriteset._pictureContainer;const sprite=container.children.find(s=>s._pictureId===id),b=sprite.getBounds();return{id,visible:sprite.worldVisible,alpha:sprite.worldAlpha,x:b.x,y:b.y,width:b.width,height:b.height};});
   });
   const portraits=await rendered();
   await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('hide-'+serial);
   assert.deepEqual(await rendered(),portraits,'HIDE preserves the rendered scene, including narrative portraits.');
   if(reduced){const r=await context.read('restore-point',()=>{const r=Graphics._canvas.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/3};});await player.click(r.x,r.y);}else await context.input.key('Tab');
   await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);await player.ready();
   assert.deepEqual((await player.snapshot('restored-'+serial)).campaign,state);
   assert.equal((await player.surface()).text,surface.text);
   const p=await consolePoint(context,'options');await player.click(p.x,p.y);
   await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
   if(reduced&&group==='present')await allVolumes(context,40);
   await context.input.key('Escape');await player.ready();
   assert.deepEqual((await player.snapshot('settings-restored-'+serial)).campaign,state);
   assert.equal((await player.surface()).text,surface.text);
  }
  await context.shot('staged-'+serial);
 }
 const player=new DirectedNativePlayer(context,{onPassage:observe});
 const preserved=context.descriptor.storageFixture?await context.read('imported-file-bytes',id=>StorageManager.loadZip('file'+id),context.descriptor.nativeArchive.fileId):null;
 if(reduced&&!branch){await player.choose('Configurações');await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());await allVolumes(context,0);await context.input.key('Escape');}
 await player.choose(branch?'Continuar':preserved?'Novo jogo':'Jogar');
 await context.audio.start('welcome-or-continue','master');audioContext='opening';
 await player.file(file);await player.ready();
 if(!branch){
  archives.push(await captureNativeSave(context,'opening'));
  await player.returnToTavern();
  if(!bad){
   // Each hero is visited while unselected, then selected and removed through
   // the real menu. No fixture creates a roster or marks a reading as seen.
   for(const name of names){
    await player.choose(name,{mouse:reduced});await player.choose('Conversar');await player.until('hero');
    if(name==='Gorvak'){
     await player.choose('Conversar');await player.ready();
     assert.equal(await context.read('seen-fast-permission',()=>$gameSystem.isExtendedFastForwardDisallowed()),false);
     const fast=await consolePoint(context,'fastfwd');await player.click(fast.x,fast.y);await player.until('hero');
     assert.equal(await context.read('seen-fast-stopped',()=>$gameTemp.isExtendedFastForwardMode()),false);
    }
    await player.choose('Selecionar');await player.until('hero');await player.choose('Retirar do grupo');await player.returnToTavern();
   }
   for(const name of names.slice(0,3)){await player.choose(name);await player.choose('Selecionar');await player.returnToTavern();}
   for(const target of names){
    const roster=(await player.snapshot('full-party-entry')).campaign.draftPartyIds.map(id=>names[Number(id.slice(1))-1]);
    if(roster.includes(target)){
     await player.choose(target);await player.choose('Retirar do grupo');await player.returnToTavern();
     await player.choose(names.find(name=>!roster.includes(name)));await player.choose('Selecionar');await player.returnToTavern();
    }
    const full=(await player.snapshot('full-party-'+target)).campaign;
    await player.choose(target);await player.choose('Selecionar');
    if(target==='Gorvak'){
     await observe(player,await player.ready());await context.input.keyDown('Enter');
     try{await context.wait(()=>SceneManager._scene._choiceListWindow.isOpenAndActive()&&$gameMessage._drylandChoiceFocus.key==='hero');assert.deepEqual((await player.snapshot('held-confirmation-menu')).campaign,full);}finally{await context.input.keyUp('Enter');}
    }
    await player.until('hero');
    assert.deepEqual((await player.snapshot('full-refused-'+target)).campaign,full);
    await player.returnToTavern();
   }
   for(const id of (await player.snapshot('after-hero-matrix')).campaign.draftPartyIds){await player.choose(names[Number(id.slice(1))-1]);await player.choose('Retirar do grupo');await player.returnToTavern();}
  }
 }
 const routeOrder=variant==='supernatural-first'?['supernatural','physical','final']:['physical','supernatural','final'];
 const checkpointKeys=new Set();
 for(let step=0;step<450;step++){
  const surface=await player.ready(),state=(await player.snapshot('decision-'+step)).campaign;
  if(state.phase==='campaign_complete')break;
  const readingId=state.reading?.passageIds[state.reading.index];
  const checkpoint=state.phase==='approach_result'?'result':readingId?.startsWith('closure.')?readingId:readingId==='council.02'?'medallion':state.phase==='final_choice'?'final-choice':state.phase==='ending'?'ending':null;
  if(checkpoint&&!checkpointKeys.has(checkpoint)){
   checkpointKeys.add(checkpoint);archives.push(await captureNativeSave(context,checkpoint.replaceAll('.','-')));
  }
  if(surface.active&&surface.kind==='formation'){
   const alive=names.map((_,i)=>'H'+(i+1)).filter(id=>!state.deadHeroIds.includes(id));
   if(alive.length>3){
    const desired=bad?['H4','H7','H5','H1','H8','H3','H2','H6'].filter(id=>alive.includes(id)).slice(0,3):['H1','H2','H3'];
    for(const id of state.draftPartyIds.filter(id=>!desired.includes(id))){await player.choose(names[Number(id.slice(1))-1]);await player.choose('Retirar do grupo');await player.returnToTavern();}
    for(const id of desired.filter(id=>!state.draftPartyIds.includes(id))){await player.choose(names[Number(id.slice(1))-1]);await player.choose('Selecionar');await player.returnToTavern();}
   }
   const route=routeOrder.find(id=>!state.completedDungeonIds.includes(id));
   await player.choose('Destinos');const destinations=await player.until('destinations');
   const label=await context.read('route-label',id=>$dataCommonEvents[4].list.find(c=>c.code===357&&c.parameters[1]==='ConfigureRoute'&&c.parameters[3].id===id).parameters[3].name,route);
   await player.choose(destinations.labels.find(text=>text.includes(label)));await player.choose('Partir');
  }else if(surface.active&&surface.kind==='approaches'){
   const encounter=state.assignments[state.dungeonId][state.position-1];
   const viable=gdd.encounterPairs[encounter].map(c=>state.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
   let index=bad?viable.indexOf(false):viable.indexOf(true);if(bad&&index<0)index=0;
   assert.ok(index>=0);await player.choose(surface.labels[index],{mouse:reduced});
  }else if(surface.active&&surface.kind==='sacrifice')await player.choose(surface.labels[0]);
  else if(surface.active&&surface.kind==='ending')await player.choose(surface.labels[branch||variant==='supernatural-first'?1:0]);
  else{
   assert.ok(surface.paused,JSON.stringify(surface));await observe(player,surface);await context.input.key('Enter');
  }
  assert.ok(step<449,'The legal campaign must reach its credits');
 }
 const final=(await player.snapshot('completed')).campaign;
 assert.equal(final.endingId,bad?'bad':branch||variant==='supernatural-first'?'destroy':'reunite');
 if(!bad){
  const council=[...new Set(transcript.filter(r=>r.phase==='council').map(r=>r.id))];
  const expected=['council.01','council.02','council.03',final.climaxPartyIds.length?'council.challenge':'council.solo','council.confession','council.andira',...final.climaxPartyIds.map(id=>'opinion.'+id),'irati.03'];
  assert.deepEqual(council,branch?expected.slice(1):expected);
 }
 if(audioContext!==null){await context.audio.stop();audioContext=null;}
 await finishCredits(context,player,'staging');
 const terminal=archives.find(a=>a.campaign.phase==='ending');assert.ok(terminal);
 await context.reopenPage();await player.choose('Continuar');await player.file(file);await player.ready();
 assert.deepEqual((await player.snapshot('ending-continue')).campaign,terminal.campaign);
 await observe(player,await player.ready());await context.input.key('Enter');
 assert.equal((await player.snapshot('ending-next-input')).campaign.endingId,final.endingId);
 if(preserved&&!branch)assert.equal(await context.read('preserved-imported-file',id=>StorageManager.loadZip('file'+id),context.descriptor.nativeArchive.fileId),preserved);
 context.report.observations.push({label:'staging-result',kind:'staging-result',value:{variant,file,motion:reduced?'reduced':'normal',final,transcript,controls:[...controlled],archives:archives.map(a=>({file:a.fileId,sequence:a.campaign.sequence,phase:a.campaign.phase,payloadSha256:a.payloadSha256,indexSha256:a.indexSha256})),preservedImportedFile:Boolean(preserved&&!branch)}});
}

export async function verify({expected,artifacts,report}){
 const result=report.observations.find(row=>row.kind==='staging-result');
 return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Directed player inputs and read-only inspection. Actual image/transition inspection and audio audition are separate sensors.']})),pendingReviews:['Inspect recorded composition and motion; listen to the emitted audio.']};
}
