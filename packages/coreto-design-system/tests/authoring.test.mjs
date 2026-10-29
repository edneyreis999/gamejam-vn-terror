import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {packageRoot,transaction,prepareInstall,registry,sha} from '../src/authoring.mjs';
const parent=path.join(packageRoot,'staging');fs.mkdirSync(parent,{recursive:true});
function fixture(t){const root=fs.mkdtempSync(path.join(parent,'test-'));fs.mkdirSync(path.join(root,'js'));fs.mkdirSync(path.join(root,'data'));fs.writeFileSync(path.join(root,'game.rmmzproject'),'RPGMZ 1.10.0');fs.writeFileSync(path.join(root,'js/plugins.js'),'var $plugins = [{"name":"Other","status":false,"parameters":{"Unknown":"keep"}}];\n');fs.writeFileSync(path.join(root,'data/System.json'),JSON.stringify({advanced:{screenWidth:1280,screenHeight:720,fontSize:26},windowTone:[0,0,0,0]}));t.after(()=>{assert.equal(path.dirname(root),parent);fs.rmSync(root,{recursive:true});});return root;}
function cli(root,...args){const r=spawnSync(process.execPath,[path.join(packageRoot,'cli.mjs'),...args,'--project',root,'--json'],{encoding:'utf8'});return {code:r.status,...JSON.parse(r.stdout)};}
test('install standalone, idempotence, persisted custom fields and export',t=>{const root=fixture(t);assert.equal(cli(root,'install').ok,true);assert.equal(cli(root,'install').result.changed,0);assert.equal(cli(root,'parameters','set','--path','/Shapes/PanelRadius','--value','9').ok,true);const file=path.join(root,'js/plugins.js'),r=registry(root),p=r.plugins.find(p=>p.name==='Coreto_5_DesignSystem');p.parameters.Future='keep';const shape=JSON.parse(p.parameters.Shapes);shape.FutureField='keep';p.parameters.Shapes=JSON.stringify(shape);fs.writeFileSync(file,r.serialize());assert.equal(cli(root,'install').result.changed,0);assert.equal(cli(root,'parameters','get','--path','/Shapes/PanelRadius').result.value,9);assert.equal(registry(root).plugins.find(p=>p.name==='Other').parameters.Unknown,'keep');assert.equal(cli(root,'preset','export').result.parameters.Future,'keep');assert.equal(cli(root,'validate').result.valid,false);assert.equal(cli(root,'validate').result.errors.filter(e=>e.includes('Provedor obrigatório')).length,3);});
test('invalid values and stale hash never write',t=>{const root=fixture(t);cli(root,'install');const file=path.join(root,'js/plugins.js'),before=fs.readFileSync(file);assert.equal(cli(root,'parameters','set','--path','/Shapes/PanelRadius','--value','-2').ok,false);assert.equal(cli(root,'parameters','set','--path','/Shapes/PanelRadius','--value','8','--expected-hash','stale').code,4);assert.deepEqual(fs.readFileSync(file),before);});
test('dry run never modifies the project and all files have preparation hashes',t=>{const root=fixture(t),before=fs.readFileSync(path.join(root,'js/plugins.js'));const prepared=prepareInstall(root);assert(prepared.changes.every(c=>c.expectedBefore!==undefined));assert(transaction(root,prepared.changes,{dryRun:true,expectedHash:prepared.hash}).changed>0);assert.deepEqual(fs.readFileSync(path.join(root,'js/plugins.js')),before);assert.equal(fs.existsSync(path.join(root,'fonts')),false);});
test('detect external registry edit during preparation',t=>{const root=fixture(t),p=prepareInstall(root),file=path.join(root,'js/plugins.js');fs.appendFileSync(file,' ');assert.throws(()=>transaction(root,p.changes,{expectedHash:p.hash}),/Registry mudou/);assert.equal(registry(root).plugins.length,1);});
test('failure on second write rolls back first and preserves competing edit',t=>{const root=fixture(t);for(const n of ['a','b'])fs.writeFileSync(path.join(root,n),n);assert.throws(()=>transaction(root,[{file:'a',bytes:'new-a'},{file:'b',bytes:'new-b'}],{beforeCommit(){fs.writeFileSync(path.join(root,'b'),'external');}}),/Conflito/);assert.equal(fs.readFileSync(path.join(root,'a'),'utf8'),'a');assert.equal(fs.readFileSync(path.join(root,'b'),'utf8'),'external');});
test('restore removes created assets and restores exact prior bytes',t=>{const root=fixture(t),file=path.join(root,'js/plugins.js'),before=fs.readFileSync(file);const installed=cli(root,'install');assert.equal(cli(root,'restore','--input',installed.result.receipt).ok,true);assert.deepEqual(fs.readFileSync(file),before);assert.equal(fs.existsSync(path.join(root,'js/plugins/Coreto_5_DesignSystem.js')),false);});
test('restore refuses concurrent customizations',t=>{const root=fixture(t),installed=cli(root,'install');cli(root,'parameters','set','--path','/Shapes/PanelRadius','--value','11');assert.equal(cli(root,'restore','--input',installed.result.receipt).code,4);assert.equal(cli(root,'parameters','get','--path','/Shapes/PanelRadius').result.value,11);});
test('reject path traversal and never accept foreign owners as own parameters',t=>{const root=fixture(t);assert.throws(()=>transaction(root,[{file:'../escape',bytes:'x'}]),/fora/);cli(root,'install');assert.equal(cli(root,'parameters','set','--path','/General/MessageWidth','--value','600').code,2);});

test('explicit preset reset preserves unknown fields and redirects migrated parameters',t=>{
 const root=fixture(t);cli(root,'install');const r=registry(root),p=r.plugins.find(p=>p.name==='Coreto_5_DesignSystem');
 p.parameters.Future='keep';p.parameters.Shapes=JSON.stringify({...JSON.parse(p.parameters.Shapes),FutureField:'keep',PanelRadius:'9'});fs.writeFileSync(path.join(root,'js/plugins.js'),r.serialize());
 assert.equal(cli(root,'install','--reapply').ok,true);const after=registry(root).plugins.find(p=>p.name==='Coreto_5_DesignSystem');
 assert.equal(after.parameters.Future,'keep');assert.equal(JSON.parse(after.parameters.Shapes).FutureField,'keep');
 assert.equal(cli(root,'api','describe','/Surfaces/panel').result[0].owner,'Coreto_5_DesignSystem');
 assert.equal(cli(root,'parameters','set','--path','/Surfaces/panel','--value','"#ffffff"').ok,true);
});

test('installation leaves native content and languages owned by the consumer',t=>{
 const root=fixture(t),file=path.join(root,'data/CommonEvents.json');
 const content='[null,{"id":1,"list":[{"code":0,"parameters":[]}]}]';
 fs.writeFileSync(file,content);
 const system=fs.readFileSync(path.join(root,'data/System.json'));
 const language='Key\tEnglish\tPortuguese\tFrench\ncustom\tKeep\tManter\tGarder\n';
 fs.writeFileSync(path.join(root,'Languages.tsv'),language);
 assert.equal(cli(root,'install').ok,true);
 assert.equal(fs.readFileSync(file,'utf8'),content);
 assert.deepEqual(fs.readFileSync(path.join(root,'data/System.json')),system);
 assert(fs.readFileSync(path.join(root,'Languages.tsv'),'utf8').startsWith(language));
 assert.equal(cli(root,'install').result.changed,0);
});

test('bundle regeneration preserves distributed behavior source and detects tampered assets',t=>{
 const root=fixture(t),file=path.join(packageRoot,'Coreto_5_DesignSystem.js'),before=fs.readFileSync(file);
 const built=spawnSync(process.execPath,[path.join(packageRoot,'tools/build.mjs')]);assert.equal(built.status,0);
 assert.deepEqual(fs.readFileSync(file),before);
 const source=before.toString();assert(!/Dryland|_dryland/.test(source));
 const asset=path.join(packageRoot,'assets/CoretoWindow.png'),original=fs.readFileSync(asset);
 try {fs.appendFileSync(asset,'changed');assert.equal(cli(root,'install').code,4);assert.equal(registry(root).plugins.length,1);}
 finally {fs.writeFileSync(asset,original);}
});

test('picture recipe list roundtrips MZ encoding, preserves extensions and rejects duplicate bindings',t=>{
 const root=fixture(t);cli(root,'install');
 assert.equal(cli(root,'parameters','set','--path','/PictureRoles','--value',JSON.stringify([{Image:'Panel',Role:'card'},{Image:'Action',Role:'secondary'}])).ok,true);
 const r=registry(root),p=r.plugins.find(p=>p.name==='Coreto_5_DesignSystem'),list=JSON.parse(p.parameters.PictureRoles).map(JSON.parse);
 list[0].Future='preserve';p.parameters.PictureRoles=JSON.stringify(list.map(JSON.stringify));fs.writeFileSync(path.join(root,'js/plugins.js'),r.serialize());
 assert.equal(cli(root,'parameters','set','--path','/PictureRoles/1/Role','--value','"primary"').ok,true);
 assert.equal(cli(root,'parameters','get','--path','/PictureRoles/0').result.value.Future,'preserve');
 const before=fs.readFileSync(path.join(root,'js/plugins.js'));
 assert.equal(cli(root,'parameters','set','--path','/PictureRoles/1/Image','--value','"Panel"').ok,false);
 assert.deepEqual(fs.readFileSync(path.join(root,'js/plugins.js')),before);
 assert.equal(cli(root,'install').result.changed,0);
 assert.equal(cli(root,'preset','export').result.parameters.PictureRoles[1].Role,'primary');
 assert.equal(cli(root,'parameters','reset','--path','/PictureRoles').ok,true);
 assert.deepEqual(cli(root,'parameters','get','--path','/PictureRoles').result.value,[]);
});

test('retired file removal is transactional and restore recovers bytes',t=>{
 const root=fixture(t),file='js/retired-adapter.js';fs.writeFileSync(path.join(root,file),'custom bytes');
 const applied=transaction(root,[{file,bytes:null}],{operation:'retire'});assert.equal(fs.existsSync(path.join(root,file)),false);
 assert.equal(cli(root,'restore','--input',applied.receipt).ok,true);assert.equal(fs.readFileSync(path.join(root,file),'utf8'),'custom bytes');
 assert.throws(()=>transaction(root,[{file,bytes:null},{file:'js/new.js',bytes:'new'}],{beforeCommit(){fs.writeFileSync(path.join(root,'js/new.js'),'concurrent');}}),/Conflito/);
 assert.equal(fs.readFileSync(path.join(root,file),'utf8'),'custom bytes');
});
