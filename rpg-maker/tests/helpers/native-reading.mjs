import assert from 'node:assert/strict';

export const normalizeProse = text => text.replace(/<br>/g, ' ').replace(/\s+/g, ' ').trim();

export async function assertAdvanceIndicatorFits(browser) {
  await browser.evaluate("new Promise(resolve=>Graphics.app.renderer.once('postrender',resolve))");
  const bounds=await browser.evaluate(`(()=>{const window=SceneManager._scene._messageWindow;const sprite=window._pauseSignSprite,b=sprite.getBounds(),start=window.worldTransform.apply({x:0,y:0}),end=window.worldTransform.apply({x:window.width,y:window.height});return{visible:sprite.worldVisible,left:b.x,right:b.x+b.width,top:b.y,bottom:b.y+b.height,windowLeft:Math.max(0,start.x),windowRight:Math.min(Graphics.width,end.x),windowTop:Math.max(0,start.y),windowBottom:Math.min(Graphics.height,end.y)};})()`);
  assert.ok(bounds.visible&&bounds.right>bounds.left&&bounds.bottom>bounds.top,JSON.stringify(bounds));
  assert.ok(bounds.left>=bounds.windowLeft&&bounds.right<=bounds.windowRight&&bounds.top>=bounds.windowTop&&bounds.bottom<=bounds.windowBottom,'The complete advance indicator must stay inside the message window: '+JSON.stringify(bounds));
}

export function passageBoxes(list, passageId) {
  const start = list.findIndex(c => c.code === 357 && c.parameters[1] === 'Query' && c.parameters[3].id === passageId);
  assert.ok(start >= 0, passageId);
  const boxes = [];
  for (const c of list.slice(start + 1)) {
    if (c.code === 357 && c.parameters[1] === 'ReadingEnd') break;
    if (c.code === 101) boxes.push([]);
    if (c.code === 401) boxes.at(-1).push(c.parameters[0]);
  }
  return boxes.map(lines => lines.join('\n'));
}
