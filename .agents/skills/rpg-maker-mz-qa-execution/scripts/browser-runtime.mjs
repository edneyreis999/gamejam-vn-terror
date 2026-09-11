import { chromium } from 'playwright';
import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises';
import { resolve, join, relative, isAbsolute } from 'node:path';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import os from 'node:os';
import {createAudioCapture} from './browser-audio.mjs';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const errorInfo = error => ({ name: error.name, message: error.message, stack: error.stack });
const inside = (root, file) => { const rel = relative(root, file); return rel !== '..' && !rel.startsWith('../') && !isAbsolute(rel); };
const safeId = id => typeof id === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(id);

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
  const timeout = config.timeoutMs ?? 15000;
  if (config.nativeZoom !== undefined && !(config.nativeZoom > 1)) throw new Error('nativeZoom must request enlargement.');
  let expectedGeometry = config;
  const root = resolve(output);
  if (inside(fixture, root)) throw new Error('Evidence output must be outside the served fixture.');
  await mkdir(root);
  const report = { mode: 'directed-browser', scenario: scenario.id, startedAt: new Date().toISOString(), fixture, criteria: [], checkpoints: [], inputs: [], observations: [], errors: [], cleanup: [], sources: [], status: 'in_progress' };
  let browser, context, page, session, service, lease, audio, terminal = false;
  const heldKeys = new Set(), heldButtons = new Set();
  const failure = (phase, error) => { report.errors.push({ phase, ...errorInfo(error) }); report.failure ??= { phase, ...errorInfo(error) }; report.status = 'fail'; };
  const owned = async (resource, close) => {
    try { await close(); report.cleanup.push({ resource, status: 'closed' }); }
    catch (error) { failure(`cleanup:${resource}`, error); report.cleanup.push({ resource, status: 'failed', message: error.message }); }
  };
  const metadata = () => page.evaluate(() => ({ url: location.href, timeOrigin: performance.timeOrigin, width: innerWidth, height: innerHeight, dpr: devicePixelRatio, locale: navigator.language, fonts: [...document.fonts].map(f => ({ family: f.family, status: f.status })), focused: document.hasFocus(), visibility: document.visibilityState, geometryEvents: globalThis.__qaTelemetry.geometry, canvas: [...document.querySelectorAll('canvas')].map(c => ({ width: c.width, height: c.height, rect: c.getBoundingClientRect().toJSON() })) }));
  const identity = async () => {
    if (page.isClosed() || context.pages().length !== 1 || context.pages()[0] !== page) throw new Error('Owned page changed.');
    const target = (await session.send('Target.getTargetInfo')).targetInfo;
    const actual = await metadata();
    if (target.targetId !== lease.targetId || target.browserContextId !== lease.contextId || actual.url !== lease.url || actual.timeOrigin !== lease.timeOrigin || actual.width !== expectedGeometry.width || actual.height !== expectedGeometry.height || actual.dpr !== expectedGeometry.dpr || actual.locale !== config.locale || !actual.focused || actual.visibility !== 'visible') throw new Error('Document, geometry or focus changed.');
    return actual;
  };
  try {
    for (const [index, file] of [...sources, ...(caseModule.sourceFiles ?? []), ...(adapter.sourceFiles ?? []), new URL('./browser-runtime.mjs', import.meta.url), new URL('./browser-audio.mjs', import.meta.url), new URL('./package-lock.json', import.meta.url), new URL('./package.json', import.meta.url), new URL('./directed-browser.mjs', import.meta.url)].entries()) {
      const bytes = await readFile(file); const name = `source-${index}${String(file).endsWith('.json') ? '.json' : '.mjs'}`;
      await writeFile(join(root, name), bytes, { flag: 'wx' }); report.sources.push({ path: name, originalPath: String(file), sha256: digest(bytes) });
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
    for (const path of descriptor.mutablePaths) if (!inside(fixture, resolve(fixture, path))) throw new Error('Mutable destination outside fixture.');
    for (const capability of scenario.requires ?? []) if (!descriptor.capabilities?.includes(capability)) throw new Error(`Fixture capability unavailable: ${capability}`);
    service = await adapter.start({ project, fixture });
    if (typeof service?.close !== 'function' || !service.url) throw new Error('start must return URL and close().');
    const baseUrl = new URL(service.url);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(baseUrl.hostname)) throw new Error('QA service must be local.');
    browser = await chromium.launch({ channel: config.channel ?? 'chrome', headless: false, args: config.launchArgs ?? [] });
    context = await browser.newContext({ ...(config.nativeZoom ? { viewport: null } : { viewport: { width: config.width, height: config.height }, deviceScaleFactor: config.dpr }), locale: config.locale, reducedMotion: config.reducedMotion ?? 'no-preference' });
    report.network = [];
    context.on('request', request => report.network.push({ event: 'request', url: request.url(), method: request.method(), at: Date.now() }));
    context.on('response', response => report.network.push({ event: 'response', url: response.url(), status: response.status(), at: Date.now() }));
    context.on('requestfailed', request => report.network.push({ event: 'failure', url: request.url(), error: request.failure(), at: Date.now() }));
    page = await context.newPage(); page.setDefaultTimeout(timeout);
    const observePage = current => {
      current.on('pageerror', e => report.errors.push({ phase: 'page', ...errorInfo(e) }));
      current.on('console', m => { if (m.type() === 'error') report.errors.push({ phase: 'console', message: m.text() }); });
    };
    observePage(page);
    await context.addInitScript(() => {
      globalThis.__qaTelemetry = { inputs: [], geometry: 0 };
      for (const type of ['keydown', 'keyup', 'pointerdown', 'pointerup']) addEventListener(type, e => __qaTelemetry.inputs.push({ type, key: e.key, x: e.clientX, y: e.clientY, trusted: e.isTrusted, at: performance.now() }), true);
      addEventListener('resize', () => __qaTelemetry.geometry++);
      const observeGeometry = () => {
        const observer = new ResizeObserver(() => __qaTelemetry.geometry++);
        observer.observe(document.documentElement);
        for (const canvas of document.querySelectorAll('canvas')) observer.observe(canvas);
        new MutationObserver(records => {
          if (records.some(record => record.target instanceof HTMLCanvasElement)) __qaTelemetry.geometry++;
        }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['width', 'height', 'style'] });
      };
      if (document.readyState === 'loading') addEventListener('DOMContentLoaded', observeGeometry, { once: true });
      else observeGeometry();
    });
    session = await context.newCDPSession(page);
    await page.goto(new URL(config.query ?? '?test', baseUrl).href, { waitUntil: 'load' });
    await page.bringToFront(); await page.evaluate(() => document.fonts.ready);
    if (config.nativeZoom) {
      const before = await metadata();
      await writeFile(join(root, 'native-zoom-preparation.json'), JSON.stringify({ before, factor: config.nativeZoom, minimum: { width: config.width, height: config.height } }, null, 2) + '\n', { flag: 'wx' });
      console.log(`Native zoom preparation: use the owned Chrome UI to set ${config.nativeZoom * 100}% and retain at least ${config.width}x${config.height} CSS pixels.`);
      const handle = await page.waitForFunction(({ dpr, factor, width, height }) => Math.abs(devicePixelRatio / dpr - factor) < 0.000001 && innerWidth >= width && innerHeight >= height && document.hasFocus(), { dpr: before.dpr, factor: config.nativeZoom, width: config.width, height: config.height }, { timeout: 180000, polling: 'raf' });
      await handle.dispose();
      expectedGeometry = await metadata();
      report.nativeZoom = { before, after: expectedGeometry, factor: config.nativeZoom, sensor: 'native browser UI; viewport and DPR emulation disabled' };
    }
    const target = (await session.send('Target.getTargetInfo')).targetInfo;
    lease = { ...(await metadata()), targetId: target.targetId, contextId: target.browserContextId };
    await identity();
    report.environment = { ...lease, browser: browser.version(), node: process.version, platform: process.platform, release: os.release(), arch: process.arch };
    const wait = async (fn, arg) => { await identity(); const handle = await page.waitForFunction(fn, arg, { timeout, polling: 'raf' }); await handle.dispose(); await identity(); };
    const read = async (label, fn, arg) => { await identity(); const value = await page.evaluate(fn, arg); await identity(); report.observations.push({ label, kind: 'auxiliary-read', at: Date.now(), value }); return value; };
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
      up: (button = 'left') => input('pointer-up', { button }, async () => { await page.mouse.up({ button }); heldButtons.delete(button); })
    };
    const shot = async id => {
      if (!safeId(id)) throw new Error('Invalid capture ID.');
      const before = await identity();
      const png = await session.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
      const after = await identity();
      if (!isDeepStrictEqual(before, after)) throw new Error('Geometry/document changed during capture.');
      const bytes = Buffer.from(png.data, 'base64');
      if (bytes.readUInt32BE(16) !== Math.round(expectedGeometry.width * expectedGeometry.dpr) || bytes.readUInt32BE(20) !== Math.round(expectedGeometry.height * expectedGeometry.dpr)) throw new Error(`Capture dimensions mismatch: PNG ${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}, expected ${Math.round(expectedGeometry.width * expectedGeometry.dpr)}x${Math.round(expectedGeometry.height * expectedGeometry.dpr)}.`);
      const path = `${id}.png`; await writeFile(join(root, path), bytes, { flag: 'wx' });
      report.checkpoints.push({ id, path, sha256: digest(bytes), at: Date.now(), capture: { before, after } });
    };
    const reload = async () => {
      await audio.cleanup();
      report.priorDocuments ??= []; report.priorDocuments.push(await metadata());
      await page.reload({ waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready);
      lease = { ...lease, ...(await metadata()) }; await identity();
    };
    const reopen = async () => {
      await identity();
      await audio.cleanup();
      report.priorDocuments ??= [];
      report.priorDocuments.push({ ...(await metadata()), inputs: await page.evaluate(() => globalThis.__qaTelemetry) });
      await session.detach();
      await page.close();
      page = await context.newPage();
      page.setDefaultTimeout(timeout);
      observePage(page);
      session = await context.newCDPSession(page);
      await page.goto(new URL(config.query ?? '?test', baseUrl).href, { waitUntil: 'load' });
      await page.bringToFront();
      await page.evaluate(() => document.fonts.ready);
      const target = (await session.send('Target.getTargetInfo')).targetInfo;
      lease = { ...(await metadata()), targetId: target.targetId, contextId: target.browserContextId };
      await identity();
    };
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
    const fault = async (id, enabled = true) => {
      const definition = caseModule.faults?.[id];
      if (!scenario.faultIds?.includes(id) || !definition?.expectedRef) throw new Error(`Undeclared fault: ${id}`);
      await identity();
      if (definition.type === 'network') {
        if (enabled) await context.route(definition.pattern, route => route.abort('failed'));
        else await context.unroute(definition.pattern);
      } else if (definition.type === 'boundary') {
        const operation = enabled ? definition.apply : definition.restore;
        if (typeof operation !== 'function') throw new Error(`Unsupported fault operation: ${id}`);
        await page.evaluate(operation);
      } else throw new Error(`Unsupported fault operation: ${id}`);
      report.observations.push({ label: id, kind: 'declared-fault', enabled, expectedRef: definition.expectedRef, at: Date.now() });
      await identity();
    };
    audio = createAudioCapture({getPage: () => page, identity, report, root, digest, scenario});
    const executionStarted = Date.now();
    await caseModule.execute({ input: { key, keyDown, keyUp, pointer, publicCommand }, fault, wait, read, shot, audio, reload, reopen, report, fixture, output: root, descriptor });
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
  } catch (error) { failure('execution', error); }
  finally {
    if (page && !page.isClosed()) {
      for (const key of heldKeys) await owned(`key:${key}`, () => page.keyboard.up(key));
      for (const button of heldButtons) await owned(`button:${button}`, () => page.mouse.up({ button }));
      await owned('input-log', async () => { report.publicInputLog = await page.evaluate(() => globalThis.__qaTelemetry); });
    }
    if (audio) await owned('audio-capture', () => audio.cleanup());
    if (session) await owned('capture-session', () => session.detach());
    if (context) await owned('context', () => context.close());
    if (browser) await owned('browser', () => browser.close());
    if (service?.close) await owned('service', () => service.close());
    report.finishedAt = new Date().toISOString(); report.durationMs = Date.parse(report.finishedAt) - Date.parse(report.startedAt);
    report.infrastructureMs = report.durationMs - (report.executionMs ?? 0);
    try { await writeFile(join(root, 'report.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' }); }
    catch (error) { console.error(`Cannot persist report at ${root}: ${error.message}`); throw error; }
  }
  return report;
}
