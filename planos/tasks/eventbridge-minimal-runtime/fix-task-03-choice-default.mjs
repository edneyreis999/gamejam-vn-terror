import fs from 'node:fs';
import assert from 'node:assert/strict';
const file='rpg-maker/The Dryland Drowned/data/CommonEvents.json';
const events=JSON.parse(fs.readFileSync(file,'utf8'));
const groups=events[3].list.filter(c=>c.code===102);
assert.equal(groups.length,2);assert.equal(groups[1].parameters[2],0);
groups[1].parameters[2]=-1;
fs.writeFileSync(file,'[\n'+events.map(e=>JSON.stringify(e)).join(',\n')+'\n]\n');
