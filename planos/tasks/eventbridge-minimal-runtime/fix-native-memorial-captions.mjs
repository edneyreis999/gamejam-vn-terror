import {read,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json');
// Materialize editorial line breaks once. This script is never loaded by MZ.
for(const event of events.filter(event=>event?.name.startsWith('memorial_cause.'))){
 const command=event.list.find(command=>command.code===122);
 const words=JSON.parse(command.parameters[4]).split(/(?:\s+|<br>)/),lines=[''];
 for(const word of words){const last=lines.length-1;if(lines[last]&&lines[last].length+1+word.length>26)lines.push(word);else lines[last]+=(lines[last]?' ':'')+word;}
 command.parameters[4]=JSON.stringify(lines.join('<br>'));
}
for(const command of events[59].list)if(command.code===357&&command.parameters[1]==='PictureTextChange'){
 const args=command.parameters[3];let text=JSON.parse(args['upperleft:json']);
 text=text.replace('\\FS[26]','\\FS[24]').replace('\\FS[22]','\\FS[20]').replace('\\FS[19]','\\FS[18]').replace(' · ','<br>');
 args['upperleft:json']=JSON.stringify(text);
}
write(events);
