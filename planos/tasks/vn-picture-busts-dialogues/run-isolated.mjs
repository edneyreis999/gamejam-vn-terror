import { cp, mkdir, mkdtemp, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
const [task, pattern = ''] = process.argv.slice(2);
if (!/^0[1-9]$/.test(task)) throw Error('Usage: run-isolated.mjs <01..09> [canonical test pattern]');
const root = process.cwd(), work = await mkdtemp(path.join(tmpdir(), 'dryland-native-busts-'));
const out = path.join(root, 'docs/qa/evidence/vn-picture-busts-dialogues', `task-${task}`, new Date().toISOString().replace(/[:.]/g, '-'));
await mkdir(out, { recursive: true });
const hashes = {};
async function inventory(dir, relative = '') {
 for (const entry of await readdir(dir, { withFileTypes: true })) {
  const file = path.join(dir, entry.name), name = path.join(relative, entry.name);
  if (entry.isDirectory()) await inventory(file, name);
  else hashes[name] = createHash('sha256').update(await readFile(file)).digest('hex');
 }
}
try {
 await cp(path.join(root, 'rpg-maker'), path.join(work, 'rpg-maker'), { recursive: true });
 await inventory(path.join(work, 'rpg-maker'));
 await writeFile(path.join(out, 'fixture-manifest.json'), JSON.stringify({ source: root, copy: work, capturedAt: new Date().toISOString(), node: process.version, port: process.env.DRYLAND_QA_PORT || '18726', pattern, hashes }, null, 2)+'\n');
 const args = ['--test', ...(pattern ? [`--test-name-pattern=${pattern}`] : []), 'rpg-maker/tests/campaign.test.mjs'];
 const child = spawn(process.execPath, args, { cwd: work, stdio: ['ignore','pipe','pipe'] });
 let log = '';
 for (const stream of [child.stdout, child.stderr]) stream.on('data', bytes => { log += bytes; process.stdout.write(bytes); });
 const code = await new Promise((resolve, reject) => { child.on('error', reject); child.on('exit', resolve); });
 await writeFile(path.join(out, 'tests.log'), log);
 const cli = spawn(process.execPath, ['rpg-maker/tools/validate-content.mjs','--json'], { cwd: work, stdio: ['ignore','pipe','pipe'] });
 let validation = ''; for (const stream of [cli.stdout,cli.stderr]) stream.on('data', bytes => { validation += bytes; });
 const cliCode = await new Promise((resolve,reject) => { cli.on('error',reject); cli.on('exit',resolve); });
 await writeFile(path.join(out,'content-validation.json'),validation);
 await cp(path.join(work, 'docs'), path.join(out, 'captured'), { recursive: true }).catch(error => { if (error.code !== 'ENOENT') throw error; });
 await writeFile(path.join(out,'result.json'),JSON.stringify({code,cliCode,node:process.version,pattern},null,2)+'\n');
 console.log(JSON.stringify({evidence:out,code,cliCode})); process.exitCode = code || cliCode;
} finally { await rm(work, { recursive: true, force: true }); }
