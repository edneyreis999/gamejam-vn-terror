import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { act, rules } from './formation.mjs';
export const boundaryRecipes = JSON.parse(await readFile(new URL('../fixtures/boundary-recipes.json', import.meta.url), 'utf8')).recipes;
export function accepted(state, type, fields = {}) {
  const result = act(state, type, fields);
  assert.equal(result.ok, true, JSON.stringify(result.error));
  assert.deepEqual(rules.validateState(result.state), { ok: true, violations: [] });
  return result.state;
}
export function complete(state) {
  return accepted(state, 'COMPLETE_PASSAGE', { passageId: state.reading.passageIds[state.reading.index] });
}
export function finishReading(state) {
  while (state.reading) state = complete(state);
  return state;
}
export function finishCamp(state) {
  state = finishReading(state);
  for (const topicId of rules.pendingGrief(state)) {
    state = accepted(state, 'START_SOCIAL_TOPIC', { topicId });
    state = accepted(state, 'COMPLETE_SOCIAL_TOPIC', { topicId });
  }
  return state.phase === 'camp_arrival' ? accepted(state, 'FINISH_CAMP_ARRIVAL') : state;
}
export function passCamp(state) {
  return accepted(finishCamp(state), 'CONTINUE_FROM_CAMP');
}
export function replayUntil(name, predicate) {
  let state = rules.createReadyState();
  for (const authored of boundaryRecipes[name].actions) {
    if (state.phase === 'camp_arrival' && authored.type !== 'ADVANCE_TEXT') {
      state = finishCamp(state);
      if (predicate(state)) return state;
      state = accepted(state, 'CONTINUE_FROM_CAMP');
    }
    const action = authored.type === 'ADVANCE_TEXT'
      ? { type: 'COMPLETE_PASSAGE', passageId: state.reading.passageIds[state.reading.index], expectedSequence: state.sequence }
      : { ...authored, expectedSequence: state.sequence };
    const result = rules.dispatch(state, action);
    assert.equal(result.ok, true, `${name} ${JSON.stringify(action)}: ${JSON.stringify(result.error)}`);
    assert.deepEqual(rules.validateState(result.state), { ok: true, violations: [] });
    state = result.state;
    if (predicate(state)) return state;
  }
  assert.fail(`The historic legal recipe did not reach the requested boundary: ${name}`);
}
export function failureWithCount(count) {
  return replayUntil('final-sixth-total-loss', state => state.phase === 'sacrifice_choice' && state.partyIds.length === count);
}
export function rejectUnchanged(state, type, fields, code) {
  const before = structuredClone(state), result = act(state, type, fields);
  assert.equal(result.ok, false);
  assert.equal(result.error.code, code);
  assert.deepEqual(result.state, before);
  assert.deepEqual(state, before);
  assert.deepEqual(result.effects, []);
}
// Bounded domain input for social eligibility; never installed by directed QA.
export function socialCamp(state, partyIds) {
  const camp = structuredClone(state);
  camp.phase = 'camp'; camp.selectedDungeonId = null; camp.dungeonId = 'physical'; camp.position = 2;
  camp.partyIds = [...partyIds]; camp.draftPartyIds = [...partyIds]; camp.reading = null;
  camp.assignments.physical[0] ||= 'A1'; camp.assignments.physical[1] ||= 'A2';
  camp.progress.physical = Math.max(2, camp.progress.physical);
  camp.campDeathBaseline = camp.deadHeroIds.length;
  assert.equal(rules.validateState(camp).ok, true);
  return camp;
}
