// Suite: authored content boundaries and native passage presentation.
// Native authoring and serialization run against the installed MZ/provider stack.
// OUT: later feature transcription, native saves, complete campaign and human acceptance.
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { canonicalCase, assertRegistrations, manifest } from '../helpers/canonical-cases.mjs';
import { openChrome, project, startServer, selectFile } from '../helpers/native-chrome.mjs';
import { hash } from '../../tools/native-files.mjs';
import { appendEnsemble, ensembleFixture, prepareBustFixture } from '../helpers/native-bust-fixture.mjs';
import { parsePluginList, readPluginParameters } from '../../tools/plugin-settings.mjs';
import { clickConsole } from '../helpers/native-shared.mjs';
import { activate, choices, pause, catalog, rules, formation } from '../helpers/formation.mjs';

const clone = value => structuredClone(value);
const original = JSON.parse(await readFile(path.join(project, 'data/CommonEvents.json'), 'utf8'));
const command = (code, parameters, indent = 0) => ({ code, indent, parameters });
const end = () => command(0, []);

canonicalCase('UT-057', 'shared lover warnings retain mechanical reading identity independently of authored wording', () => {
  const id='lover.physical.warning';
  for(const scene of ['lover.physical.first','lover.physical.second'])assert.ok(catalog.scenes[scene].passageIds.includes(id));
  const state=formation();const read={...state,seenPassageIds:[...state.seenPassageIds,id]};
  assert.equal(rules.validateState(read).ok,true);assert.equal(read.seenPassageIds.filter(value=>value===id).length,1);
});









canonicalCase('IT-036', 'manifest rejects empty, missing, duplicate or mismatched registrations', () => {
  const ids = Object.values(manifest.tasks).flat();
  assert.doesNotThrow(() => assertRegistrations(manifest, ids));
  for (const [contract, registrations] of [[null, []], [{ tasks: {} }, []], [manifest, ids.slice(1)],
    [manifest, [...ids, ids[0]]], [{ tasks: { fixture: ['UT-047', 'UT-047'] } }, ['UT-047']],
    [manifest, [...ids.slice(1), 'UT-999']]]) assert.throws(() => assertRegistrations(contract, registrations));
});

async function firstPrologue(browser, label = 'Jogar') {
  await browser.waitFor(`window.$gameMessage && $gameMessage.choices().includes(${JSON.stringify(label)}) && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()`);
  const index = await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(label)})`);
  for (let step = 0; step < index; step++) await browser.press('ArrowDown', 40);
  await browser.press('Enter', 13);
  await selectFile(browser,1);
  await browser.waitFor("$gameMap.mapId() === 2 && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0");
}
canonicalCase('IT-004', 'The native prologue runs its authored passage and commits its completion exactly once', { timeout: 60000 }, async t => {
  await startServer(t);
  const browser = await openChrome(t);
  await firstPrologue(browser);
  const before = await browser.evaluate('({text:$gameMessage.allText(),state:$gameSystem._dryland.campaign})');
  assert.match(before.text, /A chuva acompanha Ivaí/);
  assert.equal(before.state.sequence, 1);
  assert.deepEqual(before.state.seenPassageIds, []);
  const completedInterpreter = await browser.call('Runtime.evaluate', { expression: '$gameMap._interpreter._childInterpreter', returnByValue: false });
  await browser.press('Enter', 13);
  await browser.waitFor("$gameMessage.allText().includes('Minha mãe deixou registros') && SceneManager._scene._messageWindow.pause");
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  const after = await browser.evaluate('$gameSystem._dryland.campaign');
  assert.equal(after.sequence, 2);
  assert.deepEqual(after.seenPassageIds, ['prologue.01']);
  assert.equal(after.reading.index, 1);
  assert.equal(after.history.filter(action => action.passageId === 'prologue.01').length, 1);
  const replay = await browser.call('Runtime.callFunctionOn', {
    objectId: completedInterpreter.result.objectId, functionDeclaration: 'function() { this.terminate(); }', returnByValue: true
  });
  assert.equal(replay.exceptionDetails, undefined);
  assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'), after);
  await browser.call('Runtime.releaseObject', { objectId: completedInterpreter.result.objectId });
  await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-02/IT-004/confirmed-first-passage.png');
  assert.deepEqual(browser.exceptions, []);
});

canonicalCase('IT-035', 'saved native wording appears after reload without regenerating JavaScript prose', { timeout: 90000 }, async t => {
  const directory = await mkdtemp(path.join(tmpdir(), 'dryland-authoring-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  // Clone writable native data; other runtime directories are read-only symlinks to the real installed stack.
  for (const entry of await readdir(project, { withFileTypes: true })) {
    const source = path.join(project, entry.name), target = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== 'data') await symlink(source, target);
    else await cp(source, target, { recursive: true });
  }
  await startServer(t, directory);
  const browser = await openChrome(t);
  await firstPrologue(browser);
  assert.match(await browser.evaluate('$gameMessage.allText()'), /A chuva acompanha Ivaí/);
  const pluginFile = path.join(project, 'js/plugins/Dryland_EventBridge.js');
  const pluginHash = hash(await readFile(pluginFile));
  const edited = clone(original);
  edited[114].list.find(c => c.code === 401).parameters[0] = 'Texto salvo no evento nativo para verificar a releitura.';
  await writeFile(path.join(directory, 'data/CommonEvents.json'), JSON.stringify(edited));
  await browser.call('Page.reload', { ignoreCache: true });
  await firstPrologue(browser, 'Novo jogo');
  assert.equal(await browser.evaluate('$gameMessage.allText()'), 'Texto salvo no evento nativo para verificar a releitura.');
  assert.equal(hash(await readFile(pluginFile)), pluginHash);
  await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-02/IT-035/edited-native-text.png');
  assert.deepEqual(browser.exceptions, []);
});





canonicalCase('UT-070','the isolated 2x2 recipe preserves its technical transcript and uses native helpers',()=>{
 const events=clone(original),id=appendEnsemble(events);
 assert.deepEqual(events[id].list.filter(c=>c.code===401).map(c=>c.parameters[0]),[
  'Fixture técnica 2x2 — fala 1. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 2. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 3. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 4. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 5. Sem conteúdo de campanha.'
 ]);
 assert.deepEqual(ensembleFixture.transcript.map(row=>row.slot),[60,61,63,64,64]);
 assert.equal(ensembleFixture.helpers.length,6);
});

canonicalCase('IT-067','editing native layout and inserting text boxes updates playback and Continue from one authored source',{timeout:90000},async t=>{
 const pluginHash=hash(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js')));
 const prepared=await prepareBustFixture(t,'fixture-native-bust-edit-20260911',events=>{
  const profile=events.find(event=>event?.name==='Perfil — Gorvak');
  const helper=profile;
  const move=helper.list.find(c=>c.code===357&&c.parameters[1]==='Move_MoveToCoordinates').parameters[3];
  const scale=helper.list.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo').parameters[3];
  move['TargetX:str']='342';scale['TargetScaleX:str']='44';scale['TargetScaleY:str']='44';
  const profileList=profile.list;
  const enter=profileList.findIndex(c=>c.code===357&&c.parameters[1]==='Basic_EnterBust');
  profileList.splice(enter,0,command(117,[80]));
  const profileEnd=profileList.findIndex(c=>c.code===357&&c.parameters[1]==='ObservationComplete');
  profileList.splice(profileEnd,0,command(357,['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'60','PictureName:str':'Dryland_H2'}]));
  for(const [id,x,scaleValue] of [[81,'326','39.6'],[80,'342','44']]){
   for(const c of events[id].list.filter(c=>c.code===357&&c.parameters[3]['PictureID:arrayeval']==='["60"]')){
    if(c.parameters[1]==='Move_MoveToCoordinates')c.parameters[3]['TargetX:str']=x;
    if(c.parameters[1]==='Scale_ScaleTo'){c.parameters[3]['TargetScaleX:str']=scaleValue;c.parameters[3]['TargetScaleY:str']=scaleValue;}
   }
  }
  const list=events.find(event=>event?.name==='Conversa — Gorvak').list;
  const text=list.findIndex(c=>c.code===101);
  list.splice(text,0,clone(list[text]),command(401,['Caixa técnica inserida — mesma autoria.']));
  const focus=list.findIndex(c=>c.code===117&&c.parameters[0]===80);
  list.splice(focus+1,0,command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleTo','Scale_ScaleTo',{'PictureID:arrayeval':'["60"]','TargetScaleX:str':'80','TargetScaleY:str':'80','Duration:eval':'0'}]));
 });
 assert.deepEqual(prepared.events[4],original[4]);
 await startServer(t,prepared.directory);const browser=await openChrome(t);await firstPrologue(browser);
 for(let box=0;box<3;box++){await pause(browser);await browser.press('Enter',13);}
 await choices(browser,'formation');await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 await browser.waitFor('$gameScreen.picture(60)?.x()===342&&$gameScreen.picture(60)?.scaleX()===44');
 assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection?.code||null'),null,'Focus before entry leaves an empty owned slot untouched');
 const before=await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)');
 await clickConsole(browser,'options');await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()");await pause(browser);
 assert.equal(await browser.evaluate('$gameScreen.picture(60).x()'),342);
 assert.equal(await browser.evaluate('$gameScreen.picture(60).scaleX()'),44);
 // Integration save fixture only: native serialization and title Continue,
 // without introducing a player save command.
 await browser.press('Enter',13);await pause(browser);
 await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title)');
 await browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
 assert.equal(await browser.evaluate('$gameMessage.allText()'),'Caixa técnica inserida — mesma autoria.');
 await browser.waitFor('$gameScreen.picture(60)?.x()===326&&$gameScreen.picture(60)?.scaleX()===39.6');
 assert.equal(await browser.evaluate('$gameScreen.picture(60).name()'),'Dryland_H2','Completed source includes visuals after its final text');
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),before);
 await browser.press('Enter',13);await pause(browser);
 await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title)');
 await browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
 await browser.waitFor('$gameScreen.picture(60)?.x()===342&&$gameScreen.picture(60)?.scaleX()===80');
 assert.equal(await browser.evaluate('$gameMessage.speakerName()'),'Gorvak');
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),before);
 assert.equal(hash(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js'))),pluginHash);
 await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-vn-picture-busts-dialogues/IT-067/authored-342-44.png');
});





canonicalCase('UT-073','native focus replaces the obsolete plugin settings and remains editable in common events',async t=>{
 assert.deepEqual(await readPluginParameters(project,'Dryland_EventBridge'),{ConfigurationCommonEvent:'4'});
 const header=(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js'),'utf8')).split('*/')[0];
 assert.ok(!header.includes('@command Focus'));
 assert.ok(!header.includes('@param SpeakerScale'));
 assert.ok(!original.some(e=>e?.list.some(c=>c.code===357&&c.parameters[0]==='Dryland_EventBridge'&&c.parameters[1]==='Focus')));
 const prepared=await prepareBustFixture(t,'fixture-native-focus-cli',events=>{
  const scale=events[80].list.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo');
  scale.parameters[3]['TargetScaleX:str']='250';scale.parameters[3]['Duration:eval']='120';
 });
 assert.equal(prepared.events[80].list.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo').parameters[3]['TargetScaleX:str'],'250');
 assert.throws(()=>parsePluginList('var $plugins = []; globalThis.executed = true;'));
});



canonicalCase('IT-069','artist parameters and additional native effects survive Options and compatible Continue',{timeout:120000},async t=>{
 const prepared=await prepareBustFixture(t,'fixture-native-freedom-20260911',events=>{
  const list=events.find(event=>event?.name==='Perfil — Gorvak').list;
  for(const c of list.filter(c=>c.code===357&&c.parameters[0]==='VisuMZ_2_VNPictureBusts')){
   const args=c.parameters[3];
   if('PictureID:eval' in args)args['PictureID:eval']='60 + 6';
   if('PictureID:arrayeval' in args)args['PictureID:arrayeval']='["60 + 6"]';
   if(c.parameters[1]==='Basic_EnterBust')Object.assign(args,{'Origin:str':'Center','HorzMirror:str':'Mirror','EasingType:str':'OutBounce','Duration:eval':'75'});
   if(c.parameters[1]==='Scale_ScaleTo')Object.assign(args,{'TargetScaleX:str':'73','TargetScaleY:str':'73','Duration:eval':'80'});
   if(c.parameters[1]==='Move_MoveToCoordinates')Object.assign(args,{'TargetX:str':'Graphics.width / 2','TargetY:str':'420','Duration:eval':'85','EasingType:str':'OutQuad'});
  }
  const first=list.findIndex(c=>c.code===101);
  list.splice(first,0,
   command(231,[92,'Dryland_Button',0,0,31,37,100,100,181,0]),
   command(230,[90]),
   command(357,['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'66','PictureName:str':'Dryland_H2'}]),
   command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleBy','Scale',{'PictureID:arrayeval':'["66"]','ScaleX:eval':'7','ScaleY:eval':'7','Duration:eval':'10'}]),
   command(357,['VisuMZ_2_VNPictureBusts','Tone_PresetBust','Tone',{'PictureID:arrayeval':'["66"]','Preset:str':'Sunset','Duration:eval':'20'}]),
   command(230,[20]));
  // The fixture explicitly authors its extra bust exit. No runtime owner does it.
  const interaction=events[5].list;
  const stage=interaction.findIndex(c=>c.code===117&&c.parameters[0]===38);
  interaction.splice(stage,0,{...command(235,[66]),indent:1});
 });
 await startServer(t,prepared.directory);const browser=await openChrome(t);await firstPrologue(browser);
 for(let box=0;box<3;box++){await pause(browser);await browser.press('Enter',13);}
 await choices(browser,'formation');await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 const settled='$gameScreen.picture(66)&&$gameScreen.picture(66)._duration===0&&$gameScreen.picture(66)._toneDuration===0';
 await browser.waitFor(settled);
 const snapshot=()=>browser.evaluate('(()=>{const p=$gameScreen.picture(66);return {name:p.name(),x:p.x(),y:p.y(),scaleX:p.scaleX(),scaleY:p.scaleY(),tone:p.tone(),origin:p.origin()}})()');
 const before=await snapshot();
 const extra=await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))');
 assert.equal(before.name,'Dryland_H2');assert.equal(before.x,640);assert.equal(before.y,420);assert.equal(before.scaleX,-80,'Native mirroring is retained');assert.equal(before.scaleY,80);
 assert.ok(before.tone.some(v=>v!==0));
 const campaignBefore=await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)');
 const folder='docs/qa/evidence/init-rpg-maker-mz/task-vn-focus-parameters/IT-069';
 await browser.screenshot(`${folder}/native-authored.png`);
 await clickConsole(browser,'options');await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()");await pause(browser);await browser.waitFor(settled);
 assert.deepEqual(await snapshot(),before,'Options retains native picture state');
 assert.equal(await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))'),extra);
 await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');await browser.reopen();
 await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);await browser.waitFor(settled);
 assert.deepEqual(await snapshot(),before,'Native Continue retains saved picture state');
 assert.equal(await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))'),extra);
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),campaignBefore);
 await browser.screenshot(`${folder}/native-restored.png`);
 for(let box=0;box<6;box++){await browser.press('Enter',13);await pause(browser);}
 await browser.press('Enter',13);await choices(browser,'formation');
 assert.equal(await browser.evaluate('$gameScreen.picture(66)||null'),null,'Actual authored picture IDs are cleaned up');
 assert.equal(await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))'),extra,'Authored bust exit leaves the independent picture intact');
 assert.deepEqual(browser.exceptions,[]);
});

// INVARIANT: the native Call Common Event selector alone chooses the conversation.
// OWNING_LAYER: native integration; EXISTING_SUITE: content.mjs.
canonicalCase('IT-071', 'a replacement conversation runs without metadata and only becomes read after its final text', {timeout:90000}, async t => {
  const directory = await mkdtemp(path.join(tmpdir(), 'dryland-native-call-'));
  t.after(() => rm(directory, {recursive:true,force:true}));
  for (const entry of await readdir(project,{withFileTypes:true})) {
    const source=path.join(project,entry.name),target=path.join(directory,entry.name);
    if(entry.isDirectory() && entry.name!=='data') await symlink(source,target);
    else await cp(source,target,{recursive:true});
  }
  const edited=clone(original), replacementId=edited.length;
  for(const event of edited.filter(Boolean))event.list=event.list.filter(c=>![108,408].includes(c.code));
  const presentation=name=>command(357,['Dryland_Presentation',name,name,{}]);
  edited.push({id:replacementId,name:'Conversa substituta',trigger:0,switchId:1,list:[
    presentation('ObservationBegin'),command(117,[replacementId+1]),command(101,['',0,0,2,'Gorvak']),command(401,['Primeira fala da conversa substituta.']),
    command(101,['',0,0,2,'Gorvak']),command(401,['Última fala da conversa substituta.']),presentation('ObservationComplete'),end()
  ]});
  edited.push({id:replacementId+1,name:'Helper nativo sem metadados',trigger:0,switchId:1,list:[
    command(231,[92,'Dryland_Button',0,0,17,23,30,40,123,0]),command(122,[145,145,0,0,42]),command(230,[1]),end()
  ]});
  const originalId=edited.find(event=>event?.name==='Conversa — Gorvak').id;
  const call=edited[5].list.find(c=>c.code===117 && c.parameters[0]===originalId);
  assert.ok(call);call.parameters[0]=replacementId;
  await writeFile(path.join(directory,'data/CommonEvents.json'),JSON.stringify(edited));
  await startServer(t,directory);const browser=await openChrome(t);
  await firstPrologue(browser);
  for(const text of ['A chuva acompanha Ivaí','Minha mãe deixou registros','Irati escrevera']) {
    await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(text)}) && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0`);
    await browser.press('Enter',13);
  }
  await choices(browser,'formation');const before=await browser.evaluate('$gameSystem._dryland.campaign');
  await activate(browser,'formation',0);await activate(browser,'hero',0);
  for(const text of ['Gorvak · Ele/dele','Gorvak é um ferreiro']) {
    await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(text)}) && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0`);
    await browser.press('Enter',13);
  }
  for(const text of ['Primeira fala da conversa substituta.','Última fala da conversa substituta.']) {
    await browser.waitFor(`$gameMessage.allText() === ${JSON.stringify(text)} && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount === 0`);
    assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${replacementId})`),false);
    assert.deepEqual(await browser.evaluate('[$gameScreen.picture(92).x(),$gameScreen.picture(92).opacity(),$gameVariables.value(145)]'),[17,123,42]);
    assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
    await browser.press('Enter',13);
  }
  await pause(browser);assert.equal(await browser.evaluate('$gameMessage.allText()'),'Vivo/Viva · Fora do grupo');
  assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${replacementId})`),true);
  assert.equal(await browser.evaluate(`$gameSystem._drylandReadUnits.includes(${originalId})`),false);
  assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
  assert.deepEqual(browser.exceptions,[]);
});
