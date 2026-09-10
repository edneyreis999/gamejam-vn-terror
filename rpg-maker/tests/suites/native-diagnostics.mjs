import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { pause, tavern } from '../helpers/formation.mjs';
import { frames, titleReady } from '../helpers/closing-presentation.mjs';
import { entry, hidden, qa, saveBytes, state } from '../helpers/native-shared.mjs';
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-11/${id}`;
const error = (code,message) => ({ok:false,error:{code,message}});
const started = error('campaign_already_started','Defina a semente antes de iniciar a campanha.');
const invalidSeed = error('invalid_seed','Use um número inteiro entre 0 e 4294967295.');
export async function toTitle(browser) {
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');
 await titleReady(browser);
}
export async function titleAction(browser,label) {
 const index=await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(label)})`);assert.ok(index>=0);
 for(let step=0;step<5;step++){
  const current=await browser.evaluate('SceneManager._scene._choiceListWindow.index()');if(current===index)break;
  await browser.press(current<index?'ArrowDown':'ArrowUp',current<index?40:38);
 }
 await browser.press('Enter',13);
}
canonicalCase('IT-003','native captured context permits one activation and rejects missing or stale reuse',{timeout:60000},async t=>{
 const browser=await tavern(t),before=await state(browser),bytes=await saveBytes(browser);
 await browser.evaluate(`window.probeInterpreter=new Game_Interpreter();PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','Action',{action:'TOGGLE_HERO',value:'H1'});`);
 assert.equal((await qa(browser)).lastRejectedAction.code,'missing_context');assert.deepEqual(await state(browser),before);
 await browser.evaluate(`PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','CaptureContext',{});PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','Action',{action:'TOGGLE_HERO',value:'H1'});`);
 const once=await state(browser);assert.equal(once.sequence,before.sequence+1);assert.deepEqual(once.draftPartyIds,['H1']);assert.equal((await qa(browser)).lastRejectedAction,null);
 await browser.evaluate(`PluginManager.callCommand(probeInterpreter,'Dryland_EventBridge','Action',{action:'TOGGLE_HERO',value:'H2'});`);
 assert.equal((await qa(browser)).lastRejectedAction.code,'stale_action');assert.deepEqual(await state(browser),once);assert.equal(await saveBytes(browser),bytes);
 await frames(browser,3);await browser.screenshot(`${evidence('IT-003')}/stale-feedback.png`);
});
canonicalCase('IT-042','unavailable QA methods observe without creating or replacing native objects',{timeout:60000},async t=>{
 const browser=await entry(t);
 const results=await browser.evaluate(`(()=>{const system=$gameSystem,temp=$gameTemp,create=DataManager.createGameObjects;let creates=0;DataManager.createGameObjects=function(){creates++;return create.call(this);};try{$gameSystem=null;$gameTemp=null;const results=[expeditionQA.snapshot(),expeditionQA.validate(),expeditionQA.setSeed(42)];return {results,creates,system:$gameSystem,temp:$gameTemp};}finally{$gameSystem=system;$gameTemp=temp;DataManager.createGameObjects=create;}})()`);
 assert.deepEqual(results,{results:Array(3).fill(error('campaign_unavailable','A campanha ainda não está disponível.')),creates:0,system:null,temp:null});
 assert.equal((await qa(browser)).phase,'ready');
});
canonicalCase('IT-043','native title seed setter validates uint32 boundaries and BEGIN uses the accepted seed',{timeout:90000},async t=>{
 const browser=await entry(t);assert.equal((await qa(browser)).phase,'ready');
 for(const seed of [0,4294967295]){
  for(const literal of ['-1','4294967296','0.5','NaN','Infinity','"42"','null','undefined'])assert.deepEqual(await browser.evaluate(`expeditionQA.setSeed(${literal})`),invalidSeed,literal);
  assert.deepEqual(await browser.evaluate(`expeditionQA.setSeed(${seed})`),{ok:true,seed});
  assert.equal((await qa(browser)).seed,null);
  await titleAction(browser,seed===0?'Jogar':'Novo jogo');await pause(browser);await browser.waitFor("$gameTemp._drylandPersistence.status==='saved'");
  assert.equal((await qa(browser)).seed,seed);assert.deepEqual(await browser.evaluate('expeditionQA.setSeed(7)'),started);
  await toTitle(browser);
 }
});
canonicalCase('IT-031','public QA has only three detached methods and rejects reseeding throughout Continue',{timeout:90000},async t=>{
 const browser=await tavern(t);assert.deepEqual(await browser.evaluate('Object.keys(expeditionQA).sort()'),['setSeed','snapshot','validate']);
 const before=await state(browser),bytes=await saveBytes(browser),diagnostic=await qa(browser);
 assert.deepEqual(await browser.evaluate(`(()=>{for(let i=0;i<3;i++){const s=expeditionQA.snapshot();s.assignments.physical[0]='corrupt';s.actionHistory.length=0;s.heroNames.H1='changed';s.persistence.status='fake';}return expeditionQA.validate();})()`),{ok:true,violations:[]});
 assert.deepEqual(await state(browser),before);assert.deepEqual(await qa(browser),diagnostic);assert.equal(await saveBytes(browser),bytes);
 await toTitle(browser);
 const during=await browser.evaluate(`(()=>{window.qaLoad=DataManager.loadGame(0);return expeditionQA.setSeed(9);})()`);assert.deepEqual(during,started);
 await browser.evaluate('qaLoad');assert.deepEqual(await browser.evaluate('expeditionQA.setSeed(9)'),started);assert.equal(await saveBytes(browser),bytes);
 assert.deepEqual(await browser.evaluate('expeditionQA.validate()'),{ok:true,violations:[]});
});
canonicalCase('IT-040','authored invalid commands and missing native sections fail without executing values or changing the campaign',{timeout:90000},async t=>{
 const browser=await tavern(t),before=await state(browser),bytes=await saveBytes(browser);
 for(const [command,args,code]of [['Action',{action:'evil',value:''},'invalid_action'],['Action',{action:'TOGGLE_HERO',value:'globalThis.executed=1'},'invalid_action'],['Observe',{target:'memorial_unknown'},'invalid_target']]){
  await browser.evaluate(`PluginManager.callCommand(new Game_Interpreter(),'Dryland_EventBridge',${JSON.stringify(command)},${JSON.stringify(args)})`);
  assert.equal((await qa(browser)).lastRejectedAction.code,code);assert.deepEqual(await state(browser),before);assert.equal(await browser.evaluate('window.executed===undefined'),true);
 }
 // Corrupt the actual authored marker after the database was validated. The
 // catalog's registry still points to this section, so Present must recheck it.
 await browser.evaluate(`(()=>{const event=$dataCommonEvents.find(e=>e?.list.some(c=>c.parameters?.[0]==='@dryland-section profile.H1'));const marker=event.list.find(c=>c.parameters?.[0]==='@dryland-section profile.H1');marker.parameters[0]='@dryland-section absent';const i=new Game_Interpreter();PluginManager.callCommand(i,'Dryland_EventBridge','CaptureContext',{});$gameVariables.setValue(21,'profile.H1');$gameVariables.setValue(22,'H1');PluginManager.callCommand(i,'Dryland_EventBridge','Present',{});})()`);
 await browser.waitFor("$gameTemp._drylandInvalidPresented&&$gameMessage.choices().includes('Voltar ao título')&&SceneManager._scene._choiceListWindow.isOpenAndActive()");
 assert.equal((await qa(browser)).lastRejectedAction.code,'missing_section');assert.deepEqual(await state(browser),before);assert.equal(await saveBytes(browser),bytes);
 await browser.screenshot(`${evidence('IT-040')}/missing-section.png`);
});
canonicalCase('IT-046','invalid campaign interrupts normal native decisions even during HIDE and preserves the supplied state and save',{timeout:90000},async t=>{
 const browser=await tavern(t),bytes=await saveBytes(browser);
 await browser.press('Tab',9);await hidden(browser,true);
 const invalid=await browser.evaluate(`(()=>{const s=structuredClone($gameSystem._dryland.campaign);s.draftPartyIds=['H1','H1'];$gameSystem._dryland.campaign=s;PluginManager.callCommand(new Game_Interpreter(),'Dryland_EventBridge','CaptureContext',{});return s;})()`);
 await browser.waitFor("$gameTemp._drylandInvalidPresented&&$gameMessage.choices().includes('Voltar ao título')&&SceneManager._scene._choiceListWindow.isOpenAndActive()");
 await hidden(browser,false);assert.equal((await qa(browser)).lastRejectedAction.code,'invalid_state');assert.equal((await browser.evaluate('expeditionQA.validate()')).ok,false);
 await browser.press('ArrowDown',40);assert.deepEqual(await state(browser),invalid);assert.equal(await saveBytes(browser),bytes);
 await browser.screenshot(`${evidence('IT-046')}/invalid-campaign-visible.png`);
 await browser.press('Enter',13);
 await titleReady(browser);
 assert.equal(await saveBytes(browser),bytes);
 // The next boot receives corrupted authored data at the native database
 // loading boundary. A normal content error must not become image recovery.
 await browser.call('Page.addScriptToEvaluateOnNewDocument',{source:`(()=>{let database;Object.defineProperty(window,'$dataCommonEvents',{configurable:true,get(){return database;},set(value){database=value;if(Array.isArray(value)){const c=value[1].list.find(c=>c.parameters?.[0]==='@dryland-section prologue.01');c.parameters[0]='@dryland-section damaged-prologue';}}});})()`});
 await browser.call('Page.reload',{ignoreCache:true});
 let databaseError='';
 for(let step=0;step<200;step++){databaseError=await browser.evaluate('window.Graphics?._errorPrinter?.textContent||""');if(databaseError)break;await delay(50);}
 assert.match(databaseError,/Dryland content/);assert.match(databaseError,/missing_section/);
 assert.equal(await browser.evaluate('Boolean(document.getElementById("retryButton"))'),false);
 assert.equal(await saveBytes(browser),bytes);await browser.screenshot(`${evidence('IT-046')}/invalid-database.png`);
});
