import assert from 'node:assert/strict';
import { formation, rules } from './formation.mjs';
import { accepted, complete, finishReading, replayUntil } from './campaign.mjs';
import { successfulRoute } from './discovery.mjs';
export function councilBoundary(kind = 'collective') {
  if (kind === 'solo') return replayUntil('final-sixth-solo-council', state => state.phase === 'death_result' && state.dungeonId === 'final' && state.position === 6 && state.partyIds.length === 0);
  if (kind === 'bad') return replayUntil('final-sixth-total-loss', state => state.phase === 'death_result' && state.deadHeroIds.length === 8);
  let state = formation(0);
  if (kind === 'mixed') {
    for (const heroId of ['H1','H2','H4']) state = accepted(state, 'TOGGLE_HERO', { heroId });
    state = accepted(state, 'SELECT_DESTINATION', { dungeonId: 'physical' });
    state = complete(accepted(finishReading(accepted(state, 'DEPART')), 'ENTER_DUNGEON'));
    state = complete(accepted(state, 'CHOOSE_APPROACH', { approachId: 'A3-1' }));
    state = finishReading(accepted(state, 'SELECT_VICTIM', { heroId: 'H4' }));
    state = accepted(accepted(state, 'REQUEST_RETREAT'), 'CONFIRM_RETREAT');
  }
  for (const route of ['physical','supernatural']) state = finishReading(successfulRoute(state, route));
  for (const heroId of ['H1','H2','H3']) state = accepted(state, 'TOGGLE_HERO', { heroId });
  for (const heroId of ['H3','H1','H2']) state = accepted(state, 'TOGGLE_HERO', { heroId });
  return successfulRoute(state, 'final');
}
export function councilState(kind = 'collective') {
  let state = councilBoundary(kind);
  while (!['council','ending'].includes(state.phase)) state = complete(state);
  return state;
}
export function finalChoice(kind = 'collective') { assert.notEqual(kind, 'bad'); return finishReading(councilState(kind)); }
export async function installClosing(browser, state) {
  assert.equal(rules.validateState(state).ok, true);
  const encounter = state.pendingOutcome?.encounterId;
  const map = state.phase === 'ending' ? { reunite: 25, destroy: 26, bad: 27 }[state.endingId]
    : encounter ? (encounter[0] === 'A' ? 6 : 14) + Number(encounter.slice(1)) : 23;
  await browser.evaluate(`$gameSystem._dryland.campaign=${JSON.stringify(state)};$gameTemp._drylandPersistence={status:'idle',lastSuccessfulSequence:null,lastError:null};$gameMap._interpreter.clear();$gameMessage.clear();$gamePlayer.reserveTransfer(${map},10,7,2,0);SceneManager.goto(Scene_Map);`);
  await browser.waitFor(`$gameMap.mapId()===${map} && SceneManager._scene._messageWindow && !SceneManager._scene.isBusy() && ($gameMessage.hasText() || $gameMessage.isChoice())`);
}
export async function closingReady(browser) {
  await browser.waitFor(`(() => {
    const s=$gameSystem._dryland.campaign;
    const target=s.phase==='ending'?{reunite:25,destroy:26,bad:27}[s.endingId]:s.phase==='memorial'||s.phase==='campaign_complete'?28:s.phase==='epilogue'?28+Number(s.reading.sceneId.split('.')[1].slice(1)):s.phase==='council'||s.phase==='final_choice'?23:null;
    return (!target || $gameMap.mapId()===target) && SceneManager._scene._messageWindow && !SceneManager._scene.isBusy() && (s.phase==='campaign_complete' || ($gameMessage.hasText() && SceneManager._scene._messageWindow.pause && SceneManager._scene._messageWindow._waitCount===0));
  })()`);
}
export async function observeClosing(browser) {
  await browser.evaluate(`(() => {
    window.closingLog={maps:[],saves:[]};
    const setup=Game_Map.prototype.setup;
    Game_Map.prototype.setup=function(id){closingLog.maps.push(id);return setup.call(this,id);};
    const save=DataManager.saveGame;
    DataManager.saveGame=function(id){const s=$gameSystem._dryland.campaign;closingLog.saves.push({id,phase:s.phase,sequence:s.sequence,endingId:s.endingId});return save.call(this,id);};
  })()`);
}
export async function finishNativeClosing(browser) {
  const seen=[];
  for(let count=0;count<80;count++){
    await closingReady(browser);
    const state=await browser.evaluate('$gameSystem._dryland.campaign');
    if(state.phase==='campaign_complete')return {state,seen};
    assert.ok(['ending','memorial','epilogue'].includes(state.phase), state.phase);
    seen.push({phase:state.phase,sceneId:state.reading.sceneId,passageId:state.reading.passageIds[state.reading.index],map:await browser.evaluate('$gameMap.mapId()')});
    await browser.press('Enter',13);
  }
  assert.fail('Native closing did not reach its terminal reading boundary.');
}
