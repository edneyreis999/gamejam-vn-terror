import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
const expectedRef='planos/tasks/campfire-hero-bonds/verification.md#native-icon-above-nameplates';
const gdd=JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url)];
export const scenario={id:'campfire-native-icon',requires:['native-mz','public-input'],criteria:[{id:'native-icon',variant:process.env.DRYLAND_ICON_LOCALE || 'en-US',expectedRef}],browser:{width:1280,height:720,dpr:1,locale:process.env.DRYLAND_ICON_LOCALE || 'en-US',channel:'chrome',launchArgs:['--force-device-scale-factor=1'],query:'',timeoutMs:30000,executionTimeoutMs:1200000}};
export async function execute(context){
 const player=new DirectedNativePlayer(context);
 const state=()=>context.read('campaign',()=>JSON.parse(JSON.stringify($gameSystem._dryland.campaign)));
 async function until(kind){
  for(let n=0;n<150;n++){
   const surface=await player.ready();
   if(surface.active&&surface.kind===kind)return surface;
   assert.ok(surface.paused,JSON.stringify(surface));
   await context.input.key('Enter');
  }
  throw Error('Too many passages before '+kind);
 }
 async function chooseRaw(fragment){
  const surface=await player.ready();assert.ok(surface.active,JSON.stringify(surface));
  const index=await context.read('raw-choice-target',fragment=>{
   const w=SceneManager._scene._choiceListWindow;
   return w._list.findIndex(item=>$gameMessage.choices()[item.ext].includes(fragment));
  },fragment);
  assert.ok(index>=0,'Missing choice '+fragment+' '+JSON.stringify(surface));
  for(let n=0;n<20;n++){
   const current=await context.read('choice-focus',()=>SceneManager._scene._choiceListWindow.index());
   if(current===index)break;
   await context.input.key(current<index?'ArrowDown':'ArrowUp');
  }
  await context.input.key('Enter');
  await context.wait(()=>!SceneManager._scene._choiceListWindow?.isOpenAndActive());
 }
 async function stageShot(id, hide = false) {
  await context.read(id + '-observation', () => ({
   locale: ConfigManager.textLocale,
   iconSet: {ready: ImageManager.loadSystem('IconSet').isReady(), valid: ImageManager.loadSystem('IconSet').baseTexture.valid},
   plates: SceneManager._scene._spriteset._pictureContainer.children.filter(s => s.picture()?.name() === 'Dryland_Tag').map(s => ({
    id: s._pictureId, name: $gameVariables.value(s._pictureId + 135),
    plate: {x:s.x,y:s.y,width:s.bitmap.width,height:s.bitmap.height,scaleX:s.scale.x,scaleY:s.scale.y},
    unread: DrylandEventBridge.heroUnread(s.picture()._drylandConversationHero),
    icon: s._drylandConversationBubble ? {visible:s._drylandConversationBubble.worldVisible,frame:s._drylandConversationBubble._frame,x:s._drylandConversationBubble.x,y:s._drylandConversationBubble.y,scaleX:s._drylandConversationBubble.scale.x,scaleY:s._drylandConversationBubble.scale.y} : null
   }))
  }));
  await context.shot(id);
  if (hide) {
   await context.input.key('Tab');
   await context.wait(() => SceneManager._scene._messageWindow.scale.x === 0);
   await context.shot(id + '-hide');
   await context.input.key('Tab');
   await context.wait(() => SceneManager._scene._messageWindow.scale.x === 1);
   await context.shot(id + '-restored');
  }
 }
 await player.ready();await chooseRaw('choice.title.new_game');await player.file(1);await until('formation');
 await stageShot('tavern-unread', true);
 await chooseRaw('\\V[165]');await until('hero');await chooseRaw('choice.conv.talk');await until('hero');
 await chooseRaw('choice.conv.back');await until('formation');
 await stageShot('tavern-gorvak-read');
 for(const id of [1,5,8]){
  await chooseRaw('\\V['+(164+id)+']');await until('hero');await chooseRaw('\\V[153]');await until('formation');
 }
 await stageShot('tavern-selected');await chooseRaw('choice.tavern.depart');await until('destinations');
 // The destination menu binds each route to its authored variable label.
 const route=await context.read('route-choice',()=>{
  const w=SceneManager._scene._choiceListWindow;
  return w._list.map(item=>$gameMessage.choices()[item.ext]);
 });
 const physical=route.find(label=>label.includes('173'));
 assert.ok(physical,JSON.stringify(route));await chooseRaw(physical);
 for(let pos=1;pos<=2;pos++){
  await until('approaches');const before=await state();assert.equal(before.position,pos);
  const id=before.assignments.physical[pos-1];
  const choice=gdd.encounterPairs[id].findIndex(c=>before.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
  assert.ok(choice>=0);await chooseRaw(`choice.${id.toLowerCase()}.approach_${choice+1}`);
 }
 await until('camp');let camp=await state();assert.equal(camp.position,2);assert.equal(camp.phase,'camp');assert.equal(camp.assignments.physical[2],null);
 await stageShot('camp-unread', true);
 assert.equal(await context.read('fire-only',()=>AudioManager._currentBgm?.name||''),'');
 assert.equal(await context.read('fire-bgs',()=>AudioManager._currentBgs?.name),'Fire1');
 await chooseRaw('\\V[165]');await until('hero');await context.shot('camp-hero-new');await chooseRaw('choice.conv.talk');
 await until('hero');camp=await state();assert.ok(camp.completedSocialUnitIds.includes('camp.h1.church.a'));assert.ok(camp.completedSocialUnitIds.includes('interject.h1.h5'));
 await context.shot('camp-hero-read');await chooseRaw('ui.camp.back');await until('camp');
 await stageShot('camp-gorvak-read');
 await chooseRaw('ui.camp.retreat');await until('formation');
 await stageShot('returned-tavern');
}

export async function verify({artifacts}){
 return {criteria:[{...scenario.criteria[0],status:'executed-awaiting-review',evidence:artifacts.map(a=>a.path),limits:['Capture-only visual review; no automated appearance assertions. Public actions only; no injected campaign or saves.']}],pendingReviews:['Inspect native icon, centered names, top margin, checkmarks, read/unread and HIDE in both scenes.']};
}
