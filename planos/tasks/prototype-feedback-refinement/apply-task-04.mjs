import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { game, command as c, plugin, presentation, branch, choices, show, text, button, erase, message, editCommonEvents, plate } from './native-authoring.mjs';

const bridge = (name,args={}) => plugin('Dryland_EventBridge',name,args);
const query = (kind, variable, id='', targetSwitch=0) => bridge('Query',{kind,id,variable:String(variable),switch:String(targetSwitch)});
function amend(file, replacements) {
  let source=readFileSync(file,'utf8');
  for(const [before,after] of replacements) { assert.ok(source.includes(before),before); source=source.replace(before,after); }
  writeFileSync(file,source);
}
amend(game+'/js/plugins/Dryland_CampaignRules.js',[
  ['selectedDungeonId: null, dungeonId: null, position: null,','selectedDungeonId: null, dungeonId: null, position: null, preparationIntroductionCompleted: false,'],
  ['"DEPART":[],','"DEPART":[],"COMPLETE_PREPARATION_INTRODUCTION":[],'],
  ["BEGIN: ['seed'], COMPLETE_PASSAGE: ['passageId'],","BEGIN: ['seed'], COMPLETE_PASSAGE: ['passageId'], COMPLETE_PREPARATION_INTRODUCTION: [],"],
  ["typeof state.medallionComplete !== 'boolean' ||","typeof state.medallionComplete !== 'boolean' || typeof state.preparationIntroductionCompleted !== 'boolean' ||"],
  ["      if (state.history.some(event => !validHistoryEvent(event)))", "      if (state.preparationIntroductionCompleted && state.phase !== 'formation') issues.push(v('invalid_preparation', 'A introdução pertence à preparação atual.'));\n      if (state.history.some(event => !validHistoryEvent(event)))"],
  ["phase: 'formation', dungeonId: null, position: null, partyIds: [],","phase: 'formation', preparationIntroductionCompleted: false, dungeonId: null, position: null, partyIds: [],"],
  ["      if (action.type === 'SELECT_DESTINATION') {", "      if (action.type === 'COMPLETE_PREPARATION_INTRODUCTION') {\n        if (state.phase !== 'formation' || state.preparationIntroductionCompleted) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', {});\n        return accepted(state, { preparationIntroductionCompleted: true }, { type: action.type });\n      }\n      if (action.type === 'SELECT_DESTINATION') {"],
  ["{ phase: 'dungeon_intro', dungeonId: state.selectedDungeonId,", "{ phase: 'dungeon_intro', preparationIntroductionCompleted: false, dungeonId: state.selectedDungeonId,"],
  ['createReadyState, dispatch, validateState, deriveFormation,','createReadyState, dispatch, validateState,\n      normalizeState: state => state && !hasOwn(state, \'preparationIntroductionCompleted\') ? { ...state, preparationIntroductionCompleted: false } : state,\n      deriveFormation,']
]);
amend(game+'/js/plugins/Dryland_EventBridge.js',[
  [' * @option canDepart',' * @option preparationIntroductionCompleted\n * @option canPrepare\n * @option canDepart'],
  [' * @option DEPART',' * @option COMPLETE_PREPARATION_INTRODUCTION\n * @option DEPART'],
  ['DEPART: null, ENTER_DUNGEON: null,','COMPLETE_PREPARATION_INTRODUCTION: null, DEPART: null, ENTER_DUNGEON: null,'],
  ["case 'phase': case 'sequence': return state[kind];","case 'phase': case 'sequence': case 'preparationIntroductionCompleted': return state[kind];"],
  ["case 'canDepart': return view.canDepart;","case 'canPrepare': return state.phase === 'formation' && view.formation.required > 0 && view.formation.selectedHeroIds.length === view.formation.required;\n      case 'canDepart': return view.canDepart;"],
  ['$gameSystem._dryland.campaign = freeze(campaign());',"const restored = rules.normalizeState(campaign());\n      if (!rules.validateState(restored).ok) throw new Error('A campanha contém um estado inválido.');\n      $gameSystem._dryland.campaign = freeze(restored);"]
]);

plate('Dryland_RouteTarget',256,112);
plate('Dryland_RouteInformation',416,528);
plate('Dryland_RouteFooter',256,56);
editCommonEvents(events=>{
  assert.equal(events.length,355,'Allocate the inspected free helper ID');
  const tavern=events[3].list;
  const direct=tavern.findIndex(row=>row.code===402&&row.parameters[1].startsWith('Partir'));
  assert.ok(direct>0);
  const directEnd=tavern.findIndex((row,index)=>index>direct&&row.code===404&&row.indent===0);
  const departure=tavern.slice(direct+1,directEnd).filter(row=>![108,408].includes(row.code)).map(row=>({...row,indent:row.indent-1}));
  tavern.splice(direct,directEnd-direct);
  for(const row of tavern) {
    if(row.code===102) row.parameters[0]=row.parameters[0].filter(label=>!label.startsWith('Partir')).map(label=>label.startsWith('Destinos')?'Seguir<Bind Picture: 41><Enable Switch: 29><Hide Choice Window>':label);
    if(row.code===402&&row.parameters[1].startsWith('Destinos')) row.parameters[1]='Seguir<Bind Picture: 41><Enable Switch: 29><Hide Choice Window>';
  }
  const formation=events[38].list;
  const oldLabel=formation.findIndex(row=>row.code===357&&row.parameters[1]==='PictureTextChange'&&row.parameters[3]['center:json']?.includes('Destino não escolhido'));
  const oldDisable=formation.findIndex((row,index)=>index>oldLabel&&row.code===111&&row.parameters[1]==='!$gameVariables.value(25)');
  formation.splice(oldLabel,oldDisable-oldLabel);
  events[38].list=formation.filter(row=>!(row.code===231&&[43,44].includes(row.parameters[0]))&&!(row.code===357&&(['[43]','[44]'].includes(row.parameters[3]['PictureIDs:arraynum'])||['43','44'].includes(row.parameters[3].picture))));
  for(const row of events[38].list) {
    if(row.code===357&&row.parameters[1]==='Query'&&row.parameters[3].kind==='canDepart') row.parameters[3].kind='canPrepare';
    if(row.code===357&&row.parameters[1]==='PictureTextChange'&&row.parameters[3]['PictureIDs:arraynum']==='[41]') row.parameters[3]['center:json']=JSON.stringify('\\FS[26]Seguir');
    if([232,234].includes(row.code)&&row.parameters[0]===43) row.parameters[0]=41;
    if(row.code===111&&row.parameters[1]==='!$gameVariables.value(25)') row.parameters[1]='!$gameSwitches.value(29)';
  }
  // Move the only advance target to the existing footer and preserve its focus.
  const advance=events[38].list.find(row=>row.code===231&&row.parameters[0]===41);
  advance.parameters[4]=1136; advance.parameters[5]=664;

  events.push({id:355,name:'Preparação — Introdução ao mapa',trigger:0,switchId:1,list:[
    query('preparationIntroductionCompleted',28),
    ...branch('!$gameVariables.value(28)',[
      bridge('CaptureContext'),presentation('ObservationBegin',{unit:'355',switch:'0'}),
      ...message('Bem, agora que nossa equipe está completa, vamos traçar nossa rota!','Ivaí'),
      presentation('ObservationComplete'),bridge('Action',{action:'COMPLETE_PREPARATION_INTRODUCTION',value:''})
    ]),c(0)
  ]});
  const cleanup=erase([70,71,72,73,74,75,76,77,78,79,80,81,82]);
  const publicInfo=[
    'Sob a igreja tomada pela mata, uma prisioneira de pedra guarda parte do caminho.',
    'Nas atrações abandonadas, uma figueira aprisiona uma voz que conhece o mapa.',
    'As duas peças sobrepostas revelam o vilarejo onde a verdade foi enterrada.'
  ];
  const wrap=value=>value.match(/.{1,25}(?:\s|$)|\S+$/g).map(part=>part.trim()).join('\n');
  const locations=[[160,264],[432,296],[288,500]];
  const routes=['physical','supernatural','final'];
  const list=[c(117,[351]),...erase([...Array.from({length:28},(_,i)=>10+i),40,41,42,43,44]),c(117,[355]),c(118,['destination']),
    ...cleanup,show(70,'Dryland_Black',0,0),show(71,'Dryland_MapComplete',152,88,41.25),
    show(75,'Dryland_RouteInformation',816,88),text(75,'\\FS[26]Escolha nosso próximo\ndestino.','upperleft',24),
    query('selectedDungeonId',30),query('canDepart',25,'',29)];
  routes.forEach((id,index)=>{
    const base=72+index, name=173+index,status=176+index,progress=179+index,total=182+index;
    list.push(query('routeName',name,id),query('routeStatus',status,id),query('routeProgress',progress,id),query('routeTotal',total,id),
      c(355,[`$gameSwitches.setValue(${31+index}, $gameVariables.value(${status}) === 'available');`]),
      c(122,[status,status,0,4,`({available:'Disponível',locked:'Bloqueado',completed:'Concluído'})[$gameVariables.value(${status})]`]),
      ...button(base,'Dryland_RouteTarget','',...locations[index]),
      text(base,`\\FS[24]${['Caminho da Igreja','Parque das Águas\nAssombradas','Vilarejo Partido'][index]}\n\\FS[24]\\V[${status}]`),
      ...branch(`!$gameSwitches.value(${31+index})`,[c(234,[base,[-70,-70,-70,120],0])]),
      ...branch(`$gameVariables.value(30) === '${id}'`,[
        text(base,`\\FS[24]${['Caminho da Igreja','Parque das Águas\nAssombradas','Vilarejo Partido'][index]}\n\\FS[24]✓ Selecionado`),
        text(75,`\\FS[28]${['Caminho da Igreja','Parque das Águas\nAssombradas','Vilarejo Partido'][index]}\n\n\\FS[26]${wrap(publicInfo[index])}\n\nExploração: \\V[${progress}]/\\V[${total}]\n\\V[${status}]`,'upperleft',24)
      ]));
  });
  list.push(...button(81,'Dryland_RouteFooter','Voltar',48,640),...button(82,'Dryland_RouteFooter','Partir',976,640),
    ...branch('!$gameSwitches.value(29)',[c(234,[82,[-70,-70,-70,120],0])]),bridge('CaptureContext'),
    ...choices('destinations',[...routes.map((id,index)=>`\\V[${173+index}]<Bind Picture: ${72+index}><Enable Switch: ${31+index}><Hide Choice Window>`),'Voltar<Bind Picture: 81><Hide Choice Window>','Partir<Bind Picture: 82><Enable Switch: 29><Hide Choice Window>'],[
      ...routes.map(id=>[bridge('Action',{action:'SELECT_DESTINATION',value:id}),c(119,['destination'])]),
      [...cleanup,c(115)], [...cleanup,...departure]
    ],3),c(119,['destination']),c(0));
  const focusIndex=list.findLastIndex(row=>row.code===357&&row.parameters[1]==='ChoiceFocus');
  list.splice(focusIndex,0,...[72,73,74,75,81,82].map(id=>presentation('BindInterfacePicture',{picture:String(id),name:'Mapa — '+id})));
  const focus=list.findLast(row=>row.code===357&&row.parameters[1]==='ChoiceFocus');
  focus.parameters[3].horizontal='true';
  events[39].list=list;
  const preload=events[351].list.find(row=>row.code===357&&row.parameters[1]==='SystemLoadImages').parameters[3];
  preload['pictures:arraystr']=JSON.stringify([...JSON.parse(preload['pictures:arraystr']),'Dryland_RouteTarget','Dryland_RouteInformation','Dryland_RouteFooter']);
});
