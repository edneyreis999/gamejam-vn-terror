import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { prepare as prepareGame } from '../../../rpg-maker/qa/directed-adapter.mjs';
export { describe, start } from '../../../rpg-maker/qa/directed-adapter.mjs';
export const sourceFiles = [new URL('../../../rpg-maker/qa/directed-adapter.mjs', import.meta.url), new URL('./margin.py', import.meta.url)];
export async function prepare(options) {
  const prepared = await prepareGame(options);
  execFileSync('python3', [new URL('./margin.py', import.meta.url).pathname, '--file', join(prepared.fixture, 'js/plugins.js'), '--write']);
  return { ...prepared, proposal: '32px wrap margin in isolated fixture only' };
}
