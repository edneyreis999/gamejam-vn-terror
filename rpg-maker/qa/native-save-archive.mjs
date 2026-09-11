import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
export const archiveFiles={archive:'.qa-native-archive.json',storage:'.qa-native-storage.json'};
export function archiveRecord(storage,key) {
  return storage.origins.flatMap(origin=>origin.indexedDB??[]).flatMap(database=>database.stores).flatMap(store=>store.records).find(record=>record.key===key)?.value;
}
export async function captureNativeSave(context,id) {
  await context.wait(async()=>{
    if($gameTemp._drylandPersistence?.status!=='saved')return false;
    const [contents,index,test]=await Promise.all([StorageManager.loadObject('file0'),StorageManager.loadObject('global'),localforage.getItem('rmmzsave.test')]);
    return contents.system._dryland.campaign.sequence===$gameTemp._drylandPersistence.lastSuccessfulSequence&&!!index[0]&&JSON.stringify(index[0])===JSON.stringify(DataManager._globalInfo[0])&&test===null;
  });
  const native=await context.read(`${id}-native-save`,async()=>{
    const [contents,index,payload,indexPayload]=await Promise.all([StorageManager.loadObject('file0'),StorageManager.loadObject('global'),StorageManager.loadZip('file0'),StorageManager.loadZip('global')]);
    return {origin:location.origin,gameId:$dataSystem.advanced.gameId,layout:contents.system._dryland.nativeLayoutVersion,campaign:contents.system._dryland.campaign,index:index[0],keys:{payload:StorageManager.forageKey('file0'),index:StorageManager.forageKey('global')},payload,indexPayload};
  });
  const captured=await context.storage.capture(id);
  assert.equal(archiveRecord(captured.state,native.keys.payload),native.payload);
  assert.equal(archiveRecord(captured.state,native.keys.index),native.indexPayload);
  const archive={schemaVersion:1,origin:native.origin,gameId:native.gameId,layout:native.layout,campaign:native.campaign,index:native.index,keys:native.keys,payloadSha256:sha256(native.payload),indexSha256:sha256(native.indexPayload),storageState:captured.state,
    sourceFiles:context.descriptor.files.filter(entry=>!Object.values(archiveFiles).includes(entry.path)),
    producer:{scenario:context.report.scenario,run:context.output,startedAt:context.report.startedAt,environment:context.report.environment,storageArtifact:captured.path,storageSha256:captured.sha256,inputCount:context.report.inputs.length,omittedNavigation:context.descriptor.omittedNavigation??[],method:'native autosave after recorded public player inputs'}};
  const file=join(context.output,`${id}.archive.json`);
  await writeFile(file,JSON.stringify(archive,null,2)+'\n',{flag:'wx'});
  context.report.observations.push({label:id,kind:'native-save-archive',path:file,sha256:sha256(await readFile(file)),payloadSha256:archive.payloadSha256,indexSha256:archive.indexSha256});
  return archive;
}
export function validateNativeArchive(archive,files,origin,layout) {
  assert.equal(archive.schemaVersion,1);assert.equal(archive.origin,origin);assert.equal(archive.layout,layout,'Archived native revision is incompatible.');
  assert.deepEqual(archive.sourceFiles,files.filter(entry=>!Object.values(archiveFiles).includes(entry.path)),'Archived game sources changed.');
  assert.equal(sha256(archiveRecord(archive.storageState,archive.keys.payload)),archive.payloadSha256);
  assert.equal(sha256(archiveRecord(archive.storageState,archive.keys.index)),archive.indexSha256);
}
