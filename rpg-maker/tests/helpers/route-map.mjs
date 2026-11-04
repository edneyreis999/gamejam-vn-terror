import assert from 'node:assert/strict';
export async function advanceRoute(browser, {keyboard = false} = {}) {
 await browser.waitFor("window.DrylandRouteMap?.active() && DrylandRouteMap.state() && !$gameMap.isEventRunning() && !SceneManager._scene.isBusy() && $gameTemp._drylandPersistence.status !== 'saving'");
 const target=await browser.evaluate(`(() => {
  const state=DrylandRouteMap.state(), node=DrylandRouteMap.nodes().find(n=>DrylandRouteMap.canMove(DrylandRouteMap.nodes(),state,n.id));
  const box=Graphics.app.view.getBoundingClientRect();
  return node && {id:node.id,x:box.x+($gameMap.adjustX(node.x)+0.5)*48*box.width/Graphics.width,y:box.y+($gameMap.adjustY(node.y)+0.5)*48*box.height/Graphics.height};
 })()`);
 assert.ok(target,'The next route node is available');
 if (keyboard) {
  for (let i=0; i<12 && await browser.evaluate('SceneManager._scene._routeFocus') !== target.id; i++) await browser.press('ArrowRight',39);
  assert.equal(await browser.evaluate('SceneManager._scene._routeFocus'),target.id);
  await browser.press('Enter',13);
 } else {
 await browser.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:target.x,y:target.y});
 await browser.evaluate('new Promise(r=>requestAnimationFrame(r))');
 await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',x:target.x,y:target.y,button:'left',buttons:1,clickCount:1});
 await browser.evaluate('new Promise(r=>requestAnimationFrame(r))');
 await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:target.x,y:target.y,button:'left',buttons:0,clickCount:1});
 }
 await browser.waitFor("$gameSystem._dryland.campaign.phase !== 'route_map'");
}

export async function readRoutePassage(browser, phase) {
 const reading = `$gameSystem._dryland.campaign.phase === ${JSON.stringify(phase)}`;
 for (let count=0; count<40; count++) {
  await browser.waitFor(`!(${reading}) || ($gameMessage.hasText() && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0)`);
  if (!await browser.evaluate(reading)) return;
  const previous=await browser.evaluate('$gameMessage.allText()');
  await browser.press('Enter',13);
  await browser.waitFor(`!(${reading}) || ($gameMessage.hasText() && $gameMessage.allText() !== ${JSON.stringify(previous)} && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0)`);
 }
 assert.fail('Route passage did not finish: '+phase);
}
