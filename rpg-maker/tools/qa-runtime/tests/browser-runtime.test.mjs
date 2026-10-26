import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, readFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createServer} from 'node:http';
import {run} from '../browser-runtime.mjs';

const expectedRef = 'Merged runner preserves declared storage, audio formats, video and owned cleanup.';
const html = `<!doctype html><html><body><p>Runner fixture</p><script>
addEventListener('keydown', async event => {
  if (event.code !== 'Space') return;
  localStorage.setItem('saved', String(Number(localStorage.getItem('saved')) + 1));
  if (!globalThis.master) {
    const context = new AudioContext();
    globalThis.master = context.createGain(); master.gain.value = .1;
    const tone = context.createOscillator(); tone.connect(master); master.connect(context.destination); tone.start();
    await context.resume();
  }
});
</script></body></html>`;

for (const format of ['webm', 'wav']) test(`merged browser runner retains ${format} storage and media contracts`, async t => {
  const root = await mkdtemp(join(tmpdir(), 'qa-runner-merge-'));
  t.after(() => rm(root, {recursive:true,force:true}));
  const project=join(root,'project'), fixture=join(root,'fixture'), output=join(root,'run');
  await mkdir(project); await mkdir(fixture); await writeFile(join(fixture,'index.html'),html);
  const sourceOrigin='http://127.0.0.1:12345';
  const seed=Buffer.from(JSON.stringify({cookies:[],origins:[{origin:sourceOrigin,localStorage:[{name:'saved',value:'7'}]}]}));
  await writeFile(join(fixture,'seed.json'),seed);
  const storage={path:'seed.json',sha256:createHash('sha256').update(seed).digest('hex'),sourceOrigin,expectedRef};
  const adapter={
    describe:async()=>({files:[{path:'index.html'},{path:'seed.json'}],mutablePaths:[],[format==='webm'?'storageImport':'storageSeed']:storage}),
    start:async()=>{
      const server=createServer((_req,res)=>{res.setHeader('Content-Type','text/html');res.end(html);});
      await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
      return {url:`http://127.0.0.1:${server.address().port}`,close:()=>new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()))};
    }
  };
  const caseModule={
    scenario:{id:'runner-merge',criteria:[{id:'runner',variant:format,expectedRef}],audioFormat:format,audioSources:{master:{path:'master',expectedRef}},storage:{expectedRef},faultIds:['network'],browser:{width:640,height:480,dpr:1,locale:'en-US',launchArgs:['--force-device-scale-factor=1'],timeoutMs:10000,...(format==='webm'?{recordVideo:true}:{video:true})}},
    faults:{network:{type:'boundary',expectedRef,apply:()=>{globalThis.savedFetch=fetch;globalThis.fetch=()=>Promise.reject(new Error('assigned failure'));},restore:()=>{globalThis.fetch=globalThis.savedFetch;delete globalThis.savedFetch;}}},
    execute:async context=>{
      assert.equal(await context.read('seed',()=>localStorage.getItem('saved')),'7');
      await context.input.key('Space'); await context.wait(()=>!!globalThis.master);
      await context.audio.start('tone','master');
      await context.read('rendered-audio',()=>new Promise(resolve=>{
        const start=master.context.currentTime;
        const check=()=>master.context.currentTime-start>.3?resolve(true):requestAnimationFrame(check);
        requestAnimationFrame(check);
      }));
      const recording=await context.audio.stop();
      assert.ok(recording.capture.channels.every(channel=>channel.peak>.05));
      assert.ok(recording.path.endsWith('.'+format));
      await context.storage.capture('saved');
      await context.fault('network');
      assert.equal(await context.read('external-fault',()=>fetch('/').then(()=>false,error=>error.message==='assigned failure')),true);
      await context.fault('network',false);
      if(format==='webm') {
        await context.reopen();
        await assert.rejects(context.audio.start('tone','master'),/reused audio capture ID/);
      } else await context.reload();
      assert.equal(await context.read('restored',()=>localStorage.getItem('saved')),'8');
      await context.shot('restored');
    },
    verify:async({artifacts})=>({criteria:[{id:'runner',variant:format,expectedRef,status:'pass',evidence:artifacts.filter(a=>a.path.endsWith('.png')).map(a=>a.path),limits:[]}],pendingReviews:[]})
  };
  const report=await run({project,fixture,output,adapter,caseModule});
  assert.deepEqual(report.errors,[],JSON.stringify(report.errors));
  assert.equal(report.status,'pass');
  assert.ok(report.cleanup.every(entry=>entry.status==='closed'));
  assert.equal(report.storageExports.length,1);
  assert.deepEqual(report.boundaryFaults.map(entry=>entry.enabled),[true,false]);
  if(format==='webm')assert.equal(report.videos.length,2);
  else {
    assert.equal(report.audioRecordings.length,1);
    const wav=await readFile(join(output,report.audioRecordings[0].path));
    assert.equal(wav.toString('ascii',0,4),'RIFF');
    assert.ok((await readFile(join(output,report.video.path))).length>4);
  }
});
