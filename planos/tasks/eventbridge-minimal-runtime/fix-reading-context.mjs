import fs from 'node:fs';
import assert from 'node:assert/strict';
const file='rpg-maker/The Dryland Drowned/data/CommonEvents.json';
const events=JSON.parse(fs.readFileSync(file,'utf8'));
for(const id of [114,115,116]){
 const event=events[id];assert.equal(event.list[0].parameters[1],'Query');
 event.list.splice(0,2,{code:357,indent:0,parameters:['Dryland_EventBridge','CaptureContext','Capturar contexto',{}]});
 event.list.find(c=>c.code===357&&c.parameters[1]==='ReadingComplete').parameters[3]={};
}
fs.writeFileSync(file,'[\n'+events.map(e=>JSON.stringify(e)).join(',\n')+'\n]\n');
