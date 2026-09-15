import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {chromium} from 'playwright';
import {createAudioCapture,audioCapture,encodeWav,captureProcessorSource} from '../audio-capture.mjs';
import {runInNewContext} from 'node:vm';

test('graph capture records tone and silence, preserves the source and retains partial capture on close',async t=>{
  const root=await mkdtemp(join(tmpdir(),'qa-audio-'));t.after(()=>rm(root,{recursive:true,force:true}));
  const browser=await chromium.launch({channel:'chrome',headless:true});t.after(()=>browser.close());
  const page=await browser.newPage();await page.goto('about:blank');
  await page.evaluate(async()=>{
    globalThis.audioContext=new AudioContext();globalThis.master=audioContext.createGain();master.gain.value=.1;
    globalThis.tone=audioContext.createOscillator();tone.frequency.value=440;tone.connect(master);globalThis.meter=audioContext.createAnalyser();master.connect(meter);meter.connect(audioContext.destination);tone.start();await audioContext.resume();
  });
  const originalGain=await page.evaluate(()=>master.gain.value);
  const recordDuration=async()=>{const start=await page.evaluate(()=>audioContext.currentTime);await page.waitForFunction(start=>audioContext.currentTime-start>=.35,start);};
  const artifacts=[],usedIds=new Set();
  const audio=createAudioCapture({page,root,usedIds,sources:{master:{path:'master',expectedRef:'440Hz fixture oscillator'}},identity:async()=>assert.equal(page.isClosed(),false),register:artifact=>artifacts.push(artifact)});
  t.after(()=>audio.close());
  await audio.start('tone','master');await recordDuration();const tone=await audio.stop();
  assert.ok(Math.max(...tone.capture.channels.map(c=>c.peak))>.05);assert.ok(tone.capture.duration>.25);
  assert.ok((await readFile(join(root,tone.path))).length>100);assert.equal(tone.partial,false);
  await page.evaluate(()=>{master.gain.value=0;});
  await audio.start('silence','master');await recordDuration();const silence=await audio.stop();
  assert.ok(Math.max(...silence.capture.channels.map(c=>c.peak))<.00001);
  assert.equal(await page.evaluate(()=>master.gain.value),0);
  assert.ok(await page.evaluate(()=>{const samples=new Float32Array(meter.fftSize);meter.getFloatTimeDomainData(samples);return Math.max(...samples.map(Math.abs))<.00001;}));
  await page.evaluate(()=>{master.gain.value=.1;});
  await audio.start('interrupted','master');await recordDuration();await audio.close();
  assert.equal(artifacts.length,3);assert.equal(artifacts[2].partial,true);assert.ok(artifacts[2].capture.channels[0].peak>.05);
  assert.equal(await page.evaluate(()=>globalThis.__qaAudioCapture===undefined),true);
  assert.equal(await page.evaluate(()=>master.gain.value),originalGain);
  await page.waitForFunction(()=>{const samples=new Float32Array(meter.fftSize);meter.getFloatTimeDomainData(samples);return Math.max(...samples.map(Math.abs))>.05;});
  const nextCapture=createAudioCapture({page,root,usedIds,sources:{master:{path:'master',expectedRef:'440Hz fixture oscillator'}},identity:async()=>{},register:artifact=>artifacts.push(artifact)});
  await assert.rejects(nextCapture.start('tone','master'),/reused audio capture ID/);
  assert.equal(await page.evaluate(()=>globalThis.__qaAudioCapture===undefined),true);
  await page.evaluate(async()=>{tone.stop();await audioContext.close();});
});

test('captured stereo PCM remains interleaved and clipped in a playable WAV',()=>{
 const wav=encodeWav([[0,-1,2],[0.5,1,-2]],48000);
 assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,16),'WAVEfmt ');
 assert.equal(wav.readUInt32LE(4),wav.length-8);assert.equal(wav.readUInt16LE(22),2);assert.equal(wav.readUInt32LE(24),48000);assert.equal(wav.readUInt32LE(40),12);
 assert.deepEqual(Array.from({length:6},(_,i)=>wav.readInt16LE(44+2*i)),[0,16384,-32768,32767,32767,-32768]);
});
test('invalid captured samples cannot become a silent or truncated recording',()=>{
 assert.throws(()=>encodeWav([[0],[0,1]],48000),/same length/);
 assert.throws(()=>encodeWav([[NaN]],48000),/Non-finite/);
 assert.throws(()=>encodeWav([[0]],0),/positive/);
});

test('the worklet preserves inactive quanta and variable render lengths in both channels',()=>{
 let Processor,recording;const messages=[];
 runInNewContext(captureProcessorSource('test-capture'),{
  AudioWorkletProcessor:class{constructor(){this.port={postMessage:value=>{recording=value;messages.push(value);}};}},
  registerProcessor:(_name,implementation)=>{Processor=implementation;}
 });
 const processor=new Processor();
 assert.equal(messages.length,0);
 const output=length=>[[new Float32Array(length),new Float32Array(length)]];
 processor.process([[new Float32Array(128).fill(.25),new Float32Array(128).fill(-.5)]],output(128));
 assert.equal(messages.length,1);assert.equal(messages[0].ready,true);
 processor.process([[]],output(128));
 processor.process([[new Float32Array(64).fill(.75),new Float32Array(64).fill(-.25)]],output(64));
 assert.equal(messages.length,1,'Readiness is emitted once after actual processing');
 processor.port.onmessage({data:'stop'});
 const channels=JSON.parse(JSON.stringify(recording.channels));
 assert.deepEqual(channels.map(c=>c.length),[320,320]);
 assert.deepEqual(channels[0],[...Array(128).fill(.25),...Array(128).fill(0),...Array(64).fill(.75)]);
 assert.deepEqual(channels[1],[...Array(128).fill(-.5),...Array(128).fill(0),...Array(64).fill(-.25)]);
 assert.equal(processor.process([[]],output(128)),false);
});


test('PCM start resolves only after its worklet processes a block',async()=>{
 let node,finishEvaluation;
 const connected=[];
 const source={context:{audioWorklet:{addModule:async()=>{}},createGain:()=>({gain:{},connect:()=>{},disconnect:()=>{}})},connect:value=>connected.push(value)};
 const sandbox={master:source,Blob,URL,AudioWorkletNode:class{constructor(){node=this;this.port={};}connect(){}}};
 const page={evaluate:async(fn,arg)=>{const pending=runInNewContext('('+fn.toString()+')(arg)',{...sandbox,arg});finishEvaluation=()=>node.port.onmessage({data:{ready:true}});return pending;}};
 const capture=audioCapture({page,identity:async()=>{},report:{},output:'unused',sources:{master:{path:'master',expectedRef:'controlled graph'}}});
 let finished=false;const pending=capture.start('first-block','master').then(()=>{finished=true;});
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(connected.length,1);assert.equal(finished,false,'A connected node alone is not capture readiness');
 finishEvaluation();await pending;assert.equal(finished,true);
});
