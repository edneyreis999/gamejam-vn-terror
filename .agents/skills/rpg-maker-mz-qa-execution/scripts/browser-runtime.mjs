import { chromium } from 'playwright';
import {createAudioCapture, audioCapture} from './audio-capture.mjs';
import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises';
import { resolve, join, relative, isAbsolute, dirname, basename, sep } from 'node:path';
import { createHash } from 'node:crypto';
import {loadStorageFixture, storageCapture} from './browser-storage.mjs';
import os from 'node:os';
import {withDeadline,readObservation} from './observation-deadline.mjs';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const errorInfo = error => ({ name: error.name, message: error.message, stack: error.stack, ...(error.partialObservation?{partialObservation:error.partialObservation}:{}), ...(error.partialObservationUnavailable?{partialObservationUnavailable:error.partialObservationUnavailable}:{}) });
const inside = (root, file) => { const rel = relative(root, file); return rel !== '..' && !rel.startsWith('..' + sep) && !isAbsolute(rel); };
const safeId = id => typeof id === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(id);

async function resolveDestination(file) {
  const segments = [];
  let ancestor = resolve(file);
  while (true) {
    try { return resolve(await realpath(ancestor), ...segments.reverse()); }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      segments.push(basename(ancestor)); ancestor = dirname(ancestor);
    }
  }
}

export async function run({ project, fixture, output, adapter, caseModule, sources = [] }) {
  project = await realpath(project);
  fixture = await realpath(fixture);
  if (project === fixture) throw new Error('Prepare an isolated fixture before execution.');
  for (const name of ['describe', 'start']) if (typeof adapter[name] !== 'function') throw new Error(`Adapter export missing: ${name}`);
  for (const name of ['execute', 'verify']) if (typeof caseModule[name] !== 'function') throw new Error(`Case export missing: ${name}`);
  const scenario = caseModule.scenario;
  if (!safeId(scenario?.id) || !Array.isArray(scenario.criteria) || !scenario.criteria.length) throw new Error('Scenario ID and required criteria are mandatory.');
  const config = scenario.browser;
  if (!config || !Number.isInteger(config.width) || config.width <= 0 || !Number.isInteger(config.height) || config.height <= 0 || !(config.dpr > 0) || !config.locale) throw new Error('Explicit width, height, DPR and locale required.');
  if ('nativeZoom' in config) throw new Error('nativeZoom was removed; migrate this case to ordinary browser configuration.');
  if (config.recordVideo !== undefined && typeof config.recordVideo !== 'boolean') throw new Error('recordVideo must be boolean.');
  if (scenario.audioFormat !== undefined && !['webm', 'wav'].includes(scenario.audioFormat)) throw new Error('audioFormat must be webm or wav.');
  if (config.video !== undefined && typeof config.video !== 'boolean') throw new Error('video must be boolean.');
  if (config.video && config.recordVideo) throw new Error('Choose video or recordVideo, not both.');
  const timeout = config.timeoutMs ?? 15000;
  const executionTimeout = config.executionTimeoutMs ?? 600000, cleanupTimeout = config.cleanupTimeoutMs ?? 15000;
  if (![timeout,executionTimeout,cleanupTimeout].every(value=>Number.isSafeInteger(value)&&value>0)) throw new Error('Browser deadlines must be positive integer milliseconds.');
  const root = await resolveDestination(output);
  if (inside(fixture, root)) throw new Error('Evidence output must be outside the served fixture.');
  await mkdir(root);
  const report = { mode: 'directed-browser', scenario: scenario.id, startedAt: new Date().toISOString(), fixture, criteria: [], checkpoints: [], inputs: [], observations: [], errors: [], cleanup: [], sources: [], status: 'in_progress' };
  let browser, context, page, session, service, lease, audio, terminal = false, touchActive = false;
  const videos = [], audioIds = new Set();
  const activeFaults = new Map();
  let video;
  const heldKeys = new Set(), heldButtons = new Set();
  const failure = (phase, error) => { report.errors.push({ phase, ...errorInfo(error) }); report.failure ??= { phase, ...errorInfo(error) }; report.status = 'fail'; };
  const owned = async (resource, close) => {
    try { await withDeadline(close, cleanupTimeout, `cleanup:${resource}`); report.cleanup.push({ resource, status: 'closed' }); }
    catch (error) { failure(`cleanup:${resource}`, error); report.cleanup.push({ resource, status: 'failed', message: error.message }); }
  };
  const releaseTouch = async () => {
    if (touchActive && session) {
      await session.send('Input.dispatchTouchEvent', {type: 'touchCancel', touchPoints: []});
      report.inputs.push({type: 'touch-cancel', source: 'lifecycle', at: Date.now()});
      touchActive = false;
    }
  };
  const metadata = () => page.evaluate(() => ({url: location.href, timeOrigin: performance.timeOrigin,
    locale: navigator.language, focused: document.hasFocus(), visibility: document.visibilityState}));
  const identity = async () => {
    if (page.isClosed() || context.pages().length !== 1 || context.pages()[0] !== page) throw new Error('Owned page changed.');
    const target = (await session.send('Target.getTargetInfo')).targetInfo;
    const actual = await metadata();
    if (target.targetId !== lease.targetId || target.browserContextId !== lease.contextId || actual.url !== lease.url || actual.timeOrigin !== lease.timeOrigin || actual.locale !== config.locale || !actual.focused || actual.visibility !== 'visible') throw new Error('Document or focus changed.');
    return actual;
  };
  try {
    for (const [index, file] of [...sources, ...(caseModule.sourceFiles ?? []), ...(adapter.sourceFiles ?? []), new URL('./browser-runtime.mjs', import.meta.url), new URL('./audio-capture.mjs', import.meta.url), new URL('./browser-audio.mjs', import.meta.url), new URL('./browser-storage.mjs', import.meta.url), new URL('./observation-deadline.mjs', import.meta.url), new URL('./package-lock.json', import.meta.url), new URL('./package.json', import.meta.url), new URL('./directed-browser.mjs', import.meta.url)].entries()) {
      const bytes = await readFile(file); const name = `source-${index}${String(file).endsWith('.json') ? '.json' : '.mjs'}`;
      await writeFile(join(root, name), bytes, { flag: 'wx' }); report.sources.push({ path: name, originalPath: await realpath(file), sha256: digest(bytes) });
    }
    const descriptor = await adapter.describe({ project, fixture });
    if (!Array.isArray(descriptor?.files) || !descriptor.files.length || !Array.isArray(descriptor.mutablePaths)) throw new Error('Descriptor requires files and mutablePaths.');
    report.descriptor = descriptor;
    report.files = [];
    for (const entry of descriptor.files) {
      const file = await realpath(resolve(fixture, entry.path));
      if (!inside(fixture, file)) throw new Error(`Fixture input outside fixture: ${entry.path}`);
      const hash = digest(await readFile(file));
      if (entry.sha256 && hash !== entry.sha256) throw new Error(`Stale fixture input: ${entry.path}`);
      report.files.push({ path: entry.path, sha256: hash });
    }
    for (const path of descriptor.mutablePaths) if (!inside(fixture, await resolveDestination(resolve(fixture, path)))) throw new Error('Mutable destination outside fixture.');
    for (const capability of scenario.requires ?? []) if (!descriptor.capabilities?.includes(capability)) throw new Error(`Fixture capability unavailable: ${capability}`);
    service = await adapter.start({ project, fixture });
    if (typeof service?.close !== 'function' || !service.url) throw new Error('start must return URL and close().');
    const baseUrl = new URL(service.url);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(baseUrl.hostname)) throw new Error('QA service must be local.');
    const storageState = await loadStorageFixture({descriptor, fixture, origin: baseUrl.origin});
    if (storageState) {
      const source = descriptor.storageFixture ?? descriptor.storageImport ?? descriptor.storageSeed;
      const path = 'storage-import.json', bytes = Buffer.from(JSON.stringify(storageState));
      await writeFile(join(root, path), bytes, {flag: 'wx'});
      report.checkpoints.push({id: 'storage-import', kind: 'browser-storage', path, sha256: digest(bytes), at: Date.now()});
      report.storagePreparation = {phase: 'before-first-page', ...source, origin: baseUrl.origin};
      report.storageImport = {...source, targetOrigin: baseUrl.origin, mappedSha256: digest(bytes)};
    }
    browser = await chromium.launch({ channel: config.channel ?? 'chrome', headless: false, args: config.launchArgs ?? [] });
    const openPage = async () => {
      page = await context.newPage(); page.setDefaultTimeout(timeout);
      if (config.video) video = page.video();
      const recording = config.recordVideo ? { handle: page.video(), startedAt: Date.now() } : undefined;
      if (recording) videos.push(recording);
      page.on('pageerror', e => report.errors.push({ phase: 'page', ...errorInfo(e) }));
      page.on('console', m => { if (m.type() === 'error') report.errors.push({ phase: 'console', message: m.text() }); });
      await page.addInitScript(() => {
        globalThis.__qaTelemetry = { inputs: [] };
        for (const type of ['keydown', 'keyup', 'pointerdown', 'pointerup', 'wheel']) addEventListener(type, e => __qaTelemetry.inputs.push({ type, key: e.key, x: e.clientX, y: e.clientY, deltaX: e.deltaX, deltaY: e.deltaY, deltaMode: e.deltaMode, trusted: e.isTrusted, at: performance.now() }), true);
        for (const type of ['touchstart', 'touchmove', 'touchend', 'touchcancel']) {
          addEventListener(type, event => __qaTelemetry.inputs.push({type,
            touches: [...event.touches].map(touch => ({id: touch.identifier, x: touch.clientX, y: touch.clientY})),
            trusted: event.isTrusted, at: performance.now()}), {capture: true, passive: true});
        }
      });
      session = await context.newCDPSession(page);
      await page.goto(new URL(config.query ?? '?test', baseUrl).href, { waitUntil: 'load' });
      await page.bringToFront(); await page.evaluate(() => document.fonts.ready);
      const target = (await session.send('Target.getTargetInfo')).targetInfo;
      lease = { ...(await metadata()), targetId: target.targetId, contextId: target.browserContextId };
      await identity();
      if (recording) recording.lease = { ...lease };
    };
    const openContext = async storageState => {
      context = await browser.newContext({viewport: {width: config.width, height: config.height},
        deviceScaleFactor: config.dpr, locale: config.locale, hasTouch: config.hasTouch ?? false,
        reducedMotion: config.reducedMotion ?? 'no-preference', storageState,
        ...((config.recordVideo || config.video) ? {recordVideo: {dir: join(root, 'video'), size: {width: config.width, height: config.height}}} : {})});
      report.network ??= [];
      context.on('request', request => report.network.push({event: 'request', url: request.url(), method: request.method(), at: Date.now()}));
      context.on('response', response => report.network.push({event: 'response', url: response.url(), status: response.status(), at: Date.now()}));
      context.on('requestfailed', request => report.network.push({event: 'failure', url: request.url(), error: request.failure(), at: Date.now()}));
      await openPage();
    };
    await openContext(storageState);
    report.environment = { ...lease, browser: browser.version(), node: process.version, platform: process.platform, release: os.release(), arch: process.arch };
    const wait = async (fn, arg) => { await identity(); const handle = await page.waitForFunction(fn, arg, { timeout, polling: 'raf' }); await handle.dispose(); await identity(); };
    const read = async (label, fn, arg) => { await identity(); const value = await readObservation(page, label, fn, arg, timeout); await identity(); report.observations.push({ label, kind: 'auxiliary-read', at: Date.now(), value }); return value; };
    const input = async (type, detail, action) => {
      if (terminal) throw new Error('Input stopped after uncertain operation; start a new run from a reliable reset.');
      try { await identity(); const at = Date.now(); await action(); report.inputs.push({ type, ...detail, at }); }
      catch (error) { terminal = true; throw error; }
    };
    const keyDown = key => input('key-down', { key }, async () => { heldKeys.add(key); await page.keyboard.down(key); });
    const keyUp = key => input('key-up', { key }, async () => { await page.keyboard.up(key); heldKeys.delete(key); });
    const key = async (value, holdMs = 70) => { await keyDown(value); try { await new Promise(r => setTimeout(r, holdMs)); } finally { await page.keyboard.up(value); heldKeys.delete(value); report.inputs.push({ type: 'key-up', key: value, at: Date.now() }); } await new Promise(r => setTimeout(r, config.keyReleaseMs ?? 35)); };
    const pointer = {
      move: (x, y) => input('pointer-move', { x, y }, () => page.mouse.move(x, y)),
      down: (button = 'left') => input('pointer-down', { button }, async () => { heldButtons.add(button); await page.mouse.down({ button }); }),
      up: (button = 'left') => input('pointer-up', { button }, async () => { await page.mouse.up({ button }); heldButtons.delete(button); }),
      wheel: (deltaX, deltaY) => input('pointer-wheel', { deltaX, deltaY }, () => page.mouse.wheel(deltaX, deltaY))
    };
    const touch = {
      start: (x, y) => input('touch-start', {x, y}, async () => {
        if (!config.hasTouch) throw new Error('Touch input requires scenario.browser.hasTouch.');
        if (touchActive) throw new Error('End the active touch before starting another.');
        touchActive = true;
        await session.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x, y, id: 0}]});
      }),
      move: (x, y) => input('touch-move', {x, y}, async () => {
        if (!touchActive) throw new Error('Touch move requires an active touch.');
        await session.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x, y, id: 0}]});
      }),
      end: () => input('touch-end', {}, async () => {
        if (!touchActive) throw new Error('Touch end requires an active touch.');
        await session.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
        touchActive = false;
      })
    };
    const shot = async id => {
      if (!safeId(id)) throw new Error('Invalid capture ID.');
      const before = await identity();
      const png = await session.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
      const after = await identity();
      const bytes = Buffer.from(png.data, 'base64');

      const path = `${id}.png`; await writeFile(join(root, path), bytes, { flag: 'wx' });
      report.checkpoints.push({ id, path, sha256: digest(bytes), at: Date.now(), capture: { before, after } });
    };
    const reload = async () => {
      await identity();
      if(audio)await audio.close();
      await releaseTouch();
      report.priorDocuments ??= []; report.priorDocuments.push(await metadata());
      await page.reload({ waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready);
      lease = { ...lease, ...(await metadata()) }; await identity();
    };
    const makeAudio = () => scenario.audioFormat === 'webm'
      ? createAudioCapture({getPage:()=>page,root,report,usedIds:audioIds,sources:scenario.audioSources,identity,register:artifact=>report.checkpoints.push(artifact)})
      : audioCapture({page,identity,report,output:root,sources:scenario.audioSources,usedIds:audioIds});
    const reopen = async () => {
      if (heldKeys.size || heldButtons.size) throw new Error('Release public inputs before reopening.');
      if (activeFaults.size) throw new Error('Restore active faults before recreating the browser context.');
      await releaseTouch();
      await identity();
      if (audio) await audio.close();
      const prior = { ...lease, publicInputLog: await page.evaluate(() => globalThis.__qaTelemetry) };
      const storageState = await context.storageState({ indexedDB: true });
      const id = `storage-reopen-${(report.reopenedContexts?.length ?? 0) + 1}`;
      const bytes = Buffer.from(JSON.stringify(storageState));
      const path = `${id}.json`;
      await writeFile(join(root, path), bytes, { flag: 'wx' });
      report.checkpoints.push({ id, kind: 'browser-storage', path, sha256: digest(bytes), at: Date.now() });
      await session.detach(); session = undefined;
      await context.close(); context = undefined;
      report.cleanup.push({ resource: `context:${prior.contextId}`, status: 'closed' });
      await openContext(storageState);
      if (lease.contextId === prior.contextId || lease.targetId === prior.targetId) throw new Error('Reopen did not create a new browser context and target.');
      report.reopenedContexts ??= [];
      report.reopenedContexts.push({ prior, current: { ...lease }, storage: path });
      audio = makeAudio();
    };
    const reopenPage = async () => {
      await identity();
      if (heldKeys.size || heldButtons.size) throw new Error('Release public inputs before reopening.');
      if (audio) await audio.close();
      await releaseTouch();
      const prior = {...lease, inputs: await page.evaluate(() => globalThis.__qaTelemetry)};
      report.priorDocuments ??= []; report.priorDocuments.push(prior);
      await session.detach(); session = undefined;
      await page.close();
      await openPage();
      if (lease.contextId !== prior.contextId || lease.targetId === prior.targetId) throw new Error('Page reopen must retain its context and replace its target.');
      audio = makeAudio();
    };
    audio = makeAudio();
    const publicCommand = async (path, args = []) => {
      if (!scenario.publicCommands?.includes(path) || !/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)+$/.test(path)) throw new Error(`Undeclared public command: ${path}`);
      let result;
      await input('public-command', { path, args }, async () => {
        result = await page.evaluate(({ path, args }) => {
          const names = path.split('.');
          const name = names.pop();
          const owner = names.reduce((value, key) => value[key], globalThis);
          return owner[name](...args);
        }, { path, args });
      });
      report.observations.push({ label: path, kind: 'public-command-result', value: result, at: Date.now() });
      return result;
    };
    const restoreFault = async (id, definition) => {
      if (definition.type === 'network') await context.unroute(definition.pattern, definition.handler);
      else await page.evaluate(definition.restore);
      activeFaults.delete(id);
    };
    const fault = async (id, enabled = true) => {
      const definition = caseModule.faults?.[id];
      if (!scenario.faultIds?.includes(id) || !definition?.expectedRef) throw new Error('Declare the assigned external fault: ' + id);
      if (definition.type === 'network') {
        if (!definition.pattern) throw new Error('Network fault requires a route pattern.');
      } else if (definition.type !== 'boundary' || typeof definition.apply !== 'function' || typeof definition.restore !== 'function') {
        throw new Error('Boundary fault requires apply and restore.');
      }
      await identity();
      if (enabled) {
        if (activeFaults.has(id)) throw new Error('Fault already active: ' + id);
        const active = {...definition};
        if (definition.type === 'network') {
          active.handler = route => route.abort('failed');
          activeFaults.set(id, active);
          await context.route(definition.pattern, active.handler);
        } else {
          activeFaults.set(id, active);
          await page.evaluate(definition.apply);
        }
      } else {
        const active = activeFaults.get(id);
        if (!active) throw new Error('Fault is not active: ' + id);
        await restoreFault(id, active);
      }
      report.observations.push({label: id, kind: 'declared-fault', enabled, expectedRef: definition.expectedRef, at: Date.now()});
      (report.boundaryFaults ??= []).push({id, type: definition.type, enabled, expectedRef: definition.expectedRef, at: Date.now()});
      await identity();
    };
    const storage = {capture: async id => {
      if (!scenario.storage?.expectedRef) throw new Error('Declare the storage evidence contract.');
      return storageCapture({context, identity, report, output: root, origin: baseUrl.origin,
        expectedRef: scenario.storage.expectedRef})(id);
    }};
    const executionStarted = Date.now();
    await withDeadline(() => caseModule.execute({ input: { key, keyDown, keyUp, pointer, touch, publicCommand }, wait, read, shot, reload, reopen, reopenContext: reopen, reopenPage, get audio() { return audio; }, fault, storage, report, fixture, output: root, descriptor }), executionTimeout, 'case execution');
    report.executionMs = Date.now() - executionStarted;
    const result = await caseModule.verify({ observations: report.observations, artifacts: report.checkpoints, expected: scenario.criteria, report });
    if (!Array.isArray(result?.criteria) || !Array.isArray(result.pendingReviews)) throw new Error('verify must return criteria and pendingReviews arrays.');
    const states = ['pass', 'fail', 'pending', 'blocked', 'not-executed', 'executed-awaiting-review'];
    const seen = new Set();
    for (const criterion of result.criteria) {
      const key = `${criterion.id}:${criterion.variant}`;
      if (seen.has(key) || !states.includes(criterion.status) || !criterion.expectedRef || !Array.isArray(criterion.evidence) || !Array.isArray(criterion.limits)) throw new Error(`Invalid verification result: ${key}`);
      seen.add(key);
      if (criterion.status === 'pass' && !criterion.evidence.length) throw new Error(`PASS without evidence: ${key}`);
      for (const ref of criterion.evidence) if (!report.checkpoints.some(c => c.path === ref)) throw new Error(`Unregistered evidence: ${ref}`);
    }
    for (const expected of scenario.criteria) if (!seen.has(`${expected.id}:${expected.variant}`)) result.criteria.push({ ...expected, status: 'pending', evidence: [], limits: ['Missing result'] });
    report.criteria = result.criteria; report.pendingReviews = result.pendingReviews;
    report.status = result.criteria.some(c => c.status === 'fail') ? 'fail' : result.criteria.every(c => c.status === 'pass') && !result.pendingReviews.length ? 'pass' : 'executed-awaiting-review';
    const acceptedErrors = new Set();
    for (const expectedError of result.expectedErrors ?? []) {
      if (!Number.isInteger(expectedError.index) || !report.errors[expectedError.index] || !expectedError.expectedRef || !expectedError.reason) throw new Error('Expected browser error requires an existing index, contract reference and reason.');
      acceptedErrors.add(expectedError.index);
    }
    report.expectedErrors = result.expectedErrors ?? [];
    if (report.errors.some((_, index) => !acceptedErrors.has(index))) { report.status = 'fail'; report.failure ??= { phase: 'browser', message: 'Unexpected browser errors require diagnosis.' }; }
    for (const artifact of report.checkpoints) if (digest(await readFile(join(root, artifact.path))) !== artifact.sha256) throw new Error(`Artifact integrity failure: ${artifact.path}`);
  } catch (error) { terminal = true; failure('execution', error); }
  finally {
    if (page && !page.isClosed()) {
      for (const [id, definition] of [...activeFaults].reverse()) await owned('fault:' + id, async () => {
        if (definition.type === 'network') await context.unroute(definition.pattern, definition.handler);
        else await page.evaluate(definition.restore);
        activeFaults.delete(id);
      });
      await owned('touch', releaseTouch);
      for (const key of heldKeys) await owned(`key:${key}`, () => page.keyboard.up(key));
      for (const button of heldButtons) await owned(`button:${button}`, () => page.mouse.up({ button }));
      await owned('input-log', async () => { report.publicInputLog = await page.evaluate(() => globalThis.__qaTelemetry); });
    }
    if(audio)await owned('audio-capture',()=>audio.close());
    if (session) await owned('capture-session', () => session.detach());
    if (context) await owned('context', () => context.close());
    if(video)await owned('video',async()=>{const path='playthrough.webm';await video.saveAs(join(root,path));const original=await video.path();if(original!==join(root,path))await video.delete();const bytes=await readFile(join(root,path));report.video={path,sha256:digest(bytes),width:config.width,height:config.height};});
    if (browser) await owned('browser', () => browser.close());
    for (const [index, recording] of videos.entries()) await owned(`video:${index + 1}`, async () => {
      const file = await realpath(await recording.handle.path());
      if (!inside(root, file)) throw new Error('Video output escaped the owned run.');
      const bytes = await readFile(file);
      if (bytes.length < 4 || bytes.readUInt32BE(0) !== 0x1a45dfa3) throw new Error('Video capture did not produce WebM bytes.');
      const artifact = { id: `gameplay-${index + 1}`, kind: 'video', path: relative(root, file), sha256: digest(bytes), bytes: bytes.length, startedAt: recording.startedAt, lease: recording.lease, audio: false };
      report.checkpoints.push(artifact);
      report.videos ??= []; report.videos.push(artifact);
    });
    if (service?.close) await owned('service', () => service.close());
    report.finishedAt = new Date().toISOString(); report.durationMs = Date.parse(report.finishedAt) - Date.parse(report.startedAt);
    report.infrastructureMs = report.durationMs - (report.executionMs ?? 0);
    try { await writeFile(join(root, 'report.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' }); }
    catch (error) { console.error(`Cannot persist report at ${root}: ${error.message}`); throw error; }
  }
  return report;
}
