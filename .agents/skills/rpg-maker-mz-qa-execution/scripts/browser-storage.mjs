import assert from 'node:assert/strict';
import { readFile, realpath, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, sep } from 'node:path';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export function validateLocalStorage(state, origin) {
  const url=new URL(origin);
  assert.ok(['127.0.0.1','localhost','[::1]'].includes(url.hostname),'Storage fixtures require a local origin.');
  assert.deepEqual(Object.keys(state).sort(),['cookies','origins']);
  assert.deepEqual(state.cookies,[],'Local game archives do not import cookies.');
  assert.ok(Array.isArray(state.origins));
  assert.ok(state.origins.every(item=>item.origin===url.origin),'Storage fixture contains a foreign origin.');
  return state;
}
export async function loadStorageFixture({ descriptor, fixture, origin }) {
  const names=['storageFixture','storageImport','storageSeed'].filter(name=>descriptor[name]);
  if(!names.length)return undefined;
  assert.equal(names.length,1,'Choose one storage input contract.');
  const name=names[0],source=descriptor[name],{path,sha256}=source;
  const root=await realpath(fixture),file=await realpath(resolve(root,path));
  assert.ok(file.startsWith(root+sep),'Storage fixture must be inside the isolated fixture.');
  assert.ok(descriptor.files.some(entry=>entry.path===path &&
    (name==='storageFixture' ? entry.sha256===sha256 : !entry.sha256 || entry.sha256===sha256)),
    'Storage fixture must be an inventoried immutable input.');
  if(name==='storageSeed')assert.ok(source.expectedRef,'Storage seed requires expectedRef.');
  const bytes=await readFile(file);assert.equal(hash(bytes),sha256,'Storage fixture hash changed.');
  const state=validateLocalStorage(JSON.parse(bytes),name==='storageFixture'?origin:source.sourceOrigin);
  assert.equal(state.origins.length,1,'Storage input requires one isolated origin.');
  state.origins[0].origin=new URL(origin).origin;
  return state;
}

export function storageCapture({context,identity,report,output,origin,expectedRef}) {
  return async id=>{
    assert.match(id,/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/);
    const before=await identity();
    const state=validateLocalStorage(await context.storageState({indexedDB:true}),origin);
    const after=await identity();assert.deepEqual(after,before,'Document changed during storage capture.');
    const path=`${id}.storage.json`,bytes=JSON.stringify(state,null,2)+'\n';
    await writeFile(resolve(output,path),bytes,{flag:'wx'});
    const artifact={id,path,sha256:hash(bytes),at:Date.now(),kind:'browser-storage',origin,expectedRef,capture:{before,after}};
    report.checkpoints.push(artifact);
    (report.storageExports??=[]).push(artifact);
    return {...artifact,state};
  };
}
