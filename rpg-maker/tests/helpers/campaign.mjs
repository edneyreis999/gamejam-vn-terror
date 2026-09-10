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
export function replayUntil(name, predicate) {
  let state = rules.createReadyState();
  for (const authored of boundaryRecipes[name].actions) {
    const action = authored.type === 'ADVANCE_TEXT'
      ? { type: 'COMPLETE_PASSAGE', passageId: state.reading.passageIds[state.reading.index], expectedSequence: authored.expectedSequence }
      : authored;
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
