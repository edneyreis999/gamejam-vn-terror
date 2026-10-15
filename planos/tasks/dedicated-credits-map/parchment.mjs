import assert from 'node:assert/strict';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
const game = new URL('../../../rpg-maker/The Dryland Drowned/', import.meta.url);
const path = name => new URL(name, game);
const map = JSON.parse(readFileSync(path('data/Map046.json'), 'utf8'));
const registry = {};
const registryText = readFileSync(path('js/plugins.js'), 'utf8');
vm.runInNewContext(registryText, registry);
assert.equal(map.events[1].pages[0].list[0].parameters[1], 'SceneOpenCreditsPage');
const id = 'Dryland_2_CreditsScroll';
assert.ok(!registry.$plugins.some(p => p.name === id));
const previous = JSON.parse(readFileSync(path('data/CommonEvents.json'), 'utf8'));
assert.ok(previous[337]);
const command = (code, parameters) => ({ code, indent: 0, parameters });
map.note += '\n<drylandCreditsScroll>';
map.events[1].pages[0].list = [
    command(117, [337]),
    command(231, [1, 'Dryland_Credits', 0, 0, 0, 0, 80, 80, 255, 0]),
    command(231, [41, 'Dryland_Button', 1, 0, 1100, 672, 140, 140, 255, 0]),
    command(357, ['VisuMZ_1_MessageCore', 'PictureTextChange', 'PictureTextChange', {
        'PictureIDs:arraynum': '["41"]', 'Padding:eval': '8',
        'upperleft:json': '""', 'up:json': '""', 'upperright:json': '""',
        'left:json': '""', 'right:json': '""', 'lowerleft:json': '""',
        'down:json': '""', 'lowerright:json': '""',
        'center:json': JSON.stringify('\\HexColor<#ffffff>\\FS[16]$[ui.credits.skip]')
    }]),
    command(357, ['Dryland_Presentation', 'BindScrollSkip', 'BindScrollSkip', { picture: '41', key: 'cancel' }]),
    command(105, [2, false]),
    ...['<center>\\FS[18]$[credits.title]', '<center>\\FS[22]Coreto', '<center>',
        '<center>\\FS[20]Edney · Lucas · Pati', '<center>João · Maria', '<center>',
        '<center>RPG Maker MZ', '<center>$[credits.plugins]'].map(line => command(405, [line])),
    command(235, [41]),
    command(357, ['Dryland_Presentation', 'ConsumeInput', 'ConsumeInput', {}]),
    command(354, []), command(0, [])
];
copyFileSync(path('img/titles1/Dryland_Credits.png'), path('img/pictures/Dryland_Credits.png'));
registry.$plugins.find(p => p.name === 'VisuMZ_4_CreditsPage').status = false;
registry.$plugins.push({ name: id, status: true, description: 'Native credits inside Reed’s parchment', parameters: {} });
writeFileSync(path('data/Map046.json'), JSON.stringify(map));
const start = registryText.indexOf('[');
writeFileSync(path('js/plugins.js'), registryText.slice(0, start) + JSON.stringify(registry.$plugins, null, 4) + ';\n');
console.log('Map046 uses native parchment credits; CreditsPage disabled; specialist registered.');
