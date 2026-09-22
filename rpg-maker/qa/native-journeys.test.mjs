import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from './native-player.mjs';
import { captureNativeSave, sha256 } from './native-save-archive.mjs';
export const sourceFiles=[new URL('./native-player.mjs',import.meta.url),new URL('./native-save-archive.mjs',import.meta.url),new URL('../tests/fixtures/gdd-competencies.json',import.meta.url)];
const variant=process.env.DRYLAND_QA_JOURNEY||'physical-first-reunite';
const gdd=JSON.parse(await readFile(new URL('../tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const scenario={storage:{expectedRef:"planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios"},id:variant,criteria:[{id:'campaign',variant,expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios'}],requires:['native-mz','public-input'],browser:{width:1280,height:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',query:'',reducedMotion:process.env.DRYLAND_QA_MOTION==='reduce'?'reduce':'no-preference',timeoutMs:30000}};
const names=['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
async function readCredits(context,label){
 return context.read(label,()=>{
  const scene=SceneManager._scene,w=scene&&scene._scrollTextWindow,raw=(w&&w._text)||$gameMessage.allText()||'';
  const lastLine=raw.split(/\r?\n/).map(line=>line.replace(/<[^>]*>/g,'').replace(/\\[A-Za-z]+\[[^\]]*\]/g,'').trim()).filter(Boolean).at(-1)||'';
  return{frame:Graphics.frameCount,time:performance.now(),scene:scene?scene.constructor.name:null,active:Boolean(w&&w._text),scrollY:w?w._scrollY:null,allTextHeight:w?w._allTextHeight:null,height:w?w.height:null,configuredSpeed:$gameMessage.scrollSpeed(),noFast:$gameMessage.scrollNoFast(),effectiveSpeed:w&&typeof w.scrollSpeed==='function'?w.scrollSpeed():null,fastForward:Boolean(w&&typeof w.isFastForward==='function'&&w.isFastForward()),lastLine};
 });
}
async function nextCreditFrame(context,previous,label){
 await context.wait(({frame,scrollY})=>{
  const scene=SceneManager._scene,w=scene&&scene._scrollTextWindow;
  return Graphics.frameCount>frame&&w&&w._text&&w._scrollY>scrollY;
 },previous);
 return readCredits(context,label);
}
async function finalCreditLine(context,label){
 return context.read(label+'-credits-final-line',async()=>{
  const tracked=SceneManager._scene._scrollTextWindow;
  const sample=()=>({frame:Graphics.frameCount,time:performance.now(),active:Boolean(tracked._text),scrollY:tracked._scrollY,allTextHeight:tracked._allTextHeight,height:tracked.height,effectiveSpeed:tracked.scrollSpeed(),lastLine:(tracked._text||'').split(/\r?\n/).map(line=>line.replace(/<[^>]*>/g,'').replace(/\\[A-Za-z]+\[[^\]]*\]/g,'').trim()).filter(Boolean).at(-1)||''});
  const started=performance.now();let previous=sample();
  while(performance.now()-started<30000){
   await new Promise(resolve=>requestAnimationFrame(resolve));
   const current=sample();if(current.frame===previous.frame)continue;
   if(previous.active&&!current.active)return{...previous,boundary:true,nextFrame:current};
   previous=current;
  }
  throw Error('Credits did not reach native termination within the scenario deadline.');
 });
}
async function stableTitle(context,label){
 const titleReady=()=>{
  const scene=SceneManager._scene,choices=scene&&scene._choiceListWindow;
  return $gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&choices&&choices.isOpenAndActive()&&!scene.isBusy()&&!$gameMessage.scrollMode()&&!(scene._scrollTextWindow&&scene._scrollTextWindow._text);
 };
 const titleState=serial=>context.read(label+'-title-stable-'+serial,()=>{
  const scene=SceneManager._scene,choices=scene._choiceListWindow;
  return{frame:Graphics.frameCount,mapId:$gameMap.mapId(),scene:scene.constructor.name,labels:(choices._list||[]).map(item=>choices.convertEscapeCharacters(item.name).replace(/<[^>]*>/g,'').replace(/\x1b[A-Za-z]+\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim()),active:Boolean(choices.isOpenAndActive()),index:choices.index(),busy:scene.isBusy(),messageBusy:$gameMessage.isBusy(),scrolling:Boolean(scene._scrollTextWindow&&scene._scrollTextWindow._text),scrollMode:$gameMessage.scrollMode(),text:$gameMessage.allText()};
 });
 await context.wait(titleReady);
 const samples=[await titleState(1)];
 for(let serial=2;serial<=3;serial++){
  await context.wait(({frame})=>{
   const scene=SceneManager._scene,choices=scene&&scene._choiceListWindow;
   return Graphics.frameCount>frame&&$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&choices&&choices.isOpenAndActive()&&!scene.isBusy()&&!$gameMessage.scrollMode()&&!(scene._scrollTextWindow&&scene._scrollTextWindow._text);
  },samples.at(-1));
  samples.push(await titleState(serial));
 }
 const comparable=sample=>JSON.stringify({mapId:sample.mapId,scene:sample.scene,labels:sample.labels,active:sample.active,index:sample.index,busy:sample.busy,messageBusy:sample.messageBusy,scrolling:sample.scrolling,scrollMode:sample.scrollMode,text:sample.text});
 assert.equal(samples.length,3);
 assert.equal(new Set(samples.map(comparable)).size,1,'Title must remain stable for three native frames.');
 assert.equal(samples[0].labels.filter(value=>value==='Continuar').length,1,'Title must expose one Continue choice.');
 return samples;
}
function assertCreditProgress(before,after,expected){
 assert.equal(after.configuredSpeed,2);
 assert.equal(after.noFast,false);
 assert.equal(after.effectiveSpeed,expected);
 assert.equal(after.fastForward,expected===3);
 const frameDelta=after.frame-before.frame,scrollDelta=after.scrollY-before.scrollY;
 assert.ok(frameDelta>0&&scrollDelta>0,'Credits must advance between native frames.');
 assert.ok(Math.abs(scrollDelta/frameDelta-expected)<0.000001,'Credits must advance at the native speed per frame.');
 return{frameDelta,scrollDelta,observedSpeed:scrollDelta/frameDelta};
}
export async function finishCredits(context,player,label){
 await player.until('credits');await context.shot(label+'-credits-start');
 const mode=process.env.DRYLAND_QA_CREDITS||'keyboard',allowed=['natural','accelerated','keyboard','mouse','late-keyboard','late-mouse'];
 assert.ok(allowed.includes(mode),'Unknown directed credits mode: '+mode);
 const baseMode=mode.startsWith('late-')?mode.slice(5):mode;
 if(mode.startsWith('late-'))await context.wait(()=>{const scene=SceneManager._scene,w=scene&&scene._scrollTextWindow;return w&&w.origin.y>0;});
 const initial=await readCredits(context,label+'-credits-start-read');
 assert.equal(initial.configuredSpeed,2,'Credits must use native speed 2.');
 assert.equal(initial.noFast,false,'Credits must allow native acceleration.');
 assert.equal(initial.effectiveSpeed,1,'Native speed 2 must advance one pixel per frame normally.');
 assert.ok(initial.active&&initial.allTextHeight>0&&initial.lastLine,'Credits must expose authored rolling text.');
 let moving=null,progress=null,edge=null,completion=null;
 if(baseMode==='natural'||baseMode==='accelerated'){
  if(baseMode==='accelerated'){
   await context.input.keyDown('Shift');
   try{
    const held=await readCredits(context,label+'-credits-shift-held');
    moving=await nextCreditFrame(context,held,label+'-credits-accelerated-frame');
    progress=assertCreditProgress(held,moving,3);
    await context.wait(()=>{const w=SceneManager._scene._scrollTextWindow;return w&&w._scrollY>=-w.height/2;});await context.shot(label+'-credits-middle');
    edge=await finalCreditLine(context,label);
   }finally{await context.input.keyUp('Shift');}
  }else{
   moving=await nextCreditFrame(context,initial,label+'-credits-natural-frame');
   progress=assertCreditProgress(initial,moving,1);
   await context.wait(()=>{const w=SceneManager._scene._scrollTextWindow;return w&&w._scrollY>=-w.height/2;});await context.shot(label+'-credits-middle');
   edge=await finalCreditLine(context,label);
  }
  const expectedSpeed=baseMode==='accelerated'?3:1;
  assert.equal(edge.boundary,true);
  assert.equal(edge.lastLine,initial.lastLine,'Final credit line must be observed before native termination.');
  assert.equal(edge.effectiveSpeed,expectedSpeed);
  assert.ok(edge.scrollY<edge.allTextHeight&&edge.scrollY+edge.height>=edge.allTextHeight,'Final credit line must reach the native viewport before termination.');
  assert.equal(edge.nextFrame.active,false,'Native termination must clear the scroll text.');
  assert.ok(edge.nextFrame.scrollY>=edge.nextFrame.allTextHeight,'Native termination must finish at the authored text height.');
  completion={natural:true,frame:edge.nextFrame.frame,scrollY:edge.nextFrame.scrollY,allTextHeight:edge.nextFrame.allTextHeight};
 }else if(baseMode==='mouse'){
  const point=await context.read(label+'-skip-geometry',()=>{
   const scene=SceneManager._scene,rect=Graphics._canvas.getBoundingClientRect();
   const sprite=scene._spriteset._pictureContainer.children.find(sprite=>sprite.picture()?._drylandScrollSkipKey);
   const bounds=sprite.getBounds();return{x:rect.x+(bounds.x+bounds.width/2)*rect.width/Graphics.width,y:rect.y+(bounds.y+bounds.height/2)*rect.height/Graphics.height};
  });await player.click(point.x,point.y);
 }else await context.input.key('Escape');
 const titleSamples=await stableTitle(context,label);
 context.report.observations.push({label:label+'-credits-oracle',kind:'credits-oracle',value:{
  mode,initial:{frame:initial.frame,scrollY:initial.scrollY,allTextHeight:initial.allTextHeight,configuredSpeed:initial.configuredSpeed,effectiveSpeed:initial.effectiveSpeed,noFast:initial.noFast,lastLine:initial.lastLine},
  progress:moving&&{frame:moving.frame,scrollY:moving.scrollY,effectiveSpeed:moving.effectiveSpeed,fastForward:moving.fastForward,...progress},
  finalLine:edge&&{frame:edge.frame,scrollY:edge.scrollY,allTextHeight:edge.allTextHeight,height:edge.height,effectiveSpeed:edge.effectiveSpeed,lastLine:edge.lastLine,nextFrame:edge.nextFrame},
  completion:completion||{natural:false,skipped:true},
  title:{stableFrames:titleSamples.length,oneContinue:titleSamples[0].labels.filter(value=>value==='Continuar').length===1,transitionCount:'combined with IT058; stability samples do not infer global transition count'}
 }});
 await player.choicesContaining('Continuar');await context.shot(label+'-title');
}
export async function execute(context){
 const player=new DirectedNativePlayer(context),fromArchive=Boolean(context.descriptor.storageFixture);
 const fileId=Number(process.env.DRYLAND_QA_FILE||context.descriptor.nativeArchive?.fileId||1);
 if(fromArchive){await player.choose('Continuar');await player.file(fileId);}
 else{await player.choose('Jogar');await player.file(fileId);await player.returnToTavern();await captureNativeSave(context,'new-campaign');}
 await player.ready();
 const parent=await player.snapshot('entry-campaign');
 assert.equal(parent.fileId,fileId);
 if(fromArchive)assert.equal(sha256(await context.read('loaded-parent-bytes',id=>StorageManager.loadZip('file'+id),fileId)),context.descriptor.nativeArchive.payloadSha256);
 const inverse=variant.startsWith('supernatural'),bad=variant==='bad',routeOrder=inverse?['supernatural','physical','final']:['physical','supernatural','final'];
 const branchOnly=process.env.DRYLAND_QA_BRANCH_ONLY==='1',approachRequest=process.env.DRYLAND_QA_APPROACH||'',victimRequest=process.env.DRYLAND_QA_VICTIM||'',branchType=approachRequest?'approach':victimRequest?'victim':null;
 if(branchOnly){
  assert.ok(fromArchive,'Branch-only requires a genuine native parent.');
  assert.equal(Number(Boolean(approachRequest))+Number(Boolean(victimRequest)),1,'Branch-only requires exactly one approach or victim request.');
  assert.ok(branchType==='victim'?parent.campaign.phase==='sacrifice_choice':['encounter_intro','encounter_choice'].includes(parent.campaign.phase),'Parent must precede the requested decision.');
 }
 let count=0,forcedApproach=false,retreatedForBank=false,branchChosen=false,councilBanked=false;
 const recordedDeaths=new Set(),recordedReturns=new Set();
 while(count++<350){
  const surface=await player.ready(),{campaign:state}=await player.snapshot(`decision-${count}`);
  const firstConsequence=branchType==='approach'?state.phase==='approach_result':branchType==='victim'?state.phase==='death_result':false;
  if(branchOnly&&branchChosen&&firstConsequence){
   const child=await captureNativeSave(context,'branch-result');
   if(branchType==='approach')assert.deepEqual(child.campaign.deadHeroIds,parent.campaign.deadHeroIds,'An approach branch must stop before choosing a victim.');
   else assert.equal(child.campaign.deadHeroIds.length,parent.campaign.deadHeroIds.length+1);
   context.report.observations.push({label:'branch-result',kind:'journey-result',value:{variant,branchType,phase:state.phase,parent:parent.campaign,result:child.campaign,fileId:child.fileId,payloadSha256:child.payloadSha256}});return;
  }
  if(['ending','memorial','epilogue','campaign_complete'].includes(state.phase))break;
  if(state.phase==='council'&&!councilBanked){
   await captureNativeSave(context,'council-entry');councilBanked=true;
  }
  if(state.phase==='death_result'&&!recordedDeaths.has(state.deadHeroIds.at(-1))){
   const hero=state.deadHeroIds.at(-1);await captureNativeSave(context,`committed-death-${hero}`);recordedDeaths.add(hero);
  }
  if(surface.active&&surface.kind==='formation'){
   if(process.env.DRYLAND_QA_RETURN_ONLY==='1'){
    await context.shot('return-before-exit');
    const dead=state.deadHeroIds.map(id=>9+Number(id.slice(1)));
    await context.read('return-portrait-opacity',ids=>ids.map(id=>({id,opacity:$gameScreen.picture(id)?.opacity()??null})),dead);
    if(process.env.DRYLAND_QA_LEAVE_FADE==='1'){await player.choose('Destinos');await player.until('destinations');}
    else await context.wait(ids=>ids.every(id=>!$gameScreen.picture(id)),dead);
    assert.equal(await context.read('absence-erased',ids=>ids.every(id=>!$gameScreen.picture(id)),dead),true);
    await context.shot('return-after-exit-or-fade');const child=await captureNativeSave(context,'return-result');
    context.report.observations.push({label:'return-result',kind:'journey-result',value:{variant,parent:parent.campaign,result:child.campaign,fileId:child.fileId,motion:process.env.DRYLAND_QA_MOTION||'normal',leave:process.env.DRYLAND_QA_LEAVE_FADE==='1'}});return;
   }

   if(state.deadHeroIds.length&&!recordedReturns.has(state.deadHeroIds.length)){
    await context.shot(`return-${state.deadHeroIds.length}`);await captureNativeSave(context,`return-${state.deadHeroIds.length}`);recordedReturns.add(state.deadHeroIds.length);
   }
   const alive=names.map((_,i)=>'H'+(i+1)).filter(id=>!state.deadHeroIds.includes(id));
   if(alive.length>3){
    const desired=bad?['H4','H7','H5','H1','H8','H3','H2','H6'].filter(id=>alive.includes(id)).slice(0,3):['H1','H2','H3'];
    for(const hero of state.draftPartyIds.filter(id=>!desired.includes(id))){await player.choose(names[Number(hero.slice(1))-1]);await player.choose('Retirar do grupo');await player.returnToTavern();}
    for(const hero of desired.filter(id=>!state.draftPartyIds.includes(id))){await player.choose(names[Number(hero.slice(1))-1]);await player.choose('Selecionar');await player.returnToTavern();}
   }
   const route=routeOrder.find(id=>!state.completedDungeonIds.includes(id));
   await player.choose('Destinos');const destinations=await player.until('destinations');
   // Public route labels are read from the functional editor configuration.
   const label=await context.read('public-route-name',id=>$dataCommonEvents[4].list.find(c=>c.code===357&&c.parameters[1]==='ConfigureRoute'&&c.parameters[3].id===id).parameters[3].name,route);
   assert.ok(label);await player.choose(destinations.labels.find(text=>text.includes(label)));await player.choose('Partir');
  }else if(surface.active&&surface.kind==='approaches'){
   const id=state.assignments[state.dungeonId][state.position-1];
   await player.assertMapOwner((id[0]==='A'?6:14)+Number(id.slice(1)));
   await captureNativeSave(context,`reveal-${state.dungeonId}-${state.position}-${state.sequence}`);
   if((process.env.DRYLAND_QA_BANK_RETREAT==='1'&&!fromArchive||process.env.DRYLAND_QA_RETURN_ONLY==='1')&&!retreatedForBank){
    await player.choose(surface.labels[4]);const retreat=await player.until('retreat');await player.choose(retreat.labels[0]);
    await player.returnToTavern();await captureNativeSave(context,'formation-return');retreatedForBank=true;continue;
   }
   const viable=gdd.encounterPairs[id].map(c=>state.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
   let choice=bad?viable.indexOf(false):viable.indexOf(true);
   if(bad&&choice<0)choice=0;
   if(approachRequest&&fromArchive&&!forcedApproach){choice=Number(approachRequest)-1;forcedApproach=true;}
   assert.ok(choice>=0&&choice<3,'Requested legal approach must exist');
   await player.choose(surface.labels[choice]);if(branchType==='approach')branchChosen=true;
  }else if(surface.active&&surface.kind==='sacrifice'){
   await captureNativeSave(context,`victim-${state.dungeonId}-${state.position}-${state.sequence}`);
   const choice=Number(victimRequest||1)-1;await player.choose(surface.labels[choice]);if(branchType==='victim')branchChosen=true;
  }else if(surface.active&&surface.kind==='ending'){
   await player.assertMapOwner(23);
   await captureNativeSave(context,'final-choice');
   await player.choose(surface.labels[variant.includes('destroy')?1:0]);
  }else{
   assert.ok(surface.paused,JSON.stringify(surface));await context.shot(`story-${count}`);await context.input.key('Enter');
  }
 }
 assert.ok(count<350,'Campaign must reach an ending');
 await context.wait(()=>$gameTemp._drylandPersistence?.status==='saved');
 const terminal=await captureNativeSave(context,'terminal');
 assert.equal(terminal.campaign.endingId,bad?'bad':variant.includes('destroy')?'destroy':'reunite');
 await finishCredits(context,player,'first');
 const preserved=await context.read('terminal-file-after-title',id=>StorageManager.loadZip('file'+id),terminal.fileId);
 assert.equal(sha256(preserved),terminal.payloadSha256);
 await context.reopenPage();await player.choose('Continuar');await player.file(terminal.fileId);
 await player.ready();
 assert.equal((await player.snapshot('terminal-after-reopen')).campaign.endingId,terminal.campaign.endingId);
 assert.equal((await player.snapshot('continued-file-id')).fileId,terminal.fileId);
 await finishCredits(context,player,'continued');
 assert.equal(sha256(await context.read('terminal-file-after-continue',id=>StorageManager.loadZip('file'+id),terminal.fileId)),terminal.payloadSha256);
 context.report.observations.push({label:'campaign-result',kind:'journey-result',value:{variant,parent:parent.campaign,terminal:terminal.campaign,fileId:terminal.fileId,terminalPayloadSha256:terminal.payloadSha256}});
}
export async function verify({expected,artifacts,report}){
 const result=report.observations.find(row=>row.kind==='journey-result');
 return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:{result:result?.value,archives:report.observations.filter(o=>o.kind==='native-save-archive')},evidence:artifacts.map(a=>a.path),limits:['Directed player inputs; image inspection and assigned human judgments remain separate.','Three native-frame Title stability is read-only evidence; transition count is combined with IT058.']})),pendingReviews:['Inspect campaign, memorial and credits captures.']};
}
