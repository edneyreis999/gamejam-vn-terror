import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {game,command as c,plugin,presentation,branch,show,text,editCommonEvents} from './native-authoring.mjs';

const query=(kind,id,variable)=>plugin('Dryland_EventBridge','Query',{kind,id,variable:String(variable),switch:'0'});
const arm=key=>presentation('ArmEffect',{key});
const take=(key,variable)=>presentation('TakeEffect',{key,variable:String(variable)});
const move=(id,x,y,opacity,duration,wait=false)=>c(232,[id,0,0,0,x,y,100,100,opacity,0,duration,wait,0]);
editCommonEvents(events=>{
  assert.equal(events[350].trigger,2,'Task 07 is not applied');
  // The consequence caller covers committed voluntary and automatic retreats.
  // Route discovery arms only after the final reading reaches formation.
  events[348].name='Taverna — preparar retorno da expedição';
  events[348].list=[query('phase','',31),...branch("$gameVariables.value(31) === 'formation'",[arm('return.absence')]),c(0)];
  const reward=events[44].list.findIndex(row=>row.code===111&&row.parameters[1].includes("=== 'reward'"));
  const oldArm=events[44].list.findIndex((row,index)=>index>reward&&row.code===117&&row.parameters[0]===348);
  assert.ok(oldArm>reward);events[44].list.splice(oldArm,1);
  for(const id of [51,52]) {
    const list=events[id].list;
    for(let i=list.length-1;i>=0;i--)if(list[i].code===357&&list[i].parameters[1]==='ReadingComplete') {
      const indent=list[i].indent;
      const tail=[query('phase','',31),...branch("$gameVariables.value(31) === 'formation'",[c(117,[348]),arm('return.route')])];
      list.splice(i+1,0,...tail.map(row=>({...row,indent:row.indent+indent})));
    }
  }
  const router=events[40].list,formation=router.findIndex(row=>row.code===111&&String(row.parameters[1]).includes("=== 'formation'"));
  const transfer=router.findIndex((row,index)=>index>formation&&row.code===201);
  const black=show(90,'Dryland_Black',0,0);black.parameters[8]=0;
  const transition=[take('return.route',48),presentation('MotionPreference',{variable:'47'}),
    ...branch('$gameVariables.value(48)',[
      ...branch('!$gameVariables.value(47)',[black,move(90,0,0,255,30,true),c(230,[24]),arm('return.fadein')]),
      c(201,[0,3,10,7,2,2])
    ],[c(201,[0,3,10,7,2,0])])];
  router.splice(transfer,1,...transition.map(row=>({...row,indent:row.indent+1})));
  const stage=events[38].list,absence=stage.findIndex(row=>row.code===117&&row.parameters[0]===45);
  stage.splice(absence,0,take('return.fadein',48),...branch('$gameVariables.value(48)',[move(90,0,0,0,30,true),c(235,[90])]));
  const positions=[[344,496],[840,196],[744,504],[1000,480],[552,324],[360,184],[1040,212],[152,296]];
  const fades=[];
  for(let hero=1;hero<=8;hero++) {
    const base=9+hero,child=19+hero,[cx,cy]=positions[hero-1],x=cx-84,y=cy-104;
    const asset='Dryland_Tavern_H'+hero,png=readFileSync(game+'/img/pictures/'+asset+'.png');
    const width=png.readUInt32BE(16),height=png.readUInt32BE(20),scale=Math.min(148/width,156/height)*100;
    fades.push(query('heroDead','H'+hero,28),...branch('$gameVariables.value(28)',[
      show(base,'Dryland_HeroContainer',x,y),show(child,asset,(168-width*scale/100)/2,8,scale),
      plugin('VisuMZ_4_AttachedPictures','PictureAddPicture',{'PictureID:arraynum':JSON.stringify([child]),'TargetID:num':String(base)}),
      query('heroName','H'+hero,165+hero-1),text(base,'\\FS[26]\\V['+(165+hero-1)+']','down',8),
      presentation('BindInterfacePicture',{picture:String(base),name:'Taverna — ausência'}),
      presentation('BindInterfacePicture',{picture:String(child),name:'Taverna — retrato ausente'}),
      move(base,x,y,0,180)
    ]));
  }
  events[45].list=[take('return.absence',48),presentation('MotionPreference',{variable:'47'}),
    ...branch('$gameVariables.value(48) && !$gameVariables.value(47)',[
      ...fades,arm('return.moving'),presentation('WaitForReturnPresentation')
    ]),c(117,[349]),c(0)];
  events[350].name='Taverna — antigo temporizador (inativo)';events[350].trigger=0;events[350].list=[c(0)];
});
const file=game+'/js/plugins/Dryland_Presentation.js';let source=readFileSync(file,'utf8');
assert.ok(!source.includes("'WaitForReturnPresentation'"));
source=source.replace(' * @command MotionPreference',' * @command WaitForReturnPresentation\n * @text Aguardar ausências do retorno\n * @desc Aguarda os movimentos nativos ativos; uma retomada sem efeito termina imediatamente.\n * @command MotionPreference');
source=source.replace("    readingPermission(null, false);", "    readingPermission(null, false);\n    delete $gameTemp._drylandPendingEffects;\n    delete $gameTemp._drylandReturnPictures;");
source=source.replace('    terminateMap.call(this);', '    delete $gameTemp._drylandReturnPictures;\n    if (SceneManager.isNextScene(Scene_Title)) delete $gameTemp._drylandPendingEffects;\n    terminateMap.call(this);');
source=source.replace("  PluginManager.registerCommand('Dryland_Presentation', 'MotionPreference'",`  PluginManager.registerCommand('Dryland_Presentation', 'WaitForReturnPresentation', function() {
    if (!$gameTemp._drylandPendingEffects?.['return.moving']) return;
    delete $gameTemp._drylandPendingEffects['return.moving'];
    $gameTemp._drylandReturnPictures = Array.from({length:8}, (_, i) => 10 + i)
      .filter(id => $gameScreen.picture(id)?._duration > 0);
    this.setWaitMode('dryland-return');
  });
  const updateReturnWait = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode !== 'dryland-return') return updateReturnWait.call(this);
    if ($gameTemp._drylandReturnPictures?.some(id => $gameScreen.picture(id)?._duration > 0)) return true;
    delete $gameTemp._drylandReturnPictures;
    this._waitMode = '';
    return false;
  };
  PluginManager.registerCommand('Dryland_Presentation', 'MotionPreference'`);
writeFileSync(file,source);
const systemFile=game+'/data/System.json';const systemSource=readFileSync(systemFile,'utf8');
assert.equal(JSON.parse(systemSource).variables[48],'Dryland: new absence H1');
writeFileSync(systemFile,systemSource.replace('"Dryland: new absence H1"','"Retorno — efeito transitório consumido"'));
