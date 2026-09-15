import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
export const archiveFiles={archive:'.qa-native-archive.json',storage:'.qa-native-storage.json'};
export function archiveRecord(storage,key) {
  return storage.origins.flatMap(origin=>origin.indexedDB??[]).flatMap(database=>database.stores).flatMap(store=>store.records).find(record=>record.key===key)?.value;
}
export async function captureNativeSave(context,id) {
  await context.wait(async()=>{
    if($gameTemp._drylandPersistence?.status!=='saved')return false;
    const [contents,index,test]=await Promise.all([StorageManager.loadObject('file'+$gameSystem.savefileId()),StorageManager.loadObject('global'),localforage.getItem('rmmzsave.test')]);
    return contents.system._dryland.campaign.sequence===$gameTemp._drylandPersistence.lastSuccessfulSequence&&!!index[$gameSystem.savefileId()]&&JSON.stringify(index[$gameSystem.savefileId()])===JSON.stringify(DataManager._globalInfo[$gameSystem.savefileId()])&&test===null;
  });
  const native=await context.read(`${id}-native-save`,async()=>{
    const [contents,index,payload,indexPayload]=await Promise.all([StorageManager.loadObject('file'+$gameSystem.savefileId()),StorageManager.loadObject('global'),StorageManager.loadZip('file'+$gameSystem.savefileId()),StorageManager.loadZip('global')]);
    const interpreters=[];
    for(let current=contents.map._interpreter;current;current=current._childInterpreter)interpreters.push({eventId:current._eventId,commonEventId:current._drylandCommonEventId,index:current._index,waitMode:current._waitMode});
    const nativeState={mapId:contents.map._mapId,readUnits:contents.system._drylandReadUnits,
      presentedDeaths:Array.from({length:8},(_,index)=>({heroId:'H'+(index+1),presented:Boolean(contents.switches._data[38+index])})),interpreters};
    return {origin:location.origin,gameId:$dataSystem.advanced.gameId,fileId:$gameSystem.savefileId(),campaign:contents.system._dryland.campaign,nativeState,index:index[$gameSystem.savefileId()],keys:{payload:StorageManager.forageKey('file'+$gameSystem.savefileId()),index:StorageManager.forageKey('global')},payload,indexPayload};
  });
  const captured=await context.storage.capture(id);
  assert.equal(archiveRecord(captured.state,native.keys.payload),native.payload);
  assert.equal(archiveRecord(captured.state,native.keys.index),native.indexPayload);
  const archive={schemaVersion:2,origin:native.origin,gameId:native.gameId,fileId:native.fileId,campaign:native.campaign,nativeState:native.nativeState,index:native.index,keys:native.keys,payloadSha256:sha256(native.payload),indexSha256:sha256(native.indexPayload),storageState:captured.state,
    sourceFiles:context.descriptor.files.filter(entry=>!Object.values(archiveFiles).includes(entry.path)),
    producer:{scenario:context.report.scenario,run:context.output,startedAt:context.report.startedAt,environment:context.report.environment,storageArtifact:captured.path,storageSha256:captured.sha256,inputCount:context.report.inputs.length,omittedNavigation:context.descriptor.omittedNavigation??[],method:'native autosave after recorded public player inputs'}};
  archive.identitySha256=sha256(JSON.stringify({fileId:archive.fileId,gameId:archive.gameId,campaign:archive.campaign,index:archive.index,keys:archive.keys}));
  const file=join(context.output,`${id}.archive.json`);
  await writeFile(file,JSON.stringify(archive,null,2)+'\n',{flag:'wx'});
  context.report.observations.push({label:id,kind:'native-save-archive',path:file,sha256:sha256(await readFile(file)),payloadSha256:archive.payloadSha256,indexSha256:archive.indexSha256});
  return archive;
}
export function validateNativeArchive(archive,files,origin) {
  assert.equal(archive.schemaVersion,2);assert.equal(archive.origin,origin);
  assert.ok(Number.isInteger(archive.fileId)&&archive.fileId>0&&archive.fileId<=20,'Invalid archived selected file.');
  assert.equal(archive.keys.payload,`rmmzsave.${archive.gameId}.file${archive.fileId}`);
  assert.equal(archive.keys.index,`rmmzsave.${archive.gameId}.global`);
  assert.equal(archive.identitySha256,sha256(JSON.stringify({fileId:archive.fileId,gameId:archive.gameId,campaign:archive.campaign,index:archive.index,keys:archive.keys})));
  assert.deepEqual(archive.sourceFiles,files.filter(entry=>!Object.values(archiveFiles).includes(entry.path)),'Archived game sources changed.');
  assert.equal(sha256(archiveRecord(archive.storageState,archive.keys.payload)),archive.payloadSha256);
  assert.equal(sha256(archiveRecord(archive.storageState,archive.keys.index)),archive.indexSha256);
  // MZ stores a zlib stream as a binary string. JsonEx adds constructor tags,
  // but these facts need only plain data, not live engine class instances.
  const decode=key=>JSON.parse(inflateSync(Buffer.from(archiveRecord(archive.storageState,key),'latin1')).toString('utf8'));
  const contents=decode(archive.keys.payload),index=decode(archive.keys.index);
  assert.equal(contents.system._savefileId,archive.fileId,'Archived file differs from native payload.');
  assert.deepEqual(archive.campaign,contents.system._dryland.campaign,'Archived campaign differs from native payload.');
  assert.deepEqual(archive.index,index[archive.fileId],'Archived index differs from native index payload.');
  const interpreters=[];
  for(let current=contents.map._interpreter;current;current=current._childInterpreter)interpreters.push({eventId:current._eventId,commonEventId:current._drylandCommonEventId,index:current._index,waitMode:current._waitMode});
  const nativeState={mapId:contents.map._mapId,readUnits:contents.system._drylandReadUnits,
    presentedDeaths:Array.from({length:8},(_,index)=>({heroId:'H'+(index+1),presented:Boolean(contents.switches._data[38+index])})),interpreters};
  assert.deepEqual(archive.nativeState,JSON.parse(JSON.stringify(nativeState)),'Archived native state differs from native payload.');
}
