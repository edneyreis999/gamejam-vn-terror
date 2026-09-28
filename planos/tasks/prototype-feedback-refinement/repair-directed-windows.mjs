import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const path='.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs';
let source=readFileSync(path,'utf8');
assert.ok(source.includes("!rel.startsWith('../')"));
source=source.replace('dirname, basename }','dirname, basename, sep }').replace("!rel.startsWith('../')","!rel.startsWith('..' + sep)");
writeFileSync(path,source);
