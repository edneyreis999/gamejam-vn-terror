import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

export const origin = 'http://127.0.0.1:18726/';
export const project = path.resolve('rpg-maker/The Dryland Drowned');

export async function startServer(t, directory = project) {
  const server = spawn('python3', ['-u', '-m', 'http.server', '18726', '--bind', '127.0.0.1', '--directory', directory], { stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  server.stdout.on('data', data => { log += data; });
  server.stderr.on('data', data => { log += data; });
  server.on('error', error => { log += error.message; });
  let stopped = false;
  async function stop() {
    if (stopped) return;
    stopped = true;
    if (server.exitCode === null && server.signalCode === null) {
      const exited = once(server, 'exit');
      server.kill('SIGINT');
      await exited;
    }
  }
  t.after(stop);
  for (let attempt = 0; !log.includes('Serving HTTP'); attempt++) {
    if (server.exitCode !== null || server.signalCode !== null || attempt >= 100) throw new Error(`Loopback server failed: ${log}`);
    await delay(50);
  }
  return { stop, log: () => log };
}

export async function openChrome(t, options = {}) {
  const profile = await mkdtemp(path.join(tmpdir(), 'dryland-native-'));
  const executable = process.env.DRYLAND_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(executable, [
    '--headless=new', '--remote-debugging-pipe', '--no-first-run', '--no-default-browser-check',
    '--disable-background-networking', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    `--user-data-dir=${profile}`, 'about:blank'
  ], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
  let nextId = 0;
  let buffer = '';
  let stderr = '';
  const waiting = new Map();
  const exceptions = [];
  const requests = [];
  const responses = [];
  chrome.stderr.on('data', data => { stderr += data; });
  function rejectPending(error) {
    for (const request of waiting.values()) request.reject(error);
    waiting.clear();
  }
  chrome.on('error', rejectPending);
  chrome.on('exit', code => rejectPending(new Error(`Chrome exited (${code}): ${stderr.slice(-2000)}`)));
  chrome.stdio[4].setEncoding('utf8');
  chrome.stdio[4].on('data', data => {
    buffer += data;
    let boundary;
    while ((boundary = buffer.indexOf('\0')) !== -1) {
      const packet = JSON.parse(buffer.slice(0, boundary));
      buffer = buffer.slice(boundary + 1);
      if (packet.method === 'Runtime.exceptionThrown') exceptions.push(packet.params.exceptionDetails);
      if (packet.method === 'Network.requestWillBeSent') requests.push(packet.params.request.url);
      if (packet.method === 'Network.responseReceived') responses.push({ url: packet.params.response.url, status: packet.params.response.status });
      const request = waiting.get(packet.id);
      if (!request) continue;
      waiting.delete(packet.id);
      if (packet.error) request.reject(new Error(JSON.stringify(packet.error)));
      else request.resolve(packet.result);
    }
  });
  function send(method, params = {}, sessionId) {
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { waiting.delete(id); reject(new Error(`Chrome timed out: ${method}. ${stderr.slice(-1000)}`)); }, 20000);
      waiting.set(id, { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } });
      chrome.stdio[3].write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + '\0');
    });
  }
  t.after(async () => {
    if (chrome.exitCode === null && chrome.signalCode === null) {
      const exited = once(chrome, 'exit');
      chrome.kill('SIGTERM');
      await exited;
    }
    await rm(profile, { recursive: true, force: true });
  });
  const version = await send('Browser.getVersion');
  let targetId;
  let sessionId;
  const call = (method, params) => send(method, params, sessionId);
  async function createTarget() {
    ({ targetId } = await send('Target.createTarget', { url: 'about:blank' }));
    ({ sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }));
    await call('Runtime.enable');
    await call('Page.enable');
    await call('Network.enable');
    await call('Network.setCacheDisabled', { cacheDisabled: true });
    await call('Emulation.setDeviceMetricsOverride', { width: options.width || 1280, height: options.height || 720, deviceScaleFactor: 1, mobile: false });
    if (typeof options.reduced === 'boolean') await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: options.reduced ? 'reduce' : 'no-preference' }] });
  }
  await createTarget();
  async function evaluate(expression) {
    const response = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
    return response.result.value;
  }
  async function waitFor(expression) {
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
      if (exceptions.length) throw new Error(JSON.stringify(exceptions));
      const nativeError = await evaluate('window.Graphics?._errorPrinter?.textContent || ""');
      if (nativeError) throw new Error(`Native engine error: ${nativeError}`);
      if (await evaluate(expression)) return;
      await delay(50);
    }
    const state = await evaluate(`({scene:SceneManager._scene?.constructor.name,map:window.$gameMap?.mapId(),phase:window.$gameSystem?._dryland?.campaign.phase,text:window.$gameMessage?.allText(),choices:window.$gameMessage?._drylandChoices,pause:SceneManager._scene?._messageWindow?.pause,wait:SceneManager._scene?._messageWindow?._waitCount})`);
    throw new Error(`Native state not reached: ${expression}; observed ${JSON.stringify(state)}`);
  }
  async function press(key, keyCode) {
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, windowsVirtualKeyCode: keyCode });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, windowsVirtualKeyCode: keyCode });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  }
  async function screenshot(file) {
    const result = await call('Page.captureScreenshot', { format: 'png' });
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, Buffer.from(result.data, 'base64'));
  }
  async function reopen() {
    await send('Target.closeTarget', { targetId });
    exceptions.length = 0;
    await createTarget();
    await call('Page.navigate', { url: origin });
  }
  await call('Page.navigate', { url: origin });
  return { evaluate, waitFor, press, screenshot, version, exceptions, requests, responses, call, reopen };
}
