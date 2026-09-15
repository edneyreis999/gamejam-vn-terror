import { selectFile } from '../helpers/native-chrome.mjs';
import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, installFixture, pause, rosterFixture, tavern } from '../helpers/formation.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { frames } from '../helpers/closing-presentation.mjs';
import { assertHiddenPictures, click, clickConsole, entry, hidden, installPhase, state } from '../helpers/native-shared.mjs';
import { appendEnsemble, ensembleFixture, prepareBustFixture } from '../helpers/native-bust-fixture.mjs';
import { openChrome, startServer } from '../helpers/native-chrome.mjs';
import { councilState, installClosing } from '../helpers/closing.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
const fixtures=phaseFixtures();
const evidence=id=>`docs/qa/evidence/init-rpg-maker-mz/task-11/${id}`;
async function hold(browser,key,keyCode){await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:keyCode});}
async function release(browser,key,keyCode){await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:keyCode});await frames(browser,3);}
canonicalCase('IT-038','native Options and consultations cannot carry held confirmation into the background story or party',{timeout:120000},async t=>{
 const browser=await entry(t);await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);const intro=await state(browser);
 await clickConsole(browser,'options');await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await hold(browser,'Enter',13);await frames(browser,35);assert.deepEqual(await state(browser),intro);
 for(let step=0;step<4&&await browser.evaluate("SceneManager._scene.constructor.name==='Scene_Options'");step++)await browser.press('Escape',27);
 await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await frames(browser,40);
 assert.deepEqual(await state(browser),intro);await release(browser,'Enter',13);
 await installPhase(browser,fixtures.formation);
 for(const [kind,index,closeIndex]of [['destinations',8,3],['roster',9,0]]){
  await activate(browser,'formation',index);await choices(browser,kind);
  for(let step=0;step<closeIndex;step++)await browser.press('ArrowDown',40);
  const before=await state(browser);await hold(browser,'Enter',13);await choices(browser,'formation');await frames(browser,40);
  assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('$gameMessage.hasText()'),false);await release(browser,'Enter',13);
 }
});
canonicalCase('IT-050','upper encounter utilities use mouse and keyboard, suspend during text and HIDE, and retain focus after return',{timeout:180000},async t=>{
 const browser=await tavern(t);await installPhase(browser,fixtures.encounter_choice);await choices(browser,'approaches');
 const before=await state(browser);
 const bounds=await browser.evaluate(`[41,42,50,51,52].map(id=>{const b=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id).getBounds();return {id,x:b.x,y:b.y,w:b.width,h:b.height}})`);
 for(const b of bounds){assert.ok(b.x>=0&&b.x+b.w<=1280&&b.y>=0&&b.y+b.h<=720,JSON.stringify(b));if(b.id<50)assert.ok(b.y+b.h<230);else assert.ok(b.y>230);}
 await click(browser,920,128);await pause(browser);assert.deepEqual(await state(browser),before);
 assert.equal(await browser.evaluate('$gameScreen.picture(41)==null&&$gameScreen.picture(42)==null'),true);
 await browser.press('Tab',9);await hidden(browser,true);await click(browser,1150,128);await hidden(browser,false);assert.deepEqual(await state(browser),before);
 await browser.press('Enter',13);await choices(browser,'approaches');assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),3);
 await click(browser,1150,128);await choices(browser,'retreat');await activate(browser,'retreat',1);await choices(browser,'approaches');
 assert.deepEqual((await state(browser)).partyIds,before.partyIds);assert.equal((await state(browser)).phase,'encounter_choice');
 await activate(browser,'approaches',3);await pause(browser);const reread=await state(browser);await browser.press('Enter',13);await choices(browser,'approaches');assert.deepEqual(await state(browser),reread);
 await activate(browser,'approaches',4);await choices(browser,'retreat');await activate(browser,'retreat',1);await choices(browser,'approaches');
 await browser.press('Tab',9);await hidden(browser,true);await assertHiddenPictures(browser,[41,42]);const still=await state(browser);
 await click(browser,920,128);await hidden(browser,false);assert.deepEqual(await state(browser),still);await choices(browser,'approaches');
 await browser.screenshot(`${evidence('IT-050')}/upper-utilities.png`);

});

canonicalCase('IT-064','native interruption stops queued commands without erasing independent pictures',{timeout:180000},async t=>{
 const browser=await tavern(t);
 // Hold the real interpreter immediately after a selected native effect, while
 // the native picture clock remains live. This is an interruption fixture.
 await browser.evaluate(`window.holdDialogueAfter=null;window.dialogueHeld=null;window.cancelledMapLoop=false;
  const update=Game_Map.prototype.updateInterpreter;Game_Map.prototype.updateInterpreter=function(){if(!cancelledMapLoop)update.call(this);};
  const native=Game_Interpreter.prototype.command357;
  Game_Interpreter.prototype.command357=function(p){const result=native.call(this,p);if(result&&p[0]==='VisuMZ_2_VNPictureBusts'&&p[1]===holdDialogueAfter){dialogueHeld=this;holdDialogueAfter=null;}return result;};
  const erase=Game_Interpreter.prototype.command235;
  Game_Interpreter.prototype.command235=function(p){const result=erase.call(this,p);if(result&&p[0]===60&&holdDialogueAfter==='ErasePicture'){dialogueHeld=this;holdDialogueAfter=null;}return result;};
  const execute=Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand=function(){return dialogueHeld===this?false:execute.call(this);};`);
 for(const reduced of [false,true])for(const stage of ['active','focus','exit']){
  await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});
  await browser.evaluate('dialogueHeld=null;holdDialogueAfter=null;cancelledMapLoop=false;');
  await installPhase(browser,fixtures.formation);await choices(browser,'formation');
  await activate(browser,'formation',1);await activate(browser,'hero',0);await pause(browser);
  const before=await state(browser);
  if(stage!=='active'){
   const operation=stage==='focus'?'Tone_CustomToneBust':'ErasePicture';
   await browser.evaluate(`holdDialogueAfter=${JSON.stringify(operation)};`);
   for(let box=0;box<12;box++){
    await browser.waitFor('Boolean(dialogueHeld)||SceneManager._scene._choiceListWindow?.isOpenAndActive()||($gameMessage.hasText()&&SceneManager._scene._messageWindow?.pause&&SceneManager._scene._messageWindow._waitCount===0)');
    if(await browser.evaluate('Boolean(dialogueHeld)'))break;
    if(await browser.evaluate('SceneManager._scene._choiceListWindow?.isOpenAndActive()')){
     assert.equal(stage,'exit','Focus effect must execute before the conversation returns to its menu');
     await activate(browser,'hero',2);
     break;
    }
    await browser.press('Enter',13);
   }
   await browser.waitFor('Boolean(dialogueHeld)');
  }
  const queued=await browser.evaluate(`(()=>{
   window.cancelledDialogue=[];for(let i=$gameMap._interpreter;i;i=i._childInterpreter)cancelledDialogue.push(i);
   $gameScreen.showPicture(18,'Dryland_H2',0,20,30,10,10,255,0);
   const background=$gameScreen.picture(1).name(),hadQueuedEffect=!!dialogueHeld;
   cancelledMapLoop=true;$gameMap._interpreter.clear();$gameMessage.clear();dialogueHeld=null;
   return {background,hadQueuedEffect};
  })()`);
  assert.equal(queued.hadQueuedEffect,stage!=='active');
  if(stage==='exit'){
   assert.equal(await browser.evaluate('$gameScreen.picture(60)==null'),true);
   assert.equal(await browser.evaluate('$gameScreen.picture(63)==null'),true);
   assert.equal(await browser.evaluate('$gameMap.mapId()'),38,'Cancellation stops the queued return transfer');
  }
  const imageNames=await browser.evaluate('[60,61,62,63,64,65].map(id=>$gameScreen.picture(id)?.name()||null)');
  await frames(browser,45);
  assert.equal(await browser.evaluate('!$gameMap._interpreter.isRunning()&&!$gameMap._interpreter._childInterpreter'),true);
  assert.deepEqual(await browser.evaluate('[60,61,62,63,64,65].map(id=>$gameScreen.picture(id)?.name()||null)'),imageNames,'Native cancellation does not erase the saved screen');
  assert.equal(await browser.evaluate('$gameScreen.picture(18).name()'),'Dryland_H2');
  assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'),queued.background);
  assert.deepEqual(await state(browser),before);
  await browser.screenshot(`${evidence('IT-064')}/${stage}-${reduced?'reduced':'normal'}-cancelled.png`);
 }
});

canonicalCase('IT-080','migrated hero visits transfer to their own map and cancel or reject stale entry without campaign changes',{timeout:180000},async t=>{
 const browser=await tavern(t);
 const ambience=()=>browser.evaluate('({name:AudioManager._currentBgs?.name,start:AudioManager._bgsBuffer?._startTime,playing:AudioManager._bgsBuffer?.isPlaying()})');
 const tavernAmbience=await ambience();
 assert.equal(tavernAmbience.name,'People1');assert.equal(tavernAmbience.playing,true);
 const interpreterMaps=()=>browser.evaluate(`(()=>{const maps=[];for(let i=$gameMap._interpreter;i;i=i._childInterpreter)maps.push(i._mapId);return maps})()`);
 await browser.evaluate(`window.staleHeroTransfers=[];
  const setup=Game_Map.prototype.setup;Game_Map.prototype.setup=function(id){staleHeroTransfers.push(id);return setup.call(this,id);};`);
 for(const [heroIndex,mapId] of [[0,37],[1,38],[2,39],[3,40],[4,41],[5,42],[6,43],[7,44]]) {
 await installFixture(browser,rosterFixture([]));
 const before=await state(browser);
 await activate(browser,'formation',heroIndex);await choices(browser,'hero');
 assert.equal(await browser.evaluate('$gameMap.mapId()'),mapId);
 assert.deepEqual(await browser.evaluate(`SceneManager._scene._choiceListWindow._list.map(item=>SceneManager._scene._choiceListWindow.convertEscapeCharacters(item.name).replace(/<[^>]*>/g,'').replace(/\\x1b[A-Za-z]+\\[[^\\]]*\\]/g,'').replace(/\\s+/g,' ').trim())`),['Conversar','Selecionar','Voltar à taverna']);
 assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.maxItems()'),3);
 assert.deepEqual(await interpreterMaps(),[mapId],'The source interpreter is replaced by the destination map root before its menu');
 assert.deepEqual(await ambience(),tavernAmbience,'Entering the child map keeps the playing ambience start time');
 assert.deepEqual(await state(browser),before,'Opening the map is observational');
 await browser.press('Escape',27);await choices(browser,'formation');
 assert.equal(await browser.evaluate('$gameMap.mapId()'),3);
 assert.equal(await browser.evaluate('$gameMessage._drylandChoiceFocus.key'),'formation');
 assert.equal(await browser.evaluate('$gameMessage.choices().length'),11);
 assert.deepEqual([...new Set(await interpreterMaps())],[3],'Return leaves no hero-map interpreter in the native chain');
 assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),heroIndex,'Return restores the chosen tavern portrait');
 assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'),'Dryland_Taverna');
 assert.deepEqual(await ambience(),tavernAmbience,'Returning does not restart the tavern ambience');
 assert.deepEqual(await state(browser),before,'Canceling the interaction does not mutate campaign state');
 // Isolated stale-entry fixture: the native guard must reject a dead hero even
 // if a transfer is already pending. Ordinary tavern UI never exposes it here.
 await installFixture(browser,rosterFixture([`H${heroIndex+1}`]));
 const dead=await state(browser);
 assert.equal(await browser.evaluate(`$gameSwitches.value(${21+heroIndex})`),false);
 await browser.evaluate(`staleHeroTransfers=[];
  $gameMessage.clear();
  $gameMap._interpreter.setup([{code:201,indent:0,parameters:[0,${mapId},10,7,2,2]},{code:115,indent:0,parameters:[]},{code:0,indent:0,parameters:[]}],0);
  SceneManager.goto(Scene_Map);`);
 await browser.waitFor('staleHeroTransfers.length===2');
 await choices(browser,'formation');
 assert.deepEqual(await browser.evaluate('staleHeroTransfers'),[mapId,3]);
 assert.deepEqual(await state(browser),dead);
 assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'),[],'Rejected entry executes no hero reading unit');
 }
 assert.deepEqual(browser.exceptions,[]);
});

canonicalCase('IT-065','installed FAST completes authored Council units and revokes at unseen text and the final choice',{timeout:180000},async t=>{
 const browser=await tavern(t), prepared=structuredClone(councilState('collective'));
 prepared.seenPassageIds=[...new Set([...prepared.seenPassageIds,prepared.reading.passageIds[0]])];
 await installClosing(browser,prepared);await pause(browser);
 assert.equal(await browser.evaluate('$gameSystem.isExtendedFastForwardDisallowed()'),false);
 assert.equal(await browser.evaluate('$gameTemp.isExtendedFastForwardMode()'),false);
 const before=await state(browser);
 await clickConsole(browser,'fastFwd');
 await browser.waitFor(`$gameSystem._dryland.campaign.sequence===${before.sequence+1}`);await pause(browser);
 let after=await state(browser);
 assert.equal(after.history.at(-1).type,'COMPLETE_PASSAGE');
 assert.equal(await browser.evaluate('$gameSystem.isExtendedFastForwardDisallowed()'),true);
 assert.equal(await browser.evaluate('$gameTemp.isExtendedFastForwardMode()||$gameTemp.isMessageAutoForwardMode()'),false);
 await clickConsole(browser,'fastFwd');await frames(browser,20);
 assert.deepEqual(await state(browser),after);
 await browser.screenshot(`${evidence('IT-065')}/fast-to-unseen.png`);
 // Isolated, explicitly pre-read Council fixture; each new unit still needs a player selection.
 const all=structuredClone(councilState('collective'));
 const {finishReading}=await import('../helpers/campaign.mjs');
 all.seenPassageIds=finishReading(structuredClone(all)).seenPassageIds;
 await installClosing(browser,all);
 for(let unit=0;unit<20&&(await state(browser)).phase==='council';unit++){
  await pause(browser);const current=await state(browser);
  assert.equal(await browser.evaluate('$gameTemp.isExtendedFastForwardMode()'),false);
  assert.equal(await browser.evaluate('$gameSystem.isExtendedFastForwardDisallowed()'),false);
  await clickConsole(browser,'fastFwd');
  await browser.waitFor(`$gameSystem._dryland.campaign.sequence>${current.sequence}`);
 }
 await choices(browser,'ending');after=await state(browser);
 assert.equal(after.phase,'final_choice');
 assert.equal(await browser.evaluate('$gameSystem.isExtendedFastForwardDisallowed()&&!$gameTemp.isExtendedFastForwardMode()&&!$gameTemp.isMessageAutoForwardMode()'),true);
 assert.equal(after.history.some(a=>a.type==='SKIP_SEEN_TEXT'),false);
 assert.deepEqual(after.deadHeroIds,all.deadHeroIds);
 await browser.screenshot(`${evidence('IT-065')}/fast-to-choice.png`);
});

canonicalCase('IT-068','the authored 2x2 fixture uses native calls, individual focus, HIDE and clean exit/repeat',{timeout:180000},async t=>{
 const prepared=await prepareBustFixture(t,'fixture-native-2x2-20260911',appendEnsemble);
 await startServer(t,prepared.directory);const browser=await openChrome(t);
 await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);await installClosing(browser,councilState());await pause(browser);
 // Prepared integration input: disable only new map autoruns, then run the
 // authored native common event on the real map interpreter. No story commit.
 await browser.evaluate('Game_Map.prototype.setupStartingEvent=function(){return false;};$gameMap._interpreter.clear();SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();ImageManager.clear();');
 const before=await state(browser),observations=[],temporal=[];
 await browser.evaluate('delete $gameTemp._drylandLastRejection;$gameVariables.setValue(24,"");');
 const expected=[{id:60,name:'Dryland_H1',x:210},{id:61,name:'Dryland_H2',x:470},{id:63,name:'Dryland_ivai',x:810},{id:64,name:'Dryland_perola',x:1100}];
 const composition=()=>browser.evaluate(`[60,61,63,64].map(id=>{const p=$gameScreen.picture(id);return {id,name:p?.name(),x:p?.x(),y:p?.y(),scale:p?.scaleX(),tone:p?.tone()}})`);
 for(const reduced of [false,true]){
  await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});
  if(reduced)await browser.call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
  for(const cache of ['cold','warm']){
   if(cache==='cold')await browser.evaluate('ImageManager.clear();');
   await browser.waitFor('SceneManager._scene._messageWindow.isClosed()&&SceneManager._scene._messageWindow._waitCount===0');
   await browser.evaluate(`$gameMap._interpreter.setup([{code:117,indent:0,parameters:[${prepared.result}]},{code:0,indent:0,parameters:[]}],0);`);
   const variant=`${reduced?'reduced':'normal'}-${cache}`;let previous;
   async function captureTransition(label){
    for(let sample=0;sample<3;sample++){
     const file=`${evidence('IT-068')}/${variant}/temporal-${label}-${sample}.png`;
     temporal.push({variant,label,sample,frame:await browser.evaluate('Graphics.frameCount'),pictures:await composition(),file});
     await browser.screenshot(file);await frames(browser,5);
    }
   }
   await captureTransition('entry');
   for(const [index,line]of ensembleFixture.transcript.entries()){
    await browser.waitFor(`$gameMessage.allText()===${JSON.stringify(line.text)}&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0&&[60,61,63,64].every(id=>{const p=$gameScreen.picture(id);return p&&p._duration===0&&p._toneDuration===0})`);
    const actual=await composition();
    for(const [i,row]of expected.entries()){
     const active=row.id===line.slot,p=actual[i];assert.equal(p.name,row.name);
     assert.equal(p.x,row.x+(active?0:row.id<63?-16:16));assert.equal(p.y,650);
     assert.ok(Math.abs(p.scale-(active?60:54))<.001,JSON.stringify(p));
     assert.deepEqual(p.tone,active?[0,0,0,0]:[-24,-24,-24,0]);
    }
    if(index===4)assert.deepEqual(actual,previous,'Repeated same speaker has identical settled focus');

    previous=actual;observations.push({variant,index,actual});
    const folder=`${evidence('IT-068')}/${variant}`;await browser.screenshot(`${folder}/focus-${line.slot}-${index}.png`);
    if(index===2){
     await browser.press('Tab',9);await hidden(browser,true);
     assert.deepEqual(await composition(),actual);assert.deepEqual(await state(browser),before);
     assert.equal(await browser.evaluate('[60,61,63,64].every(id=>SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id).worldVisible)'),true);
     await browser.screenshot(`${folder}/hide.png`);await browser.press('Tab',9);await hidden(browser,false);
     assert.equal(await browser.evaluate('$gameMessage.allText()'),line.text);assert.deepEqual(await composition(),actual);
    }
    await browser.press('Enter',13);
    if(index===0||index===4)await captureTransition(index===0?'focus':'exit');
   }
   await browser.waitFor('!$gameMap._interpreter.isRunning()&&[60,61,62,63,64,65].every(id=>!$gameScreen.picture(id))');
   await frames(browser,30);assert.deepEqual(await state(browser),before);
   await browser.screenshot(`${evidence('IT-068')}/${variant}/exited.png`);
  }
 }
 await writeFile(`${evidence('IT-068')}/composition.json`,JSON.stringify({kind:'labeled native integration fixture',observations,temporal},null,2)+'\n');
 assert.deepEqual(browser.exceptions,[]);
});

canonicalCase('IT-077','FAST-only console executes native text and waits, with completed-unit identity and lifecycle resets',{timeout:180000},async t=>{
 const prepared=await prepareBustFixture(t,'reading-provider-20260912',events=>{
  const id=events.length,c=(code,parameters=[])=>({code,indent:0,parameters});
  const presentation=name=>c(357,['Dryland_Presentation',name,name,{}]);
  events.push({id,name:'Fixture técnica — unidade de leitura',trigger:0,switchId:1,list:[
   presentation('ObservationBegin'),c(122,[145,145,0,0,0]),
   c(101,['',0,0,2,'']),c(401,['Primeira.']),c(230,[120]),c(122,[145,145,1,0,1]),
   c(101,['',0,0,2,'']),c(401,['Última.']),presentation('ObservationComplete'),c(0)
  ]});return id;
 });
 await startServer(t,prepared.directory);const browser=await openChrome(t);
 await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
 // Prepared isolated native interpreter: no campaign transition is invoked.
 await browser.evaluate('Game_Map.prototype.setupStartingEvent=function(){return false;};$gameMap._interpreter.clear();SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();');
 await browser.waitFor('SceneManager._scene._messageWindow.isClosed()');
 const before=await state(browser),id=prepared.result;
 const explicitUnit=82;
 const explicitList=await browser.evaluate(`(()=>{
  const list=structuredClone($dataCommonEvents[${id}].list);
  const begin=list.find(command=>command.code===357&&command.parameters[1]==='ObservationBegin');
  begin.parameters[3]={unit:${JSON.stringify(String(explicitUnit))}};
  return list;
 })()`);
 async function beginList(list,eventId=0){
  await browser.waitFor('!$gameMap._interpreter.isRunning()&&!$gameMessage.isBusy()');
  await browser.evaluate(`$gameMap._interpreter.setup(${JSON.stringify(list)},${eventId});`);
  await pause(browser);
  await browser.waitFor('SceneManager._scene._messageWindow.isOpen()');
 }
 async function begin(){
  await browser.waitFor('!$gameMap._interpreter.isRunning()&&!$gameMessage.isBusy()');
  await browser.evaluate(`$gameMap._interpreter.setup($dataCommonEvents[${id}].list,0);`);
  await pause(browser);
  await browser.waitFor('SceneManager._scene._messageWindow.isOpen()');
 }
 async function beginExplicit(){await beginList(explicitList,1);}
 const modes=()=>browser.evaluate('({blocked:$gameSystem.isExtendedFastForwardDisallowed(),auto:Boolean($gameTemp.isMessageAutoForwardMode()),fast:Boolean($gameTemp.isExtendedFastForwardMode())})');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${explicitUnit})`),false);
 await beginExplicit();
 assert.equal(await browser.evaluate('Boolean($gameMap._interpreter._drylandCommonEventId)'),false,'Map-authored clone has no Common Event identity');
 await browser.evaluate('$gameMap._interpreter.clear();SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();');
 await browser.waitFor('SceneManager._scene._messageWindow.isClosed()');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${explicitUnit})`),false,'Partial explicit-unit cancellation never marks a unit read');
 await beginExplicit();await browser.press('Enter',13);
 await browser.waitFor("$gameMessage.allText()==='Última.'&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0");
 await browser.press('Enter',13);await browser.waitFor('!$gameMap._interpreter.isRunning()');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.filter(i=>i===${explicitUnit}).length`),1,'Explicit map unit completes once');
 await beginExplicit();
 assert.deepEqual(await modes(),{blocked:false,auto:false,fast:false});
 await clickConsole(browser,'fastFwd');await browser.waitFor('!$gameMap._interpreter.isRunning()');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.filter(i=>i===${explicitUnit}).length`),1,'FAST reread does not duplicate explicit map unit');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${id})`),false,'Explicit map unit does not consume implicit Common Event identity');
 await begin();assert.deepEqual(await modes(),{blocked:true,auto:false,fast:false});
 assert.deepEqual(await browser.evaluate('SceneManager._scene._messageWindow._buttonConsoleButtons.filter(button=>button.worldVisible).map(button=>button._type)'),['fastfwd','options','hide']);
 await browser.screenshot(`${evidence('IT-077')}/fast-only-unread.png`);
 await clickConsole(browser,'fastFwd');await frames(browser,20);
 assert.deepEqual(await modes(),{blocked:true,auto:false,fast:false});
 await browser.evaluate('$gameMap._interpreter.clear();SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();');
 await browser.waitFor('SceneManager._scene._messageWindow.isClosed()');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${id})`),false,'Partial cancellation never marks a unit read');
 await begin();await browser.press('Enter',13);
 await browser.waitFor("$gameMessage.allText()==='Última.'&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0");
 assert.equal(await browser.evaluate('$gameVariables.value(145)'),1);
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${id})`),false);
 await browser.press('Enter',13);await browser.waitFor('!$gameMap._interpreter.isRunning()');
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.filter(i=>i===${id}).length`),1);
 await begin();await clickConsole(browser,'options');
 await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 assert.deepEqual(await modes(),{blocked:false,auto:false,fast:false});
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await pause(browser);
 assert.deepEqual(await modes(),{blocked:false,auto:false,fast:false});
 const start=await browser.evaluate('Graphics.frameCount');await clickConsole(browser,'fastFwd');
 await browser.waitFor('!$gameMap._interpreter.isRunning()');
 const elapsed=await browser.evaluate('Graphics.frameCount')-start;
 assert.ok(elapsed<120,`FAST should accelerate the native 120-frame wait: ${elapsed}`);
 assert.equal(await browser.evaluate('$gameVariables.value(145)'),1);
 assert.deepEqual(await modes(),{blocked:true,auto:false,fast:false});
 assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.filter(i=>i===${id}).length`),1);
 assert.deepEqual(await state(browser),before);
 // Native serialization fixture. Actual multiple-slot selection is owned by task 11.
 const saved=await browser.evaluate('DataManager.saveGame($gameSystem.savefileId()).then(()=>({file:$gameSystem.savefileId(),history:[...$gameSystem._drylandReadUnits]}))');
 await begin();await clickConsole(browser,'fastFwd');assert.equal((await modes()).fast,true);
 await browser.evaluate(`DataManager.loadGame(${saved.file})`);
 assert.deepEqual(await modes(),{blocked:true,auto:false,fast:false});
 assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'),saved.history);
 await browser.evaluate('DataManager.setupNewGame();');
 assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'),[]);
 assert.deepEqual(await modes(),{blocked:true,auto:false,fast:false});
 await browser.evaluate(`DataManager.loadGame(${saved.file})`);
 assert.deepEqual(await browser.evaluate('$gameSystem._drylandReadUnits'),saved.history);
 assert.deepEqual(await state(browser),before);
 await browser.screenshot(`${evidence('IT-077')}/completed-provider-unit.png`);
 assert.deepEqual(browser.exceptions,[]);
});

canonicalCase('IT-078','native VN startup and named HIDE bindings preserve appearance across desktop sizes motion and real browser zoom',{timeout:180000},async t=>{
 const prepared=await prepareBustFixture(t,'interface-bindings-20260912',events=>{
  const id=events.length,c=(code,parameters=[])=>({code,indent:0,parameters});
  events.push({id,name:'Fixture técnica — elementos nomeados',trigger:0,switchId:1,list:[
   c(231,[97,'Dryland_Button',0,0,400,100,100,100,83,0]),
   c(357,['Dryland_Presentation','BindInterfacePicture','Identificar imagem de interface',{picture:'97',name:'Controle de teste'}]),
   c(231,[30,'Dryland_Tag',0,0,100,100,100,100,117,0]),
   c(101,['',0,0,2,'']),c(401,['A interface deve voltar com a mesma aparência.']),c(0)
  ]});return id;
 });
 await startServer(t,prepared.directory);const observations=[];
 await mkdir(evidence('IT-078'),{recursive:true});
 for(const variant of [{width:1280,height:720,reduced:false,zoom:1},{width:1920,height:1080,reduced:true,zoom:1},{width:1920,height:1080,reduced:false,zoom:1.1},{width:1920,height:1080,reduced:true,zoom:1.1}]){
  await t.test(JSON.stringify(variant),async t=>{
   const browser=await openChrome(t,variant);
   await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
   const screen=await browser.evaluate('({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,scale:visualViewport.scale,canvas:Graphics.app.view.getBoundingClientRect().toJSON(),motion:matchMedia("(prefers-reduced-motion: reduce)").matches})');
   assert.ok(screen.width>=1280&&screen.height>=720,JSON.stringify(screen));
   assert.ok(Math.abs(screen.dpr-variant.zoom)<.01,`Real browser zoom: ${JSON.stringify(screen)}`);
   assert.equal(screen.scale,1,'Browser zoom is distinct from visual-viewport pinch scaling');
   assert.equal(screen.motion,variant.reduced);
   await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
   assert.equal(await browser.evaluate('$gameSystem.isMenuEnabled()'),false,'Native startup command disables menu in ordinary sessions');
   assert.equal(await browser.evaluate('$gamePlayer.canMove()'),false);
   const before=await state(browser),position=await browser.evaluate('[$gamePlayer.x,$gamePlayer.y]');
   await hold(browser,'ArrowRight',39);await frames(browser,30);await release(browser,'ArrowRight',39);
   assert.deepEqual(await browser.evaluate('[$gamePlayer.x,$gamePlayer.y]'),position);
   await hold(browser,'Enter',13);await frames(browser,35);
   assert.equal(await browser.evaluate('SceneManager._scene.isFastForward()'),false);
   assert.equal((await state(browser)).sequence,before.sequence+1,'Held confirmation completes only the current manual unit');
   await release(browser,'Enter',13);await pause(browser);
   await browser.evaluate('Game_Map.prototype.setupStartingEvent=function(){return false;};$gameMap._interpreter.clear();SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();');
   await browser.waitFor('SceneManager._scene._messageWindow.isClosed()');
   await browser.evaluate(`$gameMap._interpreter.setup($dataCommonEvents[${prepared.result}].list,0);`);
   await browser.waitFor('$gameMessage.hasText()&&SceneManager._scene._messageWindow.isOpen()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0');const reading=await state(browser);
   const appearance=()=>browser.evaluate('[30,97].map(id=>{const p=$gameScreen.picture(id),s=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id);return {id,opacity:p.opacity(),visible:s.visible,worldVisible:s.worldVisible,alpha:s.alpha,renderable:s.renderable,ready:s.bitmap?.isReady(),bounds:s.getBounds().toJSON?.()||{x:s.x,y:s.y,width:s.width,height:s.height},name:p.name(),x:p.x(),y:p.y()}})');
   const shown=await appearance();
   await browser.screenshot(`${evidence('IT-078')}/${variant.width}-${variant.reduced}-${variant.zoom}-shown.png`);
   await browser.press('Tab',9);await hidden(browser,true);
   const concealed=await appearance();assert.equal(concealed[0].visible,true,'An unbound image is not hidden because of its numeric ID');assert.equal(concealed[1].visible,false);
   assert.equal(concealed[1].opacity,83);
   await browser.screenshot(`${evidence('IT-078')}/${variant.width}-${variant.reduced}-${variant.zoom}-hidden.png`);
   await click(browser,screen.canvas.x+screen.canvas.width/2,screen.canvas.y+screen.canvas.height/3);await hidden(browser,false);
   assert.deepEqual(await appearance(),shown);assert.deepEqual(await state(browser),reading);
   assert.equal(await browser.evaluate('SceneManager._scene._messageWindow.isOpen()'),true);
   assert.equal(await browser.evaluate('$gameMessage.allText()'),'A interface deve voltar com a mesma aparência.');
   await browser.screenshot(`${evidence('IT-078')}/${variant.width}-${variant.reduced}-${variant.zoom}-restored.png`);
   observations.push({variant,screen,browser:browser.version,shown});
   assert.deepEqual(browser.exceptions,[]);
  });
 }
 await writeFile(`${evidence('IT-078')}/desktop-observations.json`,JSON.stringify(observations,null,2)+'\n');
});
