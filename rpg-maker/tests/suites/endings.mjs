import assert from 'node:assert/strict';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { activate, choices, tavern } from '../helpers/formation.mjs';
import { councilWithHeroes, councilAfterLosses } from '../helpers/closing-presentation.mjs';
import { accepted, complete, rejectUnchanged } from '../helpers/campaign.mjs';
import { continueSave } from '../helpers/discovery.mjs';
import { closingReady, councilBoundary, councilState, finalChoice, finishNativeClosing, installClosing, observeClosing } from '../helpers/closing.mjs';
const evidence=id=>`docs/qa/evidence/init-rpg-maker-mz/task-09/${id}`;
const snapshot=browser=>browser.evaluate('$gameSystem._dryland.campaign');
const ended=(kind,ending)=>kind==='bad'?councilState('bad'):accepted(finalChoice(kind),'CHOOSE_ENDING',{ending});
canonicalCase('UT-033','Council freezes only living climax witnesses in canonical order and chooses exactly one confession branch',()=>{
 for(const kind of ['collective','mixed','solo']){
  const state=councilState(kind), expected=kind==='solo'?[]:['H1','H2','H3'];
  assert.equal(state.phase,'council');assert.deepEqual(state.climaxPartyIds,expected);
  assert.deepEqual(state.reading.passageIds.filter(id=>id.startsWith('opinion.')),expected.map(id=>`opinion.${id}`));
  assert.equal(state.reading.passageIds.filter(id=>['council.solo','council.challenge'].includes(id)).length,1);
  assert.ok(state.reading.passageIds.includes(kind==='solo'?'council.solo':'council.challenge'));
  assert.equal(state.reading.passageIds.filter(id=>id==='council.confession').length,1);
  for(const id of state.deadHeroIds)assert.equal(state.climaxPartyIds.includes(id),false);
 }
});
canonicalCase('UT-034','both medallion choices commit their own outcome once and invalid endings preserve state',()=>{
 const before=finalChoice('mixed');
 for(const ending of ['reunite','destroy']){
  const state=accepted(before,'CHOOSE_ENDING',{ending});assert.equal(state.phase,'ending');assert.equal(state.endingId,ending);assert.equal(state.reading.sceneId,`ending.${ending}`);
  assert.deepEqual(state.climaxPartyIds,['H1','H2','H3']);assert.deepEqual(state.deadHeroIds,['H4']);
  rejectUnchanged(state,'CHOOSE_ENDING',{ending:ending==='reunite'?'destroy':'reunite'},'invalid_transition');
 }
 for(const ending of ['unknown','bad','',null,0])rejectUnchanged(before,'CHOOSE_ENDING',{ending},'invalid_ending');
});
canonicalCase('UT-035','fixed epilogues belong only to living climax participants under either medallion ending',()=>{
 for(const kind of ['collective','mixed','solo','bad'])for(const ending of (kind==='bad'?['bad']:['reunite','destroy'])){
  let state=ended(kind,ending);const scenes=[];
  while(state.reading){if(state.phase==='epilogue'&&!scenes.includes(state.reading.sceneId))scenes.push(state.reading.sceneId);state=complete(state);}
  assert.equal(state.phase,'campaign_complete');
  assert.deepEqual(scenes,(kind==='solo'||kind==='bad'?[]:['H1','H2','H3']).map(id=>`epilogue.${id}`));
 }
});
canonicalCase('UT-036','the memorial is omitted for no deaths and otherwise contains exactly the recorded dead',()=>{
 for(const kind of ['collective','mixed','solo','bad']){
  let state=ended(kind,'reunite');const dead=state.deadHeroIds;
  while(state.phase==='ending')state=complete(state);
  assert.equal(state.phase==='memorial',dead.length>0);
  if(dead.length)assert.deepEqual(state.reading.passageIds,['memorial.intro',...dead.map(id=>`memorial.${id}`)]);
 }
});
async function readCouncil(browser,testId='IT-054'){
 const seen=[];
 for(let count=0;count<35;count++){
  if((await snapshot(browser)).phase==='final_choice'){await choices(browser,'ending');assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection||null'),null,'Council exit must not report a rejected presentation helper');return seen;}
  await closingReady(browser);const state=await snapshot(browser);
  assert.ok(['approach_result','death_result','council'].includes(state.phase));
  if(state.phase==='council'){
   const id=state.reading.passageIds[state.reading.index];
   if(!seen.some(x=>x.id===id)){
    const speaker=await browser.evaluate('$gameMessage.speakerName()');
    const heroes=state.climaxPartyIds;
    const staged=id==='council.challenge'||id==='council.confession'||id.startsWith('opinion.');
    const hasIvai=['council.solo','council.confession','council.andira'].includes(id)||id.startsWith('opinion.');
    const expected=[...Array.from({length:3},(_,i)=>staged&&heroes[i]?`Dryland_${heroes[i]}`:null),hasIvai?'Dryland_ivai':null,null,id==='council.andira'?'Dryland_andira':null];
    const pictures=await browser.evaluate('Array.from({length:6},(_,i)=>$gameScreen.picture(60+i)?.name()||null)');
    assert.deepEqual(pictures,expected,id);
    const focus = id.startsWith('opinion.') ? 60 + heroes.indexOf(id.slice(-2)) : id==='council.andira' ? 65 : hasIvai ? 63 : null;
    if(focus!==null){
     const tones=expected.map((name,index)=>name?{slot:60+index,tone:60+index===focus?[0,0,0,0]:[-24,-24,-24,0]}:null).filter(Boolean);
     await browser.waitFor(`${JSON.stringify(tones)}.every(({slot,tone})=>$gameScreen.picture(slot).tone().every((value,index)=>value===tone[index]))`);
     assert.deepEqual(await snapshot(browser),state,'Focus does not change campaign facts or complete a passage.');
    }
    assert.deepEqual(await browser.evaluate('[144,145,146].map(id=>$gameVariables.value(id))'),Array.from({length:3},(_,i)=>heroes[i]?Number(heroes[i].slice(1)):0));
    assert.equal(await browser.evaluate('$gameScreen.picture(18)==null'),true);
    assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'),'Dryland_Council');
    if(speaker==='Andirá'){
     const reflection=await browser.evaluate('(()=>{const p=$gameScreen.picture(65);return {x:p.x(),y:p.y(),scale:p.scaleX()};})()');
     assert.deepEqual(reflection,{x:330,y:500,scale:100},'Uniform authored reflection; PNG framing deferred by user.');
    }
    if(staged||speaker==='Andirá') await browser.screenshot(`${evidence(testId)}/${heroes.join('-')||'solo'}-${id}.png`);
    seen.push({id,speaker,pictures});
   }
  }
  await browser.press('Enter',13);
 }
 assert.fail('Native Council did not reach its fixed two choices.');
}
async function assertFullBackground(browser){
 const bounds=await browser.evaluate('(()=>{const p=$gameScreen.picture(1),b=ImageManager.loadPicture(p.name());return {width:b.width*p.scaleX()/100,height:b.height*p.scaleY()/100,x:p.x(),y:p.y(),origin:p.origin()};})()');
 assert.equal(bounds.origin,1);assert.equal(bounds.x,640);assert.equal(bounds.y,360);assert.ok(bounds.width>=1280-1e-9&&bounds.height>=720-1e-9,JSON.stringify(bounds));
}
canonicalCase('IT-054','native Council retains eligible slots, stages reflected intervention and clears the ensemble before each exclusive outcome',{timeout:240000},async t=>{
 const browser=await tavern(t);await observeClosing(browser);
 for(const [kind,ending,reduced] of [['collective','reunite',true],['collective','reunite',false],['mixed','destroy',false],['solo','reunite',true]]){
  await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]});
  await browser.evaluate('closingLog={maps:[],saves:[]};');await installClosing(browser,councilBoundary(kind));
  const seen=await readCouncil(browser,`IT-054/${reduced?'reduced':'normal'}`), state=await snapshot(browser);
  assert.deepEqual(seen.filter(x=>x.id.startsWith('opinion.')).map(x=>x.id),(kind==='solo'?[]:['opinion.H1','opinion.H2','opinion.H3']));
  assert.equal(state.medallionComplete,true);assert.equal(state.phase,'final_choice');
  assert.equal(await browser.evaluate('Array.from({length:6},(_,i)=>$gameScreen.picture(60+i)).some(Boolean)'),false);
  assert.deepEqual(await browser.evaluate('closingLog.saves.map(x=>x.phase)'),['council','council']);
  assert.equal(await browser.evaluate('$gameMessage.choices().length'),2);
  await browser.screenshot(`${evidence('IT-054')}/${reduced?'reduced':'normal'}-${kind}-choice.png`);
  await activate(browser,'ending',ending==='reunite'?0:1);await closingReady(browser);
  const after=await snapshot(browser);assert.equal(after.endingId,ending);assert.equal(after.phase,'ending');
  assert.equal(await browser.evaluate('$gameMap.mapId()'),ending==='reunite'?25:26);
  assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'),ending==='reunite'?'Dryland_EndingReunite':'Dryland_EndingDestroy');
  assert.equal(await browser.evaluate('Array.from({length:12},(_,i)=>$gameScreen.picture(10+i)).some(Boolean)'),false);
  await assertFullBackground(browser);await browser.screenshot(`${evidence('IT-054')}/${reduced?'reduced':'normal'}-${kind}-${ending}.png`);
  assert.deepEqual(await browser.evaluate("StorageManager.loadObject('file0').then(x=>x.system._dryland.campaign)"),after);
  assert.deepEqual(await browser.evaluate('closingLog.saves.map(x=>x.phase)'),['council','council','ending']);
 }
});
canonicalCase('IT-048','native saved outcomes route only through their own ending, conditional memorial and eligible epilogue maps',{timeout:300000},async t=>{
 const browser=await tavern(t);await observeClosing(browser);
 for(const [kind,ending] of [['collective','reunite'],['mixed','destroy'],['solo','destroy'],['bad','bad']]){
  await browser.evaluate('closingLog={maps:[],saves:[]};');
  if(kind==='bad'){
   await installClosing(browser,councilBoundary('bad'));
   for(let count=0;count<4&&(await snapshot(browser)).phase!=='ending';count++){await closingReady(browser);await browser.press('Enter',13);}
  }else{
   await installClosing(browser,finalChoice(kind));await activate(browser,'ending',ending==='reunite'?0:1);
  }
  await closingReady(browser);const terminal=await snapshot(browser);assert.equal(terminal.endingId,ending);assert.equal(terminal.phase,'ending');
  const bytes=await browser.evaluate("StorageManager.loadZip('file0')");
  assert.equal(await browser.evaluate('closingLog.saves.length'),1);
  const expectedTail=kind==='collective'?[29,30,31,28]:kind==='mixed'?[28,29,30,31,28]:[28];
  const mapCursor=await browser.evaluate('closingLog.maps.length');
  const image={reunite:'Dryland_EndingReunite',destroy:'Dryland_EndingDestroy',bad:'Dryland_EndingTotalLoss'}[ending];
  assert.equal(await browser.evaluate('$gameScreen.picture(1).name()'),image);
  await assertFullBackground(browser);
  assert.equal(await browser.evaluate('Array.from({length:12},(_,i)=>$gameScreen.picture(10+i)).some(Boolean)'),false);
  await browser.screenshot(`${evidence('IT-048')}/${kind}-${ending}.png`);
  const result=await finishNativeClosing(browser);
  assert.deepEqual(await browser.evaluate(`closingLog.maps.slice(${mapCursor})`),expectedTail);
  const expectedEpilogues=kind==='collective'||kind==='mixed'?[29,30,31]:[];
  assert.deepEqual([...new Set(result.seen.filter(x=>x.phase==='epilogue').map(x=>x.map))],expectedEpilogues);
  assert.equal(result.seen.some(x=>x.phase==='memorial'),kind!=='collective');
  for(const row of result.seen){
   if(row.phase==='ending')assert.equal(row.map,{reunite:25,destroy:26,bad:27}[ending]);
   if(row.phase==='memorial')assert.equal(row.map,28);
  }
  assert.equal(result.state.history.filter(action=>action.type==='CHOOSE_ENDING').length,kind==='bad'?0:1);
  assert.equal(await browser.evaluate("StorageManager.loadZip('file0')"),bytes);
  const saveCount=await browser.evaluate('closingLog.saves.length');
  const replayCursor=await browser.evaluate('closingLog.maps.length');
  await continueSave(browser);await closingReady(browser);assert.deepEqual(await snapshot(browser),terminal);
  const replay=await finishNativeClosing(browser);assert.deepEqual(replay.seen,result.seen);assert.equal(replay.state.endingId,ending);
  assert.deepEqual(await browser.evaluate(`closingLog.maps.slice(${replayCursor})`),[1,{reunite:25,destroy:26,bad:27}[ending],...expectedTail]);
  assert.equal(await browser.evaluate('closingLog.saves.length'),saveCount);
  assert.equal(await browser.evaluate("StorageManager.loadZip('file0')"),bytes);
  const endingMaps=await browser.evaluate('closingLog.maps.filter(id=>[25,26,27].includes(id))');
  assert.deepEqual([...new Set(endingMaps)],[{reunite:25,destroy:26,bad:27}[ending]]);
 }
});

canonicalCase('IT-061','native Council supports every hero recipe in canonically reachable occupied slots without changing eligibility',{timeout:300000},async t=>{
 const browser=await tavern(t);
 for(const party of [['H1','H2','H3'],['H2','H3','H4'],['H3','H4','H5'],['H4','H5','H6'],['H5','H6','H7'],['H6','H7','H8'],['H7','H8'],['H8']]){
  let state=party.length===3?councilWithHeroes(party):councilAfterLosses(party);
  while(state.reading.passageIds[state.reading.index]!=='council.challenge') state=complete(state);
  await installClosing(browser,state);
  const seen=await readCouncil(browser,'IT-061'),after=await snapshot(browser);
  assert.deepEqual(seen.filter(x=>x.id.startsWith('opinion.')).map(x=>x.id),party.map(id=>`opinion.${id}`));
  assert.deepEqual(after.climaxPartyIds,party);assert.deepEqual(after.deadHeroIds,state.deadHeroIds);assert.deepEqual(after.partyIds,state.partyIds);
  assert.equal(await browser.evaluate('Array.from({length:6},(_,i)=>$gameScreen.picture(60+i)).some(Boolean)'),false);
 }
});
