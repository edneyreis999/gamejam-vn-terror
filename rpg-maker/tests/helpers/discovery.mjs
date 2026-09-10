import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { formation, rules } from './formation.mjs';
import { accepted, complete, finishReading } from './campaign.mjs';
const gdd = JSON.parse(await readFile(new URL('../fixtures/gdd-competencies.json', import.meta.url), 'utf8'));
export const orders = [['physical', 'supernatural'], ['supernatural', 'physical']];
export function successfulRoute(state, route) {
  for (const heroId of ['H1', 'H2', 'H3']) if (!state.draftPartyIds.includes(heroId)) state = accepted(state, 'TOGGLE_HERO', { heroId });
  state = accepted(state, 'SELECT_DESTINATION', { dungeonId: route });
  state = finishReading(accepted(state, 'DEPART'));
  for (let position = 1; position <= (route === 'final' ? 6 : 5); position++) {
    state = complete(accepted(state, 'ENTER_DUNGEON'));
    const id = state.assignments[route][position - 1];
    const index = gdd.encounterPairs[id].findIndex(competency => state.partyIds.some(hero => gdd.heroPairs[hero].includes(competency)));
    assert.ok(index >= 0, 'Independent GDD matrix supplies a living provider.');
    state = accepted(state, 'CHOOSE_APPROACH', { approachId: `${id}-${index + 1}` });
    assert.equal(state.pendingOutcome.success, true);
    if (position !== (route === 'final' ? 6 : 5)) state = complete(state);
  }
  return state;
}
export function discoveryBoundary(order, index = 0) {
  let state = formation(0);
  for (let i = 0; i <= index; i++) {
    state = successfulRoute(state, order[i]);
    if (i !== index) state = finishReading(state);
  }
  assert.equal(state.phase, 'approach_result');
  return state;
}
export async function installDiscovery(browser, state) {
  assert.equal(rules.validateState(state).ok, true);
  const encounter = state.pendingOutcome.encounterId;
  const mapId = (encounter[0] === 'A' ? 6 : 14) + Number(encounter.slice(1));
  await browser.evaluate(`$gameSystem._dryland.campaign=${JSON.stringify(state)}; $gameTemp._drylandPersistence={status:'idle',lastSuccessfulSequence:null,lastError:null}; $gameMap._interpreter.clear(); $gameMessage.clear(); $gamePlayer.reserveTransfer(${mapId},10,7,2,0); SceneManager.goto(Scene_Map);`);
  await browser.waitFor(`$gameMap.mapId() === ${mapId} && $gameSystem._dryland.campaign.phase === 'approach_result' && $gameMessage.hasText() && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0 && !SceneManager._scene.isBusy()`);
}
export async function passage(browser, id) {
  await browser.waitFor(`$gameSystem._dryland.campaign.reading?.passageIds[$gameSystem._dryland.campaign.reading.index] === ${JSON.stringify(id)} && $gameMessage.hasText() && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0 && !SceneManager._scene.isBusy()`);
}
export async function continueSave(browser) {
  await browser.waitFor("$gameTemp._drylandPersistence?.status === 'saved'");
  await browser.evaluate('$gameMap._interpreter.clear(); $gameMessage.clear(); SceneManager.goto(Scene_Title);');
  await browser.waitFor("$gameMap.mapId() === 1 && $gameMessage.choices().includes('Continuar') && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
  assert.equal(await browser.evaluate('$gameMessage.choices()[SceneManager._scene._choiceListWindow.index()]'), 'Continuar');
  await browser.press('Enter', 13);
}
export async function observeDiscovery(browser) {
  await browser.evaluate(`(() => {
    window.discoveryEvents=[];
    for (const [owner,name] of [[Game_Screen.prototype,'showPicture'],[Game_Screen.prototype,'movePicture'],[Game_Screen.prototype,'erasePicture'],[AudioManager,'playSe']]) {
      const original=owner[name]; owner[name]=function(...args){
        if((name==='playSe' && args[0].name==='Item3') || (name!=='playSe' && args[0]>=2 && args[0]<=4)) discoveryEvents.push({name,args,frame:Graphics.frameCount,scene:$gameSystem._dryland.campaign.reading?.sceneId,pieces:$gameSystem._dryland.campaign.mapPieceIds.slice(),sequence:$gameSystem._dryland.campaign.sequence});
        return original.apply(this,args);
      };
    }
  })()`);
}
export async function assertBackgroundCoverage(browser) {
  const bounds = await browser.evaluate(`(() => {
    const sprite=SceneManager._scene._spriteset._pictureContainer.children.find(p=>p._pictureId===1);
    const b=sprite.getBounds(); return {x:b.x,y:b.y,width:b.width,height:b.height};
  })()`);
  assert.ok(bounds.x <= 0.001 && bounds.y <= 0.001 && bounds.x + bounds.width >= 1279.999 && bounds.y + bounds.height >= 719.999, JSON.stringify(bounds));
}
