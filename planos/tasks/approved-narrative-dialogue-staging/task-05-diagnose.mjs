import { writeFile } from 'node:fs/promises';
import { tavern, pause } from '../../../rpg-maker/tests/helpers/formation.mjs';
import { councilState, installClosing } from '../../../rpg-maker/tests/helpers/closing.mjs';

const cleanups=[];
try {
  const browser=await tavern({after:fn=>cleanups.push(fn)});
  await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await installClosing(browser,councilState());await pause(browser);
  const state=await browser.evaluate(`(() => {
    const sprites=[];
    function walk(s){if(s._pictureId===60)sprites.push({type:s.constructor.name,visible:s.visible,worldVisible:s.worldVisible,alpha:s.alpha,worldAlpha:s.worldAlpha,x:s.x,y:s.y,anchor:{x:s.anchor.x,y:s.anchor.y},scale:{x:s.scale.x,y:s.scale.y},bounds:s.getBounds(),bitmap:s.bitmap&&{width:s.bitmap.width,height:s.bitmap.height,ready:s.bitmap.isReady()},parent:s.parent?.constructor.name});for(const child of s.children||[])walk(child);}
    walk(SceneManager._scene);
    const w=SceneManager._scene._messageWindow;
    return {picture:$gameScreen.picture(60),sprites,speaker:$gameMessage.speakerName(),message:{x:w.x,y:w.y,openness:w.openness,height:w.height},systemKeys:Object.keys($gameSystem).filter(k=>/attach|picture/i.test(k)).map(k=>[k,$gameSystem[k]]),reduced:$gameVariables.value(47)};
  })()`);
  await writeFile('docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/council-diagnostic.json',JSON.stringify(state,null,2)+'\n');
  await browser.screenshot('docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/council-diagnostic.png');
  const frame=await browser.evaluate('Graphics.frameCount');
  await browser.waitFor(`Graphics.frameCount > ${frame+60}`);
  await browser.screenshot('docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-04/council-diagnostic-settled.png');
  console.log(JSON.stringify(state));
} finally {
  for(const cleanup of cleanups.reverse())await cleanup();
}
