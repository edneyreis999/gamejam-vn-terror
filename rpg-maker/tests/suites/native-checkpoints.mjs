import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { selectFile } from '../helpers/native-chrome.mjs';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, pause, catalog } from '../helpers/formation.mjs';
import { accepted, complete, failureWithCount } from '../helpers/campaign.mjs';
import { councilBoundary, finalChoice } from '../helpers/closing.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
import { discoveryBoundary } from '../helpers/discovery.mjs';
import { titleReady } from '../helpers/closing-presentation.mjs';
import { entry, installPhase, saveBytes, state } from '../helpers/native-shared.mjs';
const fixtures=phaseFixtures();
async function arm(browser,reason){await browser.evaluate(`checkpointRecords=[];checkpointHoldReason=${JSON.stringify(reason)};checkpointLoaded=null;`);}
async function advanceUntilSaved(browser,reason){
 for(let step=0;step<12;step++){
  await browser.waitFor(`checkpointRecords.some(r=>r.reason===${JSON.stringify(reason)}&&r.done)||($gameMessage.hasText()&&SceneManager._scene._messageWindow?.pause&&SceneManager._scene._messageWindow._waitCount===0&&!SceneManager._scene.isBusy())`);
  if(await browser.evaluate(`checkpointRecords.some(r=>r.reason===${JSON.stringify(reason)}&&r.done)`))return;
  await browser.press('Enter',13);
 }
 assert.fail(`Native reading did not produce ${reason}.`);
}
async function roundTrip(browser,reason,{advance=false}={}){
 await browser.waitFor(`checkpointRecords.some(r=>r.reason===${JSON.stringify(reason)}&&r.done)&&$gameTemp._drylandPersistence.status==='saved'`);
 const record=await browser.evaluate(`checkpointRecords.find(r=>r.reason===${JSON.stringify(reason)}&&r.done)`);
 assert.deepEqual(await state(browser),record.state,reason);
 assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file'+$gameSystem.savefileId()).then(c=>c.system._dryland.campaign)"),record.state,reason);
 await browser.waitFor("StorageManager.loadObject('global').then(index=>JSON.stringify(index[$gameSystem.savefileId()])===JSON.stringify(DataManager._globalInfo[$gameSystem.savefileId()]))");
 const indexBytes=await browser.evaluate("StorageManager.loadZip('global')");
 const stack=await browser.evaluate(`StorageManager.loadObject('file'+${record.file}).then(c=>{const rows=[];for(let i=c.map._interpreter;i;i=i._childInterpreter)rows.push({eventId:i._eventId,commonEventId:i._drylandCommonEventId,index:i._index,wait:i._waitMode,command:i.currentCommand()});return {mapId:c.map._mapId,rows};})`);
 const bytes=await saveBytes(browser);
 await browser.evaluate("checkpointHoldReason=null;$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);");await titleReady(browser);
 await browser.evaluate('checkpointObserveLoad=true;');await browser.press('Enter',13);await selectFile(browser,record.file);
 await browser.waitFor("checkpointLoaded&&SceneManager._scene.constructor.name==='Scene_Map'&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()");
 assert.deepEqual(await browser.evaluate('checkpointLoaded'),record.state,reason);
 assert.deepEqual(await state(browser),record.state,reason);assert.equal(await saveBytes(browser),bytes,reason);
 await browser.evaluate('checkpointObserveLoad=false;checkpointLoaded=null;');
 await browser.waitFor("SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()&&(($gameMessage.hasText()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0)||$gameMessage.isChoice())");
 let nextInput=null;
 if(advance){
  const boundary=await browser.evaluate(`(()=>{let i=$gameMap._interpreter;while(i._childInterpreter)i=i._childInterpreter;const remaining=i._list.slice(i._index);const next=remaining.findIndex(c=>c.code===101),end=remaining.findIndex(c=>c.code===357&&c.parameters[1]==='ReadingEnd');return{text:$gameMessage.allText(),moreBoxes:next>=0&&next<end};})()`);
  assert.ok(boundary.text&&record.state.reading);
  await browser.press('Enter',13);
  await browser.waitFor(`$gameSystem._dryland.campaign.sequence!==${record.state.sequence}||($gameMessage.allText()!==${JSON.stringify(boundary.text)}&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0)`);
  nextInput=await state(browser);
  assert.deepEqual(nextInput,boundary.moreBoxes?record.state:complete(record.state),reason+' next acknowledged box');
 }
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 return {reason,file:record.file,sequence:record.state.sequence,phase:record.state.phase,payloadSha256:hash(bytes),indexSha256:hash(indexBytes),nextInput,deathLocations:record.state.deathLocations,stack,reading:record.state.reading,lastAction:record.state.history.at(-1),decisionPending:reason==='reveal'?'CHOOSE_APPROACH':reason==='consequence'&&record.state.phase==='sacrifice_choice'?'SELECT_VICTIM':reason==='council'?'CHOOSE_ENDING':null};
}
canonicalCase('IT-014','all nine authored semantic checkpoints save and install exactly their committed campaign through native Continue',{timeout:480000},async t=>{
 const browser=await entry(t),evidence=[];
 t.after(async()=>{const directory='docs/qa/evidence/init-rpg-maker-mz/task-11/IT-014';await mkdir(directory,{recursive:true});await writeFile(`${directory}/boundaries.json`,JSON.stringify(evidence,null,2)+'\n');});
 // Pause interpreter execution only at completed I/O boundaries so a following
 // automatic checkpoint cannot overwrite the exact boundary under inspection.
 // Serialization, compression, storage, validation, extraction and native
 // Continue are the real engine implementation throughout.
 await browser.evaluate(`window.checkpointRecords=[];window.checkpointHoldReason=null;window.checkpointObserveLoad=false;window.checkpointLoaded=null;
 const save=DataManager.saveGame;DataManager.saveGame=function(id){let i=$gameMap._interpreter;while(i._childInterpreter)i=i._childInterpreter;const c=i.currentCommand();const r={file:id,reason:c?.parameters?.[3]?.reason,state:structuredClone($gameSystem._dryland.campaign),done:false};checkpointRecords.push(r);return save.call(this,id).then(value=>{r.done=true;return value;});};
 const load=DataManager.loadGame;DataManager.loadGame=function(id){return load.call(this,id).then(value=>{if(checkpointObserveLoad)checkpointLoaded=structuredClone($gameSystem._dryland.campaign);return value;});};
 const execute=Game_Interpreter.prototype.executeCommand;Game_Interpreter.prototype.executeCommand=function(){if((checkpointObserveLoad&&checkpointLoaded)||(checkpointHoldReason&&checkpointRecords.some(r=>r.reason===checkpointHoldReason&&r.done)))return false;return execute.call(this);};`);
 let firstFileBytes;
 for(const file of [1,2]){
 if(file===2){await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');await titleReady(browser);}
 const newGameIndex=await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(file===1?'Jogar':'Novo jogo')})`);assert.ok(newGameIndex>=0);
 while(await browser.evaluate('SceneManager._scene._choiceListWindow.index()')!==newGameIndex)await browser.press('ArrowDown',40);
 await arm(browser,'new_campaign');await browser.press('Enter',13);await selectFile(browser,file);evidence.push(await roundTrip(browser,'new_campaign',{advance:true}));
 let prepared=fixtures.formation;for(const heroId of ['H1','H2','H3'])prepared=accepted(prepared,'TOGGLE_HERO',{heroId});prepared=accepted(prepared,'SELECT_DESTINATION',{dungeonId:'physical'});
 await installPhase(browser,prepared);await choices(browser,'formation');await arm(browser,'departure');await activate(browser,'formation',10);evidence.push(await roundTrip(browser,'departure'));
 await arm(browser,'reveal');await advanceUntilSaved(browser,'reveal');evidence.push(await roundTrip(browser,'reveal'));
 await browser.press('Enter',13);await choices(browser,'approaches');const current=await state(browser),encounter=catalog.encounters[current.assignments[current.dungeonId][current.position-1]];const index=encounter.approaches.findIndex(a=>current.partyIds.some(id=>catalog.heroes[id].competencyIds.includes(a.competencyId)));assert.ok(index>=0);
 await arm(browser,'approach');await activate(browser,'approaches',index);evidence.push(await roundTrip(browser,'approach',{advance:true}));
 await installPhase(browser,failureWithCount(3));await pause(browser);await browser.press('Enter',13);await choices(browser,'sacrifice');
 await arm(browser,'sacrifice');await activate(browser,'sacrifice',0);evidence.push(await roundTrip(browser,'sacrifice'));
 await arm(browser,'consequence');await advanceUntilSaved(browser,'consequence');evidence.push(await roundTrip(browser,'consequence'));
 await installPhase(browser,discoveryBoundary(file===1?['physical','supernatural']:['supernatural','physical']));await arm(browser,'reward');await advanceUntilSaved(browser,'reward');evidence.push(await roundTrip(browser,'reward',{advance:true}));
 await installPhase(browser,councilBoundary());await arm(browser,'council');await advanceUntilSaved(browser,'council');evidence.push(await roundTrip(browser,'council'));
 await arm(browser,'reward');await advanceUntilSaved(browser,'reward');const medallion=await roundTrip(browser,'reward',{advance:true});assert.equal(medallion.phase,'council');assert.equal(medallion.reading.passageIds[medallion.reading.index],'council.02');evidence.push(medallion);
 await installPhase(browser,finalChoice());await choices(browser,'ending');await arm(browser,'ending');await activate(browser,'ending',file-1);evidence.push(await roundTrip(browser,'ending',{advance:true}));
 assert.deepEqual(evidence.filter(r=>r.file===file).map(r=>r.reason),['new_campaign','departure','reveal','approach','sacrifice','consequence','reward','council','reward','ending']);
 const original=await browser.evaluate("StorageManager.loadZip('file1')");if(file===1)firstFileBytes=original;else assert.equal(original,firstFileBytes,'File 2 cannot rewrite file 1 or its reading history');
 }
});

canonicalCase('IT-079','selected file archives restore before boot into independent native branches and preserve their master',{timeout:240000},async t=>{
 const {run}=await import('../../../.agents/skills/rpg-maker-mz-qa-execution/scripts/directed-browser.mjs');
 const adapter=await import('../../qa/directed-adapter.mjs');
 const {captureNativeSave,sha256}=await import('../../qa/native-save-archive.mjs');
 const {DirectedNativePlayer}=await import('../../qa/native-player.mjs');
 const {mkdtemp,readFile,rm}=await import('node:fs/promises');const path=await import('node:path');
 const output=await mkdtemp(path.join(path.resolve('docs/qa/evidence/eventbridge-minimal-runtime/'),'archive-integration-'));
 let parent;
 for(const branch of ['producer','A','B']){
  const archivePath=branch==='producer'?undefined:path.join(output,'producer','parent.archive.json');
  const prepared=await adapter.prepare({project:process.cwd(),archivePath});t.after(()=>rm(path.dirname(prepared.fixture),{recursive:true,force:true}));
  const caseModule={scenario:{storage:{expectedRef:'native checkpoint production and branch integrity'},id:'archive-'+branch,criteria:[{id:'native-storage',variant:branch,expectedRef:'planos/tasks/eventbridge-minimal-runtime/task-14.md'}],requires:['native-mz','public-input'],browser:{width:1280,height:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',query:'',timeoutMs:30000}},
   sourceFiles:[new URL('../../qa/native-player.mjs',import.meta.url),new URL('../../qa/native-save-archive.mjs',import.meta.url)],
   async execute(context){
    const player=new DirectedNativePlayer(context);
    await player.choose(branch==='producer'?'Jogar':'Continuar');await player.file(7);await player.ready();
    if(branch==='producer'){
      parent=await captureNativeSave(context,'parent');
      assert.equal(parent.nativeState.mapId,2);
      assert.deepEqual(parent.nativeState.readUnits,[]);
      assert.ok(parent.nativeState.presentedDeaths.every(row=>!row.presented));
      assert.ok(parent.nativeState.interpreters.length>0);
      return;
    }
    assert.deepEqual((await player.snapshot('restored-parent')).campaign,parent.campaign);
    await player.until('formation');
    for(const hero of branch==='A'?['Gorvak','Elowen','Griznik']:['Seraphina','Bimbren','Liora']){
      await player.choose(hero);await player.choose('Selecionar');
      await player.returnToTavern();
    }
    await player.choose('Destinos');const surface=await player.until('destinations');
    await player.choose(surface.labels[branch==='A'?0:1]);await player.choose('Partir');await player.ready();
    const child=await captureNativeSave(context,'child');
    assert.equal(child.fileId,7);assert.equal(child.campaign.dungeonId,branch==='A'?'physical':'supernatural');
    assert.deepEqual(child.campaign.partyIds,branch==='A'?['H1','H2','H3']:['H4','H5','H6']);
    assert.notEqual(child.payloadSha256,parent.payloadSha256);
   },
   async verify({expected,artifacts}){return {criteria:expected.map(row=>({...row,status:'pass',observed:'Native file7 payload/index captured; independent pre-boot storage copy entered through Continue.',evidence:artifacts.map(a=>a.path),limits:['Technical archive integration, not full campaign/visual/human acceptance.']})),pendingReviews:[]};}
  };
  const report=await run({project:process.cwd(),fixture:prepared.fixture,output:path.join(output,branch),adapter,caseModule,sources:[new URL(import.meta.url),new URL('../../qa/directed-adapter.mjs',import.meta.url)]});
  assert.equal(report.status,'pass',JSON.stringify(report.failure));
  if(branch!=='producer')assert.equal(report.storagePreparation.phase,'before-first-page');
  const bytes=await readFile(path.join(output,'producer','parent.archive.json'));
  if(branch==='producer')parent.masterSha256=sha256(bytes);else assert.equal(sha256(bytes),parent.masterSha256);
 }
});
