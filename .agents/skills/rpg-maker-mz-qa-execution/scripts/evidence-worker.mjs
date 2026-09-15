import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { identify, sameIdentity, collectionRequired, EvidenceError, canonical, sha256 } from './evidence-identity.mjs';
import { describeEnvironment } from './evidence-environment.mjs';
import { findEvidence, publishReceipt, ensureDirectory, publishExclusive, failedCollectionMaterial, verifyFailedCollection } from './evidence-store.mjs';
import { reserve, completeReservation, waitForProducer, recordActivity } from './evidence-coordination.mjs';

const sensorRoot = dirname(dirname(fileURLToPath(import.meta.url)));

export async function operation(input) {
  const { project, request, evidenceRoot } = input;
  if (input.action === 'reserve') return reserve(input);
  if (input.action === 'wait') return waitForProducer(input);
  if (input.action === 'complete') {
    const material = input.result.status === 'fail' ? await failedCollectionMaterial(input) : undefined;
    return completeReservation({ ...input, material });
  }
  if (input.action === 'verify-failure') return verifyFailedCollection(input);
  if (input.action === 'activity') return recordActivity(input);
  if (input.action === 'finish') {
    const key = sha256(canonical({ requestId: request.requestId, spec: request.spec, context: input.identity?.executionKey ?? input.result.runId }));
    const directory = await ensureDirectory(project, resolve(evidenceRoot, '.receipts/decisions'));
    const path = resolve(directory, `${key}.json`);
    try { await publishExclusive(path, input.result); return { path, accounted: true }; }
    catch (error) { if (error.code !== 'EEXIST') throw error; return { path, accounted: false }; }
  }
  const adapter = await import(pathToFileURL(resolve(project, request.adapter)).href);
  const caseModule = await import(pathToFileURL(resolve(project, request.case)).href);
  const descriptor = await adapter.describeRequest?.({ project, request });
  const environment = await describeEnvironment(caseModule.scenario.browser);
  const current = () => identify({ project, request, descriptor, environment, sensorRoot });
  const identity = await current();
  if (input.identity && !sameIdentity(identity, input.identity)) throw new EvidenceError('dependency-changed', 'Inputs changed across preparation or collection.');
  if (input.action === 'resolve') {
    if (collectionRequired(request)) return { identity, reason: 'forced-fresh', complete: false, retained: [] };
    const found = await findEvidence({ project, request, evidenceRoot, identity });
    if (!sameIdentity(identity, await current())) throw new EvidenceError('dependency-changed', 'Inputs changed during lookup.');
    return { ...found, identity };
  }
  const prepared = await adapter.describePrepared({ project, fixture: input.fixture, request });
  if (JSON.stringify(prepared.recipe) !== JSON.stringify(descriptor.recipe)) throw new EvidenceError('dependency-changed', 'Prepared recipe mismatch.');
  if (input.action === 'check') return { identity, prepared };
  if (input.action === 'publish') {
    if (JSON.stringify(prepared) !== JSON.stringify(input.prepared)) throw new EvidenceError('dependency-changed', 'Prepared inputs changed during collection.');
    const report = JSON.parse(await readFile(resolve(input.output, 'report.json'), 'utf8'));
    if (report.environment?.browser !== environment.installation.version || report.environment?.node !== environment.node) throw new EvidenceError('dependency-changed', 'Executed browser/Node differs from the installed environment.');
    const result = await publishReceipt({ ...input, identity, prepared });
    return { path: result.path, runId: result.receipt.runId };
  }
  throw new Error('Unknown evidence operation.');
}

if (process.send) process.once('message', async input => {
  try { process.send({ value: await operation(input) }, () => process.disconnect()); }
  catch (error) { process.send({ error: { reason: error.reason ?? 'optimization-error', message: error.message } }, () => process.disconnect()); }
});
