import {read,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json');
for(const event of events.filter(Boolean))event.list=event.list.filter((command,index,list)=>
 !(command.code===357&&command.parameters[1]==='BindInterfacePicture'&&list[index-1]?.code===231&&String(list[index-1].parameters[1]).startsWith('Dryland_Memorial_')));
write(events);
