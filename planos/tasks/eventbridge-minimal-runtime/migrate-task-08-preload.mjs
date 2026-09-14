import fs from 'node:fs';import {read,c,pc,call,append,write} from './native-migration-helpers.mjs';
const events=read('CommonEvents.json');
if(events.some(event=>event?.name==='Taverna — Carregar imagens'))throw new Error('Preload already authored');
const names=['Taverna',...Array.from({length:8},(_,i)=>`Tavern_H${i+1}`),...Array.from({length:8},(_,i)=>`H${i+1}`),'ivai','Button','Tag','Panel','DestinationCard','DestinationLabel','Destination_physical','Destination_supernatural','Destination_final','MapDwarven','MapElven','MapComplete'].map(name=>'Dryland_'+name);
for(const name of names)if(!fs.existsSync(`rpg-maker/The Dryland Drowned/img/pictures/${name}.png`))throw new Error(name);
const args=Object.fromEntries(['animations','battlebacks1','battlebacks2','characters','enemies','faces','parallaxes','pictures','sv_actors','sv_enemies','system','tilesets','titles1','titles2'].map(directory=>[directory+':arraystr',JSON.stringify(directory==='pictures'?names:[])]));
const helper=append(events,'Taverna — Carregar imagens',[pc('VisuMZ_0_CoreEngine','SystemLoadImages',args)]);
const callers=[3,38,39,117,...Array.from({length:8},(_,i)=>5+i),...Array.from({length:32},(_,i)=>82+i)];
for(const id of callers){
 events[id].list.unshift(call(helper));
 // Native saves preserve the event cursor. A resumed next text/choice requests
 // the same list even when the save was made after this unit's entry command.
 events[id].list=events[id].list.flatMap((command,index,list)=>(command.code===101||(command.code===102&&list[index-1]?.code!==404))?[{...call(helper),indent:command.indent},command]:[command]);
}
write(events);
const file='rpg-maker/The Dryland Drowned/data/Map003.json',map=JSON.parse(fs.readFileSync(file));
const event=structuredClone(map.events.find(Boolean));event.id=map.events.length;event.name='Taverna — Carregar imagens';event.x=12;event.y=7;event.pages=[event.pages[0]];event.pages[0].trigger=0;event.pages[0].list=[call(helper),c(0)];map.events.push(event);fs.writeFileSync(file,JSON.stringify(map)+'\n');
const bridgeFile='rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js';let bridge=fs.readFileSync(bridgeFile,'utf8');bridge=bridge.replace(/      \/\/ Native isReady normally runs only when a scene starts\.[\s\S]*?      if \(!ImageManager.isReady\(\)\) \{ consumeConfirmation\(\); return; \}\n/,'');fs.writeFileSync(bridgeFile,bridge);
console.log({helper,files:names.length,callers});
