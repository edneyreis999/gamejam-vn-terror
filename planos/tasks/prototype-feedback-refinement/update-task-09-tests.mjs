import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const file='rpg-maker/tests/suites/endings.mjs';let source=readFileSync(file,'utf8');
source=source.replace("import { hidden }", "import { hidden, click }");
const anchor="  assert.equal(await browser.evaluate('$gameMessage.choices().length'),2);";
assert.ok(source.includes(anchor));
source=source.replace(anchor,anchor+`
  const panels=await browser.evaluate('[50,51].map(id=>{const p=$gameScreen.picture(id),b=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id).getBounds();return {name:p?.name(),x:b.x,y:b.y,w:b.width,h:b.height,text:$gameScreen.getPictureTextData(id).center};})');
  assert.deepEqual(panels.map(({name,x,y,w,h})=>({name,x,y,w,h})),[{name:'Dryland_FinalChoice',x:112,y:208,w:504,h:304},{name:'Dryland_FinalChoice',x:664,y:208,w:504,h:304}]);
  for(const [i,parts] of [['Reunir o medalhão','libertar os amantes','e morrer'],['Destruir o medalhão','sobreviver e entregá-los','a Andirá']].entries())for(const part of parts)assert.ok(panels[i].text.includes(part));
  await browser.press('ArrowRight',39);assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.index()'),1);
  assert.deepEqual(await snapshot(browser),state);
  await browser.press('ArrowLeft',37);
  await browser.press('Tab',9);await hidden(browser,true);
  assert.equal(await browser.evaluate('SceneManager._scene._spriteset._pictureContainer.children.filter(s=>[50,51].includes(s._pictureId)).some(s=>s.worldVisible)'),false);
  await browser.press('Tab',9);await hidden(browser,false);assert.deepEqual(await snapshot(browser),state);
`);
const activation="  await activate(browser,'ending',ending==='reunite'?0:1);await closingReady(browser);";
assert.ok(source.includes(activation));
source=source.replace(activation,`  if(kind==='solo')await activate(browser,'ending',0);
  else {
    const x=ending==='reunite'?364:916,y=reduced?312:420;
    const point=await browser.evaluate('(()=>{const r=Graphics._canvas.getBoundingClientRect();return {x:r.x+'+x+'*r.width/1280,y:r.y+'+y+'*r.height/720}})()');
    await click(browser,point.x,point.y);
  }
  await closingReady(browser);
  assert.equal(await browser.evaluate('[50,51].some(id=>$gameScreen.picture(id))'),false);`);
writeFileSync(file,source);
const inventory='rpg-maker/tests/suites/native-inventory.mjs';source=readFileSync(inventory,'utf8');
assert.ok(source.includes("'SaveNotice']"));
writeFileSync(inventory,source.replace("'SaveNotice']","'SaveNotice','FinalChoice']"));
