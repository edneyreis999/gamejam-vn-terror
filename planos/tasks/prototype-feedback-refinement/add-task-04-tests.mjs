import { readFileSync, writeFileSync } from 'node:fs';
const root='rpg-maker/tests/';
const manifest=JSON.parse(readFileSync(root+'test-manifest.json','utf8'));
manifest.tasks['prototype-feedback-refinement'].push('UT-078','IT-087');
writeFileSync(root+'test-manifest.json',JSON.stringify(manifest,null,2)+'\n');
const file=root+'suites/formation.mjs';
writeFileSync(file,readFileSync(file,'utf8')+String.raw`

canonicalCase('UT-078', 'preparation introduction is guarded per expedition and old saves normalize only an absent boolean', () => {
  const initial=formation();
  assert.equal(initial.preparationIntroductionCompleted,false);
  const completed=act(initial,'COMPLETE_PREPARATION_INTRODUCTION');
  assert.equal(completed.ok,true);
  assert.equal(completed.state.preparationIntroductionCompleted,true);
  assert.deepEqual(completed.effects,[]);
  assert.equal(rules.dispatch(completed.state,{type:'COMPLETE_PREPARATION_INTRODUCTION',expectedSequence:initial.sequence}).error.code,'stale_action');
  rejected(completed.state,'COMPLETE_PREPARATION_INTRODUCTION',{},'invalid_transition');
  rejected(rules.createReadyState(),'COMPLETE_PREPARATION_INTRODUCTION',{},'invalid_transition');
  let state=completed.state;
  for(const heroId of ['H1','H2','H3']) state=act(state,'TOGGLE_HERO',{heroId}).state;
  state=act(state,'SELECT_DESTINATION',{dungeonId:'physical'}).state;
  assert.equal(state.preparationIntroductionCompleted,true);
  state=act(state,'DEPART').state;
  assert.equal(state.preparationIntroductionCompleted,false);
  while(state.reading) state=act(state,'COMPLETE_PASSAGE',{passageId:state.reading.passageIds[state.reading.index]}).state;
  state=act(state,'ENTER_DUNGEON').state;
  while(state.reading) state=act(state,'COMPLETE_PASSAGE',{passageId:state.reading.passageIds[state.reading.index]}).state;
  state=act(state,'REQUEST_RETREAT').state;
  state=act(state,'CONFIRM_RETREAT').state;
  assert.equal(state.phase,'formation');
  assert.equal(state.preparationIntroductionCompleted,false);
  const legacy=structuredClone(initial);delete legacy.preparationIntroductionCompleted;
  assert.deepEqual(rules.normalizeState(legacy),initial);
  assert.equal(Object.hasOwn(legacy,'preparationIntroductionCompleted'),false);
  assert.deepEqual(rules.normalizeState(JSON.parse(JSON.stringify(completed.state))),completed.state);
  for(const value of [null,0,1,'false',{},[]]) {
    const bad={...initial,preparationIntroductionCompleted:value};
    assert.equal(rules.validateState(rules.normalizeState(bad)).ok,false);
  }
});

canonicalCase('IT-087', 'party first map introduction and native file restoration retain the exact preparation boundary', {timeout:150000}, async t => {
  const browser=await tavern(t);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.isCommandEnabled(8)'),false);
  const prepared=selected();
  await installFixture(browser,prepared);
  const savedBefore=await browser.evaluate('DataManager.saveGame($gameSystem.savefileId()).then(()=>StorageManager.loadZip("file"+$gameSystem.savefileId()))');
  await activate(browser,'formation',8);await pause(browser);
  assert.equal((await snapshot(browser)).preparationIntroductionCompleted,false);
  assert.equal((await browser.evaluate('$gameMessage.allText()')).replace(/\s+/g,' '),'Bem, agora que nossa equipe está completa, vamos traçar nossa rota!');
  await browser.press('Enter',13);await choices(browser,'destinations');
  assert.equal((await snapshot(browser)).preparationIntroductionCompleted,true);
  assert.equal(await browser.evaluate('StorageManager.loadZip("file"+$gameSystem.savefileId())'),savedBefore,'Introduction adds no save');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.isCommandEnabled(4)'),false);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.isCommandEnabled(2)'),false);
  await browser.screenshot('docs/qa/evidence/prototype-feedback-refinement/task-04/map-unselected.png');
  const beforeSelect=await snapshot(browser);
  await activate(browser,'destinations',0);await choices(browser,'destinations');
  const afterSelect=await snapshot(browser);
  assert.equal(afterSelect.phase,'formation');assert.equal(afterSelect.selectedDungeonId,'physical');
  assert.equal(afterSelect.rngState,beforeSelect.rngState);assert.deepEqual(afterSelect.draftPartyIds,beforeSelect.draftPartyIds);
  await browser.screenshot('docs/qa/evidence/prototype-feedback-refinement/task-04/map-selected.png');
  await browser.press('Escape',27);await choices(browser,'formation');
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),8);
  await activate(browser,'formation',8);await choices(browser,'destinations');
  assert.deepEqual(await snapshot(browser),afterSelect);
  await browser.press('Escape',27);await choices(browser,'formation');
  // The native provider loads the exact on-disk before-reading campaign.
  await browser.evaluate('DataManager.loadGame($gameSystem.savefileId())');
  assert.equal((await snapshot(browser)).preparationIntroductionCompleted,false);
  await browser.evaluate('SceneManager.goto(Scene_Map)');await choices(browser,'formation');
  await activate(browser,'formation',8);await pause(browser);await browser.press('Enter',13);await choices(browser,'destinations');
  await browser.press('Escape',27);await choices(browser,'formation');
  const savedAfter=await snapshot(browser);
  await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');
  await browser.evaluate('DataManager.loadGame($gameSystem.savefileId())');
  assert.deepEqual(await snapshot(browser),savedAfter);
  await browser.evaluate('SceneManager.goto(Scene_Map)');await choices(browser,'formation');
  await activate(browser,'formation',8);await choices(browser,'destinations');
  await activate(browser,'destinations',0);await choices(browser,'destinations');
  await activate(browser,'destinations',4);
  await browser.waitFor('$gameMap.mapId()===4&&$gameSystem._dryland.campaign.phase==="dungeon_intro"&&$gameTemp._drylandPersistence.status==="saved"');
  assert.equal((await snapshot(browser)).preparationIntroductionCompleted,false);
  assert.deepEqual(browser.exceptions,[]);
});
`);
