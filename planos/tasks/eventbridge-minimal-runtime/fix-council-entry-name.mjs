import fs from 'node:fs';
import {root,read} from './native-migration-helpers.mjs';
const map=read('Map023.json');map.events[1].name='Conselho — fluxo nativo';
fs.writeFileSync(root+'data/Map023.json',JSON.stringify(map,null,2)+'\n');
