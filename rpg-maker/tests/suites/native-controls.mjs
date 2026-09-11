import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause, tavern } from '../helpers/formation.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { frames, titleReady } from '../helpers/closing-presentation.mjs';
import { assertHiddenPictures, click, entry, hidden, installPhase, state } from '../helpers/native-shared.mjs';
import { appendEnsemble, ensembleFixture, prepareBustFixture } from '../helpers/native-bust-fixture.mjs';
import { openChrome, startServer } from '../helpers/native-chrome.mjs';
import { councilState, installClosing } from '../helpers/closing.mjs';
import { writeFile } from 'node:fs/promises';
const fixtures=phaseFixtures();
const evidence=id=>`docs/qa/evidence/init-rpg-maker-mz/task-11/${id}`;
async function hold(browser,key,keyCode){await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key,code:key,windowsVirtualKeyCode:keyCode});}
async function release(browser,key,keyCode){await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key,code:key,windowsVirtualKeyCode:keyCode});await frames(browser,3);}
canonicalCase('IT-030','failed required native bitmap exposes Retry and resumes the same authored campaign after recovery',{timeout:90000},async t=>{
 const browser=await tavern(t),before=await state(browser);
 // Fail the actual bitmap's loader boundary once. Retry uses the unchanged
 // native Bitmap.retry/_startLoading path and the real package asset.
 await browser.evaluate(`window.requiredImageLoads=[];const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){requiredImageLoads.push(this._url);if(this._url.endsWith('/Dryland_H1.png')&&!window.requiredImageFailed){window.requiredImageFailed=true;this._onError();}else start.call(this);};delete ImageManager._cache['img/pictures/Dryland_H1.png'];`);
 await activate(browser,'formation',0);await activate(browser,'hero',0);
 let failed=false;
 for(let attempt=0;attempt<200;attempt++){
  failed=await browser.evaluate("Boolean(document.getElementById('retryButton'))");if(failed)break;await delay(50);
 }
 assert.equal(failed,true,JSON.stringify(await browser.evaluate('({failed:window.requiredImageFailed,loads:requiredImageLoads,cache:Object.keys(ImageManager._cache).filter(k=>k.includes("H1")),error:Graphics._errorPrinter.textContent})')));
 assert.match(await browser.evaluate('Graphics._errorPrinter.textContent'),/Dryland_H1\.png/);assert.deepEqual(await state(browser),before);
 await browser.screenshot(`${evidence('IT-030')}/required-image-failed.png`);
 const point=await browser.evaluate("(()=>{const r=document.getElementById('retryButton').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
 await click(browser,point.x,point.y);await pause(browser);
 await browser.waitFor("$gameScreen.picture(60)?.name()==='Dryland_H1'&&ImageManager.loadPicture('Dryland_H1').isReady()");
 assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('Boolean(document.getElementById("retryButton"))'),false);
 assert.ok(await browser.evaluate("$gameMessage.allText().includes('Gorvak')"));await browser.screenshot(`${evidence('IT-030')}/required-image-recovered.png`);
});
canonicalCase('IT-038','native Options and consultations cannot carry held confirmation into the background story or party',{timeout:120000},async t=>{
 const browser=await entry(t);await browser.press('Enter',13);await pause(browser);const intro=await state(browser);
 await click(browser,560,693);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
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
canonicalCase('IT-050','upper encounter utilities use mouse and keyboard, suspend during text and HIDE, and seen-only skip consumes its input',{timeout:180000},async t=>{
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
 // Prepared persisted reading input models a re-entry to seen narrative. The
 // key and mouse controls themselves are the shipped native player surface.
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');await titleReady(browser);
 await browser.press('ArrowDown',40);await browser.press('Enter',13);await pause(browser);
 await browser.evaluate(`(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.seenPassageIds=s.reading.passageIds.slice(0,2);$gameSystem._dryland.campaign=s;})()`);
 await browser.waitFor('SceneManager._scene._drylandSkipWindow.visible');await hold(browser,'s',83);await pause(browser);await frames(browser,35);
 let skipped=await state(browser);assert.equal(skipped.reading.index,2);assert.equal(skipped.history.at(-1).type,'SKIP_SEEN_TEXT');await release(browser,'s',83);
 assert.equal(await browser.evaluate('SceneManager._scene._drylandSkipWindow.visible'),false);await browser.press('s',83);assert.deepEqual(await state(browser),skipped);
 await browser.evaluate('(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.seenPassageIds=s.reading.passageIds.slice();$gameSystem._dryland.campaign=s;})()');
 await browser.waitFor('SceneManager._scene._drylandSkipWindow.visible');await click(browser,1050,40);await choices(browser,'formation');
 skipped=await state(browser);assert.equal(skipped.history.filter(a=>a.type==='SKIP_SEEN_TEXT').length,2);assert.deepEqual(skipped.draftPartyIds,[]);
});

canonicalCase('IT-064','clearing a native conversation cancels queued active/focus/exit work and preserves independent pictures',{timeout:180000},async t=>{
 const browser=await tavern(t);
 // Hold the real interpreter immediately after a selected native effect, while
 // the native picture clock remains live. This is an interruption fixture.
 await browser.evaluate(`window.holdDialogueAfter=null;window.dialogueHeld=null;window.cancelledMapLoop=false;
  const update=Game_Map.prototype.updateInterpreter;Game_Map.prototype.updateInterpreter=function(){if(!cancelledMapLoop)update.call(this);};
  const native=Game_Interpreter.prototype.command357;
  Game_Interpreter.prototype.command357=function(p){const result=native.call(this,p);if(result&&['VisuMZ_2_VNPictureBusts','Dryland_EventBridge'].includes(p[0])&&p[1]===holdDialogueAfter){dialogueHeld=this;holdDialogueAfter=null;}return result;};
  const execute=Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand=function(){return dialogueHeld===this?false:execute.call(this);};`);
 for(const reduced of [false,true])for(const stage of ['active','focus','exit']){
  await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});
  await browser.evaluate('dialogueHeld=null;holdDialogueAfter=null;cancelledMapLoop=false;');
  await installPhase(browser,fixtures.formation);await choices(browser,'formation');
  await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
  const before=await state(browser);
  if(stage!=='active'){
   const operation=stage==='focus'?'Focus':'Basic_ExitBusts';
   await browser.evaluate(`holdDialogueAfter=${JSON.stringify(operation)};`);
   const boxes=stage==='focus'?2:7;
   for(let box=0;box<boxes;box++){await pause(browser);await browser.press('Enter',13);}
   await browser.waitFor('Boolean(dialogueHeld)');
  }
  const queued=await browser.evaluate(`(()=>{
   window.cancelledDialogue=[];for(let i=$gameMap._interpreter;i;i=i._childInterpreter)cancelledDialogue.push(i);
   $gameScreen.showPicture(18,'Dryland_H2',0,20,30,10,10,255,0);
   const background=$gameScreen.picture(1).name(),hadQueuedEffect=!!dialogueHeld;
   const ownedChild=cancelledDialogue.slice(1).some(interpreter=>Boolean(interpreter._drylandDialogueOwner));
   cancelledMapLoop=true;$gameMap._interpreter.clear();$gameMessage.clear();dialogueHeld=null;
   return {ownedChild,background,hadQueuedEffect};
  })()`);
  assert.equal(queued.ownedChild,true,'A real child interpreter must own the conversation being cancelled.');
  assert.equal(queued.hadQueuedEffect,stage!=='active');
  assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id=>!$gameScreen.picture(id))'),true);
  await browser.evaluate('for(const interpreter of cancelledDialogue)interpreter.update();');await frames(browser,45);
  assert.equal(await browser.evaluate('cancelledDialogue.every(i=>!i.isRunning()&&!i._childInterpreter)'),true);
  assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id=>!$gameScreen.picture(id))'),true);
  assert.equal(await browser.evaluate('$gameScreen.picture(18).name()'),'Dryland_H2');
  assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'),queued.background);
  assert.deepEqual(await state(browser),before);
  await browser.screenshot(`${evidence('IT-064')}/${stage}-${reduced?'reduced':'normal'}-cancelled.png`);
 }
});

canonicalCase('IT-065','partial Council skip restores the next authored ensemble and full seen skip leaves the final choice clean',{timeout:120000},async t=>{
 const {councilState,installClosing,closingReady}=await import('../helpers/closing.mjs');
 const browser=await tavern(t);await installClosing(browser,councilState('collective'));
 for(let box=0;box<8;box++){
  await closingReady(browser);const current=await state(browser);
  if(current.reading.passageIds[current.reading.index]==='council.challenge')break;
  await browser.press('Enter',13);
 }
 assert.equal(await browser.evaluate('$gameSystem._dryland.campaign.reading.passageIds[$gameSystem._dryland.campaign.reading.index]'),'council.challenge');
 // Labeled seen-history fixture. The shipped S control performs the action.
 await browser.evaluate(`(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.seenPassageIds=[...new Set([...s.seenPassageIds,'council.challenge'])];$gameSystem._dryland.campaign=s;})()`);
 const before=await state(browser);
 await browser.waitFor('SceneManager._scene._drylandSkipWindow.visible');await browser.press('s',83);await closingReady(browser);
 const after=await state(browser);
 assert.equal(after.reading.passageIds[after.reading.index],'council.confession');
 assert.equal(after.sequence,before.sequence+1);
 assert.deepEqual(after.climaxPartyIds,before.climaxPartyIds);assert.deepEqual(after.deadHeroIds,before.deadHeroIds);
 await browser.waitFor('[60,61,62,63].every(id=>$gameScreen.picture(id))&&$gameScreen.picture(63).tone().every(v=>v===0)');
 assert.deepEqual(await browser.evaluate('[60,61,62,63].map(id=>$gameScreen.picture(id).name())'),['Dryland_H1','Dryland_H2','Dryland_H3','Dryland_ivai']);
 await browser.screenshot(`${evidence('IT-065')}/partial-skip-confession.png`);
 for(let group=0;group<8&&(await state(browser)).phase==='council';group++){
  await browser.evaluate('(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.seenPassageIds=[...new Set([...s.seenPassageIds,...s.reading.passageIds])];$gameSystem._dryland.campaign=s;})()');
  await browser.waitFor('SceneManager._scene._drylandSkipWindow.visible');await browser.press('s',83);
  await browser.waitFor("$gameSystem._dryland.campaign.phase==='final_choice'||(SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0&&$gameMessage.hasText())");
 }
 await choices(browser,'ending');
 assert.equal((await state(browser)).phase,'final_choice');
 assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection||null'),null,'Full seen skip leaves no presentation error');
 assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id=>!$gameScreen.picture(id))'),true);
 assert.deepEqual((await state(browser)).deadHeroIds,before.deadHeroIds);
 await browser.screenshot(`${evidence('IT-065')}/full-skip-choice.png`);
});

canonicalCase('IT-068','the authored 2x2 fixture uses production ownership, individual focus, HIDE and clean exit/repeat',{timeout:180000},async t=>{
 const prepared=await prepareBustFixture(t,'fixture-native-2x2-20260911',appendEnsemble);
 await startServer(t,prepared.directory);const browser=await openChrome(t);
 await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await pause(browser);await installClosing(browser,councilState());await pause(browser);
 // Prepared integration input: disable only new map autoruns, then run the
 // versioned native common event on the real map interpreter. No story commit.
 await browser.evaluate('Game_Map.prototype.setupStartingEvent=function(){return false;};$gameMap._interpreter.clear();SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();ImageManager.clear();');
 const before=await state(browser),observations=[],temporal=[];
 const helper={code:117,indent:0,parameters:[prepared.events.find(e=>e?.list[0]?.parameters[0]==='@dryland-presentation-helper fixture.2x2.enter').id]},end={code:0,indent:0,parameters:[]};
 for(const args of [{kind:'council',operation:'begin',slots:'60,60'},{kind:'tavern',operation:'begin'}]){
  const commands=[{code:357,indent:0,parameters:['Dryland_EventBridge','Conversation','Conversation',args]},helper,end];
  await browser.evaluate(`$gameMap._interpreter.setup(${JSON.stringify(commands)},0);`);
  await browser.waitFor('!$gameMap._interpreter.isRunning()');
  assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection?.code'),'invalid_target');
  assert.equal(await browser.evaluate('[60,61,62,63,64,65].every(id=>!$gameScreen.picture(id))'),true,'Rejected begin cannot run an ownerless presentation helper');
  assert.deepEqual(await state(browser),before);
 }
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
    if(index===0&&cache==='cold'&&!reduced){
     for(const slots of ['60,64,63,61','18','60,60','60,63',false]){
      await browser.evaluate(`PluginManager.callCommand($gameMap._interpreter,'Dryland_EventBridge','Conversation',{kind:'council',operation:'begin',slots:${JSON.stringify(slots)}})`);
      assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection?.code'),'invalid_target');
      assert.deepEqual(await composition(),actual);
     }
     await browser.evaluate('delete $gameTemp._drylandLastRejection;$gameVariables.setValue(24,"");');await frames(browser,3);
    }
    if(index===4)assert.deepEqual(actual,previous,'Repeated same speaker has identical settled focus');
    if(index===4){
     const args={slot:'64'};
     const observed=await browser.evaluate(`(()=>{let i=$gameMap._interpreter;while(i._childInterpreter)i=i._childInterpreter;delete $gameTemp._drylandLastRejection;PluginManager.callCommand(i,'Dryland_EventBridge','Focus',${JSON.stringify(args)});return [60,61,63,64].map(id=>$gameScreen.picture(id)._duration);})()`);
     assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection?.code||null'),null);
     assert.deepEqual(observed,[0,0,0,0],'Repeated settled focus starts no new interpolation');
    }

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
