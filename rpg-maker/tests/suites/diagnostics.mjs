import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { act, formation, rosterFixture, rules } from '../helpers/formation.mjs';
import { accepted, complete, failureWithCount } from '../helpers/campaign.mjs';
import { phaseFixtures } from '../helpers/diagnostics.mjs';
const require=createRequire(import.meta.url);
const {createQa,validateBridgeAction,validateCapturedContext,validateObserve,validateCheckpoint}=require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
const states=phaseFixtures();
function unchanged(state,result,code){assert.equal(result.ok,false);assert.equal(result.error.code,code);assert.deepEqual(result.state,state);assert.deepEqual(result.effects,[]);}
canonicalCase('UT-039','two actions captured at one revision accept the first once and reject the second unchanged',()=>{
 const before=formation(0),context=before.sequence;
 const first=rules.dispatch(before,{type:'TOGGLE_HERO',heroId:'H1',expectedSequence:context});assert.equal(first.ok,true);
 const snapshot=structuredClone(first.state);
 const second=rules.dispatch(first.state,{type:'TOGGLE_HERO',heroId:'H2',expectedSequence:context});unchanged(snapshot,second,'stale_action');
 assert.deepEqual(first.state,snapshot);assert.deepEqual(first.state.draftPartyIds,['H1']);
});
canonicalCase('UT-040','malformed actions reject missing unsafe or unexpected fields without changing ready state',()=>{
 const state=rules.createReadyState(),before=structuredClone(state);
 const valid={type:'BEGIN',seed:0,expectedSequence:0};
 for(const action of [null,{},[],{type:'unknown',expectedSequence:0},{type:'constructor',expectedSequence:0},{type:'__proto__',expectedSequence:0},
  {type:'BEGIN',seed:0},{...valid,extra:true},...[null,'0',-1,0.5,Number.MAX_SAFE_INTEGER+1].map(expectedSequence=>({...valid,expectedSequence}))]){
  unchanged(before,rules.dispatch(state,action),'invalid_action');assert.deepEqual(state,before);
 }
});
canonicalCase('UT-041','every otherwise valid action rejects all prohibited campaign phases without effects',()=>{
 const phases=['ready','intro','formation','dungeon_intro','encounter_intro','encounter_choice','approach_result','sacrifice_choice','death_result','retreat_confirmation','automatic_retreat','dungeon_complete','council','final_choice','ending','memorial','epilogue','campaign_complete','invalid'];
 assert.deepEqual(Object.keys(states).sort(),phases.sort());
 const actions={BEGIN:{seed:0},TOGGLE_HERO:{heroId:'H1'},SELECT_DESTINATION:{dungeonId:'physical'},DEPART:{},ENTER_DUNGEON:{},CHOOSE_APPROACH:{approachId:'A1-1'},SELECT_VICTIM:{heroId:'H1'},REQUEST_RETREAT:{},CANCEL_RETREAT:{},CONFIRM_RETREAT:{},CHOOSE_ENDING:{ending:'reunite'},NEW_CAMPAIGN:{},COMPLETE_PASSAGE:{passageId:'prologue.01'},SKIP_SEEN_TEXT:{}};
 const allowed=(type,state)=>{
  if(['COMPLETE_PASSAGE','SKIP_SEEN_TEXT'].includes(type))return Boolean(state.reading);
  if(type==='REQUEST_RETREAT')return rules.playerView(state).canRetreat;
  if(type==='ENTER_DUNGEON')return state.phase==='dungeon_intro'&&!state.reading;
  const phase={BEGIN:'ready',TOGGLE_HERO:'formation',SELECT_DESTINATION:'formation',DEPART:'formation',CHOOSE_APPROACH:'encounter_choice',SELECT_VICTIM:'sacrifice_choice',CANCEL_RETREAT:'retreat_confirmation',CONFIRM_RETREAT:'retreat_confirmation',CHOOSE_ENDING:'final_choice',NEW_CAMPAIGN:'campaign_complete'}[type];
  return state.phase===phase;
 };
 let checked=0;
 for(const state of Object.values(states))for(const[type,fields]of Object.entries(actions)){
  if(allowed(type,state))continue;
  const before=structuredClone(state),result=act(state,type,fields);unchanged(before,result,type==='REQUEST_RETREAT'?'retreat_unavailable':'invalid_transition');assert.deepEqual(state,before);checked++;
 }
 assert.ok(checked>200);
});
canonicalCase('UT-043','duplicate deaths impossible party membership and invalid reading cursors block normal dispatch',()=>{
 const base=accepted(failureWithCount(3),'SELECT_VICTIM',{heroId:'H1'});
 for(const mutate of [s=>s.deadHeroIds.push('H1'),s=>s.partyIds.push('H1'),s=>s.reading.index=s.reading.passageIds.length]){
  const state=structuredClone(base);mutate(state);const before=structuredClone(state);
  const checked=rules.validateState(state);assert.equal(checked.ok,false);assert.ok(checked.violations.length);
  unchanged(before,act(state,'TOGGLE_HERO',{heroId:'H2'}),'invalid_state');assert.deepEqual(state,before);
 }
});
canonicalCase('UT-046','version4 observations retain source meanings and detach all nested campaign data',()=>{
 const state=states.encounter_choice,before=structuredClone(state),snapshot=rules.snapshot(state);
 assert.deepEqual(Object.keys(snapshot).sort(),['version','phase','sequence','seed','rngState','dungeon','selectedDestination','position','draftParty','party','aliveHeroes','deadHeroes','heroNames','mapFragments','destinations','competencies','assignments','currentEncounter','reading','seenPassages','rewards','ending','climaxParty','epilogueHeroes','presentedDeaths','actionHistory','invariantViolations','lastRejectedAction'].sort());
 assert.equal(snapshot.version,4);assert.deepEqual(snapshot.mapFragments,{found:state.mapPieceIds.length,total:2});
 assert.equal(snapshot.currentEncounter.viability,snapshot.currentEncounter.approaches.filter(a=>a.viable).length);
 assert.ok(Number.isInteger(snapshot.currentEncounter.viability)&&snapshot.currentEncounter.viability>=0&&snapshot.currentEncounter.viability<=3);
 assert.deepEqual(snapshot.seenPassages,state.seenPassageIds);assert.deepEqual(snapshot.actionHistory,state.history);
 for(let i=0;i<30;i++){assert.deepEqual(rules.snapshot(state),snapshot);rules.playerView(state);}
 snapshot.party.push('ivai');snapshot.assignments.physical[0]='B8';snapshot.heroNames.H1='changed';snapshot.actionHistory[0].seed=99;
 const view=rules.playerView(state);view.heroes[0].name='changed';view.formation.selectedHeroIds.push('H8');
 assert.deepEqual(state,before);assert.notEqual(rules.snapshot(state).heroNames.H1,'changed');
 const read=rules.snapshot(states.intro).reading;
 assert.deepEqual(read,{sceneId:'prologue',passageId:'prologue.01',index:0,total:3,canSkip:false});
 const completeSnapshot=rules.snapshot(states.campaign_complete);assert.equal(completeSnapshot.ending,states.campaign_complete.endingId);
});
canonicalCase('UT-061','every documented domain or command rejection uses its exact Portuguese vocabulary',()=>{
 const formed=formation(0);let full=formed;for(const heroId of ['H1','H2','H3'])full=accepted(full,'TOGGLE_HERO',{heroId});
 const cases=[
  ['invalid_action','A ação informada é inválida.',formed,null],
  ['invalid_transition','Esta ação não está disponível no estado atual.',formed,{type:'BEGIN',seed:0}],
  ['stale_action','Esta ação pertence a uma tela anterior.',formed,{type:'TOGGLE_HERO',heroId:'H1',expectedSequence:0}],
  ['invalid_party_size','Escolha exatamente três heróis sobreviventes.',full,{type:'TOGGLE_HERO',heroId:'H4'}],
  ['formation_locked','A formação inclui automaticamente todos os sobreviventes.',rosterFixture(['H4','H5','H6','H7','H8']),{type:'TOGGLE_HERO',heroId:'H1'}],
  ['invalid_hero','Escolha um herói sobrevivente.',formed,{type:'TOGGLE_HERO',heroId:'ivai'}],
  ['invalid_destination','Escolha um caminho conhecido.',formed,{type:'SELECT_DESTINATION',dungeonId:'missing'}],
  ['destination_required','Escolha um caminho antes de partir.',full,{type:'DEPART'}],
  ['destination_unavailable','Este caminho não está disponível para expedição.',formed,{type:'SELECT_DESTINATION',dungeonId:'final'}],
  ['invalid_victim','Escolha um herói vivo presente na expedição.',states.sacrifice_choice,{type:'SELECT_VICTIM',heroId:'ivai'}],
  ['invalid_approach','Escolha uma abordagem deste encontro.',states.encounter_choice,{type:'CHOOSE_APPROACH',approachId:'missing'}],
  ['retreat_unavailable','O recuo não está disponível neste momento.',formed,{type:'REQUEST_RETREAT'}],
  ['text_not_seen','Este trecho ainda não foi lido nesta campanha.',states.intro,{type:'SKIP_SEEN_TEXT'}],
  ['invalid_ending','Escolha reunir ou destruir o medalhão.',states.final_choice,{type:'CHOOSE_ENDING',ending:'missing'}],
  ['invalid_state','A campanha contém um estado inválido.',{}, {type:'BEGIN',seed:0,expectedSequence:0}]
 ];
 for(const[code,message,state,partial]of cases){const before=structuredClone(state);const action=partial?{expectedSequence:state.sequence,...partial}:null;const result=rules.dispatch(state,action);unchanged(before,result,code);assert.equal(result.error.message,message);assert.deepEqual(state,before);}
 for(const[result,code,message]of [
  [validateCapturedContext(undefined),'missing_context','O contexto da escolha não está disponível.'],
  [validateCheckpoint('missing',states.intro,{}),'invalid_checkpoint','O ponto de salvamento é inválido.'],
  [validateObserve({target:'missing'}),'invalid_target','O alvo de apresentação é inválido.']
 ]){assert.equal(result.error.code,code);assert.equal(result.error.message,message);}
 const wrong=act(states.intro,'COMPLETE_PASSAGE',{passageId:'wrong'});assert.equal(wrong.error.message,'Esta ação não está disponível no estado atual.');
});
canonicalCase('UT-062','typed bridge arguments reject executable strings unknown enums and invalid presentation targets before dispatch',()=>{
 let reads=0;const readVariable=id=>{reads++;assert.equal(id,22);return'H3';};
 for(const args of [null,{}, {action:'unknown',value:''},{action:'TOGGLE_HERO',value:'globalThis.changed=true'}, {action:'TOGGLE_HERO',value:'\\V[22];globalThis.changed=true'}, {action:'DEPART',value:'H1'}, {action:'TOGGLE_HERO',value:3}, {action:'TOGGLE_HERO',value:'\\V[99999]'}])assert.equal(validateBridgeAction(args,readVariable,144).error.code,'invalid_action');
 assert.equal(reads,0);assert.deepEqual(validateBridgeAction({action:'TOGGLE_HERO',value:'\\V[22]'},readVariable,144),{ok:true,field:'heroId',value:'H3'});assert.equal(reads,1);
 assert.equal(validateBridgeAction({action:'NEW_CAMPAIGN',value:''},readVariable,144).ok,true);
 for(const target of ['missing','memorial_missing','credits_missing',null,4])assert.equal(validateObserve({target}).error.code,'invalid_target');
});
canonicalCase('UT-064','unavailable QA methods return the exact error without constructing or replacing any session',()=>{
 let reads=0,sets=0;const qa=createQa(()=>{reads++;return null;},()=>{sets++;});
 const expected={ok:false,error:{code:'campaign_unavailable',message:'A campanha ainda não está disponível.'}};
 assert.deepEqual(Object.keys(qa).sort(),['setSeed','snapshot','validate']);
 assert.deepEqual(qa.setSeed(0),expected);assert.deepEqual(qa.snapshot(),expected);assert.deepEqual(qa.validate(),expected);
 assert.equal(reads,3);assert.equal(sets,0);
});
canonicalCase('UT-065','invalid supplied domain state is preserved and cannot run normal dispatch',()=>{
 const base=structuredClone(states.intro);
 const invalid=[null,{}, {...base,partyIds:null},{...base,assignments:null},{...base,reading:{...base.reading,index:-1}}];
 for(const state of invalid){const before=structuredClone(state),result=rules.dispatch(state,{type:'BEGIN',seed:0,expectedSequence:state?.sequence??0});unchanged(before,result,'invalid_state');assert.deepEqual(state,before);}
});
