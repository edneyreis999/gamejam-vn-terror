import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {parseArgs} from 'node:util';
const {values}=parseArgs({options:Object.fromEntries(['project','fixture','case','adapter','output'].map(k=>[k,{type:'string'}]))});
const runtime=resolve(values.project,process.env.DRYLAND_DIRECTED_RUNTIME||'.artifacts/qa-runtime');
// The scheduler reserves one browser for this worker. Reject nested launch before spawning it.
const {chromium}=await import(pathToFileURL(resolve(runtime,'node_modules/playwright/index.mjs')));
const launch=chromium.launch.bind(chromium);let liveBrowsers=0;
chromium.launch=async options=>{if(liveBrowsers)throw Error('Recipe exceeded its one-browser reservation');liveBrowsers++;try{const browser=await launch(options);browser.once('disconnected',()=>liveBrowsers--);return browser;}catch(error){liveBrowsers--;throw error;}};
const {run}=await import(pathToFileURL(resolve(runtime,'browser-runtime.mjs')));
const [original,adapter]=await Promise.all([values.case,values.adapter].map(p=>import(pathToFileURL(resolve(p)))));
async function portuguese(context){
 await context.wait(()=>window.$gameMap?.mapId()===1&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy());
 if(await context.read('selected-language',()=>ConfigManager.textLocale)==='Portuguese')return;
 const index=await context.read('options-title-index',()=>SceneManager._scene._choiceListWindow._list.findIndex(row=>$gameMessage.choices()[row.ext]?.includes('choice.title.options')));
 if(index<0)throw Error('Current title options choice missing');
 for(let n=0;n<10;n++){const current=await context.read('title-cursor',()=>SceneManager._scene._choiceListWindow.index());if(current===index)break;await context.input.key(current<index?'ArrowDown':'ArrowUp');}
 await context.input.key('Enter');await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
 const option=await context.read('language-option-index',()=>SceneManager._scene._optionsWindow._list.findIndex(row=>row.symbol==='textLocale'));
 if(option<0)throw Error('Language option missing');
 for(let n=0;n<20;n++){const current=await context.read('options-cursor',()=>SceneManager._scene._optionsWindow.index());if(current===option)break;await context.input.key(current<option?'ArrowDown':'ArrowUp');}
 for(let n=0;n<3;n++){if(await context.read('selected-language',()=>ConfigManager.textLocale)==='Portuguese')break;await context.input.key('ArrowRight');}
 if(await context.read('selected-language',()=>ConfigManager.textLocale)!=='Portuguese')throw Error('Public language control did not select Portuguese');
 await context.input.key('Escape');await context.wait(()=>$gameMap.mapId()===1&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy());
}
// MZ samples keyboard state in its game loop. Preserve the public press and
// release durations, and make both states observable for a complete native frame.
// New-game/title setup resets frameCount, so a different frame (not a larger
// counter) is the boundary. Release observation still requires a subsequent frame.
function useFrameBoundKeys(context) {
 const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 context.input.key=async (value,holdMs=70)=>{
  await context.input.keyDown(value);
  try {
   const frame=await context.read('key-pressed-frame',()=>Graphics.frameCount);
   await Promise.all([context.wait(previous=>Graphics.frameCount!==previous,frame),delay(holdMs)]);
  } finally {
   await context.input.keyUp(value);
  }
  const frame=await context.read('key-released-frame',()=>Graphics.frameCount);
  await Promise.all([context.wait(previous=>Graphics.frameCount!==previous,frame),delay(original.scenario.browser.keyReleaseMs??35)]);
 };
}
const caseModule={...original,scenario:{...original.scenario,browser:{...original.scenario.browser,launchArgs:[...(original.scenario.browser.launchArgs||[]),'--headless=new','--use-angle=metal']}},execute:async context=>{await context.wait(()=>window.Graphics?.app?.renderer?.gl&&window.$gameMap?.mapId()===1);useFrameBoundKeys(context);await context.read('renderer',()=>{const gl=Graphics.app.renderer.gl,ext=gl.getExtension('WEBGL_debug_renderer_info');return{vendor:gl.getParameter(ext?.UNMASKED_VENDOR_WEBGL||gl.VENDOR),renderer:gl.getParameter(ext?.UNMASKED_RENDERER_WEBGL||gl.RENDERER)};});if(original.scenario.browser.locale==='pt-BR')await portuguese(context);await original.execute(context);}};
const report=await run({...values,adapter,caseModule,sources:[values.case,values.adapter,new URL(import.meta.url).pathname]});
console.log(JSON.stringify({status:report.status,output:values.output}));if(report.status==='fail')process.exitCode=1;
