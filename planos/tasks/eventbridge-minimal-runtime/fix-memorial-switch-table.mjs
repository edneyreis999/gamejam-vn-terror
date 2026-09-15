import {read,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json'),system=read('System.json');
for(let i=0;i<8;i++)system.switches[38+i]=`Ausência H${i+1} apresentada`;
write(events,system);
