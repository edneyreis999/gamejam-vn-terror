import assert from 'node:assert/strict';
import { rules } from './formation.mjs';
import { accepted, boundaryRecipes, complete, finishCamp } from './campaign.mjs';
import { finalChoice } from './closing.mjs';
export function phaseFixtures() {
  const states={ready:rules.createReadyState()};
  for(const name of ['final-sixth-solo-council','final-sixth-total-loss']){
    let state=rules.createReadyState();
    for(const raw of boundaryRecipes[name].actions){
      if(state.phase==='camp_arrival'){state=finishCamp(state);states.camp??=state;state=accepted(state,'CONTINUE_FROM_CAMP');}
      const action=raw.type==='ADVANCE_TEXT'?{type:'COMPLETE_PASSAGE',passageId:state.reading.passageIds[state.reading.index],expectedSequence:state.sequence}:{...raw,expectedSequence:state.sequence};
      const result=rules.dispatch(state,action);assert.equal(result.ok,true,JSON.stringify(result.error));state=result.state;
      states[state.phase]??=state;
    }
  }
  let closing=accepted(finalChoice(),'CHOOSE_ENDING',{ending:'reunite'});
  while(true){states[closing.phase]??=closing;if(closing.phase==='campaign_complete')break;closing=complete(closing);}
  states.retreat_confirmation=accepted(states.camp,'REQUEST_RETREAT');
  states.invalid={...rules.createReadyState(),phase:'invalid'};
  for(const state of Object.values(states))assert.equal(rules.validateState(state).ok,true,JSON.stringify(state));
  return states;
}
