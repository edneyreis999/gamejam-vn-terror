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
  if(!descriptor.storageFixture)return undefined;
  const {path,sha256}=descriptor.storageFixture;
  const root=await realpath(fixture),file=await realpath(resolve(root,path));
  assert.ok(file.startsWith(root+sep),'Storage fixture must be inside the isolated fixture.');
  assert.ok(descriptor.files.some(entry=>entry.path===path&&entry.sha256===sha256),'Storage fixture must be an inventoried immutable input.');
  const bytes=await readFile(file);assert.equal(hash(bytes),sha256,'Storage fixture hash changed.');
  return validateLocalStorage(JSON.parse(bytes),origin);
}
export function storageCapture({context,identity,report,output,origin}) {
  return async id=>{
    assert.match(id,/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/);
    const before=await identity();
    const state=validateLocalStorage(await context.storageState({indexedDB:true}),origin);
    const after=await identity();assert.deepEqual(after,before,'Document changed during storage capture.');
    const path=`${id}.storage.json`,bytes=JSON.stringify(state,null,2)+'\n';
    await writeFile(resolve(output,path),bytes,{flag:'wx'});
    const artifact={id,path,sha256:hash(bytes),at:Date.now(),kind:'browser-storage',capture:{before,after}};
    report.checkpoints.push(artifact);
    return {...artifact,state};
  };
}
