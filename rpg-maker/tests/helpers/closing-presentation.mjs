import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { activate, choices, formation, heroes } from './formation.mjs';
import { accepted, complete, finishReading } from './campaign.mjs';
import { successfulRoute } from './discovery.mjs';
import { closingReady, councilBoundary, finalChoice, installClosing } from './closing.mjs';
const gdd = JSON.parse(await readFile(new URL('../fixtures/gdd-competencies.json', import.meta.url), 'utf8'));
export const heroNames = ['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
export const campaignSnapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
export async function beginEnding(browser, kind, ending) {
  if (kind === 'bad') {
    await installClosing(browser, councilBoundary('bad'));
    for (let i = 0; i < 5 && (await campaignSnapshot(browser)).phase !== 'ending'; i++) {
      await closingReady(browser); await browser.press('Enter', 13);
    }
  } else {
    await installClosing(browser, finalChoice(kind));
    await activate(browser, 'ending', ending === 'reunite' ? 0 : 1);
  }
  await closingReady(browser);
  assert.equal((await campaignSnapshot(browser)).phase, 'ending');
  await browser.waitFor("$gameTemp._drylandPersistence.status==='saved'");
  return campaignSnapshot(browser);
}
export async function finishPhase(browser, phase) {
  for (let i = 0; i < 30 && (await campaignSnapshot(browser)).phase === phase; i++) {
    await closingReady(browser); await browser.press('Enter', 13);
  }
  assert.notEqual((await campaignSnapshot(browser)).phase, phase);
  await closingReady(browser);
}
export async function observePresentation(browser) {
  await browser.evaluate(`(() => {
    window.closingPresentation={events:[],ticks:[],returns:0,captions:{}};
    const call=PluginManager.callCommand;
    PluginManager.callCommand=function(interpreter,plugin,command,args){
      if(plugin==='Dryland_EventBridge'&&command==='Observe'&&/^(memorial|credits)/.test(args.target)) closingPresentation.events.push({type:args.target,frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence});
      if(plugin==='VisuMZ_1_MessageCore'&&command==='PictureTextChange'){
        const ids=JSON.parse(args['PictureIDs:arraynum']);
        for(const id of ids)if(id>=30&&id<=37&&$gameSystem._dryland.campaign.phase==='memorial')closingPresentation.captions[id]=JSON.parse(args['upperleft:json']);
      }
      return call.call(this,interpreter,plugin,command,args);
    };
    const move=Game_Screen.prototype.movePicture;
    Game_Screen.prototype.movePicture=function(...args){
      if($gameSystem._dryland.campaign.phase==='memorial')closingPresentation.events.push({type:'move',args,frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence});
      return move.apply(this,args);
    };
    const update=Game_Screen.prototype.updatePictures;
    Game_Screen.prototype.updatePictures=function(){
      update.call(this);
      if($gameTemp._drylandMemorial&&!$gameTemp._drylandMemorial.ready)closingPresentation.ticks.push({
        frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence,
        overlap:SceneManager._scene._spriteset?._pictureContainer.children.filter(s=>s._drylandGhost&&s._drylandGhost.opacity>0&&s.opacity>0).length
      });
    };
    const go=SceneManager.goto;
    SceneManager.goto=function(scene){if(scene===Scene_Title)closingPresentation.returns++;return go.call(this,scene);};
  })()`);
}
export async function resetPresentation(browser) {
  await browser.evaluate('closingPresentation={events:[],ticks:[],returns:0,captions:{}};');
}
export async function memorialReady(browser) {
  await browser.waitFor("$gameSystem._dryland.campaign.phase==='memorial'&&$gameMap.mapId()===28&&$gameTemp._drylandMemorial?.ready&&$gameMessage.hasText()&&SceneManager._scene._messageWindow?.pause&&SceneManager._scene._messageWindow._waitCount===0&&!SceneManager._scene.isBusy()");
}
export async function pictureRows(browser) {
  return browser.evaluate(`Array.from({length:8},(_,i)=>{
    const p=$gameScreen.picture(10+i),g=$gameScreen.picture(22+i),t=$gameScreen.picture(30+i);
    const sprite=id=>SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id);
    const bounds=id=>{const b=sprite(id).getBounds();return {x:b.x,y:b.y,width:b.width,height:b.height};};
    return {id:'H'+(i+1),name:p?.name()||null,grave:g?.name()||null,caption:closingPresentation.captions[30+i]||null,
      opacity:p?.opacity(),crop:p?._drylandCrop,portrait:p?bounds(10+i):null,stone:g?bounds(22+i):null,text:t?bounds(30+i):null};
  })`);
}
export async function creditsReady(browser) {
  await choices(browser,'credits');
  assert.equal(await browser.evaluate('$gameScreen.picture(41)?.name()'),'Dryland_Button');
  assert.equal((await campaignSnapshot(browser)).phase,'campaign_complete');
}
export async function titleReady(browser) {
  await browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
}
export async function frames(browser, count) {
  await browser.evaluate(`new Promise(resolve=>{let n=${count};const tick=()=>--n<=0?resolve():requestAnimationFrame(tick);requestAnimationFrame(tick);})`);
}
// Legal actions produce additional climax parties; no campaign facts are
// synthesized merely to make an otherwise ineligible epilogue appear.
export function councilWithHeroes(party) {
  for (let seed=0;seed<32;seed++) {
    let state=formation(seed);
    for(const route of ['physical','supernatural'])state=finishReading(successfulRoute(state,route));
    for(const heroId of state.draftPartyIds)state=accepted(state,'TOGGLE_HERO',{heroId});
    for(const heroId of party)state=accepted(state,'TOGGLE_HERO',{heroId});
    state=finishReading(accepted(accepted(state,'SELECT_DESTINATION',{dungeonId:'final'}),'DEPART'));
    let valid=true;
    for(let pos=1;pos<=6;pos++){
      state=complete(accepted(state,'ENTER_DUNGEON'));
      const id=state.assignments.final[pos-1],index=gdd.encounterPairs[id].findIndex(c=>state.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
      if(index<0){valid=false;break;}
      state=complete(accepted(state,'CHOOSE_APPROACH',{approachId:`${id}-${index+1}`}));
    }
    if(!valid)continue;
    assert.deepEqual(state.climaxPartyIds,heroes.filter(id=>party.includes(id)));
    return state;
  }
  assert.fail('No legal all-success boundary found for the requested witness party.');
}

export function endingWithHeroes(party) {
  return accepted(finishReading(councilWithHeroes(party)),'CHOOSE_ENDING',{ending:'destroy'});
}

export function councilAfterLosses(survivors) {
  const recipes = {
    'H8': [['A7-1'],['A5-1','H7'],['B8-2'],['B1-1'],['B2-2','H6'],['A8-1']],
    'H7,H8': [['A7-1'],['A5-2'],['B8-1'],['B1-2','H6'],['B2-2'],['A8-1']]
  };
  const recipe=recipes[survivors.join(',')];
  assert.ok(recipe,'Requested survivors need a recorded legal fixture recipe.');
  let state=formation(0);
  for(const route of ['physical','supernatural'])state=finishReading(successfulRoute(state,route));
  for(const heroId of state.draftPartyIds)state=accepted(state,'TOGGLE_HERO',{heroId});
  for(const heroId of ['H6','H7','H8'])state=accepted(state,'TOGGLE_HERO',{heroId});
  state=finishReading(accepted(accepted(state,'SELECT_DESTINATION',{dungeonId:'final'}),'DEPART'));
  for(const [approachId,victim] of recipe){
    state=complete(accepted(state,'ENTER_DUNGEON'));
    state=complete(accepted(state,'CHOOSE_APPROACH',{approachId}));
    if(victim)state=finishReading(accepted(state,'SELECT_VICTIM',{heroId:victim}));
  }
  assert.equal(state.phase,'council');assert.deepEqual(state.climaxPartyIds,survivors);
  return state;
}
