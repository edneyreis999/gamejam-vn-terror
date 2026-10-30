import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = name => fs.readFileSync(root + name, 'utf8');
const catalog = JSON.parse(read('design/public-api.json'));
const body = read('src/header.js') + '\n(() => {\nconst catalog=' + JSON.stringify(catalog) + ';\n' + read('src/runtime/base.js') + '\n})();\n' + ['ink','pictures-ink','composition'].map(name=>read('src/runtime/'+name+'.js')).join('\n');
fs.writeFileSync(root + catalog.pluginId + '.js', body);
fs.writeFileSync(root + 'design/catalog.json', JSON.stringify(catalog, null, 2) + '\n');
console.log('Built ' + catalog.pluginId + ' ' + catalog.version);
