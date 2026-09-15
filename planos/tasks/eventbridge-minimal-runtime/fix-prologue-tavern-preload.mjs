import fs from 'node:fs';import {read,call} from './native-migration-helpers.mjs';
const helper=read('CommonEvents.json').find(event=>event?.name==='Taverna — Carregar imagens').id;
const file='rpg-maker/The Dryland Drowned/data/Map002.json',map=JSON.parse(fs.readFileSync(file));
for(const page of map.events[1].pages)page.list.unshift(call(helper));
fs.writeFileSync(file,JSON.stringify(map)+'\n');
