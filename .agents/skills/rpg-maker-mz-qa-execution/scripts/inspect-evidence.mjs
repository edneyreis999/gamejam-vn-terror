import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { readReceipt, recordInspection } from './evidence-store.mjs';

try {
  const { values } = parseArgs({ options: { project: { type: 'string' }, record: { type: 'string' }, help: { type: 'boolean' } } });
  if (values.help) console.log('Usage: node inspect-evidence.mjs --project PATH --record INSPECTION.json. Records an inspection already performed; never generates approval. See the directed reference for fields.');
  else {
    if (!values.project || !values.record) throw new Error('--project and --record required.');
    const record = JSON.parse(await readFile(values.record, 'utf8'));
    const project = resolve(values.project); const evidenceRoot = resolve(project, record.evidenceRoot);
    const found = await readReceipt({ project, evidenceRoot, path: resolve(project, record.receiptPath) });
    const claim = found.receipt.identity.claims.find(c => c.id === record.claim.id && c.variant === record.claim.variant);
    if (!claim) throw new Error('Inspection claim absent from receipt.');
    const result = found.receipt.results.find(c => c.claimKey === claim.claimKey);
    const artifacts = result.evidence.map(path => {
      const material = found.receipt.material.find(m => m.root === 'run' && m.path === path);
      return { path, sha256: material.sha256 };
    });
    console.log(JSON.stringify(await recordInspection({ ...record, project, evidenceRoot, receiptPath: found.path, claimKey: claim.claimKey, artifacts })));
  }
} catch (error) { console.error(error.stack); process.exitCode = 1; }
