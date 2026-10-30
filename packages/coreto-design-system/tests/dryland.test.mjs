import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {packageRoot,registry,prepareInstall,transaction,sha} from '../src/authoring.mjs';
const project=process.env.CORETO_TEST_PROJECT, coretoCli=process.env.CORETO_TEST_CLI;
const enabled=!!project&&!!coretoCli;
function fixture(t) {
  const parent=path.join(packageRoot,'staging');fs.mkdirSync(parent,{recursive:true});
  const root=fs.mkdtempSync(path.join(parent,'dryland-'));
  fs.cpSync(project,root,{recursive:true});
  t.after(()=>{assert.equal(path.dirname(root),parent);fs.rmSync(root,{recursive:true});});
  return root;
}
function inventory(root) {
  return Object.fromEntries(fs.readdirSync(root,{recursive:true}).filter(p=>fs.statSync(path.join(root,p)).isFile())
    .map(p=>[p,sha(fs.readFileSync(path.join(root,p)))]));
}
test('Dryland package alone upgrades legacy consumer, preserves native data and handlers, reapplies and restores', {skip:!enabled}, t=>{
  const root=fixture(t),before=inventory(root),old=registry(root).plugins;
  const prepared=prepareInstall(root,{preset:'dryland',coretoCli});
  assert(transaction(root,prepared.changes,{dryRun:true,expectedHash:prepared.hash}).changed>0);
  assert.deepEqual(inventory(root),before);
  const applied=transaction(root,prepared.changes,{expectedHash:prepared.hash});
  const installed=inventory(root);
  for(const file of Object.keys(before).filter(file=>file.startsWith('data'+path.sep)))assert.equal(installed[file],before[file]);
  const after=registry(root).plugins;
  assert(after.findIndex(p=>p.name==='Dryland_6_IllustratedChoices')>after.findIndex(p=>p.name==='Dryland_6_ParchmentUI'));
  assert(after.findIndex(p=>p.name==='Dryland_6_ParchmentUI')>after.findIndex(p=>p.name==='Coreto_5_DesignSystem'));
  assert.deepEqual(after.find(p=>p.name==='Dryland_6_SacrificeStage'),old.find(p=>p.name==='Dryland_6_SacrificeStage'));
  assert.equal(transaction(root,prepareInstall(root,{preset:'dryland',coretoCli}).changes,{dryRun:true}).changed,0);
  const restored=spawnSync(process.execPath,[path.join(packageRoot,'cli.mjs'),'restore','--project',root,'--input',applied.receipt],{encoding:'utf8'});
  assert.equal(restored.status,0,restored.stdout);
  assert.deepEqual(inventory(root),before);
});
test('Dryland preview rejects a customized renderer before any write', {skip:!enabled},t=>{
  const root=fixture(t);fs.appendFileSync(path.join(root,'js/plugins/Dryland_6_IllustratedChoices.js'),'\n// custom consumer renderer\n');
  const before=inventory(root);
  assert.throws(()=>prepareInstall(root,{preset:'dryland',coretoCli}),/Personalização conflitante/);
  assert.deepEqual(inventory(root),before);
});

test('Dryland preview rejects a customized managed font without overwriting it', {skip:!enabled},t=>{
  const root=fixture(t),font=Object.keys(JSON.parse(fs.readFileSync(path.join(packageRoot,'design/compatibility.json'))).assets).find(file=>file.endsWith('.ttf'));
  fs.mkdirSync(path.dirname(path.join(root,font)),{recursive:true});
  fs.writeFileSync(path.join(root,font),'custom font bytes');
  const before=inventory(root);
  assert.throws(()=>prepareInstall(root,{preset:'dryland',coretoCli}),/Asset personalizado conflitante/);
  assert.deepEqual(inventory(root),before);
});
test('Dryland preview preserves a customized provider drawing callback by rejecting the upgrade', {skip:!enabled},t=>{
  const root=fixture(t),reg=registry(root),entry=reg.plugins.find(p=>p.name==='Coreto_0_CoreEngine');
  const window=JSON.parse(entry.parameters['Window:struct']);
  window['DrawItemBackgroundJS:func']=JSON.stringify('this.customDrawing();');
  entry.parameters['Window:struct']=JSON.stringify(window);
  fs.writeFileSync(path.join(root,'js/plugins.js'),reg.serialize());
  const before=inventory(root);
  assert.throws(()=>prepareInstall(root,{preset:'dryland',coretoCli}),/Callback visual personalizado conflitante/);
  assert.deepEqual(inventory(root),before);
});
test('Dryland preview rejects conflicting console settings and translations without partial writes', {skip:!enabled},t=>{
  const root=fixture(t),reg=registry(root),entry=reg.plugins.find(p=>p.name==='Coreto_2_ExtMessageFunc');
  const original=reg.serialize(),consoleSettings=JSON.parse(entry.parameters['MsgButtonConsole:struct']);
  consoleSettings['ButtonWidth:num']='199';entry.parameters['MsgButtonConsole:struct']=JSON.stringify(consoleSettings);
  fs.writeFileSync(path.join(root,'js/plugins.js'),reg.serialize());
  const before=inventory(root);
  assert.throws(()=>prepareInstall(root,{preset:'dryland',coretoCli}),/Personalização conflitante.*ButtonWidth/);
  assert.deepEqual(inventory(root),before);
  fs.writeFileSync(path.join(root,'js/plugins.js'),original);
  fs.appendFileSync(path.join(root,'Languages.tsv'),'\nui.menu\tCustom\tPersonalizado\n');
  const translated=inventory(root);
  assert.throws(()=>prepareInstall(root,{preset:'dryland',coretoCli}),/Tradução personalizada conflitante/);
  assert.deepEqual(inventory(root),translated);
});
