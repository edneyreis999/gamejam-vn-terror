export class EvidenceError extends Error {
  constructor(reason, message) { super(message); this.name = 'EvidenceError'; this.reason = reason; }
}

export function canonical(value) {
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  throw new EvidenceError('incomplete-dependencies', 'Identity requires finite JSON values without undefined fields.');
}

export function validateRequest(request) {
  if (!request || request.schemaVersion !== 1) throw new Error('Request schemaVersion must be 1.');
  for (const key of ['spec', 'requestId', 'consumer', 'case', 'adapter']) {
    if (typeof request[key] !== 'string' || !request[key].trim()) throw new Error(`Request ${key} required.`);
  }
  if (!request.scenario || !['id', 'profile', 'variant', 'configuration'].every(k => typeof request.scenario[k] === 'string')) throw new Error('Request scenario requires id/profile/variant/configuration.');
  if (!Array.isArray(request.claims) || !request.claims.length) throw new Error('Request claims required.');
  const seen = new Set();
  for (const claim of request.claims) {
    if (!['id', 'variant', 'sensor', 'group'].every(k => typeof claim[k] === 'string' && claim[k]) ||
        !claim.source?.id || !claim.source?.variant || !claim.expected?.path) throw new Error('Incomplete claim contract.');
    const key = `${claim.id}:${claim.variant}:${claim.sensor}`;
    if (seen.has(key)) throw new Error('Duplicate requested claim.');
    seen.add(key);
  }
  if (request.freshness && !['reuse', 'fresh'].includes(request.freshness.mode)) throw new Error('Invalid freshness mode.');
  if (request.freshness?.mode === 'fresh' && !request.freshness.reason) throw new Error('Fresh collection requires a reason.');
  for (const [name, duration] of Object.entries(request.budgets ?? {})) {
    if (!['lookupMs', 'waitMs'].includes(name) || !Number.isFinite(duration) || duration <= 0 || duration > 300000) throw new Error('Budgets must be finite, positive and at most five minutes.');
  }
  if (request.evidenceRoot !== undefined && (typeof request.evidenceRoot !== 'string' || !request.evidenceRoot)) throw new Error('Invalid evidenceRoot.');
  canonical(request);
  return request;
}
