import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {game,command as c,plugin,presentation,button,show,text,plate,editCommonEvents} from './native-authoring.mjs';

plate('Dryland_SettingsButton',256,48);
plate('Dryland_SaveButton',320,48);
plate('Dryland_SaveNotice',320,32,'text');
editCommonEvents(events=>{
  const list=events[3].list;
  assert.ok(!list.some(row=>row.code===357&&row.parameters[1]==='SaveCurrentCampaign'));
  const notice=show(95,'Dryland_SaveNotice',928,600);notice.parameters[8]=0;
  const label=list.findIndex(row=>row.code===118);
  list.splice(label,0,notice,text(95,'\\FS[26]Campanha salva','right',0),presentation('BindInterfacePicture',{picture:'95',name:'Salvamento — aviso'}));
  const choice=list.findLast(row=>row.code===102);
  assert.equal(choice.parameters[0].length,4);
  const labels=['Configurações<Bind Picture: 43><Hide Choice Window>','Salvar campanha atual<Bind Picture: 44><Hide Choice Window>'];
  choice.parameters[0].push(...labels);
  const end=list.findLastIndex(row=>row.code===404);
  const settings=plugin('VisuMZ_4_EventTitleScene','Options',{'SlowFade:eval':'false'});settings.indent=1;
  const pending=text(44,'\\FS[26]Salvando…');pending.indent=1;
  const save=plugin('Dryland_EventBridge','SaveCurrentCampaign',{noticePicture:'95'});save.indent=1;
  list.splice(end,0,c(402,[4,labels[0]]),settings,c(0,[],1),c(402,[5,labels[1]]),pending,save,c(0,[],1));
  const stage=events[38].list;
  stage.splice(stage.length-1,0,...button(43,'Dryland_SettingsButton','Configurações',32,16),...button(44,'Dryland_SaveButton','Salvar campanha atual',928,16),
    presentation('BindInterfacePicture',{picture:'43',name:'Taverna — configurações'}),presentation('BindInterfacePicture',{picture:'44',name:'Taverna — salvar campanha'}));
  for(const id of [39,117])events[id].list.unshift(presentation('ClearSaveNotice'));
  const preload=events[351].list.find(row=>row.code===357&&row.parameters[1]==='SystemLoadImages').parameters[3];
  preload['pictures:arraystr']=JSON.stringify([...JSON.parse(preload['pictures:arraystr']),'Dryland_SettingsButton','Dryland_SaveButton','Dryland_SaveNotice']);
});

const bridge=game+'/js/plugins/Dryland_EventBridge.js';let source=readFileSync(bridge,'utf8').replaceAll('\r\n','\n');
assert.ok(!source.includes("'SaveCurrentCampaign'"));
source=source.replace(' * @command Checkpoint',' * @command SaveCurrentCampaign\n * @text Salvar campanha atual\n * @desc Grava o arquivo associado na preparação estável, após avançar o comando nativo.\n * @arg noticePicture\n * @text Imagem do aviso de sucesso\n * @type number\n * @min 1\n * @default 95\n * @command Checkpoint');
source=source.replace('  let inFlight = null;','  let inFlight = null;\n  let manualRequest = null;');
source=source.replace('    setupNewGame.call(this);','    manualRequest = null;\n    setupNewGame.call(this);');
const start=source.indexOf('  const saveGame = DataManager.saveGame;'),end=source.indexOf('  const loadGame = DataManager.loadGame;',start);
assert.ok(start>0&&end>start);
source=source.slice(0,start)+`  function finishManual(request, succeeded) {
    if (!request || manualRequest !== request) return;
    manualRequest = null;
    if (succeeded && request.system === $gameSystem && request.scene === SceneManager._scene) {
      plugin(request.interpreter, 'Dryland_Presentation', 'ShowSaveNotice', {picture: String(request.noticePicture)});
    }
  }
  const saveGame = DataManager.saveGame;
  DataManager.saveGame = function(...args) {
    if (inFlight) return inFlight;
    const sequence = campaign().sequence, system = $gameSystem, temp = $gameTemp;
    const request = manualRequest?.status === 'writing' ? manualRequest : null;
    const record = changes => { if (system === $gameSystem && temp === $gameTemp) setPersistence(changes); };
    record({ status: 'saving', lastError: null });
    try {
      inFlight = Promise.resolve(saveGame.apply(this, args)).then(result => {
        record({ status: 'saved', lastSuccessfulSequence: sequence, lastError: null });
        finishManual(request, true);
        return result;
      }, error => {
        record({ status: 'failed', lastError: { code: 'save_failed' } });
        finishManual(request, false);
        throw error;
      }).finally(() => { inFlight = null; });
    } catch (error) {
      record({ status: 'failed', lastError: { code: 'save_failed' } });
      finishManual(request, false);
      return Promise.reject(error);
    }
    return inFlight;
  };
`+source.slice(end);
source=source.replace('  DataManager.loadGame = function(savefileId) {','  DataManager.loadGame = function(savefileId) {\n    manualRequest = null;');
source=source.replace('    if (inFlight) {\n      return reportRejection','    if (inFlight || manualRequest) {\n      return reportRejection');
const insertion=`  PluginManager.registerCommand('Dryland_EventBridge', 'SaveCurrentCampaign', function(args) {
    const scene = SceneManager._scene, state = campaign(), file = $gameSystem.savefileId();
    const stable = scene instanceof Scene_Map && state?.phase === 'formation' && rules.validateState(state).ok &&
      Number.isInteger(file) && file > 0 && !$gameMessage.isBusy() && !scene.isBusy() &&
      !scene._choiceListWindow?.active && !$gamePlayer.isTransferring() &&
      !$gameTemp._drylandReturnPictures?.some(id => $gameScreen.picture(id)?._duration > 0);
    if (!stable || inFlight || manualRequest) return reportRejection('SaveCurrentCampaign', commandError('invalid_transition'));
    plugin(this, 'Dryland_Presentation', 'ClearSaveNotice', {});
    manualRequest = {interpreter: this, system: $gameSystem, scene, status: 'scheduled', noticePicture: Number(args.noticePicture)};
    this.setWaitMode('dryland-save');
    $gameVariables.setValue(24, 'ok');
  });
  const terminateSaveScene = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    manualRequest = null;
    terminateSaveScene.call(this);
  };
`;
source=source.replace("  PluginManager.registerCommand('Dryland_EventBridge', 'Checkpoint'",insertion+"  PluginManager.registerCommand('Dryland_EventBridge', 'Checkpoint'");
source=source.replace("    if (this._waitMode === 'dryland-save') {\n      if (inFlight)","    if (this._waitMode === 'dryland-save') {\n      if (manualRequest?.interpreter === this && manualRequest.status === 'scheduled') {\n        manualRequest.status = 'writing';\n        plugin(this, 'VisuMZ_1_SaveCore', 'AutosaveForce', {});\n      }\n      if (inFlight)");
assert.ok(source.includes('if (inFlight || manualRequest)'));
assert.ok(source.includes("manualRequest.status = 'writing'"));
source=source.replace('  let manualRequest = null;',`  let manualRequest = null;
  const manualSaveCallbacks = new WeakMap();
  for (const name of ['onAutosaveSuccess', 'onAutosaveFailure']) {
    const notifyAutosave = Scene_Base.prototype[name];
    Scene_Base.prototype[name] = function(...args) {
      const request = manualSaveCallbacks.get(this);
      if (request) {
        manualSaveCallbacks.delete(this);
        if (request.scene !== SceneManager._scene || request.system !== $gameSystem) return;
        if (name === 'onAutosaveSuccess') return;
      }
      return notifyAutosave.apply(this, args);
    };
  }`);
source=source.replace("        manualRequest.status = 'writing';","        manualRequest.status = 'writing';\n        manualSaveCallbacks.set(manualRequest.scene, manualRequest);");
writeFileSync(bridge,source);

const presentationFile=game+'/js/plugins/Dryland_Presentation.js';source=readFileSync(presentationFile,'utf8');
source=source.replace(' * @command WaitForReturnPresentation',' * @command ShowSaveNotice\n * @text Exibir aviso de campanha salva\n * @arg picture\n * @type number\n * @min 1\n * @command ClearSaveNotice\n * @text Limpar aviso de salvamento\n * @command WaitForReturnPresentation');
const noticeCode=`  function clearSaveNotice() {
    const notice = $gameTemp._drylandSaveNotice;
    if (notice) {
      const picture = $gameScreen.picture(notice.picture);
      if (picture) picture.show(picture.name(), picture.origin(), picture.x(), picture.y(), picture.scaleX(), picture.scaleY(), 0, picture.blendMode());
    }
    delete $gameTemp._drylandSaveNotice;
  }
  PluginManager.registerCommand('Dryland_Presentation', 'ClearSaveNotice', clearSaveNotice);
  PluginManager.registerCommand('Dryland_Presentation', 'ShowSaveNotice', function(args) {
    clearSaveNotice();
    const id = Number(args.picture), picture = $gameScreen.picture(id);
    if (!picture) return;
    $gameTemp._drylandSaveNotice = {picture: id, remaining: 120};
    picture.show(picture.name(), picture.origin(), picture.x(), picture.y(), picture.scaleX(), picture.scaleY(), 255, picture.blendMode());
  });
`;
source=source.replace('  const terminateMap =',noticeCode+'  const terminateMap =');
source=source.replace('    terminateMap.call(this);','    clearSaveNotice();\n    terminateMap.call(this);');
source=source.replace('    readingPermission(null, false);','    clearSaveNotice();\n    readingPermission(null, false);');
source=source.replace('    return transfer.call(this, params);','    clearSaveNotice();\n    return transfer.call(this, params);');
source=source.replace('    updateInterface.call(this);','    updateInterface.call(this);\n    const notice = $gameTemp._drylandSaveNotice;\n    if (notice && --notice.remaining <= 0) clearSaveNotice();');
writeFileSync(presentationFile,source);
