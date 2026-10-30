import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {packageRoot,registry,prepareInstall,transaction,sha} from '../src/authoring.mjs';

const project=process.env.CORETO_TEST_PROJECT,coretoCli=process.env.CORETO_TEST_CLI;
const enabled=!!project&&!!coretoCli;
function fixture(t) {
  const parent=path.join(packageRoot,'staging');fs.mkdirSync(parent,{recursive:true});
  const root=fs.mkdtempSync(path.join(parent,'generic-'));
  t.after(()=>{assert.equal(path.dirname(root),parent);fs.rmSync(root,{recursive:true});});
  for(const file of ['game.rmmzproject','data/System.json','js/plugins.js']) {
    fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.copyFileSync(path.join(project,file),path.join(root,file));
  }
  const reg=registry(root);reg.plugins.splice(0,reg.plugins.length,...reg.plugins.filter(p=>p.name.startsWith('Coreto_')));
  fs.writeFileSync(path.join(root,'js/plugins.js'),reg.serialize());
  return root;
}
function inventory(root) {
  return Object.fromEntries(fs.readdirSync(root,{recursive:true}).filter(f=>fs.statSync(path.join(root,f)).isFile()).map(f=>[f,sha(fs.readFileSync(path.join(root,f)))]));
}
function consoleSetting(root,key,value) {
  const reg=registry(root),p=reg.plugins.find(p=>p.name==='Coreto_2_ExtMessageFunc');
  const settings=JSON.parse(p.parameters['MsgButtonConsole:struct']);settings[key]=String(value);
  p.parameters['MsgButtonConsole:struct']=JSON.stringify(settings);fs.writeFileSync(path.join(root,'js/plugins.js'),reg.serialize());
}
test('generic upgrade needs no consumer profile, preserves content, is idempotent and restores exact bytes',{skip:!enabled},t=>{
  const root=fixture(t),before=inventory(root),prepared=prepareInstall(root,{coretoCli});
  assert.deepEqual(inventory(root),before);
  assert(!prepared.changes.some(c=>/Dryland|Languages.tsv|data\//.test(c.file)));
  const applied=transaction(root,prepared.changes,{expectedHash:prepared.hash});
  assert(!registry(root).plugins.some(p=>p.name.startsWith('Dryland')));
  const migrated=JSON.parse(registry(root).plugins.find(p=>p.name==='Coreto_2_ExtMessageFunc').parameters['MsgButtonConsole:struct']);
  const recipe=JSON.parse(fs.readFileSync(path.join(packageRoot,'design/preset.json')));
  for(const setting of recipe.settings.filter(s=>Object.hasOwn(s,'legacy'))) {
    const key=Object.keys(migrated).find(key=>key.split(':')[0]===setting.path.split('/').at(-1));
    assert.equal(String(migrated[key]),String(setting.value),'known legacy parameter was not migrated: '+setting.path);
  }
  assert.equal(transaction(root,prepareInstall(root,{coretoCli}).changes,{dryRun:true}).changed,0);
  const restore=spawnSync(process.execPath,[path.join(packageRoot,'cli.mjs'),'restore','--project',root,'--input',applied.receipt],{encoding:'utf8'});
  assert.equal(restore.status,0,restore.stdout);assert.deepEqual(inventory(root),before);
});
test('generic upgrade refuses unrecognized managed settings and callbacks before writing',{skip:!enabled},t=>{
  const root=fixture(t);consoleSetting(root,'ButtonWidth:num',199);const before=inventory(root);
  assert.throws(()=>prepareInstall(root,{coretoCli}),/Personalização conflitante.*ButtonWidth/);assert.deepEqual(inventory(root),before);
  consoleSetting(root,'ButtonWidth:num',152);
  const reg=registry(root),p=reg.plugins.find(p=>p.name==='Coreto_0_CoreEngine'),window=JSON.parse(p.parameters['Window:struct']);
  window['DrawItemBackgroundJS:func']=JSON.stringify('this.consumerDrawing();');p.parameters['Window:struct']=JSON.stringify(window);
  fs.writeFileSync(path.join(root,'js/plugins.js'),reg.serialize());const custom=inventory(root);
  assert.throws(()=>prepareInstall(root,{coretoCli}),/Callback visual personalizado conflitante/);assert.deepEqual(inventory(root),custom);
});
test('generic managed asset collision never overwrites consumer bytes',{skip:!enabled},t=>{
  const root=fixture(t),file=path.join(root,'fonts/Outfit.ttf');fs.mkdirSync(path.dirname(file));fs.writeFileSync(file,'consumer font');
  const before=inventory(root);assert.throws(()=>prepareInstall(root,{coretoCli}),/Asset personalizado conflitante/);assert.deepEqual(inventory(root),before);
});
