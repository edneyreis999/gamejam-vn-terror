import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const file='rpg-maker/tests/suites/retreat.mjs';let source=readFileSync(file,'utf8').replaceAll('\r\n','\n');
source=source.replace("import { selectFile } from '../helpers/native-chrome.mjs';","import {continueSave} from '../helpers/discovery.mjs';");
source=source.replace('args[8]===60','args[8]===180').replace('elapsed<65','elapsed<185');
source=source.replace('absenceFrames.push({elapsed,pictures:',"absenceFrames.push({elapsed,choiceActive:SceneManager._scene._choiceListWindow?.active,pictures:");
source=source.replace('async function beginReturn(t, reduced = false)', 'async function beginReturn(t, reduced = false, during = false)');
source=source.replace("  await choices(browser, 'formation');\n  return { browser, before };", "  if (during) await browser.waitFor('absenceMoves.length === 3');\n  else await choices(browser, 'formation');\n  return { browser, before };");
source=source.replace('native return fades simultaneous new losses at fixed positions over sixty picture frames','native return fades all losses simultaneously for 180 frames before enabling preparation');
source=source.replace("  assert.deepEqual(await browser.evaluate('[38,39,40].map(id=>$gameSwitches.value(id))'), [true,true,true]);\n",'');
source=source.replace('[[344, 520], [840, 176], [760, 497]]','[[260, 392], [756, 92], [660, 400]]');
source=source.replace('absenceFrames.length === 65','absenceFrames.length === 185');
source=source.replace('  for (const frame of frames) {','  for (const frame of frames) {\n    if(frame.elapsed < 180) assert.equal(frame.choiceActive,false,JSON.stringify(frame));');
source=source.replace('frames[28]','frames[89]').replace('frames[59]','frames[179]').replace('frames[64]','frames[184]');
const final09="  assert.deepEqual(await snapshot(browser), returned);\n});\ncanonicalCase('IT-010'";
assert.ok(source.includes(final09));
source=source.replace(final09,`  assert.deepEqual(await snapshot(browser), returned);
  // A later genuine return includes older losses even if legacy flags are set.
  await browser.evaluate('[38,39,40].forEach(id=>$gameSwitches.setValue(id,true))');
  await installRoute(browser,before);await pause(browser);await browser.press('Enter',13);
  await choices(browser,'formation');
  assert.deepEqual(await browser.evaluate('absenceMoves.slice(3).map(move=>move.args[0])'),[10,11,12]);
  assert.deepEqual(await snapshot(browser),returned);
});
canonicalCase('IT-010'`);
const start=source.indexOf("canonicalCase('IT-010'"),end=source.indexOf("canonicalCase('IT-011'",start);
source=source.slice(0,start)+`canonicalCase('IT-010', 'saving during the return wait restores empty places without replay or dead targets', { timeout: 90000 }, async t => {
  const {browser}=await beginReturn(t,false,true);
  const before=await snapshot(browser);
  assert.ok(await browser.evaluate('[10,11,12].some(id=>$gameScreen.picture(id)?.opacity()>0)'));
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow.active'),false);
  await browser.evaluate('DataManager.saveGame($gameSystem.savefileId())');
  const saved=await browser.evaluate('StorageManager.loadObject("file"+$gameSystem.savefileId()).then(contents=>{let i=contents.map._interpreter;while(i._childInterpreter)i=i._childInterpreter;return i._waitMode;})');
  assert.equal(saved,'dryland-return');
  await continueSave(browser);await choices(browser,'formation');
  assert.equal(await browser.evaluate('absenceMoves.length'),3);
  assert.deepEqual(await browser.evaluate('[10,11,12].map(id=>Boolean($gameScreen.picture(id)))'),[false,false,false]);
  assert.equal(await browser.evaluate('Boolean($gameTemp._drylandReturnPictures)'),false);
  assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow._list.some(entry=>/Bind Picture: (10|11|12)>/.test(entry.name))'),false);
  assert.deepEqual(await snapshot(browser),before);
});
`+source.slice(end);
source=source.replace("entry.name.startsWith('Elenco')","entry.name.startsWith('Quadro')");
const oldPanel=source.indexOf('  const panel = await browser.evaluate',source.indexOf("canonicalCase('IT-011'"));
const shot=source.indexOf('  await browser.screenshot',oldPanel);
source=source.slice(0,oldPanel)+`  const names=await browser.evaluate('[72,73,74].map(id=>SceneManager._scene._messageWindow.convertEscapeCharacters($gameScreen.getPictureTextData(id).center))');
  for(const [i,name] of ['Gorvak','Elowen','Griznik'].entries())assert.ok(names[i].includes(name));
`+source.slice(shot);
writeFileSync(file,source);
const helper='rpg-maker/tests/helpers/discovery.mjs';let helperSource=readFileSync(helper,'utf8');
helperSource=helperSource.replace('args[0]>=2 && args[0]<=4','((args[0]>=2 && args[0]<=4) || args[0]===90)');
writeFileSync(helper,helperSource);
const discovery='rpg-maker/tests/suites/discovery.mjs';let discoverySource=readFileSync(discovery,'utf8');
const sensor=`async function assertRouteReturn(browser, reduced) {
  const sequence=(await snapshot(browser)).sequence;
  const moves=await browser.evaluate('discoveryEvents.filter(e=>e.name==="movePicture"&&e.args[0]===90&&e.sequence==='+sequence+')');
  if(reduced)assert.deepEqual(moves,[]);
  else {
    assert.deepEqual(moves.map(e=>[e.args[6],e.args[8]]),[[255,30],[0,30]]);
    assert.ok(moves[1].frame-moves[0].frame>=54,JSON.stringify(moves));
    assert.equal(await browser.evaluate('$gameScreen.picture(90)==null'),true);
  }
}
`;
discoverySource=discoverySource.replace('async function reachReceipt',sensor+'async function reachReceipt');
discoverySource=discoverySource.replaceAll("await choices(browser, 'formation');","await choices(browser, 'formation');await assertRouteReturn(browser,reduced);");
writeFileSync(discovery,discoverySource);
