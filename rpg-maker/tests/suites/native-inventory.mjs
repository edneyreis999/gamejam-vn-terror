import { prologueMarkers } from '../helpers/formation.mjs';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { selectFile, project } from '../helpers/native-chrome.mjs';
import { localAssets } from '../../tools/native-files.mjs';
import { catalog } from '../helpers/formation.mjs';
import { entry } from '../helpers/native-shared.mjs';

const memorialUnits = Array.from({length:16},(_,index)=>125+index*9);
const retiredCommonEvents = [
  1, ...Array.from({length:24},(_,index)=>5+index), 41, 53, 54, 55, 56, 57,
  62, 66, 72, 80, 81, ...Array.from({length:35},(_,index)=>82+index),
  ...Array.from({length:144},(_,index)=>118+index).filter(id=>!memorialUnits.includes(id)),
  262, ...Array.from({length:32},(_,index)=>305+index)
];
const retiredMapShortcuts = [
  ...Array.from({length: 8}, (_, index) => [3, index + 3]),
  [3, 11], [3, 12], [3, 13], [3, 14], [3, 2],
  ...Array.from({length: 8}, (_, index) => [index + 7, 2]),
  ...Array.from({length: 8}, (_, index) => [index + 15, 2]),
  [23, 2], [23, 3], [25, 2], [26, 2], [27, 2],
  ...Array.from({length: 8}, (_, index) => [index + 29, 2])
];

canonicalCase('IT-047', 'the native package contains every authored picture and live common-event target across CE and map lists without a revision registry', {timeout:60000}, async t => {
 const browser=await entry(t),events=await browser.evaluate('$dataCommonEvents'),maps=await browser.evaluate(`Promise.all($dataMapInfos.filter(Boolean).map(async info=>{
  const response=await fetch('data/Map'+String(info.id).padStart(3,'0')+'.json');
  if(!response.ok)throw new Error('Missing map '+info.id);
  const map=await response.json();
  return {id:info.id,events:map.events||[],pages:(map.events||[]).filter(Boolean).flatMap(event=>(event.pages||[]).map((page,index)=>({eventId:event.id,page:index,list:page.list||[]})))};
 }))`),assets=new Set(await localAssets(project));
 assert.equal(events[0],null,'Common Event index zero remains reserved');
 for(let id=1;id<events.length;id++)assert.equal(events[id]?.id,id,`CE${id} must remain a native database record readable by the editor`);
 for(const id of retiredCommonEvents)assert.deepEqual(events[id],{
  id,name:'',trigger:0,switchId:1,list:[{code:0,indent:0,parameters:[]}]
 },`Retired Common Event CE${id} keeps an empty native slot without executable content`);
 const mapById=new Map(maps.map(map=>[map.id,map]));
 for(const [mapId,eventId] of retiredMapShortcuts)assert.equal(mapById.get(mapId)?.events[eventId],null,`Retired shortcut Map${String(mapId).padStart(3,'0')}/event${String(eventId).padStart(3,'0')} keeps its event slot`);
 for(const mapId of [37,38,39,40,41,42,43,44]) {
  assert.equal(mapById.get(mapId)?.id,mapId,'The hero map is included in the native package');
  assert.equal(await browser.evaluate(`$dataMapInfos[${mapId}]?.parentId`),3,'The hero map remains a child of Taverna');
  const mapUnits=mapById.get(mapId)?.pages.flatMap(page=>page.list).filter(command=>command.code===357&&command.parameters[0]==='Dryland_Presentation'&&command.parameters[1]==='ObservationBegin').map(command=>Number(command.parameters[3]?.unit));
  assert.deepEqual(mapUnits,Array.from({length:4},(_,index)=>82+(mapId-37)*4+index),'The map owns its preserved reading identities');
 }
 const troops=await browser.evaluate('$dataTroops');
 const lists=[...events.filter(Boolean).map(event=>({owner:'CE'+event.id,list:event.list})),...maps.flatMap(map=>map.pages.map(page=>({owner:`Map${String(map.id).padStart(3,'0')}/event${page.eventId}/page${page.page}`,mapId:map.id,list:page.list}))),...troops.filter(Boolean).flatMap(troop=>troop.pages.map(page=>({owner:'Troop'+troop.id,list:page.list})))];
 for(const id of memorialUnits){assert.ok(events[id],'Memorial unit remains live');assert.ok(events[347].list.some(command=>command.code===117&&command.parameters[0]===id),'CE347 retains its inscription selector');}
 const prologue=mapById.get(2).pages.flatMap(page=>page.list);
 assert.equal(prologue.filter(command=>command.code===101).length,9,'Map002 owns all nine source prologue text boxes');
 assert.equal(prologue.filter(command=>command.code===357&&command.parameters[0]==='Dryland_EventBridge'&&command.parameters[1]==='ReadingComplete').length,6,'Map002 owns six semantic completions; IT-004 proves order and identity');
 for(const id of Object.keys(catalog.passages)){
  let mapId;const hero=/^epilogue\.H([1-8])$/.exec(id),encounter=/^(?:encounter|result)\.([AB])([1-8])(?:\.|-)/.exec(id),ending=/^ending\.(reunite|destroy|bad)\./.exec(id);
  if(hero)mapId=28+Number(hero[1]);
  else if(id.startsWith('council.')||id.startsWith('opinion.')||id==='irati.03')mapId=23;
  else if(ending)mapId={reunite:25,destroy:26,bad:27}[ending[1]];
  else if(encounter)mapId=(encounter[1]==='A'?6:14)+Number(encounter[2]);
  if(mapId){
   const owners=lists.flatMap(row=>row.list.filter(command=>command.code===357&&command.parameters[0]==='Dryland_EventBridge'&&command.parameters[1]==='Query'&&command.parameters[3].kind==='passageRead'&&command.parameters[3].id===id).map(()=>row.mapId));
   assert.deepEqual(owners,[mapId],id+' has one map-authored source');
  }
 }
 for(const {owner,list} of lists)for(const command of list){
  if(command.code===117){
   assert.ok(events[command.parameters[0]],`${owner} -> CE${command.parameters[0]}`);
   assert.ok(!retiredCommonEvents.includes(command.parameters[0]),`${owner} must not call retired CE${command.parameters[0]}`);
  }
  if(command.code===231&&command.parameters[1])assert.ok(assets.has('img/pictures/'+command.parameters[1]+'.png'),`${owner}: ${command.parameters[1]}`);
  if(command.code===357){const [plugin,name,,args]=command.parameters;
   assert.equal(await browser.evaluate(`typeof PluginManager._commands[${JSON.stringify(plugin+':'+name)}]`),'function',`${owner}: ${plugin}:${name}`);
   if(plugin==='VisuMZ_2_VNPictureBusts'&&args['PictureName:str'])assert.ok(assets.has('img/pictures/'+args['PictureName:str']+'.png'),`${owner}: ${args['PictureName:str']}`);
  }
 }
 for(let i=1;i<=8;i++)assert.ok(assets.has(`img/pictures/Dryland_Memorial_H${i}.png`));
 await assert.rejects(access(project+'/native-layout-manifest.json'),{code:'ENOENT'});
 assert.equal(await browser.evaluate('typeof expeditionQA'),'undefined');
});

// The declared provider list and its actual calls are distinct from bitmap readiness.
canonicalCase('IT-074', 'one native CoreEngine list requests every tavern image before entry return and resumed interaction', {timeout:90000}, async t => {
  const { default: assert } = await import('node:assert/strict');
  const { stat } = await import('node:fs/promises');
  const { events, choices, activate, pause, returnToTavern } = await import('../helpers/formation.mjs');
  const expected=['Taverna',...Array.from({length:8},(_,i)=>`Tavern_H${i+1}`),...Array.from({length:8},(_,i)=>`H${i+1}`),'ivai','Button','Tag','Panel','DestinationCard','DestinationLabel','Destination_physical','Destination_supernatural','Destination_final','MapDwarven','MapElven','MapComplete'].map(name=>'Dryland_'+name);
  const helper=events.find(event=>event?.name==='Taverna — Carregar imagens');
  const command=helper.list.find(command=>command.code===357);
  assert.equal(command.parameters[0],'VisuMZ_0_CoreEngine');assert.equal(command.parameters[1],'SystemLoadImages');
  assert.deepEqual(JSON.parse(command.parameters[3]['pictures:arraystr']),expected);
  for(const name of expected)assert.ok((await stat(`rpg-maker/The Dryland Drowned/img/pictures/${name}.png`)).size>0);
  const browser=await entry(t);
  await browser.evaluate(`window.preloadLog=[];window.preloadActive=false;
    const plugin=PluginManager.callCommand;PluginManager.callCommand=function(interpreter,name,command,args){
      if(name==='VisuMZ_0_CoreEngine'&&command==='SystemLoadImages'){preloadLog.push({type:'begin'});preloadActive=true;try{return plugin.call(this,interpreter,name,command,args);}finally{preloadActive=false;preloadLog.push({type:'end'});}}
      return plugin.call(this,interpreter,name,command,args);
    };
    const load=ImageManager.loadBitmap;ImageManager.loadBitmap=function(folder,name){if(preloadActive&&folder==='img/pictures/')preloadLog.push({type:'request',name});return load.call(this,folder,name);};
    const show=Game_Screen.prototype.showPicture;Game_Screen.prototype.showPicture=function(id,name,...args){if(name==='Dryland_Taverna')preloadLog.push({type:'stage'});return show.call(this,id,name,...args);};`);
  await browser.press('Enter',13);await selectFile(browser,1);
  for(const text of prologueMarkers){
    await browser.waitFor(`$gameMessage.allText().includes(${JSON.stringify(text)})&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0`);await browser.press('Enter',13);
  }
  await choices(browser,'formation');
  const first=await browser.evaluate('preloadLog');
  const stage=first.findIndex(item=>item.type==='stage');
  assert.ok(stage>0,JSON.stringify(first));assert.deepEqual(first.slice(0,stage).filter(item=>item.type==='request').slice(-29).map(item=>item.name),expected);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.maxItems()'),11,'Preload calls preserve the consecutive native choice blocks');
  // Hold an unused bust at the I/O boundary. The provider starts loading but
  // neither the preload command nor the project freezes the active scene.
  await browser.evaluate(`preloadLog=[];delete ImageManager._cache['img/pictures/Dryland_H8.png'];
    const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){if(this._url.endsWith('/Dryland_H8.png')&&!window.releasePreloadImage){this._loadingState='loading';window.releasePreloadImage=()=>start.call(this);}else start.call(this);};`);
  const before=await browser.evaluate('$gameSystem._dryland.campaign');
  await activate(browser,'formation',0);await choices(browser,'hero');
  assert.equal(await browser.evaluate('typeof releasePreloadImage'),'function');
  assert.equal(await browser.evaluate("ImageManager._cache['img/pictures/Dryland_H8.png'].isReady()"),false);
  await activate(browser,'hero',0);await pause(browser);
  assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
  await browser.evaluate('releasePreloadImage()');await browser.waitFor('ImageManager.isReady()');
  await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');
  await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title);');
  await browser.waitFor("$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
  await browser.evaluate('preloadLog=[];');await browser.press('Enter',13);await selectFile(browser,1);await pause(browser);
  assert.deepEqual(await browser.evaluate('preloadLog.filter(item=>item.type==="request").slice(-29).map(item=>item.name)'),expected);
  assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
  const heroMenu='$gameMessage._drylandChoiceFocus?.key==="hero"&&SceneManager._scene._choiceListWindow?.isOpenAndActive()';
  for(let step=0;step<12;step++){
    await browser.press('Enter',13);
    await browser.waitFor(`(${heroMenu})||($gameMessage.hasText()&&SceneManager._scene._messageWindow.pause&&SceneManager._scene._messageWindow._waitCount===0)`);
    if(await browser.evaluate(heroMenu))break;
  }
  await choices(browser,'hero');await returnToTavern(browser);
  assert.ok(await browser.evaluate('preloadLog.some(item=>item.type==="stage")'));
  await browser.screenshot('docs/qa/evidence/eventbridge-minimal-runtime/task-08/20260912/preloaded-return.png');
  assert.deepEqual(browser.exceptions,[]);
});

canonicalCase('IT-075', 'late missing pictures retain default scene-start LoadError and native Retry recovery', {timeout:60000}, async t => {
  const { default: assert } = await import('node:assert/strict');
  const { tavern, activate, pause } = await import('../helpers/formation.mjs');
  const { click, clickConsole } = await import('../helpers/native-shared.mjs');
  const browser=await tavern(t);
  // A local 404 at Bitmap's real I/O boundary, restored only when Retry starts.
  await browser.evaluate(`delete ImageManager._cache['img/pictures/Dryland_H1.png'];window.recoverMissingImage=false;
    const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){
      if(this._url.endsWith('/Dryland_H1.png')&&!recoverMissingImage){this._nativeFixtureUrl=this._url;this._url='img/pictures/NativeFixtureMissing.png';}
      else if(this._nativeFixtureUrl&&recoverMissingImage)this._url=this._nativeFixtureUrl;
      return start.call(this);
    };`);
  await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
  await browser.waitFor("ImageManager._cache['img/pictures/Dryland_H1.png'].isError()");
  assert.equal(await browser.evaluate('Graphics._errorPrinter.textContent'),'','No new active-scene Retry polling policy');
  const before=await browser.evaluate('$gameSystem._dryland.campaign');
  await clickConsole(browser,'options');
  await assert.rejects(browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&SceneManager._scene.isStarted()"),/Native engine error:.*Failed to load/s);
  const retry=await browser.evaluate("(()=>{const b=document.getElementById('retryButton');if(!b)return null;const r=b.getBoundingClientRect();return {text:b.textContent,x:r.x+r.width/2,y:r.y+r.height/2};})()");
  assert.equal(retry?.text,'Retry');
  await browser.screenshot('docs/qa/evidence/eventbridge-minimal-runtime/task-08/20260912/native-load-error.png');
  await browser.evaluate('recoverMissingImage=true');
  await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',x:retry.x,y:retry.y,button:'left',buttons:1,clickCount:1});
  await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:retry.x,y:retry.y,button:'left',buttons:0,clickCount:1});
  await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&SceneManager._scene.isStarted()&&!SceneManager._scene.isBusy()");
  assert.equal(await browser.evaluate("ImageManager._cache['img/pictures/Dryland_H1.png'].isReady()"),true);
  assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
  assert.ok(browser.responses.some(response=>response.url.endsWith('NativeFixtureMissing.png')&&response.status===404));
  await browser.press('Escape',27);await pause(browser);
  await browser.screenshot('docs/qa/evidence/eventbridge-minimal-runtime/task-08/20260912/native-retry-restored.png');
});

canonicalCase('IT-076', 'native bust entry graphic change and prepared memorial pictures remain asynchronous', {timeout:60000}, async t => {
  const { default: assert } = await import('node:assert/strict');
  const { tavern, gorvakMap, pause, activate } = await import('../helpers/formation.mjs');
  const browser=await tavern(t),before=await browser.evaluate('$gameSystem._dryland.campaign');
  await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
  await browser.evaluate(`SceneManager._scene._messageWindow.pause=false;SceneManager._scene._messageWindow.terminateMessage();Game_Map.prototype.setupStartingEvent=function(){return false;};$gameMap._interpreter.clear();$gameMessage.clear();
    window.delayedPicture='';window.releaseNativeImage=null;
    const start=Bitmap.prototype._startLoading;Bitmap.prototype._startLoading=function(){if(this._url.endsWith('/'+delayedPicture+'.png')&&!releaseNativeImage){this._loadingState='loading';releaseNativeImage=()=>start.call(this);}else start.call(this);};`);
  const enter=structuredClone(gorvakMap.events[1].pages[0].list.find(command=>command.code===357&&command.parameters[1]==='Basic_EnterBust'));
  enter.indent=0;
  const change={code:357,indent:0,parameters:['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'60','PictureName:str':'Dryland_H2'}]};
  const memorial={code:231,indent:0,parameters:[61,'Dryland_Memorial_H3',1,0,640,200,20,20,255,0]};
  for(const [name,command,id] of [['Dryland_H1',enter,60],['Dryland_H2',change,60],['Dryland_Memorial_H3',memorial,61]]){
    await browser.evaluate(`delayedPicture=${JSON.stringify(name)};releaseNativeImage=null;delete ImageManager._cache['img/pictures/'+delayedPicture+'.png'];$gameScreen.showPicture(60,'Dryland_H4',1,200,500,30,30,255,0);`);
    const list=[command,{code:101,indent:0,parameters:['',0,0,2,'']},{code:401,indent:0,parameters:['Fixture técnica de carregamento nativo.']},{code:235,indent:0,parameters:[id]},{code:0,indent:0,parameters:[]}];
    await browser.evaluate(`$gameMap._interpreter.setup(${JSON.stringify(list)},0)`);
    await browser.waitFor('typeof releaseNativeImage==="function"');await pause(browser);
    assert.equal(await browser.evaluate("ImageManager._cache['img/pictures/'+delayedPicture+'.png'].isReady()"),false,name);
    assert.equal(await browser.evaluate(`$gameScreen.picture(${id}).name()`),name==='Dryland_H2'?'Dryland_H4':name,'GraphicChange retains the previous image until its replacement loads');
    await browser.evaluate('releaseNativeImage()');await browser.waitFor("ImageManager._cache['img/pictures/'+delayedPicture+'.png'].isReady()");
    await browser.waitFor(`$gameScreen.picture(${id}).name()===${JSON.stringify(name)}`);
    await browser.press('Enter',13);await browser.waitFor('!$gameMap._interpreter.isRunning()');
    assert.equal(await browser.evaluate(`Boolean($gameScreen.picture(${id}))`),false);
    assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'),before);
  }
  assert.deepEqual(browser.exceptions,[]);
});
