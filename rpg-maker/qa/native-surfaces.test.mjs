import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';
import { captureNativeSave, sha256 } from './native-save-archive.mjs';
export const sourceFiles=[new URL('./native-player.mjs',import.meta.url),new URL('./native-save-archive.mjs',import.meta.url)];
const variant=process.env.DRYLAND_QA_SURFACE||'native-tavern-controls',large=process.env.DRYLAND_QA_VIEWPORT==='large';
export const scenario={storage:{expectedRef:"planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios"},id:variant,criteria:[{id:'controls',variant,expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md'}],requires:['native-mz','public-input'],audioFormat:'webm',audioSources:{master:{path:'WebAudio._masterGainNode',expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios'}},browser:{width:large?1920:1280,height:large?1080:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',query:'',reducedMotion:process.env.DRYLAND_QA_MOTION==='reduce'?'reduce':'no-preference',timeoutMs:30000}};
export async function execute(context){
 const player=new DirectedNativePlayer(context);
 if(!context.descriptor.storageFixture){await player.choose('Jogar');await context.wait(()=>SceneManager._scene instanceof Scene_File&&!SceneManager._scene.isBusy());await context.input.key('Escape');await player.choicesContaining('Jogar');await context.shot('cancelled-file-title');}
 await player.choose(context.descriptor.storageFixture?'Continuar':'Jogar');await player.file(Number(process.env.DRYLAND_QA_FILE||context.descriptor.nativeArchive?.fileId||1));
 await player.returnToTavern();const before=await player.snapshot('tavern-before');
 const visible=await player.surface();assert.equal(visible.labels.length,11);
 await context.shot('tavern-visible');await context.input.key('Tab');
 await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await context.shot('tavern-hidden');
 await context.input.keyDown('Enter');await context.shot('hidden-held-confirm');await context.input.keyUp('Enter');
 const position=await context.read('hidden-player-position',()=>[$gamePlayer.x,$gamePlayer.y]);
 for(const key of ['ArrowLeft','ArrowRight','Escape'])await context.input.key(key);
 assert.deepEqual(await context.read('hidden-player-after-directions',()=>[$gamePlayer.x,$gamePlayer.y]),position);
 assert.equal(await context.read('no-rpg-menu',()=>SceneManager._scene instanceof Scene_Map),true);
 assert.deepEqual((await player.snapshot('hidden-confirm')).campaign,before.campaign);
 await context.input.key('Tab');await player.returnToTavern();await context.shot('tavern-restored');
 assert.deepEqual((await player.snapshot('restored')).campaign,before.campaign);
 await player.choose('Gorvak',{mouse:true});await player.until('hero');
 const interaction=await context.read('gorvak-map-ownership',()=>({map:$gameMap.mapId(),event:$gameMap._interpreter._eventId,
  ownsList:$gameMap._interpreter._list===$dataMap.events[1].pages[0].list,child:!!$gameMap._interpreter._childInterpreter,
  pictures:$gameScreen._pictures.flatMap((picture,id)=>picture?[id]:[]),bgs:AudioManager._currentBgs?.name}));
 assert.equal(interaction.map,37);assert.equal(interaction.event,1);assert.equal(interaction.ownsList,true);assert.equal(interaction.child,false);
 assert.deepEqual(interaction.pictures,[1,60]);assert.equal(interaction.bgs,'People1');
 await context.shot('gorvak-map-menu');await context.input.key('Escape');await player.returnToTavern();
 assert.deepEqual((await player.snapshot('gorvak-cancel-return')).campaign,before.campaign);
 await player.choose('Gorvak');await player.choose('Conversar');
 const message=await player.ready();assert.ok(message.text.includes('Gorvak'));
 await context.shot('gorvak-native-conversation');
 const modes=await context.read('unread-provider-permission',()=>({disallowed:$gameSystem.isExtendedFastForwardDisallowed(),auto:Boolean($gameTemp.isMessageAutoForwardMode()),fast:Boolean($gameTemp.isExtendedFastForwardMode())}));
 assert.deepEqual(modes,{disallowed:true,auto:false,fast:false});
 assert.deepEqual(await context.read('reading-console-buttons',()=>SceneManager._scene._messageWindow._buttonConsoleButtons.filter(button=>button.worldVisible).map(button=>button._type)),['fastfwd','options','hide']);
 await consoleClick(context,player,'fastfwd');
 assert.deepEqual(await player.surface(),message,'Disabled unread controls must not advance.');
 await consoleClick(context,player,'options');
 await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
 await context.shot('conversation-options');await context.input.key('Escape');await player.ready();
 assert.equal((await player.surface()).text,message.text);assert.deepEqual((await player.snapshot('options-restored')).campaign,before.campaign);
 await player.until('hero');assert.equal((await player.surface()).map,37);
 assert.deepEqual((await player.snapshot('gorvak-talk-observational')).campaign,before.campaign);
 await player.returnToTavern();
 const heroes=['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
 for(const [index,name] of heroes.entries()){
  await player.choose(name,{mouse:index===0});await player.until('hero');
  await player.assertMapOwner(37+index);await context.shot(`hero-${index+1}-menu`);
  await player.choose('Conversar');await player.ready();
  await context.shot(`hero-${index+1}-profile`);
  if(index>0)assert.equal(await context.read('new-hero-unread',()=>$gameSystem.isExtendedFastForwardDisallowed()&&!$gameTemp.isMessageAutoForwardMode()&&!$gameTemp.isExtendedFastForwardMode()),true);
  if(index>0){
   for(let boxes=0;boxes<8;boxes++){
    const unit=await context.read('hero-reading-unit',()=>$gameMap._interpreter._drylandObservedUnit);
    if(unit===83+index*4)break;
    assert.equal(unit,82+index*4);
    await context.input.key('Enter');await player.ready();
   }
   assert.equal(await context.read('hero-dialogue-unit',()=>$gameMap._interpreter._drylandObservedUnit),83+index*4);
   await player.assertMapOwner(37+index);await context.shot(`hero-${index+1}-conversation`);
  }
  if(index===0){
   assert.equal(await context.read('reread-allowed',()=>$gameSystem.isExtendedFastForwardDisallowed()),false);
   await player.dialogueControls('gorvak-reread',[60]);
   await consoleClick(context,player,'fastfwd');
   await fastProgress(context);
  }
  await player.returnToTavern();
  const read=(await player.snapshot(`hero-${index+1}-completed`)).readUnits;
  assert.ok(read.includes(82+index*4)&&read.includes(83+index*4));
 }
 await player.choose('Gorvak');await player.choose('Conversar');await player.ready();
 await consoleClick(context,player,'fastfwd');await fastProgress(context);
 await context.shot('fast-only-reread');await player.returnToTavern();
 assert.equal(await context.read('choice-provider-reset',()=>$gameTemp.isExtendedFastForwardMode()||$gameTemp.isMessageAutoForwardMode()),false);
 await player.choose('Elenco');await player.until('roster');await context.shot('all-eight-roster');await player.choose('Fechar');
 await player.choose('Destinos');await player.until('destinations');await context.shot('available-and-locked-routes');await context.input.key('Escape');await player.returnToTavern();
 await context.audio.start('tavern-rendered-audio','master');
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);
 const point=await context.read('restore-point',()=>{const r=Graphics._canvas.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/3};});
 await player.click(point.x,point.y);await player.returnToTavern();await context.audio.stop();
 await captureNativeSave(context,'earned-tavern-prefix');
 if(process.env.DRYLAND_QA_FILES==='1'){
  for(const name of ['Gorvak','Elowen','Griznik']){await player.choose(name);await player.choose('Selecionar');await player.returnToTavern();}
  const full=(await player.snapshot('full-party')).campaign;await player.choose('Seraphina');await player.choose('Selecionar');await player.returnToTavern();assert.deepEqual((await player.snapshot('full-party-rejected')).campaign,full);
  await player.choose('Gorvak');await player.choose('Retirar do grupo');await player.until('hero');
  assert.equal((await player.snapshot('gorvak-removed')).campaign.draftPartyIds.includes('H1'),false);
  await player.returnToTavern();await player.choose('Seraphina');await player.choose('Selecionar');await player.returnToTavern();
  const withoutGorvak=(await player.snapshot('full-without-gorvak')).campaign;
  await player.choose('Gorvak',{mouse:true});await player.choose('Selecionar',{mouse:true});await player.ready();
  assert.match((await player.surface()).text,/Já tem três com você/);await context.shot('gorvak-full-party');
  await player.until('hero');assert.deepEqual((await player.snapshot('gorvak-full-rejected')).campaign,withoutGorvak);
  await player.returnToTavern();await player.choose('Seraphina');await player.choose('Retirar do grupo');await player.returnToTavern();
  await player.choose('Gorvak');await player.choose('Selecionar');await player.until('hero');
  assert.equal((await player.snapshot('gorvak-selected')).campaign.draftPartyIds.includes('H1'),true);
  await context.shot('gorvak-selected-menu');await player.returnToTavern();
  await player.choose('Elowen');await player.choose('Retirar do grupo');await player.returnToTavern();assert.equal((await player.snapshot('removed-hero')).campaign.draftPartyIds.length,2);await player.choose('Elowen');await player.choose('Selecionar');await player.returnToTavern();
  await player.choose('Destinos');const routes=await player.until('destinations');await player.choose(routes.labels[0]);await player.choose('Partir');await player.until('approaches');
  const a=await captureNativeSave(context,'campaign-a');assert.ok(a.nativeState.readUnits.includes(83));
  await context.reopenPage();await player.choose('Novo jogo');
  await context.wait(()=>SceneManager._scene instanceof Scene_File&&!SceneManager._scene.isBusy());
  await context.shot('occupied-file-selector');await context.input.key('Escape');await player.choicesContaining('Continuar');
  assert.equal(sha256(await context.read('a-after-cancel',id=>StorageManager.loadZip('file'+id),a.fileId)),a.payloadSha256);
  await player.choose('Novo jogo');
  await player.file(2);await player.returnToTavern();
  const b=await player.snapshot('campaign-b-fresh');assert.equal(b.fileId,2);assert.ok(!b.readUnits.includes(83));assert.notEqual(b.campaign.seed,a.campaign.seed);
  assert.equal(sha256(await context.read('a-preserved-after-b',id=>StorageManager.loadZip('file'+id),a.fileId)),a.payloadSha256);
  const bSave=await captureNativeSave(context,'campaign-b');await context.reopenPage();await player.choose('Continuar');await player.file(a.fileId);await player.ready();
  const restored=await player.snapshot('campaign-a-restored');assert.equal(restored.fileId,a.fileId);assert.deepEqual(restored.campaign,a.campaign);assert.ok(restored.readUnits.includes(83));await player.until('approaches');
  await context.reopenPage();await player.choose('Continuar');await player.file(2);await player.ready();assert.deepEqual((await player.snapshot('campaign-b-restored')).campaign,bSave.campaign);assert.ok(!(await player.snapshot('campaign-b-reading')).readUnits.includes(83));
 }

 context.report.observations.push({label:'surface-result',kind:'surface-result',value:{variant,before:before.campaign,modes}});
}
export async function verify({expected,artifacts,report}){
 const result=report.observations.find(row=>row.kind==='surface-result');
 return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['This surface checks a fresh tavern prefix; remaining variants belong to the planned task16 lots.']})),pendingReviews:['Inspect HIDE/restoration and native conversation captures.']};
}

async function consoleClick(context,player,type){
 const point=await context.read('console-'+type,value=>{
  const button=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type===value);
  if(!button?.worldVisible)throw Error('Console button not visible: '+value);
  const bounds=button.getBounds(),rect=Graphics._canvas.getBoundingClientRect();
  return{x:rect.x+(bounds.x+bounds.width/2)*rect.width/Graphics.width,y:rect.y+(bounds.y+bounds.height/2)*rect.height/Graphics.height};
 },type);await player.click(point.x,point.y);
}

async function fastProgress(context) {
 const progress=await context.read('gorvak-fast-progress',async()=>{
  const samples=[];
  for(let frame=0;frame<120;frame++){
   const sample={text:$gameMessage.allText(),unit:$gameMap._interpreter._drylandObservedUnit,
    fast:Boolean($gameTemp.isExtendedFastForwardMode()),disallowed:$gameSystem.isExtendedFastForwardDisallowed()};
   samples.push(sample);
   if(sample.fast||sample.unit===83)return samples;
   await new Promise(resolve=>requestAnimationFrame(resolve));
  }
  return samples;
 });
 assert.ok(progress.some(sample=>sample.fast||sample.unit===83),'FAST must activate or finish the two-box profile before the next unit resets it: '+JSON.stringify(progress.at(-1)));
}
