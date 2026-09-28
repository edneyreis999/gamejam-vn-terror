import assert from 'node:assert/strict';
import { canonicalCase, evidenceRoot } from '../helpers/canonical-cases.mjs';
import { passageBoxes } from '../helpers/native-reading.mjs';
import { catalog, events, heroes, tavern } from '../helpers/formation.mjs';
import { complete } from '../helpers/campaign.mjs';
import { closingReady, finishNativeClosing, installClosing, observeClosing } from '../helpers/closing.mjs';
import { beginEnding, campaignSnapshot, creditsReady, endingWithHeroes, finishPhase, frames, heroNames, memorialReady, observePresentation, pictureRows, resetPresentation, titleReady } from '../helpers/closing-presentation.mjs';
const evidence=id=>`docs/qa/evidence/init-rpg-maker-mz/task-10/${id}`;
import { saveBytes } from '../helpers/native-shared.mjs';
import { project, selectFile } from '../helpers/native-chrome.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
async function intoMemorial(browser,kind,ending){
  await beginEnding(browser,kind,ending);await finishPhase(browser,'ending');await memorialReady(browser);
  return campaignSnapshot(browser);
}
async function assertMemorial(browser,state){
  const expected=heroes.filter(id=>state.deadHeroIds.includes(id)),rows=await pictureRows(browser);
  assert.deepEqual(rows.filter(row=>row.name).map(row=>row.id),expected);
  assert.deepEqual(rows.filter(row=>row.grave).map(row=>row.id),expected);
  assert.deepEqual(rows.filter(row=>row.caption).map(row=>row.id),expected);
  for(const row of rows.filter(row=>row.name)){
    assert.equal(row.name,`Dryland_Memorial_${row.id}`);assert.equal(row.grave,'Dryland_Gravestone');assert.equal(row.opacity,255);
    const index=Number(row.id.slice(1))-1,context=state.deathLocations[row.id];
    assert.ok(row.caption.includes(heroNames[index]));
    assert.ok(row.caption.replace(/\n/g,' ').includes(catalog.destinations[context.routeId].name));
    assert.ok(row.caption.replace(/\n/g,' ').includes(catalog.encounters[context.encounterId].name));
    for(const bounds of [row.portrait,row.stone,row.text]){
      assert.ok(bounds.x>=-0.01&&bounds.y>=-0.01&&bounds.x+bounds.width<=1280.01&&bounds.y+bounds.height<=620.01,JSON.stringify(row));
    }
    assert.ok(row.portrait.x>=row.stone.x&&row.portrait.x+row.portrait.width<=row.stone.x+row.stone.width,JSON.stringify(row));
    assert.ok(row.portrait.y>=row.stone.y&&row.portrait.y+row.portrait.height<=row.stone.y+row.stone.height);
  }
  const sorted=rows.filter(row=>row.name).slice().sort((a,b)=>Math.abs(a.stone.y-b.stone.y)>10?a.stone.y-b.stone.y:a.stone.x-b.stone.x);
  assert.deepEqual(sorted.map(row=>row.id),expected);
  const alpha=await browser.evaluate("(()=>{const b=ImageManager.loadPicture('Dryland_Gravestone');return [b.context.getImageData(560,500,1,1).data[3],b.context.getImageData(0,0,1,1).data[3],b.context.getImageData(560,970,1,1).data[3]]})()");
  assert.deepEqual(alpha.slice(0,2),[0,0]);assert.ok(alpha[2]>240);
  assert.equal(await browser.evaluate('Array.from({length:10},(_,i)=>$gameScreen.picture(61+i)).some(Boolean)'),false);
  return rows;
}
canonicalCase('IT-055','one native memorial retains one, three or eight correctly framed dead heroes and omits zero deaths',{timeout:180000},async t=>{
  const browser=await tavern(t);await observePresentation(browser);
  await browser.evaluate(`(()=>{window.memorialDraws=[];const draw=Bitmap.prototype.drawText;Bitmap.prototype.drawText=function(text,x,y,maxWidth,lineHeight,align){if($gameSystem?._dryland?.campaign.phase==='memorial')memorialDraws.push({bitmap:this,text,x,y,maxWidth,lineHeight,font:this.fontSize,width:this.measureTextWidth(text)});return draw.apply(this,arguments);};})()`);
  for(const [kind,ending] of [['bad','bad'],['mixed','destroy'],['three','destroy']]){
    await browser.evaluate('memorialDraws=[]');
    await resetPresentation(browser);const state=await intoMemorial(browser,kind,ending);
    const bytes=await saveBytes(browser);
    const measurements=await browser.evaluate(`Array.from({length:8},(_,i)=>{const s=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===30+i);const bitmaps=[];const visit=s=>{if(s.bitmap)bitmaps.push(s.bitmap);for(const c of s.children||[])visit(c);};visit(s);return {hero:'H'+(i+1),scale:[s.scale.x,s.scale.y],draws:memorialDraws.filter(d=>bitmaps.includes(d.bitmap)).map(({bitmap,...d})=>({...d,bitmap:[bitmap.width,bitmap.height]}))};})`);
    const {evidenceRoot}=await import('../helpers/canonical-cases.mjs');
    await mkdir(evidenceRoot+'/memorial-measurements',{recursive:true});
    await writeFile(evidenceRoot+'/memorial-measurements/'+kind+'.json',JSON.stringify(measurements,null,2));
    if(kind==='bad'){
      const fields={names:heroNames,routes:Object.values(catalog.destinations).map(x=>x.name),encounters:Object.values(catalog.encounters).map(x=>x.name)};
      const catalogMeasures=await browser.evaluate('(()=>{const f='+JSON.stringify(fields)+';const b=new Bitmap(1,1);b.fontFace=$gameSystem.mainFontFace();b.fontSize=24;const wrap=t=>{const lines=[];for(const word of t.split(/\\s+/)){const last=lines.at(-1);if(last&&b.measureTextWidth(last+" "+word)<=280)lines[lines.length-1]+=" "+word;else lines.push(word);}return lines;};const rows=[];for(const name of f.names)for(const route of f.routes)for(const encounter of f.encounters){const lines=[...wrap(name),...wrap(route),...wrap(encounter)];rows.push({name,route,encounter,lines,width:Math.max(...lines.map(t=>b.measureTextWidth(t))),height:18+lines.length*34});}b.destroy();return rows;})()');
      await writeFile(evidenceRoot+'/memorial-measurements/catalog.json',JSON.stringify(catalogMeasures,null,2));
      for(const item of catalogMeasures)assert.ok(item.width<=280&&item.height<=192,JSON.stringify(item));
    }
    await browser.screenshot(`${evidence('IT-055')}/${kind}-before-bounds.png`);
    for(const row of measurements)for(const draw of row.draws.filter(draw=>draw.text)){
      assert.ok(draw.font*row.scale[1]>=24,JSON.stringify({hero:row.hero,draw}));
      assert.ok(draw.x>=0&&draw.y>=0&&draw.x+draw.width<=draw.bitmap[0]&&draw.y+draw.lineHeight<=draw.bitmap[1],JSON.stringify({hero:row.hero,draw}));
    }
    await assertMemorial(browser,state);
    await frames(browser,45);assert.deepEqual(await campaignSnapshot(browser),state);
    await browser.screenshot(`${evidence('IT-055')}/${kind}-collective.png`);
    await browser.press('Enter',13);await memorialReady(browser);
    await assertMemorial(browser,await campaignSnapshot(browser));
    assert.equal(await browser.evaluate("closingPresentation.events.filter(e=>e.type==='memorial').length"),1);
    for(const hero of heroes.filter(id=>state.deadHeroIds.includes(id))){
      const before=await campaignSnapshot(browser),index=Number(hero.slice(1))-1;
      assert.equal(before.reading.passageIds[before.reading.index],`memorial.${hero}`);
      assert.equal(await browser.evaluate('$gameMessage.allText()'),heroNames[index]+' não voltou da expedição.');
      await browser.press('Enter',13);await memorialReady(browser);
      assert.deepEqual(await campaignSnapshot(browser),before,'The first box does not complete the inscription');
      const cause=events.find(e=>e?.name===`memorial_cause.${state.deathLocations[hero].encounterId}`).list.find(c=>c.code===122&&c.parameters[0]===152);
      const expected=JSON.parse(cause.parameters[4]).replace(/<br>/g,' ').replace(/\s+/g,' ').trim();
      const actual=await browser.evaluate("SceneManager._scene._messageWindow.convertEscapeCharacters($gameMessage.allText()).replace(/\\x1bWrapBreak\\[0\\]/gi,' ').replace(/\\s+/g,' ').trim()");
      assert.equal(actual,expected,'Full authored inscription remains readable');
      await browser.press('Enter',13);await closingReady(browser);
      assert.equal((await campaignSnapshot(browser)).sequence,before.sequence+1);
    }
    assert.notEqual((await campaignSnapshot(browser)).phase,'memorial');
    assert.equal(await saveBytes(browser),bytes);
    assert.equal(await browser.evaluate('Array.from({length:28},(_,i)=>$gameScreen.picture(10+i)).some(Boolean)'),false);
  }
  await resetPresentation(browser);await beginEnding(browser,'collective','reunite');
  await finishPhase(browser,'ending');
  assert.equal((await campaignSnapshot(browser)).phase,'epilogue');
  assert.equal(await browser.evaluate("closingPresentation.events.some(e=>e.type==='memorial')"),false);
});
canonicalCase('IT-056','dedicated native memorial moves all losses together and crossfades without facts or carried input; reduced motion is direct',{timeout:210000},async t=>{
  const browser=await tavern(t);await observePresentation(browser);
  assert.equal(events[59].name,'Memorial — Animação');
  assert.ok(events[40].list.some(c=>c.code===117&&c.parameters[0]===59));
  for(const reduced of [false,true])for(const [kind,ending] of [['mixed','destroy'],['bad','bad']]){
    await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});
    await resetPresentation(browser);await beginEnding(browser,kind,ending);
    // Advance to the final ending passage, then hold its confirmation through
    // the complete animation. It cannot dismiss the incoming memorial.
    let state=await campaignSnapshot(browser);
    while(state.reading.index<state.reading.passageIds.length-1){await closingReady(browser);await browser.press('Enter',13);state=await campaignSnapshot(browser);}
    await closingReady(browser);
    const expected=complete(state);
    await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await memorialReady(browser);await frames(browser,8);
    assert.deepEqual(await campaignSnapshot(browser),expected);
    await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await frames(browser,3);
    await assertMemorial(browser,expected);
    const log=await browser.evaluate('closingPresentation');
    const moves=log.events.filter(e=>e.type==='move');
    if(reduced){
      assert.deepEqual(moves,[]);assert.equal(log.ticks.some(tick=>tick.overlap>0),false);
      assert.equal(log.events.some(event=>event.type==='memorial_capture'),false);
      assert.ok(log.events.find(event=>event.type==='memorial_ready').frame-log.events.find(event=>event.type==='memorial').frame<15);
    }
    else{
      const ids=heroes.filter(id=>expected.deadHeroIds.includes(id)).map(id=>9+Number(id.slice(1)));
      const travelling=ids.map(id=>id+36);
      assert.deepEqual(moves.map(e=>e.args[0]),[...travelling,...ids.flatMap((id,i)=>[travelling[i],id])]);
      for(const first of moves.slice(0,ids.length)){assert.equal(first.args[8],90);assert.equal(first.frame,moves[0].frame);}
      for(const last of moves.slice(ids.length)){assert.equal(last.args[8],45);assert.equal(last.frame,moves[ids.length].frame);}
      assert.ok(moves[ids.length].frame-moves[0].frame>=90);
      assert.ok(log.ticks.some(tick=>tick.overlap===ids.length),'Both authored native portraits overlap during the fade.');
    }
    for(const event of log.events)assert.equal(event.sequence,expected.sequence);
    for(const tick of log.ticks)assert.equal(tick.sequence,expected.sequence);
    await browser.screenshot(`${evidence('IT-056')}/${kind}-${reduced?'reduced':'animated'}.png`);
    assert.equal(await browser.evaluate('SceneManager._scene._spriteset._pictureContainer.children.some(s=>s._drylandGhost)'),false);
  }
});
async function walkWithEpilogues(browser){
  const seen=[], readings=new Map();
  for(let i=0;i<80;i++){
    await closingReady(browser);const state=await campaignSnapshot(browser);
    if(state.phase==='campaign_complete'){
      for(const [hero,reading] of readings)assert.equal(reading.index,reading.boxes.length,`${hero}: every authored box precedes credits`);
      await creditsReady(browser);return seen;
    }
    if(state.phase==='epilogue'){
      const hero=state.reading.sceneId.split('.')[1],name='Reed final';
      await browser.waitFor(`$gameScreen.picture(60)?.name()===${JSON.stringify(name)}`);
      assert.deepEqual(await browser.evaluate('Array.from({length:10},(_,i)=>$gameScreen.picture(61+i)?.name()).filter(Boolean)'),[]);
      assert.equal(await browser.evaluate('$gameMap.mapId()'),28+Number(hero.slice(1)));
      const id=state.reading.passageIds[state.reading.index];
      assert.equal(id,`epilogue.${hero}`);
      if(!readings.has(hero)){
        const map=JSON.parse(await readFile(`${project}/data/Map${String(28+Number(hero.slice(1))).padStart(3,'0')}.json`,'utf8'));
        readings.set(hero,{boxes:passageBoxes(map.events[1].pages[0].list,id),index:0});
        seen.push(hero);await browser.screenshot(`${evidence('IT-058')}/epilogue-${hero}.png`);
      }
      const reading=readings.get(hero);
      assert.ok(reading.index<reading.boxes.length,`${hero}: no repeated box`);
      assert.equal(await browser.evaluate('$gameMessage.allText()'),reading.boxes[reading.index++]);
    }
    await browser.press('Enter',13);
  }
  assert.fail('Closing did not reach credits.');
}
canonicalCase('IT-058','all eligible native epilogue illustrations lead to visible mouse/keyboard/automatic credits without an extra title action',{timeout:300000},async t=>{
  const browser=await tavern(t);await observePresentation(browser);
  const seen=[];
  for(const party of [['H1','H2','H3'],['H4','H5','H6'],['H6','H7','H8']]){
    await installClosing(browser,endingWithHeroes(party));
    seen.push(...await walkWithEpilogues(browser));
    await browser.press('Escape',27);await titleReady(browser);
  }
  assert.deepEqual([...new Set(seen)].sort(),heroes);
  const results=[];
  for(const [mode,kind,ending] of [['mouse','mixed','destroy'],['keyboard','solo','reunite'],['automatic','collective','destroy'],['accelerated','bad','bad'],['late-mouse','bad','bad'],['late-keyboard','bad','bad'],['long','bad','bad']]){
    await resetPresentation(browser);await beginEnding(browser,kind,ending);const fileId=await browser.evaluate('$gameSystem.savefileId()');const bytes=await saveBytes(browser);
    if(mode==='long')await browser.evaluate(`$dataCommonEvents[63].list=[{code:105,indent:0,parameters:[2,false]},...Array.from({length:80},(_,i)=>({code:405,indent:0,parameters:['<center>Linha de teste '+(i+1)]})),{code:0,indent:0,parameters:[]}];`);
    await walkWithEpilogues(browser);await browser.screenshot(`${evidence('IT-058')}/credits-${mode}.png`);
    if(mode==='automatic'){await browser.waitFor('SceneManager._scene._scrollTextWindow._scrollY>-400');await browser.screenshot(`${evidence('IT-058')}/credits-mid-roll.png`);}
    if(mode.startsWith('late'))await browser.waitFor('SceneManager._scene._scrollTextWindow._scrollY>0');
    if(mode.includes('mouse')){
      await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',x:1100,y:672,button:'left',buttons:1,clickCount:1});
    }else if(mode.includes('keyboard'))await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    else if(['accelerated','long'].includes(mode)){
      if(mode==='accelerated'){
        assert.equal(await browser.evaluate('SceneManager._scene._scrollTextWindow.scrollSpeed()'),1);
        await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await frames(browser,3);
        assert.equal(await browser.evaluate('SceneManager._scene._scrollTextWindow.scrollSpeed()'),3);
        await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});await frames(browser,3);
        await browser.call('Input.dispatchMouseEvent',{type:'mousePressed',x:300,y:300,button:'left',buttons:1,clickCount:1});await frames(browser,3);
        assert.equal(await browser.evaluate('SceneManager._scene._scrollTextWindow.scrollSpeed()'),3);
        await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:300,y:300,button:'left',buttons:0,clickCount:1});await frames(browser,3);
      }
      await browser.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Shift',code:'ShiftLeft',windowsVirtualKeyCode:16});await frames(browser,3);
      assert.equal(await browser.evaluate('SceneManager._scene._scrollTextWindow.scrollSpeed()'),3);
    }
    if(mode==='long'){
      await browser.waitFor('SceneManager._scene._scrollTextWindow._blockIndex>0');
      assert.ok(await browser.evaluate('SceneManager._scene._scrollTextWindow._allTextHeight>2048'));
      await browser.screenshot(`${evidence('IT-058')}/credits-long-second-block.png`);
    }
    await titleReady(browser);await frames(browser,20);
    const log=await browser.evaluate('closingPresentation');
    assert.equal(log.returns,1);
    const start=log.events.find(e=>e.type==='credits'),finish=log.events.filter(e=>e.type==='credits_finish');
    assert.equal(finish.length,1);
    assert.equal(finish[0].natural,['automatic','accelerated','long'].includes(mode));
    if(finish[0].natural)assert.ok(finish[0].y>=finish[0].height);
    results.push({mode,start,finish:finish[0],returns:log.returns});
    const titleState=await campaignSnapshot(browser);
    assert.equal(titleState.phase,'ready');assert.equal(titleState.sequence,0);assert.deepEqual(titleState.history,[]);
    assert.equal(await browser.evaluate(`StorageManager.loadZip('file${fileId}')`),bytes);
    if(mode.includes('mouse'))await browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:1100,y:672,button:'left',buttons:0,clickCount:1});
    if(mode.includes('keyboard'))await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    if(['accelerated','long'].includes(mode))await browser.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Shift',code:'ShiftLeft',windowsVirtualKeyCode:16});
    await frames(browser,3);
  }
  const natural=results.find(r=>r.mode==='automatic'),fast=results.find(r=>r.mode==='accelerated');
  assert.ok(natural.finish.frame-natural.start.frame>fast.finish.frame-fast.start.frame);
  await mkdir(evidence('IT-058'),{recursive:true});await writeFile(`${evidence('IT-058')}/scrolling.json`,JSON.stringify(results,null,2));
});
canonicalCase('IT-022','native terminal Continue repeatedly replays the saved outcome through memorial epilogues and credits without rewriting the selected file',{timeout:720000},async t=>{
  const browser=await tavern(t);await observePresentation(browser);await observeClosing(browser);
  const started=Date.now(),progress=[];
  const progressDirectory=`${evidenceRoot}/IT-022`;
  await mkdir(progressDirectory,{recursive:true});
  const observer=stage=>async passage=>{progress.push({elapsedMs:Date.now()-started,stage,...passage});await writeFile(`${progressDirectory}/progress.json`,JSON.stringify(progress,null,2));};
  for(const [kind,ending] of [['mixed','reunite'],['solo','destroy'],['bad','bad']]){
    await resetPresentation(browser);const terminal=await beginEnding(browser,kind,ending),bytes=await saveBytes(browser),fileId=await browser.evaluate('$gameSystem.savefileId()');
    const baseline=await finishNativeClosing(browser,{onPassage:observer(kind+'-baseline')});await creditsReady(browser);await browser.press('Escape',27);await titleReady(browser);
    const count=await browser.evaluate('closingLog.saves.length');
    for(let repeat=0;repeat<2;repeat++){
      await titleReady(browser);
      assert.equal(await browser.evaluate("$gameMessage.choices()[SceneManager._scene._choiceListWindow.index()].replace(/<[^>]*>/g,'')"),'Continuar');
      await browser.press('Enter',13);await selectFile(browser,fileId);await closingReady(browser);
      assert.deepEqual(await campaignSnapshot(browser),terminal);
      const replay=await finishNativeClosing(browser,{onPassage:observer(kind+'-replay-'+repeat)});await creditsReady(browser);
      assert.deepEqual(replay.seen,baseline.seen);assert.equal(replay.state.endingId,ending);
      assert.equal(await browser.evaluate('closingLog.saves.length'),count);assert.equal(await saveBytes(browser),bytes);
      await browser.press('Escape',27);await titleReady(browser);
    }
  }
});
