import assert from 'node:assert/strict';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { isPlanFile, isReadOnlyShell } from './hook.mjs';

const allowed = [
  'grep -rIl -e a -e b . --exclude-dir=x',
  'grep -rn "a\\|b" file.tsv',
  "grep -rn '<b>' file.tsv",
  'ls x 2>/dev/null',
  'ls x 2>&1',
  'cat f | cut -d, -f1 | sort | uniq',
  'cd /tmp && ls; git status',
  'sed -n 1,5p f',
  'find . -name "*.js"',
  'echo COMPANION_ON',
];
const blocked = [
  'echo x > f',
  'echo x >> f',
  'cat f > /tmp/x',
  'sed -i s/a/b/ f',
  'sed --in-place s/a/b/ f',
  'rm f',
  'git commit -m x',
  'ls $(rm f)',
  'ls "$(rm f)"',
  'ls `rm f`',
  'cat <(rm f)',
  'find . -delete',
  'find . -exec rm {} ;',
  'ls | xargs rm',
  'ls | tee f',
  'sort -o f f',
  "awk 'BEGIN{system(\"rm f\")}'",
  'grep "unterminated',
  '',
];

for (const cmd of allowed) test(`libera: ${cmd}`, () => assert.equal(isReadOnlyShell(cmd), true));
for (const cmd of blocked) test(`bloqueia: ${cmd || '(vazio)'}`, () => assert.equal(isReadOnlyShell(cmd), false));

test('libera escrita só em ~/.claude/plans', () => {
  assert.equal(isPlanFile(join(homedir(), '.claude', 'plans', 'x.md')), true);
  assert.equal(isPlanFile(join(homedir(), '.claude', 'plans', '..', 'settings.json')), false);
  assert.equal(isPlanFile('/tmp/x.md'), false);
});
