import fs from 'node:fs';
import {read,c,presentation,write} from './native-migration-helpers.mjs';
import {parsePluginList} from '../../../rpg-maker/tools/plugin-settings.mjs';
const bridgeFile='rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js';
let bridge=fs.readFileSync(bridgeFile,'utf8');
const begin=bridge.indexOf('  // A confirmation belongs'),end=bridge.indexOf('  // MZ\'s meVolume setter',begin);
let input=bridge.slice(begin,end).replace('const messageTriggered =','const confirmationTriggered =').replace('messageTriggered.call(this)','confirmationTriggered.call(this)').replace('global.$gameTemp','globalThis.$gameTemp');
const visibilityStart=bridge.indexOf('  const cursorWithVisibility'),visibilityEnd=bridge.indexOf('  const waitWithVisibility',visibilityStart);
input+=bridge.slice(visibilityStart,visibilityEnd);
const adapterFile='rpg-maker/The Dryland Drowned/js/plugins/Dryland_Presentation.js';
let adapter=fs.readFileSync(adapterFile,'utf8');
const metadata=` * @param LockMovement
 * @text Bloquear movimento do personagem
 * @type boolean
 * @default true
 * @param DisableEventAcceleration
 * @text Bloquear aceleração comum de eventos
 * @type boolean
 * @default true
 * @command BindInterfacePicture
 * @text Identificar imagem de interface
 * @arg picture
 * @text ID da imagem
 * @type number
 * @min 1
 * @arg name
 * @text Nome do elemento
 * @type string
 * @command InterfaceVisibility
 * @text Registrar visibilidade da interface
 * @arg hidden
 * @text Oculta
 * @type boolean
 * @default false
 * @command ConsumeInput
 * @text Consumir confirmação atual
`;
adapter=adapter.replace(' * @command ObservationBegin',metadata+' * @command ObservationBegin');
adapter=adapter.replace('    selectChoice.call(this, index);','    if (interfaceHidden()) return;\n    selectChoice.call(this, index);');
adapter=adapter.slice(0,adapter.lastIndexOf('})();'))+input+`
  PluginManager.registerCommand('Dryland_Presentation', 'ConsumeInput', consumeConfirmation);
  PluginManager.registerCommand('Dryland_Presentation', 'InterfaceVisibility', function(args) {
    setInterfaceHidden(args.hidden === 'true');
  });
  PluginManager.registerCommand('Dryland_Presentation', 'BindInterfacePicture', function(args) {
    const picture = $gameScreen.picture(Number(args.picture));
    if (picture) picture._drylandInterfaceElement = args.name;
  });
  const pictureUiUpdate = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    pictureUiUpdate.call(this);
    if (interfaceHidden() && this.picture()?._drylandInterfaceElement) this.visible = false;
  };
  const updateInterface = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if (this._messageWindow && !releaseRequired &&
        (Input.isTriggered('tab') || (interfaceHidden() && TouchInput.isTriggered()))) {
      this._messageWindow.isTriggered();
      consumeConfirmation();
    }
    updateInterface.call(this);
  };
  const settings = PluginManager.parameters('Dryland_Presentation');
  const canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    return settings.LockMovement !== 'true' && canMove.call(this);
  };
  const eventFastForward = Scene_Map.prototype.isFastForward;
  Scene_Map.prototype.isFastForward = function() {
    return settings.DisableEventAcceleration !== 'true' && eventFastForward.call(this);
  };
})();
`;
fs.writeFileSync(adapterFile,adapter);
// Retain only the ME lifecycle for task 12. Credits still have native callers until task 13.
const audio=bridge.slice(end,bridge.indexOf('  const pictureUiUpdate',end));
bridge=bridge.slice(0,begin)+audio+'})(globalThis);\n';
bridge=bridge.replace(/    if \(interfaceHidden\(\)\) return;\n/g,'');
bridge=bridge.replace(/    if \(args.target === 'interface_hidden'[\s\S]*?      return;\n    \}\n/,'');
bridge=bridge.replace(/      consumeConfirmation\(\);\n/g,'');
bridge=bridge.replace(", 'interface_hidden', 'interface_visible'",'');
fs.writeFileSync(bridgeFile,bridge);
const events=read('CommonEvents.json');
for(const event of events.filter(Boolean)){
 event.list=event.list.flatMap(command=>{
  const result=[command];
  if(command.code===231){
   const id=command.parameters[0];
   if((id>=30&&id<=59)||(id>=71&&id<=89))result.push({...presentation('BindInterfacePicture',{picture:String(id),name:`${event.name} — ${id}`}),indent:command.indent});
  }
  if(command.code===357&&command.parameters[0]==='Dryland_EventBridge'&&['credits_finish','credits_cleanup'].includes(command.parameters[3].target))result.push({...presentation('ConsumeInput'),indent:command.indent});
  return result;
 });
}
events[64].list=[presentation('InterfaceVisibility',{hidden:'true'}),c(0)];
events[65].list=[presentation('InterfaceVisibility',{hidden:'false'}),c(0)];
events[4].list.splice(-1,0,c(135,[1]));
write(events);
const config='rpg-maker/The Dryland Drowned/js/plugins.js',plugins=parsePluginList(fs.readFileSync(config,'utf8'));
const core=plugins.find(p=>p.name==='VisuMZ_0_CoreEngine'),qol=JSON.parse(core.parameters['QoL:struct']);qol['NewGameCommonEventAll:num']='4';core.parameters['QoL:struct']=JSON.stringify(qol);
plugins.find(p=>p.name==='Dryland_Presentation').parameters={LockMovement:'true',DisableEventAcceleration:'true'};
fs.writeFileSync(config,'// Generated by RPG Maker.\n// Do not edit this file directly.\nvar $plugins =\n[\n'+plugins.map(plugin=>JSON.stringify(plugin)).join(',\n')+'\n];\n');
