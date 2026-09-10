import assert from 'node:assert/strict';
import { openChrome, startServer } from './native-chrome.mjs';
import { rules } from './formation.mjs';
import { frames } from './closing-presentation.mjs';
export const state = browser => browser.evaluate('$gameSystem._dryland.campaign');
export const qa = browser => browser.evaluate('expeditionQA.snapshot()');
export const saveBytes = browser => browser.evaluate("StorageManager.loadZip('file0')");
export async function entry(t) {
 await startServer(t);const browser=await openChrome(t);
 await browser.waitFor("window.expeditionQA&&window.$gameMessage&&$gameMessage.choices().includes('Jogar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 return browser;
}
export async function click(browser,x,y){
 await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',buttons:1,clickCount:1});await frames(browser,2);
 await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',buttons:0,clickCount:1});await frames(browser,3);
}
export async function hidden(browser,value){
 await browser.waitFor(`Boolean($gameTemp._drylandInterfaceHidden)===${value}&&SceneManager._scene._messageWindow.scale.x===${value?0:1}`);
 await frames(browser,3);
}
export async function installPhase(browser,campaign){
 assert.equal(rules.validateState(campaign).ok,true);
 const encounter=campaign.pendingOutcome?.encounterId||campaign.assignments[campaign.dungeonId]?.[campaign.position-1];
 const map=campaign.phase==='formation'?3:campaign.phase==='ending'?{reunite:25,destroy:26,bad:27}[campaign.endingId]:['memorial','campaign_complete'].includes(campaign.phase)?28:campaign.phase==='epilogue'?28+Number(campaign.reading.sceneId.split('.')[1].slice(1)):['council','final_choice'].includes(campaign.phase)?23:encounter?(encounter[0]==='A'?6:14)+Number(encounter.slice(1)):4;
 await browser.evaluate(`$gameSystem._dryland.campaign=${JSON.stringify(campaign)};$gameTemp._drylandPersistence={status:'idle',lastSuccessfulSequence:null,lastError:null};delete $gameTemp._drylandLastRejection;$gameMap._interpreter.clear();$gameMessage.clear();$gamePlayer.reserveTransfer(${map},10,7,2,0);SceneManager.goto(Scene_Map);`);
 await browser.waitFor(`$gameMap.mapId()===${map}&&SceneManager._scene._messageWindow&&!SceneManager._scene.isBusy()&&($gameMessage.hasText()||$gameMessage.isChoice())`);
}
export async function assertHiddenPictures(browser,ids){
 const shown=await browser.evaluate(`SceneManager._scene._spriteset._pictureContainer.children.filter(s=>${JSON.stringify(ids)}.includes(s._pictureId)&&s.picture()).map(s=>({id:s._pictureId,visible:s.worldVisible}))`);
 assert.ok(shown.length);assert.ok(shown.every(s=>s.visible===false),JSON.stringify(shown));
 assert.equal(await browser.evaluate('SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===1).worldVisible'),true);
}
