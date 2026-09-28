import assert from 'node:assert/strict';
import { command as c, plugin, presentation as p, branch, choices, show, text, button, erase, editCommonEvents, plate } from './native-authoring.mjs';

plate('Dryland_Black',1280,720,'black');
plate('Dryland_TitleText',800,144,'text');
plate('Dryland_AgeWarning',896,176,'text');
plate('Dryland_MenuButton',384,64);
plate('Dryland_AgeCheckbox',704,56);
plate('Dryland_AgeMark',64,48,'text');
const bind = (label,id) => `${label}<Bind Picture: ${id}><Hide Choice Window>`;
const label = name => c(118,[name]);
const jump = name => c(119,[name]);
const script = value => c(355,[value]);
const clear = () => [script('delete $gameTemp._drylandAgeNotice;'),p('ConsumeInput')];
editCommonEvents(events => {
  assert.ok(['Interface — Avisos e entrada','Interface — Título e aviso etário'].includes(events[2].name));
  assert.ok(events.length === 354 || events[354]?.name === 'Interface — Confirmação etária','Allocate the notice only from the inspected free tail');
  const titleIds=[2,3,4,5,6];
  const entry = name => [...erase(titleIds), c(117,[354]), ...branch('$gameTemp._drylandAgeNotice.accepted',[
    ...clear(), ...erase([1,2,3,4,5]), plugin('VisuMZ_4_EventTitleScene',name,{'SlowFade':'false'})
  ]),...clear(),jump('entrada')];
  events[2].name='Interface — Título e aviso etário';
  events[2].list=[...events[2].list.slice(0,3),label('entrada'),...clear(),...erase([1,...titleIds]),
    show(1,'Dryland_Taverna',0,0,101.026045777427),c(234,[1,[-100,-100,-100,0],0,false]),
    show(2,'Dryland_TitleText',240,128),text(2,'\\FS[48]Afogados em Terra Seca'),
    show(6,'Dryland_AgeMark',1184,640),text(6,'\\FS[26]16+', 'center',0),
    ...button(3,'Dryland_MenuButton','Novo jogo',448,344),
    ...button(4,'Dryland_MenuButton','Continuar',448,424),
    ...button(5,'Dryland_MenuButton','Configurações',448,504),
    ...branch('DataManager.isAnySavefileExists()',
      choices('title',[bind('Novo jogo',3),bind('Continuar',4),bind('Configurações',5)],[entry('NewGame'),entry('LoadScreen'),[plugin('VisuMZ_4_EventTitleScene','Options',{'SlowFade':'false'})]],-1,1),
      [c(234,[4,[-110,-110,-110,0],0,false]),...choices('title',[bind('Novo jogo',3),bind('Continuar<Disable>',4),bind('Configurações',5)],[entry('NewGame'),[],[plugin('VisuMZ_4_EventTitleScene','Options',{'SlowFade':'false'})]])]),
    jump('entrada'),c(0)];
  const cancel=[script('$gameTemp._drylandAgeNotice.accepted = false;'),jump('fechar')];
  const menu = checked => choices('age-notice',[
    bind('Tenho 16 anos de idade ou mais',3),bind('Jogar'+(checked?'':'<Disable>'),4),bind('Voltar ao título',5)
  ],[[script('$gameTemp._drylandAgeNotice.checked = !$gameTemp._drylandAgeNotice.checked;'),jump('aviso')],
    checked ? [script('$gameTemp._drylandAgeNotice.accepted = true;'),jump('fechar')] : [],cancel],2);
  events[354]={id:354,name:'Interface — Confirmação etária',trigger:0,switchId:1,list:[
    script('$gameTemp._drylandAgeNotice = { checked: false, accepted: false };'),p('ConsumeInput'),label('aviso'),
    show(1,'Dryland_Black',0,0),show(2,'Dryland_AgeWarning',192,176),
    text(2,'\\FS[26]Este jogo não é recomendado para menores de 16 anos.\nContém conteúdos relacionados a horror psicológico,\nmorte e coerção'),
    ...button(4,'Dryland_MenuButton','Jogar',448,480),...button(5,'Dryland_MenuButton','Voltar ao título',448,560),
    ...branch('$gameTemp._drylandAgeNotice.checked',
      [...button(3,'Dryland_AgeCheckbox','[X] Tenho 16 anos de idade ou mais',288,400),...menu(true)],
      [...button(3,'Dryland_AgeCheckbox','[  ] Tenho 16 anos de idade ou mais',288,400),c(234,[4,[-110,-110,-110,0],0,false]),...menu(false)]),
    label('fechar'),p('ConsumeInput'),...erase([2,3,4,5]),c(0)
  ]};
});
