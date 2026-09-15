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
      if(plugin==='VisuMZ_1_MessageCore'&&command==='PictureTextChange'){
        const ids=JSON.parse(args['PictureIDs:arraynum']);
        for(const id of ids)if(id>=30&&id<=37&&$gameSystem._dryland.campaign.phase==='memorial')closingPresentation.captions[id]=SceneManager._scene._messageWindow.convertEscapeCharacters(JSON.parse(args['upperleft:json'])).replace(/\\x1bWrapBreak\\[0\\]/gi,' ');
      }
      return call.call(this,interpreter,plugin,command,args);
    };
    const common=Game_Interpreter.prototype.command117;
    Game_Interpreter.prototype.command117=function(params){
      if(params[0]===59)closingPresentation.events.push({type:'memorial',frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence});
      return common.call(this,params);
    };
    const set=Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue=function(id,value){
      if(id===46&&value)closingPresentation.events.push({type:'memorial_ready',frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence});
      return set.call(this,id,value);
    };
    const move=Game_Screen.prototype.movePicture;
    Game_Screen.prototype.movePicture=function(...args){
      if($gameSystem._dryland.campaign.phase==='memorial')closingPresentation.events.push({type:'move',args,frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence});
      return move.apply(this,args);
    };
    const update=Game_Screen.prototype.updatePictures;
    Game_Screen.prototype.updatePictures=function(){
      update.call(this);
      if($gameSystem._dryland.campaign.phase==='memorial'&&!$gameSwitches.value(46))closingPresentation.ticks.push({
        frame:Graphics.frameCount,sequence:$gameSystem._dryland.campaign.sequence,
        overlap:Array.from({length:8},(_,i)=>i).filter(i=>$gameScreen.picture(46+i)?.opacity()>0&&$gameScreen.picture(10+i)?.opacity()>0).length
      });
    };
    const scrollStart=Window_ScrollText.prototype.startMessage;
    Window_ScrollText.prototype.startMessage=function(){scrollStart.call(this);closingPresentation.events.push({type:'credits',frame:Graphics.frameCount,height:this._allTextHeight,speed:$gameMessage.scrollSpeed(),noFast:$gameMessage.scrollNoFast()});};
    const scrollEnd=Window_ScrollText.prototype.terminateMessage;
    Window_ScrollText.prototype.terminateMessage=function(){closingPresentation.events.push({type:'credits_finish',frame:Graphics.frameCount,y:this._scrollY,height:this._allTextHeight,natural:this._scrollY>=this._allTextHeight});return scrollEnd.call(this);};
    const go=SceneManager.goto;
    SceneManager.goto=function(scene){if(scene===Scene_Title)closingPresentation.returns++;return go.call(this,scene);};
  })()`);
}
export async function resetPresentation(browser) {
  await browser.evaluate('closingPresentation={events:[],ticks:[],returns:0,captions:{}};');
}
export async function memorialReady(browser) {
  await browser.waitFor("$gameSystem._dryland.campaign.phase==='memorial'&&$gameMap.mapId()===28&&$gameSwitches.value(46)&&$gameMessage.hasText()&&SceneManager._scene._messageWindow?.pause&&SceneManager._scene._messageWindow._waitCount===0&&!SceneManager._scene.isBusy()");
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
  await browser.waitFor("SceneManager._scene._scrollTextWindow?._text && SceneManager._scene._scrollTextWindow.visible && SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===41)?.bitmap?.isReady()");
  assert.deepEqual(await browser.evaluate('[$gameMessage.scrollSpeed(),$gameMessage.scrollNoFast()]'),[2,false]);
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
