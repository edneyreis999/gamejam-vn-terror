import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('packaged destination projection preserves concealed content and never changes native state', () => {
  let adapter;
  const pictures=Object.freeze(Array.from({length:81},(_,id)=>Object.freeze({name:()=>id<78?'Dryland_DestinationCard':'Dryland_DestinationLabel'})));
  const values=Object.freeze({176:'$[dest.status.selected]',177:'$[dest.status.completed]',178:'$[dest.status.locked]'});
  const context={CoretoDesignSystem:{registerAdapter:a=>{adapter=a;}},PluginManager:{parameters:()=>({})},
    Scene_Map:class { createAllWindows() {} terminate() {} update() {} },
    Window_ChoiceList:class { start() {} },
    $gameMessage:Object.freeze({_drylandChoiceFocus:Object.freeze({key:'destinations'})}),
    $gameScreen:Object.freeze({_pictures:pictures}),$gameMap:{mapId:()=>3},$gameVariables:{value:id=>values[id]}};
  vm.runInNewContext(fs.readFileSync(new URL('../profiles/dryland/Dryland_6_IllustratedChoices.js',import.meta.url),'utf8'),context);
  const concealed='$[dest.status.unknown]';
  assert.equal(adapter.pictureText(pictures[77],'upperleft',concealed),concealed);
  assert(!adapter.pictureText(pictures[77],'upperleft',concealed).includes('dest.final.desc'));
  assert(adapter.pictureText(pictures[78],'center','legacy label').includes('$[ui.destination.choose]'));
  assert(adapter.pictureText(pictures[79],'center','legacy label').includes('$[dest.status.completed]'));
  assert(adapter.pictureText(pictures[80],'center','legacy label').includes('$[dest.status.locked]'));
  assert.equal(values[176],'$[dest.status.selected]');
});
