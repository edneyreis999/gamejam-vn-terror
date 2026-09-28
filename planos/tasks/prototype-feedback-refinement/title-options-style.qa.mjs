import assert from 'node:assert/strict';
import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
const large=process.env.DRYLAND_TITLE_VIEW==='large';
const variant=large?'1920-reduced':'1280-normal';
const expectedRef='planos/tasks/prototype-feedback-refinement/verification.md#manual-feedback-title-controls';
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url)];
export const scenario={id:'title-options-style',criteria:[{id:'shared-controls',variant,expectedRef}],requires:['native-mz','public-input'],browser:{width:large?1920:1280,height:large?1080:720,dpr:1,locale:'pt-BR',channel:'chrome',query:'',reducedMotion:large?'reduce':'no-preference',recordVideo:true}};
export async function execute(context){
 const player=new DirectedNativePlayer(context);
 const style=key=>context.read('style-'+key,key=>{
  const w=SceneManager._scene[key];
  return {skin:w.windowskin.url,font:w.contents.fontFace,size:w.contents.fontSize,outline:w.contents.outlineColor,back:w.backOpacity,itemHeight:w.itemHeight(),padding:w.itemPadding(),background:w.drawBackgroundRect.toString(),cursor:w._cursorSprite.bitmap===w.windowskin};
 },key);
 const point=index=>context.read('title-target-'+index,index=>{
  const w=SceneManager._scene._choiceListWindow,r=w.itemRect(index),canvas=Graphics._canvas.getBoundingClientRect(),bounds=w.getBounds();
  return {x:canvas.x+(bounds.x+w.padding+r.x+r.width/2)*canvas.width/Graphics.width,y:canvas.y+(bounds.y+w.padding+r.y+r.height/2)*canvas.height/Graphics.height};
 },index);
 await player.until('title');
 const original=await style('_choiceListWindow');
 assert.equal(await context.read('native-controls-visible',()=>SceneManager._scene._choiceListWindow.scale.x===1&&[3,4,5].every(id=>!$gameScreen.picture(id))),true);
 await context.shot('title-normal-disabled-continue');
 await context.input.key('ArrowDown');await context.shot('title-keyboard-disabled');
 assert.equal((await player.surface()).index,1);
 await context.input.key('Enter');await player.until('title');
 assert.equal(await context.read('disabled-does-not-enter',()=>$gameTemp._drylandAgeNotice===undefined),true);
 await context.input.key('ArrowDown');await context.shot('title-keyboard-options');
 await context.input.key('ArrowUp');
 const options=await point(2);await context.input.pointer.move(options.x,options.y);
 await context.wait(()=>SceneManager._scene._choiceListWindow.index()===2);
 await context.shot('title-hover-options');
 await context.input.pointer.down();
 try{await context.shot('title-pressed-options');}finally{await context.input.pointer.up();}
 await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());
 assert.deepEqual(await style('_optionsWindow'),original);
 await context.shot('options-reference');
 await context.input.key('Escape');await player.until('title');
 await context.shot('title-after-options');
 await player.choose('Novo jogo');await player.until('age-notice');
 assert.equal(await context.read('fresh-new-gate',()=>$gameTemp._drylandAgeNotice.checked),false);
 await context.shot('new-game-age-gate');
 await player.file(1);const opening=await player.ready();assert.equal(opening.paused,true);
 await context.wait(()=>DataManager.isAnySavefileExists()&&$gameTemp._drylandPersistence.status==='saved');
 await context.reopenPage();await player.until('title');
 assert.equal(await context.read('continue-enabled',()=>SceneManager._scene._choiceListWindow._list[1].enabled),true);
 await context.shot('title-with-save');
 await player.choose('Continuar',{mouse:true});await player.until('age-notice');
 assert.equal(await context.read('fresh-continue-gate',()=>$gameTemp._drylandAgeNotice.checked),false);
 await context.input.key('Escape');await player.until('title');
 await player.choose('Continuar');await player.until('age-notice');
 await player.choose('Tenho 16 anos de idade ou mais',{settled:()=>$gameTemp._drylandAgeNotice.checked&&SceneManager._scene._choiceListWindow.isOpenAndActive()});
 await player.choose('Jogar');await context.wait(()=>SceneManager._scene instanceof Scene_Load&&!SceneManager._scene.isBusy());
 await context.shot('continue-native-file');
 await context.input.key('Escape');await player.until('title');
 context.report.observations.push({label:'title-style-result',kind:'title-style-result',value:{variant,sharedStyle:original}});
}
export async function verify({expected,artifacts,report}){
 const result=report.observations.find(row=>row.kind==='title-style-result');
 return {criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',evidence:artifacts.map(a=>a.path),observed:result?.value,limits:['Visual inspection remains separate from input and shared-renderer assertions.']})),pendingReviews:['Inspect title and Options screenshots, including hover/pressed/disabled states.']};
}
