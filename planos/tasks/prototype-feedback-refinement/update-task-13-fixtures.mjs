import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
let path='rpg-maker/tests/helpers/native-chrome.mjs',source=readFileSync(path,'utf8');
assert.ok(source.includes('export async function selectFile(browser, fileId) {'));
source=source.replace('export async function selectFile(browser, fileId) {','export async function enterFileSelection(browser) {');
source=source.replace('  if (fileId !== undefined) {','}\n\nexport async function selectFile(browser, fileId) {\n  await enterFileSelection(browser);\n  if (fileId !== undefined) {');
writeFileSync(path,source);
path='rpg-maker/tests/suites/persistence.mjs';source=readFileSync(path,'utf8');
source=source.replace('origin, project, selectFile, startServer','origin, project, selectFile, enterFileSelection, startServer');
source=source.replaceAll("window.$gameMessage?.choices().includes('Jogar')","window.$gameMessage?._drylandChoiceFocus?.key==='title'");
source=source.replace("await browser.waitFor('SceneManager._scene instanceof Scene_Save&&SceneManager._scene._listWindow.isOpenAndActive()&&!SceneManager._scene.isBusy()');","await enterFileSelection(browser);");
writeFileSync(path,source);
path='rpg-maker/tests/suites/memorial.mjs';source=readFileSync(path,'utf8');
source=source.replace("browser.evaluate('$gameMessage.choices()[SceneManager._scene._choiceListWindow.index()]')","browser.evaluate(\"$gameMessage.choices()[SceneManager._scene._choiceListWindow.index()].replace(/<[^>]*>/g,'')\")");
writeFileSync(path,source);
path='rpg-maker/qa/native-player.mjs';source=readFileSync(path,'utf8');
const file='  async file(fileId) {';assert.ok(source.includes(file));
source=source.replace(file,file+`
    await this.context.wait(()=>SceneManager._scene instanceof Scene_File || ($gameMessage._drylandChoiceFocus?.key==='age-notice'&&SceneManager._scene._choiceListWindow?.isOpenAndActive()));
    if((await this.surface()).kind==='age-notice'){
      assert.equal(await this.context.read('fresh-age-notice',()=>$gameTemp._drylandAgeNotice.checked),false);
      await this.choose('Tenho 16 anos de idade ou mais');
      await this.choose('Jogar');
    }
`);
const from=source.indexOf('  async returnToTavern() {'),to=source.indexOf('  async until(kind) {',from);
assert.ok(from>=0&&to>from);
source=source.slice(0,from)+`  async returnToTavern() {
    for(let step=0;step<100;step++){
      const surface=await this.ready();
      if(surface.active&&surface.kind==='formation'){assert.equal(surface.map,3);return surface;}
      if(surface.active&&surface.kind==='hero'){await this.choose('Voltar à taverna');continue;}
      assert.ok(surface.paused,'Expected hero dialogue or tavern: '+JSON.stringify(surface));
      if(this.onPassage)await this.onPassage(this,surface);
      await this.context.shot('return-passage-'+(++this.serial));
      await this.context.input.key('Enter');
      if(this.onAdvance)await this.onAdvance(this,surface);
    }
    throw Error('Too many passages before tavern');
  }

`+source.slice(to);
writeFileSync(path,source);
path='rpg-maker/tests/suites/native-checkpoints.mjs';source=readFileSync(path,'utf8').replace("branch==='producer'?'Jogar':'Continuar'","branch==='producer'?'Novo jogo':'Continuar'").replace("player.choose('Destinos')","player.choose('Seguir')");writeFileSync(path,source);
path='rpg-maker/qa/native-journeys.test.mjs';source=readFileSync(path,'utf8').replaceAll("player.choose('Jogar')","player.choose('Novo jogo')").replaceAll("player.choose('Destinos')","player.choose('Seguir')").replaceAll("$gameMessage.choices().includes('Continuar')","$gameMessage.choices().some(label=>label.replace(/<[^>]*>/g,'')==='Continuar')");writeFileSync(path,source);
