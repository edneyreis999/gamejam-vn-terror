import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { ensureDirectory, publishExclusive } from './evidence-store.mjs';
import { EvidenceError, sha256, canonical } from './evidence-identity.mjs';

const seal = body => ({ ...body, checksum: sha256(canonical(body)) });
async function readRecord(path) {
  const { checksum, ...body } = JSON.parse(await readFile(path, 'utf8'));
  if (body.schemaVersion !== 1 || checksum !== sha256(canonical(body))) throw new EvidenceError('artifact-corrupt', 'Invalid coordination record.');
  return body;
}
function alive(pid) {
  if (!Number.isSafeInteger(pid) || pid <= 0) throw new Error('Invalid producer process.');
  try { process.kill(pid, 0); return true; }
  catch (error) { if (error.code === 'ESRCH') return false; throw error; }
}

export async function reserve({ project, evidenceRoot, identity, owner, afterGeneration }) {
  const directory = await ensureDirectory(project, join(evidenceRoot, '.receipts/reservations', identity.executionKey));
  while (true) {
    const names = (await readdir(directory)).filter(name => /^\d{8}\.json$/.test(name)).sort();
    let sequence = 0;
    if (names.length) {
      const path = join(directory, names.at(-1));
      const previous = await readRecord(path);
      let terminal;
      try { terminal = await readRecord(`${path}.result`); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (!terminal) {
        // A dead coordinator alone does not prove that its collection child stopped.
        // Without an explicit terminal record consumers use isolated ordinary QA.
        return { owner: false, path, record: previous, state: alive(previous.pid) ? 'active' : 'owner-ended-without-cleanup' };
      }
      if (afterGeneration !== previous.generation) return { owner: false, path, record: previous, state: 'completed', terminal };
      sequence = previous.sequence + 1;
    }
    const record = { schemaVersion: 1, sequence, generation: randomUUID(), executionKey: identity.executionKey, ...owner, createdAt: new Date().toISOString() };
    const path = join(directory, `${String(sequence).padStart(8, '0')}.json`);
    try { await publishExclusive(path, seal(record)); return { owner: true, path, record, state: 'active' }; }
    catch (error) { if (error.code !== 'EEXIST') throw error; }
  }
}

export async function recordActivity({ reservation, owner, phase }) {
  const record = await readRecord(reservation.path);
  if (record.generation !== reservation.record.generation || record.pid !== owner.pid || record.token !== owner.token || phase !== 'prepared') throw new Error('Invalid producer activity owner or phase.');
  await publishExclusive(`${reservation.path}.${phase}`, seal({ schemaVersion: 1, generation: record.generation, phase, updatedAt: new Date().toISOString() }));
  return { phase };
}

export async function completeReservation({ reservation, owner, result, material }) {
  const record = await readRecord(reservation.path);
  if (record.generation !== reservation.record.generation || record.pid !== owner.pid || record.token !== owner.token) throw new Error('Only the reservation owner can finish it.');
  const terminal = { schemaVersion: 1, generation: record.generation, updatedAt: new Date().toISOString(), result, ...(material ? { material } : {}) };
  await publishExclusive(`${reservation.path}.result`, seal(terminal));
  return terminal;
}

export async function waitForProducer({ reservation, waitMs }) {
  const deadline = Date.now() + waitMs;
  do {
    try {
      const terminal = await readRecord(`${reservation.path}.result`);
      if (terminal.generation !== reservation.record.generation) throw new Error('Producer generation changed.');
      return { state: 'completed', terminal };
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (!alive(reservation.record.pid)) return { state: 'owner-ended-without-cleanup' };
    await delay(Math.min(100, Math.max(1, deadline - Date.now())));
  } while (Date.now() < deadline);
  return { state: 'expired' };
}
