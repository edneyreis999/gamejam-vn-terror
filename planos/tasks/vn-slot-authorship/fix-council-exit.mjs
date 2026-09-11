// One-shot removal of a redundant helper call after Observe already closed ownership.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
const root='rpg-maker/The Dryland Drowned',file=`${root}/data/CommonEvents.json`;
const layout=JSON.parse(await readFile(`${root}/native-layout-manifest.json`));
assert.equal(layout.nativeLayoutVersion,'mz-20260911-slot-authorship-02');
const events=JSON.parse(await readFile(file));
assert.deepEqual(events[53].list[0],{code:117,indent:0,parameters:[77]});
assert.equal(events[53].list[1].parameters[1],'Conversation');
events[53].list.shift();
await writeFile(file,`[\n${events.map(x=>JSON.stringify(x)).join(',\n')}\n]\n`);
