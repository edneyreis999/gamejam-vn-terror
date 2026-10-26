import { mkdir, readFile, open, link, unlink, readdir, realpath } from 'node:fs/promises';
import { resolve, join, dirname, relative, basename } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { EvidenceError, canonical, sha256, inside, childPath, fileDigest, inventory } from './evidence-identity.mjs';

const digest = value => sha256(canonical(value));
const sealed = value => ({ ...value, checksum: digest(value) });

export async function ensureDirectory(project, path) {
  project = await realpath(project); path = resolve(project, path);
  let ancestor = path;
  while (true) {
    try {
      path = resolve(await realpath(ancestor), relative(ancestor, path));
      if (!inside(project, path)) throw new EvidenceError('optimization-error', 'Evidence path escapes the configured project.');
      break;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      ancestor = dirname(ancestor);
    }
  }
  await mkdir(path, { recursive: true });
  return realpath(path);
}

export async function publishExclusive(path, value) {
  const temporary = join(dirname(path), `.${basename(path)}.${randomUUID()}.tmp`);
  const handle = await open(temporary, 'wx');
  try {
    try { await handle.writeFile(`${JSON.stringify(value, null, 2)}\n`); await handle.sync(); }
    finally { await handle.close(); }
    await link(temporary, path);
  } finally { await unlink(temporary); }
  return path;
}

async function readSealed(path) {
  let value;
  try { value = JSON.parse(await readFile(path, 'utf8')); }
  catch (error) { throw new EvidenceError(error.code === 'ENOENT' ? 'artifact-missing' : 'artifact-corrupt', `Unreadable record ${path}: ${error.message}`); }
  if (value?.schemaVersion !== 1) throw new EvidenceError('schema-unsupported', `Unsupported evidence schema: ${path}`);
  const { checksum, ...body } = value;
  if (checksum !== digest(body)) throw new EvidenceError('artifact-corrupt', `Record checksum mismatch: ${path}`);
  return body;
}

async function contained(root, path) {
  let actual;
  try { actual = await realpath(childPath(root, path)); }
  catch (error) { if (error.code === 'ENOENT') throw new EvidenceError('artifact-missing', `Missing evidence: ${path}`); throw error; }
  if (!inside(await realpath(root), actual)) throw new EvidenceError('artifact-corrupt', `Evidence escapes its root: ${path}`);
  return actual;
}

function assertReceipt(receipt) {
  const identity = receipt.identity;
  if (!receipt.runId || !receipt.spec || !receipt.createdAt || !receipt.fixture || !receipt.producer ||
      !receipt.prepared || !identity?.executionKey || !Array.isArray(identity.claims) || !identity.claims.length ||
      !Array.isArray(receipt.material) || !receipt.material.length || !Array.isArray(receipt.results) ||
      !['pass', 'executed-awaiting-review'].includes(receipt.status)) throw new EvidenceError('artifact-corrupt', 'Incomplete receipt.');
  const { executionKey, ...context } = identity;
  if (digest(context) !== executionKey || identity.spec !== receipt.spec) throw new EvidenceError('artifact-corrupt', 'Receipt identity mismatch.');
  if (!receipt.material.some(m => m.root === 'run' && m.path === 'report.json') || !receipt.material.some(m => m.root === 'fixture' && m.path === 'fixture-manifest.json')) {
    throw new EvidenceError('artifact-corrupt', 'Receipt is missing its report or fixture inputs.');
  }
  for (const claim of identity.claims) {
    const result = receipt.results.find(r => r.claimKey === claim.claimKey);
    if (!result || !['pass', 'executed-awaiting-review'].includes(result.status) || !Array.isArray(result.evidence) || !result.evidence.length) {
      throw new EvidenceError('artifact-corrupt', 'Missing or failed collection claim.');
    }
    if (result.evidence.some(path => !receipt.material.some(m => m.root === 'run' && m.path === path))) throw new EvidenceError('artifact-corrupt', 'Claim references missing material.');
  }
}

export async function publishReceipt({ project, evidenceRoot, output, fixture, request, identity, prepared, runId }) {
  project = await realpath(project); evidenceRoot = await ensureDirectory(project, evidenceRoot);
  output = await realpath(output); fixture = await realpath(fixture);
  if (!inside(evidenceRoot, output) || inside(fixture, output) || !inside(project, fixture)) throw new EvidenceError('optimization-error', 'Receipt locations outside the run/project.');
  const report = JSON.parse(await readFile(join(output, 'report.json'), 'utf8'));
  if (!['pass', 'executed-awaiting-review'].includes(report.status) || report.failure || report.cleanup?.some(item => item.status !== 'closed') || !report.finishedAt) {
    throw new EvidenceError('incomplete-dependencies', 'Only completed collection with successful cleanup can publish a reusable receipt.');
  }
  const results = identity.claims.map(claim => {
    const source = report.criteria.find(r => r.id === claim.source.id && r.variant === claim.source.variant);
    if (!source) throw new EvidenceError('incomplete-dependencies', 'Requested native claim missing from report.');
    return { ...source, claimKey: claim.claimKey };
  });
  const material = [];
  const dependencyRoots = { project, sensor: dirname(dirname(fileURLToPath(import.meta.url))) };
  const boundSources = new Map();
  for (const group of identity.groups) for (const file of group.files) if (file.type === 'file') {
    boundSources.set(resolve(dependencyRoots[group.root], group.path, file.path), file.sha256);
  }
  const names = new Set(['report.json', ...report.sources.map(source => source.path), ...report.checkpoints.map(shot => shot.path)]);
  for (const path of names) material.push({ root: 'run', path, ...await fileDigest(await contained(output, path)) });
  for (const source of report.sources) {
    const original = source.originalPath && await realpath(source.originalPath);
    if (!original || boundSources.get(original) !== source.sha256 || (await fileDigest(original)).sha256 !== source.sha256 || material.find(m => m.root === 'run' && m.path === source.path)?.sha256 !== source.sha256) {
      throw new EvidenceError('dependency-changed', 'Captured source is not bound to its actual original bytes.');
    }
  }
  const declared = new Set(report.files.map(file => file.path));
  const outputs = identity.policy.outputs ?? [];
  const inDirectory = (path, directory) => path === directory || path.startsWith(`${directory}/`);
  const actual = (await inventory(fixture, { path: '.' })).filter(file => file.type === 'file').filter(file =>
    declared.has(file.path) || !outputs.some(path => inDirectory(file.path, path) && report.descriptor?.mutablePaths?.includes(path)));
  if (actual.length !== declared.size || actual.some(file => !declared.has(file.path))) throw new EvidenceError('dependency-changed', 'Fixture membership differs from executed inputs.');
  for (const file of actual) {
    if (report.files.find(entry => entry.path === file.path)?.sha256 !== file.sha256) throw new EvidenceError('dependency-changed', `Fixture changed after execution: ${file.path}`);
    material.push({ root: 'fixture', path: file.path, size: file.size, sha256: file.sha256 });
  }
  const receipt = { schemaVersion: 1, runId, spec: request.spec, createdAt: report.finishedAt, producer: request.consumer,
    fixture: relative(project, fixture), identity, prepared, status: report.status, results, material,
    collection: { startedAt: report.startedAt, finishedAt: report.finishedAt, durationMs: report.durationMs, environment: report.environment, cleanup: report.cleanup } };
  assertReceipt(receipt);
  const receiptPath = join(output, 'receipt.json');
  await publishExclusive(receiptPath, sealed(receipt));
  const index = await ensureDirectory(project, join(evidenceRoot, '.receipts/index'));
  await publishExclusive(join(index, `${runId}.json`), sealed({ schemaVersion: 1, path: relative(evidenceRoot, receiptPath) }));
  return { receipt, path: receiptPath };
}

export async function readReceipt({ project, evidenceRoot, path }) {
  const absolute = await contained(evidenceRoot, relative(evidenceRoot, resolve(evidenceRoot, path)));
  const receipt = await readSealed(absolute); assertReceipt(receipt);
  const fixture = await contained(project, receipt.fixture);
  const roots = { run: dirname(absolute), fixture };
  for (const item of receipt.material) {
    if (!roots[item.root] || !Number.isSafeInteger(item.size) || item.size < 0 || !/^[a-f0-9]{64}$/.test(item.sha256)) throw new EvidenceError('artifact-corrupt', 'Invalid material manifest.');
    let hash;
    try { hash = await fileDigest(await contained(roots[item.root], item.path)); }
    catch (error) { throw new EvidenceError(error.code === 'ENOENT' || error.reason === 'artifact-missing' ? 'artifact-missing' : 'artifact-corrupt', error.message); }
    if (hash.sha256 !== item.sha256 || hash.size !== item.size) throw new EvidenceError('artifact-corrupt', `Changed evidence: ${item.path}`);
  }
  return { receipt, path: absolute };
}

export async function failedCollectionMaterial({ project, result }) {
  const material = [];
  for (const root of [dirname(result.resultPath), result.output, result.fixture]) {
    const prefix = relative(project, root);
    if (!prefix) throw new EvidenceError('artifact-corrupt', 'Failure material cannot include the project root.');
    for (const file of await inventory(project, { path: prefix, optional: true })) {
      if (file.type === 'file') material.push({ path: join(prefix, file.path), size: file.size, sha256: file.sha256 });
    }
  }
  if (!material.length) throw new EvidenceError('artifact-missing', 'Failed collection has no diagnostic material.');
  return material;
}

export async function verifyFailedCollection({ project, material }) {
  if (!Array.isArray(material) || !material.length) throw new EvidenceError('artifact-missing', 'Failed collection has no bound material.');
  for (const item of material) {
    const actual = await fileDigest(await contained(project, item.path));
    if (actual.size !== item.size || actual.sha256 !== item.sha256) throw new EvidenceError('artifact-corrupt', `Changed failure evidence: ${item.path}`);
  }
  return true;
}

async function receiptPaths(project, evidenceRoot) {
  const index = await ensureDirectory(project, join(evidenceRoot, '.receipts/index'));
  const paths = new Set(); let damaged = false;
  for (const name of (await readdir(index)).sort()) {
    if (!name.endsWith('.json')) continue;
    try {
      const entry = await readSealed(await contained(index, name));
      paths.add(await contained(evidenceRoot, entry.path));
    } catch { damaged = true; }
  }
  // Publication can finish before its index entry, even when other entries exist.
  {
    const runs = join(evidenceRoot, 'runs');
    let names;
    try { names = await readdir(runs, { withFileTypes: true }); }
    catch (error) { if (error.code !== 'ENOENT') throw error; names = []; }
    for (const name of names) if (name.isDirectory()) {
      try { paths.add(await contained(evidenceRoot, `runs/${name.name}/receipt.json`)); }
      catch (error) { if (error.reason !== 'artifact-missing') throw error; }
    }
  }
  return { paths: [...paths], indexDamaged: damaged };
}

export async function recordInspection({ project, evidenceRoot, receiptPath, claimKey, reviewer, decision, observations, artifacts, requestId }) {
  const { receipt, path } = await readReceipt({ project, evidenceRoot, path: receiptPath });
  const claim = receipt.identity.claims.find(c => c.claimKey === claimKey);
  const result = receipt.results.find(c => c.claimKey === claimKey);
  if (!claim || !reviewer?.id || !['agent', 'human'].includes(reviewer.kind) || !['pass', 'fail'].includes(decision) || typeof observations !== 'string' || !observations.trim() || !requestId) throw new Error('Inspection requires a real reviewer, claim, decision, observations and request.');
  const expected = result.evidence.map(p => receipt.material.find(m => m.root === 'run' && m.path === p)).map(m => ({ path: m.path, sha256: m.sha256 })).sort((a, b) => a.path.localeCompare(b.path));
  if (!Array.isArray(artifacts) || canonical([...artifacts].sort((a, b) => a.path.localeCompare(b.path))) !== canonical(expected)) throw new Error('Inspection must identify exactly the required artifact bytes.');
  const directory = await ensureDirectory(project, join(dirname(path), 'inspections'));
  const inspection = { schemaVersion: 1, id: randomUUID(), runId: receipt.runId, claimKey, expectedHash: claim.expected.sha256, reviewer, decision, observations, artifacts, requestId, createdAt: new Date().toISOString() };
  const inspectionPath = await publishExclusive(join(directory, `${inspection.id}.json`), sealed(inspection));
  return { inspection, path: inspectionPath };
}

function assertInspection(inspection, receipt) {
  const claim = receipt.identity.claims.find(c => c.claimKey === inspection.claimKey);
  const result = receipt.results.find(c => c.claimKey === inspection.claimKey);
  if (!claim || !result || inspection.runId !== receipt.runId || inspection.expectedHash !== claim.expected.sha256 ||
      !inspection.id || !inspection.requestId || !Number.isFinite(Date.parse(inspection.createdAt)) ||
      !inspection.reviewer?.id || !['agent', 'human'].includes(inspection.reviewer.kind) ||
      !['pass', 'fail'].includes(inspection.decision) || typeof inspection.observations !== 'string' || !inspection.observations.trim() || !Array.isArray(inspection.artifacts)) {
    throw new EvidenceError('artifact-corrupt', 'Incomplete or incompatible inspection.');
  }
  const expected = result.evidence.map(path => receipt.material.find(m => m.root === 'run' && m.path === path)).map(m => ({ path: m.path, sha256: m.sha256 }));
  const ordered = values => [...values].sort((a, b) => a.path.localeCompare(b.path));
  if (canonical(ordered(inspection.artifacts)) !== canonical(ordered(expected))) throw new EvidenceError('artifact-corrupt', 'Inspection material mismatch.');
}

async function applicableInspection(found, claim, requestId) {
  const directory = join(dirname(found.path), 'inspections');
  let names;
  try { names = await readdir(directory); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  const candidates = [];
  for (const name of names) {
    if (!name.endsWith('.json')) continue;
    const path = await contained(directory, name);
    const inspection = await readSealed(path);
    assertInspection(inspection, found.receipt);
    if (inspection.runId !== found.receipt.runId || inspection.claimKey !== claim.claimKey || inspection.expectedHash !== claim.expected.sha256) continue;
    if (claim.review?.requireNew && inspection.requestId !== requestId) continue;
    if (claim.review?.kind && inspection.reviewer.kind !== claim.review.kind) continue;
    if (claim.review?.independentFrom?.includes(inspection.reviewer.id)) continue;
    candidates.push({ inspection, path });
  }
  candidates.sort((a, b) => Number(b.inspection.decision === 'fail') - Number(a.inspection.decision === 'fail') || b.inspection.createdAt.localeCompare(a.inspection.createdAt));
  return candidates[0] ?? null;
}

export async function findEvidence({ project, evidenceRoot, identity, request }) {
  project = await realpath(project); evidenceRoot = await ensureDirectory(project, evidenceRoot);
  const { paths, indexDamaged } = await receiptPaths(project, evidenceRoot);
  const found = []; const diagnostics = []; let reason = paths.length ? 'dependency-changed' : 'no-receipt';
  if (indexDamaged) diagnostics.push({ reason: 'optimization-error', stage: 'index', message: 'Damaged index; using published local receipts.' });
  for (const path of paths) {
    try {
      const entry = await readReceipt({ project, evidenceRoot, path });
      if (entry.receipt.spec === identity.spec) found.push(entry);
    } catch (error) { reason = error.reason ?? 'optimization-error'; diagnostics.push({ reason, path, message: error.message }); }
  }
  const retained = [];
  for (const group of new Set(identity.claims.map(claim => claim.group))) {
    const claims = identity.claims.filter(claim => claim.group === group);
    const candidates = [];
    for (const entry of found.filter(candidate => claims.every(claim => candidate.receipt.identity.claims.some(c => c.claimKey === claim.claimKey)))) {
      const items = [];
      for (const claim of claims) items.push({ claim, ...entry, review: await applicableInspection(entry, claim, request.requestId) });
      candidates.push(items);
    }
    const failures = items => items.filter(item => item.review?.inspection.decision === 'fail').length;
    const reviewed = items => items.filter(item => item.review).length;
    candidates.sort((a, b) => failures(b) - failures(a) || reviewed(b) - reviewed(a));
    if (candidates[0]) retained.push(...candidates[0]);
  }
  return { complete: retained.length === identity.claims.length, retained, reason, diagnostics };
}
