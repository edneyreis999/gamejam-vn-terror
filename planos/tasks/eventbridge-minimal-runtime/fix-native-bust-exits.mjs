import {read,c,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json');
for(const id of [76,78,80,81]){
 const slots=new Set(events[id].list.filter(cmd=>cmd.code===357&&cmd.parameters[1]==='Basic_ExitBusts').flatMap(cmd=>JSON.parse(cmd.parameters[3]['PictureID:arrayeval']).map(Number)));
 for(const slot of slots)if(!events[id].list.some(cmd=>cmd.code===235&&cmd.parameters[0]===slot))events[id].list.splice(-1,0,c(235,[slot]));
}
write(events);
