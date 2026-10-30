import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {packageRoot,registry,prepareInstall,transaction} from '../src/authoring.mjs';

const project=process.env.CORETO_TEST_PROJECT,coretoCli=process.env.CORETO_TEST_CLI;
test('fresh native provider defaults accept generic installation and preserve unknown options and every action handler', {skip:!project||!coretoCli}, t=>{
  const parent=path.join(packageRoot,'staging');fs.mkdirSync(parent,{recursive:true});
  const root=fs.mkdtempSync(path.join(parent,'providers-'));
  t.after(()=>{assert.equal(path.dirname(root),parent);fs.rmSync(root,{recursive:true});});
  for(const relative of ['game.rmmzproject','data/System.json','js/plugins.js']) {
    const target=path.join(root,relative);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(project,relative),target);
  }
  const reg=registry(root);reg.plugins.splice(0,reg.plugins.length,...reg.plugins.filter(p=>p.name.startsWith('Coreto_')&&p.name!=='Coreto_5_DesignSystem'));
  for(const plugin of reg.plugins)plugin.parameters={};
  fs.writeFileSync(path.join(root,'js/plugins.js'),reg.serialize());
  function native(args) {return JSON.parse(execFileSync(process.execPath,[coretoCli,'options',...args,'--project',root,'--json'],{encoding:'utf8',maxBuffer:16*1024*1024})).result;}
  const categories=native(['parameters','get','--path','/Categories']).value;
  const custom={...structuredClone(categories[0].List[0]),Symbol:'referenceCustom',DrawJS:'this.drawText("custom",0,0,200);',ProcessOkJS:'this.customAction();'};
  categories[0].List.push(custom);
  const input=path.join(root,'categories.json');fs.writeFileSync(input,JSON.stringify(categories));
  native(['parameters','set','--path','/Categories','--input',input]);
  const before=native(['parameters','get','--path','/Categories']).value;
  const prepared=prepareInstall(root,{coretoCli});transaction(root,prepared.changes,{expectedHash:prepared.hash});
  const after=native(['parameters','get','--path','/Categories']).value;
  assert.deepEqual(after[0].List.find(row=>row.Symbol==='referenceCustom'),custom);
  for(let c=0;c<before.length;c++)for(let i=0;i<before[c].List.length;i++) {
    const strip=({DrawJS,...row})=>row;
    assert.deepEqual(strip(after[c].List[i]),strip(before[c].List[i]));
  }
  assert.equal(transaction(root,prepareInstall(root,{coretoCli}).changes,{dryRun:true}).changed,0);
});
