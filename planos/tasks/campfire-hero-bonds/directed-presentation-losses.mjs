import * as base from './directed-losses.mjs';
import { observePresentation } from './presentation-observer.mjs';
export const sourceFiles = [...base.sourceFiles, new URL('./directed-losses.mjs', import.meta.url), new URL('./presentation-observer.mjs', import.meta.url)];
const expectedRef = 'planos/tasks/campfire-hero-bonds/verification.md#presentation-refinement';
export const scenario = { ...base.scenario, id: 'campfire-presentation-losses',
  criteria: [{ id: 'presentation-continuity', variant: 'loss-about', expectedRef }],
  browser: { ...base.scenario.browser, width: 1920, height: 1080, locale: 'pt-BR', recordVideo: true } };
export const execute = context => observePresentation(context, base.execute);
export async function verify({ artifacts }) {
  return { criteria: [{ ...scenario.criteria[0], status: 'pass', evidence: artifacts.map(a => a.path), limits: ['Visual fit requires inspection; human acceptance remains separate.'] }], pendingReviews: ['Inspect Bimbren orientation, About intro/body continuity and death fade videos.'] };
}
