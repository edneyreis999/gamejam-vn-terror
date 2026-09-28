import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
function edit(file,transform){const path='rpg-maker/tests/suites/'+file+'.mjs',old=readFileSync(path,'utf8'),next=transform(old);assert.notEqual(next,old,file);writeFileSync(path,next);}
edit('persistence',s=>s.replace('act, activate, choices,','act, activate, tavernAction, choices,')
 .replaceAll("await activate(browser,'formation',11)","await tavernAction(browser,'Salvar campanha atual')")
 .replaceAll("await activate(browser,'formation',10)","await tavernAction(browser,'Configurações')")
 .replace("assert.equal(await browser.evaluate('$gameScreen.picture(44)?.name()'),'Dryland_SaveButton');","assert.equal(await browser.evaluate('Boolean($gameScreen.picture(44))'),false);")
 .replace(/  const point=await browser.evaluate\('\(\(\)=>\{const r=Graphics\._canvas\.getBoundingClientRect\(\);return \{x:r.x\+1088\*r.width\/1280,y:r.y\+40\*r.height\/720\}\}\)\(\)'\);\r?\n  await click\(browser,point.x,point.y\);/,"  await tavernAction(browser,'Salvar campanha atual');")
 .replaceAll("_choiceListWindow.index()'),11)","_choiceListWindow.index()'),9)")
 .replaceAll("_choiceListWindow.index()'),10)","_choiceListWindow.index()'),9)")
 .replace("assert.equal(await browser.evaluate('$gameScreen.getPictureTextData(44).center'),'\\\\FS[26]Salvando…');","assert.equal(await browser.evaluate('SceneManager._scene._choiceListWindow._list[2].name'),'\\\\FS[18]Salvando…');"));
for(const file of ['shared-ui','native-controls'])edit(file,s=>s.replace('act, activate, choices,','act, activate, tavernAction, choices,')
 .replace("await activate(browser,'formation',index);await choices(browser,kind);","if(kind==='roster')await tavernAction(browser,'Quadro');else await activate(browser,'formation',index);await choices(browser,kind);")
 .replace("await click(browser,640,512);await selectFile(browser,1);","await activate(browser,'age-notice',1);await selectFile(browser,1);"));
edit('formation',s=>s.replace('act, activate, CatalogError,','act, activate, tavernAction, CatalogError,')
 .replace("assert.equal(await browser.evaluate('$gameScreen.picture(42).name()'),'Dryland_WallBoard');","assert.equal(await browser.evaluate('Boolean($gameScreen.picture(43)||$gameScreen.picture(44))'),false);")
 .replace(/      const point=await browser.evaluate\([^\n]+\r?\n      await click\(browser,point.x,point.y\);await choices\(browser,'roster'\);/,"      await tavernAction(browser,'Quadro');await choices(browser,'roster');")
 .replace("await activate(browser,'formation',8-dead.length+1);await choices(browser,'roster');","await tavernAction(browser,'Quadro');await choices(browser,'roster');"));
