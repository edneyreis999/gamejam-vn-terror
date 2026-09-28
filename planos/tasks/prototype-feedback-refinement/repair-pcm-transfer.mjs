import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const root='.agents/skills/rpg-maker-mz-qa-execution/scripts/';
if(process.argv[2]==='binary'){
 const path=root+'audio-capture.mjs';let source=readFileSync(path,'utf8');
 const from=source.indexOf('      for(let start=0;start<capture.frames;start+=16384)'),to=source.indexOf('      channels=channels.map',from);assert.ok(from>0&&to>from);
 source=source.slice(0,from)+`      for(let start=0;start<capture.frames;start+=262144){
        const part=await page.evaluate(({start,end})=>{
          const channels=globalThis.__qaAudioStopped.channels;
          const pcm=new Uint8Array((end-start)*channels.length*2),view=new DataView(pcm.buffer);
          const metrics=channels.map(()=>({samples:0,peak:0,energy:0}));
          for(let frame=start;frame<end;frame++)for(let channel=0;channel<channels.length;channel++){
            const value=channels[channel][frame];if(!Number.isFinite(value))throw Error('Non-finite PCM sample.');
            const clipped=Math.max(-1,Math.min(1,value));view.setInt16(((frame-start)*channels.length+channel)*2,Math.round(clipped*(clipped<0?32768:32767)),true);
            const metric=metrics[channel];metric.samples++;metric.peak=Math.max(metric.peak,Math.abs(value));metric.energy+=value*value;
          }
          let binary='';for(let offset=0;offset<pcm.length;offset+=32768)binary+=String.fromCharCode(...pcm.subarray(offset,offset+32768));
          return {pcm:btoa(binary),metrics};
        },{start,end:Math.min(start+262144,capture.frames)});
        Buffer.from(part.pcm,'base64').copy(bytes,44+start*capture.channelCount*2);
        for(let channel=0;channel<channels.length;channel++){const total=channels[channel],metric=part.metrics[channel];total.samples+=metric.samples;total.peak=Math.max(total.peak,metric.peak);total.energy+=metric.energy;}
      }
`+source.slice(to);writeFileSync(path,source);
 const test=root+'tests/audio-capture.test.mjs';source=readFileSync(test,'utf8');
 source=source.replace('const frameCount=50001,channels=[new Float32Array(frameCount).fill(.25),new Float32Array(frameCount).fill(-.5)];',"const frameCount=600001,channels=[Float32Array.from({length:frameCount},(_,i)=>Math.sin(i/17)*1.2),Float32Array.from({length:frameCount},(_,i)=>Math.cos(i/31)*.5)];");
 source=source.replace('createContext({master,Blob,URL,AudioWorkletNode:', 'createContext({master,Blob,URL,btoa,AudioWorkletNode:');
 source=source.replaceAll('size>262144','size>1500000').replaceAll('maxPayload<=262144','maxPayload<=1500000');
 source=source.replace("for(const frame of [0,16383,16384,32768,frameCount-1]){assert.equal(bytes.readInt16LE(44+frame*4),8192);assert.equal(bytes.readInt16LE(46+frame*4),-16384);}","assert.deepEqual(bytes,encodeWav(channels,48000),'Every nonconstant sample, channel and chunk boundary survives the binary transfer');");
 source=source.replace("assert.equal(record.capture.channels[0].rms,.25);assert.equal(record.capture.channels[1].rms,.5);","for(let c=0;c<2;c++){const energy=channels[c].reduce((sum,value)=>sum+value*value,0);assert.ok(Math.abs(record.capture.channels[c].rms-Math.sqrt(energy/frameCount))<1e-12);}");
 writeFileSync(test,source);
}else if(process.argv[2]==='test'){
 const path=root+'tests/audio-capture.test.mjs';let source=readFileSync(path,'utf8');
 assert.ok(!source.includes('long PCM transfer stays below'));
 source=source.replace("import {runInNewContext} from 'node:vm';","import {runInNewContext,createContext,runInContext} from 'node:vm';");
 source+=`
test('long PCM transfer stays below the transport message bound without losing samples',async t=>{
 const root=await mkdtemp(join(tmpdir(),'qa-pcm-transfer-'));t.after(()=>rm(root,{recursive:true,force:true}));
 const frameCount=50001,channels=[new Float32Array(frameCount).fill(.25),new Float32Array(frameCount).fill(-.5)];
 let node,connected=false,maxPayload=0;
 const context={sampleRate:48000,destination:{},audioWorklet:{addModule:async()=>{}},createGain:()=>({gain:{},connect(){},disconnect(){}})};
 const master={context,connect(value){node=value;connected=true;},disconnect(value){assert.equal(value,node);connected=false;}};
 const sandbox=createContext({master,Blob,URL,AudioWorkletNode:class{
  constructor(){this.port={postMessage:()=>this.port.onmessage({data:{done:true,channels}}),close(){}};}
  connect(){setImmediate(()=>this.port.onmessage({data:{ready:true}}));}disconnect(){}
 }});
 const page={evaluate:async(fn,arg)=>{sandbox.arg=arg;const result=await runInContext('('+fn.toString()+')(arg)',sandbox);const size=JSON.stringify(result??null).length;maxPayload=Math.max(maxPayload,size);if(size>262144)throw Error('Transport message exceeds bounded payload');return result;}};
 const report={};const capture=audioCapture({page,identity:async()=>{},report,output:root,sources:{master:{path:'master',expectedRef:'bounded PCM transport'}}});
 await capture.start('long','master');const record=await capture.stop();
 const bytes=await readFile(join(root,record.path));assert.equal(bytes.length,44+frameCount*4);
 assert.equal(bytes.readUInt32LE(40),frameCount*4);
 for(const frame of [0,16383,16384,32768,frameCount-1]){assert.equal(bytes.readInt16LE(44+frame*4),8192);assert.equal(bytes.readInt16LE(46+frame*4),-16384);}
 assert.deepEqual(record.capture.channels.map(c=>c.samples),[frameCount,frameCount]);assert.equal(record.capture.channels[0].rms,.25);assert.equal(record.capture.channels[1].rms,.5);
 assert.ok(maxPayload<=262144);assert.equal(connected,false);assert.equal(sandbox.__qaAudioCapture,undefined);assert.equal(sandbox.__qaAudioStopped,undefined);assert.equal(report.audioRecordings.length,1);
});
`;
 writeFileSync(path,source);
}else if(process.argv[2]==='runtime'){
 const path=root+'audio-capture.mjs';let source=readFileSync(path,'utf8');
 assert.ok(source.includes('channels:this.chunks.map(chunks=>chunks.flat())'));
 source=source.replace('this.port.postMessage({done:true,channels:this.chunks.map(chunks=>chunks.flat())});',"const channels=this.chunks.map(chunks=>{const joined=new Float32Array(chunks.reduce((sum,chunk)=>sum+chunk.length,0));let offset=0;for(const chunk of chunks){joined.set(chunk,offset);offset+=chunk.length;}return joined;});this.chunks=null;this.port.postMessage({done:true,channels},channels.map(channel=>channel.buffer));");
 source=source.replace('this.chunks[c].push(Array.from(samples));','this.chunks[c].push(new Float32Array(samples));');
 source=source.replace('return{id:state.id,source:state.sourceId,sampleRate:state.context.sampleRate,channels:chunks};',"globalThis.__qaAudioStopped={channels:chunks};\n      return{id:state.id,source:state.sourceId,sampleRate:state.context.sampleRate,channelCount:chunks.length,frames:chunks[0].length};");
 const from=source.indexOf('    const bytes=encodeWav(capture.channels'),to=source.indexOf('    const record=',from);assert.ok(from>0&&to>from);
 source=source.slice(0,from)+`    const path=capture.id+'.wav';
    let bytes,channels,transferError;
    try {
      bytes=Buffer.alloc(44+capture.frames*capture.channelCount*2);
      encodeWav(Array.from({length:capture.channelCount},()=>[]),capture.sampleRate).copy(bytes);
      bytes.writeUInt32LE(bytes.length-8,4);bytes.writeUInt32LE(bytes.length-44,40);
      channels=Array.from({length:capture.channelCount},()=>({samples:0,peak:0,energy:0}));
      for(let start=0;start<capture.frames;start+=16384){
        const part=await page.evaluate(({start,end})=>globalThis.__qaAudioStopped.channels.map(channel=>Array.from(channel.slice(start,end))),{start,end:Math.min(start+16384,capture.frames)});
        encodeWav(part,capture.sampleRate).copy(bytes,44+start*capture.channelCount*2,44);
        for(let channel=0;channel<part.length;channel++)for(const value of part[channel]){const metric=channels[channel];metric.samples++;metric.peak=Math.max(metric.peak,Math.abs(value));metric.energy+=value*value;}
      }
      channels=channels.map(({samples,peak,energy})=>({samples,peak,rms:Math.sqrt(energy/samples)}));
    } catch(error) { transferError=error;throw error; }
    finally {
      try { await page.evaluate(()=>{delete globalThis.__qaAudioStopped;}); }
      catch(error) { if(transferError)throw new AggregateError([transferError,error],'PCM transfer and cleanup failed');throw error; }
    }
    await identity();await writeFile(join(output,path),bytes,{flag:'wx'});
`+source.slice(to);
 writeFileSync(path,source);
 const test=root+'tests/audio-capture.test.mjs';source=readFileSync(test,'utf8').replace('const channels=JSON.parse(JSON.stringify(recording.channels));','const channels=Array.from(recording.channels,channel=>Array.from(channel));');writeFileSync(test,source);
}else throw Error('Select test or runtime explicitly.');
