import assert from 'node:assert/strict';
import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
export const scenario={id:'interface-g007',requires:['native-mz','public-input'],browser:{width:1280,height:720,dpr:1,locale:'pt-BR',channel:'chrome',query:''},criteria:[{id:'interfaces',variant:'desktop',expectedRef:'planos/tasks/interface-g007-refinement/spec.md#expected-result'}]};
export async function execute(context){
 const p=new DirectedNativePlayer(context);
 const shot=id=>context.shot(id);
 const chooseAge=async()=>{
  const label=(await p.ready()).labels.find(s=>s.includes('Tenho 16 anos'));
  await p.choose(label,{settled:()=>$gameTemp._drylandAgeNotice.checked&&SceneManager._scene._choiceListWindow.isOpenAndActive()});
 };
 await p.until('title');await shot('title');
 const titleInk=await context.read('title-ink',()=>SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===2)._pictureTextWindow.contents.textColor);
 await p.choose('Novo jogo');await p.until('age-notice');await shot('age-unchecked');
 assert.equal(await context.read('no-age-picture-targets',()=>[3,4,5].every(id=>!$gameScreen.picture(id))),true);
 await context.input.key('ArrowDown');await context.input.key('Enter');
 assert.equal((await p.ready()).kind,'age-notice');
 assert.equal(await context.read('age-remains-unchecked',()=>$gameTemp._drylandAgeNotice.checked),false);
 await chooseAge();await shot('age-checked');
 await context.input.key('Escape');await p.until('title');
 await p.choose('Novo jogo');await p.until('age-notice');
 assert.equal(await context.read('fresh-age-check',()=>$gameTemp._drylandAgeNotice.checked),false);
 await chooseAge();await p.choose('Jogar',{mouse:true});await p.file(1);await p.ready();await shot('dialogue');
 const ink=await context.read('shared-dialogue-ink',()=>({message:SceneManager._scene._messageWindow.contents.textColor,name:SceneManager._scene._nameBoxWindow.contents.textColor,buttons:SceneManager._scene._messageWindow._buttonConsoleButtons.filter(b=>['options','hide'].includes(b._type)).map(b=>b.contents.textColor),custom:SceneManager._scene._messageWindow.isCustomMessageCursorEnabled()}));
 assert.equal(ink.custom,false);assert.equal(titleInk,ink.message);assert.equal(ink.name,ink.message);assert.ok(ink.buttons.every(c=>c===ink.message));
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);await shot('dialogue-hidden');
 await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);
 await p.until('formation');await shot('formation');
 const art=await context.read('unchanged-hero-art',()=>{
  const sprites=[];const visit=s=>{if(s._pictureId&&s.worldVisible)sprites.push(s);for(const child of s.children||[])visit(child);};visit(SceneManager._scene._spriteset._pictureContainer);
  return {heroes:Array.from({length:8},(_,i)=>{const s=sprites.find(s=>s._pictureId===20+i);return {position:s.getGlobalPosition(),scale:s.worldTransform.a,asset:s.picture().name()};}),seguir:[$gameScreen.picture(41).x(),$gameScreen.picture(41).y(),$gameScreen.picture(41).scaleX(),$gameScreen.picture(41).scaleY()]};
 });
 const positions=[[344,520],[840,176],[760,497],[1000,448],[528,336],[368,160],[1032,224],[176,264]];
 art.heroes.forEach((h,i)=>{assert.deepEqual(h.position,{x:positions[i][0],y:positions[i][1]});assert.equal(h.scale,0.35);assert.equal(h.asset,'Dryland_Tavern_H'+(i+1));});
 assert.deepEqual(art.seguir,[1136,664,100,100]);
 const campaign=await context.read('before-menu',()=>$gameSystem._dryland.campaign);
 await p.choose('Menu',{mouse:true});await p.until('formation-menu');await shot('menu');
 const geometry=await context.read('menu-geometry',()=>{
  const w=SceneManager._scene._choiceListWindow,rect=w.getBounds();
  const heroes=SceneManager._scene._spriteset._pictureContainer.children.filter(s=>s.picture()?.name().startsWith('Dryland_HeroGroup_')).map(s=>({id:s._pictureId,bounds:s.getBounds()}));
  return {rect,heroes,choices:w._list.map(c=>c.name)};
 });
 const overlaps=(a,b)=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 assert.ok(geometry.heroes.every(h=>!overlaps(geometry.rect,h.bounds)),'Menu must not cover hero targets');
 await p.click(176,264);
 assert.equal((await p.ready()).kind,'formation-menu','Background hero cannot consume the menu click');
 await context.input.key('Escape');await p.until('formation');
 assert.equal((await p.surface()).labels[(await p.surface()).index],'Menu');
 await p.choose('Menu');await p.until('formation-menu');await p.choose('Fechar menu',{mouse:true});await p.until('formation');
 await p.choose('Menu');await p.until('formation-menu');await p.choose('Quadro',{mouse:true});await p.until('roster');await shot('quadro');
 await p.choose('Voltar');await p.until('formation');
 await p.choose('Menu');await p.until('formation-menu');await p.choose('Configurações');
 await context.wait(()=>SceneManager._scene instanceof Scene_Options&&!SceneManager._scene.isBusy());await shot('options');
 await context.input.key('Escape');await p.until('formation');
 assert.deepEqual(await context.read('after-consultations',()=>$gameSystem._dryland.campaign),campaign);
 await p.choose('Menu');await p.until('formation-menu');await p.choose('Salvar campanha atual');await p.until('formation');
 await context.wait(()=>$gameTemp._drylandPersistence.status==='saved');await shot('saved');
 assert.deepEqual(await context.read('after-saving',()=>$gameSystem._dryland.campaign),campaign);
 for(const name of ['Draska','Gorvak','Bimbren']){
  await p.choose(name,{mouse:name==='Draska'});await p.choose('Selecionar');await p.returnToTavern();
 }
 await shot('party-ready');await p.choose('Seguir',{mouse:true});await p.ready();await shot('destination-entry');
 await context.reopenPage();await p.until('title');await p.choose('Continuar');await p.until('age-notice');
 assert.equal(await context.read('continue-fresh-age',()=>$gameTemp._drylandAgeNotice.checked),false);
 await chooseAge();await p.choose('Jogar');await p.file(1);await p.returnToTavern();await shot('loaded-manual-save');
 assert.deepEqual(await context.read('loaded-saved-campaign',()=>$gameSystem._dryland.campaign),campaign);
 context.report.observations.push({label:'completed',kind:'interfaces-completed',value:{ink,geometry,art}});
}
export async function verify({artifacts,report}){return {criteria:[{...scenario.criteria[0],status:report.observations.some(o=>o.kind==='interfaces-completed')?'executed-awaiting-review':'fail',evidence:artifacts.map(a=>a.path),limits:['Rendered screenshots require inspection; no gamepad or zoom tests.']}],pendingReviews:['Inspect affected screen captures']};}
