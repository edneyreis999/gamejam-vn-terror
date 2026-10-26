import { EvidenceError, canonical, validateRequest } from './request-contract.mjs';
export { EvidenceError, canonical, validateRequest } from './request-contract.mjs';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { lstat, readdir, readFile, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute, join } from 'node:path';

export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const inside = (root, path) => {
  const part = relative(root, path);
  return part !== '..' && !part.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) && !isAbsolute(part);
};

export function childPath(root, name) {
  if (typeof name !== 'string' || !name || isAbsolute(name) || !inside(root, resolve(root, name))) {
    throw new EvidenceError('incomplete-dependencies', `Path outside declared root: ${name}`);
  }
  return resolve(root, name);
}

export async function fileDigest(path) {
  const before = await lstat(path, { bigint: true });
  if (!before.isFile()) throw new EvidenceError('incomplete-dependencies', `Regular file required: ${path}`);
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  const after = await lstat(path, { bigint: true });
  if (before.ino !== after.ino || before.size !== after.size || before.mtimeNs !== after.mtimeNs || before.ctimeNs !== after.ctimeNs) {
    throw new EvidenceError('dependency-changed', `File changed during read: ${path}`);
  }
  return { size: Number(after.size), sha256: hash.digest('hex') };
}

// Directory membership is part of the fingerprint, including an absent optional root.
export async function inventory(root, entry) {
  root = await realpath(root);
  const path = childPath(root, entry.path);
  const excluded = entry.exclude ?? [];
  if (!Array.isArray(excluded) || excluded.some(p => typeof p !== 'string' || p.includes('..') || isAbsolute(p))) {
    throw new EvidenceError('incomplete-dependencies', 'Invalid dependency exclusions.');
  }
  const files = [];
  async function walk(current, subpath) {
    if (excluded.some(p => subpath === p || subpath.startsWith(`${p}/`))) return;
    const info = await lstat(current);
    if (info.isSymbolicLink() || !inside(root, await realpath(current))) {
      throw new EvidenceError('incomplete-dependencies', `Unmodelled symlink: ${current}`);
    }
    if (info.isDirectory()) {
      const members = (await readdir(current)).sort();
      files.push({ path: subpath, type: 'directory' });
      for (const name of members) await walk(join(current, name), subpath ? `${subpath}/${name}` : name);
      if (canonical(members) !== canonical((await readdir(current)).sort())) {
        throw new EvidenceError('dependency-changed', `Directory changed during inventory: ${current}`);
      }
    } else {
      files.push({ path: subpath, type: 'file', ...await fileDigest(current) });
    }
  }
  try { await walk(path, ''); }
  catch (error) {
    if (error.code === 'ENOENT' && entry.optional && files.length === 0) return [{ path: '', type: 'absent' }];
    throw error;
  }
  return files;
}

export async function expectedContent(project, expected) {
  const path = childPath(project, expected?.path);
  if (!inside(await realpath(project), await realpath(path))) throw new EvidenceError('incomplete-dependencies', 'Expected outside project.');
  const text = await readFile(path, 'utf8');
  if (!path.endsWith('.md')) return { ...expected, sha256: sha256(text) };
  if (typeof expected.heading !== 'string' || !expected.heading) throw new EvidenceError('incomplete-dependencies', 'Markdown expected requires a unique heading.');
  const headings = [...text.matchAll(/^(#{1,6}) +(.+)\r?$/gm)];
  const matches = headings.filter(m => m[2] === expected.heading);
  if (matches.length !== 1) throw new EvidenceError('incomplete-dependencies', `Expected heading missing or ambiguous: ${expected.heading}`);
  const start = matches[0];
  const next = headings.find(m => m.index > start.index && m[1].length <= start[1].length);
  return { ...expected, sha256: sha256(text.slice(start.index, next?.index ?? text.length)) };
}

export async function identify({ project, request, descriptor, environment, sensorRoot }) {
  validateRequest(request);
  project = await realpath(project);
  const specFile = childPath(project, request.spec);
  if (!inside(project, await realpath(specFile))) throw new EvidenceError('incomplete-dependencies', 'Spec outside project.');
  if (!descriptor?.policy || !descriptor.recipe || !Array.isArray(descriptor.groups) || !descriptor.groups.length || !environment) {
    throw new EvidenceError('incomplete-dependencies', descriptor?.reason ?? 'No complete recipe, dependency groups and environment.');
  }
  const roots = { project, sensor: await realpath(sensorRoot) };
  const groups = [];
  const groupNames = new Set();
  for (const group of descriptor.groups) {
    if (!group.id || groupNames.has(group.id) || !roots[group.root]) throw new EvidenceError('incomplete-dependencies', 'Invalid dependency group.');
    groupNames.add(group.id);
    groups.push({ ...group, files: await inventory(roots[group.root], group) });
  }
  groups.sort((a, b) => a.id.localeCompare(b.id));
  const claims = [];
  for (const claim of request.claims) {
    const expected = await expectedContent(project, claim.expected);
    const binding = { ...claim, expected };
    const { review, repeat, ...collectionBinding } = binding;
    claims.push({ ...binding, claimKey: sha256(canonical({ version: 1, spec: request.spec, case: request.case, adapter: request.adapter, inputs: request.scenario, binding: collectionBinding, recipe: descriptor.recipe, policy: descriptor.policy, groups, environment })) });
  }
  const context = { version: 1, spec: request.spec, case: request.case, adapter: request.adapter, inputs: request.scenario, recipe: descriptor.recipe, policy: descriptor.policy, groups, environment, claims };
  return { ...context, executionKey: sha256(canonical(context)) };
}

export function collectionRequired(request) {
  return request.freshness?.mode === 'fresh' || request.claims.some(claim => claim.repeat === true);
}

export function sameIdentity(left, right) {
  return left.executionKey === right.executionKey && canonical(left) === canonical(right);
}
