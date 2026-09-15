import {writeFile} from 'node:fs/promises';
import {join} from 'node:path';

export function createAudioCapture({getPage, identity, report, root, digest, scenario, usedIds = new Set(), register = artifact => report.checkpoints.push(artifact)}) {
  let active;
  const start = async (id, sourceId) => {
    if (active) throw new Error('An audio capture is already active.');
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(id) || usedIds.has(id)) throw new Error('Invalid or reused audio capture ID.');
    const source = scenario.audioSources?.[sourceId];
    if (!source?.expectedRef || !/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/.test(source.path)) throw new Error('Audio source must be declared with a contract reference.');
    await identity();
    const metadata = await getPage().evaluate(path => {
      const node = path.split('.').reduce((value, key) => value[key], globalThis);
      if (!(node instanceof AudioNode) || node.context.state !== 'running') throw new Error('Audio source unavailable or suspended; unlock through a public gesture first.');
      if (globalThis.__qaAudioCapture) throw new Error('Audio capture already active.');
      const mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) throw new Error('Opus recording is unavailable.');
      const destination = node.context.createMediaStreamDestination();
      let connected = false;
      try {
        const recorder = new MediaRecorder(destination.stream, {mimeType});
        const chunks = [];
        recorder.addEventListener('dataavailable', event => {if (event.data.size) chunks.push(event.data);});
        node.connect(destination);
        connected = true;
        recorder.start();
        globalThis.__qaAudioCapture = {node, destination, recorder, chunks};
      } catch (error) {
        if (connected) node.disconnect(destination);
        for (const track of destination.stream.getTracks()) track.stop();
        throw error;
      }
      return {mimeType, sampleRate: node.context.sampleRate, contextTime: node.context.currentTime, contextState: node.context.state};
    }, source.path);
    active = {id, sourceId, source, metadata, at: Date.now()};
    usedIds.add(id);
    report.observations.push({label: id, kind: 'audio-tap-start', ...active});
    await identity();
  };
  const stop = async ({partial = false} = {}) => {
    if (!active) throw new Error('No active audio capture.');
    await identity();
    try {
      const recording = await getPage().evaluate(async () => {
        const capture = globalThis.__qaAudioCapture;
        const {node, destination, recorder, chunks} = capture;
        try {
          await new Promise((resolve, reject) => {
            recorder.addEventListener('stop', resolve, {once: true});
            recorder.addEventListener('error', event => reject(event.error), {once: true});
            recorder.stop();
          });
          const blob = new Blob(chunks, {type: recorder.mimeType});
          const bytes = await blob.arrayBuffer();
          const decoded = await node.context.decodeAudioData(bytes.slice(0));
          const channels = Array.from({length: decoded.numberOfChannels}, (_, channel) => {
            const samples = decoded.getChannelData(channel);
            let energy = 0, peak = 0;
            for (const sample of samples) {energy += sample * sample; peak = Math.max(peak, Math.abs(sample));}
            return {rms: Math.sqrt(energy / samples.length), peak};
          });
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(reader.error); reader.readAsDataURL(blob);
          });
          return {data: dataUrl.slice(dataUrl.indexOf(',') + 1), duration: decoded.duration, sampleRate: decoded.sampleRate, channels};
        } finally {
          try { node.disconnect(destination); }
          finally {
            for (const track of destination.stream.getTracks()) track.stop();
            delete globalThis.__qaAudioCapture;
          }
        }
      });
      const {data, ...analysis} = recording;
      const bytes = Buffer.from(data, 'base64');
      const path = active.id + '.webm';
      await writeFile(join(root, path), bytes, {flag: 'wx'});
      const artifact = {id: active.id, path, type: 'audio', kind: 'audio', partial, source: active.source, sourceId: active.sourceId, sha256: digest(bytes), at: Date.now(), capture: {...active, ...analysis}, limits: ['Rendered WebAudio graph recording; physical speaker output and human comfort require separate review.']};
      register(artifact);
      (report.audioRecordings ??= []).push(artifact);
      await identity();
      return artifact;
    } finally {
      active = undefined;
    }
  };
  const cleanup = async () => {if (active) await stop({partial: true});};
  return {start, stop, cleanup, close: cleanup};
}
