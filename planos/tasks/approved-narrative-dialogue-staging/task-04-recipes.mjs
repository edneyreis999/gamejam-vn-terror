// Preserve each historical player decision; acknowledge only the two added
// semantic closures and recompute their sequence preconditions.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { rules } from '../../../rpg-maker/tests/helpers/formation.mjs';

const path = new URL('../../../rpg-maker/tests/fixtures/boundary-recipes.json', import.meta.url);
const data = JSON.parse(await readFile(path, 'utf8'));
for (const [name, recipe] of Object.entries(data.recipes)) {
  let state = rules.createReadyState();
  const actions = [];
  function apply(authored) {
    const action = { ...authored, expectedSequence: state.sequence };
    const runtime = action.type === 'ADVANCE_TEXT'
      ? { type: 'COMPLETE_PASSAGE', passageId: state.reading.passageIds[state.reading.index], expectedSequence: state.sequence }
      : action;
    const result = rules.dispatch(state, runtime);
    assert.equal(result.ok, true, `${name}: ${JSON.stringify(result.error)}`);
    assert.equal(rules.validateState(result.state).ok, true);
    actions.push(action);
    state = result.state;
  }
  for (const action of recipe.actions) {
    if (state.reading?.sceneId.startsWith('closure.')) apply({ type: 'ADVANCE_TEXT' });
    apply(action);
  }
  recipe.actions = actions;
}
await writeFile(path, JSON.stringify(data, null, 2) + '\n');
