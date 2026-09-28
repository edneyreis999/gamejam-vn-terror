import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {createAudioCapture as captureWebM} from './browser-audio.mjs';

export function createAudioCapture({page, getPage = () => page, root, sources, identity, register, usedIds = new Set(), report = {observations: [], checkpoints: []}}) {
  return captureWebM({getPage, root, identity, usedIds, register,
    scenario: {audioSources: sources}, report,
    digest: bytes => createHash('sha256').update(bytes).digest('hex')});
}

export function encodeWav(channels,sampleRate){
  if(!Number.isInteger(sampleRate)||sampleRate<=0)throw new Error('A positive PCM sample rate is required.');
  if(!channels.length||!channels.every(c=>c.length===channels[0].length))throw new Error('PCM channels must have the same length.');
  const frames=channels[0].length,bytes=Buffer.alloc(44+frames*channels.length*2);
  bytes.write('RIFF',0);bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(channels.length,22);bytes.writeUInt32LE(sampleRate,24);bytes.writeUInt32LE(sampleRate*channels.length*2,28);bytes.writeUInt16LE(channels.length*2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(bytes.length-44,40);
  for(let frame=0;frame<frames;frame++)for(let channel=0;channel<channels.length;channel++){
    if(!Number.isFinite(channels[channel][frame]))throw new Error('Non-finite PCM sample.');
    const value=Math.max(-1,Math.min(1,channels[channel][frame]));bytes.writeInt16LE(Math.round(value*(value<0?32768:32767)),44+(frame*channels.length+channel)*2);
  }
  return bytes;
}

export function captureProcessorSource(processor){
  return `class QACapture extends AudioWorkletProcessor {
          constructor(){super();this.chunks=[[],[]];this.stopped=false;this.ready=false;this.port.onmessage=()=>{this.stopped=true;const channels=this.chunks.map(chunks=>{const joined=new Float32Array(chunks.reduce((sum,chunk)=>sum+chunk.length,0));let offset=0;for(const chunk of chunks){joined.set(chunk,offset);offset+=chunk.length;}return joined;});this.chunks=null;this.port.postMessage({done:true,channels},channels.map(channel=>channel.buffer));};}
          process(inputs,outputs){if(this.stopped)return false;for(let c=0;c<2;c++){const samples=inputs[0][c]??new Float32Array(outputs[0][c].length);this.chunks[c].push(new Float32Array(samples));}if(!this.ready){this.ready=true;this.port.postMessage({ready:true});}return true;}
        } registerProcessor(${JSON.stringify(processor)},QACapture);`;
}

export function audioCapture({page,identity,report,output,sources,usedIds=new Set()}){
  let active=false,sequence=0;
  const stop=async()=>{
    if(!active)throw new Error('No audio capture is active.');
    await identity();
    const capture=await page.evaluate(async()=>{
      const state=globalThis.__qaAudioCapture;
      const chunks=await new Promise(resolve=>{state.node.port.onmessage=({data})=>{if(data.done)resolve(data.channels);};state.node.port.postMessage('stop');});
      state.source.disconnect(state.node);state.node.disconnect();state.silent.disconnect();state.node.port.close();URL.revokeObjectURL(state.url);delete globalThis.__qaAudioCapture;
      globalThis.__qaAudioStopped={channels:chunks};
      return{id:state.id,source:state.sourceId,sampleRate:state.context.sampleRate,channelCount:chunks.length,frames:chunks[0].length};
    });
    active=false;await identity();
    const path=capture.id+'.wav';
    let bytes,channels,transferError;
    try {
      bytes=Buffer.alloc(44+capture.frames*capture.channelCount*2);
      encodeWav(Array.from({length:capture.channelCount},()=>[]),capture.sampleRate).copy(bytes);
      bytes.writeUInt32LE(bytes.length-8,4);bytes.writeUInt32LE(bytes.length-44,40);
      channels=Array.from({length:capture.channelCount},()=>({samples:0,peak:0,energy:0}));
      for(let start=0;start<capture.frames;start+=262144){
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
      channels=channels.map(({samples,peak,energy})=>({samples,peak,rms:Math.sqrt(energy/samples)}));
    } catch(error) { transferError=error;throw error; }
    finally {
      try { await page.evaluate(()=>{delete globalThis.__qaAudioStopped;}); }
      catch(error) { if(transferError)throw new AggregateError([transferError,error],'PCM transfer and cleanup failed');throw error; }
    }
    await identity();await writeFile(join(output,path),bytes,{flag:'wx'});
    const record={id:capture.id,kind:'audio',type:'audio',path,sha256:createHash('sha256').update(bytes).digest('hex'),source:capture.source,capture:{sampleRate:capture.sampleRate,channels,duration:channels[0].samples/capture.sampleRate}};
    (report.audioRecordings??=[]).push(record);(report.checkpoints??=[]).push(record);return record;
  };
  return{
    async start(id,sourceId){
      if(active)throw new Error('Stop the current audio capture first.');
      if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(id)||usedIds.has(id))throw new Error('Invalid or reused audio capture ID.');
      const source=sources?.[sourceId];
      if(!source?.expectedRef||!/^[$A-Z_a-z][$\w]*(?:\.[$A-Z_a-z][$\w]*)*$/.test(source.path))throw new Error('Declare an audio source path and expected reference in the case.');
      await identity();
      await page.evaluate(async({id,sourceId,path,processor,code})=>{
        const source=path.split('.').reduce((value,key)=>value[key],globalThis),context=source.context;
        const url=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));
        try{await context.audioWorklet.addModule(url);}catch(error){URL.revokeObjectURL(url);throw error;}
        const node=new AudioWorkletNode(context,processor,{channelCount:2,channelCountMode:'explicit',outputChannelCount:[2]}),silent=context.createGain();silent.gain.value=0;
        let connected=false;
        try {
          const ready=new Promise((resolve,reject)=>{
            node.port.onmessage=({data})=>{if(data.ready)resolve();};
            node.onprocessorerror=()=>reject(new Error('Audio capture worklet failed before processing.'));
          });
          node.connect(silent);silent.connect(context.destination);source.connect(node);connected=true;
          await ready;
          node.port.onmessage=null;node.onprocessorerror=null;
          globalThis.__qaAudioCapture={id,sourceId,source,context,node,silent,url};
        } catch(error) {
          if(connected)source.disconnect(node);
          node.disconnect();silent.disconnect();node.port.close();URL.revokeObjectURL(url);
          throw error;
        }
      },{id,sourceId,path:source.path,processor:'qa-capture-'+(++sequence),code:captureProcessorSource('qa-capture-'+sequence)});
      active=true;usedIds.add(id);await identity();
    },stop,
    async close(){if(active)await stop();}
  };
}
