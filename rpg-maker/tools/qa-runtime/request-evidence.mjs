import { fork, spawn } from 'node:child_process';
import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises';
import { dirname, join, resolve, relative, isAbsolute, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';
import { parseArgs } from 'node:util';
import { validateRequest } from './request-contract.mjs';

const directory = dirname(fileURLToPath(import.meta.url));
const inside = (root, path) => { const part = relative(root, path); return part !== '..' && !part.startsWith('../') && !isAbsolute(part); };

export function optionalOperation(input, { workerFile = join(directory, 'evidence-worker.mjs'), budget = 15000 } = {}) {
  return new Promise((resolveOperation, reject) => {
    const child = fork(workerFile, [], { stdio: ['ignore', 'ignore', 'pipe', 'ipc'], execArgv: [] });
    let result, errors = '', timedOut = false;
    child.stderr.on('data', bytes => { errors = (errors + bytes).slice(-12000); });
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, budget);
    child.on('message', message => { result = message; });
    child.on('error', error => { clearTimeout(timer); reject(error); });
    child.on('exit', code => {
      clearTimeout(timer);
      if (timedOut) reject(Object.assign(new Error('Optional evidence operation exceeded its budget.'), { reason: 'optimization-error' }));
      else if (code !== 0 || !result) reject(new Error(`Optional evidence worker failed: ${errors || code}`));
      else if (result.error) reject(Object.assign(new Error(result.error.message), { reason: result.error.reason }));
      else resolveOperation(result.value);
    });
    child.send(input);
  });
}

async function safeDirectory(project, path) {
  path = resolve(project, path);
  let ancestor = path;
  while (true) {
    try { path = resolve(await realpath(ancestor), relative(ancestor, path)); break; }
    catch (error) { if (error.code !== 'ENOENT') throw error; ancestor = dirname(ancestor); }
  }
  if (!inside(project, path)) throw new Error('QA destination outside project.');
  await mkdir(path, { recursive: true });
  return path;
}

function runProcess(file, args, { project, log }) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, [file, ...args], { cwd: project, env: { ...process.env, CORETO_QA_PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '', stdout = '';
    child.stdout.on('data', bytes => { stdout += bytes; });
    for (const stream of [child.stdout, child.stderr]) stream.on('data', bytes => { output += bytes; });
    child.on('error', reject);
    child.on('close', async (code, signal) => {
      const result = { code, signal, pid: child.pid, stdout };
      try { await writeFile(log, output, { flag: 'wx' }); }
      catch (error) { result.logError = error.message; console.error(`QA process log unavailable: ${error.message}\n${output}`); }
      resolveRun(result);
    });
  });
}

export async function runRequest({ project, request, workerFile, prepareFile = join(directory, 'normal-evidence.mjs'), runnerFile = join(directory, 'directed-browser.mjs') }) {
  project = await realpath(project);
  validateRequest(request);
  for (const field of ['spec', 'case', 'adapter']) if (!inside(project, await realpath(resolve(project, request[field])))) throw new Error(`Request ${field} outside project.`);
  const defaultRoot = join(project, 'docs/qa/runs', basename(dirname(request.spec)));
  const evidenceRoot = resolve(project, request.evidenceRoot ?? defaultRoot);
  const diagnostics = [];
  const limitation = (stage, error) => {
    const detail = { stage, reason: error.reason ?? 'optimization-error', message: error.message };
    diagnostics.push(detail); console.error(JSON.stringify({ evidenceLimitation: detail }));
  };
  const budget = request.budgets?.lookupMs ?? 15000;
  const options = { workerFile, budget: Number.isFinite(budget) && budget > 0 && budget <= 300000 ? budget : 15000 };
  const runId = randomUUID();
  const owner = { pid: process.pid, token: randomUUID(), runId, consumer: request.consumer };
  const input = { project, request, evidenceRoot, owner };
  let resolution, reservation, shared = false;
  const finish = async result => {
    try { result.accounting = await optionalOperation({ ...input, action: 'finish', identity: resolution?.identity, result }, options); }
    catch (error) { limitation('decision-record', error); }
    return result;
  };
  try { resolution = await optionalOperation({ ...input, action: 'resolve' }, options); diagnostics.push(...resolution.diagnostics ?? []); }
  catch (error) { limitation('lookup', error); }
  if (resolution?.identity && !resolution.complete && resolution.reason !== 'forced-fresh') {
    try {
      reservation = await optionalOperation({ ...input, action: 'reserve', identity: resolution.identity }, options);
      if (reservation.owner) console.error(JSON.stringify({ evidenceProducer: { runId, consumer: request.requestId } }));
      if (!reservation.owner) {
        const requestedWait = request.budgets?.waitMs ?? 30000;
        const waitMs = Number.isFinite(requestedWait) && requestedWait > 0 && requestedWait <= 300000 ? requestedWait : 30000;
        console.error(JSON.stringify({ evidenceWait: { producer: reservation.record.runId, consumer: request.requestId } }));
        const waited = reservation.state === 'completed' ? reservation : await optionalOperation({ ...input, action: 'wait', reservation, waitMs }, { ...options, budget: waitMs + 1000 });
        if (waited.state === 'completed') {
          const current = await optionalOperation({ ...input, action: 'resolve' }, options);
          if (current.identity.executionKey !== resolution.identity.executionKey) throw Object.assign(new Error('Inputs changed during shared collection.'), { reason: 'dependency-changed' });
          if (reservation.state === 'active' && waited.terminal.result.status === 'fail') {
            await optionalOperation({ ...input, action: 'verify-failure', material: waited.terminal.material }, options);
            return finish({ ...waited.terminal.result, requestId: request.requestId, consumer: request.consumer, mode: 'shared', reason: 'shared-completed', diagnostics, metrics: { collections: 0, avoidedCollections: 1, reusedInspections: 0 } });
          }
          resolution = current; shared = current.complete;
          if (!current.complete) reservation = await optionalOperation({ ...input, action: 'reserve', identity: current.identity, afterGeneration: reservation.record.generation }, options);
        } else {
          resolution.reason = 'wait-budget-exhausted';
          limitation('coordination', Object.assign(new Error(waited.state === 'expired' ? 'Producer wait budget exhausted.' : 'Previous producer ended without confirmed child cleanup; using isolated ordinary QA.'), { reason: 'wait-budget-exhausted' }));
        }
      }
    } catch (error) { limitation('coordination', error); }
  }
  if (resolution?.complete) {
    const claims = resolution.retained.map(item => ({ id: item.claim.id, variant: item.claim.variant, runId: item.receipt.runId,
      receipt: item.path, inspection: item.review?.path ?? null,
      status: item.review?.inspection.decision ?? (item.claim.review || item.claim.sensor.includes('visual') ? 'executed-awaiting-review' : item.receipt.results.find(c => c.claimKey === item.claim.claimKey).status) }));
    return finish({ schemaVersion: 1, requestId: request.requestId, consumer: request.consumer, mode: shared ? 'shared' : 'reused', reason: 'shared-completed',
      status: claims.some(c => c.status === 'fail') ? 'fail' : claims.every(c => c.status === 'pass') ? 'pass' : 'executed-awaiting-review', claims, diagnostics,
      metrics: { collections: 0, avoidedCollections: 1, reusedInspections: claims.filter(c => c.inspection).length } });
  }
  let fixture = join(project, '.artifacts/qa-fixtures', basename(dirname(request.spec)), runId);
  const allocate = async root => {
    root = await safeDirectory(project, root);
    const output = join(await safeDirectory(project, join(root, 'runs')), runId);
    const invocation = join(await safeDirectory(project, join(root, 'requests')), runId);
    await mkdir(invocation);
    const inputPath = join(invocation, 'input.json');
    await writeFile(inputPath, JSON.stringify({ ...input, fixture, output }, null, 2), { flag: 'wx' });
    return { output, invocation, inputPath };
  };
  let locations;
  try { locations = await allocate(evidenceRoot); }
  catch (error) {
    limitation('store-directory', error); resolution = null;
    locations = await allocate(evidenceRoot === defaultRoot ? join(project, '.artifacts/qa-normal-output', basename(dirname(request.spec))) : defaultRoot);
  }
  const { output, invocation, inputPath } = locations;
  const prep = await runProcess(prepareFile, [inputPath], { project, log: join(invocation, 'prepare.log') });
  if (prep.code === 0) {
    fixture = await realpath(JSON.parse(prep.stdout.trim().split('\n').at(-1)).fixture);
    if (!inside(project, fixture) || fixture === project) throw new Error('Prepared fixture outside isolated project inputs.');
    if (reservation?.owner) {
      try { await optionalOperation({ ...input, action: 'activity', reservation, phase: 'prepared' }, options); }
      catch (error) { limitation('producer-activity', error); }
    }
  }
  const result = { schemaVersion: 1, requestId: request.requestId, consumer: request.consumer, runId, mode: 'collected',
    reason: resolution?.reason ?? 'optimization-error', fixture, output, diagnostics, processes: { prepare: prep },
    retained: resolution?.retained.map(item => ({ claim: item.claim.id, receipt: item.path })) ?? [],
    metrics: { collections: 0, avoidedCollections: 0, reusedInspections: 0 } };
  let checked;
  if (prep.code === 0 && resolution) {
    try { checked = await optionalOperation({ ...input, action: 'check', identity: resolution.identity, fixture }, options); }
    catch (error) { limitation('after-prepare', error); }
  }
  if (prep.code !== 0) result.status = 'fail';
  else {
    result.metrics.collections = 1;
    result.processes.browser = await runProcess(runnerFile, ['--project', project, '--fixture', fixture, '--case', resolve(project, request.case), '--adapter', resolve(project, request.adapter), '--output', output], { project, log: join(invocation, 'browser.log') });
    try { result.status = JSON.parse(await readFile(join(output, 'report.json'), 'utf8')).status; }
    catch (error) { result.status = 'fail'; limitation('normal-report', error); }
    if (result.processes.browser.code !== 0) result.status = 'fail';
    if (result.status === 'pass' && request.claims.some(claim => claim.review || claim.sensor.includes('visual'))) result.status = 'executed-awaiting-review';
    if (checked && result.status !== 'fail') {
      try { result.receipt = (await optionalOperation({ ...input, action: 'publish', identity: checked.identity, prepared: checked.prepared, fixture, output, runId }, options)).path; }
      catch (error) { limitation('publication', error); }
    }
  }
  result.resultPath = join(invocation, 'result.json');
  if (reservation?.owner) {
    try { await optionalOperation({ ...input, action: 'complete', reservation, result }, options); }
    catch (error) { limitation('coordination-publication', error); }
  }
  await finish(result);
  try { await writeFile(result.resultPath, `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx' }); }
  catch (error) { limitation('result-record', error); delete result.resultPath; }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const { values } = parseArgs({ options: { project: { type: 'string' }, request: { type: 'string' }, help: { type: 'boolean' } } });
    if (values.help) console.log('Usage: node request-evidence.mjs --project PATH --request REQUEST.json. Materialize the request from the resolved QA contract. Exit 0: collected/reused; inspect status and pending reviews. Exit 1: normal QA failure.');
    else {
      if (!values.project || !values.request) throw new Error('--project and --request required.');
      const result = await runRequest({ project: values.project, request: JSON.parse(await readFile(values.request, 'utf8')) });
      console.log(JSON.stringify(result)); if (result.status === 'fail') process.exitCode = 1;
    }
  } catch (error) { console.error(error.stack); process.exitCode = 1; }
}
