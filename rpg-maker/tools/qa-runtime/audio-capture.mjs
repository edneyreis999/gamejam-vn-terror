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
          constructor(){super();this.chunks=[[],[]];this.stopped=false;this.ready=false;this.port.onmessage=()=>{this.stopped=true;this.port.postMessage({done:true,channels:this.chunks.map(chunks=>chunks.flat())});};}
          process(inputs,outputs){if(this.stopped)return false;for(let c=0;c<2;c++){const samples=inputs[0][c]??new Float32Array(outputs[0][c].length);this.chunks[c].push(Array.from(samples));}if(!this.ready){this.ready=true;this.port.postMessage({ready:true});}return true;}
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
      return{id:state.id,source:state.sourceId,sampleRate:state.context.sampleRate,channels:chunks};
    });
    active=false;await identity();
    const bytes=encodeWav(capture.channels,capture.sampleRate),path=capture.id+'.wav';
    await writeFile(join(output,path),bytes,{flag:'wx'});
    const channels=capture.channels.map(samples=>{let peak=0,sum=0;for(const value of samples){peak=Math.max(peak,Math.abs(value));sum+=value*value;}return{samples:samples.length,peak,rms:Math.sqrt(sum/samples.length)};});
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
