import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
import { captureNativeSave } from '../../../rpg-maker/qa/native-save-archive.mjs';

const variant=process.env.DRYLAND_QA_BOUNDARY;
assert.ok(variant,'Select the earned checkpoint boundary.');
const ref='planos/tasks/approved-narrative-dialogue-staging/verification.md#runtime-scenarios';
const archive=JSON.parse(await readFile(process.env.DRYLAND_QA_SAVE_ARCHIVE,'utf8'));
export const sourceFiles=[new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/qa/native-save-archive.mjs',import.meta.url)];
let originalNextResult;
if(variant==='result'){
 const producer=pathToFileURL(archive.producer.run+'/report.json');
 sourceFiles.push(producer);
 const report=JSON.parse(await readFile(producer,'utf8'));
 originalNextResult=report.observations.map(row=>row.value?.campaign).find(state=>state?.sequence===archive.campaign.sequence+2&&state.phase==='encounter_intro');
 assert.ok(originalNextResult,'The uninterrupted parent campaign must have observed the next encounter.');
}
export const scenario={id:'staging-continue-'+variant,criteria:[{id:'earned-continue',variant,expectedRef:ref}],requires:['native-mz','public-input'],storage:{expectedRef:ref},browser:{width:1280,height:720,dpr:1,launchArgs:['--force-device-scale-factor=1'],locale:'pt-BR',timeoutMs:30000}};

export async function execute(context){
 const player=new DirectedNativePlayer(context),file=archive.fileId,rows=[];
 await player.ready();
 for(const selected of variant==='two-files'?[1,2]:[file]){
  const expected=await context.read('saved-campaign-'+selected,id=>StorageManager.loadObject('file'+id).then(c=>c.system._dryland.campaign),selected);
  const bytes=await context.read('saved-bytes-'+selected,id=>StorageManager.loadZip('file'+id),selected);
  if(selected===file)assert.deepEqual(expected,archive.campaign);
  await player.choose('Continuar');await player.file(selected);await player.ready();
  assert.deepEqual((await player.snapshot('continued-'+selected)).campaign,expected);
  assert.equal(await context.read('unchanged-bytes-'+selected,id=>StorageManager.loadZip('file'+id),selected),bytes);
  await context.shot('continued-'+selected);
  const before=await player.surface();assert.ok(before.paused);
  await context.input.key('Enter');await player.ready();
  const after=(await player.snapshot('next-input-'+selected)).campaign;
  assert.deepEqual(after.partyIds,expected.partyIds);assert.deepEqual(after.deadHeroIds,expected.deadHeroIds);
  assert.deepEqual(after.mapPieceIds,expected.mapPieceIds);assert.equal(after.medallionComplete,expected.medallionComplete);assert.equal(after.endingId,expected.endingId);
  const newActions=after.history.slice(expected.history.length);
  if(variant==='result'){
   assert.deepEqual(newActions,[
    {sequence:expected.sequence+1,type:'COMPLETE_PASSAGE',passageId:expected.reading.passageIds[expected.reading.index]},
    {sequence:expected.sequence+2,type:'ENTER_DUNGEON',encounterId:originalNextResult.assignments[expected.dungeonId][expected.position]}
   ],'The completed one-box result enters the same next encounter as the uninterrupted parent.');
   assert.equal(after.phase,'encounter_intro');
   assert.equal(after.position,expected.position+1);
   assert.equal(after.progress[expected.dungeonId],expected.position);
   assert.deepEqual(after,originalNextResult,'Continue must reproduce the original next draw, reading and progression.');
  }else{
   assert.ok(newActions.every(action=>action.type==='COMPLETE_PASSAGE'),'A reading acknowledgement cannot repeat a reward, approach, death or choice.');
   assert.ok(after.sequence===expected.sequence||after.sequence===expected.sequence+1);
  }
  assert.notEqual((await player.surface()).text,before.text,'The next legitimate input must advance the saved reading.');
  await context.shot('next-input-'+selected);
  const captured=await captureNativeSave(context,'retained-'+selected);
  if(variant==='result')assert.deepEqual(captured.campaign,after);
  else if(selected===file)assert.equal(captured.payloadSha256,archive.payloadSha256);
  rows.push({file:selected,before:expected,after,payloadSha256:captured.payloadSha256,indexSha256:captured.indexSha256});
  await context.reopenContext();await player.ready();
 }
 context.report.observations.push({label:'earned-continue-result',kind:'earned-continue-result',value:{variant,rows,parentPayloadSha256:archive.payloadSha256}});
}

export async function verify({expected,artifacts,report}){
 const result=report.observations.find(row=>row.kind==='earned-continue-result');
 return{criteria:expected.map(row=>({...row,status:result?'pass':'fail',observed:result?.value,evidence:artifacts.map(a=>a.path),limits:['Earned native payload imported unchanged before boot; all campaign transitions use public input. No visual/audio judgment inferred.']})),pendingReviews:[]};
}
