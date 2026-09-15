import {read,c,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json');
for(const event of events.filter(Boolean))event.list=event.list.flatMap(cmd=>{
 const args=cmd.parameters[3];
 if(cmd.code!==357||cmd.parameters[1]!=='Basic_ExitBusts'||args['Duration:eval']!=='0'||args['AutoErase:eval']!=='true')return [cmd];
 return [cmd,...JSON.parse(args['PictureID:arrayeval']).map(id=>c(235,[Number(id)],cmd.indent))];
});
write(events);
