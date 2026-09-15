import {read,write} from './native-migration-helpers.mjs';
import fs from 'node:fs';
const events=read('CommonEvents.json');events[4].list.find(c=>c.code===135).parameters=[0];write(events);
const file='rpg-maker/The Dryland Drowned/data/Map002.json',map=JSON.parse(fs.readFileSync(file));
map.events[1].pages[0].list=map.events[1].pages[0].list.filter(c=>c.code!==135);
fs.writeFileSync(file,JSON.stringify(map)+'\n');
