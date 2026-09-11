// Suite: QA audio capture lifecycle.
// Invariant: capture errors release resources and allow a fresh recording.
// Boundary IN: real controller, Chrome WebAudio/MediaRecorder, filesystem.
// Boundary OUT: game behavior, physical speakers and artistic judgment.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdir, mkdtemp, readFile, rm, writeFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';
import {createAudioCapture} from './browser-audio.mjs';
import {run} from './browser-runtime.mjs';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const scenario = {audioSources: {master: {path: 'fixture.master', expectedRef: 'browser-audio.test.mjs'}}};
const fixture = `<button onclick="unlock()">Start tone</button><script>
  globalThis.fixture = {};
  async function unlock() {
    const context = new AudioContext();
    const master = context.createGain();
    const analyser = context.createAnalyser();
    const oscillator = context.createOscillator();
    master.gain.value = 0.05;
    oscillator.connect(master);
    master.connect(analyser);
    analyser.connect(context.destination);
    Object.assign(fixture, {context, master, analyser});
    await context.resume();
    oscillator.start();
  }
</script>`;

async function setup(t) {
  const root = await mkdtemp(join(tmpdir(), 'qa-audio-test-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const browser = await chromium.launch({channel: 'chrome', headless: true, args: ['--mute-audio']});
  t.after(() => browser.close());
  t.diagnostic(`Chrome ${browser.version()}, Node ${process.version}`);
  const page = await browser.newPage();
  await page.setContent(fixture);
  await page.getByRole('button', {name: 'Start tone'}).click();
  await page.waitForFunction(() => fixture.context?.state === 'running');
  const identity = async () => assert.equal(page.isClosed(), false);
  const report = {observations: [], checkpoints: []};
  const audio = createAudioCapture({getPage: () => page, identity, report, root, digest, scenario});
  const record = async id => {
    await audio.start(id, 'master');
    const started = await page.evaluate(() => fixture.context.currentTime);
    // A recording needs actual rendered samples; wait on audio time, not a sleep.
    await page.waitForFunction(at => fixture.context.currentTime >= at + 0.2, started);
  };
  return {page, root, audio, record, report};
}

async function assertRecording(root, artifact) {
  const bytes = await readFile(join(root, artifact.path));
  assert.equal(bytes.subarray(0, 4).toString('hex'), '1a45dfa3', 'WebM/EBML header');
  assert.equal(digest(bytes), artifact.sha256);
  assert.ok(artifact.capture.duration > 0);
  assert.ok(artifact.capture.channels.some(channel => channel.rms > 0.001));
}

async function assertOutputAlive(page) {
  await page.waitForFunction(() => {
    const samples = new Float32Array(fixture.analyser.fftSize);
    fixture.analyser.getFloatTimeDomainData(samples);
    return samples.some(sample => Math.abs(sample) > 0.001);
  });
}

test('records a real WebM without detaching the original output', async t => {
  const {page, root, audio, record, report} = await setup(t);
  await record('tone');
  const artifact = await audio.stop();
  await assertRecording(root, artifact);
  assert.equal(report.checkpoints.length, 1);
  await audio.cleanup();
  await assertOutputAlive(page);
  await assert.rejects(audio.stop(), /No active audio capture/);
});

test('decode failure remains visible and permits cleanup and recording again', async t => {
  const {page, root, audio, record, report} = await setup(t);
  await record('bad-decode');
  await page.evaluate(() => {
    const decode = fixture.context.decodeAudioData.bind(fixture.context);
    fixture.context.decodeAudioData = () => decode(new ArrayBuffer(0));
  });
  await assert.rejects(audio.stop(), /decode|EncodingError/i);
  await page.evaluate(() => {delete fixture.context.decodeAudioData;});
  assert.equal(report.checkpoints.length, 0);
  await audio.cleanup();
  await record('recovered');
  await assertRecording(root, await audio.stop());
  await assertOutputAlive(page);
});

test('write collision preserves the existing file and permits another capture', async t => {
  const {page, root, audio, record, report} = await setup(t);
  await writeFile(join(root, 'collision.webm'), 'existing evidence');
  await record('collision');
  await assert.rejects(audio.stop(), {code: 'EEXIST'});
  assert.equal(await readFile(join(root, 'collision.webm'), 'utf8'), 'existing evidence');
  assert.equal(report.checkpoints.length, 0);
  await audio.cleanup();
  await record('recovered');
  await assertRecording(root, await audio.stop());
  await assertOutputAlive(page);
});

for (const boundary of ['constructor', 'connect', 'start']) {
  test(`${boundary} failure releases newly allocated tracks and permits retry`, async t => {
    const {page, root, audio, record} = await setup(t);
    await page.evaluate(boundary => {
      const create = fixture.context.createMediaStreamDestination.bind(fixture.context);
      fixture.context.createMediaStreamDestination = () => {
        fixture.tap = create();
        return fixture.tap;
      };
      const fail = () => {throw new Error('injected allocation failure');};
      fixture.originalRecorder = MediaRecorder;
      if (boundary === 'constructor') {
        globalThis.MediaRecorder = class extends MediaRecorder {constructor() {fail();}};
      } else if (boundary === 'connect') fixture.master.connect = fail;
      else globalThis.MediaRecorder = class extends MediaRecorder {start() {fail();}};
    }, boundary);
    await assert.rejects(audio.start('failed', 'master'), /injected allocation failure/);
    assert.deepEqual(await page.evaluate(() => fixture.tap.stream.getTracks().map(track => track.readyState)), ['ended']);
    await page.evaluate(() => {
      globalThis.MediaRecorder = fixture.originalRecorder;
      delete fixture.master.connect;
      delete fixture.context.createMediaStreamDestination;
    });
    await audio.cleanup();
    await record('recovered');
    await assertRecording(root, await audio.stop());
    await assertOutputAlive(page);
  });
}

test('executor restores a declared fault and finishes captures across reload and reopen', async t => {
  const root = await mkdtemp(join(tmpdir(), 'qa-audio-runtime-'));
  t.after(() => rm(root, {recursive: true, force: true}));
  const project = join(root, 'project'), isolated = join(root, 'fixture'), output = join(root, 'output');
  await mkdir(project);
  await mkdir(isolated);
  await writeFile(join(isolated, 'index.html'), fixture);
  const adapter = {
    describe: async () => ({files: [{path: 'index.html'}], mutablePaths: []}),
    start: async () => {
      const server = createServer((request, response) => {
        response.setHeader('Content-Type', 'text/html');
        response.end(fixture);
      });
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', resolve);
      });
      return {url: `http://127.0.0.1:${server.address().port}/`, close: () => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))};
    }
  };
  const caseModule = {
    scenario: {...scenario, id: 'audio-lifecycle', criteria: [{id: 'audio', variant: 'tone'}], faultIds: ['decode'], browser: {width: 800, height: 600, dpr: 1, locale: 'en-US', launchArgs: ['--mute-audio']}},
    sourceFiles: [new URL('./browser-audio.test.mjs', import.meta.url)],
    faults: {decode: {
      type: 'boundary', expectedRef: 'browser-audio.test.mjs',
      apply: () => {
        const decode = fixture.context.decodeAudioData.bind(fixture.context);
        fixture.context.decodeAudioData = () => decode(new ArrayBuffer(0));
      },
      restore: () => {delete fixture.context.decodeAudioData;}
    }},
    execute: async ({audio, input, wait, read, fault, reload, reopen}) => {
      const unlock = async () => {
        await input.key('Tab');
        await input.key('Enter');
        await wait(() => fixture.context?.state === 'running');
      };
      const record = async id => {
        await audio.start(id, 'master');
        const started = await read('audio-clock', () => fixture.context.currentTime);
        await wait(at => fixture.context.currentTime >= at + 0.2, started);
      };
      await unlock();
      await record('bad-decode');
      await fault('decode');
      try {await assert.rejects(audio.stop(), /decode|EncodingError/i);}
      finally {await fault('decode', false);}
      await record('before-reload');
      await reload();
      await unlock();
      await record('before-reopen');
      await reopen();
      await unlock();
      await record('after-reopen');
      await audio.stop();
    },
    verify: async ({artifacts}) => {
      assert.deepEqual(artifacts.map(item => item.id), ['before-reload', 'before-reopen', 'after-reopen']);
      for (const artifact of artifacts) await assertRecording(output, artifact);
      return {criteria: [{id: 'audio', variant: 'tone', status: 'pass', expectedRef: 'browser-audio.test.mjs', evidence: artifacts.map(item => item.path), limits: ['Synthetic tone; no speakers or game tested.']}], pendingReviews: []};
    }
  };
  const report = await run({project, fixture: isolated, output, adapter, caseModule});
  assert.equal(report.status, 'pass', JSON.stringify(report.errors));
  assert.ok(report.cleanup.every(resource => resource.status === 'closed'));
  assert.deepEqual(report.observations.filter(item => item.kind === 'declared-fault').map(item => item.enabled), [true, false]);
});
