// E2E no NW.js: cada instância tem cópia do jogo, perfil e porta próprios. Compartilhar o perfil faz
// a segunda instância fechar com código 0 sem abrir sessão; compartilhar a pasta mistura os saves em save/.
import { spawn } from 'node:child_process';
import { constants } from 'node:fs';
import { cp, mkdir, mkdtemp, realpath, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { nwEnvironment, nwExecutable } from '../../tools/nw-runtime.mjs';
import { browserControls, portugueseMessageText } from './native-browser-api.mjs';

// As janelas ficam empilhadas: as três primeiras flags impedem o Chromium de frear as cobertas.
const FLAGS = ['--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--mute-audio'];
const NOT_COPIED = new Set(['save', 'game.rmmzproject']);
const QUIT_MS = 15000;
const ATTACH_MS = 30000;

function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

export async function openNw(t, options, directory) {
  if (options.zoom && options.zoom !== 1) throw new Error('Zoom nativo não é suportado no NW (ADR-G003).');
  const executable = nwExecutable();
  const broker = process.env.DRYLAND_BROWSER_BROKER;
  const reservation = broker ? await fetch(broker + '/reserve', { method: 'POST', body: process.env.DRYLAND_JOB_ID }).then(async r => { if (!r.ok) throw new Error(await r.text()); return r.text(); }) : null;
  const release = async () => { if (reservation) await fetch(broker + '/release', { method: 'POST', body: reservation }); };

  const root = await mkdtemp(path.join(tmpdir(), 'dryland-nw-'));
  // O MZ recusa rodar sob /private/var, onde fica o TMPDIR padrão do macOS; o run-tests.mjs define outro.
  if ((await realpath(root)).startsWith('/private/var')) {
    await rm(root, { recursive: true, force: true });
    await release();
    throw new Error('O NW precisa de um TMPDIR fora de /private/var: rode pelo rpg-maker/tools/run-tests.mjs --runtime nw.');
  }
  const game = path.join(root, 'game'), profile = path.join(root, 'profile');
  await cp(directory, game, {
    recursive: true, dereference: true, mode: constants.COPYFILE_FICLONE,
    filter: source => !(path.dirname(source) === directory && NOT_COPIED.has(path.basename(source)))
  });
  await mkdir(path.join(game, 'save'));

  const exceptions = [], requests = [], responses = [], urls = new Map(), waiting = new Map();
  let nextId = 0, socket = null, child = null, port = null, exited = null;

  function rejectPending(error) {
    for (const request of waiting.values()) request.reject(error);
    waiting.clear();
  }
  function launch() {
    child = spawn(executable, [game, `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, ...FLAGS], { env: nwEnvironment(), stdio: 'ignore' });
    exited = new Promise(resolve => child.once('exit', (code, signal) => {
      rejectPending(new Error(`NW.js exited (code ${code}, signal ${signal})`));
      resolve({ code, signal });
    }));
    child.once('error', rejectPending);
  }
  function call(method, params = {}) {
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { waiting.delete(id); reject(new Error(`NW.js timed out: ${method}`)); }, 20000);
      waiting.set(id, { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  function onPacket(packet) {
    if (packet.method === 'Runtime.exceptionThrown') exceptions.push(packet.params.exceptionDetails);
    if (packet.method === 'Network.requestWillBeSent') { requests.push(packet.params.request.url); urls.set(packet.params.requestId, packet.params.request.url); }
    if (packet.method === 'Network.responseReceived') responses.push({ url: packet.params.response.url, status: packet.params.response.status });
    // Arquivo ausente não gera 404 fora de HTTP: registra a falha equivalente para o mesmo contrato dos testes.
    if (packet.method === 'Network.loadingFailed' && packet.params.errorText === 'net::ERR_FILE_NOT_FOUND') responses.push({ url: urls.get(packet.params.requestId), status: 404 });
    const request = waiting.get(packet.id);
    if (!request) return;
    waiting.delete(packet.id);
    if (packet.error) request.reject(new Error(JSON.stringify(packet.error)));
    else request.resolve(packet.result);
  }
  async function attach() {
    const deadline = Date.now() + ATTACH_MS;
    let target;
    while (!target) {
      if (child.exitCode !== null || child.signalCode !== null) throw new Error(`NW.js exited before attaching (code ${child.exitCode}, signal ${child.signalCode})`);
      if (Date.now() > deadline) throw new Error('NW.js did not expose its page for debugging');
      try {
        const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        target = list.find(item => item.type === 'page' && /index\.html/.test(item.url));
      } catch { /* ainda abrindo */ }
      if (!target) await delay(100);
    }
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = () => reject(new Error('NW.js debugging connection failed')); });
    socket.onmessage = message => onPacket(JSON.parse(message.data));
    await call('Runtime.enable');
    await call('Page.enable');
    await call('Network.enable');
    await call('Network.setCacheDisabled', { cacheDisabled: true });
    await call('Page.addScriptToEvaluateOnNewDocument', { source: portugueseMessageText });
    await call('Emulation.setFocusEmulationEnabled', { enabled: true });
    await call('Emulation.setDeviceMetricsOverride', { width: options.width || 1280, height: options.height || 720, deviceScaleFactor: 1, mobile: false });
    if (typeof options.reduced === 'boolean') await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: options.reduced ? 'reduce' : 'no-preference' }] });
    // A página já abriu antes da conexão; recarrega para o script de idioma valer desde o boot.
    exceptions.length = 0;
    await call('Page.reload', { ignoreCache: true });
  }
  async function quit() {
    if (child.exitCode !== null || child.signalCode !== null) return exited;
    try { socket.send(JSON.stringify({ id: ++nextId, method: 'Runtime.evaluate', params: { expression: 'nw.App.quit()' } })); } catch { /* conexão já caiu: o prazo abaixo decide */ }
    const outcome = await Promise.race([exited, delay(QUIT_MS).then(() => null)]);
    if (outcome) return outcome;
    child.kill('SIGKILL');
    await exited;
    return { timedOut: true };
  }

  t.after(async () => {
    const outcome = await quit();
    socket?.close();
    await release();
    await rm(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    if (outcome.timedOut || outcome.code !== 0) throw new Error(`NW.js did not quit cleanly: ${JSON.stringify(outcome)}`);
  });

  port = await freePort();
  launch();
  if (broker) await fetch(broker + '/started', { method: 'POST', body: JSON.stringify({ token: reservation, pid: child.pid }) });
  await attach();

  const { evaluate, waitFor, press, screenshot } = browserControls(call, exceptions);
  async function runtimeFacts() {
    return evaluate('({versions:{nw:process.versions.nw,chromium:process.versions.chromium},mallocNanoZone:process.env.MallocNanoZone===undefined?null:process.env.MallocNanoZone})');
  }
  let facts;
  for (let attempt = 0; !facts; attempt++) {
    try { facts = await runtimeFacts(); } catch (error) { if (attempt >= 50) throw error; await delay(100); }
  }
  if (process.platform === 'darwin' && facts.mallocNanoZone !== null) throw new Error(`NW.js herdou MallocNanoZone=${facts.mallocNanoZone}`);
  if (process.env.DRYLAND_JOB_ID) await writeFile('browser-environment.json', JSON.stringify({ runtime: 'nw', executable, ...facts, game }, null, 2));

  // Reinício real do processo, com a mesma cópia e o mesmo perfil: prova a persistência em disco.
  async function reopen() {
    const outcome = await quit();
    if (outcome.timedOut || outcome.code !== 0) throw new Error(`NW.js did not quit cleanly on reopen: ${JSON.stringify(outcome)}`);
    socket.close();
    exceptions.length = 0;
    launch();
    await attach();
  }
  return { evaluate, waitFor, press, screenshot, version: facts.versions, exceptions, requests, responses, call, reopen, gameDirectory: game };
}
