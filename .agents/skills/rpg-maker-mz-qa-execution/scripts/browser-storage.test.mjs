import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadStorageFixture, storageCapture, validateLocalStorage } from './browser-storage.mjs';
const origin='http://127.0.0.1:18727';
const state={cookies:[],origins:[{origin,localStorage:[],indexedDB:[{name:'localforage',version:2,stores:[{name:'keyvaluepairs',autoIncrement:false,keyPath:null,indexes:[],records:[{key:'rmmzsave.42.file0',value:'native\u0000compressed\u00ffpayload'},{key:'rmmzsave.42.global',value:'matching-index'}]}]}]}]};
async function directory(t){const path=await mkdtemp(join(tmpdir(),'qa-storage-'));t.after(()=>rm(path,{recursive:true,force:true}));return path;}
test('capture preserves native payload/index and reloads only inventoried immutable startup input',async t=>{
 const output=await directory(t),report={checkpoints:[]};let reads=0;
 const capture=storageCapture({context:{storageState:async options=>{assert.deepEqual(options,{indexedDB:true});reads++;return structuredClone(state);}},identity:async()=>({document:1}),report,output,origin});
 const result=await capture('checkpoint');assert.equal(reads,1);assert.deepEqual(result.state,state);assert.equal(report.checkpoints.length,1);
 const descriptor={files:[{path:result.path,sha256:result.sha256}],storageFixture:{path:result.path,sha256:result.sha256}};
 assert.deepEqual(await loadStorageFixture({descriptor,fixture:output,origin}),state);
 const bytes=await readFile(join(output,result.path));await assert.rejects(capture('checkpoint'),{code:'EEXIST'});assert.deepEqual(await readFile(join(output,result.path)),bytes);
 await writeFile(join(output,result.path),'tampered');await assert.rejects(loadStorageFixture({descriptor,fixture:output,origin}),/hash changed/);
});
test('foreign origins, untracked paths and traversal are rejected before context creation',async t=>{
 const fixture=await directory(t),outside=await directory(t);await writeFile(join(outside,'save.json'),JSON.stringify(state));
 await assert.rejects(loadStorageFixture({descriptor:{files:[],storageFixture:{path:join(outside,'save.json'),sha256:'x'}},fixture,origin}),/inside the isolated fixture/);
 const foreign=structuredClone(state);foreign.origins[0].origin='https://example.com';assert.throws(()=>validateLocalStorage(foreign,origin),/foreign origin/);
 const cookies=structuredClone(state);cookies.cookies=[{name:'personal'}];assert.throws(()=>validateLocalStorage(cookies,origin),/do not import cookies/);
 assert.equal(await loadStorageFixture({descriptor:{},fixture,origin}),undefined);
});
test('document changes invalidate a capture without creating an artifact',async t=>{
 const output=await directory(t),report={checkpoints:[]};let document=0;
 const capture=storageCapture({context:{storageState:async()=>structuredClone(state)},identity:async()=>({document:document++}),report,output,origin});
 await assert.rejects(capture('changed'),/Document changed/);assert.deepEqual(report.checkpoints,[]);
 await assert.rejects(readFile(join(output,'changed.storage.json')),{code:'ENOENT'});
 await assert.rejects(capture('../escape'));
});
