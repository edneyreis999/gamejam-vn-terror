import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {canonicalCase} from '../helpers/canonical-cases.mjs';
import {rules, catalog, activate, choices, openDestinations} from '../helpers/formation.mjs';
const require=createRequire(import.meta.url);
require('../../The Dryland Drowned/js/plugins/Dryland_6_RouteMap.js');
const map=globalThis.DrylandRouteMap;
canonicalCase('UT-079','route graphs preserve visit actions, return restrictions and saved position',()=>{
 const event=(id,x,y,note)=>({id,x,y,note});
 const graph=map.graph([event(1,0,0,'<RouteNode: a><RouteLinks: b,c>'),event(2,3,0,'<RouteNode: b><RouteArrival: always>'),event(3,0,3,'<RouteNode: c><RouteReturn: false>')]);
 let state=map.begin(graph,'a');
 assert.equal(map.canMove(graph,state,'b'),true);
 assert.equal(map.arrive(graph,state,'b'),true);
 assert.equal(map.arrive(graph,state,'a'),false);
 assert.equal(map.arrive(graph,state,'b'),true);
 state=JSON.parse(JSON.stringify(state));
 assert.equal(state.current,'b');assert.equal(map.arrive(graph,state,'a'),false);
 assert.equal(map.arrive(graph,state,'c'),true);
 assert.equal(map.canMove(graph,state,'a'),false);
 assert.throws(()=>map.arrive(graph,state,'a'),/unavailable/);
 state=map.begin(graph,'a');assert.equal(map.arrive(graph,state,'c'),true);
 assert.throws(()=>map.graph([event(1,0,0,'<RouteNode: a><RouteLinks: z>')]),/invalid link/);
 assert.throws(()=>map.graph([event(1,0,0,'<RouteNode: a><RouteLinks: b>'),event(2,1,1,'<RouteNode: b>')]),/diagonal/);
 assert.throws(()=>map.graph([event(1,0,0,'<RouteNode: a>'),event(2,3,0,'<RouteNode: a>')]),/duplicate/);
 assert.throws(()=>map.graph([event(1,0,0,'<RouteNode: a><RouteLinks: b,c,d,e,f>'),...['b','c','d','e','f'].map((id,i)=>event(i+2,i+1,0,`<RouteNode: ${id}>`))]),/four links/);
});
canonicalCase('UT-080','all routes wait for arrival before revelation, campfires and rewards',()=>{
 let state=rules.createReadyState();
 const go=(type,fields={})=>{
  const result=rules.dispatch(state,{type,...fields,expectedSequence:state.sequence});
  assert.equal(result.ok,true,JSON.stringify(result.error));state=result.state;
  assert.deepEqual(rules.validateState(state),{ok:true,violations:[]});
 };
 const read=()=>{while(state.reading)go('COMPLETE_PASSAGE',{passageId:state.reading.passageIds[state.reading.index]});};
 go('BEGIN',{seed:0});read();
 for(const heroId of ['H1','H2','H3'])go('TOGGLE_HERO',{heroId});
 for(const dungeonId of ['physical','supernatural','final']) {
  go('SELECT_DESTINATION',{dungeonId});go('DEPART');read();
  assert.equal(state.phase,'route_map');assert.equal(state.routeCursor,0);
  const total=dungeonId==='final'?6:5;
  for(let cursor=1;cursor<=total+3;cursor++) {
   assert.equal(state.phase,'route_map');
   state=JSON.parse(JSON.stringify(state)); // Native serialization cannot consume the pending arrival.
   const before=structuredClone(state), rng=state.rngState;
   assert.equal(rules.dispatch(state,{type:'ENTER_DUNGEON',expectedSequence:state.sequence}).ok,false);
   assert.deepEqual(state,before);
   go('ARRIVE_ROUTE_NODE');assert.equal(state.routeCursor,cursor);assert.equal(state.rngState,rng);
   const duplicate=rules.dispatch(state,{type:'ARRIVE_ROUTE_NODE',expectedSequence:before.sequence});
   assert.equal(duplicate.ok,false);assert.deepEqual(duplicate.state,state);
   if([3,6].includes(cursor)) {
    assert.equal(state.phase,'camp_arrival');read();go('FINISH_CAMP_ARRIVAL');go('CONTINUE_FROM_CAMP');
   } else if(cursor===total+3) {
    assert.equal(state.phase,dungeonId==='final'?'council':'dungeon_complete');
    if(dungeonId!=='final')read();
   } else {
    assert.equal(state.phase,'dungeon_intro');go('ENTER_DUNGEON');read();
    const id=state.assignments[dungeonId][state.position-1];
    const approach=catalog.encounters[id].approaches.find(a=>state.partyIds.some(h=>catalog.heroes[h].competencyIds.includes(a.competencyId)));
    assert.ok(approach);go('CHOOSE_APPROACH',{approachId:approach.id});read();
    assert.equal(state.phase,'route_map');
   }
  }
 }
 assert.equal(new Set(Object.values(state.assignments).flat()).size,16);
});

import {nativeEncounter} from './encounters.mjs';
import {advanceRoute, readRoutePassage} from '../helpers/route-map.mjs';
import {chooseTitle, selectFile} from '../helpers/native-chrome.mjs';
canonicalCase('IT-086','departure map survives Continue without revealing or repeating an arrival',{timeout:180000},async t=>{
 const browser=await nativeEncounter(t,{stopAtMap:true,reduced:true});
 const before=await browser.evaluate('$gameSystem._dryland.campaign');
 assert.equal(before.routeCursor,0);assert.equal(before.assignments.physical.every(x=>x===null),true);
 const start=await browser.evaluate('(()=>{const n=DrylandRouteMap.nodes().find(n=>n.id==="c0"),b=Graphics.app.view.getBoundingClientRect();return {x:b.x+(n.x+0.5)*48*b.width/Graphics.width,y:b.y+(n.y+0.5)*48*b.height/Graphics.height};})()');
 await browser.call('Input.dispatchMouseEvent',{type:'mouseMoved',...start});
 await browser.evaluate('new Promise(r=>requestAnimationFrame(r))');
 await browser.press('ArrowRight',39);
 assert.equal(await browser.evaluate('SceneManager._scene._routeFocus'),'c1');
 await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',...start,button:'left',buttons:1,clickCount:1});
 await browser.evaluate('new Promise(r=>requestAnimationFrame(r))');
 await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',...start,button:'left',buttons:0,clickCount:1});
 await browser.evaluate('new Promise(r=>requestAnimationFrame(r))');
 assert.equal(await browser.evaluate('SceneManager._scene._routeFocus'),'c0','A click uses its location even after keyboard focus moved');
 assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
 await browser.screenshot('.artifacts/route-map/departure.png');
 await browser.call('Page.reload');
 await browser.waitFor("window.$gameMessage && $gameMessage.choices().some(c=>c.includes('choice.title.continue')) && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()");
 await chooseTitle(browser,'choice.title.continue');await selectFile(browser,1);
 await browser.waitFor("$gameMap.mapId()===47 && !$gameMap.isEventRunning() && !SceneManager._scene.isBusy()");
 assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
 assert.equal(await browser.evaluate('DrylandRouteMap.state().current'),'c0');
 await advanceRoute(browser);
 await browser.waitFor("$gameSystem._dryland.campaign.phase==='encounter_intro' && $gameMap.mapId()>=7 && $gameMap.mapId()<=14");
 const after=await browser.evaluate('$gameSystem._dryland.campaign');
 assert.equal(after.routeCursor,1);assert.equal(after.assignments.physical.filter(Boolean).length,1);
 for (let position=1; position<=2; position++) {
  await browser.waitFor("$gameSystem._dryland.campaign.phase==='encounter_intro'");
  await readRoutePassage(browser,'encounter_intro');
  await choices(browser,'approaches');
  const state=await browser.evaluate('$gameSystem._dryland.campaign');
  const id=state.assignments.physical[position-1];
  const index=catalog.encounters[id].approaches.findIndex(a=>state.partyIds.some(h=>catalog.heroes[h].competencyIds.includes(a.competencyId)));
  await activate(browser,'approaches',index);
  await browser.evaluate(`{window.releaseRouteSave=null;const original=StorageManager.saveObject;StorageManager.saveObject=function(name,data){if($gameMap.mapId()!==47)return original.call(this,name,data);StorageManager.saveObject=original;return new Promise((resolve,reject)=>{window.releaseRouteSave=()=>original.call(this,name,data).then(resolve,reject);});};}`);
  await readRoutePassage(browser,'approach_result');
  await browser.waitFor("$gameMap.mapId()===47 && typeof releaseRouteSave==='function'");
  const waiting=await browser.evaluate('({campaign:$gameSystem._dryland.campaign,node:DrylandRouteMap.state().current})');
  await browser.press('ArrowRight',39);await browser.press('Enter',13);
  assert.deepEqual(await browser.evaluate('({campaign:$gameSystem._dryland.campaign,node:DrylandRouteMap.state().current})'),waiting);
  assert.equal(await browser.evaluate('$gameMap.isEventRunning()'),true);
  await browser.evaluate('releaseRouteSave()');
  await browser.waitFor("$gameMap.mapId()===47 && !$gameMap.isEventRunning() && $gameTemp._drylandPersistence.status==='saved'");
  const returned=await browser.evaluate('$gameSystem._dryland.campaign');
  assert.equal(returned.routeCursor,position);assert.equal(returned.progress.physical,position);
  assert.equal(returned.assignments.physical.filter(Boolean).length,position);
  assert.equal(await browser.evaluate('DrylandRouteMap.canMove(DrylandRouteMap.nodes(),DrylandRouteMap.state(),"c0")'),false);
  if(position===2) {
   const p=await browser.evaluate('(()=>{const n=DrylandRouteMap.nodes().find(n=>n.id==="c2"),b=Graphics.app.view.getBoundingClientRect();return {x:b.x+(n.x+0.5)*48*b.width/Graphics.width,y:b.y+(n.y+0.5)*48*b.height/Graphics.height};})()');
   await browser.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});
   await browser.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
   assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),returned,'Hover does not mutate campaign or RNG');
   await browser.screenshot('.artifacts/route-map/second-trap.png');
  }
  await advanceRoute(browser,{keyboard:true});
 }
 await readRoutePassage(browser,'camp_arrival');await choices(browser,'camp');
 const camp=await browser.evaluate('$gameSystem._dryland.campaign');
 assert.equal(camp.routeCursor,3);assert.equal(camp.position,2);
 await activate(browser,'camp','$[ui.camp.retreat]');await choices(browser,'formation');
 await openDestinations(browser);await activate(browser,'destinations',0);
 await readRoutePassage(browser,'dungeon_intro');
 await browser.waitFor("$gameMap.mapId()===47 && !$gameMap.isEventRunning() && !SceneManager._scene.isBusy()");
 const retry=await browser.evaluate('$gameSystem._dryland.campaign');
 assert.equal(retry.routeCursor,0);assert.equal(retry.routeAttempt,camp.routeAttempt+1);
 assert.deepEqual(retry.assignments,camp.assignments);assert.equal(retry.rngState,camp.rngState);
 assert.deepEqual(await browser.evaluate('DrylandRouteMap.state().visited'),['c0']);
 await advanceRoute(browser);
 await browser.waitFor("$gameSystem._dryland.campaign.phase==='encounter_intro' && $gameMap.mapId()!==47");
 assert.deepEqual((await browser.evaluate('$gameSystem._dryland.campaign')).assignments,camp.assignments);
 assert.deepEqual(browser.exceptions,[]);
});

canonicalCase('IT-087','all three native routes reach their destination only after the final node click',{timeout:360000},async t=>{
 const browser=await nativeEncounter(t,{stopAtMap:true,reduced:true});
 for (const dungeonId of ['physical','supernatural','final']) {
  const total=dungeonId==='final'?6:5;
  await browser.waitFor("$gameMap.mapId()===47 && !$gameMap.isEventRunning()");
  assert.equal((await browser.evaluate('$gameSystem._dryland.campaign')).dungeonId,dungeonId);
  const routeAudio=await browser.evaluate('({bgm:AudioManager._currentBgm?.name,bgs:AudioManager._currentBgs?.name})');
  for(let cursor=1;cursor<=total+3;cursor++) {
   const before=await browser.evaluate('$gameSystem._dryland.campaign');
   assert.equal(before.completedDungeonIds.includes(dungeonId),false);
   if(cursor===total+3) {
    await browser.waitFor("$gameMap.mapId()===47 && !$gameMap.isEventRunning() && !SceneManager._scene.isBusy()");
    await browser.screenshot('.artifacts/route-map/'+dungeonId+'-destination.png');
   }
   await advanceRoute(browser);
   if([3,6].includes(cursor)) {
    await readRoutePassage(browser,'camp_arrival');await choices(browser,'camp');
    await activate(browser,'camp','$[ui.camp.continue]');
    await browser.waitFor("$gameMap.mapId()===47 && !$gameMap.isEventRunning()");
    assert.deepEqual(await browser.evaluate('({bgm:AudioManager._currentBgm?.name,bgs:AudioManager._currentBgs?.name})'),routeAudio,'Leaving camp restores route audio');
   } else if(cursor===total+3) {
    await browser.waitFor(`$gameSystem._dryland.campaign.phase===${JSON.stringify(dungeonId==='final'?'council':'dungeon_complete')}`);
   } else {
    await browser.waitFor("$gameSystem._dryland.campaign.phase==='encounter_intro'");
    await readRoutePassage(browser,'encounter_intro');await choices(browser,'approaches');
    const state=await browser.evaluate('$gameSystem._dryland.campaign'),id=state.assignments[dungeonId][state.position-1];
    const index=catalog.encounters[id].approaches.findIndex(a=>state.partyIds.some(h=>catalog.heroes[h].competencyIds.includes(a.competencyId)));
    await activate(browser,'approaches',index);await readRoutePassage(browser,'approach_result');
   }
  }
  if(dungeonId==='final')break;
  await readRoutePassage(browser,'dungeon_complete');await choices(browser,'formation');
  await openDestinations(browser);await activate(browser,'destinations',dungeonId==='physical'?1:2);
  await readRoutePassage(browser,'dungeon_intro');
 }
 await browser.waitFor("$gameMap.mapId()===23 && $gameMessage.hasText()");
 const state=await browser.evaluate('$gameSystem._dryland.campaign');
 assert.deepEqual(state.completedDungeonIds,['physical','supernatural','final']);
 assert.equal(new Set(Object.values(state.assignments).flat()).size,16);
 assert.deepEqual(browser.exceptions,[]);
});
