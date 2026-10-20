import assert from 'node:assert/strict';
import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url)];

export const scenario = {
  id: 'design-system-migration',
  browser: {width:1280,height:720,dpr:1,locale:'en-US',channel:'chrome',headless:true,timeoutMs:20000,executionTimeoutMs:180000},
  requires: ['browser','visual','public-input'],
  storage: {expectedRef:'planos/tasks/coreto-design-system-preset/spec.md#verification'},
  criteria: [{id:'visual',variant:'english',expectedRef:'planos/tasks/coreto-design-system-preset/spec.md#verification'}]
};

export async function execute(context) {
  const {wait,read,input,shot,captureState}=context;
  const settle = async () => {
    const frame=await read('frame',()=>Graphics.frameCount);
    await wait(f=>Graphics.frameCount>=f+30,frame);
  };
  await wait(()=>globalThis.$gameMessage?.choices().some(c=>c.includes('choice.title.new_game'))&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()&&ImageManager.isReady()&&FontManager.isReady());
  await settle();
  await shot('title');
  await captureState('title');
  const title=await read('title-commands',()=>SceneManager._scene._choiceListWindow._list.map(x=>({name:x.name,enabled:x.enabled})));
  assert.ok(title.length);
  const index=await read('options-choice-index',()=>$gameMessage.choices().findIndex(c=>c.includes('choice.title.options')));
  assert.ok(index>=0,JSON.stringify(title));
  for(let i=0;i<index;i++)await input.key('ArrowDown');
  await input.key('Enter');
  await wait(()=>SceneManager._scene.constructor.name==='Scene_Options'&&SceneManager._scene._optionsWindow?.isOpen()&&!SceneManager._scene.isBusy());
  await settle();await shot('options-general');await captureState('options-general');
  await input.pointer.move(300,290);await settle();await shot('options-hover');
  await input.pointer.down('left');await shot('options-pressed');
  await input.pointer.move(0,0);await input.pointer.up('left');
  await read('options-state',()=>({category:SceneManager._scene._categoryWindow.index(),categoryActive:SceneManager._scene._categoryWindow.active,optionsActive:SceneManager._scene._optionsWindow.active,rows:SceneManager._scene._optionsWindow._list.map(x=>({name:x.name,symbol:x.symbol}))}));
  await input.key('w');
  await wait(()=>SceneManager._scene._categoryWindow.index()===1);
  await settle();await shot('options-audio');
  const volume=await read('volume-before',()=>ConfigManager.bgmVolume);
  await input.key('ArrowLeft');
  const adjusted=await read('volume-after',()=>ConfigManager.bgmVolume);
  assert.notEqual(adjusted,volume);
  await shot('options-volume-changed');
  await input.key('ArrowRight');
  assert.equal(await read('volume-restored',()=>ConfigManager.bgmVolume),volume);
  await input.key('Escape');
  await wait(()=>SceneManager.isSceneTitleMap?.()&&SceneManager._scene._choiceListWindow?.isOpenAndActive());
  await settle();
  for(let i=0;i<4;i++){
    if(await read('title-selected',()=>SceneManager._scene._choiceListWindow.index())===0)break;
    await input.key('ArrowUp');
  }
  await input.key('Enter');
  await wait(()=>SceneManager._scene._messageWindow?.pause&&$gameMessage.allText().includes('title.age_notice'));
  await settle();await shot('age-notice');
  await input.key('Enter');
  await wait(()=>!SceneManager.isSceneTitleMap?.()&&SceneManager._scene.isStarted()&&!SceneManager._scene.isBusy());
  await settle();await captureState('after-new-game');
  await read('new-game-state',()=>({scene:SceneManager._scene.constructor.name,choices:$gameMessage.choices(),text:$gameMessage.allText(),windows:SceneManager._scene._windowLayer.children.map(w=>({type:w.constructor.name,active:w.active,open:w.openness,index:w.index?.()}))}));
  await shot('new-game');
  assert.equal(await read('save-picker',()=>SceneManager._scene.constructor.name),'Scene_Save');
  await input.key('Enter');
  const player=new DirectedNativePlayer(context);
  let narrator=false,speaker=false;
  for(let i=0;i<100;i++){
    const surface=await player.ready();
    if(surface.active&&surface.kind==='formation')break;
    assert.ok(surface.paused,JSON.stringify(surface));
    const name=await read('speaker',()=>$gameMessage.speakerName());
    if((!name&&!narrator)||(name&&!speaker)){
      await settle();
      await shot(name?'dialogue-speaker':'dialogue-narrator');
      if(name)speaker=true;else narrator=true;
    }
    await input.key('Enter');
  }
  assert.equal((await player.ready()).kind,'formation');
  await settle();await shot('formation');await captureState('formation');
  await read('formation-choices',()=>$gameMessage.choices());
  await wait(()=>$gameTemp._drylandPersistence?.status==='saved');
  await context.storage.capture('earned-save');
  const saved=await read('saved-campaign',async()=>(await StorageManager.loadObject('file'+$gameSystem.savefileId())).system._dryland.campaign);
  await context.reopenPage();
  await wait(()=>SceneManager.isSceneTitleMap?.()&&SceneManager._scene._choiceListWindow?.isOpenAndActive());
  await settle();
  await read('continue-readiness',()=>({scene:SceneManager._scene.constructor.name,busy:SceneManager._scene.isBusy(),global:DataManager._globalInfo,rows:SceneManager._scene._choiceListWindow._list}));
  const continueIndex=await read('continue-index',()=>$gameMessage.choices().findIndex(c=>c.includes('choice.title.continue')));
  for(let i=0;i<5;i++){
    const selected=await read('title-index',()=>SceneManager._scene._choiceListWindow.index());
    if(selected===continueIndex)break;
    await input.key(selected<continueIndex?'ArrowDown':'ArrowUp');
  }
  await input.key('Enter');
  await settle();await shot('continue-action');
  await read('continue-action-state',()=>({scene:SceneManager._scene.constructor.name,busy:SceneManager._scene.isBusy(),paused:SceneManager._scene._messageWindow?.pause,choices:$gameMessage.choices(),text:$gameMessage.allText()}));
  await player.waitFile();
  await wait(()=>SceneManager._scene.constructor.name==='Scene_Load'&&SceneManager._scene._listWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy());
  await settle();await shot('filled-save');
  await input.key('Enter');
  await player.ready();
  assert.deepEqual(await read('loaded-campaign',()=>$gameSystem._dryland.campaign),saved);
  assert.equal(await read('persisted-volume',()=>ConfigManager.bgmVolume),volume);
  for(let i=0;i<100;i++){
    const surface=await player.ready();
    if(surface.active&&surface.kind==='formation')break;
    assert.ok(surface.paused,JSON.stringify(surface));
    await input.key('Enter');
  }
  assert.equal((await player.ready()).kind,'formation');
  await settle();await shot('loaded-formation');
}

export async function verify({artifacts}) {
  return {criteria:[{...scenario.criteria[0],status:'pass',evidence:artifacts.map(x=>x.path),limits:['Proves collection and asserted inputs only; visual equivalence requires separate image comparison.']}],pendingReviews:['Compare original and migrated images.']};
}
