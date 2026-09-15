import fs from 'node:fs';
const file='rpg-maker/tests/suites/content.mjs';let source=fs.readFileSync(file,'utf8');
const start=source.indexOf("canonicalCase('IT-069'");const end=source.indexOf('\n// INVARIANT:',start);
let test=source.slice(start,end);
test=test.replace("const l=parse(events).locations['profile.H1'],list=events[l.commonEventId].list;","const list=events.find(event=>event?.name==='Perfil — Gorvak').list;");
test=test.replace("list.slice(l.start,l.end).filter(c=>c.code===357)","list.filter(c=>c.code===357&&c.parameters[0]==='VisuMZ_2_VNPictureBusts')").replace("list.findIndex((c,i)=>i>=l.start&&c.code===101)","list.findIndex(c=>c.code===101)");
test=test.replace("  list.splice(first,0,","  list.splice(first,0,\n   command(231,[92,'Dryland_Button',0,31,37,100,100,181,0]),");
// Arbitrary-picture native command uses constant coordinates (not variable mode).
test=test.replace("[92,'Dryland_Button',0,31,37,100,100,181,0]","[92,'Dryland_Button',0,0,31,37,100,100,181,0]");
test=test.replace(" });\n await startServer",`  // The fixture explicitly authors its extra bust exit. No runtime owner does it.
  const interaction=events[5].list;
  const stage=interaction.findIndex(c=>c.code===117&&c.parameters[0]===38);
  interaction.splice(stage,0,{...command(235,[66]),indent:1});
 });
 await startServer`);
test=test.replace(" const before=await snapshot();"," const before=await snapshot();\n const extra=await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))');");
test=test.replace(" assert.deepEqual(await snapshot(),before,'Options restores all authored vendor effects');"," assert.deepEqual(await snapshot(),before,'Options retains native picture state');\n assert.equal(await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))'),extra);");
test=test.replace(" assert.deepEqual(await snapshot(),before,'Native Continue restores the same final composition');"," assert.deepEqual(await snapshot(),before,'Native Continue retains saved picture state');\n assert.equal(await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))'),extra);");
test=test.replace(" assert.deepEqual(browser.exceptions,[]);"," assert.equal(await browser.evaluate('JsonEx.stringify($gameScreen.picture(92))'),extra,'Authored bust exit leaves the independent picture intact');\n assert.deepEqual(browser.exceptions,[]);");
source=source.slice(0,start)+test+source.slice(end);fs.writeFileSync(file,source);
const persistenceFile='rpg-maker/tests/suites/persistence.mjs';let persistence=fs.readFileSync(persistenceFile,'utf8');
persistence=persistence.replace("import { closingReady, councilState, installClosing }", "import { closingReady, councilState, installClosing }");
persistence=persistence.replace("import { openChrome, origin, project, startServer }", "import { installPhase, click } from '../helpers/native-shared.mjs';\nimport { endingWithHeroes } from '../helpers/closing-presentation.mjs';\nimport { finishReading } from '../helpers/campaign.mjs';\nimport { openChrome, origin, project, startServer }");
const first=persistence.indexOf("canonicalCase('IT-062'");const last=persistence.indexOf("canonicalCase('IT-063'",first);
const replacement=`canonicalCase('IT-062','native Options and saved interpreters retain tavern Council farewell and epilogue pictures without replay',{timeout:180000},async t=>{
 const browser=await tavern(t);
 await browser.evaluate(\`window.continuityLoaded=false;window.continuityHold=false;window.continuityCues=[];
  const execute=Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand=function(){return continuityLoaded&&continuityHold?false:execute.call(this);};
  const load=DataManager.loadGame;DataManager.loadGame=function(id){return load.call(this,id).then(result=>{continuityLoaded=true;return result;});};
  const audio=AudioManager.playSe;AudioManager.playSe=function(cue){continuityCues.push(cue.name);return audio.call(this,cue);};\`);
 const pictures=()=>browser.evaluate(\`Array.from({length:100},(_,id)=>{const p=$gameScreen.picture(id);return p?{id,name:p.name(),x:p.x(),y:p.y(),scaleX:p.scaleX(),scaleY:p.scaleY(),opacity:p.opacity(),tone:p.tone(),origin:p.origin()}:null;}).filter(Boolean)\`);
 for(const kind of ['tavern','council','farewell','epilogue']){
  await browser.evaluate('continuityLoaded=false;continuityHold=false;');
  if(kind==='tavern'){await activate(browser,'formation',0);await activate(browser,'hero',0);}
  else if(kind==='council')await installPhase(browser,councilState());
  else if(kind==='farewell')await installPhase(browser,complete(accepted(failureWithCount(3),'SELECT_VICTIM',{heroId:'H1'})));
  else await installPhase(browser,finishReading(endingWithHeroes(['H1','H2','H3'])));
  await pause(browser);
  await browser.evaluate("$gameScreen.showPicture(92,'Dryland_Button',0,31,37,30,40,181,0)");
  await browser.waitFor('$gameScreen._pictures.filter(Boolean).every(p=>p._duration===0&&p._toneDuration===0)');
  const before=await snapshot(browser),shown=await pictures(),cues=await browser.evaluate('continuityCues.slice()');
  await click(browser,560,693);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
  await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await pause(browser);
  assert.deepEqual(await pictures(),shown,kind+' Options');assert.deepEqual(await snapshot(browser),before);
  assert.deepEqual(await browser.evaluate('continuityCues'),cues,kind+' Options must not replay audio');
  // Isolated native save fixture. Freeze only the post-load execution boundary
  // to inspect the serialized screen/interpreter before ordinary continuation.
  await browser.evaluate('DataManager.saveGame(0)');const bytes=await savedBytes(browser);
  await toTitle(browser);await browser.evaluate('continuityLoaded=false;continuityHold=true;');await titleChoice(browser,'Continuar');
  await browser.waitFor("continuityLoaded&&SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");
  assert.deepEqual(await pictures(),shown,kind+' Continue');assert.deepEqual(await snapshot(browser),before);assert.equal(await savedBytes(browser),bytes);
  assert.equal(await browser.evaluate('Boolean($gameMap._interpreter._childInterpreter)'),true,'Native interpreter chain survives serialization');
  await browser.screenshot(evidence('IT-062')+'/'+kind+'-native-continuity.png');
  await browser.evaluate('continuityHold=false;');
 }
});

`;
persistence=persistence.slice(0,first)+replacement+persistence.slice(last);fs.writeFileSync(persistenceFile,persistence);
