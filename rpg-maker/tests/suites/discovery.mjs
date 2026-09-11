import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { choices, rules, tavern } from '../helpers/formation.mjs';
import { complete, finishReading, rejectUnchanged } from '../helpers/campaign.mjs';
import { assertBackgroundCoverage, continueSave, discoveryBoundary, installDiscovery, observeDiscovery, orders, passage } from '../helpers/discovery.mjs';
const evidence = id => `docs/qa/evidence/init-rpg-maker-mz/task-08/${id}`;
const snapshot = browser => browser.evaluate('$gameSystem._dryland.campaign');
const receipt = route => `Você recebeu a peça ${route === 'physical' ? 'anã' : 'élfica'} do mapa.`;
const expectedBackground = route => route === 'physical' ? 'Dryland_Church' : 'Dryland_Figtree';
canonicalCase('UT-032', 'both legal route orders award exactly one piece per receipt and unlock only with both', () => {
  for (const order of orders) {
    for (const index of [0, 1]) {
      let state = complete(discoveryBoundary(order, index));
      assert.equal(state.reading.sceneId, `lover.${order[index]}.${index === 0 ? 'first' : 'second'}`);
      assert.equal(state.reading.passageIds.includes(`lover.${order[index]}.second`), index === 1);
      while (state.reading.passageIds[state.reading.index] !== `reward.${order[index]}`) state = complete(state);
      assert.deepEqual(state.mapPieceIds, order.slice(0, index));
      assert.equal(rules.playerView(state).destinations.final.status, 'locked');
      const after = complete(state);
      assert.deepEqual(after.mapPieceIds, order.slice(0, index + 1));
      assert.deepEqual(after.completedDungeonIds, order.slice(0, index + 1));
      assert.equal(after.reading.sceneId, index === 0 ? 'irati.02' : 'map.reveal');
      assert.equal(rules.playerView(after).destinations.final.status, index === 0 ? 'locked' : 'available');
      const stale = rules.dispatch(after, { type: 'COMPLETE_PASSAGE', passageId: `reward.${order[index]}`, expectedSequence: state.sequence });
      assert.equal(stale.ok, false); assert.deepEqual(stale.state, after); assert.deepEqual(stale.effects, []);
      rejectUnchanged(after, 'COMPLETE_PASSAGE', { passageId: `reward.${order[index]}` }, 'invalid_transition');
      const returned = finishReading(after);
      assert.ok(after.reading.passageIds.every(id => returned.seenPassageIds.includes(id)), 'Every completed discovery passage stays seen after returning to formation');
      assert.equal(returned.phase, 'formation'); assert.deepEqual(returned.mapPieceIds, after.mapPieceIds);
      assert.deepEqual(returned.assignments, after.assignments); assert.equal(returned.rngState, after.rngState);
      assert.equal(returned.history.filter(action => action.passageId === `reward.${order[index]}`).length, 1);
    }
  }
});
async function reachReceipt(browser, order, index) {
  const state = discoveryBoundary(order, index), route = order[index];
  await installDiscovery(browser, state);
  await browser.press('Enter', 13);
  for (const id of [`lover.${route}.01`, `lover.${route}.warning`, ...(index ? [`lover.${route}.second`] : [])]) {
    await passage(browser, id);
    assert.equal(await browser.evaluate('$gameMap.mapId()'), 4);
    assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), expectedBackground(route));
    assert.deepEqual((await snapshot(browser)).mapPieceIds, order.slice(0, index));
    if (id.endsWith('warning') || id.endsWith('second')) {
      const speaker = route === 'physical' ? 'Pérola' : 'Floraí';
      const asset = route === 'physical' ? 'Dryland_perola' : 'Dryland_florai';
      await browser.waitFor(`$gameScreen.picture(63)?.name() === ${JSON.stringify(asset)}`);
      assert.equal(await browser.evaluate('$gameMessage.speakerName()'), speaker);
    }
    await browser.press('Enter', 13);
  }
  await passage(browser, `reward.${route}`);
  return state;
}
async function visibleBounds(browser, id) {
  // Inspect actual engine-loaded pixels and the native transform, without
  // modifying either. Alpha > 127 ignores antialiasing dust outside the paper.
  return browser.evaluate(`(() => {
    const p=$gameScreen.picture(${id}), b=ImageManager.loadPicture(p.name());
    const bytes=b.context.getImageData(0,0,b.width,b.height).data;
    let left=b.width,right=-1,top=b.height,bottom=-1,empty=0;
    for(let y=0;y<b.height;y++)for(let x=0;x<b.width;x++){
      const alpha=bytes[(y*b.width+x)*4+3]; if(alpha===0)empty++;
      if(alpha>127){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
    }
    return {empty,total:b.width*b.height,width:b.width,height:b.height,x:p.x()+((left+right+1)/2-b.width/2)*p.scaleX()/100,y:p.y()+((top+bottom+1)/2-b.height/2)*p.scaleY()/100,top:p.y()+(top-b.height/2)*p.scaleY()/100,bottom:p.y()+(bottom+1-b.height/2)*p.scaleY()/100};
  })()`);
}
canonicalCase('IT-052', 'both native piece receipts preserve scene, alpha, centered artwork, one sound and an explicit advance', { timeout: 240000 }, async t => {
  const browser = await tavern(t); await observeDiscovery(browser);
  for (const reduced of [false, true]) for (const order of orders) {
    const route = order[0], id = route === 'physical' ? 2 : 3;
    await browser.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
    await browser.evaluate('discoveryEvents.length=0;');
    await reachReceipt(browser, order, 0);
    assert.equal(await browser.evaluate('$gameMessage.allText()'), receipt(route));
    assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), expectedBackground(route));
    assert.equal(await browser.evaluate('$gameScreen.picture(63) == null'), true);
    await assertBackgroundCoverage(browser);
    assert.equal(await browser.evaluate('$gameMessage.isChoice()'), false);
    const before = await snapshot(browser);
    assert.deepEqual(before.mapPieceIds, []);
    const log = await browser.evaluate('discoveryEvents');
    assert.equal(log.filter(event => event.name === 'playSe').length, 1);
    const move = log.find(event => event.name === 'movePicture' && event.args[0] === id);
    if (reduced) {
      assert.equal(move, undefined);
      assert.equal(log.find(event => event.name === 'showPicture' && event.args[0] === id).args[7], 255);
    } else { assert.equal(move.args[8], 24); assert.equal(move.args[6], 255); }
    await browser.waitFor(`$gameScreen.picture(${id})?.opacity() === 255 && ImageManager.loadPicture($gameScreen.picture(${id}).name()).isReady()`);
    const bounds = await visibleBounds(browser, id);
    assert.ok(bounds.empty > bounds.total * 0.35, 'Actual transparency surrounds the fragment.');
    assert.ok(Math.abs(bounds.x - 640) <= 5, JSON.stringify(bounds));
    assert.ok(Math.abs(bounds.y - 245) <= 5, JSON.stringify(bounds));
    assert.ok(bounds.top >= 20 && bounds.bottom <= 490, JSON.stringify(bounds));
    await browser.evaluate('new Promise(resolve => {let n=40;function tick(){if(--n===0)resolve();else requestAnimationFrame(tick);}requestAnimationFrame(tick);})');
    assert.deepEqual(await snapshot(browser), before, 'Presentation time cannot award or dismiss.');
    await browser.screenshot(`${evidence('IT-052')}/${route}-${reduced ? 'reduced' : 'fade'}-receipt.png`);
    await browser.press('Enter', 13); await passage(browser, 'irati.02.01');
    const after = await snapshot(browser);
    assert.deepEqual(after.mapPieceIds, [route]); assert.equal(after.reading.sceneId, 'irati.02');
    assert.equal(await browser.evaluate('$gameScreen.picture(2) == null && $gameScreen.picture(3) == null'), true);
    assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), 'Dryland_Taverna');
    await assertBackgroundCoverage(browser);
    assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file0').then(x=>x.system._dryland.campaign)"), after);
    const sounds = await browser.evaluate("discoveryEvents.filter(e=>e.name==='playSe').length");
    await continueSave(browser); await passage(browser, 'irati.02.01');
    assert.deepEqual(await snapshot(browser), after);
    assert.equal(await browser.evaluate('$gameScreen.picture(2) == null && $gameScreen.picture(3) == null'), true, 'Restored parent event cleans the receipt before Irati.');
    assert.equal(await browser.evaluate("discoveryEvents.filter(e=>e.name==='playSe').length"), sounds);
    await browser.press('Enter', 13); await choices(browser, 'formation');
    assert.deepEqual((await snapshot(browser)).mapPieceIds, [route]);
  }
});
canonicalCase('IT-053', 'native automatic assembly runs in both orders with independent unlock and reduced-motion replay safety', { timeout: 240000 }, async t => {
  const browser = await tavern(t); await observeDiscovery(browser);
  for (const reduced of [false, true]) for (const order of orders) {
    await browser.call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
    await reachReceipt(browser, order, 1);
    const before = await snapshot(browser); assert.deepEqual(before.mapPieceIds, order.slice(0, 1));
    await browser.evaluate('discoveryEvents.length=0;');
    await browser.press('Enter', 13);
    await passage(browser, 'map.reveal.01');
    const after = await snapshot(browser);
    assert.deepEqual(after.mapPieceIds, order); assert.equal(rules.playerView(after).destinations.final.status, 'available');
    assert.equal(after.reading.index, 0); assert.equal(after.sequence, before.sequence + 1);
    assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'), 'Dryland_Taverna');
    assert.equal(await browser.evaluate('$gameScreen.picture(4)?.name()'), 'Dryland_MapComplete');
    await assertBackgroundCoverage(browser);
    assert.equal(await browser.evaluate('$gameScreen.picture(4).opacity()'), 255);
    assert.equal(await browser.evaluate('$gameScreen.picture(2) == null && $gameScreen.picture(3) == null && $gameScreen.picture(63) == null'), true);
    const log = (await browser.evaluate('discoveryEvents')).filter(event => event.scene === 'map.reveal');
    assert.ok(log.length); for (const event of log) { assert.deepEqual(event.pieces, order); assert.equal(event.sequence, after.sequence); }
    assert.equal(log.filter(event => event.name === 'playSe').length, 1);
    const moves = log.filter(event => event.name === 'movePicture');
    if (reduced) assert.deepEqual(moves, []);
    else {
      assert.deepEqual(moves.map(event => [event.args[0], event.args[2], event.args[3], event.args[6], event.args[8]]), [[2,640,245,255,75],[3,640,245,255,75],[2,640,245,0,45],[3,640,245,0,45],[4,640,245,255,45]]);
      assert.equal(moves[0].frame, moves[1].frame);
      assert.ok(moves[2].frame - moves[0].frame >= 75);
      const done = log.find(event => event.name === 'erasePicture' && event.args[0] === 2 && event.frame > moves[2].frame);
      assert.ok(done.frame - moves[0].frame >= 120);
    }
    await browser.screenshot(`${evidence('IT-053')}/${order[0]}-first-${reduced ? 'reduced' : 'animated'}.png`);
    assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file0').then(x=>x.system._dryland.campaign)"), after);
    await continueSave(browser); await passage(browser, 'map.reveal.01');
    assert.deepEqual(await snapshot(browser), after, 'Cosmetic replay leaves the already awarded pieces and unlock unchanged.');
    await browser.press('Enter', 13); await passage(browser, 'map.reveal.02');
    assert.equal(await browser.evaluate('$gameScreen.picture(4)?.name()'), 'Dryland_MapComplete');
    await browser.press('Enter', 13); await choices(browser, 'formation');
    const returned = await snapshot(browser);
    assert.ok(['map.reveal.01', 'map.reveal.02'].every(id => returned.seenPassageIds.includes(id)));
    assert.deepEqual(returned.mapPieceIds, order); assert.equal(rules.playerView(returned).destinations.final.status, 'available');
    assert.equal(await browser.evaluate('[2,3,4].some(id=>$gameScreen.picture(id))'), false);
    for (const route of order) assert.equal(returned.history.filter(action => action.passageId === `reward.${route}`).length, 1);
  }
});
