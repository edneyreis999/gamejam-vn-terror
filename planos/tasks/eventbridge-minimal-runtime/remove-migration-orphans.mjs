import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// One-time task29 cleanup; this is not a runtime or authoring prerequisite.
const root = 'rpg-maker/The Dryland Drowned';
const file = path.join(root, 'data/CommonEvents.json');
const raw = fs.readFileSync(file, 'utf8'), events = JSON.parse(raw);
const ids = [62, 66, 72, 80, 81];
const removed = ids.map(id => {
  assert.ok(events[id], `Expected original slot CE${id}`);
  assert.equal(events[id].trigger, 0, `CE${id} cannot be a live trigger`);
  return { id, name: events[id].name };
});
const lists = events.filter(Boolean).map(event => ({owner:`CE${event.id}`,list:event.list}));
for (const name of fs.readdirSync(path.join(root,'data')).filter(name=>/^Map\d{3}\.json$/.test(name))) {
  const map=JSON.parse(fs.readFileSync(path.join(root,'data',name),'utf8'));
  for (const event of map.events.filter(Boolean)) for (const page of event.pages) lists.push({owner:`${name}/event${event.id}`,list:page.list});
}
for (const troop of JSON.parse(fs.readFileSync(path.join(root,'data/Troops.json'),'utf8')).filter(Boolean)) for (const page of troop.pages) lists.push({owner:`Troop${troop.id}`,list:page.list});
for (const {owner,list} of lists) for (const command of list) {
  assert.ok(command.code!==117||!ids.includes(command.parameters[0]), `${owner} still calls retired helper`);
  for (const value of command.parameters) if (typeof value==='string') for(const match of value.matchAll(/<(?:Choice Common Event|Common Event):\s*(\d+)>/gi)) assert.ok(!ids.includes(Number(match[1])),`${owner} choice callback`);
}
// Provider selectors and dynamic project calls are separately audited in task29.
for (const id of ids) events[id]=null;
const indent=[0,2,4].find(indent=>raw.trim()===JSON.stringify(JSON.parse(raw),null,indent));
assert.notEqual(indent,undefined,'Preserve the native database format');
fs.writeFileSync(file,JSON.stringify(events,null,indent)+(raw.endsWith('\n')?'\n':''));
assert.deepEqual(JSON.parse(fs.readFileSync(file,'utf8')),events);
console.log(JSON.stringify({removed},null,2));
