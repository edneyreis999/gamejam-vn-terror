import fs from 'node:fs';import {read,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json'),edits=[];
function migrate(list,owner){for(const [index,c] of list.entries())if(c.code===357&&c.parameters[0]==='Dryland_EventBridge'&&c.parameters[1]==='Action'){
 const args=c.parameters[3],match=/^\\V\[(\d+)\]$/.exec(args.value||'');
 if(match){args.value='';args.valueVariable=match[1];edits.push({owner,index,variable:match[1]});}
}}
for(const event of events.filter(Boolean))migrate(event.list,'CE'+event.id);write(events);
const directory='rpg-maker/The Dryland Drowned/data/';for(const file of fs.readdirSync(directory).filter(name=>/^Map\d+\.json$/.test(name))){const map=JSON.parse(fs.readFileSync(directory+file,'utf8')),before=edits.length;for(const event of map.events.filter(Boolean))for(const page of event.pages)migrate(page.list,file+':'+event.id);if(edits.length>before)fs.writeFileSync(directory+file,JSON.stringify(map)+'\n');}
fs.writeFileSync('planos/tasks/eventbridge-minimal-runtime/task-14-callers.json',JSON.stringify(edits,null,2)+'\n');
