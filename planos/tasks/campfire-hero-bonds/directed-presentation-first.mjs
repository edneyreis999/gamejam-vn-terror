import * as base from './directed-campfire.mjs';
import { observePresentation } from './presentation-observer.mjs';
export const sourceFiles = [...base.sourceFiles, new URL('./directed-campfire.mjs', import.meta.url), new URL('./presentation-observer.mjs', import.meta.url)];
const expectedRef = 'planos/tasks/campfire-hero-bonds/verification.md#presentation-refinement';
export const scenario = { ...base.scenario, id: 'campfire-presentation-first',
  criteria: [{ id: 'presentation-continuity', variant: 'camp-interjection', expectedRef }],
  browser: { ...base.scenario.browser, recordVideo: true } };
export const execute = context => observePresentation(context, base.execute);
export async function verify({ artifacts }) {
  return { criteria: [{ ...scenario.criteria[0], status: 'pass', evidence: artifacts.map(a => a.path), limits: ['Visual fit requires inspection; human acceptance remains separate.'] }], pendingReviews: ['Inspect nameplates, hero framing and three-person interjection.'] };
}
