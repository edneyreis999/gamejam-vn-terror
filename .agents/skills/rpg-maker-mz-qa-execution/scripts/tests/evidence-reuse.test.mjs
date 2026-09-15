// Invariant: only matching declared inputs and intact evidence can authorize reuse.
// Boundary: real files/processes and receipt protocol; game pixels belong to the QA pilot.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, symlink, readFile, readdir, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { canonical, identify, inventory, collectionRequired, validateRequest, fileDigest, sha256 } from '../evidence-identity.mjs';

async function identityFixture(t) {
  const project = await mkdtemp(join(tmpdir(), 'qa-identity-'));
  t.after(() => rm(project, { recursive: true, force: true }));
  await mkdir(join(project, 'src'));
  await writeFile(join(project, 'src/main.mjs'), 'export const total = 20;\n');
  await writeFile(join(project, 'contract.md'), '# Contract\n\n## Expected\nTwenty choices, centered.\n\n## Tracking\nPending\n');
  const request = { schemaVersion: 1, spec: 'contract.md', requestId: 'one', consumer: 'task-a', case: 'case.mjs', adapter: 'adapter.mjs',
    scenario: { id: 'choices', profile: 'candidate', variant: 'center', configuration: 'defaults' },
    claims: [{ id: 'V-001', variant: 'center', sensor: 'browser+visual', group: 'sequence', source: { id: 'native', variant: 'choices' }, expected: { path: 'contract.md', heading: 'Expected' } }] };
  const descriptor = { policy: { version: 1 }, recipe: request.scenario, groups: [{ id: 'source', root: 'project', path: 'src' }] };
  const environment = { browser: 'installed-v1', node: process.version };
  return { project, request, descriptor, environment, sensorRoot: project };
}

test('identity is independent of consumer, request id, object order and tracking, but not expected text', async t => {
  const fixture = await identityFixture(t);
  const before = await identify(fixture);
  fixture.request = { ...fixture.request, requestId: 'two', consumer: 'task-b' };
  fixture.descriptor.recipe = { configuration: 'defaults', variant: 'center', profile: 'candidate', id: 'choices' };
  await writeFile(join(fixture.project, 'contract.md'), '# Contract\n\n## Expected\nTwenty choices, centered.\n\n## Tracking\nCompleted\n');
  assert.equal((await identify(fixture)).executionKey, before.executionKey);
  await writeFile(join(fixture.project, 'contract.md'), '# Contract\n\n## Expected\nTwenty choices, right aligned.\n');
  assert.notEqual((await identify(fixture)).executionKey, before.executionKey);
});

test('changed source bytes and new directory members each invalidate the proof', async t => {
  const fixture = await identityFixture(t); const first = await identify(fixture);
  await writeFile(join(fixture.project, 'src/main.mjs'), 'export const total = 21;\n');
  const changed = await identify(fixture); assert.notEqual(changed.executionKey, first.executionKey);
  await writeFile(join(fixture.project, 'src/added.mjs'), 'export const extra = true;\n');
  assert.notEqual((await identify(fixture)).executionKey, changed.executionKey);
});

test('transitive files and stateful inputs cannot inherit a previous identity', async t => {
  const fixture = await identityFixture(t);
  await mkdir(join(fixture.project, 'src/dependency'));
  await writeFile(join(fixture.project, 'src/dependency/shared.mjs'), 'export const width = 20;');
  const first = await identify(fixture);
  await writeFile(join(fixture.project, 'src/dependency/shared.mjs'), 'export const width = 40;');
  assert.notEqual((await identify(fixture)).executionKey, first.executionKey);
  const current = await identify(fixture);
  fixture.request = { ...fixture.request, scenario: { ...fixture.request.scenario, seed: 'different-save-state' } };
  assert.notEqual((await identify(fixture)).claims[0].claimKey, current.claims[0].claimKey);
});

for (const field of ['spec', 'profile', 'variant', 'sensor', 'environment']) {
  test(`different ${field} cannot reuse the original claim`, async t => {
    const fixture = await identityFixture(t); const original = await identify(fixture);
    if (field === 'spec') { await writeFile(join(fixture.project, 'other.md'), '# Other'); fixture.request.spec = 'other.md'; }
    else if (field === 'sensor') fixture.request.claims[0].sensor = 'other-method';
    else if (field === 'environment') fixture.environment.browser = 'installed-v2';
    else fixture.request.scenario[field] = 'different';
    assert.notEqual((await identify(fixture)).claims[0].claimKey, original.claims[0].claimKey);
  });
}

test('missing or ambiguous dependencies never yield an eligible identity', async t => {
  const fixture = await identityFixture(t);
  await assert.rejects(identify({ ...fixture, descriptor: { complete: true } }), { reason: 'incomplete-dependencies' });
  await writeFile(join(fixture.project, 'contract.md'), '## Expected\na\n## Expected\nb\n');
  await assert.rejects(identify(fixture), { reason: 'incomplete-dependencies' });
  await rm(join(fixture.project, 'src/main.mjs'));
  await symlink(join(fixture.project, 'contract.md'), join(fixture.project, 'src/escaped'));
  await assert.rejects(inventory(fixture.project, { path: 'src' }), { reason: 'incomplete-dependencies' });
  await assert.rejects(inventory(fixture.project, { path: '../outside' }), { reason: 'incomplete-dependencies' });
});

test('typed data and ordered sequences are not collapsed by canonicalization', () => {
  assert.notEqual(canonical({ a: 1 }), canonical({ a: '1' }));
  assert.notEqual(canonical([1, 2]), canonical([2, 1]));
  assert.notEqual(canonical({}), canonical({ a: null }));
  assert.throws(() => canonical({ a: undefined }), { reason: 'incomplete-dependencies' });
});

test('age alone never demands collection, while reproduction and contractual repetition do', async t => {
  const { request } = await identityFixture(t);
  assert.equal(collectionRequired({ ...request, createdAt: '2001-01-01' }), false);
  assert.equal(collectionRequired({ ...request, freshness: { mode: 'fresh', reason: 'user reproduction' } }), true);
  assert.equal(collectionRequired({ ...request, claims: [{ ...request.claims[0], repeat: true }] }), true);
  assert.throws(() => validateRequest({ ...request, freshness: { mode: 'fresh' } }), /reason/);
});


import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { publishReceipt, findEvidence, recordInspection, readReceipt } from '../evidence-store.mjs';

async function storeFixture(t) {
  const context = await identityFixture(t);
  const { project, request } = context;
  const evidenceRoot = join(project, 'evidence');
  const output = join(evidenceRoot, 'runs/first'); const fixture = join(project, 'fixture');
  await mkdir(output, { recursive: true }); await mkdir(fixture);
  await writeFile(join(fixture, 'fixture-manifest.json'), '{"profile":"candidate"}');
  await writeFile(join(fixture, 'input.json'), '{"choices":20}');
  await writeFile(join(output, 'screen.png'), 'known test artifact bytes; not a gameplay capture');
  const originalPath = join(project, 'src/main.mjs');
  await copyFile(originalPath, join(output, 'source.mjs'));
  const files = await Promise.all(['fixture-manifest.json', 'input.json'].map(async path => ({ path, ...await fileDigest(join(fixture, path)) })));
  const report = { status: 'executed-awaiting-review', startedAt: '2026-09-11T00:00:00Z', finishedAt: '2026-09-11T00:00:01Z', durationMs: 1000,
    environment: context.environment, cleanup: [{ status: 'closed' }], files,
    sources: [{ path: 'source.mjs', originalPath, ...await fileDigest(originalPath) }], checkpoints: [{ path: 'screen.png' }],
    criteria: [{ id: 'native', variant: 'choices', status: 'executed-awaiting-review', evidence: ['screen.png'] }] };
  await writeFile(join(output, 'report.json'), JSON.stringify(report));
  const identity = await identify(context);
  const args = { project, evidenceRoot, output, fixture, request, identity, prepared: { profile: 'candidate' }, runId: 'first' };
  const find = async (next = request) => findEvidence({ ...args, request: next, identity: await identify({ ...context, request: next }) });
  const inspect = async (overrides = {}) => recordInspection({ ...args, receiptPath: join(output, 'receipt.json'), claimKey: identity.claims[0].claimKey,
    reviewer: { id: 'reviewer-one', kind: 'agent' }, decision: 'pass', observations: 'Observed the required test artifact.',
    artifacts: [{ path: 'screen.png', sha256: (await fileDigest(join(output, 'screen.png'))).sha256 }], requestId: request.requestId, ...overrides });
  return { ...args, context, report, find, inspect };
}

test('new immutable collection starts pending; inspection is reused only for its current scope', async t => {
  const f = await storeFixture(t);
  assert.equal((await f.find()).complete, false, 'a legacy report is never imported');
  await publishReceipt(f);
  const initial = await f.find(); assert.equal(initial.complete, true); assert.equal(initial.retained[0].review, null);
  const inspected = await f.inspect();
  assert.equal((await f.find()).retained[0].review.inspection.id, inspected.inspection.id);
  for (const review of [{ kind: 'human' }, { independentFrom: ['reviewer-one'] }, { requireNew: true }]) {
    const next = { ...f.request, requestId: 'later', claims: [{ ...f.request.claims[0], review }] };
    const result = await f.find(next); assert.equal(result.complete, true, 'review scope does not discard the collection');
    assert.equal(result.retained[0].review, null, 'incompatible inspection remains pending');
  }
  const fresh = { ...f.request, requestId: 'later', claims: [{ ...f.request.claims[0], review: { requireNew: true } }] };
  await f.inspect({ requestId: 'later', decision: 'fail' });
  assert.equal((await f.find(fresh)).retained[0].review.inspection.decision, 'fail');
  await f.inspect({ requestId: 'third', decision: 'pass' });
  assert.equal((await f.find()).retained[0].review.inspection.decision, 'fail', 'a later positive record alone does not resolve a negative review of the same material');
  await assert.rejects(publishReceipt(f), { code: 'EEXIST' });
  assert.equal((await readdir(f.output)).some(name => name.endsWith('.tmp')), false);
});

for (const failure of ['capture', 'source-copy', 'report', 'fixture', 'missing', 'schema', 'truncated', 'escape']) {
  test(`invalid ${failure} cannot be consumed`, async t => {
    const f = await storeFixture(t); await publishReceipt(f);
    if (failure === 'schema') {
      const path = join(f.output, 'receipt.json'); const receipt = JSON.parse(await readFile(path)); receipt.schemaVersion = 99;
      await writeFile(path, JSON.stringify(receipt));
    } else if (failure === 'truncated') await writeFile(join(f.output, 'receipt.json'), '{');
    else if (failure === 'escape') {
      await rm(join(f.output, 'screen.png')); await symlink(join(f.fixture, 'input.json'), join(f.output, 'screen.png'));
    } else if (failure === 'missing') await rm(join(f.output, 'screen.png'));
    else {
      const path = failure === 'fixture' ? join(f.fixture, 'input.json') : join(f.output, { capture: 'screen.png', 'source-copy': 'source.mjs', report: 'report.json' }[failure]);
      await writeFile(path, 'changed bytes');
    }
    const result = await f.find(); assert.equal(result.complete, false); assert.ok(result.diagnostics.length);
  });
}

test('current dependencies invalidate a matching request id and corrupt index can be reconstructed', async t => {
  const f = await storeFixture(t); await publishReceipt(f);
  await writeFile(join(f.evidenceRoot, '.receipts/index/first.json'), '{');
  assert.equal((await f.find()).complete, true);
  await writeFile(join(f.project, 'src/main.mjs'), 'changed implementation');
  assert.equal((await f.find()).complete, false);
});

test('inspection cannot bind other artifacts or silently accept damaged content', async t => {
  const f = await storeFixture(t); await publishReceipt(f);
  await assert.rejects(f.inspect({ artifacts: [{ path: 'screen.png', sha256: 'wrong' }] }), /artifact bytes/);
  const entry = await f.inspect();
  const body = JSON.parse(await readFile(entry.path)); delete body.checksum; body.artifacts[0].sha256 = '0'.repeat(64);
  await writeFile(entry.path, JSON.stringify({ ...body, checksum: sha256(canonical(body)) }));
  await assert.rejects(f.find(), { reason: 'artifact-corrupt' });
});

test('sequential claims cannot be assembled from different collections', async t => {
  const f = await storeFixture(t); await publishReceipt(f);
  const second = { ...f.request.claims[0], id: 'V-002', variant: 'second' };
  const next = { ...f.request, claims: [second] }; const identity = await identify({ ...f.context, request: next });
  const output = join(f.evidenceRoot, 'runs/second'); await mkdir(output);
  for (const name of ['report.json', 'screen.png', 'source.mjs']) await copyFile(join(f.output, name), join(output, name));
  await publishReceipt({ ...f, request: next, identity, output, runId: 'second' });
  const combined = await f.find({ ...f.request, claims: [...f.request.claims, second] });
  assert.equal(combined.complete, false); assert.equal(combined.retained.length, 0);
  const partial = await f.find({ ...f.request, claims: [...f.request.claims, { ...second, group: 'other-sequence' }] });
  assert.equal(partial.complete, false); assert.equal(partial.retained.length, 1);
});

test('publication races in real processes expose one whole result without overwriting', async t => {
  const f = await storeFixture(t); const destination = join(f.output, 'race.json');
  const module = new URL('../evidence-store.mjs', import.meta.url).href;
  const children = [1, 2].map(id => spawn(process.execPath, ['--input-type=module', '-e',
    `import { publishExclusive } from ${JSON.stringify(module)}; process.send('ready'); process.once('message', async () => { try { await publishExclusive(process.argv[1], {id: Number(process.argv[2]), data: 'x'.repeat(500000)}); process.exit(0); } catch(e) { process.exit(e.code === 'EEXIST' ? 2 : 3); } });`, destination, String(id)], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] }));
  t.after(() => { for (const child of children) if (child.exitCode === null) child.kill(); });
  await Promise.all(children.map(child => once(child, 'message')));
  const completions = children.map(child => once(child, 'exit'));
  for (const child of children) child.send('publish');
  assert.deepEqual((await Promise.all(completions)).map(([code]) => code).sort(), [0, 2]);
  const result = JSON.parse(await readFile(destination)); assert.ok([1, 2].includes(result.id)); assert.equal(result.data.length, 500000);
  assert.equal((await readdir(f.output)).some(name => name.endsWith('.tmp')), false);
});

test('interrupted incomplete publication is never imported as evidence', async t => {
  const f = await storeFixture(t);
  const child = spawn(process.execPath, ['--input-type=module', '-e',
    `import {writeFile} from 'node:fs/promises'; await writeFile(process.argv[1], '{"schemaVersion":1,'); process.send('partial'); setInterval(()=>{},1000);`,
    join(f.output, '.receipt.json.interrupted.tmp')], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] });
  t.after(() => { if (child.exitCode === null) child.kill('SIGKILL'); });
  await once(child, 'message'); const exited = once(child, 'exit'); child.kill('SIGKILL'); await exited;
  assert.equal((await f.find()).complete, false);
  await publishReceipt(f); assert.equal((await f.find()).complete, true);
});

import { reserve, completeReservation, waitForProducer } from '../evidence-coordination.mjs';

test('reservations retain ownership and a live producer is not stolen on timeout', async t => {
  const f = await storeFixture(t); const owner = { pid: process.pid, token: 'one', runId: 'first', consumer: 'one' };
  const first = await reserve({ ...f, owner });
  const second = await reserve({ ...f, owner: { ...owner, token: 'two' } });
  assert.equal(first.owner, true); assert.equal(second.owner, false);
  assert.equal((await waitForProducer({ reservation: second, waitMs: 1 })).state, 'expired');
  await assert.rejects(completeReservation({ reservation: first, owner: { ...owner, token: 'two' }, result: { status: 'pass' } }), /owner/);
  await completeReservation({ reservation: first, owner, result: { status: 'fail' } });
  const completed = await waitForProducer({ reservation: second, waitMs: 10 });
  assert.equal(completed.terminal.result.status, 'fail');
  await assert.rejects(completeReservation({ reservation: first, owner, result: { status: 'pass' } }), { code: 'EEXIST' });
});

test('dead coordinator with unconfirmed child cleanup cannot authorize a stolen reservation', async t => {
  const f = await storeFixture(t);
  const child = spawn(process.execPath, ['-e', 'setInterval(()=>{},1000)']);
  const owner = { pid: child.pid, token: 'gone', runId: 'first', consumer: 'gone' };
  const first = await reserve({ ...f, owner });
  const exited = once(child, 'exit'); child.kill('SIGKILL'); await exited;
  const next = await reserve({ ...f, owner: { ...owner, pid: process.pid, token: 'next' } });
  assert.equal(next.owner, false); assert.equal(next.state, 'owner-ended-without-cleanup');
  assert.equal(next.record.generation, first.record.generation);
  assert.equal((await waitForProducer({ reservation: next, waitMs: 10 })).state, 'owner-ended-without-cleanup');
});

test('a captured source outside declared dependency groups cannot publish reusable proof', async t => {
  const f = await storeFixture(t);
  const outside = join(f.project, 'unmapped.mjs'); await copyFile(join(f.project, 'src/main.mjs'), outside);
  f.report.sources[0].originalPath = outside;
  await writeFile(join(f.output, 'report.json'), JSON.stringify(f.report));
  await assert.rejects(publishReceipt(f), { reason: 'dependency-changed' });
});

test('equivalent collection with applicable inspection is selected before an unreviewed one', async t => {
  const f=await storeFixture(t);await publishReceipt(f);
  const output=join(f.evidenceRoot,'runs/second');await mkdir(output);
  for(const name of ['report.json','screen.png','source.mjs'])await copyFile(join(f.output,name),join(output,name));
  await publishReceipt({...f,output,runId:'second'});
  await f.inspect({receiptPath:join(output,'receipt.json')});
  const result=await f.find();assert.equal(result.retained[0].receipt.runId,'second');assert.equal(result.retained[0].review.inspection.decision,'pass');
});

test('publication missing from a partially populated index remains discoverable', async t => {
  const f=await storeFixture(t);await publishReceipt(f);
  const request={...f.request,scenario:{...f.request.scenario,variant:'other'}};
  const identity=await identify({...f.context,request});
  const output=join(f.evidenceRoot,'runs/second');await mkdir(output);
  for(const name of ['report.json','screen.png','source.mjs'])await copyFile(join(f.output,name),join(output,name));
  await publishReceipt({...f,request,identity,output,runId:'second'});
  await rm(join(f.evidenceRoot,'.receipts/index/second.json'));
  const result=await f.find(request);assert.equal(result.complete,true);assert.equal(result.retained[0].receipt.runId,'second');
});

test('explicit untracked fixture outputs are allowed but mutable declared inputs stay verified', async t => {
  const f=await storeFixture(t);f.context.descriptor.policy.outputs=['save'];f.identity=await identify(f.context);
  f.report.descriptor={mutablePaths:['save','input.json']};await writeFile(join(f.output,'report.json'),JSON.stringify(f.report));
  await mkdir(join(f.fixture,'save'));await writeFile(join(f.fixture,'save/output.json'),'new output');
  await publishReceipt(f);assert.equal((await f.find()).complete,true);
  const output=join(f.evidenceRoot,'runs/second');await mkdir(output);
  for(const name of ['report.json','screen.png','source.mjs'])await copyFile(join(f.output,name),join(output,name));
  await writeFile(join(f.fixture,'input.json'),'modified declared input');
  await assert.rejects(publishReceipt({...f,output,runId:'second'}),{reason:'dependency-changed'});
});

test('confirmed finished generation permits a new owner without overwriting history',async t=>{
  const f=await storeFixture(t);const owner={pid:process.pid,token:'first',runId:'first',consumer:'one'};
  const first=await reserve({...f,owner});await completeReservation({reservation:first,owner,result:{status:'executed-awaiting-review'}});
  const next=await reserve({...f,owner:{...owner,token:'second',runId:'second'},afterGeneration:first.record.generation});
  assert.equal(next.owner,true);assert.notEqual(next.record.generation,first.record.generation);assert.notEqual(next.path,first.path);
  assert.equal((await waitForProducer({reservation:first,waitMs:1})).terminal.result.status,'executed-awaiting-review');
});


test('directed output and mutable paths cannot escape physical fixture boundaries through symlinks', async t => {
  const {run}=await import('../browser-runtime.mjs');
  const project=await mkdtemp(join(tmpdir(),'qa-directed-boundary-'));t.after(()=>rm(project,{recursive:true,force:true}));
  const fixture=join(project,'fixture');await mkdir(fixture);await writeFile(join(fixture,'input.txt'),'fixture');
  const alias=join(project,'alias');await symlink(fixture,alias);
  let started=false;
  const adapter={describe:async()=>({files:[{path:'input.txt'}],mutablePaths:['save']}),start:async()=>{started=true;throw new Error('must not start');}};
  const caseModule={scenario:{id:'boundary',criteria:[{id:'path',variant:'symlink'}],browser:{width:800,height:600,dpr:1,locale:'en-US'}},execute:async()=>{},verify:async()=>{}};
  await assert.rejects(run({project,fixture,output:join(alias,'evidence'),adapter,caseModule}),/outside the served fixture/);
  assert.equal(started,false);assert.deepEqual(await readdir(fixture),['input.txt']);
  await symlink(project,join(fixture,'save'));
  const result=await run({project,fixture,output:join(project,'output'),adapter,caseModule});
  assert.equal(result.status,'fail');assert.match(result.failure.message,/Mutable destination outside fixture/);assert.equal(started,false);
});
